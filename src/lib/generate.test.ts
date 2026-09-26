import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  editPreviewHtml,
  editVariantMarker,
  generateFunctional,
  submitFormOf,
} from "./generate";
import { nonEmptyHtml } from "./hosting/variant";
import { annotateAndDetect } from "./detect";
import type { Mapping } from "./mappings";

function redirect(
  elementId: string,
  url: string,
  openInNewTab = false
): Mapping {
  return { elementId, type: "redirect", config: { url, openInNewTab } };
}

function text(elementId: string, content: string): Mapping {
  return { elementId, type: "text", config: { content } };
}

function track(elementId: string, event: string): Mapping {
  return { elementId, type: "track", config: { event } };
}

// Typ-narrowing Zugriff auf eine Redirect-config (Union verlangt das Narrowing).
function rc(m: Mapping) {
  if (m.type !== "redirect") throw new Error("kein redirect-Mapping");
  return m.config;
}

function tc(m: Mapping) {
  if (m.type !== "text") throw new Error("kein text-Mapping");
  return m.config;
}

// Liest den injizierten JSON-Datenblock aus dem generierten HTML zurueck —
// derselbe Weg, den das Wiring-Script zur Laufzeit nimmt (parse + JSON.parse).
// Beweist zugleich, dass die Kodierung NICHT aus dem <script> ausbricht.
function readTable(output: string): Mapping[] {
  const doc = new DOMParser().parseFromString(output, "text/html");
  const dataEl = doc.getElementById("pagesmith-mappings");
  if (!dataEl) return [];
  return JSON.parse(dataEl.textContent || "[]");
}

const BUTTON = `<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>`;

describe("generateFunctional – defensive Garantien", () => {
  it("liefert '' fuer leeren/whitespace Input", () => {
    expect(generateFunctional("", [])).toBe("");
    expect(generateFunctional("   ", [])).toBe("");
  });
});

describe("generateFunctional – Verdrahtung", () => {
  it("verdrahtet ein vorhandenes Mapping (Tabelle + Wiring-Script)", () => {
    const out = generateFunctional(BUTTON, [
      redirect("ps-aaaaaa", "https://buy.stripe.com/abc"),
    ]);
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(table[0].elementId).toBe("ps-aaaaaa");
    expect(rc(table[0]).url).toBe("https://buy.stripe.com/abc");
    // Statisches Wiring-Script ist vorhanden und haengt einen Click-Handler.
    expect(out).toContain("addEventListener");
    expect(out).toContain(`getElementById("pagesmith-mappings")`);
  });

  it("ignoriert ein verwaistes Mapping (ps-ID nicht im HTML)", () => {
    const out = generateFunctional(BUTTON, [
      redirect("ps-aaaaaa", "https://present.example"),
      redirect("ps-zzzzzz", "https://orphan.example"),
    ]);
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(table[0].elementId).toBe("ps-aaaaaa");
    // Die verwaiste URL darf NIRGENDS im Output auftauchen.
    expect(out).not.toContain("orphan.example");
  });

  it("kodiert openInNewTab und das Wiring nutzt den window.open-Pfad", () => {
    const out = generateFunctional(BUTTON, [
      redirect("ps-aaaaaa", "https://paypal.me/x", true),
    ]);
    const table = readTable(out);
    expect(rc(table[0]).openInNewTab).toBe(true);
    // Der window.open('_blank')-Zweig existiert im (statischen) Wiring-Script.
    expect(out).toContain(`window.open(url, "_blank")`);
    expect(out).toContain("window.location.href = url");
  });

  it("eine URL mit \" und </script> zerbricht das Output NICHT", () => {
    const evil = `https://evil.example/?x="</script><script>alert(1)</script>`;
    const out = generateFunctional(BUTTON, [redirect("ps-aaaaaa", evil)]);
    // Round-trip: die URL kommt EXAKT zurueck -> kein Ausbruch, keine Korruption.
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(rc(table[0]).url).toBe(evil);
    // Der injizierte Bruchstring darf NICHT roh im Output stehen (das "<" ist
    // als Unicode-Escape maskiert -> der Datenblock bleibt geschlossen).
    expect(out).not.toContain(`</script><script>alert(1)`);
  });

  it("greift auf Fallback zurueck, wenn das HTML kein </body> hat", () => {
    // Fragment ohne <html>/<body>: das Wiring muss trotzdem injiziert werden.
    const fragment = `<a data-pagesmith-id="ps-bbbbbb" href="#">CTA</a>`;
    const out = generateFunctional(fragment, [
      redirect("ps-bbbbbb", "https://example.com"),
    ]);
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(table[0].elementId).toBe("ps-bbbbbb");
    expect(out).toContain("addEventListener");
  });
});

// ---------------------------------------------------------------------------
// Verhaltens-Harness: das generierte Wiring im jsdom WIRKLICH ausfuehren (kein
// hohles String-Matching). Wir bauen das Live-DOM aus dem Output, fuehren das
// Wiring-Script per eval aus (es haengt seinen Click-Handler an document) und
// behaupten dann ueber gestubbte Globals + event.defaultPrevented. Es ist UNSER
// eigenes Wiring, im Test, mit gestubbten window.open/window.location.
// ---------------------------------------------------------------------------

let openSpy: ReturnType<typeof vi.fn>;
let hrefValue: string;

