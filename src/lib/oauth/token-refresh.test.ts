import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";

// server-only wirft ausserhalb einer Server-Umgebung. Die Pruefkette zieht cipher.ts
// und oauth-payload.ts ECHT herein — beide tragen die Marke.
vi.mock("server-only", () => ({}));

// ===========================================================================
// WAS HIER GEMOCKT WIRD UND WAS AUSDRUECKLICH NICHT — das ist die Testentscheidung
// dieser Datei und keine Bequemlichkeit (docs/immer-beachten.md, "TEST-DISZIPLIN:
// DISKRIMINIEREND STATT BREIT GEMOCKT"):
//
//   GEMOCKT: createAdminClient (die Datenbank) und exchangeRefreshToken (das NETZ,
//            und nur das).
//
//   ECHT:    decryptSecret und encryptSecret (cipher.ts), mit einem erfundenen, aber
//            ECHTEN Schluessel · formatOAuthPayload und parseOAuthPayload
//            (oauth-payload.ts) · toRefreshedPayload (google-refresh.ts, per
//            Teil-Mock ausdruecklich NICHT ersetzt) · readTokenExchangeConfig
//            (google-token.ts).
//
// WARUM DIE CHIFFRIERUNG ECHT LAEUFT: Nur so kann T8 beweisen, dass das GESCHRIEBENE
// nicht der Klartext ist UND sich zurueckrechnen laesst. Mit einer Attrappe waere T7
// ("kein Geheimnis im Log") eine Abwesenheits-Behauptung ueber etwas, das nie in den
// Scope kam.
//
// WARUM toRefreshedPayload ECHT LAEUFT: Waere es gemockt, prueften T12 und T20 nur den
// Mock — und genau die zwei Uhren sind der Gegenstand dieser Scheibe.
//
// KEIN ECHTER WERT. Jedes Token, jedes Geheimnis und jeder Schluessel unten ist
// erfunden und am NAMEN erkennbar.
// ===========================================================================

// vi.hoisted, weil vi.mock an den Dateianfang gehoben wird: eine Attrappe, die die
// Fabrik SOFORT auswertet (hier im Spread), muss vor der Hebung existieren.
const { exchangeRefreshTokenMock, createAdminClientMock } = vi.hoisted(() => ({
  exchangeRefreshTokenMock: vi.fn(),
  createAdminClientMock: vi.fn(),
}));

vi.mock("@/lib/oauth/google-refresh", async (importOriginal) => {
  const echt =
    await importOriginal<typeof import("@/lib/oauth/google-refresh")>();
  return { ...echt, exchangeRefreshToken: exchangeRefreshTokenMock };
});

vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => createAdminClientMock(),
}));

import {
  REFRESH_LEAD_SECONDS,
  refreshAccessToken,
} from "./token-refresh";
import { decryptSecret, encryptSecret } from "@/lib/secrets/cipher";
import {
  formatOAuthPayload,
  parseOAuthPayload,
} from "@/lib/secrets/oauth-payload";
import type { OAuthPayload } from "@/lib/secrets/oauth-payload";

// --- Erfundene Werte -----------------------------------------------------

/** ERFUNDEN, ABER FORMGUELTIG: 32 Bytes, base64. Kein echter Schluessel. */
const TESTSCHLUESSEL = Buffer.from(
  "ERFUNDEN-testschluessel-TR-00001",
  "utf8",
).toString("base64");
const ZWEITER_TESTSCHLUESSEL = Buffer.from(
  "ERFUNDEN-testschluessel-TR-00002",
  "utf8",
).toString("base64");

const KENNUNG = "tr-test";
const FREMDE_KENNUNG = "tr-fremd";

const ERFUNDENE_CLIENT_ID = "erfundene-client-id-nicht-echt.apps.example";
const ERFUNDENES_CLIENT_SECRET = "ERFUNDEN-client-secret-nicht-echt-0004";
const ERFUNDENE_REDIRECT_URI = "http://localhost:3000/api/oauth/google/callback";

const PROJEKT_ID = "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d";

const ALTES_ZUGANGSDATUM = "ERFUNDEN-access-token-ALT-nicht-echt-0004";
const NEUES_ZUGANGSDATUM = "ERFUNDEN-access-token-NEU-nicht-echt-0004";
const ALTES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-ALT-nicht-echt-0004";
const NEUES_ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-NEU-nicht-echt-0004";
const ERFUNDENER_FREMDTEXT = "ERFUNDEN-fremdtext-anbieter-antwort-0004";

/** Die feste Uhr dieser Datei. */
const JETZT = 1_700_000_000;

// --- Die Umgebung --------------------------------------------------------

