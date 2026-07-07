import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// Form des in published_content abgelegten Snapshots. Fuer die Serve-Route zaehlt NUR
// html (das beim Publish CLIENT-generierte funktionale Dokument); mappings/settings/
// publishedAt reisen fuer Re-Publish/7b mit, werden hier NICHT gebraucht.
type PublishedContent = { html?: string } | null;

/**
 * Loest ein OEFFENTLICHES Subdomain-Label server-seitig zum ausgelieferten HTML auf.
 * Nutzt den service_role-Client (bypassed RLS) — Serving ist ANONYM (kein Owner), und
 * domains hat KEINE anon-SELECT-Policy.
 *
 * ZWEI-Schritt (wie token.ts): label -> project_id (domains) -> published_content
 * (projects). Selektiert AUSSCHLIESSLICH project_id + published_content — NIE
 * html/mappings/settings/token der Draft-Ebene. Damit ist der service_role-Read kein
 * Bypass zu App-Daten: nur das bewusst publizierte Artefakt verlaesst den Server.
 *
 * Gibt null zurueck (KEIN Throw — jeder Zustand ist regulaer), wenn:
 * - das Label leer ist,
 * - kein domains-Eintrag dieses Label traegt,
 * - das Projekt (noch) kein published_content hat, ODER
 * - der Snapshot kein html traegt.
 */
export async function getPublishedHtmlByLabel(
  label: string
): Promise<string | null> {
  const key = label.trim();
  if (!key) return null;

  const admin = createAdminClient();

  // Schritt 1: label -> project_id (nur diese eine Spalte).
  const { data: domain, error: domainError } = await admin
    .from("domains")
    .select("project_id")
    .eq("label", key)
    .maybeSingle();

  if (domainError || !domain) return null;

  // Schritt 2: project_id -> published_content (nur diese eine Spalte; kein Draft).
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("published_content")
    .eq("id", domain.project_id)
    .maybeSingle();

  if (projectError || !project) return null;

  const published = project.published_content as PublishedContent;
  const html = published?.html;
  return html && html.trim() ? html : null;
}
