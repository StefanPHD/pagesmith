import { afterEach, describe, expect, it, vi } from "vitest";

// Den authenticated-SSR-Client (next/headers) komplett mocken: verhindert echten
// Servercode beim Import und steuert die Query-Kette pro Test.
const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));

// `import "server-only"` wirft ausserhalb der react-server-Condition (auch in vitest)
// -> durch ein leeres Modul ersetzen (admin.ts wird ohnehin gemockt).
vi.mock("server-only", () => ({}));

// service_role-Admin-Client mocken. adminUpsert ist der SPY, auf dem die
// sicherheitskritischen Assertions laufen (im IDOR-Fall NIE aufgerufen).
//
// PHASE 11 SCHEIBE 1 — adminTables ZEICHNET DIE ANGESPROCHENE TABELLE AUF, in der
// REIHENFOLGE der from()-Aufrufe. Vorher verwarf der Mock den Tabellennamen; ein
// Doppelschreib-Test haette damit nur geprueft, dass ZWEIMAL irgendetwas geschrieben
// wird — also den Mock statt den Code. Die Reihenfolge ist eine ENTSCHEIDUNG
// (neue Tabelle zuerst) und braucht deshalb eine Aufzeichnung, die sie sichtbar macht.
const { createAdminClient, adminUpsert, adminDelete, adminTables, adminDeleteEq } = vi.hoisted(() => {
  // Signatur ueber den Generic -> calls[0][0]/[1] sind typisiert, ohne ungenutzte
  // Parameter in der Implementierung (die vi.fn ohnehin nur zum Aufzeichnen braucht).
  const adminUpsert = vi.fn<
    (row: unknown, options?: unknown) => {
      then: (onF: (v: unknown) => unknown) => unknown;
    }
  >(() => ({ then: (onF) => onF({ error: null }) }));
  // Angesprochene Tabellen in Aufruf-Reihenfolge (s. Kommentar oben).
  const adminTables: string[] = [];
  // Filter der DELETE-Kette, damit der Ziel-Filter pruefbar ist: ohne ihn loeschte
  // removeCapiToken spaeter die Geheimnisse ALLER Ziele eines Projekts.
  const adminDeleteEq: [string, unknown][] = [];
  // DELETE-Kette (removeCapiToken): .delete().eq(...) -> thenable { error: null }.
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
  const createAdminClient = vi.fn(() => ({
    from: vi.fn((table: string) => {
      adminTables.push(table);
      return { upsert: adminUpsert, delete: adminDelete };
    }),
  }));
  return { createAdminClient, adminUpsert, adminDelete, adminTables, adminDeleteEq };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import {
  setCapiToken,
  removeCapiToken,
  loadProject,
  saveProject,
  saveVariantB,
  createVariantB,
  removeVariantB,
  setAbTestActive,
  getVariantBPublished,
  getEventCounts,
  getVariantCounts,
} from "./actions";
import {
  deliverableVariantB,
  type PublishedLike,
} from "@/lib/hosting/variant";

/**
 * Minimaler, chainbarer SSR-Client-Mock. Pro (table.op) ein Ergebnis:
 * - "<table>.select" -> von maybeSingle() aufgeloest (Query).
 * - "<table>.update" -> vom await auf dem Builder aufgeloest (Mutation, thenable).
 * Zeichnet select-Spalten, update-Patch und die from()-Tabellen auf. Die
 * Writes auf die Geheimnis-Tabellen project_secrets UND project_tokens laufen
 * NICHT hierueber (die gehen ueber den Admin-Client).
 */
function makeClient(opts: {
  user: { id: string } | null;
  results?: Record<string, { data?: unknown; error: unknown }>;
}) {
  const results = opts.results ?? {};
  const rec = {
    selectCols: [] as { table: string; cols: string }[],
    updatePatch: null as unknown,
    fromTables: [] as string[],
  };

  function builder(table: string) {
    let awaited: { data?: unknown; error: unknown } = { error: null };
    const b: Record<string, unknown> = {};
    b.select = vi.fn((cols: string) => {
      rec.selectCols.push({ table, cols });
      return b;
    });
    b.eq = vi.fn(() => b);
    b.order = vi.fn(() => b);
    b.limit = vi.fn(() => b);
    b.maybeSingle = vi.fn(async () => results[`${table}.select`] ?? { data: null, error: null });
    b.update = vi.fn((patch: unknown) => {
      rec.updatePatch = patch;
      awaited = results[`${table}.update`] ?? { error: null };
      return b;
    });
    // Thenable -> `await supabase.from(t).update(...).eq()...`.
    b.then = (onF: (v: unknown) => unknown) => onF(awaited);
    return b;
  }

  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn((table: string) => {
      rec.fromTables.push(table);
      return builder(table);
    }),
  };
  createClient.mockResolvedValue(client);
  return { client, rec };
}

afterEach(() => {
  vi.clearAllMocks();
  // vi.clearAllMocks() leert nur Spy-Aufzeichnungen, nicht unsere eigenen Arrays —
  // ohne diese zwei Zeilen truegen Reihenfolge- und Filter-Proben Reste des
  // Vorgaengertests mit sich.
  adminTables.length = 0;
  adminDeleteEq.length = 0;
});

describe("setCapiToken (Scheibe 2a)", () => {
  it("Happy-Path: schreibt Token per service_role-Upsert + flippt tokenSet in settings + liefert trackingKey", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        // Ownership-Query: Projekt gehoert dem User, noch kein trackingKey.
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "  SECRET  ");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.trackingKey).toBeTruthy();

    // Token-Write laeuft ueber den service_role-Admin-Client — EIN Client, seit
    // Phase 11 Scheibe 1 aber ZWEI Schreibvorgaenge (Doppelschreib).
    expect(createAdminClient).toHaveBeenCalledTimes(1);
    expect(adminUpsert).toHaveBeenCalledTimes(2);
    // Die ALT-Zeile ist der ZWEITE Vorgang (die neue Tabelle kommt zuerst) —
    // Aussage unveraendert, nur der Index folgt der entschiedenen Reihenfolge:
    // Token (getrimmt) mit user_id aus der Session + onConflict project_id.
    expect(adminUpsert.mock.calls[1][0]).toMatchObject({
      project_id: "proj-1",
      user_id: "user-1",
      meta_capi_token: "SECRET",
    });
    expect(adminUpsert.mock.calls[1][1]).toEqual({ onConflict: "project_id" });

    // settings-Update laeuft ueber den authenticated-SSR-Client (nicht Admin).
    const patch = rec.updatePatch as {
      settings: { capi: { tokenSet: boolean; trackingKey: string } };
      tracking_key: string;
    };
    expect(patch.settings.capi.tokenSet).toBe(true);
    expect(patch.settings.capi.trackingKey).toBeTruthy();
    // DUAL-WRITE (Scheibe 2b-0): die server-autoritative Spalte tracking_key traegt
    // GENAU denselben Wert wie settings.capi.trackingKey (byte-gleiche Client-Einbettung).
    expect(patch.tracking_key).toBe(patch.settings.capi.trackingKey);
  });

  it("WRITE-ONLY: der SSR-Client fasst project_tokens NIE an (kein Read/Write ueber authenticated -> SELECT-Sperre bleibt tragend)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(true);

    // POSITIVKONTROLLE — sie steht VOR den Abwesenheits-Behauptungen, weil diese sonst
    // auch dann aufgingen, wenn die Aufzeichnung schlicht leer bliebe.
    expect(rec.fromTables).toContain("projects");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);

    // Der authenticated-SSR-Client beruehrt KEINE der beiden Geheimnis-Tabellen (weder
    // .from noch .select). Nur der Admin-Client (service_role) schreibt.
    // PHASE 11 SCHEIBE 1: die Zusicherung ist AUSGEWEITET, nicht verschoben — sie gilt
    // fuer die Alt-Tabelle UND fuer die neue, solange in beide geschrieben wird.
    expect(rec.fromTables).not.toContain("project_tokens");
    expect(rec.fromTables).not.toContain("project_secrets");
    expect(rec.selectCols.some((s) => s.table === "project_tokens")).toBe(false);
    expect(rec.selectCols.some((s) => s.table === "project_secrets")).toBe(false);
    expect(adminUpsert).toHaveBeenCalledTimes(2);
  });

  // PHASE 11 SCHEIBE 1 — DER EINZIGE TEST, DER DIE REIHENFOLGE DES DOPPELSCHREIBS
  // PRUEFT. Sie ist eine Entscheidung, kein Zufall: bricht es nach dem NEUEN Vorgang
  // ab, liest der Live-Pfad den korrekten Wert und nur die Rollback-Reserve ist
  // veraltet. Andersherum laese er nichts und der Server-Forward stuerbe lautlos.
  // Wer diesen Test entfernt, nimmt die einzige Absicherung dieser Richtung mit.
  it("Phase 11 Scheibe 1: DOPPELSCHREIB in BEIDE Tabellen — neue Tabelle ZUERST", async () => {
    makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(true);
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
  });

  it("Phase 11 Scheibe 1: die neue Zeile traegt (project_id, target, secret) und das Konflikt-PAAR", async () => {
    makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
        "projects.update": { error: null },
      },
    });

    await setCapiToken("proj-1", "  SECRET  ");
    // Zielwert als LITERAL, nicht als importierte Konstante: der Test nagelt den Wert
    // fest, den die Datenbank per CHECK erwartet — zoege er die Konstante mit, ruschte
    // eine Aenderung an ihr gruen durch.
    expect(adminUpsert.mock.calls[0][0]).toEqual({
      project_id: "proj-1",
      target: "meta",
      secret: "SECRET",
    });
    // Konflikt-Ziel ist das PAAR. Stuende hier nur project_id, schluege der Upsert bei
    // einem zweiten Ziel desselben Projekts fehl oder ueberschriebe die falsche Zeile.
    expect(adminUpsert.mock.calls[0][1]).toEqual({ onConflict: "project_id,target" });
    // KEINE user_id in der neuen Tabelle — die Spalte gibt es dort nicht.
    expect(adminUpsert.mock.calls[0][0]).not.toHaveProperty("user_id");
  });

  it("Phase 11 Scheibe 1: scheitert der NEUE Schreibvorgang, wird die Alt-Tabelle NICHT mehr angefasst", async () => {
    makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
      },
    });
    adminUpsert.mockReturnValueOnce({
      then: (onF: (v: unknown) => unknown) => onF({ error: { message: "boom" } }),
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    // BEIDE MUESSEN GELINGEN: der Vorgang kippt, statt halb durchzulaufen.
    expect(adminUpsert).toHaveBeenCalledTimes(1);
    expect(adminTables).toEqual(["project_secrets"]);
  });

  it("erhaelt einen bestehenden trackingKey (lazy nur beim ERSTEN Set)", async () => {
    // ARCHITEKTURWECHSEL Scheibe 2b-0 (bewusst, NICHT bis-gruen-angepasst): die
    // Autoritaet der Identitaet ist jetzt die SPALTE tracking_key (post-Backfill),
    // nicht mehr settings.capi.trackingKey. ensureTrackingKey liest den Spaltenwert ->
    // die Fixture legt den bestehenden Key deshalb in tracking_key. Der Dual-Write
    // spiegelt ihn 1:1 nach settings zurueck (Client-Einbettung).
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            settings: { capi: { trackingKey: "existing-key", tokenSet: true } },
            tracking_key: "existing-key",
          },
          error: null,
        },
        "projects.update": { error: null },
      },
    });

    const result = await setCapiToken("proj-1", "NEW-SECRET");
    expect(result.ok).toBe(true);
    if (result.ok) expect(result.trackingKey).toBe("existing-key");
    const patch = rec.updatePatch as {
      settings: { capi: { trackingKey: string } };
      tracking_key: string;
    };
    // Bestehender Key NICHT neu gewuerfelt — in BEIDEN: Spalte (Autoritaet) + settings.
    expect(patch.tracking_key).toBe("existing-key");
    expect(patch.settings.capi.trackingKey).toBe("existing-key");
  });

  it("erhaelt pixels.meta.pixelId beim settings-Merge", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", settings: { pixels: { meta: { pixelId: "999" } } } },
          error: null,
        },
        "projects.update": { error: null },
      },
    });
    await setCapiToken("proj-1", "SECRET");
    const patch = rec.updatePatch as { settings: { pixels: { meta: { pixelId: string } } } };
    expect(patch.settings.pixels.meta.pixelId).toBe("999");
  });

  it("IDOR-SCHUTZ (heiligstes Gate): fremde project_id -> service_role-Upsert wird NIE aufgerufen, Admin-Client NIE instanziiert", async () => {
    // Eingeloggter User, aber das Projekt gehoert ihm nicht -> Ownership-Query (eq
    // user_id) liefert null. BEWEIS (nicht nur "wirft error"): der privilegierte
    // Write darf NIE laufen, und der Admin-Client (RLS-Bypass) darf gar nicht erst
    // entstehen. Ein "wirft-error"-Test waere gruen, selbst wenn der Write davor liefe.
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: null, error: null },
      },
    });

    const result = await setCapiToken("foreign-proj", "SECRET");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nicht gefunden/i);

    // Kern-Assertion: der service_role-Write wurde NIE erreicht.
    expect(adminUpsert).not.toHaveBeenCalled();
    // Haerteste Invariante: der Admin-Client wurde nicht einmal instanziiert.
    expect(createAdminClient).not.toHaveBeenCalled();
    // Auch kein settings-Update.
    expect(rec.updatePatch).toBeNull();
  });

  it("nicht eingeloggt -> error, kein service_role-Write, kein Admin-Client", async () => {
    const { rec } = makeClient({ user: null });
    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    expect(adminUpsert).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(rec.fromTables).not.toContain("project_tokens");
  });

  it("leerer Token -> error, KEIN DB-Zugriff (weder SSR noch Admin)", async () => {
    const { client } = makeClient({ user: { id: "user-1" } });
    const result = await setCapiToken("proj-1", "   ");
    expect(result.ok).toBe(false);
    expect(client.from).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("service_role-Upsert-Fehler -> error (nach bestandenem Gate)", async () => {
    makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": { data: { id: "proj-1", settings: {} }, error: null },
      },
    });
    adminUpsert.mockReturnValueOnce({
      then: (onF: (v: unknown) => unknown) => onF({ error: { message: "boom" } }),
    });

    const result = await setCapiToken("proj-1", "SECRET");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toBe("boom");
  });
});

