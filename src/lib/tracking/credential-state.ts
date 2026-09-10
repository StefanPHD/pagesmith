// DIE LAGE DER ABGELEGTEN ZUGANGSDATEN JE ZIEL — REINE BERECHNUNG
// (Phase 11.2, Scheibe 11.2b; docs/claude-history/phase-11.2-google.md, Abschnitt
// "Die Ampel an der Ziel-Karte — Scheibe 11.2b").
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
//
// ---------------------------------------------------------------------------
// NACHGEZOGEN 11.3b, NICHT UMFORMULIERT — DER TEXT DARUEBER BLEIBT VOLLSTAENDIG
// LESBAR UND IST KEIN WORT GEAENDERT. Ueberholt sind zwei TATSACHENANGABEN ueber
// den Inhalt dieser Datei; die REGELN des Kopfes sind unberuehrt.
//
//  (1) "die SECHS Lagen, die Vorwarn-Schwelle und zwei Ableitungen". Seit 11.3b
//      liegt hier zusaetzlich der PROJEKT-EIGENE TESTZUSTAND je Ziel: das aus
//      capi/token.ts umgezogene Praedikat, seine Zustands-Union, die Frist als
//      benannte Konstante und die Ableitung fuer die Karte.
//  (2) "Sie bekommt das Ergebnis des Entschluesselns herein" beschrieb die
//      Arbeitsteilung "die Aktion klassifiziert die Zeile, diese Datei deutet die
//      Uhr" (s. den Kopf von CredentialInput). SIE GILT FUER DEN TESTZUSTAND NICHT:
//      activeTestCodeFromRow nimmt eine ROHE Zeile entgegen und ist hier der erste
//      Leser dieser Art.
//      DAS IST BEWUSST SO UND KEIN VERSEHEN: Der Umzug musste BYTE-IDENTISCH sein
//      (Owner-Auflage 2026-09-09) — der Resolver in capi/token.ts ist mit genau
//      diesem Ausdruck live bewiesen, und ein umgeschriebener Ausdruck waere ein
//      Eingriff und kein Umzug gewesen. Wer die Arbeitsteilung spaeter
//      vereinheitlichen will, aendert damit den Ausdruck und braucht dafuer einen
//      eigenen Zuschnitt.
//
// WAS SICH AM VERHALTEN GEAENDERT HAT: NICHTS. Der Ausdruck ist Zeichen fuer
// Zeichen derselbe, und der Resolver ruft ihn seither aus dieser Datei.
//
// ---------------------------------------------------------------------------
// NACHGEZOGEN 11.3d — EINE TATSACHENANGABE DES KOPFES IST UEBERHOLT, DIE REGEL
// DAHINTER NICHT. Oben steht: "Saemtliche Importe sind `import type` und werden beim
// Bauen geloescht". SEIT DIESER SCHEIBE GIBT ES EINEN WERT-IMPORT — isTrackingTarget
// aus @/lib/settings. Der Satz bleibt woertlich stehen, weil er die Herleitung der
// Regel traegt; heute zutreffend ist er nicht mehr.
// DIE REGEL SELBST IST UNBERUEHRT UND GILT SCHAERFER ALS DER SATZ: Verboten ist ein
// Wert-Import aus secrets/ oder oauth/ — der zoege `server-only` in das
// Client-Buendel und braeche die Karte. @/lib/settings traegt KEINE Direktive und
// ist aus Client-Code erreichbar (GEMESSEN am Repo, CC, 2026-09-10:
// components/TargetCard.tsx importiert daraus WERTE). Die Richtung bleibt
// server-only -> rein, nie umgekehrt.
import type { DecryptResult } from "@/lib/secrets/cipher";
import type {
  ParsePayloadResult,
  RefreshTokenExpiry,
} from "@/lib/secrets/oauth-payload";
import { isTrackingTarget, type TrackingTarget } from "@/lib/settings";

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

// ===========================================================================
// DER PROJEKT-EIGENE TESTZUSTAND JE ZIEL (Scheibe 11.3b).
//
// WARUM IN DIESER DATEI UND NICHT IN EINER EIGENEN: Sie ist die einzige REINE
// Datei, die ohnehin je Ziel eine Lage aus einer project_secrets-Zeile ableitet,
// sie wird bereits von Server UND Browser gelesen, und ihre Bauform — geschlossene
// Union, Zeitpunkte als Epochensekunden, kein freier String — ist genau die, die
// der Testzustand braucht. Eine eigene Datei waere ein zweites Haus fuer dieselbe
// Sache. (Owner-Entscheidung 2026-09-09.)
// ===========================================================================

