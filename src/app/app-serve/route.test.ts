import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

// extractLabel leitet den Serving-Suffix call-time aus NEXT_PUBLIC_HOSTING_DOMAIN ab.
// Diese Suite spiegelt die PROD-Realitaet -> reale Serving-Domain publayer.net.
const ORIGINAL_HOSTING_DOMAIN = process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
beforeEach(() => {
  process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "publayer.net";
});
afterEach(() => {
  vi.clearAllMocks();
  if (ORIGINAL_HOSTING_DOMAIN === undefined) {
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
  } else {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = ORIGINAL_HOSTING_DOMAIN;
  }
});

describe("GET /app-serve (Serve-Route, Scheibe 7a)", () => {
  it("bekanntes Label -> published HTML + Security-Header", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>live</h1>");
    const res = await GET(req("meinprojekt.publayer.net"));

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

  it("lvh.me (lokal) matcht identisch (fork-frei, env-unabhaengiges Fallback)", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>local</h1>");
    const res = await GET(req("meinprojekt.lvh.me:3000"));
    expect(res.status).toBe(200);
    expect(getPublishedHtmlByLabel).toHaveBeenCalledWith("meinprojekt");
  });

  it("SERVIERT NUR published: die Route reicht exakt den Resolver-Output durch (Draft nie berührt)", async () => {
    // Resolver liefert per Konstruktion nur published_content.html; die Route fügt
    // nichts hinzu und zieht keinen Draft heran.
    getPublishedHtmlByLabel.mockResolvedValue("<p>PUBLISHED</p>");
    const res = await GET(req("p.publayer.net"));
    expect(await res.text()).toBe("<p>PUBLISHED</p>");
  });

  it("unbekanntes Label / nie publiziert (Resolver null) -> 404", async () => {
    getPublishedHtmlByLabel.mockResolvedValue(null);
    const res = await GET(req("missing.publayer.net"));
    expect(res.status).toBe(404);
  });

  it("GUARD: App-Host (localhost) auf /app-serve -> 404, KEIN Label-Lookup", async () => {
    const res = await GET(req("localhost:3000"));
    expect(res.status).toBe(404);
    // Kein Label -> byLabel wird nicht aufgerufen (Bypass-Schutz).
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });

  it("GUARD: verschachteltes Label (foo.bar.publayer.net) -> 404, KEIN Label-Lookup", async () => {
    getPublishedHtmlByCustomHost.mockResolvedValue(null);
    const res = await GET(req("foo.bar.publayer.net"));
    expect(res.status).toBe(404);
    expect(getPublishedHtmlByLabel).not.toHaveBeenCalled();
  });
});

describe("GET /app-serve — Custom-Domain-Dispatch (Scheibe 7c-1 / 7c-2a)", () => {
  // PFLICHT-GUARD gegen den 7c-2a-Bug: der Fehler war NICHT "extractLabel wirft",
  // sondern "extractLabel liefert null und der Dispatch faellt STILL auf byCustomHost"
  // (Prod-Wildcard-Seiten 404en lautlos). Laeuft mit der ECHTEN extractLabel + realer
  // Serving-Domain publayer.net; die Gegenprobe (byCustomHost NICHT aufgerufen) ist der
  // eigentliche Riegel — ein reiner extractLabel-Unit-Test faengt einen Rueckfall nicht.
  it("Prod-Serving-Host (x.publayer.net) -> byLabel aufgerufen, byCustomHost NICHT", async () => {
    getPublishedHtmlByLabel.mockResolvedValue("<h1>live</h1>");
    const res = await GET(req("meinprojekt.publayer.net"));
    expect(res.status).toBe(200);
    expect(await res.text()).toBe("<h1>live</h1>");
    expect(getPublishedHtmlByLabel).toHaveBeenCalledWith("meinprojekt");
    // Dispatch-Trennung: der Custom-Pfad wird fuer einen Serving-Host NIE angefasst.
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
