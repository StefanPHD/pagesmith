import { describe, expect, it } from "vitest";
import {
  TRACKING_TARGETS,
  getMetaPixelId,
  getPixelId,
  hasTargetPixelId,
  isTrackingTarget,
  setMetaPixelId,
  setPixelId,
  settingsEqual,
  type ProjectSettings,
} from "./settings";

// ===========================================================================
// DIE ZIEL-DIMENSION IN DER ABLAGE (Phase 11, sechste Scheibe, Haelfte A).
//
// REINE EINHEITSTESTS. Die Server-Actions prueft actions.targets.test.ts, die
// Karte gibt es noch nicht (eigene Runde).
//
// DIE ZWEI ACHSEN WERDEN GETRENNT GEHALTEN:
//  (1) LESEN/SCHREIBEN je Ziel — inklusive der Frage, ob ein Blob aus der Zeit
//      VOR dieser Scheibe unveraendert gelesen wird.
//  (2) DER DIRTY-VERGLEICH — die Stelle, an der ein Vergessen still Eingaben
//      kostet.
// ===========================================================================

/** Ein Blob, wie ihn ein Projekt VOR dieser Scheibe trug. */
const ALT_BLOB: ProjectSettings = {
  pixels: { meta: { pixelId: "123456789012345" } },
  capi: { trackingKey: "tk-alt", tokenSet: true },
};

describe("Der Blob aus der Zeit VOR dieser Scheibe wird unveraendert gelesen", () => {
  it("die Meta-Pixel-ID kommt an — OHNE Ruecfallpfad, weil die Form dieselbe ist", () => {
    // ROT DURCH: eine Ablage-Form, die den Ziel-Zweig anders schluesselt. Dann
    // saehe JEDES bestehende Projekt "nicht konfiguriert" aus, waehrend sein
    // Forward unveraendert laeuft — die teuerste Klasse dieser Scheibe.
    expect(getPixelId(ALT_BLOB, "meta")).toBe("123456789012345");
  });

  it("ein Ziel, das der alte Blob nicht kennt, liest LEER (nicht undefined)", () => {
    expect(getPixelId(ALT_BLOB, "pinterest")).toBe("");
  });

  it("getMetaPixelId liefert unveraendert dasselbe wie der Ziel-Zugriff", () => {
    // Der Bruecken-Test: capi/token.ts ruft getMetaPixelId im Forward-Pfad und ist
    // in dieser Scheibe unantastbar. Weicht die Bruecke ab, bricht der Forward.
    expect(getMetaPixelId(ALT_BLOB)).toBe(getPixelId(ALT_BLOB, "meta"));
  });

  it("leerer Blob -> leer, kein Wurf", () => {
    expect(getPixelId({}, "meta")).toBe("");
    expect(getPixelId({ pixels: {} }, "pinterest")).toBe("");
  });

  it("Whitespace wird getrimmt, wie zuvor", () => {
    expect(getPixelId({ pixels: { meta: { pixelId: "  42  " } } }, "meta")).toBe("42");
  });
});

describe("Schreiben je Ziel laesst die anderen Ziele unberuehrt", () => {
  it("ein zweites Ziel tritt NEBEN das erste, es ersetzt es nicht", () => {
    // ROT DURCH: ein Schreiber, der den pixels-Zweig ersetzt statt zu mergen.
    // Der Betreiber verloere beim Einrichten des zweiten Ziels sein erstes.
    const next = setPixelId(ALT_BLOB, "pinterest", "2612345678901");
    expect(getPixelId(next, "meta")).toBe("123456789012345");
    expect(getPixelId(next, "pinterest")).toBe("2612345678901");
  });

  it("die anderen Zweige des Blobs bleiben unangetastet", () => {
    const next = setPixelId(ALT_BLOB, "pinterest", "26");
    expect(next.capi).toEqual({ trackingKey: "tk-alt", tokenSet: true });
  });

  it("immutabel: die Eingabe wird nicht veraendert", () => {
    const vorher = JSON.stringify(ALT_BLOB);
    setPixelId(ALT_BLOB, "pinterest", "26");
    expect(JSON.stringify(ALT_BLOB)).toBe(vorher);
  });

  it("setMetaPixelId schreibt weiterhin denselben Pfad", () => {
    const next = setMetaPixelId({}, " 999 ");
    expect(next.pixels?.meta?.pixelId).toBe("999");
    expect(getPixelId(next, "meta")).toBe("999");
  });
});

describe("Der Dirty-Vergleich sieht JEDES Ziel", () => {
  it("eine Aenderung am ZWEITEN Ziel wird erkannt (DER EINZELSTUECK-FALL)", () => {
    // DIESER TEST IST DER GRUND, WARUM settingsEqual ueberhaupt angefasst wurde.
    // Ohne ihn bliebe die teuerste stille Folge ungedeckt: kein Dirty -> kein
    // aktiver Speichern-Knopf -> die Eingabe ist beim naechsten Projektwechsel
    // weg, ohne dass irgendwo etwas meldet.
    const a = setPixelId({}, "pinterest", "26");
    const b = setPixelId({}, "pinterest", "27");
    expect(settingsEqual(a, b)).toBe(false);
  });

  it("eine Aenderung am ERSTEN Ziel wird weiterhin erkannt (Bestandszusage)", () => {
    expect(settingsEqual(setMetaPixelId({}, "1"), setMetaPixelId({}, "2"))).toBe(false);
  });

  it("zwei Alt-Blobs bleiben gleich — kein false-dirty durch die neue Dimension", () => {
    // ROT DURCH: ein Vergleich, der ein fehlendes Ziel als "verschieden" liest.
    // Dann meldete JEDES Bestandsprojekt beim Laden ungespeicherte Aenderungen.
    expect(settingsEqual(ALT_BLOB, { ...ALT_BLOB })).toBe(true);
  });

  it("capi und hosting bleiben AUSGENOMMEN (Bestandszusage, unveraendert)", () => {
    const a: ProjectSettings = { capi: { tokenSet: true }, hosting: { label: "x" } };
    const b: ProjectSettings = { capi: { tokenSet: false }, hosting: { label: "y" } };
    expect(settingsEqual(a, b)).toBe(true);
  });
});

