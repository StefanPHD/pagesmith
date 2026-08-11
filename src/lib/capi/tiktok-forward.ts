import "server-only";
import { errorName } from "@/lib/errors";
import { redactOpaque } from "@/lib/redact";
import type { CapiConfig } from "@/lib/capi/token";

/**
 * DER ADAPTER FUER DAS DRITTE ZIEL (Phase 11).
 *
 * DIE ANGABEN UEBER DEN ANBIETER SIND GEMESSEN, NICHT RECHERCHIERT — und das ist der
 * Unterschied zum zweiten Adapter, dessen Kopf das Gegenteil sagen muss. Endpunkt,
 * Auth-Kopfzeile, Rumpfform, Feldnamen, Zeiteinheit, beide Antwortformen und drei
 * Fehlercodes stammen aus HTTP-Aufrufen von Hand gegen den laufenden Endpunkt am
 * 2026-08-11, im Testmodus eines eigenen Werbekontos; die mit (TAB) belegten Felder
 * sind zusaetzlich im Test-Ereignis-Tab des Anbieters als verarbeitet bestaetigt.
 * WAS DAS NICHT HEISST: gemessen ist das VERHALTEN DES ANBIETERS, nicht dieser Code.
 * Was dieser Adapter daraus macht, sichern seine Tests.
 *
 * KEINE ABSTRAKTION, ZUM DRITTEN MAL — und diesmal mit einer Aenderung: Die
 * formbasierte SCHWAERZUNG ist beim dritten Fall in eine reine geteilte Datei gezogen
 * worden (lib/redact.ts) und wird hier BENUTZT statt kopiert. Alles andere bleibt
 * eigen: eine Datei, eine Funktion, der Anbieter im Namen. Geteilt wird das WERKZEUG,
 * nicht die POLITIK — welches Feld wie behandelt wird, entscheidet dieser Adapter.
 *
 * WAS HIER ANDERS IST ALS BEI DEN BEIDEN BESTEHENDEN — die Liste steht hier, damit
 * niemand abschreibt, was nicht passt:
 *  1. DAS GEHEIMNIS REIST IN EINER EIGENEN KOPFZEILE ("Access-Token"), im Klartext,
 *     OHNE Bearer-Praefix und NICHT im Query-String. Der erste Adapter haengt es an
 *     die URL, der zweite schickt es als Bearer.
 *  2. DIE KENNUNG STEHT IM RUMPF (event_source_id), nicht im Pfad. Es gibt hier
 *     also keine Kodierungs-Frage an der URL.
 *  3. FEHLER- UND ERFOLGSFORM SIND IDENTISCH AUFGEBAUT (code, message, request_id;
 *     im Erfolg zusaetzlich ein leeres data). Beim zweiten Adapter sind es zwei
 *     verschiedene Formen — deshalb hat er zwei Deutungs-Funktionen und dieser eine.
 *  4. DER HTTP-STATUS TRENNT DIE FEHLERKLASSEN NICHT: zwei verschiedene Codes teilen
 *     sich HTTP 401 (gemessen). Das code-Feld ist die tragende Angabe.
 *  5. DER WERT REIST ALS ZAHL. Der zweite Adapter erwartet eine Zeichenkette.
 *  6. event_source ist ein ENUM mit dem Wert "web" (gemessen: andere Werte werden
 *     mit einem Schema-Fehler abgewiesen). Metas Feld heisst action_source und
 *     kennt "website", das des zweiten Ziels "web" an anderer Stelle.
 *
 * DER VERTRAG, in drei Saetzen:
 * 1. SIE WIRFT NIE, UND DIE ZUSAGE IST STRUKTURELL GEHALTEN: VOR dem try steht KEINE
 *    ANWEISUNG ausser der Deklaration von `timer`, die nichts auswertet. Riegel,
 *    Uebersetzung, Nutzlast- und URL-Bau liegen INNERHALB. Dieselbe Anordnung wie
 *    beim zweiten Adapter, und aus demselben Grund: Ein Wurf verliesse diese
 *    Funktion, liefe durch dispatchForward und handleIngest und machte aus der
 *    garantierten LEEREN 204 einen 500 — der leakt den Gueltigkeitszustand des
 *    trackingKeys an einen anonymen Aufrufer.
 * 2. SIE WIRD IM REQUEST ERWARTET. Das await beim Aufrufer bleibt; die Antwort steht
 *    DAHINTER.
 * 3. SIE GIBT NICHTS ZURUECK. Geloggt wird hier, nicht beim Aufrufer.
 */