const ORIGINAL_ENV = { ...process.env };

function setzeUmgebung(
  ueberschreibungen: Record<string, string | undefined> = {},
): void {
  const werte: Record<string, string | undefined> = {
    SECRET_ENC_KEYS: `${KENNUNG}:${TESTSCHLUESSEL}`,
    SECRET_ENC_ACTIVE_KEY_ID: KENNUNG,
    GOOGLE_OAUTH_CLIENT_ID: ERFUNDENE_CLIENT_ID,
    GOOGLE_OAUTH_CLIENT_SECRET: ERFUNDENES_CLIENT_SECRET,
    GOOGLE_OAUTH_REDIRECT_URI: ERFUNDENE_REDIRECT_URI,
    ...ueberschreibungen,
  };
  for (const [name, wert] of Object.entries(werte)) {
    if (wert === undefined) delete process.env[name];
    else process.env[name] = wert;
  }
}

// --- Die Datenbank-Attrappe ----------------------------------------------

type Leseergebnis = { data: unknown; error: unknown };

let leseergebnis: Leseergebnis;
let upsertAufrufe: unknown[][];
let upsertFehler: unknown;
let tabellen: string[];

function baueAdminAttrappe(): unknown {
  return {
    from: (tabelle: string) => {
      tabellen.push(tabelle);
      return {
        select: () => ({
          eq: () => ({
            eq: () => ({
              maybeSingle: async () => leseergebnis,
            }),
          }),
        }),
        upsert: async (...args: unknown[]) => {
          upsertAufrufe.push(args);
          return { error: upsertFehler };
        },
      };
    },
  };
}

// --- Nutzlast-Werkzeug ---------------------------------------------------

function nutzlast(ueberschreibungen: Partial<OAuthPayload> = {}): OAuthPayload {
  return {
    accessToken: ALTES_ZUGANGSDATUM,
    accessTokenExpiresAt: JETZT + 60,
    refreshToken: ALTES_ERNEUERUNGS_TOKEN,
    refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 500_000 },
    ...ueberschreibungen,
  };
}

/** Legt eine Nutzlast als ECHTES Chiffrat in die Lese-Attrappe. */
function lege(payload: OAuthPayload = nutzlast()): string {
  const formatiert = formatOAuthPayload(payload);
  if (formatiert.kind !== "ok") throw new Error("Testaufbau kaputt: format");
  const chiffrat = encryptSecret(formatiert.value);
  if (chiffrat.kind !== "ok") throw new Error("Testaufbau kaputt: encrypt");
  leseergebnis = { data: { secret_enc: chiffrat.value }, error: null };
  return chiffrat.value;
}

/** Die Antwort des Anbieters auf eine gelungene Erneuerung. */
function anbieterOk(
  body: Record<string, unknown> = {},
): { kind: "ok"; body: Record<string, unknown> } {
  return {
    kind: "ok",
    body: {
      access_token: NEUES_ZUGANGSDATUM,
      expires_in: 3599,
      token_type: "Bearer",
      ...body,
    },
  };
}

/** Liest das zuletzt geschriebene Chiffrat zurueck. */
function geschriebeneNutzlast(): OAuthPayload {
  const argument = upsertAufrufe.at(-1)?.[0] as { secret_enc?: unknown };
  const chiffrat = argument?.secret_enc;
  if (typeof chiffrat !== "string") throw new Error("nichts geschrieben");
  // Die Zurueckrechnung laeuft ueber die ECHTEN Funktionen — sie ist der Beweis, dass
  // das Geschriebene nicht der Klartext ist und trotzdem lesbar bleibt.
  const entschluesselt = decryptSecret(chiffrat);
  if (entschluesselt.kind !== "ok") {
    throw new Error(`decrypt: ${entschluesselt.kind}`);
  }
  const gelesen = parseOAuthPayload(entschluesselt.value);
  if (gelesen.kind !== "ok") throw new Error("parse kaputt");
  return gelesen.value;
}

beforeEach(() => {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(JETZT * 1000);
  setzeUmgebung();
  leseergebnis = { data: null, error: null };
  upsertAufrufe = [];
  upsertFehler = null;
  tabellen = [];
  createAdminClientMock.mockReset();
  createAdminClientMock.mockReturnValue(baueAdminAttrappe());
  exchangeRefreshTokenMock.mockReset();
  exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());
});

