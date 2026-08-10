import "server-only";
import { errorName } from "@/lib/errors";

/**
 * DER ADAPTER FUER DAS ZWEITE ZIEL (Phase 11, zehnte Scheibe).
 *
 * ER WIRD VON NIEMANDEM GERUFEN. Das ist die tragende Zusage dieser Scheibe und
 * keine Uebergangslage: Die Zuordnung Ziel -> Adapter (dispatchForward in
 * src/lib/capi/ingest.ts) kennt weiterhin GENAU EINEN Empfaenger. Diese Datei ist
 * rein additiv — kein bestehender Pfad ist beruehrt, keine Zuordnung erweitert,
 * keine Oberflaeche angefasst. Das Verdrahten ist die ZWOELFTE Scheibe.
 *
 * WARUM EINE SCHEIBE, DIE NICHTS BEWIRKT, TROTZDEM EINE IST: Sie ist der einzige
 * Teil dieser Vierergruppe, der OHNE ein fremdes System vollstaendig pruefbar ist.
 * Was hier gruen wird, muss im Live-Test der zwoelften nicht mehr in Frage stehen.
 *
 * KEINE ABSTRAKTION, ZUM ZWEITEN MAL: eine Datei, eine Funktion, der Anbieter im
 * Namen. Das Modell wird erst beim DRITTEN Fall ersetzt, nicht beim zweiten. Was
 * zwischen diesem Adapter und src/lib/capi/meta-forward.ts gleich AUSSIEHT, ist
 * unten BENANNT, nicht zusammengefuehrt — und an fuenf Stellen sieht es gleich aus
 * und ist es NICHT:
 *  1. FEHLERWEGE: Meta verzweigt ausschliesslich auf res.ok. Dieser Anbieter meldet
 *     eine abgelehnte Nutzlast mit ERFOLGSSTATUS und dem Fehlschlag im RUMPF. Wer
 *     nur den Status liest, haelt eine Ablehnung fuer einen Erfolg.
 *  2. DER WERT: Meta sendet eine ZAHL, dieser Anbieter erwartet eine ZEICHENKETTE.
 *  3. DAS IDENTITAETS-PAAR: Meta laesst jede Haelfte EINZELN weg. Hier gilt beides
 *     oder keines — und ohne Kennung wird gar nicht gesendet.
 *  4. DER TESTMODUS: Metas Test-Code wandert in die NUTZLAST, dieser hier in den
 *     QUERY-STRING.
 *  5. action_source: Meta kennt "website", dieses Enum kennt nur "web".
 *
 * DIE ANGABEN UEBER DEN ANBIETER SIND ANBIETER-DOKU, NICHT GEMESSEN. Endpunkt,
 * Feldnamen, Enum-Werte, beide Rumpfformen und der Testmodus-Parameter stammen aus
 * der Doku-Lesung vom 2026-08-10; GEMESSEN wurde am 2026-08-07 ausschliesslich der
 * FEHLER-Rumpf bei ungueltigem Geheimnis (Handmessung). DER ERFOLGS-RUMPF IST NIE
 * GEMESSEN WORDEN — und genau er traegt die Auswertung unten. Die Tests dieser
 * Datei messen die Treue dieses Codes zu einer TRANSKRIPTION, nicht zum Vertrag.
 *
 * DER VERTRAG, in drei Saetzen — zwei davon woertlich wie beim ersten Adapter, der
 * erste ABSICHTLICH SCHAERFER:
 * 1. SIE WIRFT NIE, UND DIE ZUSAGE IST STRUKTURELL GEHALTEN, NICHT DURCH
 *    AUGENSCHEIN: VOR dem try steht KEINE ANWEISUNG — nur die Deklaration von
 *    `timer`, die nicht werfen kann, weil sie nichts auswertet. Alles andere,
 *    einschliesslich Riegel, Uebersetzung, Nutzlast- und URL-Bau, liegt INNERHALB.
 *    DER UNTERSCHIED ZUM ERSTEN ADAPTER IST BENANNT UND KEIN VERSEHEN: Dort ist
 *    dieselbe Zusage nur FAKTISCH erfuellt — sie haengt daran, dass der Body aus
 *    JSON.parse stammt und deshalb keine werfenden Getter traegt, also an einer
 *    Eigenschaft des AUFRUFERS. Hier haengt sie an der ANORDNUNG und haelt auch
 *    dann noch, wenn jemand spaeter eine Zeile ergaenzt. Der erste wird NICHT
 *    angefasst; die Angleichung ist Backlog.
 *    WARUM DAS ZAEHLT: Ein Wurf verliesse diese Funktion, liefe durch das await
 *    des Aufrufers und aus dem Handler heraus — statt der garantierten leeren 204
 *    entstuende ein 500, und der leakt den Gueltigkeitszustand des trackingKeys an
 *    einen anonymen Aufrufer.
 * 2. SIE WIRD IM REQUEST ERWARTET. Sobald ein Aufrufer existiert (zwoelfte
 *    Scheibe), steht die Antwort DAHINTER. Die Abloesung von der Antwort ist eine
 *    EIGENE, spaetere Aenderung.
 * 3. SIE GIBT NICHTS ZURUECK. Geloggt wird hier, nicht beim Aufrufer. Ob der
 *    AUSGANG eines Forwards je eine sichtbare GROESSE wird, ist eine eigene Frage
 *    und wird hier nicht vorentschieden.
 */

