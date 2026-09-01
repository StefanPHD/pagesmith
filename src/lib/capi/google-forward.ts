import "server-only";
import { extractGoogleClickIds } from "@/lib/capi/google-click-ids";
import {
  buildGoogleEvent,
  buildIngestEventsRequest,
} from "@/lib/capi/google-payload";
import { errorName } from "@/lib/errors";

/**
 * DER FUENFTE ADAPTER — GOOGLE ADS, OFFLINE CONVERSION IMPORT (Scheibe 4 der
 * Phase 11.2).
 *
 * ER IST DER ERSTE ADAPTER, DESSEN ZUGANGSDATUM ABLAEUFT. Das merkt er nicht: Uhr 1
 * ist im Resolver geprueft (usableTokenFromRow in capi/token.ts), BEVOR die Zeile
 * ueberhaupt ein ResolvedTarget wird. Ein Adapter BENUTZT ein Geheimnis, er verwaltet
 * es nicht — und er ERNEUERT es nicht (I8): weder refreshAccessToken noch
 * exchangeRefreshToken sind von hier erreichbar, und ein Waechter haelt das fest.
 *
 * DIE BAUFORM IST DIE VON linkedin-forward.ts UND NICHT DIE VON meta-forward.ts, und
 * das ist eine Entscheidung mit Grund: Dort beginnt das try VOR dem Nutzlast-Bau und
 * umschliesst die Riegel; bei Meta beginnt es erst am Netzruf, und die Zusage "davor
 * kann nichts werfen" haengt an einer AUFLAGE im Kommentarkopf. Eine Auflage ist
 * schwaecher als eine Struktur — hier kann keine Zeile des Nutzlast-Baus das
 * 204-Containment des Aufrufers brechen, weil alle innerhalb liegen.
 *
 * TRANSIT-ONLY IST DIE TRAGENDE INVARIANTE DIESER DATEI (Owner, 2026-09-01, strikt).
 * Die Klick-Kennung geht in die Nutzlast und sonst NIRGENDWOHIN: kein Feld in events,
 * keine Logzeile, kein Fehlerpfad, der sie traegt.
 * DAS SCHAERFSTE STUECK DAVON IST EIN VERZICHT: DIESER ADAPTER LIEST DEN
 * ANBIETER-RUMPF NICHT. Kein res.text(), kein res.json(), keine describe*-Funktion.
 * Die drei bestehenden Adapter tun es (describeMetaError, describeErrorBody,
 * describeLinkedinError) und schwaerzen den Fremdtext danach nach FORM. Hier waere der
 * zurueckgespiegelte Wert die KLICK-KENNUNG, und eine Schwaerzung nach Form kennt
 * deren Form nicht — ueber sie ist NICHTS gelesen und NICHTS gemessen (Vorrats-Eintrag
 * 4). Ein Schutz, der die Gestalt seines Gegenstands nicht kennt, ist keiner.
 * WAS DAS KOSTET, UND ES IST BENANNT UND NICHT VERSTECKT: Ein abgelehnter Aufruf ist
 * aus dem Log allein nicht diagnostizierbar — nur der Statuscode steht da. Die
 * Diagnose laeuft ueber einen HANDAUFRUF ausserhalb des Produkts, mit demselben
 * Instrument wie Messung A und B1 (ARCHITEKTEN-ENTSCHEIDUNG E4, 2026-09-01).
 * EIN NEBENEFFEKT, DER DAZUGEHOERT: Der offene Punkt "DER DECKEL ENDET VOR DEM LESEN
 * DES RUMPFES" hat hier keinen Gegenstand — es gibt keinen zweiten Netzvorgang hinter
 * dem Deckel, weil es keinen Rumpf-Lesevorgang gibt.
 *
 * KEINE KLICK-KENNUNG, KEINE CONVERSION — EIGENSCHAFT, KEIN FEHLER. Organischer
 * Traffic, Direktaufrufe und Traffic anderer Kanaele erzeugen bei diesem Ziel NICHTS
 * (docs/roadmap.md, Eintrag 11.2). Wer die Zahlen gegen die eigene Auswertung haelt,
 * findet eine Luecke und sucht einen Defekt, den es nicht gibt.
 */

