// DIE GESPEICHERTE ENTSCHEIDUNG UND DER WEG ZURUECK (Phase 11.5, Scheibe 11.5b).
// Erzeugt EINEN Script-Block, der zwei Dinge traegt: die Speicher-Schnittstelle im
// Artefakt (lesen, schreiben, validieren) und die Wiederherstellung einer frueher
// getroffenen Entscheidung in den Betreiber-Hook — BEVOR der Setzer aus 11.5a
// "abgelehnt" schreibt. Reiner String-Bau: kein DOM, kein React, kein Netzwerk,
// keine Datenbank, kein server-seitiges Parsen.
//
// WARUM EIN EIGENER BLOCK UND KEINE ERWEITERUNG DES SETZERS (bindende Entscheidung (8)
// der Phase 11.5): Die zwei Gestalt-Waechter des Setzers (T3, T3b in
// consent-setter.test.ts) verbieten "true" im Setzer-Block und zaehlen genau sechs
// ": false". Eine Leselogik dort zwaenge, sie zu biegen. So bleibt der Setzer
// byte-gleich, und seine unveraenderte Pruefung kehrt zurueck, sobald dieser Block den
// Hook belegt hat.
//
// KEIN `import "server-only"`, und der Grund ist woertlich derselbe wie bei
// META_CONSENT_TARGET in tracking/consent.ts: Eine server-only-Datei ist aus erzeugtem
// Browser-Code nicht erreichbar.
//
// HIER STEHT KEIN ZWEITES URTEIL UEBER DEN HOOK. Die Auswertungsregel lebt unveraendert
// in tracking/consent.ts. Dieser Block SETZT den Hook aus einer gespeicherten
// Entscheidung; er beurteilt ihn nicht.

import { PAGEVIEW_SEND_API } from "@/lib/analytics/events";
import { ALL_CONSENT_KEYS } from "@/lib/tracking/consent-targets";

/**
 * Kennung des Blocks, `__ps_`-namespaced wie `__ps_cns` und `__ps_pve`.
 * SIE DARF KEINE DER KENNUNGEN ENTHALTEN, NACH DENEN DER BESTAND SUCHT
 * (`id="pagesmith-consent"` in hasConsentScript, `id="__ps_cns"` und `__ps_pve` /
 * `__ps_pv` in den Reihenfolge-Tests). Ein Waechter in consent-store.test.ts haelt das.
 */
export const CONSENT_RESTORE_SCRIPT_ID = "__ps_cnr";

/**
 * Der Schluessel in `localStorage` — origin-gebunden und kein Cookie, damit der Wert mit
 * keinem Request mitgeht, auch nicht an /api/e.
 */
export const CONSENT_STORE_KEY = "__ps_consent";

/**
 * DIE FASSUNGSMARKE DES GESPEICHERTEN WERTS: `ps1`.
 *
 * `ps1` BEZEICHNET FUER IMMER GENAU DIESE GESTALT — `ps1:<granted>|<denied>`, je Liste
 * kommagetrennte Schluessel aus ALL_CONSENT_KEYS. Aendert sich die Gestalt, bekommt sie
 * eine NEUE Marke. Dieselbe Achse wie docs/immer-beachten.md, "EINE FASSUNGSMARKE DER
 * NUTZLAST WIRD NIE FUER EINE ANDERE FELDMENGE WIEDERVERWENDET": Der Code kann nicht
 * sehen, was `ps1` gestern bezeichnet hat — ein unter derselben Marke geaenderter Wert
 * wuerde nicht abgewiesen, sondern falsch gedeutet.
 *
 * WARUM EIN STRING UND KEIN JSON-OBJEKT: Ein Objekt saehe aus wie ein Hook und luede
 * dazu ein, es roh zuzuweisen — und ein roh uebernommenes `true` erlaubte beim Konsumenten
 * jeden Schluessel, auch kuenftige. Ein String am Hook faellt
 * beim Konsumenten in "alles uebrige -> verboten" — eine rohe Uebernahme bricht damit
 * fail-closed, nicht fail-open. Ein literales `true` ist in dieser Gestalt nicht
 * darstellbar.
 */
export const CONSENT_STORE_FORMAT = "ps1";

