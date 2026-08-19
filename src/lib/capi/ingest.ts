import { after } from "next/server";
import {
  getCapiConfigByTrackingKey,
  type ResolvedTarget,
} from "@/lib/capi/token";
// DIE EINE QUELLE FUER "HAT DIESES ZIEL EINEN EMPFAENGER" (Scheibe C2). Eine REINE
// Datei, damit auch die Oberflaeche sie lesen kann — dieser Handler ist server-only
// und taugte deshalb nicht als Quelle, obwohl er bis hierher eine war.
import {
  hasAdapter,
  type TargetWithAdapter,
} from "@/lib/tracking/target-adapters";
import { META_TEST_EVENT_CODE } from "@/lib/capi/config";
import { forwardToMeta } from "@/lib/capi/meta-forward";
import { forwardToPinterest } from "@/lib/capi/pinterest-forward";
import { forwardToTiktok } from "@/lib/capi/tiktok-forward";
import { forwardToLinkedin } from "@/lib/capi/linkedin-forward";
// HIER STAND EIN TYP-IMPORT VON TrackingTarget ("NUR DER TYP … er traegt den Waechter
// fuer die Ziel-Konstante unten"). Mit Scheibe C2 sind die beiden lokalen
// Ziel-Konstanten entfallen, und damit sein einziger Verwender. Die Zusage, dass
// dieser Handler keine LAUFZEIT-Abhaengigkeit auf den Einstellungs-Blob hat, gilt
// unveraendert — er importiert von dort jetzt gar nichts mehr.
import { CONSENT_WIRE_FIELD, consentAllows } from "@/lib/tracking/consent-wire";
// DER SCHLUESSEL KOMMT AUS DEM CONSENT-VOKABULAR, NICHT AUS DEM DER GEHEIMNIS-TABELLE
// (META_TARGET in capi/token.ts) — obwohl beide heute "meta" lauten. Zwei Gruende:
// (1) Der Schluessel IM DRAHT ist der, den der Betreiber in seinen eigenen
//     Consent-Hook schreibt. Das ist dieses Vokabular.
// (2) DIESELBE Konstante setzt das Feld im erzeugten Browser-Text (tracking/meta.ts);
//     eine server-only-Datei ist von dort gar nicht erreichbar. Naehme der Leser die
//     andere, haengten Setzer und Leser an zwei unabhaengig definierten Literalen,
//     die nur zufaellig gleich sind — genau die Drift, die im Repo bereits als
//     "der Meta-Zielname liegt in drei Kopien" vermerkt ist.
// SEIT DER NEUNTEN SCHEIBE STEHT DIESE BEGRUENDUNG AN DER ABBILDUNG SELBST
// (tracking/consent-targets.ts): Der Handler kennt keinen Consent-Schluessel mehr
// im Klartext, er schlaegt ihn je Ziel nach. Der Absatz darueber bleibt, weil er
// den GRUND fuer die Trennung der beiden Vokabulare traegt — wer ihn streicht,
// entfernt die Erklaerung, warum die Abbildung ueberhaupt existiert.
import {
  CONSENT_KEY_BY_TARGET,
  LEGACY_CONSENT_ROLE,
} from "@/lib/tracking/consent-targets";
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
 * DIE ZWEI LOKALEN ZIELWERTE SIND MIT SCHEIBE C2 ENTFALLEN — hier standen
 * PINTEREST_TARGET und TIKTOK_TARGET, je mit der Begruendung, warum sie LOKAL und
 * nicht in capi/token.ts liegen. Beide Gruende sind weiterhin richtig und gelten der
 * Zuordnung unten unveraendert:
 *  1. Die Aufloesung bleibt unantastbar.
 *  2. DIE STILLE FALLE BESTEHT FORT: NEUN Testdateien mocken @/lib/capi/token mit
 *     einer Fabrik, die genau zwei Schluessel liefert. Ein WERT-Import eines
 *     Zielwerts von dort waere in jeder von ihnen `undefined`, der Nachschlag ginge
 *     ins Leere — der Empfaenger waere in der GESAMTEN Handler-Suite tot, und alles
 *     bliebe gruen. Die Schluessel der Zuordnung sind deshalb LITERALE, die der
 *     Compiler gegen die Adapter-Union prueft, und kein importierter Wert.
 * DER TYP IST DER WAECHTER, nicht der Name — das gilt jetzt schaerfer als vorher:
 * Wird ein Ziel in TRACKING_TARGETS umbenannt, bricht nicht mehr eine Zeile, sondern
 * die Liste, die Zuordnung und drei weitere Records.
 */

