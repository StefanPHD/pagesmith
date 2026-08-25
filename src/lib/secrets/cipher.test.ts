import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest) -> hier durch ein leeres Modul ersetzen, damit cipher.ts laedt. Bauform und
// Begruendung wie in capi/token.test.ts. KEINE Auslassung, sondern eine Aussage: der
// Pruefling IST server-only (er liest den Schluessel), anders als die reinen Dateien
// google-payload.ts / google-click-ids.ts, deren Tests den Mock bewusst NICHT setzen.
vi.mock("server-only", () => ({}));

import { decryptSecret, encryptSecret } from "./cipher";

// ===========================================================================
// CHIFFRIEREN UND DECHIFFRIEREN (Phase 11.8, Scheibe 11.8a).
//
// KEIN ECHTES GEHEIMNIS IN DIESER DATEI. Alle Schluessel und Klartexte sind erfunden
// und am Namen erkennbar ("ERFUNDEN-..."). Der Grund steht in docs/immer-beachten.md,
// "SCHWAERZUNG — VIER TEILE", Teil (d): ein formbasierter Schutz sieht echt und
// erfunden als DIESELBE Eingabe — der echte Wert misst denselben Pfad nur mit
// Schadenspotenzial.
//
// PROSA OHNE UMLAUTE wie im Pruefling. DIE EINZIGE AUSNAHME IST DER KLARTEXT IN
// TESTFALL 7 — dort SIND die Nicht-ASCII-Zeichen der Gegenstand.
//
// DIE UMGEBUNG WIRD JE TEST GESETZT UND ZURUECKGESTELLT — Bauform von
// capi/proxy.test.ts und app-serve/route.test.ts. Ohne das Zuruecksetzen faerbte ein
// Test den naechsten.
// ===========================================================================

/** ERFUNDENE Schluessel, je genau 32 Byte, base64. Am Namen erkennbar. */
const KEY_A = Buffer.from("ERFUNDEN-testschluessel-A-000000", "utf8").toString(
  "base64",
);
const KEY_B = Buffer.from("ERFUNDEN-testschluessel-B-000000", "utf8").toString(
  "base64",
);

/** ERFUNDENER Klartext. Kein echtes Zugangsdatum. */
const KLARTEXT = "ERFUNDEN-zugangsdatum-nicht-echt-0001";

const ORIGINAL_KEYS = process.env.SECRET_ENC_KEYS;
const ORIGINAL_ACTIVE = process.env.SECRET_ENC_ACTIVE_KEY_ID;

function setEnv(keys: string | undefined, activeId: string | undefined): void {
  if (keys === undefined) delete process.env.SECRET_ENC_KEYS;
  else process.env.SECRET_ENC_KEYS = keys;
  if (activeId === undefined) delete process.env.SECRET_ENC_ACTIVE_KEY_ID;
  else process.env.SECRET_ENC_ACTIVE_KEY_ID = activeId;
}

/** Die Normallage der meisten Tests: EIN Schluessel, Kennung "dev-1". */
function setDefaultEnv(): void {
  setEnv(`dev-1:${KEY_A}`, "dev-1");
}

beforeEach(() => {
  setDefaultEnv();
});

afterEach(() => {
  if (ORIGINAL_KEYS === undefined) delete process.env.SECRET_ENC_KEYS;
  else process.env.SECRET_ENC_KEYS = ORIGINAL_KEYS;
  if (ORIGINAL_ACTIVE === undefined) delete process.env.SECRET_ENC_ACTIVE_KEY_ID;
  else process.env.SECRET_ENC_ACTIVE_KEY_ID = ORIGINAL_ACTIVE;
});

/** Chiffriert und besteht auf Erfolg — sonst ist der Test schon vorher kaputt. */
function chiffriere(plaintext: string): string {
  const result = encryptSecret(plaintext);
  if (result.kind !== "ok")
    throw new Error(`erwartet ok, war: ${result.kind}`);
  return result.value;
}

