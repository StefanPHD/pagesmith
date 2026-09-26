// DER BYTE-WAECHTER UEBER DEN AUSGELIEFERTEN TEXT (Phase 11.11, Scheibe 11.11d;
// Entscheidung P11.11-22, Punkt (g)) — SEIT DER PHASE 12.5, SCHEIBE 1, EIN
// DIFFERENZ-NACHWEIS (Entscheidung P12.5-14 der Phase 12.5).
//
// WOHER ER KOMMT: Die Scheibe 11.11d hat an den zwei ERZEUGERN des ausgelieferten
// Textes je EIN Wort geaendert — `export` an MAPPINGS_SCRIPT_ID (lib/generate.ts) und
// an SCRIPT_ID (lib/analytics/pageview-emitter.ts). Ein Export aendert kein Verhalten;
// dieser Waechter belegte damals, dass der erzeugte Text davon byte-gleich unberuehrt ist.
//
// WAS ER HEUTE FESTNAGELT: Die Schatten-Korrektur (Phase 12.5, Scheibe 1: E1–E3), der
// Formular-Track am Abschicken (Phase 12.5, Scheibe 1b: E4–E6) und die Absende-Buttons ohne
// eigene Aktionen (Phase 12.5, Scheibe 1c: E7–E9) aendern das Wiring-Script BEWUSST — als
// reine EINSETZUNG an neun Stellen (unten). Nach docs/immer-beachten.md,
// "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD, TRITT EIN DIFFERENZ-NACHWEIS AN IHRE
// STELLE", gilt jetzt: der erzeugte Text ist der alte plus GENAU diese Einsetzungen,
// sonst kein Zeichen. Geprueft wird: jede Einsetzung steht genau so oft da wie vorher
// genannt; nach ihrer Entfernung ist der Text byte-gleich zum Sollwert; ohne die
// Entfernung weicht er ab (Positivkontrolle).
// E6 IST ZUSAMMENGESETZT: Vorspann und Nachspann sind getippt, dazwischen steht die
// Track-Anweisung, die je Konfiguration anders lautet. Sie wird aus dem Track-Zweig des
// click-Listeners gelesen — einem Teil des ALTEN Textes, den der sha256 nach dem Entfernen
// mit abdeckt. Sie ist damit keine ungepruefte Zutat, sondern eine bereits gepinnte.
//
// DIE SOLLWERTE SIND UNVERAENDERT die vor der Scheibe 11.11d erhobenen und stehen in
// docs/claude-history/phase-11.11-import-bereinigung.md, ENTSCHEIDUNG P11.11-22, Punkt (g).
// DIE EINSETZUNGEN SIND AUS DEM BAU-AUFTRAG DER SCHEIBE GETIPPT, NICHT aus dem Code
// abgelesen oder importiert — sonst waere der Nachweis ein Spiegel.
//
// WIRD ER ROT, IST DAS EIN STOPP UND KEINE ANPASSUNG DES SOLLWERTS ODER DER EINSETZUNGEN.
// Ein nachgezogener Wert waere genau der SPIEGEL, den Entscheidung P11.11-18 verbietet:
// Er bestaetigte jede Aenderung, statt sie zu fangen. Eine weitere bewusste Aenderung am
// erzeugten Text braucht eine eigene Entscheidung und eine eigene benannte Einsetzung.
//
// SEINE GRENZE GEHOERT AN IHN SELBST: Der Aufbau ist eine SONDE, keine reale
// Kundenseite. Er sagt, dass DIESE Eingabe DIESEN Text erzeugt — nicht, dass eine von
// einem KI-Werkzeug erzeugte Seite unveraendert bleibt.

import { createHash } from "node:crypto";
import { describe, expect, it } from "vitest";
import { generateFunctional } from "./generate";
import { injectPageViewEmitter } from "./analytics/pageview-emitter";
import type { Mapping } from "./mappings";

// Der Aufbau — zeichengleich zu dem, mit dem die Sollwerte erhoben wurden.
const SAUBER =
  '<!DOCTYPE html><html lang="de"><head><title>Waechter</title></head>' +
  '<body><h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>' +
  '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>';

