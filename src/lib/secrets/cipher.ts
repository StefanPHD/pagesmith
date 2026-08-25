import "server-only";
import { createCipheriv, createDecipheriv, randomBytes } from "node:crypto";

// ===========================================================================
// CHIFFRIEREN UND DECHIFFRIEREN EINES GEHEIMNISSES (Phase 11.8, Scheibe 11.8a).
//
// WAS DIESE DATEI IST: ZWEI Funktionen. Kein Netz, kein Zustand, keine Datenbank,
// keine Spalte, kein OAuth, kein Aufrufer. Sie ist der Unterbau der
// Autorisierungsschicht und verdrahtet nichts.
//
// SIE HAT IM PRODUKTIVCODE HEUTE KEINEN AUFRUFER — nur ihre Tests rufen sie. Das ist
// die tragende Invariante dieser Scheibe (docs/aktiver-stand-11.8.md, "## Scheibe
// 11.8a"): Wer einen Aufrufer ergaenzt, baut nicht mehr diese Scheibe.
//
// WARUM DAS VERFAHREN VOR DEM SCHEMA KOMMT — der Grund steht im Zuschnitt und wird
// hier nur benannt, damit er am Code steht: Ein falsches Schema faellt beim ersten
// Zugriff auf, ein kaputter OAuth-Fluss beim ersten Klick — ein schwaches Verfahren
// faellt NIE auf.
//
// SIE HEISST NICHT "ENVELOPE", und das ist Absicht: Das Sicherheits-Manifest
// reserviert das Wort fuer die Bauform MIT einem Schluesselverwaltungsdienst
// ("echtes Envelope braucht KMS", CLAUDE.md, Tier 1). Hier liegt der Schluessel in
// der Umgebung, nicht in einem solchen Dienst. Wer die Datei so nennt, behauptet
// eine Eigenschaft, die sie nicht hat.
//
// KEINE UMLAUTE IM QUELLTEXT — wie in den Nachbardateien (capi/token.ts,
// vercel/client.ts): ae/oe/ue/ss. Grund ist die Werkzeug-Regel in
// docs/immer-beachten.md: ein Ganz-Datei-Schreiber kann Umlaute doppelt kodiert
// zurueckschreiben, und das faellt nur im Diff auf.
//
// ---------------------------------------------------------------------------
// DAS VERFAHREN: AES-256-GCM aus node:crypto. KEINE neue Abhaengigkeit — die harte
// Rahmenbedingung gilt, und Krypto ist der letzte Ort fuer eine Ausnahme.
// AUTHENTIFIZIERT (GCM traegt ein Etikett, das jede Veraenderung auffliegen laesst).
// NIE ZWEIMAL DASSELBE (ein zufaelliges Nonce je Aufruf) — sonst verriete der
// Speicher, welche zwei Projekte dasselbe Geheimnis tragen.
//
// ---------------------------------------------------------------------------
// DIE FORM DER ZEICHENKETTE — FUENF TEILE, getrennt durch einen Punkt:
//
//   v1 . <kennung> . <nonce> . <etikett> . <chiffrat>
//
// Die ersten ZWEI Teile ("v1.<kennung>") sind der KOPF und werden als
// mitauthentisierte Zusatzdaten (AAD) gebunden. Wer am Kopf etwas aendert, aendert
// damit die Zusatzdaten — das Etikett stimmt dann nicht mehr, und der Versuch endet
// auf auth_failed statt auf einem stillen Erfolg.
// Die drei hinteren Teile sind base64url. Das Ergebnis ist damit reines ASCII aus
// [A-Za-z0-9_-.] — es passt in eine text-Spalte und uebersteht den Weg ueber den
// JS-Client unveraendert (kein +, kein /, kein =, kein Zeilenumbruch, kein NUL).
//
// ---------------------------------------------------------------------------
// WARUM K2 (VERGEBENE KENNUNG) UND NICHT K3 (FINGERABDRUCK DES SCHLUESSELS):
// Ein Fingerabdruck ist eine dauerhafte Eigenschaft des Chiffrats und eine Funktion
// des Schluessels — er erlaubt, Chiffrate ueber Produktion, Entwicklung und Backups
// hinweg DEMSELBEN Schluessel zuzuordnen, und er kostet eine Ableitung auf dem
// spaeteren Ingest-Lesepfad. Eine vergebene Kennung leistet dieselbe Zuordnung ohne
// beides. (Owner/Architekt, 2026-08-25.)
//
// WARUM T2 (EIN VARIABLEN-MUSTER, VERSCHIEDENE WERTE UND KENNUNGEN JE UMGEBUNG) UND
// NICHT T1 (ZWEI VARIABLEN-NAMEN, AUSGEWAEHLT NACH NODE_ENV):
// T1 machte NODE_ENV zu einer Sicherheitsachse, die es heute nicht ist — und
// `next build` setzt lokal NODE_ENV=production, ein lokaler Build griffe also zum
// Produktionsnamen. Stattdessen traegt jede Umgebung EIGENE Kennungen: Ein
// Produktions-Chiffrat nennt eine Kennung, die eine Entwicklungsumgebung nicht kennt
// -> unknown_key, laut, VOR jedem Dechiffrier-Versuch. (Owner/Architekt, 2026-08-25.)
//
// ---------------------------------------------------------------------------
// DIE REGEL, DIE DIE RESTGEFAHR VON K2 TRAEGT — SIE BINDET JEDE SPAETERE RUNDE, DIE
// EINEN SCHLUESSEL WECHSELT:
//
//   EINE KENNUNG WIRD NIE FUER EINEN ANDEREN SCHLUESSELWERT WIEDERVERWENDET.
//
// Wer den Wert unter derselben Kennung austauscht, erzeugt genau die Verwechslung,
// die K2 verhindern soll — und sie faellt auf auth_failed zurueck, also auf die
// Ununterscheidbarkeit zwischen "falscher Schluessel" und "veraendertes Chiffrat",
// die K2 gerade beseitigen sollte. Ein neuer Schluessel bekommt eine NEUE Kennung;
// der alte bleibt zum Lesen stehen, bis nichts mehr unter ihm liegt.
// WAS DER CODE DAVON PRUEFEN KANN UND WAS NICHT: Er weist eine Konfiguration ab, die
// DIESELBE Kennung zweimal auffuehrt (readKeyMap -> bad_key). Er kann NICHT sehen,
// dass eine Kennung gestern einen anderen Wert trug — das ist eine Aussage ueber die
// Zeit, und die traegt allein die Regel oben.
//
// ---------------------------------------------------------------------------
// DIESE FUNKTIONEN WERFEN NIE. Der spaetere Lesepfad ist der Ingest, und dort gilt
// das 204-CONTAINMENT (docs/immer-beachten.md): "auch das Fehler-Geruest selbst darf
// nie nach aussen werfen." Der Schreibpfad (Server-Action) kann JEDE Form
// verarbeiten; nur EINE der beiden Seiten hat eine harte Auflage, also gibt die vor.
// VORAUSSETZUNG, wie bei lib/redact.ts: der Aufrufer uebergibt wirklich einen String.
// Der Typ sagt es, die Charakterisierung in cipher.test.ts haelt es fest.
//
// kind:"ok" IST DER EINZIGE WEG ZU EINEM KLARTEXT. Kein Ersatzwert, kein null, kein
// "" im Fehlerfall — und das ist keine Stilfrage, sondern am Code gemessen (CC,
// 2026-08-25): capi/token.ts verwirft eine Geheimnis-Zeile per hasSecret
// (tracking/target-readiness.ts) still, wenn der Wert kein String oder leer ist. Ein
// leerer Rueckgabewert liefe genau in diesen Filter, das Ziel verschwaende lautlos
// aus der Empfaengerliste, und niemand saehe je einen Schluesselfehler. Ein
// Fehlschlag beim Dechiffrieren darf NIE wie ein fehlendes Geheimnis aussehen.
//
// KEIN ZWEIG TRAEGT EINEN FEHLERTEXT, nur eine Art. Ein Text kaeme aus der Laufzeit
// (die Meldung von decipher.final() ist Fremdtext) — ihn durchzureichen waere die
// Fehlerklasse aus "SCHWAERZUNG — VIER TEILE" und aus "EIN KOMMENTAR IST EINE
// BEHAUPTUNG". Wer protokollieren will, nimmt die Art oder errorName aus lib/errors.
//
// ---------------------------------------------------------------------------
// DIE UMGEBUNGSVARIABLEN — NON-NEXT_PUBLIC, zwingend: ein NEXT_PUBLIC_-Wert wird zur
// Build-Zeit ins Client-Bundle inlined (docs/immer-beachten.md,
// "NEXT_PUBLIC_-REDEPLOY-PFLICHT"), der Schluessel laege dann in jedem
// ausgelieferten Bundle. Vorbild mit Begruendung: supabase/admin.ts.
//
//   SECRET_ENC_KEYS            "<kennung>:<32 byte, base64>[,<kennung>:<...>]"
//                              MEHRERE Eintraege sind der ganze Zweck von K2: Alt
//                              und Neu liegen nebeneinander, jedes Chiffrat sagt
//                              selbst, welchen es braucht. Ein Wechsel wird damit
//                              ein Zustand mit Ende statt eines Stichtags.
//   SECRET_ENC_ACTIVE_KEY_ID   die Kennung, unter der NEUE Chiffrate entstehen.
//                              Wird nur beim Chiffrieren gelesen.
//
// GELESEN JE AUFRUF, nicht beim Laden des Moduls — Muster von capi/proxy.ts und
// capi/tiktok-forward.ts. Grund: der Test-Bestand setzt process.env je Test und
// stellt ihn zurueck (capi/proxy.test.ts), und ein beim Laden gelesener Schluessel
// bliebe nach einer Rotation im laufenden Prozess stehen.
//
// WAS NEU IST GEGENUEBER DEM BESTAND, damit es niemand fuer Fortsetzung haelt: In
// den 21 heutigen process.env-Fundstellen (GEMESSEN, CC 2026-08-25) erzeugt ein
// fehlender Wert NIRGENDS einen benannten Fehlzustand — er wird zu "" (proxy.ts,
// tiktok-forward.ts), zu einem Ergebnis kind:"error" (vercel/client.ts), zu einem
// Vorgabewert (capi/config.ts) oder zu einem spaeteren Wurf in der Fremdbibliothek
// (supabase/admin.ts). Hier ist er ein EIGENER Ausgang, getrennt von "unbrauchbar".
// ===========================================================================

