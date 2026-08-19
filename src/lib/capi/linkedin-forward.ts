import "server-only";
import { errorName } from "@/lib/errors";
import { redactOpaque } from "@/lib/redact";

/**
 * DER ADAPTER FUER DAS VIERTE ZIEL (Scheibe 11.1f).
 *
 * DIE ANGABEN UEBER DEN ANBIETER STEHEN IN docs/ziel-befunde.md, Abschnitt "LinkedIn
 * (Conversions API)", Teile (a) bis (s) — und sie sind zur HAELFTE GELESEN und zur
 * Haelfte GEMESSEN. Dieser Kopf nennt je Angabe, welches von beidem gilt; wer das
 * zusammenzieht, baut auf einer Doku-Lesung, als waere sie ein Messwert.
 *
 * WAS AN DIESEM ZIEL ANDERS IST ALS AN DEN DREI BESTEHENDEN — die Liste steht hier,
 * damit niemand abschreibt, was nicht passt:
 *  1. DIE KENNUNG GILT JE EREIGNISTYP. Die anderen drei tragen einen SKALAR; hier ist
 *     es eine Zuordnung Ereignisname -> Conversion-Regel-URN, und der Nachschlag
 *     geschieht IN DIESER DATEI (s. die Auflage an der Bauform F1 im Zuschnitt:
 *     docs/claude-history/phase-11.1-linkedin.md, Scheibe 11.1f).
 *  2. ES GIBT KEIN FELD FUER DEN USER-AGENT. Deshalb nimmt diese Funktion ihn gar
 *     nicht erst entgegen — s. den Absatz an der Signatur.
 *  3. DER BETRAG REIST ALS ZEICHENKETTE, UND DER TYP WIRD GEPRUEFT (GEMESSEN, Teil
 *     (o)): dieselbe Zahl als number ergibt 422. Der zweite Adapter sendet ebenfalls
 *     eine Zeichenkette, der dritte eine Zahl — die Falle liegt zwischen ihnen.
 *  4. DIE ZEITEINHEIT SIND MILLISEKUNDEN. Alle drei anderen senden Sekunden.
 *  5. EIN VERSIONS-HEADER IST PFLICHT (GEMESSEN, Teil (r)): fehlt er, antwortet das
 *     Gateway mit 400 und einer Rumpfform, die keine der uebrigen kennt.
 *  6. DER ERFOLG IST 201 MIT LEEREM RUMPF (GEMESSEN, Teile (d) und (n)) — es gibt
 *     KEINEN Rueckkanal, an dem sich ein Ereignis wiedererkennen liesse.
 *
 * DER VERTRAG, in drei Saetzen — wortgleich der der beiden juengsten Adapter:
 * 1. SIE WIRFT NIE, UND DIE ZUSAGE IST STRUKTURELL GEHALTEN: VOR dem try steht KEINE
 *    ANWEISUNG ausser der Deklaration von `timer`, die nichts auswertet. Riegel,
 *    Nachschlag, Nutzlast- und Kopfzeilen-Bau liegen INNERHALB. Ein Wurf verliesse
 *    diese Funktion, liefe durch dispatchForward und handleIngest und machte aus der
 *    garantierten LEEREN 204 einen 500 — der leakt den Gueltigkeitszustand des
 *    trackingKeys an einen anonymen Aufrufer.
 * 2. SIE WIRD IM REQUEST ERWARTET. Das await beim Aufrufer bleibt.
 * 3. SIE GIBT NICHTS ZURUECK. Geloggt wird hier, nicht beim Aufrufer.
 *
 * DIE EINZIGE ANGABE IN DIESER DATEI, DIE DIE BEFUNDE NICHT DECKEN, und sie steht
 * hier ausdruecklich statt versteckt: DIE ADRESSE DES ENDPUNKTS UND DIE FORM DER
 * AUTORISIERUNGS-KOPFZEILE. docs/ziel-befunde.md protokolliert Statuscodes, Felder,
 * Rumpfformen und den NAMEN des Versions-Headers — die URL und das "Bearer"-Praefix
 * stehen dort NICHT. Beides ist GELESEN (Anbieter-Doku) und durch die neun Laeufe des
 * Owners MITTELBAR bestaetigt (ohne zutreffende Adresse und Autorisierung waeren die
 * gemessenen 201/401/403/422 nicht entstanden), aber es ist NICHT als eigener Befund
 * erhoben. Wer hier etwas aendert, misst zuerst.
 */

