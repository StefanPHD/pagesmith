// A/B-Varianten-Zuweisung (Phase 9 Scheibe 9b-1). REINE Funktionen: kein DOM, kein
// Server-Import, keine env — genau wie host.ts. Der Serve-Pfad (app-serve/route.ts)
// komponiert sie; getestet werden sie hier isoliert.
//
// Der Split liegt KOMPLETT in der Serve-Route (Grundsatzentscheidung, korrigiert
// 2026-07-27): die Route hat das Cookie im Request, laedt das Projekt ohnehin und
// besitzt ihr Response-Objekt. Die Middleware bleibt unberuehrt.

export type Variant = "a" | "b";

/**
 * Minimal-Form des published_content-Blobs, soweit der Split ihn braucht. Bewusst
 * strukturell (kein Import aus resolve.ts): dieselbe Form liest der Serve-Pfad UND
 * die Aktivierungs-Action.
 */
export type PublishedLike =
  | { html?: string; variantB?: { html?: string } | null }
  | null
  | undefined;

/**
 * EINE Nicht-Leer-Regel fuer JEDES ausgelieferte HTML — A wie B. Leer oder nur
 * Whitespace zaehlt als NICHT vorhanden: eine leere Seite auf der Live-URL unter
 * Ad-Traffic ist schlimmer als gar keine Auslieferung.
 */
export function nonEmptyHtml(value: unknown): string | null {
  return typeof value === "string" && value.trim() ? value : null;
}

/**
 * DAS GETEILTE AUSLIEFERBARKEITS-PRAEDIKAT (Scheibe 9b-1). Liefert das
 * auslieferbare B-HTML oder null.
 *
 * WARUM GETEILT — der Fehler, den es verhindert: pruefte die AKTIVIERUNG nur die
 * EXISTENZ des variantB-Keys, waehrend die AUSLIEFERUNG auf NICHT-LEER prueft,
 * passte genau ein Zustand dazwischen: html_b = "" ist erlaubt (der DB-CHECK
 * verlangt nur "is not null"), publiziert einen variantB-Key mit leerem html, die
 * Aktivierung ginge DURCH — und die Route degradierte still auf A. Das UI saegte
 * "Test laeuft", die Live-URL liefert ALLEN Besuchern A, und niemand merkt es.
 * Exakt die "gruen aber wirkungslos"-Klasse.
 *
 * Deshalb entscheidet DIESELBE Funktion auf beiden Seiten: resolve.ts (darf ich
 * ausliefern?) und setAbTestActive (darf ich einschalten?). Sie liegt hier in der
 * REINEN Datei, weil resolve.ts server-only ist und die Action sie sonst nicht
 * importieren koennte — die Richtung ist server-only -> pure, nie umgekehrt.
 */
export function deliverableVariantB(published: PublishedLike): string | null {
  return nonEmptyHtml(published?.variantB?.html);
}

/**
 * DER SATZ ZUM NEGATIV-ERGEBNIS von deliverableVariantB — EINE Quelle fuer den
 * SERVER-RIEGEL (setAbTestActive verweigert die Aktivierung) UND den
 * CLIENT-HINWEIS (die Varianten-Sektion warnt VORHER). Beide sagen damit
 * denselben Satz; ohne geteilte Konstante drifteten sie auseinander und der
 * Nutzer bekaeme fuer dieselbe Ursache zwei verschiedene Erklaerungen.
 *
 * WARUM HIER UND NICHT AM RIEGEL (das ist kein Stilfrage): actions.ts traegt
 * "use server" und darf AUSSCHLIESSLICH async-Funktionen als Werte exportieren —
 * eine exportierte Konstante dort loest beim Serverstart einen ReferenceError aus
 * (real aufgetretener 7c-2c-Bug, s. docs/immer-beachten.md,
 * "USE SERVER"-DATEIEN). variant.ts ist die
 * REINE Datei (KEINE Imports, kein server-only), die schon das Praedikat haelt:
 * Praedikat und sein menschenlesbares Negativ-Ergebnis liegen am selben Ort und
 * sind von Server UND Client importierbar.
 */
