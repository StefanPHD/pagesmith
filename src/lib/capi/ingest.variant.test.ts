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

// after() sammeln statt ausfuehren: zugleich der Beweis, dass der Persist NACH der
// Response laeuft — und dass der VARIANTEN-WERT als fertiger Wert im Closure reist
// (Invariante I14: gelesen wird synchron im Request, nie hier drin).
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
import { BROWSER_CONFIRM_MARKER, PAGEVIEW_EVENT } from "@/lib/analytics/events";
// Der Cookie-NAME wird IMPORTIERT, nicht abgeschrieben (Invariante I9): eine zweite
// Fundstelle in src/lib/capi/ waere genau die Drift, die die Regel verhindert — und der
// Test wuerde eine Umbenennung dann gruen ueberleben.
import { VARIANT_COOKIE_NAME } from "@/lib/hosting/variant";

/** Request mit optionalem Cookie-Header. Ohne Header = Besucher ohne Cookie. */
function makeRequest(body: unknown, cookie?: string): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    headers: cookie === undefined ? {} : { cookie },
    body: JSON.stringify(body),
  });
}

/** Der Cookie, den die Serve-Route bei aktivem Test gesetzt haette. */
function variantCookie(value: string): string {
  return `${VARIANT_COOKIE_NAME}=${value}`;
}

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

const CONVERSION_BODY = {
  trackingKey: "tk-abc",
  eventID: "evt-123",
  event: "Purchase",
};

