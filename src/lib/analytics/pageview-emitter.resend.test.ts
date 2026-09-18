import { createHash } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { buildPageViewScript, injectPageViewEmitter } from "./pageview-emitter";
import { PAGEVIEW_EVENT } from "./events";
import { CONSENT_STORE_KEY } from "@/lib/tracking/consent-store";

// SCHEIBE 11.5c — DER NACHGEHOLTE SEITENAUFRUF.
//
// DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN DER SCHEIBE 11.5c (Phase 11.5) UND DEM
// FREIGEGEBENEN PLAN, NIE AUS DEM CODE: der Name der Sende-Logik, die Adresse, die
// Schluesselmenge der Nutzlast und die sechs Einwilligungs-Schluessel stehen hier als
// Literal. Der Vergleichswert des AUS-Zweigs (N8) ist VOR der ersten Aenderung erhoben.
//
// DER HARNESS FUEHRT DEN ECHTEN ERZEUGTEN TEXT AUS, KEINE NACHSTELLUNG: Er baut das
// Dokument ueber injectPageViewEmitter mit eingeschaltetem Schalter und evaluiert Gate,
// Wiederherstellung, Setzer und PageView-Script in Dokumentreihenfolge — dieselbe Bauform
// wie mountEmitter in pageview-emitter.test.ts. Bis zu dieser Scheibe hat KEIN Test die
// Wiederherstellung und das PageView-Script zusammen ausgefuehrt.
//
// HYGIENE, und ohne sie misst jeder Test ab dem zweiten den Vorgaenger: Die Blocks setzen
// ihre Globals SELBST (nicht per vi.stubGlobal), und der Guard __ps_pv ueberlebt jeden
// Test. Deshalb raeumt beforeEach alle sechs Globals und den Speicher ab. jsdom kennt
// navigator.sendBeacon nicht — ohne Spion faellt der Emitter auf fetch zurueck und tut
// lautlos nichts.

const HTML = "<html><body><h1>nur Text</h1></body></html>";
const KEY = "tk-resend-11-5c";
const SECHS = ["meta", "pinterest", "tiktok", "linkedin", "google", "analytics"];
const ALLE_ZUGESTIMMT = "ps1:meta,pinterest,tiktok,linkedin,google,analytics|";
const GLOBALS = [
  "__ps_pv",
  "__psConsent",
  "__psConsentAll",
  "__psConsentStore",
  "__psPageView",
  "pagesmithConsent",
  // SEIT SCHEIBE 11.5e-2: Der Widerruf-Block legt ihn an. OHNE IHN UEBERLEBT ER DEN TEST
  // und verunreinigt den naechsten — das ist Hygiene, kein Waechter.
  "pagesmithConsentRevoke",
];

type Mutable = Record<string, unknown>;
type BeaconSpy = ReturnType<typeof vi.fn>;
const w = window as unknown as Mutable & { eval: (code: string) => unknown };

function store(): { write: (granted: unknown) => boolean } {
  return w.__psConsentStore as { write: (granted: unknown) => boolean };
}

function installBeacon(): BeaconSpy {
  const beacon = vi.fn(() => true);
  (navigator as unknown as Mutable).sendBeacon = beacon;
  return beacon;
}

/** Die Script-Elemente des ausgelieferten Dokuments bei eingeschaltetem Schalter. */
function scriptsOfPublishedPage(): Element[] {
  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(HTML, KEY, "bar", { theme: "light" }),
    "text/html"
  );
  return Array.from(doc.querySelectorAll("script"));
}

function run(script: Element): void {
  w.eval(script.textContent ?? "");
}

/** Das ganze Dokument in Reihenfolge ausfuehren, wie es der Browser beim Laden taete. */
function mount(): BeaconSpy {
  const beacon = installBeacon();
  for (const s of scriptsOfPublishedPage()) run(s);
  return beacon;
}

async function payloadOf(beacon: BeaconSpy, call: number): Promise<Mutable> {
  const [, blob] = beacon.mock.calls[call] as unknown as [string, Blob];
  return JSON.parse(await blob.text()) as Mutable;
}

