import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition -> leeres Modul.
vi.mock("server-only", () => ({}));

// service_role-Admin-Client mocken (kein echter Key / keine Verbindung).
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import {
  getPublishedHtmlByLabel,
  getPublishedHtmlByCustomHost,
} from "./resolve";

// Chainbarer Mock. Zeichnet die abgefragten Spalten pro Tabelle auf, damit Tests
// beweisen koennen: es werden NUR project_id/published_content (+ blocked_at) selektiert.
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
  it("bekanntes Label -> kind 'ok' + published_content.html", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: {
        data: { published_content: { html: "<h1>live</h1>" }, blocked_at: null },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toEqual({
      kind: "ok",
      html: "<h1>live</h1>",
    });
  });

  it("selektiert NUR project_id/published_content (+ blocked_at) (kein Draft/Owner-Leak)", async () => {
    const { selectCols } = mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    await getPublishedHtmlByLabel("meinprojekt");
    expect(selectCols).toEqual([
      { table: "domains", cols: "project_id, blocked_at" },
      { table: "projects", cols: "published_content, blocked_at" },
    ]);
    // Beweis der Nicht-Leckage: keine Draft-/Token-Spalten in der Projektion.
    const joined = selectCols.map((s) => s.cols).join(",");
    expect(joined).not.toMatch(/html,|mappings|settings|meta_capi_token/);
  });

  it("leeres Label -> notfound OHNE DB-Aufruf", async () => {
    const { from } = mockAdmin({});
    expect(await getPublishedHtmlByLabel("  ")).toEqual({ kind: "notfound" });
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekanntes Label (kein domains-Eintrag) -> notfound", async () => {
    mockAdmin({
      domains: { data: null, error: null },
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByLabel("missing")).toEqual({ kind: "notfound" });
  });

  it("Projekt ohne published_content -> notfound", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: { data: { published_content: null, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toEqual({ kind: "notfound" });
  });

  it("Snapshot ohne html (leer) -> notfound", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: { data: { published_content: { html: "   " }, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toEqual({ kind: "notfound" });
  });

  it("KILL-SWITCH: gesperrtes Projekt (project.blocked_at) -> blocked, html NICHT ausgeliefert", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: {
        data: { published_content: { html: "<h1>live</h1>" }, blocked_at: "2026-07-14T00:00:00Z" },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toEqual({ kind: "blocked" });
  });

  it("KILL-SWITCH: gesperrte Domain-Zeile (domain.blocked_at) -> blocked (Domain-Ebene scharf, ohne Projekt-Query)", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: "2026-07-14T00:00:00Z" }, error: null },
      // projects wuerde html liefern, wird aber wegen Domain-Sperre nie erreicht.
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByLabel("meinprojekt")).toEqual({ kind: "blocked" });
  });

  it("FAIL-CLOSED: domains-Query-Fehler -> notfound (nicht ausgeliefert)", async () => {
    mockAdmin({
      domains: { data: null, error: { message: "boom" } },
      projects: { data: null, error: null },
    });
    await expect(getPublishedHtmlByLabel("x")).resolves.toEqual({ kind: "notfound" });
  });

  it("FAIL-CLOSED: projects-Query-Fehler -> notfound (nicht ausgeliefert)", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: { data: null, error: { message: "boom" } },
    });
    await expect(getPublishedHtmlByLabel("x")).resolves.toEqual({ kind: "notfound" });
  });
});

describe("getPublishedHtmlByCustomHost (Scheibe 7c-1)", () => {
  it("bekannter custom_host -> kind 'ok' + published_content.html", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: {
        data: { published_content: { html: "<p>custom</p>" }, blocked_at: null },
        error: null,
      },
    });
    expect(await getPublishedHtmlByCustomHost("landing.kunde.de")).toEqual({
      kind: "ok",
      html: "<p>custom</p>",
    });
  });

  it("selektiert NUR project_id/published_content (+ blocked_at) (kein Draft/Owner-Leak)", async () => {
    const { selectCols } = mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    await getPublishedHtmlByCustomHost("landing.kunde.de");
    expect(selectCols).toEqual([
      { table: "domains", cols: "project_id, blocked_at" },
      { table: "projects", cols: "published_content, blocked_at" },
    ]);
    const joined = selectCols.map((s) => s.cols).join(",");
    expect(joined).not.toMatch(/html,|mappings|settings|meta_capi_token/);
  });

  it("leerer Host -> notfound OHNE DB-Aufruf", async () => {
    const { from } = mockAdmin({});
    expect(await getPublishedHtmlByCustomHost("  ")).toEqual({ kind: "notfound" });
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekannter custom_host (kein domains-Eintrag) -> notfound", async () => {
    mockAdmin({
      domains: { data: null, error: null },
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByCustomHost("missing.kunde.de")).toEqual({ kind: "notfound" });
  });

  it("KILL-SWITCH: gesperrtes Projekt (project.blocked_at) -> blocked", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: null }, error: null },
      projects: {
        data: { published_content: { html: "<p>custom</p>" }, blocked_at: "2026-07-14T00:00:00Z" },
        error: null,
      },
    });
    expect(await getPublishedHtmlByCustomHost("landing.kunde.de")).toEqual({ kind: "blocked" });
  });

  it("KILL-SWITCH: gesperrte Domain-Zeile (domain.blocked_at) -> blocked", async () => {
    mockAdmin({
      domains: { data: { project_id: "proj-1", blocked_at: "2026-07-14T00:00:00Z" }, error: null },
      projects: { data: { published_content: { html: "x" }, blocked_at: null }, error: null },
    });
    expect(await getPublishedHtmlByCustomHost("landing.kunde.de")).toEqual({ kind: "blocked" });
  });

  it("FAIL-CLOSED: DB-Fehler -> notfound (kein Throw)", async () => {
    mockAdmin({
      domains: { data: null, error: { message: "boom" } },
      projects: { data: null, error: null },
    });
    await expect(getPublishedHtmlByCustomHost("x.de")).resolves.toEqual({ kind: "notfound" });
  });
});
