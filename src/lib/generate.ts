// Code-Gen-Engine (Phase 4, Scheibe 1): macht aus der Mapping-SPEZIFIKATION
// echtes VERHALTEN. Reine, unit-testbare Funktion (kein React, kein Server, kein
// Cheerio) — client-seitig via DOMParser, konsistent zur Detection in detect.ts.
//
// Sie verdrahtet die erfassten Aktionen in ein funktionales HTML: ein injiziertes
// Laufzeit-Script haengt EINEN delegierten Click-Handler an document und ordnet
// jeden Klick per data-pagesmith-id einem Element zu (siehe buildWiringScript).
// Bisher haben wir nur die ABSICHT erfasst; hier feuert der Button wirklich.

import type { Mapping } from "./mappings";
import { buildMetaRuntime, metaTrackStatement } from "./tracking/meta";
import { buildConsentRuntimes, CONSENT_SCRIPT_ID } from "./tracking/consent";
import {
  buildCustomPixelRuntime,
  customTrackStatement,
} from "./tracking/custom-pixel";

const PAGESMITH_ID_ATTR = "data-pagesmith-id";

// id des injizierten JSON-Datenblocks; das Wiring-Script liest die Tabelle per
// getElementById genau hier aus.
export const MAPPINGS_SCRIPT_ID = "pagesmith-mappings";

// Vorschau- vs. Export- vs. Editier-Verhalten: dieselbe Wiring-Engine, EINE
// mode-Verzweigung — kein Duplikat-Script.
// - export:  echte Produktionslogik (Redirect-Click-Wiring + href-Bake fuer <a> +
//            auxclick-Track bei Mittelklick + submit-Track fuer <form>; Text wird
//            direkt in den DOM gebacken).
// - preview: funktionale Vorschau (Redirect-Click-Wiring + Containment + Text; der
//            submit-Listener haengt auch hier, doch der Vorschau-Rahmen traegt kein
//            allow-forms; dass dort deshalb kein submit entsteht, ist aus der
//            HTML-Spezifikation ABGELEITET, nicht gemessen — Vermerk P12.5-22 der
//            Phase 12.5, Punkt (3)).
// - edit:    Editieren-iframe (NUR Text-Anzeige; KEIN Click-Wiring — Klicks
//            gehoeren der Selektions-Bruecke, die separat injiziert wird).
export type GenerateMode = "export" | "preview" | "edit";

