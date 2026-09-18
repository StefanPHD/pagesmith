// DIE KONTRASTFUNKTION (Phase 11.13, Scheibe 11.13c; bindende Entscheidung P11.13-16).
//
// DIE REFERENZWERTE STAMMEN NICHT AUS DEM EIGENEN CODE — sonst waere dieser Test ein
// Spiegel, der jeden Rechenfehler bestaetigt (docs/immer-beachten.md, "EIN WAECHTER UEBER
// DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"). Sie sind GELESEN:
//
//   QUELLE A — Formel und Schwellen:
//     W3C, "Web Content Accessibility Guidelines (WCAG) 2.1", Definitionen
//     "relative luminance" und "contrast ratio"
//     https://www.w3.org/TR/WCAG21/   (GELESEN CC, 2026-09-18)
//   QUELLE B — die Zahlenpaare:
//     "WebAIM: Contrast Checker", https://webaim.org/resources/contrastchecker/
//     je Paar ueber die Adressparameter fcolor/bcolor aufgerufen (GELESEN CC, 2026-09-18)
//   GELESEN UND OHNE ZAHLENPAAR GEBLIEBEN, damit der Nicht-Treffer eine Reichweite hat:
//     W3C, "G18: Ensuring that a contrast ratio of at least 4.5:1 exists between text …"
//     https://www.w3.org/TR/WCAG20-TECHS/G18.html  und
//     W3C, "Understanding Success Criterion 1.4.3: Contrast (Minimum)"
//     https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html
//     — beide tragen KEIN einziges Hex-Paar (Achse /#[0-9a-fA-F]{6}/ ueber textContent,
//     null Treffer, CC 2026-09-18).
//
// WEBAIM SCHNEIDET AB, ES RUNDET NICHT — GEMESSEN an zwei Paaren (CC, 2026-09-18):
// 3,9494 erscheint dort als "3.94" (gerundet waere 3,95), 16,9754 als "16.97" (gerundet
// 16,98). Die Tests vergleichen deshalb ABGESCHNITTEN auf zwei Stellen und nicht
// gerundet. WER DAS NICHT WEISS, HAELT EINE ABWEICHUNG IN DER ZWEITEN STELLE FUER EINEN
// RECHENFEHLER. Die 16,98 in VERMERK P11.13-4 dieser Phase ist dieselbe Zahl, gerundet.
import { describe, expect, it } from "vitest";
import { contrastRatio, relativeLuminance } from "./contrast";

/** Die Anzeigeform von WebAIM: zwei Stellen, ABGESCHNITTEN. */
const wieWebaim = (x: number): number => Math.floor(x * 100) / 100;

describe("contrastRatio — gegen gelesene Referenzwerte (Scheibe 11.13c)", () => {
  // CT1. DIE VIER GELESENEN PAARE. Sie decken die Spannweite ab: das Extrem, zwei
  // mittlere Graustufen und die eigene dunkle Palette.
  it("CT1: vier Paare aus dem WebAIM-Rechner, abgeschnitten auf zwei Stellen", () => {
    const paare: [string, string, number][] = [
      ["#000000", "#ffffff", 21],
      ["#767676", "#ffffff", 4.54],
      ["#808080", "#ffffff", 3.94],
      ["#f9fafb", "#111827", 16.97],
    ];
    for (const [a, b, soll] of paare) {
      expect(wieWebaim(contrastRatio(a, b)), `${a} gegen ${b}`).toBe(soll);
      // DIE REIHENFOLGE IST GLEICHGUELTIG — die hellere Farbe kommt in den Zaehler.
      expect(wieWebaim(contrastRatio(b, a)), `${b} gegen ${a}`).toBe(soll);
    }
  });

  // CT2. DER EINZIGE TEST, DER DIE LINEARISIERUNG HAELT (Pflicht-Mutation M-e), und der
  // Grund gehoert in den Kommentar, sonst wird er beim naechsten Aufraeumen als Dublette
  // von CT1 gestrichen:
  // OHNE DIE GAMMA-UMKEHR LIEFERT SCHWARZ GEGEN WEISS WEITERHIN 21 — dort bleibt die
  // Leuchtdichte 0 und 1, ob man linearisiert oder nicht. EIN REFERENZPAAR AUS
  // SCHWARZ/WEISS IST GEGEN DIESE MUTATION BLIND. Erst ein MITTLERES GRAU trennt die
  // zwei Rechnungen: #767676 gegen Weiss ergibt mit Linearisierung 4,54 und ohne sie
  // 2,05 (GEMESSEN am eigenen Lauf, CC, 2026-09-18).
  // WER IHN ROT VORFINDET, HAT DIE LINEARISIERUNG VERLOREN, nicht einen Vergleichswert
  // veralten lassen.
  it("CT2: ein mittleres Grau trennt die Rechnung mit von der ohne Linearisierung", () => {
    expect(wieWebaim(contrastRatio("#767676", "#ffffff"))).toBe(4.54);
    // DIE GEGENPROBE IM SELBEN LAUF: die Rechnung OHNE Linearisierung, hier von Hand
    // nachgebildet, trifft denselben Wert NICHT — und bei Schwarz/Weiss sehr wohl.
    const ohne = (h: string): number => {
      const c = [1, 3, 5].map((i) => Number.parseInt(h.slice(i, i + 2), 16) / 255);
      return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    };
    const ohneVerhaeltnis = (a: string, b: string): number => {
      const x = ohne(a);
      const y = ohne(b);
      return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    expect(wieWebaim(ohneVerhaeltnis("#767676", "#ffffff"))).not.toBe(4.54);
    expect(wieWebaim(ohneVerhaeltnis("#000000", "#ffffff"))).toBe(21);
  });

  // CT3. DIE RAENDER DER RECHNUNG, aus der Definition und nicht aus dem Code: Weiss gegen
  // Weiss ist 1, und die relative Leuchtdichte laeuft von 0 (Schwarz) bis 1 (Weiss).
  it("CT3: 1 bei gleicher Farbe; Leuchtdichte 0 und 1 an den Enden", () => {
    expect(contrastRatio("#ffffff", "#ffffff")).toBe(1);
    expect(contrastRatio("#123456", "#123456")).toBe(1);
    expect(relativeLuminance("#000000")).toBe(0);
    expect(relativeLuminance("#ffffff")).toBe(1);
  });

  // CT4. SIE WIRFT BEI ALLEM, WAS NICHT `#rrggbb` IST — mit demselben Alphabet wie das
  // Format-Tor, weil sie DIESELBE Konstante benutzt. SIE IST DAMIT KEIN ZWEITES TOR: Sie
  // erzeugt keinen ConsentColor und laesst keinen entstehen.
  it("CT4: jedes Fremdformat wirft — mit Positivkontrolle", () => {
    for (const roh of [
      "#fff",
      "#FFFFFF",
      "#fff;}",
      "#000000;}.bar{display:none",
      "</script>",
      "url(x)",
      "",
      "ffffff",
      "#12345g",
      "#1234567",
    ]) {
      expect(() => contrastRatio(roh, "#ffffff"), roh).toThrow();
    }
    // POSITIVKONTROLLE im selben Lauf: ein gueltiger Wert wirft NICHT.
    expect(() => contrastRatio("#0a0b0c", "#ffffff")).not.toThrow();
  });
});
