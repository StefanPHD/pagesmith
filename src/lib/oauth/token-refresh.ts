import "server-only";
import { createAdminClient } from "@/lib/supabase/admin";
import { decryptSecret, encryptSecret } from "@/lib/secrets/cipher";
import {
  formatOAuthPayload,
  parseOAuthPayload,
} from "@/lib/secrets/oauth-payload";
import type { RefreshTokenExpiry } from "@/lib/secrets/oauth-payload";
import { readTokenExchangeConfig } from "@/lib/oauth/google-token";
import {
  exchangeRefreshToken,
  toRefreshedPayload,
} from "@/lib/oauth/google-refresh";

// ===========================================================================
// DIE ERNEUERUNG EINES ABGELEGTEN ZUGANGSDATUMS — DER ANBIETER-NEUTRALE RAHMEN
// (Phase 11.2, Scheibe 1a des Schnitts; docs/aktiver-stand.md, Abschnitt "Die
// Erneuerung des Zugangsdatums").
//
// WAS DIESE DATEI IST: EINE Bibliotheksfunktion. Sie liest die Geheimnis-Zeile,
// dechiffriert sie, prueft ZWEI Uhren, ruft bei Bedarf den Anbieter, chiffriert das
// Ergebnis und schreibt die Zeile zurueck. Der Rahmen ist ANBIETER-NEUTRAL mit EINEM
// Google-Zweig; LinkedIn erbt ihn spaeter, wird hier aber NICHT angefasst.
//
// ---------------------------------------------------------------------------
// SIE PRUEFT KEIN EIGENTUM. DER AUFRUFER MUSS ES TUN — VOR DEM AUFRUF.
//
// DAS IST DIE BAUFORM VON createAdminClient (src/lib/supabase/admin.ts), samt ihrem
// Preis, und beides gehoert benannt: "Keine Cookies/Session: dieser Client traegt
// KEINE User-Identitaet, er umgeht RLS bewusst. Aufrufer muessen die Autorisierung
// selbst sicherstellen."
//
// WARUM DAS HIER SCHAERFER WIEGT ALS IRGENDWO SONST: project_secrets traegt RLS aktiv
// und KEINE EINZIGE POLICY (docs/immer-beachten.md, "GRANTS SCHUETZEN NICHTS — RLS IST
// DIE EINZIGE TRAGENDE SCHICHT"). Es gibt also keine zweite Schicht, die einen
// fehlenden Gate-Aufruf noch abfinge. WER DIESE FUNKTION OHNE EIGENTUMS-GATE RUFT,
// HAT KEIN EIGENTUMS-GATE, UND NICHTS WIRD DAVON ROT.
//
// DER HEUTIGE AUFRUFER IST src/app/api/oauth/google/refresh/route.ts, und dort steht
// das Gate VOR dem Aufruf. Ein zweiter Aufrufer bringt sein eigenes mit.
//
// ---------------------------------------------------------------------------
// KEIN AUFRUFER AUF DEM INGEST-PFAD. ingest.ts, die vier *-forward.ts, token.ts und
// target-adapters.ts sind von dieser Scheibe UNBERUEHRT; ein Waechter in
// token-refresh.test.ts haelt das am Quelltext fest.
//
// KEIN WIEDERKEHRENDER AUFRUF. Diese Scheibe baut KEINEN Ausloeser — kein Intervall,
// kein Poll, kein Effekt. Der automatische Ausloeser ist Scheibe 1b (bindende
// Entscheidung (7) in docs/aktiver-stand.md). WER IHN BAUT, LIEST ZUERST "EIN
// WIEDERKEHRENDER AUFRUF GEGEN EINEN EXTERNEN DIENST HAENGT AN DER SICHTBARKEIT DES
// BEREICHS, DER IHN BRAUCHT" (docs/immer-beachten.md).
//
// UND DER SATZ, DER SONST FEHLT (bindende Entscheidung (7), GRENZE): 1a ALLEIN HAELT
// KEINEN ZUGANG AM LEBEN. Eine Funktion, die niemand ruft, erneuert nichts.
//
// KEINE UMLAUTE IM QUELLTEXT — ae/oe/ue/ss, s. den Kopf von
// lib/oauth/google-authorize.ts.
//
// ---------------------------------------------------------------------------
// DER FEHLZUSTAND, GEGEN DEN GEBAUT WIRD, IST AUF DREI EBENEN GLEICHZEITIG STUMM
// (GEMESSEN am Repo, CC, 2026-08-29; docs/aktiver-stand.md, "Warum sie zuerst kommt"):
// die vier Adapter loggen nur errorName, das Ergebnis des Fan-Outs wird am Aufrufort
// weder gebunden noch gelesen, und der Ingest antwortet in jedem Pfad mit einer
// leeren 204. FOLGE: Ein Transport ohne Erneuerung sendet EINE STUNDE und schweigt
// danach — sichtbar erst beim Kunden, an fehlenden Conversions.
// Ein Google-Zugangsdatum lebt 3599 Sekunden (GEMESSEN 2026-08-28, OWNER;
// docs/ziel-befunde.md, Teil (bw)).
//
// ---------------------------------------------------------------------------
// DER CHIFFRIER-SCHLUESSEL ROTIERT NEBENBEI MIT — UND DAS IST ERWUENSCHT
// (Festlegung 4 des Zuschnitts). Wird eine Zeile hier neu geschrieben, nimmt
// encryptSecret immer die AKTIVE Kennung aus SECRET_ENC_ACTIVE_KEY_ID. Eine erneuerte
// Zeile traegt danach den heute aktiven Schluessel, auch wenn sie unter einem aelteren
// angelegt wurde. WER DAS FUER EINEN FEHLER HAELT UND EINEN RIEGEL DAGEGEN BAUT,
// nimmt dem System den einzigen Weg, unter dem eine alte Kennung je leerlaeuft.
// Die Kennungs-Regel aus dem Kopf von secrets/cipher.ts bleibt davon unberuehrt: eine
// Kennung wird NIE fuer einen anderen Schluesselwert wiederverwendet.
//
// ---------------------------------------------------------------------------
// KEIN NEBENLAEUFIGKEITS-RIEGEL (Festlegung 3). Keine Sperre auf der Zeile, keine
// Vereinzelung, kein Warten. ZWEI ACHSEN, UND SIE SIND VERSCHIEDEN:
//
//   ACHSE 1 — DIE ROTATION. Google rotiert das Erneuerungs-Token NICHT (GEMESSEN
//   2026-08-28, OWNER, Messung C; docs/ziel-befunde.md, Teil (bv)): dasselbe Token
//   zweimal eingeloest, beide Male 200. Zwei gleichzeitige Laeufe loesen also dasselbe
//   Token doppelt ein, und der Schaden ist ein ueberfluessiger Netzaufruf.
//   GRENZE: Diese Einschaetzung ruht VOLLSTAENDIG auf einer fremden Eigenschaft.
//   Rotierte der Anbieter, waere derselbe Fall ein VERLORENER ZUGANG. Er kann das
//   aendern, ohne dass hier etwas rot wird. FUER LINKEDIN IST DIE NICHT-ROTATION NICHT
//   GEMESSEN — wer den Rahmen um einen zweiten Zweig erweitert, misst dort eigens.
//
//   ACHSE 2 — DIE REIHENFOLGE. UNGEMESSEN. Ausstellungs- und Schreibreihenfolge
//   koennen divergieren: A stellt aus, B stellt aus, B schreibt, A schreibt — dann
//   steht das AELTERE Token in der Zeile. Invalidierte der Anbieter das vorige bei
//   Ausstellung eines neuen, stuende dort ein TOTES Token mit einem Ablaufzeitpunkt in
//   der ZUKUNFT, und der Vorlauf unten erneuerte es nicht.
//   OB DER ANBIETER DAS TUT, IST NICHT GEMESSEN. Diese Achse ist NEU aufgeschrieben
//   und steht ausserdem als zweite Achse an Vorrats-Eintrag 9 in
//   docs/aktiver-stand.md. GEMELDET, NICHT GEBAUT.
//
//   WAS DEN FALL HEUTE KLEIN HAELT UND MORGEN NICHT MEHR: Der einzige Aufrufer ist
//   eine Route, die ein Mensch ausloest. Nebenlaeufigkeit ist damit nur durch zwei
//   gleichzeitige Klicks herstellbar. MIT SCHEIBE 1b WIRD DER FALL REAL.
//
// ---------------------------------------------------------------------------
// EINE NAMENSKOLLISION, DIE AUSDRUECKLICH BENANNT WIRD, WEIL SIE SONST BEIM NAECHSTEN
// UMBAU EINGEEBNET WIRD:
//
//   ZWEI VERSCHIEDENE ZUSTAENDE HEISSEN BEIDE "bad_format", UND SIE BILDEN AUF
//   VERSCHIEDENE FAELLE AB.
//
//   · DecryptResult.bad_format (secrets/cipher.ts) -> misconfigured
//   · ParsePayloadResult.bad_format (secrets/oauth-payload.ts) -> dead
//
// DAS IST KEIN VERSEHEN UND KEINE INKONSEQUENZ: Der erste sagt, die Zeichenkette ist
// ueberhaupt kein Chiffrat DIESER Form — das trifft auch eine Zeile aus einer anderen
// Fassung oder einer anderen Umgebung, und dort holt man einen Betreiber. Der zweite
// sagt, das Chiffrat war einwandfrei und der KLARTEXT darin ist keine Nutzlast — die
// Zeile ist inhaltlich kaputt, und nur eine Neu-Autorisierung heilt das.
//
// DAMIT DIE KOLLISION AM AUSGANG NICHT WIEDERKEHRT, TRAGEN DIE reason-WERTE EINEN
// PRAEFIX: decrypt_bad_format gegen parse_bad_format. Zwei gleichnamige Zustaende
// duerfen nicht zu einem gleichnamigen Ausgang werden — das ist dieselbe Figur wie
// "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
// OBERFLAECHEN-PROBLEM, KEIN TESTPROBLEM" (docs/immer-beachten.md), nur an einem
// Ergebnistyp statt an einer Oberflaeche: Wer die Doppeldeutigkeit im Instrument
// (hier: im Test) repariert, laesst sie in der Sache stehen.
// EIN Test haelt BEIDE Abbildungen GEMEINSAM fest — getrennt gefuehrt wuerde beim
// naechsten Umbau eine von beiden nachgezogen und die andere nicht.
// ===========================================================================

