// Reine Erkennungs-Logik (Phase 1). Bewusst ohne React/DOM-Seiteneffekte
// ausserhalb des Parsers, damit sie unit-testbar bleibt (siehe detect.test.ts).

export type ElementType = "button" | "form" | "link";

export type DetectedElement = {
  type: ElementType;
  tag: string;
  label: string;
};

const MAX_LABEL = 60;

/**
 * Scannt rohes HTML (z.B. aus Claude/v0/Bolt) und findet die Elemente, die
 * Pagesmith spaeter "verdrahten" kann: Buttons, Formulare, Links.
 *
 * Defensive Garantien (Phase-1-Haertung):
 * - Wirft NIE. Bei leerem/kaputtem HTML, fehlendem DOMParser (SSR) oder einem
 *   unerwarteten Fehler kommt eine leere Liste zurueck statt eines Absturzes.
 * - Dedupliziert pro DOM-Element: ein <a href role="button"> zaehlt genau
 *   einmal (als Button), nicht zusaetzlich als Link.
 */
export function detectElements(html: string): DetectedElement[] {
  if (!html || !html.trim()) return [];

  // SSR-Schutz: DOMParser existiert nur im Browser. Client-Komponenten werden
  // beim ersten Render trotzdem serverseitig ausgefuehrt – ohne diesen Guard
  // wuerde ein nicht-leerer Initial-State den Server-Render zum Absturz bringen.
  if (typeof DOMParser === "undefined") return [];

  try {
    const doc = new DOMParser().parseFromString(html, "text/html");
    const found: DetectedElement[] = [];

    // Ein Set verhindert Doppelzaehlung pro DOM-Element: ist ein Element einer
    // Kategorie zugeordnet, wird es nicht erneut betrachtet.
    const seen = new Set<Element>();

    // 1) Buttons – inkl. role="button" und allen klickbaren Input-Typen.
    //    input[type=submit|button|image] decken die HTML-Button-Varianten ab.
    doc
      .querySelectorAll(
        'button, [role="button"], input[type="submit"], input[type="button"], input[type="image"]'
      )
      .forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const input = el as HTMLInputElement;
        const text = (
          el.textContent ||
          input.value ||
          el.getAttribute("alt") || // input[type="image"] traegt seinen Text im alt
          ""
        ).trim();
        found.push({
          type: "button",
          tag: el.tagName.toLowerCase(),
          label: text.slice(0, MAX_LABEL) || "(ohne Text)",
        });
      });

    // 2) Formulare.
    doc.querySelectorAll("form").forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      found.push({
        type: "form",
        tag: "form",
        label: el.getAttribute("action") || "(keine action gesetzt)",
      });
    });

    // 3) Links – oft CTAs, die wie Buttons aussehen.
    //
    //    NOTE (Link-Rauschen, fuer spaeter – hier bewusst NICHT umgesetzt):
    //    Eine echte Landingpage hat viele Nav-/Footer-Links, die keine CTAs
    //    sind. Spaeter koennten wir echte CTAs heuristisch herausfiltern, z.B.:
    //      - Links in <nav>/<footer> ignorieren via el.closest("nav, footer")
    //      - Button-aehnliches Styling gewichten (.btn/.button-Klassen, role)
    //      - Position above-the-fold / im Hero hoeher gewichten
    //    In DIESEM Schritt zeigen wir weiterhin ALLE Links unveraendert an.
    doc.querySelectorAll("a[href]").forEach((el) => {
      if (seen.has(el)) return;
      seen.add(el);
      const text = (el.textContent || "").trim();
      found.push({
        type: "link",
        tag: "a",
        label: text.slice(0, MAX_LABEL) || el.getAttribute("href") || "(Link)",
      });
    });

    return found;
  } catch {
    // Kaputtes/exotisches HTML soll die Erkennung nie zum Absturz bringen.
    return [];
  }
}
