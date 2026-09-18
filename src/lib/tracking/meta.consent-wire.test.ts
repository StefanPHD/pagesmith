import { describe, expect, it } from "vitest";
import {
  buildCapiBeaconStatement,
  buildMetaRuntime,
  buildPixelConfirmStatement,
} from "./meta";
import { META_CONSENT_TARGET } from "./consent";
import { CONSENT_WIRE_FIELD } from "./consent-wire";

// ===========================================================================
// DIE PIXEL-ID ALS BETREIBER-EINGABE (Phase 11.13, Scheibe 11.13d; bindende
// Entscheidungen P11.13-25 und P11.13-30).
// ===========================================================================
describe("buildMetaRuntime — die Pixel-ID geht ueber den Einbettungs-Helfer", () => {
  // DIE NUTZLASTEN SIND DIE GEMESSENEN (Invariante S9): woertlich aus VERMERK P11.13-7,
  // dem Lauf vom 2026-09-18. Dort hat GENAU DIESE Einsetzstelle den Block verlassen, und
  // mit der Fassung OHNE Anfuehrungszeichen hat fremder Code AUSGEFUEHRT.
  const FEINDLICHE_IDS = [
    "</script><img src=x onerror=\"window.__AUSBRUCH=1\">",
    "</script><img src=x onerror=window.__AUSBRUCH=1>",
    "<!--<script><img src=x onerror=\"window.__AUSBRUCH=1\">",
    "x</SCRIPT>y",
  ] as const;

  // MR1. DER WAECHTER AM ERGEBNIS (P11.13-30). WODURCH ROT: wenn die eine Zeile
  // `var PS_PIXEL_ID = …` wieder auf ein rohes JSON.stringify faellt (Pflicht-Mutationen
  // M-a und M-b).
  it("MR1: eine feindliche Pixel-ID hinterlaesst kein '<' in der Laufzeit", () => {
    // DIE BASIS-LAUFZEIT TRAEGT SELBST EIN "<" — einen VERGLEICHSOPERATOR
    // (`i < __psConfirmQueue.length`). Ein "kein < in der Ausgabe" waere hier also
    // falsch und muesste den Code umbauen, um den Test zu befriedigen: genau die
    // Fehlerklasse "EIN WAECHTER UEBER ZEICHEN DARF DIE GESTALT DES GEPRUEFTEN NICHT
    // BESTIMMEN". GEPRUEFT WIRD DESHALB DER BEITRAG DER PIXEL-ID: Die Zahl der "<" darf
    // sich gegenueber einer harmlosen ID NICHT aendern.
    const basis = buildMetaRuntime("1234567890", "", "", []);
    const basisKleiner = (basis.match(/</g) ?? []).length;
    expect(basisKleiner).toBe(1); // POSITIVKONTROLLE der Zaehlachse
    for (const id of FEINDLICHE_IDS) {
      const js = buildMetaRuntime(id, "", "", []);
      expect((js.match(/</g) ?? []).length, id).toBe(basisKleiner);
      // UND DIE ZWEI GESTALTEN, DIE DEN BLOCK VERLASSEN BZW. VERSCHLUCKEN, EINZELN:
      expect(js.match(/<\/script/gi), id).toBeNull();
      expect(js.includes("<!--"), id).toBe(false);
      // RUNDLAUF: Der Wert kommt unveraendert wieder heraus — der Helfer maskiert, er
      // verstuemmelt nicht. Ohne diese Haelfte waere der Test auch mit "alles wegwerfen"
      // gruen.
      const m = js.match(/var PS_PIXEL_ID = (.*);/);
      expect(m, id).not.toBeNull();
      expect(JSON.parse(m![1]), id).toBe(id);
    }
  });

  // MR2. DIE BYTE-ZUSAGE (Invariante S1): Eine NUMERISCHE Pixel-ID traegt kein "<", und
  // fuer sie ist die Ausgabe zeichengleich mit der Fassung vor dieser Scheibe.
  // WODURCH ROT: wenn der Helfer mehr taete als maskieren.
  it("MR2: eine numerische Pixel-ID wird zeichengleich eingebettet", () => {
    const js = buildMetaRuntime("1234567890", "", "", []);
    expect(js).toContain('var PS_PIXEL_ID = "1234567890";');
  });
});

