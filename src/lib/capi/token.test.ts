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
