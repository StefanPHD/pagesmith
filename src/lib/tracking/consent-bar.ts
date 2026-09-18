// DIE EINWILLIGUNGS-LEISTE (Phase 11.5, Scheibe 11.5d). Erzeugt EINEN Script-Block, der
// am unteren Rand der publizierten Seite eine Leiste anlegt — der erste Baustein im
// ausgelieferten Text, der SICHTBARES DOM erzeugt. Seit Scheibe 11.5e-1 traegt sie zwei
// Gruppen-Schalter und drei gleichwertige Knoepfe; beides kommt aus consent-choice.ts.
// SEIT SCHEIBE 11.13a ERSCHEINT SIE EINGEKLAPPT: zwei gleichwertige Knoepfe und ein Weg
// "Einstellungen"; der Klick stellt die Gestalt oben her. Der Widerruf oeffnet ausgeklappt.
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
// String geht per embedInScript hinein, und der Code kommt ohne `<`-Vergleich aus.
// Damit kann weder ein `</script>` noch ein `</body>` noch ein `<!--` darin stehen.
// SEIT DER SCHEIBE 11.13d TRAEGT DIE LEISTE EINEN BETREIBER-WERT — den freien Sachtext —,
// und damit ist der Satz oben KEINE Eigenschaft der Konstanten mehr, sondern eine
// Eigenschaft des HELFERS: embedInScript (lib/script-embed.ts) maskiert jedes `<` als
// Unicode-Escape (bindende Entscheidung P11.13-25). Ohne ihn verliesse ein `</script>` im
// Sachtext den Block — GEMESSEN, nicht vermutet (VERMERK P11.13-7 der Standdatei).
// L3 prueft das mit der feindlichen Nutzlast durch die ECHTE Einsetzstelle.

// WAS HIER STEHT, BETRIFFT NUR DIE LEISTE: Kennung, Host-Element, zugaenglicher Name und
// Basis-Stylesheet. Sachtext, Knoepfe, Schalter und deren Stylesheet teilen Leiste und Modal;
// sie liegen seit Scheibe 11.5e-1 in consent-choice.ts.

import { CONSENT_STORE_API } from "@/lib/tracking/consent-store";
import {
  CONSENT_CHOICE_CSS,
  CONSENT_CHOICE_JS,
  CONSENT_TEXT,
  consentThemeCss,
} from "@/lib/tracking/consent-choice";
import { embedInScript } from "@/lib/script-embed";
import type { ConsentAppearance, ConsentTextArg } from "@/lib/settings";
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
 * DER BARE `button`-SELEKTOR TRIFFT AUCH DEN WEG (Scheibe 11.13a); was ihn unauffaellig
 * macht, steht klassen-gebunden in CONSENT_CHOICE_CSS unter `.way` — eine Regel HIER
 * aenderte die drei echten Knoepfe mit.
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
 * DER LADE-ZWEIG WAR BIS ZUR SCHEIBE 11.13a BYTE-GLEICH ZUR FASSUNG VOR DER SCHEIBE
 * 11.5e-2 — die tragende Invariante JENER Scheibe. SIE IST MIT IHR ABGELAUFEN: Die
 * Scheibe 11.13a aendert den Lade-Zweig, und der Waechter W0, der die zwei Byte-Werte
 * hielt, ist deshalb GESTRICHEN statt neu gesetzt (Freigabe E1, 2026-09-17) — ein aus
 * dem Bau gezogener Wert waere ein Spiegel. WAS BLEIBT, HAELT T9 STRUKTURELL: Lade- und
 * Widerruf-Text stammen aus EINEM Aufbau und sind nach Ersetzen der drei Einsetzwerte
 * identisch. Alles Folgende beschreibt den Lade-Zweig.
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
 * DER AUFBAU DER LEISTE — EIN STRING, DREI EINSETZUNGEN (Scheibe 11.5e-2; die dritte seit
 * Scheibe 11.13a).
 *
 * Er traegt alles ab `document.body` bis zum Einhaengen. Die zwei Gestalten des Blocks
 * unterscheiden sich allein in drei Platzhaltern:
 * - `abbruch` — die Rueckkehr-Anweisung der zwei Moeglichkeits-Wachen (`document.body`
 *   und `attachShadow`). Im Lade-Zweig `return;`, im Widerruf-Zweig `return false;`.
 * - `vormerken` — im Widerruf-Zweig die Zeile, die das Host-Element merkt, unmittelbar
 *   VOR dem Einhaengen; im Lade-Zweig LEER.
 * - `ausgeklappt` — der Startzustand als Literal fuer `fillChoice`. Im Lade-Zweig `false`
 *   (eingeklappt), im Widerruf-Zweig `true` (Entscheidung P11.13-2). ER IST EIN
 *   BAUZEIT-WERT: Weder Speicher noch Hook noch ein globaler Name tragen ihn.
 *
 * WARUM EIN STRING UND NICHT ZWEI: Zwei Stellen, die dieselbe Oberflaeche bauen, laufen
 * auseinander — dieselbe Divergenz-Bauform, gegen die in dieser Phase schon die
 * Entscheidungen (4), (5) und (14) stehen, und die Vorrat (16) an zwei Erzeugern desselben
 * Gate-Blocks bereits als eingetreten fuehrt. Es ist die Bauform von
 * `buildPageViewScript` ("ZWEI EXPLIZITE ZWEIGE AM PARAMETER, EIN RUMPF") und von
 * CONSENT_CHOICE_JS.
 *
 * RICHTIGGESTELLT IN DER SCHEIBE 11.13c (VERMERK P11.13-5 fuehrte den Fehlstand): Hier
 * stand "DIE BYTE-GLEICHHEIT DES LADE-ZWEIGS HAENGT AN DEN ZWEI PLATZHALTERN … W0 haelt
 * den Wert." BEIDES WAR UEBERHOLT. Es sind seit der Scheibe 11.13a DREI Platzhalter plus
 * `stil`, und W0 IST GESTRICHEN — die Byte-Gleichheit, die er hielt, war die Invariante
 * der Scheibe 11.5e-2 und ist mit ihr abgelaufen (s. den Docblock von
 * buildConsentBarScript). WER HIER EINE BYTE-ZUSAGE SUCHTE, LAS EINE, DIE ES NICHT GIBT.
 * WAS STATTDESSEN GILT: T9 haelt STRUKTURELL, dass Lade- und Widerruf-Text aus EINEM
 * Aufbau stammen — nach Ersetzen der drei Einsetzwerte sind sie zeichengleich. Er fuehrt
 * keine Zahl und muss bei keinem Bau nachgezogen werden.
 */
