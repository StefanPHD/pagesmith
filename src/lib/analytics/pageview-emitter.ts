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
export function buildPageViewScript(trackingKey: string): string {
  return `<script id="${SCRIPT_ID}">
(function(){
  if (window.__ps_pv) return;
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
  const script = buildPageViewScript(trackingKey);
  const idx = html.toLowerCase().lastIndexOf("</body>");
  if (idx === -1) return html + script;
  return html.slice(0, idx) + script + html.slice(idx);
}
