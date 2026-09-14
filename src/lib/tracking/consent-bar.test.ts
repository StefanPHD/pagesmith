import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import { buildConsentBarScript } from "./consent-bar";

// SCHEIBE 11.5d — DIE EINWILLIGUNGS-LEISTE.
//
// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NIE AUS DEM CODE: Host-Name und Kennung
// (`pagesmith-bar`, `__ps_clb`), die zwei Beschriftungen, der Speicher-Schluessel, die
// sechs Einwilligungs-Schluessel und die Nadel-Liste stehen hier als Literal.
//
// DER HARNESS FUEHRT DEN ECHTEN ERZEUGTEN TEXT AUS, KEINE NACHSTELLUNG — dieselbe Bauform
// wie mount() in analytics/pageview-emitter.resend.test.ts: Dokument ueber
// injectPageViewEmitter bauen, per DOMParser zerlegen, alle Scripts in Dokumentreihenfolge
// im globalen Fenster auswerten.
//
// WAS HIER NICHT GEPRUEFT WERDEN KANN, UND KEIN TEST BEHAUPTET ES: Sichtbarkeit, Lage,
// Farbe, Stapelung, Verdeckung, die Kaskade ueber die Schattengrenze und gegen fremdes
// !important. Die Testumgebung wertet kein CSS aus (docs/immer-beachten.md, "DIE
// TESTUMGEBUNG WERTET KEIN CSS AUS"). Geprueft wird STRUKTUR: Anwesenheit, Anzahl,
// Text, Attribute, Speicherwert, Hook, Beacons. Alles andere ist Live-Test.
//
// HYGIENE, und ohne sie misst jeder Test ab dem zweiten den Vorgaenger: Die Bloecke setzen
// ihre Globals selbst, der Guard __ps_pv ueberlebt jeden Test, und die Leiste haengt ein
// Element an das Testdokument. beforeEach und afterEach raeumen alle drei ab; L0 haelt
// das Aufraeumen des DOM.

const HOST = "pagesmith-bar";
const BAR_ID = 'id="__ps_clb"';
const HTML = "<html><body><h1>nur Text</h1></body></html>";
const KEY = "tk-bar-11-5d";
const STORE_KEY = "__ps_consent";
const SECHS = ["meta", "pinterest", "tiktok", "linkedin", "google", "analytics"];
const ALLE_ZUGESTIMMT = "ps1:meta,pinterest,tiktok,linkedin,google,analytics|";
const ALLE_ABGELEHNT = "ps1:|meta,pinterest,tiktok,linkedin,google,analytics";
const GLOBALS = [
  "__ps_pv",
  "__psConsent",
  "__psConsentAll",
  "__psConsentStore",
  "__psPageView",
  "pagesmithConsent",
];

type Mutable = Record<string, unknown>;
type BeaconSpy = ReturnType<typeof vi.fn>;
const w = window as unknown as Mutable & { eval: (code: string) => unknown };

function hookAus(wert: boolean): Record<string, boolean> {
  return Object.fromEntries(SECHS.map((k) => [k, wert]));
}

function installBeacon(): BeaconSpy {
  const beacon = vi.fn(() => true);
  (navigator as unknown as Mutable).sendBeacon = beacon;
  return beacon;
}

function scriptsOf(html: string, on: boolean): Element[] {
  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(html, KEY, on),
    "text/html"
  );
  return Array.from(doc.querySelectorAll("script"));
}

function run(script: Element): void {
  w.eval(script.textContent ?? "");
}

/** Das ganze Dokument bei eingeschaltetem Schalter in Reihenfolge ausfuehren. */
function mount(): BeaconSpy {
  const beacon = installBeacon();
  for (const s of scriptsOf(HTML, true)) run(s);
  return beacon;
}

function hosts(): NodeListOf<Element> {
  return document.querySelectorAll(HOST);
}

function button(label: string): HTMLButtonElement {
  const root = hosts()[0]?.shadowRoot;
  if (!root) throw new Error("keine Leiste");
  const b = Array.from(root.querySelectorAll("button")).find(
    (x) => x.textContent === label
  );
  if (!b) throw new Error(`kein Knopf "${label}"`);
  return b;
}

function aufraeumen(): void {
  for (const g of GLOBALS) delete w[g];
  hosts().forEach((el) => el.remove());
}

beforeEach(() => {
  aufraeumen();
  window.localStorage.clear();
});
afterEach(() => {
  vi.restoreAllMocks();
  delete (navigator as unknown as Mutable).sendBeacon;
  aufraeumen();
  window.localStorage.clear();
});

