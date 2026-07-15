import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { slugForLabel, randomLabelSuffix } from "@/lib/hosting/host";
import { normalizeDomain } from "@/lib/domains/normalize";
import { addDomainToVercel, type VercelDomainBody } from "@/lib/vercel/client";
import { writeAuditLog, countRecentAttempts, type AuditRecord } from "@/lib/domains/audit";

// REINE (userId, params) -> Result-Mutation (MCP-vorbereitet, Session-unabhaengig):
// Autorisierung DAVOR (Ownership-Gate), Geschaeftslogik DAHINTER. Bewusst KEIN
// "use server"-Modul -> waere es eine Server-Action, koennte ein Client userId frei
// waehlen (Bypass). Die "use server"-Schicht (app/projects/domain-actions) reicht die
// verifizierte userId aus der Session herein; MCP (Phase 10) haengt sich mit EIGENER
// Autorisierung an denselben Eingang.

// Per-User-Hard-Cap (Hobby-Kontingent + Abuse-Schutz, 7c-2-Grundkonzept). Niedriger
// MVP-Richtwert; Pro-Upgrade VOR echter Skalierung.
const CAP_PER_USER = 3;
// Rate-Limit: max. Registrierungsversuche pro Stunde/User (auf Abuse kalibriert, zaehlt
// AUCH abgelehnte Versuche). Erstes Rate-Limiting im Projekt.
const RATE_LIMIT_PER_HOUR = 5;
// DNS-Name-Obergrenze (Kappung des geloggten Rohwerts bei frueher Ablehnung).
const MAX_TARGET_LEN = 253;

export type AddDomainReason =
  | "not_owner"
  | "empty"
  | "wildcard_rejected"
  | "invalid_format"
  | "invalid_domain"
  | "rate_limited"
  | "cap_reached"
  | "conflict_other_account"
  | "vercel_error"
  | "internal_error";

export type AddDomainResult =
  // status ist IMMER "pending" — nie aus Vercels (unzuverlaessigem) verified-Flag
  // abgeleitet; der echte Status kommt aus dem Config-Poll (7c-2c). healed=true, wenn
  // Vercel die Domain bereits auf UNSEREM Projekt hatte und die DB-Zeile nachgeholt wurde.
  | { ok: true; status: "pending"; healed: boolean }
  | { ok: false; error: string; reason: AddDomainReason };

/**
 * Registriert eine Custom-Domain fuer ein Projekt. Reihenfolge bindend (billig ->
 * teuer): Ownership -> Normalisierung -> lokale Kollision -> Rate-Limit -> Cap ->
 * Vercel-Call -> Fehler-Mapping -> Persistenz + Audit.
 *
 * GENAU EIN Audit-Eintrag pro Aufruf: jeder Zweig setzt `audit`/`result` und return't;
 * der finally-Block schreibt exakt einmal. Ein Fehler beim Log-Write ueberschreibt den
 * Mutations-Ausgang NIE (writeAuditLog wirft nicht; zusaetzlich hier defensiv gefasst).
 */