// Wiring-Script: STATISCH und datengetrieben. Es enthaelt KEINE User-URLs (die
// leben ausschliesslich im JSON-Datenblock, der zur Laufzeit geparst wird) ->
// keine naive String-Konkatenation von URLs in JS, kein Injection-Vektor.
// Capture-Phase + preventDefault neutralisiert zugleich inline onclick des
// Fremdcodes, bevor wir selbst weiterleiten.
//
// mode wird als KONSTANTE ins Script gebacken (eines von zwei Literalen, die WIR
// kontrollieren, via JSON.stringify -> kein Injection-Vektor). Der JSON-Datenblock
// bleibt die reine Mapping-Tabelle, unabhaengig vom Modus.
//
// EXPORT (echte Produktionslogik): kein Mapping -> Default bleibt; Mapping ->
//   openInNewTab ? window.open('_blank') : location.href.
//
// WELCHES ELEMENT EIN KLICK TRIFFT (Phase 12.5, Scheibe 1 — Schatten-Korrektur):
// das innerste markierte Element, das eine Klick-Aktion (track/redirect) traegt.
// Traegt das innerste keine (z.B. ein markiertes <h2> in einem <a> mit Track),
// gilt der Klick dem naechsten markierten Vorfahren mit Aktion — Halt am ersten,
// nie die Aktionen zweier Elemente. text zaehlt nicht als Klick-Aktion. Ein <form>
// beendet die Suche (Entscheidung P12.5-15 der Phase 12.5): weder laeuft sie von
// unten in ein Formular noch aus einem Formular ohne Aktion heraus. Die Editor-Bruecke
// (LISTENER_SCRIPT, detect.ts) waehlt weiter das innerste markierte Element — sie ist
// bewusst NICHT mitgezogen. Click und auxclick nutzen dieselbe Suche (actionOwner).
//
// FORMULARE (Phase 12.5, Scheibe 1b; Entscheidungen P12.5-21 und P12.5-23 der Phase
// 12.5): Ein <form> ist NIE der Eigentuemer eines Klicks — auch nicht bei einem
// direkten Treffer (Klick ins Eingabefeld, auf das Formular selbst). Sein Track zaehlt
// beim ABSCHICKEN (submit-Listener an document, Capture, KEIN preventDefault, einmal
// je Formular und Seitenleben); eine Weiterleitung fuehrt ein Formular nicht mehr aus,
// weder beim Klick noch beim Abschicken. Ein Element IM Formular mit eigener Aktion
// (etwa ein Knopf mit Track) feuert beim Klick weiter seine eigene (P12.5-25).
// PREVIEW (srcDoc-iframe erbt unsere Origin -> Containment noetig): gemappte
//   Weiterleitung oeffnet IMMER escaped einen neuen Tab (openInNewTab ignoriert,
//   NIE location.href, das wuerde das iframe selbst framen); JEDER andere
//   Link-Klick wird stummgeschaltet, damit NIE auf unsere Origin navigiert wird.
//
// TEXT-Override (Phase 5): wirkt in VORSCHAU UND EDITIEREN, EINMALIG beim Laden
// (textContent des Ziel-Elements per ps-id setzen), nicht klick-getrieben — beide
// iframes zeigen so konsistent den Override (wie Liste/Header). textContent ist
// eine sichere Senke (parst NIE HTML) -> der "</script>"-Inhalt landet als
// literaler Text. Im EXPORT laeuft das anders: text-Mappings kommen NICHT in den
// Datenblock, sondern werden DIREKT in den DOM gebacken (Scheibe 2, siehe
// generateFunctional) -> kein Laufzeit-JS noetig, gut fuer SEO, kein FOUC.
//
// CLICK-Wiring (Redirect + Containment) und SUBMIT-Track: Vorschau + Export, NICHT
// Editieren. Im Editieren-iframe gehoeren Klicks ALLEIN der separat injizierten
// Selektions-Bruecke -> generateFunctional("edit") installiert KEINEN eigenen Click-
// oder Submit-Handler.
//
// META (Scheibe 1b): ist eine Pixel-ID gesetzt, wird die isolierte Meta-Runtime
// (buildMetaRuntime) in die IIFE gesplicet und der Track-Zweig feuert echtes fbq
// (__psMetaFire) statt des 1a-console.log-Stubs. Ohne Pixel-ID kein Meta-Snippet
// und der Track-Zweig ist ein console.warn-no-op (metaTrackStatement). Die gesamte
// Meta-Logik lebt in tracking/meta.ts (Naht fuer Plattform #2).
//
// WICHTIG: Darf keinen literalen "</script>"-String enthalten (Serialisierung).
function buildWiringScript(
  mode: GenerateMode,
  metaPixelId: string,
  capiTrackingKey: string,
  capiProxyUrl: string,
  consentTargets: readonly string[],
  // CUSTOM-PIXEL (Phase 11.6, Scheibe 11.6a). ZWEI Angaben, KEIN Vorgabewert — diese
  // Funktion ist nicht exportiert und hat genau einen Aufrufer; ohne Vorgabewert muss
  // jener entscheiden, und der Compiler fragt.
  // customCode ist bereits MODUS-GEGATET (P11.6-6, Teil (d): nur "export"); diese
  // Funktion kennt den Grund nicht und soll ihn nicht kennen.
  customCode: string,
  customHasEventLine: boolean
): string {
  const hasPixel = metaPixelId !== "";
  // PHASE 11, ACHTE SCHEIBE — DIE VORBEDINGUNG IST GEFALLEN.
  //
  // Hier stand: die Laufzeit wird NUR gebaut, wenn ein Pixel gesetzt ist ("dieselbe
  // Vorbedingung wie das Browser-Event, mit dem er dedupliziert"). Der Satz war fuer
  // den DEDUP-Fall richtig und fuer alles andere zu eng: Der Conversion-Beacon ist in
  // __psMetaFire hineingesplicet, also sendete ein Projekt ohne Meta-Pixel NICHTS —
  // keine Conversion, kein Server-Ereignis, keine Statistik.
  //
  // JETZT WIRD IMMER GERUFEN, und buildMetaRuntime entscheidet SELBST, ob etwas
  // entsteht: ein Pixel ODER ein Beacon-Rumpf. Ohne beides liefert sie "" — eine
  // Seite ohne jede Tracking-Konfiguration bleibt damit exakt wie zuvor, inklusive
  // der Zahl der Einwilligungs-Fragestellen.
  // trackingKey/proxyUrl entscheiden weiterhin IN buildMetaRuntime ueber den
  // konkreten Beacon-Zweig (still / fail-loud / feuern).
  const metaRuntime = buildMetaRuntime(
    metaPixelId,
    capiTrackingKey,
    capiProxyUrl,
    consentTargets
  );
  // ZWEI FRAGEN, ZWEI ARGUMENTE: ob __psMetaFire existiert (dann darf es gerufen
  // werden), und ob ein Pixel gesetzt ist (dann entfaellt die Warnung). Seit dieser
  // Scheibe fallen die beiden NICHT mehr zusammen — genau das ist ihr Zweck.
  const trackStmt = metaTrackStatement(metaRuntime !== "", hasPixel);
  // CUSTOM-PIXEL (Scheibe 11.6a). Der Baustein steht VOR dem Meta-Block und ist von ihm
  // vollstaendig unabhaengig: Er entsteht auch ohne Pixel-ID und ohne Tracking-Schluessel
  // (Invariante I4 der Scheibe), und er liegt NICHT in __psMetaFire — also auch nicht
  // hinter dessen Wache 4, die ueber die ZIEL-Schluessel urteilt.
  // OHNE SNIPPET UND OHNE EREIGNISZEILE LIEFERN BEIDE "" — der erzeugte Text ist dann
  // zeichengleich zu dem vor dieser Scheibe (Invariante I5, Test T9).
  const customRuntime = buildCustomPixelRuntime(customCode, customHasEventLine);
  const customStmt = customTrackStatement(customCode !== "", customHasEventLine);
  // DIE ZWEI ANWEISUNGEN DES TRACK-ZWEIGS, ZUSAMMENGEFUEGT. Meta zuerst, Custom danach:
  // Der etablierte Pfad bleibt damit die erste Anweisung, und bei leerem customStmt ist
  // der Ausdruck zeichengleich zu trackStmt.
  const trackAll =
    customStmt === ""
      ? trackStmt
      : trackStmt === ""
        ? customStmt
        : `${trackStmt}
            ${customStmt}`;
  return `(function () {
  var MODE = ${JSON.stringify(mode)};${customRuntime}${metaRuntime}
  var dataEl = document.getElementById("${MAPPINGS_SCRIPT_ID}");
  if (!dataEl) return;
  var table;
  try {
    table = JSON.parse(dataEl.textContent || "[]");
  } catch (e) {
    return;
  }
  // Compound-Key (Scheibe 0): ein Element kann MEHRERE Aktionen tragen (z.B.
  // redirect + track) -> byId haelt ein ARRAY pro id, nicht "letztes gewinnt".
  var byId = {};
  for (var i = 0; i < table.length; i++) {
    var id = table[i].elementId;
    (byId[id] = byId[id] || []).push(table[i]);
  }
  // SCHATTEN-KORREKTUR (Phase 12.5, Scheibe 1): traegt das innerste markierte
  // Element keine Klick-Aktion (track/redirect), gilt der Klick dem naechsten
  // markierten Vorfahren, der eine traegt. Halt am ERSTEN -> hoechstens die
  // Aktionen EINES Elements je Klick. text zaehlt nicht (in der Vorschau steht
  // er in der Tabelle). Ein <form> beendet die Suche: weder wird von unten in
  // ein <form> gelaufen noch aus einem <form> ohne Aktion heraus.
  function hasClickAction(list) {
    if (!list) return false;
    for (var h = 0; h < list.length; h++) {
      if (list[h].type === "track" || list[h].type === "redirect") return true;
    }
    return false;
  }
  function actionOwner(el) {
    while (el && !hasClickAction(byId[el.getAttribute("${PAGESMITH_ID_ATTR}")])) {
      if (el.tagName === "FORM") return null;
      el = el.parentElement ? el.parentElement.closest("[${PAGESMITH_ID_ATTR}]") : null;
      if (el && el.tagName === "FORM") return null;
    }
    return el;
  }
  // Text-Override (Vorschau + Editieren, einmalig beim Laden). Im Export ist kein
  // text-Mapping im Datenblock -> diese Schleife findet nichts.
  if (MODE !== "export") {
    for (var k = 0; k < table.length; k++) {
      var tm = table[k];
      if (tm && tm.type === "text") {
        var node = document.querySelector(
          '[${PAGESMITH_ID_ATTR}="' + tm.elementId + '"]'
        );
        if (node) node.textContent = (tm.config && tm.config.content) || "";
      }
    }
  }
  // Editieren installiert KEIN Click-Wiring -> die Selektions-Bruecke bleibt die
  // alleinige Klick-Instanz.
  if (MODE === "edit") return;
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || typeof t.closest !== "function") return;
      var el = t.closest("[${PAGESMITH_ID_ATTR}]");
      el = actionOwner(el);
      if (el && el.tagName === "FORM") el = null;
      var actions = el ? byId[el.getAttribute("${PAGESMITH_ID_ATTR}")] : null;
      if (actions && actions.length) {
        // Track-Aktionen feuern SOFORT in der Schleife; die (max. eine) Redirect-
        // Aktion wird gemerkt und ERST NACH der Schleife ausgefuehrt -> der Track
        // feuert garantiert VOR der Navigation, reihenfolge-unabhaengig. 1b: echtes
        // fbq (navigationssicher via fbevents/sendBeacon) -> KEIN Navigations-Defer,
        // die Navigation laeuft danach normal weiter (Redirect-Latenz unverschlechtert).
        var redirect = null;
        for (var j = 0; j < actions.length; j++) {
          var a = actions[j];
          if (a.type === "track") {
            ${trackAll}
          } else if (a.type === "redirect") {
            redirect = a;
          }
        }
        if (redirect) {
          e.preventDefault();
          var url = redirect.config && redirect.config.url;
          if (url) {
            if (MODE === "preview") {
              // Vorschau: IMMER neuer Tab (escaped). openInNewTab bewusst ignoriert
              // — "selber Tab" laesst sich im iframe nicht ehrlich zeigen.
              window.open(url, "_blank");
            } else if (redirect.config.openInNewTab) {
              window.open(url, "_blank");
            } else {
              window.location.href = url;
            }
          }
          return;
        }
      }
      // Kein Redirect (kein Mapping ODER track-only). Nur in der Vorschau
      // Containment: jeden anderen Link stummschalten -> nie Default-Navigation
      // gegen die srcDoc-Basis (unsere Origin). Im Export bleibt der Default.
      if (MODE === "preview" && t.closest("a[href]")) {
        e.preventDefault();
      }
    },
    true
  );
  // AUXCLICK-TRACKING (nur Export): der 'click'-Handler oben feuert NICHT bei
  // Mittelklick (in allen Browsern feuert 'click' ausschliesslich fuer die primaere
  // Taste; mittlere/rechte erzeugen 'auxclick'). Ohne diesen Listener bliebe ein
  // Track-Event bei "im neuen Tab oeffnen" (Mittelklick) aus. Nach dem href-Bake
  // navigiert der Mittelklick nativ korrekt -> dieser Handler feuert AUSSCHLIESSLICH
  // den Track-Beacon und fasst die Navigation NICHT an (kein preventDefault, kein
  // window.open, keine location-Zuweisung). RECHTSKLICK-SCHUTZ: 'auxclick' feuert in
  // manchen Browsern auch fuer die rechte Taste (Kontextmenue) -> das button-Guard
  // als ERSTE Zeile laesst NUR die mittlere Taste (button === 1) durch, sonst waere
  // ein Rechtsklick eine Ghost-Conversion. KEIN Doppel-Feuern: 'click' (nur links)
  // und 'auxclick' (mitte/rechts) sind pro physischem Klick disjunkt.
  if (MODE === "export") {
    document.addEventListener(
      "auxclick",
      function (e) {
        if (e.button !== 1) return;
        var t = e.target;
        if (!t || typeof t.closest !== "function") return;
        var el = t.closest("[${PAGESMITH_ID_ATTR}]");
        el = actionOwner(el);
        if (el && el.tagName === "FORM") el = null;
        var actions = el ? byId[el.getAttribute("${PAGESMITH_ID_ATTR}")] : null;
        if (!actions || !actions.length) return;
        for (var j = 0; j < actions.length; j++) {
          var a = actions[j];
          if (a.type === "track") {
            ${trackAll}
          }
        }
      },
      true
    );
  }
  // FORMULAR-TRACK AM ABSCHICKEN (Phase 12.5, Scheibe 1b): Der Track eines <form>
  // zaehlt beim Abschicken (submit), nicht beim Klick. Capture an document: ein
  // Handler des Betreibers am Formular kann ihn weder mit stopPropagation noch mit
  // preventDefault verdecken. KEIN preventDefault von uns: Ziel, Methode und
  // Absenden gehoeren dem Betreiber. Eine Weiterleitung fuehrt ein Formular nicht
  // aus. Einmal je Formular und Seitenleben.
  var submittedForms = [];
  document.addEventListener(
    "submit",
    function (e) {
      var f = e.target;
      if (!f || f.tagName !== "FORM") return;
      if (submittedForms.indexOf(f) !== -1) return;
      var actions = byId[f.getAttribute("${PAGESMITH_ID_ATTR}")];
      if (!actions || !actions.length) return;
      submittedForms.push(f);
      for (var j = 0; j < actions.length; j++) {
        var a = actions[j];
        if (a.type === "track") {
            ${trackAll}
        }
      }
    },
    true
  );
})();`;
}

