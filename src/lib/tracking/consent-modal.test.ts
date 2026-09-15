import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import type { ConsentDialog } from "@/lib/settings";
import { buildConsentBarScript } from "./consent-bar";
import { buildConsentModalScript } from "./consent-modal";

// SCHEIBE 11.5d-2 — DAS CENTER-MODAL.
//
// DIE ERWARTUNGEN STAMMEN AUS DEM ZUSCHNITT UND DEM FREIGEGEBENEN BAU-PLAN, NIE AUS DEM
// CODE: Host-Name und Kennung (`pagesmith-modal`, `__ps_cmo`), der zugaengliche Name,
// die zwei Beschriftungen, der Sachtext, der Speicher-Schluessel, die sechs
// Einwilligungs-Schluessel und die Nadel-Listen stehen hier als Literal.
//
// DER HARNESS IST DER VON consent-bar.test.ts: Dokument ueber injectPageViewEmitter bauen,
// per DOMParser zerlegen, alle Scripts in Dokumentreihenfolge im globalen Fenster
// auswerten. M5 bis M11 spiegeln L5 bis L11 — dieselben Bedingungen, dieselben Knoepfe,
// ein anderer Block.
//
// WAS HIER NICHT GEPRUEFT WERDEN KANN, UND KEIN TEST BEHAUPTET ES: Sichtbarkeit, Lage,
// Abdunkelung als Bild, Verdeckung, ob die Abdunkelung im Browser Klicks faengt, ob die
// Knoepfe auf einem niedrigen Fenster erreichbar sind, Scroll-Position und Fokus. Die
// Testumgebung wertet kein CSS aus und hat kein Layout (docs/immer-beachten.md, "DIE
// TESTUMGEBUNG WERTET KEIN CSS AUS"). Geprueft wird STRUKTUR und WIRKUNG am DOM:
// Anwesenheit, Anzahl, Text, Attribute, Speicherwert, Hook, Beacons, Aufrufreihenfolge.
//
// HYGIENE: Die Bloecke setzen ihre Globals selbst, der Guard __ps_pv ueberlebt jeden Test,
// und Leiste wie Modal haengen ein Element an das Testdokument. beforeEach und afterEach
// raeumen alle drei ab; M0 haelt das Aufraeumen des DOM.

const HOST = "pagesmith-modal";
const MODAL_ID = 'id="__ps_cmo"';
const HTML = "<html><body><h1>nur Text</h1></body></html>";
const KEY = "tk-modal-11-5d-2";
const STORE_KEY = "__ps_consent";
const SECHS = ["meta", "pinterest", "tiktok", "linkedin", "google", "analytics"];
const ALLE_ZUGESTIMMT = "ps1:meta,pinterest,tiktok,linkedin,google,analytics|";
const ALLE_ABGELEHNT = "ps1:|meta,pinterest,tiktok,linkedin,google,analytics";
const SATZ =
  "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.";
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

function scriptsOf(html: string, form: ConsentDialog): Element[] {
  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(html, KEY, form),
    "text/html"
  );
  return Array.from(doc.querySelectorAll("script"));
}

function run(script: Element): void {
  w.eval(script.textContent ?? "");
}

/** Das ganze Dokument mit dem Modal in Reihenfolge ausfuehren. */
function mount(): BeaconSpy {
  const beacon = installBeacon();
  for (const s of scriptsOf(HTML, "modal")) run(s);
  return beacon;
}

function hosts(): NodeListOf<Element> {
  return document.querySelectorAll(HOST);
}

function shadow(): ShadowRoot {
  const root = hosts()[0]?.shadowRoot;
  if (!root) throw new Error("kein Modal");
  return root;
}

function button(label: string): HTMLButtonElement {
  const b = Array.from(shadow().querySelectorAll("button")).find(
    (x) => x.textContent === label
  );
  if (!b) throw new Error(`kein Knopf "${label}"`);
  return b;
}

function aufraeumen(): void {
  for (const g of GLOBALS) delete w[g];
  document
    .querySelectorAll("pagesmith-bar, pagesmith-modal")
    .forEach((el) => el.remove());
}