// Striktes Timeout (A-Regel "defensive Timeouts"). DRITTE unabhaengige Zahl fuer
// dieselbe Frage, mit demselben bekannten Preis wie die zweite: Kein Test kann ihre
// Divergenz bemerken, weil keine Stelle sie nebeneinander sieht. Bereits gefuehrter
// Backlog-Kandidat, kein neuer.
const TIKTOK_FORWARD_TIMEOUT_MS = 3_000;

// Deckel fuer den FREIEN Text des Anbieters (message).
const TIKTOK_LOG_MAX = 200;

// HARTER, kurzer Deckel fuer die kurzen Felder: code, request_id und die
// Content-Type-Kopfzeile im Nicht-JSON-Fall.
const TIKTOK_SHORT_MAX = 64;

/**
 * Der Endpunkt. Feste Zeichenkette, KEINE Interpolation — die Kennung steht im
 * Rumpf, nicht im Pfad (Unterschied 2 oben).
 */
const TIKTOK_ENDPOINT = "https://business-api.tiktok.com/open_api/v1.3/event/track/";

/**
 * DIE NORMALISIERUNG — SIE STEHT VOR DEM GETEILTEN PRIMITIV, UND DAS IST PFLICHT.
 *
 * DAS PRIMITIV IST NICHT DEFENSIV: redactOpaque nimmt einen String und ruft darauf
 * .replace. Wer ihm etwas anderes reicht, bekommt einen WURF — und ein Wurf auf
 * diesem Pfad braeche die garantierte leere 204 (s. Vertragssatz 1). Diese Funktion
 * ist der Riegel davor: Sie gibt IMMER einen String zurueck.
 *
 * WARUM String(v) UND NICHT "Nicht-Strings werden zum Ersatzwert": Das code-Feld des
 * Anbieters ist eine ZAHL und zugleich die tragende Diagnose-Angabe. Wer Zahlen zum
 * Ersatzwert machte, wuerfe genau den Wert weg, der die Fehlerklasse benennt.
 * DIE UMWANDLUNG IST SICHER, weil die Eingabe aus JSON.parse stammt: dort entstehen
 * nur Zeichenketten, Zahlen, Wahrheitswerte, null, Objekte und Arrays — String() ist
 * auf allen davon definiert. Ein Symbol koennte werfen, und ein Symbol kann hier
 * nicht ankommen.
 */
function normalizeProviderValue(v: unknown): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v);
}

/**
 * DIE FELD-POLITIK, LANGE FASSUNG — fuer den freien Text des Anbieters.
 * ERSATZWERT, DANN SCHWAERZEN, DANN KAPPEN. Die Reihenfolge ist nicht beliebig: Die
 * Kappung behaelt den ANFANG; laege sie vor der Schwaerzung, bliebe von einer Folge
 * auf der Grenze ein Rest unterhalb der Mindestlaenge stehen und ginge als TEIL-Leak
 * hinaus — bei einer Zeile, die bereinigt AUSSIEHT.
 */
function asLogText(v: unknown): string {
  const s = normalizeProviderValue(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, TIKTOK_LOG_MAX);
}

/**
 * DIE FELD-POLITIK, KURZE FASSUNG — fuer code, request_id und die Content-Type-
 * Kopfzeile. Schwaerzt ebenfalls und kappt zusaetzlich HART.
 *
 * WARUM request_id HIER STEHT UND NICHT — WIE METAS TRACE-BEZEICHNER — EINE EIGENE
 * AUSNAHME BEKOMMT: Metas Ausnahme ruht auf einem GEMESSENEN Grund (der Bezeichner
 * ist der einzige Wert, mit dem man dort den Support ansprechen kann, und er liegt
 * ueber der Schwaerzungs-Grenze). Fuer diesen Anbieter liegt KEIN solcher Grund vor —
 * weder gemessen noch belegt. Eine Ausnahme ohne Grund waere genau das Abschreiben,
 * das im Repo als sechster Adapter-Unterschied gefuehrt wird: Wer beim ersten
 * abschreibt, schwaerzt ausgerechnet den Wert, dessen Zweck die Undurchsichtigkeit
 * ist — oder er verschont hier einen, den niemand braucht.
 * WANN DAS NEU ZU ENTSCHEIDEN IST: sobald gemessen ist, dass der Anbieter-Support
 * ohne diesen Wert nicht arbeiten kann. Dann bekommt er eine eigens benannte
 * Aufbereitung, nicht ein Argument an dieser.
 */
