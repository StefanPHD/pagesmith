import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

const { getCapiConfigByTrackingKey } = vi.hoisted(() => ({
  getCapiConfigByTrackingKey: vi.fn(),
}));
// META_TARGET kommt mit: der Handler waehlt seinen Adapter darueber. Der Wert steht
// hier als Literal, damit der Mock die Modul-FORM abbildet.
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey,
  META_TARGET: "meta",
}));

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

import { allowedTargets, handleIngest } from "./ingest";
// BEWUSST die ECHTEN Konstanten und die ECHTE Abbildung, KEINE Kopien: Feldname und
// Ziel-Schluessel muessen dieselben sein, die Erzeuger und Leser benutzen.
// Handgeschriebene Literale hier liessen eine Divergenz gruen durchrutschen.
import { CONSENT_WIRE_FIELD } from "@/lib/tracking/consent-wire";
import { CONSENT_KEY_BY_TARGET } from "@/lib/tracking/consent-targets";

// ===========================================================================
// DIE EINWILLIGUNG JE ZIEL (Phase 11, neunte Scheibe, Haelfte A).
//
// ZWEI EBENEN, UND DIE TRENNUNG IST DER KERN DIESER DATEI:
//  (1) allowedTargets — die ENTSCHEIDUNG. Hier steht die Kreuzprobe.
//  (2) handleIngest   — die WIRKUNG. Hier steht, was mit Antwort, Persist und
//      Header-Lesungen passiert.
//
// WARUM DIE KREUZPROBE NICHT AM HANDLER STEHEN KANN — die teuerste Einsicht dieser
// Scheibe: ES GIBT HEUTE NUR EINEN ADAPTER. Ein Ziel ohne Adapter loest auch dann
// nichts aus, wenn es erlaubt ist (dispatchForward ueberspringt es). An der
// Netzwerk-Grenze sieht "erlaubt, aber kein Adapter" damit EXAKT so aus wie
// "verboten". Ein Handler-Test, der "Pinterest wurde nicht gesendet" prueft, waere
// HOHL — er bliebe gruen, auch wenn die Einwilligung ueberhaupt nicht ausgewertet
// wird. Nur die Funktions-Ebene trennt die beiden Faelle.
// ===========================================================================

const META_ENTRY = {
  target: "meta" as const,
  config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
};
const PIN_ENTRY = {
  target: "pinterest" as const,
  config: { pixelId: "TAG-987", token: "PIN" },
};

/**
 * Der Body-Typ wird aus der Signatur ABGELEITET statt aus ingest.ts exportiert —
 * so bleibt die geschuetzte Datei ohne zusaetzliche Oberflaeche.
 */
type Body = Parameters<typeof allowedTargets>[1];

/** Ein Body. `wire` fehlt GANZ, wenn nichts uebergeben wird. */
function bodyWith(wire?: { value: unknown }): Body {
  const body: Record<string, unknown> = {
    trackingKey: "tk-abc",
    eventID: "evt-123",
    event: "Purchase",
  };
  if (wire) body[CONSENT_WIRE_FIELD] = wire.value;
  return body as Body;
}

/** Ein Draht-Objekt, ueber die ECHTE Abbildung geschluesselt. */
function wire(meta: unknown, pinterest: unknown): { value: unknown } {
  return {
    value: {
      [CONSENT_KEY_BY_TARGET.meta]: meta,
      [CONSENT_KEY_BY_TARGET.pinterest]: pinterest,
    },
  };
}

function names(entries: ReturnType<typeof allowedTargets>): string[] {
  return entries.map((e) => e.target);
}

// ===========================================================================
// (1) DIE ENTSCHEIDUNG — allowedTargets
// ===========================================================================

