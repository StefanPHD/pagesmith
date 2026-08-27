// Rueckkehr und Ablage fuer Google (Phase 11.8, Scheibe 11.8e).
//
// WAS DIESE ROUTE TUT: Sie nimmt die Rueckkehr von Google entgegen, prueft den State
// gegen das Cookie, prueft die Sitzung und die Ownership ERNEUT, tauscht den
// Autorisierungs-Code gegen Zugangs- und Erneuerungs-Token, formt die Nutzlast,
// chiffriert sie und legt sie in project_secrets.secret_enc ab.
//
// WAS SIE AUSDRUECKLICH NICHT TUT: keinen Aufruf gegen events:ingest (der TRAEGER des
// Zugangsdatums fuer jenen Endpunkt ist NICHT GEMESSEN — docs/roadmap.md, Eintrag
// 11.8), kein ensureTrackingKey, keine Oberflaeche, keinen Meldungstext.
//
// ---------------------------------------------------------------------------
// HIER FALLEN DIE DREI RIEGEL, MIT ANSAGE (docs/aktiver-stand-11.8.md, "## Scheibe
// 11.8d" -> "### Die drei Invarianten, die 11.8d unberuehrt laesst"):
//
//   AUFRUFER-RIEGEL CIPHER faellt an der Import-Zeile von encryptSecret —
//   src/lib/secrets/cipher.ts bekommt ihren ersten Aufrufer im Produktivcode.
//
//   AUFRUFER-RIEGEL FORM faellt an der Import-Zeile von formatOAuthPayload —
//   src/lib/secrets/oauth-payload.ts bekommt ihren ersten Aufrufer im Produktivcode.
//
//   IMPORT-RIEGEL faellt an BEIDEN Zeilen ZUSAMMEN, an keiner allein: Die zwei reinen
//   Dateien treffen sich hier zum ersten Mal in EINEM Produktiv-Modul.
//
// WAS DABEI NICHT FAELLT, und das gehoert in den Vermerk, sonst liest jemand spaeter
// "T24 bis T26 gruen" als "die Riegel stehen noch": Jene Waechter messen
// lib/oauth/google-authorize.ts und api/oauth/google/start/route.ts — zwei Dateien,
// die diese Scheibe nicht anfasst. Sie bleiben gruen, WEIL sie andere Dateien pruefen
// als die, in der der Bruch stattfindet.
//
// ---------------------------------------------------------------------------
// 'google' STEHT HIER ALS ROUTEN-LOKALE KONSTANTE UND NICHT IN TRACKING_TARGETS
// (OWNER/ARCHITEKT, 2026-08-27). DREI FOLGEN, benannte Kosten und keine Versehen:
//   (1) Die Oberflaeche sieht die Zeile NICHT — Karten und Listen iterieren ueber
//       TRACKING_TARGETS.
//   (2) removeCapiToken weist 'google' ab (isTrackingTarget); die Zeile ist ueber die
//       Anwendung nicht entfernbar, nur im SQL-Editor.
//   (3) Die Aufnahme in TRACKING_TARGETS zieht CONSENT_KEY_BY_TARGET (eine TOTALE
//       Zuordnung), TARGETS_WITH_ADAPTER, die Karten-Oberflaeche und mehrere
//       Testdateien nach — das ist der Zuschnitt von 11.1a fuer LinkedIn und eine
//       eigene Scheibe.
// WAS DIE LAGE ENTSCHAERFT (OWNER, 2026-08-27): Die Zeile haengt am Fremdschluessel
// mit ON DELETE CASCADE — eine Projektloeschung raeumt sie mit ab. Es entsteht KEINE
// Waise, und der Trigger "eine Zeile ohne Projekt" (docs/offene-punkte.md) bleibt
// unberuehrt.
//
// ---------------------------------------------------------------------------
// KEIN MELDUNGSTEXT IN DIESER SCHEIBE (ARCHITEKT, 2026-08-27). Die Route antwortet mit
// 302 OHNE Rumpf und setzt nur einen ERGEBNISCODE aus einer geschlossenen Menge in den
// Parameter. GRUND: Text, den nichts rendert, ist toter Text, und toter Text driftet,
// weil ihn niemand liest. Die Texte kommen mit der Oberflaechen-Scheibe.
//
// KEIN LOG DIESER ROUTE ENTHAELT EINEN CODE, EIN TOKEN, EIN CHIFFRAT ODER EINEN
// KLARTEXT — auch nicht gekuerzt. Ein gekuerztes Geheimnis ist ein Geheimnis
// (docs/immer-beachten.md, SCHWAERZUNG, Teil (a)). Es wird ausserdem KEIN Fremdtext
// aus der Anbieter-Antwort geloggt; damit ist keine Schwaerzung noetig, und die Regel
// kann hier gar nicht verletzt werden, weil nichts anzukuerzen da ist.
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts.
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { encryptSecret } from "@/lib/secrets/cipher";
import { formatOAuthPayload } from "@/lib/secrets/oauth-payload";
import {
  parseStateCookie,
  serializeClearedStateCookie,
  statesMatch,
  STATE_COOKIE_NAME,
} from "@/lib/oauth/google-authorize";
import {
  exchangeAuthorizationCode,
  readTokenExchangeConfig,
  toOAuthPayload,
} from "@/lib/oauth/google-token";