/**
 * DIE ADRESSE — GEMESSEN, NICHT GELESEN (OWNER, 2026-08-28, Messungen A und B1;
 * docs/ziel-befunde.md, Google-Abschnitt, Teile (bj) und (bn)).
 *
 * SIE IST KEINE DOKU-ANGABE: Gegen genau diese Adresse sind zehn Aufrufe gefahren
 * worden, und ihre Antworten tragen die Feldnamen dieser Nutzlast.
 */
const GOOGLE_INGEST_ENDPOINT =
  "https://datamanager.googleapis.com/v1/events:ingest";

/**
 * Derselbe Deckel wie bei allen vier bestehenden Adaptern.
 *
 * KEIN GEMEINSAMER DECKEL, KEIN Promise.race, KEIN geteiltes Abbruchsignal (I6) — die
 * Auflage steht am Fan-Out in capi/ingest.ts und gilt unveraendert: Alle Empfaenger
 * starten gleichzeitig, jeder traegt SEIN eigenes Geruest, und die Gesamtwartezeit ist
 * das MAXIMUM der Einzeldeckel statt ihrer Summe.
 */
const GOOGLE_FORWARD_TIMEOUT_MS = 3_000;

/**
 * DER WERT VON eventSource — OWNER-ENTSCHEIDUNG (2026-09-01). Keine Messung.
 *
 * WARUM ER HIER STEHT UND NICHT IM BAUER: Die bindende Entscheidung (2) des Zuschnitts
 * verbietet die Wahl IN DER BAU-FUNKTION, weil sie dort "unsichtbar fuer jeden
 * Aufrufer" waere. buildGoogleEvent nimmt den Wert weiterhin als Parameter entgegen
 * und setzt keinen Vorgabewert — DIESE KONSTANTE IST DER AUFRUFER, und sie steht
 * sichtbar an einer Stelle.
 * GRUND FUER DEN WERT: Pagesmith verarbeitet Web-Traffic. Der Vorbau an den
 * Aufrufer-Schnittstellen — ein Feld im Beacon-Rumpf, ein Wert am ResolvedTarget, eine
 * Einstellung in der Oberflaeche — wird damit gespart.
 *
 * DIE GRENZE, UND SIE IST DER TRAGENDE TEIL DIESER KONSTANTE: GEMESSEN IST DER TYP,
 * NICHT DER WERT. eventSource ist ein Enum (google.ads.datamanager.v1.EventSource),
 * und "WEB" ist ein gueltiges Mitglied — GEMESSEN 2026-08-28 (OWNER, Messung B1,
 * docs/ziel-befunde.md, Teil (br)). OB "WEB" FUER EINEN OFFLINE-KLICK-IMPORT DER
 * FACHLICH RICHTIGE WERT IST, IST NICHT GEMESSEN; die Mitgliedermenge des Enums ist
 * nicht einmal erhoben. EIN SYNTAKTISCH GUELTIGES ENUM-MITGLIED KANN FACHLICH FALSCH
 * SEIN, UND DIE SCHNITTSTELLE MELDET DAS NICHT.
 * VERLANGT DER LIVE-TEST EIN ANDERES MITGLIED, WIRD DIESE KONSTANTE ANGEPASST — sie
 * ist genau dafuer benannt und liegt an einer Stelle.
 */
const GOOGLE_EVENT_SOURCE = "WEB";

/**
 * Was dieser Adapter aus der Aufloesung braucht.
 *
 * BEWUSST EIGEN UND NICHT DIE AUFGELOESTE CapiConfig — dieselbe Bauform und derselbe
 * Grund wie beim vierten Ziel: Dieses Ziel braucht BEIDE Kennungsformen (die
 * Kundennummer JE PROJEKT und die Ziel-Kennung JE EREIGNISTYP), und der Name pixelId
 * traegt fuer Google die Kundennummer. Die Umbenennung geschieht am VERBRAUCHER, in
 * FORWARDER_BY_TARGET, ohne den Slot in CapiConfig anzutasten.
 *
 * DIE KUNDENNUMMER IST HIER SCHON NORMALISIERT: NORMALIZE_PIXEL_ID (lib/settings.ts)
 * entfernt Bindestriche und Leerraum AN DER EINGABE (Scheibe 2). Dieser Adapter formt
 * NICHTS um — der reine Bauer buildIngestEventsRequest ebenfalls nicht, und das ist
 * der zweite Halbsatz von Vorrats-Eintrag 7.
 */
