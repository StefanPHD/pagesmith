import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { EVENT_MAP, forwardToTiktok } from "./tiktok-forward";
import { LEGACY_CONSENT_ROLE } from "@/lib/tracking/consent-targets";
import { META_STANDARD_EVENTS } from "@/lib/tracking/meta";

// ===========================================================================
// DER ADAPTER FUER DAS DRITTE ZIEL.
//
// DIE GRENZE VOR ALLEN TESTS: `fetch` ist gestellt. Was diese Datei prueft, ist der
// ADAPTER — nicht der Anbieter. Die Wire-Form, gegen die er gebaut ist, wurde am
// 2026-08-11 von Hand gegen den laufenden Endpunkt GEMESSEN (nicht recherchiert);
// dass sie richtig transkribiert ist, kann kein Test hier zeigen. Das zeigt der
// Live-Test.
// ===========================================================================

/**
 * ERFUNDENES Testgeheimnis — kein echtes Zugangsdatum, am Namen erkennbar.
 * Ueber der Schwaerzungs-Grenze und ausschliesslich aus dem Zeichenvorrat der
 * Schwaerzung, damit es ein taugliches Modell ist.
 */
const TOKEN = "tiktok_ERFUNDENES_TESTGEHEIMNIS_0001";
/** ERFUNDENE Kennung — keine echte Pixel-ID. */
const CONFIG = { pixelId: "PIXEL-ERFUNDEN-0001", token: TOKEN };
const IP = "203.0.113.7";
const UA = "Mozilla/5.0 (Test)";

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

/** Ein Erfolgs-Rumpf, wie er gemessen wurde: code 0 und ein LEERES data-Objekt. */
function okBody(extra: Record<string, unknown> = {}) {
  return { code: 0, message: "OK", request_id: "REQ-OK", data: {}, ...extra };
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

/** Der EINE gesendete Eintrag aus dem data-Array. */
function sentEvent(): Record<string, unknown> {
  return (sentPayload().data as Record<string, unknown>[])[0];
}

function logLines(): string[] {
  return (console.error as unknown as ReturnType<typeof vi.fn>).mock.calls.map(
    (c) => String(c[0]),
  );
}

beforeEach(() => {
  global.fetch = vi.fn(async () => jsonResponse(okBody())) as unknown as typeof fetch;
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

// ===========================================================================
// DIE ALTBESTANDS-ROLLE
// ===========================================================================

describe("TikTok — die Altbestands-Rolle", () => {
  it("T1: TikTok traegt die Altbestands-Rolle NICHT", () => {
    // WAS DIESER TEST IST UND WAS NICHT — keine falsche Selbstbeschreibung:
    // Er ist NICHT die einzige Abdeckung dieser Fehlerklasse. Die Zaehlung in
    // tracking/consent-targets.test.ts ("es ist genau eines — nicht keines, nicht
    // zwei") faengt ein `true` hier ebenfalls, weil sie ueber TRACKING_TARGETS
    // laeuft. DIESER TEST BENENNT DIE KLASSE, jene zaehlt sie: Wer nach dem Ziel
    // sucht, findet die Aussage hier; wer die Zaehlung rot sieht, weiss noch nicht,
    // WELCHES Ziel sie gebrochen hat.
    //
    // DIE FEHLERKLASSE: Bei einem Draht OHNE Einwilligungs-Feld hiesse `true` ein
    // FORWARD OHNE EINWILLIGUNG an ein Ziel, ueber das der Besucher nie gefragt
    // wurde — jede bereits publizierte Kundenseite traegt das Feld nicht, und ein
    // Code-Deploy erreicht sie nicht.
    expect(LEGACY_CONSENT_ROLE.tiktok).toBe(false);
  });
});

// ===========================================================================
// SCHWAERZUNG UND DIAGNOSE — die zwei Haelften derselben Zusage
// ===========================================================================

describe("TikTok — Schwaerzung und Diagnose", () => {
  it("T2: ECHO — eine zurueckgespiegelte Zeichenfolge verlaesst das Log NICHT", async () => {
    // GEMESSEN ist, dass die Meldung dieses Anbieters bei einer unzulaessigen
    // Ereignisquellen-Kennung den GESENDETEN WERT woertlich zurueckspiegelt. Diese
    // Fixture stellt den SCHAERFEREN Fall her — das Zugangsdatum in der Meldung —,
    // weil die Schwaerzung nach FORM arbeitet und nicht nach Wissen: Sie muss jede
    // lange undurchsichtige Folge fangen, gleich welchen Wert sie traegt.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        {
          code: 40001,
          message: `Invalid event_source_id: ${TOKEN}`,
          request_id: "REQ-40001",
        },
        401,
      ),
    ) as unknown as typeof fetch;

    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    // POSITIVKONTROLLE ZUERST, und sie ist unverzichtbar: ohne sie waeren "nichts
    // geleakt" und "der Pfad wurde nie betreten" am Ergebnis nicht zu unterscheiden.
    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("code=40001");
    expect(lines[0]).toContain("<redacted>");

    // Und erst dann die eigentliche Zusage.
    expect(lines[0]).not.toContain(TOKEN);
  });

  it("T3: ZWILLING — die Diagnosefelder sind noch DA", async () => {
    // OHNE IHN WAERE T2 MIT EINER SCHWAERZUNG GRUEN, DIE ALLES FRISST. An diesen
    // Feldern haengt die Unterscheidbarkeit der Fehlerklassen — der einzige Grund,
    // warum hier ueberhaupt geloggt wird.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        {
          code: 40002,
          message: "Invalid params: data.0.event_time",
          request_id: "REQ-40002",
        },
        400,
      ),
    ) as unknown as typeof fetch;

    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = logLines()[0];
    expect(line).toContain("HTTP 400");
    expect(line).toContain("code=40002");
    expect(line).toContain("request=REQ-40002");
    expect(line).toContain("msg=Invalid params: data.0.event_time");
  });

  it("T4: die NORMALISIERUNG steht VOR dem geteilten Primitiv — kein Wurf bei Nicht-Strings", async () => {
    // DER VERTRAGS-TEST ZUR AUFLAGE AUS DER EXTRAKTIONS-SCHEIBE: redactOpaque in
    // lib/redact.ts ist NICHT defensiv — es ruft .replace auf seiner Eingabe und
    // WIRFT bei allem, was kein String ist. Ein Wurf von hier verliesse den Adapter,
    // liefe durch dispatchForward und handleIngest und machte aus der garantierten
    // LEEREN 204 einen 500. Der Anbieter kann jederzeit einen nicht-String liefern;
    // JSON kennt Zahlen, Wahrheitswerte und Objekte.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        { code: 40002, message: { nested: true }, request_id: 12345 },
        400,
      ),
    ) as unknown as typeof fetch;

    await expect(
      forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA),
    ).resolves.toBeUndefined();

    const line = logLines()[0];
    expect(line).toContain("code=40002");
    expect(line).toContain("request=12345");
    expect(line).toContain("msg=[object Object]");
  });
});

