import { describe, expect, it } from "vitest";
import {
  TRACKING_TARGETS,
  getConversionRules,
  getMetaPixelId,
  getPixelId,
  hasConversionRules,
  hasTargetPixelId,
  isTargetDeliverable,
  isTrackingTarget,
  setConversionRule,
  setMetaPixelId,
  setPixelId,
  settingsEqual,
  type ProjectSettings,
} from "./settings";

// ===========================================================================
// DIE ZIEL-DIMENSION IN DER ABLAGE (Phase 11, sechste Scheibe, Haelfte A).
//
// REINE EINHEITSTESTS. Die Server-Actions prueft actions.targets.test.ts, die
// Karte gibt es noch nicht (eigene Runde).
//
// DIE ZWEI ACHSEN WERDEN GETRENNT GEHALTEN:
//  (1) LESEN/SCHREIBEN je Ziel — inklusive der Frage, ob ein Blob aus der Zeit
//      VOR dieser Scheibe unveraendert gelesen wird.
//  (2) DER DIRTY-VERGLEICH — die Stelle, an der ein Vergessen still Eingaben
//      kostet.
// ===========================================================================

/** Ein Blob, wie ihn ein Projekt VOR dieser Scheibe trug. */
const ALT_BLOB: ProjectSettings = {
  pixels: { meta: { pixelId: "123456789012345" } },
  capi: { trackingKey: "tk-alt", tokenSet: true },
};

describe("Der Blob aus der Zeit VOR dieser Scheibe wird unveraendert gelesen", () => {
  it("die Meta-Pixel-ID kommt an — OHNE Ruecfallpfad, weil die Form dieselbe ist", () => {
    // ROT DURCH: eine Ablage-Form, die den Ziel-Zweig anders schluesselt. Dann
    // saehe JEDES bestehende Projekt "nicht konfiguriert" aus, waehrend sein
    // Forward unveraendert laeuft — die teuerste Klasse dieser Scheibe.
    expect(getPixelId(ALT_BLOB, "meta")).toBe("123456789012345");
  });

  it("ein Ziel, das der alte Blob nicht kennt, liest LEER (nicht undefined)", () => {
    expect(getPixelId(ALT_BLOB, "pinterest")).toBe("");
  });

  it("getMetaPixelId liefert unveraendert dasselbe wie der Ziel-Zugriff", () => {
    // Der Bruecken-Test: capi/token.ts ruft getMetaPixelId im Forward-Pfad und ist
    // in dieser Scheibe unantastbar. Weicht die Bruecke ab, bricht der Forward.
    expect(getMetaPixelId(ALT_BLOB)).toBe(getPixelId(ALT_BLOB, "meta"));
  });

  it("leerer Blob -> leer, kein Wurf", () => {
    expect(getPixelId({}, "meta")).toBe("");
    expect(getPixelId({ pixels: {} }, "pinterest")).toBe("");
  });

  it("Whitespace wird getrimmt, wie zuvor", () => {
    expect(getPixelId({ pixels: { meta: { pixelId: "  42  " } } }, "meta")).toBe("42");
  });
});

describe("Schreiben je Ziel laesst die anderen Ziele unberuehrt", () => {
  it("ein zweites Ziel tritt NEBEN das erste, es ersetzt es nicht", () => {
    // ROT DURCH: ein Schreiber, der den pixels-Zweig ersetzt statt zu mergen.
    // Der Betreiber verloere beim Einrichten des zweiten Ziels sein erstes.
    const next = setPixelId(ALT_BLOB, "pinterest", "2612345678901");
    expect(getPixelId(next, "meta")).toBe("123456789012345");
    expect(getPixelId(next, "pinterest")).toBe("2612345678901");
  });

  it("die anderen Zweige des Blobs bleiben unangetastet", () => {
    const next = setPixelId(ALT_BLOB, "pinterest", "26");
    expect(next.capi).toEqual({ trackingKey: "tk-alt", tokenSet: true });
  });

  it("immutabel: die Eingabe wird nicht veraendert", () => {
    const vorher = JSON.stringify(ALT_BLOB);
    setPixelId(ALT_BLOB, "pinterest", "26");
    expect(JSON.stringify(ALT_BLOB)).toBe(vorher);
  });

  it("setMetaPixelId schreibt weiterhin denselben Pfad", () => {
    const next = setMetaPixelId({}, " 999 ");
    expect(next.pixels?.meta?.pixelId).toBe("999");
    expect(getPixelId(next, "meta")).toBe("999");
  });
});

