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

beforeEach(() => {
  global.fetch = vi.fn(async () =>
    new Response(null, { status: 200 }),
  ) as unknown as typeof fetch;
  vi.spyOn(console, "error").mockImplementation(() => {});
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
