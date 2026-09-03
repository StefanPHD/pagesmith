import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung. Die Klammer traegt selbst KEINE
// Marke, erbt sie aber ueber den Import von token-refresh.ts — und der ist hier
// gemockt, weshalb die Marke gar nicht erst gezogen wuerde. Der Mock steht trotzdem:
// Er kostet nichts und faellt nicht aus, wenn die Klammer je eine zweite Quelle
// bekommt.
vi.mock("server-only", () => ({}));

// ===========================================================================
// WAS HIER GEMOCKT WIRD UND WAS AUSDRUECKLICH NICHT — die Testentscheidung dieser
// Datei (docs/immer-beachten.md, "TEST-DISZIPLIN: DISKRIMINIEREND STATT BREIT
// GEMOCKT"):
//
//   GEMOCKT: refreshAccessToken — und NUR sie. Sie hat ihre eigene Testdatei mit 27
//            Laeufen; sie hier echt zu fahren brauchte einen Datenbank- UND einen
//            Netz-Mock fuer eine Frage, die DIESE Datei nicht stellt.
//
//   ECHT:    runRefresh selbst, einschliesslich Schleife, Deckel und Logzeile.
//
// WAS DIESE DATEI PRUEFT, IST DIE KLAMMER — nicht die Erneuerung. Der GEGENSTAND ist
// die Zahl der Aufrufe und die Frage, welcher Ausgang eine Wiederholung ausloest.
//
// KEIN ECHTER WERT. Jede Kennung unten ist erfunden und am NAMEN erkennbar.
// ===========================================================================

const refreshAccessTokenMock = vi.fn();
vi.mock("@/lib/oauth/token-refresh", () => ({
  refreshAccessToken: (...args: unknown[]) => refreshAccessTokenMock(...args),
}));

import { REFRESH_MAX_ATTEMPTS, runRefresh } from "./refresh-run";

const PROJEKT_ID = "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d";
const JETZT = 1_700_000_000;

const OK = {
  kind: "ok" as const,
  accessTokenExpiresAt: JETZT + 3599,
  refreshTokenExpiresAt: { kind: "at" as const, epochSeconds: JETZT + 581_408 },
};

