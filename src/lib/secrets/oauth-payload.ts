import "server-only";

// ===========================================================================
// DIE FORM EINER MEHRWERTIGEN NUTZLAST (Phase 11.8, Scheibe 11.8c).
//
// WAS DIESE DATEI IST: ZWEI reine Funktionen. Sie schreiben VIER Felder in EINE
// Zeichenkette und lesen sie zurueck. Kein Chiffrieren, keine Datenbank, kein
// Aufrufer, kein OAuth-Fluss, kein Netz, kein Zustand.
//
// SIE HAT IM PRODUKTIVCODE HEUTE KEINEN AUFRUFER — nur ihre Tests rufen sie. Das ist
// die tragende Invariante dieser Scheibe: Wer einen Aufrufer ergaenzt, baut nicht mehr
// diese Scheibe.
//
// KEINE UMLAUTE IM QUELLTEXT — wie in den Nachbardateien (secrets/cipher.ts,
// capi/token.ts): ae/oe/ue/ss. Grund ist die Werkzeug-Regel in
// docs/immer-beachten.md: ein Ganz-Datei-Schreiber kann Umlaute doppelt kodiert
// zurueckschreiben, und das faellt nur im Diff auf.
//
// ---------------------------------------------------------------------------
// DIE DREI AUFLAGEN DES ZUSCHNITTS, WOERTLICH. Sie stehen hier und nicht nur in
// docs/aktiver-stand-11.8.md, weil eine Auflage am Code gelesen wird, nicht in einer
// Standdatei, die nach dem Phasenende archiviert ist.
//
//   (1) SIE WEISS NICHTS VON CHIFFRIERUNG. Sie importiert die Chiffrier-Datei NICHT
//       und wird von ihr NICHT importiert. Die beiden treffen sich erst bei einem
//       spaeteren Aufrufer.
//
//   (2) SIE IST DER EINZIGE ORT, AN DEM DIE FORM FESTGELEGT WIRD. Wer spaeter einen
//       ZWEITEN Weg baut, der Felder in die Spalte project_secrets.secret_enc
//       schreibt, hat die OWNER-ENTSCHEIDUNG vom 2026-08-26 GEBROCHEN — und das ist
//       der Pruefstein dieser Scheibe. Nicht "die Datei existiert", sondern "sie ist
//       die einzige".
//
//   (3) DIE ZEICHENKETTE MUSS DURCH DIE CHIFFRIER-DATEI PASSEN. Was hier entsteht,
//       muss ein gueltiger Klartext fuer encryptSecret sein und den Rundlauf
//       ueberstehen.
//
// ---------------------------------------------------------------------------
// WARUM KEIN IMPORT DER CHIFFRIER-DATEI, IN KEINE RICHTUNG:
//
// Die Trennung IST die Entscheidung. Krypto bleibt BLIND fuer Domaenenstrukturen —
// laege die Form drinnen, kennte das Verfahren die Gestalt eines OAuth-Zugangs,
// waehrend die vier bestehenden Fan-Out-Ziele einen SKALAR tragen. Das waeren zwei
// Formen in einer Funktion. Laege sie draussen, bei jedem Aufrufer, entschiede sie
// jeder neu, und die zweite Stelle machte es anders als die erste.
//
// DIE EINZIGE ERLAUBTE BERUEHRUNG FINDET IM TEST STATT. oauth-payload.test.ts
// importiert cipher.ts und faehrt den Rundlauf aus Auflage (3). DIESE DATEI TUT ES
// NICHT, und kein anderer Produktivcode tut es. Ein Waechter im Test prueft genau
// das am Quelltext — eine Aussage ueber den Import-Graphen beweist kein Rundlauf.
//
// ---------------------------------------------------------------------------
// WARUM server-only — ZWEI GRUENDE, und der zweite gibt den Ausschlag:
//
//   DIE ZWECK-ACHSE: redact.ts sieht Geheimnisse als DURCHREISENDE und hat den Zweck,
//   sie zu ENTFERNEN; es ist deshalb zu Recht rein. Diese Datei hat den Zweck, sie
//   HALTBAR zu machen — sie formt Zugangsdaten fuer die Ablage. Das ist die andere
//   Seite derselben Achse.
//
//   DIE KLASSE IST EINE UNTERGRENZE, UND DAS IST DER AUSSCHLAG: server-only
//   einzusetzen, wo rein gereicht haette, ist NIE ein Verstoss — umgekehrt schon. Bei
//   einer Datei, die Zugangsdaten formt, ist das die richtige Richtung des Irrtums.
//
// OHNE DEN ZWEITEN GRUND LIEST DIE NAECHSTE AUFRAEUMRUNDE DIE KLASSE ALS ZU STRENG UND
// ENTFERNT SIE. Der erste allein laedt zu der Gegenrede ein, die Datei sehe ja nur
// Zeichenketten — das stimmt und entscheidet trotzdem nichts.
//
// FOLGE FUER DIE TESTS: oauth-payload.test.ts setzt vi.mock("server-only") — anders
// als die reinen Dateien capi/google-payload.ts und capi/google-click-ids.ts, deren
// Tests den Mock bewusst NICHT setzen.
//
// ---------------------------------------------------------------------------
// DIE FORM:
//
//   p1 . <zugangsdatum> . <ablauf> . <erneuerungs-token> . <erneuerungs-ablauf>
//
// FUENF Teile, getrennt durch einen Punkt. Der erste ist die FASSUNGSMARKE, die vier
// hinteren sind base64url.
//
// WARUM JEDES FELD BASE64URL UND NICHT ROH MIT MASKIERUNG: Ein Feld, das selbst einen
// Punkt traegt, machte aus fuenf Teilen sechs — und zwar STILL, weil die Zerlegung
// dann einfach mehr Teile faende. Base64url schliesst das an der Wurzel aus, statt es
// hinterher zu reparieren. Der Zeichenvorrat ist [A-Za-z0-9_-], ohne Auffuellzeichen;
// die Ausgabe ist damit reines ASCII aus [A-Za-z0-9_-.] und erfuellt Auflage (3).
// Nicht-ASCII in einem Feld ueberlebt als UTF-8 in der Kodierung.
//
// ---------------------------------------------------------------------------
// WARUM ZWEI FASSUNGSMARKEN — die innere hier ("p1"), die aeussere im Chiffrat ("v1"):
//
// SIE SITZEN AUF VERSCHIEDENEN ACHSEN, und die bewegen sich unabhaengig: Ein
// SCHLUESSELWECHSEL aendert das Chiffrat und laesst die Nutzlast unberuehrt; ein
// NEUES FELD aendert die Nutzlast und laesst das Chiffrat unberuehrt.
//
// WER NUR EINE MARKE FUEHRT, VERLIERT DIE NUTZLAST-ACHSE, und das ist der teurere
// Verlust: Ein Schluesselwechsel ist ueber die Kennung im Chiffrat-Kopf immer sichtbar
// (unknown_key als eigener Ausgang). Eine Feld-Aenderung waere es nicht — der Leser
// bekaeme ein einwandfrei entschluesseltes "ok" mit einem Inhalt, den er falsch deutet.
//
// UND EINE EIGENSCHAFT, DIE MAN LEICHT FUER EINE LUECKE HAELT: Die INNERE Marke ist
// MITAUTHENTISIERT, WEIL sie im Klartext steckt — die Pruefsumme des Verfahrens deckt
// den ganzen Klartext ab, also auch dieses "p1". Sie braucht dafuer nichts eigenes.
// Die AEUSSERE Marke steckt im Kopf des Chiffrats und ist NICHT Teil des Klartextes;
// sie muss deshalb EIGENS als Zusatzdaten gebunden werden, und genau das tut
// cipher.ts. Zwei Marken, zwei Wege, derselbe Schutz.
//
// ---------------------------------------------------------------------------
// WARUM DER ABLAUF EIN ABSOLUTER ZEITPUNKT IST UND KEINE RESTDAUER:
//
// EINE RESTDAUER ALTERT IM CHIFFRAT STILL. Die Anbieter liefern eine Dauer
// ("expires_in"), und die ist im Moment des Speicherns schon nicht mehr wahr. Ein
// abgelegtes "noch 3600 Sekunden" bleibt fuer immer 3600 und behauptet nach einem Jahr
// dasselbe wie nach einer Sekunde. Der Aufrufer rechnet die Dauer EINMAL in einen
// Zeitpunkt um, bevor er hier hereinkommt.
//
// WARUM SEKUNDEN SEIT EPOCHE UND KEIN TEXT: eine Zahl hat keine Zeitzone, kein Format
// und keine Locale — drei Achsen, an denen ein Zeittext auseinanderlaufen kann.
//
// ---------------------------------------------------------------------------
// WARUM UNBEKANNTE FELDER ABGELEHNT WERDEN:
//
// DIESE DATEI TRAEGT NICHT NUR DIE FORM, SONDERN DIE KONTROLLE DARUEBER. Ein offener
// Feldsatz liesse jede Stelle eintragen, was sie will — und genau das sollte der eigene
// Ort verhindern. Der Feldsatz ist deshalb FEST: Ein zusaetzliches Feld ist ein DIFF an
// DIESER Datei, mit Review, Test und einer neuen Fassungsmarke; es ist kein
// Laufzeit-Zugestaendnis.
//
// DER PREIS IST BEABSICHTIGT: Ein Anbieter mit einem fuenften Feld erzwingt eine
// Aenderung hier. Das ist derselbe sichtbare Moment, den 0021_project_secrets.sql fuer
// jedes neue Fan-Out-Ziel beschreibt.
//
// DIE PRUEFUNG IST ZUR LAUFZEIT NOETIG UND NICHT NUR IM TYPSYSTEM: TypeScript prueft
// ueberzaehlige Eigenschaften nur an OBJEKT-LITERALEN. Ein Wert, der durch eine
// Variable, einen Cast oder aus JSON hereinkommt, traegt seine Zusatzfelder
// unbemerkt — und liefe ohne diese Pruefung in die verschluesselte Spalte.
//
// ---------------------------------------------------------------------------
// WIRFT NIE — beide Richtungen geben ein DISKRIMINIERTES ERGEBNIS zurueck.
//
// DIE HARTE AUFLAGE LIEGT AUF DER LESE-SEITE: Der spaetere Lesepfad ist der Ingest
// (capi/token.ts, getCapiConfigByTrackingKey), und dort gilt das
// INGEST-204-CONTAINMENT — ein Wurf braeche die zugesicherte leere 204.
//
// DIE SCHREIB-SEITE HAT KEINE VERGLEICHBARE AUFLAGE (sie laeuft in einer
// Server-Action, wo safeAction jeden Wurf faengt) und ist TROTZDEM symmetrisch
// gebaut: Auflage (3) verlangt vom Schreiber eine ZUSICHERUNG ueber seine Ausgabe.
// Kann er sie fuer eine Eingabe nicht geben, ist das ein Ergebnis und kein Absturz —
// und der Betreiber bekommt eine praezise Meldung statt eines gefangenen Wurfs.
// ===========================================================================

