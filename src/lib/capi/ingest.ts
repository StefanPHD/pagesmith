import { after } from "next/server";
import { getCapiConfigByTrackingKey } from "@/lib/capi/token";
import { META_GRAPH_VERSION, META_TEST_EVENT_CODE } from "@/lib/capi/config";
import { persistEvent } from "@/lib/analytics/persist";
import { errorName } from "@/lib/errors";

/**
 * GETEILTE Ingest-Handler-Logik (Phase 7 Scheibe 7b).
 *
 * Ursprung: Scheibe 2b-i — Server-Side Meta CAPI Forward. Diese Logik lag zuvor
 * direkt in src/app/api/capi/route.ts und wird jetzt UNVERAENDERT hierher verschoben,
 * damit zwei Routen-Einstiege sie TEILEN (kein Copy-Paste):
 *  - /api/e   — neuer neutraler First-Party-Ingest-Trichter (gehostete Seiten,
 *               same-origin -> adblocker-resistent; neue Exporte).
 *  - /api/capi — PERMANENTER Alias fuer alte, bereits ausgelieferte Exporte.
 * Beide Routen re-exportieren handleIngest/handleIngestOptions -> identische Semantik,
 * identische CORS-Header, ein OPTIONS-Handler.
 *
 * Erste externe API-Integration der App: unser Server ruft aktiv Metas Graph-CAPI auf.
 * ANONYMER cross-origin Endpoint (der Beacon aus 2b-ii kommt vom ausgelieferten
 * Export/der gehosteten Seite, nicht aus einer Owner-Session). Autorisierung = der
 * oeffentliche trackingKey als CAPABILITY: er loest server-seitig (nur hier, via
 * service_role) auf den geheimen Token auf. Der Token/die Config erreichen die
 * HTTP-Response NIE — die Route antwortet ausschliesslich mit Status, nie mit Body.
 *
 * Key-Gueltigkeit ist bewusst NICHT beobachtbar: unbekannter/tokenloser Key -> 204
 * (wie ein erfolgreicher Forward), nur ein MALFORMED Client-Request -> 400. So
 * leakt die Route keinen Config-Zustand an einen anonymen Aufrufer.
 *
 * Der Client-Beacon (2b-ii) MUSS ein text/plain-Blob sein (sendBeacon), NIEMALS
 * application/json — application/json macht daraus einen preflight-pflichtigen Request,
 * den sendBeacon (fire-and-forget) nicht bedienen kann -> stiller Ausfall, den auch die
 * CORS-Header unten NICHT retten. Der text/plain-Body ist die tragende Kontrolle, die
 * Header sind nur Guertel-und-Hosentraeger.
 */

// Client-geliefertes (UNTRUSTED) Eingabe-Blob. event_time/IP/UA werden NIE von hier
// uebernommen, sondern server-seitig gesetzt.
type CapiRequestBody = {
  trackingKey?: unknown;
  eventID?: unknown;
  event?: unknown;
  value?: unknown;
  currency?: unknown;
  eventSourceUrl?: unknown;
  isCustom?: unknown;
  _fbp?: unknown;
};

// CORS: Guertel-und-Hosentraeger. Der reine text/plain-Beacon (2b-ii) ist ein
// "simple request" OHNE Preflight -> diese Header sind fuer ihn redundant, schaden
// aber nicht. KEINE Fehlerbehandlung baut auf einen vorausgesetzten Preflight.
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Striktes Timeout auf den Meta-Forward (A-Regel "defensive Timeouts"). Ohne das
// blockiert ein haengendes Meta die Serverless-Funktion bis ans Plattform-Limit — und
// zwar im HOTSPOT, der von JEDEM Besucher JEDER Kundenseite getroffen wird. Bewusst
// kuerzer als die 8s des Vercel-Clients (interaktive Owner-Mutation): 3s kappt echte
// Haenger, bricht aber legitime Latenzspitzen (1-2s) nicht ab.
const META_FORWARD_TIMEOUT_MS = 3_000;

