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

// after() sammelt die Hintergrund-Tasks; sie werden manuell ausgefuehrt (post-Response).
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

const VALID_BODY = {
  trackingKey: "tk-abc",
  eventID: "evt-123",
  event: "Purchase",
};

function makeRequest(): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify(VALID_BODY),
  });
}

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

/**
 * fetch, das NIE von selbst antwortet — es rejectet ausschliesslich, wenn das
 * uebergebene AbortSignal feuert. Damit haengt der Forward echt, und der Abbruch kann
 * NUR aus unserer eigenen setTimeout->controller.abort()-Verdrahtung kommen (kein
 * simuliertes Abort-Mock, das die Verdrahtung ueberspringen wuerde).
 */
function hangingFetch() {
  return vi.fn(
    (_url: string, init?: { signal?: AbortSignal }) =>
      new Promise<Response>((_resolve, reject) => {
        const signal = init?.signal;
        if (!signal) return; // kein Signal -> haengt fuer immer (Test laeuft in Timeout)
        signal.addEventListener("abort", () =>
          reject(new DOMException("aborted", "AbortError")),
        );
      }),
  );
}

let errorSpy: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  vi.useFakeTimers();
  scheduled.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    blocked: false,
    capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
  });
  persistEvent.mockResolvedValue(undefined);
  errorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
  errorSpy.mockRestore();
});

describe("Meta-Forward-Timeout (CAPI-Härtung)", () => {
  it("VIER ACHSEN: Abbruch bei 3000ms, echter Fehlername, Persist trotzdem, 204 trotzdem", async () => {
    global.fetch = hangingFetch() as unknown as typeof fetch;

    const pending = handleIngest(makeRequest());
    // Die Resolver-Promise muss erst durchlaufen, bevor der Forward startet.
    await vi.advanceTimersByTimeAsync(3_000);
    const res = await pending;

    // --- Achse 1: das Timeout hat wirklich abgebrochen (Signal kam aus unserer Verdrahtung)
    const init = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][1] as { signal: AbortSignal };
    expect(init.signal.aborted).toBe(true);

    // --- Achse 2: ECHTER Fehlername im Log, nicht "unknown"
    const logged = errorSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
    expect(logged).toContain("[capi] Meta forward error: AbortError");
    expect(logged).not.toContain("unknown");
    // Weiterhin nie URL/Token im Log (Invariante iv).
    expect(logged).not.toContain("SECRET-TOKEN");
    expect(logged).not.toContain("graph.facebook.com");

    // --- Achse 3: der Persist laeuft TROTZDEM (Registrierung liegt vor dem Forward)
    await runScheduled();
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
    });

    // --- Achse 4: Client bekommt TROTZDEM eine leere 204 (204-Containment)
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });

  it("GEGENPROBE: kurz VOR 3000ms ist noch NICHT abgebrochen (Timeout-Wert ist echt)", async () => {
    global.fetch = hangingFetch() as unknown as typeof fetch;

    const pending = handleIngest(makeRequest());
    await vi.advanceTimersByTimeAsync(2_999);

    const init = (global.fetch as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0][1] as { signal: AbortSignal };
    expect(init.signal.aborted).toBe(false);

    // aufraeumen: abbrechen lassen, damit der Handler terminiert.
    await vi.advanceTimersByTimeAsync(1);
    expect((await pending).status).toBe(204);
  });

  it("schnelle Antwort: KEIN Abbruch, Timer wird geraeumt, 204 wie gehabt", async () => {
    global.fetch = vi.fn(async () => new Response(null, { status: 200 }));

    const pending = handleIngest(makeRequest());
    await vi.advanceTimersByTimeAsync(0);
    const res = await pending;

    expect(res.status).toBe(204);
    // Kein Forward-Fehler geloggt.
    const logged = errorSpy.mock.calls.map((c: unknown[]) => String(c[0])).join("\n");
    expect(logged).not.toContain("[capi] Meta forward error");
    // Timer geraeumt: nach dem Handler laeuft kein Abort mehr auf (sonst haette
    // vitest offene Timer). Vorspulen darf nichts mehr ausloesen.
    await vi.advanceTimersByTimeAsync(5_000);
    expect(vi.getTimerCount()).toBe(0);
  });
});
