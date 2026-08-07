import { describe, expect, it } from "vitest";
import { CONSENT_WIRE_FIELD, consentAllows } from "./consent-wire";
import { META_CONSENT_TARGET } from "./consent";

// ===========================================================================
// DER LESER DES EINWILLIGUNGS-SIGNALS (Phase 11, fuenfte Scheibe).
//
// REINE EINHEITSTESTS — kein Handler, kein Mock, keine Datenbank. Die Wirkung IM
// Ingest prueft capi/ingest.consent.test.ts; hier steht die REGEL.
//
// DIE ACHSEN SIND ZWEI, und sie werden bewusst getrennt gehalten:
//  (1) ABWESEND gegen VORHANDEN — die Alt-Seiten-Unterscheidung.
//  (2) INNERHALB VON "VORHANDEN": erlaubt gegen verboten, streng.
// Ein Test, der beide vermischte, koennte bei einer Mutation aus dem falschen
// Grund gruen bleiben.
// ===========================================================================

/** Ein Body mit gesetztem Signal — gebaut ueber die Konstante, nie ueber ein Literal. */
function withWire(wire: unknown): Record<string, unknown> {
  return { trackingKey: "tk", eventID: "e", event: "Purchase", [CONSENT_WIRE_FIELD]: wire };
}

describe("consentAllows: ABWESEND heisst ALT-SEITE und damit ERLAUBT", () => {
  it("Feld fehlt ganz -> erlaubt (DIE TEUERSTE ZUSAGE DIESER SCHEIBE)", () => {
    // ROT DURCH M1 (Alt-Seiten-Unterscheidung umgedreht). Ein Code-Deploy erreicht
    // bestehende Seiten nicht — kippte dieser Fall, verloere JEDE bereits
    // publizierte Kundenseite lautlos ihren Forward.
    expect(consentAllows({ trackingKey: "tk" }, META_CONSENT_TARGET)).toBe(true);
  });

  it("voellig leerer Body -> erlaubt (dasselbe: kein Feld)", () => {
    expect(consentAllows({}, META_CONSENT_TARGET)).toBe(true);
  });

  it("Nicht-Objekt (vom Handler aus unerreichbar) -> erlaubt, kein Wurf", () => {
    // Der Handler prueft den Body VOR jedem Lesen auf Objekt-Natur. Dieser Zweig
    // existiert nur, damit die Funktion total ist — geprueft wird deshalb genau
    // das: sie antwortet, statt zu werfen.
    expect(consentAllows(null, META_CONSENT_TARGET)).toBe(true);
    expect(consentAllows(undefined, META_CONSENT_TARGET)).toBe(true);
    expect(consentAllows("kaputt", META_CONSENT_TARGET)).toBe(true);
    expect(consentAllows(42, META_CONSENT_TARGET)).toBe(true);
  });
});

describe("consentAllows: VORHANDEN wird STRENG gelesen", () => {
  it("Ziel-Schluessel genau true -> erlaubt (POSITIVKONTROLLE)", () => {
    // Ohne ihn zeigten die Verbots-Tests nur, dass IRGENDETWAS blockiert.
    expect(consentAllows(withWire({ [META_CONSENT_TARGET]: true }), META_CONSENT_TARGET)).toBe(
      true
    );
  });

  it("leeres Objekt -> verboten (vorhanden, aber ohne Schluessel)", () => {
    // DER TRENNENDE FALL ZU "Feld fehlt ganz": beide sehen im Body fast gleich aus,
    // die Antwort ist entgegengesetzt.
    expect(consentAllows(withWire({}), META_CONSENT_TARGET)).toBe(false);
  });

  it("FREMDER Schluessel gesetzt, eigener fehlt -> verboten (DER SCHLUESSELBEWEIS)", () => {
    // ROT DURCH: einen Leser, der den Schluessel gar nicht auswertet und bei
    // vorhandenem Objekt pauschal erlaubt.
    expect(consentAllows(withWire({ pinterest: true }), META_CONSENT_TARGET)).toBe(false);
  });

  it("Ziel-Schluessel truthy statt true (1) -> verboten", () => {
    // ROT DURCH M2 (Strenge aufgeweicht auf truthy). Dies ist der EINZIGE Test der
    // Suite, der M2 faengt — wer ihn als redundant entfernt, nimmt die einzige
    // Absicherung der strengen Lesung mit.
    expect(consentAllows(withWire({ [META_CONSENT_TARGET]: 1 }), META_CONSENT_TARGET)).toBe(
      false
    );
  });

  it('Ziel-Schluessel "true" als Zeichenkette -> verboten', () => {
    expect(consentAllows(withWire({ [META_CONSENT_TARGET]: "true" }), META_CONSENT_TARGET)).toBe(
      false
    );
  });

  it("Ziel-Schluessel explizit false -> verboten", () => {
    expect(consentAllows(withWire({ [META_CONSENT_TARGET]: false }), META_CONSENT_TARGET)).toBe(
      false
    );
  });
});

