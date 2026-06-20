import { describe, expect, it } from "vitest";
import {
  findMapping,
  isValidRedirectUrl,
  mappingsEqual,
  removeMapping,
  upsertMapping,
  type Mapping,
} from "./mappings";

function redirect(
  elementId: string,
  url: string,
  openInNewTab = false
): Mapping {
  return { elementId, type: "redirect", config: { url, openInNewTab } };
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
    expect(findMapping(list, "ps-aaaaaa")?.config.url).toBe("https://a.com");
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
    expect(next[0].config.url).toBe("https://neu.com");
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
});
