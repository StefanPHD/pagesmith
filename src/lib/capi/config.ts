import "server-only";

/**
 * Server-only CAPI-Konstanten fuer den Meta-Graph-Forward (Scheibe 2b-i).
 * KEINE Secrets — nur die Graph-API-Version + der optionale (dev-only)
 * Test-Event-Code. Der ECHTE Secret (CAPI-Token) lebt in project_secrets und wird
 * pro Request via service_role aufgeloest (siehe getCapiConfigByTrackingKey).
 * Bis Phase 11 Scheibe 1 stand hier project_tokens; jene Tabelle wird seither nur
 * noch mitgeschrieben (Rollback-Reserve), gelesen wird die neue.
 */

// Meta-Graph-API-Version. Format inkl. "v"-Praefix. Der VORGABEWERT ist die
// Version, die der Waechter prueft: TABELLE in src/lib/capi/version-deadlines.test.ts
// fuehrt sie samt Abschalttermin und Quelle — wer ihn aendert, zieht die Zeile
// "meta" im selben Commit nach. Die Umgebungsvariable gleichen Namens gewinnt
// (getrimmt) und bleibt als NOTAUSGANG; der Waechter sieht sie NICHT.
export const META_GRAPH_VERSION =
  process.env.META_GRAPH_VERSION?.trim() || "v25.0";

/**
 * Der Meta-Test-Event-Code. NUR gesetzt, wenn die env-Variable existiert
 * (dev-only). In Prod (unset) -> "" -> wird NIE an den Meta-Forward angehaengt.
 * NIE hartcodieren.
 */
export const META_TEST_EVENT_CODE =
  process.env.META_TEST_EVENT_CODE?.trim() || "";
