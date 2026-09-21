// FREMDE TRACKING-BAUSTEINE — DIE REINE ERKENNUNG AUF DEM DOKUMENT
// (Phase 11.11, Scheibe 11.11b; bindende Entscheidungen P11.11-3, P11.11-5,
// P11.11-12, P11.11-26 bis P11.11-32).
//
// SIE LIEST, SIE SCHREIBT NICHT. Kein Knoten wird angefasst, kein Attribut gesetzt,
// nichts entfernt — die Scheibe 11.11b ist rein lesend (P11.11-31), und das Entfernen
// fremder Pixel ist 11.11c.
//
// SIE LAEUFT AUF DEM BEREITS ZERLEGTEN DOKUMENT DES IMPORT-PFADS, unmittelbar nach dem
// Parse und VOR stabilizeDoc (P11.11-12, Satz 1). KEIN ZWEITER PARSE (P11.11-5). Dass
// sie VOR stabilizeDoc laeuft, aendert am Ergebnis nichts — jene Funktion fasst nur
// LINKABLE_SELECTOR-Elemente an, nie ein script, img oder iframe —, aber der fruehe
// Ort ist entschieden und kostet nichts.
//
// EIGEN VOR FREMD (P11.11-26), und das ist der Grund fuer den Import aus
// own-blocks-strip.ts: UNSER Wiring-Script traegt `connect.facebook.net` und
// `fbq(`-Aufrufe ALS ZEICHENKETTEN (GEMESSEN, VERMERK P11.11-17, Punkt (g)). In
// umgekehrter Reihenfolge meldete diese Datei unseren eigenen Baustein als fremdes
// Meta-Pixel — und ein fremdes Pixel bekaeme in 11.11c ein Entfernen-Angebot. DIE
// KNOTENAUSWAHL WIRD DESHALB NICHT NACHGEBAUT, SONDERN GETEILT: eine Quelle, keine
// zweite (dieselbe Denkfigur wie beim Praedikat in own-blocks.ts).

import { collectOwnNodes } from "./own-blocks-strip";
import {
  FOREIGN_SIGNATURES,
  type ForeignClass,
  type ForeignSignature,
} from "./foreign-signatures";

/**
 * Ein Fund. ZWEI GESTALTEN, und die Aufteilung ist P11.11-32, Punkt (c):
 *
 * - BEKANNT wird JE ANBIETER-MENGE gezeigt, mit der Zahl der Fundstellen. Ein
 *   Basiscode plus drei Ereigniszeilen desselben Pixels sind VIER Knoten und EINE
 *   Tatsache; vier Zeilen zu zeigen verdeckt sie.
 * - UNBEKANNT wird JE KNOTEN gezeigt. Dort gibt es keinen Anbieter, nach dem man
 *   gruppieren koennte — der Knoten ist die einzige Einheit, die es gibt.
 */
export type ForeignFinding =
  | {
      art: "bekannt";
      /** Ein Eintrag, oder mehrere bei einem Knoten mit mehreren Anbietern (E2). */
      anbieter: readonly string[];
      /** Die Klassen der beteiligten Anbieter, dedupliziert, in fester Reihenfolge. */
      klassen: readonly ForeignClass[];
      /** Zahl der Knoten in dieser Gruppe. */
      stellen: number;
      /**
       * Sind die Knoten dieser Gruppe geparkt? DIE GRUPPE IST DARIN EINHEITLICH —
       * der Parkzustand geht in den Gruppierungs-Schluessel ein. Sonst stuende an
       * einer gemischten Gruppe ein Zusatz, der nur fuer einen Teil gilt.
       */
      geparkt: boolean;
    }
  | {
      art: "unbekannt";
      /** Die Adresse, oder UNKNOWN_INLINE fuer ein Script ohne Adresse. */
      kennung: string;
      /** Nur bei einem Inline-Script: der gekuerzte Rumpf. Sonst null. */
      ausschnitt: string | null;
    };

