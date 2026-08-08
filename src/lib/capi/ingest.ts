import { after } from "next/server";
import {
  getCapiConfigByTrackingKey,
  META_TARGET,
  type ResolvedTarget,
} from "@/lib/capi/token";
import { META_TEST_EVENT_CODE } from "@/lib/capi/config";
import { forwardToMeta } from "@/lib/capi/meta-forward";
import { consentAllows } from "@/lib/tracking/consent-wire";
// DER SCHLUESSEL KOMMT AUS DEM CONSENT-VOKABULAR, NICHT AUS DEM DER GEHEIMNIS-TABELLE
// (META_TARGET in capi/token.ts) — obwohl beide heute "meta" lauten. Zwei Gruende:
// (1) Der Schluessel IM DRAHT ist der, den der Betreiber in seinen eigenen
//     Consent-Hook schreibt. Das ist dieses Vokabular.
// (2) DIESELBE Konstante setzt das Feld im erzeugten Browser-Text (tracking/meta.ts);
//     eine server-only-Datei ist von dort gar nicht erreichbar. Naehme der Leser die
//     andere, haengten Setzer und Leser an zwei unabhaengig definierten Literalen,
//     die nur zufaellig gleich sind — genau die Drift, die im Repo bereits als
//     "der Meta-Zielname liegt in drei Kopien" vermerkt ist.
import { META_CONSENT_TARGET } from "@/lib/tracking/consent";
import { persistEvent } from "@/lib/analytics/persist";
import {
  BROWSER_CONFIRM_MARKER,
  isForwardable,
  type ObservationSource,
} from "@/lib/analytics/events";
// NUR der LESER (Scheibe 9b-2). chooseVariant (der Muenzwurf) wird hier BEWUSST NICHT
// importiert: der Ingest weist NIE zu, er liest nur — die Zuweisung liegt komplett in der
// Serve-Route. Zwei Zuweisungs-Autoritaeten koennten divergieren.
import { parseVariantCookie, type Variant } from "@/lib/hosting/variant";
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
 * SEIT PHASE 11 SCHEIBE 4 NICHT MEHR VON HIER AUS — der Aufruf samt Nutzlast, Zeiteinheit,
 * Timeout-Geruest und Fehlerdeutung liegt in src/lib/capi/meta-forward.ts; dieser Handler
 * entscheidet nur noch, OB geforwardet wird, und erwartet den Aufruf weiterhin im Request.
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
  // Scheibe A: der Bestaetigungs-Marker. Eigenes Feld, damit `event` weiter den ECHTEN
  // Conversion-Namen traegt (die Bestaetigung bestaetigt GENAU dieses Event).
  obs?: unknown;
};

// CORS: Guertel-und-Hosentraeger. Der reine text/plain-Beacon (2b-ii) ist ein
// "simple request" OHNE Preflight -> diese Header sind fuer ihn redundant, schaden
// aber nicht. KEINE Fehlerbehandlung baut auf einen vorausgesetzten Preflight.
const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

// Body-lose Status-Antwort mit CORS-Headern. NIE ein Body — der Token/die Config
// duerfen die Response nie erreichen.
function status(code: number): Response {
  return new Response(null, { status: code, headers: CORS_HEADERS });
}

/**
 * Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "".
 *
 * EINE ZWEITE, ZEICHENGLEICHE KOPIE STEHT IN src/lib/capi/meta-forward.ts. Dort traegt
 * sie die optionalen Nutzlast-Felder, hier die Pflichtfeld-Pruefung (die den 400
 * erzeugt), den Confirm-Marker und die IP-Aufloesung.
 * KEIN TEST SICHERT DIE GLEICHHEIT DER BEIDEN KOPIEN. Das ist bewusst so und nicht
 * uebersehen: die saubere Loesung waere eine dritte, neutrale Datei gewesen, und die lag
 * ausserhalb des Zuschnitts der Naht-Scheibe. Wer eine der beiden aendert, aendert die
 * andere von Hand mit — es wird nichts rot.
 */
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

