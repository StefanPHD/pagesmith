// Meta-Pixel: ISOLIERTE Einheit (Phase 6 Scheibe 1b). Owner-Direktive Omnichannel:
// die Meta-Feuer-/Injektions-Logik lebt hier gekapselt, damit Plattform #2 (Google/
// TikTok/…) als PARALLELE Einheit dazukommt, ohne diese anzufassen — KEINE generische
// Registry, solange nur Meta existiert.
//
// Erzeugt den Laufzeit-JS-Text, der ins Wiring-Script (generate.ts) gesplicet wird.
// Reiner String-Bau, kein DOM, kein React.

import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";

// Standard-Events von Meta (Pixel). "Custom…" ist KEIN Standard-Event, sondern der
// Schalter auf fbq('trackCustom', <freier Name>) — siehe ActionPanel.
export const META_STANDARD_EVENTS = [
  "Purchase",
  "Lead",
  "InitiateCheckout",
  "AddToCart",
  "ViewContent",
  "CompleteRegistration",
  "Contact",
  "Subscribe",
] as const;

// Wert-tragende Events: NUR hier blendet das Panel value/currency ein. Custom-Events
// duerfen ZUSAETZLICH einen Wert tragen (entscheidet das Panel, nicht diese Liste) —
// "ultimative Freiheit". Lead ist BEWUSST NICHT wert-tragend (diskriminierender Test).
export const META_VALUE_EVENTS: ReadonlySet<string> = new Set([
  "Purchase",
  "InitiateCheckout",
  "AddToCart",
  "Subscribe",
]);

