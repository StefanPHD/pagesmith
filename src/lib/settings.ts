// Reine Projekt-Einstellungs-Logik (kein React, kein Server). Unit-testbar, siehe
// settings.test.ts.
//
// Projektweite Einstellungen, plattform-GENESTET (Owner-Direktive Omnichannel):
//   settings.pixels.<platform>.<config>
// In 1b existiert NUR Meta (settings.pixels.meta.pixelId). Die Nest-FORM traegt
// weitere Plattformen (Google/TikTok/Pinterest/Custom-Code) spaeter daneben, OHNE
// flache Keys und OHNE Migration pro Plattform. Bewusst KEINE generische Registry,
// solange nur Meta existiert ("Abstraktion erst bei 2+ Faellen").
//
// PHASE 11, SECHSTE SCHEIBE — DIE ZIEL-DIMENSION IST DA. Der Satz darueber
// ("solange nur Meta existiert") beschreibt den Stand BIS hierher und bleibt als
// Begruendung stehen: Die Nest-Form wurde fuer genau diesen Moment gebaut, und sie
// wird jetzt benutzt, statt ersetzt. Was sich aendert, ist die Zahl der Mitglieder,
// NICHT die Form.
//
// DER ERSTE IMPORT DIESER DATEI (Scheibe 11.1c), und er geht in die UNGEFAEHRLICHE
// Richtung: tracking/target-readiness.ts ist selbst importfrei und traegt keine
// Direktive, es entsteht also weder ein Zyklus noch eine Client-/Server-Fessel. Die
// beiden Dateien, die umgekehrt aus dieser hier lesen (tracking/target-adapters.ts,
// tracking/consent-targets.ts), ziehen ausschliesslich den TYP TrackingTarget.

import { hasPixelId } from "@/lib/tracking/target-readiness";

/**
 * Die bekannten Tracking-Ziele. EINE Quelle fuer die Laufzeit-Pruefung in den
 * Server-Actions und fuer die spaetere Karte je Plattform.
 *
 * WARUM HIER UND NICHT IN capi/token.ts (wo META_TARGET liegt): Jene Datei traegt
 * `import "server-only"` und ist aus Client-Code nicht erreichbar; die Oberflaeche
 * braucht die Liste aber. Und NICHT in actions.ts: eine "use server"-Datei darf
 * AUSSCHLIESSLICH async-Funktionen exportieren, keine Konstante.
 *
 * BEFUND, DER DAZUGEHOERT UND GEMELDET IST: Damit steht der Wert "meta" im Repo an
 * einer VIERTEN Stelle (neben META_TARGET, META_CONSENT_TARGET und dem CHECK der
 * Geheimnis-Tabelle). Die Zusammenlegung der Kopien ist aus dieser Scheibe
 * AUSDRUECKLICH ausgeschlossen ("melden, nicht mitbauen") — sie waere ein eigener
 * Gegenstand, weil sie zwei Vokabulare vereinigt (Consent-Schluessel und
 * Ziel-Wert der Geheimnis-Tabelle), die heute nur zufaellig gleich lauten.
 */
// PHASE 11.1a — DAS VIERTE MITGLIED IST DAS ERSTE OHNE EMPFAENGER. Bis hierher trug
// jedes Mitglied dieser Liste auch einen Adapter; 'linkedin' tut es NICHT und steht
// bewusst NICHT in TARGETS_WITH_ADAPTER (lib/tracking/target-adapters.ts). Das ist der
// Riegel dieser Scheibe: Der Verteiler im Ingest-Pfad ist ueber TargetWithAdapter
// geschluesselt und verlangt deshalb KEINEN Eintrag fuer dieses Ziel — ein Projekt mit
// hinterlegtem LinkedIn-Zugangsdatum verhaelt sich am Ingest exakt wie eines ohne.
// EIN TEST HAELT DEN RIEGEL, nicht dieser Kommentar: tracking/target-adapters.test.ts.
// PHASE 11.2, SCHEIBE 3 — DAS FUENFTE MITGLIED IST DAS ERSTE OHNE EINGABEFELD. 'linkedin'
// war das erste ohne Empfaenger; 'google' ist das erste, das WEDER eine oeffentliche
// Kennung NOCH ein Zugangsdatum ueber ein Formular entgegennimmt. Sein Zugangsdatum
// entsteht ueber den Autorisierungs-Fluss und liegt chiffriert; seine Kennungen sind
// Scheibe 2.
// WAS DIESE ZEILE AUSLOEST UND WAS NICHT: Sie macht das Ziel fuer die Oberflaeche
// SICHTBAR (Karten, listConfiguredTargets) und ueber die Anwendung TRENNBAR. Sie macht
// es NICHT zum Empfaenger — 'google' steht bewusst NICHT in TARGETS_WITH_ADAPTER
// (lib/tracking/target-adapters.ts), und der Verteiler im Ingest-Pfad ist ueber
// TargetWithAdapter geschluesselt. VIER Tore halten nach dieser Zeile weiterhin
// geschlossen; welche und woran man das sieht, steht im Zuschnitt
// (docs/claude-history/phase-11.2-google.md, "Google als reguläres Ziel in der
// Oberfläche — Scheibe 3 des Schnitts der Phase 11.2").
// PHASE 11.2, SCHEIBE 4 — DIE ZWEI ABSAETZE DARUEBER BLEIBEN WOERTLICH STEHEN UND SIND
// ALS AUSSAGE UEBER HEUTE BEIDE UEBERHOLT. Sie beschreiben ihren Tag und werden nicht
// gestrichen; sie sind die Herleitung, aus der der Schnitt dieser Phase entstanden ist.
// WAS NICHT MEHR ZUTRIFFT, JE EINZELN:
//  · "'linkedin' … steht bewusst NICHT in TARGETS_WITH_ADAPTER" — seit 11.1f falsch.
//  · "'google' steht bewusst NICHT in TARGETS_WITH_ADAPTER" — seit Scheibe 4 falsch.
//  · "VIER Tore halten nach dieser Zeile weiterhin geschlossen" — mit Scheibe 4 haelt
//    KEINES der vier mehr. Tor A ist mit Scheibe 2 absichtlich gefallen (die Kennungen
//    bekamen ihre Eingabe), Tor B mit dem Lesepfad in capi/token.ts (die google-Zeile
//    traegt ihr Geheimnis in secret_enc, und der Resolver liest es jetzt), Tor C ist
//    hinter Tor B ohnehin unerreichbar, und Tor D mit dem Eintrag in
//    TARGETS_WITH_ADAPTER.
// WAS AN IHRE STELLE TRITT — UND ES SIND KEINE TORE MEHR, SONDERN BEDINGUNGEN: Ein
// Ereignis erreicht Google nur, wenn eine Kundennummer hinterlegt ist, eine
// Conversion-Regel FUER DIESES EREIGNIS existiert, das Zugangsdatum eine lebende
// Uhr 1 hat, der Einwilligungs-Draht den Schluessel traegt und eine Klick-Kennung in
// der Adresse steht. Fehlt eines davon, geht nichts hinaus — aber als Eigenschaft des
// Ziels, nicht als Riegel gegen es.
// DAS IST NICHT ZWEIMAL DASSELBE: Ein Tor haelt ein FERTIGES Ziel zurueck; eine
// Bedingung beschreibt, was ein Ziel BRAUCHT. Wer die Aufzaehlung oben als heutige
// Liste liest, sucht Riegel, die es nicht mehr gibt.
export const TRACKING_TARGETS = [
  "meta",
  "pinterest",
  "tiktok",
  "linkedin",
  "google",
] as const;

/** Ein bekanntes Tracking-Ziel. */
export type TrackingTarget = (typeof TRACKING_TARGETS)[number];

/**
 * Laufzeit-Pruefung: ist das ein bekanntes Ziel?
 *
 * NOETIG, WEIL DER TYP ZUR LAUFZEIT NICHT EXISTIERT. Eine Server Action nimmt
 * entgegen, was ueber die Leitung kommt; `target: TrackingTarget` ist eine
 * Behauptung des Compilers, keine Kontrolle. Ohne diese Pruefung faenge erst der
 * CHECK der Geheimnis-Tabelle den Fehler — und zwar NACH dem Instanziieren des
 * privilegierten Clients. Vergleich per exaktem Wert, nicht per Praefix oder
 * Laenge: "pintrest" faellt durch, "Meta" ebenso.
 */
export function isTrackingTarget(value: unknown): value is TrackingTarget {
  return (
    typeof value === "string" &&
    (TRACKING_TARGETS as readonly string[]).includes(value)
  );
}

