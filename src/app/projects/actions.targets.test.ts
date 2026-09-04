import { afterEach, describe, expect, it, vi } from "vitest";

const { createClient } = vi.hoisted(() => ({ createClient: vi.fn() }));
vi.mock("@/lib/supabase/server", () => ({ createClient }));
vi.mock("server-only", () => ({}));

// Admin-Client-Mock. Zeichnet auf, WELCHE Tabelle in welcher Reihenfolge
// angesprochen wurde, WELCHE Zeile geschrieben, WELCHE Filter gesetzt und WELCHE
// SPALTEN selektiert wurden.
//
// DIE SPALTEN-AUFZEICHNUNG IST NICHT ZIERRAT: An ihr haengt die Zusage, dass der
// Indikator-Lesepfad die secret-Spalte NIE anfasst. Ohne sie liesse sich nur
// pruefen, DASS gelesen wird, nicht WAS.
const {
  createAdminClient,
  adminUpsert,
  adminTables,
  adminDeleteEq,
  adminSelectCols,
  adminSelectEq,
  setSelectResult,
} = vi.hoisted(() => {
  const adminUpsert = vi.fn<
    (row: unknown, options?: unknown) => {
      then: (onF: (v: unknown) => unknown) => unknown;
    }
  >(() => ({ then: (onF) => onF({ error: null }) }));
  const adminTables: string[] = [];
  const adminDeleteEq: [string, unknown][] = [];
  const adminSelectCols: string[] = [];
  const adminSelectEq: [string, unknown][] = [];
  let selectResult: { data?: unknown; error: unknown } = { data: [], error: null };
  const setSelectResult = (r: { data?: unknown; error: unknown }) => {
    selectResult = r;
  };
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
  const adminSelect = vi.fn((cols: string) => {
    adminSelectCols.push(cols);
    const chain: Record<string, unknown> = {
      eq: (col: string, val: unknown) => {
        adminSelectEq.push([col, val]);
        return chain;
      },
      then: (onF: (v: unknown) => unknown) => onF(selectResult),
    };
    return chain;
  });
  const createAdminClient = vi.fn(() => ({
    from: vi.fn((table: string) => {
      adminTables.push(table);
      return { upsert: adminUpsert, delete: adminDelete, select: adminSelect };
    }),
  }));
  return {
    createAdminClient,
    adminUpsert,
    adminTables,
    adminDeleteEq,
    adminSelectCols,
    adminSelectEq,
    setSelectResult,
  };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

// DIE CHIFFRIERUNG WIRD GEMOCKT, DIE NUTZLAST NICHT (Scheibe 11.2b). Der Grund ist die
// Trennlinie, nicht Bequemlichkeit: decryptSecret braucht echtes Schluesselmaterial aus
// der Umgebung und ist in cipher.test.ts eigens geprueft; parseOAuthPayload braucht
// nichts und ist genau der Leser, dessen Fehlzustaende hier zu Lagen werden. Waere er
// mitgemockt, pruefte die Zuordnung parse_* nur noch den Mock.
const { decryptSecret } = vi.hoisted(() => ({
  decryptSecret: vi.fn<(v: string) => { kind: string; value?: string }>(),
}));
vi.mock("@/lib/secrets/cipher", () => ({ decryptSecret }));

import {
  listConfiguredTargets,
  listTargetCredentialStates,
  removeCapiToken,
  setCapiToken,
} from "./actions";
// ECHT, NICHT GEMOCKT: der Schreiber der Nutzlast baut die Zeichenkette, die der
// Pruefling zurueckliest. Dieselbe Auflage wie in capi/token.test.ts.
import { formatOAuthPayload } from "@/lib/secrets/oauth-payload";
import { CREDENTIAL_EXPIRY_WARN_SECONDS } from "@/lib/tracking/credential-state";
// DIE ECHTEN KONSTANTEN, keine Literale: waechst die Ziel-Liste, waechst dieser
// Test mit, statt eine handgeschriebene Kopie zu pruefen.
import { TRACKING_TARGETS, type TrackingTarget } from "@/lib/settings";

/** Minimaler SSR-Client-Mock: Ownership-Gate + settings-Update. */
function makeClient(opts: { user: { id: string } | null; owned?: unknown }) {
  const rec = { fromTables: [] as string[] };
  const client = {
    auth: { getUser: vi.fn(async () => ({ data: { user: opts.user } })) },
    from: vi.fn((table: string) => {
      rec.fromTables.push(table);
      const b: Record<string, unknown> = {};
      b.select = vi.fn(() => b);
      b.eq = vi.fn(() => b);
      b.maybeSingle = vi.fn(async () => ({
        data: opts.owned === undefined ? { id: "proj-1", settings: {} } : opts.owned,
        error: null,
      }));
      b.update = vi.fn(() => b);
      b.then = (onF: (v: unknown) => unknown) => onF({ error: null });
      return b;
    }),
  };
  createClient.mockResolvedValue(client);
  return rec;
}

afterEach(() => {
  vi.clearAllMocks();
  adminTables.length = 0;
  adminDeleteEq.length = 0;
  adminSelectCols.length = 0;
  adminSelectEq.length = 0;
  setSelectResult({ data: [], error: null });
});

// ===========================================================================
// DIE ZWEITE ACHSE IN DEN SERVER-ACTIONS (Phase 11, sechste Scheibe, Haelfte A).
//
// Das Ownership-Gate prueft das PROJEKT. Der Ziel-Parameter ist eine ZWEITE Achse,
// und sie hat einen eigenen Waechter — sonst faenge erst der CHECK der
// Geheimnis-Tabelle einen unbekannten Wert, und zwar NACH dem Instanziieren des
// privilegierten Clients.
// ===========================================================================

describe("Unbekanntes Ziel wird abgewiesen — VOR jedem privilegierten Zugriff", () => {
  it("setCapiToken: unbekanntes Ziel -> Fehler, KEIN Admin-Client", async () => {
    // ROT DURCH M1 (Ziel-Pruefung entfernt): dann liefe der Aufruf durch bis zum
    // Upsert, und der privilegierte Client entstuende fuer eine Eingabe, die die
    // Datenbank ohnehin verwirft.
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "pintrest" as TrackingTarget, "S");
    expect(result).toEqual({ ok: false, error: "Unbekanntes Tracking-Ziel." });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpsert).not.toHaveBeenCalled();
  });

  // =========================================================================
  // DAS ZWEITE ZIEL-GATE (Scheibe 3) — EIN ZIEL OHNE GEHEIMNIS-FELD NIMMT KEINEN
  // KLARTEXT AN. Es beantwortet eine ANDERE Frage als das Gate darueber: jenes fragt,
  // ob das Ziel BEKANNT ist, dieses, ob es ein Geheimnis-Feld FUEHRT. 'google' ist
  // bekannt und faellt trotzdem heraus.
  // =========================================================================
  it("setCapiToken: Ziel OHNE Geheimnis-Feld -> Fehler, KEIN Client, KEIN Admin-Client", async () => {
    // ROT, WENN DER AUSGANG ENTFERNT WIRD ODER HINTER DEN OWNERSHIP-BLOCK RUTSCHT.
    // WAS ER VERHINDERT, und das ist der sicherheitsrelevante Teil dieser Scheibe: Ohne
    // ihn schriebe der Upsert den uebergebenen Text als KLARTEXT nach
    // project_secrets.secret — in eine Zeile, deren Geheimnis chiffriert gehoert und
    // deren Klartext-Spalte NULL bleiben muss. Ohne bestehende Zeile ginge das STILL
    // durch; mit bestehender braeche der CHECK project_secrets_secret_genau_eines.
    //
    // DIE REIHENFOLGE WIRD MITGEPRUEFT UND IST NICHT NEBENSACHE: Auch createClient darf
    // nicht gerufen worden sein. Ein Ausgang, der erst NACH dem Ownership-Gate greift,
    // waere fachlich richtig und verletzte trotzdem die Anordnung, auf der dieser Pfad
    // ruht — der privilegierte Client soll fuer einen abgewiesenen Aufruf gar nicht
    // erst entstehen.
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "google", "EINGEFUEGT");
    expect(result).toEqual({
      ok: false,
      error: "Für dieses Ziel werden keine Zugangsdaten eingefügt.",
    });
    expect(createClient).not.toHaveBeenCalled();
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminUpsert).not.toHaveBeenCalled();
  });

  it("removeCapiToken: ein Ziel OHNE Geheimnis-Feld bleibt TRENNBAR", async () => {
    // DIE GEGENPROBE ZUM LAUF DARUEBER, und sie ist der Grund, warum er nicht zu weit
    // greift: Das Gate sitzt AUSSCHLIESSLICH im Setzen. Ein Trennen ohne Verbinden waere
    // eine Sackgasse — genau der Zustand, den diese Scheibe beseitigt.
    // ROT, WENN jemand das Gate "der Symmetrie halber" auch in removeCapiToken einbaut.
    makeClient({ user: { id: "u1" }, owned: { id: "proj-1", settings: {} } });
    const result = await removeCapiToken("proj-1", "google");
    expect(result).toEqual({ ok: true });
    expect(adminDeleteEq).toContainEqual(["target", "google"]);
  });

  it("removeCapiToken: unbekanntes Ziel -> Fehler, KEIN Admin-Client, KEIN DELETE", async () => {
    makeClient({ user: { id: "u1" } });
    const result = await removeCapiToken("proj-1", "pintrest" as TrackingTarget);
    expect(result).toEqual({ ok: false, error: "Unbekanntes Tracking-Ziel." });
    expect(createAdminClient).not.toHaveBeenCalled();
    expect(adminDeleteEq).toHaveLength(0);
  });

  it("die Abweisung sagt NICHTS ueber das Projekt — kein Zustands-Leck", () => {
    // Die Meldung nennt das ZIEL, nicht die Existenz oder Zugehoerigkeit des
    // Projekts. Ein Aufrufer erfaehrt aus ihr nichts, was er nicht schon wusste.
    expect("Unbekanntes Tracking-Ziel.").not.toContain("Projekt");
  });
});

