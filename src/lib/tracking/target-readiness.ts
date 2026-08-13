// DER BENANNTE ZUSTAND "IST DIESES ZIEL LIEFERFAEHIG?" (Phase 11, Scheibe A der
// Vereinheitlichung; Entscheidung in docs/aktiver-stand.md, Abschnitt 7.5).
//
// WARUM ES DIESE DATEI GIBT — der GEMESSENE Anlass, nicht ein Aufraeum-Wunsch:
// SECHS Stellen im Repo beantworten heute die Frage "ist dieses Ziel konfiguriert
// bzw. lieferfaehig", und sie pruefen dabei VIER VERSCHIEDENE Dinge. Zwei davon
// widersprechen sich sichtbar: Die Oberflaechen-Ableitung (listConfiguredTargets in
// app/projects/actions.ts) meldet "konfiguriert", sobald eine Geheimnis-Zeile
// existiert — die Kennung sieht sie gar nicht an. Der Auflaesungs-Pfad
// (getCapiConfigByTrackingKey in capi/token.ts) nimmt dagegen nur auf, wer Kennung
// UND Zugangsdatum traegt. Ein Ziel mit Zugangsdatum, aber ohne Kennung steht damit
// als konfiguriert in der Oberflaeche und wird NIE beliefert — ohne Meldung, ohne
// Logzeile, auf keinem Kanal sichtbar.
//
// WAS DIESE DATEI IN DIESER SCHEIBE IST: der Zustand allein, mit Tests, OHNE einen
// einzigen Konsumenten. Sie wird von NICHTS importiert. Die Uebernahme durch die
// bestehenden Urteile sind die Scheiben B, C und D — bis dahin verhaelt sich die
// Anwendung zeichengleich wie vorher.
//
// KEIN DRITTES URTEIL, und das ist die tragende Grenze dieser Datei: Sie NIMMT die
// drei Tatsachen ENTGEGEN und BEHAUPTET ueber kein Ziel etwas. Hier steht keine
// Ziel-Liste, kein Record ueber Ziele, kein Vergleich gegen einen Zielwert. Wer hier
// eine solche Zuordnung ergaenzt, schafft eine WEITERE Quelle neben den bestehenden —
// und sie koennten auseinanderlaufen, ohne dass irgendetwas rot wird. Genau dagegen
// ist diese Arbeit gerichtet.
// DIE REGEL STEHT WOERTLICH WIE VORHER; NACHGEZOGEN IST NUR IHRE ARITHMETIK. Hier
// stand "eine dritte Quelle neben den beiden bestehenden" — das war richtig, solange
// es zwei Traeger gab. Scheibe C2 hat die Adapter-Tatsache auf EINE Quelle gebracht
// (TARGETS_WITH_ADAPTER in tracking/target-adapters.ts), die beiden alten Traeger
// behaupten nichts mehr. Die Zahl altert, das Verbot nicht: Eine Ziel-Liste gehoert
// weiterhin NICHT hierher — dass sie anderswo entstanden ist, ist der Beleg dafuer
// und nicht die Ausnahme davon.
//
// SIE IST REIN: keine Direktive, kein Import. Weder `import "server-only"` (das
// sperrte sie fuer die Oberflaeche) noch `"use client"` (das sperrte sie fuer den
// Ingest-Pfad). Die Richtung bleibt server-only -> rein, nie umgekehrt. Sie muss von
// BEIDEN Seiten erreichbar sein, weil die beiden Urteile, die sie einmal ersetzen
// soll, auf verschiedenen Seiten liegen.
//
// DIE BAUFORM IST NICHT ERFUNDEN, sondern hat zwei Praezedenzfaelle im Repo:
// die Union des Serve-Resolvers (ServeResult in hosting/resolve.ts: ein `kind` plus
// Nutzlast je Zweig) und das geteilte Auslieferbarkeits-Praedikat aus Phase 9
// (nonEmptyHtml als kleines Praedikat, deliverableVariantB als Zusammensetzung
// darauf, beide in hosting/variant.ts). Von dort stammt auch die Aufteilung in
// EINZELN verwendbare Praedikate plus EINE Zusammensetzung: Konsumenten greifen auf
// verschiedenen Hoehen zu, ohne dass eine Bedingung zweimal ausformuliert wird.

/**
 * Ein Teil, der fehlen kann.
 *
 * DAS SIND TEIL-NAMEN, KEINE ZIEL-NAMEN. Diese Datei kennt keine Anbieter.
 */
export type ReadinessPart = "pixelId" | "secret" | "adapter";

