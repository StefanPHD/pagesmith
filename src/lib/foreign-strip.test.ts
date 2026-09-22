// DAS ENTFERNEN FREMDER TRACKING-BAUSTEINE (Phase 11.11, Scheibe 11.11c).
//
// DIE FIXTURES SIND ECHTE ANBIETER-GESTALTEN, keine erfundenen: Adressen und Aufrufe
// stammen aus den Belegen (docs/ziel-befunde.md, Teile (g), (ab), (cs), (ct);
// docs/claude-history/phase-11.11-import-bereinigung.md, VERMERKE P11.11-13 und P11.11-25). Eine Fixture, die den
// produktiven Fall nicht trifft, prueft nichts (Dauerregel TESTDATEN UND TEST-SEQUENZ
// MUESSEN DEN PRODUKTIVEN PFAD TREFFEN).
//
// DIE SOLLWERTE DER BYTE-LAEUFE WERDEN GEGEN DEN NORMALISIERTEN TEXT GEBILDET, nicht
// gegen die rohe Eingabe: Der erste DOMParser-Rundlauf normalisiert ohnehin (Pruefstein
// 1 des Zuschnitts, in VERMERK P11.11-17 gemessen). Wer gegen die rohe Eingabe misst,
// misst die Normalisierung mit und haelt sie fuer einen Effekt des Entfernens.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  scanForeignTags,
  type ForeignCarrier,
  type ForeignFinding,
} from "./foreign-scan";
import { stripForeignGroup } from "./foreign-strip";
import { generateFunctional } from "./generate";
import type { Mapping } from "./mappings";

const testseite = readFileSync(
  resolve(process.cwd(), "src/lib/__fixtures__/foreign-tags-testseite.html"),
  "utf-8"
);

function parse(html: string): Document {
  return new DOMParser().parseFromString(html, "text/html");
}

/** Derselbe Rundlauf wie im Strip, aber OHNE Eingriff — der Vergleichsmassstab. */
function rundlauf(html: string): string {
  const doc = parse(html);
  return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
}

function funde(html: string): ForeignFinding[] {
  const scan = scanForeignTags(parse(html));
  if (scan.status !== "ok") throw new Error(`Erwartet ok, war ${scan.status}`);
  return scan.findings;
}

type Bekannt = Extract<ForeignFinding, { art: "bekannt" }>;

function bekannt(html: string): Bekannt[] {
  return funde(html).filter((f): f is Bekannt => f.art === "bekannt");
}

/**
 * Den Fund eines Anbieters holen — und laut scheitern, wenn es ihn nicht GENAU EINMAL
 * gibt.
 *
 * ER FILTERT AUF ALLE DREI ACHSEN DES GRUPPENSCHLUESSELS, und das ist keine
 * Umstaendlichkeit: Ein Anbieter kann in DREI Gruppen zugleich stehen — als Knoten,
 * geparkt und als Inline-Handler. Ein Helfer, der nur den Namen filtert, faende
 * mehrere und meldete einen Defekt, wo die Trennung gerade der Punkt ist.
 */
function fund(
  html: string,
  anbieter: string,
  traeger: ForeignCarrier = "knoten",
  geparkt = false
): Bekannt {
  const treffer = bekannt(html).filter(
    (f) =>
      f.anbieter.includes(anbieter) &&
      f.geparkt === geparkt &&
      f.traeger === traeger
  );
  if (treffer.length !== 1)
    throw new Error(
      `Erwartet GENAU EINEN Fund fuer ${anbieter} (traeger=${traeger}, geparkt=${geparkt}), waren ${treffer.length}`
    );
  return treffer[0];
}

const bytes = (s: string) => Buffer.byteLength(s, "utf-8");

// Das Meta-Basis-Snippet in seiner belegten Gestalt (Teil (g)).
const META_BASE =
  "<script>!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){};" +
  "if(!f._fbq)f._fbq=n}(window,document,'script'," +
  "'https://connect.facebook.net/en_US/fbevents.js');" +
  "fbq('init','123');fbq('track','PageView');</script>";

const META_IMG =
  '<img height="1" width="1" style="display:none" ' +
  'src="https://www.facebook.com/tr?id=123&amp;ev=PageView&amp;noscript=1">';

const huelle = (kopf: string, rumpf: string) =>
  `<!DOCTYPE html><html lang="de"><head><title>t</title>${kopf}</head><body>${rumpf}</body></html>`;

