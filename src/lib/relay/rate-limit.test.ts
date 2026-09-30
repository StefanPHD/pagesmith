import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { RELAY_RATE_RPC } from "./rate-limit";

// DER WAECHTER UEBER DIE MIGRATION 0030 (Phase 13.6, Scheibe 13.6-5).
//
// DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN, NICHT AUS DEM SQL-TEXT (Dauerregel "EIN
// WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"), Standdatei der
// Phase 13.6:
// - Tabelle relay_rate_counters (Setzung P13.6-75, E12), genau drei Spalten project_id,
//   window_start, hits (Bau-Auftrag der Scheibe; Setzung P13.6-74, I3: keine IP, kein UA,
//   kein Host, kein Inhalt).
// - RLS aktiv, KEINE Policy (Setzung P13.6-74, I8; Bau-Auftrag).
// - EXECUTE entzogen fuer public, anon, authenticated; gewaehrt fuer service_role
//   (docs/plattform-befunde.md, Supabase, Teil (ax)).
// - SECURITY INVOKER (Setzung P13.6-77); search_path '' und ein voll qualifizierter Rumpf
//   (Owner-Entscheidung P13.6-76).
// - Das Fenster laeuft nie rueckwaerts (Setzung P13.6-75, E1).
// - Letzte Anweisung: der Protokoll-Eintrag (docs/db-regeln.md, "MIGRATION IMMER VOR
//   CODE-DEPLOY").
//
// GRENZE DIESES WAECHTERS, AN IHM SELBST (Dauerregel "EIN WAECHTER UEBER QUELLTEXT SIEHT
// ZEICHEN, NICHT BEDEUTUNG"): Er liest den TEXT der Datei, nicht die laufende Datenbank. Ob
// die Migration angewandt ist und so wirkt, sagt allein die Probe
// supabase/checks/relay-rate-counters.sql und der Live-Test. Er irrt in die strenge Richtung:
// Er entfernt Kommentare und vergleicht Zeichenfolgen nach Kleinschreibung und
// zusammengezogenem Leerraum — eine gleichwertige, aber anders geschriebene Anweisung macht
// ihn rot und wird dann HIER geprueft, nicht am SQL weichgemacht.

const MIGRATION = path.join(
  __dirname,
  "..",
  "..",
  "..",
  "supabase",
  "migrations",
  "0030_relay_rate_counters.sql"
);

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

const RAW = readFileSync(MIGRATION, "utf8");
const SQL = normalize(RAW);

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

const STMTS = statements(SQL);
const CREATE_TABLE = STMTS.find((s) => s.startsWith("create table"));
const CREATE_FN = STMTS.find((s) => s.startsWith("create or replace function"));
const BODY = (CREATE_FN ?? "").split("$$")[1] ?? "";

describe("W-MIG — die Migration 0030 traegt die Entscheidungen", () => {
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

  it("W-MIG-COLS: die Tabelle traegt GENAU drei Spalten, in dieser Reihenfolge", () => {
    const open = CREATE_TABLE!.indexOf("(");
    const inner = CREATE_TABLE!.slice(open + 1, CREATE_TABLE!.lastIndexOf(")"));
    expect(CREATE_TABLE!.slice(0, open).trim()).toBe(
      "create table if not exists public.relay_rate_counters"
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
    expect(STMTS).toContain("alter table public.relay_rate_counters enable row level security");
    expect(SQL).not.toContain("create policy");
    // Positivkontrolle: dieselbe Suche findet eine Policy, wo eine steht.
    expect(normalize("CREATE  POLICY p ON t")).toContain("create policy");
  });

  it("W-MIG-GRANT: Tabellenrechte — anon und authenticated entzogen, service_role ausdruecklich", () => {
    expect(STMTS).toContain(
      "revoke all on table public.relay_rate_counters from anon, authenticated"
    );
    expect(STMTS).toContain(
      "grant select, insert, update on table public.relay_rate_counters to service_role"
    );
  });

  it("W-MIG-EXEC: EXECUTE entzogen fuer public, anon UND authenticated; gewaehrt nur service_role", () => {
    const revoke = STMTS.filter((s) => s.startsWith("revoke execute on function"));
    expect(revoke).toHaveLength(1);
    expect(revoke[0]).toMatch(/^revoke execute on function public\.relay_rate_hit\(uuid, integer\) from /);
    const roles = revoke[0].split(" from ")[1].split(",").map((r) => r.trim()).sort();
    expect(roles).toEqual(["anon", "authenticated", "public"]);
    const grants = STMTS.filter((s) => s.startsWith("grant execute"));
    expect(grants).toEqual([
      "grant execute on function public.relay_rate_hit(uuid, integer) to service_role",
    ]);
  });

  it("W-MIG-FN: SECURITY INVOKER, search_path '', und der Name und die Argumente des Codes", () => {
    const head = CREATE_FN!.split("$$")[0];
    expect(head).toContain(
      `create or replace function public.${RELAY_RATE_RPC}(p_project_id uuid, p_window_seconds integer)`
    );
    expect(head).toContain("returns integer");
    expect(head).toContain("security invoker");
    expect(SQL).not.toContain("security definer");
    expect(head).toContain("set search_path = ''");
    expect(SQL).not.toMatch(/search_path = (public|pg_catalog)/);
  });

  it("W-MIG-QUAL: der Rumpf ist voll qualifiziert", () => {
    // Jede Tabelle mit public., jede Funktion aus pg_catalog mit pg_catalog.
    const tableRefs = BODY.match(/[a-z_.]*relay_rate_counters/g) ?? [];
    expect(tableRefs.length).toBeGreaterThan(0);
    for (const ref of tableRefs) expect(ref).toBe("public.relay_rate_counters");
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

  it("W-MIG-LAST: die letzte Anweisung ist der Protokoll-Eintrag der 0030", () => {
    expect(STMTS[STMTS.length - 1]).toBe(
      "insert into public.schema_migrations (version, filename, applied_at) values ('0030', '0030_relay_rate_counters.sql', now()) on conflict (version) do nothing"
    );
  });
});
