import { readFileSync } from "node:fs";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  META_TARGET: "meta",
}));

// DER MUTIERBARE ZUGRIFF STATT EINES LEER-LITERALS, und das ist hier tragend und keine
// Bequemlichkeit: Diese Datei braucht die Umgebungsvariable in BEIDEN Zustaenden — leer
// fuer den Normalfall, gesetzt fuer die Vorrang-Probe (TM6) und fuer die
// Positivkontrolle der Dev-Dummy-IP (TM8). Ein festes "" liesse sich nicht umschalten,
// und ein zweiter Datei-Ableger nur fuer den gesetzten Fall waere eine dritte neue
// Datei. Bauform woertlich nach src/app/api/capi/route.test.ts.
const configState = vi.hoisted(() => ({ version: "v21.0", testCode: "" }));
vi.mock("@/lib/capi/config", () => ({
  get META_GRAPH_VERSION() {
    return configState.version;
  },
  get META_TEST_EVENT_CODE() {
    return configState.testCode;
  },
}));

// after() sammeln statt ausfuehren — dieselbe Attrappe wie in den uebrigen
// Handler-Suiten. Sie ist hier ZUGLEICH das Messinstrument: Was nie eingeplant wurde,
// kann auch nicht persistieren.
const { after, scheduled } = vi.hoisted(() => {
  const scheduled: Array<() => Promise<void> | void> = [];
  return {
    scheduled,
    after: vi.fn((cb: () => Promise<void> | void) => {
      scheduled.push(cb);
    }),
  };
});
vi.mock("next/server", () => ({ after }));

const { persistEvent } = vi.hoisted(() => ({ persistEvent: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent }));

import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { handleIngest } from "./ingest";

const META_CODE = "TEST-PROJEKT-META";
const TIKTOK_CODE = "TEST-PROJEKT-TIKTOK";
const ENV_CODE = "TEST-AUS-DER-UMGEBUNG";

const META_EMPFAENGER = {
  target: "meta" as const,
  config: { pixelId: "PIXEL-123", token: "META-SECRET" },
};
const TIKTOK_EMPFAENGER = {
  target: "tiktok" as const,
  config: { pixelId: "TT-PIXEL", token: "TT-SECRET" },
};

/**
 * Ein Beacon, dessen Einwilligungs-Draht ALLE bekannten Ziele erlaubt.
 *
 * `mitIdentitaet` IST KEINE BEQUEMLICHKEIT, SONDERN EINE VORAUSSETZUNG DES PRUEFLINGS,
 * und sie steht hier, damit der naechste Leser sie nicht erneut suchen muss:
 * forwardToTiktok traegt den Riegel "KEINE IDENTITAET, KEIN AUFRUF" — ohne Adresse UND
 * User-Agent kehrt der Adapter zurueck, BEVOR er eine Nutzlast baut. Ein Lauf, der
 * TikToks Nutzlast prueft, misst dann NICHTS und sieht wie ein Fehlschlag des Riegels
 * aus, obwohl der Adapter sich korrekt verhaelt (docs/immer-beachten.md, Lektion (c) an
 * "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").
 * FALSCH IST SIE FUER TM8: Dort ist die ABWESENHEIT der Adresse der Gegenstand — die
 * Dev-Dummy-IP entsteht ausschliesslich, wenn keine vertraute Adresse vorliegt.
 * DIE ADRESSE STAMMT AUS TEST-NET-3 (203.0.113.0/24) und ist garantiert keine echte;
 * `x-vercel-forwarded-for` ist die von resolveClientIp zuerst gelesene Kopfzeile.
 */
function beacon(
  felder: Record<string, unknown> = {},
  mitIdentitaet = true,
): Request {
  const cns: Record<string, boolean> = {};
  for (const schluessel of Object.values(CONSENT_KEY_BY_TARGET)) {
    cns[schluessel] = true;
  }
  const headers: Record<string, string> = { "content-type": "text/plain" };
  if (mitIdentitaet) {
    headers["x-vercel-forwarded-for"] = "203.0.113.7";
    headers["user-agent"] = "vitest-agent";
  }
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify({
      trackingKey: "tk-abc",
      eventID: "evt-123",
      event: "Purchase",
      [CONSENT_WIRE_FIELD]: cns,
      ...felder,
    }),
    headers,
  });
}

function aufloesung(ueberschreibungen: Record<string, unknown> = {}) {
  return {
    projectId: "proj-1",
    blocked: false,
    abTestActive: false,
    targets: [META_EMPFAENGER],
    renewable: [],
    testMode: [],
    ...ueberschreibungen,
  };
}

async function laufeHintergrund(): Promise<void> {
  for (const cb of scheduled.splice(0)) await cb();
}

/** Die Nutzlast, die an den Endpunkt mit diesem Namensbestandteil gegangen ist. */
function nutzlastAn(fragment: string): Record<string, unknown> | undefined {
  const calls = (global.fetch as unknown as { mock: { calls: [string, RequestInit][] } })
    .mock.calls;
  const treffer = calls.find(([url]) => String(url).includes(fragment));
  if (!treffer) return undefined;
  return JSON.parse(String(treffer[1]?.body)) as Record<string, unknown>;
}

