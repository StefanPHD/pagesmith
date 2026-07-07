import { describe, expect, it } from "vitest";
import {
  buildLiveUrl,
  extractLabel,
  isServingHost,
  randomLabelSuffix,
  slugForLabel,
} from "./host";

describe("extractLabel / isServingHost", () => {
  it("PARITÄT: pgsm.site (Prod) und lvh.me:3000 (lokal) liefern DASSELBE Label", () => {
    expect(extractLabel("meinprojekt.pgsm.site")).toBe("meinprojekt");
    expect(extractLabel("meinprojekt.lvh.me:3000")).toBe("meinprojekt");
    // Fork-frei: kein Dev/Prod-Sonderpfad.
    expect(extractLabel("meinprojekt.pgsm.site")).toBe(
      extractLabel("meinprojekt.lvh.me:3000")
    );
  });

  it("strippt Port und lowercased", () => {
    expect(extractLabel("Foo.PGSM.site:443")).toBe("foo");
  });

  it("verschachtelte Sub-Subdomain -> null (Label-Injection-Schutz)", () => {
    expect(extractLabel("foo.bar.pgsm.site")).toBeNull();
    expect(isServingHost("foo.bar.pgsm.site")).toBe(false);
  });

  it("App-Hosts / bare Registrable Domain -> null (kein Serving)", () => {
    expect(extractLabel("localhost")).toBeNull();
    expect(extractLabel("localhost:3000")).toBeNull();
    expect(extractLabel("pgsm.site")).toBeNull(); // ohne Subdomain
    expect(extractLabel("pagesmith.app")).toBeNull();
    expect(extractLabel("app.pagesmith.app")).toBeNull(); // anderes Suffix
  });

  it("unzulässige Label-Zeichen -> null (Regex greift vor dem Lookup)", () => {
    expect(extractLabel("bö_se.pgsm.site")).toBeNull();
    expect(extractLabel("a b.pgsm.site")).toBeNull();
    expect(extractLabel(".pgsm.site")).toBeNull(); // leeres Label
  });

  it("gültiges Label -> isServingHost true", () => {
    expect(isServingHost("shop-2.pgsm.site")).toBe(true);
    expect(extractLabel("shop-2.pgsm.site")).toBe("shop-2");
  });
});

describe("buildLiveUrl", () => {
  it("lokal (lvh.me) -> http, Prod (pgsm.site) -> https", () => {
    expect(buildLiveUrl("foo", "lvh.me:3000")).toBe("http://foo.lvh.me:3000");
    expect(buildLiveUrl("foo", "pgsm.site")).toBe("https://foo.pgsm.site");
  });

  it("leere Basis -> leere URL", () => {
    expect(buildLiveUrl("foo", "")).toBe("");
  });
});

describe("slugForLabel / randomLabelSuffix", () => {
  it("transliteriert + slugt, Fallback 'seite'", () => {
    expect(slugForLabel("Über uns!")).toBe("uber-uns");
    expect(slugForLabel("")).toBe("seite");
    expect(slugForLabel("🎉")).toBe("seite");
  });

  it("Suffix ist [a-z0-9], 6 Zeichen", () => {
    expect(randomLabelSuffix()).toMatch(/^[a-z0-9]{6}$/);
  });
});
