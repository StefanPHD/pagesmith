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
// eventID pro Fire (crypto.randomUUID + Fallback) -> in 1b funktional ein No-op, aber
// die Dedup-NAHT fuer Scheibe 2 (CAPI): Browser- und Server-Event teilen dieselbe ID.
//
// PIXEL_ID sicher eingebettet via JSON.stringify (kein Injection-Vektor).
export function buildMetaRuntime(pixelId: string): string {
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
    else fbq("track", cfg.event, params, { eventID: eid });
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
