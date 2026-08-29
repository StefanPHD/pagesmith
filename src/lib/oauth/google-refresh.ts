import "server-only";
import { GOOGLE_TOKEN_ENDPOINT } from "@/lib/oauth/google-token";
import type {
  OAuthPayload,
  RefreshTokenExpiry,
} from "@/lib/secrets/oauth-payload";

// ===========================================================================
// DIE ERNEUERUNG DES ZUGANGSDATUMS BEI GOOGLE — DER ANBIETER-ZWEIG
// (Phase 11.2, Scheibe 1a des Schnitts).
//
// WAS DIESE DATEI IST: Sie baut die Erneuerungs-Anfrage, fuehrt sie aus und DEUTET
// die Antwort. Keine Datenbank, keine Chiffrierung, keine Sitzung, kein Next.js,
// kein Eigentums-Gate. Der anbieter-neutrale Rahmen daneben (oauth/token-refresh.ts)
// verkettet sie nur.
//
// WARUM SIE NICHT IN google-token.ts LIEGT — ZWEI GRUENDE:
//   (1) Jene Datei ist die RUECKKEHR (der Code-Tausch). Diese ist die ERNEUERUNG.
//       Zwei Fluesse, zwei Gegenstaende, zwei Scheiben.
//   (2) Ihr Deuter kann NICHT wiederverwendet werden, und das ist kein Geschmack:
//       toOAuthPayload gibt {kind:"no_refresh_token"} zurueck, sobald refresh_token
//       fehlt oder leer ist. Die Erneuerungs-Antwort traegt dort NICHTS Neues
//       (s. den Absatz "DIE MEHRDEUTIGKEIT" unten) — jener Deuter meldete also einen
//       Fehler, wo Erfolg vorliegt.
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts:
// ae/oe/ue/ss. Grund ist die Werkzeug-Regel in docs/immer-beachten.md.
//
// ---------------------------------------------------------------------------
// HERKUNFT JEDES ANBIETER-WERTS IN DIESER DATEI. Jede Angabe traegt sie einzeln;
// hier steht nur, welche zwei Klassen vorkommen:
//   GEMESSEN 2026-08-28 (OWNER), MESSUNG C, live gegen den Token-Endpunkt —
//   docs/ziel-befunde.md, Google-Abschnitt, Teile (bv) bis (bz).
//   GELESEN 2026-08-27 — ebenda, Teile (ay) bis (bg).
// KEIN Wert stammt aus dem Gedaechtnis.
//
// ---------------------------------------------------------------------------
// DIE MEHRDEUTIGKEIT, DIE DEN DEUTER UNTEN FORMT — SIE IST GEMELDET UND NICHT
// AUFGELOEST: Teil (bv) sagt, die Antwort trage "kein neues Erneuerungs-Token an
// die Stelle des alten". Dieser Satz trennt ZWEI Zustaende NICHT:
//   (a) das Feld refresh_token fehlt in der Erneuerungs-Antwort ganz, oder
//   (b) es ist vorhanden und traegt denselben Wert.
// DER DEUTER UNTEN IST UNTER BEIDEN AUSLEGUNGEN RICHTIG: ein vorhandener,
// nicht-leerer Wert wird uebernommen, sonst bleibt der ABGELEGTE stehen. Er waere
// ausserdem noch richtig, wenn der Anbieter spaeter doch rotierte.
// WER DAS ZU EINEM "der Anbieter schickt kein refresh_token" VEREINFACHT, baut eine
// Annahme ein, die die Messung nicht hergibt.
// ===========================================================================

/**
 * Der grant_type der Erneuerung.
 *
 * GELESEN 2026-08-27 (docs/ziel-befunde.md, Teil (ay)): Dieselbe Seite zeigt die
 * Erneuerung als Beispiel-Rumpf `client_id=...&refresh_token=...&
 * grant_type=refresh_token` gegen `POST /token`, Content-Type
 * application/x-www-form-urlencoded.
 */
const GRANT_TYPE_REFRESH_TOKEN = "refresh_token";

