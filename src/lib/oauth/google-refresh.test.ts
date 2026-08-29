import { afterEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung. Der Pruefling traegt die Marke
// bewusst, also wird sie hier neutralisiert — dasselbe Muster wie in
// google-token.test.ts.
vi.mock("server-only", () => ({}));

import {
  buildRefreshRequestBody,
  exchangeRefreshToken,
  REFRESH_TIMEOUT_MS,
  toRefreshedPayload,
} from "./google-refresh";
import { GOOGLE_TOKEN_ENDPOINT } from "./google-token";
import type { OAuthPayload } from "@/lib/secrets/oauth-payload";

// ===========================================================================
// KEIN ECHTER WERT. Jede Kennung, jedes Geheimnis und jedes Token unten ist erfunden
// und am NAMEN erkennbar — Regel "EIN LEAK-TEST WIRD NIE MIT EINEM ECHTEN GEHEIMNIS
// GEFAHREN" (docs/immer-beachten.md, SCHWAERZUNG, Teil (d)).
//
// WAS HIER GEMOCKT WIRD: NUR das Netz (globalThis.fetch). Alles andere laeuft echt.
// ===========================================================================

const ERFUNDENE_CLIENT_ID = "erfundene-client-id-nicht-echt.apps.example";
const ERFUNDENES_CLIENT_SECRET = "ERFUNDEN-client-secret-nicht-echt-0003";
const ALTES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-ALT-nicht-echt-0003";
const NEUES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-NEU-nicht-echt-0003";
const NEUES_ZUGANGSDATUM = "ERFUNDEN-access-token-NEU-nicht-echt-0003";

/** Ein erfundener Fremdtext, wie ihn eine Anbieter-Fehlerantwort tragen koennte. */
const ERFUNDENER_FREMDTEXT = "ERFUNDEN-fremdtext-aus-der-anbieter-antwort-0003";

const EMPFANGEN_UM = 1_700_000_000;

/** Die abgelegte Nutzlast, gegen die erneuert wird. */
function abgelegt(
  ueberschreibungen: Partial<OAuthPayload> = {},
): OAuthPayload {
  return {
    accessToken: "ERFUNDEN-access-token-ALT-nicht-echt-0003",
    accessTokenExpiresAt: EMPFANGEN_UM - 10,
    refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    refreshTokenExpiresAt: { kind: "at", epochSeconds: EMPFANGEN_UM + 500_000 },
    ...ueberschreibungen,
  };
}

/** Die Antwort des Token-Endpunkts auf eine Erneuerung. */
function antwort(
  ueberschreibungen: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    access_token: NEUES_ZUGANGSDATUM,
    expires_in: 3599,
    token_type: "Bearer",
    scope: "https://www.googleapis.com/auth/datamanager",
    ...ueberschreibungen,
  };
}

/** Baut eine fetch-Attrappe, die EINE Antwort liefert. */
function fetchGibt(status: number, body: unknown): ReturnType<typeof vi.fn> {
  return vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }));
}

/** Baut eine fetch-Attrappe, deren Rumpf UNLESBAR ist. */
function fetchGibtUnlesbar(status: number): ReturnType<typeof vi.fn> {
  return vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => {
      throw new Error("ERFUNDEN-unlesbarer-rumpf");
    },
  }));
}

const ECHTES_FETCH = globalThis.fetch;

afterEach(() => {
  globalThis.fetch = ECHTES_FETCH;
  vi.restoreAllMocks();
});

