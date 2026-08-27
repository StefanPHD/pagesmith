import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung. Der Pruefling traegt die Marke
// bewusst, also wird sie hier neutralisiert — dasselbe Muster wie in
// google-authorize.test.ts und secrets/oauth-payload.test.ts.
vi.mock("server-only", () => ({}));

import {
  buildTokenRequestBody,
  exchangeAuthorizationCode,
  GOOGLE_TOKEN_ENDPOINT,
  readTokenExchangeConfig,
  toOAuthPayload,
  TOKEN_EXCHANGE_TIMEOUT_MS,
} from "./google-token";

// ===========================================================================
// KEIN ECHTER WERT. Jede Kennung, jedes Geheimnis und jedes Token unten ist erfunden
// und am NAMEN erkennbar.
//
// DAS IST KEINE FORMSACHE, SONDERN REGEL: "EIN LEAK-TEST WIRD NIE MIT EINEM ECHTEN
// GEHEIMNIS GEFAHREN" (docs/immer-beachten.md, SCHWAERZUNG, Teil (d)).
// ===========================================================================

const ERFUNDENE_CLIENT_ID = "erfundene-client-id-nicht-echt.apps.example";
const ERFUNDENES_CLIENT_SECRET = "ERFUNDEN-client-secret-nicht-echt-0001";
const ERFUNDENE_REDIRECT_URI = "http://localhost:3000/api/oauth/google/callback";
const ERFUNDENER_CODE = "ERFUNDEN-autorisierungs-code-nicht-echt-0001";
const ERFUNDENES_ZUGANGSDATUM = "ERFUNDEN-access-token-nicht-echt-0001";
const ERFUNDENES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-nicht-echt-0001";

const EMPFANGEN_UM = 1_700_000_000;

const ORIGINAL_ENV = {
  clientId: process.env.GOOGLE_OAUTH_CLIENT_ID,
  redirectUri: process.env.GOOGLE_OAUTH_REDIRECT_URI,
  clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET,
};

function setEnv(
  clientId: string | undefined,
  redirectUri: string | undefined,
  clientSecret: string | undefined,
): void {
  if (clientId === undefined) delete process.env.GOOGLE_OAUTH_CLIENT_ID;
  else process.env.GOOGLE_OAUTH_CLIENT_ID = clientId;
  if (redirectUri === undefined) delete process.env.GOOGLE_OAUTH_REDIRECT_URI;
  else process.env.GOOGLE_OAUTH_REDIRECT_URI = redirectUri;
  if (clientSecret === undefined) delete process.env.GOOGLE_OAUTH_CLIENT_SECRET;
  else process.env.GOOGLE_OAUTH_CLIENT_SECRET = clientSecret;
}

function setDefaultEnv(): void {
  setEnv(
    ERFUNDENE_CLIENT_ID,
    ERFUNDENE_REDIRECT_URI,
    ERFUNDENES_CLIENT_SECRET,
  );
}

/** Die vollstaendige Antwort, wie der Anbieter sie im gelesenen Beispiel zeigt. */
function volleAntwort(
  ueberschreibungen: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    access_token: ERFUNDENES_ZUGANGSDATUM,
    expires_in: 3920,
    token_type: "Bearer",
    scope: "https://www.googleapis.com/auth/datamanager",
    refresh_token: ERFUNDENES_ERNEUERUNGS_TOKEN,
    ...ueberschreibungen,
  };
}

/** Baut eine fetch-Attrappe, die EINE Antwort liefert. */
function fetchGibt(
  status: number,
  body: unknown,
): ReturnType<typeof vi.fn> {
  return vi.fn(async () => ({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }));
}

const ECHTES_FETCH = globalThis.fetch;

beforeEach(() => {
  setDefaultEnv();
});

afterEach(() => {
  setEnv(
    ORIGINAL_ENV.clientId,
    ORIGINAL_ENV.redirectUri,
    ORIGINAL_ENV.clientSecret,
  );
  globalThis.fetch = ECHTES_FETCH;
  vi.restoreAllMocks();
});

describe("readTokenExchangeConfig", () => {
  it("K0 — liest die drei Werte und traegt bei einer fehlenden nur ihren NAMEN", () => {
    expect(readTokenExchangeConfig()).toEqual({
      kind: "ok",
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      redirectUri: ERFUNDENE_REDIRECT_URI,
    });

    setEnv(ERFUNDENE_CLIENT_ID, ERFUNDENE_REDIRECT_URI, undefined);
    const ohne = readTokenExchangeConfig();
    expect(ohne).toEqual({
      kind: "missing_config",
      variable: "GOOGLE_OAUTH_CLIENT_SECRET",
    });
    // DER NAME, NIE DER WERT — und das ist der eigentliche Gegenstand dieses Tests.
    expect(JSON.stringify(ohne)).not.toContain(ERFUNDENES_CLIENT_SECRET);
  });

  it("K0b — eine fehlende Basis-Variable wird durchgereicht, nicht verschluckt", () => {
    setEnv(undefined, ERFUNDENE_REDIRECT_URI, ERFUNDENES_CLIENT_SECRET);
    expect(readTokenExchangeConfig()).toEqual({
      kind: "missing_config",
      variable: "GOOGLE_OAUTH_CLIENT_ID",
    });
  });
});

