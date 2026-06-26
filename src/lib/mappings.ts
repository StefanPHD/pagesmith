// Reine Mapping-Logik (kein React). Haelt die Aktions-Zuweisungen, die ein
// Element (per stabiler ps-ID) mit einer Aktion verknuepfen. Unit-testbar, siehe
// mappings.test.ts.

// Konfiguration je Aktionstyp gekapselt, damit weitere Typen (Webhook = POST,
// Tracking) spaeter als eigene Union-Zweige dazukommen, ohne die bestehende
// Redirect-Form anzufassen.
export type RedirectConfig = { url: string; openInNewTab: boolean };

// In-Place-Copywriting (Phase 5): ueberschreibt den reinen Textinhalt eines
// Text-Elements (<h1>..<h6>/<p> ohne Kind-Elemente). config = der neue Text.
export type TextConfig = { content: string };

// type ist der Diskriminator. Erster Aktionstyp war "Redirect bei Klick"
// (URL-Weiterleitung: Stripe Payment Link, PayPal-Link, generische Links); der
// zweite ist "text" (In-Place-Override). Das Modell bewaehrt sich ein zweites Mal:
// ein neuer Aktionstyp = ein neuer Union-Zweig, ohne die Redirect-Form anzufassen.
// Kuenftig analog z.B. | { type: "webhook"; config: ... }.
export type Mapping =
  | { elementId: string; type: "redirect"; config: RedirectConfig }
  | { elementId: string; type: "text"; config: TextConfig };

// Akzeptiert nur http/https. Leere/kaputte URLs werden NICHT persistiert (das
// Formular sperrt "Speichern", solange dies false ist).
export function isValidRedirectUrl(url: string): boolean {
  const trimmed = url.trim();
  if (!trimmed) return false;
  try {
    const parsed = new URL(trimmed);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

// Findet das Mapping eines Elements. SCHLUESSEL: vorerst NUR elementId
// (ein Mapping pro Element) — fuer Redirect-only korrekt. SPAETER, wenn ein
// Tracking-Typ "Redirect + Tracking auf EINEM Element" erlaubt, wird der
// Schluessel auf (elementId, type) umgestellt. Jetzt bewusst NICHT umbauen.
export function findMapping(
  mappings: Mapping[],
  elementId: string
): Mapping | null {
  return mappings.find((m) => m.elementId === elementId) ?? null;
}

// Fuegt ein Mapping hinzu oder ersetzt das bestehende desselben Elements
// (Schluessel elementId, siehe findMapping-Hinweis). Ersetzen behaelt die
// Position -> stabile Listenreihenfolge.
export function upsertMapping(mappings: Mapping[], mapping: Mapping): Mapping[] {
  const idx = mappings.findIndex((m) => m.elementId === mapping.elementId);
  if (idx === -1) return [...mappings, mapping];
  const next = mappings.slice();
  next[idx] = mapping;
  return next;
}

// Entfernt das Mapping eines Elements (Schluessel elementId).
export function removeMapping(
  mappings: Mapping[],
  elementId: string
): Mapping[] {
  return mappings.filter((m) => m.elementId !== elementId);
}

// Weg-C-Netz: verwaiste Mappings finden. Ein Mapping ist verwaist, wenn seine
// elementId NICHT in den aktuell im Code erkannten ps-IDs vorkommt (Element
// geloescht, Seite neu generiert, komplett neue Version eingefuegt) -> es zeigt
// ins Leere. Nimmt Set ODER Array (intern normalisiert).
//
// EHRLICH (bewusst): leere presentElementIds -> ALLE Mappings gelten als
// verwaist. Die Entscheidung, WANN das aussagekraeftig ist (Flash-Guard beim
// Laden: erst pruefen, nachdem der aktuelle Code echt geparst wurde), liegt in
// der KOMPONENTE, nicht hier. Status wird ABGELEITET, nie gespeichert (kein
// orphaned-Flag, keine Migration) — analog zu dirty.
export function findOrphans(
  mappings: Mapping[],
  presentElementIds: Iterable<string>
): Mapping[] {
  const present = new Set(presentElementIds);
  return mappings.filter((m) => !present.has(m.elementId));
}

// Typ-diskriminierter Config-Vergleich. Die EINZIGE Stelle, die in die config
// hineinschaut -> hier muss jeder Aktionstyp seinen eigenen Zweig haben (Redirect:
// url + openInNewTab, Text: content). Verschiedene Typen sind nie gleich.
function configEqual(a: Mapping, b: Mapping): boolean {
  if (a.type !== b.type) return false;
  if (a.type === "redirect" && b.type === "redirect") {
    return (
      a.config.url === b.config.url &&
      a.config.openInNewTab === b.config.openInNewTab
    );
  }
  if (a.type === "text" && b.type === "text") {
    return a.config.content === b.config.content;
  }
  return false;
}

// Reihenfolge-UNABHAENGIGER Mengen-Vergleich, pro elementId geschluesselt.
// Umsortieren ist NICHT dirty; eine geaenderte Config (URL/Option/Text),
// Hinzufuegen oder Entfernen IST dirty. Hier haengt der Schutz gegen stillen
// Verlust beim Projektwechsel dran -> darf nie positionsabhaengig sein.
export function mappingsEqual(a: Mapping[], b: Mapping[]): boolean {
  if (a.length !== b.length) return false;
  const index = new Map(a.map((m) => [m.elementId, m]));
  for (const m of b) {
    const other = index.get(m.elementId);
    if (!other) return false;
    if (!configEqual(other, m)) return false;
  }
  return true;
}