describe("11.5d — Injektion und Gestalt des Blocks", () => {
  // L0. DER HYGIENE-WAECHTER. Er haelt, dass das Aufraeumen des DOM wirklich trifft —
  // ohne ihn stuende eine Leiste aus dem Vortest im naechsten Test und liesse jede
  // "keine Leiste"-Aussage aus dem falschen Grund gruen werden.
  it("L0: vor dem Test steht kein Host im Dokument, und das Aufraeumen trifft wirklich (Positivkontrolle)", () => {
    expect(hosts()).toHaveLength(0);
    mount();
    expect(hosts()).toHaveLength(1);
    aufraeumen();
    expect(hosts()).toHaveLength(0);
  });

  it("L1: Schalter AUS -> kein Leisten-Block (Positivkontrolle: Emitter da)", () => {
    const out = injectPageViewEmitter(HTML, KEY, false);
    expect(out).not.toContain(BAR_ID);
    expect(out).toContain('id="__ps_pve"');
  });

  it("L2: Schalter AN -> Gate < Wiederherstellung < Leiste < Setzer < Emitter", () => {
    const out = injectPageViewEmitter(HTML, KEY, true);
    const gate = out.indexOf('id="pagesmith-consent"');
    const restore = out.indexOf('id="__ps_cnr"');
    const bar = out.indexOf(BAR_ID);
    const setter = out.indexOf('id="__ps_cns"');
    const pve = out.indexOf('id="__ps_pve"');
    expect(gate).toBeGreaterThan(-1);
    expect(gate).toBeLessThan(restore);
    expect(restore).toBeLessThan(bar);
    expect(bar).toBeLessThan(setter);
    expect(setter).toBeLessThan(pve);
  });

  // L3. DER EINZIGE SERIALISIERUNGS-WAECHTER DIESES BLOCKS, und er ist schaerfer als die
  // der Nachbarn: KEIN `<` im Rumpf. Damit kann weder ein `</script>` noch ein `</body>`
  // noch ein `<!--` darin stehen.
  it("L3: der Rumpf enthaelt kein '<'; genau ein </script>, kein </body>", () => {
    const block = buildConsentBarScript();
    const rumpf = block.slice(block.indexOf(">") + 1, block.lastIndexOf("<"));
    // POSITIVKONTROLLE des Ausschnitts: er traegt wirklich den Code.
    expect(rumpf).toContain("attachShadow");
    expect(rumpf.includes("<")).toBe(false);
    // POSITIVKONTROLLE der Suche, im selben Lauf: am ganzen Block trifft sie die Tags.
    expect(block.includes("<")).toBe(true);
    expect(block.match(/<\/script>/gi)?.length).toBe(1);
    expect(block.endsWith("</script>")).toBe(true);
    expect(block.toLowerCase()).not.toContain("</body>");
  });

  // L4. DIE NADELN SIND AUS DEM BESTAND ABGELESEN, NICHT ERFUNDEN: hasConsentScript
  // (`pagesmith-consent`), die Reihenfolge-Tests R2/T2/(f) und T8/R12 (`__ps_cnr`,
  // `__ps_cns`, `__ps_pv` — deckt `__ps_pve`), und `pagesmith-mappings` in
  // publish.test.ts. Enthielte der Block eine davon, luege eine indexOf-Reihenfolge,
  // ohne rot zu werden.
  it("L4: der Block traegt keine der Zeichenketten, nach denen der Bestand sucht", () => {
    const block = buildConsentBarScript();
    const mitDaten =
      '<html><body><h1>x</h1><script type="application/json" id="pagesmith-mappings">[]</scr' +
      "ipt></body></html>";
    const out = injectPageViewEmitter(mitDaten, KEY, true);
    for (const nadel of [
      "pagesmith-consent",
      "pagesmith-mappings",
      "__ps_cnr",
      "__ps_cns",
      "__ps_pv",
    ]) {
      expect(block).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im ausgelieferten Text.
      expect(out).toContain(nadel);
    }
  });
});

