import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi, type MockInstance } from "vitest";

// DAS FORMULAR-RELAY (Phase 13.6, Scheibe 13.6-3). Der Massstab sind die Setzungen der
// Standdatei der Phase 13.6: P13.6-16 (nie speichern, nie loggen), P13.6-20 (Adresse nur aus
// published_content), P13.6-21 (zwei Zustaende), P13.6-50 (R3, kein Wurf), P13.6-57 (Projekt
// aus dem Host) und P13.6-59 (die Entscheidungen der Planrunde, Q1 bis Q13). Die Test-Kennungen
// (R-OK, R-LOG …) sind die des Plans.
//
// DIE DATENBANK IST GEFAELSCHT, ABER SIE FILTERT WIRKLICH: `eq` wirkt auf die Zeilen, `select`
// liefert nur die verlangten Spalten, `maybeSingle` scheitert bei mehr als einer Zeile. Eine
// Attrappe mit festen Antworten machte die Mandanten- und Projektions-Tests hohl.

vi.mock("server-only", () => ({}));
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import {
  handleRelay,
  RELAY_FORWARD_TIMEOUT_MS,
  RELAY_MAX_BODY_BYTES,
} from "./relay";
import { lookupRelayProject, RELAY_LOOKUP_TIMEOUT_MS } from "./resolve-relay";
import { getPublishedHtmlByLabel } from "@/lib/hosting/resolve";
import { FORM_TARGET_TIMEOUT_MS } from "@/lib/form-target";
import * as route from "@/app/api/f/route";

// ---------------------------------------------------------------------------
// Die gefaelschte Datenbank
// ---------------------------------------------------------------------------

type Row = Record<string, unknown>;
type Table = "domains" | "projects";
type Fault = { table: Table; kind: "error" | "throw" | "hang" };

const MARK = "MARK7731";

let db: Record<Table, Row[]>;
let faults: Fault[];
let selects: { table: string; cols: string }[];
let writes: string[];

type QueryResult = { data: unknown; error: unknown };

class FakeQuery {
  private filters: [string, unknown][] = [];
  private cols = "";
  private signal: AbortSignal | undefined;
  constructor(private table: Table) {}
  select(cols: string) {
    this.cols = cols;
    selects.push({ table: this.table, cols });
    return this;
  }
  eq(col: string, value: unknown) {
    this.filters.push([col, value]);
    return this;
  }
  abortSignal(signal: AbortSignal) {
    this.signal = signal;
    return this;
  }
  insert() {
    writes.push(`insert ${this.table}`);
    return this;
  }
  update() {
    writes.push(`update ${this.table}`);
    return this;
  }
  upsert() {
    writes.push(`upsert ${this.table}`);
    return this;
  }
  delete() {
    writes.push(`delete ${this.table}`);
    return this;
  }
  private async rows(): Promise<Row[] | QueryResult> {
    const fault = faults.find((f) => f.table === this.table);
    if (fault?.kind === "error") return { data: null, error: { message: `db ${MARK}` } };
    if (fault?.kind === "throw") throw new Error(`db ${MARK}`);
    if (fault?.kind === "hang") {
      return new Promise((resolve) => {
        this.signal?.addEventListener("abort", () =>
          resolve({ data: null, error: { message: `aborted ${MARK}` } })
        );
      });
    }
    const cols = this.cols.split(",").map((c) => c.trim());
    return db[this.table]
      .filter((r) => this.filters.every(([c, v]) => r[c] === v))
      .map((r) => Object.fromEntries(cols.map((c) => [c, r[c] ?? null])));
  }
  async maybeSingle(): Promise<QueryResult> {
    const r = await this.rows();
    if (!Array.isArray(r)) return r;
    if (r.length > 1) return { data: null, error: { message: `multiple ${MARK}` } };
    return { data: r[0] ?? null, error: null };
  }
  then<T>(resolve: (v: QueryResult) => T, reject?: (e: unknown) => T) {
    return this.rows()
      .then((r) => (Array.isArray(r) ? { data: r, error: null } : r))
      .then(resolve, reject);
  }
}

function installAdmin() {
  createAdminClient.mockImplementation(() => ({
    from: (table: Table) => new FakeQuery(table),
    rpc: () => {
      writes.push("rpc");
      return Promise.resolve({ data: null, error: null });
    },
  }));
}

// ---------------------------------------------------------------------------
// Die Fixtures
// ---------------------------------------------------------------------------

