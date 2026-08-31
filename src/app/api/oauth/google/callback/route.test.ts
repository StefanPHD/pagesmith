import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// server-only wirft ausserhalb einer Server-Umgebung. Die Pruefkette zieht cipher.ts
// und oauth-payload.ts ECHT herein — beide tragen die Marke.
vi.mock("server-only", () => ({}));

// ===========================================================================
// WAS HIER GEMOCKT WIRD UND WAS AUSDRUECKLICH NICHT — das ist die Testentscheidung
// dieser Datei und keine Bequemlichkeit (docs/immer-beachten.md, "TEST-DISZIPLIN:
// DISKRIMINIEREND STATT BREIT GEMOCKT"):
//
//   GEMOCKT: next/headers (Cookie-Zugriff) · die zwei Supabase-Clients ·
//            exchangeAuthorizationCode (das NETZ, und nur das).
//
//   ECHT:    parseStateCookie, statesMatch, serializeClearedStateCookie
//            (google-authorize) · readTokenExchangeConfig und toOAuthPayload
//            (google-token) · formatOAuthPayload (oauth-payload) · encryptSecret
//            (cipher), mit einem erfundenen, aber ECHTEN Schluessel.
//
// WARUM DIE CHIFFRIERUNG ECHT LAEUFT: Nur so kann R11 beweisen, dass das GESCHRIEBENE
// nicht der Klartext ist UND sich zurueckrechnen laesst. Mit einer Attrappe waere R14
// ("kein Geheimnis im Log") die T4-FALLE — eine Abwesenheits-Behauptung ueber etwas,
// das nie in den Scope kam.
// ===========================================================================

const ORIGINAL_ENV = { ...process.env };

// ERFUNDEN, ABER FORMGUELTIG: 32 Bytes, base64. Kein echter Schluessel.
const TESTSCHLUESSEL = Buffer.from(
  "ERFUNDEN-testschluessel-CB-00000",
  "utf8",
).toString("base64");

const ERFUNDENE_CLIENT_ID = "erfundene-client-id-nicht-echt.apps.example";
const ERFUNDENES_CLIENT_SECRET = "ERFUNDEN-client-secret-nicht-echt-0002";
const ERFUNDENE_REDIRECT_URI = "http://localhost:3000/api/oauth/google/callback";

const PROJEKT_ID = "0a1b2c3d-4e5f-4a6b-8c7d-9e0f1a2b3c4d";
const FREMDE_PROJEKT_ID = "1b2c3d4e-5f6a-4b7c-8d9e-0f1a2b3c4d5e";
const NUTZER_ID = "9f8e7d6c-5b4a-4392-8172-635241302918";

const STATE = "erfundener-state-wert-ohne-punkt-0001";
const CODE = "ERFUNDEN-autorisierungs-code-nicht-echt-0002";
const ZUGANGSDATUM = "ERFUNDEN-access-token-nicht-echt-0002";
const ERNEUERUNGS_TOKEN = "ERFUNDEN-refresh-token-nicht-echt-0002";

const COOKIE_NAME = "__Host-ps_oauth";

// --- Die Attrappen -------------------------------------------------------

let cookieWert: string | undefined;
const cookiesMock = vi.fn(async () => ({
  get: (name: string) =>
    name === COOKIE_NAME && cookieWert !== undefined
      ? { name, value: cookieWert }
      : undefined,
}));
vi.mock("next/headers", () => ({ cookies: () => cookiesMock() }));

let angemeldeterNutzer: { id: string } | null = { id: NUTZER_ID };
let eigenesProjekt: { id: string } | null = { id: PROJEKT_ID };
let projektFehler: { message: string } | null = null;

const maybeSingle = vi.fn(async () => ({
  data: eigenesProjekt,
  error: projektFehler,
}));
const createClientMock = vi.fn(async () => ({
  auth: { getUser: async () => ({ data: { user: angemeldeterNutzer } }) },
  from: () => ({
    select: () => ({
      eq: () => ({ eq: () => ({ maybeSingle }) }),
    }),
  }),
}));
vi.mock("@/lib/supabase/server", () => ({
  createClient: () => createClientMock(),
}));

