import { afterEach, describe, expect, it, vi } from "vitest";
import { isApexHost, recordHostName } from "./apex";

afterEach(() => vi.restoreAllMocks());

describe("isApexHost (7c-2c) — autoritativ ueber Vercels apexName", () => {
  it("Apex (kunde.de === apexName) -> true", () => {
    expect(isApexHost("kunde.de", "kunde.de")).toBe(true);
  });

  it("Subdomain (www.kunde.de, apex kunde.de) -> false", () => {
    expect(isApexHost("www.kunde.de", "kunde.de")).toBe(false);
  });

  it("tiefe Subdomain (shop.de.example.com, apex example.com) -> false", () => {
    expect(isApexHost("shop.de.example.com", "example.com")).toBe(false);
  });

  it("mehrteilige eTLD Apex (meinshop.co.uk === apexName) -> true (naiv wuerde scheitern)", () => {
    // Gegenprobe: die naive "2 Labels = Apex"-Heuristik saehe hier 3 Labels und laege
    // FALSCH (CNAME statt A). Der apexName-Vergleich ist korrekt.
    expect(isApexHost("meinshop.co.uk", "meinshop.co.uk")).toBe(true);
  });

  it("apexName null -> LAUTER Warn + naiver Fallback (dokumentierte Grenze)", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    expect(isApexHost("kunde.de", null)).toBe(true); // 2 Labels -> Apex
    expect(isApexHost("www.kunde.de", null)).toBe(false); // 3 Labels -> Subdomain
    expect(warn).toHaveBeenCalledTimes(2); // NICHT still: jeder Fallback warnt.
  });
});

describe("recordHostName (7c-2c)", () => {
  it("Apex -> '@'", () => {
    expect(recordHostName("kunde.de", "kunde.de", true)).toBe("@");
  });

  it("Subdomain -> Praefix vor der Apex-Domain", () => {
    expect(recordHostName("shop.kunde.de", "kunde.de", false)).toBe("shop");
  });

  it("Subdomain ohne apexName -> erstes Label (best effort)", () => {
    expect(recordHostName("shop.kunde.de", null, false)).toBe("shop");
  });
});
