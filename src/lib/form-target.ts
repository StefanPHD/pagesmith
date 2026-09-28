// FORMULAR-ZIEL (Phase 13, Scheibe 13-1). Ein <form>, das der Betreiber im Tool mit einem
// Ziel versieht, schickt nicht mehr nativ ab: Der Browser schickt die Felder DIREKT an die
// eingetragene Adresse (Entscheidung P13-2 der Phase 13), und nur wenn der Aufruf den
// Empfaenger erreicht hat, geht es weiter auf die Danke-Seite (Entscheidung P13-17).
//
// DREI TEILE, ALLE REIN (kein React, kein Server, keine Datenbank):
// 1. formTargetProblem — die WERTE (Zieladresse, Danke-Seite). Gerufen im Panel, im Tor von
//    publishProject und im Export-Riegel des Editors.
// 2. formTargetCheck — die BERECHTIGUNG eines Formulars. Braucht DOM (DOMParser) und laeuft
//    deshalb NUR im Client (Dauerregel "KEIN SERVER-SEITIGES HTML-PARSING").
// 3. buildFormTargetRuntime — der Baustein im ausgelieferten Text: Versand, Zeitlimit,
//    Sperre, eigene Meldung. Die Einsetzung in den submit-Listener steht in
//    buildWiringScript (lib/generate.ts), weil sie die Track-Anweisung des Wirings braucht.
//
// SEIT SCHEIBE 13-1c ein Teil 2a: deriveFormFieldNames — die EINE Ableitung der Feldnamen,
// die der Editor anzeigt und die Erzeugung (generateFunctional) schreibt; dazu die am Ziel
// bestaetigte Liste und ihr Riegel.
//
// DIE REGELN, AUF DENEN DAS STEHT, stehen in der Standdatei der Phase 13 (Zuschnitt
// Scheibe 13-1): Invarianten I1 bis I10, Setzungen P13-25 bis P13-32; fuer 13-1c der
// Zuschnitt Scheibe 13-1c: Invarianten J1 bis J9, Setzungen P13-43 bis P13-59.

import { isValidRedirectUrl, type Mapping } from "./mappings";
import { embedInScript } from "./script-embed";
import type { ConsentLanguage, ConsentLanguageRead } from "./settings";

/**
 * Das Zeitlimit eines Versands (Setzung P13-32 der Phase 13; SETZUNG, NICHT GEMESSEN).
 * Nach Ablauf erscheint die Meldung und die Sperre wird frei — der Aufruf wird NICHT
 * abgebrochen: Ein spaeter "erreicht" navigiert noch. Ein doppelter Lead ist besser als ein
 * verlorener; ohne Limit verschluckte die Sperre jeden weiteren Klick.
 */
export const FORM_TARGET_TIMEOUT_MS = 10_000;

/** Das Host-Element der eigenen Meldung. Es haengt an `body` (Entscheidung P13-24). */
export const FORM_TARGET_NOTICE_HOST_TAG = "pagesmith-form-notice";

// ===========================================================================
// 1. DIE WERTE
// ===========================================================================

/**
 * Was an einem Formular-Ziel nicht taugt.
 * - "shape":    kein Objekt, oder endpoint/thanksUrl sind keine Strings — ein Wert, den der
 *               Code nicht kennt (Dauerregel "EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT
 *               AB").
 * - "endpoint": keine https-Adresse, oder eine auf einem eigenen Host.
 * - "thanks":   keine absolute http(s)-Adresse — auch eine LEERE (Entscheidung P13-16).
 */
export type FormTargetProblem = "shape" | "endpoint" | "thanks";

/**
 * Die eigenen Hosts, auf die kein Formular-Ziel zeigen darf (Setzung P13-29). Abgeleitet
 * aus der Umgebung (Dauerregel "ABLEITEN STATT HARDCODEN"): die Hosting-Domaene
 * (NEXT_PUBLIC_HOSTING_DOMAIN) samt aller Unterdomaenen und der App-Host
 * (NEXT_PUBLIC_APP_URL). Dazu das lokale "lvh.me" — dasselbe feste Fallback wie
 * FALLBACK_SUFFIX in lib/hosting/host.ts; jene Datei ist eine Kern-Datei und bleibt in
 * dieser Scheibe unberuehrt, deshalb steht die Lesung hier ein zweites Mal.
 *
 * WARUM NICHT ERLAUBT: Ein no-cors-Aufruf auf denselben Ursprung loest mit Typ "basic" auf
 * und gilt damit als NIE erreicht — jeder erneute Versuch erzeugte einen weiteren Eingang.
 * Auf dem Serving-Host kommt dazu, dass `proxy` jeden Pfad auf die Serve-Route
 * umschreibt, die nur GET kennt.
 *
 * NEXT_PUBLIC_-Variablen werden zur Build-Zeit eingesetzt; die Funktion wird zur
 * AUFRUFZEIT gerufen, damit ein Test die Umgebung setzen kann.
 */
export function ownFormTargetDomains(): string[] {
  const domains = ["lvh.me"];
  const hosting = (process.env.NEXT_PUBLIC_HOSTING_DOMAIN ?? "")
    .trim()
    .replace(/^\.+/, "")
    .replace(/\/+$/, "")
    .split(":")[0]
    .toLowerCase();
  if (hosting) domains.push(hosting);
  const app = (process.env.NEXT_PUBLIC_APP_URL ?? "").trim();
  if (app) {
    try {
      domains.push(new URL(app).hostname.toLowerCase());
    } catch {
      // Eine kaputte App-URL traegt keinen Host bei. Sie bricht an anderer Stelle laut
      // (getCapiProxyUrl baut dann keinen Beacon).
    }
  }
  return domains;
}