function asLogShort(v: unknown): string {
  const s = normalizeProviderValue(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, TIKTOK_SHORT_MAX);
}

/**
 * DIE UEBERSETZUNGSTABELLE — HEUTE DIE IDENTITAET, UND SIE WIRD TROTZDEM GEBAUT.
 *
 * GEMESSENER ZUSTAND, KEINE ZUSAGE (2026-08-11): Alle acht Namen unseres
 * Auswahlfeldes sind bei diesem Anbieter STANDARD-Ereignisse — je ein Aufruf, alle
 * angenommen, alle im Test-Tab unter dem Anzeigenamen des Anbieters und OHNE
 * Custom-Kennzeichnung. Der Anbieter normalisiert ausserdem zwischen Alt- und
 * Neunamen in BEIDE Richtungen; die heutige Deckung ist damit ein ZUSTAND, den er
 * jederzeit aendern kann.
 *
 * WARUM EINE IDENTITAETS-TABELLE KEIN TOTES BAUTEIL IST — drei Gruende, der dritte
 * traegt:
 *  1. Sie schreibt die Messung in den Code. Dass diese acht dort Standard sind,
 *     steht sonst nirgends im Repo.
 *  2. Sie ist die Naht fuer die Abweichung, die kommen wird (s. Normalisierung des
 *     Anbieters oben).
 *  3. SIE MACHT DIE ERWEITERUNG UNSERER EIGENEN LISTE SICHTBAR. META_STANDARD_EVENTS
 *     (tracking/meta.ts) speist das Auswahlfeld. Wird dort ein neunter Name ergaenzt,
 *     ist er hier NICHT automatisch Standard: Die Durchreiche schickt ihn hinaus, der
 *     Anbieter nimmt ihn an (gemessen: code 0) und fuehrt ihn ALS CUSTOM — und die
 *     Quittung sagt das NICHT, nur die Oberflaeche des Anbieters tut es. Das ist ein
 *     lautloser Produktverlust. Der Kreuzvergleich in tiktok-forward.test.ts ist der
 *     einzige Waechter dagegen.
 *
 * EINE Map UND KEIN OBJEKTLITERAL, aus demselben Sicherheitsgrund wie beim zweiten
 * Adapter: Der Name kommt aus dem Beacon und ist damit UNTRUSTED — /api/e ist ein
 * anonymer Endpunkt. Auf einem Objektliteral lieferte TABELLE["constructor"] einen
 * wahrheitsfaehigen Wert aus Object.prototype; eine Map hat keinen Prototyp-
 * Durchgriff.
 */
// EXPORTIERT AUSSCHLIESSLICH FUER DEN KREUZVERGLEICH IM TEST, und der Grund ist
// scharf: Am DRAHT sind Identitaets-Abbildung und Durchreiche NICHT unterscheidbar —
// beide schicken denselben Namen hinaus. Ein Test, der nur die gesendete Nutzlast
// liest, kann deshalb nicht bemerken, dass ein Name gar nicht in der Tabelle steht.
// Beobachtbar wird es erst, wenn der Test die Tabelle SELBST gegen
// META_STANDARD_EVENTS haelt. Dasselbe Muster und derselbe Grund wie beim Export von
// allowedTargets in capi/ingest.ts.
export const EVENT_MAP: ReadonlyMap<string, string> = new Map([
  ["Purchase", "Purchase"],
  ["Lead", "Lead"],
  ["InitiateCheckout", "InitiateCheckout"],
  ["AddToCart", "AddToCart"],
  ["ViewContent", "ViewContent"],
  ["CompleteRegistration", "CompleteRegistration"],
  ["Contact", "Contact"],
  ["Subscribe", "Subscribe"],
]);

/**
 * Abbildbarer Name -> Ziel-Name; jeder andere UNVERAENDERT.
 *
 * DAS DURCHREICHEN IST EINE ENTSCHEIDUNG, KEIN RESTPOSTEN — dieselbe Begruendung wie
 * beim zweiten Adapter: Ein Sammelname waere der einzige STILLE Ausgang (das Ereignis
 * kaeme als Erfolg zurueck und landete unter falscher Bedeutung im Konto des
 * Betreibers), und gar nicht zu senden naehme dem Betreiber die Entscheidung ueber
 * SEIN Konto.
 * WAS DER BETREIBER DABEI NICHT ERFAEHRT: dass ein frei benannter Name beim Anbieter
 * als Custom gefuehrt und damit nicht optimierungsfaehig ist. Eine Warnung an der
 * Oberflaeche ist GEMELDET, NICHT GEBAUT — eigener Bereich, eigene Produktfrage.
 */
