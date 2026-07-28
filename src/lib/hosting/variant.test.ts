import { describe, expect, it } from "vitest";
import {
  VARIANT_COOKIE_NAME,
  chooseVariant,
  emptyPublishVariant,
  parseVariantCookie,
  serializeVariantCookie,
} from "./variant";

describe("parseVariantCookie (Scheibe 9b-1)", () => {
  it("gueltige Werte werden gelesen", () => {
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=a`)).toBe("a");
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=b`)).toBe("b");
  });

  it("Fremd-Cookies im selben Header stoeren nicht", () => {
    expect(
      parseVariantCookie(`foo=1; ${VARIANT_COOKIE_NAME}=b; _ga=GA1.2.3`)
    ).toBe("b");
    // Auch mit unueblichem Whitespace und Werten, die selbst "=" enthalten.
    expect(
      parseVariantCookie(`  sid=eyJ=abc==  ;   ${VARIANT_COOKIE_NAME}=a  `)
    ).toBe("a");
  });

  it("UNGUELTIG wird wie ABWESEND behandelt (null), nie durchgereicht", () => {
    // Der Riegel gegen einen Muellwert in der Varianten-Auswahl.
    expect(parseVariantCookie(null)).toBeNull();
    expect(parseVariantCookie("")).toBeNull();
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=`)).toBeNull();
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=x`)).toBeNull();
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=A`)).toBeNull(); // case-sensitiv
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}=a; extra`)).toBe("a"); // Fragment ohne "=" ignoriert
    expect(parseVariantCookie("foo=1; bar=2")).toBeNull();
  });

  it("MEHRFACHVORKOMMEN ist UNGUELTIG, nicht 'letzter gewinnt'", () => {
    // Zwei Cookies gleichen Namens entstehen genau dann, wenn eines host-only und
    // eines domainweit gesetzt wurde. Welches zuerst kommt, ist nicht garantiert ->
    // "letzter gewinnt" machte den Besucher dauerhaft instabil (mal A, mal B).
    // null heilt den Zustand durch eine frische, sauber host-only gesetzte Zuweisung.
    expect(
      parseVariantCookie(`${VARIANT_COOKIE_NAME}=a; ${VARIANT_COOKIE_NAME}=b`)
    ).toBeNull();
    expect(
      parseVariantCookie(`${VARIANT_COOKIE_NAME}=a; ${VARIANT_COOKIE_NAME}=a`)
    ).toBeNull();
  });

  it("Namens-Praefixe matchen NICHT (exakter Vergleich, auch mit '-' im Namen)", () => {
    // Der Name traegt seit 9b-1 einen Bindestrich (__Host-ps_v). Der Vergleich ist
    // ein exakter String-Vergleich -> Sonderzeichen sind irrelevant, aber die Probe
    // bleibt, damit ein spaeterer Umbau auf startsWith/Regex auffliegt.
    expect(VARIANT_COOKIE_NAME).toContain("-");
    expect(parseVariantCookie(`${VARIANT_COOKIE_NAME}x=a`)).toBeNull();
    expect(parseVariantCookie(`x${VARIANT_COOKIE_NAME}=a`)).toBeNull();
    // Der nackte Rest-Name ohne Praefix darf NICHT matchen.
    expect(parseVariantCookie("ps_v=a")).toBeNull();
  });

  it("__Host--PRAEFIX: der Name traegt ihn (Browser erzwingt host-only/Secure/Path=/)", () => {
    expect(VARIANT_COOKIE_NAME.startsWith("__Host-")).toBe(true);
  });
});

describe("chooseVariant (Scheibe 9b-1)", () => {
  it("gueltiges Cookie gewinnt (Stickiness), KEIN neues Set-Cookie", () => {
    expect(chooseVariant("a", () => 0.99)).toEqual({ variant: "a", isNew: false });
    expect(chooseVariant("b", () => 0.01)).toEqual({ variant: "b", isNew: false });
  });

  it("ohne Cookie: deterministische Abbildung des Zufallswerts + isNew", () => {
    expect(chooseVariant(null, () => 0.1)).toEqual({ variant: "a", isNew: true });
    expect(chooseVariant(null, () => 0.9)).toEqual({ variant: "b", isNew: true });
    // Grenzwert: < 0.5 -> a, sonst b (0.5 selbst faellt auf b).
    expect(chooseVariant(null, () => 0.5).variant).toBe("b");
    expect(chooseVariant(null, () => 0.4999).variant).toBe("a");
  });

  it("VERTEILUNG: ueber viele Ziehungen tauchen BEIDE Buckets auf", () => {
    // NICHT flaky: bei 1000 unabhaengigen fairen Ziehungen ist die
    // Wahrscheinlichkeit, dass ein Bucket komplett fehlt, 2 * 2^-1000 — das ist
    // keine Flakiness, sondern eine Konstante. Der deterministische Test darueber
    // traegt die eigentliche Aussage; dieser hier faengt nur ein hypothetisches
    // "rand() wird gar nicht benutzt".
    const seen = new Set<string>();
    for (let i = 0; i < 1000; i++) seen.add(chooseVariant(null).variant);
    expect(seen.has("a")).toBe(true);
    expect(seen.has("b")).toBe(true);
  });
});