function isOwnHost(hostname: string, ownDomains: readonly string[]): boolean {
  const h = hostname.toLowerCase();
  return ownDomains.some((d) => d !== "" && (h === d || h.endsWith("." + d)));
}

/**
 * Prueft die WERTE eines Formular-Ziels (Setzung P13-29). null = tauglich.
 * - endpoint: nur `https:` (eine http-Adresse scheitert auf einer https-Seite als Mixed
 *   Content und gaelte immer als nicht erreicht), nicht auf einem eigenen Host.
 * - thanksUrl: nur eine absolute http(s)-Adresse (isValidRedirectUrl, dieselbe Regel wie
 *   bei der Weiterleitung). Eine relative zeigte auf einer gehosteten Seite dieselbe Seite
 *   noch einmal, weil die Serve-Route den Pfad nicht liest.
 */
export function formTargetProblem(
  config: unknown,
  ownDomains: readonly string[]
): FormTargetProblem | null {
  if (!config || typeof config !== "object") return "shape";
  const { endpoint, thanksUrl } = config as Record<string, unknown>;
  if (typeof endpoint !== "string" || typeof thanksUrl !== "string") return "shape";
  let parsed: URL;
  try {
    parsed = new URL(endpoint.trim());
  } catch {
    return "endpoint";
  }
  if (parsed.protocol !== "https:" || !parsed.hostname) return "endpoint";
  if (isOwnHost(parsed.hostname, ownDomains)) return "endpoint";
  if (!isValidRedirectUrl(thanksUrl)) return "thanks";
  return null;
}

// ===========================================================================
// 2. DIE BERECHTIGUNG EINES FORMULARS
// ===========================================================================

/**
 * Ein Grund, warum ein Formular kein Ziel bekommt (Setzung P13-31, Entscheidung P13-23).
 * - "foreign-action": `action` am Formular oder `formaction` an einem Absende-Element ist
 *   eine ABSOLUTE Adresse (mit Schema oder protokoll-relativ "//"). Das Formular hat dann
 *   schon einen Empfaenger. Relativ, "#" und leer zaehlen NICHT: sie haben auf einer
 *   gehosteten Seite keinen Empfaenger.
 * - "file-field": ein Datei-Feld (Setzung P13-5).
 * - "dialog": `method="dialog"` am Formular oder `formmethod="dialog"` an einem
 *   Absende-Element — unser preventDefault verhinderte dort das Schliessen des Dialogs.
 * - "unnamed-radio": ein Auswahlknopf (Radio) ohne `name` (Scheibe 13-1c, Setzung P13-46).
 *   Ein Name aenderte sein Verhalten — gleichnamige Radios schliessen sich aus —, deshalb
 *   vergibt Pagesmith ihn nicht. Alle UEBRIGEN unbenannten Eingabefelder sind seit 13-1c
 *   BENENNBAR und kein Ausschluss mehr (deriveFormFieldNames).
 * - "blank-name": ein `name` nur aus Leerraum (Setzung P13-53). Er wird NICHT ueberschrieben
 *   (J3), und gesendet kaeme er als Leerzeichen-Name an.
 * `fields` nennt die Felder erkennbar: Typ, dazu id oder Platzhalter.
 */
export type FormTargetBlock =
  | { kind: "foreign-action" }
  | { kind: "file-field" }
  | { kind: "dialog" }
  | { kind: "unnamed-radio"; fields: string[] }
  | { kind: "blank-name"; fields: string[] };

/**
 * Das Urteil ueber ein Formular. `blocks` leer = ein Ziel ist erlaubt. `inlineScript` ist
 * KEIN Ausschluss, sondern ein Hinweis (Setzung P13-31): das Formular traegt ein
 * Inline-`onsubmit`.
 * `fields` und `fieldNames` (Scheibe 13-1c) kommen aus deriveFormFieldNames: die Felder
 * mit dem Namen, unter dem sie ankommen, und die Liste, die am Ziel bestaetigt wird.
 */
export type FormTargetCheck = {
  blocks: FormTargetBlock[];
  inlineScript: boolean;
  fields: FormField[];
  fieldNames: string[];
};

// Eingabefelder im Sinne von Entscheidung P13-23 (Korrektur K1 des Bau-Auftrags): input
// ausser den Typen submit, button, reset, image, hidden — dazu select und textarea.
// fieldset, output, object und button tragen keinen Wert, den der Besucher eingibt.
const NOT_INPUT_TYPES = new Set(["submit", "button", "reset", "image", "hidden"]);

// ===========================================================================
// 2a. DIE NAMEN DER FELDER (Phase 13, Scheibe 13-1c)
// ===========================================================================

/**
 * Woher der Name eines Feldes stammt. "code": er steht im Quelltext und wird nie
 * angefasst (J3). Die uebrigen sind abgeleitet, in dieser Reihenfolge (Setzung P13-44;
 * aria-labelledby ist KEINE Quelle, Setzung P13-52). Die "Nummer" aus P13-44 ist keine
 * eigene Quelle: Der Feldtyp liefert immer etwas, die Nummer wirkt nur als Suffix bei einer
 * Kollision.
 */
export type FieldNameSource = "code" | "id" | "label" | "aria-label" | "placeholder" | "type";