/**
 * Das Ergebnis eines Laufs. DREI ZUSTAENDE, NICHT ZWEI — P11.11-12, Satz 2 verlangt,
 * dass "fehlgeschlagen" von "nichts gefunden" unterscheidbar ist, und "nicht gelaufen"
 * ist wieder etwas anderes:
 *
 * - "ok"      — die Erkennung lief; `findings` kann leer sein.
 * - "failed"  — die Erkennung hat geworfen. Die VORSCHAU bleibt unberuehrt.
 * - "skipped" — sie ist gar nicht gelaufen (kein DOMParser beim Server-Render, oder
 *               der Parse selbst ist gescheitert). Das ist KEIN Fehler der Erkennung.
 *
 * EIN OPTIONALES FELD WAERE FAIL-OPEN GEWESEN: "Feld fehlt" hiesse dann zugleich
 * "nichts gefunden" und "nicht gelaufen", und genau die Unterscheidung, die Satz 2
 * verlangt, verschwaende (Dauerregel EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB).
 */
export type ForeignScan =
  | { status: "ok"; findings: ForeignFinding[] }
  | { status: "failed" }
  | { status: "skipped" };

/** Die Kennung eines unbekannten Scripts ohne Adresse (Wortlaut: OWNER, 2026-09-21). */
export const UNKNOWN_INLINE = "Inline-Skript";

/**
 * Laenge des Ausschnitts eines unbekannten Inline-Scripts, in CODEPUNKTEN.
 *
 * ACHTZIG, UND DIE ZAHL IST BEGRUENDET: Die Fundliste steht in der schmalen
 * BAUEN-Spalte neben der Elementliste. Achtzig Zeichen sind dort rund eine Zeile —
 * genug, um ein Script an seiner ersten Anweisung wiederzuerkennen, und wenig genug,
 * dass ein unbekanntes Script die Liste nicht beherrscht, deren Nebensache es ist.
 * Der Rumpf wird ausserdem auf einfache Leerzeichen normalisiert, damit ein
 * mehrzeiliges Script keine hohe Zeile erzeugt.
 */
export const INLINE_EXCERPT_MAX = 80;

/** Feste Reihenfolge der Klassen in der Anzeige — kein Set-Iterations-Flackern. */
const CLASS_ORDER: readonly ForeignClass[] = ["pixel", "cmp", "container"];

/**
 * REINE DATENBLOECKE WERDEN NICHT GELISTET (P11.11-12, Satz 4). Sie fuehren keinen
 * Code aus; sie in einer Liste zu fuehren, die von Tracking handelt, waere Rauschen.
 */
const DATA_SCRIPT_TYPES: readonly string[] = [
  "application/ld+json",
  "application/json",
];

/**
 * Die drei BELEGTEN Parkformen (P11.11-30). Die Liste ist abschliessend fuer das, was
 * belegt ist, nicht fuer das, was es gibt: Ein CMP mit einer vierten Parkform
 * erschiene als laufendes Script — der von P11.11-15 gewollte Ausgang, kein Defekt.
 *
 * `data-cookieyes` steht hier eigens, weil CookieYes als EINZIGES der gelesenen CMPs
 * OHNE Typwechsel parkt: das Script behaelt `type` und `src` und traegt nur das
 * Attribut (VERMERK P11.11-25). Wer nur auf `text/plain` prueft, haelt ein von
 * CookieYes geparktes Script fuer ein laufendes.
 */
function istGeparkt(el: Element): boolean {
  const type = (el.getAttribute("type") ?? "").trim().toLowerCase();
  if (type === "text/plain") return true;
  if (el.hasAttribute("data-cookieyes")) return true;
  return el.classList.contains("cmplazyload");
}

/**
 * Adressen, die KEINE sind. `about:blank` ist der Platzhalter, den consentmanager in
 * `src` schreibt, waehrend die echte Adresse nach `data-cmp-src` wandert (VERMERK
 * P11.11-25, consentmanager (d)).
 *
 * Verglichen wird kleingeschrieben, aber GANZ und nicht als Teilzeichenkette: ein
 * Teilvergleich schluckte auch eine echte Adresse, die das Wort enthaelt.
 */
const PLATZHALTER_ADRESSEN: readonly string[] = ["about:blank"];

