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
  // UMGESCHRIEBEN IN SCHEIBE 2 DER PHASE 11.2, NICHT REPARIERT — und der Satz gehoert
  // hierher, weil ein umgeschriebener Test sonst wie ein nachgebesserter aussieht:
  // DIESER LAUF HIELT DIE ZUSICHERUNG "google hat KEIN oeffentliches Feld", ALSO DIE
  // DATEN-SEITE DES ERSTEN TORES. Genau diese Zusicherung hebt Scheibe 2 ABSICHTLICH
  // auf — sie gibt den Konto-Kennungen ihre Eingabe. Der Lauf misst deshalb ab jetzt
  // die NEUE Gestalt der Karte, und was er darueber hinaus festhaelt, ist der
  // UNTERSCHIED zwischen den beiden Feldgruppen: die eine kommt, die andere bleibt weg.
  it("fuehrt EIN oeffentliches und KEIN Geheimnis-Feld", () => {
    // DIE OEFFENTLICHE GRUPPE IST VOLLSTAENDIG — der Typ erlaubt seit Scheibe 3 eine
    // halb gefuellte Gruppe (Label ohne Platzhalter), also braucht sie einen Waechter.
    expect(TARGET_CARDS.google.publicLabel).toBeTruthy();
    expect(TARGET_CARDS.google.publicHint).toBeTruthy();
    expect(TARGET_CARDS.google.publicPlaceholder).toBeTruthy();

    // DIE GEHEIMNIS-GRUPPE FEHLT WEITERHIN GANZ, und DAS ist die Zusicherung, die
    // Scheibe 2 NICHT anfasst: Das Zugangsdatum entsteht ueber den Autorisierungs-Fluss
    // und liegt chiffriert; setCapiToken weist ein Ziel ohne Geheimnis-Feld ab, VOR
    // jedem DB-Zugriff, und leitet sein Urteil aus GENAU DIESER Tabelle ab.
    expect(TARGET_CARDS.google.secretLabel).toBeUndefined();
    expect(TARGET_CARDS.google.secretPlaceholderNew).toBeUndefined();
    expect(TARGET_CARDS.google.secretPlaceholderReplace).toBeUndefined();
  });

  it("der Platzhalter zeigt die Form MIT Trennzeichen und beruehrt Metas Muster nicht", () => {
    // ZWEI ZUSICHERUNGEN IN EINEM LAUF, und sie gehoeren zusammen:
    // (1) DER PLATZHALTER TRAEGT BINDESTRICHE — ABSICHT, kein Widerspruch zur
    //     Umformung: Der Betreiber soll wiedererkennen, was er im Anbieter-Konto sieht;
    //     die Bindestriche fallen beim Eintragen (NORMALIZE_PIXEL_ID, lib/settings.ts).
    //     WIRD ROT, WENN jemand den Platzhalter "aufraeumt" und damit die Wiedererkennung
    //     nimmt, die der einzige Grund fuer seine Form ist.
    // (2) ER ENTHAELT METAS BEISPIELZIFFERN NICHT: CodeImporter.test.tsx waehlt Metas
    //     Feld per Teilstring-Muster ueber dessen Platzhalter. Ein enthaltendes Muster
    //     machte jene Abfrage mehrdeutig — und zwar dort, nicht hier.
    expect(TARGET_CARDS.google.publicPlaceholder).toContain("-");
    expect(TARGET_CARDS.google.publicPlaceholder).not.toContain(
      TARGET_CARDS.meta.publicPlaceholder!.replace(/^z\.B\. /, ""),
    );
  });
});