beforeEach(() => {
  openSpy = vi.fn();
  vi.stubGlobal("open", openSpy);
  hrefValue = "";
  // Capturing location-Stub: kein echtes Navigieren (jsdom wuerfe sonst
  // "not implemented: navigation"); der Setter haelt nur den zugewiesenen Wert.
  vi.stubGlobal("location", {
    get href() {
      return hrefValue;
    },
    set href(v: string) {
      hrefValue = v;
    },
  });
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// Das gerade gemountete Dokument. Das Wiring haengt seinen Click-Handler an
// document; ein FRISCHES Dokument je Test (als globales document gestubbt)
// verhindert, dass Listener vorheriger Tests am geteilten jsdom-document kleben
// bleiben und mitfeuern.
let mountedDoc: Document;

// Baut ein frisches Live-DOM aus dem generierten Output und fuehrt das Wiring aus.
function mountAndWire(output: string): void {
  mountedDoc = new DOMParser().parseFromString(output, "text/html");
  vi.stubGlobal("document", mountedDoc);
  // Geparstes HTML fuehrt <script> NICHT aus -> wir evaluieren die Laufzeit-Scripts
  // bewusst; sie referenzieren das (gestubbte) globale document.
  //
  // PHASE 11, ZWEITE SCHEIBE: Es sind jetzt ZWEI — das Consent-Gate
  // (id=pagesmith-consent) definiert __psConsent, das Wiring konsumiert es. Beide
  // werden in DOKUMENT-Reihenfolge ausgewertet, wie es der Browser taete.
  //
  // AUSGEWAEHLT WIRD UEBER DIE KENNUNG des Datenblocks, NICHT ueber einen Index: die
  // frueherere Fassung nahm "das erste Script, das nicht der Datenblock ist" — mit
  // einem dritten Script waere diese Wahl still mehrdeutig geworden, ohne dass etwas
  // rot wird.
  for (const s of Array.from(mountedDoc.querySelectorAll("script"))) {
    if (s.id === "pagesmith-mappings") continue;
    window.eval(s.textContent ?? "");
  }
}

// Klick auf das erste Element, das auf selector passt; gibt das Event zurueck
// (defaultPrevented danach lesbar).
function click(selector: string): MouseEvent {
  const el = mountedDoc.querySelector(selector);
  if (!el) throw new Error(`kein Element fuer ${selector}`);
  const ev = new MouseEvent("click", { bubbles: true, cancelable: true });
  el.dispatchEvent(ev);
  return ev;
}

// Auxclick (Mittel-/Rechtsklick) auf das erste passende Element; button waehlbar
// (1 = Mitte, 2 = rechts). Gibt das Event zurueck (defaultPrevented lesbar).
function aux(selector: string, button: number): MouseEvent {
  const el = mountedDoc.querySelector(selector);
  if (!el) throw new Error(`kein Element fuer ${selector}`);
  const ev = new MouseEvent("auxclick", {
    bubbles: true,
    cancelable: true,
    button,
  });
  el.dispatchEvent(ev);
  return ev;
}

// Abschicken des ersten passenden Formulars (Phase 12.5, Scheibe 1b). BEWUSST per
// dispatchEvent und NICHT per requestSubmit: jsdom meldet nach dem Ereignis "not
// implemented" fuer die Navigation, und seine Gueltigkeitspruefung ist statisch — die
// echte Pruefung des Browsers ist eine Live-Test-Achse (Vermerk P12.5-22 der Phase 12.5,
// Punkt (5)). Gibt das Event zurueck (defaultPrevented lesbar).
function submit(selector: string): Event {
  const el = mountedDoc.querySelector(selector);
  if (!el) throw new Error(`kein Element fuer ${selector}`);
  const ev = new Event("submit", { bubbles: true, cancelable: true });
  el.dispatchEvent(ev);
  return ev;
}

const MAPPED_BUTTON =`<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>`;
// Gemappter Link mit GEERBTER Original-href aus der Fremdseite -> beweist den
// href-Bake diskriminierend (der Bake muss diese URL ersetzen).
const MAPPED_LINK = `<!DOCTYPE html><html><body><a data-pagesmith-id="ps-aaaaaa" href="https://original.example/impressum">Impressum</a></body></html>`;
const MAPPED_LINK_REL = `<!DOCTYPE html><html><body><a data-pagesmith-id="ps-aaaaaa" rel="nofollow" href="https://original.example/impressum">Impressum</a></body></html>`;
const UNMAPPED_LINK = (href: string) =>
  `<!DOCTYPE html><html><body><a href="${href}">Link</a></body></html>`;

// Liest das <a> aus dem generierten Output (nach dem href-Bake).
function anchorOf(output: string): HTMLAnchorElement {
  const doc = new DOMParser().parseFromString(output, "text/html");
  const a = doc.querySelector("a[data-pagesmith-id]");
  if (!a) throw new Error("kein gemapptes <a> im Output");
  return a as HTMLAnchorElement;
}

describe("Wiring-Verhalten EXPORT (Produktionslogik)", () => {
  it("openInNewTab -> window.open(url,'_blank'), nicht location.href", () => {
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://buy.stripe.com/x", true)],
        "export"
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(openSpy).toHaveBeenCalledWith("https://buy.stripe.com/x", "_blank");
    expect(hrefValue).toBe("");
  });

  it("selber Tab -> location.href, window.open NICHT", () => {
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://buy.stripe.com/x", false)],
        "export"
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(hrefValue).toBe("https://buy.stripe.com/x");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("GEGENPROBE: un-gemappter <a href='#x'> bleibt unangetastet (defaultPrevented false)", () => {
    mountAndWire(generateFunctional(UNMAPPED_LINK("#preis"), [], "export"));
    const ev = click("a[href]");
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// href-Bake (Export): ein gemapptes <a> traegt im Output die KONFIGURIERTE Ziel-URL
// im href-Attribut, NICHT mehr die aus der Fremdseite geerbte Original-URL. Statisch
// geprüft am serialisierten Attribut (kein Wiring-Ausführen nötig).
// ---------------------------------------------------------------------------
describe("href-Bake EXPORT (<a>-Redirects)", () => {
  it("KERN-BEWEIS: href = konfigurierte Ziel-URL, NICHT die Original-URL", () => {
    const out = generateFunctional(
      MAPPED_LINK,
      [redirect("ps-aaaaaa", "https://www.thr-ty.com")],
      "export"
    );
    const a = anchorOf(out);
    expect(a.getAttribute("href")).toBe("https://www.thr-ty.com");
    expect(a.getAttribute("href")).not.toBe("https://original.example/impressum");
  });

  it("openInNewTab:true -> target=_blank UND rel enthaelt noopener + noreferrer", () => {
    const out = generateFunctional(
      MAPPED_LINK,
      [redirect("ps-aaaaaa", "https://www.thr-ty.com", true)],
      "export"
    );
    const a = anchorOf(out);
    expect(a.getAttribute("target")).toBe("_blank");
    const rel = (a.getAttribute("rel") || "").split(/\s+/);
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  it("rel-MERGE: importiertes rel=nofollow bleibt erhalten, noopener/noreferrer kommen dazu", () => {
    const out = generateFunctional(
      MAPPED_LINK_REL,
      [redirect("ps-aaaaaa", "https://www.thr-ty.com", true)],
      "export"
    );
    const rel = (anchorOf(out).getAttribute("rel") || "").split(/\s+/);
    expect(rel).toContain("nofollow");
    expect(rel).toContain("noopener");
    expect(rel).toContain("noreferrer");
  });

  it("openInNewTab:false -> target/rel NICHT gesetzt (nur href gebacken)", () => {
    const out = generateFunctional(
      MAPPED_LINK,
      [redirect("ps-aaaaaa", "https://www.thr-ty.com", false)],
      "export"
    );
    const a = anchorOf(out);
    expect(a.getAttribute("href")).toBe("https://www.thr-ty.com");
    expect(a.hasAttribute("target")).toBe(false);
    expect(a.hasAttribute("rel")).toBe(false);
  });

  it("Track-only auf <a>: href bleibt die Original-URL (Teil 1 fasst track-only nicht an)", () => {
    const out = generateFunctional(
      MAPPED_LINK,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL }
    );
    expect(anchorOf(out).getAttribute("href")).toBe(
      "https://original.example/impressum"
    );
  });
});

// ---------------------------------------------------------------------------
// auxclick-Tracking (Export): Mittelklick (button 1) feuert den Track-Beacon, ohne
// die Navigation anzufassen. Rechtsklick (button 2) feuert NICHTS (Ghost-Conversion-
// Schutz). Der Listener existiert NUR im Export (Preview -> 0 Calls).
// ---------------------------------------------------------------------------
describe("auxclick-Tracking (Mittelklick)", () => {
  it("Mittelklick (button 1) -> fbq feuert, KEINE Navigation, kein preventDefault", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_LINK,
        [redirect("ps-aaaaaa", "https://x.com", true), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    const ev = aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
  });

  it("GEGENPROBE Rechtsklick (button 2) -> fbq feuert NICHT (kein Ghost-Conversion)", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_LINK,
        [track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    aux('[data-pagesmith-id="ps-aaaaaa"]', 2);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });

  it("KEIN Doppel-Feuern: Linksklick genau 1 fbq, Mittelklick genau 1 fbq (disjunkt)", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_LINK,
        [redirect("ps-aaaaaa", "https://x.com", true), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(2);
  });

  it("SCOPING: auxclick in PREVIEW feuert NICHT (Listener ist export-only)", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_LINK,
        [track("ps-aaaaaa", "Lead")],
        "preview",
        { metaPixelId: PIXEL }
      )
    );
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });
});

describe("Wiring-Verhalten PREVIEW (Containment)", () => {
  it("gemappter Klick -> window.open(url,'_blank'), location.href NICHT", () => {
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://buy.stripe.com/x", false)],
        "preview"
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(openSpy).toHaveBeenCalledWith("https://buy.stripe.com/x", "_blank");
    // Beweis: die Vorschau framet NIE via location.href.
    expect(hrefValue).toBe("");
  });

  it("openInNewTab=false feuert in PREVIEW trotzdem window.open('_blank')", () => {
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://paypal.me/x", false)],
        "preview"
      )
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(openSpy).toHaveBeenCalledWith("https://paypal.me/x", "_blank");
    expect(hrefValue).toBe("");
  });

  it("CONTAINMENT: un-gemappter <a href='/login'> -> defaultPrevented true UND window.open NICHT", () => {
    mountAndWire(generateFunctional(UNMAPPED_LINK("/login"), [], "preview"));
    const ev = click("a[href]");
    expect(ev.defaultPrevented).toBe(true);
    expect(openSpy).not.toHaveBeenCalled();
  });
});

// ---------------------------------------------------------------------------
// Tracking (Phase 6 Scheibe 1b, ECHTES Meta-Pixel): ein interaktives Element kann
// redirect UND track tragen. Mit gesetzter Pixel-ID feuert der Track-Zweig echtes
// fbq VOR der Redirect-Navigation. Der frühere 1a-console.log-Stub ist bewusst
// ersetzt (invertierte Assertion, nicht aufgeweicht).
// ---------------------------------------------------------------------------

const PIXEL = "123456789012345";
// Stubbt window.fbq -> der fbevents-Bootstrap (if (f.fbq) return) ueberspringt den
// echten Script-Load und unsere init/track-Calls landen im Spy. Gibt den Spy zurueck.
function stubFbq() {
  const fbq = vi.fn();
  vi.stubGlobal("fbq", fbq);
  return fbq;
}
const fbqCalls = (fbq: ReturnType<typeof vi.fn>, method: string) =>
  fbq.mock.calls.filter((c) => c[0] === method);

describe("Wiring-Verhalten TRACK (Meta-Pixel, Scheibe 1b)", () => {
  it("Element [redirect, track] (export): Tabelle enthaelt BEIDE; fbq feuert VOR der Navigation", () => {
    const fbq = stubFbq();
    // Array-Reihenfolge redirect-zuerst -> beweist die Deferral (Track trotzdem
    // vor der Navigation), reihenfolge-unabhaengig.
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://x.com", true), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    const table = readTable(mountedDoc.documentElement.outerHTML);
    expect(table).toHaveLength(2);

    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(fbqCalls(fbq, "track")[0]).toEqual([
      "track",
      "Lead",
      {},
      expect.objectContaining({ eventID: expect.any(String) }),
    ]);
    expect(openSpy).toHaveBeenCalledWith("https://x.com", "_blank");
    // ORDNUNG: das Event lief VOR window.open (navigationssicher).
    expect(fbq.mock.invocationCallOrder[0]).toBeLessThan(
      openSpy.mock.invocationCallOrder[0]
    );
  });

  it("Element [track] only (export): fbq feuert, KEINE Navigation, defaultPrevented false", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
    // Track-only blockt den Default NICHT (nur Redirect ruft preventDefault).
    expect(ev.defaultPrevented).toBe(false);
  });

  it("Base-Pixel: fbq('init', id) GENAU EINMAL (auch bei zwei Klicks), KEIN Auto-PageView", () => {
    const fbq = stubFbq();
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL }
    );
    // Output-Eigenschaften: genau ein init-Snippet, KEIN PageView.
    expect((out.match(/fbq\("init"/g) ?? []).length).toBe(1);
    expect(out).toContain(PIXEL);
    // Kein Auto-PageView-CALL (das Wort steht nur im Kommentar "OHNE Auto-PageView").
    expect(out).not.toContain('"PageView"');

    mountAndWire(out);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    click('[data-pagesmith-id="ps-aaaaaa"]');
    // Lazy init mit fbReady-Guard -> init nur EINMAL, Event je Klick.
    expect(fbqCalls(fbq, "init")).toEqual([["init", PIXEL]]);
    expect(fbqCalls(fbq, "track")).toHaveLength(2);
  });

  it("Custom-Event -> fbq('trackCustom', <freier Name>)", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [
          {
            elementId: "ps-aaaaaa",
            type: "track",
            config: { event: "ViewPricing", isCustom: true },
          },
        ],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "trackCustom")[0]).toEqual([
      "trackCustom",
      "ViewPricing",
      {},
      expect.objectContaining({ eventID: expect.any(String) }),
    ]);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });

  it("wert-tragendes Event (value/currency) -> params; nicht-wert-Event -> leere params", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [
          {
            elementId: "ps-aaaaaa",
            type: "track",
            config: { event: "Purchase", value: 49.9, currency: "EUR" },
          },
        ],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "track")[0][2]).toEqual({ value: 49.9, currency: "EUR" });

    // Gegenprobe: Lead ohne value/currency -> leere params.
    const fbq2 = stubFbq();
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq2, "track")[0][2]).toEqual({});
  });

  it("KEINE Pixel-ID -> kein fbq im Output; Track-Aktion ist no-op (console.warn)", () => {
    const warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    const fbq = stubFbq();
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export"
      // KEIN metaPixelId
    );
    // Kein Meta-Snippet im Output: kein fbq-CALL (das blosse Wort "fbq" steht im
    // Wiring-Kommentar; ein fbq("…") existiert nur mit gesetzter Pixel-ID).
    expect(out).not.toContain("fbq(");
    mountAndWire(out);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbq).not.toHaveBeenCalled();
    expect(warnSpy).toHaveBeenCalled();
    warnSpy.mockRestore();
  });

  it("CONSENT: window.pagesmithConsent()==false -> weder Script-Load noch init/Event", () => {
    // BEWUSST KEIN fbq-Stub: bei (falschem) init wuerde der Bootstrap ein
    // connect.facebook.net-<script> einfuegen -> dessen Abwesenheit beweist
    // "kein Script-Load vor Consent" (Verschaerfung).
    vi.stubGlobal("pagesmithConsent", () => false);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(
      mountedDoc.querySelectorAll('script[src*="connect.facebook.net"]').length
    ).toBe(0);
    // window.fbq blieb undefiniert (kein init).
    expect(
      (globalThis as unknown as { fbq?: unknown }).fbq
    ).toBeUndefined();
  });

  it("verwaistes track-Mapping (ps-id fehlt) wird NICHT verdrahtet", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-zzzzzz", "Ghost")],
      "export",
      { metaPixelId: PIXEL }
    );
    // present-Filter greift typ-agnostisch -> leere Tabelle -> kein Script.
    expect(out).not.toContain("pagesmith-mappings");
    expect(out).not.toContain("Ghost");
  });
});

// ---------------------------------------------------------------------------
// GETEILTES CONSENT-GATE (Phase 11, zweite Scheibe).
//
// Alle Verhaltens-Tests hier FUEHREN AUS (mountAndWire evaluiert Gate + Wiring in
// Dokument-Reihenfolge) und pruefen WIRKUNGEN, nicht Zeichenketten: kein
// fbevents-Script im Dokument, kein fbq-Call, kein Beacon.
//
// DIE UMKEHR: Ein Objekt erlaubte frueher ALLES (`!!obj`). Jetzt entscheidet der
// Ziel-Schluessel, und ein fehlender verbietet. Ebenso wechseln Zeichenkette, Zahl,
// null und Feld von erlaubt auf verboten — die Verhaltensaenderung ist GROESSER als
// die Objektform allein.
// ---------------------------------------------------------------------------

describe("Consent-Gate: Auswertungsregel je Ziel (Phase 11, zweite Scheibe)", () => {
  // Feuert eine Track-Aktion mit gesetztem Pixel und meldet, ob Meta beruehrt wurde.
  // KEIN fbq-Stub: bleibt der Bootstrap aus, entsteht auch kein connect.facebook.net-
  // Script — dessen Abwesenheit ist der schaerfere Beweis (so wie im Bestandstest).
  function firedWithConsent(value: unknown): boolean {
    // HYGIENE, sonst misst der Test den VORGAENGER: Der fbevents-Bootstrap setzt
    // window.fbq SELBST (nicht per stubGlobal) -> vi.unstubAllGlobals raeumt ihn
    // nicht ab. Ein stehengebliebenes fbq loest im naechsten Mount den
    // Fremd-Pixel-Frueh-Ausstieg aus, es entstuende KEIN Script — ein erlaubter
    // Fall saehe dann wie ein verbotener aus. Real aufgetreten.
    delete (globalThis as unknown as { fbq?: unknown }).fbq;
    vi.stubGlobal("pagesmithConsent", value);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    return (
      mountedDoc.querySelectorAll('script[src*="connect.facebook.net"]').length > 0
    );
  }

  it("OBJEKT OHNE ZIEL-SCHLUESSEL -> nichts feuert (DIE UMKEHR)", () => {
    // Rot, wenn die Objekt-Auswertung wieder pauschal erlaubt (Mutation M1).
    expect(firedWithConsent(() => ({ pinterest: true }))).toBe(false);
  });

  it("OBJEKT MIT ZIEL-SCHLUESSEL true -> alles feuert (POSITIVKONTROLLE)", () => {
    // Ohne diesen Test zeigte der Test darueber nur, dass IRGENDETWAS blockiert,
    // nicht dass der SCHLUESSEL entscheidet.
    expect(firedWithConsent(() => ({ meta: true }))).toBe(true);
  });

  it("SCHLUESSELWERT TRUTHY STATT true (1) -> nichts feuert", () => {
    // Rot, wenn der Schluesselvergleich auf truthy aufweicht (Mutation M2).
    expect(firedWithConsent(() => ({ meta: 1 }))).toBe(false);
  });

  it("KEIN FUNKTIONSZWANG: Wert DIREKT gesetzt, Objekt mit Ziel-Schluessel -> feuert", () => {
    // Der Fall ist die naheliegendste Verwechslung, sobald die Objektform
    // dokumentiert ist. ALLEIN ist dieser Test NICHT diskriminierend: ein
    // zurueckkehrender Funktionszwang liesse einen Nicht-Funktions-Wert ebenfalls
    // durch (alte Fassung: "keine Funktion -> erlaubt"), das Ergebnis waere
    // dasselbe. Den Unterschied macht erst der Test darunter — gefunden durch die
    // Mutation M3, die hier zunaechst GRUEN blieb.
    expect(firedWithConsent({ meta: true })).toBe(true);
  });

  it("KEIN FUNKTIONSZWANG, VERBIETENDE RICHTUNG: Wert DIREKT gesetzt, Objekt OHNE Ziel-Schluessel -> nichts feuert", () => {
    // DER EINZELSTUECK-TEST FUER MUTATION M3: nur dieser Fall unterscheidet "der
    // direkte Wert wird AUSGEWERTET" von "ein Nicht-Funktions-Wert gilt als nichts
    // gesagt". Wer ihn entfernt, nimmt die einzige Absicherung des Funktionszwang-
    // Verbots mit.
    expect(firedWithConsent({ pinterest: true })).toBe(false);
  });

  it("ZEICHENKETTE zurueckgegeben -> nichts feuert (fail-closed)", () => {
    expect(firedWithConsent(() => "ja")).toBe(false);
  });

  it("KEIN HOOK -> feuert (bisher ungetestet, bleibt unveraendert)", () => {
    // Rot, wenn der Ausfallmodus auf verboten kippt (Mutation M4). "Nichts gesetzt"
    // heisst ERLAUBT: er hat nie entschieden.
    expect(firedWithConsent(undefined)).toBe(true);
  });

  it("HOOK WIRFT -> feuert nicht (bisher ungetestet, bleibt unveraendert)", () => {
    expect(
      firedWithConsent(() => {
        throw new Error("boom");
      })
    ).toBe(false);
  });
});

