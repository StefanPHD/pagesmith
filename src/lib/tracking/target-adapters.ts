// WELCHE ZIELE DIESER BUILD BELIEFERN KANN (Phase 11, Scheibe C2 der
// Vereinheitlichung; Entscheidung in
// docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 7.5
// "'KONFIGURIERT' WIRD EIN BENANNTER ZUSTAND").
//
// WARUM ES DIESE DATEI GIBT — der GEMESSENE Anlass: Die Adapter-Tatsache wurde bis
// hierher an ZWEI Orten behauptet, und die beiden waren durch NICHTS verbunden — das
// Feld hasAdapter in TARGET_CARDS (components/TargetCard.tsx) und die Ziel-Zweige in
// dispatchForward (capi/ingest.ts). Wer einen Zweig entfernte, waehrend die Karte
// weiter einen Adapter behauptete, bekam keinen roten Test, keine Logzeile und keine
// Meldung; das Ziel sendete schlicht nichts. Seit dieser Datei gibt es die Tatsache
// EINMAL, und die Zuordnung im Handler ist ihre compiler-erzwungene Folge.
//
// WARUM NICHT IN EINER DER DREI NAHELIEGENDEN DATEIEN — die drei Begruendungen sind
// nicht meine, sondern stehen bereits im Repo, und sie stehen hier, damit diese Datei
// beim naechsten Aufraeumen nicht "vereinfacht" wird:
//
//  - NICHT tracking/target-readiness.ts. Deren Kopf verbietet es WOERTLICH: "KEIN
//    DRITTES URTEIL, und das ist die tragende Grenze dieser Datei: Sie NIMMT die drei
//    Tatsachen ENTGEGEN und BEHAUPTET ueber kein Ziel etwas. Hier steht keine
//    Ziel-Liste, kein Record ueber Ziele, kein Vergleich gegen einen Zielwert." Eine
//    Liste "diese Ziele haben einen Adapter" IST eine Ziel-Liste. Das Verbot gilt
//    jener Datei, nicht dem Gedanken — deshalb diese hier.
//  - NICHT tracking/consent-targets.ts. Dort liegt das CONSENT-Vokabular, und der
//    ganze Zweck jener Datei ist die TRENNUNG zweier Vokabulare, die heute zufaellig
//    gleich lauten. Eine Adapter-Liste daneben legte sie wieder zusammen.
//  - NICHT lib/settings.ts. Die Begruendung steht im Kopf von consent-targets.ts und
//    gilt hier unveraendert: "dort liegt der Einstellungs-Blob des KUNDEN. Beides hier
//    ist eine Struktur-Aussage ueber das SYSTEM; dort haette es ausgesehen wie etwas,
//    das ein Betreiber setzt." Ob dieser Build einen Empfaenger mitbringt, setzt kein
//    Betreiber — das aendert sich nur mit einem Deploy.
//  - NICHT capi/ingest.ts, wo sie bis hierher lag. Auch das ist im Repo schon
//    entschieden: "der Handler ist der einzige LESER. Wer die Werte dort ablegte,
//    machte den Leser zur Quelle." Und ohne diesen Umzug koennte die Oberflaeche die
//    Tatsache gar nicht lesen — jene Datei ist server-only.
//
// DIE FUNDSTELLEN FUER ZIEL-WISSEN — NEU GEZAEHLT, NICHT FORTGESCHRIEBEN (GEMESSEN am
// Repo, 2026-08-13). Die Aufzaehlung stand bis hierher in capi/ingest.ts an einer der
// beiden lokalen Ziel-Konstanten und ist mit ihnen entfallen; sie steht jetzt dort, wo
// sie wahr ist. ACHT Stellen tragen einen Zielwert oder eine ziel-geschluesselte
// Aussage:
//   1. TRACKING_TARGETS (lib/settings.ts) — die Ziele selbst
//   2. META_TARGET (capi/token.ts)
//   3. META_CONSENT_TARGET (tracking/consent.ts)
//   4. CONSENT_KEY_BY_TARGET (tracking/consent-targets.ts)
//   5. LEGACY_CONSENT_ROLE (tracking/consent-targets.ts)
//   6. TARGET_CARDS (components/TargetCard.tsx) — seit C2 nur noch Beschriftungen
//   7. TARGETS_WITH_ADAPTER (diese Datei)
//   8. der CHECK project_secrets_target_valid (supabase/migrations)
// DIE ALTE ZAHL WAR SECHS, UND SIE WAR SCHON DAMALS ZU NIEDRIG: Jene Liste nannte
// META_TARGET, META_CONSENT_TARGET, den CHECK, TRACKING_TARGETS, TARGET_CARDS.hasAdapter
// und sich selbst — sie zaehlte CONSENT_KEY_BY_TARGET und LEGACY_CONSENT_ROLE nicht mit,
// obwohl es beide seit der neunten Scheibe gibt. C2 nimmt ZWEI Stellen weg (die beiden
// lokalen Konstanten) und fuegt EINE hinzu; dass die Zahl trotzdem steigt, liegt an der
// Korrektur, nicht an dieser Scheibe.
// GEMELDET, NICHT GELOEST: Die Zusammenlegung dieser acht ist weiterhin ausdruecklich
// ausgeschlossen — sie vereinigte Vokabulare, die nur zufaellig gleich lauten.
//
// SIE IST REIN: keine Direktive, kein Import ausser dem TYP der Ziel-Union. Weder
// `import "server-only"` (das sperrte sie fuer die Karte) noch `"use client"` (das
// sperrte sie fuer den Ingest-Pfad). Dieselbe Bauform und derselbe Grund wie bei
// tracking/target-readiness.ts, und die Erreichbarkeit in beide Richtungen ist dort
// seit Scheibe B1/B2 im Betrieb bewiesen.

