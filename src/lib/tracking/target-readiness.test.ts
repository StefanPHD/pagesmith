import { describe, expect, it } from "vitest";
import { hasPixelId, hasSecret } from "./target-readiness";

// ===========================================================================
// DIE ZWEI GETEILTEN PRAEDIKATE (Phase 11, Vereinheitlichung).
//
// WOGEGEN HIER GEPRUEFT WIRD: Jeder Fall unten bildet eine BESTEHENDE,
// GEMESSENE Bedingung eines der beiden heutigen Urteile ab (erhoben am Repo,
// 2026-08-12):
//  - URTEIL 1, die Oberflaechen-Ableitung: listConfiguredTargets in
//    app/projects/actions.ts — meldet konfiguriert, sobald eine Geheimnis-Zeile
//    existiert; die Kennung sieht sie nicht an.
//  - URTEIL 2, der Aufloesungs-Pfad: getCapiConfigByTrackingKey in
//    capi/token.ts — der withPixel-Filter verlangt eine nicht-leere Kennung,
//    die Geheimnis-Schleife einen nicht-leeren String, und die Paarung nimmt
//    nur auf, wer BEIDES traegt.
// Je Test steht darunter, WELCHE dieser Bedingungen er abbildet.
//
// HIER STANDEN EINMAL SIEBEN WEITERE TESTS ueber eine Zusammensetzung
// (targetReadiness). Sie ist gestrichen (Owner-Entscheidung 2026-08-13, sie hatte
// nach vier Scheiben keinen Konsumenten); die Tests sind mit ihr entfallen. Was
// die beiden Praedikate zusichern, steht unveraendert unten — und ihre vier
// Produktiv-Aufrufstellen sind im Kopf des Moduls benannt.
// ===========================================================================

// ===========================================================================
// DIE LEER-REGELN, JE EINZELN — UND SIE SIND NICHT DIESELBEN
// ===========================================================================

describe("die beiden Leer-Regeln sind ASYMMETRISCH, und das ist gemessen", () => {
  it("T5: eine Kennung aus reinem Leerraum zaehlt als ABWESEND", () => {
    // BILDET AB: getPixelId (lib/settings.ts) trimmt, und der withPixel-Filter in
    // URTEIL 2 vergleicht gegen "". Ein Leerraum-Wert ist dort abwesend.
    // WIRD ROT, WENN: der Trim in hasPixelId faellt — dann gilt "   " als Kennung,
    // das Ziel erschiene lieferfaehig und wuerde nie beliefert.
    expect(hasPixelId("   ")).toBe(false);
    expect(hasPixelId("\t\n ")).toBe(false);
    expect(hasPixelId(" 123 ")).toBe(true);
    expect(hasPixelId("")).toBe(false);
    expect(hasPixelId(undefined)).toBe(false);
    expect(hasPixelId(null)).toBe(false);
    expect(hasPixelId(12345)).toBe(false);
  });

  it("T6: ein LEERES Zugangsdatum zaehlt als abwesend — Leerraum aber NICHT", () => {
    // BILDET AB: die Geheimnis-Schleife in URTEIL 2 nimmt einen Nicht-String als ""
    // und verwirft nur bei leerem Wert. Sie TRIMMT NICHT.
    // WIRD ROT, WENN: die Leer-Pruefung durch eine reine Existenz-Pruefung ersetzt
    // wird (dann gaelte "" als vorhanden) — ODER wenn jemand hier einen Trim
    // ergaenzt und damit vom Aufloesungs-Pfad abweicht.
    // DIE ASYMMETRIE ZU T5 IST DER EIGENTLICHE ERTRAG DIESES TESTS: Sie sieht wie
    // ein Fehler aus und ist der gemessene Bestand. Wer sie "harmonisiert", aendert
    // Verhalten, ohne es zu merken.
    expect(hasSecret("")).toBe(false);
    expect(hasSecret(undefined)).toBe(false);
    expect(hasSecret(null)).toBe(false);
    expect(hasSecret(42)).toBe(false);
    expect(hasSecret(" ")).toBe(true);
    expect(hasSecret("geheim")).toBe(true);
  });
});
