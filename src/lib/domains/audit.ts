import "server-only";
import type { SupabaseClient } from "@supabase/supabase-js";

// Unveraenderliches Mutations-Audit (Tabelle audit_logs, 0009). Server-only: alle Writes/
// Reads laufen ausschliesslich ueber den service_role-Admin-Client (audit_logs traegt
// bewusst KEINE anon/authenticated-Policy -> nur service_role kommt heran). Das Log ist
// zugleich die Datenquelle des Rate-Limits — KEINE zweite Zaehl-Infrastruktur.

/** Ein Audit-Eintrag. GENAU EINER pro Mutations-Aufruf (auch bei frueher Ablehnung). */
export type AuditRecord = {
  userId: string;
  action: string;
  target: string | null;
  outcome: string;
  detail?: unknown;
};

/**
 * Schreibt EINEN Audit-Eintrag ueber den service_role-Client. Wirft NICHT selbst weiter
 * (der Aufrufer ruft dies aus einem finally auf und darf durch einen Log-Fehler NICHT
 * seinen eigentlichen Mutations-Ausgang verlieren) — ein Fehler wird geloggt, nicht
 * geworfen.
 */
export async function writeAuditLog(
  admin: SupabaseClient,
  rec: AuditRecord,
): Promise<void> {
  const { error } = await admin.from("audit_logs").insert({
    user_id: rec.userId,
    action: rec.action,
    target: rec.target,
    outcome: rec.outcome,
    detail: rec.detail ?? null,
  });
  if (error) console.error("[audit] insert failed:", error.message);
}

/**
 * Zaehlt die Audit-Eintraege dieses Users FUER EINE bestimmte action innerhalb des
 * Fensters (Default 1 Stunde) — die Zaehlgrundlage der PRO-ACTION-Rate-Limits. Zaehlt
 * ALLE Versuche dieser action (auch abgelehnte), weil jeder Versuch Aufmerksamkeit/API-
 * Kontingent kostet.
 *
 * ACTION-SPEZIFISCH (nicht mehr global): so zehrt z.B. 'domain_remove' NICHT am
 * 'domain_add_attempt'-Budget und umgekehrt — jede externe-Call-Klasse hat ihr eigenes
 * Limit, ohne dass die eine die andere aushungert.
 *
 * WIRFT bei DB-Fehler (fail-closed fuer DIESEN Request): lieber einen sauberen Fehler +
 * Audit-Eintrag als eine still umgangene Abuse-Schranke. Der User kann erneut versuchen;
 * es entsteht keine dauerhafte Sperre.
 */
export async function countRecentAttempts(
  admin: SupabaseClient,
  userId: string,
  action: string,
  windowMs = 60 * 60 * 1000,
): Promise<number> {
  const since = new Date(Date.now() - windowMs).toISOString();
  const { count, error } = await admin
    .from("audit_logs")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .eq("action", action)
    .gte("created_at", since);
  if (error) throw new Error(`audit count failed: ${error.message}`);
  return count ?? 0;
}
