import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

// ===========================================================================
// DER WAECHTER UEBER VERSION, ENDPUNKT UND ABSCHALTTERMIN (Phase 11.7, Scheibe S1).
//
// WARUM ES IHN GIBT: Zwei Ziele senden eine Version mit Abschalttermin, und beim
// Ablauf wird im eigenen Code NICHTS rot. Meta leitet einen Aufruf an eine
// abgelaufene Version still auf die naechstaeltere um (docs/ziel-befunde/meta.md,
// Teil (t)). LinkedIn antwortet auf eine abgeschaltete Version laut Doku mit 426
// und NONEXISTENT_VERSION — mit einem Endpunkt-Vorbehalt: dieselbe Seite nennt fuer
// ihr neues Fehler-Schema nur drei andere Endpunkte, /rest/conversionEvents steht
// nicht darunter, und ob der Vorbehalt dieses Beispiel einschliesst, sagt sie nicht.
// Was unser Endpunkt antwortet, ist UNGEMESSEN; ein Fehlerstatus endet im Adapter in
// einer Server-Logzeile und erreicht den Betreiber nicht
// (docs/ziel-befunde/linkedin.md, Teil (ar)). Dazu war der Meta-Vorgabewert von
// keinem Test gedeckt — am 2026-09-23 mockten ZWOELF Testdateien
// @/lib/capi/config (gemessen) —, und der LinkedIn-Endpunkt ebenfalls nicht.
//
// DIE TABELLE IST DIE EINZIGE ERWARTUNG. Version und Termin je Zeile sind aus der
// genannten Quelle geschrieben, NIE aus dem Code, und vor dem Bau Zeichen fuer
// Zeichen gegen die zitierte Zeile geprueft. Die Versions-Waechter (V1, V3, V4)
// lesen ihre Erwartung aus derselben Zeile wie der Termin-Waechter (T1): Wer eine
// Version anhebt, MUSS diese Zeile mit neuem Termin und neuer Quelle nachziehen,
// sonst wird V1/V3 bzw. V4 rot. Ein weiteres Ziel kommt als weitere Zeile dazu.
//
// DIE GRENZEN DIESES WAECHTERS — er traegt sie selbst, damit niemand einen
// Fehlalarm fuer einen Befund haelt oder ihn still weicher macht:
// (1) Die CI laeuft nur bei push und pull_request, nicht nach Zeitplan. Ein
//     faelliger Termin wird erst beim naechsten Push oder lokalen Lauf rot.
// (2) Eine in Vercel gesetzte Umgebungsvariable META_GRAPH_VERSION sieht er
//     NICHT. Geprueft ist allein der Vorgabewert im Code; was die
//     Produktionsumgebung sendet, ist am Repo nicht feststellbar.
// (3) Die Meta-Grenze 2027-01-21 ist die SPAETESTMOEGLICHE: Sie stammt aus der
//     Graph-Tabelle. Die Marketing-Tabelle derselben Seite fuehrt v21.0 gar nicht;
//     welche der beiden fuer /{PIXEL_ID}/events gilt, ist UNGEMESSEN
//     (docs/ziel-befunde/meta.md, Teil (s)). Gilt die Marketing-Tabelle, ist die
//     echte Frist frueher, und dieser Waechter meldet sie nicht.
// (4) `fetch` ist gestellt. Bewiesen wird, WAS unser Code sendet — nicht, dass
//     der Anbieter es annimmt.
// ===========================================================================

type Zeile = {
  ziel: string;
  version: string;
  // Abschalttermin als UTC-Mitternacht — damit ist das Ergebnis von der
  // Zeitzone der Maschine unabhaengig.
  termin: string;
  quelle: string;
};

const TABELLE: readonly Zeile[] = [
  {
    ziel: "meta",
    // "v21.0 (October 2, 2024 / January 21, 2027)"
    version: "v21.0",
    termin: "2027-01-21T00:00:00Z",
    quelle: "docs/ziel-befunde/meta.md, Teil (s), Tabelle 1 (Graph API)",
  },
  {
    ziel: "linkedin",
    // "version 202601 (January 2026) ... | January 15, 2027 | Active"
    version: "202601",
    termin: "2027-01-15T00:00:00Z",
    quelle: "docs/ziel-befunde/linkedin.md, Teil (at)",
  },
];

const VORLAUF_TAGE = 60;
const TAG_MS = 24 * 60 * 60 * 1000;