import type { TrackingTarget } from "@/lib/settings";

/**
 * DIE ZIELE, FUER DIE DIESER BUILD EINEN EMPFAENGER MITBRINGT.
 *
 * `as const satisfies readonly TrackingTarget[]` LEISTET ZWEI DINGE AUF EINMAL, und
 * beide werden gebraucht:
 *  - `as const` haelt die Liste SCHMAL, damit daraus eine Union GENAU DIESER Werte
 *    abgeleitet werden kann. Ohne sie waere der abgeleitete Typ `TrackingTarget`, die
 *    Zuordnung im Handler muesste JEDES Ziel bedienen — und ein viertes Ziel OHNE
 *    Adapter waere nicht mehr moeglich. Das ist der Unterschied, an dem diese Scheibe
 *    haengt, und er steckt in einer einzigen Typ-Angabe.
 *  - `satisfies` prueft, dass jeder Wert ein BEKANNTES Ziel ist, ohne die Liste zu
 *    verbreitern. Ein Tippfehler oder ein Ziel, das TRACKING_TARGETS nicht kennt, ist
 *    damit ein BUILD-Fehler.
 *
 * WARUM NICHT DIE BEIDEN ALTERNATIVEN: Eine Hilfsfunktion, die die Liste durchreicht,
 * erzeugte LAUFZEITCODE fuer eine reine Compiler-Aufgabe. Ein separater Typ-Alias als
 * Zusicherung stuende NEBEN der Liste — wer die Liste aendert, liest ihn nicht.
 * `satisfies` steht an der Liste selbst und ist beim Aendern nicht zu uebersehen.
 *
 * ERSTER GEBRAUCH VON `satisfies` IM REPO (GEMESSEN am 2026-08-13: 0 Fundstellen ueber
 * src/ vor dieser Scheibe). Das ist bewusst vermerkt: Wer das Idiom hier zum ersten
 * Mal sieht, soll wissen, dass es keine Gewohnheit ist, sondern eine Wahl mit Grund.
 *
 * DIESE LISTE IST EINE TEILMENGE VON TRACKING_TARGETS, KEINE ZWEITE FASSUNG DAVON.
 * Heute enthaelt sie alle drei; das ist ein Zustand, keine Regel. Ein neues Ziel
 * gehoert hier NICHT hinein, solange es keinen Empfaenger hat — dann sagt die Karte
 * von selbst, dass an dieses Ziel nichts gesendet wird, und der Handler ueberspringt
 * es.
 *
 * NACHGEZOGEN 11.1f — DIE REGEL DARUEBER IST UNBERUEHRT, IHR BELEG WAR ES NICHT:
 * "Heute enthaelt sie alle drei" war eine Aussage ueber einen Zustand mit DREI
 * Zielen; seit 11.1a kennt TRACKING_TARGETS VIER, und seit dieser Scheibe traegt
 * diese Liste ebenfalls vier. Der Satz bleibt im Wortlaut stehen — er sagt, was zu
 * seiner Zeit galt —, und die Regel, die er illustriert, gilt unveraendert weiter:
 * Ein Ziel gehoert erst hier hinein, wenn es einen Empfaenger HAT.
 * DASS HEUTE WIEDER ALLE BEKANNTEN ZIELE DRINSTEHEN, IST ERNEUT EIN ZUSTAND UND
 * KEINE REGEL. Wer daraus schliesst, die beiden Listen seien dasselbe, nimmt dem
 * naechsten Ziel ohne Empfaenger seinen Zwischenzustand — und der Karten-Hinweis
 * "Auslieferung folgt" haette wieder keinen Fall, den er beschreiben koennte.
 *
 * NACHGEZOGEN 2026-09-01 (Scheibe 4 der Phase 11.2) — DER ABSATZ DARUEBER BLEIBT
 * WOERTLICH, UND SEIN "HEUTE" MEINT INZWISCHEN DEN DRITTEN TAG. Er stammt vom
 * 2026-08-19 (Scheibe 11.1f), war seit Scheibe 3 FALSCH — 'google' stand in
 * TRACKING_TARGETS und nicht hier — und ist mit dieser Scheibe WIEDER WAHR.
 * DASS EINE AUSSAGE ZWEIMAL KIPPT UND ZWEIMAL ZURUECKKIPPT, IST DER EIGENTLICHE
 * BEFUND: Die Deckungsgleichheit der beiden Listen ist nachweislich ein Zustand, der
 * eintreten UND vergehen kann. Wer sie fuer eine Eigenschaft haelt, hat sie nur zu
 * einem der drei Zeitpunkte gelesen.
 * WAS DAMIT EINTRITT UND WAS DER ABSATZ DARUEBER VORHERGESAGT HAT: Der
 * Karten-Hinweis "Auslieferung folgt" hat ab jetzt KEINEN Fall mehr im Betrieb.
 * ER BLEIBT TROTZDEM, und der Grund steht an der Komponente selbst: Die Tatsache
 * kommt dort als PROP herein, der Zweig ist also jedem Test erreichbar — und beim
 * naechsten Ziel ohne Empfaenger kehrt er von selbst zurueck.
 */
