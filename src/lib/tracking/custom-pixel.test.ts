import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createHash } from "node:crypto";
import { generateFunctional } from "@/lib/generate";
import { injectPageViewEmitter } from "@/lib/analytics/pageview-emitter";
import { buildConsentRestoreScript } from "@/lib/tracking/consent-store";
import { buildConsentBarScript } from "@/lib/tracking/consent-bar";
import { buildConsentModalScript } from "@/lib/tracking/consent-modal";
import { CUSTOM_LOAD_API } from "@/lib/tracking/custom-pixel";
import {
  getCustomPixelCode,
  setCustomPixelCode,
  settingsEqual,
  TRACK_CODE_MAX_LENGTH,
  CUSTOM_PIXEL_CODE_MAX_LENGTH,
  type ConsentPresentation,
  type ProjectSettings,
} from "@/lib/settings";
import { mappingsEqual, type Mapping } from "@/lib/mappings";

// SCHEIBE 11.6a — DER BASIS-CODE UND DIE EREIGNISZEILE.
//
// DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN, NIE AUS DEM CODE (docs/immer-beachten.md,
// "EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE"): der
// Schluessel "custom", der interne Name __psCustomLoad, die Gruppe "Werbung" und die zwei
// Vorher-Werte des Differenz-Nachweises stehen hier als Literal.
//
// WAS HIER NICHT GEPRUEFT WERDEN KANN, UND KEIN TEST BEHAUPTET ES: ob ein echtes
// Netzwerk-Snippet laeuft, ob ein <script src> tatsaechlich laedt (jsdom laedt keine
// externen Ressourcen — die Reihenfolge wird deshalb ueber die HANDLER geprueft, nicht
// ueber echte Ladevorgaenge), und alles Sichtbare. Das sind Live-Test-Achsen.

const HTML =
  '<html><body><a data-pagesmith-id="b1" href="/alt">Kauf</a></body></html>';
const SNIPPET = '<script>window.__probe = (window.__probe || 0) + 1;</' + "script>";

const praes = (): ConsentPresentation => ({
  appearance: { theme: "light" },
  text: "standard",
  language: "de",
});

type Mutable = Record<string, unknown>;
const w = window as unknown as Mutable & { eval: (code: string) => unknown };

function trackMapping(code?: string): Mapping {
  return {
    elementId: "b1",
    type: "track",
    config: code === undefined ? { event: "Purchase" } : { event: "Purchase", code },
  };
}
const REDIRECT: Mapping = {
  elementId: "b1",
  type: "redirect",
  config: { url: "https://ziel.example/danke", openInNewTab: false },
};

function bauen(
  mappings: Mapping[],
  opts: Parameters<typeof generateFunctional>[3] = {},
  mode: "export" | "preview" = "export"
): string {
  return generateFunctional(HTML, mappings, mode, {
    metaPixelId: "",
    trackingKey: "",
    capiProxyUrl: "",
    consentTargets: [],
    ...opts,
  });
}

// --- Harness: das erzeugte Dokument in einem FRISCHEN document ausfuehren. ---
// Dieselbe Bauform wie mountAndWire in lib/generate.test.ts: geparstes HTML fuehrt
// <script> nicht aus, also werten wir sie bewusst aus. Der Datenblock wird
// UEBER SEINE KENNUNG uebersprungen, nicht ueber einen Index.
let mountedDoc: Document;
let openSpy: ReturnType<typeof vi.fn>;
let hrefValue: string;

function mount(output: string, readyState: "loading" | "complete" = "complete"): void {
  mountedDoc = new DOMParser().parseFromString(output, "text/html");
  Object.defineProperty(mountedDoc, "readyState", {
    value: readyState,
    configurable: true,
  });
  vi.stubGlobal("document", mountedDoc);
  for (const s of Array.from(mountedDoc.querySelectorAll("script"))) {
    if (s.id === "pagesmith-mappings") continue;
    w.eval(s.textContent ?? "");
  }
}

function klick(): MouseEvent {
  const el = mountedDoc.querySelector('[data-pagesmith-id="b1"]');
  if (!el) throw new Error("kein Element");
  const ev = new MouseEvent("click", { bubbles: true, cancelable: true });
  el.dispatchEvent(ev);
  return ev;
}

/** Die Scripts, die der Lader an head angehaengt hat (der Rest des Dokuments zaehlt nicht). */
function geladen(): HTMLScriptElement[] {
  return Array.from(mountedDoc.head.querySelectorAll("script"));
}

beforeEach(() => {
  openSpy = vi.fn();
  vi.stubGlobal("open", openSpy);
  hrefValue = "";
  vi.stubGlobal("location", {
    get href() {
      return hrefValue;
    },
    set href(v: string) {
      hrefValue = v;
    },
  });
  delete w.pagesmithConsent;
  delete w.__probe;
  delete w[CUSTOM_LOAD_API];
});

afterEach(() => {
  vi.unstubAllGlobals();
  delete w.pagesmithConsent;
  delete w.__probe;
  delete w[CUSTOM_LOAD_API];
});