export type ProjectSettings = {
  // Partial<Record<…>> statt fester Mitglieder: dieselbe Nest-FORM wie zuvor, nur
  // ueber die bekannten Ziele geschluesselt. Ein Blob aus der Zeit davor
  // (`{ pixels: { meta: { pixelId } } }`) passt UNVERAENDERT hinein — es gibt
  // keinen Alt-Blob-Pfad und keinen Lese-Rueckfall, weil sich die Form nicht
  // geaendert hat. Das ist der Grund, warum diese Ablage-Form gewaehlt wurde.
  pixels?: Partial<
    Record<
      TrackingTarget,
      {
        // Die oeffentliche Kennung des Ziels -> kein Secret, plain gespeichert.
        // Der echte Secret liegt in project_secrets.
        //
        // ERSETZT (Scheibe 2 der Phase 11.2) — HIER STAND "Pixel-ID ist OEFFENTLICH
        // (steht im ausgelieferten Snippet)". SACHKORREKTUR, kein Stempel: Der
        // Klammerzusatz war die BEGRUENDUNG fuer "oeffentlich", und er trifft nicht
        // mehr jedes Ziel. Fuer 'google' liefert dieses Projekt KEIN Tag aus; die
        // Kundennummer steht in keinem Snippet, sie reist ausschliesslich in der
        // Nutzlast des Server-Aufrufs. Dasselbe gilt seit 11.1a fuer 'pinterest' und
        // 'tiktok' (s. deren Hilfetexte in tracking/target-cards.ts: "nicht im
        // Seitenquelltext"). WAS BLEIBT: Der Wert ist NICHT geheim — das ist die
        // Aussage, die den Slot traegt. Der Grund dafuer ist je Ziel ein anderer.
        // WER DEN ALTEN SATZ STEHENLAESST, begruendet die Offenheit mit einer
        // Sichtbarkeit, die es fuer drei von fuenf Zielen nicht gibt.
        //
        // DER NAME BLEIBT 'pixelId', OBWOHL ER FUER 'google' die KUNDENNUMMER traegt
        // (ENTSCHEIDUNG: ARCHITEKT, 2026-08-31). Der Praezedenzfall steht im Repo:
        // capi/ingest.ts uebersetzt config.pixelId beim Uebergeben zu adAccountId —
        // am VERBRAUCHER, ohne den Slot umzubenennen. Ein Umbenennen traefe 30
        // Dateien, darunter sechs Testdateien mit woertlichen Zusicherungen.
        pixelId?: string;
        // DIE ZUORDNUNG EREIGNISNAME -> CONVERSION-REGEL-KENNUNG (Scheibe 11.1d,
        // Form F1). Sie steht NEBEN pixelId, nicht darin: pixelId bleibt ein
        // SKALAR und getPixelId sagt weiterhin IMMER eine Zeichenkette zu.
        //
        // WARUM EIN EIGENES FELD UND NICHT EIN POLYMORPHES pixelId (F2, verworfen):
        // Fuenf Stellen setzen den Skalar voraus und traegen dafuer einen
        // Compiler-Riegel — eine SECHSTE braucht ihn gar nicht erst, weil
        // hasTargetPixelId `unknown` entgegennimmt und ein Objekt dort lautlos
        // `false` liefert. Genau dieser Pfad OHNE Riegel war der Grund gegen F2.
        //
        // WARUM NICHT IN DIE GEHEIMNIS-TABELLE: Die Kennung ist KEIN Zugangsdatum
        // — sie steht in der NUTZLAST des Aufrufs, der Betreiber muss sie SEHEN
        // und AENDERN koennen. project_secrets traegt RLS aktiv und keine einzige
        // Policy; sie ist bewusst unlesbar.
        //
        // DIE SCHLUESSEL SIND EREIGNISNAMEN, WOERTLICH: TrackConfig.event ist ein
        // FREIER Nutzer-String, und er wird hier NICHT normalisiert (nicht
        // getrimmt, nicht gekappt, nicht case-gefaltet). Wer das aendert, bricht
        // die Deckungsgleichheit mit dem Schluesselraum aus 11.1b
        // (trackEventNames, tracking/event-names.ts) — und zwar lautlos, weil
        // beide Seiten fuer sich gueltig aussehen.
        conversionRules?: Record<string, string>;
      }
    >
  >;
  // CAPI-Server-Side-Infra (Scheibe 2a). BEWUSST plattform-AGNOSTISCH neben pixels
  // (nicht darunter): es ist keine Pixel-Config, sondern der server-seitige
  // Forward-Kanal.
  //   trackingKey = OEFFENTLICHER Zufalls-Handle. Loest server-seitig -> project_id
  //                 -> geheimen Token auf (Read-Pfad in Scheibe 2b). Darf im Client
  //                 stehen / spaeter in den Export gebacken werden.
  //   tokenSet    = NICHT-sensibler Indikator "CAPI-Token gesetzt?" fuer die
  //                 write-only-UI ("••• gesetzt").
  // Der ECHTE Token liegt NIE hier — nur server-only in den Geheimnis-Tabellen
  // project_secrets (gelesen) und project_tokens (mitgeschrieben, Rollback-Reserve).
  // Die tragende Zusage ist der erste Halbsatz und bleibt unveraendert; nachgezogen
  // ist nur, WO er stattdessen liegt.
  capi?: {
    trackingKey?: string;
    tokenSet?: boolean;
  };
  // Hosting-Zustand (Phase 7 Scheibe 7a). BEWUSST plattform-agnostisch neben pixels
  // (wie capi): kein Pixel, sondern die Auslieferungs-Metadaten.
  //   label       = OEFFENTLICHES Subdomain-Label (label.publayer.net). Nicht geheim.
  //                 Vom Publish vergeben (idempotent: einmal gesetzt, wiederverwendet)
  //                 und hierher gespiegelt, damit der Client die Live-URL ueber
  //                 Sessions hinweg kennt, OHNE domains selbst abzufragen.
  //   publishedAt = Zeitstempel des letzten Publish (nur Anzeige).
  hosting?: {
    label?: string;
    publishedAt?: string;
  };
  // EINWILLIGUNGS-SCHALTER JE PROJEKT (Phase 11.5, Scheibe 11.5a). BEWUSST
  // plattform-agnostisch neben pixels/capi/hosting, aus demselben Grund wie hosting:
  // kein Pixel, sondern eine Aussage ueber den AUSGELIEFERTEN TEXT.
  //   dialog = SEIT SCHEIBE 11.5d DIE QUELLE: welche Einwilligungs-Oberflaeche die
  //            publizierte Seite traegt — keine, Leiste oder Modal (11.5d-2). Gelesen
  //            AUSSCHLIESSLICH ueber
  //            getConsentDialog — der Typ ist `unknown`, weil der Blob ungepruefte
  //            Client-Eingabe ist und niemand den Wert ohne Leser verwenden soll.
  //   gate   = ALTBESTAND aus 11.5a bis 11.5c. Nur noch gelesen, nie geschrieben;
  //            `true` heisst BAR, solange `dialog` fehlt. Er bleibt im Blob liegen,
  //            weil der Setzer den Teil-Blob SPREIZT und saveProject ihn ganz
  //            zurueckschreibt — deshalb gewinnt `dialog`, wenn beide da sind.
  //
  // WARUM HIER UND NICHT IN EINER EIGENEN SPALTE — die Alternative ist erwogen und
  // verworfen: Eine server-autoritative Spalte ueberlebte jeden Client-Save, machte
  // aber einen ZWEITEN Ort auf, aus dem derselbe ausgelieferte Text gespeist wird.
  // Hier liegt bereits die Ableitung der Ziel-Schluessel, aus der derselbe Text
  // gebaut wird; Schalter und Schluessel aus EINER Quelle koennen nicht
  // auseinanderlaufen.
  // DER PREIS STEHT DAZU: Ein alter Browser-Tab kann den Blob ganzheitlich
  // ueberschreiben und den Schalter still ausknipsen. Der Zustand danach ist: keine
  // Oberflaeche, alle Ziele erlaubt.
  // SEIT ES DIE LEISTE GIBT (Scheibe 11.5d), IST DAS NICHT MEHR HARMLOS: Ein Besucher,
  // der abgelehnt hat, wird nach dem naechsten Veroeffentlichen wieder getrackt, weil
  // bei AUS keine Wiederherstellung entsteht. Ein unbekannter Wert ist davon
  // abgefangen (publishProject verweigert), ein alter Tab NICHT — benanntes Risiko,
  // ungemessen.
  // ER FAELLT NICHT UNTER "SERVER-EIGENE IDENTITAET NIE IN EINEN CLIENT-BESESSENEN
  // BLOB": Jene Regel trifft eine SERVER-VERGEBENE Identitaet, die der Client nicht
  // kennt. Dieser Schalter ist eine EINGABE DES BETREIBERS und entsteht im Client.
  //   theme  = DIE DARSTELLUNG DER OBERFLAECHE (Phase 11.13, Scheibe 11.13b): hell,
  //            dunkel oder "der Systemeinstellung des Besuchers folgend". Gelesen
  //            AUSSCHLIESSLICH ueber getConsentTheme; der Typ ist `unknown` aus demselben
  //            Grund wie bei `dialog`. Er liegt als NACHBAR von `dialog` und nicht als
  //            eigenes Top-Level-Mitglied — bindende Entscheidung P11.13-6.
  //            SEIT SCHEIBE 11.13c TRAEGT ER EINEN VIERTEN WERT, "custom" — bindende
  //            Entscheidung P11.13-12: die eigenen Farben sind eine vierte DARSTELLUNG
  //            und kein zweiter Schalter, damit "Dunkel PLUS eigene Farben" gar nicht
  //            erst als Zustand entsteht.
  //   colorBackground / colorText = DIE ZWEI FREIEN FARBEN (Phase 11.13, Scheibe
  //            11.13c; bindende Entscheidung P11.13-19). FLACHE Nachbarn, KEIN
  //            Unterobjekt; der Typ ist `unknown` aus demselben Grund wie oben.
  //            SIE WERDEN NUR GELESEN, WENN `theme` === "custom" IST — sonst bleiben sie
  //            unberuehrt liegen, damit eine Wahl das Umschalten ueberlebt.
  //            DIE FELDNAMEN SIND EINE EINBAHNSTRASSE: ein Blob, der sie traegt, traegt
  //            sie weiter; eine Umbenennung muesste beide Formen lesen (P11.13-19).
  //   text = DER FREIE SACHTEXT (Phase 11.13, Scheibe 11.13d; bindende Entscheidungen
  //            P11.13-23 und P11.13-26). FLACHER Nachbar, KEIN Unterobjekt; der Typ ist
  //            `unknown` aus demselben Grund wie oben.
  //            FEHLT DAS FELD, GILT UNSER STANDARDTEXT — das ist der Normalfall und kein
  //            Fehlzustand. Ein GESPEICHERTER LEERER STRING ist dagegen "unknown" und
  //            sperrt das Veroeffentlichen; die Oberflaeche ENTFERNT das Feld, statt es zu
  //            leeren.
  //            DER FELDNAME IST EINE EINBAHNSTRASSE: ein Blob, der ihn traegt, traegt ihn
  //            weiter; eine Umbenennung muesste beide Formen lesen (P11.13-19).
  consent?: {
    gate?: boolean;
    dialog?: unknown;
    theme?: unknown;
    colorBackground?: unknown;
    colorText?: unknown;
    text?: unknown;
    // DIE SPRACHE (Phase 11.13, Scheibe 11.13e; bindende Entscheidung P11.13-37).
    // FLACHER NACHBAR, Typ `unknown` — dieselbe Bauform wie `theme` und die zwei Farben:
    // der Blob ist ungeprueftes Client-Eingabegut, und der einzige Leser prueft.
    language?: unknown;
  };
  // DER BETREIBER-SNIPPET (Phase 11.6, Scheibe 11.6a; Entscheidungen P11.6-3 und
  // P11.6-5 Teil (1)). EIN Feld je Projekt, beliebiger Basis-Code, beliebig viele
  // Netzwerke darin.
  //
  // WARUM EIN EIGENES TOP-LEVEL-MITGLIED UND NICHT UNTER `pixels`: `pixels` ist
  // `Partial<Record<TrackingTarget, …>>`. Ein Custom-Pixel ist KEIN TrackingTarget —
  // es hat keinen Adapter, keine Zeile in project_secrets und keinen Server-Forward.
  // Ein Eintrag dort waere ein Typfehler UND die Vermischung zweier Vokabulare, gegen
  // die tracking/consent-targets.ts in ihrem Kopf ausdruecklich steht.
  // Die Klasse ist die von `capi`, `hosting` und `consent`: plattform-agnostisch NEBEN
  // `pixels`.
  //
  // UNTEROBJEKT STATT FLACH, und das ist die Gegenrichtung zu P11.13-19 (dort wurden
  // Farben und Sachtext bewusst FLACHE Nachbarn unter `consent`): Dort gab es das
  // Unterobjekt bereits. Hier entsteht ein neues Thema, und ein spaeterer Schalter
  // ("Snippet vorerst aus") braeuchte sonst ein ZWEITES Top-Level-Mitglied.
  //
  // `code` IST `unknown`, aus demselben Grund wie `consent.theme`: Der Blob ist
  // ungeprueftes Client-Eingabegut, und der einzige Leser prueft.
  // DER FELDNAME IST EINE EINBAHNSTRASSE: ein Blob, der ihn traegt, traegt ihn weiter.
  customPixel?: {
    code?: unknown;
  };
};

// Die getrimmte Pixel-ID EINES Ziels oder "" (nicht gesetzt).
//
// KEIN ALT-BLOB-RUECKFALL, und das ist kein Vergessen: Ein Blob aus der Zeit vor
// dieser Scheibe traegt `pixels.meta.pixelId` — genau den Pfad, den diese Funktion
// fuer das Ziel "meta" liest. Alt und neu sind DIESELBE Form. Waere die Ablage
// stattdessen flach geworden, braeuchte es hier dauerhaft einen zweiten Lesepfad.
export function getPixelId(
  settings: ProjectSettings,
  target: TrackingTarget
): string {
  return settings.pixels?.[target]?.pixelId?.trim() ?? "";
}

// DIE ZUORDNUNG EREIGNISNAME -> REGEL-KENNUNG EINES ZIELS, oder ein leeres Objekt
// (Scheibe 11.1d).
//
// SIE LIEFERT NIE undefined — dieselbe Zusicherungs-Form wie getPixelId, und aus
// demselben Grund: Jeder Aufrufer muesste sonst denselben Rueckfall selbst
// schreiben, und der eine, der es vergisst, wirft erst zur Laufzeit.
//
// KEIN TRIM AN DEN SCHLUESSELN, und das ist eine Auslage und kein Vergessen: Die
// Schluessel sind Ereignisnamen, und der Schluesselraum aus 11.1b
// (trackEventNames, tracking/event-names.ts) normalisiert sie ebenfalls nicht.
// Zwei Seiten, die verschieden normalisieren, finden einander nicht mehr — und
// nichts wird dabei rot.
export function getConversionRules(
  settings: ProjectSettings,
  target: TrackingTarget
): Record<string, string> {
  return settings.pixels?.[target]?.conversionRules ?? {};
}

/**
 * ZUORDNUNG VORHANDEN — das FORM-Praedikat zur Regel-Kennung (Scheibe 11.1d).
 *
 * NICHT-LEER HEISST: mindestens EIN Eintrag, dessen WERT eine nicht-leere
 * Zeichenkette ist. Ein Objekt voller leerer Werte ist damit ABWESEND — dieselbe
 * Bedingung wie beim Kennungs-Primitiv hasPixelId (tracking/target-readiness.ts),
 * nur eine Ebene tiefer angewandt. Der Trim ist von dort uebernommen und nicht
 * erfunden: eine Kennung aus reinem Leerraum gilt in diesem System als abwesend.
 *
 * SIE MISST DIE ZUORDNUNG AN SICH SELBST — KEIN ABGLEICH GEGEN DEN SCHLUESSELRAUM,
 * und der Grund gehoert an diese Fundstelle, weil ihn sonst die naechste Runde als
 * fehlende Sorgfalt liest und "nachbessert":
 * Ein Abgleich gegen die verwendeten Ereignisnamen machte das Urteil und damit
 * consentTargets (components/CodeImporter.tsx) erstmals MAPPING-abhaengig. Der
 * ausgelieferte Text hinge dann davon ab, welche Variante gerade bearbeitet wird —
 * und genau das bricht die Variantenblindheit, auf der Scheibe 11.1b aufbaut.
 * FOLGE, die dazugehoert: Ein Eintrag, dessen Ereignisname nicht mehr verwendet
 * wird, bleibt BESTEHEN und zaehlt weiter. Das ist entschieden (Owner 2026-08-18)
 * und kein Uebersehen.
 *
 * `unknown` statt eines Record-Typs, GENAU WIE BEIM PRIMITIV: Die Quelle ist ein
 * Einstellungs-Blob aus der Datenbank. Was dort steht, ist nicht typgesichert —
 * ein Array, eine Zahl oder null kommen hier durch, und sie muessen `false`
 * ergeben statt zu werfen.
 */
export function hasConversionRules(value: unknown): boolean {
  if (typeof value !== "object" || value === null || Array.isArray(value)) {
    return false;
  }
  return Object.values(value as Record<string, unknown>).some(
    (rule) => typeof rule === "string" && rule.trim() !== ""
  );
}

/**
 * IST DIESES ZIEL AUSLIEFERFAEHIG? (Scheibe 11.1d)
 *
 * ES SIND ZWEI VERSCHIEDENE FRAGEN, DIE BISHER ZUSAMMENFIELEN, weil ALLE Ziele
 * eine Skalar-Kennung trugen — und dieser Absatz ist der Kern der Scheibe:
 *  - hasTargetPixelId (unten) beantwortet "KANN ICH FUER DIESES ZIEL EINE
 *    CapiConfig BAUEN?". Das braucht einen SKALAR, und deshalb bleibt sie beim
 *    Aufloesungs-Pfad (getCapiConfigByTrackingKey, capi/token.ts).
 *  - DIESE hier beantwortet "IST DIESES ZIEL AUSLIEFERFAEHIG?". Das braucht
 *    IRGENDEINE Kennungsform — heute den Skalar ODER die Zuordnung.
 * DAS IST KEIN ZWEITES URTEIL UEBER DIESELBE FRAGE, SONDERN EIN URTEIL JE FRAGE.
 * Ohne diesen Absatz sieht es wie eine Verdopplung aus und wird beim naechsten
 * Aufraeumen zusammengelegt — und dann zieht entweder der Resolver ein Ziel ohne
 * Skalar in seine Geheimnis-Abfrage (zusaetzliche Arbeit JE BEACON), oder ein
 * auslieferfaehiges Ziel faellt aus dem Consent-Draht.
 *
 * SIE IST ZIEL-GENERISCH UND DAMIT KEINE NEUNTE ZIEL-GESCHLUESSELTE STELLE (die
 * Zaehlung steht im Kopf von tracking/target-adapters.ts): Hier steht kein
 * Zielwert, keine Ziel-Liste und kein Record ueber Ziele. Sie fragt fuer JEDES
 * Ziel dasselbe — ob EINE der beiden Kennungsformen belegt ist. Dass heute nur
 * ein Ziel die zweite Form fuellt, ist ein ZUSTAND der Daten, keine Regel im Code.
 *
 * SIE NIMMT DEN BLOB, NICHT EINEN WERT, und das ist der Unterschied zur Funktion
 * darunter: Sie befragt ZWEI Felder, und ein Aufrufer koennte nicht wissen,
 * welches davon fuer welches Ziel das entscheidende ist.
 */
export function isTargetDeliverable(
  settings: ProjectSettings,
  target: TrackingTarget
): boolean {
  return (
    hasTargetPixelId(getPixelId(settings, target), target) ||
    hasConversionRules(getConversionRules(settings, target))
  );
}

