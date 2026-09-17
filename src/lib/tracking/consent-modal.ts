// DAS CENTER-MODAL (Phase 11.5, Scheibe 11.5d-2). Erzeugt EINEN Script-Block, der in der
// Mitte der publizierten Seite ein Fenster ueber einer Abdunkelung anlegt, mit denselben
// Schaltern und Knoepfen wie die Leiste — seit Scheibe 11.5e-1 zwei Gruppen-Schalter und
// drei gleichwertige Knoepfe. SEIT SCHEIBE 11.13a ERSCHEINT ES EINGEKLAPPT: zwei
// gleichwertige Knoepfe und ein Weg "Einstellungen"; der Klick stellt die Gestalt oben
// her. Der Widerruf oeffnet ausgeklappt. Reiner String-Bau: kein React, kein Netzwerk, keine
// Datenbank, kein server-seitiges Parsen.
//
// KEIN `import "server-only"`, aus demselben Grund wie in consent-bar.ts: Eine
// server-only-Datei ist aus erzeugtem Browser-Code nicht erreichbar.
//
// LEISTE UND MODAL SIND ZWEI BLOECKE, NICHT EINER MIT SCHALTER. Geteilt werden allein
// Konstanten, die zur BAUZEIT eingesetzt werden — die Schnittstelle, und aus
// consent-choice.ts der Sachtext, das Stylesheet der Schalter und seit Scheibe 11.5e-1 ein
// Code-Stueck (CONSENT_CHOICE_JS) mit Schaltern, Knoepfen und Aufloesung. Ein Laufzeit-Helfer
// entsteht nicht. Welcher Block entsteht, entscheidet consentBlocksFor in
// src/lib/analytics/pageview-emitter.ts, und nur dort.
//
// HIER STEHT KEIN URTEIL UEBER DEN HOOK UND KEIN ZWEITER SCHREIBWEG — wie bei der Leiste:
// Die Knoepfe rufen write() der Schnittstelle aus consent-store.ts.
//
// KEINE SCROLL-SPERRE, IN KEINER GESTALT (bindende Entscheidung (20) der Phase 11.5). An
// `html`, `body` und `head` setzt der Block NICHTS — keinen Stil, keine Klasse, kein
// Attribut. Der einzige Eingriff ausserhalb des Schattenbaums ist das Anhaengen des Hosts
// an `body`, dieselbe Bauform wie die Leiste. M12 in consent-modal.test.ts haelt das.
// Die Seite dahinter wird nicht gesperrt; ob und wie sie hinter der Abdunkelung scrollt,
// haengt an der Seite selbst. Das ist der benannte Preis.
//
// DIE EINZIGE RUECKNAHME IST DAS ENTFERNEN DES HOSTS, im `finally` der Knopf-Handler.
// KEIN Escape-Handler, KEIN Listener an der Abdunkelung, KEIN Listener an den Schaltern,
// KEIN zweiter Weg: Die Abdunkelung faengt Klicks und tut sonst nichts. M13 haelt das.
//
// KEIN PROGRAMMATISCHER FOKUS und KEIN `aria-modal`: Ein Fokus-Wechsel naehme einem
// fremden Element den Fokus, und `aria-modal` verspraeche eine Fokus-Falle, die es nicht
// gibt.
//
// SERIALISIERUNGSSICHER WIE DIE LEISTE: Der Rumpf enthaelt KEIN EINZIGES `<`. Markup
// entsteht per createElement, Texte per textContent, jeder String per JSON.stringify.
// M3 haelt das.

import { CONSENT_STORE_API } from "@/lib/tracking/consent-store";
import {
  CONSENT_CHOICE_CSS,
  CONSENT_CHOICE_JS,
  CONSENT_TEXT,
} from "@/lib/tracking/consent-choice";
import {
  wrapRevoke,
  type ConsentSurfaceMode,
} from "@/lib/tracking/consent-revoke";

/**
 * Kennung des Blocks, `__ps_`-namespaced wie `__ps_cnr`, `__ps_clb`, `__ps_cns` und
 * `__ps_pve`. SIE DARF KEINE DER ZEICHENKETTEN ENTHALTEN, NACH DENEN DER BESTAND IM
 * AUSGELIEFERTEN TEXT SUCHT: `pagesmith-consent`, `pagesmith-mappings`, `__ps_cnr`,
 * `__ps_cns`, `__ps_pv`, `__ps_clb`, `pagesmith-bar`. M4 in consent-modal.test.ts haelt
 * das, in beide Richtungen.
 */
export const CONSENT_MODAL_SCRIPT_ID = "__ps_cmo";

