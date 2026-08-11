/**
 * DIE FORMBASIERTE SCHWAERZUNG — DAS GETEILTE WERKZEUG DER FAN-OUT-ADAPTER.
 *
 * WAS SIE LEISTET: KEINE LANGE UNDURCHSICHTIGE ZEICHENFOLGE VERLAESST DEN AUFRUFER.
 * Das ist eine Regel ueber die AUSGABE, nicht ueber das WISSEN — und genau darin
 * liegt ihr Wert: Sie faengt auch TEIL-Rueckspiegelungen und Geheimnisse, die wir gar
 * nicht als solche kennen. Ein Bereiniger, der das Geheimnis kennen MUESSTE, um es zu
 * entfernen, waere selbst eine Stelle, an der es verlorengehen kann.
 *
 * SIE WIRD VON MEHREREN ADAPTERN BENUTZT. Heute vom Meta-Forward; jeder weitere
 * Adapter, der Fremdtext protokolliert, nimmt DIESES Werkzeug und schreibt sich kein
 * eigenes. Genau dafuer liegt sie hier.
 *
 * DIE FELD-POLITIK GEHOERT NICHT HIERHER, und das ist die tragende Grenze dieser
 * Datei: WELCHES Feld geschwaerzt wird, welches nur gekappt, welches eine benannte
 * AUSNAHME bekommt und welcher Ersatzwert fuer fehlende Werte steht — all das ist je
 * Adapter VERSCHIEDEN und bleibt beim Adapter. Geteilt wird das WERKZEUG, nicht die
 * Politik. Wer hier eine Feld-Entscheidung ergaenzt, macht die Politik des einen
 * Adapters zur Eigenschaft aller anderen.
 *
 * SIE KAPPT NICHT. Der Deckel ist Politik und liegt beim Aufrufer. Diese Funktion
 * kennt keine Laengengrenze — und genau das ist die Voraussetzung dafuer, dass die
 * Reihenfolge "erst schwaerzen, dann kappen" beim Aufrufer ueberhaupt wirken kann.
 *
 * SIE NORMALISIERT NICHT. Sie nimmt einen String und gibt einen String. Nicht-Strings,
 * fehlende und leere Werte behandelt der AUFRUFER, bevor er hier hereinkommt.
 * DARAUS FOLGT DIE EINZIGE VORBEDINGUNG, und sie ist scharf: WIRFT NIE — VORAUSGESETZT,
 * der Aufrufer uebergibt wirklich einen String. Wer ihr etwas anderes reicht, bekommt
 * einen Wurf; auf dem Ingest-Pfad braeche das die garantierte leere 204. Der Typ sagt
 * es, die Charakterisierung in redact.test.ts haelt es fest.
 *
 * DIE GRENZE GEHOERT IN DENSELBEN KOMMENTAR: EIN KURZES GEHEIMNIS GINGE DURCH. Wir
 * haben heute keines; bekaemen wir eines, ist diese Regel neu zu entscheiden.
 *
 * KEIN `import "server-only"` — nach dem Vorbild von lib/errors.ts: Die Funktion
 * beruehrt keine Secrets, kennt kein HTTP und ist runtime-neutral. Eine
 * server-only-Fessel wuerde sie ohne Gegenwert fuer Client-Code sperren. Die Richtung
 * ist damit festgelegt: server-only-Dateien duerfen DIESE hier importieren, NIE
 * umgekehrt.
 *
 * DAS ZWEITE ZIEL BENUTZT SIE NICHT — und das ist Absicht, kein Rest:
 * `sanitizeProviderText` in capi/pinterest-forward.ts ist dieselbe Idee in einer
 * EIGENEN Fassung. Sein Umzug hierher waere heute NICHT beweisbar wirkungslos: seine
 * sechs Achsen (Reihenfolge, Mindestlaenge, Nicht-Strings, Leerwerte, Kappung,
 * Globalitaet) sind von keinem Test gedeckt, und ein Umzug ohne Charakterisierung
 * waere ein unbeobachteter Eingriff in einen fremden, laufenden Pfad. WANN ES
 * AUFGELOEST WIRD: sobald jene sechs Achsen drueben festgenagelt sind. Bis dahin
 * bleibt jene Fassung stehen, und diese hier gilt fuer alle anderen.
 * ES IST WEITER KEIN TEST, DER DIE UEBEREINSTIMMUNG DER BEIDEN SICHERT — wer eine
 * Seite aendert, macht nichts rot. Das ist der bewusst getragene Preis.
 *
 * ZUM PRAEFIX DER BEIDEN KONSTANTEN: Sie heissen META_*, weil ihre Deklaration aus
 * capi/meta-forward.ts ZEICHENGLEICH hierher verschoben wurde — der Rumpf der Funktion
 * nennt sie beim Namen, und die Zeichengleichheit ist der Beweis, dass der Umzug das
 * Verhalten nicht aendern KONNTE. Das Praefix ist damit historisch, nicht inhaltlich;
 * eine Umbenennung ist ein eigener, vom Compiler vollstaendig gedeckter Schritt.
 */

/**
 * DIE UNTERGRENZE DER SCHWAERZUNG. Zusammenhaengende token-artige Zeichenfolgen ab
 * dieser Laenge werden ersetzt. Woerter einer Fehlermeldung liegen darunter,
 * Zugangsdaten darueber.
 */
export const META_OPAQUE_MIN = 20;

export const META_REDACTED = "<redacted>";

export function redactOpaque(text: string): string {
  return text.replace(
    new RegExp(`[A-Za-z0-9_-]{${META_OPAQUE_MIN},}`, "g"),
    META_REDACTED,
  );
}
