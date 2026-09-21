// FREMDE TRACKING-BAUSTEINE ENTFERNEN — DER DOM-DURCHLAUF
// (Phase 11.11, Scheibe 11.11c; bindende Entscheidungen P11.11-35 und P11.11-36).
//
// WARUM EIGENE DATEI NEBEN foreign-scan.ts: Jene Datei sagt in ihrem Kopf "SIE LIEST,
// SIE SCHREIBT NICHT", und das soll wahr bleiben. Dieselbe Aufteilung wie bei
// own-blocks.ts / own-blocks-strip.ts — die Trennung ist die Bauart, nicht eine
// Modus-Verzweigung.
//
// EINE QUELLE, KEINE ZWEITE SUCHE (P11.11-35, Satz (c)): Welcher Knoten zu welchem
// Fund gehoert, entscheidet AUSSCHLIESSLICH collectForeignHits, und den Schluessel
// bildet AUSSCHLIESSLICH foreignGroupKey — beide aus foreign-scan.ts, beide auch von
// der Anzeige benutzt. Sonst verschwaende beim Klick auf einen Fund etwas anderes, als
// angezeigt war.
//
// DER SCHLUESSEL IST INHALTS-ADRESSIERT UND KEIN INDEX. Diese Funktion parst den
// Editor-Text NEU; ein Index haette an der Reihenfolge jenes zweiten Parse gehangen.
//
// DIE VIER SAETZE, DIE HIER UMGESETZT SIND:
// (1) EIN KLICK ENTFERNT EINEN GANZEN FUND, also ALLE Knoten mit diesem Schluessel —
//     Script, Rueckfall-Bild, Rueckfall-iframe (P11.11-35, Satz (a)). Ein Knopf, der
//     nur eine Fundstelle naehme, liesse das Rueckfall-Bild stehen, UND DAS ZAEHLT
//     WEITER.
// (2) NUR GANZE KNOTEN, NIE TEILE EINES TEXTES (P11.11-35, Satz (b)) — UND NUR SOLCHE,
//     DIE EINE LADE-ADRESSE TRAGEN (P11.11-38). Ein Inline-Handler (`traeger:
//     "handler"`) und ein Aufruf in Seiten-Code (`traeger: "aufruf"`) bilden je eine
//     EIGENE Gruppe und bekommen deshalb gar keinen Schluessel, den ein Knopf
//     uebergeben koennte.
// (3) MIT JEDEM KNOTEN EIN UNMITTELBAR VORANGEHENDER REINER LEERRAUM-TEXTKNOTEN;
//     KOMMENTARE BLEIBEN (P11.11-19, Satz 1, hier uebernommen). Ein Kommentar ist Text
//     des Betreibers, solange nichts das Gegenteil beweist — die zwei Kommentare eines
//     Meta-Snippets bleiben also stehen (GEMESSEN, CC, 2026-09-21).
// (4) ES WIRD NICHTS AUFGERAEUMT (P11.11-36, Punkt (F2)). Kein leeres <noscript>, kein
//     Kommentar, keine leer gewordene Huelle.
//
// WARUM (4) KEIN VERSAEUMNIS IST, und der Satz gehoert hierher, sonst "repariert" ihn
// die naechste Runde: DAS LEERE <noscript> IM head ENTSTEHT BEI JEDEM RUNDLAUF, ALSO
// SCHON BEIM SPEICHERN. GEMESSEN (CC, 2026-09-21, Projekt-jsdom 29.1.1): Ein Parse
// plus Serialisieren OHNE jeden Eingriff macht aus `<noscript><img …></noscript>` im
// head ein leeres `<noscript></noscript>` im head und ein `<img>` im body; der zweite
// Rundlauf ist byte-gleich. Diese Funktion verursacht den Zustand nicht. Die zwei
// naheliegenden Gegenmittel tragen ihn ausserdem nicht: `img.closest("noscript")`
// liefert im head-Fall `null`, und `parentElement` ist dort der body — der Parser hat
// das <img> herausgehoben, bevor irgendeine Logik es sieht.
//
// DIE DEFENSIVEN GARANTIEN SIND DIE VON stripOwnBlocks, und aus demselben Grund: eine
// code-mutierende Funktion darf User-Code NIE vernichten.
// - Leerer/whitespace Input -> Eingabe unveraendert.
// - Fehlender DOMParser (SSR) -> Eingabe unveraendert.
// - Unerwarteter Fehler -> Eingabe unveraendert.
// `rest` WIRD IMMER AUF DEM RUECKGABE-TEXT GEZAEHLT, nie auf einer Annahme. Nach einem
// Wurf ist das die EINGABE, der Fund steht also noch darin, und `rest` meldet ihn —
// genau daran haengt die Rest-Meldung in der Oberflaeche. Ein festes 0 auf dem
// Fehlerweg meldete "sauber" fuer einen Lauf, der nichts getan hat.
// DIE EINE AUSNAHME IST BENANNT: Ohne DOMParser laesst sich nicht zaehlen; dort heisst
// die 0 "nicht zaehlbar" und nicht "sauber" (s. stellenMit).
//
// SERIALISIERT WIRD WIE UEBERALL IM PROJEKT: `<!DOCTYPE html>` plus
// documentElement.outerHTML — zeichengleich zu detect.ts, generate.ts und
// own-blocks-strip.ts.

import { collectForeignHits, foreignGroupKey } from "./foreign-scan";

