// DIE NUTZLAST FUER events:ingest BAUEN (Phase 11.2, Scheibe 11.2a).
//
// WAS DIESE DATEI IST: ZWEI reine Funktionen, die Objekte bauen. Kein Netz, kein
// Zustand, kein Zugangsdatum, kein Aufruf. Sie SENDET nichts — der Transport ist eine
// eigene, spaetere Scheibe.
//
// SIE HAT IM PRODUKTIVCODE HEUTE KEINEN AUFRUFER — derselbe Grund wie bei
// google-click-ids.ts, und dieselbe Invariante: Wer einen ergaenzt, baut nicht mehr
// diese Scheibe.
//
// ---------------------------------------------------------------------------
// DER KOPFSATZ ZUR ABLAGE — WOERTLICH aus docs/aktiver-stand.md, Abschnitt
// "## Scheibe 11.2a", Unterabschnitt "Die Ablage-Entscheidung". Er steht ZEICHENGLEICH
// auch in google-click-ids.ts; wer ihn hier aendert, aendert eine Entscheidung:
//
//   Beide Dateien sind REIN — KEIN import "server-only". Grund: der spätere
//   google-forward.ts ist server-only und muss sie importieren; die Richtung
//   server-only -> rein gilt und nicht umgekehrt. Sie sind die ersten reinen Dateien in
//   src/lib/capi/. Das ist Absicht und kein zu heilender Ausreisser. Ohne diesen
//   Kopfsatz fügt die nächste Aufräumrunde server-only hinzu und sperrt sie zu.
//
// ---------------------------------------------------------------------------
// SAEMTLICHE FELDNAMEN, VERSCHACHTELUNGEN UND FORMATANGABEN IN DIESER DATEI SIND
// GELESEN UND NIE GEMESSEN. Es ist KEIN Aufruf gegen eine Google-Schnittstelle
// gefahren worden. Quelle jeder einzelnen Angabe: docs/ziel-befunde.md, Abschnitt
// "Google (Google Ads Conversions · GA4)", Teile (l)/D1 bis D6, (m)/E1 bis E4 und
// (w)/D1 bis F3 — je Feld unten benannt.
//
// WAS DAS HEISST UND WARUM TROTZDEM GEBAUT WIRD, steht im Zuschnitt unter
// "### Die Grenze dieses Zuschnitts — warum trotz ungemessener Wire-Form gebaut wird".
// Kurz, und nur als Zeiger: Vier Widersprueche der Anbieter-Doku sind unaufgeloest,
// und EINER davon (camelCase gegen snake_case, Teil (u)/Frage 4) betrifft JEDEN
// Schluessel unten. Getragen wird die Scheibe von der STRUKTUR — zwei Ebenen, Menge
// statt Einzelkennung, Verwerfung statt halber Nutzlast —, nicht von den Namen.
// WER DIESE NAMEN SPAETER ZITIERT, ZITIERT EINE DOKU-LESUNG UND KEINE MESSUNG.
// Der Schluesselnamen-Test in google-payload.test.ts ist genau dafuer da: Er macht
// eine spaetere Korrektur zu einem SICHTBAREN Diff statt zu einer stillen Aenderung.
//
// ---------------------------------------------------------------------------
// WARUM ZWEI EBENEN — DER GRUND IST DIE FORM DER SCHNITTSTELLE UND AUSDRUECKLICH
// KEINE GEPLANTE STAPELVERARBEITUNG: Die Anfrage traegt ZWEI PARALLELE ARRAYS AUF DER
// WURZELEBENE (GELESEN, Teil (l)/D1) — "DIE EMPFAENGER STEHEN NEBEN DEN EREIGNISSEN,
// NICHT IN IHNEN". Ein Event kennt seinen Empfaenger nicht. Wer beides in einer
// Funktion baut, verschmilzt zwei Dinge, die der Anbieter getrennt haelt.

import type { GoogleClickIds } from "./google-click-ids";

