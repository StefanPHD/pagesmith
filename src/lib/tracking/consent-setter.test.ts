// TESTS DER SCHEIBE 11.5a — der Ablehnungs-Zustand vor dem ersten Beacon.
//
// T1 UND T2 STEHEN ABSICHTLICH IN DERSELBEN DATEI UND WERDEN ZUSAMMEN GELESEN:
// T1 ist eine ABWESENHEITS-Behauptung ("bei AUS steht nichts Neues im Text"), und
// eine solche ist ohne Positivkontrolle nicht von einem kaputten Waechter zu
// unterscheiden. T2 IST DIESE KONTROLLE — dieselbe Fixture, derselbe Aufruf, nur der
// Schalter AN. Erscheint dort kein Setzer, ist nicht die Abwesenheit bewiesen,
// sondern der Waechter kaputt. Wer die beiden trennt, nimmt T1 seine Aussagekraft.
import { describe, expect, it, afterEach, vi } from "vitest";
import { createHash } from "node:crypto";
import { generateFunctional } from "@/lib/generate";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import {
  TRACKING_TARGETS,
  isTargetDeliverable,
  type ProjectSettings,
} from "@/lib/settings";
import {
  ALL_CONSENT_KEYS,
  CONSENT_KEY_BY_TARGET,
} from "@/lib/tracking/consent-targets";
import {
  CONSENT_SETTER_SCRIPT_ID,
  buildConsentDenyScript,
} from "@/lib/tracking/consent-setter";
import { buildConsentRuntimes } from "@/lib/tracking/consent";
import type { Mapping } from "@/lib/mappings";

// DIE FIXTURE IST DIE DES VERGLEICHSWERTS, ZEICHENGLEICH. Sie wird NICHT veraendert,
// ohne den Vergleichswert in T1 neu zu erheben — sonst misst T1 etwas anderes, als
// der Vergleichswert festhaelt.
const FIXTURE_HTML =
  "<html><body><h1 data-pagesmith-id=\"ps-aaaaaa\">Hallo</h1>" +
  "<a data-pagesmith-id=\"ps-bbbbbb\" href=\"#\">Kaufen</a></body></html>";
const TRACKING_KEY = "tk_baseline_11_5a";
const PROXY = "https://app.example.test/api/e";

// ALLE FUENF ZIELE KONFIGURIERT — eine NICHT-LEERE Schluesselmenge ist der
// Diskriminator von T1 (s. dort).
const SETTINGS: ProjectSettings = {
  pixels: {
    meta: { pixelId: "111" },
    pinterest: { pixelId: "222" },
    tiktok: { pixelId: "333" },
    linkedin: { pixelId: "444" },
    google: { pixelId: "555" },
  },
};

const MAPPINGS: Mapping[] = [
  { elementId: "ps-bbbbbb", type: "track", config: { event: "Purchase" } },
];

function deliver(consentGateOn: boolean): string {
  const consentTargets = TRACKING_TARGETS.filter((t) =>
    isTargetDeliverable(SETTINGS, t)
  ).map((t) => CONSENT_KEY_BY_TARGET[t]);
  const functional = generateFunctional(FIXTURE_HTML, MAPPINGS, "export", {
    metaPixelId: "111",
    trackingKey: TRACKING_KEY,
    capiProxyUrl: PROXY,
    consentTargets,
  });
  return injectPageViewEmitter(functional, TRACKING_KEY, consentGateOn);
}

describe("11.5a — die tragende Invariante und ihre Positivkontrolle", () => {
  // T1. DIE ERWARTUNG STAMMT AUS EINEM LAUF GEGEN DEN CODE VOR DIESER SCHEIBE
  // (CC, 2026-09-12) und wurde VOR der ersten Aenderung erzeugt. Sie wird NIE aus
  // dem gebauten Code abgeleitet — ein nachtraeglich erzeugter Wert machte diesen
  // Test zu einem SPIEGEL, der jeden Fehlgriff bestaetigt.
  // WER IHN ROT VORFINDET, REGENERIERT DIE ZAHLEN NICHT. Entweder ist die
  // Byte-Gleichheit verletzt — dann ist das der Befund —, oder der ausgelieferte
  // Text hat sich aus einem ANDEREN, bewussten Grund geaendert; dann wird der
  // Vergleichswert eigens neu erhoben und die Aenderung benannt.
  const BASELINE_BYTES = 14160;
  const BASELINE_SHA256 =
    "a953b21e5683129da7868e01efa8a07a10334f29c09cabbfbed1da145fc04faa";

  it("T1: bei AUSGESCHALTETEM Schalter ist der ausgelieferte Text BYTE-GLEICH zu vor der Scheibe", () => {
    const out = deliver(false);
    // DER DISKRIMINATOR GEGEN EINEN NEBENEFFEKT-ZWEIG: Diese Fixture hat eine
    // NICHT-LEERE Schluesselmenge. Haenge der Zweig an der Leere einer Menge statt
    // am Schalter, entstuende hier ein Setzer und beide Zusicherungen fielen.
    expect(Buffer.byteLength(out, "utf8")).toBe(BASELINE_BYTES);
    expect(createHash("sha256").update(out, "utf8").digest("hex")).toBe(
      BASELINE_SHA256
    );
    // Diagnose-Hilfe, falls die Zahlen oben fallen: sagt, WAS zuviel drin ist.
    expect(out).not.toContain(CONSENT_SETTER_SCRIPT_ID);
  });

  it("T2 (POSITIVKONTROLLE zu T1): bei EINGESCHALTETEM Schalter steht der Setzer im Text, und zwar VOR dem PageView-Script", () => {
    const out = deliver(true);
    expect(out).toContain(`id="${CONSENT_SETTER_SCRIPT_ID}"`);
    // DIE REIHENFOLGE IST DIE EIGENTLICHE AUSSAGE: Der Setzer muss vor dem Emitter
    // stehen, sonst feuert der erste Seitenaufruf, bevor ein Urteil da ist.
    expect(out.indexOf(`id="${CONSENT_SETTER_SCRIPT_ID}"`)).toBeLessThan(
      out.indexOf('id="__ps_pve"')
    );
    // Und hinter dem Gate, damit die drei Bausteine in Abhaengigkeits-Reihenfolge
    // lesbar bleiben.
    expect(out.indexOf('id="pagesmith-consent"')).toBeLessThan(
      out.indexOf(`id="${CONSENT_SETTER_SCRIPT_ID}"`)
    );
  });
});

