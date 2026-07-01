import { afterEach, describe, expect, it, vi } from "vitest";

// Den authenticated-SSR-Client (next/headers) komplett mocken: verhindert echten
// Servercode beim Import und steuert die Query-Kette pro Test.
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));

// `import "server-only"` wirft ausserhalb der react-server-Condition (auch in vitest)
// -> durch ein leeres Modul ersetzen (admin.ts wird ohnehin gemockt).
vi.mock("server-only", () => ({}));

// service_role-Admin-Client mocken. adminUpsert ist der SPY, auf dem die
// sicherheitskritischen Assertions laufen (im IDOR-Fall NIE aufgerufen).
const { createAdminClient, adminUpsert } = vi.hoisted(() => {
  // Signatur ueber den Generic -> calls[0][0]/[1] sind typisiert, ohne ungenutzte
  // Parameter in der Implementierung (die vi.fn ohnehin nur zum Aufzeichnen braucht).
  const adminUpsert = vi.fn<
    (row: unknown, options?: unknown) => {
      then: (onF: (v: unknown) => unknown) => unknown;
    }
  >(() => ({ then: (onF) => onF({ error: null }) }));
  const createAdminClient = vi.fn(() => ({
    from: vi.fn(() => ({ upsert: adminUpsert })),
  }));
  return { createAdminClient, adminUpsert };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { setCapiToken, loadProject } from "./actions";

/**
 * Minimaler, chainbarer SSR-Client-Mock. Pro (table.op) ein Ergebnis:
 * - "<table>.select" -> von maybeSingle() aufgeloest (Query).
 * - "<table>.update" -> vom await auf dem Builder aufgeloest (Mutation, thenable).
 * Zeichnet select-Spalten, update-Patch und die from()-Tabellen auf. Der
 * project_tokens-Write laeuft NICHT hierueber (der geht ueber den Admin-Client).
 */
function makeClient(opts: {
  user: { id: string } | null;
  results?: Record<string, { data?: unknown; error: unknown }>;
}) {
  const results = opts.results ?? {};
  const rec = {
    selectCols: [] as { table: string; cols: string }[],
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
    b.update = vi.fn((patch: unknown) => {
      rec.updatePatch = patch;
      awaited = results[`${table}.update`] ?? { error: null };
      return b;
    });
    // Thenable -> `await supabase.from(t).update(...).eq()...`.
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
  it("Happy-Path: schreibt Token per service_role-Upsert + flippt tokenSet in settings + liefert trackingKey", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        // Ownership-Query: Projekt gehoert dem User, noch kein trackingKey.
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "  SECRET  ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.trackingKey).toBeTruthy();

    // Token-Write laeuft ueber den service_role-Admin-Client, GENAU einmal.
    expect(createAdminClient).toHaveBeenCalledTimes(1);
    expect(adminUpsert).toHaveBeenCalledTimes(1);
    // Token (getrimmt) mit user_id aus der Session + onConflict project_id.
    expect(adminUpsert.mock.calls[0][0]).toMatchObject({
      project_id: "proj-1",
      user_id: "user-1",
      meta_capi_token: "SECRET",
    });
    expect(adminUpsert.mock.calls[0][1]).toEqual({ onConflict: "project_id" });

    // settings-Update laeuft ueber den authenticated-SSR-Client (nicht Admin).
    const patch = rec.updatePatch as { settings: { capi: { tokenSet: boolean; trackingKey: string } } };
    expect(patch.settings.capi.tokenSet).toBe(true);
    expect(patch.settings.capi.trackingKey).toBeTruthy();
  });

  it("WRITE-ONLY: der SSR-Client fasst project_tokens NIE an (kein Read/Write ueber authenticated -> SELECT-Sperre bleibt tragend)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(true);

    // Der authenticated-SSR-Client beruehrt project_tokens NIE (weder .from noch
    // .select). Nur der Admin-Client (service_role) schreibt.
    expect(rec.fromTables).not.toContain("project_tokens");
    expect(rec.selectCols.some((s) => s.table === "project_tokens")).toBe(false);
    expect(adminUpsert).toHaveBeenCalledTimes(1);
  });

  it("erhaelt einen bestehenden trackingKey (lazy nur beim ERSTEN Set)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", settings: { capi: { trackingKey: "existing-key", tokenSet: true } } },
          error: null,
        },
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
        "projects.update": { error: null },
      },
    });
    await setCapiToken("proj-1", "SECRET");
    const patch = rec.updatePatch as { settings: { pixels: { meta: { pixelId: string } } } };
    expect(patch.settings.pixels.meta.pixelId).toBe("999");
  });

  it("IDOR-SCHUTZ (heiligstes Gate): fremde project_id -> service_role-Upsert wird NIE aufgerufen, Admin-Client NIE instanziiert", async () => {
    // Eingeloggter User, aber das Projekt gehoert ihm nicht -> Ownership-Query (eq
    // user_id) liefert null. BEWEIS (nicht nur "wirft error"): der privilegierte
    // Write darf NIE laufen, und der Admin-Client (RLS-Bypass) darf gar nicht erst
    // entstehen. Ein "wirft-error"-Test waere gruen, selbst wenn der Write davor liefe.
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: null, error: null },
      },
    });

    const result = await setCapiToken("foreign-proj", "SECRET");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nicht gefunden/i);

    // Kern-Assertion: der service_role-Write wurde NIE erreicht.
    expect(adminUpsert).not.toHaveBeenCalled();
    // Haerteste Invariante: der Admin-Client wurde nicht einmal instanziiert.
    expect(createAdminClient).not.toHaveBeenCalled();
    // Auch kein settings-Update.
    expect(rec.updatePatch).toBeNull();
  });

  it("nicht eingeloggt -> error, kein service_role-Write, kein Admin-Client", async () => {
    const { rec } = makeClient({ user: null });
    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    expect(adminUpsert).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(rec.fromTables).not.toContain("project_tokens");
  });

  it("leerer Token -> error, KEIN DB-Zugriff (weder SSR noch Admin)", async () => {
    const { client } = makeClient({ user: { id: "user-1" } });
    const result = await setCapiToken("proj-1", "   ");
    expect(result.ok).toBe(false);
    expect(client.from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("service_role-Upsert-Fehler -> error (nach bestandenem Gate)", async () => {
    makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
      },
    });
    adminUpsert.mockReturnValueOnce({
      then: (onF: (v: unknown) => unknown) => onF({ error: { message: "boom" } }),
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("boom");
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
