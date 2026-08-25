import { describe, expect, it } from "vitest";

import {
  buildGoogleEvent,
  buildIngestEventsRequest,
  type GoogleEvent,
} from "./google-payload";

// ===========================================================================
// DER NUTZLAST-BAU FUER events:ingest (Phase 11.2, Scheibe 11.2a).
//
// KEIN vi.mock("server-only") — derselbe Grund wie in google-click-ids.test.ts: Der
// Pruefling ist REIN, und ein Mock behauptete hier das Gegenteil.
//
// DIE GRENZE VOR ALLEN TESTS, und sie ist bei diesem Ziel schaerfer als bei den vier
// gebauten Adaptern: Diese Datei prueft, dass der Bau DAS TUT, WAS DER ZUSCHNITT SAGT.
// Sie prueft NICHT, dass die gebaute Form beim Anbieter durchgeht — saemtliche
// Feldnamen sind GELESEN und NIE GEMESSEN, und ein Widerspruch der Anbieter-Doku
// (camelCase gegen snake_case) betrifft JEDEN Schluessel. Was hier gepinnt wird, ist
// eine DOKU-LESUNG; der Zweck des Pinnens ist, dass eine spaetere Korrektur ein
// SICHTBARER Diff wird und keine stille Aenderung.
//
// DIE ACHSEN SIND VIER:
//  (1) DIE HUELLE — zwei parallele Arrays, der Empfaenger neben den Ereignissen.
//  (2) DIE SCHLUESSELNAMEN UND FORMATE — gepinnt.
//  (3) DIE VERWERFUNG — keine Nutzlast ohne Klick-Kennung.
//  (4) WAS NICHT GEBAUT WIRD — mit eigener Positivkontrolle.
// ===========================================================================

/** Ein fester Zeitpunkt. Ein Test pinnt die daraus erzeugte Zeichenkette exakt. */
const T = new Date(Date.UTC(2026, 7, 25, 9, 14, 7, 0));

/** ERFUNDENE Kennungen — keine echten Werte, am Namen erkennbar. */
const IDS = { gclid: "GCLID-ERFUNDEN-0001" };

function ok(result: ReturnType<typeof buildGoogleEvent>): GoogleEvent {
  if (!result.ok) throw new Error(`erwartet ok, war: ${result.reason}`);
  return result.event;
}

describe("buildIngestEventsRequest: die Huelle", () => {
  it("baut destinations und events auf der WURZELEBENE, nebeneinander", () => {
    // ROT, wenn die Events in den Empfaenger wandern oder ein Wurzelschluessel wie
    // `data` eingefuehrt wird. DIE BAUFORM-AUSSAGE DES ANBIETERS IST GENAU DIESE:
    // die Empfaenger stehen NEBEN den Ereignissen, nicht in ihnen.
    const event = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "WEB" }));
    const request = buildIngestEventsRequest({
      operatingAccountId: "111",
      productDestinationId: "222",
      events: [event],
    });

    expect(Object.keys(request).sort()).toEqual(["destinations", "events"]);
    expect(Array.isArray(request.destinations)).toBe(true);
    expect(Array.isArray(request.events)).toBe(true);
    expect(request.events).toHaveLength(1);
    expect(request.destinations[0].operatingAccount.accountType).toBe("GOOGLE_ADS");
  });

  it("reicht operatingAccountId und productDestinationId UNVERAENDERT durch", () => {
    // ROT DURCH JEDE PRUEFUNG ODER NORMALISIERUNG dieser beiden Werte. Die eingesetzten
    // Werte sind KEINE Ziffernfolgen — genau deshalb: Der Befundstand nennt zwar "reine
    // Ziffernfolge, kein Praefix", haelt aber ausdruecklich fest, dass Zeichenvorrat und
    // Laenge auf keiner gelesenen Seite stehen. Eine Pruefung waere hier dieselbe Falle
    // wie eine Formpruefung an der Klick-Kennung.
    const request = buildIngestEventsRequest({
      operatingAccountId: "konto-ERFUNDEN (!) 7",
      productDestinationId: "ziel-ERFUNDEN (!) 8",
      events: [],
    });

    expect(request.destinations[0].operatingAccount.accountId).toBe("konto-ERFUNDEN (!) 7");
    expect(request.destinations[0].productDestinationId).toBe("ziel-ERFUNDEN (!) 8");
  });
});

