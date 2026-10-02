import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition -> leeres Modul.
vi.mock("server-only", () => ({}));

// service_role-Admin-Client mocken. Der Vercel-Client wird separat gemockt.
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

const { addDomainToVercel } = vi.hoisted(() => ({ addDomainToVercel: vi.fn() }));
vi.mock("@/lib/vercel/client", () => ({ addDomainToVercel }));

import { registerCustomDomain } from "./register";

type Cfg = Record<string, unknown>;

/**
 * Chainbarer Admin-Client-Mock. Pro (table, op) ein Ergebnis:
 * - "<table>.single" -> von maybeSingle() aufgeloest (Ownership/Kollisions-Reads).
 * - "<table>.count"  -> vom await auf dem Builder (select mit {count} -> Rate-Limit/Cap).
 * - "<table>.insert" -> vom await auf dem Builder; darf ein Array (Queue) sein, um
 *   Retry-Szenarien (Label-Kollision) abzubilden.
 * Zeichnet from-Tabellen und alle inserts (mit row) auf.
 */
function makeAdmin(cfg: Cfg = {}) {
  const rec = {
    fromTables: [] as string[],
    inserts: [] as { table: string; row: Record<string, unknown> }[],
  };

  function builder(table: string) {
    let isCount = false;
    let isInsert = false;
    const b: Record<string, unknown> = {};
    b.select = (_cols: string, opts?: { count?: string; head?: boolean }) => {
      isCount = !!opts?.count;
      return b;
    };
    b.insert = (row: Record<string, unknown>) => {
      isInsert = true;
      rec.inserts.push({ table, row });
      return b;
    };
    b.eq = () => b;
    b.not = () => b;
    b.gte = () => b;
    b.maybeSingle = async () => cfg[`${table}.single`] ?? { data: null, error: null };
    b.then = (onF: (v: unknown) => unknown) => {
      if (isInsert) {
        const v = cfg[`${table}.insert`];
        const res = Array.isArray(v)
          ? v.length
            ? v.shift()
            : { error: null }
          : (v ?? { error: null });
        return onF(res);
      }
      if (isCount) return onF(cfg[`${table}.count`] ?? { count: 0, error: null });
      return onF(cfg[`${table}.single`] ?? { data: null, error: null });
    };
    return b;
  }

  createAdminClient.mockReturnValue({
    from: (t: string) => {
      rec.fromTables.push(t);
      return builder(t);
    },
  });
  return { rec };
}

const auditInserts = (rec: { inserts: { table: string; row: Record<string, unknown> }[] }) =>
  rec.inserts.filter((i) => i.table === "audit_logs");
const domainInserts = (rec: { inserts: { table: string; row: Record<string, unknown> }[] }) =>
  rec.inserts.filter((i) => i.table === "domains");

// Owner-Ownership + freie Kollision + leere Zaehler: der "alles gruen bis Vercel"-Boden.
function greenCfg(extra: Cfg = {}): Cfg {
  return {
    "projects.single": { data: { user_id: "user-1" }, error: null },
    "domains.single": { data: null, error: null },
    "audit_logs.count": { count: 0, error: null },
    "domains.count": { count: 0, error: null },
    "domains.insert": { error: null },
    "audit_logs.insert": { error: null },
    ...extra,
  };
}

afterEach(() => {
  vi.clearAllMocks();
});

// Seit K2a (Phase 13.7, Zuschnitt P13.7-31, E2) gilt bei FEHLENDEM NEXT_PUBLIC_HOSTING_DOMAIN
// jeder Host als reserviert (fail-closed). Die Testumgebung setzt die Variable nicht; jeder Test
// dieser Datei laeuft deshalb mit einer neutralen Serving-Domain wie in Production. Tests, die
// die leere Env pruefen, loeschen sie selbst. Muster: restoreHostingDomain in host.test.ts.
const ORIGINAL_HOSTING_DOMAIN = process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
beforeEach(() => {
  process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "beispiel.net";
});
afterEach(() => {
  if (ORIGINAL_HOSTING_DOMAIN === undefined) {
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
  } else {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = ORIGINAL_HOSTING_DOMAIN;
  }
});

