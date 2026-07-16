import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition -> leeres Modul.
vi.mock("server-only", () => ({}));

const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

const { removeDomainFromVercel } = vi.hoisted(() => ({
  removeDomainFromVercel: vi.fn(),
}));
vi.mock("@/lib/vercel/client", () => ({ removeDomainFromVercel }));

import { removeCustomDomain } from "./remove";

type Cfg = {
  // Ownership-Read (domains.select(...).eq("label").maybeSingle()).
  row?: { data?: unknown; error?: unknown };
  // Rate-Limit-Count je action (audit_logs count). Default 0.
  counts?: Record<string, number>;
  // Fehler des DB-DELETE.
  deleteError?: unknown;
};

/**
 * Admin-Mock. Zeichnet auf: ob/wie oft .delete() lief (Reihenfolge-Gegenprobe), die
 * audit_logs-Inserts, und die action-Filter der Count-Query (action-spezifisches Limit).
 * Die Count-Query gibt counts[action] zurueck -> beweist die Trennung der Budgets.
 */
function makeAdmin(cfg: Cfg = {}) {
  const rec = {
    deleteCalls: 0,
    audits: [] as Record<string, unknown>[],
    countActions: [] as string[],
  };

  function builder(table: string) {
    let isCount = false;
    let isDelete = false;
    let countAction = "";
    const b: Record<string, unknown> = {};
    b.select = (_cols: string, opts?: { count?: string; head?: boolean }) => {
      isCount = !!opts?.count;
      return b;
    };
    b.insert = (row: Record<string, unknown>) => {
      if (table === "audit_logs") rec.audits.push(row);
      return b;
    };
    b.delete = () => {
      isDelete = true;
      rec.deleteCalls += 1;
      return b;
    };
    b.eq = (col: string, val: unknown) => {
      if (isCount && col === "action") {
        countAction = String(val);
        rec.countActions.push(countAction);
      }
      return b;
    };
    b.gte = () => b;
    b.maybeSingle = async () =>
      cfg.row ?? { data: null, error: null };
    b.then = (onF: (v: unknown) => unknown) => {
      if (isCount) {
        return onF({ count: cfg.counts?.[countAction] ?? 0, error: null });
      }
      if (isDelete) return onF({ error: cfg.deleteError ?? null });
      return onF({ error: null });
    };
    return b;
  }

  createAdminClient.mockReturnValue({ from: (t: string) => builder(t) });
  return { rec };
}

const owned = (custom_host: string | null = "kunde.de") => ({
  data: { custom_host, projects: { user_id: "user-1" } },
  error: null,
});

const auditOutcomes = (rec: { audits: Record<string, unknown>[] }) =>
  rec.audits.map((a) => a.outcome);

afterEach(() => vi.clearAllMocks());