// Body-lose Status-Antwort mit CORS-Headern. NIE ein Body — der Token/die Config
// duerfen die Response nie erreichen.
function status(code: number): Response {
  return new Response(null, { status: code, headers: CORS_HEADERS });
}

function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * Loopback-/leer-Erkennung fuer die aufgeloeste IP. Dev laeuft auf ::1 / 127.0.0.1;
 * eine solche IP ist fuer Metas Match-Quality wertlos (loopback) -> in Prod omitten.
 */
function isLoopbackOrEmpty(ip: string): boolean {
  if (!ip) return true;
  return ip === "::1" || ip === "127.0.0.1" || ip.startsWith("127.");
}

/**
 * PLATTFORM-VERTRAUTE Client-IP. Prod (Vercel): x-vercel-forwarded-for (von Vercels
 * Edge gesetzt/ueberschrieben -> nicht client-spoofbar), Fallback x-real-ip. BEWUSST
 * NICHT das erste Glied von x-forwarded-for (client-prependbar -> spoofbar).
 *
 * DEV-DUMMY (an den Test-Pfad gefesselt): NUR wenn die aufgeloeste IP loopback/leer
 * IST UND META_TEST_EVENT_CODE gesetzt ist, wird eine valide Public-Dummy-IP gesetzt,
 * damit Metas Test-Events-Tab die IP akzeptiert. Eine ECHTE Remote-IP wird NIE durch
 * die Dummy ersetzt. In Prod (Test-Code unset) -> nie Dummy -> IP bleibt omitted.
 *
 * Rueckgabe undefined -> client_ip_address wird im Payload weggelassen.
 */
function resolveClientIp(request: Request): string | undefined {
  const trusted =
    asString(request.headers.get("x-vercel-forwarded-for")) ||
    asString(request.headers.get("x-real-ip"));

  if (!isLoopbackOrEmpty(trusted)) return trusted;

  // (loopback || leer): in Dev mit Test-Code -> valide Dummy-Public-IP; sonst omit.
  if (META_TEST_EVENT_CODE) return "123.123.123.123";
  return undefined;
}

export async function handleIngestOptions(): Promise<Response> {
  // Body-loser Preflight-Handler der Vollstaendigkeit halber. KEINE Logik baut darauf.
  return status(204);
}