describe("registerCustomDomain (Scheibe 7c-2b)", () => {
  it("Happy-Path: pending — schreibt custom_host + rohe verification (jsonb) + Status 'pending' (NICHT aus verified), genau 1 Audit 'success'", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({
      kind: "ok",
      body: { name: "landing.kunde.de", verified: true, verification: [{ type: "TXT" }] },
    });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toEqual({ ok: true, status: "pending" });
    const dom = domainInserts(rec);
    expect(dom).toHaveLength(1);
    expect(dom[0].row).toMatchObject({
      project_id: "proj-1",
      custom_host: "landing.kunde.de",
      verification_status: "pending",
      verification: [{ type: "TXT" }],
    });
    const audit = auditInserts(rec);
    expect(audit).toHaveLength(1);
    expect(audit[0].row).toMatchObject({ user_id: "user-1", outcome: "success", target: "landing.kunde.de" });
  });

  it("IDOR (heiligstes Gate): fremdes Projekt -> KEIN Vercel-Call, kein domains-Insert, genau 1 Audit 'rejected_not_owner'", async () => {
    const { rec } = makeAdmin(
      greenCfg({ "projects.single": { data: { user_id: "other" }, error: null } }),
    );

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "not_owner" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(domainInserts(rec)).toHaveLength(0);
    const audit = auditInserts(rec);
    expect(audit).toHaveLength(1);
    expect(audit[0].row.outcome).toBe("rejected_not_owner");
  });

  it("Wildcard-Domain -> abgelehnt VOR Vercel (reason wildcard_rejected), als Versuch geloggt", async () => {
    const { rec } = makeAdmin(greenCfg());

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "*.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "wildcard_rejected" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(auditInserts(rec)[0].row.outcome).toBe("rejected_wildcard_rejected");
  });

  it("www.-Domain -> unveraendert an Vercel durchgereicht (kein Strippen)", async () => {
    makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({ kind: "ok", body: { name: "www.kunde.de" } });

    await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "  https://WWW.Kunde.DE/  ",
    });

    expect(addDomainToVercel).toHaveBeenCalledWith("www.kunde.de");
  });

  it("lokale Kollision fremdes Projekt -> Konflikt, kein Vercel-Call", async () => {
    const { rec } = makeAdmin(
      greenCfg({ "domains.single": { data: { project_id: "proj-other" }, error: null } }),
    );

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "conflict_other_account" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(auditInserts(rec)[0].row.outcome).toBe("rejected_conflict_local");
  });

  it("lokale Kollision DASSELBE Projekt -> idempotenter Erfolg, kein Vercel-Call, kein Insert", async () => {
    const { rec } = makeAdmin(
      greenCfg({ "domains.single": { data: { project_id: "proj-1" }, error: null } }),
    );

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toEqual({ ok: true, status: "pending" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(domainInserts(rec)).toHaveLength(0);
    expect(auditInserts(rec)[0].row.outcome).toBe("already_registered_self");
  });

  it("Per-User-Cap erreicht -> abgelehnt VOR Vercel (reason cap_reached), als Versuch geloggt", async () => {
    const { rec } = makeAdmin(greenCfg({ "domains.count": { count: 3, error: null } }));

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "cap_reached" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(auditInserts(rec)[0].row.outcome).toBe("rejected_cap_reached");
  });

  it("Rate-Limit erreicht -> abgelehnt VOR Cap/Vercel (reason rate_limited), selbst geloggt", async () => {
    const { rec } = makeAdmin(greenCfg({ "audit_logs.count": { count: 5, error: null } }));

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "rate_limited" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    // Auch der abgelehnte Versuch schreibt GENAU EINEN Audit-Eintrag (Rate-Limit-Grundlage).
    const audit = auditInserts(rec);
    expect(audit).toHaveLength(1);
    expect(audit[0].row.outcome).toBe("rejected_rate_limited");
  });

  it("Vercel 409 fremdes Konto -> Konflikt-Meldung, NICHT geheilt, kein Insert", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({ kind: "conflict_other_account" });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "conflict_other_account" });
    expect(domainInserts(rec)).toHaveLength(0);
    expect(auditInserts(rec)[0].row.outcome).toBe("vercel_conflict_other_account");
  });

  it("Vercel 400 'ungueltig' -> KEINE Heilung, reason invalid_domain (400 ist ueberladen)", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({ kind: "invalid_domain" });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "invalid_domain" });
    expect(domainInserts(rec)).toHaveLength(0);
    expect(auditInserts(rec)[0].row.outcome).toBe("vercel_invalid_domain");
  });

  // Phase 13.7, Scheibe K2b (Zuschnitt P13.7-36, (2); Entscheidungen D1/D5). ERSETZT den Test
  // "HEILUNG" aus 7c-2b, der den Insert aus error.domain zusicherte. Die Erwartung stammt aus
  // der Entscheidung (Ablehnung, kein Insert, genau ein Audit), nicht aus dem Code.
  // EINZIGER Faenger der Mutation "Heil-Pfad wiederhergestellt".
  it("K2b-R1: Vercel 409 eigenes Projekt (already_on_project) -> ABGELEHNT: kein Insert, ein Vercel-Aufruf, genau 1 Audit 'rejected_already_on_project'", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({ kind: "already_on_project" });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toEqual({
      ok: false,
      error: "Domain konnte nicht registriert werden.",
      reason: "vercel_error",
    });
    expect(domainInserts(rec)).toHaveLength(0);
    expect(addDomainToVercel).toHaveBeenCalledTimes(1);
    const audits = auditInserts(rec);
    expect(audits).toHaveLength(1);
    expect(audits[0].row.outcome).toBe("rejected_already_on_project");
    // Positivkontrolle derselben Fixture: der Normalfall schreibt eine Zeile (Happy-Path oben).
  });

  it("Vercel-Timeout -> generischer Fehler, Audit 'vercel_timeout'", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockResolvedValue({ kind: "timeout" });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "vercel_error" });
    expect(auditInserts(rec)[0].row.outcome).toBe("vercel_timeout");
  });

  it("Rennbedingung: 23505 auf custom_host -> 'parallel geschrieben', idempotenter Erfolg, kein Crash", async () => {
    const { rec } = makeAdmin(
      greenCfg({
        "domains.insert": {
          error: {
            code: "23505",
            message: 'duplicate key value violates unique constraint "domains_custom_host_key"',
            details: "Key (custom_host)=(landing.kunde.de) already exists.",
          },
        },
      }),
    );
    addDomainToVercel.mockResolvedValue({ kind: "ok", body: { name: "landing.kunde.de" } });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toEqual({ ok: true, status: "pending" });
    expect(auditInserts(rec)[0].row.outcome).toBe("success_race");
  });

  it("Label-Kollision (23505 auf PK, NICHT custom_host) -> Retry mit neuem Suffix, dann Erfolg", async () => {
    const { rec } = makeAdmin(
      greenCfg({
        "domains.insert": [
          {
            error: {
              code: "23505",
              message: 'duplicate key value violates unique constraint "domains_pkey"',
              details: "Key (label)=(landing-abc123) already exists.",
            },
          },
          { error: null },
        ],
      }),
    );
    addDomainToVercel.mockResolvedValue({ kind: "ok", body: { name: "landing.kunde.de" } });

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toEqual({ ok: true, status: "pending" });
    expect(domainInserts(rec)).toHaveLength(2);
    expect(auditInserts(rec)[0].row.outcome).toBe("success");
  });

  it("GENAU EIN Audit-Eintrag auch bei Exception (Vercel-Client wirft) -> internal_error, kein Insert", async () => {
    const { rec } = makeAdmin(greenCfg());
    addDomainToVercel.mockRejectedValue(new Error("boom"));

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "internal_error" });
    expect(domainInserts(rec)).toHaveLength(0);
    const audit = auditInserts(rec);
    expect(audit).toHaveLength(1);
    expect(audit[0].row.outcome).toBe("internal_error");
  });
});

