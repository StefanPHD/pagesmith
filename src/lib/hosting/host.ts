// Reine Hosting-/Host-Logik (kein React, kein Server, kein DB, kein DOM). Wird von
// der Edge-Middleware, der Serve-Route und der Publish-Action geteilt -> MUSS
// dependency-frei und unit-testbar bleiben.
//
// eTLD+1-ISOLATION: gehostete (fremde) Seiten laufen auf einer SEPARATEN Registrable
// Domain (publayer.net) — die App bleibt auf ihrer eigenen App-Domain (isAppHost-
// Allowlist). .lvh.me ist der lokale Zwilling (*.lvh.me -> 127.0.0.1), damit der
// Label-Lookup lokal wie in Prod funktioniert (kein Dev/Prod-Fork im Code).

// Ein Label ist genau EIN DNS-Label: nur [a-z0-9-], 1..63 Zeichen. Punkte sind
// VERBOTEN -> verschachtelte Sub-Subdomains (foo.bar.publayer.net) und
// Label-Injection werden abgewiesen, BEVOR das Label in einen DB-Lookup geht.
const LABEL_RE = /^[a-z0-9-]{1,63}$/;

/** Host ohne Port, lowercased. "Foo.LVH.me:3000" -> "foo.lvh.me". */
function stripPort(host: string): string {
  return host.split(":")[0].trim().toLowerCase();
}

// HART CODIERTES, von der env UNABHAENGIGES lokales Fallback: *.lvh.me (-> 127.0.0.1)
// serviert lokal AUCH dann, wenn NEXT_PUBLIC_HOSTING_DOMAIN fehlt/leer ist -> Dev-
// Serving bricht nie komplett.
const FALLBACK_SUFFIX = ".lvh.me";

/**
 * Die Suffixe, unter denen ein einzelnes Label eine gehostete Seite adressiert —
 * EINE Quelle der Wahrheit: der Prod-Suffix wird aus NEXT_PUBLIC_HOSTING_DOMAIN
 * abgeleitet (DIESELBE Variable wie buildLiveUrl), das lokale ".lvh.me" bleibt IMMER
 * als hartes Fallback dabei. Call-time gelesen (nicht Modul-Load), damit ein
 * Redeploy / ein Test-Setup die aktuelle env sieht.
 *
 * HAERTUNG gegen die von Hand ins Vercel-Dashboard eingetippte Domain: trim, fuehrende
 * Punkte und trailing slashes strippen, DANN stripPort (Port ab + lowercase). Ohne das
 * ergaeben ".publayer.net" / "publayer.net/" / " publayer.net " einen Suffix, der NIE
 * matcht -> ALLE Wildcard-Seiten 404en STILL (dieselbe Konfig-Fehlerklasse, die schon
 * zweimal Zeit gekostet hat).
 */
function servingSuffixes(): string[] {
  const cleaned = (process.env.NEXT_PUBLIC_HOSTING_DOMAIN ?? "")
    .trim()
    .replace(/^\.+/, "")
    .replace(/\/+$/, "");
  const suffixes = [FALLBACK_SUFFIX];
  if (cleaned) {
    const suffix = "." + stripPort(cleaned);
    if (suffix !== FALLBACK_SUFFIX) suffixes.push(suffix);
  }
  return suffixes;
}

/**
 * Das linkeste (einzige) Label einer Serving-Host, oder null wenn es KEINE gueltige
 * Serving-Host ist (Prod-Suffix aus NEXT_PUBLIC_HOSTING_DOMAIN, z.B. publayer.net).
 * Beispiele (env=publayer.net):
 * - "meinprojekt.publayer.net"     -> "meinprojekt"
 * - "meinprojekt.lvh.me:3000"      -> "meinprojekt"   (fork-frei, env-unabhaengig)
 * - "foo.bar.publayer.net"         -> null            (nested -> abgewiesen)
 * - "publayer.net" / "localhost"   -> null            (kein Subdomain-Label / App-Host)
 * - "böse.publayer.net" / "a_b..." -> null            (Label-Regex)
 */
export function extractLabel(host: string): string | null {
  const h = stripPort(host);
  for (const suffix of servingSuffixes()) {
    if (h.endsWith(suffix)) {
      const label = h.slice(0, -suffix.length);
      return LABEL_RE.test(label) ? label : null;
    }
  }
  return null;
}

/** true, wenn der Host eine gehostete Seite adressiert (gueltiges Label vorhanden). */
export function isServingHost(host: string): boolean {
  return extractLabel(host) !== null;
}

// --- Phase 7c-1: Host-Inversion + effektiver Host -------------------------------
//
// INVERSION: die Serving-Schicht verzweigt nicht mehr "ist Serving-Host?" (Suffix),
// sondern "ist APP-Host?" (geschlossene Allowlist). So teilen *.publayer.net UND
// beliebige Custom-Domains DENSELBEN Serving-Zweig, ohne pro Domain eine Regel.

