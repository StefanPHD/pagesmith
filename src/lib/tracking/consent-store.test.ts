import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import { buildConsentRuntimes } from "@/lib/tracking/consent";
import { buildConsentDenyScript } from "@/lib/tracking/consent-setter";
import {
  buildConsentRestoreScript,
  CONSENT_STORE_KEY,
} from "@/lib/tracking/consent-store";
import type {
  ConsentAppearance,
  ConsentTextArg,
  ConsentLanguage,
  ConsentPresentation,
} from "@/lib/settings";

// DIE HUELLE DER PRAESENTATION, LOKAL GEBAUT (Scheibe 11.13e, Entscheidung P11.13-32).
// Sie buendelt die drei Pflicht-Felder — Darstellung, Sachtext, Sprache — zu dem EINEN
// Argument, das die drei Erzeuger seither nehmen.
// DIE SPRACHE HAT HIER EINEN VORGABEWERT, DIE PRODUKTIV-SIGNATUR NICHT: Die bestehenden
// Faelle pruefen den deutschen Bestand, und genau das sollen sie weiter tun. Jeder Test,
// bei dem die Sprache die Sache IST, gibt sie ausdruecklich — sonst pruefte er sie nicht.
const praes = (
  appearance: ConsentAppearance,
  text: ConsentTextArg,
  language: ConsentLanguage = "de"
): ConsentPresentation => ({ appearance, text, language });


// Scheibe 11.5b. DIE ERWARTUNGEN STAMMEN AUS DEN BINDENDEN ENTSCHEIDUNGEN (7) BIS (10) DER
// PHASE 11.5 UND AUS DER ARCHITEKT-ENTSCHEIDUNG VOM 2026-09-14, DASS write() AUCH DEN HOOK
// DER LAUFENDEN SEITE SETZT — NIE AUS DEM CODE: die sieben Schluessel
// stehen hier als Literal, und der Vergleichswert des Setzers ist VOR der ersten
// Aenderung erhoben worden.

const SIEBEN = ["meta", "pinterest", "tiktok", "linkedin", "google", "analytics", "custom"];
const ALLE_ZUGESTIMMT = "ps1:meta,pinterest,tiktok,linkedin,google,analytics,custom|";
const NUR_META = "ps1:meta|pinterest,tiktok,linkedin,google,analytics,custom";
const ALLE_ABGELEHNT = "ps1:|meta,pinterest,tiktok,linkedin,google,analytics,custom";

type Win = Record<string, unknown> & {
  localStorage: Storage;
  eval: (code: string) => unknown;
};
const w = window as unknown as Win;

function body(script: string): string {
  return script.slice(script.indexOf(">") + 1, script.lastIndexOf("<"));
}
function runRuntimes(): void {
  w.eval(buildConsentRuntimes());
}
function runRestore(): void {
  w.eval(body(buildConsentRestoreScript()));
}
function runSetter(): void {
  w.eval(body(buildConsentDenyScript()));
}
function store(): { read: () => Record<string, unknown>; write: (g: unknown) => boolean } {
  return w.__psConsentStore as { read: () => Record<string, unknown>; write: (g: unknown) => boolean };
}
function ask(t: string): boolean {
  return (w.__psConsent as (t: string) => boolean)(t);
}

beforeEach(() => {
  w.localStorage.clear();
  delete w.pagesmithConsent;
  delete w.__psConsentStore;
  delete w.__psConsent;
  delete w.__psConsentAll;
});
afterEach(() => {
  vi.restoreAllMocks();
});

