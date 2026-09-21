// WAECHTER UEBER DAS ENTFERNEN (Phase 11.11, Scheibe 11.11d).
//
// S1 IST DER A2-NACHWEIS ALS STEHENDER WAECHTER: Die Messung vom 2026-09-21 hat
// gezeigt, dass ausser den Bloecken NICHTS geaendert wird (Byte-Differenz 27 043 gegen
// Blocksumme 27 043, Vermerk P11.11-17, Punkt (c)). Eine Messung altert; ein Waechter
// nicht.

import { describe, expect, it } from "vitest";
import { stripOwnBlocks } from "./own-blocks-strip";
import { hasOwnBlocks, ownBlockFindings } from "./own-blocks";
import { generateFunctional } from "./generate";
import { injectPageViewEmitter } from "./analytics/pageview-emitter";
import { stabilizeIds } from "./detect";
import type { Mapping } from "./mappings";

// DIE EINRUECKUNG IST TRAGEND UND KEIN SCHMUCK: Der Leerraum VOR </body> ist der
// reine Leerraum-Textknoten, den S2 prueft. Eine einzeilige Fixture traegt ihn NICHT,
// und S2 waere dann trivial wahr — genau das ist beim ersten Wurf dieser Datei
// passiert und vom Lauf gefangen worden (docs/immer-beachten.md, MUTATIONSPROBEN,
// Lektion (e): ein neues Element wird IN DEM ZUSTAND geprueft, DEN ES HERSTELLT).
// Eine echte, von einem KI-Werkzeug erzeugte Seite ist eingerueckt; diese hier auch.
const SAUBER =
  '<!DOCTYPE html><html lang="de"><head><title>Sauber</title></head>\n' +
  "<body>\n" +
  "  <!-- ein Kommentar des Betreibers -->\n" +
  '  <h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>\n' +
  '  <button data-pagesmith-id="ps-bbbbbb">Kaufen</button>\n' +
  "</body></html>";

