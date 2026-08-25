import { describe, expect, it } from "vitest";

import { extractGoogleClickIds } from "./google-click-ids";

// ===========================================================================
// DIE EXTRAKTION DER KLICK-KENNUNGEN (Phase 11.2, Scheibe 11.2a).
//
// KEIN vi.mock("server-only") — und das ist eine Aussage, keine Auslassung: Der
// Pruefling ist REIN. Ein Mock auf server-only behauptete an dieser Stelle das
// Gegenteil und wuerde beim naechsten Lesen als Beleg dafuer genommen, die Datei sei
// server-only. S. den Kopfsatz zur Ablage in google-click-ids.ts.
//
// REINE EINHEITSTESTS — kein Netz, kein DOM, kein Handler. Was diese Datei prueft, ist
// die FUNKTION, nicht der Ingest-Pfad; der hat sie heute gar nicht als Aufrufer.
//
// DIE ACHSEN SIND DREI, und sie werden getrennt gehalten:
//  (1) EINGABE UNBRAUCHBAR — kein String, kaputte Adresse, kein Query.
//  (2) ANWESENHEIT — leerer Wert, mehrere Kennungen, doppelter Parameter.
//  (3) DER WERT SELBST — Dekodierung, und die tragende Auflage: keine Formpruefung.
// ===========================================================================

/**
 * EIN WERT, DER EINER ECHTEN KENNUNG UNAEHNLICH IST — und genau das ist sein Zweck.
 *
 * Er traegt Leerzeichen, Klammern, Umlaute und ist kurz. Eine echte gclid ist eine
 * lange, undurchsichtige Folge aus Buchstaben, Ziffern, Bindestrich und Unterstrich.
 * WER HIER EINEN WERT EINSETZT, DER WIE EINE gclid AUSSIEHT, PRUEFT NICHTS: Jede
 * denkbare Formpruefung liesse ihn durch, und der Test bliebe gruen, waehrend die
 * Auflage "ANWESENHEIT, NIE FORM" gebrochen waere.
 */
const UNAEHNLICH = "nicht wie eine gclid (!) 42";

describe("extractGoogleClickIds: unbrauchbare Eingabe ergibt eine leere Menge", () => {
  it("keine Eingabe -> {}", () => {
    // ROT, wenn der typeof-Riegel faellt: `new URL(undefined)` wirft, und der Wurf
    // verliesse die Funktion — die Zusage "wirft nie" waere gebrochen.
    expect(extractGoogleClickIds(undefined)).toEqual({});
    expect(extractGoogleClickIds(null)).toEqual({});
    expect(extractGoogleClickIds("")).toEqual({});
    expect(extractGoogleClickIds(42)).toEqual({});
  });

  it("kaputte URL -> {}, und KEIN Wurf", () => {
    // ROT, wenn das try/catch entfaellt. Der Aufruf selbst ist die Zusicherung: waere
    // der Wurf nicht gefangen, schluege der Test mit der Ausnahme fehl statt mit einer
    // Erwartung.
    expect(extractGoogleClickIds("keine-adresse")).toEqual({});
    expect(extractGoogleClickIds("/nur/ein/pfad?gclid=ABC")).toEqual({});
    expect(extractGoogleClickIds("http://")).toEqual({});
  });

  it("URL ohne Query -> {}", () => {
    // ROT, wenn der Nachschlag einen fehlenden Parameter nicht als null behandelt
    // (etwa durch eine Umstellung auf einen Vorgabewert).
    expect(extractGoogleClickIds("https://kunde.example/danke")).toEqual({});
  });
});

describe("extractGoogleClickIds: ANWESENHEIT entscheidet", () => {
  it("Parameter mit LEEREM Wert gilt als abwesend", () => {
    // ROT, wenn der Vergleich gegen die leere Zeichenkette entfaellt: dann stuende
    // `{ gclid: "" }` im Ergebnis, und eine Nutzlast entstuende ohne echte Kennung.
    expect(extractGoogleClickIds("https://kunde.example/d?gclid=")).toEqual({});
    expect(extractGoogleClickIds("https://kunde.example/d?gclid=&gbraid=")).toEqual({});
  });

  it("alle drei gleichzeitig -> alle drei im Ergebnis", () => {
    // ROT, wenn die Schleife nach dem ersten Treffer abbricht oder wenn ein Name aus
    // CLICK_ID_PARAMS herausfaellt. DIE ZUSAGE IST "MEHRERE GLEICHZEITIG SIND MOEGLICH" —
    // die Funktion waehlt nicht aus und ordnet nicht nach Rang.
    expect(
      extractGoogleClickIds("https://kunde.example/d?gclid=A&gbraid=B&wbraid=C"),
    ).toEqual({ gclid: "A", gbraid: "B", wbraid: "C" });
  });

  it("derselbe Parameter zweimal -> der ERSTE gewinnt", () => {
    // ROT, wenn jemand von `get` auf `getAll` umstellt oder eine eigene Zerlegung
    // baut, die den letzten Wert behaelt. GEPINNT, weil es eine Eigenschaft der
    // Plattform ist und keine Wahl der Datei — ein stiller Wechsel schickte sonst
    // einen anderen Wert an den Anbieter.
    expect(extractGoogleClickIds("https://kunde.example/d?gclid=ERSTER&gclid=ZWEITER"))
      .toEqual({ gclid: "ERSTER" });
  });
});

