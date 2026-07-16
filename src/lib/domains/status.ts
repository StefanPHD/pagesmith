import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { getDomainConfig } from "@/lib/vercel/client";
import {
  deriveFineState,
  deriveGrobStatus,
  pickDnsRecords,
  currentlySeenRecords,
  type VercelDomainConfig,
  type FineState,
  type GrobStatus,
  type DnsRecords,
} from "@/lib/domains/config";
import { isApexHost, recordHostName } from "@/lib/domains/apex";

// REINE (userId, domainLabel) -> Result-Fn (MCP-vorbereitet, session-unabhaengig):
// Ownership-Gate DAVOR, dann Server-Cache-Bremse, dann ggf. Vercel-Call. Die
// "use server"-Schicht (app/projects/domain-actions) reicht nur die Session-userId herein.
// IDENTITAET ueber `label` (domains-PK, 0006) — die Tabelle hat KEINE id-Spalte.

// Server-Cache-Bremse (tab-/client-/skript-UNABHAENGIG, die tragende Kontrolle): ist der
// letzte Vercel-Abgleich juenger als das Fenster, wird der zwischengespeicherte DB-Stand
// zurueckgegeben, OHNE Vercel erneut zu fragen. Der Client-Cooldown (10s) + Auto-Poll-
// Stop sind nur zusaetzliche UX-Gesten, nicht die Absicherung.
const FRESH_MS = 20_000;

export type DomainStatus = {
  label: string;
  host: string;
  isApex: boolean;
  recordName: string;
  fineState: FineState;
  grobStatus: GrobStatus | null;
  dns: DnsRecords;
  seen: { a: string[]; cname: string[] };
  syncedAt: string | null;
  fromCache: boolean;
  // true, wenn ein faelliger Vercel-Refresh scheiterte (Timeout/Fehler) und wir bewusst
  // den letzten guten DB-Stand zeigen, statt ihn zu ueberschreiben.
  refreshFailed: boolean;
};

export type CheckDomainStatusResult =
  | { ok: true; status: DomainStatus }
  | {
      ok: false;
      reason: "not_owner" | "not_found" | "internal_error";
      error: string;
    };

type DomainRow = {
  custom_host: string | null;
  apex_name: string | null;
  verification_status: GrobStatus | null;
  dns_config: VercelDomainConfig | null;
  vercel_synced_at: string | null;
  projects: { user_id?: string } | { user_id?: string }[] | null;
};

/** PostgREST liefert den to-one-Embed mal als Objekt, mal als Array -> normalisieren. */
function ownerId(projects: DomainRow["projects"]): string | undefined {
  if (!projects) return undefined;
  return Array.isArray(projects) ? projects[0]?.user_id : projects.user_id;
}

/** Baut den (abgeleiteten) UI-Status aus einem Row + Config-Snapshot. */
function buildStatus(
  label: string,
  host: string,
  apexName: string | null,
  config: VercelDomainConfig | null,
  grob: GrobStatus | null,
  meta: { syncedAt: string | null; fromCache: boolean; refreshFailed: boolean },
): DomainStatus {
  const cfg = config ?? {};
  const apex = isApexHost(host, apexName);
  return {
    label,
    host,
    isApex: apex,
    recordName: recordHostName(host, apexName, apex),
    fineState: deriveFineState(cfg),
    grobStatus: grob,
    dns: pickDnsRecords(cfg, apex),
    seen: currentlySeenRecords(cfg),
    syncedAt: meta.syncedAt,
    fromCache: meta.fromCache,
    refreshFailed: meta.refreshFailed,
  };
}

/**
 * Prueft/aktualisiert den DNS-/Zertifikatsstatus EINER Custom-Domain.
 *
 * Reihenfolge: Ownership-Gate -> Cache-Bremse -> (falls faellig) Vercel-Call ->
 * DB-Update -> abgeleiteter Status. Ein faelliger, aber gescheiterter Refresh gibt den
 * letzten DB-Stand + refreshFailed zurueck (kein Clobbern guter Daten).
 */
export async function checkDomainStatus(
  userId: string,
  domainLabel: string,
): Promise<CheckDomainStatusResult> {
  const admin = createAdminClient();
  try {
    // 1) OWNERSHIP-GATE — Domain -> Projekt-Owner, expliziter Vergleich (wie
    //    registerCustomDomain). Fremdes/unbekanntes Label -> KEIN Vercel-Call.
    const { data, error } = await admin
      .from("domains")
      .select(
        "custom_host, apex_name, verification_status, dns_config, vercel_synced_at, projects!inner(user_id)",
      )
      .eq("label", domainLabel)
      .maybeSingle();
    if (error) return { ok: false, reason: "internal_error", error: error.message };

    const row = data as DomainRow | null;
    if (!row || !row.custom_host) {
      return { ok: false, reason: "not_found", error: "Domain nicht gefunden." };
    }
    if (ownerId(row.projects) !== userId) {
      // Bewusst dieselbe Meldung wie not_found -> keine Existenz-Preisgabe (IDOR).
      return { ok: false, reason: "not_owner", error: "Domain nicht gefunden." };
    }

    const host = row.custom_host;
    const cached = row.dns_config ?? null;
    const syncedAt = row.vercel_synced_at;

    // 2) CACHE-BREMSE — frischer DB-Stand vorhanden -> ohne Vercel zurueck.
    const fresh =
      !!syncedAt && Date.now() - new Date(syncedAt).getTime() < FRESH_MS;
    if (fresh && cached) {
      return {
        ok: true,
        status: buildStatus(domainLabel, host, row.apex_name, cached, row.verification_status, {
          syncedAt,
          fromCache: true,
          refreshFailed: false,
        }),
      };
    }

    // 3) ECHTER VERCEL-CALL (mit striktem Timeout im Client).
    const res = await getDomainConfig(host);
    if (res.kind !== "ok") {
      // Timeout/Fehler -> letzten guten Stand behalten, NICHT ueberschreiben.
      return {
        ok: true,
        status: buildStatus(domainLabel, host, row.apex_name, cached, row.verification_status, {
          syncedAt,
          fromCache: true,
          refreshFailed: true,
        }),
      };
    }

    // 4) DB AKTUALISIEREN (dns_config roh + grober Status + Sync-Zeit) und zurueck.
    const grob = deriveGrobStatus(res.config);
    const now = new Date().toISOString();
    const { error: upErr } = await admin
      .from("domains")
      .update({
        dns_config: res.config,
        verification_status: grob,
        vercel_synced_at: now,
      })
      .eq("label", domainLabel);
    if (upErr) return { ok: false, reason: "internal_error", error: upErr.message };

    return {
      ok: true,
      status: buildStatus(domainLabel, host, row.apex_name, res.config, grob, {
        syncedAt: now,
        fromCache: false,
        refreshFailed: false,
      }),
    };
  } catch (e) {
    return {
      ok: false,
      reason: "internal_error",
      error: e instanceof Error ? e.message : String(e),
    };
  }
}