/** Die Fassungsmarke DIESER Form. Nicht zu verwechseln mit der des Chiffrats. */
const PAYLOAD_VERSION = "p1";

/** Das Trennzeichen der fuenf Teile. */
const SEPARATOR = ".";

/** Die Zahl der Teile. Genau fuenf — nicht mehr, nicht weniger. */
const PART_COUNT = 5;

/**
 * Der Zeichenvorrat der vier hinteren Teile. GEPRUEFT VOR DEM DEKODIEREN, weil
 * Buffer.from(..., "base64url") ungueltige Zeichen still ueberspringt und damit aus
 * Muell einen Wert machte, statt ihn abzuweisen.
 */
const B64URL_PATTERN = /^[A-Za-z0-9_-]*$/;

/** Ein Zeitpunkt in der Form, in der er hier abgelegt wird: reine Dezimalziffern. */
const EPOCH_PATTERN = /^[0-9]+$/;

/**
 * Der Text, der im fuenften Teil "unbekannt" bedeutet.
 *
 * ER KANN MIT KEINEM ECHTEN WERT KOLLIDIEREN: ein abgelegter Zeitpunkt besteht
 * ausschliesslich aus Dezimalziffern, dieser Text enthaelt keine.
 */
const REFRESH_EXPIRY_UNKNOWN = "unknown";

