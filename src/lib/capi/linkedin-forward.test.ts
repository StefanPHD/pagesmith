import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { forwardToLinkedin } from "./linkedin-forward";

// ===========================================================================
// DER ADAPTER FUER DAS VIERTE ZIEL (Scheibe 11.1f).
//
// DIE GRENZE, DIE VOR ALLEN TESTS STEHT — und sie ist bei diesem Ziel schaerfer als
// bei den drei davor: `fetch` ist gestellt. Diese Datei prueft, WELCHE NUTZLAST
// entsteht und WANN gar keine entsteht — sie prueft NICHT, ob der Anbieter sie
// annimmt. Das ist hier mehr als eine Formalie: An UNSERER Seite zeigt ein angenommener
// Forward seit S10a (Phase 11.7) genau EINE Info-Zeile mit Ziel und HTTP-Status — NICHT
// die Nutzlast; events traegt keine Ziel-Dimension, und es gibt keinen Rueckgabewert.
// Der Beweis, dass die RICHTIGE Nutzlast entsteht, liegt deshalb HIER und nur hier.
//
// DIE ANGABEN UEBER DEN ANBIETER SIND GEMESSEN (docs/ziel-befunde.md, Teile (n) bis
// (s), neun Laeufe am 2026-08-19) — anders als beim zweiten Adapter, dessen
// Testdatei-Kopf eine Transkription von Doku einraeumen muss. Die Adresse des
// Endpunkts steht als Befund in docs/ziel-befunde/linkedin.md, Teil (ab), ist live
// angekommen (Teil (ai)) und wird von V4 in version-deadlines.test.ts bewacht. Das
// "Bearer"-Praefix der Autorisierungs-Kopfzeile steht in Teil (ai); dass der Adapter
// es SENDET, prueft T1-c.
// ===========================================================================

const TOKEN = "AQV_LANGES_GEHEIMNIS_ABCDEFGH1234";
const URN = "urn:lla:llaPartnerConversion:987654";
const IP = "203.0.113.7";

function config(rules: Record<string, string> = { Purchase: URN }) {
  return { token: TOKEN, conversionRules: rules };
}

function response(status: number, body?: unknown): Response {
  if (body === undefined) return new Response(null, { status });
  return new Response(JSON.stringify(body), { status });
}

