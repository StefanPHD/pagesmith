import { readFileSync } from "node:fs";
import path from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import {
  INGEST_FORWARD_LIMIT,
  INGEST_FORWARD_RPC,
  INGEST_FORWARD_TIMEOUT_MS,
  INGEST_FORWARD_WINDOW_SECONDS,
  countForwardHit,
} from "./forward-limit";

// DER WEITERLEITUNGS-ZAEHLER (Phase 13.7, Scheibe K1b; Zuschnitt P13.7-60 der Phase 13.7).
//
// DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN, NICHT AUS DEM CODE ODER DEM SQL-TEXT
// (Dauerregel "EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"):
// - D3 zum Plan (ARCHITEKT 2026-10-03): 600 je 60 s je Projekt, Zeitlimit 1000 ms.
// - D5: Migration 0032, Variante K-ue1 — genau drei Spalten wie 0030, keine Ueberlauf-Spalten.
// - Zuschnitt (c): eigene Tabelle nach dem Muster 0030; (d): fail-open, null ohne Fehler ist
//   ein Ausfall.
// - docs/db-regeln.md: search_path '', voll qualifiziert; Protokoll-Eintrag als letzte
//   Anweisung. docs/plattform-befunde.md, Supabase, Teil (ax): EXECUTE je Funktion entziehen.
//
// GRENZE DER W-MIG-WAECHTER, AN IHNEN SELBST (Dauerregel "EIN WAECHTER UEBER QUELLTEXT SIEHT
// ZEICHEN, NICHT BEDEUTUNG"): Sie lesen den TEXT der Datei, nicht die laufende Datenbank. Ob die
// Migration angewandt ist und so wirkt, sagt allein die Probe
// supabase/checks/ingest-forward-counters.sql und der Live-Test. Sie irren in die strenge
// Richtung: eine gleichwertige, aber anders geschriebene Anweisung macht sie rot und wird dann
// HIER geprueft, nicht am SQL weichgemacht.

const ROOT = path.join(__dirname, "..", "..", "..");
const MIGRATION = path.join(ROOT, "supabase", "migrations", "0032_ingest_forward_counters.sql");
const PROBE = path.join(ROOT, "supabase", "checks", "ingest-forward-counters.sql");

/** Zeilenkommentare entfernen, Leerraum zusammenziehen, Kleinschreibung. */
function normalize(sql: string): string {
  return sql
    .split("\n")
    .map((line) => {
      const i = line.indexOf("--");
      return i === -1 ? line : line.slice(0, i);
    })
    .join("\n")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}