describe("Ein gueltiges zweites Ziel schreibt seine EIGENE Zeile", () => {
  it("schreibt (project_id, target, secret) mit DIESEM Ziel", async () => {
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "pinterest", "  PIN-SECRET  ");
    expect(result).toEqual({ ok: true, trackingKey: expect.any(String) });
    expect(adminUpsert.mock.calls[0][0]).toEqual({
      project_id: "proj-1",
      target: "pinterest",
      secret: "PIN-SECRET",
    });
    expect(adminUpsert.mock.calls[0][1]).toEqual({ onConflict: "project_id,target" });
  });

  it("und fasst die ALT-TABELLE NICHT an (sie ist Metas Rollback-Reserve)", async () => {
    // ROT DURCH: ein bedingungsloser Doppelschreib. Der ueberschriebe
    // project_tokens.meta_capi_token mit einem FREMDEN Geheimnis — ein
    // Code-Rollback faende dann den falschen Wert vor, und der Meta-Forward liefe
    // mit Pinterests Zugangsdaten. Die Tabelle hat keine Ziel-Spalte; es gibt
    // keinen richtigen Wert, den man dort ablegen koennte.
    makeClient({ user: { id: "u1" } });
    await setCapiToken("proj-1", "pinterest", "PIN");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminUpsert).toHaveBeenCalledTimes(1);
  });

  it("META schreibt WEITERHIN in BEIDE Tabellen, neue zuerst (Bestandszusage)", async () => {
    // POSITIVKONTROLLE zum Test darueber: ohne sie zeigte er nur, dass IRGENDETWAS
    // die Alt-Tabelle ausspart — nicht, dass Meta sie weiterhin trifft.
    makeClient({ user: { id: "u1" } });
    await setCapiToken("proj-1", "meta", "META-SECRET");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
  });

  // DAS VIERTE ZIEL (11.1a) — ES BRAUCHT KEINEN EIGENEN SCHREIBPFAD, und dieser Lauf
  // ist der Beleg dafuer: setCapiToken ist seit der sechsten Scheibe ziel-generisch.
  // WAS ER ZUSAETZLICH ZU DEN PINTEREST-LAEUFEN ZEIGT: dass die Generik auch fuer ein
  // Ziel OHNE Empfaenger traegt. Die Ablage haengt nicht am Adapter — wer beides
  // koppelte, koennte fuer dieses Ziel gar nichts hinterlegen.
  it("LINKEDIN schreibt seine EIGENE Zeile und fasst die Alt-Tabelle NICHT an", async () => {
    // ROT DURCH: ein Ziel-Vergleich im Schreibpfad, der nur bekannte ADAPTER
    // durchliesse, oder ein bedingungsloser Doppelschreib in die Alt-Tabelle.
    makeClient({ user: { id: "u1" } });
    const result = await setCapiToken("proj-1", "linkedin", "  LI-SECRET  ");
    expect(result).toEqual({ ok: true, trackingKey: expect.any(String) });
    expect(adminUpsert.mock.calls[0][0]).toEqual({
      project_id: "proj-1",
      target: "linkedin",
      secret: "LI-SECRET",
    });
    expect(adminTables).toEqual(["project_secrets"]);
  });
});