function fetchCalls() {
  return (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls as [
    string,
    { headers: Record<string, string>; body: string },
  ][];
}

/** Die gesendete Nutzlast des ersten Aufrufs, geparst. */
function sentPayload(): Record<string, unknown> {
  return JSON.parse(fetchCalls()[0][1].body) as Record<string, unknown>;
}

function logLines(): string[] {
  return (console.error as unknown as ReturnType<typeof vi.fn>).mock.calls.map(
    (c) => String(c[0]),
  );
}

/** Alle Zeilen, die in console.info gelandet sind (die Erfolgszeile, S10a). */
function infoLines(): string[] {
  return (console.info as unknown as ReturnType<typeof vi.fn>).mock.calls.map(
    (c) => String(c[0]),
  );
}

beforeEach(() => {
  // 201 mit LEEREM Rumpf — die gemessene Erfolgsantwort (Teil (d)/(n)).
  global.fetch = vi.fn(async () => response(201)) as unknown as typeof fetch;
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  // DER STRUKTURELLE RIEGEL GEGEN DIE ONCE-KASKADE STEHT IM beforeEach: global.fetch
  // wird bei JEDEM Test neu zugewiesen, eine unverbrauchte Warteschlange stirbt mit
  // der alten Attrappe. Dieselbe Lektion und derselbe Grund wie beim zweiten Adapter.
  vi.restoreAllMocks();
  vi.useRealTimers();
});

// =====================================================================
// T1 — DIE NUTZLAST
// =====================================================================
describe("T1 — die Nutzlast traegt die gemessenen Felder", () => {
  it("T1-a: Pflichtfelder, Millisekunden, Kennungs-Paar, eventId", async () => {
    // WIRD ROT, WENN: ein Pflichtfeld fehlt oder umbenannt wird, das Kennungs-Paar
    // seine Form verliert — oder der Zeitstempel in SEKUNDEN gesendet wird (das ist
    // die Pflicht-Mutation M-a dieser Scheibe).
    // DIE ZEIT IST FESTGENAGELT: ohne das waere die Millisekunden-Zusicherung eine
    // Groessenordnungs-Schaetzung statt eines Vergleichs.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-08-19T10:00:00.000Z"));
    const expected = new Date("2026-08-19T10:00:00.000Z").getTime();

    await forwardToLinkedin(config(), "Purchase", "evt-1", {}, IP);

    expect(fetchCalls()).toHaveLength(1);
    expect(sentPayload()).toEqual({
      conversion: URN,
      conversionHappenedAt: expected,
      eventId: "evt-1",
      user: { userIds: [{ idType: "PLAINTEXT_IP_ADDRESS", idValue: IP }] },
    });
  });

  it("T1-b: die URN kommt aus dem Eintrag DIESES Ereignisses, nicht aus irgendeinem", async () => {
    // WIRD ROT, WENN: der Nachschlag den ersten Eintrag nimmt, statt ueber den
    // Ereignisnamen zu gehen. Genau diese Verwechslung waere am Draht unsichtbar —
    // beide Werte sind formgleiche URNs.
    const rules = { Lead: "urn:lla:llaPartnerConversion:111", Purchase: URN };

    await forwardToLinkedin(config(rules), "Purchase", "evt-2", {}, IP);

    expect(sentPayload().conversion).toBe(URN);
  });

  it("T1-c: Versions-Header und Autorisierung stehen in den Kopfzeilen", async () => {
    // WIRD ROT, WENN: der Versions-Header fehlt. Er ist PFLICHT (GEMESSEN, Teil (r)):
    // ohne ihn antwortet das Gateway mit 400 und einer Rumpfform, die kein Mapping
    // kennt — ein Fehler, den dieser Test verhindert, bevor er live auftreten kann.
    // DER WERT WIRD HIER BEWUSST NICHT GEPRUEFT, nur die ANWESENHEIT: Den Wert prueft
    // allein V4 in version-deadlines.test.ts gegen die dortige Tabelle, die einzige
    // Erwartung an Version und Abschalttermin. Ein zweites Literal hier waere eine
    // zweite Stelle, die jede Anhebung nachziehen muss, ohne etwas zu fangen, was V4
    // nicht faengt.
    await forwardToLinkedin(config(), "Purchase", "evt-3", {}, IP);

    const headers = fetchCalls()[0][1].headers;
    expect(typeof headers["LinkedIn-Version"]).toBe("string");
    expect(headers["LinkedIn-Version"].trim()).not.toBe("");
    expect(headers.Authorization).toBe(`Bearer ${TOKEN}`);
    expect(headers["Content-Type"]).toBe("application/json");
  });
});

// =====================================================================
// T2 — DIE DREI RIEGEL
// =====================================================================
describe("T2 — die drei Riegel: kein Aufruf, eine unterscheidbare Logzeile", () => {
  it("T2-a: keine Identitaet", async () => {
    await forwardToLinkedin(config(), "Purchase", "evt-4", {}, undefined);

    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: missing identity",
    ]);
  });

  it("T2-b: keine IPv4-Adresse", async () => {
    // DER FALL, UM DEN ES GEHT: Die Schnittstelle prueft die Form NICHT (GEMESSEN,
    // Teil (j)) — ohne diesen Riegel ginge eine IPv6-Adresse als Erfolg hinaus und
    // liefe ins Leere. Diese Stelle ist die einzige, an der sie auffaellt.
    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-5",
      {},
      "2001:db8::1",
    );

    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: identity is not IPv4",
    ]);
  });

  it("T2-c: eine Zahlengruppe ueber 255 ist keine IPv4-Adresse", async () => {
    // WIRD ROT, WENN: die Pruefung nur auf vier Punkt-getrennte Gruppen sieht. Genau
    // dieser Wert ("999.999.999.999") wurde vom Anbieter mit 201 quittiert und
    // MITGEZAEHLT (GEMESSEN, Teil (j)) — er ist der Beleg dafuer, dass die Pruefung
    // bei uns liegen muss.
    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-6",
      {},
      "999.999.999.999",
    );

    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()[0]).toContain("identity is not IPv4");
  });

  it("T2-d: kein Eintrag fuer dieses Ereignis", async () => {
    await forwardToLinkedin(config(), "Lead", "evt-7", {}, IP);

    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: no conversion rule for event",
    ]);
  });

  it("T2-e: ein NICHT-Zeichenketten-Eintrag ist ebenfalls kein Eintrag", async () => {
    // DIESER TEST IST EIN EINZELSTUECK UND FAENGT EINE FEHLERKLASSE ALLEIN: Der
    // Resolver nimmt ein Ziel auf, sobald IRGENDEIN Wert der Zuordnung eine
    // nicht-leere Zeichenkette ist (hasConversionRules, lib/settings.ts) — ueber den
    // Wert FUER DIESES Ereignis sagt er nichts. Ein Riegel, der nur auf undefined
    // pruefte, liesse eine Zahl aus dem Blob bis zum Trim durch, und der Trim WIRFT.
    // Ein Wurf hier braeche die garantierte leere 204.
    const rules = { Purchase: 42 } as unknown as Record<string, string>;

    await forwardToLinkedin(config(rules), "Purchase", "evt-8", {}, IP);

    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()[0]).toContain("no conversion rule for event");
  });

  it("T2-f: KEINE Logzeile traegt einen Wert aus der Konfiguration", async () => {
    // DIE AUFLAGE AUS DEM ZUSCHNITT, als Test statt als Kommentar: Die Zeilen
    // schreiben feste Zeichenketten. WIRD ROT, WENN: jemand die URN, die IP oder das
    // Zugangsdatum "zur besseren Diagnose" anhaengt.
    // MIT EINEM ERFUNDENEN GEHEIMNIS GEFAHREN, nie mit einem echten — ein
    // formbasierter Schutz sieht beide als dieselbe Eingabe.
    await forwardToLinkedin(config(), "Lead", "evt-9", {}, IP);
    await forwardToLinkedin(config(), "Purchase", "evt-10", {}, "2001:db8::1");
    await forwardToLinkedin(config(), "Purchase", "evt-11", {}, undefined);

    const joined = logLines().join("\n");
    expect(joined).not.toContain(TOKEN);
    expect(joined).not.toContain(URN);
    expect(joined).not.toContain(IP);
  });
});

