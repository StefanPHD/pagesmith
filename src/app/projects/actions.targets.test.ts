import { afterEach, describe, expect, it, vi } from "vitest";

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));

// Admin-Client-Mock. Zeichnet auf, WELCHE Tabelle in welcher Reihenfolge
// angesprochen wurde, WELCHE Zeile geschrieben, WELCHE Filter gesetzt und WELCHE
// SPALTEN selektiert wurden.
//
// DIE SPALTEN-AUFZEICHNUNG IST NICHT ZIERRAT: An ihr haengt die Zusage, dass der
// Indikator-Lesepfad die secret-Spalte NIE anfasst. Ohne sie liesse sich nur
// pruefen, DASS gelesen wird, nicht WAS.
const {
  createAdminClient,
  adminUpsert,
  adminTables,
  adminDeleteEq,
  adminSelectCols,
  adminSelectEq,
  setSelectResult,
} = vi.hoisted(() => {
  const adminUpsert = vi.fn<
    (row: unknown, options?: unknown) => {
      then: (onF: (v: unknown) => unknown) => unknown;
    }
  >(() => ({ then: (onF) => onF({ error: null }) }));
  const adminTables: string[] = [];
  const adminDeleteEq: [string, unknown][] = [];
  const adminSelectCols: string[] = [];
  const adminSelectEq: [string, unknown][] = [];
  let selectResult: { data?: unknown; error: unknown } = { data: [], error: null };
  const setSelectResult = (r: { data?: unknown; error: unknown }) => {
    selectResult = r;
  };
  const adminDelete = vi.fn(() => {
    const chain: Record<string, unknown> = {
      eq: (col: string, val: unknown) => {
        adminDeleteEq.push([col, val]);
        return chain;
      },
      then: (onF: (v: unknown) => unknown) => onF({ error: null }),
    };
    return chain;
  });
  const adminSelect = vi.fn((cols: string) => {
    adminSelectCols.push(cols);
    const chain: Record<string, unknown> = {
      eq: (col: string, val: unknown) => {
        adminSelectEq.push([col, val]);
        return chain;
      },
      then: (onF: (v: unknown) => unknown) => onF(selectResult),
    };
    return chain;
  });
  const createAdminClient = vi.fn(() => ({
    from: vi.fn((table: string) => {
      adminTables.push(table);
      return { upsert: adminUpsert, delete: adminDelete, select: adminSelect };
    }),
  }));
  return {
    createAdminClient,
    adminUpsert,
    adminTables,
    adminDeleteEq,
    adminSelectCols,
    adminSelectEq,
    setSelectResult,
  };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { listConfiguredTargets, removeCapiToken, setCapiToken } from "./actions";
// DIE ECHTEN KONSTANTEN, keine Literale: waechst die Ziel-Liste, waechst dieser
// Test mit, statt eine handgeschriebene Kopie zu pruefen.
import { TRACKING_TARGETS, type TrackingTarget } from "@/lib/settings";

/** Minimaler SSR-Client-Mock: Ownership-Gate + settings-Update. */
function makeClient(opts: { user: { id: string } | null; owned?: unknown }) {
  const rec = { fromTables: [] as string[] };
  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn((table: string) => {
      rec.fromTables.push(table);
      const b: Record<string, unknown> = {};
      b.select = vi.fn(() => b);
      b.eq = vi.fn(() => b);
      b.maybeSingle = vi.fn(async () => ({
        data: opts.owned === undefined ? { id: "proj-1", settings: {} } : opts.owned,
        error: null,
      }));
      b.update = vi.fn(() => b);
      b.then = (onF: (v: unknown) => unknown) => onF({ error: null });
      return b;
    }),
  };
  createClient.mockResolvedValue(client);
  return rec;
}

afterEach(() => {
  vi.clearAllMocks();
  adminTables.length = 0;
  adminDeleteEq.length = 0;
  adminSelectCols.length = 0;
  adminSelectEq.length = 0;
  setSelectResult({ data: [], error: null });
});

// ===========================================================================
// DIE ZWEITE ACHSE IN DEN SERVER-ACTIONS (Phase 11, sechste Scheibe, Haelfte A).
//
// Das Ownership-Gate prueft das PROJEKT. Der Ziel-Parameter ist eine ZWEITE Achse,
// und sie hat einen eigenen Waechter — sonst faenge erst der CHECK der
// Geheimnis-Tabelle einen unbekannten Wert, und zwar NACH dem Instanziieren des
// privilegierten Clients.
// ===========================================================================

describe("Unbekanntes Ziel wird abgewiesen — VOR jedem privilegierten Zugriff", () => {
  it("setCapiToken: unbekanntes Ziel -> Fehler, KEIN Admin-Client", async () => {
    // ROT DURCH M1 (Ziel-Pruefung entfernt): dann liefe der Aufruf durch bis zum
    // Upsert, und der privilegierte Client entstuende fuer eine Eingabe, die die
    // Datenbank ohnehin verwirft.
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "pintrest" as TrackingTarget, "S");
    expect(result).toEqual({ ok: false, error: "Unbekanntes Tracking-Ziel." });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpsert).not.toHaveBeenCalled();
  });

  it("removeCapiToken: unbekanntes Ziel -> Fehler, KEIN Admin-Client, KEIN DELETE", async () => {
    makeClient({ user: { id: "u1" } });
    const result = await removeCapiToken("proj-1", "pintrest" as TrackingTarget);
    expect(result).toEqual({ ok: false, error: "Unbekanntes Tracking-Ziel." });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminDeleteEq).toHaveLength(0);
  });

  it("die Abweisung sagt NICHTS ueber das Projekt — kein Zustands-Leck", () => {
    // Die Meldung nennt das ZIEL, nicht die Existenz oder Zugehoerigkeit des
    // Projekts. Ein Aufrufer erfaehrt aus ihr nichts, was er nicht schon wusste.
    expect("Unbekanntes Tracking-Ziel.").not.toContain("Projekt");
  });
});