/**
 * Plant den Analytics-Persist als Hintergrund-Task ein (Scheibe 1, in Scheibe A aus dem
 * Handler extrahiert — UNVERAENDERTE Semantik, jetzt von zwei Aufrufern geteilt).
 *
 * after() laeuft NACH der Response -> die 204-Antwortzeit bleibt unveraendert, und der
 * Callback kann strukturell nichts mehr in den Response-Pfad werfen. persistEvent schluckt
 * seine Fehler ohnehin selbst; der try/catch hier ist die zweite Schicht, falls die
 * Registrierung/der Aufruf selbst wirft.
 *
 * source ist ein PFLICHT-Argument (kein Default): der Beobachtungs-Ort wird an jeder
 * Aufrufstelle bewusst gesetzt — er stammt aus der SERVER-Interpretation des obs-Markers,
 * nie aus einem Client-Wert. variant (9b-2) folgt derselben Regel.
 *
 * variant reist als WERT im Closure — es wird hier NICHTS mehr aus dem Request gelesen
 * (s. Invariante I14 an der Leseanweisung im Handler).
 */
function schedulePersist(
  projectId: string,
  eventType: string,
  eventId: string,
  source: ObservationSource,
  variant: Variant | null
): void {
  after(async () => {
    try {
      await persistEvent({ projectId, eventType, eventId, source, variant });
    } catch (err) {
      console.error(`[analytics] persist task error: ${errorName(err)}`);
    }
  });
}

/**
 * DIE ZUORDNUNG ZIEL -> ADAPTER (Phase 11, siebte Scheibe).
 *
 * Sie kennt heute GENAU EINEN Empfaenger. Jedes andere Ziel wird STILL uebersprungen,
 * und das ist keine Nachlaessigkeit, sondern die strukturelle Durchsetzung der Zusage
 * "es wird nichts an ein neues Ziel gesendet": Ein Ziel, dessen Zugangsdaten hinterlegt
 * sind, dessen Adapter aber nicht existiert, kann hier nichts ausloesen — es gibt
 * keinen Zweig, der es koennte.
 *
 * DAS ZIEL-VOKABULAR IST DAS DER GEHEIMNIS-TABELLE (META_TARGET aus capi/token.ts),
 * NICHT das des Consent-Gates (META_CONSENT_TARGET) — obwohl beide heute "meta" lauten.
 * Der Wert stammt aus derselben Aufloesung, die ihn aus project_secrets.target gelesen
 * hat; ihn gegen das ANDERE Vokabular zu pruefen haengte zwei unabhaengig definierte
 * Literale aneinander, die nur zufaellig gleich sind. Die Begruendung der Gegenrichtung
 * steht am Import von META_CONSENT_TARGET oben.
 *
 * SIE WIRFT NIE — dieselbe Auflage wie beim Adapter selbst, und sie ist hier
 * strukturell erfuellt: Der Rumpf besteht aus einem Gleichheitsvergleich und einer
 * Weiterreichung. forwardToMeta traegt seinen eigenen Vertrag (meta-forward.ts).
 */
