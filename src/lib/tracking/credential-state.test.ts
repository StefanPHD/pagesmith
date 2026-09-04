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
  CREDENTIAL_EXPIRY_WARN_SECONDS,
  credentialStateFor,
  credentialStateFrom,
  resolveConfigured,
  withoutTarget,
  type ListCredentialStatesResult,
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
