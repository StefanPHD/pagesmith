// Client-SAFE (KEIN "server-only", anders als config.ts): der CAPI-Proxy-Endpunkt
// wird in den ausgelieferten Export gebacken und muss daher im Browser-Bundle
// verfuegbar sein. Enthaelt KEIN Secret — nur die oeffentliche App-URL.
//
// Scheibe 2b-ii: der Client-Beacon (sendBeacon) zielt auf DIESELBE /api/capi-Route,
// die die Server-Forward-Route (2b-i) bereitstellt. Weil die ausgelieferte Seite auf
// einer FREMDEN Domain laeuft, muss die URL ABSOLUT sein — ein relativer Pfad
// (/api/capi) zeigte dort ins Leere.
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
 * Die absolute CAPI-Proxy-URL (`${NEXT_PUBLIC_APP_URL}/api/capi`) oder "" wenn die
 * env-Variable fehlt/leer ist. Trailing-Slashes der Basis werden normalisiert.
 */
export function getCapiProxyUrl(): string {
  const base = process.env.NEXT_PUBLIC_APP_URL?.trim() ?? "";
  if (!base) return "";
  return `${base.replace(/\/+$/, "")}/api/capi`;
}
