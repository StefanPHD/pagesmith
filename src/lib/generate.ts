// Code-Gen-Engine (Phase 4, Scheibe 1): macht aus der Mapping-SPEZIFIKATION
// echtes VERHALTEN. Reine, unit-testbare Funktion (kein React, kein Server, kein
// Cheerio) — client-seitig via DOMParser, konsistent zur Detection in detect.ts.
//
// Sie verdrahtet die erfassten Aktionen in ein funktionales HTML: ein injiziertes
// Laufzeit-Script haengt EINEN delegierten Click-Handler an document und ordnet
// jeden Klick per data-pagesmith-id einem Element zu (siehe buildWiringScript).
// Bisher haben wir nur die ABSICHT erfasst; hier feuert der Button wirklich.

import type { FormTargetConfig, Mapping } from "./mappings";
import { buildMetaRuntime, metaTrackStatement } from "./tracking/meta";
import { buildConsentRuntimes, CONSENT_SCRIPT_ID } from "./tracking/consent";
import {
  buildCustomPixelRuntime,
  customTrackStatement,
} from "./tracking/custom-pixel";
import { buildFormTargetRuntime, deriveFormFieldNames } from "./form-target";
import { allowedRelayEndpoint } from "./relay/hosts";
import { embedInScript } from "./script-embed";
import type { ConsentLanguage } from "./settings";

const PAGESMITH_ID_ATTR = "data-pagesmith-id";

