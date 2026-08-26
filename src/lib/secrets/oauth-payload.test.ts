import { describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest) -> hier durch ein leeres Modul ersetzen, damit oauth-payload.ts UND
// cipher.ts laden. Bauform und Begruendung wie in cipher.test.ts.
//
// ER GILT HIER ZWEIMAL, UND DAS IST KEINE DOPPELUNG: Der PRUEFLING ist server-only
// (die Klasse ist eine Untergrenze, s. Kopf von oauth-payload.ts), UND der MASSSTAB
// des Kopplungstests, cipher.ts, ist es ebenfalls. Wer den Mock spaeter entfernt,
// weil "die Form doch nur Zeichenketten sieht", bricht auch den Kopplungstest.
vi.mock("server-only", () => ({}));

import { readFileSync } from "node:fs";
import { join } from "node:path";

import { decryptSecret, encryptSecret } from "./cipher";
import {
  formatOAuthPayload,
  parseOAuthPayload,
  type OAuthPayload,
} from "./oauth-payload";

// ===========================================================================
// KEIN ECHTES GEHEIMNIS. Jeder Wert unten ist erfunden und am NAMEN erkennbar.
// Wo eine LAENGE gemeint ist, wird die Laenge nachgebildet und nicht ein echter
// Wert genommen — ein formbasierter Pruefling sieht echt und erfunden als dieselbe
// Eingabe, der echte Wert misst denselben Pfad nur mit Schadenspotenzial.
// (docs/immer-beachten.md, "SCHWAERZUNG", Teil (d).)
// ===========================================================================

const ERFUNDENES_ZUGANGSDATUM = "erfundenes-zugangsdatum-nicht-echt-0001";
const ERFUNDENES_ERNEUERUNGS_TOKEN = "erfundenes-erneuerungs-token-nicht-echt-0001";

function nutzlast(ueberschreibungen: Partial<OAuthPayload> = {}): OAuthPayload {
  return {
    accessToken: ERFUNDENES_ZUGANGSDATUM,
    accessTokenExpiresAt: 1_756_200_000,
    refreshToken: ERFUNDENES_ERNEUERUNGS_TOKEN,
    refreshTokenExpiresAt: { kind: "at", epochSeconds: 1_787_736_000 },
    ...ueberschreibungen,
  };
}

/** Schreibt und erwartet Erfolg. Scheitert der Schritt, ist der Test dort zu Ende. */
function geschrieben(payload: OAuthPayload): string {
  const result = formatOAuthPayload(payload);
  expect(result.kind).toBe("ok");
  if (result.kind !== "ok") throw new Error("unerreichbar");
  return result.value;
}

