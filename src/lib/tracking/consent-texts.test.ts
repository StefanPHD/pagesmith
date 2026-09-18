import { describe, expect, it } from "vitest";
import {
  CONSENT_LANGUAGES,
  CONSENT_TEXT_MAX_LENGTH,
  consentTextLength,
  readConsentText,
  type ConsentLanguage,
} from "@/lib/settings";
import { consentTexts, type ConsentTextTable } from "./consent-texts";

// DIE WAECHTER DER SPRACH-TABELLE (Phase 11.13, Scheibe 11.13e).
//
// DIE WORTLAUTE STEHEN HIER ALS LITERAL AUS ENTSCHEIDUNG P11.13-31 UND WERDEN NICHT AUS
// consent-texts.ts IMPORTIERT (Invariante Q5). Wer sie importierte, baute einen SPIEGEL:
// Der Test bestaetigte dann jede Aenderung am Wortlaut, statt sie zu fangen
// (docs/immer-beachten.md, EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE
// AUS DEM CODE).
//
// SIE SIND OWNER-ENTSCHEIDUNGEN, KEINE CODE-BEFUNDE. Wer einen aendert, braucht eine neue
// Freigabe, und DIESE Tests werden dabei rot — das ist ihr Zweck.

const DE: ConsentTextTable = {
  sachtext:
    "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.",
  akzeptieren: "Alle akzeptieren",
  speichern: "Auswahl speichern",
  ablehnen: "Ablehnen",
  weg: "Einstellungen",
  gruppen: "Bereiche",
  messung: "Messung",
  werbung: "Werbung",
  leisteAria: "Einwilligung",
  fensterAria: "Einwilligung",
  widerrufWarnung:
    "pagesmithConsentRevoke: Es liegt keine gespeicherte Entscheidung vor, die zu widerrufen waere. Steht der Dialog gerade offen, entscheide dort.",
};

const EN: ConsentTextTable = {
  sachtext: "This site can use tracking services. You decide whether that happens.",
  akzeptieren: "Accept all",
  speichern: "Save selection",
  ablehnen: "Reject all",
  weg: "Settings",
  gruppen: "Categories",
  messung: "Analytics",
  werbung: "Advertising",
  leisteAria: "Consent",
  fensterAria: "Consent",
  widerrufWarnung:
    "pagesmithConsentRevoke: No stored decision to revoke. If the dialog is currently open, decide there.",
};

const ELF_FELDER = [
  "sachtext",
  "akzeptieren",
  "speichern",
  "ablehnen",
  "weg",
  "gruppen",
  "messung",
  "werbung",
  "leisteAria",
  "fensterAria",
  "widerrufWarnung",
] as const;

