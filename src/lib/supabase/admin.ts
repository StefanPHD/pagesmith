import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Privilegierter Supabase-Client mit dem service_role-Key. service_role BYPASSED
 * RLS by default -> er ist der EINZIGE Weg an die Geheimnis-Tabellen, die fuer
 * anon/authenticated verschlossen sind.
 *
 * HEUTIGER ZUSTAND (seit Phase 11, erster Scheibe): GELESEN wird project_secrets
 * (getCapiConfigByTrackingKey). GESCHRIEBEN wird in BEIDE — project_secrets UND
 * project_tokens (Doppelschreib in setCapiToken/removeCapiToken; die Alt-Tabelle
 * ist die Rollback-Reserve). Bis dahin stand hier, dieser Client sei der
 * "Lese-Pfad fuer project_tokens" — jene Tabelle wird im Produktivcode nur noch
 * BESCHRIEBEN, nie gelesen. Richtiggestellt, weil der Satz erklaeren soll, wofuer
 * es diesen Client gibt; mit der falschen Tabelle erklaert er das Gegenteil.
 *
 * SECRETS-DISZIPLIN (hart):
 * - `import "server-only"` erzwingt einen Build-Fehler, sollte dieses Modul jemals
 *   aus einer Client-Komponente importiert werden.
 * - SUPABASE_SERVICE_ROLE_KEY ist NON-NEXT_PUBLIC -> im Client-Bundle ohnehin
 *   `undefined`. Der Key gehoert NUR in .env.local (gitignored), NIE ins Repo, NIE
 *   in den Export.
 * - Keine Cookies/Session: dieser Client traegt KEINE User-Identitaet, er umgeht
 *   RLS bewusst. Aufrufer muessen die Autorisierung selbst sicherstellen.
 */
export function createAdminClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: { persistSession: false, autoRefreshToken: false },
    },
  );
}