/** Ein Feld, wie es ankommt: sein Name und dessen Herkunft. */
export type FormField = { name: string; source: FieldNameSource };

/** Die Hoechstlaenge eines abgeleiteten Namens, Suffix eingeschlossen (Setzung P13-51). */
export const FIELD_NAME_MAX = 40;

/**
 * DIE KURZFORM (Setzung P13-51), fuer ALLE Quellen einschliesslich id: Umlaute vorher
 * umschreiben, Kleinbuchstaben, erlaubt [a-z0-9_], jedes andere Zeichen wird "_", mehrfaches
 * "_" zusammengefasst, "_" am Rand abgeschnitten, hoechstens FIELD_NAME_MAX Zeichen. Ergibt
 * sie "", gilt die naechste Quelle.
 * normalize("NFC") zuerst: Ein zerlegtes Umlaut-Zeichen (Vokal plus Trema) traefe die
 * Umschreibung sonst nicht.
 */
export function shortFieldName(raw: string): string {
  const s = raw
    .normalize("NFC")
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9_]/g, "_")
    .replace(/_+/g, "_")
    .replace(/^_+|_+$/g, "");
  return s.slice(0, FIELD_NAME_MAX).replace(/_+$/, "");
}

// Was aus einer Beschriftung NICHT in ihren Text gehoert: der Inhalt enthaltener Felder
// (Vermerk P13-50 — "<label>Land <select><option>DE</option></select></label>" liefert
// sonst "Land DE") und Script-artiger Inhalt.
const LABEL_SKIP =
  "button, input, meter, output, progress, select, textarea, datalist, script, style, template";

// Der Text einer Beschriftung — an einer KOPIE ermittelt: Die Kopie haengt an keinem Baum,
// und an der Beschriftung selbst aendert sich nichts.
function labelText(label: Element): string {
  const copy = label.cloneNode(true) as Element;
  copy.querySelectorAll(LABEL_SKIP).forEach((n) => n.remove());
  return copy.textContent ?? "";
}

function isEntryField(el: Element): boolean {
  if (el.tagName === "INPUT") return !NOT_INPUT_TYPES.has((el as HTMLInputElement).type);
  return el.tagName === "SELECT" || el.tagName === "TEXTAREA";
}

// Was mit seinem Namen gesendet werden KANN: Eingabefelder, versteckte Felder und
// Absende-Elemente (Setzung P13-55 — die Laufzeit sendet mit new FormData(f, submitter)).
// Knoepfe type=button/reset senden nie.
function isSendable(el: Element): boolean {
  if (isEntryField(el) || isSubmitControl(el)) return true;
  return el.tagName === "INPUT" && (el as HTMLInputElement).type === "hidden";
}

// Unter welchen Namen ein Feld ankommt: ein Bild-Absendeknopf als "<name>.x" und "<name>.y".
function sentNames(el: Element, name: string): string[] {
  const isImage =
    el.tagName === "INPUT" && (el as HTMLInputElement).type === "image";
  return isImage ? [`${name}.x`, `${name}.y`] : [name];
}

function nameBase(el: Element): { base: string; source: Exclude<FieldNameSource, "code"> } {
  const id = shortFieldName(el.getAttribute("id") ?? "");
  if (id) return { base: id, source: "id" };
  const labels = (el as HTMLInputElement).labels;
  for (const label of labels ? Array.from(labels) : []) {
    const text = shortFieldName(labelText(label));
    if (text) return { base: text, source: "label" };
  }
  const aria = shortFieldName(el.getAttribute("aria-label") ?? "");
  if (aria) return { base: aria, source: "aria-label" };
  const placeholder = shortFieldName(el.getAttribute("placeholder") ?? "");
  if (placeholder) return { base: placeholder, source: "placeholder" };
  const kind =
    el.tagName === "INPUT" ? (el as HTMLInputElement).type : el.tagName.toLowerCase();
  return { base: shortFieldName(kind) || "feld", source: "type" };
}

// Kollisionen hochzaehlen: "x", dann "x_2", "x_3" … — nie ein vergebener Name (J6), nie
// laenger als FIELD_NAME_MAX.
function uniqueName(base: string, reserved: ReadonlySet<string>): string {
  if (!reserved.has(base)) return base;
  for (let i = 2; ; i++) {
    const suffix = `_${i}`;
    const head = base.slice(0, FIELD_NAME_MAX - suffix.length).replace(/_+$/, "");
    const candidate = `${head}${suffix}`;
    if (!reserved.has(candidate)) return candidate;
  }
}

/** Das Ergebnis der Ableitung fuer EIN Formular. */
export type FormFieldNames = {
  /** Die Felder in Dokument-Reihenfolge, mit Name und Herkunft (Anzeige im Panel). */
  fields: FormField[];
  /** Die Liste, die am Ziel bestaetigt wird: sortiert, jeder Name einmal (Setzung P13-47). */
  names: string[];
  /** Was die Erzeugung schreibt: nur ABGELEITETE Namen, nie ein vorhandener (J3). */
  assignments: { element: Element; name: string }[];
  /** Radios ohne Namen (Setzung P13-46) — kein Ziel. */
  unnamedRadios: Element[];
  /** Felder mit einem Namen nur aus Leerraum (Setzung P13-53) — kein Ziel. */
  blankNames: Element[];
};