/**
 * Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "".
 *
 * DRITTE KOPIE. Die anderen beiden stehen in src/lib/capi/ingest.ts (Pflichtfeld-
 * Pruefung, Confirm-Marker, IP-Aufloesung) und src/lib/capi/meta-forward.ts
 * (optionale Nutzlast-Felder). KEIN TEST SICHERT DIE GLEICHHEIT DER DREI.
 *
 * DAS PROTOKOLL DER VIERTEN SCHEIBE HAT GENAU DIESEN MOMENT VORHERGESAGT: "Die
 * dritte Kopie kommt mit dem zweiten Ziel — und DANN wird die neutrale Datei
 * richtig, weil aus zwei Faellen drei werden und die Abstraktionsregel des
 * Projekts sie deckt." DIE ERWARTUNG IST DAMIT FAELLIG GEWORDEN UND NICHT
 * EINGELOEST — aufgeschoben aus SCOPE-Gruenden, nicht vergessen: Eine neutrale
 * Datei muesste die beiden bestehenden Fundstellen umstellen, und beide Dateien
 * sind in dieser Scheibe unantastbar. BACKLOG, hier ausdruecklich benannt.
 */
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

// Striktes Timeout (A-Regel "defensive Timeouts"). Eigener Wert, bewusst
// MODUL-PRIVAT wie beim ersten Adapter — mit demselben bekannten Preis: Es gibt
// jetzt ZWEI unabhaengige Zahlen fuer dieselbe Frage, und KEIN Test kann ihre
// Divergenz bemerken, weil keine Stelle sie nebeneinander sieht. Das ist der
// bereits gefuehrte Backlog-Kandidat, nicht ein neuer.
const PINTEREST_FORWARD_TIMEOUT_MS = 3_000;

// Kappung fuer Fremdtext im Log. Zweite unabhaengige Zahl derselben Klasse wie der
// Deckel darueber — s. dort.
const PINTEREST_LOG_MAX = 200;

/**
 * DIE UNTERGRENZE DER SCHWAERZUNG. Zusammenhaengende token-artige Zeichenfolgen ab
 * dieser Laenge werden ersetzt.
 *
 * ZWANZIG, und der Wert ist eine Abwaegung, keine Messung: Woerter einer
 * Fehlermeldung liegen darunter, Zugangsdaten darueber. Eine UUID (36 Zeichen)
 * faellt darunter — gewollt, denn eine zurueckgespiegelte Ereignis-Kennung gehoert
 * ebenso wenig ins Log wie ein Token.
 */
const PINTEREST_OPAQUE_MIN = 20;