/**
 * WELCHE ZIELE EINEN PROJEKT-EIGENEN TESTMODUS TRAGEN. Drei: meta, tiktok und
 * seit Scheibe 11.3e pinterest.
 *
 * DIE EINE QUELLE FUER DIESE TATSACHE. Sie speist BEIDE Seiten — die Pruefung im
 * Schreibpfad (app/projects/actions.ts) und die Sichtbarkeit des Schalters, die
 * sich aus dem Ergebnis des Lesers ergibt. Eine zweite Liste in der Oberflaeche
 * waere die Doppelung, an der zwei Wahrheiten auseinanderlaufen.
 *
 * WARUM MIT ADAPTER, ABER NICHT JEDER MIT ADAPTER: Der Traeger muss ein Feld in
 * der NUTZLAST sein. pinterest traegt ihn als Query-Parameter mit zwei
 * widerspruechlichen Namen und NIE GEMESSEN, google als validateOnly, das die
 * Diagnostik abschneidet, linkedin gar nicht — die drei Gruende stehen ausgefuehrt
 * in docs/aktiver-stand.md, "Reichweite: meta und tiktok — und ausdruecklich sonst
 * keines", und werden hier NICHT verdoppelt.
 *
 * NACHGEZOGEN 11.3e, UND DER ABSATZ DARUEBER BLEIBT WOERTLICH STEHEN: Sein
 * pinterest-Halbsatz ist UEBERHOLT, seine zwei anderen gelten unveraendert. Der
 * Traeger von pinterest ist WEITERHIN ein Query-Parameter und kein Nutzlast-Feld —
 * ueberholt ist allein das "NIE GEMESSEN": `test=true` ist am 2026-09-10 LIVE als
 * wirksam gemessen (docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)",
 * Teil (u)), und der zweite Name `is_test` ist damit fuer den Bau ENTBEHRLICH
 * geworden — NICHT ausgeschlossen (Teil (v)).
 * DASS DER TRAEGER KEIN NUTZLAST-FELD IST, HAT DAMIT AUFGEHOERT, EIN AUSSCHLUSSGRUND
 * ZU SEIN, und das ist der eigentliche Nachzug: Die Anforderung "ein Feld in der
 * NUTZLAST" war aus ZWEI Zielen gebildet, die beide eines haben. Was diese Menge
 * wirklich verlangt, ist ein PROJEKT-EIGEN steuerbarer Testmodus — die GESTALT des
 * Traegers ist Sache des Adapters (docs/immer-beachten.md, "EINE REGEL KANN RICHTIG
 * SEIN UND NICHT SKALIEREN — DER BRUCH ZEIGT SICH AN IHRER BEGRUENDUNG, NICHT AN
 * IHREM WORTLAUT").
 * DIE FOLGE, DIE MITMUSS: Ein Ziel dieser Menge traegt NICHT zwingend einen Code.
 * Welches einen VERLANGT, sagt ausschliesslich requiresTestCode unten — und beide
 * Fragen sind seit 11.3e verschieden.
 *
 * IHR ORT IST EINE FOLGE DES ZUSCHNITTS UND KEINE ENTSCHEIDUNG UEBER IHN: Die
 * verwandte Liste TARGETS_WITH_ADAPTER liegt in tracking/target-adapters.ts, und
 * jene Datei ist von dieser Scheibe ausdruecklich ausgenommen. Wer beide
 * zusammenlegen will, tut das in einer eigenen Runde.
 */
export const TARGETS_WITH_TEST_MODE: readonly TrackingTarget[] = [
  "meta",
  "tiktok",
  "pinterest",
];

/**
 * WIE LANGE EIN GESTARTETER TESTMODUS LAEUFT. EINE STUNDE.
 *
 * GESETZT (OWNER-ENTSCHEIDUNG 2026-09-09), nicht gemessen. Drei Groessen tragen
 * sie, und sie gehoeren zusammen:
 * · LANG GENUG fuer eine Einrichtungspruefung.
 * · KURZ GENUG, dass ein vergessener Testmodus keine Sitzung Zaehlung kostet — das
 *   ist der Schaden, gegen den die Frist ueberhaupt gewaehlt wurde: Der Riegel im
 *   Ingest nimmt das Ereignis aus events, und der Kunde sieht eine Kurve gegen
 *   null ohne Fehler und ohne Grund.
 * · DEUTLICH KUERZER als das Wechselintervall des Codes (Metas Testcode wechselt
 *   alle paar Tage, OWNER-ANGABE 2026-09-09, keine Messung). Die Frist kann damit
 *   NIE einen brauchbaren Zustand abschneiden.
 *
 * SIE STEHT ALS BENANNTE KONSTANTE AN EINER STELLE, damit ihre Aenderung ein
 * sichtbarer Diff ist — dieselbe Bauform und derselbe Grund wie bei
 * CREDENTIAL_EXPIRY_WARN_SECONDS weiter oben.
 *
 * KEINE AUSWAHL UND KEINE FREIE EINGABE. Die Frist ist ein DECKEL, keine
 * Praeferenz; eine Zielgruppe, die Geschwindigkeit ueber Konfigurationstiefe
 * stellt, hat zu ihrer Laenge keine informierte Meinung.
 */