/** Ersetzt EIN Zeichen an einer Stelle — das Werkzeug der Manipulations-Tests. */
function kippeZeichen(text: string, index: number): string {
  const alt = text[index];
  const neu = alt === "A" ? "B" : "A";
  return text.slice(0, index) + neu + text.slice(index + 1);
}

/** Ersetzt EINEN der fuenf Teile. */
function ersetzeTeil(payload: string, teil: number, wert: string): string {
  const parts = payload.split(".");
  parts[teil] = wert;
  return parts.join(".");
}

/** Kippt das ERSTE Zeichen eines Teils, laesst dessen Laenge unveraendert. */
function kippeImTeil(payload: string, teil: number): string {
  const parts = payload.split(".");
  parts[teil] = kippeZeichen(parts[teil], 0);
  return parts.join(".");
}

// ---------------------------------------------------------------------------
// 1 — RUNDLAUF
// ---------------------------------------------------------------------------
describe("Rundlauf", () => {
  it("dechiffriert, was chiffriert wurde", () => {
    // ROT DURCH JEDE VERLETZUNG DER UMKEHRBARKEIT: falsche Kodierung (latin1 statt
    // utf8), vertauschte Teile, falsche Nonce-Laenge, ein anderer Betriebsmodus auf
    // einer der beiden Seiten.
    const payload = chiffriere(KLARTEXT);
    const result = decryptSecret(payload);
    expect(result).toEqual({ kind: "ok", value: KLARTEXT });
  });
});

// ---------------------------------------------------------------------------
// 2 — ZWEIMAL DASSELBE ERGIBT VERSCHIEDENE CHIFFRATE
// ---------------------------------------------------------------------------
describe("Zweimal derselbe Klartext", () => {
  it("ergibt VERSCHIEDENE Chiffrate, und beide dechiffrieren zurueck", () => {
    // ROT DURCH EIN FESTES ODER ABGELEITETES NONCE (Konstante, Zaehler, aus dem
    // Klartext gehasht). DER ZWEITE TEIL IST DER SCHARFE: Ohne ihn waere der Test
    // auch dann gruen, wenn die Ausgabe bloss zufaellig verrauscht wuerde, ohne dass
    // die Zeichenkette noch etwas bedeutet.
    // WARUM DIE ACHSE ZAEHLT: Gleiche Klartexte mit gleichem Chiffrat verrieten dem
    // Leser des Speichers, WELCHE ZWEI PROJEKTE DASSELBE GEHEIMNIS TRAGEN.
    const a = chiffriere(KLARTEXT);
    const b = chiffriere(KLARTEXT);

    expect(a).not.toBe(b);
    expect(decryptSecret(a)).toEqual({ kind: "ok", value: KLARTEXT });
    expect(decryptSecret(b)).toEqual({ kind: "ok", value: KLARTEXT });
  });
});