describe("11.5b — Injektion", () => {
  it("R1: Schalter AUS -> kein Wiederherstellungs-Block (Positivkontrolle: Emitter da)", () => {
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk", "off", praes({ theme: "light" }, "standard"));
    expect(out).not.toContain('id="__ps_cnr"');
    expect(out).toContain('id="__ps_pve"');
  });

  it("R2: Schalter AN -> Gate < Wiederherstellung < Setzer < Emitter", () => {
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk", "bar", praes({ theme: "light" }, "standard"));
    const gate = out.indexOf('id="pagesmith-consent"');
    const restore = out.indexOf('id="__ps_cnr"');
    const setter = out.indexOf('id="__ps_cns"');
    const pve = out.indexOf('id="__ps_pve"');
    expect(gate).toBeGreaterThan(-1);
    expect(gate).toBeLessThan(restore);
    expect(restore).toBeLessThan(setter);
    expect(setter).toBeLessThan(pve);
  });

  // R3. DER VERGLEICHSWERT WURDE VOR JEDER AENDERUNG AUF HEAD 928172e ERHOBEN (CC,
  // 2026-09-14), mit zwei Instrumenten: node:crypto im Lauf und sha256sum/wc ueber das
  // gespeicherte Artefakt. WER IHN ROT VORFINDET, REGENERIERT IHN NICHT.
  // NACHGEZOGEN 2026-09-19 (Phase 11.6, Scheibe 11.6a) — AUS DER BYTE-GLEICHHEIT IST EIN
  // DIFFERENZ-NACHWEIS GEWORDEN. Der Setzer traegt seit 11.6a einen SIEBTEN Schluessel
  // ("custom", Entscheidung P11.6-5 Teil (2)); die Byte-Gleichheit ist damit BEWUSST
  // aufgegeben, und an ihre Stelle tritt die Aussage: DER NEUE BLOCK IST DER ALTE PLUS
  // GENAU DIE BENANNTE EINSETZUNG — SONST KEIN ZEICHEN (docs/immer-beachten.md, "WO EINE
  // BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD, TRITT EIN DIFFERENZ-NACHWEIS AN IHRE
  // STELLE").
  // DER VORHER-WERT IST NICHT REGENERIERT, SONDERN DERSELBE wie zuvor (244 / 9ae9ab26…),
  // VOR dem ersten Eingriff dieser Scheibe erneut erhoben (CC, 2026-09-19). Die Auflage
  // "WER IHN ROT VORFINDET, REGENERIERT IHN NICHT" gilt unveraendert — er steht jetzt auf
  // der ENTFERNTEN Seite des Nachweises und ist damit staerker verankert als zuvor.
  // WODURCH ROT: wenn der Block an IRGENDEINER anderen Stelle als der Einsetzung
  // abweicht — auch um ein Leerzeichen.
  it("R3: der Setzer-Block ist der von vor 11.6a PLUS genau eine Einsetzung — Differenz-Nachweis", () => {
    const setter = buildConsentDenyScript();
    // (1)+(2) NACHHER, an derselben Form erhoben wie der Vorher-Wert.
    expect(Buffer.byteLength(setter, "utf8")).toBe(261);
    expect(createHash("sha256").update(setter, "utf8").digest("hex")).toBe(
      "045ca34825c8dadad2cac335767573572f536ac43da0b4d092675c607d024d3b"
    );
    // (3) DIE EINSETZUNG WIRD GEZAEHLT, und die erwartete Zahl steht VOR der Zaehlung.
    const einsetzung = ', "custom": false';
    expect(setter.split(einsetzung).length - 1).toBe(1);
    // (4) ENTFERNT -> der VORHER-Wert, in Bytes UND sha256.
    const ohne = setter.split(einsetzung).join("");
    expect(Buffer.byteLength(ohne, "utf8")).toBe(244);
    expect(createHash("sha256").update(ohne, "utf8").digest("hex")).toBe(
      "9ae9ab2650187876aad75da2cb84cde5c125622e1842ede5a40a059a4a843acd"
    );
    // (5) POSITIVKONTROLLE: OHNE die Entfernung bestuende ein Unterschied. Ohne sie waere
    // ein Nachweis, dessen Entfernung nichts findet, von einem erfolgreichen nicht zu
    // unterscheiden.
    expect(ohne).not.toBe(setter);
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk", "bar", praes({ theme: "light" }, "standard"));
    expect(out).toContain(setter);
  });

  // R3b. DER EINZIGE TEST, DER DIE KOLLISION MIT DEN SUCHEN DES BESTANDS FAENGT:
  // hasConsentScript sucht id="pagesmith-consent", die Reihenfolge-Tests suchen
  // id="__ps_cns" und __ps_pve / __ps_pv. Traegt der neue Block eines davon, faellt auf
  // Seiten ohne Mappings das Gate weg oder eine indexOf-Reihenfolge luegt.
  it("R3b: der Block traegt keine der Kennungen, nach denen der Bestand sucht", () => {
    const block = buildConsentRestoreScript();
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk", "bar", praes({ theme: "light" }, "standard"));
    for (const needle of ['id="pagesmith-consent"', 'id="__ps_cns"', "__ps_pve", "__ps_pv"]) {
      expect(block).not.toContain(needle);
      // POSITIVKONTROLLE: dieselbe Suche trifft im ausgelieferten Text.
      expect(out).toContain(needle);
    }
    expect(block).not.toContain("</scr" + "ipt><");
    expect(block).not.toContain("</bo" + "dy>");
  });
});