/**
 * DIE EIGENE CONFIG-FORM (Bauform F1, Owner-Entscheidung 2026-08-19).
 *
 * NACH DEM MUSTER VON PinterestConfig, und der Grund ist die Grenze, die jener
 * Praezedenzfall zieht: DER EINTRAG in FORWARDER_BY_TARGET (capi/ingest.ts)
 * PROJIZIERT, DER ADAPTER KENNT NUR SEINE FORM. Er kennt weder ResolvedTarget noch
 * CapiConfig — und das ist der Punkt, nicht ein Detail: CapiConfig traegt fuer dieses
 * Ziel eine LEERE pixelId (seit 11.1e), und ein Feld, das fuer den Empfaenger
 * bedeutungslos und nachweislich leer ist, gehoert nicht in seine Signatur.
 *
 * conversionRules REIST ALS GANZES HEREIN, NICHT ALS FERTIGER WERT. Der
 * Schluesselzugriff liegt in DIESER Datei (s. resolveRuleUrn) — im Eintrag laege er
 * SYNCHRON und damit ausserhalb des Containments, und jede Normalisierung, die ihm
 * folgt, wuerde beim naechsten Umbau dorthin nachgezogen.
 */
export type LinkedinConfig = {
  // GEHEIM. Verlaesst den Server NIE — weder in eine HTTP-Response noch in ein Log.
  token: string;
  // Ereignisname -> Conversion-Regel-URN. Der TYP sagt Record<string, string>; der
  // WERT stammt aus dem CLIENT-besessenen Einstellungs-Blob und ist deshalb an der
  // Fundstelle geprueft, nicht geglaubt (s. resolveRuleUrn).
  conversionRules: Record<string, string>;
};

// Striktes Timeout (A-Regel "defensive Timeouts"). VIERTE unabhaengige Zahl fuer
// dieselbe Frage — mit demselben bekannten Preis wie die zweite und dritte: Keine
// Stelle im Repo sieht zwei davon nebeneinander, eine Divergenz faellt beim Lesen
// nicht auf. GEMELDET, NICHT HIER GELOEST: docs/claude-history/backlog-polish.md,
// Eintrag "DER DECKELWERT IST MODUL-PRIVAT UND VON AUSSEN NICHT LESBAR".
const LINKEDIN_FORWARD_TIMEOUT_MS = 3_000;

// Deckel fuer den FREIEN Text des Anbieters (message).
const LINKEDIN_LOG_MAX = 200;

// HARTER, kurzer Deckel fuer die kurzen Felder: code, status und die
// Content-Type-Kopfzeile im Nicht-JSON-Fall.
const LINKEDIN_SHORT_MAX = 64;

/**
 * Der Endpunkt. Feste Zeichenkette, KEINE Interpolation — weder Kennung noch
 * Zugangsdatum stehen im Pfad (beides reist im Rumpf bzw. in einer Kopfzeile). Es
 * gibt hier also keine Kodierungs-Frage wie beim zweiten Adapter.
 * PROVENIENZ: GELESEN, nicht als Befund erhoben — s. den Kopf dieser Datei.
 */
const LINKEDIN_ENDPOINT = "https://api.linkedin.com/rest/conversionEvents";