/** Die erlaubten Feldnamen, abschliessend. Ein Name mehr ist ein Diff an dieser Datei. */
const ALLOWED_FIELDS = [
  "accessToken",
  "accessTokenExpiresAt",
  "refreshToken",
  "refreshTokenExpiresAt",
] as const;

/**
 * Wann das Erneuerungs-Token ablaeuft — oder dass es NICHT BEKANNT ist.
 *
 * "unknown" IST EIN EIGENER ZUSTAND UND KEIN FEHLENDES FELD — UND DIESE BEGRUENDUNG
 * HAENGT NICHT AN DER HAEUFIGKEIT: Ein benannter Zustand trennt "der Anbieter hat den
 * Ablauf NICHT GELIEFERT" von "die abgelegte Zeichenkette ist KAPUTT". Ein schlicht
 * fehlendes Feld traegt diese Unterscheidung nicht, gleichgueltig welcher der beiden
 * Faelle der haeufigere ist.
 *
 * WER DEN ZUSTAND FUER UEBERFLUESSIG HAELT, LIEST ZUERST DIESEN SATZ: Er wird
 * gebraucht, solange nicht gemessen ist, dass JEDER Anbieter dieses Rahmens den Ablauf
 * liefert. Fuer LinkedIn ist er NICHT erhoben — docs/ziel-befunde.md fuehrt dort
 * zwoelf Monate als BEOBACHTUNG an der Oberflaeche des Generators, nicht als
 * gemessenes Antwortfeld (Teil (w)), und die Auflage "AUSGEGEBEN IST NICHT
 * EINGELOEST" ist fuer LinkedIn offen (Teil (bz)).
 *
 * FUER GOOGLE IST DAS FELD DA — AUF ZWEI UNABHAENGIGEN WEGEN BELEGT, JE MIT EIGENER
 * PROVENIENZ:
 *
 *   DAS FELD HEISST refresh_token_expires_in und traegt eine RESTDAUER in Sekunden,
 *   keinen Zeitpunkt. GELESEN 2026-08-27 (docs/ziel-befunde.md, Google-Abschnitt,
 *   Teil (bc)).
 *
 *   ES KOMMT IN UNSEREM BEREICH. Messung C gegen den Token-Endpunkt trug es in BEIDEN
 *   Antworten; der Aufruf betraf den Data-Manager-Bereich. GEMESSEN 2026-08-28
 *   (OWNER), docs/ziel-befunde.md, Teil (bx).
 *
 *   UND ES KOMMT AUCH BEI DER ERNEUERUNG — an unserem eigenen Produktivpfad: Die
 *   zweite Uhr hat sich zwischen zwei Laeufen bewegt (epochSeconds 1788601501 ->
 *   1788601500). Bewegen kann sie sich nur, wenn die Antwort eine brauchbare Restdauer
 *   trug, denn sonst reicht toRefreshedPayload den abgelegten Wert byte-gleich durch.
 *   DIE ZWEI ZEITPUNKTE SIND GEMESSEN 2026-08-29 (OWNER) an der ausgelieferten
 *   Anwendung; DIESER SCHLUSS DARAUS IST GERECHNET UND KEINE ZWEITE BEOBACHTUNG —
 *   docs/aktiver-stand.md, VERMERK 6, Ableitung 1, haelt beides getrennt.
 *
 * WAS DAMIT AUSDRUECKLICH NICHT BEHAUPTET IST: dass das Feld IMMER kommt. Zwei
 * ERKLAERUNGEN tragen die Beobachtung gleich gut — der Anbieter setzt es generell, und
 * seine gelesene Bedingung ("only set when the user grants time-based access",
 * Teil (bc)) ist enger formuliert als sein Verhalten; ODER er setzt es, WEIL die
 * Anwendung im Publishing-Status "Testing" steht. Beide Messungen liefen in EINEM
 * Status und trennen die zwei nicht (Teil (bx)). Mit einer Verifizierung koennte
 * "unknown" auch fuer Google zum Normalfall werden — der Zustand bleibt gebraucht.
 */
