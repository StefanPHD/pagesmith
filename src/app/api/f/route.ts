import { handleRelay } from "@/lib/relay/relay";

/**
 * /api/f — das Formular-Relay (Phase 13.6, Scheibe 13.6-3). Erreichbar nur auf dem
 * Serving-Host: `proxy` (src/proxy.ts) laesst RELAY_PATH (src/lib/relay/path.ts) durch, auf
 * dem App-Host steht der Pfad NICHT in `isPublicRoute`. Die Logik steht in
 * src/lib/relay/relay.ts.
 *
 * NUR POST. Eine andere Methode beantwortet Next mit 405 (ABGELEITET, nicht gelesen); sie
 * sagt etwas ueber den Endpunkt, nicht ueber ein Projekt (Setzung P13.6-59 der Phase 13.6,
 * Q3).
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export { handleRelay as POST };
