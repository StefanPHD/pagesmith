import { afterEach, beforeEach, describe, expect, it, vi, type Mock } from "vitest";

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

// DASSELBE MUSTER EIN ZWEITES MAL, FUER DEN ZWEITEN ADAPTER (zwoelfte Scheibe) —
// und aus WOERTLICH demselben Grund: Auch er wirft per Vertrag nie, also kann nur
// ein Durchreich-Schalter den VERTRAGSBRUCH herstellen, gegen den allSettled
// schuetzt. Solange `pinOverride.fn` null ist, laeuft die ECHTE Implementierung —
// samt eigenem Timeout-Geruest, eigenem AbortController und eigener Nutzlast.
// WAERE ER PAUSCHAL GEMOCKT, prueften die Isolations-Tests unten nur noch den Mock,
// und die Aussage "zwei ECHTE Empfaenger" waere genau die, die verlorenginge.
const { pinOverride } = vi.hoisted(() => ({
  pinOverride: { fn: null as null | (() => Promise<void>) },
}));
vi.mock("@/lib/capi/pinterest-forward", async (importActual) => {
  const actual =
    await importActual<typeof import("@/lib/capi/pinterest-forward")>();
  return {
    forwardToPinterest: (
      ...args: Parameters<typeof actual.forwardToPinterest>
    ) => (pinOverride.fn ? pinOverride.fn() : actual.forwardToPinterest(...args)),
  };
});

// DASSELBE MUSTER EIN DRITTES MAL, FUER DEN DRITTEN ADAPTER (Phase 11, Scheibe C1).
// DIESE DATEI KANNTE IHN BIS HIERHER NICHT — gemessen am Repo (2026-08-12, formale
// Suche: NULL Treffer), und genau deshalb war der dritte Ziel-Zweig im Verteiler von
// KEINEM Test gedeckt. Der Schalter folgt dem Muster der beiden darueber: Solange
// `tikOverride.fn` null ist, laeuft die ECHTE Implementierung; der Kreuzvergleich
// unten setzt ihn, weil er die ZUORDNUNG messen will und nicht das Netzwerk.
const { tikOverride } = vi.hoisted(() => ({
  tikOverride: { fn: null as null | (() => Promise<void>) },
}));
vi.mock("@/lib/capi/tiktok-forward", async (importActual) => {
  const actual =
    await importActual<typeof import("@/lib/capi/tiktok-forward")>();
  return {
    forwardToTiktok: (...args: Parameters<typeof actual.forwardToTiktok>) =>
      tikOverride.fn ? tikOverride.fn() : actual.forwardToTiktok(...args),
  };
});

// DASSELBE MUSTER EIN VIERTES MAL, FUER DEN VIERTEN ADAPTER (Scheibe 11.1f).
// ER IST NEU HINZUGEKOMMEN, UND OHNE IHN MISST DIESE DATEI ETWAS ANDERES, ALS SIE
// BEHAUPTET: Bis 11.1e war 'linkedin' ein Ziel OHNE Empfaenger, der Verteiler
// uebersprang es, und kein Mock war noetig. Seit dem Adapter-Eintrag laeuft im
// Kreuzvergleich sonst die ECHTE Implementierung — samt fetch gegen einen fremden
// Endpunkt, aus einem Unit-Test heraus.
const { linkOverride } = vi.hoisted(() => ({
  linkOverride: { fn: null as null | (() => Promise<void>) },
}));
vi.mock("@/lib/capi/linkedin-forward", async (importActual) => {
  const actual =
    await importActual<typeof import("@/lib/capi/linkedin-forward")>();
  return {
    forwardToLinkedin: (
      ...args: Parameters<typeof actual.forwardToLinkedin>
    ) => (linkOverride.fn ? linkOverride.fn() : actual.forwardToLinkedin(...args)),
  };
});

