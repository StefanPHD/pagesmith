"use server";

import { createClient } from "@/lib/supabase/server";
import {
  registerCustomDomain,
  type AddDomainResult,
} from "@/lib/domains/register";
import {
  checkDomainStatus,
  type CheckDomainStatusResult,
} from "@/lib/domains/status";

// Duenne "use server"-Schicht: uebersetzt die Session in eine verifizierte userId und
// reicht sie an die reine (userId, params)-Mutation weiter. KEINE Geschaeftslogik hier —
// so bleibt registerCustomDomain session-unabhaengig (MCP-Wiederverwendung, Phase 10)
// und der userId-Parameter ist NICHT client-waehlbar (die Session bestimmt ihn).
//
// NEXT-REGEL (Runtime-Fallstrick): eine "use server"-Datei darf keine IMPORTIERTEN Typen
// RE-exportieren (`export type { X } from …`-Muster) — der Server-Actions-Loader
// enumeriert die Exporte und referenziert den Namen zur Laufzeit, obwohl der Typ beim
// Kompilieren geloescht ist -> ReferenceError beim Modul-Laden. AddDomainResult /
// CheckDomainStatusResult werden daher NICHT hier re-exportiert; Konsumenten importieren
// sie direkt aus @/lib/domains/register bzw. @/lib/domains/status. LOKALE `export type`
// (CustomDomainListItem unten, wie in actions.ts) sind unproblematisch.

/**
 * Eine Custom-Domain-Zeile fuer die UI-Liste (nur die angezeigten Spalten).
 * IDENTITAET ueber `label` (der echte PK der domains-Tabelle, 0006) — die Tabelle hat
 * KEINE id-Spalte. Ein frueheres `id` fuehrte zu einem stillen 400 (column does not
 * exist) und einer leeren Liste.
 */
export type CustomDomainListItem = {
  label: string;
  host: string;
  verificationStatus: "pending" | "verified" | "misconfigured" | null;
  syncedAt: string | null;
};

/**
 * Diskriminiertes Listen-Ergebnis: "leer" (ok:true, domains:[]) und "kaputt" (ok:false)
 * duerfen UI-seitig NICHT gleich aussehen — genau diese fehlende Unterscheidung hat den
 * id-Bug unsichtbar gemacht (Fehler verschluckt -> leeres Array).
 */
export type ListDomainsResult =
  | { ok: true; domains: CustomDomainListItem[] }
  | { ok: false; error: string };

/**
 * Server-Action: registriert eine Custom-Domain fuer das Projekt des eingeloggten Users.
 * projectId + domainName kommen vom Client; die userId kommt AUSSCHLIESSLICH aus der
 * Server-Session (nie aus Client-Argumenten).
 */
export async function addCustomDomain(
  projectId: string,
  domainName: string,
): Promise<AddDomainResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, error: "Nicht eingeloggt.", reason: "not_owner" };
  }
  return registerCustomDomain(user.id, { projectId, domainName });
}

/**
 * Server-Action: prueft/aktualisiert den DNS-Status EINER Custom-Domain des Users.
 * domainLabel (der domains-PK) kommt vom Client; die userId AUSSCHLIESSLICH aus der
 * Session. Ownership-Gate + Server-Cache-Bremse liegen in checkDomainStatus (session-frei).
 */
export async function checkDomainStatusAction(
  domainLabel: string,
): Promise<CheckDomainStatusResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    return { ok: false, reason: "not_owner", error: "Nicht eingeloggt." };
  }
  return checkDomainStatus(user.id, domainLabel);
}

/**
 * Server-Action: listet die Custom-Domains EINES Projekts (nur die Anzeige-Spalten).
 * Ownership ueber den authenticated-Client (RLS greift) + expliziten user_id-Filter auf
 * das Projekt. Bewusst MINIMAL (7c-2c-Scope): kein Paging, keine Feature-Sortierung — nur
 * eine deterministische Reihenfolge (custom_host) fuer stabiles Rendering.
 */
export async function listProjectDomains(
  projectId: string,
): Promise<ListDomainsResult> {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: "Nicht eingeloggt." };

  // Ownership-Gate: nur wenn das Projekt dem User gehoert, ueberhaupt Domains lesen.
  const { data: proj, error: projErr } = await supabase
    .from("projects")
    .select("id")
    .eq("id", projectId)
    .eq("user_id", user.id)
    .maybeSingle();
  if (projErr) {
    console.error("[listProjectDomains] project lookup failed:", projErr.message);
    return { ok: false, error: "Domains konnten nicht geladen werden." };
  }
  // Kein Projekt gefunden (nicht eigenes / existiert nicht) ist KEIN Fehler -> leer.
  if (!proj) return { ok: true, domains: [] };

  // IDENTITAET ueber `label` (PK, 0006) — NICHT `id` (existiert nicht -> 400).
  const { data, error } = await supabase
    .from("domains")
    .select("label, custom_host, verification_status, vercel_synced_at")
    .eq("project_id", projectId)
    .not("custom_host", "is", null)
    .order("custom_host", { ascending: true });

  // Fehler NICHT mehr verschlucken: server-seitig loggen + unterscheidbaren
  // Fehlerzustand zurueckgeben (nicht in ein leeres Array falten).
  if (error) {
    console.error("[listProjectDomains] domains read failed:", error.message);
    return { ok: false, error: "Domains konnten nicht geladen werden." };
  }

  const domains = (data ?? []).map((r) => ({
    label: r.label as string,
    host: r.custom_host as string,
    verificationStatus: (r.verification_status ?? null) as
      | "pending"
      | "verified"
      | "misconfigured"
      | null,
    syncedAt: (r.vercel_synced_at ?? null) as string | null,
  }));
  return { ok: true, domains };
}