/**
 * Die Eingabe fuer EIN Event.
 *
 * DIE IDENTITAETSMERKMALE KOMMEN ALS MENGE HEREIN, NICHT ALS EINZELNE KENNUNG. Kommt
 * spaeter ein weiteres Merkmal hinzu, ist das ein FELD an dieser Menge und kein Umbau
 * der Signatur.
 *
 * `eventSource` IST EIN PARAMETER OHNE VORGABEWERT, und das ist bindende Entscheidung
 * (2) des Zuschnitts: Beim Offline Conversion Import ist das Feld PFLICHT (GELESEN,
 * Teil (l)/D5), aber WELCHER Wert des EventSource-Enums gilt, nennt keine gelesene
 * Stelle — Teil (w)/F3 fuehrt fuenf moegliche (WEB, APP, IN_STORE, PHONE, MESSAGE),
 * ohne einen davon dieser Gestalt zuzuordnen. Eine Wahl IN dieser Funktion waere eine
 * unbelegte Festlegung an der schlechtestmoeglichen Stelle: unsichtbar fuer jeden
 * Aufrufer.
 *
 * `transactionId` IST OPTIONAL UND WIRD PER VORGABE NICHT BEFUELLT. Beim gewaehlten
 * Weg ist es optional (GELESEN, Teil (l)/D5); bei der NICHT gewaehlten Gestalt waere
 * es Pflicht. Die beiden tauschen ihren Rang — wer den einen Zuschnitt aus dem anderen
 * ableitet, erbt genau die falsche Haelfte.
 */
export type GoogleEventInput = {
  adIdentifiers: GoogleClickIds;
  eventTimestamp: Date;
  eventSource: string;
  conversionValue?: number;
  currency?: string;
  transactionId?: string;
};

/**
 * EIN gebautes Event, so wie es im Array `events` der Anfrage steht.
 *
 * Feldnamen GELESEN an Teil (l)/D2 und Teil (w)/D2. Optionale Felder sind NUR gesetzt,
 * wenn der Aufrufer sie geliefert hat — kein Schluessel traegt `undefined`.
 */
export type GoogleEvent = {
  /**
   * RFC-3339, Z-normalisiert, drei Nachkommastellen. KEINE Epochen-Zahl.
   * GELESEN, Teil (w)/D3: "generated output will always be Z-normalized and use 0, 3,
   * 6 or 9 fractional digits". Die Einheit weicht von ALLEN bisher gebauten Zielen ab
   * (Teil (l)/D3) — genau dort liegt der Kopierfehler, den der Zeitstempel-Test faengt.
   */
  eventTimestamp: string;
  eventSource: string;
  adIdentifiers: GoogleClickIds;
  conversionValue?: number;
  currency?: string;
  transactionId?: string;
};

/**
 * Der Grund, aus dem KEIN Event gebaut werden konnte.
 *
 * EIN UNION-TYP MIT EINEM MITGLIED, UND ZWAR VON ANFANG AN: Ein zweiter Grund ist
 * damit spaeter ein MITGLIED und kein Umbau der Signatur. Ein blosser `string` waere
 * das Gegenteil — er liesse jeden Tippfehler durch.
 */
export type GoogleBuildRejection = "no_click_id";

/**
 * ERGEBNIS-UNION STATT WURF. Dieselbe Auflage wie in google-click-ids.ts und aus
 * demselben Grund: Der spaetere Aufrufer ist ein Adapter am Ingest-Pfad, und der darf
 * nicht werfen (204-Containment).
 *
 * WAS DIESE UNION NICHT LOEST, damit niemand mehr hineinliest, als drinsteht: Sie gibt
 * der INNEREN Ebene einen Rueckkanal. Der Typ `Forwarder` (capi/ingest.ts) gibt
 * weiterhin `Promise<void>`, und das Ergebnis von `Promise.allSettled` am Aufrufort
 * wird weiterhin nicht ausgewertet. Ein Adapter kann eine Verwerfung also ENTGEGEN-
 * NEHMEN und trotzdem nicht MELDEN — s. docs/aktiver-stand.md, Vorrat, Eintrag 3.
 */
export type GoogleBuildResult =
  | { ok: true; event: GoogleEvent }
  | { ok: false; reason: GoogleBuildRejection };