export type RefreshTokenExpiry =
  | { kind: "at"; epochSeconds: number }
  | { kind: "unknown" };

/**
 * Die Nutzlast. VIER Felder, fest.
 *
 * WARUM VIER UND NICHT DREI — die Zwei-Uhren-Lage ist bei BEIDEN bisher gelesenen
 * Anbietern belegt: Google gibt dem Zugangsdatum eine Stunde und dem
 * Erneuerungs-Token im Testing-Zustand sieben Tage; LinkedIn gibt zwei Monate gegen
 * zwoelf. EIN einzelnes Ablauf-Feld koennte "abgelaufen, aber erneuerbar" nicht von
 * "endgueltig weg" trennen — und das ist der Unterschied zwischen einem stillen
 * Hintergrund-Refresh und einer Ruecksprache mit dem Kunden.
 *
 * WAS BEWUSST FEHLT: der ZUGRIFFSBEREICH. Er wird zum Senden nicht gebraucht (er ist
 * eine Eigenschaft der Autorisierung, nicht des Aufrufs) und ist je Ziel im Code
 * festgelegt, nicht je Zeile verschieden. Braucht ein Ziel ihn je Kunde, ist das eine
 * Feld-Ergaenzung — also der sichtbare Schritt, den der feste Satz erzwingt.
 */
