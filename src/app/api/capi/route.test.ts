import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// route.ts importiert token.ts (server-only) transitiv nicht direkt, aber der
// Config-Resolver ist server-only-behaftet -> neutralisieren.
vi.mock("server-only", () => ({}));

// Den Resolver mocken: der echte Pfad braeuchte service_role + DB.
const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
vi.mock("@/lib/capi/token", () => ({ getCapiConfigByTrackingKey }));

// Phase 8 Scheibe 1: der Handler registriert den Analytics-Persist via after().
// Ausserhalb eines echten Next-Request-Kontexts wuerde after() werfen -> hier
// neutralisiert. Die Persist-VERDRAHTUNG wird diskriminierend in
// src/lib/capi/ingest.persist.test.ts geprueft, nicht hier.
vi.mock("next/server", () => ({ after: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent: vi.fn() }));

// Config als mutierbare Getter mocken -> META_TEST_EVENT_CODE pro Test toggeln
// (env-an vs env-aus), ohne echte process.env-Manipulation.
const configState = vi.hoisted(() => ({ version: "v21.0", testCode: "" }));
vi.mock("@/lib/capi/config", () => ({
  get META_GRAPH_VERSION() {
    return configState.version;
  },
  get META_TEST_EVENT_CODE() {
    return configState.testCode;
  },
}));

import { POST } from "./route";

function makeRequest(
  body: unknown,
  headers: Record<string, string> = {},
): Request {
  return new Request("http://localhost/api/capi", {
    method: "POST",
    headers,
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

// Die letzte an fetch uebergebene Meta-Payload (data[0]) + URL.
function lastForward() {
  const [url, options] = (global.fetch as ReturnType<typeof vi.fn>).mock
    .calls[0] as [string, { body: string }];
  const payload = JSON.parse(options.body);
  return { url, payload, event: payload.data[0] };
}

const VALID_BODY = {
  trackingKey: "tk-abc",
  eventID: "evt-123",
  event: "Purchase",
  value: 49.9,
  currency: "EUR",
  eventSourceUrl: "https://kunde.de/lp",
  _fbp: "fb.1.123.456",
};

beforeEach(() => {
  configState.testCode = "";
  // Neue Resolver-Form (Phase 8 Scheibe 1): die projectId reitet mit, die CAPI-Config
  // liegt eine Ebene tiefer. Treu gemockt — der Handler liest weiterhin capiConfig.
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    blocked: false,
    capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
  });
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("POST /api/capi (Scheibe 2b-i)", () => {
  it("Happy-Path: forwarded fetch an Metas Graph-CAPI, Response 204 ohne Body", async () => {
    const res = await POST(
      makeRequest(VALID_BODY, {
        "x-vercel-forwarded-for": "8.8.8.8",
        "user-agent": "Mozilla/5.0 (Test)",
      }),
    );

    expect(res.status).toBe(204);
    // Token/Config erreichen die Client-Response NIE.
    expect(await res.text()).toBe("");

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const { url, event, payload } = lastForward();
    expect(url).toBe(
      "https://graph.facebook.com/v21.0/PIXEL-123/events?access_token=SECRET-TOKEN",
    );
    expect(event.event_id).toBe("evt-123");
    expect(event.event_name).toBe("Purchase");
    expect(event.action_source).toBe("website");
    expect(event.event_source_url).toBe("https://kunde.de/lp");
    // Server-gesetzte user_data.
    expect(event.user_data.client_ip_address).toBe("8.8.8.8");
    expect(event.user_data.client_user_agent).toBe("Mozilla/5.0 (Test)");
    expect(event.user_data.fbp).toBe("fb.1.123.456");
    // custom_data nur value/currency.
    expect(event.custom_data).toEqual({ value: 49.9, currency: "EUR" });
    // Kein test_event_code, wenn env aus.
    expect(payload.test_event_code).toBeUndefined();
  });

  it("unbekannter/tokenloser Key -> KEIN fetch, sauberes 204 (kein Leak)", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(null);
    const res = await POST(makeRequest(VALID_BODY));
    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("malformed Body -> 400, kein fetch", async () => {
    const res = await POST(makeRequest("{ not json"));
    expect(res.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("Pflichtfeld fehlt (kein event) -> 400, kein fetch", async () => {
    const { event: _omit, ...noEvent } = VALID_BODY;
    void _omit;
    const res = await POST(makeRequest(noEvent));
    expect(res.status).toBe(400);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("event_time wird server-gesetzt, NIE aus dem Client-Payload uebernommen", async () => {
    const before = Math.floor(Date.now() / 1000);
    const res = await POST(
      makeRequest({ ...VALID_BODY, event_time: 999 }, { "user-agent": "UA" }),
    );
    expect(res.status).toBe(204);
    const { event } = lastForward();
    expect(event.event_time).not.toBe(999);
    expect(event.event_time).toBeGreaterThanOrEqual(before);
    expect(event.event_time).toBeLessThanOrEqual(before + 5);
  });

  it("test_event_code: env gesetzt -> im Payload; env leer -> NICHT im Payload", async () => {
    configState.testCode = "TEST12345";
    await POST(makeRequest(VALID_BODY, { "x-vercel-forwarded-for": "8.8.8.8" }));
    expect(lastForward().payload.test_event_code).toBe("TEST12345");

    vi.clearAllMocks();
    global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
    configState.testCode = "";
    await POST(makeRequest(VALID_BODY, { "x-vercel-forwarded-for": "8.8.8.8" }));
    expect(lastForward().payload.test_event_code).toBeUndefined();
  });

  describe("resolveClientIp — plattform-vertraut, nicht spoofbar", () => {
    it("echte Vercel-IP wird uebernommen (auch mit Test-Code, NIE durch Dummy ersetzt)", async () => {
      configState.testCode = "TEST12345";
      await POST(
        makeRequest(VALID_BODY, { "x-vercel-forwarded-for": "8.8.8.8" }),
      );
      expect(lastForward().event.user_data.client_ip_address).toBe("8.8.8.8");
    });

    it("loopback/leer + Test-Code -> valide Dummy-Public-IP", async () => {
      configState.testCode = "TEST12345";
      // keine vertrauenswuerdige IP-Quelle -> loopback/leer.
      await POST(makeRequest(VALID_BODY));
      expect(lastForward().event.user_data.client_ip_address).toBe(
        "123.123.123.123",
      );
    });

    it("loopback/leer OHNE Test-Code (Prod) -> client_ip_address omitted", async () => {
      configState.testCode = "";
      await POST(makeRequest(VALID_BODY));
      expect(
        lastForward().event.user_data.client_ip_address,
      ).toBeUndefined();
    });

    it("nur x-forwarded-for (spoofbar) -> NICHT uebernommen, IP omitted", async () => {
      configState.testCode = "";
      await POST(
        makeRequest(VALID_BODY, { "x-forwarded-for": "6.6.6.6, 10.0.0.1" }),
      );
      expect(
        lastForward().event.user_data.client_ip_address,
      ).toBeUndefined();
    });
  });
});