// Ein Formular-Ziel, WIE ES IM DATENBLOCK STEHT (Phase 13.6, Scheibe 13.6-4): ohne fieldNames
// und dataSaver, und an einem Relay-Ziel mit der Marke relay: true. Nur hier gebildet.
type DeliveredFormTarget = {
  elementId: string;
  type: "formTarget";
  config: FormTargetConfig & { relay?: true };
};

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
// (etwa ein Knopf type="button" mit Track) feuert beim Klick weiter seine eigene
// (P12.5-25); ein Absende-Button traegt keine (P12.5-37, naechster Absatz).
//
// ABSENDE-BUTTONS (Phase 12.5, Scheibe 1c; Entscheidungen P12.5-37 und P12.5-39 der
// Phase 12.5): Ist der Eigentuemer eines Klicks ein Knopf, der ein Formular abschickt,
// wird er auf null gesetzt — keine Aktion, und die Suche laeuft NICHT weiter nach oben
// (dieselbe Figur wie beim <form>). Sein Klick gehoert dem Abschicken: kein
// preventDefault von uns, das Formular schickt ab, sein Track zaehlt im
// submit-Listener. Absende-Button = BUTTON oder INPUT mit Formular (el.form) und type
// "submit" oder "image"; das Urteil ueber type faellt der Browser (ein <button> ohne
// oder mit ungueltigem type ist "submit"). Der Riegel auf BUTTON/INPUT ist gemessen:
// bei <object role="button"> ist type frei waehlbar (Vermerk P12.5-38, Punkt (2)).
// DASSELBE URTEIL faellt der Editor in submitFormOf (unten); Waechter ist die
// gemeinsame Tabelle Z1–Z13 in generate.test.ts — wer eines aendert, aendert beide.
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
// SEIT PHASE 13.6, SCHEIBE 13.6-2 NUR IM MODUS "export": Die Vorschau bekommt keine
// Meta-Runtime, und ihr Track-Zweig ist leer — die Vorschau sendet nie.
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
  customHasEventLine: boolean,
  // FORMULAR-ZIEL (Phase 13, Scheibe 13-1): die Sprache der eigenen Meldung — oder null,
  // wenn KEIN Formular-Ziel verdrahtet wird. Die Entscheidung "gibt es eines, und sind wir
  // im Modus export" faellt beim einzigen Aufrufer (generateFunctional); ohne Vorgabewert,
  // damit der Compiler fragt (dieselbe Bauform wie bei customCode).
  formTargetLanguage: ConsentLanguage | null,
  // RELAY-WEG (Phase 13.6, Scheibe 13.6-4): ob mindestens ein verdrahtetes Formular-Ziel die
  // Marke "relay": true traegt. Entschieden beim einzigen Aufrufer; ohne Vorgabewert.
  formTargetRelay: boolean
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
  // JETZT WIRD IM MODUS "export" IMMER GERUFEN, und buildMetaRuntime entscheidet
  // SELBST, ob etwas entsteht: ein Pixel ODER ein Beacon-Rumpf. Ohne beides liefert sie
  // "" — eine Seite ohne jede Tracking-Konfiguration bleibt damit exakt wie zuvor,
  // inklusive der Zahl der Einwilligungs-Fragestellen.
  // trackingKey/proxyUrl entscheiden weiterhin IN buildMetaRuntime ueber den
  // konkreten Beacon-Zweig (still / fail-loud / feuern).
  //
  // DIE VORSCHAU SENDET NIE (Phase 13.6, Scheibe 13.6-2; Owner-Entscheidung P13.6-13 und
  // Setzung P13.6-43 der Phase 13.6). Die Meta-Laufzeit — Lader, fbq, Beacon, Bestaetigung
  // — ist die einzige Sende-Einheit, die diese Engine in die Vorschau bauen koennte; sie
  // entsteht deshalb NUR im Modus "export", dieselbe Form wie die Gatung des Custom-Pixels
  // (P11.6-6, Teil (d)) und des Formular-Ziels (P13-30) weiter unten. GRUND: Klicks beim
  // Gestalten liefen sonst als Conversions in Messung und Gebotsoptimierung der Kampagnen
  // des Betreibers. Im Modus "edit" kommen ohnehin keine Tracking-Eingaben an; dort ist
  // das Ergebnis wie zuvor "".
  // DIE ZEILE HAT KEINEN SCHUTZ AUS DER BAUART (anders als der Riegel, Entscheidung
  // P11.12-2): Waechter sind W-P1 (Text) und W-P2 (Verhalten) in generate.test.ts; W-B1
  // und W-B2 dort halten Export und Veroeffentlichung byte-gleich.
  const metaRuntime =
    mode === "export"
      ? buildMetaRuntime(metaPixelId, capiTrackingKey, capiProxyUrl, consentTargets)
      : "";
  // ZWEI FRAGEN, ZWEI ARGUMENTE: ob __psMetaFire existiert (dann darf es gerufen
  // werden), und ob ein Pixel gesetzt ist (dann entfaellt die Warnung). Seit dieser
  // Scheibe fallen die beiden NICHT mehr zusammen — genau das ist ihr Zweck.
  // IN DER VORSCHAU IST DIE ANWEISUNG LEER (Scheibe 13.6-2): Die Warnung "Meta-Pixel nicht
  // konfiguriert" waere dort eine falsche Aussage — die Vorschau bekommt die Pixel-ID gar
  // nicht. Im Modus "edit" bleibt sie, wie sie war; dort haengt kein Klick-Handler.
  const trackStmt =
    mode === "preview" ? "" : metaTrackStatement(metaRuntime !== "", hasPixel);
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
  // FORMULAR-ZIEL (Phase 13, Scheibe 13-1; Invariante I5 der Scheibe). BEIDE Stuecke sind
  // "", wenn kein Formular-Ziel verdrahtet wird — der erzeugte Text ist dann zeichengleich
  // zu dem vor der Scheibe. Die Waechter dafuer sind die vier Differenz-Nachweise W1', W2'
  // (own-blocks-waechter.test.ts), T1 (tracking/consent-setter.test.ts) und T9
  // (tracking/custom-pixel.test.ts): Ihre Sonden tragen kein Formular-Ziel.
  // Der Baustein (Versand, Zeitlimit, Sperre, Meldung) steht in lib/form-target.ts; die
  // Einsetzung in den submit-Listener steht HIER, weil sie die Track-Anweisung braucht.
  const formTargetRuntime =
    formTargetLanguage === null
      ? ""
      : buildFormTargetRuntime(formTargetLanguage, formTargetRelay);
  // DIE EINSETZUNG IN DEN SUBMIT-LISTENER. Sie steht VOR der Sperre submittedForms: stuende
  // sie dahinter, verhinderte die Sperre den erneuten Versuch nach einem Fehlschlag.
  // preventDefault ZUERST und IMMER — auch wenn gerade gesendet wird: sonst schickte ein
  // zweiter Klick nativ ab, bei GET mit den Feldwerten in der Adresse (Invariante I2).
  // DER TRACK ZAEHLT ERST BEI "ERREICHT" (Setzung P13-26), einmal je Formular und
  // Seitenleben — dieselbe Liste submittedForms wie beim Formular ohne Ziel.
  // Die Abgrenzung von (I4) der Scheiben 1b und 1c der Phase 12.5: fuer ein Formular MIT
  // Ziel ersetzt unser preventDefault das native Abschicken; ein Formular OHNE Ziel laeuft
  // an diesem Block vorbei, als stuende er nicht da.
  const formTargetBranch =
    formTargetLanguage === null
      ? ""
      : `
      var ftList = byId[f.getAttribute("${PAGESMITH_ID_ATTR}")];
      var ft = null;
      if (ftList) {
        for (var q = 0; q < ftList.length; q++) {
          if (ftList[q].type === "formTarget") ft = ftList[q].config;
        }
      }
      if (ft) {
        e.preventDefault();
        __psFormTargetSend(f, e.submitter, ft, function () {
          if (submittedForms.indexOf(f) !== -1) return;
          submittedForms.push(f);
          for (var j = 0; j < ftList.length; j++) {
            var a = ftList[j];
            if (a.type === "track") {
            ${trackAll}
            }
          }
        });
        return;
      }`;
  return `(function () {
  var MODE = ${JSON.stringify(mode)};${customRuntime}${metaRuntime}${formTargetRuntime}
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
  // ABSENDE-BUTTONS (Phase 12.5, Scheibe 1c; Entscheidung P12.5-37): ein Knopf, der
  // ein Formular abschickt, traegt keine eigene Klick-Aktion - sein Klick gehoert dem
  // Abschicken. Das Urteil faellt der Browser (form, type); type="button" schickt
  // nicht ab und behaelt seine Aktionen. Nur BUTTON und INPUT: bei anderen Tags ist
  // type frei waehlbar (object).
  function isSubmitButton(el) {
    if (el.tagName !== "BUTTON" && el.tagName !== "INPUT") return false;
    if (!el.form) return false;
    return el.type === "submit" || el.type === "image";
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
      if (el && isSubmitButton(el)) el = null;
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
        if (el && isSubmitButton(el)) el = null;
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
      if (!f || f.tagName !== "FORM") return;${formTargetBranch}
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
 * ABSENDE-BUTTON IM EDITOR (Phase 12.5, Scheibe 1c; Entscheidungen P12.5-37 und P12.5-40
 * der Phase 12.5). Sagt dem ActionPanel, ob das Element mit dieser ps-ID ein Formular
 * abschickt, und welches.
 * - null: kein Absende-Button (auch: Element nicht gefunden, kein DOMParser, Wurf).
 * - { formId }: Absende-Button; formId ist die ps-ID seines Formulars, null, wenn das
 *   Formular keine traegt (dann bietet das Panel keinen Link zum Formular an).
 *
 * DASSELBE URTEIL wie isSubmitButton im Wiring (buildWiringScript): BUTTON oder INPUT, mit
 * Formular (el.form, also auch ueber das form-Attribut), type "submit" oder "image". Der
 * Waechter ist die gemeinsame Tabelle Z1–Z13 in generate.test.ts, gegen die BEIDE Seiten
 * laufen — wer eines aendert, aendert beide.
 *
 * html MUSS das Vorschau-HTML aus DEMSELBEN Parse sein, aus dem die Elementliste stammt
 * (previewHtml aus annotateAndDetect): nur dort tragen auch frisch gewuerfelte ps-IDs
 * dieselbe Kennung wie die Liste. Gesucht wird per getAttribute-Vergleich, nicht ueber
 * einen Selektor mit eingesetzter ID.
 *
 * FAIL-OPEN NUR IN DER ANZEIGE: Liefert diese Funktion faelschlich null, zeigt das Panel
 * die normalen Kacheln; die Laufzeit urteilt selbst und ignoriert die Aktion trotzdem.
 */
export function submitFormOf(
  html: string,
  elementId: string
): { formId: string | null } | null {
  if (!html || typeof DOMParser === "undefined") return null;
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let el: Element | null = null;
    for (const cand of Array.from(doc.querySelectorAll(`[${PAGESMITH_ID_ATTR}]`))) {
      if (cand.getAttribute(PAGESMITH_ID_ATTR) === elementId) {
        el = cand;
        break;
      }
    }
    if (!el) return null;
    if (el.tagName !== "BUTTON" && el.tagName !== "INPUT") return null;
    const control = el as HTMLButtonElement | HTMLInputElement;
    const form = control.form;
    if (!form) return null;
    if (control.type !== "submit" && control.type !== "image") return null;
    return { formId: form.getAttribute(PAGESMITH_ID_ATTR) || null };
  } catch {
    return null;
  }
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
 *   DOM gebacken — siehe unten). 1b-Hinweis: der track-Zweig feuert im Modus "export"
 *   echtes fbq, wenn options.metaPixelId gesetzt ist (Base-Pixel lazy + consent-gegated
 *   injiziert), sonst console.warn-no-op. In "preview" ist er LEER — die Vorschau sendet
 *   nie (Phase 13.6, Scheibe 13.6-2). "edit" nur text (Redirect/Track waeren im
 *   Editieren-iframe nutzlos; das Edit-iframe bleibt damit pixel-frei).
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
  // Projekt-Einstellungen. Gesetzt (und Modus "export") -> Track-Zweig feuert echtes
  // fbq + Base-Pixel wird (lazy, consent-gegated) injiziert; in "preview" wirkt sie
  // nicht (Scheibe 13.6-2). Leer/absent -> kein Meta-Snippet,
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
    // options.formTargetLanguage (Phase 13, Scheibe 13-1): die Sprache der eigenen Meldung
    // des Formular-Ziels, vom AUFRUFER gelesen (getConsentLanguage) — dieselbe Trennung wie
    // bei customPixelCode. Wirkt NUR, wenn die Tabelle ein Formular-Ziel traegt und der
    // Modus "export" ist; ohne Formular-Ziel ist der erzeugte Text zeichengleich zu vorher.
    // FEHLT sie trotz Formular-Ziel, gilt "de". Das ist KEIN Rueckfall im Sinne der
    // Dauerregel "EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB": Der LESER liefert
    // "unknown", und den faengt das Tor in publishProject bzw. der Export-Riegel, bevor ein
    // so erzeugter Text irgendwo hingeht.
    formTargetLanguage?: ConsentLanguage;
    // options.hosted (Phase 13.6, Scheibe 13.6-4): das AUSDRUECKLICHE Merkmal "dieser Text wird
    // von unserer Auslieferung auf einem Serving-Host ausgeliefert". Gesetzt allein vom
    // Veroeffentlichungs-Pfad (buildDocumentFor in CodeImporter.tsx); FEHLT es, gilt es als
    // false — ein Export traegt nie Relay-Code (Setzung P13.6-59, Q11). Nicht aus einer
    // anderen Eingabe erschlossen (etwa einer relativen capiProxyUrl).
    hosted?: boolean;
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

    // FELDNAMEN (Phase 13, Scheibe 13-1c; Setzungen P13-43 und P13-59 der Phase 13). Nur
    // im Export und nur an einem <form>, dessen Formular-Ziel im Dokument steht (J2: ein
    // Projekt ohne Formular-Ziel und ein Formular ohne Ziel bleiben byte-gleich). Die Namen
    // kommen aus DERSELBEN Funktion, die der Editor ueber formTargetCheck anzeigt (J5); hier
    // wird nur geschrieben — und nur, was sie als ABGELEITET liefert, nie ueber einen
    // vorhandenen Namen (J3). Der Quelltext des Editors bleibt unberuehrt (J1): geschrieben
    // wird in dieses Dokument, nicht in den Code.
    // VOR DEM TEXT-BAKE (Setzung P13-59): Er aendert h1–h6 und p; ein <p> in einem <label>
    // gaebe der Erzeugung sonst einen anderen Label-Text als dem Editor.
    // Die Dauerregel "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN
    // FREMDEN KNOTEN AN" nimmt die Schreibvorgaenge dieser Funktion zur Erzeugungszeit aus.
    //
    // DER NATIVE RUECKFALL (Phase 13.6, Scheibe 13.6-1; Setzungen P13.6-32 und P13.6-36 der
    // Phase 13.6). Laeuft unser Skript nicht (JavaScript aus, Skript noch nicht geladen,
    // form.submit() eines fremden Skripts), schickt der Browser das Formular selbst ab. Ohne
    // diese vier Attribute ging es an die eigene Seitenadresse, bei GET mit den Feldwerten
    // im Query (GEMESSEN, Vermerk P13.6-31 der Phase 13.6). Mit ihnen geht es allein an die
    // eingetragene Adresse, in derselben Form wie der Versand im Skript (Setzung P13-19 der
    // Phase 13: application/x-www-form-urlencoded; das Skript kodiert immer UTF-8, deshalb
    // accept-charset). Vorhandene Werte des Betreibers werden ERSETZT; target bleibt
    // unangetastet — der Lead kommt auch dann an, nur die Antwort oeffnet sich anderswo.
    // DER PREIS: Im Rueckfall sieht der Besucher die Antwortseite des Empfaengers, nicht die
    // Danke-Seite. Mit Skript aendert sich nichts: preventDefault im submit-Listener ersetzt
    // das native Abschicken wie bisher; die Laufzeit liest diese Attribute nicht.
    // setAttribute ist hier die richtige Senke: Der Serialisierer maskiert das
    // Anfuehrungszeichen im Attributwert (Waechter F7b) — embedInScript waere in einem
    // Attribut falsch (Dauerregel "JEDER BETREIBER-WERT, DER IN SCRIPT-ROHTEXT GEHT …").
    // Der Wert ist der ROHE endpoint, derselbe wie im Datenblock: beide URL-Parser schneiden
    // Leerraum am Rand ab, eine eigene Bereinigung waere ein zweiter Rechenweg.
    // NUR HIER, im Modus export und nur an einem <form> mit Formular-Ziel: Ein Projekt ohne
    // Ziel und ein Formular ohne Ziel bleiben byte-gleich (Waechter B2-J1, B2-J2 in
    // form-target.test.ts — die vier Differenz-Nachweise W1', W2', T1, T9 tragen kein <form>
    // und sehen diese Stelle nicht). Vorschau und Edit: kein Rahmen traegt allow-forms.
    if (mode === "export") {
      for (const m of mappings) {
        if (m.type !== "formTarget" || !present.has(m.elementId)) continue;
        const form = doc.querySelector(
          `[${PAGESMITH_ID_ATTR}="${m.elementId}"]`
        );
        if (!form || form.tagName !== "FORM") continue;
        for (const a of deriveFormFieldNames(form as HTMLFormElement).assignments) {
          a.element.setAttribute("name", a.name);
        }
        form.setAttribute("action", m.config.endpoint);
        form.setAttribute("method", "post");
        form.setAttribute("enctype", "application/x-www-form-urlencoded");
        form.setAttribute("accept-charset", "UTF-8");
      }
    }

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
    // DIE LISTE DER FELDNAMEN GEHT NICHT HINAUS (Scheibe 13-1c, Setzung P13-58): Die
    // Laufzeit liest nur endpoint und thanksUrl, und was ausgeliefert ist, bekommt man nicht
    // zurueck. Nur fieldNames wird entfernt, alles andere bleibt in SEINER Reihenfolge
    // (Spread) — ein Mapping aus der Datenbank kommt mit der Schluessel-Reihenfolge von
    // jsonb an, und ein Formular mit Ziel, dessen Felder alle benannt sind, bleibt so
    // zeichengleich zu seiner Ausgabe unter 13-1 (Waechter F6b, F6c, F7).
    //
    // DER RELAY-WEG (Phase 13.6, Scheibe 13.6-4; Setzungen P13.6-61 bis P13.6-63 und P13.6-66
    // der Phase 13.6). DIE ENTSCHEIDUNG JE ZIEL FAELLT HIER UND NUR HIER: Ein Formular-Ziel geht
    // ueber das Relay, wenn der Text veroeffentlicht wird (options.hosted), der Modus "export"
    // ist, der Datensparmodus NICHT an ist und die Adresse auf der Host-Liste steht
    // (allowedRelayEndpoint — dieselbe Pruefung, die das Relay selbst faellt). Ein solches Ziel
    // bekommt HINTEN die Marke "relay": true; sie ist ein KONTRAKT im ausgelieferten Text
    // (Setzung P13.6-66, Q2): nachlegen geht, herunternehmen nicht.
    // dataSaver GEHT NIE HINAUS, wie fieldNames: Ein Ziel, das direkt schickt, bleibt so
    // zeichengleich zu seiner Ausgabe vor der Scheibe (Setzung P13.6-63; Waechter RT-10).
    const hosted = options?.hosted === true;
    const table = mappings
      .filter((m) => {
        if (!present.has(m.elementId)) return false;
        if (mode === "export") return m.type !== "text";
        if (mode === "edit") return m.type === "text";
        return true; // preview
      })
      .map((m): Mapping | DeliveredFormTarget => {
        if (m.type !== "formTarget") return m;
        const relay =
          hosted &&
          mode === "export" &&
          m.config.dataSaver !== true &&
          allowedRelayEndpoint(m.config.endpoint) !== null;
        // Die Marke kommt NUR von hier: Ein Schluessel "relay" in einem Mapping aus der
        // Datenbank (Stand des Clients) wird entfernt — sonst truege auch ein Export den
        // Relay-Code (Waechter RT-7b).
        if (
          m.config.fieldNames === undefined &&
          m.config.dataSaver === undefined &&
          !("relay" in m.config) &&
          !relay
        )
          return m;
        const config: DeliveredFormTarget["config"] = { ...m.config };
        delete config.fieldNames;
        delete config.dataSaver;
        delete config.relay;
        if (relay) config.relay = true;
        return { ...m, config };
      });

    // CUSTOM-PIXEL (Phase 11.6, Scheibe 11.6a) — DIE MODUS-GATUNG STEHT HIER UND NUR
    // HIER (Entscheidung P11.6-6, Teil (d)): Der Baustein entsteht AUSSCHLIESSLICH in
    // "export". In der Vorschau gibt es WEDER Lader NOCH Ereigniszeile.
    // DER GRUND IST WIRKUNG, NICHT KONSISTENZ: Der Basis-Code eines Netzwerks setzt beim
    // Laden Cookies und schickt einen Seitenaufruf, und der Vorschau-Rahmen baut sich bei
    // jeder Tipp-Pause neu auf — es entstuenden Ereignisse aus der ARBEIT des Betreibers.
    // Bis zur Phase 13.6 feuerte der Bestand in der Vorschau sehr wohl echtes fbq
    // ("akzeptierte Marketer-eigene-Vorschau-Verschmutzung",
    // docs/claude-history/phase-4-mapping-codegen-export.md). SEIT DER SCHEIBE 13.6-2 GILT
    // DIE GATUNG FUER DIE META-LAUFZEIT EBENSO (buildWiringScript): Die Vorschau sendet nie.
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
    // FORMULAR-ZIEL (Phase 13, Scheibe 13-1): die Laufzeit entsteht NUR im Modus "export"
    // (Setzung P13-30 — im Vorschau-Rahmen ohne allow-forms entsteht ohnehin kein submit,
    // und ein Versand erzeugte echte Leads aus der Arbeit des Betreibers) und NUR, wenn
    // die GEFILTERTE Tabelle ein Formular-Ziel traegt: ein verwaistes wird nicht verdrahtet.
    // Mit einem Formular-Ziel ist table.length > 0, injectScripts darunter also wahr.
    const formTargetLanguage: ConsentLanguage | null =
      mode === "export" && table.some((m) => m.type === "formTarget")
        ? (options?.formTargetLanguage ?? "de")
        : null;
    // DIE EINSETZUNG R2 NUR, WENN EIN ZIEL SIE BRAUCHT (Setzung P13.6-63): Ohne Relay-Ziel ist
    // der Baustein zeichengleich zu dem vor der Scheibe 13.6-4.
    const formTargetRelay = table.some(
      (m) => m.type === "formTarget" && (m.config as { relay?: unknown }).relay === true
    );

    const injectScripts =
      mode !== "export" || table.length > 0 || customPixelCode !== "";
    if (injectScripts) {
      // Datenblock (JSON), sicher kodiert: jedes "<" als Unicode-Escape maskiert
      // verhindert den "</script>"-Ausbruch und schuetzt zugleich URLs mit "<".
      // SEIT SCHEIBE 13-1 UEBER embedInScript (Setzung P13-28 der Phase 13): derselbe
      // Ausdruck, jetzt mit Namen — die Ausgabe ist zeichengleich, und die Adressen des
      // Formular-Ziels gehen damit woertlich ueber den Helfer (Invariante I7).
      const json = embedInScript(table);
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
        customHasEventLine,
        formTargetLanguage,
        formTargetRelay
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
