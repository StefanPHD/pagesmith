// EIGENE PAGESMITH-BAUSTEINE ENTFERNEN — DER DOM-DURCHLAUF
// (Phase 11.11, Scheibe 11.11d; bindende Entscheidung P11.11-19).
//
// WARUM EIGENE DATEI NEBEN own-blocks.ts, wo das Praedikat liegt: Jene Datei wird vom
// SERVER importiert (der Riegel in publishProject) und darf deshalb KEIN DOM tragen.
// Diese hier braucht eines. Die Trennung ist die Bauart, nicht eine Modus-Verzweigung
// — dieselbe Denkfigur wie bei preview-storage-shim.ts, das ausdruecklich NICHT in
// generate.ts liegt.
//
// DIE VIER SAETZE DER ENTSCHEIDUNG, hier umgesetzt:
// (1) DOM-Durchlauf; mit jedem Block ein unmittelbar vorangehender REINER
//     Leerraum-Textknoten. KOMMENTARE BLEIBEN — ein Kommentar ist Text des Betreibers,
//     solange nichts das Gegenteil beweist, und ihn auf einen Klick "entferne UNSERE
//     Bausteine" mitzunehmen hiesse, fremden Text zu loeschen.
// (2) Es aendert nur den EDITOR-Text. Gespeichert wird erst beim Speichern.
// (3) Am rohen Text NORMALISIERT es, wie Speichern (stabilizeIds) und Zuweisen es
//     ohnehin tun. GEMESSEN (Vermerk P11.11-17, Punkte (a) und (b)): Der erste
//     Round-Trip ueber einen rohen Import aendert den Text, jeder weitere nicht mehr;
//     der Betreiber bekommt die Normalisierung also genau einmal, und er bekaeme sie
//     ohnehin beim naechsten Speichern.
// (4) NACHBEDINGUNG: Danach meldet das Praedikat nichts mehr. Kann es das nicht, nennt
//     der Rueckgabewert die verbleibenden Fundstellen. DER GRUND IST DER GANZE SATZ:
//     EIN RIEGEL, DEN KEIN KNOPF LOESEN KANN, IST EIN TOTER ZUSTAND. Der Fall ist
//     GEMESSEN und nicht erfunden — eine Kennung in einem KOMMENTAR ueberlebt den
//     DOM-Durchlauf, und das Praedikat findet sie weiter (Vermerk P11.11-17, Punkt (e)).
//
// DIE DEFENSIVEN GARANTIEN SIND DIE VON stabilizeIds, und aus demselben Grund: eine
// code-mutierende Funktion darf User-Code NIE vernichten.
// - Leerer/whitespace Input -> Eingabe unveraendert (NICHT "" — anders als stabilizeIds,
//   denn hier gibt es nichts zu entfernen, und ein geleertes Editor-Feld waere ein
//   Datenverlust auf einen Knopfdruck, der "entfernen" heisst).
// - Fehlender DOMParser (SSR) -> Eingabe unveraendert.
// - Unerwarteter Fehler -> Eingabe unveraendert.
// In allen drei Faellen ist `rest` das, was das Praedikat auf der EINGABE findet — die
// Nachbedingung luegt also nie, auch wenn nichts geschehen ist.
//
// SERIALISIERT WIRD WIE UEBERALL IM PROJEKT: `<!DOCTYPE html>` plus
// documentElement.outerHTML — zeichengleich zu detect.ts und generate.ts. Eine eigene
// Serialisierungsform waere ein zweiter Rechenweg fuer dieselbe Frage.

import { ownBlockFindings } from "./own-blocks";
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

export type StripResult = {
  /** Der bereinigte Text. Bei jedem Fehlerausgang die EINGABE, unveraendert. */
  html: string;
  /**
   * Was das Praedikat DANACH noch findet. Leer = die Nachbedingung ist erfuellt.
   * Nicht leer = der Aufrufer nennt diese Stellen (OWN_BLOCKS_REST_MESSAGE).
   */
  rest: string[];
};

/**
 * Dieselben Kennungen wie in own-blocks.ts, hier als Nachschlage-Menge fuer
 * getElementById. SIE WIRD AUS DENSELBEN PRODUKTIV-KONSTANTEN GEBILDET — nicht aus
 * den Nadeln des Praedikats, denn die tragen die Form `id="…"` und nicht den blossen
 * Wert. EINE QUELLE bleibt es trotzdem: beide Listen lesen dieselben Konstanten.
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

const OWN_BLOCK_HOST_TAGS: readonly string[] = [
  CONSENT_BAR_HOST_TAG,
  CONSENT_MODAL_HOST_TAG,
];

/** Derselbe Aufruf wie im Praedikat, aus derselben Konstante zusammengesetzt. */
const WIRING_NEEDLE = `getElementById("${MAPPINGS_SCRIPT_ID}")`;