describe("formatOAuthPayload / parseOAuthPayload — Rundlauf", () => {
  // ROT, wenn ein Feld beim Schreiben oder Lesen verlorengeht, vertauscht wird oder
  // seinen Typ aendert.
  it("T1 — traegt alle vier Felder unveraendert durch den Rundlauf", () => {
    const vorher = nutzlast();
    const gelesen = parseOAuthPayload(geschrieben(vorher));

    expect(gelesen).toEqual({ kind: "ok", value: vorher });
  });

  // ROT, wenn der benannte Zustand "unbekannt" mit einem echten Zeitpunkt oder mit
  // "Feld fehlt" zusammenfaellt.
  it("T2 — haelt den Zustand 'unbekannt' des Erneuerungs-Ablaufs", () => {
    const vorher = nutzlast({ refreshTokenExpiresAt: { kind: "unknown" } });
    const gelesen = parseOAuthPayload(geschrieben(vorher));

    expect(gelesen).toEqual({ kind: "ok", value: vorher });
    if (gelesen.kind !== "ok") return;
    expect(gelesen.value.refreshTokenExpiresAt.kind).toBe("unknown");
    expect(gelesen.value.refreshTokenExpiresAt).not.toHaveProperty("epochSeconds");
  });

  // ROT, wenn die Form das Trennzeichen im WERT nicht neutralisiert. Dann wuerden aus
  // fuenf Teilen sechs — und zwar STILL, weil die Zerlegung einfach mehr Teile faende.
  //
  // DIESER TEST IST DER EINZIGE REINE WAECHTER DIESER KLASSE. T3b traegt denselben
  // Fall, laeuft aber durch die Chiffrier-Datei; braeche die, fiele T3b aus dem
  // FALSCHEN Grund. Wer diesen Test hier als redundant streicht, nimmt die einzige
  // Abdeckung mit, die die Klasse ISOLIERT prueft.
  it("T6 — ein Feldwert mit dem Trennzeichen ueberlebt den Rundlauf", () => {
    const vorher = nutzlast({
      accessToken: "erfunden.mit.punkten.0001",
      refreshToken: "erfunden.p1.sieht.aus.wie.eine.Form",
    });
    const geschriebeneForm = geschrieben(vorher);

    expect(geschriebeneForm.split(".")).toHaveLength(5);
    expect(parseOAuthPayload(geschriebeneForm)).toEqual({ kind: "ok", value: vorher });
  });

  // ROT, wenn Nicht-ASCII die Kodierung nicht ueberlebt.
  it("T7 — ein Feldwert mit Nicht-ASCII ueberlebt den Rundlauf", () => {
    const vorher = nutzlast({ accessToken: "erfunden-äöüß-中文-🔑-0001" });

    expect(parseOAuthPayload(geschrieben(vorher))).toEqual({ kind: "ok", value: vorher });
  });

  // POSITIVKONTROLLE zu T2. Ohne sie waere "unbekannt" auch dann gruen, wenn die Form
  // JEDEN Erneuerungs-Ablauf auf "unbekannt" abbildete.
  it("T2b — POSITIVKONTROLLE: ein echter Zeitpunkt kommt NICHT als 'unbekannt' zurueck", () => {
    const gelesen = parseOAuthPayload(
      geschrieben(nutzlast({ refreshTokenExpiresAt: { kind: "at", epochSeconds: 42 } })),
    );

    expect(gelesen.kind).toBe("ok");
    if (gelesen.kind !== "ok") return;
    expect(gelesen.value.refreshTokenExpiresAt).toEqual({ kind: "at", epochSeconds: 42 });
  });
});

