// Kill-Switch (Tier 0): statische 451-Erklaerseite fuer ein gesperrtes Projekt. REINE
// Funktion — kein DOM, kein env-Zugriff. Die Route liest NEXT_PUBLIC_ABUSE_CONTACT und
// reicht den (getrimmten) Wert herein -> hier trivial unit-testbar ohne env.
//
// KONTAKTZEILE CONDITIONAL: nur bei nicht-leerem Kontakt erscheint sie im Markup; leer/
// undefined/nur-Whitespace -> KEINE Zeile (kein Platzhalter, keine leere Zeile). Trim ist
// die tragende Kontrolle (eine env mit nur Leerzeichen darf NICHT als "gesetzt" gelten).
// Projekt ist aktuell in geschlossener Entwicklung; publayer.net hat noch keine
// MX-Records -> eine Kontaktadresse waere heute ohnehin tot, deshalb bewusst optional.

const HTML_ESCAPES: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

// Der Kontakt stammt aus unserer eigenen env (Operator-kontrolliert), nicht aus
// User-Input — Escaping ist hier reine Hygiene (billig, korrekt), kein Sicherheitsgate.
function escapeHtml(value: string): string {
  return value.replace(/[&<>"']/g, (c) => HTML_ESCAPES[c]);
}

export function renderBlockedPage(abuseContact?: string): string {
  const contact = (abuseContact ?? "").trim();
  const contactLine = contact
    ? `\n    <p>Bei Fragen zu dieser Entscheidung: ${escapeHtml(contact)}</p>`
    : "";
  return `<!DOCTYPE html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Seite deaktiviert</title>
  </head>
  <body>
    <h1>Seite deaktiviert</h1>
    <p>Diese Seite wurde aufgrund von Richtlinienverstößen deaktiviert.</p>${contactLine}
  </body>
</html>`;
}