/**
 * DIE ABLEITUNGSFUNKTION DER SCHEIBE 13-1c — DIE EINZIGE (J5). Der Editor ruft sie ueber
 * formTargetCheck auf previewHtml, die Erzeugung in generateFunctional auf ihrem eigenen
 * Dokument; beide sind DOMParser-Dokumente desselben Quelltexts und sehen dieselben Felder
 * (Vermerk P13-50). Sie SCHREIBT NICHTS — das Schreiben steht beim Aufrufer.
 *
 * - Die Felder kommen aus `form.elements` (auch per form=-Attribut ausserhalb), OHNE die mit
 *   einem noscript-Vorfahren: live sind sie Text (Setzung P13-54).
 * - Reserviert sind ALLE vorhandenen Namen in `form.elements`, auch die ausgelassenen: ein
 *   abgeleiteter Name trifft nie einen vorhandenen (J6).
 * - Ein vorhandener Name ("code") bleibt, wie er ist (J3) — auch mit Gross/Klein oder
 *   Leerzeichen am Rand; nur ein Name AUS Leerraum ist eine Sperre (Setzung P13-53). Ein
 *   LEERES Attribut (name="") traegt keinen Namen und gilt als unbenannt.
 * - Ein unbenanntes Eingabefeld bekommt seinen Namen aus id · Beschriftung · aria-label ·
 *   Platzhalter · Feldtyp (Setzungen P13-44, P13-51); Radios ausgenommen (Setzung P13-46).
 * - Deaktivierte Felder zaehlen mit, wie in 13-1: ob sie beim Absenden aktiv sind,
 *   entscheidet das Skript der Seite.
 * - Die Liste traegt nur NAMEN, nie Werte (J8).
 */
export function deriveFormFieldNames(form: HTMLFormElement): FormFieldNames {
  // BILD-ABSENDEKNOEPFE stehen NICHT in form.elements (HTML-Spezifikation: "listed elements,
  // excluding image buttons") — als Absender senden sie trotzdem "<name>.x"/"<name>.y"
  // (Setzung P13-55). Sie werden ueber ihr form-Eigentum dazugeholt und in
  // Dokument-Reihenfolge einsortiert.
  const images = Array.from(form.ownerDocument.querySelectorAll("input")).filter(
    (el) => el.type === "image" && el.form === form
  );
  const all = [...Array.from(form.elements), ...images].sort((a, b) =>
    a === b ? 0 : a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1
  );
  const reserved = new Set<string>();
  for (const el of all) {
    const name = el.getAttribute("name");
    if (name) reserved.add(name);
  }
  const fields: FormField[] = [];
  const sent: string[] = [];
  const assignments: { element: Element; name: string }[] = [];
  const unnamedRadios: Element[] = [];
  const blankNames: Element[] = [];

  for (const el of all) {
    if (el.closest("noscript")) continue;
    if (!isSendable(el)) continue;
    const raw = el.getAttribute("name");
    if (raw) {
      if (raw.trim() === "") {
        blankNames.push(el);
        continue;
      }
      fields.push({ name: raw, source: "code" });
      sent.push(...sentNames(el, raw));
      continue;
    }
    // Ohne Namen sendet ein verstecktes Feld oder ein Absende-Element nichts, und es
    // bekommt auch keinen: Es ist kein Eingabefeld.
    if (!isEntryField(el)) continue;
    if (el.tagName === "INPUT" && (el as HTMLInputElement).type === "radio") {
      unnamedRadios.push(el);
      continue;
    }
    const { base, source } = nameBase(el);
    const name = uniqueName(base, reserved);
    reserved.add(name);
    assignments.push({ element: el, name });
    fields.push({ name, source });
    sent.push(...sentNames(el, name));
  }

  return {
    fields,
    names: sortedFieldNames(sent),
    assignments,
    unnamedRadios,
    blankNames,
  };
}

/** Sortiert, jeder Name einmal — die Form der gespeicherten Liste. */
export function sortedFieldNames(names: readonly string[]): string[] {
  return Array.from(new Set(names)).sort();
}

/** Zwei Listen als MENGE gleich (Reihenfolge und Doppelte zaehlen nicht). */
export function sameFieldNames(a: readonly string[], b: readonly string[]): boolean {
  const x = sortedFieldNames(a);
  const y = sortedFieldNames(b);
  return x.length === y.length && x.every((n, i) => n === y[i]);
}

/**
 * Die gespeicherte Liste eines Formular-Ziels (Setzungen P13-47, P13-48, P13-56).
 * - "missing": keine Liste — ein Ziel aus 13-1 oder ein nie bestaetigtes. Fehlend heisst
 *   NICHT "passt" (Setzung P13-48).
 * - "shape": keine Liste aus nicht-leeren Zeichenketten — ein Wert, den der Code nicht
 *   kennt (Dauerregel "EIN UNBEKANNTER KONFIGURATIONSWERT BRICHT LAUT AB").
 * Der Server kann damit pruefen, OB eine Liste da ist; ob sie zum Formular passt, kann er
 * nicht (kein DOM).
 */
export function formTargetNamesProblem(config: unknown): "missing" | "shape" | null {
  if (!config || typeof config !== "object") return "shape";
  const { fieldNames } = config as Record<string, unknown>;
  if (fieldNames === undefined) return "missing";
  if (!Array.isArray(fieldNames)) return "shape";
  if (fieldNames.some((n) => typeof n !== "string" || n.trim() === "")) return "shape";
  return null;
}

function isAbsoluteAddress(raw: string | null): boolean {
  const value = (raw ?? "").trim();
  if (value === "") return false;
  if (value.startsWith("//")) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
}