beforeEach(() => {
  scheduled.length = 0;
  configState.testCode = "";
  vi.stubEnv("TIKTOK_TEST_EVENT_CODE", "");
  getCapiConfigByTrackingKey.mockResolvedValue(aufloesung());
  persistEvent.mockResolvedValue(undefined);
  global.fetch = vi.fn(
    async () =>
      new Response(JSON.stringify({ code: 0, data: {} }), { status: 200 }),
  );
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.clearAllMocks();
});

describe("Testmodus-Riegel im Ingest (Phase 11.3, Scheibe 11.3a)", () => {
  // TM1 — DER SERVER-ZWEIG. Faerbt rot, wenn der Riegel dort entfernt oder auf eine
  // andere Bedingung als resolution.testMode gelegt wird.
  it("TM1: aktiver Testzustand -> KEIN Persist im Server-Zweig, trotzdem 204", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    const res = await handleIngest(beacon());
    await laufeHintergrund();

    expect(res.status).toBe(204);
    expect(persistEvent).not.toHaveBeenCalled();
  });

  // TM2 — DER CONFIRM-ZWEIG. ER IST EIN EINZELSTUECK, und das gehoert in den Kommentar
  // (docs/immer-beachten.md, Lektion (f) an "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"):
  // KEIN anderer Lauf im Repo betritt diesen Zweig MIT aktivem Testzustand. TM1 kann ihn
  // prinzipiell nicht decken — der Confirm-Zweig kehrt ueber einen EIGENEN frueher
  // Ausgang zurueck und laeuft nie in den Server-Zweig hinein.
  // WER IHN ENTFERNT, NIMMT DIE EINZIGE ABDECKUNG DER INVARIANTE I1 MIT: Es entstuende
  // eine browser-Zeile ohne server-Gegenstueck, die Adblocker-Verlustrate zaehlte den
  // Testlauf als VERLUST, und sie taete es RUECKWIRKEND und STILL.
  it("TM2: aktiver Testzustand -> KEIN Persist im CONFIRM-Zweig, trotzdem 204", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    const res = await handleIngest(beacon({ obs: BROWSER_CONFIRM_MARKER }));
    await laufeHintergrund();

    expect(res.status).toBe(204);
    expect(persistEvent).not.toHaveBeenCalled();
  });

  // TM3 — DIE GEGENPROBE ZU TM1 UND TM2 IN EINEM. Ohne sie waere "kein Persist" auch
  // dann gruen, wenn der Persist aus einem ganz anderen Grund gar nicht mehr laeuft
  // (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL",
  // Fall 2: trivial wahr).
  it("TM3: leeres testMode -> Persist laeuft in BEIDEN Zweigen wie bisher", async () => {
    const resServer = await handleIngest(beacon());
    await laufeHintergrund();
    expect(resServer.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ source: "server" }),
    );

    persistEvent.mockClear();

    const resConfirm = await handleIngest(beacon({ obs: BROWSER_CONFIRM_MARKER }));
    await laufeHintergrund();
    expect(resConfirm.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ source: "browser" }),
    );
  });

  // TM5 — DIE EBENE. Die Fehlerklasse "verschachtelt statt top-level" ist in Phase 6
  // bezahlt worden; dieser Lauf pinnt sie fuer BEIDE Ziele. Die zweite Zusicherung je
  // Ziel ist die eigentliche: dass das Feld NICHT im Ereignis-Eintrag steht.
  it("TM5: der Projekt-Code steht top-level NEBEN data — bei meta wie bei tiktok", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [META_EMPFAENGER, TIKTOK_EMPFAENGER],
        testMode: [
          { target: "meta", code: META_CODE },
          { target: "tiktok", code: TIKTOK_CODE },
        ],
      }),
    );

    await handleIngest(beacon());

    const meta = nutzlastAn("graph.facebook.com");
    expect(meta?.test_event_code).toBe(META_CODE);
    expect((meta?.data as Record<string, unknown>[])[0]).not.toHaveProperty(
      "test_event_code",
    );

    const tiktok = nutzlastAn("business-api.tiktok.com");
    expect(tiktok?.test_event_code).toBe(TIKTOK_CODE);
    expect((tiktok?.data as Record<string, unknown>[])[0]).not.toHaveProperty(
      "test_event_code",
    );
  });

  // TM6 — DER VORRANG, IN BEIDE RICHTUNGEN. Die zweite Haelfte ist die wichtigere: sie
  // sichert die Invariante I2, dass die Umgebungsvariable ihr heutiges Verhalten
  // behaelt. Ohne sie waere ein Bau gruen, der den Env-Zweig ganz entfernt.
  it("TM6: Projekt-Code schlaegt den Env-Wert — und OHNE Projekt-Code bleibt der Env-Wert wirksam", async () => {
    configState.testCode = ENV_CODE;
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    await handleIngest(beacon());
    expect(nutzlastAn("graph.facebook.com")?.test_event_code).toBe(META_CODE);

    vi.clearAllMocks();
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ code: 0, data: {} }), { status: 200 }),
    );
    configState.testCode = ENV_CODE;
    getCapiConfigByTrackingKey.mockResolvedValue(aufloesung());

    await handleIngest(beacon());
    expect(nutzlastAn("graph.facebook.com")?.test_event_code).toBe(ENV_CODE);
  });

  // TM7 — DIE ISOLATION JE ZIEL. Faerbt rot, wenn der Code nicht je Ziel nachgeschlagen,
  // sondern global genommen wird (etwa resolution.testMode[0]).
  it("TM7: ein Testzustand fuer meta setzt bei tiktok NICHTS", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [META_EMPFAENGER, TIKTOK_EMPFAENGER],
        testMode: [{ target: "meta", code: META_CODE }],
      }),
    );

    await handleIngest(beacon());

    expect(nutzlastAn("graph.facebook.com")?.test_event_code).toBe(META_CODE);
    expect(nutzlastAn("business-api.tiktok.com")).not.toHaveProperty(
      "test_event_code",
    );
  });

  // TM8 — INVARIANTE I3, MIT POSITIVKONTROLLE. Die erste Haelfte ist eine
  // Abwesenheits-Behauptung und waere allein hohl: Sie ginge auch dann durch, wenn die
  // Dummy-IP ueberhaupt nicht mehr existierte. Die zweite Haelfte zeigt, dass der
  // Mechanismus lebt und AUSSCHLIESSLICH an der Umgebungsvariablen haengt.
  it("TM8: der Projekt-Zustand loest die Dev-Dummy-IP NICHT aus (Positivkontrolle: die Env-Variable tut es)", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    await handleIngest(beacon({}, false));
    const ohneEnv = nutzlastAn("graph.facebook.com");
    expect(
      (ohneEnv?.data as Record<string, unknown>[])[0]
        .user_data as Record<string, unknown>,
    ).not.toHaveProperty("client_ip_address");

    vi.clearAllMocks();
    global.fetch = vi.fn(
      async () =>
        new Response(JSON.stringify({ code: 0, data: {} }), { status: 200 }),
    );
    configState.testCode = ENV_CODE;
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    await handleIngest(beacon({}, false));
    const mitEnv = nutzlastAn("graph.facebook.com");
    expect(
      (mitEnv?.data as Record<string, unknown>[])[0]
        .user_data as Record<string, unknown>,
    ).toHaveProperty("client_ip_address");
  });

  // TM9 — DAS 204-CONTAINMENT AUF DEM NEUEN PFAD (Invariante I4). Der Riegel darf die
  // Antwort weder in einen Body noch in einen 500 kippen; nach aussen ist er von jedem
  // anderen Ausgang ununterscheidbar, und das ist Absicht.
  it("TM9: der Riegel-Pfad antwortet mit LEERER 204 — kein Body, kein 500", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: META_CODE }] }),
    );

    const res = await handleIngest(beacon());

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });
});