/** Der Block-Rumpf ohne das umschliessende Script-Tag. */
function rumpf(block: string): string {
  return block.slice(block.indexOf(">") + 1, block.lastIndexOf("<"));
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

describe("11.5d-2 — Injektion und Gestalt des Blocks", () => {
  // M0. DER HYGIENE-WAECHTER, Spiegel von L0.
  it("M0: vor dem Test steht kein Host im Dokument, und das Aufraeumen trifft wirklich (Positivkontrolle)", () => {
    expect(hosts()).toHaveLength(0);
    mount();
    expect(hosts()).toHaveLength(1);
    aufraeumen();
    expect(hosts()).toHaveLength(0);
  });

  it("M1: 'off' -> kein Modal-Block (Positivkontrolle: Emitter da)", () => {
    const out = injectPageViewEmitter(HTML, KEY, "off");
    expect(out).not.toContain(MODAL_ID);
    expect(out).toContain('id="__ps_pve"');
  });

  // M1b. LEISTE UND MODAL SCHLIESSEN EINANDER AUS — in beide Richtungen, je mit der
  // Anwesenheit des eigenen Blocks als Positivkontrolle.
  it("M1b: 'bar' -> kein Modal-Block; 'modal' -> kein Leisten-Block", () => {
    const leiste = injectPageViewEmitter(HTML, KEY, "bar");
    expect(leiste).toContain('id="__ps_clb"');
    expect(leiste).not.toContain(MODAL_ID);

    const modal = injectPageViewEmitter(HTML, KEY, "modal");
    expect(modal).toContain(MODAL_ID);
    expect(modal).not.toContain('id="__ps_clb"');
  });

  it("M2: 'modal' -> Gate < Wiederherstellung < Modal < Setzer < Emitter", () => {
    const out = injectPageViewEmitter(HTML, KEY, "modal");
    const gate = out.indexOf('id="pagesmith-consent"');
    const restore = out.indexOf('id="__ps_cnr"');
    const modal = out.indexOf(MODAL_ID);
    const setter = out.indexOf('id="__ps_cns"');
    const pve = out.indexOf('id="__ps_pve"');
    expect(gate).toBeGreaterThan(-1);
    expect(gate).toBeLessThan(restore);
    expect(restore).toBeLessThan(modal);
    expect(modal).toBeLessThan(setter);
    expect(setter).toBeLessThan(pve);
  });

  // M3. DER SERIALISIERUNGS-WAECHTER DIESES BLOCKS, Spiegel von L3: KEIN `<` im Rumpf.
  it("M3: der Rumpf enthaelt kein '<'; genau ein </script>, kein </body>", () => {
    const block = buildConsentModalScript();
    const r = rumpf(block);
    // POSITIVKONTROLLE des Ausschnitts: er traegt wirklich den Code.
    expect(r).toContain("attachShadow");
    expect(r.includes("<")).toBe(false);
    // POSITIVKONTROLLE der Suche, im selben Lauf: am ganzen Block trifft sie die Tags.
    expect(block.includes("<")).toBe(true);
    expect(block.match(/<\/script>/gi)?.length).toBe(1);
    expect(block.endsWith("</script>")).toBe(true);
    expect(block.toLowerCase()).not.toContain("</body>");
  });

  // M4. DIE NADEL-LISTE DER LEISTE PLUS IHRE EIGENEN KENNUNGEN — seit 11.5d sucht der
  // Bestand auch nach `__ps_clb` (L1, L2, L8, L12, P2, P2b, P3). Und in der GEGENRICHTUNG:
  // Der Leisten-Block traegt die Kennungen des Modals nicht, denn M1b und P2 suchen sie.
  it("M4: der Block traegt keine der Zeichenketten, nach denen der Bestand sucht — und umgekehrt", () => {
    const block = buildConsentModalScript();
    const mitDaten =
      '<html><body><h1>x</h1><script type="application/json" id="pagesmith-mappings">[]</scr' +
      "ipt></body></html>";
    const outModal = injectPageViewEmitter(mitDaten, KEY, "modal");
    for (const nadel of [
      "pagesmith-consent",
      "pagesmith-mappings",
      "__ps_cnr",
      "__ps_cns",
      "__ps_pv",
    ]) {
      expect(block).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im ausgelieferten Text.
      expect(outModal).toContain(nadel);
    }
    const outLeiste = injectPageViewEmitter(mitDaten, KEY, "bar");
    for (const nadel of ["__ps_clb", "pagesmith-bar"]) {
      expect(block).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im Text mit der Leiste.
      expect(outLeiste).toContain(nadel);
    }
    const leistenBlock = buildConsentBarScript();
    for (const nadel of ["__ps_cmo", "pagesmith-modal"]) {
      expect(leistenBlock).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im Text mit dem Modal.
      expect(outModal).toContain(nadel);
    }
  });
});

describe("11.5d-2 — wann das Modal erscheint", () => {
  it("M5: nichts entschieden -> genau ein Modal: Abdunkelung und Fenster im Schattenbaum, Sachtext und zwei Knoepfe, nichts gesendet, Hook abgelehnt", () => {
    const beacon = mount();
    expect(hosts()).toHaveLength(1);
    expect(hosts()[0].parentElement).toBe(document.body);
    const root = shadow();
    // Die Abdunkelung liegt IM Schattenbaum und traegt nichts.
    const abdunkelung = root.querySelector(".backdrop");
    expect(abdunkelung).not.toBeNull();
    expect(abdunkelung!.children).toHaveLength(0);
    // Das Fenster: zugaenglicher Name, KEIN aria-modal.
    const fenster = root.querySelector('[role="dialog"]');
    expect(fenster).not.toBeNull();
    expect(fenster!.getAttribute("aria-label")).toBe("Einwilligung");
    expect(fenster!.hasAttribute("aria-modal")).toBe(false);
    const kinder = Array.from(fenster!.children);
    expect(kinder.map((k) => k.tagName)).toEqual(["P", "BUTTON", "BUTTON"]);
    expect(kinder[0].textContent).toBe(SATZ);
    expect(kinder[0].children).toHaveLength(0);
    const knoepfe = kinder.slice(1) as HTMLButtonElement[];
    expect(knoepfe.map((b) => b.textContent)).toEqual(["Alle akzeptieren", "Ablehnen"]);
    for (const b of knoepfe) expect(b.getAttribute("type")).toBe("button");
    expect(beacon).not.toHaveBeenCalled();
    // Der Setzer lief NACH dem Modal und hat abgelehnt.
    expect(w.pagesmithConsent).toEqual(hookAus(false));
  });

  // M6. DER EINZIGE TEST, DER DIE HOOK-BEDINGUNG DES MODALS FAENGT — Spiegel von L6.
  it("M6: ein vorab gesetzter fremder Hook -> kein Modal; ohne ihn -> Modal (Positivkontrolle im selben Lauf)", () => {
    const fremd = { meta: true };
    w.pagesmithConsent = fremd;
    mount();
    expect(hosts()).toHaveLength(0);
    expect(w.pagesmithConsent).toBe(fremd);

    aufraeumen();
    mount();
    expect(hosts()).toHaveLength(1);
  });

  it("M7: eine gespeicherte Entscheidung -> kein Modal; Speicher geleert -> Modal (Positivkontrolle im selben Lauf)", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ABGELEHNT);
    mount();
    expect(hosts()).toHaveLength(0);
    expect(w.pagesmithConsent).toEqual(hookAus(false));

    aufraeumen();
    window.localStorage.clear();
    mount();
    expect(hosts()).toHaveLength(1);
  });

  // M8. KONSTRUIERT, aus demselben Grund wie L8: Auf dem produktiven Pfad ist die
  // read()-Bedingung hinter der Wiederherstellung redundant. DER EINZIGE TEST, DER SIE IM
  // MODAL FAENGT.
  it("M8 (konstruiert): Speicher entschieden, Hook von Hand geloescht -> kein Modal; Speicher leer -> Modal", () => {
    const vorDemModal = (): void => {
      const scripts = scriptsOf(HTML, "modal");
      const idx = scripts.findIndex((s) => s.id === "__ps_cmo");
      expect(idx).toBeGreaterThan(0);
      for (const s of scripts.slice(0, idx)) run(s);
      delete w.pagesmithConsent;
      run(scripts[idx]);
    };

    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    vorDemModal();
    expect(hosts()).toHaveLength(0);

    aufraeumen();
    window.localStorage.clear();
    vorDemModal();
    expect(hosts()).toHaveLength(1);
  });
});