function isSubmitControl(el: Element): boolean {
  if (el.tagName !== "BUTTON" && el.tagName !== "INPUT") return false;
  const type = (el as HTMLButtonElement | HTMLInputElement).type;
  return type === "submit" || type === "image";
}

// Wie ein unbenanntes Feld im Panel erkennbar wird: Typ, dazu id oder Platzhalter.
function describeField(el: Element): string {
  const kind =
    el.tagName === "INPUT" ? (el as HTMLInputElement).type : el.tagName.toLowerCase();
  const id = el.getAttribute("id")?.trim();
  if (id) return `${kind} #${id}`;
  const placeholder = el.getAttribute("placeholder")?.trim();
  if (placeholder) return `${kind} "${placeholder}"`;
  return kind;
}

/**
 * Urteilt ueber das <form> mit der ps-ID `elementId` im Dokument `html`.
 * null: kein DOMParser, das Element fehlt oder ist kein <form>, oder ein Wurf — dann wird
 * KEIN Ziel angeboten.
 *
 * html MUSS das Dokument sein, aus dem die Elementliste stammt (dieselbe Lage wie bei
 * submitFormOf in lib/generate.ts): nur dort tragen frisch gewuerfelte ps-IDs dieselbe
 * Kennung. Gesucht wird per getAttribute-Vergleich, nicht ueber einen Selektor mit
 * eingesetzter ID.
 *
 * Die Felder kommen aus `form.elements` — also auch Felder AUSSERHALB des Formulars, die
 * per form=-Attribut dazugehoeren. Genau diese Menge nimmt FormData mit.
 */
export function formTargetCheck(html: string, elementId: string): FormTargetCheck | null {
  if (!html || typeof DOMParser === "undefined") return null;
  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    let form: HTMLFormElement | null = null;
    for (const cand of Array.from(doc.querySelectorAll("[data-pagesmith-id]"))) {
      if (cand.getAttribute("data-pagesmith-id") === elementId) {
        if (cand.tagName === "FORM") form = cand as HTMLFormElement;
        break;
      }
    }
    if (!form) return null;

    const controls = Array.from(form.elements);
    const blocks: FormTargetBlock[] = [];

    const foreign =
      isAbsoluteAddress(form.getAttribute("action")) ||
      controls.some((el) => isSubmitControl(el) && isAbsoluteAddress(el.getAttribute("formaction")));
    if (foreign) blocks.push({ kind: "foreign-action" });

    if (controls.some((el) => el.tagName === "INPUT" && (el as HTMLInputElement).type === "file"))
      blocks.push({ kind: "file-field" });

    const isDialog = (raw: string | null) => (raw ?? "").trim().toLowerCase() === "dialog";
    if (
      isDialog(form.getAttribute("method")) ||
      controls.some((el) => isSubmitControl(el) && isDialog(el.getAttribute("formmethod")))
    )
      blocks.push({ kind: "dialog" });

    // DIE NAMEN (Scheibe 13-1c): DIESELBE Funktion wie in generateFunctional (J5).
    const names = deriveFormFieldNames(form);
    if (names.unnamedRadios.length > 0)
      blocks.push({ kind: "unnamed-radio", fields: names.unnamedRadios.map(describeField) });
    if (names.blankNames.length > 0)
      blocks.push({ kind: "blank-name", fields: names.blankNames.map(describeField) });

    return {
      blocks,
      inlineScript: form.hasAttribute("onsubmit"),
      fields: names.fields,
      fieldNames: names.names,
    };
  } catch {
    return null;
  }
}

// ===========================================================================
// DIE RIEGEL VOR DEM VEROEFFENTLICHEN UND VOR DEM EXPORT
// ===========================================================================

/**
 * Was an den Formular-Zielen eines Dokuments nicht taugt — in dieser Reihenfolge geprueft:
 * - "invalid":    ein Wert (formTargetProblem).
 * - "ineligible": ein Formular erfuellt die Bedingungen nicht mehr (formTargetCheck) — der
 *                 Betreiber kann den Code NACH dem Anlegen des Ziels geaendert haben.
 * - "names":      die Feldnamen weichen von der am Ziel bestaetigten Liste ab, oder es gibt
 *                 keine (Scheibe 13-1c; Entscheidung P13-41, Setzung P13-48). Die
 *                 Einzelheiten alt -> neu liefert formTargetNameDrift.
 * - "language":   die Projektsprache hat einen unbekannten Wert; die Meldung des Ziels
 *                 braucht sie (Setzung P13-27).
 * Gezaehlt wird nur ein Ziel, dessen <form> im Dokument steht: ein verwaistes wird nicht
 * verdrahtet (generateFunctional filtert es) und erreicht keine ausgelieferte Zeile.
 * DOM-ABHAENGIG, also NUR im Client. Der Server prueft Werte, Sprache und das VORHANDENSEIN
 * der Liste selbst, ohne Parser (publishProject); Berechtigung und Abweichung kann er nicht
 * pruefen.
 */
export type FormTargetDocumentProblem = "invalid" | "ineligible" | "names" | "language";

/** Eine Abweichung der Feldnamen an einem Formular-Ziel. saved null = keine Liste. */
export type FormTargetNameDrift = {
  elementId: string;
  saved: string[] | null;
  current: string[];
};

type LiveTarget = { mapping: Extract<Mapping, { type: "formTarget" }>; check: FormTargetCheck };

function liveTargets(html: string, mappings: readonly Mapping[]): LiveTarget[] {
  const out: LiveTarget[] = [];
  for (const m of mappings) {
    if (m.type !== "formTarget") continue;
    const check = formTargetCheck(html, m.elementId);
    if (check) out.push({ mapping: m, check });
  }
  return out;
}