describe("Consent-Gate: FEHLT die Auswertung (Phase 11, zweite Scheibe)", () => {
  // Baut das Dokument wie mountAndWire, ENTFERNT aber den Consent-Block vor der
  // Auswertung. Damit ist der Zustand nachgestellt, den die strukturelle Garantie
  // ausschliessen soll — die Frage ist, was die Seite dann tut.
  function mountWithoutGate(output: string): void {
    // Reste aus Vorgaengertests abraeumen: __psConsent wird von deren evaluierten
    // Bloecken gesetzt und ueberlebt vi.unstubAllGlobals (kein stubGlobal).
    delete (globalThis as unknown as { __psConsent?: unknown }).__psConsent;
    delete (globalThis as unknown as { fbq?: unknown }).fbq;
    mountedDoc = new DOMParser().parseFromString(output, "text/html");
    vi.stubGlobal("document", mountedDoc);
    mountedDoc.querySelector("#pagesmith-consent")?.remove();
    for (const s of Array.from(mountedDoc.querySelectorAll("script"))) {
      if (s.id === "pagesmith-mappings") continue;
      window.eval(s.textContent ?? "");
    }
  }

  it("FEHLENDE Auswertung -> nichts feuert (fail-closed)", () => {
    // WAS DIESER TEST FAENGT: die FAIL-OPEN-Richtung — eine fehlende Auswertung als
    // "erlaubt" zu behandeln. Gemessen: rot, sobald der Aufruf nur noch bei
    // vorhandener Auswertung blockt.
    // WAS ER NICHT FAENGT, und das steht hier, damit niemand sich auf ihn verlaesst:
    // das ENTFERNEN der Existenzpruefung (Mutation M7). Dann wirft der Aufruf, der
    // Handler bricht ab — und "kein fbevents-Script" ist ebenfalls wahr, nur aus dem
    // falschen Grund. Diesen Fall faengt allein der REDIRECT-Test darunter.
    mountWithoutGate(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(
      mountedDoc.querySelectorAll('script[src*="connect.facebook.net"]').length
    ).toBe(0);
  });

  it("FEHLENDE Auswertung -> der Klick-Handler laeuft ZU ENDE: der REDIRECT findet statt", () => {
    // DER EIGENTLICHE GRUND DIESER PRUEFUNG: Er prueft die SEITE, nicht das
    // Tracking. Ein Wurf im Track-Zweig toetete die Kernfunktion der Kundenseite —
    // der Besucher klickt und landet nirgends.
    // EINZELSTUECK: Er ist der EINZIGE Test, der das Entfernen der Existenzpruefung
    // (Mutation M7) faengt — gemessen. Der Test darueber bleibt dabei gruen, weil
    // "nichts gefeuert" auch auf einen abgebrochenen Handler zutrifft. Wer diesen
    // Test als redundant entfernt, nimmt die einzige Absicherung mit.
    const html = `<!DOCTYPE html><html><body><a href="#" data-pagesmith-id="ps-aaaaaa">Los</a></body></html>`;
    mountWithoutGate(
      generateFunctional(
        html,
        [track("ps-aaaaaa", "Lead"), redirect("ps-aaaaaa", "https://ziel.example")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(hrefValue).toBe("https://ziel.example");
    expect(ev.defaultPrevented).toBe(true);
  });
});

describe("Consent-Gate: Platzierung im Dokument (Phase 11, zweite Scheibe)", () => {
  const GATE = 'id="pagesmith-consent"';

  it("der Block steht auch OHNE Pixel-ID im Output", () => {
    // Rot, wenn der Block wieder an die Pixel-ID gebunden wird (Mutation M5).
    const out = generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export");
    expect(out).toContain(GATE);
    expect(out).not.toContain("fbq(");
  });

  it("der Block steht VOR seinen Konsumenten", () => {
    // Rot, wenn die Einfuegereihenfolge kippt (Mutation M6). Ein Konsument vor der
    // Definition liefe ins Leere — im Browser entscheidet die Dokumentreihenfolge.
    const out = generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
      metaPixelId: PIXEL,
    });
    expect(out.indexOf(GATE)).toBeGreaterThan(-1);
    expect(out.indexOf(GATE)).toBeLessThan(out.indexOf("pagesmith-mappings"));
    expect(out.indexOf(GATE)).toBeLessThan(out.indexOf("__psMetaFire"));
  });

  it("REINE TEXTSEITE: kein Konsument -> KEIN Block, KEIN Script (Zusage unveraendert)", () => {
    const out = generateFunctional(
      "<!DOCTYPE html><html><body><h1>nur Text</h1></body></html>",
      [],
      "export",
      { metaPixelId: PIXEL }
    );
    expect(out).not.toContain(GATE);
    expect(out).not.toContain("pagesmith-mappings");
    expect(out).not.toContain("<script");
  });
});

// ---------------------------------------------------------------------------
// CAPI-Dedup-Beacon (Phase 6 Scheibe 2b-ii): neben fbq feuert __psMetaFire ein
// navigator.sendBeacon an /api/capi — hinter DEMSELBEN __psConsent-Gate, mit der
// GETEILTEN eid, als text/plain-Blob. Der eventID-Identitaets-Test ist der Kern
// der Scheibe (er bewacht das Dedup): er fuehrt das Wiring WIRKLICH aus und
// vergleicht die Beacon-Payload-eventID STRING-IDENTISCH mit der an fbq gereichten.
// ---------------------------------------------------------------------------

const PROXY = "https://app.pagesmith.io/api/capi";
const TK = "tk-public-123";
// sendBeacon-Stub: eigene own-Property auf dem jsdom-navigator (das eval'te Wiring
// liest window.navigator = dasselbe Objekt). Gibt true zurueck (wie der echte Beacon).
function stubBeacon() {
  const spy = vi.fn(() => true);
  (navigator as unknown as { sendBeacon: unknown }).sendBeacon = spy;
  return spy;
}
afterEach(() => {
  delete (navigator as unknown as { sendBeacon?: unknown }).sendBeacon;
});

describe("CAPI-Dedup-Beacon (Scheibe 2b-ii)", () => {
  it("DEDUP-KERN: Beacon-Payload.eventID === die an fbq gereichte eventID (STRING-IDENTISCH)", async () => {
    const fbq = stubFbq();
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');

    // Die eventID, die fbq bekam.
    const fbqEventId = fbqCalls(fbq, "track")[0][3].eventID as string;
    expect(typeof fbqEventId).toBe("string");
    expect(fbqEventId.length).toBeGreaterThan(0);

    // Genau EIN Beacon, an die absolute URL, als text/plain-Blob.
    expect(beacon).toHaveBeenCalledTimes(1);
    const [url, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe(PROXY);
    expect(blob.type).toBe("text/plain");

    const payload = JSON.parse(await blob.text());
    // DER Beweis: identische ID -> Meta faltet Browser- + Server-Event zu einem.
    expect(payload.eventID).toBe(fbqEventId);
    expect(payload.trackingKey).toBe(TK);
    expect(payload.event).toBe("Lead");
    expect(payload.isCustom).toBe(false);
  });

  it("STATISCH: genau EINE randomUUID-Quelle; fbq UND Beacon referenzieren dieselbe eid", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
    );
    // Kein zweiter Generator im Beacon-Zweig: genau EIN randomUUID()-AUFRUF (der
    // Ternary referenziert window.crypto.randomUUID zusaetzlich als Guard -> auf den
    // Aufruf mit Klammer zaehlen, nicht auf den Bezeichner).
    expect((out.match(/randomUUID\(/g) ?? []).length).toBe(1);
    // Der Beacon-Payload traegt "eventID: eid," (Trailing-Komma-Variante, nur im
    // Beacon) -> er referenziert dieselbe lokale eid wie fbq, kein zweiter Wert.
    expect(out).toContain("eventID: eid,");
  });

  it("value/currency/isCustom + eventSourceUrl landen im Beacon-Payload", async () => {
    stubFbq();
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [
          {
            elementId: "ps-aaaaaa",
            type: "track",
            config: { event: "MeinKauf", isCustom: true, value: 49.9, currency: "EUR" },
          },
        ],
        "export",
        { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
      )
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    const payload = JSON.parse(await blob.text());
    expect(payload.event).toBe("MeinKauf");
    expect(payload.isCustom).toBe(true);
    expect(payload.value).toBe(49.9);
    expect(payload.currency).toBe("EUR");
    // eventSourceUrl wird server-seitig NICHT ueberschrieben -> Client liefert es mit.
    expect("eventSourceUrl" in payload).toBe(true);
  });

  it("FAIL-LOUD: trackingKey gesetzt, aber proxyUrl leer -> KEIN sendBeacon, console.warn", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: "" }
    );
    expect(out).not.toContain("navigator.sendBeacon(");
    // Der fail-loud-Hinweis nennt die fehlende env — kein relativer Fallback.
    expect(out).toContain("NEXT_PUBLIC_APP_URL");
    expect(out).not.toContain('"/api/capi"');
    // Gegenprobe: proxyUrl gesetzt -> sendBeacon MIT absoluter URL, kein warn.
    const ok = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(ok).toContain("navigator.sendBeacon(");
    expect(ok).toContain(PROXY);
    expect(ok).not.toContain("NEXT_PUBLIC_APP_URL");
  });

  it("7b: RELATIVER /api/e-proxyUrl (Publish) -> sendBeacon('/api/e'), text/plain, KEIN warn", async () => {
    // Die gehostete Publish-Variante bekommt den relativen Pfad (same-origin) -> er ist
    // truthy, also KEIN fail-loud, und wird 1:1 als Beacon-Ziel eingebacken (keine env).
    stubFbq();
    const beacon = stubBeacon();
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: "/api/e" }
    );
    expect(out).toContain("navigator.sendBeacon(");
    expect(out).toContain('"/api/e"');
    expect(out).not.toContain("NEXT_PUBLIC_APP_URL");
    mountAndWire(out);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    const [url, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe("/api/e");
    expect(blob.type).toBe("text/plain");
  });

  it("kein trackingKey -> STILL: weder Beacon noch Warnung (wie 'keine Pixel-ID')", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: "", capiProxyUrl: PROXY }
    );
    expect(out).not.toContain("navigator.sendBeacon(");
    expect(out).not.toContain("NEXT_PUBLIC_APP_URL");
  });

  it("CONSENT: pagesmithConsent()==false -> WEDER fbq NOCH Beacon (selbes Gate)", () => {
    const fbq = stubFbq();
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", () => false);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbq).not.toHaveBeenCalled();
    expect(beacon).not.toHaveBeenCalled();
  });

  it("Redirect+Track: Beacon feuert VOR der Navigation; Redirect unveraendert", () => {
    stubFbq();
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://x.com", true), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(openSpy).toHaveBeenCalledWith("https://x.com", "_blank");
    // sendBeacon (im Track-Zweig) lief VOR window.open (navigationssicher).
    expect(beacon.mock.invocationCallOrder[0]).toBeLessThan(
      openSpy.mock.invocationCallOrder[0]
    );
  });

  it("EDIT bleibt beacon-frei: editPreviewHtml injiziert nie ein sendBeacon/fbq", () => {
    const { html: previewHtml, elements } = annotateAndDetect("<h1>Alt</h1>");
    const out = editPreviewHtml(previewHtml, [text(elements[0].id, "Neu")], "a");
    expect(out).not.toContain("navigator.sendBeacon(");
    expect(out).not.toContain("fbq(");
  });
});