export const VARIANT_B_NOT_PUBLISHED_MESSAGE =
  "Variante B ist noch nicht veröffentlicht — erst veröffentlichen, dann den Test starten.";

/**
 * DER LEER-RIEGEL FUER DEN PUBLISH-PFAD (Scheibe Leere-Variante-Riegel).
 * Liefert die Variante, die LEER waere und deshalb nicht publiziert werden darf
 * ("a" | "b"), oder null, wenn alles Auslieferbare Inhalt traegt.
 *
 * DAS PROBLEM, DAS ES LOEST: publishProject injiziert NACH der Pruefung den
 * PageView-Emitter. injectPageViewEmitter("", key) liefert einen NICHT-LEEREN
 * String (~716 Zeichen reines Script) -> published_content.html ist emitter-only,
 * nonEmptyHtml haelt es fuer auslieferbar, und der Besucher bekommt eine VISUELL
 * LEERE Seite, ohne Fehler, ohne 404. Der Riegel muss deshalb VOR der Injektion
 * greifen, auf dem EINGEHENDEN functionalHtml.
 *
 * variantB === null heisst AUSDRUECKLICH "wird nicht publiziert, also nicht
 * pruefen" — es ist KEIN "unbekannt". Das ist die Umsetzung von Auflage (4):
 * geschrieben wird B nur bei hasVariantB && variantB, und der Riegel SPIEGELT
 * genau diese Bedingung. Wuerde er B unabhaengig davon pruefen, lehnte er einen
 * LEGITIMEN Publish ab — ein Client, der nach dem Entfernen der Variante noch ein
 * variantB im Zustand haelt (alter Tab), waere blockiert, obwohl sein B gar nicht
 * geschrieben wuerde. Deshalb ein EXPLIZITES null statt eines optionalen
 * Parameters: undefined truege den Doppelsinn "nicht mitgegeben" vs. "gibt es
 * nicht".
 *
 * "a" HAT VORRANG, wenn beide leer sind — deterministisch und per Test fixiert.
 * A ist die Variante, die JEDER Besucher bekommt (ohne aktiven Test liefert die
 * Route immer A), also ist sie der zuerst zu nennende Fehler.
 *
 * FAIL-CLOSED (Invariante vi): geprueft wird ausschliesslich ueber nonEmptyHtml —
 * alles, was dort nicht als nicht-leer durchgeht (Nicht-String, "", Whitespace),
 * gilt als leer. KEIN handgeschriebenes Duplikat der Regel: dieselbe Funktion
 * entscheidet an allen vier Stellen (Serve A, Serve B, Aktivierungs-Riegel,
 * Publish) — Invariante (v), kein drittes Urteil.
 *
 * EHRLICHE GRENZE (bewusst dokumentiert, damit sie nicht spaeter als Luecke
 * "entdeckt" wird): Das ist STRING-Leere, NICHT visuelle Leere. "<div></div>",
 * ein reiner Kommentar, Inhalt mit display:none oder Inhalt, der erst durch JS
 * entstuende, kommen hier DURCH. Das lueckenlos zu entscheiden verlangte Parsing
 * (per Dauerregel ausgeschlossen) plus Rendering. Was der Riegel leistet, ist
 * praezise dies: er schliesst den Fall, in dem der SERVER SELBST aus einem leeren
 * Eingang eine nicht-leere Ausgabe macht.
 */
export function emptyPublishVariant(
  htmlA: unknown,
  variantB: { html: unknown } | null
): "a" | "b" | null {
  if (!nonEmptyHtml(htmlA)) return "a";
  if (variantB && !nonEmptyHtml(variantB.html)) return "b";
  return null;
}

