import { after } from "next/server";
import {
  getCapiConfigByTrackingKey,
  resolveRefreshedTarget,
  type ResolvedTarget,
} from "@/lib/capi/token";
// DIE KLAMMER AUS SCHRITT 1b-1 WIRD GERUFEN, NICHT ANGEFASST. Sie ist der EINZIGE
// Einstieg in die Erneuerung — genau dafuer ist sie gebaut worden (s. den Kopf von
// lib/oauth/refresh-run.ts: "1b-2 soll GENAU EINEN Einstieg haben"). Dieser Handler
// baut keinen zweiten Weg daneben.
import { runRefresh } from "@/lib/oauth/refresh-run";
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
import { forwardToGoogle } from "@/lib/capi/google-forward";
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
 * REGISTRIERT EINE HINTERGRUND-ARBEIT — UND FAENGT DEN WURF BEI DER REGISTRIERUNG.
 *
 * DER BEFUND, DER SIE NOETIG MACHT (GEMESSEN am Code, CC, 2026-09-01, als
 * Vorrats-Eintrag 35 gemeldet, GEBAUT in Scheibe 1b-2a): Ein try/catch INNERHALB des
 * an after() uebergebenen Callbacks schuetzt den Callback — NICHT die Registrierung.
 * Der Aufruf after(...) selbst stand bis hierher ungeschuetzt, und handleIngest traegt
 * an seinen Aufrufstellen kein umschliessendes try. EIN WURF DORT VERLAESST DEN
 * HANDLER UND BRICHT DAS 204-CONTAINMENT.
 *
 * KEIN TEST HAT ES GEDECKT, UND ZWAR STRUKTURELL: Alle sechs ingest.*.test.ts ersetzen
 * after durch eine Attrappe, die die Callbacks nur einsammelt — DIE KANN GAR NICHT
 * WERFEN. Der Lauf, der es prueft, braucht eine EIGENE, WERFENDE Attrappe; er heisst
 * H9 und steht in ingest.refresh.test.ts.
 *
 * WARUM SIE HIER GEBAUT WIRD UND NICHT IN EINER EIGENEN SCHEIBE: Scheibe 1b-2a haengt
 * eine ZWEITE Registrierung an dieselbe Stelle. Eine Scheibe, die eine bekannte Luecke
 * in genau dem Mechanismus stehen laesst, den sie gerade benutzt, hat den
 * Scope-Schutz gegen die Sache gewendet, die er schuetzen soll.
 *
 * DER catch IST NICHT LEER UND DARF ES NIE WERDEN. Ein still verschluckter Wurf waere
 * schlimmer als der Wurf selbst: Die 204 stuende, die Hintergrund-Arbeit faende nicht
 * statt, und nichts sagte es. Geloggt wird das LABEL (unser eigenes Vokabular) und
 * errorName — nie eine projectId, nie ein Fremdtext.
 */
function scheduleAfter(label: string, cb: () => Promise<void> | void): void {
  try {
    after(cb);
  } catch (err) {
    console.error(
      `[capi/ingest] after registration failed: ${label} ${errorName(err)}`,
    );
  }
}