describe("buildTokenRequestBody und die Anfrage-Form", () => {
  it("K1 — Endpunkt, Methode, Content-Type und die FUENF Parameter", async () => {
    const attrappe = fetchGibt(200, volleAntwort());
    globalThis.fetch = attrappe as unknown as typeof fetch;

    await exchangeAuthorizationCode({
      code: ERFUNDENER_CODE,
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      redirectUri: ERFUNDENE_REDIRECT_URI,
    });

    expect(attrappe).toHaveBeenCalledTimes(1);
    const [ziel, init] = attrappe.mock.calls[0] as [string, RequestInit];
    expect(ziel).toBe("https://oauth2.googleapis.com/token");
    expect(GOOGLE_TOKEN_ENDPOINT).toBe("https://oauth2.googleapis.com/token");
    expect(init.method).toBe("POST");
    expect(
      (init.headers as Record<string, string>)["Content-Type"],
    ).toBe("application/x-www-form-urlencoded");

    const gesendet = new URLSearchParams(init.body as string);
    expect([...gesendet.keys()].sort()).toEqual([
      "client_id",
      "client_secret",
      "code",
      "grant_type",
      "redirect_uri",
    ]);
    expect(gesendet.get("grant_type")).toBe("authorization_code");
    expect(gesendet.get("code")).toBe(ERFUNDENER_CODE);
  });

  // INVARIANTE (3). ROT, sobald jemand normalisiert, anhaengt oder einen Schraegstrich
  // entfernt. Der Anbieter gleicht HIER ERNEUT als ZEICHENKETTE ab.
  it("K2 — die Weiterleitungs-Adresse geht UNVERAENDERT hinein", () => {
    const eigenwillig = "https://Beispiel.Example/api/oauth/Google/callback/";
    const roh = buildTokenRequestBody({
      code: ERFUNDENER_CODE,
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      redirectUri: eigenwillig,
    });
    expect(new URLSearchParams(roh).get("redirect_uri")).toBe(eigenwillig);
  });

  it("K2b — kein DPoP-Kopf: der Anbieter weist ihn als Optional aus", async () => {
    const attrappe = fetchGibt(200, volleAntwort());
    globalThis.fetch = attrappe as unknown as typeof fetch;
    await exchangeAuthorizationCode({
      code: ERFUNDENER_CODE,
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      redirectUri: ERFUNDENE_REDIRECT_URI,
    });
    const [, init] = attrappe.mock.calls[0] as [string, RequestInit];
    expect(Object.keys(init.headers as Record<string, string>)).toEqual([
      "Content-Type",
    ]);
  });
});

describe("exchangeAuthorizationCode — die Ausgaenge", () => {
  it("K3 — ein Abbruch ist timeout und NICHT network_error", async () => {
    const abbruch = Object.assign(new Error("aborted"), { name: "AbortError" });
    globalThis.fetch = vi.fn(async () => {
      throw abbruch;
    }) as unknown as typeof fetch;

    expect(
      await exchangeAuthorizationCode({
        code: ERFUNDENER_CODE,
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        redirectUri: ERFUNDENE_REDIRECT_URI,
      }),
    ).toEqual({ kind: "timeout" });
  });

  it("K3b — ein echter Netzwerkfehler ist network_error und NICHT timeout", async () => {
    globalThis.fetch = vi.fn(async () => {
      throw new Error("ECONNRESET");
    }) as unknown as typeof fetch;

    expect(
      await exchangeAuthorizationCode({
        code: ERFUNDENER_CODE,
        clientId: ERFUNDENE_CLIENT_ID,
        clientSecret: ERFUNDENES_CLIENT_SECRET,
        redirectUri: ERFUNDENE_REDIRECT_URI,
      }),
    ).toEqual({ kind: "network_error" });
  });

  // DIE FEHLERFORM DES ANBIETERS IST NICHT GELESEN (Lauf 6, Teil (bd)). Deshalb traegt
  // das Ergebnis den STATUS und KEINEN Rumpf — gegen eine ungelesene Form eine
  // Schwaerzung zu bauen hiesse, sie auf Verdacht zu bauen.
  it("K4 — http_error traegt den Status und KEINEN Rumpf", async () => {
    const geheimnisvollerRumpf = { error: "invalid_grant", code: ERFUNDENER_CODE };
    globalThis.fetch = fetchGibt(400, geheimnisvollerRumpf) as unknown as typeof fetch;

    const ergebnis = await exchangeAuthorizationCode({
      code: ERFUNDENER_CODE,
      clientId: ERFUNDENE_CLIENT_ID,
      clientSecret: ERFUNDENES_CLIENT_SECRET,
      redirectUri: ERFUNDENE_REDIRECT_URI,
    });

    expect(ergebnis).toEqual({ kind: "http_error", status: 400 });
    expect(JSON.stringify(ergebnis)).not.toContain(ERFUNDENER_CODE);
    expect(JSON.stringify(ergebnis)).not.toContain("invalid_grant");
  });

  it("K4b — das Timeout ist 8000 ms, dem Vorbild vercel/client.ts folgend", () => {
    expect(TOKEN_EXCHANGE_TIMEOUT_MS).toBe(8000);
  });
});

