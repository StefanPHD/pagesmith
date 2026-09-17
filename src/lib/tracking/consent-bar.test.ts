import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import { buildConsentBarScript } from "./consent-bar";
import { CONSENT_GROUP_KEYS } from "./consent-choice";

// SCHEIBE 11.5d — DIE EINWILLIGUNGS-LEISTE. SEIT SCHEIBE 11.5e-1 MIT ZWEI GRUPPEN-SCHALTERN
// UND DREI KNOEPFEN; die Tests dieser Scheibe stehen unten unter "11.5e-1".
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
  // SEIT SCHEIBE 11.5e-2: Der Widerruf-Block legt ihn an. OHNE IHN UEBERLEBT ER DEN TEST
  // und verunreinigt den naechsten — das ist Hygiene, kein Waechter.
  "pagesmithConsentRevoke",
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
    injectPageViewEmitter(html, KEY, on ? "bar" : "off"),
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

/**
 * Den Weg zur Auswahl klicken (Scheibe 11.13a). DIE OBERFLAECHE ERSCHEINT SEITHER
 * EINGEKLAPPT; alle Tests, die die Gestalt VOR dieser Scheibe festnageln, laufen ab jetzt
 * als Erwartung des AUSGEKLAPPTEN Zustands und rufen dies nach mount().
 * IHRE ASSERTIONEN SIND UNVERAENDERT — sie sind nicht aufgeweicht, sie haben einen
 * Zustand bekommen.
 */
function ausklappen(): void {
  button("Einstellungen").click();
}

/** Die Checkbox des Gruppen-Schalters mit dieser Beschriftung (Scheibe 11.5e-1). */
function schalter(name: string): HTMLInputElement {
  const root = hosts()[0]?.shadowRoot;
  if (!root) throw new Error("keine Leiste");
  const label = Array.from(root.querySelectorAll("label")).find(
    (l) => l.textContent === name
  );
  const box = label?.querySelector("input");
  if (!box) throw new Error(`kein Schalter "${name}"`);
  return box;
}

