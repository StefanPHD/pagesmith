import { createBrowserClient } from "@supabase/ssr";

/**
 * Supabase-Client fuer den Browser (Client-Komponenten, z.B. die Login/Signup-
 * Formulare). Liest/Schreibt die Auth-Cookies ueber document.cookie; die
 * Session-Aktualisierung passiert serverseitig in der Middleware.
 *
 * Nur die beiden oeffentlichen, durch RLS abgesicherten Keys werden verwendet.
 * Der service_role-Key kommt hier NIEMALS vor.
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
