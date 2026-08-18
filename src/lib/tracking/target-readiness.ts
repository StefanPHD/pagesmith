// DIE ZWEI GETEILTEN PRAEDIKATE ZUR LIEFERFAEHIGKEIT EINES ZIELS (Phase 11,
// Vereinheitlichung; Entscheidung in
// docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 7.5
// "'KONFIGURIERT' WIRD EIN BENANNTER ZUSTAND").
//
// WAS DIESE DATEI IST: zwei Praedikate mit vier Produktiv-Aufrufstellen (GEMESSEN am
// Repo, 2026-08-13). hasPixelId hat DREI — die Auslieferungs-Zeile der Karte
// (TargetCard in components/TargetCard.tsx), den Kennungs-Filter im Aufloesungs-Pfad
// (getCapiConfigByTrackingKey in capi/token.ts) und das Consent-Memo (consentTargets
// in components/CodeImporter.tsx). hasSecret hat EINE: die Geheimnis-Schleife in
// derselben Aufloesungs-Funktion. Mehr steht hier nicht.
//
// HIER STAND EINMAL EINE ZUSAMMENSETZUNG (targetReadiness samt drei Typen) — SIE IST
// GESTRICHEN (Owner-Entscheidung 2026-08-13). Sie hat VIER Scheiben ohne einen
// einzigen Konsumenten ueberstanden; benutzt wurden immer nur die beiden Praedikate.
// WER SIE WIEDER BAUEN WILL, LIEST ZUERST DEN TRIGGER samt Auflage an ihrer
// Eingabe-Form in docs/claude-history/backlog-polish.md bzw., als Herleitung, in
// docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 5
// "Vorrat — gemeldet, nicht in dieser Scheibe", Punkt "DIE ZUSAMMENSETZUNG
// targetReadiness WAR VERFRUEHT UND IST GESTRICHEN" — ohne diesen Hinweis schneidet
// der naechste Anlauf denselben Schnitt noch einmal.
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
// KEIN DRITTES URTEIL, und das ist die tragende Grenze dieser Datei: Sie NIMMT die
// drei Tatsachen ENTGEGEN und BEHAUPTET ueber kein Ziel etwas. Hier steht keine
// Ziel-Liste, kein Record ueber Ziele, kein Vergleich gegen einen Zielwert. Wer hier
// eine solche Zuordnung ergaenzt, schafft eine WEITERE Quelle neben den bestehenden —
// und sie koennten auseinanderlaufen, ohne dass irgendetwas rot wird. Genau dagegen
// ist diese Arbeit gerichtet.
// DER WORTLAUT DIESES ABSATZES BLEIBT UNANGETASTET, OBWOHL SEIN BELEG GEALTERT IST,
// und der Grund ist eine KOPPLUNG, die man sonst erst beim Bruch bemerkt:
// tracking/target-adapters.ts ZITIERT ihn woertlich als Begruendung dafuer, dass die
// Adapter-Liste NICHT hierher gehoert. Wer ihn umformuliert, laesst jenes Zitat ins
// Leere zeigen — und jene Datei ist von dieser Scheibe ausgenommen.
// WAS GEALTERT IST: "die drei Tatsachen" gibt es seit der Streichung nicht mehr; diese
// Datei nimmt gar nichts mehr entgegen. DAS VERBOT GILT UNVERAENDERT und jetzt fuer
// die beiden Praedikate: eine Ziel-Liste gehoert hier nicht her.
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
// Ingest-Pfad). Die Richtung bleibt server-only -> rein, nie umgekehrt. Sie MUSS von
// beiden Seiten erreichbar sein, und das ist seit den Scheiben B1/B2/D2 keine Absicht
// mehr, sondern Betrieb: hasPixelId wird aus zwei Client-Komponenten UND aus dem
// server-only-Aufloesungs-Pfad gerufen.
//
// NACHGEZOGEN 11.1c, NICHT UMFORMULIERT — DER TEXT OBEN BLEIBT VOLLSTAENDIG LESBAR
// UND IST KEIN WORT GEAENDERT. Ueberholt ist allein sein BELEG, also eine
// TATSACHENBEHAUPTUNG UEBER DEN CODE; die REGELN dieses Kopfes sind unberuehrt.
// DREI ANGABEN SIND SEIT 11.1c FALSCH (GEMESSEN am Repo, 2026-08-18, ueber alle
// Fundstellen in src/, Testdateien getrennt gezaehlt):
//
//  (1) "hasPixelId hat DREI [Aufrufstellen]". Es ist GENAU EINE: hasTargetPixelId
//      (lib/settings.ts). Die drei genannten Stellen — die Auslieferungs-Zeile der
//      Karte, der Kennungs-Filter im Aufloesungs-Pfad und das Consent-Memo — rufen
//      seither JENE Funktion; sie delegiert hierher, statt die Regel zu wiederholen.
//      Jede weitere Fundstelle von "hasPixelId" im Produktivcode ist ein KOMMENTAR.
//  (2) "hasPixelId wird aus zwei Client-Komponenten UND aus dem
//      server-only-Aufloesungs-Pfad gerufen". Der Aufruf kommt nur noch aus EINER
//      REINEN Datei: lib/settings.ts traegt keine Direktive (gemessen: null Treffer
//      auf server-only/"use client"/"use server") und liest ihrerseits nichts als
//      diese Datei hier.
//      DIE BEGRUENDUNG DER BAUFORM IST DAVON UNBERUEHRT und bleibt die alte: Diese
//      Datei MUSS von beiden Seiten erreichbar sein. Sie ist es weiterhin — der Weg
//      laeuft jetzt ueber einen Zwischenschritt, der selbst rein ist. Waere er es
//      nicht, waere die Erreichbarkeit gebrochen; genau deshalb steht sie hier.
//  (3) DIE SUMME IM ERSTEN SATZ, "vier Produktiv-Aufrufstellen". Es sind ZWEI —
//      eine je Praedikat. hasSecret ist UNVERAENDERT bei EINER (die Geheimnis-
//      Schleife in getCapiConfigByTrackingKey, capi/token.ts); veraendert hat sich
//      allein die Zahl bei hasPixelId. Diese dritte Angabe stand nicht im
//      urspruenglichen Befund und ist beim Nachmessen aufgefallen: eine Summe altert
//      mit jedem ihrer Summanden, ohne dass jemand sie anfasst.
//
// WAS SICH AM VERHALTEN GEAENDERT HAT: NICHTS. Beide Praedikate sind wortgleich, und
// die Scheibe, die diesen Nachtrag ausgeloest hat, war ein Refactor ohne
// Verhaltensaenderung (live per Byte-Vergleich des ausgelieferten Textes belegt).

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
 * NIEMALS AN VOLLSTAENDIGKEIT"
 * (docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 7.5
 * "'KONFIGURIERT' WIRD EIN BENANNTER ZUSTAND"). Das
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
