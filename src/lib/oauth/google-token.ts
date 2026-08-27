import "server-only";
import { readAuthorizeConfig } from "@/lib/oauth/google-authorize";
import type {
  OAuthPayload,
  RefreshTokenExpiry,
} from "@/lib/secrets/oauth-payload";

// ===========================================================================
// DER CODE-TAUSCH FUER GOOGLE — DIE REINE HAELFTE (Phase 11.8, Scheibe 11.8e).
//
// WAS DIESE DATEI IST: Sie baut die Tausch-Anfrage, fuehrt sie aus und DEUTET die
// Antwort. Keine Datenbank, keine Sitzung, kein Next.js, keine Chiffrierung. Die
// Callback-Route daneben verkettet sie nur.
//
// WARUM SIE NICHT IN google-authorize.ts LIEGT — ZWEI GRUENDE, und der zweite ist
// zwingend:
//   (1) Jene Datei ist der START. Diese ist die RUECKKEHR. Zwei Scheiben, zwei
//       Gegenstaende.
//   (2) SIE LIEST GOOGLE_OAUTH_CLIENT_SECRET. Der Test T26 in
//       google-authorize.test.ts behauptet, dass das Anwendungs-Geheimnis in JENER
//       Datei nirgends vorkommt. Es dort zu lesen machte einen bestehenden Test rot.
//
// WARUM SIE NICHT IN DER ROUTE LIEGT: Ein Test der Antwort-Auswertung braeuchte sonst
// eine Next-Laufzeit, eine Sitzung und einen Datenbank-Mock, um eine Zuordnung von
// vier Feldern zu pruefen — und waere damit der hohle Test aus docs/immer-beachten.md
// ("TEST-DISZIPLIN: DISKRIMINIEREND STATT BREIT GEMOCKT").
//
// DER TYP-IMPORT AUS src/lib/secrets/ IST EINE ANSAGE UND KEIN VERSEHEN: Er ist
// `import type`, wird zur Laufzeit GELOESCHT und ist KEIN Aufruf. Die drei Riegel
// (AUFRUFER-RIEGEL CIPHER, AUFRUFER-RIEGEL FORM, IMPORT-RIEGEL) fallen deshalb NICHT
// hier, sondern in der Callback-Route, wo encryptSecret und formatOAuthPayload
// AUFGERUFEN werden. Die Alternative — einen eigenen Feldsatz zu erfinden — waere
// eine ZWEITE Stelle, die die vier Felder kennt, und genau das verbietet Auflage (2)
// der Scheibe 11.8c.
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts.
//
// ---------------------------------------------------------------------------
// HERKUNFT JEDES ANBIETER-WERTS IN DIESER DATEI — GELESEN, NICHT GEMESSEN:
// docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teil (ay)
// (Lauf 5, die ANFRAGE) und Teile (az) bis (bd) (Lauf 6, die ANTWORT).
// KEIN Wert stammt aus dem Gedaechtnis. Es ist KEIN Aufruf gegen eine
// Google-Schnittstelle gefahren worden.
// ===========================================================================

/**
 * Der Endpunkt des Code-Tauschs.
 * GELESEN 2026-08-27 (Teil (ay)), zeichengenau: "To exchange an authorization code
 * for an access token, call the https://oauth2.googleapis.com/token endpoint".
 */
export const GOOGLE_TOKEN_ENDPOINT = "https://oauth2.googleapis.com/token";

/**
 * Der grant_type des Code-Tauschs.
 * GELESEN (Teil (ay)): "As defined in the OAuth 2.0 specification, this field's value
 * must be set to authorization_code."
 */
const GRANT_TYPE_AUTHORIZATION_CODE = "authorization_code";

const ENV_CLIENT_SECRET = "GOOGLE_OAUTH_CLIENT_SECRET";