export async function registerCustomDomain(
  userId: string,
  params: { projectId: string; domainName: string },
): Promise<AddDomainResult> {
  const admin = createAdminClient();
  const rawTarget = (params.domainName ?? "").slice(0, MAX_TARGET_LEN);

  let result: AddDomainResult = {
    ok: false,
    error: "Interner Fehler.",
    reason: "internal_error",
  };
  let audit: AuditRecord = {
    userId,
    action: "domain_add_attempt",
    target: rawTarget || null,
    outcome: "internal_error",
  };

  try {
    // 1) OWNERSHIP-GATE — explizit user_id vergleichen (session-unabhaengig, MCP-faehig).
    //    Der Admin-Client bypassed RLS bewusst; die Autorisierung ist der EXPLIZITE
    //    Vergleich hier. KEIN privilegierter WRITE laeuft, bevor dieses Gate besteht.
    const { data: proj, error: projErr } = await admin
      .from("projects")
      .select("user_id")
      .eq("id", params.projectId)
      .maybeSingle();
    if (projErr) throw projErr;
    if (!proj || proj.user_id !== userId) {
      result = { ok: false, error: "Projekt nicht gefunden.", reason: "not_owner" };
      audit = { ...audit, outcome: "rejected_not_owner" };
      return result;
    }

    // 2) NORMALISIERUNG + Formvalidierung (inkl. Wildcard-Ablehnung).
    const norm = normalizeDomain(params.domainName);
    if (!norm.ok) {
      const reason: AddDomainReason =
        norm.reason === "empty"
          ? "empty"
          : norm.reason === "wildcard_rejected"
            ? "wildcard_rejected"
            : norm.reason === "invalid_format"
              ? "invalid_format"
              : "invalid_domain";
      result = { ok: false, error: rejectionMessage(reason), reason };
      audit = { ...audit, outcome: `rejected_${reason}` };
      return result;
    }
    const host = norm.host;
    audit = { ...audit, target: host };

    // 3) LOKALER DB-KOLLISIONSCHECK (global via admin; custom_host ist global unique).
    const { data: existing, error: exErr } = await admin
      .from("domains")
      .select("project_id")
      .eq("custom_host", host)
      .maybeSingle();
    if (exErr) throw exErr;
    if (existing) {
      if (existing.project_id === params.projectId) {
        // Schon auf DIESEM Projekt registriert -> idempotenter Erfolg (kein Vercel-Call).
        result = { ok: true, status: "pending", healed: false };
        audit = { ...audit, outcome: "already_registered_self" };
        return result;
      }
      // Auf einem ANDEREN Projekt (eigenes oder fremdes) -> eine Domain servt genau ein
      // Projekt -> Konflikt, nicht heilen.
      result = {
        ok: false,
        error: "Diese Domain ist bereits anderswo verknuepft.",
        reason: "conflict_other_account",
      };
      audit = { ...audit, outcome: "rejected_conflict_local" };
      return result;
    }

    // 4) RATE-LIMIT (Audit-Log-Query; zaehlt ALLE Versuche der letzten Stunde).
    const attempts = await countRecentAttempts(admin, userId);
    if (attempts >= RATE_LIMIT_PER_HOUR) {
      result = {
        ok: false,
        error: "Zu viele Versuche. Bitte in einer Stunde erneut.",
        reason: "rate_limited",
      };
      audit = { ...audit, outcome: "rejected_rate_limited" };
      return result;
    }

    // 5) PER-USER-HARD-CAP (bestehende custom_host-Zeilen dieses Users, RLS-unabhaengig
    //    via inner-Join-Filter auf projects.user_id).
    const { count, error: capErr } = await admin
      .from("domains")
      .select("label, projects!inner(user_id)", { count: "exact", head: true })
      .not("custom_host", "is", null)
      .eq("projects.user_id", userId);
    if (capErr) throw capErr;
    if ((count ?? 0) >= CAP_PER_USER) {
      result = {
        ok: false,
        error: `Domain-Limit erreicht (max. ${CAP_PER_USER}).`,
        reason: "cap_reached",
      };
      audit = { ...audit, outcome: "rejected_cap_reached" };
      return result;
    }

    // 6) VERCEL-CALL (mit striktem Timeout im Client).
    const vercel = await addDomainToVercel(host);

    // 7) FEHLER-MAPPING (diskriminiert ueber kind, nie ueber rohe Codes).
    switch (vercel.kind) {
      case "conflict_other_account":
        result = {
          ok: false,
          error: "Diese Domain ist bereits mit einem anderen Konto verknuepft.",
          reason: "conflict_other_account",
        };
        audit = { ...audit, outcome: "vercel_conflict_other_account" };
        return result;
      case "no_access":
        result = {
          ok: false,
          error: "Kein Zugriff auf diese Domain.",
          reason: "vercel_error",
        };
        audit = { ...audit, outcome: "vercel_no_access" };
        return result;
      case "invalid_domain":
        result = { ok: false, error: "Domain ungueltig.", reason: "invalid_domain" };
        audit = { ...audit, outcome: "vercel_invalid_domain" };
        return result;
      case "timeout":
        result = {
          ok: false,
          error: "Zeitueberschreitung bei Vercel. Bitte erneut versuchen.",
          reason: "vercel_error",
        };
        audit = { ...audit, outcome: "vercel_timeout" };
        return result;
      case "error":
        result = {
          ok: false,
          error: "Domain konnte nicht registriert werden.",
          reason: "vercel_error",
        };
        audit = { ...audit, outcome: `vercel_error_${vercel.status}` };
        return result;
    }

    // vercel.kind === "ok" | "already_on_project" -> beides muendet in Persistenz.
    // HEILUNG: das aktuelle Domain-Objekt liegt beim 409 bereits im Body (error.domain),
    // kein Refetch noetig. status bleibt IMMER "pending".
    const healed = vercel.kind === "already_on_project";
    const domainBody: VercelDomainBody | null =
      vercel.kind === "ok" ? vercel.body : vercel.domain;
    const verification = domainBody?.verification ?? null;

    // 8) PERSISTENZ (custom_host + roher verification-Block + Status "pending").
    const persist = await persistDomainRow(admin, {
      projectId: params.projectId,
      host,
      verification,
    });
    if (persist === "race") {
      // 23505 auf custom_host -> paralleler Add hat bereits geschrieben -> idempotent.
      result = { ok: true, status: "pending", healed };
      audit = { ...audit, outcome: healed ? "healed_race" : "success_race" };
      return result;
    }
    if (persist !== null) throw new Error(persist);

    result = { ok: true, status: "pending", healed };
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
    // GENAU EIN Audit-Eintrag pro Aufruf. Ein Log-Fehler darf den Ausgang NIE
    // ueberschreiben/maskieren -> zusaetzlich zum nicht-werfenden writeAuditLog defensiv.
    try {
      await writeAuditLog(admin, audit);
    } catch (logErr) {
      console.error("[register] audit write failed:", logErr);
    }
  }
}

