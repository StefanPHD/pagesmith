import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Privilegierter Supabase-Client mit dem service_role-Key. service_role BYPASSED
 * RLS by default -> das ist der EINZIGE Lese-Pfad fuer die RLS-SELECT-gesperrte
 * Tabelle project_tokens (Read-Consumer in Scheibe 2b).
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