export type ForeignStripResult = {
  /** Der bereinigte Text. Bei jedem Fehlerausgang die EINGABE, unveraendert. */
  html: string;
  /**
   * Wie viele Fundstellen dieses Schluessels in dem Text stehen, DEN DIESE FUNKTION
   * ZURUECKGIBT. 0 = die Nachbedingung ist erfuellt.
   *
   * ER WIRD IMMER AUF DEM RUECKGABE-TEXT GEZAEHLT, auch auf den Fehlerausgaengen —
   * und genau das macht ihn ehrlich: Gibt die Funktion nach einem Wurf die EINGABE
   * zurueck, steht der Fund noch darin, und `rest` sagt es. Ein festes 0 meldete dort
   * "sauber" fuer einen Lauf, der nichts getan hat.
   *
   * DIE PRUEFUNG LIEGT HIER UND NICHT BEIM AUFRUFER: Sonst gaebe es zwei Stellen, an
   * denen "ist es weg?" beantwortet wird, und die eine koennte die andere vergessen.
   * DIE ANZEIGE leitet ihre Meldung trotzdem aus dem AKTUELLEN Text ab (P11.11-24);
   * dieser Wert ist der Waechter der Funktion, nicht die Quelle der Meldung.
   */
  rest: number;
};

/** Ist dieser Knoten ein Textknoten aus REINEM Leerraum? (P11.11-19, Satz 1.) */
function isWhitespaceText(node: ChildNode | null): node is ChildNode {
  return (
    node !== null && node.nodeType === 3 && (node.textContent ?? "").trim() === ""
  );
}

/**
 * Zaehlt die Fundstellen eines Schluessels in einem TEXT.
 *
 * SIE FAENGT IHREN EIGENEN WURF UND MELDET DANN 0, und das ist die einzige Stelle, an
 * der eine 0 nicht "sauber" heisst, sondern "nicht zaehlbar": ohne DOMParser (Server)
 * oder bei einem Wurf der Knotenauswahl gibt es keine Zahl. Der Satz steht hier, weil
 * ein Aufrufer die 0 sonst als Nachbedingung-erfuellt liest.
 */
function stellenMit(html: string, schluessel: string): number {
  try {
    if (typeof DOMParser === "undefined") return 0;
    const doc = new DOMParser().parseFromString(html, "text/html");
    return collectForeignHits(doc).filter(
      (hit) => hit.treffer.length > 0 && foreignGroupKey(hit) === schluessel
    ).length;
  } catch {
    return 0;
  }
}

/**
 * Entfernt alle Fundstellen EINES Fundes aus dem uebergebenen Editor-Text und meldet,
 * wie viele danach noch dastehen.
 *
 * `schluessel` ist der Wert aus dem angezeigten Fund (`ForeignFinding.schluessel`).
 * Trifft er nichts — weil der Betreiber den Text zwischendurch geaendert hat —, kommt
 * der Text UNVERAENDERT zurueck und `rest` ist 0. Das ist die ehrliche Auskunft und
 * kein Fehler: Es gibt nichts mehr zu entfernen.
 */
export function stripForeignGroup(
  html: string,
  schluessel: string
): ForeignStripResult {
  // Nichts zu tun — und ausdruecklich die EINGABE zurueck, nicht "".
  if (!html || !html.trim()) return { html, rest: 0 };

  // SSR-Schutz: ohne DOMParser koennen wir nicht entfernen — Code unberuehrt
  // zurueckgeben, statt ihn zu verlieren.
  if (typeof DOMParser === "undefined") return { html, rest: 0 };

  // EIN AUSGANG STATT VIER, und das ist der Grund: `rest` wird auf dem Text gezaehlt,
  // DEN WIR ZURUECKGEBEN. So kann die Nachbedingung auf keinem Weg luegen — weder
  // nach einem geglueckten Lauf noch nach einem Wurf.
  let out = html;
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const ziele = collectForeignHits(doc).filter(
      (hit) => hit.treffer.length > 0 && foreignGroupKey(hit) === schluessel
    );

    for (const hit of ziele) {
      // EIN HANDLER- ODER AUFRUF-FUND HAT HIER NICHTS ZU SUCHEN, und der Riegel steht
      // trotzdem: Sein Schluessel traegt "handler" bzw. "aufruf" und kann von keinem
      // Knopf kommen (die Anzeige bietet dort keinen an). Die Zeile ist der zweite
      // Riegel fuer den Fall, dass ein kuenftiger Aufrufer einen Schluessel von
      // woanders her bildet — ein Element wegen eines Attributs zu loeschen waere ein
      // Datenverlust, und ein Script mit fremder Seitenlogik zu loeschen erst recht
      // (ENTSCHEIDUNG P11.11-38).
      if (hit.traeger !== "knoten") continue;
      const prev = hit.el.previousSibling;
      if (isWhitespaceText(prev)) prev.parentNode?.removeChild(prev);
      hit.el.remove();
    }

    // NUR WENN ES ETWAS ZU TUN GAB. Ohne diesen Zweig kaeme auch ein Klick, der nichts
    // trifft, mit dem NORMALISIERTEN Text zurueck — der Betreiber bekaeme einen
    // Rundlauf geschenkt, ohne dass irgendetwas entfernt worden waere.
    if (ziele.length > 0) out = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } catch {
    // Kaputtes/exotisches HTML darf den Editor-Inhalt nie vernichten. `out` bleibt
    // die Eingabe — und `rest` zaehlt gleich darauf, meldet den Fund also weiter.
    out = html;
  }

  return { html: out, rest: stellenMit(out, schluessel) };
}