// ---------------------------------------------------------------------------
// 3 — MANIPULATION WIRD ERKANNT
// ---------------------------------------------------------------------------
describe("Manipulation am Chiffrat", () => {
  it("3a — ein gekipptes Zeichen im CHIFFRAT-Teil ergibt auth_failed", () => {
    // ROT, sobald das Etikett nicht mehr geprueft wird — etwa durch einen Wechsel auf
    // ein nicht-authentisiertes Verfahren. Dann kaeme ein VERAENDERTER Klartext als
    // kind:"ok" zurueck, und niemand saehe es.
    const payload = chiffriere(KLARTEXT);
    expect(decryptSecret(kippeImTeil(payload, 4))).toEqual({
      kind: "auth_failed",
    });
  });

  it("3b — ein gekipptes Zeichen im ETIKETT-Teil ergibt auth_failed", () => {
    // ROT, wenn das Etikett aus der Nutzlast beim Dechiffrieren ignoriert wird.
    const payload = chiffriere(KLARTEXT);
    expect(decryptSecret(kippeImTeil(payload, 3))).toEqual({
      kind: "auth_failed",
    });
  });

  it("3c — ein gekipptes Zeichen im NONCE-Teil ergibt auth_failed", () => {
    // ROT, wenn das Nonce nicht in die Pruefung eingeht. Die Laenge bleibt bei diesem
    // Kippen unveraendert (16 Zeichen base64url = 12 Byte) -> der Weg fuehrt bis zum
    // Krypto-Versuch und nicht in bad_format. Genau das soll er.
    const payload = chiffriere(KLARTEXT);
    expect(decryptSecret(kippeImTeil(payload, 2))).toEqual({
      kind: "auth_failed",
    });
  });

  it("3d — eine umgeschriebene KENNUNG im Kopf ergibt NICHT ok", () => {
    // DER EINZIGE WAECHTER DER ZUSATZDATEN-BINDUNG. Wird er entfernt, ist nichts mehr
    // rot, wenn der Kopf nicht mehr mitauthentisiert wird (docs/immer-beachten.md,
    // Lektion (f): eine Fehlerklasse, die genau EIN Test faengt, gehoert in seinen
    // Kommentar).
    //
    // DIE LAGE IST EIGENS GEBAUT UND IM BETRIEB VERBOTEN: ZWEI Kennungen auf DENSELBEN
    // Schluesselwert. Nur so waehlt die umgeschriebene Kennung DENSELBEN Schluessel —
    // und nur dann sagt das Ergebnis etwas ueber die BINDUNG statt ueber den
    // Schluesselwechsel. Mit zwei verschiedenen Werten waere der Test auch ohne
    // Bindung gruen und damit hohl.
    setEnv(`dev-1:${KEY_A},dev-2:${KEY_A}`, "dev-1");
    const payload = chiffriere(KLARTEXT);
    expect(payload.split(".")[1]).toBe("dev-1");

    const umgeschrieben = ersetzeTeil(payload, 1, "dev-2");
    expect(decryptSecret(umgeschrieben)).toEqual({ kind: "auth_failed" });
  });
});

// ---------------------------------------------------------------------------
// 4 — FALSCHER SCHLUESSEL
// ---------------------------------------------------------------------------
describe("Falscher Schluessel", () => {
  it("4a — derselbe Kennungsname, ANDERER Wert ergibt auth_failed und NIE ok/no_key/leer", () => {
    // DAS IST DIE RESTGEFAHR VON K2 IN GESTALT EINES TESTS: Wer den Wert unter
    // derselben Kennung austauscht, faellt auf die Ununterscheidbarkeit zurueck, die
    // die Kennung gerade beseitigen sollte. Deshalb steht die Regel "EINE KENNUNG WIRD
    // NIE FUER EINEN ANDEREN SCHLUESSELWERT WIEDERVERWENDET" im Kopf des Pruefling.
    //
    // ROT AUCH DANN, wenn ein Fehlschlag zu no_key oder zu einem leeren Klartext
    // umgebogen wird. Die verbotenen Arten stehen einzeln da, nicht nur die erwartete:
    // ein leerer Rueckgabewert liefe beim spaeteren Aufrufer in hasSecret und liesse
    // das Ziel LAUTLOS aus der Empfaengerliste verschwinden.
    const payload = chiffriere(KLARTEXT);
    setEnv(`dev-1:${KEY_B}`, "dev-1");

    const result = decryptSecret(payload);
    expect(result.kind).toBe("auth_failed");
    expect(result.kind).not.toBe("ok");
    expect(result.kind).not.toBe("no_key");
    expect(result).not.toHaveProperty("value");
  });

  it("4b — ein Chiffrat aus einer ANDEREN Umgebung ergibt unknown_key, VOR jedem Versuch", () => {
    // DIE TRENNUNG T2 IN GESTALT EINES TESTS: Produktion und Entwicklung tragen
    // verschiedene Kennungen. Ein Produktions-Chiffrat nennt eine Kennung, die die
    // Entwicklungsumgebung nicht kennt -> laut und unterscheidbar von einer
    // Manipulation.
    // ROT, wenn die Kennung nicht mehr mitreist, wenn sie nicht mehr nachgeschlagen
    // wird, oder wenn unknown_key mit auth_failed zusammenfaellt.
    setEnv(`prod-1:${KEY_A}`, "prod-1");
    const ausProduktion = chiffriere(KLARTEXT);

    setEnv(`dev-1:${KEY_A}`, "dev-1");
    expect(decryptSecret(ausProduktion)).toEqual({ kind: "unknown_key" });
  });
});

