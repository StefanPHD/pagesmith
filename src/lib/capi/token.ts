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
  token: string;
};

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
    return { projectId, blocked: true, abTestActive, targets: [] };

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
    return { projectId, blocked: false, abTestActive, targets: [] };

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
  const { data: rows, error: secretsError } = await admin
    .from("project_secrets")
    .select("target, secret")
    .eq("project_id", projectId)
    .in(
      "target",
      withPixel.map((entry) => entry.target),
    );

  if (secretsError || !rows)
    return { projectId, blocked: false, abTestActive, targets: [] };

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
  const secretByTarget = new Map<string, string>();
  for (const row of rows as { target: unknown; secret: unknown }[]) {
    if (typeof row.target !== "string") continue;
    if (!hasSecret(row.secret)) continue;
    secretByTarget.set(row.target, row.secret);
  }

  // DIE PAARUNG — JE ZIEL. Nur wer BEIDES traegt, wird Empfaenger. Die Reihenfolge
  // folgt TRACKING_TARGETS und ist damit deterministisch, nicht von der Zeilenfolge
  // der Datenbank abhaengig.
  const targets: ResolvedTarget[] = [];
  for (const entry of withPixel) {
    const token = secretByTarget.get(entry.target);
    if (!token) continue;
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

  return { projectId, blocked: false, abTestActive, targets };
}
