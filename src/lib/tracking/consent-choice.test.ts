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
import { readConsentColor, type ConsentColor } from "@/lib/settings";

// DIE PROBEFARBEN GEHEN DURCH DAS FORMAT-TOR und nicht an ihm vorbei: Der Erzeuger nimmt
// nur den geprueften Typ (Entscheidung P11.13-17), und ein roher String waere hier ein
// Compiler-Fehler. Der Umweg ueber readConsentColor ist deshalb KEINE Umstaendlichkeit,
// sondern der Beleg, dass es genau EINE Erzeugungsstelle gibt — die Verengung geschieht
// hier ueber einen Vergleich, NICHT ueber eine zweite Zusicherung (die CF1 in
// settings.test.ts zaehlt).
const farbe = (roh: string): ConsentColor => {
  const geprueft = readConsentColor(roh);
  if (geprueft === "unknown") throw new Error(`Testfarbe ungueltig: ${roh}`);
  return geprueft;
};
const eigen = (hintergrund: string, text: string): string =>
  consentThemeCss({
    theme: "custom",
    background: farbe(hintergrund),
    text: farbe(text),
  });

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
    expect(consentThemeCss({ theme: "light" })).toBe("");
    // POSITIVKONTROLLE im selben Lauf: die anderen beiden liefern etwas.
    expect(consentThemeCss({ theme: "dark" }).length).toBeGreaterThan(0);
    expect(consentThemeCss({ theme: "auto" }).length).toBeGreaterThan(0);
  });

  // CSS3. DIE GLEICHHEIT, NICHT NUR EIN ENTHAELT (Nachschaerfung N1). "auto" ist "light"
  // PLUS DIESELBEN Ueberschreibungen in einer @media-Regel — und "dieselben" heisst
  // buchstaeblich dieselbe Konstante. Ein `toContain` liesse eine zweite, abweichende
  // Kopie durchgehen.
  it("CSS3: dark ist die Konstante, auto ist sie in der @media-Huelle — GLEICHHEIT", () => {
    expect(consentThemeCss({ theme: "dark" })).toBe(CONSENT_THEME_DARK_CSS);
    expect(consentThemeCss({ theme: "auto" })).toBe(
      "@media (prefers-color-scheme: dark){" + CONSENT_THEME_DARK_CSS + "}"
    );
    // GEGENPROBE: die zwei sind NICHT dasselbe — sonst waere die @media-Huelle weg
    // (Pflicht-Mutation Mu6), und "auto" folgte nicht mehr der Systemeinstellung.
    expect(consentThemeCss({ theme: "auto" })).not.toBe(consentThemeCss({ theme: "dark" }));
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

  it("CSS2b: KEINE CSS-Variablen in keinem Thema (Entscheidungen P11.13-8 und -15)", () => {
    // SEIT SCHEIBE 11.13c LAEUFT ER UEBER ALLE VIER DARSTELLUNGEN. Das ist eine
    // VERBREITERUNG, kein Umbau: Die Zusicherung ist unveraendert, nur ihr Gegenstand
    // waechst. Der vierte Zweig ist der einzige, der zur BAUZEIT zusammengesetzt wird —
    // ohne die Ausweitung waere gerade er von keiner Pruefung gedeckt.
    const alle = [
      consentThemeCss({ theme: "light" }),
      consentThemeCss({ theme: "dark" }),
      consentThemeCss({ theme: "auto" }),
      eigen("#0a0b0c", "#f0f1f2"),
    ];
    for (const css of alle) {
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

  // ===== DER VIERTE ZWEIG: EIGENE FARBEN (Scheibe 11.13c) ==========================
  // ALLE ERWARTUNGEN SIND AUS DEN ENTSCHEIDUNGEN P11.13-13, -15, -20 UND -21
  // NIEDERGESCHRIEBEN, NICHT AUS DEM ERZEUGTEN STYLESHEET ABGELESEN.
  //
  // CSS4. DER EINZIGE TEST, DER DIE EIGENSCHAFTS-LISTE AM VIERTEN ZWEIG HAELT — der
  // Spiegel von CSS2 fuer den erzeugten statt den geschriebenen Fall (Pflicht-Mutation
  // M-c, sofern sie eine Kurzschreibweise einschleust).
  // ER IST NOETIG, OBWOHL CSS2 SCHON EXISTIERT: CSS2 prueft eine KONSTANTE. Hier wird das
  // Stylesheet ZUR BAUZEIT ZUSAMMENGESETZT, und eine Kurzschreibweise entstuende erst in
  // der Zusammensetzung.
  it("CSS4: der custom-Zweig traegt nur erlaubte Eigenschaften, je genau eine", () => {
    const r = regeln(eigen("#0a0b0c", "#f0f1f2"));
    // POSITIVKONTROLLE DES ZERLEGERS am erzeugten Text.
    expect(r.length).toBeGreaterThan(0);
    expect(r.every((x) => x.eigenschaften.length > 0)).toBe(true);
    for (const { selektor, eigenschaften } of r) {
      for (const e of eigenschaften) {
        expect(ERLAUBT, `${selektor} { ${e} }`).toContain(e);
      }
    }
  });

  // CSS5. DIE ABLEITUNG, PLATZ FUER PLATZ (Entscheidungen P11.13-13 und P11.13-20).
  // SIE IST DER GRUND, WARUM EIN EINZIGES KONTRASTPAAR GENUEGT: Tragen Rahmen, Kaestchen
  // und Fokus-Ring DIESELBE Farbe wie der Text, deckt "Text gegen Hintergrund" das ganze
  // Kriterium P11.13-10 ab, weil 4,5 die Schwelle 3 einschliesst.
  // DIE ERWARTUNG IST ABGESCHRIEBEN, NICHT ABGELESEN: Jeder Platz steht einzeln da.
  it("CSS5: Hintergrund und Text gehen an genau die Plaetze aus P11.13-13 und P11.13-20", () => {
    const HG = "#0a0b0c";
    const TX = "#f0f1f2";
    const css = eigen(HG, TX);
    const r = regeln(css);
    const regel = (s: string) => r.find((x) => x.selektor === s);
    // Der Behaelter: Text und Hintergrund.
    expect(css).toContain(`.bar,.dialog{color:${TX};background-color:${HG};`);
    // Die Container-Linie — BEIDE Formen, und sie traegt die TEXTFARBE (P11.13-20).
    expect(css).toContain(`.bar{border-top-color:${TX};}`);
    expect(css).toContain(`.dialog{border-color:${TX};}`);
    // Die Knoepfe: Hintergrund als Flaeche, Text als Schrift UND als Rahmen.
    expect(css).toContain(
      `button{color:${TX};background-color:${HG};border-color:${TX};}`
    );
    // Fokus-Ring und Kaestchen: Textfarbe.
    expect(css).toContain(`button:focus-visible{outline-color:${TX};}`);
    expect(css).toContain(`.group input{accent-color:${TX};}`);
    expect(css).toContain(`.group input:focus-visible{outline-color:${TX};}`);
    // DIE SIEBEN REGELN UND KEINE ACHTE — eine zusaetzliche waere ein Platz, den
    // P11.13-13 nicht nennt.
    expect(r.map((x) => x.selektor)).toEqual([
      ".bar,.dialog",
      ".bar",
      ".dialog",
      "button",
      "button:focus-visible",
      ".group input",
      ".group input:focus-visible",
    ]);
    expect(regel(".way")).toBeUndefined();
    expect(regel(".backdrop")).toBeUndefined();
  });

  // CSS6. DER EINZIGE TEST, DER DIE ABLEITUNG VON `color-scheme` HAELT (Entscheidung
  // P11.13-21), und er prueft die RICHTUNG des Vergleichs, nicht nur seine Anwesenheit.
  // DER GLEICHSTAND IST IN 8-BIT-SRGB NICHT KONSTRUIERBAR, und das gehoert in den
  // Kommentar, damit niemand ihn spaeter sucht: Die Umschlagstelle liegt bei einer
  // relativen Leuchtdichte von rund 0,1791, das entspricht einem Grau von etwa 117,4 —
  // zwischen zwei ganzzahligen Kanalwerten. Die Regel "auch bei Gleichstand light" ist
  // deshalb eine SETZUNG ohne erreichbaren Fall; geprueft wird das PAAR, das die
  // Umschlagstelle einschliesst.
  it("CSS6: color-scheme folgt dem besseren der zwei Kandidaten — an der Umschlagstelle", () => {
    // Dunkler Hintergrund: Weiss kontrastiert besser -> dark.
    expect(eigen("#111827", "#f9fafb")).toContain("color-scheme:dark;");
    expect(eigen("#000000", "#ffffff")).toContain("color-scheme:dark;");
    // Heller Hintergrund: Schwarz kontrastiert besser -> light.
    expect(eigen("#ffffff", "#111827")).toContain("color-scheme:light;");
    expect(eigen("#f9fafb", "#111827")).toContain("color-scheme:light;");
    // DIE UMSCHLAGSTELLE, zwei benachbarte Graustufen (GEMESSEN am eigenen Lauf,
    // CC, 2026-09-18): #757575 faellt noch auf dark, #767676 schon auf light.
    expect(eigen("#757575", "#ffffff")).toContain("color-scheme:dark;");
    expect(eigen("#767676", "#000000")).toContain("color-scheme:light;");
    // GEGENPROBE: der Wert steht NUR am Behaelter und nur einmal.
    const css = eigen("#111827", "#f9fafb");
    expect(css.match(/color-scheme/g)).toHaveLength(1);
  });

  // CSS7. `.backdrop` UND `.way` BLEIBEN UNBERUEHRT (Invariante Z10) — der Spiegel von
  // CSS2c fuer den vierten Zweig. Die Abdunkelung bleibt, was sie ist, und der Weg erbt
  // seine Schrift aus der Knopf-Regel; eine eigene `.way`-Regel waere genau der Fall, in
  // dem das Gleichrangigkeits-Kriterium (P11.13-5) neu zu messen waere.
  it("CSS7: kein .backdrop und kein .way im custom-Zweig", () => {
    const css = eigen("#0a0b0c", "#f0f1f2");
    expect(css).not.toContain("backdrop");
    expect(css).not.toContain(".way");
    // Und keine Kurzschreibweise, die Groesse bewegt.
    expect(css).not.toContain("border:");
    expect(css).not.toContain("outline:");
    expect(css).not.toContain("background:");
  });

  // CSS8. DIE DREI TABELLENZWEIGE SIND VOM VIERTEN UNBERUEHRT (Invariante Z1). Das ist
  // die STRUKTURELLE Halbseite der Byte-Gleichheit: "light" liefert weiterhin den leeren
  // String, und kein Farbwert erreicht die anderen drei.
  it("CSS8: der vierte Zweig laesst die drei Tabellenwerte unveraendert", () => {
    expect(consentThemeCss({ theme: "light" })).toBe("");
    expect(consentThemeCss({ theme: "dark" })).toBe(CONSENT_THEME_DARK_CSS);
    expect(consentThemeCss({ theme: "auto" })).toBe(
      "@media (prefers-color-scheme: dark){" + CONSENT_THEME_DARK_CSS + "}"
    );
    // POSITIVKONTROLLE: der vierte liefert etwas anderes als alle drei.
    const css = eigen("#0a0b0c", "#f0f1f2");
    expect(css).not.toBe("");
    expect(css).not.toBe(CONSENT_THEME_DARK_CSS);
    expect(css).not.toContain("@media");
  });
});
