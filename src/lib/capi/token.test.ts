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

import { getCapiConfigByTrackingKey } from "./token";

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

// Ein projects-Ergebnis mit gesetzter Meta-Pixel-ID (Standard-Happy-Case).
function projectWithPixel(id: string, pixelId: string) {
  return {
    data: { id, settings: { pixels: { meta: { pixelId } } } },
    error: null,
  };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("getCapiConfigByTrackingKey (Scheibe 2b-i)", () => {
  it("loest trackingKey -> {pixelId, token} auf (eine Aufloesung)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    expect(await getCapiConfigByTrackingKey("tk-abc")).toEqual({
      pixelId: "PIXEL-123",
      token: "SECRET-TOKEN",
    });
  });

  it("leerer Key -> null (ohne DB-Aufruf)", async () => {
    const { from } = mockAdmin({});
    expect(await getCapiConfigByTrackingKey("   ")).toBeNull();
    // createAdminClient wird gar nicht erst aufgerufen -> kein DB-Zugriff.
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekannter trackingKey (kein Projekt) -> null", async () => {
    mockAdmin({
      projects: { data: null, error: null },
      project_tokens: { data: { meta_capi_token: "x" }, error: null },
    });
    expect(await getCapiConfigByTrackingKey("tk-missing")).toBeNull();
  });

  it("ROBUSTHEIT: Projekt ohne Meta-Pixel-ID -> null (kein Forward-Ziel)", async () => {
    mockAdmin({
      projects: { data: { id: "proj-1", settings: {} }, error: null },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toBeNull();
  });

  it("ROBUSTHEIT: trackingKey + Pixel gesetzt, aber project_tokens-Zeile fehlt -> null (kein Throw)", async () => {
    // Projekt hat trackingKey + Pixel, aber der Token wurde nie gesetzt (oder Race).
    // Muss sauber null liefern, nicht werfen.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: null, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toBeNull();
  });

  it("ROBUSTHEIT: Token-Zeile vorhanden, aber Token null -> null", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: { meta_capi_token: null }, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toBeNull();
  });

  it("DB-Fehler beim Token-Read -> null (kein Throw)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: null, error: { message: "boom" } },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toBeNull();
  });
});