// DIE KENNUNG TX6 IST ABSICHTLICH FREI: Der Plan der Stufe 1 fuehrte unter ihr einen
// QUELLTEXT-WAECHTER ("kein Wortlaut steht ein zweites Mal im Repo"). Er ist vor dem Bau
// GESTRICHEN worden — er saehe Zeichen und nicht Bedeutung und traefe, was legitim
// dasteht: "Einstellungen" und "Einwilligung" sind auch Beschriftungen der
// App-Oberflaeche (docs/immer-beachten.md, EIN WAECHTER UEBER ZEICHEN DARF DIE GESTALT DES
// GEPRUEFTEN NICHT BESTIMMEN). Die Nummer wird NICHT neu vergeben; die Luecke ist die Spur
// der Streichung.
describe("consentTexts — die Wortlaute (Scheibe 11.13e)", () => {
  // TX1. DIE DEUTSCHE TABELLE, FELD FUER FELD.
  // WODURCH ROT: jede Aenderung an einem der elf deutschen Wortlaute — auch ein
  // Satzzeichen, auch die Gross-/Kleinschreibung, auch ein Umlaut, wo heute keiner steht.
  // ER FAENGT ZUGLEICH EINE ABSCHRIFT (Invariante Q3): Wer den deutschen Zweig abschreibt
  // statt zu verweisen und sich dabei um ein Zeichen vertut, wird hier rot.
  it("TX1: die deutsche Tabelle traegt die elf freigegebenen Wortlaute", () => {
    expect(consentTexts("de")).toEqual(DE);
  });

  // TX2. DIE ENGLISCHE TABELLE, FELD FUER FELD.
  // WODURCH ROT: jede Aenderung an einem englischen Wortlaut — und, weil hier ein
  // VOLLSTAENDIGER Vergleich steht, auch ein EN-Zweig, der ein Feld aus dem deutschen
  // durchreicht.
  it("TX2: die englische Tabelle traegt die elf freigegebenen Wortlaute", () => {
    expect(consentTexts("en")).toEqual(EN);
  });

  // TX3. DIE VOLLSTAENDIGKEIT (Invariante Q4) — AUF DREI ACHSEN, und die dritte ist die
  // eigentliche: (a) beide Zweige tragen dieselben elf Namen, (b) kein Feld ist leer,
  // (c) DIE ZAHL IST ELF und nicht zehn. Die Aufzaehlung ELF_FELDER steht hier als
  // Literal aus dem Zuschnitt, nicht aus dem Typ — ein aus dem Typ gezogener Vergleich
  // waere wieder ein Spiegel.
  // WODURCH ROT: ein zwoelftes Feld ohne Freigabe, ein entferntes Feld, ein leeres Feld.
  it("TX3: beide Zweige tragen dieselben ELF nicht-leeren Felder", () => {
    expect(ELF_FELDER).toHaveLength(11);
    for (const sprache of CONSENT_LANGUAGES) {
      const t = consentTexts(sprache);
      expect(Object.keys(t).sort(), sprache).toEqual([...ELF_FELDER].sort());
      for (const feld of ELF_FELDER) {
        expect(t[feld].length, sprache + "." + feld).toBeGreaterThan(0);
      }
    }
  });

  // TX4. DIE ZWEI ZWEIGE SIND VERSCHIEDEN — FELD FUER FELD.
  // OHNE IHN WAEREN TX1 UND TX2 GRUEN, WENN JEMAND DEN EN-ZWEIG AUF DIE DEUTSCHEN
  // KONSTANTEN ZEIGEN LIESSE UND DIE ERWARTUNG HIER MITAENDERTE. Er prueft die SACHE:
  // eine Sprachwahl, die nichts aendert, ist keine.
  // ER TRAEGT EINE BENANNTE AUSNAHMELISTE UND KEINE ALLGEMEINE DULDUNG: Heute ist sie
  // LEER. Gibt Entscheidung P11.13-31 je eine Zelle in beiden Sprachen gleich frei,
  // gehoert sie hier hinein — sichtbar, nicht als aufgeweichte Assertion.
  it("TX4: kein Feld traegt in beiden Sprachen denselben Wert", () => {
    const AUSNAHMEN: ReadonlyArray<(typeof ELF_FELDER)[number]> = [];
    for (const feld of ELF_FELDER) {
      if (AUSNAHMEN.includes(feld)) continue;
      expect(consentTexts("de")[feld], feld).not.toBe(consentTexts("en")[feld]);
    }
  });

  // TX5. UNSERE EIGENEN STANDARD-SACHTEXTE GEHEN DURCH DASSELBE TOR WIE DER DES
  // BETREIBERS (Invariante Q8, bindende Entscheidung P11.13-37).
  //
  // DER GRUND IST EIN GEMESSENER MANGEL: Das Tor greift zur Laufzeit auf
  // settings.consent.text, also auf BETREIBER-Eingabe. UNSER Satz laeuft an ihm vorbei —
  // weder Zeichen noch Laenge werden geprueft. Ein englischer Standardsatz ueber N oder
  // mit einem unsichtbaren Zeichen ginge heute durch, und der Betreiber saehe den Schaden
  // auf seiner Live-Seite.
  // WODURCH ROT: ein Standardsatz mit Steuer- oder Bidi-Zeichen, ein leerer, einer ueber
  // CONSENT_TEXT_MAX_LENGTH.
  it("TX5: jeder Standard-Sachtext besteht readConsentText und die Laengengrenze", () => {
    for (const sprache of CONSENT_LANGUAGES) {
      const satz = consentTexts(sprache).sachtext;
      expect(readConsentText(satz), sprache).not.toBe("unknown");
      expect(consentTextLength(satz), sprache).toBeLessThanOrEqual(
        CONSENT_TEXT_MAX_LENGTH
      );
    }
    // POSITIVKONTROLLE des Instruments im selben Lauf: das Tor weist wirklich ab.
    expect(readConsentText("a\nb")).toBe("unknown");
    expect(readConsentText("x".repeat(CONSENT_TEXT_MAX_LENGTH + 1))).toBe(
      "unknown"
    );
  });

  // TX7. DER `never`-ZWEIG IST ERREICHBAR UND WIRFT — er ist die einzige Stelle, an der
  // ein unbekannter Wert ueberhaupt ankommen koennte, und er faellt LAUT statt still auf
  // Deutsch zurueckzufallen (docs/immer-beachten.md, EIN UNBEKANNTER KONFIGURATIONSWERT
  // BRICHT LAUT AB).
  // DAS ERZWINGEN IST SICHTBAR UND KEIN VERSEHEN: Im Typsystem ist dieser Aufruf nicht
  // darstellbar — genau das ist die Zusage.
  it("TX7: eine unbekannte Sprache wirft, statt still auf Deutsch zu fallen", () => {
    expect(() =>
      consentTexts("__ps_x" as unknown as ConsentLanguage)
    ).toThrowError(/unbekannte Sprache/);
  });
});