describe("Auflage (3) des Zuschnitts — die Zeichenkette passt durch die Chiffrier-Datei", () => {
  // ===========================================================================
  // WAS DIESER TEST BEWACHT — UND WAS NICHT. Der zweite Satz ist der wichtigere:
  //
  //   ER BEWACHT: dass die von formatOAuthPayload erzeugte Zeichenkette ein
  //   GUELTIGER KLARTEXT fuer encryptSecret ist und den Rundlauf durch
  //   encrypt -> decrypt -> parse unveraendert uebersteht. Der Zeichenvorrat der
  //   AUSGABE von cipher.ts ist dort geregelt, der der EINGABE nicht — diese Luecke
  //   schliesst dieser Test und sonst nichts.
  //
  //   ER BEWACHT NICHT, DASS DIE ZWEI DATEIEN ZUSAMMENGEHOEREN. Es gibt KEINE
  //   Kopplung zwischen ihnen, und es darf keine geben: oauth-payload.ts importiert
  //   cipher.ts nicht, und cipher.ts importiert oauth-payload.ts nicht (Auflage (1)
  //   des Zuschnitts). DIESE TESTDATEI IST DIE EINZIGE STELLE IM REPO, AN DER SICH
  //   die beiden beruehren duerfen.
  //
  //   OHNE DIESEN SATZ liest die naechste Runde den Test als Beleg fuer eine
  //   Kopplung, die es nicht gibt — und baut den Import in den Produktivcode.
  // ===========================================================================

  const SCHLUESSEL_KENNUNG = "testkennung";
  // 32 Nullbytes als base64 — ein SCHLUESSEL-FOERMIGER Wert ohne jeden Geheimwert.
  const ERFUNDENES_SCHLUESSELMATERIAL = Buffer.alloc(32).toString("base64");

  function mitSchluessel<T>(lauf: () => T): T {
    const vorherKeys = process.env.SECRET_ENC_KEYS;
    const vorherActive = process.env.SECRET_ENC_ACTIVE_KEY_ID;
    process.env.SECRET_ENC_KEYS = `${SCHLUESSEL_KENNUNG}:${ERFUNDENES_SCHLUESSELMATERIAL}`;
    process.env.SECRET_ENC_ACTIVE_KEY_ID = SCHLUESSEL_KENNUNG;
    try {
      return lauf();
    } finally {
      if (vorherKeys === undefined) delete process.env.SECRET_ENC_KEYS;
      else process.env.SECRET_ENC_KEYS = vorherKeys;
      if (vorherActive === undefined) delete process.env.SECRET_ENC_ACTIVE_KEY_ID;
      else process.env.SECRET_ENC_ACTIVE_KEY_ID = vorherActive;
    }
  }

  // ROT, wenn die erzeugte Zeichenkette kein gueltiger Klartext ist oder den Rundlauf
  // durch das Verfahren nicht unveraendert uebersteht.
  it("T3 — Form -> encryptSecret -> decryptSecret -> Form ergibt dieselbe Nutzlast", () => {
    mitSchluessel(() => {
      const vorher = nutzlast();
      const klartext = geschrieben(vorher);

      const chiffriert = encryptSecret(klartext);
      expect(chiffriert.kind).toBe("ok");
      if (chiffriert.kind !== "ok") return;

      const dechiffriert = decryptSecret(chiffriert.value);
      expect(dechiffriert.kind).toBe("ok");
      if (dechiffriert.kind !== "ok") return;

      expect(dechiffriert.value).toBe(klartext);
      expect(parseOAuthPayload(dechiffriert.value)).toEqual({ kind: "ok", value: vorher });
    });
  });

  // ROT, wenn die Form bei Nicht-ASCII oder Trennzeichen im Wert etwas erzeugt, das
  // den Rundlauf nicht uebersteht. Der harte Fall in EINEM Durchgang.
  it("T3b — derselbe Rundlauf mit Trennzeichen und Nicht-ASCII in den Werten", () => {
    mitSchluessel(() => {
      const vorher = nutzlast({
        accessToken: "erfunden.mit.punkten-und-Umlauten-äöüß-中文",
        refreshToken: "erfunden.p1.p1.p1-sieht-aus-wie-eine-Form",
      });
      const klartext = geschrieben(vorher);

      const chiffriert = encryptSecret(klartext);
      if (chiffriert.kind !== "ok") throw new Error("Vorbedingung nicht erfuellt");
      const dechiffriert = decryptSecret(chiffriert.value);
      if (dechiffriert.kind !== "ok") throw new Error("Vorbedingung nicht erfuellt");

      expect(parseOAuthPayload(dechiffriert.value)).toEqual({ kind: "ok", value: vorher });
    });
  });
});

