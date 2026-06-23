import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { generateFunctional } from "./generate";
import type { Mapping } from "./mappings";

function redirect(
  elementId: string,
  url: string,
  openInNewTab = false
): Mapping {
  return { elementId, type: "redirect", config: { url, openInNewTab } };
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
    expect(table[0].config.url).toBe("https://buy.stripe.com/abc");
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
    expect(table[0].config.openInNewTab).toBe(true);
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
    expect(table[0].config.url).toBe(evil);
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

const MAPPED_BUTTON = `<!DOCTYPE html><html><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>`;
const UNMAPPED_LINK = (href: string) =>
  `<!DOCTYPE html><html><body><a href="${href}">Link</a></body></html>`;

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
