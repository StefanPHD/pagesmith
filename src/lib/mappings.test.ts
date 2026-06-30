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

function track(elementId: string, event: string): Mapping {
  return { elementId, type: "track", config: { event } };
}

// Schmaler, typ-narrowing Zugriff auf eine Redirect-config (die Tests pruefen
// redirect-Mappings; der Union-Typ verlangt das Narrowing).
function rc(m: Mapping | null | undefined) {
  return m && m.type === "redirect" ? m.config : null;
}

// Gegenstueck fuer text-Mappings (Compound-Key-Tests greifen beide Typen ab).
function tc(m: Mapping) {
  if (m.type !== "text") throw new Error("kein text-Mapping");
  return m.config;
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

describe("findMapping / upsertMapping / removeMapping (Schluessel elementId, type)", () => {
  it("findet per elementId, null wenn nicht vorhanden", () => {
    const list = [redirect("ps-aaaaaa", "https://a.com")];
    expect(rc(findMapping(list, "ps-aaaaaa", "redirect"))?.url).toBe(
      "https://a.com"
    );
    expect(findMapping(list, "ps-zzzzzz", "redirect")).toBeNull();
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
    const next = removeMapping(list, "ps-aaaaaa", "redirect");
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

  // Phase 6 Scheibe 1a: der configEqual-track-Zweig muss greifen, sonst gilt jedes
  // track-Mapping als dauernd dirty (Fehlalarm bei Save/Guards). DISKRIMINIEREND:
  // gleiche id, NUR event verschieden.
  it("geaenderter track-event IST dirty", () => {
    const a = [track("ps-aaaaaa", "Lead")];
    const b = [track("ps-aaaaaa", "Purchase")];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("gleicher track-event ist NICHT dirty (Fehlalarm-Schutz greift)", () => {
    const a = [track("ps-aaaaaa", "Lead")];
    const b = [track("ps-aaaaaa", "Lead")];
    expect(mappingsEqual(a, b)).toBe(true);
  });

  // Phase 6 Scheibe 1b: configEqual deckt ALLE track-Felder ab. Sonst gilt eine reine
  // value-/currency-/isCustom-Aenderung faelschlich als nicht-dirty -> stiller Verlust.
  it("geaenderter track-value IST dirty (sonst Verlust)", () => {
    const a: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 9.9, currency: "EUR" } },
    ];
    const b: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 19.9, currency: "EUR" } },
    ];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("geaenderte track-currency IST dirty", () => {
    const a: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 9.9, currency: "EUR" } },
    ];
    const b: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 9.9, currency: "USD" } },
    ];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("geaendertes track-isCustom IST dirty (Standard <-> Custom bei gleichem Namen)", () => {
    const a: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase" } },
    ];
    const b: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", isCustom: true } },
    ];
    expect(mappingsEqual(a, b)).toBe(false);
  });

  it("gleiche value/currency/isCustom sind NICHT dirty (Gegenprobe)", () => {
    const a: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 9.9, currency: "EUR" } },
    ];
    const b: Mapping[] = [
      { elementId: "ps-aaaaaa", type: "track", config: { event: "Purchase", value: 9.9, currency: "EUR" } },
    ];
    expect(mappingsEqual(a, b)).toBe(true);
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
});

