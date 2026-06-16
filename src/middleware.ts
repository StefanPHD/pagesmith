import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
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