describe("removeCapiToken (CAPI-Token entfernen)", () => {
  const setRow = {
    data: { id: "proj-1", settings: { capi: { trackingKey: "keep-me", tokenSet: true } } },
    error: null,
  };

  it("Happy-Path: DELETE project_secrets + project_tokens (admin) + settings.tokenSet:false, ok", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": setRow, "projects.update": { error: null } },
    });

    const result = await removeCapiToken("proj-1");
    expect(result.ok).toBe(true);
    // DELETE laeuft ueber den service_role-Admin-Client — EIN Client, seit Phase 11
    // Scheibe 1 aber ZWEI Loeschvorgaenge (Doppel-Delete).
    expect(createAdminClient).toHaveBeenCalledTimes(1);
    expect(adminDelete).toHaveBeenCalledTimes(2);
    // settings-Update ueber den SSR-Client: tokenSet flippt auf false.
    const patch = rec.updatePatch as { settings: { capi: { tokenSet: boolean } } };
    expect(patch.settings.capi.tokenSet).toBe(false);
  });

  it("IDOR (heiligstes Gate): fremdes Projekt -> KEIN Admin-Client, kein DELETE, Fehler 'nicht gefunden'", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });

    const result = await removeCapiToken("foreign-proj");
    expect(result.ok).toBe(false);
    if (!result.ok) expect(result.error).toMatch(/nicht gefunden/i);
    expect(adminDelete).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(rec.updatePatch).toBeNull();
  });

  it("DELETE laeuft ueber den Admin-Client (service_role), nicht ueber den SSR-Client", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": setRow, "projects.update": { error: null } },
    });

    await removeCapiToken("proj-1");
    // POSITIVKONTROLLE zuerst (s. WRITE-ONLY-Test oben).
    expect(rec.fromTables).toContain("projects");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
    // Der SSR-Client fasst KEINE der beiden Geheimnis-Tabellen an -> Loeschen kann nur
    // ueber admin laufen. AUSGEWEITET in Phase 11 Scheibe 1, nicht verschoben.
    expect(rec.fromTables).not.toContain("project_tokens");
    expect(rec.fromTables).not.toContain("project_secrets");
    expect(adminDelete).toHaveBeenCalledTimes(2);
  });

  // PHASE 11 SCHEIBE 1 — EINZIGER TEST FUER REIHENFOLGE UND ZIEL-FILTER DES
  // DOPPEL-DELETES. Der Ziel-Filter ist kein Detail: ohne ihn loeschte diese Aktion
  // spaeter die Geheimnisse ALLER Ziele des Projekts, obwohl nur Meta gemeint ist —
  // und das faellt erst auf, wenn ein zweites Ziel existiert.
  it("Phase 11 Scheibe 1: DOPPEL-DELETE — neue Tabelle ZUERST, gefiltert auf Projekt UND Ziel", async () => {
    makeClient({
      user: { id: "user-1" },
      results: { "projects.select": setRow, "projects.update": { error: null } },
    });

    const result = await removeCapiToken("proj-1");
    expect(result.ok).toBe(true);
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
    // Zielwert als LITERAL (s. Begruendung beim Schreibpfad).
    expect(adminDeleteEq).toEqual([
      ["project_id", "proj-1"],
      ["target", "meta"],
      ["project_id", "proj-1"],
    ]);
  });

  it("trackingKey bleibt erhalten, nur tokenSet flippt auf false (Gegenprobe)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": setRow, "projects.update": { error: null } },
    });

    const result = await removeCapiToken("proj-1");
    expect(result.ok).toBe(true);
    const patch = rec.updatePatch as { settings: { capi: { trackingKey: string; tokenSet: boolean } } };
    expect(patch.settings.capi.trackingKey).toBe("keep-me"); // NICHT geloescht
    expect(patch.settings.capi.tokenSet).toBe(false);
  });

  it("nicht eingeloggt -> error, kein Admin-Client, kein DELETE", async () => {
    makeClient({ user: null });
    const result = await removeCapiToken("proj-1");
    expect(result.ok).toBe(false);
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminDelete).not.toHaveBeenCalled();
  });
});