describe("buildRefreshRequestBody", () => {
  it("G1 — VIER Parameter, grant_type=refresh_token, und client_secret ist DABEI", () => {
    const roh = buildRefreshRequestBody({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });
    const params = new URLSearchParams(roh);

    expect(params.get("client_id")).toBe(ERFUNDENE_CLIENT_ID);
    // FESTLEGUNG 2 DES ZUSCHNITTS: client_secret WIRD MITGESENDET — so ist es
    // gemessen (Messung C, docs/ziel-befunde.md, Teile (bv) und (by)). Der Verzicht
    // waere eine Aenderung auf ungemessener Grundlage.
    expect(params.get("client_secret")).toBe(ERFUNDENES_CLIENT_SECRET);
    expect(params.get("refresh_token")).toBe(ALTES_ERNEUERUNGS_TOKEN);
    expect(params.get("grant_type")).toBe("refresh_token");

    // GENAU VIER, nicht mehr: ein durchgereichter Zusatzparameter waere ein stiller
    // Unterschied zum gemessenen Aufruf.
    expect([...params.keys()].sort()).toEqual([
      "client_id",
      "client_secret",
      "grant_type",
      "refresh_token",
    ]);
  });
});

describe("exchangeRefreshToken — die Anfrage", () => {
  it("G2 — Endpunkt, Methode, Content-Type und ein ABBRUCH-SIGNAL", async () => {
    const attrappe = fetchGibt(200, antwort());
    globalThis.fetch = attrappe as unknown as typeof fetch;

    await exchangeRefreshToken({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });

    expect(attrappe).toHaveBeenCalledTimes(1);
    const [url, init] = attrappe.mock.calls[0] as [string, RequestInit];
    // DER ENDPUNKT WIRD AUS google-token.ts IMPORTIERT — hier wird geprueft, dass es
    // DERSELBE ist und keine zweite Zeichenkette daneben steht.
    expect(url).toBe(GOOGLE_TOKEN_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(
      (init.headers as Record<string, string>)["Content-Type"],
    ).toBe("application/x-www-form-urlencoded");

    // DEFENSIVE TIMEOUTS (CLAUDE.md, Block A): JEDER externe API-Call braucht ein
    // striktes Timeout. Dieser Test ist sein Waechter — ohne ihn ruhte der Deckel auf
    // einer Zeile, die niemand behauptet.
    expect(init.signal).toBeInstanceOf(AbortSignal);
    expect(REFRESH_TIMEOUT_MS).toBeGreaterThan(0);
    expect(Number.isFinite(REFRESH_TIMEOUT_MS)).toBe(true);
  });

  it("G3 — 200 liefert den Rumpf als ok", async () => {
    globalThis.fetch = fetchGibt(200, antwort()) as unknown as typeof fetch;

    const res = await exchangeRefreshToken({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });

    expect(res).toEqual({ kind: "ok", body: antwort() });
  });

  it("G4 — ABBRUCH und NETZFEHLER sind GETRENNT, nicht ein Zustand", async () => {
    const abbruch = Object.assign(new Error("aborted"), { name: "AbortError" });
    globalThis.fetch = vi.fn(async () => {
      throw abbruch;
    }) as unknown as typeof fetch;

    await expect(
      exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      }),
    ).resolves.toEqual({ kind: "timeout" });

    globalThis.fetch = vi.fn(async () => {
      throw new Error("ERFUNDEN-netz-kaputt");
    }) as unknown as typeof fetch;

    // WAERE DAS EIN ZUSTAND, saehe ein ueberschrittener Deckel aus wie ein kaputtes
    // Netz — und die Suche begaenne am falschen Ende.
    await expect(
      exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      }),
    ).resolves.toEqual({ kind: "network_error" });
  });

  it("G5 — invalid_grant wird OHNE STATUSCODE-BEDINGUNG erkannt (400 UND 503)", async () => {
    // DIE AUFLAGE, WOERTLICH: Teil (bd) haelt fest, dass die Doku fuer invalid_grant
    // KEINEN Statuscode nennt — der einzige Fehler-Statuscode jener Seite steht bei
    // den DPoP-Fehlern. Wer ihn uebernimmt, uebertraegt einen Statuscode von einem
    // Fehlerpfad auf einen anderen.
    for (const status of [400, 401, 403, 503]) {
      globalThis.fetch = fetchGibt(status, {
        error: "invalid_grant",
        error_description: ERFUNDENER_FREMDTEXT,
      }) as unknown as typeof fetch;

      const res = await exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      });

      expect(res).toEqual({ kind: "http_error", status, invalidGrant: true });
    }
  });

  it("G6 — ein ANDERER Code und ein UNLESBARER Rumpf ergeben beide invalidGrant=false", async () => {
    globalThis.fetch = fetchGibt(400, {
      error: "ERFUNDEN_UNBEKANNTER_CODE",
    }) as unknown as typeof fetch;
    await expect(
      exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      }),
    ).resolves.toEqual({ kind: "http_error", status: 400, invalidGrant: false });

    // DIE STRENGE RICHTUNG: aus "ich konnte nicht nachsehen" wird nie "der Zugang ist
    // tot". Ein unlesbarer 4xx-Rumpf landet damit im Rahmen in retry/unexpected.
    globalThis.fetch = fetchGibtUnlesbar(400) as unknown as typeof fetch;
    await expect(
      exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      }),
    ).resolves.toEqual({ kind: "http_error", status: 400, invalidGrant: false });
  });

  it("G7 — KEIN FREMDTEXT VERLAESST DIESE DATEI, auch nicht aus dem Fehler-Rumpf", async () => {
    globalThis.fetch = fetchGibt(400, {
      error: "invalid_grant",
      error_description: ERFUNDENER_FREMDTEXT,
      hint: ERFUNDENES_CLIENT_SECRET,
    }) as unknown as typeof fetch;

    const res = await exchangeRefreshToken({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });

    // DER GEGENSTAND: Das Ergebnis traegt den Status und einen boolean — sonst
    // nichts. Waere der Rumpf durchgereicht, stuende der Fremdtext hier.
    const serialisiert = JSON.stringify(res);
    expect(serialisiert).not.toContain(ERFUNDENER_FREMDTEXT);
    expect(serialisiert).not.toContain(ERFUNDENES_CLIENT_SECRET);
    expect(serialisiert).not.toContain(ALTES_ERNEUERUNGS_TOKEN);
  });

  it("G8 — ein unlesbarer Rumpf bei 200 ist network_error, kein http_error", async () => {
    globalThis.fetch = fetchGibtUnlesbar(200) as unknown as typeof fetch;

    await expect(
      exchangeRefreshToken({
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        refreshToken: ALTES_ERNEUERUNGS_TOKEN,
      }),
    ).resolves.toEqual({ kind: "network_error" });
  });
});

