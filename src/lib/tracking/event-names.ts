// DIE VERWENDETEN TRACK-EREIGNISNAMEN EINES PROJEKTS (Phase 11.1b).
//
// WAS DIESE DATEI IST: zwei Ableitungen ueber dem Mapping-Modell — ein Praedikat
// ueber EINER Mapping-Menge (trackEventNames) und die Vereinigung ueber beiden
// Varianten-Mengen (usedTrackEventNames). Mehr steht hier nicht.
//
// WARUM EINE EIGENE DATEI UND NICHT lib/mappings.ts (Owner-Entscheidung
// 2026-08-18): Jene Datei traegt das MODELL — den Union-Typ, seine Schluessel-
// Operationen (upsertMapping/findMapping/removeMapping) und den Mengen-Vergleich.
// Diese hier traegt eine ABLEITUNG DARUEBER. Sie beantwortet keine Frage des
// Modells, sondern eine des Produkts ("welche Ereignisnamen verwendet dieses
// Projekt"), und ihr Konsument ist die Oberflaeche, nicht der Editor-Kern.
//
// SIE IST REIN — Muster: tracking/target-readiness.ts. Weder `import "server-only"`
// (das sperrte sie fuer die Oberflaeche) noch `"use client"` (das sperrte sie fuer
// jeden serverseitigen Leser). Die Richtung bleibt server-only -> rein, nie
// umgekehrt.
//
// EIN PRAEDIKAT, KEIN ZWEITES URTEIL: Die Vereinigung ruft das Praedikat ZWEIMAL
// auf, statt seine Regel ein zweites Mal auszuformulieren. Zwei Instanzen
// derselben Frage laufen auseinander — in diesem Projekt bereits geschehen; die
// Gegenmassnahme heisst dort geteiltes Praedikat (hasPixelId/hasSecret in
// tracking/target-readiness.ts als Vorbild).

import type { Mapping } from "@/lib/mappings";
// DIE KONSTANTE, NIE EIN LITERAL. analytics/events.ts traegt bewusst kein
// `server-only` (dort im Kopf begruendet) und ist damit von hier erreichbar; ein
// handgetipptes '__ps_pageview' waere eine zweite Wahrheit, die neben der
// Konstante altert. Genau diese Doppelung ist in Scheibe 9c-1 an einer anderen
// Stelle bereits einmal beseitigt worden (s. den Kommentar an eventTypeLabel in
// components/MeasureView.tsx).
import { PAGEVIEW_EVENT } from "@/lib/analytics/events";

/**
 * DIE TRACK-EREIGNISNAMEN EINER MAPPING-MENGE, in Array-Reihenfolge.
 *
 * DER TYP-DISKRIMINATOR IST DER VOLLSTAENDIGE FILTER, nicht nur der bequeme:
 * Von den drei Zweigen des Modells (redirect/text/track, s. Mapping in
 * lib/mappings.ts) traegt GENAU EINER ein Ereignis-Feld. Ein Zugriff auf
 * config.event an einem anderen Zweig waere ein TS-Fehler — der Filter ist also
 * compiler-gestuetzt und kann nicht stillschweigend zu weit oder zu eng werden.
 *
 * AUSGESCHLOSSEN WIRD GENAU EIN TOKEN — PAGEVIEW_EVENT —, UND ZWAR ALS
 * NEGATIV-AUSSCHLUSS, NIE ALS ALLOWLIST. Beide Haelften der Begruendung stehen
 * hier, weil die Zeile sonst beim naechsten Ziel entweder als ueberfluessig
 * gestrichen oder zur Allowlist umgebaut wird:
 *   WARUM UEBERHAUPT: Diese Menge ist ein SCHLUESSELRAUM fuer eine spaetere
 *   Zuordnung (Ereignisname -> Conversion-Regel des Ziels). Der PageView-Token
 *   ist UNSER eigenes Analytics-Ereignis; er wuerde in der Oberflaeche als Name
 *   erscheinen, fuer den der Betreiber eine Zuordnung eintragen soll, die es nie
 *   geben darf.
 *   WARUM NEGATIV UND NIE POSITIV: TrackConfig.event ist ein FREIER
 *   Nutzer-String — ueber den Custom-Zweig ist JEDER Name erlaubt. Eine
 *   Positiv-Liste schnitte Custom-Conversions STILL aus dem Schluesselraum, und
 *   niemand saehe es. Dieselbe Figur und derselbe Grund wie bei isForwardable
 *   (docs/immer-beachten.md, "isForwardable = NEGATIV-AUSSCHLUSS EINES
 *   RESERVIERTEN TOKENS, NIE Allowlist").
 * WAS DER AUSSCHLUSS NICHT TUT: Das Mapping bleibt bestehen, wird unveraendert
 * ausgeliefert und steht weiterhin in der Element- und der Orphan-Ansicht. NUR
 * aus dem Schluesselraum verschwindet es.
 *
 * DER LEERE NAME WIRD NICHT AUFGENOMMEN — DAS IST EINE AUSLEGUNG, KEIN RIEGEL:
 * Es wird nichts abgelehnt, nichts verhindert und nichts geprueft; ein Mapping
 * mit leerem Namen bleibt speicherbar und wird ausgeliefert wie zuvor. Es steht
 * nur nicht im Schluesselraum, weil ein leerer Schluessel keine Zuordnung tragen
 * kann. Die Oberflaechen-Schranke dagegen liegt unveraendert dort, wo sie immer
 * lag (valid in components/ActionPanel.tsx).
 *
 * KEINE NORMALISIERUNG UEBER DEN BESTEHENDEN TRIM HINAUS: hier wird nicht
 * getrimmt, nicht gekappt und nicht case-insensitiv verglichen. Der einzige Trim
 * im System liegt in handleSubmit (components/ActionPanel.tsx) und bleibt dort.
 * FOLGE, die dazugehoert: Ein Name aus reinem Leerraum ist NICHT der leere Name
 * und bleibt deshalb in der Menge. Das ist gewollt — ihn hier wegzuraeumen waere
 * genau die Normalisierung, die dieser Absatz ausschliesst.
 *
 * KEINE DEDUPLIZIERUNG: Zwei Elemente mit demselben Ereignisnamen sind ein
 * REGULAERER Zustand (der Modell-Schluessel ist (elementId, type), der Name kommt
 * in keinem Schluessel vor). Die Menge entsteht erst in usedTrackEventNames —
 * dort einmal, statt hier und dort je einmal.
 */
