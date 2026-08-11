// ZIEL-WISSEN FUER DIE EINWILLIGUNG (Phase 11, neunte Scheibe, Haelfte A).
// ZWEI Zuordnungen je Ziel, beide REINE DATEN — keine Logik, kein DOM, kein
// Netzwerk, keine Datenbank. Die REGEL, die sie benutzt, steht im Handler
// (capi/ingest.ts, allowedTargets); hier stehen nur ihre Eingaben.
//
// WARUM EINE EIGENE DATEI — drei Orte kamen in Frage und keiner taugte:
// - NICHT settings.ts: dort liegt der Einstellungs-Blob des KUNDEN. Beides hier
//   ist eine Struktur-Aussage ueber das SYSTEM; dort haette es ausgesehen wie
//   etwas, das ein Betreiber setzt.
// - NICHT tracking/consent.ts: jene Datei traegt die AUSWERTUNGSREGEL. Ein
//   Rollen-Merkmal gehoert nicht IN die Regel, sondern neben sie.
// - NICHT capi/ingest.ts: der Handler ist der einzige LESER. Wer die Werte dort
//   ablegte, machte den Leser zur Quelle — und die Haelfte B braucht denselben
//   Consent-Schluessel im erzeugten Browser-Text.
//
// KEIN `import "server-only"`, und der Grund ist woertlich derselbe wie bei
// META_CONSENT_TARGET in tracking/consent.ts: Eine server-only-Datei ist aus
// erzeugtem Browser-Code nicht erreichbar. Die Haelfte B wird von dort lesen.

import type { TrackingTarget } from "@/lib/settings";
import { META_CONSENT_TARGET } from "@/lib/tracking/consent";

/**
 * ZIEL-VOKABULAR -> CONSENT-VOKABULAR.
 *
 * ZWEI VOKABULARE, DIE HEUTE GLEICH LAUTEN UND ES NICHT MUESSEN. Links steht der
 * Wert aus TRACKING_TARGETS — derselbe, der in project_secrets.target liegt und
 * ueber den der Handler seinen Adapter waehlt. Rechts steht der Schluessel, den
 * der BETREIBER in seinen eigenen Consent-Hook schreibt.
 *
 * WARUM NICHT EINFACH DER LINKE WERT: Genau davor warnt capi/ingest.ts an zwei
 * Stellen (am Import des Consent-Schluessels und an dispatchForward). Eine
 * Divergenz zwischen beiden Vokabularen fiele NIEMANDEM auf: ein unbekannter
 * Schluessel im Draht ergibt schlicht "nicht erlaubt" — fail-closed und lautlos.
 * Diese Tabelle macht die Gleichheit zu einer AUSSAGE statt zu einer Annahme.
 *
 * DER META-WERT WIRD IMPORTIERT, NICHT ABGESCHRIEBEN. Er steht in AUSGELIEFERTEM
 * Code und in fremden Betreiber-Konfigurationen; ein Literal hier liesse ihn
 * auseinanderlaufen, ohne dass irgendwo etwas rot wird.
 *
 * PINTEREST TRAEGT SEINEN WERT ALS LITERAL, und das ist kein Versehen: Fuer
 * dieses Ziel gibt es noch KEINE Consent-Konstante, weil der Erzeuger den
 * Schluessel noch nicht schreibt (Haelfte B). Die Schreibweise folgt derselben
 * Regel wie bei Meta — dem Namensraum settings.pixels.<platform>, snake_case und
 * klein. SOBALD DER ERZEUGER IHN SCHREIBT, wird der Wert zur Einbahnstrasse (er
 * steht dann in fremden Konfigurationen) und gehoert als Konstante nach
 * tracking/consent.ts, von wo er hier importiert wird — wie der von Meta. BIS
 * DAHIN ist er folgenlos: Der Draht traegt ihn nie, also lautet die Antwort fuer
 * dieses Ziel bei vorhandenem Feld ohnehin "nicht erlaubt".
 */
export const CONSENT_KEY_BY_TARGET: Record<TrackingTarget, string> = {
  meta: META_CONSENT_TARGET,
  pinterest: "pinterest",
  // TIKTOK TRAEGT SEINEN WERT AUS DEMSELBEN GRUND ALS LITERAL wie Pinterest: Der
  // Erzeuger schreibt diesen Schluessel noch nicht in den Browser-Text (Haelfte B),
  // also traegt der Draht ihn nie und der Wert ist bis dahin folgenlos. Schreibweise
  // nach derselben Regel — Namensraum settings.pixels.<platform>, snake_case, klein.
  tiktok: "tiktok",
};

/**
 * DIE ALTBESTANDS-ROLLE — welches Ziel gilt als erlaubt, wenn der Draht das
 * Einwilligungs-Feld GAR NICHT traegt.
 *
 * WARUM EIN ROLLEN-MERKMAL UND KEIN VERGLEICH GEGEN EINEN ANBIETERNAMEN. Der
 * Unterschied ist der Grund, aus dem es diese Zuordnung ueberhaupt gibt:
 *   "wenn das Ziel Meta heisst, dann erlaube" waere beim dritten Ziel eine LISTE,
 *   die niemand mehr begruenden kann.
 *   "die Altbestands-Rolle traegt Meta" ist EINE Zeile, und sie traegt ihren
 *   Grund mit.
 * Der Anbietername steht damit als WERT in einer Zuordnung, nicht als SONDERFALL
 * IN DER REGEL. Die Regel selbst (allowedTargets in capi/ingest.ts) nennt
 * ausschliesslich die Rolle und kennt keinen Anbieter.
 *
 * DER GRUND, DEN DIE ROLLE TRAEGT: Als das Feld eingefuehrt wurde, gab es genau
 * EIN Ziel. Eine Seite ohne Feld ist damit AELTER als das Feld — ueber dieses
 * eine Ziel wurde der Besucher gefragt, ueber jedes spaetere NICHT. "Abwesend"
 * heisst fuer das Alt-Ziel "alte Seite" und fuer jedes weitere "nie gefragt".
 * Ein Code-Deploy erreicht bereits publizierte Seiten nicht; ohne die Ausnahme
 * verloere jede bestehende Kundenseite ihren Forward, lautlos.
 *
 * GENAU EIN ZIEL TRAEGT SIE, und das sichert KEIN Typ, sondern ein Test
 * (consent-targets.test.ts): Ein zweites `true` verschenkte die Ausnahme an ein
 * Ziel, zu dem nie gefragt wurde — genau der Schaden, gegen den die Rolle steht.
 *
 * BEIM DRITTEN ZIEL FRAGT DER COMPILER. Record<TrackingTarget, …> ist
 * erschoepfend: Wer TRACKING_TARGETS erweitert, bekommt hier einen Typfehler und
 * MUSS entscheiden. Eine Einzelkonstante haette dieselbe Wirkung gehabt und
 * niemanden gefragt.
 */
export const LEGACY_CONSENT_ROLE: Record<TrackingTarget, boolean> = {
  meta: true,
  pinterest: false,
  // FALSE, UND DIE FEHLERKLASSE GEHOERT DANEBEN: Bei einem Draht OHNE
  // Einwilligungs-Feld hiesse `true` hier ein FORWARD OHNE EINWILLIGUNG an ein Ziel,
  // ueber das der Besucher nie gefragt wurde — jede bereits publizierte Kundenseite
  // traegt das Feld nicht, und ein Code-Deploy erreicht sie nicht. Der Schaden waere
  // auf keinem unserer Kanaele sichtbar: es gaebe keinen Fehler, nur einen Forward
  // zuviel.
  tiktok: false,
};