describe("11.5d — wann die Leiste erscheint", () => {
  it("L5: nichts entschieden -> genau eine Leiste mit genau zwei Knoepfen, nichts gesendet, Hook abgelehnt", () => {
    const beacon = mount();
    expect(hosts()).toHaveLength(1);
    expect(hosts()[0].parentElement).toBe(document.body);
    const root = hosts()[0].shadowRoot;
    expect(root).not.toBeNull();
    const knoepfe = Array.from(root!.querySelectorAll("button"));
    expect(knoepfe.map((b) => b.textContent)).toEqual(["Alle akzeptieren", "Ablehnen"]);
    for (const b of knoepfe) expect(b.getAttribute("type")).toBe("button");
    expect(beacon).not.toHaveBeenCalled();
    // Der Setzer lief NACH der Leiste und hat abgelehnt.
    expect(w.pagesmithConsent).toEqual(hookAus(false));
  });

  // L6. DER EINZIGE TEST, DER DIE HOOK-BEDINGUNG FAENGT (Pflicht-Mutation (ii-a)). Ein
  // fremdes CMP, das VOR unseren Bloecken synchron setzt, bei LEEREM Speicher — dort
  // liefert read() "never", und nur die Hook-Pruefung haelt die Leiste zurueck.
  it("L6: ein vorab gesetzter fremder Hook -> keine Leiste; ohne ihn -> Leiste (Positivkontrolle im selben Lauf)", () => {
    const fremd = { meta: true };
    w.pagesmithConsent = fremd;
    mount();
    expect(hosts()).toHaveLength(0);
    expect(w.pagesmithConsent).toBe(fremd);

    aufraeumen();
    mount();
    expect(hosts()).toHaveLength(1);
  });

  it("L7: eine gespeicherte Entscheidung -> keine Leiste; Speicher geleert -> Leiste (Positivkontrolle im selben Lauf)", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ABGELEHNT);
    mount();
    expect(hosts()).toHaveLength(0);
    expect(w.pagesmithConsent).toEqual(hookAus(false));

    aufraeumen();
    window.localStorage.clear();
    mount();
    expect(hosts()).toHaveLength(1);
  });

  // L8. KONSTRUIERT — DIESER ZUSTAND ENTSTEHT AUF DEM PRODUKTIVEN PFAD NICHT, und das ist
  // der Grund fuer den Test, nicht ein Fehler an ihm. Die Wiederherstellung belegt den
  // Hook, sobald read() "decided" liefert; hinter ihr folgt "never" also schon aus dem
  // ungesetzten Hook, und die read()-Bedingung der Leiste ist dort REDUNDANT. Sie bleibt
  // als zweite Wache (Kommentar an buildConsentBarScript). Um sie ueberhaupt zu pruefen,
  // wird der Hook zwischen Wiederherstellung und Leiste von Hand geloescht.
  // DER EINZIGE TEST, DER DIE read()-BEDINGUNG FAENGT (Pflicht-Mutation (ii-b)).
  it("L8 (konstruiert): Speicher entschieden, Hook von Hand geloescht -> keine Leiste; Speicher leer -> Leiste", () => {
    const vorDerLeiste = (): void => {
      const scripts = scriptsOf(HTML, true);
      const idx = scripts.findIndex((s) => s.id === "__ps_clb");
      expect(idx).toBeGreaterThan(0);
      for (const s of scripts.slice(0, idx)) run(s);
      delete w.pagesmithConsent;
      run(scripts[idx]);
    };

    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    vorDerLeiste();
    expect(hosts()).toHaveLength(0);

    aufraeumen();
    window.localStorage.clear();
    vorDerLeiste();
    expect(hosts()).toHaveLength(1);
  });
});

describe("11.5d — die zwei Knoepfe", () => {
  it("L9: 'Alle akzeptieren' -> alle sechs gespeichert, Hook frei, genau ein Seitenaufruf, Leiste weg", async () => {
    const beacon = mount();
    expect(beacon).not.toHaveBeenCalled();

    button("Alle akzeptieren").click();

    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ZUGESTIMMT);
    expect(w.pagesmithConsent).toEqual(hookAus(true));
    // POSITIVKONTROLLE der Abwesenheit oben, im selben Lauf.
    expect(beacon).toHaveBeenCalledTimes(1);
    const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(JSON.parse(await blob.text()).event).toBe("__ps_pageview");
    expect(hosts()).toHaveLength(0);
  });

  it("L10: 'Ablehnen' -> alle sechs abgelehnt gespeichert, Hook abgelehnt, nichts gesendet, Leiste weg", () => {
    const beacon = mount();
    expect(hosts()).toHaveLength(1);

    button("Ablehnen").click();

    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ABGELEHNT);
    expect(w.pagesmithConsent).toEqual(hookAus(false));
    expect(beacon).not.toHaveBeenCalled();
    expect(hosts()).toHaveLength(0);
  });

  // L11. DIE ENTSCHEIDUNG, DASS DIE LEISTE AUCH BEI write() === false SCHLIESST — und ihr
  // stiller Preis: Auf dieser Seite geht nichts hinaus, beim naechsten Laden ist sie
  // wieder da.
  it("L11: der Speicher wirft -> Leiste schliesst trotzdem, nichts gespeichert, nichts gesendet; beim naechsten Laden wieder da", () => {
    const beacon = mount();
    expect(hosts()).toHaveLength(1);
    vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
      throw new Error("QuotaExceededError");
    });

    button("Alle akzeptieren").click();

    expect(hosts()).toHaveLength(0);
    expect(w.pagesmithConsent).toEqual(hookAus(false));
    expect(beacon).not.toHaveBeenCalled();
    vi.restoreAllMocks();
    expect(window.localStorage.getItem(STORE_KEY)).toBeNull();

    aufraeumen();
    mount();
    expect(hosts()).toHaveLength(1);
  });
});