// ===========================================================================
// DER RUMPF ENTSCHEIDET, NICHT DER STATUS
// ===========================================================================

describe("TikTok — der Rumpf-Leser", () => {
  it("T5: ERFOLG SCHWEIGT — HTTP 200 mit code 0 erzeugt KEINE Zeile", async () => {
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    // POSITIVKONTROLLE: der Aufruf hat wirklich stattgefunden. Ohne sie waere
    // "keine Zeile" auch dann wahr, wenn gar nichts gesendet wurde.
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(logLines()).toEqual([]);
  });

  it("T6: HTTP 200 mit code UNGLEICH 0 ist eine ABLEHNUNG (die tragende Anforderung)", async () => {
    // DER ANBIETER MELDET SEINEN FACHLICHEN STATUS IM RUMPF (gemessen). Wer nur den
    // Status liest, haelt diese Antwort fuer einen Erfolg — dieselbe Falle wie beim
    // zweiten Ziel, an einem anderen Anbieter.
    global.fetch = vi.fn(async () =>
      jsonResponse({ code: 40105, message: "Invalid access token", request_id: "R" }),
    ) as unknown as typeof fetch;

    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("rejected");
    expect(lines[0]).toContain("HTTP 200");
    expect(lines[0]).toContain("code=40105");
  });

  it("T7: ein Erfolgsstatus mit UNLESBAREM Rumpf gilt NICHT als Erfolg", async () => {
    // Was nicht eindeutig Erfolg meldet, ist keiner. Ein nicht-JSON-Rumpf auf einer
    // 200 traegt keinen code — er faellt in denselben Ausgang wie eine Ablehnung.
    // DER ROHE RUMPF GEHT DABEI NICHT INS LOG: nur Status, Content-Type und Laenge.
    const html = `<html>error for ${TOKEN}</html>`;
    global.fetch = vi.fn(async () =>
      new Response(html, {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      }),
    ) as unknown as typeof fetch;

    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const line = logLines()[0];
    expect(line).toContain("non-JSON body suppressed");
    expect(line).toContain(`len=${html.length}`);
    expect(line).toContain("type=text/html; charset=utf-8");
    expect(line).not.toContain(TOKEN);
    expect(line).not.toContain("error for");
  });
});

