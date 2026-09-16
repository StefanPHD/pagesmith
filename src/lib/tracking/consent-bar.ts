// DIE EINWILLIGUNGS-LEISTE (Phase 11.5, Scheibe 11.5d). Erzeugt EINEN Script-Block, der
// am unteren Rand der publizierten Seite eine Leiste anlegt — der erste Baustein im
// ausgelieferten Text, der SICHTBARES DOM erzeugt. Seit Scheibe 11.5e-1 traegt sie zwei
// Gruppen-Schalter und drei gleichwertige Knoepfe; beides kommt aus consent-choice.ts.
// Reiner String-Bau: kein React, kein Netzwerk, keine Datenbank, kein server-seitiges
// Parsen. Das DOM entsteht erst im Browser des Besuchers.
//
// KEIN `import "server-only"`, aus demselben Grund wie in consent-setter.ts und
// consent-store.ts: Eine server-only-Datei ist aus erzeugtem Browser-Code nicht
// erreichbar.
//
// HIER STEHT KEIN URTEIL UEBER DEN HOOK UND KEIN ZWEITER SCHREIBWEG. Die Leiste fragt
// die Schnittstelle aus consent-store.ts (CONSENT_STORE_API) und ruft deren write();
// den Speicher und den Hook fasst sie nie selbst an.
//
// DER STIL LIEGT IN EINEM SCHATTENBAUM am eigenen Host-Element: Selektoren der Seite
// treffen Elemente darin nicht, und die Regeln am Host tragen !important im inneren
// Baum. Wie ein Browser das gegen fremdes !important und fremde Stapel-Ebenen
// tatsaechlich aufloest, ist NICHT gemessen — die Testumgebung wertet kein CSS aus;
// das ist eine Live-Achse.
//
// SERIALISIERUNGSSICHER, SCHAERFER ALS DIE NACHBARN: Der Rumpf des Blocks enthaelt
// KEIN EINZIGES `<`. Markup entsteht per createElement, Texte per textContent, jeder
// String geht per JSON.stringify hinein, und der Code kommt ohne `<`-Vergleich aus.
// Damit kann weder ein `</script>` noch ein `</body>` noch ein `<!--` darin stehen.

// WAS HIER STEHT, BETRIFFT NUR DIE LEISTE: Kennung, Host-Element, zugaenglicher Name und
// Basis-Stylesheet. Sachtext, Knoepfe, Schalter und deren Stylesheet teilen Leiste und Modal;
// sie liegen seit Scheibe 11.5e-1 in consent-choice.ts.

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
 * Kennung des Blocks, `__ps_`-namespaced wie `__ps_cnr`, `__ps_cns` und `__ps_pve`.
 * SIE DARF KEINE DER ZEICHENKETTEN ENTHALTEN, NACH DENEN DER BESTAND IM AUSGELIEFERTEN
 * TEXT SUCHT: `pagesmith-consent` (hasConsentScript, Reihenfolge-Tests),
 * `pagesmith-mappings`, `__ps_cnr`, `__ps_cns`, `__ps_pv` (deckt `__ps_pve`). Enthielte
 * der Block eine davon, liesse er eine indexOf-Reihenfolge luegen, ohne rot zu werden.
 * L4 in consent-bar.test.ts haelt das.
 */
export const CONSENT_BAR_SCRIPT_ID = "__ps_clb";

/**
 * Das Host-Element der Leiste — das EINZIGE, was der LADE-Block (`__ps_clb`) ausserhalb
 * seiner sofort ausgefuehrten Funktion hinterlaesst, solange die Leiste offen ist.
 * SEIT SCHEIBE 11.5e-2 STEHT "DER LADE-BLOCK" DA UND NICHT MEHR "DER BLOCK": Derselbe
 * Erzeuger liefert im Modus "revoke" einen ZWEITEN Block (`__ps_crv`), und DER hinterlaesst
 * zusaetzlich den globalen Namen CONSENT_REVOKE_API. Fuer `__ps_clb` gilt der Satz
 * unveraendert — L12 haelt ihn, indem er fuer diesen Block KEINEN neuen globalen Namen
 * zulaesst.
 * EIN EIGENER ELEMENTNAME statt `div`: Regeln der Seite auf `div` treffen ihn nicht.
 * NICHT `pagesmith-consent-bar`: Der Name traegt sonst die Nadel `pagesmith-consent`.
 */
export const CONSENT_BAR_HOST_TAG = "pagesmith-bar";

/** Zugaenglicher Name der Leiste. */
export const CONSENT_BAR_REGION_LABEL = "Einwilligung";

