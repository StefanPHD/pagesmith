import { describe, expect, it } from "vitest";
import {
  deriveFineState,
  deriveGrobStatus,
  pickDnsRecords,
  type VercelDomainConfig,
} from "./config";

describe("deriveFineState (7c-2c) — abgeleitete Fein-Zustaende", () => {
  it("configuredBy null + misconfigured true -> waiting_dns", () => {
    expect(deriveFineState({ configuredBy: null, misconfigured: true })).toBe(
      "waiting_dns",
    );
  });

  it('configuredBy "A" + misconfigured true -> wrong_record', () => {
    expect(deriveFineState({ configuredBy: "A", misconfigured: true })).toBe(
      "wrong_record",
    );
  });

  it('configuredBy "CNAME" + misconfigured true -> wrong_record', () => {
    expect(deriveFineState({ configuredBy: "CNAME", misconfigured: true })).toBe(
      "wrong_record",
    );
  });

  it('configuredBy "http" -> proxy_detected', () => {
    expect(deriveFineState({ configuredBy: "http", misconfigured: true })).toBe(
      "proxy_detected",
    );
  });

  it('configuredBy "dns-01" + misconfigured true -> waiting_dns (fuenfter Wert, nicht durchgefallen)', () => {
    // Expliziter Test fuer den dns-01-Zweig: "Challenge aktiv, aber noch nicht
    // aufloesend" ist ein Warte-Zustand, kein "falscher Eintrag".
    expect(deriveFineState({ configuredBy: "dns-01", misconfigured: true })).toBe(
      "waiting_dns",
    );
  });

  it("misconfigured false -> live (Gegenprobe: KEIN Fehlerzustand, auch nicht bei http)", () => {
    expect(deriveFineState({ configuredBy: "A", misconfigured: false })).toBe("live");
    expect(deriveFineState({ configuredBy: "http", misconfigured: false })).toBe(
      "live",
    );
  });
});

describe("deriveGrobStatus (7c-2c) — grobe persistierte Klasse", () => {
  it("misconfigured false -> verified", () => {
    expect(deriveGrobStatus({ misconfigured: false })).toBe("verified");
  });

  it("null + misconfigured true -> pending", () => {
    expect(deriveGrobStatus({ configuredBy: null, misconfigured: true })).toBe(
      "pending",
    );
  });

  it("A + misconfigured true -> misconfigured", () => {
    expect(deriveGrobStatus({ configuredBy: "A", misconfigured: true })).toBe(
      "misconfigured",
    );
  });

  it('dns-01 + misconfigured true -> pending (Challenge laeuft, kein "falsch")', () => {
    expect(deriveGrobStatus({ configuredBy: "dns-01", misconfigured: true })).toBe(
      "pending",
    );
  });
});

describe("pickDnsRecords (7c-2c) — dynamisch, nie hardcoded", () => {
  const config: VercelDomainConfig = {
    recommendedIPv4: [
      { rank: 1, value: ["216.198.79.1", "64.29.17.1"] },
      { rank: 2, value: ["76.76.21.21"] },
    ],
    recommendedCNAME: [
      { rank: 1, value: "c2ece34f23087512.vercel-dns-017.com." },
      { rank: 2, value: "cname.vercel-dns.com." },
    ],
  };

  it("Apex -> A-Records = ALLE rank-1-IPv4-Werte (Multi-IP: beide, nicht nur der erste)", () => {
    expect(pickDnsRecords(config, true)).toEqual({
      type: "A",
      values: ["216.198.79.1", "64.29.17.1"],
    });
  });

  it("Subdomain -> CNAME rank-1-Wert (String, inkl. Trailing-Dot)", () => {
    expect(pickDnsRecords(config, false)).toEqual({
      type: "CNAME",
      value: "c2ece34f23087512.vercel-dns-017.com.",
    });
  });

  it("ignoriert rank 2, nimmt rank 1 auch bei umgekehrter Reihenfolge", () => {
    const reversed: VercelDomainConfig = {
      recommendedCNAME: [
        { rank: 2, value: "cname.vercel-dns.com." },
        { rank: 1, value: "wanted.vercel-dns-017.com." },
      ],
    };
    expect(pickDnsRecords(reversed, false)).toEqual({
      type: "CNAME",
      value: "wanted.vercel-dns-017.com.",
    });
  });

  it("keine Empfehlung vorhanden -> type none (kein erfundener Wert)", () => {
    expect(pickDnsRecords({}, true)).toEqual({ type: "none" });
    expect(pickDnsRecords({}, false)).toEqual({ type: "none" });
  });
});