// ---------------------------------------------------------------------------
// 5 — FEHLENDER UND UNBRAUCHBARER SCHLUESSEL
// ---------------------------------------------------------------------------
describe("Fehlender Schluessel", () => {
  it("5 — unset, leer und nur-Leerraum ergeben no_key, bei BEIDEN Funktionen", () => {
    // ROT, wenn sich ein Ersatzwert-Muster einschleicht (der Bestand macht aus einer
    // fehlenden Variable sonst ein "" — s. capi/proxy.ts, capi/tiktok-forward.ts) oder
    // wenn no_key mit bad_key/auth_failed zusammenfaellt.
    const payload = chiffriere(KLARTEXT);

    for (const keys of [undefined, "", "   "]) {
      setEnv(keys, "dev-1");
      expect(encryptSecret(KLARTEXT)).toEqual({ kind: "no_key" });
      expect(decryptSecret(payload)).toEqual({ kind: "no_key" });
    }

    // Und die zweite Haelfte: Schluessel da, aber KEINE aktive Kennung benannt.
    // Das trifft nur das Chiffrieren — Dechiffrieren braucht sie nicht.
    setEnv(`dev-1:${KEY_A}`, undefined);
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "no_key" });
    expect(decryptSecret(payload)).toEqual({ kind: "ok", value: KLARTEXT });
  });

  it("5b — unbrauchbares Schluesselmaterial ergibt bad_key, NICHT no_key", () => {
    // ROT, wenn die Laengenpruefung entfaellt: Buffer.from(x,"base64") ist
    // nachsichtig, es ueberspringt unbekannte Zeichen still — ohne Pruefung entstuende
    // ein zu kurzer Schluessel und der Fehler faele erst tief in der Laufzeit an.
    const payload = chiffriere(KLARTEXT);

    const kaputt = [
      "dev-1:nicht-base64!!!", // dekodiert nicht auf 32 Byte
      `dev-1:${Buffer.from("zu-kurz", "utf8").toString("base64")}`,
      `dev-1${KEY_A}`, // Doppelpunkt fehlt
      `:${KEY_A}`, // Kennung fehlt
      `dev-1:${KEY_A},`, // leerer Eintrag (ein Komma zuviel)
      // ZUSATZ GEGENUEBER DEM PLAN, und er gehoert zur Kennungs-Regel: DIESELBE
      // Kennung zweimal. "Der letzte gewinnt" waere eine stille Entscheidung
      // darueber, welcher von zwei Schluesseln gilt.
      `dev-1:${KEY_A},dev-1:${KEY_B}`,
    ];

    for (const keys of kaputt) {
      setEnv(keys, "dev-1");
      expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });
      expect(decryptSecret(payload)).toEqual({ kind: "bad_key" });
    }

    // Aktive Kennung benannt, aber nicht im Vorrat -> ebenfalls bad_key (die
    // Konfiguration ist unbrauchbar, nicht leer).
    setEnv(`dev-1:${KEY_A}`, "dev-9");
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });
  });
});

// ---------------------------------------------------------------------------
// 6 — LEERER KLARTEXT
// ---------------------------------------------------------------------------
describe("Leerer Klartext", () => {
  it("laeuft durch und kommt als leerer Klartext zurueck, unterscheidbar von no_key", () => {
    // ROT DURCH JEDEN "leer heisst nichts zu tun"-KURZSCHLUSS im Chiffrier- oder
    // Dechiffrier-Pfad.
    // VERMERK, KEINE ENTSCHEIDUNG: Ein zurueckgegebenes "" liefe beim SPAETEREN
    // Aufrufer in hasSecret (tracking/target-readiness.ts) und gaelte dort als "kein
    // Geheimnis". Das ist eine Frage an die Aufrufer-Scheibe; hier wird nur
    // festgehalten, dass die reine Funktion "" sauber durchreicht.
    const result = encryptSecret("");
    expect(result.kind).toBe("ok");
    if (result.kind !== "ok") return;

    expect(decryptSecret(result.value)).toEqual({ kind: "ok", value: "" });
  });
});

