// EIGENE PAGESMITH-BAUSTEINE IM IMPORTIERTEN TEXT — DAS REINE PRAEDIKAT
// (Phase 11.11, Scheibe 11.11d; bindende Entscheidungen P11.11-18 und P11.11-20).
//
// DIE FRAGE, DIE DIESE DATEI BEANTWORTET, IST EINE EINZIGE: "enthaelt dieser Text
// Pagesmith-Bausteine?" — und sie wird von EINEM Urteil beantwortet, das VIER
// Verbraucher teilen: die Warnung im Bereich BAUEN, die disabled-Bedingung des
// Veroeffentlichen-Knopfes, der Server-Riegel in publishProject und der
// Export-/Kopier-Riegel.
//
// REINE STRING-PRUEFUNG, KEIN PARSER — und das ist keine Stilfrage:
// - DER SERVER ZERLEGT KEIN HTML (Dauerregel KEIN SERVER-SEITIGES HTML-PARSING). Ein
//   Praedikat, das der Server braucht, kann also kein DOM-Praedikat sein.
// - ZWEI VERFAHREN FUER EINE FRAGE LAUFEN AUSEINANDER. Ein DOM-Urteil im Client neben
//   einem String-Urteil auf dem Server waere genau die Konstellation "kein drittes
//   Urteil", die emptyPublishVariant in lib/hosting/variant.ts bereits vermeidet.
//
// DIESE DATEI TRAEGT DESHALB KEIN DOM, KEIN server-only UND KEINE IO. Das Entfernen —
// das sehr wohl ein DOM braucht — liegt in own-blocks-strip.ts daneben, damit der
// Server diese Datei importieren kann, ohne DOM-Code mitzuziehen.
//
// DIE MELDUNGEN LIEGEN HIER UND NICHT IN actions.ts: jene traegt "use server" und darf
// AUSSCHLIESSLICH async-Funktionen als Werte exportieren (real aufgetretener
// 7c-2c-Bug, s. docs/immer-beachten.md, "USE SERVER"-DATEIEN). Dieselbe Aufteilung wie
// bei EMPTY_PUBLISH_MESSAGE und Geschwistern.
//
// DIE MERKMALE STAMMEN AUS DEN PRODUKTIV-KONSTANTEN, EINE QUELLE (P11.11-18). Ein
// zweites Literal neben der Konstante waere die zweite Wahrheit, die bei der naechsten
// Umbenennung still auseinanderlaeuft. Genau dafuer sind MAPPINGS_SCRIPT_ID und
// SCRIPT_ID am 2026-09-21 exportiert worden (Entscheidung P11.11-22, Punkt (a)) — es
// ist die einzige Aenderung, die diese Scheibe an den zwei Erzeuger-Dateien vornimmt.
//
// DIE ERWARTUNG IM TEST WIRD DAGEGEN AUS DER ENTSCHEIDUNG GETIPPT, NIE VON HIER
// IMPORTIERT (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG
// NIE AUS DEM CODE). Ein Import machte den Waechter zum SPIEGEL, der jeden Tippfehler
// bestaetigt.
//
// DIE GRENZE DER FORM, und sie gehoert an die Datei, damit sie niemand spaeter fuer
// eine Luecke haelt: Geprueft wird die Schreibweise, die UNSERE Erzeuger und der
// DOMParser-Rundlauf produzieren — Attribut klein geschrieben, Wert in doppelten
// Anfuehrungszeichen, Tagname klein. Ein von Hand auf id='...' umgeschriebener Export
// wird NICHT gefunden. Das ist vertretbar, weil der Gegenstand dieser Scheibe der
// WIEDER IMPORTIERTE EIGENE EXPORT ist, und der traegt unsere Schreibweise.
//
// DIE GRENZE DER HISTORIE (Entscheidung P11.11-22, Punkt (f)): Ob die Kennungen je
// anders hiessen, ist NUR fuer MAPPINGS_SCRIPT_ID erhoben (unveraendert seit dem
// Commit 380d9be, 2026-06-23). Fuer die uebrigen ist es NICHT gemessen. Weil
// generateFunctional den Datenblock an JEDEN Export mit Laufzeit-Mappings haengt,
// traegt jeder Export ein Merkmal, das dieses Praedikat kennt — eine frueher anders
// benannte Kennung koennte also hoechstens eine Fundstelle verfehlen, nie den ganzen
// Fund. FUERS ENTFERNEN gilt das NICHT: ein unbekannt benannter Block bliebe stehen,
// und die Nachbedingung meldete ihn nicht.