describe("Der Waechter auf den Import-Graphen — Auflage (1)", () => {
  const QUELLE = readFileSync(join(__dirname, "oauth-payload.ts"), "utf8");
  const CIPHER_QUELLE = readFileSync(join(__dirname, "cipher.ts"), "utf8");

  /**
   * NUR DIE CODE-ZEILEN, ohne reine Kommentarzeilen.
   *
   * WARUM DAS NOETIG IST, und es ist beim Bauen aufgefallen und nicht vorhergesehen:
   * Der Kopf von oauth-payload.ts NENNT encryptSecret — er muss es, weil Auflage (3)
   * ohne den Namen nicht erklaerbar ist. Ein Waechter ueber den ROHTEXT haette diesen
   * Kommentar getroffen und damit eine Prosa-Erwaehnung wie einen Import behandelt.
   * AUFLAGE (1) IST EINE AUSSAGE UEBER DEN IMPORT-GRAPHEN, nicht ueber das Vokabular.
   *
   * DIE GRENZE DIESER FILTERUNG GEHOERT DAZU: Sie entfernt nur Zeilen, die GANZ
   * Kommentar sind. Ein Symbolname in einem angehaengten Kommentar hinter Code wuerde
   * weiterhin treffen — der Waechter irrt also in die STRENGE Richtung, und das ist
   * bei einer Trennungs-Auflage die richtige.
   */
  function nurCode(quelle: string): string {
    return quelle
      .split("\n")
      .filter((zeile) => {
        const t = zeile.trim();
        return !(t.startsWith("//") || t.startsWith("*") || t.startsWith("/*"));
      })
      .join("\n");
  }

  const QUELLE_CODE = nurCode(QUELLE);
  const CIPHER_CODE = nurCode(CIPHER_QUELLE);

  // ROT, wenn jemand cipher.ts im PRODUKTIVCODE importiert.
  //
  // DIESER TEST IST NOETIG, WEIL T3 IHN NICHT ERSETZT: T3 beweist, dass die Kopplung
  // FUNKTIONIERT, wenn man sie herstellt. Auflage (1) ist aber eine Aussage ueber den
  // IMPORT-GRAPHEN, und die prueft kein Rundlauf. Ein Kommentar bewacht sie nicht —
  // nur ein Test tut das.
  it("T12 — oauth-payload.ts importiert cipher.ts NICHT", () => {
    expect(QUELLE_CODE).not.toMatch(/from\s+["'][^"']*cipher["']/);
    expect(QUELLE_CODE).not.toMatch(/require\(["'][^"']*cipher["']\)/);
    expect(QUELLE_CODE).not.toMatch(/encryptSecret|decryptSecret/);
  });

  // ROT, wenn jemand die Richtung umdreht.
  it("T13 — cipher.ts importiert oauth-payload.ts NICHT", () => {
    expect(CIPHER_CODE).not.toMatch(/from\s+["'][^"']*oauth-payload["']/);
    expect(CIPHER_CODE).not.toMatch(/require\(["'][^"']*oauth-payload["']\)/);
    expect(CIPHER_CODE).not.toMatch(/formatOAuthPayload|parseOAuthPayload/);
  });

  // POSITIVKONTROLLE zu T12/T13 — PFLICHT, weil beide eine ABWESENHEIT behaupten.
  // Ohne sie waeren ein echter Nicht-Treffer und ein kaputter Waechter (falscher
  // Pfad, leere Datei, verrutschter Ausdruck) am Ergebnis nicht zu unterscheiden.
  it("T12b — POSITIVKONTROLLE: die Waechter lesen wirklich die gemeinten Dateien", () => {
    expect(QUELLE_CODE.length).toBeGreaterThan(1000);
    expect(QUELLE_CODE).toContain("formatOAuthPayload");
    expect(CIPHER_CODE.length).toBeGreaterThan(1000);
    expect(CIPHER_CODE).toContain("encryptSecret");
    // Und der Ausdruck selbst trifft, wenn der Name DOCH im Code stuende:
    expect(nurCode('import { encryptSecret } from "./cipher";')).toMatch(
      /from\s+["'][^"']*cipher["']/,
    );
    // GEGENPROBE ZUR FILTERUNG: eine reine Kommentarzeile wird entfernt, eine
    // Code-Zeile nicht. Ohne diese zwei Zeilen koennte nurCode alles wegwerfen und
    // T12/T13 waeren trivial gruen.
    expect(nurCode('// import { encryptSecret } from "./cipher";').trim()).toBe("");
    expect(nurCode("const a = 1;").trim()).toBe("const a = 1;");
  });

  // ROT, wenn die Datei ihre Ladeklasse verliert. Sie ist eine ENTSCHEIDUNG
  // (Untergrenzen-Argument im Kopf), kein Zufall — und ein Entfernen faellt sonst
  // durch kein Gate.
  it("T14 — oauth-payload.ts traegt import \"server-only\"", () => {
    expect(QUELLE.startsWith('import "server-only";')).toBe(true);
  });
});