/**
 * Das Timeout des Tauschs.
 *
 * ACHT SEKUNDEN, DEM VORBILD vercel/client.ts FOLGEND — und ausdruecklich NICHT den
 * 3 000 ms aus capi/meta-forward.ts. Der Unterschied ist nicht Geschmack:
 *
 * DER PREIS DER KURZEN DECKELUNG liegt laut Manifest in der BELEGUNG VON
 * CONCURRENCY-SLOTS auf dem meistgetroffenen Pfad, multipliziert ueber ALLE Kunden.
 * Diese Route wird EINMAL JE AUTORISIERUNG von EINEM Betreiber getroffen — die
 * Multiplikation, die den kurzen Deckel rechtfertigt, gibt es hier nicht.
 *
 * UMGEKEHRT IST DER SCHADEN EINES ZU KNAPPEN DECKELS HIER GROESSER: Ein verpasster
 * Forward kostet eine Conversion; ein verfallener Autorisierungs-Code kostet den
 * GANZEN Zustimmungsdurchlauf, und derselbe Code ist nicht ein zweites Mal
 * einloesbar.
 *
 * EIN DECKEL BLEIBT PFLICHT (CLAUDE.md, "DEFENSIVE TIMEOUTS: JEDER externe
 * API-Call") — die Frage ist nur seine Hoehe.
 */
export const TOKEN_EXCHANGE_TIMEOUT_MS = 8000;

/**
 * Die Konfiguration des Tauschs.
 * missing_config traegt den NAMEN der fehlenden Variablen, nie ihren Wert.
 */
export type TokenExchangeConfigResult =
  | {
      kind: "ok";
      clientId: string;
      clientSecret: string;
      redirectUri: string;
    }
  | { kind: "missing_config"; variable: string };

/**
 * Liest die DREI Werte, die der Tausch braucht.
 *
 * SIE BAUT AUF readAuthorizeConfig AUF UND LIEST NUR DAS GEHEIMNIS SELBST DAZU. Damit
 * bleiben Client-Kennung und Weiterleitungs-Adresse an EINER Stelle gelesen; zwei
 * Leser derselben Variablen waeren zwei Wahrheiten in dem Moment, in dem einer von
 * beiden ein trim() bekommt und der andere nicht.
 *
 * GELESEN JE AUFRUF, nicht beim Laden des Moduls — Muster von secrets/cipher.ts.
 */
export function readTokenExchangeConfig(): TokenExchangeConfigResult {
  const base = readAuthorizeConfig();
  if (base.kind === "missing_config") return base;

  const clientSecret = process.env[ENV_CLIENT_SECRET]?.trim() ?? "";
  if (!clientSecret)
    return { kind: "missing_config", variable: ENV_CLIENT_SECRET };

  return {
    kind: "ok",
    clientId: base.clientId,
    clientSecret,
    redirectUri: base.redirectUri,
  };
}

/**
 * Das Ergebnis des Tauschs. Diskriminiert, WIRFT NIE.
 *
 * http_error TRAEGT DEN STATUS UND KEINEN RUMPF — und das ist eine bewusste
 * Abweichung von describeMetaError (capi/meta-forward.ts). Dort gibt es einen
 * Trace-Bezeichner, mit dem man den Anbieter-Support ansprechen kann, und dafuer
 * wurde die formbasierte Schwaerzung gebaut. HIER IST DIE FEHLERFORM NICHT GELESEN
 * (docs/ziel-befunde.md, Lauf 6, Teil (bd): kein Statuscode, keine Rumpfform, keine
 * Feldnamen). Gegen eine ungelesene Form eine Schwaerzung zu bauen hiesse, sie auf
 * VERDACHT zu bauen — und eine Schwaerzung nach Form, die ihren Gegenstand nicht
 * kennt, ist Fall (c) der Schwaerzungs-Regel in docs/immer-beachten.md. Der
 * Statuscode allein ist kein Geheimnis und genuegt fuer die Fehlerklasse.
 */
export type TokenExchangeResult =
  | { kind: "ok"; body: unknown }
  | { kind: "timeout" }
  | { kind: "network_error" }
  | { kind: "http_error"; status: number };

