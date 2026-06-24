// Reine Export-Helfer (kein React, kein DOM). Die eigentliche Transformation
// macht generateFunctional(code, mappings, "export") in generate.ts — hier liegt
// nur die Datei-Namensgebung, damit sie isoliert unit-testbar bleibt.

// Fallback-Dateiname, wenn kein brauchbarer Projektname vorliegt.
const FALLBACK_FILENAME = "pagesmith-export.html";

// Der DB-Default-Projektname. Ein noch nicht benanntes Projekt soll NICHT als
// "unbenanntes-projekt.html" exportiert werden (das traegt keine Information) —
// es faellt bewusst auf den neutralen Fallback zurueck.
const DEFAULT_PROJECT_NAME = "Unbenanntes Projekt";

/**
 * Macht aus einem Projektnamen einen sicheren .html-Dateinamen.
 *
 * - Diakritika werden transliteriert (ü -> u), damit "Über uns" -> "uber-uns",
 *   nicht ein leerer Rest.
 * - Alles ausser [a-z0-9] wird zu "-" zusammengefasst, fuehrende/abschliessende
 *   Bindestriche fallen weg.
 * - Leerer Name, reiner Default-Name ("Unbenanntes Projekt") oder ein Name, der
 *   nach dem Slugify nichts uebrig laesst (nur Emojis/Sonderzeichen) -> Fallback
 *   "pagesmith-export.html".
 */
export function exportFilename(name: string | null | undefined): string {
  const trimmed = (name ?? "").trim();
  if (!trimmed || trimmed === DEFAULT_PROJECT_NAME) return FALLBACK_FILENAME;

  const slug = trimmed
    .normalize("NFKD") // zerlegt akzentuierte Zeichen in Basiszeichen + Diakritikum
    .replace(/[̀-ͯ]/g, "") // entfernt die kombinierenden Diakritika
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return slug ? `${slug}.html` : FALLBACK_FILENAME;
}