/**
 * Der Fehlercode, der einen Zugang als TOT ausweist.
 *
 * ACHTUNG — DIESER WERT IST EINE ERWARTUNG UND KEINE MESSUNG, und der Satz gehoert
 * an den Wert und nicht in eine Fussnote (docs/ziel-befunde.md, Teil (bz)):
 * "DER FEHLERCODE FUER EIN TOTES ERNEUERUNGS-TOKEN IST UNGEMESSEN." Es ist kein
 * Aufruf mit einem abgelaufenen, widerrufenen oder gefaelschten Erneuerungs-Token
 * gefahren worden. Teil (bd) haelt invalid_grant GELESEN fest — aber fuer den
 * CODE-TAUSCH, nicht fuer die ERNEUERUNG.
 *
 * DIE VORKEHRUNG DAGEGEN IST DER RAHMEN, NICHT DIESE ZEILE: Ein Anbieter-Code, der
 * hier NICHT passt, landet in retry und nicht in dead (s. den Kopf von
 * oauth/token-refresh.ts).
 */
const INVALID_GRANT = "invalid_grant";

/**
 * Das Timeout der Erneuerung. ACHT SEKUNDEN.
 *
 * EIGENE KONSTANTE, OBWOHL SIE HEUTE DEN WERT VON TOKEN_EXCHANGE_TIMEOUT_MS TEILT —
 * und das ist der Zweck: Scheibe 1b baut den automatischen Ausloeser. Erst dort
 * entsteht die Frage, ob dieser Ruf sich mit dem Verkehr multipliziert; sie ist an
 * einer eigenen Konstante zu beantworten und nicht durch Mitziehen einer fremden.
 *
 * WARUM ACHT UND NICHT DIE 3 000 ms AUS capi/meta-forward.ts: Der Preis der kurzen
 * Deckelung liegt laut Manifest in der BELEGUNG VON CONCURRENCY-SLOTS auf dem
 * meistgetroffenen Pfad, multipliziert ueber ALLE Kunden. Diesen Ruf loest heute ein
 * Betreiber von Hand aus; die Multiplikation gibt es hier nicht.
 *
 * EIN DECKEL BLEIBT PFLICHT (CLAUDE.md, Block A, "DEFENSIVE TIMEOUTS: JEDER externe
 * API-Call ... braucht ein striktes Timeout") — die Frage ist nur seine Hoehe.
 */
export const REFRESH_TIMEOUT_MS = 8000;

/**
 * Das Ergebnis des Netzrufs. Diskriminiert, WIRFT NIE.
 *
 * http_error TRAEGT DEN STATUS UND KEINEN RUMPF. Der Rumpf wird ausschliesslich
 * INNERHALB dieser Datei gelesen und auf EINEN Vergleich reduziert (invalidGrant,
 * ein boolean). DAMIT VERLAESST KEIN FREMDTEXT DIESE DATEI, und es gibt nichts zu
 * schwaerzen — dieselbe Begruendung wie in google-token.ts, verschaerft um den
 * Umstand, dass die Fehler-Rumpfform des Token-Endpunkts NICHT GELESEN ist
 * (docs/ziel-befunde.md, Teil (bd): keine Rumpfform, keine Feldnamen, kein
 * Statuscode).
 *
 * invalidGrant IST BEWUSST OHNE STATUSCODE-BEDINGUNG ERHOBEN. Teil (bd) haelt
 * ausdruecklich fest, dass die Doku fuer invalid_grant KEINEN Statuscode nennt —
 * der einzige Fehler-Statuscode jener Seite steht bei den DPoP-Fehlern. "Wer ihn
 * uebernimmt, uebertraegt einen Statuscode von einem Fehlerpfad auf einen anderen."
 *
 * EIN UNLESBARER FEHLER-RUMPF ERGIBT invalidGrant=false. Das ist die strenge
 * Richtung: aus "ich konnte nicht nachsehen" wird nie "der Zugang ist tot".
 *
 * ERHEBUNG UND DEUTUNG SIND GETRENNT, und das ist der Grund, warum hier KEIN Status
 * mitspricht: invalidGrant sagt nur, WAS IM RUMPF STAND. WAS DARAUS FOLGT, entscheidet
 * der Rahmen (oauth/token-refresh.ts) — und der wendet seit dem 2026-08-29 eine
 * Statusgrenze an (ab 500 gewinnt retry). Wer diese Grenze hierher zieht, macht aus
 * einer Beobachtung ein Urteil und nimmt dem Rahmen die Angabe, auf der er urteilt.
 */
