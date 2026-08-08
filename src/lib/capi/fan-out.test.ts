import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
// META_TARGET wird MITGELIEFERT, nicht abgeschrieben: der Handler waehlt seinen Adapter
// ueber diese Konstante. Ein Literal hier liesse eine Umbenennung gruen durchrutschen.
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  META_TARGET: "meta",
}));

vi.mock("@/lib/capi/config", () => ({
  META_GRAPH_VERSION: "v21.0",
  META_TEST_EVENT_CODE: "",
}));

// DER ADAPTER LAEUFT ECHT — bis auf T5. Das ist die tragende Entscheidung dieser Datei:
// Waere forwardToMeta pauschal gemockt, prueften die Frist- und Isolations-Tests nur
// noch den Mock, und das Timeout-Geruest (das im Adapter liegt) waere gar nicht im
// Spiel. Nur T5 braucht einen VERTRAGSBRUCH, und den kann der echte Adapter nicht
// liefern — er wirft per Vertrag nie. Deshalb ein Durchreich-Mock mit Schalter:
// solange `override.fn` null ist, laeuft die ECHTE Implementierung.
const { override } = vi.hoisted(() => ({
  override: { fn: null as null | (() => Promise<void>) },
}));
vi.mock("@/lib/capi/meta-forward", async (importActual) => {
  const actual =
    await importActual<typeof import("@/lib/capi/meta-forward")>();
  return {
    forwardToMeta: (...args: Parameters<typeof actual.forwardToMeta>) =>
      override.fn ? override.fn() : actual.forwardToMeta(...args),
  };
});

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

// ===========================================================================
// DER FAN-OUT (Phase 11, siebte Scheibe).
//
// WAS HIER GEPRUEFT WIRD, ist die ANORDNUNG: die Wache vor dem Block, der
// gleichzeitige Start, die Frist als Eigenschaft dieser Gleichzeitigkeit, die
// Isolation der Empfaenger untereinander und die Zuordnung Ziel -> Adapter.
//
// DIE GRENZE, DIE ZWINGEND DAZUGEHOERT: ES GIBT HEUTE NUR EINEN ADAPTER. Wo diese
// Datei ZWEI Empfaenger braucht, setzt sie ZWEIMAL DAS ZIEL "meta" mit
// verschiedenen Pixel-IDs ein. Diese Konstellation kann der Resolver NICHT erzeugen
// — der Primaerschluessel der Geheimnis-Tabelle ist (Projekt, Ziel), es gibt also
// hoechstens eine Zeile je Ziel. Sie ist ein STELLVERTRETER, und zwar ein bewusst
// gewaehlter: Geprueft wird der Fan-Out ueber N Eintraege, und dafuer ist die
// Identitaet der Ziele gleichgueltig. Was sie NICHT beweist, ist das Verhalten eines
// zweiten ECHTEN Netzwerks — das kann sie nicht, weil es keines gibt.
// ===========================================================================

const META_ENTRY = {
  target: "meta",
  config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
};

/** Zwei Empfaenger, an ihren Pixel-IDs (und damit an der Forward-URL) unterscheidbar. */
const TWO_ENTRIES = [
  { target: "meta", config: { pixelId: "FAST", token: "T1" } },
  { target: "meta", config: { pixelId: "SLOW", token: "T2" } },
];

function resolution(targets: unknown[]) {
  return { projectId: "proj-1", blocked: false, abTestActive: false, targets };
}

function makeRequest(): Request {
  return new Request("http://localhost/api/e", {
    method: "POST",
    body: JSON.stringify({
      trackingKey: "tk-abc",
      eventID: "evt-123",
      event: "Purchase",
    }),
  });
}