afterEach(() => {
  vi.useRealTimers();
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

// =========================================================================
// UHR 1 — DER VORLAUF
// =========================================================================

describe("Uhr 1 — der Vorlauf aus Festlegung 1", () => {
  it("T1 — laeuft das Zugangsdatum INNERHALB des Vorlaufs ab, wird GENAU EINMAL gerufen", async () => {
    // 120 Sekunden Restlaufzeit: noch nicht abgelaufen, aber innerhalb der fuenf
    // Minuten. WIRD DER VORLAUF AUF NULL GESETZT, gilt dieses Datum als "reicht noch"
    // und der erwartete Netzaufruf bleibt aus — dieser Test ist der Waechter dafuer.
    lege(nutzlast({ accessTokenExpiresAt: JETZT + 120 }));

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(exchangeRefreshTokenMock).toHaveBeenCalledTimes(1);
    expect(res.kind).toBe("ok");
  });

  it("T1b — ein BEREITS ABGELAUFENES Zugangsdatum wird ebenfalls erneuert", async () => {
    // EIGENER TEST NEBEN T1, weil die Differenz hier NEGATIV ist: eine Bedingung, die
    // nur das Fenster [jetzt, jetzt+vorlauf] traefe, liesse ein abgelaufenes Datum
    // stehen — und T1 merkte davon nichts.
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10_000 }));

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(exchangeRefreshTokenMock).toHaveBeenCalledTimes(1);
    expect(res.kind).toBe("ok");
  });

  it("T2 — reicht das alte Zugangsdatum, gibt es KEINEN Netzaufruf und KEINEN Schreibvorgang", async () => {
    lege(
      nutzlast({
        accessTokenExpiresAt: JETZT + REFRESH_LEAD_SECONDS + 3000,
      }),
    );

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
    expect(upsertAufrufe).toHaveLength(0);
    // ok TRAEGT DIE ABGELEGTEN ZEITPUNKTE — die zwei Faelle "erneuert" und "reichte
    // noch" werden im Ergebnis bewusst NICHT getrennt.
    expect(res).toEqual({
      kind: "ok",
      accessTokenExpiresAt: JETZT + REFRESH_LEAD_SECONDS + 3000,
      refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 500_000 },
    });
  });
});

// =========================================================================
// UHR 2 — FESTLEGUNG 5
// =========================================================================

describe("Uhr 2 — Festlegung 5", () => {
  it("T3 — ist das Erneuerungs-Token abgelaufen, ist der Zugang dead — OHNE Netzaufruf und OHNE Schreibvorgang", async () => {
    lege(
      nutzlast({
        accessTokenExpiresAt: JETZT - 10,
        refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT - 1 },
      }),
    );

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res).toEqual({ kind: "dead", reason: "refresh_token_expired" });
    // BEIDE ZUSICHERUNGEN MELDEN DIESELBE FEHLERKLASSE — "der Ausgang steht nicht VOR
    // dem Aufruf". Das ist Deckung, keine Kaskade.
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
    expect(upsertAufrufe).toHaveLength(0);
  });

  it("T3b — Uhr 2 ueberschritten, Uhr 1 reicht NOCH: das Ergebnis ist dead", async () => {
    // DER FALL, DEN DER ZUSCHNITT NICHT REGELT UND DEN A-4 ENTSCHEIDET (Uhr 2 wird
    // VOR Uhr 1 geprueft). FUER DIE BEWEIS-ROUTE IST DAS DIE EHRLICHE AUSKUNFT.
    // WER SCHEIBE 4 (DEN TRANSPORT) BAUT, FINDET DIESEN TEST: dort koennte noch
    // gesendet werden, solange Uhr 1 laeuft — dann ist diese Zuordnung neu zu pruefen.
    lege(
      nutzlast({
        accessTokenExpiresAt: JETZT + REFRESH_LEAD_SECONDS + 3000,
        refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT - 1 },
      }),
    );

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res).toEqual({ kind: "dead", reason: "refresh_token_expired" });
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
  });

  it("T4 — {kind:'unknown'} gilt NIE als ueberschritten: der Netzaufruf wird gemacht", async () => {
    lege(
      nutzlast({
        accessTokenExpiresAt: JETZT - 10,
        refreshTokenExpiresAt: { kind: "unknown" },
      }),
    );

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(exchangeRefreshTokenMock).toHaveBeenCalledTimes(1);
    expect(res.kind).toBe("ok");
  });
});

// =========================================================================
// DIE ABBILDUNG DER SECHS decryptSecret-ZUSTAENDE
// =========================================================================