function aufraeumen(): void {
  for (const g of GLOBALS) delete w[g];
  // SEIT SCHEIBE 11.5d-2 AUCH DER HOST DES MODALS: Ein Modal aus einer anderen Testdatei
  // desselben Laufs darf hier nicht stehen bleiben.
  document
    .querySelectorAll("pagesmith-bar, pagesmith-modal")
    .forEach((el) => el.remove());
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
    const out = injectPageViewEmitter(HTML, KEY, "off");
    expect(out).not.toContain(BAR_ID);
    expect(out).toContain('id="__ps_pve"');
  });

  it("L2: Schalter AN -> Gate < Wiederherstellung < Leiste < Setzer < Emitter", () => {
    const out = injectPageViewEmitter(HTML, KEY, "bar");
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
    const block = buildConsentBarScript("load");
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
    const block = buildConsentBarScript("load");
    const mitDaten =
      '<html><body><h1>x</h1><script type="application/json" id="pagesmith-mappings">[]</scr' +
      "ipt></body></html>";
    const out = injectPageViewEmitter(mitDaten, KEY, "bar");
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
  // L5. SEIT SCHEIBE 11.5e-1 DREI KNOEPFE (Freigaben F2 und F6, 2026-09-15), in dieser
  // Reihenfolge. Rot bei jeder geaenderten Beschriftung, Reihenfolge oder Anzahl.
  it("L5: nichts entschieden -> genau eine Leiste mit genau drei Knoepfen, nichts gesendet, Hook abgelehnt", () => {
    const beacon = mount();
    ausklappen();
    expect(hosts()).toHaveLength(1);
    expect(hosts()[0].parentElement).toBe(document.body);
    const root = hosts()[0].shadowRoot;
    expect(root).not.toBeNull();
    const knoepfe = Array.from(root!.querySelectorAll("button"));
    expect(knoepfe.map((b) => b.textContent)).toEqual([
      "Alle akzeptieren",
      "Auswahl speichern",
      "Ablehnen",
    ]);
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
    // POSITIVKONTROLLE der Namens-Suche: der Setzer legt einen an.
    // ER WIRD SEIT SCHEIBE 11.5e-2 UEBER SEINE KENNUNG GESUCHT, NICHT UEBER `idx + 1`:
    // Hinter der Leiste steht seither der Widerruf-Block, und die Kontrolle haette einen
    // anderen Namen gefunden als den erwarteten. Eine Auswahl ueber die POSITION ist eine
    // Positions- statt Namensbindung — genau die Fehlerklasse, die dieses Projekt fuehrt.
    // DER WAECHTER-TEIL DARUEBER IST UNVERAENDERT; gebogen wurde nichts.
    const setzer = scripts.find((s) => s.id === "__ps_cns");
    expect(setzer).toBeTruthy();
    run(setzer!);
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
    expect(traegtOverflow(buildConsentBarScript("load"))).toBe(false);
    // POSITIVKONTROLLE der Suche.
    expect(traegtOverflow("html{overflow:hidden}")).toBe(true);
  });

  // L12b. DER WIRKUNGS-TEST ZUM FOKUS (Scheibe 11.13a, Freigabe E2). ER IST EINE
  // ERWEITERUNG VON L12, KEIN UMBAU: keine bestehende Zusicherung wird aufgeweicht.
  // DIE SACHE, NICHT DAS ZEICHEN: Die Nadeln von M12 sehen `.focus(` im Text und koennen
  // nicht entscheiden, ob das Ziel im eigenen Schattenbaum liegt. Dieser Test fragt die
  // WIRKUNG — nach Aufbau, Ausklappen und Klick liegt der Fokus unveraendert dort, wo die
  // fremde Seite ihn hatte.
  it("L12b: Aufbau, Ausklappen und Klick lassen den Fokus der fremden Seite unberuehrt — mit Positivkontrolle", () => {
    const fremd = document.createElement("input");
    document.body.appendChild(fremd);
    fremd.focus();
    expect(document.activeElement).toBe(fremd);

    mount();
    // DER AUFBAU FASST DEN FOKUS NICHT AN.
    expect(document.activeElement).toBe(fremd);

    // NACH DEM AUSKLAPPEN LIEGT ER IM EIGENEN HOST — Rueckfall (a) der Freigabe E2. DAS IST
    // KEIN FREMDER KNOTEN: `document.activeElement` ist das Host-Element, das dieser Block
    // selbst angelegt hat, und das eigentliche Ziel liegt in seinem Schattenbaum.
    ausklappen();
    const host = hosts()[0];
    expect(document.activeElement).toBe(host);
    expect(host.shadowRoot!.activeElement?.getAttribute("type")).toBe("checkbox");

    // NACH DEM KLICK IST DER HOST WEG; wohin der Fokus dann faellt, entscheidet die
    // Plattform — wir setzen ihn nicht. Gepruefte Sache: es ist KEIN anderes fremdes
    // Element als das, das ihn vorher hatte.
    button("Ablehnen").click();
    expect([fremd, document.body]).toContain(document.activeElement);

    // POSITIVKONTROLLE der Pruefung im selben Lauf: sie unterscheidet wirklich.
    fremd.blur();
    expect(document.activeElement).not.toBe(fremd);
    fremd.remove();
  });
});