/**
 * Der benannte Zustand. `ready` heisst: alle drei Teile liegen vor.
 *
 * WARUM KEIN WAHRHEITSWERT — der Grund ist der gemessene Defekt oben: "nicht
 * konfiguriert" und "konfiguriert, aber nicht lieferfaehig" sehen heute an jeder
 * Anzeige gleich aus, und genau deshalb ist der Defekt nie jemandem aufgefallen. Ein
 * Wahrheitswert reproduzierte diese Ununterscheidbarkeit im neuen Bauteil.
 */
export type TargetReadiness =
  | { kind: "ready" }
  | { kind: "incomplete"; missing: readonly ReadinessPart[] };

/**
 * KENNUNG VORHANDEN — die oeffentliche Kennung des Ziels.
 *
 * DIE BEDINGUNG IST UEBERNOMMEN, NICHT ERFUNDEN (GEMESSEN am Repo, 2026-08-12):
 * getPixelId (lib/settings.ts) trimmt und liefert bei Abwesenheit "", und der
 * Aufloesungs-Pfad vergleicht genau gegen "" (der withPixel-Filter in
 * capi/token.ts). Ein Wert aus reinem Leerraum ist damit heute ABWESEND, und diese
 * Funktion bildet das ab.
 *
 * SIE IST EINZELN EXPORTIERT, UND DAS IST EINE AUFLAGE, KEINE BEQUEMLICHKEIT:
 * "DER EINWILLIGUNGS-SCHLUESSEL HAENGT AN DER BLOSSEN ANWESENHEIT EINER KENNUNG,
 * NIEMALS AN VOLLSTAENDIGKEIT" (docs/aktiver-stand.md, Abschnitt 7.5). Das
 * Consent-Memo (consentTargets in components/CodeImporter.tsx) darf ausschliesslich
 * DIESE Funktion befragen und NIE targetReadiness.
 * DER GRUND, ausgeschrieben, damit die Auflage beim naechsten
 * Vereinheitlichungs-Reflex nicht faellt: Der Draht ist eine EINBAHNSTRASSE — ein
 * publizierter Text traegt den Schluessel, ein Code-Deploy erreicht ihn nicht —, und
 * ein fehlender Schluessel heisst fail-closed "nicht erlaubt". Haengte der Schluessel
 * am Gesamtzustand, entstuende aus einem teilweise eingerichteten Ziel lautlos GAR
 * KEINE Auslieferung, und kein Deploy koennte es heilen.
 *
 * `unknown` statt `string`, weil die Quelle ein Einstellungs-Blob ist: Was dort
 * steht, ist nicht typgesichert, sondern kommt aus der Datenbank.
 */
export function hasPixelId(pixelId: unknown): boolean {
  return typeof pixelId === "string" && pixelId.trim() !== "";
}

/**
 * ZUGANGSDATUM VORHANDEN — das Geheimnis des Ziels.
 *
 * DIE BEDINGUNG IST DIE DES AUFLOESUNGS-PFADES (GEMESSEN am Repo, 2026-08-12): Er
 * liest den Wert, nimmt einen Nicht-String als "" und verwirft das Ziel bei einem
 * leeren Wert (die Geheimnis-Schleife in capi/token.ts). Genau das steht hier.
 *
 * ZWEI DINGE, DIE HIER AUSEINANDERGEHALTEN WERDEN MUESSEN, weil sie im Bestand
 * auseinanderlaufen:
 * 1. KEIN TRIM, anders als bei der Kennung. Das ist KEINE Nachlaessigkeit, sondern
 *    die abgebildete Messung: Die Kennung laeuft durch getPixelId und ist getrimmt,
 *    das Geheimnis nicht. Wer hier einen Trim ergaenzt, aendert das Verhalten
 *    gegenueber dem Auflaesungs-Pfad — ein Geheimnis aus reinem Leerraum gilt dort
 *    heute als VORHANDEN.
 * 2. DIE OBERFLAECHEN-ABLEITUNG FRAGT ETWAS ANDERES: listConfiguredTargets
 *    (app/projects/actions.ts) selektiert ausschliesslich die Ziel-Spalte und liest
 *    den Wert nie — fuer sie genuegt die EXISTENZ der Zeile. Diese Funktion bildet
 *    die WIRKSAME Bedingung ab, nicht die anzeigende. Welche von beiden ein
 *    Konsument speist, entscheidet die Uebernahme-Scheibe, nicht diese hier.
 */
export function hasSecret(secret: unknown): secret is string {
  return typeof secret === "string" && secret !== "";
}