describe("der Deckel deckt AUCH das Lesen des Rumpfes", () => {
  // ===========================================================================
  // DIESE ZWEI TESTS SIND DER WAECHTER FUER B-4, und sie pruefen etwas anderes als
  // G4: DORT bricht der fetch selbst ab. HIER kehrt der fetch ZURUECK — die
  // Kopfzeilen sind da — und der ABBRUCH trifft erst das Lesen des RUMPFES.
  //
  // WARUM SIE ROT WERDEN, WENN clearTimeout WIEDER VOR DAS RUMPF-LESEN WANDERT: Der
  // Timer waere dann bereits geloescht, der Abbruch fiele nie, und die
  // Rumpf-Zusage loeste sich nie auf — der Test liefe in seinen eigenen
  // Zeitablauf statt in eine Zusicherung. Das ist die schaerfste verfuegbare Probe:
  // sie misst die WIRKUNG des Deckels, nicht seine Textstelle.
  //
  // ECHTE Zeitgeber werden hier durch KUENSTLICHE ersetzt, damit die Probe nicht acht
  // Sekunden braucht.
  // ===========================================================================

  /**
   * Eine Antwort, deren Rumpf erst dann etwas tut, wenn der Deckel zuschlaegt: Das
   * json()-Versprechen loest sich AUSSCHLIESSLICH ueber das Abbruch-Signal auf, das
   * die Attrappe aus dem init-Argument bekommt.
   */
  function fetchHaengtImRumpf(status: number): ReturnType<typeof vi.fn> {
    return vi.fn(async (_url: string, init: RequestInit) => ({
      ok: status >= 200 && status < 300,
      status,
      json: () =>
        new Promise((_aufloesen, ablehnen) => {
          (init.signal as AbortSignal).addEventListener("abort", () => {
            ablehnen(
              Object.assign(new Error("aborted"), { name: "AbortError" }),
            );
          });
        }),
    }));
  }

  it("G18 — ein Abbruch WAEHREND des Rumpf-Lesens bei 200 ist timeout, nicht network_error", async () => {
    vi.useFakeTimers();
    globalThis.fetch = fetchHaengtImRumpf(200) as unknown as typeof fetch;

    const lauf = exchangeRefreshToken({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });
    await vi.advanceTimersByTimeAsync(REFRESH_TIMEOUT_MS);

    await expect(lauf).resolves.toEqual({ kind: "timeout" });
    vi.useRealTimers();
  });

  it("G19 — ein Abbruch WAEHREND des Lesens eines FEHLER-Rumpfes ist timeout, nicht http_error", async () => {
    // DER FEHLERPFAD BRAUCHT SEINEN EIGENEN TEST: Dort liest readErrorBody, nicht der
    // 2xx-Zweig. Ohne diesen Test waere die Haelfte des Rumpf-Lesens ungedeckt — und
    // ein Abbruch kaeme dort als {http_error, invalidGrant:false} heraus, also als
    // retry/"unexpected" statt als retry/"timeout". Beides ist retry; die DIAGNOSE
    // waere falsch.
    vi.useFakeTimers();
    globalThis.fetch = fetchHaengtImRumpf(400) as unknown as typeof fetch;

    const lauf = exchangeRefreshToken({
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    });
    await vi.advanceTimersByTimeAsync(REFRESH_TIMEOUT_MS);

    await expect(lauf).resolves.toEqual({ kind: "timeout" });
    vi.useRealTimers();
  });
});

