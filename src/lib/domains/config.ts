// Reine Ableitung aus Vercels Domain-Config-Antwort (kein React, kein Server, kein DB,
// kein Netz) -> unit-testbar, getrennt von der Server-/Cache-Schicht (status.ts).
//
// QUELLE (empirisch bestaetigt gegen die aktuelle Vercel-Doku + einen echten GET gegen
// publayer.net): GET /v6/domains/{domain}/config liefert configuredBy (A|CNAME|http|
// dns-01|null), misconfigured (bool), recommendedIPv4 ([{rank, value: string[]}] — value
// ist SELBST ein Array, rank=1 kann MEHRERE IPs tragen) und recommendedCNAME
// ([{rank, value: string}]). Zusatzfelder aValues/cnames zeigen, was AKTUELL gesetzt ist
// (Anreicherung fuer die "falscher Record"-Meldung).

/** Die fuenf moeglichen configuredBy-Werte (inkl. null). */
export type ConfiguredBy = "A" | "CNAME" | "http" | "dns-01" | null;

/** Nur die Felder aus Vercels Config-Antwort, die wir lesen. */
export type VercelDomainConfig = {
  configuredBy?: ConfiguredBy;
  misconfigured?: boolean;
  recommendedCNAME?: { rank: number; value: string }[];
  recommendedIPv4?: { rank: number; value: string[] }[];
  // Was Vercel AKTUELL fuer die Domain sieht (Anreicherung der wrong_record-Meldung).
  aValues?: string[];
  cnames?: string[];
};

/**
 * Feinzustand fuer die UI — bewusst benannt statt "generisch falsch konfiguriert".
 * - live          : misconfigured=false -> DNS korrekt, Zertifikat ausstellbar.
 * - waiting_dns   : noch kein passender Eintrag sichtbar ODER Propagation laeuft.
 * - wrong_record  : ein Eintrag existiert, zeigt aber NICHT auf uns -> aktiv korrigieren.
 * - proxy_detected: Domain laeuft ueber einen Proxy/CDN (z.B. Cloudflare) davor.
 */
export type FineState = "live" | "waiting_dns" | "wrong_record" | "proxy_detected";

/** Die grobe, persistierte Statusklasse (domains.verification_status, 0009). */
export type GrobStatus = "pending" | "verified" | "misconfigured";

/** Ein anzuzeigender DNS-Eintrag (dynamisch, nie hardcoded). */
export type DnsRecords =
  | { type: "A"; values: string[] }
  | { type: "CNAME"; value: string }
  | { type: "none" };

/**
 * Grobe Statusklasse fuer die Persistenz. misconfigured=false -> verified; sonst
 * "noch nichts / Challenge laeuft" (configuredBy null|dns-01) -> pending; ein falscher
 * Eintrag (configuredBy A|CNAME|http) -> misconfigured.
 */
export function deriveGrobStatus(config: VercelDomainConfig): GrobStatus {
  if (config.misconfigured === false) return "verified";
  const by = config.configuredBy ?? null;
  if (by === null || by === "dns-01") return "pending";
  return "misconfigured";
}

/**
 * Feinzustand fuer die Nutzer-Meldung. Reihenfolge ist bedeutsam:
 * 1. misconfigured=false gewinnt IMMER (auch hinter einem Proxy) -> live.
 * 2. http  -> proxy_detected (spezifisch benannt statt generisch "falsch").
 * 3. A|CNAME -> wrong_record (ein Eintrag existiert, passt aber nicht).
 * 4. null|dns-01 -> waiting_dns.
 *
 * dns-01-ZWEIG (bewusst hier verortet, nicht durchfallen gelassen): "dns-01" heisst laut
 * Vercel "Domain loest noch NICHT auf uns auf, aber die dns-01-Challenge ist aktiv" —
 * das ist ein Warte-Zustand ("noch nicht aufloesend"), naeher an waiting_dns als an
 * wrong_record. Der Nutzer muss warten/propagieren lassen, nicht aktiv etwas loeschen.
 */
export function deriveFineState(config: VercelDomainConfig): FineState {
  if (config.misconfigured === false) return "live";
  const by = config.configuredBy ?? null;
  if (by === "http") return "proxy_detected";
  if (by === "A" || by === "CNAME") return "wrong_record";
  // by === null || by === "dns-01" -> siehe dns-01-ZWEIG oben.
  return "waiting_dns";
}

/** Den rank=1-Eintrag waehlen (kleinster Rang), sonst undefined. */
function pickRank1<T extends { rank: number }>(arr: T[] | undefined): T | undefined {
  if (!arr || arr.length === 0) return undefined;
  return [...arr].sort((a, b) => a.rank - b.rank)[0];
}

/**
 * Die anzuzeigenden DNS-Eintraege — dynamisch aus Vercels Empfehlung, NIE hardcoded.
 * Apex -> ALLE IPs des rank=1-recommendedIPv4-Eintrags (value ist ein Array, kann
 * mehrere IPs tragen). Subdomain -> der rank=1-recommendedCNAME-String. Fehlt die
 * jeweilige Empfehlung -> { type: "none" } (die UI zeigt dann keinen erfundenen Wert).
 */
export function pickDnsRecords(
  config: VercelDomainConfig,
  isApex: boolean,
): DnsRecords {
  if (isApex) {
    const rec = pickRank1(config.recommendedIPv4);
    const values = rec?.value ?? [];
    return values.length ? { type: "A", values } : { type: "none" };
  }
  const rec = pickRank1(config.recommendedCNAME);
  return rec?.value ? { type: "CNAME", value: rec.value } : { type: "none" };
}

/** Was Vercel AKTUELL sieht (fuer die wrong_record-Meldung "aktuell X, brauchen Y"). */
export function currentlySeenRecords(config: VercelDomainConfig): {
  a: string[];
  cname: string[];
} {
  return { a: config.aValues ?? [], cname: config.cnames ?? [] };
}