describe("loadProject — Payload traegt NIE den Token", () => {
  it("selektiert nur projects-Spalten (id,name,html,mappings,settings), NIE project_tokens", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            name: "P",
            html: "",
            mappings: [],
            settings: { capi: { trackingKey: "k", tokenSet: true } },
          },
          error: null,
        },
      },
    });

    const row = await loadProject("proj-1");
    // settings (inkl. trackingKey + tokenSet) kommen mit — der Token NICHT.
    expect(row?.settings).toEqual({ capi: { trackingKey: "k", tokenSet: true } });
    expect(JSON.stringify(row)).not.toContain("meta_capi_token");

    // project_tokens wird nie abgefragt; die Projektion enthaelt keinen Token.
    expect(rec.fromTables).not.toContain("project_tokens");
    // SPALTENLISTE GEWACHSEN, SCHAERFE UNVERAENDERT (Scheibe 9a) — NICHT "bis gruen
    // angepasst": Der Test schuetzt laut Namen "kein Token in der Projektion", und
    // genau das pruefen die beiden Zeilen darueber (fromTables / JSON.stringify) —
    // sie sind unveraendert. Die exakte Spaltenliste ist eine ZUSAETZLICHE Schaerfe
    // ("exakte Projektion, kein SELECT *"), die durch die additive Erweiterung von
    // loadProject um html_b/mappings_b (Varianten-Authoring) legitim mitwaechst —
    // und in 9c-2 um ab_test_started_at (Lauf-Abgrenzung: Sichtbarkeit und
    // Zeitraum-Beschriftung der Auswertung, beide reine ANZEIGE).
    // Entscheidend bleibt, was WEITERHIN AUSSERHALB der Projektion steht:
    // project_tokens und published_content. Die Assertion wurde bewusst NICHT auf
    // ein weiches not.toContain("token") aufgeweicht — das haette den
    // SELECT-*-Schutz dauerhaft verloren.
    expect(rec.selectCols).toEqual([
      {
        table: "projects",
        // Scheibe 9b-1: ab_test_active kommt dazu — der UI-Schalter leitet seinen
        // Zustand aus dieser Spalte ab (ABLEITEN STATT LOESCHEN). Schaerfe
        // unveraendert; WEITERHIN AUSSERHALB: published_content und jede
        // project_tokens-Spalte (s. die beiden Assertionen darueber/darunter).
        cols: "id,name,html,mappings,settings,html_b,mappings_b,ab_test_active,ab_test_started_at",
      },
    ]);
    expect(rec.selectCols[0].cols).not.toContain("published_content");
  });
});