export type OAuthPayload = {
  /** Das Zugangsdatum selbst. Nicht leer. */
  accessToken: string;
  /** Sein Ablauf als ABSOLUTER Zeitpunkt: ganze Sekunden seit Epoche, nicht negativ. */
  accessTokenExpiresAt: number;
  /** Das Erneuerungs-Token. Nicht leer. */
  refreshToken: string;
  /** Der Ablauf des Erneuerungs-Tokens — oder der benannte Zustand "unbekannt". */
  refreshTokenExpiresAt: RefreshTokenExpiry;
};

/**
 * Das Ergebnis des Schreibens.
 * - bad_field: ein Feld fehlt, ist leer, hat den falschen Typ, traegt einen
 *              unbrauchbaren Zeitpunkt — ODER die Nutzlast traegt ein Feld, das
 *              nicht zum festen Satz gehoert. `field` benennt das erste gefundene.
 */
export type FormatPayloadResult =
  | { kind: "ok"; value: string }
  | { kind: "bad_field"; field: string };

/**
 * Das Ergebnis des Lesens. ZWEI Fehlzustaende, bewusst getrennt — sie fallen nicht
 * zusammen, weil ihre Ursachen verschieden sind:
 * - unknown_version: die Zeichenkette ist EINE Nutzlast dieser Familie, aber aus einer
 *                    Fassung, die dieser Code nicht kennt. DAS IST DER FALL "aeltere
 *                    oder neuere Feldmenge" und wird VOR jedem Zerlegen erkannt.
 * - bad_format:      die Zeichenkette ist ueberhaupt keine Nutzlast dieser Form —
 *                    falsche Teilezahl, unzulaessiger Zeichenvorrat, leeres
 *                    Pflichtfeld, unbrauchbarer Zeitpunkt.
 */
export type ParsePayloadResult =
  | { kind: "ok"; value: OAuthPayload }
  | { kind: "unknown_version" }
  | { kind: "bad_format" };

/** base64url ohne Auffuellzeichen — der Vorrat der vier hinteren Teile. */
function toB64Url(text: string): string {
  return Buffer.from(text, "utf8").toString("base64url");
}

/** Zerlegt einen Teil zurueck. Der Vorrat ist VORHER geprueft (s. B64URL_PATTERN). */
function fromB64Url(part: string): string {
  return Buffer.from(part, "base64url").toString("utf8");
}

/** Ein brauchbarer Zeitpunkt: ganze Zahl, endlich, nicht negativ. */
function isEpochSeconds(value: unknown): value is number {
  return typeof value === "number" && Number.isInteger(value) && value >= 0;
}

/**
 * Schreibt die Nutzlast in EINE Zeichenkette.
 *
 * WIRFT NIE (s. Kopf).
 */