/** Die Aufloesung eines Projekts MIT laufendem A/B-Test. */
function resolutionWithTest(abTestActive: boolean) {
  return {
    projectId: "proj-1",
    blocked: false,
    abTestActive,
    targets: [
      { target: "meta", config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" } },
    ],
  };
}

/** Die Argumente des einzigen Persist-Aufrufs. */
function persistArgs(): Record<string, unknown> {
  return persistEvent.mock.calls[0][0] as Record<string, unknown>;
}

beforeEach(() => {
  scheduled.length = 0;
  getCapiConfigByTrackingKey.mockResolvedValue(resolutionWithTest(true));
  persistEvent.mockResolvedValue(undefined);
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("A/B-Variante im Ingest (Phase 9 Scheibe 9b-2)", () => {
  // V1 — der Grundfall: aktiver Test + gueltiges Cookie -> die Variante steht auf der
  // SERVER-Zeile. Faerbt rot, sobald der Wert irgendwo zwischen Header und Persist
  // verlorengeht.
  it("V1: Test aktiv + Cookie 'b' -> Persist mit variant='b' auf der Server-Zeile", async () => {
    const res = await handleIngest(
      makeRequest(CONVERSION_BODY, variantCookie("b"))
    );
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
      source: "server",
      variant: "b",
    });
  });

  // V2 — der Fall, den man am ehesten vergisst: die BESTAETIGUNGSZEILE traegt dieselbe
  // Variante. variant ist eine Eigenschaft der BEOBACHTUNG (wie source), keine Aussage
  // ueber die eventID. Ohne sie waere eine Adblocker-Verlustrate JE VARIANTE nicht
  // berechenbar — und das faellt erst in 9c auf, wenn die Zeilen laengst geschrieben sind.
  it("V2: Test aktiv + Cookie 'b' + Confirm-Marker -> variant='b' AUCH auf der Browser-Zeile, kein Forward", async () => {
    const res = await handleIngest(
      makeRequest(
        { ...CONVERSION_BODY, obs: BROWSER_CONFIRM_MARKER },
        variantCookie("b")
      )
    );
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: "Purchase",
      eventId: "evt-123",
      source: "browser",
      variant: "b",
    });
    // Der Confirm bleibt ungeforwardet (I4) — die Variante aendert daran nichts.
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // V3 — DAS GATE. Cookie da, Test AUS -> null. Ohne diese Bedingung schriebe ein altes
  // Cookie nach Testende eine Variante fest, die gar nicht ausgeliefert wurde (die Route
  // liefert bei inaktivem Test ausnahmslos A), und NULL verloere seine Bedeutung als
  // Abgrenzung des Testzeitraums.
  // MUTATIONSPROBE M1: Gate entfernen (immer parsen) -> dieser Test muss rot werden.
  it("V3: Test INAKTIV + Cookie 'b' -> variant=null (das Gate)", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(resolutionWithTest(false));

    const res = await handleIngest(
      makeRequest(CONVERSION_BODY, variantCookie("b"))
    );
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistArgs().variant).toBeNull();
  });

  // V4 — DER INGEST WEIST NIE ZU (I8). Test aktiv, aber die Seite wurde vor der
  // Aktivierung ausgeliefert -> kein Cookie -> null. KEIN Muenzwurf, KEIN Default 'a':
  // ein zweiter Zuweiser neben der Serve-Route koennte divergieren.
  // MUTATIONSPROBE M3: variant ?? 'a' -> dieser Test muss rot werden.
  it("V4: Test aktiv, KEIN Cookie -> variant=null, kein Wuerfeln", async () => {
    const res = await handleIngest(makeRequest(CONVERSION_BODY));
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledTimes(1);
    expect(persistArgs().variant).toBeNull();
    // Explizit gegen einen stillen Default: 'a' waere hier eine Behauptung ueber eine
    // Auslieferung, die niemand beobachtet hat.
    expect(persistArgs().variant).not.toBe("a");
    expect(persistArgs().variant).not.toBe("b");
  });

  // V5 — DER WICHTIGSTE TEST DER RUNDE. HttpOnly schuetzt vor JS im Browser, NICHT vor
  // einem gefaelschten Cookie-Header (curl setzt ihn frei). Ungeprueft durchgereicht
  // braeche der Wert am DB-CHECK events_variant_valid — und weil der Persist in after()
  // laeuft, waere das KEIN Fehler nach aussen, sondern eine STILL verlorene Event-Zeile.
  // Geprueft wird deshalb BEIDES: variant ist null UND die Zeile entsteht trotzdem.
  // MUTATIONSPROBE M2: rohes Auslesen statt parseVariantCookie -> muss rot werden.
  describe("V5: gefaelschter/kaputter Cookie-Wert -> null, aber die Zeile wird geschrieben", () => {
    const CASES: Array<[string, string]> = [
      ["Muellwert", variantCookie("zzz")],
      ["Grossbuchstabe", variantCookie("B")],
      ["zwei Zeichen", variantCookie("ab")],
      ["leerer Wert", variantCookie("")],
      // Anfuehrungszeichen sind ein REALER Fall (manche Server quoten Cookie-Werte) und
      // bleiben EIN Paar. Bewusst NICHT "a; DROP": das zerfaellt am Semikolon in ein
      // GUELTIGES Paar plus Junk und liefert korrekt 'a' — die Fixture haette dann den
      // Parser widerlegt statt ihn zu pruefen.
      ["Wert in Anfuehrungszeichen", variantCookie('"b"')],
      // Mehrfachvorkommen entsteht real, wenn eines host-only und eines domainweit
      // gesetzt wurde -> "letzter gewinnt" machte den Besucher dauerhaft instabil.
      ["Mehrfachvorkommen", `${variantCookie("a")}; ${variantCookie("b")}`],
      ["fremdes Cookie mit unserem Namen als Praefix", "__Host-ps_variante=b"],
    ];

    for (const [label, cookie] of CASES) {
      it(`${label} -> variant=null, Persist trotzdem genau 1x`, async () => {
        const res = await handleIngest(makeRequest(CONVERSION_BODY, cookie));
        await runScheduled();

        expect(res.status).toBe(204);
        // Die Zeile darf NICHT verschluckt werden — das ist die Haelfte der Aussage.
        expect(persistEvent).toHaveBeenCalledTimes(1);
        expect(persistArgs().variant).toBeNull();
      });
    }

    // POSITIV-GEGENPROBE: ohne sie bewiesen die Faelle oben nur, dass Cookies GENERELL
    // nicht ankommen. Derselbe Header-Aufbau, nur mit gueltigem Wert -> 'b'.
    it("Gegenprobe: gueltiger Wert zwischen fremden Cookies -> variant='b'", async () => {
      const res = await handleIngest(
        makeRequest(
          CONVERSION_BODY,
          `_fbp=fb.1.2.3; ${variantCookie("b")}; other=x`
        )
      );
      await runScheduled();

      expect(res.status).toBe(204);
      expect(persistArgs().variant).toBe("b");
    });
  });

  // V6 — REIHENFOLGE: der Kill-Switch steht VOR jeder Varianten-Logik (I2). Ein
  // gesperrtes Projekt persistiert nicht, auch nicht mit gueltigem Cookie und laufendem
  // Test. MUTATIONSPROBE M4: den blocked-Return UNTER den schedulePersist-Aufruf
  // schieben -> muss rot werden.
  it("V6: gesperrtes Projekt + aktiver Test + Cookie 'b' -> kein Persist, kein Forward, nichts eingeplant", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue({
      projectId: "proj-gesperrt",
      blocked: true,
      abTestActive: true,
      targets: [],
    });

    const res = await handleIngest(
      makeRequest(CONVERSION_BODY, variantCookie("b"))
    );
    await runScheduled();

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(persistEvent).not.toHaveBeenCalled();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });

  // V7 — der 400-Guard bleibt VOR jedem DB-Zugriff (I3). Ein Cookie macht aus einem
  // strukturell kaputten Beacon keinen gueltigen.
  it("V7: Pflichtfeld fehlt + Cookie 'b' -> 400, Resolver gar nicht aufgerufen", async () => {
    const res = await handleIngest(
      makeRequest({ trackingKey: "tk-abc", eventID: "evt-123" }, variantCookie("b"))
    );

    expect(res.status).toBe(400);
    expect(getCapiConfigByTrackingKey).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
    expect(persistEvent).not.toHaveBeenCalled();
  });

  // V8 — der PageView bekommt seine Variante (9c braucht ihn als NENNER: Besucher je
  // Variante) und bleibt trotzdem vom Meta-Forward ausgeschlossen (I5). Die beiden
  // Aussagen gehoeren in EINEN Test: eine Varianten-Arbeit, die den Forward-Ausschluss
  // beruehrt, waere sonst nur an einer von beiden sichtbar.
  it("V8: __ps_pageview bekommt variant='b' UND wird weiterhin NICHT geforwardet", async () => {
    const res = await handleIngest(
      makeRequest(
        { ...CONVERSION_BODY, event: PAGEVIEW_EVENT },
        variantCookie("b")
      )
    );
    await runScheduled();

    expect(res.status).toBe(204);
    expect(persistEvent).toHaveBeenCalledWith({
      projectId: "proj-1",
      eventType: PAGEVIEW_EVENT,
      eventId: "evt-123",
      source: "server",
      variant: "b",
    });
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