/**
 * DER BEREINIGER FUER FREIEN ANBIETER-TEXT.
 *
 * SEINE AUFGABE IST NICHT "FINDE DEN TOKEN", SONDERN: KEINE LANGE UNDURCHSICHTIGE
 * ZEICHENFOLGE VERLAESST DIESE FUNKTION. Das ist eine Regel ueber die AUSGABE, nicht
 * ueber das Wissen — und genau darin liegt ihr Wert: Sie faengt auch
 * TEIL-Rueckspiegelungen und Geheimnisse, die wir gar nicht als solche kennen.
 * Ein Bereiniger, der das Geheimnis kennen MUESSTE, um es zu entfernen, waere
 * selbst eine Stelle, an der es verlorengehen kann.
 *
 * WARUM ES IHN UEBERHAUPT GIBT — der Anlass ist gemessen, nicht befuerchtet: Der
 * erste Adapter loggt Metas message-Feld mit dem Kommentar, es sei kein Geheimnis.
 * Die HANDMESSUNG VOM 2026-08-07 widerlegt das: Die Fehlerantwort auf ein defektes
 * Token spiegelt den uebergebenen Token zurueck. Eine Kappung hilft dagegen nicht —
 * sie begrenzt die LAENGE, nicht den INHALT, und schneidet vom ANFANG her, wo der
 * Token steht.
 *
 * DIE GRENZE GEHOERT IN DENSELBEN KOMMENTAR: EIN KURZES GEHEIMNIS GINGE DURCH. Wir
 * haben heute keines — bekaemen wir eines, ist diese Regel neu zu entscheiden.
 *
 * REIHENFOLGE IST NICHT BELIEBIG: erst SCHWAERZEN, dann KAPPEN. Umgekehrt koennte
 * die Kappung eine lange Folge auf eine kuerzere zurechtschneiden, die der
 * Schwaerzung danach entkaeme.
 *
 * WIRFT NIE: replace und slice auf einem String, sonst nichts.
 */
function sanitizeProviderText(v: unknown): string {
  if (typeof v !== "string") return "-";
  const trimmed = v.trim();
  if (!trimmed) return "-";
  const redacted = trimmed.replace(
    new RegExp(`[A-Za-z0-9_-]{${PINTEREST_OPAQUE_MIN},}`, "g"),
    "<redacted>"
  );
  return redacted.slice(0, PINTEREST_LOG_MAX);
}

/**
 * DIE UEBERSETZUNGSTABELLE — sie liegt IM ADAPTER, nicht zentral.
 *
 * Jedes Ziel bringt sein eigenes Vokabular mit. Der erste Adapter braucht keine:
 * bei der Graph-CAPI ist ein "Custom Event" schlicht ein freier event_name. Dieser
 * Anbieter fuehrt ein ENUM mit Registrierungspflicht und einem Deckel je Konto —
 * die Abbildung gehoert deshalb an SEINE Naht, sonst entstuende sie im geteilten
 * Pfad und betraefe Meta mit.
 *
 * EINE Map UND KEIN OBJEKTLITERAL, und das ist eine Sicherheitsentscheidung, keine
 * Stilfrage: Der Name kommt aus dem Beacon und ist damit UNTRUSTED — /api/e ist ein
 * anonymer Endpunkt. Ein Nachschlagen per TABELLE[name] auf einem gewoehnlichen
 * Objektliteral liefert fuer "constructor", "toString" oder "valueOf" einen
 * wahrheitsfaehigen Wert aus Object.prototype; ein solcher Name gaelte als
 * abgebildet und ginge als Funktionsobjekt weiter. Eine Map hat keinen Prototyp-
 * Durchgriff.
 *
 * DIE ZUORDNUNGEN STAMMEN AUS DER ZWECKSPALTE DER ANBIETER-DOKU (2026-08-10), nicht
 * aus Namensaehnlichkeit — bei sechs Paaren decken sich die Namen ohnehin, bei
 * ZWEIEN nicht:
 *  - Purchase -> checkout: die Zweckspalte sagt "Transaktionen ABSCHLIESSEN" und
 *    grenzt es gegen initiate_checkout ab ("BEGONNEN, nicht abgeschlossen"). Ohne
 *    diese Spalte war es eine Aehnlichkeit, und eine falsche Abbildung waere hier
 *    die teuerste gewesen: als Erfolg zurueck, unter falscher Bedeutung.
 *  - CompleteRegistration -> signup: "Menschen, die sich fuer ein Produkt oder
 *    einen Dienst REGISTRIEREN".
 */
