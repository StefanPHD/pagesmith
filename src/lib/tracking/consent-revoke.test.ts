import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import { buildConsentBarScript } from "./consent-bar";
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


// SCHEIBE 11.5e-2 — DER WIDERRUF.
//
// DIE ERWARTUNGEN STAMMEN AUS DER ENTSCHEIDUNG, NIE AUS DEM CODE: der globale Name, die
// Kennung des Blocks, der Wortlaut der Warnung (Freigabe G6), die Nadel-Liste und die zwei
// Vergleichswerte stehen hier als Literal. Wer einen davon rot vorfindet, REGENERIERT IHN
// NICHT — entweder ist die Invariante verletzt, oder der Wert war falsch erhoben; beides
// wird untersucht.
//
// DER HARNESS FUEHRT DEN ECHTEN ERZEUGTEN TEXT AUS, KEINE NACHSTELLUNG — dieselbe Bauform
// wie in consent-bar.test.ts und consent-modal.test.ts.
//
// WAS HIER NICHT GEPRUEFT WERDEN KANN, UND KEIN TEST BEHAUPTET ES: Sichtbarkeit, Lage,
// Farbe, Stapelung, Verdeckung. Die Testumgebung wertet kein CSS aus. Geprueft wird
// STRUKTUR: Anwesenheit, Anzahl, Attribute, Hook, Speicherwert, Rueckgabewert, Warnung.

const NAME = "pagesmithConsentRevoke";
const REVOKE_ID = 'id="__ps_crv"';
const BAR_HOST = "pagesmith-bar";
const MODAL_HOST = "pagesmith-modal";
const HTML = "<html><body><h1>nur Text</h1></body></html>";
const KEY = "tk-revoke-11-5e-2";
const STORE_KEY = "__ps_consent";
const ALLE_ZUGESTIMMT = "ps1:meta,pinterest,tiktok,linkedin,google,analytics|";
const NUR_MESSUNG = "ps1:analytics|meta,pinterest,tiktok,linkedin,google";
// FREIGABE G6 (Owner 2026-09-16), woertlich und umlautfrei wie der Quelltext.
const WARNUNG =
  "pagesmithConsentRevoke: Es liegt keine gespeicherte Entscheidung vor, die zu widerrufen waere. Steht der Dialog gerade offen, entscheide dort.";
const GLOBALS = [
  "__ps_pv",
  "__psConsent",
  "__psConsentAll",
  "__psConsentStore",
  "__psPageView",
  "pagesmithConsent",
  NAME,
];

type Mutable = Record<string, unknown>;
type BeaconSpy = ReturnType<typeof vi.fn>;
const w = window as unknown as Mutable & { eval: (code: string) => unknown };

function installBeacon(): BeaconSpy {
  const beacon = vi.fn(() => true);
  (navigator as unknown as Mutable).sendBeacon = beacon;
  return beacon;
}

function scriptsOf(form: "off" | "bar" | "modal"): Element[] {
  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(HTML, KEY, form, { theme: "light" }),
    "text/html"
  );
  return Array.from(doc.querySelectorAll("script"));
}

function run(script: Element): void {
  w.eval(script.textContent ?? "");
}

/** Das ganze Dokument in Dokumentreihenfolge ausfuehren. */
function mount(form: "bar" | "modal"): BeaconSpy {
  const beacon = installBeacon();
  for (const s of scriptsOf(form)) run(s);
  return beacon;
}

function hosts(tag: string): NodeListOf<Element> {
  return document.querySelectorAll(tag);
}

function revoke(): boolean {
  return (w[NAME] as () => boolean)();
}

function button(tag: string, label: string): HTMLButtonElement {
  const root = hosts(tag)[0]?.shadowRoot;
  if (!root) throw new Error("kein Host");
  const b = Array.from(root.querySelectorAll("button")).find(
    (x) => x.textContent === label
  );
  if (!b) throw new Error(`kein Knopf "${label}"`);
  return b;
}