const LABEL_A = "alpha-a1b2c3";
const HOST_A = `${LABEL_A}.publayer.net`;
const LABEL_B = "beta-d4e5f6";
const HOST_B = `${LABEL_B}.publayer.net`;
const CUSTOM = "shop.example.test";
const ID = "ps-abc123";
const ID_B = "ps-bbb222";
const EP_A = "https://hook.eu2.make.com/test-a";
const EP_B = "https://hook.eu2.make.com/test-b";
const EP_EVIL = "https://hook.eu2.make.com/test-evil";
const THANKS = "https://example.test/danke";
const FORM_CT = "application/x-www-form-urlencoded;charset=UTF-8";
const BODY = "email=a%40b.test&name=Test";

function ft(elementId: string, endpoint: string) {
  return {
    elementId,
    type: "formTarget",
    config: { endpoint, thanksUrl: THANKS, fieldNames: ["email", "name"] },
  };
}

type ProjectSpec = {
  id: string;
  label?: string;
  custom?: string;
  mappings?: unknown;
  variantB?: { html: string; mappings: unknown } | null;
  ab?: boolean;
  blockedProject?: string | null;
  blockedDomain?: string | null;
  html?: string;
  published?: unknown;
  noProjectRow?: boolean;
};

function addProject(spec: ProjectSpec) {
  db.domains.push({
    label: spec.label ?? null,
    custom_host: spec.custom ?? null,
    project_id: spec.id,
    blocked_at: spec.blockedDomain ?? null,
  });
  if (spec.noProjectRow) return;
  const published =
    spec.published !== undefined
      ? spec.published
      : {
          html: spec.html ?? "<p>live</p>",
          mappings: spec.mappings ?? [ft(ID, EP_A)],
          settings: {},
          publishedAt: "2026-09-29T00:00:00.000Z",
          ...(spec.variantB ? { variantB: spec.variantB } : {}),
        };
  db.projects.push({
    id: spec.id,
    published_content: published,
    blocked_at: spec.blockedProject ?? null,
    ab_test_active: spec.ab ?? false,
    // DER ENTWURF — darf NIE gelesen werden (Setzung P13.6-20). Er traegt dieselbe Kennung
    // mit einer anderen Adresse: liest das Relay ihn, geht der Aufruf an EP_EVIL.
    mappings: [ft(ID, EP_EVIL)],
    html: "<p>entwurf</p>",
  });
}

type ReqSpec = {
  host?: string;
  id?: string | null;
  query?: string;
  body?: BodyInit | null;
  contentType?: string | null;
  cookie?: string;
  headers?: Record<string, string>;
  duplex?: boolean;
};

function req(spec: ReqSpec = {}): Request {
  const host = spec.host ?? HOST_A;
  const id = spec.id === undefined ? ID : spec.id;
  const url = `https://${host}/api/f${id === null ? "" : `?f=${id}`}${spec.query ?? ""}`;
  const headers: Record<string, string> = {
    "x-forwarded-host": host,
    "user-agent": `UA-${MARK}`,
    "x-forwarded-for": "203.0.113.9",
    ...spec.headers,
  };
  const ct = spec.contentType === undefined ? FORM_CT : spec.contentType;
  if (ct !== null) headers["content-type"] = ct;
  if (spec.cookie) headers["cookie"] = spec.cookie;
  const init: RequestInit & { duplex?: "half" } = {
    method: "POST",
    headers,
    body: spec.body === undefined ? BODY : spec.body,
  };
  if (spec.duplex) init.duplex = "half";
  return new Request(url, init);
}

// ---------------------------------------------------------------------------
// fetch und console
// ---------------------------------------------------------------------------

const fetchMock = vi.fn();
let consoleSpies: MockInstance[];

function logText(): string {
  return consoleSpies
    .flatMap((s) => s.mock.calls)
    .map((args) => args.map((a) => (typeof a === "string" ? a : JSON.stringify(a))).join(" "))
    .join("\n");
}

function logLines(): string[] {
  return consoleSpies.flatMap((s) => s.mock.calls).map((args) => String(args[0]));
}

function fetchedUrls(): string[] {
  return fetchMock.mock.calls.map((c) => String(c[0]));
}

beforeEach(() => {
  db = { domains: [], projects: [] };
  faults = [];
  selects = [];
  writes = [];
  installAdmin();
  vi.stubEnv("NEXT_PUBLIC_HOSTING_DOMAIN", "publayer.net");
  fetchMock.mockReset();
  fetchMock.mockImplementation(async () => new Response("Accepted", { status: 200 }));
  vi.stubGlobal("fetch", fetchMock);
  consoleSpies = (["log", "info", "warn", "error", "debug"] as const).map((m) =>
    vi.spyOn(console, m).mockImplementation(() => {})
  );
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  createAdminClient.mockReset();
});

async function expectNotDelivered(res: Response) {
  expect(res.status).toBe(502);
  expect(await res.text()).toBe("");
}