export type RefreshExchangeResult =
  | { kind: "ok"; body: unknown }
  | { kind: "timeout" }
  | { kind: "network_error" }
  | { kind: "http_error"; status: number; invalidGrant: boolean };

/**
 * Baut den Rumpf der Erneuerungs-Anfrage.
 *
 * VIER PARAMETER. client_id, refresh_token und grant_type stehen im GELESENEN
 * Beispiel-Rumpf (Teil (ay)).
 *
 * client_secret WIRD MITGESENDET — GEMESSEN 2026-08-28 (OWNER, Teile (bv) und (by)):
 * beide Aufrufe der Messung C trugen es, beide antworteten mit 200. Der Anbieter
 * fuehrt das Feld als "Optional". OB ein Aufruf OHNE es ebenfalls durchginge, IST
 * NICHT GEMESSEN — es ist keiner gefahren worden, und aus dem Wort "Optional" folgt
 * es ebenso wenig. Gebaut wird der GEMESSENE Weg; der Verzicht waere eine Aenderung
 * auf ungemessener Grundlage. (Festlegung 2 des Zuschnitts.)
 *
 * URLSearchParams, nicht encodeURIComponent — hier ist es ein RUMPF in
 * application/x-www-form-urlencoded, und dort IST "+" die richtige Form fuer ein
 * Leerzeichen. Dieselbe Aufteilung wie zwischen google-token.ts und
 * buildAuthorizeUrl; wer sie angleicht, macht eine der Stellen falsch.
 */
export function buildRefreshRequestBody(params: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}): string {
  const body = new URLSearchParams();
  body.set("client_id", params.clientId);
  body.set("client_secret", params.clientSecret);
  body.set("grant_type", GRANT_TYPE_REFRESH_TOKEN);
  body.set("refresh_token", params.refreshToken);
  return body.toString();
}

/** Ein Abbruch durch den AbortController — von einem echten Netzfehler getrennt. */
function isAbortError(err: unknown): boolean {
  return (err as { name?: string } | null)?.name === "AbortError";
}

/**
 * Das Ergebnis des Lesens eines FEHLER-Rumpfes. Zwei Faelle:
 * - aborted: der Deckel hat WAEHREND des Lesens zugeschlagen. Das ist ein Timeout und
 *   kein Fehler-Rumpf; ohne diesen Fall waere ein abgebrochener Strom von einem
 *   gelesenen "nicht invalid_grant" nicht zu unterscheiden.
 * - read:    der Rumpf ist gelesen ODER unlesbar. BEIDE ergeben denselben Wert, wenn
 *   invalid_grant nicht dasteht — das ist Absicht, s. den Kopf von
 *   RefreshExchangeResult.
 */
type ErrorBodyRead = { kind: "aborted" } | { kind: "read"; invalidGrant: boolean };

/**
 * Liest aus einer FEHLER-Antwort genau eine Tatsache: nennt sie invalid_grant?
 *
 * SIE GIBT EINEN boolean ZURUECK UND NIE EINEN TEXT. Der gelesene Rumpf bleibt in
 * dieser Funktion; nichts davon erreicht einen Aufrufer oder ein Log.
 *
 * WIRFT NIE: ein unlesbarer Rumpf ist invalidGrant=false, kein Fehler — ausser dem
 * ABBRUCH, der als eigener Fall herauskommt.
 */
