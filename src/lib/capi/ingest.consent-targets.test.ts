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

function makeRequest(wireValue?: { value: unknown }): Request {
  const body: Record<string, unknown> = {
    trackingKey: "tk-abc",
    eventID: "evt-123",
    event: "Purchase",
  };
  if (wireValue) body[CONSENT_WIRE_FIELD] = wireValue.value;
  return new Request("http://localhost/api/e", {
    method: "POST",
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
});

afterEach(() => {
  vi.clearAllMocks();
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

  it("Feld MIT VERBOT fuer Meta -> kein Aufruf, obwohl Pinterest erlaubt ist", async () => {
    // DIE GEGENPROBE ZUM VORIGEN, und sie zeigt zugleich die Grenze dieser Ebene:
    // Pinterest IST hier erlaubt, es geht trotzdem nichts hinaus — weil es keinen
    // Adapter hat. Genau deshalb liegt die Kreuzprobe eine Ebene tiefer.
    //
    // UND ER TRAEGT EINE ABDECKUNG, DIE SEIN NAME NICHT NENNT: Er ist der EINZIGE
    // Test im Repo, der dispatchForward mit einem ADAPTERLOSEN Ziel AUFRUFT — die
    // erlaubte Menge ist hier genau [pinterest], der Eintrag laeuft also in die
    // Zuordnung hinein und wird dort uebersprungen. In fan-out.test.ts taten das bis
    // zur neunten Scheibe T6 und T7; beide erreichen die Zuordnung mit einem
    // adapterlosen Ziel heute nicht mehr (Begruendung steht in ihren Koepfen, je
    // Test verschieden).
    // WARUM DAS HIER STEHT: Traegt ein einzelner Test eine Fehlerklasse, gehoert das
    // in seinen Kommentar — sonst entfernt ihn jemand spaeter als vermeintlich
    // redundant und nimmt die einzige Abdeckung mit.
    // DIE GRENZE, DIE ZWINGEND DAZUGEHOERT: Diese Abdeckung ist ein NEBENEFFEKT
    // seines Aufbaus, KEINE Absicht seines Namens — sie haengt allein daran, dass
    // Meta verboten und Pinterest erlaubt ist. Wer den Fall umbaut (etwa beide
    // verbietet), verliert sie LAUTLOS: nichts wird rot, denn "kein Aufruf" bliebe
    // wahr. Ob die Zuordnung einen EIGENEN Waechter bekommt, ist eine Frage fuer die
    // zehnte Scheibe, wo der zweite Adapter entsteht — hier NICHT entschieden.
    const res = await handleIngest(makeRequest(wire(false, true)));

    expect(res.status).toBe(204);
    expect(global.fetch).not.toHaveBeenCalled();
  });
});
