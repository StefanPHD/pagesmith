import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  buildLiveUrl,
  extractLabel,
  isAppHost,
  isReservedHost,
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

// Phase 13.7, Scheibe K2b (Zuschnitt P13.7-36, (3)): kryptografischer Label-Zufall. Die
// erwarteten Suffixe sind aus der Entscheidung von Hand gerechnet (Alphabet
// "0123456789abcdefghijklmnopqrstuvwxyz", Zeichen = Alphabet[Byte % 36], Bytes >= 252
// verworfen), nicht aus dem Code abgelesen.
describe("randomLabelSuffix — Zufallsquelle (Phase 13.7, K2b)", () => {
  function feedBytes(seq: number[]) {
    return vi
      .spyOn(globalThis.crypto, "getRandomValues")
      .mockImplementation(<T extends ArrayBufferView | null>(arr: T): T => {
        const view = arr as unknown as Uint8Array;
        view.fill(0);
        view.set(seq.slice(0, view.length));
        return arr;
      });
  }
  afterEach(() => {
    vi.restoreAllMocks();
  });

  // Faengt die Mutation "zurueck auf Math.random" AN DER QUELLE: Math.random ist auf eine
  // Konstante gelegt; eine Implementierung darueber lieferte "i00000", nie "01az0z". H2 faellt
  // unter derselben Mutation ebenfalls (seine Bytes wirken dann nicht), prueft aber das
  // Verwerfen, nicht die Quelle.
  it("H1: der Suffix kommt aus crypto.getRandomValues, nicht aus Math.random", () => {
    const rv = feedBytes([0, 1, 10, 35, 36, 71]);
    const mr = vi.spyOn(Math, "random").mockReturnValue(0.5);
    expect(randomLabelSuffix()).toBe("01az0z");
    expect(rv).toHaveBeenCalled();
    expect(mr).not.toHaveBeenCalled();
  });

  // EINZIGER Faenger der Mutation "Modulo ohne Verwerfen": dann ergaebe dieselbe Folge
  // "03125z" (252, 255, 253, 254 zaehlten als 0, 3, 1, 2).
  it("H2: Bytes ab 252 werden verworfen (Gleichverteilung), die folgenden zaehlen", () => {
    feedBytes([252, 255, 253, 254, 5, 251, 0, 200, 100, 36]);
    expect(randomLabelSuffix()).toBe("5z0ks0");
  });
});

// Phase 13.7, Scheibe K2a (Zuschnitt P13.7-31): reservierte Hosts. Die Erwartungen stammen
// aus den Entscheidungen E1/E2 (Quelle, Label-Grenze, fail-closed), nicht aus dem Code.
describe("isReservedHost (Phase 13.7, K2a; env=beispiel.net)", () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "beispiel.net";
  });
  afterEach(() => {
    restoreHostingDomain();
    vi.restoreAllMocks();
  });

  // T1 — einziger Test, der die Apex-GLEICHHEIT traegt (Mutation (b)).
  it("T1: der Apex der Serving-Domain ist reserviert", () => {
    expect(isReservedHost("beispiel.net")).toBe(true);
  });

  it("T2: der ganze Teilbaum der Serving-Domain und von .lvh.me ist reserviert", () => {
    expect(isReservedHost("foo.beispiel.net")).toBe(true);
    expect(isReservedHost("a.b.beispiel.net")).toBe(true);
    expect(isReservedHost("lvh.me")).toBe(true);
    expect(isReservedHost("x.lvh.me")).toBe(true);
  });

  // T3 — traegt die LABEL-GRENZE (Mutation (a): blosses endsWith sperrt diese Namen).
  it("T3: Namen, die nur auf die Zeichenfolge enden, sind NICHT reserviert", () => {
    expect(isReservedHost("meinbeispiel.net")).toBe(false);
    expect(isReservedHost("beispiel.net.kunde.de")).toBe(false);
    expect(isReservedHost("myvercel.app")).toBe(false);
    expect(isReservedHost("meinlvh.me")).toBe(false);
  });

  it("T4: vercel.app samt Teilbaum ist reserviert", () => {
    expect(isReservedHost("vercel.app")).toBe(true);
    expect(isReservedHost("pagesmith-delta.vercel.app")).toBe(true);
  });

  it("T5: die App-Hosts samt Subdomains sind reserviert (Label-Grenze, nicht exakt wie isAppHost)", () => {
    expect(isReservedHost("pagesmith.app")).toBe(true);
    expect(isReservedHost("www.pagesmith.app")).toBe(true);
    expect(isReservedHost("x.pagesmith.app")).toBe(true);
    expect(isReservedHost("localhost")).toBe(true);
    expect(isReservedHost("127.0.0.1")).toBe(true);
  });

  it("T6: eigene Normalisierung — Grossschreibung, Punkte am Ende, Leerraum (Werte aus der DB)", () => {
    expect(isReservedHost("BEISPIEL.NET.")).toBe(true);
    expect(isReservedHost(" Foo.Beispiel.Net.. ")).toBe(true);
    expect(isReservedHost("X.VERCEL.APP.")).toBe(true);
  });

  // T7 — POSITIVKONTROLLE: ohne sie bestuende ein Praedikat, das immer true liefert, T1-T6.
  it("T7: eine Kundendomain ist NICHT reserviert", () => {
    expect(isReservedHost("kunde.de")).toBe(false);
    expect(isReservedHost("landing.kunde.de")).toBe(false);
  });

  // T8 — Entscheidung E2: fehlt die Serving-Domain, gilt JEDER Host als reserviert, und das
  // wird geloggt, ohne den Host. Rot bei fail-open.
  it("T8: Env fehlt oder leer -> fail-closed, auch kunde.de; geloggt ohne den Host", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
    expect(isReservedHost("kunde.de")).toBe(true);
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "   ";
    expect(isReservedHost("kunde.de")).toBe(true);
    expect(warn).toHaveBeenCalledTimes(2);
    for (const call of warn.mock.calls) {
      expect(call.join(" ")).not.toContain("kunde.de");
    }
  });

  // T8b — GEGENPROBE zu T8: eine gesetzte Env, die nur den Fallback ergibt (lokal "lvh.me:3000"),
  // ist NICHT "fehlend" — eine Erkennung ueber die Zahl der Suffixe saehe das anders.
  it("T8b: Env 'lvh.me:3000' (lokal) ist gesetzt -> kunde.de NICHT reserviert, kein Log", () => {
    const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "lvh.me:3000";
    expect(isReservedHost("kunde.de")).toBe(false);
    expect(isReservedHost("x.lvh.me")).toBe(true);
    expect(warn).not.toHaveBeenCalled();
  });
});