describe("stripForeignGroup — ein Klick entfernt einen GANZEN Fund", () => {
  // F1. DER KERN: Script UND Rueckfall-Bild gehoeren demselben Fund und gehen
  // zusammen. Ein Entfernen, das nur das <script> naehme, liesse das Bild stehen —
  // UND DAS ZAEHLT WEITER (Pruefstein 2 des Zuschnitts).
  it("F1: Script und Rueckfall-Bild desselben Anbieters gehen zusammen", () => {
    const html = huelle("", `${META_BASE}${META_IMG}<p>x</p>`);
    // POSITIVKONTROLLE: die Fixture traegt wirklich ZWEI Fundstellen.
    expect(fund(html, "Meta").stellen).toBe(2);

    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("connect.facebook.net");
    expect(out.html).not.toContain("www.facebook.com/tr?");
    expect(bekannt(out.html)).toHaveLength(0);
    // … und der Inhalt des Betreibers steht noch da.
    expect(out.html).toContain("<p>x</p>");
  });

  // F2. EIN KLICK AUF META LAESST PINTEREST UNBERUEHRT — der Beleg, dass der
  // Schluessel trennt und nicht die Reihenfolge.
  it("F2: ein Klick auf Meta laesst Pinterest zeichengleich stehen", () => {
    const PIN =
      '<img height="1" width="1" src="https://ct.pinterest.com/v3/?tid=2612345678901">';
    const html = huelle("", `${META_BASE}${PIN}<p>x</p>`);
    expect(bekannt(html).map((f) => f.anbieter[0]).sort()).toEqual([
      "Meta",
      "Pinterest",
    ]);

    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.html).not.toContain("connect.facebook.net");
    expect(out.html).toContain("ct.pinterest.com/v3/?tid=2612345678901");
    const rest = bekannt(out.html);
    expect(rest).toHaveLength(1);
    expect(rest[0].anbieter).toEqual(["Pinterest"]);
  });

  // F3. EIN BILD-FUND OHNE SCRIPT DANEBEN ist entfernbar (ENTSCHEIDUNG P11.11-36,
  // Punkt (F5)) — Meta und Pinterest dokumentieren den Bild-Tag als eigenen Einbauweg.
  it("F3: ein Pinterest-Bild ALLEIN ist ein entfernbarer Fund", () => {
    const html = huelle(
      "",
      '<img height="1" width="1" src="https://ct.pinterest.com/v3/?tid=1">'
    );
    const f = fund(html, "Pinterest");
    expect(f.entfernbar).toBe(true);
    expect(f.traeger).toBe("knoten");

    const out = stripForeignGroup(html, f.schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("ct.pinterest.com");
  });

  // F4. EIN KNOTEN MIT MEHREREN ANBIETERN gehoert beiden (P11.11-32, Punkt (d)) — und
  // OHNE Lade-Adresse ist er ein AUFRUF IN SEITEN-CODE und bekommt gar keinen Knopf
  // (ENTSCHEIDUNG P11.11-38).
  //
  // ER HAT BIS ZUM 2026-09-21 DIE WIRKUNG DES KLICKS GEPRUEFT und ist mit jener
  // Entscheidung geteilt worden: Diese Haelfte haelt die Gruppierung fest, F4b die
  // Wirkung an einem Knoten, der wirklich einen Knopf hat. DER GRUND FUER DIE
  // TEILUNG steht in der Entscheidung: Genau so ein Script — eine Ereigniszeile
  // mitten in fremder Logik — ist der Fall, um dessentwillen "aufruf" existiert.
  it("F4: ein Inline-Skript mit fbq( UND gtag( ist EIN Fund und ein Aufruf", () => {
    const html = huelle(
      "",
      "<script>fbq('track','Lead');gtag('event','x');</script><p>x</p>"
    );
    const b = bekannt(html);
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta", "Google-Tag"]);
    expect(b[0].traeger).toBe("aufruf");
    expect(b[0].entfernbar).toBe(false);

    // UND EIN KLICK AUF SEINEN SCHLUESSEL RUEHRT IHN NICHT AN — der zweite Riegel in
    // stripForeignGroup. Aus der Oberflaeche kann so ein Klick nicht kommen; der Lauf
    // sichert die Funktion, nicht den Knopf.
    const out = stripForeignGroup(html, b[0].schluessel);
    expect(out.html).toContain("fbq('track','Lead')");
    expect(out.html).toContain("gtag('event','x')");
  });

  // F4b. DIE WIRKUNG AN EINEM MEHRFACH-KNOTEN, DER EINE LADE-ADRESSE TRAEGT: Er ist
  // "knoten", gehoert beiden Anbietern und geht GANZ.
  //
  // DAS IST ZUGLEICH DIE GRENZE AUS ENTSCHEIDUNG P11.11-38, an der Wirkung gezeigt:
  // Das Script mischt Metas Basiscode mit einem Google-Aufruf, und der Klick nimmt
  // beides mit. Wer beides in einen Knoten legt, hat es untrennbar gemacht.
  it("F4b: ein Mehrfach-Knoten MIT Lade-Adresse geht als EIN Fund ganz", () => {
    // SEINE FIXTURE IST AM 2026-09-21 ERSETZT WORDEN: Metas Lade-Adresse plus ein
    // `gtag(`-AUFRUF ergaeben seit K3 nur noch [Meta] — die Adresse entscheidet allein
    // und der Name wird nicht mehr befragt. Ein Mehrfach-Knoten entsteht seither aus
    // ZWEI Lade-Adressen in EINEM Script, und genau so sieht ein Script aus, das
    // beides laedt.
    const html = huelle(
      "",
      "<script>!function(f,b,e,v){f.fbq=function(){};}(window,document,'script'," +
        "'https://connect.facebook.net/en_US/fbevents.js');" +
        "var p=document.createElement('script');" +
        "p.src='https://s.pinimg.com/ct/core.js';</script><p>x</p>"
    );
    const b = bekannt(html);
    expect(b).toHaveLength(1);
    expect(b[0].anbieter).toEqual(["Meta", "Pinterest"]);
    expect(b[0].traeger).toBe("knoten");
    expect(b[0].entfernbar).toBe(true);

    const out = stripForeignGroup(html, b[0].schluessel);
    expect(out.rest).toBe(0);
    expect(bekannt(out.html)).toHaveLength(0);
    expect(out.html).toContain("<p>x</p>");
  });
});