// Phase 6 Scheibe 0: der Lookup-/Identitaets-Schluessel ist (elementId, type).
// SYNTHETISCHES Fixture — zwei Mappings unterschiedlichen Typs auf EINER id. Diesen
// Zustand erzeugt heute keine UI (Redirect- und Text-Kandidaten sind disjunkt) ->
// nur so diskriminiert der Test den Compound-Key gegen das alte elementId-Keying.
// (Der fruehere "unabhaengig vom Typ"-Test kodierte genau das alte, hier bewusst
// aufgehobene Verhalten und wurde ersetzt.)
describe("Compound-Key (elementId, type) – zwei Aktionen auf EINEM Element", () => {
  it("upsert(redirect) laesst ein text-Mapping derselben id unangetastet (und umgekehrt)", () => {
    const start = [text("ps-aaaaaa", "Headline")];
    const afterRedirect = upsertMapping(start, redirect("ps-aaaaaa", "https://a.com"));
    // Append, KEIN Replace: beide Aktionen koexistieren auf derselben id.
    expect(afterRedirect).toHaveLength(2);
    expect(tc(afterRedirect[0]).content).toBe("Headline");
    expect(rc(afterRedirect[1])?.url).toBe("https://a.com");

    // Umgekehrte Richtung: ein text-Upsert laesst das redirect intakt.
    const afterText = upsertMapping(
      [redirect("ps-aaaaaa", "https://a.com")],
      text("ps-aaaaaa", "Neu")
    );
    expect(afterText).toHaveLength(2);
    expect(rc(afterText[0])?.url).toBe("https://a.com");
    expect(tc(afterText[1]).content).toBe("Neu");
  });

  it("SAME-(id,type)-Replace bleibt: upsert(redirect mit neuer URL) ersetzt in-place, Laenge bleibt 1", () => {
    const next = upsertMapping(
      [redirect("ps-aaaaaa", "https://alt.com")],
      redirect("ps-aaaaaa", "https://neu.com")
    );
    expect(next).toHaveLength(1);
    expect(rc(next[0])?.url).toBe("https://neu.com");
  });

  it("findMapping unterscheidet nach Typ auf derselben id", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      text("ps-aaaaaa", "Headline"),
    ];
    const r = findMapping(list, "ps-aaaaaa", "redirect");
    const t = findMapping(list, "ps-aaaaaa", "text");
    expect(r).not.toBeNull();
    expect(t).not.toBeNull();
    expect(r).not.toBe(t);
    expect(rc(r)?.url).toBe("https://a.com");
    expect(tc(t!).content).toBe("Headline");
  });

  it("remove(id,'redirect') laesst das text-Mapping auf derselben id intakt", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      text("ps-aaaaaa", "Headline"),
    ];
    const next = removeMapping(list, "ps-aaaaaa", "redirect");
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ type: "text", elementId: "ps-aaaaaa" });
  });

  it("redirect + track koexistieren auf EINER id; remove(redirect) laesst track intakt", () => {
    const list = [
      redirect("ps-aaaaaa", "https://a.com"),
      track("ps-aaaaaa", "Lead"),
    ];
    expect(findMapping(list, "ps-aaaaaa", "redirect")).not.toBeNull();
    expect(findMapping(list, "ps-aaaaaa", "track")).not.toBeNull();
    // upsert(track) ersetzt den track-Slot in-place (Laenge bleibt 2), append nur
    // bei neuem (id,type).
    const afterUpsert = upsertMapping(list, track("ps-aaaaaa", "Purchase"));
    expect(afterUpsert).toHaveLength(2);
    expect(findMapping(afterUpsert, "ps-aaaaaa", "track")).toMatchObject({
      config: { event: "Purchase" },
    });
    // remove(redirect) trifft NUR den redirect-Slot.
    const next = removeMapping(list, "ps-aaaaaa", "redirect");
    expect(next).toHaveLength(1);
    expect(next[0]).toMatchObject({ type: "track", elementId: "ps-aaaaaa" });
  });

  it("mappingsEqual: {redirect+text auf id} != {nur redirect}; Umsortieren == gleich", () => {
    const both = [
      redirect("ps-aaaaaa", "https://a.com"),
      text("ps-aaaaaa", "Headline"),
    ];
    const onlyRedirect = [redirect("ps-aaaaaa", "https://a.com")];
    expect(mappingsEqual(both, onlyRedirect)).toBe(false);
    // Dieselben zwei (id,type)-Eintraege, nur umsortiert -> mengengleich.
    const reordered = [
      text("ps-aaaaaa", "Headline"),
      redirect("ps-aaaaaa", "https://a.com"),
    ];
    expect(mappingsEqual(both, reordered)).toBe(true);
  });
});
