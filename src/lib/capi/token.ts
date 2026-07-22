import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMetaPixelId, type ProjectSettings } from "@/lib/settings";

/**
 * Aufloesung EINES trackingKeys (Phase 8 Scheibe 1, ADDITIV erweitert).
 *
 * Frueher gab dieser Resolver nur die CapiConfig zurueck und verwarf die project.id,
 * obwohl sie im selben Lookup ohnehin schon aufgeloest wird. Der Analytics-Persist
 * braucht die project_id als FK -> sie wird jetzt MITGELIEFERT statt weggeworfen.
 * KEINE zweite Query (die /api/e-Schlankheits-Regel bleibt gewahrt).
 *
 * capiConfig ist null, wenn das Projekt existiert und NICHT gesperrt ist, aber keine
 * Meta-Pixel-ID / keinen CAPI-Token traegt -> der Aufrufer forwarded dann nicht (exakt
 * das bisherige Verhalten, nur feiner aufgeloest).
 *
 * blocked (Scheibe 2a): der Kill-Switch-Zustand wird jetzt MITGELIEFERT statt in ein
 * null zu muenden. Grund: mit der Entkopplung persistiert der Ingest auch OHNE
 * CapiConfig -> der Schutz darf kein Nebeneffekt der Config-Kopplung mehr sein, sondern
 * braucht einen EXPLIZITEN Zweig im Handler. blocked_at wird in derselben Projektion
 * ohnehin schon gelesen -> KEINE zweite Query.
 */
export type TrackingKeyResolution = {
  projectId: string;
  /** true = Projekt gesperrt (Kill-Switch). Der Aufrufer MUSS darauf explizit verzweigen. */
  blocked: boolean;
  capiConfig: CapiConfig | null;
};

/** Serverseitig aufgeloeste CAPI-Konfiguration fuer EIN Projekt. */
export type CapiConfig = {
  // OEFFENTLICHE Meta-Pixel-ID (aus settings.pixels.meta.pixelId). Kein Secret,
  // aber serverseitig aufgeloest, damit der Client die pixelId NIE selbst sendet.
  pixelId: string;
  // GEHEIMER Meta-CAPI-Token (aus project_tokens, RLS-SELECT-gesperrt). Verlaesst
  // den Server NIE — weder in eine HTTP-Response noch in ein Log.
  token: string;
};

/**
 * Loest einen OEFFENTLICHEN trackingKey server-seitig zur vollstaendigen
 * CAPI-Konfiguration { pixelId, token } auf. Nutzt den service_role-Client
 * (bypassed RLS) — der einzige Weg, die SELECT-gesperrte Tabelle project_tokens
 * zu lesen.
 *
 * EINE trackingKey-Aufloesung: der erste Query holt id UND settings aus derselben
 * projects-Zeile (kein zweiter Key-Lookup); die pixelId kommt via getMetaPixelId
 * aus genau dieser Zeile. Der zweite Query holt den Token per project_id.
 *
 * Aufloesung: trackingKey (in projects.settings.capi.trackingKey, oeffentlich)
 *   -> project_id (+ settings.pixels.meta.pixelId) -> project_tokens.meta_capi_token.
 *
 * Gibt null zurueck (KEIN Throw — jeder dieser Zustaende ist regulaer), wenn:
 * - der Key leer ist, ODER
 * - kein Projekt diesen trackingKey traegt.
 *
 * Gibt { projectId, blocked: true, capiConfig: null } zurueck, wenn das Projekt GESPERRT
 * ist (Kill-Switch) — der Aufrufer MUSS darauf explizit verzweigen und verwerfen.
 *
 * Gibt { projectId, blocked: false, capiConfig: null } zurueck, wenn das Projekt existiert
 * und offen ist, aber KEINE Meta-Pixel-ID (ohne Pixel-Ziel kein Forward) bzw. (noch) KEINE
 * Token-Zeile hat (trackingKey gesetzt, Token nie gesetzt / Race) -> kein Forward, aber
 * Analytics-Persist ist erlaubt.
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
  // (Kill-Switch-Ingest-Stop ohne zusaetzlichen Roundtrip).
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("id, settings, blocked_at")
    .eq("tracking_key", key)
    .maybeSingle();

  if (projectError || !project) return null;

  const projectId = project.id as string;

  // KILL-SWITCH (Tier 0): gesperrtes Projekt -> FRUEHER Return, VOR der Pixel-/Token-
  // Aufloesung (die project_tokens-Query laeuft bei gesperrt weiterhin NICHT). Neu in
  // Scheibe 2a: statt null wird blocked:true GEMELDET — der Handler verzweigt darauf
  // EXPLIZIT und verwirft, bevor irgendetwas persistiert oder geforwarded wird. Fuer den
  // anonymen Aufrufer bleibt das Ergebnis identisch (204, kein Zustandsleck); der
  // Unterschied ist nur intern sichtbar. Halbe Sperre = keine Sperre.
  if (project.blocked_at) return { projectId, blocked: true, capiConfig: null };

  // pixelId aus derselben Zeile — kein zweiter Lookup. Reuse der Settings-Ableitung.
  const pixelId = getMetaPixelId((project.settings ?? {}) as ProjectSettings);
  if (!pixelId) return { projectId, blocked: false, capiConfig: null };

  // Schritt 2: project_id -> Token. Fehlende Zeile (Token nie gesetzt) -> kein Forward.
  const { data: row, error: tokenError } = await admin
    .from("project_tokens")
    .select("meta_capi_token")
    .eq("project_id", projectId)
    .maybeSingle();

  if (tokenError || !row) return { projectId, blocked: false, capiConfig: null };

  const token = row.meta_capi_token ?? null;
  if (!token) return { projectId, blocked: false, capiConfig: null };

  return { projectId, blocked: false, capiConfig: { pixelId, token } };
}