export type GoogleConfig = {
  operatingAccountId: string;
  token: string;
  conversionRules: Record<string, string>;
};

/**
 * Der Ausschnitt des Beacon-Rumpfes, den dieser Adapter liest.
 *
 * BEWUSST EIGEN UND NICHT MetaForwardBody: Jener fuehrt _fbp (Metas Cookie), das hier
 * nie gelesen wird. eventSourceUrl ist dagegen PFLICHT-EINGANG und nicht Beiwerk — aus
 * ihr entstehen die Klick-Kennungen, und ohne sie entsteht kein Ereignis.
 */
type GoogleForwardBody = {
  value?: unknown;
  currency?: unknown;
  eventSourceUrl?: unknown;
};

/**
 * Trimmt einen unbekannten Wert zu einem String; alles Nicht-String wird "".
 *
 * DIE FUENFTE ZEICHENGLEICHE KOPIE IM REPO (capi/ingest.ts, meta-forward.ts,
 * pinterest-forward.ts, tiktok-forward.ts und hier). KEIN TEST SICHERT DIE GLEICHHEIT
 * DER FUENF, und das ist der Bestand und keine Entscheidung dieser Scheibe: Die saubere
 * Loesung waere eine neutrale Datei, und die lag ausserhalb jedes bisherigen
 * Zuschnitts. Wer eine aendert, aendert die anderen von Hand mit — es wird nichts rot.
 */
function asString(v: unknown): string {
  return typeof v === "string" ? v.trim() : "";
}

/**
 * DER NACHSCHLAG DER ZIEL-KENNUNG — MIT TYPPRUEFUNG, UND DIE IST KEIN PARANOIA-CODE.
 *
 * DER GRUND STEHT AM AUFLOESUNGS-PFAD: Ein Ziel kommt in die Aufloesung, sobald
 * hasConversionRules (lib/settings.ts) wahr ist — und jenes Praedikat verlangt nur,
 * dass IRGENDEIN Wert der Zuordnung eine nicht-leere Zeichenkette ist. Ueber den Wert
 * FUER DIESES EREIGNIS sagt es NICHTS. Der Typ Record<string, string> stammt aus dem
 * CLIENT-besessenen Einstellungs-Blob und ist zur Laufzeit keine Zusage: dort kann
 * eine Zahl, ein Objekt oder null stehen. OHNE die Typpruefung wuerfe der Trim genau
 * dort — und ein Wurf hier braeche die leere 204 des Aufrufers.
 *
 * ER IST BEWUSST NACHGEBAUT UND NICHT GETEILT (ARCHITEKTEN-ENTSCHEIDUNG E3,
 * 2026-09-01). Das vierte Ziel hat einen Nachschlag derselben Gestalt; sein NAME und
 * seine Begruendung sind aber anbieter-eigen (dort eine Conversion-Regel-URN, hier die
 * Kennung einer Conversion-Action). Ein Teilen haette einen Umzug aus einer
 * scope-geschuetzten Datei verlangt — fuer vier Zeilen, deren gemeinsame Substanz der
 * GUARD ist und nicht die Bedeutung. Dieser Kommentar ist deshalb neu geschrieben und
 * nicht abgeschrieben: ein abgeschriebener Beleg ist ab dem ersten Tag der falsche.
 *
 * WAS GARANTIERT IST: dass conversionRules ein Objekt ist (kein null, kein Array) —
 * derselbe Guard im Resolver stellt das sicher, und der Aufrufer setzt bei fehlender
 * Zuordnung ein leeres Objekt ein.
 */