describe("die Abbildung der decryptSecret-Zustaende", () => {
  it("T5 — unknown_key ist misconfigured, NICHT dead", async () => {
    // DER GRUND, WOERTLICH AUS DEM ZUSCHNITT: Der Kopf nennt eine Kennung, die DIESER
    // Umgebung nicht bekannt ist — das ist "andere Umgebung", nicht "Zugang tot".
    // Wer ihn in dead einebnet, schickt den Kunden durch einen Autorisierungs-Fluss,
    // der nichts heilt.
    // Das Chiffrat entsteht unter KENNUNG; gelesen wird in einer Umgebung, die NUR
    // FREMDE_KENNUNG kennt — genau der Fall "anderer Schluessel, andere Umgebung".
    lege();
    const chiffrat = (leseergebnis.data as { secret_enc: string }).secret_enc;
    setzeUmgebung({
      SECRET_ENC_KEYS: `${FREMDE_KENNUNG}:${ZWEITER_TESTSCHLUESSEL}`,
      SECRET_ENC_ACTIVE_KEY_ID: FREMDE_KENNUNG,
    });
    leseergebnis = { data: { secret_enc: chiffrat }, error: null };

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res).toEqual({
      kind: "misconfigured",
      reason: "decrypt_unknown_key",
    });
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
  });

  it("T6 — auth_failed ist dead", async () => {
    lege();
    const chiffrat = (leseergebnis.data as { secret_enc: string }).secret_enc;
    // DERSELBE Kennungsname, ein ANDERER Schluesselwert: genau der Fall, den die
    // Kennungs-Regel im Kopf von cipher.ts verbietet — und er faellt auf auth_failed.
    setzeUmgebung({ SECRET_ENC_KEYS: `${KENNUNG}:${ZWEITER_TESTSCHLUESSEL}` });
    leseergebnis = { data: { secret_enc: chiffrat }, error: null };

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "dead", reason: "decrypt_auth_failed" });
  });

  it("T6b — DIE NAMENSKOLLISION: bad_format des CHIFFRATS ist misconfigured, bad_format der NUTZLAST ist dead", async () => {
    // EIN TEST FUER BEIDE ABBILDUNGEN, ausdruecklich nicht zwei (Auflage A-1).
    // GRUND: Zwei gleichnamige Zustaende mit verschiedener Wirkung sind die Figur aus
    // "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
    // OBERFLAECHEN-PROBLEM, KEIN TESTPROBLEM" (docs/immer-beachten.md). Getrennt
    // gefuehrt wuerde beim naechsten Umbau eine von beiden nachgezogen und die andere
    // nicht — und niemand saehe es.

    // (a) Die Zeichenkette ist ueberhaupt kein Chiffrat dieser Form.
    leseergebnis = {
      data: { secret_enc: "kein.chiffrat.dieser.form" },
      error: null,
    };
    const chiffratFehler = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    // (b) Das Chiffrat ist einwandfrei, der KLARTEXT darin ist keine Nutzlast.
    const kaputt = encryptSecret("p1.nur.drei.teile");
    if (kaputt.kind !== "ok") throw new Error("Testaufbau kaputt");
    leseergebnis = { data: { secret_enc: kaputt.value }, error: null };
    const nutzlastFehler = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(chiffratFehler).toEqual({
      kind: "misconfigured",
      reason: "decrypt_bad_format",
    });
    expect(nutzlastFehler).toEqual({
      kind: "dead",
      reason: "parse_bad_format",
    });
    // DIE AUSSAGE DIESES TESTS IST DIE UNGLEICHHEIT, nicht die zwei Einzelwerte.
    expect(chiffratFehler.kind).not.toBe(nutzlastFehler.kind);
  });

  it("T6c — fehlendes und unbrauchbares Schluesselmaterial sind misconfigured", async () => {
    lege();
    const chiffrat = (leseergebnis.data as { secret_enc: string }).secret_enc;

    setzeUmgebung({ SECRET_ENC_KEYS: undefined });
    leseergebnis = { data: { secret_enc: chiffrat }, error: null };
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "decrypt_no_key" });

    setzeUmgebung({ SECRET_ENC_KEYS: `${KENNUNG}:zu-kurz` });
    leseergebnis = { data: { secret_enc: chiffrat }, error: null };
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "decrypt_bad_key" });
  });

  it("T6d — eine unbekannte Fassung der Nutzlast ist dead, aber NICHT parse_bad_format", async () => {
    const fremdeFassung = encryptSecret("p9.aa.bb.cc.dd");
    if (fremdeFassung.kind !== "ok") throw new Error("Testaufbau kaputt");
    leseergebnis = { data: { secret_enc: fremdeFassung.value }, error: null };

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "dead", reason: "parse_unknown_version" });
  });
});

// =========================================================================
// DIE ZEILE — A-3 UND A-5
// =========================================================================

