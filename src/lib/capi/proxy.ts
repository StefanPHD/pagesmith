// Client-SAFE (KEIN "server-only", anders als config.ts): der CAPI-Proxy-Endpunkt
// wird in den ausgelieferten Export gebacken und muss daher im Browser-Bundle
// verfuegbar sein. Enthaelt KEIN Secret — nur die oeffentliche App-URL.
//
// Scheibe 2b-ii / 7b: der Client-Beacon (sendBeacon) im EXPORT-Download zielt auf den
// neutralen Ingest-Trichter /api/e (Phase 7b). Weil die ausgelieferte Seite auf einer
// FREMDEN Domain laeuft, muss die URL hier ABSOLUT sein — ein relativer Pfad zeigte
// dort ins Leere. (Die GEHOSTETE Variante nutzt beim Publish stattdessen den relativen
// /api/e-Pfad, same-origin -> siehe CodeImporter.buildFunctionalDocument.)
// Alte, bereits heruntergeladene Exporte tragen fest die absolute /api/capi-URL; die
// bleibt als PERMANENTER Alias bedient (siehe src/app/api/capi/route.ts).
//
// FAIL-LOUD: fehlt/leer NEXT_PUBLIC_APP_URL -> "" (der Aufrufer/das Wiring baut dann
// KEINEN Beacon + warnt). KEIN Fallback auf einen relativen Pfad und KEIN
// NEXT_PUBLIC_VERCEL_URL-Fallback (das waere die fluechtige Deployment-URL, nicht die
// feste Proxy-Domain) -> lieber sichtbar aus als still auf einen kaputten Pfad.
//
// NEXT_PUBLIC_APP_URL wird von Next zur BUILD-ZEIT als Literal ins Client-Bundle
// inlined (Dev: .env.local = http://localhost:3000; Prod: im Vercel-Project-Env auf
// die Pagesmith-Domain gesetzt).

/**
 * Die absolute Ingest-URL (`${NEXT_PUBLIC_APP_URL}/api/e`) oder "" wenn die
 * env-Variable fehlt/leer ist. Trailing-Slashes der Basis werden normalisiert.
 * Fuer den EXPORT-Download (fremde Domain -> absolut noetig). Der Publish nutzt den
 * relativen /api/e-Pfad (same-origin, kein env).
 */
export function getCapiProxyUrl(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";
  if (!base) return "";
  return `${base.replace(/\/+$/, "")}/api/e`;
}
