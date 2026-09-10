import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

import { forwardToPinterest } from "./pinterest-forward";

// ===========================================================================
// DER ADAPTER FUER DAS ZWEITE ZIEL (Phase 11, zehnte Scheibe).
//
// DIE GRENZE, DIE VOR ALLEN TESTS STEHT: `fetch` ist gestellt, und die Angaben
// ueber den Anbieter sind ANBIETER-DOKU (2026-08-10), nicht gemessen. GEMESSEN
// wurde am 2026-08-07 ausschliesslich der FEHLER-Rumpf bei ungueltigem Geheimnis;
// DER ERFOLGS-RUMPF IST NIE GEMESSEN WORDEN — und genau er traegt die Auswertung,
// die hier geprueft wird.
// DIESE DATEI MISST ALSO DIE TREUE DES CODES ZU EINER TRANSKRIPTION, NICHT ZUM
// VERTRAG. Ist eine Angabe falsch aufgenommen, sind diese Tests GRUEN und der
// Adapter FALSCH — und nichts in dieser Scheibe kann es entdecken, weil sie keinen
// Aufrufer hat. Die erste Gelegenheit zur Pruefung ist die ZWOELFTE Scheibe.
// ===========================================================================

const CONFIG = { adAccountId: "549755885175", token: "pina_LANGES_GEHEIMNIS_AAAA1234" };
const IP = "203.0.113.7";
const UA = "Mozilla/5.0 (Test)";

/** Ein Erfolgs-Rumpf mit genau einem verarbeiteten Ereignis. */
function okBody(extra: Record<string, unknown> = {}) {
  return {
    num_events_received: 1,
    num_events_processed: 1,
    events: [{ status: "processed", ...extra }],
  };
}

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), { status });
}

function textResponse(text: string, status = 200): Response {
  return new Response(text, { status });
}