describe("11.5d — der Sachtext der Leiste", () => {
  // L13. DIE ERWARTUNG STAMMT AUS DER FREIGABE VON E3 (Architekt/Owner 2026-09-14), NIE
  // AUS DEM CODE: Der Satz steht hier als Literal und wird nicht aus CONSENT_TEXT
  // (consent-choice.ts, bis Scheibe 11.5e-1 CONSENT_BAR_TEXT in consent-bar.ts) gezogen —
  // sonst bestaetigte der Test jede Aenderung am Wortlaut, statt sie zu fangen.
  // WER DEN SATZ AENDERT, BRAUCHT EINE NEUE FREIGABE, und dieser Test wird rot.
  // SEIT SCHEIBE 11.5e-1 ERWEITERT, NICHT AUFGEWEICHT: Die Kinder der Region stehen exakt als
  // Text, Gruppe, drei Knoepfe. Rot bei jedem zusaetzlichen, fehlenden oder umgestellten Kind.
  it("L13: genau ein Sachtext, als ganzer Satz, per textContent, VOR der Gruppe der Schalter und den drei Knoepfen", () => {
    const SATZ =
      "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.";
    mount();
    ausklappen();
    const root = hosts()[0]?.shadowRoot;
    expect(root).toBeTruthy();
    const region = root!.querySelector('[role="region"]');
    expect(region).not.toBeNull();
    const kinder = Array.from(region!.children);
    // Der Text ist das ERSTE Kind, dann die Gruppe der Schalter, dann genau drei Knoepfe.
    expect(kinder.map((k) => k.tagName)).toEqual(["P", "DIV", "BUTTON", "BUTTON", "BUTTON"]);
    expect(kinder[1].getAttribute("role")).toBe("group");
    expect(kinder[1].getAttribute("aria-label")).toBe("Bereiche");
    expect(Array.from(kinder[1].children).map((k) => k.tagName)).toEqual(["LABEL", "LABEL"]);
    expect(kinder[0].textContent).toBe(SATZ);
    // Per textContent, nicht per Markup: Der Absatz traegt keine Kind-Elemente.
    expect(kinder[0].children).toHaveLength(0);
    // Genau einmal in der Leiste — keine Ueberschrift, keine Wiederholung.
    expect(root!.textContent!.split(SATZ).length - 1).toBe(1);
    // POSITIVKONTROLLE der Zaehlung, im selben Lauf: dieselbe Suche trifft einen Knopf.
    expect(root!.textContent!.split("Ablehnen").length - 1).toBe(1);
  });
});

// SCHEIBE 11.5e-1 — DIE AUSWAHL JE GRUPPE. Die Erwartungen stammen aus Entscheidung (25) der
// Phase 11.5, den Setzungen des Zuschnitts der Scheibe 11.5e-1 (Checkbox, beide AUS,
// Zuordnung) und den Freigaben F1 bis F6 vom 2026-09-15 — als Literal, nie aus dem Code.
// Die Speicherwerte folgen der Gestalt `ps1:<zugestimmt>|<abgelehnt>` in der Reihenfolge der
// sechs Schluessel. M16 bis M19 in consent-modal.test.ts spiegeln L15 bis L18.

const NUR_MESSUNG = "ps1:analytics|meta,pinterest,tiktok,linkedin,google";
const NUR_WERBUNG = "ps1:meta,pinterest,tiktok,linkedin,google|analytics";
const WERBUNG = ["meta", "pinterest", "tiktok", "linkedin", "google"];

function hookMit(erlaubt: string[]): Record<string, boolean> {
  return Object.fromEntries(SECHS.map((k) => [k, erlaubt.includes(k)]));
}

describe("11.5e-1 — die zwei Gruppen", () => {
  // G0. BEIDE GRUPPEN LITERAL. ROT BEI JEDEM NEUEN SCHLUESSEL, UND DAS IST GEWOLLT: Die
  // Ableitung in consent-choice.ts schoebe einen neuen Schluessel still in „Werbung";
  // Entscheidung (25) verlangt, dass wer einen Schluessel hinzufuegt, prueft, in welche Gruppe
  // er gehoert. EINZELSTUECK: der einzige Test, der die Zuordnung ohne DOM haelt.
  it("G0: Messung traegt genau analytics, Werbung genau die fuenf Ziel-Schluessel — disjunkt, zusammen die sechs", () => {
    expect(CONSENT_GROUP_KEYS.measure).toEqual(["analytics"]);
    expect(CONSENT_GROUP_KEYS.ads).toEqual(WERBUNG);
    expect([...CONSENT_GROUP_KEYS.measure, ...CONSENT_GROUP_KEYS.ads].sort()).toEqual(
      [...SECHS].sort()
    );
  });
});