/**
 * Verdrahtet die Mappings in ein funktionales HTML. REINE Funktion: gleiche
 * Eingabe -> gleiche Ausgabe, keine Seiteneffekte ausser dem internen Parser.
 *
 * - Nur Mappings einbacken, deren data-pagesmith-id im html VORHANDEN ist.
 *   Verwaiste Mappings (Weg-C) werden im Output ignoriert -> Netz und Generator
 *   greifen nahtlos.
 * - Tabelle je Modus: "preview" alle Laufzeit-Typen; "export" alle ausser text
 *   (redirect + track; Text wird im Export NICHT verdrahtet, sondern direkt in den
 *   DOM gebacken — siehe unten). 1b-Hinweis: der track-Zweig feuert echtes fbq, wenn
 *   options.metaPixelId gesetzt ist (Base-Pixel lazy + consent-gegated injiziert),
 *   sonst console.warn-no-op. "edit" nur text (Redirect/Track waeren im Editieren-
 *   iframe nutzlos; das Edit-iframe bleibt damit pixel-frei).
 * - TEXT-Bake (nur "export"): pro praesentem type:"text"-Mapping wird das Element
 *   per ps-id gefunden und sein textContent auf config.content gesetzt — VOR der
 *   Serialisierung, auf DEMSELBEN geparsten DOM. Ergebnis: das <h1> enthaelt im
 *   Output schon den neuen Text (kein Laufzeit-JS). Senke ist textContent (NICHT
 *   innerHTML) -> Markup im Override wird inerter Text. In "preview"/"edit" bleibt
 *   Text laufzeit-getrieben (Wiring-Schleife), hier NICHT gebacken.
 * - HREF-Bake (nur "export", nur <a>): pro praesentem type:"redirect"-Mapping auf
 *   einem <a> wird das href-Attribut auf config.url gesetzt (target/rel nur bei
 *   openInNewTab, rel gemerget) — VOR der Serialisierung, damit Link-Kopieren,
 *   Hover, Crawler und Mittelklick nativ die konfigurierte URL sehen. ADDITIV: das
 *   redirect-Mapping bleibt in der Tabelle und im Klick-Handler. <button> wird
 *   uebersprungen (kein href). Ergaenzt durch einen auxclick-Listener (nur Export),
 *   der bei Mittelklick (button === 1, NIE Rechtsklick) den Track-Beacon feuert,
 *   ohne die Navigation anzufassen — siehe buildWiringScript.
 * - Script-Injektion nur, wenn es etwas zu verdrahten gibt: in "export" werden
 *   Datenblock + Wiring uebersprungen, sobald die (redirect-)Tabelle leer ist ->
 *   eine reine-Text-Seite exportiert als reines statisches HTML, KEIN Script.
 *   "preview" (Containment) und "edit" injizieren weiterhin immer.
 * - Injiziert vor </body> (Fallback: documentElement, falls kein body):
 *   (a) <script type="application/json" id="pagesmith-mappings"> mit der Tabelle,
 *   (b) das statische Wiring-Script.
 * - SICHERE Kodierung: JSON.stringify fuer die Tabelle, danach jedes "<" als
 *   Unicode-Escape maskieren (Backslash-u-0-0-3-c), damit eine URL mit
 *   "</script>" den JSON-Block NICHT verlassen kann. Bleibt gueltiges JSON
 *   (JSON.parse stellt "<" zur Laufzeit wieder her).
 * - Idempotent: erwartet sauberes gespeichertes HTML (ohne Preview-Injektionen)
 *   und fuegt nur einmal ein; der Aufrufer generiert IMMER aus dem Klartext-code.
 *
 * mode (Default "export"): "export" = echte Produktionslogik (selber/neuer Tab
 * laut Mapping, un-gemappte Links behalten Default). "preview" = Containment fuer
 * das srcDoc-iframe (jede Weiterleitung in neuen Tab, jeder andere Link
 * stummgeschaltet) + Text. "edit" = NUR Text-Anzeige, KEIN Click-Wiring (haengt
 * an die separat injizierte Selektions-Bruecke an, ohne sie anzutasten) — siehe
 * buildWiringScript.
 *
 * Defensive Garantien (wie detect.ts — User-Code nie vernichten):
 * - Leerer/whitespace Input -> "".
 * - Fehlender DOMParser (SSR) -> html UNVERAENDERT durch.
 * - Unerwarteter Fehler -> html UNVERAENDERT durch.
 */