function aufbauDerLeiste(
  abbruch: string,
  vormerken: string,
  ausgeklappt: string,
  stil: string,
  sachtext: string
): string {
  return `  var body = document.body;
  if (!body) ${abbruch}
  var host = document.createElement(${embedInScript(CONSENT_BAR_HOST_TAG)});
  if (typeof host.attachShadow !== "function") ${abbruch}
  var root = host.attachShadow({ mode: "open" });
  var style = document.createElement("style");
  style.textContent = ${embedInScript(stil)};
  root.appendChild(style);
  var bar = document.createElement("div");
  bar.setAttribute("class", "bar");
  bar.setAttribute("role", "region");
  bar.setAttribute("aria-label", ${embedInScript(CONSENT_BAR_REGION_LABEL)});
  var text = document.createElement("p");
  text.setAttribute("class", "text");
  text.textContent = ${embedInScript(sachtext)};
  bar.appendChild(text);
${CONSENT_CHOICE_JS}
  fillChoice(bar, ${ausgeklappt});
  root.appendChild(bar);
${vormerken}  body.appendChild(host);
`;
}

export function buildConsentBarScript(
  mode: ConsentSurfaceMode,
  // DIE DARSTELLUNG (Phase 11.13, Scheiben 11.13b und 11.13c). PFLICHT-PARAMETER OHNE
  // VORGABEWERT, Freigabe F1 vom 2026-09-17: EINE Bauform an allen drei Stellen — hier, am
  // Modal und an injectPageViewEmitter. Ein `= "light"` liesse einen kuenftigen Aufrufer die
  // Darstellung stillschweigend uebergehen, und ein heller Dialog auf einer dunklen
  // Kundenseite ist genau der Fremdkoerper, wegen dessen diese Phase existiert.
  // SEIT 11.13c IST ES EINE DISKRIMINIERTE UNION statt eines Strings (Entscheidung
  // P11.13-18): Der Zweig "custom" traegt seine zwei GEPRUEFTEN Farben mit sich, und
  // "eigene Farben ohne Farben" ist damit nicht konstruierbar. Jene Union aenderte die
  // GESTALT dieses einen Parameters, nicht seine Zahl.
  darstellung: ConsentAppearance,
  // DER SACHTEXT (Phase 11.13, Scheibe 11.13d; bindende Entscheidung P11.13-29). DIE
  // ZWEITE PFLICHT-ACHSE, ebenfalls OHNE VORGABEWERT.
  // "standard" IST EIN BENANNTER ZUSTAND UND KEIN FEHLENDES ARGUMENT: Der Aufrufer muss
  // sich entscheiden; ein Vergessen ist ein tsc-Fehler statt einer stillen Auslieferung
  // unseres Satzes. EIN `= CONSENT_TEXT` HIER IST AUSGESCHLOSSEN (P11.13-11).
  // P11.13-11 IST DAMIT ERFUELLT UND NICHT GEDEHNT: Sie verlangt "Pflicht-Parameter ohne
  // Vorgabewert" an diesen drei Stellen, und BEIDE Achsen erfuellen das einzeln; ueber
  // ihre ZAHL trifft sie keine Auflage.
  sachtext: ConsentTextArg
): string {
  // DER STIL WIRD EINMAL GEBAUT UND IN BEIDE GESTALTEN EINGESETZT: Lade- und Widerruf-Zweig
  // tragen zwangslaeufig dasselbe Thema, weil sie denselben Ausdruck benutzen. Zwei
  // getrennte Berechnungen koennten auseinanderlaufen.
  const stil =
    CONSENT_BAR_CSS + CONSENT_CHOICE_CSS + consentThemeCss(darstellung);
  // WELCHER SATZ "standard" IST, WEISS ALLEIN DIESER ERZEUGER — und das ist der Grund,
  // warum der Aufrufer ihn NICHT einsetzt: Sonst staende die Zuordnung an zwei Orten
  // (P11.13-29, ausdruecklich verworfene Gestalt). Aus demselben Grund steht die
  // Aufloesung EINMAL hier und nicht zweimal in den Zweigen.
  const text = sachtext === "standard" ? CONSENT_TEXT : sachtext;
  if (mode === "revoke") {
    return wrapRevoke(
      aufbauDerLeiste("return false;", "    offen = host;\n", "true", stil, text)
    );
  }
  return `<script id="${CONSENT_BAR_SCRIPT_ID}">
(function(){
  if (window.pagesmithConsent !== undefined) return;
  var api = window.${CONSENT_STORE_API};
  if (!api || typeof api.read !== "function" || typeof api.write !== "function") return;
  if (api.read().state !== "never") return;
${aufbauDerLeiste("return;", "", "false", stil, text)}})();
</script>`;
}
