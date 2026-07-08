import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Frischt bei JEDEM Request die Supabase-Session auf und setzt das Auth-Gate
 * durch. Exakt das offizielle @supabase/ssr-Next.js-Muster:
 *
 * - Die Cookies werden zwischen Request und Response durchgereicht (setAll
 *   schreibt auf beide), sonst geht die Session nach einem Reload verloren.
 * - Zwischen createServerClient und auth.getUser() darf KEIN weiterer Code
 *   stehen.
 * - Am Ende wird das unveraenderte supabaseResponse-Objekt zurueckgegeben
 *   (kein neues Response-Objekt), damit die gesetzten Cookies erhalten bleiben.
 *
 * Auth-Gate: nicht eingeloggt -> Redirect auf /login; eingeloggt auf /login
 * -> Redirect auf den Editor (/).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // WICHTIG: kein Code zwischen createServerClient und getUser().
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname;
  const isLoginRoute = path === "/login";
  // BEWUSSTE, CHIRURGISCHE Ausnahme: /api/capi ist der anonyme cross-origin
  // CAPI-Forward-Endpoint (der ausgelieferte Export ruft ihn ohne Session auf).
  // Das Auth-Gate ist hier NICHT mehr der Waechter — der Waechter ist der
  // trackingKey als Capability (unbekannter Key -> 204, kein Forward, kein Leak;
  // in 2b-i gebaut+getestet). NUR dieser eine Pfad wird geoeffnet, NICHT /api
  // pauschal — kuenftige API-Routen bleiben hinter dem Gate.
  const isCapiRoute = path.startsWith("/api/capi");
  // Phase 7b: /api/e ist der neue neutrale Ingest-Trichter (gleiche anonyme Capability
  // wie /api/capi). Auf dem App-Host wird er von alten/neuen absoluten Export-Beacons
  // getroffen -> muss oeffentlich sein. EXAKTER Match, NICHT startsWith("/api/e") — sonst
  // wuerde /api/etwas-anderes faelschlich oeffentlich (der Praefix "/api/e" matcht es).
  const isIngestRoute = path === "/api/e";
  const isPublicRoute = isLoginRoute || isCapiRoute || isIngestRoute;

  if (!user && !isPublicRoute) {
    // Nicht eingeloggt: alles ausser oeffentlichen Pfaden -> /login
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  if (user && isLoginRoute) {
    // Eingeloggt, aber auf der Login-Seite -> zurueck zum Editor
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // supabaseResponse unveraendert zurueckgeben (Cookies erhalten bleiben).
  return supabaseResponse;
}