// ===========================================================================
// DER RIEGEL
// ===========================================================================

describe("TikTok — kein Aufruf ohne Identitaet", () => {
  it("T8: nur die IP -> KEIN Aufruf", async () => {
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, "");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("T9: nur der User-Agent -> KEIN Aufruf", async () => {
    // GETRENNT von T8 und nicht in einer Tabelle: Ein Aufspalten des Riegels in zwei
    // unabhaengige if waere sonst nur zur Haelfte sichtbar.
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, undefined, UA);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("T10: GEGENPROBE — beide da -> genau EIN Aufruf mit beiden Werten", async () => {
    // Ohne diese Gegenprobe waeren T8 und T9 auch dann gruen, wenn der Adapter
    // ueberhaupt nichts sendete.
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(sentEvent().user).toEqual({ ip: IP, user_agent: UA });
  });
});

// ===========================================================================
// DIE EREIGNIS-ABBILDUNG
// ===========================================================================

describe("TikTok — die Ereignis-Abbildung", () => {
  it("T11: KREUZVERGLEICH — die Tabelle deckt unsere Standardliste GENAU ab", async () => {
    // DER EINZIGE MOEGLICHE WAECHTER, und der Grund gehoert in seinen Kommentar:
    // Am DRAHT sind Identitaet und Durchreiche NICHT unterscheidbar — beide senden
    // denselben Namen. Ein Test auf die Nutzlast kann also nicht bemerken, dass ein
    // Name gar nicht in der Tabelle steht.
    //
    // WOGEGEN ER SCHUETZT: Wird META_STANDARD_EVENTS (tracking/meta.ts) um einen
    // neunten Namen erweitert, ist er bei diesem Anbieter NICHT automatisch
    // Standard — er ginge als CUSTOM hinaus und waere dort nicht optimierungsfaehig.
    // Die Quittung des Anbieters sagt das NICHT (gemessen: code 0 fuer beides), nur
    // seine Oberflaeche tut es. Dieser Test ist die Stelle, an der eine solche
    // Erweiterung auffaellt.
    expect([...EVENT_MAP.keys()].sort()).toEqual([...META_STANDARD_EVENTS].sort());
  });

  it("T12: die Abbildung ist heute die IDENTITAET — jeder Standardname reist unveraendert", async () => {
    // GEMESSENER ZUSTAND vom 2026-08-11, KEINE Zusage: alle acht sind dort
    // Standard-Ereignisse. Der Anbieter normalisiert zwischen Alt- und Neunamen und
    // kann das jederzeit aendern — dann steht hier eine echte Abbildung.
    for (const name of META_STANDARD_EVENTS) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToTiktok(CONFIG, name, "evt-1", {}, IP, UA);
      expect(sentEvent().event).toBe(name);
    }
  });

  it("T13: ein NICHT abbildbarer Name reist UNVERAENDERT (Durchreiche)", async () => {
    // Ein Sammelname waere der einzige STILLE Ausgang; gar nicht zu senden naehme
    // dem Betreiber die Entscheidung ueber SEIN Konto.
    await forwardToTiktok(CONFIG, "ViewPricing", "evt-1", {}, IP, UA);
    expect(sentEvent().event).toBe("ViewPricing");
  });

  it("T14: ein PROTOTYP-Name gilt als NICHT abbildbar", async () => {
    // Der Name kommt aus /api/e und ist damit UNTRUSTED. Auf einem Objektliteral
    // lieferte TABELLE["constructor"] einen wahrheitsfaehigen Wert aus
    // Object.prototype — der Name gaelte als abgebildet und ginge als
    // Funktionsobjekt weiter. DER EINZIGE TEST, DER DIE WAHL DER NACHSCHLAGEFORM
    // (Map statt Objektliteral) UEBERHAUPT PRUEFT.
    for (const name of ["constructor", "toString", "valueOf", "__proto__"]) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToTiktok(CONFIG, name, "evt-1", {}, IP, UA);
      expect(sentEvent().event).toBe(name);
      expect(typeof sentEvent().event).toBe("string");
    }
  });
});