/** Die Fassung der Zeichenketten-Form. Teil 0 jedes Chiffrats. */
const FORMAT_VERSION = "v1";

/** Das Trennzeichen der fuenf Teile. */
const SEPARATOR = ".";

/** Die Zahl der Teile. Genau fuenf — nicht mehr, nicht weniger. */
const PART_COUNT = 5;

/**
 * DER ZEICHENVORRAT DER KENNUNG — Kleinbuchstaben, Ziffern, Bindestrich, Unterstrich,
 * 1 bis 32 Zeichen. DAS IST KEINE KOSMETIK, und die Begruendung hat drei Teile:
 * (1) Der Punkt ist AUSGESCHLOSSEN. Enthielte die Kennung ihn, braeche die Zerlegung
 *     der fuenf Teile — und zwar still: aus fuenf Teilen wuerden sechs, und das
 *     Chiffrat waere nach dem naechsten Deploy unlesbar.
 * (2) Der Vorrat ist eine TEILMENGE von base64url. Damit steht in der ganzen
 *     Zeichenkette nichts, was irgendwo maskiert werden muesste.
 * (3) KEINE GROSSBUCHSTABEN. Zwei Kennungen, die sich nur in der Schreibweise
 *     unterscheiden, sind fuer einen Menschen dieselbe — und genau daraus entstuende
 *     die Verwechslung, gegen die die Kennungs-Regel oben geschrieben ist.
 */
