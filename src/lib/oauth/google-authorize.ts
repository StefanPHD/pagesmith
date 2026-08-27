import "server-only";
import { randomBytes } from "node:crypto";

// ===========================================================================
// DER AUTORISIERUNGS-START FUER GOOGLE — DIE REINE HAELFTE (Phase 11.8, Scheibe 11.8d).
//
// WAS DIESE DATEI IST: Zeichenketten-Arbeit. Sie baut die Autorisierungs-Adresse, den
// Zufallswert und das State-Cookie. Kein Netz, keine Datenbank, keine Sitzung, kein
// Next.js. Die Route daneben verkettet sie nur.
//
// WARUM DER SCHNITT HIER LIEGT UND NICHT ALLES IN DER ROUTE STEHT: Die zwei Dinge, die
// falsch sein koennen — die Adresse und das Cookie —, sind beides reine Zeichenketten.
// In der Route laegen sie hinter einer Next-Laufzeit, einer Sitzung und einer
// Datenbank-Abfrage; ein Test muesste drei Dinge mocken, um eine Zeichenkette zu pruefen,
// und waere damit der hohle Test aus docs/immer-beachten.md ("TEST-DISZIPLIN:
// DISKRIMINIEREND STATT BREIT GEMOCKT").
//
// SIE FASST KEIN GEHEIMNIS AN: GOOGLE_OAUTH_CLIENT_SECRET wird hier NICHT gelesen. Es
// wird erst beim Tausch des Codes gebraucht, und der gehoert Scheibe 11.8e. Ein Test
// bewacht das.
//
// SIE IMPORTIERT src/lib/secrets/ NICHT — weder cipher.ts noch oauth-payload.ts. Die
// drei Riegel jener Scheiben (AUFRUFER-RIEGEL CIPHER, AUFRUFER-RIEGEL FORM,
// IMPORT-RIEGEL) bleiben in 11.8d unberuehrt und fallen erst in 11.8e, mit Ansage
// (docs/aktiver-stand-11.8.md). Ein Test bewacht auch das.
//
// LADEKLASSE server-only, obwohl die Datei "nur Zeichenketten sieht": Sie liest
// process.env und erzeugt kryptografischen Zufall. Die Klasse ist eine UNTERGRENZE —
// sie einzusetzen, wo rein gereicht haette, ist nie ein Verstoss; umgekehrt schon.
//
// KEINE UMLAUTE IM QUELLTEXT — wie in den Nachbardateien (secrets/cipher.ts,
// capi/token.ts). Grund ist die Werkzeug-Regel in docs/immer-beachten.md: ein
// Ganz-Datei-Schreiber kann Umlaute doppelt kodiert zurueckschreiben, und das faellt
// nur im Diff auf.
//
// ---------------------------------------------------------------------------
// HERKUNFT JEDES ANBIETER-WERTS IN DIESER DATEI — GELESEN, NICHT GEMESSEN:
// docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teile (at)
// bis (ay) (Abschnitts-Lesung vom 2026-08-27) sowie Teil (ak) fuer den Bereich.
// KEIN Wert in dieser Datei stammt aus dem Gedaechtnis. Es ist KEIN Aufruf gegen eine
// Google-Schnittstelle gefahren worden.
// ===========================================================================

/**
 * Der Endpunkt, zu dem der Webserver-Fluss weiterleitet.
 * GELESEN 2026-08-27 (Teil (at)), zeichengenau.
 */
export const GOOGLE_AUTHORIZE_ENDPOINT =
  "https://accounts.google.com/o/oauth2/v2/auth";

/**
 * Der EINE Zugriffsbereich, den wir anfordern.
 * GELESEN (Teil (ak)): "The scope https://www.googleapis.com/auth/datamanager is
 * required for all services in the Data Manager API."
 *
 * AUSDRUECKLICH NICHT DABEI: der adwords-Bereich. Ihn nicht anzufordern ist ein
 * KANDIDAT und keine Entscheidung (docs/roadmap.md, Eintrag 11.8) — heute braucht der
 * Fluss ihn nicht, und ein Bereich, der nicht angefordert wird, kann nicht abgelehnt
 * werden. Ebenso nicht dabei: datamanager.partnerlink, der gehoert dem
 * Data-Partner-Weg, und gewaehlt ist ADVERTISER.
 */
export const DATA_MANAGER_SCOPE = "https://www.googleapis.com/auth/datamanager";

