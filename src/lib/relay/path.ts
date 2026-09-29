// Der Pfad des Formular-Relays (Phase 13.6, Scheibe 13.6-3). Rein, ohne Abhaengigkeiten:
// `proxy` (src/proxy.ts) laesst ihn auf dem Serving-Host durch, die Route liegt unter
// src/app/api/f/route.ts. Neutral und kurz wie /api/e — ein Wort wie "form" oder "collect"
// im Pfad ist ein Kandidat fuer Filterlisten (NICHT gemessen).
//
// NUR AUF DEM SERVING-HOST OEFFENTLICH. Er steht bewusst NICHT in `isPublicRoute`
// (src/lib/supabase/middleware.ts): Das Relay gilt allein fuer gehostete Seiten (Setzungen
// P13.6-20 und P13.6-57 der Phase 13.6), und eine gemeinsame Konstante fuer beide Listen
// oeffnete ihn auf dem App-Host (Vermerk P13.6-58 der Phase 13.6, G1).
export const RELAY_PATH = "/api/f";