const KEY_ID_PATTERN = /^[a-z0-9_-]{1,32}$/;

/**
 * Der Zeichenvorrat der drei hinteren Teile. GEPRUEFT VOR DEM DEKODIEREN, weil
 * Buffer.from(x, "base64url") nachsichtig ist: es ueberspringt unbekannte Zeichen
 * still und liefert dann einen kuerzeren Puffer statt eines Fehlers.
 */
const B64URL_PATTERN = /^[A-Za-z0-9_-]*$/;

const ALGORITHM = "aes-256-gcm";
const KEY_BYTES = 32;
const NONCE_BYTES = 12;
const TAG_BYTES = 16;

const ENV_KEYS = "SECRET_ENC_KEYS";
const ENV_ACTIVE_KEY_ID = "SECRET_ENC_ACTIVE_KEY_ID";

/**
 * Das Ergebnis des Chiffrierens.
 * - no_key:  es ist ueberhaupt kein Schluesselmaterial erreichbar (Variable fehlt,
 *            ist leer oder nur Leerraum; oder es ist keine aktive Kennung benannt).
 * - bad_key: Schluesselmaterial ist da, aber unbrauchbar (Form, Laenge, doppelte
 *            Kennung, aktive Kennung nicht im Vorrat).
 */
export type EncryptResult =
  | { kind: "ok"; value: string }
  | { kind: "no_key" }
  | { kind: "bad_key" };

