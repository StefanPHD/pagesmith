"use server";

import { createClient } from "@/lib/supabase/server";
import {
  registerCustomDomain,
  type AddDomainResult,
} from "@/lib/domains/register";

// Duenne "use server"-Schicht: uebersetzt die Session in eine verifizierte userId und
// reicht sie an die reine (userId, params)-Mutation weiter. KEINE Geschaeftslogik hier —
// so bleibt registerCustomDomain session-unabhaengig (MCP-Wiederverwendung, Phase 10)
// und der userId-Parameter ist NICHT client-waehlbar (die Session bestimmt ihn).
export type { AddDomainResult };

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
