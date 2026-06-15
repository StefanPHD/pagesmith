// Reine Erkennungs-Logik. Bewusst ohne React-Seiteneffekte ausserhalb des
// Parsers, damit sie unit-testbar bleibt (siehe detect.test.ts).

export type ElementType = "button" | "form" | "link";

export type DetectedElement = {
  // Dauerhafte, code-residente ID im Format "ps-" + 6 zufaellige Zeichen
  // (z.B. "ps-a1b2c3"). Lebt als data-pagesmith-id-Attribut im Code und bleibt
  // ueber Edits stabil (siehe stabilizeIds). NICHT positionsbasiert.
  id: string;
  type: ElementType;
  tag: string;
  label: string;
};

export type PreparedPreview = {
  // Annotiertes + mit Listener-Script injiziertes HTML fuer das Preview-iframe.
  html: string;
  // Die erkannten Elemente – ID-gleich mit den Attributen im html.
  elements: DetectedElement[];
};

const MAX_LABEL = 60;

const PAGESMITH_ID_ATTR = "data-pagesmith-id";

// ID-Format (endgueltige Owner-Entscheidung): IMMER selbst generiert,
// "ps-" + 6 Zeichen aus [a-z0-9]. User-id="..."-Attribute werden NIE
// wiederverwendet (nicht eindeutig, vom User aenderbar) – unsere ID ist isoliert.
const PS_ID_RE = /^ps-[a-z0-9]{6}$/;
const PS_ID_CHARS = "abcdefghijklmnopqrstuvwxyz0123456789";
const PS_ID_LEN = 6;

// Nicht-kryptografisch (IDs sind keine Secrets); Eindeutigkeit im Dokument
// stellt freshUniqueId per Re-Roll sicher.
function generatePsId(): string {
  let s = "ps-";
  for (let i = 0; i < PS_ID_LEN; i++) {
    s += PS_ID_CHARS[Math.floor(Math.random() * PS_ID_CHARS.length)];
  }
  return s;
}

// Wuerfelt so lange, bis die ID im aktuellen Dokument noch nicht vergeben ist.
function freshUniqueId(used: Set<string>): string {
  let id = generatePsId();
  while (used.has(id)) id = generatePsId();
  return id;
}

// Klasse + Style fuer das Auswahl-Highlight im Preview-iframe. Bewusst NUR
// outline (kein border) -> kein Layout-Jump beim Markieren. Das <style>-Tag wird
// als LETZTES Element im <head> injiziert, damit dieses !important-outline gegen
// evtl. eigene !important-outline-Regeln des gepasteten Codes gewinnt.
const HIGHLIGHT_CLASS = "pagesmith-highlight";
const HIGHLIGHT_STYLE = `.${HIGHLIGHT_CLASS} { outline: 3px solid #3b82f6 !important; outline-offset: 2px !important; }`;

// Buttons inkl. role="button" und allen klickbaren Input-Typen.
// input[type=submit|button|image] decken die HTML-Button-Varianten ab.
const BUTTON_SELECTOR =
  'button, [role="button"], input[type="submit"], input[type="button"], input[type="image"]';

// EIN kombinierter Selektor -> eine einzige Traversierung in Dokument-Reihenfolge.
const CANDIDATE_SELECTOR = `${BUTTON_SELECTOR}, form, a[href]`;

// Selbst-ausfuehrendes Listener-Script, das ins Preview-iframe injiziert wird.
// Faengt Klicks auf annotierte Elemente in der CAPTURE-Phase ab und meldet die
// ID an das Eltern-Fenster. preventDefault + stopPropagation neutralisieren
// zugleich inline onclick/onsubmit aus dem gepasteten Fremdcode.
// WICHTIG: Darf keinen literalen "</script>"-String enthalten (Serialisierung).
const LISTENER_SCRIPT = `(function () {
  document.addEventListener(
    "click",
    function (e) {
      var t = e.target;
      if (!t || typeof t.closest !== "function") return;
      var el = t.closest("[${PAGESMITH_ID_ATTR}]");
      if (!el) return;
      e.preventDefault();
      e.stopPropagation();
      window.parent.postMessage(
        { type: "ELEMENT_CLICKED", elementId: el.getAttribute("${PAGESMITH_ID_ATTR}") },
        "*"
      );
    },
    true
  );
  document.addEventListener(
    "submit",
    function (e) {
      e.preventDefault();
    },
    true
  );
  // Rueck-Bruecke (Liste -> iframe): Parent diktiert die Auswahl. Idempotent:
  // erst die bisherige Markierung entfernen, dann ggf. neu setzen. elementId
  // === null bedeutet: alles deselektieren. Gescrollt wird NUR, wenn der Parent
  // scroll:true sendet (Auswahl aus der Liste) – nicht beim Klick im iframe.
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.type !== "SET_SELECTED_ID") return;
    var prev = document.querySelector(".${HIGHLIGHT_CLASS}");
    if (prev) prev.classList.remove("${HIGHLIGHT_CLASS}");
    if (d.elementId == null) return;
    var el = document.querySelector('[${PAGESMITH_ID_ATTR}="' + d.elementId + '"]');
    if (!el) return;
    el.classList.add("${HIGHLIGHT_CLASS}");
    if (d.scroll) el.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });
  // READY-Handshake gegen Race Conditions: nach jedem srcDoc-Reload meldet sich
  // das frische iframe EINMAL beim Parent, der dann die aktuelle Auswahl
  // zuruecksendet. Kein Timing-Raten via setTimeout.
  window.parent.postMessage({ type: "IFRAME_READY" }, "*");
})();`;