describe("stripForeignGroup — was NICHT entfernt wird", () => {
  // F5. EIN INLINE-HANDLER BLEIBT UNBERUEHRT (P11.11-35, Satz (b)) — Attribut UND
  // tragendes Element. ZWEI Zusicherungen, weil "das Attribut ist noch da" allein
  // nicht ausschliesst, dass das Element verschwunden ist.
  it("F5: ein onclick-Handler und sein Element bleiben stehen", () => {
    const html = huelle(
      "",
      `${META_BASE}<a href="https://example.com/x" onclick="fbq('track','Lead')">Kaufen</a>`
    );
    const script = fund(html, "Meta");
    expect(script.traeger).toBe("knoten");

    const out = stripForeignGroup(html, script.schluessel);
    expect(out.html).not.toContain("connect.facebook.net");
    expect(out.html).toContain(`onclick="fbq('track','Lead')"`);
    expect(out.html).toContain(">Kaufen</a>");
    // Der Handler-Fund steht danach weiter in der Liste — als EIGENE Gruppe.
    const rest = bekannt(out.html);
    expect(rest).toHaveLength(1);
    expect(rest[0].traeger).toBe("handler");
    expect(rest[0].entfernbar).toBe(false);
  });

  // F6. EIN CONTAINER UND EIN CMP SIND NICHT ENTFERNBAR (P11.11-27 bzw. P11.11-3).
  // Das ist die Zusicherung, die M2 wieder rot macht.
  it("F6: Container und CMP tragen entfernbar=false", () => {
    const html = huelle(
      '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>',
      '<script src="https://www.googletagmanager.com/gtm.js?id=GTM-AAAAAAA"></script>'
    );
    expect(fund(html, "Google Tag Manager").entfernbar).toBe(false);
    expect(fund(html, "Cookiebot").entfernbar).toBe(false);
  });

  // F7. EINE GEMISCHTE GRUPPE AUS PIXEL UND CMP IST NICHT ENTFERNBAR. `every` statt
  // `some` ist hier der Unterschied zwischen fail-closed und fail-open: Ein Knopf
  // naehme dem Betreiber sein Einwilligungs-Werkzeug mit.
  it("F7: ein Knoten mit gemischten Klassen ist NICHT entfernbar", () => {
    // SEINE FIXTURE IST AM 2026-09-21 ZWEIMAL ERSETZT WORDEN, und beide Male, damit
    // sein Gegenstand — die KLASSEN-Regel (`every` statt `some`) — nicht von einer
    // anderen Achse verdeckt wird (Dauerregel EIN GRUENER TEST IST KEIN BELEG, DASS
    // DER GRUND SEINER GRUENHEIT DERSELBE GEBLIEBEN IST):
    // (1) `fbq(` + `Cookiebot` OHNE Adresse waere seit ENTSCHEIDUNG P11.11-38 ein
    //     AUFRUF — `entfernbar === false` kaeme schon vom TRAEGER. GEMESSEN an der
    //     Mutation M2, unter der er als einziger der fuenf vorhergesagten Laeufe nicht
    //     mehr fiel.
    // (2) Dieselbe Fixture MIT Metas Lade-Adresse waere seit K3 reines `pixel` — die
    //     Adresse entscheidet allein, der Cookiebot-NAME wird gar nicht befragt.
    // GEBAUT IST DESHALB EIN KNOTEN MIT ZWEI ADRESSEN: Metas Lader (pixel) und der
    // Tag-Manager (container). Allein `every` haelt den Knopf zurueck.
    const html = huelle(
      "",
      "<script>!function(f,b,e,v){f.fbq=function(){};}(window,document,'script'," +
        "'https://connect.facebook.net/en_US/fbevents.js');" +
        "j.src='https://www.googletagmanager.com/gtm.js?id=GTM-A';</script>"
    );
    const b = bekannt(html);
    expect(b).toHaveLength(1);
    expect(b[0].klassen).toEqual(["pixel", "container"]);
    // ANKER: Der Traeger ist "knoten" — `entfernbar` haengt hier also wirklich an der
    // Klassen-Regel und nicht daran, dass es ein Aufruf waere.
    expect(b[0].traeger).toBe("knoten");
    expect(b[0].entfernbar).toBe(false);
  });

  // F8. UNSER EIGENES WIRING WIRD NIE ENTFERNT (P11.11-26). Es traegt
  // `connect.facebook.net` und `fbq(`-Aufrufe ALS ZEICHENKETTEN; ohne den eigen-Riegel
  // stuende es als fremdes Meta-Pixel da und ein Klick traefe UNSEREN Baustein.
  //
  // DER LAUF GEHT GEGEN EIN VON generateFunctional ERZEUGTES DOKUMENT, nicht gegen
  // eine nachgebaute Fixture — nur so steht der Meta-Teil im Wiring wirklich da. Die
  // POSITIVKONTROLLE ist Pflicht: ohne sie waere "kein Meta-Fund" TRIVIAL WAHR.
  it("F8: ein Dokument mit UNSEREM Wiring hat gar keinen entfernbaren Meta-Fund", () => {
    const mappings: Mapping[] = [
      { elementId: "ps-bbbbbb", type: "track", config: { event: "Lead" } },
    ];
    const erzeugt = generateFunctional(
      '<!DOCTYPE html><html lang="de"><head><title>t</title></head>' +
        '<body><button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>',
      mappings,
      "export",
      { metaPixelId: "1234567890", trackingKey: "tk", capiProxyUrl: "/api/e" }
    );
    // POSITIVKONTROLLE: die Merkmale stehen wirklich im Text.
    expect(erzeugt).toContain("connect.facebook.net");
    expect(erzeugt).toContain("fbq(");

    expect(bekannt(erzeugt)).toHaveLength(0);
  });
});

