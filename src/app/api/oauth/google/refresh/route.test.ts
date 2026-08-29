import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung; die Importkette der Route
// zieht sie ueber die Bibliotheksfunktion herein.
vi.mock("server-only", () => ({}));

// ===========================================================================
// WAS HIER GEMOCKT WIRD UND WAS NICHT:
//
//   GEMOCKT: der authenticated Supabase-Client (Sitzung und Eigentums-Abfrage) und
//            refreshAccessToken — die Bibliotheksfunktion hat ihre eigene Testdatei,
//            und sie hier ECHT laufen zu lassen brauchte einen zweiten Datenbank-Mock
//            fuer eine Frage, die diese Datei gar nicht stellt.
//
//   ECHT:    isProjectIdShape (google-authorize) und die Route selbst.
//
// WAS DIESE DATEI PRUEFT, IST DAS GATE UND DIE ANTWORTFORM — nicht die Erneuerung.
// ===========================================================================

const refreshAccessTokenMock = vi.fn();
vi.mock("@/lib/oauth/token-refresh", () => ({
  refreshAccessToken: (...args: unknown[]) => refreshAccessTokenMock(...args),
}));

let angemeldeterNutzer: { id: string } | null;
let projektTreffer: { data: unknown; error: unknown };
let gefilterteSpalten: Array<[string, unknown]>;
let selektierteTabellen: string[];

vi.mock("@/lib/supabase/server", () => ({
  createClient: async () => ({
    auth: {
      getUser: async () => ({ data: { user: angemeldeterNutzer } }),
    },
    from: (tabelle: string) => {
      selektierteTabellen.push(tabelle);
      const kette = {
        select: () => kette,
        eq: (spalte: string, wert: unknown) => {
          gefilterteSpalten.push([spalte, wert]);
          return kette;
        },
        maybeSingle: async () => projektTreffer,
      };
      return kette;
    },
  }),
}));

import { dynamic, POST, runtime } from "./route";
import * as routenModul from "./route";

const PROJEKT_ID = "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d";
const FREMDE_PROJEKT_ID = "1b2c3d4e-5f6a-4b7c-8d9e-0f1a2b3c4d5e";
const NUTZER_ID = "9f8e7d6c-5b4a-4392-8172-635241302918";

/** ERFUNDEN. Diese Werte duerfen in KEINER Antwort auftauchen. */
const ERFUNDENES_ZUGANGSDATUM = "ERFUNDEN-access-token-nicht-echt-0005";
const ERFUNDENES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-nicht-echt-0005";

const JETZT = 1_700_000_000;

function anfrage(projekt: string): Request {
  return new Request(
    `http://localhost:3000/api/oauth/google/refresh?project=${projekt}`,
    { method: "POST" },
  );
}