describe("saveProject — Durability-Kontrast (Scheibe 2b-0)", () => {
  it("DURABILITY: Update-Patch traegt html/mappings/settings/updated_at, aber NICHT tracking_key (die Spalte ueberlebt jeden Save)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: { id: "proj-1" }, error: null } },
    });

    const res = await saveProject("proj-1", "<h1>x</h1>", [], {});
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(patch).toHaveProperty("html");
    expect(patch).toHaveProperty("mappings");
    expect(patch).toHaveProperty("settings");
    expect(patch).toHaveProperty("updated_at");
    // Der STRUKTURELLE Grund, warum die server-autoritative Spalte den Save ueberlebt:
    // sie steht nicht im Payload -> ein UPDATE laesst nicht-gelistete Spalten unberuehrt.
    expect(patch).not.toHaveProperty("tracking_key");
  });

  it("KONTRAST settings-vs-Spalte: key-loses Client-settings ENTFERNT ein server-in-settings-Feld (rot-Beweis), tracking_key (Spalte) bleibt unberuehrt (gruen-Beweis)", async () => {
    // saveProject ist ZUSTANDSLOS gegenueber der DB-Zeile — KEIN Read-Merge. Es schreibt
    // das Client-settings GANZHEITLICH; ein server-eigenes settings-Feld (hier
    // capi.trackingKey), das der key-lose Client nicht mitsendet, verschwindet damit.
    // GENAU das war der Live-Bug der settings-Variante — und genau deshalb Spalte.
    const clientSettings = {}; // key-los: der Client kennt den server-generierten Key nie
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: { id: "proj-1" }, error: null } },
    });

    const res = await saveProject("proj-1", "<h1>x</h1>", [], clientSettings);
    expect(res.ok).toBe(true);

    const patch = rec.updatePatch as {
      settings: { capi?: { trackingKey?: string } };
    } & Record<string, unknown>;
    // ROT-Beweis "warum nicht settings": das server-Feld ist im geschriebenen settings weg.
    expect(patch.settings.capi?.trackingKey).toBeUndefined();
    // GRUEN-Beweis "warum Spalte": tracking_key ist im Save-Pfad strukturell unerreichbar.
    expect(patch).not.toHaveProperty("tracking_key");
  });
});

