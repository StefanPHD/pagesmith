import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getConversionRules,
  getPixelId,
  hasConversionRules,
  hasTargetPixelId,
  TRACKING_TARGETS,
  type ProjectSettings,
  type TrackingTarget,
} from "@/lib/settings";
// DIE BEIDEN BEDINGUNGEN DIESES PFADES STEHEN SEIT PHASE 11 SCHEIBE B1 NICHT MEHR
// HIER, SONDERN IN EINER REINEN DATEI
// (docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 7.5
// "'KONFIGURIERT' WIRD EIN BENANNTER ZUSTAND").
//
// WARUM: SECHS Stellen im Repo beantworten die Frage "ist dieses Ziel konfiguriert
// bzw. lieferfaehig", und sie pruefen dabei VIER verschiedene Dinge. Zwei davon
// widersprechen sich sichtbar — die Oberflaechen-Ableitung meldet konfiguriert,
// sobald eine Geheimnis-Zeile existiert, dieser Pfad verlangt Kennung UND
// Zugangsdatum. Geteilt wird deshalb die SPRACHE der beiden Bedingungen, damit sie
// nicht an zwei Orten getrennt weiterdriften koennen.
//
// ERSETZT, NICHT ERGAENZT: Hier steht nach dieser Scheibe KEINE eigene
// Ausformulierung mehr daneben. Wer eine ergaenzt, hat wieder zwei Wahrheiten.
//
// NUR DIE BEIDEN PRAEDIKATE, NIE EIN ZUSAMMENGESETZTER ZUSTAND — gleichgueltig, wie
// er heisst. Das ist kein Auslassen, sondern am Kontrollfluss begruendet, und die
// Begruendung gilt jeder denkbaren Zusammensetzung, nicht einer bestimmten: Eine
// solche verlangte als dritten Teil "hat dieses Ziel einen Adapter", und diese Datei
// kennt ihn nicht (sie ist server-only und zieht weder TARGET_CARDS noch
// dispatchForward). Und der Geheimnis-WERT existiert hier fuer ein Ziel OHNE Kennung
// gar nicht: gefragt wird nur nach den Zielen, die den Filter unten passiert haben
// (Abfrage-Oekonomie).
// HIER STAND EINMAL DER NAME EINER ZUSAMMENSETZUNG; sie ist gestrichen
// (docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 3.12
// "DIE ZUSAMMENSETZUNG WIRD GESTRICHEN"). Die Regel ist
// dadurch BREITER geworden, nicht schwaecher — sie galt einem Symbol und gilt jetzt
// dem Gegenstand.
// NACHGEZOGEN 11.1c: Von den beiden Bedingungen kommt die KENNUNGS-Haelfte jetzt
// ueber hasTargetPixelId (lib/settings.ts) herein — sie delegiert an dasselbe
// Primitiv, das hier bis dahin direkt stand. Die GEHEIMNIS-Haelfte (hasSecret) ist
// unveraendert und bleibt der einzige Grund fuer diesen Import.
import { hasSecret } from "@/lib/tracking/target-readiness";
// DER ZWEITE DECHIFFRIER-LESER DES REPOS (Scheibe 4 der Phase 11.2). Der erste ist
// refreshAccessToken (lib/oauth/token-refresh.ts) und bleibt der EINZIGE, der ERNEUERT.
// DIE KORREKTUR, DIE DAZUGEHOERT und die im Zuschnitt ausgeschrieben steht: Den
// abgelegten Stand zu LESEN heisst zu DECHIFFRIEREN — secret_enc gibt ohne diese
// beiden kein Zugangsdatum her. Der zweite Leser war nie vermeidbar; vermeidbar war
// die ERNEUERUNG, und die findet hier nicht statt (s. usableTokenFromRow).
import { decryptSecret } from "@/lib/secrets/cipher";
import { parseOAuthPayload } from "@/lib/secrets/oauth-payload";
// NUR DER TYP. Er beschreibt die ZWEITE Uhr und traegt keinen Wert; ein import type
// wird beim Bauen geloescht und erzeugt keine Laufzeit-Abhaengigkeit. Die Datei ist
// selbst server-only, die Richtung ist damit unbedenklich.
import type { RefreshTokenExpiry } from "@/lib/secrets/oauth-payload";

/**
 * Aufloesung EINES trackingKeys (Phase 8 Scheibe 1, ADDITIV erweitert).
 *
 * Frueher gab dieser Resolver nur die CapiConfig zurueck und verwarf die project.id,
 * obwohl sie im selben Lookup ohnehin schon aufgeloest wird. Der Analytics-Persist
 * braucht die project_id als FK -> sie wird jetzt MITGELIEFERT statt weggeworfen.
 * KEINE zweite Query (die /api/e-Schlankheits-Regel bleibt gewahrt).
 *
 * targets ist LEER, wenn das Projekt existiert und NICHT gesperrt ist, aber kein Ziel
 * ein vollstaendiges Paar aus Pixel-ID UND Geheimnis traegt -> der Aufrufer forwarded
 * dann nicht.
 *
 * DIE MENGE (Phase 11, siebte Scheibe) — sie ersetzt das fruehere Einzelfeld
 * capiConfig. Zwei Dinge daran sind Entscheidung, nicht Geschmack:
 * 1. DER FELDNAME WURDE MITGEAENDERT. Bliebe er, uebernaehme der Handler den neuen
 *    Typ STILL — die Umstellung waere dort unsichtbar. Der neue Name macht jede
 *    Lesestelle im Build laut. Das ist der Beleg an ihrer Stelle, kein Test.
 * 2. LEER STATT null. Die Unterscheidung "Projekt nicht aufloesbar" gegen "Projekt
 *    ohne Ziel" bleibt erhalten und liegt jetzt auf ZWEI Ebenen: die Funktion gibt
 *    null (kein Projekt), die Menge ist leer (Projekt ohne Ziel). Der AUFRUFER MUSS
 *    dafuer auf die LAENGE pruefen — eine leere Menge ist truthy, ein blosses
 *    `if (targets)` waere immer wahr und die Forward-Wache damit wirkungslos.
 *
 * blocked (Scheibe 2a): der Kill-Switch-Zustand wird jetzt MITGELIEFERT statt in ein
 * null zu muenden. Grund: mit der Entkopplung persistiert der Ingest auch OHNE
 * CapiConfig -> der Schutz darf kein Nebeneffekt der Config-Kopplung mehr sein, sondern
 * braucht einen EXPLIZITEN Zweig im Handler. blocked_at wird in derselben Projektion
 * ohnehin schon gelesen -> KEINE zweite Query.
 *
 * abTestActive (Scheibe 9b-2): dasselbe Muster ein zweites Mal — EINE Spalte mehr in
 * DERSELBEN Projektion, KEINE zweite Query (die /api/e-Schlankheits-Regel gilt auf dem
 * meistgetroffenen Pfad der Plattform). Der Ingest schreibt events.variant NUR bei
 * aktivem Test; ohne dieses Feld muesste er dafuer nachfragen.
 */