/**
 * Obergrenze fuer einen gelesenen Wert; alles darueber ist ungueltig.
 *
 * KEIN TEST TRENNT SIE, UND DAS IST KEIN VERSAEUMNIS: Ein GUELTIGER Wert kann sie
 * konstruktionsbedingt nicht erreichen — er fuehrt jeden bekannten Schluessel hoechstens
 * einmal, also hoechstens Marke + alle Schluessel + Trenner. Bei den sechs Schluesseln vom
 * 2026-09-14 sind das 52 Zeichen (GEMESSEN). Jede Ueberlaenge ist damit ohnehin aus einem
 * anderen Grund ungueltig. Was die Grenze traegt, ist der pathologisch lange Wert, der sonst
 * erst beim Zerlegen verworfen wuerde. Sie ist kein toter Code.
 * IHRE BEDINGUNG: Die Aussage gilt, solange Marke + Schluessel + Trenner unter der Grenze
 * bleiben. Waechst die Schluesselmenge so weit, dass ein gueltiger Wert sie erreicht, ist sie
 * neu zu setzen — sonst hiesse ein gueltiger Wert "nie gefragt".
 */
export const CONSENT_STORE_MAX_LENGTH = 512;

/**
 * Der Name der Schnittstelle im Artefakt: `window.__psConsentStore` mit `read()` und
 * `write(granted)`. Sie existiert NUR bei eingeschaltetem Schalter, weil der Block nur
 * dann entsteht. Ein spaeterer Dialog-Block in derselben Server-Injektion erreicht sie
 * ueber diesen Namen und prueft vorher ihre Existenz.
 */
export const CONSENT_STORE_API = "__psConsentStore";

/**
 * Der Block `<script id="__ps_cnr">`.
 *
 * `read()` — NEBENWIRKUNGSFREI, damit ein spaeterer Dialog fragen kann, ob schon entschieden
 * wurde, ohne den Zustand zu veraendern: kein setItem, kein
 * removeItem, keine Hook-Aenderung, auch nicht aufraeumend bei einem ungueltigen Wert.
 * Liefert je Aufruf ein FRISCHES Objekt: `{state:"never"}` oder
 * `{state:"decided", granted:[...], denied:[...]}`. "Abgelehnt" ist `decided` mit
 * leerer granted-Liste.
 *
 * DIE VALIDIERUNG VERWIRFT STRENG: Jeder Wert, der die Gestalt nicht exakt traegt — ein
 * unbekannter Schluessel, ein Duplikat, ein Schluessel in beiden Listen, eine fremde
 * Marke, ein literales "true", ein Array, ueberlang — heisst "nie gefragt". Ein
 * werfender Zugriff auf den Speicher heisst ebenfalls "nie gefragt" (fail-closed: der
 * Setzer lehnt danach ab).
 * DIE FOLGE, UND SIE IST GEWOLLT: Aendert sich die Schluesselmenge so, dass alte Werte
 * ungueltig werden, gelten ALLE Besucher als "nie gefragt", und ein spaeterer Dialog
 * oeffnet erneut. Das ist laut und nicht still. Ein neuer Schluessel allein macht
 * nichts ungueltig — ein alter Wert fuehrt ihn nur in keiner Liste.
 *
 * DIE denied-LISTE TRAEGT FUER DEN HOOK NICHTS — ein Schluessel ausserhalb von granted
 * wird ohnehin false. Sie traegt die Aufzeichnung, WORUEBER GEFRAGT WURDE. Ohne sie kann
 * ein spaeterer Dialog bei einem NEUEN Ziel nicht unterscheiden, ob der Besucher es
 * abgelehnt hat oder ob es ihn zum Zeitpunkt der Entscheidung nicht gab. Sie ist nicht
 * redundant.
 *
 * `write(granted)` — nimmt ein Array bekannter Schluessel ohne Duplikat; alles andere
 * (auch `true`) ergibt `false` ohne Schreibversuch. Speichert, liest zurueck, und setzt
 * ERST DANACH den Hook der laufenden Seite (Architekt-Entscheidung 2026-09-14): Ohne das
 * ginge die Erst-Conversion eines Besuchers, der gerade zugestimmt hat, nicht hinaus.
 * DIE REIHENFOLGE IST TRAGEND: Schlaegt das Speichern fehl (Wurf oder abweichende
 * Ruecklese), bleibt der Hook unveraendert und `write` gibt `false` — sonst sendete die
 * Seite, und beim naechsten Laden waere die Zustimmung weg.
 * DER PREIS: Ein `write`-Aufruf auf einer Seite mit gesetztem Fremd-CMP ueberschreibt
 * dessen Urteil. Ungemessen. Die Schnittstelle existiert nur bei eingeschaltetem Schalter.
 *
 * DER NACHGEHOLTE SEITENAUFRUF (Scheibe 11.5c): Nach dem Hook ruft `write` die
 * Sende-Logik des PageView-Emitters (PAGEVIEW_SEND_API) — ueber eine EXISTENZPRUEFUNG,
 * weil sie in einem SPAETEREN Block steht und bei einem Aufruf waehrend des Parsens noch
 * fehlt. Der Aufruf ist nach Erfolg UNBEDINGT: Ob gesendet wird, entscheidet allein die
 * Funktion selbst (Guard, analytics-Einwilligung) — hier faellt kein zweites Urteil.
 * KEIN try/catch um den Aufruf: Er machte die Existenzpruefung redundant und ihr
 * Entfernen unentdeckbar. Fehlt sie, wirft ein erfolgreiches `write` ohne
 * PageView-Script einen ReferenceError — gemessen per Mutation (Scheibe 11.5c): rot werden
 * N6/7 in analytics/pageview-emitter.resend.test.ts sowie R9, die R10-Positivkontrolle und
 * R13 in consent-store.test.ts, alle mit derselben Fehlerklasse.
 *
 * DER HOOK WIRD IN BEIDEN WEGEN SCHLUESSEL FUER SCHLUESSEL AUS ALL_CONSENT_KEYS GEBAUT,
 * NIE ROH AUS DEM SPEICHER: Ein Schluessel, den der Wert nicht fuehrt, wird false, und ein
 * gespeichertes literales `true` kann gar nicht erst durchgereicht werden.
 *
 * DIE WIEDERHERSTELLUNG PRUEFT ZUERST DEN HOOK, mit demselben Praedikat wie der Setzer
 * (`!== undefined`, nicht Truthiness): Ein Fremd-CMP, das frueher im Dokument gesetzt
 * hat, gewinnt — auch ueber diesen Block ueberschreibt unser Code kein fremdes Urteil, das vor
 * ihm steht. Ein asynchron setzendes CMP erfasst die Pruefung nicht; ungemessen.
 *
 * SERIALISIERUNGSSICHER: enthaelt kein literales </script> und kein literales </body>.
 */
