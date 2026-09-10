import { describe, expect, it, vi } from "vitest";

// `import "server-only"` wirft ausserhalb der react-server-Condition (also auch in
// vitest). DER PRUEFLING BRAUCHT DEN MOCK NICHT — er traegt keine Direktive und erbt
// keine (s. seinen Kopf). Er steht hier ausschliesslich fuer den KOPPLUNGS-LAUF A10,
// der die Schwelle aus lib/capi/token.ts holt; jene Datei ist server-only.
vi.mock("server-only", () => ({}));
// Aus demselben Grund: capi/token.ts zieht den service_role-Client, und der wollte
// eine echte Verbindung bauen. Dieselbe Bauform wie in capi/token.test.ts.
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient: vi.fn() }));

import {
  activeTestCodeFromRow,
  CREDENTIAL_EXPIRY_WARN_SECONDS,
  credentialStateFor,
  credentialStateFrom,
  resolveConfigured,
  TARGETS_WITH_TEST_MODE,
  TEST_MODE_DURATION_SECONDS,
  testModeStateFor,
  testModeStateFrom,
  withoutTarget,
  withTestModeState,
  type ListCredentialStatesResult,
  type ListTestModeStatesResult,
  type TargetCredentialState,
} from "./credential-state";
// DIE ZWEITE ZAHL FUER A10. Eine Testdatei darf importieren, was der Pruefling nicht
// darf — dieselbe Erwaegung, auf der U1 in capi/token.test.ts ruht.
import { REFRESH_SIGNAL_LEAD_SECONDS } from "@/lib/capi/token";
// NUR DER TYP, und er wird beim Bauen geloescht: Der Lauf E3-TYP unten prueft die
// ZUWEISBARKEIT und laedt die Komponente nicht.
import type { ConfiguredState } from "@/components/TargetCard";

/** Ein fester Bezugspunkt. Keine echte Uhr — die Funktion bekommt sie herein. */
const NOW = 1_800_000_000;

// ===========================================================================
// A — DIE SECHS LAGEN.
//
// SIE SIND OHNE DATENBANK, OHNE SCHLUESSEL UND OHNE server-only PRUEFBAR, und das ist
// der Zweck des Schnitts: Die Aktion klassifiziert die ZEILE, diese Datei deutet die
// UHR. Waere die Deutung in der Aktion geblieben, brauchte jeder dieser Laeufe einen
// Supabase-Mock und ein echtes Chiffrat.
// ===========================================================================