describe("11.6a — der erzeugte Text", () => {
  // T1. DIE EREIGNISZEILE IST VON META UNABHAENGIG. Ohne Pixel-ID und ohne
  // Tracking-Schluessel gibt es KEINE Meta-Laufzeit — und der Custom-Baustein steht
  // trotzdem da.
  // WODURCH ROT: wenn der Baustein an hasPixel, an der Meta-Laufzeit oder an
  // buildMetaRuntime haengt.
  it("T1: Ereigniszeile im erzeugten Text, ohne Pixel-ID und ohne Tracking-Schluessel", () => {
    const out = bauen([trackMapping("foo()")]);
    expect(out).toContain("__psCustomFire");
    expect(out).toContain("__psCustomOk");
    // GEGENPROBE: die Meta-Laufzeit existiert hier nicht.
    expect(out).not.toContain("__psMetaFire(a.config)");
    expect(out).not.toContain("connect.facebook.net");
  });

  // T1b. DER BAUSTEIN LIEGT NICHT IN __psMetaFire — also auch nicht hinter dessen Wache 4,
  // die ueber die ZIEL-Schluessel urteilt. Geprueft an der REIHENFOLGE im Text: der
  // Custom-Block steht VOR der Meta-Laufzeit und damit ausserhalb von ihr.
  it("T1b: der Custom-Block steht VOR der Meta-Laufzeit, nicht in ihr", () => {
    const out = bauen([trackMapping("foo()")], {
      metaPixelId: "123",
      trackingKey: "tk",
      capiProxyUrl: "https://a.example/api/e",
      consentTargets: ["meta"],
      customPixelCode: SNIPPET,
    });
    expect(out.indexOf("__psCustomOk")).toBeLessThan(out.indexOf("__psMetaFire"));
  });

  // T2. EIN PROJEKT OHNE META, NUR MIT CUSTOM: der Klick fuehrt die Zeile aus, es gibt
  // kein fbq und keinen Beacon.
  // WODURCH ROT: wenn die Zeile einen Meta-Zustand voraussetzt.
  it("T2: Projekt ohne Meta, nur Custom — Klick fuehrt die Zeile aus, kein fbq, kein Beacon", () => {
    const beacon = vi.fn(() => true);
    (navigator as unknown as Mutable).sendBeacon = beacon;
    mount(bauen([trackMapping("window.__probe = 7;")]));
    klick();
    expect(w.__probe).toBe(7);
    expect(w.fbq).toBeUndefined();
    expect(beacon).not.toHaveBeenCalled();
  });

  // T3. DIE KAPSELUNG (Invariante I3, Pflicht-Mutation M1). Eine Zeile mit SYNTAXFEHLER
  // darf den Redirect derselben Aktion nicht mitreissen.
  // WODURCH ROT: wenn das try/catch um new Function faellt — dann verlaesst der Wurf den
  // Klick-Handler, und die Zuweisung an location.href unterbleibt.
  it("T3: Ereigniszeile mit Syntaxfehler -> Redirect laeuft trotzdem", () => {
    mount(bauen([trackMapping("dies ist kein javascript ("), REDIRECT]));
    const ev = klick();
    expect(ev.defaultPrevented).toBe(true);
    expect(hrefValue).toBe("https://ziel.example/danke");
  });

  // T3b. DASSELBE FUER EINEN LAUFZEITFEHLER — eine andere Fehlerklasse: T3 wirft bei der
  // UEBERSETZUNG, dieser beim AUFRUF. Ein try/catch nur um das eine faenge das andere nicht.
  it("T3b: Ereigniszeile mit Laufzeitfehler -> Redirect laeuft trotzdem", () => {
    mount(bauen([trackMapping("null.foo();"), REDIRECT]));
    expect(hrefValue).toBe("");
    klick();
    expect(hrefValue).toBe("https://ziel.example/danke");
  });

  // T4. DIE REIHENFOLGE: die Zeile laeuft VOR der Navigation. Belegt ueber die
  // Zuweisungs-Reihenfolge, nicht ueber eine Behauptung.
  it("T4: die Ereigniszeile laeuft VOR der Navigation", () => {
    mount(
      bauen([trackMapping("window.__probe = location.href;"), REDIRECT])
    );
    klick();
    // Beim Ausfuehren der Zeile stand die Navigation noch aus -> href war leer.
    expect(w.__probe).toBe("");
    expect(hrefValue).toBe("https://ziel.example/danke");
  });

  // T8. DIE FEINDLICHE NUTZLAST DURCH DIE ECHTE EINSETZSTELLE (Invariante I2). Geprueft
  // wird das ERGEBNIS, nicht der Quelltext (docs/immer-beachten.md, "EIN WAECHTER UEBER
  // ZEICHEN DARF DIE GESTALT DES GEPRUEFTEN NICHT BESTIMMEN").
  // BEIDE GESTALTEN: das schliessende Script-Tag UND der Kommentar-Einstieg, der das
  // NAECHSTE Script-Element verschluckt, ohne einen Fehler zu erzeugen.
  // GEPRUEFT WIRD AM VEROEFFENTLICHTEN DOKUMENT, NICHT AM EXPORT — und das ist keine
  // Bequemlichkeit, sondern GEMESSEN (CC, 2026-09-19): Im Export steht das Wiring als
  // LETZTER Block, und der Kommentar-Einstieg verschluckt das FOLGENDE Script-Element.
  // Gibt es keines, hat die rohe Nutzlast dort GAR KEINE sichtbare Wirkung, und eine
  // Positivkontrolle waere hohl. Erst die server-injizierten Bloecke dahinter machen den
  // Schaden sichtbar — und genau diese Lage hat jede veroeffentlichte Seite.
  const NUTZLASTEN: Array<[string, string, (d: Document) => unknown, unknown, unknown]> = [
    [
      "schliessendes Tag",
      "</" + "script><img src=x onerror=alert(1)>",
      (d) => d.querySelectorAll("img").length,
      0,
      1,
    ],
    [
      "Kommentar-Einstieg",
      "<!--<" + "script>",
      (d) => d.querySelectorAll("script").length,
      8,
      3,
    ],
  ];
  for (const [name, payload, messen, sollEscaped, sollRoh] of NUTZLASTEN) {
    it(`T8: ${name} im SNIPPET verlaesst den Block nicht`, () => {
      const veroeffentlicht = injectPageViewEmitter(
        bauen([trackMapping()], { customPixelCode: payload }),
        "tk",
        "bar",
        praes()
      );
      const doc = new DOMParser().parseFromString(veroeffentlicht, "text/html");
      expect(messen(doc)).toBe(sollEscaped);
      // Der Wiring-Block ist intakt, und der PageView-Block dahinter steht noch.
      expect(
        Array.from(doc.querySelectorAll("script")).some((s) =>
          (s.textContent ?? "").includes("__psCustomRun")
        )
      ).toBe(true);
      expect(doc.getElementById("__ps_pve")).not.toBeNull();

      // POSITIVKONTROLLE IM SELBEN LAUF: dieselbe Nutzlast ROH eingesetzt richtet den
      // Schaden an. Ohne sie waere dieser Test auch mit "alles wegwerfen" gruen.
      const roh = veroeffentlicht.replace(
        JSON.stringify(payload).replace(/</g, "\\u003c"),
        JSON.stringify(payload)
      );
      expect(roh).not.toBe(veroeffentlicht);
      const rohDoc = new DOMParser().parseFromString(roh, "text/html");
      expect(messen(rohDoc)).toBe(sollRoh);
    });

    it(`T8: ${name} in der EREIGNISZEILE verlaesst den Datenblock nicht`, () => {
      const out = bauen([trackMapping(payload)]);
      const doc = new DOMParser().parseFromString(out, "text/html");
      const block = doc.getElementById("pagesmith-mappings");
      expect(block).not.toBeNull();
      const tabelle = JSON.parse(block?.textContent ?? "[]") as Mapping[];
      expect(tabelle).toHaveLength(1);
      expect(tabelle[0].type === "track" && tabelle[0].config.code).toBe(payload);
    });
  }

  // T9. BYTE-GLEICHHEIT FUER EIN PROJEKT OHNE CUSTOM-PIXEL (Invariante I5). Der
  // Vergleichswert ist VOR dem ersten Eingriff dieser Scheibe erhoben (CC, 2026-09-19).
  // WER IHN ROT VORFINDET, REGENERIERT IHN NICHT.
  // WODURCH ROT: wenn irgendein Baustein dieser Scheibe UNGEGATET entsteht.
  // DIE FIXTURE IST DIE DER VORHER-MESSUNG UND NICHT DIE DES RESTES DIESER DATEI — ein
  // Byte-Vergleich gegen einen Wert, der an einer ANDEREN Eingabe erhoben wurde, waere
  // keiner. Sie steht deshalb hier eigens.
  //
  // SEIT DER PHASE 12.5, SCHEIBE 1, EIN DIFFERENZ-NACHWEIS (Entscheidung P12.5-19 der
  // Phase 12.5; docs/immer-beachten.md, "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN
  // WIRD, TRITT EIN DIFFERENZ-NACHWEIS AN IHRE STELLE"). Die Schatten-Korrektur (Scheibe
  // 1: E1–E3), der Formular-Track am Abschicken (Scheibe 1b: E4–E6, Entscheidung
  // P12.5-21) und die Absende-Buttons ohne eigene Aktionen (Scheibe 1c: E7–E9,
  // Entscheidung P12.5-44) setzen BEWUSST neun Stuecke in das Wiring-Script ein (unten). Die
  // Vergleichswerte sind UNVERAENDERT; sie stehen jetzt auf der ENTFERNTEN Seite: der
  // Text ist der von vor 11.6a plus GENAU diese Einsetzungen, sonst kein Zeichen. Die
  // Einsetzungen sind aus den Bau-Auftraegen GETIPPT, nicht aus generate.ts abgelesen;
  // dieselbe Abschrift steht eigens in own-blocks-waechter.test.ts und
  // consent-setter.test.ts (A1: jede Abschrift wird fuer sich gegen den Code geprueft).
  // E6 IST ZUSAMMENGESETZT: Vorspann und Nachspann getippt, dazwischen die Track-Anweisung
  // aus dem Track-Zweig des click-Listeners — ein Teil des ALTEN Textes, den der sha256
  // nach dem Entfernen mit abdeckt.
  const T9_HTML =
    '<html><body><button data-pagesmith-id="b1">Kauf</button></body></html>';
  const OHNE_ALLES = { bytes: 5819, sha: "89f6fa2f4435374b" };
  const MIT_META = { bytes: 12964, sha: "70107cb1b2934e75" };

  // E1: die zwei lokalen Funktionen hinter der byId-Schleife des Wiring-Scripts.
  const E1 = [
    "  // SCHATTEN-KORREKTUR (Phase 12.5, Scheibe 1): traegt das innerste markierte",
    "  // Element keine Klick-Aktion (track/redirect), gilt der Klick dem naechsten",
    "  // markierten Vorfahren, der eine traegt. Halt am ERSTEN -> hoechstens die",
    "  // Aktionen EINES Elements je Klick. text zaehlt nicht (in der Vorschau steht",
    "  // er in der Tabelle). Ein <form> beendet die Suche: weder wird von unten in",
    "  // ein <form> gelaufen noch aus einem <form> ohne Aktion heraus.",
    "  function hasClickAction(list) {",
    "    if (!list) return false;",
    "    for (var h = 0; h < list.length; h++) {",
    '      if (list[h].type === "track" || list[h].type === "redirect") return true;',
    "    }",
    "    return false;",
    "  }",
    "  function actionOwner(el) {",
    '    while (el && !hasClickAction(byId[el.getAttribute("data-pagesmith-id")])) {',
    '      if (el.tagName === "FORM") return null;',
    '      el = el.parentElement ? el.parentElement.closest("[data-pagesmith-id]") : null;',
    '      if (el && el.tagName === "FORM") return null;',
    "    }",
    "    return el;",
    "  }",
    "",
  ].join("\n");
  // E2 (click-Listener), E3 (auxclick-Listener): der fuehrende Zeilenumbruch macht sie
  // disjunkt — ohne ihn waere E2 ein Teilstring von E3.
  const E2 = "\n      el = actionOwner(el);";
  const E3 = "\n        el = actionOwner(el);";
  // E4 (click), E5 (auxclick): ein Formular ist nie Eigentuemer eines Klicks.
  const E4 = '\n      if (el && el.tagName === "FORM") el = null;';
  const E5 = '\n        if (el && el.tagName === "FORM") el = null;';
  // E6: der submit-Listener — Vorspann, Track-Anweisung, Nachspann.
  const E6_VOR = [
    "  // FORMULAR-TRACK AM ABSCHICKEN (Phase 12.5, Scheibe 1b): Der Track eines <form>",
    "  // zaehlt beim Abschicken (submit), nicht beim Klick. Capture an document: ein",
    "  // Handler des Betreibers am Formular kann ihn weder mit stopPropagation noch mit",
    "  // preventDefault verdecken. KEIN preventDefault von uns: Ziel, Methode und",
    "  // Absenden gehoeren dem Betreiber. Eine Weiterleitung fuehrt ein Formular nicht",
    "  // aus. Einmal je Formular und Seitenleben.",
    "  var submittedForms = [];",
    "  document.addEventListener(",
    '    "submit",',
    "    function (e) {",
    "      var f = e.target;",
    '      if (!f || f.tagName !== "FORM") return;',
    "      if (submittedForms.indexOf(f) !== -1) return;",
    '      var actions = byId[f.getAttribute("data-pagesmith-id")];',
    "      if (!actions || !actions.length) return;",
    "      submittedForms.push(f);",
    "      for (var j = 0; j < actions.length; j++) {",
    "        var a = actions[j];",
    '        if (a.type === "track") {',
    "            ",
  ].join("\n");
  const E6_NACH = ["", "        }", "      }", "    },", "    true", "  );", ""].join("\n");
  const TRACK_AUF = 'if (a.type === "track") {\n            ';
  const TRACK_ZU = '\n          } else if (a.type === "redirect")';
  const e6Of = (s: string) => {
    const auf = s.indexOf(TRACK_AUF);
    const zu = s.indexOf(TRACK_ZU, auf);
    if (auf === -1 || zu === -1) throw new Error("Track-Zweig des click-Listeners nicht gefunden");
    return E6_VOR + s.slice(auf + TRACK_AUF.length, zu) + E6_NACH;
  };
  // E7 (Scheibe 1c): die lokale Funktion direkt hinter actionOwner. E8 (click) und E9
  // (auxclick): je eine Zeile hinter E4 bzw. E5, ueber den fuehrenden Zeilenumbruch
  // disjunkt. GETIPPT aus dem freigegebenen Plan.
  const E7 = [
    "  // ABSENDE-BUTTONS (Phase 12.5, Scheibe 1c; Entscheidung P12.5-37): ein Knopf, der",
    "  // ein Formular abschickt, traegt keine eigene Klick-Aktion - sein Klick gehoert dem",
    '  // Abschicken. Das Urteil faellt der Browser (form, type); type="button" schickt',
    "  // nicht ab und behaelt seine Aktionen. Nur BUTTON und INPUT: bei anderen Tags ist",
    "  // type frei waehlbar (object).",
    "  function isSubmitButton(el) {",
    '    if (el.tagName !== "BUTTON" && el.tagName !== "INPUT") return false;',
    "    if (!el.form) return false;",
    '    return el.type === "submit" || el.type === "image";',
    "  }",
    "",
  ].join("\n");
  const E8 = "\n      if (el && isSubmitButton(el)) el = null;";
  const E9 = "\n        if (el && isSubmitButton(el)) el = null;";
  const count = (s: string, part: string) => s.split(part).length - 1;
  const withoutInsertions = (s: string) =>
    s
      .split(e6Of(s)).join("")
      .split(E9).join("")
      .split(E8).join("")
      .split(E5).join("")
      .split(E4).join("")
      .split(E7).join("")
      .split(E1).join("")
      .split(E3).join("")
      .split(E2).join("");

  it("T9: ohne Snippet und ohne Ereigniszeile ist der erzeugte Text der von vor 11.6a plus GENAU E1–E9", () => {
    const ohne = generateFunctional(T9_HTML, [trackMapping()], "export", {
      metaPixelId: "",
      trackingKey: "",
      capiProxyUrl: "",
      consentTargets: [],
    });
    // Die Einsetzungen, erwartet je GENAU EINMAL (ein Wiring-Script, Export mit
    // click-, auxclick- und submit-Listener).
    expect(count(ohne, E1)).toBe(1);
    expect(count(ohne, E2)).toBe(1);
    expect(count(ohne, E3)).toBe(1);
    expect(count(ohne, E4)).toBe(1);
    expect(count(ohne, E5)).toBe(1);
    expect(count(ohne, e6Of(ohne))).toBe(1);
    expect(count(ohne, E7)).toBe(1);
    expect(count(ohne, E8)).toBe(1);
    expect(count(ohne, E9)).toBe(1);
    const ohneRest = withoutInsertions(ohne);
    expect(Buffer.byteLength(ohneRest, "utf8")).toBe(OHNE_ALLES.bytes);
    expect(sha16(ohneRest)).toBe(OHNE_ALLES.sha);
    // POSITIVKONTROLLE: ohne die Entfernung weicht der Text ab.
    expect(sha16(ohne)).not.toBe(OHNE_ALLES.sha);
    expect(Buffer.byteLength(ohne, "utf8")).not.toBe(OHNE_ALLES.bytes);

    const mitMeta = generateFunctional(T9_HTML, [trackMapping()], "export", {
      metaPixelId: "123",
      trackingKey: "tk_1",
      capiProxyUrl: "https://a.example/api/e",
      consentTargets: ["meta"],
    });
    expect(count(mitMeta, E1)).toBe(1);
    expect(count(mitMeta, E2)).toBe(1);
    expect(count(mitMeta, E3)).toBe(1);
    expect(count(mitMeta, E4)).toBe(1);
    expect(count(mitMeta, E5)).toBe(1);
    expect(count(mitMeta, e6Of(mitMeta))).toBe(1);
    expect(count(mitMeta, E7)).toBe(1);
    expect(count(mitMeta, E8)).toBe(1);
    expect(count(mitMeta, E9)).toBe(1);
    const mitMetaRest = withoutInsertions(mitMeta);
    expect(Buffer.byteLength(mitMetaRest, "utf8")).toBe(MIT_META.bytes);
    expect(sha16(mitMetaRest)).toBe(MIT_META.sha);
    // POSITIVKONTROLLE.
    expect(sha16(mitMeta)).not.toBe(MIT_META.sha);
    expect(Buffer.byteLength(mitMeta, "utf8")).not.toBe(MIT_META.bytes);
  });

  // T13. DIE VORSCHAU BAUT KEINEN CUSTOM-BAUSTEIN (Entscheidung P11.6-6, Teil (d)).
  // WODURCH ROT: wenn die Modus-Gatung faellt.
  it("T13: in der Vorschau entsteht weder Lader noch Ereigniszeile", () => {
    const vorschau = bauen([trackMapping("foo()")], { customPixelCode: SNIPPET }, "preview");
    expect(vorschau).not.toContain("__psCustomRun");
    expect(vorschau).not.toContain("__psCustomFire");
    expect(vorschau).not.toContain("__psCustomOk");
    // POSITIVKONTROLLE: DERSELBE Aufruf im Export baut ihn sehr wohl.
    const exportiert = bauen([trackMapping("foo()")], { customPixelCode: SNIPPET });
    expect(exportiert).toContain("__psCustomRun");
    expect(exportiert).toContain("__psCustomFire");
  });

  // T13b. DER DRITTE injectScripts-TERM: ein Projekt MIT Snippet, aber OHNE jedes
  // Laufzeit-Mapping bekommt trotzdem ein Script. Ohne den Term luede der Basis-Code nie.
  it("T13b: Snippet ohne jedes Mapping -> Gate und Wiring entstehen trotzdem", () => {
    const out = bauen([], { customPixelCode: SNIPPET });
    expect(out).toContain('id="pagesmith-consent"');
    expect(out).toContain("__psCustomRun");
    // GEGENPROBE: ohne Snippet UND ohne Mapping bleibt es reines statisches HTML.
    expect(bauen([])).not.toContain("<script");
  });
});