// Phase 13.7, Scheibe K2a (Zuschnitt P13.7-31): reservierte Hosts. Positivkontrolle ist der
// Happy-Path oben (landing.kunde.de geht an Vercel).
describe("registerCustomDomain — reservierte Hosts (Phase 13.7, K2a)", () => {
  // R1 — faellt, wenn der Aufruf des Praedikats in register fehlt (Mutation (c) analog).
  it("R1: Apex der Serving-Domain -> abgelehnt VOR Vercel, kein Insert, genau 1 Audit 'rejected_reserved_host'", async () => {
    const { rec } = makeAdmin(greenCfg());

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "beispiel.net",
    });

    expect(result).toMatchObject({ ok: false, reason: "reserved_host" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(domainInserts(rec)).toHaveLength(0);
    const audit = auditInserts(rec);
    expect(audit).toHaveLength(1);
    expect(audit[0].row).toMatchObject({ outcome: "rejected_reserved_host", target: "beispiel.net" });
  });

  it("R2: Schreibvariante 'https://WWW.Beispiel.NET/' -> erst normalisiert, dann reserviert", async () => {
    const { rec } = makeAdmin(greenCfg());

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "  https://WWW.Beispiel.NET/  ",
    });

    expect(result).toMatchObject({ ok: false, reason: "reserved_host" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(auditInserts(rec)[0].row).toMatchObject({
      outcome: "rejected_reserved_host",
      target: "www.beispiel.net",
    });
  });

  // R3 — einziger Test, der die REIHENFOLGE traegt (Mutation (e): Praedikat hinter Schritt 3).
  it("R3: bestehende reservierte Zeile DESSELBEN Projekts -> Ablehnung, NICHT 'already_registered_self'", async () => {
    const { rec } = makeAdmin(
      greenCfg({ "domains.single": { data: { project_id: "proj-1" }, error: null } }),
    );

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "shop.beispiel.net",
    });

    expect(result).toMatchObject({ ok: false, reason: "reserved_host" });
    expect(auditInserts(rec)).toHaveLength(1);
    expect(auditInserts(rec)[0].row.outcome).toBe("rejected_reserved_host");
  });

  // R4 — Wortlaut aus der Entscheidung (neutral), ausgeschrieben, nicht aus dem Code bezogen.
  it("R4: Meldungstext ist der neutrale Wortlaut (vercel.app-Alias)", async () => {
    makeAdmin(greenCfg());

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "pagesmith-delta.vercel.app",
    });

    expect(result).toEqual({
      ok: false,
      error: "Diese Domain kann hier nicht verbunden werden.",
      reason: "reserved_host",
    });
    expect(addDomainToVercel).not.toHaveBeenCalled();
  });

  it("E2: Serving-Domain nicht konfiguriert -> auch kunde.de abgelehnt, kein Vercel-Call, 1 Audit", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
    const { rec } = makeAdmin(greenCfg());

    const result = await registerCustomDomain("user-1", {
      projectId: "proj-1",
      domainName: "landing.kunde.de",
    });

    expect(result).toMatchObject({ ok: false, reason: "reserved_host" });
    expect(addDomainToVercel).not.toHaveBeenCalled();
    expect(auditInserts(rec)).toHaveLength(1);
    vi.restoreAllMocks();
  });
});
