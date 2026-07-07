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

afterEach(() => vi.clearAllMocks());

describe("middleware — Host-Verzweigung (Scheibe 7a)", () => {
  it("Serving-Host (*.pgsm.site) -> rewrite auf /app-serve, KEIN Auth-Gate", async () => {
    const res = await middleware(
      requestFor("http://meinprojekt.pgsm.site/", "meinprojekt.pgsm.site")
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

  it("bare Registrable Domain (pgsm.site ohne Subdomain) -> App-Host, Auth-Gate", async () => {
    await middleware(requestFor("http://pgsm.site/", "pgsm.site"));
    expect(updateSession).toHaveBeenCalledTimes(1);
  });
});
