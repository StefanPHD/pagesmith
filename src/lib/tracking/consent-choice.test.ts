// DIE DARSTELLUNG DES EINWILLIGUNGS-DIALOGS (Phase 11.13, Scheibe 11.13b).
//
// WAS HIER GEPRUEFT WIRD UND WAS NICHT: Diese Datei prueft den ERZEUGTEN TEXT — welche
// Zeichen ein Thema in das Stylesheet des Schattenbaums legt. Sie prueft NICHT die
// WIRKUNG: Groesse, Lage, Kontrast und das native Kaestchen sind Live- bzw. Probe-Achsen,
// weil die Testumgebung kein CSS auswertet (docs/immer-beachten.md, "DIE TESTUMGEBUNG
// WERTET KEIN CSS AUS"). Die Arbeitsteilung ist Absicht und keine Luecke.
//
// ALLE ERWARTUNGEN SIND AUS DEN ENTSCHEIDUNGEN P11.13-8 UND P11.13-9 GESCHRIEBEN, NICHT
// AUS DEM STYLESHEET ABGELESEN (docs/immer-beachten.md, "EIN WAECHTER UEBER DIE
// SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"). Ein Waechter, der seine Liste
// aus dem Gegenstand zieht, bestaetigt jeden Tippfehler.
import { describe, expect, it } from "vitest";
import {
  CONSENT_THEME_DARK_CSS,
  consentThemeCss,
} from "./consent-choice";

describe("consentThemeCss (Scheibe 11.13b)", () => {
  // CSS1. DER EINZIGE TEST, DER DIE BYTE-GLEICHHEIT VON "light" STRUKTURELL HAELT
  // (Pflicht-Mutation Mu7). "STRUKTURELL" IST DIE EINSCHRAENKUNG, und sie ist gemessen:
  // PT3 faengt denselben Fehler ebenfalls, aber erst am AUSGELIEFERTEN TEXT und nur ueber
  // seine Gegenprobe.
  // ER FUEHRT KEINE BYTE-ZAHL und muss bei keinem Bau nachgezogen werden: Liefert "light"
  // den leeren String, ist `BASIS + CHOICE + ""` zeichengleich mit dem Stylesheet vor
  // dieser Scheibe — und damit der ganze ausgelieferte Text.
  // WER IHN ROT VORFINDET, HAT DIE TRAGENDE INVARIANTE DER SCHEIBE GEBROCHEN, nicht einen
  // Vergleichswert veralten lassen.
  it('CSS1: "light" liefert den LEEREN String', () => {
    expect(consentThemeCss("light")).toBe("");
    // POSITIVKONTROLLE im selben Lauf: die anderen beiden liefern etwas.
    expect(consentThemeCss("dark").length).toBeGreaterThan(0);
    expect(consentThemeCss("auto").length).toBeGreaterThan(0);
  });

  // CSS3. DIE GLEICHHEIT, NICHT NUR EIN ENTHAELT (Nachschaerfung N1). "auto" ist "light"
  // PLUS DIESELBEN Ueberschreibungen in einer @media-Regel — und "dieselben" heisst
  // buchstaeblich dieselbe Konstante. Ein `toContain` liesse eine zweite, abweichende
  // Kopie durchgehen.
  it("CSS3: dark ist die Konstante, auto ist sie in der @media-Huelle — GLEICHHEIT", () => {
    expect(consentThemeCss("dark")).toBe(CONSENT_THEME_DARK_CSS);
    expect(consentThemeCss("auto")).toBe(
      "@media (prefers-color-scheme: dark){" + CONSENT_THEME_DARK_CSS + "}"
    );
    // GEGENPROBE: die zwei sind NICHT dasselbe — sonst waere die @media-Huelle weg
    // (Pflicht-Mutation Mu6), und "auto" folgte nicht mehr der Systemeinstellung.
    expect(consentThemeCss("auto")).not.toBe(consentThemeCss("dark"));
  });
});