const EVENT_MAP: ReadonlyMap<string, string> = new Map([
  ["Purchase", "checkout"],
  ["Lead", "lead"],
  ["InitiateCheckout", "initiate_checkout"],
  ["AddToCart", "add_to_cart"],
  ["ViewContent", "view_content"],
  ["CompleteRegistration", "signup"],
  ["Contact", "contact"],
  ["Subscribe", "subscribe"],
]);

/**
 * Abbildbarer Name -> Enum-Wert; jeder andere UNVERAENDERT.
 *
 * DAS DURCHREICHEN IST EINE ENTSCHEIDUNG, KEIN RESTPOSTEN. Die beiden Alternativen
 * sind verworfen, und die Begruendung gehoert hierher, weil sie sonst beim naechsten
 * Umbau neu verhandelt wird:
 *  - EIN SAMMELNAME waere der einzige STILLE Ausgang: Er kaeme als Erfolg zurueck,
 *    waehrend das Ereignis unter falscher Bedeutung im Konto des Betreibers landet.
 *    Niemand — weder er, noch der Anbieter, noch unser Log — saehe etwas.
 *  - NICHT ZU SENDEN naehme dem Betreiber den Weg, eigene Namen im Anbieter-Konto
 *    zu registrieren. Das ist eine Entscheidung ueber SEIN Konto, nicht unsere.
 *
 * DAS GILT AUCH FUER EINEN NAMEN, DER DIE ZEICHEN-REGEL DES ANBIETERS VERLETZT
 * (erlaubt sind nur Buchstaben, Ziffern, Unterstrich und Bindestrich, hoechstens
 * 100 Zeichen). Der Betreiber kann heute jeden nicht-leeren Text verdrahten — die
 * einzige Pruefung im Panel ist Nicht-Leerheit. Ein solcher Name wird abgelehnt,
 * ABER LAUT: mit status "failed" und einer Meldung im Rumpf, die dieser Adapter
 * liest und protokolliert. Ihn hier auszusortieren waere der stille Ausgang; ihn
 * umzuschreiben erzeugte einen Namen, den der Betreiber nie registriert hat und in
 * seinem Konto nicht wiederfindet.
 *
 * WAS NICHT GEMESSEN IST und deshalb hier steht: Ob ein nicht registrierter EIGENER
 * Name laut abgewiesen oder still nicht ausgewertet wird, sagt die Doku fuer den
 * Beispielfall (laut, mit Fehlermeldung). Eine Messung an unserem Konto gibt es
 * nicht.
 */
function pinterestEventName(event: string): string {
  return EVENT_MAP.get(event) ?? event;
}

/**
 * Das UNTRUSTED Client-Blob, SOWEIT die Pinterest-Nutzlast es liest.
 *
 * BEWUSST EIGEN und NICHT MetaForwardBody: Jener fuehrt _fbp (Metas Cookie) und
 * traegt den Wert als Zahl. Hier wird _fbp nie gelesen, und der Wert reist als
 * Zeichenkette.
 */
type PinterestForwardBody = {
  value?: unknown;
  currency?: unknown;
  eventSourceUrl?: unknown;
};

/**
 * Die Zugangsdaten EINES Projekts fuer dieses Ziel.
 *
 * EIGENE FORM UND NICHT CapiConfig, obwohl die Felder passen: Jener Typ nennt seine
 * Felder in den Kommentaren "Meta-Pixel-ID" und "Meta-CAPI-Token". Die Struktur
 * waere wiederverwendbar, die NAMEN waeren falsch — und dieselbe Groesse heisst bei
 * diesem Anbieter Anzeigenkonto-ID und steht im Endpunkt-PFAD, nicht in einem
 * Browser-Tag.
 * DER AUFRUFER (zwoelfte Scheibe) bildet sie aus der Aufloesung ab.
 */