export type TrackingKeyResolution = {
  projectId: string;
  /** true = Projekt gesperrt (Kill-Switch). Der Aufrufer MUSS darauf explizit verzweigen. */
  blocked: boolean;
  /**
   * true = A/B-Test laeuft (projects.ab_test_active, Migration 0017). GATE fuer die
   * Varianten-Dimension in events: ist der Test AUS, wird variant NIE geschrieben —
   * sonst behauptete eine Zeile eine Auslieferung, die es nicht gab (die Route liefert
   * bei inaktivem Test ausnahmslos A), und NULL verloere seine Bedeutung als
   * Testzeitraum-Abgrenzung. Die Werte sind permanent und werden nie transformiert.
   */
  abTestActive: boolean;
  targets: ResolvedTarget[];
  /**
   * DIE ZIELE, DEREN ZUGANGSDATUM ERNEUERT WERDEN SOLLTE (Scheibe 1b-2a).
   *
   * SIE IST IMMER EIN ARRAY, NIE undefined — UND DAS IST EINE ENTSCHEIDUNG GEGEN DIE
   * NACHBARFORM EINE EBENE TIEFER, nicht eine Nachlaessigkeit: conversionRules an
   * ResolvedTarget ist bewusst undefined statt leer, weil toEqual einen Schluessel mit
   * dem Wert undefined IGNORIERT (GEMESSEN 2026-08-18) und ein leeres Objekt an JEDEM
   * Empfaenger die Ganz-Objekt-Vergleiche gebrochen haette.
   * HIER IST GENAU DAS DER ZWECK. ACHTZEHN Laeufe in token.test.ts pinnen die
   * vollstaendige Aufloesung mit toEqual; ein optionales, im Normalfall leeres Feld
   * ginge an ALLEN achtzehn STILL vorbei — der Bestand bliebe gruen, und niemand
   * haette einen Anlass hinzusehen. Ein IMMER gesetztes Array macht das Nachziehen
   * ERZWUNGEN statt erhofft.
   * WER ES SPAETER ZU `renewable?:` VEREINFACHT, SCHALTET DIESE FALLE WIEDER SCHARF.
   * Der Waechter dagegen ist R7 in token.test.ts.
   *
   * SIE TRAEGT KEIN GEHEIMNIS. Weder Zugangsdatum noch Erneuerungs-Token stehen
   * darin; runRefresh (lib/oauth/refresh-run.ts) verlangt nur projectId und target
   * und liest die Zeile selbst. Das ist der Mechanismus hinter der Invariante "das
   * Erneuerungs-Token verlaesst den Resolver nicht" — nicht dieser Satz.
   */
  renewable: RenewableTarget[];
};

/**
 * EIN ZIEL, DESSEN ZUGANGSDATUM ERNEUERT WERDEN SOLLTE — MIT SEINER LAGE.
 *
 * WARUM DIE OEFFENTLICHEN KENNUNGEN MITREISEN: Nach einer Rettung braucht der
 * Aufrufer ein vollstaendiges ResolvedTarget. pixelId und conversionRules stammen aus
 * projects.settings, das NUR in der ersten Datenbank-Runde gelesen wird — ohne sie
 * kostete die Nach-Aufloesung eine ZWEITE projects-Runde statt einer schmalen Lesung
 * auf project_secrets. BEIDE SIND OEFFENTLICHE KENNUNGEN UND KEINE GEHEIMNISSE
 * (s. den Kommentar an CapiConfig.pixelId).
 *
 * WARUM DIE LAGE EIN EIGENES FELD IST: Ohne sie muesste der Aufrufer die Uhr erneut
 * befragen, also eine Angabe ein zweites Mal herstellen, die hier ohnehin schon
 * entschieden ist.
 *  · "expired" — Uhr 1 ist tot, Uhr 2 lebt. Das Ziel steht NICHT in targets; ohne
 *    Rettung sendet es nicht.
 *  · "lead"    — Uhr 1 lebt, liegt aber innerhalb der Schwelle. Das Ziel steht
 *    ZUSAETZLICH in targets und sendet diesen Beacon noch.
 */
export type RenewableTarget = {
  target: TrackingTarget;
  pixelId: string;
  conversionRules?: Record<string, string>;
  lage: "expired" | "lead";
};

/** Ein AUFGELOESTER Empfaenger: sein Ziel-Name plus die vollstaendigen Zugangsdaten. */
export type ResolvedTarget = {
  target: TrackingTarget;
  config: CapiConfig;
  /**
   * DIE ZUORDNUNG EREIGNISNAME -> REGEL-KENNUNG (Scheibe 11.1e), fuer Ziele, deren
   * Kennung JE EREIGNISTYP gilt.
   *
   * EIN ZWEITES, OPTIONALES FELD NEBEN config — NICHT eine Union AN config, und
   * nicht ein Feld an der Aufloesung daneben. Die beiden verworfenen Formen und ihr
   * Preis stehen im Zuschnitt (docs/claude-history/phase-11.1-linkedin.md, Scheibe
   * 11.1e); der Grund in
   * einem Satz: Eine Union machte DREI Uebergaben in dispatchForward (capi/ingest.ts)
   * zu Typfehlern, ein Feld an der Aufloesung trennte die Zuordnung von ihrem
   * EMPFAENGER. CapiConfig bleibt dadurch in Wortlaut UND Form unangetastet.
   *
   * UNDEFINIERT HEISST "TRAEGT KEINE" — UND ES IST NIE EIN LEERES OBJEKT. Der Grund
   * steht an der Paarungsschleife, wo die Umformung geschieht; er ist eine gemessene
   * Tatsache ueber das Pruefwerkzeug und keine Stilfrage.
   *
   * SIE WIRD HIER NUR GETRAGEN, NICHT GEDEUTET: Welche URN zu welchem Ereignis
   * gehoert, entscheidet der Adapter (11.1f). Dieser Pfad reicht die GANZE Zuordnung
   * weiter und normalisiert nichts.
   */
  conversionRules?: Record<string, string>;
};

/**
 * DER ZIELWERT FUER META in der Geheimnis-Tabelle project_secrets (Phase 11
 * Scheibe 1). EINE Quelle fuer den LESE-Filter hier und den SCHREIB-Wert in den
 * Server-Actions — bewusst KEIN Literal an zwei Stellen.
 *
 * WARUM DAS NICHT KOSMETIK IST: Die beiden Seiten scheitern VERSCHIEDEN. Ein
 * falscher Wert im SCHREIB-Pfad prallt am CHECK project_secrets_target_valid ab
 * und ist damit laut. Ein falscher Wert im LESE-Filter findet schlicht keine
 * Zeile — der Resolver liefert capiConfig: null, der Ingest antwortet weiter mit
 * leerer 204, und der Server-Forward stirbt LAUTLOS. Eine geteilte Konstante
 * macht die stille Seite von der lauten abhaengig.
 */
export const META_TARGET = "meta";