describe("Der Dirty-Vergleich sieht JEDES Ziel", () => {
  it("eine Aenderung am ZWEITEN Ziel wird erkannt (DER EINZELSTUECK-FALL)", () => {
    // DIESER TEST IST DER GRUND, WARUM settingsEqual ueberhaupt angefasst wurde.
    // Ohne ihn bliebe die teuerste stille Folge ungedeckt: kein Dirty -> kein
    // aktiver Speichern-Knopf -> die Eingabe ist beim naechsten Projektwechsel
    // weg, ohne dass irgendwo etwas meldet.
    const a = setPixelId({}, "pinterest", "26");
    const b = setPixelId({}, "pinterest", "27");
    expect(settingsEqual(a, b)).toBe(false);
  });

  it("eine Aenderung am ERSTEN Ziel wird weiterhin erkannt (Bestandszusage)", () => {
    expect(settingsEqual(setMetaPixelId({}, "1"), setMetaPixelId({}, "2"))).toBe(false);
  });

  it("zwei Alt-Blobs bleiben gleich — kein false-dirty durch die neue Dimension", () => {
    // ROT DURCH: ein Vergleich, der ein fehlendes Ziel als "verschieden" liest.
    // Dann meldete JEDES Bestandsprojekt beim Laden ungespeicherte Aenderungen.
    expect(settingsEqual(ALT_BLOB, { ...ALT_BLOB })).toBe(true);
  });

  it("capi und hosting bleiben AUSGENOMMEN (Bestandszusage, unveraendert)", () => {
    const a: ProjectSettings = { capi: { tokenSet: true }, hosting: { label: "x" } };
    const b: ProjectSettings = { capi: { tokenSet: false }, hosting: { label: "y" } };
    expect(settingsEqual(a, b)).toBe(true);
  });
});

describe("Die Ziel-Liste und ihre Laufzeit-Pruefung", () => {
  it("kennt Meta und Pinterest", () => {
    expect(isTrackingTarget("meta")).toBe(true);
    expect(isTrackingTarget("pinterest")).toBe(true);
  });

  it("weist einen TIPPFEHLER ab — nicht per Praefix, nicht per Laenge", () => {
    // Genau der Fall, den der Kommentar der Geheimnis-Migration nennt: ein
    // Geheimnis unter "pintrest" saehe aus wie Konfiguration, und der Adapter
    // faende es nie.
    expect(isTrackingTarget("pintrest")).toBe(false);
    expect(isTrackingTarget("pinterest ")).toBe(false);
    expect(isTrackingTarget("Meta")).toBe(false);
  });

  it("weist Nicht-Zeichenketten und Leeres ab, ohne zu werfen", () => {
    for (const v of [undefined, null, 0, 1, {}, [], "", "__proto__"]) {
      expect(() => isTrackingTarget(v)).not.toThrow();
      expect(isTrackingTarget(v)).toBe(false);
    }
  });

  it("die Liste ist duplikatfrei", () => {
    expect(new Set(TRACKING_TARGETS).size).toBe(TRACKING_TARGETS.length);
  });
});