/**
 * ALLE Adressen eines Knotens — an DREI Orten (P11.11-30), in fester Reihenfolge.
 *
 * SIE LIEFERT ALLE KANDIDATEN UND NICHT DEN ERSTEN, und das ist eine KORREKTUR mit
 * einem gemessenen Anlass: consentmanager parkt ein `<iframe>`, indem es
 * `src="about:blank"` setzt und die echte Adresse nach `data-cmp-src` verschiebt
 * (VERMERK P11.11-25, consentmanager (d)). Ein so geparktes Tag-Manager-iframe haette
 * unter "erster nicht-leerer Wert" die Adresse `about:blank` getragen, KEINE Signatur
 * getroffen und waere GAR NICHT ERSCHIENEN — unbekannte iframes werden bewusst nicht
 * gelistet (P11.11-29). DAS WAERE EIN STILLER FEHLSCHLAG GEWESEN: kein Fund, kein
 * Hinweis, nichts, woran es auffiele.
 *
 * GEMESSEN (CC, 2026-09-21): Bei einem per `type="text/plain"` geparkten Script
 * liefert `getAttribute("src")` `null`, und die Adresse steht je nach CMP in
 * `data-src` (Klaro) oder `data-cmp-src` (consentmanager). Ein Erkenner allein ueber
 * `src` saehe solche Knoten als adresslos.
 *
 * WAS BLEIBT, WENN ALLE DREI PLATZHALTER ODER LEER SIND: eine leere Liste. Ein
 * `<script src="about:blank">` erscheint dann als adressloses Inline-Skript — es hat
 * keine verwertbare Adresse, und das ist die ehrliche Auskunft.
 */
function adressenVon(el: Element): string[] {
  const out: string[] = [];
  for (const attr of ["src", "data-src", "data-cmp-src"]) {
    const v = (el.getAttribute(attr) ?? "").trim();
    if (v === "") continue;
    if (PLATZHALTER_ADRESSEN.includes(v.toLowerCase())) continue;
    out.push(v);
  }
  return out;
}

/**
 * Anbieter, deren Adresse ODER Rueckfall-Adresse in EINEM der Kandidaten vorkommt —
 * die VEREINIGUNG ueber alle Adress-Orte.
 *
 * Die Reihenfolge ist die der Signaturliste, nicht die der Kandidaten: `filter` laeuft
 * ueber FOREIGN_SIGNATURES. So ist die Anbieter-Folge eines Fundes reproduzierbar und
 * haengt nicht daran, in welchem Attribut die Adresse zufaellig stand.
 */
function trefferUeberAdressen(
  adressen: readonly string[]
): ForeignSignature[] {
  if (adressen.length === 0) return [];
  return FOREIGN_SIGNATURES.filter((s) =>
    adressen.some(
      (adresse) =>
        s.adressen.some((a) => adresse.includes(a)) ||
        s.rueckfall.some((r) => adresse.includes(r))
    )
  );
}

/** Anbieter, deren globaler Name oder Aufruf in diesem Text vorkommt. */
function trefferUeberNamen(text: string): ForeignSignature[] {
  if (text === "") return [];
  return FOREIGN_SIGNATURES.filter((s) => s.namen.some((n) => text.includes(n)));
}

/**
 * EINE BEKANNTE ADRESSE GEHT VOR EINEM NAMEN (P11.11-32, Punkt (d)).
 *
 * DER GRUND: Die Adresse ist das haertere Merkmal — sie steht in einem Attribut, das
 * nur ein Anbieter belegen kann, waehrend ein Name im Rumpf jedes beliebigen Scripts
 * stehen darf. Trifft die Adresse, entscheidet sie ALLEIN; der Rumpf wird dann gar
 * nicht mehr befragt.
 *
 * TREFFEN NUR NAMEN MEHRERER ANBIETER, GEHOERT DER KNOTEN ALLEN. Wer nur den ERSTEN
 * Treffer zaehlte, machte die Reihenfolge der Signaturliste zur Produktaussage: ein
 * Inline-Script mit zwei Pixeln erschiene als eines, und welches gewinnt, hinge an der
 * Sortierung.
 */
function anbieterFuer(
  adressen: readonly string[],
  rumpf: string
): ForeignSignature[] {
  const ueberAdresse = trefferUeberAdressen(adressen);
  if (ueberAdresse.length > 0) return ueberAdresse;
  return trefferUeberNamen(rumpf);
}

/** Der gekuerzte, auf einfache Leerzeichen normalisierte Rumpf eines Inline-Scripts. */
function ausschnittVon(rumpf: string): string | null {
  const flach = rumpf.replace(/\s+/g, " ").trim();
  if (flach === "") return null;
  const zeichen = Array.from(flach);
  return zeichen.length <= INLINE_EXCERPT_MAX
    ? flach
    : `${zeichen.slice(0, INLINE_EXCERPT_MAX).join("")}…`;
}

type BekanntRoh = {
  anbieter: string[];
  klassen: ForeignClass[];
  geparkt: boolean;
};