function tiktokEventName(event: string): string {
  return EVENT_MAP.get(event) ?? event;
}

/**
 * DER TESTMODUS, gelesen bei JEDEM Aufruf statt beim Laden des Moduls.
 *
 * DER CODE WECHSELT PRO SITZUNG (gemessen) — er ist deshalb NICHTS, was man in der
 * Geheimnis-Tabelle hinterlegt, und nichts, was ein Betreiber pflegt. Er ist ein
 * Betriebsschalter der Instanz und gehoert in die Umgebung.
 * KEINE KOPPLUNG AN DIE UMGEBUNGSVARIABLE EINES ANDEREN ZIELS, aus demselben Grund
 * wie beim zweiten Adapter: Diese Datei liest META_TEST_EVENT_CODE NIRGENDS.
 * STANDARDMAESSIG AUS: unset oder leer -> kein Feld in der Nutzlast.
 */
function testEventCode(): string {
  return process.env.TIKTOK_TEST_EVENT_CODE?.trim() ?? "";
}

/** Das UNTRUSTED Client-Blob, SOWEIT die Nutzlast dieses Ziels es liest. */
type TiktokForwardBody = {
  value?: unknown;
  currency?: unknown;
  eventSourceUrl?: unknown;
};

/**
 * Liest den Rumpf GENAU EINMAL und gibt Rohtext plus geparstes JSON zurueck.
 *
 * DRITTE KOPIE DIESER FORM (die anderen beiden: capi/pinterest-forward.ts als
 * readBody, capi/meta-forward.ts implizit ueber clone().json() mit Text-Rueckfall).
 * KEIN TEST SICHERT IHRE GLEICHHEIT. Das ist bewusst und nicht uebersehen: Eine
 * neutrale Datei dafuer waere richtig, liegt aber ausserhalb dieser Scheibe — sie
 * muesste zwei bestehende Adapter umstellen, und beide sind hier unantastbar.
 *
 * WIRFT NIE: beide Schritte sind einzeln umschlossen.
 */
async function readBody(
  res: Response,
): Promise<{ raw: string | null; parsed: unknown }> {
  let raw: string | null = null;
  try {
    raw = await res.text();
  } catch {
    return { raw: null, parsed: undefined };
  }
  try {
    return { raw, parsed: JSON.parse(raw) };
  } catch {
    return { raw, parsed: undefined };
  }
}

/** Die drei Felder, die BEIDE Antwortformen tragen. */
type TiktokBody = {
  code?: unknown;
  message?: unknown;
  request_id?: unknown;
};

/**
 * DER ERFOLGS-CODE. Gemessen: eine angenommene und verarbeitete Nutzlast antwortet
 * mit HTTP 200 und `code: 0` (Zahl).
 */
const TIKTOK_OK_CODE = 0;

/**
 * Uebersetzt eine ABGELEHNTE Antwort in EINE bereinigte Logzeile.
 *
 * SIE DEUTET BEIDE WEGE, weil beide DIESELBE Form haben (gemessen). Der Aufrufer
 * entscheidet, WANN sie gerufen wird — nicht sie selbst.
 *
 * SECRETS-DISZIPLIN: Es fliesst NICHTS aus dem Request hinein — nicht das
 * Zugangsdatum, nicht die Kennung, nicht die Nutzlast, nicht die URL. Und jeder Wert
 * aus der ANTWORT laeuft durch die Normalisierung und die Schwaerzung.
 * DAS IST HIER KEINE VORSICHT, SONDERN EIN GEMESSENER BEFUND: Bei einer unzulaessigen
 * Ereignisquellen-Kennung enthaelt die Meldung des Anbieters den von UNS gesendeten
 * Wert WOERTLICH. Beim ersten Adapter war diese Echo-Achse eine begruendete Annahme;
 * hier ist sie belegt, und deshalb steht die Schwaerzung von Anfang an.
 *
 * DER NICHT-JSON-FALL GIBT DEN ROHEN RUMPF NICHT HERAUS — nur Status, Content-Type
 * und Laenge. Die Kopfzeile ist SELBST Fremdtext (frei belegbar) und laeuft deshalb
 * durch dieselbe kurze Aufbereitung.
 */
