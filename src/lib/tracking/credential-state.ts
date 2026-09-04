// DIE LAGE DER ABGELEGTEN ZUGANGSDATEN JE ZIEL — REINE BERECHNUNG
// (Phase 11.2, Scheibe 11.2b; docs/aktiver-stand.md, Abschnitt "Die Ampel an der
// Ziel-Karte — Scheibe 11.2b").
//
// WAS DIESE DATEI IST: die SECHS Lagen, die Vorwarn-Schwelle und zwei Ableitungen
// fuer die Oberflaeche. Kein Netz, keine Datenbank, kein Chiffrieren, kein Zustand.
// Sie entschluesselt NICHT — sie bekommt das Ergebnis des Entschluesselns herein.
//
// ---------------------------------------------------------------------------
// DIE AMPEL ZEIGT UHR 2, NICHT UHR 1. WER DAS AENDERT, BAUT EINE ANDERE SCHEIBE.
//
// Uhr 1 (das Zugangsdatum) stirbt seit Scheibe 1b-2a STUENDLICH und wird
// verkehrsgetaktet erneuert. Sie anzuzeigen hiesse, dem Betreiber dauerhaft
// "laeuft in 43 Minuten ab" zu melden — eine Anzeige, die immer blinkt, ist keine.
// Gegenstand dieser Scheibe ist das ERNEUERUNGS-Token (refreshTokenExpiresAt):
// stirbt es, hilft kein Code mehr, sondern nur eine Neu-Autorisierung durch den
// Kunden. UHR 1 KOMMT IM RUECKGABETYP NICHT VOR, und das ist keine Auslassung.
//
// ---------------------------------------------------------------------------
// LADEKLASSE, EHRLICH BENANNT (Hausform: lib/oauth/connect-return.ts und
// lib/oauth/refresh-run.ts): Diese Datei traegt KEINE Direktive — kein
// `import "server-only"`, kein `"use client"` — und sie ERBT auch keine. Saemtliche
// Importe sind `import type` und werden beim Bauen geloescht; zur Laufzeit haengt
// hier nichts an secrets/ oder oauth/.
// DAS IST ABSICHT UND NOETIG: Die Ableitungen unten laufen im BROWSER (MeasureView,
// TargetCard), die Klassifikation im SERVER (app/projects/actions.ts). Eine
// server-only-Fessel sperrte die Karte aus, ein "use client" die Aktion. Die
// Richtung bleibt server-only -> rein, nie umgekehrt.
// WER HIER EINEN WERT-IMPORT AUS secrets/ ERGAENZT, ZIEHT `server-only` IN DAS
// CLIENT-BUENDEL und bricht die Karte — ohne dass ein Test es meldet.
//
// KEINE UMLAUTE IM QUELLTEXT — wie in den Nachbardateien, deren Typen hier zitiert
// werden (secrets/cipher.ts, secrets/oauth-payload.ts, capi/token.ts): ae/oe/ue/ss.
// Grund ist die Werkzeug-Regel in docs/immer-beachten.md: ein Ganz-Datei-Schreiber
// kann Umlaute doppelt kodiert zurueckschreiben, und das faellt nur im Diff auf.
// DIE PRODUKT-TEXTE STEHEN NICHT HIER, sondern in components/TargetCard.tsx — dort
// gilt die Auflage nicht, und dort duerfen Umlaute stehen.
import type { DecryptResult } from "@/lib/secrets/cipher";
import type {
  ParsePayloadResult,
  RefreshTokenExpiry,
} from "@/lib/secrets/oauth-payload";
import type { TrackingTarget } from "@/lib/settings";

