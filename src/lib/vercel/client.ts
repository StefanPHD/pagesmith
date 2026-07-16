import "server-only";
import type { VercelDomainConfig } from "@/lib/domains/config";

// Server-only Vercel-Domains-API-Client. NUR HTTP + Fehler-Uebersetzung — KEINE
// Geschaeftslogik, KEIN DB. Der Aufrufer (lib/domains/register, lib/domains/status)
// sichert Autorisierung, Cap, Rate-Limit und Persistenz.
//
// SECRETS-DISZIPLIN (wie admin.ts): `import "server-only"` erzwingt einen Build-Fehler
// bei versehentlichem Client-Import. VERCEL_API_TOKEN + VERCEL_PROJECT_ID sind
// NON-NEXT_PUBLIC -> im Client-Bundle undefined; gehoeren NUR in .env.local, NIE ins Repo.
//
// TOKEN-SCOPE: projekt-gebundener Token (Least-Privilege). Empirisch bestaetigt
// (7c-2b-Vorab-Check): GET .../domains lieferte MIT und OHNE ?teamId= identisch 200 ->
// der projekt-gebundene Token loest das Team/Projekt selbst auf. teamId wird daher NICHT
// gesendet (VERCEL_TEAM_ID bleibt bewusst ungenutzt; erst noetig, falls der Token je auf
// einen team-scoped Token getauscht wird).

const VERCEL_API = "https://api.vercel.com";

// Striktes Timeout: interaktive Owner-Mutation, aber ein haengender Drittanbieter darf
// die Serverless-Funktion nicht bis ans Plattform-Limit (Hobby 10s) blockieren -> wir
// brechen bei 8s selbst kontrolliert ab (Skalierungs-Manifest A: jeder externe Call
// braucht ein striktes Timeout).
const TIMEOUT_MS = 8000;

/** Der (Teil-)Domain-Zustand aus Vercels Antwort — nur die Felder, die wir lesen. */
export type VercelDomainBody = {
  name?: string;
  apexName?: string;
  projectId?: string;
  verified?: boolean;
  // Roher Verification-Block (Array) — hier NICHT interpretiert, roh weitergereicht.
  verification?: unknown;
};

/**
 * Diskriminiertes Ergebnis des Add-Calls. Der Aufrufer verzweigt AUSSCHLIESSLICH ueber
 * `kind` — nie ueber rohe HTTP-Codes.
 *
 * EMPIRISCH KORRIGIERT (7c-2b-Vorab-Check, echter Doppel-Add): der Owner-Retry auf die
 * EIGENE Projekt-Domain liefert real HTTP 409 mit error.code "domain_already_in_use"
 * (NICHT 400, wie die Doku nahelegte) -> `already_on_project` (Heilungsausloeser). Der
 * 409-Body traegt das aktuelle Domain-Objekt in error.domain mit -> kein Refetch noetig.
 */
export type VercelAddResult =
  | { kind: "ok"; body: VercelDomainBody }
  // 409 + code "domain_already_in_use" + projectId === UNSER Projekt -> heilen.
  | { kind: "already_on_project"; domain: VercelDomainBody | null }
  // jedes andere 409 -> Domain gehoert einem ANDEREN Konto/Projekt.
  | { kind: "conflict_other_account" }
  // 400 -> Vercel haelt die Domain fuer ungueltig (Autoritaet fuer Gueltigkeit).
  | { kind: "invalid_domain" }
  // 403 -> kein Zugriff auf die Domain.
  | { kind: "no_access" }
  // Abbruch durch das 8s-Timeout.
  | { kind: "timeout" }
  // alles Uebrige (5xx, 401/402, Netzwerkfehler, fehlende env).
  | { kind: "error"; status: number };

type VercelErrorBody = {
  error?: { code?: string; projectId?: string; domain?: VercelDomainBody };
};

/**
 * Fuegt EINE Domain dem konfigurierten Vercel-Projekt hinzu (POST /v10/projects/{id}/
 * domains, verifiziert gegen die aktuelle Vercel-Doku). Reine (domainName) -> Result-Fn.
 */
export async function addDomainToVercel(
  domainName: string,
): Promise<VercelAddResult> {
  const token = process.env.VERCEL_API_TOKEN;
  const projectId = process.env.VERCEL_PROJECT_ID;
  if (!token || !projectId) return { kind: "error", status: 0 };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(
      `${VERCEL_API}/v10/projects/${encodeURIComponent(projectId)}/domains`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: domainName }),
        signal: controller.signal,
      },
    );
  } catch {
    // AbortError (Timeout) von echten Netzwerkfehlern trennen.
    return controller.signal.aborted
      ? { kind: "timeout" }
      : { kind: "error", status: 0 };
  } finally {
    clearTimeout(timer);
  }

  const body: unknown = await res.json().catch(() => null);

  if (res.ok) return { kind: "ok", body: (body as VercelDomainBody) ?? {} };

  const err = (body as VercelErrorBody | null)?.error;

  if (res.status === 409) {
    // Diskriminator: eigenes Projekt (heilen) vs. fremdes Konto (Konflikt).
    if (err?.code === "domain_already_in_use" && err.projectId === projectId) {
      return { kind: "already_on_project", domain: err.domain ?? null };
    }
    return { kind: "conflict_other_account" };
  }
  if (res.status === 400) return { kind: "invalid_domain" };
  if (res.status === 403) return { kind: "no_access" };
  return { kind: "error", status: res.status };
}

/**
 * Diskriminiertes Ergebnis des Config-Lesecalls. Der Aufrufer (status.ts) verzweigt
 * ueber `kind`; bei !ok behaelt er den letzten DB-Stand (kein Clobbern guter Daten).
 */
export type VercelConfigResult =
  | { kind: "ok"; config: VercelDomainConfig }
  | { kind: "timeout" }
  | { kind: "error"; status: number };

/**
 * Liest die DNS-/Zertifikats-Konfiguration EINER Domain (GET /v6/domains/{domain}/config,
 * verifiziert gegen die aktuelle Vercel-Doku + echten GET). Reine (domainName) ->
 * Result-Fn mit eigenem 8s-Timeout (Skalierungs-Manifest: jeder externe Call).
 *
 * KEIN projectIdOrName/teamId: empirisch bestaetigt (echter GET gegen publayer.net, 200),
 * dass der projekt-gebundene Token die bereits assoziierte Domain ohne Zusatzparameter
 * aufloest. projectIdOrName ist laut Doku nur noetig, wenn die Domain NOCH KEINEM Projekt
 * zugeordnet ist — unsere sind es (per addDomainToVercel).
 */
export async function getDomainConfig(
  domainName: string,
): Promise<VercelConfigResult> {
  const token = process.env.VERCEL_API_TOKEN;
  if (!token) return { kind: "error", status: 0 };

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

  let res: Response;
  try {
    res = await fetch(
      `${VERCEL_API}/v6/domains/${encodeURIComponent(domainName)}/config`,
      {
        headers: { Authorization: `Bearer ${token}` },
        signal: controller.signal,
      },
    );
  } catch {
    return controller.signal.aborted
      ? { kind: "timeout" }
      : { kind: "error", status: 0 };
  } finally {
    clearTimeout(timer);
  }

  const body: unknown = await res.json().catch(() => null);
  if (res.ok) return { kind: "ok", config: (body as VercelDomainConfig) ?? {} };
  return { kind: "error", status: res.status };
}
