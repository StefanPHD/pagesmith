import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
// META_TARGET kommt seit Scheibe 7 mit: der Handler waehlt seinen Adapter darueber.
// Der Wert steht hier als Literal, damit der Mock die Modul-FORM abbildet.
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  META_TARGET: "meta",
}));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

const { after, scheduled } = vi.hoisted(() => {
  const scheduled: Array<() => Promise<void> | void> = [];
  return {
    scheduled,
    after: vi.fn((cb: () => Promise<void> | void) => {
      scheduled.push(cb);
    }),
  };
});
vi.mock("next/server", () => ({ after }));

const { persistEvent } = vi.hoisted(() => ({ persistEvent: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent }));

import { handleIngest } from "./ingest";
// BEWUSST die ECHTEN Konstanten, KEINE Kopien: Feldname und Ziel-Schluessel muessen
// dieselben sein, die Erzeuger und Leser benutzen. Handgeschriebene Literale hier
// wuerden eine Umbenennung durchlassen, gegen die dieser Test schuetzen soll.
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { META_CONSENT_TARGET } from "@/lib/tracking/consent";
import { BROWSER_CONFIRM_MARKER, PAGEVIEW_EVENT } from "@/lib/analytics/events";

// ===========================================================================
// DAS EINWILLIGUNGS-SIGNAL IM INGEST (Phase 11, fuenfte Scheibe).
//
// Die REGEL steht in tracking/consent-wire.test.ts. HIER steht die WIRKUNG im
// Handler: Wird geforwardet oder nicht, und was passiert mit allem anderen.
//
// WARUM DIESE TESTS UEBERHAUPT NOETIG SIND, obwohl der Leser schon geprueft ist:
// Bei EINEM Ziel entsteht der Conversion-Beacon nur, wenn Meta erlaubt ist — das
// Feld kann im BROWSER also nie ein Verbot tragen. Der Verbots-Zweig ist damit
// ueber einen echten Besucher nicht erreichbar; er ist hier und ueber einen
// handgebauten Request pruefbar, sonst nirgends.
// ===========================================================================

/** Ein Beacon-Body. `wire` fehlt ganz, wenn nichts uebergeben wird. */
function makeRequest(
  event: string,
  wire?: { value: unknown },
  extra: Record<string, unknown> = {}
): Request {
  const body: Record<string, unknown> = {
    trackingKey: "tk-abc",
    eventID: "evt-123",
    event,
    ...extra,
  };
  if (wire) body[CONSENT_WIRE_FIELD] = wire.value;
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

const ERLAUBT = { value: { [META_CONSENT_TARGET]: true } };
const VERBOTEN = { value: { [META_CONSENT_TARGET]: false } };

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

/** Ging ein Forward an Metas Graph-API raus? */
function forwarded(): boolean {
  const calls = (global.fetch as unknown as { mock: { calls: unknown[][] } }).mock.calls;
  return calls.some(([url]) => String(url).includes("graph.facebook.com"));
}

beforeEach(() => {
  scheduled.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    blocked: false,
    abTestActive: false,
    // SEIT SCHEIBE 1b-2a IM TYP NICHT OPTIONAL — s. den Kommentar an
    // TrackingKeyResolution.renewable in capi/token.ts.
    renewable: [],
    targets: [
      { target: "meta", config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" } },
    ],
  });
  persistEvent.mockResolvedValue(undefined);
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("(1) FELD ABWESEND -> Forward laeuft wie vor dieser Scheibe", () => {
  it("ein Beacon ohne das Feld wird unveraendert geforwardet", async () => {
    // DIE TEUERSTE ZUSAGE DER SCHEIBE, im Handler. ROT DURCH M1 (Alt-Seiten-
    // Unterscheidung umgedreht) — und dann waere JEDE bereits publizierte
    // Kundenseite betroffen, lautlos.
    const res = await handleIngest(makeRequest("Purchase"));
    expect(res.status).toBe(204);
    expect(forwarded()).toBe(true);
  });
});

describe("(2) FELD MIT ERLAUBNIS -> Forward laeuft, Nutzlast unveraendert", () => {
  it("forwardet, und die Meta-Nutzlast traegt das Signal NICHT", async () => {
    // ZWEI ACHSEN IN EINEM TEST, und das ist hier richtig: Die zweite ist die
    // Invariante "Draht zu Meta unveraendert". Ein Signal, das versehentlich in die
    // Meta-Nutzlast wanderte, waere eine Datenweitergabe an einen Dritten.
    const res = await handleIngest(makeRequest("Purchase", ERLAUBT));
    expect(res.status).toBe(204);
    expect(forwarded()).toBe(true);

    const calls = (global.fetch as unknown as { mock: { calls: [string, RequestInit][] } })
      .mock.calls;
    const forward = calls.find(([url]) => String(url).includes("graph.facebook.com"));
    const payload = JSON.parse(String(forward?.[1]?.body));
    expect(JSON.stringify(payload)).not.toContain(CONSENT_WIRE_FIELD);
    expect(payload.data[0].event_name).toBe("Purchase");
  });
});

describe("(3) FELD MIT VERBOT -> KEIN Forward, trotzdem leere 204", () => {
  it("kein Forward", async () => {
    // ROT DURCH: einen fehlenden oder invertierten Leser-Aufruf.
    await handleIngest(makeRequest("Purchase", VERBOTEN));
    expect(forwarded()).toBe(false);
  });

  it("die Antwort ist eine leere 204 — EIGENER WAECHTER", () => {
    // GETRENNTE ACHSE, ausdruecklich: "kein Forward" und "die Antwort bleibt
    // korrekt" sehen an einer Abwesenheits-Assertion identisch aus. Ein Wurf im
    // Guard ergaebe ebenfalls "kein Forward" — aber einen 500, und der leakte den
    // Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer.
    return handleIngest(makeRequest("Purchase", VERBOTEN)).then(async (res) => {
      expect(res.status).toBe(204);
      expect(await res.text()).toBe("");
    });
  });

  it("der Persist laeuft trotzdem — das Verbot gilt dem FORWARD, nicht der Messung", async () => {
    // Sonst waere aus einer Forward-Entscheidung stillschweigend eine zweite
    // Wirkung geworden (Analytics-Verlust), und die Scheibe waere nicht neutral.
    await handleIngest(makeRequest("Purchase", VERBOTEN));
    await runScheduled();
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "Purchase", source: "server" })
    );
  });
});

