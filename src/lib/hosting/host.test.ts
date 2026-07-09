import { describe, expect, it } from "vitest";
import {
  buildLiveUrl,
  extractLabel,
  isAppHost,
  isServingHost,
  randomLabelSuffix,
  resolveEffectiveHost,
  slugForLabel,
} from "./host";

// Kleiner Headers-Builder fuer resolveEffectiveHost-Tests.
function headers(init: Record<string, string>): Headers {
  return new Headers(init);
}

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

  // Praezisierung 1 (7c-1): der Dispatch (label ? byLabel : byCustomHost) ist NUR
  // korrekt, weil extractLabel suffix-bewusst ist -> Custom-Host = falsy Label.
  it("Custom-Host -> falsy Label (Dispatch-Voraussetzung), pgsm/lvh -> Label", () => {
    expect(extractLabel("test-custom.local")).toBeNull();
    expect(extractLabel("landing.kunde.de")).toBeNull();
    expect(extractLabel("foo.pgsm.site")).toBe("foo");
    expect(extractLabel("foo.lvh.me")).toBe("foo");
  });
});

describe("resolveEffectiveHost (Phase 7c-1)", () => {
  it("x-forwarded-host wird BEVORZUGT vor host", () => {
    expect(
      resolveEffectiveHost(
        headers({ "x-forwarded-host": "test-custom.local", host: "localhost:3000" })
      )
    ).toBe("test-custom.local");
  });

  it("ohne x-forwarded-host -> host-Fallback", () => {
    expect(resolveEffectiveHost(headers({ host: "meinprojekt.pgsm.site" }))).toBe(
      "meinprojekt.pgsm.site"
    );
  });

  it("strippt Port + lowercased", () => {
    expect(resolveEffectiveHost(headers({ host: "XYZ.LVH.me:3000" }))).toBe(
      "xyz.lvh.me"
    );
    expect(resolveEffectiveHost(headers({ host: "localhost:3000" }))).toBe(
      "localhost"
    );
  });

  it("x-forwarded-host als Komma-Liste -> erstes Segment (getrimmt)", () => {
    expect(
      resolveEffectiveHost(
        headers({ "x-forwarded-host": "test-custom.local, evil-attacker.example" })
      )
    ).toBe("test-custom.local");
  });

  it("ungueltige Shape -> null ('/', '..', Leerzeichen, leer)", () => {
    expect(resolveEffectiveHost(headers({ host: "foo/bar" }))).toBeNull();
    expect(resolveEffectiveHost(headers({ host: "foo..bar" }))).toBeNull();
    expect(resolveEffectiveHost(headers({ host: "foo bar" }))).toBeNull();
    expect(resolveEffectiveHost(headers({ host: ".foo" }))).toBeNull();
    expect(resolveEffectiveHost(headers({ host: "" }))).toBeNull();
    expect(resolveEffectiveHost(headers({}))).toBeNull();
  });

  it("gueltiger Custom-Host bleibt erhalten", () => {
    expect(resolveEffectiveHost(headers({ host: "test-custom.local" }))).toBe(
      "test-custom.local"
    );
  });
});

describe("isAppHost (Phase 7c-1)", () => {
  it("App-Hosts -> true (inkl. .vercel.app-Preview, Allowlist-Vollstaendigkeit)", () => {
    expect(isAppHost("pagesmith.app")).toBe(true);
    expect(isAppHost("www.pagesmith.app")).toBe(true);
    expect(isAppHost("pagesmith-git-main.vercel.app")).toBe(true);
    expect(isAppHost("localhost")).toBe(true);
    expect(isAppHost("127.0.0.1")).toBe(true);
  });

  it("Nicht-App -> false (Serving-Zweig)", () => {
    expect(isAppHost("meinprojekt.pgsm.site")).toBe(false);
    expect(isAppHost("meinprojekt.lvh.me")).toBe(false);
    expect(isAppHost("test-custom.local")).toBe(false);
    expect(isAppHost("pgsm.site")).toBe(false); // bare -> nach Inversion Nicht-App
    // Spoof-Schutz: fremde Domain, die nur mit "vercel.app" endet, aber nicht mit ".vercel.app".
    expect(isAppHost("notvercel.app")).toBe(false);
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