// ---------------------------------------------------------------------------
// DIE KOPPLUNG BEACON<->PIXEL-ID (Phase 11, achte Scheibe — BASIS-TEST).
//
// WARUM DIESE TESTS EXISTIEREN, obwohl sie einen Zustand behaupten, der gleich
// aufgehoben wird: Bis heute war die Kopplung von KEINEM Test gedeckt. Sie ist
// kein zugesicherter Zustand, sondern ein NEBENEFFEKT davon, dass der
// Beacon-Rumpf in __psMetaFire hineingesplicet wird — und __psMetaFire entsteht
// nur mit Pixel-ID. Wer sie loeste, braeche nichts Rotes; "absichtlich geloest"
// und "nebenbei verloren" waeren am Ergebnis nicht zu unterscheiden.
//
// DIE REIHENFOLGE IST DER GANZE BEWEIS: Diese Tests laufen GRUEN, BEVOR die
// Kopplung angefasst wird. Ein Test, der erst nach dem Umbau entsteht, kann den
// Ausgangszustand nie mehr belegen.
//
// SIE PRUEFEN AUSGEFUEHRT, NICHT ALS ZEICHENKETTE: Ein Zeichenketten-Test auf
// die Abwesenheit von "navigator.sendBeacon(" saehe identisch aus, wenn der
// Rumpf zwar entstuende, aber nie erreicht wuerde. Geprueft wird der SPY.
//
// POSITIVKONTROLLE IST PFLICHT, weil beide ueberwiegend ABWESENHEIT pruefen:
// ohne sie waere ein kaputter Stub von einem echten Nicht-Treffer nicht zu
// unterscheiden.
// ---------------------------------------------------------------------------

// UMGEDREHT AM 2026-08-08, IN EINEM EIGENEN SCHRITT — und die Richtung gehoert
// hierher, sonst ist der Beweis spaeter nicht mehr lesbar:
//
// DIESE BEIDEN TESTS BEHAUPTETEN ZUERST DAS GEGENTEIL ("ohne Pixel-ID entsteht
// KEIN Beacon") UND LIEFEN GRUEN. Damit war die alte Kopplung erstmals belegt —
// sie war bis dahin von keinem Test gedeckt, also nicht von einem Nebeneffekt zu
// unterscheiden. Dann hat der Bau sie GEZIELT rot gemacht; genau diese zwei und
// keine anderen. Erst danach wurde die Erwartung invertiert.
//
// WARUM DIE REIHENFOLGE DER GANZE BEWEIS IST: Ein Test, der erst NACH dem Umbau
// entsteht, kann nie zeigen, dass die Kopplung vorher bestand. "Absichtlich
// geloest" und "nebenbei verloren" saehen an ihm identisch aus.
describe("Beacon OHNE Pixel-ID (Phase 11, achte Scheibe)", () => {
  it("Klick OHNE Pixel-ID -> sendBeacon feuert (Gegenprobe: MIT Pixel-ID unveraendert)", () => {
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        // KEIN metaPixelId — trackingKey und Proxy sind gesetzt, es fehlt ALLEIN
        // der Pixel. Damit haengt das Ergebnis an nichts anderem.
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).toHaveBeenCalledTimes(1);

    // --- GEGENPROBE: derselbe Aufbau, nur mit Pixel-ID (Invariante 1) ---
    stubFbq();
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).toHaveBeenCalledTimes(2);
  });

  // DIE ZWEITE EINSETZ-STELLE, und sie ist die, die man vergisst: Der
  // Klick-Handler und der auxclick-Handler bekommen BEIDE dieselbe
  // Track-Anweisung eingesetzt. Ein Test nur auf dem Klick-Pfad deckte die
  // Haelfte der Verdrahtung — und der Mittelklick ("im neuen Tab oeffnen") ist
  // auf einer Landingpage kein Randfall.
  it("MITTELKLICK OHNE Pixel-ID -> sendBeacon feuert (Gegenprobe: MIT Pixel-ID unveraendert)", () => {
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(MAPPED_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(beacon).toHaveBeenCalledTimes(1);

    stubFbq();
    mountAndWire(
      generateFunctional(MAPPED_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(beacon).toHaveBeenCalledTimes(2);
  });

  // RECHTSKLICK-SCHUTZ, mitgezogen: Der button-Guard im auxclick-Zweig ist aelter
  // als diese Scheibe, aber er lag bisher NUR auf dem fbq-Pfad. Jetzt schuetzt er
  // auch den Beacon vor einer Ghost-Conversion aus dem Kontextmenue.
  it("RECHTSKLICK OHNE Pixel-ID -> KEIN sendBeacon", () => {
    const beacon = stubBeacon();
    mountAndWire(
      generateFunctional(MAPPED_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    aux('[data-pagesmith-id="ps-aaaaaa"]', 2);
    expect(beacon).not.toHaveBeenCalled();
  });

  // OHNE JEDE KONFIGURATION bleibt alles wie zuvor. Das ist die Untergrenze der
  // Scheibe: Sie fuegt nichts hinzu, wo es nichts zu senden gibt — insbesondere
  // KEINE Laufzeit und damit KEINE zusaetzliche Einwilligungs-Fragestelle.
  it("weder Pixel noch trackingKey -> KEINE Laufzeit, KEIN Beacon, KEINE Fragestelle", () => {
    const beacon = stubBeacon();
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export"
    );
    expect(out).not.toContain("__psMetaFire(cfg)");
    expect(out).not.toContain("__psConsent(");
    mountAndWire(out);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).not.toHaveBeenCalled();
  });
});

describe("Invariante 3: EINE Kennung fuer alle drei Verbraucher", () => {
  // AUSGEFUEHRT fuer zwei der drei Verbraucher — schaerfer geht es hier nicht:
  // Die Bestaetigung laesst sich ohne Simulation des Ladezustands nicht ausfuehren,
  // sie ist deshalb als Zeichenkette gedeckt (Test darunter). Der Bestandstest
  // "DEDUP-KERN" prueft dieselbe Achse MIT Pixel; dieser hier ist sein
  // Gegenstueck OHNE.
  it("OHNE Pixel-ID traegt der Beacon eine eid, und es gibt nur EINEN Erzeuger im Text", async () => {
    const beacon = stubBeacon();
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { trackingKey: TK, capiProxyUrl: PROXY }
    );
    // GENAU EINE Erzeugungsstelle. Zwei waeren der lautlose Bruch: Metas Dedup
    // und der Verlustraten-Join haengen beide an der Identitaet dieses Wertes.
    expect(out.split("window.crypto.randomUUID()").length - 1).toBe(1);

    mountAndWire(out);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    const [url, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe(PROXY);
    expect(blob.type).toBe("text/plain");
    const payload = JSON.parse(await blob.text());
    expect(typeof payload.eventID).toBe("string");
    expect(payload.eventID.length).toBeGreaterThan(0);
    expect(payload.trackingKey).toBe(TK);
    expect(payload.event).toBe("Lead");
  });

  it("MIT Pixel-ID lesen fbq, Beacon UND Bestaetigung denselben Bezeichner", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(out.split("window.crypto.randomUUID()").length - 1).toBe(1);
    expect(out).toContain('fbq("track", cfg.event, params, { eventID: eid })');
    expect(out).toContain("eventID: eid");
    expect(out).toContain("__psConfirm(eid, cfg.event);");
  });
});

describe("Invariante 4: die Zahl der Fragestellen im erzeugten Text", () => {
  // LESART (A), ENTSCHIEDEN: gezaehlt werden FRAGESTELLEN IM TEXT, nicht Aufrufe
  // pro Klick. Lesart (B) haelt heute auch — aber nur, weil zwei Zweige zufaellig
  // disjunkt sind; sie ist nur durch Nachdenken ueber Erreichbarkeit pruefbar.
  // (A) ist zaehlbar, und dieser Test zaehlt.
  //
  // DIE ARITHMETIK, weil dieser Test nur einen TEIL des Dokuments sieht: Die
  // dritte Fragestelle steckt im PageView-Emitter, den erst der Server beim
  // Publish anhaengt. Hier zaehlbar sind also zwei (mit Pixel: __psMetaInit und
  // __psMetaFire) bzw. eine (ohne Pixel: nur __psMetaFire) — plus die des
  // Emitters ergibt das DREI bzw. ZWEI auf der fertigen Seite.
  function fragestellen(out: string): number {
    return out.split("__psConsent(").length - 1;
  }

  it("MIT Pixel-ID: ZWEI im Wiring — unveraendert gegenueber vorher", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(fragestellen(out)).toBe(2);
  });

  it("OHNE Pixel-ID: EINE im Wiring — nicht null und nicht zwei", () => {
    // NICHT NULL, weil Invariante 5 sie verlangt: ohne Metas Einwilligung geht
    // weiterhin kein Beacon. NICHT ZWEI, weil __psMetaInit gar nicht entsteht.
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(fragestellen(out)).toBe(1);
  });
});

describe("Invariante 5: ohne Metas Einwilligung geht weiterhin kein Beacon", () => {
  it("OHNE Pixel-ID und Einwilligung verweigert -> KEIN Beacon", () => {
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", () => false);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).not.toHaveBeenCalled();
  });

  it("OHNE Pixel-ID und Einwilligung NUR fuer ein anderes Ziel -> KEIN Beacon", () => {
    // DIE SCHAERFERE FASSUNG: Der Besucher hat etwas erlaubt, nur nicht Meta. Dass
    // hier trotzdem nichts geht, IST der Zustand, den die neunte Scheibe aufloest —
    // er steht hier als Zusicherung, damit sein Wegfall dort SICHTBAR wird.
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", { pinterest: true });
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).not.toHaveBeenCalled();
  });

  it("OHNE Pixel-ID und Einwilligung fuer Meta -> Beacon feuert (Positivkontrolle)", () => {
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", { meta: true });
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(beacon).toHaveBeenCalledTimes(1);
  });

  it("GENAU EIN Hook-Aufruf pro Klick ohne Pixel-ID (kein zweites Erfragen)", () => {
    // Die Zahl der AUFRUFE ist die zweite Achse neben der Zahl der Fundstellen.
    // Beide zusammen decken Invariante 4; einzeln taete es keine.
    const hook = vi.fn(() => true);
    stubBeacon();
    vi.stubGlobal("pagesmithConsent", hook);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(hook).toHaveBeenCalledTimes(1);
  });
});

describe("Die Bestaetigungs-Maschinerie bleibt an der Pixel-ID", () => {
  // ENTSCHEIDUNG DER SCHEIBE, kein Uebersehen: Die Bestaetigung misst Adblocking
  // ueber METAS Script-Load. Ohne Meta gibt es nichts zu messen — die
  // Verlustrate bleibt Meta-gebunden.
  // ZEICHENKETTE STATT AUSFUEHRUNG, offen benannt: Der Ladezustand liesse sich
  // nur mit einer Simulation des fbevents-Ladevorgangs ausfuehren; das ist eine
  // eigene Arbeit. Die Positivkontrolle darunter macht den Unterschied zwischen
  // "nicht da" und "Test misst nichts" sichtbar.
  it("OHNE Pixel-ID: keine Bestaetigungs-Maschinerie im Text", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(out).not.toContain("__psConfirm(");
    expect(out).not.toContain("__psPixelResolve");
    expect(out).not.toContain("__psConfirmQueue");
  });

  it("MIT Pixel-ID: sie ist vollstaendig da (Positivkontrolle)", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-aaaaaa", "Lead")],
      "export",
      { metaPixelId: PIXEL, trackingKey: TK, capiProxyUrl: PROXY }
    );
    expect(out).toContain("__psConfirm(");
    expect(out).toContain("__psPixelResolve");
    expect(out).toContain("__psConfirmQueue");
  });
});

// ---------------------------------------------------------------------------
// Text-Override (Phase 5): in der VORSCHAU ersetzt das Wiring beim Laden den
// textContent per ps-id; im EXPORT wird der Typ gar nicht erst eingebacken.
// ---------------------------------------------------------------------------