import { MAPPINGS_SCRIPT_ID } from "./generate";
import { SCRIPT_ID as PAGEVIEW_SCRIPT_ID } from "./analytics/pageview-emitter";
import { CONSENT_SCRIPT_ID } from "./tracking/consent";
import { CONSENT_SETTER_SCRIPT_ID } from "./tracking/consent-setter";
import { CONSENT_RESTORE_SCRIPT_ID } from "./tracking/consent-store";
import {
  CONSENT_BAR_HOST_TAG,
  CONSENT_BAR_SCRIPT_ID,
} from "./tracking/consent-bar";
import {
  CONSENT_MODAL_HOST_TAG,
  CONSENT_MODAL_SCRIPT_ID,
} from "./tracking/consent-modal";
import { CONSENT_REVOKE_SCRIPT_ID } from "./tracking/consent-revoke";
import { PREVIEW_STORAGE_SHIM_ID } from "./preview-storage-shim";

/**
 * Die id-Werte unserer Bloecke. NEUN Stueck — SIEBEN davon stehen im ausgelieferten
 * Text eines publizierten Projekts (GEMESSEN, Vermerk P11.11-17, Punkt (f): genau acht
 * script-Knoten, sieben mit id, einer ohne).
 *
 * CONSENT_MODAL_SCRIPT_ID ist der achte: er steht dort STATT der Leiste, je nach
 * gewaehlter Form — nie beide zugleich.
 *
 * PREVIEW_STORAGE_SHIM_ID IST DER NEUNTE UND SCHLAEGT IM NORMALFALL NIE AN
 * (Entscheidung P11.11-22, Punkt (c)): Er kann in einem Export STRUKTURELL nicht
 * vorkommen, weil der Vorschau-Riegel an den zwei Vorschau-Memos haengt und NICHT an
 * generateFunctional (Entscheidung P11.12-2). Er steht trotzdem hier, weil er nichts
 * kostet und den Fall deckt, dass ein Betreiber aus dem Vorschau-Rahmen kopiert — ein
 * Zustand, der UNGEMESSEN und nicht ausgeschlossen ist. WER SEIN SCHWEIGEN FUER EINEN
 * DEFEKT HAELT, STREICHT EINE ABSICHERUNG GEGEN ETWAS, DAS NIEMAND VERMESSEN HAT.
 */
const OWN_BLOCK_IDS: readonly string[] = [
  MAPPINGS_SCRIPT_ID,
  CONSENT_SCRIPT_ID,
  PAGEVIEW_SCRIPT_ID,
  CONSENT_SETTER_SCRIPT_ID,
  CONSENT_RESTORE_SCRIPT_ID,
  CONSENT_BAR_SCRIPT_ID,
  CONSENT_MODAL_SCRIPT_ID,
  CONSENT_REVOKE_SCRIPT_ID,
  PREVIEW_STORAGE_SHIM_ID,
];

/**
 * Die zwei Host-Tags der Einwilligungs-Oberflaechen.
 *
 * SIE STEHEN IM AUSGELIEFERTEN TEXT NICHT ALS ELEMENT (GEMESSEN, Vermerk P11.11-17,
 * Punkt (g): "<pagesmith-bar" kommt dort NULL mal vor) — der Host entsteht zur
 * LAUFZEIT per createElement, genau wie das nachgeladene Meta-Script und der
 * Custom-Pixel-Knoten. Sie bleiben trotzdem in der Liste: billig, eindeutig, und der
 * Fall, in dem ein Betreiber einen LAUFZEIT-Baum importiert, ist ausdruecklich
 * ungemessen statt ausgeschlossen (Entscheidung P11.11-18).
 */
