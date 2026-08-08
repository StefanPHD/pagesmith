import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  getPixelId,
  TRACKING_TARGETS,
  type ProjectSettings,
  type TrackingTarget,
} from "@/lib/settings";

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
  // OEFFENTLICHE Meta-Pixel-ID (aus settings.pixels.meta.pixelId). Kein Secret,
  // aber serverseitig aufgeloest, damit der Client die pixelId NIE selbst sendet.
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
  const settings = (project.settings ?? {}) as ProjectSettings;
  const withPixel = TRACKING_TARGETS.map((target) => ({
    target,
    pixelId: getPixelId(settings, target),
  })).filter((entry) => entry.pixelId !== "");

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
  const secretByTarget = new Map<string, string>();
  for (const row of rows as { target: unknown; secret: unknown }[]) {
    if (typeof row.target !== "string") continue;
    const secret = typeof row.secret === "string" ? row.secret : "";
    if (!secret) continue;
    secretByTarget.set(row.target, secret);
  }

  // DIE PAARUNG — JE ZIEL. Nur wer BEIDES traegt, wird Empfaenger. Die Reihenfolge
  // folgt TRACKING_TARGETS und ist damit deterministisch, nicht von der Zeilenfolge
  // der Datenbank abhaengig.
  const targets: ResolvedTarget[] = [];
  for (const entry of withPixel) {
    const token = secretByTarget.get(entry.target);
    if (!token) continue;
    targets.push({ target: entry.target, config: { pixelId: entry.pixelId, token } });
  }

  return { projectId, blocked: false, abTestActive, targets };
}
