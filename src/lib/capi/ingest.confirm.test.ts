import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
vi.mock("@/lib/capi/token", () => ({ getCapiConfigByTrackingKey }));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

// after() ist ausserhalb eines echten Next-Request-Kontexts nicht aufrufbar -> mocken und
// die Callbacks SAMMELN (zugleich der Beweis, dass der Persist NACH der Response laeuft).
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
import { BROWSER_CONFIRM_MARKER } from "@/lib/analytics/events";

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

/** Eine ECHTE Conversion (kein Marker) — der Vergleichsfall fuer jede Gegenprobe. */
const CONVERSION_BODY = {
  trackingKey: "tk-abc",
  eventID: "evt-123",
  event: "Purchase",
};

/** Die BESTAETIGUNG derselben Conversion: gleiche eventID, gleicher event_type, + Marker. */
const CONFIRM_BODY = { ...CONVERSION_BODY, obs: BROWSER_CONFIRM_MARKER };

beforeEach(() => {
  scheduled.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    blocked: false,
    capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
  });
  persistEvent.mockResolvedValue(undefined);
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Browser-Bestaetigung im Ingest (Phase 8 Scheibe A)", () => {
  // (a) DIE SCHAERFSTE INVARIANTE: der Confirm persistiert als 'browser' und wird NIE
  //     geforwardet. Die Gegenprobe im SELBEN Block ist Pflicht — ohne sie bewiese
  //     "fetch 0x" nur, dass der Mock nicht griff, nicht dass der Zweig wirkt.
  it("(a) Confirm -> Persist source='browser', KEIN Forward — Gegenprobe: dieselbe Conversion OHNE Marker forwardet", async () => {
    const res = await handleIngest(makeRequest(CONFIRM_BODY));
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");

    // Der Persist haengt auch hier hinter after() (204-Antwortzeit unveraendert).
    expect(persistEvent).not.toHaveBeenCalled();
    await runScheduled();

    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
      source: "browser",
    });
    // KEIN Forward -> kein Duplikat bei Meta unter der geteilten eventID.
    expect(global.fetch).not.toHaveBeenCalled();

    // --- GEGENPROBE: identischer Body, nur ohne obs ---
    vi.clearAllMocks();
    scheduled.length = 0;

    const res2 = await handleIngest(makeRequest(CONVERSION_BODY));
    await runScheduled();

    expect(res2.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
      source: "server",
    });
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  // (b) CLIENT-UNTRUSTED: nur der EXAKTE Marker faerbt die Achse. Alles andere landet im
  //     Normalpfad — sonst koennte ein anonymer Aufrufer die Analytics beliebig faerben.
  describe("(b) Marker-Tabelle: nur der exakte Token wirkt", () => {
    const CASES: Array<[string, unknown]> = [
      ["fehlend", undefined],
      ["leer", ""],
      ["nackt 'browser'", "browser"],
      ["Praefix-Anhaengsel", "__ps_browserX"],
      ["Gross/Klein", "__PS_BROWSER"],
      ["Zahl", 42],
      ["Objekt", {}],
    ];

    for (const [label, obs] of CASES) {
      it(`${label} -> source='server' + Forward wie bisher`, async () => {
        const res = await handleIngest(
          makeRequest({ ...CONVERSION_BODY, obs })
        );
        await runScheduled();

        expect(res.status).toBe(204);
        expect(persistEvent).toHaveBeenCalledWith({
          projectId: "proj-1",
          eventType: "Purchase",
          eventId: "evt-123",
          source: "server",
        });
        expect(global.fetch).toHaveBeenCalledTimes(1);
      });
    }
  });

  // (c) Der Confirm-Zweig liegt HINTER dem Kill-Switch. Faerbt rot, sobald jemand ihn
  //     davor schoebe: ein gesperrtes Projekt erzeugte dann wieder Analytics-Zeilen.
  it("(c) Kill-Switch schlaegt den Confirm: blocked -> kein Persist, kein Forward, nichts eingeplant", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue({
      projectId: "proj-gesperrt",
      blocked: true,
      capiConfig: null,
    });

    const res = await handleIngest(makeRequest(CONFIRM_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(persistEvent).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });

  it("(d) unbekannter trackingKey + Confirm -> 204, nichts eingeplant", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(null);

    const res = await handleIngest(makeRequest(CONFIRM_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });

  it("(e) Confirm ohne Meta-Setup (capiConfig null) -> Persist 'browser', kein Forward", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue({
      projectId: "proj-ohne-meta",
      blocked: false,
      capiConfig: null,
    });

    const res = await handleIngest(makeRequest(CONFIRM_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-ohne-meta",
      eventType: "Purchase",
      eventId: "evt-123",
      source: "browser",
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // Der Confirm darf den 400-Guard nicht aushebeln: ein Marker ohne Pflichtfelder bleibt
  // ein malformer Client-Request (400 VOR jedem DB-Zugriff).
  it("Confirm ohne Pflichtfelder -> weiterhin 400, kein Resolve, nichts eingeplant", async () => {
    const res = await handleIngest(
      makeRequest({ trackingKey: "tk-abc", obs: BROWSER_CONFIRM_MARKER })
    );

    expect(res.status).toBe(400);
    expect(getCapiConfigByTrackingKey).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });
});
