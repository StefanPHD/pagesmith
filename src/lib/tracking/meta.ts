// Meta-Pixel: ISOLIERTE Einheit (Phase 6 Scheibe 1b). Owner-Direktive Omnichannel:
// die Meta-Feuer-/Injektions-Logik lebt hier gekapselt, damit Plattform #2 (Google/
// TikTok/…) als PARALLELE Einheit dazukommt, ohne diese anzufassen — KEINE generische
// Registry, solange nur Meta existiert.
//
// Erzeugt den Laufzeit-JS-Text, der ins Wiring-Script (generate.ts) gesplicet wird.
// Reiner String-Bau, kein DOM, kein React.

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
  return `
  var PS_PIXEL_ID = ${JSON.stringify(pixelId)};
  var __psFbReady = false;
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
      if (f.fbq) return;
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

// Die Anweisung im Track-Zweig des Wiring-Handlers, je nach Pixel-Konfiguration:
// - Pixel gesetzt -> echtes Meta-Fire (navigationssicher via fbevents/sendBeacon).
// - keine Pixel-ID -> no-op mit console.warn (kein fbq, kein Snippet im Output).
export function metaTrackStatement(hasPixel: boolean): string {
  return hasPixel
    ? "__psMetaFire(a.config);"
    : 'console.warn("[pagesmith] Meta-Pixel nicht konfiguriert: " + ((a.config && a.config.event) || ""));';
}
