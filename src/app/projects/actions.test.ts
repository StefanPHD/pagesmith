import { afterEach, describe, expect, it, vi } from "vitest";

// Den Server-Supabase-Client (SSR, next/headers) komplett mocken: verhindert, dass
// echter Servercode / next/headers beim Import geladen wird, und erlaubt uns, die
// Query-Kette pro Test zu steuern.
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));

import { setCapiToken, loadProject } from "./actions";

/**
 * Minimaler, chainbarer Supabase-Client-Mock. Pro (table.op) ein Ergebnis:
 * - "<table>.select" -> von maybeSingle() aufgeloest (Query).
 * - "<table>.upsert" / "<table>.update" -> vom await auf dem Builder aufgeloest
 *   (Mutation; der Builder ist thenable).
 * Zeichnet upsert/update-Argumente + die select-Spalten auf.
 */
function makeClient(opts: {
  user: { id: string } | null;
  results?: Record<string, { data?: unknown; error: unknown }>;
}) {
  const results = opts.results ?? {};
  const rec = {
    selectCols: [] as { table: string; cols: string }[],
    upsert: null as { row: unknown; options: unknown } | null,
    updatePatch: null as unknown,
    fromTables: [] as string[],
  };

  function builder(table: string) {
    let awaited: { data?: unknown; error: unknown } = { error: null };
    const b: Record<string, unknown> = {};
    b.select = vi.fn((cols: string) => {
      rec.selectCols.push({ table, cols });
      return b;
    });
    b.eq = vi.fn(() => b);
    b.order = vi.fn(() => b);
    b.limit = vi.fn(() => b);
    b.maybeSingle = vi.fn(async () => results[`${table}.select`] ?? { data: null, error: null });
    b.upsert = vi.fn((row: unknown, options: unknown) => {
      rec.upsert = { row, options };
      awaited = results[`${table}.upsert`] ?? { error: null };
      return b;
    });
    b.update = vi.fn((patch: unknown) => {
      rec.updatePatch = patch;
      awaited = results[`${table}.update`] ?? { error: null };
      return b;
    });
    // Thenable -> `await supabase.from(t).upsert(...)` / `.update(...).eq()...`.
    b.then = (onF: (v: unknown) => unknown) => onF(awaited);
    return b;
  }

  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn((table: string) => {
      rec.fromTables.push(table);
      return builder(table);
    }),
  };
  createClient.mockResolvedValue(client);
  return { client, rec };
}

afterEach(() => {
  vi.clearAllMocks();
});

describe("setCapiToken (Scheibe 2a)", () => {
  it("Happy-Path: schreibt Token per Upsert + flippt tokenSet in settings + liefert trackingKey", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        // Ownership-Query: Projekt gehoert dem User, noch kein trackingKey.
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "project_tokens.upsert": { error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "  SECRET  ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.trackingKey).toBeTruthy();

    // Token (getrimmt) landet in project_tokens mit user_id aus der Session.
    expect(rec.upsert?.row).toMatchObject({
      project_id: "proj-1",
      user_id: "user-1",
      meta_capi_token: "SECRET",
    });
    expect(rec.upsert?.options).toEqual({ onConflict: "project_id" });

    // settings-Update: tokenSet=true + ein trackingKey, pixels unangetastet.
    const patch = rec.updatePatch as { settings: { capi: { tokenSet: boolean; trackingKey: string } } };
    expect(patch.settings.capi.tokenSet).toBe(true);
    expect(patch.settings.capi.trackingKey).toBeTruthy();
  });

  it("erhaelt einen bestehenden trackingKey (lazy nur beim ERSTEN Set)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", settings: { capi: { trackingKey: "existing-key", tokenSet: true } } },
          error: null,
        },
        "project_tokens.upsert": { error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "NEW-SECRET");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.trackingKey).toBe("existing-key");
    const patch = rec.updatePatch as { settings: { capi: { trackingKey: string } } };
    expect(patch.settings.capi.trackingKey).toBe("existing-key");
  });

  it("erhaelt pixels.meta.pixelId beim settings-Merge", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "999" } } } },
          error: null,
        },
        "project_tokens.upsert": { error: null },
        "projects.update": { error: null },
      },
    });
    await setCapiToken("proj-1", "SECRET");
    const patch = rec.updatePatch as { settings: { pixels: { meta: { pixelId: string } } } };
    expect(patch.settings.pixels.meta.pixelId).toBe("999");
  });

  it("IDOR-SCHUTZ: fremde project_id (Ownership-Query leer) -> error, KEIN Upsert", async () => {
    // Eingeloggter User, aber das Projekt gehoert ihm nicht -> die Ownership-Query
    // (eq user_id) liefert null. Beweist, dass die EXPLIZITE Pruefung greift, nicht
    // nur RLS: es darf KEIN project_tokens-Upsert und KEIN settings-Update passieren.
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: null, error: null },
      },
    });

    const result = await setCapiToken("foreign-proj", "SECRET");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nicht gefunden/i);

    // Kritische Gegenprobe: der Upsert-Pfad wurde NIE betreten.
    expect(rec.upsert).toBeNull();
    expect(rec.updatePatch).toBeNull();
    expect(rec.fromTables).not.toContain("project_tokens");
  });

  it("nicht eingeloggt -> error, KEIN Upsert", async () => {
    const { rec } = makeClient({ user: null });
    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    expect(rec.upsert).toBeNull();
    expect(rec.fromTables).not.toContain("project_tokens");
  });

  it("leerer Token -> error, KEIN DB-Zugriff", async () => {
    const { client } = makeClient({ user: { id: "user-1" } });
    const result = await setCapiToken("proj-1", "   ");
    expect(result.ok).toBe(false);
    expect(client.from).not.toHaveBeenCalled();
  });
});

describe("loadProject — Payload traegt NIE den Token", () => {
  it("selektiert nur projects-Spalten (id,name,html,mappings,settings), NIE project_tokens", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            name: "P",
            html: "",
            mappings: [],
            settings: { capi: { trackingKey: "k", tokenSet: true } },
          },
          error: null,
        },
      },
    });

    const row = await loadProject("proj-1");
    // settings (inkl. trackingKey + tokenSet) kommen mit — der Token NICHT.
    expect(row?.settings).toEqual({ capi: { trackingKey: "k", tokenSet: true } });
    expect(JSON.stringify(row)).not.toContain("meta_capi_token");

    // project_tokens wird nie abgefragt; die Projektion enthaelt keinen Token.
    expect(rec.fromTables).not.toContain("project_tokens");
    expect(rec.selectCols).toEqual([
      { table: "projects", cols: "id,name,html,mappings,settings" },
    ]);
  });
});