/** Serverseitig aufgeloeste CAPI-Konfiguration fuer EIN Projekt. */
export type CapiConfig = {
  // DIE OEFFENTLICHE KENNUNG DES ZIELS (aus settings.pixels.<ziel>.pixelId). Kein
  // Secret, aber serverseitig aufgeloest, damit der Client sie NIE selbst sendet.
  //
  // ERSETZT (Scheibe 2 der Phase 11.2) — HIER STAND "OEFFENTLICHE Meta-Pixel-ID (aus
  // settings.pixels.meta.pixelId)". SACHKORREKTUR, kein Stempel: Das Feld traegt seit
  // Phase 11 die Kennung JEDES aufgeloesten Ziels, nicht Metas — Pinterests
  // Anzeigenkonto-Kennung, TikToks Pixel-ID und ab Scheibe 2 Googles KUNDENNUMMER.
  // "Meta-Pixel-ID" beschrieb den Stand, als es nur ein Ziel gab.
  // WAS "OEFFENTLICH" HEISST UND WAS NICHT: nicht geheim — NICHT "steht im
  // ausgelieferten Snippet". Fuer drei der fuenf Ziele wird kein Tag ausgeliefert; die
  // Kennung reist ausschliesslich in der Nutzlast des Server-Aufrufs. Die
  // gleichlautende Korrektur steht am Typ in lib/settings.ts.
  // DER NAME BLEIBT: capi/ingest.ts uebersetzt diesen Wert beim Uebergeben bereits zu
  // adAccountId — am VERBRAUCHER, ohne den Slot umzubenennen.
  //
  // NACHGETRAGEN 11.1e, NICHT GESTEMPELT — der Satz darueber bleibt lesbar und
  // beschreibt weiterhin den Regelfall; die Ergaenzung tritt daneben:
  // SEIT SCHEIBE 11.1e KANN DIESES FELD LEER SEIN. Ein Ziel, dessen Kennung JE
  // EREIGNISTYP gilt (heute LinkedIn), wird zum Empfaenger, ohne einen Skalar zu
  // tragen — die Paarungsschleife baut dann eine CapiConfig mit pixelId === "".
  // KEIN COMPILER-RIEGEL FAENGT DAS: Der Typ sagt `string`, und "" ist einer.
  //
  // DAS IST DIESELBE KLASSE, MIT DER F2 IN 11.1d VERWORFEN WURDE — ein
  // struktureller Wahrheitsverlust ohne Riegel. Dort ging es um ein polymorphes
  // pixelId, hier um ein leeres; beide Male sieht der Wert gueltig aus und ist es
  // fuer seinen Zweck nicht.
  // WER EINE PRUEFUNG DARAUF BAUT, prueft sie im ADAPTER seines Ziels und nicht
  // hier: Dieser Typ wird von drei Empfaengern gelesen, und fuer die drei Ziele MIT
  // Skalar ist das Feld unveraendert gefuellt. Ein Riegel an dieser Stelle traefe
  // sie mit.
  pixelId: string;
  // GEHEIMER Meta-CAPI-Token (aus project_secrets, RLS ohne jede Policy).
  // Verlaesst den Server NIE — weder in eine HTTP-Response noch in ein Log.
  //
  // ERSETZT (Scheibe 4 der Phase 11.2) — HIER STAND ALLEIN "Meta-CAPI-Token", UND DAS
  // WAR SCHON VOR DIESER SCHEIBE ZU ENG. Das Feld traegt seit Phase 11 das GEHEIMNIS
  // DES AUFGELOESTEN ZIELS, nicht Metas: Metas Zugriffstoken im Query-String,
  // Pinterests und LinkedIns in einer Bearer-Kopfzeile, TikToks in einer eigenen. Die
  // gleichlautende Korrektur hat das Nachbarfeld pixelId in Scheibe 2 bekommen; diese
  // Haelfte ist damals nicht mitgezogen worden.
  // SACHKORREKTUR, KEIN STEMPEL — der Grund ist derselbe wie dort: Wer die naechste
  // Ablage-Frage an diesem Typ misst, misst sonst an einer falschen Angabe.
  //
  // SEIT SCHEIBE 4 KANN ES ABLAUFEN. Fuer vier Ziele stammt der Wert aus der
  // Klartext-Spalte secret und ist statisch; fuer 'google' aus secret_enc,
  // dechiffriert, und er lebt 3599 Sekunden. AM TYP IST DAS NICHT ABLESBAR, und das
  // ist Absicht: Ein Adapter benutzt das Geheimnis, er verwaltet es nicht. Uhr 1 ist
  // im Resolver geprueft, BEVOR die Zeile ueberhaupt ein ResolvedTarget wird
  // (usableTokenFromRow) — ein Adapter bekommt nie ein abgelaufenes.
  //
  // DIE ZUSAGE OBEN GILT UNVERAENDERT UND WIRD ERWEITERT: Das ERNEUERUNGS-Token
  // verlaesst den Resolver ebenfalls nie — es steht in derselben chiffrierten Nutzlast
  // und wird dort gelesen und verworfen. Der Rueckgabetyp von usableTokenFromRow
  // (`string | null`) ist der Mechanismus, nicht dieser Kommentar.
  token: string;
};

/**
 * DIE SCHWELLE, AB DER DIESER PFAD EINE ERNEUERUNG MELDET (Scheibe 1b-2a).
 *
 * SIE IST NICHT DIESELBE ZAHL WIE DER VORLAUF, AUCH WENN SIE DENSELBEN WERT TRAEGT.
 * Der Vorlauf (REFRESH_LEAD_SECONDS in lib/oauth/token-refresh.ts) sagt "ab hier wird
 * ERNEUERT"; diese Schwelle sagt "ab hier wird GEMELDET". Zwei Fragen, zwei Orte —
 * und der Import von dort ist diesem Pfad ohnehin verwehrt (der Waechter T15-ERSATZ
 * in token.test.ts verbietet token.ts jeden Import aus /oauth/).
 *
 * DIE RELATION IST BINDEND: SCHWELLE <= VORLAUF.
 *
 * · SCHWELLE <= VORLAUF IST SELBSTBEGRENZEND. Jedes Signal fuehrt zu einer echten
 *   Erneuerung, die Zeile bekommt einen frischen Ablauf, und das Signal hoert auf.
 *   Das Fenster ist nicht die Laenge des Vorlaufs, sondern die Zeit bis zur ERSTEN
 *   erfolgreichen Erneuerung.
 * · SCHWELLE > VORLAUF IST SELBSTWIEDERHOLEND. Im Band zwischen beiden gibt
 *   refreshAccessToken "reichte noch" zurueck OHNE zu schreiben; die Zeile bleibt
 *   unveraendert, und JEDER folgende Beacon loest dasselbe Nichts erneut aus — eine
 *   Datenbank-Runde plus Entschluesselung je Besucher, STILL: keine Logzeile, kein
 *   roter Test, keine Spur.
 * · DIE FEHLERRICHTUNGEN SIND UNGLEICH TEUER. Zu klein ist harmlos, weil die Rettung
 *   den Rest auffaengt. Zu gross ist eine Kostenvervielfachung auf dem
 *   meistgetroffenen Pfad der Plattform.
 *
 * DER WAECHTER IST U1 in token.test.ts: er importiert BEIDE Zahlen und behauptet die
 * Relation. Er bindet die RELATION, nicht die Gleichheit, und er sagt NICHTS darueber,
 * ob eine der beiden Zahlen richtig gewaehlt ist.
 *
 * DER EXPORT DIENT DIESEM WAECHTER UND KEINEM PRODUKTIV-AUFRUFER. Im Produktivcode
 * wird die Konstante ausschliesslich in dieser Datei gelesen.
 */
export const REFRESH_SIGNAL_LEAD_SECONDS = 300;

/**
 * LEBT DIE ZWEITE UHR NOCH? — DIE TRENNUNG "ERNEUERBAR" GEGEN "ENDGUELTIG TOT".
 *
 * MODUL-PRIVAT, aus demselben Grund wie hasUsableAccessToken darunter und mit
 * derselben Begruendung: ein Praedikat mit EINEM Aufrufer in ein geteiltes Haus zu
 * legen waere Infrastruktur auf Verdacht.
 *
 * ES IST EINE ZWEITE INSTANZ, UND DAS WIRD HIER BENANNT STATT VERSCHWIEGEN: Dieselbe
 * Bedingung steht inline in refreshAccessToken (lib/oauth/token-refresh.ts,
 * Schritt (6)). Sie ist NICHT entdoppelt, und der Grund ist kein Geschmack — eine
 * gemeinsame Quelle verlangte einen Import in jene Datei, und die wird von dieser
 * Scheibe GERUFEN, nicht angefasst.
 * DIE ZWEI SIND NICHT DECKUNGSGLEICH, UND ZWAR ABSICHTLICH: Dort entscheidet Uhr 2
 * ueber "erneuern oder aufgeben", hier ueber "melden oder schweigen".
 *
 * {kind:"unknown"} GILT NIE ALS UEBERSCHRITTEN. Das ist Festlegung 5 der Scheibe 1a,
 * UEBERNOMMEN und nicht neu erfunden: Von zwei unbelegten Moeglichkeiten wird die
 * gewaehlt, deren Fehlgriff der billigere ist — ein ueberfluessiger Netzaufruf gegen
 * einen Kunden-Autorisierungsfluss, den niemand gebraucht haette.
 *
 * DER RAND IST AUSGESCHRIEBEN, weil er sonst geraten wird: epochSeconds === now gilt
 * als UEBERSCHRITTEN (fail-closed) — dieselbe Wahl wie bei Uhr 1 und dieselbe wie in
 * refreshAccessToken, wo der Vergleich `<= now` lautet.
 */