/**
 * Klassifiziert ein Kandidaten-Element mit Prioritaet button > form > link.
 * Ein <a href role="button"> wird so genau einmal als Button gefuehrt – gleiches
 * Dedup-Ergebnis wie zuvor, hier inhaerent durch die Single-Pass-Traversierung.
 */
function classify(el: Element): Omit<DetectedElement, "id"> | null {
  if (el.matches(BUTTON_SELECTOR)) {
    const input = el as HTMLInputElement;
    const text = (
      el.textContent ||
      input.value ||
      el.getAttribute("alt") || // input[type="image"] traegt seinen Text im alt
      ""
    ).trim();
    return {
      type: "button",
      tag: el.tagName.toLowerCase(),
      label: text.slice(0, MAX_LABEL) || "(ohne Text)",
    };
  }

  if (el.tagName === "FORM") {
    return {
      type: "form",
      tag: "form",
      label: el.getAttribute("action") || "(keine action gesetzt)",
    };
  }

  // a[href] – oft CTAs, die wie Buttons aussehen.
  //
  // NOTE (Link-Rauschen, fuer spaeter – hier bewusst NICHT umgesetzt):
  // Eine echte Landingpage hat viele Nav-/Footer-Links, die keine CTAs sind.
  // Spaeter koennten wir echte CTAs heuristisch herausfiltern (nav/footer
  // ignorieren, Button-Styling gewichten, above-the-fold hoeher gewichten).
  if (el.tagName === "A" && el.hasAttribute("href")) {
    const text = (el.textContent || "").trim();
    return {
      type: "link",
      tag: "a",
      label: text.slice(0, MAX_LABEL) || el.getAttribute("href") || "(Link)",
    };
  }

  return null;
}

/**
 * ID-Stabilisierung (mutiert das DOM): stellt sicher, dass jedes verknuepfbare
 * Element eine eindeutige, gueltige data-pagesmith-id traegt. Drei-Fall-Logik
 * in Dokument-Reihenfolge:
 * - Bekannt:    gueltige, noch nicht gesehene ps-ID -> unveraendert uebernehmen.
 * - Neu:        keine/ungueltige ID -> frische ps-ID generieren und schreiben.
 * - Dupliziert: gueltige, aber schon vergebene ID -> erstes Vorkommen behaelt
 *               sie, dieses bekommt eine frische (faellt mit "Neu" zusammen).
 * Bewusst OHNE Klassifikation/Injektion – reine ID-Phase, getrennt von Detection.
 */
function stabilizeDoc(doc: Document): void {
  const used = new Set<string>();
  doc.querySelectorAll(CANDIDATE_SELECTOR).forEach((el) => {
    const current = el.getAttribute(PAGESMITH_ID_ATTR);
    if (current && PS_ID_RE.test(current) && !used.has(current)) {
      used.add(current); // Fall "Bekannt"
      return;
    }
    const id = freshUniqueId(used); // Fall "Neu" / "Dupliziert"
    el.setAttribute(PAGESMITH_ID_ATTR, id);
    used.add(id);
  });
}

/**
 * Liest die verknuepfbaren Elemente aus einem bereits stabilisierten DOM. Die ID
 * stammt aus dem data-pagesmith-id-Attribut (von stabilizeDoc garantiert).
 * Mutiert NICHT – reine Detection, getrennt von der ID-Phase.
 * Dedupliziert pro DOM-Element (role=button-Anchor zaehlt einmal als Button).
 */