/**
 * AB WANN "LAEUFT BALD AB" GEMELDET WIRD. ACHTUNDVIERZIG STUNDEN.
 *
 * GESETZT, NICHT GEMESSEN — und das ist der ganze Satz zu ihrer Herkunft. Der Code
 * gibt fuer Uhr 2 KEINE Groesse her: Die beiden vorhandenen Vorlaeufe
 * (REFRESH_LEAD_SECONDS in lib/oauth/token-refresh.ts,
 * REFRESH_SIGNAL_LEAD_SECONDS in lib/capi/token.ts) tragen beide 300 und gelten
 * beide UHR 1. Auf einer Sieben-Tage-Uhr waeren fuenf Minuten funktionslos — die
 * Vorwarnung erschiene fuenf Minuten vor dem Ausfall.
 *
 * ZWEI UNGLEICHUNGEN TRAGEN DIE ZAHL, und sie sind der Inhalt der Begruendung:
 * · DEUTLICH UNTER der kuerzesten bekannten Lebensdauer (sieben Tage im
 *   Publishing-Status "Testing", GELESEN — docs/ziel-befunde.md, Teil (af)). Sonst
 *   stuende die Karte DAUERHAFT auf Vorwarnung, und eine Anzeige, die immer an ist,
 *   sagt nichts.
 * · WEIT UEBER EINEM TAG, weil ein Kunde ein Wochenende ueberbruecken koennen muss,
 *   ohne den Ausfall zu erleben.
 * Zwei von sieben Tagen ist der Bereich, in dem beide halten.
 *
 * SIE STEHT ALS BENANNTE KONSTANTE AN EINER STELLE, damit ihre Aenderung ein
 * sichtbarer Diff ist — dieselbe Bauform und derselbe Grund wie bei
 * REFRESH_MAX_ATTEMPTS (lib/oauth/refresh-run.ts).
 *
 * DIE GRENZE GEHOERT DAZU: Nach dem Statuswechsel auf "In Produktion" ist die
 * Lebensdauer des Erneuerungs-Tokens UNGEMESSEN (docs/ziel-befunde.md, Teil (bx)).
 * Traegt der Anbieter dort GAR KEINEN Ablaufzeitpunkt, greift diese Schwelle NIE —
 * die Lage ist dann "unknown_expiry", und das ist kein Defekt, sondern die ehrliche
 * Auskunft.
 *
 * EIN WAECHTER BINDET DIE RELATION ZU REFRESH_SIGNAL_LEAD_SECONDS, NICHT DEN WERT.
 * Er faengt den Umbau, nicht den Entwurf — dieselbe Grenze, die U1 in
 * capi/token.test.ts an sich selbst traegt.
 */
export const CREDENTIAL_EXPIRY_WARN_SECONDS = 172_800;

/**
 * WARUM EINE ZEILE NICHT LESBAR IST. GESCHLOSSEN UND SELBSTVERGEBEN.
 *
 * Sie ist aus den Fehlzustaenden der zwei Leser ABGELEITET statt abgeschrieben:
 * Kommt dort ein Zustand hinzu, waechst diese Union mit, und die Zuordnung unten
 * wird zum Compiler-Fehler statt zu einem stillen Rueckfall.
 *
 * KEIN FREMDTEXT. Hier steht kein `string`, keine Anbieter-Meldung und kein
 * Fehler-`message` — dieselbe Zusage wie an RefreshResult
 * (lib/oauth/token-refresh.ts).
 */
export type CredentialUnreadableReason =
  | `decrypt_${Exclude<DecryptResult["kind"], "ok">}`
  | `parse_${Exclude<ParsePayloadResult["kind"], "ok">}`;