// W1 — DER WAECHTER UEBER DEN MIGRATIONSTEXT.
//
// SEINE GRENZE STEHT AN IHM SELBST (docs/immer-beachten.md, "EIN WAECHTER UEBER
// QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG"): Er DURCHSUCHT eine Datei und kann eine
// Anweisung nicht von ihrer Erwaehnung in einem Kommentar trennen. Er ist deshalb
// bewusst so gebaut, dass er in die STRENGE Richtung irrt — der Suchbegriff "create
// policy" trifft auch eine Kommentarzeile, die ihn nennt. Faellt er, wird HINGESEHEN und
// nicht die Zusicherung aufgeweicht.
describe("W1 — die Migration 0028 legt keine Policy an und ruehrt keine Zeile an", () => {
  const PFAD = "supabase/migrations/0028_project_secrets_test_mode.sql";
  const VERBOTEN = ["create policy", "update public.project_secrets set", "delete from"];

  function treffer(text: string): string[] {
    const klein = text.toLowerCase();
    return VERBOTEN.filter((begriff) => klein.includes(begriff));
  }

  it("W1: kein create policy, kein update ... set, kein delete", () => {
    expect(treffer(readFileSync(PFAD, "utf8"))).toEqual([]);
  });

  // DIE POSITIVKONTROLLE, OHNE DIE DER LAUF DARUEBER NICHTS BEWEIST: Ein echter
  // Nicht-Treffer und ein kaputt gewordener Sucher sind an einem leeren Ergebnis NICHT
  // zu unterscheiden (docs/immer-beachten.md, Lektion (d) an "MUTATIONSPROBEN UND
  // LIVE-TEST-INSTRUMENTE"). Dieser Lauf zeigt, dass derselbe Sucher findet, was er
  // finden soll — und er laeuft gegen eine erfundene Zeichenkette, nie gegen eine Datei.
  it("W1-Positivkontrolle: derselbe Sucher findet die verbotenen Formen sehr wohl", () => {
    expect(treffer("alter table x;\ncreate policy p on x for select using (true);")).toEqual([
      "create policy",
    ]);
    expect(treffer("update public.project_secrets set test_event_code = null;")).toEqual([
      "update public.project_secrets set",
    ]);
    expect(treffer("delete from public.project_secrets;")).toEqual(["delete from"]);
  });
});