describe("die Geheimnis-Zeile", () => {
  it("T17 — KEINE ZEILE ist dead, eine ZEILE OHNE CHIFFRAT ist misconfigured", async () => {
    // DER GRUND STEHT IM CODE UND GILT DEM ZWEITEN ANBIETER: LinkedIn-Zeilen tragen
    // heute KLARTEXT im Feld secret. Eine eingeebnete Fassung meldete "der Kunde muss
    // neu autorisieren" fuer eine INTAKTE Zeile in Alt-Form.
    leseergebnis = { data: null, error: null };
    const ohneZeile = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    leseergebnis = { data: { secret_enc: null }, error: null };
    const ohneChiffrat = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(ohneZeile).toEqual({ kind: "dead", reason: "no_row" });
    expect(ohneChiffrat).toEqual({
      kind: "misconfigured",
      reason: "no_secret_enc",
    });
    expect(ohneZeile.kind).not.toBe(ohneChiffrat.kind);
  });

  it("T18 — ein Lesefehler ist retry und wird NICHT als 'keine Zeile' gelesen", async () => {
    // GEAENDERT AM 2026-08-29 (ARCHITEKT, B-1): Der Ausgang war misconfigured und ist
    // retry. BEIM LESEN IST NICHTS VERBRAUCHT und kein Nebeneffekt eingetreten — ein
    // zweiter Versuch ist folgenlos. Die Umkehrung dazu steht an T22: beim SCHREIBEN
    // ist die Erneuerung bereits verbraucht, dort bleibt es misconfigured.
    leseergebnis = { data: null, error: { message: ERFUNDENER_FREMDTEXT } };

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "read" });
  });

  it("T19 — ein UNBEKANNTES Ziel bekommt einen benannten Ausgang und ruehrt die Datenbank NICHT an", async () => {
    lege();

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "ERFUNDEN_KEIN_ZIEL",
    });

    expect(res).toEqual({ kind: "misconfigured", reason: "unknown_target" });
    expect(createAdminClientMock).not.toHaveBeenCalled();
    expect(tabellen).toHaveLength(0);
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
  });
});

// =========================================================================
// DER ANBIETER-AUSGANG
// =========================================================================

describe("die Abbildung der Anbieter-Antwort", () => {
  beforeEach(() => {
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
  });

  it("T10 — invalid_grant ist dead, 5xx ist retry/server, alles andere retry/unexpected", async () => {
    // UNVERAENDERT UND MUSS GRUEN BLEIBEN: unterhalb 500 gilt invalid_grant bei JEDEM
    // Status — die Auflage aus Teil (bd), keinen Statuscode zur VORBEDINGUNG zu
    // machen, ist davon unberuehrt.
    exchangeRefreshTokenMock.mockResolvedValue({
      kind: "http_error",
      status: 400,
      invalidGrant: true,
    });
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "dead", reason: "invalid_grant" });

    exchangeRefreshTokenMock.mockResolvedValue({
      kind: "http_error",
      status: 503,
      invalidGrant: false,
    });
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "server" });

    // EIN UNERWARTETER ANBIETER-CODE LANDET IN retry, NICHT IN dead. Weiterversuchen
    // ist harmlos, vorzeitiges Aufgeben kostet einen Kunden-Autorisierungsfluss, den
    // niemand gebraucht haette. DAS DECKT AUCH DEN 4xx MIT UNLESBAREM RUMPF ab — dort
    // ist invalidGrant per Bau false.
    exchangeRefreshTokenMock.mockResolvedValue({
      kind: "http_error",
      status: 400,
      invalidGrant: false,
    });
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "unexpected" });
  });

  it("T10b — 5xx GEWINNT gegen invalid_grant: retry/server, nicht dead", async () => {
    // DER TRENNSCHAERFE-TEST ZU B-3 (ARCHITEKT, 2026-08-29). Er ist der EINZIGE Test,
    // der die Statusgrenze bewacht — T10 wuerde bei ihrem Wegfall gruen bleiben, weil
    // dort kein 5xx MIT invalid_grant vorkommt.
    // DER GRUND, den er festhaelt: Eine 5xx-Antwort ist per Definition ein
    // Serverfehler; dass ihr Rumpf invalid_grant nennt, ist UNGEMESSEN, und im
    // unbelegten Fall entscheidet die Asymmetrie — Weiterversuchen ist harmlos,
    // vorzeitiges Aufgeben kostet einen Kunden-Autorisierungsfluss.
    exchangeRefreshTokenMock.mockResolvedValue({
      kind: "http_error",
      status: 503,
      invalidGrant: true,
    });

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "server" });
  });

  it("T11 — Abbruch und Netzfehler bleiben GETRENNT bis ins Ergebnis", async () => {
    exchangeRefreshTokenMock.mockResolvedValue({ kind: "timeout" });
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "timeout" });

    exchangeRefreshTokenMock.mockResolvedValue({ kind: "network_error" });
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "network" });
  });

  it("T21 — eine unbrauchbare 2xx-Antwort ist retry/unexpected und schreibt NICHTS", async () => {
    // GEAENDERT AM 2026-08-29 (ARCHITEKT, B-2): Der Ausgang war dead/bad_response und
    // ist retry/unexpected. Eine 2xx-Antwort ohne brauchbares access_token/expires_in
    // ist unerwartetes ANBIETER-Verhalten; eine Neu-Autorisierung heilt daran nichts.
    // DIE ABGRENZUNG, die T6b und T6d weiter oben bewachen: "unbrauchbare Nutzlast" im
    // Zuschnitt meint die ABGELEGTE Nutzlast (parse_*), nicht die Anbieter-Antwort.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    exchangeRefreshTokenMock.mockResolvedValue({
      kind: "ok",
      body: { expires_in: 3599 },
    });

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "retry", reason: "unexpected" });
    expect(upsertAufrufe).toHaveLength(0);

    // DER FELDNAME BLEIBT IM LOG — er ist der einzige Weg, einen solchen Fall zu
    // diagnostizieren, und der Ergebnistyp traegt ihn nicht mehr.
    expect(JSON.stringify(fehler.mock.calls)).toContain("access_token");
  });
});

