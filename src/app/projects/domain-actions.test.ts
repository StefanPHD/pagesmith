import { afterEach, describe, expect, it, vi } from "vitest";

// SSR-Client (next/headers) mocken -> kein echter Servercode beim Import, Query-Kette
// pro Test steuerbar. server-only + die von domain-actions importierten server-only-
// Module (register/status) ebenfalls neutralisieren.
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));
vi.mock("@/lib/domains/register", () => ({ registerCustomDomain: vi.fn() }));
vi.mock("@/lib/domains/status", () => ({ checkDomainStatus: vi.fn() }));

import { listProjectDomains } from "./domain-actions";

/**
 * Chainbarer SSR-Client-Mock. projects-Ownership laeuft ueber .maybeSingle();
 * die domains-Liste wird direkt ge-awaited (thenable, kein maybeSingle) -> .then loest sie.
 * Zeichnet die SELECT-Spalten pro Tabelle auf (fuer den label-statt-id-Regressionsguard).
 */
function makeClient(opts: {
  user: { id: string } | null;
  projects?: { data?: unknown; error?: unknown };
  domains?: { data?: unknown; error?: unknown };
}) {
  const rec = { selectCols: [] as { table: string; cols: string }[] };

  function builder(table: string) {
    const b: Record<string, unknown> = {};
    b.select = (cols: string) => {
      rec.selectCols.push({ table, cols });
      return b;
    };
    b.eq = () => b;
    b.not = () => b;
    b.order = () => b;
    b.maybeSingle = async () => opts.projects ?? { data: null, error: null };
    // domains-Liste: `await supabase.from("domains").select(...)...order(...)`.
    b.then = (onF: (v: unknown) => unknown) =>
      onF(opts.domains ?? { data: [], error: null });
    return b;
  }

  createClient.mockResolvedValue({
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: (table: string) => builder(table),
  });
  return { rec };
}

afterEach(() => vi.clearAllMocks());

describe("listProjectDomains (7c-2c id->label-Fix)", () => {
  it("erfolgreicher Read -> { ok:true, domains } mit label-Feld (nicht id)", async () => {
    makeClient({
      user: { id: "user-1" },
      projects: { data: { id: "proj-1" }, error: null },
      domains: {
        data: [
          {
            label: "kunde-de-abc",
            custom_host: "kunde.de",
            verification_status: "pending",
            vercel_synced_at: null,
          },
        ],
        error: null,
      },
    });

    const res = await listProjectDomains("proj-1");

    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.domains).toHaveLength(1);
      // Regression: bei Rueckfall auf r.id waere label undefined.
      expect(res.domains[0].label).toBe("kunde-de-abc");
      expect(res.domains[0].host).toBe("kunde.de");
    }
  });

  it("SELECT nutzt Spalte 'label', niemals 'id' (domains) — Regression", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      projects: { data: { id: "proj-1" }, error: null },
      domains: { data: [], error: null },
    });

    await listProjectDomains("proj-1");

    const domainsSelect = rec.selectCols.find((s) => s.table === "domains");
    expect(domainsSelect?.cols).toContain("label");
    expect(domainsSelect?.cols).not.toContain("id");
  });

  it("PostgREST-Error -> { ok:false } + console.error, KEIN stilles leeres Array", async () => {
    const errSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    makeClient({
      user: { id: "user-1" },
      projects: { data: { id: "proj-1" }, error: null },
      domains: {
        data: null,
        error: { message: "column domains.id does not exist" },
      },
    });

    const res = await listProjectDomains("proj-1");

    // Gegenprobe zum urspruenglichen Bug: NICHT { ok:true, domains:[] }.
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/nicht geladen/i);
    expect(errSpy).toHaveBeenCalled();
    errSpy.mockRestore();
  });

  it("leerer Read -> { ok:true, domains:[] } (unterscheidbar von Fehler)", async () => {
    makeClient({
      user: { id: "user-1" },
      projects: { data: { id: "proj-1" }, error: null },
      domains: { data: [], error: null },
    });

    const res = await listProjectDomains("proj-1");

    expect(res.ok).toBe(true);
    if (res.ok) expect(res.domains).toEqual([]);
  });
});