function fetchCalls() {
  return (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls as [
    string,
    { headers: Record<string, string>; body: string },
  ][];
}

/** Die gesendete Nutzlast des ersten Aufrufs, geparst. */
function sentEvent(): Record<string, unknown> {
  const parsed = JSON.parse(fetchCalls()[0][1].body) as {
    data: Record<string, unknown>[];
  };
  return parsed.data[0];
}

/** Alle Zeilen, die in console.error gelandet sind. */
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
  // ACHTUNG, in diesem Projekt schon DREIMAL teuer geworden: clearAllMocks leert
  // die AUFRUFE, nicht die Implementierungen und nicht die Once-Warteschlange. Ein
  // Test, der abbricht, BEVOR er seinen mockResolvedValueOnce verbraucht, vererbt
  // ihn an den naechsten Test, der dieselbe Attrappe ruft — in der elften Scheibe
  // hat genau das zwei fremde Tests rot gemacht, die mit der Mutation nichts zu tun
  // hatten (eine KASKADE, keine Abdeckung).
  // DER STRUKTURELLE RIEGEL DAGEGEN STEHT IM beforeEach: global.fetch wird dort bei
  // JEDEM Test NEU zugewiesen. Eine unverbrauchte Once-Warteschlange stirbt mit der
  // alten Attrappe und kann keinen Nachfolger erreichen. restoreAllMocks setzt
  // zusaetzlich den console-Spion zurueck.
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

// ===========================================================================
// DIE DREI AUSGAENGE DES RUMPF-LESERS
// ===========================================================================

describe("Pinterest-Adapter — die DREI Ausgaenge des Rumpf-Lesers", () => {
  it("T1: verarbeitet, keine Warnung -> KEINE Meldung", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(logLines()).toEqual([]);
  });

  it("T2: verarbeitet MIT Warnung -> eigene Meldung, vom Fehlschlag unterscheidbar", async () => {
    // DER DRITTE AUSGANG. Ein Ereignis kann "processed" sein UND eine Warnung
    // tragen — sie ist weder Fehler noch stiller Erfolg. Faellt bei M2.
    global.fetch = vi.fn(async () =>
      jsonResponse(okBody({ warning_message: "deprecated field ignored" })),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("Pinterest forward warning");
    expect(lines[0]).toContain("deprecated field ignored");
    // UNTERSCHEIDBARKEIT ist die eigentliche Zusage: eine Warnung darf nicht wie
    // eine Ablehnung aussehen.
    expect(lines[0]).not.toContain("rejected");
  });

  it("T3: HTTP-ERFOLG mit failed im Rumpf -> Fehlschlag (DIE TRAGENDE ANFORDERUNG)", async () => {
    // Der Anbieter meldet eine abgelehnte Nutzlast mit ERFOLGSSTATUS. Wer nur den
    // Status liest, liesse sie als Erfolg durchgehen — der erste Adapter ist genau
    // dagegen blind. Faellt bei M1.
    global.fetch = vi.fn(async () =>
      jsonResponse({
        num_events_received: 1,
        num_events_processed: 0,
        events: [{ status: "failed", error_message: "unknown event name" }],
      }),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "MeinName", "evt-1", {}, IP, UA);

    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("rejected");
    expect(lines[0]).toContain("processed=0");
    expect(lines[0]).toContain("unknown event name");
  });

  it("T4: echter Fehlerstatus -> Fehlschlag aus code und status", async () => {
    global.fetch = vi.fn(async () =>
      jsonResponse({ code: 2, message: "Authentication failed.", status: "failure" }, 401),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("HTTP 401");
    expect(lines[0]).toContain("code=2");
    expect(lines[0]).toContain("status=failure");
  });
});

// ===========================================================================
// DIE UNVOLLSTAENDIGEN RUMPFFORMEN — jede einzeln
// ===========================================================================

describe("Pinterest-Adapter — unlesbare und unvollstaendige Rumpfformen sind FEHLSCHLAG", () => {
  // "Was nicht eindeutig Erfolg meldet, ist keiner." Jede dieser Formen hat einen
  // ERFOLGSSTATUS — sie unterscheiden sich allein im Rumpf.
  const faelle: Array<[string, () => Response]> = [
    ["leerer Rumpf", () => textResponse("")],
    ["kein JSON", () => textResponse("<html>gateway error</html>")],
    [
      "JSON ohne Ereignis-Array",
      () => jsonResponse({ num_events_received: 1, num_events_processed: 1 }),
    ],
    [
      "Array mit NULL Eintraegen",
      () => jsonResponse({ num_events_received: 1, num_events_processed: 1, events: [] }),
    ],
    [
      "Array mit MEHR als einem Eintrag",
      () =>
        jsonResponse({
          num_events_received: 1,
          num_events_processed: 1,
          events: [{ status: "processed" }, { status: "processed" }],
        }),
    ],
    [
      "Zaehlwerte fehlen",
      () => jsonResponse({ events: [{ status: "processed" }] }),
    ],
    [
      "Widerspruch: Zaehler meldet Erfolg, Status meldet Fehlschlag",
      () =>
        jsonResponse({
          num_events_received: 1,
          num_events_processed: 1,
          events: [{ status: "failed" }],
        }),
    ],
  ];

  for (const [name, mk] of faelle) {
    it(`T5 (${name}) -> Fehlschlag, genau eine Meldung`, async () => {
      global.fetch = vi.fn(async () => mk()) as unknown as typeof fetch;
      await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
      const lines = logLines();
      expect(lines).toHaveLength(1);
      expect(lines[0]).toContain("rejected");
    });
  }
});

// ===========================================================================
// DAS IDENTITAETS-PAAR
// ===========================================================================

describe("Pinterest-Adapter — das Identitaets-Paar gilt ganz oder gar nicht", () => {
  it("T6: nur die IP -> KEIN Aufruf", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, "");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("T7: nur der User-Agent -> KEIN Aufruf", async () => {
    // GETRENNT von T6 und nicht in einem it.each: Ein Aufspalten des Riegels in
    // zwei unabhaengige if — das Muster des ersten Adapters — waere sonst nur zur
    // Haelfte sichtbar. Faellt zusammen mit T6 bei M5.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, undefined, UA);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("T8: beide da -> Aufruf mit BEIDEN Feldern, roh und ungehasht", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(sentEvent().user_data).toEqual({
      client_ip_address: IP,
      client_user_agent: UA,
    });
  });
});

// ===========================================================================
// DIE UEBERSETZUNGSTABELLE
// ===========================================================================