// ===========================================================================
// DAS ZIEL-BEWUSSTE URTEIL (Scheibe 11.1c).
//
// hasTargetPixelId nimmt Wert UND Ziel entgegen und delegiert an das skalare
// Primitiv hasPixelId. GEPRUEFT WERDEN ZWEI ACHSEN, und die zweite ist die
// eigentliche Zusage dieser Scheibe:
//  (1) DIE WERT-ACHSE — dieselben Faelle wie beim Primitiv. Sie sichert, dass die
//      Delegation nicht unterwegs etwas anderes tut.
//  (2) DIE ZIEL-GENERIK — derselbe Wert liefert fuer ALLE VIER Ziele dasselbe
//      Ergebnis. DIESE ZUSICHERUNG IST BEWUSST BEFRISTET: 11.1d hebt sie auf, und
//      DANN muss sie fallen. Ein Test, der dort gruen bliebe, waere der Beweis,
//      dass die Unterscheidung nicht greift.
//
// NACHGEZOGEN 11.1d, NICHT GESTEMPELT — DIE BEFRISTUNG IN (2) IST NICHT
// EINGETRETEN, und der Wortlaut darueber bleibt lesbar, damit die Vorhersage
// nachpruefbar bleibt: 11.1d hat hasTargetPixelId NICHT ziel-unterscheidend
// gemacht. Das Urteil ueber die AUSLIEFERFAEHIGKEIT ist ein ZWEITES,
// ziel-generisches Praedikat geworden (isTargetDeliverable, s. den Block unten);
// diese Funktion beantwortet weiterhin die Frage nach dem SKALAR und urteilt fuer
// kein Ziel anders.
// FOLGE, und sie ist der Grund, warum hier nichts geloescht wird: (2) BLEIBT WAHR
// und bleibt ein Waechter. Wer ihn als "abgelaufen" streicht, nimmt die einzige
// Zusicherung mit, dass diese Funktion ziel-GENERISCH ist — und genau daran haengt
// die Abgrenzung zwischen den beiden Praedikaten.
// ===========================================================================
describe("hasTargetPixelId — das ziel-bewusste Urteil (Scheibe 11.1c)", () => {
  it("WERT-ACHSE: leer, Leerraum, Nicht-String -> false; ein gesetzter Wert -> true", () => {
    // BILDET DAS PRIMITIV AB, statt seine Regel zu wiederholen — die Faelle sind
    // dieselben wie in tracking/target-readiness.test.ts. WIRD ROT, WENN die
    // Delegation faellt oder unterwegs eine eigene Bedingung entsteht.
    expect(hasTargetPixelId("", "meta")).toBe(false);
    expect(hasTargetPixelId("   ", "meta")).toBe(false);
    expect(hasTargetPixelId("\t\n ", "meta")).toBe(false);
    expect(hasTargetPixelId(undefined, "meta")).toBe(false);
    expect(hasTargetPixelId(null, "meta")).toBe(false);
    expect(hasTargetPixelId(12345, "meta")).toBe(false);
    expect(hasTargetPixelId("123456789012345", "meta")).toBe(true);
    expect(hasTargetPixelId(" 123 ", "meta")).toBe(true);
  });

  it("ZIEL-GENERIK: derselbe Wert liefert fuer ALLE VIER Ziele dasselbe Ergebnis", () => {
    // DIE ZUSAGE DER SCHEIBE, festgenagelt: Das Urteil ist heute ziel-BEWUSST und
    // ziel-GENERISCH zugleich — es fuehrt ein Ziel, ohne es zu bewerten. Deshalb
    // ist diese Funktion KEINE neunte ziel-geschluesselte Stelle.
    // UEBER TRACKING_TARGETS GESCHLEIFT, NICHT ueber vier getippte Literale: ein
    // fuenftes Ziel ist damit automatisch mitgeprueft, ohne dass jemand daran denkt.
    // WIRD ROT, WENN ein Ziel je anders beurteilt wird — genau das ist 11.1d, und
    // dann faellt dieser Test ABSICHTLICH.
    for (const target of TRACKING_TARGETS) {
      expect(hasTargetPixelId("", target)).toBe(false);
      expect(hasTargetPixelId("   ", target)).toBe(false);
      expect(hasTargetPixelId("123456789012345", target)).toBe(true);
    }
    // POSITIVKONTROLLE, ohne die die Schleife auch bei LEERER Liste gruen waere.
    //
    // MITWACHSEND STATT FEST VERDRAHTET (Scheibe 3, Festlegung (5)): Hier stand
    // `toBe(4)`. Eine Zahl neben einer Liste wird bei JEDEM Zuwachs neu falsch, ohne
    // dass an der geprueften Eigenschaft — dem ziel-GENERISCHEN Urteil — etwas kaputt
    // waere; sie ist beim fuenften Ziel gefallen und faellt beim sechsten wieder.
    //
    // UND WARUM HIER KEINE ZAEHLUNG DER DURCHLAEUFE STEHT, obwohl sie sich anbietet
    // (ARCHITEKT, 2026-08-29): "die Schleife lief so oft, wie die Liste lang ist" ist
    // eine TAUTOLOGIE — beide Zahlen stammen aus derselben Iteration und koennen gar
    // nicht auseinandergehen. Die einzige nicht-triviale Haelfte der urspruenglichen
    // Zusicherung ist, dass die Liste NICHT LEER ist. Wer die Zaehlung "zur Sicherheit"
    // ergaenzt, baut Mechanik gegen einen Fall, den es nicht gibt.
    expect(TRACKING_TARGETS.length).toBeGreaterThan(0);
  });
});