/**
 * DER VERSIONS-HEADER IST PFLICHT (GEMESSEN, Teil (r)): Ohne ihn antwortet das
 * Gateway mit 400, {"status":400,"code":"VERSION_MISSING",...} und der Kopfzeile
 * X-Restli-Gateway-Error.
 * DER WERT IST EIN DATUM, und der Anbieter schaltet Versionen ab (GELESEN,
 * 2026-08-11) — dieser Wert ist also NICHT dauerhaft. Er ist zugleich der, mit dem
 * alle bisherigen Messungen gefahren wurden; ihn zu aendern heisst, gegen eine
 * ungemessene Version zu senden.
 */
const LINKEDIN_VERSION = "202601";

/**
 * DAS KENNUNGS-SYMBOL. GEMESSEN angenommen (Teil (i)); die Schnittstelle weist ein
 * unbekanntes Symbol mit 422 ab und nennt dabei den Feldpfad.
 * DIE BESCHRAENKUNG AUF IPv4 IST GELESEN, NICHT GEMESSEN (Teil (i), Anbieter-Doku
 * 2026-08-17) — und sie ist der Grund fuer den IPv4-Riegel weiter unten.
 */
const LINKEDIN_ID_TYPE = "PLAINTEXT_IP_ADDRESS";

/**
 * DIE NORMALISIERUNG — SIE STEHT VOR DEM GETEILTEN PRIMITIV, UND DAS IST PFLICHT.
 *
 * redactOpaque (lib/redact.ts) ist NICHT defensiv: es nimmt einen String und ruft
 * darauf .replace. Wer ihm etwas anderes reicht, bekommt einen WURF — und ein Wurf
 * auf diesem Pfad braeche die garantierte leere 204 (s. Vertragssatz 1). Diese
 * Funktion ist der Riegel davor: Sie gibt IMMER einen String zurueck.
 *
 * String(v) UND NICHT "Nicht-Strings werden zum Ersatzwert": Das status-Feld dieses
 * Anbieters ist eine ZAHL und zugleich eine tragende Diagnose-Angabe. Die Umwandlung
 * ist sicher, weil die Eingabe aus JSON.parse stammt — dort entstehen nur
 * Zeichenketten, Zahlen, Wahrheitswerte, null, Objekte und Arrays.
 */
function normalizeProviderValue(v: unknown): string | null {
  if (v === undefined || v === null || v === "") return null;
  return String(v);
}

/**
 * DIE FELD-POLITIK, LANGE FASSUNG — fuer den freien Text des Anbieters.
 * ERSATZWERT, DANN SCHWAERZEN, DANN KAPPEN. Die Reihenfolge ist nicht beliebig: Die
 * Kappung behaelt den ANFANG; laege sie vor der Schwaerzung, bliebe von einer Folge
 * auf der Grenze ein Rest unterhalb der Mindestlaenge stehen und ginge als TEIL-Leak
 * hinaus — in einer Zeile, die bereinigt AUSSIEHT.
 */
function asLogText(v: unknown): string {
  const s = normalizeProviderValue(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, LINKEDIN_LOG_MAX);
}

/**
 * DIE FELD-POLITIK, KURZE FASSUNG — fuer code, status und die Content-Type-Kopfzeile.
 * Schwaerzt ebenfalls und kappt zusaetzlich HART.
 * KEINE AUSNAHME FUER IRGENDEIN FELD: Metas Trace-Bezeichner ist die eigens benannte
 * Ausnahme des ersten Adapters und ruht dort auf einem GEMESSENEN Grund. Fuer diesen
 * Anbieter liegt kein solcher Grund vor — eine Ausnahme ohne Grund waere Abschreiben.
 */
function asLogShort(v: unknown): string {
  const s = normalizeProviderValue(v);
  if (s === null) return "-";
  return redactOpaque(s).slice(0, LINKEDIN_SHORT_MAX);
}

/** Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "". */
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * DIE IPv4-FORMPRUEFUNG — SIE IST DIE EINZIGE STELLE, AN DER EINE IPv6-ADRESSE
 * AUFFAELLT.
 *
 * WARUM SIE UEBERHAUPT NOETIG IST, und beide Haelften gehoeren dazu:
 *  · GELESEN (Teil (i)): PLAINTEXT_IP_ADDRESS meint KLARTEXT und NUR IPv4.
 *  · GEMESSEN (Teil (j)): Die Schnittstelle prueft die FORM des Kennungs-Werts NICHT
 *    — der Wert "999.999.999.999" ergab 201, und die Empfangsanzeige zaehlte ihn MIT.
 * Ohne diesen Riegel ginge eine IPv6-Adresse also als ERFOLG hinaus und liefe ins
 * Leere; nichts wuerde rot.
 *
 * DASS IPv6 IN PRODUKTION VORKOMMT, IST EINE ANNAHME (Owner, 2026-08-18) und keine
 * Messung — am Code ist es nicht entscheidbar, und ohne Live-Traffic nicht messbar.
 * Sie ist die konservative Richtung: Der Riegel ist bei reinem IPv4-Verkehr
 * ueberfluessig und schadet nicht.
 *
 * WAS SIE NICHT LEISTET: Sie prueft die FORM, nicht die Eignung. Fuehrende Nullen
 * ("01.2.3.4") passieren sie; das ist bewusst in Kauf genommen, weil eine strengere
 * Pruefung eine Entscheidung ueber fremdes Parse-Verhalten waere, die niemand
 * gemessen hat.
 */
const IPV4_SHAPE = /^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/;

function isIpv4(value: string): boolean {
  const match = IPV4_SHAPE.exec(value);
  if (!match) return false;
  return match.slice(1).every((group) => Number(group) <= 255);
}

/**
 * DER NACHSCHLAG DER REGEL-KENNUNG — MIT TYPPRUEFUNG, UND DIE IST KEIN PARANOIA-CODE.
 *
 * DER GRUND IST GEMESSEN AM EIGENEN CODE (2026-08-19): Der Resolver nimmt ein Ziel in
 * die Aufloesung auf, wenn hasConversionRules (lib/settings.ts) wahr ist — und jenes
 * Praedikat verlangt nur, dass IRGENDEIN Wert der Zuordnung eine nicht-leere
 * Zeichenkette ist. Ueber den Wert FUER DIESES EREIGNIS sagt es NICHTS. Der Typ
 * Record<string, string> stammt aus dem CLIENT-besessenen Einstellungs-Blob und ist
 * zur Laufzeit keine Zusage: dort kann eine Zahl, ein Objekt oder null stehen.
 * OHNE die Typpruefung wuerfe der Trim genau dort — und ein Wurf hier braeche die
 * leere 204.
 *
 * WAS GARANTIERT IST: dass conversionRules ein Objekt ist (kein null, kein Array) —
 * derselbe Guard im Resolver stellt das sicher.
 */
function resolveRuleUrn(rules: Record<string, string>, event: string): string {
  const raw: unknown = rules[event];
  return typeof raw === "string" ? raw.trim() : "";
}