describe("Varianten-Slots (Phase 9 Scheibe 9a) — Invariante (ii): der Slot ist strukturell, nicht laufzeitabhaengig", () => {
  // Diese beiden Tests sind das Herz der Scheibe. Der Fehler, den sie abfangen, ist
  // der STILLE Totalverlust: ein Save, der in die falschen Spalten schreibt, meldet
  // keinen Fehler und ist im UI nicht zu sehen — die andere Variante ist einfach weg.
  //
  // Sie pruefen die Spaltenmenge EXAKT (sortierte Key-Listen, nicht toMatchObject):
  // toMatchObject wuerde eine zusaetzlich mitgeschriebene Fremd-Spalte durchwinken.

  it("saveVariantB schreibt AUSSCHLIESSLICH die B-Spalten — html/mappings kommen im Patch NICHT vor", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: { id: "proj-1" }, error: null } },
    });

    const res = await saveVariantB(
      "proj-1",
      "<h1 data-pagesmith-id='ps-b'>B</h1>",
      [{ elementId: "ps-b", type: "track", config: { event: "Lead" } }],
      { pixels: { meta: { pixelId: "123" } } }
    );
    expect(res).toEqual({ ok: true, id: "proj-1" });

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(Object.keys(patch).sort()).toEqual(
      ["html_b", "mappings_b", "settings", "updated_at"].sort()
    );
    // KERN: die A-Spalten sind in dieser Funktion strukturell unerreichbar.
    expect(patch).not.toHaveProperty("html");
    expect(patch).not.toHaveProperty("mappings");
    expect(patch.html_b).toBe("<h1 data-pagesmith-id='ps-b'>B</h1>");
    // Auflage 6: settings ist BEWUSST im Payload (das Einstellungs-Panel ist
    // variant-unabhaengig editierbar und haengt am selben Speichern-Button).
    expect(patch.settings).toEqual({ pixels: { meta: { pixelId: "123" } } });
    // Server-autoritative Spalten bleiben wie in saveProject unerreichbar.
    expect(patch).not.toHaveProperty("tracking_key");
    expect(patch).not.toHaveProperty("published_content");
  });

  it("GEGENRICHTUNG: saveProject schreibt AUSSCHLIESSLICH die A-Spalten — html_b/mappings_b kommen im Patch NICHT vor", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: { id: "proj-1" }, error: null } },
    });

    await saveProject("proj-1", "<h1>A</h1>", [], {});

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(Object.keys(patch).sort()).toEqual(
      ["html", "mappings", "settings", "updated_at"].sort()
    );
    expect(patch).not.toHaveProperty("html_b");
    expect(patch).not.toHaveProperty("mappings_b");
  });

  it("saveVariantB: fremde/unbekannte project_id -> Fehler (Ownership-Filter greift, kein stiller Erfolg)", async () => {
    makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });
    const res = await saveVariantB("foreign", "<h1>x</h1>", [], {});
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/nicht gefunden/i);
  });
});

describe("createVariantB (Scheibe 9a)", () => {
  it("kopiert den GESPEICHERTEN A-Stand in die B-Spalten und gibt die geschriebenen Werte zurueck", async () => {
    const mappings = [
      { elementId: "ps-1", type: "redirect" as const, config: { url: "https://x.test", openInNewTab: false } },
    ];
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", html: "<h1>A</h1>", mappings, html_b: null },
          error: null,
        },
      },
    });

    const res = await createVariantB("proj-1");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    // Der Client leitet seinen Stash aus DIESER Antwort ab (nicht aus einer lokalen
    // Annahme) -> die Werte muessen das sein, was wirklich geschrieben wurde.
    expect(res.html).toBe("<h1>A</h1>");
    expect(res.mappings).toEqual(mappings);

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(Object.keys(patch).sort()).toEqual(
      ["html_b", "mappings_b", "updated_at"].sort()
    );
    // A wird beim Anlegen von B NIE beruehrt.
    expect(patch).not.toHaveProperty("html");
    expect(patch).not.toHaveProperty("mappings");
    // Gleichlauf (DB-CHECK projects_variant_b_pair): beide Spalten gesetzt.
    expect(patch.html_b).toBe("<h1>A</h1>");
    expect(patch.mappings_b).toEqual(mappings);
    // KEIN SELECT *: nur die vier gebrauchten Spalten.
    expect(rec.selectCols[0]).toEqual({
      table: "projects",
      cols: "id,html,mappings,html_b",
    });
  });

  it("KEIN KLOBBERN: existiert B bereits, wird NICHT ueberschrieben (kein update)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", html: "<h1>A</h1>", mappings: [], html_b: "<h1>B bearbeitet</h1>" },
          error: null,
        },
      },
    });

    const res = await createVariantB("proj-1");
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/existiert bereits/i);
    // Der Doppelklick darf eine bearbeitete Variante B nicht auf A zuruecksetzen.
    expect(rec.updatePatch).toBeNull();
  });

  it("IDOR: fremde project_id -> Fehler, KEIN update", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });
    const res = await createVariantB("foreign");
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
  });
});

