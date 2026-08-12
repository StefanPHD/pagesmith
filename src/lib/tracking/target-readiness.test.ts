import { describe, expect, it } from "vitest";
import {
  hasPixelId,
  hasSecret,
  targetReadiness,
  type TargetReadiness,
} from "./target-readiness";

// ===========================================================================
// DER BENANNTE ZUSTAND (Phase 11, Scheibe A der Vereinheitlichung).
//
// WOGEGEN HIER GEPRUEFT WIRD, und der Absatz ist der Grund, warum diese Datei
// keine Tautologie ist: Die Funktion hat in dieser Scheibe KEINEN Konsumenten.
// Ein Test, der nur ihre Implementierung nachschreibt, prueft nichts. Jeder
// Fall unten bildet deshalb eine BESTEHENDE, GEMESSENE Bedingung eines der
// beiden heutigen Urteile ab (erhoben am Repo, 2026-08-12):
//  - URTEIL 1, die Oberflaechen-Ableitung: listConfiguredTargets in
//    app/projects/actions.ts — meldet konfiguriert, sobald eine Geheimnis-Zeile
//    existiert; die Kennung sieht sie nicht an.
//  - URTEIL 2, der Aufloesungs-Pfad: getCapiConfigByTrackingKey in
//    capi/token.ts — der withPixel-Filter verlangt eine nicht-leere Kennung,
//    die Geheimnis-Schleife einen nicht-leeren String, und die Paarung nimmt
//    nur auf, wer BEIDES traegt.
// Je Test steht darunter, WELCHE dieser Bedingungen er abbildet.
// ===========================================================================

/** Kurzform, damit die Fixtures die geprueften Achsen nicht im Rauschen verlieren. */
function readiness(
  pixelId: unknown,
  secret: unknown,
  adapterExists: boolean,
): TargetReadiness {
  return targetReadiness({ pixelId, secret, adapterExists });
}

/** Die fehlenden Teile als Menge — die Reihenfolge ist KEINE Rangfolge (s. Modul). */
function missingOf(state: TargetReadiness): readonly string[] {
  return state.kind === "incomplete" ? state.missing : [];
}

// ===========================================================================
// DIE VIER KOMBINATIONEN, DIE HEUTE AUFTRETEN KOENNEN
//
// Alle vier tragen einen Adapter: TRACKING_TARGETS hat drei Mitglieder, und
// jedes hat sowohl einen Zweig in dispatchForward als auch hasAdapter: true in
// TARGET_CARDS (GEMESSEN, 2026-08-12). Die vier Kombinationen OHNE Adapter
// haben heute keinen moeglichen Fall — bis auf T7, der den Vertrag fuer genau
// diesen Moment festhaelt.
// ===========================================================================

describe("targetReadiness — die Kombinationen, die heute auftreten koennen", () => {
  it("T1: Kennung UND Zugangsdatum UND Adapter -> ready", () => {
    // BILDET AB: die Paarung in URTEIL 2 — nur wer BEIDES traegt, wird Empfaenger.
    // WIRD ROT, WENN: ein vollstaendig eingerichtetes Ziel nicht als ready gilt,
    // etwa weil ein Teil aus der Verknuepfung faellt.
    expect(readiness("123456789012345", "geheim", true)).toEqual({ kind: "ready" });
  });

  it("T2: Kennung ohne Zugangsdatum -> incomplete, und es fehlt das Zugangsdatum", () => {
    // BILDET AB: die Geheimnis-Schleife in URTEIL 2 verwirft das Ziel, wenn kein
    // nicht-leerer Wert vorliegt.
    // WIRD ROT, WENN: ein Ziel ohne Zugangsdatum als ready gilt — oder wenn der
    // FALSCHE Teil als fehlend benannt wird.
    const state = readiness("123456789012345", undefined, true);
    expect(state.kind).toBe("incomplete");
    expect(missingOf(state)).toEqual(["secret"]);
  });

  it("T3: Zugangsdatum ohne Kennung -> incomplete, und es fehlt die Kennung", () => {
    // BILDET AB: DEN GEMESSENEN DEFEKT. URTEIL 1 meldet dieses Ziel als
    // konfiguriert (die Zeile existiert), URTEIL 2 verwirft es im withPixel-Filter,
    // BEVOR es ueberhaupt gepaart wird. Der Betreiber sieht "Zugangsdaten
    // hinterlegt" und bekommt nie einen Forward.
    // WIRD ROT, WENN: dieses Ziel als ready gilt — oder wenn statt der Kennung ein
    // anderer Teil benannt wird.
    const state = readiness("", "geheim", true);
    expect(state.kind).toBe("incomplete");
    expect(missingOf(state)).toEqual(["pixelId"]);
  });

  it("T4: weder Kennung noch Zugangsdatum -> BEIDE fehlenden Teile werden genannt", () => {
    // BILDET AB: beide Bedingungen aus URTEIL 2 zugleich (Filter und Schleife).
    // WIRD ROT, WENN: der Zustand nur EINEN der beiden fehlenden Teile nennt.
    // WARUM DIE MENGE UND NICHT EIN GRUND: Ein einzelner Grund verlangte eine
    // Rangfolge, und der heutige Code gibt keine her (s. Modul-Kommentar an
    // targetReadiness). Wer hier auf einen Grund verkuerzt, trifft im Vorbeigehen
    // eine Produktentscheidung, die in Scheibe B gehoert.
    const state = readiness("   ", "", true);
    expect(state.kind).toBe("incomplete");
    expect(missingOf(state)).toContain("pixelId");
    expect(missingOf(state)).toContain("secret");
    expect(missingOf(state)).toHaveLength(2);
  });
});

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

