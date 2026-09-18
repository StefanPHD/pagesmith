import { afterEach, describe, expect, it, vi } from "vitest";
import {
  buildPageViewScript,
  injectPageViewEmitter,
} from "./pageview-emitter";
import { PAGEVIEW_EVENT } from "./events";
import {
  readConsentColor,
  type ConsentAppearance,
  type ConsentColor,
} from "@/lib/settings";

// DIE VIERTE DARSTELLUNG FUER DIE WAECHTER (Scheibe 11.13c). Die Probefarben gehen durch
// das Format-Tor und nicht an ihm vorbei; die Verengung geschieht ueber einen VERGLEICH,
// nicht ueber eine zweite Zusicherung (die CF1 in settings.test.ts zaehlt).
const testFarbe = (roh: string): ConsentColor => {
  const geprueft = readConsentColor(roh);
  if (geprueft === "unknown") throw new Error(`Testfarbe ungueltig: ${roh}`);
  return geprueft;
};
const EIGENE_FARBEN: ConsentAppearance = {
  theme: "custom",
  background: testFarbe("#0a0b0c"),
  text: testFarbe("#f0f1f2"),
};


const MARKER = 'id="__ps_pve"';

describe("injectPageViewEmitter", () => {
  // T-OFF. DER TEST, DER DIE ZUSAGE ALS SOLCHE HAELT, AUF DER DER PLATZHALTER
  // `deliveredTheme` IN publishProject RUHT (Phase 11.13, Scheibe 11.13b).
  // ER IST NICHT DER EINZIGE, DER SIE FAENGT, UND DAS IST GEMESSEN: Die Pflicht-Mutation
  // Mu10 (bei "off" einen themen-abhaengigen Block liefern) faellt AUCH T1 in
  // consent-setter.test.ts — dort aber nur als NEBENWIRKUNG seiner Byte-Zahl und nur fuer
  // dessen eine Fixture. T-OFF ist der einzige, der die Gleichheit UEBER DIE DREI THEMEN
  // ausspricht; T1 wuerde eine Aenderung, die alle drei GLEICHERMASSEN traefe, ebenfalls
  // melden, sagte aber nichts ueber das Thema.
  //
  // WORUM ES GEHT: Bei ausgeschaltetem Dialog ist ein UNBEKANNTER Themenwert zulaessig —
  // publishProject bricht dort NICHT ab (bindende Entscheidung P11.13-7), reicht aber
  // einen gebauten Wert weiter, weil der Typ einen verlangt. DIESE ZEILE IST NUR
  // UNSCHAEDLICH, SOLANGE DAS THEMA BEI "off" GAR NICHTS AM TEXT AENDERT. Genau das
  // prueft dieser Lauf — und er prueft es an der Funktion selbst, nicht am Kommentar
  // daneben (docs/immer-beachten.md, "NUR EIN TEST IST EIN WAECHTER").
  //
  // ER IST ZUGLEICH DER WAECHTER DER GRENZE VON P11.13-7: Jene Entscheidung kippt
  // ausdruecklich, "sobald der Themenwert auch bei 'off' etwas ausliefert". Wer das baut,
  // macht DIESEN Test rot — und muss dann die Entscheidung anfassen, nicht den Test.
  // SEIT SCHEIBE 11.13c UEBER ALLE VIER DARSTELLUNGEN. Das ist keine Formalie: Der
  // Platzhalter in publishProject reicht bei "off" den HELL-Zweig weiter, obwohl dort ein
  // ungueltiger Zustand zulaessig ist. NUR wenn das Thema bei "off" gar nichts am Text
  // aendert, ist diese Zeile unschaedlich — und genau das prueft dieser Lauf.
  it('T-OFF: bei "off" ist der Ausgabetext fuer alle VIER Darstellungen ZEICHENGLEICH', () => {
    const basis = "<html><body>x</body></html>";
    const hell = injectPageViewEmitter(basis, "tk-off", "off", { theme: "light" }, "standard");
    for (const d of [
      { theme: "dark" } as const,
      { theme: "auto" } as const,
      EIGENE_FARBEN,
    ]) {
      expect(
        injectPageViewEmitter(basis, "tk-off", "off", d, "standard"),
        JSON.stringify(d)
      ).toBe(hell);
    }
    // POSITIVKONTROLLE IM SELBEN LAUF: bei EINGESCHALTETEM Dialog unterscheiden sich die
    // drei sehr wohl — sonst waere dieser Test auch dann gruen, wenn das Thema UEBERHAUPT
    // nicht wirkte (Pflicht-Mutation Mu9).
    const anHell = injectPageViewEmitter(basis, "tk-off", "bar", { theme: "light" }, "standard");
    for (const d of [
      { theme: "dark" } as const,
      { theme: "auto" } as const,
      EIGENE_FARBEN,
    ]) {
      expect(
        injectPageViewEmitter(basis, "tk-off", "bar", d, "standard"),
        JSON.stringify(d)
      ).not.toBe(anHell);
    }
  });

  // T-OFF-TXT. DIESELBE ZUSAGE FUER DIE ZWEITE ACHSE (Phase 11.13, Scheibe 11.13d):
  // Der Platzhalter in publishProject reicht bei "off" den Zweig "standard" weiter,
  // obwohl dort ein UNGUELTIGER Sachtext zulaessig ist (bindende Entscheidung P11.13-26,
  // Asymmetrie aus P11.13-7). NUR wenn der Sachtext bei "off" gar nichts am Text aendert,
  // ist diese Zeile unschaedlich.
  // ER IST DER WAECHTER DER GRENZE: Wer bei "off" je einen Sachtext ausliefert, macht
  // DIESEN Test rot — und muss dann die Entscheidung anfassen, nicht den Test.
  it('T-OFF-TXT: bei "off" aendert ein eigener Sachtext den Ausgabetext NICHT', () => {
    const basis = "<html><body>x</body></html>";
    const std = injectPageViewEmitter(basis, "tk-off", "off", { theme: "light" }, "standard");
    for (const s of ["Mein eigener Satz.", "Wir setzen <3 Cookies", "x</SCRIPT>y"]) {
      expect(
        injectPageViewEmitter(basis, "tk-off", "off", { theme: "light" }, s as unknown as never),
        s
      ).toBe(std);
    }
    // POSITIVKONTROLLE IM SELBEN LAUF: bei EINGESCHALTETEM Dialog wirkt er sehr wohl —
    // sonst waere dieser Test auch dann gruen, wenn der Sachtext UEBERHAUPT nicht
    // ausgeliefert wuerde.
    const anStd = injectPageViewEmitter(basis, "tk-off", "bar", { theme: "light" }, "standard");
    for (const s of ["Mein eigener Satz.", "Wir setzen <3 Cookies"]) {
      expect(
        injectPageViewEmitter(basis, "tk-off", "bar", { theme: "light" }, s as unknown as never),
        s
      ).not.toBe(anStd);
    }
  });

  it("(a) fuegt das Script VOR dem </body> ein (nach dem Body-Inhalt)", () => {
    const out = injectPageViewEmitter("<html><body>x</body></html>", "tk-1", "off", { theme: "light" }, "standard");
    // Script sitzt zwischen dem Body-Inhalt und dem schliessenden Tag.
    expect(out.indexOf("x")).toBeLessThan(out.indexOf(MARKER));
    expect(out.indexOf(MARKER)).toBeLessThan(out.indexOf("</body>"));
    // published_content bleibt gueltiges HTML: der </body>-Abschluss bleibt erhalten.
    expect(out).toContain("</body></html>");
  });

  it("(a') findet </body> case-insensitiv (</BODY>)", () => {
    const out = injectPageViewEmitter("<HTML><BODY>x</BODY></HTML>", "tk-1", "off", { theme: "light" }, "standard");
    expect(out.indexOf(MARKER)).toBeGreaterThan(-1);
    expect(out.indexOf(MARKER)).toBeLessThan(out.indexOf("</BODY>"));
  });

  it("(b) haengt bei fehlendem </body> ans Ende an", () => {
    const out = injectPageViewEmitter("<div>x</div>", "tk-1", "off", { theme: "light" }, "standard");
    expect(out).toContain("<div>x</div>");
    // Script am Dokumentende (feuert trotzdem).
    expect(out.trimEnd().endsWith("</script>")).toBe(true);
    expect(out.indexOf("<div>x</div>")).toBeLessThan(out.indexOf(MARKER));
  });

  it("(c) baeckt den UEBERGEBENEN (Spalten-)Key via JSON.stringify ein", () => {
    const out = injectPageViewEmitter("<body></body>", "col-key", "off", { theme: "light" }, "standard");
    expect(out).toContain(JSON.stringify("col-key")); // "col-key"
  });

  it("(d) nutzt die events.ts-Konstante fuer event (kein handgetipptes Literal) + first-party /api/e + keepalive", () => {
    const out = injectPageViewEmitter("<body></body>", "tk-1", "off", { theme: "light" }, "standard");
    // event kommt aus der geteilten Konstante -> kein Drift zu isForwardable.
    expect(out).toContain(JSON.stringify(PAGEVIEW_EVENT));
    // Relativer first-party-Endpunkt (wie der Conversion-Beacon, 7b) + keepalive-Fallback.
    expect(out).toContain("sendBeacon('/api/e'");
    expect(out).toContain("keepalive: true");
    // ID-Guard vorhanden.
    expect(out).toContain("window.__ps_pv");
  });

  // PHASE 11, ZWEITE SCHEIBE: die zweite Einfuegestelle des geteilten Consent-Gates.
  // Sie traegt den Fall "publizierte Seite OHNE Wiring" — dort kaeme der Block sonst
  // von niemandem, obwohl mit dem Emitter ein Tracking-Konsument da ist.
  it("(f) OHNE Wiring: der Emitter bringt den Consent-Block MIT, und zwar VOR sich", () => {
    const out = injectPageViewEmitter(
      "<html><body><h1>nur Text</h1></body></html>",
      "k",
      "off",
      { theme: "light" }
    , "standard");
    expect(out).toContain('id="pagesmith-consent"');
    expect(out.indexOf('id="pagesmith-consent"')).toBeLessThan(
      out.indexOf("__ps_pv")
    );
  });

  it("(g) EIN BLOCK JE DOKUMENT: ist er schon da, ergaenzt der Emitter KEINEN zweiten", () => {
    // Geprueft wird das DOKUMENT, nicht eine Aufrufreihenfolge.
    const withGate = `<html><body><script id="pagesmith-consent"></scr` +
      `ipt></body></html>`;
    const out = injectPageViewEmitter(withGate, "k", "off", { theme: "light" }, "standard");
    expect(out.split('id="pagesmith-consent"').length - 1).toBe(1);
  });

  it("(e) kommt DANEBEN: CAPI-Wiring bleibt erhalten, Emitter kommt zusaetzlich", () => {
    // Simuliert ein CAPI-Projekt-HTML mit Meta-Wiring-Marker.
    const input = "<html><body><h1>x</h1><script>__psMetaFire(a.config);</script></body></html>";
    const out = injectPageViewEmitter(input, "tk-1", "off", { theme: "light" }, "standard");
    // Der CAPI-Marker ueberlebt (Emitter ersetzt nichts).
    expect(out).toContain("__psMetaFire(a.config);");
    // Der Emitter ist zusaetzlich da.
    expect(out).toContain(MARKER);
    // Rein additiv: laenger als das Original, kompletter Body-Inhalt als Teilstring.
    expect(out.length).toBeGreaterThan(input.length);
    expect(out).toContain("<h1>x</h1>");
  });
});

