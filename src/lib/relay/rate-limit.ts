import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// DIE RATENBEGRENZUNG DES FORMULAR-RELAYS (Phase 13.6, Scheibe 13.6-5). Je PROJEKT, nicht je
// IP (Setzung P13.6-23); gezaehlt in der Datenbank, EINE Zeile je Projekt, atomar erhoeht
// ueber die RPC relay_rate_hit (Migration 0030; Setzung P13.6-75, E1).
//
// WAS HIER GILT, UND WO ES STEHT (Setzung P13.6-75 der Phase 13.6):
// - E3: 120 Anfragen je 60 s je Projekt, festes Fenster. SCHAETZUNG, kein Verkehr gemessen.
//   Kalibriert auf Missbrauch, nicht auf Erfolg.
// - E4: Scheitert der Zaehler, wird trotzdem weitergeleitet (fail-open) — eine kaputte
//   Schutzschicht darf keinen Lead kosten. Das Urteil "failed" deckt DREI Formen: ein
//   zurueckgegebenes error (auch status 0 bei Abbruch oder Netzfehler), einen Wurf und ein
//   Haengen ueber das Zeitlimit.
// - E6: Zeitlimit 1 000 ms.
// - Der Zaehler bekommt allein die Projekt-Kennung und die Fensterlaenge — nie einen
//   Formularwert, eine IP, einen User-Agent oder einen Host (Setzung P13.6-74, I2 und I3).
// - Aus dem Rueckgabewert der Datenbank verlaesst NICHTS diese Datei ausser dem Urteil:
//   message und details tragen Fremdtext und Stapel (docs/plattform-befunde.md, Supabase,
//   Teil (az)) und gehoeren in keine Logzeile (Setzung P13.6-50, R3).
// Die Waechter stehen in relay.test.ts (R-RL-*) und rate-limit.test.ts (Migrationstext).

/** Die Grenze je Fenster und Projekt (E3; SCHAETZUNG). Mehr als diese Zahl ist "begrenzt". */
export const RELAY_RATE_LIMIT = 120;

/** Die Fensterlaenge in Sekunden (E3). Geht als Argument an die RPC. */
export const RELAY_RATE_WINDOW_SECONDS = 60;

/** Das Zeitlimit des Zaehler-Aufrufs (E6; SETZUNG, NICHT GEMESSEN). */
export const RELAY_RATE_TIMEOUT_MS = 1_000;

/** Der Name der RPC (Migration 0030). */
export const RELAY_RATE_RPC = "relay_rate_hit";

/** "allowed" und "limited" sind Urteile ueber das Projekt; "failed" ist ein Ausfall des Zaehlers. */
export type RelayRateVerdict = "allowed" | "limited" | "failed";

/**
 * Zaehlt EINE Anfrage fuer das Projekt und urteilt. Wirft nie.
 * Genau ein Aufruf der RPC, kein zweiter: Der Client wiederholt einen POST nicht
 * (docs/plattform-befunde.md, Supabase, Teil (az), GELESEN AM CODE); eine Wiederholung hier
 * zaehlte dieselbe Anfrage doppelt.
 */
export async function countRelayHit(projectId: string): Promise<RelayRateVerdict> {
  const controller = new AbortController();
  let timer: ReturnType<typeof setTimeout> | undefined;
  // Das Zeitlimit wirkt ZWEIFACH: Es bricht die Anfrage ab (abortSignal) UND beendet das
  // Warten selbst — auch wenn der Abbruch die Anfrage nicht beendet.
  const timeout = new Promise<"timeout">((resolve) => {
    timer = setTimeout(() => {
      controller.abort();
      resolve("timeout");
    }, RELAY_RATE_TIMEOUT_MS);
  });
  try {
    const call = createAdminClient()
      .rpc(RELAY_RATE_RPC, {
        p_project_id: projectId,
        p_window_seconds: RELAY_RATE_WINDOW_SECONDS,
      })
      .abortSignal(controller.signal);
    const result = await Promise.race([call, timeout]);
    if (result === "timeout") return "failed";
    const { data, error } = result;
    if (error) return "failed";
    // Ein Rueckgabewert ohne die Form einer ganzen Zahl ist ein Ausfall, kein Urteil.
    if (typeof data !== "number" || !Number.isInteger(data)) return "failed";
    return data > RELAY_RATE_LIMIT ? "limited" : "allowed";
  } catch {
    return "failed";
  } finally {
    clearTimeout(timer);
  }
}