export const TARGETS_WITH_ADAPTER = [
  "meta",
  "pinterest",
  "tiktok",
  // DAS VIERTE ZIEL (Scheibe 11.1f). Ab hier ist es Empfaenger: der Riegel aus 11.1a
  // faellt, und der Waechter, der ihn hielt, ist in derselben Scheibe ENTFERNT worden
  // — so, wie sein eigener Kommentar es verlangt hat.
  "linkedin",
  // DAS FUENFTE ZIEL (Scheibe 4 der Phase 11.2) — UND DIESE ZEILE IST TOR D.
  // Sie ist die EINE Aenderung, die die Scheibe 3 ausdruecklich verboten hat: Ihre
  // Festlegung (6) nennt diesen Ort "DER EINZIGE ORT, AN DEM DIESE SCHEIBE STILL ZUR
  // TRANSPORT-SCHEIBE WUERDE". Der Preis wird hier gezahlt, nicht umgangen.
  // WAS SIE AUSLOEST UND WAS NICHT: Der Compiler verlangt ab hier einen Eintrag in
  // FORWARDER_BY_TARGET (capi/ingest.ts) — ein fehlender ist ein BUILD-Fehler. Sie
  // macht 'google' NICHT sendebereit: Der Empfaenger braucht ausserdem eine Kennung,
  // ein brauchbares Zugangsdatum mit lebender Uhr 1 und die Einwilligung im Draht.
  "google",
] as const satisfies readonly TrackingTarget[];

/**
 * Die Ziele mit Empfaenger als TYP. Die Zuordnung im Handler ist ueber IHN
 * erschoepfend — nicht ueber TrackingTarget.
 */
export type TargetWithAdapter = (typeof TARGETS_WITH_ADAPTER)[number];

/**
 * Bringt dieser Build fuer das Ziel einen Empfaenger mit?
 *
 * TYP-PRAEDIKAT, und das ist der Zweck: Der Handler bekommt seine Ziele als
 * TrackingTarget (die WEITERE Menge) und muss vor dem Nachschlag verengen. Ohne diese
 * Verengung braeuchte es dort eine Typ-Zusicherung — und die behauptete genau das,
 * was hier geprueft wird, ein zweites Mal.
 *
 * DIE KOPIE IM VERGLEICH IST EINE TYP-ANGABE, KEINE ZWEITE LISTE: `includes` auf einer
 * `as const`-Liste akzeptiert sonst nur deren eigene Werte. Die Werte selbst stehen
 * genau einmal, oben.
 */
export function hasAdapter(target: TrackingTarget): target is TargetWithAdapter {
  return (TARGETS_WITH_ADAPTER as readonly TrackingTarget[]).includes(target);
}
