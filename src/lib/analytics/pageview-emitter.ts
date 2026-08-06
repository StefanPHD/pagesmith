// PageView-Emitter (Phase 8 Scheibe 2b-1). Server-injizierter Client-JS-Schnipsel, der
// beim Laden einer GEHOSTETEN Seite EINEN PageView-Beacon an den first-party /api/e
// schickt. Reiner String-Bau + reine String-Injektion — KEIN DOM, KEIN Parser (kein
// Cheerio; CLAUDE.md-Regel "kein Server-HTML-Parsing").
//
// Der Emitter kommt DANEBEN ins fertige funktionale HTML (nicht statt der CAPI-Wiring) —
// die Meta-/CAPI-Einbettung (generate.ts/tracking/meta.ts) bleibt byte-gleich unberuehrt.
//
// trackingKey stammt server-autoritativ aus der Spalte projects.tracking_key (2b-0) und
// wird — wie PAGEVIEW_EVENT — via JSON.stringify eingesetzt: kein Injektions-Vektor.

import { PAGEVIEW_EVENT } from "./events";
import {
  ANALYTICS_CONSENT_TARGET,
  buildConsentScript,
  hasConsentScript,
} from "@/lib/tracking/consent";

const SCRIPT_ID = "__ps_pve";

// Erzeugt das <script id="__ps_pve">…</script> mit dem Emitter-JS. Enthaelt bewusst
// KEIN literales "</script>" oder "</body>" -> serialisierungssicher.
//
// - window.__ps_pv HAELT die eventID (ID = Guard): einmal gesetzt -> schon gefeuert,
//   ein Beacon pro Load; echter Reload = neue ID = separater View; Doppel-Include zaehlt
//   einmal.
// - eventID wird EINMAL oben erzeugt (vor der sendBeacon/fetch-Entscheidung) -> der
//   fetch-Fallback traegt dieselbe ID.
// - Zustellung: navigator.sendBeacon('/api/e', text/plain-Blob); Fallback fetch mit
//   keepalive:true (PFLICHT, sonst Abbruch beim Verlassen der Seite). text/plain haelt
//   den simplen Beacon preflight-frei; der Ingest-Handler liest den Body per
//   JSON.parse(request.text()), content-type-agnostisch.
// - Bare Payload {trackingKey, eventID, event}: KEIN Pfad/Referrer (Ein-Seiten-Tool).
//   source='server' setzt der Handler.
//
// --- DAS EINWILLIGUNGS-GATE (Phase 11, dritte Scheibe) -----------------------
// Zwei Zeilen, ZWISCHEN Guard-LESEN und Kennungs-Erzeugung. Beides ist entschieden
// und keine Bau-Wahl:
//
// WARUM GENAU DIESE STELLE — Zuschnitt (j) im Wortlaut, nicht als Verweis: "Der
// Guard beantwortet 'STEHT UEBERHAUPT ETWAS AN?', die Einwilligung 'DARF ES?'. Die
// zweite Frage zu stellen, wenn die erste schon NEIN sagt, ist ein URTEIL UEBER
// EINEN VORGANG, DEN ES NICHT GIBT." Der Grund ist die AUSSAGE, nicht der gesparte
// Aufruf — wer das fuer eine Mikro-Optimierung haelt, stellt es beim naechsten
// Umbau achtlos um.
// Dass sie VOR dem Guard-SETZEN steht, ist dagegen KEINE eigene Wahl: es folgt
// zwingend aus (c) — der Guard bedeutet "fuer diesen Load ist ein Seitenaufruf
// raus", und ihn im BLOCKIERTEN Fall zu setzen waere eine falsche Aussage.
//
// DIE EXISTENZPRUEFUNG IST KEIN ZWEITES URTEIL — der Kommentar steht hier, damit
// sie spaeter nicht als Regel-Dublette "aufgeraeumt" wird: Geprueft wird, OB ein
// Urteil da ist, NICHT wie es ausfaellt. Die Regel selbst bleibt an genau einer
// Stelle (tracking/consent.ts). Sie ist noetig, weil der Aufruf eine
// BLOCKUEBERGREIFENDE Referenz ist: fehlt der Block (s. hasConsentScript unten),
// wuerfe ein direkter Aufruf, und der Wurf verliesse die IIFE — die try/catch
// unten umschliessen NUR das Senden. FAIL-CLOSED aus demselben Grund wie die Regel:
// fehlt das Urteil, ist NICHT bekannt, ob eingewilligt wurde. Der Betreiber merkt
// es (die Seitenaufrufe hoeren auf) — fail-open merkte niemand.
// Zeichengleich zur Meta-Fassung (tracking/meta.ts, __psMetaInit/__psMetaFire):
// blosser Bezeichner, damit die zweite Instanz derselben Denkfigur als solche
// erkennbar bleibt. `typeof` auf einen nicht deklarierten Bezeichner wirft nicht.
//
// (k): Der SENDE-FEHLSCHLAG ist davon NICHT beruehrt. Ein Sendeversuch liefert
// "angenommen", nicht "zugestellt"; der Guard bleibt dort unveraendert wie bisher.
export function buildPageViewScript(trackingKey: string): string {
  return `<script id="${SCRIPT_ID}">
(function(){
  if (window.__ps_pv) return;
  if (typeof __psConsent !== "function") return;
  if (!__psConsent(${JSON.stringify(ANALYTICS_CONSENT_TARGET)})) return;
  var eid = (window.crypto && window.crypto.randomUUID)
    ? window.crypto.randomUUID()
    : "e" + Date.now() + "-" + Math.random().toString(16).slice(2);
  window.__ps_pv = eid;
  var body = JSON.stringify({
    trackingKey: ${JSON.stringify(trackingKey)},
    eventID: eid,
    event: ${JSON.stringify(PAGEVIEW_EVENT)}
  });
  try {
    var ok = navigator.sendBeacon &&
      navigator.sendBeacon('/api/e', new Blob([body], { type: 'text/plain' }));
    if (!ok) fetch('/api/e', { method: 'POST', keepalive: true, body: body });
  } catch (e) {
    try { fetch('/api/e', { method: 'POST', keepalive: true, body: body }); } catch (e2) {}
  }
})();
</script>`;
}

