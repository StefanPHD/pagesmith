import { describe, expect, it } from "vitest";
import {
  eventAxisTargets,
  getCapiTokenSet,
  getMetaPixelId,
  getPixelId,
  getTrackingKey,
  setCapiState,
  setMetaPixelId,
  setPixelId,
  settingsEqual,
  TRACKING_TARGETS,
  type ProjectSettings,
} from "./settings";

describe("getMetaPixelId", () => {
  it("leere/absente Settings -> ''", () => {
    expect(getMetaPixelId({})).toBe("");
    expect(getMetaPixelId({ pixels: {} })).toBe("");
    expect(getMetaPixelId({ pixels: { meta: {} } })).toBe("");
  });

  it("getrimmt die gespeicherte ID", () => {
    expect(getMetaPixelId({ pixels: { meta: { pixelId: "  12345  " } } })).toBe(
      "12345"
    );
  });
});

describe("setMetaPixelId", () => {
  it("schreibt pixels.meta.pixelId (getrimmt)", () => {
    const next = setMetaPixelId({}, "  98765  ");
    expect(getMetaPixelId(next)).toBe("98765");
  });

  it("ist immutabel (Original unveraendert)", () => {
    const orig: ProjectSettings = {};
    setMetaPixelId(orig, "123");
    expect(orig).toEqual({});
  });

  it("erhaelt andere (kuenftige) Zweige unter pixels", () => {
    // Simuliert eine spaetere Plattform neben meta -> darf nicht verloren gehen.
    const withOther = {
      pixels: { meta: { pixelId: "1" }, other: { code: "x" } },
    } as ProjectSettings & { pixels: { other: { code: string } } };
    const next = setMetaPixelId(withOther, "2") as typeof withOther;
    expect(getMetaPixelId(next)).toBe("2");
    expect(next.pixels.other.code).toBe("x");
  });
});

describe("settingsEqual", () => {
  it("gleiche Pixel-ID -> gleich", () => {
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "1" } } },
        { pixels: { meta: { pixelId: "1" } } }
      )
    ).toBe(true);
    // leer == leer (auch unterschiedlich genestet, aber beide ohne ID).
    expect(settingsEqual({}, { pixels: {} })).toBe(true);
  });

  it("unterschiedliche Pixel-ID -> dirty", () => {
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "1" } } },
        { pixels: { meta: { pixelId: "2" } } }
      )
    ).toBe(false);
    expect(settingsEqual({}, { pixels: { meta: { pixelId: "1" } } })).toBe(false);
  });

  it("ignoriert capi.* BEWUSST (kein false-dirty): settings, die sich NUR in capi unterscheiden, sind gleich", () => {
    // capi wird von der setCapiToken-Action gepflegt + in settings/savedSettings
    // gespiegelt -> es darf den grossen Speichern-Button nie ausloesen.
    expect(
      settingsEqual(
        { capi: { trackingKey: "k", tokenSet: true } },
        { capi: { trackingKey: "other", tokenSet: false } }
      )
    ).toBe(true);
    // Gegenprobe: gleiche Pixel-ID, unterschiedliches capi -> weiterhin gleich.
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "5" } }, capi: { tokenSet: true } },
        { pixels: { meta: { pixelId: "5" } } }
      )
    ).toBe(true);
  });
});