/**
 * Der Empfaenger im Rumpf der Anfrage.
 *
 * GELESEN, Teil (k)/C1 und C2: Die Ziel-Kennung heisst `productDestinationId` und
 * reist IM RUMPF, nicht im Pfad und nicht in einer Kopfzeile — Kopfzeilen werden beim
 * Einliefern ausdruecklich IGNORIERT (Teil (j)/B4). Die Google-Ads-Kundennummer reist
 * getrennt als `operatingAccount.accountId` mit `accountType` "GOOGLE_ADS".
 */
export type GoogleDestination = {
  operatingAccount: { accountType: "GOOGLE_ADS"; accountId: string };
  productDestinationId: string;
};

/**
 * Die umgebende Anfrage.
 *
 * GELESEN, Teil (w)/D1: `destinations[]` und `events[]` sind beide REQUIRED.
 *
 * VIER FELDER DER HUELLE FEHLEN HIER BEWUSST, je mit Grund:
 * · `encoding` und `encryptionInfo` — beide gelten laut Teil (w)/D1 nur fuer
 *   UserData-Uploads ("For non UserData uploads, this field is ignored"), und diese
 *   Scheibe baut KEIN userData.
 * · `consent` — das Einwilligungs-URTEIL wird im Browser gefaellt; tracking/consent-wire.ts
 *   haelt fest "HIER STEHT KEIN ZWEITES URTEIL", ein Google-eigenes Consent-Feld waere
 *   ein DRITTES. Offen, s. docs/aktiver-stand.md, Vorrat, Eintrag 5.
 * · `validateOnly` — ein Instrument der MESSUNG, nicht der Nutzlast.
 *
 * VIER PRUEFUNGEN FEHLEN EBENFALLS BEWUSST, und der Grund ist jedes Mal derselbe: Es
 * gibt keinen belegten Wert, gegen den geprueft werden koennte.
 * · KEINE Hoechstzahl an Ereignissen je Anfrage — die Doku widerspricht sich um den
 *   Faktor fuenf (Teil (y), Widerspruch 3: zweimal 2.000, einmal 10.000).
 * · KEINE Pruefung auf doppelte `transactionId` — Verhalten widerspruechlich
 *   (Teil (y), Widerspruch 4: einmal Zusammenfuehren, einmal Verwerfen).
 * · KEIN Wertebereich fuer `conversionValue` — steht auf keiner gelesenen Seite
 *   (Teil (l)/D6, bestaetigt in Teil (w)/D6).
 * · KEINE Pruefung des Zeitfensters — dass eines existiert, ist dreifach belegt, DIE
 *   LAENGE steht auf keiner der 33 Seiten (Teil (w)/D3).
 */
export type IngestEventsRequest = {
  destinations: GoogleDestination[];
  events: GoogleEvent[];
};

/**
 * Uebernimmt die vorhandenen Klick-Kennungen in ein frisches Objekt.
 *
 * ANWESENHEIT, NICHT FORM — dieselbe Regel wie in der Extraktion und mit derselben
 * Grenze: Verworfen wird AUSSCHLIESSLICH die exakt leere Zeichenkette, es wird NICHT
 * getrimmt und NICHTS an der Gestalt des Werts geprueft.
 * WARUM ES DIESEN SCHRITT UEBERHAUPT BRAUCHT: `buildGoogleEvent` muss entscheiden, ob
 * EINE Kennung da ist. Ein durchgereichtes Objekt koennte `{ gclid: "" }` tragen —
 * dann stuende ein leerer Wert in der Nutzlast, und die Zaehlung darueber waere falsch.
 */
function pickClickIds(source: GoogleClickIds): GoogleClickIds {
  const picked: GoogleClickIds = {};
  if (source.gclid) picked.gclid = source.gclid;
  if (source.gbraid) picked.gbraid = source.gbraid;
  if (source.wbraid) picked.wbraid = source.wbraid;
  return picked;
}

