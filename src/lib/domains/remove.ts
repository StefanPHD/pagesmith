import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { removeDomainFromVercel } from "@/lib/vercel/client";
import {
  writeAuditLog,
  countRecentAttempts,
  type AuditRecord,
} from "@/lib/domains/audit";

// REINE (userId, params) -> Result-Mutation (MCP-vorbereitet, session-unabhaengig, wie
// registerCustomDomain): Autorisierung DAVOR (Ownership-Gate), Geschaeftslogik DAHINTER.
// KEIN "use server" -> sonst waere userId ein client-waehlbarer Server-Action-Parameter
// (Bypass). Die "use server"-Schicht (app/projects/domain-actions) reicht die Session-
// userId herein.
//
// REIHENFOLGE BINDEND: ZUERST Vercel-DELETE (autoritative externe Quelle), ERST NACH
// Erfolg die eigene DB-Zeile loeschen. Schlaegt Vercel fehl, BLEIBT die DB-Zeile (Nutzer
// sieht die Domain, kann erneut) — die umgekehrte Reihenfolge hinterliesse bei einem
// Vercel-Fehler eine unsichtbare, aber weiter das Kontingent belastende Domain.

// Eigenes Remove-Rate-Limit (action='domain_remove'): jeder Remove loest einen echten
// Vercel-API-Call aus und verdient denselben Abuse-Schutz wie Add. Getrennt gezaehlt ->
// zehrt NICHT am Add-Budget und umgekehrt.
const RATE_LIMIT_PER_HOUR = 5;

export type RemoveDomainReason =
  | "not_owner"
  | "not_custom_domain"
  | "rate_limited"
  | "vercel_error"
  | "internal_error";

export type RemoveDomainResult =
  // healed=true, wenn Vercel 404 lieferte (Domain war schon weg) -> Ziel erreicht.
  | { ok: true; healed: boolean }
  | { ok: false; error: string; reason: RemoveDomainReason };

type DomainOwnerRow = {
  custom_host: string | null;
  projects: { user_id?: string } | { user_id?: string }[] | null;
};

/** PostgREST liefert den to-one-Embed mal als Objekt, mal als Array -> normalisieren. */
function ownerId(projects: DomainOwnerRow["projects"]): string | undefined {
  if (!projects) return undefined;
  return Array.isArray(projects) ? projects[0]?.user_id : projects.user_id;
}

/**
 * Entfernt eine Custom-Domain: Vercel-DELETE zuerst, DB-Zeile erst nach Erfolg.
 *
 * Reihenfolge: Ownership-Gate -> Serving-Row-Schutz -> Rate-Limit -> Vercel-DELETE ->
 * (nur bei ok|404) DB-Delete -> Audit. GENAU EIN Audit-Eintrag pro Aufruf (finally);
 * ein Log-Fehler ueberschreibt den Mutations-Ausgang NIE.
 */
export async function removeCustomDomain(
  userId: string,
  params: { domainLabel: string },
): Promise<RemoveDomainResult> {
  const admin = createAdminClient();
  const label = params.domainLabel;

  let result: RemoveDomainResult = {
    ok: false,
    error: "Interner Fehler.",
    reason: "internal_error",
  };
  let audit: AuditRecord = {
    userId,
    action: "domain_remove",
    target: label || null,
    outcome: "internal_error",
  };

  try {
    // 1) OWNERSHIP-GATE — Zeile per label lesen + Projekt-Owner explizit vergleichen.
    //    Der Admin-Client bypassed RLS bewusst; die Autorisierung ist DIESER Vergleich.
    //    KEIN Vercel-Call/DELETE, bevor das Gate besteht.
    const { data, error: rowErr } = await admin
      .from("domains")
      .select("custom_host, projects!inner(user_id)")
      .eq("label", label)
      .maybeSingle();
    if (rowErr) throw rowErr;

    const row = data as DomainOwnerRow | null;
    if (!row || ownerId(row.projects) !== userId) {
      // IDOR-safe: fremde/unbekannte Zeile -> generische Meldung, kein Vercel-Call.
      result = { ok: false, error: "Domain nicht gefunden.", reason: "not_owner" };
      audit = { ...audit, outcome: "rejected_not_owner" };
      return result;
    }

    // 2) SERVING-ROW-SCHUTZ: eine label-only-Zeile (custom_host null) ist die
    //    *.publayer.net-Publish-Subdomain, KEINE entfernbare Custom-Domain.
    if (!row.custom_host) {
      result = {
        ok: false,
        error: "Diese Domain kann hier nicht entfernt werden.",
        reason: "not_custom_domain",
      };
      audit = { ...audit, outcome: "rejected_not_custom_domain" };
      return result;
    }
    const host = row.custom_host;
    audit = { ...audit, target: host };

    // 3) RATE-LIMIT (eigenes Budget: action='domain_remove', zaehlt ALLE Remove-Versuche).
    const attempts = await countRecentAttempts(admin, userId, "domain_remove");
    if (attempts >= RATE_LIMIT_PER_HOUR) {
      result = {
        ok: false,
        error: "Zu viele Versuche. Bitte in einer Stunde erneut.",
        reason: "rate_limited",
      };
      audit = { ...audit, outcome: "rejected_rate_limited" };
      return result;
    }

    // 4) VERCEL-DELETE ZUERST (autoritative externe Quelle, mit striktem Timeout).
    const vercel = await removeDomainFromVercel(host);

    // 5) FEHLER-MAPPING: nur ok|not_found fuehren zur DB-Loeschung. Jeder andere Fehler
    //    -> DB-Zeile BLEIBT (kein Delete), Nutzer kann erneut.
    if (vercel.kind === "timeout") {
      result = {
        ok: false,
        error: "Zeitueberschreitung bei Vercel. Bitte erneut versuchen.",
        reason: "vercel_error",
      };
      audit = { ...audit, outcome: "vercel_timeout" };
      return result;
    }
    if (vercel.kind === "error") {
      result = {
        ok: false,
        error: "Domain konnte nicht entfernt werden.",
        reason: "vercel_error",
      };
      audit = { ...audit, outcome: `vercel_error_${vercel.status}` };
      return result;
    }

    // vercel.kind === "ok" | "not_found": 404 = schon weg -> heilen (Ziel erreicht).
    const healed = vercel.kind === "not_found";

    // 6) ERST NACH Vercel-Erfolg: DB-Zeile loeschen. Admin-Client, weil domains KEINE
    //    DELETE-Policy fuer authenticated hat (0006) — service_role NACH bestandenem Gate.
    const { error: delErr } = await admin
      .from("domains")
      .delete()
      .eq("label", label);
    if (delErr) throw delErr;

    result = { ok: true, healed };
    audit = { ...audit, outcome: healed ? "healed" : "success" };
    return result;
  } catch (e) {
    result = { ok: false, error: "Interner Fehler.", reason: "internal_error" };
    audit = {
      ...audit,
      outcome: "internal_error",
      detail: e instanceof Error ? e.message : String(e),
    };
    return result;
  } finally {
    // GENAU EIN Audit-Eintrag pro Aufruf; ein Log-Fehler darf den Ausgang NIE maskieren.
    try {
      await writeAuditLog(admin, audit);
    } catch (logErr) {
      console.error("[remove] audit write failed:", logErr);
    }
  }
}