function describeRejection(
  res: Response,
  raw: string | null,
  parsed: unknown,
): string {
  if (raw === null) return "[capi] TikTok forward rejected: body unreadable";
  if (parsed === undefined) {
    return (
      `[capi] TikTok forward rejected: non-JSON body suppressed,` +
      ` HTTP ${res.status}` +
      ` type=${asLogShort(res.headers.get("content-type"))}` +
      ` len=${raw.length}`
    );
  }
  const body = (parsed ?? {}) as TiktokBody;
  return (
    `[capi] TikTok forward rejected: HTTP ${res.status}` +
    ` code=${asLogShort(body.code)}` +
    ` request=${asLogShort(body.request_id)}` +
    ` msg=${asLogText(body.message)}`
  );
}

/**
 * Baut die Nutzlast und stellt sie zu.
 *
 * DIE KONFIGURATION IST CapiConfig UND KEINE EIGENE FORM — anders als beim zweiten
 * Adapter, und der Grund ist derselbe, der dort zur eigenen Form gefuehrt hat: Die
 * NAMEN muessen stimmen. Dort heisst die Groesse Anzeigenkonto-ID; hier ist sie
 * tatsaechlich eine Pixel-Kennung, und genau so heisst das Feld in CapiConfig.
 *
 * clientIp/userAgent kommen FERTIG vom Aufrufer — die Ermittlung liest Request-Header,
 * und diese Datei soll kein HTTP kennen, sondern das Vokabular des Anbieters.
 */