describe("11.5e-1 — die Schalter der Leiste", () => {
  // L14. DER WAECHTER DER INVARIANTE I3 DER SCHEIBE 11.5e-1 FUER DIE LEISTE — bis zu dieser
  // Scheibe hatte die Leiste keinen. JEDER Listener, den der Block bindet — an einem Knopf,
  // einem Schalter, der Schattenwurzel oder jedem anderen eigenen Knoten —, ist gebunden,
  // BEVOR der Host an body haengt. Er zaehlt ALLE Ziele, nicht nur Knoepfe: Ein Listener
  // an einem Schalter nach dem Einhaengen faellt ihm genauso auf.
  // EINZELSTUECK fuer die Pflicht-Mutation (ii) der Scheibe 11.5e-1 (ein Listener nach dem
  // Einhaengen, Leiste).
  it("L14: jeder Listener des Blocks ist gebunden, BEVOR der Host an body haengt — Positivkontrolle: die Spione sehen die Aufrufe", () => {
    installBeacon();
    const scripts = scriptsOf(HTML, true);
    const idx = scripts.findIndex((s) => s.id === "__ps_clb");
    expect(idx).toBeGreaterThan(0);
    for (const s of scripts.slice(0, idx)) run(s);

    const fenster = window as unknown as {
      EventTarget: { prototype: { addEventListener: (...a: unknown[]) => unknown } };
      Node: { prototype: { appendChild: (...a: unknown[]) => unknown } };
    };
    const protoEvent = fenster.EventTarget.prototype;
    const protoNode = fenster.Node.prototype;
    const origAdd = protoEvent.addEventListener;
    const origAppend = protoNode.appendChild;
    const log: Array<{ art: "listener" | "anhaengen"; ziel: unknown; kind: unknown }> = [];
    protoEvent.addEventListener = function (this: unknown, ...a: unknown[]) {
      log.push({ art: "listener", ziel: this, kind: a[0] });
      return origAdd.apply(this, a);
    };
    protoNode.appendChild = function (this: unknown, ...a: unknown[]) {
      log.push({ art: "anhaengen", ziel: this, kind: a[0] });
      return origAppend.apply(this, a);
    };
    try {
      run(scripts[idx]);
    } finally {
      protoEvent.addEventListener = origAdd;
      protoNode.appendChild = origAppend;
    }

    const listener = log.map((e, i) => ({ ...e, i })).filter((e) => e.art === "listener");
    const anBody = log
      .map((e, i) => ({ ...e, i }))
      .filter((e) => e.art === "anhaengen" && e.ziel === document.body);

    // POSITIVKONTROLLE: die Spione sehen die Aufrufe des Blocks — die Knoepfe.
    // SEIT SCHEIBE 11.13a SIND ES VIER: die drei des ausgeklappten Zustands PLUS der Weg.
    // "Auswahl speichern" ist eingeklappt NICHT eingehaengt und trotzdem schon verdrahtet —
    // genau das ist Invariante I3 am Wortlaut.
    const knopfListener = listener.filter(
      (e) => (e.ziel as Element | null)?.tagName === "BUTTON"
    );
    expect(knopfListener.length).toBeGreaterThanOrEqual(4);
    expect(
      knopfListener.some(
        (e) => (e.ziel as Element | null)?.textContent === "Einstellungen"
      )
    ).toBe(true);
    expect(anBody).toHaveLength(1);
    expect((anBody[0].kind as Element).tagName).toBe("PAGESMITH-BAR");
    expect(hosts()).toHaveLength(1);

    for (const l of listener) expect(l.i).toBeLessThan(anBody[0].i);
  });

  // L15. DIE GESTALT DER SCHALTER. Beide starten AUS — ohne checked-Attribut und ohne
  // Zuweisung (Setzung des Zuschnitts: eine Vorauswahl waere eine vorweggenommene Zustimmung).
  it("L15: eine Gruppe 'Bereiche' mit zwei Schaltern 'Messung' und 'Werbung', je Checkbox im label, beide AUS, genau zwei Eingabeelemente", () => {
    mount();
    ausklappen();
    const root = hosts()[0].shadowRoot!;
    const gruppe = root.querySelector('[role="group"]');
    expect(gruppe).not.toBeNull();
    expect(gruppe!.getAttribute("aria-label")).toBe("Bereiche");
    const labels = Array.from(gruppe!.children);
    expect(labels.map((l) => l.tagName)).toEqual(["LABEL", "LABEL"]);
    expect(labels.map((l) => l.textContent)).toEqual(["Messung", "Werbung"]);
    for (const l of labels) {
      expect(Array.from(l.children).map((k) => k.tagName)).toEqual(["INPUT", "SPAN"]);
      const box = l.children[0] as HTMLInputElement;
      expect(box.getAttribute("type")).toBe("checkbox");
      expect(box.hasAttribute("checked")).toBe(false);
      expect(box.checked).toBe(false);
    }
    expect(root.querySelectorAll("input")).toHaveLength(2);
  });

  // L16. „AUSWAHL SPEICHERN" JE AUSWAHL. Die Gruppe wird vor write() in Einzelschluessel
  // aufgeloest; KEIN GRUPPENNAME ERREICHT SPEICHER ODER HOOK (Invariante I4 der Scheibe
  // 11.5e-1). Der Klick geht an die Checkbox selbst — der produktive Weg —, und ihr Zustand
  // danach ist die Positivkontrolle. Seitenaufruf nur, wenn Messung erlaubt ist.
  const AUSWAHL: Array<[string, string[], string, string[], number]> = [
    ["keine", [], ALLE_ABGELEHNT, [], 0],
    ["nur Messung", ["Messung"], NUR_MESSUNG, ["analytics"], 1],
    ["nur Werbung", ["Werbung"], NUR_WERBUNG, WERBUNG, 0],
    ["beide", ["Messung", "Werbung"], ALLE_ZUGESTIMMT, SECHS, 1],
  ];
  for (const [fall, klicks, speicher, erlaubt, beacons] of AUSWAHL) {
    it(`L16: '${fall}' + 'Auswahl speichern' -> Speicherwert und Hook je Schluessel, ${beacons} Seitenaufruf(e), Leiste weg`, async () => {
      const beacon = mount();
      ausklappen();
      for (const name of ["Messung", "Werbung"]) expect(schalter(name).checked).toBe(false);
      for (const name of klicks) {
        schalter(name).click();
        expect(schalter(name).checked).toBe(true);
      }

      button("Auswahl speichern").click();

      expect(window.localStorage.getItem(STORE_KEY)).toBe(speicher);
      expect(w.pagesmithConsent).toEqual(hookMit(erlaubt));
      expect(beacon).toHaveBeenCalledTimes(beacons);
      if (beacons === 1) {
        const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
        expect(JSON.parse(await blob.text()).event).toBe("__ps_pageview");
      }
      expect(hosts()).toHaveLength(0);
      // I4: kein Gruppenname im Speicher.
      for (const gruppe of ["Messung", "Werbung"]) {
        expect(window.localStorage.getItem(STORE_KEY)).not.toContain(gruppe);
      }
    });
  }

  // L17. DIE ZWEI FESTEN KNOEPFE LESEN DIE SCHALTER NICHT: „Ablehnen" lehnt auch bei
  // gewaehlter Werbung alles ab, „Alle akzeptieren" stimmt auch bei nur gewaehlter Messung
  // allem zu.
  it("L17: 'Ablehnen' und 'Alle akzeptieren' ignorieren den Zustand der Schalter", () => {
    mount();
    ausklappen();
    schalter("Werbung").click();
    expect(schalter("Werbung").checked).toBe(true);
    button("Ablehnen").click();
    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ABGELEHNT);
    expect(w.pagesmithConsent).toEqual(hookAus(false));

    aufraeumen();
    window.localStorage.clear();
    mount();
    ausklappen();
    schalter("Messung").click();
    expect(schalter("Messung").checked).toBe(true);
    button("Alle akzeptieren").click();
    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ZUGESTIMMT);
    expect(w.pagesmithConsent).toEqual(hookAus(true));
  });

  // L18. DER ZUGAENGLICHE NAME KOMMT AUS DEM label, NICHT AUS EINEM id: Ein Klick auf den
  // Text schaltet die Checkbox. Nur so lange aussagekraeftig, wie jsdom die
  // Label-Aktivierung im Schattenbaum ausfuehrt — GEMESSEN im Bau der Scheibe 11.5e-1.
  it("L18: ein Klick auf die Beschriftung 'Messung' schaltet ihre Checkbox", () => {
    mount();
    ausklappen();
    const root = hosts()[0].shadowRoot!;
    const text = Array.from(root.querySelectorAll("span")).find(
      (s) => s.textContent === "Messung"
    );
    expect(text).toBeTruthy();
    expect(schalter("Messung").checked).toBe(false);
    text!.click();
    expect(schalter("Messung").checked).toBe(true);
    // POSITIVKONTROLLE: der andere Schalter bleibt unberuehrt.
    expect(schalter("Werbung").checked).toBe(false);
  });
});

