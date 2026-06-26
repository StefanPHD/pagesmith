// Reine Erkennungs-Logik. Bewusst ohne React-Seiteneffekte ausserhalb des
// Parsers, damit sie unit-testbar bleibt (siehe detect.test.ts).

export type ElementType = "button" | "form" | "link" | "text";

export type DetectedElement = {
  // Dauerhafte, code-residente ID im Format "ps-" + 6 zufaellige Zeichen
  // (z.B. "ps-a1b2c3"). Lebt als data-pagesmith-id-Attribut im Code und bleibt
  // ueber Edits stabil (siehe stabilizeIds). NICHT positionsbasiert.
  id: string;
  type: ElementType;
  tag: string;
  label: string;
  // Nur fuer type "text": der VOLLE (untruncierte) Textinhalt, mit dem das
  // Bearbeiten-Feld vorbefuellt wird. label bleibt fuer die Liste gekuerzt.
  text?: string;
};

export type PreparedPreview = {
  // Annotiertes + mit Listener-Script injiziertes HTML fuer das Preview-iframe.
  html: string;
  // Die erkannten Elemente – ID-gleich mit den Attributen im html.
  elements: DetectedElement[];
};

export const MAX_LABEL = 60;

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
// INTERAKTIV: Buttons, Forms, Links (Phase 1/2).
const CANDIDATE_SELECTOR = `${BUTTON_SELECTOR}, form, a[href]`;

// TEXT-Kandidaten (Phase 5, In-Place-Copywriting): Ueberschriften + Absaetze.
const TEXT_SELECTOR = "h1, h2, h3, h4, h5, h6, p";