/**
 * Der Gruppierungs-Schluessel einer bekannten Fundstelle: die Anbieter-Menge PLUS der
 * Parkzustand.
 *
 * DER PARKZUSTAND GEHOERT IN DEN SCHLUESSEL, damit jede Gruppe darin EINHEITLICH ist.
 * Sonst stuende an einer gemischten Gruppe ein "wartet auf Einwilligung", das nur fuer
 * einen Teil ihrer Fundstellen gilt — eine Aussage, die mehr behauptet als sie traegt.
 *
 * `\u0000` als Trenner, weil kein Anbietername ihn enthalten kann.
 */
function gruppenSchluessel(roh: BekanntRoh): string {
  return `${roh.anbieter.join("\u0000")}|${roh.geparkt ? "1" : "0"}`;
}

/**
 * Erkennt fremde Tracking-Bausteine in einem bereits geparsten Dokument.
 *
 * SIE FAENGT IHREN EIGENEN WURF (P11.11-12, Satz 2). DER GRUND IST DER GANZE SATZ:
 * annotateAndDetect traegt einen aeusseren `catch`, der `{ html: "", elements: [] }`
 * zurueckgibt — die VORSCHAU WAERE LEER. Ein Wurf dieser Erkennung darf dort nicht
 * hineinlaufen; er meldet sich als "failed", und der Betreiber sieht seine Seite
 * weiterhin.
 */
export function scanForeignTags(doc: Document): ForeignScan {
  try {
    const eigen = new Set<Element>(collectOwnNodes(doc));
    const gesehen = new Set<Element>();
    const gruppen = new Map<string, { roh: BekanntRoh; stellen: number }>();
    const unbekannt: ForeignFinding[] = [];

    const buchen = (roh: BekanntRoh) => {
      const key = gruppenSchluessel(roh);
      const vorhanden = gruppen.get(key);
      if (vorhanden) vorhanden.stellen += 1;
      else gruppen.set(key, { roh, stellen: 1 });
    };

    const rohAus = (
      treffer: ForeignSignature[],
      geparkt: boolean
    ): BekanntRoh => ({
      anbieter: treffer.map((s) => s.anbieter),
      klassen: CLASS_ORDER.filter((k) => treffer.some((s) => s.klasse === k)),
      geparkt,
    });

    // (1) SCRIPTE — jedes wird angezeigt, bekannte werden markiert (P11.11-3).
    doc.querySelectorAll("script").forEach((el) => {
      if (eigen.has(el) || gesehen.has(el)) return;
      const type = (el.getAttribute("type") ?? "").trim().toLowerCase();
      if (DATA_SCRIPT_TYPES.includes(type)) return;
      gesehen.add(el);

      const adressen = adressenVon(el);
      const rumpf = el.textContent ?? "";
      const treffer = anbieterFuer(adressen, rumpf);

      if (treffer.length > 0) {
        buchen(rohAus(treffer, istGeparkt(el)));
        return;
      }
      // FUER DIE KENNUNG EINES UNBEKANNTEN SCRIPTS GILT DER ERSTE KANDIDAT. Die
      // Erkennung liest alle drei Orte, die ANZEIGE zeigt einen — mehrere Adressen an
      // einer Zeile eines Fundes, den niemand zuordnen kann, waeren Rauschen.
      unbekannt.push(
        adressen.length > 0
          ? { art: "unbekannt", kennung: adressen[0], ausschnitt: null }
          : {
              art: "unbekannt",
              kennung: UNKNOWN_INLINE,
              ausschnitt: ausschnittVon(rumpf),
            }
      );
    });

    // (2) BILD- UND IFRAME-TAGS mit BEKANNTER Adresse — auch ohne Script daneben
    // (P11.11-29). Meta und Pinterest duerfen ausweislich ihrer Doku allein als
    // Bild-Tag stehen; eine Erkennung nur ueber <script> saehe eine solche Seite
    // nicht.
    //
    // UNBEKANNTE BILDER UND IFRAMES ERSCHEINEN NICHT, und die Asymmetrie zu (1) ist
    // Absicht: Eine Seite traegt eine Handvoll Scripte und beliebig viele Bilder. Die
    // Sichtbarkeit des Veraltens, die P11.11-3 traegt, leisten die Scripte bereits.
    //
    // DER PLATZ DES <noscript> SPIELT KEINE ROLLE, und das ist GEMESSEN (CC,
    // 2026-09-21, jsdom 29.1.1): Steht das <noscript> im head, ist es nach dem Parse
    // LEER und sein <img> liegt im body; steht es im body, bleibt das <img> sein Kind.
    // BEIDE FAELLE FINDET DIESE dokumentweite Abfrage. Erkannt wird ueber die ADRESSE,
    // nicht ueber den Platz (P11.11-12, Satz 6).
    //
    // EIN GEPARKTES IFRAME TRAEGT SEINE ADRESSE NICHT IN `src`: consentmanager setzt
    // dort `about:blank` und verschiebt sie nach `data-cmp-src`. Deshalb liest
    // adressenVon ALLE drei Orte und wirft den Platzhalter weg — sonst waere ein so
    // geparkter Tag-Manager-Container unsichtbar geblieben.
    doc.querySelectorAll("img, iframe").forEach((el) => {
      if (eigen.has(el) || gesehen.has(el)) return;
      const treffer = trefferUeberAdressen(adressenVon(el));
      if (treffer.length === 0) return;
      gesehen.add(el);
      buchen(rohAus(treffer, istGeparkt(el)));
    });

    // (3) INLINE-HANDLER — NUR mit bekanntem Anbieter-Aufruf (P11.11-12, Satz 7).
    // Sonst stuende jede Schaltflaeche der Seite in der Liste.
    doc.querySelectorAll("[onclick], [onsubmit]").forEach((el) => {
      if (eigen.has(el) || gesehen.has(el)) return;
      const wert = `${el.getAttribute("onclick") ?? ""} ${el.getAttribute("onsubmit") ?? ""}`;
      const treffer = trefferUeberNamen(wert);
      if (treffer.length === 0) return;
      gesehen.add(el);
      buchen(rohAus(treffer, false));
    });

    const bekannt: ForeignFinding[] = Array.from(gruppen.values()).map(
      ({ roh, stellen }) => ({
        art: "bekannt",
        anbieter: roh.anbieter,
        klassen: roh.klassen,
        stellen,
        geparkt: roh.geparkt,
      })
    );

    // Bekannt zuerst: Was eine Marke traegt, ist die Auskunft; das Unbekannte ist die
    // Nebensache, die der Vollstaendigkeit halber dabeisteht (P11.11-3).
    return { status: "ok", findings: [...bekannt, ...unbekannt] };
  } catch {
    return { status: "failed" };
  }
}

