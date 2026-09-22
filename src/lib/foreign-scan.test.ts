// DIE ERKENNUNG FREMDER TRACKING-BAUSTEINE (Phase 11.11, Scheibe 11.11b).
//
// DIE FIXTURES SIND ECHTE ANBIETER-GESTALTEN, keine erfundenen: Adressen und Aufrufe
// stammen aus den Belegen (docs/ziel-befunde.md, Teile (g), (ab), (i), (am), (cs),
// (ct); docs/claude-history/phase-11.11-import-bereinigung.md, VERMERKE P11.11-13 und P11.11-25). Eine Fixture, die
// den produktiven Fall nicht trifft, prueft nichts (Dauerregel TESTDATEN UND
// TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD TREFFEN).

import { describe, expect, it } from "vitest";
import {
  buildForeignView,
  foreignRemoveLabel,
  hasForeignCmp,
  hostVon,
  scanForeignTags,
  FOREIGN_ANBIETER_NOTE,
  FOREIGN_GOOGLE_TAG_NOTE,
  FOREIGN_GROUP_INLINE,
  FOREIGN_GROUP_NO_HOST,
  FOREIGN_MANUAL_NOTE,
  FOREIGN_REST_MESSAGE,
  FOREIGN_UNKNOWN_HEADING,
  INLINE_EXCERPT_MAX,
  UNKNOWN_INLINE,
  type ForeignFinding,
} from "./foreign-scan";
// NUR FUER DEN STRUKTUR-WAECHTER S23 — er prueft keine Wortlaute, sondern eine
// Eigenschaft (jeder Schluessel der Hinweis-Zuordnung ist ein Anbieter der Liste).
// Das ist die im Kopf von foreign-signatures.ts benannte Ausnahme.
import { FOREIGN_SIGNATURES } from "./foreign-signatures";
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
  // Drei Meta-Knoten sind DREI Fundstellen und EINE Tatsache.
  //
  // SEINE FIXTURE IST AM 2026-09-21 ERSETZT WORDEN, und der Grund gehoert an den Lauf,
  // sonst liest die naechste Runde ihn als willkuerlich: Bis ENTSCHEIDUNG P11.11-38
  // standen hier der Basiscode UND ZWEI EREIGNISZEILEN (`fbq('track', …)`), und alle
  // drei bildeten EINE Gruppe. Seither traegt eine Ereigniszeile keine Lade-Adresse,
  // gilt als AUFRUF IN SEITEN-CODE und bildet eine EIGENE Gruppe — die alte Fixture
  // ergaebe ZWEI Zeilen. DER GEGENSTAND DES LAUFS IST UNVERAENDERT (Gruppierung je
  // Anbieter mit Fundstellen-Zahl); ersetzt sind die drei Knoten, an denen er misst:
  // Basiscode, Lade-Script und Rueckfall-Bild — alle drei tragen eine Adresse.
  it("S14: drei Meta-Knoten ergeben EINE Zeile mit stellen = 3", () => {
    const b = bekannt(
      funde(
        META_BASE +
          '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
          '<img height="1" width="1" src="https://www.facebook.com/tr?id=1&ev=PageView">'
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].stellen).toBe(3);
    expect(b[0].traeger).toBe("knoten");
  });

  // S14b. UND DIE ANDERE HAELFTE DERSELBEN AENDERUNG, eigens festgenagelt: Eine
  // EREIGNISZEILE neben dem Basiscode ist eine ZWEITE Zeile und kein Teil der ersten.
  //
  // ER STEHT HIER UND NICHT BEI S27, weil er die GRUPPIERUNG prueft und nicht den
  // Traeger: Ohne ihn waere aus S14 nur noch abzulesen, dass drei Knoten eine Zeile
  // ergeben — nicht, dass die frueher mitgezaehlte Ereigniszeile jetzt daneben steht.
  it("S14b: Basiscode und Ereigniszeile sind ZWEI Zeilen desselben Anbieters", () => {
    const b = bekannt(
      funde(META_BASE + "<script>fbq('track','Lead');</script>")
    );
    expect(b).toHaveLength(2);
    expect(b.every((f) => f.anbieter[0] === "Meta")).toBe(true);
    expect(b.every((f) => f.stellen === 1)).toBe(true);
    expect(b.map((f) => f.traeger).sort()).toEqual(["aufruf", "knoten"]);
    expect(b.map((f) => f.entfernbar).sort()).toEqual([false, true]);
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

// ===========================================================================
// DIE SCHEIBE 11.11c — DIE DREI NEUEN FELDER AM FUND, DER KNOPFNAME UND DIE
// HINWEIS-ZUORDNUNG.
//
// DIE ERWARTUNGEN SIND AUS DEN ENTSCHEIDUNGEN GETIPPT, NIE AUS DEM CODE ABGELESEN
// (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM
// CODE). AUSGENOMMEN ist S23: er ist ein STRUKTUR-Waechter und darf die Signaturliste
// lesen, weil er keine Wortlaute prueft, sondern eine Eigenschaft.
// ===========================================================================

describe("scanForeignTags — Traeger, entfernbar und Schluessel (11.11c)", () => {
  const rahmen = (rumpf: string) =>
    `<!DOCTYPE html><html lang="de"><head><title>t</title></head><body>${rumpf}</body></html>`;

  // S22. DIE TRAEGER-ACHSE TEILT DIE GRUPPE (ENTSCHEIDUNG P11.11-36, Punkt (F1)).
  // OHNE SIE stuenden Script und Inline-Handler desselben Anbieters in EINER Zeile,
  // und ein Knopf daran entfernte nur die Haelfte ihrer Fundstellen, waehrend der
  // Handarbeits-Hinweis nur fuer die andere gaelte.
  it("S22: Script und onclick desselben Anbieters sind ZWEI Gruppen", () => {
    const b = bekannt(
      funde(
        rahmen(
          '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
            "<a href=\"https://example.com/x\" onclick=\"fbq('track','Lead')\">K</a>"
        )
      )
    );
    expect(b).toHaveLength(2);
    expect(b.map((f) => f.traeger).sort()).toEqual(["handler", "knoten"]);
    expect(b.every((f) => f.anbieter[0] === "Meta")).toBe(true);
    expect(b.every((f) => f.stellen === 1)).toBe(true);
    // UND SIE HABEN VERSCHIEDENE SCHLUESSEL — sonst traefe ein Klick beide.
    expect(b[0].schluessel).not.toBe(b[1].schluessel);
  });

  // S23. DER STRUKTUR-WAECHTER ZUR HINWEIS-ZUORDNUNG (ENTSCHEIDUNG P11.11-36, Punkt
  // (F4)). Die Zuordnung traegt ein zweites Literal des Anbieternamens, weil
  // foreign-signatures.ts vom Scope-Waechter geschuetzt ist; DIESER LAUF DECKT ES:
  // Eine Umbenennung des Anbieters macht ihn rot.
  //
  // DIE POSITIVKONTROLLE IST PFLICHT: Waere die Zuordnung leer, liefe die Schleife
  // durch, ohne etwas zu pruefen.
  it("S23: jeder Schluessel der Hinweis-Zuordnung ist ein Anbieter der Signaturliste", () => {
    const schluessel = Object.keys(FOREIGN_ANBIETER_NOTE);
    expect(schluessel.length).toBeGreaterThan(0);
    const anbieter = new Set(FOREIGN_SIGNATURES.map((s) => s.anbieter));
    for (const k of schluessel) expect(anbieter.has(k)).toBe(true);
    // Und der Google-Tag traegt ihn — aus der ENTSCHEIDUNG getippt, nicht abgelesen.
    expect(FOREIGN_ANBIETER_NOTE["Google-Tag"]).toBe(FOREIGN_GOOGLE_TAG_NOTE);
  });

  // S24. DIE entfernbar-REGEL, alle fuenf Faelle nebeneinander. `every` statt `some`
  // ist der Unterschied zwischen fail-closed und fail-open.
  it("S24: entfernbar nur bei GANZEN Knoten und ausschliesslich der Klasse pixel", () => {
    const eins = (rumpf: string) => {
      const b = bekannt(funde(rahmen(rumpf)));
      expect(b).toHaveLength(1);
      return b[0];
    };
    expect(
      eins('<script src="https://connect.facebook.net/en_US/fbevents.js"></script>')
        .entfernbar
    ).toBe(true);
    expect(
      eins('<script src="https://consent.cookiebot.com/uc.js"></script>').entfernbar
    ).toBe(false);
    expect(
      eins('<script src="https://www.googletagmanager.com/gtm.js?id=GTM-A"></script>')
        .entfernbar
    ).toBe(false);
    expect(
      eins("<a href=\"https://example.com/x\" onclick=\"fbq('track','Lead')\">K</a>")
        .entfernbar
    ).toBe(false);
    // DIE GEMISCHTE GRUPPE IST AM 2026-09-21 ZWEIMAL ERSETZT WORDEN, und beide Male
    // aus demselben Grund: Ihr Gegenstand ist die KLASSEN-Regel (`every` statt `some`),
    // und die darf nicht von einer anderen Achse verdeckt werden (Dauerregel EIN
    // GRUENER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRUENHEIT DERSELBE GEBLIEBEN
    // IST).
    // (1) Ohne Lade-Adresse waere sie seit ENTSCHEIDUNG P11.11-38 ein AUFRUF, und
    //     `entfernbar === false` kaeme schon vom TRAEGER.
    // (2) Mit Metas Lade-Adresse UND einem Cookiebot-NAMEN entscheidet seit K3 die
    //     ADRESSE ALLEIN — der Name wird gar nicht mehr befragt, und die Gruppe waere
    //     reines `pixel`, also entfernbar.
    // GEBAUT IST DESHALB EINE GEMISCHTE GRUPPE AUS ZWEI ADRESSEN: Metas Lader (pixel)
    // und der Tag-Manager (container) in EINEM Script. Beide treffen ueber die Adresse,
    // der Traeger ist "knoten", und allein `every` haelt den Knopf zurueck.
    const gemischt = eins(
      "<script>!function(f,b,e,v){f.fbq=function(){};}(window,document,'script'," +
        "'https://connect.facebook.net/en_US/fbevents.js');" +
        "j.src='https://www.googletagmanager.com/gtm.js?id=GTM-A';</script>"
    );
    expect(gemischt.traeger).toBe("knoten"); // ANKER
    expect(gemischt.klassen).toEqual(["pixel", "container"]); // ANKER
    expect(gemischt.entfernbar).toBe(false);
  });

  // S25. DER KNOPFNAME WIRD GEBILDET, NICHT GETIPPT — und er nennt ALLE beteiligten
  // Anbieter (ENTSCHEIDUNG P11.11-35, Satz (d), und P11.11-32, Punkt (d)). Ein Knopf
  // "Meta entfernen", der ausserdem Google mitnaehme, waere der Fehltreffer, vor dem
  // die Roadmap-Zeile 11.11 unter (e) warnt.
  it("S25: foreignRemoveLabel nennt einen, zwei und drei Anbieter", () => {
    expect(foreignRemoveLabel(["Meta"])).toBe("Meta aus dem Code entfernen");
    expect(foreignRemoveLabel(["Meta", "Google-Tag"])).toBe(
      "Meta und Google-Tag aus dem Code entfernen"
    );
    expect(foreignRemoveLabel(["Meta", "Google-Tag", "TikTok"])).toBe(
      "Meta, Google-Tag und TikTok aus dem Code entfernen"
    );
    // ER KOLLIDIERT NICHT MIT DEN KNOPFNAMEN DES EINSTELLUNGS-DRAWERS, und das ist
    // der Grund fuer "aus dem Code": dort heissen sie "Meta entfernen" und
    // "Ja, Meta entfernen", an der Domain-Zeile schlicht "Entfernen".
    for (const name of ["Meta entfernen", "Ja, Meta entfernen", "Entfernen"])
      expect(foreignRemoveLabel(["Meta"])).not.toBe(name);
  });

  // S26. DIE VIER NEUEN WORTLAUTE GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN
  // (ENTSCHEIDUNG P11.11-36, Punkt (F3)). Die vier Nadeln stammen aus
  // CodeImporter.test.tsx; "Scripte" aus SK10. EINE KOLLISION WIRD GEMELDET, NICHT
  // DURCH EINE TEXT-ANPASSUNG BESEITIGT — ein angepasster Text waere eine
  // Owner-Freigabe, die niemand erteilt hat.
  it("S26: kein neuer Wortlaut traegt eine der vier Nadeln oder die Form Scripte", () => {
    const texte = [
      foreignRemoveLabel(["Meta", "Google-Tag"]),
      FOREIGN_GOOGLE_TAG_NOTE,
      FOREIGN_MANUAL_NOTE,
      FOREIGN_REST_MESSAGE,
    ];
    // POSITIVKONTROLLE: die Nadeln treffen, wenn es etwas zu treffen gibt.
    expect(/%/.test("50 %")).toBe(true);
    expect(/gerettet/i.test("gerettet")).toBe(true);
    for (const t of texte) {
      expect(t).not.toMatch(/%/);
      expect(t).not.toMatch(/gerettet/i);
      expect(t).not.toMatch(/mindestens/);
      expect(t).not.toMatch(/NaN/);
      expect(t).not.toContain("Scripte");
      expect(t).not.toContain("Tracking-Pixel");
    }
  });

  // S27. DER DRITTE TRAEGER (ENTSCHEIDUNG P11.11-38). Ein Inline-Script OHNE
  // Lade-Adresse, das nur ueber einen NAMEN getroffen wird, ist ein AUFRUF IN
  // SEITEN-CODE — kein Knopf.
  //
  // DIE FIXTURE IST DER PRODUKTIVE FALL UND KEINE MINIMAL-ATTRAPPE: Sie traegt
  // Formular- und Menuelogik UND die Ereigniszeile in EINEM Script. Genau daran haengt
  // die Entscheidung — ein Klick auf "Meta" haette diese Logik geloescht (Dauerregel
  // TESTDATEN UND TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD TREFFEN).
  it("S27: ein Inline-Skript mit Seitenlogik und fbq( ist ein Aufruf, kein Knoten", () => {
    const b = bekannt(
      funde(
        rahmen(
          "<script>document.querySelector('#m').addEventListener('click'," +
            "function(){document.body.classList.toggle('offen');});" +
            "fbq('track','Lead');</script>"
        )
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].traeger).toBe("aufruf");
    expect(b[0].entfernbar).toBe(false);
  });

  // S28. DIE GEGENPROBE IN DREI RICHTUNGEN — ohne sie waere S27 auch dann gruen, wenn
  // GAR NICHTS mehr als Knoten gaelte.
  it("S28: Adresse im Rumpf, Adresse im Attribut und ein gemischtes Script sind Knoten", () => {
    const eins = (rumpf: string) => {
      const b = bekannt(funde(rahmen(rumpf)));
      expect(b).toHaveLength(1);
      return b[0];
    };
    // (a) DER BASISCODE: die Lade-Adresse steht als Zeichenkette im RUMPF. Das ist der
    // Befund V1 — alle vier Basiscodes tragen sie so.
    const basis = eins(
      "<script>!function(f,b,e,v){f.fbq=function(){};}(window,document,'script'," +
        "'https://connect.facebook.net/en_US/fbevents.js');fbq('init','1');</script>"
    );
    expect(basis.traeger).toBe("knoten");
    expect(basis.entfernbar).toBe(true);

    // (b) DIE ADRESSE IM ATTRIBUT bleibt unveraendert "knoten".
    expect(
      eins('<script src="https://connect.facebook.net/en_US/fbevents.js"></script>')
        .traeger
    ).toBe("knoten");

    // (c) DIE GRENZE DER ENTSCHEIDUNG: Ein Script, das Basiscode UND eigene Logik
    // MISCHT, ist "knoten" und wird GANZ entfernt. Wer beides in einen Knoten legt,
    // hat es untrennbar gemacht.
    //
    // DIE FIXTURE TRAEGT EIGENS EINEN ECHTEN `fbq(`-AUFRUF, und der Satz steht hier,
    // weil er beim Schreiben GEMESSEN gefehlt hat: DIE ADRESSE ALLEIN MACHT KEINEN
    // FUND. Getroffen wird ueber die NAMEN (anbieterFuer); die Adresse entscheidet
    // danach nur noch den TRAEGER. Ein Script mit der Adresse als blossem Text und
    // ohne Aufruf ist "unbekannt" — nicht etwa ein nicht entfernbarer Knoten.
    const gemischt = eins(
      "<script>window.meinMenue=function(){};" +
        "!function(f,b,e,v){f.fbq=function(){};}(window,document,'script'," +
        "'https://connect.facebook.net/en_US/fbevents.js');fbq('init','1');</script>"
    );
    expect(gemischt.traeger).toBe("knoten");
    expect(gemischt.entfernbar).toBe(true);
  });

  // S29. DER GOOGLE-KONFIGURATIONS-SCHNIPSEL IST EIN AUFRUF, DAS LADE-SCRIPT EIN
  // KNOTEN — und sie sind ZWEI Zeilen, weil der Traeger in den Schluessel eingeht.
  //
  // DAS IST DIE GEMESSENE FOLGE VON V1: Beim Google-Tag steht die Adresse im
  // LADE-Script; der Schnipsel traegt nur `window.dataLayer`, `function gtag(){…}` und
  // die zwei Aufrufe.
  it("S29: gtag-Ladescript ist Knoten, der Konfigurations-Schnipsel ist Aufruf", () => {
    const b = bekannt(
      funde(
        rahmen(
          '<script async src="https://www.googletagmanager.com/gtag/js?id=AW-1"></script>' +
            "<script>window.dataLayer=window.dataLayer||[];" +
            "function gtag(){dataLayer.push(arguments);}" +
            "gtag('js',new Date());gtag('config','AW-1');</script>"
        )
      )
    );
    expect(b).toHaveLength(2);
    expect(b.every((f) => f.anbieter[0] === "Google-Tag")).toBe(true);
    expect(b.map((f) => f.traeger).sort()).toEqual(["aufruf", "knoten"]);
    expect(b.map((f) => f.entfernbar).sort()).toEqual([false, true]);
    // UND SIE HABEN VERSCHIEDENE SCHLUESSEL — sonst naehme ein Klick beide mit.
    expect(b[0].schluessel).not.toBe(b[1].schluessel);
  });

  // S30. EINE LADE-ADRESSE IM RUMPF ENTSCHEIDET ALLEIN — AUCH GEGEN EINEN NAMEN.
  //
  // DIESER LAUF IST AM 2026-09-21 UMGEDREHT WORDEN, und der Grund gehoert an ihn, sonst
  // liest die naechste Runde ihn als Defekt: Bis dahin behauptete er, Metas Adresse als
  // blosser Text mache aus einem `gtag(`-Aufruf keinen Knoten. SEIT K3 (ENTSCHEIDUNG
  // P11.11-38, Ergaenzung) ZAEHLT EINE LADE-ADRESSE IM RUMPF ALS ADRESS-TREFFER und
  // steht damit VOR den Namen (dieselbe Rangfolge wie P11.11-32, Punkt (d)).
  //
  // DAS IST DER PREIS VON K3, UND ER WIRD HIER BENANNT STATT VERSCHWIEGEN: Die Regel
  // kann einen LADER nicht von einer blossen ERWAEHNUNG der Lade-Adresse trennen. Wer
  // die Adresse als Text in seinem Code fuehrt, bekommt das Etikett des Anbieters und
  // einen Knopf. DER TAUSCH IST BEWUSST: Ohne die Regel bliebe LinkedIns LADER
  // unbekannt und sein Pixel liefe nach dem Klick weiter (GEMESSEN, V2).
  it("S30: eine Lade-Adresse im Rumpf schlaegt den Namen eines anderen Anbieters", () => {
    const b = bekannt(
      funde(
        rahmen(
          "<script>var hinweis='https://connect.facebook.net/en_US/fbevents.js';" +
            "gtag('event','conversion');</script>"
        )
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta"]);
    expect(b[0].traeger).toBe("knoten");
    expect(b[0].entfernbar).toBe(true);
  });

  // S30b. DER LINKEDIN-LADER — DER FALL, UM DESSENTWILLEN K3 GEBAUT WURDE.
  //
  // Er setzt `window.lintrk` als ZUWEISUNG und uebergibt es als Argument; `lintrk(`
  // mit Klammer steht nirgends, und `_linkedin_partner_id` steht im ANDEREN Block.
  // OHNE K3 WAERE ER EIN UNBEKANNTES INLINE-SKRIPT: kein Etikett, kein Knopf — und ein
  // Klick auf "LinkedIn" naehme nur das Rueckfall-Bild mit (GEMESSEN, V2).
  it("S30b: LinkedIns Lade-Block wird erkannt, obwohl kein Name greift", () => {
    const LADER =
      "<script>(function(l) {if (!l){window.lintrk = function(a,b){" +
      "window.lintrk.q.push([a,b])};window.lintrk.q=[]}" +
      "var s = document.getElementsByTagName('script')[0];" +
      "var b = document.createElement('script');" +
      "b.type = 'text/javascript';b.async = true;" +
      "b.src = 'https://snap.licdn.com/li.lms-analytics/insight.min.js';" +
      "s.parentNode.insertBefore(b, s);})(window.lintrk);</script>";
    // POSITIVKONTROLLE: KEIN Name des Eintrags steht in diesem Block — sonst waere der
    // Lauf auch ohne K3 gruen und bewiese nichts.
    expect(LADER).not.toContain("lintrk(");
    expect(LADER).not.toContain("_linkedin_partner_id");

    const b = bekannt(funde(rahmen(LADER)));
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["LinkedIn"]);
    expect(b[0].traeger).toBe("knoten");
    expect(b[0].entfernbar).toBe(true);
  });

  // S31. EINE RUECKFALL-ADRESSE IM RUMPF MACHT EBENFALLS KEINEN KNOTEN. Die Frage
  // lautet "laedt dieses Script sein Anbieter-Script?" — `www.facebook.com/tr?` ist
  // das Bild-Pixel und kein Lader.
  it("S31: die Rueckfall-Adresse im Rumpf macht aus einem Aufruf keinen Knoten", () => {
    const b = bekannt(
      funde(
        rahmen(
          "<script>var px='https://www.facebook.com/tr?id=1';" +
            "fbq('track','Lead');</script>"
        )
      )
    );
    expect(b).toHaveLength(1);
    expect(b[0].traeger).toBe("aufruf");
    expect(b[0].entfernbar).toBe(false);
  });
});

// ===========================================================================
// DIE ANZEIGE-SICHT: BUENDELN UND ORDNEN (Phase 11.11, Scheibe 11.11e).
//
// SIE ERKENNT NICHTS ANDERS. Jeder Lauf hier prueft eine UMFORMUNG von
// ForeignFinding[]; die Erkennung selbst hat ihre Laeufe oben und ist unberuehrt.
//
// DIE ERWARTUNGEN SIND AUS DEN ENTSCHEIDUNGEN GETIPPT, NIE AUS DEM LAUF ABGELESEN
// (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM
// CODE) — die Fallliste in S32 stammt aus P11.11-41, Punkt (A), und die Messung, auf
// die jener Punkt sich stuetzt, lief AUSSERHALB dieses Repos.
// ===========================================================================

describe("buildForeignView — Host-Ableitung und Buendelung (11.11e)", () => {
  const rahmen = (rumpf: string) =>
    `<!DOCTYPE html><html lang="de"><head><title>t</title></head><body>${rumpf}</body></html>`;
  const sicht = (rumpf: string) => buildForeignView(funde(rahmen(rumpf)));
  const skript = (src: string) => `<script src="${src}"></script>`;

  // S32. DIE SECHS FAELLE DER HOST-ABLEITUNG, JEDER EINZELN (P11.11-41, Punkt (A)).
  // SIE SIND AUSDRUECKLICH NICHT ZUSAMMENGEFASST: protokoll-relativ und relativ werfen
  // beide, aber bei `//host/x` STEHT der Host da und bei `/pfad` nicht.
  it("S32: hostVon loest absolut, protokoll-relativ, relativ, ungueltig und data: je eigen auf", () => {
    // ABSOLUT — und der Parser normalisiert die Gross-/Kleinschreibung SELBST.
    expect(hostVon("https://connect.facebook.net/en_US/fbevents.js")).toBe(
      "connect.facebook.net"
    );
    expect(hostVon("https://CDN.Example.COM/A.js")).toBe("cdn.example.com");
    expect(hostVon("http://example.com/a.js?v=1")).toBe("example.com");

    // PROTOKOLL-RELATIV — mit vorangestelltem https: ergibt sie den Host.
    expect(hostVon("//cdn.example.com/x.js")).toBe("cdn.example.com");

    // DER PORT GEHOERT NICHT IN DEN SCHLUESSEL (Punkt (C)): hostname, nicht host.
    expect(hostVon("https://example.com:8443/a.js")).toBe("example.com");

    // `www.` BLEIBT GETRENNT (Punkt (D)) — zwei verschiedene Hosts, zwei Werte.
    expect(hostVon("https://www.example.com/a.js")).toBe("www.example.com");
    expect(hostVon("https://example.com/a.js")).toBe("example.com");

    // RELATIV und UNGUELTIG -> null. Der Wurf ist das Erkennungsmerkmal.
    for (const v of ["/wp-content/plugins/digistore/digistore.js", "js/app.js", "https://", "::::", "", "   ", "#x"])
      expect(hostVon(v)).toBeNull();

    // `data:` UND `blob:` WERFEN NICHT, sie liefern einen LEEREN Host — ohne den
    // eigens abgefangenen Leerfall entstuende eine Gruppe mit dem Titel "".
    expect(hostVon("data:text/javascript,alert(1)")).toBeNull();
    expect(hostVon("blob:https://example.com/abc")).toBeNull();
  });

  // S33. SORTIERT NACH ANZAHL AUFSTEIGEND (P11.11-37), MIT BENANNTER ZWEITACHSE.
  // OHNE DIE ZWEITACHSE haengte die Reihenfolge zweier gleich grosser Gruppen an der
  // Einfuegefolge einer Map und waere nicht reproduzierbar.
  it("S33: die Gruppen stehen nach Anzahl aufsteigend, bei Gleichstand nach Titel", () => {
    const v = sicht(
      skript("https://viele.example/1.js") +
        skript("https://viele.example/2.js") +
        skript("https://viele.example/3.js") +
        skript("https://bbb.example/x.js") +
        skript("https://aaa.example/x.js")
    );
    expect(v.gruppen.map((g) => `${g.titel}:${g.eintraege.length}`)).toEqual([
      "aaa.example:1",
      "bbb.example:1",
      "viele.example:3",
    ]);
  });

  // S34. DREI GESTALTEN, UND DIE ZWEI SONDERGRUPPEN SAMMELN, WAS SONST NAMENLOS WAERE.
  it("S34: relative, ungueltige und data:-Adressen bilden EINE Gruppe, Inline eine eigene", () => {
    const v = sicht(
      skript("/js/a.js") +
        skript("js/b.js") +
        skript("data:text/javascript,alert(1)") +
        "<script>console.log('eins');</script>" +
        "<script>console.log('zwei');</script>" +
        skript("https://cdn.example/x.js")
    );
    // POSITIVKONTROLLE: KEINE Gruppe traegt einen leeren Titel. Ohne diese Zeile waere
    // der Lauf auch dann gruen, wenn die data:-Adresse eine namenlose Gruppe erzeugt
    // haette — sie stuende dann einfach als vierte da.
    expect(v.gruppen.every((g) => g.titel !== "")).toBe(true);

    const nachArt = new Map(v.gruppen.map((g) => [g.art, g]));
    expect(nachArt.get("ohne-domain")?.eintraege).toHaveLength(3);
    expect(nachArt.get("inline")?.eintraege).toHaveLength(2);
    expect(nachArt.get("host")?.titel).toBe("cdn.example");
    expect(v.gruppen).toHaveLength(3);
  });

  // S35. DER SUMMEN-WAECHTER — DER LAUF, UM DESSENTWILLEN `unbekannteSkripte` AUS DEN
  // GRUPPEN GERECHNET WIRD UND NICHT NEBEN IHNEN.
  //
  // ER IST DIE EINZIGE ZUSICHERUNG, DASS DIE BUENDELUNG NICHTS VERLIERT: "NICHTS WIRD
  // AUSGEBLENDET" (P11.11-37) ist sonst eine Behauptung. Die Mutation M1 macht ihn rot.
  it("S35: die Summe aller gebuendelten Skripte ist die Zahl der unbekannten Funde", () => {
    const rumpf =
      skript("https://viele.example/1.js") +
      skript("https://viele.example/2.js") +
      skript("/js/a.js") +
      skript("data:text/javascript,alert(1)") +
      "<script>console.log('x');</script>" +
      META_BASE;
    const fs = funde(rahmen(rumpf));
    const v = buildForeignView(fs);

    const vorher = unbekannt(fs).length;
    expect(vorher).toBe(5); // vier mit Adresse, eines inline
    const summe = v.gruppen.reduce((n, g) => n + g.eintraege.length, 0);
    expect(summe).toBe(vorher);
    expect(v.unbekannteSkripte).toBe(vorher);
    // UND DER BEKANNTE FUND IST NICHT IN DIE GRUPPEN GERUTSCHT.
    expect(v.bekannt).toHaveLength(1);
    expect(v.bekannt[0].anbieter).toEqual(["Meta"]);
  });

  // S36. DIE ORDNUNG DER BEKANNTEN FUNDE (P11.11-41, Punkt (J)): nach der Reihenfolge
  // der SIGNATURLISTE, innerhalb eines Anbieters knoten -> aufruf -> handler.
  //
  // DIE FIXTURE STEHT IN UMGEKEHRTER CODE-REIHENFOLGE — sonst waere der Lauf auch bei
  // einer Sortierung nach Code-Reihenfolge gruen und bewiese nichts.
  it("S36: bekannte Funde stehen in der Reihenfolge der Signaturliste, innerhalb knoten vor aufruf vor handler", () => {
    const v = sicht(
      '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>' +
        '<a href="#" onclick="fbq(\'track\',\'Lead\')">k</a>' +
        "<script>fbq('track','Purchase');</script>" +
        skript("https://connect.facebook.net/en_US/fbevents.js")
    );
    // Meta steht in FOREIGN_SIGNATURES VOR Cookiebot; innerhalb von Meta zaehlt der
    // Traeger. POSITIVKONTROLLE der Achse: die Erwartung ist aus der Liste und der
    // Entscheidung getippt, nicht aus dem Lauf.
    expect(v.bekannt.map((f) => `${f.anbieter[0]}:${f.traeger}`)).toEqual([
      "Meta:knoten",
      "Meta:aufruf",
      "Meta:handler",
      "Cookiebot:knoten",
    ]);
  });

  // S37. DER ORTSHINWEIS STEHT AN `aufruf` UND `handler` — UND NICHT AN `knoten`
  // (P11.11-41, Punkt (I)). Die zweite Haelfte ist die eigentliche Zusicherung: Ein
  // Knoten hat einen Knopf und braucht keine Wegbeschreibung.
  it("S37: der Ausschnitt steht an aufruf und handler, nicht an knoten", () => {
    const v = sicht(
      skript("https://connect.facebook.net/en_US/fbevents.js") +
        "<script>document.title='x';fbq('track','Purchase');</script>" +
        '<a href="#" onclick="fbq(\'track\',\'Lead\')">k</a>'
    );
    const nach = new Map(v.bekannt.map((f) => [f.traeger, f]));
    // POSITIVKONTROLLE: alle drei Traeger sind da, sonst waere eine der drei Zeilen
    // unten trivial wahr.
    expect([...nach.keys()].sort()).toEqual(["aufruf", "handler", "knoten"]);
    expect(nach.get("knoten")?.ausschnitt).toBeNull();
    expect(nach.get("aufruf")?.ausschnitt).toContain("fbq('track','Purchase')");
    expect(nach.get("handler")?.ausschnitt).toContain("fbq('track','Lead')");
    // ER IST GEKUERZT UND GEGLAETTET wie der Ausschnitt eines unbekannten Skripts.
    expect(nach.get("aufruf")?.ausschnitt).not.toContain("\n");
    expect(
      Array.from(nach.get("aufruf")?.ausschnitt ?? "").length
    ).toBeLessThanOrEqual(INLINE_EXCERPT_MAX + 1);
  });

  // S38. DIE DREI NEUEN WORTLAUTE GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN
  // (Bauform S26). EINE KOLLISION WIRD GEMELDET, NICHT DURCH EINE TEXT-ANPASSUNG
  // BESEITIGT — ein angepasster Text waere eine Owner-Freigabe, die niemand erteilt hat.
  it("S38: kein Wortlaut der Scheibe 11.11e traegt eine der vier Nadeln oder die Form Scripte", () => {
    const texte = [
      FOREIGN_UNKNOWN_HEADING,
      FOREIGN_GROUP_NO_HOST,
      FOREIGN_GROUP_INLINE,
    ];
    // POSITIVKONTROLLE: die Nadeln treffen, wenn es etwas zu treffen gibt.
    expect(/%/.test("50 %")).toBe(true);
    expect(/gerettet/i.test("gerettet")).toBe(true);
    for (const t of texte) {
      expect(t).not.toMatch(/%/);
      expect(t).not.toMatch(/gerettet/i);
      expect(t).not.toMatch(/mindestens/);
      expect(t).not.toMatch(/NaN/);
      expect(t).not.toContain("Scripte");
      expect(t).not.toContain("Tracking-Pixel");
    }
  });
});
