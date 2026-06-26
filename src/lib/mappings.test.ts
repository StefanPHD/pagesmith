import { describe, expect, it } from "vitest";
import {
  displayTextFor,
  findMapping,
  findOrphans,
  isValidRedirectUrl,
  mappingsEqual,
  removeMapping,
  upsertMapping,
  type Mapping,
} from "./mappings";
import type { DetectedElement } from "./detect";

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

// Schmaler, typ-narrowing Zugriff auf eine Redirect-config (die Tests pruefen
// redirect-Mappings; der Union-Typ verlangt das Narrowing).
function rc(m: Mapping | null | undefined) {
  return m && m.type === "redirect" ? m.config : null;
}

describe("isValidRedirectUrl", () => {
  it("akzeptiert http und https", () => {
    expect(isValidRedirectUrl("http://example.com")).toBe(true);
    expect(isValidRedirectUrl("https://buy.stripe.com/abc")).toBe(true);
  });

  it("lehnt leer/whitespace ab", () => {
    expect(isValidRedirectUrl("")).toBe(false);
    expect(isValidRedirectUrl("   ")).toBe(false);
  });

  it("lehnt fehlende/andere Protokolle ab", () => {
    expect(isValidRedirectUrl("example.com")).toBe(false);
    expect(isValidRedirectUrl("javascript:alert(1)")).toBe(false);
    expect(isValidRedirectUrl("ftp://example.com")).toBe(false);
  });
});

describe("findMapping / upsertMapping / removeMapping (Schluessel elementId)", () => {
  it("findet per elementId, null wenn nicht vorhanden", () => {
    const list = [redirect("ps-aaaaaa", "https://a.com")];
    expect(rc(findMapping(list, "ps-aaaaaa"))?.url).toBe("https://a.com");
    expect(findMapping(list, "ps-zzzzzz")).toBeNull();
  });

  it("upsert haengt neues an", () => {
    const next = upsertMapping([], redirect("ps-aaaaaa", "https://a.com"));
    expect(next).toHaveLength(1);
  });

  it("upsert ersetzt bestehendes positions-stabil", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    const next = upsertMapping(list, redirect("ps-aaaaaa", "https://neu.com"));
    expect(next).toHaveLength(2);
    expect(rc(next[0])?.url).toBe("https://neu.com");
    expect(next[1].elementId).toBe("ps-bbbbbb");
  });

  it("remove entfernt nur das Ziel-Element", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    const next = removeMapping(list, "ps-aaaaaa");
    expect(next).toHaveLength(1);
    expect(next[0].elementId).toBe("ps-bbbbbb");
  });
});

describe("findOrphans – verwaiste Mappings (Weg-C)", () => {
  it("id vorhanden -> nicht verwaist", () => {
    const list = [redirect("ps-aaaaaa", "https://a.com")];
    expect(findOrphans(list, ["ps-aaaaaa"])).toEqual([]);
  });

  it("id fehlt -> verwaist", () => {
    const list = [redirect("ps-aaaaaa", "https://a.com")];
    const orphans = findOrphans(list, ["ps-zzzzzz"]);
    expect(orphans).toHaveLength(1);
    expect(orphans[0].elementId).toBe("ps-aaaaaa");
  });

  it("gemischte Liste -> nur die fehlenden", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
      redirect("ps-cccccc", "https://c.com"),
    ];
    const orphans = findOrphans(list, ["ps-bbbbbb"]);
    expect(orphans.map((m) => m.elementId)).toEqual(["ps-aaaaaa", "ps-cccccc"]);
  });

  it("leere Mappings -> keine Orphans", () => {
    expect(findOrphans([], ["ps-aaaaaa"])).toEqual([]);
  });

  it("EHRLICH: leere presentElementIds -> alle verwaist (Guard liegt in der Komponente)", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    expect(findOrphans(list, [])).toHaveLength(2);
  });

  it("akzeptiert auch ein Set als presentElementIds", () => {
    const list = [redirect("ps-aaaaaa", "https://a.com")];
    expect(findOrphans(list, new Set(["ps-aaaaaa"]))).toEqual([]);
    expect(findOrphans(list, new Set<string>())).toHaveLength(1);
  });
});