/**
 * EIN EMPFAENGER, EINHEITLICH VON AUSSEN GESEHEN. Die Form ist bei allen dieselbe —
 * der aufgeloeste Eintrag plus die fuenf unveraenderten Argumente; was je Ziel
 * verschieden ist, liegt INNEN.
 */
type Forwarder = (
  entry: ResolvedTarget,
  event: string,
  eventID: string,
  body: CapiRequestBody,
  clientIp: string | undefined,
  userAgent: string,
) => Promise<void>;

/**
 * DIE ZUORDNUNG ZIEL -> ADAPTER (Phase 11, siebte Scheibe; zweiter Zweig in der
 * zwoelften; SEIT SCHEIBE C2 EINE ZUORDNUNG STATT DREIER VERGLEICHE).
 *
 * WAS SICH GEAENDERT HAT UND WARUM: Bis hierher standen hier drei
 * Gleichheitsvergleiche, und die Tatsache "dieses Ziel hat einen Adapter" wurde
 * dadurch ein ZWEITES Mal behauptet — neben dem Feld hasAdapter in TARGET_CARDS.
 * Beide waren durch nichts verbunden; ein entfernter Zweig blieb lautlos. Jetzt gibt
 * es die Tatsache EINMAL (TARGETS_WITH_ADAPTER in tracking/target-adapters.ts), und
 * diese Zuordnung ist ihre Folge.
 *
 * DIE BINDUNG GREIFT IN BEIDE RICHTUNGEN, UND SIE IST EINE COMPILER-BINDUNG:
 * `Record<TargetWithAdapter, …>` ist ueber die ADAPTER-Union erschoepfend — ein
 * fehlender Eintrag ist ein BUILD-Fehler, ein ueberzaehliger ebenso.
 * SIE IST AUSDRUECKLICH NICHT UEBER TrackingTarget GEBAUT, und das ist der Kern:
 * Waere sie es, MUESSTE jedes Ziel einen Adapter haben — ein viertes Ziel ohne
 * Empfaenger waere dann nicht mehr moeglich, und der Hinweis auf der Karte ("dieses
 * Ziel sendet noch nicht") haette keinen Fall mehr, den er beschreiben koennte. Die
 * Liste ist eine TEILMENGE der Ziele, und genau daran haengt diese Moeglichkeit.
 *
 * DESHALB STEHT HIER KEIN TEST GEGEN DIESE VIER FEHLERKLASSEN (fehlender Eintrag,
 * ueberzaehliger Eintrag, unbekannter Wert in der Liste, umbenanntes Ziel): Sie sind
 * seit C2 BUILD-Fehler. Ein Test neben einem Compiler-Fehler prueft nichts und
 * suggeriert, die Bindung haenge an ihm — wer ihn spaeter entfernt, glaubt dann,
 * etwas verloren zu haben, oder schlimmer: wer die Bindung lockert, haelt den noch
 * gruenen Test fuer eine Absicherung.
 * WAS WEITERHIN EINEN TEST BRAUCHT, weil es KOMPILIERT: die VERTAUSCHUNG zweier
 * Eintraege (der Kreuzvergleich in fan-out.test.ts) und die Vertauschung der beiden
 * Werte in der Umformung unten (T10, ebenda).
 *
 * DIE SCHLUESSEL SIND LITERALE, KEINE IMPORTIERTEN WERTE — s. den Absatz ueber den
 * entfallenen lokalen Konstanten: Ein Wert-Import aus einem Modul, das neun
 * Testdateien mocken, waere dort `undefined`, und der Empfaenger waere in der
 * gesamten Handler-Suite tot. Der Compiler prueft die Literale gegen die Union; das
 * leistet dasselbe ohne diese Falle.
 */