export function trackEventNames(mappings: Mapping[]): string[] {
  const names: string[] = [];
  for (const m of mappings) {
    if (m.type !== "track") continue;
    const name = m.config.event;
    if (name === "") continue;
    if (name === PAGEVIEW_EVENT) continue;
    names.push(name);
  }
  return names;
}

/**
 * DIE VEREINIGUNG UEBER BEIDE VARIANTEN-MENGEN.
 *
 * DER NENNER IST DIE VEREINIGUNG, NICHT DIE AKTIVE MENGE: A und B laufen
 * nachweislich auseinander. Wer nur A liest, meldet vollstaendig, waehrend beim
 * halben Traffic ein Name fehlt.
 *
 * mappingsB === null HEISST "ES GIBT KEINE VARIANTE B"; mappingsB === [] HEISST
 * "B EXISTIERT UND TRAEGT KEINE TRACK-MAPPINGS". Die Unterscheidung reist als
 * TYP, nicht als Wert — und das ist der Kern dieser Signatur: Der Aufrufer haelt
 * die beiden Zustaende in publishPairs.pairB.mappings NICHT auseinander (dort ist
 * beides ein leeres Array, s. `stashMappings ?? []` in
 * components/CodeImporter.tsx). Er muss die Frage also getrennt beantworten
 * (hasVariantB) und das Ergebnis HIER hereinreichen.
 *
 * AM WERT AENDERT DIESE UNTERSCHEIDUNG NICHTS — und genau deshalb steht der Satz
 * hier: Die Vereinigung mit der leeren Menge ist die Identitaet, `names` ist in
 * beiden Faellen gleich. Die Wirkung liegt ALLEIN in der AUSSAGE, die scope
 * traegt. Wer das uebersieht, haelt scope fuer redundant und streicht es — und
 * danach behauptet die Oberflaeche Vollstaendigkeit ueber eine Variante, die es
 * nicht gibt, ohne dass irgendwo etwas rot wird.
 *
 * DIE REIHENFOLGE IST A-ZUERST, DANN DIE IN B NEU HINZUKOMMENDEN. Sie ist die
 * Einfuegereihenfolge der Mappings (upsertMapping haengt Neues hinten an), also
 * die Bearbeitungs-Historie und nicht die Dokumentreihenfolge. Hier wird NICHT
 * sortiert: eine Sortierung waere eine eigene Entscheidung mit eigenem Nachweis.
 */
export function usedTrackEventNames(
  mappingsA: Mapping[],
  mappingsB: Mapping[] | null
): { names: string[]; scope: "a-only" | "a-and-b" } {
  const seen = new Set<string>();
  const names: string[] = [];
  const collect = (from: Mapping[]) => {
    for (const name of trackEventNames(from)) {
      if (seen.has(name)) continue;
      seen.add(name);
      names.push(name);
    }
  };
  collect(mappingsA);
  if (mappingsB !== null) collect(mappingsB);
  return { names, scope: mappingsB === null ? "a-only" : "a-and-b" };
}
