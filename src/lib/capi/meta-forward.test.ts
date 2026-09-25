import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

// Deterministisch statt aus der Umgebung: META_TEST_EVENT_CODE wuerde sonst je nach
// Maschine einen zusaetzlichen Nutzlast-Schluessel erzeugen.
vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

import { forwardToMeta } from "./meta-forward";

// ===========================================================================
// DER FEHLERPFAD DES ERSTEN ADAPTERS (Phase 11, Scheibe "Log-Leak am Meta-Adapter").
//
// GEGENSTAND IST describeMetaError — modul-privat, also ausschliesslich ueber
// forwardToMeta beobachtbar. `fetch` ist gestellt; geprueft wird, WAS in den
// console.error-Kanal geht, nicht was Meta tut.
//
// DIE GRENZE VOR ALLEN TESTS: Keiner von ihnen zeigt, ob Meta tatsaechlich
// zurueckspiegelt. Die Fixtures sind ERFUNDEN. Bewiesen wird eine Eigenschaft
// UNSERES Codes: traegt eine Anbieter-Antwort eine token-artige Zeichenfolge, dann
// verlaesst sie das Log nicht.
// ===========================================================================

/**
 * ERFUNDENES Testgeheimnis — kein echtes Zugangsdatum, und am Namen erkennbar.
 * Vierunddreissig Zeichen, ausschliesslich [A-Za-z0-9_]: damit liegt es UEBER der
 * Mindestlaenge der Schwaerzung und ist ein taugliches Modell.
 */
const TOKEN = "meta_ERFUNDENES_TESTGEHEIMNIS_0001";
const CONFIG = { pixelId: "PIXEL-123", token: TOKEN };
const IP = "203.0.113.7";
const UA = "Mozilla/5.0 (Test)";

/** Harmloser Fuelltext ohne eine einzige Folge ueber der Mindestlaenge. */
const FUELL = "ab ";

function jsonResponse(body: unknown, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

/** Alle Zeilen, die in console.error gelandet sind. */
function logLines(): string[] {
  return (console.error as unknown as ReturnType<typeof vi.fn>).mock.calls.map(
    (c) => String(c[0]),
  );
}

/**
 * Die ABLEHNUNGS-Zeile. Eine abgelehnte Antwort erzeugt ZWEI Zeilen: zuerst die
 * nackte Statuszeile des Aufrufers, dann die Deutung aus describeMetaError.
 */
function rejectedLine(): string {
  return logLines()[1];
}

/** Alle Zeilen, die in console.info gelandet sind (die Erfolgszeile, S10b). */
function infoLines(): string[] {
  return (console.info as unknown as ReturnType<typeof vi.fn>).mock.calls.map(
    (c) => String(c[0]),
  );
}

beforeEach(() => {
  global.fetch = vi.fn(async () =>
    new Response(null, { status: 200 }),
  ) as unknown as typeof fetch;
  vi.spyOn(console, "error").mockImplementation(() => {});
  vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
});

// ===========================================================================
// (a)/(b) DIE ZWEI HAELFTEN DERSELBEN ZUSAGE
// ===========================================================================

describe("Meta-Fehlerpfad — Schwaerzung und Diagnose", () => {
  it("(a) ECHO: eine zurueckgespiegelte Zeichenfolge verlaesst das Log NICHT", async () => {
    // DER EIGENTLICHE GEGENSTAND DER SCHEIBE. Das Zugangsdatum reist im
    // Query-Parameter; eine Fehlermeldung ueber einen ungueltigen Parameter kann ihn
    // zitieren. Ob Meta das TUT, ist unbekannt — diese Fixture stellt den Fall her.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        {
          error: {
            message: `Invalid OAuth access token: ${TOKEN}`,
            code: 190,
            error_subcode: 463,
            type: "OAuthException",
            fbtrace_id: "AbCdEf123",
          },
        },
        400,
      ),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    // POSITIVKONTROLLE ZUERST, und sie ist hier unverzichtbar: ohne sie waeren
    // "nichts geleakt" und "der Pfad wurde nie betreten" am Ergebnis nicht zu
    // unterscheiden. Sie faellt bei M2 — genau daran zeigt sich, dass sie echt ist.
    expect(logLines()).toHaveLength(2);
    expect(rejectedLine()).toContain("code=190");
    expect(rejectedLine()).toContain("<redacted>");

    // Und erst dann die eigentliche Zusage.
    expect(rejectedLine()).not.toContain(TOKEN);
  });

  it("(b) ZWILLING: die fuenf Diagnosefelder sind noch DA", async () => {
    // OHNE IHN WAERE (a) MIT EINER SCHWAERZUNG GRUEN, DIE ALLES FRISST — und das
    // waere ein Rueckschritt: an diesen Feldern haengt die Lesbarkeit stiller
    // Ablehnungen, der einzige Grund, warum hier ueberhaupt geloggt wird.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        {
          error: {
            message: "Invalid parameter",
            code: 190,
            error_subcode: 463,
            type: "OAuthException",
            fbtrace_id: "AbCdEf123",
          },
        },
        400,
      ),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = rejectedLine();
    expect(line).toContain("code=190");
    expect(line).toContain("subcode=463");
    expect(line).toContain("type=OAuthException");
    expect(line).toContain("fbtrace=AbCdEf123");
    expect(line).toContain("msg=Invalid parameter");
  });
});

