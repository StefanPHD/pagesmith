// DIE RUECKKEHR AUS DEM AUTORISIERUNGS-FLUSS — WELCHES PROJEKT, UND ZEIGT DIE KARTE DEN
// ERGEBNISCODE? (mitgereiste Fix-Scheibe zur Phase 11.2).
//
// WARUM ES DIESE DATEI GIBT UND DIE ENTSCHEIDUNG NICHT IN page.tsx STEHT: Sie hat VIER
// Verzweigungen, und eine Server-Komponente ist im Bestand von KEINEM Test erreichbar
// (GEMESSEN am Repo, CC, 2026-08-31: keine Testdatei importiert src/app/page.tsx;
// Positivkontrolle — Tests fuer andere app/-Dateien gibt es sehr wohl). Ein Schutz ohne
// Test waere ein Nebeneffekt, und "NUR EIN TEST IST EIN WAECHTER"
// (docs/immer-beachten.md).
//
// DER LADER WIRD HEREINGEREICHT, NICHT IMPORTIERT. Zwei Gruende, und der zweite ist der
// wichtigere: Der Test braucht keine Datenbank — und das EIGENTUMS-GATE bleibt dort, wo
// es ist. Diese Datei prueft KEINE Berechtigung und will es nicht: Sie waehlt
// ausschliesslich unter dem, was der Lader ohnehin herausgibt, und der filtert auf
// user_id und steht unter RLS.
//
// LADEKLASSE, ehrlich benannt: Diese Datei traegt selbst KEINE Direktive, erbt aber ueber
// isProjectIdShape die Marke `server-only` aus lib/oauth/google-authorize.ts. Das ist
// unproblematisch, weil ihr einziger Konsument eine SERVER-Komponente ist (src/app/page.tsx).
// Wer sie je aus Client-Code braucht, verschiebt NICHT diese Datei, sondern reicht das
// Form-Praedikat wie den Lader herein.

import { isProjectIdShape } from "@/lib/oauth/google-authorize";

/**
 * Der Name des Projekt-Parameters in der Adresse.
 *
 * ER STEHT HIER UND NICHT IN page.tsx, anders als der Ergebnis-Parameter: Jener ist der
 * URL-Vertrag der Callback-Route und gehoert dorthin, wo er gelesen wird. Dieser hier
 * gehoert zur ENTSCHEIDUNG, und die liegt in dieser Datei — die Callback-Route setzt ihn
 * ueber ihre eigene Konstante, damit keine Seite die andere importieren muss.
 */
export const PROJECT_PARAM = "project";

/**
 * Was aus der Rueckkehr folgt.
 *
 * `project` ist das GELADENE Projekt (oder null, wenn der Nutzer gar keines hat) —
 * nicht eine Kennung. Der Aufrufer soll nicht ein zweites Mal laden muessen.
 */
export type ConnectReturn<P> = {
  project: P | null;
  showOutcome: boolean;
};