// =====================================================================
// T3 — DER BETRAGS-RIEGEL
// =====================================================================
describe("T3 — der Betrags-Riegel entscheidet ueber conversionValue", () => {
  async function send(body: Record<string, unknown>) {
    await forwardToLinkedin(config(), "Purchase", "evt-v", body, IP);
    return sentPayload().conversionValue as
      | { currencyCode: string; amount: string }
      | undefined;
  }

  it("T3-a: eine endliche Zahl wird als ZEICHENKETTE gesendet", async () => {
    // GEMESSEN (Teil (o)): derselbe Betrag als number ergibt 422. Die Zeichenkette
    // ist keine Stilfrage, sondern die einzige Form, die angenommen wird.
    expect(await send({ value: 19.9, currency: "EUR" })).toEqual({
      currencyCode: "EUR",
      amount: "19.9",
    });
  });

  it("T3-b: eine Zeichenkette mit Punkt reist unveraendert", async () => {
    expect(await send({ value: "19.90", currency: "EUR" })).toEqual({
      currencyCode: "EUR",
      amount: "19.90",
    });
  });

  it("T3-c: GENAU EIN Komma wird zum Punkt", async () => {
    expect(await send({ value: "19,90", currency: "EUR" })).toEqual({
      currencyCode: "EUR",
      amount: "19.90",
    });
  });

  it("T3-d: MEHRERE Kommata werden VERWORFEN, nicht umgeformt", async () => {
    // DER SCHADENSFALL, DEN DIESER TEST VERHINDERT: "1,234,567.89" ist
    // Tausendertrennung. Eine Umformung, die sie nicht vom Dezimalkomma
    // unterscheiden kann, machte daraus 1,2 — und da die Schnittstelle den
    // WERTEBEREICH nicht prueft (Teile (e)/(j)), ginge der Wert als Erfolg hinaus.
    // Ein fehlender Betrag ist harmlos, ein um sechs Groessenordnungen falscher nicht.
    expect(await send({ value: "1,234,567.89", currency: "EUR" })).toBeUndefined();
  });

  it("T3-e: der gemischte Fall faellt von selbst", async () => {
    // "1.234,56" hat EIN Komma -> "1.234.56" -> keine endliche Zahl -> verworfen.
    expect(await send({ value: "1.234,56", currency: "EUR" })).toBeUndefined();
  });

  it("T3-f: NaN, Infinity, Objekt, leere Zeichenkette und Text werden verworfen", async () => {
    expect(await send({ value: NaN, currency: "EUR" })).toBeUndefined();
    expect(await send({ value: Infinity, currency: "EUR" })).toBeUndefined();
    expect(await send({ value: { a: 1 }, currency: "EUR" })).toBeUndefined();
    expect(await send({ value: "", currency: "EUR" })).toBeUndefined();
    expect(await send({ value: "neunzehn", currency: "EUR" })).toBeUndefined();
  });

  it("T3-g: ohne Betrag oder ohne Waehrung entsteht KEIN conversionValue", async () => {
    // BEIDE HAELFTEN MUESSEN TRAGEN: Ein Betrag ohne Waehrungscode ist an dieser
    // Schnittstelle NICHT gemessen; die gemessene Form traegt beide Felder (Teil (n)).
    expect(await send({ currency: "EUR" })).toBeUndefined();
    expect(await send({ value: 19.9 })).toBeUndefined();
    expect(await send({})).toBeUndefined();
  });
});

