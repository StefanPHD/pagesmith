// CUSTOM-PIXEL: DER BETREIBER-SNIPPET UND DIE EREIGNISZEILE (Phase 11.6, Scheibe 11.6a).
//
// Erzeugt den Laufzeit-JS-Text, der ins Wiring-Script (generate.ts) gesplicet wird.
// Reiner String-Bau, kein DOM, kein React, kein Netzwerk, keine Datenbank.
//
// WARUM EINE EIGENE DATEI — die Begruendung ist nicht meine, sie steht im Repo:
// tracking/meta.ts weist sich im Kopf als "ISOLIERTE Einheit" aus, "damit Plattform #2 …
// als PARALLELE Einheit dazukommt, ohne diese anzufassen — KEINE generische Registry,
// solange nur Meta existiert". Das Custom-Pixel IST dieser zweite Fall: nach der Messung
// der Aufklaerung ist Meta bis heute das EINZIGE Ziel mit einem Browser-Tag. Die
// Naht-Entscheidung der Phase 11 sagt dasselbe von der anderen Seite: "KEINE ABSTRAKTION:
// EINE DATEI, EINE FUNKTION, DER ANBIETER IM NAMEN."
//
// KEIN `import "server-only"` und kein `"use client"`: Der Erzeuger laeuft im
// CLIENT-Pfad (generateFunctional) und muss aus ihm erreichbar sein — derselbe Grund,
// den META_CONSENT_TARGET in tracking/consent.ts nennt.
//
// HIER STEHT KEIN ZWEITES URTEIL UEBER DIE EINWILLIGUNG. Die Regel lebt unveraendert in
// tracking/consent.ts (`window.__psConsent`); dieser Baustein FRAGT sie, mit einem
// EIGENEN Aufruf fuer den Schluessel `custom`.
// WARUM EIGENER AUFRUF UND NICHT UEBER DIE ZIEL-LISTE (Invariante I7): Jene Liste speist
// die Oder-Kette der Wache 4 in __psMetaFire UND das Draht-Feld `cns` des Beacons. Ein
// `custom` darin stuende sofort im Draht und damit vor dem Server — der aber von
// Custom-Pixel nichts weiss und den Schluessel ueber CONSENT_KEY_BY_TARGET nie
// aufloesen koennte.
//
// SERIALISIERUNGSSICHER: enthaelt kein literales </script> und kein literales </body>.

import { CUSTOM_CONSENT_TARGET } from "@/lib/tracking/consent";
import { embedInScript } from "@/lib/script-embed";

/**
 * Der interne globale Name, ueber den ein SPAETER laufender Block den Lader nachholen
 * kann (Entscheidung P11.6-6, Teil (b) und (g)).
 *
 * ER IST INTERN UND VERLETZT P11.6-1 NICHT: Jene Setzung ("KEIN neuer globaler Name")
 * zielt auf einen Namen, den ein BETREIBER aufrufen soll. Dieser ist `__ps`-namespaced
 * wie `__psPageView` und `__psConsentStore` und steht in keiner Betreiber-Dokumentation.
 *
 * DER PREIS STEHT TROTZDEM HIER, weil er echt ist: Auch ein interner Name ist eine
 * EINBAHNSTRASSE — er steht ab dem ersten Publish in fremden Seiten, und ein Deploy
 * erreicht sie nicht. Die Existenzpruefung am Aufrufer (consent-store.ts, `write`) macht
 * einen spaeteren Bruch zusaetzlich UNSICHTBAR: fehlt der Name, passiert nichts.
 * WER IHN UMBENENNT, BRICHT DIE NACHHOL-KETTE STILL.
 */
export const CUSTOM_LOAD_API = "__psCustomLoad";