const FORWARDER_BY_TARGET: Record<TargetWithAdapter, Forwarder> = {
  meta: (entry, event, eventID, body, clientIp, userAgent) =>
    forwardToMeta(entry.config, event, eventID, body, clientIp, userAgent),

  // DIE ASYMMETRIE VERSCHWINDET NICHT, SIE WANDERT — vom Kontrollfluss in die Daten,
  // und sie steht jetzt bei dem EINEN Eintrag, der sie braucht.
  // DIE UEBERSETZUNG LIEGT BEIM AUFRUFER, wie der Kopf von pinterest-forward.ts es
  // ansagt: Der erste und der dritte Adapter nehmen die aufgeloeste CapiConfig
  // unveraendert, der zweite hat eine EIGENE Form (PinterestConfig) — dieselbe
  // Groesse heisst dort Anzeigenkonto-ID und steht im Endpunkt-PFAD statt im Rumpf.
  // WAS DER COMPILER DABEI SICHERT UND WAS NICHT — der Grund fuer den einzigen Test,
  // der an dieser Zeile haengt: Ein DIREKTES Durchreichen von entry.config bricht den
  // BUILD (adAccountId fehlt). Eine VERTAUSCHUNG der beiden Werte kompiliert dagegen
  // anstandslos, weil beide Felder Zeichenketten sind — und sie stuende das GEHEIMNIS
  // in den Endpunkt-Pfad. Dagegen gibt es nur T10 in fan-out.test.ts.
  pinterest: (entry, event, eventID, body, clientIp, userAgent) =>
    forwardToPinterest(
      { adAccountId: entry.config.pixelId, token: entry.config.token },
      event,
      eventID,
      body,
      clientIp,
      userAgent,
    ),

  // DAS DRITTE ZIEL NIMMT DIE AUFGELOESTE CONFIG UNVERAENDERT — wie das erste und
  // anders als das zweite. Der Grund liegt in den NAMEN: Bei jenem heisst die
  // oeffentliche Groesse Anzeigenkonto-ID und steht im Endpunkt-PFAD, hier ist sie
  // tatsaechlich eine Pixel-Kennung und steht im RUMPF. Eine eigene Form waere hier
  // ein Duplikat ohne Aussage.
  tiktok: (entry, event, eventID, body, clientIp, userAgent) =>
    forwardToTiktok(entry.config, event, eventID, body, clientIp, userAgent),

  // DAS VIERTE ZIEL (Scheibe 11.1f) — UND ES PROJIZIERT AM STAERKSTEN VON ALLEN.
  //
  // ZWEI DINGE SIND HIER ANDERS, und beide sind Entscheidungen mit Grund:
  //  (1) DIE EIGENE FORM (Bauform F1) nimmt das Zugangsdatum UND die Zuordnung —
  //      NICHT die aufgeloeste CapiConfig. Deren pixelId ist fuer dieses Ziel
  //      nachweislich LEER (seit 11.1e, s. den Kommentar an CapiConfig); ein Feld,
  //      das fuer den Empfaenger bedeutungslos und leer ist, gehoert nicht in seine
  //      Signatur. Der Adapter kennt damit weder ResolvedTarget noch CapiConfig.
  //  (2) EIN ARGUMENT WENIGER: userAgent wird NICHT weitergereicht. Die Nutzlast
  //      dieses Anbieters kennt kein Feld dafuer (gemessen); ihn zu verlangen waere
  //      ein selbstgemachter Verlust. TypeScript deckt das — eine Funktion mit
  //      weniger Parametern erfuellt die laengere Signatur.
  //
  // DER SCHLUESSELZUGRIFF rules[event] STEHT AUSDRUECKLICH NICHT HIER, sondern im
  // Adapter: Diese Zeile laeuft SYNCHRON (dispatchForward ist keine async-Funktion),
  // und alles, was hier stuende, laege AUSSERHALB des 204-Containments. Was hier
  // steht, sind reine Eigenschafts-Lesungen und ein Objektliteral — sie koennen
  // nicht werfen.
  // `?? {}` FAENGT KEINEN GEMESSENEN FALL, sondern den TYP: conversionRules ist an
  // ResolvedTarget optional (11.1e uebersetzt "leere Zuordnung" in "Feld nicht
  // gesetzt"). Fuer ein Ziel OHNE Zuordnung entstuende hier sonst undefined — und
  // der Riegel im Adapter faende nichts vor, was er lesen koennte.
  linkedin: (entry, event, eventID, body, clientIp) =>
    forwardToLinkedin(
      { token: entry.config.token, conversionRules: entry.conversionRules ?? {} },
      event,
      eventID,
      body,
      clientIp,
    ),
};