describe("extractGoogleClickIds: der Wert selbst", () => {
  it("prozentkodierter Wert kommt DEKODIERT heraus", () => {
    // ROT, wenn die Zerlegung am rohen Query-String vorbeigeht (etwa per split("&")),
    // ohne zu dekodieren: dann reiste "A%20B" statt "A B" an den Anbieter.
    expect(extractGoogleClickIds("https://kunde.example/d?gclid=A%20B%2FC"))
      .toEqual({ gclid: "A B/C" });
  });

  it("prueft die ANWESENHEIT, nie die FORM", () => {
    // ROT DURCH JEDE FORMPRUEFUNG — Mindestlaenge, Zeichenvorrat, Praefixmuster,
    // Plausibilitaet. Der eingesetzte Wert ist einer echten Kennung UNAEHNLICH und
    // faellt durch jede davon; die Auflage des Zuschnitts verlangt, dass er
    // UNVERAENDERT herauskommt.
    const url = `https://kunde.example/d?gclid=${encodeURIComponent(UNAEHNLICH)}`;
    expect(extractGoogleClickIds(url)).toEqual({ gclid: UNAEHNLICH });
  });

  it("ein GROSSGESCHRIEBENER Parametername wird NICHT gefunden", () => {
    // WAS DIESER TEST BEWACHT — UND WAS AUSDRUECKLICH NICHT: Er behauptet NICHT, dass
    // die schreibungssensitive Wahl RICHTIG ist. Sie ruht auf NICHTS GELESENEM: Zur
    // Schreibung des Parameters, den Google an die Ziel-URL haengt, gibt es weder einen
    // Befund noch einen Nicht-Treffer mit benannter Reichweite — der Gegenstand beider
    // Crawl-Laeufe war die Einlieferungs-Schnittstelle, nicht das Auto-Tagging
    // (docs/aktiver-stand.md, Vorrat, Eintrag 4).
    // ER BEWACHT, DASS EINE AENDERUNG DIESER WAHL SICHTBAR WIRD, sobald die erste
    // Messung sie beantwortet. DIESELBE BAUFORM WIE BEIM SCHLUESSELNAMEN-TEST in
    // google-payload.test.ts: ein gepinnter unbelegter Stand, damit seine Korrektur ein
    // Diff wird und keine stille Aenderung.
    // ROT, sobald der Vergleich schreibungsunempfindlich wird — etwa durch ein
    // toLowerCase auf den Parameternamen oder eine eigene Zerlegung, die nicht
    // unterscheidet. WER DAS TUT, TUT ES DANN SICHTBAR UND MIT EINER BEGRUENDUNG.
    expect(extractGoogleClickIds("https://kunde.example/d?GCLID=A")).toEqual({});
    expect(extractGoogleClickIds("https://kunde.example/d?Gclid=A&WBraid=C")).toEqual({});

    // GEGENPROBE IM SELBEN LAUF — ohne sie waere die Zusicherung oben trivial wahr,
    // etwa wenn die Extraktion aus einem ganz anderen Grund gar nichts mehr faende.
    expect(extractGoogleClickIds("https://kunde.example/d?gclid=A")).toEqual({ gclid: "A" });
  });

  it("setzt KEINEN Schluessel mit undefined", () => {
    // ROT, wenn die Funktion die drei Schluessel vorbelegt statt sie nur bei einem
    // Treffer zu setzen. "Nicht vorhanden" haette dann ZWEI Darstellungen, und die
    // Zaehlung ueber Object.keys in buildGoogleEvent zaehlte einen leeren Treffer mit.
    const result = extractGoogleClickIds("https://kunde.example/d?gbraid=B");
    expect(Object.keys(result)).toEqual(["gbraid"]);
    expect("gclid" in result).toBe(false);
    expect("wbraid" in result).toBe(false);
  });
});
