// FREMDE TRACKING-BAUSTEINE — DIE REINE ERKENNUNG AUF DEM DOKUMENT
// (Phase 11.11, Scheibe 11.11b; bindende Entscheidungen P11.11-3, P11.11-5,
// P11.11-12, P11.11-26 bis P11.11-32).
//
// SIE LIEST, SIE SCHREIBT NICHT. Kein Knoten wird angefasst, kein Attribut gesetzt,
// nichts entfernt — die Scheibe 11.11b ist rein lesend (P11.11-31). DAS ENTFERNEN
// FREMDER PIXEL (11.11c) LIEGT IN foreign-strip.ts DANEBEN und benutzt von hier die
// GETEILTE Knotenauswahl `collectForeignHits` samt `foreignGroupKey` — EINE Quelle,
// keine zweite Suche (ENTSCHEIDUNG P11.11-35, Satz (c)). Dieselbe Aufteilung wie bei
// own-blocks.ts / own-blocks-strip.ts.
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
 * WORIN ein Fund steckt — DREI WERTE (ENTSCHEIDUNG P11.11-38):
 * - "knoten"  = ein ganzes `<script>`, `<img>` oder `<iframe>`, das den Anbieter ueber
 *               eine ADRESSE traegt: im Attribut (`src`, `data-src`, `data-cmp-src`)
 *               ODER als Zeichenkette im RUMPF. Ein Basiscode laedt sein Script, und
 *               die Lade-Adresse steht dabei im Rumpf.
 * - "aufruf"  = ein Inline-Script, das NUR ueber einen NAMEN erkannt ist. Es laedt
 *               nichts; es ruft etwas auf.
 * - "handler" = ein Anbieter-Aufruf im Wert eines `onclick`/`onsubmit`.
 *
 * NUR "knoten" WIRD ENTFERNT. DER GRUND FUER "aufruf" IST DIE FEHLERKLASSE VON
 * P11.11-35, Satz (b), EINE EBENE GROESSER: KI-erzeugte Seiten buendeln Formular- und
 * Menuelogik oft in EINEM Script, in dem irgendwo ein `fbq('track', …)` steht. Ein
 * Klick auf "Meta" haette diese Logik geloescht. Dort war es ein Attribut, das auch
 * Code des Betreibers traegt; hier ist es ein ganzes Script.
 *
 * DASS DIE VIER BASISCODES IHRE LADE-ADRESSE WIRKLICH IM RUMPF TRAGEN, IST GELESEN und
 * nicht angenommen (V1, CC, 2026-09-21, docs/ziel-befunde.md): meta Teil (g),
 * pinterest Teil (ab), tiktok Teil (i), linkedin Teil (am), je Punkt (a). Beim
 * Google-Tag steht sie im LADE-Script; der Konfigurations-Schnipsel traegt keine und
 * ist damit ein "aufruf" (Teil (cs), Punkte (a) und (b)).
 *
 * DIE GRENZE GEHOERT AN DEN TYP, weil sie sonst beim naechsten Umbau als Mangel gelesen
 * wird: EIN SCRIPT, DAS BASISCODE UND EIGENE LOGIK MISCHT, IST "knoten" UND WIRD GANZ
 * ENTFERNT. Wer beides in einen Knoten legt, hat es untrennbar gemacht.
 *
 * DIE UNTERSCHEIDUNG GEHT IN DEN GRUPPIERUNGS-SCHLUESSEL EIN — sonst stuende an einer
 * gemischten Gruppe ein Knopf, der nur einen Teil ihrer Fundstellen entfernt.
 */
export type ForeignCarrier = "knoten" | "aufruf" | "handler";

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
      /**
       * DER SCHLUESSEL, DEN DAS ENTFERNEN BEKOMMT (Scheibe 11.11c). Er ist
       * INHALTS-adressiert und kein Index: `stripForeignGroup` parst den Editor-Text
       * neu, laeuft mit DERSELBEN Funktion (`collectForeignHits`) darueber und nimmt,
       * was denselben Schluessel traegt. Ein Index haette an der Reihenfolge eines
       * zweiten Parse gehangen.
       *
       * ER WIRD NIE GERENDERT — er traegt `\u0000` als Trenner.
       */
      schluessel: string;
      /**
       * WORIN der Fund steckt — drei Werte, s. ForeignCarrier. Er geht in den
       * Gruppierungs-Schluessel ein, aus demselben Grund wie der Parkzustand: Eine
       * gemischte Gruppe truege einen Knopf, der nur einen Teil ihrer Fundstellen
       * entfernt, und einen Handarbeits-Hinweis, der nur fuer den anderen gilt
       * (ENTSCHEIDUNG P11.11-36, Punkt (F1) — Erweiterung von P11.11-32, Punkt (c)).
       */
      traeger: ForeignCarrier;
      /**
       * Bekommt dieser Fund einen Entfernen-Knopf? DIE REGEL LIEGT HIER UND NICHT IM
       * JSX, damit sie pruefbar ist und an genau einer Stelle steht.
       *
       * GANZE KNOTEN UND AUSSCHLIESSLICH DIE KLASSE `pixel`. Ein CMP bekommt nie einen
       * (P11.11-3), ein Container nie (P11.11-27) — und eine GEMISCHTE Gruppe aus
       * Pixel und CMP auch nicht: `every` statt `some` ist hier der Unterschied
       * zwischen fail-closed und fail-open.
       */
      entfernbar: boolean;
      /**
       * DER ORTSHINWEIS (Scheibe 11.11e; ENTSCHEIDUNGEN P11.11-40, P11.11-41 Punkt (I)):
       * der gekuerzte Rumpf der ERSTEN Fundstelle, oder `null`.
       *
       * ER STEHT NUR AN EINEM FUND, DER NICHT ENTFERNBAR IST — also an `aufruf` und
       * `handler`, nie an `knoten`. **DER GRUND IST DAS PROBLEM, DAS ER LOEST:** Zwei
       * Zeilen "Meta · Fremdes Pixel · 1 Fundstelle" untereinander sehen GLEICH AUS,
       * die eine ist ein Seiten-Script, die andere ein `onclick`, und beide sagen dem
       * Betreiber, er solle von Hand loeschen — **keine sagt ihm WO**. Ein `knoten`
       * braucht ihn nicht: er hat einen Knopf.
       *
       * ES IST DER AUSSCHNITT DER ERSTEN FUNDSTELLE, und der Preis ist benannt und
       * gewollt (P11.11-41, Punkt (I)): Hat die Gruppe mehrere Fundstellen, nennt er
       * EINE — die Zahl daneben sagt, dass es mehr sind. Alle zu zeigen machte eine
       * Gruppe mit sieben Fundstellen zu sieben Zeilen und damit genau so lang, wie die
       * Buendelung sie kurz machen wollte.
       *
       * ER IST TEXT DES BETREIBERS. Er wird als TEXT gerendert, nie als HTML, und er
       * kann jede der vier dokumentweiten Abwesenheits-Nadeln tragen (P11.11-32,
       * Punkt (f), und P11.11-41, Punkt (I)).
       */
      ausschnitt: string | null;
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
/**
 * Anbieter, deren LADE-Adresse als Zeichenkette im RUMPF eines Inline-Scripts steht —
 * das Merkmal eines BASISCODES (ENTSCHEIDUNG P11.11-38).
 *
 * GEPRUEFT WIRD GEGEN `adressen` UND AUSDRUECKLICH NICHT GEGEN `rueckfall`. Die Frage
 * lautet "laedt dieses Script sein Anbieter-Script?"; eine Rueckfall-Adresse
 * (`www.facebook.com/tr?`) als Text macht daraus keinen Lader. Wer hier
 * `trefferUeberAdressen` nimmt, prueft beides und laesst die blosse ERWAEHNUNG eines
 * Bild-Pixels die Namen ueberstimmen.
 *
 * SIE IST DIE EINE QUELLE FUER BEIDE FRAGEN — die ERKENNUNG (anbieterFuer) und den
 * TRAEGER (traegerFuer) lesen dasselbe Merkmal. Zwei Rechenwege liefen auseinander.
 */