/**
 * WAEHLT DEN EMPFAENGER EINES ZIELS UND REICHT WEITER.
 *
 * DAS ZIEL-VOKABULAR IST DAS DER GEHEIMNIS-TABELLE, NICHT das des Consent-Gates —
 * obwohl beide heute gleich lauten. Der Wert stammt aus derselben Aufloesung, die ihn
 * aus project_secrets.target gelesen hat; ihn gegen das ANDERE Vokabular zu pruefen
 * haengte zwei unabhaengig definierte Literale aneinander, die nur zufaellig gleich
 * sind. Die Gegenrichtung ist an CONSENT_KEY_BY_TARGET (tracking/consent-targets.ts)
 * begruendet — dort wird der Consent-Schluessel je Ziel NACHGESCHLAGEN.
 *
 * DER ERSCHOEPFUNGS-REST IST DER NEIN-ZWEIG DER ZUGEHOERIGKEITS-PRUEFUNG, und er
 * bleibt aus zwei Gruenden ein AUSDRUECKLICHER Zweig: Er haelt die Zusage "ein Ziel
 * ohne Eintrag sendet nichts" sichtbar, und er erspart an der Nachschlag-Stelle eine
 * Typ-Zusicherung — die behauptete genau das, was hasAdapter prueft, ein zweites Mal.
 * ER IST HEUTE AUS DEM HANDLER HERAUS UNERREICHBAR, und das gehoert dazu, damit
 * niemand einen Test dagegen erfindet (GEMESSEN, Scheibe C1, festgehalten in
 * docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, Abschnitt 3.8 "DER
 * WAECHTER UEBER DIE ADAPTER-ACHSE"): Jedes bekannte Ziel steht in der Liste, und
 * ein UNBEKANNTES kommt hier nie an — es faellt schon in allowedTargets heraus, weil
 * weder LEGACY_CONSENT_ROLE noch CONSENT_KEY_BY_TARGET einen Eintrag dafuer tragen.
 * MIT EINEM VIERTEN ZIEL OHNE ADAPTER WIRD ER ERREICHBAR: Dessen Consent-Eintraege
 * erzwingt der Compiler, es passiert also das Gate — und faellt hier heraus.
 *
 * SIE WIRFT NIE — dieselbe Auflage wie beim Adapter selbst, und sie ist strukturell
 * erfuellt: ein Nachschlag in einer totalen Zuordnung und eine Weiterreichung.
 */
function dispatchForward(
  entry: ResolvedTarget,
  event: string,
  eventID: string,
  body: CapiRequestBody,
  clientIp: string | undefined,
  userAgent: string,
): Promise<void> {
  const target = entry.target;
  if (!hasAdapter(target)) return Promise.resolve();
  return FORWARDER_BY_TARGET[target](
    entry,
    event,
    eventID,
    body,
    clientIp,
    userAgent,
  );
}

/**
 * DIE EINWILLIGUNG JE ZIEL (Phase 11, neunte Scheibe, Haelfte A).
 *
 * Nimmt die aufgeloesten Empfaenger und gibt die zurueck, fuer die der Draht eine
 * Erlaubnis traegt. REINE FUNKTION, WIRFT NIE — consentAllows traegt denselben
 * Vertrag, und der Rest sind zwei Nachschlaege in totalen Zuordnungen.
 *
 * WARUM EINE EIGENE, BENANNTE UND EXPORTIERTE FUNKTION statt eines Filters im
 * Fan-Out-Ausdruck: Die Entscheidung muss EINZELN ROT FAERBBAR bleiben. In der
 * `allSettled`-Zeile verschwaende sie neben der Ziel-Adapter-Zuordnung — dieselbe
 * Lektion wie beim Kill-Switch (2a) und beim Confirm-Zweig. Der Export existiert
 * ausschliesslich fuer den Test, und der Grund dafuer ist scharf: ES GIBT HEUTE
 * NUR EINEN ADAPTER. Ueber den Handler ist "Ziel X waere erlaubt gewesen" fuer
 * jedes andere Ziel gar nicht beobachtbar — ein uebersprungenes Ziel ohne Adapter
 * sieht an der Netzwerk-Grenze genauso aus wie ein verbotenes. Die Kreuzprobe
 * (Invariante 6) ist deshalb NUR hier moeglich, nicht am Handler.
 *
 * DIE REGEL, in zwei Zweigen:
 *  - FELD GANZ ABWESEND -> erlaubt ist GENAU das Ziel mit der ALTBESTANDS-ROLLE.
 *    Jedes weitere ist NEU und damit verboten, unabhaengig davon, wie es heisst.
 *  - FELD VORHANDEN -> je Ziel entscheidet der Leser, mit dem Consent-Schluessel
 *    DIESES Ziels.
 *
 * WARUM DIE ROLLE UND NICHT "alle erlaubt" (die Regel bis zur achten Scheibe):
 * Bei EINEM Ziel hiess "abwesend" tatsaechlich "die Seite ist aelter als das
 * Feld". Bei N Zielen heisst es "ueber DIESES Ziel wurde nie gefragt" — und
 * daraus ein Ja zu machen, waere ein Forward an ein Ziel ohne Einwilligung.
 * Die Rolle haelt beide Faelle auseinander, ohne einen Anbieternamen in die Regel
 * zu schreiben; welches Ziel sie traegt, steht in tracking/consent-targets.ts.
 *
 * WARUM DIE ANWESENHEIT HIER GELESEN WIRD UND NICHT IM LESER: consentAllows ist
 * ziel-parametrisiert und bleibt unveraendert (es beantwortet "erlaubt der Draht
 * dieses Ziel?"). Aus seinem Boolean allein ist "abwesend" nicht von "vorhanden
 * mit true" zu unterscheiden — beides ist true. Die Ausnahme braucht genau diese
 * eine zusaetzliche Angabe, und sie ist keine Aussage ueber ein Ziel, sondern
 * ueber den Body.
 */