describe("allowedTargets: DIE KREUZPROBE (Invariante 6)", () => {
  it("X: NUR Meta erlaubt -> genau Meta", () => {
    // ROT DURCH M3 (Wachen vertauscht): Meta laese dann Pinterests false und fiele
    // heraus, Pinterest laese Metas true und kaeme herein — das Ergebnis waere
    // exakt umgekehrt.
    expect(
      names(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith(wire(true, false))))
    ).toEqual(["meta"]);
  });

  it("Y: NUR Pinterest erlaubt -> genau Pinterest", () => {
    // DIE ANDERE HAELFTE DER KREUZPROBE, und sie ist die wichtigere: Sie ist die
    // EINZIGE Stelle im ganzen Repo, an der ein Ziel OHNE Adapter als ERLAUBT
    // sichtbar wird. Am Handler ist dieser Fall grundsaetzlich unbeobachtbar.
    expect(
      names(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith(wire(false, true))))
    ).toEqual(["pinterest"]);
  });

  it("Z: beide erlaubt -> beide (POSITIVKONTROLLE)", () => {
    // Ohne ihn zeigten X und Y nur, dass IRGENDETWAS filtert — auch ein Filter,
    // der immer genau einen Eintrag durchlaesst, saehe dort richtig aus.
    expect(
      names(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith(wire(true, true))))
    ).toEqual(["meta", "pinterest"]);
  });

  // =========================================================================
  // TOR 3 DER SCHEIBE 3 — DAS CONSENT-GATE. DIESER LAUF BENENNT SEIN TOR.
  //
  // Er steht hier und nicht bei den Tor-Laeufen in token.test.ts, weil die ENTSCHEIDUNG
  // hier lebt. Was er NICHT zeigt: dass google auch aus den drei anderen Gruenden nicht
  // sendet — das leisten die Laeufe dort und in fan-out.test.ts. Vier Ursachen sehen an
  // der Netzwerk-Grenze identisch aus; getrennt werden sie ausschliesslich hier, je
  // einzeln.
  // =========================================================================
  it("TOR 3: ein Draht OHNE google-Schluessel laesst google NICHT durch", () => {
    // DER REALE FALL, und deshalb ist er der erste: JEDE heute publizierte Kundenseite
    // traegt ein cns-Objekt OHNE google — der Schluessel geht zur VEROEFFENTLICHUNGSZEIT
    // in den ausgelieferten Text, und ein Code-Deploy erreicht sie nicht.
    // consentAllows liest wire["google"], bekommt undefined, vergleicht === true.
    // WIRD ROT, WENN der strikte Vergleich zu truthy aufgeweicht wird.
    const GOOGLE_ENTRY = {
      target: "google" as const,
      config: { pixelId: "123-456-7890", token: "IRRELEVANT" },
    };
    expect(
      names(
        allowedTargets([META_ENTRY, GOOGLE_ENTRY], bodyWith(wire(true, false))),
      ),
    ).toEqual(["meta"]);
  });

  it("TOR 3: ein Draht GANZ OHNE Feld laesst google NICHT durch (Altbestands-Rolle)", () => {
    // DIE ZWEITE HAELFTE DESSELBEN TORES, und sie haengt an einer ANDEREN Zeile:
    // Fehlt das Feld ganz, entscheidet nicht consentAllows, sondern LEGACY_CONSENT_ROLE.
    // Dort steht google auf false — es gibt bei diesem Ziel nichts zu erben, weil es
    // keine Seite gibt, die aelter waere als das Feld.
    // WIRD ROT, WENN LEGACY_CONSENT_ROLE.google auf true kippt. Der Waechter in
    // consent-targets.test.ts faengt dieselbe Aenderung von der anderen Seite ("genau
    // EIN Traeger, und es ist meta") — hier ist ihre WIRKUNG auf das Tor gemessen.
    const GOOGLE_ENTRY = {
      target: "google" as const,
      config: { pixelId: "123-456-7890", token: "IRRELEVANT" },
    };
    expect(names(allowedTargets([META_ENTRY, GOOGLE_ENTRY], bodyWith()))).toEqual(
      ["meta"],
    );
  });

  it("TOR 3, POSITIVKONTROLLE: mit google-Schluessel auf true KAEME es durch", () => {
    // OHNE IHN waeren die beiden Laeufe darueber hohl: "google fehlt im Ergebnis" saehe
    // auch dann richtig aus, wenn allowedTargets dieses Ziel aus einem ganz anderen
    // Grund nie durchliesse. Hier ist belegt, dass GENAU der Schluessel entscheidet.
    const GOOGLE_ENTRY = {
      target: "google" as const,
      config: { pixelId: "123-456-7890", token: "IRRELEVANT" },
    };
    const body = {
      trackingKey: "tk-abc",
      eventID: "evt-123",
      event: "Purchase",
      [CONSENT_WIRE_FIELD]: {
        [CONSENT_KEY_BY_TARGET.meta]: true,
        [CONSENT_KEY_BY_TARGET.google]: true,
      },
    } as Body;
    expect(names(allowedTargets([META_ENTRY, GOOGLE_ENTRY], body))).toEqual([
      "meta",
      "google",
    ]);
  });

  it("W: beide verboten -> leer — UND WARUM DAS ALLEIN NICHT GENUEGT", () => {
    // Dieser Fall ist gegen VERTAUSCHTE Wachen BLIND: false gegen false bleibt
    // false, das Ergebnis ist in beiden Zustaenden leer. Er steht hier als
    // Vollstaendigkeit, NICHT als Beweis — den tragen X und Y.
    expect(
      allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith(wire(false, false)))
    ).toEqual([]);
  });
});