export const TEST_MODE_DURATION_SECONDS = 3_600;

/**
 * VERLANGT DIESES ZIEL EINEN TESTCODE? JE ZIEL, POSITIV BEANTWORTET (Scheibe 11.3d,
 * Entscheidung (14) der Phase; Owner-Entscheidung 2026-09-10).
 *
 * DIE GESTALT IST EIN ERSCHOEPFENDER switch OHNE default-Rueckfall, UND DAS IST IHR
 * GANZER ZWECK: Kommt ein SECHSTES Ziel in TRACKING_TARGETS, BRICHT tsc, bis jemand
 * seinen Zweig geschrieben hat. Der Schlusszweig weist `target` einem `never` zu —
 * genau dort bricht es.
 * WER SIE SPAETER ZU EINEM KNAPPEREN AUSDRUCK ZUSAMMENZIEHT, NIMMT IHR GENAU DIESE
 * WIRKUNG. Eine Negativ-Ausnahme (`target !== "pinterest"`) liefe fuer ein neues Ziel
 * stillschweigend als "verlangt einen Code" an — sicher in der RICHTUNG, aber niemand
 * wuerde gefragt, und nichts wuerde rot.
 * DER VERGLEICH MIT isForwardable (capi/ingest.ts) TRAEGT HIER NICHT, und der Satz
 * gehoert dazu, weil er sonst beim naechsten Aufraeumen gezogen wird: Dort ist die
 * positive Menge UNBEGRENZT und nutzerkontrolliert (jeder Custom-Event-Name), und
 * deshalb ist der Negativ-Ausschluss dort richtig. Hier ist sie GESCHLOSSEN und KLEIN.
 *
 * SIE IST KEIN DRITTER ORT NEBEN TARGETS_WITH_TEST_MODE UND DEM CHECK AUS 0029: Jene
 * Auflage zielt auf eine zweite stille LISTE, die auseinanderlaufen kann. Eine
 * erschoepfende Fallunterscheidung kann das nicht — sie bricht den Build, statt still
 * falsch zu werden.
 *
 * WARUM `true` FUER linkedin UND google, DIE GAR KEINEN TESTMODUS HABEN: Es ist die
 * FAIL-CLOSED-Richtung. Eine Zeile mit Frist ohne Code gilt dort als NICHT aktiv — der
 * Riegel feuert nicht, das Ereignis bleibt in events. Der CHECK aus 0029 verbietet
 * beiden Zielen ohnehin BEIDE Spalten; diese Antwort ist die zweite Verteidigung und
 * ausdruecklich KEINE Aussage darueber, dass es dort einen Testmodus gaebe.
 *
 * MODUL-PRIVAT, WEIL ES HEUTE GENAU EINEN LESER GIBT (activeTestCodeFromRow unten) —
 * dieselbe Erwaegung wie bei den Praedikaten darueber: ein Urteil mit EINEM Aufrufer in
 * ein geteiltes Haus zu legen waere Infrastruktur auf Verdacht. Braucht die Scheibe
 * 11.3e sie fuer die ziel-abhaengige Vorpruefung im Schreibpfad, wandert sie DANN.
 *
 * NACHGEZOGEN 11.3e — DER FALL, DEN DER ABSATZ DARUEBER ANKUENDIGT, IST EINGETRETEN,
 * UND ER BLEIBT WOERTLICH STEHEN. Sie ist seit dieser Scheibe EXPORTIERT und hat
 * DREI Leser: activeTestCodeFromRow unten, die Vorpruefung in startTestMode
 * (app/projects/actions.ts) und die Ziel-Karte (components/TargetCard.tsx). Der Ort
 * ist derselbe geblieben — gewandert ist nur das Schluesselwort `export`.
 * WARUM DER ALTE SATZ NICHT GESTRICHEN WIRD: Er traegt die BEGRUENDUNG, unter der
 * die Auskunft einen Aufrufer lang privat war, und die war richtig. Wer sie
 * streicht, verliert den Massstab fuer die naechste Auskunft mit genau einem Leser.
 *
 * DIE AUFLAGE AN DIE DREI LESER — EINE QUELLE, KEIN ZWEITES URTEIL (Entscheidung
 * (13), zweite Auflage, sinngemaess auf den SCHREIBPFAD und die OBERFLAECHE
 * angewandt): Weder die Aktion noch die Karte bilden nach, welches Ziel einen Code
 * verlangt. Sie FRAGEN. Eine zweite Fassung dieser Frage liefe auseinander, und der
 * Bruch waere still: Die Karte boete ein Feld an, dessen Wert der CHECK aus 0029
 * abweist, oder die Aktion verlangte einen Code, den die Karte gar nicht erhebt.
 *
 * SIE IST NICHT DASSELBE WIE TARGETS_WITH_TEST_MODE, und seit 11.3e faellt das
 * auseinander: Jene sagt, welches Ziel UEBERHAUPT einen Testmodus hat; diese, ob es
 * dafuer einen CODE braucht. pinterest steht in beiden — in der einen als Mitglied,
 * in dieser mit `false`.
 */