describe("11.6a — die Einwilligung", () => {
  // T6 / M2. OHNE ZUSTIMMUNG LAEDT NICHTS.
  // WODURCH ROT: wenn die Consent-Pruefung des Laders faellt.
  it("T6: custom=false -> kein Script angehaengt; custom=true -> eines (Positivkontrolle)", () => {
    w.pagesmithConsent = { custom: false };
    mount(bauen([trackMapping()], { customPixelCode: SNIPPET }));
    expect(geladen()).toHaveLength(0);
    expect(w.__probe).toBeUndefined();

    delete w.__probe;
    w.pagesmithConsent = { custom: true };
    mount(bauen([trackMapping()], { customPixelCode: SNIPPET }));
    expect(geladen()).toHaveLength(1);
  });

  // T6b. OHNE GESETZTEN HOOK LAEDT ALLES (Invariante I4, Entscheidung P11.6-2).
  it("T6b: ohne gesetzten Hook laedt der Basis-Code", () => {
    mount(bauen([trackMapping()], { customPixelCode: SNIPPET }));
    expect(geladen()).toHaveLength(1);
  });

  // T15 / M4. DIE EREIGNISZEILE HAT IHRE EIGENE PRUEFUNG (Entscheidung P11.6-6, Teil (a)).
  // SIE ERBT DIE DES LADERS NICHT: Ein Betreiber kann in die Zeile einen eigenen fetch
  // schreiben, und der ginge sonst ohne Einwilligung hinaus.
  // WODURCH ROT: wenn __psCustomFire seine Consent-Pruefung verliert.
  // ER IST EIN EINZELSTUECK — GEMESSEN, NICHT ANGENOMMEN (Pflicht-Mutation M4, CC,
  // 2026-09-19): Faellt die Pruefung in __psCustomFire, wird GENAU DIESER Test rot und
  // sonst KEINER im ganzen Bestand. Wer ihn spaeter als redundant zu T6 entfernt, nimmt
  // die einzige Abdeckung dieser Fehlerklasse mit (docs/immer-beachten.md,
  // "MUTATIONSPROBEN …", Lektion (f)).
  // T6 DECKT IHN NICHT AB: Jener prueft den LADER, dieser die ZEILE. Die Zeile ist ein
  // eigener Sender (Entscheidung P11.6-6, Teil (a)) — ein Betreiber kann in sie einen
  // eigenen fetch schreiben, und der ginge ohne diese Pruefung ohne Einwilligung hinaus,
  // auch wenn gar kein Basis-Code geladen ist.
  it("T15: mit Dialog und custom=false wird die Zeile NICHT ausgefuehrt; ohne Hook schon", () => {
    w.pagesmithConsent = { custom: false };
    mount(bauen([trackMapping("window.__probe = 1;")]));
    klick();
    expect(w.__probe).toBeUndefined();

    delete w.pagesmithConsent;
    mount(bauen([trackMapping("window.__probe = 1;")]));
    klick();
    expect(w.__probe).toBe(1);
  });

  // T5. DER LADER URTEILT BEI DOMContentLoaded, NICHT BEIM PARSEN. Das ist der zentrale
  // Zwang der Scheibe: beim Parsen des Wirings haben Wiederherstellung und Setzer noch
  // nicht gelaufen, der Hook ist noch undefined, und ein Urteil dort lüde trotz
  // gespeicherter Ablehnung.
  // WODURCH ROT: wenn das Urteil ins Parsen gezogen wird.
  it("T5: bei readyState 'loading' laedt nichts vor DOMContentLoaded — und die spaetere Ablehnung wirkt", () => {
    mount(bauen([trackMapping()], { customPixelCode: SNIPPET }), "loading");
    expect(geladen()).toHaveLength(0);
    // Der Setzer, der auf einer echten Seite NACH dem Wiring laeuft, lehnt ab.
    w.pagesmithConsent = { custom: false };
    mountedDoc.dispatchEvent(new Event("DOMContentLoaded"));
    expect(geladen()).toHaveLength(0);
  });

  it("T5b: POSITIVKONTROLLE — dasselbe mit Zustimmung laedt beim DOMContentLoaded", () => {
    mount(bauen([trackMapping()], { customPixelCode: SNIPPET }), "loading");
    expect(geladen()).toHaveLength(0);
    w.pagesmithConsent = { custom: true };
    mountedDoc.dispatchEvent(new Event("DOMContentLoaded"));
    expect(geladen()).toHaveLength(1);
  });

  // T16. DER NACHVERSUCH BEIM KLICK (Entscheidung P11.6-6, Teil (b)). Ein FREMDES CMP
  // setzt den Hook ERST NACH DOMContentLoaded — und ohne write(). Ohne Nachversuch bliebe
  // der Basis-Code die ganze Sitzung ungeladen, und die Zeile liefe ins Leere.
  // WODURCH ROT: wenn der Nachversuch aus dem Track-Zweig entfernt wird.
  it("T16: Hook erst NACH dem Laden gesetzt (ohne write) -> erster Klick laedt den Basis-Code VOR der Zeile", () => {
    w.pagesmithConsent = { custom: false };
    mount(
      bauen([trackMapping("window.__probe = document.head.querySelectorAll('script').length;")], {
        customPixelCode: SNIPPET,
      })
    );
    expect(geladen()).toHaveLength(0);

    // Das fremde CMP entscheidet um — ohne unseren Speicher und ohne write().
    w.pagesmithConsent = { custom: true };
    klick();
    expect(geladen()).toHaveLength(1);
    // UND DIE REIHENFOLGE: beim Ausfuehren der Zeile war der Basis-Code schon da.
    expect(w.__probe).toBe(1);
  });

  // T16b. DER LADER LAEUFT GENAU EINMAL. Ohne Guard lüde jeder Klick erneut.
  it("T16b: zwei Klicks laden den Basis-Code trotzdem nur einmal", () => {
    mount(bauen([trackMapping("1;")], { customPixelCode: SNIPPET }));
    klick();
    klick();
    expect(geladen()).toHaveLength(1);
  });

  // T7 / M3. DIE HARTE GARANTIE: "custom" GELANGT NIE INS DRAHT-FELD (Invariante I7).
  // Der Schluessel speist NUR den eigenen __psConsent-Aufruf, nie die Ziel-Liste — und
  // der Server koennte ihn ueber CONSENT_KEY_BY_TARGET gar nicht aufloesen.
  // WODURCH ROT: wenn CUSTOM_CONSENT_TARGET in consentTargets von generateFunctional
  // gerät.
  it("T7: 'custom' steht in keinem cns-Feld — Positivkontrolle auf 'meta' im selben Lauf", () => {
    const out = bauen([trackMapping("foo()")], {
      metaPixelId: "123",
      trackingKey: "tk",
      capiProxyUrl: "https://a.example/api/e",
      consentTargets: ["meta", "pinterest", "tiktok", "linkedin", "google"],
      customPixelCode: SNIPPET,
    });
    const cns = out.slice(out.indexOf('"cns"'), out.indexOf('"cns"') + 400);
    expect(cns).toContain('"meta"');
    expect(cns).not.toContain('"custom"');
    // UND die Oder-Kette der Wache 4 kennt ihn ebenfalls nicht.
    const kette = out.slice(out.indexOf("__c["), out.indexOf("var eid"));
    expect(kette).not.toContain('__c["custom"]');
  });
});

