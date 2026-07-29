import { readFileSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

/**
 * MENGENLOGIK-TESTS ZUR RPC get_variant_counts (Phase 9 Scheibe 9c-1).
 *
 * QUELLE IST DAS SQL: supabase/migrations/0019_variant_counts.sql. Die Portierung unten
 * SPIEGELT die dort deployte Funktion — nicht umgekehrt. Wer die Mengenlogik aendert,
 * aendert ZUERST die Migration und zieht die Portierung nach.
 *
 * WARUM UEBERHAUPT EINE PORTIERUNG: die Vitest-Suite hat keine Postgres-Instanz. Ohne sie
 * waere die Kernlogik dieser Scheibe (source-Filter, filter-Aggregate, Zeilen ohne
 * Zuordnung) voellig ungetestet — dieselbe Ueberlegung wie bei der Verlustraten-Scheibe.
 *
 * ABWEICHUNG VOM PRAEZEDENZFALL, ausdruecklich (s. Bericht): die Verlustraten-Portierung
 * liegt als eigenes Modul unter src/lib/analytics/. Diese hier liegt IM TESTFILE, weil der
 * Scope dieser Runde src/lib/analytics/ nicht einschliesst. Inhaltlich aendert das nichts
 * — auch das Vorbild wird von der App NICHT aufgerufen, nur vom Test —, aber es ist eine
 * bewusste Abweichung und keine stille.
 *
 * EHRLICHE GRENZE: ein gruener Test hier beweist NICHT, dass die DEPLOYTE Funktion dasselbe
 * tut ("gruen aber falsch"-Naht), und er beweist erst recht NICHT die RLS (kein Postgres,
 * keine Policy). Beides gehoert in den Live-Test: die RPC direkt im SQL-Editor aufrufen und
 * gegen eine unabhaengige Roh-Query abgleichen, plus Mandanten-Gegenprobe mit fremdem JWT.
 */

/** Eine events-Zeile, reduziert auf die Spalten, die die Aggregation liest. */
type EventRow = {
  project_id: string;
  event_type: string;
  source: "server" | "browser";
  variant: "a" | "b" | null;
};

/** Eine Ergebniszeile — identische Form wie die RETURNS TABLE der RPC. */
type VariantCount = {
  event_type: string;
  count_a: number;
  count_b: number;
  count_none: number;
};

/**
 * Spiegelt:
 *   select e.event_type,
 *          count(*) filter (where e.variant = 'a'),
 *          count(*) filter (where e.variant = 'b'),
 *          count(*) filter (where e.variant is null)
 *   from public.events e
 *   where e.project_id = p_project_id and e.source = 'server'
 *   group by e.event_type
 */
function computeVariantCounts(
  rows: EventRow[],
  projectId: string
): VariantCount[] {
  const byType = new Map<string, VariantCount>();
  for (const r of rows) {
    if (r.project_id !== projectId) continue;
    // WOERTLICH derselbe Filter wie in get_event_counts (0014). Faellt er weg, zaehlen die
    // Browser-Bestaetigungen mit und die Summe divergiert von der projektweiten Zahl.
    if (r.source !== "server") continue;
    const acc = byType.get(r.event_type) ?? {
      event_type: r.event_type,
      count_a: 0,
      count_b: 0,
      count_none: 0,
    };
    // filter-Aggregate: jede Gruppe traegt ALLE drei Spalten, auch wenn eine 0 bleibt.
    // Eine Gruppierung je (event_type, variant) liesse die fehlende Kombination ganz
    // entfallen — "fehlt" ist nicht "0".
    if (r.variant === "a") acc.count_a += 1;
    else if (r.variant === "b") acc.count_b += 1;
    else acc.count_none += 1;
    byType.set(r.event_type, acc);
  }
  return [...byType.values()].sort((x, y) =>
    x.event_type.localeCompare(y.event_type)
  );
}

/** Spiegelt get_event_counts (0014) — die projektweite Vergleichszahl fuer den Riegel. */
function computeEventCounts(
  rows: EventRow[],
  projectId: string
): Map<string, number> {
  const counts = new Map<string, number>();
  for (const r of rows) {
    if (r.project_id !== projectId) continue;
    if (r.source !== "server") continue;
    counts.set(r.event_type, (counts.get(r.event_type) ?? 0) + 1);
  }
  return counts;
}

const PV = "__ps_pageview";

/**
 * Eine Datenlage, die der produktive Pfad wirklich erzeugt: PageViews und Conversions in
 * beiden Varianten, Bestandszeilen OHNE Variante (vor dem Test entstanden), eine
 * Browser-Bestaetigung (die NICHT mitzaehlen darf) und ein FREMDES Projekt.
 */
const ROWS: EventRow[] = [
  { project_id: "p1", event_type: PV, source: "server", variant: "a" },
  { project_id: "p1", event_type: PV, source: "server", variant: "a" },
  { project_id: "p1", event_type: PV, source: "server", variant: "b" },
  { project_id: "p1", event_type: PV, source: "server", variant: null },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "a" },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "b" },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "b" },
  // Die Browser-Bestaetigung zur letzten Conversion: gleicher event_type, source='browser'.
  { project_id: "p1", event_type: "Purchase", source: "browser", variant: "b" },
  // Fremdes Projekt — darf in KEINER Zahl auftauchen.
  { project_id: "p2", event_type: "Purchase", source: "server", variant: "a" },
];