// ---------------------------------------------------------------------------
// R-OK, R-RESP, R-SRC
// ---------------------------------------------------------------------------

describe("R-OK — zugestellt", () => {
  it("R-OK: 204 ohne Rumpf; GENAU EIN fetch, mit exakt diesen Optionen und dem Rumpf als Bytes", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    const res = await handleRelay(req({ cookie: "sid=x" }));
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");

    expect(fetchMock).toHaveBeenCalledTimes(1);
    const [url, init] = fetchMock.mock.calls[0] as [string, RequestInit];
    expect(url).toBe(EP_A);
    // Die Optionen sind ABSCHLIESSEND: keine Kopfzeile des Besuchers (IP, User-Agent,
    // Cookie) reist mit (Plan, Ablauf Punkt 7).
    expect(Object.keys(init).sort()).toEqual(
      ["body", "cache", "headers", "method", "redirect", "signal"]
    );
    expect(init.method).toBe("POST");
    expect(init.headers).toEqual({ "Content-Type": "application/x-www-form-urlencoded" });
    expect(init.redirect).toBe("manual");
    expect(init.cache).toBe("no-store");
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(new TextDecoder().decode(init.body as Uint8Array)).toBe(BODY);
    // Erfolg schreibt keine Zeile.
    expect(logLines()).toEqual([]);
  });

  it("R-OK (Custom-Domain): der Host fuehrt ueber custom_host zum Projekt", async () => {
    addProject({ id: "p-c", custom: CUSTOM });
    const res = await handleRelay(req({ host: CUSTOM }));
    expect(res.status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });
});

describe("R-RESP — genau zwei Antworten, ohne Rumpf, mit genau einer Kopfzeile", () => {
  it("R-RESP: 204 und 502 tragen nur Cache-Control: no-store — kein Set-Cookie, kein CORS", async () => {
    addProject({ id: "p-a", label: LABEL_A, ab: true, variantB: { html: "<p>b</p>", mappings: [ft(ID, EP_A)] } });
    const ok = await handleRelay(req());
    const fail = await handleRelay(req({ id: "ps-zzz999" }));
    for (const res of [ok, fail]) {
      expect([...res.headers]).toEqual([["cache-control", "no-store"]]);
      expect(await res.text()).toBe("");
    }
    expect(ok.status).toBe(204);
    expect(fail.status).toBe(502);
  });
});

describe("R-SRC — die Adresse kommt nur aus published_content", () => {
  it("R-SRC: eine Adresse in Query oder Rumpf und der Entwurf aendern das Ziel nicht", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    const res = await handleRelay(
      req({
        query: `&endpoint=${encodeURIComponent(EP_EVIL)}`,
        body: `endpoint=${encodeURIComponent(EP_EVIL)}&email=a%40b.test`,
      })
    );
    expect(res.status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });

  it("R-SRC: die Projektion ist exakt die der Entscheidung; es wird nie geschrieben", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    await handleRelay(req());
    // Die Erwartung stammt aus der Entscheidung (Setzung P13.6-59, Q1: "dieselbe Projektion"
    // wie resolvePublished), nicht aus dem Code.
    expect(selects).toEqual([
      { table: "domains", cols: "project_id, blocked_at" },
      { table: "projects", cols: "published_content, blocked_at, ab_test_active" },
    ]);
    expect(writes).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Nicht zugestellt — je Fehlerart
// ---------------------------------------------------------------------------

describe("R-HOST, R-APP — der Host", () => {
  it("R-HOST: unbekanntes Label -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    await expectNotDelivered(await handleRelay(req({ host: "nobody-zzz999.publayer.net" })));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-HOST: ungueltiger Host -> 502, keine Abfrage", async () => {
    await expectNotDelivered(await handleRelay(req({ host: "bad_host.test" })));
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it.each(["pagesmith-delta.vercel.app", "localhost"])(
    "R-APP: App-Host %s -> 502, keine Abfrage",
    async (host) => {
      await expectNotDelivered(await handleRelay(req({ host })));
      expect(createAdminClient).not.toHaveBeenCalled();
      expect(fetchMock).not.toHaveBeenCalled();
    }
  );
});

describe("R-ID1, R-ID2 — die Kennung", () => {
  it("R-ID1: unbekannte Kennung -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    await expectNotDelivered(await handleRelay(req({ id: "ps-zzz999" })));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([["PS-ABC123"], ["ps-abc12"], ["ps-abc1234"], ["abc123"], [null]])(
    "R-ID2: Kennung %s hat nicht das Format -> 502, keine Abfrage",
    async (id) => {
      addProject({ id: "p-a", label: LABEL_A });
      await expectNotDelivered(await handleRelay(req({ id })));
      expect(createAdminClient).not.toHaveBeenCalled();
    }
  );
});

describe("R-LIST1, R-LIST2 — die Host-Liste", () => {
  it("R-LIST1: eine Adresse einer ungelesenen Make-Zone -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, "https://hook.eu1.make.com/test-a")] });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it.each([
    "https://hook.eu2.make.com.evil.test/test-a",
    "https://xhook.eu2.make.com/test-a",
    "https://u@hook.eu2.make.com/test-a",
    "https://hook.eu2.make.com:8443/test-a",
    "http://hook.eu2.make.com/test-a",
  ])("R-LIST2: %s -> 502, kein fetch", async (endpoint) => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, endpoint)] });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-LIST2 (Positivkontrolle): Grossschreibung und Punkt am Ende sind derselbe Host", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, "https://HOOK.EU2.MAKE.COM./test-a")] });
    const res = await handleRelay(req());
    expect(res.status).toBe(204);
    expect(fetchedUrls()).toEqual(["https://hook.eu2.make.com./test-a"]);
  });
});