function resolveDestinationId(
  rules: Record<string, string>,
  event: string,
): string {
  const raw: unknown = rules[event];
  return typeof raw === "string" ? raw.trim() : "";
}

/**
 * Baut die Nutzlast und stellt sie zu.
 *
 * SIE NIMMT WEDER clientIp NOCH userAgent ENTGEGEN, und das ist eine Entscheidung mit
 * Grund: Die gewaehlte Gestalt (OFFLINE CONVERSION IMPORT auf Basis der
 * Klick-Kennungen) traegt KEIN Feld fuer eine Besucher-Adresse — kein
 * landingPageDeviceInfo, kein eventDeviceInfo, kein userData. Beide zu verlangen waere
 * ein selbstgemachter Verlust an Merkmalen, die dieses Ziel gar nicht kennt.
 * DER AUFRUFER REICHT DESHALB ZWEI PARAMETER WENIGER: Der Eintrag in
 * FORWARDER_BY_TARGET bekommt sechs Argumente und gibt vier weiter — TypeScript deckt
 * das, eine Funktion mit weniger Parametern erfuellt die laengere Signatur. Dieselbe
 * Lage wie beim vierten Ziel, nur eine Stelle weiter.
 *
 * eventID WIRD ENTGEGENGENOMMEN UND NICHT GESENDET. Der Typ Forwarder gibt die
 * Reihenfolge vor, und der Rumpf hinter eventID wird gebraucht. GESENDET wird es
 * nicht: transactionId ist in dieser Gestalt OPTIONAL (GELESEN, docs/ziel-befunde.md,
 * Teil (l)/D5 — es ist einer der zwei Rang-Wechsel gegenueber Multi-Source), und
 * eventID ist UNSERE Dedup-Kennung, nicht Googles Transaktion. Sie dafuer einzusetzen
 * waere geraten — und ein geratener Wert in einem Dedup-Feld eines fremden Systems
 * faellt nicht auf.
 *
 * x-goog-user-project WIRD NICHT GESENDET. Die Kopfzeile fehlte in allen sieben
 * Aufrufen der Messung B1, und die semantische Pruefung wurde dennoch erreicht — das
 * ist AUSDRUECKLICH KEIN Schluss auf Entbehrlichkeit (Teil (bu)), aber auch kein Beleg
 * dafuer, dass sie noetig waere. Kein Vorbau auf Verdacht.
 *
 * SIE WIRFT NIE.
 */
