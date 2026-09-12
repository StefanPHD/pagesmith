// DER ABLEHNUNGS-SETZER (Phase 11.5, Scheibe 11.5a). Erzeugt den Laufzeit-Text, der
// den BETREIBER-HOOK mit einem Urteil belegt, in dem KEIN Schluessel erlaubt ist.
// Reiner String-Bau — kein DOM, kein React, kein Netzwerk, keine Datenbank.
//
// WARUM EIGENE DATEI UND NICHT analytics/pageview-emitter.ts, wo er eingefuegt wird:
// Jene Datei weist sich im Kopf als PageView-Einheit aus. Es ist dieselbe Begruendung,
// mit der das Gate seinerzeit nicht in tracking/meta.ts gelegt wurde — der Ort des
// EINFUEGENS ist nicht der Ort des ERZEUGENS.
//
// WARUM ER UEBERHAUPT GEBRAUCHT WIRD: Ohne ihn gilt auf einer publizierten Seite
// "nicht gesetzt heisst erlaubt" — alle konfigurierten Ziele werden beliefert, ohne
// dass je jemand gefragt wurde. Der VORHER-Zustand ist die eigentliche Arbeit dieser
// Phase; ein Urteil, das erst NACH der Entscheidung gesetzt wird, kommt zu spaet, weil
// der erste Beacon dann schon durch ist.
//
// KEIN `import "server-only"`, und der Grund ist woertlich derselbe wie bei
// META_CONSENT_TARGET in tracking/consent.ts: Eine server-only-Datei ist aus
// erzeugtem Browser-Code nicht erreichbar.
//
// HIER STEHT KEIN ZWEITES URTEIL. Diese Datei SETZT einen Wert; die Auswertungsregel
// lebt unveraendert in tracking/consent.ts. Wer hier anfaengt zu urteilen, baut die
// zweite Implementierung, gegen die die fuenfte Scheibe der Phase 11 stand.

import { ALL_CONSENT_KEYS } from "@/lib/tracking/consent-targets";

/**
 * KENNUNG des Blocks, `__ps_`-namespaced wie der PageView-Emitter (`__ps_pve`).
 * Ueber sie ist er auffindbar — fuer Tests und fuer jeden, der einen ausgelieferten
 * Text liest. Eine Auswahl ueber die Position waere eine POSITIONS- statt
 * Namensbindung; genau die fuehrt dieses Projekt als Fehlerklasse.
 */
export const CONSENT_SETTER_SCRIPT_ID = "__ps_cns";

/**
 * Der Script-Block, der `window.pagesmithConsent` auf ein Objekt setzt, in dem JEDER
 * der sechs Schluessel auf `false` steht — und zwar NUR, wenn der Hook noch nicht
 * existiert.
 *
 * DAS PRAEDIKAT IST `!== undefined`, NICHT TRUTHINESS, und das ist die tragende
 * Zeile dieser Datei (bindende Entscheidung (3) der Phase 11.5). Der Konsument
 * (tracking/consent.ts) trennt "nicht gesetzt" von "entschieden" an GENAU EINER
 * Stelle: `v === undefined`. Jeder andere falsy-Wert — `false`, `null`, `0`, ein
 * leeres Objekt — ist bei ihm BEREITS EIN URTEIL, naemlich "verboten".
 * EIN TRUTHINESS-TEST HIER UEBERSCHRIEBE VIER DIESER FUENF FAELLE und damit eine
 * Entscheidung, die jemand getroffen hat. Der Setzer muss dieselbe Grenze ziehen wie
 * der Leser, sonst sind die beiden nicht komplementaer.
 *
 * WARUM DAS UEBERHAUPT NOETIG IST: Ein Betreiber kann unseren Schalter einschalten UND
 * ein eigenes CMP mitbringen. Unser Block steht am Dokumentende, sein CMP
 * typischerweise davor — ohne diese Bedingung ueberschriebe unser "alles abgelehnt"
 * seine Zustimmung, und SEINE SEITE HOERTE STILL AUF ZU TRACKEN. Ein Betreiber mit
 * eigenem CMP darf nie von unserem abhaengen.
 * DIE GRENZE GEHOERT DAZU: Ein CMP, das den Hook ASYNCHRON nach dem Seitenaufbau
 * setzt, wird von dieser Pruefung NICHT erfasst — dann hat unser Block laengst
 * geschrieben. UNGEMESSEN, als Vorrat gefuehrt, hier nicht geloest.
 *
 * DIE SCHLUESSEL KOMMEN AUS ALL_CONSENT_KEYS UND WERDEN NICHT UEBERGEBEN: Ein
 * Parameter liesse einen Aufrufer eine andere Liste einsetzen — genau die zweite
 * Liste, die Entscheidung (4) ausschliesst.
 *
 * JSON.stringify FUER JEDEN SCHLUESSEL: kein Injektions-Vektor, gleiche Handschrift
 * wie beim PageView-Emitter (PAGEVIEW_EVENT, trackingKey).
 *
 * SERIALISIERUNGSSICHER: enthaelt kein literales </script> und kein literales
 * </body>.
 */
export function buildConsentDenyScript(): string {
  const denied = ALL_CONSENT_KEYS.map(
    (k) => `${JSON.stringify(k)}: false`
  ).join(", ");
  return `<script id="${CONSENT_SETTER_SCRIPT_ID}">
(function(){
  if (window.pagesmithConsent !== undefined) return;
  window.pagesmithConsent = { ${denied} };
})();
</script>`;
}
