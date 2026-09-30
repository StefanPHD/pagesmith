// Reine Mapping-Logik (kein React). Haelt die Aktions-Zuweisungen, die ein
// Element (per stabiler ps-ID) mit einer Aktion verknuepfen. Unit-testbar, siehe
// mappings.test.ts.

import { MAX_LABEL, type DetectedElement } from "./detect";

// Konfiguration je Aktionstyp gekapselt, damit weitere Typen (Webhook = POST,
// Tracking) spaeter als eigene Union-Zweige dazukommen, ohne die bestehende
// Redirect-Form anzufassen.
export type RedirectConfig = { url: string; openInNewTab: boolean };

// In-Place-Copywriting (Phase 5): ueberschreibt den reinen Textinhalt eines
// Text-Elements (<h1>..<h6>/<p> ohne Kind-Elemente). config = der neue Text.
export type TextConfig = { content: string };

// Tracking (Phase 6 Scheibe 1b, ECHT): ein Meta-Pixel-Event auf einem INTERAKTIVEN
// Element. event = Standard-Event (Purchase/Lead/…) ODER ein freier Name bei
// isCustom (fbq trackCustom). value/currency optional, nur bei wert-tragenden
// Events bzw. Custom-Events befuellt (das Panel entscheidet, was gesetzt wird). Die
// projektweite Pixel-ID liegt NICHT hier, sondern in den Projekt-Einstellungen
// (settings.pixels.meta.pixelId) — ein Event ist plattform-AGNOSTISCHER Intent,
// deshalb KEIN platform-Feld (Owner-Direktive: Fan-out vs. Per-Plattform spaeter).
export type TrackConfig = {
  event: string;
  isCustom?: boolean;
  value?: number;
  currency?: string;
  // DIE EREIGNISZEILE DES BETREIBERS (Phase 11.6, Scheibe 11.6a; Entscheidung
  // P11.6-4). Optional. Was hier steht, wird beim Klick auf GENAU DIESES Element
  // ausgefuehrt — gekapselt, damit ein Fehler darin weder den Redirect noch das
  // Meta-Fire derselben Aktion mitreisst.
  //
  // WARUM AN DER AKTION UND NICHT AM PROJEKT: Click&Connect soll ohne
  // Programmierkenntnis bedienbar bleiben. Der Betreiber kopiert die Zeile aus der
  // Dokumentation seines Netzwerks an den Knopf, der sie ausloesen soll.
  // COPY-PASTE BEI MEHREREN KNOEPFEN IST AUSDRUECKLICH IN KAUF GENOMMEN (P11.6-4);
  // wer das projektweit "aufraeumt", nimmt dem Betreiber die Faehigkeit, zwei Knoepfe
  // verschieden zu behandeln.
  //
  // SIE BEKOMMT KEINE PARAMETER (P11.6-6, Teil (e)) — insbesondere NICHT die geteilte
  // Ereignis-Kennung. Die entsteht in __psMetaFire GENAU EINMAL und traegt Metas
  // Deduplizierung; ein vierter Verbraucher, dem niemand ihre Bedeutung erklaert hat,
  // braeche sie lautlos. Ein Parameter waere ausserdem ein KONTRAKT im ausgelieferten
  // Text — nachlegen geht, herunternehmen nicht.
  code?: string;
};