export function requiresTestCode(target: TrackingTarget): boolean {
  switch (target) {
    case "meta":
      return true;
    case "tiktok":
      return true;
    case "pinterest":
      return false;
    case "linkedin":
      return true;
    case "google":
      return true;
    default: {
      // HIER BRICHT DER BUILD BEIM SECHSTEN ZIEL. `target` ist an dieser Stelle
      // `never`, solange die Faelle darueber die Union erschoepfen; kommt ein Wert
      // hinzu, ist er es nicht mehr und die Zuweisung schlaegt fehl.
      const unbekanntesZiel: never = target;
      return unbekanntesZiel;
    }
  }
}

/**
 * DAS URTEIL UEBER EINE ZEILE. GESCHLOSSENE UNION — URTEIL UND CODE GETRENNT
 * (Scheibe 11.3d, Owner-Entscheidung 2026-09-10).
 *
 * WARUM NICHT `string | true | null` UND WARUM KEIN LEERER STRING FUER "aktiv ohne
 * Code": Ein `if (x)` bliebe fuer beide Faelle wahr. Der Bestand liefe dann
 * stillschweigend weiter und lieferte nur bei den Zielen MIT Code noch einen Wert —
 * genau die Bauform, vor der Entscheidung (14) warnt.
 * DASS BEIDE AUFRUFER DESHALB ANGEFASST WERDEN MUESSEN, IST DER VORTEIL UND NICHT DER
 * PREIS: Der Compiler zaehlt die Aufrufstellen auf, statt sie durchrutschen zu lassen.
 *
 * `code` IST OPTIONAL UND NICHT `code: string | undefined`: Ein Ziel ohne Code-Pflicht
 * traegt den Schluessel GAR NICHT. Der Unterschied ist messbar und nicht kosmetisch —
 * toEqual IGNORIERT einen Schluessel mit dem Wert undefined (GEMESSEN 2026-08-18),
 * `"code" in x` tut es nicht.
 */
export type TestModeVerdict = { aktiv: true; code?: string } | { aktiv: false };

