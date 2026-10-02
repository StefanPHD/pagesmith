import { afterEach, describe, expect, it, vi } from "vitest";

// Phase 13.7, Scheibe K2b (Zuschnitt P13.7-36, (1); Entscheidungen D2/D3): der Riegel in
// deleteProject. Die Erwartungen stammen aus den Entscheidungen, nicht aus dem Code.
//
// DER ADMIN-MOCK WERTET DIE FILTER AUS, statt eine feste Anzahl zu liefern: Er haelt eine
// kleine Zeilenmenge (domains samt Besitzer des Projekts) und zaehlt nur die Zeilen, die
// JEDEN aufgezeichneten Filter erfuellen. Erst dadurch werden D2 (Filter auf custom_host) und
// D4 (Filter auf projects.user_id) rot, wenn ein Filter fehlt — mit einer festen Anzahl
// prueften sie nur den Mock.

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));
const { createAdminClient } = vi.hoisted(() => ({ createAdminClient: vi.fn() }));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { deleteProject } from "./actions";

// Wortlaut aus den Entscheidungen (Zuschnitt P13.7-36, (1); D3), hier selbst ausgeschrieben.
const MSG_DOMAIN = "Bitte entferne zuerst die verbundene Domain.";
const MSG_FAILED = "Projekt konnte nicht gelöscht werden.";

type DomainRow = {
  label: string;
  project_id: string;
  custom_host: string | null;
  owner: string; // projects.user_id des Projekts der Zeile
};

type AdminOpts = {
  rows?: DomainRow[];
  error?: { message: string; name?: string } | null;
  countNull?: boolean;
  throws?: boolean;
};

function setupAdmin(opts: AdminOpts) {
  const rec = { selects: [] as { cols: string; opts: unknown }[], filters: [] as string[] };
  if (opts.throws) {
    createAdminClient.mockImplementation(() => {
      throw new Error("admin client unavailable");
    });
    return rec;
  }
  createAdminClient.mockImplementation(() => ({
    from: (table: string) => {
      const preds: ((r: DomainRow) => boolean)[] = [];
      const b: Record<string, unknown> = {};
      b.select = (cols: string, o: unknown) => {
        rec.selects.push({ cols, opts: o });
        return b;
      };
      b.eq = (col: string, val: unknown) => {
        rec.filters.push(`eq:${col}`);
        if (col === "project_id") preds.push((r) => r.project_id === val);
        else if (col === "projects.user_id") preds.push((r) => r.owner === val);
        else throw new Error(`unerwarteter Filter ${col}`);
        return b;
      };
      b.not = (col: string, op: string, val: unknown) => {
        rec.filters.push(`not:${col}:${op}`);
        if (col === "custom_host" && op === "is" && val === null) {
          preds.push((r) => r.custom_host !== null);
        } else throw new Error(`unerwarteter Filter ${col}`);
        return b;
      };
      b.then = (onF: (v: unknown) => unknown) => {
        if (table !== "domains") return onF({ count: null, error: { message: "falsche Tabelle" } });
        if (opts.error) return onF({ count: null, error: opts.error });
        if (opts.countNull) return onF({ count: null, error: null });
        const n = (opts.rows ?? []).filter((r) => preds.every((p) => p(r))).length;
        return onF({ count: n, error: null });
      };
      return b;
    },
  }));
  return rec;
}

function setupSsr(deleteResult: { error: unknown } = { error: null }) {
  const rec = { deleteCalls: 0, deleteFilters: [] as [string, unknown][] };
  createClient.mockResolvedValue({
    auth: { getUser: async () => ({ data: { user: { id: "user-1" } } }) },
    from: (table: string) => ({
      delete: () => {
        rec.deleteCalls += 1;
        const b: Record<string, unknown> = {};
        b.eq = (col: string, val: unknown) => {
          rec.deleteFilters.push([`${table}.${col}`, val]);
          return b;
        };
        b.then = (onF: (v: unknown) => unknown) => onF(deleteResult);
        return b;
      },
    }),
  });
  return rec;
}

const LABEL_ROW: DomainRow = { label: "seite-abc123", project_id: "proj-1", custom_host: null, owner: "user-1" };
const CUSTOM_ROW: DomainRow = {
  label: "landing-kunde-de-x1y2z3",
  project_id: "proj-1",
  custom_host: "landing.kunde.de",
  owner: "user-1",
};

afterEach(() => {
  vi.restoreAllMocks();
  createAdminClient.mockReset();
  createClient.mockReset();
});