describe("toRefreshedPayload — die zwei Uhren", () => {
  it("G9 — UHR 1 wird IMMER neu gesetzt, ab EMPFANG", () => {
    const res = toRefreshedPayload(
      antwort({ expires_in: 3599 }),
      EMPFANGEN_UM,
      abgelegt(),
    );
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.payload.accessTokenExpiresAt).toBe(EMPFANGEN_UM + 3599);
    expect(res.payload.accessToken).toBe(NEUES_ZUGANGSDATUM);
  });

  it("G10 — UHR 2 wird neu gesetzt, wenn die Antwort eine brauchbare Restdauer traegt", () => {
    const res = toRefreshedPayload(
      antwort({ refresh_token_expires_in: 581_408 }),
      EMPFANGEN_UM,
      abgelegt(),
    );
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.payload.refreshTokenExpiresAt).toEqual({
      kind: "at",
      epochSeconds: EMPFANGEN_UM + 581_408,
    });
  });

  it("G11 — UHR 2 bleibt STEHEN, wenn das Feld fehlt oder untauglich ist — NIE zurueck auf unknown", () => {
    // DER TEURERE FEHLER WAERE DAS ZURUECKSETZEN: Festlegung 5 haengt genau an dieser
    // Information, und ein Zuruecksetzen ist der einzige Weg, der sie VERLIERT.
    for (const roh of [{}, { refresh_token_expires_in: null }, {
      refresh_token_expires_in: "3600",
    }, { refresh_token_expires_in: -1 }]) {
      const res = toRefreshedPayload(
        antwort(roh),
        EMPFANGEN_UM,
        abgelegt(),
      );
      expect(res.kind).toBe("ok");
      if (res.kind !== "ok") continue;
      expect(res.payload.refreshTokenExpiresAt).toEqual({
        kind: "at",
        epochSeconds: EMPFANGEN_UM + 500_000,
      });
    }
  });

  it("G12 — ein abgelegtes unknown SCHLAEGT durch eine brauchbare Antwort in ein at um, und das ist ERWUENSCHT", () => {
    // ARCHITEKT, 2026-08-29: Der Zugang verlaesst damit dauerhaft die Asymmetrie der
    // Festlegung 5 — solange die Uhr unbekannt ist, wird bei JEDEM Lauf ein Netzruf
    // gemacht, weil "unbekannt" nie als ueberschritten gilt.
    const res = toRefreshedPayload(
      antwort({ refresh_token_expires_in: 604_800 }),
      EMPFANGEN_UM,
      abgelegt({ refreshTokenExpiresAt: { kind: "unknown" } }),
    );
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.payload.refreshTokenExpiresAt).toEqual({
      kind: "at",
      epochSeconds: EMPFANGEN_UM + 604_800,
    });

    // Und ohne brauchbare Antwort bleibt unknown stehen.
    const ohne = toRefreshedPayload(
      antwort(),
      EMPFANGEN_UM,
      abgelegt({ refreshTokenExpiresAt: { kind: "unknown" } }),
    );
    expect(ohne.kind).toBe("ok");
    if (ohne.kind !== "ok") return;
    expect(ohne.payload.refreshTokenExpiresAt).toEqual({ kind: "unknown" });
  });
});