export function formatOAuthPayload(payload: OAuthPayload): FormatPayloadResult {
  // Die Eingabe selbst, bevor irgendein Feld angefasst wird. Ein Nicht-Objekt kaeme
  // nur ueber einen Cast herein — und genau der ist der Fall, den die Laufzeit-Pruefung
  // abdeckt (s. Kopf, "DIE PRUEFUNG IST ZUR LAUFZEIT NOETIG").
  if (typeof payload !== "object" || payload === null) {
    return { kind: "bad_field", field: "payload" };
  }

  // DIE ABLEHNUNG UNBEKANNTER FELDER. Sie steht VOR jeder anderen Pruefung: Ein
  // Aufrufer, der ein fremdes Feld mitbringt, soll das erfahren und nicht erst an
  // einem anderen Fehler scheitern.
  for (const name of Object.keys(payload)) {
    if (!(ALLOWED_FIELDS as readonly string[]).includes(name)) {
      return { kind: "bad_field", field: name };
    }
  }

  const { accessToken, accessTokenExpiresAt, refreshToken, refreshTokenExpiresAt } =
    payload;

  if (typeof accessToken !== "string" || accessToken.length === 0) {
    return { kind: "bad_field", field: "accessToken" };
  }
  if (!isEpochSeconds(accessTokenExpiresAt)) {
    return { kind: "bad_field", field: "accessTokenExpiresAt" };
  }
  if (typeof refreshToken !== "string" || refreshToken.length === 0) {
    return { kind: "bad_field", field: "refreshToken" };
  }
  if (
    typeof refreshTokenExpiresAt !== "object" ||
    refreshTokenExpiresAt === null
  ) {
    return { kind: "bad_field", field: "refreshTokenExpiresAt" };
  }

  let refreshPart: string;
  if (refreshTokenExpiresAt.kind === "unknown") {
    refreshPart = REFRESH_EXPIRY_UNKNOWN;
  } else if (
    refreshTokenExpiresAt.kind === "at" &&
    isEpochSeconds(refreshTokenExpiresAt.epochSeconds)
  ) {
    refreshPart = String(refreshTokenExpiresAt.epochSeconds);
  } else {
    return { kind: "bad_field", field: "refreshTokenExpiresAt" };
  }

  return {
    kind: "ok",
    value: [
      PAYLOAD_VERSION,
      toB64Url(accessToken),
      toB64Url(String(accessTokenExpiresAt)),
      toB64Url(refreshToken),
      toB64Url(refreshPart),
    ].join(SEPARATOR),
  };
}

/**
 * Liest eine Zeichenkette dieser Form zurueck.
 *
 * WIRFT NIE (s. Kopf).
 */
export function parseOAuthPayload(payload: string): ParsePayloadResult {
  if (typeof payload !== "string") return { kind: "bad_format" };

  const parts = payload.split(SEPARATOR);
  if (parts.length !== PART_COUNT) return { kind: "bad_format" };

  // DIE FASSUNG ZUERST. Eine unbekannte Fassung ist KEIN Formfehler: die Teilezahl
  // kann stimmen und die Bedeutung der Teile trotzdem eine andere sein. Wer beides
  // zusammenzieht, meldet "kaputt", wo "aus einer anderen Fassung" richtig waere.
  const [version, rawAccess, rawAccessExpiry, rawRefresh, rawRefreshExpiry] = parts;
  if (version !== PAYLOAD_VERSION) return { kind: "unknown_version" };

  for (const part of [rawAccess, rawAccessExpiry, rawRefresh, rawRefreshExpiry]) {
    if (!B64URL_PATTERN.test(part)) return { kind: "bad_format" };
  }

  const accessToken = fromB64Url(rawAccess);
  const accessExpiryText = fromB64Url(rawAccessExpiry);
  const refreshToken = fromB64Url(rawRefresh);
  const refreshExpiryText = fromB64Url(rawRefreshExpiry);

  if (accessToken.length === 0) return { kind: "bad_format" };
  if (refreshToken.length === 0) return { kind: "bad_format" };
  if (!EPOCH_PATTERN.test(accessExpiryText)) return { kind: "bad_format" };

  const accessTokenExpiresAt = Number(accessExpiryText);
  if (!isEpochSeconds(accessTokenExpiresAt)) return { kind: "bad_format" };

  let refreshTokenExpiresAt: RefreshTokenExpiry;
  if (refreshExpiryText === REFRESH_EXPIRY_UNKNOWN) {
    refreshTokenExpiresAt = { kind: "unknown" };
  } else if (EPOCH_PATTERN.test(refreshExpiryText)) {
    const seconds = Number(refreshExpiryText);
    if (!isEpochSeconds(seconds)) return { kind: "bad_format" };
    refreshTokenExpiresAt = { kind: "at", epochSeconds: seconds };
  } else {
    return { kind: "bad_format" };
  }

  return {
    kind: "ok",
    value: {
      accessToken,
      accessTokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt,
    },
  };
}