describe("credentialStateFrom — die sechs Lagen", () => {
  it("A1: Uhr 2 weit in der Zukunft -> live, MIT Zeitpunkt", () => {
    // WIRD ROT, WENN: die Schwelle zu frueh greift oder expiresAt wegfaellt.
    const state = credentialStateFrom(
      { kind: "clock", expiry: { kind: "at", epochSeconds: NOW + 200_000 } },
      NOW,
    );
    expect(state).toEqual({ kind: "live", expiresAt: NOW + 200_000 });
  });

  it("A2: Uhr 2 INNERHALB der Vorwarn-Schwelle -> expiring, MIT Zeitpunkt", () => {
    // ZWEI PROBEN STATT EINER: der Rand der Schwelle und ein Wert weit darunter.
    // WIRD ROT, WENN: die Vorwarn-Lage entfaellt oder die Schwelle auf 0 faellt.
    const amRand = credentialStateFrom(
      {
        kind: "clock",
        expiry: {
          kind: "at",
          epochSeconds: NOW + CREDENTIAL_EXPIRY_WARN_SECONDS,
        },
      },
      NOW,
    );
    expect(amRand).toEqual({
      kind: "expiring",
      expiresAt: NOW + CREDENTIAL_EXPIRY_WARN_SECONDS,
    });

    const knappDavor = credentialStateFrom(
      { kind: "clock", expiry: { kind: "at", epochSeconds: NOW + 1 } },
      NOW,
    );
    expect(knappDavor).toEqual({ kind: "expiring", expiresAt: NOW + 1 });
  });

  it("A2b: eine Sekunde AUSSERHALB der Schwelle ist noch live", () => {
    // DIE GEGENPROBE ZU A2. Ohne sie waere "alles ist expiring" gruen.
    const state = credentialStateFrom(
      {
        kind: "clock",
        expiry: {
          kind: "at",
          epochSeconds: NOW + CREDENTIAL_EXPIRY_WARN_SECONDS + 1,
        },
      },
      NOW,
    );
    expect(state.kind).toBe("live");
  });

  it("A3: Uhr 2 ueberschritten -> dead, MIT Zeitpunkt", () => {
    const state = credentialStateFrom(
      { kind: "clock", expiry: { kind: "at", epochSeconds: NOW - 1 } },
      NOW,
    );
    expect(state).toEqual({ kind: "dead", expiredAt: NOW - 1 });
  });

  it("A4: DER RAND — epochSeconds === now gilt als tot (fail-closed)", () => {
    // UEBERNOMMEN, NICHT NEU ERFUNDEN: dieselbe Wahl wie hasLiveRefreshToken in
    // lib/capi/token.ts und wie Schritt (6) in lib/oauth/token-refresh.ts.
    // WIRD ROT, WENN: jemand `<=` zu `<` macht — die Sekunde, in der ein Zugang
    // stirbt, gehoerte dann noch ihm.
    const state = credentialStateFrom(
      { kind: "clock", expiry: { kind: "at", epochSeconds: NOW } },
      NOW,
    );
    expect(state).toEqual({ kind: "dead", expiredAt: NOW });
  });

  it("A5: {kind:'unknown'} -> unknown_expiry, und das Objekt traegt KEINEN Zeitpunkt", () => {
    // FESTLEGUNG 5 DER SCHEIBE 1a, UEBERNOMMEN: "unbekannt" gilt NIE als abgelaufen.
    // WIRD ROT, WENN: die unknown-Lage wie "lebt" oder wie "tot" behandelt wird.
    const state = credentialStateFrom(
      { kind: "clock", expiry: { kind: "unknown" } },
      NOW,
    );
    expect(state).toEqual({ kind: "unknown_expiry" });
    // DIE SCHLUESSEL-PRUEFUNG IST NICHT REDUNDANT ZU toEqual: toEqual IGNORIERT einen
    // Schluessel mit dem Wert undefined (GEMESSEN 2026-08-18). Ein `expiresAt:
    // undefined` ginge oben STILL vorbei.
    expect(Object.keys(state)).toEqual(["kind"]);
  });

  it("A6: keine Nutzlast -> no_clock, und das Objekt traegt KEINEN Zeitpunkt", () => {
    // DIE INVARIANTE (I-7): Die vier Klartext-Ziele bekommen NIE ein Ablaufdatum.
    // WIRD ROT, WENN: jemand einer Zeile ohne Chiffrat eine Uhr andichtet.
    const state = credentialStateFrom({ kind: "no_clock" }, NOW);
    expect(state).toEqual({ kind: "no_clock" });
    expect(Object.keys(state)).toEqual(["kind"]);
  });

  it("A7: jeder Dechiffrier-Fehlzustand -> unreadable mit SEINEM Grund", () => {
    // FUENF, EINZELN. WIRD ROT, WENN: ein Zustand auf einen anderen eingeebnet wird.
    const gruende = [
      "decrypt_no_key",
      "decrypt_bad_key",
      "decrypt_bad_format",
      "decrypt_unknown_key",
      "decrypt_auth_failed",
    ] as const;
    for (const reason of gruende) {
      expect(credentialStateFrom({ kind: "unreadable", reason }, NOW)).toEqual({
        kind: "unreadable",
        reason,
      });
    }
  });

  it("A8: jeder Nutzlast-Fehlzustand -> unreadable mit SEINEM Grund", () => {
    const gruende = ["parse_unknown_version", "parse_bad_format"] as const;
    for (const reason of gruende) {
      expect(credentialStateFrom({ kind: "unreadable", reason }, NOW)).toEqual({
        kind: "unreadable",
        reason,
      });
    }
  });
});

