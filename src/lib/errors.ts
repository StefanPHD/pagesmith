/**
 * Fehlertyp-Name fuer Logs — NIE die Message (die kann Client-Input tragen).
 *
 * Bewusst NICHT nur `err instanceof Error`: ein abgebrochener fetch/Insert wirft eine
 * DOMException("AbortError"), und die ist je nach Runtime/Testumgebung KEINE
 * Error-Instanz -> mit dem naiven Check wuerde ausgerechnet der Timeout-Fall als
 * "unknown" geloggt und waere in Produktion nicht diagnostizierbar.
 *
 * Flache lib-Datei nach dem Vorbild von settings.ts: cross-cutting genutzt (capi/,
 * analytics/), gehoert damit in keinen der Domain-Ordner. BEWUSST KEIN
 * `import "server-only"` — die Funktion beruehrt keine Secrets und ist runtime-neutral;
 * eine server-only-Fessel wuerde sie ohne Gegenwert fuer Client-Code sperren.
 */
export function errorName(err: unknown): string {
  if (typeof err === "object" && err !== null && "name" in err) {
    return String((err as { name: unknown }).name);
  }
  return "unknown";
}