// =====================================================================
// T4 — DIE FEHLERDEUTUNG
// =====================================================================
describe("T4 — vier gemessene Klassen plus Rest-Zweig", () => {
  async function reject(status: number, body: unknown): Promise<string> {
    global.fetch = vi.fn(async () =>
      response(status, body),
    ) as unknown as typeof fetch;
    await forwardToLinkedin(config(), "Purchase", "evt-e", {}, IP);
    return logLines()[0];
  }

  it("T4-a: 401 — ungueltiges Zugangsdatum", async () => {
    const line = await reject(401, {
      status: 401,
      serviceErrorCode: 65600,
      code: "INVALID_ACCESS_TOKEN",
      message: "Invalid access token",
    });
    expect(line).toContain("HTTP 401");
    expect(line).toContain("reason=invalid-token");
  });

  it("T4-b: 403 wird UEBERSETZT — der Fremdtext steht daneben, nicht an seiner Stelle", async () => {
    // GEMESSEN (Teil (c)): Der Anbieter antwortet "No ad accounts found". Das zeigt
    // zur FALSCHEN Ursache. WIRD ROT, WENN: jemand die Uebersetzung entfernt und die
    // Meldung unuebersetzt durchreicht — dann beginnt die Fehlersuche am falschen
    // Ende.
    const line = await reject(403, { message: "No ad accounts found", status: 403 });
    expect(line).toContain("reason=conversion-rule-not-resolvable-or-no-permission");
    expect(line).toContain("No ad accounts found");
  });

  it("T4-c: 400 MIT code — das Gateway", async () => {
    // DER STATUS ALLEIN TRENNT DIE BEIDEN 400er NICHT (GEMESSEN, Teile (r)/(s)); das
    // Feld code tut es. WIRD ROT, WENN: jemand nur auf den Status verzweigt.
    const line = await reject(400, {
      status: 400,
      code: "VERSION_MISSING",
      message: "A version must be present.",
    });
    expect(line).toContain("reason=gateway");
    expect(line).toContain("code=VERSION_MISSING");
  });

  it("T4-d: 422 — die Nutzlast ist abgelehnt, die MEHRZEILIGE Meldung reist mit", async () => {
    // Der Validator SAMMELT (GEMESSEN, Teil (i)): eine Antwort kann mehrere Fehler
    // nennen. Deshalb geht die Meldung als GANZES ins Log und nicht in eine Auswahl.
    const line = await reject(422, {
      message:
        'ERROR :: /conversionValue/amount :: 19.9 cannot be coerced to String\nERROR :: /conversion :: Invalid Urn format.',
      status: 422,
    });
    expect(line).toContain("reason=payload-rejected");
    expect(line).toContain("cannot be coerced to String");
  });

  it("T4-e: 400 OHNE code faellt in den Rest-Zweig und nennt sich so", async () => {
    // DIE ZWEITE GEMESSENE 400er-FORM (Teil (s), Zeitfenster) traegt kein code-Feld.
    // Sie ist BEWUSST nicht als fuenfte Klasse gebaut: D2 nennt vier, und eine
    // fuenfte aus dem Gedaechtnis waere eine Behauptung ohne Quelle. Der Rest-Zweig
    // nennt sich als solcher, damit eine unbekannte Form nicht wie eine gedeutete
    // aussieht.
    const line = await reject(400, {
      message:
        "Conversion time should be within 90 days and not exceed current time, indices [0] (0-indexed).",
      status: 400,
    });
    expect(line).toContain("reason=unclassified");
    expect(line).toContain("within 90 days");
  });

  it("T4-f: ein Nicht-JSON-Rumpf wird unterdrueckt, nicht geloggt", async () => {
    global.fetch = vi.fn(
      async () => new Response("<html>gateway</html>", { status: 502 }),
    ) as unknown as typeof fetch;

    await forwardToLinkedin(config(), "Purchase", "evt-e2", {}, IP);

    const line = logLines()[0];
    expect(line).toContain("non-JSON body suppressed");
    expect(line).not.toContain("<html>");
  });

  it("T4-g: eine lange token-artige Folge im Fremdtext wird GESCHWAERZT", async () => {
    // (d) DER SCHWAERZUNGS-REGEL: ein Leak-Test wird NIE mit einem echten Geheimnis
    // gefahren — ein formbasierter Schutz sieht echt und erfunden als dieselbe
    // Eingabe. WIRD ROT, WENN: jemand kappt, BEVOR er schwaerzt.
    const line = await reject(401, {
      status: 401,
      message: `token ${TOKEN} was rejected`,
    });
    expect(line).not.toContain(TOKEN);
    expect(line).toContain("<redacted>");
  });

  it("T4-h: ein Erfolg (201, leerer Rumpf) erzeugt KEINE Fehlerzeile", async () => {
    // DIE POSITIVKONTROLLE ZU DEN SIEBEN DARUEBER: Ohne sie waere "es wird geloggt"
    // von "es wird immer geloggt" nicht zu unterscheiden.
    await forwardToLinkedin(config(), "Purchase", "evt-ok", {}, IP);
    expect(logLines()).toEqual([]);
  });
});

