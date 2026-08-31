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

  // =====================================================================
  // N1 / N2 / N3 — DIE LEER-REGELN DIESES PFADES (Phase 11, Scheibe B1).
  //
  // WARUM SIE MIT DER SCHEIBE ENTSTEHEN, obwohl sie KEIN neues Verhalten pruefen:
  // Die Uebernahme der beiden Bedingungen aus tracking/target-readiness ist
  // verhaltensneutral, und die Frage war, ob diese Neutralitaet bewacht ist.
  //
  // HIER STAND EINE ANNAHME, DIE DIE MESSUNG WIDERLEGT HAT, und sie steht hier
  // berichtigt statt gestrichen — weil die Widerlegung die eigentliche Auskunft ist:
  // Angenommen war, eine Aufweichung der Nicht-Leere-Pruefung liesse "ein Ziel mit
  // leerem Zugangsdatum in den Forward laufen"; Grundlage war eine formale Suche
  // ueber src/ nach einer Fixture mit leerer Zeichenkette als Geheimnis (2026-08-12,
  // KEIN Treffer).
  // GEMESSEN (Mutationsproben M2/M3 am 2026-08-13): Das trifft NICHT zu. Ein solches Ziel wird auch
  // dann kein Empfaenger, wenn hasSecret vollstaendig kaputt ist — die Paarung unten
  // verwirft falsy Werte ein ZWEITES Mal (`if (!token) continue` in
  // getCapiConfigByTrackingKey). EINE SUCHE OHNE TREFFER BELEGT EINE LUECKE ERST,
  // WENN DER PFAD DANEBEN MITGELESEN IST.
  // WAS BLEIBT: Die Achse ist bewacht — aber von N3, nicht von N1.
  // =====================================================================

  it("N1: ein Geheimnis, das die LEERE Zeichenkette ist, macht das Ziel NICHT zum Empfaenger", async () => {
    // ER IST NICHT DER WAECHTER DIESER ACHSE — und diese Richtigstellung steht hier,
    // weil der Zuschnitt das Gegenteil annahm und die MESSUNG es widerlegt hat
    // (Mutationsprobe M2 am 2026-08-13: hasSecret auf reine Existenz reduziert ->
    // dieser Test blieb GRUEN). Der Grund ist ein ZWEITER, unabhaengiger Riegel
    // tiefer im Pfad: die Paarung liest das Geheimnis ueber `secretByTarget.get(...)`
    // und verwirft es bei `if (!token) continue` — "" ist falsy und faellt dort
    // ohnehin heraus. Gegen eine Aufweichung des Praedikats ist dieser Test damit
    // BLIND: die gepruefte Wirkung kann aus einem anderen Grund gar nicht eintreten.
    // WER DIESE ACHSE WIRKLICH BEWACHT, IST N3 (direkt darunter) — er waehlt einen
    // TRUTHY Wert und laeuft deshalb am Falsy-Riegel vorbei.
    //
    // WARUM ER TROTZDEM BLEIBT: Seine Zusicherung ist wahr und wertvoll, und sie
    // stand vorher nirgends im Repo — eine Zeile mit leerem Geheimnis wird kein
    // Empfaenger. Er sichert das ERGEBNIS des Pfades, nicht die Bedingung, aus der
    // es folgt. Er ist damit auch der Wachposten fuer den Fall, dass jemand den
    // Falsy-Riegel entfernt UND das Praedikat aufweicht.
    // WIRD ROT, WENN: BEIDE Riegel gleichzeitig fallen.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: "" }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("N2: ein Geheimnis aus reinem LEERRAUM macht das Ziel sehr wohl zum Empfaenger", async () => {
    // ABGEBILDETER BESTAND, KEINE NACHLAESSIGKEIT. Die Kennung laeuft durch getPixelId
    // und ist getrimmt; das Zugangsdatum wird hier NICHT getrimmt. Die beiden
    // Leer-Regeln dieses Pfades sind damit ASYMMETRISCH — das sieht wie ein Fehler aus
    // und ist der gemessene Bestand.
    // WIRD ROT, WENN: jemand die beiden Regeln "harmonisiert" und im Geheimnis-Zweig
    // einen Trim ergaenzt. Das waere eine Verhaltensaenderung auf dem meistgetroffenen
    // Pfad der Plattform, getarnt als Aufraeumen — ohne diesen Test bliebe sie gruen.
    // ER BEHAUPTET NICHT, DASS DAS RICHTIG IST. Er behauptet, dass es SO IST; eine
    // Aenderung daran ist eine Entscheidung und kein Nebenbei.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: " " }]),
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [{ target: "meta", config: { pixelId: "PIXEL-123", token: " " } }],
    });
  });

  it("N3: ein TRUTHY Nicht-String als Geheimnis macht das Ziel NICHT zum Empfaenger", async () => {
    // DER EINZIGE TEST, DER EINE AUFWEICHUNG DES GETEILTEN PRAEDIKATS AUF DIESER
    // SEITE SICHTBAR MACHT — und das gehoert in seinen Kommentar, sonst entfernt ihn
    // spaeter jemand als Variante von N1 und nimmt die einzige Abdeckung mit.
    //
    // WARUM GERADE DIESE FIXTURE, und sie ist der ganze Ertrag der Mutationsrunde:
    // Der Falsy-Riegel in der Paarung (`if (!token) continue`) faengt "" und null —
    // deshalb bleibt N1 gruen, wenn hasSecret aufweicht (GEMESSEN, M2 am 2026-08-13).
    // Eine ZAHL ist truthy und passiert diesen Riegel. Heute wird sie trotzdem
    // verworfen, weil hasSecret auf `typeof === "string"` besteht; faellt diese
    // Haelfte, landet der Wert in der Map und von dort als `token` in der
    // CapiConfig — deren Vertrag eine Zeichenkette nennt — und damit im Adapter.
    // WIRD ROT, WENN: hasSecret Nicht-Strings durchlaesst (reine Existenz-Pruefung).
    //
    // DIE GRENZE, WOERTLICH: DIESER TEST SICHERT NUR, DASS KEIN EMPFAENGER ENTSTEHT.
    // Was geschaehe, wenn ein Nicht-String bis in den Adapter liefe, ist UNGEMESSEN.
    // Dass das geteilte Schwaerz-Primitiv (redactOpaque in lib/redact.ts) bei
    // Nicht-Strings ausdruecklich WIRFT und ein Wurf auf diesem Pfad die garantierte
    // leere 204 braeche, ist ein NACHBAR-Befund aus dem Vorrat — KEINE Aussage
    // dieses Tests. Er behauptet darueber nichts, und er soll es nicht.
    //
    // DIE FIXTURE STEHT ROH STATT UEBER secretRows: jener Helfer typisiert das
    // Geheimnis als `string | null`, und genau das ist hier der Gegenstand. Ihn zu
    // weiten haette alle anderen Fixtures mit umgestellt, fuer die die enge
    // Typisierung richtig ist.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: { data: [{ target: "meta", secret: 42 }], error: null },
    });
    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
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