export function generateFunctional(
  html: string,
  mappings: Mapping[],
  mode: GenerateMode = "export",
  // options.metaPixelId (Scheibe 1b): projektweite Meta-Pixel-ID aus den
  // Projekt-Einstellungen. Gesetzt -> Track-Zweig feuert echtes fbq + Base-Pixel
  // wird (lazy, consent-gegated) injiziert. Leer/absent -> kein Meta-Snippet,
  // Track-Aktion ist ein no-op. Der Aufrufer extrahiert sie via getMetaPixelId.
  // options.trackingKey + options.capiProxyUrl (Scheibe 2b-ii): oeffentlicher
  // CAPI-trackingKey (aus settings) + absolute Proxy-URL (env-abgeleitet, vom
  // Aufrufer gebildet — die REINE Engine liest NIE selbst env). Beide leer -> kein
  // Beacon (trackingKey leer: still; proxyUrl leer bei gesetztem Key: fail-loud warn).
  // options.consentTargets (Phase 11, neunte Scheibe, HAELFTE B): die
  // CONSENT-Schluessel der Ziele, nach denen die Seite fragen soll. Vom AUFRUFER
  // gebildet — nur er kennt die Projekt-Einstellungen; die REINE Engine lernt kein
  // Datenmodell (dieselbe Trennung wie bei capiProxyUrl, das die Engine auch nie
  // selbst aus env liest). FEHLT ODER LEER -> der erzeugte Text ist WOERTLICH der
  // von vor dieser Haelfte, samt Einzel-Ziehung und Einzel-Schluessel im Draht.
  // options.customPixelCode (Phase 11.6, Scheibe 11.6a): der GEPRUEFTE Basis-Code des
  // Betreibers. Vom AUFRUFER gelesen und geprueft (getCustomPixelCode) — die REINE
  // Engine lernt kein Datenmodell, dieselbe Trennung wie bei consentTargets und
  // capiProxyUrl. LEER ODER ABSENT -> der erzeugte Text ist zeichengleich der von vor
  // dieser Scheibe.
  options?: {
    metaPixelId?: string;
    trackingKey?: string;
    capiProxyUrl?: string;
    consentTargets?: readonly string[];
    customPixelCode?: string;
  }
): string {
  if (!html || !html.trim()) return "";

  // SSR-Schutz: DOMParser existiert nur im Browser.
  if (typeof DOMParser === "undefined") return html;

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Aktuell im Code vorhandene ps-IDs -> nur diese duerfen verdrahtet werden.
    const present = new Set<string>();
    doc.querySelectorAll(`[${PAGESMITH_ID_ATTR}]`).forEach((el) => {
      const id = el.getAttribute(PAGESMITH_ID_ATTR);
      if (id) present.add(id);
    });

    // TEXT-Bake (nur Export): praesente text-Overrides direkt in den DOM schreiben,
    // VOR der Serialisierung, auf demselben doc. present.has = derselbe typ-agnostische
    // Orphan-Filter; verwaiste text-Mappings werden weder gebacken noch verdrahtet.
    // textContent (nicht innerHTML) -> Markup im Override bleibt inerter Text.
    if (mode === "export") {
      for (const m of mappings) {
        if (m.type !== "text" || !present.has(m.elementId)) continue;
        const el = doc.querySelector(
          `[${PAGESMITH_ID_ATTR}="${m.elementId}"]`
        );
        if (el) el.textContent = m.config.content;
      }

      // REDIRECT-BAKE (nur Export, nur <a>): das href-Attribut auf die Ziel-URL
      // setzen, damit Link-Kopieren, Hover-Statuszeile, Crawler UND Mittelklick
      // nativ korrekt zur konfigurierten URL fuehren (bisher trug das <a> weiter
      // die aus der Fremdseite geerbte Original-URL). ADDITIV: die JSON-Tabelle
      // und der Klick-Handler bleiben unveraendert — der Handler neutralisiert
      // weiter inline onclick des Fremdcodes und feuert Track. Bei Linksklick
      // navigiert der Handler per location.href auf DIESELBE URL -> kein Konflikt.
      // <button> hat kein href -> uebersprungen (tagName-Guard). URL ist
      // persist-zeit-validiert (isValidRedirectUrl: nur http/https) -> kein
      // javascript:-Vektor; setAttribute ist eine Attribut-Senke (bei der
      // Serialisierung escaped). Orphan-Filter identisch zum Text-Bake (present).
      for (const m of mappings) {
        if (m.type !== "redirect" || !present.has(m.elementId)) continue;
        const el = doc.querySelector(
          `[${PAGESMITH_ID_ATTR}="${m.elementId}"]`
        );
        if (!el || el.tagName !== "A") continue;
        el.setAttribute("href", m.config.url);
        // target/rel NUR bei openInNewTab. rel wird GEMERGET, nicht ueberschrieben:
        // ein importiertes rel (z.B. nofollow) bleibt erhalten, noopener +
        // noreferrer kommen dazu (Reverse-Tabnabbing-Schutz). Bei openInNewTab:false
        // bleibt target/rel unangetastet — der Linksklick-Handler erzwingt ohnehin
        // same-tab, und Mittelklick oeffnet nativ immer einen neuen Tab.
        if (m.config.openInNewTab) {
          el.setAttribute("target", "_blank");
          const rel = new Set(
            (el.getAttribute("rel") || "").split(/\s+/).filter(Boolean)
          );
          rel.add("noopener");
          rel.add("noreferrer");
          el.setAttribute("rel", Array.from(rel).join(" "));
        }
      }
    }

    // Orphans raus: nur Mappings mit lebendem Anker. Danach je Modus filtern:
    // export -> alle ausser text (redirect + track-Stub); edit -> nur text;
    // preview -> alle Laufzeit-Typen.
    const table = mappings.filter((m) => {
      if (!present.has(m.elementId)) return false;
      if (mode === "export") return m.type !== "text";
      if (mode === "edit") return m.type === "text";
      return true; // preview
    });

    // CUSTOM-PIXEL (Phase 11.6, Scheibe 11.6a) — DIE MODUS-GATUNG STEHT HIER UND NUR
    // HIER (Entscheidung P11.6-6, Teil (d)): Der Baustein entsteht AUSSCHLIESSLICH in
    // "export". In der Vorschau gibt es WEDER Lader NOCH Ereigniszeile.
    // DER GRUND IST WIRKUNG, NICHT KONSISTENZ: Der Basis-Code eines Netzwerks setzt beim
    // Laden Cookies und schickt einen Seitenaufruf, und der Vorschau-Rahmen baut sich bei
    // jeder Tipp-Pause neu auf — es entstuenden Ereignisse aus der ARBEIT des Betreibers.
    // DASS DER BESTAND IN DER VORSCHAU SEHR WOHL ECHTES fbq FEUERT, IST BEKANNT UND
    // BEWUSST (docs/claude-history/phase-4-mapping-codegen-export.md: "akzeptierte
    // Marketer-eigene-Vorschau-Verschmutzung"); der Custom-Baustein folgt dem NICHT.
    // DER PREIS: Der Betreiber kann seinen Custom-Pixel im Editor nicht pruefen.
    const customPixelCode =
      mode === "export" ? (options?.customPixelCode ?? "") : "";
    // Traegt IRGENDEINE verdrahtete Aktion eine Ereigniszeile? Gefragt wird die
    // GEFILTERTE Tabelle und nicht die rohen Mappings: ein verwaistes Mapping wird nicht
    // verdrahtet, seine Zeile duerfte also auch keinen Baustein erzeugen.
    const customHasEventLine =
      mode === "export" &&
      table.some((m) => m.type === "track" && !!m.config.code);

    // Script-Injektion nur, wenn noetig: im Export ohne Laufzeit-Mappings (z.B.
    // reine-Text-Seite) bleibt das Output reines statisches HTML — KEIN Datenblock,
    // KEIN Wiring. preview (Containment) + edit injizieren weiterhin immer.
    // SEIT 11.6a EIN DRITTER TERM, UND ER IST REIN ADDITIV: Ein Projekt MIT Snippet, aber
    // OHNE jedes Laufzeit-Mapping bekaeme sonst gar kein Script — der Basis-Code wuerde
    // nie geladen, lautlos. Ausserhalb von "export" ist customPixelCode immer "", der
    // Term also folgenlos; die zwei bestehenden Terme sind unangetastet.
    const injectScripts =
      mode !== "export" || table.length > 0 || customPixelCode !== "";
    if (injectScripts) {
      // Datenblock (JSON), sicher kodiert: jedes "<" als Unicode-Escape maskiert
      // verhindert den "</script>"-Ausbruch und schuetzt zugleich URLs mit "<".
      const json = JSON.stringify(table).replace(/</g, "\\u003c");
      const dataScript = doc.createElement("script");
      dataScript.setAttribute("type", "application/json");
      dataScript.setAttribute("id", MAPPINGS_SCRIPT_ID);
      dataScript.textContent = json;

      const wiringScript = doc.createElement("script");
      wiringScript.textContent = buildWiringScript(
        mode,
        options?.metaPixelId ?? "",
        options?.trackingKey ?? "",
        options?.capiProxyUrl ?? "",
        options?.consentTargets ?? [],
        customPixelCode,
        customHasEventLine
      );

      // GETEILTES CONSENT-GATE (Phase 11, zweite Scheibe): der Block wird erzeugt,
      // wenn ein Tracking-Konsument erzeugt wird, und steht VOR ihm. Er haengt WEDER
      // an der Pixel-ID (er entsteht auch ohne Meta-Runtime) noch traegt er Meta-
      // Wissen. Die Regel selbst lebt in tracking/consent.ts — EIN Urteil.
      const consentScript = doc.createElement("script");
      consentScript.setAttribute("id", CONSENT_SCRIPT_ID);
      // BEIDE Laufzeit-Funktionen (HAELFTE B). Der Plural ist Absicht: stuende hier
      // der Singular, fehlte __psConsentAll auf jeder Seite MIT Wiring — und die
      // Feuer-Funktion kehrte an ihrer Existenzpruefung um, fail-closed und lautlos.
      consentScript.textContent = buildConsentRuntimes();

      // Vor </body> haengen; Fallback documentElement, falls kein body existiert.
      // REIHENFOLGE IST TRAGEND: das Gate ZUERST — das Wiring ruft __psConsent beim
      // ersten Klick, und die publizierte Seite haengt den PageView-Emitter noch
      // dahinter. Ein Konsument vor seiner Definition liefe ins Leere.
      const target = doc.body ?? doc.documentElement;
      target.appendChild(consentScript);
      target.appendChild(dataScript);
      target.appendChild(wiringScript);
    }

    return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } catch {
    return html;
  }
}

