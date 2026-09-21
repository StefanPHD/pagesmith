// DIE ERKENNUNG FREMDER TRACKING-BAUSTEINE (Phase 11.11, Scheibe 11.11b).
//
// DIE FIXTURES SIND ECHTE ANBIETER-GESTALTEN, keine erfundenen: Adressen und Aufrufe
// stammen aus den Belegen (docs/ziel-befunde.md, Teile (g), (ab), (i), (am), (cs),
// (ct); docs/aktiver-stand.md, VERMERKE P11.11-13 und P11.11-25). Eine Fixture, die
// den produktiven Fall nicht trifft, prueft nichts (Dauerregel TESTDATEN UND
// TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD TREFFEN).

import { describe, expect, it } from "vitest";
import {
  hasForeignCmp,
  scanForeignTags,
  INLINE_EXCERPT_MAX,
  UNKNOWN_INLINE,
  type ForeignFinding,
} from "./foreign-scan";
import { generateFunctional } from "./generate";
import type { Mapping } from "./mappings";

function parse(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html");
}

function funde(html: string): ForeignFinding[] {
  const scan = scanForeignTags(parse(html));
  if (scan.status !== "ok") throw new Error(`Erwartet ok, war ${scan.status}`);
  return scan.findings;
}

const bekannt = (fs: ForeignFinding[]) =>
  fs.filter((f): f is Extract<ForeignFinding, { art: "bekannt" }> =>
    f.art === "bekannt"
  );
const unbekannt = (fs: ForeignFinding[]) =>
  fs.filter((f): f is Extract<ForeignFinding, { art: "unbekannt" }> =>
    f.art === "unbekannt"
  );

// Das Meta-Basis-Snippet in seiner belegten Gestalt (Teil (g)).
const META_BASE =
  "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){};" +
  "if(!f._fbq)f._fbq=n}(window,document,'script'," +
  "'https://connect.facebook.net/en_US/fbevents.js');" +
  "fbq('init','123');fbq('track','PageView');</script>";