// =========================================================================
// DER SCHREIBPFAD
// =========================================================================

describe("der Schreibpfad", () => {
  beforeEach(() => {
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
  });

  it("T8 — geschrieben wird ein CHIFFRAT, kein Klartext, und es rechnet sich zurueck", async () => {
    exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res.kind).toBe("ok");
    expect(upsertAufrufe).toHaveLength(1);

    const argument = upsertAufrufe[0][0] as Record<string, unknown>;
    const chiffrat = argument.secret_enc as string;
    // KEIN KLARTEXT IN DER SPALTE — der Gegenstand dieses Tests.
    expect(chiffrat).not.toContain(NEUES_ZUGANGSDATUM);
    expect(chiffrat).not.toContain(ALTES_ERNEUERUNGS_TOKEN);

    const zurueck = geschriebeneNutzlast();
    expect(zurueck.accessToken).toBe(NEUES_ZUGANGSDATUM);
    expect(zurueck.accessTokenExpiresAt).toBe(JETZT + 3599);
  });

  it("T9 — das Upsert-ARGUMENT traegt secret:null und den Konflikt-Schluessel", async () => {
    // secret: null STEHT AUSDRUECKLICH IM ARGUMENT. Der CHECK
    // project_secrets_secret_genau_eines verlangt, dass GENAU EINES der beiden Felder
    // einen Wert traegt; ein Upsert, der secret WEGLAESST, liesse bei Konflikt einen
    // bestehenden Klartext stehen und braeche mit 23514.
    // GEPRUEFT WIRD DAS ARGUMENT, NICHT DIE DATENBANK — die Grenze steht im Bericht.
    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    const [zeile, optionen] = upsertAufrufe[0] as [
      Record<string, unknown>,
      Record<string, unknown>,
    ];
    expect(zeile.project_id).toBe(PROJEKT_ID);
    expect(zeile.target).toBe("google");
    expect(Object.prototype.hasOwnProperty.call(zeile, "secret")).toBe(true);
    expect(zeile.secret).toBeNull();
    expect(optionen).toEqual({ onConflict: "project_id,target" });
    expect(tabellen).toContain("project_secrets");
    // KEIN updated_at im Patch: der Trigger fuehrt es nach.
    expect(Object.keys(zeile).sort()).toEqual([
      "project_id",
      "secret",
      "secret_enc",
      "target",
    ]);
  });

  it("T12 — nach der Erneuerung tragen BEIDE Uhren die neuen Werte, im Ergebnis UND in der Zeile", async () => {
    exchangeRefreshTokenMock.mockResolvedValue(
      anbieterOk({ refresh_token_expires_in: 581_408 }),
    );

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res).toEqual({
      kind: "ok",
      accessTokenExpiresAt: JETZT + 3599,
      refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 581_408 },
    });

    const zurueck = geschriebeneNutzlast();
    expect(zurueck.accessTokenExpiresAt).toBe(JETZT + 3599);
    expect(zurueck.refreshTokenExpiresAt).toEqual({
      kind: "at",
      epochSeconds: JETZT + 581_408,
    });
  });

  it("T20 — kommt KEIN refresh_token zurueck, steht das ABGELEGTE danach unveraendert in der Zeile", async () => {
    // GEMESSEN 2026-08-28 (OWNER, Teil (bv)): Google rotiert das Erneuerungs-Token
    // nicht. WAS DIE MESSUNG NICHT TRENNT, ist "Feld fehlt" von "Feld traegt denselben
    // Wert" — dieser Test haelt fest, dass der Bau unter der ERSTEN Auslegung nichts
    // verliert.
    exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());

    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    expect(geschriebeneNutzlast().refreshToken).toBe(ALTES_ERNEUERUNGS_TOKEN);
  });

  it("T20b — ein MITGESCHICKTES refresh_token wird uebernommen", async () => {
    exchangeRefreshTokenMock.mockResolvedValue(
      anbieterOk({ refresh_token: NEUES_ERNEUERUNGS_TOKEN }),
    );

    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    expect(geschriebeneNutzlast().refreshToken).toBe(NEUES_ERNEUERUNGS_TOKEN);
  });

  it("T22 — ein Schreibfehler ist misconfigured, nicht retry und nicht ok", async () => {
    // DIE UMKEHRUNG ZU T18, und sie ist der Gegenstand dieses Tests: Beim SCHREIBEN
    // ist die Erneuerung bereits VERBRAUCHT. Ein automatischer Wiederholer (Scheibe
    // 1b) liefe an einer CHECK-Verletzung ENDLOS — der Ausgang muss ihn ANHALTEN.
    upsertFehler = { message: ERFUNDENER_FREMDTEXT };

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "write_failed" });
  });

  it("T23 — fehlt eine Umgebungsvariable, ist es misconfigured und der Netzaufruf unterbleibt", async () => {
    setzeUmgebung({ GOOGLE_OAUTH_CLIENT_SECRET: undefined });

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "missing_env" });
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
  });

  it("T24 — fehlt der AKTIVE Chiffrier-Schluessel, ist es misconfigured und es wird NICHT geschrieben", async () => {
    // Lesen geht (die Kennung steht im Vorrat), Chiffrieren nicht — genau der Fall,
    // den Festlegung 4 beruehrt.
    exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());
    setzeUmgebung({ SECRET_ENC_ACTIVE_KEY_ID: undefined });

    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "encrypt_no_key" });
    expect(upsertAufrufe).toHaveLength(0);
  });
});