/** Nutzerlesbare Meldung je Ablehnungsgrund der Normalisierung. */
function rejectionMessage(reason: AddDomainReason): string {
  switch (reason) {
    case "empty":
      return "Bitte eine Domain angeben.";
    case "wildcard_rejected":
      return "Wildcard-Domains (*.) werden nicht unterstuetzt.";
    case "invalid_format":
      return "Bitte nur den Hostnamen angeben (ohne Pfad oder Port).";
    default:
      return "Domain ungueltig.";
  }
}

/**
 * Schreibt die domains-Zeile fuer die Custom-Domain (Admin-Client, nach bestandenem
 * Gate). Erzeugt ein global eindeutiges Label (slug + Random) mit Kollisions-Retry.
 *
 * Rueckgabe: null = geschrieben; "race" = 23505 auf dem custom_host-Index (paralleler
 * Add) -> vom Aufrufer idempotent behandelt; sonst eine Fehlermeldung (String).
 *
 * ZWEI unique-Quellen: das Label (PK) und custom_host (partial-unique, 7c-1). Bei 23505
 * unterscheiden wir ueber die Constraint-/Detail-Meldung: custom_host -> "race"; sonst
 * Label-Kollision -> neuer Suffix.
 */
async function persistDomainRow(
  admin: ReturnType<typeof createAdminClient>,
  input: { projectId: string; host: string; verification: unknown },
): Promise<null | "race" | string> {
  const base = slugForLabel(input.host);
  for (let i = 0; i < 6; i++) {
    const label = `${base}-${randomLabelSuffix()}`;
    const { error } = await admin.from("domains").insert({
      label,
      project_id: input.projectId,
      custom_host: input.host,
      verification_status: "pending",
      verification: input.verification,
    });
    if (!error) return null;
    if (error.code === "23505") {
      const detail = `${error.message ?? ""} ${error.details ?? ""}`.toLowerCase();
      if (detail.includes("custom_host")) return "race";
      continue; // Label-Kollision -> neuer Kandidat.
    }
    return error.message ?? "insert failed";
  }
  return "label allocation exhausted";
}