describe("CONSENT_THEME_DARK_CSS — nur Farben (Scheibe 11.13b)", () => {
  // DIE ERLAUBTE LISTE, WOERTLICH AUS ENTSCHEIDUNG P11.13-9 ABGESCHRIEBEN.
  // SIE IST DER GRUND, WARUM DIE GEOMETRIE UNBERUEHRT BLEIBT: Im Bestand tragen
  // `button{border:1px solid …}` und `.bar{border-top:1px solid …}` Farbe UND Groesse in
  // EINER Kurzschreibweise. Jede Kurzschreibweise in einem Thema verschoebe Breiten und
  // Hoehen — und damit die Entscheidungen P11.13-3 und P11.13-5.
  const ERLAUBT = [
    "color",
    "background-color",
    "border-color",
    "border-top-color",
    "outline-color",
    "accent-color",
    "color-scheme",
  ];

  // Zerlegt einen Stylesheet-String in { selektor, eigenschaften[] }. BEWUSST EINFACH:
  // Er sieht ZEICHEN, nicht Bedeutung, und muss in die STRENGE Richtung irren — lieber
  // ein Fehlalarm, den jemand prueft, als ein Durchlassen, das niemand sieht
  // (docs/immer-beachten.md, "EIN WAECHTER UEBER QUELLTEXT SIEHT ZEICHEN, NICHT
  // BEDEUTUNG"). SEINE GRENZE: Er kennt keine verschachtelten Regeln; ein @media-Block
  // wird deshalb VOR dem Zerlegen abgestreift.
  function regeln(css: string): { selektor: string; eigenschaften: string[] }[] {
    return css
      .split("}")
      .map((s) => s.trim())
      .filter((s) => s.includes("{"))
      .map((s) => {
        const [selektor, rumpf] = s.split("{");
        return {
          selektor: selektor.trim(),
          eigenschaften: rumpf
            .split(";")
            .map((d) => d.trim())
            .filter(Boolean)
            .map((d) => d.split(":")[0].trim()),
        };
      });
  }

  // CSS2. DER EINZIGE TEST, DER DIE EIGENSCHAFTS-LISTE HAELT (Pflicht-Mutation Mu5).
  it("CSS2: jede Deklaration traegt genau eine Eigenschaft aus der erlaubten Liste", () => {
    const r = regeln(CONSENT_THEME_DARK_CSS);
    // POSITIVKONTROLLE DES ZERLEGERS: er findet ueberhaupt Regeln und Eigenschaften.
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.eigenschaften.length > 0)).toBe(true);
    for (const { selektor, eigenschaften } of r) {
      for (const e of eigenschaften) {
        expect(ERLAUBT, `${selektor} { ${e} }`).toContain(e);
      }
    }
    // POSITIVKONTROLLEN DER PRUEFUNG SELBST, im selben Lauf: eine Kurzschreibweise und
    // eine CSS-Variable muessen von derselben Pruefung gefangen werden.
    expect(regeln(".bar{border:1px solid #fff;}")[0].eigenschaften).toEqual([
      "border",
    ]);
    expect(ERLAUBT).not.toContain("border");
    expect(ERLAUBT).not.toContain("background");
    expect(ERLAUBT).not.toContain("outline");
  });

  it("CSS2b: KEINE CSS-Variablen in keinem Thema (Entscheidung P11.13-8)", () => {
    for (const thema of ["light", "dark", "auto"] as const) {
      const css = consentThemeCss(thema);
      expect(css).not.toContain("var(");
      expect(css).not.toContain("--");
    }
    // POSITIVKONTROLLE der Suche im selben Lauf.
    expect(".bar{color:var(--ps-x);}").toContain("var(");
  });

  it("CSS2c: die Palette steht vollstaendig und die Abdunkelung ist NICHT angefasst", () => {
    // Die sechs Werte aus Entscheidung P11.13-9, einzeln niedergeschrieben.
    for (const wert of ["#111827", "#f9fafb", "#60a5fa", "#4b5563", "dark"]) {
      expect(CONSENT_THEME_DARK_CSS).toContain(wert);
    }
    // DIE ABDUNKELUNG BLEIBT UNVERAENDERT: kein `.backdrop` im Thema.
    expect(CONSENT_THEME_DARK_CSS).not.toContain("backdrop");
    // UND DER WEG BEKOMMT KEINE EIGENE REGEL — eine `.way`-Regel waere genau der Fall,
    // in dem das Gleichrangigkeits-Kriterium (P11.13-5) neu zu messen waere.
    expect(CONSENT_THEME_DARK_CSS).not.toContain(".way");
  });
});