describe("Die Invariante (I-1): der Typ kann kein Geheimnis tragen", () => {
  it("A9: KEIN Feldwert ist ein freier String — nur kind, Zahlen und der reason", () => {
    // DER STRUKTUR-WAECHTER. Er prueft eine EIGENSCHAFT DES TYPS an Beispielen aller
    // sechs Lagen: Ausser dem kind-Literal und dem SELBSTVERGEBENEN reason gibt es
    // keinen Ort, an den ein Token, ein Chiffrat oder ein Anbieter-Text passte.
    //
    // WIRD ROT, WENN: jemand ein string-Feld ergaenzt — etwa "token", "message" oder
    // einen durchgereichten Fehlertext. Ein Zahlenfeld bleibt erlaubt; Zeitpunkte
    // sind keine Geheimnisse.
    //
    // SEINE GRENZE TRAEGT ER AN SICH SELBST: Er prueft BEISPIELE, nicht den Typ. Ein
    // neues string-Feld, das in keiner dieser sechs Lagen vorkommt, entginge ihm —
    // die harte Zusage ist der Typ, dieser Lauf ist die laute Gegenprobe dazu.
    const erlaubteReasons = new Set([
      "decrypt_no_key",
      "decrypt_bad_key",
      "decrypt_bad_format",
      "decrypt_unknown_key",
      "decrypt_auth_failed",
      "parse_unknown_version",
      "parse_bad_format",
    ]);
    const erlaubteKinds = new Set([
      "live",
      "expiring",
      "dead",
      "unknown_expiry",
      "no_clock",
      "unreadable",
    ]);

    const alle: TargetCredentialState[] = [
      credentialStateFrom(
        { kind: "clock", expiry: { kind: "at", epochSeconds: NOW + 500_000 } },
        NOW,
      ),
      credentialStateFrom(
        { kind: "clock", expiry: { kind: "at", epochSeconds: NOW + 10 } },
        NOW,
      ),
      credentialStateFrom(
        { kind: "clock", expiry: { kind: "at", epochSeconds: NOW - 10 } },
        NOW,
      ),
      credentialStateFrom({ kind: "clock", expiry: { kind: "unknown" } }, NOW),
      credentialStateFrom({ kind: "no_clock" }, NOW),
      credentialStateFrom(
        { kind: "unreadable", reason: "decrypt_auth_failed" },
        NOW,
      ),
    ];

    // POSITIVKONTROLLE: die Schleife hat wirklich sechs verschiedene Lagen gesehen.
    // Ohne sie waere "kein freier String gefunden" von "nichts gepruft" nicht zu
    // unterscheiden.
    expect(new Set(alle.map((s) => s.kind)).size).toBe(6);

    for (const state of alle) {
      for (const [feld, wert] of Object.entries(state)) {
        if (typeof wert === "number") continue;
        expect(typeof wert).toBe("string");
        if (feld === "kind") expect(erlaubteKinds.has(wert as string)).toBe(true);
        else if (feld === "reason")
          expect(erlaubteReasons.has(wert as string)).toBe(true);
        else throw new Error(`Unerwartetes String-Feld: ${feld}`);
      }
    }
  });
});

describe("Die Kopplung der zwei Schwellen", () => {
  it("A10: die Vorwarn-Schwelle liegt UEBER dem Melde-Vorlauf von Uhr 1", () => {
    // DIE RELATION, NICHT DER WERT — dieselbe Grenze, die U1 in capi/token.test.ts an
    // sich selbst traegt: Er faengt den UMBAU, nicht den ENTWURF, und er sagt nichts
    // darueber, ob 48 Stunden richtig gewaehlt sind.
    //
    // WARUM DIE RICHTUNG DIESE IST: REFRESH_SIGNAL_LEAD_SECONDS gilt UHR 1 (dem
    // Zugangsdatum, eine Stunde), diese Schwelle gilt UHR 2 (dem Erneuerungs-Token,
    // sieben Tage im Testing-Zustand). Ruttschte die Vorwarnung auf einen Uhr-1-Wert,
    // erschiene sie fuenf Minuten vor dem Ausfall und waere funktionslos.
    //
    // WIRD ROT, WENN: jemand die Schwelle auf einen Uhr-1-Wert setzt.
    expect(CREDENTIAL_EXPIRY_WARN_SECONDS).toBeGreaterThan(
      REFRESH_SIGNAL_LEAD_SECONDS,
    );
    // Und die zweite Ungleichung aus dem Kopf der Konstante: DEUTLICH UNTER sieben
    // Tagen, sonst stuende die Karte dauerhaft auf Vorwarnung.
    expect(CREDENTIAL_EXPIRY_WARN_SECONDS).toBeLessThan(7 * 24 * 60 * 60);
  });
});

// ===========================================================================
// E3 — DIE VORRANGREGEL. BEI WIDERSPRUCH GEWINNT DIE UNSICHERHEIT.
// ===========================================================================

const OK_LEER: ListCredentialStatesResult = { ok: true, states: {} };
const GESCHEITERT: ListCredentialStatesResult = {
  ok: false,
  reason: "read_failed",
};

