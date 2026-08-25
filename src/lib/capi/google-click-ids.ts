// DIE KLICK-KENNUNGEN AUS EINER URL LOESEN (Phase 11.2, Scheibe 11.2a).
//
// WAS DIESE DATEI IST: EINE reine Funktion ueber EINER Zeichenkette. Kein Netz, kein
// DOM, keine Datenbank, kein Zustand. Mehr steht hier nicht.
//
// SIE HAT IM PRODUKTIVCODE HEUTE KEINEN AUFRUFER, und das ist der Zuschnitt und kein
// Versehen: 'google' steht nicht in TRACKING_TARGETS (lib/settings.ts), es gibt also
// weder einen Empfaenger noch einen Eintrag im Fan-Out. Wer hier einen Aufrufer
// ergaenzt, baut nicht mehr diese Scheibe — s. die tragende Invariante des
// Zuschnitts in docs/aktiver-stand.md.
//
// ---------------------------------------------------------------------------
// DER KOPFSATZ ZUR ABLAGE — WOERTLICH aus docs/aktiver-stand.md, Abschnitt
// "## Scheibe 11.2a", Unterabschnitt "Die Ablage-Entscheidung". Er steht ZEICHENGLEICH
// auch in google-payload.ts; wer ihn hier aendert, aendert eine Entscheidung:
//
//   Beide Dateien sind REIN — KEIN import "server-only". Grund: der spätere
//   google-forward.ts ist server-only und muss sie importieren; die Richtung
//   server-only -> rein gilt und nicht umgekehrt. Sie sind die ersten reinen Dateien in
//   src/lib/capi/. Das ist Absicht und kein zu heilender Ausreisser. Ohne diesen
//   Kopfsatz fügt die nächste Aufräumrunde server-only hinzu und sperrt sie zu.
//
// ---------------------------------------------------------------------------
// DIE TRAGENDE AUFLAGE DIESER DATEI — ebenfalls WOERTLICH aus jenem Zuschnitt,
// Unterabschnitt "Die Auflage aus der Messlücke":
//
//   DIE EXTRAKTION PRÜFT DIE ANWESENHEIT EINES WERTS, NIE SEINE FORM. Keine
//   Längenprüfung, keine Zeichensatzprüfung, kein Präfixmuster, keine Plausibilität.
//
// DER GRUND, ohne den die naechste Politur eine Formpruefung als "Haertung"
// nachtraegt: GEMESSEN ist ein SELBSTGESETZTER Testwert (Vermerk 1 in
// docs/aktiver-stand.md); ueber die Form einer ECHTEN gclid ist NICHTS gelesen und
// NICHTS gemessen. Jede Formpruefung waere am Testwert gruen und im Echtfall ein
// RIEGEL — und der Riegel waere still: kein Fehler, keine Logzeile, nur eine
// Conversion, die nicht ankommt.

/**
 * Die drei Klick-Kennungen, wie sie der Anbieter im Feld `adIdentifiers` fuehrt.
 *
 * ALLE DREI SIND OPTIONAL, UND MEHRERE GLEICHZEITIG SIND MOEGLICH. Ein Schluessel ist
 * NUR gesetzt, wenn er gefunden wurde — es gibt KEINEN Schluessel mit dem Wert
 * `undefined`. "Nicht vorhanden" hat damit genau EINE Darstellung, und eine Zaehlung
 * ueber Object.keys ist verlaesslich.
 *
 * SIE IST KEIN ALIAS AUF EIN FREMDES MODELL: Googles AdIdentifiers kennt ZEHN Felder
 * (GELESEN, docs/ziel-befunde.md, Google-Abschnitt, Teil (w)/E1), diese Form kennt
 * drei. Ein Alias, der heute gleich ist und morgen nicht, waere eine zweite Wahrheit,
 * die neben ihrem Original altert.
 */
export type GoogleClickIds = {
  gclid?: string;
  gbraid?: string;
  wbraid?: string;
};

