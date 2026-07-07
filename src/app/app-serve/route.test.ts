import { afterEach, describe, expect, it, vi } from "vitest";

// Den Resolver mocken -> die Route wird isoliert getestet (kein echter DB-/service_role-
// Pfad). `server-only` (transitiv ueber den Resolver-Import) neutralisieren.
vi.mock("server-only", () => ({}));
const { getPublishedHtmlByLabel } = vi.hoisted(() => ({
  getPublishedHtmlByLabel: vi.fn(),
}));
vi.mock("@/lib/hosting/resolve", () => ({ getPublishedHtmlByLabel }));

import { GET } from "./route";

function req(host: string): Request {
  return new Request("http://internal/app-serve", { headers: { host } });
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

  it("GUARD: verschachteltes Label (foo.bar.pgsm.site) -> 404 OHNE Lookup", async () => {
    const res = await GET(req("foo.bar.pgsm.site"));
    expect(res.status).toBe(404);
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });
});