describe("11.5a — die Sechser-Ableitung", () => {
  // T3. DIE ERWARTUNG STAMMT AUS DER ENTSCHEIDUNG, NICHT AUS DEM CODE.
  // Sie ist hier AUSGESCHRIEBEN und wird NIE aus ALL_CONSENT_KEYS abgeleitet — eine
  // Erwartung aus dem Pruefling machte diesen Test zu einem SPIEGEL, der jeden
  // Tippfehler und jede Streichung bestaetigt.
  // EIN SIEBTES ZIEL MACHT DIESEN TEST ROT, UND DAS IST SEIN ZWECK: Wer ein Ziel
  // hinzufuegt, MUSS hier hinsehen. Ohne diesen Zwang bekaeme das neue Ziel keinen
  // Schluessel im Setzer und bliebe still abgelehnt — auf jeder Seite, ohne dass
  // irgendwo etwas rot wird. WER IHN "REPARIERT", INDEM ER DIE LISTE AUS DEM CODE
  // ZIEHT, SCHAFFT GENAU DIESEN ZWANG AB.
  const ERWARTETE_SECHS = [
    "meta",
    "pinterest",
    "tiktok",
    "linkedin",
    "google",
    "analytics",
  ];

  it("T3: der Setzer belegt GENAU sechs Schluessel, jeden mit false", () => {
    const script = buildConsentDenyScript();
    for (const key of ERWARTETE_SECHS) {
      expect(script).toContain(`"${key}": false`);
    }
    // GENAU sechs, nicht mindestens sechs: die Zahl der Zuweisungen wird gezaehlt.
    expect(script.split(": false").length - 1).toBe(ERWARTETE_SECHS.length);
    expect(ALL_CONSENT_KEYS.length).toBe(ERWARTETE_SECHS.length);
  });

  it("T3b: kein Schluessel steht auf true, und der Block traegt keine Serialisierungs-Falle", () => {
    const script = buildConsentDenyScript();
    expect(script).not.toContain("true");
    expect(script).not.toContain("</scr" + "ipt><");
    expect(script).not.toContain("</bo" + "dy>");
  });
});

describe("11.5a — das Praedikat des Setzers", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    delete (window as unknown as Record<string, unknown>).pagesmithConsent;
  });

  function laufe(): void {
    // Den erzeugten Block ausfuehren, wie es der Browser taete.
    const script = buildConsentDenyScript();
    const body = script.slice(script.indexOf(">") + 1, script.lastIndexOf("<"));
    window.eval(body);
  }

  // T4. DIE VIER "ENTSCHIEDEN"-FAELLE SIND DER KERN: Bei ihnen ist der Hook beim
  // KONSUMENTEN bereits ein Urteil ("verboten"), und ein Truthiness-Test im Setzer
  // ueberschriebe es. Der undefined-Fall ist der einzige, in dem geschrieben werden
  // darf — er ist deshalb KEIN Gegenbeispiel, sondern die Trennlinie.
  const ENTSCHIEDEN: Array<[string, unknown]> = [
    ["false", false],
    ["null", null],
    ["0", 0],
    ["leeres Objekt", {}],
  ];

  for (const [name, wert] of ENTSCHIEDEN) {
    it(`T4: Hook steht auf ${name} -> der Setzer schreibt NICHT`, () => {
      (window as unknown as Record<string, unknown>).pagesmithConsent = wert;
      laufe();
      expect(
        (window as unknown as Record<string, unknown>).pagesmithConsent
      ).toBe(wert);
    });
  }

  it("T4: Hook ist NICHT GESETZT -> der Setzer schreibt (die Trennlinie)", () => {
    delete (window as unknown as Record<string, unknown>).pagesmithConsent;
    laufe();
    const v = (window as unknown as Record<string, unknown>)
      .pagesmithConsent as Record<string, unknown>;
    expect(typeof v).toBe("object");
    expect(v.meta).toBe(false);
  });

  // T5. SETZER UND KONSUMENT SIND KOMPLEMENTAER — und nur dieser Test prueft das
  // GEGEN DEN ECHTEN KONSUMENTEN statt gegen eine nachgebaute Erwartung. Faellt er
  // allein, ist die Schreibweise eines Schluessels neben die des Lesers gerutscht.
  it("T5: nach dem Setzer liefert __psConsent fuer JEDEN der sechs Schluessel false", () => {
    delete (window as unknown as Record<string, unknown>).pagesmithConsent;
    window.eval(buildConsentRuntimes());
    laufe();
    const ask = (window as unknown as Record<string, (t: string) => boolean>)
      .__psConsent;
    for (const key of ALL_CONSENT_KEYS) {
      expect(ask(key)).toBe(false);
    }
  });
});