// ===========================================================================
// DIE NUTZLAST UND DER ENDPUNKT
// ===========================================================================

describe("TikTok — Nutzlast, Endpunkt und Testmodus", () => {
  it("T15: die Pflichtfelder stehen, wo der Anbieter sie erwartet", async () => {
    await forwardToTiktok(
      CONFIG,
      "Purchase",
      "evt-42",
      { value: 49.9, currency: "EUR", eventSourceUrl: "https://kunde.de/lp" },
      IP,
      UA,
    );

    const payload = sentPayload();
    // Kennung und Quelle stehen OBEN, die Ereignisse im Array.
    expect(payload.event_source).toBe("web");
    expect(payload.event_source_id).toBe(CONFIG.pixelId);
    expect((payload.data as unknown[]).length).toBe(1);

    const ev = sentEvent();
    expect(ev.event_id).toBe("evt-42");
    expect(typeof ev.event_time).toBe("number");
    expect(Number.isInteger(ev.event_time)).toBe(true);
    expect(ev.page).toEqual({ url: "https://kunde.de/lp" });
    // DER WERT REIST ALS ZAHL — wer das Muster des zweiten Adapters abschreibt,
    // sendet eine Zeichenkette.
    expect(ev.properties).toEqual({ value: 49.9, currency: "EUR" });
  });

  it("T16: NaN und Infinity gehen NICHT durch, und ohne Wert entsteht kein properties", async () => {
    for (const v of [NaN, Infinity, -Infinity]) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToTiktok(CONFIG, "Purchase", "evt-1", { value: v }, IP, UA);
      expect(sentEvent().properties).toBeUndefined();
    }
  });

  it("T17: das Geheimnis reist in der EIGENEN Kopfzeile, NICHT in der URL", async () => {
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    const [url, init] = fetchCalls()[0];
    expect(url).toBe("https://business-api.tiktok.com/open_api/v1.3/event/track/");
    // KEIN Bearer-Praefix (gemessen), und die Kennung steht im RUMPF, nicht im Pfad.
    expect(init.headers["Access-Token"]).toBe(CONFIG.token);
    expect(init.headers["Content-Type"]).toBe("application/json");
    expect(url).not.toContain(CONFIG.token);
    expect(url).not.toContain(CONFIG.pixelId);
  });

  it("T18: der Testmodus ist standardmaessig AUS und kommt NICHT aus Metas Variable", async () => {
    // Der Code des Anbieters WECHSELT pro Sitzung — er wird nie hinterlegt, sondern
    // je Aufruf aus der Umgebung gelesen. Die Kopplung an die Variable eines anderen
    // Ziels darf nicht entstehen.
    vi.stubEnv("META_TEST_EVENT_CODE", "TEST12345");
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(sentPayload().test_event_code).toBeUndefined();

    vi.stubEnv("TIKTOK_TEST_EVENT_CODE", "TT-ERFUNDEN-1");
    global.fetch = vi.fn(async () =>
      jsonResponse(okBody()),
    ) as unknown as typeof fetch;
    await forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(sentPayload().test_event_code).toBe("TT-ERFUNDEN-1");
  });
});

// ===========================================================================
// DER VERTRAG: SIE WIRFT NIE
// ===========================================================================

describe("TikTok — sie wirft nie", () => {
  it("T19: ein werfender fetch verlaesst die Funktion nicht", async () => {
    global.fetch = vi.fn(async () => {
      throw new TypeError("network down");
    }) as unknown as typeof fetch;

    await expect(
      forwardToTiktok(CONFIG, "Purchase", "evt-1", {}, IP, UA),
    ).resolves.toBeUndefined();
    expect(logLines()[0]).toContain("TypeError");
  });

  it("T20: ein WERFENDER GETTER im Body verlaesst die Funktion nicht", async () => {
    // Der heutige Aufrufer kann diesen Fall nicht erzeugen (ein Body aus JSON.parse
    // traegt keine Getter) — genau darin liegt der Wert: Der Test nagelt den
    // VERTRAG fest, nicht den heutigen Aufrufer.
    const body = {
      get eventSourceUrl(): string {
        throw new Error("boom");
      },
    };

    await expect(
      forwardToTiktok(CONFIG, "Purchase", "evt-1", body, IP, UA),
    ).resolves.toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(logLines()[0]).toContain("Error");
  });
});