describe("get_variant_counts — Mengenlogik (Scheibe 9c-1)", () => {
  it("zaehlt je event_type nach Variante, fremdes Projekt bleibt draussen", () => {
    expect(computeVariantCounts(ROWS, "p1")).toEqual([
      { event_type: PV, count_a: 2, count_b: 1, count_none: 1 },
      { event_type: "Purchase", count_a: 1, count_b: 2, count_none: 0 },
    ]);
  });

  // DER DIVERGENZ-RIEGEL. Zwei Funktionen stellen dieselbe Frage an dieselbe Tabelle;
  // driftet ihre Filtersemantik, zeigen zwei Sektionen DESSELBEN Dashboards unvereinbare
  // Zahlen. Geprueft wird AGGREGAT gegen GRUPPIERUNG — strukturell ein anderer Weg zum
  // selben Wert, also keine Tautologie.
  // MUTATIONSPROBE M1: den source-Filter aus computeVariantCounts entfernen -> rot.
  it("RIEGEL: Summe ueber alle Varianten trifft die projektweite Zahl je Event-Art", () => {
    const variantRows = computeVariantCounts(ROWS, "p1");
    const projectWide = computeEventCounts(ROWS, "p1");

    expect(variantRows.length).toBe(projectWide.size);
    for (const row of variantRows) {
      const sum = row.count_a + row.count_b + row.count_none;
      expect(sum).toBe(projectWide.get(row.event_type));
    }
  });

  // MUTATIONSPROBE M2: ein "variant is not null" ergaenzen -> rot. Die Zeilen ohne
  // Zuordnung sind das einzige Signal ueber Messverluste; sie duerfen nicht verschwinden.
  it("Zeilen OHNE Zuordnung werden mitgezaehlt, nicht verschluckt", () => {
    const pv = computeVariantCounts(ROWS, "p1").find((r) => r.event_type === PV);
    expect(pv?.count_none).toBe(1);
  });

  // MUTATIONSPROBE M3: filter-Aggregate durch eine Gruppierung je (event_type, variant)
  // ersetzen -> rot. Erscheint eine Event-Art nur in EINER Variante, muss die andere 0
  // sein und nicht fehlen.
  it("SPARSE: Event-Art nur in Variante A -> B ist 0, nicht abwesend", () => {
    const sparse: EventRow[] = [
      { project_id: "p1", event_type: "Lead", source: "server", variant: "a" },
      { project_id: "p1", event_type: "Lead", source: "server", variant: "a" },
    ];
    const rows = computeVariantCounts(sparse, "p1");
    expect(rows).toHaveLength(1);
    expect(rows[0]).toEqual({
      event_type: "Lead",
      count_a: 2,
      count_b: 0,
      count_none: 0,
    });
    // Die Aussage, auf die es ankommt: das Feld EXISTIERT und ist 0.
    expect(Object.keys(rows[0])).toContain("count_b");
    expect(rows[0].count_b).toBe(0);
  });

  it("Browser-Bestaetigungen zaehlen NICHT mit (source-Filter)", () => {
    const purchase = computeVariantCounts(ROWS, "p1").find(
      (r) => r.event_type === "Purchase"
    );
    // 3 Purchase-Zeilen im Projekt, davon eine mit source='browser'.
    expect(
      (purchase?.count_a ?? 0) + (purchase?.count_b ?? 0) + (purchase?.count_none ?? 0)
    ).toBe(3);
  });

  it("Projekt ohne Zeilen -> leeres Ergebnis (kein Fehler, keine erfundene Zeile)", () => {
    expect(computeVariantCounts(ROWS, "p-unbekannt")).toEqual([]);
  });
});