/**
 * TRAEGT DIESES ZIEL EINE KENNUNG? — das ZIEL-BEWUSSTE Urteil (Scheibe 11.1c).
 *
 * WELCHE FRAGE SIE BEANTWORTET, UND DASS ES NICHT DIESELBE IST WIE OBEN (Scheibe
 * 11.1d): Sie beantwortet "KANN ICH FUER DIESES ZIEL EINE CapiConfig BAUEN?" —
 * die Frage nach dem SKALAR. Das Urteil ueber die AUSLIEFERFAEHIGKEIT steht in
 * isTargetDeliverable darueber und kennt zusaetzlich die Zuordnungs-Form. WER DIE
 * BEIDEN ZUSAMMENLEGT, legt zwei Fragen zusammen, die seit 11.1d auseinanderlaufen.
 *
 * Sie nimmt den WERT und das ZIEL entgegen und delegiert an das skalare Primitiv
 * hasPixelId (tracking/target-readiness.ts). Sie wiederholt dessen Regel NICHT.
 *
 * WARUM NICHT IN tracking/target-readiness.ts — und das ist keine Geschmacksfrage:
 * Jene Datei definiert sich woertlich als ZIEL-BLIND ("Hier steht keine Ziel-Liste,
 * kein Record ueber Ziele, kein Vergleich gegen einen Zielwert"), und
 * tracking/target-adapters.ts ZITIERT dieses Verbot als Begruendung fuer die eigene
 * Existenz. Diese Funktion FUEHRT ein Ziel, ohne es zu bewerten — genau das ist dort
 * ausgeschlossen. Das Verbot wird damit weder neu gefasst noch umgangen; es bleibt
 * wortgleich stehen, und diese Funktion steht daneben statt darin.
 *
 * WARUM DER ZWEITE PARAMETER HEUTE NICHTS TUT UND TROTZDEM KEIN TOTES GEWICHT IST —
 * der Absatz steht hier, weil die Zeile sonst beim naechsten Aufraeumen faellt:
 * Er ist der GRUND, warum diese Funktion hier lebt und nicht in target-readiness.ts,
 * und er ist die Stelle, an der 11.1c-Nachfolger ansetzen, OHNE dass ein einziger
 * Aufrufer sich aendert. WER IHN STREICHT, STREICHT MIT IHM DEN ORT: ohne Ziel im
 * Kopf ist diese Funktion vom Primitiv nicht mehr zu unterscheiden, und dann gibt
 * es keinen Grund mehr, warum sie nicht dort drueben steht.
 *
 * WARUM SIE HEUTE ZIEL-GENERISCH IST: Sie urteilt fuer KEIN Ziel anders — derselbe
 * Wert liefert fuer alle vier Ziele dasselbe Ergebnis, und ein Test nagelt das fest.
 * SIE IST DESHALB KEINE NEUNTE ZIEL-GESCHLUESSELTE STELLE: Sie traegt keinen
 * Zielwert, keine Ziel-Liste und keinen Record ueber Ziele. Erst wenn sie
 * unterscheidend wird, ist die ACHT-Zaehlung im Kopf von tracking/target-adapters.ts
 * nachzuziehen — jener Kopf hat seine Zahl bereits ZWEIMAL falsch gefuehrt (er
 * korrigiert eine alte SECHS selbst), und wer das uebersieht, hinterlaesst die dritte.
 *
 * `unknown` beim Wert, GENAU WIE BEIM PRIMITIV: Die Quelle ist ein
 * Einstellungs-Blob aus der Datenbank, also nicht typgesichert. Eine Verengung auf
 * `string` hier waere eine Zusicherung, die diese Funktion nicht geben kann.
 */
export function hasTargetPixelId(
  pixelId: unknown,
  // DIE DIREKTIVE UNTERDRUECKT KEINEN FEHLER, SIE SCHUETZT EINEN ORT — drei Dinge
  // gehoeren dazu, und ohne den dritten macht die naechste Runde das Falsche:
  //
  // (1) WARUM DER PARAMETER DASTEHT: Er ist der Grund, warum diese Funktion HIER
  //     lebt und nicht in tracking/target-readiness.ts. Jene Datei definiert sich
  //     woertlich als ZIEL-BLIND; ein Ziel ueberhaupt zu FUEHREN ist dort
  //     ausgeschlossen. WER IHN STREICHT, STREICHT MIT IHM DEN ORT — die Funktion
  //     waere danach vom Primitiv nicht mehr zu unterscheiden.
  // (2) ER WIRD BENUTZT, sobald das Urteil je Ziel verschieden ausfaellt (11.1d) —
  //     und zwar OHNE dass ein einziger Aufrufer sich aendert. Genau dafuer steht
  //     er heute schon da.
  //     NACHGEZOGEN 11.1d, NICHT GESTEMPELT — der Wortlaut oben bleibt lesbar, die
  //     Richtigstellung tritt daneben: 11.1d hat den Parameter NICHT benutzt. Das
  //     Urteil ueber die Auslieferfaehigkeit ist ein ZWEITES, ziel-generisches
  //     Praedikat geworden (isTargetDeliverable oben), weil die Zuordnung diese
  //     Funktion gar nicht erreicht: alle drei Aufrufer schicken einen SKALAR.
  //     DIE AUSSAGEN (1) UND (3) SIND UNBERUEHRT, nur der ZEITPUNKT in (2) ist ein
  //     anderer — der Waechter schlaegt an, sobald IRGENDEINE Scheibe den Parameter
  //     benutzt, nicht diese. WER HIER KEINE eslint-Meldung SIEHT und daraus
  //     schliesst, die Direktive sei ueberfluessig, streicht sie zu frueh und mit
  //     ihr den Ort dieser Funktion.
  // (3) DER WAECHTER, UND ER IST DER WICHTIGSTE SATZ HIER: Sobald (2) eintritt,
  //     meldet ESLint DIESE DIREKTIVE selbst als ueberfluessig ("Unused
  //     eslint-disable directive"). Sie ist damit KEIN stiller Kommentar, sondern
  //     etwas, das anschlaegt — und sie gehoert DANN entfernt, nicht der
  //     Parameter. Wer die Meldung als Fehler liest, dreht die Scheibe zurueck.
  //
  // ERSTE FUNDSTELLE DIESER ART IM REPO (GEMESSEN 2026-08-18: keine einzige
  // eslint-disable-Zeile fuer no-unused-vars in src/). Das steht hier, damit die
  // Form nicht als etablierte Gewohnheit gelesen und beim naechsten ungenutzten
  // Parameter abgeschrieben wird.
  // KEIN UNTERSTRICH-PRAEFIX: Er hilft hier nicht — die Konfiguration traegt kein
  // argsIgnorePattern (GEMESSEN 2026-08-18, Probe mit `_target` gefahren, die
  // Warnung blieb wortgleich stehen).
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  target: TrackingTarget
): boolean {
  return hasPixelId(pixelId);
}

// KEINE UMFORMUNG — die Vorgabe fuer jedes Ziel, dessen Kennung so abgelegt wird,
// wie der Betreiber sie eingibt.
const KENNUNG_UNVERAENDERT = (value: string): string => value;

// BINDESTRICHE UND LEERRAUM FALLEN, SONST NICHTS (Festlegung (6), Scheibe 2 der
// Phase 11.2). Keine Pruefung, keine Ablehnung: Was nach dem Entfernen dasteht,
// geht unveraendert durch — auch wenn es keine Ziffernfolge ist.
//
// DER GRUND: Google Ads zeigt Kundennummern MIT Bindestrichen an, und ein Betreiber
// schreibt ab, was er sieht. Ohne Umformung entstuende ein STILLER Fehlschlag — die
// Anfrage wird abgewiesen, niemand sieht etwas, die Conversion fehlt.
//
// DIE MESSLUECKE ENTSCHEIDET HIER NICHT, und der Satz gehoert an die Fundstelle:
// Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert gemessen
// (docs/ziel-befunde.md, Teil (bt) — der abgewiesene Wert trug Bindestriche UND
// bezeichnete kein echtes Konto). Umgeformt wird nicht, WEIL wir es wissen, sondern
// weil der Ausgang unter BEIDEN Moeglichkeiten gleich gut ist: Waren sie der Grund,
// rettet es den Fall; waren sie es nicht, ist eine Ziffernfolge ohne Bindestriche
// immer noch genau das, was die gelesene Doku verlangt (Teil (j)).
//
// \s DECKT DEN LEERRAUM INNEN MIT AB, und das ist der Punkt gegen ein blosses Trim:
// Ein eingefuegtes "123 456 7890" traegt Leerraum INNEN, und den entfernt kein Trim.
const OHNE_TRENNZEICHEN = (value: string): string => value.replace(/[-\s]/g, "");

/**
 * DIE UMFORMUNG DER OEFFENTLICHEN KENNUNG JE ZIEL — ERSCHOEPFEND (Festlegung (6)).
 *
 * WARUM EIN Record UND KEINE AUFZAEHLUNG: Ein sechstes Ziel erzwingt damit eine
 * ENTSCHEIDUNG, statt stillschweigend die Identitaet zu erben — dieselbe Figur wie
 * bei TARGET_CARDS (components/TargetCard.tsx bzw. tracking/target-cards.ts) und
 * CONSENT_KEY_BY_TARGET (tracking/consent-targets.ts). Eine Aufzaehlung waere vom
 * Compiler NICHT erzwungen, und was er nicht erzwingt, faellt nur auf, wenn jemand
 * daran denkt (Festlegung (6) der Scheibe 3 sagt genau das).
 *
 * WARUM EINE FUNKTIONS-ZUORDNUNG UND KEIN SCHALTER: Ein `Record<…, boolean>`
 * setzte voraus, dass jede kuenftige Umformung DIESELBE ist. Die Frage, die diese
 * Tabelle beantwortet, lautet aber "welche Umformung gilt fuer dieses Ziel" — und
 * die naechste kann eine andere sein.
 *
 * WARUM HIER UND NICHT IN EINEM EIGENEN MODUL (ENTSCHEIDUNG: ARCHITEKT,
 * 2026-08-31): Ein eigenes Modul waere eine WEITERE ziel-geschluesselte Stelle. Der
 * Kopf von tracking/target-adapters.ts zaehlt sie und hat sich dabei zweimal
 * verzaehlt. Diese Tabelle fuegt keinen neuen ORT hinzu — sie steht in der Datei,
 * die die Ablage-Form ohnehin allein kennt.
 *
 * DIE GRENZE, UND SIE GEHOERT AN DIESE STELLE: Die Umformung wirkt NUR IM
 * SCHREIBPFAD. Ein Wert, der auf anderem Weg in den Blob gelangt — ein
 * selbstgebauter saveProject-Aufruf, s. docs/offene-punkte.md, Eintrag 16 —,
 * wird NIE umgeformt und beim Lesen unveraendert angezeigt und weitergereicht. DAS
 * IST KEINE NEUE LUECKE UND NICHTS, WAS HIER ZU BAUEN WAERE; ohne diesen Satz haelt die
 * naechste Runde die Umformung fuer eine Zusicherung ueber den INHALT der Spalte.
 */
const NORMALIZE_PIXEL_ID: Record<TrackingTarget, (value: string) => string> = {
  meta: KENNUNG_UNVERAENDERT,
  pinterest: KENNUNG_UNVERAENDERT,
  tiktok: KENNUNG_UNVERAENDERT,
  linkedin: KENNUNG_UNVERAENDERT,
  google: OHNE_TRENNZEICHEN,
};

/**
 * NUTZT DIESES ZIEL DIE EREIGNIS-ACHSE? — ERSCHOEPFEND, aus demselben Grund wie
 * NORMALIZE_PIXEL_ID darueber (Scheibe 2 der Phase 11.2).
 *
 * SIE BEANTWORTET, WELCHE ZIELE EINE KENNUNG JE EREIGNISTYP TRAGEN und deshalb im
 * Bereich MESSEN einen eigenen Block mit Regel-Feldern bekommen. Bis hierher stand
 * die Antwort als EINZELNE Konstante in components/CodeImporter.tsx
 * (`RULES_TARGET = "linkedin"`); mit dem zweiten Ziel ist sie eine Menge.
 *
 * DIESELBE FORM WIE DIE TABELLE DARUEBER, UND DAS IST ABSICHT: Zwei Formen fuer
 * dieselbe Frage — "was gilt je Ziel" — liefen auseinander, und beim sechsten Ziel
 * erzwaenge die eine eine Entscheidung und die andere nicht.
 *
 * DIE REIHENFOLGE STEHT NICHT HIER. Wer die Ziele in einer Ansicht auflistet,
 * leitet sie aus TRACKING_TARGETS ab (s. eventAxisTargets) — eine eigene Ordnung an
 * dieser Stelle waere eine zweite Wahrheit ueber die Ziel-Reihenfolge.
 */
const USES_EVENT_AXIS: Record<TrackingTarget, boolean> = {
  meta: false,
  pinterest: false,
  tiktok: false,
  // Seit 11.1d: die Conversion-Regel-URN gilt JE EREIGNISTYP.
  linkedin: true,
  // Seit Scheibe 2 der Phase 11.2: productDestinationId ist die Kennung einer
  // Conversion-Action und gilt damit faktisch je Ereignistyp (GELESEN,
  // docs/ziel-befunde.md, Teil (k)/C3 — NICHT gemessen).
  google: true,
};

/**
 * Die Ziele mit Ereignis-Achse, IN DER ORDNUNG VON TRACKING_TARGETS.
 *
 * ABGELEITET, NICHT FESTGELEGT: Die Reihenfolge kommt aus der Ziel-Liste selbst und
 * ist damit dieselbe wie bei den Karten. Eine eigene Aufzaehlung hier waere eine
 * vierte Wahrheit ueber die Ziel-Ordnung.
 */
export const eventAxisTargets: readonly TrackingTarget[] = TRACKING_TARGETS.filter(
  (target) => USES_EVENT_AXIS[target]
);

// Immutabel + nest-erhaltend: schreibt pixels.<ziel>.pixelId, ohne die Zweige
// ANDERER Ziele anzutasten. Leerer/whitespace Wert wird zu "".
//
// DER TRIM BLEIBT UND GILT WEITER FUER ALLE ZIELE (Scheibe 2 der Phase 11.2). Die
// ziel-spezifische Umformung tritt DAHINTER, nicht an seine Stelle: Fuer die vier
// bestehenden Ziele ist sie die Identitaet, ihr Verhalten ist damit unveraendert.
// WER DEN TRIM DURCH DIE TABELLE ERSETZT, aendert das Verhalten von vier Zielen —
// und zwar still, weil die Identitaet nach nichts aussieht.
//
// DASS DIE UMFORMUNG SICHTBAR IST, ist keine zusaetzliche Mechanik, sondern die
// vorhandene Bauform: Das Eingabefeld ist KONTROLLIERT (value aus getPixelId ueber
// den Container), es zeigt also den ABGELEGTEN Wert. Genau deshalb sitzt die
// Umformung HIER und nicht im Speicherpfad — sonst zeigte das Feld den getippten und
// die Datenbank den umgeformten Wert, und Festlegung (6) waere verletzt.
export function setPixelId(
  settings: ProjectSettings,
  target: TrackingTarget,
  pixelId: string
): ProjectSettings {
  return {
    ...settings,
    pixels: {
      ...settings.pixels,
      [target]: {
        ...settings.pixels?.[target],
        pixelId: NORMALIZE_PIXEL_ID[target](pixelId.trim()),
      },
    },
  };
}