// DER FUENFTE ADAPTER (Scheibe 4 der Phase 11.2), nach demselben Muster wie die vier
// darueber. OHNE IHN liefe die echte Implementierung: Sie faende in der Fixture keine
// Zuordnung, ginge an ihrem eigenen Riegel heraus — und der Kreuzvergleich meldete
// "der Adapter wurde nicht gerufen", obwohl der Verteiler richtig verdrahtet ist. Ein
// Fehlschlag, dessen Ursache zwei Dateien entfernt liegt.
const { goOverride } = vi.hoisted(() => ({
  goOverride: { fn: null as null | (() => Promise<void>) },
}));
vi.mock("@/lib/capi/google-forward", async (importActual) => {
  const actual = await importActual<typeof import("@/lib/capi/google-forward")>();
  return {
    forwardToGoogle: (...args: Parameters<typeof actual.forwardToGoogle>) =>
      goOverride.fn ? goOverride.fn() : actual.forwardToGoogle(...args),
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
// BEWUSST die ECHTEN Konstanten, KEINE Kopien — dieselbe Disziplin wie in
// ingest.consent-targets.test.ts: Feldname und Ziel-Schluessel muessen dieselben
// sein, die Erzeuger und Leser benutzen. Ein handgeschriebenes Literal hier liesse
// eine Divergenz gruen durchrutschen, und der Ausgang waere fail-closed und lautlos.
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";
// DIE ZIEL-LISTE, NICHT eine Handliste: Der Kreuzvergleich unten laeuft ueber sie,
// damit ein VIERTES Ziel dort automatisch einen eigenen Lauf bekommt.
import { TRACKING_TARGETS, type TrackingTarget } from "@/lib/settings";
// DIE ECHTE ADAPTER-TATSACHE, NICHT EINE ZWEITE LISTE IM TEST (11.1a): Welche Ziele
// einen Empfaenger haben, steht genau einmal (TARGETS_WITH_ADAPTER). Eine abgeschriebene
// Aufzaehlung hier liefe beim naechsten Adapter still auseinander — und der Test maesse
// dann eine Verdrahtung, die es nicht mehr gibt.
import { hasAdapter } from "@/lib/tracking/target-adapters";

// ===========================================================================
// DER FAN-OUT (Phase 11, siebte Scheibe; um zwei ECHTE Empfaenger erweitert in der
// ZWOELFTEN).
//
// WAS HIER GEPRUEFT WIRD, ist die ANORDNUNG: die Wache vor dem Block, der
// gleichzeitige Start, die Frist als Eigenschaft dieser Gleichzeitigkeit, die
// Isolation der Empfaenger untereinander und die Zuordnung Ziel -> Adapter.
//
// ZWEI SORTEN VON "ZWEI EMPFAENGERN" STEHEN IN DIESER DATEI NEBENEINANDER, und der
// Unterschied ist der Grund, warum beide bleiben:
//
//  (1) DER STELLVERTRETER (TWO_ENTRIES, T2/T3/T4): ZWEIMAL das Ziel "meta" mit
//      verschiedenen Pixel-IDs. Diese Konstellation kann der Resolver NICHT
//      erzeugen — der Primaerschluessel der Geheimnis-Tabelle ist (Projekt, Ziel),
//      es gibt hoechstens eine Zeile je Ziel. Geprueft wird der Fan-Out ueber N
//      EINTRAEGE, und dafuer ist die Identitaet der Ziele gleichgueltig. ER BLEIBT:
//      beide Beine laufen durch DENSELBEN Adapter, also durch denselben Deckel —
//      genau das macht ihn fuer die Frist-Tests zum schaerferen Instrument.
//  (2) ZWEI ECHTE EMPFAENGER (der letzte describe-Block, zwoelfte Scheibe): Meta
//      und Pinterest nebeneinander, ZWEI verschiedene Adapter, zwei verschiedene
//      Endpunkte, zwei unabhaengige Timeout-Geruests. Bis zur elften Scheibe war
//      das nicht baubar, weil es nur EINEN Adapter gab — der Backlog-Kandidat
//      "KEIN TEST DECKT DEN FAN-OUT MIT ZWEI ECHTEN EMPFAENGERN" ist damit erledigt.
//
// DIE GRENZE, DIE FUER BEIDE SORTEN GILT: `fetch` ist gestellt. Diese Datei beweist
// die ANORDNUNG, nicht das Verhalten eines echten fremden Netzwerks — und schon gar
// nicht die Treue der Pinterest-Transkription zur Wirklichkeit. Das kann nur der
// Live-Test der zwoelften Scheibe.
// ===========================================================================

const META_ENTRY = {
  target: "meta",
  config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
};

/**
 * Der ZWEITE ECHTE Empfaenger (zwoelfte Scheibe).
 *
 * Die Feldnamen sind die der AUFLOESUNG (CapiConfig: pixelId/token) — die
 * Uebersetzung in die eigene Form des zweiten Adapters (adAccountId/token) ist
 * genau das, was die Zuordnung leistet und was T10 prueft. Die Werte sind
 * ABSICHTLICH unverwechselbar und teilen KEINEN Teilstring mit Metas Werten:
 * Nur so kann eine Assertion "die Kennung steht im Pfad, das Geheimnis NICHT"
 * ueberhaupt etwas zeigen.
 */
const PIN_ENTRY = {
  target: "pinterest",
  config: { pixelId: "ADACCT-4242", token: "PINSECRET-9999" },
};

/** Zwei Empfaenger, an ihren Pixel-IDs (und damit an der Forward-URL) unterscheidbar. */
const TWO_ENTRIES = [
  { target: "meta", config: { pixelId: "FAST", token: "T1" } },
  { target: "meta", config: { pixelId: "SLOW", token: "T2" } },
];

function resolution(targets: unknown[]) {
  // renewable IST SEIT SCHEIBE 1b-2a TEIL JEDER AUFLOESUNG UND IM TYP NICHT OPTIONAL.
  // HIER STEHT ES LEER, UND DAS IST TRAGEND FUER DIESE DATEI: Sie misst
  // Gleichzeitigkeit, Frist und Containment des Fan-Outs. Eine Rettung laege SERIELL
  // VOR dem Fan-Out und verschoebe genau die Zeiten, die diese Laeufe pinnen. Was die
  // geoeffnete Forward-Wache leistet, prueft H10 in ingest.refresh.test.ts.
  return {
    projectId: "proj-1",
    blocked: false,
    abTestActive: false,
    targets,
    renewable: [],
  };
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

/**
 * EIN REQUEST MIT IDENTITAETS-PAAR UND EINWILLIGUNG FUER BEIDE ZIELE.
 *
 * DIE ZWEI HEADER SIND KEINE KOSMETIK UND DUERFEN NICHT ENTFERNT WERDEN — sie sind
 * die Voraussetzung dafuer, dass der zweite Adapter ueberhaupt sendet:
 * `forwardToPinterest` traegt als erste Anweisung im try das IDENTITAETS-PAAR
 * (`if (!clientIp || !userAgent) return;`) und kehrt ohne beides VOR jedem fetch
 * zurueck — ohne Log, ohne Spur. Ein Fixture ohne diese Header laesst JEDEN Test
 * ueber das zweite Ziel gruen werden, auch wenn die Zuordnung gar nichts tut: "kein
 * Aufruf" waere dann wahr aus einem Grund, den der Testname nicht nennt.
 * DER ERSTE ADAPTER HAT DIESEN RIEGEL NICHT (er laesst jede Haelfte einzeln weg) —
 * deshalb faellt das Fehlen bei Meta nicht auf und bei Pinterest schon.
 * GEMESSEN AN GENAU DIESER STELLE (zwoelfte Scheibe, Stufe 1): Der Bestandstest
 * "Feld MIT VERBOT fuer Meta" in ingest.consent-targets.test.ts war deshalb still
 * hohl geworden — die Ausgangslage jener Scheibe sagte, "es geht dann ein Aufruf
 * hinaus", und im eigenen Fixture ging keiner hinaus.
 *
 * DIE ADRESSE MUSS OEFFENTLICH SEIN: resolveClientIp verwirft loopback (::1,
 * 127.0.0.0/8) und leere Werte; mit gemocktem META_TEST_EVENT_CODE ("") gibt es
 * dann auch keine Dev-Dummy-IP. 203.0.113.7 stammt aus dem Dokumentations-Block
 * TEST-NET-3 und ist garantiert keine echte Adresse.
 *
 * DAS EINWILLIGUNGS-FELD IST GETRENNT SCHALTBAR, UND `null` IST KEIN GRENZFALL,
 * SONDERN EIN EIGENER PRUEFZUSTAND: Es laesst das Feld GANZ weg und stellt damit
 * die ALTBESTANDS-AUSNAHME her (der Zustand jeder heute publizierten Kundenseite).
 * Mit Identitaets-Paar UND ohne Feld wird die Ausnahme zum ersten Mal scharf
 * pruefbar — vorher waere ein durchgerutschter zweiter Empfaenger unsichtbar
 * geblieben, weil er ohne Identitaet ohnehin nicht gesendet haette.
 */
function makeRequestWithIdentity(
  consent: { meta: unknown; pinterest: unknown } | null = {
    meta: true,
    pinterest: true,
  },
): Request {
  const body: Record<string, unknown> = {
    trackingKey: "tk-abc",
    eventID: "evt-123",
    event: "Purchase",
  };
  if (consent) {
    body[CONSENT_WIRE_FIELD] = {
      [CONSENT_KEY_BY_TARGET.meta]: consent.meta,
      [CONSENT_KEY_BY_TARGET.pinterest]: consent.pinterest,
    };
  }
  return new Request("http://localhost/api/e", {
    method: "POST",
    headers: {
      "user-agent": "Mozilla/5.0 (Fan-Out-Test)",
      "x-vercel-forwarded-for": "203.0.113.7",
    },
    body: JSON.stringify(body),
  });
}

function fetchCalls() {
  return (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls as [
    string,
    { signal: AbortSignal; headers?: Record<string, string> },
  ][];
}

/** Der fetch-Aufruf, dessen URL diese Pixel-ID traegt. */
function callFor(pixelId: string) {
  return fetchCalls().find(([url]) => String(url).includes(`/${pixelId}/events`));
}

/** Der Aufruf an das jeweilige Netzwerk — ueber den HOST, nicht ueber die Kennung. */
function metaCall() {
  return fetchCalls().find(([url]) => String(url).includes("graph.facebook.com"));
}
function pinterestCall() {
  return fetchCalls().find(([url]) => String(url).includes("api.pinterest.com"));
}

beforeEach(() => {
  scheduled.length = 0;
  override.fn = null;
  pinOverride.fn = null;
  // Der dritte Schalter wird hier MIT zurueckgesetzt, obwohl ihn heute nur der
  // letzte Block setzt: Ein Schalter, der nur an einer Stelle geleert wird, traegt
  // seinen Wert in jeden Test, der danach laeuft.
  tikOverride.fn = null;
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

  // T6 — EIN EINZIGER EMPFAENGER, DEN DIE ALTBESTANDS-ROLLE NICHT DURCHLAESST.
  //
  // ZWEIMAL UMBENANNT WORDEN, UND BEIDE MALE AUS DEMSELBEN GRUND: Der Zustand, den
  // dieses Fixture herstellt, ist ein anderer geworden, ohne dass eine Assertion sich
  // geaendert haette.
  //  - URSPRUENGLICH (siebte Scheibe) hiess er "ein Ziel OHNE Adapter wird
  //    uebersprungen" und war Invariante 6, strukturell.
  //  - SEIT DER NEUNTEN erreicht er die Zuordnung gar nicht mehr: Der Draht traegt
  //    kein Einwilligungs-Feld, die Altbestands-Rolle erlaubt nur Meta, die erlaubte
  //    Menge ist LEER — der Ausgang kehrt zurueck, BEVOR dispatchForward gerufen wird.
  //  - SEIT DER ZWOELFTEN ist der Name zusaetzlich sachlich falsch: das zweite Ziel
  //    HAT einen Adapter. Deshalb heisst er jetzt nach dem, was er wirklich prueft.
  // WAS ER BEWEIST: Bleibt nach der Einwilligung kein Empfaenger uebrig, geht nichts
  // hinaus und die Antwort ist eine leere 204.
  // DIE ABDECKUNG "die ZUORDNUNG ueberspringt ein Ziel ohne Adapter" EXISTIERT NICHT
  // MEHR — und sie kann nicht mehr existieren: Seit der zwoelften Scheibe hat JEDES
  // bekannte Ziel einen Adapter, und ein UNBEKANNTES Ziel erreicht die Zuordnung nie
  // (es faellt schon in allowedTargets heraus, weil weder LEGACY_CONSENT_ROLE noch
  // CONSENT_KEY_BY_TARGET einen Eintrag dafuer haben). Der Rueckfall
  // `return Promise.resolve()` in dispatchForward ist damit aus dem Handler heraus
  // strukturell unerreichbar. Der frueher hier stehende Verweis auf
  // ingest.consent-targets.test.ts ("Feld MIT VERBOT fuer Meta") ist mit dieser
  // Scheibe hinfaellig und wurde entfernt, statt auf einen Test zu zeigen, der jene
  // Abdeckung nicht mehr traegt.
  // DAS FIXTURE TRAEGT SEIT DER ZWOELFTEN SCHEIBE DAS IDENTITAETS-PAAR (mit `null`
  // fuer das Einwilligungs-Feld, damit die Altbestands-Rolle greift). VORHER WAR
  // DIESE ASSERTION HOHL: Ohne IP und User-Agent haette der zweite Adapter auch dann
  // nichts gesendet, wenn die Altbestands-Rolle ihn durchgelassen haette — "kein
  // Aufruf" waere aus dem falschen Grund wahr gewesen. Jetzt ist es eine Aussage
  // ueber die ROLLE.
  it("T6: EIN Empfaenger, den die Altbestands-Rolle nicht durchlaesst -> kein Aufruf, trotzdem 204", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        { target: "pinterest", config: { pixelId: "TAG-987", token: "PIN" } },
      ]),
    );

    const res = await handleIngest(makeRequestWithIdentity(null));

    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  // T7 — DIE GEGENPROBE ZU T6, und sie ist noetig, damit T6 nicht aus dem falschen
  // Grund gruen ist: Steht neben dem nicht durchgelassenen Ziel ein Meta-Eintrag,
  // geht GENAU EIN Aufruf hinaus — der von Meta. Ohne diesen Test waere T6 auch dann
  // gruen, wenn der Fan-Out ueberhaupt nichts mehr sendet.
  //
  // SEIT DER NEUNTEN SCHEIBE GILT FUER IHN ETWAS ANDERES ALS FUER T6, und genau dieser
  // Unterschied ist der Befund — eine Sammelformulierung fuer beide waere falsch: Er
  // erreicht die Zuordnung WEITERHIN, denn Meta bleibt uebrig und wird durchgereicht.
  // WAS DAS ZWEITE ZIEL ENTFERNT, IST DIE EINWILLIGUNG: Ohne Wire-Feld erlaubt die
  // Altbestands-Rolle nur Meta, der Pinterest-Eintrag faellt schon VOR der Zuordnung
  // heraus. SEIT DER ZWOELFTEN ist das der EINZIGE Grund — das Ziel hat jetzt einen
  // Adapter, es wuerde also senden, sobald der Draht es erlaubt — der Nachweis
  // dafuer steht im Block "ZWEI ECHTE EMPFAENGER" weiter unten, in derselben Datei.
  // WAS ER BEWEIST: seine urspruengliche Aufgabe als Positivkontrolle zu T6 — dass
  // ueberhaupt etwas hinausgeht, und zwar genau Metas Aufruf.
  // DER VERWEIS AUF ingest.consent-targets.test.ts IST MIT DER ZWOELFTEN SCHEIBE
  // ENTFERNT: Er zeigte auf den Fall "Feld MIT VERBOT fuer Meta" als Ort der
  // Abdeckung "adapterloses Ziel laeuft in die Zuordnung hinein" — diese Abdeckung
  // existiert nicht mehr (Begruendung bei T6).
  it("T7: zweites Ziel OHNE Einwilligung neben Meta -> genau EIN Aufruf, und zwar Metas", async () => {
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        { target: "pinterest", config: { pixelId: "TAG-987", token: "PIN" } },
        META_ENTRY,
      ]),
    );

    // Auch hier das Identitaets-Paar, aus demselben Grund wie bei T6 — sonst
    // koennte der zweite Empfaenger die Rolle durchbrechen, ohne dass es auffiele.
    await handleIngest(makeRequestWithIdentity(null));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
    expect(String(fetchCalls()[0][0])).not.toContain("TAG-987");
    expect(pinterestCall()).toBeUndefined();
  });
});