/**
 * DER VORLAUF. FUENF MINUTEN (Festlegung 1 des Zuschnitts).
 *
 * Erneuert wird, wenn accessTokenExpiresAt INNERHALB des Vorlaufs liegt — nicht erst
 * bei Ablauf. Ein bereits ABGELAUFENES Zugangsdatum liegt ebenfalls darin; die
 * Bedingung unten ist deshalb eine Differenz und keine Bereichspruefung.
 *
 * KEINE DRIFT-BEHANDLUNG, und das ist kein Versaeumnis: Der Wert entsteht aus UNSERER
 * eigenen Uhr (der Aufrufer hat ihn beim Ablegen aus receivedAt + expires_in
 * gerechnet); wir vergleichen unsere gegen unsere. Ein Ausgleich gegen die Uhr des
 * Anbieters haette hier keinen Gegenstand.
 */
export const REFRESH_LEAD_SECONDS = 300;

/**
 * Die Ziele, fuer die dieser Rahmen heute einen Zweig hat.
 *
 * 'google' STEHT HIER ALS RAHMEN-LOKALE KONSTANTE UND NICHT IN TRACKING_TARGETS —
 * dieselbe Lage und dieselbe Entscheidung wie in
 * src/app/api/oauth/google/callback/route.ts (OWNER/ARCHITEKT, 2026-08-27). Die
 * Aufnahme in TRACKING_TARGETS ist eine eigene Scheibe (3 im Schnitt der Phase).
 *
 * LINKEDIN FEHLT ABSICHTLICH. Der Rahmen ist so gebaut, dass ein zweiter Zweig keine
 * Umstellung verlangt — aber er erbt KEINE Messung: Nicht-Rotation, Verhalten der
 * zweiten Uhr und die Anwesenheit eines Ablauf-Feldes sind fuer LinkedIn NICHT
 * erhoben (docs/ziel-befunde.md, Teil (bz)).
 */