// Immutabel + nest-erhaltend: schreibt EINEN Eintrag der Zuordnung
// pixels.<ziel>.conversionRules, ohne die Zweige ANDERER Ziele, das Feld pixelId
// oder die uebrigen Eintraege anzutasten (Scheibe 11.1d).
//
// SIE STEHT HIER UND NICHT IM CONTAINER, aus demselben Grund wie setPixelId
// darueber: Die verschachtelte Form des Blobs ist Wissen DIESER Datei. Schriebe
// die Komponente den Spread selbst, gaebe es zwei Stellen, die die Nest-Form
// kennen — und die zweite vergaesse beim naechsten Feld einen Zweig.
//
// EIN LEERER WERT ENTFERNT DEN SCHLUESSEL, statt "" abzulegen, und das ist KEIN
// stilles Aufraeumen: Es ist die Ruecknahme einer Eingabe, die der Betreiber
// GERADE SELBST in einem sichtbaren Feld vorgenommen hat. Der Gewinn ist der
// Dirty-Vergleich — tippen und wieder leeren fuehrt exakt auf den Ausgangs-Blob
// zurueck, statt einen Unterschied zu hinterlassen, den settingsEqual meldet und
// den niemand gewollt hat.
// ABGRENZUNG, DIE MITMUSS: Das ist NICHT der verwaiste Eintrag. Ein Eintrag,
// dessen EREIGNISNAME aus dem Schluesselraum verschwindet, wird BEHALTEN — s. die
// Begruendung an hasConversionRules. Hier entfernt der Betreiber einen WERT, den
// er sieht; dort verschwindet ein SCHLUESSEL, den er nicht angefasst hat.
//
// DER WERT WIRD GETRIMMT, DER SCHLUESSEL NIE. Der Trim am Wert spiegelt setPixelId
// (dort ebenso, und getPixelId trimmt beim Lesen). Der Schluessel ist ein
// Ereignisname und bleibt woertlich — s. den Absatz am Typ.
export function setConversionRule(
  settings: ProjectSettings,
  target: TrackingTarget,
  event: string,
  rule: string
): ProjectSettings {
  const rules = { ...getConversionRules(settings, target) };
  const trimmed = rule.trim();
  if (trimmed === "") delete rules[event];
  else rules[event] = trimmed;
  return {
    ...settings,
    pixels: {
      ...settings.pixels,
      [target]: { ...settings.pixels?.[target], conversionRules: rules },
    },
  };
}

// Die getrimmte Meta-Pixel-ID oder "" (nicht gesetzt). EINE Quelle fuer "ist ein
// Pixel konfiguriert?" — Engine-Aufrufer, UI und Dirty-Vergleich ziehen hierdurch.
//
// BLEIBT BESTEHEN, ist aber nur noch der Sonderfall der Funktion darueber. Der
// Grund gehoert dazu: capi/token.ts ruft sie im Aufloesungs-Pfad des Forwards auf
// und ist in dieser Scheibe UNANTASTBAR. Sie hier zu entfernen hiesse, eine Datei
// anzufassen, die diese Scheibe nicht anfassen darf.
export function getMetaPixelId(settings: ProjectSettings): string {
  return getPixelId(settings, "meta");
}

// Immutabel + nest-erhaltend, Sonderfall von setPixelId — s. die Begruendung dort.
export function setMetaPixelId(
  settings: ProjectSettings,
  pixelId: string
): ProjectSettings {
  return setPixelId(settings, "meta", pixelId);
}

// Der oeffentliche trackingKey (getrimmt) oder "" (nicht gesetzt).
export function getTrackingKey(settings: ProjectSettings): string {
  return settings.capi?.trackingKey?.trim() ?? "";
}

// Idempotente Ableitung der server-autoritativen Tracking-Identitaet (Phase 8 Scheibe
// 2b-0): existierender Spaltenwert wird 1:1 BEHALTEN, nur bei Abwesenheit frisch
// erzeugt ('||' short-circuited -> kein randomUUID bei vorhandenem Key). Bewusst
// settings-AGNOSTISCH: nimmt den ROHEN Spaltenwert (projects.tracking_key), nicht
// ProjectSettings — die Spalte ist die Autoritaet, settings nur noch die Client-
// Einbettung. Geteilt von setCapiToken UND publishProject (eine Implementierung).
export function ensureTrackingKey(existing: string | null | undefined): string {
  return existing?.trim() || crypto.randomUUID();
}

// Nicht-sensibler Indikator "CAPI-Token gesetzt?" fuer die write-only-UI.
export function getCapiTokenSet(settings: ProjectSettings): boolean {
  return settings.capi?.tokenSet === true;
}

// Immutabel + pixels-erhaltend: schreibt capi.{trackingKey,tokenSet}, ohne die
// Pixel-Config (oder kuenftige Plattform-Zweige unter pixels) anzutasten. Wird von
// der setCapiToken-Server-Action UND vom Client (Spiegelung nach Erfolg) genutzt.
export function setCapiState(
  settings: ProjectSettings,
  capi: { trackingKey: string; tokenSet: boolean }
): ProjectSettings {
  return {
    ...settings,
    capi: { ...settings.capi, ...capi },
  };
}

// Das oeffentliche Hosting-Label (getrimmt) oder "" (noch nie publiziert). EINE
// Quelle fuer "ist dieses Projekt schon publiziert / welches Label hat es?".
export function getHostingLabel(settings: ProjectSettings): string {
  return settings.hosting?.label?.trim() ?? "";
}

// Immutabel + pixels/capi-erhaltend: schreibt hosting.{label,publishedAt}, ohne die
// anderen Zweige anzutasten. Wird von der publishProject-Server-Action UND vom Client
// (Spiegelung nach Erfolg) genutzt.
export function setHostingState(
  settings: ProjectSettings,
  hosting: { label: string; publishedAt: string }
): ProjectSettings {
  return {
    ...settings,
    hosting: { ...settings.hosting, ...hosting },
  };
}

// Wertgleichheit zweier Zuordnungen — REIHENFOLGE-UNABHAENGIG, wie mappingsEqual
// (lib/mappings.ts) es fuer die Mapping-Menge tut: Ein Blob, der aus der Datenbank
// zurueckkommt, muss seine Schluessel nicht in derselben Reihenfolge tragen wie der
// im Speicher gebaute, und eine Umsortierung ist keine Aenderung.
// NICHT EXPORTIERT: Sie hat genau einen Aufrufer, und ein zweiter Konsument
// braeuchte zuerst eine Aussage darueber, WELCHE Frage er stellt.
function conversionRulesEqual(
  a: Record<string, string>,
  b: Record<string, string>
): boolean {
  const keysA = Object.keys(a);
  if (keysA.length !== Object.keys(b).length) return false;
  return keysA.every(
    (k) => Object.prototype.hasOwnProperty.call(b, k) && a[k] === b[k]
  );
}

// Dirty-Vergleich. BEWUSST eng: nur die Pixel-IDs existieren als user-editierbare
// Felder im grossen Speichern-Flow. capi.* ist HIER ABSICHTLICH AUSGENOMMEN: es wird
// nicht ueber den Dirty-/Big-Save-Weg gepflegt, sondern von seiner eigenen
// Sofort-Persist-Action (setCapiToken) geschrieben und danach in settings UND
// savedSettings gespiegelt -> ohne Ausschluss gaebe es einen false-dirty-Alarm.
// hosting.* ist AUS DEMSELBEN Grund ausgenommen: von publishProject geschrieben +
// in settings/savedSettings gespiegelt, kein Big-Save-Feld.
//
// UEBER ALLE ZIELE, seit Phase 11 Scheibe 6. Der Kommentar hier sagte
// "Weitere user-editierbare Plattform-Felder wachsen hier mit (je ein Vergleich)" —
// das ist jetzt eingeloest, und zwar als SCHLEIFE statt als weiterer Vergleich, damit
// ein kuenftiges Ziel nicht vergessen werden KANN.
// WAS EIN VERGESSEN GEKOSTET HAETTE, gehoert dazu, sonst wirkt die Schleife wie
// Kosmetik: Der Nutzer aendert die Pixel-ID des zweiten Ziels, der Vergleich meldet
// "nicht dirty", der Speichern-Knopf bleibt inaktiv — und die Eingabe ist beim
// naechsten Projektwechsel weg, ohne Warnung.
// Bestandsverhalten unveraendert: Fuer ein Projekt ohne zweites Ziel liefern beide
// Seiten dort "" und der Vergleich faellt aus wie zuvor.
//
// DIE ZUORDNUNG WIRD MITVERGLICHEN (Scheibe 11.1d), und der Grund ist derselbe wie
// oben, nur eine Ebene tiefer: Ohne diesen Term meldete der Vergleich nach einer
// URN-Eingabe "nicht dirty", der Speichern-Knopf bliebe INAKTIV — und der Wert
// waere beim naechsten Projektwechsel weg, ohne Warnung und ohne Meldung.
// WERTGLEICHHEIT, NICHT REFERENZGLEICHHEIT: Zwei geladene Kopien desselben Blobs
// sind verschiedene Objekte; ein === auf die Records meldete IMMER dirty, und der
// Speichern-Knopf staende dauerhaft scharf.
// DER EINWILLIGUNGS-SCHALTER WIRD MITVERGLICHEN (Phase 11.5, Scheibe 11.5a), und der
// Grund ist derselbe wie bei den zwei Termen darueber, nur an einem neuen Mitglied:
// Ohne diesen Term meldete der Vergleich nach einem Umschalten "nicht dirty" — kein
// Text "Ungespeicherte Aenderungen", kein beforeunload-Waechter, kein confirm beim
// Projektwechsel. DER SCHALTER WAERE BEIM NAECHSTEN PROJEKTWECHSEL WEG, ohne Warnung
// und ohne Meldung.
// SEIT SCHEIBE 11.5d VERGLEICHT DER TERM DEN NORMALISIERTEN WERT, NICHT EINE
// BOOLESCHE PROJEKTION: Mit mehr als zwei Werten waeren zwei Formen unter einer
// Projektion gleich, ein Wechsel zwischen ihnen fuer dirty unsichtbar — derselbe
// stille Verlust wie oben. `===` auf zwei Rueckgaben DERSELBEN Funktion kompiliert
// bei jedem Rueckgabetyp; nichts wuerde rot. Der Test S3 haelt genau das.
//
// WARUM ER NICHT WIE capi UND hosting IGNORIERT WIRD: Jene sind SERVER-SPIEGEL — sie
// werden nach einer Server-Antwort in settings UND savedSettings geschrieben, und ein
// Vergleich darauf erzeugte false-dirty. Der Schalter ist eine EINGABE des Betreibers
// und muss die Warn-Kette genau deshalb ausloesen. Die Ausnahme bleibt je Mitglied
// begruendet; sie ist keine pauschale Regel ueber Nicht-Ziel-Mitglieder.
//
// DIE ALLOWLIST-EIGENSCHAFT DIESER FUNKTION BLEIBT BESTEHEN und ist NICHT durch
// diesen Term geloest: Jedes weitere Top-Level-Mitglied ist hier unsichtbar by
// default, und nichts wird davon rot. Der Test zu DIESEM Term haelt genau ihn, nicht
// die Klasse.
export function settingsEqual(a: ProjectSettings, b: ProjectSettings): boolean {
  return (
    getConsentDialog(a) === getConsentDialog(b) &&
    // DER THEMEN-TERM (Phase 11.13, Scheibe 11.13b; bindende Entscheidung P11.13-6).
    // OHNE IHN GINGE DER WERT STILL VERLOREN: dirty bliebe false, es gaebe keinen Text
    // "Ungespeicherte Aenderungen", keinen beforeunload-Waechter und kein confirm beim
    // Projektwechsel — und nichts wuerde davon rot. Verglichen wird der NORMALISIERTE
    // Wert, damit ein fehlendes Feld und ein geschriebenes "light" gleich sind (kein
    // false-dirty). DREI Tests halten diesen Term, und das ist GEMESSEN statt behauptet
    // (Pflicht-Mutation Mu4, 2026-09-17): TH3 an der reinen Funktion, UI3 und UI4 am
    // Bedienweg. Die erste Vorhersage nannte TH3 als Einzelstueck und war zu eng.
    getConsentTheme(a) === getConsentTheme(b) &&
    // DIE ZWEI FARB-TERME (Phase 11.13, Scheibe 11.13c; bindende Entscheidung P11.13-19).
    // ZWEI SKALARE TERME, KEIN OBJEKTVERGLEICH, und das ist der ganze Punkt: `===` auf
    // zwei Rueckgaben DERSELBEN Funktion kompiliert bei JEDEM Rueckgabetyp. Ein Objekt
    // verglichen sich per REFERENZ — nach jedem setSettings eine neue Referenz und damit
    // dauerhaft dirty, oder bei Mutation am selben Objekt nie dirty —, und NICHTS wuerde
    // davon rot. Verglichen wird der NORMALISIERTE Wert (die Leser-Rueckgabe), damit ein
    // fehlendes Feld auf beiden Seiten gleich ist und kein false-dirty entsteht.
    // OHNE SIE GINGE DER WERT STILL VERLOREN — dieselbe Kette wie beim Themenwert.
    getConsentColorBackground(a) === getConsentColorBackground(b) &&
    getConsentColorText(a) === getConsentColorText(b) &&
    // DER SACHTEXT-TERM (Phase 11.13, Scheibe 11.13d; bindende Entscheidung P11.13-19).
    // EIN SKALARER TERM, KEIN OBJEKTVERGLEICH — dieselbe Bauform und derselbe gemessene
    // Grund wie bei den zwei Farb-Termen. Verglichen wird die NORMALISIERTE Rueckgabe des
    // Lesers, damit ein fehlendes Feld auf beiden Seiten gleich ist und kein false-dirty
    // entsteht; `undefined === undefined` ist dabei der Normalfall und nicht der Rand.
    // OHNE IHN GINGE DER WERT STILL VERLOREN: dirty bliebe false, es gaebe keinen Text
    // "Ungespeicherte Aenderungen", keinen beforeunload-Waechter und kein confirm beim
    // Projektwechsel — und NICHTS wuerde davon rot.
    getConsentText(a) === getConsentText(b) &&
    // DER SPRACH-TERM (Phase 11.13, Scheibe 11.13e; bindende Entscheidung P11.13-37).
    // EIN SKALARER TERM, KEIN OBJEKTVERGLEICH — dieselbe Bauform und derselbe gemessene
    // Grund wie bei den Farb- und dem Sachtext-Term. Verglichen wird die NORMALISIERTE
    // Rueckgabe des Lesers, damit ein fehlendes Feld und ein geschriebenes "de" gleich
    // sind und kein false-dirty entsteht.
    // OHNE IHN GINGE DER WERT STILL VERLOREN: dirty bliebe false, es gaebe keinen Text
    // "Ungespeicherte Aenderungen", keinen beforeunload-Waechter und kein confirm beim
    // Projektwechsel — und NICHTS wuerde davon rot. Das ist der Befund, den Vorrat
    // P11.13-1 als KLASSE fuehrt; dieser Term loest ihn fuer die Sprache, nicht fuer die
    // Klasse.
    getConsentLanguage(a) === getConsentLanguage(b) &&
    // DER SNIPPET-TERM (Phase 11.6, Scheibe 11.6a; Entscheidung P11.6-3).
    // EIN SKALARER TERM, KEIN OBJEKTVERGLEICH — dieselbe Bauform und derselbe gemessene
    // Grund wie bei den Farb- und dem Sprach-Term darueber. Verglichen wird DESHALB
    // getCustomPixelCodeRaw und NICHT getCustomPixelCode: jener liefert ein Objekt, und
    // `===` darauf vergliche Referenzen.
    // OHNE IHN GINGE DER WERT STILL VERLOREN: dirty bliebe false, es gaebe keinen Text
    // "Ungespeicherte Aenderungen", keinen beforeunload-Waechter und kein confirm beim
    // Projektwechsel — der eingetippte Tracking-Code waere beim naechsten Projektwechsel
    // weg, ohne Warnung. DAS IST DER EINGETRETENE TRIGGER des offenen Punktes
    // "settingsEqual IST EINE ALLOWLIST"; dieser Term loest ihn fuer DIESES Mitglied,
    // nicht fuer die Klasse.
    getCustomPixelCodeRaw(a) === getCustomPixelCodeRaw(b) &&
    TRACKING_TARGETS.every(
      (t) =>
        getPixelId(a, t) === getPixelId(b, t) &&
        conversionRulesEqual(getConversionRules(a, t), getConversionRules(b, t))
    )
  );
}