describe("buildGoogleEvent: Schluesselnamen und Formate", () => {
  it("pinnt die exakten SCHLUESSELNAMEN des Event-Objekts", () => {
    // ROT DURCH JEDE UMBENENNUNG — insbesondere durch eine Umstellung auf snake_case.
    // Das ist der Zweck dieses Tests: Die Schreibweise stammt aus GELESENER Doku, nicht
    // aus einer Messung, und der Widerspruch dazu ist unaufgeloest. Widerlegt die erste
    // Messung die Namen, MUSS dieser Test fallen — er macht die Korrektur sichtbar.
    // Geprueft wird die MENGE, nicht die Reihenfolge: eine Reihenfolge waere
    // Ueberbestimmung.
    const event = ok(
      buildGoogleEvent({
        adIdentifiers: IDS,
        eventTimestamp: T,
        eventSource: "WEB",
        conversionValue: 42.5,
        currency: "EUR",
        transactionId: "TX-ERFUNDEN-0001",
      }),
    );

    expect(Object.keys(event).sort()).toEqual([
      "adIdentifiers",
      "conversionValue",
      "currency",
      "eventSource",
      "eventTimestamp",
      "transactionId",
    ]);
    expect(Object.keys(event.adIdentifiers).sort()).toEqual(["gclid"]);
  });

  it("pinnt die exakte ZEITSTEMPEL-Zeichenkette (RFC 3339, Z-normalisiert)", () => {
    // ROT DURCH JEDE UMSTELLUNG AUF EINE EPOCHEN-ZAHL und durch jeden Wechsel der
    // Gestalt (Offset statt Z, andere Zahl an Nachkommastellen). DIE EINHEIT WEICHT VON
    // ALLEN BISHER GEBAUTEN ZIELEN AB — dort reist eine Zahl, hier eine Zeichenkette.
    // Genau dort liegt der Kopierfehler, den dieser Test faengt.
    const event = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "WEB" }));

    expect(event.eventTimestamp).toBe("2026-08-25T09:14:07.000Z");
    expect(typeof event.eventTimestamp).toBe("string");
  });

  it("setzt eventSource UNVERAENDERT aus der Eingabe und waehlt nichts selbst", () => {
    // ROT, wenn die Funktion einen Vorgabewert setzt, den Wert gegen das Enum prueft
    // oder ihn normalisiert. WELCHER Wert beim Offline-Import gilt, ist NICHT belegt —
    // eine Wahl in der Funktion waere eine unbelegte Festlegung, unsichtbar fuer jeden
    // Aufrufer. Der eingesetzte Wert ist deshalb bewusst KEIN Enum-Mitglied.
    const gewaehlt = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "IN_STORE" }));
    expect(gewaehlt.eventSource).toBe("IN_STORE");

    const erfunden = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "ERFUNDEN" }));
    expect(erfunden.eventSource).toBe("ERFUNDEN");
  });

  it("nimmt alle drei Klick-Kennungen gleichzeitig in adIdentifiers auf", () => {
    // ROT, wenn der Bau nur eine Kennung uebernimmt oder eine Rangfolge einfuehrt.
    // Die Menge kommt als MENGE herein und geht als MENGE hinaus.
    const event = ok(
      buildGoogleEvent({
        adIdentifiers: { gclid: "A", gbraid: "B", wbraid: "C" },
        eventTimestamp: T,
        eventSource: "WEB",
      }),
    );

    expect(event.adIdentifiers).toEqual({ gclid: "A", gbraid: "B", wbraid: "C" });
  });
});

describe("buildGoogleEvent: die Verwerfung", () => {
  it("verwirft mit no_click_id, wenn KEINE Kennung gebildet werden kann", () => {
    // ROT, wenn der Verwerfungs-Zweig entfaellt: dann entstuende eine Nutzlast mit
    // leerem adIdentifiers. DER PREIS WAERE NICHT EIN VERLORENES EREIGNIS, SONDERN DER
    // GANZE STAPEL — der Anbieter faehrt FAST-FAIL und verwirft bei einem einzigen
    // Pflichtfeld-Fehler die komplette Anfrage.
    const leer = buildGoogleEvent({ adIdentifiers: {}, eventTimestamp: T, eventSource: "WEB" });
    expect(leer.ok).toBe(false);
    if (!leer.ok) expect(leer.reason).toBe("no_click_id");

    // Eine Kennung mit LEEREM Wert zaehlt als abwesend — dieselbe Regel wie in der
    // Extraktion, und dieselbe Grenze: verworfen wird die exakt leere Zeichenkette,
    // getrimmt wird NICHT.
    const leerwert = buildGoogleEvent({ adIdentifiers: { gclid: "" }, eventTimestamp: T, eventSource: "WEB" });
    expect(leerwert.ok).toBe(false);
  });

  it("gibt bei Verwerfung KEIN halbes Event zurueck", () => {
    // ROT, wenn die Funktion neben dem Grund noch ein Event mitschickt. Ein Aufrufer
    // koennte es sonst lesen, ohne ok zu pruefen — und genau das ist die halbe
    // Nutzlast, die der Zuschnitt ausschliesst.
    const verworfen = buildGoogleEvent({ adIdentifiers: {}, eventTimestamp: T, eventSource: "WEB" });
    expect("event" in verworfen).toBe(false);
  });
});

