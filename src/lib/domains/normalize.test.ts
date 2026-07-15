import { describe, expect, it } from "vitest";
import { normalizeDomain } from "./normalize";

describe("normalizeDomain", () => {
  it("trimmt, lowercased, strippt https:// und trailing slash", () => {
    expect(normalizeDomain("  HTTPS://Landing.Kunde.DE/  ")).toEqual({
      ok: true,
      host: "landing.kunde.de",
    });
    expect(normalizeDomain("http://kunde.de")).toEqual({
      ok: true,
      host: "kunde.de",
    });
  });

  it("ERHAELT www. — www.kunde.de bleibt www.kunde.de (kein Apex-Umschreiben)", () => {
    expect(normalizeDomain("www.kunde.de")).toEqual({
      ok: true,
      host: "www.kunde.de",
    });
  });

  it("lehnt fuehrendes *.-Wildcard HART ab (reason wildcard_rejected)", () => {
    expect(normalizeDomain("*.kunde.de")).toEqual({
      ok: false,
      reason: "wildcard_rejected",
    });
  });

  it("lehnt Pfad und Port HART ab (reason invalid_format)", () => {
    expect(normalizeDomain("beispiel.com/pfad")).toEqual({
      ok: false,
      reason: "invalid_format",
    });
    expect(normalizeDomain("beispiel.com:8080")).toEqual({
      ok: false,
      reason: "invalid_format",
    });
  });

  it("lehnt Injection/Unsinn ab (Leerzeichen, '..', Sonderzeichen)", () => {
    expect(normalizeDomain("bad domain.com").ok).toBe(false);
    expect(normalizeDomain("kunde..de").ok).toBe(false);
    expect(normalizeDomain("kun<de>.de").ok).toBe(false);
  });

  it("lehnt ein einzelnes Label ohne Punkt ab (localhost, foo)", () => {
    expect(normalizeDomain("localhost").ok).toBe(false);
    expect(normalizeDomain("foo").ok).toBe(false);
  });

  it("leere Eingabe -> reason empty", () => {
    expect(normalizeDomain("   ")).toEqual({ ok: false, reason: "empty" });
  });

  it("akzeptiert eine gewoehnliche Subdomain unveraendert", () => {
    expect(normalizeDomain("landing.kunde.de")).toEqual({
      ok: true,
      host: "landing.kunde.de",
    });
  });
});