describe("resolveConfigured — die Vorrangregel", () => {
  it("E3: konfiguriert PLUS gescheiterte Lage-Aktion -> UNWISSEN, nie 'hinterlegt'", () => {
    // DER LAUF, DER DIE OWNER-ENTSCHEIDUNG VOM 2026-09-03 HAELT.
    // WIRD ROT, WENN: jemand die Regel umdreht und im Zweifel "konfiguriert" zeigt.
    // DAS IST DER TEUERSTE FEHLGRIFF DIESER SCHEIBE: Eine Oberflaeche, die im Zweifel
    // Sicherheit behauptet, ist genau die Krankheit, gegen die hier gebaut wird — sie
    // kostet eine UEBERSEHENE NEU-AUTORISIERUNG. Der umgekehrte Fehlgriff kostet einen
    // unnoetigen Blick.
    expect(resolveConfigured(["meta"], GESCHEITERT, "meta")).toBe("unknown");
  });

  it("E3b: NICHT konfiguriert PLUS gescheiterte Lage-Aktion -> ebenfalls UNWISSEN", () => {
    // DIE REGEL GILT IN BEIDE RICHTUNGEN, und das ist mehr als der Wortlaut der
    // Entscheidung verlangt: Auch "nicht konfiguriert" waere hier eine Behauptung ohne
    // Grundlage — die erste Quelle ebnet ihre eigenen Fehler auf eine leere Liste ein.
    expect(resolveConfigured([], GESCHEITERT, "meta")).toBe("unknown");
  });

  it("E3c: beide Quellen da und einig -> die gewoehnliche Aussage", () => {
    // DIE POSITIVKONTROLLE ZU E3/E3b. Ohne sie waere "immer unknown" gruen.
    expect(resolveConfigured(["meta"], OK_LEER, "meta")).toBe(true);
    expect(resolveConfigured(["meta"], OK_LEER, "pinterest")).toBe(false);
  });

  it("E3d: solange EINE Quelle fehlt, behauptet die Karte nichts", () => {
    expect(resolveConfigured(null, OK_LEER, "meta")).toBeNull();
    expect(resolveConfigured(["meta"], null, "meta")).toBeNull();
    expect(resolveConfigured(null, null, "meta")).toBeNull();
  });

  it("E3-TYP: der Rueckgabewert ist ConfiguredState — strukturell, ohne Import dort", () => {
    // DIE KOPPLUNG IST NICHT UEBER EINEN IMPORT GEBAUT (die Richtung Client -> rein
    // gilt nicht), sondern strukturell. DIESER LAUF IST IHR WAECHTER: Die Zuweisung
    // unten ist ein COMPILER-Argument und faellt an `tsc --noEmit`, sobald die zwei
    // Unionen auseinanderlaufen.
    const wert: ConfiguredState = resolveConfigured(["meta"], GESCHEITERT, "meta");
    expect(wert).toBe("unknown");
  });
});

describe("credentialStateFor", () => {
  it("liefert die Lage des Ziels", () => {
    const states: ListCredentialStatesResult = {
      ok: true,
      states: { google: { kind: "unknown_expiry" } },
    };
    expect(credentialStateFor(states, "google")).toEqual({
      kind: "unknown_expiry",
    });
  });

  it("null bei fehlender Zeile, fehlender Ladung und gescheiterter Aktion", () => {
    // DREI VERSCHIEDENE DINGE, DIESELBE ANZEIGE — und die Unterscheidung traegt die
    // Statuszeile, nicht diese Zeile.
    expect(credentialStateFor(OK_LEER, "google")).toBeNull();
    expect(credentialStateFor(null, "google")).toBeNull();
    expect(credentialStateFor(GESCHEITERT, "google")).toBeNull();
  });
});

describe("withoutTarget — entfernen statt raten", () => {
  it("nimmt die Lage des Ziels heraus und laesst die anderen stehen", () => {
    // WIRD ROT, WENN: die Nachfuehrung einen Wert EINSETZT statt zu entfernen — dann
    // stuende nach dem Trennen ein erfundenes Ablaufdatum da.
    const vorher: ListCredentialStatesResult = {
      ok: true,
      states: {
        google: { kind: "live", expiresAt: NOW + 1 },
        meta: { kind: "no_clock" },
      },
    };
    expect(withoutTarget(vorher, "google")).toEqual({
      ok: true,
      states: { meta: { kind: "no_clock" } },
    });
  });

  it("gibt dieselbe REFERENZ zurueck, wo es nichts zu entfernen gibt", () => {
    // NICHT KOSMETIK: Eine neue Referenz ohne Anlass laesst den Container neu rendern.
    expect(withoutTarget(OK_LEER, "google")).toBe(OK_LEER);
    expect(withoutTarget(GESCHEITERT, "google")).toBe(GESCHEITERT);
    expect(withoutTarget(null, "google")).toBeNull();
  });
});