function fetchCalls() {
  return (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls as [
    string,
    { signal: AbortSignal },
  ][];
}

/** Der fetch-Aufruf, dessen URL diese Pixel-ID traegt. */
function callFor(pixelId: string) {
  return fetchCalls().find(([url]) => String(url).includes(`/${pixelId}/events`));
}

beforeEach(() => {
  scheduled.length = 0;
  override.fn = null;
  persistEvent.mockResolvedValue(undefined);
  getCapiConfigByTrackingKey.mockResolvedValue(resolution([META_ENTRY]));
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
});

afterEach(() => {
  vi.clearAllMocks();
  vi.useRealTimers();
});

describe("Fan-Out — die Wache vor dem Block", () => {
  // ===================================================================
  // T1 — DER EINZIGE TEST, DER DIE GEFAEHRLICHSTE STELLE DIESER SCHEIBE DECKT.
  //
  // Die Forward-Wache prueft die LAENGE der Empfaenger-Menge. Bliebe sie beim
  // frueheren `if (targets && …)`, waere sie IMMER wahr — ein leeres Array ist
  // truthy. Der Compiler sieht das nicht.
  //
  // WARUM DER NAHELIEGENDE TEST HOHL WAERE: "es wurde nichts gesendet" geht in
  // BEIDEN Zustaenden auf, weil eine Schleife ueber eine leere Menge ohnehin nichts
  // sendet. Der Unterschied ist nur daran zu sehen, dass der Block BETRETEN wird —
  // und der einzige beobachtbare Fussabdruck darin sind die Header-Lesungen
  // (resolveClientIp + user-agent).
  //
  // DIE VORBEDINGUNG, die den Zeugen tauglich macht: abTestActive ist false, also
  // liest der Handler den cookie-Header NICHT. Jede Lesung von "user-agent" bzw.
  // "x-vercel-forwarded-for" kann damit NUR aus dem Forward-Block stammen.
  // Geprueft wird auf die konkreten Namen statt auf die blosse Aufrufzahl, damit ein
  // interner Header-Zugriff von request.text() den Test nicht faelschlich rot macht.
  // ===================================================================
  it("T1: KEIN Empfaenger -> der Forward-Block wird gar nicht erst betreten", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(resolution([]));
    const req = makeRequest();
    const headerSpy = vi.spyOn(req.headers, "get");

    const res = await handleIngest(req);

    expect(res.status).toBe(204);
    expect(headerSpy).not.toHaveBeenCalledWith("user-agent");
    expect(headerSpy).not.toHaveBeenCalledWith("x-vercel-forwarded-for");
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // POSITIVKONTROLLE zu T1. Ohne sie waere T1 auch dann gruen, wenn der Zeuge gar
  // nicht funktioniert (falscher Header-Name, Spy greift nicht) — die Abwesenheit
  // waere dann nicht von einem kaputten Instrument zu unterscheiden.
  it("T1-Gegenprobe: MIT Empfaenger werden genau diese Header GELESEN", async () => {
    const req = makeRequest();
    const headerSpy = vi.spyOn(req.headers, "get");

    await handleIngest(req);

    expect(headerSpy).toHaveBeenCalledWith("user-agent");
    expect(headerSpy).toHaveBeenCalledWith("x-vercel-forwarded-for");
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });
});

describe("Fan-Out — Gleichzeitigkeit und Frist", () => {
  // T2 — GLEICHZEITIG, NICHT NACHEINANDER. Der Unterschied ist an der Zahl der
  // fetch-Aufrufe zu sehen, BEVOR einer von ihnen antwortet: seriell waere hier
  // genau einer offen, gleichzeitig sind es zwei.
  it("T2: zwei Empfaenger starten GLEICHZEITIG (beide Aufrufe stehen, bevor einer antwortet)", async () => {
    vi.useFakeTimers();
    getCapiConfigByTrackingKey.mockResolvedValue(resolution(TWO_ENTRIES));
    global.fetch = vi.fn(
      (_url: string, init?: { signal?: AbortSignal }) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    ) as unknown as typeof fetch;

    const pending = handleIngest(makeRequest());
    // Nur die Mikrotasks der Aufloesung durchlassen — keine Zeit vergeht.
    await vi.advanceTimersByTimeAsync(0);

    expect(global.fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(3_000);
    expect((await pending).status).toBe(204);
  });

  // T3 — DIE FRIST WAECHST NICHT MIT DER ZAHL DER EMPFAENGER.
  //
  // Beide haengen. Ein EINZIGER Vorlauf um den Deckel muss beide abbrechen und die
  // Antwort freigeben. Liefe der Fan-Out seriell, startete der zweite Timer erst
  // NACH dem Abbruch des ersten — `pending` bliebe offen und der Test liefe in
  // seinen eigenen Timeout. Genau das ist die Diskriminierung.
  //
  // DER DECKEL STEHT HIER ALS ZAHL, NICHT als importierte Konstante: er ist im
  // Adapter modul-privat, und ein Import gaebe es nicht. Waechst er dort, wird
  // dieser Test rot — das ist gewollt, denn Invariante 1 verlangt dieselbe
  // Obergrenze wie vorher.
  it("T3: zwei haengende Empfaenger sind nach EINEM Deckel (3000ms) beide abgebrochen", async () => {
    vi.useFakeTimers();
    getCapiConfigByTrackingKey.mockResolvedValue(resolution(TWO_ENTRIES));
    global.fetch = vi.fn(
      (_url: string, init?: { signal?: AbortSignal }) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    ) as unknown as typeof fetch;

    const pending = handleIngest(makeRequest());
    await vi.advanceTimersByTimeAsync(3_000);
    const res = await pending;

    expect(res.status).toBe(204);
    expect(callFor("FAST")?.[1].signal.aborted).toBe(true);
    expect(callFor("SLOW")?.[1].signal.aborted).toBe(true);
  });

  // T4 — EIN LANGSAMER EMPFAENGER REISST KEINEN SCHNELLEN MIT.
  //
  // Der schnelle antwortet sofort, der langsame haengt bis zum Deckel. Der Beweis
  // ist das SIGNAL des schnellen: Es darf NICHT abgebrochen sein. Waere das
  // Abbruchsignal geteilt, traefe der Abbruch des langsamen auch ihn — und genau
  // das ist die Mutation M2.
  it("T4: der langsame bricht ab, der schnelle bleibt UNBERUEHRT (kein geteiltes Signal)", async () => {
    vi.useFakeTimers();
    getCapiConfigByTrackingKey.mockResolvedValue(resolution(TWO_ENTRIES));
    global.fetch = vi.fn(
      (url: string, init?: { signal?: AbortSignal }) =>
        String(url).includes("/FAST/events")
          ? Promise.resolve(new Response(null, { status: 200 }))
          : new Promise<Response>((_resolve, reject) => {
              init?.signal?.addEventListener("abort", () =>
                reject(new DOMException("Aborted", "AbortError")),
              );
            }),
    ) as unknown as typeof fetch;

    const pending = handleIngest(makeRequest());
    await vi.advanceTimersByTimeAsync(3_000);
    const res = await pending;

    expect(res.status).toBe(204);
    expect(callFor("SLOW")?.[1].signal.aborted).toBe(true);
    expect(callFor("FAST")?.[1].signal.aborted).toBe(false);
  });
});

describe("Fan-Out — Containment und Ziel-Zuordnung", () => {
  // T5 — EIN VERTRAGSBRUECHIGER ADAPTER BRICHT DAS 204-CONTAINMENT NICHT.
  //
  // Der echte Adapter wirft per Vertrag nie; dieser Test setzt den Vertrag ausser
  // Kraft, weil genau dagegen allSettled schuetzt. Mit Promise.all verliesse die
  // Ablehnung den Handler und aus der garantierten leeren 204 wuerde ein 500 — und
  // der leakt den Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer.
  it("T5: wirft ein Empfaenger trotz Vertrag, bleibt die Antwort eine leere 204", async () => {
    override.fn = () => Promise.reject(new Error("Vertragsbruch"));

    const res = await handleIngest(makeRequest());

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });

  // T6 — INVARIANTE 6, STRUKTURELL. Ein Ziel ohne Adapter loest NICHTS aus. Der
  // Eintrag ist vollstaendig (Pixel-ID und Geheimnis), er waere also "fertig
  // konfiguriert" — und trotzdem darf nichts hinausgehen, solange kein Adapter
  // existiert.
  it("T6: ein Ziel OHNE Adapter wird uebersprungen — kein Aufruf, trotzdem 204", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        { target: "pinterest", config: { pixelId: "TAG-987", token: "PIN" } },
      ]),
    );

    const res = await handleIngest(makeRequest());

    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // T7 — DIE GEGENPROBE ZU T6, und sie ist noetig, damit T6 nicht aus dem falschen
  // Grund gruen ist: Steht neben dem adapterlosen Ziel ein Meta-Eintrag, geht GENAU
  // EIN Aufruf hinaus — der von Meta. Ohne diesen Test waere T6 auch dann gruen,
  // wenn der Fan-Out ueberhaupt nichts mehr sendet.
  it("T7: adapterloses Ziel NEBEN Meta -> genau EIN Aufruf, und zwar Metas", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        { target: "pinterest", config: { pixelId: "TAG-987", token: "PIN" } },
        META_ENTRY,
      ]),
    );

    await handleIngest(makeRequest());

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
    expect(String(fetchCalls()[0][0])).not.toContain("TAG-987");
  });
});
