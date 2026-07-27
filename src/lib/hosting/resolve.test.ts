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
import { deliverableVariantB, type PublishedLike } from "./variant";

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
    // SPALTENLISTE GEWACHSEN, SCHUTZZWECK UNVERAENDERT (Scheibe 9b-1) — NICHT "bis
    // gruen angepasst": Der Test schuetzt "kein Draft-/Owner-Leak in der
    // Serving-Projektion". Das prueft die Nicht-Leckage-Probe zwei Zeilen weiter
    // unten (not.toMatch auf html,/mappings/settings/meta_capi_token) — sie ist
    // UNBERUEHRT und damit der eigentliche Schutzzweck unveraendert geprueft.
    // ab_test_active ist ein SERVER-Flag ohne Kundeninhalt und reitet bewusst in
    // DERSELBEN Projektion mit (eine Spalte mehr, KEIN zweiter Roundtrip — gleiche
    // Disziplin wie blocked_at). WEITERHIN AUSSERHALB: html, mappings, settings,
    // meta_capi_token, tracking_key.
    expect(selectCols).toEqual([
      { table: "domains", cols: "project_id, blocked_at" },
      { table: "projects", cols: "published_content, blocked_at, ab_test_active" },
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
    // SPALTENLISTE GEWACHSEN, SCHUTZZWECK UNVERAENDERT (Scheibe 9b-1) — NICHT "bis
    // gruen angepasst": Der Test schuetzt "kein Draft-/Owner-Leak in der
    // Serving-Projektion". Das prueft die Nicht-Leckage-Probe zwei Zeilen weiter
    // unten (not.toMatch auf html,/mappings/settings/meta_capi_token) — sie ist
    // UNBERUEHRT und damit der eigentliche Schutzzweck unveraendert geprueft.
    // ab_test_active ist ein SERVER-Flag ohne Kundeninhalt und reitet bewusst in
    // DERSELBEN Projektion mit (eine Spalte mehr, KEIN zweiter Roundtrip — gleiche
    // Disziplin wie blocked_at). WEITERHIN AUSSERHALB: html, mappings, settings,
    // meta_capi_token, tracking_key.
    expect(selectCols).toEqual([
      { table: "domains", cols: "project_id, blocked_at" },
      { table: "projects", cols: "published_content, blocked_at, ab_test_active" },
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

describe("Resolver — A/B-Split-Felder (Scheibe 9b-1)", () => {
  const PC = (extra: Record<string, unknown> = {}) => ({
    html: "<h1>A</h1>",
    ...extra,
  });

  it("Flag aktiv + nicht-leeres B -> abTestActive + variantBHtml", async () => {
    mockAdmin({
      domains: { data: { project_id: "p1", blocked_at: null }, error: null },
      projects: {
        data: {
          published_content: PC({ variantB: { html: "<h1>B</h1>" } }),
          blocked_at: null,
          ab_test_active: true,
        },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("x")).toEqual({
      kind: "ok",
      html: "<h1>A</h1>",
      abTestActive: true,
      variantBHtml: "<h1>B</h1>",
    });
  });

  it("Flag AUS trotz vorhandenem B -> Alt-Form (Invariante iii: das Flag ist die Autoritaet)", async () => {
    mockAdmin({
      domains: { data: { project_id: "p1", blocked_at: null }, error: null },
      projects: {
        data: {
          published_content: PC({ variantB: { html: "<h1>B</h1>" } }),
          blocked_at: null,
          ab_test_active: false,
        },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("x")).toEqual({
      kind: "ok",
      html: "<h1>A</h1>",
    });
  });

  it("Flag aktiv, aber KEIN variantB-Key -> Alt-Form (B5-Degradation)", async () => {
    mockAdmin({
      domains: { data: { project_id: "p1", blocked_at: null }, error: null },
      projects: {
        data: { published_content: PC(), blocked_at: null, ab_test_active: true },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("x")).toEqual({
      kind: "ok",
      html: "<h1>A</h1>",
    });
  });

  it("AUFLAGE 1: Flag aktiv, variantB vorhanden aber LEER/Whitespace -> Alt-Form, NIE leere Seite", async () => {
    // Ohne die geteilte Nicht-Leer-Pruefung bekaeme jeder Bucket-B-Besucher eine
    // LEERE SEITE auf der Live-URL, unter Ad-Traffic. Leeres B == fehlendes B.
    for (const bad of ["", "   ", "\n\t "]) {
      mockAdmin({
        domains: { data: { project_id: "p1", blocked_at: null }, error: null },
        projects: {
          data: {
            published_content: PC({ variantB: { html: bad } }),
            blocked_at: null,
            ab_test_active: true,
          },
          error: null,
        },
      });
      expect(await getPublishedHtmlByLabel("x")).toEqual({
        kind: "ok",
        html: "<h1>A</h1>",
      });
    }
  });

  it("KILL-SWITCH schlaegt den Split: gesperrt + Flag aktiv + B -> blocked (keine Varianten-Felder)", async () => {
    mockAdmin({
      domains: { data: { project_id: "p1", blocked_at: null }, error: null },
      projects: {
        data: {
          published_content: PC({ variantB: { html: "<h1>B</h1>" } }),
          blocked_at: "2026-07-14T00:00:00Z",
          ab_test_active: true,
        },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("x")).toEqual({ kind: "blocked" });
  });

  it("fehlende Spalte (Migration 0017 noch nicht gelaufen) -> Alt-Form, kein Split", async () => {
    // Fail-safe by default: undefined ist nicht true.
    mockAdmin({
      domains: { data: { project_id: "p1", blocked_at: null }, error: null },
      projects: {
        data: {
          published_content: PC({ variantB: { html: "<h1>B</h1>" } }),
          blocked_at: null,
        },
        error: null,
      },
    });
    expect(await getPublishedHtmlByLabel("x")).toEqual({
      kind: "ok",
      html: "<h1>A</h1>",
    });
  });
});

describe("KONSISTENZ: Resolver-Urteil == geteiltes Auslieferbarkeits-Praedikat", () => {
  // Gegenstueck zur gleichnamigen Tabelle in actions.test.ts: DIESELBEN Fixtures,
  // DASSELBE Praedikat. Aktivierung und Auslieferung duerfen nie wieder
  // auseinanderlaufen — laeuft eine Seite aus, wird ihr eigener Test rot.
  const fixtures: PublishedLike[] = [
    { html: "<h1>A</h1>" },
    { html: "<h1>A</h1>", variantB: null },
    { html: "<h1>A</h1>", variantB: {} },
    { html: "<h1>A</h1>", variantB: { html: "" } },
    { html: "<h1>A</h1>", variantB: { html: "   " } },
    { html: "<h1>A</h1>", variantB: { html: "<h1>B</h1>" } },
  ];

  it("bei aktivem Flag splittet der Resolver GENAU dann, wenn das Praedikat traegt", async () => {
    for (const pc of fixtures) {
      mockAdmin({
        domains: { data: { project_id: "p1", blocked_at: null }, error: null },
        projects: {
          data: { published_content: pc, blocked_at: null, ab_test_active: true },
          error: null,
        },
      });
      const res = await getPublishedHtmlByLabel("x");
      const splitDelivered = res.kind === "ok" && res.abTestActive === true;
      expect(splitDelivered).toBe(deliverableVariantB(pc) !== null);
    }
  });
});
