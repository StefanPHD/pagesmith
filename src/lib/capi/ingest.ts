import { after } from "next/server";
import { getCapiConfigByTrackingKey } from "@/lib/capi/token";
import { META_GRAPH_VERSION, META_TEST_EVENT_CODE } from "@/lib/capi/config";
import { persistEvent } from "@/lib/analytics/persist";
import { isForwardable } from "@/lib/analytics/events";
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

// Metas Fehler-Envelope (Graph API). Nur die Felder, die wir fuer die Diagnose lesen.
type MetaErrorBody = {
  error?: {
    message?: unknown;
    code?: unknown;
    error_subcode?: unknown;
    type?: unknown;
    fbtrace_id?: unknown;
  };
};

// Metas message ist Beschreibungstext (kein Secret), aber unbegrenzt lang -> kappen.
const META_ERROR_MSG_MAX = 200;

function asLogValue(v: unknown): string {
  if (v === undefined || v === null || v === "") return "-";
  return String(v).slice(0, META_ERROR_MSG_MAX);
}

/**
 * Uebersetzt eine ABGELEHNTE Meta-Antwort in EINE sanitized Logzeile.
 *
 * SECRETS-DISZIPLIN (2a-Lektion, nicht verhandelbar): geloggt werden AUSSCHLIESSLICH
 * Metas eigene strukturierte Fehlerfelder. NIE die Forward-URL (sie traegt den
 * access_token im Query-String), NIE der Token, NIE unsere Payload/user_data (die traegt
 * IP/UA/ggf. PII). Es fliesst hier NICHTS aus dem Request hinein — nur Metas Antwort.
 *
 * WIRFT NIE: JSON-Parse und Text-Fallback sind je eigenstaendig abgesichert. Eine
 * unlesbare Antwort ist selbst ein Diagnose-Ergebnis, kein Grund fuer einen Fehlerpfad.
 */
async function describeMetaError(res: Response): Promise<string> {
  let body: unknown = null;
  try {
    body = await res.clone().json();
  } catch {
    // Kein JSON (HTML-Fehlerseite, leerer Body, Gateway-Antwort) -> Rohtext, gekappt.
    try {
      const text = (await res.text()).trim();
      return `[capi] Meta forward rejected: non-JSON body=${
        text ? text.slice(0, META_ERROR_MSG_MAX) : "-"
      }`;
    } catch {
      return "[capi] Meta forward rejected: body unreadable";
    }
  }

  const err = (body as MetaErrorBody | null)?.error;
  if (!err) return "[capi] Meta forward rejected: no error envelope";

  return (
    `[capi] Meta forward rejected: code=${asLogValue(err.code)}` +
    ` subcode=${asLogValue(err.error_subcode)}` +
    ` type=${asLogValue(err.type)}` +
    ` fbtrace=${asLogValue(err.fbtrace_id)}` +
    ` msg=${asLogValue(err.message)}`
  );
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

  // --- trackingKey -> { projectId, blocked, capiConfig } (service_role). Unbekannter
  //     Key -> 204, KEIN Meta-fetch, kein Leak (Key-Gueltigkeit nicht beobachtbar). ---
  const resolution = await getCapiConfigByTrackingKey(trackingKey);
  if (!resolution) return status(204);

  // --- KILL-SWITCH (Tier 0) — EXPLIZITER Zweig, seit Scheibe 2a ---
  // Frueher war der Schutz ein NEBENEFFEKT: der Resolver lieferte null, der Persist hing
  // im capiConfig-Zweig, also verwarf derselbe Guard beides. Mit der Entkopplung (Persist
  // laeuft jetzt auch OHNE CapiConfig) waere dieser Automatismus lautlos verschwunden ->
  // hier steht er als eigene, sichtbare, testbare Verzweigung. VOR Persist UND Forward.
  // Fail-closed; nach aussen identische leere 204 (kein Zustandsleck).
  if (resolution.blocked) return status(204);

  // --- ANALYTICS-PERSIST (Phase 8 Scheibe 1, in 2a ENTKOPPELT) ---
  // Laeuft jetzt fuer JEDES nicht-gesperrte Projekt — unabhaengig davon, ob eine
  // CapiConfig existiert. In 2a fliessen faktisch weiter nur Conversions durch (der
  // PageView-Emitter kommt erst in 2b); die Entkopplung ist die vorbereitete Struktur,
  // fuer Meta-Projekte bleibt das Ergebnis identisch (Forward UND Persist).
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

  // --- FORWARD NUR FUER CONVERSIONS (Scheibe 2a) ---
  // Der gesamte Meta-Pfad (Payload-Bau + Forward) liegt jetzt INNERHALB dieser einen
  // Bedingung — UMSCHLOSSEN, nicht editiert. Zwei Gruende, warum auch der Payload-Bau
  // mit hineinwandert und nicht nur der fetch: (1) fuer ein PageView waere er reine
  // Verschwendung, und PageView ist ab 2b der VOLUMEN-Event im Hotspot (/api/e-
  // Schlankheits-Regel); (2) er referenziert config, das hier erst geprueft vorliegt.
  const config = resolution.capiConfig;
  if (config && isForwardable(event)) {
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
        // ADDITIV: Metas STRUKTURIERTEN Ablehnungsgrund nachziehen. Ohne ihn ist ein
        // HTTP 400 nicht diagnostizierbar (Pixel-/Token-Problem? Payload-Feld? Permission?)
        // -> wir raten sonst. Der Body-Read liegt INNERHALB des fire-and-log-try: wirft er,
        // faengt ihn der bestehende catch, der Client bekommt weiterhin 204.
        console.error(await describeMetaError(res));
      }
    } catch (err) {
      // Nur eine generische Meldung — nie die URL (traegt den Token) / den Token.
      console.error(`[capi] Meta forward error: ${errorName(err)}`);
    } finally {
      clearTimeout(timer);
    }
  }

  return status(204);
}