describe("11.5d — die Leiste macht die Seite nicht unbedienbar", () => {
  function attribute(el: Element): string {
    return Array.from(el.attributes)
      .map((a) => `${a.name}=${a.value}`)
      .join(";");
  }

  it("L12: kein Attribut an html/body, nichts im head, kein globaler Name, kein `overflow` — jeweils mit Positivkontrolle", () => {
    const htmlVorher = attribute(document.documentElement);
    const bodyVorher = attribute(document.body);
    const headVorher = document.head.children.length;

    // GLOBALE NAMEN: die Bloecke VOR der Leiste laufen lassen, dann nur die Leiste.
    installBeacon();
    const scripts = scriptsOf(HTML, true);
    const idx = scripts.findIndex((s) => s.id === "__ps_clb");
    for (const s of scripts.slice(0, idx)) run(s);
    const namenVorher = new Set(Object.keys(window));
    run(scripts[idx]);
    const neu = Object.keys(window).filter((k) => !namenVorher.has(k));
    expect(neu).toEqual([]);
    expect(hosts()).toHaveLength(1);
    // POSITIVKONTROLLE der Namens-Suche: der Setzer danach legt einen an.
    run(scripts[idx + 1]);
    expect(Object.keys(window).filter((k) => !namenVorher.has(k))).toContain(
      "pagesmithConsent"
    );

    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);

    button("Ablehnen").click();
    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);

    // `overflow` im Block: nie.
    const traegtOverflow = (text: string): boolean => /overflow/i.test(text);
    expect(traegtOverflow(buildConsentBarScript())).toBe(false);
    // POSITIVKONTROLLE der Suche.
    expect(traegtOverflow("html{overflow:hidden}")).toBe(true);
  });
});

describe("11.5d — der Sachtext der Leiste", () => {
  // L13. DIE ERWARTUNG STAMMT AUS DER FREIGABE VON E3 (Architekt/Owner 2026-09-14), NIE
  // AUS DEM CODE: Der Satz steht hier als Literal und wird nicht aus CONSENT_BAR_TEXT
  // gezogen — sonst bestaetigte der Test jede Aenderung am Wortlaut, statt sie zu fangen.
  // WER DEN SATZ AENDERT, BRAUCHT EINE NEUE FREIGABE, und dieser Test wird rot.
  it("L13: genau ein Sachtext, als ganzer Satz, per textContent, VOR den zwei Knoepfen", () => {
    const SATZ =
      "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.";
    mount();
    const root = hosts()[0]?.shadowRoot;
    expect(root).toBeTruthy();
    const region = root!.querySelector('[role="region"]');
    expect(region).not.toBeNull();
    const kinder = Array.from(region!.children);
    // Der Text ist das ERSTE Kind, danach genau die zwei Knoepfe.
    expect(kinder.map((k) => k.tagName)).toEqual(["P", "BUTTON", "BUTTON"]);
    expect(kinder[0].textContent).toBe(SATZ);
    // Per textContent, nicht per Markup: Der Absatz traegt keine Kind-Elemente.
    expect(kinder[0].children).toHaveLength(0);
    // Genau einmal in der Leiste — keine Ueberschrift, keine Wiederholung.
    expect(root!.textContent!.split(SATZ).length - 1).toBe(1);
    // POSITIVKONTROLLE der Zaehlung, im selben Lauf: dieselbe Suche trifft einen Knopf.
    expect(root!.textContent!.split("Ablehnen").length - 1).toBe(1);
  });
});
