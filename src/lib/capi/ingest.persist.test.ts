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

// after() ist ausserhalb eines echten Next-Request-Kontexts nicht aufrufbar (es haengt
// an AsyncLocalStorage). Wir mocken es und SAMMELN die registrierten Callbacks, um sie
// manuell auszufuehren — das ist zugleich der Beweis, dass der Persist NACH der Response
// laeuft und nicht im Response-Pfad haengt.
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

function makeRequest(body: unknown): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify(body),
  });
}

/** Fuehrt die via after() registrierten Hintergrund-Tasks aus (post-Response). */
async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

const VALID_BODY = {
  trackingKey: "tk-abc",
  eventID: "evt-123",
  event: "Purchase",
};

beforeEach(() => {
  scheduled.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
  });
  persistEvent.mockResolvedValue(undefined);
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("Analytics-Persist im Ingest (Phase 8 Scheibe 1, couple-minimal)", () => {
  it("(a) Meta-Projekt -> GENAU EIN Persist mit projectId/eventId, source setzt persistEvent", async () => {
    const res = await handleIngest(makeRequest(VALID_BODY));
    expect(res.status).toBe(204);

    // Vor dem Ausfuehren der Hintergrund-Tasks darf NICHTS geschrieben sein:
    // beweist, dass der Persist hinter after() liegt und die 204 nicht blockiert.
    expect(persistEvent).not.toHaveBeenCalled();

    await runScheduled();

    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
    });
  });

  it("(b) GEGENPROBE Kill-Switch: gesperrtes Projekt -> Resolver null -> KEIN Persist, KEIN Forward", async () => {
    // Ein gesperrtes Projekt liefert im Resolver null (blocked_at-Check VOR der
    // Config-Aufloesung) — fail-closed OHNE eigenen Zweig im Handler.
    getCapiConfigByTrackingKey.mockResolvedValue(null);

    const res = await handleIngest(makeRequest(VALID_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
    // Nichts wurde ueberhaupt erst eingeplant.
    expect(after).not.toHaveBeenCalled();
  });

  it("(c) COUPLE-MINIMAL-GRENZE: kein Meta-Setup (capiConfig null, offen) -> WEDER Forward NOCH Persist", async () => {
    // Diese Zeile faerbt rot, sobald jemand den Persist aus dem if(capiConfig)-Zweig
    // herauszieht (also entkoppelt, ohne die Scheibe-2-Client-Infrastruktur zu haben).
    getCapiConfigByTrackingKey.mockResolvedValue({
      projectId: "proj-ohne-meta",
      capiConfig: null,
    });

    const res = await handleIngest(makeRequest(VALID_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
    expect(persistEvent).not.toHaveBeenCalled();
  });

  it("(d) ISOLATION: fehlschlagender Persist aendert WEDER die 204 NOCH den CAPI-Forward", async () => {
    persistEvent.mockRejectedValue(new Error("insert exploded"));

    const res = await handleIngest(makeRequest(VALID_BODY));

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(global.fetch).toHaveBeenCalledTimes(1);

    // Der Hintergrund-Task darf auch beim Werfen niemanden mitreissen.
    await expect(runScheduled()).resolves.toBeUndefined();
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it("Pflichtfeld-Validierung greift VOR dem Persist (400 -> nichts eingeplant)", async () => {
    const res = await handleIngest(makeRequest({ trackingKey: "tk-abc" }));

    expect(res.status).toBe(400);
    expect(after).not.toHaveBeenCalled();
    expect(persistEvent).not.toHaveBeenCalled();
  });
});

describe("Meta-Ablehnung: sanitized Diagnose-Logging", () => {
  function rejectingFetch(status: number, body: unknown) {
    return vi.fn(
      async () =>
        new Response(JSON.stringify(body), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
    );
  }

  it("400 mit Meta-Error-Envelope -> code/subcode/type/fbtrace/msg im Log, weiter 204 + Persist", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = rejectingFetch(400, {
      error: {
        message: "Invalid parameter",
        code: 190,
        error_subcode: 463,
        type: "OAuthException",
        fbtrace_id: "AbCdEf123",
      },
    }) as unknown as typeof fetch;

    const res = await handleIngest(makeRequest(VALID_BODY));
    const logged = spy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");

    // Der Ablehnungsgrund ist da — nicht mehr nur der nackte Status.
    expect(logged).toContain("[capi] Meta forward failed: HTTP 400");
    expect(logged).toContain("code=190");
    expect(logged).toContain("subcode=463");
    expect(logged).toContain("type=OAuthException");
    expect(logged).toContain("fbtrace=AbCdEf123");
    expect(logged).toContain("msg=Invalid parameter");

    // SECRETS: nie URL/Token/Payload im Log.
    expect(logged).not.toContain("SECRET-TOKEN");
    expect(logged).not.toContain("access_token");
    expect(logged).not.toContain("graph.facebook.com");

    // Invarianten unveraendert: leere 204 + Persist laeuft trotzdem.
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    await runScheduled();
    expect(persistEvent).toHaveBeenCalledTimes(1);

    spy.mockRestore();
  });

  it("Ablehnung OHNE JSON-Body -> Rohtext-Fallback, kein Throw, weiter 204", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = vi.fn(
      async () => new Response("<html>Bad Gateway</html>", { status: 502 }),
    ) as unknown as typeof fetch;

    const res = await handleIngest(makeRequest(VALID_BODY));
    const logged = spy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");

    expect(logged).toContain("non-JSON body=");
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");

    spy.mockRestore();
  });

  it("ueberlange Meta-message wird gekappt (kein Log-Bloat)", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    global.fetch = rejectingFetch(400, {
      error: { code: 100, message: "X".repeat(5_000) },
    }) as unknown as typeof fetch;

    await handleIngest(makeRequest(VALID_BODY));
    const rejected = spy.mock.calls
      .map((c: unknown[]) => String(c[0]))
      .find((l) => l.includes("Meta forward rejected"))!;

    expect(rejected).toContain("msg=" + "X".repeat(200));
    expect(rejected).not.toContain("X".repeat(201));

    spy.mockRestore();
  });
});
