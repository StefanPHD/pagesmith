import { afterEach, beforeEach, describe, expect, it } from "vitest";
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

// Der Serving-Suffix wird call-time aus NEXT_PUBLIC_HOSTING_DOMAIN abgeleitet. Die
// Mechanik-Suite haengt bewusst an einer NEUTRALEN Domain (beispiel.net), NICHT an der
// realen Marke -> die Mechanik-Tests bleiben brand-unabhaengig. Original-env sichern.
const ORIGINAL_HOSTING_DOMAIN = process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
function restoreHostingDomain(): void {
  if (ORIGINAL_HOSTING_DOMAIN === undefined) {
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
  } else {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = ORIGINAL_HOSTING_DOMAIN;
  }
}

describe("extractLabel / isServingHost (env=beispiel.net)", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "beispiel.net";
  });
  afterEach(restoreHostingDomain);

  it("PARITÄT: Serving-Domain (Prod) und lvh.me:3000 (lokal) liefern DASSELBE Label", () => {
    expect(extractLabel("meinprojekt.beispiel.net")).toBe("meinprojekt");
    expect(extractLabel("meinprojekt.lvh.me:3000")).toBe("meinprojekt");
    // Fork-frei: kein Dev/Prod-Sonderpfad.
    expect(extractLabel("meinprojekt.beispiel.net")).toBe(
      extractLabel("meinprojekt.lvh.me:3000")
    );
  });

  it("strippt Port und lowercased", () => {
    expect(extractLabel("Foo.BEISPIEL.net:443")).toBe("foo");
  });

  it("verschachtelte Sub-Subdomain -> null (Label-Injection-Schutz)", () => {
    expect(extractLabel("foo.bar.beispiel.net")).toBeNull();
    expect(isServingHost("foo.bar.beispiel.net")).toBe(false);
  });

  it("App-Hosts / bare Registrable Domain -> null (kein Serving)", () => {
    expect(extractLabel("localhost")).toBeNull();
    expect(extractLabel("localhost:3000")).toBeNull();
    expect(extractLabel("beispiel.net")).toBeNull(); // ohne Subdomain
    expect(extractLabel("pagesmith.app")).toBeNull();
    expect(extractLabel("app.pagesmith.app")).toBeNull(); // anderes Suffix
  });

  it("unzulässige Label-Zeichen -> null (Regex greift vor dem Lookup)", () => {
    expect(extractLabel("bö_se.beispiel.net")).toBeNull();
    expect(extractLabel("a b.beispiel.net")).toBeNull();
    expect(extractLabel(".beispiel.net")).toBeNull(); // leeres Label
  });

  it("gültiges Label -> isServingHost true", () => {
    expect(isServingHost("shop-2.beispiel.net")).toBe(true);
    expect(extractLabel("shop-2.beispiel.net")).toBe("shop-2");
  });

  // Praezisierung 1 (7c-1): der Dispatch (label ? byLabel : byCustomHost) ist NUR
  // korrekt, weil extractLabel suffix-bewusst ist -> Custom-Host = falsy Label.
  it("Custom-Host -> falsy Label (Dispatch-Voraussetzung), Serving/lvh -> Label", () => {
    expect(extractLabel("test-custom.local")).toBeNull();
    expect(extractLabel("landing.kunde.de")).toBeNull();
    expect(extractLabel("foo.beispiel.net")).toBe("foo");
    expect(extractLabel("foo.lvh.me")).toBe("foo");
  });
});

describe("servingSuffixes-Ableitung (aus NEXT_PUBLIC_HOSTING_DOMAIN) + Härtung", () => {
  afterEach(restoreHostingDomain);

  it("env gesetzt -> Prod-Suffix .<domain> matcht", () => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "beispiel.net";
    expect(extractLabel("x.beispiel.net")).toBe("x");
  });

  it("env UNGESETZT -> nur .lvh.me matcht; Prod-Suffix NICHT abgeleitet", () => {
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
    expect(extractLabel("x.lvh.me")).toBe("x"); // hartes Fallback bleibt
    expect(extractLabel("x.beispiel.net")).toBeNull(); // kein Prod-Suffix -> Custom-Host
  });

  it("env LEER/Whitespace -> nur .lvh.me (KEIN leerer '.'-Suffix)", () => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "   ";
    expect(extractLabel("x.lvh.me")).toBe("x");
    expect(extractLabel("x.beispiel.net")).toBeNull();
  });

  it(".lvh.me bleibt IMMER dabei, auch wenn env eine andere Domain setzt", () => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "beispiel.net";
    expect(extractLabel("x.lvh.me")).toBe("x");
    expect(extractLabel("x.beispiel.net")).toBe("x");
  });

  // HÄRTUNG: die von Hand eingetippte env darf fuehrende Punkte / trailing slash /
  // Whitespace / Port / Grossschreibung tragen -> alle ergeben DENSELBEN Suffix
  // .beispiel.net (sonst 404en ALLE Wildcard-Seiten STILL).
  it("Härtung: '.beispiel.net' / 'beispiel.net/' / ' beispiel.net ' / 'BEISPIEL.NET' / ':port' -> selber Suffix", () => {
    for (const dirty of [
      ".beispiel.net",
      "beispiel.net/",
      " beispiel.net ",
      "BEISPIEL.NET",
      "beispiel.net:443",
      "..beispiel.net//",
    ]) {
      process.env.NEXT_PUBLIC_HOSTING_DOMAIN = dirty;
      expect(extractLabel("x.beispiel.net")).toBe("x");
    }
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
    expect(resolveEffectiveHost(headers({ host: "meinprojekt.beispiel.net" }))).toBe(
      "meinprojekt.beispiel.net"
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
    expect(isAppHost("meinprojekt.beispiel.net")).toBe(false);
    expect(isAppHost("meinprojekt.lvh.me")).toBe(false);
    expect(isAppHost("test-custom.local")).toBe(false);
    expect(isAppHost("beispiel.net")).toBe(false); // bare -> nach Inversion Nicht-App
    // Spoof-Schutz: fremde Domain, die nur mit "vercel.app" endet, aber nicht mit ".vercel.app".
    expect(isAppHost("notvercel.app")).toBe(false);
  });
});

describe("buildLiveUrl", () => {
  it("lokal (lvh.me) -> http, Prod-Domain -> https", () => {
    expect(buildLiveUrl("foo", "lvh.me:3000")).toBe("http://foo.lvh.me:3000");
    expect(buildLiveUrl("foo", "beispiel.net")).toBe("https://foo.beispiel.net");
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