/**
 * Das Basis-Stylesheet im Schattenbaum; CONSENT_CHOICE_CSS wird angehaengt. ALLE DREI
 * KNOEPFE TRAGEN DIESELBE REGEL — gleichwertig heisst hier: kein Knopf ist hervorgehoben.
 * KEIN `overflow`, KEINE Abdunkelung, KEINE Scroll-Sperre: Die Leiste kann eine Seite
 * nicht unbedienbar machen. Verliert sie ihre Stapel-Ebene, ist sie verdeckt, und die
 * Seite bleibt bedienbar. L12 haelt die Abwesenheit von `overflow`.
 */
const CONSENT_BAR_CSS =
  ":host{all:initial !important;display:block !important;position:fixed !important;" +
  "left:0 !important;right:0 !important;bottom:0 !important;" +
  "z-index:2147483647 !important;}" +
  ".bar{box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px;" +
  "justify-content:center;align-items:center;padding:12px 16px;" +
  "background:#ffffff;color:#111827;border-top:1px solid #d1d5db;" +
  'font:14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}' +
  ".text{margin:0;flex:1 1 100%;text-align:center;}" +
  "button{box-sizing:border-box;min-width:160px;margin:0;padding:10px 16px;" +
  "border:1px solid #111827;border-radius:6px;background:#ffffff;color:#111827;" +
  "font:inherit;font-weight:600;cursor:pointer;}" +
  "button:focus-visible{outline:2px solid #2563eb;outline-offset:2px;}";

/**
 * Der Block — `<script id="__ps_clb">` im Modus "load", `<script id="__ps_crv">` im Modus
 * "revoke" (Scheibe 11.5e-2). BEIDE GESTALTEN BAUEN AUS DEMSELBEN STRING auf
 * (`aufbauDerLeiste`); was sie unterscheidet, ist die Huelle und die Vorbedingung.
 *
 * DER LADE-ZWEIG IST BYTE-GLEICH ZUR FASSUNG VOR DER SCHEIBE 11.5e-2 — die tragende
 * Invariante dieser Scheibe, gehalten von W0 gegen einen VOR dem Bau erhobenen
 * Vergleichswert. Alles Folgende beschreibt ihn und gilt fuer "load".
 *
 * DER WIDERRUF-ZWEIG traegt die zwei Wachen unten NICHT; seine Vorbedingung ist ihre
 * UMKEHRUNG, und sie steht samt Begruendung am Docblock von `wrapRevoke`
 * (tracking/consent-revoke.ts). Sie wird hier nicht verdoppelt.
 *
 * DIE LEISTE ERSCHEINT NUR, WENN BEIDE BEDINGUNGEN GELTEN — in dieser Reihenfolge:
 * 1. DER HOOK IST UNGESETZT (`window.pagesmithConsent !== undefined` -> Abbruch).
 *    Dieselbe Pruefung wie im Setzer und in der Wiederherstellung. Der Block steht
 *    ZWISCHEN beiden: Dort ist der Hook genau dann gesetzt, wenn ein Script VOR
 *    unseren Bloecken ihn gesetzt hat (ein fremdes CMP oder jeder andere Code im
 *    Kundentext) ODER die Wiederherstellung eine gespeicherte Entscheidung eingespielt
 *    hat. L6 ist der einzige Test, der diese Bedingung faengt.
 * 2. `read()` LIEFERT "never".
 *    DIESE BEDINGUNG IST AUF DEM PRODUKTIVEN PFAD REDUNDANT, UND DAS IST BEKANNT: Die
 *    Wiederherstellung direkt davor belegt den Hook, sobald read() "decided" liefert —
 *    hinter ihr folgt "never" also schon aus dem ungesetzten Hook. SIE BLEIBT TROTZDEM:
 *    Der Zuschnitt verlangt beide, und ein Block, dessen Fehlschlag JEDEM Besucher eine
 *    Leiste zeigt, vertraegt eine zweite Wache. WER SIE ALS UEBERFLUESSIG STREICHT,
 *    STREICHT DIESE WACHE. Gefangen wird ihr Entfernen allein vom KONSTRUIERTEN Test L8.
 * Ein asynchron setzendes fremdes CMP erfasst keine der beiden; die Leiste erscheint
 * dann trotzdem.
 *
 * OHNE attachShadow KEINE LEISTE — FAIL-CLOSED: Fehlt die Schnittstelle, kehrt der
 * Block zurueck, bevor er irgendetwas anlegt. Der Setzer dahinter lehnt dann ab, und
 * auf einer solchen Seite geht bei eingeschaltetem Schalter NICHTS hinaus, ohne dass
 * der Besucher gefragt werden kann. Wie viele Browser das betrifft, ist ungemessen.
 *
 * DER KLICK: „Alle akzeptieren" schreibt alle sechs Schluessel, „Ablehnen" eine leere
 * Liste, „Auswahl speichern" die Schluessel der gewaehlten Gruppen (Scheibe 11.5e-1; die
 * Aufloesung steht an CONSENT_CHOICE_JS). Danach wird der Host entfernt — im `finally`,
 * also AUCH, WENN write() `false` LIEFERT ODER WIRFT. Offen zu bleiben hiesse, der
 * Besucher klickt ins Leere.
 * DER PREIS, UND ER IST STILL: Liefert write() bei „Alle akzeptieren" `false` (etwa
 * weil der Speicher gesperrt ist), bleibt der Hook bei sechs `false`, und auf dieser
 * Seite geht NICHTS hinaus. Auf der Live-Seite gibt es keinen Fehlerkanal; beim
 * naechsten Laden erscheint die Leiste wieder. Fail-closed.
 *
 * NACH DEM KLICK BLEIBT AM DOKUMENT NICHTS ZURUECK: kein Stil ausserhalb des
 * Schattenbaums, kein globaler Name, kein Listener ausserhalb des Hosts, kein Attribut
 * an `html` oder `body`. Absichtlich zurueck bleiben allein Speicherwert und Hook, und
 * die setzt write().
 *
 * `body.appendChild(host)` IST DIE LETZTE ANWEISUNG (Invariante I3 der Scheibe 11.5e-1):
 * JEDER Listener des Blocks ist gebunden, bevor die Leiste im Dokument steht. L14 haelt das.
 *
 * DIE SCHLUESSEL KOMMEN AUS ALL_CONSENT_KEYS bzw. CONSENT_GROUP_KEYS, nie aus einer zweiten
 * Liste.
 */
