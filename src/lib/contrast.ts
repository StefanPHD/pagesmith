// DAS KONTRAST-VERHAELTNIS ZWEIER FARBEN (Phase 11.13, Scheibe 11.13c; bindende
// Entscheidung P11.13-16). Eine REINE Funktion: kein DOM, kein Netzwerk, keine
// Datenbank, kein React, kein "use client", kein `import "server-only"`.
//
// WARUM SIE HIER LIEGT UND NICHT UNTER tracking/: Sie ist KEIN Baustein des
// ausgelieferten Textes. Sie rechnet eine Zahl, und die Zahl bleibt im Werkzeug — im
// Client als Hinweis am Farbfeld, im Erzeuger als Entscheidung zwischen zwei
// Schluesselwoertern. In den ausgelieferten Text gelangt sie NIE.
//
// SIE HAT ZWEI AUFRUFER MIT VERSCHIEDENEM GEGENSTAND, und die Trennung traegt
// Entscheidung P11.13-21:
//   1. DIE OBERFLAECHE (components/PublishView.tsx) rechnet den HINWEIS. Er sperrt
//      nichts; der Server rechnet ihn nie (P11.13-16).
//   2. DER ERZEUGER (tracking/consent-choice.ts) leitet zur ERZEUGUNGSZEIT
//      `color-scheme` ab. Das ist kein Hinweis, keine Meldung und kein Rueckkanal —
//      ausgeliefert wird allein das Schluesselwort `light` oder `dark`.
// Wer die zwei zusammenzieht, haelt eine der beiden Entscheidungen fuer gebrochen.
//
// DIE FORMEL IST GELESEN, NICHT ERINNERT — W3C, "Web Content Accessibility Guidelines
// (WCAG) 2.1", Definition "relative luminance" und "contrast ratio"
// (https://www.w3.org/TR/WCAG21/, GELESEN CC 2026-09-18):
//   L = 0.2126 * R + 0.7152 * G + 0.0722 * B
//   je Kanal: c = Kanal/255; ist c <= 0.04045, dann c/12.92, sonst ((c+0.055)/1.055)^2.4
//   Verhaeltnis = (L_hell + 0.05) / (L_dunkel + 0.05)
// DIE SCHWELLE 0.04045 STEHT IN WCAG 2.1; VERMERK P11.13-3 dieser Phase nennt 0.03928
// (die Zahl aus WCAG 2.0). FUER 8-BIT-SRGB SIND BEIDE GLEICHWERTIG: 10/255 = 0.0392
// liegt unter beiden Schwellen, 11/255 = 0.0431 ueber beiden — es gibt keinen
// Kanalwert, bei dem sie verschiedene Zweige waehlen. Hier steht die GELESENE.

import { CONSENT_COLOR_PATTERN } from "@/lib/settings";

/**
 * Zerlegt `#rrggbb` in drei Kanaele. WIRFT bei allem anderen.
 *
 * SIE IST KEIN ZWEITES FORMAT-TOR, und der Satz gehoert hierher, damit niemand sie
 * dafuer haelt: Das Tor ist `readConsentColor` in lib/settings.ts, und dort steht die
 * EINZIGE Zusicherung des geprueften Typs (Entscheidung P11.13-17). Diese Funktion
 * erzeugt keinen ConsentColor und laesst keinen entstehen — sie rechnet nur.
 * SIE BENUTZT DIESELBE KONSTANTE wie das Tor. Ein zweites Muster hier waere eine zweite
 * Wahrheit ueber das erlaubte Alphabet, und die beiden liefen beim naechsten Umbau
 * auseinander.
 * SIE WIRFT STATT ZURUECKZUGEBEN: Auf dem Erzeuger-Pfad ist ihr Argument ein
 * ConsentColor und damit typseitig gueltig; ein Wurf ist dort unerreichbar. Auf dem
 * Oberflaechen-Pfad ruft sie nur, wer vorher gelesen hat. Ein stiller Ersatzwert waere
 * genau der Rueckfall, den diese Scheibe an jeder Stelle ausschliesst.
 */
function kanaele(hex: string): [number, number, number] {
  if (!CONSENT_COLOR_PATTERN.test(hex))
    throw new Error(`contrastRatio: kein #rrggbb — ${JSON.stringify(hex)}`);
  return [
    Number.parseInt(hex.slice(1, 3), 16),
    Number.parseInt(hex.slice(3, 5), 16),
    Number.parseInt(hex.slice(5, 7), 16),
  ];
}

/**
 * Die relative Leuchtdichte nach WCAG 2.1, Bereich 0 (Schwarz) bis 1 (Weiss).
 *
 * DIE LINEARISIERUNG IST DER GANZE INHALT DIESER FUNKTION UND NICHT KOSMETIK: Ohne sie
 * — also mit dem rohen Kanalwert statt der Gamma-Umkehr — kommt fuer Schwarz gegen
 * Weiss WEITERHIN 21 heraus, weil dort L 0 und 1 bleibt. Ein Referenzwert aus
 * Schwarz/Weiss taugt deshalb NICHT als Waechter dieser Zeile; nur ein MITTLERES GRAU
 * trennt die zwei Rechnungen. Der Test CT2 in contrast.test.ts haelt genau das, und die
 * Pflicht-Mutation M-e hat es gemessen: ohne Linearisierung fallen CT1, CT2, CSS6 und
 * UI10 — die Schwarz/Weiss-Zusicherungen in CT3 bleiben GRUEN.
 */
export function relativeLuminance(hex: string): number {
  const [r, g, b] = kanaele(hex).map((n) => {
    const c = n / 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/**
 * Das Kontrast-Verhaeltnis zweier Farben, 1 bis 21. Die Reihenfolge der Argumente ist
 * gleichgueltig — die hellere kommt in den Zaehler.
 */
export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const hell = Math.max(la, lb);
  const dunkel = Math.min(la, lb);
  return (hell + 0.05) / (dunkel + 0.05);
}
