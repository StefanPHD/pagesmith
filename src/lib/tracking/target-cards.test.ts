import { describe, expect, it } from "vitest";

import { TRACKING_TARGETS, type TrackingTarget } from "@/lib/settings";
import { TARGET_CARDS } from "@/lib/tracking/target-cards";

// ===========================================================================
// DER WAECHTER UEBER DIE GEHEIMNIS-FELDER (Scheibe 3, Auflage (b) des Zuschnitts).
//
// WARUM ES IHN GIBT: Bis zur Scheibe 3 waren secretLabel und die beiden Platzhalter
// PFLICHTFELDER von TargetCardConfig — der Compiler erzwang sie fuer JEDES Ziel. Mit dem
// fuenften Ziel sind sie OPTIONAL geworden (ein Ziel, dessen Zugangsdatum ueber einen
// Autorisierungs-Fluss entsteht, darf kein Einfuege-Feld anbieten). Damit kann ein
// spaeterer Eingriff sie bei meta, pinterest, tiktok oder linkedin STILL weglassen: Die
// Karte verlore ihr Eingabefeld, und NICHTS waere rot.
// WAS EIN PFLICHTFELD ERZWANG, ERZWINGT AB JETZT DIESER TEST.
//
// DIE BAUFORM IST DIE VON LEGACY_CONSENT_ROLE, und das ist kein Zufall, sondern der
// Praezedenzfall: dort haelt ebenfalls kein Typ, sondern ein Test die tragende
// Eigenschaft — "genau EIN Traeger" plus ein zweiter Lauf, der ihn namentlich festnagelt.
//
// SEINE GRENZE TRAEGT ER AN SICH SELBST: Es ist eine MENGEN-Zusicherung. Beim ersten
// WEITEREN Ziel ohne Geheimnis-Feld wird er ABSICHTLICH rot, und dann ist neu zu
// entscheiden — nicht stillschweigend zu erweitern. Genau das ist der Zweck: Ein Ziel,
// das kein Zugangsdatum entgegennimmt, ist eine Entscheidung und kein Detail.
// ===========================================================================

/** Die Ziele, deren Karte KEIN Geheimnis-Feld fuehrt. Abgeleitet, nicht getippt. */
function ohneGeheimnisFeld(): TrackingTarget[] {
  return TRACKING_TARGETS.filter(
    (t) => TARGET_CARDS[t].secretLabel === undefined,
  );
}

describe("TARGET_CARDS: die Menge der Ziele OHNE Geheimnis-Feld", () => {
  it("ist genau {google}", () => {
    // ROT, WENN eines der vier bestehenden Ziele sein secretLabel verliert (die Menge
    // waechst) ODER wenn google eines bekommt (sie schrumpft). Beide Richtungen sind
    // Fehler, und beide sind heute vom Compiler nicht mehr gedeckt.
    expect(ohneGeheimnisFeld()).toEqual(["google"]);
  });

  it("die VIER bestehenden Ziele tragen alle drei Geheimnis-Beschriftungen", () => {
    // DIE SCHAERFERE HAELFTE: Der Lauf darueber faellt schon, wenn secretLabel fehlt —
    // er saehe aber NICHT, wenn nur einer der beiden PLATZHALTER verschwaende. Der Typ
    // erlaubt seit der Scheibe 3 eine halb gefuellte Gruppe (das steht an ihm
    // ausdruecklich), also braucht sie einen eigenen Waechter.
    for (const target of TRACKING_TARGETS) {
      if (TARGET_CARDS[target].secretLabel === undefined) continue;
      expect(TARGET_CARDS[target].secretPlaceholderNew).toBeTruthy();
      expect(TARGET_CARDS[target].secretPlaceholderReplace).toBeTruthy();
    }
    // POSITIVKONTROLLE, ohne die die Schleife bei lauter uebersprungenen Zielen trivial
    // gruen waere: Es muss ueberhaupt Ziele MIT Geheimnis-Feld geben.
    expect(
      TRACKING_TARGETS.filter((t) => TARGET_CARDS[t].secretLabel !== undefined)
        .length,
    ).toBeGreaterThan(0);
  });

  it("jedes bekannte Ziel hat einen nicht-leeren Namen", () => {
    // Der Name ist das einzige Feld, das der Typ weiterhin erzwingt — geprueft wird
    // hier, dass er auch GEFUELLT ist. Ein leerer Name liesse die Karte namenlos, und
    // die Tests, die Karten ueber ihren Namen auswaehlen, wuerden mehrdeutig.
    for (const target of TRACKING_TARGETS) {
      expect(TARGET_CARDS[target].name).toBeTruthy();
    }
    expect(TRACKING_TARGETS.length).toBeGreaterThan(0);
  });
});

describe("TARGET_CARDS: die Google-Karte", () => {
  it("fuehrt WEDER ein oeffentliches NOCH ein Geheimnis-Feld", () => {
    // DAS IST DIE DATEN-SEITE DES ERSTEN TORES (withPixel): Ohne oeffentliches Feld gibt
    // es keinen Weg, settings.pixels.google ueber die Oberflaeche zu setzen, und ohne
    // Kennung nimmt der Aufloesungs-Pfad das Ziel nicht auf.
    // DIE GRENZE GEHOERT DAZU UND STEHT AUSDRUECKLICH HIER: Das ist eine
    // UI-ABWESENHEIT und kein Riegel — saveProject schreibt den Einstellungs-Blob
    // unvalidiert. Die tragende Schicht ist das ZWEITE Tor, nicht dieses.
    expect(TARGET_CARDS.google.publicLabel).toBeUndefined();
    expect(TARGET_CARDS.google.publicHint).toBeUndefined();
    expect(TARGET_CARDS.google.publicPlaceholder).toBeUndefined();
    expect(TARGET_CARDS.google.secretLabel).toBeUndefined();
    expect(TARGET_CARDS.google.secretPlaceholderNew).toBeUndefined();
    expect(TARGET_CARDS.google.secretPlaceholderReplace).toBeUndefined();
  });
});