// ===========================================================================
// SCHEIBE 11.1e — DER WEG ZUM EMPFAENGER.
//
// Ein Ziel, dessen Kennung JE EREIGNISTYP gilt (heute LinkedIn), wird zum
// ResolvedTarget, OHNE dass etwas gesendet wird — der Adapter-Riegel in
// dispatchForward (capi/ingest.ts) laesst es danach fallen.
//
// DER PRUEFLING IST DIE RUECKGABE DES RESOLVERS, NICHT DER HANDLER, und das ist die
// tragende Entscheidung dieses Blocks: Am Handler ist ein entstandener Empfaenger
// NICHT beobachtbar — er faellt am Adapter-Gate heraus, ohne Logzeile, ohne
// Nutzlast, ohne Zaehlung. Ein Test ueber den Handler bliebe gruen, gleichgueltig ob
// das Ziel aufgeloest wird oder nicht (GEMESSEN am Code, 2026-08-18: der
// linkedin-Lauf in capi/fan-out.test.ts tut genau das und sichert die NICHT-Wirkung,
// nicht das Entstehen).
// ===========================================================================

/** Ein projects-Ergebnis mit einer Zuordnung fuer LinkedIn und WAHLWEISE einem Skalar. */
function projectWithRules(
  id: string,
  rules: Record<string, string>,
  metaPixelId?: string,
) {
  return {
    data: {
      id,
      settings: {
        pixels: {
          ...(metaPixelId ? { meta: { pixelId: metaPixelId } } : {}),
          linkedin: { conversionRules: rules },
        },
      },
    },
    error: null,
  };
}