/**
 * Die drei Tatsachen, aus denen sich der Zustand ergibt.
 *
 * ZWEI DAVON SIND EIGENSCHAFTEN EINES PROJEKTS, EINE IST EINE EIGENSCHAFT DIESES
 * BUILDS — und diese Unterscheidung ist der Grund, warum adapterExists ein
 * gewoehnlicher Wahrheitswert ist und die beiden anderen nicht:
 *  - pixelId und secret stammen aus den Daten EINES Projekts (Einstellungs-Blob und
 *    Geheimnis-Tabelle). Sie sind je Projekt verschieden.
 *  - adapterExists sagt, ob DIESER BUILD fuer das Ziel einen Empfaenger mitbringt.
 *    Das ist fuer alle Projekte gleich und aendert sich nur mit einem Deploy.
 * FOLGE, und sie gehoert ausgeschrieben hierher: WER DIESE TATSACHE SPAETER IN DEN
 * EINSTELLUNGEN ODER IN DER GEHEIMNIS-TABELLE SUCHT, SUCHT AM FALSCHEN ORT. Sie
 * steht in keinem Datensatz und kann dort auch nicht stehen.
 *
 * SIE WIRD ENTGEGENGENOMMEN UND NICHT BEHAUPTET — daran hat sich nichts geaendert.
 * WOHER SIE HEUTE KOMMT, IST NACHGEZOGEN (Scheibe C2): Hier stand, ihre beiden
 * Traeger — das Feld hasAdapter in TARGET_CARDS und die Ziel-Zweige in
 * dispatchForward — blieben unveraendert bestehen, und diese Datei koenne sie von
 * dort nicht beziehen, weil die eine Quelle in einer Client-Komponente und die andere
 * in einem server-only-Handler liegt. BEIDE TRAEGER GIBT ES NICHT MEHR: Die Tatsache
 * steht seit C2 EINMAL, in der reinen Datei tracking/target-adapters.ts, und ist von
 * beiden Seiten erreichbar.
 * WAS SICH DADURCH NICHT AENDERT, und deshalb bleibt der Absatz stehen: Diese Datei
 * bezieht sie trotzdem NICHT selbst. Ein Import jener Liste hierher machte aus dem
 * Entgegennehmen ein Nachschlagen und braechte eine Ziel-Liste in Reichweite dieser
 * Datei — das Verbot im Kopf gilt unveraendert.
 */
export type ReadinessInput = {
  pixelId: unknown;
  secret: unknown;
  adapterExists: boolean;
};

/**
 * Setzt die drei Teile zu einem benannten Zustand zusammen.
 *
 * ER NENNT ALLE FEHLENDEN TEILE, NICHT EINEN GRUND — und damit entfaellt jede
 * Rangfolge. DAS IST EINE ENTSCHEIDUNG MIT EINEM GEMESSENEN GRUND: Der heutige Code
 * gibt keine Rangfolge her. Die einzige Reihenfolge, die im Bestand ueberhaupt
 * existiert, steht im Aufloesungs-Pfad (die Kennung wird vor dem Geheimnis geprueft,
 * capi/token.ts) — und sie ist dort ausdruecklich mit ABFRAGE-OEKONOMIE begruendet,
 * nicht mit Vorrang: gefragt wird nur nach Zielen, die ueberhaupt eine Kennung
 * tragen. Keine Anzeige, keine Meldung und kein Sortierschluessel im Repo
 * unterscheidet heute zwischen fehlenden Teilen. Der erste Konsument, der eine
 * Rangfolge braeuchte, entsteht in Scheibe B; sie wird DORT entschieden und nicht
 * hier vorweggenommen.
 *
 * DIE REIHENFOLGE IN `missing` IST DIE DEKLARATIONS-REIHENFOLGE, damit Tests stabil
 * sind — SIE IST KEINE RANGFOLGE. Wer aus ihr eine liest, liest eine Aussage, die
 * hier niemand getroffen hat.
 *
 * WIRFT NIE: drei typeof-Vergleiche, ein Array-Bau, kein Zugriff auf Fremdes.
 */
export function targetReadiness(input: ReadinessInput): TargetReadiness {
  const missing: ReadinessPart[] = [];
  if (!hasPixelId(input.pixelId)) missing.push("pixelId");
  if (!hasSecret(input.secret)) missing.push("secret");
  if (!input.adapterExists) missing.push("adapter");

  if (missing.length === 0) return { kind: "ready" };
  return { kind: "incomplete", missing };
}