function ladeAdresseImRumpf(rumpf: string): ForeignSignature[] {
  if (rumpf === "") return [];
  return FOREIGN_SIGNATURES.filter((s) =>
    s.adressen.some((a) => rumpf.includes(a))
  );
}

function anbieterFuer(
  adressen: readonly string[],
  rumpf: string
): ForeignSignature[] {
  // EINE LADE-ADRESSE IM RUMPF IST EIN ADRESS-TREFFER, gleichrangig mit der im Attribut
  // und VOR den Namen (ENTSCHEIDUNG P11.11-38, Ergaenzung vom 2026-09-21; dieselbe
  // Rangfolge wie in P11.11-32, Punkt (d)).
  //
  // DER GRUND IST EIN GEMESSENER STILLER AUSFALL (V2, CC, 2026-09-21): LinkedIns
  // LADE-Block setzt `window.lintrk` als ZUWEISUNG und uebergibt es als Argument —
  // `lintrk(` mit Klammer steht dort NIRGENDS, und `_linkedin_partner_id` steht im
  // ANDEREN Block. OHNE DIESE ZEILE BLIEBE DER LADER UNBEKANNT: kein Etikett, kein
  // Knopf, und ein Klick auf "LinkedIn" naehme nur das Rueckfall-Bild mit. DAS PIXEL
  // LIEFE WEITER, und niemand saehe es.
  const ueberAdresse = trefferUeberAdressen(adressen);
  if (ueberAdresse.length > 0) return ueberAdresse;
  const imRumpf = ladeAdresseImRumpf(rumpf);
  if (imRumpf.length > 0) return imRumpf;
  return trefferUeberNamen(rumpf);
}

/**
 * DER TRAEGER EINES SCRIPTS (ENTSCHEIDUNG P11.11-38): "knoten", wenn der Anbieter ueber
 * eine ADRESSE dransteht — im Attribut ODER als Zeichenkette im RUMPF —, sonst
 * "aufruf".
 *
 * GEPRUEFT WIRD GEGEN `adressen` UND NICHT GEGEN `rueckfall`, und das ist eine
 * Entscheidung und kein Versehen: Die Frage lautet "laedt dieses Script sein
 * Anbieter-Script?". Eine Rueckfall-Adresse (`www.facebook.com/tr?`) im Rumpf macht
 * daraus keinen Basiscode.
 *
 * EINE LADE-ADRESSE IM RUMPF UEBERSTIMMT JEDEN NAMEN, und dieser Absatz ist am
 * 2026-09-21 RICHTIGGESTELLT worden statt gestempelt — er behauptete das Gegenteil,
 * und ein Maszstab mit falschen Angaben taugt nicht als Maszstab (Dauerregel EINE
 * REGEL KANN GUELTIG BLEIBEN, WAEHREND IHR BELEG FALSCH WIRD).
 *
 * WAS HIER STAND: Ein Script, das `gtag(` ruft und irgendwo Metas Adresse als Text
 * fuehrt, sei "fuer Google weiterhin ein Aufruf". SEIT K3 IST DAS FALSCH. Eine
 * Lade-Adresse im Rumpf entscheidet schon die ERKENNUNG (Adresse vor Name,
 * P11.11-32, Punkt (d)): Das Script gehoert dem Anbieter DIESER Adresse, ist
 * "knoten", und die Namen anderer Anbieter darin werden ueberstimmt — sie stehen gar
 * nicht erst in `treffer`.
 *
 * EIN SOLCHES GEMISCHTES SCRIPT WIRD DAMIT GANZ ENTFERNT. Das ist die GRENZE aus
 * ENTSCHEIDUNG P11.11-38, hier an einem zweiten Fall: Wer Anbieter-Basiscode und
 * fremde Aufrufe in EINEN Knoten legt, hat sie untrennbar gemacht.
 *
 * DER PREIS IST BENANNT UND GEWOLLT: Die Regel kann einen LADER nicht von einer
 * blossen ERWAEHNUNG der Lade-Adresse trennen. Ohne sie bliebe LinkedIns Lade-Block
 * unbekannt und sein Pixel liefe nach dem Klick weiter (GEMESSEN, V2).
 */