describe("R-BLOCK — der Kill-Switch", () => {
  it("R-BLOCK-P: gesperrtes Projekt -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A, blockedProject: "2026-09-29T00:00:00Z" });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-BLOCK-D: gesperrte Domain -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A, blockedDomain: "2026-09-29T00:00:00Z" });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

describe("R-TIME — die Zeitlimits", () => {
  it("R-TIME (Weiterleitung): nach RELAY_FORWARD_TIMEOUT_MS abgebrochen -> 502, nicht vorher", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    addProject({ id: "p-a", label: LABEL_A });
    fetchMock.mockImplementation(
      (_url: string, init: RequestInit) =>
        new Promise((_resolve, reject) => {
          init.signal?.addEventListener("abort", () =>
            reject(new DOMException("aborted", "AbortError"))
          );
        })
    );
    let settled = false;
    const p = handleRelay(req()).then((r) => {
      settled = true;
      return r;
    });
    await vi.advanceTimersByTimeAsync(RELAY_FORWARD_TIMEOUT_MS - 1);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(settled).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    await expectNotDelivered(await p);
  });

  it("R-TIME (Abfrage): eine haengende Abfrage bricht nach RELAY_LOOKUP_TIMEOUT_MS ab -> 502, kein fetch", async () => {
    vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] });
    addProject({ id: "p-a", label: LABEL_A });
    faults = [{ table: "domains", kind: "hang" }];
    const p = handleRelay(req());
    await vi.advanceTimersByTimeAsync(RELAY_LOOKUP_TIMEOUT_MS);
    await expectNotDelivered(await p);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-TIME-REL: Werte der Entscheidung, und zwei Abfragen plus Weiterleitung bleiben unter dem Limit des Browsers", () => {
    expect(RELAY_LOOKUP_TIMEOUT_MS).toBe(1_500);
    expect(RELAY_FORWARD_TIMEOUT_MS).toBe(5_000);
    // Setzung P13.6-22: Das Server-Zeitlimit liegt unter FORM_TARGET_TIMEOUT_MS.
    expect(2 * RELAY_LOOKUP_TIMEOUT_MS + RELAY_FORWARD_TIMEOUT_MS).toBeLessThan(
      FORM_TARGET_TIMEOUT_MS
    );
  });
});

