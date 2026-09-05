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

/** EIN Schreibvorgang, wie ihn der Riegel absetzt (Scheibe 1b-2b). */
type Schreibaufruf = {
  /** Das update-Argument: was GESETZT wird. */
  patch: Record<string, unknown>;
  /** Die Filter in ihrer Reihenfolge: worauf BEDINGT wird. */
  filter: Array<[string, unknown]>;
  /** Die Rueckgabe-Spaltenliste. Sie darf KEIN Chiffrat anfordern. */
  rueckgabeSpalten: unknown;
};

let leseergebnis: Leseergebnis;
/**
 * DIE SPALTENLISTEN DER LESUNG — der Waechter der VIERTEN Testachse.
 *
 * WARUM ES SIE GIBT, und der Satz gehoert an die Variable: Die Attrappe IGNORIERTE das
 * Argument von select() bis zur Scheibe 1b-2b vollstaendig, und KEIN Test im Repo pinnte
 * es. Eine vergessene Spalte in der Lesung ginge damit STILL durch — der Riegel
 * verglaeche danach auf einem undefinierten Wert und verloere garantiert jedes Rennen,
 * bei gruenem Lauf. GEMESSEN am Repo (CC, 2026-09-05).
 */
let leseSpalten: unknown[];
let schreibAufrufe: Schreibaufruf[];
/** Was die bedingte Schreibung zurueckgibt. Leere Menge = das Rennen ist verloren. */
let schreibErgebnis: { data: unknown[] | null; error: unknown };
/**
 * Laesst den Client beim Schreiben WERFEN — fuer Invariante (I-1).
 *
 * EIN EIGENER SCHALTER UND KEIN Fehler-Rueckgabewert, weil die zwei verschiedene Dinge
 * sind: { error } ist ein ERGEBNIS, ein Wurf verlaesst die Funktion. Nur der zweite
 * kann das 204-Containment brechen.
 */
let schreibWirft: unknown;
let tabellen: string[];