const TEXT_DOC = `<!DOCTYPE html><html><body><h1 data-pagesmith-id="ps-tttttt">Alt</h1></body></html>`;
const textOf = (id: string) =>
  mountedDoc.querySelector(`[data-pagesmith-id="${id}"]`)?.textContent;

describe("Text-Override – Vorschau ersetzt textContent", () => {
  it("setzt den textContent des Zielelements auf config.content", () => {
    mountAndWire(
      generateFunctional(TEXT_DOC, [text("ps-tttttt", "Neu & frisch")], "preview")
    );
    expect(textOf("ps-tttttt")).toBe("Neu & frisch");
  });

  it("verwaistes text-Mapping (ps-id fehlt) wird NICHT angewandt", () => {
    mountAndWire(
      generateFunctional(TEXT_DOC, [text("ps-zzzzzz", "Geist")], "preview")
    );
    // Das vorhandene Element bleibt unveraendert; der Geist taucht nirgends auf.
    expect(textOf("ps-tttttt")).toBe("Alt");
  });

  it("content mit \" und </script> ueberlebt den Round-Trip und landet als LITERALER Text", () => {
    const evil = `Hallo </script><script>alert(1)</script> Welt`;
    const out = generateFunctional(TEXT_DOC, [text("ps-tttttt", evil)], "preview");
    // Datenblock-Round-Trip heil.
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(tc(table[0]).content).toBe(evil);
    // Der Bruchstring darf nicht roh im Output stehen ("<" maskiert).
    expect(out).not.toContain("</script><script>alert(1)");
    // Und beim Anwenden ist es reiner Text (textContent parst nie HTML).
    mountAndWire(out);
    expect(textOf("ps-tttttt")).toBe(evil);
  });
});

// ---------------------------------------------------------------------------
// Text-Export (Phase 5, Scheibe 2): im EXPORT wird ein type:"text"-Override DIREKT
// in den DOM gebacken (das <h1> traegt im Output schon den neuen Text), NICHT per
// Laufzeit-JS. Bake-Pass (Text) und Wiring-Pass (Redirect) treffen disjunkte
// Element-Mengen.
// ---------------------------------------------------------------------------

const MIXED_DOC = `<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa">B</button><h1 data-pagesmith-id="ps-tttttt">Alt</h1></body></html>`;

describe("Text-Export – direkt-in-DOM-Bake", () => {
  it("backt den Override als ECHTEN textContent in den DOM (Gegenprobe: Originaltext weg)", () => {
    const out = generateFunctional(TEXT_DOC, [text("ps-tttttt", "Neu")], "export");
    // Der gebackene Text steht im geparsten Output-DOM.
    const doc = new DOMParser().parseFromString(out, "text/html");
    expect(
      doc.querySelector('[data-pagesmith-id="ps-tttttt"]')?.textContent
    ).toBe("Neu");
    // Gegenprobe: der Originaltext ist fuer dieses Element NICHT mehr da.
    expect(out).not.toContain("Alt");
  });

  it("reine-Text-Seite -> KEIN Wiring-Script/Datenblock im Output (ohne-JS)", () => {
    const out = generateFunctional(TEXT_DOC, [text("ps-tttttt", "Neu")], "export");
    // Diskriminierend gegen UNSERE Marker (User-HTML duerfte eigene Scripts haben):
    // kein Datenblock, keine Wiring-Signatur.
    expect(out).not.toContain(`id="pagesmith-mappings"`);
    expect(out).not.toContain("addEventListener");
    // Aber der Text ist trotzdem gebacken.
    const doc = new DOMParser().parseFromString(out, "text/html");
    expect(
      doc.querySelector('[data-pagesmith-id="ps-tttttt"]')?.textContent
    ).toBe("Neu");
  });

  it("gemischt: Text NICHT im Datenblock, Redirect IST drin (bei vorhandener Tabelle)", () => {
    const out = generateFunctional(
      MIXED_DOC,
      [redirect("ps-aaaaaa", "https://b.com"), text("ps-tttttt", "Neu")],
      "export"
    );
    const table = readTable(out);
    // Scharfer Diskriminator: Text raus, Redirect drin.
    expect(table).toHaveLength(1);
    expect(table[0].type).toBe("redirect");
    expect(table[0].elementId).toBe("ps-aaaaaa");
    expect(table.some((m) => m.elementId === "ps-tttttt")).toBe(false);
  });

  it("Disjunktheit: Text gebacken UND Redirect verdrahtet auf derselben Seite", () => {
    const out = generateFunctional(
      MIXED_DOC,
      [redirect("ps-aaaaaa", "https://b.com"), text("ps-tttttt", "Neu")],
      "export"
    );
    // Bake-Pass: h1 traegt den neuen Text.
    const doc = new DOMParser().parseFromString(out, "text/html");
    expect(
      doc.querySelector('[data-pagesmith-id="ps-tttttt"]')?.textContent
    ).toBe("Neu");
    // Wiring-Pass: Redirect-URL + Handler vorhanden.
    expect(out).toContain("b.com");
    expect(out).toContain("addEventListener");
  });

  it("verwaistes text-Mapping (ps-id fehlt) -> nicht gebacken, nicht im Output", () => {
    const out = generateFunctional(TEXT_DOC, [text("ps-zzzzzz", "Geist")], "export");
    const doc = new DOMParser().parseFromString(out, "text/html");
    // Vorhandenes Element unveraendert; der Geist taucht nirgends auf.
    expect(
      doc.querySelector('[data-pagesmith-id="ps-tttttt"]')?.textContent
    ).toBe("Alt");
    expect(out).not.toContain("Geist");
  });

  it("textContent-Senke: </script>/Markup im Override wird inerter Text, kein roher Bruch", () => {
    const evil = `Hallo </script><script>alert(1)</script> Welt`;
    const out = generateFunctional(TEXT_DOC, [text("ps-tttttt", evil)], "export");
    // Kein roher Bruchstring im Output.
    expect(out).not.toContain("</script><script>alert(1)");
    // Als textContent geparst kommt der literale Text zurueck.
    const doc = new DOMParser().parseFromString(out, "text/html");
    expect(
      doc.querySelector('[data-pagesmith-id="ps-tttttt"]')?.textContent
    ).toBe(evil);
  });
});

// ---------------------------------------------------------------------------
// EDIT-Modus: Text-Overrides werden auch im Editieren-iframe angewandt, aber das
// Click-Wiring bleibt vorschau-/export-exklusiv (Klicks gehoeren der Bruecke).
// ---------------------------------------------------------------------------

describe("Text-Override – Editieren wendet Text an, OHNE Click-Wiring", () => {
  it("setzt textContent im edit-Modus", () => {
    mountAndWire(
      generateFunctional(TEXT_DOC, [text("ps-tttttt", "Neu im Edit")], "edit")
    );
    expect(textOf("ps-tttttt")).toBe("Neu im Edit");
  });

  it("backt redirects NICHT ein (text-only Tabelle, kein URL-Ballast)", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [redirect("ps-aaaaaa", "https://b.com")],
      "edit"
    );
    // edit-Tabelle ist text-only -> der redirect ist NICHT eingebacken, die URL
    // taucht nirgends im Output auf. (Dass KEIN Click-Handler feuert, beweist die
    // verhaltensbasierte Gegenprobe unten — das Wiring-Script ist statisch und
    // enthaelt den Handler-Quelltext immer, gegated nur zur Laufzeit per MODE.)
    expect(readTable(out)).toHaveLength(0);
    expect(out).not.toContain("b.com");
  });

  it("GEGENPROBE: redirect-Klick im edit-Modus loest NICHT aus", () => {
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://b.com")],
        "edit"
      )
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
  });

  it("</script>-content ueberlebt den Round-Trip auch im edit-Modus (literaler Text)", () => {
    const evil = `x </script><script>alert(1)</script> y`;
    const out = generateFunctional(TEXT_DOC, [text("ps-tttttt", evil)], "edit");
    expect(tc(readTable(out)[0]).content).toBe(evil);
    expect(out).not.toContain("</script><script>alert(1)");
    mountAndWire(out);
    expect(textOf("ps-tttttt")).toBe(evil);
  });
});

describe("editPreviewHtml – Komposition auf der Selektions-Bruecke", () => {
  const BRIDGE_SOURCE = "<h1>Alt</h1>";

  it("KURZSCHLUSS: ohne text-Mapping == previewHtml + Varianten-Marker (byte-identisch)", () => {
    const previewHtml = annotateAndDetect(BRIDGE_SOURCE).html;
    // SCHAERFE UNVERAENDERT, ERWARTUNG NACHGEZOGEN (Phase 9 Scheibe 9a): der
    // Kurzschluss ueberspringt weiterhin den Re-Parse und laesst previewHtml
    // unangetastet — er haengt nur den Varianten-Marker an. Die Assertion bleibt
    // BYTE-EXAKT (toBe auf den zusammengesetzten String), sie wurde NICHT auf ein
    // weiches toContain aufgeweicht. Dass der Marker AUCH hier haengt, ist der Kern
    // des Fixes: ohne ihn liefert der Kurzschluss fuer BEIDE Varianten denselben
    // String, das Edit-iframe laedt beim Umschalten nicht neu und zeigt weiter den
    // per PS_SET_TEXT gepatchten DOM der anderen Variante.
    // leere Mappings UND ein reines redirect-Mapping schliessen beide kurz.
    expect(editPreviewHtml(previewHtml, [], "a")).toBe(
      previewHtml + editVariantMarker("a")
    );
    expect(
      editPreviewHtml(previewHtml, [redirect("ps-aaaaaa", "https://b.com")], "b")
    ).toBe(previewHtml + editVariantMarker("b"));
  });

  it("MARKER unterscheidet die Varianten (der eigentliche Reload-Ausloeser)", () => {
    const previewHtml = annotateAndDetect(BRIDGE_SOURCE).html;
    // Identische Eingaben, nur die Variante unterscheidet sich -> die Strings
    // MUESSEN divergieren, sonst schreibt React das srcDoc-Attribut nicht.
    expect(editPreviewHtml(previewHtml, [], "a")).not.toBe(
      editPreviewHtml(previewHtml, [], "b")
    );
  });

  it("mit text-Override: Bruecke ueberlebt den Re-Parse FUNKTIONAL + Override im Datenblock", () => {
    const { html: previewHtml, elements } = annotateAndDetect(BRIDGE_SOURCE);
    const id = elements[0].id;
    // Sanity: previewHtml traegt die Bruecke + den Anker.
    expect(previewHtml).toContain("ELEMENT_CLICKED");

    const out = editPreviewHtml(previewHtml, [text(id, "Neu")], "a");
    // Bruecken-Marker + Anker-Attribut bleiben nach dem Re-Parse erhalten.
    expect(out).toContain("ELEMENT_CLICKED");
    expect(out).toContain("IFRAME_READY");
    expect(out).toContain("SET_SELECTED_ID");
    expect(out).toContain(`data-pagesmith-id="${id}"`);
    // Der Override liegt im (einzigen) Datenblock.
    const table = readTable(out);
    expect(table).toHaveLength(1);
    expect(tc(table[0]).content).toBe("Neu");
  });
});