function traegerFuer(
  treffer: readonly ForeignSignature[],
  adressen: readonly string[],
  rumpf: string
): ForeignCarrier {
  if (treffer.length === 0) return "knoten";
  if (trefferUeberAdressen(adressen).length > 0) return "knoten";
  // DASSELBE MERKMAL WIE IN anbieterFuer, aus DERSELBEN Funktion — eine Quelle.
  //
  // HIER STAND BIS ZUM 2026-09-21 EIN SCHNITT AUF `treffer` ("traegt einer der
  // GETROFFENEN Anbieter seine Adresse im Rumpf?"). ER IST MIT K3 REDUNDANT GEWORDEN
  // und deshalb entfernt statt stehengelassen: Seit eine Lade-Adresse im Rumpf schon
  // die ERKENNUNG entscheidet, ist `treffer` in genau den Faellen gleich dem Ergebnis
  // von ladeAdresseImRumpf — der Schnitt konnte nie mehr etwas aussortieren. Ein
  // Kommentar, der ihn als unterscheidend beschreibt, waere ab da eine Behauptung
  // ohne Gegenstand.
  return ladeAdresseImRumpf(rumpf).length > 0 ? "knoten" : "aufruf";
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

/**
 * EINE FUNDSTELLE MIT IHREM KNOTEN — die Zwischenstufe, die ANZEIGE und ENTFERNEN
 * TEILEN (Scheibe 11.11c, ENTSCHEIDUNG P11.11-35, Satz (c)).
 *
 * WARUM SIE UEBERHAUPT EXISTIERT: Bis zur Scheibe 11.11b hat diese Datei in EINEM
 * Durchlauf gelesen UND sofort verdichtet; die Knoten verliess kein Rueckgabewert.
 * Das Entfernen braucht aber genau die Zuordnung Knoten -> Fund, und eine zweite Suche
 * daneben waere die zweite Wahrheit, die bei der naechsten Signatur still
 * auseinanderlaeuft. DER DURCHLAUF IST DESHALB GEHALBIERT, NICHT VERDOPPELT:
 * collectForeignHits liest, scanForeignTags verdichtet, stripForeignGroup entfernt —
 * und alle drei sehen dieselben Knoten.
 */
export type ForeignHit = {
  el: Element;
  /** LEER heisst unbekannt. Nur Scripte koennen so einen Treffer tragen. */
  treffer: readonly ForeignSignature[];
  geparkt: boolean;
  traeger: ForeignCarrier;
  /** Alle drei Adress-Orte, Platzhalter bereits verworfen. */
  adressen: readonly string[];
  /** Rumpf eines Scripts bzw. Wert des Inline-Handlers. */
  rumpf: string;
};

/**
 * Der Gruppierungs-Schluessel einer bekannten Fundstelle: die Anbieter-Menge, der
 * Parkzustand UND der Traeger.
 *
 * ALLE DREI ACHSEN GEHOEREN IN DEN SCHLUESSEL, damit jede Gruppe darin EINHEITLICH
 * ist. Sonst stuende an einer gemischten Gruppe ein Zusatz, der nur fuer einen Teil
 * ihrer Fundstellen gilt — beim Parkzustand ein "wartet auf Einwilligung", beim
 * Traeger ein Knopf, der nur die Haelfte entfernt.
 *
 * `\u0000` als Trenner, weil kein Anbietername ihn enthalten kann. ER WIRD NIE
 * GERENDERT.
 */
export function foreignGroupKey(hit: ForeignHit): string {
  return `${hit.treffer.map((s) => s.anbieter).join("\u0000")}|${
    hit.geparkt ? "1" : "0"
  }|${hit.traeger}`;
}

/**
 * Liest alle fremden Fundstellen eines bereits geparsten Dokuments, in
 * Dokument-Reihenfolge je Durchgang, OHNE zu verdichten und OHNE etwas anzufassen.
 *
 * SIE FAENGT IHREN WURF NICHT SELBST — das tun ihre zwei Aufrufer, jeder auf seine
 * Weise: scanForeignTags meldet "failed", stripForeignGroup gibt die Eingabe zurueck.
 * Ein dritter catch hier verschluckte den Unterschied.
 */
export function collectForeignHits(doc: Document): ForeignHit[] {
  const eigen = new Set<Element>(collectOwnNodes(doc));
  const gesehen = new Set<Element>();
  const hits: ForeignHit[] = [];

  // (1) SCRIPTE — jedes wird angezeigt, bekannte werden markiert (P11.11-3).
  doc.querySelectorAll("script").forEach((el) => {
    if (eigen.has(el) || gesehen.has(el)) return;
    const type = (el.getAttribute("type") ?? "").trim().toLowerCase();
    if (DATA_SCRIPT_TYPES.includes(type)) return;
    gesehen.add(el);

    const adressen = adressenVon(el);
    const rumpf = el.textContent ?? "";
    const treffer = anbieterFuer(adressen, rumpf);
    hits.push({
      el,
      treffer,
      geparkt: istGeparkt(el),
      // DER DRITTE TRAEGER ENTSTEHT HIER UND NUR HIER (ENTSCHEIDUNG P11.11-38): Ein
      // Script OHNE Adresse, das allein ueber einen Namen getroffen wurde, ist ein
      // AUFRUF in Seiten-Code und wird nie entfernt. Ein unbekanntes Script bekommt
      // "knoten" und ist folgenlos — es hat gar keinen Fund, an dem ein Knopf haengen
      // koennte.
      traeger: traegerFuer(treffer, adressen, rumpf),
      adressen,
      rumpf,
    });
  });

  // (2) BILD- UND IFRAME-TAGS mit BEKANNTER Adresse — auch ohne Script daneben
  // (P11.11-29). Meta und Pinterest duerfen ausweislich ihrer Doku allein als
  // Bild-Tag stehen; eine Erkennung nur ueber <script> saehe eine solche Seite
  // nicht. Seit ENTSCHEIDUNG P11.11-36, Punkt (F5), bekommt ein solcher Fund auch
  // einen eigenen Entfernen-Knopf.
  //
  // UNBEKANNTE BILDER UND IFRAMES ERSCHEINEN NICHT, und die Asymmetrie zu (1) ist
  // Absicht: Eine Seite traegt eine Handvoll Scripte und beliebig viele Bilder. Die
  // Sichtbarkeit des Veraltens, die P11.11-3 traegt, leisten die Scripte bereits.
  //
  // DER PLATZ DES <noscript> SPIELT KEINE ROLLE, und das ist GEMESSEN (CC,
  // 2026-09-21, jsdom 29.1.1): Steht das <noscript> im head, ist es nach dem Parse
  // LEER und sein <img> liegt im body; steht es im body, bleibt das <img> sein Kind.
  // BEIDE FAELLE FINDET DIESE dokumentweite Abfrage. Erkannt wird ueber die ADRESSE,
  // nicht ueber den Platz (P11.11-12, Satz 6). FUER DAS ENTFERNEN IST DER PLATZ
  // EBENFALLS FOLGENLOS — entfernt wird der gefundene KNOTEN, nicht seine Huelle
  // (ENTSCHEIDUNG P11.11-36, Punkt (F2)).
  //
  // EIN GEPARKTES IFRAME TRAEGT SEINE ADRESSE NICHT IN `src`: consentmanager setzt
  // dort `about:blank` und verschiebt sie nach `data-cmp-src`. Deshalb liest
  // adressenVon ALLE drei Orte und wirft den Platzhalter weg — sonst waere ein so
  // geparkter Tag-Manager-Container unsichtbar geblieben.
  doc.querySelectorAll("img, iframe").forEach((el) => {
    if (eigen.has(el) || gesehen.has(el)) return;
    const adressen = adressenVon(el);
    const treffer = trefferUeberAdressen(adressen);
    if (treffer.length === 0) return;
    gesehen.add(el);
    hits.push({
      el,
      treffer,
      geparkt: istGeparkt(el),
      traeger: "knoten",
      adressen,
      rumpf: "",
    });
  });

  // (3) INLINE-HANDLER — NUR mit bekanntem Anbieter-Aufruf (P11.11-12, Satz 7).
  // Sonst stuende jede Schaltflaeche der Seite in der Liste.
  //
  // SIE TRAGEN `traeger: "handler"` UND WERDEN NIE ENTFERNT (ENTSCHEIDUNG P11.11-35,
  // Satz (b)): Ein Attribut traegt oft auch Code des Betreibers, und daraus den
  // Anbieter-Aufruf herauszuschneiden hiesse, fremden Text zu bearbeiten. Ihr
  // Element ist ausserdem oft ein LINKABLE_SELECTOR-Kandidat mit einem Mapping —
  // es zu entfernen liesse das Mapping verwaisen.
  doc.querySelectorAll("[onclick], [onsubmit]").forEach((el) => {
    if (eigen.has(el) || gesehen.has(el)) return;
    const wert = `${el.getAttribute("onclick") ?? ""} ${el.getAttribute("onsubmit") ?? ""}`;
    const treffer = trefferUeberNamen(wert);
    if (treffer.length === 0) return;
    gesehen.add(el);
    hits.push({
      el,
      treffer,
      geparkt: false,
      traeger: "handler",
      adressen: [],
      rumpf: wert,
    });
  });

  return hits;
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
    const gruppen = new Map<
      string,
      { hit: ForeignHit; stellen: number }
    >();
    const unbekannt: ForeignFinding[] = [];

    for (const hit of collectForeignHits(doc)) {
      if (hit.treffer.length === 0) {
        // FUER DIE KENNUNG EINES UNBEKANNTEN SCRIPTS GILT DER ERSTE KANDIDAT. Die
        // Erkennung liest alle drei Orte, die ANZEIGE zeigt einen — mehrere Adressen
        // an einer Zeile eines Fundes, den niemand zuordnen kann, waeren Rauschen.
        unbekannt.push(
          hit.adressen.length > 0
            ? { art: "unbekannt", kennung: hit.adressen[0], ausschnitt: null }
            : {
                art: "unbekannt",
                kennung: UNKNOWN_INLINE,
                ausschnitt: ausschnittVon(hit.rumpf),
              }
        );
        continue;
      }
      const key = foreignGroupKey(hit);
      const vorhanden = gruppen.get(key);
      if (vorhanden) vorhanden.stellen += 1;
      else gruppen.set(key, { hit, stellen: 1 });
    }

    const bekannt: ForeignFinding[] = Array.from(gruppen.entries()).map(
      ([schluessel, { hit, stellen }]) => {
        const klassen = CLASS_ORDER.filter((k) =>
          hit.treffer.some((s) => s.klasse === k)
        );
        return {
          art: "bekannt",
          anbieter: hit.treffer.map((s) => s.anbieter),
          klassen,
          stellen,
          geparkt: hit.geparkt,
          schluessel,
          traeger: hit.traeger,
          // GANZE KNOTEN UND AUSSCHLIESSLICH `pixel`. `every` statt `some` ist der
          // Unterschied zwischen fail-closed und fail-open: Ein Inline-Script, das
          // `fbq(` ruft UND `Cookiebot` nennt, traegt beide Klassen — ein Knopf daran
          // naehme dem Betreiber sein Einwilligungs-Werkzeug mit.
          entfernbar:
            hit.traeger === "knoten" && klassen.every((k) => k === "pixel"),
          // DER ORTSHINWEIS, NUR WO ER GEBRAUCHT WIRD (Scheibe 11.11e): an `aufruf` und
          // `handler`. Ein `knoten` hat einen Knopf und braucht keine Wegbeschreibung;
          // `null` dort macht die Abwesenheits-Zusicherung in S37 zu einer Aussage
          // statt zu einer Selbstverstaendlichkeit.
          ausschnitt:
            hit.traeger === "knoten" ? null : ausschnittVon(hit.rumpf),
        };
      }
    );

    // Bekannt zuerst: Was eine Marke traegt, ist die Auskunft; das Unbekannte ist die
    // Nebensache, die der Vollstaendigkeit halber dabeisteht (P11.11-3).
    return { status: "ok", findings: [...bekannt, ...unbekannt] };
  } catch {
    return { status: "failed" };
  }
}

