import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

/**
 * Supabase-Client fuer den Server (Server-Komponenten, Server-Actions,
 * Route-Handler). Liest die Session aus den Request-Cookies via Next.js
 * cookies() (in Next 16 asynchron).
 *
 * setAll kann in reinen Server-Komponenten fehlschlagen, weil dort keine
 * Cookies gesetzt werden duerfen — das ist unkritisch, weil die Middleware
 * die Session-Cookies bei jedem Request auffrischt. Daher das try/catch
 * gemaess offiziellem @supabase/ssr-Muster.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            );
          } catch {
            // Aufruf aus einer Server-Komponente: kann ignoriert werden, solange
            // die Middleware die Session aktualisiert.
          }
        },
      },
    },
  );
}
