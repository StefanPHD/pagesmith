import { describe, expect, it } from "vitest";
import {
  getCapiTokenSet,
  getMetaPixelId,
  getTrackingKey,
  setCapiState,
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

  it("ignoriert capi.* BEWUSST (kein false-dirty): settings, die sich NUR in capi unterscheiden, sind gleich", () => {
    // capi wird von der setCapiToken-Action gepflegt + in settings/savedSettings
    // gespiegelt -> es darf den grossen Speichern-Button nie ausloesen.
    expect(
      settingsEqual(
        { capi: { trackingKey: "k", tokenSet: true } },
        { capi: { trackingKey: "other", tokenSet: false } }
      )
    ).toBe(true);
    // Gegenprobe: gleiche Pixel-ID, unterschiedliches capi -> weiterhin gleich.
    expect(
      settingsEqual(
        { pixels: { meta: { pixelId: "5" } }, capi: { tokenSet: true } },
        { pixels: { meta: { pixelId: "5" } } }
      )
    ).toBe(true);
  });
});

describe("capi-Helper (Scheibe 2a)", () => {
  it("getTrackingKey / getCapiTokenSet: leere/absente Settings -> '' bzw. false", () => {
    expect(getTrackingKey({})).toBe("");
    expect(getTrackingKey({ capi: {} })).toBe("");
    expect(getCapiTokenSet({})).toBe(false);
    expect(getCapiTokenSet({ capi: {} })).toBe(false);
    expect(getCapiTokenSet({ capi: { tokenSet: false } })).toBe(false);
  });

  it("getTrackingKey trimmt; getCapiTokenSet liest den Boolean", () => {
    expect(getTrackingKey({ capi: { trackingKey: "  abc  " } })).toBe("abc");
    expect(getCapiTokenSet({ capi: { tokenSet: true } })).toBe(true);
  });

  it("setCapiState schreibt trackingKey + tokenSet (Round-Trip)", () => {
    const next = setCapiState({}, { trackingKey: "key-123", tokenSet: true });
    expect(getTrackingKey(next)).toBe("key-123");
    expect(getCapiTokenSet(next)).toBe(true);
  });

  it("setCapiState ist immutabel (Original unveraendert)", () => {
    const orig: ProjectSettings = {};
    setCapiState(orig, { trackingKey: "k", tokenSet: true });
    expect(orig).toEqual({});
  });

  it("setCapiState laesst pixels/Pixel-ID unangetastet", () => {
    const withPixel: ProjectSettings = { pixels: { meta: { pixelId: "999" } } };
    const next = setCapiState(withPixel, { trackingKey: "k", tokenSet: true });
    // Pixel-ID bleibt -> eine unsaved Pixel-ID-Edit geht beim Token-Set nicht verloren.
    expect(getMetaPixelId(next)).toBe("999");
    expect(getTrackingKey(next)).toBe("k");
  });
});
