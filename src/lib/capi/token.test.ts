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
  it("loest trackingKey -> { projectId, capiConfig } auf (eine Aufloesung)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    // Phase 8 Scheibe 1: die projectId reitet in DERSELBEN Aufloesung mit (sie wurde
    // vorher intern schon aufgeloest und verworfen) -> KEINE zweite Query.
    expect(await getCapiConfigByTrackingKey("tk-abc")).toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
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

  // ROBUSTHEIT-Block: alle vier Faelle bedeuten "kein Forward-Ziel" -> capiConfig null.
  // Fuer den CAPI-Zweig ist das gleichbedeutend mit dem frueheren null (kein fetch, 204);
  // die projectId wird trotzdem geliefert, weil das Projekt existiert und OFFEN ist.
  it("ROBUSTHEIT: Projekt ohne Meta-Pixel-ID -> capiConfig null (kein Forward-Ziel)", async () => {
    mockAdmin({
      projects: { data: { id: "proj-1", settings: {} }, error: null },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: null,
    });
  });

  it("ROBUSTHEIT: trackingKey + Pixel gesetzt, aber project_tokens-Zeile fehlt -> capiConfig null (kein Throw)", async () => {
    // Projekt hat trackingKey + Pixel, aber der Token wurde nie gesetzt (oder Race).
    // Muss sauber aufloesen, nicht werfen.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: null, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: null,
    });
  });

  it("ROBUSTHEIT: Token-Zeile vorhanden, aber Token null -> capiConfig null", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: { meta_capi_token: null }, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: null,
    });
  });

  it("DB-Fehler beim Token-Read -> capiConfig null (kein Throw)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_tokens: { data: null, error: { message: "boom" } },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: null,
    });
  });

  // Diese Zusicherung bleibt UNVERAENDERT und ist der teuerste Teil des Kill-Switches:
  // bei gesperrtem Projekt wird die Token-Query gar nicht erst gestellt. Der frueche
  // Return bleibt also frueh — nur SEIN RUECKGABEWERT aendert sich (s. naechster Test).
  it("KILL-SWITCH: gesperrtes Projekt -> Token-Query NICHT ausgefuehrt (frueher Return bleibt frueh)", async () => {
    const { from } = mockAdmin({
      projects: {
        data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "PIXEL-123" } } }, blocked_at: "2026-07-14T00:00:00Z" },
        error: null,
      },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    await getCapiConfigByTrackingKey("tk-abc");
    // Frueh-Verwerfen VOR der Token-Aufloesung: project_tokens wird nie abgefragt.
    expect(from).not.toHaveBeenCalledWith("project_tokens");
  });

  it("KILL-SWITCH Gegenprobe: ungesperrtes Projekt (blocked_at null) -> CapiConfig wie bisher", async () => {
    mockAdmin({
      projects: {
        data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "PIXEL-123" } } }, blocked_at: null },
        error: null,
      },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    expect(await getCapiConfigByTrackingKey("tk-abc")).toEqual({
      projectId: "proj-1",
      blocked: false,
      capiConfig: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
    });
  });

  // INVERTIERT in Scheibe 2a (bewusst, NICHT "bis gruen angepasst"):
  //
  // VORHER forderte dieser Test "gesperrt -> die GANZE Aufloesung ist null". Das war in
  // Couple-minimal richtig, weil der Persist im capiConfig-Zweig hing: null traf beides
  // (Forward UND Persist) mit EINEM Guard. Der Schutz war ein NEBENEFFEKT.
  //
  // Mit der Entkopplung persistiert der Handler auch OHNE CapiConfig. Ein null wuerde
  // "gesperrt" von "unbekannter Key" ununterscheidbar machen und den Kill-Switch damit an
  // einen Zufall binden. Deshalb wandert der Schutz an eine SICHTBARERE Stelle: der
  // Resolver MELDET blocked:true, der Handler verzweigt EXPLIZIT darauf (ingest.ts) und
  // verwirft vor Persist und Forward. Dieser Test sichert jetzt die Meldung ab; die
  // Wirkung sichert ingest.persist.test.ts (c).
  it("KILL-SWITCH: gesperrtes Projekt MELDET blocked:true (statt die Aufloesung zu verschlucken)", async () => {
    mockAdmin({
      projects: {
        data: {
          id: "proj-1",
          settings: { pixels: { meta: { pixelId: "PIXEL-123" } } },
          blocked_at: "2026-07-14T00:00:00Z",
        },
        error: null,
      },
      project_tokens: { data: { meta_capi_token: "SECRET-TOKEN" }, error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: true,
      // KEINE Config bei gesperrt — der Token wird gar nicht erst gelesen.
      capiConfig: null,
    });
  });
});