describe("buildPageViewScript", () => {
  it("ist serialisierungssicher: kein literales </script> oder </body> im Emitter", () => {
    const script = buildPageViewScript("tk-1", false);
    // Genau EIN schliessendes </script> (das Tag selbst), keins im JS-Body.
    expect(script.match(/<\/script>/g)?.length).toBe(1);
    expect(script.endsWith("</script>")).toBe(true);
    expect(script.toLowerCase()).not.toContain("</body>");
  });
});

// ===========================================================================
// WIRKUNGS-HARNESS + WIRKUNGS-TESTS (Phase 11, dritte Scheibe)
//
// DIE TESTS DARUEBER PRUEFEN STRUKTUR, DIESE PRUEFEN WIRKUNG. Fuer eine Scheibe,
// deren ganzer Gegenstand "feuert / feuert nicht" ist, war die Struktur allein
// die Luecke: Ein Teilstring beweist nicht, dass der Emitter schweigt.
//
// DER HARNESS LAEUFT UEBER DEN ECHTEN EINFUEGER und evaluiert die Scripts in
// DOKUMENT-REIHENFOLGE. Er stellt die Reihenfolge NICHT von Hand her — genau das
// ist der Unterschied zur billigeren Variante: Faellt die Einfuegung des
// Gate-Blocks aus, merkt der Harness es, statt darueber hinwegzugehen.
// ===========================================================================