/**
 * DIE GEBAUTEN WERTE DES EINWILLIGUNGS-SCHALTERS (Phase 11.5, Scheiben 11.5d und 11.5d-2).
 * "off" = keine Oberflaeche; "bar" = die Einwilligungs-Leiste am unteren Rand;
 * "modal" = das Fenster in der Mitte ueber einer Abdunkelung.
 * EIN WERT STEHT HIER ERST, WENN SEIN BLOCK GEBAUT IST — das Bedienelement bietet
 * genau diese Werte an, und ein Wert ohne Block wuerde beim Veroeffentlichen
 * verweigert. Welche Bloecke ein Wert traegt, entscheidet allein consentBlocksFor in
 * src/lib/analytics/pageview-emitter.ts; ein neuer Wert hier macht dort den
 * `never`-Zweig zum Compiler-Fehler.
 * KEIN WERT TRAEGT JE DAS PRAEFIX `__ps_` — der Namensraum gehoert eigenen Kennungen im
 * ausgelieferten Text. Deshalb dient ein `__ps_`-Wert in den Tests als Beleg fuer einen
 * unbekannten Wert. DAS IST EINE PLAN-SETZUNG (Bau-Plan der Scheibe 11.5d-2), KEINE
 * BESTANDSREGEL: Vorher stand sie nirgends.
 */
export const CONSENT_DIALOGS = ["off", "bar", "modal"] as const;
export type ConsentDialog = (typeof CONSENT_DIALOGS)[number];

/**
 * Ergebnis des Lesers: ein gebauter Wert ODER "unknown".
 * "unknown" IST EIN EIGENER AUSGANG UND WIRD NIE AUF "off" ABGEBILDET: Sonst saehe
 * publishProject einen unbekannten Wert nie, und die Verweigerung waere toter Code.
 * "Unbekannt -> AUS" waere FAIL-OPEN — der Hook bliebe ungesetzt, alle Ziele erlaubt,
 * und niemand merkte es.
 */
export type ConsentDialogRead = ConsentDialog | "unknown";

/**
 * Die Meldung, mit der publishProject bei einem unbekannten Wert abbricht. Sie nennt
 * die Handlung und sagt, dass nichts ausgeliefert wurde.
 */
export const CONSENT_DIALOG_UNKNOWN_MESSAGE =
  "Die Einwilligungs-Einstellung dieses Projekts hat einen unbekannten Wert. Bitte unter „Einwilligung“ neu wählen. Es wurde nichts veröffentlicht.";

/**
 * WELCHE EINWILLIGUNGS-OBERFLAECHE TRAEGT DIE PUBLIZIERTE SEITE? (Phase 11.5, Scheibe
 * 11.5d) — der EINZIGE Leser des Schalters.
 *
 * DIE VORRANG-REGEL IST DIE REIHENFOLGE DER ZWEI ZWEIGE:
 * 1. `dialog` ist da (`!== undefined`): "off", "bar" und "modal" gelten, JEDER andere
 *    Wert — auch null, "BAR", "", true, 1 — ist "unknown".
 * 2. Sonst ALTBESTAND: `gate === true` heisst "bar", alles andere "off". Das ist die
 *    Strenge von 11.5a unveraendert: ein altes `gate` mit anderem Wert als true
 *    bleibt AUS.
 * WARUM DER NEUE GEWINNT: Der Setzer spreizt den Teil-Blob, und saveProject schreibt
 * den Blob ganz — ein `gate` aus 11.5a bis 11.5c bleibt also auch ohne alten Tab
 * liegen und darf gegen die heutige Eingabe nicht entscheiden.
 * DER STANDARD IST AUS, UND ZWAR STRUKTURELL: Ein Projekt ohne beide Mitglieder liest
 * "off" und liefert byte-gleich wie vor 11.5a aus.
 */
export function getConsentDialog(settings: ProjectSettings): ConsentDialogRead {
  const dialog = settings.consent?.dialog;
  if (dialog !== undefined) {
    return dialog === "off" || dialog === "bar" || dialog === "modal"
      ? dialog
      : "unknown";
  }
  return settings.consent?.gate === true ? "bar" : "off";
}

/**
 * Den Einwilligungs-Schalter setzen (Phase 11.5, Scheibe 11.5d). Reine Funktion,
 * gleiche Bauform wie setPixelId: neues Objekt, bestehende Mitglieder unberuehrt.
 *
 * DER WERT WIRD IMMER GESCHRIEBEN, AUCH "off" — statt das Mitglied zu entfernen. Nur
 * ein geschriebenes "off" gewinnt gegen ein liegengebliebenes `gate: true`.
 * `gate` WIRD NICHT ANGEFASST: Der Leser entscheidet ueber den Vorrang, der Setzer
 * raeumt nichts auf.
 */
export function setConsentDialog(
  settings: ProjectSettings,
  mode: ConsentDialog
): ProjectSettings {
  return {
    ...settings,
    consent: {
      ...settings.consent,
      dialog: mode,
    },
  };
}

/**
 * DIE GEBAUTEN WERTE DER DARSTELLUNG (Phase 11.13, Scheiben 11.13b und 11.13c; bindende
 * Entscheidungen P11.13-6 und P11.13-12). "light" = das Stylesheet, das der Dialog seit
 * Phase 11.5 traegt; "dark" = dasselbe plus reine Farb-Ueberschreibungen; "auto" = "light"
 * plus dieselben Ueberschreibungen in einer @media-Regel auf `prefers-color-scheme: dark`;
 * "custom" = "light" plus ERZEUGTE Ueberschreibungen aus den zwei freien Farben.
 * DER VIERTE WERT IST EINE VIERTE DARSTELLUNG UND KEIN ZWEITER SCHALTER (P11.13-12): Es
 * gibt zu jedem Zeitpunkt GENAU EINE Darstellung, und "Dunkel PLUS eigene Farben" ist
 * damit kein darstellbarer Zustand.
 * NUR "custom" LIEST DIE ZWEI FARBFELDER; die drei uebrigen Werte liefern byte-gleich
 * aus wie vor der Scheibe 11.13c (Invariante Z1 des Zuschnitts).
 * EIN WERT STEHT HIER ERST, WENN SEIN STYLESHEET GEBAUT IST — dieselbe Auflage wie bei
 * CONSENT_DIALOGS, und aus demselben Grund: das Bedienelement bietet genau diese Werte an,
 * und ein Wert ohne Stylesheet wuerde beim Veroeffentlichen verweigert. Welche Zeichen ein
 * Wert traegt, entscheidet allein consentThemeCss in src/lib/tracking/consent-choice.ts;
 * ein neuer Wert hier macht dort den `never`-Zweig zum Compiler-Fehler.
 * KEIN WERT TRAEGT JE DAS PRAEFIX `__ps_` — deshalb dient ein `__ps_`-Wert in den Tests als
 * Beleg fuer einen unbekannten Wert, wie beim Dialogwert.
 */
export const CONSENT_THEMES = ["light", "dark", "auto", "custom"] as const;
export type ConsentTheme = (typeof CONSENT_THEMES)[number];

/**
 * Ergebnis des Lesers: ein gebauter Wert ODER "unknown".
 * "unknown" IST EIN EIGENER AUSGANG UND WIRD NIE AUF "light" ABGEBILDET: Sonst saehe
 * publishProject einen unbekannten Wert nie, und die Verweigerung waere toter Code —
 * dieselbe Figur wie bei ConsentDialogRead (docs/immer-beachten.md, "EIN UNBEKANNTER
 * KONFIGURATIONSWERT BRICHT LAUT AB", Folge (a)).
 */
export type ConsentThemeRead = ConsentTheme | "unknown";

/**
 * Die Meldung, mit der publishProject bei einem unbekannten THEMENWERT abbricht. Sie ist
 * EIGEN und nicht die des Dialogwerts: Sie nennt einen anderen Bereich der Oberflaeche,
 * und ein Betreiber, der die falsche Stelle sucht, findet nichts.
 */
export const CONSENT_THEME_UNKNOWN_MESSAGE =
  "Die Darstellung des Einwilligungs-Dialogs hat einen unbekannten Wert. Bitte unter „Darstellung“ neu wählen. Es wurde nichts veröffentlicht.";

/**
 * WELCHE DARSTELLUNG TRAEGT DIE AUSGELIEFERTE OBERFLAECHE? (Phase 11.13, Scheibe 11.13b) —
 * der EINZIGE Leser des Themenwerts.
 *
 * DREI AUSGAENGE, in dieser Reihenfolge:
 * 1. Das Feld FEHLT (`undefined`) -> "light". Ein Projekt aus der Zeit vor dieser Scheibe
 *    liest damit "light" und liefert byte-gleich aus wie zuvor — das ist die tragende
 *    Invariante der Scheibe und nicht bloss ein Vorgabewert.
 * 2. Ein GEBAUTER Wert -> er selbst.
 * 3. JEDER andere Wert — auch null, "", "LIGHT", true, 1 -> "unknown".
 * KEIN RUECKFALL AUF "light": s. den Docblock von ConsentThemeRead.
 */
export function getConsentTheme(settings: ProjectSettings): ConsentThemeRead {
  const theme = settings.consent?.theme;
  if (theme === undefined) return "light";
  return theme === "light" ||
    theme === "dark" ||
    theme === "auto" ||
    theme === "custom"
    ? theme
    : "unknown";
}

/**
 * Die Darstellung setzen (Phase 11.13, Scheibe 11.13b). Reine Funktion, gleiche Bauform wie
 * setConsentDialog: neues Objekt, bestehende Mitglieder unberuehrt.
 * DER WERT WIRD IMMER GESCHRIEBEN, AUCH "light" — so ueberschreibt eine bewusste Wahl einen
 * liegengebliebenen unbekannten Wert. `dialog` und `gate` werden NICHT angefasst.
 */
export function setConsentTheme(
  settings: ProjectSettings,
  theme: ConsentTheme
): ProjectSettings {
  return {
    ...settings,
    consent: {
      ...settings.consent,
      theme,
    },
  };
}

/**
 * DAS FORMAT-TOR DER ZWEI FREIEN FARBEN (Phase 11.13, Scheibe 11.13c; bindende
 * Entscheidung P11.13-14). ZUGELASSEN IST AUSSCHLIESSLICH `^#[0-9a-f]{6}$` — keine
 * Kurzform, keine Grossbuchstaben, keine Namen, kein rgb(), kein Alpha. UND KEINE
 * NORMALISIERUNG: Ein Wert, der nur nach Umformung passte, wird ABGEWIESEN.
 *
 * DER GRUND IST KEIN GESCHMACK, SONDERN DER DREI-EBENEN-BEFUND (VERMERK P11.13-5): Der
 * Wert landet in CSS INNERHALB eines JS-String-Literals INNERHALB des Rohtexts eines
 * <script>-Elements. JSON.stringify deckt NUR die mittlere Ebene — es maskiert weder `;`
 * noch `}` noch `<`. EIN ALPHABET AUS `#` UND SECHZEHN HEX-ZEICHEN ENTHAELT KEIN `;`,
 * KEIN `}`, KEIN `{`, KEIN `/`, KEIN `(` UND KEIN `<`; es deckt damit alle drei Ebenen
 * ZUGLEICH, ohne dass irgendwo eine Maskierung richtig sein muss. Eine Maskierung je
 * Ebene waeren drei Stellen, die einzeln falsch werden koennen — ein Alphabet ist eine.
 * WARUM AUCH DIE GROSSBUCHSTABEN FALLEN: Jede zugelassene Schreibvariante ist eine zweite
 * Form desselben Werts und verlangt eine Normalisierung — genau die Umformung, die diese
 * Entscheidung ausschliesst.
 */