describe("mappingsEqual – reihenfolge-unabhaengiger Mengenvergleich", () => {
  it("Umsortieren ist NICHT dirty", () => {
    const a = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    const b = [
      redirect("ps-bbbbbb", "https://b.com"),
      redirect("ps-aaaaaa", "https://a.com"),
    ];
    expect(mappingsEqual(a, b)).toBe(true);
  });

  it("geaenderte URL IST dirty", () => {
    const a = [redirect("ps-aaaaaa", "https://a.com")];
    const b = [redirect("ps-aaaaaa", "https://anders.com")];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("geaenderte openInNewTab-Option IST dirty", () => {
    const a = [redirect("ps-aaaaaa", "https://a.com", false)];
    const b = [redirect("ps-aaaaaa", "https://a.com", true)];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("Hinzufuegen IST dirty", () => {
    const a = [redirect("ps-aaaaaa", "https://a.com")];
    const b = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("Entfernen IST dirty", () => {
    const a = [
      redirect("ps-aaaaaa", "https://a.com"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    const b = [redirect("ps-aaaaaa", "https://a.com")];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("zwei leere Listen sind gleich", () => {
    expect(mappingsEqual([], [])).toBe(true);
  });

  // Phase 5: der typ-diskriminierte configEqual muss den Text-Zweig tragen.
  it("geaenderter Text-content IST dirty", () => {
    const a = [text("ps-aaaaaa", "Alt")];
    const b = [text("ps-aaaaaa", "Neu")];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("gleicher Text-content ist NICHT dirty", () => {
    const a = [text("ps-aaaaaa", "Gleich")];
    const b = [text("ps-aaaaaa", "Gleich")];
    expect(mappingsEqual(a, b)).toBe(true);
  });

  it("Typwechsel bei gleicher elementId IST dirty (redirect <-> text)", () => {
    const a = [redirect("ps-aaaaaa", "https://a.com")];
    const b = [text("ps-aaaaaa", "Text")];
    expect(mappingsEqual(a, b)).toBe(false);
  });
});

describe("displayTextFor – geteilter Anzeige-Deriver (Liste + Header)", () => {
  const textEl = (id: string, text: string, label?: string): DetectedElement => ({
    id,
    type: "text",
    tag: "h1",
    label: label ?? text,
    text,
  });

  it("kein Mapping -> Detektions-Text (element.text)", () => {
    expect(displayTextFor(textEl("ps-aaaaaa", "Original"), [])).toBe("Original");
  });

  it("Text-Mapping vorhanden -> dessen config.content (Override gewinnt)", () => {
    const el = textEl("ps-aaaaaa", "Original");
    expect(displayTextFor(el, [text("ps-aaaaaa", "Überschrieben")])).toBe(
      "Überschrieben"
    );
  });

  it("ignoriert ein Mapping anderen Typs -> faellt auf element.text zurueck", () => {
    const el = textEl("ps-aaaaaa", "Original");
    // Ein redirect-Mapping auf derselben id darf den Anzeige-Text nicht aendern.
    expect(displayTextFor(el, [redirect("ps-aaaaaa", "https://a.com")])).toBe(
      "Original"
    );
  });

  it("nicht-Text-Element ohne .text -> Label-Fallback", () => {
    const button: DetectedElement = {
      id: "ps-bbbbbb",
      type: "button",
      tag: "button",
      label: "Jetzt kaufen",
    };
    expect(displayTextFor(button, [])).toBe("Jetzt kaufen");
  });

  it("leerer Inhalt -> Label-Fallback (z.B. \"(leerer Text)\")", () => {
    const el = textEl("ps-aaaaaa", "", "(leerer Text)");
    expect(displayTextFor(el, [])).toBe("(leerer Text)");
    // auch ein Override auf leer faellt auf das Label zurueck.
    expect(displayTextFor(el, [text("ps-aaaaaa", "")])).toBe("(leerer Text)");
  });

  it("truncatet den abgeleiteten Text auf 60 Zeichen", () => {
    const long = "x".repeat(100);
    const el = textEl("ps-aaaaaa", "kurz");
    expect(displayTextFor(el, [text("ps-aaaaaa", long)])).toHaveLength(60);
  });
});

describe("Helfer sind typ-agnostisch (tragen type:text)", () => {
  it("findOrphans flaggt ein verwaistes Text-Mapping wie ein Redirect-Mapping", () => {
    const list = [
      text("ps-aaaaaa", "Headline"),
      redirect("ps-bbbbbb", "https://b.com"),
    ];
    // Nur ps-bbbbbb ist im Code -> das Text-Mapping ps-aaaaaa ist verwaist.
    const orphans = findOrphans(list, ["ps-bbbbbb"]);
    expect(orphans).toHaveLength(1);
    expect(orphans[0]).toMatchObject({ elementId: "ps-aaaaaa", type: "text" });
  });

  it("upsert/remove arbeiten per elementId, unabhaengig vom Typ", () => {
    const afterUpsert = upsertMapping(
      [redirect("ps-aaaaaa", "https://a.com")],
      text("ps-aaaaaa", "ueberschrieben")
    );
    expect(afterUpsert).toHaveLength(1);
    expect(afterUpsert[0]).toMatchObject({ type: "text" });
    expect(removeMapping(afterUpsert, "ps-aaaaaa")).toEqual([]);
  });
});