function hasLiveRefreshToken(
  expiry: RefreshTokenExpiry,
  nowSeconds: number,
): boolean {
  if (expiry.kind === "unknown") return true;
  return expiry.epochSeconds > nowSeconds;
}

/**
 * IST DIESES ZUGANGSDATUM JETZT NOCH BRAUCHBAR? — UHR 1, UND SONST NICHTS.
 *
 * MODUL-PRIVAT UND NICHT IN tracking/target-readiness.ts (ARCHITEKTEN-ENTSCHEIDUNG,
 * 2026-09-01), obwohl dort die verwandten Praedikate hasSecret und hasPixelId liegen.
 * DER GRUND IST DIE FRAGE, NICHT DER ORT: Scheibe 1b fragt "SOLL ERNEUERT WERDEN?"
 * (accessTokenExpiresAt - now > REFRESH_LEAD_SECONDS, s. refreshAccessToken); dieser
 * Pfad fragt "IST ES BRAUCHBAR?". Zwei verschiedene Fragen mit zwei verschiedenen
 * Schwellen — ein Praedikat mit EINEM Aufrufer in ein geteiltes Haus zu legen waere
 * Infrastruktur auf Verdacht.
 *
 * KEIN VORLAUF. Der Vorlauf existiert, um FRUEH ZU ERNEUERN; dieser Pfad erneuert
 * nicht, und ein noch fuenf Minuten gueltiges Zugangsdatum zu verwerfen haette keinen
 * Gegenwert — es entstuende nur ein Ereignis weniger.
 *
 * DER RAND IST AUSGESCHRIEBEN, weil er sonst beim naechsten Lesen geraten wird:
 * expiresAt === now gilt als NICHT MEHR BRAUCHBAR (fail-closed). Die Sekunde, in der
 * ein Zugangsdatum ablaeuft, gehoert nicht mehr ihm.
 *
 * DAS RESTRISIKO GEHOERT AN DIESE STELLE UND WIRD NICHT GEBAUT: Ein Zugangsdatum, das
 * WAEHREND DES FLUGES stirbt, liefert eine 401 vom Anbieter — ein geloggter
 * Fehlschlag, kein Bruch. Die leere 204 steht, der Handler laeuft zu Ende, und der
 * Betreiber sieht nichts (offener Punkt "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM
 * NICHT SENDEN", Ursache (3)).
 */
function hasUsableAccessToken(
  expiresAtSeconds: number,
  nowSeconds: number,
): boolean {
  return expiresAtSeconds > nowSeconds;
}

/**
 * DIE LAGE EINER GEHEIMNIS-ZEILE — BRAUCHBAR, ERNEUERBAR ODER GAR NICHTS.
 *
 * SIE IST DER EINZIGE ORT IN DIESER DATEI, AN DEM EINE OAuthPayload EXISTIERT, UND
 * DAS IST DER MECHANISMUS HINTER DER FESTLEGUNG "DAS ERNEUERUNGS-TOKEN VERLAESST DEN
 * RESOLVER NICHT" — nicht eine Zusage, sondern der RUECKGABETYP: RowResolution ist
 * eine GESCHLOSSENE Union mit benannten Feldern, und keines davon nimmt ein zweites
 * Geheimnis auf. Ab dem return zeigt kein Bezeichner mehr auf refreshToken oder
 * refreshTokenExpiresAt.
 * ERSETZT MIT SCHEIBE 1b-2a — hier stand "der RUECKGABETYP: `string | null` kann kein
 * zweites Geheimnis tragen". Der Typ ist ein anderer geworden; DIE AUSSAGE IST
 * DIESELBE, und sie ist der Grund, warum die Union geschlossen ist und nicht etwa ein
 * Objekt mit der ganzen Nutzlast.
 *
 * RICHTIGGESTELLT MIT SCHEIBE 1b-2a, NICHT GESTEMPELT — HIER STAND "WER DAS AENDERN
 * WOLLTE, MUESSTE DREI TYPEN ANFASSEN". DAS IST AM CODE ZU HOCH. GEMESSEN am Repo
 * (CC, 2026-09-03): Es genuegen ZWEI, auf zwei unabhaengigen Wegen — den Rueckgabetyp
 * hier PLUS CapiConfig (ResolvedTarget bleibt unberuehrt, es traegt config nur), ODER
 * den Rueckgabetyp hier PLUS ResolvedTarget (dann bleibt CapiConfig unberuehrt). Dazu
 * kommt je das Objektliteral in der Paarungsschleife, und das ist kein Typ.
 * DER SCHUTZ BLEIBT REAL UND WIRD NICHT KLEINGEREDET: Zwei sichtbare Aenderungen an
 * einer geteilten Datei sind weiterhin etwas anderes als eine Zeile in einer inline
 * ausgepackten Nutzlast. Genau deshalb ist das Auspacken hier eingesperrt.
 * WARUM DIE KORREKTUR UEBERHAUPT NOETIG IST: EINE ZU STARKE BEGRUENDUNG IST EINE
 * EINLADUNG, DIE REGEL BEIM NAECHSTEN UMBAU ALS UEBERTRIEBEN ZU LESEN. Eine Zahl, die
 * beim Nachzaehlen nicht stimmt, entwertet den Satz, den sie tragen soll.
 *
 * DIE REIHENFOLGE IST ENTSCHIEDEN UND NICHT ZUFAELLIG — CHIFFRAT ZUERST, KLARTEXT
 * DANACH. Der CHECK project_secrets_secret_genau_eines erlaubt heute nur EINE der
 * beiden Spalten, der Fall "beide gefuellt" ist also nicht erreichbar; die
 * Reihenfolge entscheidet trotzdem, WAS GESCHAEHE, und ein Verhalten, das nur aus der
 * Zeilenfolge folgt, ist keines.
 * WARUM DAS CHIFFRAT GEWINNT: Der Klartext ist die ALT-FORM (heute LinkedIn), das
 * Chiffrat der neuere Stand. Gaebe der Klartext den Ausschlag, verdeckte ein
 * stehengebliebener Alt-Wert einen migrierten Zugang — und er verdeckte ihn
 * DAUERHAFT, weil ein Klartext-Geheimnis KEINE Uhr traegt und damit nie ablaeuft.
 * Das ist fail-open in die teuerste Richtung. Ein Lauf haelt die Wahl fest.
 *
 * WAS GELOGGT WIRD UND WAS NICHT — die Auflage TRANSIT-ONLY faengt hier an, nicht
 * erst im Adapter: In die Zeile gehen der ZIEL-NAME (unser Vokabular) und ein
 * SELBSTVERGEBENER Grund. NICHT hinein gehen: das Chiffrat, der Klartext, das
 * Zugangsdatum, das Erneuerungs-Token, irgendein Feldwert der Nutzlast — und
 * ausdruecklich auch NICHT die projectId. Der Erneuerungspfad loggt sie, weil ihn ein
 * Mensch ausloest; dieser Pfad laeuft bei JEDEM Besucher JEDER Kundenseite, und eine
 * Projekt-Kennung je Beacon waere eine Datenerhebung, die niemand beschlossen hat
 * (dieselbe Begruendung wie am Consent-Gate in capi/ingest.ts).
 *
 * DIE GRENZE, DIE NICHT GELOEST WIRD: Es gibt KEINE Drosselung. Ein Projekt mit
 * kaputtem Chiffrat schreibt eine Zeile PRO BESUCHER. Ein Zaehler waere Zustand auf
 * dem meistgetroffenen Pfad der Plattform; er ist bewusst nicht gebaut und als Grenze
 * benannt.
 *
 * SIE WIRFT NIE. decryptSecret und parseOAuthPayload tragen denselben Vertrag, der
 * Rest sind typeof-Vergleiche und ein Zahlenvergleich.
 */