// ===========================================================================
// DER ERZEUGER DES EINWILLIGUNGS-SIGNALS// ===========================================================================
// DER ERZEUGER DES EINWILLIGUNGS-SIGNALS (Phase 11, fuenfte Scheibe).
//
// REINE TEXT-TESTS auf dem erzeugten Laufzeit-JS. Die WIRKUNG des Feldes prueft
// capi/ingest.consent.test.ts, die REGEL tracking/consent-wire.test.ts. Hier steht
// nur: Steht es drin, steht es NUR dort, und kostet es keinen zweiten Hook-Aufruf.
//
// WARUM TEXT UND NICHT WIRKUNG: Der Beacon-Rumpf referenziert `__c`, `eid` und
// `cfg` aus seinem Einbettungs-Kontext — er ist fuer sich allein nicht
// ausfuehrbar. Die ausfuehrende Pruefung des Gesamt-Dokuments liegt in
// generate.test.ts und bleibt unangetastet.
// ===========================================================================

const PIXEL = "1234567890";
const KEY = "tk-public-123";
const URL = "https://app.pagesmith.io/api/e";

describe("Der Conversion-Beacon traegt das Signal", () => {
  it("Feldname und Ziel-Schluessel stehen im Body — beide aus den Konstanten", () => {
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain(`"${CONSENT_WIRE_FIELD}": { "${META_CONSENT_TARGET}": __c === true }`);
  });

  it("der Wert ist die GEHOBENE Variable, nicht ein zweiter Hook-Aufruf", () => {
    // ROT DURCH: `__psConsent("meta") === true` direkt im Body. Das waere ein
    // ZWEITER Schnappschuss desselben Urteils — er koennte der Entscheidung
    // widersprechen, die den Beacon durchgelassen hat.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).not.toContain("__psConsent");
  });

  it("`=== true` statt truthy — die Strenge der Regel gespiegelt", () => {
    // ROT DURCH M2 auf der ERZEUGER-Seite: `__c` roh statt `__c === true` schickte
    // bei einem truthy-Wert etwas anderes als einen Boolean in den Draht.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain("__c === true");
  });

  it("die Bestandsfelder stehen unveraendert daneben", () => {
    // Das Signal kommt DANEBEN. Ein verlorenes Bestandsfeld waere eine stille
    // Regression auf dem gerade beruehrten Pfad.
    const beacon = buildCapiBeaconStatement(KEY, URL);
    expect(beacon).toContain("eventID: eid");
    expect(beacon).toContain("event: cfg.event");
    expect(beacon).toContain("eventSourceUrl: location.href");
    expect(beacon).toContain("isCustom: !!cfg.isCustom");
    expect(beacon).toContain("__b._fbp = __fbp");
  });

  it("ohne trackingKey/proxyUrl entsteht KEIN Body und damit auch kein Signal", () => {
    expect(buildCapiBeaconStatement("", URL)).not.toContain(CONSENT_WIRE_FIELD);
    expect(buildCapiBeaconStatement(KEY, "")).not.toContain(CONSENT_WIRE_FIELD);
  });
});

describe("Der Confirm-Beacon bleibt SCHMAL", () => {
  it("er traegt das Signal NICHT", () => {
    // ENTSCHEIDUNG MIT GRUND, kein Vergessen: Er forwardet nie, und sein Urteil
    // waere strukturell VERALTET — er erbt es und sendet im gepufferten Fall erst
    // nach dem Laden des Fremdscripts. Ein veraltetes Urteil im Draht ist
    // schlechter als keines, weil der Server ihm glaubte.
    const confirm = buildPixelConfirmStatement(KEY, URL);
    expect(confirm).not.toContain(CONSENT_WIRE_FIELD);
    expect(confirm).toContain("obs:");
  });
});

describe("Die Zahl der Hook-Aufrufe bleibt, wie sie war", () => {
  it("GENAU ZWEI Aufrufstellen von __psConsent( im ganzen Laufzeit-Text", () => {
    // DER ZAEHLENDE WAECHTER (Invariante 4: kein zusaetzlicher Hook-Aufruf).
    // Zwei Stellen, und nur diese zwei: __psMetaInit und __psMetaFire. Ein dritter
    // Aufruf — etwa im Beacon-Rumpf — waere ein zusaetzlicher Schnappschuss auf dem
    // Klick-Pfad. `toContain` faenge das NICHT; nur eine Zaehlung faengt es.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(/__psConsent\(/g)?.length).toBe(2);
  });

  it("und GENAU ZWEI Existenzpruefungen daneben", () => {
    // Die Pruefungen sind KEINE Aufrufe (sie stehen ohne Klammer). Getrennt
    // gezaehlt, damit ein entfernter Guard nicht von der Aufruf-Zahl verdeckt wird.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(/typeof __psConsent !== "function"/g)?.length).toBe(2);
  });

  it("das Signal wird EINMAL gesetzt, nicht je Konsument erneut", () => {
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.match(new RegExp(`"${CONSENT_WIRE_FIELD}":`, "g"))?.length).toBe(1);
  });
});

