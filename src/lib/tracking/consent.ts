// GETEILTES CONSENT-GATE (Phase 11, zweite Scheibe). Erzeugt den Laufzeit-JS-Text,
// der die Einwilligung JE ZIEL beurteilt. Reiner String-Bau, kein DOM, kein React.
//
// WARUM EIGENE DATEI UND NICHT tracking/meta.ts: Jene Datei weist sich im Kopf als
// Meta-EIGENE, isolierte Einheit aus. Ein zielUEBERGREIFENDES Urteil gehoert dort
// nicht hin — und es haenge dort an der Pixel-ID, weil der Meta-Block NUR bei
// gesetzter Pixel-ID gesplicet wird. Genau diese Bindung loest die Scheibe auf.
//
// EIN URTEIL: Die Regel steht GENAU EINMAL, hier. Es gibt zwei EINFUEGESTELLEN
// (generate.ts fuer das Wiring-Dokument, pageview-emitter.ts fuer die publizierte
// Seite ohne Wiring), aber nur diese eine Implementierung.

// KENNUNG des Blocks. Ueber sie ist er auffindbar — fuer die zweite Einfuegestelle
// (Doppel-Einfuegung ausschliessen) UND fuer den Test-Helfer. Eine Auswahl ueber
// "das erste Script, das nicht der Datenblock ist" waere eine POSITIONS- statt
// Namensbindung; genau die fuehrt dieses Projekt als Fehlerklasse.
export const CONSENT_SCRIPT_ID = "pagesmith-consent";

// Der Ziel-Schluessel fuer Meta. Schreibweise aus dem Namensraum settings.pixels.
// <platform> (Entscheidung (a): snake_case, klein). BEWUSST NICHT aus lib/capi/
// token.ts importiert: jene Datei traegt `import "server-only"` und ist fuer
// erzeugten Browser-Code nicht erreichbar.
export const META_CONSENT_TARGET = "meta";

// Der Ziel-Schluessel fuer UNSERE EIGENE Auswertung (Phase 11, dritte Scheibe).
//
// EIGENE BEGRUENDUNGSZEILE, bewusst NICHT unter den Kommentar darueber gehaengt:
// Jener begruendet die Schreibweise mit dem PLATTFORM-Namensraum settings.pixels.
// <platform> — und `analytics` ist KEINE Plattform, sondern eine KATEGORIE. Die
// Begruendung dort traegt fuer ihn also nicht.
//
// DASS DER NAMENSRAUM KATEGORIE UND ANBIETER MISCHT, IST ABSICHT (Zuschnitt (b)):
// pro Anbieter ist FEINER als pro Kategorie, und feiner ist fuer dieses Produkt
// richtig — der Betreiber soll Meta erlauben und Pinterest verbieten koennen. Die
// Mischung laesst sich auf ZWEI Weisen falsch "reparieren": Wer auf Kategorien
// harmonisiert, verliert die Anbieter-Granularitaet; wer `marketing` NEBEN `meta`
// stellt, erzeugt zwei Urteile fuer dieselbe Sache.
//
// EINBAHNSTRASSE (Zuschnitt (a)): Ab dieser Scheibe steht der Name in
// AUSGELIEFERTEM Code, und Betreiber tragen ihn in ihre eigene Konfiguration ein.
// Eine spaetere Umbenennung passt nicht mehr zu ihrem Schluessel — und weil das
// Gate fail-closed ist, schaltet sie deren Statistik AB, ohne sichtbaren Fehler.
//
// SCHREIBWEISE snake_case/klein gilt fuer ihn genauso; sie folgt daraus, dass der
// Betreiber diese Schluessel in einem JS-Objektliteral schreibt. Und der ORT ist
// aus demselben Grund dieser wie bei META_CONSENT_TARGET: keine server-only-Datei,
// damit der Wert in erzeugten Browser-Code eingesetzt werden kann.
export const ANALYTICS_CONSENT_TARGET = "analytics";

/**
 * Der Laufzeit-Text des Gates. Setzt window.__psConsent(target) -> boolean.
 *
 * DIE REGEL, wie sie in docs/aktiver-stand.md unter "DIE AUSWERTUNGSREGEL" steht —
 * sie ist dort ABSCHLIESSEND, hier wird nichts ergaenzt. Die Trennlinie ist NICHT
 * die Datenform, sondern eine einzige Frage: HAT SICH DER BETREIBER UEBERHAUPT
 * GEAEUSSERT?
 *  - nichts gesetzt            -> ERLAUBT (er hat nie entschieden)
 *  - Funktion                  -> aufrufen; ein Wurf -> VERBOTEN
 *  - kein Funktionszwang       -> ein DIREKT gesetzter Wert wird DIREKT ausgewertet
 *  - Wert ist GENAU true       -> ERLAUBT
 *  - Wert ist ein Objekt       -> der Ziel-Schluessel muss GENAU true sein
 *  - alles uebrige             -> VERBOTEN
 *
 * GENAU true STATT TRUTHY, auch bei Schluesselwerten: Truthy wieder zuzulassen
 * waere die WIEDERHOLUNG genau des Fehlers, der diese Scheibe ausgeloest hat (die
 * heutige Auswertung macht per `!!` aus JEDEM Objekt ein "erlaubt").
 *
 * FAIL-CLOSED ist Absicht, nicht Haerte: Ein Datenschutz-Gate blockiert bei
 * Fehlkonfiguration, statt mutmasslich durchzulassen. Fail-closed heisst, der
 * Betreiber MERKT es — sein Tracking hoert auf. Fail-open heisst, niemand merkt es.
 *
 * SERIALISIERUNGSSICHER: enthaelt kein literales </script>.
 */