type RowResolution =
  /** Das Zugangsdatum traegt. inLead sagt, ob es INNERHALB der Schwelle liegt. */
  | { kind: "usable"; token: string; inLead: boolean }
  /** Uhr 1 ist tot, Uhr 2 lebt. Kein Zugangsdatum — aber eine Erneuerung ist moeglich. */
  | { kind: "renewable" }
  /** Endgueltig tot, unbrauchbar oder gar kein Geheimnis. Neun Wege, ein Ausgang. */
  | { kind: "unusable" };

function usableTokenFromRow(
  row: { secret: unknown; secret_enc: unknown },
  target: string,
  nowSeconds: number,
): RowResolution {
  const encrypted = row.secret_enc;
  if (typeof encrypted === "string" && encrypted.length > 0) {
    const decrypted = decryptSecret(encrypted);
    if (decrypted.kind !== "ok") {
      // DER GRUND IST DAS kind SELBST — ein Mitglied UNSERER Union, kein Fremdtext.
      // Eine Abbildungstabelle daneben waere eine zweite Wahrheit ueber dieselben
      // fuenf Zustaende.
      console.error("[capi/resolve] secret unusable", {
        target,
        reason: `decrypt_${decrypted.kind}`,
      });
      return { kind: "unusable" };
    }

    const parsed = parseOAuthPayload(decrypted.value);
    if (parsed.kind !== "ok") {
      console.error("[capi/resolve] secret unusable", {
        target,
        reason: `parse_${parsed.kind}`,
      });
      return { kind: "unusable" };
    }

    // UHR 2 ENTSCHEIDET, WAS EIN TOTES ZUGANGSDATUM BEDEUTET (Scheibe 1b-2a). Vor
    // dieser Scheibe war jede tote Uhr 1 dasselbe wie "gar kein Geheimnis"; sie ist es
    // nur noch dann, wenn auch das Erneuerungs-Token hin ist.
    const erneuerbar = hasLiveRefreshToken(
      parsed.value.refreshTokenExpiresAt,
      nowSeconds,
    );

    if (!hasUsableAccessToken(parsed.value.accessTokenExpiresAt, nowSeconds)) {
      // DIE FEHLERZEILE BLEIBT IN BEIDEN FAELLEN STEHEN, und das ist Absicht: Sie ist
      // die einzige beobachtbare Signatur dieses Zustands (Vorrats-Eintrag 42), und
      // sie ist die Live-Test-Achse dieser Scheibe. Der Grund unterscheidet die zwei
      // Lagen; beide Werte sind SELBSTVERGEBEN, keiner ist Fremdtext.
      console.error("[capi/resolve] secret unusable", {
        target,
        reason: erneuerbar ? "access_token_expired" : "refresh_token_expired",
      });
      return erneuerbar ? { kind: "renewable" } : { kind: "unusable" };
    }

    // NUR DAS ZUGANGSDATUM. Die drei uebrigen Felder der Nutzlast enden hier.
    // inLead IST KEINE ZWEITE PRUEFUNG DER UHR, SONDERN DIESELBE MIT EINER ANDEREN
    // SCHWELLE: brauchbar ist es (sonst waeren wir oben ausgestiegen), und die Frage
    // lautet nur noch, ob es NAHE genug am Ablauf ist, um eine Vorsorge zu melden.
    // OHNE erneuerbar WAERE DAS EIN SIGNAL INS LEERE: Ein Zugangsdatum, dessen
    // Erneuerungs-Token tot ist, laesst sich nicht erneuern — eine Vorsorge dafuer
    // erzeugte je Beacon einen Netzruf, der garantiert nichts aendert.
    const inLead =
      erneuerbar &&
      parsed.value.accessTokenExpiresAt - nowSeconds <=
        REFRESH_SIGNAL_LEAD_SECONDS;

    return { kind: "usable", token: parsed.value.accessToken, inLead };
  }

  // DIE KLARTEXT-FORM, UNVERAENDERT SEIT PHASE 11: hasSecret trimmt NICHT — ein
  // Geheimnis aus reinem Leerraum galt hier immer als VORHANDEN und gilt es weiterhin.
  // SIE HAT KEINE NUTZLAST UND KEINE UHR. Ein Klartext-Geheimnis laeuft an der
  // Entschluesselung vorbei, kann also weder ablaufen noch erneuert werden — es ist
  // NIE erneuerbar und NIE im Vorlauf. Das ist der Mechanismus hinter der Zusage,
  // dass diese Scheibe fuer die vier Klartext-Ziele wirkungslos ist (Lauf R6).
  if (hasSecret(row.secret))
    return { kind: "usable", token: row.secret, inLead: false };
  return { kind: "unusable" };
}

/**
 * Loest einen OEFFENTLICHEN trackingKey server-seitig zur vollstaendigen
 * CAPI-Konfiguration { pixelId, token } auf. Nutzt den service_role-Client
 * (bypassed RLS) — der einzige Weg, die policy-freie Tabelle project_secrets zu
 * lesen.
 *
 * EINE trackingKey-Aufloesung: der erste Query holt id UND settings aus derselben
 * projects-Zeile (kein zweiter Key-Lookup); die Pixel-IDs kommen via getPixelId
 * aus genau dieser Zeile. Der zweite Query holt die Geheimnisse ALLER Ziele in
 * EINER Runde. GENAU ZWEI Abfragen — unveraendert seit der project_tokens-Fassung.
 * DIE ZUSAGE GILT AUCH FUER MEHRERE ZIELE, und sie ist der Grund fuer die Form der
 * zweiten Abfrage: `in(target, ...)` statt `eq(target, ...)`, KEIN maybeSingle().
 * Eine Abfrage JE ZIEL waere die naheliegende und falsche Loesung — sie liesse die
 * Rundenzahl mit der Zahl der Ziele wachsen, auf dem Pfad, den JEDER Besucher
 * JEDER Kundenseite trifft (/api/e-Schlankheit).
 *
 * Aufloesung: trackingKey (server-autoritative Spalte projects.tracking_key)
 *   -> project_id (+ settings.pixels.<ziel>.pixelId) -> project_secrets.secret je Ziel.
 *
 * NACHGEZOGEN (Scheibe 4 der Phase 11.2) — DIE ZEILE DARUEBER BLEIBT WOERTLICH UND IST
 * SEITHER ZU ENG: Die letzte Station heisst jetzt project_secrets.secret ODER
 * secret_enc je Ziel, je nach GEHEIMNIS-KLASSE der Zeile. Die chiffrierte Klasse wird
 * dechiffriert, ihre Nutzlast gelesen und ihre Uhr 1 geprueft, BEVOR ein Empfaenger
 * entsteht — alles in usableTokenFromRow.
 * RICHTIGGESTELLT UND NICHT GESTEMPELT, weil dieser Kopf ein MASSSTAB ist: Wer den
 * naechsten Lesepfad an ihm misst, misst sonst an einer halben Angabe.
 * DIE ZUSAGE "GENAU ZWEI Abfragen" GILT UNVERAENDERT — es ist eine Spalte mehr
 * geworden, keine Runde.
 *
 * Gibt null zurueck (KEIN Throw — jeder dieser Zustaende ist regulaer), wenn:
 * - der Key leer ist, ODER
 * - kein Projekt diesen trackingKey traegt.
 *
 * Gibt blocked: true zurueck, wenn das Projekt GESPERRT ist (Kill-Switch) — der Aufrufer
 * MUSS darauf explizit verzweigen und verwerfen. abTestActive wird auch dort befuellt
 * (totale Funktion ohne Sonderfall); der Handler liest es in diesem Fall nie, weil er
 * vorher zurueckkehrt.
 *
 * Gibt eine LEERE targets-Menge zurueck, wenn das Projekt existiert und offen ist, aber
 * KEIN Ziel eine Pixel-ID (ohne Pixel-Ziel kein Forward) bzw. (noch) keine Geheimnis-Zeile
 * hat (trackingKey gesetzt, Zugangsdaten nie gesetzt / Race) -> kein Forward, aber
 * Analytics-Persist ist erlaubt.
 *
 * NUR VOLLSTAENDIGE PAARE KOMMEN IN DIE MENGE. Ein Ziel mit Geheimnis, aber ohne
 * Pixel-ID faellt heraus, und umgekehrt — die Paarung geschieht JE ZIEL. Ohne sie
 * koennte ein Ziel mit den Zugangsdaten eines anderen laufen; genau davor schuetzte
 * bis hierher der Ziel-Filter der zweiten Abfrage allein.
 */