// Host und Pfad der Meta-Adresse: "https://graph.facebook.com/{API_VERSION}/
// {PIXEL_ID}/events?access_token={TOKEN}" (docs/ziel-befunde/meta.md, Teil (s)).
const META_ADRESSE = (version: string) =>
  `https://graph.facebook.com/${version}/${PIXEL_ID}/events?access_token=${TOKEN}`;
// "POST https://api.linkedin.com/rest/conversionEvents"
// (docs/ziel-befunde/linkedin.md, Teil (ab)).
const LINKEDIN_ENDPUNKT = "https://api.linkedin.com/rest/conversionEvents";

// Ein Wert, der weder der Tabelle noch einer Mutationsprobe gleicht: Gruen heisst
// dann sicher, dass die Umgebungsvariable gelesen wurde.
const SENTINEL = "v99.0";

// ERFUNDENE Werte, am Namen erkennbar.
const PIXEL_ID = "PIXEL-123";
const TOKEN = "ERFUNDENES_TESTGEHEIMNIS_S1";
const IP = "203.0.113.7";
const UA = "Mozilla/5.0 (Test)";
const URN = "urn:lla:llaPartnerConversion:987654";

function zeile(ziel: string): Zeile {
  const z = TABELLE.find((t) => t.ziel === ziel);
  if (!z) throw new Error(`Die Tabelle traegt keine Zeile fuer "${ziel}".`);
  return z;
}

function meldung(z: Zeile): string {
  const grenze = new Date(Date.parse(z.termin) - VORLAUF_TAGE * TAG_MS)
    .toISOString()
    .slice(0, 10);
  let text =
    `Ziel ${z.ziel}: Version ${z.version} wird am ${z.termin.slice(0, 10)} ` +
    `abgeschaltet; der Vorlauf von ${VORLAUF_TAGE} Tagen ist seit ${grenze} erreicht. ` +
    `Zu tun: die Version anheben und diese Zeile mit neuer Version, neuem Termin und ` +
    `Teil aus der Ziel-Datei nachziehen — den Termin nie ohne neue Quelle verschieben. ` +
    `Befund: ${z.quelle}.`;
  if (z.ziel === "meta") {
    text +=
      " Vorbehalte: Der Termin ist die SPAETESTMOEGLICHE Grenze (Graph-Tabelle); gilt " +
      "die Marketing-Tabelle, ist die Frist frueher. Eine in Vercel gesetzte " +
      "META_GRAPH_VERSION sieht dieser Test nicht.";
  }
  return text;
}

/** Die Zeilen, deren Vorlauf zum Zeitpunkt `jetzt` erreicht ist, als Meldungen. */
function faellig(tabelle: readonly Zeile[], jetzt: number): string[] {
  return tabelle
    .filter((z) => jetzt >= Date.parse(z.termin) - VORLAUF_TAGE * TAG_MS)
    .map(meldung);
}

function fetchCalls() {
  return (global.fetch as unknown as ReturnType<typeof vi.fn>).mock.calls as [
    string,
    { headers: Record<string, string> },
  ][];
}

/** Entfernt META_GRAPH_VERSION nachweislich — auch wenn die Maschine sie setzt. */
function ohneMetaVersion() {
  vi.stubEnv("META_GRAPH_VERSION", "vGESETZT");
  vi.stubEnv("META_GRAPH_VERSION", undefined);
  expect("META_GRAPH_VERSION" in process.env).toBe(false);
}

beforeEach(() => {
  // Der Wert wird beim LADEN von config.ts gelesen: jeder Test laedt frisch.
  vi.resetModules();
  vi.stubEnv("META_TEST_EVENT_CODE", "");
  global.fetch = vi.fn(async () => new Response(null, { status: 201 })) as unknown as typeof fetch;
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
  vi.useRealTimers();
});