export function buildConsentRuntime(): string {
  return `window.__psConsent = function (t) {
  var v = window.pagesmithConsent;
  if (v === undefined) return true;
  if (typeof v === "function") {
    try { v = v(); } catch (e) { return false; }
  }
  if (v === true) return true;
  if (v !== null && typeof v === "object") return v[t] === true;
  return false;
};`;
}

/**
 * DIE ZWEITE, GEZIELTE FUNKTION (Phase 11, neunte Scheibe, HAELFTE B).
 * Setzt window.__psConsentAll(schluessel[]) -> { schluessel: boolean }.
 *
 * WARUM SIE UEBERHAUPT EXISTIERT — EINE ZIEHUNG, N ANTWORTEN: Der Betreiber-Hook
 * ist fremder Code und zu nichts verpflichtet. Wer ihn je Ziel einmal fragt, kann
 * N verschiedene Antworten bekommen und traegt dann einen Draht, der sich selbst
 * widerspricht. Diese Funktion zieht GENAU EINMAL und beantwortet daraus alle
 * Schluessel. Die Widerspruchsfreiheit ist damit STRUKTURELL, nicht wahrscheinlich.
 *
 * DIE ZWEIGE SPIEGELN buildConsentRuntime EINS ZU EINS — gleiche Reihenfolge,
 * gleiche Bedingungen, gleiche Strenge:
 *   nichts gesetzt -> alle erlaubt · Funktion -> aufrufen, Wurf -> alle verboten ·
 *   genau true -> alle erlaubt · Objekt -> je Schluessel GENAU true · sonst verboten.
 * DIE REIHENFOLGE IST TRAGEND, nicht Geschmack: Die undefined-Pruefung steht VOR
 * dem Funktionsaufruf. Ein Hook, der undefined ZURUECKGIBT, ist deshalb VERBOTEN,
 * waehrend ein NIE GESETZTER Hook erlaubt ist. Wer die beiden zusammenzieht, kippt
 * genau diesen Unterschied.
 *
 * ZWEI IMPLEMENTIERUNGEN, EIN URTEIL — und die Naht wird von einem TEST gehalten,
 * nicht von diesem Kommentar: consent.test.ts prueft fuer JEDE Rueckgabeform, dass
 * __psConsentAll(ts)[t] === __psConsent(t) gilt. Ohne diesen Test waere die
 * Verdopplung genau die stille Divergenz, gegen die die zweite Scheibe stand.
 *
 * DIE DOPPELTE ZIEHUNGS-ZEILE (`var v = window.pagesmithConsent`) steht bewusst
 * ein zweites Mal hier und NICHT in einem geteilten Helfer: Ein Helfer haette den
 * Wortlaut von __psConsent veraendert, und dessen Byte-Gleichheit ist der Beweis
 * dieser Haelfte. GEMELDET ALS BACKLOG-KANDIDAT, nicht geloest.
 *
 * SERIALISIERUNGSSICHER: enthaelt kein literales </script>.
 */
export function buildConsentAllRuntime(): string {
  return `window.__psConsentAll = function (ts) {
  var v = window.pagesmithConsent;
  var yes = v === undefined;
  if (!yes && typeof v === "function") {
    try { v = v(); } catch (e) { v = false; }
  }
  if (!yes && v === true) yes = true;
  var obj = !yes && v !== null && typeof v === "object" ? v : null;
  var out = {};
  for (var i = 0; i < ts.length; i++) {
    out[ts[i]] = yes ? true : obj ? obj[ts[i]] === true : false;
  }
  return out;
};`;
}

/**
 * BEIDE Laufzeit-Funktionen, in dieser Reihenfolge. EINE Quelle fuer die zwei
 * Einfuegestellen (generate.ts und buildConsentScript) — stuenden dort zwei
 * Verkettungen, koennte eine der beiden eine Funktion vergessen, und der Ausfall
 * traefe genau die Seiten OHNE Wiring.
 *
 * DER PLURAL IM NAMEN IST DIE WARNUNG: Wer hier buildConsentRuntime (Singular)
 * einsetzt, liefert Seiten aus, auf denen __psConsentAll fehlt — die Feuer-Funktion
 * kehrt dann an ihrer Existenzpruefung um, fail-closed und lautlos.
 */
export function buildConsentRuntimes(): string {
  return `${buildConsentRuntime()}
${buildConsentAllRuntime()}`;
}

/** Der fertige Script-Block MIT Kennung — fuer die String-Einfuegestelle. */
export function buildConsentScript(): string {
  return `<script id="${CONSENT_SCRIPT_ID}">
${buildConsentRuntimes()}
</script>`;
}

/**
 * Traegt das Dokument den Block bereits? PRUEFBAR statt auf Aufrufreihenfolge
 * verlassen: die zweite Einfuegestelle fragt hier, bevor sie einfuegt — so gibt es
 * EIN BLOCK JE DOKUMENT, unabhaengig davon, wer zuerst laeuft.
 */
export function hasConsentScript(html: string): boolean {
  return html.includes(`id="${CONSENT_SCRIPT_ID}"`);
}