// FORMULAR-ZIEL (Phase 13, Scheibe 13-1; Setzung P13-25 der Phase 13). Sitzt an einem
// <form>: beim Abschicken gehen die Felder im Browser an endpoint, bei "erreicht" folgt
// die Navigation auf thanksUrl. BEIDE PFLICHT (Entscheidung P13-16) — die Pruefung der
// Werte steht in formTargetProblem (lib/form-target.ts).
// DIE FELDER HEISSEN BEWUSST NICHT "url": Die Anzeige verwaister Mappings liest
// m.config.url; ein Feld dieses Namens liesse ein Formular-Ziel dort still als
// "Weiterleitung" erscheinen. So meldet es der Compiler.
// fieldNames (Scheibe 13-1c; Entscheidung P13-41, Setzungen P13-47 bis P13-49): die am Ziel
// BESTAETIGTE Liste der Feldnamen, sortiert, nur Namen, nie Werte. OPTIONAL, weil Ziele aus
// 13-1 sie nicht tragen — eine fehlende Liste heisst NICHT "passt" (Setzung P13-48), das
// urteilt formTargetNamesProblem (lib/form-target.ts). Sie geht NICHT in den ausgelieferten
// Text (Setzung P13-58, generateFunctional).
// dataSaver (Phase 13.6, Scheibe 13.6-4; Setzungen P13.6-61 und P13.6-66, Q2, der Phase 13.6):
// der DATENSPARMODUS. FEHLT er, gilt der Relay-Standard, sofern die Adresse auf der Host-Liste
// steht (Owner-Entscheidung P13.6-54); true heisst browser-direkt. Es gibt KEIN false: Beim
// Ausschalten wird der Schluessel entfernt — so kann "fehlt" gegen "false" nie faelschlich
// dirty sein. Jeden anderen Wert weist formTargetProblem als "shape" ab. Er geht NICHT in den
// ausgelieferten Text (generateFunctional entfernt ihn wie fieldNames).
export type FormTargetConfig = {
  endpoint: string;
  thanksUrl: string;
  fieldNames?: string[];
  dataSaver?: true;
};

// type ist der Diskriminator. Erster Aktionstyp war "Redirect bei Klick"
// (URL-Weiterleitung: Stripe Payment Link, PayPal-Link, generische Links); der
// zweite ist "text" (In-Place-Override), der dritte "track" (Tracking-Event). Das
// Modell bewaehrt sich erneut: ein neuer Aktionstyp = ein neuer Union-Zweig, ohne
// die bestehenden Formen anzufassen. Kuenftig analog z.B. | { type: "webhook"; … }.
// Schluessel ist (elementId, type) (Scheibe 0) -> ein interaktives Element kann
// redirect UND track tragen.
export type Mapping =
  | { elementId: string; type: "redirect"; config: RedirectConfig }
  | { elementId: string; type: "text"; config: TextConfig }
  | { elementId: string; type: "track"; config: TrackConfig }
  | { elementId: string; type: "formTarget"; config: FormTargetConfig };

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

// Findet das Mapping eines Elements. SCHLUESSEL: (elementId, type) — ein Mapping
// pro Element UND Typ (Phase 6 Scheibe 0). Erlaubt "Redirect UND Tracking auf
// EINEM Element" als getrennte Eintraege. Generisch typisiert: der type-Parameter
// engt die Rueckgabe auf die passende Union-Variante ein (z.B. findMapping(…,
// "text") liefert ein { type:"text" }-Mapping, sodass .config.content ohne
// Extra-Narrowing typrein ist).
//
// NICHT fuer die boolesche Frage "hat das Element IRGENDEINE Aktion?" verwenden —
// dafuer some(m => m.elementId === id), da das hier einen konkreten Typ verlangt.
export function findMapping<T extends Mapping["type"]>(
  mappings: Mapping[],
  elementId: string,
  type: T
): Extract<Mapping, { type: T }> | null {
  return (
    (mappings.find((m) => m.elementId === elementId && m.type === type) as
      | Extract<Mapping, { type: T }>
      | undefined) ?? null
  );
}

// Fuegt ein Mapping hinzu oder ersetzt das bestehende desselben (elementId, type)
// (Compound-Key, Scheibe 0). Ein anderer Typ auf derselben id ist ein EIGENER
// Eintrag (append), kein Replace. Ersetzen behaelt die Position -> stabile
// Listenreihenfolge.
export function upsertMapping(mappings: Mapping[], mapping: Mapping): Mapping[] {
  const idx = mappings.findIndex(
    (m) => m.elementId === mapping.elementId && m.type === mapping.type
  );
  if (idx === -1) return [...mappings, mapping];
  const next = mappings.slice();
  next[idx] = mapping;
  return next;
}

