import { describe, it, expect } from "vitest";
import { TRACKING_TARGETS } from "@/lib/settings";
// hasAdapter WIRD HIER NICHT MEHR IMPORTIERT: Sein einziger Verwender war der
// geloeschte Riegel (s. den Absatz darunter). Ein stehengebliebener Import waere ein
// Lint-Fehler — und, schlimmer, er liesse die Datei so aussehen, als pruefe sie noch
// etwas ueber die Adapter-Zugehoerigkeit.
import { TARGETS_WITH_ADAPTER } from "@/lib/tracking/target-adapters";

/**
 * DER RIEGEL DER SCHEIBE 11.1a IST MIT 11.1f ENTFERNT WORDEN — NICHT ANGEPASST, und
 * dieser Absatz ist der Beleg dafuer, dass es die angeordnete Loeschung war und kein
 * stilles Wegfallen.
 *
 * WAS HIER STAND: zwei Laeufe, die zusammen zusicherten, dass 'linkedin' ein
 * BEKANNTES Ziel ist und trotzdem NICHT in TARGETS_WITH_ADAPTER steht — der Riegel
 * jener Scheibe, samt seiner Positivkontrolle. Sein eigener Kommentar hat die
 * Loeschung verlangt: "Sobald der LinkedIn-Adapter gebaut ist, GEHOERT das Ziel in die
 * Liste, und dieser Test wird dann korrekterweise rot. Wer ihn dort 'repariert',
 * statt ihn zu loeschen, dreht die Aussage um."
 * SEINE NUMMER WAR UEBERHOLT: Er nannte 11.1b, weil bei seiner Niederschrift die
 * Reihenfolge der Folge-Scheiben noch nicht feststand. Die BEDINGUNG war richtig, nur
 * ihr Zeitpunkt lag anders — eingetreten ist sie hier.
 *
 * WAS AN SEINE STELLE TRITT: der Kreuzvergleich in capi/fan-out.test.ts. Dort hat der
 * linkedin-Lauf mit dieser Scheibe die SEITE gewechselt — aus "erreicht KEINEN
 * Adapter" wurde "erreicht GENAU seinen". Die Fehlerklasse, die der geloeschte Test
 * allein fing (ein Listeneintrag mit hastig danebengesetztem Forwarder), faengt jetzt
 * genau jener Lauf: Er faehrt das Ziel durch den Handler und sieht, WELCHER Spion
 * feuert.
 *
 * DER DRITTE LAUF DIESER DATEI BLEIBT, und er ist kein Rest: Er prueft eine ANDERE
 * Achse — dass die Adapter-Liste eine Teilmenge der bekannten Ziele ist. Diese
 * Zusicherung gilt unabhaengig davon, welche Ziele heute einen Empfaenger haben.
 */
describe("TARGETS_WITH_ADAPTER: die Teilmengen-Eigenschaft", () => {
  it("die Adapter-Liste ist eine TEILMENGE der bekannten Ziele", () => {
    // Kein Wert in der Adapter-Liste, den TRACKING_TARGETS nicht kennt. Der Compiler
    // sichert das ueber `satisfies` bereits; diese Zusicherung faengt den Fall, dass
    // jemand die Typ-Angabe entfernt, um "schnell etwas auszuprobieren".
    for (const target of TARGETS_WITH_ADAPTER) {
      expect(TRACKING_TARGETS).toContain(target);
    }
  });
});