describe("scanForeignTags — eigen vor fremd", () => {
  // S1. DER LAUF, DEN M1 SPIEGELT — und er laeuft gegen ein von generateFunctional
  // ERZEUGTES Dokument, nicht gegen eine nachgebaute Fixture: Nur so steht der
  // Meta-Teil im Wiring wirklich da.
  //
  // DIE POSITIVKONTROLLE IST PFLICHT UND STEHT IM SELBEN LAUF: Ohne den Nachweis,
  // dass das Dokument `connect.facebook.net` und `fbq(` UEBERHAUPT enthaelt, waere
  // ein gruenes "kein Meta-Fund" TRIVIAL WAHR und M1 nicht aussagekraeftig
  // (Dauerregel EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, Fall (2)).
  it("S1: unser eigenes Wiring wird NICHT als fremdes Meta-Pixel gemeldet", () => {
    const mappings: Mapping[] = [
      { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
    ];
    const erzeugt = generateFunctional(
      '<!DOCTYPE html><html lang="de"><head><title>t</title></head>' +
        '<body><button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>',
      mappings,
      "export",
      { metaPixelId: "1234567890" }
    );

    // POSITIVKONTROLLE — beide Merkmale stehen im erzeugten Text.
    expect(erzeugt).toContain("connect.facebook.net");
    expect(erzeugt).toContain("fbq(");

    const b = bekannt(funde(erzeugt));
    expect(b.flatMap((f) => f.anbieter)).not.toContain("Meta");
    // UND KEIN ANDERER ANBIETER: Unsere eigenen Bloecke sind vollstaendig "eigen".
    expect(b).toHaveLength(0);
  });
});

describe("scanForeignTags — die drei Parkformen und die drei Adress-Orte", () => {
  // S2. type="text/plain" mit der Adresse in `src` (Cookiebot, Usercentrics).
  it("S2: text/plain mit src — erkannt und als geparkt gemeldet", () => {
    const b = bekannt(
      funde(
        '<script type="text/plain" data-cookieconsent="marketing" ' +
          'src="https://consent.cookiebot.com/uc.js"></script>'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Cookiebot"]);
    expect(b[0].klassen).toEqual(["cmp"]);
    expect(b[0].geparkt).toBe(true);
  });

  // S3. DIE ADRESSE IN data-src (Klaro). GEMESSEN: bei einem so geparkten Script
  // liefert getAttribute("src") null — ein Erkenner allein ueber src saehe es als
  // adresslos und meldete es als unbekanntes Inline-Skript.
  it("S3: data-src wird gelesen", () => {
    const b = bekannt(
      funde(
        '<script type="text/plain" data-type="application/javascript" ' +
          'data-src="https://cdn.kiprotect.com/klaro/v0.7/klaro.js"></script>'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Klaro"]);
    expect(b[0].geparkt).toBe(true);
  });

  // S4. DIE ADRESSE IN data-cmp-src, dazu class="cmplazyload" (consentmanager).
  it("S4: data-cmp-src und cmplazyload werden gelesen", () => {
    const b = bekannt(
      funde(
        '<script type="text/plain" class="cmplazyload" data-cmp-vendor="123" ' +
          'data-cmp-src="https://cdn.consentmanager.net/delivery/cmp_de.min.js"></script>'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["consentmanager"]);
    expect(b[0].geparkt).toBe(true);
  });

  // S5. DIE ABWEICHUNG, DIE DIE AUFZAEHLUNG NOETIG MACHT: CookieYes parkt OHNE
  // Typwechsel — das Script behaelt type und src und traegt nur das Attribut. Wer
  // allein auf text/plain prueft, haelt es fuer ein laufendes.
  it("S5: data-cookieyes OHNE Typwechsel gilt als geparkt", () => {
    const b = bekannt(
      funde(
        '<script async data-cookieyes="cookieyes-analytics" ' +
          'src="https://connect.facebook.net/en_US/fbevents.js"></script>'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].geparkt).toBe(true);
  });
});

describe("scanForeignTags — Bild- und Iframe-Tags", () => {
  // S6. DER RUECKFALL IM head. GEMESSEN (jsdom 29.1.1): Der Parser LEERT dort das
  // noscript, das <img> landet im body. Wer ueber den PLATZ erkennt, verliert diesen
  // Fall; die Erkennung geht deshalb ueber die ADRESSE.
  it("S6: Meta-Rueckfall im head — ohne Script daneben erkannt", () => {
    const html =
      '<!DOCTYPE html><html><head><title>t</title>' +
      '<noscript><img height="1" width="1" ' +
      'src="https://www.facebook.com/tr?id=123&ev=PageView&noscript=1"/></noscript>' +
      "</head><body><p>x</p></body></html>";
    const doc = parse(html);
    // POSITIVKONTROLLE der Parser-Eigenschaft, auf die dieser Lauf sich stuetzt.
    expect(doc.head.querySelector("noscript")?.childElementCount).toBe(0);
    expect(doc.body.querySelectorAll("img")).toHaveLength(1);

    const b = bekannt(funde(html));
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
  });

  // S7. Derselbe Rueckfall im body — dort bleibt das <img> Kind des noscript.
  // UND DER GTM-RUECKFALL IST EIN <iframe>, kein <img>: wer den Rueckfall nur als
  // Bild-Element sucht, uebersieht ihn.
  it("S7: Pinterest-img im body und GTM-iframe im body werden erkannt", () => {
    const b = bekannt(
      funde(
        "<!DOCTYPE html><html><head><title>t</title></head><body>" +
          '<noscript><img src="https://ct.pinterest.com/v3/?tid=1&noscript=1"/></noscript>' +
          '<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-ABCDEFGH" ' +
          'height="0" width="0"></iframe></noscript>' +
          "</body></html>"
      )
    );
    expect(b.flatMap((f) => f.anbieter).sort()).toEqual([
      "Google Tag Manager",
      "Pinterest",
    ]);
  });

  // S8. UNBEKANNTE BILDER UND IFRAMES ERSCHEINEN NICHT (P11.11-29). Die Asymmetrie
  // zu den Skripten ist Absicht: eine Seite traegt eine Handvoll Skripte und beliebig
  // viele Bilder.
  it("S8: ein unbekanntes img und ein unbekanntes iframe erscheinen nicht", () => {
    const fs = funde(
      '<img src="https://example.com/held.png"/>' +
        '<iframe src="https://example.com/karte.html"></iframe>'
    );
    expect(fs).toHaveLength(0);
  });
});

describe("scanForeignTags — Klassen, Datenbloecke, Inline-Handler", () => {
  // S9. DER CONTAINER IST EINE EIGENE KLASSE (P11.11-27) und wird am PFAD vom
  // Google-Tag getrennt — der Host ist bei beiden derselbe.
  it("S9: gtm.js ist Container, gtag/js ist Pixel", () => {
    const gtm = bekannt(
      funde('<script src="https://www.googletagmanager.com/gtm.js?id=GTM-A"></script>')
    );
    expect(gtm[0].anbieter).toEqual(["Google Tag Manager"]);
    expect(gtm[0].klassen).toEqual(["container"]);

    const gtag = bekannt(
      funde('<script async src="https://www.googletagmanager.com/gtag/js?id=AW-1"></script>')
    );
    expect(gtag[0].anbieter).toEqual(["Google-Tag"]);
    expect(gtag[0].klassen).toEqual(["pixel"]);
  });

  // S10. REINE DATENBLOECKE WERDEN NICHT GELISTET (P11.11-12, Satz 4) — weder als
  // bekannt noch als unbekannt. Sie fuehren keinen Code aus.
  it("S10: application/ld+json und application/json erscheinen nicht", () => {
    const fs = funde(
      '<script type="application/ld+json">{"@context":"x"}</script>' +
        '<script type="application/json">{"a":1}</script>'
    );
    expect(fs).toHaveLength(0);
  });

  // S11. INLINE-HANDLER NUR MIT BEKANNTEM AUFRUF (Satz 7). Sonst stuende jede
  // Schaltflaeche der Seite in der Liste.
  it("S11: onclick mit fbq( wird gelistet, onclick ohne bekannten Namen nicht", () => {
    const mit = bekannt(funde("<button onclick=\"fbq('track','Lead')\">x</button>"));
    expect(mit).toHaveLength(1);
    expect(mit[0].anbieter).toEqual(["Meta"]);

    const ohne = funde('<button onclick="meineFunktion()">x</button>');
    expect(ohne).toHaveLength(0);
  });
});

describe("scanForeignTags — Mehrfachtreffer (Entscheidung P11.11-32, Punkt (d))", () => {
  // S12. DER LAUF, DEN M9 SPIEGELT: Ein Inline-Script, das ZWEI Anbieter ruft, gehoert
  // BEIDEN. Wer nur den ersten Treffer zaehlte, machte die Reihenfolge der
  // Signaturliste zur Produktaussage.
  it("S12: ein Inline-Skript mit zwei Anbieter-Aufrufen gehoert beiden", () => {
    const b = bekannt(
      funde("<script>fbq('track','Lead');gtag('event','conversion');</script>")
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta", "Google-Tag"]);
    expect(b[0].stellen).toBe(1);
  });

  // S13. EINE BEKANNTE ADRESSE GEHT VOR EINEM NAMEN. Das Meta-Basis-Snippet traegt
  // beides; die Adresse entscheidet allein, und der Rumpf wird nicht mehr befragt.
  it("S13: Adresse vor Namen — ein Script mit Adresse UND fremdem Namen im Rumpf", () => {
    const b = bekannt(
      funde(
        '<script src="https://s.pinimg.com/ct/core.js">fbq(\'track\',\'Lead\')</script>'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Pinterest"]);
  });
});

describe("scanForeignTags — Gruppierung", () => {
  // S14. BEKANNT JE ANBIETER MIT DER ZAHL DER FUNDSTELLEN (P11.11-32, Punkt (c)).
  // Ein Basiscode plus zwei Ereigniszeilen sind DREI Knoten und EINE Tatsache.
  it("S14: drei Meta-Knoten ergeben EINE Zeile mit stellen = 3", () => {
    const b = bekannt(
      funde(
        META_BASE +
          "<script>fbq('track','Lead');</script>" +
          "<script>fbq('track','Purchase');</script>"
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].stellen).toBe(3);
  });

  // S15. DER PARKZUSTAND TEILT DIE GRUPPE. Sonst stuende an einer gemischten Gruppe
  // ein "wartet auf Einwilligung", das nur fuer einen Teil ihrer Fundstellen gilt.
  it("S15: geparkt und nicht geparkt sind zwei Zeilen desselben Anbieters", () => {
    const b = bekannt(
      funde(
        '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
          '<script type="text/plain" src="https://connect.facebook.net/en_US/fbevents.js"></script>'
      )
    );
    expect(b).toHaveLength(2);
    expect(b.map((f) => f.geparkt).sort()).toEqual([false, true]);
    expect(b.every((f) => f.stellen === 1)).toBe(true);
  });

  // S16. UNBEKANNT JE KNOTEN, mit Adresse ODER der Kennung "Inline-Skript" plus
  // Ausschnitt.
  it("S16: unbekannt — Adresse bzw. Inline-Skript mit gekuerztem Ausschnitt", () => {
    const u = unbekannt(
      funde(
        '<script src="https://example.com/slider.js"></script>' +
          "<script>console.log('hallo welt');</script>"
      )
    );
    expect(u).toHaveLength(2);
    expect(u[0]).toEqual({
      art: "unbekannt",
      kennung: "https://example.com/slider.js",
      ausschnitt: null,
    });
    expect(u[1].kennung).toBe(UNKNOWN_INLINE);
    expect(u[1].ausschnitt).toBe("console.log('hallo welt');");
  });

  // S17. DER AUSSCHNITT IST GEKUERZT UND AUF EINFACHE LEERZEICHEN NORMALISIERT —
  // sonst erzeugte ein mehrzeiliges Script eine hohe Zeile.
  it("S17: ein langer, mehrzeiliger Rumpf wird gekuerzt und geglaettet", () => {
    const lang = `\n  var a = 1;\n  ${"x".repeat(200)}\n`;
    const u = unbekannt(funde(`<script>${lang}</script>`));
    expect(u).toHaveLength(1);
    const a = u[0].ausschnitt ?? "";
    expect(a).not.toContain("\n");
    expect(Array.from(a)).toHaveLength(INLINE_EXCERPT_MAX + 1); // + das Kuerzungszeichen
    expect(a.startsWith("var a = 1;")).toBe(true);
  });
});

describe("scanForeignTags — Ausgaenge und hasForeignCmp", () => {
  // S18. "ok" mit leerer Liste ist NICHT dasselbe wie "failed". Ein Dokument ohne
  // jedes Script ist ein sauberer Befund.
  it("S18: ein Dokument ohne Skripte ergibt ok mit leerer Liste", () => {
    const scan = scanForeignTags(parse("<p>nur Text</p>"));
    expect(scan).toEqual({ status: "ok", findings: [] });
  });

  // S19. hasForeignCmp speist die Kollisionsanzeige. Ein PIXEL loest sie NICHT aus —
  // sonst warnte die Oberflaeche bei jeder Seite mit einem Meta-Pixel.
  it("S19: hasForeignCmp ist wahr bei einem CMP und falsch bei einem Pixel", () => {
    const mitCmp = scanForeignTags(
      parse('<script src="https://consent.cookiebot.com/uc.js"></script>')
    );
    expect(hasForeignCmp(mitCmp)).toBe(true);

    const nurPixel = scanForeignTags(parse(META_BASE));
    expect(hasForeignCmp(nurPixel)).toBe(false);

    // UND BEI EINEM NICHT GELAUFENEN SCAN IST SIE FALSCH, nicht "unbekannt": Ein
    // Hinweis auf einen Fund, den niemand erhoben hat, waere eine Behauptung.
    expect(hasForeignCmp({ status: "failed" })).toBe(false);
    expect(hasForeignCmp({ status: "skipped" })).toBe(false);
  });
});

describe("scanForeignTags — die Adresse steht an ALLEN drei Orten, nicht am ersten", () => {
  // DIE ZWEI LAEUFE, DIE M11 SPIEGELT. Der Anlass ist kein erdachter: consentmanager
  // parkt ein <iframe>, indem es src="about:blank" setzt und die echte Adresse nach
  // data-cmp-src verschiebt (VERMERK P11.11-25, consentmanager (d)). Unter "erster
  // nicht-leerer Wert" traege ein so geparktes Tag-Manager-iframe die Adresse
  // "about:blank", traefe keine Signatur und ERSCHIENE GAR NICHT — unbekannte iframes
  // werden bewusst nicht gelistet (P11.11-29). Ein stiller Fehlschlag.
  //
  // SIE HEISSEN S20 UND S21 UND NICHT S16/S17: jene Nummern sind in dieser Datei seit
  // dem Bau vergeben (Gruppierung). Zwei Laeufe desselben Namens waeren ein Anker, der
  // zwei Stellen trifft.
  //
  // DIE ADRESSEN SIND AUS DEM BELEG GETIPPT, nicht aus foreign-signatures.ts
  // importiert (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG
  // NIE AUS DEM CODE): der Tag-Manager-Rueckfall aus docs/ziel-befunde.md, Google (ct),
  // der Meta-Rueckfall aus Meta (g).

  it("S20: geparktes iframe — src=about:blank, Adresse in data-cmp-src", () => {
    const html =
      "<!DOCTYPE html><html><head><title>t</title></head><body>" +
      '<iframe class="cmplazyload" src="about:blank" data-cmp-vendor="755" ' +
      'data-cmp-src="https://www.googletagmanager.com/ns.html?id=GTM-ABCDEFGH" ' +
      'height="0" width="0"></iframe>' +
      "</body></html>";

    // POSITIVKONTROLLE: Der Knoten steht wirklich im geparsten Dokument, und seine
    // zwei Attribute auch. Ohne sie waere ein Fehlschlag nicht von einer Fixture zu
    // unterscheiden, die der Parser verworfen hat.
    const doc = parse(html);
    const frame = doc.querySelector("iframe");
    expect(frame).not.toBeNull();
    expect(frame?.getAttribute("src")).toBe("about:blank");
    expect(frame?.getAttribute("data-cmp-src")).toContain(
      "googletagmanager.com/ns.html"
    );

    const b = bekannt(funde(html));
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Google Tag Manager"]);
    expect(b[0].klassen).toEqual(["container"]);
    expect(b[0].geparkt).toBe(true);
  });

  it("S21: img mit data:-Platzhalter in src und der Meta-Adresse in data-src", () => {
    const html =
      "<!DOCTYPE html><html><head><title>t</title></head><body>" +
      '<img height="1" width="1" ' +
      'src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" ' +
      'data-src="https://www.facebook.com/tr?id=123&ev=PageView&noscript=1"/>' +
      "</body></html>";

    // POSITIVKONTROLLE: der Knoten steht da, und der Platzhalter in src ist KEIN
    // about:blank — er ist ein echter Kandidat, der nur keine Signatur trifft. Der
    // Lauf zeigt damit die VEREINIGUNG ueber die Kandidaten, nicht bloss das
    // Wegwerfen eines Platzhalters.
    const doc = parse(html);
    const img = doc.querySelector("img");
    expect(img).not.toBeNull();
    expect(img?.getAttribute("src")?.startsWith("data:image/gif")).toBe(true);

    const b = bekannt(funde(html));
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].klassen).toEqual(["pixel"]);
  });
});
