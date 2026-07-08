import { handleIngest, handleIngestOptions } from "@/lib/capi/ingest";

/**
 * /api/e — neutraler First-Party-Ingest-Trichter (Phase 7 Scheibe 7b).
 *
 * Gehostete Seiten (*.pgsm.site) beaconen relativ hierher -> same-origin ->
 * adblocker-resistent (das First-Party-Versprechen). Neue Exporte beaconen absolut
 * (${NEXT_PUBLIC_APP_URL}/api/e). Die Handler-Logik ist mit /api/capi GETEILT
 * (src/lib/capi/ingest.ts) — dieselben Funktionsreferenzen, kein Copy-Paste, identische
 * CORS-Header + OPTIONS. Heute nur Meta-CAPI-Forward; Phase-8-Persistenz haengt sich
 * spaeter ADDITIV in denselben Trichter.
 */
export { handleIngest as POST, handleIngestOptions as OPTIONS };
