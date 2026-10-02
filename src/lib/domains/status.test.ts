import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
 * `await builder` (nach update().eq().select()) loest zu { data, error } auf.
 * SEIT K2a (Phase 13.7, Vorrat P13.7-2): das Update traegt .select("label"), und ein leeres
 * data ist ein Fehler. Vorgabe ist deshalb EINE getroffene Zeile; updateData: [] bildet das
 * Update ohne Treffer nach.
 */
function makeAdmin(
  opts: { row?: Row; updateError?: unknown; readError?: unknown; updateData?: unknown } = {},
) {
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
  builder.maybeSingle = async () =>
    opts.readError
      ? { data: null, error: opts.readError }
      : { data: opts.row ?? null, error: null };
  builder.then = (onF: (v: unknown) => unknown) =>
    onF({
      data: "updateData" in opts ? opts.updateData : [{ label: "dom-1" }],
      error: opts.updateError ?? null,
    });
  createAdminClient.mockReturnValue({ from: () => builder });
  return { updates, eqCalls };
}

const freshNow = () => new Date().toISOString();
const stale = () => new Date(Date.now() - 60_000).toISOString();

afterEach(() => vi.clearAllMocks());

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

// Phase 13.7, Scheibe K2a (Zuschnitt P13.7-31; Vorrat P13.7-2). Positivkontrolle fuer das
// Update ist der Bestandstest "vercel_synced_at alt -> echter Call" (Vorgabe: 1 Treffer -> ok).
describe("checkDomainStatus — reservierte Hosts und Fehlerpfade (Phase 13.7, K2a)", () => {
  const ownedRow = (custom_host: string, synced: string) => ({
    custom_host,
    apex_name: null,
    verification_status: "pending",
    dns_config: { configuredBy: "A", misconfigured: false },
    vercel_synced_at: synced,
    projects: { user_id: "user-1" },
  });
  afterEach(() => vi.restoreAllMocks());

  // S1 — Pflicht-Mutation (f): faellt, wenn die Pruefung in status fehlt.
  it("S1: reservierter Host (stale) -> KEIN getDomainConfig, kein Update, not_found", async () => {
    const { updates } = makeAdmin({ row: ownedRow("beispiel.net", stale()) });
    getDomainConfig.mockResolvedValue({ kind: "ok", config: { misconfigured: false } });

    const res = await checkDomainStatus("user-1", "beispiel-net-abc");

    expect(res).toEqual({ ok: false, reason: "not_found", error: "Domain nicht gefunden." });
    expect(getDomainConfig).not.toHaveBeenCalled();
    expect(updates).toHaveLength(0);
  });

  // S1b — traegt die Lage VOR der Cache-Bremse: frischer Cache darf keine Auskunft geben.
  it("S1b: reservierter Host mit frischem Cache -> ebenfalls not_found (Pruefung vor der Cache-Bremse)", async () => {
    makeAdmin({ row: ownedRow("x.vercel.app", freshNow()) });

    const res = await checkDomainStatus("user-1", "x-abc");

    expect(res).toMatchObject({ ok: false, reason: "not_found" });
  });

  // S2 — Pflicht-Mutation (d): faellt, wenn die Trefferpruefung des Updates fehlt.
  it("S2: Update ohne Treffer (data []) -> internal_error mit neutralem Text, nicht ok", async () => {
    vi.spyOn(console, "error").mockImplementation(() => {});
    makeAdmin({ row: ownedRow("kunde.de", stale()), updateData: [] });
    getDomainConfig.mockResolvedValue({ kind: "ok", config: { misconfigured: false } });

    const res = await checkDomainStatus("user-1", "kunde-de-abc");

    expect(res).toEqual({
      ok: false,
      reason: "internal_error",
      error: "Status konnte nicht geprueft werden.",
    });
  });

  // S3 — kein Fehlertext verlaesst den Server, auch nicht im Log (errorName statt message).
  // Koeder sind erfunden (Dauerregel "SCHWAERZUNG", Teil (d)).
  it("S3: Lesefehler, Update-Fehler und Wurf -> Koeder weder in result.error noch im Log", async () => {
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const seen: string[] = [];

    makeAdmin({ readError: { name: "PostgrestError", message: "SONDE-XYZ-1" } });
    let res = await checkDomainStatus("user-1", "kunde-de-abc");
    expect(res).toMatchObject({ ok: false, reason: "internal_error" });
    if (!res.ok) seen.push(res.error);

    makeAdmin({
      row: ownedRow("kunde.de", stale()),
      updateError: { name: "PostgrestError", message: "SONDE-XYZ-2" },
    });
    getDomainConfig.mockResolvedValue({ kind: "ok", config: { misconfigured: false } });
    res = await checkDomainStatus("user-1", "kunde-de-abc");
    expect(res).toMatchObject({ ok: false, reason: "internal_error" });
    if (!res.ok) seen.push(res.error);

    makeAdmin({ row: ownedRow("kunde.de", stale()) });
    getDomainConfig.mockRejectedValue(new Error("SONDE-XYZ-3"));
    res = await checkDomainStatus("user-1", "kunde-de-abc");
    expect(res).toMatchObject({ ok: false, reason: "internal_error" });
    if (!res.ok) seen.push(res.error);

    expect(seen).toHaveLength(3);
    for (const text of seen) expect(text).not.toContain("SONDE-XYZ");
    // Positivkontrolle des Log-Teils: alle drei Pfade haben geloggt.
    expect(err).toHaveBeenCalledTimes(3);
    for (const call of err.mock.calls) expect(call.join(" ")).not.toContain("SONDE-XYZ");
  });

  it("E2: Serving-Domain nicht konfiguriert -> auch kunde.de: kein Vercel-Call, not_found", async () => {
    vi.spyOn(console, "warn").mockImplementation(() => {});
    delete process.env.NEXT_PUBLIC_HOSTING_DOMAIN;
    makeAdmin({ row: ownedRow("kunde.de", stale()) });

    const res = await checkDomainStatus("user-1", "kunde-de-abc");

    expect(res).toMatchObject({ ok: false, reason: "not_found" });
    expect(getDomainConfig).not.toHaveBeenCalled();
  });
});
