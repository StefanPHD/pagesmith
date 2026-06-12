import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { detectElements } from "./detect";

// Aus dem Projekt-Root aufgeloest: import.meta.url ist im jsdom-Env keine
// file://-URL, daher bewusst ueber den cwd der Test-Runs.
const fixture = readFileSync(
  resolve(process.cwd(), "src/lib/__fixtures__/sample-landingpage.html"),
  "utf-8"
);

describe("detectElements – defensive Garantien", () => {
  it("liefert [] fuer leeren String", () => {
    expect(detectElements("")).toEqual([]);
  });

  it("liefert [] fuer reinen Whitespace", () => {
    expect(detectElements("   \n\t  ")).toEqual([]);
  });

  it("wirft nicht bei kaputtem/unvollstaendigem HTML", () => {
    expect(() =>
      detectElements('<button>Klick<form action="/x"><a href=')
    ).not.toThrow();
    // DOMParser ist tolerant – wir wollen nur GARANTIERT keinen Absturz.
    expect(Array.isArray(detectElements("<<>></ </button"))).toBe(true);
  });

  it("verkraftet riesigen Input (~hunderttausende Knoten) ohne Crash", () => {
    const block =
      '<a href="/x" role="button">CTA</a><form action="/f"></form><a href="/nav">Nav</a>';
    const huge = block.repeat(5000); // grob im 100-300 KB-Bereich
    const result = detectElements(huge);
    expect(result.length).toBe(5000 * 3); // 1 Button + 1 Form + 1 Link je Block
  });
});

describe("detectElements – Korrektheit", () => {
  it("zaehlt <a href role=button> genau einmal (als Button, nicht zusaetzlich Link)", () => {
    const result = detectElements('<a href="/buy" role="button">Kaufen</a>');
    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject({ type: "button", tag: "a" });
  });

  it("erkennt input[type=submit|button|image] als Buttons", () => {
    const result = detectElements(
      '<input type="submit" value="Senden">' +
        '<input type="button" value="Klick">' +
        '<input type="image" src="/go.png" alt="Los">'
    );
    expect(result.filter((e) => e.type === "button")).toHaveLength(3);
    // input[type=image] nutzt das alt-Attribut als Label.
    expect(result.some((e) => e.label === "Los")).toBe(true);
  });

  it("erkennt mehrere Formulare und nutzt action als Label", () => {
    const result = detectElements(
      '<form action="/a"></form><form></form><form action="/c"></form>'
    );
    const forms = result.filter((e) => e.type === "form");
    expect(forms).toHaveLength(3);
    expect(forms.map((f) => f.label)).toEqual([
      "/a",
      "(keine action gesetzt)",
      "/c",
    ]);
  });
});

describe("detectElements – echte Landingpage (Fixture)", () => {
  const result = detectElements(fixture);
  const count = (t: string) => result.filter((e) => e.type === t).length;

  it("findet die erwarteten Buttons, Forms und Links", () => {
    expect(count("button")).toBe(7);
    expect(count("form")).toBe(2);
    expect(count("link")).toBe(11);
  });

  it("dedupliziert die role=button-Anchors aus den Links heraus", () => {
    // /checkout und /checkout?plan=pro sind role=button -> Buttons, keine Links.
    const linkLabels = result
      .filter((e) => e.type === "link")
      .map((e) => e.label);
    expect(linkLabels).not.toContain("Programm sichern – 49 €");
    expect(linkLabels).not.toContain("Pro waehlen");
  });
});
