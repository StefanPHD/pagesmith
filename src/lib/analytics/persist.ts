import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { errorName } from "@/lib/errors";
import type { ObservationSource } from "@/lib/analytics/events";

/**
 * Analytics-Persistenz (Phase 8 Scheibe 1).
 *
 * Schreibt EINE Zeile pro server-beobachtetem Event in public.events. Laeuft
 * ausschliesslich als Hintergrund-Task (after(), s. lib/capi/ingest.ts) NACH der
 * 204-Response — die Beacon-Antwortzeit darf sich durch Analytics nicht verschlechtern.
 *
 * SERVICE_ROLE: events traegt RLS OHNE Policy (Migration 0011) -> der session-lose
 * Ingest-Pfad ist der einzige Schreiber. Das ist TRANSIENT; die owner-SELECT-Policy
 * folgt in der Dashboard-Read-Scheibe.
 *
 * WIRFT NIE. Ein Analytics-Fehler darf weder die Response (die ist zu diesem Zeitpunkt
 * ohnehin raus) noch den CAPI-Forward beeintraechtigen — Fehler werden sanitized
 * geloggt und geschluckt.
 */

// event_type ist UNGEFILTERTER Client-Input aus dem Beacon-Blob. Fuer den Meta-Forward
// unkritisch (Meta validiert selbst), als DB-Wert aber beliebiger Client-String ->
// harte Laengenkappe gegen DB-Bloat/Missbrauch. BEWUSST KEINE Whitelist erlaubter Namen:
// das braeche Custom-Events (freier event_name ist bei der Graph-CAPI legitim).
const EVENT_TYPE_MAX_LENGTH = 64;

// Strikter Timeout auf den Insert (A-Regel "defensive Timeouts" + Tier-0-Circuit-
// Breaker-Gedanke): ein haengender Insert darf die Serverless-Function nicht bis zum
// Plattform-Limit offenhalten und Execution-Time/Kosten verbrennen.
const INSERT_TIMEOUT_MS = 3_000;

export type PersistEventParams = {
  projectId: string;
  eventType: string;
  eventId: string;
  /**
   * BEOBACHTUNGS-ORT, PFLICHT — bewusst OHNE Default (Scheibe A). events.source ist
   * NOT NULL ohne column-DEFAULT, damit jeder Schreibpfad die Herkunft BEWUSST setzt; ein
   * TS-Default waere genau der stille Fallback, den diese DB-Entscheidung ausschliesst.
   */
  source: ObservationSource;
};

export async function persistEvent({
  projectId,
  eventType,
  eventId,
  source,
}: PersistEventParams): Promise<void> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), INSERT_TIMEOUT_MS);

  try {
    const admin = createAdminClient();

    // source = Beobachtungs-ORT ('server' | 'browser'), NICHT Werbe-Netzwerk-ZIEL. Kommt
    // vom Aufrufer, der ihn setzen MUSS (s. PersistEventParams) — der Wert stammt NIE aus
    // dem Client-Blob, sondern aus der Server-Interpretation des obs-Markers.
    // id + created_at kommen per DB-Default. KEIN IP/UA (lean/PII-frei).
    const { error } = await admin
      .from("events")
      .insert({
        project_id: projectId,
        event_type: eventType.slice(0, EVENT_TYPE_MAX_LENGTH),
        event_id: eventId,
        source,
      })
      .abortSignal(controller.signal);

    if (error) {
      // NUR der PostgREST-Code — nie die Payload/Message (koennte Client-Input tragen).
      console.error(`[analytics] events insert failed: ${error.code ?? "unknown"}`);
    }
  } catch (err) {
    // Abort (Timeout) landet ebenfalls hier. Nur der Fehlertyp, nie Details.
    console.error(`[analytics] events insert error: ${errorName(err)}`);
  } finally {
    clearTimeout(timeout);
  }
}
