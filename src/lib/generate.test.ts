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

// ---------------------------------------------------------------------------
// Tracking (Phase 6 Scheibe 1a, STRUKTURELL): ein interaktives Element kann
// redirect UND track tragen. Der Track-Stub (console.log) feuert VOR der
// Redirect-Navigation. KEINE Meta-Semantik (kein fbq) — das ist 1b.
// ---------------------------------------------------------------------------

describe("Wiring-Verhalten TRACK (Mehr-Aktion, Scheibe 1a)", () => {
  it("Element [redirect, track] (export): Tabelle enthaelt BEIDE; Stub feuert VOR der Navigation", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    // Array-Reihenfolge redirect-zuerst -> beweist die Deferral (Track trotzdem
    // vor der Navigation), reihenfolge-unabhaengig.
    mountAndWire(
      generateFunctional(
        MAPPED_BUTTON,
        [redirect("ps-aaaaaa", "https://x.com", true), track("ps-aaaaaa", "Lead")],
        "export"
      )
    );
    const table = readTable(
      mountedDoc.documentElement.outerHTML
    );
    expect(table).toHaveLength(2);

    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(ev.defaultPrevented).toBe(true);
    expect(logSpy).toHaveBeenCalledWith("[pagesmith track] Lead");
    expect(openSpy).toHaveBeenCalledWith("https://x.com", "_blank");
    // ORDNUNG: der Track-Stub-Log lief VOR window.open.
    expect(logSpy.mock.invocationCallOrder[0]).toBeLessThan(
      openSpy.mock.invocationCallOrder[0]
    );
    logSpy.mockRestore();
  });

  it("Element [track] only (export): Stub feuert, KEINE Navigation, defaultPrevented false", () => {
    const logSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    mountAndWire(
      generateFunctional(MAPPED_BUTTON, [track("ps-aaaaaa", "Lead")], "export")
    );
    const ev = click('[data-pagesmith-id="ps-aaaaaa"]');
    expect(logSpy).toHaveBeenCalledWith("[pagesmith track] Lead");
    expect(openSpy).not.toHaveBeenCalled();
    expect(hrefValue).toBe("");
    // Track-only blockt den Default NICHT (nur Redirect ruft preventDefault).
    expect(ev.defaultPrevented).toBe(false);
    logSpy.mockRestore();
  });

  it("verwaistes track-Mapping (ps-id fehlt) wird NICHT verdrahtet", () => {
    const out = generateFunctional(
      MAPPED_BUTTON,
      [track("ps-zzzzzz", "Ghost")],
      "export"
    );
    // present-Filter greift typ-agnostisch -> leere Tabelle -> kein Script.
    expect(out).not.toContain("pagesmith-mappings");
    expect(out).not.toContain("Ghost");
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