function baueAdminAttrappe(): unknown {
  return {
    from: (tabelle: string) => {
      tabellen.push(tabelle);
      return {
        select: (spalten?: unknown) => {
          leseSpalten.push(spalten);
          return {
            eq: () => ({
              eq: () => ({
                maybeSingle: async () => leseergebnis,
              }),
            }),
          };
        },
        // DIE KETTE BILDET DEN ECHTEN AUFRUF NACH: update(...).eq()...eq().select().
        // Sie protokolliert BEIDE Seiten — das Gesetzte und das Bedingte —, weil der
        // Riegel genau in ihrem Verhaeltnis liegt.
        update: (patch: Record<string, unknown>) => {
          const filter: Array<[string, unknown]> = [];
          const kette = {
            eq: (spalte: string, wert: unknown) => {
              filter.push([spalte, wert]);
              return kette;
            },
            select: async (rueckgabeSpalten?: unknown) => {
              schreibAufrufe.push({ patch, filter, rueckgabeSpalten });
              if (schreibWirft) throw schreibWirft;
              return schreibErgebnis;
            },
          };
          return kette;
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

/** Die Zeilen-Kennung der Testzeile. ERFUNDEN und am Namen erkennbar. */
const ZEILEN_ID = "ERFUNDEN-zeile-3f2a1c0d";
/** Der Versions-Stand, den die Testzeile beim Lesen traegt. */
const GELESENE_VERSION = 7;

/**
 * EINE GELESENE ZEILE, WIE DIE DATENBANK SIE NACH 0027 LIEFERN KANN.
 *
 * WARUM ES DIESEN BAUER GIBT UND NICHT SIEBENMAL EIN OBJEKTLITERAL, und der Grund ist
 * ein gemessener Fehlschlag dieser Runde: Sieben Laeufe bauten ihre Zeile von Hand und
 * setzten dabei NUR secret_enc. Nach 0027 ist secret_version integer NOT NULL und id
 * uuid NOT NULL — EINE ZEILE OHNE DIESE FELDER KANN DIE DATENBANK NICHT LIEFERN. Die
 * Fixtures stellten damit einen Zustand her, den der produktive Pfad nicht erzeugt
 * (docs/immer-beachten.md, "TESTDATEN UND TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD
 * TREFFEN"), und fielen ab der Scheibe 1b-2b am defensiven Riegel aus.
 *
 * FUENF DAVON SIND DABEI ROT GEWORDEN, ZWEI NICHT — und genau deshalb steht der Bauer
 * hier statt sieben nachgezogener Literale: Die zwei stillen waeren ab jetzt die Falle
 * fuer den naechsten, der eine Fixture kopiert. Wer diesen Bauer benutzt, kann den
 * unmoeglichen Zustand gar nicht erst herstellen.
 *
 * ER SETZT KEINE ASSERTION UND VERAENDERT KEINEN AUSGANG: Die sieben Laeufe pruefen
 * weiterhin genau das, was sie vorher geprueft haben — die Abbildung der
 * Dechiffrier- und Lese-Zustaende.
 */
function leseZeile(chiffrat: unknown): Leseergebnis {
  return {
    data: {
      secret_enc: chiffrat,
      secret_version: GELESENE_VERSION,
      id: ZEILEN_ID,
    },
    error: null,
  };
}

/**
 * Legt eine Nutzlast als ECHTES Chiffrat in die Lese-Attrappe.
 *
 * SIE LEGT SEIT DER SCHEIBE 1b-2b DREI SPALTEN UND NICHT EINE: secret_enc, dazu
 * secret_version und id. Ohne die beiden neuen faellt JEDER Lauf am defensiven Riegel
 * aus — das ist gewollt und der Grund, warum sie hier und nicht je Test gesetzt werden.
 */
function lege(payload: OAuthPayload = nutzlast()): string {
  const formatiert = formatOAuthPayload(payload);
  if (formatiert.kind !== "ok") throw new Error("Testaufbau kaputt: format");
  const chiffrat = encryptSecret(formatiert.value);
  if (chiffrat.kind !== "ok") throw new Error("Testaufbau kaputt: encrypt");
  leseergebnis = {
    data: {
      secret_enc: chiffrat.value,
      secret_version: GELESENE_VERSION,
      id: ZEILEN_ID,
    },
    error: null,
  };
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
  const argument = schreibAufrufe.at(-1)?.patch as { secret_enc?: unknown };
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
  leseSpalten = [];
  schreibAufrufe = [];
  // DER VORGABEFALL IST DER GEWINNER: EINE Zeile getroffen. Ein leeres Array waere der
  // Verlierer, und der ist ein eigener, benannter Zustand — kein Vorgabewert.
  schreibErgebnis = { data: [{ secret_version: GELESENE_VERSION + 1 }], error: null };
  schreibWirft = null;
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
    expect(schreibAufrufe).toHaveLength(0);
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
    expect(schreibAufrufe).toHaveLength(0);
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
    // FIXTURE 1 von 7. Der Gegenstand dieses Laufs ist der SCHLUESSEL, nicht die Zeile
    // — sie muss deshalb vollstaendig sein, sonst faengt der defensive Riegel den Lauf
    // ab, bevor ueberhaupt dechiffriert wird.
    leseergebnis = leseZeile(chiffrat);

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
    // FIXTURE 2 von 7. Geprueft wird die Abbildung von auth_failed — eine unvollstaendige
    // Zeile kaeme dort nie an.
    leseergebnis = leseZeile(chiffrat);

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
    // FIXTURE 3 von 7. KAPUTT SEIN SOLL HIER ALLEIN DAS CHIFFRAT — die uebrigen Felder
    // der Zeile sind einwandfrei, sonst prueft der Lauf einen anderen Ausgang als den,
    // den sein Name nennt.
    leseergebnis = leseZeile("kein.chiffrat.dieser.form");
    const chiffratFehler = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    // (b) Das Chiffrat ist einwandfrei, der KLARTEXT darin ist keine Nutzlast.
    const kaputt = encryptSecret("p1.nur.drei.teile");
    if (kaputt.kind !== "ok") throw new Error("Testaufbau kaputt");
    // FIXTURE 4 von 7. Kaputt sein soll hier allein die NUTZLAST im Chiffrat; die Zeile
    // selbst ist die, die die Datenbank liefern wuerde.
    leseergebnis = leseZeile(kaputt.value);
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
    // FIXTURE 5 von 7. Fehlen soll das SCHLUESSELMATERIAL der Umgebung, nicht ein Feld
    // der Zeile — zwei verschiedene misconfigured-Gruende, und der Lauf meint den einen.
    leseergebnis = leseZeile(chiffrat);
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "decrypt_no_key" });

    setzeUmgebung({ SECRET_ENC_KEYS: `${KENNUNG}:zu-kurz` });
    // FIXTURE 6 von 7. Unbrauchbar sein soll der SCHLUESSEL, aus demselben Grund wie
    // eine Zeile darueber.
    leseergebnis = leseZeile(chiffrat);
    await expect(
      refreshAccessToken({ projectId: PROJEKT_ID, target: "google" }),
    ).resolves.toEqual({ kind: "misconfigured", reason: "decrypt_bad_key" });
  });

  it("T6d — eine unbekannte Fassung der Nutzlast ist dead, aber NICHT parse_bad_format", async () => {
    const fremdeFassung = encryptSecret("p9.aa.bb.cc.dd");
    if (fremdeFassung.kind !== "ok") throw new Error("Testaufbau kaputt");
    // FIXTURE 7 von 7. Fremd sein soll die FASSUNG der Nutzlast; die Zeile ist die
    // heutige und traegt deshalb beide Felder.
    leseergebnis = leseZeile(fremdeFassung.value);

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
    expect(schreibAufrufe).toHaveLength(0);

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
    expect(schreibAufrufe).toHaveLength(1);

    const argument = schreibAufrufe[0].patch;
    const chiffrat = argument.secret_enc as string;
    // KEIN KLARTEXT IN DER SPALTE — der Gegenstand dieses Tests.
    expect(chiffrat).not.toContain(NEUES_ZUGANGSDATUM);
    expect(chiffrat).not.toContain(ALTES_ERNEUERUNGS_TOKEN);

    const zurueck = geschriebeneNutzlast();
    expect(zurueck.accessToken).toBe(NEUES_ZUGANGSDATUM);
    expect(zurueck.accessTokenExpiresAt).toBe(JETZT + 3599);
  });

  it("T9 — das SCHREIB-ARGUMENT traegt secret:null, das Chiffrat und die neue Version", async () => {
    // secret: null STEHT AUSDRUECKLICH IM ARGUMENT. Der CHECK
    // project_secrets_secret_genau_eines verlangt, dass GENAU EINES der beiden Felder
    // einen Wert traegt.
    // GEPRUEFT WIRD DAS ARGUMENT, NICHT DIE DATENBANK — die Grenze steht im Bericht.
    //
    // UMGESCHRIEBEN MIT SCHEIBE 1b-2b, UND DIE AUFGEHOBENE ZUSICHERUNG GEHOERT BENANNT:
    // Dieser Lauf hiess "das Upsert-ARGUMENT traegt secret:null und den
    // Konflikt-Schluessel" und pinnte zwei Dinge, die es nicht mehr gibt — die
    // Option { onConflict: "project_id,target" } und die Schluesselmenge
    // { project_id, secret, secret_enc, target }. Aus dem unbedingten Upsert ist ein
    // bedingtes update geworden: project_id und target sind vom ARGUMENT zum FILTER
    // gewandert, und secret_version ist hinzugekommen.
    // DIE FILTER SELBST PRUEFT T25, NICHT DIESER LAUF — hier steht, was GESETZT wird.
    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    const zeile = schreibAufrufe[0].patch;
    expect(Object.prototype.hasOwnProperty.call(zeile, "secret")).toBe(true);
    expect(zeile.secret).toBeNull();
    expect(typeof zeile.secret_enc).toBe("string");
    expect(tabellen).toContain("project_secrets");
    // KEIN updated_at im Patch: der Trigger project_secrets_set_updated_at fuehrt es
    // nach (GEMESSEN 2026-08-26, docs/db-stand.md — er traegt tgenabled 'O').
    // KEIN project_id und KEIN target im Patch: sie sind Bedingung, nicht Wert. Ein
    // update, das sie mitschriebe, setzte die Zeile auf Werte, auf die es gerade
    // gefiltert hat — harmlos, aber es verwischte die Trennung, an der der Riegel
    // haengt.
    expect(Object.keys(zeile).sort()).toEqual([
      "secret",
      "secret_enc",
      "secret_version",
    ]);
  });

  it("T25 — DER VERGLEICH GEWINNT: vier Filter, Versions-Sprung um genau EINS, keine Chiffrat-Rueckgabe", async () => {
    // ACHSE 1 DES TESTPLANS. Er behauptet die BEDINGUNG des Schreibvorgangs — T9
    // behauptet seinen INHALT.
    //
    // WIRD ROT, WENN: der Versions-Term aus dem Filter faellt · die id aus dem Filter
    // faellt · der Sprung nicht genau eins ist · die Rueckgabe-Spaltenliste das
    // Chiffrat anfordert.
    //
    // EINZELSTUECK FUER VIER FEHLERKLASSEN (docs/immer-beachten.md, Lektion (f) an
    // "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"). GEMESSEN, NICHT VERMUTET — vier
    // Mutationsproben, jede hat im Bestand (35 Laeufe hier, 12 in
    // ingest.refresh.test.ts) GENAU DIESEN EINEN Lauf rot gemacht:
    //   · "der Versions-Term faellt aus dem Filter"      (Korrektur-Runde, K-1)
    //   · "der Sprung ist +0 statt +1"                   (Korrektur-Runde, K-3)
    //   · "die id faellt aus dem Filter"                 (Korrektur-Runde, K-6)
    //   · "die Rueckgabe-Spaltenliste faellt weg"        (Bau-Runde)
    // WER DIESEN LAUF ALS REDUNDANT NEBEN T9 ENTFERNT, NIMMT VIER ABDECKUNGEN AUF
    // EINMAL MIT, und keine davon hat einen zweiten Traeger: T9 liest den PATCH und
    // sieht weder Filter noch Rueckgabe; T26 stellt den Verlierer ueber
    // schreibErgebnis her und ist von Filter und Spaltenliste unabhaengig; T27 liest
    // die LESUNG und nicht die Schreibung.
    // DIE ZWEI FILTER-KLASSEN SIND AM UNIT-TEST UEBERHAUPT NUR HIER ERREICHBAR: Die
    // Attrappe fuehrt genau EINE Zeile, ein fehlender Filter aendert an ihrem Ergebnis
    // also nichts. Kein Verhaltenslauf kann sie fangen — nur die Filterliste selbst.
    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    expect(schreibAufrufe).toHaveLength(1);
    const { patch, filter, rueckgabeSpalten } = schreibAufrufe[0];

    // VIER FILTER, VOLLSTAENDIG UND MIT IHREN WERTEN. Als MENGE geprueft und nicht als
    // Reihenfolge: die Reihenfolge der eq-Aufrufe ist fuer die Bedingung gleichgueltig,
    // und ein Test darauf braeche bei einer folgenlosen Umsortierung.
    expect(
      [...filter].sort((a, b) => a[0].localeCompare(b[0])),
    ).toEqual([
      ["id", ZEILEN_ID],
      ["project_id", PROJEKT_ID],
      ["secret_version", GELESENE_VERSION],
      ["target", "google"],
    ]);

    // DER SPRUNG IST EINS. Nicht die Uhrzeit: Google liefert expires_in als ganze
    // Sekunden, zwei Laeufe in derselben Sekunde erzeugten denselben Ablaufzeitpunkt.
    expect(patch.secret_version).toBe(GELESENE_VERSION + 1);

    // ES REIST KEIN CHIFFRAT ZURUECK. Geprueft wird der WORTLAUT und nicht bloss die
    // Abwesenheit von "secret_enc": eine Rueckgabe OHNE Spaltenliste (undefined) holte
    // die ganze Zeile und enthielte das Wort ebenfalls nicht.
    expect(rueckgabeSpalten).toBe("secret_version");
  });

  it("T26 — DER VERGLEICH VERLIERT: nichts zweites geschrieben, ok zurueckgegeben, kein Wurf, eigene Logzeile", async () => {
    // ACHSE 2 DES TESTPLANS, und der Lauf, an dem die Pflicht-Mutation haengt.
    //
    // WIRD ROT, WENN: der Verlierer-Zweig trotzdem schreibt · er wirft · er einen
    // anderen Ausgang als ok liefert · seine Logzeile den Wortlaut des Resolvers erbt.
    //
    // WARUM ok UND NICHT EIN EIGENER ZUSTAND — die Begruendung steht am Ergebnistyp und
    // wird hier nicht verdoppelt: Der Aufrufer auf dem Ingest-Pfad ueberspringt jeden
    // Ausgang ausser ok, und eine Conversion, die heute durchgeht, ginge still
    // verloren.
    // NACHGEZOGEN IN DER KORREKTUR-RUNDE ZUM BAU, UND DIE AUFGEHOBENE ZUSICHERUNG
    // GEHOERT BENANNT: Dieser Lauf hat bis dahin AUSSCHLIESSLICH console.error
    // belauscht und behauptet, die Zeile write_zero_rows stehe DORT. Die Zeile ist auf
    // console.info gewandert, weil ein verlorenes Rennen nach unserer eigenen
    // Entscheidung kein Fehler ist (der Zweig liefert ok) und weil sie ungedrosselt je
    // Beacon feuert; die Begruendung steht an der Fundstelle und wird hier nicht
    // verdoppelt.
    // DIE ZUSICHERUNG IST DABEI STAERKER GEWORDEN UND NICHT NUR VERSCHOBEN: Geprueft
    // wird jetzt BEIDES — die Zeile steht auf info UND sie steht NICHT auf error. Ohne
    // die zweite Haelfte waere ein Rueckfall auf console.error unsichtbar, denn eine
    // Zeile auf BEIDEN Kanaelen erfuellte die erste Haelfte weiterhin.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    const hinweis = vi.spyOn(console, "info").mockImplementation(() => {});
    // DIE LEERE MENGE IST DER VERLIERER. error bleibt null — das ist der Unterschied
    // zum Datenbank-Fehler, den T22 fuehrt.
    schreibErgebnis = { data: [], error: null };

    const res = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(res).toEqual({
      kind: "ok",
      accessTokenExpiresAt: JETZT + 3599,
      refreshTokenExpiresAt: { kind: "at", epochSeconds: JETZT + 500_000 },
    });
    // GENAU EIN Schreibversuch. Ein zweiter waere eine Wiederholung ohne Abbruch-
    // bedingung auf dem meistgetroffenen Pfad der Plattform.
    expect(schreibAufrufe).toHaveLength(1);

    const aufFehler = JSON.stringify(fehler.mock.calls);
    const aufHinweis = JSON.stringify(hinweis.mock.calls);
    const geloggt = aufFehler + aufHinweis;
    // DIE ZEILE TRAEGT DAS PRAEFIX DES ERNEUERUNGSPFADES ...
    expect(aufHinweis).toContain("[oauth/token-refresh] write_zero_rows");
    // ... UND SIE STEHT NICHT AUF DEM FEHLERKANAL. Das ist die zweite Haelfte der
    // Zusicherung und nicht ihre Wiederholung: der Fehlerkanal bleibt den zwei Faellen
    // vorbehalten, die einen Betreiber brauchen (write_threw, write_returned_error).
    expect(aufFehler).not.toContain("write_zero_rows");
    // ... UND IST VOM WORTLAUT DES RESOLVERS UNTERSCHEIDBAR. Jener traegt nach
    // Vorrats-Eintrag 48 schon drei Bedeutungen; eine vierte machte ihn unbrauchbar.
    // GEPRUEFT UEBER BEIDE KANAELE — ein Wortlaut, der auf den falschen Kanal
    // ausweicht, waere nicht besser, nur schwerer zu finden.
    expect(geloggt).not.toContain("[capi/resolve] secret unusable");
    // KEINE URSACHE (Invariante (I-6)): null Treffer heisst "meine Schreibung ist
    // ueberholt ODER die Zeile ist weg", und die Zeile behauptet keines von beidem.
    expect(geloggt).not.toContain("mismatch");
    expect(geloggt).not.toContain("stale");
  });

  it("T27 — DIE SPALTENLISTE DER LESUNG traegt secret_enc, secret_version UND id", async () => {
    // ACHSE 4 DES TESTPLANS, und sie ist eine AUFLAGE und kein Zusatz.
    //
    // WARUM ES DIESEN LAUF BRAUCHT: Die Attrappe hat das Argument von select() bis zur
    // Scheibe 1b-2b IGNORIERT, und kein Test im Repo pinnte es. Wer die neue Spalte in
    // der Lesung vergisst, bekommt einen GRUENEN Lauf und einen Riegel, der auf einem
    // undefinierten Wert vergleicht — er verloere dann JEDES Rennen, still.
    //
    // WIRD ROT, WENN: eine der drei Spalten aus der Liste faellt.
    //
    // ER IST EIN EINZELSTUECK, UND DAS IST GEMESSEN UND NICHT VERMUTET (CC, 2026-09-05,
    // Mutationsprobe "secret_version aus der Lesung entfernt"): Von 35 Laeufen faellt
    // GENAU DIESER. Der Grund ist die Attrappe selbst — sie liefert ihre Zeile
    // unabhaengig davon, was selektiert wurde, und deshalb kann KEIN anderer Lauf die
    // Mutation sehen. Ohne ihn waere sie vollstaendig unsichtbar: 35 von 35 gruen.
    // WER IHN ALS REDUNDANT ENTFERNT, NIMMT DIE EINZIGE ABDECKUNG DIESER ACHSE MIT
    // (docs/immer-beachten.md, Lektion (f) an "MUTATIONSPROBEN UND
    // LIVE-TEST-INSTRUMENTE").
    //
    // SEINE GRENZE TRAEGT ER AN SICH SELBST: Er sieht den AUFRUF, nicht die Datenbank.
    // Dass eine so gelesene Zeile die Spalten auch traegt, sagt allein die Migration
    // und der Live-Test.
    await refreshAccessToken({ projectId: PROJEKT_ID, target: "google" });

    expect(leseSpalten).toHaveLength(1);
    const spalten = String(leseSpalten[0])
      .split(",")
      .map((s) => s.trim())
      .sort();
    expect(spalten).toEqual(["id", "secret_enc", "secret_version"]);
  });

  it("T28 — EINE ZEILE OHNE secret_version ODER OHNE id KOMMT NICHT DURCH", async () => {
    // DIE ZWEITE BRUCH-ACHSE DIESES BAUS, ALS EIGENER WAECHTER.
    //
    // WARUM ES IHN GIBT — ER IST AUS EINEM GEMESSENEN FEHLSCHLAG ENTSTANDEN und nicht
    // aus Vorsicht: Der Bau der Scheibe 1b-2b hat auf ZWEI Achsen gebrochen, nicht auf
    // einer. Die erste war die Attrappe ohne update (elf Laeufe, vorhergesagt). Die
    // zweite war DIESE — das defensive Gate veraendert, was eine HANDGEBAUTE Zeile
    // durchlaeuft, und sie war NICHT vorhergesagt (fuenf Laeufe fielen, zwei weitere
    // waeren still durchgegangen).
    // OHNE DIESEN LAUF FAELLT DIESELBE ACHSE BEIM NAECHSTEN UMBAU ERNEUT AUF, und zwar
    // wieder als Ueberraschung.
    //
    // WIRD ROT DURCH: das defensive Gate entfernt.
    //
    // ER PRUEFT BEIDE FELDER, weil der Zweig beide prueft — ein Lauf ueber nur eines
    // liesse das andere ungedeckt und saehe trotzdem gruen aus.
    const fehler = vi.spyOn(console, "error").mockImplementation(() => {});
    lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
    const vollstaendig = leseergebnis.data as Record<string, unknown>;

    // (a) OHNE secret_version — genau der Zustand, den die sieben Handfixtures dieser
    //     Datei bis zur Scheibe 1b-2b hergestellt haben.
    leseergebnis = {
      data: { secret_enc: vollstaendig.secret_enc, id: ZEILEN_ID },
      error: null,
    };
    const ohneVersion = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    // (b) OHNE id — dieselbe Klasse, das andere Feld.
    leseergebnis = {
      data: {
        secret_enc: vollstaendig.secret_enc,
        secret_version: GELESENE_VERSION,
      },
      error: null,
    };
    const ohneId = await refreshAccessToken({
      projectId: PROJEKT_ID,
      target: "google",
    });

    expect(ohneVersion).toEqual({
      kind: "misconfigured",
      reason: "bad_row",
    });
    expect(ohneId).toEqual({ kind: "misconfigured", reason: "bad_row" });

    // FAIL-CLOSED HEISST: KEIN NETZAUFRUF UND KEIN SCHREIBVORGANG. Ohne diese zwei
    // Zusicherungen bliebe der Lauf gruen, wenn das Gate erst NACH dem Netzruf griffe —
    // dann waere die Erneuerung verbraucht und der Riegel triebe Kosten, die er
    // vermeiden soll.
    expect(exchangeRefreshTokenMock).not.toHaveBeenCalled();
    expect(schreibAufrufe).toHaveLength(0);
    expect(JSON.stringify(fehler.mock.calls)).toContain(
      "[oauth/token-refresh] bad_row",
    );
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
    //
    // ER TRAEGT SEIT DER SCHEIBE 1b-2b EINE ZWEITE FEHLERKLASSE, UND SIE IST DER
    // EIGENTLICHE GRUND FUER DIE GESTALT DIESES AUFBAUS: DER FEHLER WIRD VOR DER MENGE
    // GEPRUEFT. Bei einem Fehler ist die Menge EBENFALLS leer — data ist hier deshalb
    // ausdruecklich [] und nicht null. Wer zuerst die Laenge liest, deutet "Datenbank
    // kaputt" als "Rennen verloren" und antwortet mit ok statt mit misconfigured: der
    // eine Ausgang holt einen Betreiber an die Zeile, der andere verwirft schweigend.
    // WIRD ROT, WENN die zwei Pruefungen ihre Reihenfolge tauschen.
    //
    // EINZELSTUECK FUER DIESE ZWEITE KLASSE (docs/immer-beachten.md, Lektion (f) an
    // "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE"): Die Mutation "die Laenge wird vor
    // dem Fehler geprueft" hat im GESAMTEN Bestand GENAU DIESEN Lauf rot gemacht
    // (GEMESSEN, Bau der Scheibe 1b-2b: 1 von 35 in dieser Datei, kein Lauf
    // ausserhalb). DER GRUND IST DIE FIXTURE UND NICHT DIE ASSERTION: Kein anderer
    // Lauf stellt BEIDE Bedingungen zugleich her — jeder setzt entweder einen Fehler
    // ODER eine leere Menge, und an einer von beiden ist die Reihenfolge folgenlos.
    // WER data HIER AUF null ODER AUF EINE GEFUELLTE LISTE AENDERT, NIMMT DIE EINZIGE
    // ABDECKUNG DIESER ACHSE MIT, ohne dass etwas rot wird.
    schreibErgebnis = { data: [], error: { message: ERFUNDENER_FREMDTEXT } };

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
    expect(schreibAufrufe).toHaveLength(0);
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
    schreibErgebnis = {
      data: [],
      error: { message: ERFUNDENER_FREMDTEXT, details: ERFUNDENER_FREMDTEXT },
    };
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
    const chiffrat = schreibAufrufe.at(-1)?.patch as { secret_enc?: string };
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
  it("T15 — DER INGEST GEHT UEBER DIE KLAMMER UND NICHT AN IHR VORBEI (mit Positivkontrolle)", () => {
    // DER TITEL IST MIT SCHEIBE 1b-2a KORRIGIERT, DIE ZUSICHERUNGEN SIND ES NICHT —
    // KEINE EINZIGE IST ENTFERNT ODER AUFGEWEICHT WORDEN.
    //
    // WAS ER VORHER ZUGESICHERT HAT: Er hiess "KEIN AUFRUFER AUF DEM INGEST-PFAD" und
    // meinte genau das — bis Scheibe 1b-2a rief der Ingest die Erneuerung ueberhaupt
    // nicht. SEIT 1b-2a IST DER TITEL FALSCH: capi/ingest.ts ruft runRefresh, also
    // erneuert der Ingest-Pfad sehr wohl.
    //
    // WARUM DIESELBEN ZWEI BEHAUPTUNGEN TROTZDEM WERTVOLL BLEIBEN — und das ist der
    // Grund, warum hier NICHTS gestrichen wird: Dass ingest.ts weder "token-refresh"
    // noch "refreshAccessToken" enthaelt, heisst ab jetzt "der Ingest geht ueber die
    // KLAMMER und nicht an ihr vorbei". Die Klammer traegt die Obergrenze aus
    // Schritt 1b-1; ein Handler, der die Funktion direkt riefe, umginge sie — still,
    // und mit einer Wiederholungs-Schleife ohne Deckel auf dem meistgetroffenen Pfad
    // der Plattform. DIE ZUSICHERUNG IST DIESELBE GEBLIEBEN, IHR TITEL WAR ES NICHT.
    // WER NUR DEN TITEL AENDERT UND DIESEN ABSATZ WEGLAESST, LOESCHT DIE SPUR.
    //
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
    //
    // NACHGEZOGEN MIT SCHEIBE 1b-2b — DIE AUFLAGE IST EINGETRETEN: Seit Scheibe 1b-2a
    // ruft der Ingest-Pfad diese Funktion ueber die Klammer. Die zwei letzten Faelle
    // sind deshalb NEU und decken Invariante (I-1): ein WERFENDER Client und eine
    // unbrauchbare Zeilen-Kennung.
    // DER SCHREIBFEHLER ALS RUECKGABE UND DER SCHREIBFEHLER ALS WURF SIND ZWEI
    // VERSCHIEDENE FAELLE, und nur der zweite kann das Containment brechen — { error }
    // ist ein Ergebnis, ein Wurf verlaesst die Funktion.
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
        schreibErgebnis = {
          data: [],
          error: new Error("ERFUNDEN-schreibfehler"),
        };
      },
      // (I-1) DER CLIENT WIRFT BEIM SCHREIBEN. Mit .select() ist die Zahl der Stellen
      // gewachsen, an denen das geschehen kann; das try/catch im Schreibvorgang ist
      // genau dafuer da.
      () => {
        lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
        schreibWirft = new Error("ERFUNDEN-client-wurf");
      },
      // (3b) DIE GELESENE ZEILE HAT NICHT DIE FORM, DIE DAS SCHEMA ZUSAGT. Sollte nie
      // eintreten — secret_version ist integer not null, id ist uuid not null.
      () => {
        schreibWirft = null;
        leseergebnis = {
          data: {
            secret_enc: "ERFUNDEN-chiffrat-egal",
            secret_version: "7",
            id: ZEILEN_ID,
          },
          error: null,
        };
      },
      // DAS VERLORENE RENNEN. NACHGETRAGEN AUS EINER MUTATIONSPROBE DIESER RUNDE, und
      // der Grund gehoert hierher, weil er sonst beim naechsten Umbau erneut auftritt:
      // Die Probe "der Verlierer-Zweig wirft" hatte T26 UND diesen Lauf als rot
      // vorhergesagt. Gefallen ist NUR T26. Die Ursache ist gemessen und nicht
      // vermutet — KEIN FALL DIESER LISTE ERREICHTE DEN VERLIERER-ZWEIG: die leere
      // Menge kam hier bis dahin ausschliesslich ZUSAMMEN mit einem Fehler vor, und
      // der kehrt eine Zeile vorher zurueck.
      // DER LAUF HIESS DAMIT MEHR, ALS ER DECKTE ("auch bei feindlichen Eingaben") —
      // die vierte Weise aus docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG
      // WIRD AUF DREI WEISEN HOHL". Der fehlende Fall wird ERGAENZT, statt die
      // Selbstbeschreibung zu verengen: der Verlierer-Zweig liegt auf einem ueber den
      // Ingest erreichbaren Pfad, und dort gilt das 204-Containment.
      () => {
        schreibWirft = null;
        lege(nutzlast({ accessTokenExpiresAt: JETZT - 10 }));
        // DIE ANBIETER-ATTRAPPE WIRD HIER EIGENS ZURUECKGESETZT, UND DAS IST KEINE
        // Umstaendlichkeit: Ein frueherer Fall dieser Liste laesst sie auf einer
        // unbrauchbaren 2xx-Antwort stehen (body: null), und die kehrt mit retry
        // zurueck, BEVOR ueberhaupt geschrieben wird.
        // GEMESSEN IN DIESER RUNDE (CC, 2026-09-05): Ohne diese Zeile erreicht der Fall
        // den Verlierer-Zweig NICHT — die Mutation "der Verlierer wirft" blieb an
        // diesem Lauf gruen, obwohl der Fall dastand. DIE FAELLE DIESER LISTE ERBEN
        // DEN ZUSTAND IHRER VORGAENGER; wer einen anfuegt, prueft, was vor ihm steht.
        exchangeRefreshTokenMock.mockResolvedValue(anbieterOk());
        // LEERE MENGE OHNE FEHLER — das ist das verlorene Rennen und nichts sonst.
        schreibErgebnis = { data: [], error: null };
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
