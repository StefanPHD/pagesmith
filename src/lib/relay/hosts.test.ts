import { describe, expect, it } from "vitest";
import { allowedRelayEndpoint, RELAY_HOSTS } from "./hosts";

// DIE HOST-LISTE DES RELAYS (Phase 13.6, Scheibe 13.6-3). Die Erwartungen stammen aus der
// Entscheidung (Owner-Entscheidung P13.6-55; Vermerk P13.6-58, G5), nicht aus dem Code: Stufe 1
// ist die gemessene Make-Zone eu2 und — seit der Scheibe "Zapier ins Relay" (Owner-Entscheidung
// P13.6-97 der Phase 13.6) — der Webhook-Host von Zapier, je exakt verglichen. `zapier.com`
// steht NIE auf der Liste: der Pfad wird nicht geprueft, der Host truege jede Seite von
// zapier.com (Vermerk P13.6-98 der Phase 13.6, Punkt (2)).

describe("RELAY_HOSTS — die Liste der Stufe 1", () => {
  it("H1: genau hook.eu2.make.com und hooks.zapier.com, sonst nichts", () => {
    // GETIPPT aus Owner-Entscheidung P13.6-55 (Make: docs/formular-empfaenger-befunde.md,
    // Abschnitt "Make", Befund (s)) und P13.6-97 (Zapier: ebenda, Abschnitt "Zapier",
    // Befund (b)). Die Liste IST die Entscheidung: jedes weitere Mitglied braucht eine eigene.
    expect([...RELAY_HOSTS]).toEqual(["hook.eu2.make.com", "hooks.zapier.com"]);
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

  // ZAPIER (Scheibe "Zapier ins Relay", Phase 13.6). Die Adressen sind GETIPPT aus der Form in
  // docs/formular-empfaenger-befunde.md, Abschnitt "Zapier", Befund (b)
  // (`https://hooks.zapier.com/hooks/catch/<Nutzer>/<Kennung>/`), nicht aus dem Code.
  it("H2z: die gelesene Zapier-Form wird angenommen und als href zurueckgegeben", () => {
    expect(allowedRelayEndpoint("https://hooks.zapier.com/hooks/catch/123456/abcde/")).toBe(
      "https://hooks.zapier.com/hooks/catch/123456/abcde/"
    );
  });

  // Je Fall einzeln, damit eine Mutation der Normalisierung zeigt, WELCHER Teil traegt: Die
  // Kleinschreibung leistet schon der URL-Parser (gemessen in Node), sie VERDECKT eine
  // umgangene Normalisierung; allein der Punkt am Ende haengt an normalizeFormTargetHost.
  it.each([
    ["Grossschreibung", "https://HOOKS.ZAPIER.COM/hooks/catch/123456/abcde/"],
    ["Punkt am Ende", "https://hooks.zapier.com./hooks/catch/123456/abcde/"],
    ["beides", "https://HOOKS.ZAPIER.COM./hooks/catch/123456/abcde/"],
  ])("H3z: %s -> angenommen", (_name, endpoint) => {
    expect(allowedRelayEndpoint(endpoint)).not.toBeNull();
  });

  it.each([
    ["zapier.com mit Webhook-Pfad (Doku-Form, bleibt direkt)", "https://zapier.com/hooks/catch/123456/abcde/"],
    ["Sammeladresse auf zapier.com", "https://zapier.com/hooks/catch/123456/zbB61,kzXC4,2Ajjn"],
    ["www.zapier.com", "https://www.zapier.com/hooks/catch/123456/abcde/"],
    ["Unterdomaene", "https://x.hooks.zapier.com/hooks/catch/123456/abcde/"],
    ["Praefix-Falle", "https://xhooks.zapier.com/hooks/catch/123456/abcde/"],
    ["Suffix-Falle", "https://hooks.zapier.com.evil.test/hooks/catch/123456/abcde/"],
    ["http", "http://hooks.zapier.com/hooks/catch/123456/abcde/"],
    ["eigener Port", "https://hooks.zapier.com:8443/hooks/catch/123456/abcde/"],
  ])("H4z: %s -> null", (_name, endpoint) => {
    expect(allowedRelayEndpoint(endpoint)).toBeNull();
  });

  it("H4b: kein String -> null", () => {
    expect(allowedRelayEndpoint(undefined)).toBeNull();
    expect(allowedRelayEndpoint(42)).toBeNull();
    expect(allowedRelayEndpoint({ endpoint: "https://hook.eu2.make.com/x" })).toBeNull();
  });
});