// encryptSecret stammt aus node:crypto -> Node-Runtime, nicht Edge.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Der Ziel-Wert dieser Route. ROUTEN-LOKAL, s. den Kopf.
 *
 * NICHT aus TRACKING_TARGETS und NICHT als TrackingTarget getypt: Der Wert steht dort
 * bewusst nicht. Die Datenbank nimmt ihn seit Migration 0026 an (Scheibe 11.8f).
 */
const GOOGLE_TARGET = "google";

/** Der Name des eigenen Ergebnis-Parameters. KEIN Antwortparameter von Google. */
const RESULT_PARAM = "google";

/** Wohin nach jedem Ausgang zurueckgekehrt wird. */
const RETURN_PATH = "/";

/**
 * Die geschlossene Menge der Ergebniscodes. Kurz und maschinenlesbar; KEINE Texte.
 * Die Oberflaechen-Scheibe bildet sie spaeter auf Meldungen ab.
 */
type Outcome =
  | "ok"
  | "denied"
  | "no_state"
  | "state_mismatch"
  | "no_code"
  | "not_found"
  | "config"
  | "exchange"
  | "bad_response"
  | "no_refresh"
  | "bad_payload"
  | "encrypt"
  | "write";

function outcomeUrl(outcome: Outcome): string {
  return `${RETURN_PATH}?${RESULT_PARAM}=${outcome}`;
}

/**
 * DER EINZIGE ORT, AN DEM DIESE ROUTE EINE ANTWORT BAUT.
 *
 * WARUM EIN BAUKASTEN UND NICHT JE ZWEIG EINE ANTWORT — drei Zusicherungen haengen
 * daran, und je Zweig muesste man sie DREIZEHNMAL richtig machen:
 *
 *   (1) DAS STATE-COOKIE WIRD AUF JEDEM AUSGANG GELOESCHT — auch bei Erfolg, auch bei
 *       Verweigerung, auch wenn gar keines da war. Ein State ist EINMALIG; bleibt er
 *       gueltig, ist er ein zweites Mal einloesbar, und ein Fehlschlag ist genau der
 *       Fall, nach dem jemand es erneut versucht. Das ist dieselbe Bauform wie die
 *       finally-Regel der Audit-Log-Disziplin: kein Ausgang darf ihn verlieren.
 *   (2) KEIN ANTWORTPARAMETER VON GOOGLE STEHT IM ZIEL. Der Anbieter verlangt, nach
 *       der Verarbeitung auf eine URL OHNE sie weiterzuleiten, weil der
 *       Referer-Header den Autorisierungs-Code an fremde Ressourcen weitergeben kann
 *       (docs/ziel-befunde.md, Lauf 6, Teil (be)). Das gilt fuer JEDEN Ausgang, auch
 *       die Fehlerausgaenge.
 *   (3) private, no-store AUF JEDER ANTWORT, auch den Weiterleitungen.
 */
