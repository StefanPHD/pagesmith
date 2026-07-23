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
// BEWUSST die ECHTEN Konstanten importiert, KEINE Kopie: waechst META_STANDARD_EVENTS,
// waechst dieser Test automatisch mit. Eine handgeschriebene Liste wuerde genau die
// Regression durchlassen, gegen die (b2) schuetzen soll.
import { META_STANDARD_EVENTS } from "@/lib/tracking/meta";
import { PAGEVIEW_EVENT, isForwardable } from "@/lib/analytics/events";

function makeRequest(event: string): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify({
      trackingKey: "tk-abc",
      eventID: "evt-123",
      event,
    }),
  });
}

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

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

describe("isForwardable (rein)", () => {
  it("schliesst NUR den reservierten PageView-Token aus", () => {
    expect(isForwardable(PAGEVIEW_EVENT)).toBe(false);
    expect(PAGEVIEW_EVENT).toBe("__ps_pageview");
  });

  // Der naive Ausschluss "PageView" waere ein stiller Conversion-Killer: der Name ist
  // ein legitimes Custom-Event, das ein Marketer heute schon angelegt haben kann.
  it('"PageView" als Nutzer-Custom-Event bleibt forwardbar (kein naiver Namensausschluss)', () => {
    expect(isForwardable("PageView")).toBe(true);
    expect(isForwardable("pageview")).toBe(true);
    expect(isForwardable("__ps_pageview_extra")).toBe(true);
  });

  it("beliebige Custom-Namen bleiben forwardbar (KEINE Allowlist)", () => {
    for (const name of ["MeinEvent", "Webinar-Anmeldung", "x", "ü$%&"]) {
      expect(isForwardable(name)).toBe(true);
    }
  });
});

describe("Forward-Gate im Handler (Scheibe 2a)", () => {
  it("(b1) reservierter PageView-Token -> Persist JA, Forward NEIN", async () => {
    const res = await handleIngest(makeRequest(PAGEVIEW_EVENT));
    await runScheduled();

    expect(res.status).toBe(204);
    // Der PageView gehoert in unsere Analytics …
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: PAGEVIEW_EVENT,
      eventId: "evt-123",
      source: "server",
    });
    // … aber NICHT als Conversion zu Meta.
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // (b2) SCHUTZ FUER INVARIANTE (i): faerbt rot, sobald der Ausschluss zu breit wird.
  // Ein zu breiter isForwardable bricht STILL das CAPI-Tracking — kein Fehler, nur
  // verschwundene Conversions. Deshalb hier ueber die ECHTE Standard-Event-Liste.
  it.each([...META_STANDARD_EVENTS, "MeinCustomEvent"])(
    "(b2) '%s' wird WEITERHIN geforwardet (Ausschluss nicht zu breit)",
    async (eventName) => {
      const res = await handleIngest(makeRequest(eventName));
      await runScheduled();

      expect(res.status).toBe(204);
      expect(global.fetch).toHaveBeenCalledTimes(1);
      // Der Event-Name erreicht Meta unveraendert.
      const [, init] = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
        .calls[0] as [string, { body: string }];
      expect(JSON.parse(init.body).data[0].event_name).toBe(eventName);
      // Und die Analytics-Zeile entsteht zusaetzlich.
      expect(persistEvent).toHaveBeenCalledTimes(1);
    },
  );

  it("gesperrtes Projekt schlaegt das Forward-Gate: auch ein forwardbarer Event wird verworfen", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue({
      projectId: "proj-1",
      blocked: true,
      capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
    });

    const res = await handleIngest(makeRequest("Purchase"));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(persistEvent).not.toHaveBeenCalled();
  });
});