/**
 * DER BETRAGS-RIEGEL (Bauform B2, Owner-Entscheidung 2026-08-19).
 *
 * GESENDET WIRD NUR, WAS SICHER EINE ZAHL IST. Alles andere laesst conversionValue
 * WEG — das Feld ist optional, und ein FEHLENDER Betrag ist besser als ein falscher.
 *
 * WARUM EIN BLOSSES String(v) NICHT GENUEGT, gemessen an JavaScript selbst: Aus einem
 * Objekt entsteht "[object Object]", aus NaN die Zeichenkette "NaN" — beides sieht in
 * der Nutzlast wie ein Wert aus. Und die Schnittstelle prueft den WERTEBEREICH NICHT
 * (Teile (e) und (j)): Sie quittierte beides mit 201, der Betreiber bekaeme kein
 * Signal, und im Konto stuende Unsinn.
 *
 * DAS DEZIMALKOMMA — DIE ERGAENZUNG MIT DER SCHAERFEREN AUFLAGE:
 * Eine Zeichenkette darf ein DACH-Dezimalkomma tragen ("19,90"). GENAU EIN Komma wird
 * durch einen Punkt ersetzt, BEVOR geprueft wird.
 * MEHR ALS EIN KOMMA WIRD NICHT UMGEFORMT, SONDERN VERWORFEN. Der Grund ist der
 * Schadensfall, nicht die Eleganz: "1,234,567.89" ist Tausendertrennung, und eine
 * Umformung, die sie nicht vom Dezimalkomma unterscheiden kann, machte aus 1,2
 * Millionen die Zahl 1,2. Da die Schnittstelle den Wertebereich nicht prueft, ginge
 * das als Erfolg hinaus — ein um sechs Groessenordnungen falscher Wert, quittiert mit
 * 201. Ein fehlender Betrag ist dagegen harmlos.
 * DER GEMISCHTE FALL FAELLT VON SELBST: "1.234,56" hat EIN Komma, wird zu "1.234.56"
 * und ergibt keine endliche Zahl -> verworfen.
 *
 * RUECKGABE: die NORMALISIERTE Zeichenkette (Punkt als Dezimaltrenner) oder null.
 * Der Anbieter verlangt eine Zeichenkette und weist eine Zahl mit 422 ab (GEMESSEN,
 * Teil (o)) — deshalb reist der Wert als String hinaus und wird hier nicht in eine
 * Zahl umgewandelt.
 */
function normalizeAmount(value: unknown): string | null {
  if (typeof value === "number") {
    return Number.isFinite(value) ? String(value) : null;
  }
  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (trimmed === "") return null;

  const commas = trimmed.split(",").length - 1;
  if (commas > 1) return null;
  const candidate = commas === 1 ? trimmed.replace(",", ".") : trimmed;

  // Number("") waere 0 — der leere Fall ist oben schon heraus. Number(" 1 ") waere
  // ebenfalls 1, aber getrimmt ist bereits.
  const asNumber = Number(candidate);
  if (!Number.isFinite(asNumber)) return null;
  return candidate;
}

/**
 * Liest den Antwortrumpf EINMAL und versucht danach JSON.parse.
 * WIRFT NIE: beide Schritte sind einzeln umschlossen. Eine unlesbare Antwort ist
 * selbst ein Diagnose-Ergebnis, kein Grund fuer einen Fehlerpfad.
 */