describe("removeVariantB (Scheibe 9a)", () => {
  it("setzt beide B-Spalten auf NULL und entfernt den variantB-Key aus published_content — A bleibt drin", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            published_content: {
              html: "<h1>A live</h1>",
              mappings: [],
              settings: {},
              publishedAt: "2026-07-27T00:00:00.000Z",
              variantB: { html: "<h1>B live</h1>", mappings: [] },
            },
          },
          error: null,
        },
      },
    });

    const res = await removeVariantB("proj-1");
    expect(res).toEqual({ ok: true });

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(patch.html_b).toBeNull();
    expect(patch.mappings_b).toBeNull();
    // Die veroeffentlichte B ist weg — sonst ginge sie in 9b beim Split wieder live.
    const pc = patch.published_content as Record<string, unknown>;
    expect(pc).not.toHaveProperty("variantB");
    // … und A ist unveraendert erhalten (kein Kollateralschaden am Live-Inhalt).
    expect(pc.html).toBe("<h1>A live</h1>");
    expect(Object.keys(pc).sort()).toEqual(
      ["html", "mappings", "publishedAt", "settings"].sort()
    );
    // A auf der Draft-Ebene ebenfalls unberuehrt.
    expect(patch).not.toHaveProperty("html");
    expect(patch).not.toHaveProperty("mappings");
    expect(patch).not.toHaveProperty("settings");
  });

  it("NIE VEROEFFENTLICHT: published_content bleibt NULL — der Key steht GAR NICHT im Patch", async () => {
    // Der Bug-in-waiting: ein "select -> spread -> update" haette hier {} in eine
    // Spalte geschrieben, die vorher NULL war. {} ist KEIN neutraler Zustand —
    // resolve.ts liest published?.html und der Publish-Indikator leitet aus dieser
    // Spalte ab. Ein erfundener Zustand ist die inverse Form von
    // "ABLEITEN STATT LOESCHEN".
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", published_content: null },
          error: null,
        },
      },
    });

    const res = await removeVariantB("proj-1");
    expect(res).toEqual({ ok: true });

    const patch = rec.updatePatch as Record<string, unknown>;
    expect(patch).not.toHaveProperty("published_content");
    // KEY-SET GEWACHSEN, SCHUTZZWECK UNVERAENDERT (Scheibe 9b-1): ab_test_active
    // MUSS im selben Payload stehen, sonst verletzt das Entfernen von B bei
    // laufendem Test den CHECK projects_ab_test_needs_variant_b und der Nutzer
    // saehe einen rohen 23514-Fehler. Die Assertion bleibt EXAKT (sortierter
    // Key-Vergleich, kein toContain): WEITERHIN AUSSERHALB bleiben html, mappings,
    // settings, tracking_key — und published_content bleibt in diesem Fall
    // (nie veroeffentlicht) GANZ draussen, was die Zeile darueber prueft.
    expect(Object.keys(patch).sort()).toEqual(
      ["html_b", "mappings_b", "ab_test_active", "updated_at"].sort()
    );
  });

  it("VEROEFFENTLICHT OHNE B: published_content wird nicht angefasst (kein ueberfluessiger Blob-Write)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            published_content: { html: "<h1>A live</h1>", mappings: [], settings: {}, publishedAt: "t" },
          },
          error: null,
        },
      },
    });

    await removeVariantB("proj-1");
    const patch = rec.updatePatch as Record<string, unknown>;
    expect(patch).not.toHaveProperty("published_content");
  });

  it("IDOR: fremde project_id -> Fehler, KEIN update", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });
    const res = await removeVariantB("foreign");
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
  });
});