// Laufzeit-Runtime fuer das Wiring. Definiert psConsent + lazy Init + Fire. Wird NUR
// gesplicet, wenn eine Pixel-ID gesetzt ist (sonst kein Snippet, kein fbq im Output).
//
// CONSENT-CHOKEPOINT (Verschaerfung): psConsent() gated ALLES, was Meta beruehrt —
// den SCRIPT-LOAD (fbevents.js), fbq('init') UND jedes Event. Schon der Script-Load
// leakt IP/Referer an Meta -> er liegt deshalb INNERHALB __psMetaInit, hinter
// psConsent(), lazy beim ERSTEN consented Fire. 1b-Default permissiv (true); Scheibe 3
// verdrahtet echtes Consent ueber window.pagesmithConsent und flippt den Default.
//
// KEIN Auto-PageView: fbq('init', …) wird OHNE folgendes fbq('track','PageView')
// aufgerufen -> 1b ist strikt on-click. Page-Load-Events sind eine spaetere Scheibe.
//
// eventID pro Fire (crypto.randomUUID + Fallback) -> in 1b die Dedup-NAHT, in 2b-ii
// scharf geschaltet: Browser-Pixel (fbq) UND Server-CAPI (sendBeacon) teilen DIESELBE
// eid -> Meta faltet beide zu EINEM Event. Die eid wird GENAU EINMAL erzeugt und an
// beide Konsumenten gereicht (kein zweiter Generator -> kein Dedup-Bruch).
//
// CAPI-BEACON (Scheibe 2b-ii): navigator.sendBeacon an den Pagesmith-Proxy, INNERHALB
// __psMetaFire hinter DEMSELBEN psConsent()-Gate wie fbq, mit der geteilten eid. Nur
// gebaut, wenn ein trackingKey vorliegt (Vorbedingung wie die Pixel-ID beim Browser-
// Event, mit dem der Beacon dedupliziert). Siehe buildCapiBeaconStatement.
//
// PIXEL_ID sicher eingebettet via JSON.stringify (kein Injection-Vektor).
export function buildMetaRuntime(
  pixelId: string,
  capiTrackingKey = "",
  capiProxyUrl = ""
): string {
  // Der Beacon-Block wird ZUR BAU-ZEIT gegated (drei Faelle) und in __psMetaFire
  // nach den fbq-Zeilen gesplicet -> teilt dort die lokale eid.
  const beaconStmt = buildCapiBeaconStatement(capiTrackingKey, capiProxyUrl);
  // Scheibe A: der SENDE-Rumpf der Pixel-Bestaetigung, ebenfalls bau-zeit-gegated.
  // Das Zustands-Geruest drumherum (State/Queue/Resolve) wird IMMER gebaut — EIN
  // Bootstrap-Pfad statt zweier Varianten (eine bau-zeit-Verzweigung IM Bootstrap waere
  // genau die Divergenz-Falle auf dem gerade reparierten CAPI-Pfad).
  const confirmSendStmt = buildPixelConfirmStatement(capiTrackingKey, capiProxyUrl);
  return `
  var PS_PIXEL_ID = ${JSON.stringify(pixelId)};
  var __psFbReady = false;
  // --- ADBLOCKER-BESTAETIGUNG (Scheibe A) ---------------------------------------
  // Der Ladestatus ist eine PRO-SEITE-Tatsache, die Bestaetigung aber PRO CONVERSION.
  // Da fbevents LAZY beim ersten consented Fire geladen wird, ist die ERSTE Conversion
  // fast immer 'pending' -> ohne Nachreichen zeigte die Rate dauerhaft ~100% Verlust.
  // Deshalb: puffern und beim Aufloesen flushen.
  var __psPixelState = "pending";
  var __psConfirmQueue = [];
  var __PS_CONFIRM_CAP = 20;
  function __psConfirmSend(eid, ev) {${confirmSendStmt}
  }
  // Einmalig: der erste Ausgang gewinnt. 'ok' -> Puffer nachreichen; 'blocked'/'foreign'
  // -> verwerfen (keine Bestaetigung = dieses Event haette Meta nie erreicht).
  function __psPixelResolve(s) {
    if (__psPixelState !== "pending") return;
    __psPixelState = s;
    if (s === "ok") {
      for (var i = 0; i < __psConfirmQueue.length; i++) {
        __psConfirmSend(__psConfirmQueue[i].id, __psConfirmQueue[i].ev);
      }
    }
    __psConfirmQueue.length = 0;
  }
  function __psConfirm(eid, ev) {
    if (__psPixelState === "ok") return __psConfirmSend(eid, ev);
    if (__psPixelState !== "pending") return;
    // Cap gegen unbegrenztes Puffern; Ueberlauf verfaellt (verfaelscht nach OBEN,
    // nie nach unten — ein echter Blocker wird dadurch nie versteckt).
    if (__psConfirmQueue.length >= __PS_CONFIRM_CAP) return;
    __psConfirmQueue.push({ id: eid, ev: ev });
  }
  function psConsent() {
    try {
      return typeof window.pagesmithConsent === "function"
        ? !!window.pagesmithConsent()
        : true;
    } catch (e) {
      return false;
    }
  }
  function __psMetaInit() {
    if (__psFbReady) return true;
    if (!psConsent()) return false;
    // Script-Load liegt HINTER psConsent (Verschaerfung): vor Consent kein Request
    // an connect.facebook.net. Standard-fbevents-Bootstrap OHNE Auto-PageView.
    !(function (f, b, e, v, n, t, s) {
      // FOREIGN (Scheibe A, die EINZIGE editierte Bestandszeile): traegt die importierte
      // Seite schon ein eigenes Meta-Snippet, bricht dieser Bootstrap ab -> wir erzeugen
      // KEIN script-Element -> unsere load/error-Handler haengen nirgends. Ohne diesen
      // Zweig bliebe der Zustand ewig 'pending' und JEDE Conversion gaelte als Verlust.
      // Blind bestaetigen ist VERWORFEN: auch das Fremd-Snippet legt synchron einen Stub
      // an, der Frueh-Ausstieg greift also MIT und OHNE Blocker — blind bestaetigen
      // wuerde einen echten Blocker verstecken. Lieber uninformativ als irrefuehrend.
      if (f.fbq) {
        __psPixelResolve("foreign");
        console.warn(
          "[pagesmith] Fremdes Meta-Pixel erkannt: Adblocker-Messung fuer diese Seite inaktiv."
        );
        return;
      }
      n = f.fbq = function () {
        n.callMethod
          ? n.callMethod.apply(n, arguments)
          : n.queue.push(arguments);
      };
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = !0;
      n.version = "2.0";
      n.queue = [];
      t = b.createElement(e);
      t.async = !0;
      t.src = v;
      // Scheibe A: DOM-Ebene statt Meta-Interna (window.fbq ist als Check wertlos — der
      // Stub oben steht auch bei geblocktem Script). Die Handler MUESSEN vor insertBefore
      // haengen, sonst verpasst ein schneller Load das load-Event.
      t.onload = function () {
        __psPixelResolve("ok");
      };
      t.onerror = function () {
        __psPixelResolve("blocked");
      };
      s = b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t, s);
    })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
    fbq("init", PS_PIXEL_ID);
    __psFbReady = true;
    return true;
  }
  function __psMetaFire(cfg) {
    if (!cfg || !cfg.event) return;
    if (!psConsent()) return;
    if (!__psMetaInit()) return;
    var eid =
      window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : "e" + Date.now() + "-" + Math.random().toString(16).slice(2);
    var params = {};
    if (typeof cfg.value === "number") params.value = cfg.value;
    if (cfg.currency) params.currency = cfg.currency;
    if (cfg.isCustom) fbq("trackCustom", cfg.event, params, { eventID: eid });
    else fbq("track", cfg.event, params, { eventID: eid });${beaconStmt}
    // Scheibe A: dieselbe lokale eid wie fbq/Beacon (KEIN zweiter Generator -> der
    // Verlustraten-Join ueber event_id traegt). Liegt hinter demselben psConsent-Gate.
    __psConfirm(eid, cfg.event);
  }`;
}