/**
 * Der Name des State-Cookies.
 *
 * DER PRAEFIX IST EINE DURCHSETZUNG, KEINE ZUSAGE: __Host- erzwingt host-only, Pfad "/"
 * und Secure — der BROWSER verwirft das Cookie, wenn eines der drei fehlt.
 *
 * WAS ES SCHUETZT: Der State ist das EINZIGE, was den spaeteren Callback an genau DIESE
 * Autorisierung bindet. Ohne host-only koennte ein auf einer SUBDOMAIN des App-Hosts
 * gesetztes Cookie den State auf dem App-Host ueberschreiben; der Callback pruefte dann
 * gegen einen untergeschobenen Wert. Das ist Schutz gegen SITZUNGS-UNTERSCHIEBUNG.
 *
 * ES IST NICHT DIESELBE BEGRUENDUNG WIE BEI __Host-ps_v, und wer sie zusammenzieht,
 * streicht die eine, wenn die andere entfaellt: Die Regel "HOST-ONLY-COOKIES AUF
 * GETEILTEN WILDCARD-DOMAINS" (docs/immer-beachten.md) ruht ausschliesslich darauf, dass
 * publayer.net als Wildcard alle Kundenprojekte traegt; ihr Schaden ist CROSS-TENANT,
 * ihr Schutzgut die MESSUNG. Dieses Cookie lebt auf dem APP-Host, und dort gibt es kein
 * Projekt Y.
 */
export const STATE_COOKIE_NAME = "__Host-ps_oauth";

/**
 * Die Lebensdauer des State-Cookies in Sekunden.
 *
 * GEWAEHLT, NICHT GEMESSEN, und der Zielkonflikt gehoert dazu: kuerzer bricht bei einem
 * Nutzer, der auf dem Zustimmungsbildschirm zoegert oder sich erst anmelden muss;
 * laenger haelt das Fenster offen, in dem ein untergeschobener State etwas nuetzt.
 */
export const STATE_COOKIE_MAX_AGE_SECONDS = 600;

/** Die Zahl der Zufallsbytes des State-Werts. */
const STATE_BYTES = 32;

/**
 * Das Trennzeichen im Cookie-WERT. Punkt wie in secrets/cipher.ts und
 * secrets/oauth-payload.ts — er kommt weder in base64url noch in einer UUID vor.
 * (Das ist eine Konvention dieses Projekts, KEIN Import: die Dateien bleiben getrennt.)
 */
const COOKIE_VALUE_SEPARATOR = ".";

const ENV_CLIENT_ID = "GOOGLE_OAUTH_CLIENT_ID";
const ENV_REDIRECT_URI = "GOOGLE_OAUTH_REDIRECT_URI";

/** Die Form einer Projekt-Kennung. FORM-Pruefung, KEINE Existenz-Aussage. */
const PROJECT_ID_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

/**
 * Das Ergebnis von readAuthorizeConfig.
 * - missing_config traegt den NAMEN der fehlenden Variablen, nie ihren Wert.
 */
export type AuthorizeConfigResult =
  | { kind: "ok"; clientId: string; redirectUri: string }
  | { kind: "missing_config"; variable: string };

/**
 * Liest die zwei Umgebungswerte, die der Autorisierungs-Start braucht.
 *
 * FAIL-LOUD MIT EIGENEM AUSGANG — und das weicht bewusst vom Bestand ab: In den 21
 * heutigen process.env-Fundstellen erzeugt ein fehlender Wert nirgends einen benannten
 * Fehlzustand (er wird zu "", zu einem Vorgabewert oder zu einem spaeteren Wurf).
 * secrets/cipher.ts ist der Massstab, nicht der Bestand. Ohne diesen Ausgang bekaeme
 * der Nutzer einen Zustimmungsbildschirm mit leerer Client-Kennung oder ein
 * redirect_uri_mismatch — und die Suche begaenne bei Google statt in der Umgebung.
 *
 * GELESEN JE AUFRUF, nicht beim Laden des Moduls — Muster von secrets/cipher.ts: der
 * Test-Bestand setzt process.env je Test und stellt ihn zurueck, und ein beim Laden
 * gelesener Wert bliebe nach einer Aenderung im laufenden Prozess stehen.
 *
 * GOOGLE_OAUTH_CLIENT_SECRET WIRD HIER NICHT GELESEN. Es gehoert dem Code-Tausch in
 * Scheibe 11.8e.
 */