/**
 * Die gesuchten Parameternamen, exakt kleingeschrieben.
 *
 * SCHREIBUNGSSENSITIV, UND DAS IST EINE ENTSCHEIDUNG OHNE BELEG: Zur Schreibung des
 * Parameters, den Google an die Ziel-URL haengt, ist NICHTS gelesen — der Gegenstand
 * beider Crawl-Laeufe war die EINLIEFERUNGS-Schnittstelle, nicht das Auto-Tagging.
 * Gewaehlt ist die engere Variante, weil ihr Fehlschlag SICHTBAR ist (eine fehlende
 * Conversion), waehrend ein schreibungsunempfindlicher Vergleich einen fremden,
 * zufaellig gleichnamigen Parameter aufgreifen koennte — und ein falscher Wert als
 * Kennung wird vom Anbieter NICHT als Fehler gemeldet.
 * DER OFFENE PUNKT DAZU steht in docs/aktiver-stand.md, Vorrat, Eintrag 4. Die erste
 * Messung nimmt ihn mit.
 */
const CLICK_ID_PARAMS = ["gclid", "gbraid", "wbraid"] as const;

/**
 * Loest die Klick-Kennungen aus einer Zeichenkette, die eine URL sein kann.
 *
 * `unknown` UND NICHT `string`, und das ist kein Ziererei: Die spaetere Quelle ist
 * `body.eventSourceUrl`, und CapiRequestBody (capi/ingest.ts) typisiert JEDES
 * Rumpf-Feld als `unknown`. Naehme diese Funktion `string`, muesste jeder Aufrufer
 * vorher eine Zusicherung schreiben — und eine Zusicherung behauptet, was hier
 * ohnehin geprueft wird.
 *
 * SIE WIRFT NIE. Die Auflage ist dieselbe wie am Typ `Forwarder` (capi/ingest.ts) und
 * traegt dasselbe: das 204-Containment des Ingest-Pfades. Ein Wurf hier verschoebe die
 * Pflicht nur an den Aufrufer. Erfuellt ist sie strukturell — ein typeof-Vergleich,
 * ein try/catch um den EINZIGEN werfenden Ausdruck, und drei Nachschlaege.
 *
 * ABSOLUTE URLS: `new URL(x)` OHNE Basis verlangt eine absolute Adresse; ein relativer
 * Pfad wirft und faellt damit in den Nicht-Treffer-Zweig. Das ist gewollt — die
 * gemessene Quelle ist `location.href` und damit immer absolut (Vermerk 1).
 *
 * @returns Nur die GEFUNDENEN Kennungen. Nichts gefunden -> `{}`, nie `null`.
 */
export function extractGoogleClickIds(url: unknown): GoogleClickIds {
  if (typeof url !== "string") return {};

  let params: URLSearchParams;
  try {
    params = new URL(url).searchParams;
  } catch {
    // Kaputte oder relative Adresse. KEIN Wurf nach aussen, kein Log: Diese Funktion
    // beurteilt keine Eingabe, sie findet etwas oder eben nicht.
    return {};
  }

  const found: GoogleClickIds = {};
  for (const name of CLICK_ID_PARAMS) {
    // `get` liefert das ERSTE Vorkommen, wenn ein Parameter mehrfach auftritt. Das ist
    // eine Eigenschaft der Plattform und keine Wahl dieser Datei — sie ist deshalb in
    // google-click-ids.test.ts GEPINNT, damit ein spaeterer Umbau auf eine eigene
    // Zerlegung sie nicht still aendert.
    const value = params.get(name);

    // ANWESENHEIT, NICHT FORM: Verworfen wird AUSSCHLIESSLICH die exakt leere
    // Zeichenkette. KEIN Trim — ein Trim waere bereits ein Form-Urteil, und `?gclid=%20`
    // zaehlt deshalb bewusst als VORHANDEN. Wer hier trimmt, weicht die Auflage oben auf.
    if (value !== null && value !== "") found[name] = value;
  }
  return found;
}
