import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition -> leeres Modul.
vi.mock("server-only", () => ({}));

// service_role-Admin-Client mocken (kein echter Key / keine Verbindung).
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { getPublishedHtmlByLabel } from "./resolve";

// Chainbarer Mock. Zeichnet die abgefragten Spalten pro Tabelle auf, damit Tests
// beweisen koennen: es werden NUR project_id + published_content selektiert.
function mockAdmin(results: Record<string, { data: unknown; error: unknown }>) {
  const selectCols: { table: string; cols: string }[] = [];
  const from = vi.fn((table: string) => {
    const builder: Record<string, unknown> = {};
    builder.select = vi.fn((cols: string) => {
      selectCols.push({ table, cols });
      return builder;
    });
    builder.eq = vi.fn(() => builder);
    builder.maybeSingle = vi.fn(async () => results[table]);
    return builder;
  });
  createAdminClient.mockReturnValue({ from });
  return { from, selectCols };
}

afterEach(() => vi.clearAllMocks());

describe("getPublishedHtmlByLabel (Scheibe 7a)", () => {
  it("bekanntes Label -> published_content.html", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1" }, error: null },
      projects: {
        data: { published_content: { html: "<h1>live</h1>" } },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toBe("<h1>live</h1>");
  });

  it("selektiert NUR project_id + published_content (kein Draft/Owner-Leak)", async () => {
    const { selectCols } = mockAdmin({
      domains: { data: { project_id: "proj-1" }, error: null },
      projects: { data: { published_content: { html: "x" } }, error: null },
    });
    await getPublishedHtmlByLabel("meinprojekt");
    expect(selectCols).toEqual([
      { table: "domains", cols: "project_id" },
      { table: "projects", cols: "published_content" },
    ]);
    // Beweis der Nicht-Leckage: keine Draft-/Token-Spalten in der Projektion.
    const joined = selectCols.map((s) => s.cols).join(",");
    expect(joined).not.toMatch(/html,|mappings|settings|meta_capi_token/);
  });

  it("leeres Label -> null OHNE DB-Aufruf", async () => {
    const { from } = mockAdmin({});
    expect(await getPublishedHtmlByLabel("  ")).toBeNull();
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekanntes Label (kein domains-Eintrag) -> null", async () => {
    mockAdmin({
      domains: { data: null, error: null },
      projects: { data: { published_content: { html: "x" } }, error: null },
    });
    expect(await getPublishedHtmlByLabel("missing")).toBeNull();
  });

  it("Projekt ohne published_content -> null", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1" }, error: null },
      projects: { data: { published_content: null }, error: null },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toBeNull();
  });

  it("Snapshot ohne html (leer) -> null", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1" }, error: null },
      projects: { data: { published_content: { html: "   " } }, error: null },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toBeNull();
  });

  it("DB-Fehler -> null (kein Throw)", async () => {
    mockAdmin({
      domains: { data: null, error: { message: "boom" } },
      projects: { data: null, error: null },
    });
    await expect(getPublishedHtmlByLabel("x")).resolves.toBeNull();
  });
});