async function readErrorBody(res: Response): Promise<ErrorBodyRead> {
  try {
    const body: unknown = await res.json();
    if (typeof body !== "object" || body === null) {
      return { kind: "read", invalidGrant: false };
    }
    return {
      kind: "read",
      invalidGrant:
        (body as Record<string, unknown>)["error"] === INVALID_GRANT,
    };
  } catch (err) {
    if (isAbortError(err)) return { kind: "aborted" };
    return { kind: "read", invalidGrant: false };
  }
}

/**
 * Loest ein Erneuerungs-Token gegen ein frisches Zugangsdatum ein.
 *
 * WIRFT NIE. Das Timeout laeuft ueber einen AbortController; der Abbruch wird vom
 * echten Netzwerkfehler GETRENNT (Muster: google-token.ts, vercel/client.ts) —
 * sonst sieht ein ueberschrittener Deckel aus wie ein kaputtes Netz, und die Suche
 * beginnt am falschen Ende.
 *
 * DER ENDPUNKT WIRD AUS google-token.ts IMPORTIERT UND NICHT ZWEITGESCHRIEBEN. Zwei
 * Zeichenketten desselben Endpunkts waeren zwei Wahrheiten in dem Moment, in dem
 * eine von beiden nachgezogen wird.
 *
 * ---------------------------------------------------------------------------
 * DER DECKEL DECKT AUCH DAS LESEN DES RUMPFES — clearTimeout steht in EINEM finally
 * um den GANZEN Ablauf, nicht in einem inneren um den fetch allein.
 *
 * WARUM DAS EIN UNTERSCHIED IST UND KEINE FORMSACHE: `fetch` kehrt zurueck, sobald
 * die KOPFZEILEN da sind. Der RUMPF wird erst bei `res.json()` gelesen, und das ist
 * ein zweiter Netzvorgang. Wird der Deckel vorher geloescht, laeuft genau dieser
 * zweite Vorgang OHNE JEDE ZEITGRENZE: ein haengender Antwortstrom haelt die Funktion
 * dann unbegrenzt fest, und zwar STILL — kein Fehler, keine Logzeile.
 *
 * DER ABBRUCH MUSS DABEI WEITER ALS timeout HERAUSKOMMEN, nicht als network_error.
 * Deshalb prueft AUCH der Rumpf-Pfad auf AbortError (readErrorBody bzw. der catch
 * unten). Ohne das waere ein ueberschrittener Deckel im Rumpf-Lesen von einem
 * kaputten Netz nicht zu unterscheiden — dieselbe Falle wie beim fetch selbst, nur
 * eine Stufe spaeter.
 *
 * DIE GRENZE, UND SIE GEHOERT DAZU: HEUTE loest ein Betreiber diesen Ruf von Hand
 * aus. Ein einzelner haengender Aufruf ist damit ein kleiner Fall — jemand sieht,
 * dass nichts zurueckkommt. MIT SCHEIBE 1b IST ER DAS NICHT MEHR: dort ruft ein
 * Automatismus, und dann sieht NIEMAND mehr in diese Datei. Der Deckel wird genau
 * dann gebraucht, wenn ihn niemand mehr beobachtet.
 *
 * WAS HIER AUSDRUECKLICH NICHT MITGEAENDERT WIRD: google-token.ts
 * (exchangeAuthorizationCode) und vercel/client.ts tragen dieselbe Lage — dort steht
 * clearTimeout ebenfalls vor dem Rumpf-Lesen. Das ist GEMESSEN und GEMELDET, aber
 * NICHT Gegenstand dieser Scheibe; beide Dateien bleiben unberuehrt.
 */