// =====================================================================
// TM10 — DER TESTZUSTAND AN SEINEM NEUEN ORT (Scheibe 11.3b).
//
// WARUM DIESER BLOCK HIER UND NICHT IN capi/token.test.ts: Dort prueft TM4 das
// Praedikat AM RESOLVER — also an seinem AUFRUFER. Nach dem Umzug muss es an seinem
// EIGENEN Ort geprueft werden, sonst prueft kein Lauf den Umzug selbst, und eine
// Mutation am umgezogenen Ausdruck faerbte nur einen Test rot, der zufaellig
// vorbeikommt.
// =====================================================================
describe("TM10 — das umgezogene Praedikat und die Randregel", () => {
  // NACHGEZOGEN 11.3d: Die Zeile traegt jetzt ihr ZIEL, weil das Praedikat es von dort
  // liest. "meta" ist hier ueberall das Ziel MIT Code-Pflicht — die Laeufe dieses
  // Blocks pruefen unveraendert den Bestand, nicht die neue Achse.
  const CODE = { target: "meta", test_event_code: "TEST123" };

  it("aktiv: die Frist liegt in der ZUKUNFT -> der Code kommt zurueck", () => {
    expect(
      activeTestCodeFromRow(
        { ...CODE, test_mode_expires_at: new Date((NOW + 1) * 1000).toISOString() },
        NOW,
      ),
    ).toEqual({ aktiv: true, code: "TEST123" });
  });

  it("DER RAND: expires === now gilt als ABGELAUFEN (der Vergleich ist '>')", () => {
    // ROT DURCH: '>' zu '>=' am umgezogenen Ausdruck. Das ist die Mutation, gegen die
    // Entscheidung (4) der Phase gebaut ist — driftet die Anzeige hier, zeigt die
    // Oberflaeche einen Testmodus, waehrend der Riegel im Ingest NICHT feuert.
    expect(
      activeTestCodeFromRow(
        { ...CODE, test_mode_expires_at: new Date(NOW * 1000).toISOString() },
        NOW,
      ),
    ).toEqual({ aktiv: false });
  });

  it("fail-closed: leerer Code, Leerraum-Code, fehlender oder kaputter Zeitstempel", () => {
    const frist = new Date((NOW + 3600) * 1000).toISOString();
    expect(activeTestCodeFromRow({ target: "meta", test_event_code: "", test_mode_expires_at: frist }, NOW)).toEqual({ aktiv: false });
    expect(activeTestCodeFromRow({ target: "meta", test_event_code: "   ", test_mode_expires_at: frist }, NOW)).toEqual({ aktiv: false });
    expect(activeTestCodeFromRow({ ...CODE, test_mode_expires_at: null }, NOW)).toEqual({ aktiv: false });
    expect(activeTestCodeFromRow({ ...CODE, test_mode_expires_at: "kein Datum" }, NOW)).toEqual({ aktiv: false });
  });
});