export async function getCapiConfigByTrackingKey(
  trackingKey: string,
): Promise<TrackingKeyResolution | null> {
  const key = trackingKey.trim();
  if (!key) return null;

  const admin = createAdminClient();

  // Schritt 1: trackingKey -> project_id + settings + blocked_at (EINE Aufloesung).
  // Filter auf die server-autoritative Spalte projects.tracking_key (Scheibe 2b-0;
  // vorher der JSON-Pfad settings->capi->>trackingKey). Ergebnis fuer Bestand
  // identisch (Migration 0012 backfillt die Spalte 1:1 aus settings). settings reitet
  // weiter in DERSELBEN Projektion mit (fuer getMetaPixelId), ebenso blocked_at
  // (Kill-Switch-Ingest-Stop ohne zusaetzlichen Roundtrip) und seit 9b-2 ab_test_active
  // (Varianten-Gate ohne zusaetzlichen Roundtrip — dieselbe Denkfigur).
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("id, settings, blocked_at, ab_test_active")
    .eq("tracking_key", key)
    .maybeSingle();

  if (projectError || !project) return null;

  const projectId = project.id as string;
  // Boolean() statt Cast: die Spalte ist NOT NULL DEFAULT false (0017), aber der
  // JS-Client liefert unknown-artige Werte — der Resolver soll hier nie ein undefined
  // durchreichen, das im Handler wie "false" wirkt, ohne es zu sein.
  const abTestActive = Boolean(project.ab_test_active);

  // KILL-SWITCH (Tier 0): gesperrtes Projekt -> FRUEHER Return, VOR der Pixel-/Token-
  // Aufloesung — bei gesperrt laeuft die Geheimnis-Abfrage aus Schritt 2 (project_secrets)
  // weiterhin NICHT. Die Tabelle ist seit Phase 11 Scheibe 1 project_secrets; hier stand
  // bis dahin project_tokens, und jene Abfrage gibt es nicht mehr. Die AUSSAGE des
  // Kommentars ist unveraendert und der Grund, warum er hier steht: Der Ausstieg liegt
  // VOR JEDER Aufloesung, es findet also KEIN Geheimnis-Zugriff statt. Neu in
  // Scheibe 2a: statt null wird blocked:true GEMELDET — der Handler verzweigt darauf
  // EXPLIZIT und verwirft, bevor irgendetwas persistiert oder geforwarded wird. Fuer den
  // anonymen Aufrufer bleibt das Ergebnis identisch (204, kein Zustandsleck); der
  // Unterschied ist nur intern sichtbar. Halbe Sperre = keine Sperre.
  if (project.blocked_at)
    // renewable IST HIER LEER, UND ZWAR STRUKTURELL: Dieser Ausstieg liegt VOR der
    // Geheimnis-Abfrage, es gibt also keine Zeile, keine Nutzlast und keine Uhr. EIN
    // GESPERRTES PROJEKT ERNEUERT NICHTS — das ist keine Zusage des Aufrufers, sondern
    // eine Eigenschaft dieser Zeile.
    return {
      projectId,
      blocked: true,
      abTestActive,
      targets: [],
      renewable: [],
    };

  // Die Pixel-IDs ALLER bekannten Ziele aus derselben Zeile — kein zweiter Lookup.
  // Reuse der Settings-Ableitung, jetzt ziel-parametrisiert (getPixelId statt
  // getMetaPixelId).
  //
  // DER FRUEHAUSSTIEG BEANTWORTET EINE ANDERE FRAGE ALS VORHER, und das ist der Kern
  // der Umstellung an dieser Stelle: Er fragte "hat META eine Pixel-ID?" und war damit
  // an EIN Ziel gebunden — ein Projekt mit Zugangsdaten fuer ein anderes Ziel, aber
  // ohne Meta-Pixel, kehrte hier zurueck, BEVOR die Geheimnis-Abfrage ueberhaupt lief.
  // Er fragt jetzt "hat IRGENDEIN bekanntes Ziel eine Pixel-ID?".
  // ER KOSTET WEITERHIN NULL ZUSAETZLICHE RUNDEN: settings reitet bereits in der
  // Projektion oben mit, die Schleife ist eine reine Speicher-Operation.
  //
  // hasPixelId STATT DES FRUEHEREN VERGLEICHS GEGEN "" (Scheibe B1): wertgleich, weil
  // getPixelId immer eine getrimmte Zeichenkette liefert — die Bedingung ist damit nur
  // noch an EINER Stelle im Repo ausgeschrieben, s. den Import-Block oben.
  //
  // NACHGEZOGEN 11.1c: Gerufen wird jetzt hasTargetPixelId (lib/settings.ts), das
  // ZIEL-BEWUSSTE Urteil; es delegiert an dasselbe Primitiv. Die Aussage darueber
  // bleibt damit wahr — die Bedingung steht weiterhin an EINER Stelle.
  // ZWEI DINGE, DIE HIER AUSDRUECKLICH GLEICH BLEIBEN, weil dieser Pfad der
  // meistgetroffene der Plattform ist:
  //  - DIE RECHNUNG. Das Ziel reist im Zwischenobjekt bereits mit; der Filter liest
  //    entry.pixelId und entry.target, ruft also KEIN zweites getPixelId. Eine
  //    Signatur (settings, target) haette genau das getan — vier zusaetzliche
  //    Lesungen samt Trim JE BEACON, gegen die /api/e-Schlankheitsregel.
  //  - DER FRUEHAUSSTIEG darunter samt der in-Liste der Geheimnis-Abfrage. Die Zahl
  //    der Datenbank-Runden ist unveraendert; diese Scheibe fasst sie nicht an.
  // NACHGETRAGEN 11.1e — DIE ZWEITE KENNUNGSFORM REIST MIT, UND DER KOSTEN-ABSATZ
  // DARUEBER GILT UNVERAENDERT: Die Zuordnung wird in DERSELBEN map EINMAL gelesen
  // und im Zwischenobjekt mitgefuehrt. Das ist die ERSTE Lesung eines NEUEN Feldes,
  // KEINE zweite Lesung eines bereits gelesenen — getPixelId wird weiterhin genau
  // einmal je Ziel gerufen, und die Zahl der Datenbank-Runden ist unveraendert.
  //
  // WARUM DER FILTER isTargetDeliverable (lib/settings.ts) NICHT RUFT, obwohl jene
  // Funktion exakt diese Frage beantwortet — DREI TEILE, und ohne den dritten legt
  // die naechste Runde die beiden Stellen zusammen:
  //  (1) DIE BEDINGUNG STEHT AB JETZT AN ZWEI STELLEN im Repo: im Consent-Memo
  //      (consentTargets, components/CodeImporter.tsx, ueber isTargetDeliverable)
  //      und hier, ausgeschrieben aus denselben zwei Praedikaten.
  //  (2) DAS IST ERZWUNGEN UND NICHT GEWAEHLT: isTargetDeliverable traegt getPixelId
  //      in ihrem ERSTEN Term; die map hat es fuer dasselbe Ziel bereits gerufen.
  //      Ein Aufruf hier laese denselben Wert ein ZWEITES Mal, samt Trim, JE ZIEL
  //      und JE BEACON — genau der Fall, den der Kosten-Absatz darueber als Grund
  //      fuer die heutige Bauform benennt.
  //  (3) WER SIE ZUSAMMENLEGT, FUEHRT DIE ZWEITE LESUNG JE BEACON WIEDER EIN. Das
  //      ist der Satz, der sonst fehlt, wenn jemand die Doppelung beim Aufraeumen
  //      bemerkt und fuer ein Versehen haelt.
  // DIE IRONIE GEHOERT DAZU, weil sie BEIDE Entscheidungen schuetzt: Der
  // Kosten-Absatz verwirft eine Signatur (settings, target) — und genau die hat
  // isTargetDeliverable seit 11.1d, aus einem dort richtigen Grund (sie befragt ZWEI
  // Felder, und ein Aufrufer koennte nicht wissen, welches fuer welches Ziel
  // entscheidet). Beide sind je fuer sich richtig und passen an dieser einen Stelle
  // nicht zusammen.
  const settings = (project.settings ?? {}) as ProjectSettings;
  const withPixel = TRACKING_TARGETS.map((target) => ({
    target,
    pixelId: getPixelId(settings, target),
    rules: getConversionRules(settings, target),
  })).filter(
    (entry) =>
      hasTargetPixelId(entry.pixelId, entry.target) ||
      hasConversionRules(entry.rules),
  );

  if (withPixel.length === 0)
    return {
      projectId,
      blocked: false,
      abTestActive,
      targets: [],
      renewable: [],
    };

  // Schritt 2: (project_id, Ziel) -> Geheimnisse ALLER in Frage kommenden Ziele in
  // EINER Runde (Phase 11 Scheibe 7). Fehlende Zeile (Zugangsdaten nie gesetzt) ->
  // dieses Ziel forwarded nicht.
  //
  // `in` STATT `eq`, UND DER FILTER BLEIBT: Er ist Sperre und Sicherung zugleich —
  // ohne ihn laese ein Ziel den Pfad eines anderen mit fremden Zugangsdaten. Gefragt
  // wird nur nach den Zielen, die ueberhaupt eine Pixel-ID tragen; alles andere waere
  // ein Geheimnis, das niemand paaren koennte.
  // KEIN maybeSingle(): die Abfrage darf MEHRERE Zeilen liefern. Es zu behalten waere
  // die stillste Art, die Scheibe zu verfehlen — bei zwei Zeilen liefert PostgREST
  // dann keinen brauchbaren Wert.
  // KEIN RUECKFALL auf project_tokens: er machte eine unvollstaendige Uebernahme
  // unsichtbar und entwertete genau die Pruefung, die vor jenem Deploy stand.
  // secret_enc IST MIT SCHEIBE 4 DAZUGEKOMMEN — EINE SPALTE, KEINE RUNDE. Die Zusage
  // "GENAU ZWEI Abfragen" im Kopf dieser Funktion gilt damit unveraendert; sie zaehlt
  // Runden, nicht Spalten. Die Verzweigung nach Geheimnis-Klasse geschieht JE ZEILE in
  // usableTokenFromRow, nicht in einer zweiten Abfrage.
  const { data: rows, error: secretsError } = await admin
    .from("project_secrets")
    .select("target, secret, secret_enc")
    .eq("project_id", projectId)
    .in(
      "target",
      withPixel.map((entry) => entry.target),
    );

  if (secretsError || !rows)
    return {
      projectId,
      blocked: false,
      abTestActive,
      targets: [],
      renewable: [],
    };

  // Geheimnisse nach Ziel greifbar machen. Der Schluessel bleibt bewusst ein roher
  // string: nachgeschlagen wird ausschliesslich mit Werten aus TRACKING_TARGETS, ein
  // unbekannter Wert aus der Datenbank kann damit gar nicht getroffen werden.
  //
  // hasSecret STATT DER FRUEHEREN ZWEI ZEILEN (Scheibe B1): Der Bestand nahm einen
  // Nicht-String als "" und verwarf dann den leeren Wert — dieselbe Bedingung in zwei
  // Schritten. hasSecret ist fuer exakt dieselben Eingaben falsch (Nicht-String und
  // leere Zeichenkette) und TRIMMT NICHT: ein Geheimnis aus reinem Leerraum galt hier
  // schon immer als VORHANDEN und gilt es weiterhin. Das ist der abgebildete Bestand,
  // keine Nachlaessigkeit — wer es mit der getrimmten Kennungs-Regel "harmonisiert",
  // aendert das Verhalten dieses Pfades (T6 in tracking/target-readiness.test.ts, N2
  // hier daneben).
  //
  // ES IST EIN TYP-PRAEDIKAT, und deshalb braucht die Zeile darunter KEINE
  // Zusicherung: Eine Zusicherung behauptete noch einmal, was das Praedikat gerade
  // entschieden hat — genau die zweite Ausformulierung, gegen die diese Scheibe
  // gerichtet ist.
  // DIE UHR WIRD GENAU EINMAL GELESEN und fuer ALLE Zeilen dieser Aufloesung benutzt.
  // Zweimal gelesen haetten zwei Ziele derselben Runde verschiedene Bezugspunkte, und
  // eine spaetere Differenz waere unerklaerlich — dieselbe Begruendung wie in
  // refreshAccessToken (lib/oauth/token-refresh.ts).
  const nowSeconds = Math.floor(Date.now() / 1000);

  const lageByTarget = new Map<string, RowResolution>();
  for (const row of rows as {
    target: unknown;
    secret: unknown;
    secret_enc: unknown;
  }[]) {
    if (typeof row.target !== "string") continue;
    // ACHT AUSGAENGE MUENDEN IN "unusable", UND KEINER IST VON AUSSEN UNTERSCHEIDBAR —
    // fuenf Dechiffrier-Zustaende, zwei Lese-Zustaende und die Zeile ohne brauchbares
    // Geheimnis. Alle enden in derselben leeren 204.
    // ERSETZT MIT SCHEIBE 1b-2a — hier stand "NEUN AUSGAENGE MUENDEN IN null". Die
    // TOTE UHR 1 ist der neunte gewesen und ist es nicht mehr: Sie muendet jetzt in
    // "renewable", wenn Uhr 2 noch lebt, und nur sonst in "unusable". NACH AUSSEN
    // AENDERT DAS NICHTS — auch eine geglueckte Rettung endet in derselben leeren 204.
    lageByTarget.set(row.target, usableTokenFromRow(row, row.target, nowSeconds));
  }

  // DIE PAARUNG — JE ZIEL. Nur wer BEIDES traegt, wird Empfaenger. Die Reihenfolge
  // folgt TRACKING_TARGETS und ist damit deterministisch, nicht von der Zeilenfolge
  // der Datenbank abhaengig.
  const targets: ResolvedTarget[] = [];
  const renewable: RenewableTarget[] = [];
  for (const entry of withPixel) {
    const lage = lageByTarget.get(entry.target);
    if (!lage || lage.kind === "unusable") continue;

    // DIE ZWEITE MENGE WIRD IN DERSELBEN SCHLEIFE GEBAUT — keine zweite Iteration,
    // keine zweite Lesung, keine zusaetzliche Datenbank-Runde. Die Reihenfolge folgt
    // TRACKING_TARGETS und ist damit auch hier deterministisch.
    if (lage.kind === "renewable" || lage.inLead) {
      renewable.push({
        target: entry.target,
        pixelId: entry.pixelId,
        ...(hasConversionRules(entry.rules)
          ? { conversionRules: entry.rules }
          : {}),
        lage: lage.kind === "renewable" ? "expired" : "lead",
      });
    }

    // ERNEUERBAR HEISST NICHT SENDEFAEHIG. Eine Zeile mit toter Uhr 1 erzeugt KEIN
    // ResolvedTarget — fail-closed, wie vor dieser Scheibe. Der Aufrufer bekommt sie
    // ueber renewable gemeldet und muss sie eigens retten; sie faellt ihm nicht als
    // halber Empfaenger in die Hand.
    if (lage.kind !== "usable") continue;
    const token = lage.token;
    // "LEERE ZUORDNUNG" WIRD IN "FELD NICHT GESETZT" UEBERSETZT (Scheibe 11.1e), und
    // das ist KEINE Kosmetik — der Grund ist eine gemessene Tatsache ueber das
    // PRUEFWERKZEUG und gehoert deshalb an diese Fundstelle:
    // GEMESSEN am 2026-08-18 (Wegwerf-Probe, vitest 4.1.8): toEqual ignoriert einen
    // Schluessel mit dem Wert `undefined` — auf jeder Ebene —, ein LEERES OBJEKT
    // dagegen NICHT. Ein `conversionRules: {}` an JEDEM Empfaenger braeche damit die
    // ZWOELF Ganz-Objekt-Vergleiche in capi/token.test.ts, die seit Scheibe 2b-i
    // die vollstaendige Aufloesung behaupten.
    // WARUM DIE UMFORMUNG UEBERHAUPT NOETIG IST: getConversionRules (lib/settings.ts)
    // liefert bei Abwesenheit ein FRISCHES leeres Objekt, nicht `undefined` — das ist
    // dort richtig (jeder Aufrufer bekaeme sonst denselben Rueckfall zu schreiben) und
    // hier genau das Falsche.
    // WER SIE STREICHT, sieht keinen Typfehler und keine Verhaltensaenderung — nur
    // zwoelf rote Vergleiche, deren Ursache in einer anderen Datei steht.
    const rules = hasConversionRules(entry.rules) ? entry.rules : undefined;
    targets.push({
      target: entry.target,
      config: { pixelId: entry.pixelId, token },
      ...(rules ? { conversionRules: rules } : {}),
    });
  }

  return { projectId, blocked: false, abTestActive, targets, renewable };
}