describe("Ein gueltiges zweites Ziel schreibt seine EIGENE Zeile", () => {
  it("schreibt (project_id, target, secret) mit DIESEM Ziel", async () => {
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "pinterest", "  PIN-SECRET  ");
    expect(result).toEqual({ ok: true, trackingKey: expect.any(String) });
    expect(adminUpsert.mock.calls[0][0]).toEqual({
      project_id: "proj-1",
      target: "pinterest",
      secret: "PIN-SECRET",
    });
    expect(adminUpsert.mock.calls[0][1]).toEqual({ onConflict: "project_id,target" });
  });

  it("und fasst die ALT-TABELLE NICHT an (sie ist Metas Rollback-Reserve)", async () => {
    // ROT DURCH: ein bedingungsloser Doppelschreib. Der ueberschriebe
    // project_tokens.meta_capi_token mit einem FREMDEN Geheimnis — ein
    // Code-Rollback faende dann den falschen Wert vor, und der Meta-Forward liefe
    // mit Pinterests Zugangsdaten. Die Tabelle hat keine Ziel-Spalte; es gibt
    // keinen richtigen Wert, den man dort ablegen koennte.
    makeClient({ user: { id: "u1" } });
    await setCapiToken("proj-1", "pinterest", "PIN");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminUpsert).toHaveBeenCalledTimes(1);
  });

  it("META schreibt WEITERHIN in BEIDE Tabellen, neue zuerst (Bestandszusage)", async () => {
    // POSITIVKONTROLLE zum Test darueber: ohne sie zeigte er nur, dass IRGENDETWAS
    // die Alt-Tabelle ausspart — nicht, dass Meta sie weiterhin trifft.
    makeClient({ user: { id: "u1" } });
    await setCapiToken("proj-1", "meta", "META-SECRET");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
  });
});

describe("Der Loeschpfad trifft genau EIN Ziel", () => {
  it("filtert auf Projekt UND Ziel", async () => {
    // ROT DURCH: ein fehlender Ziel-Filter. Der loeschte die Geheimnisse ALLER
    // Ziele des Projekts, obwohl nur eines gemeint war.
    makeClient({ user: { id: "u1" } });
    const result = await removeCapiToken("proj-1", "pinterest");
    expect(result).toEqual({ ok: true });
    expect(adminDeleteEq).toEqual([
      ["project_id", "proj-1"],
      ["target", "pinterest"],
    ]);
  });

  it("bei einem NICHT-Meta-Ziel bleibt die Alt-Tabelle unberuehrt", async () => {
    makeClient({ user: { id: "u1" } });
    await removeCapiToken("proj-1", "pinterest");
    expect(adminTables).toEqual(["project_secrets"]);
  });

  it("META loescht WEITERHIN in BEIDEN Tabellen (Bestandszusage)", async () => {
    makeClient({ user: { id: "u1" } });
    await removeCapiToken("proj-1", "meta");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
  });
});

