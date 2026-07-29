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
  /**
   * ISO-Zeitstempel (events.created_at). PFLICHTFELD, nicht optional (Scheibe 9c-2):
   * in Produktion ist die Spalte NOT NULL, eine Zeile ohne Zeitstempel existiert
   * nicht. Ein optionales Feld erzwaenge eine Behandlung fuer einen Fall, den der
   * produktive Pfad nie erzeugt — und jede Wahl dort waere willkuerlich.
   * Vergleich lexikografisch == chronologisch (wie in der Verlustraten-Portierung).
   */
  created_at: string;
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
  projectId: string,
  /**
   * Lauf-Beginn (Scheibe 9c-2). DEFAULT null, damit die 9c-1-Tests unveraendert
   * gueltig bleiben — und weil null zugleich der echte Degradations-Fall ist (K3).
   *
   * EHRLICHE GRENZE: hier wird der Wert GEREICHT, in der deployten Funktion liest
   * ihn der Koerper SELBST aus der Projektzeile. Diese Portierung kann das nicht
   * beweisen; dafuer stehen die Migrations-Waechter unten (Einparametrigkeit +
   * Spaltenreferenz) und der Live-Test.
   */
  startedAt: string | null = null
): VariantCount[] {
  const byType = new Map<string, VariantCount>();
  for (const r of rows) {
    if (r.project_id !== projectId) continue;
    // WOERTLICH derselbe Filter wie in get_event_counts (0014). Faellt er weg, zaehlen die
    // Browser-Bestaetigungen mit und die Summe divergiert von der projektweiten Zahl.
    if (r.source !== "server") continue;
    // ZEITFILTER: "startedAt ist null" ZUERST — sonst verschluckte der Vergleich gegen
    // NULL jede Zeile, und ein Projekt ohne protokollierten Start zeigte nichts mehr
    // (K3). RAND EINGESCHLOSSEN (>=), spiegelt die Migration.
    if (startedAt !== null && r.created_at < startedAt) continue;
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

/**
 * DER AUSSCHNITT, den ALLE koerperbezogenen Waechter teilen — und die Lehre aus einer
 * hohlen Probe: der erste Anlauf schnitt vom "create or replace function" bis DATEIENDE.
 * Damit lag die Protokollzeile im Ausschnitt, und ein Waechter auf den Bezeichner
 * "ab_test_started_at" traf den DATEINAMEN in dieser Zeile statt die Spaltenreferenz im
 * Koerper. Die zugehoerige Mutation blieb gruen, ohne dass jemand es gesehen haette.
 *
 * ZWEI SCHNITTE, beide noetig:
 *  - KOMMENTARE RAUS: die Kopfkommentare ERKLAEREN, warum es kein "security definer" und
 *    keinen CHECK gibt — eine Suche ueber die Rohdatei fiele auf die Erklaerung herein.
 *  - ENDE AM SCHLIESSENDEN $$; — alles danach (Protokoll-Insert) ist NICHT der Koerper.
 *
 * Der Ausschnitt hat eine EIGENE Positivkontrolle (s. unten). Ein Fixture, gegen das
 * Assertions laufen, ohne selbst geprueft zu sein, ist genau die Falle von oben.
 */
function readMigration(root: string, file: string) {
  const sql = readFileSync(path.join(root, "supabase/migrations", file), "utf8");
  const executable = sql
    .split(/\r?\n/)
    .filter((line) => !line.trimStart().startsWith("--"))
    .join("\n");
  const start = executable.indexOf("create or replace function");
  const end = executable.indexOf("$$;", start);
  return { sql, executable, body: executable.slice(start, end + 3) };
}

const PV = "__ps_pageview";

/**
 * DREI ZEITMARKEN — die Fixture-Auflage aus der Stufe 1, ausdruecklich:
 * Es MUESSEN Zeilen VOR und NACH dem Lauf-Beginn existieren, sonst liefert ein
 * ENTFERNTER Zeitfilter dieselbe Menge, die Mutation bliebe gruen und der Test
 * pruefte nichts. T_RAND liegt EXAKT auf dem Start und nagelt den inklusiven Rand fest.
 */
const T_VOR = "2026-07-29T09:00:00.000Z";
const T_START = "2026-07-29T10:00:00.000Z";
const T_RAND = T_START;
const T_NACH = "2026-07-29T11:00:00.000Z";

/**
 * Eine Datenlage, die der produktive Pfad wirklich erzeugt: PageViews und Conversions in
 * beiden Varianten, Bestandszeilen OHNE Variante (vor dem Test entstanden), eine
 * Browser-Bestaetigung (die NICHT mitzaehlen darf) und ein FREMDES Projekt.
 */
const ROWS: EventRow[] = [
  { project_id: "p1", event_type: PV, source: "server", variant: "a", created_at: T_NACH },
  { project_id: "p1", event_type: PV, source: "server", variant: "a", created_at: T_VOR },
  { project_id: "p1", event_type: PV, source: "server", variant: "b", created_at: T_RAND },
  { project_id: "p1", event_type: PV, source: "server", variant: null, created_at: T_VOR },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "a", created_at: T_NACH },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "b", created_at: T_NACH },
  { project_id: "p1", event_type: "Purchase", source: "server", variant: "b", created_at: T_VOR },
  // Die Browser-Bestaetigung zur letzten Conversion: gleicher event_type, source='browser'.
  { project_id: "p1", event_type: "Purchase", source: "browser", variant: "b", created_at: T_NACH },
  // Fremdes Projekt — darf in KEINER Zahl auftauchen.
  { project_id: "p2", event_type: "Purchase", source: "server", variant: "a", created_at: T_NACH },
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
      { project_id: "p1", event_type: "Lead", source: "server", variant: "a", created_at: T_NACH },
      { project_id: "p1", event_type: "Lead", source: "server", variant: "a", created_at: T_NACH },
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

  // === Scheibe 9c-2: der Zeitfilter ===

  // T1 — DER TEST, DER AM LEICHTESTEN HOHL WIRD. Deshalb ZWEI Assertionen:
  // (1) die erwarteten Zahlen im Fenster und (2) der VERGLEICH gegen dieselbe Rechnung
  // OHNE Filter. Die zweite ist die tragende: laege die ganze Fixture im Fenster,
  // lieferte ein entfernter Filter dieselbe Menge und (1) allein bliebe gruen.
  // MUTATIONSPROBE M1: Zeitfilter aus computeVariantCounts entfernen -> rot.
  it("T1: Zeitfilter schneidet Zeilen VOR dem Lauf-Beginn weg", () => {
    const imFenster = computeVariantCounts(ROWS, "p1", T_START);
    const ohneFilter = computeVariantCounts(ROWS, "p1");

    expect(imFenster).toEqual([
      // PV: T_NACH(a) + T_RAND(b) zaehlen, T_VOR(a) und T_VOR(null) fallen raus.
      { event_type: PV, count_a: 1, count_b: 1, count_none: 0 },
      // Purchase: T_NACH(a) + T_NACH(b) zaehlen, T_VOR(b) faellt raus.
      { event_type: "Purchase", count_a: 1, count_b: 1, count_none: 0 },
    ]);

    // DIE TRAGENDE ASSERTION: ohne Filter sind es nachweislich MEHR Zeilen.
    const summe = (rows: VariantCount[]) =>
      rows.reduce((n, r) => n + r.count_a + r.count_b + r.count_none, 0);
    expect(summe(imFenster)).toBeLessThan(summe(ohneFilter));
    expect(summe(ohneFilter)).toBe(7);
    expect(summe(imFenster)).toBe(4);
  });

  // Der RAND, eigens festgenagelt (P1): eine Zeile EXAKT auf dem Lauf-Beginn gehoert
  // zum Lauf. Faerbt rot, sobald jemand ">=" zu ">" macht.
  it("T1b: Rand EINGESCHLOSSEN — eine Zeile exakt auf dem Start zaehlt mit", () => {
    const rand: EventRow[] = [
      { project_id: "p1", event_type: "Lead", source: "server", variant: "b", created_at: T_RAND },
    ];
    expect(computeVariantCounts(rand, "p1", T_START)).toEqual([
      { event_type: "Lead", count_a: 0, count_b: 1, count_none: 0 },
    ]);
  });

  // T2 — K3: kein Lauf-Beginn -> KEIN Filter, alle Zeilen mit Variante. Das ist der
  // Legacy-Fall (Test lief vor 9c-2) UND der Zustand zwischen Migration und Deploy.
  // MUTATIONSPROBE M3: den "ist null"-Zweig entfernen -> rot.
  it("T2: startedAt = null -> ALLE Zeilen (K3), identisch zum 9c-1-Verhalten", () => {
    expect(computeVariantCounts(ROWS, "p1", null)).toEqual(
      computeVariantCounts(ROWS, "p1")
    );
    expect(computeVariantCounts(ROWS, "p1", null)).toEqual([
      { event_type: PV, count_a: 2, count_b: 1, count_none: 1 },
      { event_type: "Purchase", count_a: 1, count_b: 2, count_none: 0 },
    ]);
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
  const { sql, executable, body } = readMigration(root, "0019_variant_counts.sql");

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

/**
 * WAECHTER AM ARTEFAKT VON 9c-2 — Migration 0020 ERSETZT die Funktion aus 0019. Ab hier
 * ist SIE die deployte Fassung; die 0019-Waechter oben dokumentieren nur ihre Datei.
 *
 * ZWEI DIESER WAECHTER SCHLIESSEN EINE NAHT, DIE DIE PORTIERUNG NICHT ERREICHT: dort wird
 * startedAt als PARAMETER gereicht. Damit kann sie nie beweisen, dass die deployte Funktion
 * den Wert SELBST aus der Projektzeile liest — genau das ist aber die Entscheidung (K10).
 * Deshalb: Einparametrigkeit (ein zweiter Parameter waere der stille Uebergang zu "der
 * Client bestimmt das Fenster") und die Referenz auf die neue Spalte (ohne sie koennte der
 * Zeitfilter aus dem SQL verschwinden, ohne dass ein Test rot wird).
 */
describe("Migration 0020 — die Klauseln, auf die es ankommt", () => {
  const root = path.resolve(__dirname, "../../..");
  const { sql, executable, body } = readMigration(root, "0020_ab_test_started_at.sql");

  it("laeuft als SECURITY INVOKER (kein security definer)", () => {
    expect(body).not.toMatch(/security\s+definer/i);
  });

  it("traegt stable und einen fixierten search_path", () => {
    expect(body).toMatch(/\bstable\b/);
    expect(body).toMatch(/set\s+search_path\s*=\s*public/);
  });

  it("K10: die Signatur traegt GENAU EINEN Parameter", () => {
    const sig = body.slice(
      body.indexOf("get_variant_counts("),
      body.indexOf(")", body.indexOf("get_variant_counts(")) + 1
    );
    expect(sig).toContain("p_project_id uuid");
    // Ein zweiter Parameter waere der Uebergang zu "der Aufrufer reicht das Fenster".
    expect(sig.split(",")).toHaveLength(1);
  });

  it("liest den Lauf-Beginn SELBST: der Koerper referenziert ab_test_started_at", () => {
    expect(body).toContain("ab_test_started_at");
    expect(body).toContain("public.projects");
  });

  it("Rueckgabetyp UNVERAENDERT gegenueber 0019 -> replace statt drop+create", () => {
    for (const col of ["event_type text", "count_a", "count_b", "count_none"]) {
      expect(body).toContain(col);
    }
    expect(executable).not.toMatch(/drop\s+function/i);
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

  it("K1: genau EINE additive Spalte, kein CHECK, kein Index, kein DEFAULT, kein Backfill", () => {
    const alters = executable.match(/alter\s+table/gi) ?? [];
    expect(alters).toHaveLength(1);
    expect(executable).toContain("add column if not exists ab_test_started_at timestamptz");
    expect(executable).not.toMatch(/\bcheck\s*\(/i);
    expect(executable).not.toMatch(/create\s+index/i);
    expect(executable).not.toMatch(/\bdefault\b/i);
    expect(executable).not.toMatch(/^\s*update\s+public\./im);
  });

  it("schreibt den Protokoll-Eintrag als letzte Anweisung (Pflicht ab 0018)", () => {
    expect(sql).toContain("insert into public.schema_migrations");
    expect(sql).toContain("'0020'");
    expect(sql.trimEnd().endsWith("on conflict (version) do nothing;")).toBe(true);
  });

  // (b) POSITIVKONTROLLE DES AUSSCHNITTS SELBST. Ohne sie laufen alle Assertions oben
  // gegen ein ungeprueftes Fixture — und genau daran ist die erste Fassung gescheitert.
  it("AUSSCHNITT: der Koerper endet am $$; und enthaelt die Protokollzeile NICHT", () => {
    // Er enthaelt, was er soll …
    expect(body).toContain("create or replace function");
    expect(body).toContain("group by e.event_type");
    expect(body.trimEnd().endsWith("$$;")).toBe(true);
    // … und NICHT, was nach dem Koerper kommt. Die Protokollzeile traegt den DATEINAMEN
    // und damit den Bezeichner "ab_test_started_at" — laege sie im Ausschnitt, waere der
    // Spaltenreferenz-Waechter unten hohl.
    expect(body).not.toContain("insert into public.schema_migrations");
    expect(body).not.toContain("0020_ab_test_started_at.sql");
    // Gegenprobe auf der anderen Seite: die Datei ALS GANZES traegt beides sehr wohl.
    expect(executable).toContain("insert into public.schema_migrations");
  });

  // (K1) NULL-TOLERANZ DES ZEITFILTERS — der Waechter, den kein Unit-Test ersetzen kann.
  //
  // WARUM ER EXISTIERT: In SQL ist "created_at >= NULL" NULL, die Zeile faellt HERAUS.
  // Ohne den is-null-Zweig zeigte JEDES Projekt ohne Lauf-Beginn eine leere Auswertung —
  // der Legacy-Fall (Test lief vor 9c-2) und das Fenster zwischen Migration und Deploy.
  // Eine TS-Portierung kann das nicht abbilden: JS kennt keine dreiwertige Logik, dort ist
  // "x < null" schlicht false und die Zeile bleibt drin. Der Fehlermodus ist im Unit-Test
  // NICHT erreichbar, deshalb steht der Nachweis hier am Artefakt.
  //
  // BEZEICHNER-EBENE, nicht volle Klausel: geprueft wird, dass der Wert der run-CTE gegen
  // NULL getestet wird. Zeilenumbrueche und Einrueckung sind egal (\s+), eine
  // Formatierungsaenderung macht ihn nicht rot.
  //
  // WAS ER NICHT BEWEIST: dass die DEPLOYTE Funktion sich so verhaelt. Das zeigen erst
  // Live-Schritt 1 und 2 (Alt-Lauf ohne Zeitstempel sieht weiterhin alle Zeilen).
  it("K3: der Zeitfilter ist NULL-TOLERANT formuliert (is-null-Zweig vorhanden)", () => {
    expect(body).toMatch(/\(\s*select\s+at\s+from\s+run\s*\)\s+is\s+null/i);
    // Gegenstueck: der Vergleich selbst ist da. Ohne ihn gaebe es keinen Filter, und der
    // is-null-Zweig allein waere bedeutungslos.
    expect(body).toMatch(/e\.created_at\s*>=/);
  });

  it("REIHENFOLGE: die Spalte steht VOR der Funktion (sonst braeche die Migration ab)", () => {
    expect(executable.indexOf("add column")).toBeLessThan(
      executable.indexOf("create or replace function")
    );
  });
});