// ===========================================================================
// DIE ZUORDNUNG EREIGNISNAME -> REGEL-KENNUNG (Scheibe 11.1d).
//
// VIER ACHSEN, und sie werden getrennt gehalten, weil sie verschieden brechen:
//  (1) DER LESER — liefert nie undefined.
//  (2) DAS FORM-PRAEDIKAT — was "nicht-leer" heisst, und dass ein Blob-Wert aus
//      der Datenbank es nicht zum Werfen bringt.
//  (3) DAS URTEIL UEBER DIE AUSLIEFERFAEHIGKEIT — die ODER-Verknuepfung beider
//      Kennungsformen, ziel-GENERISCH.
//  (4) DER SCHREIBER — Additivitaet gegenueber pixelId und den uebrigen
//      Eintraegen.
// Der DIRTY-Vergleich steht unten in seinem eigenen Block, bei den bestehenden
// settingsEqual-Faellen.
// ===========================================================================
describe("getConversionRules — der Leser (Scheibe 11.1d)", () => {
  it("{} bei fehlendem Feld, fehlendem Ziel-Eintrag und fehlendem pixels", () => {
    // WIRD ROT, WENN der Leser undefined durchreicht: Jeder Aufrufer muesste dann
    // denselben Rueckfall selbst schreiben, und der eine, der es vergisst, wirft
    // erst zur Laufzeit — im Consent-Memo also auf dem Weg in den ausgelieferten
    // Text.
    expect(getConversionRules({}, "linkedin")).toEqual({});
    expect(getConversionRules({ pixels: {} }, "linkedin")).toEqual({});
    expect(
      getConversionRules({ pixels: { linkedin: {} } }, "linkedin")
    ).toEqual({});
    expect(
      getConversionRules({ pixels: { linkedin: { pixelId: "444" } } }, "linkedin")
    ).toEqual({});
  });

  it("der abgelegte Record kommt unveraendert zurueck — auch die Schluessel", () => {
    // WIRD ROT, WENN hier normalisiert wird (Trim, Kappung, Case-Faltung). Der
    // Schluessel ist ein EREIGNISNAME und muss zeichengleich zu dem sein, was
    // trackEventNames (tracking/event-names.ts) liefert — sonst finden die beiden
    // Seiten einander nicht mehr, und nichts wird dabei rot.
    const rules = { Purchase: "urn:lla:llaPartnerConversion:1", " Lead ": "urn:x" };
    expect(
      getConversionRules({ pixels: { linkedin: { conversionRules: rules } } }, "linkedin")
    ).toEqual(rules);
  });
});

describe("hasConversionRules — das Form-Praedikat (Scheibe 11.1d)", () => {
  it("false bei undefined, null, {}, leerem Wert, Nicht-Objekt und Array", () => {
    // DIE BLOB-FAELLE SIND KEINE PARANOIA: Die Quelle ist eine jsonb-Spalte ohne
    // Formpruefung (weder Code noch Schema pruefen etwas). Ein Array oder eine
    // Zahl kommen hier durch und muessen false ergeben, statt zu werfen — ein Wurf
    // auf diesem Pfad landet im Consent-Memo und damit im Render.
    expect(hasConversionRules(undefined)).toBe(false);
    expect(hasConversionRules(null)).toBe(false);
    expect(hasConversionRules({})).toBe(false);
    expect(hasConversionRules({ Lead: "" })).toBe(false);
    expect(hasConversionRules({ Lead: "   " })).toBe(false);
    expect(hasConversionRules({ Lead: 12345 })).toBe(false);
    expect(hasConversionRules("text")).toBe(false);
    expect(hasConversionRules(12345)).toBe(false);
    expect(hasConversionRules(["urn:x"])).toBe(false);
  });

  it("true, sobald EIN Eintrag einen nicht-leeren Wert traegt", () => {
    // WIRD ROT, WENN das Praedikat auf die ANZAHL der Schluessel statt auf die
    // Werte sieht: Dann gaelte ein Objekt voller leerer Werte als vorhanden, und
    // das Ziel bekaeme einen Consent-Schluessel ohne eine einzige Zuordnung.
    expect(hasConversionRules({ Lead: "urn:x" })).toBe(true);
    expect(hasConversionRules({ Lead: "", Purchase: "urn:y" })).toBe(true);
  });
});

