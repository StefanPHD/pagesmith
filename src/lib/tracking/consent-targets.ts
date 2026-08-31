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
 * dieses Ziel gibt es KEINE Consent-Konstante in tracking/consent.ts, aus der er
 * importiert werden koennte — anders als bei Meta. Die Schreibweise folgt derselben
 * Regel wie dort: dem Namensraum settings.pixels.<platform>, snake_case und klein.
 *
 * DER SCHLUESSEL KOMMT HEUTE IM DRAHT AN, sobald das Ziel eine Kennung traegt.
 * ENTSCHIEDEN WIRD DAS IM MEMO consentTargets in components/CodeImporter.tsx: Es
 * laeuft ueber TRACKING_TARGETS, filtert auf eine gesetzte Pixel-ID und bildet
 * ueber DIESE Zuordnung ab. Der Erzeuger schreibt den Schluessel daraufhin an ZWEI
 * Stellen in den ausgelieferten Text — in die Ziehung (__psConsentAll) und in das
 * Draht-Feld des Beacons, beide in tracking/meta.ts.
 *
 * DARAUS FOLGT FUER DIE SCHREIBWEISE: SIE IST EINE EINBAHNSTRASSE. Ein publizierter
 * Text traegt sie, und ein Code-Deploy erreicht ihn nicht. Ein spaeterer Wechsel der
 * Schreibweise braeche JEDE bereits ausgelieferte Seite, und zwar LAUTLOS: Der Leser
 * faende den neuen Schluessel im Draht nicht, und "nicht gefunden" heisst hier
 * fail-closed "nicht erlaubt" (consentAllows in tracking/consent-wire.ts).
 *
 * OFFEN UND NICHT ENTSCHIEDEN: ob die Literal-Werte damit als Konstanten nach
 * tracking/consent.ts gehoeren, von wo sie hier importiert wuerden — wie der von
 * Meta. Das ist der Ort; die Entscheidung faellt nicht hier.
 */
export const CONSENT_KEY_BY_TARGET: Record<TrackingTarget, string> = {
  meta: META_CONSENT_TARGET,
  pinterest: "pinterest",
  // TIKTOK TRAEGT SEINEN WERT AUS DEMSELBEN GRUND ALS LITERAL wie Pinterest: keine
  // Consent-Konstante in tracking/consent.ts, aus der er importiert werden koennte.
  // Schreibweise nach derselben Regel — Namensraum settings.pixels.<platform>,
  // snake_case, klein. Auch hier kommt der Schluessel im Draht an, sobald das Ziel
  // eine Kennung traegt, und ist damit eine EINBAHNSTRASSE — Herleitung und die
  // offene Konstanten-Frage stehen im Absatz ueber dieser Zuordnung.
  tiktok: "tiktok",
  // LINKEDIN TRAEGT SEINEN WERT ALS LITERAL, aus demselben Grund wie die beiden
  // darueber: keine Consent-Konstante in tracking/consent.ts, aus der er importiert
  // werden koennte. Schreibweise nach derselben Regel — Namensraum
  // settings.pixels.<platform>, snake_case, klein.
  // DIESER EINTRAG IST HEUTE FOLGENLOS, UND DAS IST DER GEFAEHRLICHE TEIL: Der
  // Schluessel erreicht den Draht erst, wenn das Ziel eine KENNUNG traegt (das Memo
  // consentTargets in components/CodeImporter.tsx filtert darauf) — und diese Karte hat
  // kein oeffentliches Feld, also gibt es keinen Weg, eine zu setzen. Mit dem Adapter in
  // 11.1b wird er wirksam, OHNE dass sich an dieser Zeile etwas aendert und ohne dass
  // irgendwo etwas rot wird. Wer dann hier etwas ueberprueft, prueft eine Zeile, die
  // seit ihrem ersten Tag unveraendert dasteht.
  linkedin: "linkedin",
  // DAS FUENFTE ZIEL, aus demselben Grund ein Literal wie die drei darueber: keine
  // Consent-Konstante in tracking/consent.ts, aus der es importiert werden koennte.
  // Schreibweise nach derselben Regel — Namensraum settings.pixels.<platform>,
  // snake_case, klein.
  // DIESER EINTRAG IST HEUTE FOLGENLOS, UND ZWAR AUS EINEM SCHAERFEREN GRUND ALS BEI
  // LINKEDIN: Dort fehlte nur das Eingabefeld fuer die Kennung. Hier fehlt es ebenfalls
  // (die Google-Karte traegt kein oeffentliches Feld), UND es gibt keinen Adapter. Der
  // Schluessel erreicht den Draht erst, wenn das Ziel eine KENNUNG traegt — das Memo
  // consentTargets in components/CodeImporter.tsx filtert darauf —, und eine Kennung
  // kann ueber die Oberflaeche nicht entstehen. Wer hier etwas ueberprueft, prueft eine
  // Zeile, die seit ihrem ersten Tag unveraendert dasteht.
  google: "google",
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
  // FALSE — UND DIE BEGRUENDUNG STEHT HIER, WEIL SIE SONST BEIM FUENFTEN ZIEL NEU
  // HERGELEITET WIRD, UND ZWAR FALSCH: `false` heisst NICHT "strenger als die Doktrin".
  // Die Doktrin dieses Produkts lautet unveraendert, dass ohne Einwilligungs-Dialog ALLE
  // Ziele beliefert werden (CLAUDE.md, Roadmap-Zeile 11.5). Sie bleibt gewahrt, weil ein
  // nicht gesetzter Betreiber-Hook den Draht MIT allen Schluesseln auf true fuellt
  // (__psConsentAll in tracking/consent.ts: `v === undefined` -> alle erlaubt) — das
  // Feld ist dann VORHANDEN und erlaubend, dieser Zweig hier wird gar nicht erreicht.
  // WAS DIESE ROLLE WIRKLICH VERTEILT, ist ein ERBE: Sie gilt nur fuer einen Draht OHNE
  // Einwilligungs-Feld, also fuer Seiten, die VOR der Einfuehrung des Feldes publiziert
  // wurden. Fuer LinkedIn kann es solche Seiten nicht geben — das Ziel existiert erst ab
  // dieser Scheibe. Es ist also nichts zu erben, und `true` verschenkte die Ausnahme an
  // ein Ziel, ueber das nie jemand gefragt wurde.
  linkedin: false,
  // FALSE — UND DER GRUND IST DERSELBE WIE BEIM VIERTEN ZIEL, nicht ein neuer: Diese
  // Rolle verteilt ein ERBE. Sie gilt nur fuer einen Draht OHNE Einwilligungs-Feld, also
  // fuer Seiten, die VOR der Einfuehrung des Feldes publiziert wurden. Fuer Google kann
  // es solche Seiten nicht geben — das Ziel existiert erst ab dieser Scheibe. Es ist
  // also nichts zu erben.
  // DAS IST ZUGLEICH DAS DRITTE DER VIER TORE: Ein Beacon ohne cns-Feld erlaubt damit
  // ausschliesslich das Alt-Ziel; ein Beacon MIT cns-Feld traegt auf jeder heute
  // publizierten Seite keinen google-Schluessel, und `undefined === true` ist false.
  // Ein Test haelt die Rolle, nicht dieser Kommentar (consent-targets.test.ts: genau
  // EIN Traeger, und es ist meta).
  google: false,
};