export type PinterestConfig = {
  /** Die Konto-Kennung (ad_account_id). OEFFENTLICH, steht im Endpunkt-Pfad. */
  adAccountId: string;
  /** Das GEHEIMNIS. Reist als Bearer im Authorization-Header, NIE in der URL. */
  token: string;
};

/** Das Urteil ueber EIN Ereignis. Drei Ausgaenge, nicht zwei. */
type PinterestOutcome = "processed" | "warning" | "failed";

/**
 * Liest den Rumpf GENAU EINMAL und gibt Rohtext plus geparstes JSON zurueck.
 *
 * KEIN res.clone(): Der erste Adapter klont, weil er erst json() versucht und im
 * Fehlerfall text() nachholt. Hier wird stattdessen EINMAL text() gelesen und
 * danach JSON.parse versucht — dieselbe Wirkung ohne zweiten Verbrauch des Streams.
 *
 * WIRFT NIE: beide Schritte sind einzeln umschlossen. Eine unlesbare Antwort ist
 * selbst ein Diagnose-Ergebnis, kein Grund fuer einen Fehlerpfad.
 */
async function readBody(
  res: Response
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

/** Metas Envelope-Gegenstueck: der Fehler-Rumpf bei echtem Fehlerstatus. */
type PinterestErrorBody = {
  code?: unknown;
  message?: unknown;
  status?: unknown;
};

/** Der Erfolgs-Rumpf. NIE GEMESSEN — die Form stammt aus der Anbieter-Doku. */
type PinterestSuccessBody = {
  num_events_received?: unknown;
  num_events_processed?: unknown;
  events?: unknown;
};

/**
 * Uebersetzt eine Antwort mit ECHTEM FEHLERSTATUS in EINE Logzeile.
 *
 * SECRETS-DISZIPLIN: geloggt werden die STRUKTURIERTEN Felder unveraendert (code,
 * status — Zahlen bzw. Enum) und der FREIE TEXT (message) NUR BEREINIGT. Es fliesst
 * NICHTS aus dem Request hinein: nicht der Token, nicht die Nutzlast, nicht die URL.
 *
 * DER NICHT-JSON-FALL GIBT DEN ROHEN RUMPF NICHT HERAUS — nur einen Marker, den
 * Status und die LAENGE. Der erste Adapter schreibt dort text.slice(0, 200), also
 * alles was zurueckkam; das ist die BREITERE der beiden Oeffnungen und wandert
 * ausdruecklich NICHT mit. Ein Bereiniger, der auf ein FELD ausgelegt ist, liefe
 * hier ueber ein ganzes Dokument.
 */
function describeErrorBody(
  res: Response,
  raw: string | null,
  parsed: unknown
): string {
  if (raw === null) return `[capi] Pinterest forward rejected: body unreadable`;
  if (parsed === undefined) {
    return (
      `[capi] Pinterest forward rejected: HTTP ${res.status}` +
      ` non-JSON body, len=${raw.length}`
    );
  }
  const err = (parsed ?? {}) as PinterestErrorBody;
  return (
    `[capi] Pinterest forward rejected: HTTP ${res.status}` +
    ` code=${sanitizeProviderText(err.code === undefined ? undefined : String(err.code))}` +
    ` status=${sanitizeProviderText(err.status === undefined ? undefined : String(err.status))}` +
    ` msg=${sanitizeProviderText(err.message)}`
  );
}

/**
 * Wertet einen Rumpf mit ERFOLGSSTATUS aus — DER TRAGENDE TEIL DIESES ADAPTERS.
 *
 * DER ANBIETER MELDET EINE ABGELEHNTE NUTZLAST MIT HTTP-ERFOLG. Wer nur den Status
 * liest, liesse ein abgewiesenes Ereignis ALS ERFOLG durchgehen — das ist die
 * Fehlerklasse, gegen die diese Scheibe gebaut ist, und der erste Adapter ist
 * dagegen blind (er verzweigt ausschliesslich auf res.ok, die Fehlerdeutung laeuft
 * nur INNERHALB dieses Zweigs).
 *
 * BEIDE ANGABEN MUESSEN DEN ERFOLG BESTAETIGEN — Zaehlwerte UND Status. Jeder
 * Widerspruch ist ein Fehlschlag, und jede fehlende Erfolgs-Angabe ebenso: leer,
 * abgeschnitten, kein JSON, kein Array, leeres Array. Das ist die strengste der
 * denkbaren Lesarten und bewusst gewaehlt — was nicht eindeutig Erfolg meldet, ist
 * keiner, und der Preis eines Fehlalarms ist genau eine Logzeile, weil diese
 * Funktion nichts zurueckgibt.
 *
 * MEHR ALS EIN EINTRAG IM ARRAY IST EBENFALLS FEHLSCHLAG. Wir senden GENAU EINES;
 * kommen mehrere zurueck, hat der Anbieter seinen eigenen Vertrag gebrochen. Den
 * ersten zu lesen unterstellte eine Reihenfolge, die niemand zugesagt hat.
 *
 * DIE WARNUNG IST DER DRITTE AUSGANG, und sie ist weder Fehler noch stiller Erfolg:
 * Ein Ereignis kann "processed" sein UND eine warning_message tragen. Sie zu
 * verwerfen hiesse, eine Rueckmeldung wegzuwerfen, die der Anbieter eigens sendet;
 * sie als Fehler zu behandeln waere falsch, denn das Ereignis IST verarbeitet.
 * SIE IST FREIER TEXT und geht deshalb durch DENSELBEN Bereiniger wie jede andere
 * Anbieter-Meldung.
 */
function evaluateSuccessBody(
  res: Response,
  raw: string | null,
  parsed: unknown
): { outcome: PinterestOutcome; line: string | null } {
  if (raw === null) {
    return {
      outcome: "failed",
      line: `[capi] Pinterest forward rejected: body unreadable`,
    };
  }
  if (parsed === undefined) {
    return {
      outcome: "failed",
      line:
        `[capi] Pinterest forward rejected: HTTP ${res.status}` +
        ` non-JSON body, len=${raw.length}`,
    };
  }

  const body = (parsed ?? {}) as PinterestSuccessBody;
  const received = body.num_events_received;
  const processed = body.num_events_processed;
  const events = body.events;

  // Die Zaehlwerte muessen BEIDE Zahlen sein und den einen gesendeten Vorgang
  // bestaetigen. Ein fehlender Zaehler ist keine Erfolgs-Angabe.
  const countsOk =
    typeof received === "number" &&
    typeof processed === "number" &&
    received === 1 &&
    processed === 1;

  // Genau EIN Eintrag. Null und mehr als einer sind beide Fehlschlag.
  const entry =
    Array.isArray(events) && events.length === 1
      ? (events[0] as { status?: unknown; error_message?: unknown; warning_message?: unknown } | null)
      : null;
  const statusOk =
    !!entry && typeof entry === "object" && entry.status === "processed";

  if (!countsOk || !statusOk) {
    const detail = entry && typeof entry === "object" ? entry : null;
    return {
      outcome: "failed",
      line:
        `[capi] Pinterest forward rejected: HTTP ${res.status}` +
        ` received=${typeof received === "number" ? received : "-"}` +
        ` processed=${typeof processed === "number" ? processed : "-"}` +
        ` entries=${Array.isArray(events) ? events.length : "-"}` +
        ` status=${detail && typeof detail.status === "string" ? detail.status : "-"}` +
        ` msg=${sanitizeProviderText(detail?.error_message)}`,
    };
  }

  const warning = sanitizeProviderText(entry?.warning_message);
  if (warning !== "-") {
    return {
      outcome: "warning",
      line: `[capi] Pinterest forward warning: ${warning}`,
    };
  }
  return { outcome: "processed", line: null };
}

/**
 * DER TESTMODUS, gelesen bei JEDEM Aufruf statt beim Laden des Moduls.
 *
 * ZWEI GRUENDE, und der erste ist der tragende: DIE KOPPLUNG AN METAS
 * UMGEBUNGSVARIABLE DARF NICHT ENTSTEHEN. Der Dev-Dummy fuer die IP im Ingest-Pfad
 * haengt an META_TEST_EVENT_CODE — ein Pinterest-Aufruf bekaeme dort eine IP nur,
 * wenn METAS Test-Code gesetzt ist. Diese Datei liest jene Variable NIRGENDS.
 * Der zweite Grund ist praktisch: Eine beim Laden gelesene Konstante liesse sich nur
 * ueber einen Modul-Mock testen, und der haette eine zweite Datei gebraucht.
 *
 * STANDARDMAESSIG AUS: unset oder leer -> kein Query-Parameter, kein Testmodus.
 * Die Anbieter-Doku warnt ausdruecklich davor, ihn vor echten Aufrufen nicht zu
 * entfernen.
 */
function testModeQuery(): string {
  return process.env.PINTEREST_TEST_MODE?.trim() ? "?test=true" : "";
}

/**
 * Baut die Pinterest-Nutzlast und stellt sie zu.
 *
 * clientIp/userAgent kommen FERTIG vom Aufrufer — die Ermittlung liest Request-
 * Header, und diese Datei soll kein HTTP kennen, sondern das Vokabular des
 * Anbieters.
 */
export async function forwardToPinterest(
  config: PinterestConfig,
  event: string,
  eventID: string,
  body: PinterestForwardBody,
  clientIp: string | undefined,
  userAgent: string
): Promise<void> {
  // DIE EINZIGE ANWEISUNG VOR DEM try, UND SIE IST EINE REINE DEKLARATION: sie
  // wertet nichts aus und kann nicht werfen. Sie steht hier, damit finally sie
  // sieht. Alles andere liegt INNERHALB — s. Vertragssatz 1.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // --- DAS IDENTITAETS-PAAR: BEIDE ODER KEINER ---
    //
    // EINE Bedingung mit ZWEI Termen, nicht zwei unabhaengige if. Der erste Adapter
    // laesst jede Haelfte einzeln weg; dieses Muster ist hier ausdruecklich NICHT
    // abgeschrieben. Der Anbieter verlangt user_data als PFLICHT-Objekt mit
    // mindestens einer Kennung — em, hashed_maids ODER dem Paar. Wir haben weder
    // em noch hashed_maids, also traegt das Paar allein.
    //
    // BLEIBT KEINE KENNUNG UEBRIG, WIRD GAR NICHT GESENDET: ein Aufruf ohne jede
    // Identitaet kann beim Anbieter nichts bewirken und kostet auf dem
    // meistgetroffenen Pfad der Plattform. Der Riegel ist damit nicht nur eine
    // Sparmassnahme, sondern das, was uns regelkonform haelt — ohne ihn entstuende
    // ein LEERES Pflicht-Objekt.
    //
    // DER FALL IST REAL, NICHT THEORETISCH: In Produktion liefert die IP-Aufloesung
    // undefined, sobald die vertraute IP loopback oder leer ist.
    if (!clientIp || !userAgent) return;

    // --- Server-gesetztes Feld (NIE aus Client-Payload) ---
    // Zeiteinheit SEKUNDEN, ganzzahlig — hier zufaellig dieselbe wie beim ersten
    // Adapter. Es ist die einzige Stelle, an der ein Abschreiben richtig waere.
    const eventTime = Math.floor(Date.now() / 1000);

    const userData: Record<string, unknown> = {
      // Roh, NICHT gehasht — so verlangt es die Doku.
      client_ip_address: clientIp,
      client_user_agent: userAgent,
    };

    const serverEvent: Record<string, unknown> = {
      event_name: pinterestEventName(event),
      // "web", NICHT "website". Metas Wert existiert in diesem Enum nicht; es kennt
      // app_android, app_ios, web und offline. Eine der fuenf Kopier-Fallen.
      action_source: "web",
      event_time: eventTime,
      event_id: eventID,
      // "direct" fuer die direkte Anbindung. Optional; der Preis des Sendens ist
      // ein Feld, der Preis des Weglassens ist unbekannt.
      partner_name: "direct",
      user_data: userData,
    };

    const eventSourceUrl = asString(body.eventSourceUrl);
    if (eventSourceUrl) serverEvent.event_source_url = eventSourceUrl;

    // --- custom_data: DER WERT REIST ALS ZEICHENKETTE ---
    //
    // Der erste Adapter sendet eine ZAHL. Wer sein Muster abschreibt, sendet den
    // falschen Typ — und erbt dazu seinen Rand: typeof v === "number" laesst NaN
    // und Infinity DURCH, denn beide sind vom Typ number. Hier wird deshalb auf
    // ENDLICHKEIT geprueft.
    // KEINE RUNDUNG auf zwei Stellen: Bei Nicht-Waehrungswerten waere sie falsch.
    // GEMELDET, NICHT GEBAUT: Ein NEGATIVER Wert geht durch. Die Doku raet davon
    // ab, verbietet es aber nicht.
    const customData: Record<string, unknown> = {};
    if (typeof body.value === "number" && Number.isFinite(body.value)) {
      customData.value = String(body.value);
    }
    const currency = asString(body.currency);
    if (currency) customData.currency = currency;
    if (Object.keys(customData).length > 0) serverEvent.custom_data = customData;

    // Ein Objekt mit dem Schluessel "data", darin ein ARRAY. Wir senden genau eines.
    const payload = { data: [serverEvent] };

    // --- DIE URL: DIE KENNUNG STEHT IM PFAD ---
    //
    // KODIERT BEIM EINSETZEN, und das ist strukturell und billig: Der Betreiber
    // kann heute jeden Text als Kennung eintragen — das Feld traegt keine Pruefung
    // und keinen Fehlerkanal. Ein Wert mit "/", "?" oder "#" veraenderte sonst Pfad
    // und Query der aufgerufenen URL.
    // SIE PRUEFT NICHTS, UND DAS IST RICHTIG SO: Eine Formatpruefung machte die
    // ungepruefte Stellenzahl aus dem Anbieter-Konto zur Bedingung.
    // MELDEN, NICHT BAUEN: Der erste Adapter hat dieselbe Stelle OHNE Kodierung.
    // Backlog — er ist in dieser Scheibe unantastbar.
    //
    // DIE URL IST BEI DIESEM ANBIETER NICHT GEHEIM (das Geheimnis reist im Header),
    // sie wird hier trotzdem NICHT geloggt: Der HTTP-Status traegt die Diagnose,
    // die Kennung des Betreibers fuegt nichts hinzu.
    const url =
      `https://api.pinterest.com/v5/ad_accounts/` +
      `${encodeURIComponent(config.adAccountId)}/events${testModeQuery()}`;

    const controller = new AbortController();
    timer = setTimeout(() => controller.abort(), PINTEREST_FORWARD_TIMEOUT_MS);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        // DAS GEHEIMNIS REIST IM HEADER, NICHT IM QUERY-STRING. Deshalb ist die URL
        // hier nicht geheim — die Log-Disziplin bleibt trotzdem, ihr GRUND
        // verschiebt sich nur: sie ist jetzt durch die Nutzlast und den Fremdtext
        // begruendet, nicht mehr durch die Adresse.
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // --- BEIDE FEHLERWEGE ---
    //
    // ERST AM STATUSCODE TRENNEN, DANN DEN RUMPF LESEN. Die beiden Rumpfformen sind
    // VERSCHIEDEN — ein Parser fuer nur eine von beiden findet nichts und meldet
    // nichts.
    const { raw, parsed } = await readBody(res);
    if (!res.ok) {
      console.error(describeErrorBody(res, raw, parsed));
      return;
    }
    const { line } = evaluateSuccessBody(res, raw, parsed);
    if (line) console.error(line);
  } catch (err) {
    // Nur der Fehler-NAME. errorName liest ausschliesslich .name — nie die Message,
    // die Client-Input oder Fremdtext tragen kann. Ein Abort landet als DOMException
    // hier und wird dadurch als "AbortError" statt "unknown" sichtbar.
    console.error(`[capi] Pinterest forward error: ${errorName(err)}`);
  } finally {
    clearTimeout(timer);
  }
}