let schreibFehler: { message: string } | null = null;
const upsert = vi.fn(async () => ({ error: schreibFehler }));
const createAdminClientMock = vi.fn(() => ({ from: () => ({ upsert }) }));
vi.mock("@/lib/supabase/admin", () => ({
  createAdminClient: () => createAdminClientMock(),
}));

type TauschErgebnis =
  | { kind: "ok"; body: unknown }
  | { kind: "timeout" }
  | { kind: "network_error" }
  | { kind: "http_error"; status: number };

let tauschErgebnis: TauschErgebnis = { kind: "ok", body: {} };
const exchangeMock = vi.fn(async () => tauschErgebnis);
vi.mock("@/lib/oauth/google-token", async (importOriginal) => {
  const echt = await importOriginal<
    typeof import("@/lib/oauth/google-token")
  >();
  return { ...echt, exchangeAuthorizationCode: () => exchangeMock() };
});

import { GET } from "./route";
import { decryptSecret } from "@/lib/secrets/cipher";
import { parseOAuthPayload } from "@/lib/secrets/oauth-payload";

// --- Aufbau --------------------------------------------------------------

function volleAntwort(
  ueberschreibungen: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    access_token: ZUGANGSDATUM,
    expires_in: 3920,
    token_type: "Bearer",
    scope: "https://www.googleapis.com/auth/datamanager",
    refresh_token: ERNEUERUNGS_TOKEN,
    ...ueberschreibungen,
  };
}

function anfrage(query: string): Request {
  return new Request(
    `http://localhost:3000/api/oauth/google/callback?${query}`,
  );
}

/** Die Normallage: gueltiges Cookie, passender state, Code, Eigentuemer, gute Antwort. */
function normallage(): void {
  cookieWert = `${STATE}.${PROJEKT_ID}`;
  angemeldeterNutzer = { id: NUTZER_ID };
  eigenesProjekt = { id: PROJEKT_ID };
  projektFehler = null;
  schreibFehler = null;
  tauschErgebnis = { kind: "ok", body: volleAntwort() };
}

const ERFOLGS_QUERY = `code=${encodeURIComponent(CODE)}&state=${encodeURIComponent(STATE)}`;

function ziel(res: Response): string {
  return res.headers.get("Location") ?? "";
}

function ergebnisCode(res: Response): string | null {
  return new URL(ziel(res), "http://localhost:3000").searchParams.get("google");
}

/**
 * Die PROJEKT-KENNUNG im Rueckkehr-Ziel, oder null (mitgereiste Fix-Scheibe).
 *
 * GELESEN WIE DER ERGEBNISCODE — ueber searchParams und NICHT ueber einen
 * Zeichenketten-Vergleich auf die ganze Location. Ein Vergleich auf den Volltext waere
 * bei JEDER kuenftigen Ergaenzung rot, ohne dass an der geprueften Eigenschaft etwas
 * kaputt waere; genau deshalb sind die bestehenden Laeufe dieser Datei von der Ergaenzung
 * unberuehrt geblieben.
 */
function projektKennung(res: Response): string | null {
  return new URL(ziel(res), "http://localhost:3000").searchParams.get("project");
}

/** Das zuletzt geschriebene Upsert-Argument. */
function geschrieben(): Record<string, unknown> {
  const letzter = upsert.mock.calls.at(-1);
  if (!letzter) throw new Error("kein Upsert-Aufruf");
  return (letzter as unknown as [Record<string, unknown>])[0];
}

/** Alle Argumente, die je an die Konsole gingen — als EIN durchsuchbarer Text. */
function logText(): string {
  const spione = [warnSpion, errorSpion, infoSpion];
  return spione
    .flatMap((s) => s.mock.calls)
    .map((args) => (args as unknown[]).map((a) => JSON.stringify(a)).join(" "))
    .join("\n");
}

let warnSpion: ReturnType<typeof vi.spyOn>;
let errorSpion: ReturnType<typeof vi.spyOn>;
let infoSpion: ReturnType<typeof vi.spyOn>;