const MAPPINGS: Mapping[] = [
  {
    elementId: "ps-bbbbbb",
    type: "redirect",
    config: { url: "https://example.com/checkout", openInNewTab: false },
  },
  { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
];

const TRACKING_KEY = "aaaaaaaa-bbbb-cccc-dddd-eeeeeeeeeeee";

const OPTS = {
  metaPixelId: "1234567890",
  trackingKey: TRACKING_KEY,
  capiProxyUrl: "/api/e",
  consentTargets: ["meta", "analytics"] as readonly string[],
};

// GETIPPT aus ENTSCHEIDUNG P11.11-22, Punkt (g) — nicht aus einem Lauf abgelesen.
const SOLL_EXPORT = {
  bytes: 13250,
  sha256: "b6ee842b2a6652ff50f7e827ccefeaef615cdadc1b0b342b67645e0a33a471e6",
};
const SOLL_PUBLISHED = {
  bytes: 27158,
  sha256: "70a86db8444cbbd988913373fc7b0c63959ab80050066a333af9048ef1a89d46",
};

const sha = (s: string) =>
  createHash("sha256").update(s, "utf8").digest("hex");
const bytes = (s: string) => Buffer.byteLength(s, "utf8");

// DIE EINSETZUNGEN DER SCHATTEN-KORREKTUR (Phase 12.5, Scheibe 1) — GETIPPT aus dem
// Bau-Auftrag, nicht aus generate.ts abgelesen. Der Attributname steht aufgeloest da,
// so wie er im erzeugten Text steht.
// E1: die zwei lokalen Funktionen hinter der byId-Schleife.
const E1 = [
  "  // SCHATTEN-KORREKTUR (Phase 12.5, Scheibe 1): traegt das innerste markierte",
  "  // Element keine Klick-Aktion (track/redirect), gilt der Klick dem naechsten",
  "  // markierten Vorfahren, der eine traegt. Halt am ERSTEN -> hoechstens die",
  "  // Aktionen EINES Elements je Klick. text zaehlt nicht (in der Vorschau steht",
  "  // er in der Tabelle). Ein <form> beendet die Suche: weder wird von unten in",
  "  // ein <form> gelaufen noch aus einem <form> ohne Aktion heraus.",
  "  function hasClickAction(list) {",
  "    if (!list) return false;",
  "    for (var h = 0; h < list.length; h++) {",
  '      if (list[h].type === "track" || list[h].type === "redirect") return true;',
  "    }",
  "    return false;",
  "  }",
  "  function actionOwner(el) {",
  '    while (el && !hasClickAction(byId[el.getAttribute("data-pagesmith-id")])) {',
  '      if (el.tagName === "FORM") return null;',
  '      el = el.parentElement ? el.parentElement.closest("[data-pagesmith-id]") : null;',
  '      if (el && el.tagName === "FORM") return null;',
  "    }",
  "    return el;",
  "  }",
  "",
].join("\n");
// E2 (click-Listener) und E3 (auxclick-Listener): je EINE Zeile. Der fuehrende
// Zeilenumbruch gehoert dazu — erst er macht die beiden disjunkt (ohne ihn waere E2
// wegen der kuerzeren Einrueckung ein Teilstring von E3).
const E2 = "\n      el = actionOwner(el);";
const E3 = "\n        el = actionOwner(el);";

// DIE EINSETZUNGEN DES FORMULAR-TRACKS (Phase 12.5, Scheibe 1b) — GETIPPT aus dem
// Bau-Auftrag. E4 (click) und E5 (auxclick): ein Formular ist nie Eigentuemer eines
// Klicks; wie bei E2/E3 macht der fuehrende Zeilenumbruch die beiden disjunkt.
const E4 = '\n      if (el && el.tagName === "FORM") el = null;';
const E5 = '\n        if (el && el.tagName === "FORM") el = null;';
// E6: der submit-Listener vor dem Ende des Scripts — Vorspann, Track-Anweisung,
// Nachspann (s. Kopf).
const E6_VOR = [
  "  // FORMULAR-TRACK AM ABSCHICKEN (Phase 12.5, Scheibe 1b): Der Track eines <form>",
  "  // zaehlt beim Abschicken (submit), nicht beim Klick. Capture an document: ein",
  "  // Handler des Betreibers am Formular kann ihn weder mit stopPropagation noch mit",
  "  // preventDefault verdecken. KEIN preventDefault von uns: Ziel, Methode und",
  "  // Absenden gehoeren dem Betreiber. Eine Weiterleitung fuehrt ein Formular nicht",
  "  // aus. Einmal je Formular und Seitenleben.",
  "  var submittedForms = [];",
  "  document.addEventListener(",
  '    "submit",',
  "    function (e) {",
  "      var f = e.target;",
  '      if (!f || f.tagName !== "FORM") return;',
  "      if (submittedForms.indexOf(f) !== -1) return;",
  '      var actions = byId[f.getAttribute("data-pagesmith-id")];',
  "      if (!actions || !actions.length) return;",
  "      submittedForms.push(f);",
  "      for (var j = 0; j < actions.length; j++) {",
  "        var a = actions[j];",
  '        if (a.type === "track") {',
  "            ",
].join("\n");
const E6_NACH = ["", "        }", "      }", "    },", "    true", "  );", ""].join("\n");
// Die Track-Anweisung, wie sie im Track-Zweig des click-Listeners steht (alter Text).
const TRACK_AUF = 'if (a.type === "track") {\n            ';
const TRACK_ZU = '\n          } else if (a.type === "redirect")';
function e6Of(s: string): string {
  const auf = s.indexOf(TRACK_AUF);
  const zu = s.indexOf(TRACK_ZU, auf);
  if (auf === -1 || zu === -1) throw new Error("Track-Zweig des click-Listeners nicht gefunden");
  return E6_VOR + s.slice(auf + TRACK_AUF.length, zu) + E6_NACH;
}

// DIE EINSETZUNGEN DER ABSENDE-BUTTONS (Phase 12.5, Scheibe 1c) — GETIPPT aus dem
// freigegebenen Plan. E7: die lokale Funktion direkt hinter actionOwner (also direkt hinter
// E1). E8 (click) und E9 (auxclick): je eine Zeile hinter E4 bzw. E5; wie dort macht der
// fuehrende Zeilenumbruch die beiden disjunkt.
const E7 = [
  "  // ABSENDE-BUTTONS (Phase 12.5, Scheibe 1c; Entscheidung P12.5-37): ein Knopf, der",
  "  // ein Formular abschickt, traegt keine eigene Klick-Aktion - sein Klick gehoert dem",
  "  // Abschicken. Das Urteil faellt der Browser (form, type); type=\"button\" schickt",
  "  // nicht ab und behaelt seine Aktionen. Nur BUTTON und INPUT: bei anderen Tags ist",
  "  // type frei waehlbar (object).",
  "  function isSubmitButton(el) {",
  '    if (el.tagName !== "BUTTON" && el.tagName !== "INPUT") return false;',
  "    if (!el.form) return false;",
  '    return el.type === "submit" || el.type === "image";',
  "  }",
  "",
].join("\n");
const E8 = "\n      if (el && isSubmitButton(el)) el = null;";
const E9 = "\n        if (el && isSubmitButton(el)) el = null;";

// Wie oft eine Einsetzung im Text steht (nicht ueberlappend).
const count = (s: string, part: string) => s.split(part).length - 1;
// Der Text ohne die Einsetzungen. E6 zuerst (es haengt am Track-Zweig, der danach
// unberuehrt bleibt); die uebrigen sind disjunkt, ihre Reihenfolge ist nur festgelegt,
// damit sie reproduzierbar ist.
const withoutInsertions = (s: string) =>
  s
    .split(e6Of(s)).join("")
    .split(E9).join("")
    .split(E8).join("")
    .split(E5).join("")
    .split(E4).join("")
    .split(E7).join("")
    .split(E1).join("")
    .split(E3).join("")
    .split(E2).join("");

function exportDoc(): string {
  return generateFunctional(SAUBER, MAPPINGS, "export", OPTS);
}

function publishedDoc(): string {
  return injectPageViewEmitter(exportDoc(), TRACKING_KEY, "bar", {
    appearance: { theme: "auto" },
    text: "standard",
    language: "de",
  });
}

describe("Byte-Waechter: der ausgelieferte Text eines SAUBEREN Projekts", () => {
  it("W1': generateFunctional('export') = Vorher-Wert plus GENAU die Einsetzungen E1–E9", () => {
    const doc = exportDoc();
    // (3) die Einsetzungen zaehlen — erwartet je GENAU EINMAL (ein Wiring-Script mit
    // click-, auxclick- und submit-Listener, weil die Sonde exportiert).
    expect(count(doc, E1)).toBe(1);
    expect(count(doc, E2)).toBe(1);
    expect(count(doc, E3)).toBe(1);
    expect(count(doc, E4)).toBe(1);
    expect(count(doc, E5)).toBe(1);
    expect(count(doc, e6Of(doc))).toBe(1);
    expect(count(doc, E7)).toBe(1);
    expect(count(doc, E8)).toBe(1);
    expect(count(doc, E9)).toBe(1);
    // (4) entfernen -> byte-gleich zum Vorher-Wert.
    const rest = withoutInsertions(doc);
    expect(bytes(rest)).toBe(SOLL_EXPORT.bytes);
    expect(sha(rest)).toBe(SOLL_EXPORT.sha256);
    // (5) POSITIVKONTROLLE: ohne die Entfernung weicht der Text ab.
    expect(sha(doc)).not.toBe(SOLL_EXPORT.sha256);
    expect(bytes(doc)).not.toBe(SOLL_EXPORT.bytes);
  });

  it("W2': danach injectPageViewEmitter = Vorher-Wert plus GENAU die Einsetzungen E1–E9", () => {
    const doc = publishedDoc();
    expect(count(doc, E1)).toBe(1);
    expect(count(doc, E2)).toBe(1);
    expect(count(doc, E3)).toBe(1);
    expect(count(doc, E4)).toBe(1);
    expect(count(doc, E5)).toBe(1);
    expect(count(doc, e6Of(doc))).toBe(1);
    expect(count(doc, E7)).toBe(1);
    expect(count(doc, E8)).toBe(1);
    expect(count(doc, E9)).toBe(1);
    const rest = withoutInsertions(doc);
    expect(bytes(rest)).toBe(SOLL_PUBLISHED.bytes);
    expect(sha(rest)).toBe(SOLL_PUBLISHED.sha256);
    // POSITIVKONTROLLE.
    expect(sha(doc)).not.toBe(SOLL_PUBLISHED.sha256);
    expect(bytes(doc)).not.toBe(SOLL_PUBLISHED.bytes);
  });

  it("W3: der erzeugte Text ist DETERMINISTISCH — zwei Laeufe, ein Ergebnis", () => {
    // Ohne diesen Lauf waeren W1/W2 von einem zufaellig passenden Ergebnis nicht zu
    // unterscheiden: Traegt der Erzeuger irgendwann einen Zeitstempel oder einen
    // Zufallswert, faellt W1/W2 zwar auf — aber erst beim naechsten Lauf, und dann
    // ohne erkennbaren Grund.
    expect(exportDoc()).toBe(exportDoc());
    expect(publishedDoc()).toBe(publishedDoc());
  });

  it("W4: POSITIVKONTROLLE — eine veraenderte Eingabe erzeugt einen ANDEREN Text", () => {
    // Ohne sie waeren W1 und W2 von einem Erzeuger, der IMMER denselben String
    // liefert, nicht zu unterscheiden (docs/immer-beachten.md, Lektion (d) zu
    // Waechtern, die Abwesenheit pruefen — hier dieselbe Denkfigur an einer
    // Gleichheits-Zusicherung).
    const anders = generateFunctional(
      SAUBER.replace("Titel", "Anderer Titel"),
      MAPPINGS,
      "export",
      OPTS,
    );
    expect(sha(anders)).not.toBe(SOLL_EXPORT.sha256);
  });
});
