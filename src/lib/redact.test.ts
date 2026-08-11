import { describe, expect, it } from "vitest";

import { redactOpaque } from "./redact";

// ===========================================================================
// CHARAKTERISIERUNG DES GETEILTEN SCHWAERZ-PRIMITIVS.
//
// DIESE DATEI HAELT DAS HEUTIGE VERHALTEN FEST, NICHT DAS WUENSCHENSWERTE. Sie ist
// entstanden, WEIL das Primitiv geteilt wird: Was hier gruen ist, darf ein kuenftiger
// Adapter voraussetzen — und wer die Funktion aendert, erfaehrt hier, was er dabei
// mitbewegt. Vier ihrer sechs Achsen waren vorher von KEINEM Test gedeckt
// (Mindestlaenge, Globalitaet, Nicht-Strings, Leerwerte); ihre Tests entstanden um den
// ZWECK der Log-Leak-Scheibe herum, nicht um das Verhalten dieser Funktion.
//
// DIE FIXTURES BENUTZEN ABSICHTLICH LITERALE ZAHLEN UND ZEICHENKETTEN, NICHT die
// exportierten Konstanten. Waere die Untergrenze aus META_OPAQUE_MIN gebaut, verschoebe
// eine Aenderung der Konstante die Fixture MIT — der Grenzfall-Test bliebe gruen und
// haette nichts festgehalten. Dieselbe Ueberlegung fuer die Marke "<redacted>".
//
// WAS SIE NICHT PRUEFT: die FELD-POLITIK. Welches Feld geschwaerzt, welches gekappt
// wird und welcher Ersatzwert fuer fehlende Werte steht, entscheidet der Adapter —
// fuer Meta gepruegt in capi/meta-forward.test.ts.
// ===========================================================================

/** Fuelltext ohne eine einzige Folge ueber der Untergrenze. */
const FUELL = "ab ";
/** Eine token-artige Folge, deutlich ueber der Untergrenze (dreissig Zeichen). */
const LANG = "AbCdEf0123456789_-XyZaBcDeFgHi";

describe("redactOpaque — Achse MINDESTLAENGE", () => {
  it("EINS DARUNTER: neunzehn zusammenhaengende Zeichen bleiben UNVERAENDERT", () => {
    const kurz = "a".repeat(19);
    expect(redactOpaque(`vor ${kurz} nach`)).toBe(`vor ${kurz} nach`);
  });

  it("GENAU AUF DER GRENZE: zwanzig zusammenhaengende Zeichen werden ERSETZT", () => {
    const grenz = "a".repeat(20);
    expect(redactOpaque(`vor ${grenz} nach`)).toBe("vor <redacted> nach");
  });

  it("DER ZEICHENVORRAT IST TEIL DER GRENZE: ein Punkt TRENNT die Folge", () => {
    // Dreissig Zeichen, aber durch einen Punkt in zwei kurze Haelften geteilt — der
    // Punkt gehoert NICHT zum Vorrat, also entstehen zwei Folgen unter der Grenze.
    // Ein kuenftiger Adapter muss das wissen: eine punktierte Kennung geht DURCH.
    const punktiert = "AbCdEf0123456.789XyZaBcDeFgHi";
    expect(redactOpaque(punktiert)).toBe(punktiert);
  });
});

describe("redactOpaque — Achse GLOBALITAET", () => {
  it("MEHR ALS EINE Folge in EINEM Wert: BEIDE werden ersetzt", () => {
    const zwei = `${LANG} dazwischen ${LANG}`;
    expect(redactOpaque(zwei)).toBe("<redacted> dazwischen <redacted>");
  });
});

describe("redactOpaque — Achse NICHT-STRINGS", () => {
  it("JEDER Nicht-String WIRFT — die Normalisierung liegt beim AUFRUFER", () => {
    // FESTGEHALTEN, NICHT REPARIERT: Das Primitiv ist NICHT defensiv. Der Typ verlangt
    // einen String, und zur Laufzeit gibt es auf keinem dieser Werte ein .replace.
    // DAS IST DIE SCHARFE STELLE FUER JEDEN KUENFTIGEN ADAPTER: Auf dem Ingest-Pfad
    // braeche ein Wurf von hier die garantierte leere 204. Wer diese Funktion benutzt,
    // normalisiert VORHER — so wie asLogString es in capi/meta-forward.ts tut.
    const fremd: unknown[] = [undefined, null, 42, true, {}, ["x"]];
    for (const wert of fremd) {
      expect(() => redactOpaque(wert as string)).toThrow();
    }
  });
});

describe("redactOpaque — Achse LEERWERTE", () => {
  it("leerer String und reiner Leerraum kommen UNVERAENDERT zurueck", () => {
    // Der Ersatzwert "-" entsteht NICHT hier. Er ist Politik und liegt beim Adapter.
    expect(redactOpaque("")).toBe("");
    expect(redactOpaque("   ")).toBe("   ");
    expect(redactOpaque("\t\n ")).toBe("\t\n ");
  });
});

describe("redactOpaque — Achse REIHENFOLGE (Sicht des Primitivs)", () => {
  it("eine Folge JENSEITS jeder Deckelgrenze wird trotzdem ersetzt", () => {
    // DAS PRIMITIV KENNT KEINE GRENZE — und genau das ist die Voraussetzung dafuer,
    // dass "erst schwaerzen, dann kappen" beim Aufrufer ueberhaupt wirken kann. Die
    // Folge beginnt hier weit hinter dem 200er-Deckel der Meta-Aufbereitung.
    const spaet = FUELL.repeat(70) + LANG; // Folge beginnt bei Zeichen 210
    const erg = redactOpaque(spaet);
    expect(erg).toContain("<redacted>");
    expect(erg).not.toContain(LANG);
    expect(erg).not.toContain(LANG.slice(0, 11));
  });
});

describe("redactOpaque — Achse KAPPUNG", () => {
  it("DAS PRIMITIV KAPPT NICHT: ein langer Text kommt in voller Laenge zurueck", () => {
    // AM CODE BEANTWORTET: Die Deckel (META_ERROR_MSG_MAX, META_SHORT_MAX) liegen in
    // capi/meta-forward.ts bei den drei Aufbereitungen, NICHT hier. Diese Funktion
    // gibt zurueck, was sie bekommt — nur mit ersetzten Folgen.
    const lang = FUELL.repeat(200); // sechshundert Zeichen, keine Folge ueber der Grenze
    expect(redactOpaque(lang)).toBe(lang);
    expect(redactOpaque(lang).length).toBe(600);
  });
});