const SUPPORTED_TARGETS = new Set<string>(["google"]);

/**
 * Nochmal versuchen. Netz, Timeout, 5xx — und alles, was der Anbieter unerwartet
 * antwortet.
 *
 * "Netz, Timeout, 5xx" IM ZUSCHNITT BESCHREIBT DEN ANBIETER-FALL UND IST KEINE
 * ABSCHLIESSENDE LISTE. Der Satz steht hier, damit die naechste Runde "read" nicht
 * fuer einen Verstoss gegen den Zuschnitt haelt: Die Sortier-Achse des Ergebnistyps
 * ist die REAKTION des Aufrufers, nicht die Herkunft des Fehlers. Alles, worauf
 * "nochmal versuchen" die richtige Reaktion ist, gehoert hierher — gleich ob es vom
 * Anbieter, vom Netz oder von unserer eigenen Datenbank kommt.
 */
export type RefreshRetryReason =
  | "timeout"
  | "network"
  | "server"
  | "unexpected"
  | "read";

/** Der Kunde muss neu autorisieren. */
export type RefreshDeadReason =
  | "no_row"
  | "decrypt_auth_failed"
  | "parse_unknown_version"
  | "parse_bad_format"
  | "refresh_token_expired"
  | "invalid_grant";

/** Ein BETREIBER-Problem. Kein Kunde wird deswegen durch einen Fluss geschickt. */
export type RefreshMisconfiguredReason =
  | "unknown_target"
  | "no_secret_enc"
  | "decrypt_no_key"
  | "decrypt_bad_key"
  | "decrypt_bad_format"
  | "decrypt_unknown_key"
  | "missing_env"
  | "format_failed"
  | "encrypt_no_key"
  | "encrypt_bad_key"
  | "write_failed";