// =============================================================================
// T7 — DIE AEQUIVALENZ (Scheibe Leere-Variante-Riegel, Auflage 2)
//
// WOZU DIESER TEST DA IST: Der Leer-Riegel prueft auf dem SERVER das
// functionalHtml, der Client-Guard prueft das ROH-HTML. Das ist nur dann EIN
// Urteil und nicht zwei, wenn gilt:
//
//   leerer Roh-Input  <=>  leeres funktionales Dokument
//
// Die Aequivalenz haengt an EINER Zeile: `if (!html || !html.trim()) return "";`
// steht als ERSTE Anweisung im Rumpf von generateFunctional — vor dem SSR-Guard,
// vor dem DOMParser und vor der Meta-Injektion. Wandert sie unter die
// Meta-Injektion, liefert ein leeres Projekt MIT Pixel plötzlich ein nicht-leeres
// Dokument, die Aequivalenz bricht STILL, und die Begruendung fuer Invariante (v)
// faellt mit ihr.
//
// Deshalb wird sie hier FESTGENAGELT statt in der Doku behauptet. Der Pixel-Fall
// ist der eigentliche Punkt: OHNE ihn liefe der Test auch dann gruen, wenn die
// Meta-Runtime vor der Leer-Pruefung eingebaut wuerde.
// =============================================================================
describe("T7 Aequivalenz: leerer Roh-Input <=> leeres funktionales Dokument", () => {
  // Bewusst KEIN Import von nonEmptyHtml-Duplikat: dieselbe Funktion, die der
  // Riegel benutzt.
  const PIXEL = "123456789012345";

  const FIXTURES: { raw: string; leer: boolean; warum: string }[] = [
    { raw: "", leer: true, warum: "leerer String" },
    { raw: "   ", leer: true, warum: "nur Leerzeichen" },
    { raw: "\n\t\r ", leer: true, warum: "nur Whitespace" },
    // Die NICHT-leere Seite der Tabelle dokumentiert zugleich die ehrliche Grenze
    // (B5): visuell leer, aber string-nicht-leer -> kommt DURCH, in BEIDEN Welten.
    { raw: "<div></div>", leer: false, warum: "visuell leer, aber nicht string-leer" },
    { raw: "<!-- nur ein kommentar -->", leer: false, warum: "reiner Kommentar" },
    { raw: "<html><body>Hallo</body></html>", leer: false, warum: "echter Inhalt" },
  ];

  for (const { raw, leer, warum } of FIXTURES) {
    it(`${JSON.stringify(raw).slice(0, 24)} (${warum}) — MIT konfiguriertem Pixel`, () => {
      const doc = generateFunctional(raw, [], "export", {
        metaPixelId: PIXEL,
        trackingKey: "tk-1",
        capiProxyUrl: "/api/e",
      });
      expect(nonEmptyHtml(doc) === null).toBe(leer);
      expect(nonEmptyHtml(raw) === null).toBe(leer);
      // Die eigentliche Aussage, als Gleichung statt als zwei Einzelwerte.
      expect(nonEmptyHtml(doc) === null).toBe(nonEmptyHtml(raw) === null);
    });

    it(`${JSON.stringify(raw).slice(0, 24)} (${warum}) — OHNE Pixel`, () => {
      const doc = generateFunctional(raw, [], "export");
      expect(nonEmptyHtml(doc) === null).toBe(nonEmptyHtml(raw) === null);
    });
  }

  it("POSITIV-GEGENPROBE: mit Pixel wird bei ECHTEM Inhalt sehr wohl Meta-Runtime gebacken", () => {
    // Ohne diese Probe koennte die Tabelle oben auch von einem generateFunctional
    // erfuellt werden, das die Pixel-Option schlicht ignoriert — dann pruefte T7
    // die Abwesenheit eines nie erzeugten Effekts.
    // Der Anker MUSS im HTML existieren: generateFunctional filtert Orphans raus
    // und injiziert im Export-Modus gar kein Script, wenn die Tabelle leer bleibt.
    // (Erste Fassung dieses Tests hatte genau diesen Fehler und wurde vom
    // fehlschlagenden Lauf gefangen — die Gegenprobe hat sich sofort bezahlt.)
    const doc = generateFunctional(
      '<html><body><button data-pagesmith-id="ps-1">x</button></body></html>',
      [track("ps-1", "Purchase")],
      "export",
      { metaPixelId: PIXEL, trackingKey: "tk-1", capiProxyUrl: "/api/e" }
    );
    expect(doc).toContain(PIXEL);
  });
});

// ===========================================================================
// HAELFTE B — EINE ZIEHUNG, N ANTWORTEN (Phase 11, neunte Scheibe).
//
// AUSGEFUEHRT, nicht gelesen: Die Text-Waechter liegen in
// tracking/meta.consent-wire.test.ts. Hier steht die WIRKUNG im fertigen
// Dokument — wie oft der Betreiber-Hook gefragt wird, und was die vier Wachen
// tun.
// ===========================================================================

const ZIELE = ["meta", "pinterest"];

describe("HAELFTE B: der Hook wird pro Klick GENAU EINMAL gefragt", () => {
  function fireWith(consent: unknown, targets = ZIELE) {
    delete (globalThis as unknown as { fbq?: unknown }).fbq;
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", consent);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
        consentTargets: targets,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    return beacon;
  }

  it("EIN Aufruf pro Klick — AUCH mit Pixel-ID (vorher waren es zwei)", async () => {
    // DER TEST, DER DIE ENTSCHEIDUNG BEWEIST. Vor dieser Haelfte fragten
    // __psMetaFire UND __psMetaInit je einmal; beim ersten Klick waren das ZWEI
    // Ziehungen. ROT DURCH M1.
    const hook = vi.fn(() => ({ meta: true, pinterest: true }));
    fireWith(hook);
    expect(hook).toHaveBeenCalledTimes(1);
  });

  it("ein Hook, der beim ZWEITEN Aufruf anders antwortet, kann nichts mehr spalten", async () => {
    // Vorher haette __psMetaFire die erste Antwort gesehen und __psMetaInit die
    // zweite: Der Beacon waere gegangen, das Pixel nicht geladen worden — zwei
    // Aussagen aus zwei Momenten in EINEM Klick.
    const hook = vi
      .fn()
      .mockReturnValueOnce({ meta: true, pinterest: true })
      .mockReturnValue({ meta: false, pinterest: false });
    const beacon = fireWith(hook);

    expect(hook).toHaveBeenCalledTimes(1);
    expect(beacon).toHaveBeenCalledTimes(1);
    const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    const payload = JSON.parse(await blob.text());
    expect(payload.cns).toEqual({ meta: true, pinterest: true });
  });

  it("JE KLICK wird neu gezogen — kein Zwischenspeicher ueber Ereignisse", () => {
    const hook = vi.fn(() => ({ meta: true, pinterest: true }));
    fireWith(hook);
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(hook).toHaveBeenCalledTimes(2);
  });
});

describe("HAELFTE B: die vier Wachen, einzeln", () => {
  function run(consent: unknown, targets = ZIELE) {
    delete (globalThis as unknown as { fbq?: unknown }).fbq;
    const beacon = stubBeacon();
    const fbq = vi.fn();
    vi.stubGlobal("pagesmithConsent", consent);
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
        consentTargets: targets,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');
    return {
      beacon,
      fbq,
      script:
        mountedDoc.querySelectorAll('script[src*="connect.facebook.net"]').length,
    };
  }

  it("WACHE 1+2: Meta VERBOTEN, ein anderes Ziel erlaubt -> KEIN Script, KEIN fbq", () => {
    // ROT DURCH M4 an Wache 1. Und die eigentliche Aussage dieser Haelfte: Der
    // Klick bricht NICHT mehr ab, nur weil Meta verboten ist.
    const r = run({ meta: false, pinterest: true });
    expect(r.script).toBe(0);
    expect(
      (globalThis as unknown as { fbq?: { mock?: unknown } }).fbq
    ).toBeUndefined();
  });

  it("WACHE 4: Meta verboten, ein anderes Ziel erlaubt -> der Beacon geht TROTZDEM", async () => {
    // DIE UMKEHR, fuer die diese Haelfte existiert. Vor ihr toetete ein einziges
    // Nein von Meta alles; der Server bekam nie die Gelegenheit, je Ziel zu
    // entscheiden.
    const r = run({ meta: false, pinterest: true });
    expect(r.beacon).toHaveBeenCalledTimes(1);
    const [, blob] = r.beacon.mock.calls[0] as unknown as [string, Blob];
    expect(JSON.parse(await blob.text()).cns).toEqual({
      meta: false,
      pinterest: true,
    });
  });

  it("WACHE 4: KEIN Ziel erlaubt -> gar nichts, und trotzdem kein Wurf", () => {
    // ROT DURCH M4 an Wache 4 (Invariante 5).
    const r = run({ meta: false, pinterest: false });
    expect(r.beacon).not.toHaveBeenCalled();
    expect(r.script).toBe(0);
  });

  it("POSITIVKONTROLLE: beide erlaubt -> Script, fbq-Bootstrap UND Beacon", async () => {
    // Ohne sie zeigten die drei Tests darueber nur, dass IRGENDETWAS blockiert.
    const r = run({ meta: true, pinterest: true });
    expect(r.script).toBe(1);
    expect(r.beacon).toHaveBeenCalledTimes(1);
    const [, blob] = r.beacon.mock.calls[0] as unknown as [string, Blob];
    expect(JSON.parse(await blob.text()).cns).toEqual({
      meta: true,
      pinterest: true,
    });
  });

  it("INVARIANTE 1: EIN Ziel in der Liste -> die Nutzlast ist die von vorher", async () => {
    // Der Draht eines Projekts mit nur einer Kennung aendert sich NICHT — weder
    // im Inhalt noch in der Zahl der Schluessel.
    const r = run({ meta: true }, ["meta"]);
    const [, blob] = r.beacon.mock.calls[0] as unknown as [string, Blob];
    expect(JSON.parse(await blob.text()).cns).toEqual({ meta: true });
  });

  it("INVARIANTE 3: fbq und Beacon teilen weiterhin DIESELBE Kennung", async () => {
    // ROT DURCH M3, und er ist auf dem NEUEN Pfad der einzige Waechter dafuer:
    // Der bestehende Dedup-Test uebergibt KEINE Ziel-Liste und deckt damit nur
    // den alten Pfad. Zwei Erzeugungsstellen braechen Metas Deduplizierung UND
    // den Verlustraten-Join — lautlos, weil beide Werte fuer sich gueltig
    // aussehen.
    const fbq = stubFbq();
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", { meta: true, pinterest: true });
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
        trackingKey: TK,
        capiProxyUrl: PROXY,
        consentTargets: ZIELE,
      })
    );
    click('[data-pagesmith-id="ps-aaaaaa"]');

    const fbqEventId = fbqCalls(fbq, "track")[0][3].eventID as string;
    const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
    const payload = JSON.parse(await blob.text());
    expect(typeof fbqEventId).toBe("string");
    expect(fbqEventId.length).toBeGreaterThan(0);
    expect(payload.eventID).toBe(fbqEventId);
  });
});

// ===========================================================================
// SCHATTEN-KORREKTUR (Phase 12.5, Scheibe 1; Befund: Vermerk P12.5-9 der Phase 12.5).
// Ein markiertes Kind ohne Klick-Aktion (z.B. ein reiner Text-Kandidat <h2> in einem
// <a> mit Track) verdeckte die Aktion seines Vorfahren: das Wiring suchte nur das
// INNERSTE markierte Element. Jetzt gilt der Klick dem naechsten markierten Vorfahren
// mit track/redirect — Halt am ersten, ein <form> beendet die Suche.
// ===========================================================================

// <a> mit Track, darin ein markiertes <h2> und freier Rand-Text — die Live-Probe.
const SCHATTEN_LINK = `<!DOCTYPE html><html><body><a data-pagesmith-id="ps-aaaaaa" href="#unten"><h2 data-pagesmith-id="ps-bbbbbb">Titel</h2>Rand</a></body></html>`;

// <form> mit einem markierten <p> und einem unmarkierten Eingabefeld (T10).
const SCHATTEN_FORM = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" action="/x"><p data-pagesmith-id="ps-bbbbbb">Hinweis</p><input type="text" name="n"></form></body></html>`;

