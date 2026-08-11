import "server-only";
import { META_GRAPH_VERSION, META_TEST_EVENT_CODE } from "@/lib/capi/config";
import { errorName } from "@/lib/errors";
// DAS GETEILTE WERKZEUG, NICHT DIE POLITIK: Die formbasierte Schwaerzung liegt in
// einer REINEN Datei und wird von mehreren Adaptern benutzt. Welches Feld hier wie
// behandelt wird, entscheiden die drei Aufbereitungen unten — das bleibt Metas
// eigene Sache.
import { redactOpaque } from "@/lib/redact";
import type { CapiConfig } from "@/lib/capi/token";

/**
 * DIE NAHT DES META-FORWARDS (Phase 11, vierte Scheibe).
 *
 * Der Meta-Forward lag bis hierher im Rumpf von handleIngest (src/lib/capi/ingest.ts):
 * URL-Bau, Nutzlast, Zeiteinheit, Timeout-Geruest und Fehlerdeutung verstreut ueber ein
 * Dutzend Zeilen, ohne Punkt, an dem ein zweites Ziel einhaengen koennte. Diese Datei
 * ist genau dieser Punkt — und sonst nichts: der Rumpf ist WOERTLICH uebernommen, keine
 * Zeile ist im Vorbeigehen umformuliert worden.
 *
 * VERHALTENSNEUTRAL — das ist die ganze Zusage dieser Scheibe. Der Beweis sind die
 * BESTEHENDEN Tests dieses Pfades, die unveraendert gruen bleiben; ein angepasster Test
 * waere der Gegenbeweis gewesen.
 *
 * KEINE ABSTRAKTION, und das ist eine Entscheidung, kein unfertiger Zustand: EINE Datei,
 * EINE Funktion, Meta im Namen. Kein Interface, kein Array von Zielen, kein
 * Registry-Punkt. Bei genau EINEM Fall ist ein benanntes Duplikat ehrlicher als eine
 * Abstraktion, die aus einem Fall geraten ist — das zweite Ziel bekommt seine EIGENE
 * benannte Funktion, und erst der DRITTE Fall zeigt, welche Form traegt.
 *
 * WAS DIESE DATEI NICHT BESITZT, obwohl es nach Forward aussieht:
 * - das isForwardable-GATE. Es entscheidet, OB geforwardet wird — eine Verzweigung des
 *   Kontrollflusses, die beim Handler bleibt. Wer sie hierher zieht, macht aus einer
 *   Sende-Funktion eine, die auch noch entscheidet.
 * - das 204-CONTAINMENT. Es lebt beim Aufrufer. Diese Funktion haelt es dadurch ein, dass
 *   sie NIE wirft (s. den Vertrag unten), nicht dadurch, dass sie eine Antwort baut.
 * - den KILL-SWITCH und den frueh zurueckkehrenden Confirm-Zweig. Beide liegen im Handler
 *   VOR jeder Stelle, an der capiConfig ueberhaupt gelesen wird — der Forward ist von dort
 *   aus strukturell nicht erreichbar, und das bleibt so.
 *
 * KEIN ERGEBNISTYP (Promise<void>), und der Grund gehoert dazu, sonst wird beim naechsten
 * Umbau "nur schnell" ein Erfolgs-/Fehlschlag-Wert ergaenzt: Ein Ergebnistyp verschoebe die
 * Log-Stelle zurueck in den Handler und gaebe ihm eine Fallunterscheidung, die er heute
 * nicht hat. Ob der AUSGANG eines Forwards eine sichtbare GROESSE wird, ist eine EIGENE
 * Frage (der Betreiber sieht heute nicht, dass sein Server-Forward abgewiesen wird) — sie
 * ist geparkt und wird hier nicht nebenbei vorentschieden.
 */

/**
 * Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "".
 *
 * PRIVATE KOPIE. Das Original steht unveraendert in src/lib/capi/ingest.ts und traegt
 * dort die Pflichtfeld-Pruefung (die den 400 erzeugt), den Confirm-Marker und die
 * IP-Aufloesung. Hier traegt es die optionalen Nutzlast-Felder.
 * KEIN TEST SICHERT DIE GLEICHHEIT DER BEIDEN KOPIEN. Das ist bewusst so und nicht
 * uebersehen: die saubere Loesung waere eine dritte, neutrale Datei gewesen, und die lag
 * ausserhalb des Zuschnitts dieser Scheibe. Wer eine der beiden aendert, aendert die
 * andere von Hand mit — es wird nichts rot.
 */
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// Striktes Timeout auf den Meta-Forward (A-Regel "defensive Timeouts"). Ohne das
// blockiert ein haengendes Meta die Serverless-Funktion bis ans Plattform-Limit — und
// zwar im HOTSPOT, der von JEDEM Besucher JEDER Kundenseite getroffen wird. Bewusst
// kuerzer als die 8s des Vercel-Clients (interaktive Owner-Mutation): 3s kappt echte
// Haenger, bricht aber legitime Latenzspitzen (1-2s) nicht ab.
const META_FORWARD_TIMEOUT_MS = 3_000;

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