/**
 * DAS ERGEBNIS — VIER ZUSTAENDE, NACH REAKTION SORTIERT.
 *
 * DIE SORTIER-ACHSE IST DER GANZE PUNKT: Die Zustaende sind danach geschnitten, WAS
 * DER AUFRUFER TUN SOLL — nicht danach, was schiefging. Eine Sortierung nach
 * Fehlerursache zwaenge jeden Aufrufer, die Zuordnung selbst zu treffen, und zwar
 * jeder fuer sich und jeder anders.
 *
 * · ok            — erneuert, ODER das alte Zugangsdatum reichte noch. DIE ZWEI FAELLE
 *                   WERDEN IM ERGEBNIS NICHT GETRENNT, weil der Aufrufer in beiden
 *                   dasselbe tut.
 * · retry         — Netz, Timeout, 5xx.
 * · dead          — der Kunde muss neu autorisieren.
 * · misconfigured — ein BETREIBER-Problem, kein Kunden-Problem, und genau deshalb ein
 *                   eigener Zustand: Wer ihn in dead einebnet, schickt den Kunden
 *                   durch einen Autorisierungs-Fluss, der nichts heilt.
 *
 * JEDER FEHLZUSTAND TRAEGT EINEN BENANNTEN reason. KEIN FREMDTEXT NACH AUSSEN —
 * weder eine Anbieter-Meldung noch ein Fehler-message. Saemtliche reason-Werte oben
 * sind SELBSTVERGEBEN; keiner stammt aus einer fremden Antwort.
 *
 * ok TRAEGT DIE ZWEI ABLAUFZEITPUNKTE UND KEINE TOKEN. Die Zeitpunkte sind keine
 * Geheimnisse, und sie sind der einzige Weg, sie ueberhaupt zu sehen: sie liegen in
 * project_secrets.secret_enc und sind damit fuer jeden ausser dem Dechiffrier-Pfad
 * unlesbar.
 */
export type RefreshResult =
  | {
      kind: "ok";
      accessTokenExpiresAt: number;
      refreshTokenExpiresAt: RefreshTokenExpiry;
    }
  | { kind: "retry"; reason: RefreshRetryReason }
  | { kind: "dead"; reason: RefreshDeadReason }
  | { kind: "misconfigured"; reason: RefreshMisconfiguredReason };

/**
 * DIE ABBILDUNG DER SECHS decryptSecret-ZUSTAENDE.
 *
 * SIE DUERFEN NICHT AUF "ging nicht" EINGEEBNET WERDEN (Zuschnitt). Zwei Zuordnungen
 * sind dort festgelegt, drei sind am 2026-08-29 vom ARCHITEKTEN entschieden worden:
 *
 * · unknown_key -> misconfigured. Der Kopf nennt eine Kennung, die DIESER Umgebung
 *   nicht bekannt ist — das ist "andere Umgebung", nicht "Zugang tot". (Zuschnitt.)
 * · auth_failed -> dead. (Zuschnitt.)
 * · no_key, bad_key -> misconfigured. Der Zustand nennt genau das, was der
 *   misconfigured-Zweig des Zuschnitts als Beispiel fuehrt: "Chiffrier-Schluessel weg,
 *   Env fehlt". (ARCHITEKT, 2026-08-29.)
 * · bad_format -> misconfigured. DER GRUND IST DIE REVERSIBILITAET, NICHT DIE
 *   KOSTEN-ASYMMETRIE: misconfigured holt einen Betreiber an die Zeile, und der kann
 *   danach immer noch zur Neu-Autorisierung schicken; umgekehrt geht es nicht. Dazu
 *   deckt bad_format auch den Fall einer KUENFTIGEN FASSUNG unter altem Code-Stand —
 *   eine Zeichenkette, die kein Chiffrat DIESER Form ist, kann eine aus einer
 *   spaeteren sein. (ARCHITEKT, 2026-08-29.)
 */
function fromDecrypt(
  kind: "no_key" | "bad_key" | "bad_format" | "unknown_key" | "auth_failed",
): RefreshResult {
  if (kind === "auth_failed") {
    return { kind: "dead", reason: "decrypt_auth_failed" };
  }
  if (kind === "unknown_key") {
    return { kind: "misconfigured", reason: "decrypt_unknown_key" };
  }
  if (kind === "no_key") {
    return { kind: "misconfigured", reason: "decrypt_no_key" };
  }
  if (kind === "bad_key") {
    return { kind: "misconfigured", reason: "decrypt_bad_key" };
  }
  return { kind: "misconfigured", reason: "decrypt_bad_format" };
}

/**
 * Erneuert das abgelegte Zugangsdatum EINES Projekts fuer EIN Ziel.
 *
 * WIRFT NIE. Jeder Ausgang ist einer der vier Zustaende. Das ist heute eine
 * Eigenschaft und keine Auflage — sie wird eine, sobald ein Aufrufer auf dem
 * Ingest-Pfad entsteht, wo das 204-CONTAINMENT gilt.
 *
 * DER AUFRUFER HAT DAS EIGENTUM GEPRUEFT. S. den Dateikopf.
 *
 * DIE REIHENFOLGE DER SCHRITTE IST TRAGEND und wird unten je Schritt begruendet.
 */