/**
 * Baut den Rumpf der Tausch-Anfrage.
 *
 * DIE FUENF PARAMETER SIND GELESEN (Teil (ay)): client_id, client_secret, code,
 * grant_type, redirect_uri. Mehr schickt diese Anfrage nicht.
 *
 * KEIN DPoP-KOPF: Der Anbieter weist ihn als "Optional" aus. Dass der EINZIGE
 * Beispiel-Rumpf der Seite ihn traegt, ist in Lauf 6, Teil (bg) ausdruecklich als
 * Beispiel und NICHT als Pflicht festgehalten.
 *
 * WARUM HIER URLSearchParams UND IN buildAuthorizeUrl encodeURIComponent — die zwei
 * Dateien widersprechen sich NICHT, sie kodieren zwei verschiedene Dinge: Dort ist es
 * ein QUERY-STRING, und das offizielle Beispiel des Anbieters zeigt dort "%20" fuer
 * das Leerzeichen. Hier ist es ein RUMPF in application/x-www-form-urlencoded, und
 * dort IST "+" die richtige Form fuer ein Leerzeichen. Wer das angleicht, macht eine
 * der beiden Stellen falsch.
 *
 * DIE WEITERLEITUNGS-ADRESSE GEHT UNVERAENDERT HINEIN — keine Normalisierung, kein
 * Anhaengen, kein Entfernen eines Schraegstrichs. Der Anbieter gleicht sie HIER ERNEUT
 * ab; die Prozentkodierung ist die Transportform desselben Werts, keine Aenderung an
 * ihm.
 */
export function buildTokenRequestBody(params: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): string {
  const body = new URLSearchParams();
  body.set("client_id", params.clientId);
  body.set("client_secret", params.clientSecret);
  body.set("code", params.code);
  body.set("grant_type", GRANT_TYPE_AUTHORIZATION_CODE);
  body.set("redirect_uri", params.redirectUri);
  return body.toString();
}

/**
 * Tauscht den Autorisierungs-Code gegen Zugangs- und Erneuerungs-Token.
 *
 * WIRFT NIE. Das Timeout laeuft ueber einen AbortController; der Abbruch wird vom
 * echten Netzwerkfehler GETRENNT (Muster: vercel/client.ts) — sonst sieht ein
 * ueberschrittener Deckel aus wie ein kaputtes Netz, und die Suche beginnt am
 * falschen Ende.
 */
export async function exchangeAuthorizationCode(params: {
  code: string;
  clientId: string;
  clientSecret: string;
  redirectUri: string;
}): Promise<TokenExchangeResult> {
  const controller = new AbortController();
  const timer = setTimeout(
    () => controller.abort(),
    TOKEN_EXCHANGE_TIMEOUT_MS,
  );

  let res: Response;
  try {
    res = await fetch(GOOGLE_TOKEN_ENDPOINT, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: buildTokenRequestBody(params),
      signal: controller.signal,
    });
  } catch (err) {
    return (err as { name?: string } | null)?.name === "AbortError"
      ? { kind: "timeout" }
      : { kind: "network_error" };
  } finally {
    clearTimeout(timer);
  }

  if (!res.ok) return { kind: "http_error", status: res.status };

  // Ein unlesbarer Rumpf bei 2xx ist ein Netz-/Formfehler, kein HTTP-Fehler. Der
  // Wurf von .json() wird hier gefangen, weil diese Funktion nie wirft.
  try {
    return { kind: "ok", body: await res.json() };
  } catch {
    return { kind: "network_error" };
  }
}

/**
 * Das Ergebnis der Antwort-Deutung.
 *
 * no_refresh_token IST EIN EIGENER AUSGANG UND KEIN bad_response — der Unterschied
 * ist der ganze Punkt (docs/aktiver-stand-11.8.md, Nachtrag E3): Ein Zugang OHNE
 * Erneuerungs-Token ist nach dem Ablauf des Zugangsdatums TOT, und niemand merkt es,
 * bis irgendwann ein Forward scheitert. Er darf nicht als Erfolg abgelegt werden, und
 * der Betreiber braucht dafuer eine andere Auskunft als fuer eine kaputte Antwort.
 */
export type TokenPayloadResult =
  | { kind: "ok"; payload: OAuthPayload; refreshExpiryIgnored: boolean }
  | { kind: "bad_response"; field: string }
  | { kind: "no_refresh_token" };

/** Eine brauchbare Restdauer: endliche, nicht negative Zahl. */
function isUsableDuration(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value) && value >= 0;
}