describe("setAbTestActive (Scheibe 9b-1)", () => {
  const PUBLISHED_WITH_B = {
    html: "<h1>A live</h1>",
    mappings: [],
    settings: {},
    publishedAt: "t",
    variantB: { html: "<h1>B live</h1>", mappings: [] },
  };

  it("aktiviert und gibt den GESCHRIEBENEN Zustand zurueck (Client leitet daraus ab)", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", html_b: "<h1>B</h1>", published_content: PUBLISHED_WITH_B },
          error: null,
        },
      },
    });

    const res = await setAbTestActive("proj-1", true);
    // ANGEPASST IN 9c-2: der START schreibt zusaetzlich den Lauf-Beginn und gibt ihn
    // zurueck (der Client leitet daraus Sichtbarkeit und Beschriftung ab, ohne Reload).
    // EXAKT geblieben — toMatchObject waere eine Lockerung: es liesse ZUSAETZLICHE Felder
    // durch, und genau die soll diese Assertion fangen. Der dynamische Zeitstempel ist
    // kein Grund dafuer; expect.any(String) traegt ihn ohne Exaktheitsverlust.
    expect(res).toEqual({
      ok: true,
      abTestActive: true,
      abTestStartedAt: expect.any(String),
    });

    const patch = rec.updatePatch as Record<string, unknown>;
    // Die Schluesselmenge bleibt eine SCHLUESSELMENGEN-Assertion: sie ist der Waechter,
    // der ein versehentlich mitgeschriebenes Feld faengt — jetzt mit dem dritten Key.
    expect(Object.keys(patch).sort()).toEqual(
      ["ab_test_active", "ab_test_started_at", "updated_at"].sort()
    );
    expect(patch.ab_test_active).toBe(true);
    expect(typeof patch.ab_test_started_at).toBe("string");
    expect((res as { abTestStartedAt?: string }).abTestStartedAt).toBe(
      patch.ab_test_started_at
    );
    // Nichts anderes wird beruehrt — kein Draft, kein published_content.
    expect(patch).not.toHaveProperty("html_b");
    expect(patch).not.toHaveProperty("published_content");
    // KEIN SELECT *: nur die drei gebrauchten Spalten.
    expect(rec.selectCols[0]).toEqual({
      table: "projects",
      cols: "id,html_b,published_content",
    });
  });

  it("VERWEIGERT, wenn Variante B nicht VEROEFFENTLICHT ist — und schreibt NICHTS", async () => {
    // Der CHECK garantiert nur, dass B als ENTWURF existiert. Ohne variantB-Key in
    // published_content wuerfelte die Route Besucher in einen Bucket, der ins Leere
    // greift.
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            id: "proj-1",
            html_b: "<h1>B</h1>",
            published_content: { html: "<h1>A live</h1>", mappings: [], settings: {}, publishedAt: "t" },
          },
          error: null,
        },
      },
    });

    const res = await setAbTestActive("proj-1", true);
    expect(res.ok).toBe(false);
    if (!res.ok) expect(res.error).toMatch(/noch nicht veröffentlicht/i);
    expect(rec.updatePatch).toBeNull();
  });

  it("VERWEIGERT bei LEEREM veroeffentlichtem B — der Zustand zwischen Existenz und Auslieferbarkeit", async () => {
    // Der Befund, der dieses geteilte Praedikat erzwungen hat: html_b = "" ist
    // erlaubt (der CHECK verlangt nur "is not null"), publiziert einen variantB-Key
    // mit leerem html — eine reine EXISTENZ-Pruefung liesse die Aktivierung DURCH,
    // und die Route degradierte still auf A. Das UI saegte "Test laeuft", alle
    // Besucher saehen A, niemand merkt es.
    for (const bad of ["", "   "]) {
      const { rec } = makeClient({
        user: { id: "user-1" },
        results: {
          "projects.select": {
            data: {
              id: "proj-1",
              html_b: bad,
              published_content: { html: "<h1>A</h1>", variantB: { html: bad } },
            },
            error: null,
          },
        },
      });
      const res = await setAbTestActive("proj-1", true);
      expect(res.ok).toBe(false);
      // Handlungsleitend: der Text nennt, WAS zu tun ist.
      if (!res.ok) expect(res.error).toMatch(/keinen Inhalt/i);
      expect(rec.updatePatch).toBeNull();
    }
  });

  it("KONSISTENZ: Aktivierungs-Urteil == geteiltes Auslieferbarkeits-Praedikat", async () => {
    // Beide Seiten (Aktivierung hier, Auslieferung im Resolver) muessen zum SELBEN
    // Urteil kommen. Der Resolver-Gegenpart dieser Tabelle steht in resolve.test.ts
    // und vergleicht gegen DASSELBE deliverableVariantB -> laeuft eine Seite je
    // wieder aus, wird ihr eigener Test rot.
    const fixtures: PublishedLike[] = [
      null,
      { html: "<h1>A</h1>" },
      { html: "<h1>A</h1>", variantB: null },
      { html: "<h1>A</h1>", variantB: {} },
      { html: "<h1>A</h1>", variantB: { html: "" } },
      { html: "<h1>A</h1>", variantB: { html: "   " } },
      { html: "<h1>A</h1>", variantB: { html: "<h1>B</h1>" } },
    ];

    for (const pc of fixtures) {
      makeClient({
        user: { id: "user-1" },
        results: {
          "projects.select": {
            data: { id: "proj-1", html_b: "<h1>B</h1>", published_content: pc },
            error: null,
          },
        },
      });
      const res = await setAbTestActive("proj-1", true);
      expect(res.ok).toBe(deliverableVariantB(pc) !== null);
    }
  });

  it("VERWEIGERT ohne Variante B ueberhaupt (nie publiziert) — schreibt NICHTS", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", html_b: null, published_content: null },
          error: null,
        },
      },
    });
    const res = await setAbTestActive("proj-1", true);
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
  });

  it("DEAKTIVIEREN ist bedingungslos: geht auch ohne veroeffentlichte B durch", async () => {
    // Stoppen fuehrt IMMER in den fail-safen Zustand (Route liefert A) und darf an
    // keiner Vorbedingung scheitern.
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: { id: "proj-1", html_b: "<h1>B</h1>", published_content: null },
          error: null,
        },
      },
    });
    const res = await setAbTestActive("proj-1", false);
    // EXAKT: kein drittes Feld. Das FEHLENDE Rueckgabefeld ist die halbe Zusage —
    // undefined heisst "nicht geschrieben", und der Client behaelt damit seinen
    // bekannten Wert. Ein null hier waere der Bug: es loeschte im UI, was der Server
    // behalten hat.
    expect(res).toEqual({ ok: true, abTestActive: false });
    const patch = rec.updatePatch as Record<string, unknown>;
    expect(patch.ab_test_active).toBe(false);
    // K2 — DIE ANDERE HAELFTE, und die Kernzusage von 9c-2: der Stopp fasst den
    // Lauf-Beginn NICHT an. Sonst verschwaenden die Zahlen genau in dem Moment, in dem
    // der Owner sie liest. Als SCHLUESSELMENGE formuliert, nicht als not.toContain:
    // so faengt sie zusaetzlich jedes andere versehentlich mitgeschriebene Feld.
    // MUTATIONSPROBE M2: das Feld auch im Stopp-Zweig schreiben -> dieser Test wird rot.
    expect(Object.keys(patch).sort()).toEqual(
      ["ab_test_active", "updated_at"].sort()
    );
  });

  it("IDOR: fremde project_id -> Fehler, KEIN update", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });
    const res = await setAbTestActive("foreign", true);
    expect(res.ok).toBe(false);
    expect(rec.updatePatch).toBeNull();
  });
});

describe("getVariantBPublished (Scheibe 9b-1p)", () => {
  it("true/false je nach auslieferbarer Variante B — und NUR published_content im Select", async () => {
    const { rec } = makeClient({
      user: { id: "user-1" },
      results: {
        "projects.select": {
          data: {
            published_content: { html: "<h1>A</h1>", variantB: { html: "<h1>B</h1>" } },
          },
          error: null,
        },
      },
    });
    expect(await getVariantBPublished("proj-1")).toBe(true);
    // Der grosse Blob wird SERVERSEITIG gelesen; der Client bekommt nur ein Boolean.
    // Schmale Projektion: KEIN html/mappings/settings im Ladepfad dieser Action.
    expect(rec.selectCols[0]).toEqual({
      table: "projects",
      cols: "published_content",
    });
  });

  it("KONSISTENZ: das Urteil ist deliverableVariantB — kein drittes Urteil", async () => {
    // DIESELBE Fixture-Tabelle wie die beiden 9b-1-Konsistenztests (setAbTestActive
    // und der Resolver). Drei Verwender, EIN Praedikat.
    const fixtures: PublishedLike[] = [
      null,
      { html: "<h1>A</h1>" },
      { html: "<h1>A</h1>", variantB: null },
      { html: "<h1>A</h1>", variantB: {} },
      { html: "<h1>A</h1>", variantB: { html: "" } },
      { html: "<h1>A</h1>", variantB: { html: "   " } },
      { html: "<h1>A</h1>", variantB: { html: "<h1>B</h1>" } },
    ];
    for (const pc of fixtures) {
      makeClient({
        user: { id: "user-1" },
        results: {
          "projects.select": { data: { published_content: pc }, error: null },
        },
      });
      expect(await getVariantBPublished("proj-1")).toBe(
        deliverableVariantB(pc) !== null
      );
    }
  });

  it("NICHT ERMITTELBAR -> null (nicht false): kein User, fremdes Projekt, DB-Fehler", async () => {
    // null ist NICHT dasselbe wie false — bei null behauptet das UI nichts.
    makeClient({ user: null });
    expect(await getVariantBPublished("proj-1")).toBeNull();

    makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: null } },
    });
    expect(await getVariantBPublished("foreign")).toBeNull();

    makeClient({
      user: { id: "user-1" },
      results: { "projects.select": { data: null, error: { message: "boom" } } },
    });
    expect(await getVariantBPublished("proj-1")).toBeNull();
  });
});

