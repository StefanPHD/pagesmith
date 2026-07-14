import { describe, expect, it } from "vitest";
import { renderBlockedPage } from "./blocked-page";

describe("renderBlockedPage (Kill-Switch 451-Seite)", () => {
  it("enthaelt immer die Deaktivierungs-Erklaerung + 451-taugliches statisches HTML", () => {
    const html = renderBlockedPage();
    expect(html).toMatch(/<!DOCTYPE html>/i);
    expect(html).toMatch(/Richtlinienverstößen deaktiviert/);
  });

  it("NEXT_PUBLIC_ABUSE_CONTACT gesetzt -> Kontaktzeile mit Wert erscheint", () => {
    const html = renderBlockedPage("abuse@example.com");
    expect(html).toMatch(/Bei Fragen/);
    expect(html).toContain("abuse@example.com");
  });

  it("leer -> Kontaktzeile fehlt komplett", () => {
    const html = renderBlockedPage("");
    expect(html).not.toMatch(/Bei Fragen/);
  });

  it("nur Whitespace -> Kontaktzeile fehlt (trim ist Pflicht)", () => {
    const html = renderBlockedPage("   ");
    expect(html).not.toMatch(/Bei Fragen/);
  });

  it("undefined/ungesetzt -> Kontaktzeile fehlt", () => {
    const html = renderBlockedPage(undefined);
    expect(html).not.toMatch(/Bei Fragen/);
  });

  it("escaped den Kontaktwert (Hygiene)", () => {
    const html = renderBlockedPage('<script>"x"');
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
  });
});
