import "server-only";
import { isAppHost, resolveEffectiveHost } from "@/lib/hosting/host";
import { PS_ID_RE } from "@/lib/detect";
import { formTargetProblem, ownFormTargetDomains } from "@/lib/form-target";
import { errorName } from "@/lib/errors";
import { allowedRelayEndpoint } from "./hosts";
import { countRelayHit } from "./rate-limit";
import { resolveRelayTarget, type RelayLookupFail } from "./resolve-relay";

// DAS FORMULAR-RELAY (Phase 13.6, Scheibe 13.6-3). Eine gehostete Seite schickt die Felder
// eines Formulars mit Ziel an ihren EIGENEN Host (`POST /api/f?f=<ps-Kennung>`); das Relay
// bestimmt das Projekt aus dem Host, liest aus der VEROEFFENTLICHTEN Fassung das Ziel zur
// Kennung, prueft dessen Adresse gegen die Host-Liste und leitet den Rumpf unveraendert
// weiter. In dieser Scheibe ruft es noch keine ausgelieferte Seite auf (Setzung P13.6-56).
//
// WAS HIER GILT, UND WO ES STEHT (Standdatei der Phase 13.6):
// - Formularinhalte laufen durch, werden aber NIE gespeichert, NIE geloggt, gehen NIE an
//   /api/e und NIE an ein Tracking-Ziel (Owner-Entscheidung P13.6-16). Der Rumpf wird nur als
//   Bytes gelesen und weitergereicht — nicht dekodiert, nicht geparst.
// - Genau ZWEI Antworten, ohne Rumpf und ohne Ursache: 204 "zugestellt", 502 "nicht
//   zugestellt" (Setzungen P13.6-21 und P13.6-59, Q3). Sperre, unbekannter Host, unbekannte
//   Kennung und ein Fehler beim Empfaenger sind von aussen gleich.
// - Kein Wurf verlaesst den Relay-Pfad (Setzung P13.6-50, R3): Was bei einem Absturz ins
//   Plattform-Log gelangt, ist weder gelesen noch gemessen.
// - Eine Logzeile je Fehlschlag, nur eigenes Vokabular, dazu hoechstens der Upstream-Status
//   als Zahl oder der Fehlertyp (errorName) (Setzung P13.6-59, Q4). Nie Rumpf, Adresse, Host,
//   Kennung oder ein Fremdtext. Seit der Scheibe 13.6-5 dazu hoechstens eine Zeile
//   "fail-open", wenn trotz eines ausgefallenen Zaehlers weitergeleitet wird.
// - Die Ratenbegrenzung je Projekt steht unmittelbar vor der Weiterleitung
//   (src/lib/relay/rate-limit.ts; Setzung P13.6-75).
// Die Waechter dafuer stehen in relay.test.ts (R-LOG, R-NOTHROW, R-RESP).

/** Das Zeitlimit der Weiterleitung (Setzung P13.6-59, Q5; SETZUNG, NICHT GEMESSEN). */
export const RELAY_FORWARD_TIMEOUT_MS = 5_000;

/** Die Hoechstgroesse des eingehenden Rumpfs (Setzung P13.6-59, Q6; SETZUNG). */
export const RELAY_MAX_BODY_BYTES = 64 * 1024;

const FORM_CONTENT_TYPE = "application/x-www-form-urlencoded";

/** Das geschlossene Vokabular der Logzeile. */
type RelayFailReason =
  | RelayLookupFail
  | "unknown-host"
  | "app-host"
  | "bad-id"
  | "bad-content-type"
  | "body-too-large"
  | "body-read-failed"
  | "invalid-target"
  | "data-saver"
  | "host-not-listed"
  | "rate-limited"
  | "upstream-status"
  | "upstream-error"
  | "unexpected";

// Genau diese Kopfzeile, nichts sonst — kein Set-Cookie, keine CORS-Koepfe (der Aufruf ist
// same-origin; Exporte bleiben browser-direkt, Setzung P13.6-20).
const RESPONSE_HEADERS: Record<string, string> = { "Cache-Control": "no-store" };

function delivered(): Response {
  return new Response(null, { status: 204, headers: RESPONSE_HEADERS });
}

function notDelivered(
  reason: RelayFailReason,
  detail?: { status?: number; error?: unknown }
): Response {
  let line = `[relay] not delivered: ${reason}`;
  if (detail?.status !== undefined && Number.isInteger(detail.status))
    line += ` ${detail.status}`;
  if (detail?.error !== undefined) line += ` ${errorName(detail.error)}`;
  console.warn(line);
  return new Response(null, { status: 502, headers: RESPONSE_HEADERS });
}

/**
 * Das Vokabular der Logzeile, wenn trotz eines Ausfalls weitergeleitet wird (Scheibe
 * 13.6-5; Setzung P13.6-75, E4). Genau ein festes Wort, nie code, message oder details.
 */
type RelayFailOpenReason = "rate-counter-failed";

function failOpen(reason: RelayFailOpenReason): void {
  console.warn(`[relay] fail-open: ${reason}`);
}

function isFormContentType(value: string | null): boolean {
  return (value ?? "").split(";")[0].trim().toLowerCase() === FORM_CONTENT_TYPE;
}