/* -------------------------------------------------------------------------- *
 * DIE ANZEIGE-SICHT (Phase 11.11, Scheibe 11.11e; ENTSCHEIDUNGEN P11.11-37,
 * P11.11-40 und die Freigaben P11.11-41)
 *
 * SIE ORDNET UND BUENDELT, SIE ERKENNT NICHTS ANDERS. `scanForeignTags` und der Typ
 * ForeignScan sind davon UNBERUEHRT: Diese Funktionen nehmen ein fertiges
 * ForeignFinding[] und geben eine ANZEIGE-Struktur zurueck. Der Grund ist der harte
 * Scope-Waechter der Scheibe — die Erkennung aendert sich nicht, und ein Verbraucher
 * von ForeignScan (annotateAndDetect, detect.test.ts, S16) darf davon nichts merken.
 *
 * WARUM HIER UND NICHT IN EINER NEUEN DATEI (P11.11-41, Punkt (E)): `ausschnittVon`
 * ist modul-privat und wird fuer den Ortshinweis gebraucht — in DIESER Datei ist er
 * ohne Hebung erreichbar. Eine neue Datei waere Weg 8 aus CLAUDE.md und verlangte eine
 * Owner-Entscheidung (Praezedenz: P11.11-22, Punkt (a)).
 * -------------------------------------------------------------------------- */

