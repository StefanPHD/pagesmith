// Serve-Route (Phase 7 Scheibe 7a): liefert eine PUBLIZIERTE Seite unter
// label.publayer.net aus. NUR intern erreichbar — die Proxy-Datei rewritet Serving-Hosts
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
import {
  chooseVariant,
  parseVariantCookie,
  serializeVariantCookie,
} from "@/lib/hosting/variant";

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
  // DIESELBE Host-Quelle wie die Proxy-Verzweigung (kein Split-Brain).
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

  // Header-Objekt in eine Variable gehoben, damit der Split-Zweig ERGAENZEN kann,
  // ohne den Normalfall anzufassen: ohne aktiven Test ist dieses Objekt
  // schluessel-, wert- UND reihenfolgegleich zu vorher (Invariante i).
  const headers: Record<string, string> = {
    "Content-Type": "text/html; charset=utf-8",
    ...SECURITY_HEADERS,
  };

  // A/B-SPLIT (Phase 9 Scheibe 9b-1). EIN Praedikat entscheidet ueber ALLE DREI
  // Wirkungen (Body-Wahl, Set-Cookie, Cache-Control) — dadurch koennen sie nicht
  // auseinanderlaufen. Der Resolver liefert die beiden Felder nur gemeinsam und nur,
  // wenn der Split wirklich auslieferbar ist (Flag aktiv UND nicht-leeres B): "kein
  // Test" und "Test aber degradiert" sind hier bereits dieselbe Antwort.
  //
  // KILL-SWITCH HAT VORRANG, und zwar STRUKTURELL: blocked/notfound haben die
  // Funktion oben per early return verlassen (ServeResult ist eine diskriminierte
  // Union) -> dieser Code ist fuer ein gesperrtes Projekt gar nicht erreichbar,
  // unabhaengig davon, wo er steht.
  if (result.abTestActive && result.variantBHtml) {
    const { variant, isNew } = chooseVariant(
      parseVariantCookie(request.headers.get("cookie"))
    );
    // Nur bei Neuzuweisung setzen — ein Session-Cookie braucht keine Auffrischung.
    if (isNew) headers["Set-Cookie"] = serializeVariantCookie(variant);
    // NUR bei tatsaechlichem Split: die heutige Antwort ist als "public" ausgewiesen,
    // und eine als public markierte Antwort MIT Set-Cookie ist die Konstellation, in
    // der ein geteilter Zwischen-Cache Antwort samt Cookie speichert und mehreren
    // Besuchern DENSELBEN Bucket gibt. Projekte ohne Test behalten ihre Header.
    headers["Cache-Control"] = "private, no-store";
    return new Response(variant === "b" ? result.variantBHtml : result.html, {
      status: 200,
      headers,
    });
  }

  return new Response(result.html, { status: 200, headers });
}
