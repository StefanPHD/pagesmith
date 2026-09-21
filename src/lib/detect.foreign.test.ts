// EIN WURF DER FREMD-ERKENNUNG LEERT DIE VORSCHAU NICHT (Phase 11.11, Scheibe 11.11b;
// ENTSCHEIDUNG P11.11-12, Satz 2).
//
// WARUM EINE EIGENE DATEI: Der Nachweis braucht eine Knotenauswahl, die WIRFT — und
// ein `vi.mock` gilt der ganzen Datei. In detect.test.ts stuende der Mock dann ueber
// allen anderen Laeufen, und "kein Fund" waere dort ab da trivial wahr.
//
// WAS DIESE DATEI FESTNAGELT, in einem Satz: annotateAndDetect traegt einen aeusseren
// `catch`, der `{ html: "", elements: [] }` zurueckgibt. Faenge scanForeignTags ihren
// Wurf nicht selbst, liefe er dort hinein — DIE VORSCHAU DES BETREIBERS WAERE LEER,
// weil eine Signatur nicht passte. Das ist der Ausgang, den Satz 2 verbietet.

import { describe, expect, it, vi } from "vitest";

// DIE KNOTENAUSWAHL WIRFT — dieselbe Funktion, die die Erkennung fuer "eigen vor
// fremd" benutzt (ENTSCHEIDUNG P11.11-26). Ein realistischerer Wurf-Ort als ein
// kuenstlicher: sie ist die einzige fremde Abhaengigkeit der Erkennung.
vi.mock("./own-blocks-strip", () => ({
  collectOwnNodes: () => {
    throw new Error("Knotenauswahl kaputt");
  },
}));

import { annotateAndDetect } from "./detect";
import { scanForeignTags } from "./foreign-scan";

const HTML =
  '<!DOCTYPE html><html lang="de"><head><title>t</title></head>' +
  '<body><button>Kaufen</button>' +
  '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
  "</body></html>";

describe("Fremd-Erkennung: ein Wurf bleibt in ihr", () => {
  // E-A. Der Wurf wird INNERHALB gefangen und als "failed" gemeldet — nicht als
  // "ok mit leerer Liste". "Fehlgeschlagen" und "nichts gefunden" sind zwei Dinge.
  it("E-A: scanForeignTags meldet failed statt zu werfen", () => {
    const doc = new DOMParser().parseFromString(HTML, "text/html");
    expect(scanForeignTags(doc)).toEqual({ status: "failed" });
  });

  // E-B. DER EIGENTLICHE LAUF: Die Vorschau ueberlebt. Ohne den eigenen try/catch
  // liefe der Wurf in den aeusseren catch von annotateAndDetect, und html waere "".
  it("E-B: annotateAndDetect liefert Vorschau und Elemente trotzdem", () => {
    const { html, elements, scan } = annotateAndDetect(HTML);
    expect(scan).toEqual({ status: "failed" });
    expect(html).not.toBe("");
    expect(html).toContain("Kaufen");
    expect(elements).toHaveLength(1);
    expect(elements[0].type).toBe("button");
  });
});
