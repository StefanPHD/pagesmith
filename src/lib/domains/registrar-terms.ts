// Statische Registrar-Terminologie-Hilfe (kein Live-Daten-Bezug, keine DNS-Werte).
// Adressiert die haeufigste Verwirrungsquelle fuer technisch unbedarfte Nutzer: DIESELBE
// DNS-Konzept-Spalte heisst bei jedem Anbieter anders. Bewusst registrar-AGNOSTISCH —
// keine anbieterspezifischen Screenshots/Flows, nur die Feldnamen-Uebersetzung.

export type RegistrarTerm = {
  /** Das DNS-Konzept, wie wir es in den Anweisungen nennen. */
  concept: string;
  /** Wie verschiedene Registrare dasselbe Feld benennen. */
  aliases: string[];
  /** Optionaler Hinweis. */
  note?: string;
};

export const REGISTRAR_TERMS: RegistrarTerm[] = [
  {
    concept: "Typ",
    aliases: ["Type", "Record Type", "Art"],
  },
  {
    concept: "Name / Host",
    aliases: ["Name", "Host", "Hostname", "Alias"],
    note: 'Fuer die Apex-Domain "@" oder leer lassen.',
  },
  {
    concept: "Wert / Ziel",
    aliases: ["Value", "Points to", "Target", "Ziel", "Content", "Data"],
  },
  {
    concept: "TTL",
    aliases: ["TTL", "Time to Live", "Gueltigkeit"],
    note: "Standard / Auto belassen.",
  },
];