/**
 * DIE SECHS LAGEN. GESCHLOSSENE UNION, UND SIE IST DER MECHANISMUS GEGEN EIN LECK —
 * NICHT EINE ZUSAGE.
 *
 * Vorbild ist RowResolution (lib/capi/token.ts), und dieser Typ ist STRENGER als
 * sein Vorbild: Jener traegt ein `token: string`, dieser traegt UEBERHAUPT KEINEN
 * freien String. Es gibt nur kind-Literale, zwei Zahlen und einen `reason` aus der
 * geschlossenen Union darueber. Ein Zugangsdatum, ein Erneuerungs-Token, ein
 * Chiffrat oder ein Anbieter-Fremdtext hat in diesem Typ KEINEN ORT, an den man ihn
 * schreiben koennte, ohne den Typ zu aendern.
 *
 * DREI LAGEN TRAGEN EINEN ZEITPUNKT, DREI NICHT — und die Trennung ist die Sache:
 * · live / expiring / dead  -> ein Zeitpunkt aus UNSERER abgelegten Nutzlast.
 * · unknown_expiry          -> der Anbieter hat keinen geliefert.
 * · no_clock                -> die Zeile hat gar keine Uhr (Klartext-Ziel).
 * · unreadable              -> die Zeile gibt nichts her.
 *
 * "NICHT KONFIGURIERT" IST KEINE LAGE DIESES TYPS. Das ist die ABWESENHEIT eines
 * Eintrags und bleibt die bestehende Achse (listConfiguredTargets).
 */
export type TargetCredentialState =
  /** Uhr 2 lebt und liegt ausserhalb der Vorwarn-Schwelle. */
  | { kind: "live"; expiresAt: number }
  /** Uhr 2 lebt, liegt aber INNERHALB der Vorwarn-Schwelle. */
  | { kind: "expiring"; expiresAt: number }
  /** Uhr 2 ist ueberschritten. Nur eine Neu-Autorisierung hilft. */
  | { kind: "dead"; expiredAt: number }
  /** Der Anbieter hat keinen Ablaufzeitpunkt geliefert. */
  | { kind: "unknown_expiry" }
  /** Klartext-Ziel: keine Nutzlast, keine Uhr. */
  | { kind: "no_clock" }
  /** Chiffrat oder Nutzlast unbrauchbar. */
  | { kind: "unreadable"; reason: CredentialUnreadableReason };

/** Die Lagen je Ziel. Fehlt ein Ziel, gibt es fuer es keine Geheimnis-Zeile. */
export type TargetCredentialStates = Partial<
  Record<TrackingTarget, TargetCredentialState>
>;

/**
 * WARUM DIE AKTION SCHEITERTE. GESCHLOSSEN, SELBSTVERGEBEN, KEIN DB-TEXT.
 *
 * ABSICHTLICH KEIN `error: string` WIE BEI setCapiToken. Jene Aktion reicht
 * `ownError.message` durch — Fremdtext aus der Datenbank. Hier ist das VERBOTEN:
 * Der Rueckgabetyp dieser Scheibe traegt strukturell kein Geheimnis, und ein freier
 * String waere genau der Ort, an dem eines landen koennte.
 */
export type CredentialStatesError =
  /** Keine Sitzung. */
  | "unauthenticated"
  /** Das Projekt gehoert dem Nutzer nicht, existiert nicht, oder das Gate brach. */
  | "not_found"
  /** Die Geheimnis-Abfrage selbst ging daneben. */
  | "read_failed";

/** Das Ergebnis der Aktion. */
export type ListCredentialStatesResult =
  | { ok: true; states: TargetCredentialStates }
  | { ok: false; reason: CredentialStatesError };

/**
 * WAS DIE BERECHNUNG HEREINBEKOMMT.
 *
 * DIE AKTION KLASSIFIZIERT DIE ZEILE, DIESE DATEI DEUTET DIE UHR. Die Trennung ist
 * der Grund, warum alle sechs Lagen ohne Datenbank, ohne Schluessel und ohne
 * `server-only` pruefbar sind.
 */
export type CredentialInput =
  | { kind: "no_clock" }
  | { kind: "unreadable"; reason: CredentialUnreadableReason }
  | { kind: "clock"; expiry: RefreshTokenExpiry };

