import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// =========================================================================
// K1b (Phase 13.7) — DIE EINGANGSGRENZEN AM HANDLER (Zuschnitt P13.7-60, (a); Entscheidung D1
// zum Plan, ARCHITEKT 2026-10-03).
//
// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NICHT AUS DEM CODE:
//   Rumpf 65 536 Bytes (die keepalive-/sendBeacon-Hoechstmenge, fetch.spec.whatwg.org 4.6,
//   GELESEN 2026-10-03) · trackingKey 64 · eventID 128 · event 256 · currency 16 · _fbp 256 ·
//   obs 64 (UTF-16-Codeeinheiten) · eventSourceUrl OHNE Feldgrenze · Verstoss = 400 VOR jedem
//   Datenbank-Zugriff.
//
// ATTRAPPE: der Resolver, der Zaehler, der Meta-Adapter, der Persist, after(). ECHT: handleIngest.
// "Datenbank-Zugriff" heisst hier: der Resolver (getCapiConfigByTrackingKey) und der Zaehler
// (countForwardHit) — die beiden einzigen Wege des Anfrage-Pfads in die Datenbank; der Persist
// laeuft in after() und wird mitgeprueft.
//
// KEINE UMLAUTE IM QUELLTEXT — ae/oe/ue/ss, wie in den Nachbardateien.
// =========================================================================

vi.mock("server-only", () => ({}));

const { countForwardHit } = vi.hoisted(() => ({
  countForwardHit: vi.fn(async () => ({ kind: "allowed" as const })),
}));
vi.mock("@/lib/capi/forward-limit", () => ({ countForwardHit }));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  META_TARGET: "meta",
}));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

const { forwardToMeta } = vi.hoisted(() => ({
  forwardToMeta: vi.fn(async () => {}),
}));
vi.mock("@/lib/capi/meta-forward", () => ({ forwardToMeta }));

const { persistEvent } = vi.hoisted(() => ({ persistEvent: vi.fn() }));
vi.mock("@/lib/analytics/persist", () => ({ persistEvent }));

const { after } = vi.hoisted(() => ({ after: vi.fn() }));
vi.mock("next/server", () => ({ after }));

import { INGEST_FIELD_MAX_LENGTH, INGEST_MAX_BODY_BYTES, handleIngest } from "./ingest";
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";

function alleErlaubt(): Record<string, boolean> {
  const cns: Record<string, boolean> = {};
  for (const k of Object.values(CONSENT_KEY_BY_TARGET)) cns[k] = true;
  return cns;
}

function basis(felder: Record<string, unknown> = {}): Record<string, unknown> {
  return {
    trackingKey: "tk-abc",
    eventID: "evt-1",
    event: "Lead",
    [CONSENT_WIRE_FIELD]: alleErlaubt(),
    ...felder,
  };
}

function req(body: string, headers: Record<string, string> = {}): Request {
  return new Request("http://localhost/api/e", { method: "POST", body, headers });
}

/** Ein gueltiger Beacon, dessen Rumpf GENAU `bytes` Bytes lang ist (ASCII, Fuellfeld `pad`). */
function rumpfMitBytes(bytes: number): string {
  const ohne = JSON.stringify(basis({ pad: "" }));
  const fehlt = bytes - new TextEncoder().encode(ohne).byteLength;
  if (fehlt < 0) throw new Error("Testaufbau: Basis zu gross");
  const text = JSON.stringify(basis({ pad: "x".repeat(fehlt) }));
  expect(new TextEncoder().encode(text).byteLength).toBe(bytes);
  return text;
}

function keinDatenbankZugriff(): void {
  expect(getCapiConfigByTrackingKey).not.toHaveBeenCalled();
  expect(countForwardHit).not.toHaveBeenCalled();
  expect(after).not.toHaveBeenCalled();
  expect(persistEvent).not.toHaveBeenCalled();
  expect(forwardToMeta).not.toHaveBeenCalled();
}