describe("stripForeignGroup — was zurueckbleibt (ENTSCHEIDUNG P11.11-36, Punkt (F2))", () => {
  // F9. DAS LEERE <noscript> IM head BLEIBT STEHEN — UND ES ENTSTEHT OHNEHIN.
  //
  // DIE ZWEITE HAELFTE IST DER EIGENTLICHE INHALT DIESES LAUFS: Ohne sie haelt die
  // naechste Runde das leere <noscript> fuer einen Fehler des Entfernens und "repariert"
  // etwas, das der PARSER erzeugt. Derselbe Zustand entsteht bei einem Rundlauf OHNE
  // jeden Eingriff, also schon beim naechsten Speichern.
  it("F9: head-Fall — das leere noscript bleibt, und der blosse Rundlauf erzeugt es auch", () => {
    const html = huelle(`<noscript>${META_IMG}</noscript>`, "<p>x</p>");

    // (a) OHNE JEDEN EINGRIFF.
    const ohne = rundlauf(html);
    expect(ohne).toContain("<noscript></noscript>");
    expect(ohne).toContain("<img");

    // (b) MIT dem Entfernen: dasselbe leere noscript, aber kein Bild mehr.
    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).toContain("<noscript></noscript>");
    expect(out.html).not.toContain("<img");
    expect(parse(out.html).head.querySelectorAll("noscript")).toHaveLength(1);
  });

  // F10. IM body-FALL BLEIBT EBENFALLS EIN LEERES <noscript> — entfernt wird der
  // gefundene KNOTEN, nicht seine Huelle. Eine Huelle koennte Inhalt des Betreibers
  // neben dem Pixel tragen.
  //
  // ER WAR BIS ZUM 2026-09-21 EIN EINZELSTUECK, UND DAS IST ER NICHT MEHR — der Satz
  // ist richtiggestellt und nicht gestrichen, weil er die Achse benennt: Unter der
  // Mutation M5b (ein Bild INNERHALB einer <noscript>-Huelle wird vom Entfernen
  // ausgenommen) fiel zunaechst NUR dieser Lauf. Seit die Testseite LinkedIns
  // Rueckfall-Bild in einer body-<noscript> traegt, fallen DREI (F10, F16, F23) —
  // GEMESSEN, vorher und nachher. Die body-Achse ist damit breiter gedeckt; dieser
  // Lauf bleibt ihr KUERZESTER und direktester Nachweis.
  it("F10: body-Fall — das <img> geht, die Huelle bleibt leer stehen", () => {
    const html = huelle("", `<noscript>${META_IMG}</noscript><p>x</p>`);
    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("<img");
    expect(parse(out.html).body.querySelectorAll("noscript")).toHaveLength(1);
    expect(out.html).toContain("<p>x</p>");
  });

  // F11. DIE ANBIETER-KOMMENTARE BLEIBEN (P11.11-19, Satz 1). Ein Kommentar ist Text
  // des Betreibers, solange nichts das Gegenteil beweist.
  it("F11: die zwei Kommentare des Meta-Snippets bleiben stehen", () => {
    const html = huelle(
      "",
      `<!-- Meta Pixel Code -->\n  ${META_BASE}\n<!-- End Meta Pixel Code --><p>x</p>`
    );
    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.html).toContain("<!-- Meta Pixel Code -->");
    expect(out.html).toContain("<!-- End Meta Pixel Code -->");
    expect(out.html).not.toContain("connect.facebook.net");
  });
});