// ---------------------------------------------------------------------------
// 7 — NICHT-ASCII
// ---------------------------------------------------------------------------
describe("Klartext mit Nicht-ASCII-Zeichen", () => {
  it("laeuft zeichengleich durch", () => {
    // ROT DURCH latin1/ascii STATT utf8 und durch jede Laengenrechnung in ZEICHEN
    // statt in BYTES. Der Klartext traegt bewusst vier verschiedene Klassen: Umlaute,
    // ein Eszett, ein Zeichen ausserhalb der Basis-Ebene (Emoji) und ein KOMBINIERENDES
    // Zeichen (e + Accent) — Letzteres faengt zusaetzlich eine Normalisierung.
    const nichtAscii = "ERFUNDEN Gruesse: äöü ß – \u{1F600} é";
    const payload = chiffriere(nichtAscii);
    expect(decryptSecret(payload)).toEqual({ kind: "ok", value: nichtAscii });
  });
});

// ---------------------------------------------------------------------------
// 8 — GROESSENORDNUNG EINER ECHTEN OAUTH-NUTZLAST
// ---------------------------------------------------------------------------
describe("Nutzlast in der Groessenordnung eines OAuth-Zugangs", () => {
  it("laeuft zeichengleich durch", () => {
    // DER TEST, DER DIE FRAGE DER GANZEN PHASE BEANTWORTET: passt ein MEHRWERTIGES
    // Zugangsdatum (Token, Erneuerungs-Token, Ablauf, Bereiche) ueberhaupt hindurch?
    // ROT DURCH JEDE EINGEBAUTE LAENGENGRENZE, jeden zu kleinen Puffer, jede Kappung.
    const lang = "ERFUNDEN-token-teil-".repeat(90); // ~1800 Zeichen
    const nutzlast = JSON.stringify({
      accessToken: lang,
      refreshToken: `ERFUNDEN-refresh-${lang}`,
      expiresAt: "2026-09-01T00:00:00.000Z",
      scopes: ["ERFUNDEN/scope-a", "ERFUNDEN/scope-b", "ERFUNDEN/scope-c"],
    });
    expect(nutzlast.length).toBeGreaterThan(2000);

    const payload = chiffriere(nutzlast);
    expect(decryptSecret(payload)).toEqual({ kind: "ok", value: nutzlast });
  });
});