describe("isTargetDeliverable — ist dieses Ziel auslieferfaehig? (Scheibe 11.1d)", () => {
  it("der SKALAR allein genuegt — fuer JEDES Ziel dasselbe", () => {
    // ZIEL-GENERISCH, UND DAS IST DIE ZUSAGE DER SCHEIBE: Hier steht kein
    // Zielwert, keine Ziel-Liste, kein Record ueber Ziele. WIRD ROT, WENN jemand
    // eine Fallunterscheidung ueber Ziele einzieht — dann waere die Funktion eine
    // NEUNTE ziel-geschluesselte Stelle (Zaehlung im Kopf von
    // tracking/target-adapters.ts).
    for (const target of TRACKING_TARGETS) {
      expect(
        isTargetDeliverable({ pixels: { [target]: { pixelId: "123" } } }, target)
      ).toBe(true);
    }
    // POSITIVKONTROLLE, mitwachsend und ohne Zaehlung — die Begruendung steht
    // vollstaendig am gleichartigen Ausdruck im Lauf ueber hasTargetPixelId und wird
    // hier NICHT verdoppelt.
    expect(TRACKING_TARGETS.length).toBeGreaterThan(0);
  });

  it("die ZUORDNUNG allein genuegt ebenfalls — fuer JEDES Ziel dasselbe", () => {
    // DIE ZWEITE KENNUNGSFORM. WIRD ROT, WENN der ODER-Term faellt: Dann fiele ein
    // Ziel, dessen Kennung JE EREIGNISTYP gilt, aus dem Consent-Draht — am Ingest
    // griffe fail-closed, ohne dass irgendwo etwas rot wird.
    for (const target of TRACKING_TARGETS) {
      expect(
        isTargetDeliverable(
          { pixels: { [target]: { conversionRules: { Lead: "urn:x" } } } },
          target
        )
      ).toBe(true);
    }
  });

  it("OHNE beide Formen -> false, und eine LEERE Zuordnung zaehlt nicht", () => {
    // DER FAIL-CLOSED-FALL. WIRD ROT, WENN eine leere oder nur mit Leerwerten
    // gefuellte Zuordnung als Kennung gilt.
    expect(isTargetDeliverable({}, "linkedin")).toBe(false);
    expect(
      isTargetDeliverable({ pixels: { linkedin: { pixelId: "   " } } }, "linkedin")
    ).toBe(false);
    expect(
      isTargetDeliverable(
        { pixels: { linkedin: { conversionRules: {} } } },
        "linkedin"
      )
    ).toBe(false);
    expect(
      isTargetDeliverable(
        { pixels: { linkedin: { conversionRules: { Lead: "  " } } } },
        "linkedin"
      )
    ).toBe(false);
  });

  it("die ZIELE bleiben getrennt: eine Zuordnung an EINEM Ziel macht kein ANDERES lieferfaehig", () => {
    // WIRD ROT, WENN die Funktion den Ziel-Zweig verliert und irgendeinen Eintrag
    // unter pixels liest. Das waere die teuerste Klasse: ein Ziel ohne jede
    // Kennung bekaeme einen Consent-Schluessel im ausgelieferten Text.
    const nurLinkedIn: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:x" } } },
    };
    expect(isTargetDeliverable(nurLinkedIn, "linkedin")).toBe(true);
    expect(isTargetDeliverable(nurLinkedIn, "meta")).toBe(false);
    expect(isTargetDeliverable(nurLinkedIn, "pinterest")).toBe(false);
    expect(isTargetDeliverable(nurLinkedIn, "tiktok")).toBe(false);
  });
});