/**
 * Plant den Analytics-Persist als Hintergrund-Task ein (Scheibe 1, in Scheibe A aus dem
 * Handler extrahiert — UNVERAENDERTE Semantik, jetzt von zwei Aufrufern geteilt).
 *
 * after() laeuft NACH der Response -> die 204-Antwortzeit bleibt unveraendert, und der
 * Callback kann strukturell nichts mehr in den Response-Pfad werfen. persistEvent schluckt
 * seine Fehler ohnehin selbst; der try/catch hier ist die zweite Schicht INNERHALB des
 * Callbacks.
 *
 * RICHTIGGESTELLT MIT SCHEIBE 1b-2a, NICHT GESTEMPELT — HIER STAND, der try/catch sei
 * "die zweite Schicht, falls die Registrierung/der Aufruf selbst wirft". DAS WAR EINE
 * BEHAUPTUNG UEBER EINE DECKUNG, DIE ES NICHT GAB: Das try liegt IM Callback und hat
 * die Registrierung nie geschuetzt. Der Schutz dafuer heisst jetzt scheduleAfter und
 * steht darueber. WER NUR DEN SCHUTZ BAUT UND DEN KOPF STEHENLAESST, hat danach einen
 * richtigen Satz an einer Stelle, an der er vorher falsch war — und keine Spur davon,
 * dass er es je war (docs/immer-beachten.md, "EIN KOMMENTAR IST EINE BEHAUPTUNG,
 * KEINE EIGENSCHAFT").
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
  scheduleAfter("persist", async () => {
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

  // DAS FUENFTE ZIEL (Scheibe 4 der Phase 11.2) — ES PROJIZIERT NOCH STAERKER ALS DAS
  // VIERTE, und beide Abweichungen sind Entscheidungen mit Grund:
  //  (1) DIE EIGENE FORM nimmt BEIDE Kennungsformen. Google ist die Vereinigung von
  //      Meta und LinkedIn: eine Kennung JE PROJEKT (die Google-Ads-Kundennummer, im
  //      pixelId-Slot) UND eine JE EREIGNISTYP (die productDestinationId, in
  //      conversionRules). Die Umbenennung geschieht HIER, am Verbraucher — der Slot
  //      in CapiConfig bleibt unangetastet, wie schon bei Pinterests
  //      adAccountId.
  //  (2) ZWEI ARGUMENTE WENIGER: WEDER clientIp NOCH userAgent werden weitergereicht.
  //      Die gewaehlte Gestalt (Offline Conversion Import auf Basis der
  //      Klick-Kennungen) traegt KEIN Feld fuer eine Besucher-Adresse — kein
  //      landingPageDeviceInfo, kein eventDeviceInfo, kein userData. Beide zu
  //      verlangen waere ein selbstgemachter Verlust an Merkmalen, die dieses Ziel
  //      nicht kennt. TypeScript deckt das: eine Funktion mit weniger Parametern
  //      erfuellt die laengere Signatur.
  //
  // DER TYP Forwarder IST DAFUER NICHT GEAENDERT WORDEN, und das gehoert hierher,
  // damit es niemand fuer eine Auslassung haelt: Er musste es nicht. Dieselbe Lage wie
  // beim vierten Ziel, nur eine Stelle weiter.
  //
  // WAS HIER STEHT, KANN NICHT WERFEN — dieselbe Auflage wie an der linkedin-Zeile:
  // Diese Zeile laeuft SYNCHRON (dispatchForward ist keine async-Funktion), und alles,
  // was hier stuende, laege AUSSERHALB des 204-Containments. Es sind reine
  // Eigenschafts-Lesungen und ein Objektliteral.
  // `?? {}` FAENGT KEINEN GEMESSENEN FALL, SONDERN DEN TYP: conversionRules ist an
  // ResolvedTarget optional (11.1e uebersetzt "leere Zuordnung" in "Feld nicht
  // gesetzt"). Fuer ein Ziel OHNE Zuordnung entstuende hier sonst undefined — und der
  // Riegel im Adapter faende nichts vor, was er lesen koennte.
  google: (entry, event, eventID, body) =>
    forwardToGoogle(
      {
        operatingAccountId: entry.config.pixelId,
        token: entry.config.token,
        conversionRules: entry.conversionRules ?? {},
      },
      event,
      eventID,
      body,
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
 * NACHGEZOGEN 2026-09-01 (Scheibe 4 der Phase 11.2) — DIE ZWEI SAETZE DARUEBER BLEIBEN
 * WOERTLICH, UND IHR "HEUTE" MEINT INZWISCHEN DEN DRITTEN TAG:
 * · Bis Scheibe 11.1a galt "unerreichbar" — jedes bekannte Ziel hatte einen Adapter.
 * · Mit 11.1a und erneut mit Scheibe 3 wurde er ERREICHBAR: 'linkedin' bzw. 'google'
 *   waren bekannte Ziele OHNE Adapter, passierten das Consent-Gate und fielen hier
 *   heraus. Der zweite Satz hat genau das vorhergesagt und ist zweimal eingetreten.
 * · MIT DIESER SCHEIBE IST ER WIEDER UNERREICHBAR: 'google' hat einen Adapter, und
 *   damit steht KEIN bekanntes Ziel mehr ohne einen. Ein UNBEKANNTES kommt hier
 *   weiterhin nie an — es faellt schon in allowedTargets heraus, weil weder
 *   LEGACY_CONSENT_ROLE noch CONSENT_KEY_BY_TARGET einen Eintrag dafuer tragen.
 * DASS DIE AUSSAGE ZWEIMAL GEKIPPT UND ZWEIMAL ZURUECKGEKIPPT IST, IST DER BEFUND UND
 * NICHT DIE FUSSNOTE: Sie beschreibt einen ZUSTAND, keine Eigenschaft. Wer sie als
 * Eigenschaft liest, hat sie zu einem von vier Zeitpunkten gelesen.
 * WER DEN ZWEIG HEUTE BEWACHT, steht in capi/fan-out.test.ts an der Schleife ueber
 * TRACKING_TARGETS und ist mit dieser Scheibe eigens nachgezogen worden.
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
 *
 * GENERISCH SEIT SCHEIBE 1b-2a, UND ZWAR AUS EINEM GRUND, DER GEGEN EINE ZWEITE
 * INSTANZ SPRICHT: Der Handler muss die Einwilligung ab jetzt fuer ZWEI Mengen
 * beantworten — die aufgeloesten Empfaenger UND die rettbaren Ziele. Beide tragen
 * einen target-Namen und sonst nichts Gemeinsames. Ein zweiter, danebengeschriebener
 * Filter waere eine zweite Wahrheit ueber die Einwilligung, also genau das, was der
 * Abschnitt zu den zwei Ziel-Vokabularen weiter oben ausschliesst.
 * DIE SCHRANKE HEISST ResolvedTarget["target"] UND NICHT TrackingTarget, obwohl beide
 * dasselbe bedeuten: Der Kommentar am Kopf dieser Datei haelt fest, dass dieser
 * Handler von lib/settings.ts "jetzt gar nichts mehr" importiert. Ein indizierter
 * Zugriff auf einen ohnehin importierten Typ haelt diese Zusage — ein neuer Typ-Import
 * machte sie falsch, fuer nichts als einen kuerzeren Namen.
 * DIE AUFRUFER MIT ResolvedTarget[] BLEIBEN TYPGLEICH; die bestehenden Laeufe in
 * ingest.consent-targets.test.ts sind davon unberuehrt.
 */