async function readBody(
  res: Response,
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

/** Die Felder, die die gemessenen Fehler-Rumpfformen tragen. */
type LinkedinErrorBody = {
  status?: unknown;
  code?: unknown;
  message?: unknown;
};

/**
 * DIE FEHLERDEUTUNG (Bauform D2, Owner-Entscheidung 2026-08-19).
 *
 * VIER GEMESSENE KLASSEN PLUS EIN REST-ZWEIG. Eine fuenfte Form aus dem Gedaechtnis
 * waere eine Behauptung ohne Quelle — deshalb faellt alles Unbekannte sichtbar in den
 * Rest, statt in eine der vier hineingeraten zu koennen.
 *
 * DIE VIER, je mit ihrem Befund:
 *  · 401 — ungueltiges Zugangsdatum (Teil (f)).
 *  · 403 — die Regel-Kennung ist nicht aufloesbar (Teil (c)). SIE WIRD UEBERSETZT,
 *    s. den Absatz darunter.
 *  · 400 MIT code — Gateway; gemessen als fehlender Versions-Header (Teil (r)). Der
 *    Status allein trennt die beiden 400er NICHT; das Feld code tut es.
 *  · 422 — Schema-/Validierungsfehler, MEHRZEILIG mit Feldpfaden, und der Validator
 *    SAMMELT (Teil (i)): eine Antwort kann mehrere Fehler nennen. Genau deshalb geht
 *    die Meldung als GANZES ins Log statt in eine Auswahl.
 *
 * DIE UEBERSETZUNG DER 403 IST DIE EINZIGE IM REPO — und sie ist begruendet, nicht
 * abgeschrieben: GEMESSEN (Teil (c)) antwortet der Anbieter dort mit "No ad accounts
 * found". Das zeigt zur FALSCHEN Ursache — es klingt nach fehlendem Kontozugriff,
 * waehrend in Wahrheit die Kennung nicht aufloesbar ist, und derselbe Status tritt
 * auch bei fehlenden Berechtigungen auf. Ein Adapter, der diese Antwort unuebersetzt
 * durchreicht, schickt die Fehlersuche ans falsche Ende.
 * DER FREMDTEXT WIRD TROTZDEM MITGELOGGT, geschwaerzt und gekappt: Unsere Deutung
 * TRITT NEBEN die Meldung, sie ERSETZT sie nicht — sonst waere die Uebersetzung eine
 * zweite Wahrheit, die niemand mehr gegen das Original halten kann.
 * KEIN PRAEZEDENZFALL IM BESTAND: GEMESSEN am Code (2026-08-19) uebersetzt KEIN
 * anderer Adapter eine Anbieter-Meldung — describeMetaError, describeErrorBody und
 * describeRejection extrahieren, normalisieren, schwaerzen und kappen. Diese Stelle
 * ist die erste; sie ist deshalb eigens begruendet und NICHT als Gewohnheit gedacht.
 */
function describeLinkedinError(
  res: Response,
  raw: string | null,
  parsed: unknown,
): string {
  if (raw === null) return "[capi] LinkedIn forward rejected: body unreadable";
  if (parsed === undefined) {
    return (
      `[capi] LinkedIn forward rejected: non-JSON body suppressed,` +
      ` HTTP ${res.status}` +
      ` type=${asLogShort(res.headers.get("content-type"))}` +
      ` len=${raw.length}`
    );
  }

  const body = (parsed ?? {}) as LinkedinErrorBody;
  const head = `[capi] LinkedIn forward rejected: HTTP ${res.status}`;
  const tail = ` msg=${asLogText(body.message)}`;

  if (res.status === 401) return `${head} reason=invalid-token${tail}`;
  if (res.status === 403) {
    // DIE UEBERSETZUNG: unsere Deutung ZUERST, der Fremdtext daneben.
    return `${head} reason=conversion-rule-not-resolvable-or-no-permission${tail}`;
  }
  if (res.status === 400 && body.code !== undefined) {
    return `${head} reason=gateway code=${asLogShort(body.code)}${tail}`;
  }
  if (res.status === 422) return `${head} reason=payload-rejected${tail}`;

  // DER REST-ZWEIG. Er nennt sich als solcher, damit eine unbekannte Form nicht wie
  // eine gedeutete aussieht — einschliesslich der zweiten gemessenen 400er-Form
  // (Zeitfenster, Teil (s)), die kein code-Feld traegt.
  return (
    `${head} reason=unclassified` +
    ` status=${asLogShort(body.status)}` +
    ` code=${asLogShort(body.code)}${tail}`
  );
}

/**
 * Baut die Nutzlast und stellt sie zu.
 *
 * SIE NIMMT KEINEN USER-AGENT ENTGEGEN, und das ist eine Entscheidung mit Grund:
 * Die Nutzlast dieses Anbieters kennt KEIN Feld dafuer (GEMESSEN, Teile (a), (i),
 * (n): verlangt wird ein Paar aus Kennungs-TYP und Kennungs-WERT). Der Identitaets-
 * Riegel der beiden juengsten Adapter prueft IP UND User-Agent, weil deren Anbieter
 * beide Felder fuehren; hier waere die zweite Haelfte ein selbstgemachter Verlust —
 * ein Beacon ohne User-Agent-Kopfzeile ist fuer DIESES Ziel vollstaendig.
 * DER AUFRUFER REICHT DESHALB EINEN PARAMETER WENIGER: Der Eintrag in
 * FORWARDER_BY_TARGET bekommt sechs Argumente und gibt fuenf weiter — TypeScript
 * deckt das, eine Funktion mit weniger Parametern erfuellt die laengere Signatur.
 *
 * clientIp kommt FERTIG vom Aufrufer — die Ermittlung liest Request-Kopfzeilen, und
 * diese Datei soll kein HTTP kennen, sondern das Vokabular des Anbieters.
 */
export async function forwardToLinkedin(
  config: LinkedinConfig,
  event: string,
  eventID: string,
  body: LinkedinForwardBody,
  clientIp: string | undefined,
): Promise<void> {
  // DIE EINZIGE ANWEISUNG VOR DEM try, UND SIE IST EINE REINE DEKLARATION: sie
  // wertet nichts aus und kann nicht werfen. Sie steht hier, damit finally sie sieht.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // --- RIEGEL 1: KEINE IDENTITAET ---
    //
    // Ohne Kennungs-Wert bliebe das Pflicht-Paar leer, und die Schnittstelle wiese
    // den Aufruf ab (GEMESSEN, Teil (a): Typ UND Wert sind Pflicht). Der Fall ist
    // real: resolveClientIp (capi/ingest.ts) liefert undefined, sobald die vertraute
    // IP loopback oder leer ist.
    if (!clientIp) {
      console.error("[capi] LinkedIn forward skipped: missing identity");
      return;
    }

    // --- RIEGEL 2: KEIN IPv4 ---
    //
    // s. isIpv4 — die Schnittstelle prueft die Form nicht, also pruefen wir sie.
    if (!isIpv4(clientIp)) {
      console.error("[capi] LinkedIn forward skipped: identity is not IPv4");
      return;
    }

    // --- RIEGEL 3: KEIN VERWENDBARER EINTRAG FUER DIESES EREIGNIS ---
    //
    // OHNE URN GIBT ES KEIN ZIEL, an das gesendet werden koennte — die Kennung dieses
    // Anbieters gilt JE EREIGNISTYP.
    // DIE BEDINGUNG IST BREITER ALS "kein Eintrag", und das ist gemessen begruendet
    // (s. resolveRuleUrn): fehlend, leer und nicht-Zeichenkette fallen hier alle
    // heraus. Ein Riegel, der nur auf undefined pruefte, liesse eine Zahl aus dem
    // Blob bis zum Trim durch.
    // DAS IST EINE NEUE KLASSE IM BESTAND: Kein anderer Adapter kann fuer MANCHE
    // Ereignisse nichts senden — isForwardable schliesst ein Ereignis fuer ALLE Ziele
    // aus, hasAdapter ein Ziel fuer ALLE Ereignisse. Eine Bedingung ueber die PAARUNG
    // gab es bis hierher nicht.
    const conversion = resolveRuleUrn(config.conversionRules, event);
    if (!conversion) {
      console.error(
        "[capi] LinkedIn forward skipped: no conversion rule for event",
      );
      return;
    }

    // --- Server-gesetztes Feld (NIE aus Client-Payload) ---
    // MILLISEKUNDEN, nicht Sekunden (Unterschied 4 im Kopf). Der Wert ist per
    // Konstruktion "jetzt" und liegt damit im gemessenen 90-Tage-Fenster (Teil (s));
    // ein Zeitstempel aus dem Client-Blob wird hier BEWUSST nicht gelesen.
    const conversionHappenedAt = Date.now();

    const payload: Record<string, unknown> = {
      conversion,
      conversionHappenedAt,
      // DAS FELD WIRD MITGESCHICKT, WEIL ES ANGENOMMEN WIRD (GEMESSEN, Teil (p) —
      // belegt durch eine Positivkontrolle im selben Lauf: ein ERFUNDENES Feld fiel
      // mit 422, also sagt die 201 danach etwas).
      // AUSDRUECKLICH KEINE DEDUP-ZUSAGE: Dass der Anbieter damit dedupliziert, ist
      // NICHT gemessen und mit den heutigen Instrumenten nicht messbar (Teil (q) —
      // die Anzeige-Zahlen reagieren auf Testdaten ueberhaupt nicht). Wer aus dieser
      // Zeile eine Zusage an den Kunden ableitet, leitet sie aus nichts ab.
      eventId: eventID,
      user: {
        userIds: [{ idType: LINKEDIN_ID_TYPE, idValue: clientIp }],
      },
    };

    // --- conversionValue: NUR wenn BEIDE Haelften tragen ---
    //
    // Der Betrag durchlaeuft den Riegel (s. normalizeAmount). Die Waehrung muss
    // ebenfalls vorliegen: Ein Betrag OHNE Waehrungscode ist an dieser Schnittstelle
    // NICHT gemessen — die gemessene Form traegt beide Felder (Teil (n)). Eine Haelfte
    // allein zu senden waere eine Annahme ueber fremdes Verhalten.
    // WAS BEWUSST NICHT GEPRUEFT WIRD: ob der Waehrungscode gueltig IST. Ein
    // erfundener Code wird mit 201 quittiert (Teil (e)); eine eigene Liste waere eine
    // zweite Wahrheit ueber ein fremdes System.
    const amount = normalizeAmount(body.value);
    const currencyCode = asString(body.currency);
    if (amount !== null && currencyCode) {
      payload.conversionValue = { currencyCode, amount };
    }

    const controller = new AbortController();
    timer = setTimeout(() => controller.abort(), LINKEDIN_FORWARD_TIMEOUT_MS);
    const res = await fetch(LINKEDIN_ENDPOINT, {
      method: "POST",
      headers: {
        // DAS GEHEIMNIS REIST IN DER AUTORISIERUNGS-KOPFZEILE, nicht im Query-String.
        // Die URL ist damit kein Geheimnis-Traeger; geloggt wird sie trotzdem nicht.
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
        // PFLICHT (GEMESSEN, Teil (r)).
        "LinkedIn-Version": LINKEDIN_VERSION,
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // --- DIE ANTWORT ---
    //
    // ERFOLG IST 201 MIT LEEREM RUMPF (GEMESSEN, Teile (d), (n)). Es gibt NICHTS zu
    // lesen — kein Zaehlwerk, keine Ereignis-Kennung, keinen Status im Rumpf. Der
    // Statuscode ist die ganze Auskunft, und deshalb gibt es hier auch keine
    // Erfolgs-Auswertung wie beim zweiten Adapter.
    // WAS DAS FUER DIE BEOBACHTBARKEIT HEISST, und der Satz gehoert hierher: Ein
    // gelungener Forward hinterlaesst an UNSERER Seite nichts — kein Log, keine
    // Zeile in events (die Tabelle traegt keine Ziel-Dimension). Sichtbar ist er
    // allein am Zeitstempel der Empfangsanzeige des Anbieters.
    if (!res.ok) {
      const { raw, parsed } = await readBody(res);
      console.error(describeLinkedinError(res, raw, parsed));
    }
  } catch (err) {
    // Nur der Fehler-NAME. errorName liest ausschliesslich .name — nie die Message,
    // die Client-Input oder Fremdtext tragen kann. Ein Abort landet als DOMException
    // hier und wird dadurch als "AbortError" statt "unknown" sichtbar.
    console.error(`[capi] LinkedIn forward error: ${errorName(err)}`);
  } finally {
    // Der Timer wird IMMER geloescht — nach dem Muster aller drei bestehenden
    // Adapter. Ohne diese Zeile liefe er nach einer schnellen Antwort weiter und
    // hielte die Invocation; der Preis dieses Pfads ist der CONCURRENCY-SLOT.
    clearTimeout(timer);
  }
}

/**
 * Das UNTRUSTED Client-Blob, SOWEIT die LinkedIn-Nutzlast es liest.
 *
 * BEWUSST EIGEN und NICHT MetaForwardBody: Jener fuehrt _fbp (Metas Cookie), das hier
 * nie gelesen wird. eventSourceUrl fehlt ebenfalls — die gemessene Nutzlast dieses
 * Anbieters kennt kein Feld dafuer.
 */
export type LinkedinForwardBody = {
  value?: unknown;
  currency?: unknown;
};
