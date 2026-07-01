import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest) -> hier durch ein leeres Modul ersetzen, damit token.ts/admin.ts laden.
vi.mock("server-only", () => ({}));

// Den service_role-Admin-Client komplett mocken: die echte createAdminClient wuerde
// process.env.SUPABASE_SERVICE_ROLE_KEY brauchen und eine echte Verbindung bauen.
const { createAdminClient } = vi.hoisted(() => ({
  createAdminClient: vi.fn(),
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { getCapiTokenByTrackingKey } from "./token";

/**
 * Baut einen minimalen, chainbaren Supabase-Client-Mock. Pro Tabelle ein
 * vorkonfiguriertes maybeSingle()-Ergebnis. select()/eq() geben den Builder zurueck,
 * maybeSingle() loest das hinterlegte Ergebnis auf.
 */
function mockAdmin(results: Record<string, { data: unknown; error: unknown }>) {
  const from = vi.fn((table: string) => {
    const builder: Record<string, unknown> = {};
    builder.select = vi.fn(() => builder);
    builder.eq = vi.fn(() => builder);
    builder.maybeSingle = vi.fn(async () => results[table]);
    return builder;
  });
  createAdminClient.mockReturnValue({ from });
  return { from };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("getCapiTokenByTrackingKey (Scheibe 2a)", () => {
  it("loest trackingKey -> project_id -> Token auf", async () => {
    mockAdmin({
      projects: { data: { id: "proj-1" }, error: null },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    expect(await getCapiTokenByTrackingKey("tk-abc")).toBe("SECRET-TOKEN");
  });

  it("leerer Key -> null (ohne DB-Aufruf)", async () => {
    const { from } = mockAdmin({});
    expect(await getCapiTokenByTrackingKey("   ")).toBeNull();
    // createAdminClient wird gar nicht erst aufgerufen -> kein DB-Zugriff.
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekannter trackingKey (kein Projekt) -> null", async () => {
    mockAdmin({
      projects: { data: null, error: null },
      project_tokens: { data: { meta_capi_token: "x" }, error: null },
    });
    expect(await getCapiTokenByTrackingKey("tk-missing")).toBeNull();
  });

  it("ROBUSTHEIT: trackingKey existiert, aber project_tokens-Zeile fehlt -> null (kein Throw)", async () => {
    // Projekt hat einen trackingKey in settings, aber der Token wurde nie gesetzt
    // (oder Race). Muss sauber null liefern, nicht werfen.
    mockAdmin({
      projects: { data: { id: "proj-1" }, error: null },
      project_tokens: { data: null, error: null },
    });
    await expect(getCapiTokenByTrackingKey("tk-abc")).resolves.toBeNull();
  });

  it("DB-Fehler beim Token-Read -> null (kein Throw)", async () => {
    mockAdmin({
      projects: { data: { id: "proj-1" }, error: null },
      project_tokens: { data: null, error: { message: "boom" } },
    });
    await expect(getCapiTokenByTrackingKey("tk-abc")).resolves.toBeNull();
  });
});