// Liest den Rumpf als Bytes, hoechstens RELAY_MAX_BODY_BYTES. Die Laenge wird beim Lesen
// gezaehlt, nicht allein am Content-Length abgelesen — der kann fehlen oder luegen.
async function readBodyCapped(
  request: Request
): Promise<Uint8Array<ArrayBuffer> | "too-large" | "failed"> {
  const declared = request.headers.get("content-length");
  if (declared !== null && Number(declared) > RELAY_MAX_BODY_BYTES) return "too-large";
  if (!request.body) return new Uint8Array(0);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > RELAY_MAX_BODY_BYTES) {
        await reader.cancel().catch(() => {});
        return "too-large";
      }
      chunks.push(value);
    }
  } catch {
    return "failed";
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) {
    bytes.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return bytes;
}

// Die Weiterleitung: GENAU EIN Aufruf, nie ein zweiter.
// - redirect "manual" — NIE folgen (Setzung P13.6-59, Q8). 2xx UND 3xx gelten als
//   "zugestellt": Ein 3xx von Make entsteht aus einem Antwort-Modul des Szenarios, also nach
//   dem Empfang (docs/formular-empfaenger-befunde.md, Abschnitt "Make", Befund (e); GELESEN,
//   nicht gemessen); als Fehlschlag gewertet entstuenden doppelte Leads. Dass Node-fetch mit
//   "manual" den 3xx-Status liefert, ist ABGELEITET; eine gefilterte Antwort vom Typ
//   "opaqueredirect" (Status 0) zaehlt deshalb ebenfalls als Umleitung.
// - Keine Kopfzeile des Besuchers reist mit: keine IP, kein User-Agent, kein Cookie.
// - Der Antwort-Rumpf wird nie gelesen, nur verworfen.
async function forward(endpoint: string, body: Uint8Array<ArrayBuffer>): Promise<Response> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), RELAY_FORWARD_TIMEOUT_MS);
  let response: Response;
  try {
    response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": FORM_CONTENT_TYPE },
      body,
      redirect: "manual",
      signal: controller.signal,
      cache: "no-store",
    });
  } catch (err) {
    return notDelivered("upstream-error", { error: err });
  } finally {
    clearTimeout(timer);
  }
  try {
    await response.body?.cancel();
  } catch {
    // Das Verwerfen des Rumpfs aendert das Urteil nicht.
  }
  const status = response.status;
  if (response.type === "opaqueredirect" || (status >= 200 && status < 400)) return delivered();
  return notDelivered("upstream-status", { status });
}

async function relay(request: Request): Promise<Response> {
  const host = resolveEffectiveHost(request.headers);
  if (!host) return notDelivered("unknown-host");
  // Der App-Host ist kein Serving-Host: Dort gibt es kein Projekt, und das Relay gilt nur fuer
  // gehostete Seiten (Setzung P13.6-57). Keine Abfrage.
  if (isAppHost(host)) return notDelivered("app-host");

  // Die Kennung reist in der Query (Setzung P13.6-59, Q7): Sie ist kein Formularwert
  // (Setzung P13.6-49, R2). Vor jeder Abfrage streng geprueft.
  const formId = new URL(request.url).searchParams.get("f");
  if (formId === null || !PS_ID_RE.test(formId)) return notDelivered("bad-id");

  if (!isFormContentType(request.headers.get("content-type")))
    return notDelivered("bad-content-type");

  const body = await readBodyCapped(request);
  if (body === "too-large") return notDelivered("body-too-large");
  if (body === "failed") return notDelivered("body-read-failed");

  const target = await resolveRelayTarget(host, formId, request.headers.get("cookie"));
  if (target.kind === "fail") return notDelivered(target.reason);

  // Die Werte noch einmal, wie beim Veroeffentlichen (published_content ist Stand des
  // Clients, Vorrat P13.6-30) — dann die Host-Liste.
  if (formTargetProblem(target.config, ownFormTargetDomains()) !== null)
    return notDelivered("invalid-target");
  // DER DATENSPARMODUS GILT AUCH HIER (Phase 13.6, Scheibe 13.6-4; Setzung P13.6-62): Hat der
  // Betreiber das Ziel auf browser-direkt gestellt, laeuft KEIN Formularinhalt ueber unseren
  // Server — auch nicht, wenn jemand den Endpunkt von Hand ruft. Gelesen aus der
  // veroeffentlichten Fassung; ein unbekannter Wert ist oben schon "invalid-target".
  if ((target.config as { dataSaver?: unknown }).dataSaver === true)
    return notDelivered("data-saver");
  const endpoint = allowedRelayEndpoint((target.config as { endpoint?: unknown }).endpoint);
  if (!endpoint) return notDelivered("host-not-listed");

  // DIE RATENBEGRENZUNG JE PROJEKT (Scheibe 13.6-5; Setzung P13.6-75 der Phase 13.6),
  // UNMITTELBAR VOR DER WEITERLEITUNG, nach ALLEN Pruefungen (E2): Gezaehlt wird nur, was
  // weitergeleitet wuerde. Der Kill-Switch bleibt davor ein eigener Zweig (I5).
  // - Begrenzt: dieselbe 502 wie jedes "nicht zugestellt" (E5; I1); die Logzeile traegt
  //   keine Projekt-Kennung.
  // - Zaehler ausgefallen: weiterleiten wie ohne Zaehler, dazu eine eigene Zeile (E4).
  const rate = await countRelayHit(target.projectId);
  if (rate === "limited") return notDelivered("rate-limited");
  if (rate === "failed") failOpen("rate-counter-failed");

  return forward(endpoint, body);
}

/** Der Route-Handler (src/app/api/f/route.ts). Wirft nie. */
export async function handleRelay(request: Request): Promise<Response> {
  try {
    return await relay(request);
  } catch (err) {
    return notDelivered("unexpected", { error: err });
  }
}