function schalter(tag: string, name: string): HTMLInputElement {
  const root = hosts(tag)[0]?.shadowRoot;
  if (!root) throw new Error("kein Host");
  const label = Array.from(root.querySelectorAll("label")).find(
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

describe("11.13a — Lade- und Widerruf-Text stammen aus EINEM Aufbau", () => {
  // T9 — DER ERSATZ FUER W0 (Freigabe E1, 2026-09-17). W0 hielt den Lade-Zweig auf zwei
  // BYTE-ZAHLEN und zwei sha256-Werte; seine Sache war die tragende Invariante der Scheibe
  // 11.5e-2 ("der Umbau auf zwei Gestalten laesst den Lade-Zweig Zeichen fuer Zeichen
  // unveraendert"). DIE SCHEIBE 11.13a AENDERT DEN LADE-ZWEIG — jene Invariante ist mit
  // ihrer Scheibe abgelaufen. W0 IST DESHALB GESTRICHEN UND NICHT NEU GESETZT: Ein aus dem
  // Bau gezogener Wert waere ein Spiegel (docs/immer-beachten.md, EIN WAECHTER UEBER DIE
  // SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE).
  //
  // WAS BLEIBT, IST DIE SACHE DAHINTER: Es gibt EINEN Aufbau je Oberflaeche, keine zwei
  // Kopien, die auseinanderlaufen. Dieser Test ersetzt die drei Einsetzwerte des
  // Widerruf-Zweigs durch die des Lade-Zweigs; danach muessen die zwei Texte identisch sein.
  // Er fuehrt KEINE Zahl und muss bei keinem Bau nachgezogen werden.
  // DER ZEILENUMBRUCH WIRD GEBAUT, NICHT HINGESCHRIEBEN (docs/immer-beachten.md, EIN
  // NACHWEIS AN EINER NEUEN DATEI IST BLIND): Auf dem Schreibweg dieser Runde ueberlebt
  // weder das literale Sonderzeichen noch sein Escape — `String.fromCharCode` ist reines
  // ASCII, an dem kein Werkzeug etwas umdeuten kann.
  const NL = String.fromCharCode(10);
  const aufbauVon = (block: string): string => {
    const MARKE = "  var body = document.body;";
    const ENDE = "  body.appendChild(host);" + NL;
    const a = block.indexOf(MARKE);
    expect(a).toBeGreaterThan(-1);
    const b = block.indexOf(ENDE, a);
    expect(b).toBeGreaterThan(a);
    return block.slice(a, b + ENDE.length);
  };

  // SEIT SCHEIBE 11.13b LAEUFT T9 UEBER ALLE DREI DARSTELLUNGEN. Das ist eine
  // VERBREITERUNG, kein Umbau: Die Zusicherung ist unveraendert ("ein Aufbau je Form"),
  // nur ihr Gegenstand deckt jetzt auch die Themen ab. OHNE die Ausweitung waere ein
  // Thema, das Lade- und Widerruf-Zweig VERSCHIEDEN traefe, von keinem Test gefangen.
  for (const [form, bauen, behaelter] of [
    ["bar", buildConsentBarScript, "bar"],
    ["modal", buildConsentModalScript, "dialog"],
  ] as const) {
    for (const darstellung of VIER_DARSTELLUNGEN) {
      const theme = darstellung.theme;
      it(`T9 (${form}, ${theme}): der Widerruf-Aufbau ist nach Ersetzen der drei Einsetzwerte der Lade-Aufbau`, () => {
        const laden = aufbauVon(bauen("load", darstellung));
        const widerruf = aufbauVon(bauen("revoke", darstellung));
        // POSITIVKONTROLLE: OHNE die Ersetzung sind sie verschieden — der Test prueft etwas.
        expect(widerruf).not.toBe(laden);
        const normalisiert = widerruf
          .split("return false;")
          .join("return;")
          .replace("    offen = host;" + NL, "")
          .replace(
            `fillChoice(${behaelter}, true)`,
            `fillChoice(${behaelter}, false)`
          );
        expect(normalisiert).toBe(laden);
      });
    }
  }
});

describe("11.5e-2 — der globale Name", () => {
  // W1. DER EIGENE WAECHTER UEBER DEN GLOBALEN NAMEN (Invariante I5).
  //
  // WARUM ER NICHT REDUNDANT ZU L12 UND M12 IST, UND OHNE DIESEN SATZ WIRD ER BEIM
  // NAECHSTEN AUFRAEUMEN ALS DOPPELUNG GESTRICHEN: Jene nehmen ihren Schnappschuss,
  // NACHDEM alle Bloecke VOR der Oberflaeche gelaufen sind, und fuehren dann ALLEIN den
  // Oberflaechen-Block aus. Ein Name, der in einem ANDEREN Block entsteht, liegt fuer sie
  // entweder schon im Schnappschuss oder laeuft gar nicht — er ist ihnen unsichtbar.
  // Der Widerruf-Name entsteht in `__ps_crv`, also genau dort, wo sie nicht hinsehen.
  it("W1: der Widerruf-Block legt GENAU EINEN neuen globalen Namen an", () => {
    installBeacon();
    const scripts = scriptsOf("bar");
    const idx = scripts.findIndex((s) => s.id === "__ps_crv");
    expect(idx).toBeGreaterThan(0);
    for (const s of scripts.slice(0, idx)) run(s);
    const namenVorher = new Set(Object.keys(window));
    // VOR dem Widerruf-Block steht die Leiste bereits — der Lade-Block lief eben, und der
    // Speicher ist leer. DESHALB WIRD DIE ZAHL VERGLICHEN UND NICHT AUF NULL GEPRUEFT:
    // Gemessen wird, was DIESER Block tut, nicht was vor ihm geschehen ist.
    const hostsVorher = hosts(BAR_HOST).length;
    run(scripts[idx]);
    expect(
      Object.keys(window).filter((k) => !namenVorher.has(k))
    ).toEqual([NAME]);
    // Er baut beim Laden NICHTS auf.
    expect(hosts(BAR_HOST)).toHaveLength(hostsVorher);
    // POSITIVKONTROLLE der Namens-Suche: der Setzer danach legt einen weiteren an.
    run(scripts[idx + 1]);
    expect(Object.keys(window).filter((k) => !namenVorher.has(k))).toContain(
      "pagesmithConsent"
    );
  });

  // W2. WAS DEN WIDERRUF VOM NORMALEN LAUF UNTERSCHEIDET, IST EIN AUFRUF VON AUSSEN —
  // KEIN ZUSTAND. Deshalb darf KEIN Baustein von uns die Funktion rufen; sonst koennte ein
  // normaler Lauf die Unterscheidung versehentlich erfuellen.
  //
  // SEINE GRENZE, UND SIE GEHOERT AN IHN: Die Achse zaehlt auf den ERZEUGTEN BLOECKEN,
  // NICHT auf dem ausgelieferten Dokument. Der Betreiber soll den Aufruf ausdruecklich IN
  // SEINE SEITE schreiben — genau dafuer ist er gebaut. Ein Dokument mit einem
  // Betreiber-Aufruf traegt den Namen also mehrfach, voellig zu Recht. GEMESSEN (CC,
  // 2026-09-16): Die Fixture dieser Datei traegt heute keinen Aufruf, aber darauf stuetzt
  // sich der Test NICHT — er sieht nur die Bloecke, die wir selbst erzeugen.
  // DIE ACHSE IST DER AUFRUF, NICHT DER NAME. Das ist gemessen und nicht angenommen: Der
  // Name steht im Widerruf-Block ZWEIMAL — in der Zuweisung und AM ANFANG DES
  // WARNUNGSTEXTES (Freigabe G6 beginnt mit ihm, damit ein Betreiber die Meldung in der
  // Konsole zuordnen kann). Eine Zaehlung auf den blossen Namen erwartete also eins und
  // faende zwei, und die Frage dieses Tests ist ohnehin eine andere: RUFT ihn jemand?
  it("W2: kein Baustein von uns RUFT den Widerruf — kein Aufruf in den erzeugten Bloecken", () => {
    const AUFRUF = `${NAME}(`;
    for (const block of [
      buildConsentBarScript("revoke", { theme: "light" }),
      buildConsentModalScript("revoke", { theme: "light" }),
      buildConsentBarScript("load", { theme: "light" }),
      buildConsentModalScript("load", { theme: "light" }),
    ]) {
      expect(block.split(AUFRUF).length - 1).toBe(0);
    }
    // In den Lade-Bloecken kommt der Name auch als Zeichenkette gar nicht vor.
    for (const block of [
      buildConsentBarScript("load", { theme: "light" }),
      buildConsentModalScript("load", { theme: "light" }),
    ]) {
      expect(block.split(NAME).length - 1).toBe(0);
    }
    // POSITIVKONTROLLE der Zaehlung im selben Lauf: ein erfundener Aufruf wird gezaehlt.
    // Sie belegt, dass die Suche trifft, und nicht, dass sie schweigt.
    const mitAufruf = buildConsentBarScript("revoke", { theme: "light" }) + `\n${NAME}();`;
    expect(mitAufruf.split(AUFRUF).length - 1).toBe(1);
  });

  // W3. INVARIANTE (8): BEI AUS ENTSTEHT KEIN BAUSTEIN UND KEIN GLOBALER NAME.
  it("W3: Schalter AUS -> weder Kennung noch Name; bei bar und modal beides (Positivkontrolle)", () => {
    const aus = injectPageViewEmitter(HTML, KEY, "off", { theme: "light" });
    expect(aus).not.toContain(REVOKE_ID);
    expect(aus).not.toContain(NAME);
    expect(aus).toContain('id="__ps_pve"');
    for (const form of ["bar", "modal"] as const) {
      const an = injectPageViewEmitter(HTML, KEY, form, { theme: "light" });
      expect(an).toContain(REVOKE_ID);
      expect(an).toContain(NAME);
    }
  });

  // W4. NADEL-KOLLISION (bindende Entscheidung (18)): Die Kennung des neuen Blocks darf
  // keine der Zeichenketten tragen, nach denen der Bestand im ausgelieferten Text sucht —
  // sonst liesse er eine indexOf-Reihenfolge luegen, ohne rot zu werden.
  it("W4: die Kennung des Widerruf-Blocks kollidiert mit keiner Bestandssuche, in beide Richtungen", () => {
    const NADELN = [
      'id="pagesmith-consent"',
      "pagesmith-mappings",
      "__ps_cnr",
      "__ps_cns",
      "__ps_pv",
      "__ps_clb",
      "__ps_cmo",
    ];
    // DIE POSITIVKONTROLLE BRAUCHT ZWEI DOKUMENTE, UND BEIDE GRUENDE SIND GEMESSEN:
    // (1) Die Fixture OHNE Mappings traegt `pagesmith-mappings` nicht — der Client-Erzeuger
    //     haengt Datenblock und Wiring nur an, wenn die Mapping-Tabelle nicht leer ist.
    // (2) Leiste und Modal SCHLIESSEN EINANDER AUS — `__ps_clb` und `__ps_cmo` stehen nie
    //     im selben Text.
    // Eine Kontrolle gegen EIN Dokument waere fuer je eine Nadel hohl gewesen und haette
    // wie ein Befund ueber die Kennung ausgesehen.
    const MIT_MAPPINGS =
      '<html><body><h1>nur Text</h1>' +
      '<script type="application/json" id="pagesmith-mappings">[]</script>' +
      "</body></html>";
    const beide =
      injectPageViewEmitter(MIT_MAPPINGS, KEY, "bar", { theme: "light" }) +
      injectPageViewEmitter(MIT_MAPPINGS, KEY, "modal", { theme: "light" });
    for (const nadel of NADELN) {
      expect("__ps_crv").not.toContain(nadel);
      // POSITIVKONTROLLE: dieselbe Suche trifft im ausgelieferten Text.
      expect(beide).toContain(nadel);
    }
    // SERIALISIERUNG: der Block traegt kein literales </script> und kein </body>.
    for (const block of [
      buildConsentBarScript("revoke", { theme: "light" }),
      buildConsentModalScript("revoke", { theme: "light" }),
    ]) {
      expect(block.split("</scr" + "ipt>").length - 1).toBe(1);
      expect(block).not.toContain("</bo" + "dy>");
    }
  });

  // W5. DIE REIHENFOLGE IM DOKUMENT: Gate < Wiederherstellung < Oberflaeche < Widerruf <
  // Setzer < Emitter.
  it("W5: der Widerruf-Block steht zwischen Oberflaeche und Setzer, in beiden Formen", () => {
    for (const [form, dialogId] of [
      ["bar", 'id="__ps_clb"'],
      ["modal", 'id="__ps_cmo"'],
    ] as const) {
      const out = injectPageViewEmitter(HTML, KEY, form, { theme: "light" });
      expect(out.indexOf(dialogId)).toBeLessThan(out.indexOf(REVOKE_ID));
      expect(out.indexOf(REVOKE_ID)).toBeLessThan(out.indexOf('id="__ps_cns"'));
      expect(out.indexOf('id="__ps_cns"')).toBeLessThan(
        out.indexOf('id="__ps_pve"')
      );
    }
  });
});

describe("11.5e-2 — die Vorbedingung und der Wiederaufbau", () => {
  // W6. DER KERN DER SCHEIBE: nach einer Entscheidung baut der Widerruf auf.
  // DIE VORBEDINGUNG IST DIE UMKEHRUNG DER ZWEITEN WACHE DES LADE-WEGS. Dieser Test und W9
  // sind die zwei, die Pflicht-Mutation (i) faengt.
  it("W6: nach einer Entscheidung baut der Widerruf die Oberflaeche wieder auf — in beiden Formen", () => {
    for (const [form, tag] of [
      ["bar", BAR_HOST],
      ["modal", MODAL_HOST],
    ] as const) {
      aufraeumen();
      window.localStorage.clear();
      window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
      mount(form);
      // Der Lade-Weg hat NICHT aufgebaut — es lag eine Entscheidung vor.
      expect(hosts(tag)).toHaveLength(0);
      expect(revoke()).toBe(true);
      expect(hosts(tag)).toHaveLength(1);
      expect(hosts(tag)[0].parentElement).toBe(document.body);
    }
  });

  // W7. EIN ZWEITER AUFRUF LEGT KEINEN ZWEITEN HOST AN (Schaerfung S2).
  // `offen` IST DAS HOST-ELEMENT SELBST, und ob es noch steht, beantwortet ausschliesslich
  // sein eigenes parentNode — es gibt KEINE zweite Wahrheit ueber dieselbe Frage und
  // deshalb auch nichts zu "leeren". W8 prueft die Gegenrichtung.
  it("W7: ein zweiter Widerruf ohne Entscheidung dazwischen baut nicht erneut auf", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    expect(revoke()).toBe(true);
    expect(hosts(BAR_HOST)).toHaveLength(1);
    expect(revoke()).toBe(false);
    expect(hosts(BAR_HOST)).toHaveLength(1);
  });

  // W8. NACH DEM KLICK BAUT EIN DRITTER AUFRUF WIEDER AUF. Das ist die Gegenrichtung zu W7
  // und der einzige Test, der faengt, wenn die parentNode-Pruefung durch ein blosses
  // `if (offen)` ersetzt wird — dann bliebe der Widerruf nach dem ersten Klick fuer immer
  // tot. Pflicht-Mutation (iii) in ihrer am Bestand moeglichen Form.
  it("W8: nach einem Klick ist der Host weg, und ein dritter Aufruf baut wieder auf", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    expect(revoke()).toBe(true);
    button(BAR_HOST, "Ablehnen").click();
    expect(hosts(BAR_HOST)).toHaveLength(0);
    expect(revoke()).toBe(true);
    expect(hosts(BAR_HOST)).toHaveLength(1);
  });

  // W9. OHNE GESPEICHERTE ENTSCHEIDUNG BAUT DER WIDERRUF NICHT AUF UND WARNT (Entscheidung
  // (E), Freigabe G6).
  //
  // EIN FALL, DEN DIE WARNUNG BEWUSST MIT ABDECKT UND DER KEIN DEFEKT IST: Ruft jemand den
  // Widerruf, WAEHREND DER LADE-DIALOG OFFEN STEHT, liefert read() ebenfalls "never" — der
  // Besucher hat ja noch nicht entschieden. Die Warnung feuert dann und sagt "nichts zu
  // widerrufen", obwohl der Dialog sichtbar auf der Seite steht. GENAU DAFUER TRAEGT G6
  // SEINEN ZWEITEN SATZ ("Steht der Dialog gerade offen, entscheide dort"). Wer das fuer
  // einen Defekt haelt, hat diesen Absatz nicht gelesen.
  //
  // ZWEI ACHSEN, GETRENNT: der AUFRUF (gezaehlt, ohne jeden Wortlaut) und der WORTLAUT
  // (als Literal aus der Freigabe, nicht aus dem Code).
  it("W9: ohne Entscheidung -> false, genau eine Warnung; mit Entscheidung -> keine (Positivkontrolle)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    mount("bar");
    // Der Lade-Dialog steht — und read() liefert trotzdem "never".
    expect(hosts(BAR_HOST)).toHaveLength(1);
    expect(revoke()).toBe(false);
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0][0]).toBe(WARNUNG);

    // POSITIVKONTROLLE im selben Lauf: mit Entscheidung wird nicht gewarnt.
    aufraeumen();
    warn.mockClear();
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    expect(revoke()).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });

  // W10. DIE ZWEI WACHEN DES LADE-WEGS BLEIBEN UNVERAENDERT UND STEHEN NICHT IM
  // WIDERRUF-BLOCK. Keine Stelle faellt zwei Urteile.
  // DIESER TEST IST DER, DEN PFLICHT-MUTATION (ii) FAENGT, wenn sie die Wachen des
  // Lade-Zweigs durch die Widerruf-Vorbedingung ersetzt.
  it("W10: die Lade-Wachen stehen NUR im Lade-Block, die Widerruf-Vorbedingung NUR im Widerruf-Block", () => {
    const LADE_WACHEN = [
      "if (window.pagesmithConsent !== undefined) return;",
      'if (api.read().state !== "never") return;',
    ];
    const WIDERRUF_WACHE = 'if (api.read().state !== "decided") {';
    for (const [load, rev] of [
      [buildConsentBarScript("load", { theme: "light" }), buildConsentBarScript("revoke", { theme: "light" })],
      [buildConsentModalScript("load", { theme: "light" }), buildConsentModalScript("revoke", { theme: "light" })],
    ]) {
      for (const wache of LADE_WACHEN) {
        expect(load.split(wache).length - 1).toBe(1);
        expect(rev).not.toContain(wache);
      }
      expect(rev.split(WIDERRUF_WACHE).length - 1).toBe(1);
      expect(load).not.toContain(WIDERRUF_WACHE);
    }
  });
});