// Der CAPI-Beacon-Statement-Bau (Scheibe 2b-ii), analog zu metaTrackStatement: EINE
// Build-Zeit-Verzweigung, kein Laufzeit-Zweig fuer den Konfig-Zustand. Drei Faelle:
// - kein trackingKey -> "" (CAPI fuer dieses Projekt nicht konfiguriert; STILL, wie
//   "keine Pixel-ID": kein Beacon, keine Warnung).
// - trackingKey gesetzt, aber proxyUrl leer (NEXT_PUBLIC_APP_URL fehlt/leer) ->
//   FAIL-LOUD console.warn, KEIN Beacon, KEIN relativer Fallback (der in Dev gruen
//   waere und erst beim echten Marketer auf fremder Domain bricht).
// - beide gesetzt -> sendBeacon neben fbq mit der GETEILTEN eid.
//
// Der Beacon-Body ist ein text/plain-Blob: application/json wuerde den simplen Beacon
// preflight-pflichtig machen, den sendBeacon (fire-and-forget) nicht bedienen kann ->
// stiller Ausfall. text/plain ist die tragende Kontrolle (deckt sich mit der
// 2b-i-Route-Leitplanke). trackingKey/proxyUrl als JSON-Literale (kein Injektions-
// Vektor). _fbp best-effort aus dem Cookie; fehlt es (lazy init im selben Klick) ->
// weglassen, NICHT verzoegern (die eid traegt das Dedup, _fbp ist Match-Quality-Bonus).
// try/catch: der Beacon darf den Klick nie werfen. sendBeacon ist navigationssicher
// -> feuert im Track-vor-Redirect-Block VOR der Weiterleitung, ohne sie zu verzoegern.
export function buildCapiBeaconStatement(
  trackingKey: string,
  proxyUrl: string
): string {
  if (!trackingKey) return "";
  if (!proxyUrl) {
    return `
    console.warn("[pagesmith] CAPI-Beacon deaktiviert: NEXT_PUBLIC_APP_URL nicht gesetzt.");`;
  }
  return `
    try {
      if (navigator && navigator.sendBeacon) {
        var __fbp = (document.cookie.match(/(?:^|; )_fbp=([^;]*)/) || [])[1] || "";
        var __b = {
          trackingKey: ${JSON.stringify(trackingKey)},
          eventID: eid,
          event: cfg.event,
          eventSourceUrl: location.href,
          isCustom: !!cfg.isCustom
        };
        if (typeof cfg.value === "number") __b.value = cfg.value;
        if (cfg.currency) __b.currency = cfg.currency;
        if (__fbp) __b._fbp = __fbp;
        navigator.sendBeacon(${JSON.stringify(proxyUrl)}, new Blob([JSON.stringify(__b)], { type: "text/plain" }));
      }
    } catch (e) {}`;
}