/**
 * Das Host-Element des Modals. EIN EIGENER ELEMENTNAME: Regeln der Seite auf `div`
 * treffen ihn nicht, und er traegt weder `pagesmith-consent` noch `pagesmith-bar`.
 */
export const CONSENT_MODAL_HOST_TAG = "pagesmith-modal";

/** Zugaenglicher Name des Fensters. */
export const CONSENT_MODAL_DIALOG_LABEL = "Einwilligung";

/**
 * Das Basis-Stylesheet im Schattenbaum; CONSENT_CHOICE_CSS wird angehaengt. Der Host deckt
 * das ganze Fenster ab; die Abdunkelung fuellt ihn, das Fenster sitzt mittig darueber. ALLE
 * DREI KNOEPFE TRAGEN DIESELBE REGEL.
 * DER BARE `button`-SELEKTOR TRIFFT AUCH DEN WEG (Scheibe 11.13a); was ihn unauffaellig
 * macht, steht klassen-gebunden in CONSENT_CHOICE_CSS unter `.way`.
 * `.way{flex:0 0 100%}` STEHT NUR HIER UND NICHT IM GETEILTEN STYLESHEET — es gilt dem
 * MODAL allein (ARCHITEKT-ENTSCHEIDUNG 2026-09-17, Guardrail der Roadmap-Zeile 11.13,
 * Punkt (h)). GEMESSEN am 2026-09-17: Das Fenster ist bei 390 px Fensterbreite 326 px
 * innen breit, zwei Knoepfe zu 160 px plus 8 px Abstand brauchen 328 — „Alle akzeptieren"
 * stand dann allein, und „Ablehnen" teilte die Reihe mit dem Weg. DAS LIEST SICH ALS
 * NACHRANGIG. Mit einer eigenen Reihe fuer den Weg teilt kein Knopf seine Reihe mit ihm.
 * ES IST EINE REGEL AUF `.way`, KEIN EINGRIFF AN DER `button`-REGEL, und der ausgeklappte
 * Zustand kennt kein `.way`-Element — er ist unberuehrt.
 * `max-height` UND `overflow` AM FENSTER SIND ABSICHT (Invariante I1 der Scheibe
 * 11.5d-2): Ohne eigenen Scroll-Bereich laegen die Knoepfe auf einem niedrigen
 * Bildschirm unter dem Rand, waehrend die Abdunkelung jeden Klick faengt — die Seite
 * waere unbedienbar. Beides wirkt allein im eigenen Schattenbaum.
 */
const CONSENT_MODAL_CSS =
  ":host{all:initial !important;display:block !important;position:fixed !important;" +
  "top:0 !important;right:0 !important;bottom:0 !important;left:0 !important;" +
  "z-index:2147483647 !important;}" +
  ".backdrop{position:absolute;top:0;right:0;bottom:0;left:0;background:rgba(17,24,39,0.6);}" +
  ".dialog{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);" +
  "box-sizing:border-box;width:calc(100% - 32px);max-width:420px;" +
  "max-height:calc(100% - 32px);overflow:auto;" +
  "display:flex;flex-wrap:wrap;gap:8px;justify-content:center;align-items:center;" +
  "padding:20px 16px;background:#ffffff;color:#111827;border:1px solid #d1d5db;border-radius:8px;" +
  'font:14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}' +
  ".text{margin:0 0 4px;flex:1 1 100%;text-align:center;}" +
  "button{box-sizing:border-box;min-width:160px;margin:0;padding:10px 16px;" +
  "border:1px solid #111827;border-radius:6px;background:#ffffff;color:#111827;" +
  "font:inherit;font-weight:600;cursor:pointer;}" +
  "button:focus-visible{outline:2px solid #2563eb;outline-offset:2px;}" +
  ".way{flex:0 0 100%;}";