/**
 * IST DER PROJEKT-EIGENE TESTZUSTAND DIESER ZEILE JETZT AKTIV? (Scheibe 11.3a)
 *
 * Liefert den CODE, wenn er es ist, sonst null. Der Rueckgabetyp traegt damit beide
 * Auskuenfte auf einmal — ein Boolean daneben waere ein zweites Urteil ueber denselben
 * Zustand, und die beiden koennten auseinanderlaufen.
 *
 * DIE RANDREGEL, UND SIE IST TEIL DER ENTSCHEIDUNG UND NICHT IHRE FOLGE
 * (Owner-Entscheidung 2026-09-09): expiresAt === now gilt als ABGELAUFEN. Der Vergleich
 * lautet deshalb ">" und nicht ">=". Dieselbe Wahl wie bei Uhr 1 (hasUsableAccessToken)
 * und Uhr 2 (hasLiveRefreshToken) — die Sekunde, in der eine Frist ablaeuft, gehoert
 * nicht mehr ihr.
 * SIE BINDET SCHEIBE 11.3b: Jene braucht dasselbe Praedikat fuer die Anzeige der
 * Restlaufzeit und EXTRAHIERT es dann aus dieser Datei, statt es nachzubauen. Driftet
 * eine zweite Fassung dort auf ">=", zeigt die Oberflaeche "aktiv", WAEHREND DER RIEGEL
 * NICHT FEUERT — ein Widerspruch, den niemand sieht, weil beide Seiten fuer sich
 * plausibel aussehen.
 *
 * MODUL-PRIVAT UND KEINE REINE DATEI, aus demselben Grund wie bei den beiden Praedikaten
 * darueber (Owner-Entscheidung 2026-09-09): ein Praedikat mit EINEM Aufrufer in ein
 * geteiltes Haus zu legen waere Infrastruktur auf Verdacht. Erst 11.3b bekommt einen
 * zweiten Aufrufer, und dann wandert es.
 *
 * NACHGEZOGEN 11.3b, UND DER ABSATZ DARUEBER BLEIBT WOERTLICH STEHEN: Der Fall, den er
 * ANKUENDIGT, ist eingetreten. Es sind seit dieser Scheibe ZWEI Aufrufer — der Resolver
 * (getCapiConfigByTrackingKey in capi/token.ts) und der Leser der Oberflaeche
 * (listTestModeStates in app/projects/actions.ts) —, und das Praedikat IST gewandert:
 * aus capi/token.ts hierher, BYTE-IDENTISCH. "MODUL-PRIVAT UND KEINE REINE DATEI"
 * beschreibt damit den Zustand VOR dem Umzug und nicht den heutigen.
 * WARUM DER ALTE SATZ TROTZDEM STEHENBLEIBT: Er traegt die BEGRUENDUNG, unter der das
 * Praedikat einen Aufrufer lang privat war, und die war richtig. Wer sie streicht,
 * verliert den Massstab fuer das naechste Praedikat mit genau einem Aufrufer.
 *
 * SIE WERTET GEGEN DIE UHR DER LAUFZEIT AUS, NICHT GEGEN DIE DER DATENBANK. nowSeconds
 * ist derselbe Wert, den Uhr 1 und Uhr 2 dieser Aufloesung benutzen — GENAU EINMAL
 * gelesen, damit zwei Ziele derselben Runde nicht verschiedene Bezugspunkte haben. Die
 * Folge einer Uhren-Abweichung steht im Kopf der Migration 0028 und wird hier nicht
 * verdoppelt.
 *
 * FAIL-CLOSED IN JEDEM ZWEIFELSFALL, und "closed" heisst hier NICHT aktiv: Ein
 * fehlender Code, ein Code aus reinem Leerraum, ein fehlender oder unlesbarer
 * Zeitstempel — alles ergibt null. Der Testmodus ist damit die Ausnahme, die man
 * ausdruecklich herstellen muss; die Abwesenheit einer Angabe schaltet ihn nie ein.
 * DER CODE WIRD GETRIMMT, anders als hasSecret weiter unten. Das ist kein Versehen: Ein
 * Geheimnis aus Leerraum galt hier immer als vorhanden (abgebildeter Bestand), ein
 * TESTCODE aus Leerraum dagegen ist ein Wert, den der Kunde aus einer fremden
 * Oberflaeche kopiert hat — er gehoert zur Kennungs-Klasse, und die trimmt.
 * NACHGEZOGEN 11.3b: "hasSecret weiter unten" zeigte auf capi/token.ts und zeigt nach
 * dem Umzug ins Leere. Gemeint ist hasSecret in tracking/target-readiness.ts; der
 * Vergleich selbst gilt unveraendert.
 *
 * SIE WIRFT NIE. typeof-Vergleiche, ein trim, Date.parse (liefert NaN statt zu werfen)
 * und ein Zahlenvergleich.
 *
 * ---------------------------------------------------------------------------
 * NACHGEZOGEN 11.3d, UND DIE ABSAETZE DARUEBER BLEIBEN WOERTLICH STEHEN. Geaendert ist,
 * WORUEBER geurteilt wird: SEIT DIESER SCHEIBE URTEILT SIE UEBER DIE FRIST, DER CODE IST
 * BEIGABE (Entscheidung (14), Owner 2026-09-10). Was daran je Absatz gilt:
 *
 *  · "Liefert den CODE, wenn er es ist, sonst null" — UEBERHOLT ALS FORM, GUELTIG ALS
 *    ZIEL. Der Rueckgabetyp ist jetzt TestModeVerdict und traegt weiterhin BEIDE
 *    Auskuenfte auf einmal; der Satz darueber ("ein Boolean daneben waere ein zweites
 *    Urteil ueber denselben Zustand") ist unveraendert der Grund dafuer. Was nicht
 *    traegt, ist die Annahme, der CODE koenne das Urteil TRAGEN — sie war aus ZWEI
 *    Zielen gebildet, die beide einen Code haben, und auf alle kuenftigen ausgedehnt.
 *    (docs/immer-beachten.md, "EINE REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN — DER
 *    BRUCH ZEIGT SICH AN IHRER BEGRUENDUNG, NICHT AN IHREM WORTLAUT".)
 *
 *  · "FAIL-CLOSED IN JEDEM ZWEIFELSFALL … Ein fehlender Code, ein Code aus reinem
 *    Leerraum, ein fehlender oder unlesbarer Zeitstempel — alles ergibt null." SEIN
 *    ERSTES GLIED GILT KUENFTIG NUR FUER ZIELE MIT CODE-PFLICHT (requiresTestCode
 *    oben); fuer pinterest ist "Frist ohne Code" der einzige Zustand, den sein
 *    Testmodus ueberhaupt annehmen kann — er ist ein QUERY-PARAMETER ohne Code.
 *    DER ZWEITE HALBSATZ BLEIBT WOERTLICH WAHR: "die Abwesenheit einer Angabe schaltet
 *    ihn nie ein" — eingeschaltet wird weiterhin durch die ANWESENHEIT der Frist.
 *    Der ZEITSTEMPEL-Teil ist unberuehrt: fehlt er oder ist er unlesbar, ist der
 *    Testmodus nicht aktiv, bei JEDEM Ziel.
 *
 *  · DER TRIM-ABSATZ gilt unveraendert, wo ein Code steht.
 */