// ===========================================================================
// (c)/(h) DER NICHT-JSON-AUSGANG
// ===========================================================================

describe("Meta-Fehlerpfad — der Nicht-JSON-Ausgang", () => {
  it("(c) NICHT-JSON: der Rumpf verschwindet, Status/Typ/Laenge treten an seine Stelle", async () => {
    const html = `<html><body>error for ${TOKEN} at gateway</body></html>`;
    global.fetch = vi.fn(async () =>
      new Response(html, {
        status: 502,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    // POSITIVKONTROLLE: der Zweig wurde wirklich betreten, und die Laenge stimmt mit
    // dem tatsaechlichen Rumpf ueberein — eine Zeile, die den Rumpf verschweigt, aber
    // nie entstand, saehe sonst genauso aus.
    const line = rejectedLine();
    expect(line).toContain("non-JSON body suppressed");
    expect(line).toContain(`len=${html.length}`);
    expect(line).toContain("type=text/html; charset=utf-8");

    // Weder das Geheimnis noch irgendein anderes Stueck des Rumpfes.
    expect(line).not.toContain(TOKEN);
    expect(line).not.toContain("gateway");
  });

  it("(h) CONTAINMENT: ohne Content-Type-Kopfzeile laeuft der Pfad durch und WIRFT NICHT", async () => {
    // DER KOPFZEILEN-ZUGRIFF IST NEUE ARBEIT IM FEHLER-GERUEST, und das Geruest selbst
    // darf NIE nach aussen werfen: Ein Wurf von hier verliesse forwardToMeta, liefe
    // durch handleIngest und machte aus der garantierten LEEREN 204 einen 500 — der
    // leakt den Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer.
    // Diese Achse ist sonst nur eine Ebene hoeher gedeckt (ueber den Handler); hier
    // wird sie an der Stelle geprueft, an der die neue Arbeit steht.
    global.fetch = vi.fn(async () =>
      new Response(null, { status: 502 }),
    ) as unknown as typeof fetch;

    await expect(
      forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA),
    ).resolves.toBeUndefined();

    const line = rejectedLine();
    expect(logLines()).toHaveLength(2);
    expect(line).toContain("non-JSON body suppressed");
    expect(line).toContain("type=-");
    expect(line).toContain("len=0");
  });
});

// ===========================================================================
// (d)/(e) DIE BEIDEN EINZELSTUECKE
// ===========================================================================

describe("Meta-Fehlerpfad — die Ausnahme und die Reihenfolge", () => {
  it("(d) TRACE-AUSNAHME: der Trace bleibt lesbar, die Meldung derselben Antwort nicht", async () => {
    // EINZELSTUECK. AN DIESEM TEST ALLEIN HAENGT EINE FEHLERKLASSE: dass der
    // Trace-Bezeichner versehentlich MITGESCHWAERZT wird. Er ist lang und
    // undurchsichtig und faellt der Schwaerzung als erstes zum Opfer; ohne ihn ist ein
    // stiller Forward-Fehlschlag beim Anbieter nicht mehr nachverfolgbar. Kein anderer
    // Test dieser Datei und kein Test in ingest.persist.test.ts prueft diese Achse —
    // wer ihn als redundant entfernt, nimmt die einzige Abdeckung mit.
    //
    // BEIDE HAELFTEN IN EINER ANTWORT, und das ist Absicht: getrennt geprueft koennten
    // sie aus verschiedenen Gruenden gruen sein. Hier steht die ASYMMETRIE selbst.
    const TRACE = "AbCd1234EfGh5678IjKl9012MnOp";
    global.fetch = vi.fn(async () =>
      jsonResponse(
        {
          error: {
            message: `Invalid OAuth access token: ${TOKEN}`,
            code: 190,
            type: "OAuthException",
            fbtrace_id: TRACE,
          },
        },
        400,
      ),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = rejectedLine();
    expect(line).toContain(`fbtrace=${TRACE}`);
    expect(line).toContain("<redacted>");
    expect(line).not.toContain(TOKEN);
  });

  it("(e) REIHENFOLGE: eine Folge auf der Kappungsgrenze hinterlaesst KEIN Bruchstueck", async () => {
    // EINZELSTUECK. AN DIESEM TEST ALLEIN HAENGT EINE FEHLERKLASSE: die VERTAUSCHUNG
    // von Schwaerzen und Kappen. Sie ist nur hier beobachtbar — an jeder anderen
    // Fixture liefert die umgekehrte Reihenfolge dasselbe Ergebnis, und die Zeile saehe
    // bereinigt AUS, waehrend ein Bruchstueck des Geheimnisses hinausginge.
    //
    // DER AUFBAU: 189 Zeichen harmloser Fuelltext, dann das erfundene Geheimnis. Es
    // beginnt VOR der Meldungs-Grenze und endet DAHINTER. Wer zuerst kappt, behaelt
    // seine ersten elf Zeichen — sie liegen unter der Mindestlaenge und entkaemen der
    // Schwaerzung danach.
    const message = FUELL.repeat(63) + TOKEN;
    global.fetch = vi.fn(async () =>
      jsonResponse({ error: { code: 190, message } }, 400),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    // POSITIVKONTROLLE: die Zeile ist da, der harmlose Text steht noch, und die
    // Schwaerzung hat gegriffen.
    const line = rejectedLine();
    expect(line).toContain("code=190");
    expect(line).toContain("<redacted>");

    // Die Zusage: kein Anfangsstueck des Geheimnisses, auch kein kurzes.
    expect(line).not.toContain(TOKEN.slice(0, 11));
    expect(line).not.toContain(TOKEN);
  });
});

// ===========================================================================
// (f)/(g) DIE BEIDEN DECKEL
// ===========================================================================

describe("Meta-Fehlerpfad — die Deckel", () => {
  it("(f) die enum-artigen Felder tragen einen HARTEN, kurzen Deckel", async () => {
    // DIE FIXTURE TRAEGT BEWUSST KEINE LANGE UNDURCHSICHTIGE FOLGE: mit einer waere
    // der Wert geschwaerzt, und der Test maesse die Schwaerzung statt des Deckels.
    const langerTyp = FUELL.repeat(40);
    global.fetch = vi.fn(async () =>
      jsonResponse(
        { error: { code: 190, type: langerTyp, message: "Invalid parameter" } },
        400,
      ),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = rejectedLine();
    expect(line).toContain(`type=${langerTyp.slice(0, 64)}`);
    expect(line).not.toContain(langerTyp.slice(0, 65));
  });

  it("(g) die Meldung wird gekappt — die Kappungs-Achse aus ingest.persist.test.ts", async () => {
    // HIER LIEGT DIE KAPPUNGS-ACHSE, die in ingest.persist.test.ts nicht mehr zeigbar
    // ist: dort war die Fixture eine Folge aus fuenftausend gleichen Zeichen — von
    // einem Geheimnis nicht unterscheidbar und deshalb heute geschwaerzt statt gekappt.
    // Diese Fixture besteht aus kurzen Woertern und traegt keine Folge ueber der
    // Mindestlaenge; an ihr ist der Deckel wieder sichtbar.
    const message = FUELL.repeat(100);
    global.fetch = vi.fn(async () =>
      jsonResponse({ error: { code: 100, message } }, 400),
    ) as unknown as typeof fetch;

    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = rejectedLine();
    expect(line).toContain(`msg=${message.slice(0, 200)}`);
    expect(line).not.toContain(message.slice(0, 201));
  });
});

// ===========================================================================
// DIE ERFOLGSZEILE (Phase 11.7, S10b).
//
// Eine angenommene Antwort (res.ok — das bestehende Erfolgsurteil, kein neues) schreibt
// GENAU EINE console.info-Zeile mit Ziel und HTTP-Status, sonst nichts. Das Muster ist
// fuer alle fuenf Ziele zeichengleich (S10a). Die Faelle lesen BEIDE Kanaele: info fuer
// die Zeile, error dafuer, dass sie nicht auf der falschen Stufe steht.
// EINEN RIEGEL HAT DIESER ADAPTER NICHT. Ein werfender Getter im Body wirft laut
// Vertragssatz 1 VOR dem try; dieser Fall wird hier bewusst NICHT festgenagelt.
// ===========================================================================

describe("Meta — die Erfolgszeile (S10b)", () => {
  const ZEILE_200 = "[capi] Meta forward accepted: HTTP 200";

  it("MS-a: HTTP 200 -> genau EINE Info-Zeile, keine Fehlerzeile", async () => {
    // WIRD ROT, WENN: die Zeile fehlt, doppelt kommt, auf error steht oder mehr traegt.
    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(infoLines()).toEqual([ZEILE_200]);
    expect(logLines()).toEqual([]);
  });

  it("MS-b: der Status kommt aus der Antwort — 201 ergibt 'HTTP 201'", async () => {
    // WIRD ROT, WENN: der Status festgeschrieben statt gelesen wird. Jede Antwort mit
    // res.ok gilt als angenommen. EINZIGER TEST GEGEN einen festgeschriebenen Status
    // (Mutation mM6 der Scheibe S10b).
    global.fetch = vi.fn(async () =>
      new Response(null, { status: 201 }),
    ) as unknown as typeof fetch;
    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(infoLines()).toEqual(["[capi] Meta forward accepted: HTTP 201"]);
    expect(logLines()).toEqual([]);
  });

  it("MS-c: KEIN Wert aus Anfrage oder Antwort steht in einer Zeile — mit Positivkontrolle", async () => {
    // WIRD ROT, WENN: IP, User-Agent, fbp, fbc bzw. fbclid, eventID, Adresse, Betrag,
    // Waehrung, Testcode, Pixel-ID, Zugangsdatum (in der URL) oder ein Feld der Antwort
    // in eine Zeile geraten (TRANSIT-ONLY; aus der Antwort allein der Status).
    const FBCLID = "IwS10bErfundenFbclid-0001";
    const FBP = "fb.1.1790000000000.1234567890";
    const EVT = "evt-s10b-c-kennung";
    const TESTCODE = "TEST-S10B-PROJ";
    global.fetch = vi.fn(async () =>
      jsonResponse({ events_received: 1, fbtrace_id: "TRACE-S10B-ANTWORT" }, 200),
    ) as unknown as typeof fetch;
    await forwardToMeta(
      CONFIG,
      "Purchase",
      EVT,
      {
        value: 19.9,
        currency: "EUR",
        _fbp: FBP,
        eventSourceUrl: `https://kunde.de/lp?utm_source=s10b&fbclid=${FBCLID}`,
      },
      IP,
      UA,
      TESTCODE,
    );

    // POSITIVKONTROLLE: jeder gesuchte Wert ist tatsaechlich hinausgegangen — sonst
    // waere seine Abwesenheit in der Zeile trivial wahr.
    const [url, init] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0] as [string, { body: string }];
    for (const wert of [IP, UA, FBP, FBCLID, EVT, "kunde.de", "utm_source", "19.9", "EUR", TESTCODE]) {
      expect(init.body).toContain(wert);
    }
    expect(url).toContain(TOKEN);
    expect(url).toContain(CONFIG.pixelId);
    expect(infoLines()).toEqual([ZEILE_200]);

    const alle = [...infoLines(), ...logLines()].join("\n");
    for (const wert of [
      TOKEN, CONFIG.pixelId, IP, UA, FBP, FBCLID, EVT, "kunde.de", "utm_source",
      "19.9", "EUR", TESTCODE, "TRACE-S10B-ANTWORT", "graph.facebook.com",
    ]) {
      expect(alle).not.toContain(wert);
    }
  });

  it.each<[string, () => Response | Promise<Response>, number]>([
    ["HTTP 400 mit Envelope", () =>
      jsonResponse({ error: { code: 190, message: "Invalid parameter" } }, 400), 2],
    ["HTTP 502 ohne JSON", () =>
      new Response("<html>gateway</html>", { status: 502 }), 2],
    ["HTTP 500 mit unlesbarem Rumpf", () =>
      ({
        ok: false,
        status: 500,
        headers: new Headers(),
        text: async () => {
          throw new Error("stream broken");
        },
      }) as unknown as Response, 2],
    ["fetch wirft", () => {
      throw new TypeError("network down");
    }, 1],
    ["Abbruch", () => {
      throw new DOMException("Aborted", "AbortError");
    }, 1],
  ])("MS-d: %s -> KEINE Info-Zeile", async (_name, antwort, fehlerzeilen) => {
    // WIRD ROT, WENN: die Zeile ausserhalb des Erfolgsurteils entsteht (Mutation mM2).
    // POSITIVKONTROLLE: die Fehlerzeilen des Pfades — er wurde wirklich betreten.
    global.fetch = vi.fn(async () => antwort()) as unknown as typeof fetch;
    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(infoLines()).toEqual([]);
    expect(logLines()).toHaveLength(fehlerzeilen);
  });

  it("MS-e: mit Projekt-Testcode dieselbe Zeile — ohne den Code", async () => {
    // WIRD ROT, WENN: die Zeile den Testmodus oder den Code traegt (Q7: keine Projekt-
    // Angaben in der Zeile). Ein Ereignis mit Testcode wird angenommen und gezaehlt
    // (docs/ziel-befunde/meta.md, Teil (a)); die Zeile sagt das nicht, und das ist gewollt.
    await forwardToMeta(CONFIG, "Purchase", "evt-1", {}, IP, UA, "TEST-S10B-MODUS");
    expect(infoLines()).toEqual([ZEILE_200]);
    expect(infoLines().join("\n")).not.toContain("TEST-S10B-MODUS");
    expect(logLines()).toEqual([]);
  });
});