/**
 * Sammelt die eigenen Knoten eines geparsten Dokuments, klassenweise: erst die
 * id-Traeger, dann die Host-Elemente, zuletzt das id-lose Wiring-Script. Innerhalb
 * jeder Klasse gilt Dokument-Reihenfolge; zwischen den Klassen NICHT, und das ist
 * folgenlos — entfernt wird jeder Knoten fuer sich.
 *
 * ALLE VORKOMMEN, NICHT DAS ERSTE — und das ist eine Korrektur, kein Detail: Bis zum
 * 2026-09-21 stand hier `doc.getElementById(id)`, und der liefert je Kennung GENAU EIN
 * Element. Ein Quelltext, der einen Block DOPPELT traegt — der Re-Import eines
 * Re-Imports —, behielt damit das zweite Vorkommen. Die Nachbedingung meldete es dann
 * zwar (`rest`), aber als etwas, das der Betreiber VON HAND loeschen soll, obwohl der
 * Knopf es sehr wohl haette entfernen koennen. Ein Ausweg, der den Betreiber zur
 * Handarbeit schickt, ist kein Ausweg.
 *
 * DER DURCHLAUF UEBER `[id]` STATT NEUN ATTRIBUT-SELEKTOREN ist Absicht: Ein Selektor
 * `[id="…"]` muesste den Wert fuer die CSS-Syntax maskieren, und `CSS.escape` ist ein
 * Browser-Global, auf das eine Datei mit SSR-Guard sich nicht verlassen soll. Der
 * Vergleich laeuft deshalb auf dem gelesenen Attributwert gegen die KONSTANTEN — das
 * Merkmal wird nirgends neu getippt.
 *
 * DAS WIRING-SCRIPT WIRD UEBER SEINEN INHALT ERKANNT, weil es der EINZIGE unserer
 * Bloecke OHNE id ist (GEMESSEN, Vermerk P11.11-17, Punkt (f)).
 *
 * DER `el.id`-FILTER IST EINE ABKUERZUNG UND KEINE GARANTIE — der Satz steht so, weil
 * ein Kommentar eine BEHAUPTUNG ist und eine zu starke beim naechsten Umbau falsches
 * Vertrauen erzeugt: Gegen Doppelung schuetzt das `seen`-Set, nicht dieser Filter. Er
 * spart nur die Inhaltspruefung an Knoten, die ueber ihre id ohnehin schon gefunden
 * sind. Wer ihn entfernt, aendert am Ergebnis nichts.
 */
function collectOwnNodes(doc: Document): Element[] {
  const found: Element[] = [];
  const seen = new Set<Element>();
  const add = (el: Element | null) => {
    if (el && !seen.has(el)) {
      seen.add(el);
      found.push(el);
    }
  };

  const idSet = new Set<string>(OWN_BLOCK_IDS);
  doc.querySelectorAll("[id]").forEach((el) => {
    if (idSet.has(el.id)) add(el);
  });
  for (const tag of OWN_BLOCK_HOST_TAGS) {
    doc.querySelectorAll(tag).forEach((el) => add(el));
  }
  doc.querySelectorAll("script").forEach((el) => {
    if (el.id) return;
    if ((el.textContent ?? "").includes(WIRING_NEEDLE)) add(el);
  });

  return found;
}

/**
 * Ist dieser Knoten ein Textknoten aus REINEM Leerraum? Genau diese Knoten wandern mit
 * ihrem Block (Satz 1 der Entscheidung P11.11-19).
 *
 * GEMESSEN (Vermerk P11.11-17, Punkt (d)): Von acht Knoten eines publizierten Textes
 * traegt GENAU EINER so einen Vorgaenger, 5 Bytes. DIE REGEL BLEIBT TROTZDEM, und der
 * Grund ist nicht die Byte-Zahl: Sie haengt an der STELLUNG des Blocks, nicht an seiner
 * Zahl. Ein kuenftiger Erzeuger, der seinen Block anders einhaengt, produziert mehr
 * davon; eine Regel, die erst dann eingefuehrt wird, kommt zu spaet.
 *
 * Node.TEXT_NODE ist bewusst als Zahl geschrieben: `Node` ist ein Browser-Global und in
 * einer Datei, die auch beim ersten Server-Render ausgewertet wird, kein sicherer
 * Bezeichner. Der nodeType eines Textknotens ist 3.
 */
function isWhitespaceText(node: ChildNode | null): node is ChildNode {
  return (
    node !== null && node.nodeType === 3 && (node.textContent ?? "").trim() === ""
  );
}

/**
 * Entfernt alle von Pagesmith erzeugten Bausteine aus dem uebergebenen Editor-Text und
 * meldet, was danach noch gefunden wird.
 */
export function stripOwnBlocks(html: string): StripResult {
  // Nichts zu tun — und ausdruecklich die EINGABE zurueck, nicht "".
  if (!html || !html.trim()) return { html, rest: ownBlockFindings(html) };

  // SSR-Schutz: ohne DOMParser koennen wir nicht entfernen — Code unberuehrt
  // zurueckgeben, statt ihn zu verlieren.
  if (typeof DOMParser === "undefined")
    return { html, rest: ownBlockFindings(html) };

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    for (const node of collectOwnNodes(doc)) {
      const prev = node.previousSibling;
      if (isWhitespaceText(prev)) prev.parentNode?.removeChild(prev);
      node.remove();
    }
    const out = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
    // DIE NACHBEDINGUNG WIRD HIER GEPRUEFT, NICHT BEIM AUFRUFER: Sonst gaebe es zwei
    // Stellen, an denen "ist es sauber?" beantwortet wird, und die eine koennte die
    // andere vergessen.
    return { html: out, rest: ownBlockFindings(out) };
  } catch {
    // Kaputtes/exotisches HTML darf den Editor-Inhalt nie vernichten.
    return { html, rest: ownBlockFindings(html) };
  }
}