beforeEach(() => {
  process.env.GOOGLE_OAUTH_CLIENT_ID = ERFUNDENE_CLIENT_ID;
  process.env.GOOGLE_OAUTH_CLIENT_SECRET = ERFUNDENES_CLIENT_SECRET;
  process.env.GOOGLE_OAUTH_REDIRECT_URI = ERFUNDENE_REDIRECT_URI;
  process.env.SECRET_ENC_KEYS = `test-1:${TESTSCHLUESSEL}`;
  process.env.SECRET_ENC_ACTIVE_KEY_ID = "test-1";

  normallage();
  upsert.mockClear();
  createAdminClientMock.mockClear();
  exchangeMock.mockClear();

  warnSpion = vi.spyOn(console, "warn").mockImplementation(() => {});
  errorSpion = vi.spyOn(console, "error").mockImplementation(() => {});
  infoSpion = vi.spyOn(console, "info").mockImplementation(() => {});
});

afterEach(() => {
  process.env = { ...ORIGINAL_ENV };
  vi.restoreAllMocks();
});

// --- Die Tests -----------------------------------------------------------

describe("Der error-Zweig (E4/E5)", () => {
  // ROT, sobald der error-Zweig fehlt: Der Ablauf faellt dann auf einen ANDEREN
  // Ausgang durch. Deshalb prueft dieser Test auf DENIED und nicht auf "nicht ok".
  it("R1 — error=access_denied ergibt denied und KEINEN Tausch", async () => {
    const res = await GET(anfrage("error=access_denied"));
    expect(ergebnisCode(res)).toBe("denied");
    expect(exchangeMock).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
  });

  // E4: Die Anbieter-Seite schreibt selbst "e.g." — access_denied ist ein BEISPIEL.
  // Wer dagegen vergleicht, laesst jeden anderen Wert in den Erfolgszweig laufen.
  it("R2 — JEDER error-Wert ergibt denied, nicht nur access_denied", async () => {
    for (const wert of ["admin_policy_enforced", "irgendwas_neues", "x"]) {
      const res = await GET(anfrage(`error=${wert}`));
      expect(ergebnisCode(res)).toBe("denied");
    }
    expect(exchangeMock).not.toHaveBeenCalled();
  });

  // E5, DER KERN: OB GOOGLE BEI EINER VERWEIGERUNG DEN state MITSCHICKT, IST NICHT
  // GELESEN. Stuende die State-Pruefung vorn, wiese sie eine normale Ablehnung als
  // Sitzungsfehler ab. ROT, sobald die Reihenfolge kippt.
  it("R3 — error gewinnt gegen ein fehlendes Cookie und einen fehlenden state", async () => {
    cookieWert = undefined;
    const res = await GET(anfrage("error=access_denied"));
    expect(ergebnisCode(res)).toBe("denied");
  });

  it("R3b — der error-WERT steht in keinem Log", async () => {
    await GET(anfrage("error=ein_sehr_auffaelliger_fremdwert"));
    expect(logText()).not.toContain("ein_sehr_auffaelliger_fremdwert");
  });

  // =========================================================================
  // T9 — DER denied-ZWEIG TRAEGT DIE PROJEKT-KENNUNG, OHNE DIE ANORDNUNG ZU AENDERN.
  //
  // BEIDE HAELFTEN EINZELN, und das ist die Auflage: Der Zweig liest das Cookie NUR, um
  // die Kennung zu entnehmen — er VERIFIZIERT den State nicht. Ein Lauf, der nur die
  // Kennung prueft, liesse offen, ob dabei die bewusste Anordnung gekippt ist; ein Lauf,
  // der nur die Anordnung prueft, liesse offen, ob die Kennung ueberhaupt ankommt.
  // =========================================================================
  it("T9a — denied traegt die Kennung, wenn das Cookie lesbar ist", async () => {
    // WIRD ROT, WENN die Lesung im denied-Zweig faellt. Dann landete ausgerechnet der
    // Fall, den ein Betreiber am haeufigsten selbst ausloest — er klickt "Abbrechen" —,
    // im Rueckfall-Projekt.
    const res = await GET(anfrage("error=access_denied"));
    expect(ergebnisCode(res)).toBe("denied");
    expect(projektKennung(res)).toBe(PROJEKT_ID);
  });

  it("T9b — OHNE lesbares Cookie bleibt denied denied: kein Sitzungsfehler, keine Kennung", async () => {
    // DIE ZWEITE HAELFTE, und sie bewacht die ANORDNUNG: Ein Fehlschlag der Lesung ist
    // FOLGENLOS — kein Ausgang, kein no_state, kein Verdacht. Eine ganz normale Ablehnung
    // kommt weiterhin als denied heraus.
    // WIRD ROT, WENN jemand die Lesung zu einer PRUEFUNG macht (etwa "kein Cookie ->
    // no_state") — genau die Verwechslung, gegen die der Kommentar an der Stelle steht.
    cookieWert = undefined;
    const res = await GET(anfrage("error=access_denied"));
    expect(ergebnisCode(res)).toBe("denied");
    expect(projektKennung(res)).toBeNull();
  });

  it("T9c — ein KAPUTTES Cookie ist im denied-Zweig ebenfalls folgenlos", async () => {
    // Die dritte Gestalt desselben Fehlschlags. Sie steht getrennt, weil parseStateCookie
    // sie als EIGENEN Zustand fuehrt (bad_format gegen missing) — und weil ein Zweig, der
    // nur `missing` abfaengt, hier durchfiele.
    cookieWert = `${STATE}.${PROJEKT_ID}.zuviel`;
    const res = await GET(anfrage("error=access_denied"));
    expect(ergebnisCode(res)).toBe("denied");
    expect(projektKennung(res)).toBeNull();
  });
});

