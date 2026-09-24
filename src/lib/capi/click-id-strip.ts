// FREMDE KLICK-KENNUNGEN AUS DER WEITERGEREICHTEN ADRESSE ENTFERNEN (Phase 11.7, S4).
//
// DER GRUNDSATZ: EINE KLICK-KENNUNG GEHT NUR AN IHREN URHEBER (docs/offene-punkte.md,
// Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Teil (E3)). Die Seitenadresse
// reist als `location.href` samt Query-String an meta, pinterest und tiktok; ein `gclid`
// darin ginge an drei Anbieter, die es nicht vergeben haben. Diese Datei ist die EINE
// Stelle, die das verhindert — gerufen in jedem Adapter, der die Adresse sendet, dort,
// wo das Adressfeld gebaut wird.
//
// SIE IST REIN — KEIN import "server-only", kein Netz, kein DOM, kein Zustand. Dieselbe
// Ablage-Entscheidung wie bei google-click-ids.ts: die server-only-Adapter importieren
// sie, nicht umgekehrt. Ohne diesen Satz fuegt die naechste Aufraeumrunde server-only
// hinzu.
//
// WAS stripForeignClickIds NICHT TUT, und jede Grenze ist eine Entscheidung:
//  - SIE ENTFERNT NUR, SIE SETZT NICHTS. Keine Kennung erreicht ueber sie ein Ziel, das
//    sie vorher nicht bekam. DIE HUELLEN WEITER UNTEN (extractFbclid, extractLiFatId,
//    extractTtclid) LESEN HERAUS: Sie liefern einem Urheber seine EIGENE Kennung —
//    linkedin bekommt die Adresse gar nicht und erhaelt li_fat_id allein ueber
//    extractLiFatId (Phase 11.7, S6a); tiktok erhaelt ttclid zusaetzlich zur Adresse
//    ueber extractTtclid (S8).
//  - NEGATIVLISTE: Entfernt werden nur Kennungen der Tabelle, die einem ANDEREN Ziel
//    gehoeren. Die Adresse gehoert dem Betreiber; URL-basierte Regeln beim Anbieter
//    braechen still, wenn hier mehr wegfiele. Eine Kennung, die nicht in der Tabelle
//    steht, reist weiter mit — die Tabelle waechst additiv, je Zeile mit Quelle.
//  - NUR DER QUERY-TEIL: Das Fragment einer parsebaren Adresse bleibt unberuehrt; eine
//    Kennung dort reist weiter mit. Fuer das Fragment liegt kein Anbieter-Befund vor.
//  - SIE PRUEFT KEINE FORM eines Werts, nur den NAMEN eines Parameters.

import type { TrackingTarget } from "@/lib/settings";
// DIE GOOGLE-NAMEN KOMMEN AUS DER DATEI, DIE SIE HERAUSLIEST — eine Quelle fuer dieselben
// Namen. Eine zweite Liste hier plus ein Gleichlauf-Test verwaltete einen Zustand, den
// der Import gar nicht entstehen laesst.
import { CLICK_ID_PARAMS } from "@/lib/capi/google-click-ids";

/** Eine Zeile der Tabelle: die Parameternamen eines Urhebers und woher sie stammen. */
export type ClickIdRow = {
  /** Die Namen, KLEINGESCHRIEBEN — das ist die Vergleichsform (s. comparisonName). */
  readonly params: readonly string[];
  /** Woher der Name stammt: Teil der Ziel-Datei bzw. die Konstante im Code. */
  readonly quelle: string;
};

/**
 * DIE TABELLE URHEBER -> KLICK-KENNUNGEN.
 *
 * EIN Record UEBER ALLE ZIELE UND KEINE LISTE: Der Compiler verlangt damit eine Zeile je
 * Ziel. Ein neues Ziel kompiliert erst, wenn hier entschieden ist, welche Kennungen es
 * vergibt — ein Ziel ohne Klick-Kennung bekaeme eine ausdruecklich LEERE Zeile. Die
 * Aufzaehlung der Stellen mit Ziel-Wissen in tracking/target-adapters.ts fuehrt diese
 * Tabelle nicht; sie erzwingt sich hier selbst.
 *
 * DIE ERWARTUNG AN DIESE ZEILEN steht von Hand in click-id-strip.test.ts (T1) und wird
 * dort gegen diese Werte gehalten — nie umgekehrt.
 */