describe("11.6a — der Lader", () => {
  // T17. SEQUENZIELLES EINFUEGEN (Entscheidung P11.6-6, Teil (c)). Ein <script src> haelt
  // die Kette an, bis load ODER error kommt; ein error fuehrt WEITER.
  // ZWEI GRENZEN DIESES HARNESS, BEIDE GEMESSEN (CC, 2026-09-19) UND BEIDE BENANNT, damit
  // niemand aus dem Test mehr liest, als er hergibt:
  //  (1) jsdom LAEDT KEINE EXTERNEN RESSOURCEN — `load`/`error` feuern nie von selbst.
  //      Die Reihenfolge wird deshalb ueber die HANDLER geprueft, die der Lader an das
  //      Element haengt, nicht ueber einen echten Ladevorgang.
  //  (2) EIN AUS DOMParser STAMMENDES DOKUMENT HAT KEINEN BROWSING-KONTEXT — ein
  //      eingefuegtes Script-Element FUEHRT DORT NICHT AUS. Geprueft wird deshalb die
  //      EINFUEGUNG (Anzahl, Reihenfolge, Attribute, Text), nicht die AUSFUEHRUNG.
  //      DASS DER BASIS-CODE AUF EINER ECHTEN SEITE LAEUFT, IST EINE LIVE-TEST-ACHSE.
  //      Die EREIGNISZEILE ist davon NICHT betroffen (T2): sie laeuft ueber new Function
  //      im echten Fenster.
  const ZWEI =
    '<script src="https://cdn.example/lib.js"></' +
    "script><script>window.__probe = 1;</" +
    "script>";

  it("T17: der zweite Knoten kommt erst nach load des ersten src-Scripts", () => {
    mount(bauen([trackMapping()], { customPixelCode: ZWEI }));
    const nach = geladen();
    expect(nach).toHaveLength(1);
    expect(nach[0].getAttribute("src")).toBe("https://cdn.example/lib.js");

    nach[0].onload?.(new Event("load"));
    const danach = geladen();
    expect(danach).toHaveLength(2);
    expect(danach[1].textContent).toContain("window.__probe = 1;");
  });

  it("T17b: nach error geht es WEITER — ein geblocktes erstes Script nimmt nicht alles mit", () => {
    mount(bauen([trackMapping()], { customPixelCode: ZWEI }));
    const nach = geladen();
    expect(nach).toHaveLength(1);
    nach[0].onerror?.(new Event("error"));
    expect(geladen()).toHaveLength(2);
  });

  // T17d. DIE ZUSAGE: EIN `<noscript>`-RUECKFALL ERREICHT DIE ZIELSEITE NICHT — WEDER DAS
  // ELEMENT NOCH SEIN `<img>`.
  // WOGEGEN SIE STEHT: Das Rueckfall-Pixel ist fuer Besucher OHNE JavaScript gedacht.
  // Landet es in der Live-Seite, LAEDT es dort — das Netzwerk bekaeme ZWEI Seitenaufrufe,
  // und die Zahlen des Betreibers waeren doppelt, ohne dass ein Fehler erscheint.
  // DIE POSITIVKONTROLLE STEHT IM SELBEN LAUF: ein nacktes <img> auf oberster Ebene wird
  // weiterhin eingefuegt. Ohne sie waere dieser Test auch mit "alles wegwerfen" gruen.
  // WODURCH ROT: wenn der Body-Kontext beim Parsen faellt (Stufe (a)) — dann entkommt das
  // <img> dem <noscript> schon beim Parsen, und (b) und (c) sehen es nie.
  // ER IST EIN EINZELSTUECK FUER STUFE (a) — GEMESSEN, NICHT ANGENOMMEN (Mutation M6, CC,
  // 2026-09-19): Ohne den Body-Kontext wird GENAU DIESER Test rot und sonst KEINER im
  // ganzen Bestand (docs/immer-beachten.md, "MUTATIONSPROBEN …", Lektion (f)).
  it("T17d: ein <noscript>-Rueckfall laesst weder img noch noscript in der Zielseite — ein nacktes <img> schon", () => {
    mount(
      bauen([trackMapping()], {
        customPixelCode:
          '<noscript><img src="https://p.example/fallback.gif"></noscript>' +
          '<script>window.__probe = 3;</' +
          "script>",
      })
    );
    expect(mountedDoc.head.querySelectorAll("noscript")).toHaveLength(0);
    expect(mountedDoc.head.querySelectorAll("img")).toHaveLength(0);
    // Die Kette laeuft weiter: das Script DAHINTER ist eingefuegt.
    expect(geladen()).toHaveLength(1);

    // POSITIVKONTROLLE: dasselbe <img> OHNE die noscript-Huelle wird eingefuegt.
    mount(
      bauen([trackMapping()], {
        customPixelCode: '<img src="https://p.example/fallback.gif">',
      })
    );
    expect(mountedDoc.head.querySelectorAll("img")).toHaveLength(1);
  });

  // T17e. DIE ZWEITE ZUSAGE: AUCH EIN VERSCHACHTELTES `<noscript>` ERREICHT DIE ZIELSEITE
  // NICHT.
  // WARUM ER NEBEN T17d STEHT UND NICHT IN IHM: `importNode(…, true)` klont TIEF — ein
  // `<noscript>` in einem `<div>` kaeme mit dem `<div>` mit, und die Ueberspring-Zeile in
  // der Schleife sieht nur die OBERSTE Ebene. Diese Zusage haengt deshalb allein an
  // Stufe (b), dem Entfernen im geparsten Dokument.
  // DIE POSITIVKONTROLLE: das umschliessende <div> landet sehr wohl — entfernt wird das
  // <noscript>, nicht sein Umfeld.
  // WODURCH ROT: wenn Stufe (b) faellt.
  // ER IST EIN EINZELSTUECK FUER STUFE (b) — GEMESSEN (Mutation M7, CC, 2026-09-19).
  it("T17e: ein verschachteltes <noscript> erreicht die Zielseite nicht — das umschliessende <div> schon", () => {
    mount(
      bauen([trackMapping()], {
        customPixelCode:
          '<div><noscript><img src="https://p.example/x.gif"></noscript></div>',
      })
    );
    expect(mountedDoc.head.querySelector("div")).not.toBeNull();
    expect(mountedDoc.head.querySelectorAll("noscript")).toHaveLength(0);
    expect(mountedDoc.head.querySelectorAll("img")).toHaveLength(0);
  });

  // T17f. DIE REIHENFOLGE UEBERLEBT DEN BODY-KONTEXT (Stufe (a)) — und ist seither sogar
  // STRUKTURELL die Quellreihenfolge statt zufaellig: Im Kopf-Kontext verteilte der
  // Parser die Knoten auf head UND body, und der Lader haengte beide Listen aneinander;
  // jetzt liegen alle in EINEM Container.
  // GEMESSEN (CC, 2026-09-19): Kopf-Kontext ergab `head:LINK > head:META > head:SCRIPT >
  // head:SCRIPT > body:IMG`, Body-Kontext `body:LINK > body:META > body:SCRIPT >
  // body:SCRIPT > body:IMG` — dieselbe Folge.
  // WODURCH ROT: wenn jemand die Sammel-Reihenfolge dreht oder den Body-Kontext so
  // aendert, dass Knoten wieder in head landen.
  it("T17f: link, meta und script behalten ihre Quellreihenfolge", () => {
    mount(
      bauen([trackMapping()], {
        customPixelCode:
          '<link rel="preconnect" href="https://cdn.example">' +
          '<meta name="x" content="y">' +
          '<script>window.__probe = 4;</' +
          "script>" +
          '<img src="https://p.example/p.gif">',
      })
    );
    // Der Lader haengt an head an; die vier Knoten stehen in Quellreihenfolge.
    const namen = Array.from(mountedDoc.head.children).map((e) => e.tagName);
    expect(namen).toEqual(["LINK", "META", "SCRIPT", "IMG"]);
  });

  // T17c. NICHT-SCRIPT-KNOTEN WERDEN UEBERNOMMEN und halten die Kette nicht an.
  it("T17c: ein <img> im Snippet wird eingefuegt, ohne zu warten", () => {
    mount(
      bauen([trackMapping()], {
        customPixelCode:
          '<img src="https://p.example/px.gif"><script>window.__probe = 2;</' + "script>",
      })
    );
    expect(mountedDoc.head.querySelectorAll("img")).toHaveLength(1);
    // Das inline-Script DAHINTER ist eingefuegt — die Kette hat am <img> nicht gewartet.
    expect(geladen()).toHaveLength(1);
    expect(geladen()[0].textContent).toContain("window.__probe = 2;");
  });
});