// SCHEIBE 11.13a — DIE ANORDNUNG. Die Erwartungen stammen aus Entscheidung P11.13-1 der
// Phase 11.13 (docs/aktiver-stand.md), NIE aus dem Code: die zwei sichtbaren Knoepfe, ihre
// Reihenfolge, die Beschriftung des Wegs und die Abwesenheit von Schaltern und
// "Auswahl speichern" stehen hier als Literal.
describe("11.13a — die Anordnung", () => {
  // L23. `preventScroll` AM FOKUS-AUFRUF — EINE STRUKTUR-ZUSICHERUNG UEBER DEN
  // AUSGELIEFERTEN TEXT, KEINE WIRKUNGS-ZUSICHERUNG: Die Testumgebung scrollt nicht
  // (docs/immer-beachten.md, DIE TESTUMGEBUNG WERTET KEIN CSS AUS — hier dieselbe Grenze an
  // der Scroll-Achse). GEPRUEFT WIRD, DASS DIE OPTION AM AUFRUF STEHT.
  // WARUM SIE PFLICHT IST: Ohne sie scrollt der Browser das Ziel bei Bedarf in den
  // Sichtbereich und aendert damit die SCROLL-POSITION der fremden Seite — genau das
  // verbietet Invariante I1. Dass sie WIRKT, ist eine Live-Achse und in der Probe gemessen.
  it("L23: der Fokus-Aufruf traegt preventScroll — Struktur-Zusicherung mit Positivkontrolle", () => {
    const block = buildConsentBarScript("load");
    expect(block).toContain("measure.box.focus({ preventScroll: true })");
    // POSITIVKONTROLLE der Suche im selben Lauf: der blosse Aufruf kommt NICHT vor.
    expect(/measure\.box\.focus\(\)/.test(block)).toBe(false);
    expect(/measure\.box\.focus\(\)/.test("measure.box.focus()")).toBe(true);
    // DIE VERENGTE NADEL AUS M12/W11 TRIFFT DIE NEUE FORM WEITERHIN NICHT.
    const NADEL = /(?<!measure\.box)\.focus\(|\.blur\(|autofocus|tabindex/i;
    expect(NADEL.test("measure.box.focus({ preventScroll: true })")).toBe(false);
    expect(NADEL.test("document.body.focus()")).toBe(true);
  });

  // L19. DER EINGEKLAPPTE ZUSTAND. Rot bei jedem zusaetzlichen, fehlenden oder
  // umgestellten Kind, bei jedem Kaestchen und bei "Auswahl speichern".
  it("L19: eingeklappt stehen Text, 'Alle akzeptieren', 'Ablehnen' und der Weg — keine Schalter, kein 'Auswahl speichern'", () => {
    mount();
    const root = hosts()[0].shadowRoot!;
    const region = root.querySelector('[role="region"]')!;
    expect(Array.from(region.children).map((k) => k.tagName)).toEqual([
      "P",
      "BUTTON",
      "BUTTON",
      "BUTTON",
    ]);
    expect(
      Array.from(root.querySelectorAll("button")).map((b) => b.textContent)
    ).toEqual(["Alle akzeptieren", "Ablehnen", "Einstellungen"]);
    expect(root.querySelectorAll("input")).toHaveLength(0);
    expect(root.querySelector('[role="group"]')).toBeNull();
    // POSITIVKONTROLLE der Abwesenheits-Behauptungen im selben Lauf: ausgeklappt sind sie da.
    ausklappen();
    expect(root.querySelectorAll("input")).toHaveLength(2);
    expect(root.querySelector('[role="group"]')).not.toBeNull();
  });

  // L20. DER WEG ENTFERNT SICH, UND ES GIBT KEIN ZURUECK (Entscheidung P11.13-1).
  it("L20: nach dem Klick ist der Weg verschwunden und die Knoepfe sind die drei von vorher", () => {
    mount();
    ausklappen();
    const root = hosts()[0].shadowRoot!;
    expect(
      Array.from(root.querySelectorAll("button")).map((b) => b.textContent)
    ).toEqual(["Alle akzeptieren", "Auswahl speichern", "Ablehnen"]);
    expect(
      Array.from(root.querySelectorAll("button")).some(
        (b) => b.textContent === "Einstellungen"
      )
    ).toBe(false);
  });

  // L21. DER WEG IST EIN KNOPF, KEIN LINK (Entscheidung P11.13-1): Ein `a href` aenderte
  // Fragment und Scroll-Position der fremden Seite.
  it("L21: der Weg ist ein <button type='button'>; der Rumpf traegt kein Link-Element und kein href", () => {
    mount();
    const weg = button("Einstellungen");
    expect(weg.tagName).toBe("BUTTON");
    expect(weg.getAttribute("type")).toBe("button");
    expect(weg.getAttribute("class")).toBe("way");

    const block = buildConsentBarScript("load");
    expect(/href/i.test(block)).toBe(false);
    expect(/createElement\("a"\)/.test(block)).toBe(false);
    // POSITIVKONTROLLE beider Suchen im selben Lauf.
    expect(/href/i.test('a.setAttribute("href", "#")')).toBe(true);
    expect(/createElement\("a"\)/.test('document.createElement("a")')).toBe(true);
  });

  // L22. DER OFFENE PUNKT "KEIN TEST LAESST EINEN WURF BIS IN EINEN KNOPF-HANDLER DER
  // EINWILLIGUNGS-OBERFLAECHEN DURCH" (docs/offene-punkte.md) — sein Trigger ist mit dieser
  // Scheibe eingetreten, weil sie CONSENT_CHOICE_JS anfasst.
  // IN JSDOM ERREICHT EIN WURF AUS EINEM LISTENER `dispatchEvent` NICHT; er geht an das
  // error-Ereignis des Fensters. Genau dort wird er gefangen und ERWARTET.
  it("L22: wirft write(), schliesst die Leiste trotzdem — und der Wurf ist wirklich einer (Positivkontrolle)", () => {
    const fehler: string[] = [];
    const sammeln = (e: ErrorEvent): void => {
      fehler.push(String(e.message));
      e.preventDefault();
    };
    window.addEventListener("error", sammeln);
    try {
      mount();
      ausklappen();
      const api = w.__psConsentStore as { write: unknown };
      api.write = () => {
        throw new Error("probe-wurf");
      };
      button("Ablehnen").click();
      expect(hosts()).toHaveLength(0);
      expect(fehler.join(" ")).toContain("probe-wurf");

      // POSITIVKONTROLLE: ohne Wurf schliesst derselbe Klick ebenso, und nichts wird
      // gemeldet — der Sammler unterscheidet die zwei Faelle.
      aufraeumen();
      window.localStorage.clear();
      fehler.length = 0;
      mount();
      ausklappen();
      button("Ablehnen").click();
      expect(hosts()).toHaveLength(0);
      expect(fehler).toEqual([]);
      expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ABGELEHNT);
    } finally {
      window.removeEventListener("error", sammeln);
    }
  });
});
