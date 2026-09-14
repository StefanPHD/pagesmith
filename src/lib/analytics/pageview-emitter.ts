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

import { PAGEVIEW_EVENT, PAGEVIEW_SEND_API } from "./events";
import {
  ANALYTICS_CONSENT_TARGET,
  buildConsentScript,
  hasConsentScript,
} from "@/lib/tracking/consent";
import { buildConsentBarScript } from "@/lib/tracking/consent-bar";
import { buildConsentDenyScript } from "@/lib/tracking/consent-setter";
import { buildConsentRestoreScript } from "@/lib/tracking/consent-store";

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
//
// --- DER NACHGEHOLTE SEITENAUFRUF (Phase 11.5, Scheibe 11.5c) ---------------
// ZWEI EXPLIZITE ZWEIGE AM PARAMETER, EIN RUMPF. Der Rumpf `body` ist EIN String und
// traegt alle drei Pruefungen (Guard, Existenz, Einwilligung) samt Senden; beide Zweige
// haengen ihn nur in eine andere Huelle:
// - AUS: die sofort ausgefuehrte Funktion wie bisher. Der Text ist BYTE-GLEICH zu vor
//   der Scheibe; gehalten von einem Test gegen einen VOR dem Bau erhobenen Vergleichswert
//   und von T1 in tracking/consent-setter.test.ts.
// - AN: dieselbe Funktion als window.__psPageView, sofort einmal gerufen. write() im
//   Wiederherstellungs-Block ruft sie nach einer Zustimmung erneut; Guard und
//   Einwilligung greifen dann genauso wie beim Laden — kein Doppel, nur bei analytics.
// DER ZWEIG LIEST DEN PARAMETER UND SONST NICHTS. Bei AUS gibt es keinen Consent-Block,
// also kein write() und keinen Aufrufer — die Funktion haette dort niemanden.
// PFLICHT-PARAMETER OHNE VORGABEWERT, aus demselben Grund wie bei
// injectPageViewEmitter. Achtung: Vitest prueft keine Typen — ein vergessenes Argument
// faellt dort als undefined still in den AUS-Zweig; allein tsc meldet es.
export function buildPageViewScript(
  trackingKey: string,
  consentGateOn: boolean
): string {
  const body = `  if (window.__ps_pv) return;
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
`;
  if (!consentGateOn) {
    return `<script id="${SCRIPT_ID}">
(function(){
${body}})();
</script>`;
  }
  return `<script id="${SCRIPT_ID}">
window.${PAGEVIEW_SEND_API} = function(){
${body}};
${PAGEVIEW_SEND_API}();
</script>`;
}