beforeEach(() => {
  for (const g of GLOBALS) delete w[g];
  window.localStorage.clear();
  // HYGIENE SEIT SCHEIBE 11.5d: Bei eingeschaltetem Schalter wertet mount() auch den
  // Leisten-Block aus, und der haengt ein Element an das Testdokument. Ohne diese Zeile
  // bliebe es ueber den Lauf hinaus stehen. Keine Assertion dieser Datei liest das DOM.
  // SEIT SCHEIBE 11.5d-2 RAEUMT DER SELEKTOR AUCH DEN HOST DES MODALS: mount() laeuft hier
  // mit der Leiste, aber ein Tag-gebundenes Aufraeumen liesse jeden anderen Host stehen.
  document
    .querySelectorAll("pagesmith-bar, pagesmith-modal")
    .forEach((el) => el.remove());
});
afterEach(() => {
  vi.restoreAllMocks();
  delete (navigator as unknown as Mutable).sendBeacon;
  for (const g of GLOBALS) delete w[g];
  window.localStorage.clear();
  document
    .querySelectorAll("pagesmith-bar, pagesmith-modal")
    .forEach((el) => el.remove());
});

describe("11.5c — der nachgeholte Seitenaufruf, am echten Text", () => {
  it("N1: Laden ohne Entscheidung sendet nichts; write() mit analytics sendet GENAU EINEN Seitenaufruf in der Bestandsform", async () => {
    const beacon = mount();
    expect(beacon).not.toHaveBeenCalled();
    expect(w.__ps_pv).toBeUndefined();

    expect(store().write(SECHS)).toBe(true);

    // POSITIVKONTROLLE der Abwesenheit oben, im selben Lauf.
    expect(beacon).toHaveBeenCalledTimes(1);
    const [url] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe("/api/e");
    // DER NACHGESENDETE SEITENAUFRUF WIRD NICHT KENNTLICH GEMACHT (Architekt-Entscheidung
    // 2026-09-14): Er ist dieselbe Zeile wie jeder andere Seitenaufruf, weil keine
    // Lesefunktion eine solche Unterscheidung liest — also dieselben drei Schluessel wie
    // beim Laden, kein zusaetzliches Feld.
    const payload = await payloadOf(beacon, 0);
    expect(Object.keys(payload).sort()).toEqual(["event", "eventID", "trackingKey"]);
    expect(payload.event).toBe(PAGEVIEW_EVENT);
    expect(payload.trackingKey).toBe(KEY);
    expect(typeof payload.eventID).toBe("string");
    expect(w.__ps_pv).toBe(payload.eventID);
  });

  it("N2: KEIN DOPPEL — beim Laden gesendet, write() loest keinen zweiten aus", async () => {
    window.localStorage.setItem(CONSENT_STORE_KEY, ALLE_ZUGESTIMMT);
    const beacon = mount();
    // POSITIVKONTROLLE: das Laden sendet selbst.
    expect(beacon).toHaveBeenCalledTimes(1);
    const guard = w.__ps_pv;
    expect(guard).toBe((await payloadOf(beacon, 0)).eventID);

    expect(store().write(SECHS)).toBe(true);
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(w.__ps_pv).toBe(guard);
  });

  it("N3: KEIN DOPPEL — ein zweites write() nach dem nachgesendeten loest keinen weiteren aus", () => {
    const beacon = mount();
    expect(beacon).not.toHaveBeenCalled();
    expect(store().write(SECHS)).toBe(true);
    // POSITIVKONTROLLE: das erste write() sendet.
    expect(beacon).toHaveBeenCalledTimes(1);

    expect(store().write(SECHS)).toBe(true);
    expect(beacon).toHaveBeenCalledTimes(1);
  });

  it("N4: NUR BEI ANALYTICS — write() ohne analytics sendet nichts, mit analytics danach genau einmal", () => {
    const beacon = mount();
    expect(store().write(["meta"])).toBe(true);
    expect(beacon).not.toHaveBeenCalled();
    expect(w.__ps_pv).toBeUndefined();

    // POSITIVKONTROLLE im selben Lauf: derselbe Aufbau sendet, sobald analytics dabei ist.
    expect(store().write(["meta", "analytics"])).toBe(true);
    expect(beacon).toHaveBeenCalledTimes(1);
  });

  it("N5: NUR BEI ERFOLG — scheitert das Speichern, wird nichts nachgesendet", () => {
    const beacon = mount();
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });
    expect(store().write(SECHS)).toBe(false);
    expect(beacon).not.toHaveBeenCalled();

    // POSITIVKONTROLLE im selben Lauf: ohne den Wurf sendet derselbe Aufruf.
    vi.restoreAllMocks();
    expect(store().write(SECHS)).toBe(true);
    expect(beacon).toHaveBeenCalledTimes(1);
  });

  // N6/7 IST DER EINZIGE TEST, DER DEN FALL "write() VOR DEM PAGEVIEW-SCRIPT" AUSDRUECKLICH
  // PRUEFT. Das Entfernen der Existenzpruefung in write() fangen zusaetzlich R9, die
  // R10-Positivkontrolle und R13 in tracking/consent-store.test.ts — dort als ungefangener
  // ReferenceError, weil sie write() ohne PageView-Script rufen (gemessen per Mutation,
  // Scheibe 11.5c). Beide Seiten melden dieselbe Fehlerklasse; keine ist redundant.
  it("N6/7: die Existenzpruefung — write() waehrend des Parsens findet die Sende-Logik nicht, wirft nicht, und das PageView-Script sendet danach selbst", () => {
    const beacon = installBeacon();
    const scripts = scriptsOfPublishedPage();
    const pageView = scripts.find((s) => s.id === "__ps_pve");
    expect(pageView).toBeDefined();
    for (const s of scripts) if (s !== pageView) run(s);

    let result: boolean | undefined;
    expect(() => {
      result = store().write(SECHS);
    }).not.toThrow();
    expect(result).toBe(true);
    expect(w.__psPageView).toBeUndefined();
    expect(beacon).not.toHaveBeenCalled();

    // POSITIVKONTROLLE im selben Lauf, und zugleich die Parse-Reihenfolge: Das
    // PageView-Script laeuft danach, sieht den von write() gesetzten Hook und sendet.
    run(pageView as Element);
    expect(beacon).toHaveBeenCalledTimes(1);
  });
});