function driftOf({ mapping, check }: LiveTarget): FormTargetNameDrift | null {
  const saved =
    formTargetNamesProblem(mapping.config) === null
      ? sortedFieldNames(mapping.config.fieldNames ?? [])
      : null;
  if (saved !== null && sameFieldNames(saved, check.fieldNames)) return null;
  return { elementId: mapping.elementId, saved, current: check.fieldNames };
}

/**
 * Die Abweichungen der Feldnamen in einem Dokument — je Ziel die gespeicherte Liste (null =
 * keine oder unbrauchbar) und die aktuelle. Leer = alles bestaetigt. Nur Ziele, deren
 * <form> im Dokument steht.
 */
export function formTargetNameDrift(
  html: string,
  mappings: readonly Mapping[]
): FormTargetNameDrift[] {
  return liveTargets(html, mappings)
    .map(driftOf)
    .filter((d): d is FormTargetNameDrift => d !== null);
}

export function formTargetDocumentProblem(
  html: string,
  mappings: readonly Mapping[],
  ownDomains: readonly string[],
  language: ConsentLanguageRead
): FormTargetDocumentProblem | null {
  const live = liveTargets(html, mappings);
  if (live.length === 0) return null;
  if (live.some((t) => formTargetProblem(t.mapping.config, ownDomains) !== null))
    return "invalid";
  if (live.some((t) => t.check.blocks.length > 0)) return "ineligible";
  if (live.some((t) => driftOf(t) !== null)) return "names";
  if (language === "unknown") return "language";
  return null;
}

/** Abbruch in publishProject bei einem unbrauchbaren Wert (Invariante I8). */
export const FORM_TARGET_INVALID_MESSAGE =
  "Ein Formular-Ziel ist ungültig: Die Zieladresse muss mit https:// beginnen und darf nicht auf Pagesmith selbst zeigen, die Danke-Seite muss eine vollständige Adresse (http:// oder https://) sein. Es wurde nichts veröffentlicht.";

/**
 * Abbruch in publishProject bei unbekannter Projektsprache, sobald ein Formular-Ziel
 * besteht. Die Sprache gilt auch fuer die Meldung des Formular-Ziels (Setzung P13-27).
 */
export const FORM_TARGET_LANGUAGE_UNKNOWN_MESSAGE =
  "Die Sprache des Projekts hat einen unbekannten Wert; sie gilt auch für die Meldung des Formular-Ziels. Bitte unter „Sprache“ neu wählen. Es wurde nichts veröffentlicht.";

/** Nur im Client: ein Formular mit Ziel erfuellt die Bedingungen nicht mehr. */
export const FORM_TARGET_INELIGIBLE_MESSAGE =
  "Ein Formular mit Ziel erfüllt die Bedingungen nicht mehr (eigene Zieladresse, Datei-Feld, method=\"dialog\", ein Auswahlknopf ohne Namen oder ein Name nur aus Leerzeichen). Bitte das Formular auswählen und den Hinweis dort lesen. Es wurde nichts veröffentlicht.";

/**
 * Abbruch in publishProject, wenn ein Formular-Ziel keine brauchbare Liste der Feldnamen
 * traegt (Setzung P13-56). Der Server sieht nur, DASS sie fehlt, nicht welche Namen gelten.
 */
export const FORM_TARGET_NAMES_UNCONFIRMED_MESSAGE =
  "Für ein Formular-Ziel sind die Feldnamen nicht bestätigt. Bitte das Formular auswählen und „Neue Feldnamen bestätigen“ klicken. Es wurde nichts veröffentlicht.";

function withoutPublishTail(text: string): string {
  return `Export gesperrt: ${text.replace(" Es wurde nichts veröffentlicht.", "")}`;
}

/**
 * Die Meldung eines Riegels im EDITOR — beim Veroeffentlichen oder beim Export. "names"
 * steht nicht hier: seine Meldung braucht die Listen (formTargetNamesMessage).
 */
export function formTargetDocumentMessage(
  problem: Exclude<FormTargetDocumentProblem, "names">,
  where: "publish" | "export"
): string {
  const text =
    problem === "invalid"
      ? FORM_TARGET_INVALID_MESSAGE
      : problem === "ineligible"
        ? FORM_TARGET_INELIGIBLE_MESSAGE
        : FORM_TARGET_LANGUAGE_UNKNOWN_MESSAGE;
  if (where === "publish") return text;
  return withoutPublishTail(text);
}

/**
 * DIE MELDUNG BEI ABWEICHENDEN ODER FEHLENDEN FELDNAMEN (Entscheidung P13-41, Setzung
 * P13-57): die VOLLEN Listen "alt → neu", je Ziel, samt Variante, wenn das Projekt zwei hat.
 */
export function formTargetNamesMessage(
  drifts: readonly (FormTargetNameDrift & { variant: "A" | "B" | null })[],
  where: "publish" | "export"
): string {
  const list = (names: readonly string[]) => (names.length > 0 ? names.join(", ") : "(keine)");
  const parts = drifts.map(
    (d) =>
      `${d.variant ? `Variante ${d.variant}: ` : ""}alt: ${
        d.saved === null ? "(keine bestätigt)" : list(d.saved)
      } → neu: ${list(d.current)}`
  );
  const text = `Die Feldnamen eines Formulars mit Ziel sind geändert oder noch nicht bestätigt — ${parts.join("; ")}. Bitte das Formular auswählen und „Neue Feldnamen bestätigen“ klicken. Es wurde nichts veröffentlicht.`;
  if (where === "publish") return text;
  return withoutPublishTail(text);
}