describe("Schatten-Korrektur (Phase 12.5, Scheibe 1)", () => {
  it("T1: Klick auf das markierte <h2> im <a> mit Track -> Track feuert genau einmal", () => {
    // Vor der Scheibe rot (0 Calls): closest fand das <h2>, byId kannte es nicht.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = click("h2");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    expect(fbqCalls(fbq, "track")[0][1]).toBe("Lead");
    // track-only blockt den Default nicht — wie beim Direkt-Klick.
    expect(ev.defaultPrevented).toBe(false);
  });

  it("T2 (I5): Klick direkt auf das <a> -> Track feuert genau einmal, wie vor der Scheibe", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    expect(ev.defaultPrevented).toBe(false);
  });

  it("T3: Text-Kandidat OHNE markierten Vorfahren mit Aktion -> nichts (mit Positivkontrolle)", () => {
    // Eine Aktion steht auf der Seite — aber nicht ueber dem <h2>. Wird rot, wenn die
    // Suche nicht an null endet, sondern irgendein Element mit Aktion greift.
    const html = `<!DOCTYPE html><html><body><div><h2 data-pagesmith-id="ps-bbbbbb">Titel</h2></div><a data-pagesmith-id="ps-aaaaaa" href="#x">CTA</a></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(html, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = click("h2");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
    // POSITIVKONTROLLE im selben Lauf: dasselbe Wiring feuert am <a>.
    click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });

  it("T4: Klick auf ein markiertes Kind eines <button> mit Weiterleitung -> Weiterleitung", () => {
    // Ein <button> hat kein gebackenes href — ohne die Korrektur ginge die Weiterleitung
    // hier ganz verloren (vor der Scheibe: hrefValue "", kein preventDefault).
    const html = `<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa"><p data-pagesmith-id="ps-bbbbbb">Kaufen</p></button></body></html>`;
    mountAndWire(
      generateFunctional(
        html,
        [redirect("ps-aaaaaa", "https://buy.example/x", false)],
        "export"
      )
    );
    const ev = click("p");
    expect(ev.defaultPrevented).toBe(true);
    expect(hrefValue).toBe("https://buy.example/x");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("T5 (I2): inneres Element mit eigener Aktion im aeusseren mit Aktion -> NUR die innere, genau einmal", () => {
    // Faengt eine Suche ohne Halt am ersten Treffer (Mutation M2): dann liefe die
    // aeussere Aktion — Ereignis "Outer" und ihre Weiterleitung.
    const html = `<!DOCTYPE html><html><body><a data-pagesmith-id="ps-aaaaaa" href="https://orig.example/"><button data-pagesmith-id="ps-bbbbbb">Kaufen</button></a></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        html,
        [
          redirect("ps-aaaaaa", "https://outer.example/", false),
          track("ps-aaaaaa", "Outer"),
          track("ps-bbbbbb", "Inner"),
        ],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click("button");
    const calls = fbqCalls(fbq, "track");
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toBe("Inner");
    expect(hrefValue).toBe("");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("T6: VORSCHAU — ein <h2> MIT text-Mapping verdeckt den Track des <a> nicht; Containment bleibt", () => {
    // DER EINZIGE TEST, DER DIESE FEHLERKLASSE FAENGT (Mutation M3): In der Vorschau
    // steht das text-Mapping in der Tabelle. Zaehlte jeder Tabelleneintrag als Aktion,
    // hielte die Suche am <h2> an und der Track fiele aus. Im Export steht text nicht
    // in der Tabelle — dort ist die Klasse unsichtbar.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        SCHATTEN_LINK,
        [text("ps-bbbbbb", "Neu"), track("ps-aaaaaa", "Lead")],
        "preview",
        { metaPixelId: PIXEL }
      )
    );
    const ev = click("h2");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    // Containment: der Rahmen navigiert nicht (<a href> ohne Weiterleitung).
    expect(ev.defaultPrevented).toBe(true);
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("T7: Mittelklick auf das <h2> -> Track genau einmal, Navigation unangetastet", () => {
    // Faengt eine Korrektur, die nur den click-Listener erreicht (Mutation M4).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = aux("h2", 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
  });

  it("T7b: Rechtsklick auf das <h2> -> nichts (der Ghost-Conversion-Riegel bleibt vorn)", () => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_LINK, [track("ps-aaaaaa", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    aux("h2", 2);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });

  it("T10: <form> mit Track — Klick auf ein markiertes <p> darin -> 0 (Entscheidung P12.5-15)", () => {
    // Die Suche laeuft nicht von unten in ein <form> (Mutation M6a).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_FORM, [track("ps-cccccc", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click("p");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });

  it("S2 (ersetzt 'T10 BESTAND', Scheibe 1b): Klick in ein unmarkiertes <input> im <form> mit Track -> 0 (mit Positivkontrolle)", () => {
    // Bis Scheibe 1b feuerte hier der Track des Formulars — gemessen als Ueberzaehlung
    // (Vorrat P12.5-17 der Phase 12.5). Jetzt ist ein Formular nie Eigentuemer eines
    // Klicks (Entscheidung P12.5-21). Wird rot, wenn E4 fehlt (Mutation N2).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(SCHATTEN_FORM, [track("ps-cccccc", "Lead")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click("input");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    // POSITIVKONTROLLE im selben Lauf: dasselbe Formular feuert beim Abschicken.
    submit("form");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });

  it("T10b: <form> OHNE Aktion in einem Element MIT Aktion — Klick ins <input> -> 0 (mit Positivkontrolle)", () => {
    // Die Suche laeuft nicht aus einem <form> ohne Aktion heraus (Mutation M6b) —
    // Auslegung zu Entscheidung P12.5-15 der Phase 12.5: vor der Scheibe feuerte hier
    // nichts.
    const html = `<!DOCTYPE html><html><body><div role="button" data-pagesmith-id="ps-aaaaaa"><span>Karte</span><form data-pagesmith-id="ps-cccccc" action="/x"><input type="text" name="n"></form></div></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(html, [track("ps-aaaaaa", "Outer")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click("input");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    // POSITIVKONTROLLE im selben Lauf: ein unmarkiertes Kind ausserhalb des <form> feuert.
    click("span");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });
});

// ===========================================================================
// FORMULAR-TRACK AM ABSCHICKEN (Phase 12.5, Scheibe 1b; Entscheidungen P12.5-21,
// P12.5-23 bis P12.5-25 der Phase 12.5). Gemessen war: jeder Klick ins Feld zaehlte,
// das Abschicken nicht (Vorrat P12.5-17). Jetzt zaehlt der Track eines <form> beim
// submit — Capture an document, KEIN preventDefault, einmal je Formular und
// Seitenleben —, ein Klick im Formular loest dessen Aktion nicht aus, und ein Formular
// fuehrt keine Weiterleitung mehr aus. Was jsdom NICHT zeigen kann (Gueltigkeitspruefung
// des Browsers, der Vorschau-Rahmen ohne allow-forms, die echte Navigation), steht in der
// Live-Anleitung.
// ===========================================================================

// Formular mit markiertem Text, Eingabefeld und Absende-Knopf ohne eigenes Mapping, daneben
// ein Link — die Live-Probe "Schatten Test".
const FORM_PAGE = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" action="#unten"><p data-pagesmith-id="ps-bbbbbb">Formular-Text</p><input type="email" name="email"><button data-pagesmith-id="ps-dddddd" type="submit">Absenden</button></form><a data-pagesmith-id="ps-aaaaaa" href="#unten">Link</a></body></html>`;

// Wie mountAndWire, aber mit einem Haken VOR dem Ausfuehren unserer Scripts — so steht ein
// Listener des Betreibers VOR unserem, wie ein Seiten-Script, das vor unserem Block laeuft.
function mountAndWireAfter(output: string, before: (doc: Document) => void): void {
  mountedDoc = new DOMParser().parseFromString(output, "text/html");
  vi.stubGlobal("document", mountedDoc);
  before(mountedDoc);
  for (const s of Array.from(mountedDoc.querySelectorAll("script"))) {
    if (s.id === "pagesmith-mappings") continue;
    window.eval(s.textContent ?? "");
  }
}

describe("Formular-Track am Abschicken (Phase 12.5, Scheibe 1b)", () => {
  it("S1: Abschicken -> genau 1 Track, und das Abschicken bleibt unangetastet (kein preventDefault)", () => {
    // Wird rot ohne den submit-Listener (N1) und mit einem preventDefault darin (N5).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = submit("form");
    const calls = fbqCalls(fbq, "track");
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toBe("Contact");
    expect(ev.defaultPrevented).toBe(false);
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
  });

  it("S3: Klick auf das <form> selbst -> 0 (mit Positivkontrolle)", () => {
    // Direkter Treffer auf das Formular — vor Scheibe 1b feuerte er. Rot ohne E4 (N2).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click("form");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    submit("form");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });

  it("S4: zweimal Abschicken -> 1; ein ZWEITES Formular derselben Seite zaehlt eigens (Sperre je Formular)", () => {
    // Rot ohne Sperre (N4: 2 statt 1) und mit einer globalen statt einer Sperre je
    // Formular (N4b: das zweite Formular zaehlte nicht). Entscheidung P12.5-24.
    const html = `<!DOCTYPE html><html><body><form id="f1" data-pagesmith-id="ps-cccccc"><input type="email"></form><form id="f2" data-pagesmith-id="ps-eeeeee"><input type="email"></form></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        html,
        [track("ps-cccccc", "Contact"), track("ps-eeeeee", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    submit("#f1");
    submit("#f1");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
    submit("#f2");
    const calls = fbqCalls(fbq, "track");
    expect(calls).toHaveLength(2);
    expect(calls[1][1]).toBe("Lead");
  });

  it("S5: Mittelklick ins Eingabefeld -> 0; Mittelklick auf den Link -> 1 (Positivkontrolle)", () => {
    // Rot ohne E5 (N3): dann faende der auxclick-Pfad das Formular als Eigentuemer.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [track("ps-cccccc", "Contact"), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    aux("input", 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    const calls = fbqCalls(fbq, "track");
    expect(calls).toHaveLength(1);
    expect(calls[0][1]).toBe("Lead");
  });

  it("S6: Betreiber ruft preventDefault VOR uns (AJAX-Formular) -> trotzdem genau 1 Track", () => {
    // Ein Seiten-Script, das vor unserem Block laeuft, haengt einen Capture-Listener an
    // document und schickt selbst per fetch ab. Rot, wenn unser Listener ein
    // vorausgegangenes preventDefault als "nicht abgeschickt" deutet (N6b).
    const fbq = stubFbq();
    mountAndWireAfter(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      }),
      (doc) => doc.addEventListener("submit", (e) => e.preventDefault(), true)
    );
    const ev = submit("form");
    expect(ev.defaultPrevented).toBe(true); // das des Betreibers
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });

  it("S7: Betreiber stoppt das Ereignis am Formular (stopPropagation) -> trotzdem genau 1 Track", () => {
    // Rot, wenn unser Listener in der Bubble- statt in der Capture-Phase haengt (N6).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      })
    );
    mountedDoc
      .querySelector("form")!
      .addEventListener("submit", (e) => e.stopPropagation());
    submit("form");
    expect(fbqCalls(fbq, "track")).toHaveLength(1);
  });

  it("S8: Formular mit Weiterleitung -> weder beim Abschicken noch beim Klick ins Feld eine Navigation (R1)", () => {
    // Entscheidung P12.5-23. Rot, wenn der submit-Pfad die Weiterleitung ausfuehrt (N7)
    // oder der Klick-Pfad das Formular wieder als Eigentuemer nimmt (N2).
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [redirect("ps-cccccc", "https://danke.example/", false)],
        "export"
      )
    );
    const c = click("input");
    expect(c.defaultPrevented).toBe(false);
    const s = submit("form");
    expect(s.defaultPrevented).toBe(false);
    expect(hrefValue).toBe("");
    expect(openSpy).not.toHaveBeenCalled();
  });

  it("S9: Knopf mit eigenem Track im Formular mit Track -> Klick feuert 'Inner', Abschicken 'Contact' (konfiguriertes Verhalten)", () => {
    // Entscheidung P12.5-25: zwei Conversions sind hier GEWOLLT. Der Knopf ist
    // type="button", damit jsdom beim Klick nicht selbst abschickt — Klick und Abschicken
    // werden getrennt ausgeloest.
    const html = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc"><input type="email"><button type="button" data-pagesmith-id="ps-dddddd">Senden</button></form></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        html,
        [track("ps-cccccc", "Contact"), track("ps-dddddd", "Inner")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click("button");
    submit("form");
    const calls = fbqCalls(fbq, "track");
    expect(calls.map((c) => c[1])).toEqual(["Inner", "Contact"]);
  });

  it("S10: im Modus 'edit' haengt KEIN submit-Listener; in 'preview' einer (Positivkontrolle)", () => {
    // Im Editieren-Rahmen gehoeren Ereignisse der Selektions-Bruecke. Gezaehlt wird die
    // REGISTRIERUNG, nicht ein Track — im Modus 'edit' steht kein Track in der Tabelle,
    // eine Abwesenheit von Tracks waere dort trivial wahr.
    const spy = vi.spyOn(Document.prototype, "addEventListener");
    const submitRegs = () => spy.mock.calls.filter((c) => c[0] === "submit").length;
    mountAndWire(generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "edit"));
    expect(submitRegs()).toBe(0);
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "preview")
    );
    expect(submitRegs()).toBe(1);
    spy.mockRestore();
  });

  it("S11: Abschicken ohne Metas Einwilligung -> KEIN Beacon", () => {
    // Der submit-Zweig setzt dieselbe Track-Anweisung ein wie der Klick und laeuft damit
    // durch dasselbe Gate in __psMetaFire. Waechter gegen einen Zweig, der es umgeht.
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", () => false);
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    submit("form");
    expect(beacon).not.toHaveBeenCalled();
  });

  it("S11 (Positivkontrolle): Abschicken MIT Metas Einwilligung -> genau 1 Beacon", () => {
    const beacon = stubBeacon();
    vi.stubGlobal("pagesmithConsent", { meta: true });
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        trackingKey: TK,
        capiProxyUrl: PROXY,
      })
    );
    submit("form");
    expect(beacon).toHaveBeenCalledTimes(1);
  });

  // S12 — DER EINGESETZTE TRACK-TEXT (trackAll) IM SUBMIT-LISTENER, je Pfad. trackAll liest
  // je nach Konfiguration `a`, `console`, `__psMetaFire`, `__psCustomRun`, `__psCustomFire`.
  // `a` definiert der Submit-Listener selbst; die __ps*-Funktionen stehen als Deklarationen
  // im Rumpf der IIFE und sind damit in jedem ihrer Listener sichtbar. Die Meta-Pfade decken
  // S1 (Pixel: nur __psMetaFire) und S11 (Positivkontrolle: Beacon ohne Pixel — Warnung plus
  // __psMetaFire) ab; hier die zwei Custom-Pfade. Rot, wenn der Submit-Listener einen Namen
  // nicht bereitstellt, den trackAll braucht (Mutation N9: `a` umbenannt).
  it("S12a: Ereigniszeile OHNE Basis-Code, ohne Meta -> Warnung + __psCustomFire genau einmal, kein Fehler", () => {
    const w = window as unknown as Record<string, unknown>;
    delete w.__probeS12;
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    const err = vi.spyOn(console, "error");
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [
          {
            elementId: "ps-cccccc",
            type: "track",
            config: { event: "Contact", code: "window.__probeS12 = (window.__probeS12 || 0) + 1;" },
          },
        ],
        "export"
      )
    );
    submit("form");
    expect(w.__probeS12).toBe(1);
    // Die Meta-Warnung des Pfads ohne Pixel und ohne Laufzeit liest a.config.event.
    expect(warn.mock.calls.filter((c) => String(c[0]).includes("Contact"))).toHaveLength(1);
    expect(err).not.toHaveBeenCalled();
    warn.mockRestore();
    err.mockRestore();
    delete w.__probeS12;
  });

  it("S12b: Ereigniszeile MIT Basis-Code (Lader) -> __psCustomRun und __psCustomFire, Zeile genau einmal, kein Fehler", () => {
    const w = window as unknown as Record<string, unknown>;
    delete w.__probeS12;
    delete w.__probeS12Lader;
    vi.spyOn(console, "warn").mockImplementation(() => {});
    const err = vi.spyOn(console, "error");
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [
          {
            elementId: "ps-cccccc",
            type: "track",
            config: { event: "Contact", code: "window.__probeS12 = (window.__probeS12 || 0) + 1;" },
          },
        ],
        "export",
        { customPixelCode: "<script>window.__probeS12Lader = 1;</" + "script>" }
      )
    );
    submit("form");
    expect(w.__probeS12).toBe(1);
    expect(err).not.toHaveBeenCalled();
    err.mockRestore();
    delete w.__probeS12;
    delete w.__probeS12Lader;
  });

  it("Regression Scheibe 1: Klick auf 'Formular-Text' im Formular mit Track -> 0", () => {
    // FORM-Halt aus Scheibe 1 (P12.5-15) bleibt: die Suche laeuft nicht aus dem Formular.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click("p");
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// ABSENDE-BUTTONS OHNE EIGENE AKTIONEN (Phase 12.5, Scheibe 1c; Entscheidungen P12.5-37
// und P12.5-39 bis P12.5-44 der Phase 12.5). Ein Knopf, der ein Formular abschickt,
// traegt keine eigene Klick-Aktion; sein Klick gehoert dem Abschicken.
//
// DIESE TESTS KLICKEN DEN ABSENDE-BUTTON ECHT (dispatchEvent "click") und verlassen sich
// darauf, dass jsdom 29.1.1 die AKTIVIERUNG nachbildet: Klick -> requestSubmit ->
// submit-Ereignis; ein preventDefault auf dem Klick unterbindet es (GEMESSEN, Vermerk
// P12.5-38, Punkt (1)). Die Meldung "not implemented", vor der der Helfer submit warnt,
// entsteht am Test-Dokument nicht: es hat kein Fenster (Punkt (3) dort). U0 ist die
// Positivkontrolle fuer das INSTRUMENT: wird sie rot, sagen U1/U2b/U8 nichts mehr.
// ---------------------------------------------------------------------------

describe("Absende-Buttons ohne eigene Aktionen (Phase 12.5, Scheibe 1c)", () => {
  const BTN = '[data-pagesmith-id="ps-dddddd"]';

  it("U0 (Positivkontrolle fuer das Instrument): Klick auf den Absende-Button schickt in jsdom ab -> 1 'Contact'", () => {
    // Schon vor der Scheibe grün. Belegt, dass der Klick die Aktivierung ausloest; ohne
    // das waeren U1/U2b/U8 aus dem falschen Grund grün.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(FORM_PAGE, [track("ps-cccccc", "Contact")], "export", {
        metaPixelId: PIXEL,
      })
    );
    const ev = click(BTN);
    expect(ev.defaultPrevented).toBe(false);
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Contact"]);
  });

  it("U1: Absende-Button mit Weiterleitung -> keine Weiterleitung, das Formular wird abgeschickt, Formular-Track 1x", () => {
    // Rot ohne E8 (M7): dann preventDefault + Navigation, und das Abschicken unterbleibt —
    // der stille Conversion-Verlust aus Vermerk P12.5-36, Punkt (5).
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [
          redirect("ps-dddddd", "https://example.com/weg", false),
          track("ps-cccccc", "Contact"),
        ],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    const ev = click(BTN);
    expect(ev.defaultPrevented).toBe(false);
    expect(hrefValue).toBe("");
    expect(openSpy).not.toHaveBeenCalled();
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Contact"]);
  });

  it("U2b: Absende-Button mit Track in einem Formular mit Track -> genau ['Contact'], kein Button-Track", () => {
    // Hoechstens eine Conversion je Abschicken ((I2) der Scheibe 1b). Rot ohne E8 (M7):
    // ['Inner', 'Contact'].
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [track("ps-dddddd", "Inner"), track("ps-cccccc", "Contact")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click(BTN);
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Contact"]);
  });

  it("U7: Mittelklick auf den Absende-Button mit Track -> 0; Mittelklick auf den Link -> 1 (Positivkontrolle)", () => {
    // Rot NUR ohne E9 (M8): der auxclick-Pfad fuehrte den Button-Track aus.
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        FORM_PAGE,
        [track("ps-dddddd", "Inner"), track("ps-aaaaaa", "Lead")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    aux(BTN, 1);
    expect(fbqCalls(fbq, "track")).toHaveLength(0);
    aux('[data-pagesmith-id="ps-aaaaaa"]', 1);
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Lead"]);
  });

  it("U8: markiertes Kind im Absende-Button mit Track -> Klick aufs Kind ergibt genau ['Contact']", () => {
    // actionOwner steigt vom <p> zum Button (er traegt eine Aktion), E8 setzt ihn auf null;
    // der Klick aktiviert den Button, das Formular schickt ab.
    const html = `<!DOCTYPE html><html><body><form data-pagesmith-id="ps-cccccc" action="#unten"><input type="email" name="email"><button type="submit" data-pagesmith-id="ps-dddddd"><p data-pagesmith-id="ps-eeeeee">Jetzt senden</p></button></form></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        html,
        [track("ps-dddddd", "Inner"), track("ps-cccccc", "Contact")],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click('[data-pagesmith-id="ps-eeeeee"]');
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Contact"]);
  });

  it("U10: Absende-Button (form-Attribut) mit Track in einem Element mit Track -> genau ['Contact'] (V1, Entscheidung P12.5-39)", () => {
    // Haelt V1 fest: der Absende-Button als Eigentuemer wird auf null gesetzt, die Suche
    // laeuft NICHT weiter zum umschliessenden Element. Unter V2 kaeme ['Outer', 'Contact'],
    // ohne E8 (M7) ['Inner', 'Contact'].
    const html = `<!DOCTYPE html><html><body><div role="button" data-pagesmith-id="ps-aaaaaa"><button form="f1" data-pagesmith-id="ps-dddddd">Senden</button></div><form id="f1" data-pagesmith-id="ps-cccccc"><input type="email" name="email"></form></body></html>`;
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(
        html,
        [
          track("ps-aaaaaa", "Outer"),
          track("ps-dddddd", "Inner"),
          track("ps-cccccc", "Contact"),
        ],
        "export",
        { metaPixelId: PIXEL }
      )
    );
    click(BTN);
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(["Contact"]);
  });

  // DIE GEMEINSAME TABELLE (Entscheidung P12.5-40): Laufzeit (isSubmitButton im Wiring)
  // und Editor (submitFormOf) werden gegen DIESELBE Erwartung geprueft — sie ist aus
  // Entscheidung P12.5-37 und den Messungen in Vermerk P12.5-38, Punkt (1) und (2),
  // GETIPPT, nicht aus dem Code abgelesen. Aendert sich nur eine Seite, wird ihre Zeile rot.
  // Das Element traegt immer ps-zzzzzz und Track "Inner"; das Formular ps-ffffff ohne
  // Aktion. submits = "schickt ab": dann feuert "Inner" nicht, und submitFormOf nennt das
  // Formular.
  const FORM_OPEN = '<form id="f1" data-pagesmith-id="ps-ffffff"><input type="email" name="email">';
  const Z_ROWS: { name: string; body: string; submits: boolean }[] = [
    { name: "Z1 <button> ohne type im Formular", body: `${FORM_OPEN}<button data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: true },
    { name: "Z2 <button type=submit>", body: `${FORM_OPEN}<button type="submit" data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: true },
    { name: "Z3 <button type=quatsch> (ungueltig -> submit)", body: `${FORM_OPEN}<button type="quatsch" data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: true },
    { name: "Z4 <button type=button> im Formular", body: `${FORM_OPEN}<button type="button" data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: false },
    { name: "Z5 <button type=reset>", body: `${FORM_OPEN}<button type="reset" data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: false },
    { name: "Z6 <input type=submit>", body: `${FORM_OPEN}<input type="submit" value="X" data-pagesmith-id="ps-zzzzzz"></form>`, submits: true },
    { name: "Z7 <input type=image>", body: `${FORM_OPEN}<input type="image" alt="X" data-pagesmith-id="ps-zzzzzz"></form>`, submits: true },
    { name: "Z8 <input type=button>", body: `${FORM_OPEN}<input type="button" value="X" data-pagesmith-id="ps-zzzzzz"></form>`, submits: false },
    { name: "Z9 <div role=button> im Formular", body: `${FORM_OPEN}<div role="button" data-pagesmith-id="ps-zzzzzz">X</div></form>`, submits: false },
    { name: "Z10 <object type=submit role=button> im Formular (tagName-Riegel)", body: `${FORM_OPEN}<object type="submit" role="button" data-pagesmith-id="ps-zzzzzz"></object></form>`, submits: false },
    { name: "Z11 <button> ausserhalb, ohne Formular", body: `${FORM_OPEN}</form><button data-pagesmith-id="ps-zzzzzz">X</button>`, submits: false },
    { name: "Z12 <button type=SUBMIT> (Grossschreibung)", body: `${FORM_OPEN}<button type="SUBMIT" data-pagesmith-id="ps-zzzzzz">X</button></form>`, submits: true },
    { name: "Z13 <button form=f1> ausserhalb", body: `${FORM_OPEN}</form><button form="f1" data-pagesmith-id="ps-zzzzzz">X</button>`, submits: true },
  ];
  const zDoc = (body: string) => `<!DOCTYPE html><html><body>${body}</body></html>`;

  it.each(Z_ROWS)("Laufzeit — $name", ({ body, submits }) => {
    const fbq = stubFbq();
    mountAndWire(
      generateFunctional(zDoc(body), [track("ps-zzzzzz", "Inner")], "export", {
        metaPixelId: PIXEL,
      })
    );
    click('[data-pagesmith-id="ps-zzzzzz"]');
    expect(fbqCalls(fbq, "track").map((c) => c[1])).toEqual(submits ? [] : ["Inner"]);
  });

  it.each(Z_ROWS)("Editor — $name", ({ body, submits }) => {
    expect(submitFormOf(zDoc(body), "ps-zzzzzz")).toEqual(
      submits ? { formId: "ps-ffffff" } : null
    );
  });

  it("submitFormOf: unbekannte ps-ID -> null; leeres HTML -> null; Formular ohne ps-ID -> formId null", () => {
    expect(submitFormOf(zDoc(Z_ROWS[1].body), "ps-nichtda")).toBeNull();
    expect(submitFormOf("", "ps-zzzzzz")).toBeNull();
    expect(
      submitFormOf(zDoc('<form><button data-pagesmith-id="ps-zzzzzz">X</button></form>'), "ps-zzzzzz")
    ).toEqual({ formId: null });
  });
});
