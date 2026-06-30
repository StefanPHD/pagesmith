import { describe, expect, it } from "vitest";
import {
  getMetaPixelId,
  setMetaPixelId,
  settingsEqual,
  type ProjectSettings,
} from "./settings";

describe("getMetaPixelId", () => {
  it("leere/absente Settings -> ''", () => {
    expect(getMetaPixelId({})).toBe("");
    expect(getMetaPixelId({ pixels: {} })).toBe("");
    expect(getMetaPixelId({ pixels: { meta: {} } })).toBe("");
  });

  it("getrimmt die gespeicherte ID", () => {
    expect(getMetaPixelId({ pixels: { meta: { pixelId: "  12345  " } } })).toBe(
      "12345"
    );
  });
});

describe("setMetaPixelId", () => {
  it("schreibt pixels.meta.pixelId (getrimmt)", () => {
    const next = setMetaPixelId({}, "  98765  ");
    expect(getMetaPixelId(next)).toBe("98765");
  });

  it("ist immutabel (Original unveraendert)", () => {
    const orig: ProjectSettings = {};
    setMetaPixelId(orig, "123");
    expect(orig).toEqual({});
  });

  it("erhaelt andere (kuenftige) Zweige unter pixels", () => {
    // Simuliert eine spaetere Plattform neben meta -> darf nicht verloren gehen.
    const withOther = {
      pixels: { meta: { pixelId: "1" }, other: { code: "x" } },
    } as ProjectSettings & { pixels: { other: { code: string } } };
    const next = setMetaPixelId(withOther, "2") as typeof withOther;
    expect(getMetaPixelId(next)).toBe("2");
    expect(next.pixels.other.code).toBe("x");
  });
});

describe("settingsEqual", () => {
  it("gleiche Pixel-ID -> gleich", () => {
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "1" } } },
        { pixels: { meta: { pixelId: "1" } } }
      )
    ).toBe(true);
    // leer == leer (auch unterschiedlich genestet, aber beide ohne ID).
    expect(settingsEqual({}, { pixels: {} })).toBe(true);
  });

  it("unterschiedliche Pixel-ID -> dirty", () => {
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "1" } } },
        { pixels: { meta: { pixelId: "2" } } }
      )
    ).toBe(false);
    expect(settingsEqual({}, { pixels: { meta: { pixelId: "1" } } })).toBe(false);
  });
});