describe("getEventCounts — Query-Form (Scheibe 3)", () => {
  // EHRLICH: dieser Test beweist die QUERY-FORM (rpc-Name/Args, {data,error}-Handling,
  // User-Guard), NICHT die RLS-Verweigerung — der Mock liefert, was er will. Die
  // Cross-Tenant-Verweigerung ist ein DB-Feature (RLS) und wird per SQL-Simulation
  // (set request.jwt.claims auf Owner B) + Live-Zwei-Konten-Test bewiesen.
  function makeRpcClient(opts: {
    user: { id: string } | null;
    rpcResult?: { data?: unknown; error: unknown };
  }) {
    const rpc = vi.fn(async () => opts.rpcResult ?? { data: [], error: null });
    createClient.mockResolvedValue({
      auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
      rpc,
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    return { rpc };
  }

  it("ruft rpc('get_event_counts', {p_project_id}) und liefert die Counts", async () => {
    const counts = [
      { event_type: "__ps_pageview", count: 5 },
      { event_type: "Purchase", count: 2 },
    ];
    const { rpc } = makeRpcClient({
      user: { id: "user-1" },
      rpcResult: { data: counts, error: null },
    });

    const res = await getEventCounts("proj-1");
    expect(rpc).toHaveBeenCalledWith("get_event_counts", { p_project_id: "proj-1" });
    expect(res).toEqual(counts);
  });

  it("nicht eingeloggt -> [] (kein rpc-Aufruf)", async () => {
    const { rpc } = makeRpcClient({ user: null });
    expect(await getEventCounts("proj-1")).toEqual([]);
    expect(rpc).not.toHaveBeenCalled();
  });

  it("rpc-Fehler -> [] (kein Throw)", async () => {
    makeRpcClient({
      user: { id: "user-1" },
      rpcResult: { data: null, error: { message: "boom" } },
    });
    expect(await getEventCounts("proj-1")).toEqual([]);
  });
});

describe("getVariantCounts — Query-Form (Scheibe 9c-1)", () => {
  // Gleiche ehrliche Grenze wie oben: bewiesen wird die QUERY-FORM, NICHT die RLS. Die
  // Mandanten-Verweigerung ist ein DB-Feature und gehoert in den SQL-/Live-Test.
  function makeRpcClient(opts: {
    user: { id: string } | null;
    rpcResult?: { data?: unknown; error: unknown };
  }) {
    const rpc = vi.fn(async () => opts.rpcResult ?? { data: [], error: null });
    createClient.mockResolvedValue({
      auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
      rpc,
    } as unknown as Awaited<ReturnType<typeof createClient>>);
    return { rpc };
  }

  it("ruft rpc('get_variant_counts', {p_project_id}) und liefert die Zeilen", async () => {
    const rows = [
      { event_type: "__ps_pageview", count_a: 40, count_b: 38, count_none: 3 },
      { event_type: "Purchase", count_a: 2, count_b: 5, count_none: 0 },
    ];
    const { rpc } = makeRpcClient({
      user: { id: "user-1" },
      rpcResult: { data: rows, error: null },
    });

    const res = await getVariantCounts("proj-1");
    expect(rpc).toHaveBeenCalledWith("get_variant_counts", {
      p_project_id: "proj-1",
    });
    expect(res).toEqual({ ok: true, rows });
  });

  // DER UNTERSCHIED ZUM BESTANDSMUSTER, diskriminierend geprueft: ein Fehler mündet NICHT
  // in einen Leer-Wert. Faellt jemand auf {ok:true, rows:[]} zurueck, wird dieser Test rot —
  // und genau dann saehe "nicht ladbar" im UI wieder aus wie "keine Daten".
  it("rpc-Fehler -> {ok:false}, NICHT ein leeres Ergebnis", async () => {
    makeRpcClient({
      user: { id: "user-1" },
      rpcResult: { data: null, error: { message: "boom" } },
    });
    const res = await getVariantCounts("proj-1");
    expect(res).toEqual({ ok: false });
    expect(res.ok).toBe(false);
  });

  it("nicht eingeloggt -> {ok:false} (kein rpc-Aufruf)", async () => {
    const { rpc } = makeRpcClient({ user: null });
    expect(await getVariantCounts("proj-1")).toEqual({ ok: false });
    expect(rpc).not.toHaveBeenCalled();
  });

  // LEER IST EIN ERFOLG: ein Projekt ohne zugeordnete Zeilen liefert {ok:true, rows:[]} —
  // unterscheidbar vom Fehlerfall darueber. Ohne diese Gegenprobe koennte die Action
  // pauschal {ok:false} liefern und der Fehlertest bliebe trotzdem gruen.
  it("leeres Ergebnis -> {ok:true, rows:[]} (Gegenprobe zum Fehlerfall)", async () => {
    makeRpcClient({
      user: { id: "user-1" },
      rpcResult: { data: [], error: null },
    });
    expect(await getVariantCounts("proj-1")).toEqual({ ok: true, rows: [] });
  });
});