describe("allowedTargets: DIE ALTBESTANDS-ROLLE (der Befund, der diese Haelfte traegt)", () => {
  it("A1: Feld GANZ ABWESEND -> genau das Ziel mit der Rolle, NICHT alle", () => {
    // DER KERN DER SCHEIBE. ROT DURCH M1 (Ausnahme auf alle Ziele ausgedehnt) —
    // und dann bekaeme ein Ziel, zu dem der Besucher nie gefragt wurde, auf JEDER
    // bereits publizierten Seite einen Forward.
    expect(names(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith()))).toEqual([
      "meta",
    ]);
  });

  it("A2: Feld VORHANDEN, aber leer -> LEER (der trennende Fall zu A1)", () => {
    // A1 und A2 sehen im Body fast gleich aus und gehen ENTGEGENGESETZT aus.
    // Waere die Anwesenheits-Pruefung auf Falsyness statt auf undefined gebaut,
    // fiele A2 mit A1 zusammen und der Unterschied verschwaende lautlos.
    expect(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith({ value: {} }))).toEqual(
      []
    );
  });

  it("Feld abwesend, aber das Rollen-Ziel ist gar nicht aufgeloest -> leer", () => {
    // ROT DURCH: eine Ausnahme, die "das erste Element" oder "irgendeines"
    // durchliesse statt des ROLLEN-Traegers. Ohne diesen Test saehe eine
    // Positions-Bindung genauso aus wie eine Rollen-Bindung.
    expect(allowedTargets([PIN_ENTRY], bodyWith())).toEqual([]);
  });

  it("Feld abwesend, NUR das Rollen-Ziel aufgeloest -> es bleibt (Invariante 1)", () => {
    // Der heutige Normalfall jeder bereits publizierten Kundenseite. ROT DURCH M2
    // (Ausnahme ganz entfernt).
    expect(names(allowedTargets([META_ENTRY], bodyWith()))).toEqual(["meta"]);
  });
});

describe("allowedTargets: kaputte Signal-Formen -> leer, nie ein Wurf", () => {
  const kaputt: Array<[string, unknown]> = [
    ["null", null],
    ["Zahl", 1],
    ["Zeichenkette", "meta"],
    ["Array", ["meta"]],
    ["boolean true", true],
    ["truthy statt true am Schluessel", { meta: 1, pinterest: 1 }],
  ];

  for (const [name, value] of kaputt) {
    it(`${name} -> leer`, () => {
      expect(allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith({ value }))).toEqual(
        []
      );
    });
  }

  it("KEINE dieser Formen wirft (eigene Zusicherung, nicht nur implizit)", () => {
    // "gibt leer zurueck" und "wirft nicht" sind verschiedene Aussagen: Ein Wurf
    // schluege VOR der Assertion durch und meldete einen Fehlschlag, der sich liest
    // wie das Gegenteil dessen, was passiert ist. Und ein Wurf HIER braeche das
    // 204-Containment — die Funktion laeuft im Request-Pfad.
    for (const [, value] of kaputt) {
      expect(() =>
        allowedTargets([META_ENTRY, PIN_ENTRY], bodyWith({ value }))
      ).not.toThrow();
    }
    expect(() => allowedTargets([], bodyWith())).not.toThrow();
  });
});