export async function exchangeRefreshToken(params: {
  clientId: string;
  clientSecret: string;
  refreshToken: string;
}): Promise<RefreshExchangeResult> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), REFRESH_TIMEOUT_MS);

  try {
    let res: Response;
    try {
      res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: buildRefreshRequestBody(params),
        signal: controller.signal,
      });
    } catch (err) {
      return isAbortError(err)
        ? { kind: "timeout" }
        : { kind: "network_error" };
    }

    if (!res.ok) {
      const gelesen = await readErrorBody(res);
      if (gelesen.kind === "aborted") return { kind: "timeout" };
      return {
        kind: "http_error",
        status: res.status,
        invalidGrant: gelesen.invalidGrant,
      };
    }

    // Ein unlesbarer Rumpf bei 2xx ist ein Netz-/Formfehler, kein HTTP-Fehler — genau
    // wie in google-token.ts. Der ABBRUCH ist davon getrennt, s. den Kopf.
    try {
      return { kind: "ok", body: await res.json() };
    } catch (err) {
      return isAbortError(err)
        ? { kind: "timeout" }
        : { kind: "network_error" };
    }
  } finally {
    clearTimeout(timer);
  }
}

/**
 * Das Ergebnis der Antwort-Deutung.
 *
 * ES GIBT KEIN GEGENSTUECK ZU no_refresh_token AUS google-token.ts, und das ist der
 * Unterschied der beiden Fluesse: Beim CODE-TAUSCH ist ein fehlendes
 * Erneuerungs-Token ein toter Zugang. Bei der ERNEUERUNG ist es der Normalfall —
 * wir HABEN eines, wir haben es soeben benutzt.
 */
export type RefreshPayloadResult =
  | { kind: "ok"; payload: OAuthPayload }
  | { kind: "bad_response"; field: string };