const OWN_BLOCK_HOST_TAGS: readonly string[] = [
  CONSENT_BAR_HOST_TAG,
  CONSENT_MODAL_HOST_TAG,
];

/**
 * Das Merkmal des WIRING-SCRIPTS. Es ist der EINZIGE unserer Bloecke OHNE id
 * (GEMESSEN, Vermerk P11.11-17, Punkt (f)) — erkennbar allein an seinem Aufruf auf den
 * Datenblock.
 *
 * ZUSAMMENGESETZT, NICHT GETIPPT: Die Kennung darin ist MAPPINGS_SCRIPT_ID. Ein
 * getipptes Literal waere das zweite Vorkommen derselben Wahrheit und liefe bei einer
 * Umbenennung still auseinander — genau das verbietet P11.11-18.
 */
const WIRING_NEEDLE = `getElementById("${MAPPINGS_SCRIPT_ID}")`;

/**
 * ALLE Nadeln in einer stabilen Reihenfolge: erst die id-Werte, dann die Host-Tags,
 * zuletzt der Wiring-Aufruf. Die Reihenfolge ist die, in der ownBlockFindings meldet;
 * sie ist festgelegt, damit eine Meldung reproduzierbar ist.
 */
const OWN_BLOCK_NEEDLES: readonly string[] = [
  ...OWN_BLOCK_IDS.map((id) => `id="${id}"`),
  ...OWN_BLOCK_HOST_TAGS.map((tag) => `<${tag}`),
  WIRING_NEEDLE,
];

/**
 * Traegt dieser Text einen von Pagesmith erzeugten Baustein?
 *
 * FAIL-CLOSED an der Eingabe: alles, was kein String ist, gilt als "kein Fund" — ein
 * Nicht-String kann keinen Baustein tragen, und ein Wurf hier wuerde auf dem
 * Server-Pfad den Publish kippen statt ihn zu pruefen.
 */
export function hasOwnBlocks(text: unknown): boolean {
  if (typeof text !== "string" || text === "") return false;
  return OWN_BLOCK_NEEDLES.some((needle) => text.includes(needle));
}

/**
 * WELCHE Merkmale stehen im Text? Reine Auskunft fuer die Meldung nach einem
 * unvollstaendigen Entfernen (Nachbedingung aus Entscheidung P11.11-19).
 *
 * Sie liefert die NADELN, nicht die Knoten — der Betreiber sucht damit im Editor, und
 * die Nadel ist genau das, was dort steht.
 */
export function ownBlockFindings(text: unknown): string[] {
  if (typeof text !== "string" || text === "") return [];
  return OWN_BLOCK_NEEDLES.filter((needle) => text.includes(needle));
}

/**
 * WELCHE VARIANTE TRAEGT BAUSTEINE? Gegenstueck zu emptyPublishVariant in
 * lib/hosting/variant.ts, mit derselben Bauform und demselben null-Vertrag:
 * variantB === null heisst AUSDRUECKLICH "wird nicht publiziert, also nicht pruefen" —
 * es ist KEIN "unbekannt". Der Riegel darf B nur pruefen, wenn B auch geschrieben wird;
 * sonst blockierte ein Client, der nach dem Entfernen der Variante noch ein variantB im
 * Zustand haelt (alter Tab), einen voellig legitimen Publish.
 *
 * DREI AUSGAENGE STATT ZWEI, und das ist Entscheidung P11.11-22, Punkt (d): "both" ist
 * ein eigener Ausgang, weil die Warnung im Bereich BAUEN nur die AKTIVE Variante zeigt.
 * Ohne die Variantenangabe saehe der Betreiber eine Sperre ohne sichtbare Ursache und
 * muesste raten, welche Variante gemeint ist.
 */
export function ownBlocksPublishTarget(
  htmlA: unknown,
  variantB: { html: unknown } | null
): "a" | "b" | "both" | null {
  const a = hasOwnBlocks(htmlA);
  const b = variantB ? hasOwnBlocks(variantB.html) : false;
  if (a && b) return "both";
  if (a) return "a";
  if (b) return "b";
  return null;
}

