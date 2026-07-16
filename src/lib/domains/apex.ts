// Reine Apex-/Subdomain-Erkennung + Record-Name-Ableitung (kein React, kein Server,
// kein DB, kein Netz) -> unit-testbar. Entscheidet, ob eine Custom-Domain per A-Record
// (Apex) oder CNAME (Subdomain) verdrahtet werden muss.
//
// AUTORITAET: Vercels apexName (aus der Add-Response, 7c-2b, persistiert als
// domains.apex_name). host === apexName => Apex. Das ist korrekt AUCH fuer mehrteilige
// eTLDs (meinshop.co.uk ist Apex, obwohl es zwei Punkte hat) — eine reine Dot-Zaehl-
// Heuristik laege hier falsch.

/**
 * true, wenn `host` die Apex-(Registrable-)Domain ist (=> A-Records), false bei einer
 * Subdomain (=> CNAME).
 *
 * FALLBACK bei fehlendem apexName (Alt-Zeile / defensiver Pfad): LAUT warnen (nie still)
 * und auf die naive "genau 2 Labels = Apex"-Heuristik zurueckfallen. Das Warnen ist
 * bewusste Bedingung: ein stiller Fallback wuerde den .co.uk-Fehlklassifikations-Bug nur
 * leise reproduzieren statt ihn sichtbar zu machen.
 */
export function isApexHost(
  host: string,
  apexName: string | null | undefined,
): boolean {
  const h = host.trim().toLowerCase();
  const apex = apexName?.trim().toLowerCase();
  if (apex) return h === apex;

  console.warn(
    `[pagesmith] isApexHost: apexName fehlt fuer "${host}" -> naive Heuristik ` +
      `(kann bei mehrteiligen eTLDs wie .co.uk falsch liegen).`,
  );
  return h.split(".").length === 2;
}

/**
 * Der Wert fuer das "Name"/"Host"-Feld beim Registrar:
 * - Apex           -> "@" (die meisten Registrare; die Terminologie-Tabelle uebersetzt).
 * - Subdomain      -> das Praefix VOR der Apex-Domain (shop.kunde.de + kunde.de -> "shop").
 *
 * Fehlt apexName, faellt die Subdomain-Ableitung auf das erste Label zurueck (best
 * effort) — der laute Warn kommt bereits aus isApexHost.
 */
export function recordHostName(
  host: string,
  apexName: string | null | undefined,
  apex: boolean,
): string {
  if (apex) return "@";
  const h = host.trim().toLowerCase();
  const a = apexName?.trim().toLowerCase();
  if (a && h.endsWith(`.${a}`)) return h.slice(0, h.length - a.length - 1);
  return h.split(".")[0];
}