// =====================================================================
// TM14 — DIE ZIEL-ABHAENGIGE ACHSE DES PRAEDIKATS (Scheibe 11.3d, Entscheidung (14)).
//
// WAS DIESER BLOCK PRUEFT UND TM10 NICHT LEISTEN KANN: TM10 misst ein Ziel MIT
// Code-Pflicht und war vor dieser Scheibe der ganze Bestand. Seit 0029 kann das Schema
// einen Zustand ablegen — Frist ohne Code bei pinterest —, den der Aufloesungs-Pfad
// vorher NICHT als Testmodus erkannte. Beide Schichten sahen fuer sich richtig aus, und
// nichts wurde davon rot; genau diese Luecke schliessen die Laeufe hier.
//
// ES GIBT ABSICHTLICH KEINEN LAUF, DER requiresTestCode DIREKT BEFRAGT, und das ist
// keine Auslassung: Die Ziel-Auskunft ist modul-privat, und ein zweiter Waechter neben
// TM14a machte die Pflicht-Mutation "meta verlangt keinen Code" unschaerfer — sie soll
// GENAU die Laeufe faerben, die die Wirkung messen, nicht die, die die Tabelle
// abschreiben.
// =====================================================================
describe("TM14 — Ziele MIT und OHNE Code-Pflicht (Scheibe 11.3d)", () => {
  const ZUKUNFT = new Date((NOW + 3600) * 1000).toISOString();
  const VERGANGENHEIT = new Date((NOW - 60) * 1000).toISOString();

  it("TM14a: Ziel MIT Code-Pflicht, Frist in der Zukunft, Code LEER -> NICHT aktiv", () => {
    // DER WAECHTER GEGEN DEN STILLEN FEHLERFALL AUS ENTSCHEIDUNG (14), und er ist der
    // Grund, warum das Ziel-Wissen ueberhaupt in den TypeScript-Code kommt: Urteilte
    // das Praedikat allein ueber die Frist, gaelte diese meta-Zeile als AKTIV — der
    // Riegel naehme das Ereignis aus events, der Anbieter bekaeme KEINE Markierung und
    // verbuchte eine ECHTE Conversion. Genau das, was 0028 "reiner Datenverlust ohne
    // Gegenwert" nennt.
    // ROT DURCH: requiresTestCode("meta") auf false.
    expect(
      activeTestCodeFromRow(
        { target: "meta", test_event_code: "", test_mode_expires_at: ZUKUNFT },
        NOW,
      ),
    ).toEqual({ aktiv: false });
  });

  it("TM14b: Ziel OHNE Code-Pflicht, Frist in der Zukunft, Code LEER -> AKTIV, und der Schluessel `code` FEHLT", () => {
    // DER NORMALFALL FUER pinterest: sein Testmodus ist ein QUERY-PARAMETER ohne Code,
    // und der CHECK aus 0029 verbietet dort einen Code sogar.
    const urteil = activeTestCodeFromRow(
      { target: "pinterest", test_event_code: null, test_mode_expires_at: ZUKUNFT },
      NOW,
    );
    expect(urteil).toEqual({ aktiv: true });
    // DIE ZWEITE ZUSICHERUNG IST NICHT REDUNDANT: toEqual IGNORIERT einen Schluessel
    // mit dem Wert undefined (GEMESSEN 2026-08-18). Ohne sie waere der Lauf auch mit
    // `{ aktiv: true, code: undefined }` gruen.
    expect("code" in urteil).toBe(false);
  });

  it("TM14c: Ziel OHNE Code-Pflicht, Frist in der VERGANGENHEIT -> NICHT aktiv", () => {
    // DIE FRIST BLEIBT DAS URTEIL. Die Aenderung dieser Scheibe betrifft, was ein
    // fehlender CODE bedeutet — nicht, was ein abgelaufener Zeitpunkt bedeutet.
    expect(
      activeTestCodeFromRow(
        { target: "pinterest", test_event_code: null, test_mode_expires_at: VERGANGENHEIT },
        NOW,
      ),
    ).toEqual({ aktiv: false });
  });

  it("TM14d: DER RAND GILT FUER BEIDE ZIEL-KLASSEN — expires === now ist abgelaufen", () => {
    // Entscheidung (4), an der neuen Achse gegengeprueft: Die Randregel ist von der
    // Code-Pflicht unabhaengig. Ohne den pinterest-Teil waere sie fuer die neue Klasse
    // ungeprueft, und eine Drift auf '>=' faerbte nur die Haelfte rot.
    const rand = new Date(NOW * 1000).toISOString();
    expect(
      activeTestCodeFromRow(
        { target: "meta", test_event_code: "TEST123", test_mode_expires_at: rand },
        NOW,
      ),
    ).toEqual({ aktiv: false });
    expect(
      activeTestCodeFromRow(
        { target: "pinterest", test_event_code: null, test_mode_expires_at: rand },
        NOW,
      ),
    ).toEqual({ aktiv: false });
  });

  it("TM14e: ein Ziel, das dieser Code NICHT kennt, ist NICHT aktiv (fail-closed)", () => {
    // Die Datenbank kann nach einem Rollback Werte tragen, die dieser Code nicht kennt
    // — derselbe Filter-Gedanke wie bei den Lesern in app/projects/actions.ts. Ohne
    // diesen Lauf waere der erste Ausgang des Praedikats ungeprueft.
    expect(
      activeTestCodeFromRow(
        { target: "gibtsnicht", test_event_code: null, test_mode_expires_at: ZUKUNFT },
        NOW,
      ),
    ).toEqual({ aktiv: false });
  });
});