export async function forwardToTiktok(
  config: CapiConfig,
  event: string,
  eventID: string,
  body: TiktokForwardBody,
  clientIp: string | undefined,
  userAgent: string,
): Promise<void> {
  // DIE EINZIGE ANWEISUNG VOR DEM try, UND SIE IST EINE REINE DEKLARATION (s.
  // Vertragssatz 1). Sie steht hier, damit finally sie sieht.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // --- DER RIEGEL: KEINE IDENTITAET, KEIN AUFRUF ---
    //
    // DER ANBIETER VERLANGT DAS NICHT. Gemessen am 2026-08-11: ein Aufruf GANZ OHNE
    // Nutzer-Objekt wird angenommen und mit code 0 quittiert. DIES IST ALSO UNSERE
    // ENTSCHEIDUNG, nicht seine Forderung — wer den Riegel spaeter als
    // Anbieter-Anforderung liest, liest falsch.
    //
    // UNSERE BEGRUENDUNG: Ein Aufruf ohne jede Identitaet kann beim Anbieter nichts
    // bewirken — kein Match, keine Attribution — und kostet trotzdem einen
    // Concurrency-Slot auf dem meistgetroffenen Pfad der Plattform, multipliziert
    // ueber ALLE Kunden.
    //
    // WANN SIE NEU ZU TREFFEN IST: sobald ein Ereignis ohne IP und User-Agent fuer
    // uns einen Wert bekaeme (etwa mit einer anderen Kennung, die wir dann erheben),
    // ODER sobald die Slot-Kosten anders bewertet werden.
    //
    // EINE Bedingung mit ZWEI Termen, nicht zwei unabhaengige if — der Riegel ist
    // EINE Entscheidung und soll als eine sichtbar bleiben.
    // DER FALL IST REAL: In Produktion liefert die IP-Aufloesung undefined, sobald
    // die vertraute IP loopback oder leer ist.
    if (!clientIp || !userAgent) return;

    // --- Server-gesetztes Feld (NIE aus Client-Payload) ---
    // GANZZAHLIGE SEKUNDEN (gemessen, TAB).
    const eventTime = Math.floor(Date.now() / 1000);

    const eintrag: Record<string, unknown> = {
      event: tiktokEventName(event),
      event_time: eventTime,
      event_id: eventID,
      user: {
        // Roh, NICHT gehasht. Gemessen: die beiden allein GENUEGEN fuer einen
        // angenommenen und verarbeiteten Aufruf.
        ip: clientIp,
        user_agent: userAgent,
      },
    };

    const eventSourceUrl = asString(body.eventSourceUrl);
    if (eventSourceUrl) eintrag.page = { url: eventSourceUrl };

    // --- properties: NUR was vorliegt ---
    //
    // DER WERT REIST ALS ZAHL (gemessen). Wer das Muster des zweiten Adapters
    // abschreibt, sendet eine Zeichenkette. Auf ENDLICHKEIT geprueft, weil
    // typeof NaN === "number" und typeof Infinity === "number".
    //
    // content_id FEHLT UNS, und das ist eine bewusste Luecke, kein vergessenes Feld:
    // Unser Mapping (TrackConfig in lib/mappings.ts) traegt Wert und Waehrung, aber
    // keine Inhalts-Kennung. GEMESSEN ist, dass der Test-Tab des Anbieters sie
    // beanstandet — die Beanstandung bleibt im Betrieb stehen, bekannt und
    // akzeptiert. KEIN Platzhalter: ein erfundener Wert waere eine Behauptung ueber
    // den Inhalt des Kunden.
    const properties: Record<string, unknown> = {};
    if (typeof body.value === "number" && Number.isFinite(body.value)) {
      properties.value = body.value;
    }
    const currency = asString(body.currency);
    if (currency) properties.currency = currency;
    if (Object.keys(properties).length > 0) eintrag.properties = properties;

    // --- Der Rumpf: Kennung und Quelle stehen OBEN, die Ereignisse im Array ---
    const payload: Record<string, unknown> = {
      // ENUM mit genau diesem Wert (gemessen: andere Werte -> Schema-Fehler).
      event_source: "web",
      event_source_id: config.pixelId,
      data: [eintrag],
    };
    const testCode = testEventCode();
    if (testCode) payload.test_event_code = testCode;

    const controller = new AbortController();
    timer = setTimeout(() => controller.abort(), TIKTOK_FORWARD_TIMEOUT_MS);
    const res = await fetch(TIKTOK_ENDPOINT, {
      method: "POST",
      headers: {
        // DAS GEHEIMNIS REIST IN EINER EIGENEN KOPFZEILE, im Klartext, OHNE
        // Bearer-Praefix (gemessen). Es steht damit NICHT in der URL — die Adresse
        // ist hier kein Geheimnis-Traeger, anders als beim ersten Adapter. Geloggt
        // wird sie trotzdem nicht: Der Status traegt die Diagnose.
        "Access-Token": config.token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // --- ERST AM STATUS TRENNEN, DANN IN BEIDEN ZWEIGEN DIESELBE FORM DEUTEN ---
    //
    // WARUM DER STATUS NICHT GENUEGT, gemessen und nicht befuerchtet:
    //  · Eine fachliche Ablehnung kommt mit ERFOLGSSTATUS und traegt ihren Grund im
    //    code-Feld. Wer nur den Status liest, haelt sie fuer einen Erfolg — dieselbe
    //    Falle wie beim zweiten Ziel, an einem anderen Anbieter.
    //  · Der Status trennt auch die FEHLERKLASSEN nicht: zwei verschiedene Codes
    //    teilen sich HTTP 401. Ein Adapter, der auf den Status verzweigt,
    //    unterscheidet "falsche Kennung" nicht von "falschem Zugangsdatum" — und
    //    genau diese beiden muss der Betreiber-Support auseinanderhalten koennen.
    const { raw, parsed } = await readBody(res);
    if (!res.ok) {
      console.error(describeRejection(res, raw, parsed));
      return;
    }
    // Erfolgsstatus: der RUMPF entscheidet. Was nicht eindeutig Erfolg meldet, ist
    // keiner — ein unlesbarer oder nicht-JSON-Rumpf faellt hier ebenfalls heraus.
    const code = (parsed ?? {}) as TiktokBody;
    if (parsed !== undefined && code.code === TIKTOK_OK_CODE) return;
    console.error(describeRejection(res, raw, parsed));
  } catch (err) {
    // Nur der Fehler-NAME. errorName liest ausschliesslich .name — nie die Message,
    // die Client-Input oder Fremdtext tragen kann. Ein Abort landet als DOMException
    // hier und wird dadurch als "AbortError" statt "unknown" sichtbar.
    console.error(`[capi] TikTok forward error: ${errorName(err)}`);
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "".
 *
 * VIERTE KOPIE. Die anderen drei stehen in capi/ingest.ts, capi/meta-forward.ts und
 * capi/pinterest-forward.ts. KEIN TEST SICHERT DIE GLEICHHEIT DER VIER — bereits als
 * Vorrats-Punkt gefuehrt ("dritte Trimm-Kopie"), jetzt eine mehr. Eine neutrale Datei
 * dafuer muesste drei bestehende Dateien umstellen und liegt ausserhalb dieser
 * Scheibe.
 */
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}