// ===========================================================================
// ZWEI ECHTE EMPFAENGER (Phase 11, ZWOELFTE Scheibe).
//
// AB HIER STEHEN ZWEI VERSCHIEDENE ADAPTER NEBENEINANDER — nicht mehr zweimal
// derselbe. Was diese vier Tests zusammen tragen, ist die Zusage, die der Zuschnitt
// als seine tragende bezeichnet: DER ERSTE EMPFAENGER VERHAELT SICH UNVERAENDERT,
// auch wenn der zweite langsam ist, wirft oder seinen Vertrag bricht.
//
// ALLE FIXTURES HIER TRAGEN DAS IDENTITAETS-PAAR (s. makeRequestWithIdentity) — ohne
// es sendet der zweite Adapter grundsaetzlich nicht, und jede dieser Assertions
// waere aus dem falschen Grund gruen.
// ===========================================================================

describe("Fan-Out — ZWEI ECHTE EMPFAENGER (Meta und Pinterest nebeneinander)", () => {
  /** Ein Erfolgs-Rumpf, wie der zweite Adapter ihn als Erfolg liest. */
  function pinterestOkBody(): string {
    return JSON.stringify({
      num_events_received: 1,
      num_events_processed: 1,
      events: [{ status: "processed" }],
    });
  }

  beforeEach(() => {
    getCapiConfigByTrackingKey.mockResolvedValue(resolution([META_ENTRY, PIN_ENTRY]));
    // Beide Beine antworten sauber; der Pinterest-Rumpf muss ein ECHTER Erfolgs-Rumpf
    // sein, sonst schreibt evaluateSuccessBody eine Fehlerzeile ins Testprotokoll und
    // verdeckt echte Meldungen.
    global.fetch = vi.fn(async (url: string) =>
      String(url).includes("api.pinterest.com")
        ? new Response(pinterestOkBody(), { status: 200 })
        : new Response(null, { status: 200 }),
    ) as unknown as typeof fetch;
    vi.spyOn(console, "error").mockImplementation(() => {});
  });

  // =====================================================================
  // T10 — DIE ZUORDNUNG UND DIE ABBILDUNG.
  //
  // DER EINZIGE TEST IM REPO GEGEN DIE VERTAUSCHTE ABBILDUNG, und er ist als
  // solcher benannt, damit ihn niemand als redundant entfernt: Die beiden
  // Konfigurations-Formen unterscheiden sich (CapiConfig {pixelId, token} gegen
  // PinterestConfig {adAccountId, token}), und die Uebersetzung dazwischen ist ein
  // Objektliteral aus ZWEI Feldern DESSELBEN Typs. Der Compiler faengt die falsche
  // FORM (ein direktes Durchreichen bricht den Build, weil adAccountId fehlt), aber
  // NICHT die vertauschten WERTE — `{ adAccountId: config.token, token:
  // config.pixelId }` kompiliert anstandslos.
  // WARUM DAS MEHR IST ALS EIN FEHLGESCHLAGENER FORWARD: Vertauscht stuende das
  // GEHEIMNIS im Endpunkt-PFAD (und damit potenziell in fremden Zugriffsprotokollen),
  // waehrend die oeffentliche Kennung als Bearer reiste. Deshalb prueft dieser Test
  // BEIDE Richtungen einzeln: die Kennung IM Pfad, das Geheimnis NICHT im Pfad,
  // sondern im Authorization-Header.
  // =====================================================================
  it("T10: beide Ziele erlaubt -> ZWEI Aufrufe, jeder an sein Netzwerk, mit richtig abgebildeter Konfiguration", async () => {
    const res = await handleIngest(makeRequestWithIdentity());

    expect(res.status).toBe(204);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    // --- Das erste Bein: unveraendert wie ohne den zweiten Empfaenger ---
    const meta = metaCall();
    expect(meta).toBeDefined();
    expect(String(meta?.[0])).toContain("/PIXEL-123/events");
    expect(String(meta?.[0])).not.toContain("ADACCT-4242");
    expect(String(meta?.[0])).not.toContain("PINSECRET-9999");

    // --- Das zweite Bein: Kennung im PFAD, Geheimnis im HEADER ---
    const pin = pinterestCall();
    expect(pin).toBeDefined();
    expect(String(pin?.[0])).toContain("/v5/ad_accounts/ADACCT-4242/events");
    expect(String(pin?.[0])).not.toContain("PINSECRET-9999");
    expect(pin?.[1].headers?.Authorization).toBe("Bearer PINSECRET-9999");
  });

  // =====================================================================
  // T11 — INVARIANTE 1, DER KERN DER SCHEIBE: EIN LANGSAMER ZWEITER EMPFAENGER
  // REISST DEN ERSTEN NICHT MIT.
  //
  // Der Beweis ist das SIGNAL des ersten: Es darf NICHT abgebrochen sein, obwohl
  // der zweite am Deckel abgebrochen wurde. Waere das Abbruchsignal geteilt (oder
  // gaebe es einen gemeinsamen Wecker per Promise.race), traefe der Abbruch beide.
  // BIS ZUR ELFTEN SCHEIBE WAR DAS NUR MIT ZWEI STELLVERTRETERN PRUEFBAR (T4) —
  // hier laufen zum ersten Mal ZWEI VERSCHIEDENE Timeout-Geruests in ZWEI
  // VERSCHIEDENEN Modulen gegeneinander.
  //
  // DIE 3000 STEHT ALS LITERAL, UND DAS IST EINE AUSSAGE: Sie spiegelt ZWEI
  // unabhaengige, modul-private Konstanten (META_FORWARD_TIMEOUT_MS und
  // PINTEREST_FORWARD_TIMEOUT_MS). Ihre Gleichheit ist heute Zufall der Herkunft und
  // von keinem Test behauptet — es gibt keine Stelle, die beide nebeneinander sieht
  // (gefuehrter Backlog-Kandidat). WIRD DIESER TEST HIER ROT, HEISST DAS: EINER DER
  // BEIDEN DECKEL HAT SICH BEWEGT. Es heisst NICHT, dass die Anordnung kaputt ist.
  // =====================================================================
  it("T11: der zweite Empfaenger haengt bis zum Deckel — der erste bleibt UNBERUEHRT", async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn(
      (url: string, init?: { signal?: AbortSignal }) =>
        String(url).includes("api.pinterest.com")
          ? new Promise<Response>((_resolve, reject) => {
              init?.signal?.addEventListener("abort", () =>
                reject(new DOMException("Aborted", "AbortError")),
              );
            })
          : Promise.resolve(new Response(null, { status: 200 })),
    ) as unknown as typeof fetch;

    const pending = handleIngest(makeRequestWithIdentity());
    await vi.advanceTimersByTimeAsync(0);
    // BEIDE AUFRUFE SIND ERFOLGT — aber dieser Test beweist damit NICHT, dass sie
    // gleichzeitig gestartet sind, und der Kommentar sagt das ausdruecklich, weil er
    // bis zur Mutationsprobe das Gegenteil behauptet hat: Das erste Bein antwortet
    // hier SOFORT, also ist auch seriell nach dem Durchlauf der Mikrotasks der
    // zweite Aufruf schon abgesetzt. GEMESSEN (M3-Probe, zwoelfte Scheibe): Bei
    // serieller Abarbeitung bleibt dieser Test GRUEN. Die Gleichzeitigkeit traegt
    // T14 (beide Beine haengen), diese Zeile traegt nur die Vorbedingung fuer die
    // Signal-Assertions darunter.
    expect(global.fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(3_000);
    const res = await pending;

    expect(res.status).toBe(204);
    expect(pinterestCall()?.[1].signal.aborted).toBe(true);
    expect(metaCall()?.[1].signal.aborted).toBe(false);
  });

  // =====================================================================
  // T14 — DIE GLEICHZEITIGKEIT ZWEIER ECHTER EMPFAENGER.
  //
  // NACHGESCHOBEN NACH DER M3-PROBE DIESER SCHEIBE, und das steht hier, statt es zu
  // verschweigen: Der Stufe-1-Plan sagte voraus, T11 werde bei serieller Abarbeitung
  // rot. ER BLIEB GRUEN — weil dort das erste Bein sofort antwortet und der zweite
  // Aufruf deshalb auch seriell schon abgesetzt ist, wenn gemessen wird. Die
  // Gleichzeitigkeit ZWEIER ECHTER Empfaenger war damit ungedeckt; T2 und T3 decken
  // sie nur fuer den Stellvertreter (zweimal derselbe Adapter).
  //
  // DIE DISKRIMINIERUNG: BEIDE Beine haengen. Gleichzeitig stehen nach dem Durchlauf
  // der Mikrotasks ZWEI Aufrufe; seriell stuende genau EINER, denn das zweite Bein
  // startete erst nach dem Abbruch des ersten. Und ein EINZIGER Vorlauf um den
  // Deckel muss BEIDE abbrechen — seriell liefe der Test in seinen eigenen Timeout.
  //
  // DIE 3000 STEHT ALS LITERAL, UND DAS IST EINE AUSSAGE: Sie spiegelt ZWEI
  // unabhaengige, modul-private Konstanten (META_FORWARD_TIMEOUT_MS in
  // meta-forward.ts, PINTEREST_FORWARD_TIMEOUT_MS in pinterest-forward.ts). Ihre
  // Gleichheit ist heute Zufall der Herkunft und von KEINER Stelle im Produktivcode
  // behauptet — es gibt keinen Ort, der beide nebeneinander sieht (gefuehrter
  // Backlog-Kandidat "DER DECKELWERT IST MODUL-PRIVAT UND VON AUSSEN NICHT LESBAR").
  // WIRD DIESER TEST ROT, HEISST DAS ZUERST: EINER DER BEIDEN DECKEL HAT SICH
  // BEWEGT. Es heisst NICHT automatisch, dass die Anordnung kaputt ist.
  // =====================================================================
  it("T14: BEIDE Empfaenger haengen -> beide Aufrufe stehen sofort, und EIN Deckel (3000ms) bricht beide ab", async () => {
    vi.useFakeTimers();
    global.fetch = vi.fn(
      (_url: string, init?: { signal?: AbortSignal }) =>
        new Promise<Response>((_resolve, reject) => {
          init?.signal?.addEventListener("abort", () =>
            reject(new DOMException("Aborted", "AbortError")),
          );
        }),
    ) as unknown as typeof fetch;

    const pending = handleIngest(makeRequestWithIdentity());
    await vi.advanceTimersByTimeAsync(0);
    expect(global.fetch).toHaveBeenCalledTimes(2);

    await vi.advanceTimersByTimeAsync(3_000);
    const res = await pending;

    expect(res.status).toBe(204);
    expect(metaCall()?.[1].signal.aborted).toBe(true);
    expect(pinterestCall()?.[1].signal.aborted).toBe(true);
  });

  // T12 — EIN WERFENDES ZWEITES BEIN, OHNE MOCK. Der ECHTE zweite Adapter faengt
  // den Wurf in seinem eigenen catch; der Beweis ist, dass der erste Aufruf
  // trotzdem hinausging und die Antwort eine leere 204 blieb. Das prueft die
  // VERTRAGSTREUE des echten Adapters — im Unterschied zu T13, das den Vertrag
  // ausser Kraft setzt.
  it("T12: wirft das Netzwerk beim zweiten Empfaenger, geht der erste trotzdem hinaus", async () => {
    global.fetch = vi.fn((url: string) => {
      if (String(url).includes("api.pinterest.com")) throw new Error("Netz kaputt");
      return Promise.resolve(new Response(null, { status: 200 }));
    }) as unknown as typeof fetch;

    const res = await handleIngest(makeRequestWithIdentity());

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(metaCall()).toBeDefined();
  });

  // T13 — DAS 204-CONTAINMENT MIT ZWEI ECHTEN ZIELEN. Das Gegenstueck zu T5, nur
  // fuer das zweite Bein: Der echte Adapter wirft per Vertrag nie, also setzt dieser
  // Test den Vertrag ueber den Durchreich-Schalter ausser Kraft. Mit Promise.all
  // statt allSettled verliesse die Ablehnung den Handler, und aus der garantierten
  // leeren 204 wuerde ein 500 — der leakt den Gueltigkeitszustand des trackingKeys
  // an einen anonymen Aufrufer.
  it("T13: bricht der ZWEITE Empfaenger seinen Vertrag, bleibt die Antwort eine leere 204 — und der erste sendet", async () => {
    pinOverride.fn = () => Promise.reject(new Error("Vertragsbruch"));

    const res = await handleIngest(makeRequestWithIdentity());

    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    expect(metaCall()).toBeDefined();
  });
});