/**
 * Der Laufzeit-Text des Custom-Bausteins. Wird in die IIFE von buildWiringScript
 * gesplicet, DIREKT nach der MODE-Zeile und VOR dem Meta-Block.
 *
 * ZWEI BAU-ZEIT-GEGATETE TEILE, und die Gatung ist der Beweis fuer Invariante I5/T9:
 * Ohne Snippet UND ohne Ereigniszeile liefert die Funktion "" — der erzeugte Text ist
 * dann ZEICHENGLEICH zu dem vor dieser Scheibe. Dieselbe Bauform wie buildMetaRuntime,
 * die bei fehlendem Pixel UND fehlendem Beacon-Rumpf ebenfalls "" liefert.
 *
 * WAS DER LADER TUT — und warum in dieser Reihenfolge:
 *
 * (1) ER URTEILT NICHT BEIM PARSEN, SONDERN BEI `DOMContentLoaded`. Das ist der zentrale
 *     Zwang dieser Scheibe und GEMESSEN (CC, 2026-09-19): generateFunctional haengt
 *     seine Bloecke als LETZTE Kinder an `body`; injectPageViewEmitter setzt seinen Block
 *     bei `lastIndexOf("</" + "body>")` ein und landet damit DAHINTER. Zum Zeitpunkt, zu
 *     dem dieser Text geparst wird, haben Wiederherstellung und Setzer also NOCH NICHT
 *     gelaufen, und `window.pagesmithConsent` ist noch `undefined` — das Gate saehe
 *     "nichts gesetzt" und damit "erlaubt". EIN URTEIL BEIM PARSEN WUERDE DEN SNIPPET
 *     TROTZ GESPEICHERTER ABLEHNUNG LADEN.
 *     Heute faellt das niemandem auf, weil das Wiring ausschliesslich auf KLICK urteilt
 *     und ein Klick immer nach dem Parsen kommt. Fuer einen Baustein, der beim LADEN
 *     urteilt, ist es der Unterschied zwischen richtig und falsch.
 *     Alle server-injizierten Bloecke sind INLINE und damit vor `DOMContentLoaded` fertig.
 *
 * (2) NACHVERSUCH BEIM KLICK (P11.6-6, Teil (b)). Ein FREMDES CMP setzt den Hook
 *     regelmaessig ERST NACH `DOMContentLoaded` — nach einer eigenen Netzanfrage oder
 *     nach der Besucher-Entscheidung. Ohne Nachversuch bliebe der Basis-Code fuer die
 *     ganze Sitzung ungeladen, obwohl der Besucher zugestimmt hat, und die Ereigniszeile
 *     liefe ins Leere. DER BRUCH WAERE STILL: kein Fehler, nur fehlende Conversions.
 *     DAS IST NICHT DERSELBE WEG WIE CUSTOM_LOAD_API: Jener deckt den Fall, in dem UNSER
 *     Dialog eine Zustimmung entgegennimmt (`write` ruft ihn). Dieser deckt den Fall, in
 *     dem ein fremdes CMP den Hook setzt, ohne dass `write` je laeuft. Beide sind noetig.
 *
 * (3) SEQUENZIELLES EINFUEGEN, BEI `src`-SCRIPTS WIRD AUF `load`/`error` GEWARTET
 *     (P11.6-6, Teil (c)). Echte Snippets bestehen regelmaessig aus einem
 *     Bibliotheks-Script mit `src` und einem Inline-Script dahinter, das die Bibliothek
 *     benutzt. In einem Zug eingefuegt, liefe das Inline-Script SOFORT und die
 *     Bibliothek waere noch nicht da.
 *     EIN `error` FUEHRT WEITER, es bricht NICHT ab: Ein Adblocker blockt regelmaessig
 *     genau das erste Script; ein Abbruch naehme dem Betreiber auch die Netzwerke, die
 *     nicht geblockt sind. Der Ladezustand wird am `load`/`error` des ELEMENTS abgelesen,
 *     nicht an einem globalen Stub — docs/immer-beachten.md,
 *     "DRITTANBIETER-SCRIPT-LADEPRUEFUNG am load/error-Event des SCRIPT-ELEMENTS".
 *
 * (4) `innerHTML` WUERDE NICHT LAUFEN. Per innerHTML eingefuegte <script>-Elemente
 *     fuehrt der Browser nicht aus (Eigenschaft des Formats, in diesem Projekt NICHT
 *     gemessen). Deshalb wird der Snippet mit DOMParser geparst und jedes Script als
 *     FRISCHES Element neu gebaut.
 *     DAS IST CLIENT-SEITIGES PARSEN IN DER AUSGELIEFERTEN SEITE und kein Verstoss gegen
 *     "KEIN SERVER-SEITIGES HTML-PARSING" — jene Regel gilt dem Server.
 *
 * (5) ANGEHAENGT WIRD AN `document.head`. Das Einfuegen NEUER Elemente faellt NICHT unter
 *     die fuenf Achsen von "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT
 *     EINEN FREMDEN KNOTEN AN" (Stil, Klasse, Attribut, Scroll-Position, Fokus). Jene
 *     Regel zieht ihre Grenze selbst und nennt "das Einfuegen des fbevents-Scripts per
 *     insertBefore" ausdruecklich als NICHT erfasst. Dieser Lader liegt in derselben
 *     Klasse: Er aendert an keinem vorhandenen Knoten eine der fuenf Achsen.
 *
 * (6) `<noscript>` ERREICHT DIE ZIELSEITE NICHT — DREIFACH GESICHERT, UND JEDE STUFE HAT
 *     EINEN EIGENEN GRUND:
 *
 *     WOGEGEN DAS STEHT: Ein `<noscript><img src="…">` ist ein Rueckfall-Pixel fuer
 *     Besucher OHNE JavaScript. Landet sein `<img>` in der LIVE-Seite, wo Skripting AN
 *     ist, haengt es dort als gewoehnliches Bild UND LAEDT. Das Netzwerk bekaeme ZWEI
 *     Seitenaufrufe — einen vom Script, einen vom Rueckfall —, die Zahlen des Betreibers
 *     waeren doppelt, und niemand saehe einen Fehler.
 *
 *     STUFE (a) — DER BODY-KONTEXT. Geparst wird `"<body>" + PS_CUSTOM_CODE`, nicht der
 *     nackte Snippet. GRUND, und er ist GEMESSEN (CC, 2026-09-19, jsdom 27 unter vitest):
 *     Im KOPF-Kontext schliesst der Parser bei ausgeschaltetem Skripting das `<noscript>`
 *     vor dem `<img>` und hebt das Bild in den Body — `head.innerHTML` war
 *     `<noscript></noscript>`, das `<img>` stand als EIGENSTAENDIGER Knoten im Body und
 *     war ueber das `<noscript>` gar nicht mehr erreichbar. Im BODY-Kontext bleibt
 *     `<noscript>` ein gewoehnliches Element MIT Kindern (gemessen: `noscript.kinder = 1`,
 *     erstes Kind `IMG`). Die Einfuegemodi sind "in head noscript" gegen "in body".
 *     OHNE (a) GREIFEN (b) UND (c) INS LEERE — sie sehen das Bild nie.
 *
 *     STUFE (b) — JEDES `<noscript>` WIRD AUS DEM GEPARSTEN DOKUMENT ENTFERNT, auch ein
 *     VERSCHACHTELTES. Das ist noetig, weil `importNode(…, true)` TIEF klont: Ein
 *     `<noscript>` in einem `<div>` kaeme sonst mit dem `<div>` mit, und die
 *     Ueberspring-Zeile sieht nur die oberste Ebene.
 *     DAS DOKUMENT IST INERT — es stammt aus DOMParser, haengt an keiner Seite und hat
 *     keinen Browsing-Kontext. Hier wird also KEIN fremder Knoten beruehrt; die Regel
 *     "KEIN BAUSTEIN DES AUSGELIEFERTEN TEXTES FASST ZUR LAUFZEIT EINEN FREMDEN KNOTEN
 *     AN" ist nicht einmal im Umkreis. Entfernt wird aus UNSERER eigenen Zerlegung, bevor
 *     irgendetwas die Zielseite erreicht.
 *
 *     STUFE (c) — DIE UEBERSPRING-ZEILE IN DER SCHLEIFE BLEIBT als zweite Sicherung.
 *     Sie ist nach (b) rechnerisch unerreichbar und wird NICHT gestrichen: Sie kostet
 *     nichts und faengt jeden Parser, der ein `<noscript>` erzeugt, das (b) nicht
 *     gefunden hat.
 *
 *     WAS DABEI NICHT VERLORENGEHT: Der Rueckfall kann auf diesem Pfad ohnehin nie seinen
 *     Zweck erfuellen — er greift nur bei ausgeschaltetem Skripting, und dann laeuft
 *     dieser Lader gar nicht. Fuer die Betreiber-Dokumentation: Vorrat P11.6-4.
 *
 * DER GANZE EINFUEGE-VORGANG LIEGT IN EINEM try/catch: Der Lader wird auch aus dem
 * Klick-Handler gerufen (Nachversuch), und ein Wurf dort naehme den Redirect mit
 * (Invariante I3).
 *
 * DER SNIPPET REIST ALS WERT UEBER embedInScript (Entscheidung P11.6-5, Teil (3)):
 * JSON.stringify, danach jedes `<` als Unicode-Escape. Ein `</` + `script>` im
 * Betreiber-Code verlaesst den Block damit NICHT. Das Escape lebt im QUELLTEXT; der zur
 * Laufzeit gelesene String traegt wieder das echte Zeichen und ist ausfuehrbar.
 * ER IST DIE EINZIGE BETREIBER-EINGABE DIESER DATEI, DIE HIER EINGEBETTET WIRD — die
 * Ereigniszeile reist ueber den JSON-Datenblock von generateFunctional, der dieselbe
 * Maskierung seit jeher traegt.
 */