export const CONSENT_COLOR_PATTERN = /^#[0-9a-f]{6}$/;

declare const consentColorMarke: unique symbol;

/**
 * DER GEPRUEFTE FARBTYP — OPAK (Phase 11.13, Scheibe 11.13c; bindende Entscheidung
 * P11.13-17). Eine Zeichenkette mit einer Marke, die ausserhalb von readConsentColor
 * nicht herstellbar ist: EIN ROHER `string` IST IHM NICHT ZUWEISBAR, und wer einen an
 * den Erzeuger gibt, bekommt einen COMPILER-FEHLER statt eines Laufzeit-Fehlers.
 * VERWORFEN: ein Huellen-Objekt `{ hex: string }`. Ein roher String kompiliert dort
 * ebenfalls nicht — aber an der Einsetzstelle wird ausgepackt, und dann ist der Wert
 * wieder ein roher String. Der Compiler hoerte genau dort auf zu helfen, wo der Wert in
 * den ausgelieferten Text geht.
 */
export type ConsentColor = string & { readonly [consentColorMarke]: true };

/** Ergebnis des Lesers: eine gepruefte Farbe ODER "unknown". Kein dritter Ausgang. */
export type ConsentColorRead = ConsentColor | "unknown";

/**
 * DIE EINZIGE ZUSICHERUNG DES GEPRUEFTEN TYPS IM GANZEN REPO (bindende Entscheidung
 * P11.13-17), und sie steht UNMITTELBAR HINTER DEM REGEX-TEST.
 *
 * DIE ZAHL EINS IST DIE ZUSAGE, NICHT DIE OPAZITAET: Ein opaker Typ mit zwei
 * Erzeugungsstellen ist kein Tor, sondern ein Tor mit einer Tuer daneben. Wer den Typ an
 * einer zweiten Stelle erzeugt — eine weitere Zusicherung, eine Hilfsfunktion "fuer
 * Tests", ein Konstruktor —, hebt das Format-Tor auf, OHNE DASS EIN GATE ROT WIRD: Der
 * Compiler ist danach zufrieden, und die Pruefung findet nicht mehr statt. Gefangen wird
 * das allein vom Waechter CF1 in settings.test.ts, und der sieht ZEICHEN, nicht Bedeutung
 * — seine Grenze steht an ihm selbst.
 * MEHRERE AUFRUFER SIND AUSDRUECKLICH ZULAESSIG — die zwei Leser unten und der
 * Schreibweg der Oberflaeche rufen alle DIESE Funktion. Eine Pruefstelle, mehrere
 * Aufrufer; das ist die Gestalt, die die Grenze von P11.13-17 vorsieht.
 * KEIN RUECKFALL AUF EINEN VORGABEWERT: Sonst saehe die abbrechende Stelle in
 * publishProject einen ungueltigen Wert nie, und der Abbruch waere toter Code
 * (docs/immer-beachten.md, EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB, Folge (a)).
 */
export function readConsentColor(raw: unknown): ConsentColorRead {
  return typeof raw === "string" && CONSENT_COLOR_PATTERN.test(raw)
    ? (raw as ConsentColor)
    : "unknown";
}

/** Der Hintergrund der eigenen Darstellung, geprueft. Gelesen nur bei theme "custom". */
export function getConsentColorBackground(
  settings: ProjectSettings
): ConsentColorRead {
  return readConsentColor(settings.consent?.colorBackground);
}

/** Die Textfarbe der eigenen Darstellung, geprueft. Gelesen nur bei theme "custom". */
export function getConsentColorText(
  settings: ProjectSettings
): ConsentColorRead {
  return readConsentColor(settings.consent?.colorText);
}

/**
 * DIE ZWEI VORBELEGUNGS-WERTE DES BEDIENELEMENTS (bindende Entscheidung P11.13-22).
 * Sie sind der HEUTIGE HELLE BESTAND — der Betreiber startet bei genau der Darstellung,
 * die er vorher hatte, und sieht die Wirkung erst, wenn er etwas aendert.
 * SIE SIND KEIN VORGABEWERT DES LESERS: readConsentColor faellt NIE auf sie zurueck.
 * Geschrieben werden sie allein beim WECHSEL auf "custom", also auf eine NUTZERHANDLUNG
 * hin, und nur wenn der gespeicherte Wert fehlt oder ungueltig ist.
 *
 * SIE HIESSEN BIS ZUM 2026-09-18 `…_FALLBACK`, UND DER NAME WAR DAS GEGENTEIL DESSEN, WAS
 * SIE SIND: Ein Rueckfall ist eine LESESEITE, die einen ungueltigen Wert unbemerkt in
 * einen gueltigen verwandelt — genau das schliesst Entscheidung P11.13-22 aus. Hier wird
 * auf eine Nutzerhandlung hin GESCHRIEBEN, was der Betreiber danach sieht und aendern
 * kann. Wer dem alten Namen glaubte, baute beim naechsten Mal den stillen Rueckfall ein
 * und berief sich auf diese Konstante.
 */
export const CONSENT_COLOR_BACKGROUND_VORBELEGUNG = "#ffffff";
export const CONSENT_COLOR_TEXT_VORBELEGUNG = "#111827";

/**
 * Die zwei Farben setzen (Phase 11.13, Scheibe 11.13c). Reine Funktion, gleiche Bauform
 * wie setConsentTheme: neues Objekt, bestehende Mitglieder unberuehrt.
 * SIE NIMMT ROHE STRINGS: Der Blob ist ungepruefte Client-Eingabe, und die Pruefung
 * gehoert an den LESER, nicht an den Schreiber — sonst gaebe es zwei Tore.
 * `dialog`, `gate` und `theme` werden NICHT angefasst.
 */
export function setConsentColors(
  settings: ProjectSettings,
  colorBackground: string,
  colorText: string
): ProjectSettings {
  return {
    ...settings,
    consent: {
      ...settings.consent,
      colorBackground,
      colorText,
    },
  };
}

/**
 * Die Meldung, mit der publishProject bei einer ungueltigen oder fehlenden FARBE
 * abbricht. Sie ist EIGEN und nicht die des Themenwerts: Sie nennt einen anderen Bereich
 * der Oberflaeche, und ein Betreiber, der die falsche Stelle sucht, findet nichts.
 */
export const CONSENT_COLORS_UNKNOWN_MESSAGE =
  "Die eigenen Farben des Einwilligungs-Dialogs sind unvollständig oder ungültig. Bitte unter „Darstellung“ beide Farben neu wählen. Es wurde nichts veröffentlicht.";

/**
 * DIE DARSTELLUNG, WIE SIE AN DEN ERZEUGER REIST (Phase 11.13, Scheibe 11.13c; bindende
 * Entscheidung P11.13-18) — EINE DISKRIMINIERTE UNION.
 *
 * DER GRUND: DER UNMOEGLICHE ZUSTAND WIRD UNDARSTELLBAR, NICHT ABGEFANGEN. "Eigene
 * Farben ohne Farben" laesst sich gar nicht erst hinschreiben; es braucht dafuer keinen
 * Laufzeit-Wurf, keine Pruefung und keinen Test. Ein Wurf waere die schwaechere Bauform:
 * Er fienge den Zustand erst, wenn jemand ihn erzeugt hat, und nur auf dem Pfad, den ein
 * Test tatsaechlich laeuft.
 * SIE BLEIBT EIN PFLICHT-PARAMETER OHNE VORGABEWERT an injectPageViewEmitter,
 * buildConsentBarScript und buildConsentModalScript — Entscheidung P11.13-11 gilt
 * unveraendert und wird NICHT ausgedehnt: diese Union aendert die GESTALT des einen
 * Parameters, nicht seine Zahl.
 */
export type ConsentAppearance =
  | { readonly theme: "light" | "dark" | "auto" }
  | {
      readonly theme: "custom";
      readonly background: ConsentColor;
      readonly text: ConsentColor;
    };

// ===================================================================================
// DER FREIE SACHTEXT (Phase 11.13, Scheibe 11.13d; bindende Entscheidungen P11.13-23,
// P11.13-26, P11.13-27 und P11.13-29)
//
// ZUM ABSATZ DARUEBER, damit er nicht als gebrochen gelesen wird: Der Satz "diese Union
// aendert die GESTALT des einen Parameters, nicht seine Zahl" beschreibt die SCHEIBE
// 11.13c und bleibt dafuer richtig. Seit der Scheibe 11.13d tragen die drei Signaturen
// ZWEI Pflicht-Achsen — die Darstellung und den Sachtext (Entscheidung P11.13-29).
// P11.13-11 ist damit erfuellt und nicht gedehnt: sie verlangt "Pflicht-Parameter OHNE
// VORGABEWERT", und beide Achsen erfuellen das einzeln; ueber ihre ZAHL trifft sie keine
// Auflage.
// ===================================================================================

/**
 * DIE OBERGRENZE DES SACHTEXTES, IN UNICODE-CODEPUNKTEN (bindende Entscheidung
 * P11.13-27).
 *
 * PROVENIENZ — ZWEI TEILE, UND SIE HABEN VERSCHIEDENEN RANG. WER SIE ZUSAMMENZIEHT,
 * HAELT EINE SETZUNG FUER EINE MESSUNG:
 *
 * (1) DIE GEMESSENE KANTE IST 416 (CC, 2026-09-18, Playwright/Chromium ueber file://,
 *     360x480, Leiste UND Fenster, ein- UND ausgeklappt, zwei Extreme — ein
 *     ununterbrochener Lauf aus "W" und ein Wechseltext aus "W" und Leerzeichen).
 *     416 haelt, 417 verletzt Entscheidung P11.13-3: Beim FENSTER, Wechseltext,
 *     ausgeklappt steht `scrollHeight` 495 gegen `clientHeight` 446, und der letzte
 *     Knopf liegt ausserhalb des Sichtfensters.
 *
 * (2) GESETZT IST 300 — ARCHITEKT-SETZUNG, rund 28 Prozent Abstand zur Kante als
 *     Reserve fuer Schrift- und Browser-Varianz. DER ABSTAND SELBST IST UNGEMESSEN:
 *     Es gibt keine Messung darueber, wieviel Reserve eine andere Schriftfamilie oder
 *     eine andere Zeichensatz-Ersetzung tatsaechlich braucht. Die Zahl 300 ist damit
 *     eine VORGABE mit einem gemessenen Deckel, keine Messung.
 *     FIREFOX UND WEBKIT SIND AN DIESER ACHSE UNGEMESSEN — die Kante 416 gilt fuer
 *     Chromium, und ob sie dort hoeher oder niedriger liegt, ist nicht erhoben. Genau
 *     dafuer ist der Abstand da, und genau deshalb ist er keine Messung.
 *
 * DAS FENSTER BINDET, NICHT DIE LEISTE — UND DAS IST DAS GEGENTEIL DESSEN, WAS HIER VOR
 * DER PROBE STAND. Die Erwartung lautete: Die Leiste traegt kein `overflow` und kein
 * `max-height`, waechst also nach oben und wandert zuerst ueber den Rand. GEMESSEN IST
 * DAS UMGEKEHRTE: Bei 416 Zeichen steht die Leiste bei `top` 112,69 und hat reichlich
 * Luft; das Fenster steht an seinem Deckel (`max-height`, Hoehe 448 bei `top` 16) und
 * bekommt einen INNEREN Scrollbereich.
 * DER EIGENE SCROLLBEREICH IST ALSO KEIN SCHUTZ, SONDERN DIE URSACHE: Er haelt das
 * Fenster klein und schiebt dafuer ein Bedienelement aus dem Blick — genau das, was
 * Entscheidung P11.13-3 verbietet. Die Leiste waechst stattdessen mit und bleibt
 * vollstaendig sichtbar.
 * WER DIESEN ABSATZ FUER EINE FORMALIE HAELT, SETZT N BEIM NAECHSTEN MAL AN DER LEISTE
 * FEST UND MISST DIE FALSCHE FORM.
 *
 * BEI 300 IST DIESELBE MESSUNG ERNEUT GEFAHREN (CC, 2026-09-18, gleiche Achse):
 * P11.13-3 in allen geprueften Zustaenden erfuellt.
 *
 * SIE IST KEIN SICHERHEITS-MITTEL. Die Ausbruchsfrage traegt der Einbettungs-Helfer
 * (lib/script-embed.ts, Entscheidung P11.13-25), das Zeichen-Tor steht unten. N ist eine
 * GEOMETRIE-Grenze; wer sie als Riegel gegen feindliche Eingabe liest, haelt eine Zahl
 * fuer einen Schutz.
 *
 * SIE KIPPT MIT DER GEOMETRIE, AUF DER SIE RUHT — die Leiste bekommt einen eigenen
 * Scrollbereich, die Knopfbreite aendert sich, die Schriftgroesse aendert sich, oder die
 * eingeklappte Gestalt bricht anders um. Dieselbe Bedingung wie bei P11.13-5: N ist keine
 * Eigenschaft des Textes, sondern des Behaelters.
 */
export const CONSENT_TEXT_MAX_LENGTH = 300;

/**
 * DIE LAENGE EINES SACHTEXTES IN UNICODE-CODEPUNKTEN (bindende Entscheidung P11.13-27).
 *
 * `"…".length` zaehlt UTF-16-EINHEITEN und waere fuer ein Emoji oder ein Zeichen
 * ausserhalb der Grundebene ZWEI, obwohl der Betreiber EIN Zeichen sieht. Eine Grenze,
 * die etwas anderes zaehlt als der Mensch vor dem Feld, erzeugt einen Streit, den niemand
 * gewinnt.
 *
 * DAS TOR UND DER ZEICHENZAEHLER DER OBERFLAECHE RUFEN DIESE FUNKTION — eine Stelle, zwei
 * Aufrufer (docs/immer-beachten.md, ABLEITEN STATT HARDCODEN). DER GRUND IST NICHT
 * SPARSAMKEIT: Zwei Zaehlungen liefen auseinander, und zwar STILL — die Oberflaeche
 * zeigte eine Zahl, das Tor wiese ab, und der Betreiber saehe eine Anzeige, die seine
 * Ablehnung nicht erklaert. Der Zaehler ist damit kein Anzeige-Detail, sondern die
 * sichtbare Seite des Tors.
 */
