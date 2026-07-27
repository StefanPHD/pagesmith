// Fehlerbehandlung fuer CLIENT-seitige Server-Action-Aufrufe.
//
// DAS PROBLEM (live gemessen 2026-07-27, DevTools offline + Speichern): Die Handler
// pruefen das Ergebnis ueber result.ok — aber {ok:true} und {ok:false} sind beide
// RUECKGABEWERTE. Ein Netzwerk- oder Serverfehler liefert keinen Rueckgabewert,
// sondern eine EXCEPTION. Ohne try/catch verlaesst sie den Handler, jede Zeile ab
// der if-Pruefung entfaellt, und der Busy-State wird nie zurueckgesetzt: keine
// Meldung, und der Button blockiert dauerhaft den ZWEITEN VERSUCH.
//
// DER SCHNITT: EIN Wrapper normalisiert den Wurf in DENSELBEN Wert, den die Action
// im Fehlerfall ohnehin liefert. Alle bestehenden if(result.ok)-Zweige und die dort
// schon vorhandenen Busy-Resets funktionieren damit UNVERAENDERT — ein Mechanismus
// statt zwanzig Gelegenheiten, ein try/catch zu vergessen.
//
// KEIN Retry, kein Auto-Reconnect, kein Toast-System. Der Wrapper (1) normalisiert
// den Wurf, (2) gibt damit den Busy-State frei, (3) laesst die Meldung im
// BESTEHENDEN Kanal des jeweiligen Handlers erscheinen.

import { unstable_rethrow } from "next/navigation";

/**
 * Fuehrt einen Server-Action-Aufruf aus und gibt bei einem WURF den uebergebenen
 * Ersatzwert zurueck. Der Erfolgspfad ist unberuehrt — der Wrapper greift NUR,
 * wenn geworfen wird.
 *
 * WARUM DER AUFRUFER DEN ERSATZWERT STELLT (statt dass der Wrapper ihn erzeugt):
 * Die Actions teilen zwar {ok:false, error:string}, aber die drei Domain-Actions
 * verlangen ZUSAETZLICH ein reason-Feld (src/lib/domains/register.ts,
 * remove.ts, status.ts). Ein Wrapper, der pauschal {ok:false,error} baut, waere
 * dort ein Typfehler. Mit onThrow: T prueft TypeScript den Ersatzwert gegen den
 * ECHTEN Rueckgabetyp der jeweiligen Action — ein Mechanismus, null Sonderfaelle,
 * und ein vergessener/falscher Ersatzwert bricht den Build statt die Laufzeit.
 *
 * KONTROLLFLUSS-WUERFE WERDEN DURCHGELASSEN (Invariante viii): Next.js benutzt
 * geworfene Fehler als SIGNAL — redirect(), notFound(), forbidden(),
 * unauthorized() und der Bailout-to-CSR werfen. Wuerde dieser Wrapper sie fangen,
 * faende die Weiterleitung schlicht nicht statt, ohne Fehlermeldung: exakt die
 * "still kaputt"-Klasse, die er verhindern soll. unstable_rethrow ist Next's
 * eigener Riegel dafuer — es wirft solche Signale weiter und kehrt bei allen
 * anderen Fehlern zurueck (Browser-Variante geprueft in next 16.2.9:
 * isNextRouterError = isRedirectError || isHTTPAccessFallbackError, plus
 * isBailoutToCSRError, plus Rekursion in error.cause).
 * HEUTIGER STAND: keine der umschlossenen Actions ruft redirect/notFound —
 * einzig signOut (src/app/auth/actions.ts) tut es, und die laeuft als
 * form action, nicht ueber diesen Wrapper. Der Riegel steht also fuer die
 * NAECHSTE Action, die eine Weiterleitung nutzt; ohne ihn waere sie ein stiller
 * Fehler, den niemand mit dieser Datei in Verbindung braechte.
 *
 * DER WRAPPER LOGGT NICHTS — bewusst, nicht aus Bequemlichkeit: er ist GENERISCH
 * und weiss nie, was im Closure des uebergebenen Thunks liegt. Am CAPI-Pfad ist es
 * der KLARTEXT-TOKEN (handleSetCapiToken schliesst capiTokenInput ein). Eine
 * Logging-Zeile, die heute harmlos aussieht, wird beim naechsten Aufrufer zum Leck.
 * Wird Diagnose je gebraucht: AUSSCHLIESSLICH errorName(err) aus src/lib/errors.ts
 * (traegt bewusst kein server-only, ist also client-importierbar), NIEMALS die
 * Argumente, NIEMALS das Error-Objekt, NIEMALS ein Stack — und dann an der
 * einzelnen Stelle, die es braucht, nicht hier im generischen Wrapper
 * (Tier-0-Logging-Lektion, s. Security Manifest).
 */
