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

// Vorschau- vs. Export-Verhalten (Live-Test-Korrektur, siehe CLAUDE.md):
// dieselbe Wiring-Engine, EINE mode-Verzweigung — kein Duplikat-Script.
export type GenerateMode = "export" | "preview";

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
 * stummgeschaltet) — siehe buildWiringScript.
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

    // Orphans raus: nur Mappings mit lebendem Anker einbacken.
    const table = mappings.filter((m) => present.has(m.elementId));

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

    return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } catch {
    return html;
  }
}