// Deckel fuer Metas FREIEN Beschreibungstext (message). Unbegrenzt lang -> kappen.
const META_ERROR_MSG_MAX = 200;

// HARTER, kurzer Deckel fuer die enum-artigen Felder (code, subcode, type), fuer den
// Trace-Bezeichner und fuer die Content-Type-Kopfzeile. Alle vier sind ihrer Natur nach
// kurz; ein langer Wert dort ist bereits ein Befund und braucht keine 200 Zeichen.
// EINE Zahl fuer alle kurzen Felder, bewusst nicht vier gleiche nebeneinander.
const META_SHORT_MAX = 64;

/**
 * Die gemeinsame Normalisierung der drei Aufbereitungen — WOERTLICH die des frueheren
 * asLogValue: fehlende und leere Werte werden zum Ersatzwert, alles andere zur
 * Zeichenkette. Hier wird NICHT geschwaerzt und NICHT gekappt; das entscheidet die
 * jeweilige Aufbereitung.
 */
function asLogString(v: unknown): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v);
}

/**
 * DIE GEWOEHNLICHE AUFBEREITUNG — schwaerzt, dann kappt. Sie traegt Metas FREIEN Text
 * (message) und ist der VORGABE-WEG: Wer spaeter ein sechstes Envelope-Feld ergaenzt
 * und den naheliegenden Griff tut, bekommt die Schwaerzung, ohne daran denken zu
 * muessen.
 *
 * ERST SCHWAERZEN, DANN KAPPEN — die Reihenfolge ist nicht beliebig, und die umgekehrte
 * waere AKTIV SCHAEDLICH: Die Kappung behaelt den ANFANG. Liegt eine undurchsichtige
 * Folge auf der Kappungsgrenze, bliebe nach einem Schnitt zuerst ein Rest UNTERHALB der
 * Mindestlaenge stehen — die Schwaerzung fande ihn dann nicht mehr, und ein Teil des
 * Geheimnisses ginge hinaus. Das ist schlimmer als gar keine Schwaerzung, weil die
 * Zeile bereinigt AUSSIEHT. Festgenagelt in meta-forward.test.ts, Test (e).
 */
function asProviderText(v: unknown): string {
  const s = asLogString(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, META_ERROR_MSG_MAX);
}

/**
 * DIE ENUM-ARTIGE AUFBEREITUNG — schwaerzt ebenfalls und kappt zusaetzlich HART.
 * Fuer code, subcode, type und die Content-Type-Kopfzeile.
 *
 * SIE SCHWAERZT MIT, obwohl diese Felder ihrer Natur nach kurz sind: Die Felder sind als
 * unknown deklariert, weil ihr Inhalt vom ANBIETER kommt und nicht von uns — "enum-artig"
 * beschreibt die Erwartung, nicht eine Zusicherung. Eine Ausnahme braucht einen Grund;
 * hier gibt es keinen, und der Vorgabe-Weg bleibt so ohne Loch.
 */
function asProviderEnum(v: unknown): string {
  const s = asLogString(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, META_SHORT_MAX);
}

/**
 * DIE AUSNAHME — der Trace-Bezeichner wird NICHT geschwaerzt, nur gekappt.
 *
 * SIE IST EIGENS BENANNT UND KEIN SCHALTER-ARGUMENT, damit die Ausnahme AN DER
 * FUNDSTELLE LESBAR ist: vier Felder rufen gleich, eines ruft anders. Ein
 * Wahrheitswert in einer Argumentliste verschwaende und waere beim naechsten Feld
 * kopierbar, ohne dass es auffiele.
 *
 * DER GRUND, und er ist NICHT "ist kein Secret" — diese Behauptung ist genau der
 * Satztyp, den diese Scheibe an anderer Stelle ersetzt hat:
 * DIE BELEGTE ECHO-ACHSE IST DER QUERY-PARAMETER, in dem das Zugangsdatum zu Meta
 * reist. Was zurueckgespiegelt werden kann, endet in Metas FEHLERMELDUNG und im
 * NICHT-JSON-RUMPF — beide sind geschwaerzt bzw. gar nicht mehr im Log. Der
 * Trace-Bezeichner ist dagegen ein vom ANBIETER ERZEUGTER Vorgangsschluessel; er ist
 * kein Ort, an dem unsere Eingabe wieder auftaucht.
 * UND ER IST DAS EINZIGE, WAS DIE UNTERSUCHUNG TRAEGT: Der Fehlschlag, um den es hier
 * geht, ist STILL (Browser-Events laufen weiter, der Server-Forward stirbt lautlos).
 * Wer ihn beim Anbieter untersuchen laesst, braucht genau diesen Bezeichner — er ist
 * lang und undurchsichtig, also faellt er der Schwaerzung als ERSTES zum Opfer.
 *
 * IHR WAECHTER ist meta-forward.test.ts, Test (d); ohne ihn waere sie nur eine Absicht.
 */