// =========================================================================
// LEAK, WAECHTER UND CHARAKTERISIERUNG
// =========================================================================

describe("kein Geheimnis verlaesst diesen Pfad", () => {
  it("T7 — weder Ergebnis noch Log tragen ein Token, ein Chiffrat oder Fremdtext", async () => {
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    const info = vi.spyOn(console, "info").mockImplementation(() => {});

    // ERFOLGSFALL.
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
    exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());
    const gut = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    // FEHLERFALL MIT FREMDTEXT IM SPIEL.
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
    upsertFehler = { message: ERFUNDENER_FREMDTEXT, details: ERFUNDENER_FREMDTEXT };
    const schlecht = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    const geschrieben = JSON.stringify([
      gut,
      schlecht,
      fehler.mock.calls,
      info.mock.calls,
    ]);

    for (const geheim of [
      ALTES_ZUGANGSDATUM,
      NEUES_ZUGANGSDATUM,
      ALTES_ERNEUERUNGS_TOKEN,
      ERFUNDENES_CLIENT_SECRET,
      TESTSCHLUESSEL,
      ERFUNDENER_FREMDTEXT,
    ]) {
      expect(geschrieben).not.toContain(geheim);
    }
    // Das Chiffrat selbst ebenso wenig — es steht in der Zeile, nicht im Log.
    const chiffrat = upsertAufrufe.at(-1)?.[0] as { secret_enc?: string };
    if (chiffrat?.secret_enc) {
      expect(geschrieben).not.toContain(chiffrat.secret_enc);
    }
  });

  it("T23b — bei fehlender Umgebungsvariable steht ihr NAME im Log, nie ihr WERT", async () => {
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
    setzeUmgebung({ GOOGLE_OAUTH_CLIENT_SECRET: undefined });

    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    const geschrieben = JSON.stringify(fehler.mock.calls);
    expect(geschrieben).toContain("GOOGLE_OAUTH_CLIENT_SECRET");
    expect(geschrieben).not.toContain(ERFUNDENES_CLIENT_SECRET);
  });
});