export function readAuthorizeConfig(): AuthorizeConfigResult {
  const clientId = process.env[ENV_CLIENT_ID]?.trim() ?? "";
  if (!clientId) return { kind: "missing_config", variable: ENV_CLIENT_ID };

  // KEIN trim() auf die Weiterleitungs-Adresse als Wert-Aenderung missverstehen: der
  // Vergleich unten prueft nur, OB etwas gesetzt ist. In die URL geht der Wert
  // unveraendert (s. buildAuthorizeUrl).
  const redirectUri = process.env[ENV_REDIRECT_URI] ?? "";
  if (!redirectUri.trim())
    return { kind: "missing_config", variable: ENV_REDIRECT_URI };

  return { kind: "ok", clientId, redirectUri };
}

/** Prueft die FORM einer Projekt-Kennung. Sagt nichts darueber, ob sie existiert. */
export function isProjectIdShape(value: string): boolean {
  return PROJECT_ID_PATTERN.test(value);
}

/**
 * Ein frischer State-Wert: 32 Zufallsbytes als base64url ohne Auffuellzeichen.
 *
 * base64url ist gewaehlt, weil sein Zeichenvorrat den Punkt NICHT enthaelt — der trennt
 * die zwei Teile des Cookie-Werts.
 */
export function newStateValue(): string {
  return randomBytes(STATE_BYTES).toString("base64url");
}

/**
 * Der WERT des State-Cookies: Zufallswert UND Projekt-Kennung, durch einen Punkt
 * getrennt.
 *
 * DIE PROJEKT-KENNUNG STEHT IM COOKIE UND NIE IN DER URL. Was durch eine FREMDE
 * Weiterleitung reist, ist manipulierbar — liefe die Kennung ueber Google, entschiede
 * der Rueckkehrer, an welches Projekt das Zugangsdatum gebunden wird.
 *
 * BEIM LESEN (Scheibe 11.8e) GILT DIE TEILEZAHL STRIKT: nicht genau zwei Teile ->
 * verworfen. Der Grund steht als Mutationsprobe M3 in Vermerk 3 jener Scheibe: ein
 * angehaengter dritter Teil waere sonst still ignoriert worden.
 */
export function buildStateCookieValue(state: string, projectId: string): string {
  return `${state}${COOKIE_VALUE_SEPARATOR}${projectId}`;
}

/**
 * Die vollstaendige Set-Cookie-Zeichenkette.
 *
 * SameSite=Lax, NICHT Strict — und der Grund gehoert dazu, weil Strict wie die sicherere
 * Wahl aussieht: Die Rueckkehr von Google ist eine TOP-LEVEL-NAVIGATION VON EINER
 * FREMDEN SEITE. Bei Strict sendet der Browser das Cookie nicht mit, und der Callback
 * wiese eine KORREKTE Autorisierung ab. Die strengere Einstellung erzeugte hier also
 * einen Fehlschlag, der wie ein Angriff aussieht.
 *
 * Secure und Path=/ stehen nicht zur Wahl: __Host- erzwingt beide, und ein Domain-
 * Attribut ist unter diesem Praefix verboten.
 */
export function serializeStateCookie(state: string, projectId: string): string {
  const value = buildStateCookieValue(state, projectId);
  return (
    `${STATE_COOKIE_NAME}=${value}; Path=/; HttpOnly; Secure; SameSite=Lax; ` +
    `Max-Age=${STATE_COOKIE_MAX_AGE_SECONDS}`
  );
}

