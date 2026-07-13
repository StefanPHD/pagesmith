import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest, NextResponse } from "next/server";

// updateSession (das Auth-Gate) als Spy: beweist, dass es fuer Serving-Hosts NICHT
// aufgerufen wird (keine App-Cookies) und fuer App-Hosts UNVERAENDERT laeuft.
const { updateSession } = vi.hoisted(() => ({
  updateSession: vi.fn(async () => NextResponse.next()),
}));
vi.mock("@/lib/supabase/middleware", () => ({ updateSession }));

import { middleware } from "./middleware";

function requestFor(url: string, host: string): NextRequest {
  return new NextRequest(new URL(url), { headers: { host } });
}

// Variante mit gefaelschtem/gesetztem x-forwarded-host (Prod-Pfad hinter Vercels Edge).
function requestForXfh(
  url: string,
  host: string,
  xForwardedHost: string
): NextRequest {
  return new NextRequest(new URL(url), {
    headers: { host, "x-forwarded-host": xForwardedHost },
  });
}

function rewritePath(res: Response): string | null {
  const rewrite = res.headers.get("x-middleware-rewrite");
  return rewrite ? new URL(rewrite).pathname : null;
}

afterEach(() => vi.clearAllMocks());

describe("middleware — Host-Verzweigung (Scheibe 7a)", () => {
  it("Serving-Host (*.publayer.net) -> rewrite auf /app-serve, KEIN Auth-Gate", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.publayer.net/", "meinprojekt.publayer.net")
    );
    // NextResponse.rewrite setzt den internen Rewrite-Header auf /app-serve.
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite as string).pathname).toBe("/app-serve");
    // Auth-Gate NIE angefasst -> keine Session/Cookies fuer die gehostete Seite.
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("Serving-Host lokal (*.lvh.me) -> ebenfalls rewrite (fork-frei)", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.lvh.me:3000/", "meinprojekt.lvh.me:3000")
    );
    expect(res.headers.get("x-middleware-rewrite")).not.toBeNull();
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("App-Host -> updateSession() UNVERAENDERT aufgerufen (Auth-Gate intakt)", async () => {
    await middleware(requestFor("http://localhost:3000/", "localhost:3000"));
    expect(updateSession).toHaveBeenCalledTimes(1);
  });

  it("bare publayer.net (nach Inversion Nicht-App) -> serving branch (rewrite), KEIN Auth-Gate", async () => {
    // FLAG 2 (bewusst gekippt): unter der Inversion ist die App NUR die Allowlist
    // (pagesmith.app). Bare publayer.net faellt jetzt in den Serving-Zweig -> /app-serve
    // (dort 404 mangels Label/custom_host), NICHT mehr ins Auth-Gate.
    const res = await middleware(requestFor("http://publayer.net/", "publayer.net"));
    expect(rewritePath(res)).toBe("/app-serve");
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("Custom-Host (test-custom.local) -> serving branch (rewrite), KEIN Auth-Gate", async () => {
    const res = await middleware(
      requestFor("http://test-custom.local/", "test-custom.local")
    );
    expect(rewritePath(res)).toBe("/app-serve");
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("Preview-Host (*.vercel.app) -> App-Host, updateSession (Allowlist-Vollstaendigkeit)", async () => {
    await middleware(
      requestFor(
        "http://pagesmith-git-main.vercel.app/",
        "pagesmith-git-main.vercel.app"
      )
    );
    expect(updateSession).toHaveBeenCalledTimes(1);
  });

  it("x-forwarded-host bestimmt die Verzweigung (EINE Host-Quelle, Praezedenz)", async () => {
    // host allein waere localhost (App); der bevorzugte x-forwarded-host ist ein
    // Custom-Host -> Serving-Zweig. Beweist: Branch nutzt resolveEffectiveHost.
    const res = await middleware(
      requestForXfh("http://localhost/", "localhost", "test-custom.local")
    );
    expect(rewritePath(res)).toBe("/app-serve");
    expect(updateSession).not.toHaveBeenCalled();
  });
});

describe("middleware — First-Party-Ingest-Passthrough (Scheibe 7b)", () => {
  it("Serving-Host + /api/e -> DURCHGELASSEN (kein /app-serve-Rewrite, kein Auth-Gate)", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.publayer.net/api/e", "meinprojekt.publayer.net")
    );
    // Passthrough (NextResponse.next) -> KEIN interner Rewrite-Header.
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("Serving-Host + /api/capi (Alt-Export-Alias) -> ebenfalls durchgelassen (Paritaet)", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.publayer.net/api/capi", "meinprojekt.publayer.net")
    );
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("CHIRURGISCH: Serving-Host + ANDERE /api-Route -> weiter /app-serve-Rewrite", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.publayer.net/api/anders", "meinprojekt.publayer.net")
    );
    const rewrite = res.headers.get("x-middleware-rewrite");
    expect(rewrite).not.toBeNull();
    expect(new URL(rewrite as string).pathname).toBe("/app-serve");
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("CHIRURGISCH: /api/etwas beginnend mit 'e' (/api/evil) -> KEIN Passthrough, Rewrite", async () => {
    // Praefix-Falle: exakter Match, nicht startsWith('/api/e').
    const res = await middleware(
      requestFor("http://meinprojekt.publayer.net/api/evil", "meinprojekt.publayer.net")
    );
    expect(rewritePath(res)).toBe("/app-serve");
  });

  it("Custom-Host + /api/e -> DURCHGELASSEN (Passthrough faellt jetzt AUCH fuer Custom-Domains an)", async () => {
    const res = await middleware(
      requestFor("http://test-custom.local/api/e", "test-custom.local")
    );
    expect(res.headers.get("x-middleware-rewrite")).toBeNull();
    expect(updateSession).not.toHaveBeenCalled();
  });

  it("LEAK-GEGENPROBE: Custom-Host + ANDERE /api-Route -> KEIN Passthrough, Rewrite (kein App-API-Leak)", async () => {
    const res = await middleware(
      requestFor("http://test-custom.local/api/projects", "test-custom.local")
    );
    expect(rewritePath(res)).toBe("/app-serve");
    expect(updateSession).not.toHaveBeenCalled();
  });
});
