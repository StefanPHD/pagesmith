import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Authenticated-SSR-Client mocken (kein echter next/headers-Servercode).
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));
// Admin-Client existiert im Modul (setCapiToken), wird hier NICHT gebraucht — mocken,
// damit der Import nicht den echten service_role-Pfad laedt. Spy beweist zugleich:
// publishProject fasst service_role NIE an (Write laeuft ueber den authenticated-Client).
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { publishProject } from "./actions";

/**
 * Chainbarer Client-Mock. Unterstuetzt select().maybeSingle() (Ownership),
 * update() (thenable) UND insert() (thenable, mit konfigurierbarer Ergebnis-Queue
 * fuer den Kollisions-Retry). Zeichnet auf, was geschrieben wird.
 */
function makeClient(opts: {
  user: { id: string } | null;
  ownRow?: { data: unknown; error: unknown };
  updateResult?: { error: unknown };
  insertResults?: { error: unknown }[]; // pro insert-Aufruf, der Reihe nach
}) {
  const rec = {
    fromTables: [] as string[],
    updatePatch: null as unknown,
    inserts: [] as unknown[],
  };
  const insertQueue = [...(opts.insertResults ?? [])];

  function builder(table: string) {
    let awaited: { error: unknown } = { error: null };
    const b: Record<string, unknown> = {};
    b.select = vi.fn(() => b);
    b.eq = vi.fn(() => b);
    b.maybeSingle = vi.fn(async () =>
      table === "projects"
        ? opts.ownRow ?? { data: null, error: null }
        : { data: null, error: null }
    );
    b.update = vi.fn((patch: unknown) => {
      rec.updatePatch = patch;
      awaited = opts.updateResult ?? { error: null };
      return b;
    });
    b.insert = vi.fn((row: unknown) => {
      rec.inserts.push(row);
      awaited = insertQueue.shift() ?? { error: null };
      return b;
    });
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

const snapshot = { html: "<h1 data-pagesmith-id='ps-1'>x</h1>", mappings: [], settings: {} };

beforeEach(() => {
  process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "lvh.me:3000";
});
afterEach(() => vi.clearAllMocks());

describe("publishProject (Scheibe 7a)", () => {
  it("Happy-Path (neu): Label vergeben, published_content gesetzt, Live-URL zurück", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "Mein Shop", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>LIVE</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    // Genau EIN domains-insert (neues Label auf Basis des Namens).
    expect(rec.inserts).toHaveLength(1);
    expect(rec.inserts[0]).toMatchObject({ project_id: "proj-1" });
    expect((rec.inserts[0] as { label: string }).label).toMatch(/^mein-shop-[a-z0-9]{6}$/);

    // published_content trägt das CLIENT-generierte funktionale HTML. Seit Scheibe 2b-1
    // wird zusätzlich der PageView-Emitter server-injiziert -> toContain statt toBe (der
    // Client-Inhalt bleibt erhalten, der Emitter kommt DANEBEN).
    const patch = rec.updatePatch as {
      published_content: { html: string; publishedAt: string };
      settings: { hosting: { label: string } };
    };
    expect(patch.published_content.html).toContain("<h1>LIVE</h1>");
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    expect(patch.published_content.publishedAt).toBeTruthy();
    // Label in settings.hosting gespiegelt.
    expect(patch.settings.hosting.label).toBe(res.label);

    // URL absolut aus env-Basis + Label.
    expect(res.url).toBe(`http://${res.label}.lvh.me:3000`);
    // KEIN service_role beteiligt.
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("IDEMPOTENZ: bestehendes Label -> KEIN neuer insert, gleiche URL", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>v2</h1>", snapshot);
    expect(res.ok).toBe(true);
    if (!res.ok) return;

    // Re-Publish erzeugt KEINE zweite domains-Row.
    expect(rec.inserts).toHaveLength(0);
    expect(res.label).toBe("mein-shop-abc123");
    expect(res.url).toBe("http://mein-shop-abc123.lvh.me:3000");
    // Seit 2b-1 traegt published_content zusaetzlich den injizierten Emitter -> toContain.
    const patch = rec.updatePatch as { published_content: { html: string } };
    expect(patch.published_content.html).toContain("<h1>v2</h1>");
  });

  it("Scheibe 2b-0 DURABILITY: publishProject setzt tracking_key in der Spalte (Update-Patch, truthy)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "Mein Shop", settings: {} }, error: null },
    });

    const res = await publishProject("proj-1", "<h1>LIVE</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as {
      tracking_key?: string;
      settings: { hosting: { label: string }; capi?: unknown };
    };
    // Die server-autoritative Spalte wird gesetzt (vorher NULL).
    expect(patch.tracking_key).toBeTruthy();
    // Der Key liegt NICHT in settings (Autoritaet ist die Spalte; settings unberuehrt
    // vom capi-Key hier) -> der naechste saveProject kann ihn nicht ueberschreiben.
    expect((patch.settings as { capi?: { trackingKey?: string } }).capi?.trackingKey).toBeUndefined();
    // Andockung bricht den Publish nicht: Label weiterhin korrekt gespiegelt.
    expect(patch.settings.hosting.label).toBe(res.ok ? res.label : "");
  });

  it("Scheibe 2b-0 IDEMPOTENZ: bestehender tracking_key bleibt 1:1 (nicht neu gewuerfelt)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
        },
        error: null,
      },
    });

    const res = await publishProject("proj-1", "<h1>v2</h1>", snapshot);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { tracking_key?: string };
    // ensureTrackingKey('keep-me') short-circuited -> Spaltenwert unveraendert.
    expect(patch.tracking_key).toBe("keep-me");
  });

  it("Scheibe 2b-1 End-to-End: der PageView-Emitter wird ins published_content injiziert und traegt den SPALTEN-Key", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: {
        data: {
          id: "proj-1",
          name: "Mein Shop",
          settings: { hosting: { label: "mein-shop-abc123" } },
          tracking_key: "keep-me",
        },
        error: null,
      },
    });

    const res = await publishProject(
      "proj-1",
      "<html><body>LIVE</body></html>",
      snapshot
    );
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as { published_content: { html: string } };
    // Der Emitter ist im gespeicherten HTML …
    expect(patch.published_content.html).toContain('id="__ps_pve"');
    // … und traegt den SPALTEN-Key (nicht settings) — die 2b-0->2b-1-Naht.
    expect(patch.published_content.html).toContain(JSON.stringify("keep-me"));
    // Der Client-HTML-Inhalt bleibt erhalten (Injektion, kein Ersatz).
    expect(patch.published_content.html).toContain("LIVE");
  });

  it("Label-Kollision -> Retry mit neuem Kandidaten (zweiter insert gelingt)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: { id: "proj-1", name: "P", settings: {} }, error: null },
      insertResults: [{ error: { code: "23505" } }, { error: null }],
    });

    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(true);
    expect(rec.inserts).toHaveLength(2); // erster kollidiert, zweiter gelingt
  });

  it("IDOR: fremde project_id -> error, KEIN insert, KEIN update", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      ownRow: { data: null, error: null }, // Ownership-Query leer
    });

    const res = await publishProject("foreign", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/nicht gefunden/i);
    // Kern: nach fehlgeschlagenem Gate wird nichts geschrieben.
    expect(rec.inserts).toHaveLength(0);
    expect(rec.updatePatch).toBeNull();
    expect(rec.fromTables).not.toContain("domains");
  });

  it("nicht eingeloggt -> error, kein DB-Write", async () => {
    const { rec } = makeClient({ user: null });
    const res = await publishProject("proj-1", "<h1>x</h1>", snapshot);
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
    expect(rec.inserts).toHaveLength(0);
  });
});