export function consentTextLength(value: string): number {
  return codepointLength(value);
}

/**
 * DIE LAENGE IN UNICODE-CODEPUNKTEN — DER EINE ZAEHLER (Phase 11.6, Scheibe 11.6a).
 *
 * WARUM ER AUS consentTextLength HERAUSGEZOGEN IST UND NICHT DANEBEN NEU GESCHRIEBEN:
 * Die Scheibe 11.6a braucht dieselbe Zaehlung fuer den Betreiber-Snippet und die
 * Ereigniszeile. Ein zweiter Zaehler mit demselben Rumpf waere die zweite Wahrheit, die
 * dieses Projekt an mehreren Stellen als Fehlerklasse fuehrt; ein Aufruf des
 * consent-BENANNTEN Zaehlers aus dem Custom-Pixel waere eine Namensluege.
 *
 * consentTextLength BLEIBT ALS NAME BESTEHEN und ruft ihn nur — sein Docblock begruendet,
 * warum das Tor und der Zaehler der Oberflaeche DIESELBE Funktion rufen muessen, und
 * jene Begruendung wird hier NICHT verdoppelt.
 *
 * DAS VERHALTEN IST UNVERAENDERT: derselbe Rumpf, nur an einem Ort. `"…".length` zaehlt
 * UTF-16-EINHEITEN und waere fuer ein Emoji ZWEI, obwohl der Mensch EINS sieht.
 */
export function codepointLength(value: string): number {
  return [...value].length;
}

/**
 * DAS ZEICHEN-TOR DES SACHTEXTES (bindende Entscheidung P11.13-26).
 *
 * VERBOTEN SIND: C0-Steuerzeichen EINSCHLIESSLICH Zeilenumbruch und Tabulator, DEL,
 * C1-Steuerzeichen, U+2028 und U+2029 sowie die Bidi-Steuerzeichen U+202A bis U+202E und
 * U+2066 bis U+2069.
 *
 * `<` IST AUSDRUECKLICH ERLAUBT — dafuer ist der Einbettungs-Helfer da (P11.13-25). Ein
 * Verbot waere eine dritte Linie an einer Stelle, die schon zwei hat, und es naehme dem
 * Betreiber einen Satz wie "Wir setzen <3 Cookies" ohne jeden Gewinn.
 *
 * WARUM DIE STEUERZEICHEN TROTZDEM FALLEN, obwohl JSON.stringify sie maskiert: SIE SIND
 * NICHT GEFAEHRLICH, SONDERN UNSICHTBAR. U+2028 bricht in alten Laufzeiten ein
 * JS-Literal; die Bidi-Zeichen koennen den ANGEZEIGTEN Satz gegen den gespeicherten
 * kehren — der Betreiber liest im Feld etwas anderes, als der Besucher sieht. Ein
 * Zeichen, dessen Wirkung man im Eingabefeld nicht sehen kann, gehoert nicht in einen
 * Text, der fuer einen anderen gebaut wird.
 *
 * DIE CODEPUNKTE STEHEN ALS ZAHLEN UND NICHT ALS UNICODE-ESCAPES IM QUELLTEXT. Das ist
 * kein Stil: Ein Unicode-Escape im Quelltext dieses Projekts ist am 2026-09-18 mehrfach
 * STILL in sein Zeichen verwandelt worden, und bei U+0000 waere das Ergebnis ein NUL-Byte
 * in einer Quelldatei, das kein Gate meldet (docs/immer-beachten.md, `grep` TAUGT IN
 * DIESER UMGEBUNG WEDER FUER DAS CR NOCH FUER DAS NUL). Eine Zahl kann kein Werkzeug
 * umdeuten.
 *
 * `for…of` ITERIERT UEBER CODEPUNKTE, nicht ueber UTF-16-Einheiten — dieselbe Achse wie
 * consentTextLength.
 */
function hatVerbotenesZeichen(value: string): boolean {
  for (const zeichen of value) {
    const c = zeichen.codePointAt(0) as number;
    if (c <= 0x1f) return true;
    if (c === 0x7f) return true;
    if (c >= 0x80 && c <= 0x9f) return true;
    if (c === 0x2028 || c === 0x2029) return true;
    if (c >= 0x202a && c <= 0x202e) return true;
    if (c >= 0x2066 && c <= 0x2069) return true;
  }
  return false;
}

/**
 * DER GRUND, AUS DEM EIN SACHTEXT ABGEWIESEN WIRD — oder `null`, wenn er durchgeht.
 *
 * SIE IST DIE EINZIGE PRUEFUNG, UND readConsentText RUFT SIE. Damit koennen die
 * Oberflaeche (die den GRUND anzeigen muss) und das Tor (das nur ja/nein braucht) NICHT
 * auseinanderlaufen — es gibt eine Bedingung, nicht zwei gleichlautende.
 * SIE ERZEUGT KEINEN GEPRUEFTEN TYP: Die eine Zusicherung steht in readConsentText und
 * nirgends sonst (Entscheidung P11.13-17, Waechter CT-A1).
 *
 * DAS TOR PRUEFT MIT `trim`, ES VERAENDERT ABER NICHTS (Entscheidung P11.13-26):
 * Ausgeliefert wird der GESPEICHERTE Wert zeichengleich; fuehrender und nachgestellter
 * Leerraum bleibt drin, wenn der Betreiber ihn getippt hat. `trim` ist ausschliesslich das
 * Mittel, mit dem die Frage "ist hier ueberhaupt etwas?" beantwortet wird.
 * DAMIT IST DIE AUFLAGE AUS P11.13-14 ERFUELLT UND NICHT BLOSS BENACHBART: "Ein Wert, der
 * nur nach Umformung passte, wird abgewiesen, nicht zurechtgebogen" — es GIBT hier keinen
 * solchen Wert, weil keine Umformung stattfindet. Ein Text aus lauter Leerzeichen wird
 * ABGEWIESEN, nicht zu einem leeren String zurechtgebogen.
 * DIE LAENGE WIRD AM ROHEN WERT GEMESSEN, nicht am getrimmten: ausgeliefert wird der rohe.
 */
export function consentTextProblem(
  raw: unknown
): "kein_string" | "leer" | "zeichen" | "laenge" | null {
  if (typeof raw !== "string") return "kein_string";
  if (raw.trim() === "") return "leer";
  if (hatVerbotenesZeichen(raw)) return "zeichen";
  if (consentTextLength(raw) > CONSENT_TEXT_MAX_LENGTH) return "laenge";
  return null;
}

declare const consentTextMarke: unique symbol;

/**
 * DER GEPRUEFTE SACHTEXT — OPAK (bindende Entscheidung P11.13-17, Bauform von
 * ConsentColor). Ein roher `string` ist ihm NICHT zuweisbar; wer einen an einen Erzeuger
 * gibt, bekommt einen COMPILER-FEHLER statt eines Laufzeit-Fehlers.
 */
export type ConsentText = string & { readonly [consentTextMarke]: true };

/** Ergebnis des Lesers: ein geprueftes Sachtext-Literal ODER "unknown". */
export type ConsentTextRead = ConsentText | "unknown";

/**
 * DIE EINZIGE ZUSICHERUNG DES GEPRUEFTEN SACHTEXT-TYPS IM GANZEN REPO (Entscheidung
 * P11.13-17), unmittelbar hinter der Pruefung. Waechter: CT-A1 in settings.test.ts.
 * KEIN RUECKFALL auf den Standardtext: Sonst saehe die abbrechende Stelle in
 * publishProject einen ungueltigen Wert nie, und der Abbruch waere toter Code
 * (docs/immer-beachten.md, EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB, Folge (a)).
 */
export function readConsentText(raw: unknown): ConsentTextRead {
  return consentTextProblem(raw) === null ? (raw as ConsentText) : "unknown";
}

/**
 * DER SACHTEXT EINES PROJEKTS — `undefined`, WENN DAS FELD FEHLT.
 *
 * DIE DREI AUSGAENGE SIND NICHT ZWEI, UND DAS IST DER GANZE PUNKT (Entscheidung
 * P11.13-26): `undefined` heisst "kein eigener Text, es gilt unser Standardtext" und ist
 * der NORMALFALL — ein bekannter Zustand, kein unbekannter. "unknown" heisst "da steht
 * ein WERT, und er taugt nicht" und fuehrt zum Abbruch. EIN GESPEICHERTER LEERER STRING
 * IST "unknown", NICHT `undefined`: Er ist ein Wert, und ein Wert, der nichts bedeutet,
 * wird nicht stillschweigend gedeutet. Die Oberflaeche loest das, indem ein geleertes
 * Feld den Wert ENTFERNT, statt ihn zu leeren.
 */
export function getConsentText(
  settings: ProjectSettings
): ConsentTextRead | undefined {
  const raw = settings.consent?.text;
  return raw === undefined ? undefined : readConsentText(raw);
}

/**
 * Den Sachtext setzen — oder mit `undefined` ENTFERNEN (Entscheidung P11.13-26). Reine
 * Funktion, gleiche Bauform wie setConsentTheme und setConsentColors: neues Objekt,
 * bestehende Mitglieder unberuehrt.
 * SIE NIMMT EINEN ROHEN STRING: Der Blob ist ungepruefte Client-Eingabe, und die Pruefung
 * gehoert an den LESER, nicht an den Schreiber — sonst gaebe es zwei Tore.
 * DAS ENTFERNEN IST EIN EIGENER AUSGANG UND KEIN LEERER STRING: Ein geschriebener leerer
 * String waere "unknown" und sperrte das Veroeffentlichen; gemeint ist aber "nimm wieder
 * unseren Satz".
 */
export function setConsentText(
  settings: ProjectSettings,
  value: string | undefined
): ProjectSettings {
  const consent = { ...settings.consent };
  if (value === undefined) delete consent.text;
  else consent.text = value;
  return { ...settings, consent };
}

/**
 * Die Meldung, mit der publishProject bei einem ungueltigen SACHTEXT abbricht. Sie ist
 * EIGEN und nicht die des Themenwerts oder der Farben: Sie nennt einen anderen Platz der
 * Oberflaeche, und ein Betreiber, der die falsche Stelle sucht, findet nichts.
 * SIE BEHAUPTET WEDER URSACHE NOCH RECHTSFOLGE und nennt den Ausgang: nichts
 * veroeffentlicht.
 */
export const CONSENT_TEXT_UNKNOWN_MESSAGE =
  "Der eigene Text des Einwilligungs-Dialogs ist ungültig. Bitte unter „Darstellung“ einen Text ohne Steuerzeichen und innerhalb der Längengrenze eingeben oder das Feld leeren. Es wurde nichts veröffentlicht.";

/**
 * DER SACHTEXT, WIE ER AN DEN ERZEUGER REIST (bindende Entscheidung P11.13-29) — die
 * ZWEITE Pflicht-Achse an injectPageViewEmitter, buildConsentBarScript und
 * buildConsentModalScript.
 *
 * "standard" IST EIN BENANNTER ZUSTAND UND KEIN FEHLENDES ARGUMENT. Der Aufrufer muss
 * sich entscheiden; ein Vergessen ist ein tsc-Fehler, keine stille Auslieferung unseres
 * Satzes. EIN `= CONSENT_TEXT` AN EINER SIGNATUR IST AUSGESCHLOSSEN (P11.13-11): Es
 * liesse einen kuenftigen Auslieferungsweg den Betreiber-Satz stillschweigend uebergehen.
 * VERWORFEN: `ConsentText | null` — `null` benennt nichts und laesst den naechsten Leser
 * raten, ob "kein Text", "nicht gesetzt" oder "absichtlich leer" gemeint ist.
 * WELCHER SATZ "standard" IST, WEISS ALLEIN DER ERZEUGER. SEIT DER SCHEIBE 11.13e HAENGT
 * ER AN DER SPRACHE: `consentTexts(sprache).sachtext` in tracking/consent-texts.ts
 * (bindende Entscheidung P11.13-34). Wuerde der Aufrufer ihn einsetzen, staende die
 * Zuordnung an zwei Orten — auch das ist ausdruecklich verworfen.
 * RICHTIGGESTELLT IN SCHEIBE 11.13e, NICHT GESTEMPELT: Hier stand "CONSENT_TEXT in
 * tracking/consent-choice.ts". Die Konstante ist mit dieser Scheibe umgezogen, und ein
 * Massstab mit falscher Ortsangabe taugt nicht als Massstab.
 */
export type ConsentTextArg = ConsentText | "standard";

// ===================================================================================
// DIE SPRACHE (Phase 11.13, Scheibe 11.13e; bindende Entscheidungen P11.13-31 bis -37)
// ===================================================================================

/**
 * DIE ZWEI SPRACHEN DES DIALOGS. Eine FESTE Auswahl, keine Betreiber-Eingabe: Der Wert
 * waehlt einen ZWEIG in consentTexts (tracking/consent-texts.ts), der Rohwert aus dem Blob
 * erreicht den ausgelieferten Text nie (Entscheidung P11.13-33, Bauform aus P11.13-8).
 * EIN DRITTER WERT HIER MACHT DORT DEN `never`-ZWEIG ZUM COMPILER-FEHLER — und er
 * braeuchte elf neue Owner-Freigaben (Entscheidung P11.13-31).
 * KEIN WERT TRAEGT JE DAS PRAEFIX `__ps_`; ein `__ps_`-Wert dient in den Tests deshalb als
 * Beleg fuer einen unbekannten Wert, wie beim Dialog- und beim Themenwert.
 */
export const CONSENT_LANGUAGES = ["de", "en"] as const;
export type ConsentLanguage = (typeof CONSENT_LANGUAGES)[number];

/**
 * Ergebnis des Lesers: eine gebaute Sprache ODER "unknown".
 * "unknown" WIRD NIE AUF "de" ABGEBILDET — sonst saehe publishProject einen unbekannten
 * Wert nie, und die Verweigerung waere toter Code (docs/immer-beachten.md, "EIN
 * UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB", Folge (a)).
 */
export type ConsentLanguageRead = ConsentLanguage | "unknown";

/**
 * Die Meldung, mit der publishProject bei einer unbekannten SPRACHE abbricht. Sie ist
 * EIGEN und nicht die des Themenwerts, der Farben oder des Sachtextes: Sie nennt einen
 * anderen Platz der Oberflaeche, und ein Betreiber, der die falsche Stelle sucht, findet
 * nichts. Sie behauptet weder Ursache noch Rechtsfolge und nennt den Ausgang.
 */