describe("Der Loeschpfad trifft genau EIN Ziel", () => {
  it("filtert auf Projekt UND Ziel", async () => {
    // ROT DURCH: ein fehlender Ziel-Filter. Der loeschte die Geheimnisse ALLER
    // Ziele des Projekts, obwohl nur eines gemeint war.
    makeClient({ user: { id: "u1" } });
    const result = await removeCapiToken("proj-1", "pinterest");
    expect(result).toEqual({ ok: true });
    expect(adminDeleteEq).toEqual([
      ["project_id", "proj-1"],
      ["target", "pinterest"],
    ]);
  });

  it("bei einem NICHT-Meta-Ziel bleibt die Alt-Tabelle unberuehrt", async () => {
    makeClient({ user: { id: "u1" } });
    await removeCapiToken("proj-1", "pinterest");
    expect(adminTables).toEqual(["project_secrets"]);
  });

  it("META loescht WEITERHIN in BEIDEN Tabellen (Bestandszusage)", async () => {
    makeClient({ user: { id: "u1" } });
    await removeCapiToken("proj-1", "meta");
    expect(adminTables).toEqual(["project_secrets", "project_tokens"]);
  });
});

describe("Das Ownership-Gate bleibt die Projekt-Grenze", () => {
  it("fremdes Projekt + GUELTIGES Ziel -> Abbruch, KEIN Admin-Client", async () => {
    // Die zweite Achse ersetzt die erste nicht. Ein gueltiges Ziel bringt niemanden
    // in ein fremdes Projekt.
    makeClient({ user: { id: "u1" }, owned: null });
    const result = await setCapiToken("foreign", "pinterest", "S");
    expect(result).toEqual({ ok: false, error: "Projekt nicht gefunden." });
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("nicht eingeloggt + gueltiges Ziel -> Abbruch, KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await setCapiToken("proj-1", "pinterest", "S")).toEqual({
      ok: false,
      error: "Nicht eingeloggt.",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
  });
});

// ===========================================================================
// DER INDIKATOR JE ZIEL — abgeleitet, nicht gefuehrt.
// ===========================================================================

describe("listConfiguredTargets", () => {
  it("liefert die Ziele mit hinterlegten Zugangsdaten", async () => {
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }, { target: "pinterest" }], error: null });
    expect(await listConfiguredTargets("proj-1")).toEqual(["meta", "pinterest"]);
  });

  it("SELEKTIERT NIE DAS GEHEIMNIS — nur die target-Spalte", async () => {
    // DER WAECHTER DER ZUGANGSDATEN-DISZIPLIN. Ein `select("*")` oder ein
    // mitgenommenes secret-Feld truege das Geheimnis in eine Server-Action-Antwort
    // und damit potenziell bis in den Client.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }], error: null });
    await listConfiguredTargets("proj-1");
    expect(adminSelectCols).toEqual(["target"]);
    expect(adminSelectCols.join(" ")).not.toContain("secret");
    expect(adminSelectCols.join(" ")).not.toContain("*");
  });

  it("EINE Runde fuer ALLE Ziele — die Zahl der Karten aendert die Abfragezahl nicht", async () => {
    // ROT DURCH: eine Abfrage je Ziel. Auf dem Ladepfad der Oberflaeche waere das
    // eine Runde mehr pro Plattform, ohne jeden Gewinn.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [{ target: "meta" }, { target: "pinterest" }], error: null });
    await listConfiguredTargets("proj-1");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminSelectEq).toEqual([["project_id", "proj-1"]]);
  });

  it("verwirft Werte, die dieser Code nicht kennt", async () => {
    // Die DB kann nach einem Rollback auf eine aeltere Code-Fassung Werte tragen,
    // die hier unbekannt sind. Sie als Ziel auszugeben hiesse, der Oberflaeche eine
    // Karte anzubieten, die es nicht gibt.
    //
    // DER UNBEKANNTE WERT MUSS SYNTHETISCH SEIN, UND DAS IST DIE EIGENTLICHE
    // LEHRE DIESER ZEILE: Hier stand bis zur TikTok-Scheibe "tiktok" — ein
    // plausibler Zielname, der mit jener Scheibe REAL wurde. Der Test war damit
    // rot, ohne dass sich an dem geaendert haette, was er schuetzt. JEDER
    // plausible Anbietername kann spaeter real werden; "ga4", "custom",
    // "linkedin" sind dieselbe Falle mit Verzoegerung. Nur ein Wert, der
    // NIEMALS ein Ziel sein kann, haelt diesen Test unabhaengig von der
    // Ziel-Menge. Wer ihn ersetzt, waehlt wieder einen solchen.
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: [
        { target: "meta" },
        { target: "__kein_ziel__" },
        { target: null },
        {},
      ],
      error: null,
    });
    expect(await listConfiguredTargets("proj-1")).toEqual(["meta"]);
  });

  it("fremdes Projekt -> LEER und KEIN Admin-Client", async () => {
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await listConfiguredTargets("foreign")).toEqual([]);
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("nicht eingeloggt -> LEER und KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await listConfiguredTargets("proj-1")).toEqual([]);
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("DB-Fehler -> LEER, kein Wurf", async () => {
    // Leer heisst in der Oberflaeche "nicht konfiguriert" — im Zweifel die
    // SCHWAECHERE Behauptung. Ein Wurf brauchte einen Fehlerkanal, den diese
    // Haelfte nicht baut.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: null, error: { code: "42P01" } });
    await expect(listConfiguredTargets("proj-1")).resolves.toEqual([]);
  });

  it("kennt jedes Ziel der Liste — waechst sie, waechst der Test mit", async () => {
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: TRACKING_TARGETS.map((t) => ({ target: t })),
      error: null,
    });
    expect(await listConfiguredTargets("proj-1")).toEqual([...TRACKING_TARGETS]);
  });
});