/* -------------------------------------------------------------------------- *
 * DIE WORTLAUTE (OWNER-FREIGABE 2026-09-21, Entscheidung P11.11-22, Punkt (e))
 *
 * EINE Quelle fuer den SERVER-Riegel (publishProject verweigert) UND den
 * CLIENT-Hinweis (der Knopf sperrt und erklaert warum) — gleiche Denkfigur wie bei
 * EMPTY_PUBLISH_MESSAGE: ohne geteilte Konstante drifteten beide Seiten auseinander
 * und der Nutzer bekaeme fuer dieselbe Ursache zwei verschiedene Erklaerungen.
 *
 * SIE SIND GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN GEPRUEFT (GEMESSEN, CC,
 * 2026-09-21): 26 Achsen aus CodeImporter.test.tsx und TargetCard.test.tsx — darunter
 * "%", "gerettet", "mindestens", "NaN", "undefined", "noch nicht veroeffentlicht" und
 * "ueber beide Varianten" — gegen alle acht Wortlaute, NULL Treffer. WER EINEN WORTLAUT
 * AENDERT, FAEHRT DIESE PRUEFUNG ERNEUT: ein neuer Satz kann eine Bestandsabfrage
 * kippen, und das faellt sonst erst im Testlauf einer fremden Datei auf.
 * -------------------------------------------------------------------------- */

/** Die Warnung im Bereich BAUEN, unter dem Import-Feld. */
export const OWN_BLOCKS_WARNING_MESSAGE =
  "Dieser Code enthält Pagesmith-Bausteine aus einem früheren Export. Sie senden Conversions an das ursprüngliche Projekt und würden sich beim Veröffentlichen verdoppeln.";

/** Die Beschriftung des Entfernen-Knopfes. */
export const OWN_BLOCKS_REMOVE_BUTTON = "Pagesmith-Bausteine entfernen";

/**
 * Die vier Publish-Meldungen. DIE AUSWAHL TRIFFT DER AUFRUFER, nicht das Praedikat —
 * genau wie bei EMPTY_PUBLISH_MESSAGE: ohne Variante B der neutrale Satz (das Wort
 * "Variante" waere dort Fachjargon fuer einen Zustand, den der Nutzer gar nicht kennt),
 * mit B der varianten-spezifische.
 */
export const OWN_BLOCKS_PUBLISH_MESSAGE =
  "Veröffentlichen gesperrt: Der Code enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";

export const OWN_BLOCKS_VARIANT_A_MESSAGE =
  "Veröffentlichen gesperrt: Variante A enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";

export const OWN_BLOCKS_VARIANT_B_MESSAGE =
  "Veröffentlichen gesperrt: Variante B enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";

export const OWN_BLOCKS_VARIANT_BOTH_MESSAGE =
  "Veröffentlichen gesperrt: Variante A und Variante B enthalten noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";

/**
 * Die Export-Meldung. SIE NENNT KEINE VARIANTE, und das ist kein Versehen: Download und
 * Kopieren liefern IMMER nur die aktive Variante aus (buildExportDocument liest
 * debouncedCode), es gibt dort also keine zweite, die gemeint sein koennte.
 */
export const OWN_BLOCKS_EXPORT_MESSAGE =
  "Export gesperrt: Der Code enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie zuerst.";

/**
 * Der Satz vor den verbliebenen Fundstellen (Nachbedingung aus Entscheidung
 * P11.11-19). ER IST DER GRUND, WARUM DER RIEGEL KEIN TOTER ZUSTAND IST: Kann das
 * Entfernen die Nachbedingung nicht erfuellen — etwa weil eine Kennung in einem
 * KOMMENTAR steht, den der DOM-Durchlauf nicht erreicht (GEMESSEN, Vermerk P11.11-17,
 * Punkt (e)) —, sagt die Meldung, WO der Betreiber von Hand ansetzen muss.
 */
export const OWN_BLOCKS_REST_MESSAGE =
  "Nicht alles ließ sich automatisch entfernen. Bitte diese Stellen von Hand löschen:";
