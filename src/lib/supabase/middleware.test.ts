import { afterEach, describe, expect, it, vi } from "vitest";
import { NextRequest } from "next/server";

// createServerClient mocken -> auth.getUser() liefert einen kontrollierten User
// (eingeloggt / anonym), ohne echte Supabase-Verbindung.
const { createServerClient } = vi.hoisted(() => ({
  createServerClient: vi.fn(),
}));
vi.mock("@supabase/ssr", () => ({ createServerClient }));

import { updateSession } from "./middleware";

function mockUser(user: unknown) {
  createServerClient.mockReturnValue({
    auth: { getUser: async () => ({ data: { user } }) },
  });
}

function requestFor(path: string) {
  return new NextRequest(new URL(`http://localhost${path}`));
}

// NextResponse.redirect -> location-Header gesetzt; NextResponse.next -> null.
function redirectTarget(res: Response): string | null {
  const loc = res.headers.get("location");
  return loc ? new URL(loc).pathname : null;
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("updateSession — Auth-Gate mit /api/capi-Ausnahme", () => {
  it("anonym + /api/capi -> KEIN Redirect (Route wird erreicht)", async () => {
    mockUser(null);
    const res = await updateSession(requestFor("/api/capi"));
    expect(redirectTarget(res)).toBeNull();
  });

  it("anonym + /api/capi mit Subpfad/Query -> KEIN Redirect", async () => {
    mockUser(null);
    const res = await updateSession(requestFor("/api/capi?x=1"));
    expect(redirectTarget(res)).toBeNull();
  });

  it("anonym + ANDERE API-Route (/api/etwas-anderes) -> WEITERHIN Redirect auf /login", async () => {
    // Beweist: nur /api/capi + /api/e sind geoeffnet, NICHT /api pauschal. WICHTIG:
    // /api/etwas-anderes beginnt mit dem Praefix '/api/e' -> der EXAKTE Match fuer
    // /api/e (statt startsWith) haelt diesen Pfad korrekt hinter dem Gate.
    mockUser(null);
    const res = await updateSession(requestFor("/api/etwas-anderes"));
    expect(redirectTarget(res)).toBe("/login");
  });

  it("anonym + /api/e (7b-Ingest-Trichter) -> KEIN Redirect (Route wird erreicht)", async () => {
    mockUser(null);
    const res = await updateSession(requestFor("/api/e"));
    expect(redirectTarget(res)).toBeNull();
  });

  it("anonym + geschuetzte Seite (/) -> Redirect auf /login (Gate unveraendert)", async () => {
    mockUser(null);
    const res = await updateSession(requestFor("/"));
    expect(redirectTarget(res)).toBe("/login");
  });

  it("anonym + /login -> KEIN Redirect (Login bleibt oeffentlich)", async () => {
    mockUser(null);
    const res = await updateSession(requestFor("/login"));
    expect(redirectTarget(res)).toBeNull();
  });

  it("eingeloggt + /login -> Redirect zurueck auf den Editor (/)", async () => {
    mockUser({ id: "user-1" });
    const res = await updateSession(requestFor("/login"));
    expect(redirectTarget(res)).toBe("/");
  });

  it("eingeloggt + geschuetzte Seite (/) -> KEIN Redirect (durchgereicht)", async () => {
    mockUser({ id: "user-1" });
    const res = await updateSession(requestFor("/"));
    expect(redirectTarget(res)).toBeNull();
  });
});
