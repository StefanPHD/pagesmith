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
// DIE REGELN, AUF DENEN DAS STEHT, stehen in der Standdatei der Phase 13 (Zuschnitt
// Scheibe 13-1): Invarianten I1 bis I10, Setzungen P13-25 bis P13-32.

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
 * - "unnamed": mindestens ein Eingabefeld ohne `name` (Entscheidung P13-23). `fields`
 *   nennt sie erkennbar: Typ, dazu id oder Platzhalter.
 */
export type FormTargetBlock =
  | { kind: "foreign-action" }
  | { kind: "file-field" }
  | { kind: "dialog" }
  | { kind: "unnamed"; fields: string[] };

/**
 * Das Urteil ueber ein Formular. `blocks` leer = ein Ziel ist erlaubt. `inlineScript` ist
 * KEIN Ausschluss, sondern ein Hinweis (Setzung P13-31): das Formular traegt ein
 * Inline-`onsubmit`.
 */
export type FormTargetCheck = { blocks: FormTargetBlock[]; inlineScript: boolean };

// Eingabefelder im Sinne von Entscheidung P13-23 (Korrektur K1 des Bau-Auftrags): input
// ausser den Typen submit, button, reset, image, hidden — dazu select und textarea.
// fieldset, output, object und button tragen keinen Wert, den der Besucher eingibt.
const NOT_INPUT_TYPES = new Set(["submit", "button", "reset", "image", "hidden"]);

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

    const unnamed = controls
      .filter((el) => {
        if (el.tagName === "INPUT") {
          if (NOT_INPUT_TYPES.has((el as HTMLInputElement).type)) return false;
        } else if (el.tagName !== "SELECT" && el.tagName !== "TEXTAREA") {
          return false;
        }
        return (el.getAttribute("name") ?? "").trim() === "";
      })
      .map(describeField);
    if (unnamed.length > 0) blocks.push({ kind: "unnamed", fields: unnamed });

    return { blocks, inlineScript: form.hasAttribute("onsubmit") };
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
 * - "language":   die Projektsprache hat einen unbekannten Wert; die Meldung des Ziels
 *                 braucht sie (Setzung P13-27).
 * Gezaehlt wird nur ein Ziel, dessen <form> im Dokument steht: ein verwaistes wird nicht
 * verdrahtet (generateFunctional filtert es) und erreicht keine ausgelieferte Zeile.
 * DOM-ABHAENGIG, also NUR im Client. Der Server prueft Werte und Sprache selbst, ohne
 * Parser (publishProject); die Berechtigung kann er nicht pruefen.
 */
export type FormTargetDocumentProblem = "invalid" | "ineligible" | "language";

export function formTargetDocumentProblem(
  html: string,
  mappings: readonly Mapping[],
  ownDomains: readonly string[],
  language: ConsentLanguageRead
): FormTargetDocumentProblem | null {
  const live = mappings.filter(
    (m) => m.type === "formTarget" && formTargetCheck(html, m.elementId) !== null
  );
  if (live.length === 0) return null;
  if (live.some((m) => formTargetProblem(m.config, ownDomains) !== null)) return "invalid";
  if (live.some((m) => (formTargetCheck(html, m.elementId)?.blocks.length ?? 0) > 0))
    return "ineligible";
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
  "Ein Formular mit Ziel erfüllt die Bedingungen nicht mehr (eigene Zieladresse, Datei-Feld, method=\"dialog\" oder ein Eingabefeld ohne Namen). Bitte das Formular auswählen und den Hinweis dort lesen. Es wurde nichts veröffentlicht.";

/** Die Meldung eines Riegels im EDITOR — beim Veroeffentlichen oder beim Export. */
export function formTargetDocumentMessage(
  problem: FormTargetDocumentProblem,
  where: "publish" | "export"
): string {
  const text =
    problem === "invalid"
      ? FORM_TARGET_INVALID_MESSAGE
      : problem === "ineligible"
        ? FORM_TARGET_INELIGIBLE_MESSAGE
        : FORM_TARGET_LANGUAGE_UNKNOWN_MESSAGE;
  if (where === "publish") return text;
  return `Export gesperrt: ${text.replace(" Es wurde nichts veröffentlicht.", "")}`;
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