export function buildCustomPixelRuntime(
  code: string,
  hasEventLine: boolean
): string {
  const hasLoader = code !== "";
  if (!hasLoader && !hasEventLine) return "";

  // DAS URTEIL — EINE Stelle fuer beide Verbraucher. Die Existenzpruefung ist KEIN
  // zweites Urteil, sondern die Frage, OB eines da ist: fehlt das Gate, ist NICHT
  // bekannt, ob eingewilligt wurde -> fail-closed. Zeichengleiche Denkfigur wie in
  // __psMetaInit und im PageView-Emitter.
  const ok = `
  function __psCustomOk() {
    if (typeof __psConsent !== "function") return false;
    return __psConsent(${embedInScript(CUSTOM_CONSENT_TARGET)}) === true;
  }`;

  const loader = hasLoader
    ? `
  var PS_CUSTOM_CODE = ${embedInScript(code)};
  var __psCustomDone = false;
  function __psCustomRun() {
    if (__psCustomDone) return;
    if (!__psCustomOk()) return;
    __psCustomDone = true;
    try {
      var __d = new DOMParser().parseFromString("<body>" + PS_CUSTOM_CODE, "text/html");
      var __ns = __d.querySelectorAll("noscript");
      for (var __m = 0; __m < __ns.length; __m++) {
        if (__ns[__m].parentNode) __ns[__m].parentNode.removeChild(__ns[__m]);
      }
      var __q = [], __k;
      if (__d.head) for (__k = 0; __k < __d.head.childNodes.length; __k++) __q.push(__d.head.childNodes[__k]);
      if (__d.body) for (__k = 0; __k < __d.body.childNodes.length; __k++) __q.push(__d.body.childNodes[__k]);
      var __i = 0;
      var __step = function () {
        while (__i < __q.length) {
          var __n = __q[__i++];
          if (__n.nodeType !== 1) continue;
          if (__n.tagName === "NOSCRIPT") continue;
          if (__n.tagName === "SCRIPT") {
            var __s = document.createElement("script");
            for (var __a = 0; __a < __n.attributes.length; __a++) {
              __s.setAttribute(__n.attributes[__a].name, __n.attributes[__a].value);
            }
            __s.text = __n.textContent || "";
            if (__n.hasAttribute("src")) {
              __s.onload = __step;
              __s.onerror = __step;
              document.head.appendChild(__s);
              return;
            }
            document.head.appendChild(__s);
            continue;
          }
          document.head.appendChild(document.importNode(__n, true));
        }
      };
      __step();
    } catch (e) {}
  }
  window[${embedInScript(CUSTOM_LOAD_API)}] = __psCustomRun;
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", __psCustomRun);
  } else {
    __psCustomRun();
  }`
    : "";

  // DIE EREIGNISZEILE. Sie bekommt KEINE Parameter (P11.6-6, Teil (e)); `new Function`
  // erzeugt sie im GLOBALEN Geltungsbereich, sie sieht also weder `cfg` noch `eid` noch
  // sonst etwas aus dieser IIFE — nur das, was der Basis-Code global abgelegt hat.
  // KEIN ZWISCHENSPEICHER: Je Klick wird neu uebersetzt. Ein Klick ist selten, der Text
  // kurz (TRACK_CODE_MAX_LENGTH), und ein Speicher je Zeichenkette waere Zustand ohne
  // Gegenwert.
  // SIE HAT IHRE EIGENE EINWILLIGUNGS-PRUEFUNG (P11.6-6, Teil (a)) und ERBT NICHT die
  // des Laders: Ein Betreiber kann in die Zeile auch einen eigenen `fetch` schreiben —
  // die Zeile ist ein eigener Sender, nicht nur eine Bedienung des Laders.
  const fire = hasEventLine
    ? `
  function __psCustomFire(__c) {
    if (!__c) return;
    if (!__psCustomOk()) return;
    try { new Function(__c)(); } catch (e) {}
  }`
    : "";

  return `${ok}${loader}${fire}`;
}