function asTraceId(v: unknown): string {
  const s = asLogString(v);
  if (s === null) return "-";
  return s.slice(0, META_SHORT_MAX);
}

/**
 * Uebersetzt eine ABGELEHNTE Meta-Antwort in EINE bereinigte Logzeile.
 *
 * SECRETS-DISZIPLIN (2a-Lektion, nicht verhandelbar): geloggt werden AUSSCHLIESSLICH
 * Metas eigene strukturierte Fehlerfelder. NIE die Forward-URL (sie traegt den
 * access_token im Query-String), NIE der Token, NIE unsere Payload/user_data (die traegt
 * IP/UA/ggf. PII). Es fliesst hier NICHTS aus dem Request hinein — nur Metas Antwort.
 *
 * UND GENAU DAS GENUEGTE NICHT: Metas Antwort selbst kann unsere Eingabe TRAGEN. Jeder
 * Wert, der von druessen kommt, laeuft deshalb durch eine der drei Aufbereitungen —
 * gewoehnlich (asProviderText), enum-artig (asProviderEnum) oder die eine benannte
 * AUSNAHME (asTraceId). Hier steht kein einziger roher Fremdwert mehr.
 *
 * WIRFT NIE: JSON-Parse, Text-Lesung und Kopfzeilen-Zugriff sind abgesichert bzw.
 * wurffrei. Eine unlesbare Antwort ist selbst ein Diagnose-Ergebnis, kein Grund fuer
 * einen Fehlerpfad — und ein Wurf von hier verliesse ueber forwardToMeta und
 * handleIngest den Handler und machte aus der garantierten leeren 204 einen 500.
 */
async function describeMetaError(res: Response): Promise<string> {
  let body: unknown = null;
  try {
    body = await res.clone().json();
  } catch {
    // KEIN JSON (HTML-Fehlerseite, leerer Body, Gateway-Antwort).
    //
    // DER RUMPF GEHT NICHT MEHR INS LOG. Hier stand bis zu dieser Scheibe
    // text.slice(0, META_ERROR_MSG_MAX), also alles was zurueckkam — die BREITERE der
    // beiden Oeffnungen, und eine Kappung schuetzt dort gar nichts: sie behaelt den
    // ANFANG, und genau dort stuende ein zurueckgespiegeltes Zugangsdatum.
    //
    // AN SEINE STELLE TRETEN DREI ANGABEN UEBER DIE ANTWORT, mit verschiedener Herkunft:
    //  · STATUS  — aus dem Antwort-Objekt. Kleine Ganzzahl, KEIN Fremdtext.
    //  · TYPE    — die Content-Type-KOPFZEILE. DAS IST FREMDTEXT: eine Kopfzeile ist
    //              frei belegbar, nichts garantiert einen wohlgeformten Medientyp.
    //              Deshalb laeuft sie durch dieselbe schwaerzende Aufbereitung wie die
    //              enum-artigen Felder. Sie ungefiltert auszugeben hiesse, die Oeffnung
    //              am Rumpf zu schliessen und an der Kopfzeile wieder aufzumachen.
    //  · LEN     — von UNS aus dem gelesenen Text berechnet. Kein Fremdtext.
    // Der Rumpf wird also weiterhin GELESEN (ohne Lesung keine Laenge), er wandert nur
    // nicht mehr in die Zeile.
    try {
      const length = (await res.text()).length;
      return (
        `[capi] Meta forward rejected: non-JSON body suppressed,` +
        ` HTTP ${res.status}` +
        ` type=${asProviderEnum(res.headers.get("content-type"))}` +
        ` len=${length}`
      );
    } catch {
      return "[capi] Meta forward rejected: body unreadable";
    }
  }

  const err = (body as MetaErrorBody | null)?.error;
  if (!err) return "[capi] Meta forward rejected: no error envelope";

  return (
    `[capi] Meta forward rejected: code=${asProviderEnum(err.code)}` +
    ` subcode=${asProviderEnum(err.error_subcode)}` +
    ` type=${asProviderEnum(err.type)}` +
    ` fbtrace=${asTraceId(err.fbtrace_id)}` +
    ` msg=${asProviderText(err.message)}`
  );
}