/**
 * DIE DREI SAETZE ZUM LEER-RIEGEL — EINE Quelle fuer den SERVER-Riegel
 * (publishProject verweigert) UND den CLIENT-Hinweis (der Publish-Button sperrt
 * und erklaert warum). Gleiche Denkfigur wie VARIANT_B_NOT_PUBLISHED_MESSAGE:
 * ohne geteilte Konstante drifteten beide Seiten auseinander und der Nutzer
 * bekaeme fuer dieselbe Ursache zwei verschiedene Erklaerungen.
 *
 * DIE AUSWAHL TRIFFT DER AUFRUFER, nicht das Praedikat: ohne Variante B der
 * neutrale Satz (das Wort "Variante" waere dort Fachjargon fuer einen Zustand,
 * den der Nutzer gar nicht kennt), mit B der varianten-spezifische.
 *
 * DER B-SATZ NENNT DEN AUSWEG (Auflage 6) und das ist kein Wortschmuck: Ein
 * Projekt mit leerem html_b ist nach diesem Riegel KOMPLETT unveroeffentlichbar,
 * auch Variante A. Das ist richtig fail-closed — aber ohne den Hinweis "oder
 * entferne sie" saehe der Owner nur eine Sperre ohne Weg zurueck und der Fall
 * landete im Support.
 *
 * Sie liegen HIER und nicht in actions.ts, weil diese Datei "use server" traegt
 * und dort AUSSCHLIESSLICH async-Funktionen als Werte exportiert werden duerfen —
 * eine exportierte Konstante loest beim Serverstart einen ReferenceError aus
 * (real aufgetretener 7c-2c-Bug). Invariante (vii).
 */
export const EMPTY_PUBLISH_MESSAGE =
  "Die Seite ist leer — es gibt nichts zu veröffentlichen.";

export const EMPTY_VARIANT_A_MESSAGE =
  "Variante A ist leer und würde als leere Seite live gehen. Fülle Variante A, bevor du veröffentlichst.";

export const EMPTY_VARIANT_B_MESSAGE =
  "Variante B ist leer und würde als leere Seite live gehen. Fülle Variante B — oder entferne sie, dann kannst du wieder veröffentlichen.";

// Cookie-Name MIT __Host--PRAEFIX. Der Praefix ist kein Schmuck, sondern der Grund,
// warum die Cross-Tenant-Kopplung UNMOEGLICH statt nur ungetestet ist:
//
// Der Browser akzeptiert ein __Host--Cookie NUR, wenn es Secure traegt, Path=/ hat
// UND KEIN Domain-Attribut fuehrt. Faengt jemand spaeter an, Domain=.publayer.net zu
// setzen (der naheliegende "Fix", wenn ein Cookie mal fehlt), VERWIRFT der Browser
// das Cookie — statt es ueber die Wildcard fuer ALLE Kundenprojekte zu setzen und
// damit die Messung still zu koppeln. Der Fehler wird laut statt leise. Gleiche
// Denkfigur wie die CHECK-Constraints: strukturell statt per Konvention.
//
// Der Attribut-Test bleibt trotzdem der Waechter — der Praefix ERSETZT ihn nicht,
// er VERDOPPELT ihn (Browser-Durchsetzung + eigene Assertion).
//
// EHRLICHER VERMERK ZUR LOKALEN ENTWICKLUNG: ueber http://<label>.lvh.me gibt es
// ohnehin KEIN Varianten-Cookie — nicht wegen des Praefixes, sondern weil Secure
// unbedingt gesetzt ist und der Browser ein Secure-Cookie ueber http verwirft. Der
// Praefix fuegt dort also keine neue Bruchstelle hinzu, er macht die vorhandene nur
// sichtbar. Lokales A/B-Testen laeuft ueber localhost (gilt als sicherer Kontext,
// Secure UND __Host- funktionieren dort) oder gar nicht.
//
// Der __ps_-Token bleibt fuer Event-Namen und DOM-IDs reserviert; hier erzwingt die
// Browser-Spezifikation den __Host--Praefix als ERSTES Zeichen.
export const VARIANT_COOKIE_NAME = "__Host-ps_v";