describe("11.5b — Wiederherstellung", () => {
  // R4. DIE HOOK-PRUEFUNG IST DIE ERSTE ANWEISUNG — ein gesetzter Hook gewinnt gegen
  // jeden gespeicherten Wert: Ein Fremd-CMP, das vor dem Block gesetzt hat, wird nicht
  // ueberschrieben.
  const GESETZT: Array<[string, unknown]> = [
    ["false", false],
    ["null", null],
    ["0", 0],
    ["leeres Objekt", {}],
    ["true", true],
    ["Funktion", () => true],
    ["Fremd-CMP-Objekt", { pinterest: true }],
  ];
  for (const [name, wert] of GESETZT) {
    it(`R4: Hook steht auf ${name}, Speicher traegt Zustimmung -> Block schreibt NICHT`, () => {
      w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
      w.pagesmithConsent = wert;
      runRestore();
      expect(w.pagesmithConsent).toBe(wert);
    });
  }
  it("R4: Hook NICHT gesetzt, Speicher traegt Zustimmung -> Block schreibt (Positivkontrolle)", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
    runRestore();
    expect(typeof w.pagesmithConsent).toBe("object");
  });

  it("R5: gespeichert nur meta -> Hook exakt meta true, die uebrigen sechs false", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, NUR_META);
    runRestore();
    expect(w.pagesmithConsent).toEqual({
      meta: true,
      pinterest: false,
      tiktok: false,
      linkedin: false,
      google: false,
      analytics: false,
      custom: false,
    });
  });

  // R6. EIN WERT VOR EINEM NEUEN ZIEL fuehrt dessen Schluessel in keiner Liste — er ist
  // gueltig, und der Hook traegt trotzdem alle sechs, den fehlenden als false.
  it("R6: der Hook traegt genau die sieben Schluessel, auch bei einem Wert ohne alle Listen", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, "ps1:meta|");
    runRestore();
    const hook = w.pagesmithConsent as Record<string, unknown>;
    expect(Object.keys(hook).sort()).toEqual([...SIEBEN].sort());
    expect(hook.meta).toBe(true);
    for (const k of SIEBEN.filter((k) => k !== "meta")) expect(hook[k]).toBe(false);
  });

  const UNGUELTIG: Array<[string, string]> = [
    ["literales true", "true"],
    ["Array", '["meta"]'],
    ["JSON-Objekt", '{"meta":true}'],
    ["Muell", "%%%"],
    ["fremde Marke", "ps0:meta|"],
    ["ohne Trenner", "ps1:meta"],
    ["zwei Trenner", "ps1:meta||"],
    ["Duplikat", "ps1:meta,meta|"],
    ["in beiden Listen", "ps1:meta|meta"],
    ["unbekannter Schluessel", "ps1:snapchat|"],
    ["leeres Element", "ps1:meta,|"],
    ["ueberlang", "ps1:meta|" + ",".repeat(600)],
  ];
  for (const [name, wert] of UNGUELTIG) {
    it(`R7: ${name} -> nie gefragt, Block schreibt nicht, Setzer lehnt ab`, () => {
      w.localStorage.setItem(CONSENT_STORE_KEY, wert);
      runRestore();
      expect(store().read()).toEqual({ state: "never" });
      expect(w.pagesmithConsent).toBeUndefined();
      runSetter();
      const hook = w.pagesmithConsent as Record<string, unknown>;
      for (const k of SIEBEN) expect(hook[k]).toBe(false);
    });
  }
  it("R7: gueltiger Wert -> entschieden (Positivkontrolle)", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ABGELEHNT);
    runRestore();
    expect(store().read()).toEqual({ state: "decided", granted: [], denied: SIEBEN });
  });

  it("R8: ein werfender Zugriff auf localStorage heisst nie gefragt, und nichts wirft", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
    // POSITIVKONTROLLE im selben Lauf: ohne Wurf ist der Wert entschieden.
    runRestore();
    expect(store().read().state).toBe("decided");
    delete w.pagesmithConsent;

    const desc = Object.getOwnPropertyDescriptor(window, "localStorage");
    Object.defineProperty(window, "localStorage", {
      configurable: true,
      get() {
        throw new Error("SecurityError");
      },
    });
    try {
      expect(() => runRestore()).not.toThrow();
      expect(store().read()).toEqual({ state: "never" });
      expect(w.pagesmithConsent).toBeUndefined();
    } finally {
      if (desc) Object.defineProperty(window, "localStorage", desc);
    }

    vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
      throw new Error("blocked");
    });
    expect(store().read()).toEqual({ state: "never" });
  });
});

