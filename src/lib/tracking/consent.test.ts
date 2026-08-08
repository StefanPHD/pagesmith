import { describe, expect, it, vi } from "vitest";
import {
  buildConsentAllRuntime,
  buildConsentRuntime,
  buildConsentRuntimes,
  META_CONSENT_TARGET,
} from "./consent";

// ===========================================================================
// DIE AUSWERTUNGSREGEL — IHR ERSTER EIGENER TEST (Phase 11, neunte Scheibe,
// HAELFTE B).
//
// BIS HIERHER GAB ES KEINEN. buildConsentRuntime wurde von KEINER Testdatei
// importiert; ihre Zweige wurden nur MITTELBAR geprueft — durch Ausfuehrung des
// erzeugten Textes in generate.test.ts und pageview-emitter.test.ts. Eine
// Aenderung an ihrem TEXT sah damit kein Waechter. Diese Datei schliesst das.
//
// DIE REGEL WIRD AUSGEFUEHRT, NICHT GELESEN: Der erzeugte Text ist der
// Gegenstand, also wird er evaluiert und die entstandene Funktion befragt. Ein
// Test, der nur Zeichenketten prueft, faenge eine kaputte Klammer nicht.
// ===========================================================================

type Hook = unknown;

/** Evaluiert BEIDE Laufzeit-Funktionen und gibt sie zurueck. */
function load(hook: Hook): {
  one: (t: string) => boolean;
  all: (ts: string[]) => Record<string, boolean>;
} {
  const w = globalThis as unknown as Record<string, unknown>;
  if (hook === "__unset__") delete w.pagesmithConsent;
  else w.pagesmithConsent = hook;
  // eslint-disable-next-line no-new-func
  new Function(buildConsentRuntimes())();
  return {
    one: w.__psConsent as (t: string) => boolean,
    all: w.__psConsentAll as (ts: string[]) => Record<string, boolean>,
  };
}

const A = META_CONSENT_TARGET;
const B = "pinterest";

/**
 * ALLE Rueckgabeformen des Betreiber-Hooks, mit dem erwarteten Urteil je
 * Schluessel. "__unset__" heisst: die Eigenschaft existiert gar nicht.
 */
const FORMEN: Array<[name: string, hook: Hook, a: boolean, b: boolean]> = [
  ["nie gesetzt", "__unset__", true, true],
  ["genau true", true, true, true],
  ["Funktion -> true", () => true, true, true],
  ["Funktion -> Objekt mit A", () => ({ [A]: true }), true, false],
  ["Objekt mit A", { [A]: true }, true, false],
  ["Objekt mit B", { [B]: true }, false, true],
  ["Objekt mit beiden", { [A]: true, [B]: true }, true, true],
  ["leeres Objekt", {}, false, false],
  ["Objekt, A truthy statt true", { [A]: 1 }, false, false],
  ["Objekt, A als Zeichenkette", { [A]: "true" }, false, false],
  ["Objekt, A explizit false", { [A]: false }, false, false],
  ["Objekt, A verschachtelt", { [A]: { ok: true } }, false, false],
  ["null", null, false, false],
  ["false", false, false, false],
  ["Zahl", 1, false, false],
  ["Zeichenkette", A, false, false],
  ["leeres Array", [], false, false],
  ["Array mit Zielnamen", [A], false, false],
  ["Funktion, die wirft", () => { throw new Error("boom"); }, false, false],
  ["Funktion -> undefined", () => undefined, false, false],
];

describe("__psConsent: die Regel, Form fuer Form", () => {
  for (const [name, hook, a, b] of FORMEN) {
    it(`${name} -> A=${a}, B=${b}`, () => {
      const { one } = load(hook);
      expect(one(A)).toBe(a);
      expect(one(B)).toBe(b);
    });
  }

  it("'nie gesetzt' und 'Funktion -> undefined' gehen ENTGEGENGESETZT aus", () => {
    // DER TRENNENDE FALL, und er haengt allein an der REIHENFOLGE der Zweige:
    // die undefined-Pruefung steht VOR dem Funktionsaufruf. Wer beide zusammenzieht,
    // macht aus einem verbotenen Zustand einen erlaubten — lautlos.
    expect(load("__unset__").one(A)).toBe(true);
    expect(load(() => undefined).one(A)).toBe(false);
  });
});