describe("Pinterest-Adapter — die Uebersetzungstabelle", () => {
  it("T9: ein abbildbarer Name wird UEBERSETZT", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(sentEvent().event_name).toBe("checkout");
  });

  it("T9b: alle acht Standard-Namen haben eine Abbildung", async () => {
    const erwartet: Array<[string, string]> = [
      ["Purchase", "checkout"],
      ["Lead", "lead"],
      ["InitiateCheckout", "initiate_checkout"],
      ["AddToCart", "add_to_cart"],
      ["ViewContent", "view_content"],
      ["CompleteRegistration", "signup"],
      ["Contact", "contact"],
      ["Subscribe", "subscribe"],
    ];
    for (const [unser, ihrer] of erwartet) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToPinterest(CONFIG, unser, "evt-1", {}, IP, UA);
      expect(sentEvent().event_name).toBe(ihrer);
    }
  });

  it("T10: ein NICHT abbildbarer Name reist UNVERAENDERT", async () => {
    await forwardToPinterest(CONFIG, "ViewPricing", "evt-1", {}, IP, UA);
    expect(sentEvent().event_name).toBe("ViewPricing");
  });

  it("T10b: auch ein Name, der die ZEICHEN-REGEL des Anbieters verletzt, reist unveraendert", async () => {
    // Der Betreiber kann heute jeden nicht-leeren Text verdrahten — die einzige
    // Pruefung im Panel ist Nicht-Leerheit. Ein solcher Name wird abgelehnt, ABER
    // LAUT. Ihn hier auszusortieren waere der STILLE Ausgang.
    await forwardToPinterest(CONFIG, "Kauf abgeschlossen", "evt-1", {}, IP, UA);
    expect(sentEvent().event_name).toBe("Kauf abgeschlossen");
  });

  it("T11: ein PROTOTYP-Name gilt als NICHT abbildbar", async () => {
    // Der Name kommt aus einem anonymen Endpunkt. Auf einem gewoehnlichen
    // Objektliteral lieferte TABELLE["constructor"] einen wahrheitsfaehigen Wert
    // aus Object.prototype — der Name gaelte als abgebildet und ginge als
    // Funktionsobjekt weiter. DER EINZIGE TEST, DER DIE WAHL DER NACHSCHLAGEFORM
    // (Map statt Objektliteral) UEBERHAUPT PRUEFT.
    for (const name of ["constructor", "toString", "valueOf", "__proto__"]) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToPinterest(CONFIG, name, "evt-1", {}, IP, UA);
      expect(sentEvent().event_name).toBe(name);
      expect(typeof sentEvent().event_name).toBe("string");
    }
  });
});

// ===========================================================================
// DIE BEREINIGUNG — AUF BEIDEN PFADEN
// ===========================================================================