// =====================================================================
// T5 — DER TIMER UND DER VERTRAG
// =====================================================================
describe("T5 — Deckel, Aufraeumen und der Nie-Wurf-Vertrag", () => {
  it("T5-a: der Timer wird aufgeraeumt — nach schnellem Erfolg laeuft keiner weiter", async () => {
    // PRUEFBAR, UND SO: mit gestellten Timern zaehlt vitest die offenen Timer. Nach
    // einem Aufruf, der sofort antwortet, darf KEINER offen sein — sonst hielte er
    // die Invocation bis zum Deckel, und der Preis dieses Pfads ist der
    // CONCURRENCY-SLOT (CLAUDE.md, "## Code-Qualitaet").
    // WIRD ROT, WENN: das clearTimeout im finally entfernt wird.
    vi.useFakeTimers();
    await forwardToLinkedin(config(), "Purchase", "evt-t", {}, IP);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("T5-b: ein Wurf der Attrappe verlaesst den Adapter NICHT", async () => {
    // DER VERTRAG, an dem das 204-Containment haengt. WIRD ROT, WENN: jemand den
    // try/catch entfernt oder einen Pfad daneben legt.
    global.fetch = vi.fn(async () => {
      throw new TypeError("network down");
    }) as unknown as typeof fetch;

    await expect(
      forwardToLinkedin(config(), "Purchase", "evt-x", {}, IP),
    ).resolves.toBeUndefined();
    expect(logLines()[0]).toContain("LinkedIn forward error: TypeError");
  });

  it("T5-c: ein unlesbarer Rumpf ist ein Diagnose-Ergebnis, kein Fehlerpfad", async () => {
    global.fetch = vi.fn(async () => ({
      ok: false,
      status: 500,
      headers: new Headers(),
      text: async () => {
        throw new Error("stream broken");
      },
    })) as unknown as typeof fetch;

    await expect(
      forwardToLinkedin(config(), "Purchase", "evt-y", {}, IP),
    ).resolves.toBeUndefined();
    expect(logLines()[0]).toContain("body unreadable");
  });
});

// =====================================================================
// T6 — li_fat_id AUS DER ADRESSE (Phase 11.7, S6a)
//
// T1-a FAEHRT OHNE ADRESSE und bleibt so — er deckt den Adressweg NICHT (VERMERK
// P11.7-19 der Phase 11.7, (b)). Diese Faelle tragen die Adresse selbst. Die Werte sind
// ERFUNDEN; das echte Format ist ungelesen (docs/ziel-befunde/linkedin.md, Teil (an)).
// =====================================================================
describe("T6 — li_fat_id als zweiter userIds-Eintrag", () => {
  const CLICK_ID_TYPE = "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID";

  /** Sendet mit dieser Adresse und liefert die gesendete Nutzlast. */
  async function mitAdresse(eventSourceUrl: string): Promise<Record<string, unknown>> {
    await forwardToLinkedin(config(), "Purchase", "evt-s6a", { eventSourceUrl }, IP);
    // POSITIVKONTROLLE: ohne genau einen Aufruf waere "kein Eintrag" trivial wahr.
    expect(fetchCalls()).toHaveLength(1);
    return sentPayload();
  }

  function userIds(payload: Record<string, unknown>) {
    return (payload.user as { userIds: { idType: string; idValue: string }[] }).userIds;
  }

  /** Der Klick-Eintrag, gesucht ueber seinen Typ — NICHT ueber den Index (s. T6-a). */
  function klickEintrag(payload: Record<string, unknown>) {
    return userIds(payload).find((e) => e.idType === CLICK_ID_TYPE);
  }

  it("T6-a: die GANZE Nutzlast mit beiden Eintraegen, die IP an Index 0", async () => {
    // WIRD ROT, WENN: der zweite Eintrag fehlt, seinen Typ oder Wert aendert, die
    // Reihenfolge kippt — oder die Adresse bzw. utm_source in die Nutzlast geraet.
    // EINZIGER TEST GEGEN "Reihenfolge vertauscht": T6-d und T6-e suchen ueber den Typ.
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-23T10:00:00.000Z"));
    const expected = new Date("2026-09-23T10:00:00.000Z").getTime();

    const payload = await mitAdresse(
      "https://kunde.de/lp?utm_source=u&li_fat_id=Ab7-Xy_9",
    );

    expect(payload).toEqual({
      conversion: URN,
      conversionHappenedAt: expected,
      eventId: "evt-s6a",
      user: {
        userIds: [
          { idType: "PLAINTEXT_IP_ADDRESS", idValue: IP },
          { idType: CLICK_ID_TYPE, idValue: "Ab7-Xy_9" },
        ],
      },
    });
  });

  it("T6-b: ohne li_fat_id in der Adresse bleibt es bei der IP", async () => {
    const payload = await mitAdresse("https://kunde.de/lp?utm_source=u");
    expect(payload.user).toEqual({
      userIds: [{ idType: "PLAINTEXT_IP_ADDRESS", idValue: IP }],
    });
  });

  it("T6-c: LI_FAT_ID in anderer Schreibung ergibt KEINEN Eintrag", async () => {
    // WIRD ROT, WENN: der Name ohne Schreibung verglichen wird (Zuschnitt L3, exakt).
    const payload = await mitAdresse("https://kunde.de/lp?LI_FAT_ID=Ab7-Xy_9");
    expect(klickEintrag(payload)).toBeUndefined();
  });

  it("T6-d: der Wert reist unveraendert — Schreibung bleibt, dekodiert wie der Parser", async () => {
    // WIRD ROT, WENN: der Wert umgeformt wird (L2), oder der Typ falsch ist.
    expect(
      klickEintrag(await mitAdresse("https://kunde.de/lp?li_fat_id=AbC-dEf_9")),
    ).toEqual({ idType: CLICK_ID_TYPE, idValue: "AbC-dEf_9" });
    global.fetch = vi.fn(async () => response(201)) as unknown as typeof fetch;
    expect(
      klickEintrag(await mitAdresse("https://kunde.de/lp?li_fat_id=a%2Bb+c")),
    ).toEqual({ idType: CLICK_ID_TYPE, idValue: "a+b c" });
  });

  it("T6-e: leer ergibt keinen Eintrag, mehrfach das ERSTE Vorkommen", async () => {
    expect(
      klickEintrag(await mitAdresse("https://kunde.de/lp?li_fat_id=")),
    ).toBeUndefined();
    global.fetch = vi.fn(async () => response(201)) as unknown as typeof fetch;
    expect(
      klickEintrag(
        await mitAdresse("https://kunde.de/lp?li_fat_id=Erst&li_fat_id=Zwei"),
      ),
    ).toEqual({ idType: CLICK_ID_TYPE, idValue: "Erst" });
  });

  it("T6-f: eine nicht parsebare Adresse ergibt keinen Eintrag — und der Forward laeuft", async () => {
    // WIRD ROT, WENN: das Herauslesen bei kaputter Eingabe wirft — der Wurf landete im
    // catch des Adapters, und es ginge GAR NICHTS hinaus.
    const payload = await mitAdresse("/lp?li_fat_id=Ab7-Xy_9");
    expect(klickEintrag(payload)).toBeUndefined();
  });

  it("T6-g: eine IPv6-Adresse entfaellt, li_fat_id geht ALLEIN hinaus (Riegel 2 als Filter, S6b)", async () => {
    // WIRD ROT, WENN: Riegel 2 den Forward trotz li_fat_id verwirft, die IPv6-Adresse doch
    // als Eintrag hinausgeht, eine Fehlerzeile entsteht oder der Klick-Eintrag fehlt.
    // Den Info-Kanal fuer denselben Fall (genau die Erfolgszeile, keine Filter-Zeile)
    // prueft T8-e.
    // EINZIGER TEST GEGEN VIER FEHLERKLASSEN (Mutationen m1, m3, m4, m5 der Scheibe S6b):
    // T2-b und T7-c fahren IPv6 OHNE li_fat_id, dort bricht der Riegel weiter ab.
    // Bis S6a nagelte dieser Test das Gegenteil fest (Verwurf auch MIT li_fat_id, B5).
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-24T10:00:00.000Z"));
    const expected = new Date("2026-09-24T10:00:00.000Z").getTime();

    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-s6b-g",
      { eventSourceUrl: "https://kunde.de/lp?utm_source=u&li_fat_id=Ab7-Xy_9" },
      "2001:db8::1",
    );

    expect(fetchCalls()).toHaveLength(1);
    expect(sentPayload()).toEqual({
      conversion: URN,
      conversionHappenedAt: expected,
      eventId: "evt-s6b-g",
      user: { userIds: [{ idType: CLICK_ID_TYPE, idValue: "Ab7-Xy_9" }] },
    });
    expect(logLines()).toEqual([]);
    // DIE IPv6-ADRESSE GEHT NIE HINAUS (B4) — weder im Rumpf noch in einer Kopfzeile.
    // Positivkontrolle derselben Pruefung: T7-b findet die IPv4 im Rumpf.
    const [, init] = fetchCalls()[0];
    expect(init.body).not.toContain("2001:db8");
    expect(JSON.stringify(init.headers)).not.toContain("2001:db8");
  });

  it("T6-h: ohne IP geht li_fat_id ALLEIN hinaus (Riegel 1, S6b)", async () => {
    // WIRD ROT, WENN: der Identitaets-Riegel li_fat_id nicht als Kennung gelten laesst.
    // T2-a und T7-d fahren OHNE li_fat_id, dort bricht der Riegel weiter ab.
    // Bis S6a nagelte dieser Test das Gegenteil fest (Verwurf auch MIT li_fat_id, B5).
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-24T10:00:00.000Z"));
    const expected = new Date("2026-09-24T10:00:00.000Z").getTime();

    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-s6b-h",
      { eventSourceUrl: "https://kunde.de/lp?utm_source=u&li_fat_id=Ab7-Xy_9" },
      undefined,
    );

    expect(fetchCalls()).toHaveLength(1);
    expect(sentPayload()).toEqual({
      conversion: URN,
      conversionHappenedAt: expected,
      eventId: "evt-s6b-h",
      user: { userIds: [{ idType: CLICK_ID_TYPE, idValue: "Ab7-Xy_9" }] },
    });
    expect(logLines()).toEqual([]);
  });
});

