// DIE HOST-LISTE DES FORMULAR-RELAYS (Phase 13.6, Scheibe 13.6-3). Rein, ohne Server und ohne
// Datenbank.
//
// Ein Dienst steht hier erst, wenn seine Webhook-Adressen GELESEN und einmal LIVE GETESTET sind
// (Owner-Entscheidung P13.6-55 der Phase 13.6). Fuer Make ist das allein die Zone eu2:
// `hook.eu2.make.com` ist gemessen (docs/formular-empfaenger-befunde.md, Abschnitt "Make",
// Befund (s)); welchen Host die Zonen eu1, us1 und us2 tragen, steht auf keiner gelesenen Seite
// (ebenda, Befund (g)). Zapier folgt nach Lesung und Live-Test in einer eigenen Runde.
//
// EXAKTER VERGLEICH, KEIN MUSTER (Vermerk P13.6-58 der Phase 13.6, G5): `*.make.com` liesse
// fremde Make-Dienste zu (Befund (ab): `email.gh-mail.make.com`), `hook.*.make.com` ungelesene
// Zonen, und ein Suffix-Vergleich ist nur so gut wie seine Raender
// (`hook.eu2.make.com.evil.test`).

import { normalizeFormTargetHost } from "../form-target";

export const RELAY_HOSTS: readonly string[] = ["hook.eu2.make.com"];

/**
 * Die Adresse, an die das Relay weiterleiten darf — oder null.
 * - nur `https:`, ohne Nutzername und Passwort, ohne eigenen Port (der Standard-Port 443
 *   erscheint in `URL.port` als "" und ist damit zulaessig);
 * - der Host, normalisiert wie bei der Pruefung auf eigene Hosts (Kleinschreibung, Punkt am
 *   Ende entfernt; normalizeFormTargetHost), steht EXAKT in RELAY_HOSTS.
 * Zurueck kommt die geparste Form (`href`): aufgerufen wird genau das, was geprueft ist. Der
 * Pfad wird nicht weiter geprueft — gemessen ist nur seine Laenge, nicht seine Zeichenklasse.
 */
export function allowedRelayEndpoint(endpoint: unknown): string | null {
  if (typeof endpoint !== "string") return null;
  let url: URL;
  try {
    url = new URL(endpoint.trim());
  } catch {
    return null;
  }
  if (url.protocol !== "https:") return null;
  if (url.username !== "" || url.password !== "") return null;
  if (url.port !== "") return null;
  const host = normalizeFormTargetHost(url.hostname);
  return RELAY_HOSTS.includes(host) ? url.href : null;
}