/**
 * DAS FRISCHE ZUGANGSDATUM EINES GERADE ERNEUERTEN ZIELS — DIE SCHMALE NACH-AUFLOESUNG.
 *
 * WARUM ES SIE UEBERHAUPT GIBT, UND DER SATZ GEHOERT AN DEN ANFANG: refreshAccessToken
 * (lib/oauth/token-refresh.ts) GIBT DAS ZUGANGSDATUM NICHT ZURUECK — sein ok-Ausgang
 * traegt nur die zwei Ablaufzeitpunkte, und runRefresh reicht ihn unveraendert durch.
 * Das frische Zugangsdatum steht danach ausschliesslich CHIFFRIERT in
 * project_secrets.secret_enc. Wer es haben will, muss lesen.
 *
 * SIE IST DIE DRITTE DATENBANK-RUNDE DES REQUESTS, UND DAS IST EIN BENANNTER PREIS,
 * KEIN VERSEHEN. Sie faellt AUSSCHLIESSLICH im Rettungsfall an — also fuer ein
 * Projekt, dessen Zugangsdatum gerade tot war und gerade erneuert wurde. Fuer jeden
 * anderen Beacon bleibt es bei ZWEI Runden; die Zusage im Kopf von
 * getCapiConfigByTrackingKey gilt fuer den Normalfall unveraendert.
 * DIE BILLIGERE VARIANTE GIBT ES NICHT: Eine zweite VOLLSTAENDIGE Aufloesung kostete
 * ZWEI Runden, weil sie projects erneut laese — deshalb reisen pixelId und
 * conversionRules in RenewableTarget mit, und deshalb liest diese Funktion NUR
 * project_secrets.
 *
 * SIE PRUEFT KEIN EIGENTUM, UND SIE BRAUCHT ES AUCH NICHT ZU: projectId stammt aus der
 * Aufloesung eines trackingKeys und ist damit SERVER-aufgeloest — kein Aufrufer kann
 * sie setzen. Das ist dieselbe Kette wie beim Rest dieses Pfades.
 *
 * SIE WIRFT NIE — dieselbe Zusage wie usableTokenFromRow, und aus denselben Gruenden:
 * { data, error } wird destrukturiert (nie nur { data }), decryptSecret und
 * parseOAuthPayload tragen denselben Vertrag, der Rest sind typeof-Vergleiche.
 *
 * SIE ERNEUERT NICHT. Sie liest. Wer hier einen Aufruf an das oauth-Haus ergaenzt,
 * bricht den Waechter T15-ERSATZ in token.test.ts — und zwar zu Recht.
 */