export const CONSENT_LANGUAGE_UNKNOWN_MESSAGE =
  "Die Sprache des Einwilligungs-Dialogs hat einen unbekannten Wert. Bitte unter „Sprache“ neu wählen. Es wurde nichts veröffentlicht.";

/**
 * IN WELCHER SPRACHE STEHT DIE AUSGELIEFERTE OBERFLAECHE? (Scheibe 11.13e) — der EINZIGE
 * Leser des Sprachwerts.
 *
 * DREI AUSGAENGE, in dieser Reihenfolge:
 * 1. Das Feld FEHLT (`undefined`) -> "de". Ein Projekt aus der Zeit vor dieser Scheibe
 *    liest damit "de" und liefert denselben Wortlaut aus wie zuvor. DAS IST KEIN
 *    RUECKFALL IM SINNE DER DAUERREGEL: Es liegt GAR KEIN Wert vor, und ein abwesendes
 *    Feld ist ein bekannter Zustand, kein unbekannter — dieselbe Unterscheidung, die
 *    Entscheidung P11.13-26 fuer den Sachtext zieht.
 * 2. Ein GEBAUTER Wert -> er selbst.
 * 3. JEDER andere Wert — auch null, "", "DE", "de-DE", true, 1 -> "unknown".
 */
export function getConsentLanguage(
  settings: ProjectSettings
): ConsentLanguageRead {
  const language = settings.consent?.language;
  if (language === undefined) return "de";
  return language === "de" || language === "en" ? language : "unknown";
}

/**
 * Die Sprache setzen (Scheibe 11.13e). Reine Funktion, gleiche Bauform wie
 * setConsentTheme: neues Objekt, bestehende Mitglieder unberuehrt.
 * DER WERT WIRD IMMER GESCHRIEBEN, AUCH "de" — so ueberschreibt eine bewusste Wahl einen
 * liegengebliebenen unbekannten Wert.
 */
export function setConsentLanguage(
  settings: ProjectSettings,
  language: ConsentLanguage
): ProjectSettings {
  return {
    ...settings,
    consent: {
      ...settings.consent,
      language,
    },
  };
}

/**
 * DIE HUELLE: DARSTELLUNG, SACHTEXT UND SPRACHE REISEN ALS EIN WERT (bindende Entscheidung
 * P11.13-32; die Grenze von P11.13-29 ist mit der dritten Achse EINGETRETEN).
 *
 * SIE IST DER EINE PARAMETER an injectPageViewEmitter, buildConsentBarScript und
 * buildConsentModalScript. Entscheidung P11.13-11 gilt unveraendert und JE FELD:
 * Pflicht-Parameter OHNE Vorgabewert — hier als DREI Pflicht-Felder ohne `?`.
 *
 * WARUM EINE HUELLE UND NICHT EIN DRITTER PARAMETER: Heute kosten beide dasselbe, weil
 * jede Aufrufstelle ihre Form aendert und der Compiler jede namentlich meldet. BEI DER
 * VIERTEN ACHSE LAUFEN SIE AUSEINANDER — die Huelle bekommt ein FELD, der Parameter-Weg
 * einen erneuten Umbau ALLER Aufrufer.
 *
 * DER EINWAND AUS P11.13-29 ENTFAELLT: Dort war eine Huelle verworfen worden, weil "die
 * Union ihre Diskriminante an einen Traeger verloere". Das trifft diese Gestalt NICHT —
 * `appearance` BLEIBT die Union, wird nur ein Feld, und "eigene Farben ohne Farben" ist
 * weiterhin nicht konstruierbar (Entscheidung P11.13-18).
 *
 * KEIN FELD DARF OPTIONAL WERDEN (Invariante Q6, Grenze von P11.13-32): Ein optionales
 * Feld waere der Vorgabewert durch die Hintertuer und liesse einen kuenftigen
 * Auslieferungsweg eine Achse stillschweigend uebergehen.
 */
export type ConsentPresentation = {
  readonly appearance: ConsentAppearance;
  readonly text: ConsentTextArg;
  readonly language: ConsentLanguage;
};

/* -------------------------------------------------------------------------- *
 * CUSTOM-PIXEL (Phase 11.6, Scheibe 11.6a)
 * -------------------------------------------------------------------------- */

/**
 * DIE OBERGRENZE DES BETREIBER-SNIPPETS, in Unicode-Codepunkten.
 *
 * SIE IST EINE ARCHITEKT-SETZUNG OHNE MESSUNG (Entscheidung P11.6-6, Teil (g)), und das
 * steht hier, damit sie niemand fuer einen Befund haelt. Was GEMESSEN ist, ist nur der
 * Rahmen: Der Wert liegt im `settings`-jsonb und reist bei JEDEM Speichern mit; der
 * HTML-Upload desselben Projekts ist auf 2 MB begrenzt (MAX_UPLOAD_BYTES in lib/upload.ts).
 * 16 000 ist ~0,8 % davon und traegt ein Meta-Basis-Snippet (~1 kB) etwa zehnmal —
 * P11.6-3 laesst ausdruecklich "beliebig viele Netzwerke darin" zu.
 *
 * WER SIE AENDERT, AENDERT EINE SETZUNG, KEINEN BEFUND. Ein Senken trifft bereits
 * ausgelieferte Seiten NICHT (ihr Text ist geschrieben); ein Heben ist frei.
 */
export const CUSTOM_PIXEL_CODE_MAX_LENGTH = 16000;

/**
 * DIE OBERGRENZE EINER EREIGNISZEILE, in Unicode-Codepunkten. Ebenfalls eine
 * ARCHITEKT-SETZUNG OHNE MESSUNG (P11.6-6, Teil (g)).
 *
 * DER GRUND FUER EINE GRENZE UEBERHAUPT IST NICHT DER SPEICHER, SONDERN DER HOTSPOT:
 * Die Zeile geht in den ausgelieferten Text JEDER Seite, und sie steht JE AKTION
 * (P11.6-4) — bei zwanzig Knoepfen zwanzigmal. 2 000 traegt einen Aufruf mit grossem
 * Objektliteral; ein Programm soll hier nicht stehen.
 */
export const TRACK_CODE_MAX_LENGTH = 2000;

/** Warum ein Snippet-Wert unbrauchbar ist — oder `null`, wenn er es nicht ist. */
export type CustomPixelProblem = "kein_string" | "leer" | "laenge";

/**
 * DAS TOR DES BETREIBER-SNIPPETS.
 *
 * ES PRUEFT DEN INHALT NICHT UND SOLL ES NICHT (Entscheidung P11.6-3, NOTAUSGANG): Was
 * der Betreiber eintraegt, ist fremder Code, und wir koennen nicht wissen, was er tut.
 * Geprueft werden AUSSCHLIESSLICH Typ, Anwesenheit und Laenge.
 *
 * KEIN ZEICHEN-TOR wie beim Sachtext (consentTextProblem): Dort sind Zeilenumbruch und
 * Tabulator VERBOTEN, weil ein Sachtext sie nicht braucht. HIER SIND SIE DER NORMALFALL —
 * ein Snippet besteht aus mehreren Zeilen. Wer das Zeichen-Tor hierher kopiert, weist
 * jedes echte Snippet ab.
 *
 * `trim` IST AUSSCHLIESSLICH DAS MITTEL FUER "IST HIER UEBERHAUPT ETWAS?" — ausgeliefert
 * wird der ROHE Wert zeichengleich, und die Laenge wird am rohen gemessen. Dieselbe
 * Auflage wie bei consentTextProblem (P11.13-14: "Ein Wert, der nur nach Umformung
 * passte, wird abgewiesen, nicht zurechtgebogen").
 */
export function customPixelCodeProblem(raw: unknown): CustomPixelProblem | null {
  if (typeof raw !== "string") return "kein_string";
  if (raw.trim() === "") return "leer";
  if (codepointLength(raw) > CUSTOM_PIXEL_CODE_MAX_LENGTH) return "laenge";
  return null;
}

/**
 * DAS TOR EINER EREIGNISZEILE. Gleiche Bauform, andere Grenze.
 *
 * ES IST KEIN SYNTAX-CHECK: Ob die Zeile laeuft, entscheidet erst `new Function` zur
 * Laufzeit — und ein Fehler dort ist gefangen (Invariante I3). Hier faellt nur die
 * Entscheidung, ob die Zeile ueberhaupt in den ausgelieferten Text darf.
 */
export function trackCodeProblem(raw: unknown): CustomPixelProblem | null {
  if (typeof raw !== "string") return "kein_string";
  if (raw.trim() === "") return "leer";
  if (codepointLength(raw) > TRACK_CODE_MAX_LENGTH) return "laenge";
  return null;
}

/**
 * ERGEBNIS DES LESERS — EINE DISKRIMINIERTE UNION, KEIN SENTINEL-STRING.
 *
 * WARUM NICHT `string | "unknown"` WIE BEIM SACHTEXT: Dort ist der gepruefte Wert ein
 * OPAKER Marken-Typ, ein roher `string` ist ihm nicht zuweisbar, und "unknown" kann
 * deshalb nicht mit einem gueltigen Wert kollidieren. HIER IST DER WERT EIN ROHER
 * STRING — ein Betreiber KANN woertlich `unknown` eintragen, und der Sentinel waere dann
 * von einem echten Snippet nicht zu unterscheiden.
 *
 * "none" IST NICHT "unknown": nichts gesetzt ist der NORMALFALL (kein Custom-Pixel) und
 * kein Fehlzustand; ein ungueltiger Wert ist einer und bricht laut ab.
 */
export type CustomPixelCodeRead =
  | { readonly kind: "none" }
  | { readonly kind: "ok"; readonly code: string }
  | { readonly kind: "unknown"; readonly problem: CustomPixelProblem };

/**
 * DER LESER DES BETREIBER-SNIPPETS.
 *
 * EIN UNGUELTIGER WERT WIRD NIE AUF "nicht gesetzt" ABGEBILDET (Dauerregel "EIN
 * UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB, STATT STILL AUF EINEN VORGABEWERT
 * ZURUECKZUFALLEN"): Sonst saehe die abbrechende Stelle in publishProject ihn nie, und
 * der Abbruch waere toter Code.
 * DIE ASYMMETRIE, DIE DIE REGEL TRAEGT, GILT HIER WOERTLICH: Der Preis des Abbruchs
 * trifft den BETREIBER an seinem Rechner, sofort und sichtbar; der Preis eines stillen
 * Rueckfalls traefe den BESUCHER auf der Live-Seite.
 *
 * FEHLT DAS FELD GANZ, IST DAS "none" — kein Custom-Pixel ist der Normalfall.
 */
export function getCustomPixelCode(
  settings: ProjectSettings
): CustomPixelCodeRead {
  const raw = settings.customPixel?.code;
  if (raw === undefined) return { kind: "none" };
  const problem = customPixelCodeProblem(raw);
  if (problem === "leer") return { kind: "none" };
  if (problem !== null) return { kind: "unknown", problem };
  return { kind: "ok", code: raw as string };
}

/**
 * DER ROHE WERT FUER DIE OBERFLAECHE UND FUER settingsEqual — NORMALISIERT AUF EINEN
 * SKALAR.
 *
 * WARUM NICHT getCustomPixelCode IN settingsEqual: Jener liefert ein OBJEKT, und ein
 * `===` darauf vergliche REFERENZEN. Nach jedem setSettings entstuende eine neue
 * Referenz und der Vergleich meldete dauerhaft dirty — die Begruendung steht woertlich
 * an den zwei Farb-Termen in settingsEqual und wird hier nicht verdoppelt.
 *
 * EIN NICHT-STRING WIRD ZU `undefined`: Damit sind zwei Blobs mit verschiedenen
 * Nicht-String-Werten fuer dirty gleich. Das ist bewusst — dirty verfolgt EINGABEN des
 * Betreibers, und die Oberflaeche kann nur Strings erzeugen. Dieselbe Normalisierung
 * leisten getConsentTheme und die Farb-Leser.
 */
export function getCustomPixelCodeRaw(
  settings: ProjectSettings
): string | undefined {
  const raw = settings.customPixel?.code;
  return typeof raw === "string" ? raw : undefined;
}

/**
 * Immutabel + nest-erhaltend: schreibt `customPixel.code`, ohne `pixels`, `capi`,
 * `hosting` oder `consent` anzutasten. Dieselbe Bauform wie setCapiState/setHostingState.
 * EIN LEERER STRING ENTFERNT DAS FELD, statt es zu leeren — so entsteht kein
 * gespeicherter Leerwert, den der Leser als "leer" abweisen muesste (dieselbe Auflage,
 * die die Oberflaeche beim Sachtext traegt).
 */
export function setCustomPixelCode(
  settings: ProjectSettings,
  code: string
): ProjectSettings {
  if (code === "") {
    // DAS FELD WIRD ENTFERNT, NICHT GELEERT — sonst stuende ein gespeicherter Leerwert
    // im Blob, den der Leser als "leer" abweisen muesste. Ein Rest-Objekt ohne den
    // Schluessel ist die einzige Form, die "nichts gesetzt" wirklich bedeutet.
    const rest = { ...settings };
    delete rest.customPixel;
    return rest;
  }
  return { ...settings, customPixel: { ...settings.customPixel, code } };
}

/**
 * Die Meldung, mit der publishProject bei einem unbrauchbaren SNIPPET abbricht.
 * Sie nennt die Achse und den Ort, an dem der Betreiber handeln kann — nicht den
 * internen Namen des Problems.
 */
export const CUSTOM_PIXEL_CODE_INVALID_MESSAGE =
  "Der eigene Tracking-Code ist ungueltig (Text erwartet, hoechstens " +
  `${CUSTOM_PIXEL_CODE_MAX_LENGTH} Zeichen). Bereich "Messen".`;

/**
 * Die Meldung, mit der publishProject bei einer unbrauchbaren EREIGNISZEILE abbricht
 * (Entscheidung P11.6-6, Teil (f)).
 * SIE NENNT KEIN ELEMENT: Der Server kennt die Beschriftung des Knopfes nicht, und eine
 * erfundene Zuordnung waere schlimmer als keine.
 */
export const TRACK_CODE_INVALID_MESSAGE =
  "Eine Ereigniszeile am eigenen Tracking-Code ist ungueltig (Text erwartet, " +
  `hoechstens ${TRACK_CODE_MAX_LENGTH} Zeichen).`;