export async function handleIngest(request: Request): Promise<Response> {
  // --- Client-Body defensiv parsen: malformed -> 400 (nie Throw/500) ---
  let body: CapiRequestBody;
  try {
    body = JSON.parse(await request.text()) as CapiRequestBody;
  } catch {
    return status(400);
  }
  if (!body || typeof body !== "object") return status(400);

  const trackingKey = asString(body.trackingKey);
  const eventID = asString(body.eventID);
  const event = asString(body.event);
  // Pflichtfelder fehlen -> malformer Client-Request -> 400.
  if (!trackingKey || !eventID || !event) return status(400);

  // --- trackingKey -> { projectId, capiConfig } (service_role). Unbekannt/gesperrt/
  //     tokenlos -> 204, KEIN Meta-fetch, kein Leak (Key-Gueltigkeit nicht beobachtbar).
  //     KILL-SWITCH: ein gesperrtes Projekt liefert hier null -> weder Forward noch
  //     Persist (fail-closed, ohne eigenen Zweig — der Schutz sitzt im Resolver). ---
  const resolution = await getCapiConfigByTrackingKey(trackingKey);
  if (!resolution?.capiConfig) return status(204);
  const config = resolution.capiConfig;

  // --- ANALYTICS-PERSIST (Phase 8 Scheibe 1) — COUPLE-MINIMAL, additiv ---
  // Haengt BEWUSST INNERHALB des capiConfig-Zweigs: Meta-lose Projekte senden heute gar
  // keinen Beacon (__psMetaFire ist build-zeit-gegatet ueber metaTrackStatement), eine
  // Entkopplung waere hier dormant und nicht live-verifizierbar. Die Meta-unabhaengige
  // Erfassung kommt additiv mit Scheibe 2 (PageView) — DANN braucht es auch den
  // expliziten blocked-Zweig, weil dieser automatische Kill-Switch-Schutz entfaellt.
  //
  // after() laeuft NACH der Response -> die 204-Antwortzeit bleibt unveraendert, und der
  // Callback kann strukturell nichts mehr in den Response-Pfad werfen. persistEvent
  // schluckt seine Fehler ohnehin selbst; der try/catch hier ist die zweite Schicht,
  // falls die Registrierung/der Aufruf selbst wirft.
  after(async () => {
    try {
      await persistEvent({
        projectId: resolution.projectId,
        eventType: event,
        eventId: eventID,
      });
    } catch (err) {
      console.error(`[analytics] persist task error: ${errorName(err)}`);
    }
  });

  // --- Server-gesetzte Felder (NIE aus Client-Payload) ---
  const eventTime = Math.floor(Date.now() / 1000);
  const clientIp = resolveClientIp(request);
  const userAgent = asString(request.headers.get("user-agent"));

  // --- Meta-Payload zusammensetzen (undefined-Felder weglassen) ---
  const userData: Record<string, unknown> = {};
  if (clientIp) userData.client_ip_address = clientIp;
  if (userAgent) userData.client_user_agent = userAgent;
  const fbp = asString(body._fbp);
  if (fbp) userData.fbp = fbp;

  const customData: Record<string, unknown> = {};
  if (typeof body.value === "number") customData.value = body.value;
  const currency = asString(body.currency);
  if (currency) customData.currency = currency;

  const serverEvent: Record<string, unknown> = {
    // isCustom aendert die Graph-CAPI-Call-Shape NICHT: ein "Custom Event" ist dort
    // schlicht ein freier event_name (kein trackCustom-Split wie im Browser-Pixel).
    // isCustom wird fuer Symmetrie mit der Pixel-Seite mitgefuehrt, nicht verzweigt.
    event_name: event,
    event_time: eventTime,
    event_id: eventID,
    action_source: "website",
    user_data: userData,
  };
  const eventSourceUrl = asString(body.eventSourceUrl);
  if (eventSourceUrl) serverEvent.event_source_url = eventSourceUrl;
  if (Object.keys(customData).length > 0) serverEvent.custom_data = customData;

  const payload: Record<string, unknown> = { data: [serverEvent] };
  // test_event_code NUR wenn env gesetzt (dev-only). NIE hartcodiert / in Prod.
  if (META_TEST_EVENT_CODE) payload.test_event_code = META_TEST_EVENT_CODE;

  // --- Forward AWAIT-en; Fehler sanitized loggen; Client kriegt IMMER 204. ---
  //
  // 204-CONTAINMENT: die KOMPLETTE Timeout-Scaffolding (AbortController + setTimeout)
  // liegt INNERHALB des fire-and-log-try. Das Muster ist aus lib/vercel/client.ts
  // gespiegelt, aber die UMSCHLIESSUNG ist bewusst ANDERS: dort steht das Geruest VOR
  // dem try und der catch RETURNIERT ein Ergebnis (der Vercel-Client darf einen
  // Setup-Fehler propagieren) — der Ingest darf das NIE. Hier muendet jeder Pfad, auch
  // ein Stolpern des Geruests selbst, im catch und damit in der garantierten leeren 204.
  // `timer` steht als REINE Deklaration aussen (kann nicht werfen), damit finally ihn
  // sieht. Ein Abort landet als DOMException im catch und wird dank errorName() als
  // "AbortError" statt "unknown" geloggt.
  const url = `https://graph.facebook.com/${META_GRAPH_VERSION}/${config.pixelId}/events?access_token=${config.token}`;
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    const controller = new AbortController();
    timer = setTimeout(() => controller.abort(), META_FORWARD_TIMEOUT_MS);
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });
    if (!res.ok) {
      // KEIN Token/access_token/sensibler Response-Body ins Log — nur Status.
      console.error(`[capi] Meta forward failed: HTTP ${res.status}`);
    }
  } catch (err) {
    // Nur eine generische Meldung — nie die URL (traegt den Token) / den Token.
    console.error(`[capi] Meta forward error: ${errorName(err)}`);
  } finally {
    clearTimeout(timer);
  }

  return status(204);
}
