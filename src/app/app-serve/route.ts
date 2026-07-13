// Serve-Route (Phase 7 Scheibe 7a): liefert eine PUBLIZIERTE Seite unter
// label.publayer.net aus. NUR intern erreichbar — die Middleware rewritet Serving-Hosts
// (*.publayer.net / *.lvh.me) hierher; ein direkter Zugriff ueber den App-Host wird vom
// Label-Guard mit 404 abgewiesen (kein Bypass zu App-Daten).
//
// Node-Runtime: braucht den service_role-Admin-Client (im Resolver), der server-only
// ist. Kein DOM noetig — das funktionale HTML wurde beim Publish CLIENT-seitig erzeugt
// und liegt fertig in published_content; hier wird es nur ausgeliefert.
import {
  getPublishedHtmlByLabel,
  getPublishedHtmlByCustomHost,
} from "@/lib/hosting/resolve";
import { extractLabel, resolveEffectiveHost } from "@/lib/hosting/host";

export const runtime = "nodejs";
// Immer frisch aus published_content (Scheibe 7a bewusst OHNE Cache; Cache +
// Publish-Invalidierung kommen zusammen in einer spaeteren Scheibe).
export const dynamic = "force-dynamic";

// Security-Baseline. KEIN striktes CSP (bräche Pixel/Beacon der gehosteten Seite).
// X-Frame-Options DENY: eine ausgelieferte Landingpage soll nicht framebar sein.
const SECURITY_HEADERS: Record<string, string> = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

function notFound(): Response {
  return new Response("Not found", {
    status: 404,
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}

export async function GET(request: Request): Promise<Response> {
  // DIESELBE Host-Quelle wie die Middleware-Verzweigung (kein Split-Brain).
  const host = resolveEffectiveHost(request.headers);

  // GUARD: ungueltiger/leerer Host -> 404 ohne jeden Lookup. Kein Bypass.
  if (!host) return notFound();

  // DISPATCH: ein pgsm/lvh-Serving-Host traegt ein Label (extractLabel ist
  // suffix-bewusst) -> Label-Lookup; jeder andere gueltige Host ist eine
  // Custom-Domain -> exakter custom_host-Lookup. Sauberer Zweig-Split ohne
  // Ueberlappung (extractLabel liefert fuer Nicht-pgsm/lvh-Hosts null).
  const label = extractLabel(host);
  const html = label
    ? await getPublishedHtmlByLabel(label)
    : await getPublishedHtmlByCustomHost(host);
  if (!html) return notFound(); // unbekannter Host/Label ODER nie publiziert

  return new Response(html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS },
  });
}