describe("Die Ziel-Liste und ihre Laufzeit-Pruefung", () => {
  it("kennt Meta und Pinterest", () => {
    expect(isTrackingTarget("meta")).toBe(true);
    expect(isTrackingTarget("pinterest")).toBe(true);
  });

  it("weist einen TIPPFEHLER ab — nicht per Praefix, nicht per Laenge", () => {
    // Genau der Fall, den der Kommentar der Geheimnis-Migration nennt: ein
    // Geheimnis unter "pintrest" saehe aus wie Konfiguration, und der Adapter
    // faende es nie.
    expect(isTrackingTarget("pintrest")).toBe(false);
    expect(isTrackingTarget("pinterest ")).toBe(false);
    expect(isTrackingTarget("Meta")).toBe(false);
  });

  it("weist Nicht-Zeichenketten und Leeres ab, ohne zu werfen", () => {
    for (const v of [undefined, null, 0, 1, {}, [], "", "__proto__"]) {
      expect(() => isTrackingTarget(v)).not.toThrow();
      expect(isTrackingTarget(v)).toBe(false);
    }
  });

  it("die Liste ist duplikatfrei", () => {
    expect(new Set(TRACKING_TARGETS).size).toBe(TRACKING_TARGETS.length);
  });
});

// ===========================================================================
// DAS ZIEL-BEWUSSTE URTEIL (Scheibe 11.1c).
//
// hasTargetPixelId nimmt Wert UND Ziel entgegen und delegiert an das skalare
// Primitiv hasPixelId. GEPRUEFT WERDEN ZWEI ACHSEN, und die zweite ist die
// eigentliche Zusage dieser Scheibe:
//  (1) DIE WERT-ACHSE — dieselben Faelle wie beim Primitiv. Sie sichert, dass die
//      Delegation nicht unterwegs etwas anderes tut.
//  (2) DIE ZIEL-GENERIK — derselbe Wert liefert fuer ALLE VIER Ziele dasselbe
//      Ergebnis. DIESE ZUSICHERUNG IST BEWUSST BEFRISTET: 11.1d hebt sie auf, und
//      DANN muss sie fallen. Ein Test, der dort gruen bliebe, waere der Beweis,
//      dass die Unterscheidung nicht greift.
// ===========================================================================
describe("hasTargetPixelId — das ziel-bewusste Urteil (Scheibe 11.1c)", () => {
  it("WERT-ACHSE: leer, Leerraum, Nicht-String -> false; ein gesetzter Wert -> true", () => {
    // BILDET DAS PRIMITIV AB, statt seine Regel zu wiederholen — die Faelle sind
    // dieselben wie in tracking/target-readiness.test.ts. WIRD ROT, WENN die
    // Delegation faellt oder unterwegs eine eigene Bedingung entsteht.
    expect(hasTargetPixelId("", "meta")).toBe(false);
    expect(hasTargetPixelId("   ", "meta")).toBe(false);
    expect(hasTargetPixelId("\t\n ", "meta")).toBe(false);
    expect(hasTargetPixelId(undefined, "meta")).toBe(false);
    expect(hasTargetPixelId(null, "meta")).toBe(false);
    expect(hasTargetPixelId(12345, "meta")).toBe(false);
    expect(hasTargetPixelId("123456789012345", "meta")).toBe(true);
    expect(hasTargetPixelId(" 123 ", "meta")).toBe(true);
  });

  it("ZIEL-GENERIK: derselbe Wert liefert fuer ALLE VIER Ziele dasselbe Ergebnis", () => {
    // DIE ZUSAGE DER SCHEIBE, festgenagelt: Das Urteil ist heute ziel-BEWUSST und
    // ziel-GENERISCH zugleich — es fuehrt ein Ziel, ohne es zu bewerten. Deshalb
    // ist diese Funktion KEINE neunte ziel-geschluesselte Stelle.
    // UEBER TRACKING_TARGETS GESCHLEIFT, NICHT ueber vier getippte Literale: ein
    // fuenftes Ziel ist damit automatisch mitgeprueft, ohne dass jemand daran denkt.
    // WIRD ROT, WENN ein Ziel je anders beurteilt wird — genau das ist 11.1d, und
    // dann faellt dieser Test ABSICHTLICH.
    for (const target of TRACKING_TARGETS) {
      expect(hasTargetPixelId("", target)).toBe(false);
      expect(hasTargetPixelId("   ", target)).toBe(false);
      expect(hasTargetPixelId("123456789012345", target)).toBe(true);
    }
    // POSITIVKONTROLLE, ohne die die Schleife auch bei leerer Liste gruen waere:
    // sie muss ueberhaupt vier Ziele gesehen haben.
    expect(TRACKING_TARGETS.length).toBe(4);
  });
});