// =====================================================================
// T7 — DIE RIEGEL ALS FILTER JE EINTRAG (Phase 11.7, S6b)
//
// Die uebrigen Faelle der Sechser-Tabelle aus dem Zuschnitt (B1 bis B4), JE MIT ADRESSE —
// anders als T2, der ohne Adresse faehrt. Die Faelle "IPv6 + li" und "keine IP + li" tragen
// T6-g und T6-h. Werte ERFUNDEN (s. T6).
// =====================================================================
describe("T7 — die Riegel als Filter je Eintrag", () => {
  const CLICK_ID_TYPE = "LINKEDIN_FIRST_PARTY_ADS_TRACKING_UUID";
  const MIT_LI = "https://kunde.de/lp?utm_source=u&li_fat_id=Ab7-Xy_9";
  const OHNE_LI = "https://kunde.de/lp?utm_source=u";

  function userIds() {
    return (sentPayload().user as { userIds: unknown }).userIds;
  }

  it("T7-a: IPv4 + li_fat_id -> [IP, Klick], keine Logzeile", async () => {
    // WIRD ROT, WENN: der IP-Eintrag trotz gueltiger IPv4 entfaellt, die Reihenfolge kippt
    // oder eine Logzeile entsteht.
    await forwardToLinkedin(config(), "Purchase", "evt-s6b-a", { eventSourceUrl: MIT_LI }, IP);
    expect(fetchCalls()).toHaveLength(1);
    expect(userIds()).toEqual([
      { idType: "PLAINTEXT_IP_ADDRESS", idValue: IP },
      { idType: CLICK_ID_TYPE, idValue: "Ab7-Xy_9" },
    ]);
    expect(logLines()).toEqual([]);
  });

  it("T7-b: IPv4 ohne li_fat_id -> [IP], keine Logzeile", async () => {
    // WIRD ROT, WENN: ohne Klick-Kennung abgebrochen wird oder die IP fehlt — Invariante
    // (2) der Scheibe: ohne li_fat_id ist das Verhalten IDENTISCH mit vorher.
    // POSITIVKONTROLLE zu T6-g: dieselbe Suche findet hier die IP im Rumpf.
    await forwardToLinkedin(config(), "Purchase", "evt-s6b-b", { eventSourceUrl: OHNE_LI }, IP);
    expect(fetchCalls()).toHaveLength(1);
    expect(userIds()).toEqual([{ idType: "PLAINTEXT_IP_ADDRESS", idValue: IP }]);
    expect(logLines()).toEqual([]);
    expect(fetchCalls()[0][1].body).toContain(IP);
  });

  it("T7-c: IPv6 ohne li_fat_id -> kein Aufruf, 'identity is not IPv4'", async () => {
    // WIRD ROT, WENN: Riegel 2 ohne Klick-Kennung nicht mehr abbricht — dann ginge eine
    // leere Liste oder die IPv6-Adresse hinaus.
    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-s6b-c",
      { eventSourceUrl: OHNE_LI },
      "2001:db8::1",
    );
    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: identity is not IPv4",
    ]);
  });

  it("T7-d: keine IP ohne li_fat_id -> kein Aufruf, 'missing identity'", async () => {
    // WIRD ROT, WENN: Riegel 1 ohne Klick-Kennung nicht mehr abbricht.
    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-s6b-d",
      { eventSourceUrl: OHNE_LI },
      undefined,
    );
    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: missing identity",
    ]);
  });

  it("T7-e: keine IP + li_fat_id, Ereignis ohne Regel -> Riegel 3 greift", async () => {
    // BEWACHT DIE REIHENFOLGE DER RIEGEL: Mit li_fat_id passiert Riegel 1, und der Forward
    // endet erst an Riegel 3. WIRD ROT, WENN: Riegel 1 li_fat_id nicht als Kennung gelten
    // laesst (dann kaeme "missing identity").
    await forwardToLinkedin(
      config(),
      "Lead",
      "evt-s6b-e",
      { eventSourceUrl: MIT_LI },
      undefined,
    );
    expect(fetchCalls()).toHaveLength(0);
    expect(logLines()).toEqual([
      "[capi] LinkedIn forward skipped: no conversion rule for event",
    ]);
  });
});

