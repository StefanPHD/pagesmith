// DIE EINBETTUNG EINES WERTES IN DEN ROHTEXT EINES <script>-ELEMENTS (Phase 11.13,
// Scheibe 11.13d; bindende Entscheidung P11.13-25).
//
// SIE IST REIN: kein "use server", kein `import "server-only"`, keine Datenbank, kein
// Netzwerk, kein DOM. Die Richtung bleibt server-only -> rein, nie umgekehrt; eine
// server-only-Datei waere aus erzeugtem Browser-Code nicht erreichbar, und diese Funktion
// wird aus BEIDEN Richtungen gerufen — aus dem Client-Pfad (tracking/meta.ts ueber
// generateFunctional) und aus dem Server-Pfad (die vier Dialog-Erzeuger).
//
// SIE NIMMT EIN ARGUMENT UND TRAEGT KEINEN SCHALTER. Ein Schalter "mit/ohne Maskierung"
// waere die zweite Tuer neben dem Tor: Wer ihn setzen kann, kann ihn falsch setzen, und
// der Aufrufer muesste bei jeder Einsetzstelle entscheiden, was er ohnehin nicht
// entscheiden soll.

/**
 * Serialisiert `value` fuer den ROHTEXT eines <script>-Elements: JSON.stringify, danach
 * jedes `<` als Unicode-Escape.
 *
 * WARUM DIE ZWEITE HAELFTE — GEMESSEN, NICHT VORSORGLICH (VERMERK P11.13-7 der Phase
 * 11.13, CC, 2026-09-18, Chromium ueber file://):
 * - Ein `</script>` in einem eingebetteten Wert VERLAESST DEN BLOCK. Das folgende Markup
 *   wird geparst, der Rest des Codes steht als sichtbarer Text auf der Seite, und das
 *   eigene Skript laeuft nicht mehr.
 * - Mit einer Nutzlast OHNE Anfuehrungszeichen FUEHRT FREMDER CODE AUS. Mit
 *   Anfuehrungszeichen bricht sie ebenfalls aus, nur zuendet der Handler nicht, weil
 *   JSON.stringify die inneren `"` maskiert — DAS IST EIN ZUFALL DER ZEICHENFOLGE UND
 *   KEIN SCHUTZ.
 * - `<!--<script>` versetzt den Parser in den Zustand "script data escaped" und
 *   VERSCHLUCKT DAS NAECHSTE SCRIPT-ELEMENT — ohne einen einzigen Fehler, ohne
 *   Konsoleneintrag. Das ist die gefaehrlichste der drei Gestalten, weil nichts sie meldet.
 * - Weder JSON.stringify noch der HTML-Serialisierer maskieren `<`. Beides gemessen, je
 *   mit Gegenprobe.
 *
 * DAS VORBILD IST generateFunctional IN lib/generate.ts. Dort steht seit jeher
 * `JSON.stringify(table).replace(/</g, "\\u003c")` fuer den Mapping-Datenblock — bis zu
 * dieser Scheibe das EINZIGE Vorkommen der richtigen Bauform im ganzen Repo, ohne Namen
 * und ohne zweiten Aufrufer. Jene Stelle bleibt UNBERUEHRT: sie maskiert bereits richtig,
 * sie liegt in einer Kern-Datei, und ein Eingriff ohne Gewinn ist ein Risiko ohne
 * Gegenwert.
 *
 * DIE KONTEXT-GRENZE — DIE WICHTIGSTE ZEILE DIESES KOMMENTARS: DAS ESCAPE TRAEGT NUR IM
 * SCRIPT-ROHTEXT. In einem HTML-ATTRIBUT, in einem HTML-TEXTKNOTEN oder in einer URL ist
 * es KEINE Maskierung, sondern sechs harmlose Zeichen. Wer diese Funktion dort benutzt,
 * hat eine Maskierung, die nicht maskiert — UND SIE SIEHT AUS WIE EINE. Jener Kontext
 * braucht seine EIGENE Maskierung; hier ist der Helfer FALSCH, nicht bloss unzureichend.
 * HEUTE GIBT ES FUENF EINBETTUNGEN AUSSERHALB DES SCRIPT-ROHTEXTS, und keine davon ist
 * ein Textplatz: die drei Script-Kennungen im Start-Tag (CONSENT_BAR_SCRIPT_ID,
 * CONSENT_MODAL_SCRIPT_ID, CONSENT_REVOKE_SCRIPT_ID) und die zwei globalen Namen
 * (CONSENT_STORE_API, CONSENT_REVOKE_API). Alle fuenf sind Repo-Konstanten und gehen
 * nicht ueber JSON.stringify.
 *
 * DIE KONVENTION (Entscheidung P11.13-25, Stufe (2)) — SIE STEHT HIER UND NUR HIER, WEIL
 * SIE KEIN GATE HAT: In den VIER Dialog-Erzeugern (tracking/consent-choice.ts,
 * consent-bar.ts, consent-modal.ts, consent-revoke.ts) laeuft JEDE Einbettung ueber diese
 * Funktion, AUCH die einer Konstanten. Der Grund ist nicht Sicherheit, sondern Lesbarkeit
 * am Ort der Handlung: Stuenden dort zwei Bauformen nebeneinander, muesste die naechste
 * Runde bei jeder Einsetzstelle entscheiden, welche gilt — und sie entschiede ohne
 * Kriterium. Eine Handschrift ist billiger als eine Fallunterscheidung.
 * EIN QUELLTEXT-WAECHTER SICHERT DAS AUSDRUECKLICH NICHT AB (Entscheidung P11.13-30): Er
 * saehe Zeichen und nicht Bedeutung, traefe die Prosa dieser Kommentare und bestimmte
 * damit die Gestalt des Geprueften. Gesichert wird am ERGEBNIS — je Betreiber-Achse ein
 * Waechter mit der feindlichen Nutzlast durch die ECHTE Einsetzstelle.
 *
 * WER AUSSERHALB DER VIER DATEIEN ROH EINBETTEN DARF: Repo-Konstanten und
 * server-vergebene Werte (tracking/consent-store.ts, consent-setter.ts,
 * analytics/pageview-emitter.ts und alle Einbettungen in tracking/meta.ts AUSSER der
 * Pixel-ID). Ihre Byte-Zusage ist "enthaelt kein `<`", und das ist eine Aussage ueber den
 * WERT, nicht ueber seine Behandlung. Wer einen von ihnen in eine BETREIBER-EINGABE
 * verwandelt, hebt die Freistellung in derselben Runde auf.
 *
 * BYTE-GLEICHHEIT FUER JEDEN WERT OHNE `<`: Die Ausgabe ist dann zeichengleich mit
 * JSON.stringify. GEMESSEN am Bestand (CC, 2026-09-18): 16 Konstanten und
 * Schluessellisten, vier Stylesheets und sechzehn ganze Blocktexte tragen KEIN `<` —
 * Treffer gesamt 0, mit Positivkontrolle.
 */
export function embedInScript(value: unknown): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}