/**
 * DIE EINE BERECHNUNG. Wirft nie.
 *
 * DER ZUSTAND {kind:"unknown"} WIRD AUSDRUECKLICH UND NEGATIV GEPRUEFT — nicht als
 * &&-Kurzschluss auf "at", wie es die Inline-Fassung in refreshAccessToken
 * (lib/oauth/token-refresh.ts, Schritt (6)) tut. DAS IST EINE ENTSCHEIDUNG UND KEIN
 * Geschmack: Kaeme ein DRITTES Mitglied in RefreshTokenExpiry, meldete diese
 * ausdrueckliche Fassung einen TYPFEHLER — laut, beim Bauen. Der Kurzschluss
 * behandelte es STILL als "nicht ueberschritten", also fail-open, und KEIN Compiler
 * und kein Test wuerde es melden.
 *
 * DER RAND IST UEBERNOMMEN, NICHT NEU ERFUNDEN: `epochSeconds === now` gilt als
 * UEBERSCHRITTEN (fail-closed) — dieselbe Wahl wie hasLiveRefreshToken
 * (lib/capi/token.ts) und wie Schritt (6) in lib/oauth/token-refresh.ts. Die
 * Sekunde, in der ein Zugang stirbt, gehoert nicht mehr ihm.
 *
 * {kind:"unknown"} GILT NIE ALS ABGELAUFEN. Das ist Festlegung 5 der Scheibe 1a,
 * UEBERNOMMEN: Von zwei unbelegten Moeglichkeiten wird die gewaehlt, deren Fehlgriff
 * der billigere ist. Hier fuehrt sie in "unknown_expiry" und NIE in "dead".
 *
 * ---------------------------------------------------------------------------
 * DIE LAGE DER DRITTEN INSTANZ, VOLLSTAENDIG — sie steht hier, weil sie sonst beim
 * naechsten Aufraeumen als vergessene Doppelung gelesen wird:
 *
 * ES GIBT DREI INSTANZEN DERSELBEN UHR-2-BEDINGUNG. Zwei sind LAUT (ausdrueckliche
 * unknown-Pruefung): hasLiveRefreshToken in lib/capi/token.ts und diese hier. EINE
 * IST STILL: die inline-Bedingung in refreshAccessToken, Schritt (6).
 *
 * SIE IST NICHT ENTDOPPELT, UND DER GRUND IST WEDER GESCHMACK NOCH EIN WAECHTER:
 * Eine gemeinsame Quelle verlangte einen Import in lib/capi/token.ts UND in
 * lib/oauth/token-refresh.ts — also eine Aenderung an beiden. Beide sind fuer diese
 * Scheibe UNBERUEHRT (Invarianten (I-4) und (I-5) ihres Zuschnitts).
 * AUSDRUECKLICH NICHT DER GRUND: der Quelltext-Waechter T15-ERSATZ in
 * capi/token.test.ts. Er verbietet capi/token.ts Importe aus /oauth/ und nennt
 * secrets/ ausdruecklich als erlaubte Nachbarn — ein geteiltes Praedikat unter
 * secrets/ wuerde ihn NICHT brechen. Wer die Entdoppelung spaeter angeht, findet
 * den Preis also bei den Invarianten und nicht bei einem Test.
 */
export function credentialStateFrom(
  input: CredentialInput,
  nowSeconds: number,
): TargetCredentialState {
  if (input.kind === "no_clock") return { kind: "no_clock" };
  if (input.kind === "unreadable")
    return { kind: "unreadable", reason: input.reason };

  // DIE AUSDRUECKLICHE, NEGATIVE PRUEFUNG. S. den Kopf dieser Funktion.
  if (input.expiry.kind === "unknown") return { kind: "unknown_expiry" };

  const expiresAt = input.expiry.epochSeconds;
  if (expiresAt <= nowSeconds) return { kind: "dead", expiredAt: expiresAt };
  if (expiresAt - nowSeconds <= CREDENTIAL_EXPIRY_WARN_SECONDS)
    return { kind: "expiring", expiresAt };
  return { kind: "live", expiresAt };
}