/**
 * Der Block — `<script id="__ps_cmo">` im Modus "load", `<script id="__ps_crv">` im Modus
 * "revoke" (Scheibe 11.5e-2). Spiegel der Leiste: BEIDE GESTALTEN BAUEN AUS DEMSELBEN
 * STRING auf (`aufbauDesFensters`); die Byte-Gleichheit des Lade-Zweigs zur Fassung vor
 * der Scheibe 11.5e-2 ist mit der Scheibe 11.13a abgelaufen, und W0 ist gestrichen — die
 * Begruendung steht am Docblock von `buildConsentBarScript`. Der Widerruf-Zweig traegt die
 * zwei Wachen nicht — seine Vorbedingung ist ihre Umkehrung und steht am Docblock von
 * `wrapRevoke`.
 * Alles Folgende beschreibt den Lade-Zweig.
 *
 * DAS MODAL ERSCHEINT UNTER DENSELBEN ZWEI BEDINGUNGEN WIE DIE LEISTE, WOERTLICH
 * WIEDERHOLT: der Hook ist ungesetzt, und `read()` liefert "never". Die Begruendung
 * beider Bedingungen, samt der bekannten Redundanz der zweiten, steht am Docblock von
 * `buildConsentBarScript` und wird hier nicht verdoppelt. M15 haelt die zwei Zeilen in
 * beiden Bloecken zeichengleich; M6 und M8 fangen ihr Entfernen hier.
 *
 * OHNE attachShadow KEIN MODAL — FAIL-CLOSED, wie bei der Leiste.
 *
 * DER KLICK: „Alle akzeptieren" schreibt alle sechs Schluessel, „Ablehnen" eine leere Liste,
 * „Auswahl speichern" die Schluessel der gewaehlten Gruppen (Scheibe 11.5e-1; die Aufloesung
 * steht an CONSENT_CHOICE_JS). Danach wird der Host entfernt — im `finally`, also AUCH, WENN
 * write() `false` LIEFERT ODER WIRFT. Bliebe das Modal offen, fing die Abdunkelung weiter
 * jeden Klick.
 *
 * `body.appendChild(host)` IST DIE LETZTE ANWEISUNG (Invariante I3 der Scheibe 11.5d-2; seit
 * Scheibe 11.5e-1 ausdruecklich fuer JEDEN Listener des Blocks, auch einen kuenftigen an einem
 * Gruppen-Schalter): Alle Listener sind gebunden, bevor die Abdunkelung im Dokument steht.
 * M14 haelt das.
 *
 * DIE SCHLUESSEL KOMMEN AUS ALL_CONSENT_KEYS bzw. CONSENT_GROUP_KEYS, nie aus einer zweiten
 * Liste.
 */
/**
 * DER AUFBAU DES FENSTERS — EIN STRING, DREI EINSETZUNGEN (Scheibe 11.5e-2; die dritte
 * seit Scheibe 11.13a).
 * Spiegel von `aufbauDerLeiste` in consent-bar.ts; die Begruendung steht dort und wird
 * hier nicht verdoppelt. Die drei Platzhalter sind dieselben: `abbruch` fuer die
 * Rueckkehr-Anweisung der zwei Moeglichkeits-Wachen, `vormerken` fuer die Zeile vor dem
 * Einhaengen, `ausgeklappt` fuer den Startzustand von `fillChoice`.
 */
function aufbauDesFensters(
  abbruch: string,
  vormerken: string,
  ausgeklappt: string
): string {
  return `  var body = document.body;
  if (!body) ${abbruch}
  var host = document.createElement(${JSON.stringify(CONSENT_MODAL_HOST_TAG)});
  if (typeof host.attachShadow !== "function") ${abbruch}
  var root = host.attachShadow({ mode: "open" });
  var style = document.createElement("style");
  style.textContent = ${JSON.stringify(CONSENT_MODAL_CSS + CONSENT_CHOICE_CSS)};
  root.appendChild(style);
  var backdrop = document.createElement("div");
  backdrop.setAttribute("class", "backdrop");
  root.appendChild(backdrop);
  var dialog = document.createElement("div");
  dialog.setAttribute("class", "dialog");
  dialog.setAttribute("role", "dialog");
  dialog.setAttribute("aria-label", ${JSON.stringify(CONSENT_MODAL_DIALOG_LABEL)});
  var text = document.createElement("p");
  text.setAttribute("class", "text");
  text.textContent = ${JSON.stringify(CONSENT_TEXT)};
  dialog.appendChild(text);
${CONSENT_CHOICE_JS}
  fillChoice(dialog, ${ausgeklappt});
  root.appendChild(dialog);
${vormerken}  body.appendChild(host);
`;
}

export function buildConsentModalScript(mode: ConsentSurfaceMode): string {
  if (mode === "revoke") {
    return wrapRevoke(
      aufbauDesFensters("return false;", "    offen = host;\n", "true")
    );
  }
  return `<script id="${CONSENT_MODAL_SCRIPT_ID}">
(function(){
  if (window.pagesmithConsent !== undefined) return;
  var api = window.${CONSENT_STORE_API};
  if (!api || typeof api.read !== "function" || typeof api.write !== "function") return;
  if (api.read().state !== "never") return;
${aufbauDesFensters("return;", "", "false")}})();
</script>`;
}