describe("Das Ownership-Gate bleibt die Projekt-Grenze", () => {
  it("fremdes Projekt + GUELTIGES Ziel -> Abbruch, KEIN Admin-Client", async () => {
    // Die zweite Achse ersetzt die erste nicht. Ein gueltiges Ziel bringt niemanden
    // in ein fremdes Projekt.
    makeClient({ user: { id: "u1" }, owned: null });
    const result = await setCapiToken("foreign", "pinterest", "S");
    expect(result).toEqual({ ok: false, error: "Projekt nicht gefunden." });
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("nicht eingeloggt + gueltiges Ziel -> Abbruch, KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await setCapiToken("proj-1", "pinterest", "S")).toEqual({
      ok: false,
      error: "Nicht eingeloggt.",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// DER INDIKATOR JE ZIEL — abgeleitet, nicht gefuehrt.
// ===========================================================================

describe("listConfiguredTargets", () => {
  it("liefert die Ziele mit hinterlegten Zugangsdaten", async () => {
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }, { target: "pinterest" }], error: null });
    expect(await listConfiguredTargets("proj-1")).toEqual(["meta", "pinterest"]);
  });

  it("SELEKTIERT NIE DAS GEHEIMNIS — nur die target-Spalte", async () => {
    // DER WAECHTER DER ZUGANGSDATEN-DISZIPLIN. Ein `select("*")` oder ein
    // mitgenommenes secret-Feld truege das Geheimnis in eine Server-Action-Antwort
    // und damit potenziell bis in den Client.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }], error: null });
    await listConfiguredTargets("proj-1");
    expect(adminSelectCols).toEqual(["target"]);
    expect(adminSelectCols.join(" ")).not.toContain("secret");
    expect(adminSelectCols.join(" ")).not.toContain("*");
  });

  it("EINE Runde fuer ALLE Ziele — die Zahl der Karten aendert die Abfragezahl nicht", async () => {
    // ROT DURCH: eine Abfrage je Ziel. Auf dem Ladepfad der Oberflaeche waere das
    // eine Runde mehr pro Plattform, ohne jeden Gewinn.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }, { target: "pinterest" }], error: null });
    await listConfiguredTargets("proj-1");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminSelectEq).toEqual([["project_id", "proj-1"]]);
  });

  it("verwirft Werte, die dieser Code nicht kennt", async () => {
    // Die DB kann nach einem Rollback auf eine aeltere Code-Fassung Werte tragen,
    // die hier unbekannt sind. Sie als Ziel auszugeben hiesse, der Oberflaeche eine
    // Karte anzubieten, die es nicht gibt.
    //
    // DER UNBEKANNTE WERT MUSS SYNTHETISCH SEIN, UND DAS IST DIE EIGENTLICHE
    // LEHRE DIESER ZEILE: Hier stand bis zur TikTok-Scheibe "tiktok" — ein
    // plausibler Zielname, der mit jener Scheibe REAL wurde. Der Test war damit
    // rot, ohne dass sich an dem geaendert haette, was er schuetzt. JEDER
    // plausible Anbietername kann spaeter real werden; "ga4", "custom",
    // "linkedin" sind dieselbe Falle mit Verzoegerung. Nur ein Wert, der
    // NIEMALS ein Ziel sein kann, haelt diesen Test unabhaengig von der
    // Ziel-Menge. Wer ihn ersetzt, waehlt wieder einen solchen.
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: [
        { target: "meta" },
        { target: "__kein_ziel__" },
        { target: null },
        {},
      ],
      error: null,
    });
    expect(await listConfiguredTargets("proj-1")).toEqual(["meta"]);
  });

  it("fremdes Projekt -> LEER und KEIN Admin-Client", async () => {
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await listConfiguredTargets("foreign")).toEqual([]);
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("nicht eingeloggt -> LEER und KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await listConfiguredTargets("proj-1")).toEqual([]);
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("DB-Fehler -> LEER, kein Wurf", async () => {
    // Leer heisst in der Oberflaeche "nicht konfiguriert" — im Zweifel die
    // SCHWAECHERE Behauptung. Ein Wurf brauchte einen Fehlerkanal, den diese
    // Haelfte nicht baut.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: null, error: { code: "42P01" } });
    await expect(listConfiguredTargets("proj-1")).resolves.toEqual([]);
  });

  it("kennt jedes Ziel der Liste — waechst sie, waechst der Test mit", async () => {
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: TRACKING_TARGETS.map((t) => ({ target: t })),
      error: null,
    });
    expect(await listConfiguredTargets("proj-1")).toEqual([...TRACKING_TARGETS]);
  });
});