// Entfernt genau den (elementId, type)-Eintrag; andere Typen auf derselben id
// bleiben unangetastet (Compound-Key, Scheibe 0).
export function removeMapping(
  mappings: Mapping[],
  elementId: string,
  type: Mapping["type"]
): Mapping[] {
  return mappings.filter(
    (m) => !(m.elementId === elementId && m.type === type)
  );
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
  if (a.type === "track" && b.type === "track") {
    // ALLE Felder (Scheibe 1b): sonst gilt eine reine value-/currency-/isCustom-
    // Aenderung faelschlich als nicht-dirty -> stiller Verlust beim Speichern.
    return (
      a.config.event === b.config.event &&
      a.config.isCustom === b.config.isCustom &&
      a.config.value === b.config.value &&
      a.config.currency === b.config.currency &&
      // DIE EREIGNISZEILE (Scheibe 11.6a): DIESELBE Fehlerklasse wie die vier Terme
      // darueber, eine Ebene tiefer. Ohne diesen Term galte eine reine code-Aenderung
      // faelschlich als nicht-dirty -> stiller Verlust beim Speichern. Diese Funktion
      // ist die ZWEITE Allowlist dieser Scheibe (die erste ist settingsEqual).
      a.config.code === b.config.code
    );
  }
  if (a.type === "formTarget" && b.type === "formTarget") {
    // FORMULAR-ZIEL (Scheibe 13-1): OHNE diesen Zweig fiele der Vergleich auf das
    // return false darunter — das Projekt waere DAUERHAFT dirty, und kein Compiler
    // meldet das (Vermerk P13-33, G1).
    // Scheibe 13-1c: DIE LISTE GEHOERT DAZU — sonst waere ein reines Bestaetigen neuer
    // Feldnamen nicht dirty und ginge beim Speichern still verloren.
    return (
      a.config.endpoint === b.config.endpoint &&
      a.config.thanksUrl === b.config.thanksUrl &&
      sameOptionalList(a.config.fieldNames, b.config.fieldNames) &&
      // Scheibe 13.6-4: DER DATENSPARMODUS GEHOERT DAZU — sonst waere ein reiner Wechsel des
      // Schalters nicht dirty und ginge beim Speichern still verloren (Waechter F12-DS).
      a.config.dataSaver === b.config.dataSaver
    );
  }
  return false;
}

// Zwei optionale Listen, Element fuer Element. Beide fehlend = gleich; eine fehlend = nicht.
function sameOptionalList(a?: readonly string[], b?: readonly string[]): boolean {
  if (a === undefined || b === undefined) return a === b;
  return a.length === b.length && a.every((x, i) => x === b[i]);
}

// Reihenfolge-UNABHAENGIGER Mengen-Vergleich, pro (elementId, type) geschluesselt
// (Compound-Key, Scheibe 0). Umsortieren ist NICHT dirty; eine geaenderte Config
// (URL/Option/Text), Hinzufuegen oder Entfernen IST dirty — ebenso ein ZWEITES
// Mapping anderen Typs auf derselben id (eigener Key). Hier haengt der Schutz
// gegen stillen Verlust beim Projektwechsel dran -> darf nie positionsabhaengig
// sein. Leerzeichen-Separator ist kollisionsfrei, da ps-IDs nur [a-z0-9-] sind
// (kein Leerzeichen) -> "<id> <type>" ist eindeutig.
export function mappingsEqual(a: Mapping[], b: Mapping[]): boolean {
  if (a.length !== b.length) return false;
  const key = (m: Mapping) => `${m.elementId} ${m.type}`;
  const index = new Map(a.map((m) => [key(m), m]));
  for (const m of b) {
    const other = index.get(key(m));
    if (!other) return false;
    if (!configEqual(other, m)) return false;
  }
  return true;
}

// GETEILTER Anzeige-Deriver (Scheibe 1b): der Text, der fuer ein Element in der
// Liste UND im ActionPanel-Header steht. EINE Quelle -> kein Drift zwischen den
// Anzeigeorten. Existiert ein Text-Override (Draft ODER gespeichert, mappings ist
// die laufende Wahrheit), zeigt er dessen content; sonst den Detektions-Text.
//
// Reine Anzeige-Ableitung: element.text (Detektions-Original) bleibt unangetastet
// und dient als Fallback sowie zur Vorbefuellung des Edit-Felds, falls das Mapping
// entfernt wird. Truncation auf MAX_LABEL (geteilt mit der Detektion) und der
// label-Fallback erhalten das bisherige Verhalten (z.B. "(leerer Text)" bei
// leerem Inhalt; fuer nicht-Text-Elemente ohne .text bleibt es das Label).
export function displayTextFor(
  element: DetectedElement,
  mappings: Mapping[]
): string {
  const m = findMapping(mappings, element.id, "text");
  const full = m ? m.config.content : element.text;
  return full?.slice(0, MAX_LABEL) || element.label;
}