const URN = "urn:lla:llaPartnerConversion:1234567";

describe("Scheibe 11.1e: die zweite Kennungsform wird zum Empfaenger", () => {
  it("E1: Zuordnung OHNE Skalar plus Geheimnis -> linkedin ist Empfaenger, die Zuordnung ist angekommen", async () => {
    // DER KERN DER SCHEIBE. WIRD ROT, WENN der Filter die zweite Kennungsform nicht
    // kennt, wenn der Fruehausstieg vorher greift, oder wenn die Zuordnung auf dem
    // Weg zum Empfaenger verlorengeht.
    // DIE LEERE KENNUNG IM config IST TEIL DER ZUSAGE, nicht ein Schoenheitsfehler:
    // Das Ziel traegt keinen Skalar, und die Paarungsschleife baut deshalb eine
    // CapiConfig mit pixelId "". Der Nachtrag am Typ CapiConfig haelt fest, dass KEIN
    // Compiler-Riegel das faengt — dieser Test ist die einzige Stelle, die den
    // Zustand ueberhaupt festnagelt.
    mockAdmin({
      projects: projectWithRules("proj-1", { Lead: URN }),
      project_secrets: secretRows([{ target: "linkedin", secret: "LI-SECRET" }]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [
        {
          target: "linkedin",
          config: { pixelId: "", token: "LI-SECRET" },
          conversionRules: { Lead: URN },
        },
      ],
    });
  });

  it("E2: HALBES PAAR, Richtung A — Zuordnung ohne Geheimnis -> KEIN Empfaenger", async () => {
    // Die Paarungsschleife ueberspringt mit `if (!token) continue`. WIRD ROT, WENN
    // die zweite Kennungsform an der Paarung vorbeikaeme — dann liefe ein Ziel ohne
    // Zugangsdatum als Empfaenger, und der Adapter braeuchte spaeter einen eigenen
    // Riegel dafuer.
    mockAdmin({
      projects: projectWithRules("proj-1", { Lead: URN }),
      project_secrets: secretRows([]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("E3: HALBES PAAR, Richtung B — Geheimnis ohne Zuordnung und ohne Skalar -> KEIN Empfaenger", async () => {
    // BEIDE RICHTUNGEN GETRENNT, weil sie VERSCHIEDEN scheitern (dieselbe Begruendung
    // wie beim Paarungs-Test der Scheibe 7): Hier faellt das Ziel schon aus dem
    // Filter und steht gar nicht erst im in-Filter der Geheimnis-Abfrage; in E2
    // faellt es erst bei der Paarung heraus.
    mockAdmin({
      projects: {
        data: { id: "proj-1", settings: { pixels: { linkedin: {} } } },
        error: null,
      },
      project_secrets: secretRows([{ target: "linkedin", secret: "LI-SECRET" }]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("E4: eine Zuordnung aus LEEREN Werten ist KEINE Kennung -> KEIN Empfaenger", async () => {
    // Die Gegenprobe zu E1, und ohne sie waere jener trivial erfuellbar: Ein Filter,
    // der schlicht die ANWESENHEIT des Feldes liest, bestuende E1 und faellt hier.
    mockAdmin({
      projects: projectWithRules("proj-1", { Lead: "", Purchase: "   " }),
      project_secrets: secretRows([{ target: "linkedin", secret: "LI-SECRET" }]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
  });

  it("E5: das LINKEDIN-ONLY-Projekt passiert den Fruehausstieg — die Geheimnis-Abfrage LAEUFT", async () => {
    // DER FRUEHAUSSTIEG IST DIE ZWEITE HAELFTE DERSELBEN AENDERUNG: Bliebe er an der
    // Skalar-Frage haengen, kehrte dieses Projekt VOR der Geheimnis-Abfrage zurueck,
    // und das Ziel koennte NIE Empfaenger werden — E1 waere dann rot, aber aus einem
    // ANDEREN Grund als dem, den E1 misst. Dieser Test trennt die beiden.
    // GEMESSEN WIRD DIE ZAHL DER ABFRAGEN, nicht das Ergebnis: zwei statt einer.
    const { from } = mockAdmin({
      projects: projectWithRules("proj-1", { Lead: URN }),
      project_secrets: secretRows([{ target: "linkedin", secret: "LI-SECRET" }]),
    });

    await getCapiConfigByTrackingKey("tk-abc");

    expect(from).toHaveBeenCalledWith("projects");
    expect(from).toHaveBeenCalledWith("project_secrets");
    expect(from).toHaveBeenCalledTimes(2);
  });

  it("E6: ein Projekt OHNE jede Kennung bleibt beim Fruehausstieg — EINE Abfrage", async () => {
    // DIE POSITIVKONTROLLE ZU E5. Ohne sie zeigte E5 nur, dass zwei Abfragen laufen —
    // nicht, dass der Fruehausstieg ueberhaupt noch jemanden abfaengt. Faellt er weg,
    // liefe die Geheimnis-Abfrage fuer JEDEN Beacon JEDES unkonfigurierten Projekts,
    // auf dem meistgetroffenen Pfad der Plattform, und KEIN anderer Test saehe es.
    const { from } = mockAdmin({
      projects: { data: { id: "proj-1", settings: {} }, error: null },
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      targets: [],
    });
    expect(from).toHaveBeenCalledTimes(1);
  });

  it("E7: das Feld ist UNDEFINIERT und NIE ein leeres Objekt, wenn ein Ziel keine Zuordnung traegt", async () => {
    // WELCHE FEHLERKLASSE DIESER TEST ALLEIN FAENGT (Pflicht-Kommentar): Er ist der
    // EINZIGE Waechter darueber, dass die Paarungsschleife "leere Zuordnung" in "Feld
    // nicht gesetzt" UEBERSETZT. Faellt die Umformung weg, traegt JEDER Empfaenger
    // ein conversionRules: {} — der Compiler schweigt, das Verhalten aendert sich
    // nicht, und der Schaden zeigt sich ausschliesslich an ZWOELF
    // Ganz-Objekt-Vergleichen weiter oben in dieser Datei, deren Ursache dann in
    // einer ANDEREN Datei steht.
    // GEMESSEN am 2026-08-18 (vitest 4.1.8): toEqual ignoriert einen Schluessel mit
    // dem Wert undefined auf jeder Ebene, ein leeres Objekt dagegen NICHT. Genau
    // diese Asymmetrie macht die Umformung noetig — und genau sie macht ihren Verlust
    // an zwoelf fremden Stellen sichtbar statt hier.
    // DESHALB PRUEFT ER DIE ANWESENHEIT DES SCHLUESSELS, nicht seinen Wert: ein
    // toEqual auf das Objekt koennte den Unterschied gar nicht sehen.
    mockAdmin({
      projects: projectWithPixel("proj-1", "PIXEL-123"),
      project_secrets: secretRows([{ target: "meta", secret: "SECRET-TOKEN" }]),
    });

    const res = await getCapiConfigByTrackingKey("tk-abc");
    const meta = res?.targets[0];

    expect(meta?.target).toBe("meta");
    expect(meta?.conversionRules).toBeUndefined();
    expect(
      Object.prototype.hasOwnProperty.call(meta ?? {}, "conversionRules"),
    ).toBe(false);
  });

  it("E8: ein Ziel MIT Skalar UND Zuordnung traegt beides", async () => {
    // Die dritte Konstellation neben "nur Skalar" (Bestand) und "nur Zuordnung" (E1).
    // Sie ist heute nicht bedienbar — die LinkedIn-Karte fuehrt kein oeffentliches
    // Feld (11.1a) —, aber der Blob nimmt sie an, und der Resolver darf dabei weder
    // die eine noch die andere Form verlieren.
    mockAdmin({
      projects: projectWithRules("proj-1", { Lead: URN }, "PIXEL-123"),
      project_secrets: secretRows([
        { target: "meta", secret: "SECRET-TOKEN" },
        { target: "linkedin", secret: "LI-SECRET" },
      ]),
    });

    await expect(getCapiConfigByTrackingKey("tk-abc")).resolves.toEqual({
      projectId: "proj-1",
      blocked: false,
      abTestActive: false,
      // Die Reihenfolge folgt TRACKING_TARGETS, nicht der Zeilenfolge der Datenbank.
      targets: [
        { target: "meta", config: { pixelId: "PIXEL-123", token: "SECRET-TOKEN" } },
        {
          target: "linkedin",
          config: { pixelId: "", token: "LI-SECRET" },
          conversionRules: { Lead: URN },
        },
      ],
    });
  });

  it("E9: der in-Filter traegt linkedin NUR, wenn eine Zuordnung vorliegt", async () => {
    // DIESELBE AUFZEICHNUNGS-TECHNIK WIE DER TIPPFEHLER-WAECHTER weiter oben, und
    // bewusst als ZWEI Laeufe in EINEM Test: Der Preis dieser Scheibe ist, dass der
    // in-Filter um ein Ziel waechst — die Zusage ist, dass er es NUR fuer Projekte
    // tut, die LinkedIn konfiguriert haben. Ein Lauf allein zeigte immer nur eine
    // Haelfte davon.
    async function inFilterFor(projects: { data: unknown; error: unknown }) {
      const ins: [string, unknown][] = [];
      const from = vi.fn((table: string) => {
        const builder: Record<string, unknown> = {};
        const result = () =>
          table === "projects"
            ? projects
            : {
                data: [
                  { target: "meta", secret: "SECRET-TOKEN" },
                  { target: "linkedin", secret: "LI-SECRET" },
                ],
                error: null,
              };
        builder.select = vi.fn(() => builder);
        builder.eq = vi.fn(() => builder);
        builder.in = vi.fn((col: string, vals: unknown) => {
          ins.push([col, vals]);
          return builder;
        });
        builder.maybeSingle = vi.fn(async () => result());
        builder.then = (
          onOk: (v: unknown) => unknown,
          onErr?: (e: unknown) => unknown,
        ) => Promise.resolve(result()).then(onOk, onErr);
        return builder;
      });
      createAdminClient.mockReturnValue({ from });
      await getCapiConfigByTrackingKey("tk-abc");
      return ins;
    }

    // MIT Zuordnung: das Ziel kommt mit.
    expect(
      await inFilterFor(projectWithRules("proj-1", { Lead: URN }, "PIXEL-123")),
    ).toEqual([["target", ["meta", "linkedin"]]]);

    // OHNE Zuordnung: der Filter ist zeichengleich mit dem von vor dieser Scheibe.
    // DAS IST DIE TRAGENDE INVARIANTE, an der Stelle gemessen, an der sie brechen
    // wuerde.
    expect(await inFilterFor(projectWithPixel("proj-1", "PIXEL-123"))).toEqual([
      ["target", ["meta"]],
    ]);
  });
});

// ===========================================================================
// DIE TORE 1 UND 2 DER SCHEIBE 3 — JEDER LAUF BENENNT SEIN TOR.
//
// WARUM JE EIN EIGENER LAUF UND NICHT EIN GEMEINSAMER "google sendet nicht": Vier
// unabhaengige Tore halten dieses Ziel auf, und LIVE sind sie nicht auseinanderzuhalten —
// ein ausbleibendes Ereignis sieht unter jedem von ihnen identisch aus. Ein Test, der
// bloss behauptet, es gehe nichts hinaus, ist eine Abwesenheits-Behauptung mit vier
// moeglichen Ursachen und deckt KEINE davon. Die Trennung leisten allein diese Laeufe.
// Die beiden anderen Tore stehen in ingest.consent-targets.test.ts (Consent) und in
// fan-out.test.ts (Adapter).
// ===========================================================================
describe("Scheibe 3 — TOR 1 (withPixel) und TOR 2 (die Geheimnis-Schleife)", () => {
  /** Zeichnet die `in`-Filter der Geheimnis-Abfrage auf. */
  async function inFilter(
    projects: { data: unknown; error: unknown },
    secrets: { data: unknown; error: unknown },
  ) {
    const ins: [string, unknown][] = [];
    const from = vi.fn((table: string) => {
      const result = () => (table === "projects" ? projects : secrets);
      const builder: Record<string, unknown> = {};
      builder.select = vi.fn(() => builder);
      builder.eq = vi.fn(() => builder);
      builder.in = vi.fn((col: string, vals: unknown) => {
        ins.push([col, vals]);
        return builder;
      });
      builder.maybeSingle = vi.fn(async () => result());
      builder.then = (
        onOk: (v: unknown) => unknown,
        onErr?: (e: unknown) => unknown,
      ) => Promise.resolve(result()).then(onOk, onErr);
      return builder;
    });
    createAdminClient.mockReturnValue({ from });
    const config = await getCapiConfigByTrackingKey("tk-abc");
    return { ins, config };
  }

  it("TOR 1: ohne settings.pixels.google fragt der Resolver GAR NICHT nach der google-Zeile", async () => {
    // WIRD ROT, WENN jemand fuer google einen Vorgabewert einfuehrt oder den Filter in
    // withPixel lockert. Die Beobachtung ist ABSICHTLICH der `in`-Filter und nicht das
    // Ergebnis: Das Ergebnis waere auch dann leer, wenn Tor 2 greift — der Filter zeigt,
    // dass das Ziel schon VOR der Abfrage ausgeschieden ist. Nur so misst dieser Lauf
    // SEIN Tor und nicht das des Nachbarn.
    const { ins, config } = await inFilter(
      projectWithPixel("proj-1", "PIXEL-123"),
      secretRows([
        { target: "meta", secret: "SECRET-TOKEN" },
        // Die google-Zeile EXISTIERT — genau so entsteht sie im Autorisierungs-Fluss.
        { target: "google", secret: null },
      ]),
    );
    expect(ins).toEqual([["target", ["meta"]]]);
    expect(config?.targets.map((t) => t.target)).toEqual(["meta"]);
  });

  it("TOR 2: MIT Kennung im Blob, aber secret = NULL -> kein Empfaenger", async () => {
    // DER FALL, DEN TOR 1 NICHT DECKT, und er ist der wichtigere: saveProject schreibt
    // den Einstellungs-Blob UNVALIDIERT, ein selbstgebauter Aufruf koennte
    // settings.pixels.google also setzen. Dann passiert das Ziel Tor 1 — und faellt
    // HIER heraus, weil die Klartext-Spalte secret der google-Zeile NULL ist (der CHECK
    // project_secrets_secret_genau_eines erzwingt genau eines von secret/secret_enc,
    // und der Autorisierungs-Fluss fuellt secret_enc).
    // WIRD ROT, WENN der Resolver anfaengt, secret_enc zu lesen, oder wenn hasSecret
    // weicher wird.
    //
    // SEIN GEGENSTUECK HEISST "TOR 2, POSITIVKONTROLLE: mit KLARTEXT in secret WUERDE
    // google aufgeloest" UND STEHT UNMITTELBAR DARUNTER. Der Name steht hier, damit
    // eine spaetere Streichung sichtbar ist: Ohne jenen Lauf waere dieser eine
    // Abwesenheits-Behauptung ohne Reichweite — "kein Empfaenger" saehe auch dann
    // richtig aus, wenn google aus einem ganz anderen Grund nie aufgeloest wuerde.
    // DAS IST EIN ZEIGER UND KEIN WAECHTER: Wird das Gegenstueck geloescht, bleibt
    // dieser Lauf GRUEN. Der Zeiger macht den Verlust beim LESEN sichtbar, er
    // verhindert ihn nicht.
    //
    // DIE KENNUNG TRAEGT KEINE BINDESTRICHE (nachgezogen in Scheibe 2 der Phase 11.2).
    // Hier stand "123-456-7890". Der Wert ist fuer das, was dieser Lauf misst,
    // gleichgueltig — geprueft wird "Kennung gesetzt, secret NULL, kein Empfaenger".
    // STEHENGELASSEN HAETTE ER EINE DATENLAGE BEHAUPTET, DIE DER PRODUKTIVE PFAD NICHT
    // MEHR HERSTELLT: Seit Festlegung (6) formt setPixelId die Kundennummer an der
    // Eingabe um, Bindestriche erreichen den Blob ueber die Oberflaeche nicht mehr.
    // Ein spaeterer Leser haette ihn als Beleg gelesen, dass die Kette Bindestriche
    // vertraegt (docs/immer-beachten.md, "TESTDATEN UND TEST-SEQUENZ MUESSEN DEN
    // PRODUKTIVEN PFAD TREFFEN").
    const { ins, config } = await inFilter(
      {
        data: {
          id: "proj-1",
          settings: {
            pixels: {
              meta: { pixelId: "PIXEL-123" },
              google: { pixelId: "9876543210" },
            },
          },
        },
        error: null,
      },
      secretRows([
        { target: "meta", secret: "SECRET-TOKEN" },
        { target: "google", secret: null },
      ]),
    );
    // Tor 1 laesst es durch — das ist die VORBEDINGUNG dieses Laufs und wird
    // mitgeprueft, sonst maesse er wieder Tor 1.
    expect(ins).toEqual([["target", ["meta", "google"]]]);
    expect(config?.targets.map((t) => t.target)).toEqual(["meta"]);
  });

  it("TOR 2, POSITIVKONTROLLE: mit KLARTEXT in secret WUERDE google aufgeloest", async () => {
    // OHNE DIESEN LAUF WAERE DER VORIGE HOHL: "kein Empfaenger" saehe auch dann richtig
    // aus, wenn google aus einem ganz anderen Grund nie aufgeloest wuerde. Hier ist
    // belegt, dass GENAU die leere Klartext-Spalte das Tor ist.
    // ER IST ZUGLEICH DIE BEGRUENDUNG FUER DAS ZIEL-GATE IN setCapiToken: Stuende dort
    // ein Klartext, waere das Ziel ein Empfaenger — deshalb weist die Action ein Ziel
    // ohne Geheimnis-Feld ab, VOR jedem DB-Zugriff.
    const { config } = await inFilter(
      {
        data: {
          id: "proj-1",
          settings: { pixels: { google: { pixelId: "9876543210" } } },
        },
        error: null,
      },
      secretRows([{ target: "google", secret: "KLARTEXT" }]),
    );
    expect(config?.targets.map((t) => t.target)).toEqual(["google"]);
  });
});