describe("setConversionRule — der Schreiber (Scheibe 11.1d)", () => {
  it("ADDITIV: setPixelId laesst eine gesetzte Zuordnung unangetastet", () => {
    // WIRD ROT, WENN setPixelId den Ziel-Zweig ERSETZT statt zu spreiten. Der
    // Nutzer traegt dann eine Kennung ein und verliert dabei stumm alle
    // Zuordnungen desselben Ziels.
    const mitRegeln: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:x" } } },
    };
    const danach = setPixelId(mitRegeln, "linkedin", "444");
    expect(getConversionRules(danach, "linkedin")).toEqual({ Lead: "urn:x" });
    expect(getPixelId(danach, "linkedin")).toBe("444");
  });

  it("ADDITIV in der Gegenrichtung: die Zuordnung laesst pixelId und andere Ziele stehen", () => {
    const blob: ProjectSettings = {
      pixels: { meta: { pixelId: "111" }, linkedin: { pixelId: "444" } },
    };
    const danach = setConversionRule(blob, "linkedin", "Lead", "urn:x");
    expect(getPixelId(danach, "meta")).toBe("111");
    expect(getPixelId(danach, "linkedin")).toBe("444");
    expect(getConversionRules(danach, "linkedin")).toEqual({ Lead: "urn:x" });
  });

  it("mehrere Eintraege stehen nebeneinander; der Wert wird getrimmt", () => {
    const eins = setConversionRule({}, "linkedin", "Lead", "  urn:x  ");
    const zwei = setConversionRule(eins, "linkedin", "Purchase", "urn:y");
    expect(getConversionRules(zwei, "linkedin")).toEqual({
      Lead: "urn:x",
      Purchase: "urn:y",
    });
  });

  it("ein LEERER Wert entfernt den Schluessel und fuehrt exakt auf den Ausgangsstand zurueck", () => {
    // DER GRUND IST DER DIRTY-VERGLEICH: Tippen und wieder Leeren darf keinen
    // Unterschied hinterlassen, den settingsEqual als ungespeicherte Aenderung
    // meldet. WIRD ROT, WENN stattdessen "" abgelegt wird.
    const start: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Purchase: "urn:y" } } },
    };
    const getippt = setConversionRule(start, "linkedin", "Lead", "urn:x");
    const geleert = setConversionRule(getippt, "linkedin", "Lead", "  ");
    expect(getConversionRules(geleert, "linkedin")).toEqual({ Purchase: "urn:y" });
    expect(settingsEqual(start, geleert)).toBe(true);
  });

  it("IMMUTABEL: die Eingabe wird nicht veraendert", () => {
    const start: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:x" } } },
    };
    setConversionRule(start, "linkedin", "Purchase", "urn:y");
    expect(getConversionRules(start, "linkedin")).toEqual({ Lead: "urn:x" });
  });
});

describe("settingsEqual — die Zuordnung zaehlt mit (Scheibe 11.1d)", () => {
  it("zwei Blobs, die sich NUR in conversionRules unterscheiden, sind NICHT gleich", () => {
    // DER STILLE VERLUST, gegen den dieser Term steht: Ohne ihn meldete der
    // Vergleich nach einer URN-Eingabe "nicht dirty", der Speichern-Knopf bliebe
    // INAKTIV — und der Wert waere beim naechsten Projektwechsel weg, ohne
    // Warnung. KEIN heutiger Bestandstest faengt das.
    const a: ProjectSettings = { pixels: { linkedin: { pixelId: "444" } } };
    const b: ProjectSettings = {
      pixels: { linkedin: { pixelId: "444", conversionRules: { Lead: "urn:x" } } },
    };
    expect(settingsEqual(a, b)).toBe(false);
    expect(settingsEqual(b, a)).toBe(false);
  });

  it("ein GEAENDERTER Wert am selben Schluessel ist ebenfalls dirty", () => {
    const a: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:x" } } },
    };
    const b: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:y" } } },
    };
    expect(settingsEqual(a, b)).toBe(false);
  });

  it("WERTGLEICHHEIT, NICHT REFERENZGLEICHHEIT — und die Reihenfolge zaehlt nicht", () => {
    // ZWEI GELADENE KOPIEN DESSELBEN BLOBS SIND VERSCHIEDENE OBJEKTE: Ein === auf
    // die Records meldete IMMER dirty, und der Speichern-Knopf staende dauerhaft
    // scharf. Die Schluessel-Reihenfolge ist ausserdem keine Aenderung — ein Blob
    // aus der Datenbank muss sie nicht so tragen wie der im Speicher gebaute.
    const a: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Lead: "urn:x", Purchase: "urn:y" } } },
    };
    const b: ProjectSettings = {
      pixels: { linkedin: { conversionRules: { Purchase: "urn:y", Lead: "urn:x" } } },
    };
    expect(settingsEqual(a, b)).toBe(true);
  });

  it("ein FEHLENDES Feld und ein LEERER Record sind gleich — kein false-dirty beim Laden", () => {
    // Ein Projekt aus der Zeit vor dieser Scheibe traegt das Feld gar nicht; der
    // Schreiber legt bei der ersten Eingabe einen Record an und kann ihn wieder
    // leeren. Beides muss denselben Zustand bedeuten, sonst meldet der Editor
    // ungespeicherte Aenderungen, die niemand gemacht hat.
    const ohne: ProjectSettings = { pixels: { linkedin: { pixelId: "444" } } };
    const leer: ProjectSettings = {
      pixels: { linkedin: { pixelId: "444", conversionRules: {} } },
    };
    expect(settingsEqual(ohne, leer)).toBe(true);
  });
});
