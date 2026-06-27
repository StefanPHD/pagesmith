// Code-Gen-Engine (Phase 4, Scheibe 1): macht aus der Mapping-SPEZIFIKATION
// echtes VERHALTEN. Reine, unit-testbare Funktion (kein React, kein Server, kein
// Cheerio) — client-seitig via DOMParser, konsistent zur Detection in detect.ts.
//
// Sie verdrahtet die erfassten Aktionen in ein funktionales HTML: ein injiziertes
// Laufzeit-Script haengt pro data-pagesmith-id einen Click-Handler. Bisher haben
// wir nur die ABSICHT erfasst; hier feuert der Button wirklich.

import type { Mapping } from "./mappings";

const PAGESMITH_ID_ATTR = "data-pagesmith-id";

// id des injizierten JSON-Datenblocks; das Wiring-Script liest die Tabelle per
// getElementById genau hier aus.
const MAPPINGS_SCRIPT_ID = "pagesmith-mappings";

// Vorschau- vs. Export- vs. Editier-Verhalten: dieselbe Wiring-Engine, EINE
// mode-Verzweigung — kein Duplikat-Script.
// - export:  echte Produktionslogik (Redirect-Click-Wiring, kein Text — der
//            direkte-DOM-Bake fuer Text kommt spaeter).
// - preview: funktionale Vorschau (Redirect-Click-Wiring + Containment + Text).
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
// CLICK-Wiring (Redirect + Containment): Vorschau + Export, NICHT Editieren. Im
// Editieren-iframe gehoeren Klicks ALLEIN der separat injizierten Selektions-
// Bruecke -> generateFunctional("edit") installiert KEINEN eigenen Click-Handler.
//
// WICHTIG: Darf keinen literalen "</script>"-String enthalten (Serialisierung).
function buildWiringScript(mode: GenerateMode): string {
  return `(function () {
  var MODE = ${JSON.stringify(mode)};
  var dataEl = document.getElementById("${MAPPINGS_SCRIPT_ID}");
  if (!dataEl) return;
  var table;
  try {
    table = JSON.parse(dataEl.textContent || "[]");
  } catch (e) {
    return;
  }
  var byId = {};
  for (var i = 0; i < table.length; i++) byId[table[i].elementId] = table[i];
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
      var m = el ? byId[el.getAttribute("${PAGESMITH_ID_ATTR}")] : null;
      if (m && m.type === "redirect") {
        e.preventDefault();
        var url = m.config && m.config.url;
        if (!url) return;
        if (MODE === "preview") {
          // Vorschau: IMMER neuer Tab (escaped). openInNewTab bewusst ignoriert —
          // "selber Tab" laesst sich im iframe nicht ehrlich zeigen.
          window.open(url, "_blank");
        } else if (m.config.openInNewTab) {
          window.open(url, "_blank");
        } else {
          window.location.href = url;
        }
        return;
      }
      // Kein Mapping. Nur in der Vorschau Containment: jeden anderen Link
      // stummschalten -> nie Default-Navigation gegen die srcDoc-Basis (unsere
      // Origin). Im Export bleibt das Default-Verhalten unangetastet.
      if (MODE === "preview" && t.closest("a[href]")) {
        e.preventDefault();
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
 * - Tabelle je Modus: "preview" beide Typen; "export" nur redirect (Text wird im
 *   Export NICHT verdrahtet, sondern direkt in den DOM gebacken — siehe unten);
 *   "edit" nur text (Redirects waeren im Editieren-iframe nutzlos -> kein URL-Ballast).
 * - TEXT-Bake (nur "export"): pro praesentem type:"text"-Mapping wird das Element
 *   per ps-id gefunden und sein textContent auf config.content gesetzt — VOR der
 *   Serialisierung, auf DEMSELBEN geparsten DOM. Ergebnis: das <h1> enthaelt im
 *   Output schon den neuen Text (kein Laufzeit-JS). Senke ist textContent (NICHT
 *   innerHTML) -> Markup im Override wird inerter Text. In "preview"/"edit" bleibt
 *   Text laufzeit-getrieben (Wiring-Schleife), hier NICHT gebacken.
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
  mode: GenerateMode = "export"
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
    }

    // Orphans raus: nur Mappings mit lebendem Anker. Danach je Modus filtern:
    // export -> nur redirect; edit -> nur text; preview -> beide.
    const table = mappings.filter((m) => {
      if (!present.has(m.elementId)) return false;
      if (mode === "export") return m.type !== "text";
      if (mode === "edit") return m.type === "text";
      return true; // preview
    });

    // Script-Injektion nur, wenn noetig: im Export ohne Laufzeit-Mappings (z.B.
    // reine-Text-Seite) bleibt das Output reines statisches HTML — KEIN Datenblock,
    // KEIN Wiring. preview (Containment) + edit injizieren weiterhin immer.
    const injectScripts = mode !== "export" || table.length > 0;
    if (injectScripts) {
      // Datenblock (JSON), sicher kodiert: jedes "<" als Unicode-Escape maskiert
      // verhindert den "</script>"-Ausbruch und schuetzt zugleich URLs mit "<".
      const json = JSON.stringify(table).replace(/</g, "\\u003c");
      const dataScript = doc.createElement("script");
      dataScript.setAttribute("type", "application/json");
      dataScript.setAttribute("id", MAPPINGS_SCRIPT_ID);
      dataScript.textContent = json;

      const wiringScript = doc.createElement("script");
      wiringScript.textContent = buildWiringScript(mode);

      // Vor </body> haengen; Fallback documentElement, falls kein body existiert.
      const target = doc.body ?? doc.documentElement;
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
 * UNVERAENDERT zurueck (byte-identisch). Das spart den Extra-Parse und haelt das
 * Edit-iframe im Normalfall exakt wie bisher (kein Reload). Reine Darstellung:
 * KEIN Rueckfluss in code/debouncedCode/Dirty.
 */
export function editPreviewHtml(
  previewHtml: string,
  mappings: Mapping[]
): string {
  if (!mappings.some((m) => m.type === "text")) return previewHtml;
  return generateFunctional(previewHtml, mappings, "edit");
}
