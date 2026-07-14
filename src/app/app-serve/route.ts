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
  type ServeResult,
} from "@/lib/hosting/resolve";
import { extractLabel, resolveEffectiveHost } from "@/lib/hosting/host";
import { renderBlockedPage } from "@/lib/hosting/blocked-page";

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

// Kill-Switch (Tier 0): ein gesperrtes Projekt -> 451 + minimale statische Erklaerseite,
// NIE published_content. Security-Header wie auf allen Pfaden. Die Kontaktzeile ist
// conditional: NEXT_PUBLIC_ABUSE_CONTACT wird getrimmt; leer/ungesetzt/nur-Whitespace
// -> keine Zeile (renderBlockedPage entscheidet). Server-seitig zur Request-Zeit gelesen.
function blocked(): Response {
  const contact = process.env.NEXT_PUBLIC_ABUSE_CONTACT?.trim();
  return new Response(renderBlockedPage(contact || undefined), {
    status: 451,
    headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS },
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
  const result: ServeResult = label
    ? await getPublishedHtmlByLabel(label)
    : await getPublishedHtmlByCustomHost(host);

  // Kill-Switch VOR der Auslieferung: gesperrt -> 451; notfound (inkl. fail-closed bei
  // unklarem Zustand) -> 404; nur "ok" liefert published_content aus.
  if (result.kind === "blocked") return blocked();
  if (result.kind === "notfound") return notFound();

  return new Response(result.html, {
    status: 200,
    headers: { "Content-Type": "text/html; charset=utf-8", ...SECURITY_HEADERS },
  });
}
