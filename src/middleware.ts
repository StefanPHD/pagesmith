import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { resolveEffectiveHost, isAppHost } from "@/lib/hosting/host";

export async function middleware(request: NextRequest) {
  // ============================================================================
  // TEMP 7c-1-GATE — Wegwerf-Instrument. MUSS vor dem 7c-1-Abschluss-Commit RAUS
  // (Cleanup-Commit; grep -r "_hostprobe" src == 0). NUR fuer den Vercel-Preview.
  // Laeuft in der EDGE-Runtime — genau dort, wo die sicherheitskritische Branch-
  // Entscheidung faellt — und surfaced die Sicht der ECHTEN resolveEffectiveHost,
  // um die x-forwarded-host-Trust-Boundary zu beweisen. Liefert NIE Cookies/Secrets.
  if (request.nextUrl.pathname === "/api/_hostprobe") {
    const probe = resolveEffectiveHost(request.headers);
    return NextResponse.json({
      rawXForwardedHost: request.headers.get("x-forwarded-host"),
      rawHost: request.headers.get("host"),
      effectiveHost: probe,
      isApp: probe ? isAppHost(probe) : null,
    });
  }
  // ============================================================================

  // HOST-VERZWEIGUNG ZUERST — INVERSION (Phase 7c-1): nicht mehr "ist Serving-Host?",
  // sondern "ist APP-Host?" (geschlossene Allowlist). Dadurch teilen *.pgsm.site UND
  // beliebige Custom-Domains DENSELBEN Serving-Zweig, ohne pro Domain eine Regel.
  // resolveEffectiveHost ist die EINE Host-Quelle fuer diese Verzweigung UND den
  // Lookup in der Node-Serve-Route (kein Split-Brain). KEIN DB-Call hier.
  const host = resolveEffectiveHost(request.headers);
  if (host && isAppHost(host)) {
    // App-Host: bestehendes Auth-Gate UNVERAENDERT (Session-Refresh + Redirect-Logik).
    return updateSession(request);
  }

  // SERVING-ZWEIG (inkl. host === null -> ungueltiger/unbekannter Host): eine
  // gehostete Seite laeuft auf isolierter Origin, ohne Auth-Gate, ohne App-Cookies.
  // Phase 7b: First-Party-Ingest. Die gehostete Seite beacont same-origin an /api/e;
  // alte absolute Exporte treffen /api/capi. Diese ZWEI Pfade werden CHIRURGISCH
  // durchgelassen (kein /app-serve-Rewrite), damit sie den echten Route-Handler
  // erreichen — weiterhin OHNE Auth-Gate/updateSession, OHNE App-Cookies. EXAKTER
  // Match, NICHT startsWith("/api"). Durch die Inversion faellt dieser Passthrough
  // jetzt AUCH fuer Custom-Domains an -> First-Party-Ingest same-origin/adblocker-fest.
  const path = request.nextUrl.pathname;
  if (path === "/api/e" || path === "/api/capi") {
    return NextResponse.next();
  }
  const url = request.nextUrl.clone();
  url.pathname = "/app-serve";
  return NextResponse.rewrite(url);
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
