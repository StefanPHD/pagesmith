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
 * KEIN blocked-Feld: ein gesperrtes Projekt liefert weiterhin null fuer die GANZE
 * Aufloesung (Kill-Switch fail-closed, Zweig unten). Der explizite blocked-Zweig gehoert
 * zur spaeteren Meta-Entkopplung (Scheibe 2) und wird MIT IHR gebaut.
 */
export type TrackingKeyResolution = {
  projectId: string;
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
 * - der Key leer ist,
 * - kein Projekt diesen trackingKey traegt, ODER
 * - das Projekt GESPERRT ist (Kill-Switch, fail-closed).
 *
 * Gibt { projectId, capiConfig: null } zurueck, wenn das Projekt existiert und offen
 * ist, aber KEINE Meta-Pixel-ID (ohne Pixel-Ziel kein Forward) bzw. (noch) KEINE
 * Token-Zeile hat (trackingKey gesetzt, Token nie gesetzt / Race). Fuer den CAPI-Zweig
 * ist das gleichbedeutend mit dem frueheren null -> kein Forward, 204.
 */
export async function getCapiConfigByTrackingKey(
  trackingKey: string,
): Promise<TrackingKeyResolution | null> {
  const key = trackingKey.trim();
  if (!key) return null;

  const admin = createAdminClient();

  // Schritt 1: trackingKey -> project_id + settings + blocked_at (EINE Aufloesung).
  // JSON-Pfad-Filter auf settings.capi.trackingKey. blocked_at reitet in DERSELBEN
  // Projektion mit -> Kill-Switch-Ingest-Stop ohne zusaetzlichen Roundtrip.
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("id, settings, blocked_at")
    .eq("settings->capi->>trackingKey", key)
    .maybeSingle();

  if (projectError || !project) return null;

  // KILL-SWITCH (Tier 0): gesperrtes Projekt -> Events verwerfen. Frueh, VOR Pixel-/
  // Token-Aufloesung (spart die Token-Query). null muendet im bestehenden 204-No-op-Pfad
  // von handleIngest -> fuer den anonymen Aufrufer nicht von "kein Config" unterscheidbar
  // (kein Zustandsleck). Halbe Sperre = keine Sperre: der Ingest muss dicht sein.
  if (project.blocked_at) return null;

  // Ab hier steht fest: Projekt existiert und ist NICHT gesperrt -> die projectId wird
  // in JEDEM weiteren Rueckgabepfad mitgeliefert (auch ohne CAPI-Config).
  const projectId = project.id as string;

  // pixelId aus derselben Zeile — kein zweiter Lookup. Reuse der Settings-Ableitung.
  const pixelId = getMetaPixelId((project.settings ?? {}) as ProjectSettings);
  if (!pixelId) return { projectId, capiConfig: null };

  // Schritt 2: project_id -> Token. Fehlende Zeile (Token nie gesetzt) -> kein Forward.
  const { data: row, error: tokenError } = await admin
    .from("project_tokens")
    .select("meta_capi_token")
    .eq("project_id", projectId)
    .maybeSingle();

  if (tokenError || !row) return { projectId, capiConfig: null };

  const token = row.meta_capi_token ?? null;
  if (!token) return { projectId, capiConfig: null };

  return { projectId, capiConfig: { pixelId, token } };
}
