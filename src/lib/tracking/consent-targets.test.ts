import { describe, expect, it } from "vitest";
import { TRACKING_TARGETS } from "@/lib/settings";
import { META_CONSENT_TARGET } from "./consent";
import { CONSENT_KEY_BY_TARGET, LEGACY_CONSENT_ROLE } from "./consent-targets";

// ===========================================================================
// DIE ZWEI ZUORDNUNGEN JE ZIEL (Phase 11, neunte Scheibe, Haelfte A).
//
// HIER STEHT KEINE REGEL — die steht im Handler (capi/ingest.ts) und wird in
// ingest.consent-targets.test.ts geprueft. Hier stehen die ZUSAGEN UEBER DIE
// DATEN, die der Typ NICHT leisten kann:
//  - dass GENAU EIN Ziel die Altbestands-Rolle traegt,
//  - dass keine zwei Ziele denselben Consent-Schluessel teilen,
//  - dass der Meta-Schluessel die IMPORTIERTE Konstante ist, kein Literal.
// Der Typ Record<TrackingTarget, …> sichert nur die VOLLSTAENDIGKEIT.
// ===========================================================================

describe("LEGACY_CONSENT_ROLE: GENAU EIN Ziel traegt die Altbestands-Rolle", () => {
  it("es ist genau eines — nicht keines, nicht zwei", () => {
    // DER WAECHTER DER ROLLE, und er ist der einzige. Zwei Traeger verschenkten
    // die Ausnahme an ein Ziel, zu dem der Besucher nie gefragt wurde; KEIN
    // Traeger naehme jeder bereits publizierten Kundenseite ihren Forward. Der
    // Typ kann beides nicht sehen — ein Record aus lauter true ist gueltig.
    const traeger = TRACKING_TARGETS.filter((t) => LEGACY_CONSENT_ROLE[t]);
    expect(traeger).toHaveLength(1);
  });

  it("es ist das Ziel, fuer das die fuenfte Scheibe den Altbestands-Fall entschied", () => {
    // POSITIVKONTROLLE zur Zaehlung darueber: "genau eines" bliebe gruen, wenn
    // die Rolle auf ein ANDERES Ziel wanderte — und dann verloere jede alte
    // Seite ihren Forward, waehrend ein neues Ziel ihn geschenkt bekaeme.
    expect(LEGACY_CONSENT_ROLE.meta).toBe(true);
  });

  it("die Zuordnung ist vollstaendig — jedes bekannte Ziel hat einen Eintrag", () => {
    for (const t of TRACKING_TARGETS) {
      expect(typeof LEGACY_CONSENT_ROLE[t]).toBe("boolean");
    }
  });
});

describe("CONSENT_KEY_BY_TARGET: die Bruecke zwischen zwei Vokabularen", () => {
  it("der Meta-Schluessel IST die importierte Konstante, kein abgeschriebenes Literal", () => {
    // ROT DURCH: ein Literal in der Zuordnung, das von META_CONSENT_TARGET
    // abweicht. Jener Wert steht in AUSGELIEFERTEM Code und in fremden
    // Betreiber-Konfigurationen — eine Divergenz waere fail-closed und lautlos.
    expect(CONSENT_KEY_BY_TARGET.meta).toBe(META_CONSENT_TARGET);
  });

  it("KEINE zwei Ziele teilen sich einen Consent-Schluessel", () => {
    // DER GEFAEHRLICHSTE FEHLER DIESER TABELLE, und er ist per Typ unsichtbar:
    // Teilten sich zwei Ziele einen Schluessel, erlaubte ein Besucher mit EINER
    // Zustimmung stillschweigend BEIDE — die Einwilligung je Ziel waere aufgehoben,
    // ohne dass irgendetwas anders aussieht.
    const schluessel = TRACKING_TARGETS.map((t) => CONSENT_KEY_BY_TARGET[t]);
    expect(new Set(schluessel).size).toBe(schluessel.length);
  });

  it("jedes Ziel hat einen nicht-leeren Schluessel", () => {
    // Ein leerer Schluessel laese wire[""] — praktisch immer undefined, also
    // dauerhaft verboten, aber aus dem falschen Grund und ohne Fehlermeldung.
    for (const t of TRACKING_TARGETS) {
      expect(CONSENT_KEY_BY_TARGET[t]).not.toBe("");
      expect(typeof CONSENT_KEY_BY_TARGET[t]).toBe("string");
    }
  });
});