export function activeTestCodeFromRow(
  row: {
    target: unknown;
    test_event_code: unknown;
    test_mode_expires_at: unknown;
  },
  nowSeconds: number,
): TestModeVerdict {
  // DAS ZIEL KOMMT AUS DER ZEILE UND NICHT AUS EINEM ZWEITEN PARAMETER, und das ist
  // eine Entscheidung mit Grund: Die Zeile TRAEGT ihr Ziel (project_secrets.target),
  // und beide Aufrufer lesen die Spalte ohnehin. Ein Parameter daneben liesse sich mit
  // einem FREMDEN Ziel fuellen — dann urteilte das Praedikat ueber die Zeile des einen
  // Ziels nach der Regel eines anderen, und nichts wuerde rot.
  // UNBEKANNTES ZIEL -> NICHT AKTIV. Fail-closed, dieselbe Richtung wie der else-Zweig
  // des CHECK aus 0029: Die Datenbank kann nach einem Rollback Werte tragen, die dieser
  // Code nicht kennt.
  if (!isTrackingTarget(row.target)) return { aktiv: false };

  const code =
    typeof row.test_event_code === "string" ? row.test_event_code.trim() : "";
  // DER FEHLENDE CODE IST NUR NOCH BEI ZIELEN MIT CODE-PFLICHT EIN RIEGEL.
  if (!code && requiresTestCode(row.target)) return { aktiv: false };

  // PostgREST liefert timestamptz als ISO-Zeichenkette. Date.parse gibt bei allem, was
  // keine ist, NaN zurueck — Number.isFinite faengt das, ohne einen zweiten Parser.
  if (typeof row.test_mode_expires_at !== "string") return { aktiv: false };
  const expiresMs = Date.parse(row.test_mode_expires_at);
  if (!Number.isFinite(expiresMs)) return { aktiv: false };

  // DER VERGLEICH LAUTET ">" UND NICHT ">=" — die Randregel der Entscheidung (4), und
  // sie ist von dieser Scheibe NICHT beruehrt.
  if (Math.floor(expiresMs / 1000) > nowSeconds) {
    // DER CODE WIRD NUR GESETZT, WENN ES EINEN GIBT. Ein Schluessel mit dem Wert
    // undefined waere an einem toEqual nicht zu sehen — s. den Kopf von
    // TestModeVerdict.
    return code ? { aktiv: true, code } : { aktiv: true };
  }
  return { aktiv: false };
}

/**
 * DIE DREI LAGEN DES TESTZUSTANDS. GESCHLOSSENE UNION, EPOCHENSEKUNDEN.
 *
 * KEIN FREIER STRING, dieselbe Zusage wie an TargetCredentialState weiter oben und
 * aus demselben Grund: In einem freien String koennte der TESTCODE landen, und der
 * hat auf der Client-Seite nichts verloren. Der Zeitpunkt reist deshalb als ZAHL —
 * lesbar mit formatEpochSeconds in components/TargetCard.tsx, derselben Hausform
 * wie die Ablauf-Lage der Zugangsdaten.
 *
 * "abgelaufen" IST EINE AUSKUNFT UND KEIN ABFALL (Owner-Entscheidung 2026-09-09):
 * Eine abgelaufene Frist bleibt in der Datenbank stehen, und die Karte sagt, WANN
 * sie ablief. Sie zu raeumen hiesse, genau die Angabe zu loeschen, aus der die
 * Auskunft besteht — und ein Raeumen beim LESEN waere ein Schreibvorgang in einem
 * Lesepfad, der bei jedem Laden feuerte, ohne dass jemand etwas angeklickt hat.
 */
export type TargetTestModeState =
  /** Kein Testmodus hinterlegt — oder ein Code, der keiner ist (s. testModeStateFrom). */
  | { kind: "aus" }
  /** Laeuft. Der Riegel im Ingest nimmt Ereignisse dieses Projekts aus events. */
  | { kind: "laeuft"; endetAt: number }
  /** Lief und ist abgelaufen. Der Riegel feuert nicht mehr. */
  | { kind: "abgelaufen"; endeteAt: number };

/** Die Testzustaende je Ziel. Fehlt ein Ziel, traegt es keinen Schalter. */
export type TargetTestModeStates = Partial<
  Record<TrackingTarget, TargetTestModeState>
>;

/**
 * WARUM DER LESER SCHEITERTE. GESCHLOSSEN, SELBSTVERGEBEN, KEIN DB-TEXT — dieselbe
 * Zusage und derselbe Grund wie bei CredentialStatesError.
 */
export type TestModeStatesError =
  /** Keine Sitzung. */
  | "unauthenticated"
  /** Das Projekt gehoert dem Nutzer nicht, existiert nicht, oder das Gate brach. */
  | "not_found"
  /** Die Abfrage selbst ging daneben. */
  | "read_failed";

/** Das Ergebnis des Lesers. */
export type ListTestModeStatesResult =
  | { ok: true; states: TargetTestModeStates }
  | { ok: false; reason: TestModeStatesError };

