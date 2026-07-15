// Reine Custom-Domain-Normalisierung + Formvalidierung (kein React, kein Server, kein
// DB, kein Netzwerk) -> unit-testbar, getrennt von der Mutation. Laeuft VOR jedem
// weiteren Schritt der Add-Domain-Mutation (Ownership, Cap, Vercel-Call).
//
// GRENZE (Normalisieren != Umdeuten): trim/lowercase/Protokoll/trailing-slash strippen
// ist Normalisierung. Ein "www."-Praefix bleibt UNVERAENDERT (www.kunde.de und kunde.de
// sind zwei verschiedene DNS-Eintraege mit unterschiedlichen Anweisungen) -> KEIN
// www.-Strippen. Ein "*."-Wildcard-Praefix wird HART abgelehnt (legitim nur fuer UNSERE
// Serving-Domain, kein Use-Case fuer eine einzelne Kunden-Landingpage).
//
// Die lokale Prueflogik ist nur ein billiger Vorfilter gegen offensichtlichen
// Unsinn/Injection (Leerzeichen, Sonderzeichen, "..", Pfad, Port) — NICHT der
// Wahrheits-Anker fuer Domain-Gueltigkeit. Die eigentliche Autoritaet bleibt Vercels
// eigene Antwort (400 = invalid). IDN/Umlaut-Domains sind eine bekannte, bewusst nicht
// behandelte Luecke (nicht jetzt geloest, nur vermerkt).

import { HOSTNAME_RE } from "@/lib/hosting/host";

export type NormalizeResult =
  | { ok: true; host: string }
  | {
      ok: false;
      reason: "empty" | "wildcard_rejected" | "invalid_format" | "invalid";
    };

export function normalizeDomain(input: string): NormalizeResult {
  let s = (input ?? "").trim().toLowerCase();
  if (!s) return { ok: false, reason: "empty" };

  // Protokoll strippen (enthaelt selbst ein ":", muss VOR dem Port-Check weg).
  s = s.replace(/^https?:\/\//, "");
  // Trailing Slashes strippen (ein blosser Slash ist normalisierbar, kein Fehler).
  s = s.replace(/\/+$/, "");

  // Wildcard HART ablehnen — vor allem anderen, damit die Meldung eindeutig ist.
  if (s.startsWith("*.")) return { ok: false, reason: "wildcard_rejected" };

  // Verbleibender Pfad (/) oder Port (:) -> harte Ablehnung: Vercels API erwartet
  // einen reinen Hostnamen, kein URL-Fragment.
  if (s.includes("/") || s.includes(":")) {
    return { ok: false, reason: "invalid_format" };
  }

  // Eine echte Custom-Domain hat mindestens einen Punkt (Label + TLD). Ein einzelnes
  // Label (localhost, "foo") ist keine oeffentliche Landingpage-Domain.
  if (!s.includes(".")) return { ok: false, reason: "invalid" };

  // Shape-Autoritaet: dieselbe strikte Hostname-Regex wie die Serving-Schicht.
  if (!HOSTNAME_RE.test(s)) return { ok: false, reason: "invalid" };

  return { ok: true, host: s };
}