describe("toRefreshedPayload — das Erneuerungs-Token", () => {
  it("G13 — fehlt refresh_token, bleibt das ABGELEGTE erhalten", () => {
    // DIE MEHRDEUTIGKEIT AUS TEIL (bv): "kein neues Erneuerungs-Token an die Stelle
    // des alten" trennt "Feld fehlt" nicht von "Feld traegt denselben Wert". Dieser
    // Test haelt fest, dass der Deuter unter BEIDEN Auslegungen richtig ist — und
    // dass er ausdruecklich KEIN no_refresh_token kennt, anders als der Code-Tausch.
    const res = toRefreshedPayload(antwort(), EMPFANGEN_UM, abgelegt());
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.payload.refreshToken).toBe(ALTES_ERNEUERUNGS_TOKEN);
  });

  it("G14 — ein vorhandenes, nicht-leeres refresh_token wird UEBERNOMMEN", () => {
    // Damit traegt der Deuter auch einen Anbieter, der eines Tages doch rotiert.
    const res = toRefreshedPayload(
      antwort({ refresh_token: NEUES_ERNEUERUNGS_TOKEN }),
      EMPFANGEN_UM,
      abgelegt(),
    );
    expect(res.kind).toBe("ok");
    if (res.kind !== "ok") return;
    expect(res.payload.refreshToken).toBe(NEUES_ERNEUERUNGS_TOKEN);
  });

  it("G15 — ein LEERES oder falsch getyptes refresh_token wirft das abgelegte NICHT weg", () => {
    for (const roh of [{ refresh_token: "" }, { refresh_token: 42 }]) {
      const res = toRefreshedPayload(antwort(roh), EMPFANGEN_UM, abgelegt());
      expect(res.kind).toBe("ok");
      if (res.kind !== "ok") continue;
      expect(res.payload.refreshToken).toBe(ALTES_ERNEUERUNGS_TOKEN);
    }
  });
});

describe("toRefreshedPayload — die Ablehnungen", () => {
  it("G16 — access_token und expires_in sind PFLICHT, mit dem FELDNAMEN im Ergebnis", () => {
    expect(
      toRefreshedPayload(
        antwort({ access_token: "" }),
        EMPFANGEN_UM,
        abgelegt(),
      ),
    ).toEqual({ kind: "bad_response", field: "access_token" });

    expect(
      toRefreshedPayload(
        antwort({ expires_in: "3599" }),
        EMPFANGEN_UM,
        abgelegt(),
      ),
    ).toEqual({ kind: "bad_response", field: "expires_in" });
  });

  it("G17 — ein Nicht-Objekt und eine untaugliche Uhr werden benannt abgewiesen", () => {
    expect(toRefreshedPayload(null, EMPFANGEN_UM, abgelegt())).toEqual({
      kind: "bad_response",
      field: "body",
    });
    expect(toRefreshedPayload("text", EMPFANGEN_UM, abgelegt())).toEqual({
      kind: "bad_response",
      field: "body",
    });
    expect(toRefreshedPayload(antwort(), -1, abgelegt())).toEqual({
      kind: "bad_response",
      field: "receivedAt",
    });
    expect(toRefreshedPayload(antwort(), 1.5, abgelegt())).toEqual({
      kind: "bad_response",
      field: "receivedAt",
    });
  });
});
