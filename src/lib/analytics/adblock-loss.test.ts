import { describe, expect, it } from "vitest";
import { computeAdblockLoss, type EventRow } from "./adblock-loss";

/**
 * Diskriminierende Tests der Verlustraten-Mengenlogik (Phase 8 Scheibe B).
 *
 * Getestet wird die TS-PORTIERUNG (adblock-loss.ts), die das Migrations-SQL 0015 spiegelt.
 * Was diese Tests NICHT beweisen (ehrlich, nicht als Gruen ausgeben):
 *  - dass die DEPLOYTE Funktion dasselbe rechnet -> Live-Test §7.1(a), direkter RPC-Aufruf;
 *  - die RLS/Tenant-Isolation -> hier laeuft kein Postgres und keine Policy; der Beweis ist
 *    die Live-Gegenprobe mit fremdem JWT (0 rows), wie schon bei Scheibe 3.
 */

const P = "proj-1";

let seq = 0;
/** Monoton wachsende ISO-Zeitstempel, damit die Reihenfolge explizit steuerbar bleibt. */
function t(minute: number): string {
  return new Date(Date.UTC(2026, 6, 23, 10, minute)).toISOString();
}
function row(over: Partial<EventRow>): EventRow {
  seq += 1;
  return {
    project_id: P,
    event_type: "Lead",
    event_id: `evt-${seq}`,
    source: "server",
    created_at: t(0),
    ...over,
  };
}

/** Ein Conversion-PAAR: server-Zeile + zugehoerige Bestaetigung (geteilte event_id). */
function confirmedPair(
  eventId: string,
  serverAt: string,
  browserAt: string,
  eventType = "Lead"
): EventRow[] {
  return [
    row({
      event_id: eventId,
      source: "server",
      created_at: serverAt,
      event_type: eventType,
    }),
    row({
      event_id: eventId,
      source: "browser",
      created_at: browserAt,
      event_type: eventType,
    }),
  ];
}

describe("Verlustrate: Conversion-Filter (Test 1)", () => {
  // ROT bei: fehlendem oder falsch geschriebenem Praefix-Filter (in SQL etwa unescapt
  // "not like '__ps_%'" — '_' ist LIKE-Wildcard). Dann wandern PageViews in den Nenner
  // und dominieren ihn (~95%+ Falsch-Verlust).
  it("PageView-Zeilen beeinflussen die Rate NICHT", () => {
    const rows: EventRow[] = [
      ...confirmedPair("c1", t(5), t(5)),
      // Eine unbestaetigte echte Conversion -> 1 von 2 verloren.
      row({ event_id: "c2", source: "server", created_at: t(6) }),
      // Rauschen: viele PageViews, teils sogar mit "Bestaetigung" (moeglich, wenn ein
      // Marketer ein Custom-Event __ps_pageview nennt).
      ...Array.from({ length: 20 }, (_, i) =>
        row({
          event_id: `pv-${i}`,
          event_type: "__ps_pageview",
          source: "server",
          created_at: t(7),
        })
      ),
      row({
        event_id: "pv-0",
        event_type: "__ps_pageview",
        source: "browser",
        created_at: t(7),
      }),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.total_server_conversions).toBe(2);
    expect(r.confirmed_conversions).toBe(1);
  });
});

describe("Verlustrate: verwaister Confirm ist UEBERALL inert (Test 2, geschaerft)", () => {
  // Der Verwaiste ist BEWUSST die FRUEHESTE browser-Zeile des Projekts, und das Projekt hat
  // sonst KEINE Bestaetigung. Nur so faerbt der Test bei der unverankerten CTE-Variante rot:
  // ohne exists-Anker setzt der Verwaiste den Stichtag, first_confirm_at wird gesetzt, die
  // Bestandsdaten fallen ins Fenster und das Projekt zeigt statt des Neutral-Status eine
  // falsche Rate.
  it("frueheste browser-Zeile OHNE server-Gegenstueck setzt KEINEN Stichtag", () => {
    const rows: EventRow[] = [
      // Der geschmiedete/verwaiste Confirm, frueher als alles andere.
      row({ event_id: "orphan", source: "browser", created_at: t(1) }),
      // Bestandsdaten ohne jede Bestaetigung.
      row({ event_id: "s1", source: "server", created_at: t(2) }),
      row({ event_id: "s2", source: "server", created_at: t(3) }),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.first_confirm_at).toBeNull();
    expect(r.total_server_conversions).toBe(0);
    expect(r.confirmed_conversions).toBe(0);
  });

  it("verwaister Confirm neben echten Daten veraendert weder Zaehler noch Nenner", () => {
    const withoutOrphan: EventRow[] = [
      ...confirmedPair("c1", t(5), t(5)),
      row({ event_id: "c2", source: "server", created_at: t(6) }),
    ];
    const withOrphan: EventRow[] = [
      ...withoutOrphan,
      row({ event_id: "ghost", source: "browser", created_at: t(9) }),
    ];

    expect(computeAdblockLoss(withOrphan, P)).toEqual(
      computeAdblockLoss(withoutOrphan, P)
    );
  });
});

