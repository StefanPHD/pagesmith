import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import type { ConsentDialog } from "@/lib/settings";
import { buildConsentBarScript } from "./consent-bar";
import { CONSENT_CHOICE_JS } from "./consent-choice";
import { buildConsentModalScript } from "./consent-modal";
import {
  readConsentColor,
  type ConsentAppearance,
  type ConsentColor,
} from "@/lib/settings";

// DIE VIERTE DARSTELLUNG FUER DIE WAECHTER (Scheibe 11.13c). Die Probefarben gehen durch
// das Format-Tor und nicht an ihm vorbei; die Verengung geschieht ueber einen VERGLEICH,
// nicht ueber eine zweite Zusicherung (die CF1 in settings.test.ts zaehlt).
const testFarbe = (roh: string): ConsentColor => {
  const geprueft = readConsentColor(roh);
  if (geprueft === "unknown") throw new Error(`Testfarbe ungueltig: ${roh}`);
  return geprueft;
};
const VIER_DARSTELLUNGEN: ConsentAppearance[] = [
  { theme: "light" },
  { theme: "dark" },
  { theme: "auto" },
  {
    theme: "custom",
    background: testFarbe("#0a0b0c"),
    text: testFarbe("#f0f1f2"),
  },
];


// SCHEIBE 11.5d-2 — DAS CENTER-MODAL. SEIT SCHEIBE 11.5e-1 MIT ZWEI GRUPPEN-SCHALTERN UND
// DREI KNOEPFEN; die Tests dieser Scheibe stehen unten unter "11.5e-1". Zeiger auf eine
// Invariante nennen deshalb ihre Scheibe an der Stelle.
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

function scriptsOf(html: string, form: ConsentDialog): Element[] {
  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(html, KEY, form, { theme: "light" }, "standard"),
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

/**
 * Den Weg zur Auswahl klicken (Scheibe 11.13a). DAS FENSTER ERSCHEINT SEITHER EINGEKLAPPT;
 * alle Tests, die die Gestalt VOR dieser Scheibe festnageln, laufen ab jetzt als Erwartung
 * des AUSGEKLAPPTEN Zustands und rufen dies nach mount(). IHRE ASSERTIONEN SIND
 * UNVERAENDERT — sie sind nicht aufgeweicht, sie haben einen Zustand bekommen.
 */
function ausklappen(): void {
  button("Einstellungen").click();
}

/** Die Checkbox des Gruppen-Schalters mit dieser Beschriftung (Scheibe 11.5e-1). */
function schalter(name: string): HTMLInputElement {
  const label = Array.from(shadow().querySelectorAll("label")).find(
    (l) => l.textContent === name
  );
  const box = label?.querySelector("input");
  if (!box) throw new Error(`kein Schalter "${name}"`);
  return box;
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
    const out = injectPageViewEmitter(HTML, KEY, "off", { theme: "light" }, "standard");
    expect(out).not.toContain(MODAL_ID);
    expect(out).toContain('id="__ps_pve"');
  });

  // M1b. LEISTE UND MODAL SCHLIESSEN EINANDER AUS — in beide Richtungen, je mit der
  // Anwesenheit des eigenen Blocks als Positivkontrolle.
  it("M1b: 'bar' -> kein Modal-Block; 'modal' -> kein Leisten-Block", () => {
    const leiste = injectPageViewEmitter(HTML, KEY, "bar", { theme: "light" }, "standard");
    expect(leiste).toContain('id="__ps_clb"');
    expect(leiste).not.toContain(MODAL_ID);

    const modal = injectPageViewEmitter(HTML, KEY, "modal", { theme: "light" }, "standard");
    expect(modal).toContain(MODAL_ID);
    expect(modal).not.toContain('id="__ps_clb"');
  });

  it("M2: 'modal' -> Gate < Wiederherstellung < Modal < Setzer < Emitter", () => {
    const out = injectPageViewEmitter(HTML, KEY, "modal", { theme: "light" }, "standard");
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
    const block = buildConsentModalScript("load", { theme: "light" }, "standard");
    const r = rumpf(block);
    // POSITIVKONTROLLE des Ausschnitts: er traegt wirklich den Code.
    expect(r).toContain("attachShadow");
    expect(r.includes("<")).toBe(false);
    // POSITIVKONTROLLE der Suche, im selben Lauf: am ganzen Block trifft sie die Tags.
    expect(block.includes("<")).toBe(true);
    expect(block.match(/<\/script>/gi)?.length).toBe(1);
    expect(block.endsWith("</script>")).toBe(true);
    expect(block.toLowerCase()).not.toContain("</body>");

    // SEIT SCHEIBE 11.13b AUCH FUER DIE ZWEI ANDEREN DARSTELLUNGEN (Nachschaerfung N4),
    // Spiegel von L3. SEIT 11.13c UEBER ALLE VIER — und der vierte ist der einzige, in den
    // ein Betreiber-Wert eingeht; er traegt damit die Sicherheitsachse der Scheibe.
    for (const d of VIER_DARSTELLUNGEN) {
      const b = buildConsentModalScript("load", d, "standard");
      expect(rumpf(b).includes("<"), JSON.stringify(d)).toBe(false);
      expect(b.match(/<\/script>/gi)?.length, JSON.stringify(d)).toBe(1);
    }
  });


