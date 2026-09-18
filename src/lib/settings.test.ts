import { describe, expect, it } from "vitest";
import {
  eventAxisTargets,
  getCapiTokenSet,
  getMetaPixelId,
  getPixelId,
  getTrackingKey,
  setCapiState,
  setMetaPixelId,
  getConsentDialog,
  setConsentDialog,
  getConsentTheme,
  setConsentTheme,
  getConsentColorBackground,
  getConsentColorText,
  readConsentColor,
  setConsentColors,
  CONSENT_COLOR_PATTERN,
  getConsentText,
  readConsentText,
  setConsentText,
  consentTextLength,
  consentTextProblem,
  CONSENT_TEXT_MAX_LENGTH,
  setPixelId,
  settingsEqual,
  TRACKING_TARGETS,
  type ProjectSettings,
  getConsentLanguage,
  setConsentLanguage,
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

// --- SCHEIBE 11.5d: DER EINWILLIGUNGS-SCHALTER MIT STRING-WERTEN ------------------
//
// S1 BIS S3 ERSETZEN T6 UND T7 AUS SCHEIBE 11.5a — SIE BIEGEN SIE NICHT. Jene riefen
// setConsentGate, das mit dieser Scheibe gestrichen ist. IHR GEGENSTAND GEHT IN S3 UEBER,
// SCHAERFER: Der Term ist fuer dirty sichtbar (T6), ohne false-dirty im Bestand (T7) —
// und zusaetzlich vergleicht er den NORMALISIERTEN Wert, keine boolesche Projektion.
//
// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NICHT AUS DEM CODE: fehlt -> off ·
// `gate: true` ohne `dialog` -> bar (Altbestand) · `dialog` gewinnt gegen `gate` ·
// jeder andere `dialog`-Wert -> unknown · ein altes `gate` mit anderem Wert als true
// bleibt off.
describe("getConsentDialog — der Leser des Schalters (Scheibe 11.5d)", () => {
  it("S1: fehlt -> off, Altbestand -> bar, Vorrang des neuen Schluessels, alles andere -> unknown", () => {
    expect(getConsentDialog({})).toBe("off");
    expect(getConsentDialog({ consent: {} })).toBe("off");
    // ALTBESTAND aus 11.5a bis 11.5c.
    expect(getConsentDialog({ consent: { gate: true } })).toBe("bar");
    expect(getConsentDialog({ consent: { gate: false } })).toBe("off");
    // Ein altes gate mit anderem Wert als true bleibt AUS — das heutige Verhalten.
    expect(getConsentDialog({ consent: { gate: "true" as unknown as boolean } })).toBe("off");
    // Der neue Schluessel.
    expect(getConsentDialog({ consent: { dialog: "off" } })).toBe("off");
    expect(getConsentDialog({ consent: { dialog: "bar" } })).toBe("bar");
    // SEIT SCHEIBE 11.5d-2 EIN GEBAUTER WERT — auch neben einem Altbestand.
    expect(getConsentDialog({ consent: { dialog: "modal" } })).toBe("modal");
    expect(getConsentDialog({ consent: { gate: true, dialog: "modal" } })).toBe("modal");
    // DIE VORRANG-REGEL, in beide Richtungen.
    expect(getConsentDialog({ consent: { gate: true, dialog: "off" } })).toBe("off");
    expect(getConsentDialog({ consent: { gate: false, dialog: "bar" } })).toBe("bar");
    // UNBEKANNT — nie auf off abgebildet, auch nicht neben einem gate: true.
    // DER BELEG TRAEGT DAS PRAEFIX `__ps_`: Kein Schalter-Wert traegt es je (Plan-Setzung
    // der Scheibe 11.5d-2, am Docblock von CONSENT_DIALOGS) — bis dahin stand hier
    // "modal", und der Beleg wurde mit dem Bau seines Werts falsch.
    for (const v of ["__ps_unknown", "MODAL", "BAR", "Off", "", null, true, false, 1, {}, []]) {
      expect(getConsentDialog({ consent: { dialog: v } })).toBe("unknown");
    }
    expect(getConsentDialog({ consent: { gate: true, dialog: "__ps_unknown" } })).toBe(
      "unknown"
    );
  });

  it("S2: der Setzer schreibt den neuen Schluessel und laesst alle anderen Mitglieder stehen", () => {
    const vorher: ProjectSettings = {
      pixels: { meta: { pixelId: "123" } },
      consent: { gate: true },
    };
    const nachher = setConsentDialog(vorher, "off");
    expect(nachher.consent).toEqual({ gate: true, dialog: "off" });
    expect(nachher.pixels).toEqual({ meta: { pixelId: "123" } });
    // Reine Funktion: das Eingangsobjekt bleibt unveraendert.
    expect(vorher.consent).toEqual({ gate: true });
    // Und das geschriebene "off" gewinnt gegen das liegengebliebene gate.
    expect(getConsentDialog(nachher)).toBe("off");
  });

  // S3. DER EINZIGE TEST, DER DEN TERM IN settingsEqual HAELT (Pflicht-Mutation (iv)).
  // Die Ungleichheit bar gegen unknown ist der Diskriminator gegen eine boolesche
  // Projektion: Unter `!== "off"` waeren beide "an" und damit gleich.
  it("S3: settingsEqual vergleicht den normalisierten Wert — sichtbar fuer dirty, kein false-dirty", () => {
    const aus = setConsentDialog({}, "off");
    const leiste = setConsentDialog({}, "bar");
    expect(settingsEqual(aus, leiste)).toBe(false);
    expect(settingsEqual(leiste, aus)).toBe(false);
    expect(settingsEqual({}, leiste)).toBe(false);
    expect(
      settingsEqual({ consent: { dialog: "bar" } }, { consent: { dialog: "__ps_unknown" } })
    ).toBe(false);
    // SEIT SCHEIBE 11.5d-2: zwei gebaute AN-Formen sind ungleich, und das Modal ist
    // ungleich einem unbekannten Wert — beide waeren unter `!== "off"` gleich.
    const fenster = setConsentDialog({}, "modal");
    expect(settingsEqual(leiste, fenster)).toBe(false);
    expect(settingsEqual(fenster, { consent: { dialog: "__ps_unknown" } })).toBe(false);
    expect(settingsEqual(fenster, { consent: { dialog: "modal" } })).toBe(true);
    // POSITIVKONTROLLEN, im selben Lauf: kein false-dirty.
    expect(settingsEqual({}, {})).toBe(true);
    expect(settingsEqual({}, { pixels: {} })).toBe(true);
    expect(settingsEqual({}, aus)).toBe(true);
    // Normalisiert: der Altbestand und der neue Schluessel mit derselben Bedeutung.
    expect(settingsEqual({ consent: { gate: true } }, leiste)).toBe(true);
  });
});

describe("die Darstellung des Einwilligungs-Dialogs (Scheibe 11.13b)", () => {
  // DIE ERWARTUNGEN STAMMEN AUS ENTSCHEIDUNG P11.13-6, NICHT AUS DEM CODE.
  // DER UNBEKANNT-BELEG TRAEGT DAS PRAEFIX `__ps_` — dieselbe Plan-Setzung wie beim
  // Dialogwert: der Namensraum gehoert eigenen Kennungen und wird nie ein Themenwert.

  it("TH1: fehlendes Feld -> 'light'; gebaute Werte -> sie selbst", () => {
    expect(getConsentTheme({})).toBe("light");
    expect(getConsentTheme({ consent: {} })).toBe("light");
    expect(getConsentTheme({ consent: { dialog: "bar" } })).toBe("light");
    expect(getConsentTheme({ consent: { theme: "light" } })).toBe("light");
    expect(getConsentTheme({ consent: { theme: "dark" } })).toBe("dark");
    expect(getConsentTheme({ consent: { theme: "auto" } })).toBe("auto");
    // SEIT SCHEIBE 11.13c IST "custom" EIN GEBAUTER WERT (Entscheidung P11.13-12) — eine
    // VIERTE Darstellung, kein zweiter Schalter.
    expect(getConsentTheme({ consent: { theme: "custom" } })).toBe("custom");
  });

  // TH2. DER SCHAERFSTE TEST AUF DEN EIGENEN AUSGANG "unknown" (Pflicht-Mutation Mu1).
  // ER IST NICHT DER EINZIGE, UND DAS IST GEMESSEN: Mu1 (unknown -> light) faellt VIER
  // Tests — TH2, TH3, PT1 und UI5 —, alle mit derselben Fehlerklasse "es gibt kein
  // unknown mehr". TH2 ist der einzige, der die Wertemenge EINZELN durchgeht.
  // "unknown" DARF NIE AUF "light" ABGEBILDET WERDEN: Sonst saehe publishProject einen
  // unbekannten Wert nie, und die Verweigerung waere toter Code.
  it("TH2: jeder andere Wert -> 'unknown', nie 'light'", () => {
    for (const wert of ["__ps_x", "", "LIGHT", "Dark", " auto", null, true, 1, {}, []]) {
      expect(getConsentTheme({ consent: { theme: wert } })).toBe("unknown");
    }
    // POSITIVKONTROLLE im selben Lauf: die drei gebauten Werte sind NICHT "unknown".
    for (const wert of ["light", "dark", "auto", "custom"] as const) {
      expect(getConsentTheme({ consent: { theme: wert } })).not.toBe("unknown");
    }
  });

  // TH3. DER TEST AUF DEN TERM IN settingsEqual AN DER REINEN FUNKTION (Mu4).
  // DREI TESTS HALTEN DEN TERM, GEMESSEN: TH3 hier, UI3 und UI4 am Bedienweg. Die erste
  // Vorhersage nannte TH3 als Einzelstueck und war zu eng — der Term traegt eine Achse,
  // die bis in den Projektwechsel-Guard reicht.
  // "dark gegen auto" ist der Diskriminator gegen eine boolesche Projektion: Unter
  // `!== "light"` waeren beide "dunkel" und damit gleich.
  it("TH3: settingsEqual vergleicht den normalisierten Themenwert — sichtbar fuer dirty, kein false-dirty", () => {
    const hell = setConsentTheme({}, "light");
    const dunkel = setConsentTheme({}, "dark");
    const auto = setConsentTheme({}, "auto");
    expect(settingsEqual(hell, dunkel)).toBe(false);
    expect(settingsEqual(dunkel, hell)).toBe(false);
    expect(settingsEqual(dunkel, auto)).toBe(false);
    expect(settingsEqual(auto, dunkel)).toBe(false);
    expect(settingsEqual(hell, { consent: { theme: "__ps_x" } })).toBe(false);
    // POSITIVKONTROLLEN: kein false-dirty. Fehlendes Feld und geschriebenes "light" sind
    // DASSELBE — sonst waere jedes Bestandsprojekt beim Laden sofort dirty.
    expect(settingsEqual({}, hell)).toBe(true);
    expect(settingsEqual({}, {})).toBe(true);
    expect(settingsEqual(dunkel, { consent: { theme: "dark" } })).toBe(true);
  });

  it("TH4: setConsentTheme laesst dialog und gate unberuehrt", () => {
    const vorher: ProjectSettings = { consent: { gate: true, dialog: "modal" } };
    const nachher = setConsentTheme(vorher, "dark");
    expect(getConsentDialog(nachher)).toBe("modal");
    expect(nachher.consent?.gate).toBe(true);
    expect(getConsentTheme(nachher)).toBe("dark");
    // Und der Setzer mutiert das Original nicht.
    expect(getConsentTheme(vorher)).toBe("light");
  });

  it("TH5: die zwei Schalter sind unabhaengig — jeder Setzer laesst den anderen Wert stehen", () => {
    const a = setConsentTheme(setConsentDialog({}, "bar"), "auto");
    expect(getConsentDialog(a)).toBe("bar");
    expect(getConsentTheme(a)).toBe("auto");
    const b = setConsentDialog(a, "off");
    expect(getConsentTheme(b)).toBe("auto");
    expect(settingsEqual(a, b)).toBe(false);
  });
});

describe("die zwei freien Farben (Scheibe 11.13c)", () => {
  // DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN P11.13-14, -17 und -19, NICHT AUS DEM
  // CODE. Das erlaubte Alphabet ist `^#[0-9a-f]{6}$` und sonst nichts.

  // CF1. DER EINZIGE WAECHTER UEBER "GENAU EINE ZUSICHERUNG" (Entscheidung P11.13-17),
  // und er traegt seine Grenze an sich selbst:
  // ER SIEHT ZEICHEN, NICHT BEDEUTUNG. Er zaehlt das Vorkommen von `as ConsentColor` im
  // QUELLTEXT von settings.ts — eine Zusicherung mit anderem Wortlaut (ein
  // `<ConsentColor>`, ein Umweg ueber `unknown`, eine Hilfsfunktion in einer ANDEREN
  // Datei) entgeht ihm. ER MUSS IN DIE STRENGE RICHTUNG IRREN: lieber ein Fehlalarm, den
  // jemand prueft, als ein Durchlassen, das niemand sieht.
  // WARUM ES IHN BRAUCHT: Eine zweite Erzeugungsstelle hebt das Format-Tor auf, OHNE dass
  // ein Gate rot wird — der Compiler ist danach zufrieden, und die Pruefung findet nicht
  // mehr statt. Kein Typfehler, kein roter Test, keine Meldung.
  it("CF1: genau EINE Zusicherung des geprueften Typs, und sie steht hinter dem Test", async () => {
    const { readFile } = await import("node:fs/promises");
    // Der Pfad ist repo-relativ; vitest laeuft mit dem Repo-Wurzelverzeichnis als cwd.
    // `import.meta.url` taugt hier NICHT — unter vitest ist es kein file:-Schema.
    const quelle = await readFile("src/lib/settings.ts", "utf8");
    const treffer = quelle.match(/as ConsentColor/g) ?? [];
    expect(treffer).toHaveLength(1);
    // SIE STEHT HINTER DEM REGEX-TEST, nicht davor und nicht daneben.
    const i = quelle.indexOf("as ConsentColor");
    const j = quelle.lastIndexOf("CONSENT_COLOR_PATTERN.test", i);
    expect(j).toBeGreaterThan(-1);
    expect(i - j).toBeLessThan(200);
    // POSITIVKONTROLLEN der Suche im selben Lauf.
    expect(quelle).toContain("CONSENT_COLOR_PATTERN");
    expect("x as ConsentColor y".match(/as ConsentColor/g)).toHaveLength(1);
  });

  // CF2. DER SCHAERFSTE TEST AUF DAS FORMAT-TOR (Pflicht-Mutation M-a). Die Liste ist die
  // FEINDLICHE EINGABE aus Invariante Z8 des Zuschnitts, wortwoertlich: Kurzform,
  // Grossbuchstaben, ein Wert mit `;`, einer mit `}` und einer Folgeregel, einer mit
  // `</script>`, einer mit `url(`, der leere String, eine Zahl, ein Objekt und das
  // fehlende Feld.
  // DER ANKER IST DER PUNKT: Ohne `^` und `$` passierte `#000000;}.bar{display:none` das
  // Tor, und aus einer Farbe wuerde eine zweite CSS-Regel im Schattenbaum.
  it("CF2: jede feindliche Eingabe -> 'unknown', nie ein Wert", () => {
    for (const roh of [
      "#fff",
      "#FFFFFF",
      "#fff;}",
      "#000000;}.bar{display:none",
      "</script>",
      "url(x)",
      "",
      " #ffffff",
      "#ffffff ",
      "#12345g",
      "#1234567",
      "rgb(0,0,0)",
      "white",
      null,
      true,
      1,
      {},
      [],
      undefined,
    ]) {
      expect(readConsentColor(roh), JSON.stringify(roh)).toBe("unknown");
    }
    // Ueber die zwei Leser, und zwar ueber das FEHLENDE Feld hinaus.
    expect(getConsentColorBackground({})).toBe("unknown");
    expect(getConsentColorText({})).toBe("unknown");
    expect(getConsentColorBackground({ consent: {} })).toBe("unknown");
    expect(getConsentColorText({ consent: { theme: "custom" } })).toBe("unknown");
    // POSITIVKONTROLLE im selben Lauf: gueltige Werte kommen durch.
    for (const gut of ["#ffffff", "#000000", "#111827", "#0a0b0c", "#abcdef"]) {
      expect(readConsentColor(gut), gut).toBe(gut);
    }
    expect(
      getConsentColorBackground({ consent: { colorBackground: "#123456" } })
    ).toBe("#123456");
    expect(getConsentColorText({ consent: { colorText: "#654321" } })).toBe(
      "#654321"
    );
    // UND DAS MUSTER SELBST, gegen einen Tippfehler im Ausdruck.
    expect(CONSENT_COLOR_PATTERN.source).toBe("^#[0-9a-f]{6}$");
  });

  // CF3. DER TEST AUF DIE ZWEI TERME IN settingsEqual (Pflicht-Mutation M-d), an der
  // reinen Funktion. Er ist NICHT der einzige, der die Achse traegt — die UI-Laeufe am
  // Bedienweg fangen dieselbe Klasse; DIESER ist der einzige, der BEIDE Terme EINZELN
  // durchgeht.
  it("CF3: settingsEqual vergleicht beide Farben normalisiert — sichtbar fuer dirty", () => {
    const a = setConsentColors({}, "#ffffff", "#111827");
    const b = setConsentColors({}, "#000000", "#111827");
    const c = setConsentColors({}, "#ffffff", "#ffffff");
    // Der Hintergrund allein macht den Unterschied …
    expect(settingsEqual(a, b)).toBe(false);
    // … und die Textfarbe allein ebenso. Ohne den ZWEITEN Term waere dieses Paar gleich.
    expect(settingsEqual(a, c)).toBe(false);
    // Ein ungueltiger Wert ist nicht gleich einem gueltigen.
    expect(settingsEqual(a, setConsentColors({}, "#FFFFFF", "#111827"))).toBe(
      false
    );
    // POSITIVKONTROLLEN: kein false-dirty. Zwei ungueltige Werte sind normalisiert gleich.
    expect(settingsEqual(a, setConsentColors({}, "#ffffff", "#111827"))).toBe(
      true
    );
    expect(
      settingsEqual(
        { consent: { colorBackground: "#zz" } },
        { consent: { colorBackground: "nope" } }
      )
    ).toBe(true);
    expect(settingsEqual({}, {})).toBe(true);
  });

  // CF4. DER SETZER FASST DIE NACHBARN NICHT AN — dieselbe Bauform wie setConsentTheme.
  it("CF4: setConsentColors laesst gate, dialog und theme unberuehrt und mutiert nicht", () => {
    const vorher: ProjectSettings = {
      consent: { gate: true, dialog: "modal", theme: "custom" },
    };
    const nachher = setConsentColors(vorher, "#010203", "#0a0b0c");
    expect(getConsentDialog(nachher)).toBe("modal");
    expect(getConsentTheme(nachher)).toBe("custom");
    expect(nachher.consent?.gate).toBe(true);
    expect(getConsentColorBackground(nachher)).toBe("#010203");
    expect(getConsentColorText(nachher)).toBe("#0a0b0c");
    // Das Original bleibt unberuehrt.
    expect(getConsentColorBackground(vorher)).toBe("unknown");
  });

  // CF5. DIE FARBEN UEBERLEBEN DEN WECHSEL DER DARSTELLUNG (Entscheidung P11.13-14):
  // "Ist die Darstellung nicht eigene Farben, werden gespeicherte Farben weder gelesen
  // noch ausgeliefert" — LIEGEN BLEIBEN SIE TROTZDEM.
  it("CF5: ein Wechsel der Darstellung laesst die zwei Farben im Blob stehen", () => {
    const mitFarben = setConsentColors(
      setConsentTheme({}, "custom"),
      "#010203",
      "#0a0b0c"
    );
    const hell = setConsentTheme(mitFarben, "light");
    expect(getConsentTheme(hell)).toBe("light");
    expect(getConsentColorBackground(hell)).toBe("#010203");
    expect(getConsentColorText(hell)).toBe("#0a0b0c");
    // Und zurueck: die Wahl steht wieder da.
    expect(getConsentColorBackground(setConsentTheme(hell, "custom"))).toBe(
      "#010203"
    );
  });
});

describe("Der freie Sachtext (Phase 11.13, Scheibe 11.13d)", () => {
  // DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN UND NICHT AUS DEM CODE (Pflicht 2 des
  // Zuschnitts): die verbotenen Zeichenklassen aus Entscheidung P11.13-26, die drei
  // Ausgaenge aus demselben Text, die Zaehl-Achse aus P11.13-27.

  // CT-A1. DER EINZIGE WAECHTER UEBER "GENAU EINE ZUSICHERUNG" (Entscheidung P11.13-17),
  // Spiegel von CF1, MIT DERSELBEN GRENZE AN SICH SELBST: ER SIEHT ZEICHEN, NICHT
  // BEDEUTUNG. Er zaehlt "as ConsentText" im QUELLTEXT; eine Zusicherung mit anderem
  // Wortlaut oder in einer anderen Datei entgeht ihm. ER MUSS STRENG IRREN — lieber ein
  // Fehlalarm, den jemand prueft, als ein Durchlassen, das niemand sieht.
  // WARUM ES IHN BRAUCHT: Eine zweite Erzeugungsstelle hebt das Tor auf, OHNE dass ein
  // Gate rot wird; der Compiler ist danach zufrieden.
  it("CT-A1: genau EINE Zusicherung des geprueften Sachtext-Typs, hinter der Pruefung", async () => {
    const { readFile } = await import("node:fs/promises");
    const quelle = await readFile("src/lib/settings.ts", "utf8");
    const treffer = quelle.match(/as ConsentText/g) ?? [];
    expect(treffer).toHaveLength(1);
    const i = quelle.indexOf("as ConsentText");
    const j = quelle.lastIndexOf("consentTextProblem(raw)", i);
    expect(j).toBeGreaterThan(-1);
    expect(i - j).toBeLessThan(200);
    // POSITIVKONTROLLEN der Suche im selben Lauf.
    expect(quelle).toContain("consentTextProblem");
    expect("x as ConsentText y".match(/as ConsentText/g)).toHaveLength(1);
  });

  // CT-R1. JEDE FEINDLICHE EINGABE -> "unknown" (Pflicht-Mutationen M-c und M-d). Die
  // Zeichenklassen sind die aus Entscheidung P11.13-26, einzeln aufgezaehlt.
  // DIE ZEICHEN WERDEN IM CODE GEBAUT UND NICHT HINGESCHRIEBEN: Ein Unicode-Escape im
  // Quelltext ist in diesem Projekt am 2026-09-18 mehrfach STILL in sein Zeichen
  // verwandelt worden, und bei U+0000 waere das Ergebnis ein NUL-Byte in einer
  // Quelldatei, das kein Gate meldet.
  it("CT-R1: Steuerzeichen, Bidi, leer, zu lang und Nicht-Strings -> 'unknown'", () => {
    const Z = (c: number) => String.fromCharCode(c);
    const feindlich: ReadonlyArray<readonly [string, unknown]> = [
      ["NUL (C0)", "a" + Z(0x00) + "b"],
      ["Zeilenumbruch (C0)", "a" + Z(0x0a) + "b"],
      ["Wagenruecklauf (C0)", "a" + Z(0x0d) + "b"],
      ["Tabulator (C0)", "a" + Z(0x09) + "b"],
      ["DEL", "a" + Z(0x7f) + "b"],
      ["C1", "a" + Z(0x85) + "b"],
      ["Zeilentrenner U+2028", "a" + Z(0x2028) + "b"],
      ["Absatztrenner U+2029", "a" + Z(0x2029) + "b"],
      ["Bidi-Einbettung U+202A", "a" + Z(0x202a) + "b"],
      ["Bidi-Ueberschreibung U+202E", "a" + Z(0x202e) + "b"],
      ["Bidi-Isolat U+2066", "a" + Z(0x2066) + "b"],
      ["Bidi-Isolat U+2069", "a" + Z(0x2069) + "b"],
      ["leerer String", ""],
      ["nur Leerzeichen", "   "],
      ["N+1 Zeichen", "W".repeat(CONSENT_TEXT_MAX_LENGTH + 1)],
      ["Zahl", 42],
      ["Objekt", { text: "x" }],
      ["null", null],
      ["Wahrheitswert", true],
    ];
    for (const [name, wert] of feindlich) {
      expect(readConsentText(wert), name).toBe("unknown");
    }
  });

  // CT-R2. DIE POSITIVKONTROLLE — OHNE SIE WAERE CT-R1 AUCH DANN GRUEN, WENN DAS TOR
  // ALLES ABWIESE. Sie haelt zugleich die Zusage aus Entscheidung P11.13-26: EIN "<" IST
  // AUSDRUECKLICH ERLAUBT, denn dafuer ist der Einbettungs-Helfer da. Wer es ins Tor
  // aufnimmt, macht diesen Test rot.
  it("CT-R2: ein gueltiger Text mit '<' geht DURCH — und genau N Zeichen auch", () => {
    const mitKleiner = "Wir setzen <3 Cookies";
    expect(readConsentText(mitKleiner)).toBe(mitKleiner);
    expect(consentTextProblem(mitKleiner)).toBeNull();
    // Der feindliche Sachtext selbst ist GUELTIGE Eingabe — ihn faengt nicht das Tor,
    // sondern der Helfer maskiert ihn. Das sind die zwei unabhaengigen Linien (S4).
    const feindlich = "</script><img src=x onerror=window.__AUSBRUCH=1>";
    expect(readConsentText(feindlich)).toBe(feindlich);
    // DER RANDWERT: genau N Zeichen sind gueltig, N+1 nicht (CT-R1).
    const genauN = "W".repeat(CONSENT_TEXT_MAX_LENGTH);
    expect(readConsentText(genauN)).toBe(genauN);
    // Leerraum an den Raendern wird GEPRUEFT, aber NICHT ENTFERNT (P11.13-26): Der
    // gespeicherte Wert kommt zeichengleich zurueck.
    expect(readConsentText("  Hallo  ")).toBe("  Hallo  ");
  });

  // CT-R3. DIE DREI AUSGAENGE SIND NICHT ZWEI (Entscheidung P11.13-26). WODURCH ROT:
  // wenn ein fehlendes Feld auf "unknown" faellt (dann sperrte der NORMALFALL das
  // Veroeffentlichen) oder ein leerer String auf undefined (dann waere ein unbrauchbarer
  // Wert stillschweigend gedeutet).
  it("CT-R3: Feld fehlt -> undefined; leerer String -> 'unknown'", () => {
    expect(getConsentText({})).toBeUndefined();
    expect(getConsentText({ consent: {} })).toBeUndefined();
    expect(getConsentText({ consent: { text: "" } })).toBe("unknown");
    expect(getConsentText({ consent: { text: "Hallo" } })).toBe("Hallo");
    // Der Setzer mit undefined ENTFERNT das Feld und schreibt keinen leeren String.
    const gesetzt = setConsentText({}, "Hallo");
    expect(getConsentText(gesetzt)).toBe("Hallo");
    const entfernt = setConsentText(gesetzt, undefined);
    expect(getConsentText(entfernt)).toBeUndefined();
    expect("text" in (entfernt.consent ?? {})).toBe(false);
    // Die Nachbarn im Unterobjekt bleiben unberuehrt.
    const mitDialog = setConsentText(setConsentDialog({}, "bar"), "Hallo");
    expect(getConsentDialog(mitDialog)).toBe("bar");
    expect(getConsentDialog(setConsentText(mitDialog, undefined))).toBe("bar");
  });

  // CT-Z. DIE ZAEHLUNG GEHT UEBER CODEPUNKTE, NICHT UEBER UTF-16-EINHEITEN
  // (Entscheidung P11.13-27). WODURCH ROT: wenn jemand .length einsetzt.
  it("CT-Z: consentTextLength zaehlt Codepunkte", () => {
    const emoji = String.fromCodePoint(0x1f600);
    expect(consentTextLength(emoji)).toBe(1);
    // POSITIVKONTROLLE: die zwei Achsen weichen an genau diesem Wert ab.
    expect(emoji.length).toBe(2);
    expect(consentTextLength("abc")).toBe(3);
    // FOLGE FUER DAS TOR: N Emoji sind gueltig, obwohl .length dort 2N ergaebe.
    const nEmoji = emoji.repeat(CONSENT_TEXT_MAX_LENGTH);
    expect(consentTextProblem(nEmoji)).toBeNull();
    expect(consentTextProblem(nEmoji + emoji)).toBe("laenge");
  });

  // CT-G. DER GRUND IST DERSELBE, DEN DIE OBERFLAECHE ZEIGT (P11.13-27, ABLEITEN STATT
  // HARDCODEN): Tor und Anzeige rufen DIESELBE Funktion. WODURCH ROT: wenn eine zweite,
  // gleichlautende Bedingung entsteht oder die Reihenfolge einen Grund verdeckt.
  it("CT-G: consentTextProblem benennt den Grund, und readConsentText folgt ihm", () => {
    expect(consentTextProblem("   ")).toBe("leer");
    expect(consentTextProblem("a" + String.fromCharCode(0x0a) + "b")).toBe(
      "zeichen"
    );
    expect(consentTextProblem("W".repeat(CONSENT_TEXT_MAX_LENGTH + 1))).toBe(
      "laenge"
    );
    expect(consentTextProblem(42)).toBe("kein_string");
    expect(consentTextProblem("Hallo")).toBeNull();
    // Jeder Grund fuehrt auf "unknown" — eine Abweichung waere eine zweite Bedingung.
    for (const wert of ["   ", "a" + String.fromCharCode(0x09) + "b", 42]) {
      expect(readConsentText(wert)).toBe("unknown");
    }
  });

  // CT-EQ. DER TERM IN settingsEqual (Pflicht-Mutation M-e; Entscheidung P11.13-19).
  // WODURCH ROT: wenn der Term entfernt wird — dann bliebe dirty false, der Wert ginge
  // beim Projektwechsel STILL verloren, und NICHTS wuerde davon rot.
  it("CT-EQ: settingsEqual sieht den Sachtext — normalisiert", () => {
    expect(settingsEqual({}, setConsentText({}, "Hallo"))).toBe(false);
    expect(
      settingsEqual(setConsentText({}, "Hallo"), setConsentText({}, "Hallo"))
    ).toBe(true);
    expect(
      settingsEqual(setConsentText({}, "Hallo"), setConsentText({}, "Welt"))
    ).toBe(false);
    // Entfernen ist eine Aenderung.
    const mit = setConsentText({}, "Hallo");
    expect(settingsEqual(mit, setConsentText(mit, undefined))).toBe(false);
    // NORMALISIERT: zwei verschiedene UNGUELTIGE Werte sind beide "unknown" und damit
    // gleich — sonst entstuende dirty aus einem Wert, den ohnehin niemand ausliefert.
    const leer: ProjectSettings = { consent: { text: "" } };
    const nurLeerzeichen: ProjectSettings = { consent: { text: "   " } };
    expect(settingsEqual(leer, nurLeerzeichen)).toBe(true);
    // Und ein FEHLENDES Feld ist nicht dasselbe wie ein ungueltiges.
    expect(settingsEqual({}, leer)).toBe(false);
  });
});

// ===================================================================================
// DIE SPRACHE (Phase 11.13, Scheibe 11.13e; bindende Entscheidung P11.13-37).
// Die Erwartungen stammen aus jener Entscheidung, nicht aus dem gebauten Leser.
// ===================================================================================

describe("settings — die Sprache des Einwilligungs-Dialogs", () => {
  // CL1. DIE DREI AUSGAENGE DES LESERS.
  // DER ERSTE IST KEIN RUECKFALL IM SINNE DER DAUERREGEL, und der Unterschied traegt die
  // ganze Entscheidung: Ein FEHLENDES Feld ist ein bekannter Zustand — es gibt gar keinen
  // Wert —, und "de" ist der heutige Bestand. Ein VORHANDENER, ungueltiger Wert faellt
  // dagegen NIE auf "de", sonst saehe publishProject ihn nie und der Abbruch waere toter
  // Code.
  // WODURCH ROT: ein Leser, der "unknown" auf "de" abbildet; ein Leser, der ein fehlendes
  // Feld als "unknown" meldet (dann waere jedes Bestandsprojekt unveroeffentlichbar).
  it("CL1: fehlt -> 'de', gebaut -> er selbst, alles andere -> 'unknown'", () => {
    expect(getConsentLanguage({})).toBe("de");
    expect(getConsentLanguage({ consent: {} })).toBe("de");
    expect(getConsentLanguage({ consent: { dialog: "bar" } })).toBe("de");
    expect(getConsentLanguage({ consent: { language: "de" } })).toBe("de");
    expect(getConsentLanguage({ consent: { language: "en" } })).toBe("en");
    for (const roh of [
      null,
      "",
      "DE",
      "de-DE",
      "EN",
      "fr",
      "__ps_x",
      true,
      1,
      {},
      [],
    ]) {
      expect(
        getConsentLanguage({ consent: { language: roh } }),
        JSON.stringify(roh)
      ).toBe("unknown");
    }
  });

  // CL2. DER TERM IN settingsEqual AN DER REINEN FUNKTION (Pflicht-Mutation Mu5).
  // OHNE IHN BLIEBE dirty FALSE: kein Text "Ungespeicherte Aenderungen", kein
  // beforeunload-Waechter, kein confirm beim Projektwechsel — und NICHTS wuerde davon rot.
  // WODURCH ROT: ein entfernter Term.
  it("CL2: settingsEqual vergleicht die normalisierte Sprache — sichtbar fuer dirty, kein false-dirty", () => {
    const de = setConsentLanguage({}, "de");
    const en = setConsentLanguage({}, "en");
    expect(settingsEqual(de, en)).toBe(false);
    expect(settingsEqual(en, de)).toBe(false);
    expect(settingsEqual(de, { consent: { language: "__ps_x" } })).toBe(false);
    // POSITIVKONTROLLEN: kein false-dirty. Fehlendes Feld und geschriebenes "de" sind
    // DASSELBE — sonst waere jedes Bestandsprojekt beim Laden sofort dirty.
    expect(settingsEqual({}, de)).toBe(true);
    expect(settingsEqual(en, { consent: { language: "en" } })).toBe(true);
  });

  // CL3. DER SETZER LAESST DIE NACHBARN UNBERUEHRT und mutiert das Original nicht —
  // dieselbe Bauform wie setConsentTheme (TH4).
  it("CL3: setConsentLanguage laesst dialog, theme und text unberuehrt", () => {
    const vorher: ProjectSettings = {
      consent: { gate: true, dialog: "modal", theme: "dark", text: "Mein Satz." },
    };
    const nachher = setConsentLanguage(vorher, "en");
    expect(getConsentDialog(nachher)).toBe("modal");
    expect(getConsentTheme(nachher)).toBe("dark");
    expect(nachher.consent?.text).toBe("Mein Satz.");
    expect(nachher.consent?.gate).toBe(true);
    expect(getConsentLanguage(nachher)).toBe("en");
    // Das Original bleibt, wie es war.
    expect(getConsentLanguage(vorher)).toBe("de");
  });
});