const HTML_OHNE_WIRING = "<html><body><h1>nur Text</h1></body></html>";
const KEY = "tk-harness";

type BeaconSpy = ReturnType<typeof vi.fn>;
type Mutable = Record<string, unknown>;

/**
 * Baut das Dokument ueber injectPageViewEmitter, evaluiert alle Scripts in
 * Dokument-Reihenfolge und gibt den sendBeacon-Spion zurueck.
 *
 * DREI HYGIENE-PFLICHTEN, je mit ihrem Grund — ohne sie misst der Test den
 * VORGAENGER statt den eigenen Fall:
 *
 * (1) __psConsent ABRAEUMEN. Der Gate-Block setzt es beim Evaluieren SELBST, also
 *     nicht ueber vi.stubGlobal — vi.unstubAllGlobals raeumt es deshalb NICHT ab.
 *     Ein stehengebliebenes Urteil aus dem Vorgaengertest ueberlebte sonst in den
 *     Fall "Block fehlt" hinein und machte ihn gruen aus dem falschen Grund.
 * (2) __ps_pv ABRAEUMEN — die schaerfste der drei. Der Guard ist eine
 *     Eigenschaft von window und ueberlebt jeden Test. OHNE DIESE ZEILE SAEHE
 *     JEDER TEST AB DEM ZWEITEN EINEN GESETZTEN GUARD und meldete "kein Beacon",
 *     UNABHAENGIG VON DER EINWILLIGUNG: Jeder Verbots-Test waere gruen, ohne
 *     irgendetwas zu pruefen.
 * (3) sendBeacon SETZEN. jsdom implementiert navigator.sendBeacon NICHT — ohne
 *     Spion ist `navigator.sendBeacon && …` falsy, der Emitter faellt auf fetch
 *     zurueck (in jsdom ebenfalls nicht vorhanden) und tut LAUTLOS NICHTS. Der
 *     Spion ist damit Voraussetzung der Messung, nicht Komfort.
 *
 * removeGate stellt den Zustand aus Befund (f) nach: das Dokument traegt den
 * Block nicht, obwohl der Emitter da ist.
 */