/** Eine brauchbare Restdauer: endliche, nicht negative Zahl. */
function isUsableDuration(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/**
 * Deutet die Antwort des Token-Endpunkts als NEUE Nutzlast.
 *
 * DIE FELDER WERDEN EINZELN ENTNOMMEN, DIE ANTWORT WIRD NIE GESPREIZT — dieselbe
 * Begruendung wie in google-token.ts: Google verlangt, unbekannte Felder zu
 * IGNORIEREN, formatOAuthPayload LEHNT unbekannte Felder AB. Ein Spreizen brachte
 * jedes zusaetzliche Google-Feld direkt in die Ablehnung.
 *
 * receivedAtEpochSeconds WIRD EINMAL VON AUSSEN GEREICHT und hier fuer BEIDE
 * Umrechnungen benutzt. Zweimal die Uhr zu lesen gaebe den zwei Ablaufzeitpunkten
 * verschiedene Bezugspunkte, und die Differenz waere spaeter unerklaerlich.
 *
 * DIE UMRECHNUNG IST AB EMPFANG — dieselbe konservative Richtung wie beim
 * Code-Tausch. Der BEZUGSPUNKT der Restdauer ist NICHT GELESEN; ab Empfang gilt der
 * Zugang eher zu frueh als zu spaet als abgelaufen.
 *
 * ---------------------------------------------------------------------------
 * WAS MIT DEN ZWEI UHREN GESCHIEHT — EINZELN, weil sie verschiedenen Regeln folgen:
 *
 *   UHR 1, accessTokenExpiresAt: WIRD IMMER NEU GESETZT, auf
 *   receivedAt + floor(expires_in). Fehlt oder taugt expires_in nicht, ist das ein
 *   bad_response und KEIN Ausweichwert — jeder erfundene Wert waere still falsch
 *   (zu gross heisst "gilt fuer immer", zu klein "sofort tot").
 *   GEMESSEN 2026-08-28 (OWNER, Teil (bw)): expires_in war 3599.
 *
 *   UHR 2, refreshTokenExpiresAt: WIRD NEU GESETZT, WENN die Antwort eine brauchbare
 *   Restdauer traegt; sonst bleibt der ABGELEGTE Wert stehen. Er wird NIE auf
 *   {kind:"unknown"} zurueckgesetzt — das waere der einzige Weg, der INFORMATION
 *   VERLIERT, und Festlegung 5 des Zuschnitts haengt genau an dieser Information.
 *   GEMESSEN 2026-08-28 (OWNER, Teil (bw)): Beide Antworten trugen
 *   refresh_token_expires_in, und die Uhr LAEUFT BEI DER EINLOESUNG WEITER
 *   (581553 - 581408 = 145, genau der verstrichene Abstand). Neu setzen und stehen
 *   lassen ergeben deshalb heute denselben absoluten Zeitpunkt; das Neu-Setzen bleibt
 *   auch dann richtig, wenn der Anbieter das aendert.
 *
 *   SCHLAEGT EIN ABGELEGTES {kind:"unknown"} DURCH EINE BRAUCHBARE ANTWORT IN EIN
 *   {kind:"at"} UM, IST DAS ERWUENSCHT (ARCHITEKT, 2026-08-29): Der Zugang verlaesst
 *   damit dauerhaft die Asymmetrie der Festlegung 5 — solange die Uhr unbekannt ist,
 *   wird bei jedem Lauf ein Netzruf gemacht, weil "unbekannt" nie als ueberschritten
 *   gilt. Wer das fuer einen Fehler haelt und einen Riegel dagegen baut, nimmt dem
 *   Zugang die einzige Gelegenheit, seine zweite Uhr zu erfahren.
 *
 * DIE GRENZE, DIE ZU UHR 2 GEHOERT: OB der Anbieter refresh_token_expires_in
 * dauerhaft liefert, ist OFFEN. Teil (bx) haelt fest, dass das Feld KAM — und dass
 * nicht getrennt ist, ob es generell kommt oder weil die Anwendung im
 * Publishing-Status "Testing" steht. Mit einer Verifizierung koennte {kind:"unknown"}
 * doch zum Normalfall werden.
 *
 * ---------------------------------------------------------------------------
 * DAS ERNEUERUNGS-TOKEN SELBST: Ein vorhandener, NICHT-LEERER String wird
 * uebernommen; alles andere laesst den ABGELEGTEN Wert stehen. Beides zusammen
 * deckt die Mehrdeutigkeit aus dem Dateikopf ab UND einen Anbieter, der eines Tages
 * doch rotiert. Ein leerer oder falsch getypter Wert ist AUSDRUECKLICH kein
 * bad_response: ein funktionierendes Erneuerungs-Token wegen eines kaputten
 * Antwortfeldes wegzuwerfen waere der teurere Fehler.
 *
 * WIRFT NIE.
 */
export function toRefreshedPayload(
  body: unknown,
  receivedAtEpochSeconds: number,
  stored: OAuthPayload,
): RefreshPayloadResult {
  if (
    !Number.isInteger(receivedAtEpochSeconds) ||
    receivedAtEpochSeconds < 0
  ) {
    return { kind: "bad_response", field: "receivedAt" };
  }
  if (typeof body !== "object" || body === null) {
    return { kind: "bad_response", field: "body" };
  }

  const raw = body as Record<string, unknown>;

  const accessToken = raw["access_token"];
  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return { kind: "bad_response", field: "access_token" };
  }

  // NUR EINE ZAHL, KEINE ZAHL ALS TEXT — dieselbe Auflage wie beim Code-Tausch: das
  // gelesene Beispiel zeigt "expires_in": 3920 ohne Anfuehrungszeichen (Teil (az)),
  // eine Zeichenketten-Variante ist NICHT gelesen.
  const expiresIn = raw["expires_in"];
  if (!isUsableDuration(expiresIn)) {
    return { kind: "bad_response", field: "expires_in" };
  }

  const rawRefreshToken = raw["refresh_token"];
  const refreshToken =
    typeof rawRefreshToken === "string" && rawRefreshToken.length > 0
      ? rawRefreshToken
      : stored.refreshToken;

  const rawRefreshExpiry = raw["refresh_token_expires_in"];
  const refreshTokenExpiresAt: RefreshTokenExpiry = isUsableDuration(
    rawRefreshExpiry,
  )
    ? {
        kind: "at",
        epochSeconds: receivedAtEpochSeconds + Math.floor(rawRefreshExpiry),
      }
    : stored.refreshTokenExpiresAt;

  return {
    kind: "ok",
    payload: {
      accessToken,
      accessTokenExpiresAt:
        receivedAtEpochSeconds + Math.floor(expiresIn),
      refreshToken,
      refreshTokenExpiresAt,
    },
  };
}
