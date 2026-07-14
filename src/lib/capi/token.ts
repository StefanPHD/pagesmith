import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getMetaPixelId, type ProjectSettings } from "@/lib/settings";

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
 * - kein Projekt diesen trackingKey traegt,
 * - das Projekt KEINE Meta-Pixel-ID gesetzt hat (ohne Pixel-Ziel kein Forward), ODER
 * - das Projekt (noch) KEINE Token-Zeile hat (trackingKey gesetzt, Token nie
 *   gesetzt / Race).
 */
export async function getCapiConfigByTrackingKey(
  trackingKey: string,
): Promise<CapiConfig | null> {
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

  // pixelId aus derselben Zeile — kein zweiter Lookup. Reuse der Settings-Ableitung.
  const pixelId = getMetaPixelId((project.settings ?? {}) as ProjectSettings);
  if (!pixelId) return null;

  // Schritt 2: project_id -> Token. Fehlende Zeile (Token nie gesetzt) -> null.
  const { data: row, error: tokenError } = await admin
    .from("project_tokens")
    .select("meta_capi_token")
    .eq("project_id", project.id)
    .maybeSingle();

  if (tokenError || !row) return null;

  const token = row.meta_capi_token ?? null;
  if (!token) return null;

  return { pixelId, token };
}