/**
 * Baut die Autorisierungs-Adresse.
 *
 * DIE PARAMETER UND IHRE EINSTUFUNG SIND GELESEN (Teil (au)): client_id, redirect_uri,
 * response_type und scope sind Pflicht; access_type und state sind empfohlen; prompt ist
 * optional.
 *
 * response_type=code — "Set the parameter value to code for web server applications."
 *
 * access_type=offline — ohne ihn entsteht kein Erneuerungs-Token: "This value instructs
 * the Google authorization server to return a refresh token and an access token the
 * first time that your application exchanges an authorization code for tokens."
 *
 * prompt=consent (ARCHITEKT, 2026-08-27). GRUND: Ohne den Parameter haengt das
 * Erneuerungs-Token daran, ob dieses Konto der Anwendung schon einmal zugestimmt hat —
 * "the user will be prompted only the first time your project requests access". Der
 * Live-Test von 11.8e waere dann nicht reproduzierbar: er liefe beim ersten Konto durch
 * und beim zweiten Anlauf desselben Kontos womoeglich nicht.
 * DIE GRENZE GEHOERT DAZU: Die Frage, OB eine wiederholte Autorisierung ein
 * Erneuerungs-Token liefert, ist damit NICHT beantwortet, sondern UNSCHAEDLICH GEMACHT.
 * Sie bleibt eine MESSFRAGE (docs/ziel-befunde.md, Google-Abschnitt, Teil (av)).
 *
 * include_granted_scopes WIRD NICHT GESETZT (ARCHITEKT, 2026-08-27): Wir fordern genau
 * einen Bereich an; der Parameter erweitert eine Zustimmung ueber FRUEHERE Bereiche, die
 * es hier nicht gibt.
 *
 * DIE WEITERLEITUNGS-ADRESSE GEHT UNVERAENDERT HINEIN — keine Normalisierung, kein
 * Anhaengen, kein Entfernen eines Schraegstrichs. Der Anbieter gleicht sie als
 * ZEICHENKETTE ab: "Note that the http or https scheme, case, and trailing slash ('/')
 * must all match." (Teil (au)). Die Prozentkodierung unten ist die Transportform
 * desselben Werts, keine Aenderung an ihm.
 *
 * WARUM encodeURIComponent UND NICHT URLSearchParams, und das ist kein Geschmack:
 * URLSearchParams kodiert ein Leerzeichen als "+", encodeURIComponent als "%20". Das
 * offizielle Beispiel des Anbieters zeigt "%20" (Teil (at)). Heute enthaelt kein Wert
 * ein Leerzeichen — mit einem ZWEITEN Bereich enthielte scope eines, und ob "+" dort
 * angenommen wird, steht in KEINER gelesenen Seite. Der belegte Weg ist der richtige.
 */
export function buildAuthorizeUrl(params: {
  clientId: string;
  redirectUri: string;
  state: string;
}): string {
  // Reihenfolge bewusst fest: sie macht zwei erzeugte Adressen zeilenweise
  // vergleichbar. Sie hat keine Bedeutung fuer den Anbieter.
  const query: Array<[string, string]> = [
    ["client_id", params.clientId],
    ["redirect_uri", params.redirectUri],
    ["response_type", "code"],
    ["scope", DATA_MANAGER_SCOPE],
    ["access_type", "offline"],
    ["prompt", "consent"],
    ["state", params.state],
  ];

  const encoded = query
    .map(([name, value]) => `${name}=${encodeURIComponent(value)}`)
    .join("&");

  return `${GOOGLE_AUTHORIZE_ENDPOINT}?${encoded}`;
}

/** Was der Autorisierungs-Start an den Browser gibt: wohin, und was er sich merkt. */
export type AuthorizeStart = { location: string; setCookie: string };

/**
 * Die VOLLSTAENDIGE Zusammensetzung: Zufallswert erzeugen, Adresse bauen, Cookie bauen.
 *
 * WARUM DIESE FUNKTION EXISTIERT UND DIE ROUTE SIE NICHT SELBST ZUSAMMENSETZT — das ist
 * KEINE Bequemlichkeit, sondern der einzige Weg, die tragende Zusicherung dieser Scheibe
 * ueberhaupt PRUEFBAR zu machen:
 *
 * Die Zusicherung lautet "die Projekt-Kennung kommt in der Adresse nirgends vor". Solange
 * buildAuthorizeUrl die Kennung gar nicht ENTGEGENNIMMT, ist ein Test darauf TRIVIAL WAHR
 * — er kann nicht fallen, weil es nichts gibt, das durchsickern koennte. Das ist die
 * hohle Abwesenheits-Behauptung aus docs/immer-beachten.md, und sie ist beim Bauen
 * aufgefallen, nicht durch eine Mutation.
 *
 * HIER IST DIE KENNUNG IM SCOPE. Damit wird die Abwesenheit eine ECHTE Aussage: Wer sie
 * in die Adresse traegt — direkt oder ueber den bequemen Fehlgriff, den Cookie-Wert als
 * state zu uebergeben —, macht den Test rot.
 *
 * DER ZWEITE GEWINN: Die Route kann den Fehlgriff nicht mehr machen. Sie sieht den
 * Zufallswert gar nicht und hat nichts zu verketten.
 */
export function buildAuthorizeStart(params: {
  clientId: string;
  redirectUri: string;
  projectId: string;
}): AuthorizeStart {
  const state = newStateValue();

  return {
    // NUR der Zufallswert reist. Die Kennung steht im Cookie und sonst nirgends.
    location: buildAuthorizeUrl({
      clientId: params.clientId,
      redirectUri: params.redirectUri,
      state,
    }),
    setCookie: serializeStateCookie(state, params.projectId),
  };
}