describe("Die Ablehnung unbekannter Felder — die Auflage, an der die Owner-Entscheidung haengt", () => {
  // ROT, wenn ein Feld ausserhalb des festen Satzes still mitgeschrieben oder still
  // verworfen wird, statt die Nutzlast abzuweisen.
  it("T15 — ein unbekanntes Feld wird mit seinem Namen abgewiesen", () => {
    const mitFremdfeld = { ...nutzlast(), tokenType: "Bearer" } as OAuthPayload;

    expect(formatOAuthPayload(mitFremdfeld)).toEqual({
      kind: "bad_field",
      field: "tokenType",
    });
  });

  // POSITIVKONTROLLE zu T15: derselbe Aufbau OHNE das Fremdfeld muss durchgehen.
  // Ohne sie waere T15 auch dann gruen, wenn die Funktion JEDE Nutzlast abwiese.
  it("T15b — POSITIVKONTROLLE: dieselbe Nutzlast ohne das Fremdfeld geht durch", () => {
    expect(formatOAuthPayload(nutzlast()).kind).toBe("ok");
  });

  // ROT, wenn die Pruefung nur den ERSTEN Schluessel ansieht oder bei mehreren
  // Fremdfeldern durchfaellt.
  it("T15c — auch ein Fremdfeld HINTER den bekannten wird gefunden", () => {
    const mitFremdfeld = {
      accessToken: ERFUNDENES_ZUGANGSDATUM,
      accessTokenExpiresAt: 1_756_200_000,
      refreshToken: ERFUNDENES_ERNEUERUNGS_TOKEN,
      refreshTokenExpiresAt: { kind: "unknown" },
      scope: "https://example.invalid/auth/erfunden",
    } as OAuthPayload;

    expect(formatOAuthPayload(mitFremdfeld)).toEqual({
      kind: "bad_field",
      field: "scope",
    });
  });
});

describe("Fehlerfaelle beim Schreiben", () => {
  // ROT, wenn ein leeres Pflichtfeld als gueltig durchginge.
  it("T5 — ein leeres Zugangsdatum wird abgewiesen", () => {
    expect(formatOAuthPayload(nutzlast({ accessToken: "" }))).toEqual({
      kind: "bad_field",
      field: "accessToken",
    });
  });

  it("T5b — ein leeres Erneuerungs-Token wird abgewiesen", () => {
    expect(formatOAuthPayload(nutzlast({ refreshToken: "" }))).toEqual({
      kind: "bad_field",
      field: "refreshToken",
    });
  });

  // ROT, wenn ein unbrauchbarer Zeitpunkt (nicht ganz, negativ, nicht endlich)
  // durchginge — jeder davon erzeugte eine Zeichenkette, die beim Lesen scheitert.
  it.each([
    ["gebrochen", 1.5],
    ["negativ", -1],
    ["nicht endlich", Number.NaN],
    ["unendlich", Number.POSITIVE_INFINITY],
  ])("T5c — ein %s Ablauf wird abgewiesen", (_name, wert) => {
    expect(formatOAuthPayload(nutzlast({ accessTokenExpiresAt: wert }))).toEqual({
      kind: "bad_field",
      field: "accessTokenExpiresAt",
    });
  });

  // ROT, wenn der Erneuerungs-Ablauf mit unbekannter Art durchginge.
  it("T5d — ein Erneuerungs-Ablauf unbekannter Art wird abgewiesen", () => {
    const kaputt = nutzlast({
      refreshTokenExpiresAt: { kind: "irgendwas" } as unknown as OAuthPayload["refreshTokenExpiresAt"],
    });

    expect(formatOAuthPayload(kaputt)).toEqual({
      kind: "bad_field",
      field: "refreshTokenExpiresAt",
    });
  });

  // ROT, wenn ein Wert in der Groessenordnung eines echten Zugangsdatums an einer
  // eingebauten Laengenannahme scheiterte. NICHT der Inhalt ist nachgebildet, nur
  // die LAENGE.
  it("T8 — ein Wert in OAuth-Groessenordnung geht durch und kommt zurueck", () => {
    const langesErfundenes = `erfunden-${"x".repeat(2048)}`;
    const vorher = nutzlast({ accessToken: langesErfundenes });

    expect(parseOAuthPayload(geschrieben(vorher))).toEqual({ kind: "ok", value: vorher });
  });
});