describe("TM11 — die drei Lagen des Testzustands", () => {
  // NACHGEZOGEN 11.3d: Auch die Anzeige-Ableitung bekommt das Ziel aus der Zeile
  // gereicht, weil sie das Urteil beim Praedikat holt. "meta" ist hier das Ziel MIT
  // Code-Pflicht; die neue Klasse steht in TM11b darunter.
  it("laeuft: Frist in der Zukunft plus Code -> mit Endzeitpunkt in EPOCHENSEKUNDEN", () => {
    const endet = NOW + TEST_MODE_DURATION_SECONDS;
    expect(
      testModeStateFrom(
        {
          target: "meta",
          test_event_code: "TEST123",
          test_mode_expires_at: new Date(endet * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "laeuft", endetAt: endet });
  });

  it("abgelaufen: Frist in der Vergangenheit -> mit dem Zeitpunkt, an dem sie endete", () => {
    // DIE AUSKUNFT, UM DERENTWILLEN DIE ZEILE STEHENBLEIBT (Owner-Entscheidung
    // 2026-09-09): "abgelaufen am ..." statt einer Leerstelle.
    const endete = NOW - 60;
    expect(
      testModeStateFrom(
        {
          target: "meta",
          test_event_code: "TEST123",
          test_mode_expires_at: new Date(endete * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "abgelaufen", endeteAt: endete });
  });

  it("LEERER CODE MIT ZUKUENFTIGER FRIST IST 'aus' — NICHT 'abgelaufen am <Zukunft>'", () => {
    // DER FALL AUS VORRAT (12): Der CHECK laesst test_event_code = '' zu, das
    // Praedikat verwirft ihn beim Trimmen. "abgelaufen am <Zukunft>" waere eine
    // sinnlose Auskunft; "aus" ist die richtige.
    // NACHGEZOGEN 11.3d: Der Satz gilt fuer Ziele MIT Code-Pflicht. Fuer pinterest ist
    // dieselbe Zeile "laeuft" — s. TM11b. Das ist der Zeiger, den der Beleg der
    // Streichung von Vorrat (12) mit der Scheibe 11.3e braucht.
    expect(
      testModeStateFrom(
        {
          target: "meta",
          test_event_code: "",
          test_mode_expires_at: new Date((NOW + 3600) * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "aus" });
  });

  it("keine Frist -> 'aus'", () => {
    expect(
      testModeStateFrom(
        { target: "meta", test_event_code: null, test_mode_expires_at: null },
        NOW,
      ),
    ).toEqual({ kind: "aus" });
  });

  it("DER RAND AUCH HIER: expires === now ist 'abgelaufen', nicht 'laeuft'", () => {
    // Spiegelbildlich zum '>' des Praedikats. Die beiden Vergleiche gehoeren
    // zusammen; driftete einer, entstuende genau in dieser Sekunde ein Zustand, den
    // die Karte anders liest als der Riegel.
    expect(
      testModeStateFrom(
        {
          target: "meta",
          test_event_code: "TEST123",
          test_mode_expires_at: new Date(NOW * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "abgelaufen", endeteAt: NOW });
  });
});

describe("TM11b — die Anzeige eines Ziels OHNE Code-Pflicht (Scheibe 11.3d)", () => {
  it("laufende Frist ohne Code -> 'laeuft', mit Endzeitpunkt", () => {
    // OHNE DIESEN NACHZUG ZEIGTE DIE KARTE "aus", WAEHREND DER RIEGEL FEUERT. Der Kunde
    // saehe, dass nichts laeuft, und seine Conversions verschwaenden aus events — die
    // Umkehrung genau des Widerspruchs, gegen den Entscheidung (4) gebaut ist.
    // ROT DURCH: das Praedikat urteilt wieder ueber den Code.
    const endet = NOW + TEST_MODE_DURATION_SECONDS;
    expect(
      testModeStateFrom(
        {
          target: "pinterest",
          test_event_code: null,
          test_mode_expires_at: new Date(endet * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "laeuft", endetAt: endet });
  });

  it("abgelaufene Frist ohne Code -> 'abgelaufen', nicht 'aus'", () => {
    // DIE GEGENKONTROLLE IM SELBEN BLOCK: Ohne sie waere "laeuft" oben auch dann
    // erklaerbar, wenn die Funktion fuer dieses Ziel gar nicht mehr zwischen den drei
    // Lagen unterschiede.
    const endete = NOW - 60;
    expect(
      testModeStateFrom(
        {
          target: "pinterest",
          test_event_code: null,
          test_mode_expires_at: new Date(endete * 1000).toISOString(),
        },
        NOW,
      ),
    ).toEqual({ kind: "abgelaufen", endeteAt: endete });
  });
});

describe("TM12 — die zwei Ableitungen fuer die Oberflaeche", () => {
  const LAEUFT: ListTestModeStatesResult = {
    ok: true,
    states: { meta: { kind: "laeuft", endetAt: NOW + 60 } },
  };

  it("testModeStateFor: null bei nicht geladen, bei gescheitert UND bei fehlendem Ziel", () => {
    // DREI URSACHEN, EINE ANZEIGE — dieselbe Figur wie bei credentialStateFor. Der
    // dritte Fall ist der wichtigste: er traegt die Sichtbarkeit des Schalters.
    expect(testModeStateFor(null, "meta")).toBeNull();
    expect(testModeStateFor({ ok: false, reason: "read_failed" }, "meta")).toBeNull();
    expect(testModeStateFor(LAEUFT, "tiktok")).toBeNull();
    expect(testModeStateFor(LAEUFT, "meta")).toEqual({
      kind: "laeuft",
      endetAt: NOW + 60,
    });
  });

  it("withTestModeState UEBERNIMMT den Server-Zustand, statt ihn zu raten", () => {
    const danach = withTestModeState(LAEUFT, "meta", { kind: "aus" });
    expect(danach).toEqual({ ok: true, states: { meta: { kind: "aus" } } });
  });

  it("ein {ok:false} bleibt {ok:false} — wer nichts weiss, weiss auch nach einer Geste nichts", () => {
    const gescheitert: ListTestModeStatesResult = { ok: false, reason: "not_found" };
    expect(withTestModeState(gescheitert, "meta", { kind: "aus" })).toBe(gescheitert);
    expect(withTestModeState(null, "meta", { kind: "aus" })).toBeNull();
  });
});

describe("TM13 — die Menge der Ziele mit Testmodus", () => {
  // NACHGEZOGEN MIT SCHEIBE 11.3e, NICHT ENTFERNT — UND DAS IST DER PUNKT DIESES
  // WAECHTERS: Er ist der ORT, an dem eine Erweiterung der Menge SICHTBAR wird. Wer
  // ihn bei einer beabsichtigten Aenderung entfernt statt ihn nachzuziehen, hat ab
  // dann keinen mehr. Sein Rot war der gewuenschte Ausgang der Scheibe.
  //
  // WAS SICH SEITHER AN DER BEGRUENDUNG GEAENDERT HAT (der Absatz im Lauf unten stand
  // bis 11.3e woertlich so da): pinterests Traeger war "NIE GEMESSEN". Er ist am
  // 2026-09-10 LIVE gemessen — `test=true` wirkt (docs/ziel-befunde.md, Abschnitt
  // "Pinterest (Conversions API)", Teil (u)). Damit ist SEIN Ausschlussgrund
  // weggefallen; die zwei uebrigen bestehen unveraendert.
  it("GENAU meta, tiktok und pinterest", () => {
    // ROT DURCH: ein VIERTES Ziel in der Liste — oder ein entferntes drittes. Die
    // zwei verbliebenen Ausschluesse haben je einen EIGENEN Grund (google: der
    // einzige Traeger schneidet die Diagnostik ab; linkedin: gar kein Testmodus) —
    // sie stehen im Zuschnitt und nicht hier.
    //
    // DIE REIHENFOLGE IST TEIL DER ZUSICHERUNG UND NICHT BEIFANG: pinterest steht
    // HINTEN, angefuegt statt einsortiert. Diese Liste ist keine Anzeige-Reihenfolge
    // — die faellt in den Bannertext und folgt dort TRACKING_TARGETS.
    expect([...TARGETS_WITH_TEST_MODE]).toEqual(["meta", "tiktok", "pinterest"]);
  });

  it("die Frist ist eine STUNDE", () => {
    // ROT DURCH: eine stillschweigend geaenderte Dauer. Die Zahl steht an EINER
    // Stelle, damit ihre Aenderung ein sichtbarer Diff ist.
    expect(TEST_MODE_DURATION_SECONDS).toBe(3600);
  });
});