// ===========================================================================
// (2) DIE WIRKUNG — handleIngest
// ===========================================================================

/**
 * DIE ZWEI HEADER SIND PFLICHT UND DUERFEN NICHT ENTFERNT WERDEN (Phase 11,
 * zwoelfte Scheibe). Ohne sie ist die HAELFTE der Abdeckung dieser Datei hohl.
 *
 * GRUND: Der zweite Adapter (forwardToPinterest) traegt als erste Anweisung im try
 * das IDENTITAETS-PAAR — `if (!clientIp || !userAgent) return;` — und kehrt ohne
 * beides VOR jedem fetch zurueck, ohne Log und ohne Spur. Ein Fixture ohne diese
 * Header laesst JEDE Assertion ueber das zweite Ziel gruen werden, auch wenn die
 * Zuordnung ueberhaupt nichts tut: "kein Aufruf" waere dann wahr aus einem Grund,
 * den der Testname nicht nennt. DER ERSTE ADAPTER HAT DIESEN RIEGEL NICHT (er laesst
 * jede Haelfte einzeln weg) — deshalb faellt das Fehlen bei Meta nicht auf.
 *
 * DAS IST HIER REAL PASSIERT, nicht befuerchtet: Bis zur zwoelften Scheibe baute
 * diese Datei ihre Requests OHNE Header. Der Fall "Feld MIT VERBOT fuer Meta" galt
 * deshalb als der einzige Test, der die Zuordnung mit einem adapterlosen Ziel
 * AUFRUFT — er tat es, aber der Adapter kehrte sofort zurueck, und die Ausgangslage
 * der Scheibe sagte faelschlich, "es geht dann ein Aufruf hinaus".
 *
 * DIE ADRESSE MUSS OEFFENTLICH SEIN: resolveClientIp verwirft loopback und leere
 * Werte, und mit gemocktem META_TEST_EVENT_CODE ("") gibt es keine Dev-Dummy-IP.
 * 203.0.113.7 stammt aus TEST-NET-3 und ist garantiert keine echte Adresse.
 */
function makeRequest(wireValue?: { value: unknown }): Request {
  const body: Record<string, unknown> = {
    trackingKey: "tk-abc",
    eventID: "evt-123",
    event: "Purchase",
  };
  if (wireValue) body[CONSENT_WIRE_FIELD] = wireValue.value;
  return new Request("http://localhost/api/e", {
    method: "POST",
    headers: {
      "user-agent": "Mozilla/5.0 (Consent-Targets-Test)",
      "x-vercel-forwarded-for": "203.0.113.7",
    },
    body: JSON.stringify(body),
  });
}

function resolution(targets: unknown[]) {
  return { projectId: "proj-1", blocked: false, abTestActive: false, targets };
}

async function runScheduled(): Promise<void> {
  for (const task of scheduled) await task();
}

function fetchCalls() {
  return (global.fetch as unknown as { mock: { calls: unknown[][] } }).mock.calls;
}