export async function resolveRefreshedTarget(
  projectId: string,
  entry: RenewableTarget,
): Promise<ResolvedTarget | null> {
  const admin = createAdminClient();

  const { data: row, error } = await admin
    .from("project_secrets")
    .select("secret, secret_enc")
    .eq("project_id", projectId)
    .eq("target", entry.target)
    .maybeSingle();

  if (error || !row) return null;

  // DIE UHR WIRD HIER NEU GELESEN, und das ist richtig statt inkonsequent: Zwischen
  // der ersten Aufloesung und diesem Aufruf liegt ein NETZRUF an den Anbieter. Die
  // alte Uhr auf ein Zugangsdatum anzuwenden, das nach ihr ausgestellt wurde, waere
  // ein Vergleich gegen einen Bezugspunkt, den es nicht mehr gibt.
  const nowSeconds = Math.floor(Date.now() / 1000);
  const lage = usableTokenFromRow(
    row as { secret: unknown; secret_enc: unknown },
    entry.target,
    nowSeconds,
  );

  // FAIL-CLOSED: Alles ausser "usable" ergibt keinen Empfaenger. Auch ein erneut
  // "renewable" — eine zweite Rettung im selben Request gibt es nicht, sie waere eine
  // Schleife ohne Abbruchbedingung auf dem meistgetroffenen Pfad der Plattform.
  if (lage.kind !== "usable") return null;

  return {
    target: entry.target,
    config: { pixelId: entry.pixelId, token: lage.token },
    ...(entry.conversionRules
      ? { conversionRules: entry.conversionRules }
      : {}),
  };
}