/** Traegt dieser Lauf ein bekanntes CMP? Grundlage der Kollisionsanzeige (P11.11-4). */
export function hasForeignCmp(scan: ForeignScan): boolean {
  if (scan.status !== "ok") return false;
  return scan.findings.some(
    (f) => f.art === "bekannt" && f.klassen.includes("cmp")
  );
}

/* -------------------------------------------------------------------------- *
 * DIE WORTLAUTE (OWNER-FREIGABE 2026-09-21, Entscheidung P11.11-32, Punkt (f))
 *
 * SIE LIEGEN HIER UND NICHT IN DER KOMPONENTE, aus demselben Grund wie die
 * OWN_BLOCKS_*-Konstanten in own-blocks.ts: EINE Quelle fuer die Fundliste im Bereich
 * BAUEN und fuer den Kollisionshinweis in PublishView.tsx. Ohne geteilte Konstante
 * drifteten die zwei Orte auseinander, und der Betreiber bekaeme fuer dieselbe
 * Ursache zwei verschiedene Erklaerungen.
 *
 * SIE SIND GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN GEPRUEFT (GEMESSEN,
 * CC, 2026-09-21): die vier Nadeln aus CodeImporter.test.tsx — /%/, /gerettet/i,
 * /mindestens/, /NaN/ — und die dreifache Heading-Abfrage "Tracking-Pixel", gegen
 * alle zwoelf Wortlaute: NULL Treffer in beide Richtungen. DESHALB HEISST DAS ETIKETT
 * "Fremdes Pixel" UND NICHT "Tracking-Pixel": jener Name bezeichnet im
 * Einstellungs-Drawer die Ueberschrift "deine eigenen Pixel konfigurieren" — derselbe
 * Name fuer eine andere Sache waere das Oberflaechen-Problem, das die Dauerregel ZWEI
 * BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG meint.
 *
 * DIE SCHREIBUNG IST DURCHGEHEND "SKRIPTE". Die Form "Scripte" kommt weder in der
 * Oberflaeche noch in einem Test vor; ein Waechter haelt das fest.
 *
 * WAS DIE PRUEFUNG NICHT DECKT: Der AUSSCHNITT eines unbekannten Inline-Scripts ist
 * Text des Betreibers und kann jede der vier Nadeln tragen. Heute faellt das nicht
 * auf, weil KEINE Fixture in CodeImporter.test.tsx ein <script, <img, <iframe oder
 * <noscript enthaelt und die vier Zusicherungen ohne initialCode rendern. WER DIESER
 * DATEI EINE FIXTURE MIT FREMDEM SCRIPT GIBT, PRUEFT ZUERST DIESE VIER ZEILEN.
 * -------------------------------------------------------------------------- */