/** Feste Reihenfolge der Traeger in der Anzeige (P11.11-41, Punkt (J)). */
const CARRIER_ORDER: readonly ForeignCarrier[] = ["knoten", "aufruf", "handler"];

/** Ein unbekannter Fund, als eigener Typ, damit die Gruppen ihn tragen koennen. */
export type ForeignUnknown = Extract<ForeignFinding, { art: "unbekannt" }>;

/** Ein bekannter Fund, als eigener Typ. */
export type ForeignKnown = Extract<ForeignFinding, { art: "bekannt" }>;

/**
 * Eine Gruppe unbekannter Skripte. DREI GESTALTEN, und die dritte ist keine Laune:
 *
 * - "host"        — je HOST eine Gruppe (P11.11-37).
 * - "ohne-domain" — alles, woraus sich KEIN Host ablesen laesst: relative Adressen,
 *                   ungueltige, `data:` und `blob:` (P11.11-41, Punkt (A)).
 * - "inline"      — Skripte ohne jede Adresse (P11.11-37: "die Inline-Skripte als
 *                   eigene Gruppe").
 */
export type ForeignUnknownGroup = {
  art: "host" | "ohne-domain" | "inline";
  /** Die Ueberschrift OHNE die Zahl — die haengt die Komponente an. */
  titel: string;
  eintraege: readonly ForeignUnknown[];
};

/**
 * Was die Fundliste anzeigt: die bekannten Funde GEORDNET und die unbekannten
 * GEBUENDELT.
 */
export type ForeignView = {
  bekannt: readonly ForeignKnown[];
  gruppen: readonly ForeignUnknownGroup[];
  /**
   * Die Zahl der unbekannten SKRIPTE ueber ALLE Gruppen — nicht die der Gruppen
   * (P11.11-41, Punkt (H): "Weitere Skripte (N)" zaehlt Skripte).
   *
   * SIE WIRD AUS DEN GRUPPEN GERECHNET UND NICHT NEBEN IHNEN, und das ist der Grund,
   * warum der Summen-Waechter etwas beweist: Verliert die Buendelung ein Skript,
   * sinkt diese Zahl mit. Eine unabhaengig gezaehlte waere trivial richtig.
   */
  unbekannteSkripte: number;
};

/**
 * DER HOST EINER KENNUNG, oder `null`, wenn keiner ablesbar ist.
 *
 * ALLE SECHS FAELLE SIND GEMESSEN (CC, 2026-09-22, Wegwerf-Probe ausserhalb des Repos),
 * und jeder hat seinen eigenen Grund — sie sind ausdruecklich NICHT zusammengefasst:
 *
 * - ABSOLUT -> `hostname`. **Die Gross-/Kleinschreibung normalisiert der Parser
 *   selbst**: `https://CDN.Example.COM/a.js` ergibt `cdn.example.com`. Wer je auf einen
 *   Zeichenketten-Schnitt wechselt, verliert diese Normalisierung STILL.
 * - PROTOKOLL-RELATIV (`//host/x`) -> WIRFT ohne Basis. Mit vorangestelltem `https:`
 *   ergibt sie den Host. Sie wird NICHT wie eine relative Adresse behandelt, obwohl
 *   beide werfen: **hier STEHT der Host da**, dort nicht.
 * - RELATIV (`/pfad`, `pfad`) und UNGUELTIG (`https://`, `::::`, `""`, `#x`) -> WERFEN.
 *   Der Wurf IST das Erkennungsmerkmal.
 * - `data:` UND `blob:` -> **WERFEN NICHT**, sondern liefern einen LEEREN Host. Das ist
 *   die Falle dieses Gates: ohne den eigens abgefangenen Leerfall entstuende eine
 *   Gruppe mit dem Titel `""`, und die saehe auf dem Bildschirm aus wie ein Leerraum.
 * - PORT -> `hostname` und NICHT `host` (P11.11-41, Punkt (C)): `example.com:8443` und
 *   `example.com` sind EINE Gruppe.
 *
 * EINE SENTINEL-BASIS IST VERWORFEN (P11.11-41, Punkt (B)) und darf nicht
 * zurueckkommen: `new URL("/pfad", "https://x.invalid/")` loest STILL auf den
 * Sentinel-Host auf, und `::::` ebenso (GEMESSEN). Eine relative Adresse landete dann
 * in einer Gruppe, die nach einem Host aussieht, den es nicht gibt.
 *
 * `www.` WIRD NICHT ABGESCHNITTEN (P11.11-41, Punkt (D)): `www.example.com` und
 * `example.com` sind verschiedene Hosts, und eine Zusammenfassung behauptete mehr, als
 * diese Funktion weiss.
 */
