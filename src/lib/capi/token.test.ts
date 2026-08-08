import { afterEach, describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest) -> hier durch ein leeres Modul ersetzen, damit token.ts/admin.ts laden.
vi.mock("server-only", () => ({}));

// Den service_role-Admin-Client komplett mocken: die echte createAdminClient wuerde
// process.env.SUPABASE_SERVICE_ROLE_KEY brauchen und eine echte Verbindung bauen.
const { createAdminClient } = vi.hoisted(() => ({
  createAdminClient: vi.fn(),
}));
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { getCapiConfigByTrackingKey } from "./token";

/**
 * Baut einen minimalen, chainbaren Supabase-Client-Mock. Pro Tabelle ein
 * vorkonfiguriertes Ergebnis. select()/eq()/in() geben den Builder zurueck.
 *
 * ZWEI ENDEN, und das ist seit Phase 11 Scheibe 7 noetig: Die projects-Abfrage endet
 * auf maybeSingle() (EINE Zeile), die Geheimnis-Abfrage endet auf NICHTS — sie darf
 * mehrere Zeilen liefern und wird direkt awaited. Der echte PostgREST-Builder ist
 * dafuer thenable; dieser Mock ist es jetzt auch. Ohne das `then` liefe ein `await`
 * auf den Builder in den Builder selbst und der Resolver bekaeme kein data/error.
 */
function mockAdmin(results: Record<string, { data: unknown; error: unknown }>) {
  const from = vi.fn((table: string) => {
    const result = () => results[table] ?? { data: null, error: null };
    const builder: Record<string, unknown> = {};
    builder.select = vi.fn(() => builder);
    builder.eq = vi.fn(() => builder);
    builder.in = vi.fn(() => builder);
    builder.maybeSingle = vi.fn(async () => result());
    builder.then = (
      onOk: (v: unknown) => unknown,
      onErr?: (e: unknown) => unknown,
    ) => Promise.resolve(result()).then(onOk, onErr);
    return builder;
  });
  createAdminClient.mockReturnValue({ from });
  return { from };
}

// Ein projects-Ergebnis mit gesetzter Meta-Pixel-ID (Standard-Happy-Case).
function projectWithPixel(id: string, pixelId: string) {
  return {
    data: { id, settings: { pixels: { meta: { pixelId } } } },
    error: null,
  };
}

/** Die Geheimnis-ZEILEN einer Abfrage — seit Scheibe 7 eine Liste, keine Einzelzeile. */
function secretRows(rows: { target: string; secret: string | null }[]) {
  return { data: rows, error: null };
}

/** Der aufgeloeste Meta-Empfaenger, wie ihn die Menge traegt. */
const META_ENTRY = {
  target: "meta",
  config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" },
};

afterEach(() => {
  vi.clearAllMocks();
});

