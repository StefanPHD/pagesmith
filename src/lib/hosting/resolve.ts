import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";

// Form des in published_content abgelegten Snapshots. Fuer die Serve-Route zaehlt NUR
// html (das beim Publish CLIENT-generierte funktionale Dokument); mappings/settings/
// publishedAt reisen fuer Re-Publish/7b mit, werden hier NICHT gebraucht.
type PublishedContent = { html?: string } | null;

/**
 * Serve-Resultat (Kill-Switch, Tier 0). DISKRIMINIERT, damit die Route BLOCKED (451)
 * von NOTFOUND (404) unterscheidet — beides ist Nicht-Auslieferung, aber semantisch
 * verschieden (451 bleibt rein fuer echtes blocked_at reserviert; kein Fehler-Statuscode).
 *
 * FAIL-CLOSED: jeder unklare Zustand (DB-Fehler, fehlende Zeile, fehlendes html, fehlende
 * blocked_at-Spalte weil Migration 0008 noch nicht lief) faellt auf "notfound" ->
 * published_content wird NIE ausgeliefert, solange der Zustand nicht eindeutig "ok" ist.
 * Ein faelschlich dunkler Kunde ist ein Support-Ticket; eine faelschlich weiterlaufende
 * Phishing-Seite ist Reputationsschaden fuer ALLE auf der geteilten Wildcard.
 */
export type ServeResult =
  | { kind: "ok"; html: string }
  | { kind: "blocked" }
  | { kind: "notfound" };

const NOT_FOUND: ServeResult = { kind: "notfound" };
const BLOCKED: ServeResult = { kind: "blocked" };

/**
 * Zwei-Schritt-Lookup + Sperr-Auswertung, GETEILT zwischen Label- und Custom-Host-Pfad
 * (nur die Match-Spalte unterscheidet sich). Nutzt den service_role-Client (bypassed RLS)
 * — Serving ist ANONYM (kein Owner), und domains hat KEINE anon-SELECT-Policy.
 *
 * Projektions-Disziplin unveraendert: NUR project_id/published_content (+ blocked_at),
 * NIE html/mappings/settings/token der Draft-Ebene -> kein Bypass zu App-Daten; nur das
 * bewusst publizierte Artefakt verlaesst den Server. blocked_at reitet in DERSELBEN
 * Projektion mit -> KEIN zusaetzlicher Roundtrip (Serving-Schlankheit).
 *
 * SPERRE VOR html-Praesenz geprueft: ein gesperrtes Projekt ist "blocked", auch wenn
 * (noch) kein html vorliegt. BEIDE Ebenen (Domain UND Projekt) in einer Bedingung ->
 * die Domain-Ebene ist spaeter ohne Umbau scharf (in dieser Scheibe nicht gesetzt).
 */
async function resolvePublished(
  matchColumn: "label" | "custom_host",
  value: string
): Promise<ServeResult> {
  const key = value.trim();
  if (!key) return NOT_FOUND;

  const admin = createAdminClient();

  // Schritt 1: match -> project_id + blocked_at (Domain-Ebene).
  const { data: domain, error: domainError } = await admin
    .from("domains")
    .select("project_id, blocked_at")
    .eq(matchColumn, key)
    .maybeSingle();

  if (domainError || !domain) return NOT_FOUND;
  if (domain.blocked_at) return BLOCKED;

  // Schritt 2: project_id -> published_content + blocked_at (Projekt-Ebene; kein Draft).
  const { data: project, error: projectError } = await admin
    .from("projects")
    .select("published_content, blocked_at")
    .eq("id", domain.project_id)
    .maybeSingle();

  if (projectError || !project) return NOT_FOUND;
  if (project.blocked_at) return BLOCKED;

  const published = project.published_content as PublishedContent;
  const html = published?.html;
  return html && html.trim() ? { kind: "ok", html } : NOT_FOUND;
}

/**
 * Loest ein OEFFENTLICHES Subdomain-Label server-seitig zum Serve-Resultat auf.
 * Zustaende siehe ServeResult (ok / blocked / notfound; fail-closed).
 */
export function getPublishedHtmlByLabel(label: string): Promise<ServeResult> {
  return resolvePublished("label", label);
}

/**
 * Wie getPublishedHtmlByLabel, aber fuer eine CUSTOM-DOMAIN (Phase 7c-1): matcht den
 * EXAKTEN Custom-Host statt des Labels. Gleiche Projektions-Disziplin, gleiche
 * Sperr-/Fail-closed-Semantik.
 */
export function getPublishedHtmlByCustomHost(
  customHost: string
): Promise<ServeResult> {
  return resolvePublished("custom_host", customHost);
}