describe("Pinterest-Adapter — kein Log fuehrt das Geheimnis", () => {
  it("T12: JSON-PFAD — eine zurueckgespiegelte Zeichenfolge wird geschwaerzt", async () => {
    // DER GEMESSENE FALL (Handmessung 2026-08-07): Die Fehlerantwort auf ein
    // defektes Token spiegelt den uebergebenen Token zurueck. Faellt bei M3a.
    global.fetch = vi.fn(async () =>
      jsonResponse(
        { code: 2, message: `Invalid token: ${CONFIG.token} — check your app`, status: "failure" },
        401,
      ),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    // POSITIVKONTROLLE ZUERST (Projektregel zu Waechtern, die Abwesenheit pruefen):
    // Ohne sie waere ein leerer oder falsch gewaehlter Kanal von einem echten
    // Nicht-Treffer nicht zu unterscheiden.
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("HTTP 401");
    expect(lines[0]).toContain("<redacted>");
    // Und erst dann die eigentliche Zusage.
    expect(lines[0]).not.toContain(CONFIG.token);
  });

  it("T12b: der Bereiniger greift auch in error_message und warning_message", async () => {
    // ER GILT FUER ALLE DREI FREITEXTE, nicht nur fuer message.
    global.fetch = vi.fn(async () =>
      jsonResponse({
        num_events_received: 1,
        num_events_processed: 1,
        events: [{ status: "processed", warning_message: `echo ${CONFIG.token}` }],
      }),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("warning");
    expect(lines[0]).toContain("<redacted>");
    expect(lines[0]).not.toContain(CONFIG.token);
  });

  it("T13: NICHT-JSON-PFAD — der rohe Rumpf geht NICHT ins Log", async () => {
    // DIE BREITERE DER BEIDEN OEFFNUNGEN. Der erste Adapter schreibt hier
    // text.slice(0, 200), also alles was zurueckkam. Dieses Muster wandert
    // ausdruecklich NICHT mit. Faellt bei M3b.
    const html = `<html><body>error for ${CONFIG.token} at gateway</body></html>`;
    global.fetch = vi.fn(async () =>
      textResponse(html, 502),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);

    const lines = logLines();
    // POSITIVKONTROLLE: der Pfad wurde wirklich betreten und meldet Laenge + Status.
    expect(lines).toHaveLength(1);
    expect(lines[0]).toContain("non-JSON body");
    expect(lines[0]).toContain(`len=${html.length}`);
    // Weder das Geheimnis NOCH der Rohtext.
    expect(lines[0]).not.toContain(CONFIG.token);
    expect(lines[0]).not.toContain("gateway");
  });

  it("T13b: KEINE Logzeile fuehrt jemals den Header oder die Nutzlast", async () => {
    global.fetch = vi.fn(async () =>
      jsonResponse({ code: 2, message: "nope", status: "failure" }, 401),
    ) as unknown as typeof fetch;

    await forwardToPinterest(CONFIG, "Purchase", "evt-1", { value: 49.9 }, IP, UA);

    const alle = logLines().join(" | ");
    expect(alle).not.toContain(CONFIG.token);
    expect(alle).not.toContain("Bearer");
    expect(alle).not.toContain(IP);
    expect(alle).not.toContain(UA);
  });
});

// ===========================================================================
// DIE NUTZLAST
// ===========================================================================

describe("Pinterest-Adapter — die Nutzlast", () => {
  it("T14: der Wert reist als ZEICHENKETTE, nicht als Zahl", async () => {
    // Der erste Adapter sendet eine Zahl. Faellt bei M4.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", { value: 49.9, currency: "EUR" }, IP, UA);
    const custom = sentEvent().custom_data as Record<string, unknown>;
    expect(custom.value).toBe("49.9");
    expect(typeof custom.value).toBe("string");
    expect(custom.currency).toBe("EUR");
  });

  it("T14b: NaN und Infinity gehen NICHT durch — der Rand des Vorbilds wandert nicht mit", async () => {
    // typeof NaN === "number" und typeof Infinity === "number". Der erste Adapter
    // prueft nur den Typ und laesst beide durch.
    for (const v of [NaN, Infinity, -Infinity]) {
      global.fetch = vi.fn(async () =>
        jsonResponse(okBody()),
      ) as unknown as typeof fetch;
      await forwardToPinterest(CONFIG, "Purchase", "evt-1", { value: v }, IP, UA);
      expect(sentEvent().custom_data).toBeUndefined();
    }
  });

  it("T15: action_source ist 'web', NICHT Metas 'website'", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(sentEvent().action_source).toBe("web");
  });

  it("T15b: die Pflichtfelder sind vollstaendig, partner_name ist 'direct'", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-42", {}, IP, UA);
    const ev = sentEvent();
    expect(ev.event_name).toBe("checkout");
    expect(ev.event_id).toBe("evt-42");
    expect(typeof ev.event_time).toBe("number");
    expect(Number.isInteger(ev.event_time)).toBe(true);
    expect(ev.partner_name).toBe("direct");
    // Die Nutzlast ist ein Objekt mit dem Schluessel "data" und GENAU EINEM Eintrag.
    const parsed = JSON.parse(fetchCalls()[0][1].body) as { data: unknown[] };
    expect(parsed.data).toHaveLength(1);
  });

  it("T15c: KEIN em, KEIN hashed_maids, KEIN opt_out", async () => {
    // em beruehrte die Datenklassen-Grenze des Projekts; opt_out waere eine
    // Behauptung, die aus diesem Feld nicht folgt — die Einwilligung ist VOR dem
    // Adapter entschieden.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    const ev = sentEvent();
    const ud = ev.user_data as Record<string, unknown>;
    expect(ud.em).toBeUndefined();
    expect(ud.hashed_maids).toBeUndefined();
    expect(ev.opt_out).toBeUndefined();
  });
});

// ===========================================================================
// ENDPUNKT, KENNUNG IM PFAD, TESTMODUS
// ===========================================================================