function redirectOut(location: string): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      "Set-Cookie": serializeClearedStateCookie(),
      "Cache-Control": "private, no-store",
    },
  });
}

export async function GET(request: Request): Promise<Response> {
  const params = new URL(request.url).searchParams;

  // (1) DER FEHLER-PARAMETER ZUERST — VOR dem State (ARCHITEKT, 2026-08-27).
  //     GRUND: OB GOOGLE BEI EINER VERWEIGERUNG DEN state MITSCHICKT, IST NICHT
  //     GELESEN (docs/ziel-befunde.md, Lauf 6, Luecke 3). Stuende die State-Pruefung
  //     davor, wiese sie eine ganz normale Ablehnung als Sitzungsfehler ab — der
  //     Nutzer klickt "Nein" und bekommt einen Manipulationsverdacht.
  //     DIE SICHERHEITSAUSSAGE BLEIBT UNBERUEHRT: Dieser Zweig holt kein Token,
  //     tauscht nichts und schreibt nichts. VOR DEM CODE-TAUSCH STEHT DIE
  //     STATE-PRUEFUNG WEITERHIN.
  //     JEDER Wert zaehlt, nicht nur access_denied: die Anbieter-Seite schreibt selbst
  //     "e.g." — es ist ein BEISPIEL und keine abschliessende Werteliste (Teil (be)).
  const errorParam = params.get("error");
  if (errorParam !== null && errorParam.length > 0) {
    // Der WERT wird nicht geloggt: er ist Fremdtext aus einer fremden Weiterleitung.
    console.warn("[oauth/google/callback] denied", { hasError: true });
    return redirectOut(outcomeUrl("denied"));
  }

  // (2) DAS STATE-COOKIE. missing und bad_format fuehren auf denselben Ausgang — der
  //     Betreiber sieht dasselbe, das LOG unterscheidet sie.
  const jar = await cookies();
  const parsed = parseStateCookie(jar.get(STATE_COOKIE_NAME)?.value ?? null);
  if (parsed.kind !== "ok") {
    console.warn("[oauth/google/callback] no_state", { reason: parsed.kind });
    return redirectOut(outcomeUrl("no_state"));
  }

  // (3) DER STATE, ZEITKONSTANT VERGLICHEN (s. statesMatch). Geloggt wird der
  //     FEHLSCHLAG, nie ein Wert und nie eine Laenge.
  if (!statesMatch(params.get("state"), parsed.state)) {
    console.warn("[oauth/google/callback] state_mismatch");
    return redirectOut(outcomeUrl("state_mismatch"));
  }

  // (4) DER CODE. Kein error UND kein code ist ein missgebildeter Aufruf; ohne diesen
  //     Ausgang liefe ein leerer Code in den Tausch.
  const code = params.get("code") ?? "";
  if (code.length === 0) {
    console.warn("[oauth/google/callback] no_code");
    return redirectOut(outcomeUrl("no_code"));
  }

  // (5) DIE SITZUNG. Ohne sie dorthin, wo eine entsteht — relative Location bewusst,
  //     dieser Fluss leitet Host-Werte grundsaetzlich nicht ab. KEIN Log: das ist ein
  //     Normalfall, kein Fehler.
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return redirectOut("/login");

  // (6) DIE OWNERSHIP — ERNEUT, gegen die JETZIGE Sitzung, und VOR dem Tausch.
  //
  //     WARUM ERNEUT, obwohl das Cookie host-only und HttpOnly ist: Die
  //     Cookie-Eigenschaften beweisen, dass DIESER BROWSER DIESEN FLUSS GESTARTET hat.
  //     Sie beweisen NICHT, dass die JETZIGE Sitzung das Projekt besitzt. Zwischen
  //     Start und Rueckkehr liegen bis zu STATE_COOKIE_MAX_AGE_SECONDS, und in dieser
  //     Zeit kann sich abgemeldet und ein ANDERER Nutzer angemeldet haben — Sitzungs-
  //     und State-Cookie sind voneinander unabhaengig. Ohne diese Pruefung bindet
  //     Nutzer B ein Zugangsdatum an ein Projekt von Nutzer A, und beide merken
  //     nichts.
  //     Sie ERSETZT die Pruefung in der Start-Route nicht, sie ergaenzt sie: dort vor
  //     dem START, hier vor der ABLAGE.
  //
  //     WARUM VOR DEM TAUSCH: Ein Tausch nach fehlgeschlagener Ownership hinterliesse
  //     uns ein Zugangsdatum, das wir wegwerfen muessten — und der Widerruf waere ein
  //     zusaetzlicher Aufruf, den diese Scheibe nicht baut. Ein nicht geholter Zugang
  //     muss nicht widerrufen werden.
  //
  //     user_id-Filter ZUSAETZLICH zur RLS (defense in depth), { data, error } IMMER
  //     destrukturiert — sonst wird ein Fehler still verschluckt und sieht aus wie
  //     "nicht gefunden".
  const { data: project, error: lookupError } = await supabase
    .from("projects")
    .select("id")
    .eq("id", parsed.projectId)
    .eq("user_id", user.id)
    .maybeSingle();

  if (lookupError || !project) {
    console.error("[oauth/google/callback] project_lookup", {
      projectId: parsed.projectId,
      userId: user.id,
      failed: Boolean(lookupError),
    });
    return redirectOut(outcomeUrl("not_found"));
  }

  // (7) DIE KONFIGURATION. FAIL-LOUD; geloggt wird der NAME der Variablen, nie ihr
  //     Wert.
  const config = readTokenExchangeConfig();
  if (config.kind === "missing_config") {
    console.error("[oauth/google/callback] missing_env", {
      variable: config.variable,
    });
    return redirectOut(outcomeUrl("config"));
  }

  // (8) DER TAUSCH. GOOGLE_OAUTH_REDIRECT_URI geht UNVERAENDERT hinein — der Anbieter
  //     gleicht sie hier ERNEUT als Zeichenkette ab.
  const exchanged = await exchangeAuthorizationCode({
    code,
    clientId: config.clientId,
    clientSecret: config.clientSecret,
    redirectUri: config.redirectUri,
  });
  if (exchanged.kind !== "ok") {
    console.error("[oauth/google/callback] exchange", {
      reason: exchanged.kind,
      status: exchanged.kind === "http_error" ? exchanged.status : null,
    });
    return redirectOut(outcomeUrl("exchange"));
  }

  // DIE UHR WIRD GENAU EINMAL GELESEN und an BEIDE Umrechnungen weitergereicht.
  // Zweimal gelesen haetten die zwei Ablaufzeitpunkte verschiedene Bezugspunkte.
  const receivedAt = Math.floor(Date.now() / 1000);

  // (9) DIE AUSWERTUNG.
  const payload = toOAuthPayload(exchanged.body, receivedAt);
  if (payload.kind === "no_refresh_token") {
    // EIGENER AUSGANG, kein bad_response: Der Betreiber hat gerade erfolgreich
    // zugestimmt und muss erfahren, dass trotzdem nichts Dauerhaftes entstanden ist.
    // Eine allgemeine Fehlermeldung liesse ihn den Fluss wiederholen, und die
    // Wiederholung endete genauso.
    console.error("[oauth/google/callback] no_refresh_token", {
      projectId: parsed.projectId,
    });
    return redirectOut(outcomeUrl("no_refresh"));
  }
  if (payload.kind !== "ok") {
    // Der FELDNAME, nie sein Inhalt.
    console.error("[oauth/google/callback] bad_response", {
      field: payload.field,
    });
    return redirectOut(outcomeUrl("bad_response"));
  }
  if (payload.refreshExpiryIgnored) {
    // Das Feld war da und war unbrauchbar. Der Zustand bleibt "unbekannt"; die
    // TATSACHE gehoert ins Log, damit sie nicht unsichtbar bleibt. Ohne den Wert.
    console.warn("[oauth/google/callback] refresh_expiry_ignored");
  }

  // (10) DIE FORM. Sie ist der EINZIGE Ort, an dem die Nutzlast-Zeichenkette entsteht
  //      (Auflage (2) der Scheibe 11.8c).
  const formatted = formatOAuthPayload(payload.payload);
  if (formatted.kind !== "ok") {
    console.error("[oauth/google/callback] bad_payload", {
      field: formatted.field,
    });
    return redirectOut(outcomeUrl("bad_payload"));
  }

  // (11) DIE CHIFFRIERUNG. no_key und bad_key sind Betriebs-Zustaende der Umgebung,
  //      keine Nutzer-Fehler — deshalb der Kennungs-Name im Log und kein Wert.
  const encrypted = encryptSecret(formatted.value);
  if (encrypted.kind !== "ok") {
    console.error("[oauth/google/callback] encrypt", {
      reason: encrypted.kind,
    });
    return redirectOut(outcomeUrl("encrypt"));
  }

  // (12) HARTE INVARIANTE: Admin-Client (service_role, bypassed RLS) erst HIER, NACH
  //      dem bestandenen Ownership-Gate. Oberhalb dieser Zeile steht im
  //      Nicht-Owner-Pfad KEINE Admin-Zeile -> der RLS-Bypass ist ohne Gate
  //      unerreichbar. Dasselbe Muster wie setCapiToken.
  const admin = createAdminClient();

  // (13) DIE ABLAGE.
  //
  //      secret: null STEHT AUSDRUECKLICH IM ARGUMENT, und das ist die schaerfste
  //      Einzelheit dieser Scheibe. Der CHECK lautet
  //      project_secrets_secret_genau_eines CHECK ((secret IS NULL) <> (secret_enc IS
  //      NULL)) — GENAU EINES der beiden Felder traegt einen Wert. Ein Upsert, der
  //      secret WEGLAESST, setzt beim Konflikt nur die genannten Spalten; traegt die
  //      bestehende Zeile Klartext in secret, stuenden danach BEIDE gefuellt da und
  //      der Schreibpfad braeche mit 23514.
  //      WARUM DAS OHNE DIESE ZEILE DURCHGERUTSCHT WAERE: Fuer 'google' gibt es heute
  //      NULL Zeilen — der Fall ist im Live-Test GAR NICHT erreichbar. Er traete erst
  //      auf, wenn eine google-Zeile je Klartext truege, also fruehestens bei der
  //      Wanderung der bestehenden Ziele. Ein Fehler, den kein Test dieser Scheibe
  //      erreichen kann, muss im CODE stehen und nicht im Vertrauen; ein Test prueft
  //      ihn trotzdem — am Upsert-ARGUMENT.
  //
  //      project_id IST GESETZT (Eigentums-Entscheidung, 2026-08-27). Es entsteht
  //      KEINE Zeile mit project_id IS NULL; der Trigger des offenen Punktes "EINE
  //      ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE" tritt nicht ein.
  //
  //      KEIN updated_at im Patch: bei Konflikt fuehrt der Trigger
  //      project_secrets_set_updated_at ihn nach, beim Insert der Spalten-Default.
  //
  //      WAS HIER NICHT GESCHRIEBEN WIRD und in setCapiToken geschrieben wuerde:
  //      project_tokens (die Tabelle hat keine Ziel-Spalte und ist Metas
  //      Rollback-Reserve) · settings.capi.tokenSet (Metas Indikator) ·
  //      ensureTrackingKey (ARCHITEKT, 2026-08-27: ein Schreibvorgang auf einer
  //      ZWEITEN Tabelle ohne heutige Wirkung; er wird Vorbedingung der
  //      Transport-Scheibe).
  const { error: writeError } = await admin
    .from("project_secrets")
    .upsert(
      {
        project_id: parsed.projectId,
        target: GOOGLE_TARGET,
        secret: null,
        secret_enc: encrypted.value,
      },
      { onConflict: "project_id,target" },
    );

  if (writeError) {
    // AUSSCHLIESSLICH message, nie details/hint: dort kann der Anbieter den
    // verletzenden Wert zurueckspiegeln, und der ist hier das Chiffrat.
    console.error("[oauth/google/callback] write", {
      projectId: parsed.projectId,
      message: writeError.message,
    });
    return redirectOut(outcomeUrl("write"));
  }

  console.info("[oauth/google/callback] ok", { projectId: parsed.projectId });
  return redirectOut(outcomeUrl("ok"));
}