export const CLICK_ID_TABLE: Readonly<Record<TrackingTarget, ClickIdRow>> = {
  meta: {
    params: ["fbclid"],
    quelle: "docs/ziel-befunde/meta.md, Teil (h)",
  },
  pinterest: {
    params: ["epik"],
    quelle: "docs/ziel-befunde/pinterest.md, Teile (ac), (af)",
  },
  tiktok: {
    params: ["ttclid"],
    quelle: "docs/ziel-befunde/tiktok.md, Teil (j)",
  },
  linkedin: {
    params: ["li_fat_id"],
    quelle: "docs/ziel-befunde/linkedin.md, Teil (an)",
  },
  // DIE SCHREIBUNG DIESER DREI ALS URL-PARAMETER IST UNBELEGT — die Ziel-Datei fuehrt sie
  // nur als Felder der Einlieferung. Hier gilt das nicht als Mangel: Beim ENTFERNEN wird
  // ohne Ruecksicht auf die Schreibung verglichen (s. comparisonName).
  google: {
    params: CLICK_ID_PARAMS,
    quelle: "src/lib/capi/google-click-ids.ts, CLICK_ID_PARAMS",
  },
};

/**
 * DIE FLACHE SUCHE, AUS DER TABELLE ABGELEITET: Vergleichsname -> Urheber.
 *
 * EINE Map UND KEIN OBJEKTLITERAL: Der Name kommt aus der Adresse und ist damit
 * UNTRUSTED. Ein Objektliteral lieferte fuer "constructor" einen Wert aus
 * Object.prototype. Gebaut beim Laden des Moduls — Schleifen und Map.set, nichts, was
 * werfen kann.
 */
const OWNER_BY_PARAM: ReadonlyMap<string, TrackingTarget> = (() => {
  const owners = new Map<string, TrackingTarget>();
  for (const target of Object.keys(CLICK_ID_TABLE) as TrackingTarget[]) {
    for (const param of CLICK_ID_TABLE[target].params) {
      owners.set(param.toLowerCase(), target);
    }
  }
  return owners;
})();

/**
 * DER NAME EINES SEGMENTS, WIE IHN EIN STANDARD-PARSER BEIM ANBIETER SIEHT — kleingeschrieben.
 *
 * Tab, LF und CR entfallen (der URL-Parser entfernt sie vor dem Zerlegen), dann wird der
 * Name dekodiert wie application/x-www-form-urlencoded (Prozent-Folgen, "+" als
 * Leerzeichen). So trifft `%67clid` als `gclid`, und `gclid%3D1` bleibt `gclid=1`.
 * DAS IST NUR DIE VERGLEICHSFORM: Ausgegeben wird immer das ROHE Segment.
 *
 * Der fuehrende "?" wird verdoppelt, weil der Konstruktor genau einen abschneidet — im
 * Query-Teil einer Adresse ist "?gclid" ein Name mit Fragezeichen, kein "gclid".
 * OHNE RUECKSICHT AUF GROSS- UND KLEINSCHREIBUNG: Keine Quelle sagt etwas zur Schreibung
 * des Namens; beim Entfernen ist ein Zuviel die sichere Richtung. Beim HERAUSLESEN
 * (extractGoogleClickIds) bleibt der Vergleich exakt.
 */
function comparisonName(segment: string): string {
  const cleaned = segment.replace(/[\t\n\r]/g, "");
  const eq = cleaned.indexOf("=");
  const rawName = eq === -1 ? cleaned : cleaned.slice(0, eq);
  const key = new URLSearchParams(
    rawName.startsWith("?") ? `?${rawName}` : rawName,
  )
    .keys()
    .next().value;
  return (key ?? "").toLowerCase();
}

/** Gehoert das Segment einem ANDEREN Urheber als dem Ziel? Unbekannt heisst nein. */
function isForeign(segment: string, target: TrackingTarget): boolean {
  const owner = OWNER_BY_PARAM.get(comparisonName(segment));
  return owner !== undefined && owner !== target;
}

/** Ist die Adresse fuer den Standard-Parser eine absolute URL? Wirft nie. */
function isParseable(url: string): boolean {
  try {
    return new URL(url).href.length > 0;
  } catch {
    return false;
  }
}