// Der SENDE-Rumpf der Pixel-Bestaetigung (Scheibe A) — der Koerper von __psConfirmSend.
//
// GLEICHE Bau-Zeit-Vorbedingungen wie der CAPI-Beacon, weil es derselbe Kanal ist:
// - kein trackingKey -> "" (STILL; ohne Key ist der Beacon serverseitig nicht aufloesbar).
// - kein proxyUrl -> "" OHNE zweiten Warn: buildCapiBeaconStatement warnt fuer genau diese
//   Konstellation bereits fail-loud. Zwei Warns fuer EINE Ursache waeren Laerm.
// - beide gesetzt -> senden.
//
// Der Marker reist in einem EIGENEN Feld `obs`; `event` traegt weiter den ECHTEN
// Conversion-Namen (die Bestaetigung bestaetigt GENAU dieses Event). Der Server mappt obs
// auf source='browser' — der Client sendet NIE den source-Wert selbst.
//
// BARE Payload: kein value/currency/_fbp/eventSourceUrl. Die Bestaetigung wird NIE an Meta
// geforwardet, diese Felder waeren tote Bytes im /api/e-Hotspot.
//
// Zustellung wie im PageView-Emitter: sendBeacon mit text/plain-Blob (preflight-frei),
// Fallback fetch mit keepalive:true — PFLICHT, weil Conversions oft mit Redirect/Submit
// zusammenfallen und der Browser den Request sonst beim Seitenwechsel abbricht.
export function buildPixelConfirmStatement(
  trackingKey: string,
  proxyUrl: string
): string {
  if (!trackingKey || !proxyUrl) return "";
  return `
    var __cb = JSON.stringify({
      trackingKey: ${JSON.stringify(trackingKey)},
      eventID: eid,
      event: ev,
      obs: ${JSON.stringify(BROWSER_CONFIRM_MARKER)}
    });
    try {
      var __co = navigator.sendBeacon &&
        navigator.sendBeacon(${JSON.stringify(proxyUrl)}, new Blob([__cb], { type: "text/plain" }));
      if (!__co) fetch(${JSON.stringify(proxyUrl)}, { method: "POST", keepalive: true, body: __cb });
    } catch (e) {
      try {
        fetch(${JSON.stringify(proxyUrl)}, { method: "POST", keepalive: true, body: __cb });
      } catch (e2) {}
    }`;
}

// Die Anweisung im Track-Zweig des Wiring-Handlers, je nach Pixel-Konfiguration:
// - Pixel gesetzt -> echtes Meta-Fire (navigationssicher via fbevents/sendBeacon).
// - keine Pixel-ID -> no-op mit console.warn (kein fbq, kein Snippet im Output).
export function metaTrackStatement(hasPixel: boolean): string {
  return hasPixel
    ? "__psMetaFire(a.config);"
    : 'console.warn("[pagesmith] Meta-Pixel nicht konfiguriert: " + ((a.config && a.config.event) || ""));';
}