// Maximale DNS-Namenlaenge.
const MAX_HOST_LEN = 253;

// Strikte Hostname-Shape: punktgetrennte Labels aus [a-z0-9-], jedes Label beginnt
// und endet alphanumerisch. Damit sind KEINE aufeinanderfolgenden Punkte ("..") und
// kein fuehrender/abschliessender Punkt erlaubt; "/", Leerzeichen etc. fallen ohnehin
// raus. Bindestrich steht am Ende der Zeichenklasse (keine Range-Ambiguitaet).
// Exportiert -> die Custom-Domain-Normalisierung (lib/domains/normalize) nutzt DIESELBE
// Shape-Autoritaet, statt eine zweite Hostname-Regex zu duplizieren.
export const HOSTNAME_RE =
  /^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*$/;

// Geschlossene Allowlist der APP-Hosts. LANDMINE: die *.vercel.app-Preview-Hosts
// NICHT vergessen — fehlen sie, landen eigene Deployments im Serving-Zweig -> 404
// auf die eigene App.
const APP_HOSTS = new Set([
  "pagesmith.app",
  "www.pagesmith.app",
  "localhost",
  "127.0.0.1",
]);

/**
 * Der effektive Host eines Requests — die EINZIGE Host-Quelle fuer die Branch-
 * Entscheidung (Middleware/Edge) UND den Serve-Lookup (Route/Node). Eine Quelle ->
 * kein Split-Brain zwischen Verzweigung und Lookup.
 *
 * Praezedenz an GENAU dieser Stelle: x-forwarded-host (in Prod von Vercels Edge
 * gesetzt) vor host (Dev ohne Proxy). Die Trust-Boundary (verwirft Vercels Edge
 * einen client-gefaelschten x-forwarded-host?) wird am Ende von 7c-1 (GATE) per
 * Wegwerf-Instrument auf einem Vercel-Preview BESTAETIGT, nicht angenommen — dank
 * dieser Isolation ist die Praezedenz einzeilig aenderbar, falls der Beweis eine
 * Revision verlangt.
 *
 * Normalisiert (lowercase, Port ab) und strikt shape-validiert; ungueltig/leer/zu
 * lang -> null (der Aufrufer antwortet dann 404 / behandelt es als Nicht-App-Host).
 */
export function resolveEffectiveHost(headers: Headers): string | null {
  // x-forwarded-host kann bei mehreren Proxies eine Komma-Liste sein -> erstes Segment.
  const raw = (
    headers.get("x-forwarded-host") ??
    headers.get("host") ??
    ""
  ).split(",")[0];
  const host = stripPort(raw);
  if (!host || host.length > MAX_HOST_LEN) return null;
  return HOSTNAME_RE.test(host) ? host : null;
}

/**
 * true, wenn der (bereits via resolveEffectiveHost normalisierte) Host die App
 * adressiert. Alles andere faellt in den Serving-Zweig.
 */
export function isAppHost(host: string): boolean {
  return APP_HOSTS.has(host) || host.endsWith(".vercel.app");
}

/**
 * Baut die absolute Live-URL aus Label + Basis-Domain (aus NEXT_PUBLIC_HOSTING_DOMAIN,
 * z.B. "lvh.me:3000" lokal, "publayer.net" in Prod). Lokale Basen (lvh.me/localhost) ->
 * http, sonst https. Leere Basis -> "" (Aufrufer zeigt dann nur das Label).
 */
export function buildLiveUrl(label: string, domain: string): string {
  const base = domain.trim();
  if (!base) return "";
  const host = base.split(":")[0].toLowerCase();
  const scheme =
    host === "localhost" || host.endsWith("lvh.me") ? "http" : "https";
  return `${scheme}://${label}.${base}`;
}

/**
 * Macht aus einem Projektnamen einen Label-tauglichen Slug (nur [a-z0-9-], ohne
 * fuehrende/abschliessende Bindestriche, max 40 Zeichen als Basis — der
 * Random-Suffix kommt separat dazu und haelt das Gesamtlabel < 63). Leerer Rest ->
 * "seite".
 */
export function slugForLabel(name: string | null | undefined): string {
  const slug = (name ?? "")
    .normalize("NFKD")
    .replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40)
    .replace(/-+$/g, "");
  return slug || "seite";
}

/** Kurzer, kollisionsarmer Suffix ([a-z0-9], 6 Zeichen) fuer die Label-Vergabe. */
export function randomLabelSuffix(): string {
  return Math.random().toString(36).slice(2, 8).padEnd(6, "0");
}