/**
 * WARUM EINE DER BEIDEN GESTEN SCHEITERTE. GESCHLOSSEN, SELBSTVERGEBEN.
 *
 * `not_configured` IST DER WICHTIGSTE WERT DIESER UNION und der Grund, warum sie
 * ueberhaupt eine ist: Ein `update` ohne getroffene Zeile meldet KEINEN Fehler. Ohne
 * einen eigenen Ausgang dafuer waere "nichts getroffen" von "geschrieben" nicht zu
 * unterscheiden, und der Kunde bekaeme eine Erfolgsmeldung fuer einen Vorgang, der
 * nicht stattgefunden hat.
 *
 * `code_not_allowed` IST MIT 11.3e DAZUGEKOMMEN (Entscheidung (16), Owner
 * 2026-09-10) — DIE OBERFLAECHE KANN IHN NICHT ERZEUGEN, UND DAS IST KEIN ARGUMENT
 * GEGEN IHN: Eine Server Action nimmt entgegen, was ueber die Leitung kommt
 * (dieselbe Erwaegung, die isTrackingTarget ueberhaupt begruendet). Ohne diesen
 * Ausgang waere der CHECK aus 0029 die EINZIGE Stelle, die den Fall je bemerkt —
 * NACH dem Instanziieren des privilegierten Clients und mit einem rohen
 * Datenbank-Fehler als Auskunft.
 * ER IST AUSDRUECKLICH NICHT `unknown_target`: Das Ziel ist BEKANNT und hat einen
 * Testmodus, nur keinen Code. Ein Fehlergrund, der etwas Falsches sagt, schickt den
 * naechsten Sucher an die falsche Stelle.
 */
export type TestModeWriteError =
  /** Keine Sitzung. */
  | "unauthenticated"
  /** Fremdes Projekt, kein Projekt, oder das Gate brach. */
  | "not_found"
  /** Das Ziel ist unbekannt oder traegt keinen Testmodus. */
  | "unknown_target"
  /** Der Code ist nach dem Trimmen leer — nur bei Zielen MIT Code-Pflicht. */
  | "empty_code"
  /**
   * Ein nicht-leerer Code fuer ein Ziel OHNE Code-Pflicht (Scheibe 11.3e).
   *
   * DER GRUND KOMMT AUS requiresTestCode UND AUS KEINER EIGENEN PRUEFUNG — kein
   * zweites Urteil ueber die Code-Pflicht.
   */
  | "code_not_allowed"
  /** Es gibt fuer dieses Ziel keine Geheimnis-Zeile, an der ein Testzustand haengen koennte. */
  | "not_configured"
  /** Der Schreibvorgang selbst ging daneben. */
  | "write_failed"
  /**
   * DER AUFRUF IST GEWORFEN — Netz, Server, Abbruch. Er ist der Ersatzwert fuer
   * safeAction und wird von KEINER der beiden Aktionen zurueckgegeben.
   *
   * ER IST EIN EIGENES MITGLIED UND NICHT write_failed, und das ist der Punkt: Ein
   * Wurf sagt NICHT, ob geschrieben wurde. Bricht die Verbindung auf dem RUECKWEG,
   * ist der Schreibvorgang passiert. Ihn als write_failed zu fuehren behauptete ein
   * ERGEBNIS, das wir nicht kennen.
   */
  | "action_threw";

/** Das Ergebnis einer Geste. Bei Erfolg der NEUE Zustand, damit die Karte nicht raet. */
export type TestModeWriteResult =
  | { ok: true; state: TargetTestModeState }
  | { ok: false; reason: TestModeWriteError };

/**
 * EIN ZEITSTEMPEL AUS DER DATENBANK ALS EPOCHENSEKUNDEN, oder null.
 *
 * SIE URTEILT NICHT. Sie liest nur — ob der Testmodus AKTIV ist, entscheidet
 * ausschliesslich activeTestCodeFromRow, und dieses Urteil wird hier nicht
 * nachgebaut.
 */
function testModeEndsAt(value: unknown): number | null {
  if (typeof value !== "string") return null;
  const ms = Date.parse(value);
  if (!Number.isFinite(ms)) return null;
  return Math.floor(ms / 1000);
}