describe("der Waechter und die Charakterisierung", () => {
  it("T15 — KEIN AUFRUFER AUF DEM INGEST-PFAD (mit Positivkontrolle)", () => {
    // SEINE GRENZE TRAEGT ER AN SICH SELBST (docs/immer-beachten.md, "EIN WAECHTER
    // UEBER QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG"): Er sieht einen NAMEN, keinen
    // Import-Graphen. Eine blosse PROSA-Erwaehnung von "token-refresh" in einem
    // Kommentar von ingest.ts machte ihn ROT — DAS WAERE EIN FEHLALARM UND KEIN
    // BEFUND. Er irrt damit in die STRENGE Richtung, und das ist Absicht: lieber ein
    // Fehlalarm, den jemand prueft, als ein Durchlassen, das niemand sieht.
    // WER IHN AUFWEICHT, WEIL ER EINMAL FALSCH ANSCHLUG, nimmt dem Ingest-Pfad seinen
    // einzigen Waechter gegen einen Aufrufer dieser Scheibe.
    const ingest = readFileSync(
      join(process.cwd(), "src", "lib", "capi", "ingest.ts"),
      "utf8",
    );

    expect(ingest).not.toContain("token-refresh");
    expect(ingest).not.toContain("refreshAccessToken");

    // POSITIVKONTROLLE: derselbe Leser findet einen Import, der TATSAECHLICH dasteht.
    // Ohne sie waeren "es steht nicht drin" und "die Datei ist leer eingelesen worden"
    // am Ergebnis nicht zu unterscheiden.
    expect(ingest).toContain("@/lib/capi/meta-forward");
  });

  it("T15b — DIE ROUTE RUFT DIE KLAMMER, DIE KLAMMER RUFT DIE FUNKTION", () => {
    // WAS ER SCHLIESST — UND ER SCHLIESST EINE LUECKE, DIE T15 NIE HATTE: Bis
    // Schritt 1b-1 stand in docs/aktiver-stand.md (VERMERK 6), ein Waechter halte
    // fest, dass die Beweis-Route der EINZIGE Aufrufer von refreshAccessToken sei.
    // T15 hat das nie geprueft — er liest ausschliesslich ingest.ts. Mit der
    // Umverdrahtung waere jene Aussage falsch geworden, OHNE dass etwas rot wird;
    // genau dagegen steht dieser Lauf.
    //
    // SEINE GRENZE TRAEGT ER AN SICH SELBST (docs/immer-beachten.md, "EIN WAECHTER
    // UEBER QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG"): Er sieht IMPORT-ZEILEN, keinen
    // Import-Graphen. Ein dynamisches import() oder ein Re-Export ueber eine dritte
    // Datei entgeht ihm; umgekehrt machte ihn ein blosser Kommentar, der den
    // Import-String zitiert, ROT — das waere ein FEHLALARM und kein Befund. Er irrt
    // damit in die STRENGE Richtung, und das ist Absicht.
    const route = readFileSync(
      join(
        process.cwd(),
        "src",
        "app",
        "api",
        "oauth",
        "google",
        "refresh",
        "route.ts",
      ),
      "utf8",
    );
    const klammer = readFileSync(
      join(process.cwd(), "src", "lib", "oauth", "refresh-run.ts"),
      "utf8",
    );

    // DIE ROUTE GEHT UEBER DIE KLAMMER — und NICHT mehr direkt an die Funktion.
    expect(route).toContain('from "@/lib/oauth/refresh-run"');
    expect(route).not.toContain('from "@/lib/oauth/token-refresh"');

    // DIE KLAMMER IST DER EINZIGE, DER DIE FUNKTION HOLT. Dieselbe Zeile ist zugleich
    // die POSITIVKONTROLLE dieses Lesers: Ohne sie waeren "der Import steht nicht in
    // der Route" und "eine der Dateien ist leer eingelesen worden" am Ergebnis nicht
    // zu unterscheiden.
    expect(klammer).toContain('from "@/lib/oauth/token-refresh"');
  });

  it("T16 — refreshAccessToken WIRFT NIE, auch bei feindlichen Eingaben", async () => {
    // CHARAKTERISIERUNG. Heute eine Eigenschaft; sie wird eine AUFLAGE, sobald ein
    // Aufrufer auf dem Ingest-Pfad entsteht, wo das 204-CONTAINMENT gilt.
    const faelle: Array<() => void> = [
      () => {
        leseergebnis = { data: { secret_enc: 42 }, error: null };
      },
      () => {
        leseergebnis = { data: {}, error: null };
      },
      () => {
        leseergebnis = { data: { secret_enc: "" }, error: null };
      },
      () => {
        lege();
        exchangeRefreshTokenMock.mockResolvedValue({
          kind: "ok",
          body: null,
        });
      },
      () => {
        lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
        upsertFehler = new Error("ERFUNDEN-schreibfehler");
      },
    ];

    for (const aufbau of faelle) {
      aufbau();
      const res = await refreshAccessToken({
        projectId: PROJEKT_ID,
        target: "google",
      });
      expect(["ok", "retry", "dead", "misconfigured"]).toContain(res.kind);
    }
  });
});
