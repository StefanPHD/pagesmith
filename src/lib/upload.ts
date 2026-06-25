// Reine Upload-Validierung (kein React, kein DOM, kein FileReader). Trennt die
// "darf diese Datei rein?"-Entscheidung von der UI/IO, damit sie isoliert
// unit-testbar bleibt. Der Datei-Upload ist NUR ein zweiter Import-WEG: die
// gelesene Datei muendet exakt in denselben setCode-/Detektions-Pfad wie Paste
// (kein Server-Upload, keine zweite Verarbeitungskette).

// Obergrenze ~2 MB. Landingpages sind reines HTML; alles darueber ist mit hoher
// Wahrscheinlichkeit kein Funnel-Markup, und ein zu grosser readAsText-Lauf darf
// den Browser nicht haengen lassen.
export const MAX_UPLOAD_BYTES = 2 * 1024 * 1024;

export type UploadValidation = { ok: true } | { ok: false; error: string };

/**
 * Prueft VOR dem Lesen, ob eine Datei importiert werden darf. Zwei Schranken,
 * Typ zuerst:
 * - Typ: text/html ODER Dateiname endet auf ".html". Lokale Dateien liefern oft
 *   ein leeres file.type, daher faengt die Endung den haeufigen Fall ab.
 * - Groesse: <= MAX_UPLOAD_BYTES.
 * Bei Verstoss eine freundliche, anzeigbare Meldung (kein stilles Schlucken).
 */
export function validateUploadFile(file: File): UploadValidation {
  const isHtml =
    file.type === "text/html" || /\.html$/i.test(file.name);
  if (!isHtml) {
    return { ok: false, error: "Nur HTML-Dateien (.html) werden unterstützt." };
  }
  if (file.size > MAX_UPLOAD_BYTES) {
    return { ok: false, error: "Datei ist zu groß (max. 2 MB)." };
  }
  return { ok: true };
}