/** Alles ab dem ersten "?" oder "#" entfaellt. Nur indexOf und slice — wirft nie. */
function cutAtQueryOrFragment(url: string): string {
  const q = url.indexOf("?");
  const h = url.indexOf("#");
  const cut = q === -1 ? h : h === -1 ? q : Math.min(q, h);
  return cut === -1 ? url : url.slice(0, cut);
}

/**
 * Gibt die Adresse ohne die FREMDEN Klick-Kennungen der Tabelle zurueck.
 *
 * DER VERTRAG:
 * (a) SIE WIRFT NIE. Sie liegt auf dem Ingest-Pfad, bei meta sogar VOR dessen try; ein
 *     Wurf braeche dort die Zusage "vor dem try nur Wurffreies". Gehalten durch eine
 *     typeof-Weiche, eine umschlossene Parse-Probe und einen umschlossenen Rest.
 * (b) WIRD NICHTS ENTFERNT, IST DIE AUSGABE DIE EINGABE — zeichengleich, auch wenn sie
 *     nicht normalisiert ist. Das Ergebnis von `new URL` wird NIE ausgegeben; es
 *     schriebe Host und Schema klein, striche den Standard-Port, kodierte Leerzeichen um.
 * (c) WIRD ETWAS ENTFERNT, fallen genau die fremden Segmente samt je EINEM angrenzenden
 *     "&" weg; jedes andere Zeichen bleibt. Faellt das letzte Segment, bleibt das "?"
 *     stehen — die Regel gilt ohne Ausnahme.
 * (d) NICHT PARSEBAR (relativ, kaputt): alles ab dem ersten "?" oder "#" entfaellt, auch
 *     die eigene Kennung. Unveraendert durchzulassen leakte still; das Feld zu streichen
 *     kostete bei meta ein Pflichtfeld. Bleibt dabei nichts uebrig, ist die Ausgabe "" —
 *     und der Adapter laesst ein leeres Feld weg wie bisher.
 * (e) KEINE ZEICHENKETTE -> "".
 *
 * Der Query-Teil reicht vom ersten "?" bis zum ersten "#"; steht ein "#" vor dem "?",
 * gibt es keinen Query-Teil.
 */
export function stripForeignClickIds(
  url: unknown,
  target: TrackingTarget,
): string {
  if (typeof url !== "string") return "";
  if (!isParseable(url)) return cutAtQueryOrFragment(url);

  try {
    const q = url.indexOf("?");
    const h = url.indexOf("#");
    if (q === -1 || (h !== -1 && h < q)) return url;

    const end = h === -1 ? url.length : h;
    const segments = url.slice(q + 1, end).split("&");
    const kept = segments.filter((segment) => !isForeign(segment, target));
    if (kept.length === segments.length) return url;

    return url.slice(0, q + 1) + kept.join("&") + url.slice(end);
  } catch {
    // KEIN BEKANNTER EINGANG ERREICHT DIESEN ZWEIG — hier stehen nur Zeichenketten-
    // Operationen und ein URLSearchParams ueber einer Zeichenkette. Er steht fuer die
    // Zusage (a), und er faellt in die Richtung von (d): im Zweifel weniger senden.
    return cutAtQueryOrFragment(url);
  }
}

/**
 * DER GEMEINSAME KERN DES HERAUSLESENS — EXAKT, WURFFREI (Phase 11.7, S6a; bis dahin der
 * Rumpf von extractFbclid, Zeichen fuer Zeichen mit dem Namen als Parameter).
 *
 * MODULPRIVAT, UND DAS IST DIE ENTSCHEIDUNG: Ein freier Namens-Parameter nach aussen luede
 * dazu ein, beliebige Namen herauszulesen. Nach aussen gehen allein die Huellen je
 * Kennung; ein weiterer Urheber bekommt eine weitere Huelle.
 *
 * EXAKT, NICHT OHNE SCHREIBUNG — anders als beim Entfernen oben. Beim HERAUSLESEN ist ein
 * Zuviel die falsche Richtung: ein zufaellig gleichnamiger Parameter wuerde als Kennung
 * gesendet. "Exakt" heisst dabei: exakt auf dem Namen, wie der Standard-Parser ihn
 * DEKODIERT.
 *
 * DER WERT, WIE DER STANDARD-PARSER IHN LIEFERT (dekodiert), OHNE FORMPRUEFUNG UND OHNE TRIM:
 * Anwesenheit, nie Form. Mehrfach vorhanden -> das ERSTE Vorkommen. Das Fragment liest der
 * Parser nicht.
 *
 * SIE WIRFT NIE. Eine typeof-Weiche und ein try um den einzigen werfenden Ausdruck.
 *
 * @returns den Wert, oder "" wenn keiner vorliegt — fehlend, leer, nicht parsebar oder
 *          keine Zeichenkette.
 */