function dispatchForward(
  entry: ResolvedTarget,
  event: string,
  eventID: string,
  body: CapiRequestBody,
  clientIp: string | undefined,
  userAgent: string,
): Promise<void> {
  if (entry.target === META_TARGET) {
    return forwardToMeta(entry.config, event, eventID, body, clientIp, userAgent);
  }
  return Promise.resolve();
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

  // BROWSER-BESTAETIGUNG (Scheibe A): CLIENT-UNTRUSTED. Der Client sendet nur diesen eng
  // begrenzten Marker in einem eigenen Feld, NIE den source-Wert selbst — sonst koennte
  // ein anonymer Aufrufer die Analytics beliebig einfaerben. Der exakte
  // Gleichheitsvergleich gegen die Konstante ist strenger als jede Laengen-/Formatpruefung:
  // "browser", "__PS_BROWSER", "__ps_browserX", Zahlen und Objekte fallen alle durch und
  // landen im Normalpfad (source='server').
  const isBrowserConfirm = asString(body.obs) === BROWSER_CONFIRM_MARKER;

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

  // --- A/B-VARIANTE DER BEOBACHTUNG (Phase 9 Scheibe 9b-2) ---
  // GATE: nur bei AKTIVEM Test. Ist der Test aus, wird der Cookie-Header nicht einmal
  // gelesen — fuer die grosse Mehrheit der Projekte kostet 9b-2 damit einen Boolean-Test
  // auf dem meistgetroffenen Pfad der Plattform. Inhaltlich: ein altes Cookie nach
  // Testende schriebe sonst eine Variante fest, die gar nicht ausgeliefert wurde (die
  // Route liefert bei inaktivem Test ausnahmslos A), und NULL verloere seine Bedeutung
  // als Abgrenzung des Testzeitraums. Die Werte sind permanent — sie muessen ab Zeile 1
  // stimmen.
  //
  // LESEN, NICHT ZUWEISEN: kein Muenzwurf, kein Default 'a'. Test aktiv ohne (oder mit
  // ungueltigem) Cookie -> null. Das Urteil ueber den Cookie-WERT faellt genau einmal, im
  // geteilten parseVariantCookie — kein zweiter Parser, keine zweite Wertliste hier.
  //
  // I14 — SYNCHRON IM REQUEST-KONTEXT: Der Header wird HIER gelesen, nie in after(); dort
  // ist der Request bereits abgeschlossen, und ein dorthin verschobenes Lesen waere ein
  // Fehler, der erst unter Last auffaellt. Der fertige WERT reist im Closure.
  const variant = resolution.abTestActive
    ? parseVariantCookie(request.headers.get("cookie"))
    : null;

  // --- ANALYTICS-PERSIST (Phase 8 Scheibe 1, in 2a ENTKOPPELT) ---
  // Laeuft fuer JEDES nicht-gesperrte Projekt — unabhaengig davon, ob eine CapiConfig
  // existiert. Das Geruest steckt seit Scheibe A in schedulePersist (oben), damit der
  // Confirm-Zweig dieselbe after()/try/catch-Semantik nutzt statt eines Copy-Paste.
  //
  // BROWSER-BESTAETIGUNG (Scheibe A) — EIGENER ZWEIG MIT FRUEHEM RETURN, VOR dem
  // Standard-Persist und damit strukturell vor dem Forward-Block.
  //
  // WARUM ein eigener Zweig und NICHT ein "&& !isBrowserConfirm" im Forward-Guard: die
  // Bestaetigung traegt DIESELBE eventID wie die echte Conversion — ein Forward erzeugte
  // ein DUPLIKAT bei Meta. Ein Term in einer zusammengesetzten Bedingung kann bei einem
  // Refactor lautlos wegfallen; mit dem frueh return ist der Forward-Code vom
  // Confirm-Pfad aus schlicht NICHT ERREICHBAR. Dieselbe Lektion wie beim Kill-Switch in
  // 2a: der Schutz gehoert in eine sichtbare, einzeln rot faerbbare Verzweigung.
  //
  // isForwardable bleibt bewusst unangetastet: der Confirm traegt den ECHTEN
  // Conversion-Namen (der forwardbar sein MUSS) — der Ausschluss ist eine PFAD-, keine
  // NAMENS-Eigenschaft.
  //
  // Der Zweig liegt HINTER dem Kill-Switch (oben): ein gesperrtes Projekt erzeugt auch
  // keine Bestaetigungs-Zeilen.
  //
  // Die Bestaetigungszeile traegt DIESELBE Variante wie die Serverzeile (9b-2): variant
  // ist eine Eigenschaft der BEOBACHTUNG (wie source) und haelt fest, was das Cookie in
  // diesem Moment sagte — sie ist keine Aussage ueber die eventID. Ohne sie waere eine
  // Verlustrate JE VARIANTE nicht berechenbar.
  if (isBrowserConfirm) {
    schedulePersist(resolution.projectId, event, eventID, "browser", variant);
    return status(204);
  }

  schedulePersist(resolution.projectId, event, eventID, "server", variant);

  // --- FORWARD NUR FUER CONVERSIONS (Scheibe 2a) ---
  // NICHTS META-BEZOGENES PASSIERT AUSSERHALB DIESER BEDINGUNG. Das ist die tragende
  // Aussage und sie gilt unveraendert; nur ihr ORT hat sich verschoben: Seit Phase 11
  // Scheibe 4 liegt der Meta-Pfad (Payload-Bau + Forward) NICHT MEHR im Rumpf hier,
  // sondern in src/lib/capi/meta-forward.ts — ERREICHBAR ausschliesslich von dieser
  // Stelle aus. Der Satz "liegt INNERHALB dieser Bedingung" stand hier bis dahin und
  // beschrieb den Rumpf; wer ihn heute so liest, sucht den Payload-Bau an der falschen
  // Stelle.
  // Zwei Gruende, warum auch der Payload-Bau hinter dem Gate liegt und nicht nur der
  // fetch — sie sind der Grund, warum die Naht KOMPLETT hinter dieser Bedingung
  // aufgerufen wird und nicht etwa teilweise davor: (1) fuer ein PageView waere er reine
  // Verschwendung, und PageView ist ab 2b der VOLUMEN-Event im Hotspot (/api/e-
  // Schlankheits-Regel); (2) er referenziert config, das hier erst geprueft vorliegt.
  //
  // DIE WACHE PRUEFT DIE LAENGE, NICHT DIE EXISTENZ (Phase 11, siebte Scheibe). Bis
  // hierher stand hier `const config = resolution.capiConfig; if (config && …)` — mit
  // einer MENGE waere daraus eine Bedingung geworden, die IMMER wahr ist: Ein leeres
  // Array ist truthy. Die Wache haette dann nichts mehr entschieden, der Kommentar
  // darueber waere zur Behauptung geworden, und Einwilligungs-Auswertung samt
  // Header-Lesungen liefen fuer JEDEN Beacon JEDES Projekts OHNE Zugangsdaten — genau
  // das, was die drei Zeilen weiter unten ausdruecklich ausschliessen.
  // DAS IST DIE GEFAEHRLICHSTE STELLE DIESER SCHEIBE, weil sie LAUTLOS falsch wird:
  // Der Compiler sieht sie nicht, und ein Test, der nur "es wurde nichts gesendet"
  // prueft, ginge in beiden Zustaenden durch (eine Schleife ueber eine leere Menge
  // sendet ohnehin nichts). Was sie sichtbar macht, ist fan-out.test.ts.
  const targets = resolution.targets;
  if (targets.length > 0 && isForwardable(event)) {
    // --- EINWILLIGUNG (Phase 11, fuenfte Scheibe) — EIGENER SICHTBARER ZWEIG ---
    //
    // WARUM KEIN DRITTER TERM IM if-KOPF DARUEBER: Dieselbe Lektion wie beim
    // Kill-Switch (2a) und beim Confirm-Zweig — ein Term in einer zusammengesetzten
    // Bedingung kann bei einem Refactor lautlos wegfallen und ist nicht einzeln rot
    // faerbbar. Ein Schutz gehoert in eine Verzweigung, die man sieht.
    //
    // WARUM INNERHALB DER FORWARD-BEDINGUNG UND NICHT WEITER OBEN: /api/e-
    // Schlankheit, woertlich dieselbe Begruendung wie bei clientIp/userAgent drei
    // Zeilen tiefer — geprueft wird genau dann, wenn wirklich geforwardet wird, und
    // nicht auf Vorrat fuer jeden Beacon. Der PageView (der VOLUMEN-Event) und der
    // Confirm (frueher Return weiter oben) erreichen diese Zeile nie.
    //
    // ABWESENDES FELD HEISST ERLAUBT — die Alt-Seiten-Regel. Sie steht ausformuliert
    // am Leser (tracking/consent-wire.ts) und wird hier NICHT wiederholt; der Grund
    // in einem Satz: Ein Code-Deploy erreicht bereits publizierte Seiten nicht.
    //
    // KEIN LOG: Der Einwilligungs-Zustand ist eine Aussage ueber einen BESUCHER. Ihn
    // zu protokollieren waere eine Datenerhebung, die niemand beschlossen hat — und
    // sie fiele ausgerechnet auf dem meistgetroffenen Pfad der Plattform an.
    // EINE PRUEFUNG FUER DIE GANZE MENGE, und das ist bei EINEM Empfaenger exakt
    // richtig — der Draht zu Meta aendert sich nicht. Eine Pruefung JE ZIEL ist
    // ausdruecklich NICHT diese Scheibe: Das Feld im Draht traegt heute nur einen
    // Schluessel, weil der Beacon nur innerhalb von Metas Gate ueberhaupt entsteht.
    // Wer hier je einen zweiten Empfaenger einhaengt, OHNE dass der Browser-Pfad das
    // Signal je Ziel liefert, gated ihn mit METAS Einwilligung — das waere falsch.
    if (!consentAllows(body, META_CONSENT_TARGET)) return status(204);

    // --- Server-gesetzte Felder (NIE aus Client-Payload) ---
    // Sie werden HIER ermittelt, INNERHALB der Bedingung — also genau dann, wenn wirklich
    // geforwardet wird, und nicht auf Vorrat fuer jeden Beacon (/api/e-Schlankheit).
    // Die IP-Aufloesung bleibt beim Handler, weil sie Request-HEADER liest; die Naht soll
    // kein HTTP kennen, sondern Metas Vokabular.
    const clientIp = resolveClientIp(request);
    const userAgent = asString(request.headers.get("user-agent"));

    // --- DER FAN-OUT (Phase 11, siebte Scheibe) ---
    //
    // Der Aufruf wird WEITERHIN IM REQUEST ERWARTET — das await ist kein Versehen: die
    // 204 steht nach wie vor DAHINTER. Die Abloesung von der Antwort ist eine EIGENE,
    // spaetere Aenderung; wer das await hier entfernt, baut sie unangekuendigt mit ein.
    //
    // allSettled UND NIEMALS all. Der Unterschied ist nicht Stil, sondern das
    // 204-Containment: allSettled rejectet NIE, also kann kein Empfaenger einen Wurf
    // aus diesem Handler heraustragen. Promise.all reichte einen vertragsbruechigen
    // Adapter DURCH — aus der garantierten leeren 204 wuerde ein 500, und der leakt
    // den Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer. Die
    // Garantie ruht damit weiterhin auf der STRUKTUR und nicht darauf, dass sich alle
    // Adapter an ihren Vertrag halten.
    //
    // DIE FRIST IST EINE EIGENSCHAFT DIESER ANORDNUNG, KEIN BAUTEIL — und der naechste,
    // der hier eine sucht, soll lesen, warum es keine gibt: Alle Empfaenger starten
    // GLEICHZEITIG (map + allSettled, nicht for-await), und jeder traegt SEIN EIGENES
    // Timeout-Geruest im Adapter. Die Gesamtwartezeit ist damit das MAXIMUM der
    // Einzeldeckel, nicht ihre Summe — sie waechst NICHT mit der Zahl der Empfaenger.
    // AUFLAGE, ausdruecklich: KEIN Promise.race, KEIN gemeinsamer Wecker, KEIN
    // geteiltes AbortSignal.
    // · Ein geteiltes Abbruchsignal traefe ALLE — ein haengender Zweitempfaenger
    //   kappte den Meta-Forward mit, der ohne ihn durchgekommen waere.
    // · Ein Wecker per race hoerte auf zu WARTEN, ohne abzubrechen — damit loeste sich
    //   die Antwort von der Empfaenger-Latenz, und das ist die am 2026-08-06
    //   gestrichene Scheibe durch die Hintertuer.
    await Promise.allSettled(
      targets.map((entry) =>
        dispatchForward(entry, event, eventID, body, clientIp, userAgent),
      ),
    );
  }

  return status(204);
}