// Injiziert den Emitter ins fertige HTML. REINE String-Op: letztes </body>
// case-insensitiv per lastIndexOf auf dem Lowercase-Klon (laengengleich -> Index passt
// 1:1 aufs Original), Script davor einfuegen; fehlt </body>, ans Ende anhaengen (ein
// Script am Dokumentende feuert trotzdem). KEIN Regex, KEIN Parser.
export function injectPageViewEmitter(html: string, trackingKey: string): string {
  // ZWEITE EINFUEGESTELLE DES GETEILTEN CONSENT-GATES (Phase 11, zweite Scheibe).
  // Sie ist noetig, weil eine publizierte Seite OHNE Mappings KEIN Wiring traegt —
  // dann kaeme der Block aus generate.ts nicht, und die publizierte Seite haette
  // einen Tracking-Konsumenten (diesen Emitter) ohne Gate. Damit haengt der Block
  // WEDER an der Pixel-ID NOCH an der Mapping-Tabelle.
  //
  // EIN BLOCK JE DOKUMENT, PRUEFBAR: hasConsentScript fragt das Dokument, statt sich
  // auf eine Aufrufreihenfolge zu verlassen. Traegt es den Block schon (Wiring-Fall),
  // wird nichts ergaenzt.
  //
  // DIESE FUNKTION TRAEGT DEN BLOCK, SIE KONSUMIERT IHN NICHT — und genau dafuer steht
  // dieser Absatz: TRAGEN und FRAGEN sind zwei verschiedene Dinge an zwei
  // verschiedenen Stellen DERSELBEN Datei. Hier wird der Block nur eingefuegt;
  // GEFRAGT wird er in buildPageViewScript, vor dem Senden.
  // DER EMITTER SELBST IST GEGATED (Phase 11, dritte Scheibe): buildPageViewScript
  // fragt vor dem Senden fuer den Schluessel der eigenen Auswertung. Bis dahin stand
  // hier das GEGENTEIL — er bleibe ungegated, und ihn hinter das Gate zu stellen sei
  // eine eigene Scheibe. Diese Scheibe ist gebaut, und der Gegenbeweis steht in
  // DIESER Datei. RICHTIGGESTELLT statt gestempelt: Der Satz ist eine Aussage ueber
  // das HEUTIGE Verhalten, keine datierte Entscheidung — er darf nicht in falscher
  // Fassung neben seinem Gegenbeweis stehenbleiben.
  const gate = hasConsentScript(html) ? "" : buildConsentScript();
  const script = gate + buildPageViewScript(trackingKey);
  const idx = html.toLowerCase().lastIndexOf("</body>");
  if (idx === -1) return html + script;
  return html.slice(0, idx) + script + html.slice(idx);
}