describe("Die gehobene Variable steht VOR ihrem Leser", () => {
  it("__c wird deklariert, bevor der Beacon-Rumpf sie liest", () => {
    // ROT DURCH: eine Umstellung, die den Beacon vor die Deklaration schoebe — im
    // Browser waere das ein `undefined` im Draht statt eines Booleans.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    const decl = rt.indexOf("var __c = __psConsent(");
    const use = rt.indexOf("__c === true");
    expect(decl).toBeGreaterThan(-1);
    expect(use).toBeGreaterThan(decl);
  });

  it("das Gate bleibt VOR dem Init und damit vor dem Script-Load", () => {
    // Die Verschaerfung aus Phase 6 haengt daran: vor Consent kein Request an
    // connect.facebook.net. Die gehobene Variable darf daran nichts verschieben.
    const rt = buildMetaRuntime(PIXEL, KEY, URL);
    expect(rt.indexOf("if (!__c) return;")).toBeLessThan(rt.indexOf("__psMetaInit()) return;"));
  });
});

// ===========================================================================
// DIE ZIEL-LISTE (Phase 11, neunte Scheibe, HAELFTE B).
//
// ALLES DARUEBER PRUEFT DEN PFAD OHNE LISTE — und das ist ab jetzt eine eigene
// Aussage, nicht mehr der Normalfall: Ohne Liste bleibt der erzeugte Text
// WOERTLICH der von vor dieser Haelfte. Genau deshalb sind die Zaehl-Waechter
// oben gruen geblieben; sie decken seit dieser Haelfte NUR NOCH den alten Pfad.
// Was unten steht, deckt den neuen.
// ===========================================================================

const ZWEI = [META_CONSENT_TARGET, "pinterest"];