describe("V — die gesendete Version ist die der Tabelle", () => {
  it("V1: der Meta-Vorgabewert, echter Import von config.ts ohne Umgebungsvariable", async () => {
    // WIRD ROT, WENN: der Vorgabewert in config.ts sich aendert, ohne dass die
    // Tabellenzeile nachgezogen wird (Mutationsprobe m1).
    ohneMetaVersion();
    const { META_GRAPH_VERSION } = await import("@/lib/capi/config");
    expect(META_GRAPH_VERSION).toBe(zeile("meta").version);
  });

  it("V2: eine gesetzte Umgebungsvariable gewinnt, getrimmt", async () => {
    // WIRD ROT, WENN: der Umgebungsweg in config.ts bricht (m5b). Bleibt gruen, wenn
    // nur der Vorgabewert sich aendert (m5) — die Erwartung ist der SENTINEL.
    vi.stubEnv("META_GRAPH_VERSION", ` ${SENTINEL} `);
    const { META_GRAPH_VERSION } = await import("@/lib/capi/config");
    expect(META_GRAPH_VERSION).toBe(SENTINEL);
  });

  it("V3: der echte Meta-Adapter sendet an die Adresse mit der Tabellen-Version", async () => {
    // WIRD ROT, WENN: der Vorgabewert sich aendert (m1). Deckt zusaetzlich Host und
    // Pfad. Bleibt ALLEIN gruen, wenn der Adapter "v21.0" fest eintraegt — dafuer V3b.
    ohneMetaVersion();
    const { forwardToMeta } = await import("@/lib/capi/meta-forward");
    await forwardToMeta({ pixelId: PIXEL_ID, token: TOKEN }, "Purchase", "evt-1", {}, IP, UA);
    expect(fetchCalls()).toHaveLength(1);
    expect(fetchCalls()[0][0]).toBe(META_ADRESSE(zeile("meta").version));
  });

  it("V3b: der echte Meta-Adapter liest META_GRAPH_VERSION und traegt sie nicht fest ein", async () => {
    // WIRD ROT, WENN: meta-forward.ts die Version als Literal eintraegt statt die
    // Konstante zu lesen (m6) — der EINZIGE Test, der das faengt.
    vi.stubEnv("META_GRAPH_VERSION", SENTINEL);
    const { forwardToMeta } = await import("@/lib/capi/meta-forward");
    await forwardToMeta({ pixelId: PIXEL_ID, token: TOKEN }, "Purchase", "evt-1", {}, IP, UA);
    expect(fetchCalls()).toHaveLength(1);
    expect(fetchCalls()[0][0]).toBe(META_ADRESSE(SENTINEL));
  });

  it("V4: der echte LinkedIn-Adapter trifft den Endpunkt mit der Tabellen-Version", async () => {
    // WIRD ROT, WENN: der Endpunkt sich aendert (m2) — der EINZIGE Test, der das
    // faengt — oder die Version ohne Tabellenzeile angehoben wird (m3; dort faellt
    // zusaetzlich T1-c in linkedin-forward.test.ts).
    const { forwardToLinkedin } = await import("@/lib/capi/linkedin-forward");
    await forwardToLinkedin(
      { token: TOKEN, conversionRules: { Purchase: URN } },
      "Purchase",
      "evt-1",
      {},
      IP,
    );
    expect(fetchCalls()).toHaveLength(1);
    expect(fetchCalls()[0][0]).toBe(LINKEDIN_ENDPUNKT);
    expect(fetchCalls()[0][1].headers["LinkedIn-Version"]).toBe(zeile("linkedin").version);
  });
});

describe("T — der Abschalttermin", () => {
  it("T1: an der echten Uhr ist fuer keine Zeile der Vorlauf erreicht", () => {
    // DER EIGENTLICHE WAECHTER. Er prueft eine ABWESENHEIT; seine
    // Positivkontrolle ist T3.
    expect(faellig(TABELLE, Date.now())).toEqual([]);
  });

  it("T2: jede Zeile ist wohlgeformt", () => {
    // WIRD ROT, WENN: ein Termin nicht parsebar ist. Ohne diesen Test bliebe T1
    // dann still gruen — ein Vergleich mit NaN ist immer falsch.
    for (const z of TABELLE) {
      expect(z.termin).toMatch(/^\d{4}-\d{2}-\d{2}T00:00:00Z$/);
      expect(Number.isFinite(Date.parse(z.termin))).toBe(true);
      expect(z.version).not.toBe("");
      expect(z.quelle.startsWith("docs/ziel-befunde/")).toBe(true);
    }
    expect(new Set(TABELLE.map((z) => z.ziel)).size).toBe(TABELLE.length);
  });

  it("T3: Positivkontrolle — an der Grenze meldet die Pruefung, eine Sekunde davor nicht", () => {
    for (const z of TABELLE) {
      const grenze = Date.parse(z.termin) - VORLAUF_TAGE * TAG_MS;
      const treffer = faellig([z], grenze);
      expect(treffer).toHaveLength(1);
      expect(treffer[0]).toContain(`Ziel ${z.ziel}: Version ${z.version}`);
      expect(treffer[0]).toContain(z.quelle);
      expect(faellig([z], grenze - 1000)).toEqual([]);
    }
    expect(faellig([zeile("meta")], Date.parse(zeile("meta").termin))[0]).toContain(
      "SPAETESTMOEGLICHE",
    );
  });
});