/**
 * Deutet die Antwort des Token-Endpunkts als Nutzlast.
 *
 * DIE FELDER WERDEN EINZELN ENTNOMMEN, DIE ANTWORT WIRD NIE GESPREIZT. Beide Regeln
 * gelten gleichzeitig und vertragen sich nur so: Google verlangt, unbekannte Felder
 * zu IGNORIEREN ("Your application should ignore any unrecognized fields", Teil
 * (az)); formatOAuthPayload LEHNT unbekannte Felder AB. Ein Spreizen der Antwort
 * brachte jedes zusaetzliche Google-Feld direkt in die Ablehnung.
 *
 * receivedAtEpochSeconds WIRD EINMAL VON AUSSEN GEREICHT und hier fuer BEIDE
 * Umrechnungen benutzt. Zweimal die Uhr zu lesen gaebe den zwei Ablaufzeitpunkten
 * verschiedene Bezugspunkte, und die Differenz waere spaeter unerklaerlich.
 *
 * DIE UMRECHNUNG IST AB EMPFANG (ARCHITEKT, 2026-08-27, Nachtrag E2). DER
 * BEZUGSPUNKT DER RESTDAUER IST NICHT GELESEN — ob sie ab Ausstellung oder ab Empfang
 * zaehlt, sagt keine gelesene Seite (Lauf 6, Luecke 1). Ab Empfang ist die
 * KONSERVATIVE Richtung: Der Zugang gilt eher zu frueh als zu spaet als abgelaufen.
 * Die Abweichung ist die Laufzeit des Aufrufs.
 *
 * WIRFT NIE.
 */
export function toOAuthPayload(
  body: unknown,
  receivedAtEpochSeconds: number,
): TokenPayloadResult {
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

  // NUR EINE ZAHL, KEINE ZAHL ALS TEXT: Das gelesene Beispiel zeigt "expires_in":
  // 3920 ohne Anfuehrungszeichen (Teil (az)). Eine Zeichenketten-Variante ist NICHT
  // gelesen — sie anzunehmen waere ein Wert aus dem Gedaechtnis. Kaeme sie je, ist
  // bad_response ein LAUTER, diagnostizierbarer Ausgang und kein stiller Fehler.
  const expiresIn = raw["expires_in"];
  if (!isUsableDuration(expiresIn)) {
    return { kind: "bad_response", field: "expires_in" };
  }

  const refreshToken = raw["refresh_token"];
  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    return { kind: "no_refresh_token" };
  }

  // DIE ASYMMETRIE ZU expires_in IST GEWOLLT UND FOLGT DEM TYP, NICHT DEM GESCHMACK:
  // accessTokenExpiresAt ist eine ZAHL OHNE AUSWEICHZUSTAND — jeder erfundene Wert
  // ist still falsch (zu gross heisst "gilt fuer immer", zu klein "sofort tot"), also
  // gibt es dort einen Ausgang. refreshTokenExpiresAt HAT einen benannten Zustand fuer
  // "nicht bekannt"; ein unbrauchbarer Wert IST genau das. Eine ganze Autorisierung an
  // einem optionalen Feld scheitern zu lassen, das laut Teil (bc) ohnehin nur bei
  // "time-based access" kommt, waere der teurere Fehler.
  const rawRefreshExpiry = raw["refresh_token_expires_in"];
  const refreshExpiryAbsent =
    rawRefreshExpiry === undefined || rawRefreshExpiry === null;

  let refreshTokenExpiresAt: RefreshTokenExpiry = { kind: "unknown" };
  let refreshExpiryIgnored = false;

  if (!refreshExpiryAbsent) {
    if (isUsableDuration(rawRefreshExpiry)) {
      refreshTokenExpiresAt = {
        kind: "at",
        epochSeconds: receivedAtEpochSeconds + Math.floor(rawRefreshExpiry),
      };
    } else {
      // Das Feld war da und war unbrauchbar. Der ZUSTAND bleibt "unbekannt", die
      // TATSACHE wird der Route zum Protokollieren gemeldet — ohne den Wert.
      refreshExpiryIgnored = true;
    }
  }

  return {
    kind: "ok",
    refreshExpiryIgnored,
    payload: {
      accessToken,
      accessTokenExpiresAt:
        receivedAtEpochSeconds + Math.floor(expiresIn),
      refreshToken,
      refreshTokenExpiresAt,
    },
  };
}
