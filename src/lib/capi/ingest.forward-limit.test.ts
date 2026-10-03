import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// =========================================================================
// K1b (Phase 13.7) — DER WEITERLEITUNGS-ZAEHLER AM HANDLER (Zuschnitt P13.7-60, (b) und (d);
// Entscheidungen D2 bis D4 zum Plan, ARCHITEKT 2026-10-03).
//
// DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN:
//   - gezaehlt wird NUR, was weitergeleitet wuerde: keine Bestaetigung, kein Seitenaufruf, nicht
//     gesperrt, mindestens ein Ziel nach der Einwilligung (Zuschnitt (b));
//   - die Stelle: nach dem Ausgang "allowed und allowedRettbar leer", VOR der Rettung (D2);
//   - ueber der Schwelle: kein Forward, leere 204; der Persist bleibt (Zuschnitt (b));
//   - eine Logzeile ohne Projekt-Kennung nur beim ersten Ueberlauf im Fenster (D4);
//   - Ausfall: weiterleiten und genau eine fail-open-Zeile (Zuschnitt (d)).
// Das URTEIL selbst (600 / 601 / 602, null, Zeitlimit) pruefen die V-Tests in
// forward-limit.test.ts; hier ist der Zaehler eine Attrappe, die das Urteil vorgibt.
//
// KEINE UMLAUTE IM QUELLTEXT — ae/oe/ue/ss, wie in den Nachbardateien.
// =========================================================================

vi.mock("server-only", () => ({}));

type Urteil =
  | { kind: "allowed" }
  | { kind: "limited"; first: boolean }
  | { kind: "failed" };

const { countForwardHit, reihenfolge } = vi.hoisted(() => {
  const reihenfolge: string[] = [];
  return {
    reihenfolge,
    countForwardHit: vi.fn<(projectId: string) => Promise<Urteil>>(),
  };
});
vi.mock("@/lib/capi/forward-limit", () => ({ countForwardHit }));

const { getCapiConfigByTrackingKey, resolveRefreshedTarget } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
  resolveRefreshedTarget: vi.fn(),
}));
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  resolveRefreshedTarget,
  META_TARGET: "meta",
}));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

const { runRefresh } = vi.hoisted(() => ({ runRefresh: vi.fn() }));
vi.mock("@/lib/oauth/refresh-run", () => ({ runRefresh }));

const { forwardToMeta } = vi.hoisted(() => ({
  forwardToMeta: vi.fn<(...args: unknown[]) => Promise<void>>(),
}));
vi.mock("@/lib/capi/meta-forward", () => ({ forwardToMeta }));

const { forwardToGoogle } = vi.hoisted(() => ({
  forwardToGoogle: vi.fn<(...args: unknown[]) => Promise<void>>(async () => {}),
}));
vi.mock("@/lib/capi/google-forward", () => ({ forwardToGoogle }));

const { persistEvent } = vi.hoisted(() => ({ persistEvent: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent }));

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

import { handleIngest } from "./ingest";
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";
import { BROWSER_CONFIRM_MARKER, PAGEVIEW_EVENT } from "@/lib/analytics/events";

const PROJEKT = "proj-k1b-7f3a";

const META_EMPFAENGER = {
  target: "meta" as const,
  config: { pixelId: "PIXEL-123", token: "META-SECRET" },
};

function aufloesung(ueber: Record<string, unknown> = {}) {
  return {
    projectId: PROJEKT,
    blocked: false,
    abTestActive: false,
    targets: [META_EMPFAENGER],
    renewable: [],
    testMode: [],
    ...ueber,
  };
}

function cns(wert: boolean): Record<string, boolean> {
  const out: Record<string, boolean> = {};
  for (const k of Object.values(CONSENT_KEY_BY_TARGET)) out[k] = wert;
  return out;
}

function beacon(felder: Record<string, unknown> = {}): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify({
      trackingKey: "tk-abc",
      eventID: "evt-1",
      event: "Lead",
      [CONSENT_WIRE_FIELD]: cns(true),
      ...felder,
    }),
  });
}

async function laufeHintergrund(): Promise<void> {
  for (const cb of scheduled.splice(0)) await cb();
}

function zeilen(spy: ReturnType<typeof vi.spyOn>): string[] {
  return spy.mock.calls.map((c: unknown[]) => c.map(String).join(" "));
}

let warn: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  scheduled.length = 0;
  reihenfolge.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue(aufloesung());
  countForwardHit.mockImplementation(async () => {
    reihenfolge.push("zaehler");
    return { kind: "allowed" };
  });
  forwardToMeta.mockImplementation(async () => {
    reihenfolge.push("forward");
  });
  runRefresh.mockResolvedValue({ outcome: { kind: "ok" }, attempts: 1 });
  resolveRefreshedTarget.mockResolvedValue({
    target: "google",
    config: { pixelId: "111", token: "FRISCH" },
  });
  persistEvent.mockResolvedValue(undefined);
  warn = vi.spyOn(console, "warn").mockImplementation(() => {});
});