describe("HAELFTE B — mit Ziel-Liste zieht der Text GENAU EINMAL", () => {
  it("EINE Aufrufstelle von __psConsentAll, und KEINE von __psConsent", () => {
    // DER ZAEHLENDE WAECHTER DES NEUEN PFADS. Der alte Zaehler oben faengt das
    // NICHT: Er zaehlt `__psConsent(`, und diese Zeichenkette steckt NICHT in
    // `__psConsentAll(` (dazwischen steht ein A). Ohne diesen Test waere eine
    // zweite Ziehung im neuen Pfad unsichtbar.
    const rt = buildMetaRuntime(PIXEL, KEY, URL, ZWEI);
    expect(rt.match(/__psConsentAll\(/g)?.length).toBe(1);
    expect(rt.match(/__psConsent\(/g) ?? []).toHaveLength(0);
  });

  it("die Existenzpruefung fragt nach DER Funktion, die auch gerufen wird", () => {
    // ROT DURCH: eine Pruefung auf __psConsent, waehrend __psConsentAll gerufen
    // wird. Fehlte dann die zweite Funktion, wuerfe der Klick-Handler — und
    // hinter ihm wartet der Redirect.
    const rt = buildMetaRuntime(PIXEL, KEY, URL, ZWEI);
    expect(rt).toContain('if (typeof __psConsentAll !== "function") return;');
  });

  it("OHNE Liste kommt __psConsentAll ueberhaupt nicht vor", () => {
    // DIE GEGENPROBE: Der alte Pfad bleibt unberuehrt, sonst sagte der Test
    // darueber nichts ueber einen Unterschied.
    expect(buildMetaRuntime(PIXEL, KEY, URL)).not.toContain("__psConsentAll");
  });
});

describe("HAELFTE B — das Feld traegt N Schluessel aus EINEM Schnappschuss", () => {
  it("beide Schluessel, je mit der Strenge der Server-Regel", () => {
    const beacon = buildCapiBeaconStatement(KEY, URL, ZWEI);
    expect(beacon).toContain(
      `"${CONSENT_WIRE_FIELD}": { "${META_CONSENT_TARGET}": __c["${META_CONSENT_TARGET}"] === true, "pinterest": __c["pinterest"] === true }`
    );
  });

  it("die Werte kommen aus __c, NICHT aus einem zweiten Aufruf", () => {
    // ROT DURCH: `__psConsentAll(...)["meta"]` direkt im Body. Das waere ein
    // ZWEITER Schnappschuss und koennte der Entscheidung widersprechen, die
    // diesen Beacon durchgelassen hat.
    expect(buildCapiBeaconStatement(KEY, URL, ZWEI)).not.toContain("__psConsent");
  });

  it("EIN Ziel in der Liste -> genau EIN Schluessel (Invariante 1)", () => {
    const beacon = buildCapiBeaconStatement(KEY, URL, [META_CONSENT_TARGET]);
    expect(beacon).toContain(
      `"${CONSENT_WIRE_FIELD}": { "${META_CONSENT_TARGET}": __c["${META_CONSENT_TARGET}"] === true }`
    );
    expect(beacon).not.toContain("pinterest");
  });

  it("LEERE Liste -> das Feld entsteht in der ALTEN Form, nicht leer", () => {
    // DIE TEUERSTE ZUSAGE DIESER HAELFTE. Ein VORHANDENES, leeres Feld verboete
    // nach der HAELFTE A ALLES — auch das Alt-Ziel, denn die Altbestands-Ausnahme
    // verlangt ein ABWESENDES Feld. Ein Projekt ohne jede Kennung verloere so
    // RUECKWIRKEND seinen Forward, sobald jemand spaeter eine Kennung eintraegt,
    // ohne neu zu veroeffentlichen.
    const beacon = buildCapiBeaconStatement(KEY, URL, []);
    expect(beacon).toContain(
      `"${CONSENT_WIRE_FIELD}": { "${META_CONSENT_TARGET}": __c === true }`
    );
    expect(beacon).not.toContain("{  }");
    expect(beacon).not.toContain("{ }");
  });
});

describe("HAELFTE B — VIER EINZELNE WACHEN, keine an eine andere angehaengt", () => {
  const rt = () => buildMetaRuntime(PIXEL, KEY, URL, ZWEI);

  it("WACHE 4 — die Untergrenze des Beacons steht als eigener Ausgang", () => {
    expect(rt()).toContain(
      `if (!(__c["${META_CONSENT_TARGET}"] === true || __c["pinterest"] === true)) return;`
    );
  });

  it("WACHE 1 — der Script-Load folgt METAS Urteil, nicht 'irgendeines'", () => {
    // DER UNTERSCHIED, DEN MAN SONST NICHT SIEHT: Drei Wachen lauten gleich, DIESE
    // nicht. Schon der Load leakt IP und Referer an den Anbieter — er darf nie an
    // der Erlaubnis fuer ein FREMDES Ziel haengen.
    expect(rt()).toContain(
      `var __ok = __psMetaInit(__c["${META_CONSENT_TARGET}"] === true);`
    );
  });

  it("WACHE 2 — die Pixel-Aufrufe haengen an __ok, in EIGENER Verzweigung", () => {
    const t = rt();
    expect(t).toContain("if (__ok) {");
    expect(t).toContain('fbq("track", cfg.event, params, { eventID: eid })');
  });

  it("WACHE 3 — die Bestaetigung haengt an __ok, in EIGENER Verzweigung", () => {
    // TEXT STATT AUSFUEHRUNG, offen benannt: __psConfirm PUFFERT, solange der
    // Ladezustand 'pending' ist — ohne eine Simulation des fbevents-Ladevorgangs
    // ist sein Ausbleiben nicht von seinem Puffern zu unterscheiden. Dieser Test
    // ist deshalb der EINZIGE Waechter dieser Wache.
    expect(rt()).toContain("if (__ok) __psConfirm(eid, cfg.event);");
  });

  it("der Bootstrap ZIEHT im neuen Pfad NICHT mehr selbst", () => {
    // E4 im Wortlaut: die Wache bleibt, ihre QUELLE wechselt. Zoege sie weiter
    // selbst, gaebe es beim ersten Klick ZWEI Ziehungen — und die tragende
    // Entscheidung dieser Haelfte waere nicht eingeloest.
    expect(rt()).toContain("function __psMetaInit(ok) {");
    expect(rt()).toContain("if (!ok) return false;");
  });
});

describe("HAELFTE B — die Kennung entsteht an GENAU EINER Stelle", () => {
  it("in beiden Pfaden genau ein 'var eid ='", () => {
    // ROT DURCH M3. Zwei Erzeugungsstellen braechen Metas Deduplizierung UND den
    // Verlustraten-Join — lautlos, weil beide Werte fuer sich gueltig aussehen.
    expect(buildMetaRuntime(PIXEL, KEY, URL, ZWEI).match(/var eid =/g)?.length).toBe(1);
    expect(buildMetaRuntime(PIXEL, KEY, URL).match(/var eid =/g)?.length).toBe(1);
  });

  it("im neuen Pfad steht sie VOR allen vier Wachen", () => {
    const t = buildMetaRuntime(PIXEL, KEY, URL, ZWEI);
    expect(t.indexOf("var eid =")).toBeLessThan(t.indexOf("var __ok ="));
  });
});