describe("stripForeignGroup — Byte-Bilanz und Unversehrtheit", () => {
  // F12. DIE BYTE-DIFFERENZ IST GENAU DIE SUMME DER ENTFERNTEN outerHTML PLUS DER
  // MITGENOMMENEN LEERRAUM-TEXTKNOTEN. Gemessen gegen den NORMALISIERTEN Text —
  // ausser den Knoten aendert sich nichts.
  it("F12: Byte-Differenz == Summe(outerHTML + mitgenommener Leerraum)", () => {
    const html = huelle(
      "",
      `<p>a</p>\n  ${META_BASE}\n  ${META_IMG}\n<p>b</p>`
    );
    const basis = rundlauf(html);

    // Die Erwartung wird aus dem DOKUMENT gebildet, nicht aus dem Ergebnis des
    // Strips — sonst waere der Lauf ein Spiegel, der jeden Fehler bestaetigt.
    const doc = parse(html);
    const schluessel = fund(html, "Meta").schluessel;
    let soll = 0;
    for (const el of Array.from(doc.querySelectorAll("script, img"))) {
      if (!/facebook/.test(el.outerHTML)) continue;
      soll += bytes(el.outerHTML);
      const prev = el.previousSibling;
      if (prev && prev.nodeType === 3 && (prev.textContent ?? "").trim() === "")
        soll += bytes(prev.textContent ?? "");
    }
    expect(soll).toBeGreaterThan(0); // POSITIVKONTROLLE

    const out = stripForeignGroup(html, schluessel);
    expect(bytes(basis) - bytes(out.html)).toBe(soll);
  });

  // F13. KEIN MAPPING VERWAIST: Die Menge der data-pagesmith-id-Werte ist vorher
  // gleich nachher. Das ist die Gegenprobe zu M4 — ein Entfernen, das ein
  // LINKABLE_SELECTOR-Element mitnaehme, braeche hier.
  it("F13: die ps-IDs sind vorher gleich nachher", () => {
    const html = huelle(
      "",
      '<h1 data-pagesmith-id="ps-aaaaaa">T</h1>' +
        `${META_BASE}` +
        '<a data-pagesmith-id="ps-bbbbbb" href="https://example.com/x" onclick="fbq(\'track\',\'Lead\')">K</a>'
    );
    const ids = (s: string) =>
      Array.from(parse(s).querySelectorAll("[data-pagesmith-id]"))
        .map((el) => el.getAttribute("data-pagesmith-id"))
        .sort();
    const vorher = ids(html);
    expect(vorher).toEqual(["ps-aaaaaa", "ps-bbbbbb"]);

    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(ids(out.html)).toEqual(vorher);
  });
});