afterEach(() => {
  warn.mockRestore();
  vi.clearAllMocks();
});

const LIMIT_ZEILE = "[capi/ingest] forward limited: first over limit in window";
const FAIL_OPEN_ZEILE = "[capi/ingest] fail-open: forward-counter-failed";

describe("Z — der Weiterleitungs-Zaehler im Handler", () => {
  it("Z1: unter der Grenze -> genau EIN Zaehler-Aufruf mit der Projekt-Kennung der AUFLOESUNG, VOR dem Forward", async () => {
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(countForwardHit).toHaveBeenCalledTimes(1);
    expect(countForwardHit).toHaveBeenCalledWith(PROJEKT);
    expect(reihenfolge).toEqual(["zaehler", "forward"]);
    expect(warn).not.toHaveBeenCalled();
  });

  it("Z3: der erste Ueberlauf -> kein Forward, leere 204, Persist bleibt, genau EINE Logzeile ohne Projekt-Kennung", async () => {
    countForwardHit.mockResolvedValue({ kind: "limited", first: true });
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
    expect(forwardToMeta).not.toHaveBeenCalled();
    await laufeHintergrund();
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ projectId: PROJEKT, eventType: "Lead", source: "server" })
    );
    expect(zeilen(warn)).toEqual([LIMIT_ZEILE]);
    for (const z of zeilen(warn)) expect(z).not.toContain(PROJEKT);
  });

  it("Z4: ein weiterer Ueberlauf im selben Fenster -> kein Forward, KEINE zweite Logzeile", async () => {
    countForwardHit.mockResolvedValue({ kind: "limited", first: false });
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(forwardToMeta).not.toHaveBeenCalled();
    expect(warn).not.toHaveBeenCalled();
  });

  it("Z5: ein Seitenaufruf wird NICHT gezaehlt", async () => {
    const res = await handleIngest(beacon({ event: PAGEVIEW_EVENT }));
    expect(res.status).toBe(204);
    expect(countForwardHit).not.toHaveBeenCalled();
    await laufeHintergrund();
    expect(persistEvent).toHaveBeenCalledTimes(1);
  });

  it("Z6: eine Bestaetigung wird NICHT gezaehlt (und nicht weitergeleitet)", async () => {
    const res = await handleIngest(beacon({ obs: BROWSER_CONFIRM_MARKER }));
    expect(res.status).toBe(204);
    expect(countForwardHit).not.toHaveBeenCalled();
    expect(forwardToMeta).not.toHaveBeenCalled();
  });

  it("Z7: ein Projekt ohne Ziel und ohne rettbares Ziel wird NICHT gezaehlt", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(aufloesung({ targets: [] }));
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(countForwardHit).not.toHaveBeenCalled();
  });

  it("Z8: verweigert die Einwilligung jedes Ziel, wird NICHT gezaehlt", async () => {
    const res = await handleIngest(beacon({ [CONSENT_WIRE_FIELD]: cns(false) }));
    expect(res.status).toBe(204);
    expect(countForwardHit).not.toHaveBeenCalled();
    expect(forwardToMeta).not.toHaveBeenCalled();
  });

  it("Z9: ein gesperrtes Projekt wird NICHT gezaehlt (der Kill-Switch steht davor)", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(aufloesung({ blocked: true, targets: [] }));
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(countForwardHit).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });

  it("Z10: Ausfall des Zaehlers -> Forward laeuft, genau EINE fail-open-Zeile ohne Projekt-Kennung", async () => {
    countForwardHit.mockResolvedValue({ kind: "failed" });
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
    expect(zeilen(warn)).toEqual([FAIL_OPEN_ZEILE]);
  });

  it("Z12: im Testmodus wird gezaehlt (er wird gesendet)", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({ testMode: [{ target: "meta", code: "TEST123" }] })
    );
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(countForwardHit).toHaveBeenCalledTimes(1);
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
  });

  it("Z13 (D2, vor der Rettung): ueber der Schwelle mit einem rettbaren Ziel -> KEINE Inline-Erneuerung", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [],
        renewable: [{ target: "google", pixelId: "111", lage: "expired" }],
      })
    );
    countForwardHit.mockResolvedValue({ kind: "limited", first: false });
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(countForwardHit).toHaveBeenCalledTimes(1);
    expect(runRefresh).not.toHaveBeenCalled();
    expect(forwardToGoogle).not.toHaveBeenCalled();
  });

  it("Z13 Positivkontrolle: unter der Schwelle mit demselben rettbaren Ziel -> Erneuerung und Forward", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      aufloesung({
        targets: [],
        renewable: [{ target: "google", pixelId: "111", lage: "expired" }],
      })
    );
    const res = await handleIngest(beacon());
    expect(res.status).toBe(204);
    expect(runRefresh).toHaveBeenCalledTimes(1);
    expect(forwardToGoogle).toHaveBeenCalledTimes(1);
  });
});