describe("buildGoogleEvent: was NICHT gebaut wird", () => {
  it("baut kein userData, kein encoding und kein encryptionInfo — MIT Positivkontrolle", () => {
    // EINE ABWESENHEITS-BEHAUPTUNG, UND SIE BRAUCHT IHRE POSITIVKONTROLLE IM SELBEN
    // LAUF: Ohne sie waere ein kaputter Waechter von einem greifenden nicht zu
    // unterscheiden — eine Funktion, die GAR NICHTS baut, bestuende alle drei
    // Abwesenheits-Zusicherungen muehelos.
    // ROT, sobald eines der drei Felder gebaut wird. Alle drei haengen zusammen:
    // encoding und encryptionInfo gelten laut Referenz NUR fuer UserData-Uploads, und
    // userData ist mit der Gestalt-Entscheidung ausgeschlossen (kein Hashen, PII-Zweig).
    const event = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "WEB" }));
    const request = buildIngestEventsRequest({
      operatingAccountId: "111",
      productDestinationId: "222",
      events: [event],
    });

    expect("userData" in event).toBe(false);
    expect("encoding" in request).toBe(false);
    expect("encryptionInfo" in request).toBe(false);

    // POSITIVKONTROLLE: das Identitaetsfeld, das sehr wohl gebaut wird.
    expect(event.adIdentifiers).toEqual(IDS);
    expect(request.events[0]).toBe(event);
  });

  it("befuellt transactionId per Vorgabe NICHT, reicht es aber durch, wenn es kommt", () => {
    // ROT, wenn ein Vorgabewert entsteht (etwa eine erzeugte Kennung) ODER wenn ein
    // uebergebener Wert verschluckt wird. Beim gewaehlten Weg ist das Feld OPTIONAL;
    // bei der NICHT gewaehlten waere es Pflicht — die beiden tauschen ihren Rang, und
    // wer den einen Zuschnitt aus dem anderen ableitet, erbt die falsche Haelfte.
    const ohne = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "WEB" }));
    expect("transactionId" in ohne).toBe(false);

    const mit = ok(
      buildGoogleEvent({
        adIdentifiers: IDS,
        eventTimestamp: T,
        eventSource: "WEB",
        transactionId: "TX-ERFUNDEN-0002",
      }),
    );
    expect(mit.transactionId).toBe("TX-ERFUNDEN-0002");
  });

  it("laesst conversionValue und currency weg, wenn sie nicht uebergeben werden", () => {
    // ROT, wenn die Felder mit `undefined` vorbelegt werden. Ein Schluessel mit
    // undefined ist in JSON etwas anderes als ein fehlender Schluessel, und der
    // Anbieter prueft die Bedeutung der Werte (INVALID_CURRENCY_CODE ist namentlich
    // belegt) — ein leerer Waehrungscode waere eine vermeidbare Ablehnung.
    const event = ok(buildGoogleEvent({ adIdentifiers: IDS, eventTimestamp: T, eventSource: "WEB" }));

    expect("conversionValue" in event).toBe(false);
    expect("currency" in event).toBe(false);

    const mit = ok(
      buildGoogleEvent({
        adIdentifiers: IDS,
        eventTimestamp: T,
        eventSource: "WEB",
        conversionValue: 0,
        currency: "EUR",
      }),
    );
    // DIE FALLE IST DIE ZAHL 0, NICHT `null`: Unter `conversionValue?: number` ist
    // `null` gar nicht typisierbar — 0 dagegen ist ein gewoehnlicher Fall (eine
    // Conversion ohne Umsatz, etwa ein Lead). ROT BEI EINEM TRUTHY-VERGLEICH
    // (`if (input.conversionValue)`) statt eines Vergleichs gegen undefined: der
    // verschluckte die 0 lautlos, und in der Nutzlast fehlte das Feld.
    expect(mit.conversionValue).toBe(0);
    expect(mit.currency).toBe("EUR");
  });
});