describe("11.6a — die zwei Allowlisten", () => {
  // T11. settingsEqual IST EINE ALLOWLIST. Ohne den Snippet-Term ginge der Wert beim
  // naechsten Projektwechsel still verloren.
  // WODURCH ROT: wenn der Term aus settingsEqual entfernt wird.
  it("T11: eine Snippet-Aenderung ist dirty", () => {
    const a: ProjectSettings = {};
    const b = setCustomPixelCode(a, SNIPPET);
    expect(settingsEqual(a, b)).toBe(false);
    expect(settingsEqual(b, setCustomPixelCode(a, SNIPPET))).toBe(true);
    // Leeren entfernt das Feld wieder -> gleich dem Ausgangszustand.
    expect(settingsEqual(setCustomPixelCode(b, ""), a)).toBe(true);
  });

  // T11b. configEqual IST DIE ZWEITE ALLOWLIST, eine Ebene tiefer.
  it("T11b: eine Aenderung der Ereigniszeile ist dirty", () => {
    expect(mappingsEqual([trackMapping("a()")], [trackMapping("b()")])).toBe(false);
    expect(mappingsEqual([trackMapping("a()")], [trackMapping("a()")])).toBe(true);
    expect(mappingsEqual([trackMapping()], [trackMapping("a()")])).toBe(false);
  });
});