describe("deleteProject — Riegel Custom-Domain (Phase 13.7, K2b)", () => {
  // EINZIGER Faenger einer fehlenden Pruefung, der KEINEN Lesefehler braucht.
  it("D1: Projekt mit custom_host-Zeile -> verweigert mit dem Domain-Text, KEIN Delete", async () => {
    setupAdmin({ rows: [LABEL_ROW, CUSTOM_ROW] });
    const ssr = setupSsr();
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: false, error: MSG_DOMAIN });
    expect(ssr.deleteCalls).toBe(0);
  });

  // Positivkontrolle zu D1. Faengt die Mutation "Filter auf custom_host fehlt": dann zaehlte
  // die Label-Zeile mit, und ein Projekt ohne Custom-Domain waere unloeschbar (D5 faellt
  // dabei ebenfalls — seine Fixture traegt dieselbe Label-Zeile). Faengt ausserdem eine
  // fehlende Pruefung ueberhaupt, ueber die Zusicherung der Abfrageform (admin.selects).
  it("D2: nur die Label-Zeile (custom_host null) -> wird geloescht, Delete auf id UND user_id", async () => {
    const admin = setupAdmin({ rows: [LABEL_ROW] });
    const ssr = setupSsr();
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: true });
    expect(ssr.deleteCalls).toBe(1);
    expect(ssr.deleteFilters).toEqual([
      ["projects.id", "proj-1"],
      ["projects.user_id", "user-1"],
    ]);
    // Die Pruefung liest nur die Anzahl (D2): head + count, keine Zeilen.
    expect(admin.selects).toEqual([
      { cols: "label, projects!inner(user_id)", opts: { count: "exact", head: true } },
    ]);
  });

  it("D3a: Lesefehler -> verweigert mit dem neutralen Text, KEIN Delete; geloggt errorName, nie die Meldung", async () => {
    setupAdmin({ error: { message: "db-geheimtext", name: "PostgrestError" } });
    const ssr = setupSsr();
    const err = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: false, error: MSG_FAILED });
    expect(ssr.deleteCalls).toBe(0);
    // Positivkontrolle der Abwesenheit: es WURDE geloggt, und zwar der Name.
    expect(err).toHaveBeenCalledWith("[deleteProject] domain check failed:", "PostgrestError");
    expect(JSON.stringify(err.mock.calls)).not.toContain("db-geheimtext");
  });

  it("D3b: Wurf beim Lesen (Admin-Client nicht verfuegbar) -> verweigert, KEIN Delete", async () => {
    setupAdmin({ throws: true });
    const ssr = setupSsr();
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: false, error: MSG_FAILED });
    expect(ssr.deleteCalls).toBe(0);
  });

  it("D3c: keine Anzahl (count null, ohne Fehler) -> verweigert, KEIN Delete", async () => {
    setupAdmin({ countNull: true });
    const ssr = setupSsr();
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: false, error: MSG_FAILED });
    expect(ssr.deleteCalls).toBe(0);
  });

  // EINZIGER Faenger der Mutation "Filter auf projects.user_id fehlt": dann verriete die
  // Pruefung, dass ein FREMDES Projekt eine Custom-Domain traegt. Ohne den Filter zaehlt die
  // fremde Zeile, und der Domain-Text erscheint. Positivkontrolle des Textes: D1.
  // Dass deleteProject auf eine fremde id ok meldet, ist Befund N18 (Vorrat P13.7-19), keine
  // Entscheidung dieses Tests; zugesichert wird allein, dass nichts ueber die Zeile verraten
  // wird und der Weg bis zum (RLS-gedeckten) Delete reicht.
  it("D4: fremdes Projekt mit Custom-Domain -> kein Domain-Text, der Weg geht zum Delete des Nutzer-Clients", async () => {
    setupAdmin({
      rows: [{ ...CUSTOM_ROW, project_id: "proj-fremd", owner: "user-2" }],
    });
    const ssr = setupSsr();
    const result = await deleteProject("proj-fremd");
    expect(JSON.stringify(result)).not.toContain(MSG_DOMAIN);
    expect(ssr.deleteCalls).toBe(1);
    expect(ssr.deleteFilters).toContainEqual(["projects.user_id", "user-1"]);
  });

  it("D5: Fehler beim Delete -> neutraler Text statt error.message (D3)", async () => {
    setupAdmin({ rows: [LABEL_ROW] });
    setupSsr({ error: { message: "db-geheimtext", name: "PostgrestError" } });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await deleteProject("proj-1");
    expect(result).toEqual({ ok: false, error: MSG_FAILED });
    expect(JSON.stringify(result)).not.toContain("db-geheimtext");
  });
});