/**
 * Das Ergebnis des Dechiffrierens. FUENF Fehlzustaende, bewusst getrennt — sie fallen
 * nicht zusammen, weil ihre Ursachen verschieden sind und der teuerste Ausgang der
 * waere, bei dem ein Schluesselfehler wie ein fehlendes Geheimnis aussieht.
 * - no_key:      kein Schluesselmaterial erreichbar.
 * - bad_key:     Schluesselmaterial da, aber unbrauchbar.
 * - bad_format:  die Zeichenkette ist kein Chiffrat dieser Form.
 * - unknown_key: der Kopf nennt eine Kennung, die dieser Umgebung nicht bekannt ist.
 *                DAS IST DER FALL "anderer Schluessel, andere Umgebung" — er wird VOR
 *                jedem Dechiffrier-Versuch erkannt und ist damit von einer
 *                Manipulation unterscheidbar.
 * - auth_failed: das Etikett stimmt nicht. Die Ursache ist EIN VERAENDERTES CHIFFRAT
 *                ODER EIN FALSCHER SCHLUESSELWERT UNTER BEKANNTER KENNUNG — beide
 *                sehen am Verfahren gleich aus, und genau davor schuetzt die
 *                Kennungs-Regel im Kopf dieser Datei.
 */
export type DecryptResult =
  | { kind: "ok"; value: string }
  | { kind: "no_key" }
  | { kind: "bad_key" }
  | { kind: "bad_format" }
  | { kind: "unknown_key" }
  | { kind: "auth_failed" };

type KeyMapResult =
  | { kind: "ok"; keys: Map<string, Buffer> }
  | { kind: "no_key" }
  | { kind: "bad_key" };

/**
 * Liest SECRET_ENC_KEYS und baut die Abbildung Kennung -> Schluessel.
 *
 * DIE DOPPELTE KENNUNG WIRD ABGEWIESEN, nicht ueberschrieben: "der letzte gewinnt"
 * waere eine stille Entscheidung darueber, welcher von zwei Schluesseln gilt — und
 * damit genau die Verwechslung, gegen die die Kennungs-Regel geschrieben ist.
 * ZWEI KENNUNGEN AUF DENSELBEN WERT sind dagegen ERLAUBT: das ist keine
 * Verwechslungsgefahr, sondern hoechstens eine unnoetige Zeile.
 */
function readKeyMap(): KeyMapResult {
  const raw = process.env[ENV_KEYS]?.trim() ?? "";
  if (!raw) return { kind: "no_key" };

  const keys = new Map<string, Buffer>();
  for (const rawEntry of raw.split(",")) {
    const entry = rawEntry.trim();
    // Ein leerer Eintrag ist ein Tippfehler (ein Komma zuviel), keine Feinheit.
    if (!entry) return { kind: "bad_key" };

    // Auf das ERSTE Doppelpunkt-Zeichen trennen: base64 enthaelt keines, die Kennung
    // per Zeichenvorrat ebenfalls nicht.
    const cut = entry.indexOf(":");
    if (cut <= 0) return { kind: "bad_key" };

    const id = entry.slice(0, cut).trim();
    const material = entry.slice(cut + 1).trim();
    if (!KEY_ID_PATTERN.test(id)) return { kind: "bad_key" };
    if (!material) return { kind: "bad_key" };

    const key = Buffer.from(material, "base64");
    if (key.length !== KEY_BYTES) return { kind: "bad_key" };
    if (keys.has(id)) return { kind: "bad_key" };

    keys.set(id, key);
  }

  if (keys.size === 0) return { kind: "no_key" };
  return { kind: "ok", keys };
}

/** base64url ohne Auffuellzeichen — der Vorrat der drei hinteren Teile. */
function toB64Url(buf: Buffer): string {
  return buf.toString("base64url");
}