// ALLE verknuepfbaren Elemente = interaktiv ODER Text. EINE Traversierung in
// Dokument-Reihenfolge speist sowohl stabilizeDoc als auch collectElements ->
// identische Reihenfolge, auf die sich der Index-Anker (anchorMappingTarget)
// verlaesst. Welche Tags tatsaechlich Kandidaten sind, entscheidet classify
// (z.B. ein <p> mit Kind-Elementen ist KEIN Textkandidat).
const LINKABLE_SELECTOR = `${CANDIDATE_SELECTOR}, ${TEXT_SELECTOR}`;

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
  // Text-Override LIVE patchen (Phase 5): der Parent setzt den Textinhalt eines
  // Elements im STEHENDEN Dokument, ohne iframe-Reload. Eigener Listener -> der
  // SET_SELECTED_ID-Handler bleibt unberuehrt. textContent ist eine sichere Senke
  // (parst NIE HTML) -> "</script>"-Inhalt landet als literaler Text.
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.type !== "PS_SET_TEXT") return;
    var node = document.querySelector('[${PAGESMITH_ID_ATTR}="' + d.elementId + '"]');
    if (node) node.textContent = d.content == null ? "" : String(d.content);
  });
  // Scroll-Erhalt (reine Anzeige, ZUSAETZLICH zur Selektions-Bruecke): die
  // Scroll-Position lebt IM sandboxed Dokument (kein allow-same-origin -> der
  // Parent kann sie nicht von aussen lesen). Wir melden sie gedrosselt per
  // postMessage. Leading-Edge mit Trailing-Read (~100ms): ein gesetzter Timer
  // schluckt weitere Events, beim Feuern wird die AKTUELLE Position gelesen -> auch
  // ein "Uebernehmen" mitten in der Bewegung hat eine frische Position gemeldet.
  var psScrollTimer = null;
  window.addEventListener(
    "scroll",
    function () {
      if (psScrollTimer) return;
      psScrollTimer = setTimeout(function () {
        psScrollTimer = null;
        window.parent.postMessage(
          { type: "PS_SCROLL", y: window.scrollY || 0 },
          "*"
        );
      }, 100);
    },
    { passive: true }
  );
  // Scroll-Restore (eigener Listener; SET_SELECTED_ID-Handler bleibt unangetastet):
  // nach jedem Reload setzt der Parent die gemerkte Position. INSTANT (kein smooth)
  // und LAYOUT-STABIL nachgesetzt, weil sich das Layout nach dem READY noch streckt
  // (Bilder/Fonts laden nach -> einmaliges Restore kaeme zu frueh und zuckte).
  // EHRLICHE GRENZE: bei hoehenlosem Lazy-Load OBERHALB der Position verschiebt sich
  // der Inhalt physisch -> der letzte Pixel ist nicht garantiert (Ziel: ruhig statt
  // nervoes, KEIN Eingriff ins fremde Layout).
  var psTargetY = null; // null = noch nichts wiederherzustellen
  var psRestoreTimers = [];
  var psOnLoad = null;
  function psJump() {
    if (psTargetY == null) return;
    var docEl = document.documentElement;
    // scroll-behavior NUR fuer diesen Jump auf auto zwingen (ueberstimmt smooth-CSS
    // der Seite) und im naechsten Frame, nach dem committeten Jump, zuruecksetzen.
    // So ist jeder Nachfasser instant, ohne das native Scroll-Gefuehl der Vorschau
    // zwischen/nach den Jumps zu verfaelschen (die Vorschau bleibt getreu).
    var prev = docEl.style.scrollBehavior;
    docEl.style.scrollBehavior = "auto";
    window.scrollTo(0, psTargetY);
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(function () {
        docEl.style.scrollBehavior = prev;
      });
    } else {
      docEl.style.scrollBehavior = prev;
    }
  }
  window.addEventListener("message", function (e) {
    var d = e.data;
    if (!d || d.type !== "PS_RESTORE_SCROLL") return;
    psTargetY = d.y || 0;
    // Alte Nachfasser verwerfen -> ein frisches Restore ersetzt sie (kein Stapeln).
    for (var i = 0; i < psRestoreTimers.length; i++) {
      clearTimeout(psRestoreTimers[i]);
    }
    psRestoreTimers = [];
    // a) sofort.
    psJump();
    // c) rAF (1-2x) + kurze Sicherheits-Nachfasser (~150/400ms) fuer Fonts/Spaetlayout.
    if (typeof requestAnimationFrame === "function") {
      requestAnimationFrame(function () {
        psJump();
        requestAnimationFrame(psJump);
      });
    }
    psRestoreTimers.push(setTimeout(psJump, 150));
    psRestoreTimers.push(setTimeout(psJump, 400));
    // b) bei window 'load' (Bilder fertig -> Layout final). Nur EIN Handler; er
    // liest psTargetY, das jedes Restore aktualisiert. Danach meldet er dem Parent
    // PS_SETTLED = "visuell zur Ruhe gekommen" (Bilder fertig + Scroll committet)
    // -> der Parent blendet sein Lade-Overlay aus.
    if (!psOnLoad) {
      psOnLoad = function () {
        psJump();
        window.parent.postMessage({ type: "PS_SETTLED" }, "*");
      };
      window.addEventListener("load", psOnLoad);
    }
  });
  // READY-Handshake gegen Race Conditions: nach jedem srcDoc-Reload meldet sich
  // das frische iframe EINMAL beim Parent, der dann die aktuelle Auswahl
  // (und die gemerkte Scroll-Position) zuruecksendet. Kein Timing-Raten via
  // setTimeout. Die Listener oben sind hier bereits synchron registriert.
  window.parent.postMessage({ type: "IFRAME_READY" }, "*");
})();`;

/**
 * Reiner Textkandidat? Nur Text + harmlose Inline-Umbrueche (<br>) sind erlaubt;
 * sobald ein ECHTES Kind-Element (<strong>, <a>, <span> …) vorkommt, NICHT
 * anbieten — ein textContent-Ueberschreiben wuerde dieses Kind-Markup zerstoeren
 * (Rich-Text ist bewusst ein spaeteres Slice). el.children sind ausschliesslich
 * Element-Kinder (Textknoten zaehlen nicht), daher prueft die Schleife genau die
 * Markup-Kinder.
 */
function isPureText(el: Element): boolean {
  for (const child of Array.from(el.children)) {
    if (child.tagName !== "BR") return false;
  }
  return true;
}

/**
 * Klassifiziert ein Kandidaten-Element mit Prioritaet button > form > link > text.
 * Ein <a href role="button"> wird so genau einmal als Button gefuehrt – gleiches
 * Dedup-Ergebnis wie zuvor, hier inhaerent durch die Single-Pass-Traversierung.
 *
 * Die REIHENFOLGE erzwingt die Kategorientrennung (Phase 5): ein bereits als
 * Button/Form/Link erkanntes Element kehrt frueh zurueck und erreicht den
 * Text-Zweig nie -> ein <a>Nur Text</a> bleibt Link, ein <h1 role="button"> bleibt
 * Button. Text ist eine EIGENE Kategorie, kein Overlap.
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

  // Textkandidat (Phase 5): <h1>..<h6>/<p> OHNE Kind-Elemente. Greift erst hier,
  // nach den interaktiven Zweigen -> Kategorientrennung (siehe Doc-Kommentar).
  if (el.matches(TEXT_SELECTOR) && isPureText(el)) {
    const full = (el.textContent || "").trim();
    return {
      type: "text",
      tag: el.tagName.toLowerCase(),
      label: full.slice(0, MAX_LABEL) || "(leerer Text)",
      // Voller Inhalt fuers Bearbeiten-Feld (label ist nur die gekuerzte Anzeige).
      text: full,
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
  doc.querySelectorAll(LINKABLE_SELECTOR).forEach((el) => {
    // Nur ECHTE Kandidaten ankern. So bekommt ein <p> mit Kind-Elementen (kein
    // Textkandidat) keine ps-ID -> kein unnoetiger Code-Ballast. Fuer interaktive
    // Elemente unveraendert (sie sind immer klassifizierbar). Gleiche Guard +
    // gleiche Traversierung wie collectElements -> identische Reihenfolge.
    if (!classify(el)) return;
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
  doc.querySelectorAll(LINKABLE_SELECTOR).forEach((el) => {
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

// Kategorie-Filter fuer die Elementliste (Scheibe 1b). Reiner View-Helfer, keine
// Detektion: er waehlt nur aus, WELCHE bereits erkannten Elemente angezeigt werden.
export type ElementFilter = "all" | "interactive" | "text";

/**
 * Filtert die erkannten Elemente nach Kategorie. "interactive" = button/link/form
 * (alles ausser Text), "text" = nur Textkandidaten, "all" = unveraendert. REIN:
 * gibt eine neue Teilmenge zurueck, mutiert nichts, beruehrt keine Auswahl.
 */
export function filterElements(
  elements: DetectedElement[],
  filter: ElementFilter
): DetectedElement[] {
  if (filter === "all") return elements;
  if (filter === "text") return elements.filter((e) => e.type === "text");
  return elements.filter((e) => e.type !== "text"); // interactive
}

export type AnchorResult = {
  // (Ggf.) stabilisierter Code – identisch mit dem Input, falls schon stabil.
  code: string;
  // Die dauerhaft im Code stehende ps-ID des Ziel-Elements.
  canonicalId: string;
};

/**
 * ps-ID-ANKER fuer ein Mapping-Ziel: stellt sicher, dass die ps-ID des
 * Ziel-Elements DAUERHAFT im Code steht, und gibt den (ggf. stabilisierten) Code
 * + die kanonische ps-ID zurueck. Gemeinsame, reine Basis fuer Aktion-Zuweisen
 * (handleAssignMapping) UND Re-Link (handleRelinkOrphan) — keine Duplikation,
 * unit-testbar (kein React/State).
 *
 * Knackpunkt fuer ein fabrikneues Element (noch keine ps-ID im Code): der separate
 * stabilizeIds-Parse erzeugt eine ANDERE Zufalls-ID als der Parse, aus dem die
 * uebergebene elements-Liste stammt. Deshalb richten wir per INDEX auf der
 * aktuellen elements-Liste aus (idempotent, gleiche Kandidaten-Reihenfolge),
 * statt der uebergebenen ID blind zu vertrauen — sonst landet die Config am
 * FALSCHEN Element.
 */
export function anchorMappingTarget(
  code: string,
  elements: DetectedElement[],
  targetElementId: string
): AnchorResult {
  const stabilized = stabilizeIds(code);
  if (stabilized === code) return { code, canonicalId: targetElementId };
  const stableEls = annotateAndDetect(stabilized).elements;
  const idx = elements.findIndex((e) => e.id === targetElementId);
  const canonicalId =
    idx >= 0 && stableEls[idx] ? stableEls[idx].id : targetElementId;
  return { code: stabilized, canonicalId };
}
