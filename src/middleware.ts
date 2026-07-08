import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { isServingHost } from "@/lib/hosting/host";

export async function middleware(request: NextRequest) {
  // HOST-VERZWEIGUNG ZUERST (Phase 7 Scheibe 7a): eine gehostete Seite laeuft auf
  // einer isolierten Origin (*.pgsm.site / lokal *.lvh.me). Solche Requests werden auf
  // die interne Serve-Route rewritet und RETURNEN sofort — das Auth-Gate wird
  // uebersprungen und es werden KEINE App-Session-Cookies angefasst (eTLD+1-Isolation).
  // KEIN DB-Call hier: der Label-Lookup passiert erst in der Node-Serve-Route.
  if (isServingHost(request.headers.get("host") ?? "")) {
    // Phase 7b: First-Party-Ingest. Die gehostete Seite beacont same-origin an /api/e;
    // alte absolute Exporte treffen /api/capi. Diese ZWEI Pfade werden CHIRURGISCH
    // durchgelassen (kein /app-serve-Rewrite), damit sie den echten Route-Handler
    // erreichen — weiterhin OHNE Auth-Gate/updateSession, OHNE App-Cookies. EXAKTER
    // Match, NICHT startsWith("/api") -> jeder andere Pfad wird weiter geserved.
    const path = request.nextUrl.pathname;
    if (path === "/api/e" || path === "/api/capi") {
      return NextResponse.next();
    }
    const url = request.nextUrl.clone();
    url.pathname = "/app-serve";
    return NextResponse.rewrite(url);
  }

  // App-Host: bestehendes Auth-Gate UNVERAENDERT (Session-Refresh + Redirect-Logik).
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Alle Request-Pfade ausser:
     * - _next/static (Build-Assets)
     * - _next/image (Bild-Optimierung)
     * - favicon.ico
     * - statische Bilddateien
     * Damit werden statische Assets nicht durchs Auth-Gate geschleust.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)",
  ],
};