describe("capi-Helper (Scheibe 2a)", () => {
  it("getTrackingKey / getCapiTokenSet: leere/absente Settings -> '' bzw. false", () => {
    expect(getTrackingKey({})).toBe("");
    expect(getTrackingKey({ capi: {} })).toBe("");
    expect(getCapiTokenSet({})).toBe(false);
    expect(getCapiTokenSet({ capi: {} })).toBe(false);
    expect(getCapiTokenSet({ capi: { tokenSet: false } })).toBe(false);
  });

  it("getTrackingKey trimmt; getCapiTokenSet liest den Boolean", () => {
    expect(getTrackingKey({ capi: { trackingKey: "  abc  " } })).toBe("abc");
    expect(getCapiTokenSet({ capi: { tokenSet: true } })).toBe(true);
  });

  it("setCapiState schreibt trackingKey + tokenSet (Round-Trip)", () => {
    const next = setCapiState({}, { trackingKey: "key-123", tokenSet: true });
    expect(getTrackingKey(next)).toBe("key-123");
    expect(getCapiTokenSet(next)).toBe(true);
  });

  it("setCapiState ist immutabel (Original unveraendert)", () => {
    const orig: ProjectSettings = {};
    setCapiState(orig, { trackingKey: "k", tokenSet: true });
    expect(orig).toEqual({});
  });

  it("setCapiState laesst pixels/Pixel-ID unangetastet", () => {
    const withPixel: ProjectSettings = { pixels: { meta: { pixelId: "999" } } };
    const next = setCapiState(withPixel, { trackingKey: "k", tokenSet: true });
    // Pixel-ID bleibt -> eine unsaved Pixel-ID-Edit geht beim Token-Set nicht verloren.
    expect(getMetaPixelId(next)).toBe("999");
    expect(getTrackingKey(next)).toBe("k");
  });
});

// ===========================================================================
// DIE UMFORMUNG DER OEFFENTLICHEN KENNUNG (Festlegung (6), Scheibe 2 der Phase 11.2).
//
// GEPRUEFT WIRD DER SCHREIBPFAD, NICHT DIE TABELLE: Die Laeufe rufen setPixelId und
// lesen mit getPixelId zurueck — genau die Kette, die das kontrollierte Eingabefeld
// durchlaeuft. Ein Test auf die Tabelle selbst pruefte nur ab, was danebensteht.
// ===========================================================================
describe("setPixelId — die ziel-spezifische Umformung", () => {
  it("N-A: Bindestriche fallen bei der Kundennummer", () => {
    // ROT, WENN die Umformung entfaellt oder den Bindestrich nicht trifft.
    // DER FALL AUS DEM ANBIETER-KONTO: Google Ads zeigt Kundennummern MIT
    // Bindestrichen an; ein Betreiber schreibt ab, was er sieht.
    const next = setPixelId({}, "google", "987-654-3210");
    expect(getPixelId(next, "google")).toBe("9876543210");
  });

  it("N-B: LEERRAUM INNEN faellt ebenfalls — und daran scheitert ein blosses Trim", () => {
    // DIE SCHAERFERE HAELFTE, und sie ist der Grund fuer einen eigenen Lauf: Der
    // Bestand trimmt seit jeher AUSSEN. Ein eingefuegtes "123 456 7890" traegt den
    // Leerraum INNEN, und den entfernt kein Trim.
    // ROT, WENN jemand die Umformung auf einen Rand-Trim zurueckbaut.
    expect(getPixelId(setPixelId({}, "google", "123 456 7890"), "google")).toBe(
      "1234567890"
    );
    // Beide Zeichenklassen zusammen, wie sie beim Kopieren real vorkommen.
    expect(getPixelId(setPixelId({}, "google", " 987-654 3210 "), "google")).toBe(
      "9876543210"
    );
  });

  it("N-C: ein danach NICHT numerischer Wert geht unveraendert durch — keine Pruefung, keine Ablehnung", () => {
    // FESTLEGUNG (5) BLEIBT UNANGETASTET: Es wird NICHT auf Form geprueft. Was nach
    // dem Entfernen dasteht, wird abgelegt; die Abweisung ist Sache des Anbieters.
    // ROT, WENN jemand eine Zifferpruefung einzieht — genau die erfundene Pruefung,
    // gegen die Festlegung (5) argumentiert.
    expect(getPixelId(setPixelId({}, "google", "abc-def"), "google")).toBe(
      "abcdef"
    );
    expect(getPixelId(setPixelId({}, "google", "kein Konto"), "google")).toBe(
      "keinKonto"
    );
  });

  it("N-D: die VIER bestehenden Ziele sind UNBERUEHRT — mit Positivkontrolle im selben Lauf", () => {
    // DIE TRAGENDE ZUSICHERUNG DIESER SCHEIBE GEGENUEBER DEM BESTAND: setPixelId ist
    // GETEILT; alle fuenf Ziele laufen hindurch. Eine Umformung, die alle traefe, waere
    // eine Verhaltensaenderung an vier ausgelieferten Zielen — und zwar still.
    // ROT DURCH DIE PFLICHT-MUTATION "die Umformung auf alle Ziele ausweiten".
    for (const target of TRACKING_TARGETS) {
      if (target === "google") continue;
      expect(getPixelId(setPixelId({}, target, "123-456"), target)).toBe(
        "123-456"
      );
    }
    // POSITIVKONTROLLE IM SELBEN LAUF: Ohne sie waere die Schleife auch dann gruen,
    // wenn die Umformung UEBERHAUPT NICHT stattfaende — "nichts veraendert" saehe
    // dann fuer alle fuenf gleich aus.
    expect(getPixelId(setPixelId({}, "google", "123-456"), "google")).toBe(
      "123456"
    );
  });

  it("N-D2: der TRIM gilt weiterhin fuer ALLE Ziele", () => {
    // DER BESTAND, DER NICHT KIPPEN DARF: Die Umformung tritt HINTER den Trim, nicht
    // an seine Stelle. ROT, WENN jemand `pixelId.trim()` durch die Tabelle ERSETZT —
    // dann verloeren vier Ziele ihren Rand-Trim, und zwar lautlos, weil die Identitaet
    // nach nichts aussieht.
    for (const target of TRACKING_TARGETS) {
      expect(getPixelId(setPixelId({}, target, "  777  "), target)).toBe("777");
    }
  });

  it("N-E: was das Feld zeigt, IST der abgelegte Wert — die Rueckgabe der Kette", () => {
    // DIE SICHTBARKEITS-AUFLAGE AUS FESTLEGUNG (6), auf ihrer pruefbaren Ebene: Das
    // Eingabefeld ist KONTROLLIERT — sein `value` kommt aus getPixelId ueber den
    // Container. Was setPixelId schreibt, liest das Feld im naechsten Render zurueck.
    // WIRD ROT, WENN die Umformung aus dem Schreibpfad in den Speicherpfad wandert:
    // Dann bliebe hier der getippte Wert stehen, und Feld und Datenbank liefen
    // auseinander.
    // WAS ER NICHT ZEIGT, und der Satz gehoert dazu: Er prueft die ZWEI FUNKTIONEN,
    // nicht das DOM. Dass das Feld den Wert wirklich anzeigt, prueft der
    // Container-Lauf in CodeImporter.test.tsx und danach der Live-Test.
    const abgelegt = setPixelId({}, "google", "987-654-3210");
    expect(getPixelId(abgelegt, "google")).toBe("9876543210");
  });
});