beforeEach(() => {
  angemeldeterNutzer = { id: NUTZER_ID };
  projektTreffer = { data: { id: PROJEKT_ID }, error: null };
  gefilterteSpalten = [];
  selektierteTabellen = [];
  refreshAccessTokenMock.mockReset();
  refreshAccessTokenMock.mockResolvedValue({
    kind: "ok",
    accessTokenExpiresAt: JETZT + 3599,
    refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 581_408 },
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("die Bauform", () => {
  it("R0 — nodejs-Laufzeit, force-dynamic, und NUR POST", () => {
    // Der Pfad zieht ueber cipher.ts node:crypto herein -> Edge scheidet aus.
    expect(runtime).toBe("nodejs");
    expect(dynamic).toBe("force-dynamic");
    // KEIN GET: Ein GET wuerde von jedem Vorablade-Mechanismus mit der Sitzung des
    // Betreibers ausgeloest — und diese Route SCHREIBT eine Zeile und ruft einen
    // fremden Endpunkt.
    expect("GET" in routenModul).toBe(false);
  });
});

describe("das Eigentums-Gate", () => {
  it("T13 — ein FREMDES Projekt endet in 404, und die Erneuerung wird GAR NICHT gerufen", async () => {
    // DER GEGENSTAND: refreshAccessToken prueft KEIN Eigentum und instanziiert selbst
    // den Admin-Client (service_role, bypassed RLS). project_secrets traegt RLS aktiv
    // und KEINE Policy — DIESES GATE IST DIE EINZIGE ISOLATIONSSCHICHT DES PFADES.
    // Waere es hinter dem Aufruf, liefe der privilegierte Zugriff bereits.
    projektTreffer = { data: null, error: null };

    const res = await POST(anfrage(FREMDE_PROJEKT_ID));

    expect(res.status).toBe(404);
    expect(refreshAccessTokenMock).not.toHaveBeenCalled();
  });

  it("R2 — ohne Sitzung 401, ohne Aufruf und OHNE Projekt-Abfrage", async () => {
    angemeldeterNutzer = null;

    const res = await POST(anfrage(PROJEKT_ID));

    // KEIN Redirect: Diese Route wird programmatisch gerufen, eine Weiterleitung
    // nach /login waere dort eine 200 mit einer Anmeldeseite im Rumpf.
    expect(res.status).toBe(401);
    expect(await res.json()).toEqual({ error: "unauthenticated" });
    expect(selektierteTabellen).toHaveLength(0);
    expect(refreshAccessTokenMock).not.toHaveBeenCalled();
  });

  it("R3 — eine formwidrige Kennung endet in 404, VOR jeder Abfrage", async () => {
    const res = await POST(anfrage("keine-uuid"));

    expect(res.status).toBe(404);
    expect(selektierteTabellen).toHaveLength(0);
    expect(refreshAccessTokenMock).not.toHaveBeenCalled();
  });

  it("R4 — das Gate filtert auf projects, auf die Kennung UND auf den Nutzer", async () => {
    await POST(anfrage(PROJEKT_ID));

    expect(selektierteTabellen).toContain("projects");
    // user_id-Filter ZUSAETZLICH zur RLS (defense in depth).
    expect(gefilterteSpalten).toEqual([
      ["id", PROJEKT_ID],
      ["user_id", NUTZER_ID],
    ]);
  });

  it("R5 — ein Fehler der Abfrage wird NICHT als 'nicht gefunden' gelesen", async () => {
    // { data, error } IMMER destrukturiert — sonst wird ein Fehler still verschluckt
    // und sieht aus wie "nicht gefunden".
    projektTreffer = { data: null, error: { message: "ERFUNDEN-db-fehler" } };
    vi.spyOn(console, "error").mockImplementation(() => {});

    const res = await POST(anfrage(PROJEKT_ID));

    expect(res.status).toBe(500);
    expect(refreshAccessTokenMock).not.toHaveBeenCalled();
  });
});

describe("die Antwort", () => {
  it("T14 — die Antwort traegt den Zustand und die ZWEI ZEITPUNKTE, aber KEIN TOKEN", async () => {
    // DIESER TEST IST EIN EINZELSTUECK (docs/immer-beachten.md, Lektion (f) an
    // "MUTATIONSPROBEN"): Kein anderer Test dieser Suite bringt die Route dazu, ein
    // Token auszuliefern. Wer ihn als redundant entfernt, nimmt die einzige Abdeckung
    // dieser Fehlerklasse mit.
    refreshAccessTokenMock.mockResolvedValue({
      kind: "ok",
      accessTokenExpiresAt: JETZT + 3599,
      refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 581_408 },
      // Ein Feld, das es im Ergebnistyp NICHT gibt — haette die Route den Zustand
      // gespreizt statt Felder einzeln zu nennen, stuende es in der Antwort.
      accessToken: ERFUNDENES_ZUGANGSDATUM,
      refreshToken: ERFUNDENES_ERNEUERUNGS_TOKEN,
    });

    const res = await POST(anfrage(PROJEKT_ID));
    const rumpf = await res.text();

    expect(res.status).toBe(200);
    expect(JSON.parse(rumpf)).toEqual({
      state: "ok",
      accessTokenExpiresAt: JETZT + 3599,
      refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 581_408 },
    });
    expect(rumpf).not.toContain(ERFUNDENES_ZUGANGSDATUM);
    expect(rumpf).not.toContain(ERFUNDENES_ERNEUERUNGS_TOKEN);
  });

  it("R6 — dead, retry und misconfigured kommen als ZUSTAND mit reason, jeweils mit 200", async () => {
    // Alle vier Zustaende sind ein gueltiges Ergebnis der Pruefung. Ein 4xx/5xx je
    // Zustand machte aus einer Diagnose einen Transportfehler und waere von einem
    // echten nicht zu unterscheiden.
    for (const [kind, reason] of [
      ["dead", "invalid_grant"],
      ["retry", "timeout"],
      ["misconfigured", "decrypt_unknown_key"],
    ] as const) {
      refreshAccessTokenMock.mockResolvedValue({ kind, reason });

      const res = await POST(anfrage(PROJEKT_ID));

      expect(res.status).toBe(200);
      expect(await res.json()).toEqual({ state: kind, reason });
    }
  });

  it("R7 — die Route ruft die Erneuerung mit dem geprueften Projekt und dem Ziel google", async () => {
    await POST(anfrage(PROJEKT_ID));

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(1);
    expect(refreshAccessTokenMock).toHaveBeenCalledWith({
      projectId: PROJEKT_ID,
      target: "google",
    });
  });

  it("R8 — die Antwort ist nicht geteilt zwischenspeicherbar", async () => {
    const res = await POST(anfrage(PROJEKT_ID));

    expect(res.headers.get("Cache-Control")).toBe("private, no-store");
  });
});
