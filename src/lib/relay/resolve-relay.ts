import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { extractLabel } from "@/lib/hosting/host";
import {
  deliverableVariantB,
  nonEmptyHtml,
  parseVariantCookie,
} from "@/lib/hosting/variant";

// DIE SUCHE DES FORMULAR-RELAYS (Phase 13.6, Scheibe 13.6-3; Setzungen P13.6-57 und P13.6-59
// der Phase 13.6, Q1 und Q2): Host -> Projekt -> veroeffentlichtes Formular-Ziel zur Kennung.
//
// EINE EIGENE SUCHE NEBEN resolvePublished (src/lib/hosting/resolve.ts), und das ist eine
// Entscheidung (Q1): Der Resolver gibt nur html heraus, und die Serve-Route wird fuer ein
// Refactoring nicht angefasst. DERSELBE ZWEI-SCHRITT, DIESELBE PROJEKTION, DIESELBEN
// PRAEDIKATE (nonEmptyHtml, deliverableVariantB, parseVariantCookie — nur gelesen). Dass die
// Urteile beider Wege gleich bleiben, haelt der Test R-PARITY in relay.test.ts, kein Kommentar.
//
// DIE ADRESSE KOMMT AUSSCHLIESSLICH AUS published_content (Setzung P13.6-20): Die Projektion
// liest weder die Entwurfs-Spalten (mappings, html) noch settings, und die Anfrage liefert nur
// den Host, die Kennung und das Cookie.

/** Das Zeitlimit JE Abfrage (Setzung P13.6-59, Q5; SETZUNG, NICHT GEMESSEN). */
export const RELAY_LOOKUP_TIMEOUT_MS = 1_500;

/**
 * Warum die Suche nichts liefert — eigenes Vokabular, nie ein Wert aus der Datenbank.
 * - "lookup-failed": eine Abfrage meldet einen Fehler, auch bei mehr als einer Zeile
 *   (maybeSingle) oder bei Zeitueberschreitung.
 * - "unknown-host": keine Domain- oder keine Projekt-Zeile.
 * - "blocked": Kill-Switch an Domain oder Projekt.
 * - "not-published": keine auslieferbare Seite (dasselbe Urteil wie die Auslieferung).
 * - "bad-mappings": ein Mapping-Satz hat nicht die Form einer Liste.
 * - "unknown-id": kein Formular-Ziel zur Kennung.
 * - "ambiguous": mehr als ein Formular-Ziel zur Kennung in einem Satz.
 * - "variant-conflict": aktiver Test ohne Cookie, A und B tragen verschiedene Adressen (Q2).
 */
export type RelayLookupFail =
  | "lookup-failed"
  | "unknown-host"
  | "blocked"
  | "not-published"
  | "bad-mappings"
  | "unknown-id"
  | "ambiguous"
  | "variant-conflict";

type PublishedForRelay = {
  html?: unknown;
  mappings?: unknown;
  variantB?: { html?: unknown; mappings?: unknown } | null;
} | null;

/**
 * Das Projekt hinter einem Host. abTestActive: derselbe Split wie in der Auslieferung.
 * projectId (Scheibe 13.6-5, additiv): die Kennung aus der domains-Zeile, ueber die das
 * Projekt gelesen wurde — der Schluessel des Zaehlers (src/lib/relay/rate-limit.ts).
 */
export type RelayProject =
  | {
      kind: "ok";
      projectId: string;
      published: NonNullable<PublishedForRelay>;
      abTestActive: boolean;
    }
  | { kind: "fail"; reason: RelayLookupFail };

/**
 * Das Formular-Ziel zur Kennung. config ist UNGEPRUEFT; der Aufrufer prueft die Werte.
 * projectId: s. RelayProject.
 */
export type RelayTarget =
  | { kind: "ok"; projectId: string; config: unknown }
  | { kind: "fail"; reason: RelayLookupFail };

