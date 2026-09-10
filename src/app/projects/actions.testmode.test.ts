import { afterEach, describe, expect, it, vi } from "vitest";

// ===========================================================================
// DER PROJEKT-EIGENE TESTMODUS — EIN LESER UND ZWEI GESTEN (Scheibe 11.3b).
//
// WARUM DIESE LAEUFE IN EINER EIGENEN DATEI STEHEN: Die drei Aktionen brauchen einen
// Admin-Mock, der `update(...).eq().eq().select().maybeSingle()` beherrscht. Die
// bestehende Fabrik in actions.targets.test.ts kann `upsert`, `delete` und `select` —
// sie um eine vierte Kette zu erweitern hiesse, eine Datei anzufassen, die WAECHTER
// fuer die Ziel-Achse traegt (u.a. den Lauf, der die Spaltenliste von
// listConfiguredTargets auf ["target"] festnagelt). Eine eigene Datei laesst jene
// woertlich.
//
// DIE SICHERHEITSACHSE DIESER SCHEIBE STEHT UNTEN ALS DREI EIGENE WAECHTER, EINER JE
// AKTION. Sie sind KEIN Zierrat: WER DEN TESTZUSTAND SCHREIBEN KANN, KANN DIE
// ANALYTICS EINES FREMDEN PROJEKTS STILL ANHALTEN — kein Datenabfluss, sondern
// DATENVERWEIGERUNG, und die faellt niemandem auf, weil die Zahlen nicht falsch
// werden, sondern ausbleiben.
// JE WAECHTER ZWEI ASSERTIONS UND NICHT EINE: "Admin-Client nie entstanden" und
// "nichts geschrieben bzw. gelesen" sind ZWEI verschiedene Aussagen, und ein Gate
// kann die erste erfuellen und die zweite verfehlen.
// ===========================================================================

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));