describe("Pinterest-Adapter — Endpunkt, Kennung und Testmodus", () => {
  it("T16: der Endpunkt traegt die Kennung im PFAD und das Geheimnis im HEADER", async () => {
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    const [url, init] = fetchCalls()[0];
    expect(url).toBe(
      "https://api.pinterest.com/v5/ad_accounts/549755885175/events",
    );
    expect(init.headers.Authorization).toBe(`Bearer ${CONFIG.token}`);
    expect(init.headers["Content-Type"]).toBe("application/json");
    // DAS GEHEIMNIS STEHT NIE IN DER URL — anders als beim ersten Adapter.
    expect(url).not.toContain(CONFIG.token);
  });

  it("T16b: eine Kennung mit Pfad-Trennzeichen wird KODIERT", async () => {
    // Der Betreiber kann heute jeden Text eintragen; das Feld traegt keine Pruefung.
    await forwardToPinterest(
      { adAccountId: "12/../evil?x=1", token: "t" },
      "Purchase",
      "evt-1",
      {},
      IP,
      UA,
    );
    const [url] = fetchCalls()[0];
    expect(url).toBe(
      "https://api.pinterest.com/v5/ad_accounts/12%2F..%2Fevil%3Fx%3D1/events",
    );
  });

  // ===================================================================
  // DIE DREI T17-LAEUFE, NACHGEZOGEN MIT DER SCHEIBE 11.3d.
  //
  // T17 UND T17b SIND ERSETZT, NICHT GESTRICHEN — dieselbe Frage, andere Quelle.
  // `PINTEREST_TEST_MODE` ist mit dieser Scheibe entfallen (Entscheidung (13)); haette
  // man nur T17b angefasst, bliebe T17 als Waechter stehen, der an der ABWESENHEIT
  // einer Variablen haengt, die es nicht mehr gibt: TRIVIAL WAHR und weiter gruen
  // meldend (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI
  // WEISEN HOHL", Fall (1) — ihr Gegenstand wird entfernt).
  //
  // T17c IST ENTFALLEN, MIT ZEIGER STATT ERSATZ. Er behauptete, METAS Umgebungsvariable
  // schalte hier nichts. Diese Datei liest seit 11.3d GAR KEINE Umgebungsvariable mehr
  // — der Lauf waere damit auf derselben Achse trivial wahr wie T17 es waere. Seine
  // Achse in der neuen Gestalt lautet "der Testzustand des einen Ziels faerbt den
  // Aufruf eines anderen nicht", und die ist am ADAPTER nicht messbar: Metas Zustand
  // ist hier nicht sichtbar, es gibt nur den eigenen Parameter.
  // GEPRUEFT UND GEFUNDEN (GEMESSEN am Repo, CC, 2026-09-10): Die Achse steht
  // BEREITS — als TM7 in capi/ingest.test-mode.test.ts ("ein Testzustand fuer meta
  // setzt bei tiktok NICHTS"), also genau dort, wo resolution.testMode je Ziel
  // nachgeschlagen wird. Ein zweiter Lauf daneben waere eine Doppelung, und eine
  // Doppelung ist schlechter als eine Streichung.
  // ===================================================================

  it("T17: der Testmodus ist standardmaessig AUS — OHNE Parameter kein Anhang", async () => {
    // ERSETZT T17. Der Gegenstand ist derselbe (standardmaessig aus), die Quelle eine
    // andere: nicht mehr die fehlende Umgebungsvariable, sondern der fehlende
    // Parameter. Der Aufruf laesst ihn hier bewusst GANZ weg — so ruft ihn der Eintrag
    // dieses Ziels in FORWARDER_BY_TARGET (capi/ingest.ts) heute auch.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA);
    expect(fetchCalls()[0][0]).not.toContain("test=true");
  });

  it("T17a2: ein AUSDRUECKLICHES `false` haengt ebenfalls nichts an", async () => {
    // ER TRENNT "SIEHT DEN WERT" VON "SIEHT DIE ANWESENHEIT DES PARAMETERS", und das ist
    // sein ganzer Zweck: T17 uebergibt gar nichts, T17b uebergibt `true`. Zwischen
    // beiden liegt eine Bauform, die keiner von ihnen faengt — eine Pruefung auf
    // `testMode !== undefined`. Sie waere an T17 und T17b gruen und schaltete den
    // Testmodus bei JEDEM uebergebenen Wert ein, auch bei `false`.
    // DIE VERWECHSLUNG HAT EINEN NAMEN UND EINEN STILLEN AUSGANG: Ein Schalter, der auf
    // die ANWESENHEIT einer Angabe prueft statt auf ihren WERT, wird durch "false"
    // EINGESCHALTET statt ausgeschaltet. Wer ihn ausschalten will und deshalb "false"
    // eintraegt, erreicht das Gegenteil — und nichts wird davon rot: Der Aufruf gelingt,
    // der Anbieter antwortet mit Erfolg, und jede echte Conversion laeuft in seine
    // Sandbox statt in die Zahlen des Werbekontos.
    // DIE ABGESCHAFFTE UMGEBUNGSVARIABLE `PINTEREST_TEST_MODE` WAR GENAU SO GEBAUT — sie
    // schaltete bei JEDEM nicht-leeren Wert ein, "false" und "0" eingeschlossen, und
    // ausgeschaltet wurde nur durch ihr Entfernen. Dort war die Bauform noch vertretbar,
    // weil eine Variable ohne Wert nicht existiert; an einem BOOLEAN-Parameter ist sie es
    // nicht mehr. DIE FALLE VERSCHWINDET NICHT DADURCH, DASS DIE VARIABLE FAELLT — sie
    // wandert an den Parameter, und hier steht ihr Waechter.
    // ROT DURCH: `testMode !== undefined ? "?test=true" : ""` in testModeQuery.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA, false);
    expect(fetchCalls()[0][0]).not.toContain("test=true");
  });

  it("T17b: Parameter `true` -> der Anhang lautet GENAU '?test=true'", async () => {
    // ERSETZT T17b. DER WORTLAUT WIRD FESTGENAGELT UND NICHT NUR ENTHALTEN GEPRUEFT:
    // "?test=true" ist die am 2026-09-10 GEGEN DEN ANBIETER GEMESSENE Form (GEMESSEN
    // LIVE, Stefan). Ein toContain liesse eine veraenderte Schreibung durch, solange
    // die Zeichenfolge irgendwo vorkaeme — etwa "?is_test=TRUE&test=true" oder einen
    // zweiten Parameter davor. Der zweite in der Doku genannte Name `is_test` ist
    // damit NICHT ausgeschlossen, sondern fuer den Bau entbehrlich.
    await forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA, true);
    expect(fetchCalls()[0][0]).toBe(
      "https://api.pinterest.com/v5/ad_accounts/549755885175/events?test=true",
    );
  });
});