describe("11.5e-2 — die Invarianten am Widerruf-Block", () => {
  // W11. INVARIANTE I1: KEIN EINGRIFF AUSSERHALB DES EIGENEN SCHATTENBAUMS.
  // Struktur UND Nadeln, wie M12 fuer das Modal — mit einer benannten Erweiterung: `offen`
  // ist unser EIGENES Host-Element, und `offen.parentNode` fragt es selbst, nie das
  // Dokument. Die Nadel laesst deshalb `host` und `offen` zu und sonst nichts.
  // SEINE GRENZE: Er sieht ZEICHEN, nicht Bedeutung. Ein Eingriff ueber einen Namen, den
  // keine Nadel kennt, entgeht dem Textteil; der Strukturteil sieht ihn nur, wenn er sich
  // an den geprueften Stellen niederschlaegt.
  it("W11: nichts an html/body/head, keine verbotene Nadel im Block — jeweils mit Positivkontrolle", () => {
    const attribute = (el: Element): string =>
      Array.from(el.attributes)
        .map((a) => `${a.name}=${a.value}`)
        .join(";");
    const htmlVorher = attribute(document.documentElement);
    const bodyVorher = attribute(document.body);
    const headVorher = document.head.children.length;
    const stil = () =>
      document.querySelectorAll('style, link[rel~="stylesheet"]').length;
    const stilVorher = stil();

    // POSITIVKONTROLLE der Attribut-Kette und der Stil-Zaehlung.
    document.body.style.color = "red";
    expect(attribute(document.body)).not.toBe(bodyVorher);
    document.body.removeAttribute("style");
    expect(attribute(document.body)).toBe(bodyVorher);
    const probe = document.createElement("style");
    document.body.appendChild(probe);
    expect(stil()).toBe(stilVorher + 1);
    probe.remove();
    expect(stil()).toBe(stilVorher);
    // POSITIVKONTROLLE der head-Zaehlung — sie fehlt M12 (Vorrat (17)).
    const kopf = document.createElement("meta");
    document.head.appendChild(kopf);
    expect(document.head.children.length).toBe(headVorher + 1);
    kopf.remove();
    expect(document.head.children.length).toBe(headVorher);

    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("modal");
    expect(revoke()).toBe(true);
    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);
    expect(stil()).toBe(stilVorher);

    button(MODAL_HOST, "Ablehnen").click();
    expect(attribute(document.documentElement)).toBe(htmlVorher);
    expect(attribute(document.body)).toBe(bodyVorher);
    expect(document.head.children.length).toBe(headVorher);
    expect(stil()).toBe(stilVorher);

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
      [/(?<!host|offen)\.parentNode/, "el.parentNode.removeChild(el)"],
    ];
    // SEIT SCHEIBE 11.13b LAUFEN DIE NADELN UEBER ALLE DREI DARSTELLUNGEN
    // (Nachschaerfung N4). VERBREITERUNG, KEIN UMBAU: Die zehn Nadeln sind zeichengleich
    // unveraendert; nur die Menge der geprueften Bloecke waechst von zwei auf sechs.
    for (const d of VIER_DARSTELLUNGEN) {
      for (const block of [
        buildConsentBarScript("revoke", d),
        buildConsentModalScript("revoke", d),
      ]) {
        for (const [nadel, beispiel] of NADELN) {
          expect(
            nadel.test(block),
            `${JSON.stringify(d)} ${String(nadel)}`
          ).toBe(false);
          // POSITIVKONTROLLE der Nadel im selben Lauf.
          expect(nadel.test(beispiel), String(nadel)).toBe(true);
        }
      }
    }
    // GEGENPROBE ZUR VERENGUNG (Freigabe E2): die Ausnahme ist ENG — sie nimmt genau
    // den einen eigenen Ausdruck aus und sonst nichts.
    expect(NADELN[7][0].test("measure.box.focus()")).toBe(false);
    expect(NADELN[7][0].test("document.body.focus()")).toBe(true);
    expect(NADELN[6][0].test("measure.box.focus({ preventScroll: true })")).toBe(false);
    expect(NADELN[6][0].test("window.scrollY = 0")).toBe(true);
  });

  // W12. INVARIANTE I2: DIE EINZIGE RUECKNAHME IST DAS ENTFERNEN DES HOSTS, im finally der
  // Knopf-Handler. Kein Escape, kein Listener an der Abdunkelung.
  it("W12: Escape und ein Klick auf die Abdunkelung nehmen den wiederaufgebauten Dialog NICHT zurueck", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("modal");
    expect(revoke()).toBe(true);
    const root = hosts(MODAL_HOST)[0].shadowRoot!;
    root.querySelector(".backdrop")!.dispatchEvent(
      new Event("click", { bubbles: true })
    );
    expect(hosts(MODAL_HOST)).toHaveLength(1);
    document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
    expect(hosts(MODAL_HOST)).toHaveLength(1);
    // POSITIVKONTROLLE: der Knopf nimmt zurueck.
    button(MODAL_HOST, "Ablehnen").click();
    expect(hosts(MODAL_HOST)).toHaveLength(0);
  });

  // W13. INVARIANTE I3: LISTENER VOR EINHAENGEN, auch beim Wiederaufbau. Geprueft wie L14
  // und M14: body.appendChild wird ueberschrieben, und im Moment des Einhaengens traegt der
  // Schattenbaum bereits JEDEN Listener des Blocks.
  it("W13: beim Einhaengen sind alle Listener des wiederaufgebauten Blocks schon gebunden", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    const gebunden: string[] = [];
    const echtesAdd = Element.prototype.addEventListener;
    const spy = vi
      .spyOn(Element.prototype, "addEventListener")
      .mockImplementation(function (this: Element, typ: string, ...rest) {
        gebunden.push(typ);
        return echtesAdd.call(this, typ, ...(rest as [EventListener]));
      });
    let beimEinhaengen = -1;
    const echtesAppend = document.body.appendChild.bind(document.body);
    const appendSpy = vi
      .spyOn(document.body, "appendChild")
      .mockImplementation(((el: Node) => {
        beimEinhaengen = gebunden.length;
        return echtesAppend(el);
      }) as typeof document.body.appendChild);

    expect(revoke()).toBe(true);
    appendSpy.mockRestore();
    spy.mockRestore();
    // Nach dem Einhaengen kommt KEIN Listener mehr dazu.
    expect(beimEinhaengen).toBe(gebunden.length);
    // POSITIVKONTROLLE: es wurden ueberhaupt Listener gebunden (die drei Knoepfe).
    expect(gebunden.length).toBeGreaterThanOrEqual(3);
  });

  // W14. INVARIANTE I4: DER HOOK WIRD JE SCHLUESSEL BELEGT, kein Gruppenname erreicht
  // Speicher oder Hook — auch beim Widerruf nicht. UND: BEIDE SCHALTER STARTEN AUS, auch
  // fuer einen Besucher, der schon zugestimmt hatte (Owner-Entscheidung (B), keine
  // Vorbelegung).
  it("W14: beide Schalter starten AUS; ein Widerruf auf 'nur Messung' schreibt Einzelschluessel", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    expect(revoke()).toBe(true);
    expect(schalter(BAR_HOST, "Messung").checked).toBe(false);
    expect(schalter(BAR_HOST, "Werbung").checked).toBe(false);

    schalter(BAR_HOST, "Messung").checked = true;
    button(BAR_HOST, "Auswahl speichern").click();
    expect(window.localStorage.getItem(STORE_KEY)).toBe(NUR_MESSUNG);
    expect(w.pagesmithConsent).toEqual({
      meta: false,
      pinterest: false,
      tiktok: false,
      linkedin: false,
      google: false,
      analytics: true,
    });
  });

  // W15. INVARIANTE I6: DER SPEICHER BLEIBT UNBERUEHRT — der Widerruf schreibt NICHT
  // selbst, er zeigt nur. Erst ein Knopf ruft write().
  it("W15: der Widerruf-Aufruf allein aendert weder Speicher noch Hook", () => {
    window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
    mount("bar");
    const hookVorher = { ...(w.pagesmithConsent as Record<string, boolean>) };
    expect(revoke()).toBe(true);
    expect(window.localStorage.getItem(STORE_KEY)).toBe(ALLE_ZUGESTIMMT);
    expect(w.pagesmithConsent).toEqual(hookVorher);
  });
});

