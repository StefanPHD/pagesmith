// DAS EINWILLIGUNGS-SIGNAL IM DRAHT (Phase 11, fuenfte Scheibe). Traegt den
// FELDNAMEN und den LESER an EINER Stelle. Reiner Objekt-Zugriff — kein DOM, kein
// React, kein Netzwerk, keine Datenbank.
//
// WARUM NAME UND LESER IN DERSELBEN DATEI: Der Name wird an ZWEI Enden gebraucht —
// im erzeugten Browser-Text (tracking/meta.ts SETZT das Feld) und im Ingest
// (capi/ingest.ts LIEST es). Stuenden sie getrennt, waere der Name ein Literal an
// zwei Stellen, und ein Tippfehler auf einer Seite braeche das Feld STILL: Der Leser
// faende nichts, das hiesse fuer ihn "abwesend" — und "abwesend" heisst hier
// ERLAUBT. Ein stiller Fail-OPEN, ohne dass irgendwo etwas rot wird.
//
// KEIN `import "server-only"`, und der Grund ist woertlich derselbe wie bei
// META_CONSENT_TARGET in tracking/consent.ts: Eine server-only-Datei ist aus
// erzeugtem Browser-Code nicht erreichbar.
//
// HIER STEHT KEIN ZWEITES URTEIL. Die Einwilligungs-REGEL lebt unveraendert in
// tracking/consent.ts (buildConsentRuntime) und wird im BROWSER gefaellt. Diese
// Datei liest nur das ERGEBNIS, das mitgereist ist. Wer hier anfaengt, aus einem
// Rohzustand selbst zu urteilen, baut genau die zweite Implementierung, die die
// fuenfte Scheibe vermeidet.

/**
 * Der Feldname im Beacon-Body.
 *
 * KURZ, WEIL DER PFAD HEISS IST: /api/e wird von JEDEM Besucher JEDER Kundenseite
 * getroffen (CLAUDE.md, Abschnitt A, /API/E-SCHLANKHEIT). Dieselbe Handschrift wie
 * beim Bestaetigungs-Marker `obs` — drei Zeichen, nicht "consent".
 */
export const CONSENT_WIRE_FIELD = "cns";

/**
 * Darf fuer `target` geforwardet werden?
 *
 * DIE REGEL, in drei Zeilen:
 *  - FELD GANZ ABWESEND -> true. Die Seite ist AELTER als das Feld; sie verhaelt
 *    sich wie vor dieser Scheibe.
 *  - FELD EIN OBJEKT (kein Array, kein null) -> der Ziel-Schluessel muss GENAU
 *    `true` sein.
 *  - ALLES UEBRIGE -> false.
 *
 * WARUM ABWESEND ERLAUBEND IST — der Satz gehoert zwingend dazu, sonst wird die
 * Asymmetrie spaeter als Nachlaessigkeit "korrigiert": Ein Code-Deploy erreicht
 * BESTEHENDE Seiten nicht. Das ausgelieferte HTML entsteht beim Publish und wird
 * abgelegt; eine Seite traegt ihr altes Script, bis sie NEU publiziert wird. Waere
 * ein fehlendes Feld fail-closed, verloere JEDE bestehende Kundenseite ihren
 * Forward — lautlos, mit unveraenderter leerer 204, waehrend die Browser-Ereignisse
 * weiterlaufen. Das ist exakt die Signatur, an der ein toter Server-Forward schon
 * einmal wochenlang unbemerkt blieb.
 * DIE FAIL-CLOSED-REGEL WIRD DAMIT NICHT AUFGEWEICHT: Sie gilt fuer das URTEIL,
 * nicht fuer den TRANSPORTWEG. Ist ein Urteil da, wird es streng gelesen; ist gar
 * keines da, gibt es nichts streng zu lesen.
 *
 * `=== true` STATT TRUTHY: dieselbe Strenge wie im Browser-Gate. Truthy wieder
 * zuzulassen waere die Wiederholung genau des Fehlers, der die zweite Scheibe
 * ausgeloest hat.
 *
 * SIE WIRFT NIE — und die Begruendung ist die eines VERTRAGS, nicht die einer
 * Umschliessung: Es gibt hier keinen try/catch. Jede Anweisung ist ein
 * typeof-Vergleich, ein Array.isArray oder EIN Property-Zugriff auf einem Wert, der
 * auf dem produktiven Pfad beweisbar aus JSON.parse stammt (capi/ingest.ts liest
 * den Body genau so) — und JSON.parse erzeugt WEDER Getter NOCH Proxies.
 * DIE GRENZE GEHOERT DAZU, damit niemand mehr behauptet, als hier steht: Ein von
 * HAND gebautes Objekt mit einem werfenden Getter WUERDE werfen. Auf dem
 * Ingest-Pfad kann es das nicht geben; ausserhalb schon. Wer diesen Leser je an
 * eine andere Quelle als JSON.parse haengt, muss den Vertrag neu pruefen.
 *
 * `body` ist bewusst `unknown` und nicht der Body-Typ des Handlers: Der Leser soll
 * nichts ueber die uebrigen Felder wissen. Der Nicht-Objekt-Zweig ist vom Handler
 * aus UNERREICHBAR (dort ist der Body vor jedem Lesen als Objekt geprueft, sonst
 * 400) und existiert nur, damit die Funktion total ist.
 */
export function consentAllows(body: unknown, target: string): boolean {
  if (typeof body !== "object" || body === null) return true;

  const wire = (body as Record<string, unknown>)[CONSENT_WIRE_FIELD];
  // ABWESEND: JSON kennt kein `undefined` -> ein Feld, das im Text fehlt, ist hier
  // undefined, und JEDES vorhandene Feld hat einen JSON-Wert. Die Trennung
  // "abwesend" gegen "vorhanden, aber leer" haengt genau an dieser Eigenschaft.
  if (wire === undefined) return true;

  // typeof null === "object" -> eigener Guard. Ein Array ist ebenfalls "object",
  // traegt aber keine Ziel-Schluessel -> verboten, statt still undefined zu lesen.
  if (typeof wire !== "object" || wire === null || Array.isArray(wire)) return false;

  return (wire as Record<string, unknown>)[target] === true;
}
