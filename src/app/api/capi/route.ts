import { handleIngest, handleIngestOptions } from "@/lib/capi/ingest";

/**
 * PERMANENTER ALIAS — NICHT ENTFERNEN.
 *
 * Seit Phase 7 Scheibe 7b ist /api/e der neue neutrale First-Party-Ingest-Trichter;
 * neue Exporte + gehostete Seiten beaconen dorthin. /api/capi bleibt aber DAUERHAFT
 * bestehen: bereits in freier Wildbahn heruntergeladene Alt-Exporte tragen die absolute
 * /api/capi-URL fest eingebacken und beaconen weiter hierher. Wird diese Route entfernt
 * ("die alte capi-Route aufraeumen"), bricht STILL das Tracking aller bereits
 * ausgelieferten Kundenseiten — kein Fehler, nur verschwundene Conversions.
 *
 * Die Logik ist mit /api/e GETEILT (src/lib/capi/ingest.ts), nicht kopiert -> beide
 * Routen verhalten sich zwangslaeufig identisch (inkl. CORS-Header + OPTIONS).
 */
export { handleIngest as POST, handleIngestOptions as OPTIONS };