// ===========================================================================
// DIE ZIELE MIT EREIGNIS-ACHSE (Scheibe 2 der Phase 11.2).
// ===========================================================================
describe("eventAxisTargets", () => {
  it("N-F1: genau die Ziele mit Kennung JE EREIGNISTYP — linkedin und google", () => {
    // ROT, WENN ein Ziel hinzukommt oder wegfaellt. Die Liste ist eine ABLEITUNG aus
    // einer erschoepfenden Zuordnung; ein sechstes Ziel erzwingt dort eine Entscheidung
    // und schlaegt hier durch.
    expect([...eventAxisTargets]).toEqual(["linkedin", "google"]);
  });

  it("N-F2: die REIHENFOLGE ist die von TRACKING_TARGETS, nicht eine eigene", () => {
    // DIE ZUSICHERUNG, DIE EINE VIERTE WAHRHEIT UEBER DIE ZIEL-ORDNUNG VERHINDERT:
    // Die Bloecke im Bereich MESSEN erscheinen in derselben Ordnung wie die Karten.
    // ROT, WENN jemand die Liste haendisch sortiert oder als Aufzaehlung hinschreibt.
    // MITWACHSEND UND OHNE ZAEHLUNG: Der Vergleich filtert dieselbe Quelle und bleibt
    // beim sechsten Ziel richtig.
    expect([...eventAxisTargets]).toEqual(
      TRACKING_TARGETS.filter((t) => eventAxisTargets.includes(t))
    );
    // POSITIVKONTROLLE: Die Liste ist nicht leer — sonst waere der Vergleich trivial.
    expect(eventAxisTargets.length).toBeGreaterThan(0);
  });
});