function collectElements(doc: Document): DetectedElement[] {
  const elements: DetectedElement[] = [];
  doc.querySelectorAll(CANDIDATE_SELECTOR).forEach((el) => {
    const classified = classify(el);
    if (!classified) return;
    const id = el.getAttribute(PAGESMITH_ID_ATTR);
    if (!id) return; // defensiv – stabilizeDoc stellt die ID sicher
    elements.push({ id, ...classified });
  });
  return elements;
}

/**
 * Schreibt die stabilen data-pagesmith-id-Attribute dauerhaft in den Code ("Weg
 * B") und gibt das so angereicherte QUELL-HTML zurueck – OHNE Highlight-Style
 * oder Listener-Script (anders als annotateAndDetect). Idempotent: bereits
 * gesetzte ps-IDs bleiben identisch, nur neue Elemente bekommen neue IDs; das
 * Einfuegen/Entfernen ANDERER Elemente verschiebt eine bestehende ID nicht.
 *
 * Defensive Garantien (eine code-mutierende Funktion darf User-Code NIE
 * vernichten):
 * - Leerer/whitespace Input -> "".
 * - Fehlender DOMParser (SSR) -> html UNVERAENDERT durch.
 * - Unerwarteter Fehler -> html UNVERAENDERT durch.
 */
export function stabilizeIds(html: string): string {
  if (!html || !html.trim()) return "";

  // SSR-Schutz: ohne DOMParser koennen wir nicht stabilisieren – Code unberuehrt
  // zurueckgeben, statt ihn zu verlieren.
  if (typeof DOMParser === "undefined") return html;

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    stabilizeDoc(doc);
    return `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
  } catch {
    return html;
  }
}

/**
 * Quelle der Wahrheit: parst rohes HTML (z.B. aus Claude/v0/Bolt) GENAU EINMAL
 * und liefert sowohl die erkannten Elemente als auch das fuer das Preview-iframe
 * vorbereitete HTML (jedes Element traegt data-pagesmith-id, Listener-Script
 * injiziert). Dadurch ist die ID in der Liste identisch mit der im iframe.
 *
 * Intern zwei getrennte Phasen auf EINEM Parse: erst stabilizeDoc (sichert die
 * IDs), dann collectElements (liest + klassifiziert).
 *
 * Defensive Garantien (Phase-1-Haertung bleibt erhalten):
 * - Wirft NIE. Leerer/whitespace Input -> leere Liste + sicheres (leeres) HTML.
 * - Fehlender DOMParser (SSR) -> leere Liste, rohes HTML unveraendert durch.
 * - Unerwarteter Fehler -> leere Liste + sicheres (leeres) HTML statt Absturz.
 * - Dedupliziert pro DOM-Element (role=button-Anchor zaehlt einmal als Button).
 */
export function annotateAndDetect(html: string): PreparedPreview {
  if (!html || !html.trim()) return { html: "", elements: [] };

  // SSR-Schutz: DOMParser existiert nur im Browser. Client-Komponenten werden
  // beim ersten Render trotzdem serverseitig ausgefuehrt.
  if (typeof DOMParser === "undefined") return { html, elements: [] };

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");

    // Phase 1: IDs sicherstellen (mutiert). Phase 2: Elemente lesen (read-only).
    stabilizeDoc(doc);
    const elements = collectElements(doc);

    // Highlight-Style als LETZTES Element in den <head> -> gewinnt die
    // Spezifitaets-/Reihenfolge-Schlacht gegen evtl. outline-Regeln des Fremdcodes.
    const style = doc.createElement("style");
    style.textContent = HIGHLIGHT_STYLE;
    doc.head.appendChild(style);

    // Listener-Script ans Ende des Body haengen (laeuft nach dem Aufbau des DOM).
    const script = doc.createElement("script");
    script.textContent = LISTENER_SCRIPT;
    doc.body.appendChild(script);

    const serialized = `<!DOCTYPE html>${doc.documentElement.outerHTML}`;
    return { html: serialized, elements };
  } catch {
    // Kaputtes/exotisches HTML soll die Erkennung nie zum Absturz bringen.
    return { html: "", elements: [] };
  }
}

/**
 * Duenner Wrapper fuer reine Erkennung (z.B. Tests). Parst einmal und gibt nur
 * die Elemente zurueck.
 */
export function detectElements(html: string): DetectedElement[] {
  return annotateAndDetect(html).elements;
}
