import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition -> leeres Modul.
vi.mock("server-only", () => ({}));

const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

const { getDomainConfig } = vi.hoisted(() => ({ getDomainConfig: vi.fn() }));
vi.mock("@/lib/vercel/client", () => ({ getDomainConfig }));

import { checkDomainStatus } from "./status";

type Row = Record<string, unknown> | null;

/**
 * Fokussierter Admin-Mock: EINE domains-Zeile per maybeSingle (Ownership/Cache-Read) und
 * ein update()-Pfad, der die geschriebene Row aufzeichnet. Der Builder ist thenable ->
 * `await builder` (nach update().eq()) loest zu { error } auf.
 */
function makeAdmin(opts: { row?: Row; updateError?: unknown } = {}) {
  const updates: Record<string, unknown>[] = [];
  // Zeichnet JEDE .eq(col, val) auf -> Regressions-Guard: die Identitaet MUSS ueber
  // "label" (PK) laufen, nie ueber ein nicht existentes "id".
  const eqCalls: { col: string; val: unknown }[] = [];
  const builder: Record<string, unknown> = {};
  builder.select = () => builder;
  builder.update = (row: Record<string, unknown>) => {
    updates.push(row);
    return builder;
  };
  builder.eq = (col: string, val: unknown) => {
    eqCalls.push({ col, val });
    return builder;
  };
  builder.maybeSingle = async () => ({ data: opts.row ?? null, error: null });
  builder.then = (onF: (v: unknown) => unknown) =>
    onF({ error: opts.updateError ?? null });
  createAdminClient.mockReturnValue({ from: () => builder });
  return { updates, eqCalls };
}

const freshNow = () => new Date().toISOString();
const stale = () => new Date(Date.now() - 60_000).toISOString();

afterEach(() => vi.clearAllMocks());

describe("checkDomainStatus (7c-2c)", () => {
  it("vercel_synced_at frisch (<FRESH_MS) -> KEIN getDomainConfig-Call, DB-Stand zurueck", async () => {
    makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "verified",
        dns_config: { configuredBy: "A", misconfigured: false },
        vercel_synced_at: freshNow(),
        projects: { user_id: "user-1" },
      },
    });

    const res = await checkDomainStatus("user-1", "dom-1");

    expect(getDomainConfig).not.toHaveBeenCalled();
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.status.fromCache).toBe(true);
      expect(res.status.fineState).toBe("live");
      expect(res.status.isApex).toBe(true);
    }
  });

  it("vercel_synced_at alt -> echter Call, DB aktualisiert (dns_config/verification_status/vercel_synced_at)", async () => {
    const { updates } = makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "pending",
        dns_config: null,
        vercel_synced_at: stale(),
        projects: { user_id: "user-1" },
      },
    });
    getDomainConfig.mockResolvedValue({
      kind: "ok",
      config: {
        configuredBy: "A",
        misconfigured: false,
        recommendedIPv4: [{ rank: 1, value: ["216.198.79.1"] }],
      },
    });

    const res = await checkDomainStatus("user-1", "dom-1");

    expect(getDomainConfig).toHaveBeenCalledWith("kunde.de");
    expect(updates).toHaveLength(1);
    expect(updates[0]).toMatchObject({
      verification_status: "verified",
      dns_config: { configuredBy: "A", misconfigured: false },
    });
    expect(updates[0].vercel_synced_at).toBeTruthy();
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.status.fromCache).toBe(false);
  });

  it("fremde domainId (user_id-Mismatch) -> kein Vercel-Call, not_owner (IDOR)", async () => {
    const { updates } = makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "pending",
        dns_config: null,
        vercel_synced_at: stale(),
        projects: { user_id: "SOMEONE-ELSE" },
      },
    });

    const res = await checkDomainStatus("user-1", "dom-1");

    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe("not_owner");
    expect(getDomainConfig).not.toHaveBeenCalled();
    expect(updates).toHaveLength(0);
  });

  it("getDomainConfig-Timeout -> letzter DB-Stand + refreshFailed, KEIN Clobber (kein update)", async () => {
    const { updates } = makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "misconfigured",
        dns_config: { configuredBy: "A", misconfigured: true, aValues: ["1.2.3.4"] },
        vercel_synced_at: stale(),
        projects: { user_id: "user-1" },
      },
    });
    getDomainConfig.mockResolvedValue({ kind: "timeout" });

    const res = await checkDomainStatus("user-1", "dom-1");

    expect(getDomainConfig).toHaveBeenCalledOnce();
    expect(updates).toHaveLength(0); // guter Stand NICHT ueberschrieben
    expect(res.ok).toBe(true);
    if (res.ok) {
      expect(res.status.refreshFailed).toBe(true);
      expect(res.status.fromCache).toBe(true);
      expect(res.status.fineState).toBe("wrong_record");
    }
  });

  it("unbekannte domainId (keine Zeile) -> not_found, kein Vercel-Call", async () => {
    makeAdmin({ row: null });
    const res = await checkDomainStatus("user-1", "dom-x");
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.reason).toBe("not_found");
    expect(getDomainConfig).not.toHaveBeenCalled();
  });

  it("filtert per .eq('label', <label>), nie per 'id' (Lese-Query) — Regression", async () => {
    const { eqCalls } = makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "verified",
        dns_config: { configuredBy: "A", misconfigured: false },
        vercel_synced_at: freshNow(),
        projects: { user_id: "user-1" },
      },
    });

    await checkDomainStatus("user-1", "kunde-de-abc");

    expect(eqCalls).toContainEqual({ col: "label", val: "kunde-de-abc" });
    // Die domains-Tabelle hat KEINE id-Spalte -> "id" darf NIE als Filter auftauchen.
    expect(eqCalls.some((c) => c.col === "id")).toBe(false);
  });

  it("stale -> UPDATE filtert ebenfalls per 'label' (keine id) — Regression", async () => {
    const { eqCalls, updates } = makeAdmin({
      row: {
        custom_host: "kunde.de",
        apex_name: "kunde.de",
        verification_status: "pending",
        dns_config: null,
        vercel_synced_at: stale(),
        projects: { user_id: "user-1" },
      },
    });
    getDomainConfig.mockResolvedValue({
      kind: "ok",
      config: { configuredBy: "A", misconfigured: false },
    });

    await checkDomainStatus("user-1", "kunde-de-abc");

    // Update lief (Lese- UND Schreib-.eq) -> beide per label, keiner per id.
    expect(updates).toHaveLength(1);
    expect(eqCalls.filter((c) => c.col === "label" && c.val === "kunde-de-abc").length)
      .toBeGreaterThanOrEqual(2);
    expect(eqCalls.some((c) => c.col === "id")).toBe(false);
  });
});