beforeEach(() => {
  refreshAccessTokenMock.mockReset();
  refreshAccessTokenMock.mockResolvedValue(OK);
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe("die Klammer reicht durch, was sie nicht wiederholt", () => {
  it("K1 — ok beim ersten Versuch: GENAU EIN Aufruf, attempts 1, outcome unveraendert", async () => {
    const res = await runRefresh({ projectId: PROJEKT_ID, target: "google" });

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(1);
    // DER GANZE AUSGANG, NICHT NUR SEIN kind: Die Klammer deutet nichts um und
    // erfindet keinen Zustand. Ein toEqual auf das ganze Objekt faengt auch ein
    // stillschweigend weggelassenes Feld.
    expect(res).toEqual({ outcome: OK, attempts: 1 });
  });

  it("K2 — dead und misconfigured werden NICHT wiederholt", async () => {
    // DER GEGENSTAND: Eine Wiederholung heilt dort nichts. Bei dead muss der Kunde neu
    // autorisieren, bei misconfigured ein Betreiber an die Zeile — beide Male
    // verbrauchte jeder weitere Durchlauf einen echten Netzaufruf oder einen
    // Datenbank-Zugriff fuer nichts.
    for (const ausgang of [
      { kind: "dead", reason: "invalid_grant" },
      { kind: "misconfigured", reason: "write_failed" },
    ] as const) {
      refreshAccessTokenMock.mockReset();
      refreshAccessTokenMock.mockResolvedValue(ausgang);

      const res = await runRefresh({ projectId: PROJEKT_ID, target: "google" });

      expect(refreshAccessTokenMock).toHaveBeenCalledTimes(1);
      expect(res).toEqual({ outcome: ausgang, attempts: 1 });
    }
  });
});

describe("die Wiederholung und ihr Deckel", () => {
  it("K3 — retry, dann ok: ZWEI Aufrufe, attempts 2, outcome ok", async () => {
    refreshAccessTokenMock
      .mockResolvedValueOnce({ kind: "retry", reason: "timeout" })
      .mockResolvedValueOnce(OK);

    const res = await runRefresh({ projectId: PROJEKT_ID, target: "google" });

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(2);
    expect(res).toEqual({ outcome: OK, attempts: 2 });
  });

  it("K4 — bleibt es bei retry, wird GENAU REFRESH_MAX_ATTEMPTS mal versucht", async () => {
    // DER WAECHTER DER OBERGRENZE. Die Attrappe liefert MEHR retry-Antworten als der
    // Deckel erlaubt und DANACH ein ok — waere der Deckel weg, liefe sie bis zu jenem
    // ok durch, und sowohl die Aufrufzahl als auch der Ausgang waeren andere.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    const letzterRetry = { kind: "retry", reason: "server" } as const;
    refreshAccessTokenMock.mockReset();
    for (let i = 0; i < REFRESH_MAX_ATTEMPTS + 2; i++) {
      refreshAccessTokenMock.mockResolvedValueOnce(letzterRetry);
    }
    refreshAccessTokenMock.mockResolvedValue(OK);

    const res = await runRefresh({ projectId: PROJEKT_ID, target: "google" });

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(REFRESH_MAX_ATTEMPTS);
    // DER AUSGANG BLEIBT retry MIT SEINEM reason — die Klammer macht aus einem
    // erschoepften Deckel keinen eigenen Zustand.
    expect(res).toEqual({
      outcome: letzterRetry,
      attempts: REFRESH_MAX_ATTEMPTS,
    });

    // DIE LOGZEILE, und was NICHT darin steht: kein Token, kein Chiffrat, kein
    // Fremdtext — der Ergebnistyp traegt keines von beidem.
    const geschrieben = JSON.stringify(fehler.mock.calls);
    expect(geschrieben).toContain("[oauth/refresh-run] exhausted");
    expect(geschrieben).toContain(PROJEKT_ID);
    expect(geschrieben).toContain(String(REFRESH_MAX_ATTEMPTS));
  });

  it("K4b — EIN einzelner retry-Fehlschlag schreibt KEINE exhausted-Zeile", async () => {
    // DIE GEGENPROBE ZU K4, und sie ist noetig: Ohne sie waere "die Zeile steht da"
    // auch dann gruen, wenn die Klammer sie bei JEDEM retry schriebe — dann meldete
    // ein Betreiber-Log "aufgegeben" fuer einen Lauf, der beim zweiten Versuch
    // durchlief.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    refreshAccessTokenMock
      .mockResolvedValueOnce({ kind: "retry", reason: "network" })
      .mockResolvedValueOnce(OK);

    await runRefresh({ projectId: PROJEKT_ID, target: "google" });

    expect(JSON.stringify(fehler.mock.calls)).not.toContain("exhausted");
  });
});

describe("was die Klammer weiterreicht und was sie nicht anfasst", () => {
  it("K5 — projectId und target gehen bei JEDEM Versuch unveraendert durch", async () => {
    // KEIN 'google'-LITERAL IN DER KLAMMER: Das Ziel ist Parameter, damit ein zweiter
    // Anbieter-Zweig keine Umstellung verlangt (dieselbe Linie wie in
    // refreshAccessToken, wo SUPPORTED_TARGETS rahmen-lokal steht).
    refreshAccessTokenMock
      .mockResolvedValueOnce({ kind: "retry", reason: "timeout" })
      .mockResolvedValueOnce(OK);

    await runRefresh({ projectId: PROJEKT_ID, target: "ERFUNDEN_ZIEL" });

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(2);
    for (const aufruf of refreshAccessTokenMock.mock.calls) {
      expect(aufruf[0]).toEqual({
        projectId: PROJEKT_ID,
        target: "ERFUNDEN_ZIEL",
      });
    }
  });

  it("K6 — ein WURF verlaesst die Klammer unveraendert: GENAU EIN Aufruf, keine Umdeutung", async () => {
    // EIN WURF IST KEIN AUSGANG (Dateikopf der Klammer). Die Wiederholung zaehlt
    // RUECKGABEN; ein try/catch um den Aufruf waere genau die Stelle, an der ein Wurf
    // zu einem erfundenen retry-Ausgang wird — und dann meldete die Klammer "nochmal
    // versuchen" fuer einen Zustand, ueber den sie nichts weiss.
    // WIRD ROT DURCH: ein catch in der Klammer, gleich ob es wiederholt oder einen
    // Ausgang erfindet.
    const wurf = new Error("ERFUNDEN-wurf-aus-der-erneuerung");
    refreshAccessTokenMock.mockRejectedValue(wurf);

    await expect(
      runRefresh({ projectId: PROJEKT_ID, target: "google" }),
    ).rejects.toThrow("ERFUNDEN-wurf-aus-der-erneuerung");

    expect(refreshAccessTokenMock).toHaveBeenCalledTimes(1);
  });
});
