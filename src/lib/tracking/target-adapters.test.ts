import { describe, it, expect } from "vitest";
import { TRACKING_TARGETS } from "@/lib/settings";
import {
  TARGETS_WITH_ADAPTER,
  hasAdapter,
} from "@/lib/tracking/target-adapters";

/**
 * DER RIEGEL DER SCHEIBE 11.1a — und dies ist der EINZIGE Test, der ihn haelt.
 *
 * WELCHE FEHLERKLASSE ER ALLEIN FAENGT: Jemand traegt 'linkedin' in
 * TARGETS_WITH_ADAPTER ein, WEIL es in TRACKING_TARGETS steht und die Liste
 * "unvollstaendig aussieht". Damit waere das Ziel im Verteiler des Ingest-Pfades
 * (FORWARDER_BY_TARGET in capi/ingest.ts) — die tragende Invariante dieser Scheibe
 * ("ein Projekt MIT hinterlegtem Zugangsdatum verhaelt sich am Ingest EXAKT wie eines
 * ohne") waere gebrochen, und ein halbfertiges Ziel bekaeme Besucher-Traffic.
 * DER COMPILER FAENGT NUR DIE HAELFTE: Ein Eintrag OHNE passenden Forwarder bricht den
 * Build (der Record ueber TargetWithAdapter waere unvollstaendig). Ein Eintrag MIT
 * einem hastig danebengesetzten Forwarder kompiliert anstandslos — genau dagegen steht
 * dieser Test, und gegen nichts sonst.
 *
 * ER IST IN 11.1b BEWUSST ZU ENTFERNEN, nicht anzupassen: Sobald der LinkedIn-Adapter
 * gebaut ist, GEHOERT das Ziel in die Liste, und dieser Test wird dann korrekterweise
 * rot. Wer ihn dort "repariert", statt ihn zu loeschen, dreht die Aussage um.
 * OHNE DIESEN ABSATZ loescht ihn dort jemand als vermeintlich redundant und nimmt die
 * einzige Abdeckung mit — die Projektregel fuehrt genau diese Fehlerklasse.
 */
describe("TARGETS_WITH_ADAPTER: der Riegel fuer Ziele ohne Empfaenger", () => {
  it("'linkedin' steht NICHT in der Adapter-Liste (Riegel der Scheibe 11.1a)", () => {
    expect(TARGETS_WITH_ADAPTER).not.toContain("linkedin");
    expect(hasAdapter("linkedin")).toBe(false);
  });

  it("'linkedin' IST ein bekanntes Ziel — sonst prueft der Riegel nichts", () => {
    // POSITIVKONTROLLE zur Zusicherung darueber: "steht nicht in der Adapter-Liste"
    // bliebe trivial wahr, wenn es das Ziel gar nicht gaebe. Erst zusammen sagen die
    // beiden etwas — bekannt JA, Empfaenger NEIN.
    expect(TRACKING_TARGETS).toContain("linkedin");
  });

  it("die Adapter-Liste ist eine TEILMENGE der bekannten Ziele", () => {
    // Kein Wert in der Adapter-Liste, den TRACKING_TARGETS nicht kennt. Der Compiler
    // sichert das ueber `satisfies` bereits; diese Zusicherung faengt den Fall, dass
    // jemand die Typ-Angabe entfernt, um "schnell etwas auszuprobieren".
    for (const target of TARGETS_WITH_ADAPTER) {
      expect(TRACKING_TARGETS).toContain(target);
    }
  });
});