/**
 * HTML fuer das Editieren-iframe. Bei aktivem Text-Override zeigt auch der
 * Editieren-Modus den Override-Text (Konsistenz mit Vorschau/Liste/Header).
 *
 * KOMPOSITION, kein Umbau: generateFunctional("edit") haengt NUR das
 * Text-Injektions-Skript (+ Datenblock) HINTER die bereits in previewHtml
 * enthaltene Selektions-Bruecke (appendChild) — es tastet die Bruecke nicht an und
 * installiert KEIN Click-Wiring. Der DOMParser-Round-Trip erhaelt das Bruecken-
 * <script> + die data-pagesmith-id-Anker verbatim (derselbe Round-Trip, dem schon
 * der Export vertraut; funktionale Gleichheit ist per Test belegt).
 *
 * KURZSCHLUSS: ohne text-Mapping gibt es nichts anzuzeigen -> previewHtml
 * unveraendert (plus Marker, s.u.) zurueck. Das spart den Extra-Parse und haelt das
 * Edit-iframe im Normalfall exakt wie bisher (kein Reload). Reine Darstellung:
 * KEIN Rueckfluss in code/debouncedCode/Dirty.
 *
 * VARIANTEN-MARKER (Phase 9 Scheibe 9a, Live-Bug): eine reine String-Anhaengung
 * AM ENDE des Dokuments, die die AKTIVE Variante traegt. Warum sie noetig ist:
 * srcDoc ist ein STRING, und React schreibt das Attribut nur bei WERT-Aenderung.
 * Zwei Varianten aus createVariantB tragen aber denselben HTML-String, und dieser
 * Kurzschluss hier gibt previewHtml BYTE-IDENTISCH zurueck, solange KEINE Variante
 * einen Text-Override hat — das Ergebnis ist dann vom mappings-INHALT vollstaendig
 * unabhaengig. Ohne Marker liefert der Memo beim Umschalten denselben String, React
 * schreibt nicht, das iframe laedt nicht neu, und der per PS_SET_TEXT imperativ
 * gepatchte DOM der zuletzt bearbeiteten Variante bleibt im Canvas stehen.
 *
 * DESHALB TRAEGT AUCH DER KURZSCHLUSS-PFAD DEN MARKER: er ist nicht der Randfall,
 * sondern der STARTZUSTAND jedes frisch kopierten Projekts. Ein Marker nur im
 * generateFunctional-Zweig repariert genau den gemeldeten Fall NICHT.
 *
 * AM ENDE, nicht davor: Inhalt VOR dem Doctype loest Quirks-Mode aus und aenderte
 * das Rendering. Reine String-Op, KEIN Parsing (Projektregel).
 *
 * HIER und NICHT in generateFunctional: generateFunctional bedient "edit",
 * "preview" UND "export" — ein Marker dort landete in EXPORTIERTEM und
 * VEROEFFENTLICHTEM HTML. editPreviewHtml ist der edit-spezifische Wrapper und
 * damit die einzige Stelle, an der der Marker strukturell nicht in ein Artefakt
 * gelangen kann.
 */
export function editVariantMarker(variant: string): string {
  return `<!--__ps_variant:${variant}-->`;
}

export function editPreviewHtml(
  previewHtml: string,
  mappings: Mapping[],
  variant: string
): string {
  // Der Marker haengt an BEIDEN Rueckgabepfaden — der Kurzschluss unten ist
  // ausdruecklich KEINE Ausnahme, sondern der wichtigste Fall (s. Doc-Block).
  const marker = editVariantMarker(variant);
  if (!mappings.some((m) => m.type === "text")) return previewHtml + marker;
  return generateFunctional(previewHtml, mappings, "edit") + marker;
}