/**
 * Liest die Variante aus einem rohen Cookie-Header. REINE String-Operation, kein
 * Regex-Bastelwerk, kein Parser.
 *
 * STRENG: nur EIN Vorkommen unseres Namens mit exakt 'a' oder 'b' gilt. Alles
 * andere — fehlend, leer, 'x', Sonderzeichen UND MEHRFACHVORKOMMEN — wird wie
 * ABWESEND behandelt (null) und loest oben einen frischen Muenzwurf aus.
 *
 * WARUM Mehrfachvorkommen UNGUELTIG statt "letzter gewinnt": zwei Cookies gleichen
 * Namens entstehen genau dann, wenn eines host-only und eines domainweit gesetzt
 * wurde. Welches der Browser zuerst sendet, ist nicht garantiert -> "letzter
 * gewinnt" machte einen Besucher dauerhaft INSTABIL (mal A, mal B, bei jedem
 * Request neu). Ein frischer, sauber host-only gesetzter Wert heilt den Zustand,
 * statt ihn festzuschreiben.
 *
 * Fremde Cookies im selben Header stoeren nicht (exakter Namensvergleich).
 */
export function parseVariantCookie(cookieHeader: string | null): Variant | null {
  if (!cookieHeader) return null;

  const found: string[] = [];
  for (const part of cookieHeader.split(";")) {
    const pair = part.trim();
    if (!pair) continue;
    // Am ERSTEN "=" trennen: ein Wert darf selbst "=" enthalten (Base64 o.ae.),
    // der Name nie.
    const eq = pair.indexOf("=");
    if (eq === -1) continue;
    if (pair.slice(0, eq).trim() !== VARIANT_COOKIE_NAME) continue;
    found.push(pair.slice(eq + 1).trim());
  }

  if (found.length !== 1) return null;
  const value = found[0];
  return value === "a" || value === "b" ? value : null;
}

/**
 * Bestimmt den Bucket. Liegt ein GUELTIGES Cookie vor, gewinnt es (Stickiness);
 * sonst haelftiger Muenzwurf.
 *
 * isNew sagt dem Aufrufer, ob ein Set-Cookie noetig ist. Bei bestehendem Cookie
 * wird NICHT erneut gesetzt: ein Session-Cookie braucht keine Auffrischung, und
 * jedes Byte zaehlt auf dem meistgetroffenen Pfad der Plattform.
 *
 * rand ist injizierbar (Default Math.random) — die Zuweisung ist KEINE
 * Sicherheitsgrenze (der Wert steht ohnehin im Cookie und ist fuer den Besucher
 * belanglos), crypto waere unnoetiger Aufwand auf dem heissen Pfad. Der Parameter
 * existiert allein, damit der Test den Zufall nicht erraten muss.
 */
export function chooseVariant(
  existing: Variant | null,
  rand: () => number = Math.random
): { variant: Variant; isNew: boolean } {
  if (existing) return { variant: existing, isNew: false };
  return { variant: rand() < 0.5 ? "a" : "b", isNew: true };
}

/**
 * Serialisiert das Set-Cookie. Die Attribute sind die tragende Zusage (Invariante
 * iv), jedes einzeln begruendet:
 *
 * - KEIN Domain-Attribut -> HOST-ONLY. Mit Domain=.publayer.net gaelte das Cookie
 *   fuer ALLE Kundenprojekte auf der Wildcard: wer bei Projekt X in Bucket B
 *   landet, bekaeme bei Projekt Y ebenfalls B. Das waere stille Cross-Tenant-
 *   Kopplung der Messung — und wegen der Wildcard-Subdomains der NORMALFALL, nicht
 *   der Sonderfall.
 * - HttpOnly: der Client braucht den Wert nie. Beim /api/e-Beacon faehrt das
 *   Cookie automatisch mit (first-party, gleicher Host) — das ist die Vorbedingung
 *   fuer 9b-2 und wird im 9b-1-Live-Test GEMESSEN, nicht angenommen.
 * - Secure: kein Klartext-Transport.
 * - SameSite=Lax: die Ad-Klick-Navigation ist top-level -> Lax reicht; Strict
 *   braeche nichts, brauchte aber niemand.
 * - Path=/: eine gehostete Seite ist ein Ein-Seiten-Artefakt.
 * - KEIN Max-Age/Expires -> Session-Cookie (Grundsatzentscheidung: keine ID, kein
 *   Zeitstempel, kein Profil; nur 'a' oder 'b').
 */
export function serializeVariantCookie(variant: Variant): string {
  return `${VARIANT_COOKIE_NAME}=${variant}; Path=/; HttpOnly; Secure; SameSite=Lax`;
}