// DIE VIER GEMESSENEN NUTZLASTEN (Invariante S9 des Zuschnitts 11.13d). Sie stammen
// WOERTLICH aus VERMERK P11.13-7 der Standdatei — dem Lauf vom 2026-09-18, in dem der
// Ausbruch in Chromium ueber file:// gemessen wurde. EINE ERFUNDENE NUTZLAST ERSETZT
// KEINE GEMESSENE: Der Unterschied zwischen den ersten beiden hat dort darueber
// entschieden, ob der Handler ZUENDET; beim Erfinden waere genau er verlorengegangen.
const FEINDLICHE_SACHTEXTE = [
  "</script><img src=x onerror=\"window.__AUSBRUCH=1\">",
  "</script><img src=x onerror=window.__AUSBRUCH=1>",
  "<!--<script><img src=x onerror=\"window.__AUSBRUCH=1\">",
  "x</SCRIPT>y",
] as const;

  // M3-TXT. Spiegel von L3-TXT (Phase 11.13, Scheibe 11.13d; Entscheidung P11.13-30).
  // Die Begruendung steht dort und wird hier nicht verdoppelt.
  it("M3-TXT: ein feindlicher Sachtext hinterlaesst kein '<' im Rumpf", () => {
    for (const s of FEINDLICHE_SACHTEXTE) {
      for (const d of VIER_DARSTELLUNGEN) {
        for (const m of ["load", "revoke"] as const) {
          const b = buildConsentModalScript(m, d, s as unknown as never);
          expect(rumpf(b).includes("<"), s + " / " + m + " / " + d.theme).toBe(false);
          expect(b.match(/<\/script>/gi)?.length, s).toBe(1);
        }
      }
    }
    // POSITIVKONTROLLE IM SELBEN LAUF.
    const harmlos = "Ein eigener Satz.";
    const b = buildConsentModalScript("load", { theme: "light" }, harmlos as unknown as never);
    expect(b).toContain(harmlos);
  });

  // M4. DIE NADEL-LISTE DER LEISTE PLUS IHRE EIGENEN KENNUNGEN — seit 11.5d sucht der
  // Bestand auch nach `__ps_clb` (L1, L2, L8, L12, P2, P2b, P3). Und in der GEGENRICHTUNG:
  // Der Leisten-Block traegt die Kennungen des Modals nicht, denn M1b und P2 suchen sie.
  it("M4: der Block traegt keine der Zeichenketten, nach denen der Bestand sucht — und umgekehrt", () => {
    const block = buildConsentModalScript("load", { theme: "light" }, "standard");
    const mitDaten =
      '<html><body><h1>x</h1><script type="application/json" id="pagesmith-mappings">[]</scr' +
      "ipt></body></html>";
    const outModal = injectPageViewEmitter(mitDaten, KEY, "modal", { theme: "light" }, "standard");
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
    const outLeiste = injectPageViewEmitter(mitDaten, KEY, "bar", { theme: "light" }, "standard");
    for (const nadel of ["__ps_clb", "pagesmith-bar"]) {
      expect(block).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im Text mit der Leiste.
      expect(outLeiste).toContain(nadel);
    }
    const leistenBlock = buildConsentBarScript("load", { theme: "light" }, "standard");
    for (const nadel of ["__ps_cmo", "pagesmith-modal"]) {
      expect(leistenBlock).not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im Text mit dem Modal.
      expect(outModal).toContain(nadel);
    }
  });
});

