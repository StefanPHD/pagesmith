// Meta-Pixel: ISOLIERTE Einheit (Phase 6 Scheibe 1b). Owner-Direktive Omnichannel:
// die Meta-Feuer-/Injektions-Logik lebt hier gekapselt, damit Plattform #2 (Google/
// TikTok/…) als PARALLELE Einheit dazukommt, ohne diese anzufassen — KEINE generische
// Registry, solange nur Meta existiert.
//
// Erzeugt den Laufzeit-JS-Text, der ins Wiring-Script (generate.ts) gesplicet wird.
// Reiner String-Bau, kein DOM, kein React.

import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";
import { META_CONSENT_TARGET } from "@/lib/tracking/consent";
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";

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

// Laufzeit-Runtime fuer das Wiring. Definiert lazy Init + Fire. Wird NUR
// gesplicet, wenn eine Pixel-ID gesetzt ist (sonst kein Snippet, kein fbq im Output).
//
// CONSENT-CHOKEPOINT (Verschaerfung): die Einwilligungs-Pruefung gated ALLES, was
// Meta beruehrt — den SCRIPT-LOAD (fbevents.js), fbq('init') UND jedes Event. Schon
// der Script-Load leakt IP/Referer an Meta -> er liegt deshalb INNERHALB
// __psMetaInit, hinter der Pruefung, lazy beim ERSTEN consented Fire.
// PHASE 11, ZWEITE SCHEIBE: Das URTEIL lebt nicht mehr hier, sondern im geteilten
// Gate (tracking/consent.ts, window.__psConsent). Die zwei PRUEFSTELLEN bleiben, wo
// sie waren — sie fragen jetzt fuer den Ziel-Schluessel META_CONSENT_TARGET. Der
// Gate-Block wird von derselben Injektion erzeugt wie dieser Text und steht VOR ihm.
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
// __psMetaFire hinter DEMSELBEN Consent-Gate wie fbq, mit der geteilten eid. Nur
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

  // --- PHASE 11, ACHTE SCHEIBE: DER BEACON HAENGT NICHT MEHR AN DER PIXEL-ID ---
  //
  // Bis hierher entschied der AUFRUFER (generate.ts), ob diese Funktion ueberhaupt
  // gerufen wird — und zwar an der Pixel-ID. Der Beacon-Rumpf wird aber IN
  // __psMetaFire hineingesplicet, existierte also nur mit Pixel. Ein Projekt, das
  // server-seitig messen wollte, ohne Meta zu benutzen, sendete NICHTS.
  //
  // JETZT ENTSCHEIDET DIESE FUNKTION SELBST, und die Bedingung ist "gibt es hier
  // ueberhaupt etwas zu tun": ein Pixel ODER ein Beacon-Rumpf. Ohne beides bleibt
  // der Text LEER wie zuvor — eine Seite ohne jede Tracking-Konfiguration bekommt
  // keine Laufzeit und damit auch KEINE zusaetzliche Einwilligungs-Frage.
  const hasPixel = pixelId !== "";
  if (!hasPixel && !beaconStmt) return "";

  // DIE VIER BAU-ZEIT-GEGATETEN BLOECKE. Sie sind so geschnitten, dass ihre
  // Aneinanderreihung MIT gesetzter Pixel-ID den frueheren Text BYTE-GLEICH
  // ergibt — das ist der Beweis fuer Invariante 1 ("mit Meta-Pixel aendert sich
  // nichts") und der Grund fuer die auf den ersten Blick eigenartigen
  // Schnittkanten (fuehrende Zeilenumbrueche im Block statt im Rahmen).
  //
  // WAS PIXEL-GEBUNDEN BLEIBT und warum es NICHT mitwandert:
  // - der fbevents-Bootstrap und fbq — sie SIND Meta;
  // - die gesamte BESTAETIGUNGS-Maschinerie (Ladezustand, Warteschlange, Deckel,
  //   __psConfirmSend, __psPixelResolve, __psConfirm). Sie misst Adblocking ueber
  //   METAS Script-Load; ohne Meta gibt es nichts zu messen. Das ist eine
  //   ENTSCHEIDUNG der achten Scheibe, keine Auslassung — die Verlustrate bleibt
  //   Meta-gebunden.
  const pixelPrelude = hasPixel
    ? `
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
  function __psMetaInit() {
    if (__psFbReady) return true;
    // EXISTENZPRUEFUNG, KEIN ZWEITES URTEIL — und der Kommentar steht hier, damit
    // sie spaeter nicht als Regel-Dublette "aufgeraeumt" wird: Geprueft wird, OB
    // ein Urteil da ist, NICHT wie es ausfaellt. Die Regel bleibt an genau einer
    // Stelle (tracking/consent.ts).
    // WARUM UEBERHAUPT: Seit die Auswertung ein eigener Block ist, ist ihr Aufruf
    // eine BLOCKUEBERGREIFENDE Referenz. Ein direkter Aufruf wuerfe, wenn sie fehlt
    // — mitten im Klick-Handler, der danach noch den REDIRECT ausfuehren muss. Ein
    // Tracking-Fehler toetete so die Kernfunktion der Kundenseite. Die strukturelle
    // Garantie (der Block wird immer vor den Konsumenten erzeugt) bleibt richtig;
    // sie ist nur nicht die einzige Verteidigung, die diese Folge verdient.
    // FAIL-CLOSED aus demselben Grund wie die Regel selbst: Fehlt das Urteil, ist
    // NICHT bekannt, ob eingewilligt wurde.
    if (typeof __psConsent !== "function") return false;
    if (!__psConsent(${JSON.stringify(META_CONSENT_TARGET)})) return false;
    // Script-Load liegt HINTER der Consent-Pruefung (Verschaerfung): vor Consent kein Request
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
  }`
    : "";

  // Der lazy Bootstrap-Aufruf. Er gehoert zum Pixel, NICHT zum Beacon — ohne Pixel
  // gibt es kein __psMetaInit, und ein Aufruf liefe ins Leere.
  const initCallStmt = hasPixel ? `
    if (!__psMetaInit()) return;` : "";

  // Die fbq-Zeilen samt ihrer Parameter. `params` wird AUSSCHLIESSLICH von ihnen
  // gelesen und wandert deshalb mit ihnen — ein leeres params-Objekt ohne fbq waere
  // toter Code im Klick-Pfad.
  const fbqStmt = hasPixel ? `
    var params = {};
    if (typeof cfg.value === "number") params.value = cfg.value;
    if (cfg.currency) params.currency = cfg.currency;
    if (cfg.isCustom) fbq("trackCustom", cfg.event, params, { eventID: eid });
    else fbq("track", cfg.event, params, { eventID: eid });` : "";

  // DIE KENNUNG ENTSTEHT UNVERAENDERT IN __psMetaFire — GENAU EINMAL, FUER ALLE
  // DREI VERBRAUCHER. Sie bleibt eine LOKALE Variable dieser Funktion, auch
  // nachdem der Beacon sich von der Pixel-ID geloest hat, und das ist der Grund,
  // warum der Beacon-Rumpf NICHT herausgezogen wurde, sondern nur seine
  // Vorbedingung entfiel: fbq, der Beacon und die Bestaetigung lesen DIESELBE
  // Variable. Zwei Erzeugungsstellen braechen Metas Deduplizierung UND den
  // Verlustraten-Join — lautlos, weil beide Werte fuer sich gueltig aussehen.
  // DIESER KOMMENTAR STEHT IN DER QUELLE UND NICHT IM ERZEUGTEN TEXT: Der
  // erzeugte Text muss mit gesetzter Pixel-ID BYTE-GLEICH bleiben, und jede
  // zusaetzliche Zeile darin braeche genau den Beweis, den Invariante 1 braucht.
  //
  // Der Bestaetigungs-Aufruf bleibt an der Pixel-ID, weil die Maschinerie
  // dahinter es tut (s. oben).
  const confirmCallStmt = hasPixel ? `
    // Scheibe A: dieselbe lokale eid wie fbq/Beacon (KEIN zweiter Generator -> der
    // Verlustraten-Join ueber event_id traegt). Liegt hinter demselben Consent-Gate.
    __psConfirm(eid, cfg.event);` : "";

  return `${pixelPrelude}
  function __psMetaFire(cfg) {
    if (!cfg || !cfg.event) return;
    // EXISTENZPRUEFUNG, KEIN ZWEITES URTEIL — s. die Begruendung in __psMetaInit.
    // Diese Stelle ist die teurere von beiden: Sie liegt im Klick-Handler, und
    // hinter ihr wartet der Redirect.
    if (typeof __psConsent !== "function") return;
    // DAS URTEIL WIRD GEHOBEN, NICHT ZWEIMAL ERFRAGT (Phase 11, fuenfte Scheibe).
    // Der Beacon-Rumpf weiter unten schickt es an den Server mit; er fragt NICHT
    // erneut. Zwei Gruende, und der zweite ist der tragende:
    // (1) KEIN ZUSAETZLICHER HOOK-AUFRUF. Der Betreiber-Hook ist fremder Code auf
    //     dem Klick-Pfad; die Zahl der Aufrufe bleibt exakt wie vorher.
    // (2) EIN SCHNAPPSCHUSS. Das Urteil wird nirgends gemerkt — jede Frage ruft den
    //     Hook neu. Ein zweiter Aufruf koennte anders antworten, und dann traege der
    //     Draht eine Aussage, die der Entscheidung WIDERSPRICHT, die diesen Beacon
    //     ueberhaupt durchgelassen hat. So ist die Widerspruchsfreiheit strukturell.
    var __c = __psConsent(${JSON.stringify(META_CONSENT_TARGET)});
    if (!__c) return;${initCallStmt}
    var eid =
      window.crypto && window.crypto.randomUUID
        ? window.crypto.randomUUID()
        : "e" + Date.now() + "-" + Math.random().toString(16).slice(2);${fbqStmt}${beaconStmt}${confirmCallStmt}
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
//
// DAS EINWILLIGUNGS-SIGNAL (Phase 11, fuenfte Scheibe): Der Body traegt zusaetzlich
// CONSENT_WIRE_FIELD mit dem Urteil JE ZIEL — heute genau eines. Der Wert ist die in
// __psMetaFire GEHOBENE Variable __c, nicht ein zweiter Hook-Aufruf; `=== true`
// spiegelt die Strenge der Auswertungsregel.
// DASS ER HEUTE IMMER `true` IST, IST KEINE NACHLAESSIGKEIT, SONDERN EINE FOLGE DER
// POSITION — und der Satz gehoert hierher, sonst haelt ihn jemand fuer toten Code und
// entfernt ihn: Dieser Rumpf wird INNERHALB von __psMetaFire gesplicet, hinter dem
// Gate. Ein Beacon existiert also nur im erlaubten Fall. Sobald ein ZWEITES Ziel
// dazukommt, kann derselbe Beacon fuer das eine erlaubt und fuer das andere verboten
// sein — dann traegt dieses Feld erstmals eine Unterscheidung.
// DER LESER (capi/ingest.ts) BRAUCHT ES SCHON HEUTE: Ohne das Feld kann er
// "abwesend = alte Seite" nicht von "vorhanden, aber verboten" trennen.
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
          isCustom: !!cfg.isCustom,
          ${JSON.stringify(CONSENT_WIRE_FIELD)}: { ${JSON.stringify(META_CONSENT_TARGET)}: __c === true }
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

// Die Anweisung im Track-Zweig des Wiring-Handlers.
//
// ZWEI UNABHAENGIGE FRAGEN, DESHALB ZWEI PARAMETER (Phase 11, achte Scheibe) — und
// die Trennung ist der ganze Punkt dieser Scheibe: Bis hierher entschied EINE Frage
// (die Pixel-ID) beides, weil beides zusammenfiel.
// - hasRuntime: EXISTIERT __psMetaFire ueberhaupt? Nur dann darf es gerufen werden;
//   sonst wuerfe der Klick-Handler auf einer Seite ohne jede Tracking-Konfiguration.
//   Seit dieser Scheibe entsteht die Laufzeit auch OHNE Pixel — naemlich dann, wenn
//   es einen Beacon zu senden gibt.
// - hasPixel: soll die Meta-WARNUNG mit? Sie bleibt eine wahre Aussage ("Meta-Pixel
//   nicht konfiguriert") und wird deshalb NICHT gestrichen. Sie ist ab jetzt aber
//   kein "no-op"-Hinweis mehr: der Klick sendet trotzdem, nur eben nicht an Meta.
//   DASS SIE BLEIBT, IST EINE ENTSCHEIDUNG: Sie zu entfernen waere eine zweite
//   Wirkung in dieser Scheibe und wuerde eine bestehende Zusage umschreiben, die
//   mit dem Zweck hier nichts zu tun hat.
export function metaTrackStatement(
  hasRuntime: boolean,
  hasPixel: boolean
): string {
  const warn = hasPixel
    ? ""
    : 'console.warn("[pagesmith] Meta-Pixel nicht konfiguriert: " + ((a.config && a.config.event) || ""));';
  if (!hasRuntime) return warn;
  return warn ? `${warn}
            __psMetaFire(a.config);` : "__psMetaFire(a.config);";
}