// Admin-Client-Mock. Zeichnet auf, WELCHE Tabelle angesprochen, WELCHE Spalten
// selektiert, WELCHER Patch geschrieben und WELCHE Filter gesetzt wurden.
//
// DIE PATCH-AUFZEICHNUNG IST DIE TRAGENDE: An ihr haengt die Zusage, dass
// AUSSCHLIESSLICH die zwei Testspalten geschrieben werden. Ohne sie liesse sich nur
// pruefen, DASS geschrieben wird, nicht WAS.
const {
  createAdminClient,
  adminTables,
  adminSelectCols,
  adminSelectEq,
  adminUpdate,
  adminUpdateEq,
  adminUpdateSelectCols,
  setSelectResult,
  setUpdateResult,
} = vi.hoisted(() => {
  const adminTables: string[] = [];
  const adminSelectCols: string[] = [];
  const adminSelectEq: [string, unknown][] = [];
  const adminUpdate = vi.fn<(patch: unknown) => unknown>();
  const adminUpdateEq: [string, unknown][] = [];
  const adminUpdateSelectCols: string[] = [];
  let selectResult: { data?: unknown; error: unknown } = { data: [], error: null };
  let updateResult: { data?: unknown; error: unknown } = {
    data: { target: "meta" },
    error: null,
  };
  const setSelectResult = (r: { data?: unknown; error: unknown }) => {
    selectResult = r;
  };
  const setUpdateResult = (r: { data?: unknown; error: unknown }) => {
    updateResult = r;
  };

  const createAdminClient = vi.fn(() => ({
    from: vi.fn((table: string) => {
      adminTables.push(table);
      return {
        select: (cols: string) => {
          adminSelectCols.push(cols);
          const chain: Record<string, unknown> = {
            eq: (col: string, val: unknown) => {
              adminSelectEq.push([col, val]);
              return chain;
            },
            then: (onF: (v: unknown) => unknown) => onF(selectResult),
          };
          return chain;
        },
        update: (patch: unknown) => {
          adminUpdate(patch);
          const chain: Record<string, unknown> = {
            eq: (col: string, val: unknown) => {
              adminUpdateEq.push([col, val]);
              return chain;
            },
            select: (cols: string) => {
              adminUpdateSelectCols.push(cols);
              return chain;
            },
            maybeSingle: async () => updateResult,
          };
          return chain;
        },
      };
    }),
  }));
  return {
    createAdminClient,
    adminTables,
    adminSelectCols,
    adminSelectEq,
    adminUpdate,
    adminUpdateEq,
    adminUpdateSelectCols,
    setSelectResult,
    setUpdateResult,
  };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { endTestMode, listTestModeStates, startTestMode } from "./actions";
// DIE ECHTEN KONSTANTEN, keine Literale: waechst die Frist oder die Ziel-Menge,
// waechst dieser Test mit, statt eine handgeschriebene Kopie zu pruefen.
import {
  requiresTestCode,
  TARGETS_WITH_TEST_MODE,
  TEST_MODE_DURATION_SECONDS,
} from "@/lib/tracking/credential-state";
import { TRACKING_TARGETS } from "@/lib/settings";

/**
 * Minimaler SSR-Client-Mock: Sitzung + Ownership-Gate.
 *
 * `owned: null` IST DER FREMDNUTZER-FALL — genau die Gestalt, die der echte Client
 * liefert, wenn das Gate `.eq("id").eq("user_id")` nichts trifft. Nach der
 * Supabase-Doku (gelesen 2026-09-09) ist ein von einer Policy weggefilterter
 * Datensatz KEIN Fehler, sondern ein leeres Ergebnis — die Attrappe bildet also den
 * Betrieb ab und nicht eine Ausnahme.
 */
function makeClient(opts: { user: { id: string } | null; owned?: unknown }) {
  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn(() => {
      const b: Record<string, unknown> = {};
      b.select = vi.fn(() => b);
      b.eq = vi.fn(() => b);
      b.maybeSingle = vi.fn(async () => ({
        data:
          opts.owned === undefined
            ? { id: "proj-1", settings: METAS_KENNUNG }
            : opts.owned,
        error: null,
      }));
      return b;
    }),
  };
  createClient.mockResolvedValue(client);
}

/** Ein Einstellungs-Blob, der den Kennungs-Filter fuer meta UND tiktok passiert. */
const METAS_KENNUNG = {
  pixels: {
    meta: { pixelId: "123456789012345" },
    tiktok: { pixelId: "TIKTOKPIXEL" },
  },
};

const FRIST_ISO = new Date(1_800_003_600 * 1000).toISOString();

afterEach(() => {
  vi.clearAllMocks();
  adminTables.length = 0;
  adminSelectCols.length = 0;
  adminSelectEq.length = 0;
  adminUpdateEq.length = 0;
  adminUpdateSelectCols.length = 0;
  setSelectResult({ data: [], error: null });
  setUpdateResult({ data: { target: "meta" }, error: null });
});

// ===========================================================================
// DIE DREI IDOR-WAECHTER. EINER JE AKTION, JE ZWEI ASSERTIONS.
// ===========================================================================

describe("Das Ownership-Gate des Testmodus — die Sicherheitsachse der Scheibe", () => {
  it("IDOR 1 — listTestModeStates: fremdes Projekt -> KEIN Admin-Client UND kein Lesen", async () => {
    // ROT DURCH DIE PFLICHT-MUTATION: das Gate entfernen und direkt mit dem
    // Admin-Client lesen. Ohne diesen Lauf faerbte jene Mutation NICHTS rot — die
    // bestehenden IDOR-Waechter kennen nur setCapiToken, removeCapiToken und die zwei
    // Leser der Scheibe 11.2b.
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await listTestModeStates("fremd")).toEqual({
      ok: false,
      reason: "not_found",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminSelectCols).toEqual([]);
  });

  it("IDOR 2 — startTestMode: fremdes Projekt -> KEIN Admin-Client UND kein Schreiben", async () => {
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await startTestMode("fremd", "meta", "TEST123")).toEqual({
      ok: false,
      reason: "not_found",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpdate).not.toHaveBeenCalled();
  });

  it("IDOR 3 — endTestMode: fremdes Projekt -> KEIN Admin-Client UND kein Schreiben", async () => {
    // DIE DRITTE AKTION BRAUCHT IHREN EIGENEN LAUF: Sie ist die einzige, die den
    // Zustand LOESCHT. Ein Gate, das bei den ersten beiden haelt und hier fehlt,
    // liesse einen Fremden den Testmodus eines fremden Projekts BEENDEN — der
    // Schaden ist kleiner als das Anhalten, aber es ist derselbe Bruch.
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await endTestMode("fremd", "meta")).toEqual({
      ok: false,
      reason: "not_found",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpdate).not.toHaveBeenCalled();
  });

  it("ohne Sitzung: alle drei brechen ab, KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await listTestModeStates("proj-1")).toEqual({
      ok: false,
      reason: "unauthenticated",
    });
    expect(await startTestMode("proj-1", "meta", "TEST123")).toEqual({
      ok: false,
      reason: "unauthenticated",
    });
    expect(await endTestMode("proj-1", "meta")).toEqual({
      ok: false,
      reason: "unauthenticated",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// DIE PRUEFUNGEN VOR JEDEM CLIENT.
// ===========================================================================

describe("Was VOR dem privilegierten Client abgewiesen wird", () => {
  it("PFLICHT-MUTATION 2: ein Code aus reinem Leerraum wird abgewiesen UND nichts geschrieben", async () => {
    // ZWEI BEHAUPTUNGEN, NICHT EINE: "abgewiesen" und "geschrieben, aber Fehler
    // gemeldet" saehen an einer einzelnen Assertion identisch aus.
    //
    // WARUM DER FALL ZAEHLT (Vorrat (12)): Der CHECK
    // project_secrets_test_mode_paar ist mit test_event_code = '' ZUFRIEDEN — beide
    // Spalten sind gesetzt. Das Praedikat verwirft den Wert aber beim Trimmen, der
    // Riegel feuert nicht, UND DER KUNDE GLAUBT, DER TESTMODUS LAUFE.
    makeClient({ user: { id: "u1" } });
    expect(await startTestMode("proj-1", "meta", "   ")).toEqual({
      ok: false,
      reason: "empty_code",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpdate).not.toHaveBeenCalled();
  });

  it("ein Ziel OHNE Testmodus wird abgewiesen — vor jedem Client", async () => {
    // google und linkedin tragen keinen Testmodus dieser Phase. Der Aufruf kann ueber
    // die Oberflaeche gar nicht entstehen — eine Server Action nimmt aber entgegen,
    // was ueber die Leitung kommt, und der Typ ist zur Laufzeit geloescht.
    //
    // -----------------------------------------------------------------
    // NACHGEZOGEN MIT SCHEIBE 11.3e. HIER STAND EINE HARTKODIERTE KOPIE DER
    // KOMPLEMENTAERMENGE: `["pinterest", "google", "linkedin"]`. Mit der Aufnahme von
    // pinterest in TARGETS_WITH_TEST_MODE ist sie ROT geworden — DAS WAR DER
    // GEWUENSCHTE AUSGANG und kein Schaden: pinterest ist seither ein BEKANNTES Ziel
    // mit Testmodus und antwortet nach Entscheidung (16) mit `code_not_allowed`.
    //
    // WAS GEPRUEFT WURDE, BEVOR ETWAS GEAENDERT WURDE (Auflage (a2) des Zuschnitts):
    // Die ZUSICHERUNG des Titels — "ein Ziel OHNE Testmodus wird abgewiesen, vor
    // jedem Client" — ist unveraendert richtig. Falsch geworden ist allein ihr
    // BEISPIEL. Wer stattdessen die Liste um pinterest kuerzt und sie hartkodiert
    // stehenlaesst, hat die Kopie behalten und den naechsten Bruch nur vertagt.
    //
    // DIE MENGE WIRD DESHALB ABGELEITET STATT AUFGEZAEHLT. Sie ist damit
    // definitionsgemaess das Komplement und kann nicht mehr von ihm abdriften; kommt
    // ein Ziel in den Testmodus, wandert es hier von selbst heraus.
    // DIE POSITIVKONTROLLE STEHT DANEBEN UND IST NICHT VERZICHTBAR: Waere die
    // abgeleitete Menge LEER, ginge der Lauf trivial durch und behauptete weiter
    // etwas (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI
    // WEISEN HOHL", Fall 2).
    // -----------------------------------------------------------------
    const ohneTestmodus = TRACKING_TARGETS.filter(
      (ziel) => !TARGETS_WITH_TEST_MODE.includes(ziel),
    );
    expect(ohneTestmodus.length).toBeGreaterThan(0);

    makeClient({ user: { id: "u1" } });
    for (const ziel of ohneTestmodus) {
      expect(await startTestMode("proj-1", ziel, "TEST123")).toEqual({
        ok: false,
        reason: "unknown_target",
      });
      expect(await endTestMode("proj-1", ziel)).toEqual({
        ok: false,
        reason: "unknown_target",
      });
    }
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  // TM16 — EIN ZIEL OHNE CODE-PFLICHT KOMMT OHNE CODE DURCH (Scheibe 11.3e).
  //
  // ER IST DER LAUF, DER DIE SCHEIBE SCHARF MACHT: Bis hierher konnte KEIN
  // Schreibpfad des Produkts fuer pinterest einen Testzustand ablegen —
  // `startTestMode` wies das Ziel mit `unknown_target` ab, und davor wies die
  // Code-Pruefung jeden leeren Code mit `empty_code` ab. BEIDE Riegel mussten fallen,
  // und dieser Lauf haelt fest, dass sie es getan haben.
  //
  // ROT DURCH: eine Vorpruefung, die wieder fuer JEDES Ziel einen Code verlangt
  // (Pflicht-Mutation M1) — oder eine Ziel-Pruefung, die pinterest nicht kennt.
  it("TM16: ein Ziel OHNE Code-Pflicht startet OHNE Code, und die Frist steht", async () => {
    makeClient({ user: { id: "u1" } });
    setUpdateResult({ data: { target: "pinterest" }, error: null });
    vi.useFakeTimers();
    vi.setSystemTime(1_800_000_000 * 1000);
    try {
      const r = await startTestMode("proj-1", "pinterest", "");
      // ZWEI BEHAUPTUNGEN, NICHT EINE: dass es DURCHGEHT und dass der Zustand die
      // FRIST traegt. Ein `ok: true` ohne Endzeitpunkt waere ein Erfolg ohne Wirkung.
      expect(r).toEqual({
        ok: true,
        state: {
          kind: "laeuft",
          endetAt: 1_800_000_000 + TEST_MODE_DURATION_SECONDS,
        },
      });
    } finally {
      vi.useRealTimers();
    }
  });

  // TM17 — DER NEUE ABLEHNUNGSGRUND (Entscheidung (16), Scheibe 11.3e).
  //
  // ZWEI BEHAUPTUNGEN, NICHT EINE: "abgewiesen" und "geschrieben, aber Fehler
  // gemeldet" saehen an einer einzelnen Assertion identisch aus — dieselbe Auflage
  // wie bei der Pflicht-Mutation zum leeren Code darueber.
  //
  // WARUM NICHT `unknown_target`: Das Ziel IST bekannt und HAT einen Testmodus, nur
  // keinen Code. Ein Fehlergrund, der etwas Falsches sagt, schickt den naechsten
  // Sucher an die falsche Stelle.
  // WARUM NICHT IGNORIEREN: Der Aufrufer bekaeme `ok: true` fuer einen Vorgang, bei
  // dem etwas Verlangtes verworfen wurde — eine schweigende Annahme.
  //
  // ROT DURCH: ein durchgereichter Code (dann traegt der Patch einen Wert, den der
  // CHECK aus 0029 abweist) oder ein stillschweigendes Verwerfen.
  it("TM17: ein nicht-leerer Code fuer ein Ziel OHNE Code-Pflicht wird abgewiesen UND nichts geschrieben", async () => {
    makeClient({ user: { id: "u1" } });
    expect(await startTestMode("proj-1", "pinterest", "TEST123")).toEqual({
      ok: false,
      reason: "code_not_allowed",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpdate).not.toHaveBeenCalled();
  });

  it("die Ziel-Pruefung liest die ECHTE Menge, nicht eine Kopie", async () => {
    // ROT DURCH: eine handgeschriebene Liste in der Aktion. Waechst die Menge, waechst
    // dieser Lauf mit.
    //
    // -----------------------------------------------------------------
    // VERMERKT MIT DER SCHEIBE 11.3d — ZWEI FALLEN AN DIESER SCHLEIFE, KEINE DAVON
    // HEUTE SCHARF. Die Scheibe 11.3d aendert an diesem Lauf NICHTS; sie ruehrt
    // TARGETS_WITH_TEST_MODE ausdruecklich nicht an. Der Vermerk steht hier, weil er am
    // ORT DER HANDLUNG stehen muss: Ein Satz im Zuschnitt ist kein Waechter, und ein
    // Waechter ist hier nicht baubar — der Fall bricht erst MIT der
    // Mengen-Erweiterung, also in der Scheibe 11.3e.
    //
    //  (1) SIE WAECHST STILLSCHWEIGEND MIT, STATT ROT ZU WERDEN. Kommt `pinterest` in
    //      die Menge, prueft dieser Lauf ab dann ein Ziel mit, fuer das ihn niemand
    //      geschrieben hat — und er behauptet dabei `ok === true` fuer einen Aufruf MIT
    //      Code. Fuer `pinterest` ist genau das falsch: der CHECK aus 0029 verbietet
    //      dort einen Testcode. DAS GEGENSTUECK IST TM13 in
    //      lib/tracking/credential-state.test.ts — jener Waechter WIRD rot, und das ist
    //      Absicht. Zwei Konsumenten derselben Menge, zwei entgegengesetzte Ausgaenge.
    //  (2) IHR SCHREIBWEG IST GEMOCKT. Die Datenbank faellt in diesem Lauf gar nicht
    //      auf: Er bliebe GRUEN AUS DEM FALSCHEN GRUND, waehrend der echte Schreibpfad
    //      einen Wert ablegte, den der CHECK aus 0029 abweist.
    // -----------------------------------------------------------------
    //
    // NACHGEZOGEN MIT SCHEIBE 11.3e — FALLE (1) IST EINGETRETEN UND HIER AUFGELOEST.
    // Der Absatz darueber bleibt woertlich stehen; er hat den Fall vorhergesagt.
    //
    // WAS SICH AENDERT: Der Lauf ruft NICHT MEHR JEDES Ziel mit einem Code. Er fragt
    // je Ziel die EINE Quelle (requiresTestCode) und erwartet den Ausgang, der zu
    // diesem Ziel gehoert. DIE ZUSICHERUNG DES TITELS IST UNBERUEHRT: Er liest
    // weiterhin die ECHTE Menge und keine Kopie — waechst sie, waechst er mit.
    //
    // WARUM NICHT EINFACH pinterest AUSNEHMEN: Das waere eine handgeschriebene
    // Ausnahme neben einer Auskunft, die es schon gibt — genau die zweite Wahrheit,
    // gegen die der Titel dieses Laufs geschrieben ist. Er FRAGT deshalb, statt zu
    // wissen.
    //
    // FALLE (2) BESTEHT UNVERAENDERT FORT: Der Schreibweg ist weiterhin GEMOCKT, die
    // Datenbank faellt hier nicht auf. Was der echte Schreibpfad ABLEGT, prueft ein
    // eigener Lauf ("der Schreibweg legt fuer ein Ziel OHNE Code-Pflicht …" unten) —
    // und der prueft den PATCH, nicht die Datenbank.
    makeClient({ user: { id: "u1" } });
    for (const ziel of TARGETS_WITH_TEST_MODE) {
      const r = await startTestMode("proj-1", ziel, "TEST123");
      if (requiresTestCode(ziel)) {
        expect(r).toEqual(
          expect.objectContaining({ ok: true }),
        );
      } else {
        // ENTSCHEIDUNG (16): Ein nicht-leerer Code fuer ein Ziel OHNE Code-Pflicht
        // wird abgewiesen — mit einem EIGENEN Grund, nicht als unknown_target.
        expect(r).toEqual({ ok: false, reason: "code_not_allowed" });
      }
    }
  });
});

// ===========================================================================
// DER SCHREIBWEG.
// ===========================================================================

describe("startTestMode — der Schreibweg", () => {
  it("schreibt AUSSCHLIESSLICH die zwei Testspalten, nie die ganze Zeile", async () => {
    // DER WAECHTER ZU ENTSCHEIDUNG (6). ROT DURCH: ein mitgeschriebenes `secret`,
    // `secret_enc` oder `updated_at`. Ein Geheimnis, das nur mitreist, weil es
    // zufaellig in derselben Zeile steht, ist genau die Bauform, aus der spaeter ein
    // ueberschriebenes Zugangsdatum wird.
    makeClient({ user: { id: "u1" } });
    await startTestMode("proj-1", "meta", "  TEST123  ");

    expect(adminUpdate).toHaveBeenCalledTimes(1);
    const patch = adminUpdate.mock.calls[0][0] as Record<string, unknown>;
    expect(Object.keys(patch).sort()).toEqual([
      "test_event_code",
      "test_mode_expires_at",
    ]);
    // DER CODE WIRD GETRIMMT ABGELEGT — sonst stuende in der Zeile ein Wert, den das
    // Praedikat spaeter anders liest als der Schreiber ihn gemeint hat.
    expect(patch.test_event_code).toBe("TEST123");
  });

  // TM18 — DER SCHREIBWEG FUER EIN ZIEL OHNE CODE-PFLICHT (Scheibe 11.3e).
  //
  // ER PRUEFT ZWEI DINGE, UND DIE ZWEITE IST DIE UNSCHEINBARE: dass der Patch
  // `test_event_code` AUSDRUECKLICH auf `null` setzt statt den Schluessel
  // WEGZULASSEN. Der Unterschied ist nicht kosmetisch — ein weggelassener Schluessel
  // liesse einen ALTEN Code stehen, und der CHECK aus 0029 verlangt bei pinterest
  // `test_event_code IS NULL`. Der Betreiber saehe dann `write_failed` fuer etwas,
  // das die Aktion selbst hinterlassen hat.
  //
  // DIE SPALTENZAHL BLEIBT ZWEI (Entscheidung (6)) — geaendert hat sich der WERT
  // eines Schluessels, nicht ihre Menge.
  //
  // ROT DURCH: ein weggelassener `test_event_code`-Schluessel, ein durchgereichter
  // Code, oder eine dritte Spalte im Patch.
  it("TM18: der Schreibweg legt fuer ein Ziel OHNE Code-Pflicht test_event_code als NULL ab — und nur die zwei Spalten", async () => {
    makeClient({ user: { id: "u1" } });
    setUpdateResult({ data: { target: "pinterest" }, error: null });
    await startTestMode("proj-1", "pinterest", "");

    expect(adminUpdate).toHaveBeenCalledTimes(1);
    const patch = adminUpdate.mock.calls[0][0] as Record<string, unknown>;
    expect(Object.keys(patch).sort()).toEqual([
      "test_event_code",
      "test_mode_expires_at",
    ]);
    // `toBeNull` UND NICHT `toBeFalsy`: Ein leerer String waere ebenfalls falsy, und
    // genau den weist der CHECK aus 0029 bei pinterest ab.
    expect(patch.test_event_code).toBeNull();
    // POSITIVKONTROLLE ZUR ZEILE DARUEBER: Der Patch traegt trotzdem eine Frist —
    // sonst waere "nichts Sinnvolles geschrieben" von "korrekt geschrieben" nicht zu
    // unterscheiden.
    expect(typeof patch.test_mode_expires_at).toBe("string");
  });

  it("die Frist entsteht aus der Uhr der LAUFZEIT und traegt die benannte Dauer", async () => {
    // DER WAECHTER ZU VORRAT (6): Geschrieben und gelesen wird gegen dieselbe
    // Uhrenfamilie. ROT DURCH: eine Frist aus `now() + interval` in Postgres (der
    // Patch truege dann gar keinen Zeitpunkt) oder eine andere Dauer.
    vi.useFakeTimers();
    vi.setSystemTime(new Date(1_800_000_000 * 1000));
    try {
      makeClient({ user: { id: "u1" } });
      const ergebnis = await startTestMode("proj-1", "meta", "TEST123");

      const patch = adminUpdate.mock.calls[0][0] as Record<string, unknown>;
      expect(patch.test_mode_expires_at).toBe(FRIST_ISO);
      expect(ergebnis).toEqual({
        ok: true,
        state: {
          kind: "laeuft",
          endetAt: 1_800_000_000 + TEST_MODE_DURATION_SECONDS,
        },
      });
    } finally {
      vi.useRealTimers();
    }
  });

  it("filtert auf (project_id, target) und fragt die Zeile ZURUECK", async () => {
    // `.select()` IST PFLICHT, nicht Zierrat: Nach der Supabase-Doku (gelesen
    // 2026-09-09, reference/javascript/update) gibt ein update die Zeilen per Default
    // NICHT zurueck — ohne den Anhang waere "null Zeilen getroffen" von
    // "geschrieben" nicht unterscheidbar.
    makeClient({ user: { id: "u1" } });
    await startTestMode("proj-1", "meta", "TEST123");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminUpdateEq).toEqual([
      ["project_id", "proj-1"],
      ["target", "meta"],
    ]);
    expect(adminUpdateSelectCols.length).toBe(1);
    expect(adminUpdateSelectCols[0]).not.toContain("secret");
    expect(adminUpdateSelectCols[0]).not.toContain("*");
  });

  it("NULL GETROFFENE ZEILEN sind ein eigener Ausgang, kein stilles Nichts", async () => {
    // DER NORMALFALL BEI EINEM ZIEL OHNE ZUGANGSDATEN, nicht ein Randfall: Ein
    // `update` ohne Treffer meldet KEINEN Fehler. Ohne diesen Zweig bekaeme der Kunde
    // eine Erfolgsmeldung fuer einen Vorgang, der nicht stattgefunden hat.
    // ROT DURCH: das `.select().maybeSingle()` entfernen und Erfolg melden.
    makeClient({ user: { id: "u1" } });
    setUpdateResult({ data: null, error: null });
    expect(await startTestMode("proj-1", "meta", "TEST123")).toEqual({
      ok: false,
      reason: "not_configured",
    });
  });

  it("ein Fehler des Schreibvorgangs wird NICHT als 'nicht eingerichtet' verschluckt", async () => {
    // DIE GEGENPROBE ZUM LAUF DARUEBER. Zwei Ursachen, zwei Ausgaenge — sonst liest
    // der Betreiber bei einem Datenbankfehler "keine Zugangsdaten hinterlegt" und
    // sucht an der falschen Stelle.
    makeClient({ user: { id: "u1" } });
    setUpdateResult({ data: null, error: { message: "boom" } });
    expect(await startTestMode("proj-1", "meta", "TEST123")).toEqual({
      ok: false,
      reason: "write_failed",
    });
  });
});

describe("endTestMode — die dritte Geste", () => {
  it("raeumt BEIDE Spalten und gibt den neuen Zustand zurueck", async () => {
    // BEIDE ODER KEINE: Der CHECK project_secrets_test_mode_paar verlangt es. ROT
    // DURCH: nur eine der beiden Spalten auf null setzen — die Zeile verletzte dann
    // den CHECK, und der Fehler faellt erst in der laufenden Datenbank auf.
    makeClient({ user: { id: "u1" } });
    const ergebnis = await endTestMode("proj-1", "meta");
    expect(adminUpdate).toHaveBeenCalledWith({
      test_event_code: null,
      test_mode_expires_at: null,
    });
    expect(ergebnis).toEqual({ ok: true, state: { kind: "aus" } });
  });

  it("NULL GETROFFENE ZEILEN: eigener Ausgang, auch hier", async () => {
    makeClient({ user: { id: "u1" } });
    setUpdateResult({ data: null, error: null });
    expect(await endTestMode("proj-1", "meta")).toEqual({
      ok: false,
      reason: "not_configured",
    });
  });
});

// ===========================================================================
// DER LESER.
// ===========================================================================

describe("listTestModeStates — was er herausgibt und was nicht", () => {
  it("GIBT DAS URTEIL HERAUS, NIE DEN CODE", async () => {
    // DER WAECHTER DER ENTSCHEIDUNG (D1). ROT DURCH: ein durchgereichtes
    // test_event_code im Rueckgabewert. Der Code wird gelesen, WEIL das Praedikat ihn
    // braucht — er verlaesst die Aktion nicht.
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: [
        {
          target: "meta",
          test_event_code: "GEHEIMER_TESTCODE",
          test_mode_expires_at: new Date(Date.now() + 600_000).toISOString(),
        },
      ],
      error: null,
    });
    const ergebnis = await listTestModeStates("proj-1");
    expect(ergebnis.ok).toBe(true);
    expect(JSON.stringify(ergebnis)).not.toContain("GEHEIMER_TESTCODE");
    // POSITIVKONTROLLE: Der Lauf hat wirklich einen Eintrag erzeugt — ohne sie waere
    // die Abwesenheit des Codes auch bei einem leeren Ergebnis wahr.
    expect(ergebnis).toEqual({
      ok: true,
      states: { meta: { kind: "laeuft", endetAt: expect.any(Number) } },
    });
  });

  it("SELEKTIERT NIE DAS GEHEIMNIS — nur die drei noetigen Spalten", async () => {
    makeClient({ user: { id: "u1" } });
    await listTestModeStates("proj-1");
    expect(adminSelectCols).toEqual([
      "target, test_event_code, test_mode_expires_at",
    ]);
    expect(adminSelectCols.join(" ")).not.toContain("secret");
    expect(adminSelectCols.join(" ")).not.toContain("*");
    expect(adminSelectEq).toEqual([["project_id", "proj-1"]]);
  });

  it("EIN ZIEL OHNE KENNUNG BEKOMMT KEINEN EINTRAG — derselbe Filter wie der Resolver", async () => {
    // DER WAECHTER ZU VORRAT (7). Der Resolver betrachtet nur Ziele mit Kennung oder
    // Zuordnung; ein Testzustand an einem Ziel ohne Kennung ist fuer ihn unsichtbar,
    // der Riegel feuerte dort NIE. Ein Schalter verspraeche eine Wirkung, die es
    // nicht gibt.
    // ROT DURCH: den Filter weglassen — dann traegt tiktok hier einen Eintrag.
    makeClient({
      user: { id: "u1" },
      owned: { id: "proj-1", settings: { pixels: { meta: { pixelId: "123" } } } },
    });
    setSelectResult({
      data: [
        { target: "meta", test_event_code: null, test_mode_expires_at: null },
        { target: "tiktok", test_event_code: null, test_mode_expires_at: null },
      ],
      error: null,
    });
    const ergebnis = await listTestModeStates("proj-1");
    expect(ergebnis).toEqual({ ok: true, states: { meta: { kind: "aus" } } });
  });

  it("ein Ziel OHNE Testmodus bekommt keinen Eintrag, auch mit Kennung und Zeile", async () => {
    // -----------------------------------------------------------------
    // NACHGEZOGEN MIT SCHEIBE 11.3e — DER TITEL BLEIBT WOERTLICH, DAS EXEMPLAR NICHT.
    //
    // HIER STAND `pinterest` als Beispiel fuer "ein Ziel ohne Testmodus". Mit der
    // Aufnahme in TARGETS_WITH_TEST_MODE ist der Lauf ROT geworden.
    // WAS GEPRUEFT WURDE, BEVOR ETWAS GEAENDERT WURDE: Die ZUSICHERUNG des Titels ist
    // unveraendert richtig — der Leser gibt fuer ein Ziel ohne Testmodus keinen
    // Eintrag heraus, auch wenn Kennung UND Zeile da sind. Falsch geworden ist allein
    // sein BEISPIEL.
    //
    // DAS EXEMPLAR WIRD DESHALB ABGELEITET STATT HARTKODIERT. Es ist damit
    // definitionsgemaess ein Ziel ohne Testmodus und kann nicht mehr davon abdriften;
    // kommt es spaeter in den Testmodus, wandert der Lauf von selbst auf das
    // naechste. Dieselbe Bauform wie beim Lauf "ein Ziel OHNE Testmodus wird
    // abgewiesen — vor jedem Client" weiter oben.
    //
    // DIE LEERLAUF-ZUSICHERUNG IST PFLICHT UND KEIN ZIERRAT, UND DAS IST KEIN
    // HYPOTHETISCHER FALL: google und linkedin stehen in dieser Phase noch aus
    // (docs/aktiver-stand.md, "Gegenstand der Phase"). Kommen BEIDE in den Testmodus,
    // ist die Komplementaermenge LEER — dieser Lauf iterierte dann ueber nichts,
    // bliebe GRUEN und pruefte nichts mehr. Das ist Fall (1) aus
    // docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN
    // HOHL": Sein Gegenstand ist entfernt worden, und er sieht danach STAERKER aus
    // statt schwaecher, weil er weiter Erfolg meldet.
    // ER SICHERT DESHALB ZUERST ZU, DASS DIE MENGE NICHT LEER IST, und prueft danach.
    //
    // DIE KENNUNG BLEIBT TRAGEND ("auch mit Kennung und Zeile"): hasTargetPixelId
    // urteilt heute ziel-generisch (lib/settings.ts) — ein nicht-leerer Wert
    // passiert den Kennungs-Filter fuer JEDES Ziel. Der Lauf zeigt damit, dass der
    // Eintrag an der ZIELMENGE ausfaellt und nicht am Filter davor.
    // -----------------------------------------------------------------
    const ohneTestmodus = TRACKING_TARGETS.filter(
      (ziel) => !TARGETS_WITH_TEST_MODE.includes(ziel),
    );
    expect(ohneTestmodus.length).toBeGreaterThan(0);
    const exemplar = ohneTestmodus[0];

    makeClient({
      user: { id: "u1" },
      owned: {
        id: "proj-1",
        settings: { pixels: { [exemplar]: { pixelId: "KENNUNG-1" } } },
      },
    });
    setSelectResult({
      data: [
        { target: exemplar, test_event_code: null, test_mode_expires_at: null },
      ],
      error: null,
    });
    expect(await listTestModeStates("proj-1")).toEqual({ ok: true, states: {} });
  });

  it("ein Lesefehler wird BENANNT und nicht auf 'nichts hinterlegt' eingeebnet", async () => {
    // DER UNTERSCHIED ZU listConfiguredTargets, deren benannte Schwaeche genau das
    // tut. Ein Schalter auf unbekanntem Zustand boete an, eine Zaehlung anzuhalten,
    // ohne sagen zu koennen, ob sie schon steht.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: null, error: { message: "boom" } });
    expect(await listTestModeStates("proj-1")).toEqual({
      ok: false,
      reason: "read_failed",
    });
  });

  it("verwirft Ziel-Werte, die dieser Code nicht kennt", async () => {
    // Die DB kann nach einem Rollback auf eine aeltere Code-Fassung Werte tragen, die
    // hier unbekannt sind. Der Wert ist SYNTHETISCH und kein plausibler Zielname —
    // ein plausibler koennte spaeter real werden und den Lauf still entwerten.
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: [
        { target: "kein_ziel_dieser_welt", test_event_code: null, test_mode_expires_at: null },
      ],
      error: null,
    });
    expect(await listTestModeStates("proj-1")).toEqual({ ok: true, states: {} });
  });
});
