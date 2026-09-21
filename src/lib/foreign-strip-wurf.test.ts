// EIN WURF BEIM ENTFERNEN VERNICHTET KEINEN CODE (Phase 11.11, Scheibe 11.11c).
//
// WARUM EINE EIGENE DATEI: Der Nachweis braucht eine Knotenauswahl, die WIRFT — und
// ein `vi.mock` gilt der ganzen Datei. In foreign-strip.test.ts stuende der Mock dann
// ueber allen zwanzig anderen Laeufen, und jeder von ihnen praefte ab da eine
// geworfene Ausnahme statt des Entfernens. Dieselbe Bauform und derselbe Grund wie bei
// detect.foreign.test.ts.
//
// WAS DIESE DATEI FESTNAGELT, in einem Satz: stripForeignGroup gibt nach einem Wurf
// die EINGABE unveraendert zurueck. Eine code-mutierende Funktion darf User-Code NIE
// vernichten — und ein halb abgeraeumter Editor-Text auf einen Klick, der "entfernen"
// heisst, waere genau das.

import { describe, expect, it, vi } from "vitest";

// DIE KNOTENAUSWAHL WIRFT — dieselbe Funktion, die die ANZEIGE benutzt
// (ENTSCHEIDUNG P11.11-35, Satz (c)). Ein realistischerer Wurf-Ort als ein
// kuenstlicher: sie ist die einzige fremde Abhaengigkeit des Entfernens.
//
// `foreignGroupKey` bleibt ECHT: stripForeignGroup importiert beide aus demselben
// Modul, und eine Attrappe dafuer machte den Lauf zu einer Aussage ueber die Attrappe.
vi.mock("./foreign-scan", async (importOriginal) => {
  const echt = await importOriginal<typeof import("./foreign-scan")>();
  return {
    ...echt,
    collectForeignHits: () => {
      throw new Error("Knotenauswahl kaputt");
    },
  };
});

import { stripForeignGroup } from "./foreign-strip";

const HTML =
  '<!DOCTYPE html><html lang="de"><head><title>t</title></head><body>' +
  '<button>Kaufen</button>' +
  '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
  "</body></html>";

describe("stripForeignGroup: ein Wurf vernichtet keinen Code", () => {
  // W-A. DER EIGENTLICHE LAUF: Die Eingabe kommt ZEICHENGLEICH zurueck — nicht
  // normalisiert, nicht halb abgeraeumt, nicht leer.
  //
  // DIE POSITIVKONTROLLE IST PFLICHT UND STEHT IM SELBEN LAUF: Ohne den Nachweis, dass
  // die Eingabe den Fund UEBERHAUPT traegt, waere "der Text ist unveraendert" auch an
  // einem Text gruen, an dem es nichts zu tun gaebe (Dauerregel EINE
  // ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, Fall (2)).
  it("W-A: nach einem Wurf kommt die Eingabe zeichengleich zurueck", () => {
    expect(HTML).toContain("connect.facebook.net"); // POSITIVKONTROLLE
    const out = stripForeignGroup(HTML, "Meta\u0000|0|knoten");
    expect(out.html).toBe(HTML);
  });

  // W-B. UND `rest` IST HIER 0 — WAS NICHT "SAUBER" HEISST, SONDERN "NICHT ZAEHLBAR".
  //
  // DER SATZ IST DER GRUND FUER DIESEN LAUF, und er korrigiert eine naheliegende
  // Erwartung: `rest` wird auf dem RUECKGABE-Text gezaehlt, und zaehlen tut dieselbe
  // Knotenauswahl, die gerade geworfen hat. WIRFT SIE, GIBT ES KEINE ZAHL. Wer hier
  // eine 1 erwartet, erwartet, dass eine kaputte Funktion sich selbst vermisst.
  //
  // FUER DIE OBERFLAECHE IST DAS FOLGENLOS: Die Rest-Meldung haengt NICHT an `rest`,
  // sondern daran, ob der Fund im AKTUELLEN Text noch steht (ENTSCHEIDUNG P11.11-24).
  // Nach diesem Ausgang steht er — der Text ist ja unveraendert.
  it("W-B: rest ist 0, und das heisst hier NICHT sauber", () => {
    expect(stripForeignGroup(HTML, "Meta\u0000|0|knoten").rest).toBe(0);
  });
});