// ===========================================================================
// DER VERTRAG: SIE WIRFT NIE
// ===========================================================================

describe("Pinterest-Adapter — sie wirft nie", () => {
  it("T18: ein werfender fetch verlaesst die Funktion nicht", async () => {
    global.fetch = vi.fn(async () => {
      throw new TypeError("network down");
    }) as unknown as typeof fetch;

    await expect(
      forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA),
    ).resolves.toBeUndefined();
    expect(logLines()[0]).toContain("TypeError");
  });

  it("T18b: ein Abbruch verlaesst die Funktion nicht und wird als AbortError sichtbar", async () => {
    global.fetch = vi.fn(async () => {
      throw new DOMException("Aborted", "AbortError");
    }) as unknown as typeof fetch;

    await expect(
      forwardToPinterest(CONFIG, "Purchase", "evt-1", {}, IP, UA),
    ).resolves.toBeUndefined();
    expect(logLines()[0]).toContain("AbortError");
  });

  it("T19: ein WERFENDER GETTER im Body verlaesst die Funktion nicht", async () => {
    // DER VERTRAGS-TEST, und er prueft bewusst einen Fall, den der HEUTIGE Aufrufer
    // gar nicht erzeugen kann: Ein Body aus JSON.parse traegt keine Getter. Genau
    // darin liegt sein Wert — er nagelt den VERTRAG fest, nicht den heutigen
    // Aufrufer, und macht jede spaetere Verletzung LAUT.
    // Beim ersten Adapter waere derselbe Fall ein Wurf: dort liegt der Nutzlast-Bau
    // VOR dem try. Genau diesen Unterschied haelt dieser Test.
    const body = {
      get eventSourceUrl(): string {
        throw new Error("boom");
      },
    };

    await expect(
      forwardToPinterest(CONFIG, "Purchase", "evt-1", body, IP, UA),
    ).resolves.toBeUndefined();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(logLines()[0]).toContain("Error");
  });
});