export function hostVon(kennung: string): string | null {
  const roh = kennung.trim();
  if (roh === "") return null;
  const v = roh.startsWith("//") ? `https:${roh}` : roh;
  try {
    const host = new URL(v).hostname;
    return host === "" ? null : host;
  } catch {
    return null;
  }
}

/** Position eines Anbieters in der Signaturliste — die Ordnungsachse aus (J). */
function signaturIndex(anbieter: string): number {
  const i = FOREIGN_SIGNATURES.findIndex((s) => s.anbieter === anbieter);
  // UNERREICHBAR, und der Satz gehoert hierher, damit niemand den Zweig fuer einen
  // Fehlerfall haelt: Die Namen eines Fundes stammen aus `hit.treffer`, und das ist
  // eine Teilmenge von FOREIGN_SIGNATURES. Ein Wurf waere hier ausserdem der falsche
  // Ausgang — diese Funktion laeuft im Render, und ein Wurf leerte die ganze Liste.
  return i === -1 ? Number.MAX_SAFE_INTEGER : i;
}

/**
 * DIE ANZEIGE-SICHT AUS EINER FUNDLISTE.
 *
 * DIE BEKANNTEN WERDEN GEORDNET (P11.11-41, Punkt (J)): nach der Reihenfolge der
 * SIGNATURLISTE — bei mehreren Anbietern entscheidet der erste —, innerhalb eines
 * Anbieters knoten -> aufruf -> handler. **Die Signaturliste ist im Bestand schon die
 * Ordnungsachse fuer die Anbieter INNERHALB eines Fundes** (trefferUeberAdressen und
 * trefferUeberNamen filtern ueber FOREIGN_SIGNATURES); dieselbe Achse zweimal gleich zu
 * ordnen erklaert sich selbst, alphabetisch waere eine zweite Ordnungs-Wahrheit daneben.
 *
 * `sort` IST SEIT ES2019 STABIL — bei gleichem Schluessel bleibt die Dokument-Reihenfolge,
 * die `collectForeignHits` geliefert hat.
 *
 * DIE GRUPPEN WERDEN NACH ANZAHL AUFSTEIGEND SORTIERT (P11.11-37). **DIE ZWEITACHSE BEI
 * GLEICHSTAND IST DER TITEL, und sie ist BENANNT statt zufaellig** — ohne sie haengte die
 * Reihenfolge zweier gleich grosser Gruppen an der Einfuegefolge einer Map und waere
 * nicht reproduzierbar. Verglichen wird mit `<` und NICHT mit `localeCompare`: eine
 * locale-abhaengige Ordnung waere auf zwei Rechnern eine andere (Dauerregel KEIN ZEIT-
 * ODER LOCALE-ABHAENGIGER WERT …).
 *
 * DIE DREI GESTALTEN SORTIEREN GEMEINSAM. "Ohne Domain-Angabe" und "Inline-Skripte"
 * stehen nicht fest am Ende: Der Wortlaut der Entscheidung sagt "sortiert nach Anzahl
 * aufsteigend" ohne Ausnahme, und eine feste Position waere eine zusaetzliche Regel, die
 * niemand getroffen hat.
 */