describe("stripForeignGroup — Nachbedingung und Fehlerausgaenge", () => {
  // F14. DIE NACHBEDINGUNG IM NORMALFALL, MIT POSITIVKONTROLLE. Ohne den Nachweis,
  // dass `rest` ueberhaupt von 0 abweichen KANN, waere "rest === 0" trivial wahr
  // (Dauerregel EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, Fall (2)).
  it("F14: rest ist 0 — und ein unbekannter Schluessel laesst den Text unberuehrt", () => {
    const html = huelle("", `${META_BASE}<p>x</p>`);
    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.rest).toBe(0);

    // POSITIVKONTROLLE der Zaehlung: derselbe Schluessel auf einem Text, der den Fund
    // noch traegt, findet ihn.
    const nichts = stripForeignGroup(html, "gibt\u0000es\u0000nicht|0|knoten");
    expect(nichts.html).toBe(html);
    expect(nichts.rest).toBe(0);
    expect(bekannt(nichts.html)).toHaveLength(1);
  });

  // F15. DIE DREI FEHLERAUSGAENGE GEBEN DIE EINGABE ZURUECK. Eine code-mutierende
  // Funktion darf User-Code NIE vernichten.
  it("F15: leerer und reiner Leerraum-Text kommen unveraendert zurueck", () => {
    expect(stripForeignGroup("", "x")).toEqual({ html: "", rest: 0 });
    expect(stripForeignGroup("   \n\t ", "x")).toEqual({
      html: "   \n\t ",
      rest: 0,
    });
  });

  // F16. AUF DEM GEGLUECKTEN WEG IST `rest` NACH EINEM KLICK IMMER 0, UND DAS IST
  // GEMESSEN STATT ANGENOMMEN: stripForeignGroup nimmt ALLE Knoten seines Schluessels.
  //
  // DARAUS FOLGT, WANN DIE REST-MELDUNG DER OBERFLAECHE UEBERHAUPT ERSCHEINEN KANN:
  // NICHT nach einem geglueckten Klick, sondern allein ueber die FEHLERAUSGAENGE der
  // Funktion, die die Eingabe unveraendert zurueckgeben (Laeufe W-A und W-B in
  // foreign-strip-wurf.test.ts). Wer den Fehlerausgang spaeter "vereinfacht" und dort
  // einen bereinigten Text zurueckgibt, macht die Meldung zu totem Code — und ein Test
  // dafuer waere ab da TRIVIAL WAHR (Dauerregel EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF
  // DREI WEISEN HOHL, Fall (2)).
  //
  // GEPRUEFT WIRD JEDER entfernbare Fund der Testseite, nicht einer.
  it("F16: nach einem Klick ist rest fuer JEDEN entfernbaren Fund 0", () => {
    const entfernbare = bekannt(testseite).filter((f) => f.entfernbar);
    expect(entfernbare.length).toBeGreaterThan(0); // POSITIVKONTROLLE
    for (const f of entfernbare)
      expect(stripForeignGroup(testseite, f.schluessel).rest).toBe(0);

    // DIE GEGENPROBE, damit die Null nicht als Eigenschaft der Zaehlung durchgeht:
    // Mit einem HANDLER-Schluessel zaehlt dieselbe Funktion sehr wohl — der Knoten
    // wird bewusst nicht entfernt, und `rest` meldet ihn.
    const handler = bekannt(testseite).find((f) => f.traeger === "handler");
    expect(handler).toBeDefined();
    expect(stripForeignGroup(testseite, handler!.schluessel).rest).toBe(1);
  });

  // F20. DIE PARK-ACHSE DES SCHLUESSELS TRENNT EBENFALLS — ein Klick auf das LAUFENDE
  // Meta-Pixel laesst das GEPARKTE stehen.
  //
  // DIESER LAUF IST AUS EINER GRUEN GEBLIEBENEN MUTATION ENTSTANDEN und steht deshalb
  // hier: Eine Mutation, die den Schluessel im Strip auf die blosse ANBIETER-Menge
  // verkuerzte, blieb gruen. Die Handler-Haelfte faengt der zweite Riegel in der
  // Schleife ab (Komposition), DIE PARK-HAELFTE WAR VON KEINEM LAUF GEDECKT. Ohne
  // ihn naehme ein Klick auf das laufende Pixel das geparkte stillschweigend mit —
  // und damit einen Knoten, den der Betreiber seinem CMP anvertraut hat.
  //
  // ER IST EIN EINZELSTUECK, und das ist seit dem dritten Traeger erst recht so: Auch
  // die AUFRUF-Haelfte des Schluessels faengt derselbe zweite Riegel ab. Unter jener
  // Mutation faellt GENAU DIESER LAUF — GEMESSEN, zweimal (2026-09-21, vor und nach
  // ENTSCHEIDUNG P11.11-38). Wer ihn als redundant streicht, nimmt die einzige
  // Abdeckung der Schluessel-Achse mit (Dauerregel MUTATIONSPROBEN …, Lektion (f)).
  it("F20: ein Klick auf das laufende Meta-Pixel laesst das geparkte stehen", () => {
    const GEPARKT =
      '<script type="text/plain" data-cookieconsent="marketing" ' +
      'src="https://connect.facebook.net/en_US/fbevents.js"></script>';
    const html = huelle("", `${META_BASE}${GEPARKT}<p>x</p>`);

    // POSITIVKONTROLLE: ZWEI Gruppen desselben Anbieters, getrennt allein durch den
    // Parkzustand.
    const b = bekannt(html).filter((f) => f.anbieter[0] === "Meta");
    expect(b).toHaveLength(2);
    expect(b.map((f) => f.geparkt).sort()).toEqual([false, true]);

    const out = stripForeignGroup(html, fund(html, "Meta").schluessel);
    expect(out.rest).toBe(0);
    // Das GEPARKTE steht noch da — mit seinem Typ und seinem CMP-Attribut.
    expect(out.html).toContain('type="text/plain"');
    expect(out.html).toContain('data-cookieconsent="marketing"');
    const danach = bekannt(out.html).filter((f) => f.anbieter[0] === "Meta");
    expect(danach).toHaveLength(1);
    expect(danach[0].geparkt).toBe(true);
  });

  // F19. EIN HANDLER-SCHLUESSEL ENTFERNT NICHTS — WEDER DAS ELEMENT NOCH DAS ATTRIBUT.
  // Aus der Oberflaeche kann so ein Schluessel gar nicht kommen (dort steht kein
  // Knopf); dieser Lauf sichert den ZWEITEN Riegel in der Funktion, fuer den Fall,
  // dass ein kuenftiger Aufrufer einen Schluessel von woanders her bildet. Ein
  // Element wegen eines ATTRIBUTS zu loeschen waere ein Datenverlust.
  it("F19: ein Handler-Schluessel laesst Element und Attribut unberuehrt", () => {
    const html = huelle(
      "",
      '<a href="https://example.com/x" onclick="fbq(\'track\',\'Lead\')">K</a>'
    );
    const h = fund(html, "Meta", "handler");
    const out = stripForeignGroup(html, h.schluessel);
    expect(out.html).toContain(`onclick="fbq('track','Lead')"`);
    expect(out.html).toContain(">K</a>");
    expect(out.rest).toBe(1);
  });

  // F17. DIE TESTSEITE ALS GANZES — sie ist zugleich die Live-Fixture, und dieser Lauf
  // haelt fest, WAS auf ihr steht. Faellt er, ist die Datei veraendert worden.
  //
  // ER IST DAMIT DER WAECHTER DER LIVE-ANLEITUNG: Wer die Fixture aendert, aendert den
  // Live-Test mit, und dieser Lauf zwingt ihn, es zu bemerken.
  it("F17: die Testseite traegt die erwarteten Funde", () => {
    const b = bekannt(testseite);
    // DIE ERWARTUNG IST AUS DEN ENTSCHEIDUNGEN GETIPPT, NICHT AUS DEM LAUF ABGELESEN
    // (Dauerregel EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS
    // DEM CODE). Der Marker `*` heisst geparkt.
    const zeilen = b.map(
      (f) => `${f.anbieter.join("+")}${f.geparkt ? "*" : ""}:${f.traeger}`
    );
    expect(zeilen.sort()).toEqual([
      "Cookiebot:knoten",
      "Google Tag Manager*:knoten",
      "Google Tag Manager:knoten",
      "Google-Tag:aufruf",
      "Google-Tag:knoten",
      "LinkedIn:aufruf",
      "LinkedIn:knoten",
      "Meta:aufruf",
      "Meta:handler",
      "Meta:knoten",
      "Pinterest:knoten",
    ]);

    // LINKEDIN STEHT ZWEIMAL, UND DAS IST DER BEFUND V2 AN DER WIRKUNG: der
    // Partner-Block ohne Adresse als AUFRUF, der Lade-Block samt Rueckfall-Bild als
    // KNOTEN mit ZWEI Fundstellen. Ohne K3 waere der Lader ein unbekanntes Skript.
    const li = b.filter((f) => f.anbieter[0] === "LinkedIn");
    expect(li).toHaveLength(2);
    expect(li.find((f) => f.traeger === "knoten")?.stellen).toBe(2);
    expect(li.map((f) => f.entfernbar).sort()).toEqual([false, true]);

    // META STEHT DREIMAL, UND JEDE ZEILE HAT EINEN ANDEREN GRUND: der Basiscode samt
    // Rueckfall-Bild als EIN Knoten-Fund mit ZWEI Fundstellen · die Ereigniszeile im
    // Seiten-Script als AUFRUF · der onclick als HANDLER. Nur der erste bekommt einen
    // Knopf (ENTSCHEIDUNG P11.11-38).
    const meta = b.filter((f) => f.anbieter[0] === "Meta");
    expect(meta).toHaveLength(3);
    expect(meta.find((f) => f.traeger === "knoten")?.stellen).toBe(2);
    expect(meta.map((f) => f.entfernbar).sort()).toEqual([false, false, true]);

    // GOOGLE STEHT ZWEIMAL, UND DAS IST DER BEFUND V1 AN DER WIRKUNG: Die Adresse
    // steht im LADE-Script; der Konfigurations-Schnipsel traegt keine und ist ein
    // Aufruf.
    const gtag = b.filter((f) => f.anbieter[0] === "Google-Tag");
    expect(gtag).toHaveLength(2);
    expect(gtag.map((f) => f.entfernbar).sort()).toEqual([false, true]);

    // Der Datenblock steht NICHT drin, das unbekannte Skript schon.
    expect(funde(testseite).some((f) => f.art === "unbekannt")).toBe(true);
    expect(testseite).toContain("application/ld+json");
  });

  // F17. UND AUF DER TESTSEITE WIRKT DER KLICK GENAU AUF EINEN ANBIETER.
  it("F18: ein Klick auf Meta laesst alle anderen Funde der Testseite stehen", () => {
    const meta = fund(testseite, "Meta");
    expect(meta.stellen).toBe(2); // Basiscode + Rueckfall-Bild

    const out = stripForeignGroup(testseite, meta.schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("connect.facebook.net");
    expect(out.html).not.toContain("www.facebook.com/tr?");
    // Der Handler-Aufruf bleibt — er ist eine EIGENE Gruppe.
    expect(out.html).toContain("fbq('track','Lead')");
    for (const rest of [
      "consent.cookiebot.com",
      "googletagmanager.com/gtag/js",
      "googletagmanager.com/gtm.js",
      "ct.pinterest.com",
    ])
      expect(out.html).toContain(rest);
  });

  // F21. DAS SEITEN-SCRIPT BLEIBT NACH DEM META-KLICK ZEICHENGLEICH STEHEN.
  //
  // DAS IST DER LAUF, UM DESSENTWILLEN ENTSCHEIDUNG P11.11-38 GETROFFEN WURDE: Das
  // Script traegt Formular- und Menuelogik des Betreibers UND eine Ereigniszeile. Ein
  // Klick auf "Meta" haette es vor dieser Entscheidung ganz geloescht.
  //
  // GEPRUEFT WIRD ZEICHENGLEICHHEIT UND NICHT "ist noch irgendwie da": Der
  // Round-Trip serialisiert das ganze Dokument neu, und ein halb umgeschriebenes
  // Script waere an einem blossen `toContain` nicht zu erkennen.
  it("F21: die Seitenlogik des Betreibers ueberlebt den Meta-Klick zeichengleich", () => {
    const MENUE = "document.body.classList.toggle('menue-offen');";
    const FORMULAR = "if (!e.target.email.value) { e.preventDefault(); return; }";
    // POSITIVKONTROLLE: beides steht wirklich in der Fixture.
    expect(testseite).toContain(MENUE);
    expect(testseite).toContain(FORMULAR);

    const out = stripForeignGroup(testseite, fund(testseite, "Meta").schluessel);
    expect(out.html).toContain(MENUE);
    expect(out.html).toContain(FORMULAR);
    // Und die Ereigniszeile des Betreibers steht noch in DIESEM Script.
    expect(out.html).toContain("fbq('track', 'Lead');");
  });

  // F23. DER LINKEDIN-SPLIT AN DER WIRKUNG (K3): Ein Klick auf LinkedIn nimmt den
  // LADE-Block UND das Rueckfall-Bild; der Partner-Block bleibt als Aufruf stehen.
  //
  // DAS IST DER SCHADEN, DEN K3 ABWENDET, an der Wirkung gezeigt: Ohne die Regel waere
  // der Lader unbekannt gewesen, der Klick haette NUR das Bild genommen, und das Pixel
  // liefe weiter (GEMESSEN, V2).
  it("F23: ein Klick auf LinkedIn nimmt Lader und Rueckfall-Bild, nicht den Partner-Block", () => {
    const li = fund(testseite, "LinkedIn", "knoten");
    expect(li.stellen).toBe(2); // Lade-Block + Rueckfall-Bild

    const out = stripForeignGroup(testseite, li.schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("snap.licdn.com");
    expect(out.html).not.toContain("px.ads.linkedin.com");
    // Der Partner-Block bleibt — er traegt keine Adresse und ist ein Aufruf.
    expect(out.html).toContain("_linkedin_data_partner_ids");
    const rest = bekannt(out.html).filter((f) => f.anbieter[0] === "LinkedIn");
    expect(rest).toHaveLength(1);
    expect(rest[0].traeger).toBe("aufruf");
  });

  // F22. DER GOOGLE-SPLIT AN DER WIRKUNG: Ein Klick auf das LADE-Script nimmt es weg;
  // der Konfigurations-Schnipsel bleibt, weil er ein Aufruf ist (V1, Teil (cs)).
  //
  // OHNE LADE-SCRIPT WIRKT DER SCHNIPSEL NICHT MEHR — er ruft eine Funktion, die
  // niemand mehr nachlaedt. Der Betreiber kann den Rest von Hand wegnehmen, und bis
  // dahin schadet er nicht (ENTSCHEIDUNG P11.11-38).
  it("F22: der gtag-Lader geht, der Konfigurations-Schnipsel bleibt", () => {
    const lader = fund(testseite, "Google-Tag", "knoten");
    const schnipsel = fund(testseite, "Google-Tag", "aufruf");
    expect(lader.entfernbar).toBe(true);
    expect(schnipsel.entfernbar).toBe(false);

    const out = stripForeignGroup(testseite, lader.schluessel);
    expect(out.rest).toBe(0);
    expect(out.html).not.toContain("googletagmanager.com/gtag/js");
    expect(out.html).toContain("gtag('config', 'AW-111111111');");
    expect(out.html).toContain("function gtag(){dataLayer.push(arguments);}");
  });
});