/**
 * WAECHTER AM ECHTEN ARTEFAKT. Die Tests oben pruefen die PORTIERUNG; dieser hier liest die
 * MIGRATION selbst und faengt damit den Fall ab, dass SQL und Portierung auseinanderlaufen
 * — die "gruen aber falsch"-Naht, die eine Portierung von sich aus nicht schliessen kann.
 *
 * Bewusst SCHMAL: geprueft werden nur die Klauseln, an denen eine Regression teuer waere
 * (Tenant-Isolation und Filtersemantik), nicht die Formatierung.
 */
describe("Migration 0019 — die Klauseln, auf die es ankommt", () => {
  const root = path.resolve(__dirname, "../../..");
  const sql = readFileSync(
    path.join(root, "supabase/migrations/0019_variant_counts.sql"),
    "utf8"
  );
  // KOMMENTARE RAUS, bevor geprueft wird: die Kopfkommentare dieser Migration ERKLAEREN
  // ausdruecklich, warum es KEIN "security definer" und KEIN DEFAULT gibt — eine Suche
  // ueber die Rohdatei fiele auf genau diese Erklaerungen herein und waere rot aus dem
  // falschen Grund. Geprueft wird, was Postgres ausfuehrt.
  const executable = sql
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");
  const body = executable.slice(executable.indexOf("create or replace function"));

  it("laeuft als SECURITY INVOKER (kein security definer)", () => {
    // Als DEFINER liefe die Funktion mit Owner-Rechten und lieferte Zahlen ueber ALLE
    // Tenants — die events_select_own-Policy wuerde nicht mehr von innen filtern.
    expect(body).not.toMatch(/security\s+definer/i);
  });

  it("traegt stable und einen fixierten search_path", () => {
    expect(body).toMatch(/\bstable\b/);
    expect(body).toMatch(/set\s+search_path\s*=\s*public/);
  });

  it("traegt DENSELBEN source-Filter wie get_event_counts (0014)", () => {
    const existing = readFileSync(
      path.join(root, "supabase/migrations/0014_event_counts_server_only.sql"),
      "utf8"
    );
    const filter = "e.source = 'server'";
    expect(existing).toContain(filter);
    expect(body).toContain(filter);
  });

  it("legt KEIN Tabellen-DDL und keinen Index an (J5)", () => {
    expect(executable).not.toMatch(/alter\s+table/i);
    expect(executable).not.toMatch(/create\s+index/i);
    expect(executable).not.toMatch(/\bdefault\b/i);
  });

  it("schreibt den Protokoll-Eintrag als letzte Anweisung (Pflicht ab 0018)", () => {
    expect(sql).toContain("insert into public.schema_migrations");
    expect(sql).toContain("'0019'");
    expect(sql.trimEnd().endsWith("on conflict (version) do nothing;")).toBe(true);
  });
});