/**
 * Baut EIN Event — oder verwirft.
 *
 * KEINE NUTZLAST OHNE KLICK-KENNUNG (bindende Entscheidung (3) des Zuschnitts): Traegt
 * die Menge keine einzige Kennung, entsteht KEINE halbe Nutzlast, sondern ein
 * Verwerfungsgrund.
 * DER GRUND, und er ist der teuerste Satz dieser Datei: Der Anbieter faehrt FAST-FAIL
 * — "If a request contains structural errors or if any record fails validation for a
 * required field, the entire request fails, and the API does not process any of the
 * data in that request" (GELESEN, Teil (l)/D5). EIN EINZIGER Pflichtfeld-Fehler
 * verwirft den GANZEN Stapel, nicht den einen Datensatz.
 * DIE GRENZE GEHOERT DAZU: Damit ist die STRENGERE von zwei widerspruechlichen
 * Lesarten erfuellt — der Leitfaden verlangt mindestens eine Kennung, die Referenz
 * markiert jedes Identitaetsfeld als Optional. DER WIDERSPRUCH IST UMGANGEN, NICHT
 * AUFGELOEST; er steht unveraendert in docs/ziel-befunde.md, Teil (y), Widerspruch 1.
 *
 * SIE WIRFT NIE.
 */
export function buildGoogleEvent(input: GoogleEventInput): GoogleBuildResult {
  const adIdentifiers = pickClickIds(input.adIdentifiers);
  if (Object.keys(adIdentifiers).length === 0) {
    return { ok: false, reason: "no_click_id" };
  }

  const event: GoogleEvent = {
    // toISOString liefert genau die verlangte Gestalt: Z-normalisiert, drei
    // Nachkommastellen. KEINE Epochen-Zahl — s. den Kommentar am Feld.
    eventTimestamp: input.eventTimestamp.toISOString(),
    // UNVERAENDERT AUS DER EINGABE, nicht geprueft und nicht gegen das Enum gehalten:
    // welcher Wert gilt, ist nicht belegt (bindende Entscheidung (2)).
    eventSource: input.eventSource,
    adIdentifiers,
  };

  // Optionale Felder NUR bei gelieferten Werten — kein Schluessel mit `undefined`.
  if (input.conversionValue !== undefined) event.conversionValue = input.conversionValue;
  if (input.currency !== undefined) event.currency = input.currency;
  if (input.transactionId !== undefined) event.transactionId = input.transactionId;

  return { ok: true, event };
}

/**
 * Baut die umgebende Anfrage um bereits gebaute Events.
 *
 * `operatingAccountId` UND `productDestinationId` SIND UNDURCHSICHTIGE ZEICHENKETTEN:
 * Sie werden NICHT gelesen, NICHT geprueft, NICHT abgeleitet und NICHT normalisiert.
 * Das deckt sich mit dem Befundstand — Teil (k)/C1 nennt zwar "reine Ziffernfolge,
 * kein Praefix", haelt aber ausdruecklich fest: "EIN ZEICHENVORRAT ODER EINE
 * LAENGENANGABE STEHT AUF KEINER GELESENEN SEITE." Eine Pruefung waere hier dieselbe
 * Falle wie eine Formpruefung an der Klick-Kennung.
 *
 * KEIN `reference` AM DESTINATION UND KEIN `destinationReferences` AM EVENT: Bei genau
 * EINEM Empfaenger unnoetig — "OHNE destinationReferences GEHT EIN EREIGNIS AN ALLE
 * DESTINATIONS DER ANFRAGE — das ist die Vorgabe, kein Fehler" (GELESEN, Teil (k)/C3).
 * Beim ZWEITEN Empfaenger wird es faellig und ist dann erzwungen eindeutig
 * (Teil (v)/C3, DUPLICATE_DESTINATION_REFERENCE).
 *
 * KEIN `eventName`: fuer Google Ads optional, Pflicht nur fuer GA4 (GELESEN,
 * Teil (w)/F1).
 *
 * SIE WIRFT NIE und kann nicht scheitern — sie ist eine Projektion ihrer Argumente.
 */
export function buildIngestEventsRequest(args: {
  operatingAccountId: string;
  productDestinationId: string;
  events: GoogleEvent[];
}): IngestEventsRequest {
  return {
    destinations: [
      {
        operatingAccount: {
          accountType: "GOOGLE_ADS",
          accountId: args.operatingAccountId,
        },
        productDestinationId: args.productDestinationId,
      },
    ],
    events: args.events,
  };
}