describe("consentAllows: kaputte Signal-Formen -> verboten, nie ein Wurf", () => {
  // WARUM VERBOTEN UND NICHT ERLAUBT: Ein VORHANDENES Feld heisst, die Seite kennt
  // das Signal. Ist es dann unlesbar, ist etwas defekt — und ein Datenschutz-Gate
  // blockiert bei Fehlkonfiguration, statt mutmasslich durchzulassen.
  const kaputt: Array<[string, unknown]> = [
    ["null", null],
    ["Zahl", 0],
    ["Zahl (truthy)", 1],
    ["leere Zeichenkette", ""],
    ["Zeichenkette", "meta"],
    ["leeres Array", []],
    ["Array mit Zielnamen", [META_CONSENT_TARGET]],
    ["boolean true", true],
    ["boolean false", false],
    ["verschachteltes Objekt am Schluessel", { [META_CONSENT_TARGET]: { ok: true } }],
  ];

  for (const [name, wire] of kaputt) {
    it(`${name} -> verboten`, () => {
      expect(consentAllows(withWire(wire), META_CONSENT_TARGET)).toBe(false);
    });
  }

  it("KEINE dieser Formen wirft (eigene Zusicherung, nicht nur implizit)", () => {
    // EIGENER TEST, weil "gibt false zurueck" und "wirft nicht" verschiedene
    // Aussagen sind: Ein Wurf schluege oben durch, BEVOR die Assertion laeuft, und
    // meldete einen Fehlschlag, der sich liest wie das Gegenteil dessen, was
    // passiert ist.
    for (const [, wire] of kaputt) {
      expect(() => consentAllows(withWire(wire), META_CONSENT_TARGET)).not.toThrow();
    }
  });

  it("ein RIESIGES Signal-Objekt kostet EINEN Zugriff, keinen Durchlauf", () => {
    // Kein Zeitmesser (der waere in CI wertlos) — geprueft wird die WIRKUNG: der
    // Ziel-Schluessel entscheidet, nicht die Groesse. Ein Leser, der die Schluessel
    // durchliefe, waere auf dem heissesten Pfad der Plattform angreifbar.
    const gross: Record<string, unknown> = {};
    for (let i = 0; i < 5000; i++) gross[`k${i}`] = true;
    expect(consentAllows(withWire(gross), META_CONSENT_TARGET)).toBe(false);
    gross[META_CONSENT_TARGET] = true;
    expect(consentAllows(withWire(gross), META_CONSENT_TARGET)).toBe(true);
  });

  it('"__proto__" im Signal vergiftet nichts (JSON.parse legt es als eigene Property an)', () => {
    const body = JSON.parse(`{"${CONSENT_WIRE_FIELD}":{"__proto__":{"${META_CONSENT_TARGET}":true}}}`);
    expect(consentAllows(body, META_CONSENT_TARGET)).toBe(false);
    expect(({} as Record<string, unknown>)[META_CONSENT_TARGET]).toBeUndefined();
  });
});

describe("consentAllows: der Feldname ist EINE Quelle", () => {
  it("liest genau unter CONSENT_WIRE_FIELD, nicht unter einem zweiten Namen", () => {
    // ROT DURCH: einen Leser, der den Namen als Literal hartcodiert und damit von
    // der Konstante abweichen kann. Hier wird der Body ueber die Konstante gebaut
    // UND ein Fremdname danebengelegt.
    const fremd = { consent: { [META_CONSENT_TARGET]: true } };
    expect(consentAllows(fremd, META_CONSENT_TARGET)).toBe(true); // = Feld abwesend
    expect(
      consentAllows({ ...fremd, [CONSENT_WIRE_FIELD]: {} }, META_CONSENT_TARGET)
    ).toBe(false);
  });
});
