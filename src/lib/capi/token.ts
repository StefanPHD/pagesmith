import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Loest einen OEFFENTLICHEN trackingKey server-seitig zum GEHEIMEN Meta-CAPI-Token
 * auf. Nutzt den service_role-Client (bypassed RLS) — der einzige Weg, die
 * SELECT-gesperrte Tabelle project_tokens zu lesen.
 *
 * Aufloesung: trackingKey (in projects.settings.capi.trackingKey, oeffentlich)
 *   -> project_id -> project_tokens.meta_capi_token.
 *
 * Gibt null zurueck, wenn:
 * - der Key leer ist,
 * - kein Projekt diesen trackingKey traegt, ODER
 * - das Projekt (noch) KEINE Token-Zeile hat (trackingKey gesetzt, Token nie
 *   gesetzt / Race). Kein Throw — der fehlende Token ist ein regulaerer Zustand.
 *
 * Scheibe 2a: implementiert + getestet. Consumer (Proxy-Route) erst in Scheibe 2b.
 */
export async function getCapiTokenByTrackingKey(
  trackingKey: string,
): Promise<string | null> {
  const key = trackingKey.trim();
  if (!key) return null;

  const admin = createAdminClient();

  // Schritt 1: trackingKey -> project_id. JSON-Pfad-Filter auf settings.capi.trackingKey.
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("id")
    .eq("settings->capi->>trackingKey", key)
    .maybeSingle();

  if (projectError || !project) return null;

  // Schritt 2: project_id -> Token. Fehlende Zeile (Token nie gesetzt) -> null.
  const { data: row, error: tokenError } = await admin
    .from("project_tokens")
    .select("meta_capi_token")
    .eq("project_id", project.id)
    .maybeSingle();

  if (tokenError || !row) return null;

  return row.meta_capi_token ?? null;
}