// Injiziert den Emitter ins fertige HTML. REINE String-Op: letztes </body>
// case-insensitiv per lastIndexOf auf dem Lowercase-Klon (laengengleich -> Index passt
// 1:1 aufs Original), Script davor einfuegen; fehlt </body>, ans Ende anhaengen (ein
// Script am Dokumentende feuert trotzdem). KEIN Regex, KEIN Parser.
export function injectPageViewEmitter(
  html: string,
  trackingKey: string,
  // DER EINWILLIGUNGS-SCHALTER DES PROJEKTS (Phase 11.5, Scheibe 11.5a).
  //
  // PFLICHT-PARAMETER OHNE VORGABEWERT, UND DAS IST ABSICHT: Ein `= false` liesse
  // jeden kuenftigen Aufrufer den Schalter stillschweigend uebergehen — der Setzer
  // fehlte dann auf einem neuen Auslieferungsweg, ohne dass irgendwo etwas rot wird.
  // So muss jede Aufrufstelle entscheiden, und der Compiler fragt.
  consentGateOn: boolean
): string {
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
  // DER ABLEHNUNGS-SETZER (Phase 11.5, Scheibe 11.5a) — EIN EXPLIZITER ZWEIG AM
  // SCHALTER, KEIN NEBENEFFEKT EINER LEERE.
  //
  // DIE BEDINGUNG LIEST DEN SCHALTER UND SONST NICHTS. Sie fragt NICHT, ob die
  // Schluesselmenge leer ist, und auch nicht, ob ein Ziel konfiguriert ist. GRUND:
  // Ein Schutz, der nur NEBENEFFEKT einer anderen Bedingung ist, verschwindet STILL,
  // sobald jene sich aendert — der Kill-Switch dieses Projekts waere beim Entkoppeln
  // genau so fail-open geworden. Wer hier je auf die Leere der Menge prueft, baut
  // dieselbe Falle: ALL_CONSENT_KEYS ist nie leer, die Bedingung waere also immer
  // wahr, und der Schalter haette aufgehoert zu wirken, ohne dass etwas rot wird.
  //
  // BEI AUS ENTSTEHT DER SETZER GAR NICHT, und damit ist der ausgelieferte Text
  // byte-gleich zu dem vor dieser Scheibe. Das ist die tragende Invariante der
  // Scheibe und wird von einem Test gegen einen VOR dem Bau erzeugten Vergleichswert
  // gehalten, nicht von diesem Kommentar.
  const setter = consentGateOn ? buildConsentDenyScript() : "";
  // DIE WIEDERHERSTELLUNG (Phase 11.5, Scheibe 11.5b) — derselbe explizite Zweig am
  // Schalter wie beim Setzer, aus demselben Grund. Bei AUS entsteht sie nicht.
  const restore = consentGateOn ? buildConsentRestoreScript() : "";
  // DIE EINWILLIGUNGS-LEISTE (Phase 11.5, Scheibe 11.5d) — derselbe explizite Zweig am
  // Schalter. Bei AUS entsteht sie nicht, und der Text bleibt byte-gleich (T1).
  // DIE AEQUIVALENZ IST BEKANNT UND WIRD HIER BENANNT, NICHT VERSTECKT: `consentGateOn`
  // und `restore !== ""` sind fuer JEDE Eingabe gleichbedeutend, und KEIN TEST TRENNT
  // SIE. Getragen wird die Unterscheidung allein von DIESER Zeile und diesem
  // Kommentar: Ein Zweig an der Leere eines anderen Bausteins ist genau der
  // Nebeneffekt, gegen den Setzer und Wiederherstellung explizit am Schalter
  // abzweigen. Wer die Zeile "vereinfacht", merkt es an keinem roten Test.
  // Der Parameter bleibt ein Wahrheitswert: Welche Oberflaeche ausgeliefert wird,
  // entscheidet publishProject ueber getConsentDialog; heute ist AN gleich LEISTE.
  // Mit dem Modal (Scheibe 11.5d-2) aendert sich das: Die never-Pruefung in
  // publishProject macht den neuen Wert dort zum Compiler-Fehler, und wer ihn
  // behandelt, muss entscheiden, was dieser Parameter dann traegt. DIESE Zeile selbst
  // meldet der Compiler NICHT.
  const bar = consentGateOn ? buildConsentBarScript() : "";
  // EINE KONKATENATION, EINE EINFUEGESTELLE — und daran haengt die REIHENFOLGE im
  // Dokument: Gate, dann Wiederherstellung, dann Leiste, dann Setzer, dann der
  // PageView-Emitter. Die Wiederherstellung MUSS vor dem Setzer stehen, sonst schreibt
  // er "abgelehnt", bevor eine gespeicherte Entscheidung den Hook belegen kann. Die
  // Leiste MUSS zwischen beiden stehen: Nur dort trennt EINE Pruefung auf den Hook die
  // Faelle, in denen sie nicht erscheinen darf — hinter dem Setzer ist der Hook immer
  // belegt. Der Setzer MUSS vor dem Emitter stehen, sonst feuert der erste
  // Seitenaufruf, bevor ein Urteil da ist.
  // EINE ZWEITE EINFUEGESTELLE WAERE DER BRUCH: Dann entschiede die Aufrufreihenfolge
  // zweier Funktionen ueber die Dokumentordnung, und nichts wuerde rot, wenn sie sich
  // dreht. Die Ordnung ist hier eine Eigenschaft des AUSDRUCKS, keine Zusicherung
  // ueber Aufrufe.
  // DER SETZER BRAUCHT DAS GATE NICHT VOR SICH — er ruft __psConsent nicht auf, er
  // weist nur zu. Er steht trotzdem dahinter, weil die Bausteine so in der
  // Reihenfolge ihrer Abhaengigkeit lesbar bleiben.
  // DER PAGEVIEW-ERZEUGER BEKOMMT DEN SCHALTER SELBST (Scheibe 11.5c) — nicht
  // `restore !== ""`, obwohl beides heute wertgleich ist: Ein Zweig, der an der Leere
  // eines anderen Bausteins haengt, ist genau der Nebeneffekt, gegen den Setzer und
  // Wiederherstellung oben explizit am Schalter abzweigen.
  const script =
    gate + restore + bar + setter + buildPageViewScript(trackingKey, consentGateOn);
  const idx = html.toLowerCase().lastIndexOf("</body>");
  if (idx === -1) return html + script;
  return html.slice(0, idx) + script + html.slice(idx);
}