describe("11.5b — Schnittstelle", () => {
  it("R9: read() veraendert nichts — kein setItem, kein removeItem, kein Hook, auch bei ungueltigem Wert", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, "%%%");
    runRestore();
    const set = vi.spyOn(Storage.prototype, "setItem");
    const remove = vi.spyOn(Storage.prototype, "removeItem");
    const first = store().read();
    const second = store().read();
    expect(second).toEqual(first);
    expect(second).not.toBe(first);
    expect(set).not.toHaveBeenCalled();
    expect(remove).not.toHaveBeenCalled();
    expect(w.pagesmithConsent).toBeUndefined();
    expect(w.localStorage.getItem(CONSENT_STORE_KEY)).toBe("%%%");
    // POSITIVKONTROLLE: dieselben Spione melden einen Schreibweg.
    expect(store().write([])).toBe(true);
    expect(set).toHaveBeenCalled();
  });

  const ABGELEHNTE_EINGABEN: Array<[string, unknown]> = [
    ["literales true", true],
    ["String", "meta"],
    ["Objekt", { meta: true }],
    ["unbekannter Schluessel", ["snapchat"]],
    ["Duplikat", ["meta", "meta"]],
    ["Nicht-String", [1]],
  ];
  for (const [name, eingabe] of ABGELEHNTE_EINGABEN) {
    it(`R10: write(${name}) -> false, Speicher und Hook unveraendert`, () => {
      runRestore();
      expect(store().write(eingabe)).toBe(false);
      expect(w.localStorage.getItem(CONSENT_STORE_KEY)).toBeNull();
      expect(w.pagesmithConsent).toBeUndefined();
    });
  }
  it("R10: write(gueltige Liste) -> true, gespeicherte Gestalt exakt (Positivkontrolle)", () => {
    runRestore();
    expect(store().write(["analytics", "meta"])).toBe(true);
    expect(w.localStorage.getItem(CONSENT_STORE_KEY)).toBe(
      "ps1:meta,analytics|pinterest,tiktok,linkedin,google,custom"
    );
    expect(store().read()).toEqual({
      state: "decided",
      granted: ["meta", "analytics"],
      denied: ["pinterest", "tiktok", "linkedin", "google", "custom"],
    });
  });

  // R13. ARCHITEKT-ENTSCHEIDUNG 2026-09-14, write() setzt auch den Hook der laufenden Seite:
  // ohne Neuladen muss die Erst-Conversion
  // hinausgehen koennen.
  it("R13: write() setzt den Hook der laufenden Seite — der echte Konsument folgt", () => {
    runRuntimes();
    runRestore();
    runSetter();
    // POSITIVKONTROLLE: vor dem Aufruf ist alles abgelehnt.
    for (const k of SIEBEN) expect(ask(k)).toBe(false);
    expect(store().write(["meta", "analytics"])).toBe(true);
    for (const k of SIEBEN) expect(ask(k)).toBe(k === "meta" || k === "analytics");
  });

  // R14. DER EINZIGE TEST, DER DIE REIHENFOLGE IN write() FAENGT: erst speichern, dann
  // den Hook. Dreht jemand sie um, sendet die Seite, und beim naechsten Laden ist die
  // Zustimmung weg.
  it("R14: schlaegt das Speichern fehl, bleibt der Hook unveraendert und write() gibt false", () => {
    runRestore();
    runSetter();
    const vorher = w.pagesmithConsent;

    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(store().write(SIEBEN)).toBe(false);
    expect(w.pagesmithConsent).toBe(vorher);
    vi.restoreAllMocks();

    vi.spyOn(Storage.prototype, "getItem").mockReturnValue("ps1:|");
    expect(store().write(SIEBEN)).toBe(false);
    expect(w.pagesmithConsent).toBe(vorher);
  });
});

describe("11.5b — Ende zu Ende gegen den echten Konsumenten", () => {
  const ALL = (keys: string[]) =>
    (w.__psConsentAll as (ts: string[]) => Record<string, boolean>)(keys);

  it("R11: gespeicherte Zustimmung -> der Konsument erlaubt alle sechs", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
    runRuntimes();
    runRestore();
    runSetter();
    for (const k of SIEBEN) expect(ALL(SIEBEN)[k]).toBe(true);
    expect(ask("analytics")).toBe(true);
  });
  it("R11: nichts gespeichert -> der Konsument verbietet alle sechs (Gegenfall)", () => {
    runRuntimes();
    runRestore();
    runSetter();
    for (const k of SIEBEN) expect(ALL(SIEBEN)[k]).toBe(false);
  });
  it("R11: Fremd-CMP vorab gesetzt -> seine Antwort gilt, trotz gespeicherter Zustimmung", () => {
    w.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
    w.pagesmithConsent = { pinterest: true };
    runRuntimes();
    runRestore();
    runSetter();
    expect(ask("pinterest")).toBe(true);
    expect(ask("meta")).toBe(false);
  });
});