/**
 * Chiffriert einen Klartext unter der AKTIVEN Kennung.
 *
 * WIRFT NIE (s. Kopf). Der try/catch um den Krypto-Teil ist kein Zierrat: Er faengt
 * auch den Fall, dass die Laufzeit das Verfahren nicht kennt — und ein Wurf von hier
 * braeche spaeter am Ingest die zugesicherte leere 204.
 */
export function encryptSecret(plaintext: string): EncryptResult {
  const map = readKeyMap();
  if (map.kind !== "ok") return { kind: map.kind };

  const activeId = process.env[ENV_ACTIVE_KEY_ID]?.trim() ?? "";
  // KEINE aktive Kennung ist "es fehlt etwas", eine UNBRAUCHBARE ist "es ist kaputt".
  if (!activeId) return { kind: "no_key" };
  if (!KEY_ID_PATTERN.test(activeId)) return { kind: "bad_key" };

  const key = map.keys.get(activeId);
  if (!key) return { kind: "bad_key" };

  try {
    const nonce = randomBytes(NONCE_BYTES);
    // DER KOPF IST ZUGLEICH DIE ZUSATZDATEN-BINDUNG. Er wird EINMAL gebaut und
    // sowohl in die Zeichenkette geschrieben als auch mitauthentisiert — waeren es
    // zwei Ausdruecke, koennten sie auseinanderlaufen.
    const header = `${FORMAT_VERSION}${SEPARATOR}${activeId}`;
    const cipher = createCipheriv(ALGORITHM, key, nonce);
    cipher.setAAD(Buffer.from(header, "utf8"));
    const ciphertext = Buffer.concat([
      cipher.update(plaintext, "utf8"),
      cipher.final(),
    ]);
    const tag = cipher.getAuthTag();
    return {
      kind: "ok",
      value: [header, toB64Url(nonce), toB64Url(tag), toB64Url(ciphertext)].join(
        SEPARATOR,
      ),
    };
  } catch {
    return { kind: "bad_key" };
  }
}

/**
 * Dechiffriert eine Zeichenkette dieser Form.
 *
 * DIE REIHENFOLGE DER PRUEFUNGEN IST TRAGEND: erst die Form, dann die Kennung, dann
 * erst der Krypto-Versuch. Nur so ist "diese Umgebung kennt den Schluessel nicht"
 * (unknown_key) von "das Etikett stimmt nicht" (auth_failed) zu unterscheiden — die
 * Unterscheidung, wegen der die Kennung ueberhaupt mitreist.
 */
export function decryptSecret(payload: string): DecryptResult {
  const map = readKeyMap();
  if (map.kind !== "ok") return { kind: map.kind };

  const parts = payload.split(SEPARATOR);
  if (parts.length !== PART_COUNT) return { kind: "bad_format" };

  const [version, keyId, nonceRaw, tagRaw, ciphertextRaw] = parts;
  if (version !== FORMAT_VERSION) return { kind: "bad_format" };
  if (!KEY_ID_PATTERN.test(keyId)) return { kind: "bad_format" };
  // Das Chiffrat DARF leer sein (leerer Klartext), Nonce und Etikett nie.
  if (!nonceRaw || !tagRaw) return { kind: "bad_format" };
  if (
    !B64URL_PATTERN.test(nonceRaw) ||
    !B64URL_PATTERN.test(tagRaw) ||
    !B64URL_PATTERN.test(ciphertextRaw)
  )
    return { kind: "bad_format" };

  const key = map.keys.get(keyId);
  if (!key) return { kind: "unknown_key" };

  const nonce = Buffer.from(nonceRaw, "base64url");
  if (nonce.length !== NONCE_BYTES) return { kind: "bad_format" };
  const tag = Buffer.from(tagRaw, "base64url");
  if (tag.length !== TAG_BYTES) return { kind: "bad_format" };
  const ciphertext = Buffer.from(ciphertextRaw, "base64url");

  try {
    const decipher = createDecipheriv(ALGORITHM, key, nonce);
    decipher.setAAD(Buffer.from(`${version}${SEPARATOR}${keyId}`, "utf8"));
    decipher.setAuthTag(tag);
    const plaintext = Buffer.concat([
      decipher.update(ciphertext),
      decipher.final(),
    ]);
    return { kind: "ok", value: plaintext.toString("utf8") };
  } catch {
    // KEIN Fremdtext nach aussen: die Meldung der Laufzeit bleibt hier.
    return { kind: "auth_failed" };
  }
}