export async function safeAction<T>(
  run: () => Promise<T>,
  onThrow: T
): Promise<T> {
  try {
    return await run();
  } catch (err) {
    unstable_rethrow(err);
    return onThrow;
  }
}

/**
 * Meldung fuer den NEUTRALEN Fall. Sie behauptet BEWUSST weder Ursache noch
 * Ergebnis — dieselbe Wortwahl-Disziplin wie bei den Analytics-Zahlen ("nur
 * server-seitig erfasst", niemals "gerettet"): eine Meldung darf nicht mehr sagen,
 * als die Daten hergeben.
 *
 * NICHT "Keine Verbindung zum Server": das behauptete eine URSACHE, die wir nicht
 * kennen — ein Server-Bug, ein 500er, eine abgelaufene Session oder ein
 * Programmierfehler in der Action werfen genauso. Der Wrapper wuerde sie alle als
 * "Verbindungsproblem" verkleiden.
 * NICHT "wurde nicht ausgefuehrt": das behauptete ein ERGEBNIS, das wir ebenfalls
 * nicht kennen — bricht die Verbindung auf dem RUECKWEG, ist der Write bereits
 * passiert. Wir wissen nur, dass wir KEINE ANTWORT haben.
 * "konnte nicht abgeschlossen werden" ist in BEIDE Richtungen wahr.
 */
export const ACTION_THROW_MESSAGE =
  "Die Aktion konnte nicht abgeschlossen werden — bitte erneut versuchen.";

/**
 * Meldung fuer die SPEICHER-Pfade. Zusaetzlich zur neutralen Aussage die
 * Entwarnung, die dort — und NUR dort — belegbar ist: savedCode/savedMappings
 * werden ausschliesslich im Erfolgszweig gesetzt, der Draft im Editor bleibt
 * unangetastet und der beforeunload-Guard greift weiter.
 *
 * BEWUSST NICHT UEBERALL: bei Loesch-, Publish- und Domain-Pfaden gibt es keine
 * "Aenderungen", die noch da waeren — dort waere der Zusatz eine falsche
 * Beruhigung, und eine falsch beruhigende Meldung ist schlimmer als eine neutrale.
 */
export const SAVE_THROW_MESSAGE =
  "Speichern konnte nicht abgeschlossen werden — deine Änderungen sind noch da. Bitte erneut versuchen.";

/**
 * Ersatzwert fuer die verbreitetste Fehlerform ({ok:false, error}). Deckt alle
 * Actions in actions.ts sowie listProjectDomains ab.
 *
 * Die drei Domain-Mutationen brauchen zusaetzlich ein reason-Feld; dort schreibt
 * der Aufrufer { ...actionThrew(), reason: "internal_error" }. Der Wert ist nicht
 * erfunden: beide Reason-Unions fuehren "internal_error" real (register.ts:24-32,
 * remove.ts:26-31), und er beschreibt den Fall korrekt.
 */
export function actionThrew(message: string = ACTION_THROW_MESSAGE): {
  ok: false;
  error: string;
} {
  return { ok: false, error: message };
}