/**
 * DIE LAGE DES TESTZUSTANDS EINER ZEILE — FUER DIE ANZEIGE.
 *
 * DAS URTEIL "AKTIV" FAELLT DAS UMGEZOGENE PRAEDIKAT UND SONST NICHTS. Diese
 * Funktion fragt es und ordnet danach nur noch den NICHT-aktiven Fall ein. Genau
 * deshalb kann die Karte nicht "laeuft" zeigen, waehrend der Riegel schweigt: Es
 * gibt keine zweite Fassung der Frage.
 *
 * DER NICHT-AKTIVE FALL HAT ZWEI URSACHEN, und sie werden unterschieden:
 * · Die Frist liegt in der VERGANGENHEIT -> "abgelaufen", mit ihrem Zeitpunkt.
 * · Die Frist liegt in der ZUKUNFT, das Praedikat sagt trotzdem nein -> der Code
 *   ist leer oder Leerraum (der CHECK laesst das zu, s. Migration 0028). Dann ist
 *   der Testmodus schlicht "aus" — und NICHT "abgelaufen am <Zukunft>", was eine
 *   sinnlose Auskunft waere.
 * DER VERGLEICH HIER IST `<=`, SPIEGELBILDLICH ZUM `>` DES PRAEDIKATS und
 * gleichlautend mit credentialStateFrom weiter oben: die Sekunde, in der eine Frist
 * ablaeuft, gehoert nicht mehr ihr.
 *
 * NACHGEZOGEN 11.3d — DER ABSATZ UEBER DIE ZWEI URSACHEN BLEIBT WOERTLICH STEHEN UND
 * IST FUER ZIELE MIT CODE-PFLICHT UNVERAENDERT RICHTIG. Seine zweite Ursache ("die
 * Frist liegt in der ZUKUNFT, das Praedikat sagt trotzdem nein -> der Code ist leer
 * oder Leerraum") HAT SEIT DIESER SCHEIBE ZWEI EINSCHRAENKUNGEN: Sie gilt nur noch,
 * wo requiresTestCode das Ziel bejaht — bei pinterest ist genau dieser Zustand
 * "laeuft" —, und sie ist nicht mehr die einzige: auch ein Ziel, das dieser Code gar
 * nicht kennt, faellt hierher.
 * WARUM DIESE FUNKTION MITGEZOGEN WIRD UND NICHT BLEIBT, WIE SIE WAR: Ohne den Nachzug
 * zeigte die Karte "aus", WAEHREND DER RIEGEL FEUERT. Der Kunde saehe, dass nichts
 * laeuft, und seine Conversions verschwaenden — die Umkehrung genau des Widerspruchs,
 * gegen den die Entscheidung (4) gebaut ist.
 */
export function testModeStateFrom(
  row: {
    target: unknown;
    test_event_code: unknown;
    test_mode_expires_at: unknown;
  },
  nowSeconds: number,
): TargetTestModeState {
  const endet = testModeEndsAt(row.test_mode_expires_at);
  if (endet === null) return { kind: "aus" };
  if (activeTestCodeFromRow(row, nowSeconds).aktiv)
    return { kind: "laeuft", endetAt: endet };
  if (endet <= nowSeconds) return { kind: "abgelaufen", endeteAt: endet };
  return { kind: "aus" };
}

/**
 * DER TESTZUSTAND EINES ZIELS FUER DIE KARTE — oder null, wenn es keinen gibt.
 *
 * `null` HEISST HIER DREIERLEI und fuehrt zu DERSELBEN Anzeige, naemlich zu keiner:
 * noch nicht geladen, der Leser scheiterte, oder dieses Ziel traegt keinen
 * Schalter. Dieselbe Figur wie bei credentialStateFor weiter oben.
 *
 * WARUM DIE SICHTBARKEIT DES SCHALTERS DARAN HAENGT UND NICHT AN EINER LISTE IN DER
 * KARTE: Der Leser gibt einen Eintrag nur fuer Ziele heraus, die einen Testmodus
 * TRAGEN, den Kennungs-Filter des Aufloesungs-Pfades PASSIEREN und eine
 * Geheimnis-Zeile HABEN. Alle drei Bedingungen faellt der Server mit denselben
 * Praedikaten, die auch der Resolver benutzt. Die Karte bildet nichts davon nach —
 * sie zeigt den Schalter, wo ein Eintrag ankommt, und kann deshalb nicht
 * divergieren.
 */
export function testModeStateFor(
  testModes: ListTestModeStatesResult | null,
  target: TrackingTarget,
): TargetTestModeState | null {
  if (testModes === null || !testModes.ok) return null;
  return testModes.states[target] ?? null;
}

/**
 * SETZT DEN TESTZUSTAND EINES ZIELS AUF EINEN BEKANNTEN WERT.
 *
 * SIE RAET NICHT, SIE UEBERNIMMT: Nach einer Geste kennt der Server den neuen
 * Zustand und gibt ihn zurueck; hier wird er eingesetzt. Das ist der Unterschied zu
 * withoutTarget weiter oben, die ENTFERNT, weil dort nach dem Speichern eben NICHT
 * bekannt ist, welche Uhr die Zeile traegt.
 *
 * EIN `{ok:false}` BLEIBT `{ok:false}`: Wer nichts weiss, weiss nach einer Geste
 * auch nichts — eine einzelne Auskunft machte aus einem unbekannten Gesamtbild ein
 * scheinbar bekanntes.
 */
export function withTestModeState(
  testModes: ListTestModeStatesResult | null,
  target: TrackingTarget,
  state: TargetTestModeState,
): ListTestModeStatesResult | null {
  if (testModes === null || !testModes.ok) return testModes;
  return { ok: true, states: { ...testModes.states, [target]: state } };
}