// ---------------------------------------------------------------------------
// 9 — DIE AUSGABEFORM (mit PFLICHT-POSITIVKONTROLLE)
// ---------------------------------------------------------------------------
describe("Ausgabeform", () => {
  const ERLAUBT = /^[A-Za-z0-9_.-]+$/;

  it("besteht nur aus Zeichen, die eine text-Spalte und der JS-Client unveraendert tragen", () => {
    // ROT DURCH EINEN WECHSEL VON base64url AUF base64 (dann erscheinen + und /) und
    // durch jedes Auffuellzeichen, jeden Zeilenumbruch, jedes NUL-Byte.
    const payload = chiffriere(KLARTEXT);

    expect(ERLAUBT.test(payload)).toBe(true);
    expect(payload).not.toContain("+");
    expect(payload).not.toContain("/");
    expect(payload).not.toContain("=");
    expect(payload).not.toContain("\n");
    expect(payload).not.toContain("\u0000");
    expect(payload).not.toContain(" ");
  });

  it("POSITIVKONTROLLE: derselbe Pruefausdruck faellt bei einem verbotenen Zeichen", () => {
    // OHNE SIE waeren ein echter Nicht-Treffer und ein kaputt gewordener
    // Pruefausdruck am Ergebnis nicht zu unterscheiden (docs/immer-beachten.md,
    // Lektion (d)). ROT, wenn der Ausdruck zu weit wird — etwa durch ein
    // versehentliches "+" im Zeichenvorrat.
    expect(ERLAUBT.test("v1.dev-1.aaa+bbb.ccc.ddd")).toBe(false);
    expect(ERLAUBT.test("v1.dev-1.aaa/bbb.ccc.ddd")).toBe(false);
    expect(ERLAUBT.test("v1.dev-1.aaa=.ccc.ddd")).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// 10 — WIRFT NIE
// ---------------------------------------------------------------------------
describe("Wirft nie", () => {
  it("liefert bei jeder Eingabe ein Ergebnis, nie einen Wurf", () => {
    // DIE ZUSAGE, AN DER DAS 204-CONTAINMENT DES SPAETEREN INGEST HAENGT. ROT DURCH
    // JEDE STELLE, DIE WIRFT — auch durch das Fehler-Geruest selbst.
    const erlaubteArten = [
      "ok",
      "no_key",
      "bad_key",
      "bad_format",
      "unknown_key",
      "auth_failed",
    ];

    const eingaben = [
      "",
      "…",
      "v1.dev-1",
      "v1.dev-1.a.b.c.d",
      "v1.dev-1.!!!.!!!.!!!",
      "v2.dev-1.aaaa.bbbb.cccc",
      "v1.DEV-1.aaaa.bbbb.cccc",
      "v1.dev-1..bbbb.cccc",
      "nicht-ein-chiffrat",
      "....",
    ];

    for (const eingabe of eingaben) {
      let result: ReturnType<typeof decryptSecret> | undefined;
      expect(() => {
        result = decryptSecret(eingabe);
      }).not.toThrow();
      expect(erlaubteArten).toContain(result?.kind);
      expect(result?.kind).not.toBe("ok");
    }

    // Auch der Chiffrier-Pfad wirft nicht — weder mit leerem noch mit sehr langem
    // Klartext, und auch nicht bei kaputtem Schluesselmaterial.
    expect(() => encryptSecret("")).not.toThrow();
    expect(() => encryptSecret("x".repeat(100000))).not.toThrow();
    setEnv("dev-1:kaputt", "dev-1");
    expect(() => encryptSecret(KLARTEXT)).not.toThrow();
  });
});

// ---------------------------------------------------------------------------
// 11 — KEIN GEHEIMNIS IM FEHLERPFAD (mit PFLICHT-POSITIVKONTROLLE)
// ---------------------------------------------------------------------------
describe("Der Fehlerpfad traegt kein Geheimnis", () => {
  /** Sucht die verbotenen Zeichenfolgen in der VOLLSTAENDIGEN Ausgabe. */
  function traegtGeheimnis(result: unknown, nadeln: string[]): boolean {
    const text = JSON.stringify(result) ?? "";
    return nadeln.some((nadel) => text.includes(nadel));
  }

  it("kein Fehlerzweig traegt Klartext oder Schluesselmaterial", () => {
    // ROT DURCH JEDEN DURCHGEREICHTEN LAUFZEIT-FEHLERTEXT und durch jedes zusaetzliche
    // Feld am Fehlerzweig. Geprueft wird ausserdem, dass ein Fehlerzweig GENAU EIN
    // Feld traegt — sonst waechst er unbemerkt.
    const payload = chiffriere(KLARTEXT);
    const nadeln = [KLARTEXT, KEY_A, KEY_B, "ERFUNDEN"];

    setEnv(`dev-1:${KEY_B}`, "dev-1");
    const falsch = decryptSecret(payload);
    setEnv(`dev-9:${KEY_A}`, "dev-9");
    const unbekannt = decryptSecret(payload);
    setEnv("dev-1:kaputt", "dev-1");
    const kaputt = encryptSecret(KLARTEXT);
    setEnv(undefined, undefined);
    const ohne = encryptSecret(KLARTEXT);
    setDefaultEnv();
    const form = decryptSecret("nicht-ein-chiffrat");

    for (const result of [falsch, unbekannt, kaputt, ohne, form]) {
      expect(Object.keys(result)).toEqual(["kind"]);
      expect(traegtGeheimnis(result, nadeln)).toBe(false);
    }
  });

  it("POSITIVKONTROLLE: der Sucher findet ein Geheimnis, wenn eines da ist", () => {
    // OHNE SIE ist ein echter Nicht-Treffer von einem kaputt gewordenen Sucher nicht
    // zu unterscheiden — dieselbe Auflage wie bei Testfall 9. ROT, wenn
    // traegtGeheimnis blind wird (etwa durch eine leere Nadel-Liste oder ein
    // verschlucktes JSON.stringify).
    expect(
      traegtGeheimnis({ kind: "auth_failed", detail: KLARTEXT }, [KLARTEXT]),
    ).toBe(true);
    expect(traegtGeheimnis({ kind: "bad_key", detail: KEY_A }, [KEY_A])).toBe(
      true,
    );
  });
});

// ---------------------------------------------------------------------------
// (a) DIE FORM DER ZEICHENKETTE WIRD GEPINNT
// ---------------------------------------------------------------------------
describe("Die Form der Zeichenkette", () => {
  it("pinnt Zahl und Reihenfolge der Teile, das Trennzeichen und den Ort der Kennung", () => {
    // DIESER TEST BEWACHT NICHT, DASS DIE FORM RICHTIG IST — er bewacht, dass ihre
    // AENDERUNG SICHTBAR WIRD. Bauform wie der Schluesselnamen-Test in
    // capi/google-payload.test.ts.
    // DER GRUND IST DIE HALTBARKEIT DES CHIFFRATS: Ein Chiffrat, dessen Form sich
    // still aendert, ist nach dem naechsten Deploy unlesbar — der Wert in der Spalte
    // altert nicht mit dem Code (docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT
    // ALTERT NICHT MIT DEM DEPLOY"). Wird die Form geaendert, MUSS dieser Test fallen.
    const payload = chiffriere(KLARTEXT);
    const parts = payload.split(".");

    expect(parts).toHaveLength(5);
    expect(parts[0]).toBe("v1");
    expect(parts[1]).toBe("dev-1");
    for (const teil of parts.slice(2)) {
      expect(/^[A-Za-z0-9_-]+$/.test(teil)).toBe(true);
    }

    // Nonce und Etikett haben feste Laengen: 12 bzw. 16 Byte.
    expect(Buffer.from(parts[2], "base64url")).toHaveLength(12);
    expect(Buffer.from(parts[3], "base64url")).toHaveLength(16);
  });
});

// ---------------------------------------------------------------------------
// (b) EINE KENNUNG MIT DEM TRENNZEICHEN WIRD ABGEWIESEN
// ---------------------------------------------------------------------------
describe("Der Zeichenvorrat der Kennung", () => {
  it("weist eine Kennung mit dem TRENNZEICHEN ab — im Vorrat wie in der aktiven Kennung", () => {
    // OHNE DIESE PRUEFUNG BRAECHE DIE ZERLEGUNG, und zwar STILL: aus fuenf Teilen
    // wuerden sechs, und das Chiffrat waere nicht mehr lesbar. ROT, sobald der
    // Zeichenvorrat aufgeweicht oder die Pruefung entfernt wird.
    const payload = chiffriere(KLARTEXT);

    setEnv(`dev.1:${KEY_A}`, "dev.1");
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });
    expect(decryptSecret(payload)).toEqual({ kind: "bad_key" });

    // Vorrat in Ordnung, AKTIVE Kennung mit Trennzeichen -> nur das Chiffrieren faellt.
    setEnv(`dev-1:${KEY_A}`, "dev.1");
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });
    expect(decryptSecret(payload)).toEqual({ kind: "ok", value: KLARTEXT });
  });

  it("weist auch Grossbuchstaben und ueberlange Kennungen ab", () => {
    // ROT, wenn der Vorrat auf Gross-/Kleinschreibung ausgeweitet wird: Zwei
    // Kennungen, die sich nur darin unterscheiden, sind fuer einen Menschen dieselbe —
    // und genau daraus entstuende die Verwechslung, gegen die die Kennungs-Regel
    // geschrieben ist.
    setEnv(`DEV-1:${KEY_A}`, "DEV-1");
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });

    setEnv(`${"d".repeat(33)}:${KEY_A}`, "d".repeat(33));
    expect(encryptSecret(KLARTEXT)).toEqual({ kind: "bad_key" });
  });
});