describe("serializeVariantCookie (Scheibe 9b-1) — Invariante (iv)", () => {
  it("host-only, HttpOnly, Secure, SameSite=Lax, Path=/, OHNE Max-Age", () => {
    const c = serializeVariantCookie("b");
    expect(c).toContain(`${VARIANT_COOKIE_NAME}=b`);
    expect(c).toContain("Path=/");
    expect(c).toContain("HttpOnly");
    expect(c).toContain("Secure");
    expect(c).toContain("SameSite=Lax");
    // HOST-ONLY: ein Domain-Attribut wuerde das Cookie ueber die publayer.net-
    // Wildcard fuer ALLE Kundenprojekte gelten lassen -> stille Cross-Tenant-
    // Kopplung der Messung.
    expect(c).not.toMatch(/Domain=/i);
    // SESSION-Cookie: keine Lebensdauer, kein Zeitstempel.
    expect(c).not.toMatch(/Max-Age|Expires/i);
  });
});

describe("emptyPublishVariant (Scheibe Leere-Variante-Riegel)", () => {
  it("T6 die Praedikat-Tabelle", () => {
    const HTML = "<h1>x</h1>";

    // Alles gefuellt -> nichts zu beanstanden.
    expect(emptyPublishVariant(HTML, null)).toBe(null);
    expect(emptyPublishVariant(HTML, { html: HTML })).toBe(null);

    // A leer.
    expect(emptyPublishVariant("", null)).toBe("a");
    expect(emptyPublishVariant("   \n\t ", null)).toBe("a");
    expect(emptyPublishVariant("", { html: HTML })).toBe("a");

    // B leer.
    expect(emptyPublishVariant(HTML, { html: "" })).toBe("b");
    expect(emptyPublishVariant(HTML, { html: "  " })).toBe("b");

    // BEIDE leer -> "a" gewinnt, deterministisch. A ist die Variante, die JEDER
    // Besucher bekommt (ohne aktiven Test liefert die Route immer A), also ist sie
    // der zuerst zu nennende Fehler.
    expect(emptyPublishVariant("", { html: "" })).toBe("a");

    // FAIL-CLOSED (Invariante vi): alles, was nonEmptyHtml nicht als nicht-leer
    // erkennt, gilt als leer — Nicht-Strings inklusive.
    expect(emptyPublishVariant(null, null)).toBe("a");
    expect(emptyPublishVariant(undefined, null)).toBe("a");
    expect(emptyPublishVariant(123, null)).toBe("a");
    expect(emptyPublishVariant(HTML, { html: null })).toBe("b");
    expect(emptyPublishVariant(HTML, { html: undefined })).toBe("b");
  });

  it("AUFLAGE 4: variantB === null heisst 'wird nicht publiziert, nicht pruefen' — kein undefined-Doppelsinn", () => {
    // Der Unterschied, der einen legitimen Publish rettet: derselbe leere B-Inhalt
    // ist EINMAL ein Fehler (B wird geschrieben) und EINMAL irrelevant (B wird
    // nicht geschrieben). Ein Client mit veraltetem Zustand nach dem Entfernen der
    // Variante faellt in den zweiten Fall.
    expect(emptyPublishVariant("<h1>a</h1>", { html: "" })).toBe("b");
    expect(emptyPublishVariant("<h1>a</h1>", null)).toBe(null);
  });

  it("EHRLICHE GRENZE (B5): visuell leeres, aber string-nicht-leeres HTML kommt DURCH", () => {
    // Das ist KEIN Fehler des Riegels, sondern seine dokumentierte Grenze. Der Test
    // steht hier, damit die Luecke benannt bleibt statt spaeter als Bug "entdeckt"
    // zu werden: lueckenlos waere sie nur mit Parsing (per Dauerregel
    // ausgeschlossen) plus Rendering zu schliessen.
    expect(emptyPublishVariant("<div></div>", null)).toBe(null);
    expect(emptyPublishVariant("<!-- nur ein kommentar -->", null)).toBe(null);
    expect(emptyPublishVariant('<div style="display:none">x</div>', null)).toBe(null);
  });
});