describe("11.5c — die Gestalt des Erzeugers", () => {
  // DER VERGLEICHSWERT DES AUS-ZWEIGS WURDE VOR JEDER AENDERUNG AUF HEAD 76678c7 ERHOBEN
  // (CC, 2026-09-14), mit zwei Instrumenten: node:crypto im Lauf und wc -c / sha256sum
  // ueber das gespeicherte Artefakt, beide fuer buildPageViewScript("tk_baseline_11_5c")
  // in der damaligen Aufrufform mit einem Argument. WER IHN ROT VORFINDET, REGENERIERT IHN
  // NICHT: Entweder ist die Byte-Gleichheit bei AUS verletzt — dann ist das der Befund —,
  // oder der Text hat sich aus einem anderen, benannten Grund geaendert.
  it("N8: der Zweig haengt am Parameter — AUS byte-gleich zu vor der Scheibe und ohne Sende-Logik, AN mit ihr", () => {
    const off = buildPageViewScript("tk_baseline_11_5c", false);
    expect(Buffer.byteLength(off, "utf8")).toBe(787);
    expect(createHash("sha256").update(off, "utf8").digest("hex")).toBe(
      "3d759e3cd195f8b47fe50ba3656b5f760911392231e5b3ca91dc1fa9015d3a08"
    );
    expect(off).not.toContain("__psPageView");

    // POSITIVKONTROLLE der Abwesenheit, im selben Lauf: dieselbe Suche trifft bei AN.
    const on = buildPageViewScript("tk_baseline_11_5c", true);
    expect(on).toContain("window.__psPageView = function");
  });

  // N9 IST DER EINZIGE SERIALISIERUNGS-WAECHTER DER AN-GESTALT: der bestehende Test in
  // pageview-emitter.test.ts prueft nur den AUS-Zweig.
  it("N9: die AN-Gestalt ist serialisierungssicher — genau ein </script>, kein </body>", () => {
    const on = buildPageViewScript(KEY, true);
    expect(on.match(/<\/script>/g)?.length).toBe(1);
    expect(on.endsWith("</script>")).toBe(true);
    expect(on.toLowerCase()).not.toContain("</body>");
    // POSITIVKONTROLLE der Abwesenheit: dieselbe Suche trifft im ausgelieferten Dokument.
    expect(injectPageViewEmitter(HTML, KEY, "bar", { theme: "light" }).toLowerCase()).toContain("</body>");
  });
});