export async function forwardToGoogle(
  config: GoogleConfig,
  event: string,
  eventID: string,
  body: GoogleForwardBody,
): Promise<void> {
  void eventID;
  // DIE EINZIGE ANWEISUNG VOR DEM try, UND SIE IST EINE REINE DEKLARATION: sie wertet
  // nichts aus und kann nicht werfen. Sie steht hier, damit finally sie sieht.
  let timer: ReturnType<typeof setTimeout> | undefined;
  try {
    // --- RIEGEL 1: KEINE KUNDENNUMMER ---
    //
    // Ohne sie traegt operatingAccount.accountId einen leeren Wert, und die Anfrage
    // waere strukturell unvollstaendig. Der Fall ist real: Die Karte kann verbunden
    // sein, waehrend das Kennungs-Feld noch leer steht — das ist der Zustand
    // UNMITTELBAR NACH DEM VERBINDEN und damit der erste, den ein Betreiber sieht.
    if (!config.operatingAccountId) {
      console.error("[capi] Google forward skipped: missing account id");
      return;
    }

    // --- RIEGEL 2: KEIN VERWENDBARER EINTRAG FUER DIESES EREIGNIS ---
    //
    // OHNE ZIEL-KENNUNG GIBT ES KEINE ADRESSE, an die geliefert werden koennte: Die
    // Kennung dieses Anbieters gilt JE CONVERSION-ACTION und damit faktisch je
    // Ereignistyp (GELESEN, Teil (k)/C3).
    // DER EREIGNIS-NAME STEHT NICHT IN DER MELDUNG. Er ist ein vom Betreiber FREI
    // getippter String (jeder Custom-Event ist erlaubt) — also Kundendatum auf dem
    // meistgetroffenen Pfad der Plattform. Geloggt wird der GRUND, nie der WERT.
    const destinationId = resolveDestinationId(config.conversionRules, event);
    if (!destinationId) {
      console.error("[capi] Google forward skipped: no destination for event");
      return;
    }

    // --- RIEGEL 3: KEINE KLICK-KENNUNG ---
    //
    // KEINE NUTZLAST OHNE KLICK-KENNUNG (bindende Entscheidung (3) des Zuschnitts).
    // Der Bauer entscheidet das, nicht diese Datei — er gibt einen benannten
    // Verwerfungsgrund zurueck, und der ist ein Mitglied UNSERER Union, kein Fremdtext.
    // DER GRUND, warum die Verwerfung ueberhaupt existiert: Der Anbieter faehrt
    // FAST-FAIL — ein einziger Pflichtfeld-Fehler verwirft die GANZE Anfrage, nicht den
    // einen Datensatz (GELESEN, Teil (l)/D5).
    const built = buildGoogleEvent({
      adIdentifiers: extractGoogleClickIds(body.eventSourceUrl),
      eventTimestamp: new Date(),
      eventSource: GOOGLE_EVENT_SOURCE,
      ...(typeof body.value === "number" && Number.isFinite(body.value)
        ? { conversionValue: body.value }
        : {}),
      ...(asString(body.currency)
        ? { currency: asString(body.currency) }
        : {}),
    });
    if (!built.ok) {
      console.error(
        `[capi] Google forward skipped: ${built.reason}`,
      );
      return;
    }

    const payload = buildIngestEventsRequest({
      operatingAccountId: config.operatingAccountId,
      productDestinationId: destinationId,
      events: [built.event],
    });

    const controller = new AbortController();
    timer = setTimeout(() => controller.abort(), GOOGLE_FORWARD_TIMEOUT_MS);
    const res = await fetch(GOOGLE_INGEST_ENDPOINT, {
      method: "POST",
      headers: {
        // DER TRAEGER IST GEMESSEN (OWNER, 2026-08-28, Messung A; Teil (bk)): die
        // Kopfzeile Authorization mit dem Wert "Bearer " + Token. Die drei Aufrufe
        // jener Messung trennen MISSING, INVALID und Durchgriff-bis-zum-Rumpf
        // voneinander — nur ein Traeger, der gelesen UND ausgewertet wird, kann diese
        // drei Zustaende erzeugen.
        // DIE URL IST DAMIT KEIN GEHEIMNIS-TRAEGER (anders als bei Meta); geloggt wird
        // sie trotzdem nicht.
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    // --- DIE ANTWORT: NUR DER STATUSCODE ---
    //
    // DER RUMPF WIRD NICHT GELESEN. Das ist die schaerfste Stelle der Auflage
    // TRANSIT-ONLY und der Grund steht im Kopf dieser Datei: Der zurueckgespiegelte
    // Wert waere die Klick-Kennung, und eine Schwaerzung nach FORM kennt deren Form
    // nicht.
    // WAS DAMIT NICHT SICHTBAR IST: welches Feld der Anbieter beanstandet. Der
    // Statuscode allein trennt die zwei gemessenen Fehlerklassen NICHT (Teil (bo)).
    // Die Diagnose laeuft ueber einen Handaufruf ausserhalb des Produkts (E4).
    if (!res.ok) {
      console.error(`[capi] Google forward failed: HTTP ${res.status}`);
    }
  } catch (err) {
    // Nur der Fehler-NAME. errorName liest ausschliesslich .name — nie die Message,
    // die Client-Input oder Fremdtext tragen kann. Ein Abbruch landet als DOMException
    // hier und wird dadurch als "AbortError" statt "unknown" sichtbar.
    console.error(`[capi] Google forward error: ${errorName(err)}`);
  } finally {
    // Der Timer wird IMMER geloescht — nach dem Muster aller vier bestehenden Adapter.
    // Ohne diese Zeile liefe er nach einer schnellen Antwort weiter und hielte die
    // Invocation; der Preis dieses Pfads ist der CONCURRENCY-SLOT.
    clearTimeout(timer);
  }
}