describe("11.13a — der Widerruf oeffnet ausgeklappt", () => {
  // W16 — ENTSCHEIDUNG P11.13-2: Wer "Einwilligung aendern" waehlt, will auswaehlen. Die
  // Erwartung stammt aus jener Entscheidung, nicht aus dem Code.
  it("W16: der wiederaufgebaute Dialog zeigt sofort Gruppe, zwei Schalter und die drei Knoepfe — keinen Weg", () => {
    for (const [form, tag] of [
      ["bar", BAR_HOST],
      ["modal", MODAL_HOST],
    ] as const) {
      aufraeumen();
      window.localStorage.clear();
      window.localStorage.setItem(STORE_KEY, ALLE_ZUGESTIMMT);
      mount(form);
      expect(hosts(tag)).toHaveLength(0);
      expect(revoke()).toBe(true);
      const root = hosts(tag)[0].shadowRoot!;
      expect(root.querySelector('[role="group"]')).not.toBeNull();
      expect(root.querySelectorAll("input")).toHaveLength(2);
      expect(
        Array.from(root.querySelectorAll("button")).map((b) => b.textContent)
      ).toEqual(["Alle akzeptieren", "Auswahl speichern", "Ablehnen"]);
      // DIE ABWESENHEIT DES WEGS IST DER KERN: eingeklappt waere er hier.
      expect(
        Array.from(root.querySelectorAll("button")).some(
          (b) => b.textContent === "Einstellungen"
        )
      ).toBe(false);
    }
  });

  // W17 — DIE GEGENPROBE IM SELBEN GEGENSTAND: Der LADE-Weg derselben Form zeigt den Weg
  // sehr wohl. Ohne sie koennte W16 gruen sein, weil der Weg ueberhaupt nicht entsteht.
  it("W17: der Lade-Weg derselben Form zeigt den Weg — Positivkontrolle zu W16", () => {
    for (const [form, tag] of [
      ["bar", BAR_HOST],
      ["modal", MODAL_HOST],
    ] as const) {
      aufraeumen();
      window.localStorage.clear();
      mount(form);
      const root = hosts(tag)[0].shadowRoot!;
      expect(
        Array.from(root.querySelectorAll("button")).map((b) => b.textContent)
      ).toEqual(["Alle akzeptieren", "Ablehnen", "Einstellungen"]);
      expect(root.querySelectorAll("input")).toHaveLength(0);
    }
  });
});