describe("11.5d-2 — wann das Modal erscheint", () => {
  // M5. SEIT SCHEIBE 11.5e-1 ERWEITERT, NICHT AUFGEWEICHT: Die Kinder des Fensters stehen
  // exakt als Text, Gruppe, drei Knoepfe (Freigaben F2, F3, F6). Rot bei jedem zusaetzlichen,
  // fehlenden oder umgestellten Kind und bei jeder geaenderten Knopf-Beschriftung.
  it("M5: nichts entschieden -> genau ein Modal: Abdunkelung und Fenster im Schattenbaum, Sachtext, Gruppe der Schalter und drei Knoepfe, nichts gesendet, Hook abgelehnt", () => {
    const beacon = mount();
    ausklappen();
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
    expect(kinder.map((k) => k.tagName)).toEqual(["P", "DIV", "BUTTON", "BUTTON", "BUTTON"]);
    expect(kinder[0].textContent).toBe(SATZ);
    expect(kinder[0].children).toHaveLength(0);
    expect(kinder[1].getAttribute("role")).toBe("group");
    expect(kinder[1].getAttribute("aria-label")).toBe("Bereiche");
    expect(Array.from(kinder[1].children).map((k) => k.tagName)).toEqual(["LABEL", "LABEL"]);
    const knoepfe = kinder.slice(2) as HTMLButtonElement[];
    expect(knoepfe.map((b) => b.textContent)).toEqual([
      "Alle akzeptieren",
      "Auswahl speichern",
      "Ablehnen",
    ]);
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

  // M12. DER WAECHTER DER INVARIANTE I1 DER SCHEIBE 11.5d-2 (keine Scroll-Sperre, nichts an
  // html/body/head).
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
  // DARF `overflow` und `max-height` im EIGENEN Schattenbaum tragen (Invariante I1 der Scheibe
  // 11.5d-2, ARCHITEKT-ENTSCHEIDUNG 2026-09-15) — sonst laegen die Knoepfe auf einem niedrigen
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
    // POSITIVKONTROLLE der Namens-Suche: der Setzer legt einen an.
    // ER WIRD SEIT SCHEIBE 11.5e-2 UEBER SEINE KENNUNG GESUCHT, NICHT UEBER `idx + 1`:
    // Hinter dem Modal steht seither der Widerruf-Block, und die Kontrolle haette einen
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
    expect(stilElemente()).toBe(stilVorher);

    button("Ablehnen").click();
    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);
    expect(stilElemente()).toBe(stilVorher);

    // DIE NADELN — STRENG: lieber ein Fehlalarm, den jemand prueft, als ein Durchlassen.
    // Jede mit einem Beispiel, das sie treffen MUSS.
    const block = buildConsentModalScript("load", { theme: "light" }, "standard");
    const NADELN: Array<[RegExp, string]> = [
      [/documentElement/, "document.documentElement.setAttribute('x', '1')"],
      [/document\.head/, "document.head.appendChild(s)"],
      [/document\.body\./, "document.body.style.overflow = 'hidden'"],
      [/\bbody\.(?!appendChild\(host\))/, "body.setAttribute('data-x', '1')"],
      [/\.style\b/, "el.style.overflow = 'hidden'"],
      [/classList|className/, "el.classList.add('x')"],
      // BENANNT VERENGT (Korrektur K1, 2026-09-17): `preventScroll` ist die UMKEHRUNG
      // dessen, was diese Nadel schuetzt — die Option VERHINDERT, dass der Browser die
      // Scroll-Position der fremden Seite aendert. Jedes andere Vorkommen von `scroll`
      // bleibt verboten; die Positivkontrolle `window.scrollTo(0, 0)` bleibt rot.
      [/(?<!prevent)scroll/i, "window.scrollTo(0, 0)"],
      // BENANNT VERENGT (Freigabe E2, 2026-09-17): Der Fokus auf das erste EIGENE
      // Kaestchen ist ausgenommen — er liegt im eigenen Schattenbaum (Invariante I1).
      // Jeder andere Fokus-Aufruf bleibt verboten; die Positivkontrolle `b.focus()`
      // bleibt rot, und die Gegenprobe unten haelt die Ausnahme eng.
      [/(?<!measure\.box)\.focus\(|\.blur\(|autofocus|tabindex/i, "b.focus()"],
      [/querySelector|getElementsBy|getElementById/, "document.querySelector('html')"],
      [/(?<!host)\.parentNode/, "el.parentNode.removeChild(el)"],
    ];
    // SEIT SCHEIBE 11.13b LAUFEN DIE NADELN UEBER ALLE DREI DARSTELLUNGEN
    // (Nachschaerfung N4). DAS IST EINE VERBREITERUNG, KEIN UMBAU: Die zehn Nadeln sind
    // ZEICHENGLEICH unveraendert, nur die Menge der geprueften Bloecke waechst. OHNE sie
    // waeren die zwei neuen Stylesheets von KEINER Nadel gedeckt — ein `overflow` oder ein
    // `scroll` in einem Thema ginge durch.
    for (const d of VIER_DARSTELLUNGEN) {
      const blockThema = buildConsentModalScript("load", d, "standard");
      for (const [nadel, beispiel] of NADELN) {
        expect(
          nadel.test(blockThema),
          `${JSON.stringify(d)} ${String(nadel)}`
        ).toBe(false);
        // POSITIVKONTROLLE der Nadel.
        expect(nadel.test(beispiel), String(nadel)).toBe(true);
      }
    }
    for (const [nadel, beispiel] of NADELN) {
      expect(nadel.test(block), String(nadel)).toBe(false);
      // POSITIVKONTROLLE der Nadel.
      expect(nadel.test(beispiel), String(nadel)).toBe(true);
    }
    // DIE ZWEI ERLAUBTEN STELLEN treffen die engen Nadeln nicht — sonst waere der Block
    // oben aus dem falschen Grund rot, nicht gruen.
    expect(/\bbody\.(?!appendChild\(host\))/.test("body.appendChild(host)")).toBe(false);
    expect(/(?<!host)\.parentNode/.test("host.parentNode.removeChild(host)")).toBe(false);

    // GEGENPROBE ZUR VERENGUNG (Freigabe E2): die Ausnahme ist ENG — sie nimmt genau
    // den einen eigenen Ausdruck aus und sonst nichts.
    expect(NADELN[7][0].test("measure.box.focus()")).toBe(false);
    expect(NADELN[7][0].test("document.body.focus()")).toBe(true);
    expect(NADELN[6][0].test("measure.box.focus({ preventScroll: true })")).toBe(false);
    expect(NADELN[6][0].test("window.scrollY = 0")).toBe(true);
  });

  // M12b. DER WIRKUNGS-TEST ZUM FOKUS (Scheibe 11.13a, Freigabe E2), Spiegel von L12b.
  // ERWEITERUNG, KEIN UMBAU: die zehn Nadeln oben bleiben unveraendert. Sie sehen ZEICHEN;
  // dieser Test sieht die WIRKUNG.
  it("M12b: Aufbau, Ausklappen und Klick lassen den Fokus der fremden Seite unberuehrt — mit Positivkontrolle", () => {
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

    // POSITIVKONTROLLE der Pruefung im selben Lauf.
    fremd.blur();
    expect(document.activeElement).not.toBe(fremd);
    fremd.remove();
  });

  // M13. DER WAECHTER DER INVARIANTE I2 DER SCHEIBE 11.5d-2: Die EINZIGE Ruecknahme ist das
  // Entfernen des Hosts
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

  // M14. JEDER LISTENER, DEN DER BLOCK BINDET — an einem Knopf, einem Gruppen-Schalter, der
  // Schattenwurzel oder jedem anderen eigenen Knoten —, IST GEBUNDEN, BEVOR DER HOST AN body
  // HAENGT; `body.appendChild(host)` kommt danach (Invariante I3 der Scheibe 11.5d-2, erweitert
  // durch Invariante I3 der Scheibe 11.5e-1). BIS SCHEIBE 11.5e-1 ZAEHLTE ER NUR LISTENER AN
  // BUTTON-ELEMENTEN; ein Listener an einer Checkbox nach dem Einhaengen waere durchgegangen.
  // Die Spione liegen an den Prototypen DESSELBEN Fensters, in dem window.eval den Block
  // ausfuehrt.
  // EINZELSTUECK fuer zwei Pflicht-Mutationen: "body.appendChild(host) vor der Erzeugung der
  // Knoepfe" (Scheibe 11.5d-2) und "ein Listener nach dem Einhaengen" (Pflicht-Mutation (i)
  // der Scheibe 11.5e-1) — beide fing allein dieser Test (gemessen).
  it("M14: jeder Listener des Blocks ist gebunden, BEVOR der Host an body haengt — Positivkontrolle: die Spione sehen die Aufrufe", () => {
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
    expect((anBody[0].kind as Element).tagName).toBe("PAGESMITH-MODAL");
    expect(hosts()).toHaveLength(1);

    // ALLE Listener, gleich an welchem Ziel — keine exakte Gesamtzahl: sie pruefte eine zweite
    // Achse, und ein kuenftiger zulaessiger Listener VOR dem Einhaengen machte sie rot.
    for (const l of listener) expect(l.i).toBeLessThan(anBody[0].i);
  });

  // M15. DIE ZWEI WACH-ZEILEN STEHEN IN BEIDEN BLOECKEN ZEICHENGLEICH. Wer eine Seite
  // aendert, macht diesen Test rot — die Begruendung beider Bedingungen steht einmal, am
  // Docblock von buildConsentBarScript, und gilt nur, solange beide dasselbe pruefen.
  it("M15: Leisten- und Modal-Block tragen die Hook- und die read()-Bedingung zeichengleich, je genau einmal", () => {
    const ZEILEN = [
      "if (window.pagesmithConsent !== undefined) return;",
      'if (api.read().state !== "never") return;',
    ];
    for (const block of [buildConsentBarScript("load", { theme: "light" }, "standard"), buildConsentModalScript("load", { theme: "light" }, "standard")]) {
      for (const zeile of ZEILEN) {
        expect(block.split(zeile).length - 1).toBe(1);
      }
    }
  });

  // M15b. BEIDE BLOECKE TRAGEN DAS GETEILTE CODE-STUECK AUS consent-choice.ts GENAU EINMAL
  // (Scheibe 11.5e-1).
  // SEINE GRENZE, UND OHNE SIE HAELT DIE NAECHSTE RUNDE IHN FUER ETWAS, DAS ER NICHT IST: Er
  // nimmt seine Erwartung aus dem CODE (CONSENT_CHOICE_JS). Das ist hier zulaessig, weil er
  // ausschliesslich ANWESENHEIT prueft — dass kein Block eine eigene, abweichende Fassung
  // traegt oder das Stueck verloren hat. OB DAS STUECK RICHTIG ARBEITET, PRUEFT ER NICHT. Das
  // tun die Verhaltenstests: L5, L13 bis L18 und G0 in consent-bar.test.ts, M5, M14 und M16
  // bis M19 hier.
  it("M15b: Leisten- und Modal-Block tragen CONSENT_CHOICE_JS je genau einmal — Anwesenheit, keine Richtigkeit", () => {
    // POSITIVKONTROLLE: das Stueck ist nicht leer und traegt wirklich die Schalter.
    expect(CONSENT_CHOICE_JS).toContain('"checkbox"');
    for (const block of [buildConsentBarScript("load", { theme: "light" }, "standard"), buildConsentModalScript("load", { theme: "light" }, "standard")]) {
      expect(block.split(CONSENT_CHOICE_JS).length - 1).toBe(1);
    }
  });
});

// SCHEIBE 11.5e-1 — DIE AUSWAHL JE GRUPPE, AM MODAL. Spiegel von L15 bis L18 in
// consent-bar.test.ts; die Erwartungen stammen aus Entscheidung (25) der Phase 11.5, den
// Setzungen des Zuschnitts der Scheibe 11.5e-1 und den Freigaben F1 bis F6 vom 2026-09-15 —
// als Literal, nie aus dem Code.

const NUR_MESSUNG = "ps1:analytics|meta,pinterest,tiktok,linkedin,google";
const NUR_WERBUNG = "ps1:meta,pinterest,tiktok,linkedin,google|analytics";
const WERBUNG = ["meta", "pinterest", "tiktok", "linkedin", "google"];

function hookMit(erlaubt: string[]): Record<string, boolean> {
  return Object.fromEntries(SECHS.map((k) => [k, erlaubt.includes(k)]));
}

describe("11.5e-1 — die Schalter des Modals", () => {
  // M16. Spiegel von L15: beide Schalter starten AUS, ohne checked-Attribut und ohne Zuweisung.
  it("M16: eine Gruppe 'Bereiche' mit zwei Schaltern 'Messung' und 'Werbung', je Checkbox im label, beide AUS, genau zwei Eingabeelemente", () => {
    mount();
    ausklappen();
    const root = shadow();
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

  // M17. Spiegel von L16 — kein Gruppenname erreicht Speicher oder Hook (Invariante I4 der
  // Scheibe 11.5e-1).
  const AUSWAHL: Array<[string, string[], string, string[], number]> = [
    ["keine", [], ALLE_ABGELEHNT, [], 0],
    ["nur Messung", ["Messung"], NUR_MESSUNG, ["analytics"], 1],
    ["nur Werbung", ["Werbung"], NUR_WERBUNG, WERBUNG, 0],
    ["beide", ["Messung", "Werbung"], ALLE_ZUGESTIMMT, SECHS, 1],
  ];
  for (const [fall, klicks, speicher, erlaubt, beacons] of AUSWAHL) {
    it(`M17: '${fall}' + 'Auswahl speichern' -> Speicherwert und Hook je Schluessel, ${beacons} Seitenaufruf(e), Modal weg`, async () => {
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
      for (const gruppe of ["Messung", "Werbung"]) {
        expect(window.localStorage.getItem(STORE_KEY)).not.toContain(gruppe);
      }
    });
  }

  // M18. Spiegel von L17: die zwei festen Knoepfe lesen die Schalter nicht.
  it("M18: 'Ablehnen' und 'Alle akzeptieren' ignorieren den Zustand der Schalter", () => {
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

  // M19. Spiegel von L18: der Name kommt aus dem label. Nur so lange aussagekraeftig, wie
  // jsdom die Label-Aktivierung im Schattenbaum ausfuehrt — GEMESSEN im Bau der Scheibe 11.5e-1.
  it("M19: ein Klick auf die Beschriftung 'Messung' schaltet ihre Checkbox", () => {
    mount();
    ausklappen();
    const text = Array.from(shadow().querySelectorAll("span")).find(
      (s) => s.textContent === "Messung"
    );
    expect(text).toBeTruthy();
    expect(schalter("Messung").checked).toBe(false);
    text!.click();
    expect(schalter("Messung").checked).toBe(true);
    expect(schalter("Werbung").checked).toBe(false);
  });
});

// SCHEIBE 11.13a — DIE ANORDNUNG, Spiegel der Leiste. Die Erwartungen stammen aus
// Entscheidung P11.13-1 der Phase 11.13 (docs/aktiver-stand.md), NIE aus dem Code.
describe("11.13a — die Anordnung", () => {
  // M24. `preventScroll` AM FOKUS-AUFRUF — EINE STRUKTUR-ZUSICHERUNG UEBER DEN
  // AUSGELIEFERTEN TEXT, KEINE WIRKUNGS-ZUSICHERUNG: Die Testumgebung scrollt nicht
  // (docs/immer-beachten.md, DIE TESTUMGEBUNG WERTET KEIN CSS AUS — hier dieselbe Grenze an
  // der Scroll-Achse). GEPRUEFT WIRD, DASS DIE OPTION AM AUFRUF STEHT.
  // WARUM SIE PFLICHT IST: Ohne sie scrollt der Browser das Ziel bei Bedarf in den
  // Sichtbereich und aendert damit die SCROLL-POSITION der fremden Seite — genau das
  // verbietet Invariante I1. Dass sie WIRKT, ist eine Live-Achse und in der Probe gemessen.
  it("M24: der Fokus-Aufruf traegt preventScroll — Struktur-Zusicherung mit Positivkontrolle", () => {
    const block = buildConsentModalScript("load", { theme: "light" }, "standard");
    expect(block).toContain("measure.box.focus({ preventScroll: true })");
    // POSITIVKONTROLLE der Suche im selben Lauf: der blosse Aufruf kommt NICHT vor.
    expect(/measure\.box\.focus\(\)/.test(block)).toBe(false);
    expect(/measure\.box\.focus\(\)/.test("measure.box.focus()")).toBe(true);
    // DIE VERENGTE NADEL AUS M12/W11 TRIFFT DIE NEUE FORM WEITERHIN NICHT.
    const NADEL = /(?<!measure\.box)\.focus\(|\.blur\(|autofocus|tabindex/i;
    expect(NADEL.test("measure.box.focus({ preventScroll: true })")).toBe(false);
    expect(NADEL.test("document.body.focus()")).toBe(true);
  });

  // M20. Spiegel von L19.
  it("M20: eingeklappt stehen Text, 'Alle akzeptieren', 'Ablehnen' und der Weg — keine Schalter, kein 'Auswahl speichern'", () => {
    mount();
    const root = shadow();
    const dialog = root.querySelector('[role="dialog"]')!;
    expect(Array.from(dialog.children).map((k) => k.tagName)).toEqual([
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
    // POSITIVKONTROLLE der Abwesenheits-Behauptungen im selben Lauf.
    ausklappen();
    expect(root.querySelectorAll("input")).toHaveLength(2);
    expect(root.querySelector('[role="group"]')).not.toBeNull();
  });

  // M21. Spiegel von L20.
  it("M21: nach dem Klick ist der Weg verschwunden und die Knoepfe sind die drei von vorher", () => {
    mount();
    ausklappen();
    const root = shadow();
    expect(
      Array.from(root.querySelectorAll("button")).map((b) => b.textContent)
    ).toEqual(["Alle akzeptieren", "Auswahl speichern", "Ablehnen"]);
    expect(
      Array.from(root.querySelectorAll("button")).some(
        (b) => b.textContent === "Einstellungen"
      )
    ).toBe(false);
  });

  // M22. Spiegel von L21.
  it("M22: der Weg ist ein <button type='button'>; der Rumpf traegt kein Link-Element und kein href", () => {
    mount();
    const weg = button("Einstellungen");
    expect(weg.tagName).toBe("BUTTON");
    expect(weg.getAttribute("type")).toBe("button");
    expect(weg.getAttribute("class")).toBe("way");

    const block = buildConsentModalScript("load", { theme: "light" }, "standard");
    expect(/href/i.test(block)).toBe(false);
    expect(/createElement\("a"\)/.test(block)).toBe(false);
    // POSITIVKONTROLLE beider Suchen im selben Lauf.
    expect(/href/i.test('a.setAttribute("href", "#")')).toBe(true);
    expect(/createElement\("a"\)/.test('document.createElement("a")')).toBe(true);
  });

  // M23. Spiegel von L22 — und hier wiegt er schwerer: Bliebe der Host nach einem Wurf
  // stehen, fing die Abdunkelung weiter JEDEN Klick, und die Kundenseite waere unbedienbar.
  it("M23: wirft write(), schliesst das Modal trotzdem — und der Wurf ist wirklich einer (Positivkontrolle)", () => {
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