describe("11.6a — die Tore", () => {
  // T12. UEBERLAENGE -> "unknown", NIE auf "leer" abgebildet. Sonst saehe die abbrechende
  // Stelle in publishProject den Wert nie, und der Abbruch waere toter Code.
  it("T12: ein zu langer Snippet ist 'unknown', nicht 'none'", () => {
    const lang = "x".repeat(CUSTOM_PIXEL_CODE_MAX_LENGTH + 1);
    expect(getCustomPixelCode({ customPixel: { code: lang } })).toEqual({
      kind: "unknown",
      problem: "laenge",
    });
    // GRENZE: genau die Grenze ist noch gueltig (kein Off-by-one).
    const grenze = "x".repeat(CUSTOM_PIXEL_CODE_MAX_LENGTH);
    expect(getCustomPixelCode({ customPixel: { code: grenze } }).kind).toBe("ok");
  });

  it("T12b: kein String und leer sind zwei verschiedene Ausgaenge", () => {
    expect(getCustomPixelCode({ customPixel: { code: 5 } })).toEqual({
      kind: "unknown",
      problem: "kein_string",
    });
    expect(getCustomPixelCode({ customPixel: { code: "   " } }).kind).toBe("none");
    expect(getCustomPixelCode({}).kind).toBe("none");
  });

  // T12c. IN CODEPUNKTEN, NICHT IN UTF-16-EINHEITEN: ein Emoji ist EIN Zeichen fuer den
  // Menschen vor dem Feld.
  it("T12c: die Laenge zaehlt Codepunkte", () => {
    const emoji = String.fromCodePoint(0x1f600).repeat(TRACK_CODE_MAX_LENGTH);
    // Zweimal so viele UTF-16-Einheiten — und trotzdem genau an der Grenze.
    expect(emoji.length).toBe(TRACK_CODE_MAX_LENGTH * 2);
    expect(getCustomPixelCode({ customPixel: { code: emoji } }).kind).toBe("ok");
  });
});