const MAPPINGS: Mapping[] = [
  {
    elementId: "ps-bbbbbb",
    type: "redirect",
    config: { url: "https://example.com/checkout", openInNewTab: false },
  },
  { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
];

function publishedDoc(): string {
  return injectPageViewEmitter(
    generateFunctional(SAUBER, MAPPINGS, "export", {
      metaPixelId: "1234567890",
      trackingKey: "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
      capiProxyUrl: "/api/e",
      consentTargets: ["meta", "analytics"],
    }),
    "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee",
    "bar",
    { appearance: { theme: "auto" }, text: "standard", language: "de" }
  );
}

function rundlauf(html: string): string {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
}

/** Die eigenen Knoten eines Dokuments, so wie der Strip sie findet — fuer S1. */
function ownOuterHtmls(html: string): string[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const out: string[] = [];
  doc.querySelectorAll("script").forEach((el) => {
    if (el.id || (el.textContent ?? "").includes('getElementById("pagesmith-mappings")'))
      out.push(el.outerHTML);
  });
  return out;
}

describe("own-blocks-strip — das Entfernen", () => {
  it("S1: ausser den Bloecken aendert sich NICHTS — byte-gleich zu 'Eingabe minus outerHTML'", () => {
    // Der Vergleich laeuft auf dem NORMALISIERTEN Text, weil der Strip selbst
    // normalisiert; sonst vermischte der Lauf zwei Achsen (Entfernen und
    // Normalisierung) und sagte ueber keine etwas (docs/immer-beachten.md, Lektion (h)
    // an MUTATIONSPROBEN).
    const norm = rundlauf(publishedDoc());
    const bloecke = ownOuterHtmls(norm);
    expect(bloecke.length).toBe(8); // POSITIVKONTROLLE: es gibt ueberhaupt etwas zu entfernen

    let erwartet = norm;
    for (const oh of bloecke) {
      const i = erwartet.indexOf(oh);
      expect(i).toBeGreaterThanOrEqual(0);
      erwartet = erwartet.slice(0, i) + erwartet.slice(i + oh.length);
    }
    // Der Strip nimmt zusaetzlich die reinen Leerraum-Textknoten mit (S2) — deshalb
    // wird hier gegen die Variante OHNE Leerraum-Regel verglichen, indem der erwartete
    // Text um genau diesen Leerraum bereinigt wird: die Differenz DARF nur Leerraum
    // sein, und das prueft S2. Hier zaehlt, dass kein NICHT-Leerraum verlorengeht.
    const { html } = stripOwnBlocks(norm);
    expect(html.replace(/\s+/g, "")).toBe(erwartet.replace(/\s+/g, ""));
  });

  // EINZELSTUECK — GEMESSEN AN DER MUTATION M3 (CC, 2026-09-21): Faellt die
  // Leerraum-Regel weg, wird GENAU DIESER LAUF rot und kein anderer. S1 vergleicht
  // leerraum-normalisiert, und S4/S5/S8 haengen am PRAEDIKAT, das Leerraum gar nicht
  // sieht. Wer ihn als redundant streicht, nimmt die einzige Abdeckung der
  // Leerraum-Regel mit (docs/immer-beachten.md, MUTATIONSPROBEN, Lektion (f)).
  it("S2: der unmittelbar vorangehende REINE Leerraum-Textknoten wandert mit", () => {
    const norm = rundlauf(publishedDoc());
    const mit = stripOwnBlocks(norm).html;

    // Gegenprobe: dasselbe Entfernen OHNE die Leerraum-Regel, von Hand nachgestellt.
    const doc = new DOMParser().parseFromString(norm, "text/html");
    doc.querySelectorAll("script").forEach((el) => {
      if (
        el.id ||
        (el.textContent ?? "").includes('getElementById("pagesmith-mappings")')
      )
        el.remove();
    });
    const ohne = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;

    // Die Regel muss WIRKEN — sonst waere dieser Lauf trivial wahr.
    expect(mit.length).toBeLessThan(ohne.length);
    // … und sie darf NUR Leerraum kosten.
    expect(mit.replace(/\s+/g, "")).toBe(ohne.replace(/\s+/g, ""));
  });

  it("S3: ein Kommentar des Betreibers BLEIBT stehen", () => {
    const norm = rundlauf(publishedDoc());
    expect(norm).toContain("ein Kommentar des Betreibers"); // POSITIVKONTROLLE
    expect(stripOwnBlocks(norm).html).toContain("ein Kommentar des Betreibers");
  });

  it("S4: nach dem Normalfall ist die Nachbedingung erfuellt — rest ist leer", () => {
    const doc = publishedDoc();
    expect(hasOwnBlocks(doc)).toBe(true); // POSITIVKONTROLLE
    const { html, rest } = stripOwnBlocks(doc);
    expect(rest).toEqual([]);
    expect(hasOwnBlocks(html)).toBe(false);
  });

  it("S5: eine Kennung in einem KOMMENTAR ueberlebt — rest NENNT sie", () => {
    // Der gemessene Fall aus Vermerk P11.11-17, Punkt (e). Er ist der Grund, warum die
    // Nachbedingung ueberhaupt existiert: ohne sie waere der Publish-Riegel ein toter
    // Zustand, den kein Knopf loesen kann.
    const mitKommentar = publishedDoc().replace(
      "</body>",
      '<!-- id="pagesmith-mappings" alter Rest --></body>'
    );
    const { html, rest } = stripOwnBlocks(mitKommentar);
    expect(rest).toEqual(['id="pagesmith-mappings"']);
    expect(html).toContain("alter Rest");
    expect(hasOwnBlocks(html)).toBe(true);
  });

  it("S6: Leer-, SSR- und Fehlerausgang geben die EINGABE zurueck und werfen nie", () => {
    for (const leer of ["", "   \n\t ", "\n"]) {
      const r = stripOwnBlocks(leer);
      expect(r.html).toBe(leer);
      expect(r.rest).toEqual([]);
    }
    // Ein Dokument ohne unsere Bloecke kommt inhaltlich unveraendert zurueck (der
    // Round-Trip normalisiert, mehr nicht).
    const r = stripOwnBlocks(SAUBER);
    expect(r.rest).toEqual([]);
    expect(r.html).toContain('data-pagesmith-id="ps-bbbbbb"');
    expect(r.html).toContain("ein Kommentar des Betreibers");
  });

  it("S7: das Ergebnis ist rundlauf-stabil UND stabilizeIds-stabil", () => {
    // Sonst bekaeme der Betreiber die Normalisierung ein zweites Mal — beim naechsten
    // Speichern —, und der Diff seiner Datei waere erneut gross.
    const { html } = stripOwnBlocks(publishedDoc());
    expect(rundlauf(html)).toBe(html);
    expect(stabilizeIds(html)).toBe(html);
  });

  it("S9: jeder Block steht ZWEIMAL, im head und im body gemischt — ALLE Vorkommen gehen", () => {
    // DER RE-IMPORT EINES RE-IMPORTS. Bis zur Korrektur K1 holte collectOwnNodes je
    // Kennung nur das ERSTE Element (getElementById); das zweite blieb stehen und
    // landete in `rest` — also als Handarbeit, obwohl der Knopf es haette entfernen
    // koennen.
    //
    // DIE FIXTURE TRAEGT BEWUSST KEINEN LEERRAUM um die Bloecke: So ist die
    // Byte-Differenz GENAU die Summe der entfernten outerHTML, ohne dass die
    // Leerraum-Regel aus S2 sie verschiebt. Die zwei Achsen bleiben damit getrennt.
    const norm = rundlauf(publishedDoc());
    const bloecke = ownOuterHtmls(norm);
    expect(bloecke.length).toBe(8); // POSITIVKONTROLLE

    const kopie = bloecke.join("");
    const doppelt = rundlauf(
      '<!DOCTYPE html><html lang="de"><head><title>D</title>' +
        kopie +
        '</head><body><h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>' +
        kopie +
        "</body></html>",
    );
    // POSITIVKONTROLLE: sechzehn Knoten, und sie stehen in BEIDEN Teilen.
    expect(ownOuterHtmls(doppelt).length).toBe(16);

    const summe = ownOuterHtmls(doppelt).reduce(
      (a, s) => a + Buffer.byteLength(s, "utf8"),
      0,
    );
    const { html, rest } = stripOwnBlocks(doppelt);

    expect(rest).toEqual([]);
    expect(hasOwnBlocks(html)).toBe(false);
    expect(
      Buffer.byteLength(doppelt, "utf8") - Buffer.byteLength(html, "utf8"),
    ).toBe(summe);
    // Der Inhalt des Betreibers ist unberuehrt.
    expect(html).toContain('data-pagesmith-id="ps-aaaaaa"');
    expect(html).toContain("Titel");
  });

  it("S8: zweimal entfernen ist idempotent", () => {
    const einmal = stripOwnBlocks(publishedDoc()).html;
    const zweimal = stripOwnBlocks(einmal);
    expect(zweimal.html).toBe(einmal);
    expect(zweimal.rest).toEqual([]);
    expect(ownBlockFindings(zweimal.html)).toEqual([]);
  });
});