describe("R-REDIR — Umleitungen: nie folgen, 3xx zaehlt als zugestellt", () => {
  it.each([301, 302, 303, 307, 308])(
    "R-REDIR: %i mit Location -> 204, genau ein fetch, die Location wird nie aufgerufen",
    async (status) => {
      addProject({ id: "p-a", label: LABEL_A });
      fetchMock.mockImplementation(
        async () =>
          new Response(null, { status, headers: { Location: "https://evil.test/next" } })
      );
      const res = await handleRelay(req());
      expect(res.status).toBe(204);
      expect(fetchMock).toHaveBeenCalledTimes(1);
      expect(fetchedUrls()).toEqual([EP_A]);
      expect((fetchMock.mock.calls[0][1] as RequestInit).redirect).toBe("manual");
    }
  );

  it("R-REDIR (gefilterte Antwort): Typ opaqueredirect mit Status 0 zaehlt ebenfalls als Umleitung", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    fetchMock.mockImplementation(async () => ({ type: "opaqueredirect", status: 0, body: null }));
    const res = await handleRelay(req());
    expect(res.status).toBe(204);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe("R-NON2XX, R-THROW — der Empfaenger", () => {
  it.each([400, 404, 410, 429, 500])("R-NON2XX: %i -> 502, Status als Zahl im Log", async (status) => {
    addProject({ id: "p-a", label: LABEL_A });
    fetchMock.mockImplementation(async () => new Response(`Fehler ${MARK}`, { status }));
    await expectNotDelivered(await handleRelay(req()));
    expect(logLines()).toEqual([`[relay] not delivered: upstream-status ${status}`]);
  });

  it("R-THROW: fetch wirft -> 502, nur der Fehlertyp im Log", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    fetchMock.mockImplementation(async () => {
      throw new TypeError(`fetch failed ${MARK}`);
    });
    await expectNotDelivered(await handleRelay(req()));
    expect(logLines()).toEqual(["[relay] not delivered: upstream-error TypeError"]);
  });
});

// ---------------------------------------------------------------------------
// R-DS — DER DATENSPARMODUS GILT AUCH IM RELAY (Phase 13.6, Scheibe 13.6-4; Setzung P13.6-62
// der Phase 13.6). Gelesen aus der VEROEFFENTLICHTEN Fassung.
// ---------------------------------------------------------------------------
describe("R-DS1 bis R-DS3 — das Relay verweigert ein Ziel im Datensparmodus", () => {
  function ftDs(dataSaver: unknown) {
    const m = ft(ID, EP_A);
    return { ...m, config: { ...m.config, dataSaver } };
  }

  it("R-DS1: dataSaver true -> 502, KEIN fetch, genau die Logzeile data-saver", async () => {
    // Rot, wenn der Zweig fehlt (M3): dann 204 und eine Weiterleitung an EP_A.
    addProject({ id: "p-a", label: LABEL_A, mappings: [ftDs(true)] });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
    expect(logLines()).toEqual(["[relay] not delivered: data-saver"]);
  });

  it.each([false, "ja", 1, null])(
    "R-DS2: ein unbekannter Wert (%s) -> 502 als invalid-target, kein fetch",
    async (value) => {
      // Rot, wenn formTargetProblem den Wert durchlaesst.
      addProject({ id: "p-a", label: LABEL_A, mappings: [ftDs(value)] });
      await expectNotDelivered(await handleRelay(req()));
      expect(fetchMock).not.toHaveBeenCalled();
      expect(logLines()).toEqual(["[relay] not delivered: invalid-target"]);
    }
  );

  it("R-DS3 (Positivkontrolle): ohne dataSaver wird dasselbe Ziel zugestellt", async () => {
    // Ohne sie waeren R-DS1 und R-DS2 auch gruen, wenn das Ziel aus einem anderen Grund
    // abgewiesen wuerde.
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, EP_A)] });
    const res = await handleRelay(req());
    expect(res.status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });
});