describe("Verlustrate: Reihenfolge-Unabhaengigkeit (Test 3)", () => {
  // ROT bei: jeder "server zuerst"-Annahme oder einem Zeitvergleich im Zaehler-Join.
  // Der browser-vor-server-Fall ist der LIVE GEMESSENE Realfall (25-850 ms Versatz).
  it("browser-Zeile VOR der server-Zeile zaehlt als bestaetigt", () => {
    const rows: EventRow[] = [
      // Stichtag-Anker, damit das Fenster offen ist.
      ...confirmedPair("anchor", t(1), t(1)),
      // Der Realfall: Bestaetigung um 10:05, Server-Zeile erst 10:06.
      ...confirmedPair("late-server", t(6), t(5)),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.total_server_conversions).toBe(2);
    expect(r.confirmed_conversions).toBe(2);
  });

  it("auch die Gegenrichtung (server vor browser) zaehlt als bestaetigt", () => {
    const rows: EventRow[] = [
      ...confirmedPair("anchor", t(1), t(1)),
      ...confirmedPair("late-browser", t(5), t(6)),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.confirmed_conversions).toBe(2);
  });
});

describe("Verlustrate: Stichtag schneidet Bestandsdaten (Test 4)", () => {
  // ROT bei: fehlendem Stichtag oder fehlendem Praefix-Filter IN der Stichtags-CTE ->
  // der Bestandsdaten-Skew flieszt ein und die Rate startet kuenstlich hoch.
  it("server-Zeilen VOR der ersten Bestaetigung fallen aus Zaehler UND Nenner", () => {
    const rows: EventRow[] = [
      // Alt-Bestand, lange vor jeder Bestaetigung: darf NICHT zaehlen.
      row({ event_id: "old-1", source: "server", created_at: t(1) }),
      row({ event_id: "old-2", source: "server", created_at: t(2) }),
      // Erste verankerte Bestaetigung um 10:05.
      ...confirmedPair("first", t(5), t(5)),
      // Danach eine unbestaetigte Conversion -> 1 von 2 verloren.
      row({ event_id: "new-1", source: "server", created_at: t(6) }),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.first_confirm_at).toBe(t(5));
    expect(r.total_server_conversions).toBe(2);
    expect(r.confirmed_conversions).toBe(1);
  });

  it("eine __ps_-Bestaetigung verfrueht den Stichtag NICHT", () => {
    const rows: EventRow[] = [
      // Ein Marketer nennt ein Custom-Event "__ps_pageview" — TrackConfig.event ist ein
      // freier String. Dessen Bestaetigung darf das Fenster nicht frueher oeffnen.
      ...confirmedPair("ps-1", t(1), t(1), "__ps_pageview"),
      row({ event_id: "old", source: "server", created_at: t(2) }),
      ...confirmedPair("real", t(5), t(5)),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.first_confirm_at).toBe(t(5));
    expect(r.total_server_conversions).toBe(1);
    expect(r.confirmed_conversions).toBe(1);
  });
});

describe("Verlustrate: Neutral-Status (Test 5)", () => {
  // ROT bei: 0/0 wird als 0% oder 100% gerendert statt als eigener Zustand.
  it("Projekt ohne jede Bestaetigung -> (0, 0, null)", () => {
    const rows: EventRow[] = [
      row({ event_id: "s1", source: "server", created_at: t(1) }),
      row({ event_id: "s2", source: "server", created_at: t(2) }),
    ];

    expect(computeAdblockLoss(rows, P)).toEqual({
      total_server_conversions: 0,
      confirmed_conversions: 0,
      first_confirm_at: null,
    });
  });

  it("leerer Datensatz -> Neutral-Status, kein Absturz", () => {
    expect(computeAdblockLoss([], P).first_confirm_at).toBeNull();
  });
});

describe("Verlustrate: Grenzfall total=0 bei gesetztem Stichtag (Test 8)", () => {
  // Real erreichbar (nicht nur defensiv): der Confirm wird gepuffert, solange fbevents noch
  // laedt; ist Metas Forward schneller als der Pixel-Load, schreibt die server-Zeile VOR
  // ihrer eigenen Bestaetigung. Bei genau EINER Conversion faellt sie damit knapp aus dem
  // Fenster -> Stichtag gesetzt, total 0. Das UI darf hier nicht dividieren.
  it("einzige Bestaetigung mit server-Zeile VOR dem Stichtag -> total 0, Stichtag gesetzt", () => {
    const rows: EventRow[] = confirmedPair("only", t(5), t(6));

    const r = computeAdblockLoss(rows, P);
    expect(r.first_confirm_at).toBe(t(6));
    expect(r.total_server_conversions).toBe(0);
    expect(r.confirmed_conversions).toBe(0);
  });
});

describe("Verlustrate: Projekt-Isolation in der Mengenlogik", () => {
  // KEIN RLS-Beweis (s. Datei-Kopf) — nur, dass die Join-Achse project_id UND event_id
  // umfasst. ROT bei: Join allein ueber event_id -> die Bestaetigung eines FREMDEN Projekts
  // wuerde eine eigene Conversion faelschlich bestaetigen.
  it("Bestaetigung eines anderen Projekts zaehlt NICHT", () => {
    const rows: EventRow[] = [
      ...confirmedPair("anchor", t(1), t(1)),
      row({ event_id: "shared", source: "server", created_at: t(5) }),
      row({
        project_id: "proj-fremd",
        event_id: "shared",
        source: "browser",
        created_at: t(5),
      }),
    ];

    const r = computeAdblockLoss(rows, P);
    expect(r.total_server_conversions).toBe(2);
    expect(r.confirmed_conversions).toBe(1);
  });
});