/**
 * Ueberschrift der Fundliste. SIE TRAEGT KEINEN PLATZHALTER — hier stand "`{n}` wird
 * ersetzt", und das war falsch: die Zeichenkette ist genau dieser Satz und sonst
 * nichts.
 *
 * DIE ZAHL WIRD ANGEHAENGT, und zwar an genau einer Stelle: im Block (4) des Bereichs
 * BAUEN in `src/components/CodeImporter.tsx`, als
 * `${FOREIGN_LIST_HEADING} (${foreignScan.findings.length})`. Im Ausgang "failed"
 * steht die Ueberschrift OHNE Zahl — dort ist keine bekannt.
 *
 * SIE ZAEHLT FUNDE, NICHT FUNDSTELLEN, und die zwei fallen auseinander: Ein bekannter
 * Anbieter ist EIN Fund, auch wenn er drei Fundstellen hat (P11.11-32, Punkt (c)).
 * Die Zahl ist also die Laenge der Liste, nicht die Zahl der Knoten im Code.
 */
export const FOREIGN_LIST_HEADING = "Skripte und Tags im Code";

/** Die drei Etiketten, je Klasse genau eines. */
export const FOREIGN_LABEL: Readonly<Record<ForeignClass, string>> = {
  pixel: "Fremdes Pixel",
  cmp: "Einwilligungs-Werkzeug",
  container: "Tag-Container",
};

/** Zusatz an einer geparkten Fundstelle. */
export const FOREIGN_PARKED_NOTE = "wartet auf Einwilligung";

/**
 * Der Hinweis am Container. ER IST DIE EIGENTLICHE LEISTUNG DIESER KLASSE: Ein
 * Container ist der einzige Fund, bei dem die Liste sagen muss, dass sie
 * unvollstaendig sein kann — was er nachlaedt, steht nicht im importierten Text und
 * kann von keiner Erkennung gesehen werden.
 */
export const FOREIGN_CONTAINER_NOTE =
  "Ein Tag-Container kann weitere Tags nachladen. Was er lädt, steht nicht in diesem Code.";

/**
 * Der Hinweis am CMP. ER VERSPRICHT KEINE ANBINDUNG, und das ist Absicht: Es gibt
 * heute keinen fuer einen Betreiber erreichbaren Ort, der den Einwilligungs-Hook
 * beschreibt (offener Punkt aus Phase 11.5). Der Satz sagt deshalb nur, was Pagesmith
 * TUT — eine Aussage ueber uns, die sicher ist.
 */
export const FOREIGN_CMP_NOTE =
  "Pagesmith lässt dieses Einwilligungs-Werkzeug unverändert.";

/** Es gibt Code im Editor, aber keinen Fund. */
export const FOREIGN_NONE_MESSAGE = "Keine Skripte oder Tags gefunden.";

/**
 * Die Erkennung hat geworfen. SIE BEHAUPTET WEDER URSACHE NOCH ERGEBNIS — sie sagt,
 * was nicht geschehen ist, und ist damit von FOREIGN_NONE_MESSAGE unterscheidbar.
 */
export const FOREIGN_FAILED_MESSAGE =
  "Die Erkennung konnte diesen Code nicht auswerten.";

/**
 * Der Kollisionshinweis am Einwilligungs-Schalter (P11.11-4). ES IST EIN SIGNAL,
 * KEINE LOESUNG: Der offene Punkt UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP
 * UEBERFAHREN bleibt bestehen; diese Anzeige verlegt nur das Wissen dorthin, wo die
 * Handlung liegt.
 */
export const FOREIGN_CMP_COLLISION =
  "Im Code steht ein fremdes Einwilligungs-Werkzeug. Ist unsere Leiste oder unser Fenster eingeschaltet, erscheint sie zusätzlich.";