describe("__psConsentAll: dieselbe Regel, EINE Ziehung", () => {
  for (const [name, hook, a, b] of FORMEN) {
    it(`${name} -> A=${a}, B=${b}`, () => {
      const { all } = load(hook);
      expect(all([A, B])).toEqual({ [A]: a, [B]: b });
    });
  }

  it("leere Liste -> leeres Ergebnis, kein Wurf", () => {
    expect(load({ [A]: true }).all([])).toEqual({});
  });

  it("ein unbekannter Schluessel ist verboten, nicht undefined", () => {
    // ROT DURCH: eine Fassung, die v[t] roh durchreicht statt `=== true`. Der
    // Draht traege dann undefined, und der Server laese es als "nicht true" —
    // richtig, aber aus Versehen.
    expect(load({ [A]: true }).all(["gibtesnicht"])).toEqual({
      gibtesnicht: false,
    });
  });
});

describe("DIE NAHT: beide Implementierungen antworten IDENTISCH", () => {
  it("fuer JEDE Form und JEDEN Schluessel", () => {
    // DER WAECHTER GEGEN DIE VERDOPPLUNG. Die Regel steht seit dieser Haelfte in
    // ZWEI Funktionen; dieser Test ist das einzige, was sie zusammenhaelt. Wer ihn
    // entfernt, macht aus zwei Fassungen zwei Regeln — und die Divergenz waere
    // lautlos, weil beide fuer sich gueltig aussehen.
    for (const [, hook] of FORMEN) {
      const { one, all } = load(hook);
      const gesamt = all([A, B]);
      expect(gesamt[A]).toBe(one(A));
      expect(gesamt[B]).toBe(one(B));
    }
  });
});

describe("EINE ZIEHUNG — die tragende Zusage der HAELFTE B", () => {
  it("__psConsentAll fragt den Hook GENAU EINMAL, egal wie viele Schluessel", () => {
    const hook = vi.fn(() => ({ [A]: true, [B]: true }));
    const { all } = load(hook);
    all([A, B, "c", "d", "e"]);
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it("EIN HOOK, DER BEIM ZWEITEN AUFRUF ANDERS ANTWORTET, kann den Draht NICHT spalten", () => {
    // DER TEST, DER DIE ENTSCHEIDUNG BEWEIST — und der einzige. Vor der
    // Umstellung wurde je Ziel einzeln gefragt: A haette die erste Antwort
    // gesehen, B die zweite, und der Draht traege zwei Aussagen aus zwei
    // Momenten. Hier bekommen BEIDE den ERSTEN Schnappschuss.
    const hook = vi
      .fn()
      .mockReturnValueOnce({ [A]: true, [B]: true })
      .mockReturnValue({ [A]: false, [B]: false });
    const { all } = load(hook);

    expect(all([A, B])).toEqual({ [A]: true, [B]: true });
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it("JE EREIGNIS wird NEU gezogen — kein Zwischenspeicher ueber Aufrufe hinweg", () => {
    // DIE GEGENPROBE ZUM VORIGEN, und ohne sie waere er halb: Ein Ergebnis, das
    // GEMERKT wird, erfuellte "einmal pro Aufruf" ebenfalls — und truege beim
    // zweiten Klick ein veraltetes Urteil. Der Besucher darf seine Einwilligung
    // zwischen zwei Klicks aendern.
    const hook = vi
      .fn()
      .mockReturnValueOnce({ [A]: true })
      .mockReturnValue({ [A]: false });
    const { all } = load(hook);

    expect(all([A])).toEqual({ [A]: true });
    expect(all([A])).toEqual({ [A]: false });
    expect(hook).toHaveBeenCalledTimes(2);
  });
});

describe("Der Wortlaut der alten Funktion ist unangetastet", () => {
  it("buildConsentRuntimes ENTHAELT buildConsentRuntime BYTE-GLEICH", () => {
    // DER BEWEIS DER HAELFTE B: Die alte Regel wurde nicht umgebaut, sondern hat
    // eine zweite Funktion NEBEN sich bekommen. Ein Helfer, den sich beide teilten,
    // haette ihren Wortlaut veraendert — und damit genau diesen Beweis.
    expect(buildConsentRuntimes()).toContain(buildConsentRuntime());
  });

  it("und die neue steht DAHINTER, nicht davor", () => {
    const beide = buildConsentRuntimes();
    expect(beide.indexOf(buildConsentRuntime())).toBeLessThan(
      beide.indexOf(buildConsentAllRuntime()),
    );
  });

  it("beide sind serialisierungssicher (kein literales Script-Ende)", () => {
    expect(buildConsentRuntimes()).not.toContain("</scr" + "ipt>");
  });
});