// =====================================================================
// T8 — DIE ERFOLGSZEILE (Phase 11.7, S10a)
//
// Eine angenommene Antwort (res.ok — das bestehende Erfolgsurteil, kein neues) schreibt
// GENAU EINE console.info-Zeile mit Ziel und HTTP-Status, sonst nichts. Das Muster ist
// fuer alle fuenf Ziele zeichengleich. Die Faelle lesen BEIDE Kanaele: info fuer die
// Zeile, error dafuer, dass sie nicht auf der falschen Stufe steht.
// =====================================================================
describe("T8 — die Erfolgszeile (S10a)", () => {
  const ZEILE_201 = "[capi] LinkedIn forward accepted: HTTP 201";
  const OHNE_LI = { eventSourceUrl: "https://kunde.de/lp?utm_source=u" };

  /** Stellt fetch auf GENAU diese Antwort und sendet einen gueltigen Forward. */
  async function mitAntwort(antwort: () => Response | Promise<Response>) {
    global.fetch = vi.fn(async () => antwort()) as unknown as typeof fetch;
    await forwardToLinkedin(config(), "Purchase", "evt-s10a-d", {}, IP);
  }

  it("T8-a: 201 -> genau EINE Info-Zeile mit Ziel und Status, keine Fehlerzeile", async () => {
    // WIRD ROT, WENN: die Zeile fehlt, doppelt kommt, auf error steht oder mehr traegt.
    await forwardToLinkedin(config(), "Purchase", "evt-s10a-a", {}, IP);
    expect(fetchCalls()).toHaveLength(1);
    expect(infoLines()).toEqual([ZEILE_201]);
    expect(logLines()).toEqual([]);
  });

  it("T8-b: der Status kommt aus der Antwort — 200 ergibt 'HTTP 200'", async () => {
    // WIRD ROT, WENN: der Status festgeschrieben statt gelesen wird. Jede Antwort mit
    // res.ok gilt als angenommen, nicht nur die gemessene 201. EINZIGER TEST GEGEN
    // einen festgeschriebenen Status (Mutation mL6 der Scheibe S10a).
    global.fetch = vi.fn(async () => response(200)) as unknown as typeof fetch;
    await forwardToLinkedin(config(), "Purchase", "evt-s10a-b", {}, IP);
    expect(infoLines()).toEqual(["[capi] LinkedIn forward accepted: HTTP 200"]);
    expect(logLines()).toEqual([]);
  });

  it("T8-c: KEIN Wert aus der Anfrage steht in einer Zeile — mit Positivkontrolle", async () => {
    // WIRD ROT, WENN: IP, Klick-Kennung, URN, eventId, Betrag, Waehrung, Adresse oder
    // Zugangsdatum in die Zeile geraten (TRANSIT-ONLY). Einen User-Agent nimmt dieser
    // Adapter nicht entgegen — die UA-Achse deckt TS-c in tiktok-forward.test.ts.
    const LI = "Ab7-Xy_9-s10a";
    const EVT = "evt-s10a-c-kennung";
    await forwardToLinkedin(
      config(),
      "Purchase",
      EVT,
      {
        value: 19.9,
        currency: "EUR",
        eventSourceUrl: `https://kunde.de/lp?utm_source=s10a&li_fat_id=${LI}`,
      },
      IP,
    );

    // POSITIVKONTROLLE: jeder gesuchte Wert ist tatsaechlich hinausgegangen — sonst
    // waere seine Abwesenheit in der Zeile trivial wahr. Die Adresse selbst geht nicht
    // hinaus; dass sie gelesen wurde, belegt LI im Rumpf.
    const [, init] = fetchCalls()[0];
    for (const wert of [IP, LI, URN, EVT, "19.9", "EUR"]) {
      expect(init.body).toContain(wert);
    }
    expect(init.headers.Authorization).toContain(TOKEN);
    expect(infoLines()).toEqual([ZEILE_201]);

    const alle = [...infoLines(), ...logLines()].join("\n");
    for (const wert of [TOKEN, URN, IP, LI, EVT, "19.9", "EUR", "kunde.de", "utm_source"]) {
      expect(alle).not.toContain(wert);
    }
  });

  it.each<[string, () => Promise<void>]>([
    ["Riegel 1, keine Identitaet", () =>
      forwardToLinkedin(config(), "Purchase", "evt-s10a-d", OHNE_LI, undefined)],
    ["Riegel 2, keine IPv4", () =>
      forwardToLinkedin(config(), "Purchase", "evt-s10a-d", OHNE_LI, "2001:db8::1")],
    ["Riegel 3, keine Regel", () =>
      forwardToLinkedin(config(), "Lead", "evt-s10a-d", OHNE_LI, IP)],
    ["HTTP 401", () =>
      mitAntwort(() => response(401, { status: 401, message: "Invalid access token" }))],
    ["HTTP 403", () =>
      mitAntwort(() => response(403, { status: 403, message: "No ad accounts found" }))],
    ["HTTP 422", () =>
      mitAntwort(() => response(422, { status: 422, message: "ERROR :: /conversion" }))],
    ["HTTP 502 ohne JSON", () =>
      mitAntwort(() => new Response("<html>gateway</html>", { status: 502 }))],
    ["HTTP 500 mit unlesbarem Rumpf", () =>
      mitAntwort(
        () =>
          ({
            ok: false,
            status: 500,
            headers: new Headers(),
            text: async () => {
              throw new Error("stream broken");
            },
          }) as unknown as Response,
      )],
    ["fetch wirft", () =>
      mitAntwort(() => {
        throw new TypeError("network down");
      })],
  ])("T8-d: %s -> KEINE Info-Zeile, genau eine Fehlerzeile", async (_name, lauf) => {
    // WIRD ROT, WENN: die Zeile ausserhalb des Erfolgsurteils entsteht (Mutation mL2).
    // POSITIVKONTROLLE: genau eine Fehlerzeile — der Pfad wurde wirklich betreten.
    await lauf();
    expect(logLines()).toHaveLength(1);
    expect(infoLines()).toEqual([]);
  });

  it("T8-e: IPv6 + li_fat_id (B3) -> genau die Erfolgszeile, keine Filter-Zeile, keine IPv6", async () => {
    // WIRD ROT, WENN: im Filter-Fall eine Zeile ueber den entfallenen IP-Eintrag entsteht
    // — auch auf dem Info-Kanal (B3) — oder die IPv6-Adresse in eine Zeile geraet.
    await forwardToLinkedin(
      config(),
      "Purchase",
      "evt-s10a-e",
      { eventSourceUrl: "https://kunde.de/lp?li_fat_id=Ab7-Xy_9" },
      "2001:db8::1",
    );
    expect(fetchCalls()).toHaveLength(1);
    expect(infoLines()).toEqual([ZEILE_201]);
    expect(logLines()).toEqual([]);
    expect([...infoLines(), ...logLines()].join("\n")).not.toContain("2001:db8");
  });
});