/**
 * Die Anweisung im Track-Zweig des Wiring-Handlers — analog zu metaTrackStatement.
 *
 * ZWEI FRAGEN, ZWEI PARAMETER, und die Trennung ist noetig: Ein Projekt kann eine
 * Ereigniszeile tragen OHNE Snippet (dann gibt es kein __psCustomRun) und einen Snippet
 * OHNE jede Ereigniszeile (dann gibt es kein __psCustomFire). Ein einzelnes Flag
 * erzeugte in beiden Faellen einen Aufruf auf einen nicht existierenden Namen — und der
 * wuerfe im Klick-Handler, VOR dem Redirect.
 *
 * DER NACHVERSUCH STEHT VOR DER ZEILE (P11.6-6, Teil (b)): erst laden, dann feuern.
 * Umgekehrt liefe die erste Conversion eines Besuchers ins Leere, dessen Einwilligung
 * ein fremdes CMP spaet gesetzt hat.
 *
 * KEINE der beiden Anweisungen kann werfen: __psCustomRun kapselt sein Einfuegen,
 * __psCustomFire seine Uebersetzung und Ausfuehrung (Invariante I3).
 */
export function customTrackStatement(
  hasLoader: boolean,
  hasEventLine: boolean
): string {
  if (!hasEventLine) return "";
  const run = hasLoader ? "__psCustomRun();\n            " : "";
  return `${run}__psCustomFire(a.config && a.config.code);`;
}