describe("removeCustomDomain (7c-2c Domain entfernen)", () => {
  it("Happy-Path: Vercel-DELETE ok -> DB-Zeile geloescht, genau 1 Audit 'domain_remove'/success", async () => {
    const { rec } = makeAdmin({ row: owned() });
    removeDomainFromVercel.mockResolvedValue({ kind: "ok" });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toEqual({ ok: true, healed: false });
    expect(removeDomainFromVercel).toHaveBeenCalledWith("kunde.de");
    expect(rec.deleteCalls).toBe(1);
    expect(rec.audits).toHaveLength(1);
    expect(rec.audits[0]).toMatchObject({
      action: "domain_remove",
      outcome: "success",
      target: "kunde.de",
    });
  });

  it("GEGENPROBE Reihenfolge: Vercel-DELETE error -> .delete() NICHT aufgerufen, Zeile bleibt, Audit 'vercel_error'", async () => {
    const { rec } = makeAdmin({ row: owned() });
    removeDomainFromVercel.mockResolvedValue({ kind: "error", status: 500 });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toMatchObject({ ok: false, reason: "vercel_error" });
    expect(rec.deleteCalls).toBe(0); // DB-Zeile BLEIBT
    expect(auditOutcomes(rec)).toEqual(["vercel_error_500"]);
  });

  it("Vercel-Timeout -> kein .delete(), Zeile bleibt, Audit 'vercel_timeout'", async () => {
    const { rec } = makeAdmin({ row: owned() });
    removeDomainFromVercel.mockResolvedValue({ kind: "timeout" });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toMatchObject({ ok: false, reason: "vercel_error" });
    expect(rec.deleteCalls).toBe(0);
    expect(auditOutcomes(rec)).toEqual(["vercel_timeout"]);
  });

  it("Vercel 404 (schon weg) -> Ziel erreicht: DB-Zeile geloescht, healed:true, Audit 'healed'", async () => {
    const { rec } = makeAdmin({ row: owned() });
    removeDomainFromVercel.mockResolvedValue({ kind: "not_found" });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toEqual({ ok: true, healed: true });
    expect(rec.deleteCalls).toBe(1);
    expect(auditOutcomes(rec)).toEqual(["healed"]);
  });

  it("IDOR: fremdes Projekt/Label -> KEIN Vercel-Call, kein .delete(), Audit 'rejected_not_owner'", async () => {
    const { rec } = makeAdmin({
      row: { data: { custom_host: "kunde.de", projects: { user_id: "SOMEONE-ELSE" } }, error: null },
    });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toMatchObject({ ok: false, reason: "not_owner" });
    expect(removeDomainFromVercel).not.toHaveBeenCalled();
    expect(rec.deleteCalls).toBe(0);
    expect(auditOutcomes(rec)).toEqual(["rejected_not_owner"]);
  });

  it("Label-only-Zeile (custom_host null) -> reject, KEIN Vercel-Call, kein .delete() (Serving-Row geschuetzt)", async () => {
    const { rec } = makeAdmin({ row: owned(null) });

    const res = await removeCustomDomain("user-1", { domainLabel: "meta-test-xy" });

    expect(res).toMatchObject({ ok: false, reason: "not_custom_domain" });
    expect(removeDomainFromVercel).not.toHaveBeenCalled();
    expect(rec.deleteCalls).toBe(0);
    expect(auditOutcomes(rec)).toEqual(["rejected_not_custom_domain"]);
  });

  it("Remove-Rate-Limit: 6. Versuch (domain_remove count=5) -> rejected, kein Vercel-Call, kein .delete()", async () => {
    const { rec } = makeAdmin({ row: owned(), counts: { domain_remove: 5 } });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toMatchObject({ ok: false, reason: "rate_limited" });
    expect(removeDomainFromVercel).not.toHaveBeenCalled();
    expect(rec.deleteCalls).toBe(0);
    // Die Zaehl-Query filterte auf action='domain_remove' (nicht global/nicht add).
    expect(rec.countActions).toEqual(["domain_remove"]);
    expect(auditOutcomes(rec)).toEqual(["rejected_rate_limited"]);
  });

  it("Gegenprobe Budget-Trennung: hohes domain_add_attempt-Budget lastet NICHT auf Remove -> Remove laeuft durch", async () => {
    const { rec } = makeAdmin({
      row: owned(),
      counts: { domain_add_attempt: 99, domain_remove: 0 },
    });
    removeDomainFromVercel.mockResolvedValue({ kind: "ok" });

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toEqual({ ok: true, healed: false });
    expect(rec.deleteCalls).toBe(1);
    expect(rec.countActions).toEqual(["domain_remove"]); // fragt NUR sein eigenes Budget ab
  });

  it("GENAU EIN Audit-Eintrag auch bei Exception -> internal_error, kein .delete()", async () => {
    const { rec } = makeAdmin({ row: owned() });
    removeDomainFromVercel.mockRejectedValue(new Error("boom"));

    const res = await removeCustomDomain("user-1", { domainLabel: "kunde-de-abc" });

    expect(res).toMatchObject({ ok: false, reason: "internal_error" });
    expect(rec.deleteCalls).toBe(0);
    expect(rec.audits).toHaveLength(1);
    expect(rec.audits[0].outcome).toBe("internal_error");
  });
});