describe("11.6a — der Differenz-Nachweis (T10)", () => {
  // T10. DIE BYTE-GLEICHHEIT DER DREI UEBRIGEN BLOECKE IST BEWUSST AUFGEGEBEN — der
  // Schluessel "custom" steht ab jetzt in ihnen. An ihre Stelle tritt die Aussage: DER
  // NEUE BLOCK IST DER ALTE PLUS GENAU DIE BENANNTEN EINSETZUNGEN, SONST KEIN ZEICHEN
  // (docs/immer-beachten.md, "WO EINE BYTE-GLEICHHEIT BEWUSST AUFGEGEBEN WIRD …").
  // Der VIERTE Block, der Setzer, traegt seinen Nachweis in consent-store.test.ts (R3).
  //
  // DIE VORHER-WERTE SIND VOR DEM ERSTEN EINGRIFF DIESER SCHEIBE ERHOBEN (CC, 2026-09-19).
  // WER SIE ROT VORFINDET, REGENERIERT SIE NICHT.
  const SCHLUESSEL_EINSETZUNG = ',"custom"';
  const LADE_EINSETZUNG =
    '\n    if (typeof __psCustomLoad === "function") __psCustomLoad();';

  it("T10 restore: der alte Block PLUS Schluessel und Lade-Zeile — sonst kein Zeichen", () => {
    const jetzt = buildConsentRestoreScript();
    expect(Buffer.byteLength(jetzt, "utf8")).toBe(2450);
    // (3) ZAEHLUNG, erwartete Zahl VOR der Messung genannt: je EINE Einsetzung.
    expect(jetzt.split(SCHLUESSEL_EINSETZUNG).length - 1).toBe(1);
    expect(jetzt.split(LADE_EINSETZUNG).length - 1).toBe(1);
    // (4) ENTFERNT -> der Vorher-Wert.
    const ohne = jetzt
      .split(SCHLUESSEL_EINSETZUNG)
      .join("")
      .split(LADE_EINSETZUNG)
      .join("");
    expect(Buffer.byteLength(ohne, "utf8")).toBe(2377);
    expect(sha16(ohne)).toBe("d6c2549a09387952");
    // (5) POSITIVKONTROLLE.
    expect(ohne).not.toBe(jetzt);
  });

  const OBERFLAECHEN: Array<[string, () => string, number, number, string]> = [
    ["bar-load", () => buildConsentBarScript("load", praes()), 4655, 4637, "ecb98e60724a4668"],
    ["bar-revoke", () => buildConsentBarScript("revoke", praes()), 4970, 4952, "f7685cc9e2ddadd2"],
    ["modal-load", () => buildConsentModalScript("load", praes()), 5106, 5088, "f91fd4024899000a"],
    ["modal-revoke", () => buildConsentModalScript("revoke", praes()), 5421, 5403, "d09a7b8d7400a2da"],
  ];
  for (const [name, bau, nachher, vorher, shaVorher] of OBERFLAECHEN) {
    it(`T10 ${name}: der alte Block PLUS genau zwei Schluessel-Einsetzungen`, () => {
      const jetzt = bau();
      expect(Buffer.byteLength(jetzt, "utf8")).toBe(nachher);
      // ZWEI: die Werbung-Gruppe UND die Liste hinter "Alle akzeptieren".
      expect(jetzt.split(SCHLUESSEL_EINSETZUNG).length - 1).toBe(2);
      const ohne = jetzt.split(SCHLUESSEL_EINSETZUNG).join("");
      expect(Buffer.byteLength(ohne, "utf8")).toBe(vorher);
      expect(sha16(ohne)).toBe(shaVorher);
      expect(ohne).not.toBe(jetzt);
    });
  }
});

function sha16(s: string): string {
  return createHash("sha256").update(s, "utf8").digest("hex").slice(0, 16);
}