describe("11.5d-2 — die zwei Knoepfe", () => {
  it("M9: 'Alle akzeptieren' -> alle sechs gespeichert, Hook frei, genau ein Seitenaufruf, Modal weg", async () => {
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

  it("M10: 'Ablehnen' -> alle sechs abgelehnt gespeichert, Hook abgelehnt, nichts gesendet, Modal weg", () => {
    const beacon = mount();
    expect(hosts()).toHaveLength(1);

    button("Ablehnen").click();

    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ABGELEHNT);
    expect(w.pagesmithConsent).toEqual(hookAus(false));
    expect(beacon).not.toHaveBeenCalled();
    expect(hosts()).toHaveLength(0);
  });

  // M11. Spiegel von L11 — und fuer das Modal schaerfer: Bliebe es bei write() === false
  // offen, fing die Abdunkelung weiter jeden Klick.
  it("M11: der Speicher wirft -> Modal schliesst trotzdem, nichts gespeichert, nichts gesendet; beim naechsten Laden wieder da", () => {
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

function attribute(el: Element): string {
  return Array.from(el.attributes)
    .map((a) => `${a.name}=${a.value}`)
    .join(";");
}

// DER AUSGANGSZUSTAND BEIM LADEN DER DATEI, VOR JEDEM TEST. M12 haelt sein "vorher" dagegen:
// Haette ein frueherer Test dieser Datei ein Attribut an html oder body hinterlassen, saehe
// der Strukturteil von M12 sonst einen schon veraenderten Zustand als Ausgang und bliebe
// gruen, obwohl der Block ihn veraendert hat.
const HTML_ATTR_START = attribute(document.documentElement);
const BODY_ATTR_START = attribute(document.body);

describe("11.5d-2 — das Modal fasst keinen fremden Knoten an", () => {
  /** style- und Stylesheet-Elemente AUSSERHALB jedes Schattenbaums. */
  function stilElemente(): number {
    return document.querySelectorAll('style, link[rel~="stylesheet"]').length;
  }

  // M12. DER WAECHTER DER INVARIANTE I1 (keine Scroll-Sperre, nichts an html/body/head).
  //
  // WAS ER SIEHT: (1) die STRUKTUR ausserhalb des Schattenbaums — Attribute an `html` und
  // `body` vorher, nach dem Aufbau und nach dem Klick; die Zahl der `style`- und
  // Stylesheet-Elemente ausserhalb des Schattenbaums; die Zahl der Kinder im `head`; neue
  // globale Namen. (2) REFERENZEN IM BLOCKTEXT — Nadeln, ueber die der Block einen
  // fremden Knoten erreichen oder Stil, Klasse, Scroll oder Fokus aendern koennte.
  // WAS ER NICHT SIEHT: eine Scroll-Position (kein Layout), und er prueft den Fokus NICHT —
  // die Nadel sucht nur nach dem Aufruf im Text; eine Aussage darueber, was jsdom beim
  // Fokus tut, trifft dieser Test nicht. Und ein Eingriff, der ueber einen Namen geht, den
  // keine Nadel kennt, entgeht dem Textteil; der Strukturteil sieht ihn nur, wenn er sich
  // an den genannten Stellen niederschlaegt.
  // WARUM ANDERS ALS L12: L12 verbietet das Wort `overflow` im Leisten-Block. Das Modal
  // DARF `overflow` und `max-height` im EIGENEN Schattenbaum tragen (Invariante I1,
  // ARCHITEKT-ENTSCHEIDUNG 2026-09-15) — sonst laegen die Knoepfe auf einem niedrigen
  // Bildschirm unerreichbar. Dieser Waechter prueft deshalb den Eingriff an einem fremden
  // Knoten statt des Wortes. Zwei Formen auf derselben Achse sind Absicht; L12 bleibt.
  // EINZELSTUECK fuer zwei Pflicht-Mutationen des Bau-Plans: ein Attribut an body setzen
  // (ohne `overflow`) und `document.body.style.overflow = "hidden"` — beide fing allein
  // dieser Test (Scheibe 11.5d-2, gemessen).
  it("M12: nichts an html/body/head, kein Stil ausserhalb, kein globaler Name, keine Nadel im Block — jeweils mit Positivkontrolle", () => {
    const htmlVorher = attribute(document.documentElement);
    const bodyVorher = attribute(document.body);
    const headVorher = document.head.children.length;
    const stilVorher = stilElemente();
    // Kein frueherer Test dieser Datei hat html oder body veraendert.
    expect(htmlVorher).toBe(HTML_ATTR_START);
    expect(bodyVorher).toBe(BODY_ATTR_START);

    // POSITIVKONTROLLE der Attribut-Kette: ein Stil an body aendert sie.
    document.body.style.color = "red";
    expect(attribute(document.body)).not.toBe(bodyVorher);
    document.body.removeAttribute("style");
    expect(attribute(document.body)).toBe(bodyVorher);
    // POSITIVKONTROLLE der Stil-Zaehlung: ein style-Element ausserhalb zaehlt.
    const probe = document.createElement("style");
    document.body.appendChild(probe);
    expect(stilElemente()).toBe(stilVorher + 1);
    probe.remove();
    expect(stilElemente()).toBe(stilVorher);

    // GLOBALE NAMEN: die Bloecke VOR dem Modal laufen lassen, dann nur das Modal.
    installBeacon();
    const scripts = scriptsOf(HTML, "modal");
    const idx = scripts.findIndex((s) => s.id === "__ps_cmo");
    expect(idx).toBeGreaterThan(0);
    for (const s of scripts.slice(0, idx)) run(s);
    const namenVorher = new Set(Object.keys(window));
    run(scripts[idx]);
    expect(Object.keys(window).filter((k) => !namenVorher.has(k))).toEqual([]);
    expect(hosts()).toHaveLength(1);
    // POSITIVKONTROLLE der Namens-Suche: der Setzer danach legt einen an.
    run(scripts[idx + 1]);
    expect(Object.keys(window).filter((k) => !namenVorher.has(k))).toContain(
      "pagesmithConsent"
    );

    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);
    expect(stilElemente()).toBe(stilVorher);

    button("Ablehnen").click();
    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);
    expect(stilElemente()).toBe(stilVorher);

    // DIE NADELN — STRENG: lieber ein Fehlalarm, den jemand prueft, als ein Durchlassen.
    // Jede mit einem Beispiel, das sie treffen MUSS.
    const block = buildConsentModalScript();
    const NADELN: Array<[RegExp, string]> = [
      [/documentElement/, "document.documentElement.setAttribute('x', '1')"],
      [/document\.head/, "document.head.appendChild(s)"],
      [/document\.body\./, "document.body.style.overflow = 'hidden'"],
      [/\bbody\.(?!appendChild\(host\))/, "body.setAttribute('data-x', '1')"],
      [/\.style\b/, "el.style.overflow = 'hidden'"],
      [/classList|className/, "el.classList.add('x')"],
      [/scroll/i, "window.scrollTo(0, 0)"],
      [/\.focus\(|\.blur\(|autofocus|tabindex/i, "b.focus()"],
      [/querySelector|getElementsBy|getElementById/, "document.querySelector('html')"],
      [/(?<!host)\.parentNode/, "el.parentNode.removeChild(el)"],
    ];
    for (const [nadel, beispiel] of NADELN) {
      expect(nadel.test(block), String(nadel)).toBe(false);
      // POSITIVKONTROLLE der Nadel.
      expect(nadel.test(beispiel), String(nadel)).toBe(true);
    }
    // DIE ZWEI ERLAUBTEN STELLEN treffen die engen Nadeln nicht — sonst waere der Block
    // oben aus dem falschen Grund rot, nicht gruen.
    expect(/\bbody\.(?!appendChild\(host\))/.test("body.appendChild(host)")).toBe(false);
    expect(/(?<!host)\.parentNode/.test("host.parentNode.removeChild(host)")).toBe(false);
  });

  // M13. DER WAECHTER DER INVARIANTE I2: Die EINZIGE Ruecknahme ist das Entfernen des Hosts
  // im finally der Knopf-Handler. EINZELSTUECK fuer die Pflicht-Mutation "ein Listener an
  // der Abdunkelung, der den Host entfernt" — allein dieser Test fing sie (gemessen).
  it("M13: ein Klick auf die Abdunkelung und ein Escape schliessen NICHT, speichern nichts, senden nichts — ein Knopf schliesst (Positivkontrolle)", () => {
    const beacon = mount();
    // DER HOST WIRD VOR DEM KLICK GEHALTEN: Schliesst ein zweiter Weg das Modal, soll das
    // Rot an der Zaehlung unten stehen und nicht als Wurf beim naechsten Zugriff.
    const host = hosts()[0];
    const abdunkelung = shadow().querySelector(".backdrop") as HTMLElement | null;
    expect(abdunkelung).not.toBeNull();

    abdunkelung!.click();
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    host.dispatchEvent(
      new KeyboardEvent("keydown", { key: "Escape", bubbles: true, composed: true })
    );

    expect(hosts()).toHaveLength(1);
    expect(window.localStorage.getItem(STORE_KEY)).toBeNull();
    expect(beacon).not.toHaveBeenCalled();
    expect(w.pagesmithConsent).toEqual(hookAus(false));

    // POSITIVKONTROLLE im selben Lauf: derselbe Aufbau schliesst ueber einen Knopf.
    button("Ablehnen").click();
    expect(hosts()).toHaveLength(0);
  });

  // M14. DER WAECHTER DER INVARIANTE I3: `body.appendChild(host)` kommt NACH allen Listenern
  // an den Knoepfen. Die Spione liegen an den Prototypen DESSELBEN Fensters, in dem
  // window.eval den Block ausfuehrt. EINZELSTUECK fuer die Pflicht-Mutation
  // "body.appendChild(host) vor der Erzeugung der Knoepfe" — allein dieser Test fing sie
  // (gemessen).
  it("M14: alle Listener an den Knoepfen sind gebunden, BEVOR der Host an body haengt — Positivkontrolle: die Spione sehen die Aufrufe", () => {
    installBeacon();
    const scripts = scriptsOf(HTML, "modal");
    const idx = scripts.findIndex((s) => s.id === "__ps_cmo");
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

    const knopfListener = log
      .map((e, i) => ({ ...e, i }))
      .filter(
        (e) => e.art === "listener" && (e.ziel as Element | null)?.tagName === "BUTTON"
      );
    const anBody = log
      .map((e, i) => ({ ...e, i }))
      .filter((e) => e.art === "anhaengen" && e.ziel === document.body);

    // POSITIVKONTROLLE: die Spione sehen die Aufrufe des Blocks.
    expect(knopfListener.length).toBeGreaterThanOrEqual(2);
    expect(anBody).toHaveLength(1);
    expect((anBody[0].kind as Element).tagName).toBe("PAGESMITH-MODAL");
    expect(hosts()).toHaveLength(1);

    for (const l of knopfListener) expect(l.i).toBeLessThan(anBody[0].i);
  });

  // M15. DIE ZWEI WACH-ZEILEN STEHEN IN BEIDEN BLOECKEN ZEICHENGLEICH. Wer eine Seite
  // aendert, macht diesen Test rot — die Begruendung beider Bedingungen steht einmal, am
  // Docblock von buildConsentBarScript, und gilt nur, solange beide dasselbe pruefen.
  it("M15: Leisten- und Modal-Block tragen die Hook- und die read()-Bedingung zeichengleich, je genau einmal", () => {
    const ZEILEN = [
      "if (window.pagesmithConsent !== undefined) return;",
      'if (api.read().state !== "never") return;',
    ];
    for (const block of [buildConsentBarScript(), buildConsentModalScript()]) {
      for (const zeile of ZEILEN) {
        expect(block.split(zeile).length - 1).toBe(1);
      }
    }
  });
});
