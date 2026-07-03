import "server-only";

/**
 * Server-only CAPI-Konstanten fuer den Meta-Graph-Forward (Scheibe 2b-i).
 * KEINE Secrets — nur die Graph-API-Version + der optionale (dev-only)
 * Test-Event-Code. Der ECHTE Secret (CAPI-Token) lebt in project_tokens und wird
 * pro Request via service_role aufgeloest (siehe token.ts).
 */

// Meta-Graph-API-Version. Env-uebersteuerbar, damit ein Version-Bump ohne
// Code-Aenderung geht; Default als stabiler Fallback. Format inkl. "v"-Praefix.
export const META_GRAPH_VERSION =
  process.env.META_GRAPH_VERSION?.trim() || "v21.0";

/**
 * Der Meta-Test-Event-Code. NUR gesetzt, wenn die env-Variable existiert
 * (dev-only). In Prod (unset) -> "" -> wird NIE an den Meta-Forward angehaengt.
 * NIE hartcodieren.
 */
export const META_TEST_EVENT_CODE =
  process.env.META_TEST_EVENT_CODE?.trim() || "";
