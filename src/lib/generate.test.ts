import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { editPreviewHtml, generateFunctional } from "./generate";
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
  // Die beiden injizierten Scripts: Datenblock (id=pagesmith-mappings) + Wiring.
  // Geparstes HTML fuehrt <script> NICHT aus -> wir evaluieren das Wiring bewusst;
  // es referenziert das (gestubbte) globale document.
  const wiring = Array.from(mountedDoc.querySelectorAll("script")).find(
    (s) => s.id !== "pagesmith-mappings"
  );
  window.eval(wiring?.textContent ?? "");
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

const MAPPED_BUTTON = `<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>`;
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
// CAPI-Dedup-Beacon (Phase 6 Scheibe 2b-ii): neben fbq feuert __psMetaFire ein
// navigator.sendBeacon an /api/capi — hinter DEMSELBEN psConsent-Gate, mit der
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
    const out = editPreviewHtml(previewHtml, [text(elements[0].id, "Neu")]);
    expect(out).not.toContain("navigator.sendBeacon(");
    expect(out).not.toContain("fbq(");
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

  it("KURZSCHLUSS: ohne text-Mapping == previewHtml (byte-identisch)", () => {
    const previewHtml = annotateAndDetect(BRIDGE_SOURCE).html;
    // leere Mappings UND ein reines redirect-Mapping schliessen beide kurz.
    expect(editPreviewHtml(previewHtml, [])).toBe(previewHtml);
    expect(
      editPreviewHtml(previewHtml, [redirect("ps-aaaaaa", "https://b.com")])
    ).toBe(previewHtml);
  });

  it("mit text-Override: Bruecke ueberlebt den Re-Parse FUNKTIONAL + Override im Datenblock", () => {
    const { html: previewHtml, elements } = annotateAndDetect(BRIDGE_SOURCE);
    const id = elements[0].id;
    // Sanity: previewHtml traegt die Bruecke + den Anker.
    expect(previewHtml).toContain("ELEMENT_CLICKED");

    const out = editPreviewHtml(previewHtml, [text(id, "Neu")]);
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