beforeEach(() => {
  scheduled.length = 0;
  persistEvent.mockResolvedValue(undefined);
  getCapiConfigByTrackingKey.mockResolvedValue(resolution([META_ENTRY, PIN_ENTRY]));
  global.fetch = vi.fn(async () => new Response(null, { status: 200 }));
  // Der zweite Adapter liest den Antwort-RUMPF und meldet alles, was nicht
  // eindeutig Erfolg ist, per console.error. Die Attrappe oben antwortet
  // absichtlich body-los (diese Datei prueft WER gerufen wird, nicht WAS
  // zurueckkommt) — ohne diesen Spion faerbte jeder solche Aufruf das
  // Testprotokoll mit Fehlerzeilen ein und verdeckte echte Meldungen.
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

describe("handleIngest: ALLE Ziele verboten", () => {
  it("die Antwort ist eine LEERE 204 — Status und Rumpf getrennt geprueft", async () => {
    // GETRENNTE ACHSEN: "kein Forward" und "die Antwort bleibt korrekt" sehen an
    // einer Abwesenheits-Assertion identisch aus. Ein Wurf im neuen Ausgang ergaebe
    // ebenfalls "kein Forward" — aber einen 500, und der leakte den
    // Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer.
    const res = await handleIngest(makeRequest(wire(false, false)));
    expect(res.status).toBe(204);
    expect(await res.text()).toBe("");
  });

  it("kein Forward, aber der Persist laeuft — das Verbot gilt dem FORWARD", async () => {
    await handleIngest(makeRequest(wire(false, false)));
    await runScheduled();
    expect(global.fetch).not.toHaveBeenCalled();
    expect(persistEvent).toHaveBeenCalledWith(
      expect.objectContaining({ eventType: "Purchase", source: "server" })
    );
  });

  it("KEINE Header-Lesung auf Vorrat (der Ausgang liegt VOR IP und User-Agent)", async () => {
    // DER EINZIGE TEST, DER DIE PLATZIERUNG DES NEUEN AUSGANGS DECKT. Wandert er
    // hinter die Header-Lesungen, laufen zwei IP-Lookups und eine
    // User-Agent-Lesung fuer einen Beacon, der garantiert nichts sendet — auf dem
    // meistgetroffenen Pfad der Plattform. Kein anderer Test sieht das: die
    // Antwort und der ausbleibende Forward waeren identisch.
    const req = makeRequest(wire(false, false));
    const spy = vi.spyOn(req.headers, "get");

    await handleIngest(req);

    const gefragt = spy.mock.calls.map((c) => String(c[0]).toLowerCase());
    expect(gefragt).not.toContain("user-agent");
    expect(gefragt).not.toContain("x-vercel-forwarded-for");
  });
});

describe("handleIngest: Invariante 1 — bei Meta aendert sich nichts", () => {
  it("Feld ABWESEND, Menge [Meta, Pinterest] -> genau EIN Aufruf, und zwar Metas", async () => {
    // ROT DURCH M2. Dies ist der Zustand JEDER heute publizierten Kundenseite.
    await handleIngest(makeRequest());

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
    expect(String(fetchCalls()[0][0])).not.toContain("TAG-987");
  });

  it("Feld MIT ERLAUBNIS fuer Meta, Verbot fuer Pinterest -> genau Metas Aufruf", async () => {
    // ROT DURCH M3: vertauscht faellt Meta heraus und es ginge NICHTS hinaus.
    await handleIngest(makeRequest(wire(true, false)));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
  });

  it("Feld MIT VERBOT fuer Meta -> KEIN Meta-Aufruf, und genau EINER an Pinterest", async () => {
    // DIE GEGENPROBE ZUM VORIGEN: Verbietet der Draht Meta und erlaubt Pinterest,
    // geht Metas Aufruf NICHT hinaus und der des zweiten Ziels schon. Zusammen mit
    // dem Test darueber ist das die Kreuzprobe auf der WIRKUNGS-Ebene — beide
    // Richtungen einzeln, nicht nur "irgendetwas wurde gefiltert".
    //
    // ==================== HISTORIEN-BLOCK ====================
    // DIESER TEST HAT SEINEN URSPRUENGLICHEN GEGENSTAND VERLOREN, und das gehoert
    // hierher, damit niemand ihn spaeter fuer den alten haelt:
    //
    // BIS ZUR ZWOELFTEN SCHEIBE hiess er "kein Aufruf, obwohl Pinterest erlaubt ist"
    // und bewies etwas anderes — dass ein ADAPTERLOSES Ziel in die Zuordnung
    // hineinlaeuft und dort uebersprungen wird. Er war die EINZIGE Stelle im Repo,
    // die dispatchForward ueberhaupt mit einem adapterlosen Ziel aufrief (T6 und T7
    // in fan-out.test.ts taten das bis zur neunten Scheibe, seither nicht mehr).
    //
    // MIT DEM ZWEITEN ZWEIG IN dispatchForward IST PINTEREST KEIN ADAPTERLOSES ZIEL
    // MEHR. Die alte Abdeckung existiert nicht nur nicht mehr — SIE KANN NICHT MEHR
    // EXISTIEREN: Jedes bekannte Ziel hat jetzt einen Adapter, und ein UNBEKANNTES
    // erreicht die Zuordnung nie (es faellt schon in allowedTargets heraus, weil
    // weder LEGACY_CONSENT_ROLE noch CONSENT_KEY_BY_TARGET einen Eintrag dafuer
    // tragen). Der Rueckfall `return Promise.resolve()` ist aus dem Handler heraus
    // strukturell unerreichbar. Ein Test, der ihn ueber eine gefaelschte Aufloesung
    // erzwaenge, prueefte einen Zustand, den das System nicht herstellen kann.
    //
    // WAS ER STATTDESSEN TRAEGT — und es ist mehr wert als das Verlorene: Er ist
    // eine der Stellen, an denen die erlaubte Menge eine ECHTE TEILMENGE der
    // aufgeloesten ist UND der ausgeschlossene Eintrag einen Adapter hat. Genau das
    // ist die Konstellation, in der sich `allowed` und `targets` im Fan-Out
    // beobachtbar unterscheiden. WIRD IM FAN-OUT UEBER `targets` STATT UEBER
    // `allowed` ITERIERT, WIRD DIESER TEST ROT — und die Einwilligung je Ziel haengt
    // an genau dieser Zeile. Beides compiliert, kein Typfehler, keine unbenutzte
    // Variable: es gibt keinen strukturellen Zeugen dafuer, nur diesen Test und
    // seine Nachbarn.
    // =========================================================
    const res = await handleIngest(makeRequest(wire(false, true)));

    expect(res.status).toBe(204);
    expect(fetchCalls()).toHaveLength(1);
    expect(String(fetchCalls()[0][0])).toContain("/v5/ad_accounts/TAG-987/events");
    expect(String(fetchCalls()[0][0])).not.toContain("PIXEL-123");
  });

  it("Draht traegt NUR Metas Schluessel -> nur Meta, obwohl das zweite Ziel konfiguriert ist", async () => {
    // INVARIANTE 5, DER REALISTISCHE FALL: Eine Seite, die veroeffentlicht wurde,
    // BEVOR die zweite Kennung eingetragen war, traegt den zweiten Consent-Schluessel
    // gar nicht im Draht — der Erzeuger schreibt ihn zur ERZEUGUNGSZEIT, nicht zur
    // Laufzeit. Der Draht ist damit VORHANDEN (die Altbestands-Ausnahme greift also
    // nicht), aber er sagt ueber das zweite Ziel nichts. Fail-closed: kein Forward.
    // WARUM DAS EIN EIGENER TEST IST UND NICHT MIT wire(true,false) ZUSAMMENFAELLT:
    // Dort steht ein ausdrueckliches VERBOT, hier fehlt die Angabe ganz. Beide muessen
    // gleich ausgehen, und genau das ist die Aussage.
    const res = await handleIngest(
      makeRequest({ value: { [CONSENT_KEY_BY_TARGET.meta]: true } }),
    );

    expect(res.status).toBe(204);
    expect(fetchCalls()).toHaveLength(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
  });

  it("NUR das erste Ziel aufgeloest -> genau EIN Aufruf, auch wenn der Draht beide erlaubt", async () => {
    // INVARIANTE 4: Ein Projekt ohne Zugangsdaten fuer das zweite Ziel verhaelt sich
    // UNVERAENDERT. Der Draht erlaubt hier ausdruecklich BEIDE — es geht trotzdem nur
    // einer hinaus, weil das zweite Ziel ohne vollstaendiges Paar gar nicht erst in
    // die aufgeloeste Menge kommt. Die Einwilligung ist nicht die Stelle, die es
    // heraushaelt, und dieser Test trennt die beiden Ursachen.
    getCapiConfigByTrackingKey.mockResolvedValue(resolution([META_ENTRY]));

    const res = await handleIngest(makeRequest(wire(true, true)));

    expect(res.status).toBe(204);
    expect(fetchCalls()).toHaveLength(1);
    expect(String(fetchCalls()[0][0])).toContain("/PIXEL-123/events");
    expect(String(fetchCalls()[0][0])).not.toContain("api.pinterest.com");
  });
});