function readClickIdExact(url: unknown, name: string): string {
  if (typeof url !== "string") return "";
  try {
    return new URL(url).searchParams.get(name) ?? "";
  } catch {
    return "";
  }
}

/**
 * LIEST DIE KLICK-KENNUNG VON META (`fbclid`) AUS EINER ADRESSE — EXAKT (Phase 11.7, S5).
 *
 * DAS MUSTER IST extractGoogleClickIds (capi/google-click-ids.ts), und jene bleibt unberuehrt:
 * eine eigene Funktion statt eines Umbaus am Google-Vertrag. SEIT S6a DELEGIERT SIE an
 * readClickIdExact; ihr Vertrag ist unveraendert.
 *
 * "Exakt" heisst hier: `fb%63lid` trifft, `FBCLID` nicht.
 *
 * Zu Kodierung und Fehlform schweigt die Quelle (docs/ziel-befunde/meta.md, Teil (h)); echte
 * Werte bestehen aus `[A-Za-z0-9_-]` und sind davon nicht beruehrt.
 *
 * SIE WIRFT NIE — sie laeuft in forwardToMeta VOR dessen try.
 *
 * @returns den Wert, oder "" wenn keiner vorliegt — fehlend, leer, nicht parsebar oder
 *          keine Zeichenkette.
 */
export function extractFbclid(url: unknown): string {
  return readClickIdExact(url, "fbclid");
}

/**
 * LIEST DIE KLICK-KENNUNG VON LINKEDIN (`li_fat_id`) AUS EINER ADRESSE — EXAKT (Phase 11.7,
 * S6a). Derselbe Kern, derselbe Vertrag wie extractFbclid.
 *
 * DER NAME: docs/ziel-befunde/linkedin.md, Teil (an) — das Beispiel des Anbieters liest
 * `new URLSearchParams(window.location.search).get("li_fat_id")`. Zur Schreibung des Namens
 * und zu Format und Kodierung des Werts nennt die Quelle nichts (ebenda); deshalb exakt und
 * ohne Formpruefung.
 *
 * SIE WIRFT NIE — sie laeuft in forwardToLinkedin innerhalb des try, und die Zusage gilt
 * trotzdem: sie ist die des Kerns.
 *
 * @returns den Wert, oder "" wenn keiner vorliegt — fehlend, leer, nicht parsebar oder
 *          keine Zeichenkette.
 */
export function extractLiFatId(url: unknown): string {
  return readClickIdExact(url, "li_fat_id");
}

/**
 * LIEST DIE KLICK-KENNUNG VON TIKTOK (`ttclid`) AUS EINER ADRESSE — EXAKT (Phase 11.7, S8).
 * Derselbe Kern, derselbe Vertrag wie extractFbclid und extractLiFatId.
 *
 * DIE QUELLE: docs/ziel-befunde/tiktok.md, Teil (j) — der Parameter heisst `ttclid`, der
 * Wert gehoert in `user.ttclid`, und er kann bis zu 1 000 Zeichen lang sein ("you need to
 * ensure that you don't truncate it"). Deshalb weder Kuerzung noch Formpruefung; zu
 * Schreibung und Kodierung nennt die Quelle nichts.
 *
 * ZWEI FORMEN DERSELBEN KENNUNG IN EINER NUTZLAST: Diese Huelle liefert den Wert DEKODIERT,
 * wie der Standard-Parser ihn liest — Prozent-Folgen aufgeloest, ein "+" als Leerzeichen.
 * In `page.url` steht dieselbe Kennung ROH, weil stripForeignClickIds die eigene Kennung
 * unveraendert stehen laesst. Traegt ein Wert "%" oder "+", sind die beiden Zeichenketten
 * verschieden.
 *
 * SIE WIRFT NIE — sie laeuft in forwardToTiktok innerhalb des try; die Zusage ist die des
 * Kerns.
 *
 * @returns den Wert, oder "" wenn keiner vorliegt — fehlend, leer, nicht parsebar oder
 *          keine Zeichenkette.
 */
export function extractTtclid(url: unknown): string {
  return readClickIdExact(url, "ttclid");
}