export function allowedTargets(
  targets: ResolvedTarget[],
  body: CapiRequestBody,
): ResolvedTarget[] {
  // ABWESEND HEISST HIER `undefined`, UND DAS IST KEINE ZUFAELLIGKEIT: JSON kennt
  // kein undefined -> ein Feld, das im Text fehlt, ist hier undefined, und JEDES
  // vorhandene Feld traegt einen JSON-Wert (auch null). Genau an dieser Eigenschaft
  // haengt die Trennung "abwesend" gegen "vorhanden, aber leer" — zwei Bodies, die
  // beim Lesen fast gleich aussehen und entgegengesetzt ausgehen.
  // DIE AUSFUEHRLICHE BEGRUENDUNG STEHT AM LESER (tracking/consent-wire.ts, an
  // consentAllows) und wird hier NICHT wiederholt. Dieser Kommentar sichert nichts
  // — gesichert wird durch die Tests; er erklaert, warum hier auf undefined und
  // nicht auf Falsyness geprueft wird.
  // DER FELDNAME WIRD IMPORTIERT, NIE abgeschrieben: ein zweites Literal braeche
  // das Feld STILL (der Leser faende nichts, das hiesse "abwesend", und abwesend
  // heisst erlaubt — ein stiller Fail-OPEN).
  const wireAbsent =
    (body as Record<string, unknown>)[CONSENT_WIRE_FIELD] === undefined;

  if (wireAbsent) {
    return targets.filter((entry) => LEGACY_CONSENT_ROLE[entry.target]);
  }

  return targets.filter((entry) =>
    consentAllows(body, CONSENT_KEY_BY_TARGET[entry.target]),
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
    // EINE PRUEFUNG JE ZIEL (Phase 11, neunte Scheibe, Haelfte A). Bis hierher stand
    // hier EINE Pruefung fuer die GANZE Menge, mit Metas Schluessel — bei EINEM
    // Empfaenger exakt richtig, bei zweien falsch: Sie gatete jeden weiteren
    // Empfaenger mit METAS Einwilligung. Genau davor warnte der Kommentar, der hier
    // stand, und diese Zeile loest die Warnung ein.
    //
    // DIE REGEL SELBST STEHT IN allowedTargets (oben), NICHT HIER. Der Grund ist der
    // Test: Ohne einen zweiten Adapter ist die Entscheidung fuer jedes andere Ziel
    // am Handler nicht beobachtbar — uebersprungen und verboten sehen an der
    // Netzwerk-Grenze gleich aus. Die zwei Zeilen hier sind die SICHTBARE
    // Verzweigung, die Funktion ist die PRUEFBARE Einheit; beides zusammen ist
    // Invariante 4.
    //
    // DER FRUEHE AUSGANG BLEIBT — er beantwortet nur eine andere Frage als vorher:
    // frueher "verbietet der Draht?", jetzt "bleibt ueberhaupt ein Empfaenger?".
    // Er MUSS vor der IP-/User-Agent-Aufloesung stehen (drei Zeilen tiefer): sonst
    // liefen zwei Header-Lesungen auf Vorrat fuer einen Beacon, der garantiert
    // nichts sendet — auf dem meistgetroffenen Pfad der Plattform.
    // NACH AUSSEN IST ER VON "kein Ziel aufgeloest" NICHT UNTERSCHEIDBAR, und das
    // ist Absicht (204-Containment): beides ist die leere 204. Im Code sind es zwei
    // getrennte, sichtbare Zweige — die Laengen-Wache oben und dieser hier.
    const allowed = allowedTargets(targets, body);
    if (allowed.length === 0) return status(204);

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
      allowed.map((entry) =>
        dispatchForward(entry, event, eventID, body, clientIp, userAgent),
      ),
    );
  }

  return status(204);
}