describe("State, Cookie und Code", () => {
  it("R4 — ein abweichender state ergibt state_mismatch und KEINEN Tausch", async () => {
    const res = await GET(
      anfrage(`code=${CODE}&state=ein-voellig-anderer-state-wert`),
    );
    expect(ergebnisCode(res)).toBe("state_mismatch");
    expect(exchangeMock).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
  });

  it("R4b — ein fehlender state ergibt state_mismatch, nicht Erfolg", async () => {
    const res = await GET(anfrage(`code=${CODE}`));
    expect(ergebnisCode(res)).toBe("state_mismatch");
    expect(exchangeMock).not.toHaveBeenCalled();
  });

  it("R5 — kein Cookie ergibt no_state", async () => {
    cookieWert = undefined;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("no_state");
    expect(exchangeMock).not.toHaveBeenCalled();
  });

  it("R5b — ein kaputtes Cookie ergibt no_state, und das Log unterscheidet den Grund", async () => {
    cookieWert = `${STATE}.${PROJEKT_ID}.zuviel`;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("no_state");
    expect(logText()).toContain("bad_format");
  });

  it("R5c — kein code und kein error ergibt no_code", async () => {
    const res = await GET(anfrage(`state=${encodeURIComponent(STATE)}`));
    expect(ergebnisCode(res)).toBe("no_code");
    expect(exchangeMock).not.toHaveBeenCalled();
  });
});

describe("Sitzung und Ownership (A-I)", () => {
  it("R6a — ohne Sitzung geht es auf /login, ohne Tausch", async () => {
    angemeldeterNutzer = null;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ziel(res)).toBe("/login");
    expect(exchangeMock).not.toHaveBeenCalled();
  });

  // DER FALL, UM DEN ES GEHT: Zwischen Start und Rueckkehr hat sich ein ANDERER
  // Nutzer angemeldet. Das Cookie ist tadellos — es beweist nur, dass DIESER BROWSER
  // den Fluss gestartet hat, nicht dass die JETZIGE Sitzung das Projekt besitzt.
  // ROT, sobald die erneute Ownership-Pruefung entfaellt.
  it("R6 — ein fremdes Projekt ergibt not_found und KEINEN Tausch", async () => {
    eigenesProjekt = null;
    cookieWert = `${STATE}.${FREMDE_PROJEKT_ID}`;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("not_found");
    expect(exchangeMock).not.toHaveBeenCalled();
    expect(upsert).not.toHaveBeenCalled();
  });

  it("R6b — ein Abfragefehler wird NICHT als 'nicht gefunden' verschluckt", async () => {
    eigenesProjekt = null;
    projektFehler = { message: "boom" };
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("not_found");
    expect(logText()).toContain("project_lookup");
  });

  // INVARIANTE (6): Der Admin-Client (service_role, bypassed RLS) entsteht NIE, bevor
  // das Ownership-Gate bestanden ist.
  it("R13 — im Nicht-Owner-Pfad wird der Admin-Client NIE instanziiert", async () => {
    eigenesProjekt = null;
    await GET(anfrage(ERFOLGS_QUERY));
    expect(createAdminClientMock).not.toHaveBeenCalled();

    angemeldeterNutzer = null;
    await GET(anfrage(ERFOLGS_QUERY));
    expect(createAdminClientMock).not.toHaveBeenCalled();

    cookieWert = undefined;
    await GET(anfrage(ERFOLGS_QUERY));
    expect(createAdminClientMock).not.toHaveBeenCalled();
  });
});

