// Reine Mapping-Logik (kein React). Haelt die Aktions-Zuweisungen, die ein
// Element (per stabiler ps-ID) mit einer Aktion verknuepfen. Unit-testbar, siehe
// mappings.test.ts.

// Konfiguration je Aktionstyp gekapselt, damit weitere Typen (Webhook = POST,
// Tracking) spaeter als eigene Union-Zweige dazukommen, ohne die bestehende
// Redirect-Form anzufassen.
export type RedirectConfig = { url: string; openInNewTab: boolean };

// Erster und vorerst einziger Aktionstyp: "Redirect bei Klick" (URL-Weiter-
// leitung). Deckt Stripe Payment Link, PayPal-Link und generische Links ab.
// type ist der Diskriminator -> kuenftig z.B. | { type: "webhook"; config: ... }.
export type Mapping = {
  elementId: string;
  type: "redirect";
  config: RedirectConfig;
};

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

// Reihenfolge-UNABHAENGIGER Mengen-Vergleich, pro elementId geschluesselt.
// Umsortieren ist NICHT dirty; eine geaenderte URL/Option, Hinzufuegen oder
// Entfernen IST dirty. Hier haengt der Schutz gegen stillen Verlust beim
// Projektwechsel dran -> darf nie positionsabhaengig sein.
export function mappingsEqual(a: Mapping[], b: Mapping[]): boolean {
  if (a.length !== b.length) return false;
  const index = new Map(a.map((m) => [m.elementId, m]));
  for (const m of b) {
    const other = index.get(m.elementId);
    if (!other) return false;
    if (
      other.type !== m.type ||
      other.config.url !== m.config.url ||
      other.config.openInNewTab !== m.config.openInNewTab
    ) {
      return false;
    }
  }
  return true;
}