function mountEmitter(
  consent: unknown,
  opts: { removeGate?: boolean } = {}
): BeaconSpy {
  delete (globalThis as unknown as Mutable).__psConsent; // (1)
  delete (window as unknown as Mutable).__ps_pv; // (2)
  const beacon = vi.fn(() => true); // (3)
  (navigator as unknown as Mutable).sendBeacon = beacon;

  vi.stubGlobal("pagesmithConsent", consent);

  const doc = new DOMParser().parseFromString(
    injectPageViewEmitter(HTML_OHNE_WIRING, KEY, "off", { theme: "light" }, "standard"),
    "text/html"
  );
  if (opts.removeGate) doc.querySelector("#pagesmith-consent")?.remove();
  // Geparstes HTML fuehrt <script> nicht aus -> bewusst evaluieren, in genau der
  // Reihenfolge, in der sie im Dokument stehen (wie es der Browser taete).
  for (const s of Array.from(doc.querySelectorAll("script"))) {
    window.eval(s.textContent ?? "");
  }
  return beacon;
}

/** Die Nutzlast des ersten Beacons (text/plain-Blob -> JSON). */
async function payloadOf(beacon: BeaconSpy): Promise<Record<string, unknown>> {
  const [, blob] = beacon.mock.calls[0] as unknown as [string, Blob];
  return JSON.parse(await blob.text());
}