describe("Tausch und Auswertung", () => {
  it("R-T1 — ein Timeout ergibt exchange, ohne Schreibvorgang", async () => {
    tauschErgebnis = { kind: "timeout" };
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("exchange");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("R-T2 — ein HTTP-Fehler ergibt exchange, und der Status steht im Log", async () => {
    tauschErgebnis = { kind: "http_error", status: 400 };
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("exchange");
    expect(logText()).toContain("400");
  });

  // E3: EIGENER Ausgang, und ausdruecklich KEIN Schreibvorgang. Ein Zugang ohne
  // Erneuerungs-Token ist nach dem Ablauf des Zugangsdatums tot; als Erfolg abgelegt
  // saehe die Zeile aus wie jede andere.
  it("R12 — fehlendes refresh_token ergibt no_refresh und KEINEN Upsert", async () => {
    const ohne = volleAntwort();
    delete ohne.refresh_token;
    tauschErgebnis = { kind: "ok", body: ohne };

    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("no_refresh");
    expect(upsert).not.toHaveBeenCalled();
    expect(createAdminClientMock).not.toHaveBeenCalled();
  });

  it("R-T3 — eine unbrauchbare Antwort ergibt bad_response, ohne Schreibvorgang", async () => {
    tauschErgebnis = { kind: "ok", body: volleAntwort({ expires_in: "3920" }) };
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("bad_response");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("R-T4 — ein fehlender Chiffrier-Schluessel ergibt encrypt, ohne Schreibvorgang", async () => {
    delete process.env.SECRET_ENC_KEYS;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("encrypt");
    expect(upsert).not.toHaveBeenCalled();
  });

  it("R-T5 — ein Schreibfehler ergibt write", async () => {
    schreibFehler = { message: "23514" };
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("write");
  });
});

describe("Die Ablage (E-I, Invariante 2)", () => {
  // E-I: secret: null MUSS ausdruecklich im Argument stehen. Der CHECK verlangt GENAU
  // EINES von beiden; ohne die Zeile bliebe bei einem Konflikt ein bestehender
  // Klartext stehen und die Zeile truege beide Felder. Im Live-Test ist der Fall NICHT
  // erreichbar (null google-Zeilen) — deshalb prueft ihn dieser Test am ARGUMENT.
  it("R10 — das Upsert-Argument traegt secret_enc, secret: null und project_id", async () => {
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("ok");

    const zeile = geschrieben();
    expect(zeile.project_id).toBe(PROJEKT_ID);
    expect(zeile.target).toBe("google");
    expect(zeile.secret).toBeNull();
    expect("secret" in zeile).toBe(true);
    expect(typeof zeile.secret_enc).toBe("string");
    expect((zeile.secret_enc as string).length).toBeGreaterThan(0);
  });

  it("R10b — der Konflikt-Arbiter ist das Paar (project_id, target)", async () => {
    await GET(anfrage(ERFOLGS_QUERY));
    const optionen = (
      upsert.mock.calls.at(-1) as unknown as [unknown, { onConflict: string }]
    )[1];
    expect(optionen.onConflict).toBe("project_id,target");
  });

  // R11 — DIE TRAGENDE PROBE. Zwei Haelften, und beide sind noetig:
  //   (1) Das Geschriebene ist NICHT der Klartext.
  //   (2) Es laesst sich zurueckrechnen und traegt die echten Werte.
  // Ohne (2) waere (1) auch von einer kaputten Chiffrierung erfuellt; ohne (1) waere
  // (2) auch von einem Klartext erfuellt.
  it("R11 — geschrieben wird ein Chiffrat, und es rechnet sich korrekt zurueck", async () => {
    await GET(anfrage(ERFOLGS_QUERY));
    const chiffrat = geschrieben().secret_enc as string;

    expect(chiffrat).not.toContain(ZUGANGSDATUM);
    expect(chiffrat).not.toContain(ERNEUERUNGS_TOKEN);

    const klar = decryptSecret(chiffrat);
    if (klar.kind !== "ok") throw new Error(`Rundlauf kaputt: ${klar.kind}`);
    const nutzlast = parseOAuthPayload(klar.value);
    if (nutzlast.kind !== "ok")
      throw new Error(`Nutzlast kaputt: ${nutzlast.kind}`);

    expect(nutzlast.value.accessToken).toBe(ZUGANGSDATUM);
    expect(nutzlast.value.refreshToken).toBe(ERNEUERUNGS_TOKEN);
    expect(nutzlast.value.refreshTokenExpiresAt).toEqual({ kind: "unknown" });
    // E2: ein absoluter Zeitpunkt, NICHT die rohe Restdauer.
    expect(nutzlast.value.accessTokenExpiresAt).toBeGreaterThan(3920);
  });
});

describe("Die Ausgaenge als Menge (A-II, E6)", () => {
  /** Jeder Ausgang der Route, einmal gefahren. */
  async function alleAusgaenge(): Promise<Response[]> {
    const laeufe: Array<() => Promise<Response>> = [
      async () => {
        normallage();
        return GET(anfrage("error=access_denied"));
      },
      async () => {
        normallage();
        cookieWert = undefined;
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        return GET(anfrage(`code=${CODE}&state=falsch`));
      },
      async () => {
        normallage();
        return GET(anfrage(`state=${encodeURIComponent(STATE)}`));
      },
      async () => {
        normallage();
        angemeldeterNutzer = null;
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        eigenesProjekt = null;
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        delete process.env.GOOGLE_OAUTH_CLIENT_SECRET;
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        tauschErgebnis = { kind: "timeout" };
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        tauschErgebnis = { kind: "ok", body: volleAntwort({ expires_in: null }) };
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        const ohne = volleAntwort();
        delete ohne.refresh_token;
        tauschErgebnis = { kind: "ok", body: ohne };
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        delete process.env.SECRET_ENC_KEYS;
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        schreibFehler = { message: "boom" };
        return GET(anfrage(ERFOLGS_QUERY));
      },
      async () => {
        normallage();
        return GET(anfrage(ERFOLGS_QUERY));
      },
    ];

    const antworten: Response[] = [];
    for (const lauf of laeufe) {
      process.env.GOOGLE_OAUTH_CLIENT_SECRET = ERFUNDENES_CLIENT_SECRET;
      process.env.SECRET_ENC_KEYS = `test-1:${TESTSCHLUESSEL}`;
      antworten.push(await lauf());
    }
    return antworten;
  }

  it("R7 — JEDER Ausgang loescht das State-Cookie", async () => {
    for (const res of await alleAusgaenge()) {
      const gesetzt = res.headers.get("Set-Cookie") ?? "";
      expect(gesetzt).toContain(`${COOKIE_NAME}=;`);
      expect(gesetzt).toContain("Max-Age=0");
    }
  });

  it("R8 — JEDER Ausgang traegt private, no-store", async () => {
    for (const res of await alleAusgaenge()) {
      expect(res.headers.get("Cache-Control")).toBe("private, no-store");
    }
  });

  // E6: Der Anbieter verlangt, nach der Verarbeitung auf eine URL OHNE die
  // Antwortparameter weiterzuleiten — der Referer-Header kann den Code weitergeben.
  it("R9 — KEIN Ziel traegt code, state oder error", async () => {
    for (const res of await alleAusgaenge()) {
      const wohin = ziel(res);
      expect(res.status).toBe(302);
      expect(wohin).not.toContain("code=");
      expect(wohin).not.toContain("state=");
      expect(wohin).not.toContain("error=");
      expect(wohin).not.toContain(CODE);
      expect(wohin).not.toContain(STATE);
    }
  });

  it("R9b — kein Ausgang traegt einen Rumpf (die Texte kommen mit der Oberflaeche)", async () => {
    for (const res of await alleAusgaenge()) {
      expect(await res.text()).toBe("");
    }
  });

  // =========================================================================
  // T6 — DIE PROJEKT-KENNUNG IM RUECKKEHR-ZIEL (mitgereiste Fix-Scheibe).
  // =========================================================================
  it("T6 — der Erfolgs-Ausgang traegt die Kennung aus dem Cookie", async () => {
    // ROT DURCH DIE PFLICHT-MUTATION "den Projekt-Parameter im Callback weglassen".
    // DIE KENNUNG KOMMT AUS DEM COOKIE, NICHT AUS DER URL — deshalb ist sie hier
    // PROJEKT_ID und nicht irgendein Anfrage-Parameter. Waere sie ueber Google gereist,
    // entschiede der Rueckkehrer, an welches Projekt gebunden wird.
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("ok");
    expect(projektKennung(res)).toBe(PROJEKT_ID);
  });

  it("T6b — no_state traegt KEINE Kennung, und das ist die benannte Grenze", async () => {
    // KEIN FEHLSCHLAG, SONDERN EINE EIGENSCHAFT: Die Kennung liegt im Cookie, und genau
    // dessen Fehlen hat zu diesem Ausgang gefuehrt. WIRD ROT, WENN jemand hier "der
    // Vollstaendigkeit halber" etwas anhaengt — es gaebe nichts anzuhaengen, und ein
    // erfundener Wert waehlte ein fremdes Projekt.
    cookieWert = undefined;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ergebnisCode(res)).toBe("no_state");
    expect(projektKennung(res)).toBeNull();
  });

  it("T6c — der /login-Ausgang traegt KEINE Kennung", async () => {
    // ER LAEUFT GAR NICHT UEBER outcomeUrl (redirectOut("/login") mit einem Literal), und
    // deshalb ist hier nichts auszunehmen gewesen. DER LAUF STEHT TROTZDEM, weil die
    // Tatsache sonst nur ein Kommentar waere:
    // /login ist eine ANDERE Seite. Der Mount-Effekt, der die Adresse raeumt, lebt in
    // CodeImporter und laeuft dort nicht — EIN PARAMETER, DEN NICHTS KONSUMIERT, BLEIBT
    // STEHEN, und das verletzt die Festlegung "beide Parameter zusammen entfernt".
    angemeldeterNutzer = null;
    const res = await GET(anfrage(ERFOLGS_QUERY));
    expect(ziel(res)).toBe("/login");
    expect(projektKennung(res)).toBeNull();
  });
});

describe("Die Log-Disziplin", () => {
  // R14 — die Abwesenheits-Behauptung. Sie ist NUR zusammen mit R11 (der Beweis, dass
  // die Werte den ganzen Pfad durchlaufen haben) und R15 (die Positivkontrolle)
  // tragfaehig. Allein waere sie die T4-Falle: eine Aussage ueber etwas, das nie in
  // den Scope kam.
  it("R14 — kein Log traegt Code, Token, Chiffrat oder Klartext", async () => {
    await GET(anfrage(ERFOLGS_QUERY));
    const text = logText();

    expect(text).not.toContain(CODE);
    expect(text).not.toContain(ZUGANGSDATUM);
    expect(text).not.toContain(ERNEUERUNGS_TOKEN);
    expect(text).not.toContain(ERFUNDENES_CLIENT_SECRET);
    expect(text).not.toContain(geschrieben().secret_enc as string);
    // Auch nicht GEKUERZT: ein gekuerztes Geheimnis ist ein Geheimnis.
    expect(text).not.toContain(ZUGANGSDATUM.slice(0, 12));
    expect(text).not.toContain(ERNEUERUNGS_TOKEN.slice(0, 12));
  });

  // POSITIVKONTROLLE zu R14 — ohne sie sind ein echter Nicht-Treffer und ein stumm
  // gewordener Log-Pfad am Ergebnis nicht zu unterscheiden.
  it("R15 — der Erfolgspfad protokolliert ueberhaupt etwas, mit Projekt-Kennung", async () => {
    await GET(anfrage(ERFOLGS_QUERY));
    const text = logText();
    expect(text.length).toBeGreaterThan(0);
    expect(text).toContain("oauth/google/callback");
    expect(text).toContain(PROJEKT_ID);
  });

  it("R15b — auch der Fehlerpfad protokolliert, ohne Geheimnis", async () => {
    tauschErgebnis = { kind: "http_error", status: 401 };
    await GET(anfrage(ERFOLGS_QUERY));
    const text = logText();
    expect(text).toContain("exchange");
    expect(text).not.toContain(CODE);
  });
});