function statements(sql: string): string[] {
  // Die Rumpf-Grenzen $$ … $$ enthalten Semikola nicht; der Rumpf bleibt ein Stueck.
  const out: string[] = [];
  let cur = "";
  let inBody = false;
  for (let i = 0; i < sql.length; i++) {
    if (sql.startsWith("$$", i)) {
      inBody = !inBody;
      cur += "$$";
      i++;
      continue;
    }
    if (sql[i] === ";" && !inBody) {
      if (cur.trim()) out.push(cur.trim());
      cur = "";
      continue;
    }
    cur += sql[i];
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

function topLevelParts(s: string): string[] {
  const parts: string[] = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      parts.push(cur.trim());
      cur = "";
      continue;
    }
    cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

const SQL = normalize(readFileSync(MIGRATION, "utf8"));
const STMTS = statements(SQL);
const CREATE_TABLE = STMTS.find((s) => s.startsWith("create table"));
const CREATE_FN = STMTS.find((s) => s.startsWith("create or replace function"));
const BODY = (CREATE_FN ?? "").split("$$")[1] ?? "";

describe("W-MIG — die Migration 0032 traegt die Entscheidungen", () => {
  it("W-MIG Positivkontrolle: die Normalisierung laesst den Text stehen und entfernt Kommentare", () => {
    expect(SQL.length).toBeGreaterThan(500);
    expect(normalize("select 1; -- create policy x\ncreate policy y")).toBe(
      "select 1; create policy y"
    );
    expect(STMTS.length).toBeGreaterThanOrEqual(8);
    expect(CREATE_TABLE).toBeDefined();
    expect(CREATE_FN).toBeDefined();
    expect(BODY.length).toBeGreaterThan(50);
  });

  it("W-MIG-COLS: die Tabelle traegt GENAU drei Spalten, in dieser Reihenfolge (D5, K-ue1)", () => {
    const open = CREATE_TABLE!.indexOf("(");
    const inner = CREATE_TABLE!.slice(open + 1, CREATE_TABLE!.lastIndexOf(")"));
    expect(CREATE_TABLE!.slice(0, open).trim()).toBe(
      "create table if not exists public.ingest_forward_counters"
    );
    const columns = topLevelParts(inner)
      .filter((p) => !/^(constraint|primary key|foreign key|unique|check)\b/.test(p))
      .map((p) => p.split(" ")[0]);
    expect(columns).toEqual(["project_id", "window_start", "hits"]);
  });

  it("W-MIG-COLS: Schluessel, Kaskade und die Untergrenze der Zaehlung", () => {
    expect(CREATE_TABLE).toContain(
      "project_id uuid primary key references public.projects (id) on delete cascade"
    );
    expect(CREATE_TABLE).toContain("check (hits >= 1)");
  });

  it("W-MIG-RLS: RLS ist aktiv, und es entsteht KEINE Policy", () => {
    expect(STMTS).toContain("alter table public.ingest_forward_counters enable row level security");
    expect(SQL).not.toContain("create policy");
    // Positivkontrolle: dieselbe Suche findet eine Policy, wo eine steht.
    expect(normalize("CREATE  POLICY p ON t")).toContain("create policy");
  });

  it("W-MIG-GRANT: Tabellenrechte — anon und authenticated entzogen, service_role ausdruecklich", () => {
    expect(STMTS).toContain(
      "revoke all on table public.ingest_forward_counters from anon, authenticated"
    );
    expect(STMTS).toContain(
      "grant select, insert, update on table public.ingest_forward_counters to service_role"
    );
  });

  it("W-MIG-EXEC: EXECUTE entzogen fuer public, anon UND authenticated; gewaehrt nur service_role", () => {
    const revoke = STMTS.filter((s) => s.startsWith("revoke execute on function"));
    expect(revoke).toHaveLength(1);
    expect(revoke[0]).toMatch(
      /^revoke execute on function public\.ingest_forward_hit\(uuid, integer\) from /
    );
    const roles = revoke[0].split(" from ")[1].split(",").map((r) => r.trim()).sort();
    expect(roles).toEqual(["anon", "authenticated", "public"]);
    const grants = STMTS.filter((s) => s.startsWith("grant execute"));
    expect(grants).toEqual([
      "grant execute on function public.ingest_forward_hit(uuid, integer) to service_role",
    ]);
  });

  it("W-MIG-FN: SECURITY INVOKER, search_path '', und der Name und die Argumente des Codes", () => {
    const head = CREATE_FN!.split("$$")[0];
    expect(head).toContain(
      `create or replace function public.${INGEST_FORWARD_RPC}(p_project_id uuid, p_window_seconds integer)`
    );
    expect(head).toContain("returns integer");
    expect(head).toContain("security invoker");
    expect(SQL).not.toContain("security definer");
    expect(head).toContain("set search_path = ''");
    expect(SQL).not.toMatch(/search_path = (public|pg_catalog)/);
  });

  it("W-MIG-QUAL: der Rumpf ist voll qualifiziert", () => {
    const tableRefs = BODY.match(/[a-z_.]*ingest_forward_counters/g) ?? [];
    expect(tableRefs.length).toBeGreaterThan(0);
    for (const ref of tableRefs) expect(ref).toBe("public.ingest_forward_counters");
    for (const fn of ["date_bin", "now", "make_interval"]) {
      const refs = BODY.match(new RegExp(`[a-z_.]*\\b${fn}\\(`, "g")) ?? [];
      expect(refs.length).toBeGreaterThan(0);
      for (const ref of refs) expect(ref).toBe(`pg_catalog.${fn}(`);
    }
  });

  it("W-MIG-MONO: das Fenster laeuft nur vorwaerts; zurueckgesetzt wird nur bei einem NEUEREN Fenster", () => {
    expect(BODY).toContain("on conflict (project_id) do update");
    expect(BODY).toContain(
      "set window_start = case when excluded.window_start > c.window_start then excluded.window_start else c.window_start end"
    );
    expect(BODY).toContain(
      "hits = case when excluded.window_start > c.window_start then 1 else c.hits + 1 end"
    );
    expect(BODY).toContain("returning hits");
  });

  it("W-MIG-LAST: die letzte Anweisung ist der Protokoll-Eintrag der 0032", () => {
    expect(STMTS[STMTS.length - 1]).toBe(
      "insert into public.schema_migrations (version, filename, applied_at) values ('0032', '0032_ingest_forward_counters.sql', now()) on conflict (version) do nothing"
    );
  });

  it("W-MIG-NAHT: die Migration fasst relay_rate_counters nicht an (Zuschnitt (c))", () => {
    expect(SQL).not.toContain("relay_rate");
    // Positivkontrolle: dieselbe Suche trifft, wo es steht.
    expect(normalize("select * from public.relay_rate_counters")).toContain("relay_rate");
  });
});

describe("W-PROBE — die Probe supabase/checks/ingest-forward-counters.sql", () => {
  const PROBE_RAW = readFileSync(PROBE, "utf8");
  const PROBE_SQL = normalize(PROBE_RAW);

  it("W-PROBE-LIMIT: die Lesehilfe 600 steht im Gleichlauf mit der Grenze aus D3", () => {
    // Erwartung aus der ENTSCHEIDUNG D3, nicht aus dem Code.
    expect(INGEST_FORWARD_LIMIT).toBe(600);
    const lesehilfen = PROBE_SQL.match(/hits > (\d+)/g) ?? [];
    expect(lesehilfen).toHaveLength(2);
    for (const l of lesehilfen) expect(l).toBe(`hits > ${INGEST_FORWARD_LIMIT}`);
  });

  it("W-PROBE-PLATZHALTER: genau EINE Einsetzstelle ausserhalb der Kommentare", () => {
    const treffer = PROBE_SQL.match(/<projekt_uuid>/g) ?? [];
    expect(treffer).toHaveLength(1);
  });

  it("W-PROBE-LESEND: die Probe schreibt nicht (Bauform 1 aus supabase/checks/README.md)", () => {
    for (const verb of [" insert ", " update ", " delete ", " alter ", " create ", " drop ", " truncate "]) {
      expect(` ${PROBE_SQL} `).not.toContain(verb);
    }
    // Positivkontrolle: dieselbe Suche trifft ein schreibendes Verb.
    expect(` ${normalize("UPDATE t SET a = 1")} `).toContain(" update ");
  });

  it("W-PROBE-SELBSTTEST: ein unersetzter Platzhalter fuehrt auf 'PLATZHALTER NICHT ERSETZT', nicht auf einen Fehler", () => {
    // Der Vergleich laeuft auf Text; eine Typumwandlung des Platzhalters braeche mit einem Fehler ab.
    expect(PROBE_SQL).toContain("'<projekt_uuid>'::text");
    expect(PROBE_SQL).not.toContain("'<projekt_uuid>'::uuid");
    expect(PROBE_SQL).toContain("then 'platzhalter nicht ersetzt'");
  });
});

// ---------------------------------------------------------------------------
// V — DAS URTEIL VON countForwardHit
// ---------------------------------------------------------------------------

type RpcErgebnis = { data: unknown; error: unknown };

function zaehlerLiefert(ergebnis: RpcErgebnis | Promise<RpcErgebnis> | "wirft" | "haengt") {
  const aufrufe: { fn: string; args: unknown }[] = [];
  const signale: AbortSignal[] = [];
  createAdminClient.mockImplementation(() => ({
    rpc: (fn: string, args: unknown) => {
      aufrufe.push({ fn, args });
      if (ergebnis === "wirft") throw new Error("ERFUNDEN: Zaehler kaputt");
      return {
        abortSignal: (s: AbortSignal) => {
          signale.push(s);
          if (ergebnis === "haengt") return new Promise(() => {});
          return Promise.resolve(ergebnis);
        },
      };
    },
  }));
  return { aufrufe, signale };
}

beforeEach(() => {
  createAdminClient.mockReset();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("V — das Urteil des Zaehlers", () => {
  it("V-CONST: die Werte der Entscheidung D3", () => {
    expect(INGEST_FORWARD_LIMIT).toBe(600);
    expect(INGEST_FORWARD_WINDOW_SECONDS).toBe(60);
    expect(INGEST_FORWARD_TIMEOUT_MS).toBe(1000);
    expect(INGEST_FORWARD_RPC).toBe("ingest_forward_hit");
  });

  it("V-CALL: genau EIN Aufruf der RPC, mit der Projekt-Kennung und der Fensterlaenge, mit Abbruch-Signal", async () => {
    const { aufrufe, signale } = zaehlerLiefert({ data: 1, error: null });
    await countForwardHit("proj-1");
    expect(aufrufe).toEqual([
      { fn: "ingest_forward_hit", args: { p_project_id: "proj-1", p_window_seconds: 60 } },
    ]);
    expect(signale).toHaveLength(1);
  });

  it("V-EDGE (Positivkontrolle zu V-LIMIT): der 600. Wert ist 'allowed'", async () => {
    zaehlerLiefert({ data: 600, error: null });
    expect(await countForwardHit("proj-1")).toEqual({ kind: "allowed" });
  });

  it("V-LIMIT: der 601. Wert ist 'limited' und der ERSTE Ueberlauf", async () => {
    zaehlerLiefert({ data: 601, error: null });
    expect(await countForwardHit("proj-1")).toEqual({ kind: "limited", first: true });
  });

  it("V-LIMIT: der 602. Wert ist 'limited', aber NICHT der erste Ueberlauf", async () => {
    zaehlerLiefert({ data: 602, error: null });
    expect(await countForwardHit("proj-1")).toEqual({ kind: "limited", first: false });
  });

  it.each([
    ["ein zurueckgegebenes error", { data: null, error: { code: "PGRST202", message: "x" } }],
    ["null OHNE error", { data: null, error: null }],
    ["keine ganze Zahl", { data: 1.5, error: null }],
    ["eine Zeichenkette", { data: "601", error: null }],
  ] as const)("V-FAIL: %s -> 'failed'", async (_n, ergebnis) => {
    zaehlerLiefert(ergebnis);
    expect(await countForwardHit("proj-1")).toEqual({ kind: "failed" });
  });

  it("V-FAIL: ein Wurf -> 'failed', der Wurf verlaesst die Funktion nicht", async () => {
    zaehlerLiefert("wirft");
    expect(await countForwardHit("proj-1")).toEqual({ kind: "failed" });
  });

  it("V-TIME: Haengen ueber das Zeitlimit -> 'failed' nach INGEST_FORWARD_TIMEOUT_MS, nicht vorher, mit Abbruch", async () => {
    vi.useFakeTimers();
    const { signale } = zaehlerLiefert("haengt");
    let urteil: unknown = "offen";
    void countForwardHit("proj-1").then((u) => {
      urteil = u;
    });
    await vi.advanceTimersByTimeAsync(INGEST_FORWARD_TIMEOUT_MS - 1);
    expect(urteil).toBe("offen");
    expect(signale[0].aborted).toBe(false);
    await vi.advanceTimersByTimeAsync(1);
    expect(urteil).toEqual({ kind: "failed" });
    expect(signale[0].aborted).toBe(true);
  });
});
