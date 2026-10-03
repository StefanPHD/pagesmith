import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// DER WEITERLEITUNGS-ZAEHLER JE PROJEKT IM INGEST (Phase 13.7, Scheibe K1b; Zuschnitt P13.7-60,
// (b) bis (d), der Phase 13.7). Gezaehlt in der Datenbank, EINE Zeile je Projekt, atomar erhoeht
// ueber die RPC ingest_forward_hit (Migration 0032).
//
// WAS HIER GILT, UND WO ES STEHT (Zuschnitt P13.7-60 und die Entscheidungen zum Plan, ARCHITEKT
// 2026-10-03):
// - Der Zaehler entscheidet AUSSCHLIESSLICH ueber den Forward. Der Persist laeuft vorher und
//   bleibt unberuehrt (src/lib/capi/ingest.ts, schedulePersist).
// - D3: 600 weiterleitbare Ereignisse je 60 s je Projekt, festes Fenster. SCHAETZUNG, kein
//   Verkehr gemessen; kalibriert auf Missbrauch, nicht auf Erfolg. Gezaehlt werden EREIGNISSE,
//   nicht Forwards — ein Ereignis geht an bis zu fuenf Ziele.
// - Zuschnitt (d): Scheitert der Zaehler, wird trotzdem weitergeleitet (fail-open). "failed"
//   deckt VIER Formen: ein zurueckgegebenes error (auch status 0 bei Abbruch oder Netzfehler),
//   einen Wurf, ein Haengen ueber das Zeitlimit und einen Rueckgabewert ohne die Form einer
//   ganzen Zahl (`null` ohne error eingeschlossen).
// - D3: Zeitlimit 1 000 ms (SETZUNG, NICHT GEMESSEN).
// - Der Zaehler bekommt allein die Projekt-Kennung aus der Aufloesung und die Fensterlaenge —
//   nie einen Wert der Anfrage, keine IP, keinen User-Agent, keine Seitenadresse.
// - Aus dem Rueckgabewert der Datenbank verlaesst NICHTS diese Datei ausser dem Urteil: message
//   und details tragen Fremdtext und Stapel (docs/plattform-befunde.md, Supabase, Teil (az)).
// - D9: Nachgebaut nach countRelayHit (src/lib/relay/rate-limit.ts), NICHT mit ihm geteilt —
//   relay/* bleibt unberuehrt. Es sind damit ZWEI Implementierungen derselben Bauform; wer
//   eine aendert, prueft die andere von Hand mit — es wird nichts rot.
// Die Waechter stehen in forward-limit.test.ts (Migrationstext und Urteil) und
// ingest.forward-limit.test.ts (Einsatzstelle im Handler).

/** Die Grenze je Fenster und Projekt (D3; SCHAETZUNG). Mehr als diese Zahl ist "begrenzt". */
export const INGEST_FORWARD_LIMIT = 600;

/** Die Fensterlaenge in Sekunden (D3). Geht als Argument an die RPC. */
export const INGEST_FORWARD_WINDOW_SECONDS = 60;

/** Das Zeitlimit des Zaehler-Aufrufs (D3; SETZUNG, NICHT GEMESSEN). */
export const INGEST_FORWARD_TIMEOUT_MS = 1_000;

/** Der Name der RPC (Migration 0032). */
export const INGEST_FORWARD_RPC = "ingest_forward_hit";

/**
 * Das Urteil. "allowed" und "limited" sind Urteile ueber das Projekt; "failed" ist ein Ausfall
 * des Zaehlers. `first` ist genau dann true, wenn dieser Aufruf den Zaehler auf GRENZE + 1
 * gehoben hat — der erste Ueberlauf im Fenster (D4). Die RPC liefert jeden Wert je Fenster
 * hoechstens einmal, weil die Erhoehungen atomar aufeinander folgen (Migration 0032, Kopf).
 */
export type ForwardQuotaVerdict =
  | { kind: "allowed" }
  | { kind: "limited"; first: boolean }
  | { kind: "failed" };

/**
 * Zaehlt EIN weiterleitbares Ereignis fuer das Projekt und urteilt. Wirft nie.
 * Genau ein Aufruf der RPC, kein zweiter: Der Client wiederholt einen POST nicht
 * (docs/plattform-befunde.md, Supabase, Teil (az); am installierten postgrest-js 2.117.2 am
 * 2026-10-03 erneut gelesen); eine Wiederholung hier zaehlte dasselbe Ereignis doppelt.
 */
export async function countForwardHit(projectId: string): Promise<ForwardQuotaVerdict> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  // Das Zeitlimit wirkt ZWEIFACH: Es bricht die Anfrage ab (abortSignal) UND beendet das
  // Warten selbst — auch wenn der Abbruch die Anfrage nicht beendet.
  const timeout = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve("timeout");
    }, INGEST_FORWARD_TIMEOUT_MS);
  });
  try {
    const call = createAdminClient()
      .rpc(INGEST_FORWARD_RPC, {
        p_project_id: projectId,
        p_window_seconds: INGEST_FORWARD_WINDOW_SECONDS,
      })
      .abortSignal(controller.signal);
    const result = await Promise.race([call, timeout]);
    if (result === "timeout") return { kind: "failed" };
    const { data, error } = result;
    if (error) return { kind: "failed" };
    // Ein Rueckgabewert ohne die Form einer ganzen Zahl ist ein Ausfall, kein Urteil.
    if (typeof data !== "number" || !Number.isInteger(data)) return { kind: "failed" };
    if (data > INGEST_FORWARD_LIMIT)
      return { kind: "limited", first: data === INGEST_FORWARD_LIMIT + 1 };
    return { kind: "allowed" };
  } catch {
    return { kind: "failed" };
  } finally {
    clearTimeout(timer);
  }
}
