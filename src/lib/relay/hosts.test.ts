import { describe, expect, it } from "vitest";
import { allowedRelayEndpoint, RELAY_HOSTS } from "./hosts";

// DIE HOST-LISTE DES RELAYS (Phase 13.6, Scheibe 13.6-3). Die Erwartungen stammen aus der
// Entscheidung (Owner-Entscheidung P13.6-55; Vermerk P13.6-58, G5), nicht aus dem Code: Stufe 1
// ist allein die gemessene Make-Zone eu2, exakt verglichen.

describe("RELAY_HOSTS — die Liste der Stufe 1", () => {
  it("H1: genau hook.eu2.make.com, sonst nichts", () => {
    expect([...RELAY_HOSTS]).toEqual(["hook.eu2.make.com"]);
  });
});

describe("allowedRelayEndpoint — exakter Host, https, keine Zusatzteile", () => {
  it("H2: die gemessene Form wird angenommen und als href zurueckgegeben", () => {
    expect(allowedRelayEndpoint("https://hook.eu2.make.com/test-a")).toBe(
      "https://hook.eu2.make.com/test-a"
    );
    // Leerraum am Rand wie beim Tor (formTargetProblem trimmt ebenfalls).
    expect(allowedRelayEndpoint("  https://hook.eu2.make.com/test-a ")).toBe(
      "https://hook.eu2.make.com/test-a"
    );
  });

  it("H3: Normalisierung — Grossschreibung und Punkt am Ende, Standard-Port 443", () => {
    expect(allowedRelayEndpoint("https://HOOK.EU2.MAKE.COM./test-a")).not.toBeNull();
    expect(allowedRelayEndpoint("https://hook.eu2.make.com:443/test-a")).not.toBeNull();
  });

  it.each([
    ["andere Zone (ungelesen)", "https://hook.eu1.make.com/test-a"],
    ["Platzhalter der Doku", "https://hook.make.com/test-a"],
    ["Suffix-Falle", "https://hook.eu2.make.com.evil.test/test-a"],
    ["Praefix-Falle", "https://xhook.eu2.make.com/test-a"],
    ["Unterdomaene", "https://a.hook.eu2.make.com/test-a"],
    ["anderer Make-Dienst", "https://email.gh-mail.make.com/test-a"],
    ["Nutzername", "https://u@hook.eu2.make.com/test-a"],
    ["Nutzer und Passwort", "https://u:p@hook.eu2.make.com/test-a"],
    ["eigener Port", "https://hook.eu2.make.com:8443/test-a"],
    ["http", "http://hook.eu2.make.com/test-a"],
    ["kein Schema", "hook.eu2.make.com/test-a"],
    ["leer", ""],
  ])("H4: %s -> null", (_name, endpoint) => {
    expect(allowedRelayEndpoint(endpoint)).toBeNull();
  });

  it("H4b: kein String -> null", () => {
    expect(allowedRelayEndpoint(undefined)).toBeNull();
    expect(allowedRelayEndpoint(42)).toBeNull();
    expect(allowedRelayEndpoint({ endpoint: "https://hook.eu2.make.com/x" })).toBeNull();
  });
});