// ===========================================================================
// DER KREUZVERGLEICH ZIEL -> ADAPTER (Phase 11, Scheibe C1).
//
// WOGEGEN ER GEBAUT WURDE — GEMESSEN am Repo (2026-08-13, Scheibe C1): Die
// Adapter-Tatsache wurde damals an ZWEI Orten behauptet, und die beiden waren durch
// NICHTS verbunden — das Feld hasAdapter in TARGET_CARDS (components/TargetCard.tsx)
// und die Ziel-Zweige in dispatchForward (capi/ingest.ts). Kein Typ und kein Test
// hielt sie zusammen.
// DIE GEFAEHRLICHE RICHTUNG WAR VOLLSTAENDIG UNBEWACHT: Wer einen Ziel-Zweig
// entfernte, waehrend die Karte weiter einen Adapter behauptete, bekam KEINEN roten
// Test — das Ziel sendete dann nichts, die Oberflaeche sagte nichts, und es gab weder
// Fehler noch Logzeile. Die harmlose Gegenrichtung (Behauptung entfernt, Zweig
// bleibt) war dagegen gedeckt.
//
// SEIT SCHEIBE C2 GIBT ES DIE BEIDEN TRAEGER NICHT MEHR — NACHGEZOGEN IST DIESER
// KOMMENTAR, KEINE ASSERTION: Die Tatsache steht jetzt EINMAL
// (TARGETS_WITH_ADAPTER in tracking/target-adapters.ts), das Feld an der Karte ist
// entfallen, und die Zuordnung im Verteiler ist compiler-gebunden. Damit sind ein
// FEHLENDER und ein UEBERZAEHLIGER Eintrag BUILD-Fehler und brauchen hier keinen
// Test.
// WARUM DIESER BLOCK TROTZDEM UNVERAENDERT GILT — und das ist der Grund, warum an
// seinen Zusicherungen nichts angefasst wurde: Die VERTAUSCHUNG zweier Eintraege
// kompiliert anstandslos. Gegen sie hilft kein Typ, sondern nur ein Lauf, der sieht,
// welcher Adapter wirklich gerufen wird. Genau das tut er.
//
// WAS DIESER BLOCK MISST UND WAS NICHT: Er misst die ZUORDNUNG — erreicht das
// aufgeloeste Ziel X genau den Adapter X? Er misst NICHT, ob dieser Adapter fachlich
// richtig baut, ob Zugangsdaten gelten oder ob ein Anbieter annimmt; die drei Adapter
// sind hier ausgeschaltet. Fuer die Nutzlast-Abbildung des zweiten Ziels ist T10
// zustaendig, fuer Fristen und Isolation die Bloecke darueber.
//
// ER LAEUFT UEBER TRACKING_TARGETS UND UEBER EINE VOLLSTAENDIGE ZUORDNUNG: Kommt ein
// VIERTES Ziel dazu, entsteht sein Lauf von selbst, und die Zuordnung darunter ist
// ohne einen Eintrag dafuer ein BUILD-FEHLER. Eine Handliste haette beides nicht
// geleistet — sie waere still geblieben, und genau darum geht es hier.
// ===========================================================================
describe("Fan-Out — DIE ZUORDNUNG IST VOLLSTAENDIG (Kreuzvergleich Ziel -> Adapter)", () => {
  /**
   * EIN SPION JE ADAPTER, ueber die Ziel-Liste erschoepfend geschluesselt.
   *
   * DIE FORM IST DER STOLPERDRAHT: Record<TrackingTarget, ...> zwingt beim vierten
   * Ziel zu einer Entscheidung, statt es stillschweigend auszulassen.
   */
  const SPY_BY_TARGET: Record<TrackingTarget, Mock<() => void>> = {
    meta: vi.fn<() => void>(),
    pinterest: vi.fn<() => void>(),
    tiktok: vi.fn<() => void>(),
    // DER STOLPERDRAHT HAT AUSGELOEST (11.1a). Dieser Spion wird NIE verdrahtet und
    // darf NIE feuern: 'linkedin' ist ein bekanntes Ziel OHNE Empfaenger. Er steht
    // hier, weil die Form ihn verlangt — und genau seine Untaetigkeit ist die
    // Zusicherung im Lauf darunter.
    // NACHGEZOGEN 11.1f — DER ABSATZ DARUEBER BLEIBT LESBAR, WEIL ER DEN GRUND
    // FESTHAELT, AUS DEM DIESER SPION UEBERHAUPT ENTSTAND; SEIN ZUSTAND IST ABER
    // UMGEKEHRT: Das Ziel hat seit dieser Scheibe einen Empfaenger. Der Spion IST
    // jetzt verdrahtet (s. beforeEach) und MUSS feuern — der Lauf darunter hat die
    // Seite gewechselt, aus "erreicht KEINEN Adapter" wurde "erreicht GENAU seinen".
    linkedin: vi.fn<() => void>(),
    // DER STOLPERDRAHT HAT ERNEUT AUSGELOEST (Scheibe 3), und diesmal in der Rolle, fuer
    // die er urspruenglich gebaut wurde: 'google' ist ein bekanntes Ziel OHNE
    // Empfaenger. Dieser Spion wird NIE verdrahtet und darf NIE feuern — seine
    // Untaetigkeit ist die Zusicherung im Lauf darunter und zugleich das VIERTE der
    // vier Tore dieser Scheibe.
    // NACHGEZOGEN (Scheibe 4 der Phase 11.2) — DER ABSATZ DARUEBER BLEIBT LESBAR, WEIL
    // ER DEN GRUND FESTHAELT, AUS DEM DIESER SPION ENTSTAND; SEIN ZUSTAND IST ABER
    // UMGEKEHRT: Das Ziel hat seit dieser Scheibe einen Empfaenger. Der Spion IST jetzt
    // verdrahtet (s. beforeEach) und MUSS feuern — der Lauf darunter hat die Seite
    // gewechselt, aus "erreicht KEINEN Adapter" wurde "erreicht GENAU seinen". Es ist
    // derselbe Vorgang wie bei 'linkedin' in 11.1f, und es ist das ZWEITE Mal, dass
    // dieselbe Schleife ihre Aussage ohne eine Zeile Testcode umkehrt.
    google: vi.fn<() => void>(),
  };

  /**
   * EIN AUFGELOESTER EMPFAENGER JE ZIEL. Die Werte tragen den Zielnamen, damit ein
   * Fehlschlag im Protokoll sofort zeigt, WELCHER Lauf gemeint war.
   */
  function entryFor(target: TrackingTarget) {
    return { target, config: { pixelId: "PX-" + target, token: "SEC-" + target } };
  }

  /**
   * DER RUMPF TRAEGT DIE EINWILLIGUNG JE ZIEL, UND DAS IST KEIN BALLAST.
   *
   * Ohne das Feld greift die ALTBESTANDS-AUSNAHME (LEGACY_CONSENT_ROLE in
   * tracking/consent-targets.ts): Erlaubt waere dann GENAU das eine Ziel mit der
   * Altbestands-Rolle, und jeder Lauf ueber ein anderes Ziel endete schon am
   * Einwilligungs-Gate — VOR dem Verteiler. Die Behauptung "der Adapter wurde
   * gerufen" waere dann falsch, und die Behauptung "die anderen nicht" waere wahr aus
   * einem Grund, den der Testname nicht nennt.
   * DIE SCHLUESSEL KOMMEN AUS DER ECHTEN ZUORDNUNG, nie abgeschrieben: ein Literal
   * hier liesse eine Divergenz zwischen den beiden Vokabularen gruen durchrutschen,
   * und der Ausgang waere fail-closed und lautlos.
   */
  function requestWithConsentForAll(): Request {
    const consent: Record<string, boolean> = {};
    for (const t of TRACKING_TARGETS) consent[CONSENT_KEY_BY_TARGET[t]] = true;
    return new Request("http://localhost/api/e", {
      method: "POST",
      // DIE KOPFZEILEN STEHEN MIT, OBWOHL DIE ADAPTER HIER AUSGESCHALTET SIND:
      // Faellt der Schalter je weg, entschiede sonst der Identitaets-Riegel in zwei
      // der drei Adapter ueber das Ergebnis, und dieser Block maesse ploetzlich etwas
      // anderes, ohne dass sein Name sich aendert.
      headers: {
        "user-agent": "Mozilla/5.0 (Kreuzvergleich)",
        "x-vercel-forwarded-for": "203.0.113.7",
      },
      body: JSON.stringify({
        trackingKey: "tk-abc",
        eventID: "evt-123",
        event: "Purchase",
        [CONSENT_WIRE_FIELD]: consent,
      }),
    });
  }

  beforeEach(() => {
    // Die drei Adapter werden AUSGESCHALTET und durch Spione ersetzt: Gemessen wird
    // die Zuordnung, nicht das Netzwerk. Liefen die echten Adapter, entschieden ihre
    // Identitaets-Riegel, Nutzlast-Bauten und Antwort-Auswertungen mit — drei
    // Fehlerquellen, die mit der Frage nichts zu tun haben.
    override.fn = async () => {
      SPY_BY_TARGET.meta();
    };
    pinOverride.fn = async () => {
      SPY_BY_TARGET.pinterest();
    };
    tikOverride.fn = async () => {
      SPY_BY_TARGET.tiktok();
    };
    // DER VIERTE, SEIT 11.1f. Ohne diese Zeile liefe die echte Implementierung: Sie
    // faende in der Fixture keine Zuordnung, ginge an ihrem eigenen Riegel heraus —
    // und der Lauf unten meldete "der Adapter wurde nicht gerufen", obwohl der
    // Verteiler richtig verdrahtet ist. Ein Fehlschlag, dessen Ursache zwei Dateien
    // entfernt liegt.
    linkOverride.fn = async () => {
      SPY_BY_TARGET.linkedin();
    };
    // DER FUENFTE, SEIT SCHEIBE 4 DER PHASE 11.2 — aus demselben Grund wie der vierte.
    goOverride.fn = async () => {
      SPY_BY_TARGET.google();
    };
  });

  // DIE SCHLEIFE UNTERSCHEIDET SEIT 11.1a ZWEI FAELLE, und das ist keine Aufweichung
  // der Zusicherung, sondern ihre Fortsetzung: Bis hierher trug JEDES bekannte Ziel
  // einen Empfaenger, "erreicht genau seinen Adapter" war deshalb fuer alle richtig.
  // Mit dem vierten Ziel gibt es einen bekannten Empfaenger-LOSEN Fall — fuer ihn
  // lautet die richtige Zusicherung "erreicht GAR KEINEN Adapter". Wer beide Faelle in
  // eine Erwartung zwingt, muesste eine der beiden falsch stellen.
  //
  // DER LINKEDIN-LAUF HAT MIT 11.1f DIE SEITE GEWECHSELT, und das gehoert hierher,
  // weil es an der Schleife selbst nicht zu sehen ist: Sie verzweigt zur
  // DEFINITIONSZEIT ueber hasAdapter. Bis 11.1e erzeugte sie fuer 'linkedin' den
  // else-Zweig ("erreicht KEINEN Adapter"), seit dem Adapter-Eintrag den if-Zweig
  // ("erreicht GENAU seinen"). ES IST DERSELBE CODE MIT DER UMGEKEHRTEN AUSSAGE —
  // niemand hat den Test umgeschrieben, die Tatsache darunter hat sich geaendert.
  // WAS DAZU NOETIG WAR, steht zwei Stellen weiter oben: ein Modul-Mock fuer den
  // neuen Adapter und die Verdrahtung seines Spions im beforeEach. Ohne beides waere
  // dieser Zweig gruen oder rot aus Gruenden, die mit der Zuordnung nichts zu tun
  // haben.
  // DER else-ZWEIG BLEIBT STEHEN, obwohl ihn heute KEIN Ziel mehr erreicht: Er ist
  // die Zusicherung fuer das naechste Ziel ohne Empfaenger — und genau dafuer ist die
  // Teilmengen-Eigenschaft von TARGETS_WITH_ADAPTER da.
  //
  // NACHGEZOGEN 2026-09-01 (Scheibe 4 der Phase 11.2) — DER SATZ DARUEBER GILT WIEDER,
  // UND ER IST DAMIT ZUM ZWEITEN MAL WAHR: Seit 'google' einen Empfaenger hat, erzeugt
  // der else-Zweig KEINE EINZIGE INSTANZ mehr. Die Schleife verzweigt zur
  // DEFINITIONSZEIT ueber hasAdapter; ein Zweig ohne Mitglied erzeugt kein it(), und
  // VITEST MELDET DAS NICHT — eine Schleife mit null Laeufen ist kein Fehler.
  // DAS IST DIE FEHLERKLASSE "EIN WAECHTER OHNE GEGENSTAND GEHT AB DA IMMER AUF", und
  // sie ist hier STILL: Der Block bleibt gruen, und niemand sieht, dass eine Zusicherung
  // aufgehoert hat zu messen.
  // WAS AN SEINE STELLE TRITT: der Lauf "W-REST" unten. Er ist ausdruecklich KEIN
  // Ersatz fuer den else-Zweig, sondern der einzige Weg, den Erschoepfungs-Rest von
  // dispatchForward ueberhaupt noch zu erreichen — s. dort.
  for (const target of TRACKING_TARGETS) {
    if (hasAdapter(target)) {
      it("W-" + target + ": das aufgeloeste Ziel erreicht GENAU seinen Adapter, die anderen NICHT", async () => {
        // WIRD ROT, WENN: der Ziel-Zweig dieses Ziels fehlt (dann feuert kein Spion),
        // wenn zwei Zweige vertauscht sind (dann feuert der falsche), oder wenn ein
        // Zweig doppelt greift.
        // DIE POSITIVKONTROLLE STECKT IM SELBEN LAUF und ist der Grund, warum die
        // "nicht gerufen"-Haelfte hier nicht trivial wahr ist: Im selben Durchgang
        // feuert nachweislich EIN Spion. Waere die Verdrahtung insgesamt tot, faende
        // diese Zeile es sofort.
        getCapiConfigByTrackingKey.mockResolvedValue(resolution([entryFor(target)]));

        const res = await handleIngest(requestWithConsentForAll());

        expect(res.status).toBe(204);
        expect(SPY_BY_TARGET[target]).toHaveBeenCalledTimes(1);
        for (const other of TRACKING_TARGETS) {
          if (other === target) continue;
          expect(SPY_BY_TARGET[other]).not.toHaveBeenCalled();
        }
      });
    } else {
      it("W-" + target + ": bekanntes Ziel OHNE Empfaenger — es erreicht KEINEN Adapter, die 204 bleibt", async () => {
        // DIE TRAGENDE INVARIANTE DER SCHEIBE 11.1a, am Ingest gemessen: Ein Projekt
        // MIT hinterlegtem Zugangsdatum fuer dieses Ziel verhaelt sich exakt wie eines
        // ohne — kein zusaetzlicher Empfaenger, und die garantierte leere 204 steht.
        // WIRD ROT, WENN: jemand das Ziel in TARGETS_WITH_ADAPTER eintraegt UND einen
        // Forwarder danebensetzt (dann feuert ein Spion), oder wenn der frueh
        // zurueckkehrende Zweig in dispatchForward faellt.
        // WAS ER NICHT ZEIGT, und der Satz gehoert dazu: Das Ziel PASSIERT das
        // Einwilligungs-Gate und faellt erst am Verteiler heraus. Dieser Lauf
        // unterscheidet die beiden Orte NICHT — er zeigt das Ergebnis, nicht die
        // Stelle. Fuer die Stelle ist der Kontrollfluss zu lesen.
        //
        // FUER 'google' IST DIESER LAUF DAS VIERTE TOR DER SCHEIBE 3, und er wird
        // hier ausdruecklich als solches benannt (Auflage (a) des Zuschnitts: je Tor
        // ein Test, der SEIN Tor nennt). Die drei anderen Tore stehen woanders und
        // messen ausdruecklich etwas anderes: Tor 1 (withPixel) und Tor 2 (die
        // Geheimnis-Schleife) in capi/token.test.ts, Tor 3 (Consent) in
        // capi/ingest.consent-targets.test.ts. Kein Lauf darf fuer zwei Tore
        // einstehen — live sind sie ohnehin nicht auseinanderzuhalten.
        // ER WIRD FUER 'google' ROT, sobald jemand das Ziel in TARGETS_WITH_ADAPTER
        // eintraegt und einen Forwarder danebensetzt. Genau das ist die Aenderung, die
        // aus dieser Scheibe stillschweigend die Transport-Scheibe machte.
        getCapiConfigByTrackingKey.mockResolvedValue(resolution([entryFor(target)]));

        const res = await handleIngest(requestWithConsentForAll());

        expect(res.status).toBe(204);
        for (const spy of TRACKING_TARGETS) {
          expect(SPY_BY_TARGET[spy]).not.toHaveBeenCalled();
        }
      });
    }
  }

  // =====================================================================
  // W4 — DER ERSCHOEPFUNGS-REST IST UEBER DEN HANDLER NICHT BEOBACHTBAR, UND DAS IST
  // EIN BEFUND, KEINE LUECKE DIESES BLOCKS.
  //
  // GEMESSEN (2026-08-13): Ein unbekanntes Ziel erreicht den Verteiler GAR NICHT.
  // allowedTargets schlaegt seinen Consent-Schluessel in CONSENT_KEY_BY_TARGET nach,
  // findet nichts und laesst es fallen — fail-closed, VOR dispatchForward.
  // NACHGEZOGEN 11.1a, UND DER TEIL WAR AB HIER FALSCH: Es hiess weiter "Fuer die drei
  // bekannten Ziele wiederum existiert je ein Zweig. Es gibt damit heute KEINE Eingabe,
  // die den Rest hinter den drei Zweigen erreicht." Mit dem vierten Ziel gibt es sie:
  // 'linkedin' ist BEKANNT (Consent-Eintrag vorhanden, es passiert das Gate) und hat
  // KEINEN Zweig — es erreicht den Erschoepfungs-Rest und kehrt dort frueh zurueck.
  // Der Lauf "W-linkedin" oben misst genau das.
  // FOLGE, die dazugehoert und die UNVERAENDERT gilt: Die Zusage "ein UNBEKANNTES Ziel
  // sendet nichts" ist vom EINWILLIGUNGS-GATE getragen, nicht vom Verteiler.
  //
  // DER PLATZHALTER DIESES TESTS MUSSTE GEWECHSELT WERDEN, und das ist der eigentliche
  // Befund: Er stand auf "linkedin" — einem Wert, der seit 11.1a ein BEKANNTES Ziel
  // ist. Der Test waere GRUEN GEBLIEBEN und haette etwas anderes gemessen als sein
  // Name sagt (kein Adapter feuert ja auch fuer ein bekanntes Ziel ohne Empfaenger).
  // Genau die Fehlerklasse "gruen aus einem anderen Grund". Der neue Wert ist bewusst
  // KEIN Anbietername, der spaeter ein Ziel werden koennte.
  // =====================================================================
  // =====================================================================
  // W-REST — DER ERSATZ FUER DEN ELSE-ZWEIG (Scheibe 4 der Phase 11.2, K1).
  //
  // WAS ER HALTEN SOLL: 'google' erreicht GENAU seinen Adapter, die vier anderen NICHT
  // — und ein Ziel OHNE Adapter bleibt stumm uebersprungen, mit unveraenderter leerer
  // 204. Die erste Haelfte traegt der Kreuzvergleich oben; DIESER Lauf traegt die
  // zweite.
  //
  // WARUM ES IHN BRAUCHT — GEMESSEN AM COMPILER (CC, 2026-09-01), und die Messung hat
  // die naheliegende Annahme WIDERLEGT:
  // Die Annahme war, der Compiler halte den Rest-Zweig von dispatchForward — er nimmt
  // ein TrackingTarget, FORWARDER_BY_TARGET ist ueber TargetWithAdapter geschluesselt,
  // hasAdapter ist die Verengung dazwischen. VOR dieser Scheibe traf das zu: Der Zweig
  // probeweise entfernt, ergab `tsc --noEmit`
  //   "error TS7053: Element implicitly has an 'any' type because expression of type
  //    '\"meta\" | \"pinterest\" | \"tiktok\" | \"linkedin\" | \"google\"' can't be used
  //    to index type 'Record<\"meta\" | \"pinterest\" | \"tiktok\" | \"linkedin\",
  //    Forwarder>'."
  // DIESELBE MUTATION NACH DIESER SCHEIBE: `tsc --noEmit` laeuft SAUBER DURCH, Exit 0,
  // keine Ausgabe. Der Grund steht in der alten Meldung selbst — sie brach, WEIL
  // 'google' im Record fehlte. Jetzt steht es drin, die beiden Unionen sind
  // deckungsgleich, und ein TrackingTarget indiziert einen Record ueber TrackingTarget
  // fehlerfrei.
  // FOLGE: DER COMPILER HAELT DEN ZWEIG NICHT MEHR. Wer ihn entfernt, bekommt einen
  // gruenen Build — und ein unbekanntes Ziel liefe in einen undefined-Aufruf.
  //
  // DIE GRENZE DIESES LAUFS, UND SIE GEHOERT AN IHN: Er misst gegen eine TEILWEISE
  // GEMOCKTE Consent-Zuordnung. Er beweist, dass der Verteiler ein Ziel OHNE Adapter
  // ueberspringt — er beweist NICHT, dass ein solches Ziel real entstehen kann.
  // WARUM DER MOCK UNVERMEIDLICH IST: Ohne ihn ist der Zweig aus dem Handler heraus
  // GAR NICHT erreichbar. Ein unbekanntes Ziel faellt schon in allowedTargets heraus
  // (W4 unten misst genau das), und ein bekanntes ohne Adapter gibt es nicht mehr.
  // DIE ECHTEN SCHLUESSEL BLEIBEN ECHT: importActual liefert die Zuordnung, und der
  // Lauf legt EINEN erfundenen Eintrag daneben. Die Eigenschaft, auf der
  // requestWithConsentForAll besteht — "DIE SCHLUESSEL KOMMEN AUS DER ECHTEN
  // ZUORDNUNG, nie abgeschrieben" — bleibt damit unberuehrt.
  // =====================================================================
  it("W-REST: ein bekanntes Ziel OHNE Adapter erreicht KEINEN Adapter — die 204 bleibt", async () => {
    const ERFUNDENES_ZIEL = "__ziel_ohne_adapter__";
    const ERFUNDENER_SCHLUESSEL = "__consent_ohne_adapter__";

    // DER TEIL-MOCK GILT NUR IN DIESEM LAUF und wird danach zurueckgenommen.
    const echt = await vi.importActual<
      typeof import("@/lib/tracking/consent-targets")
    >("@/lib/tracking/consent-targets");
    vi.doMock("@/lib/tracking/consent-targets", () => ({
      ...echt,
      CONSENT_KEY_BY_TARGET: {
        ...echt.CONSENT_KEY_BY_TARGET,
        [ERFUNDENES_ZIEL]: ERFUNDENER_SCHLUESSEL,
      },
    }));
    vi.resetModules();
    const { handleIngest: frischerHandler } = await import("./ingest");

    // DIE POSITIVKONTROLLE FAEHRT IM SELBEN LAUF MIT: Neben dem Ziel ohne Adapter steht
    // 'meta'. Feuert dessen Spion, ist bewiesen, dass der Lauf den Verteiler ueberhaupt
    // erreicht hat — ohne diesen Mitlaeufer waere "kein Adapter gerufen" auch dann
    // wahr, wenn gar nichts stattgefunden haette.
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        entryFor("meta"),
        {
          target: ERFUNDENES_ZIEL,
          config: { pixelId: "PX-rest", token: "SEC-rest" },
        },
      ]),
    );

    const consent: Record<string, boolean> = {
      [ERFUNDENER_SCHLUESSEL]: true,
    };
    for (const t of TRACKING_TARGETS) consent[CONSENT_KEY_BY_TARGET[t]] = true;

    const res = await frischerHandler(
      new Request("http://localhost/api/e", {
        method: "POST",
        headers: {
          "user-agent": "Mozilla/5.0 (W-REST)",
          "x-vercel-forwarded-for": "203.0.113.7",
        },
        body: JSON.stringify({
          trackingKey: "tk-abc",
          eventID: "evt-123",
          event: "Purchase",
          [CONSENT_WIRE_FIELD]: consent,
        }),
      }),
    );

    // DIE LEERE 204 IST TEIL DER ZUSICHERUNG, nicht Beiwerk: Ein Ziel ohne Adapter
    // darf den Handler nicht anders enden lassen als eines mit.
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
    // Der Mitlaeufer hat gefeuert — der Verteiler wurde erreicht.
    expect(SPY_BY_TARGET.meta).toHaveBeenCalledTimes(1);
    // Und KEIN Spion des Ziels ohne Adapter, denn es gibt keinen.
    for (const t of TRACKING_TARGETS) {
      if (t === "meta") continue;
      expect(SPY_BY_TARGET[t]).not.toHaveBeenCalled();
    }

    vi.doUnmock("@/lib/tracking/consent-targets");
    vi.resetModules();
  });

  it("W4: ein unbekanntes Ziel faellt schon am Einwilligungs-Gate — es erreicht den Verteiler nicht", async () => {
    // DIE POSITIVKONTROLLE FAEHRT IM SELBEN LAUF MIT: Neben dem unbekannten Ziel
    // steht ein bekanntes. Feuert dessen Spion, ist bewiesen, dass der Lauf den
    // Verteiler ueberhaupt erreicht hat — ohne diesen Mitlaeufer waere "kein Adapter
    // gerufen" auch dann wahr, wenn gar nichts stattgefunden haette.
    getCapiConfigByTrackingKey.mockResolvedValue(
      resolution([
        entryFor("meta"),
        {
          target: "__kein_bekanntes_ziel__",
          config: { pixelId: "PX-x", token: "SEC-x" },
        },
      ]),
    );

    const res = await handleIngest(requestWithConsentForAll());

    expect(res.status).toBe(204);
    expect(SPY_BY_TARGET.meta).toHaveBeenCalledTimes(1);
    expect(SPY_BY_TARGET.pinterest).not.toHaveBeenCalled();
    expect(SPY_BY_TARGET.tiktok).not.toHaveBeenCalled();
  });
});