describe("R-CT, R-SIZE — die Form der Anfrage", () => {
  it.each([["application/json"], ["text/plain"], ["multipart/form-data; boundary=x"], [null]])(
    "R-CT: Content-Type %s -> 502, keine Abfrage",
    async (contentType) => {
      await expectNotDelivered(await handleRelay(req({ contentType })));
      expect(createAdminClient).not.toHaveBeenCalled();
    }
  );

  function streamOf(bytes: number): ReadableStream<Uint8Array> {
    return new ReadableStream({
      start(controller) {
        controller.enqueue(new Uint8Array(bytes).fill(97));
        controller.close();
      },
    });
  }

  it("R-SIZE: RELAY_MAX_BODY_BYTES + 1 ohne Content-Length -> 502, keine Abfrage", async () => {
    const r = req({ body: streamOf(RELAY_MAX_BODY_BYTES + 1), duplex: true });
    expect(r.headers.get("content-length")).toBeNull();
    await expectNotDelivered(await handleRelay(r));
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("R-SIZE: ein zu grosser Content-Length -> 502, keine Abfrage", async () => {
    const r = req({ headers: { "content-length": String(RELAY_MAX_BODY_BYTES + 1) } });
    await expectNotDelivered(await handleRelay(r));
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("R-SIZE (Positivkontrolle): genau RELAY_MAX_BODY_BYTES -> 204", async () => {
    expect(RELAY_MAX_BODY_BYTES).toBe(64 * 1024);
    addProject({ id: "p-a", label: LABEL_A });
    const res = await handleRelay(req({ body: streamOf(RELAY_MAX_BODY_BYTES), duplex: true }));
    expect(res.status).toBe(204);
    expect(((fetchMock.mock.calls[0][1] as RequestInit).body as Uint8Array).byteLength).toBe(
      RELAY_MAX_BODY_BYTES
    );
  });
});

describe("R-DBERR — Fehler der Abfrage", () => {
  it.each([
    [{ table: "domains", kind: "error" } as Fault],
    [{ table: "projects", kind: "error" } as Fault],
    [{ table: "projects", kind: "throw" } as Fault],
  ])("R-DBERR: %o -> 502, kein fetch", async (fault) => {
    addProject({ id: "p-a", label: LABEL_A });
    faults = [fault];
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-DBERR: mehr als eine Zeile (maybeSingle) -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    addProject({ id: "p-a2", label: LABEL_A });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-DBERR: kein auslieferbares HTML -> 502 (dasselbe Urteil wie die Auslieferung)", async () => {
    addProject({ id: "p-a", label: LABEL_A, html: "   " });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-DBERR: zwei Ziele zur selben Kennung in einem Satz -> 502", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, EP_A), ft(ID, EP_A)] });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-DBERR: ein Mapping-Satz, der keine Liste ist -> 502", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: { [ID]: ft(ID, EP_A) } });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// R-AB — der Mapping-Satz
// ---------------------------------------------------------------------------

describe("R-AB — welcher Mapping-Satz gilt (Vermerk P13.6-58, G3; Setzung P13.6-59, Q2)", () => {
  const B_TO_B = { html: "<p>b</p>", mappings: [ft(ID, EP_B)] };

  it("R-AB1: Test AUS, Cookie b -> Adresse aus A (das Flag ist die Autoritaet)", async () => {
    addProject({ id: "p-a", label: LABEL_A, ab: false, variantB: B_TO_B });
    expect((await handleRelay(req({ cookie: "__Host-ps_v=b" }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });

  it("R-AB2: Test AN, Cookie b -> Adresse aus B", async () => {
    addProject({ id: "p-a", label: LABEL_A, ab: true, variantB: B_TO_B });
    expect((await handleRelay(req({ cookie: "__Host-ps_v=b" }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_B]);
  });

  it("R-AB3: Test AN, Cookie a -> Adresse aus A", async () => {
    addProject({ id: "p-a", label: LABEL_A, ab: true, variantB: B_TO_B });
    expect((await handleRelay(req({ cookie: "__Host-ps_v=a" }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });

  it("R-AB4a: Test AN, kein Cookie, nur A traegt ein Ziel zur Kennung -> Adresse aus A", async () => {
    addProject({
      id: "p-a",
      label: LABEL_A,
      ab: true,
      variantB: { html: "<p>b</p>", mappings: [ft("ps-other1", EP_B)] },
    });
    expect((await handleRelay(req())).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });

  it("R-AB4b: Test AN, kein Cookie, beide tragen dieselbe Adresse -> diese", async () => {
    addProject({
      id: "p-a",
      label: LABEL_A,
      ab: true,
      variantB: { html: "<p>b</p>", mappings: [ft(ID, EP_A)] },
    });
    expect((await handleRelay(req())).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });

  it("R-AB4c: Test AN, kein Cookie, zwei verschiedene Adressen -> 502, kein fetch", async () => {
    addProject({ id: "p-a", label: LABEL_A, ab: true, variantB: B_TO_B });
    await expectNotDelivered(await handleRelay(req()));
    expect(fetchMock).not.toHaveBeenCalled();
    // Ein ungueltiges Cookie zaehlt wie keines.
    await expectNotDelivered(await handleRelay(req({ cookie: "__Host-ps_v=x" })));
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("R-AB5: Test AN, aber B nicht auslieferbar, Cookie b -> Adresse aus A", async () => {
    addProject({
      id: "p-a",
      label: LABEL_A,
      ab: true,
      variantB: { html: "", mappings: [ft(ID, EP_B)] },
    });
    expect((await handleRelay(req({ cookie: "__Host-ps_v=b" }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A]);
  });
});

// ---------------------------------------------------------------------------
// R-TENANT — Mandantentrennung (G10)
// ---------------------------------------------------------------------------

describe("R-TENANT — die Kennung eines fremden Projekts wird ueber den eigenen Host nie zugestellt", () => {
  // Mutation M4 (Suche nicht auf das Projekt beschraenkt) trifft genau diese Klasse.
  it("R-TENANT-1: Host von A, Kennung eines Formulars aus B -> 502; Host von B -> 204", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, EP_A)] });
    addProject({ id: "p-b", label: LABEL_B, mappings: [ft(ID_B, EP_B)] });
    await expectNotDelivered(await handleRelay(req({ host: HOST_A, id: ID_B })));
    expect(fetchMock).not.toHaveBeenCalled();
    // Positivkontrolle: dieselbe Kennung ueber ihren eigenen Host.
    expect((await handleRelay(req({ host: HOST_B, id: ID_B }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_B]);
  });

  it("R-TENANT-2: dieselbe Kennung in A und B, verschiedene Adressen -> jeder Host fuehrt zu seiner", async () => {
    addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, EP_A)] });
    addProject({ id: "p-b", label: LABEL_B, mappings: [ft(ID, EP_B)] });
    expect((await handleRelay(req({ host: HOST_A }))).status).toBe(204);
    expect((await handleRelay(req({ host: HOST_B }))).status).toBe(204);
    expect(fetchedUrls()).toEqual([EP_A, EP_B]);
  });
});

// ---------------------------------------------------------------------------
// R-LOG, R-NOTHROW — Logfreiheit und kein Wurf (Setzung P13.6-50, R3)
// ---------------------------------------------------------------------------

describe("R-LOG, R-NOTHROW — kein Feldwert, kein Fremdtext in einer Logzeile; kein Wurf", () => {
  // Der Marker steht in einem Feldwert UND einem Feldnamen, in jeder herbeigefuehrten
  // Fehlermeldung (Datenbank, fetch, Rumpf-Strom) und im Rumpf der Anbieter-Antwort.
  // GRENZE DIESES WAECHTERS: Er prueft die Wege, die er herbeifuehrt. errorName gibt den
  // NAMEN eines Fehlers aus; ein Fehlerobjekt, dessen Name einen Wert traegt, ist hier nicht
  // nachgestellt — fetch und die Datenbank-Anbindung liefern Namen aus ihrem eigenen
  // Vokabular.
  const MARK_BODY = `email=${MARK}%40x.test&${MARK}_name=${MARK}`;

  function erroringStream(): ReadableStream<Uint8Array> {
    return new ReadableStream({
      pull(controller) {
        controller.error(new Error(`stream ${MARK}`));
      },
    });
  }

  const scenarios: { name: string; status: 204 | 502; setup: () => Request }[] = [
    {
      name: "zugestellt",
      status: 204,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        return req({ body: MARK_BODY });
      },
    },
    { name: "unbekannter Host", status: 502, setup: () => req({ body: MARK_BODY }) },
    {
      name: "falscher Content-Type",
      status: 502,
      setup: () => req({ body: MARK_BODY, contentType: `text/plain; x=${MARK}` }),
    },
    {
      name: "zu gross",
      status: 502,
      setup: () => req({ body: MARK_BODY.repeat(RELAY_MAX_BODY_BYTES / 10) }),
    },
    {
      name: "Rumpf-Strom bricht",
      status: 502,
      setup: () => req({ body: erroringStream(), duplex: true }),
    },
    {
      name: "Datenbank-Fehler",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        faults = [{ table: "projects", kind: "error" }];
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "Datenbank wirft",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        faults = [{ table: "domains", kind: "throw" }];
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "unbekannte Kennung",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        return req({ body: MARK_BODY, id: "ps-zzz999" });
      },
    },
    {
      name: "Host nicht auf der Liste",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A, mappings: [ft(ID, `https://hook.eu1.make.com/${MARK}`)] });
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "gesperrt",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A, blockedProject: MARK });
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "Anbieter 500 mit Marker im Rumpf",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        fetchMock.mockImplementation(async () => new Response(`echo ${MARK_BODY}`, { status: 500 }));
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "fetch wirft mit Marker",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        fetchMock.mockImplementation(async () => {
          throw new Error(`upstream ${MARK_BODY}`);
        });
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "fetch wirft einen String",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        fetchMock.mockImplementation(async () => {
          throw `raw ${MARK}`;
        });
        return req({ body: MARK_BODY });
      },
    },
    {
      name: "Admin-Client wirft",
      status: 502,
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        createAdminClient.mockImplementation(() => {
          throw new Error(`client ${MARK}`);
        });
        return req({ body: MARK_BODY });
      },
    },
  ];

  it.each(scenarios.map((s) => [s.name, s] as const))(
    "R-LOG/R-NOTHROW: %s",
    async (_name, scenario) => {
      const request = scenario.setup();
      const res = await handleRelay(request);
      expect(res).toBeInstanceOf(Response);
      expect(res.status).toBe(scenario.status);
      expect(await res.text()).toBe("");
      expect(logText()).not.toContain(MARK);
      // Genau eine Zeile je Fehlschlag, keine bei Erfolg (Setzung P13.6-59, Q4).
      const lines = logLines();
      if (scenario.status === 204) expect(lines).toEqual([]);
      else {
        expect(lines).toHaveLength(1);
        expect(lines[0]).toMatch(/^\[relay\] not delivered: [a-z-]+( [0-9]{3})?( [A-Za-z]+)?$/);
      }
    }
  );

  it("R-LOG Positivkontrolle 1: der Spion faengt eine Zeile mit dem Marker", () => {
    console.warn(`kontrolle ${MARK}`);
    expect(logText()).toContain(MARK);
  });

  it("R-LOG Positivkontrolle 2: der Marker erreicht den weitergeleiteten Rumpf", async () => {
    addProject({ id: "p-a", label: LABEL_A });
    await handleRelay(req({ body: MARK_BODY }));
    const body = (fetchMock.mock.calls[0][1] as RequestInit).body as Uint8Array;
    expect(new TextDecoder().decode(body)).toContain(MARK);
  });
});

// ---------------------------------------------------------------------------
// R-PARITY — Relay-Suche und Resolver urteilen gleich (Setzung P13.6-59, Q1)
// ---------------------------------------------------------------------------

describe("R-PARITY — dieselben Daten, dasselbe Urteil wie die Auslieferung", () => {
  const cases: { name: string; setup: () => void }[] = [
    { name: "ausgeliefert", setup: () => addProject({ id: "p-a", label: LABEL_A }) },
    {
      name: "A/B aktiv, B auslieferbar",
      setup: () =>
        addProject({
          id: "p-a",
          label: LABEL_A,
          ab: true,
          variantB: { html: "<p>b</p>", mappings: [] },
        }),
    },
    {
      name: "A/B-Flag an, B leer",
      setup: () =>
        addProject({ id: "p-a", label: LABEL_A, ab: true, variantB: { html: " ", mappings: [] } }),
    },
    {
      name: "Domain gesperrt",
      setup: () => addProject({ id: "p-a", label: LABEL_A, blockedDomain: "2026-09-29" }),
    },
    {
      name: "Projekt gesperrt",
      setup: () => addProject({ id: "p-a", label: LABEL_A, blockedProject: "2026-09-29" }),
    },
    {
      name: "gesperrt UND leer",
      setup: () =>
        addProject({ id: "p-a", label: LABEL_A, blockedProject: "2026-09-29", html: "" }),
    },
    { name: "keine Domain", setup: () => {} },
    {
      name: "Domain ohne Projekt",
      setup: () => addProject({ id: "p-a", label: LABEL_A, noProjectRow: true }),
    },
    {
      name: "Fehler an domains",
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        faults = [{ table: "domains", kind: "error" }];
      },
    },
    {
      name: "Fehler an projects",
      setup: () => {
        addProject({ id: "p-a", label: LABEL_A });
        faults = [{ table: "projects", kind: "error" }];
      },
    },
    { name: "leeres HTML", setup: () => addProject({ id: "p-a", label: LABEL_A, html: "" }) },
    {
      name: "published_content null",
      setup: () => addProject({ id: "p-a", label: LABEL_A, published: null }),
    },
  ];

  it.each(cases.map((c) => [c.name, c] as const))("R-PARITY: %s", async (_name, c) => {
    c.setup();
    const serve = await getPublishedHtmlByLabel(LABEL_A);
    const relay = await lookupRelayProject(HOST_A);
    const relayKind =
      relay.kind === "ok" ? "ok" : relay.reason === "blocked" ? "blocked" : "notfound";
    expect(relayKind).toBe(serve.kind);
    if (serve.kind === "ok" && relay.kind === "ok") {
      expect(relay.abTestActive).toBe(serve.abTestActive === true);
    }
  });
});

// ---------------------------------------------------------------------------
// Die Route und die Grenze der Importe
// ---------------------------------------------------------------------------

describe("R-ROUTE — nur POST", () => {
  it("R-ROUTE: die Route exportiert POST = handleRelay und keine andere Methode", () => {
    expect(route.POST).toBe(handleRelay);
    for (const m of ["GET", "PUT", "PATCH", "DELETE", "OPTIONS", "HEAD"]) {
      expect(m in route).toBe(false);
    }
  });
});

describe("R-SOURCE — das Relay importiert nichts aus dem Ingest oder der Analytik", () => {
  // Ein Waechter ueber Quelltext: Er sieht Zeichen, nicht Bedeutung. Er prueft nur
  // Import-Zeilen der drei Relay-Dateien und irrt in die strenge Richtung (jede Zeile, die
  // mit "import" beginnt und einen solchen Pfad nennt, macht ihn rot).
  const FORBIDDEN = /^import[^\n]*["']@\/lib\/(capi|analytics)\//m;

  it("R-SOURCE Positivkontrolle: das Muster trifft eine solche Zeile", () => {
    expect(FORBIDDEN.test('import { handleIngest } from "@/lib/capi/ingest";')).toBe(true);
  });

  it.each(["relay.ts", "resolve-relay.ts", "hosts.ts", "path.ts"])(
    "R-SOURCE: %s",
    (file) => {
      const text = readFileSync(path.join(__dirname, file), "utf8");
      expect(text).toMatch(/^(import|\/\/)/m);
      expect(FORBIDDEN.test(text)).toBe(false);
    }
  );
});