// ===========================================================================
// 3. DER BAUSTEIN IM AUSGELIEFERTEN TEXT
// ===========================================================================

// DIE MELDUNG (Setzung P13-27): Projektsprache, Anrede wie die deutschen Texte des
// Einwilligungs-Dialogs ("du"). Sie behauptet WEDER eine Ursache NOCH ein Ergebnis — "nicht
// erreicht" heisst hier nur, dass kein Empfang bestaetigt ist; die Daten koennen trotzdem
// angekommen sein (Zeitlimit, Setzung P13-32).
// DIE TEXTE SIND REINES ASCII, und das ist Absicht: Ein exportierter Text kann auf einer
// Seite ohne Zeichensatz-Angabe landen, und ein Umlaut kaeme dort verstuemmelt an. Die
// Texte des Einwilligungs-Dialogs sind aus demselben Grund ASCII (tracking/consent-texts.ts).
const NOTICE_TEXTS: Record<ConsentLanguage, { text: string; close: string }> = {
  de: {
    text: "Wir konnten den Empfang deiner Angaben nicht sicherstellen. Bitte sende das Formular noch einmal.",
    close: "Ausblenden",
  },
  en: {
    text: "We could not make sure your details were received. Please submit the form again.",
    close: "Dismiss",
  },
};

// OBEN am Rand, nicht unten: Die Einwilligungs-Leiste sitzt unten mit derselben
// Stapel-Ebene. `:host` gestaltet das EIGENE Host-Element aus dem Schattenbaum heraus —
// dieselbe Bauform wie die Leiste (CONSENT_BAR_CSS, tracking/consent-bar.ts). `.off`
// versteckt per Klasse im eigenen Baum (Dauerregel "VERSTECKEN PER CSS-KLASSE").
const NOTICE_CSS =
  ":host{all:initial !important;display:block !important;position:fixed !important;" +
  "left:0 !important;right:0 !important;top:0 !important;" +
  "z-index:2147483647 !important;}" +
  ".box{box-sizing:border-box;display:flex;flex-wrap:wrap;gap:8px;" +
  "justify-content:center;align-items:center;padding:12px 16px;" +
  "background:#7f1d1d;color:#ffffff;" +
  'font:14px/1.4 system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;}' +
  ".off{display:none;}" +
  ".text{margin:0;flex:1 1 auto;text-align:center;}" +
  "button{box-sizing:border-box;margin:0;padding:8px 14px;" +
  "border:1px solid #ffffff;border-radius:6px;background:transparent;color:#ffffff;" +
  "font:inherit;font-weight:600;cursor:pointer;}" +
  "button:focus-visible{outline:2px solid #ffffff;outline-offset:2px;}";

/**
 * Der Baustein des Formular-Ziels — wird in die IIFE von buildWiringScript gesplicet,
 * NUR wenn die gefilterte Tabelle ein Formular-Ziel traegt und der Modus "export" ist
 * (Setzung P13-30, Invariante I5). Er definiert zwei lokale Funktionen:
 *
 * __psFormTargetSend(f, submitter, cfg, onReached)
 * - SPERRE je Formular: laeuft schon ein Versand, passiert nichts. Das preventDefault
 *   steht VORHER, beim Aufrufer — auch ein gesperrter Klick schickt nie nativ ab.
 * - DIE LAUFZEIT-WACHE (Nachschaerfung vor dem GO der Scheibe 13-1; Verteidigung in der
 *   Tiefe fuer Invariante I1): VOR dem Rumpf-Bau und VOR fetch. Ist die Zieladresse keine
 *   Zeichenkette, beginnt sie nicht mit "https://", ist sie nicht zu parsen oder hat sie
 *   DENSELBEN URSPRUNG wie die Seite — oder ist die Danke-Seite keine Zeichenkette oder
 *   beginnt weder mit "http://" noch mit "https://" —, dann fail() und return: Es wird
 *   NICHTS gesendet. Grund: Das Tor beim Veroeffentlichen und der Export-Riegel sind sonst
 *   die einzigen Wachen; eine kaputte oder durchgerutschte Konfiguration schickte die
 *   Formularwerte an unseren eigenen Host (fetch(undefined) wird zu einer RELATIVEN
 *   Adresse). Der Ursprungsvergleich deckt den Serving-Host und jede Custom-Domain,
 *   unabhaengig von der Umgebung und ohne zweite Lesestelle.
 *   DIE PRAEFIX-PRUEFUNG LAEUFT AUF DEM GETRIMMTEN WERT UND OHNE GROSS/KLEIN: formTargetProblem
 *   parst mit new URL, und das nimmt " https://…" und "HTTPS://…" an. Eine strengere
 *   Laufzeit verweigerte einen Wert, den das Tor durchgelassen hat — auf der Live-Seite,
 *   lautlos und dauerhaft.
 * - Rumpf: `new URLSearchParams(new FormData(f, submitter))`, bei einem Wurf ohne
 *   submitter (aeltere Browser, fremder submitter). Das ist die GEMESSENE Form
 *   (application/x-www-form-urlencoded, Setzung P13-19).
 * - `fetch(endpoint, {method: "POST", mode: "no-cors", keepalive: true, body})` — die
 *   Form, die in G0 und B0 gemessen ist.
 * - "ERREICHT" GILT NUR BEI `r.type === "opaque"` (Setzung P13-21). Jeder andere Ausgang
 *   — ein Wurf, "basic" (ein Blocker, der umleitet), jeder unerwartete Typ — ist "nicht
 *   erreicht": Sperre frei, Meldung, KEINE Navigation (Invariante I3).
 * - Bei "erreicht": onReached (der Track, gekapselt — ein Wurf darin haelt die Navigation
 *   nicht auf), dann `window.location.href = cfg.thanksUrl` — UNVERAENDERT, ohne Query
 *   (Invariante I2).
 * - ZEITLIMIT (Setzung P13-32): nach FORM_TARGET_TIMEOUT_MS Meldung und Sperre frei, der
 *   Aufruf laeuft weiter; ein spaetes "opaque" navigiert noch, ein spaetes anderes zeigt die
 *   Meldung.
 *
 * __psFormTargetShow(on) — die Meldung in einem EIGENEN Schattenbaum. Das Host-Element
 * entsteht beim ersten Fehlschlag und haengt an `body` (Entscheidung P13-24); danach wird
 * nur noch IM eigenen Baum per Klasse umgeschaltet. KEIN Fokus-Wechsel, kein Eingriff an
 * einem fremden Knoten (Invariante I6).
 *
 * KEIN EINWILLIGUNGS-TOR (Invariante I10, Setzung P13-8) und KEINE Zeile auf der Konsole
 * mit Feldwerten (Invariante I1).
 *
 * Der Text enthaelt kein `<` (er steht in einem <script>, das keinen literalen
 * "</script>" tragen darf); die Betreiber-Werte (Adresse, Danke-Seite) stehen NICHT hier,
 * sondern im Datenblock, der ueber embedInScript kodiert wird (Setzung P13-28).
 */