/**
 * WAS DIE KARTE UEBER DIE ZUGANGSDATEN BEHAUPTEN DARF.
 *
 * BEI WIDERSPRUCH GEWINNT DIE UNSICHERHEIT (OWNER-ENTSCHEIDUNG 2026-09-03). Sagt
 * listConfiguredTargets "konfiguriert" und diese Aktion "ich weiss es nicht", zeigt
 * die Karte UNWISSEN — NIE "hinterlegt".
 * DER GRUND: Eine Oberflaeche, die im Zweifel Sicherheit behauptet, ist genau die
 * Krankheit, gegen die diese Scheibe gebaut wird. Der umgekehrte Fehlgriff kostet
 * einen unnoetigen Blick, der hier gewaehlte kostet eine UEBERSEHENE
 * NEU-AUTORISIERUNG. Ein Lauf haelt die Regel fest.
 *
 * SIE GILT IN BEIDE RICHTUNGEN, und das ist mehr als der Wortlaut der Entscheidung
 * verlangt: Auch wenn listConfiguredTargets NICHTS meldet und diese Aktion
 * scheitert, steht dort UNWISSEN und nicht "nicht konfiguriert". Wir wissen es dann
 * eben nicht — und "nicht konfiguriert" waere wieder eine Behauptung ohne Grundlage.
 *
 * DER RUECKGABETYP IST STRUKTURELL ConfiguredState aus components/TargetCard.tsx. Er
 * wird hier NICHT importiert: Die Richtung Client -> rein gilt nicht, und ein
 * zweiter NAME waere eine zweite Wahrheit ueber dieselbe Sache. Ein Test haelt die
 * Zuweisbarkeit fest.
 *
 * `null` HEISST NOCH NICHT GELADEN und verlangt BEIDE Quellen. Solange eine fehlt,
 * behauptet die Karte nichts.
 */
export function resolveConfigured(
  configuredTargets: readonly TrackingTarget[] | null,
  credentials: ListCredentialStatesResult | null,
  target: TrackingTarget,
): boolean | null | "unknown" {
  if (configuredTargets === null || credentials === null) return null;
  if (!credentials.ok) return "unknown";
  return configuredTargets.includes(target);
}

/**
 * DIE LAGE EINES ZIELS FUER DIE ANZEIGE — oder null, wenn es keine gibt.
 *
 * null STEHT FUER DREI VERSCHIEDENE DINGE, und alle drei fuehren zu DERSELBEN
 * Anzeige, naemlich zu keiner: noch nicht geladen, die Aktion scheiterte, oder es
 * gibt fuer dieses Ziel keine Zeile. Die Unterscheidung traegt die Statuszeile
 * (s. resolveConfigured), nicht diese Zeile.
 */
export function credentialStateFor(
  credentials: ListCredentialStatesResult | null,
  target: TrackingTarget,
): TargetCredentialState | null {
  if (credentials === null || !credentials.ok) return null;
  return credentials.states[target] ?? null;
}

/**
 * NIMMT DIE LAGE EINES ZIELS HERAUS — fuer die Nachfuehrung nach Speichern und
 * Trennen.
 *
 * SIE ENTFERNT, STATT ZU RATEN. Nach dem Speichern wissen wir, DASS eine Zeile da
 * ist — nicht, welche Uhr sie traegt; nach dem Trennen gibt es gar keine mehr. In
 * beiden Faellen ist "keine Auskunft" richtig und ein eingesetzter Wert erfunden.
 * OHNE SIE UEBERLEBT EINE AUSKUNFT IHREN GEGENSTAND: Unter "Nicht konfiguriert"
 * stuende weiter das Ablaufdatum einer geloeschten Zeile.
 *
 * SIE GIBT DIE EINGABE UNVERAENDERT ZURUECK, wo es nichts zu entfernen gibt — auch
 * die REFERENZ, damit der Container nicht ohne Anlass neu rendert. Ein `{ok:false}`
 * bleibt `{ok:false}`: Wer nichts weiss, weiss nach dem Entfernen auch nichts.
 */
export function withoutTarget(
  credentials: ListCredentialStatesResult | null,
  target: TrackingTarget,
): ListCredentialStatesResult | null {
  if (credentials === null || !credentials.ok) return credentials;
  if (credentials.states[target] === undefined) return credentials;
  const states: TargetCredentialStates = { ...credentials.states };
  delete states[target];
  return { ok: true, states };
}