/**
 * Das UNTRUSTED Client-Blob, SOWEIT die Meta-Nutzlast es liest.
 *
 * BEWUSST ENGER als CapiRequestBody im Handler: hier stehen nur die vier optionalen
 * Felder, die in die Nutzlast wandern. Die Pflichtfelder reisen als bereits GETRIMMTE
 * Argumente (event, eventID) — sie sind im Handler schon normalisiert und vom 400-Guard
 * geprueft; sie ein zweites Mal durch asString zu schicken waere eine zweite
 * Normalisierung derselben Werte.
 * isCustom fehlt hier ABSICHTLICH: der Forward hat es noch nie gelesen (ein "Custom
 * Event" ist bei der Graph-CAPI schlicht ein freier event_name). Es in die Signatur zu
 * nehmen hiesse, einen Wert mitzufuehren, den niemand benutzt.
 */
type MetaForwardBody = {
  value?: unknown;
  currency?: unknown;
  eventSourceUrl?: unknown;
  _fbp?: unknown;
};

/**
 * Baut die Meta-Nutzlast und stellt sie an Metas Graph-CAPI zu.
 *
 * DER VERTRAG, in drei Saetzen:
 * 1. SIE WIRFT NIE — und der Grund ist in den zwei Haelften dieser Funktion ein
 *    VERSCHIEDENER. Das ist keine Wortklauberei, sondern die Auflage darunter:
 *    · AB DEM try: umschlossen. Jeder Pfad — Netzwerkfehler, Abort, ein unlesbarer
 *      Antwort-Body, auch ein Stolpern des Timeout-Geruests selbst — muendet im catch.
 *    · DAVOR (Payload-Bau, URL-Bau): NICHT umschlossen, sondern wurffrei, WEIL KEINE
 *      SEINER ANWEISUNGEN WERFEN KANN. Es sind ausschliesslich Feld-Lesungen auf einem
 *      bereits als Objekt geprueften Blob, typeof-Vergleiche, asString (reiner
 *      typeof/trim) und String-/Objekt-Bau. Kein JSON.parse, kein await, kein Zugriff,
 *      der einen fremden Getter ausloest.
 *    AUFLAGE, und sie ist der Zweck dieser Unterscheidung: WER VOR DEM try EINE ZEILE
 *    ERGAENZT, DIE WERFEN KANN, BRICHT DAS 204-CONTAINMENT DES AUFRUFERS. Der Wurf
 *    verliesse diese Funktion, liefe durch das await in handleIngest und aus dem Handler
 *    heraus — statt der garantierten leeren 204 entstuende ein 500, und der leakt den
 *    Gueltigkeitszustand des trackingKeys an einen anonymen Aufrufer. Wer dort etwas
 *    Werfendes braucht, zieht den Abschnitt in den try, statt sich auf "wirft schon
 *    nicht" zu verlassen.
 * 2. SIE WIRD IM REQUEST ERWARTET. Das await beim Aufrufer bleibt; die Antwort steht
 *    weiterhin DAHINTER. Die Ablösung von der Antwort ist eine EIGENE, spaetere Aenderung
 *    — wer sie hier vorwegnimmt, baut zwei Wirkungen in einen Schritt.
 * 3. SIE GIBT NICHTS ZURUECK. Geloggt wird hier, nicht beim Aufrufer.
 *
 * clientIp/userAgent kommen FERTIG vom Aufrufer und werden dort auch ermittelt — genau
 * dann, wenn sie gebraucht werden. Die IP-Aufloesung selbst bleibt im Handler: sie liest
 * Request-Header, und diese Datei soll kein HTTP kennen, sondern Metas Vokabular.
 */
export async function forwardToMeta(
  config: CapiConfig,
  event: string,
  eventID: string,
  body: MetaForwardBody,
  clientIp: string | undefined,
  userAgent: string,
): Promise<void> {
  // --- Server-gesetztes Feld (NIE aus Client-Payload) ---
  // Metas Zeiteinheit sind SEKUNDEN, nicht Millisekunden.
  const eventTime = Math.floor(Date.now() / 1000);

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