describe("(4) FELD IN KAPUTTER FORM -> kein Forward, kein Wurf, 204", () => {
  const kaputt: Array<[string, unknown]> = [
    ["null", null],
    ["Zahl", 1],
    ["Zeichenkette", META_CONSENT_TARGET],
    ["Array", [META_CONSENT_TARGET]],
    ["leeres Objekt", {}],
    ["fremder Schluessel", { pinterest: true }],
    ["truthy statt true", { [META_CONSENT_TARGET]: 1 }],
    ["boolean true", true],
  ];

  for (const [name, value] of kaputt) {
    it(`${name} -> 204 ohne Forward`, async () => {
      const res = await handleIngest(makeRequest("Purchase", { value }));
      expect(res.status).toBe(204);
      expect(forwarded()).toBe(false);
    });
  }

  it("ein sehr grosses Signal bricht nichts", async () => {
    const gross: Record<string, unknown> = {};
    for (let i = 0; i < 5000; i++) gross[`k${i}`] = true;
    const res = await handleIngest(makeRequest("Purchase", { value: gross }));
    expect(res.status).toBe(204);
    expect(forwarded()).toBe(false);
  });
});

describe("(5) PAGEVIEW -> unveraendert: nie Forward, aber IMMER Persist", () => {
  it("mit VERBOTS-Feld: kein Forward (wie immer), Persist findet statt", async () => {
    // DIESER TEST BEWACHT DIE PLATZIERUNG DES GUARDS, nicht die Regel: Wandert er
    // aus der Forward-Bedingung nach oben, verwirft er den PageView VOR dem
    // Persist — die Statistik verlöre still Seitenaufrufe, und zwar auf dem
    // VOLUMEN-Pfad. Das faengt kein anderer Test.
    await handleIngest(makeRequest(PAGEVIEW_EVENT, VERBOTEN));
    await runScheduled();
    expect(forwarded()).toBe(false);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: PAGEVIEW_EVENT, source: "server" })
    );
  });

  it("ohne Feld: unveraendert kein Forward, Persist findet statt", async () => {
    await handleIngest(makeRequest(PAGEVIEW_EVENT));
    await runScheduled();
    expect(forwarded()).toBe(false);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: PAGEVIEW_EVENT, source: "server" })
    );
  });
});

describe("(6) CONFIRM -> frueher Return unveraendert, Feld beliebiger Form egal", () => {
  it("mit VERBOTS-Feld: kein Forward, Persist als 'browser'", async () => {
    // ZWEITER WAECHTER DERSELBEN PLATZIERUNG, auf dem anderen Pfad: Ein Guard vor
    // dem Confirm-Return verschluckte die Bestaetigung — und ohne Bestaetigungen
    // zeigte die Adblocker-Verlustrate dauerhaft ~100 % Verlust.
    await handleIngest(
      makeRequest("Purchase", VERBOTEN, { obs: BROWSER_CONFIRM_MARKER })
    );
    await runScheduled();
    expect(forwarded()).toBe(false);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "Purchase", source: "browser" })
    );
  });

  it("mit ERLAUBNIS-Feld: ebenfalls kein Forward (der Pfad forwardet NIE)", async () => {
    // POSITIVKONTROLLE ZUR ABGRENZUNG: Der Confirm forwardet auch bei Erlaubnis
    // nicht — sonst entstuende ein Duplikat bei Meta unter derselben eventID.
    await handleIngest(
      makeRequest("Purchase", ERLAUBT, { obs: BROWSER_CONFIRM_MARKER })
    );
    await runScheduled();
    expect(forwarded()).toBe(false);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ source: "browser" })
    );
  });
});

describe("Die 400-Achse bleibt unberuehrt", () => {
  it("das Signal macht aus einem gueltigen Beacon keinen 400", async () => {
    const res = await handleIngest(makeRequest("Purchase", VERBOTEN));
    expect(res.status).toBe(204);
  });

  it("ein fehlendes Pflichtfeld bleibt 400 — auch MIT gueltigem Signal", async () => {
    // ROT DURCH: das Signal in den Pflichtfeld-Guard aufgenommen (Invariante 2).
    const res = await handleIngest(
      new Request("http://localhost/api/e", {
        method: "POST",
        body: JSON.stringify({
          trackingKey: "tk-abc",
          eventID: "evt-123",
          [CONSENT_WIRE_FIELD]: { [META_CONSENT_TARGET]: true },
        }),
      })
    );
    expect(res.status).toBe(400);
  });

  it("ein malformer Body bleibt 400 — auch wenn er das Signal zu enthalten scheint", async () => {
    const res = await handleIngest(
      new Request("http://localhost/api/e", {
        method: "POST",
        body: `{"${CONSENT_WIRE_FIELD}":{`,
      })
    );
    expect(res.status).toBe(400);
  });
});