// ===========================================================================
// DER ADAPTER-TEIL
// ===========================================================================

describe("der Adapter-Teil", () => {
  it("T7: ohne Adapter ist ein Ziel nicht lieferfaehig, auch mit Kennung und Zugangsdatum", () => {
    // BILDET AB: den Erschoepfungs-Rest in dispatchForward (capi/ingest.ts) — ein
    // Ziel ohne Zweig loest dort nichts aus.
    // DIESE EINGABE KANN HEUTE FUER KEIN BEKANNTES ZIEL ENTSTEHEN (alle drei tragen
    // einen Zweig und hasAdapter: true). Der Test haelt den Vertrag fuer den Moment
    // fest, fuer den der Render-Zweig an hasAdapter in TARGET_CARDS ausdruecklich
    // stehengelassen wurde: ein Ziel, dessen Adapter noch fehlt.
    // WIRD ROT, WENN: der Adapter-Teil aus der Verknuepfung faellt — dann meldete
    // der Zustand lieferfaehig fuer ein Ziel, das keinen Empfaenger hat.
    //
    // EINZELSTUECK, UND ZWAR GEMESSEN (Mutationsprobe M4 am 2026-08-12: der
    // Adapter-Teil aus der Sammlung entfernt -> GENAU DIESER Test fiel, kein
    // weiterer). Er traegt die Fehlerklasse "lieferfaehig ohne Empfaenger" ALLEIN.
    // Wer ihn als redundant entfernt, nimmt die einzige Abdeckung mit.
    const state = readiness("123456789012345", "geheim", false);
    expect(state.kind).toBe("incomplete");
    expect(missingOf(state)).toEqual(["adapter"]);
  });
});

// ===========================================================================
// DIE REGEL, AUF DIE SICH DIE BEIDEN FOLGENDEN BLOECKE BERUFEN
//
// Ein Test, der eine Fehlerklasse ALLEIN traegt, wird im Kommentar als solcher
// benannt — sonst entfernt ihn spaeter jemand als vermeintlich redundant und
// nimmt die einzige Abdeckung mit.
//
// OB EIN TEST DAS IST, SAGT DIE MESSUNG UND NICHT DER ZUSCHNITT. Hier stand
// eine ZAHL ("die zwei Einzelstuecke"), und die Mutationsprobe M5 hat sie
// widerlegt. Das Ergebnis je Test steht deshalb an seinem eigenen Block, nicht
// hier als Summe.
// ===========================================================================