export function buildFormTargetRuntime(language: ConsentLanguage): string {
  const texts = NOTICE_TEXTS[language];
  return `
  // FORMULAR-ZIEL (Phase 13, Scheibe 13-1): Versand an die eingetragene Adresse,
  // "erreicht" nur bei einer opaque-Antwort, sonst eigene Meldung.
  var __psFormTargetBusy = [];
  var __psFormTargetBox = null;
  function __psFormTargetShow(on) {
    if (!__psFormTargetBox) {
      if (!on) return;
      var nb = document.body;
      if (!nb) return;
      var host = document.createElement(${embedInScript(FORM_TARGET_NOTICE_HOST_TAG)});
      if (typeof host.attachShadow !== "function") return;
      var root = host.attachShadow({ mode: "open" });
      var style = document.createElement("style");
      style.textContent = ${embedInScript(NOTICE_CSS)};
      root.appendChild(style);
      var box = document.createElement("div");
      box.setAttribute("role", "alert");
      box.setAttribute("lang", ${embedInScript(language)});
      var text = document.createElement("p");
      text.setAttribute("class", "text");
      text.textContent = ${embedInScript(texts.text)};
      box.appendChild(text);
      var close = document.createElement("button");
      close.setAttribute("type", "button");
      close.textContent = ${embedInScript(texts.close)};
      close.addEventListener("click", function () {
        __psFormTargetShow(false);
      });
      box.appendChild(close);
      root.appendChild(box);
      nb.appendChild(host);
      __psFormTargetBox = box;
    }
    __psFormTargetBox.setAttribute("class", on ? "box" : "box off");
  }
  function __psFormTargetSend(f, submitter, cfg, onReached) {
    if (__psFormTargetBusy.indexOf(f) !== -1) return;
    __psFormTargetBusy.push(f);
    __psFormTargetShow(false);
    var settled = false;
    var freed = false;
    function free() {
      if (freed) return;
      freed = true;
      var i = __psFormTargetBusy.indexOf(f);
      if (i !== -1) __psFormTargetBusy.splice(i, 1);
    }
    function fail() {
      free();
      __psFormTargetShow(true);
    }
    var ep = typeof cfg.endpoint === "string" ? cfg.endpoint.trim() : "";
    var ty = typeof cfg.thanksUrl === "string" ? cfg.thanksUrl.trim().toLowerCase() : "";
    var ok =
      ep.slice(0, 8).toLowerCase() === "https://" &&
      (ty.slice(0, 7) === "http://" || ty.slice(0, 8) === "https://");
    if (ok) {
      try {
        if (new URL(ep).origin === location.origin) ok = false;
      } catch (err) {
        ok = false;
      }
    }
    if (!ok) {
      fail();
      return;
    }
    var body;
    try {
      body = new URLSearchParams(new FormData(f, submitter || null));
    } catch (err) {
      try {
        body = new URLSearchParams(new FormData(f));
      } catch (err2) {
        fail();
        return;
      }
    }
    var timer = setTimeout(function () {
      if (!settled) fail();
    }, ${FORM_TARGET_TIMEOUT_MS});
    var req;
    try {
      req = fetch(cfg.endpoint, {
        method: "POST",
        mode: "no-cors",
        keepalive: true,
        body: body
      });
    } catch (err) {
      settled = true;
      clearTimeout(timer);
      fail();
      return;
    }
    req.then(
      function (r) {
        settled = true;
        clearTimeout(timer);
        if (r && r.type === "opaque") {
          try {
            onReached();
          } catch (err) {}
          window.location.href = cfg.thanksUrl;
        } else {
          fail();
        }
      },
      function () {
        settled = true;
        clearTimeout(timer);
        fail();
      }
    );
  }`;
}