describe("Fehlerfaelle beim Lesen", () => {
  // ROT, wenn eine falsche Teilezahl still durchginge — aus vier Teilen wuerden dann
  // Felder geraten.
  it.each([
    ["leer", ""],
    ["ein Teil", "p1"],
    ["zu wenige Teile", "p1.aaa.bbb.ccc"],
  ])("T4 — %s ergibt bad_format", (_name, eingabe) => {
    expect(parseOAuthPayload(eingabe)).toEqual({ kind: "bad_format" });
  });

  // ROT, wenn ein ANGEHAENGTER sechster Teil still ignoriert wird.
  //
  // DER EINGABEWERT IST HIER BEWUSST EIN GUELTIGER FUENFTEILER PLUS EINEM — und das
  // ist beim Mutieren aufgefallen und nicht vorhergesehen: Die erste Fassung dieses
  // Falles hing "eee" an vier Muell-Teile an. Der Test war gruen, aber AUS DEM
  // FALSCHEN GRUND — er scheiterte am unbrauchbaren Ablauf im dritten Teil, nicht an
  // der Teilezahl. Unter der Mutation "Teilezahl-Pruefung entfernt" blieb er deshalb
  // als einziger der vier stehen. Repariert ist die WURZEL (der Eingabewert), nicht
  // die Zusicherung.
  it("T4b — ein gueltiger Fuenfteiler mit einem SECHSTEN Teil ergibt bad_format", () => {
    const gueltig = geschrieben(nutzlast());
    expect(gueltig.split(".")).toHaveLength(5);

    expect(parseOAuthPayload(`${gueltig}.angehaengt`)).toEqual({ kind: "bad_format" });
  });

  // ROT, wenn ein unzulaessiger Zeichenvorrat still dekodiert wuerde. Buffer.from
  // ueberspringt ungueltige Zeichen — ohne die Vorpruefung machte es aus Muell einen
  // Wert.
  it("T9 — ein unzulaessiger Zeichenvorrat ergibt bad_format", () => {
    const gueltig = geschrieben(nutzlast());
    const teile = gueltig.split(".");
    teile[1] = "nicht+base64/url=";

    expect(parseOAuthPayload(teile.join("."))).toEqual({ kind: "bad_format" });
  });

  // ROT, wenn ein leeres Pflichtfeld beim Lesen durchginge.
  it("T9b — ein leeres Zugangsdatum in der Zeichenkette ergibt bad_format", () => {
    const teile = geschrieben(nutzlast()).split(".");
    teile[1] = "";

    expect(parseOAuthPayload(teile.join("."))).toEqual({ kind: "bad_format" });
  });

  // ROT, wenn ein nicht-numerischer Ablauf durchginge und spaeter als NaN weiterliefe.
  it("T9c — ein nicht-numerischer Ablauf ergibt bad_format", () => {
    const teile = geschrieben(nutzlast()).split(".");
    teile[2] = Buffer.from("morgen frueh", "utf8").toString("base64url");

    expect(parseOAuthPayload(teile.join("."))).toEqual({ kind: "bad_format" });
  });

  // ROT, wenn unknown_version mit bad_format zusammenfaellt. DAS IST DIE ZWEITE
  // FASSUNGS-ACHSE: die Teilezahl stimmt, die Bedeutung der Teile ist eine andere.
  it("T10 — eine unbekannte Fassung ergibt unknown_version, NICHT bad_format", () => {
    const teile = geschrieben(nutzlast()).split(".");
    teile[0] = "p2";

    expect(parseOAuthPayload(teile.join("."))).toEqual({ kind: "unknown_version" });
  });

  // POSITIVKONTROLLE zu T10: dieselbe Zeichenkette mit der BEKANNTEN Fassung geht
  // durch. Ohne sie waere T10 auch dann gruen, wenn JEDE Fassung unbekannt hiesse.
  it("T10b — POSITIVKONTROLLE: dieselbe Zeichenkette mit 'p1' wird gelesen", () => {
    expect(parseOAuthPayload(geschrieben(nutzlast())).kind).toBe("ok");
  });

  // ROT, wenn die Fassungspruefung NACH dem Zerlegen kaeme — dann meldete eine
  // fremde Fassung mit unbrauchbaren Teilen bad_format statt unknown_version.
  it("T10c — eine unbekannte Fassung schlaegt bad_format, auch bei Muell dahinter", () => {
    expect(parseOAuthPayload("p2.@@@.@@@.@@@.@@@")).toEqual({ kind: "unknown_version" });
  });
});