describe("EINZELSTUECK T8 — die Consent-Invariante", () => {
  it("T8: der Kennungs-Teil ist EINZELN beziehbar und haengt NICHT am Gesamtzustand", () => {
    // EINZELSTUECK. ER TRAEGT ALLEIN DIESE FEHLERKLASSE: "der
    // Einwilligungs-Schluessel wird an Vollstaendigkeit gebunden". Solange es
    // keinen Konsumenten gibt, ist dieser Test der EINZIGE Waechter der Invariante
    // aus docs/aktiver-stand.md, Abschnitt 7.5 — kein anderer Test und kein
    // Compiler-Fehler faenge es, wenn hasPixelId spaeter ueber targetReadiness
    // implementiert wuerde.
    //
    // WORAUF DIESE AUSSAGE BERUHT, und die Einschraenkung gehoert dazu, damit sie
    // nicht staerker gelesen wird als sie ist: Sie beruht auf der ABDECKUNG (kein
    // anderer Test in dieser Datei behauptet diese Eigenschaft), NICHT auf einer
    // Mutationsprobe. Die Fehlerklasse laesst sich hier gar nicht als
    // Ein-Achsen-Mutation herstellen — sie entsteht erst, wenn ein KONSUMENT den
    // Gesamtzustand statt dieses Praedikats liest, und einen solchen gibt es in
    // dieser Scheibe nicht. Der Test ist damit eine VORWEGGENOMMENE Abdeckung fuer
    // Scheibe B und D, kein mutationsbelegter Waechter von heute.
    //
    // BILDET AB: die heutige Draht-Bedingung. Das Consent-Memo (consentTargets in
    // components/CodeImporter.tsx) filtert ALLEIN auf eine gesetzte Kennung; das
    // Zugangsdatum geht dort nicht ein.
    // WIRD ROT, WENN: hasPixelId anfaengt, andere Teile mitzulesen — dann waere ein
    // teilweise eingerichtetes Ziel ohne Consent-Schluessel, und weil der Draht eine
    // Einbahnstrasse ist, hiesse das fail-closed "nicht erlaubt" auf jeder bereits
    // publizierten Seite.
    const pixelId = "123456789012345";

    // Dasselbe Ziel: die Kennung liegt vor, sonst nichts.
    const state = readiness(pixelId, undefined, false);

    // Der Gesamtzustand sagt "nicht lieferfaehig" …
    expect(state.kind).toBe("incomplete");
    // … und der Kennungs-Teil sagt trotzdem und unabhaengig davon "vorhanden".
    expect(hasPixelId(pixelId)).toBe(true);
    // Der Schluessel wuerde also weiterhin geschrieben — genau das verlangt die
    // Invariante.
    expect(missingOf(state)).not.toContain("pixelId");
  });
});

describe("T9 — der Rueckfall auf einen Wahrheitswert (KEIN Einzelstueck, s. M5)", () => {
  it("T9: zwei verschiedene Fehl-Zustaende sind UNTERSCHEIDBAR", () => {
    // ER IST NICHT DAS EINZIGE, WAS DEN KOLLAPS FAENGT — und diese Richtigstellung
    // steht hier, weil der Zuschnitt das Gegenteil annahm und die MESSUNG es
    // widerlegt hat (Mutationsprobe M5 am 2026-08-12: die Nutzlast `missing` auf
    // die leere Menge gesetzt -> es fielen T2, T3, T4, T7 UND dieser Test, fuenf
    // insgesamt). Wer hier "Einzelstueck" liest, verliesse sich auf eine
    // Exklusivitaet, die es nicht gibt.
    //
    // WAS ER ALS EINZIGER TUT, und deshalb bleibt er: Er vergleicht ZWEI
    // Fehl-Zustaende MITEINANDER. Jeder andere Test nagelt EINEN Fall fuer sich
    // fest; keiner behauptet, dass zwei verschiedene Ursachen zu verschiedenen
    // Ergebnissen fuehren. Genau diese Aussage ist der Grund, warum der Zustand
    // kein Wahrheitswert ist.
    //
    // BILDET AB: den Grund, warum der Defekt aus T3 nie auffiel. In der Oberflaeche
    // sehen "nichts eingerichtet" und "Zugangsdaten hinterlegt, aber nie beliefert"
    // heute gleich aus. Ein Wahrheitswert im neuen Bauteil reproduzierte genau diese
    // Ununterscheidbarkeit.
    // WIRD ROT, WENN: die Nutzlast `missing` verschwindet oder fuer beide Faelle
    // dasselbe liefert.
    const ohneSecret = readiness("123456789012345", undefined, true);
    const ohnePixel = readiness("", "geheim", true);

    // Beide sind nicht lieferfaehig …
    expect(ohneSecret.kind).toBe("incomplete");
    expect(ohnePixel.kind).toBe("incomplete");
    // … und sagen trotzdem VERSCHIEDENES.
    expect(missingOf(ohneSecret)).not.toEqual(missingOf(ohnePixel));
  });
});