export async function refreshAccessToken(params: {
  projectId: string;
  target: string;
}): Promise<RefreshResult> {
  const { projectId, target } = params;

  // (1) DAS ZIEL. EIN UNBEKANNTES ZIEL BEKOMMT EINEN BENANNTEN AUSGANG — kein
  //     Durchfallen, kein undefined, kein Wurf. Ohne diesen Zweig liefe ein Tippfehler
  //     bis in die Datenbank, faende dort keine Zeile und meldete "der Kunde muss neu
  //     autorisieren" fuer ein Ziel, das es nicht gibt.
  if (!SUPPORTED_TARGETS.has(target)) {
    console.error("[oauth/token-refresh] unknown_target", { projectId, target });
    return { kind: "misconfigured", reason: "unknown_target" };
  }

  // DIE UHR WIRD GENAU EINMAL GELESEN und fuer BEIDE Uhren-Pruefungen UND fuer die
  // zwei Umrechnungen der Antwort benutzt. Zweimal gelesen haetten die Zeitpunkte
  // verschiedene Bezugspunkte, und die Differenz waere spaeter unerklaerlich.
  const now = Math.floor(Date.now() / 1000);

  // (2) DIE ZEILE. Admin-Client (service_role, bypassed RLS) — der einzige Weg an
  //     project_secrets, die RLS aktiv und KEINE Policy traegt.
  //     { data, error } IMMER destrukturiert: sonst wird ein Fehler still verschluckt
  //     und sieht aus wie "keine Zeile" (docs/immer-beachten.md, "POSTGREST-QUERIES +
  //     ECHTE PRIMAERSCHLUESSEL").
  //     ES WIRD AUSSCHLIESSLICH secret_enc SELEKTIERT. Die Klartext-Spalte secret wird
  //     NICHT gelesen — kein Klartext-Geheimnis kommt in diesen Pfad.
  const admin = createAdminClient();
  const { data: row, error: readError } = await admin
    .from("project_secrets")
    .select("secret_enc")
    .eq("project_id", projectId)
    .eq("target", target)
    .maybeSingle();

  if (readError) {
    // NUR die eigene Stufe, nie message/details/hint: dort kann der Anbieter einen
    // verletzenden Wert zurueckspiegeln.
    //
    // EIN LESEFEHLER IST retry, EIN SCHREIBFEHLER IST misconfigured (ARCHITEKT,
    // 2026-08-29) — und die Begruendung ist die UMKEHRUNG derjenigen an Schritt (13):
    // Beim SCHREIBEN ist die Erneuerung bereits VERBRAUCHT, dort verdeckt ein stiller
    // Wiederholungslauf eine strukturelle Ursache. BEIM LESEN IST NICHTS VERBRAUCHT
    // UND KEIN NEBENEFFEKT EINGETRETEN — es ist der erste Datenbank-Zugriff dieser
    // Funktion, kein Netzruf hat stattgefunden, keine Zeile ist angefasst. Ein zweiter
    // Versuch ist folgenlos, und "nochmal versuchen" ist damit die richtige Reaktion.
    //
    // "read" IST KEIN VERSTOSS GEGEN DIE ZUSCHNITT-ZEILE "retry — Netz, Timeout, 5xx":
    // die beschreibt den ANBIETER-Fall und ist keine abschliessende Liste. S. den Kopf
    // von RefreshRetryReason.
    console.error("[oauth/token-refresh] read", { projectId, target });
    return { kind: "retry", reason: "read" };
  }

  // (3) "KEINE ZEILE" UND "ZEILE OHNE CHIFFRAT" WERDEN GETRENNT (ARCHITEKT,
  //     2026-08-29), und der Grund ist der ZWEITE Anbieter, nicht dieser:
  //     LinkedIn-Zeilen tragen heute KLARTEXT im Feld secret. Erbt LinkedIn diesen
  //     Rahmen, meldete eine eingeebnete Fassung "der Kunde muss neu autorisieren"
  //     fuer eine INTAKTE Zeile in Alt-Form. Das ist der teuerste Fehlgriff, den
  //     dieser Pfad hat.
  //     KEINE ZEILE ist dagegen wirklich "nichts abgelegt" — dort ist dead richtig.
  if (!row) {
    console.error("[oauth/token-refresh] no_row", { projectId, target });
    return { kind: "dead", reason: "no_row" };
  }

  const secretEnc = (row as { secret_enc?: unknown }).secret_enc;
  if (typeof secretEnc !== "string" || secretEnc.length === 0) {
    console.error("[oauth/token-refresh] no_secret_enc", { projectId, target });
    return { kind: "misconfigured", reason: "no_secret_enc" };
  }

  // (4) DAS DECHIFFRIEREN. Die Abbildung der sechs Zustaende steht an fromDecrypt.
  const decrypted = decryptSecret(secretEnc);
  if (decrypted.kind !== "ok") {
    const mapped = fromDecrypt(decrypted.kind);
    console.error("[oauth/token-refresh] decrypt", {
      projectId,
      target,
      reason: mapped.kind === "ok" ? null : mapped.reason,
    });
    return mapped;
  }

  // (5) DAS LESEN DER NUTZLAST. unknown_version und bad_format sind BEIDE dead — und
  //     zwar aus verschiedenen Gruenden, die der reason auseinanderhaelt: das eine ist
  //     eine fremde Fassung, das andere eine kaputte Zeichenkette. Beide heilt nur
  //     eine neue Ablage.
  //     ZUR NAMENSKOLLISION MIT decrypt_bad_format s. den Dateikopf.
  const parsed = parseOAuthPayload(decrypted.value);
  if (parsed.kind === "unknown_version") {
    console.error("[oauth/token-refresh] parse", {
      projectId,
      target,
      reason: "parse_unknown_version",
    });
    return { kind: "dead", reason: "parse_unknown_version" };
  }
  if (parsed.kind !== "ok") {
    console.error("[oauth/token-refresh] parse", {
      projectId,
      target,
      reason: "parse_bad_format",
    });
    return { kind: "dead", reason: "parse_bad_format" };
  }

  const stored = parsed.value;

  // (6) UHR 2 ZUERST — VOR UHR 1 (ARCHITEKT, 2026-08-29).
  //
  //     IST refreshTokenExpiresAt UEBERSCHRITTEN, IST DER ZUGANG TOT — OHNE
  //     NETZAUFRUF (Festlegung 5). Wer die zweite Uhr nicht abfragt, hat sie gebaut
  //     und nicht benutzt.
  //
  //     DER FALL, DEN DER ZUSCHNITT NICHT REGELT UND DER HIER ENTSCHIEDEN IST: Uhr 2
  //     ueberschritten, Uhr 1 reicht noch. Das Ergebnis ist dead.
  //     FUER DIE BEWEIS-ROUTE IST DAS DIE EHRLICHE AUSKUNFT — der Zugang ist
  //     endgueltig weg, auch wenn das aktuelle Zugangsdatum noch Minuten hat.
  //     FUER EINEN SPAETEREN AUFRUFER AUF DEM TRANSPORTWEG WAERE SIE ES NICHT: dort
  //     koennte noch gesendet werden, solange Uhr 1 laeuft. WER SCHEIBE 4 BAUT, FINDET
  //     DIESEN SATZ HIER UND DEN TEST DANEBEN.
  //
  //     DER ZUSTAND {kind:"unknown"} GILT NIE ALS UEBERSCHRITTEN — der Netzaufruf wird
  //     gemacht (Festlegung 5, ARCHITEKT 2026-08-29). Von zwei unbelegten
  //     Moeglichkeiten wird die gewaehlt, deren Fehlgriff der billigere ist: ein
  //     ueberfluessiger Netzaufruf gegen einen Kunden-Autorisierungsfluss, den niemand
  //     gebraucht haette.
  if (
    stored.refreshTokenExpiresAt.kind === "at" &&
    stored.refreshTokenExpiresAt.epochSeconds <= now
  ) {
    console.error("[oauth/token-refresh] refresh_token_expired", {
      projectId,
      target,
    });
    return { kind: "dead", reason: "refresh_token_expired" };
  }

  // (7) UHR 1. Liegt der Ablauf WEITER weg als der Vorlauf, reicht das alte
  //     Zugangsdatum — kein Netzaufruf, kein Schreibvorgang, Ergebnis ok mit den
  //     ABGELEGTEN Zeitpunkten.
  //     DIE BEDINGUNG IST EINE DIFFERENZ UND KEINE BEREICHSPRUEFUNG: Ist das
  //     Zugangsdatum bereits abgelaufen, ist die Differenz NEGATIV und damit kleiner
  //     als der Vorlauf — es wird erneuert. Eine Formulierung, die nur das Fenster
  //     [now, now+lead] traefe, liesse ein abgelaufenes Datum stehen.
  if (stored.accessTokenExpiresAt - now > REFRESH_LEAD_SECONDS) {
    return {
      kind: "ok",
      accessTokenExpiresAt: stored.accessTokenExpiresAt,
      refreshTokenExpiresAt: stored.refreshTokenExpiresAt,
    };
  }

  // (8) DIE KONFIGURATION. FAIL-LOUD; geloggt wird der NAME der Variablen, nie ihr
  //     Wert.
  //     SIE WIRD AUS google-token.ts BEZOGEN UND NICHT ZWEITGELESEN, und der Preis
  //     gehoert benannt: readTokenExchangeConfig verlangt zusaetzlich
  //     GOOGLE_OAUTH_REDIRECT_URI, die die ERNEUERUNG nicht braucht. Fehlt sie, gilt
  //     diese Funktion als fehlkonfiguriert.
  //     DAS IST DER GUENSTIGERE TAUSCH: Der Kopf von google-token.ts haelt fest, "zwei
  //     Leser derselben Variablen waeren zwei Wahrheiten in dem Moment, in dem einer
  //     von beiden ein trim() bekommt und der andere nicht". Und eine Umgebung ohne
  //     Weiterleitungs-Adresse haette gar kein Zugangsdatum ablegen koennen — sie ist
  //     zu Recht als kaputt gemeldet.
  const config = readTokenExchangeConfig();
  if (config.kind === "missing_config") {
    console.error("[oauth/token-refresh] missing_env", {
      projectId,
      target,
      variable: config.variable,
    });
    return { kind: "misconfigured", reason: "missing_env" };
  }

  // (9) DER ANBIETER-ZWEIG. Heute genau einer; die Auswahl haengt am target, nicht an
  //     einer Verzweigung tief im Code.
  const exchanged = await exchangeRefreshToken({
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    refreshToken: stored.refreshToken,
  });

  if (exchanged.kind === "timeout") {
    console.error("[oauth/token-refresh] provider", {
      projectId,
      target,
      reason: "timeout",
    });
    return { kind: "retry", reason: "timeout" };
  }
  if (exchanged.kind === "network_error") {
    console.error("[oauth/token-refresh] provider", {
      projectId,
      target,
      reason: "network",
    });
    return { kind: "retry", reason: "network" };
  }
  if (exchanged.kind === "http_error") {
    // ---------------------------------------------------------------------
    // 5xx GEWINNT GEGEN invalid_grant (ARCHITEKT, 2026-08-29). invalidGrant zaehlt
    // NUR UNTERHALB VON 500; ab 500 gilt retry/"server", auch wenn der Rumpf
    // invalid_grant nennt.
    //
    // DAS IST KEIN WIDERSPRUCH ZUR AUFLAGE, KEINEN STATUSCODE ZUR BEDINGUNG ZU
    // MACHEN, und der Unterschied ist der ganze Punkt: Verboten war, einen Statuscode
    // als VORBEDINGUNG fuer invalid_grant zu verlangen — also etwa "nur bei 400" —,
    // weil Teil (bd) ausdruecklich festhaelt, dass die Doku fuer diesen Code KEINEN
    // Statuscode nennt und ihn zu uebernehmen hiesse, einen Statuscode von einem
    // Fehlerpfad auf einen anderen zu uebertragen. Unterhalb 500 gilt invalid_grant
    // deshalb bei JEDEM Status. Verboten war NICHT, den Status ueberhaupt zu
    // betrachten.
    //
    // WARUM 500 DIE GRENZE IST: Eine 5xx-Antwort ist PER DEFINITION ein Serverfehler.
    // Dass ihr Rumpf invalid_grant nennt, ist UNGEMESSEN — es ist kein solcher Aufruf
    // gefahren worden. Im unbelegten Fall entscheidet die Asymmetrie: Weiterversuchen
    // ist harmlos, vorzeitiges Aufgeben kostet einen Kunden-Autorisierungsfluss, den
    // niemand gebraucht haette.
    //
    // DIESE FASSUNG ERSETZT DEN FRUEHEREN VORBEHALT AN DIESER STELLE ("wuerde hier als
    // dead gelesen ... der Fall ist unbelegt"). Er ist nicht ergaenzt, sondern
    // abgeloest: die Lage, vor der er warnte, gibt es nicht mehr.
    // ---------------------------------------------------------------------
    if (exchanged.status >= 500) {
      console.error("[oauth/token-refresh] provider", {
        projectId,
        target,
        reason: "server",
        status: exchanged.status,
      });
      return { kind: "retry", reason: "server" };
    }
    if (exchanged.invalidGrant) {
      console.error("[oauth/token-refresh] provider", {
        projectId,
        target,
        reason: "invalid_grant",
        status: exchanged.status,
      });
      return { kind: "dead", reason: "invalid_grant" };
    }
    // ALLES UEBRIGE — auch ein 4xx mit UNLESBAREM Rumpf — landet in retry, und zwar
    // als "unexpected": EIN UNERWARTETER ANBIETER-CODE LANDET IN retry, NICHT IN dead
    // (Zuschnitt, woertlich).
    console.error("[oauth/token-refresh] provider", {
      projectId,
      target,
      reason: "unexpected",
      status: exchanged.status,
    });
    return { kind: "retry", reason: "unexpected" };
  }

  // (10) DIE DEUTUNG. Was mit den zwei Uhren und dem Erneuerungs-Token geschieht,
  //      steht an toRefreshedPayload und wird hier NICHT verdoppelt.
  const next = toRefreshedPayload(exchanged.body, now, stored);
  if (next.kind !== "ok") {
    // EINE 2xx-ANTWORT OHNE BRAUCHBARES access_token/expires_in IST retry, NICHT dead
    // (ARCHITEKT, 2026-08-29): Sie ist unerwartetes ANBIETER-Verhalten, und eine
    // Neu-Autorisierung heilt daran NICHTS — der Kunde hat gerade erfolgreich
    // eingeloest, der Anbieter hat nur unbrauchbar geantwortet. Es gilt dieselbe Zeile
    // des Zuschnitts wie beim unerwarteten Code: "EIN UNERWARTETER ANBIETER-CODE
    // LANDET IN retry, NICHT IN dead."
    //
    // DIE LESART, DIE SONST WIEDER AUFGEMACHT WIRD, GEHOERT DAZU: Die Zuschnitt-Zeile
    // "dead — ... unbrauchbare Nutzlast" meint die ABGELEGTE Nutzlast — also die
    // parse_*-Ausgaenge aus Schritt (5) —, NICHT die Anbieter-Antwort. Beides auf
    // dieselbe Zeile zu stuetzen machte sie mehrdeutig, und die naechste Runde
    // entschiede die Mehrdeutigkeit anders als diese.
    //
    // DER FELDNAME BLEIBT IM LOG. Er ist der einzige Weg, einen solchen Fall zu
    // diagnostizieren, und er ist unser eigener Text, kein Fremdtext.
    console.error("[oauth/token-refresh] bad_response", {
      projectId,
      target,
      field: next.field,
    });
    return { kind: "retry", reason: "unexpected" };
  }

  // (11) DIE FORM. Sie ist der EINZIGE Ort, an dem die Nutzlast-Zeichenkette entsteht
  //      (Auflage (2) der Scheibe 11.8c) — diese Funktion baut keine zweite.
  //      EIN FEHLSCHLAG HIER IST EIN BETREIBER-PROBLEM UND KEIN TOTER ZUGANG: Nach
  //      Schritt (10) sind alle vier Felder geprueft; scheitert die Form trotzdem, ist
  //      das ein Defekt bei uns und niemand soll dafuer neu autorisieren.
  const formatted = formatOAuthPayload(next.payload);
  if (formatted.kind !== "ok") {
    console.error("[oauth/token-refresh] format", {
      projectId,
      target,
      field: formatted.field,
    });
    return { kind: "misconfigured", reason: "format_failed" };
  }

  // (12) DIE CHIFFRIERUNG. Hier rotiert der Schluessel nebenbei mit — s. den
  //      Dateikopf. no_key und bad_key sind Betriebs-Zustaende der Umgebung, keine
  //      Nutzer-Fehler.
  const encrypted = encryptSecret(formatted.value);
  if (encrypted.kind !== "ok") {
    const reason: RefreshMisconfiguredReason =
      encrypted.kind === "no_key" ? "encrypt_no_key" : "encrypt_bad_key";
    console.error("[oauth/token-refresh] encrypt", { projectId, target, reason });
    return { kind: "misconfigured", reason };
  }

  // (13) DIE ABLAGE.
  //
  //      secret: null STEHT AUSDRUECKLICH IM ARGUMENT, und der Grund ist derselbe wie
  //      in der Callback-Route: Der CHECK project_secrets_secret_genau_eines verlangt,
  //      dass GENAU EINES der beiden Felder einen Wert traegt. Ein Upsert, der secret
  //      WEGLAESST, setzt beim Konflikt nur die genannten Spalten; truege die
  //      bestehende Zeile Klartext in secret, stuenden danach BEIDE gefuellt da und
  //      der Schreibpfad braeche mit 23514.
  //      DAS IST HIER SCHAERFER ALS DORT, denn dieser Pfad TRIFFT eine bestehende
  //      Zeile — er ist nur fuer eine bestehende ueberhaupt erreichbar.
  //
  //      KEIN updated_at im Patch: bei Konflikt fuehrt der Trigger
  //      project_secrets_set_updated_at ihn nach.
  //
  //      EIN FEHLSCHLAG IST misconfigured UND NICHT retry, obwohl "nochmal versuchen"
  //      naheliegt: Eine Erneuerung ist an dieser Stelle bereits VERBRAUCHT, und ein
  //      stiller Wiederholungslauf verdeckte eine strukturelle Ursache (etwa eine
  //      CHECK-Verletzung), die sich durch Wiederholen nie aufloest. misconfigured
  //      holt einen Betreiber an die Zeile — und von dort ist jeder Weg noch offen.
  //      DIESE BEGRUENDUNG WIRD UNTER SCHEIBE 1b STAERKER, NICHT SCHWAECHER: Sobald ein
  //      AUTOMATISCHER Wiederholer diese Funktion ruft, liefe er an einer
  //      CHECK-Verletzung ENDLOS — jeder Lauf holte ein frisches Zugangsdatum und
  //      verloere es beim Schreiben wieder, unbegrenzt oft und ohne dass jemand etwas
  //      sieht. Der Ausgang muss ihn ANHALTEN, und retry taete das Gegenteil.
  //      DER UNTERSCHIED ZUM LESEFEHLER OBEN IST DAMIT BENANNT: dort ist nichts
  //      verbraucht und ein zweiter Versuch folgenlos, hier nicht.
  const { error: writeError } = await admin.from("project_secrets").upsert(
    {
      project_id: projectId,
      target,
      secret: null,
      secret_enc: encrypted.value,
    },
    { onConflict: "project_id,target" },
  );

  if (writeError) {
    // AUSSCHLIESSLICH die eigene Stufe, nie message/details/hint: dort kann der
    // Anbieter den verletzenden Wert zurueckspiegeln, und der ist hier das Chiffrat.
    console.error("[oauth/token-refresh] write", { projectId, target });
    return { kind: "misconfigured", reason: "write_failed" };
  }

  console.info("[oauth/token-refresh] ok", { projectId, target });
  return {
    kind: "ok",
    accessTokenExpiresAt: next.payload.accessTokenExpiresAt,
    refreshTokenExpiresAt: next.payload.refreshTokenExpiresAt,
  };
}