beforeEach(() => {
  getCapiConfigByTrackingKey.mockResolvedValue({
    projectId: "proj-1",
    blocked: false,
    abTestActive: false,
    renewable: [],
    testMode: [],
    targets: [{ target: "meta", config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" } }],
  });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("L — die Eingangsgrenzen (K1b)", () => {
  it("L-CONST: die Werte der Entscheidung D1, eventSourceUrl ohne Feldgrenze", () => {
    expect(INGEST_MAX_BODY_BYTES).toBe(65_536);
    expect(INGEST_FIELD_MAX_LENGTH).toEqual({
      trackingKey: 64,
      eventID: 128,
      event: 256,
      currency: 16,
      _fbp: 256,
      obs: 64,
    });
    expect(Object.keys(INGEST_FIELD_MAX_LENGTH)).not.toContain("eventSourceUrl");
  });

  it("L1-EDGE (Positivkontrolle zu L1): ein Rumpf von GENAU 65 536 Bytes -> 204 und Forward", async () => {
    const res = await handleIngest(req(rumpfMitBytes(INGEST_MAX_BODY_BYTES)));
    expect(res.status).toBe(204);
    expect(getCapiConfigByTrackingKey).toHaveBeenCalledTimes(1);
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
  });

  it("L1: ein Rumpf von 65 537 Bytes OHNE Content-Length -> 400, kein Datenbank-Zugriff", async () => {
    const r = req(rumpfMitBytes(INGEST_MAX_BODY_BYTES + 1));
    expect(r.headers.get("content-length")).toBeNull();
    const res = await handleIngest(r);
    expect(res.status).toBe(400);
    keinDatenbankZugriff();
  });

  it("L1b: ein angekuendigter Content-Length ueber der Grenze -> 400, auch bei kleinem gueltigem Rumpf", async () => {
    const r = req(JSON.stringify(basis()), { "content-length": String(INGEST_MAX_BODY_BYTES + 1) });
    expect(r.headers.get("content-length")).toBe(String(INGEST_MAX_BODY_BYTES + 1));
    const res = await handleIngest(r);
    expect(res.status).toBe(400);
    keinDatenbankZugriff();
  });

  it("L1c: ein gestreamter Rumpf wird beim Lesen gezaehlt und ueber der Grenze NICHT zu Ende gelesen", async () => {
    let gezogen = 0;
    const stueck = 10_000;
    const stream = new ReadableStream<Uint8Array>({
      pull(c) {
        gezogen++;
        if (gezogen > 20) c.close();
        else c.enqueue(new Uint8Array(stueck).fill(0x20));
      },
    });
    const r = new Request("http://localhost/api/e", {
      method: "POST",
      body: stream,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    const res = await handleIngest(r);
    expect(res.status).toBe(400);
    // 65 536 / 10 000 -> spaetestens das 7. Stueck ueberschreitet; ein paar Stuecke Vorlauf des
    // Streams sind zulaessig, die 21 Zuege eines vollstaendigen Lesens nicht.
    expect(gezogen).toBeLessThan(12);
    keinDatenbankZugriff();
  });

  it.each(Object.entries(INGEST_FIELD_MAX_LENGTH))(
    "L2: Feld %s GENAU an der Grenze -> durch (Positivkontrolle), eins darueber -> 400 ohne Datenbank-Zugriff",
    async (feld, max) => {
      const anGrenze = await handleIngest(req(JSON.stringify(basis({ [feld]: "a".repeat(max) }))));
      expect(anGrenze.status).toBe(204);
      expect(getCapiConfigByTrackingKey).toHaveBeenCalledTimes(1);
      vi.clearAllMocks();

      const darueber = await handleIngest(
        req(JSON.stringify(basis({ [feld]: "a".repeat(max + 1) })))
      );
      expect(darueber.status).toBe(400);
      keinDatenbankZugriff();
    }
  );

  it("L-URL: eine eventSourceUrl von 20 000 Zeichen (deutlich ueber 8192) unter der Rumpfgrenze -> 204 und Forward", async () => {
    const url = "https://landing.beispiel.de/?gclid=" + "A".repeat(20_000 - 35);
    expect(url.length).toBe(20_000);
    const res = await handleIngest(req(JSON.stringify(basis({ eventSourceUrl: url }))));
    expect(res.status).toBe(204);
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
    // Die Adresse reist unveraendert zum Adapter — es wirkt keine Feldgrenze auf sie.
    const body = (forwardToMeta.mock.calls[0] as unknown[])[3] as { eventSourceUrl: string };
    expect(body.eventSourceUrl).toBe(url);
  });

  it("L3: ein Beacon mit den legitimen Hoechstwerten der Erzeuger -> 204 und Forward", async () => {
    const res = await handleIngest(
      req(
        JSON.stringify(
          basis({
            trackingKey: "2f1c7c3e-9b1a-4d4e-8f2a-1c3b5d7e9f01",
            eventID: "8a6e0f4d-3c2b-4a19-9e7d-5b4c3a2f1e0d",
            event: "CompleteRegistration",
            eventSourceUrl:
              "https://landing.beispiel.de/angebot?utm_source=google&utm_campaign=x&gclid=" +
              "Cj0KCQjw".repeat(240),
            isCustom: false,
            value: 49.9,
            currency: "EUR",
            _fbp: "fb.1.1696320000000.1234567890",
          })
        )
      )
    );
    expect(res.status).toBe(204);
    expect(forwardToMeta).toHaveBeenCalledTimes(1);
  });

  it("L4: die 400 traegt keinen Rumpf, aber die CORS-Koepfe", async () => {
    const res = await handleIngest(req(JSON.stringify(basis({ event: "a".repeat(257) }))));
    expect(res.status).toBe(400);
    expect(await res.text()).toBe("");
    expect(res.headers.get("Access-Control-Allow-Origin")).toBe("*");
  });

  it("L-TYP: ein Feld, das keine Zeichenkette ist, faellt nicht unter die Feldgrenze (currency als Zahl -> 204)", async () => {
    const res = await handleIngest(req(JSON.stringify(basis({ currency: 12345678901234567890 }))));
    expect(res.status).toBe(204);
  });

  it("L-BESTAND: ein Lesefehler bleibt dieselbe 400 wie zuvor", async () => {
    const stream = new ReadableStream<Uint8Array>({
      pull() {
        throw new Error("ERFUNDEN: Lesefehler");
      },
    });
    const r = new Request("http://localhost/api/e", {
      method: "POST",
      body: stream,
      duplex: "half",
    } as RequestInit & { duplex: "half" });
    const res = await handleIngest(r);
    expect(res.status).toBe(400);
    keinDatenbankZugriff();
  });
});