/** Der Guard-Wert nach dem Mount, oder undefined. */
function guardValue(): unknown {
  return (window as unknown as Mutable).__ps_pv;
}

afterEach(() => {
  vi.unstubAllGlobals();
  delete (navigator as unknown as Mutable).sendBeacon;
  delete (globalThis as unknown as Mutable).__psConsent;
  delete (window as unknown as Mutable).__ps_pv;
});

describe("PageView-Emitter hinter dem Gate — WIRKUNG", () => {
  it("T1 KEIN HOOK -> der Beacon geht raus (Bestandszusage, POSITIVKONTROLLE)", async () => {
    // ROT DURCH: einen Ausfallmodus, der "nie entschieden" als verboten liest.
    // "Nichts gesetzt" heisst ERLAUBT — kippte das, bräche es JEDEN Bestandskunden.
    const beacon = mountEmitter(undefined);
    expect(beacon).toHaveBeenCalledTimes(1);
    const [url] = beacon.mock.calls[0] as unknown as [string, Blob];
    expect(url).toBe("/api/e");
    expect(await payloadOf(beacon)).toEqual({
      trackingKey: KEY,
      eventID: expect.any(String),
      event: PAGEVIEW_EVENT,
    });
  });

  it("T2 OBJEKT MIT analytics:true -> Beacon, Nutzlast unveraendert", async () => {
    // ROT DURCH: einen falsch gelesenen Schluessel. Prueft zugleich, dass die
    // Nutzlast BYTE-GLEICH bleibt (kein Wire-Feld — Ausschluss der Scheibe).
    const beacon = mountEmitter(() => ({ analytics: true }));
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(Object.keys(await payloadOf(beacon)).sort()).toEqual([
      "event",
      "eventID",
      "trackingKey",
    ]);
  });

  it("T3 OBJEKT OHNE analytics ({meta:true}) -> KEIN Beacon (DIE UMKEHR + der Schluesselbeweis)", () => {
    // ROT DURCH ZWEI Mutationen, und das macht ihn zum schaerfsten Test hier:
    // M-A (Pruefung entfernt -> er feuert) UND M-D (Schluessel auf `meta`
    // gedreht -> {meta:true} waere dann erlaubt und er feuerte ebenfalls).
    expect(mountEmitter(() => ({ meta: true }))).not.toHaveBeenCalled();
  });

  it("T4 BOOLEAN false -> KEIN Beacon", () => {
    // ROT DURCH: M-A (Pruefung entfernt).
    expect(mountEmitter(() => false)).not.toHaveBeenCalled();
  });

  it("T5 FEHLENDER GATE-BLOCK -> KEIN Beacon (fail-closed nach (d))", () => {
    // T5 IST DER BEACON-WAECHTER: er misst, OB gesendet wurde — und sonst nichts.
    // ROT DURCH: M-B (Ausfallmodus der Existenzpruefung auf erlaubt gedreht).
    //
    // DER MOUNT IST GEGEN EINEN WURF ABGESCHIRMT. Der Grund ist nicht die
    // Mechanik, sondern die RICHTUNG DES ROTS: Ohne die Abschirmung meldete T5
    // unter der Mutation, die die Existenzpruefung entfernt, einen Fehlschlag, der
    // sich liest wie "ein Beacon ging raus" — der Wurf aus dem Emitter schlug bis
    // in den Testkoerper durch, noch bevor die Assertion lief. EIN TEST, DESSEN
    // ROT IN DIE FALSCHE RICHTUNG ZEIGT, SCHICKT DEN LESER AN DIE FALSCHE STELLE.
    //
    // ARBEITSTEILUNG, ausdruecklich: T5 bemerkt einen ABSTURZ BEWUSST NICHT — das
    // tut T7, der ABSTURZ-WAECHTER, und er ist der EINZIGE, der ihn faengt.
    // DASS T5 IHN NICHT BEMERKT, IST BEABSICHTIGT UND KEINE NACHLAESSIGKEIT:
    // Lektion (b) warnt davor, dass ein Absturz UNBEMERKT bleibt — er bleibt es
    // nicht, T7 sieht ihn. Wer T7 spaeter als redundant entfernt, macht aus dieser
    // Arbeitsteilung genau die Luecke, vor der die Lektion warnt.
    //
    // DIE ABSCHIRMUNG FAENGT DEN WURF, SIE UNTERDRUECKT IHN NICHT ANDERSWO: sie
    // liegt allein um DIESEN Mount; T7 evaluiert unabgeschirmt.
    try {
      mountEmitter(undefined, { removeGate: true });
    } catch {
      // bewusst geschluckt — der Waechter dafuer ist T7.
    }
    // Der Spion haengt am navigator und ist auch dann lesbar, wenn der Mount
    // vorzeitig endete: der Harness setzt ihn VOR dem Evaluieren.
    const spy = (navigator as unknown as Mutable).sendBeacon as BeaconSpy;
    expect(spy).not.toHaveBeenCalled();
  });

  it("T6 BLOCKIERT -> der Guard bleibt UNGESETZT (Einloesung von (c))", () => {
    // ROT DURCH: M-C (Guard vor die Pruefung gezogen). Der Guard bedeutet "fuer
    // diesen Load ist ein Seitenaufruf raus" — im blockierten Fall gab es keinen.
    mountEmitter(() => false);
    expect(guardValue()).toBeUndefined();
  });

  it("T6' ERLAUBT -> der Guard IST gesetzt und traegt DIESELBE Kennung wie die Nutzlast", async () => {
    // POSITIVKONTROLLE ZU T6: Ohne sie zeigte T6 nur, dass IRGENDETWAS den Guard
    // nicht setzt — nicht, dass er im erlaubten Fall sehr wohl gesetzt wird.
    // ROT DURCH: einen zweiten Kennungs-Erzeuger (dann divergieren Guard und
    // Nutzlast) oder einen Guard, der gar nicht mehr gesetzt wird.
    const beacon = mountEmitter(() => ({ analytics: true }));
    const payload = await payloadOf(beacon);
    expect(typeof guardValue()).toBe("string");
    expect(guardValue()).toBe(payload.eventID);
  });

  it("T7 FEHLENDER GATE-BLOCK -> das Evaluieren WIRFT NICHT", () => {
    // T7 IST DER ABSTURZ-WAECHTER und das EINZELSTUECK dieser Scheibe: der EINZIGE
    // Test, der das Entfernen der Existenzpruefung faengt.
    //
    // ARBEITSTEILUNG, ausdruecklich: T5 ist der BEACON-WAECHTER — er misst, OB
    // gesendet wurde, und bemerkt einen Absturz BEWUSST NICHT (sein Mount ist
    // abgeschirmt). T7 misst den ABSTURZ, und sonst nichts. "blockiert" und
    // "abgestuerzt" sehen an einer Abwesenheits-Assertion identisch aus — deshalb
    // braucht es beide.
    // DASS T5 DEN ABSTURZ NICHT BEMERKT, IST BEABSICHTIGT UND KEINE
    // NACHLAESSIGKEIT: Lektion (b) warnt davor, dass ein Absturz UNBEMERKT bleibt
    // — er bleibt es nicht, weil DIESER Test ihn sieht. WER IHN SPAETER ALS
    // REDUNDANT ENTFERNT, macht aus der beabsichtigten Arbeitsteilung genau die
    // Luecke, vor der die Lektion warnt.
    //
    // Die try/catch im Emitter umschliessen NUR das Senden; ein Wurf an der
    // Pruefstelle verliesse die IIFE und window.eval.
    expect(() => mountEmitter(undefined, { removeGate: true })).not.toThrow();
  });
});