// ===========================================================================
// DIE LAGE DER ZUGANGSDATEN — DIE ZWEITE QUELLE (Scheibe 11.2b).
//
// SIE STEHT NEBEN listConfiguredTargets UND ERSETZT SIE NICHT. Der Grund ist der
// Waechter "SELEKTIERT NIE DAS GEHEIMNIS" weiter oben: Er nagelt die Spaltenliste
// jener Aktion auf ["target"] fest, und eine Erweiterung muesste ihn oeffnen. Er
// bleibt woertlich; diese Aktion bringt ihren eigenen mit.
// ===========================================================================

/** Baut eine echte, abgelegte Nutzlast mit der gewuenschten zweiten Uhr. */
function nutzlast(refresh: { kind: "at"; epochSeconds: number } | { kind: "unknown" }) {
  const res = formatOAuthPayload({
    accessToken: "ZUGANGSDATUM-GEHEIM",
    accessTokenExpiresAt: 1_700_000_000,
    refreshToken: "ERNEUERUNGS-TOKEN-GEHEIM",
    refreshTokenExpiresAt: refresh,
  });
  if (res.kind !== "ok") throw new Error("Fixture kaputt: " + res.field);
  return res.value;
}

describe("listTargetCredentialStates", () => {
  it("B1: fremdes Projekt -> not_found und KEIN Admin-Client", async () => {
    // (I-3): Der RLS-Bypass ist ohne bestandenes Gate physisch unerreichbar.
    // WIRD ROT, WENN: jemand createAdminClient() vor das Eigentums-Gate zieht.
    makeClient({ user: { id: "u1" }, owned: null });
    expect(await listTargetCredentialStates("foreign")).toEqual({
      ok: false,
      reason: "not_found",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("B2: nicht eingeloggt -> unauthenticated und KEIN Admin-Client", async () => {
    makeClient({ user: null });
    expect(await listTargetCredentialStates("proj-1")).toEqual({
      ok: false,
      reason: "unauthenticated",
    });
    expect(createAdminClient).not.toHaveBeenCalled();
  });

  it("B3: selektiert GENAU target und secret_enc — nie die Klartext-Spalte", async () => {
    // DER SPALTEN-WAECHTER DIESER AKTION, UND ER IST ANDERS GEBAUT ALS DER DER
    // NACHBARIN — das ist kein Versehen, sondern der Grund fuer seinen Kommentar:
    //
    // Der Bestandswaechter oben schreibt `not.toContain("secret")`. DIESE FORM IST
    // HIER UNTAUGLICH: "secret_enc" ENTHAELT "secret" ALS TEILZEICHENKETTE, der
    // Ausdruck faellt also, obwohl die Klartext-Spalte gar nicht dabei ist. Es ist der
    // Fall "EIN WAECHTER UEBER QUELLTEXT SIEHT ZEICHEN, NICHT BEDEUTUNG" auf der
    // Spaltenachse.
    // WAS STATTDESSEN TRAEGT: EXAKTE GLEICHHEIT. Sie ist strenger als jede
    // Teilzeichenketten-Probe — eine dritte Spalte faellt auf, gleich wie sie heisst.
    //
    // DIE ZWEI WAECHTER STEHEN NEBENEINANDER UND MEINEN VERSCHIEDENES. Wer sie
    // angleicht, macht einen von beiden falsch.
    //
    // WIRD ROT, WENN: jemand `secret` mitnimmt, `*` selektiert oder eine dritte Spalte
    // ergaenzt.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [], error: null });
    await listTargetCredentialStates("proj-1");
    expect(adminSelectCols).toEqual(["target, secret_enc"]);
    expect(adminSelectCols.join(" ")).not.toContain("*");
  });

  it("B4: EINE Runde fuer ALLE Ziele, auf project_secrets gefiltert", async () => {
    // ROT DURCH: eine Abfrage je Ziel. Dieselbe Begruendung wie bei der Nachbarin.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: [], error: null });
    await listTargetCredentialStates("proj-1");
    expect(adminTables).toEqual(["project_secrets"]);
    expect(adminSelectEq).toEqual([["project_id", "proj-1"]]);
  });

  it("B5: DB-Fehler -> read_failed, KEIN Wurf", async () => {
    // DER UNTERSCHIED ZUR NACHBARIN IN EINEM LAUF: Sie ebnet jeden Fehler auf eine
    // leere Liste ein, und die Karte liest daraus "nicht konfiguriert". Diese hier
    // sagt, dass sie nichts weiss.
    //
    // EINZELSTUECK — GEMESSEN, NICHT VERMUTET (Mutationsprobe M4, 2026-09-04: den
    // Fehlerfall wieder zur leeren Liste gemacht): Es fiel GENAU DIESER Lauf, 1 von
    // 1525. Er traegt die Fehlerklasse "die zweite Quelle ebnet ihre Fehler ein wie
    // die erste" ALLEIN. Wer ihn als redundant entfernt, nimmt die einzige Abdeckung
    // mit — und damit den ganzen Grund, warum es diese zweite Aktion gibt.
    makeClient({ user: { id: "u1" } });
    setSelectResult({ data: null, error: { code: "42P01" } });
    await expect(listTargetCredentialStates("proj-1")).resolves.toEqual({
      ok: false,
      reason: "read_failed",
    });
  });

  it("B6: verwirft Zielwerte, die dieser Code nicht kennt", async () => {
    // DER UNBEKANNTE WERT IST SYNTHETISCH, und das ist die Lehre der Nachbarin: Jeder
    // plausible Anbietername kann spaeter real werden. Nur ein Wert, der NIEMALS ein
    // Ziel sein kann, haelt den Lauf unabhaengig von der Ziel-Menge.
    makeClient({ user: { id: "u1" } });
    setSelectResult({
      data: [
        { target: "meta", secret_enc: null },
        { target: "__kein_ziel__", secret_enc: null },
        { target: null, secret_enc: null },
        {},
      ],
      error: null,
    });
    expect(await listTargetCredentialStates("proj-1")).toEqual({
      ok: true,
      states: { meta: { kind: "no_clock" } },
    });
  });

  it("B7: KEIN Geheimnis im Ergebnis — die Laufzeit-Gegenprobe zum Typ", async () => {
    // (I-1) ist strukturell durch den Rueckgabetyp gesichert; DIESER LAUF MISST ES AM
    // ERGEBNIS. Zugangsdatum und Erneuerungs-Token stehen in der entschluesselten
    // Nutzlast und werden gelesen — heraus geht keines von beiden.
    // WIRD ROT, WENN: jemand ein Feld ergaenzt, das die Nutzlast weiterreicht.
    makeClient({ user: { id: "u1" } });
    decryptSecret.mockReturnValue({
      kind: "ok",
      value: nutzlast({ kind: "at", epochSeconds: 1_900_000_000 }),
    });
    setSelectResult({
      data: [{ target: "google", secret_enc: "CHIFFRAT" }],
      error: null,
    });
    const roh = JSON.stringify(await listTargetCredentialStates("proj-1"));
    // POSITIVKONTROLLE: der Lauf hat wirklich eine entschluesselte Zeile gesehen.
    // Ohne sie waere "kein Geheimnis drin" von "gar nichts drin" nicht zu
    // unterscheiden.
    expect(roh).toContain("google");
    expect(roh).not.toContain("ZUGANGSDATUM-GEHEIM");
    expect(roh).not.toContain("ERNEUERUNGS-TOKEN-GEHEIM");
    expect(roh).not.toContain("CHIFFRAT");
  });

  it("B8: die drei Uhr-2-Lagen entstehen am echten Lesepfad", async () => {
    // NICHT REDUNDANT ZU DEN A-LAEUFEN: Jene pruefen die Deutung der Uhr ohne
    // Datenbank; dieser prueft, dass die Aktion die richtige Uhr aus der richtigen
    // Nutzlast holt. Ein Vertauschen der zwei Uhren waere dort unsichtbar.
    const jetzt = Math.floor(Date.now() / 1000);
    const faelle: [number, string][] = [
      [jetzt + CREDENTIAL_EXPIRY_WARN_SECONDS + 3600, "live"],
      [jetzt + 3600, "expiring"],
      [jetzt - 3600, "dead"],
    ];
    for (const [epochSeconds, erwartet] of faelle) {
      makeClient({ user: { id: "u1" } });
      decryptSecret.mockReturnValue({
        kind: "ok",
        value: nutzlast({ kind: "at", epochSeconds }),
      });
      setSelectResult({
        data: [{ target: "google", secret_enc: "CHIFFRAT" }],
        error: null,
      });
      const res = await listTargetCredentialStates("proj-1");
      expect(res.ok && res.states.google?.kind).toBe(erwartet);
    }
  });

  it("B9: unbekannte zweite Uhr -> unknown_expiry, kaputte Nutzlast -> unreadable", async () => {
    // ZWEI LAGEN, DIE NUR HIER ENTSTEHEN KOENNEN — die eine aus einer gueltigen
    // Nutzlast ohne Ablaufzeitpunkt, die andere aus einer, die der Leser abweist.
    makeClient({ user: { id: "u1" } });
    decryptSecret.mockReturnValue({
      kind: "ok",
      value: nutzlast({ kind: "unknown" }),
    });
    setSelectResult({
      data: [{ target: "google", secret_enc: "CHIFFRAT" }],
      error: null,
    });
    expect(await listTargetCredentialStates("proj-1")).toEqual({
      ok: true,
      states: { google: { kind: "unknown_expiry" } },
    });

    makeClient({ user: { id: "u1" } });
    decryptSecret.mockReturnValue({ kind: "ok", value: "kein-p1-format" });
    setSelectResult({
      data: [{ target: "google", secret_enc: "CHIFFRAT" }],
      error: null,
    });
    expect(await listTargetCredentialStates("proj-1")).toEqual({
      ok: true,
      states: { google: { kind: "unreadable", reason: "parse_bad_format" } },
    });
  });

  it("B10: ein Dechiffrier-Fehlzustand wird zu SEINEM Grund, nicht eingeebnet", async () => {
    makeClient({ user: { id: "u1" } });
    decryptSecret.mockReturnValue({ kind: "unknown_key" });
    setSelectResult({
      data: [{ target: "google", secret_enc: "CHIFFRAT" }],
      error: null,
    });
    expect(await listTargetCredentialStates("proj-1")).toEqual({
      ok: true,
      states: { google: { kind: "unreadable", reason: "decrypt_unknown_key" } },
    });
  });
});