export function buildForeignView(
  findings: readonly ForeignFinding[]
): ForeignView {
  const bekannt = findings
    .filter((f): f is ForeignKnown => f.art === "bekannt")
    .slice()
    .sort((a, b) => {
      const sa = signaturIndex(a.anbieter[0] ?? "");
      const sb = signaturIndex(b.anbieter[0] ?? "");
      if (sa !== sb) return sa - sb;
      return CARRIER_ORDER.indexOf(a.traeger) - CARRIER_ORDER.indexOf(b.traeger);
    });

  // DIE SCHLUESSEL DER MAP SIND NICHT DIE TITEL, sondern tragen die GESTALT vorn. Sonst
  // kollidierte ein Host, der zufaellig wie eine der zwei Sondergruppen heisst, mit ihr.
  const gruppen = new Map<string, ForeignUnknownGroup>();
  const lege = (
    schluessel: string,
    art: ForeignUnknownGroup["art"],
    titel: string,
    eintrag: ForeignUnknown
  ) => {
    const vorhanden = gruppen.get(schluessel);
    if (vorhanden) (vorhanden.eintraege as ForeignUnknown[]).push(eintrag);
    else gruppen.set(schluessel, { art, titel, eintraege: [eintrag] });
  };

  for (const f of findings) {
    if (f.art !== "unbekannt") continue;
    if (f.kennung === UNKNOWN_INLINE) {
      lege("inline", "inline", FOREIGN_GROUP_INLINE, f);
      continue;
    }
    const host = hostVon(f.kennung);
    if (host === null) lege("ohne-domain", "ohne-domain", FOREIGN_GROUP_NO_HOST, f);
    else lege(`host:${host}`, "host", host, f);
  }

  const sortiert = Array.from(gruppen.values()).sort((a, b) => {
    if (a.eintraege.length !== b.eintraege.length)
      return a.eintraege.length - b.eintraege.length;
    return a.titel < b.titel ? -1 : a.titel > b.titel ? 1 : 0;
  });

  return {
    bekannt,
    gruppen: sortiert,
    unbekannteSkripte: sortiert.reduce((n, g) => n + g.eintraege.length, 0),
  };
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
 * Text des Betreibers und kann jede der vier Nadeln tragen. Seit der Scheibe 11.11e
 * gilt dasselbe fuer den ORTSHINWEIS an einem BEKANNTEN Fund (P11.11-41, Punkt (I))
 * und fuer den TITEL einer Host-Gruppe.
 *
 * DER SATZ, DER DAS BISHER TRUG, IST AM 2026-09-22 RICHTIGGESTELLT UND NICHT
 * GESTEMPELT — er war eine TATSACHENBEHAUPTUNG UEBER DEN CODE und ist mit den
 * Scheiben 11.11b/c ueberholt worden (Dauerregel EINE REGEL KANN GUELTIG BLEIBEN,
 * WAEHREND IHR BELEG FALSCH WIRD). Er lautete: "KEINE Fixture in CodeImporter.test.tsx
 * enthaelt ein <script, <img, <iframe oder <noscript". GEMESSEN (CC, 2026-09-22):
 * ELF Vorkommen von `<script`, alle in den SK-Bloecken der Scheiben 11.11b und 11.11c.
 *
 * WAS STATTDESSEN TRAEGT, und es ist schmaler: **KEIN Lauf, der eine der vier Nadeln
 * prueft, rendert eine Fixture mit `<script`.** GEMESSEN (CC, 2026-09-22): die Nadeln
 * /gerettet/i, /mindestens/ und /%/ rendern OHNE initialCode; die zwei /NaN/-Laeufe
 * rendern MIT initialCode, aber mit einer script-freien Fixture — dort steht die
 * Fundliste mit "(0)".
 *
 * WER EINEM NADEL-LAUF EINE FIXTURE MIT FREMDEM SCRIPT GIBT, PRUEFT ZUERST DIESE
 * SECHS ZEILEN.
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

/* -------------------------------------------------------------------------- *
 * DIE WORTLAUTE DER SCHEIBE 11.11c (OWNER-FREIGABE 2026-09-21, ENTSCHEIDUNG
 * P11.11-36, Punkt (F3))
 *
 * SIE SIND GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN GEPRUEFT (GEMESSEN,
 * CC, 2026-09-21): die vier Nadeln aus CodeImporter.test.tsx — /%/, /gerettet/i,
 * /mindestens/, /NaN/ — und SK10 ("Scripte" kommt in der Oberflaeche nicht vor),
 * gegen alle vier Wortlaute: NULL Treffer. Ein Waechter haelt es fest.
 * -------------------------------------------------------------------------- */

/**
 * Verbindet Anbieternamen zu einer lesbaren Aufzaehlung: "A" · "A und B" ·
 * "A, B und C".
 */
function verbinde(namen: readonly string[]): string {
  if (namen.length === 0) return "";
  if (namen.length === 1) return namen[0];
  return `${namen.slice(0, -1).join(", ")} und ${namen[namen.length - 1]}`;
}

/**
 * Der Name des Entfernen-Knopfes. ER WIRD GEBILDET, NICHT GETIPPT.
 *
 * ER ENTHAELT "aus dem Code" (ENTSCHEIDUNG P11.11-35, Satz (d)), und das ist keine
 * Geschmacksfrage: "Entfernen", "Meta entfernen" und "Ja, Meta entfernen" bezeichnen
 * im Einstellungs-Drawer bereits das Entfernen der EIGENEN Pixel-Konfiguration
 * (TargetCard.tsx, aus `${config.name} entfernen`), und "Entfernen" steht ausserdem an
 * jeder Domain-Zeile. Derselbe Name fuer eine andere Wirkung ist die Dauerregel ZWEI
 * BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
 * OBERFLAECHEN-PROBLEM, KEIN TESTPROBLEM — und sie verlangt, den Namen in der
 * OBERFLAECHE zu unterscheiden, nicht per aria-label in der Abfrage.
 *
 * ER NENNT ALLE BETEILIGTEN ANBIETER. Ein Knoten mit mehreren gehoert allen
 * (P11.11-32, Punkt (d)) und geht ganz oder gar nicht; ein Knopf "Meta entfernen",
 * der ausserdem Google mitnimmt, waere der Fehltreffer, vor dem die Roadmap-Zeile
 * 11.11 unter (e) warnt. DIESER HIER NENNT BEIDE.
 */
export function foreignRemoveLabel(anbieter: readonly string[]): string {
  return `${verbinde(anbieter)} aus dem Code entfernen`;
}

/**
 * Der Hinweis am Google-Tag. ER IST DER PREIS DER ENTSCHEIDUNG P11.11-34 und kein
 * Schmuck: Die Doku des Anbieters nennt fuer `gtag.js` ausdruecklich Google Ads,
 * Analytics, Campaign Manager, Display & Video 360 und Search Ads 360
 * (docs/ziel-befunde.md, Google-Abschnitt, Teil (cs)).
 *
 * ER BEHAUPTET NICHTS UEBER DIESEN EINEN TAG — die Kennung wird nicht gedeutet. Er
 * sagt, was der Tag tragen KANN, und verlegt die Entscheidung zu dem, der weiss, was
 * seiner traegt.
 */
export const FOREIGN_GOOGLE_TAG_NOTE =
  "Dieser Tag kann neben Google Ads auch Google Analytics und weitere Google-Produkte bedienen. Beim Entfernen hört alles auf, was über ihn läuft.";

/**
 * ANBIETER -> HINWEIS AM KNOPF (ENTSCHEIDUNG P11.11-36, Punkt (F4)).
 *
 * SIE LIEGT HIER UND NICHT AM SIGNATUR-EINTRAG, weil foreign-signatures.ts vom
 * Scope-Waechter dieser Scheibe geschuetzt ist und eine Hebung NICHT erteilt wurde.
 * Die saubere Form waere ein `hinweis`-Feld am Eintrag.
 *
 * DAS ZWEITE LITERAL IST GEDECKT: Ein STRUKTUR-Waechter haelt jeden Schluessel dieser
 * Zuordnung gegen FOREIGN_SIGNATURES.map(s => s.anbieter). Eine Umbenennung des
 * Anbieters macht ihn rot. Der Strukturwaechter darf die Liste lesen — das ist die im
 * Kopf von foreign-signatures.ts benannte Ausnahme.
 */
export const FOREIGN_ANBIETER_NOTE: Readonly<Record<string, string>> = {
  "Google-Tag": FOREIGN_GOOGLE_TAG_NOTE,
};

/**
 * Der Hinweis an einem Fund, der NICHT als ganzer Knoten entfernt werden kann. ER STEHT
 * STATT EINES KNOPFES, nicht daneben (ENTSCHEIDUNG P11.11-35, Satz (b)).
 *
 * ER GILT BEIDEN TRAEGERN — "handler" UND "aufruf" —, und deshalb heisst er nicht mehr
 * FOREIGN_HANDLER_NOTE: Der alte Name benannte seit ENTSCHEIDUNG P11.11-38 nur noch die
 * Haelfte seiner Faelle, und ein Name, der die Haelfte sagt, wird beim naechsten Umbau
 * als Einschraenkung gelesen.
 *
 * ES IST DIESELBE AUSKUNFT, und genau deshalb EIN Wortlaut statt zweier: Hier steckt
 * ein Aufruf in Code, der auch anderes enthalten kann, und er wird nicht automatisch
 * entfernt. Zwei Saetze fuer eine Aussage liefen auseinander.
 */
export const FOREIGN_MANUAL_NOTE =
  "Dieser Aufruf steckt in Code der Seite, der auch anderes enthalten kann, und wird nicht automatisch entfernt. Bitte von Hand löschen.";

/**
 * Die Nachbedingung des Entfernens, wenn sie NICHT erfuellt ist. DER GRUND IST DER
 * GANZE SATZ: EIN AUSWEG, DER NICHT ZU ENDE FUEHRT, MUSS SAGEN, WO ES HAKT — sonst
 * klickt der Betreiber und sieht denselben Fund weiter stehen, ohne zu wissen, warum
 * (dieselbe Figur wie die Nachbedingung in ENTSCHEIDUNG P11.11-19).
 *
 * SIE WIRD AUS DEM AKTUELLEN TEXT ABGELEITET, nie aus einem gespeicherten Zustand
 * (ENTSCHEIDUNG P11.11-24) — der Anker dafuer liegt im Aufrufer.
 */
export const FOREIGN_REST_MESSAGE =
  "Dieser Fund steht nach dem Entfernen noch im Code. Bitte die Stelle von Hand löschen.";

/* -------------------------------------------------------------------------- *
 * DIE WORTLAUTE DER SCHEIBE 11.11e (OWNER-FREIGABE 2026-09-22, ENTSCHEIDUNG
 * P11.11-41, Punkt (H) und E1 des Bau-Prompts)
 *
 * SIE SIND GEGEN DIE DOKUMENTWEITEN ABWESENHEITS-ZUSICHERUNGEN GEPRUEFT (GEMESSEN,
 * CC, 2026-09-22): die vier Nadeln aus CodeImporter.test.tsx — /%/, /gerettet/i,
 * /mindestens/, /NaN/ —, SK10 ("Scripte" kommt nicht vor) und "Tracking-Pixel".
 * Ein Waechter haelt es fest (S38). EINE KOLLISION WIRD GEMELDET, NICHT DURCH EINE
 * TEXT-ANPASSUNG BESEITIGT — ein angepasster Text waere eine Owner-Freigabe, die
 * niemand erteilt hat.
 *
 * SIE STEHEN HIER UND WERDEN VON `buildForeignView` WEITER OBEN BENUTZT. Das ist kein
 * Versehen: Sie gehoeren zu den Wortlauten und nicht in die Logik, und eine
 * Vorwaerts-Referenz auf eine Modul-Konstante ist unbedenklich, solange die Funktion
 * erst NACH der Modul-Auswertung gerufen wird — sie wird im Render gerufen.
 * -------------------------------------------------------------------------- */

/**
 * Die Ueberschrift des eingeklappten Bereichs. DIE ZAHL WIRD ANGEHAENGT, an genau
 * einer Stelle: im Block (4) in `src/components/CodeImporter.tsx`.
 *
 * SIE ZAEHLT SKRIPTE, NICHT GRUPPEN (P11.11-41, Punkt (H)) — `unbekannteSkripte` aus
 * `foreignView`, gerechnet als Summe ueber alle Gruppen.
 */
export const FOREIGN_UNKNOWN_HEADING = "Weitere Skripte";

/**
 * Die Gruppe fuer alles, woraus sich KEIN Host ablesen laesst: relative Adressen,
 * ungueltige, `data:` und `blob:`.
 *
 * SIE HEISST NICHT "Ohne Host": "Host" ist Jargon, und die Zielgruppe sind Media
 * Buyer. "Domain-Angabe" sagt dasselbe in ihrer Sprache.
 */
export const FOREIGN_GROUP_NO_HOST = "Ohne Domain-Angabe";

/**
 * Die Gruppe der Skripte ohne jede Adresse. Der Singular steht schon als
 * UNKNOWN_INLINE in der Liste — dieselbe Wortwahl im Plural, damit der Betreiber die
 * Gruppe und ihre Eintraege als dasselbe erkennt.
 */
export const FOREIGN_GROUP_INLINE = "Inline-Skripte";