// Eine Abfrage mit Zeitlimit (Muster persistEvent, src/lib/analytics/persist.ts). Ein
// Abbruch, ein Wurf und ein Fehler-Objekt sind dasselbe Urteil: "lookup-failed".
async function withLookupTimeout<T>(
  run: (signal: AbortSignal) => PromiseLike<{ data: T | null; error: unknown }>
): Promise<{ ok: true; data: T | null } | { ok: false }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RELAY_LOOKUP_TIMEOUT_MS);
  try {
    const { data, error } = await run(controller.signal);
    if (error) return { ok: false };
    return { ok: true, data };
  } catch {
    return { ok: false };
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Host -> Projekt. Der Host kommt aus resolveEffectiveHost (normalisiert, shape-geprueft).
 * Label-Host -> Suche ueber label, jeder andere Host -> ueber custom_host (dieselbe
 * Verzweigung wie die Serve-Route).
 */
export async function lookupRelayProject(host: string): Promise<RelayProject> {
  const label = extractLabel(host);
  const matchColumn = label ? "label" : "custom_host";
  const value = (label ?? host).trim();
  if (!value) return { kind: "fail", reason: "unknown-host" };

  const admin = createAdminClient();

  const domainResult = await withLookupTimeout<{
    project_id: string;
    blocked_at: string | null;
  }>((signal) =>
    admin
      .from("domains")
      .select("project_id, blocked_at")
      .eq(matchColumn, value)
      .abortSignal(signal)
      .maybeSingle()
  );
  if (!domainResult.ok) return { kind: "fail", reason: "lookup-failed" };
  const domain = domainResult.data;
  if (!domain) return { kind: "fail", reason: "unknown-host" };
  // KILL-SWITCH, DOMAIN-EBENE — eigener, sichtbarer Zweig (Dauerregel "KILL-SWITCH ALS
  // EXPLIZITER, FAIL-CLOSED ZWEIG"; Setzung P13.6-23). Anders als der Ingest (Vorrat P13.6-29)
  // prueft das Relay BEIDE Ebenen, wie die Auslieferung.
  if (domain.blocked_at) return { kind: "fail", reason: "blocked" };

  const projectResult = await withLookupTimeout<{
    published_content: unknown;
    blocked_at: string | null;
    ab_test_active: boolean | null;
  }>((signal) =>
    admin
      .from("projects")
      .select("published_content, blocked_at, ab_test_active")
      .eq("id", domain.project_id)
      .abortSignal(signal)
      .maybeSingle()
  );
  if (!projectResult.ok) return { kind: "fail", reason: "lookup-failed" };
  const project = projectResult.data;
  if (!project) return { kind: "fail", reason: "unknown-host" };
  // KILL-SWITCH, PROJEKT-EBENE — vor jedem Blick in published_content.
  if (project.blocked_at) return { kind: "fail", reason: "blocked" };

  const published = project.published_content as PublishedForRelay;
  // Wird die Seite nicht ausgeliefert, leitet das Relay auch nicht weiter.
  if (!published || !nonEmptyHtml(published.html))
    return { kind: "fail", reason: "not-published" };

  const abTestActive =
    project.ab_test_active === true &&
    deliverableVariantB(published as { html?: string; variantB?: { html?: string } | null }) !==
      null;
  return { kind: "ok", projectId: domain.project_id, published, abTestActive };
}

type Found =
  | { kind: "none" }
  | { kind: "one"; config: unknown }
  | { kind: "fail"; reason: "bad-mappings" | "ambiguous" };

// Das Formular-Ziel zur Kennung in EINEM Mapping-Satz. published_content ist Stand des
// Clients (Vorrat P13.6-30): Form und Eindeutigkeit sind nicht garantiert, beides wird hier
// geprueft. Ein fehlender Satz (undefined) traegt kein Ziel; alles andere als eine Liste ist
// eine unbekannte Form.
function findFormTarget(set: unknown, formId: string): Found {
  if (set === undefined || set === null) return { kind: "none" };
  if (!Array.isArray(set)) return { kind: "fail", reason: "bad-mappings" };
  const hits = set.filter(
    (m): m is { config: unknown } =>
      !!m &&
      typeof m === "object" &&
      (m as { elementId?: unknown }).elementId === formId &&
      (m as { type?: unknown }).type === "formTarget"
  );
  if (hits.length === 0) return { kind: "none" };
  if (hits.length > 1) return { kind: "fail", reason: "ambiguous" };
  return { kind: "one", config: hits[0].config };
}

function asTarget(found: Found, projectId: string): RelayTarget {
  if (found.kind === "fail") return found;
  if (found.kind === "none") return { kind: "fail", reason: "unknown-id" };
  return { kind: "ok", projectId, config: found.config };
}

function endpointOf(config: unknown): string | null {
  if (!config || typeof config !== "object") return null;
  const endpoint = (config as { endpoint?: unknown }).endpoint;
  return typeof endpoint === "string" ? endpoint.trim() : null;
}

/**
 * Host + Kennung (+ Cookie) -> das veroeffentlichte Formular-Ziel.
 *
 * DER MAPPING-SATZ (Vermerk P13.6-58, G3; Setzung P13.6-59, Q2):
 * - Kein auslieferbarer Test: IMMER Satz A — auch mit einem Cookie "b". Das Flag ist die
 *   Autoritaet, nicht das Cookie.
 * - Aktiver Test, Cookie "a" bzw. "b": dieser Satz.
 * - Aktiver Test OHNE gueltiges Cookie: BEIDE Saetze. Weitergeleitet wird, wenn genau einer
 *   ein Ziel zur Kennung traegt oder beide dieselbe Adresse; bei zwei verschiedenen Adressen
 *   "variant-conflict". Das Cookie waehlt nur zwischen zwei veroeffentlichten und geprueften
 *   Adressen DESSELBEN Projekts.
 */
export async function resolveRelayTarget(
  host: string,
  formId: string,
  cookieHeader: string | null
): Promise<RelayTarget> {
  const project = await lookupRelayProject(host);
  if (project.kind === "fail") return project;
  const { published, projectId } = project;
  const setA = published.mappings;
  const setB = published.variantB?.mappings;

  if (!project.abTestActive) return asTarget(findFormTarget(setA, formId), projectId);

  const variant = parseVariantCookie(cookieHeader);
  if (variant === "a") return asTarget(findFormTarget(setA, formId), projectId);
  if (variant === "b") return asTarget(findFormTarget(setB, formId), projectId);

  const inA = findFormTarget(setA, formId);
  const inB = findFormTarget(setB, formId);
  if (inA.kind === "fail") return inA;
  if (inB.kind === "fail") return inB;
  if (inA.kind === "one" && inB.kind === "one") {
    const a = endpointOf(inA.config);
    const b = endpointOf(inB.config);
    if (a === null || a !== b) return { kind: "fail", reason: "variant-conflict" };
    return { kind: "ok", projectId, config: inA.config };
  }
  if (inA.kind === "one") return { kind: "ok", projectId, config: inA.config };
  if (inB.kind === "one") return { kind: "ok", projectId, config: inB.config };
  return { kind: "fail", reason: "unknown-id" };
}
