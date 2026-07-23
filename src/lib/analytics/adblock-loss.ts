/**
 * TS-PORTIERUNG der Verlustraten-Aggregation (Phase 8 Scheibe B).
 *
 * QUELLE IST DAS SQL: supabase/migrations/0015_adblock_loss.sql. Diese Datei SPIEGELT die
 * dort deployte Funktion get_adblock_loss — nicht umgekehrt. Wer die Mengenlogik aendert,
 * aendert ZUERST die Migration und zieht diese Portierung nach.
 *
 * ZWECK: die Mengenlogik (Praefix-Filter, verankerter Stichtag, mengenbasierter
 * Zaehler-Join) diskriminierend testbar machen. Die Vitest-Suite hat keine Postgres-
 * Instanz; ohne Portierung waere die Kernlogik dieser Scheibe voellig ungetestet.
 *
 * GRENZE, ehrlich: ein gruener Test hier beweist NICHT, dass die DEPLOYTE Funktion dasselbe
 * tut ("gruen aber falsch"-Naht) — und er beweist erst recht NICHT die RLS (hier laeuft kein
 * Postgres, keine Policy). Beides gehoert in den Live-Test:
 *  - §7.1(a) ruft `select * from public.get_adblock_loss('<UUID>')` direkt auf und gleicht
 *    gegen die Kachel ab (beweist die deployte Funktion),
 *  - §7.1(b) rechnet die Rate per unabhaengiger Roh-Query nach (beweist die Arithmetik),
 *  - die Tenant-Isolation wird mit fremdem JWT gegengeprobt (0 rows).
 *
 * Diese Funktion ist REINE Logik ohne DB/Netz — sie wird von der App NICHT aufgerufen (die
 * ruft die RPC), nur vom Test.
 */

/** Eine events-Zeile, reduziert auf die Spalten, die die Aggregation liest. */
export type EventRow = {
  project_id: string;
  event_type: string;
  event_id: string;
  source: "server" | "browser";
  /** ISO-Zeitstempel (created_at). Vergleich lexikografisch == chronologisch. */
  created_at: string;
};

/** Rohzahlen — identische Form wie die RETURNS TABLE der RPC. */
export type AdblockLoss = {
  total_server_conversions: number;
  confirmed_conversions: number;
  /** null == noch keine VERANKERTE Bestaetigung -> Neutral-Status im UI. */
  first_confirm_at: string | null;
};

/**
 * Spiegelt `left(event_type, 5) <> '__ps_'`.
 *
 * BEWUSST kein `startsWith`-Aufruf mit LIKE-Semantik im Kopf: in SQL waere
 * `not like '__ps_%'` falsch, weil '_' dort eine WILDCARD ist und das Muster auch fremde
 * Namen traefe. left(...) ist der zeichengenaue Vergleich — hier die direkte Entsprechung.
 */
function isConversionType(eventType: string): boolean {
  return eventType.slice(0, 5) !== "__ps_";
}

/** Spiegelt `exists (select 1 from events where project_id=… and event_id=… and source=…)`. */
function hasCounterpart(
  rows: EventRow[],
  projectId: string,
  eventId: string,
  source: "server" | "browser"
): boolean {
  return rows.some(
    (r) =>
      r.project_id === projectId && r.event_id === eventId && r.source === source
  );
}

export function computeAdblockLoss(
  rows: EventRow[],
  projectId: string
): AdblockLoss {
  // --- STICHTAG: erste VERANKERTE Bestaetigung (browser-Zeile MIT server-Gegenstueck) ---
  // Der Anker haelt VERWAISTE Confirms aus dem Stichtag heraus: /api/e ist anonym, ein
  // einzelner geschmiedeter Beacon duerfte kein Neutral-Status-Projekt in den Zahlen-Modus
  // kippen und keine Bestandsdaten ins Fenster lassen.
  let firstConfirmAt: string | null = null;
  for (const b of rows) {
    if (b.project_id !== projectId) continue;
    if (b.source !== "browser") continue;
    if (!isConversionType(b.event_type)) continue;
    if (!hasCounterpart(rows, projectId, b.event_id, "server")) continue;
    if (firstConfirmAt === null || b.created_at < firstConfirmAt) {
      firstConfirmAt = b.created_at;
    }
  }

  // Kein Stichtag -> in SQL ist `created_at >= NULL` NULL, es passiert keine Zeile den
  // Filter. Ergebnis (0, 0, NULL) — genau eine Zeile, kein "0 rows".
  if (firstConfirmAt === null) {
    return {
      total_server_conversions: 0,
      confirmed_conversions: 0,
      first_confirm_at: null,
    };
  }

  // --- NENNER auf den SERVER-Zeilen im Stichtagsfenster, ZAEHLER per Mengen-Join ---
  let total = 0;
  let confirmed = 0;
  for (const s of rows) {
    if (s.project_id !== projectId) continue;
    if (s.source !== "server") continue;
    if (!isConversionType(s.event_type)) continue;
    if (s.created_at < firstConfirmAt) continue;
    total += 1;
    // KEIN Zeitvergleich zwischen den beiden Zeilen: die browser-Zeile darf frueher ODER
    // spaeter liegen (live gemessen: 25-850 ms browser-first).
    if (hasCounterpart(rows, projectId, s.event_id, "browser")) confirmed += 1;
  }

  return {
    total_server_conversions: total,
    confirmed_conversions: confirmed,
    first_confirm_at: firstConfirmAt,
  };
}