export function buildConsentRestoreScript(): string {
  const keys = JSON.stringify([...ALL_CONSENT_KEYS]);
  return `<script id="${CONSENT_RESTORE_SCRIPT_ID}">
(function(){
  var KEY = ${JSON.stringify(CONSENT_STORE_KEY)};
  var PREFIX = ${JSON.stringify(CONSENT_STORE_FORMAT + ":")};
  var MAX = ${CONSENT_STORE_MAX_LENGTH};
  var KEYS = ${keys};
  function isKey(k) {
    for (var i = 0; i < KEYS.length; i++) { if (KEYS[i] === k) return true; }
    return false;
  }
  function parseList(s, seen) {
    if (s === "") return [];
    var parts = s.split(","), out = [];
    for (var i = 0; i < parts.length; i++) {
      var k = parts[i];
      if (!isKey(k) || seen[k] === 1) return null;
      seen[k] = 1;
      out.push(k);
    }
    return out;
  }
  function hookFrom(granted) {
    var h = {};
    for (var i = 0; i < KEYS.length; i++) { h[KEYS[i]] = granted.indexOf(KEYS[i]) !== -1; }
    return h;
  }
  function read() {
    var raw;
    try { raw = window.localStorage.getItem(KEY); } catch (e) { return { state: "never" }; }
    if (typeof raw !== "string" || raw.length > MAX || raw.indexOf(PREFIX) !== 0) {
      return { state: "never" };
    }
    var body = raw.slice(PREFIX.length), bar = body.indexOf("|");
    if (bar === -1 || body.indexOf("|", bar + 1) !== -1) return { state: "never" };
    var seen = {};
    var granted = parseList(body.slice(0, bar), seen);
    var denied = granted && parseList(body.slice(bar + 1), seen);
    if (!granted || !denied) return { state: "never" };
    return { state: "decided", granted: granted, denied: denied };
  }
  function write(granted) {
    if (!Array.isArray(granted)) return false;
    var seen = {};
    for (var i = 0; i < granted.length; i++) {
      if (typeof granted[i] !== "string" || !isKey(granted[i]) || seen[granted[i]] === 1) return false;
      seen[granted[i]] = 1;
    }
    var g = [], d = [];
    for (var j = 0; j < KEYS.length; j++) { (seen[KEYS[j]] === 1 ? g : d).push(KEYS[j]); }
    var value = PREFIX + g.join(",") + "|" + d.join(",");
    try {
      var ls = window.localStorage;
      ls.setItem(KEY, value);
      if (ls.getItem(KEY) !== value) return false;
    } catch (e) { return false; }
    window.pagesmithConsent = hookFrom(g);
    if (typeof ${PAGEVIEW_SEND_API} === "function") ${PAGEVIEW_SEND_API}();
    return true;
  }
  window.${CONSENT_STORE_API} = { read: read, write: write };
  if (window.pagesmithConsent !== undefined) return;
  var s = read();
  if (s.state !== "decided") return;
  window.pagesmithConsent = hookFrom(s.granted);
})();
</script>`;
}