describe("toOAuthPayload — die Auswertung je Feld", () => {
  it("K5 — eine vollstaendige Antwort ergibt alle vier Felder", () => {
    const ergebnis = toOAuthPayload(volleAntwort(), EMPFANGEN_UM);
    expect(ergebnis).toEqual({
      kind: "ok",
      refreshExpiryIgnored: false,
      payload: {
        accessToken: ERFUNDENES_ZUGANGSDATUM,
        accessTokenExpiresAt: EMPFANGEN_UM + 3920,
        refreshToken: ERFUNDENES_ERNEUERUNGS_TOKEN,
        refreshTokenExpiresAt: { kind: "unknown" },
      },
    });
  });

  // E2: expires_in ist eine RESTDAUER, keine Uhrzeit. ROT, sobald jemand sie roh
  // ablegt oder ab einem anderen Bezugspunkt rechnet.
  it("K6 — expires_in wird AB EMPFANG in einen Zeitpunkt umgerechnet", () => {
    const ergebnis = toOAuthPayload(volleAntwort({ expires_in: 60 }), EMPFANGEN_UM);
    if (ergebnis.kind !== "ok") throw new Error("Aufbau kaputt");
    expect(ergebnis.payload.accessTokenExpiresAt).toBe(EMPFANGEN_UM + 60);
    // Die rohe Restdauer darf NICHT im Feld stehen.
    expect(ergebnis.payload.accessTokenExpiresAt).not.toBe(60);
  });

  // E3: EIGENER Ausgang, nicht bad_response und ausdruecklich nicht ok.
  it("K7 — fehlendes refresh_token ergibt no_refresh_token", () => {
    const ohne = volleAntwort();
    delete ohne.refresh_token;
    expect(toOAuthPayload(ohne, EMPFANGEN_UM)).toEqual({
      kind: "no_refresh_token",
    });
    expect(
      toOAuthPayload(volleAntwort({ refresh_token: "" }), EMPFANGEN_UM),
    ).toEqual({ kind: "no_refresh_token" });
  });

  it("K8 — fehlendes refresh_token_expires_in ergibt den Zustand unknown", () => {
    const ergebnis = toOAuthPayload(volleAntwort(), EMPFANGEN_UM);
    if (ergebnis.kind !== "ok") throw new Error("Aufbau kaputt");
    expect(ergebnis.payload.refreshTokenExpiresAt).toEqual({ kind: "unknown" });
    expect(ergebnis.refreshExpiryIgnored).toBe(false);
  });

  it("K8b — ein brauchbares refresh_token_expires_in wird zum Zeitpunkt", () => {
    const ergebnis = toOAuthPayload(
      volleAntwort({ refresh_token_expires_in: 604800 }),
      EMPFANGEN_UM,
    );
    if (ergebnis.kind !== "ok") throw new Error("Aufbau kaputt");
    expect(ergebnis.payload.refreshTokenExpiresAt).toEqual({
      kind: "at",
      epochSeconds: EMPFANGEN_UM + 604800,
    });
  });

  // D-I, ERSTE HAELFTE: Das Feld HAT einen benannten Zustand fuer "nicht bekannt";
  // ein unbrauchbarer Wert IST genau das. Eine ganze Autorisierung daran scheitern zu
  // lassen waere der teurere Fehler.
  it("K9 — ein unbrauchbares refresh_token_expires_in wird unknown und meldet sich", () => {
    for (const kaputt of ["viel", -1, Number.NaN, {}, true]) {
      const ergebnis = toOAuthPayload(
        volleAntwort({ refresh_token_expires_in: kaputt }),
        EMPFANGEN_UM,
      );
      if (ergebnis.kind !== "ok") throw new Error(`unerwartet: ${ergebnis.kind}`);
      expect(ergebnis.payload.refreshTokenExpiresAt).toEqual({ kind: "unknown" });
      expect(ergebnis.refreshExpiryIgnored).toBe(true);
    }
  });

  // D-I, ZWEITE HAELFTE: accessTokenExpiresAt ist eine ZAHL OHNE AUSWEICHZUSTAND —
  // jeder erfundene Wert waere still falsch. Also ein Ausgang.
  it("K10 — ein unbrauchbares expires_in ergibt bad_response, kein Ersatzwert", () => {
    for (const kaputt of [undefined, "3920", -1, Number.NaN, null]) {
      const antwort = volleAntwort({ expires_in: kaputt });
      if (kaputt === undefined) delete antwort.expires_in;
      expect(toOAuthPayload(antwort, EMPFANGEN_UM)).toEqual({
        kind: "bad_response",
        field: "expires_in",
      });
    }
  });

  it("K10b — ein fehlendes oder leeres access_token ergibt bad_response", () => {
    const ohne = volleAntwort();
    delete ohne.access_token;
    expect(toOAuthPayload(ohne, EMPFANGEN_UM)).toEqual({
      kind: "bad_response",
      field: "access_token",
    });
    expect(
      toOAuthPayload(volleAntwort({ access_token: "" }), EMPFANGEN_UM),
    ).toEqual({ kind: "bad_response", field: "access_token" });
  });

  it("K10c — ein Nicht-Objekt als Rumpf ergibt bad_response", () => {
    expect(toOAuthPayload(null, EMPFANGEN_UM)).toEqual({
      kind: "bad_response",
      field: "body",
    });
    expect(toOAuthPayload("kein objekt", EMPFANGEN_UM)).toEqual({
      kind: "bad_response",
      field: "body",
    });
  });

  // DIE ZWEI REGELN VERTRAGEN SICH NUR SO: Google verlangt, unbekannte Felder zu
  // IGNORIEREN; formatOAuthPayload LEHNT sie AB. Wer die Antwort SPREIZT, bringt jedes
  // zusaetzliche Google-Feld direkt in die Ablehnung. ROT bei einem Spread.
  it("K11 — fremde Zusatzfelder werden ignoriert, die Antwort wird NIE gespreizt", () => {
    const ergebnis = toOAuthPayload(
      volleAntwort({
        ein_neues_google_feld: "was auch immer",
        id_token: "ERFUNDEN-id-token-0001",
      }),
      EMPFANGEN_UM,
    );
    if (ergebnis.kind !== "ok") throw new Error("Aufbau kaputt");
    expect(Object.keys(ergebnis.payload).sort()).toEqual([
      "accessToken",
      "accessTokenExpiresAt",
      "refreshToken",
      "refreshTokenExpiresAt",
    ]);
  });

  // K12: Die Uhr wird EINMAL gelesen. Beide Zeitpunkte muessen denselben Bezugspunkt
  // tragen — sonst ist ihre Differenz spaeter unerklaerlich.
  it("K12 — beide Ablaufwerte ruhen auf DEMSELBEN Empfangszeitpunkt", () => {
    const ergebnis = toOAuthPayload(
      volleAntwort({ expires_in: 100, refresh_token_expires_in: 500 }),
      EMPFANGEN_UM,
    );
    if (ergebnis.kind !== "ok") throw new Error("Aufbau kaputt");
    const zugang = ergebnis.payload.accessTokenExpiresAt;
    const erneuerung = ergebnis.payload.refreshTokenExpiresAt;
    if (erneuerung.kind !== "at") throw new Error("Aufbau kaputt");
    expect(zugang - 100).toBe(EMPFANGEN_UM);
    expect(erneuerung.epochSeconds - 500).toBe(EMPFANGEN_UM);
    expect(zugang - 100).toBe(erneuerung.epochSeconds - 500);
  });

  it("K12b — ein unbrauchbarer Empfangszeitpunkt ergibt bad_response", () => {
    expect(toOAuthPayload(volleAntwort(), -1)).toEqual({
      kind: "bad_response",
      field: "receivedAt",
    });
    expect(toOAuthPayload(volleAntwort(), 1.5)).toEqual({
      kind: "bad_response",
      field: "receivedAt",
    });
  });

  it("K13 — toOAuthPayload wirft nie, auch bei absurden Eingaben nicht", () => {
    for (const absurd of [undefined, 0, [], () => {}, Symbol("x")]) {
      expect(() => toOAuthPayload(absurd, EMPFANGEN_UM)).not.toThrow();
    }
  });
});
