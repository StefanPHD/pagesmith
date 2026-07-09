import { afterEach, describe, expect, it, vi } from "vitest";

// Die Resolver mocken -> die Route wird isoliert getestet (kein echter DB-/service_role-
// Pfad). `server-only` (transitiv ueber den Resolver-Import) neutralisieren. WICHTIG
// (Praezisierung 2): NUR die Resolver werden gemockt — extractLabel/resolveEffectiveHost
// laufen ECHT, damit der Dispatch-Test (label ? byLabel : byCustomHost) nicht hohl ist.
vi.mock("server-only", () => ({}));
const { getPublishedHtmlByLabel, getPublishedHtmlByCustomHost } = vi.hoisted(() => ({
  getPublishedHtmlByLabel: vi.fn(),
  getPublishedHtmlByCustomHost: vi.fn(),
}));
vi.mock("@/lib/hosting/resolve", () => ({
  getPublishedHtmlByLabel,
  getPublishedHtmlByCustomHost,
}));

import { GET } from "./route";

function req(host: string): Request {
  return new Request("http://internal/app-serve", { headers: { host } });
}

function reqXfh(xForwardedHost: string, host: string): Request {
  return new Request("http://internal/app-serve", {
    headers: { host, "x-forwarded-host": xForwardedHost },
  });
}

afterEach(() => vi.clearAllMocks());

describe("GET /app-serve (Serve-Route, Scheibe 7a)", () => {
  it("bekanntes Label -> published HTML + Security-Header", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>live</h1>");
    const res = await GET(req("meinprojekt.pgsm.site"));

    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<h1>live</h1>");
    expect(res.headers.get("content-type")).toMatch(/text\/html/);
    expect(res.headers.get("x-content-type-options")).toBe("nosniff");
    expect(res.headers.get("x-frame-options")).toBe("DENY");
    expect(res.headers.get("referrer-policy")).toBe(
      "strict-origin-when-cross-origin"
    );
    // Lookup lief mit dem extrahierten Label.
    expect(getPublishedHtmlByLabel).toHaveBeenCalledWith("meinprojekt");
  });

  it("lvh.me (lokal) matcht identisch (fork-frei)", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>local</h1>");
    const res = await GET(req("meinprojekt.lvh.me:3000"));
    expect(res.status).toBe(200);
    expect(getPublishedHtmlByLabel).toHaveBeenCalledWith("meinprojekt");
  });

  it("SERVIERT NUR published: die Route reicht exakt den Resolver-Output durch (Draft nie berührt)", async () => {
    // Resolver liefert per Konstruktion nur published_content.html; die Route fügt
    // nichts hinzu und zieht keinen Draft heran.
    getPublishedHtmlByLabel.mockResolvedValue("<p>PUBLISHED</p>");
    const res = await GET(req("p.pgsm.site"));
    expect(await res.text()).toBe("<p>PUBLISHED</p>");
  });

  it("unbekanntes Label / nie publiziert (Resolver null) -> 404", async () => {
    getPublishedHtmlByLabel.mockResolvedValue(null);
    const res = await GET(req("missing.pgsm.site"));
    expect(res.status).toBe(404);
  });

  it("GUARD: Nicht-Serving-Host (App-Host) auf /app-serve -> 404 OHNE Lookup", async () => {
    const res = await GET(req("localhost:3000"));
    expect(res.status).toBe(404);
    // Kein Bypass: der Resolver wird gar nicht erst aufgerufen.
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });

  it("GUARD: verschachteltes Label (foo.bar.pgsm.site) -> 404, KEIN Label-Lookup", async () => {
    getPublishedHtmlByCustomHost.mockResolvedValue(null);
    const res = await GET(req("foo.bar.pgsm.site"));
    expect(res.status).toBe(404);
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });
});

describe("GET /app-serve — Custom-Domain-Dispatch (Scheibe 7c-1)", () => {
  it("WÄCHTER: pgsm-Label-Host -> Label-Lookup, custom_host-Resolver NICHT aufgerufen", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>live</h1>");
    const res = await GET(req("meinprojekt.pgsm.site"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<h1>live</h1>");
    expect(getPublishedHtmlByLabel).toHaveBeenCalledWith("meinprojekt");
    // Dispatch-Trennung: der Custom-Pfad wird fuer einen pgsm-Host NIE angefasst.
    expect(getPublishedHtmlByCustomHost).not.toHaveBeenCalled();
  });

  it("Custom-Host -> custom_host-Lookup mit exaktem Host, Label-Resolver NICHT aufgerufen", async () => {
    getPublishedHtmlByCustomHost.mockResolvedValue("<p>custom live</p>");
    const res = await GET(req("landing.kunde.de"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<p>custom live</p>");
    expect(getPublishedHtmlByCustomHost).toHaveBeenCalledWith("landing.kunde.de");
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });

  it("unbekannter Custom-Host (Resolver null) -> 404 + Security-Header entfallen", async () => {
    getPublishedHtmlByCustomHost.mockResolvedValue(null);
    const res = await GET(req("nie-publiziert.kunde.de"));
    expect(res.status).toBe(404);
  });

  it("ungueltiger/leerer Host -> 404 OHNE beide Lookups", async () => {
    const res = await GET(req("foo..bar")); // Shape-Reject -> resolveEffectiveHost null
    expect(res.status).toBe(404);
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
    expect(getPublishedHtmlByCustomHost).not.toHaveBeenCalled();
  });

  it("x-forwarded-host bevorzugt fuer den Lookup (gleiche Quelle wie die Branch-Entscheidung)", async () => {
    getPublishedHtmlByCustomHost.mockResolvedValue("<p>xfh</p>");
    const res = await GET(reqXfh("landing.kunde.de", "localhost"));
    expect(res.status).toBe(200);
    expect(getPublishedHtmlByCustomHost).toHaveBeenCalledWith("landing.kunde.de");
  });
});