/**
 * DER AUFBAU DER LEISTE — EIN STRING, ZWEI EINSETZUNGEN (Scheibe 11.5e-2).
 *
 * Er traegt alles ab `document.body` bis zum Einhaengen. Die zwei Gestalten des Blocks
 * unterscheiden sich allein in zwei Platzhaltern:
 * - `abbruch` — die Rueckkehr-Anweisung der zwei Moeglichkeits-Wachen (`document.body`
 *   und `attachShadow`). Im Lade-Zweig `return;`, im Widerruf-Zweig `return false;`.
 * - `vormerken` — im Widerruf-Zweig die Zeile, die das Host-Element merkt, unmittelbar
 *   VOR dem Einhaengen; im Lade-Zweig LEER.
 *
 * WARUM EIN STRING UND NICHT ZWEI: Zwei Stellen, die dieselbe Oberflaeche bauen, laufen
 * auseinander — dieselbe Divergenz-Bauform, gegen die in dieser Phase schon die
 * Entscheidungen (4), (5) und (14) stehen, und die Vorrat (16) an zwei Erzeugern desselben
 * Gate-Blocks bereits als eingetreten fuehrt. Es ist die Bauform von
 * `buildPageViewScript` ("ZWEI EXPLIZITE ZWEIGE AM PARAMETER, EIN RUMPF") und von
 * CONSENT_CHOICE_JS.
 *
 * DIE BYTE-GLEICHHEIT DES LADE-ZWEIGS HAENGT AN DEN ZWEI PLATZHALTERN, und deshalb steht
 * es hier: Mit `abbruch = "return;"` und `vormerken = ""` muss der erzeugte Text ZEICHEN
 * FUER ZEICHEN der Fassung vor dieser Scheibe entsprechen. W0 haelt den Wert.
 */
function aufbauDerLeiste(abbruch: string, vormerken: string): string {
  return `  var body = document.body;
  if (!body) ${abbruch}
  var host = document.createElement(${JSON.stringify(CONSENT_BAR_HOST_TAG)});
  if (typeof host.attachShadow !== "function") ${abbruch}
  var root = host.attachShadow({ mode: "open" });
  var style = document.createElement("style");
  style.textContent = ${JSON.stringify(CONSENT_BAR_CSS + CONSENT_CHOICE_CSS)};
  root.appendChild(style);
  var bar = document.createElement("div");
  bar.setAttribute("class", "bar");
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", ${JSON.stringify(CONSENT_BAR_REGION_LABEL)});
  var text = document.createElement("p");
  text.setAttribute("class", "text");
  text.textContent = ${JSON.stringify(CONSENT_TEXT)};
  bar.appendChild(text);
${CONSENT_CHOICE_JS}
  fillChoice(bar);
  root.appendChild(bar);
${vormerken}  body.appendChild(host);
`;
}

export function buildConsentBarScript(mode: ConsentSurfaceMode): string {
  if (mode === "revoke") {
    return wrapRevoke(aufbauDerLeiste("return false;", "    offen = host;\n"));
  }
  return `<script id="${CONSENT_BAR_SCRIPT_ID}">
(function(){
  if (window.pagesmithConsent !== undefined) return;
  var api = window.${CONSENT_STORE_API};
  if (!api || typeof api.read !== "function" || typeof api.write !== "function") return;
  if (api.read().state !== "never") return;
${aufbauDerLeiste("return;", "")}})();
</script>`;
}