export function allowedTargets<T extends { target: ResolvedTarget["target"] }>(
  targets: T[],
  body: CapiRequestBody,
): T[] {
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

  // --- DIE VORSORGE (Scheibe 1b-2a) — NACH DER ANTWORT, NICHT IM ANFRAGE-WEG ---
  //
  // Ein Ziel in der Lage "lead" traegt DIESEN Beacon noch: sein Zugangsdatum lebt, es
  // liegt nur nahe am Ablauf. Der laufende Beacon wartet deshalb auf NICHTS.
  //
  // WARUM SIE VOR DER FORWARD-WACHE STEHT UND NICHT DAHINTER — das ist der Grund, aus
  // dem sie ueberhaupt wirkt: Sie soll den Inline-Fall STRUKTURELL selten machen, und
  // "trafficstark" heisst BEACONS. Der Volumen-Event ist der PageView, und der ist
  // nicht forwardbar. Hinter isForwardable gestellt traefe die Vorsorge genau die
  // Beacons NICHT, die sie wirksam machen — ein trafficstarkes Projekt mit seltenen
  // Conversions liefe dann stuendlich in die Rettung.
  //
  // KEIN CONSENT-GATE, und der Grund gehoert dazu: Eine Erneuerung sendet die
  // Anmeldedaten des BETREIBERS an den Anbieter — kein Besucher-Merkmal, keine
  // Klick-Kennung, keine Adresse. Die Lebendigkeit eines Betreiber-Zugangsdatums an
  // die Wahl eines einzelnen Besuchers zu haengen waere eine Kopplung ohne Gegenstand.
  // WER SIE DOCH GATEN WILL, tut es mit allowedTargets wie im Rettungs-Zweig unten;
  // die Entscheidung steht hier, damit sie nicht spaeter unbemerkt kippt.
  //
  // DAS FENSTER SCHLIESST DIE ERSTE ERFOLGREICHE ERNEUERUNG, NICHT EINE DROSSELUNG.
  // Sobald die Zeile neu geschrieben ist, liegt der Ablauf wieder eine Stunde weg, die
  // Lage faellt auf "brauchbar" zurueck und dieser Zweig laeuft nicht mehr. GENAU DAS
  // HAENGT AN DER RELATION SCHWELLE <= VORLAUF (s. REFRESH_SIGNAL_LEAD_SECONDS in
  // capi/token.ts): Waere die Schwelle groesser, gaebe es ein Band, in dem die
  // Erneuerung "reichte noch" meldet OHNE zu schreiben — und dann liefe dieser Zweig
  // bei JEDEM Beacon erneut, still und ohne Ende.
  const vorsorge = resolution.renewable.filter((e) => e.lage === "lead");
  if (vorsorge.length > 0) {
    scheduleAfter("refresh-lead", async () => {
      for (const entry of vorsorge) {
        try {
          await runRefresh({
            projectId: resolution.projectId,
            target: entry.target,
          });
        } catch (err) {
          // KEIN LEERER catch. Der Ausgang der Erneuerung ist ein Ergebnis, kein
          // Wurf; wirft es doch, ist das ein Befund und wird benannt. Geloggt wird
          // der NAME des Fehlers, nie ein Wert und nie die projectId.
          console.error(`[capi/ingest] refresh lead error: ${errorName(err)}`);
        }
      }
    });
  }

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
  // DIE WACHE HAT SICH MIT SCHEIBE 1b-2a GEOEFFNET, UND DAS IST DIE INVASIVSTE
  // AENDERUNG DIESER SCHEIBE.
  //
  // WARUM SIE SICH OEFFNEN MUSSTE: Ein Projekt, dessen einziges Ziel gerade tot ist,
  // hat targets.length === 0 — die Zeile erzeugt fail-closed KEIN ResolvedTarget mehr.
  // Mit der alten Wache wuerde der ganze Block uebersprungen, und die Rettung liefe
  // NIE. Sie stuende gebaut da und haette keinen Fall.
  //
  // SIE IST WEITERHIN DIE GEFAEHRLICHSTE STELLE DIESER SCHEIBE, WEIL SIE LAUTLOS
  // FALSCH WIRD — der Satz stand hier schon vor dieser Scheibe und gilt jetzt fuer
  // ZWEI Mengen statt einer: Der Compiler sieht sie nicht, und ein Test, der nur
  // "es wurde nichts gesendet" prueft, ginge in beiden Zustaenden durch. WER DEN
  // rettbar-TERM ENTFERNT, sieht keinen Typfehler und keine Meldung — nur ein Ziel,
  // das nach einer Stunde nichts mehr sendet.
  // WER DAS HEUTE BEWACHT, HEISST H10 in ingest.refresh.test.ts.
  //
  // DIE LAENGEN-PRUEFUNG BLEIBT EINE LAENGEN-PRUEFUNG. Ein leeres Array ist truthy;
  // eine Existenz-Pruefung waere hier immer wahr, und die Wache haette nichts mehr
  // entschieden.
  const targets = resolution.targets;
  const rettbar = resolution.renewable.filter((e) => e.lage === "expired");
  if ((targets.length > 0 || rettbar.length > 0) && isForwardable(event)) {
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
    // DIESELBE ENTSCHEIDUNG, DIESELBE FUNKTION, ZWEITE MENGE. Ein rettbares Ziel ohne
    // Einwilligung wird NICHT gerettet — sonst kostete ein Beacon einen Netzruf an den
    // Anbieter fuer ein Ziel, an das anschliessend garantiert nichts hinausgeht.
    const allowedRettbar = allowedTargets(rettbar, body);
    if (allowed.length === 0 && allowedRettbar.length === 0) return status(204);

    // --- DIE RETTUNG (Scheibe 1b-2a) — IM ANFRAGE-WEG, VOR DEM FAN-OUT ---
    //
    // DER MASSSTAB, DER DIESE ANORDNUNG ENTSCHEIDET: WER WENIG TRAFFIC HAT, BRAUCHT
    // JEDE CONVERSION. Ein Projekt mit EINER Conversion pro Tag hat ein totes
    // Zugangsdatum, wenn sein Beacon eintrifft — UND DIESER BEACON IST DIE CONVERSION.
    // Ihn nach der Antwort zu erneuern hiesse, ihn zu verlieren und beim naechsten Mal
    // bereit zu sein, das aber erst in vierundzwanzig Stunden.
    //
    // SIE LIEGT SERIELL ZUM FAN-OUT, NICHT PARALLEL, und das ist der einzige Punkt, an
    // dem dieser Eingriff die bestehende Anordnung verlaesst: Die Erneuerung muss durch
    // sein, bevor der Adapter das Zugangsdatum bekommt. Der Preis ist der
    // CONCURRENCY-SLOT, nicht die Wartezeit des Besuchers — ein keepalive-Beacon
    // blockiert weder Rendering noch Interaktion.
    //
    // DER DECKEL IST DER DER KLAMMER, UND ES WIRD KEINE ZWEITE KONSTANTE ERFUNDEN:
    // runRefresh versucht bis zu REFRESH_MAX_ATTEMPTS mal, je bis an den Deckel des
    // Erneuerungs-Aufrufs. Der Inline-Fall kostet damit im SCHLECHTESTEN Fall die dort
    // benannten rund 24 Sekunden, und er faellt nur an, wenn wirklich zu retten ist.
    //
    // ---------------------------------------------------------------------------
    // DIE KEHRSEITE, UND SIE GEHOERT AN DEN CODE UND NICHT NUR IN DIE DOKU:
    // DIESE WIEDERHOLUNG IST UNGEDROSSELT.
    //
    // Ein Ziel mit LEBENDER Uhr 2, dessen Erneuerung DAUERHAFT scheitert (ein
    // widerrufener Zugang, eine CHECK-Verletzung beim Schreiben), ist nach den vier
    // Lagen IMMER "erneuerbar". Es gibt keinen Zustand, der das festhielte: Ein Marker
    // verlangte eine Migration, ein Riegel verlangte Nebenlaeufigkeits-Zustand — BEIDES
    // IST SCHEIBE 1b-2b UND HIER AUSDRUECKLICH AUSGESCHLOSSEN.
    // FOLGE: JE BEACON bis zu ein Netzruf an den Anbieter und eine Logzeile MIT
    // projectId — geschrieben in refresh-run.ts und in der Funktion darunter, also
    // AUSSERHALB dieser Scheibe und ausserhalb der Zusage, dass dieser Handler und der
    // Resolver keine projectId je Beacon fuehren.
    // DAS IST DER SCHAERFSTE TRIGGER FUER 1b-2b. Wer jene Scheibe zuschneidet, findet
    // hier den Fall, den sie zu begrenzen hat.
    // ---------------------------------------------------------------------------
    const gerettet: ResolvedTarget[] = [];
    for (const entry of allowedRettbar) {
      try {
        const lauf = await runRefresh({
          projectId: resolution.projectId,
          target: entry.target,
        });
        // JEDER ANDERE AUSGANG WIRD UEBERSPRUNGEN, NICHT GEDEUTET. dead heisst, der
        // Kunde muss neu autorisieren; misconfigured holt einen Betreiber an die
        // Zeile; retry ist nach dem Deckel der Klammer erschoepft. In allen dreien
        // gibt es kein frisches Zugangsdatum, das man nachlesen koennte — eine
        // Nach-Aufloesung waere eine Datenbank-Runde auf Verdacht.
        if (lauf.outcome.kind !== "ok") continue;
        const frisch = await resolveRefreshedTarget(resolution.projectId, entry);
        if (frisch) gerettet.push(frisch);
      } catch (err) {
        // (I-1) — DAS 204-CONTAINMENT GILT AUCH HIER. Die Klammer wirft heute nicht
        // selbst, und die Funktion darunter ist als wurffrei CHARAKTERISIERT — das ist
        // eine Eigenschaft und keine Zusage, und ihr eigener Kommentar sagt, sie werde
        // eine AUFLAGE, sobald ein Aufrufer auf diesem Pfad entsteht. Der ist mit
        // dieser Scheibe entstanden. Bis die Auflage dort steht, traegt dieses try.
        // KEIN LEERER catch: geloggt wird der NAME des Fehlers, nie ein Wert.
        console.error(`[capi/ingest] refresh inline error: ${errorName(err)}`);
      }
    }

    // BLEIBT NACH DER RETTUNG NIEMAND UEBRIG, IST HIER SCHLUSS — vor der IP- und
    // User-Agent-Aufloesung, aus demselben Grund wie beim Ausgang darueber: sonst
    // liefen zwei Header-Lesungen auf Vorrat fuer einen Beacon, der garantiert nichts
    // sendet. NACH AUSSEN IST DIESER AUSGANG VON DEN ANDEREN NICHT UNTERSCHEIDBAR,
    // und das ist Absicht (204-Containment).
    const empfaenger = [...allowed, ...gerettet];
    if (empfaenger.length === 0) return status(204);

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
    // DIE MENGE HEISST SEIT SCHEIBE 1b-2a empfaenger UND NICHT MEHR allowed: Sie
    // traegt die aufgeloesten UND die gerade geretteten Ziele. AN DER ANORDNUNG
    // AENDERT DAS NICHTS — alle starten weiterhin GLEICHZEITIG, jeder traegt seinen
    // eigenen Deckel, und die Gesamtwartezeit ist das MAXIMUM der Einzeldeckel.
    // Die SERIELLE Arbeit liegt VOR dieser Zeile, in der Rettung, und sie ist dort
    // benannt.
    await Promise.allSettled(
      empfaenger.map((entry) =>
        dispatchForward(entry, event, eventID, body, clientIp, userAgent),
      ),
    );
  }

  return status(204);
}