describe("getCapiConfigByTrackingKey (Scheibe 2b-i)", () => {
  it("Scheibe 2b-0: filtert auf die Spalte tracking_key (nicht mehr den settings-JSON-Pfad)", async () => {
    const eqSpy = vi.fn();
    const from = vi.fn((table: string) => {
      const builder: Record<string, unknown> = {};
      builder.select = vi.fn(() => builder);
      builder.eq = vi.fn((col: string, val: unknown) => {
        eqSpy(col, val);
        return builder;
      });
      builder.maybeSingle = vi.fn(async () =>
        table === "projects"
          ? {
              data: {
                id: "proj-1",
                settings: { pixels: { meta: { pixelId: "PIXEL-123" } } },
                blocked_at: null,
              },
              error: null,
            }
          : { data: [{ target: "meta", secret: "SECRET-TOKEN" }], error: null }
      );
      builder.in = vi.fn(() => builder);
      builder.then = (
        onOk: (v: unknown) => unknown,
        onErr?: (e: unknown) => unknown,
      ) =>
        Promise.resolve(
          table === "projects"
            ? { data: null, error: null }
            : { data: [{ target: "meta", secret: "SECRET-TOKEN" }], error: null },
        ).then(onOk, onErr);
      return builder;
    });
    createAdminClient.mockReturnValue({ from });

    await getCapiConfigByTrackingKey("tk-abc");
    // Die Aufloesungs-Achse ist die server-autoritative Spalte, nicht settings->capi->>trackingKey.
    expect(eqSpy).toHaveBeenCalledWith("tracking_key", "tk-abc");
    expect(eqSpy).not.toHaveBeenCalledWith("settings->capi->>trackingKey", "tk-abc");
  });

  // Phase 11 Scheibe 1 — DIE LESEQUELLE. Der einzige Test, der die UMSTELLUNG selbst
  // festnagelt: faellt er weg, koennte der Resolver unbemerkt wieder die Alt-Tabelle
  // lesen, und die Umstellung waere nur noch in der Doku wahr.
  it("Phase 11 Scheibe 1: das Geheimnis kommt aus project_secrets — project_tokens wird NICHT mehr gelesen", async () => {
    const { from } = mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });

    const res = await getCapiConfigByTrackingKey("tk-abc");
    expect(res?.targets).toEqual([META_ENTRY]);

    // POSITIVKONTROLLE fuer die Abwesenheits-Behauptung darunter: die Aufzeichnung ist
    // nachweislich gefuellt. Ohne sie ginge ein not.toHaveBeenCalledWith auch dann auf,
    // wenn der Mock gar nichts mitschreibt.
    expect(from).toHaveBeenCalledWith("projects");
    expect(from).toHaveBeenCalledWith("project_secrets");
    expect(from).not.toHaveBeenCalledWith("project_tokens");
    // GENAU ZWEI Abfragen: die Umstellung TAUSCHT eine, sie ergaenzt keine
    // (/api/e-Schlankheit auf dem meistgetroffenen Pfad der Plattform).
    expect(from).toHaveBeenCalledTimes(2);
  });

  // Phase 11 Scheibe 7 — DIE RUNDENZAHL WAECHST NICHT MIT DER ZAHL DER ZIELE.
  //
  // WARUM DIESER TEST ZWEI ZIELE BRAUCHT und der Zwei-Runden-Waechter darueber nicht
  // genuegt: Bei EINEM Ziel sind "eine Runde fuer alle" und "eine Runde JE Ziel"
  // dasselbe — der Waechter oben ginge auch dann auf, wenn der Resolver je Ziel
  // fragte. Erst ein zweites Ziel trennt die beiden Faelle. Der Test ist damit der
  // EINZIGE, der Invariante 2 gegen einen Rueckfall auf eine Abfrage je Ziel deckt.
  it("Scheibe 7: ZWEI Ziele -> immer noch GENAU ZWEI Abfragen, Reihenfolge deterministisch", async () => {
    const { from } = mockAdmin({
      projects: {
        data: {
          id: "proj-1",
          settings: {
            pixels: {
              meta: { pixelId: "PIXEL-123" },
              pinterest: { pixelId: "TAG-987" },
            },
          },
          blocked_at: null,
        },
        error: null,
      },
      // Absichtlich in UMGEKEHRTER Reihenfolge: die Ausgabe darf NICHT von der
      // Zeilenfolge der Datenbank abhaengen, sondern folgt TRACKING_TARGETS.
      project_secrets: secretRows([
        { target: "pinterest", secret: "PIN-SECRET" },
        { target: "meta", secret: "SECRET-TOKEN" },
      ]),
    });

    const res = await getCapiConfigByTrackingKey("tk-abc");

    expect(from).toHaveBeenCalledTimes(2);
    expect(res?.targets).toEqual([
      META_ENTRY,
      { target: "pinterest", config: { pixelId: "TAG-987", token: "PIN-SECRET" } },
    ]);
  });

  // Phase 11 Scheibe 7 — DIE PAARUNG JE ZIEL. Ein halbes Ziel ist KEIN Empfaenger.
  //
  // BEIDE RICHTUNGEN IN EINEM TEST, und das ist Absicht: Sie scheitern verschieden.
  // Ohne Pixel-ID fragt der Resolver das Geheimnis gar nicht erst ab; ohne Geheimnis
  // faellt das Ziel erst bei der Paarung heraus. Deckte der Test nur eine Richtung,
  // liesse die andere ein Ziel mit den Zugangsdaten eines fremden laufen.
  it("Scheibe 7: nur VOLLSTAENDIGE Paare werden Empfaenger (Pixel ohne Geheimnis und umgekehrt fallen heraus)", async () => {
    mockAdmin({
      projects: {
        data: {
          id: "proj-1",
          settings: {
            pixels: {
              meta: { pixelId: "PIXEL-123" },
              // pinterest hat ein Geheimnis, aber KEINE Pixel-ID.
            },
          },
          blocked_at: null,
        },
        error: null,
      },
      project_secrets: secretRows([
        { target: "meta", secret: "SECRET-TOKEN" },
        { target: "pinterest", secret: "PIN-SECRET" },
      ]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [META_ENTRY],
    });
  });

  // Phase 11 Scheibe 1 — TIPPFEHLER-WAECHTER FUER DIE NEUE TABELLE, nach dem Muster des
  // 9b-2-Waechters darunter. Der Builder-Mock akzeptiert JEDE Select-Liste und JEDEN
  // Filter; ohne diesen Test waere ein falscher Spalten- oder Zielwert von nichts
  // gedeckt — und er faellt nicht laut aus, sondern liefert schlicht keine Zeile:
  // capiConfig null, weiter leere 204, Server-Forward tot.
  // DER ZIELWERT STEHT HIER ALS LITERAL, NICHT als importierte Konstante: der Test soll
  // den WIRE-Wert festnageln. Zoege er die Konstante mit, ruschte eine Aenderung an ihr
  // gruen durch.
  it("TIPPFEHLER-WAECHTER: select('target, secret'), eq(project_id) UND in(target, ['meta'])", async () => {
    const calls: {
      table: string;
      cols: string;
      eqs: [string, unknown][];
      ins: [string, unknown][];
    }[] = [];
    const from = vi.fn((table: string) => {
      const entry = {
        table,
        cols: "",
        eqs: [] as [string, unknown][],
        ins: [] as [string, unknown][],
      };
      calls.push(entry);
      const builder: Record<string, unknown> = {};
      builder.select = vi.fn((cols: string) => {
        entry.cols = cols;
        return builder;
      });
      builder.eq = vi.fn((col: string, val: unknown) => {
        entry.eqs.push([col, val]);
        return builder;
      });
      builder.maybeSingle = vi.fn(async () =>
        table === "projects"
          ? {
              data: {
                id: "proj-1",
                settings: { pixels: { meta: { pixelId: "PIXEL-123" } } },
                blocked_at: null,
              },
              error: null,
            }
          : { data: [{ target: "meta", secret: "SECRET-TOKEN" }], error: null }
      );
      builder.in = vi.fn((col: string, vals: unknown) => {
        entry.ins.push([col, vals]);
        return builder;
      });
      builder.then = (
        onOk: (v: unknown) => unknown,
        onErr?: (e: unknown) => unknown,
      ) =>
        Promise.resolve(
          table === "projects"
            ? { data: null, error: null }
            : { data: [{ target: "meta", secret: "SECRET-TOKEN" }], error: null },
        ).then(onOk, onErr);
      return builder;
    });
    createAdminClient.mockReturnValue({ from });

    await getCapiConfigByTrackingKey("tk-abc");

    const secrets = calls.find((c) => c.table === "project_secrets");
    if (!secrets) throw new Error("kein Zugriff auf project_secrets aufgezeichnet");
    expect(secrets.cols).toBe("target, secret");
    // Der Projekt-Filter bleibt eine Gleichheit …
    expect(secrets.eqs).toEqual([["project_id", "proj-1"]]);
    // … der Ziel-Filter ist seit Scheibe 7 eine MENGE. Er bleibt der Filter, der ein
    // Ziel davor schuetzt, den Pfad eines anderen mit fremden Zugangsdaten zu lesen.
    expect(secrets.ins).toEqual([["target", ["meta"]]]);
  });

  // Scheibe 9b-2 — DER TIPPFEHLER-WAECHTER. Der Builder-Mock oben gibt sich mit JEDER
  // Select-Liste zufrieden; ein falsch geschriebener Spaltenname waere damit von keinem
  // Test gedeckt. In Produktion waere er NICHT harmlos: PostgREST antwortet mit einem
  // Fehler, der Resolver returnt null (projectError-Pfad) — und dann steht der Persist UND
  // der CAPI-Forward fuer ALLE Projekte still, ohne dass irgendwo etwas rot wird. Genau
  // die stille Klasse, die hier sonst per Test festgenagelt wird.
  //
  // Der Test sichert zugleich Invariante I10: EINE Projektion, KEINE zweite Query.
  it("Scheibe 9b-2: EINE Projektion traegt id, settings, blocked_at UND ab_test_active", async () => {
    const selectSpy = vi.fn();
    const from = vi.fn(() => {
      const builder: Record<string, unknown> = {};
      builder.select = vi.fn((cols: string) => {
        selectSpy(cols);
        return builder;
      });
      builder.eq = vi.fn(() => builder);
      builder.maybeSingle = vi.fn(async () => ({ data: null, error: null }));
      return builder;
    });
    createAdminClient.mockReturnValue({ from });

    await getCapiConfigByTrackingKey("tk-abc");

    expect(selectSpy).toHaveBeenCalledWith("id, settings, blocked_at, ab_test_active");
    // Die projects-Projektion ist die EINZIGE Query auf diesem Pfad (Projekt nicht
    // gefunden -> frueher Return): kein zweiter Roundtrip fuer das Varianten-Gate.
    expect(from).toHaveBeenCalledTimes(1);
  });

  // POSITIV-GEGENPROBE zu den vielen abTestActive:false oben — ohne sie bewiesen die
  // nur, dass irgendwo ein konstantes false steht. Hier traegt die Zeile true, und der
  // Resolver muss es MELDEN: der Handler haengt sein Varianten-Gate daran.
  it("Scheibe 9b-2: ab_test_active=true wird als abTestActive:true gemeldet", async () => {
    mockAdmin({
      projects: {
        data: {
          id: "proj-1",
          settings: { pixels: { meta: { pixelId: "PIXEL-123" } } },
          blocked_at: null,
          ab_test_active: true,
        },
        error: null,
      },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: true,
      targets: [META_ENTRY],
    });
  });

  it("loest trackingKey -> { projectId, capiConfig } auf (eine Aufloesung)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    // Phase 8 Scheibe 1: die projectId reitet in DERSELBEN Aufloesung mit (sie wurde
    // vorher intern schon aufgeloest und verworfen) -> KEINE zweite Query.
    expect(await getCapiConfigByTrackingKey("tk-abc")).toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [META_ENTRY],
    });
  });

  it("leerer Key -> null (ohne DB-Aufruf)", async () => {
    const { from } = mockAdmin({});
    expect(await getCapiConfigByTrackingKey("   ")).toBeNull();
    // createAdminClient wird gar nicht erst aufgerufen -> kein DB-Zugriff.
    expect(from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("unbekannter trackingKey (kein Projekt) -> null", async () => {
    mockAdmin({
      projects: { data: null, error: null },
      project_secrets: secretRows([{ target: "meta", secret: "x" }]),
    });
    expect(await getCapiConfigByTrackingKey("tk-missing")).toBeNull();
  });

  // ROBUSTHEIT-Block: alle vier Faelle bedeuten "kein Forward-Ziel" -> capiConfig null.
  // Fuer den CAPI-Zweig ist das gleichbedeutend mit dem frueheren null (kein fetch, 204);
  // die projectId wird trotzdem geliefert, weil das Projekt existiert und OFFEN ist.
  it("ROBUSTHEIT: Projekt ohne Meta-Pixel-ID -> capiConfig null (kein Forward-Ziel)", async () => {
    mockAdmin({
      projects: { data: { id: "proj-1", settings: {} }, error: null },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("ROBUSTHEIT: trackingKey + Pixel gesetzt, aber project_secrets-Zeile fehlt -> capiConfig null (kein Throw)", async () => {
    // Projekt hat trackingKey + Pixel, aber der Token wurde nie gesetzt (oder Race).
    // Muss sauber aufloesen, nicht werfen.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: { data: [], error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("ROBUSTHEIT: Token-Zeile vorhanden, aber Token null -> capiConfig null", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: null }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("DB-Fehler beim Token-Read -> capiConfig null (kein Throw)", async () => {
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: { data: null, error: { message: "boom" } },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  // Diese Zusicherung bleibt UNVERAENDERT und ist der teuerste Teil des Kill-Switches:
  // bei gesperrtem Projekt wird die Token-Query gar nicht erst gestellt. Der frueche
  // Return bleibt also frueh — nur SEIN RUECKGABEWERT aendert sich (s. naechster Test).
  it("KILL-SWITCH: gesperrtes Projekt -> Token-Query NICHT ausgefuehrt (frueher Return bleibt frueh)", async () => {
    const { from } = mockAdmin({
      projects: {
        data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "PIXEL-123" } } }, blocked_at: "2026-07-14T00:00:00Z" },
        error: null,
      },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    await getCapiConfigByTrackingKey("tk-abc");
    // Frueh-Verwerfen VOR der Geheimnis-Aufloesung: project_secrets wird nie abgefragt.
    // MIT DER SCHEIBE NACHGEZOGEN, und das war Pflicht: stuende hier weiter
    // "project_tokens", waere die Zusicherung HOHL — der Resolver fragt diese Tabelle
    // seit der Umstellung in KEINEM Pfad mehr, die Behauptung ginge also immer auf.
    expect(from).not.toHaveBeenCalledWith("project_secrets");
  });

  it("KILL-SWITCH Gegenprobe: ungesperrtes Projekt (blocked_at null) -> CapiConfig wie bisher", async () => {
    mockAdmin({
      projects: {
        data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "PIXEL-123" } } }, blocked_at: null },
        error: null,
      },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    expect(await getCapiConfigByTrackingKey("tk-abc")).toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [META_ENTRY],
    });
  });

  // INVERTIERT in Scheibe 2a (bewusst, NICHT "bis gruen angepasst"):
  //
  // VORHER forderte dieser Test "gesperrt -> die GANZE Aufloesung ist null". Das war in
  // Couple-minimal richtig, weil der Persist im capiConfig-Zweig hing: null traf beides
  // (Forward UND Persist) mit EINEM Guard. Der Schutz war ein NEBENEFFEKT.
  //
  // Mit der Entkopplung persistiert der Handler auch OHNE CapiConfig. Ein null wuerde
  // "gesperrt" von "unbekannter Key" ununterscheidbar machen und den Kill-Switch damit an
  // einen Zufall binden. Deshalb wandert der Schutz an eine SICHTBARERE Stelle: der
  // Resolver MELDET blocked:true, der Handler verzweigt EXPLIZIT darauf (ingest.ts) und
  // verwirft vor Persist und Forward. Dieser Test sichert jetzt die Meldung ab; die
  // Wirkung sichert ingest.persist.test.ts (c).
  it("KILL-SWITCH: gesperrtes Projekt MELDET blocked:true (statt die Aufloesung zu verschlucken)", async () => {
    mockAdmin({
      projects: {
        data: {
          id: "proj-1",
          settings: { pixels: { meta: { pixelId: "PIXEL-123" } } },
          blocked_at: "2026-07-14T00:00:00Z",
        },
        error: null,
      },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: true,
      abTestActive: false,
      // KEINE Empfaenger bei gesperrt — Geheimnisse werden gar nicht erst gelesen.
      targets: [],
    });
  });
});