/**
 * Entscheidet, WELCHES Projekt geladen wird und OB der Ergebniscode gezeigt werden darf.
 *
 * VIER FAELLE, und sie sind einzeln zu unterscheiden — das ist die tragende Eigenschaft
 * dieser Funktion und der Grund fuer ihren Zuschnitt:
 *
 *   (a) KEIN Parameter          -> Rueckfall ("zuletzt bearbeitet"), Meldung ERLAUBT.
 *   (b) da, aber formwidrig     -> Rueckfall, Meldung UNTERDRUECKT.
 *   (c) da, formgueltig, laedt nicht -> Rueckfall, Meldung UNTERDRUECKT.
 *   (d) laedt                   -> DIESES Projekt, Meldung ERLAUBT.
 *
 * WARUM (b) UND (c) DIE MELDUNG UNTERDRUECKEN — es ist der Grundsatz der Scheibe selbst:
 * Die Auskunft gehoert zu EINEM Projekt. Loest die Kennung sich nicht auf, gibt es kein
 * Projekt, an dem sie richtig stuende; dann ist "gar nicht" die einzige verbleibende
 * richtige Anzeige. Ohne diese Unterdrueckung REPRODUZIERTE der Rueckfall genau den
 * Fehler, gegen den die Scheibe gebaut ist: der Betreiber stuende in A und saehe dort den
 * Ergebniscode eines Vorgangs aus B.
 * DER PREIS IST BENANNT UND KLEIN: Im seltenen Fall — ein waehrend des Flusses geloeschtes
 * Projekt — verliert der Betreiber eine Auskunft. Die Alternative ist eine FALSCH
 * VERORTETE, und die ist schlechter als gar keine, weil er ihr glaubt.
 *
 * DIE GRENZE IST SCHARF UND WIRD BEIM AENDERN LEICHT ZU WEIT GEZOGEN: Unterdrueckt wird
 * NUR, wenn eine Kennung DA WAR und nicht aufloeste. Kommt GAR KEINE (die Ausgaenge
 * `denied` und `no_state` der Callback-Route tragen keine), ist es Fall (a) — die Meldung
 * WIRD gezeigt, am Projekt, das ohnehin geladen wird. "Keine Kennung" und "unaufloesbare
 * Kennung" sind zwei verschiedene Zustaende; wer sie zusammenzieht, unterdrueckt die
 * Meldung in genau dem Fall, der heute als einziger eintritt.
 *
 * EIN ARRAY (?project=a&project=b) IST FALL (b), NICHT FALL (a) — eine Kennung WAR da,
 * sie ist nur nicht eindeutig.
 * DIE REGEL DAHINTER IST EINE EINZIGE, und sie gilt fuer BEIDE Parameter: Was der Wert
 * nicht eindeutig hergibt, wird nicht behauptet. Beim Ergebniscode fuehrt ein Array
 * deshalb zu keiner Meldung (page.tsx nimmt nur einen nicht-leeren string), hier fuehrt
 * es ueber die Unterdrueckung ebenfalls zu keiner. Nur der WEG dorthin unterscheidet
 * sich, weil der eine Parameter die AUSSAGE ist und der andere ihren ORT. Wer daraus eine
 * Inkonsistenz liest, harmonisiert etwas, das gar nicht auseinanderlaeuft.
 *
 * SIE PRUEFT DIE FORM, NIE DIE EXISTENZ — und die Kennung ist CLIENT-KONTROLLIERTE
 * EINGABE: sie kommt aus einer Adresse, die der Nutzer beliebig aendern kann. Die
 * Formpruefung steht deshalb VOR dem Lader; ohne sie erzeugte eine verbogene Kennung in
 * der Datenbank einen Typfehler, und der waere von einem echten Fehler nicht zu
 * unterscheiden (dieselbe Begruendung wie in api/oauth/google/start/route.ts).
 *
 * SIE IST NIE AUTORITAET: Sie waehlt ausschliesslich unter Projekten, die dem Nutzer
 * ohnehin gehoeren. Das Gate liegt im Lader und wird hier nicht wiederholt.
 */
export async function resolveConnectReturn<P>(input: {
  /** Der Rohwert aus searchParams — string, string[] oder undefined. */
  rawProject: unknown;
  /** Liegt ueberhaupt ein anzeigbarer Ergebniscode vor? */
  hasOutcome: boolean;
  /** Der Lader. Ohne Argument: der Rueckfall. Mit Argument: genau dieses Projekt. */
  load: (id?: string) => Promise<P | null>;
}): Promise<ConnectReturn<P>> {
  const { rawProject, hasOutcome, load } = input;

  // (a) GAR KEINE KENNUNG. `undefined` heisst hier "der Parameter stand nicht in der
  //     Adresse" — jeder VORHANDENE Parameter traegt einen Wert, und sei er leer.
  if (rawProject === undefined) {
    return { project: await load(), showOutcome: hasOutcome };
  }

  // (b) DA, ABER NICHT BRAUCHBAR: kein string (Array), leer, oder formwidrig.
  //     DER LADER WIRD MIT DIESER KENNUNG GAR NICHT ERST GERUFEN.
  if (typeof rawProject !== "string" || !isProjectIdShape(rawProject)) {
    return { project: await load(), showOutcome: false };
  }

  // (d)/(c) — der Lader entscheidet. Er liefert null bei "nicht gefunden", bei "fremd"
  //     UND bei einem DB-Fehler; die drei sind an seiner Rueckgabe nicht zu trennen
  //     (GEMESSEN am Code, CC, 2026-08-31). Fuer diese Entscheidung ist das folgenlos —
  //     alle drei bekommen dieselbe Behandlung —, aber es ist der Grund, warum hier
  //     KEINE Fehlermeldung unterschieden wird.
  const gewaehlt = await load(rawProject);
  if (gewaehlt !== null) {
    return { project: gewaehlt, showOutcome: hasOutcome };
  }

  // (c) DIE KENNUNG LOESTE NICHT AUF. Das PROJEKT faellt zurueck, die MELDUNG nicht.
  return { project: await load(), showOutcome: false };
}