describe("WIRFT NIE — beide Richtungen", () => {
  // Zwei Zeichen, im Code gebaut statt hingeschrieben - s. den Kommentar in der
  // Liste darunter.
  const LEERZEICHEN = String.fromCharCode(32);
  const NUL = String.fromCharCode(0);

  const bosartigeEingaben = [
    "",
    ".",
    "....",
    "p1....",
    "p1.aaa.bbb.ccc.ddd.eee.fff",
    // KEINE ESCAPE-SEQUENZ UND KEIN LITERALES SONDERZEICHEN IN DIESER LISTE.
    // GRUND, beim Bauen ZWEIMAL gemessen (Scheibe 11.8c, 2026-08-26): Auf diesem
    // Schreibweg ueberlebt WEDER das literale Sonderzeichen NOCH seine Escape-Form.
    // Erster Versuch: aus Leerzeichen wurden NUL-BYTES. Zweiter Versuch: die
    // Escape-Form wurde INTERPRETIERT und setzte die Zeichen wieder ein. Beide Male
    // blieben alle vier Gates gruen; sichtbar wurde es allein bei der Byte-Kontrolle
    // (dieselbe Klasse wie Hebungs-Kandidat 1 aus Scheibe 11.8a).
    // DIE LOESUNG IST, DAS ZEICHEN IM CODE ZU BAUEN statt es hinzuschreiben:
    // String.fromCharCode ist reines ASCII und hat nichts, was ein Werkzeug
    // umdeuten koennte.
    LEERZEICHEN,
    `p1.${LEERZEICHEN}.${LEERZEICHEN}.${LEERZEICHEN}`,
    // Das NUL-Byte als AUSDRUECKLICHER Fall statt als Unfall: eine text-Spalte
    // vertraegt es nicht, und der Leser darf daran nicht werfen.
    `p1.${NUL}.${NUL}.${NUL}.${NUL}`,
    "p2",
    "nicht einmal ansatzweise eine Form",
  ];

  // ROT, wenn irgendein Lesepfad wirft. Ein Wurf braeche spaeter am Ingest die
  // zugesicherte leere 204.
  it.each(bosartigeEingaben)("T11 — parseOAuthPayload wirft nicht bei %j", (eingabe) => {
    expect(() => parseOAuthPayload(eingabe)).not.toThrow();
  });

  // ROT, wenn ein Schreibpfad wirft. Die Eingaben umgehen das Typsystem bewusst —
  // genau so kaeme ein Wert aus JSON oder ueber einen Cast herein.
  it("T11b — formatOAuthPayload wirft nicht bei typwidrigen Eingaben", () => {
    const eingaben: unknown[] = [
      null,
      undefined,
      42,
      "eine Zeichenkette",
      {},
      { accessToken: 1, accessTokenExpiresAt: "x", refreshToken: null, refreshTokenExpiresAt: 0 },
      { ...nutzlast(), refreshTokenExpiresAt: null },
    ];

    for (const eingabe of eingaben) {
      expect(() => formatOAuthPayload(eingabe as OAuthPayload)).not.toThrow();
      expect(formatOAuthPayload(eingabe as OAuthPayload).kind).toBe("bad_field");
    }
  });
});
