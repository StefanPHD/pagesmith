// DIE KLAMMER UM DIE ERNEUERUNG — EIN LAUF JE PROJEKT
// (Phase 11.2, Schritt 1b-1 der Scheibe 1b; docs/aktiver-stand.md, Abschnitt "Die
// Klammer um die Erneuerung — Schritt 1b-1 der Scheibe 1b des Schnitts der Phase
// 11.2").
//
// WAS DIESE DATEI IST: EIN LAUF um refreshAccessToken, mit einer Obergrenze. Sie ruft
// die Funktion fuer EIN Projekt und EIN Ziel, wiederholt AUSSCHLIESSLICH bei
// kind:"retry" und hoechstens REFRESH_MAX_ATTEMPTS mal, und gibt den letzten Ausgang
// samt der Zahl der Versuche zurueck.
//
// SIE BAUT KEINEN AUSLOESER. Kein Zeitplan, kein Haken am Verkehr, kein after(). Der
// Takt ist der ZWEITE Schritt, 1b-2 (OWNER-ENTSCHEIDUNG 2026-09-03). WER DIESE DATEI
// BAUT UND DANACH ERWARTET, DASS EIN ZUGANGSDATUM VON SELBST AM LEBEN BLEIBT, HAT
// DIESELBE LAGE WIE NACH 1a: das Werkzeug ist gebaut, und niemand ruft es.
//
// ---------------------------------------------------------------------------
// SIE PRUEFT KEIN EIGENTUM. DER AUFRUFER MUSS ES TUN — VOR DEM AUFRUF.
//
// Dieselbe Arbeitsteilung wie in refreshAccessToken selbst (s. deren Dateikopf) und
// derselbe Preis: WER SIE OHNE EIGENTUMS-GATE RUFT, HAT KEIN EIGENTUMS-GATE, UND
// NICHTS WIRD DAVON ROT. Diese Klammer ist KEINE zweite Schicht davor — sie legt sich
// um eine Funktion, die den Admin-Client instanziiert (service_role, bypassed RLS).
//
// DIE LADEKLASSE, EHRLICH BENANNT (wie in lib/oauth/connect-return.ts): Diese Datei
// traegt selbst KEINE Direktive — kein "use server", kein import "server-only". Sie
// ERBT die Marke server-only ueber den Import von token-refresh.ts. Das ist Absicht:
// "use server"-Dateien duerfen ausschliesslich async-Funktionen exportieren
// (docs/immer-beachten.md, "'USE SERVER'-DATEIEN"), und diese Datei exportiert
// zusaetzlich eine Konstante und einen Typ.
//
// WARUM SIE DIE FUNKTION IMPORTIERT, STATT SIE HEREINGEREICHT ZU BEKOMMEN — anders als
// der Lader in connect-return.ts: 1b-2 soll GENAU EINEN Einstieg haben. Ein
// hereingereichter Aufruf zwaenge jeden kuenftigen Aufrufer, zwei Dinge zu verdrahten,
// und die zweite Verdrahtung ist die, die jemand vergisst.
//
// KEINE UMLAUTE IM QUELLTEXT — s. den Kopf von lib/oauth/google-authorize.ts.
//
// ---------------------------------------------------------------------------
// EIN WURF IST KEIN AUSGANG. HIER STEHT KEIN try/catch, UND DAS IST GEBAUTE ABSICHT.
//
// Ein Wurf aus refreshAccessToken verlaesst diese Klammer UNVERAENDERT und trifft
// denselben Ausgang wie ohne sie. Er wird NICHT gefangen, NICHT in einen
// retry-Ausgang umgedeutet und NICHT wiederholt.
//
// DER GRUND: Die Wiederholung unten zaehlt RUECKGABEN. Eine Schleife ist genau die
// Stelle, an der ein Wurf versehentlich zu einem erfundenen Ausgang wird — und dann
// meldete diese Klammer "nochmal versuchen" fuer einen Zustand, ueber den sie nichts
// weiss. refreshAccessToken WIRFT heute NIE (Charakterisierung T16 in
// token-refresh.test.ts); diese Invariante haengt aber NICHT an jener Eigenschaft,
// sondern schuetzt genau den Fall, in dem sie einmal nicht mehr gilt.
//
// ---------------------------------------------------------------------------
// KEIN NEBENLAEUFIGKEITS-RIEGEL, UND DAS IST ABSICHT. Keine Sperre, keine
// Vereinzelung, kein Warten. Vorrats-Eintrag 9 (docs/aktiver-stand.md) ist in 1b-1
// GEPRUEFT UND BEGRUENDET VERTAGT: Die FORM des Riegels haengt am GRAD der
// Nebenlaeufigkeit, und den legt erst der TAKT fest — also 1b-2. Ein Riegel im
// Prozessspeicher traegt fuer einen Sweep mit zwei Laeufen und traegt NICHT, wenn der
// Verkehr ihn ausloest. Vor der Takt-Wahl gebaut, waere er auf Verdacht gebaut.
// EIN "KLEINER RIEGEL NEBENBEI" IST EIN VERSTOSS, KEIN BONUS.
//
// ---------------------------------------------------------------------------
// KEINE VERZOEGERUNG ZWISCHEN DEN VERSUCHEN. Eine Pause waere ein Takt im Kleinen und
// gehoert damit zu 1b-2. Der Deckel begrenzt die ZAHL der Versuche, nicht ihre Lage in
// der Zeit.
//
// ---------------------------------------------------------------------------
// DIE PROJECT-KENNUNG IN DER LOGZEILE IST HEUTE ZULAESSIG, WEIL EIN MENSCH AUSLOEST.
// Der einzige Aufrufer ist die Beweis-Route, die ein Betreiber von Hand fahren muss.
// MIT 1b-2 IST DAS NEU ZU BEWERTEN: Der Ingest-Pfad fuehrt aus genau diesem Grund
// KEINE Projekt-Kennung je Beacon (s. den Kopf von usableTokenFromRow in
// lib/capi/token.ts — "eine Projekt-Kennung je Beacon waere eine Datenerhebung, die
// niemand beschlossen hat"). Ein Ausloeser, der oft laeuft, faellt unter dieselbe
// Erwaegung.
import { refreshAccessToken } from "@/lib/oauth/token-refresh";
import type { RefreshResult } from "@/lib/oauth/token-refresh";

/**
 * WIE OFT HOECHSTENS VERSUCHT WIRD.
 *
 * GESETZT, NICHT GEMESSEN. Es gibt keine Erhebung darueber, wie oft ein
 * voruebergehender Fehlschlag beim zweiten oder dritten Versuch verschwindet; die Zahl
 * ist eine Festlegung und steht als benannte Konstante an EINER Stelle, damit ihre
 * Aenderung ein sichtbarer Diff ist.
 *
 * DER PREIS GEHOERT DAZU: Jeder Versuch kann bis an REFRESH_TIMEOUT_MS laufen (8000 ms
 * in lib/oauth/google-refresh.ts). Drei Versuche sind damit im schlechtesten Fall rund
 * 24 Sekunden — innerhalb der gemessenen Default Max Duration, aber nicht umsonst.
 */
export const REFRESH_MAX_ATTEMPTS = 3;

/**
 * Das Ergebnis EINES Laufs.
 *
 * outcome IST DER AUSGANG VON refreshAccessToken, UNVERAENDERT. Diese Klammer deutet
 * nichts um, fasst nichts zusammen und erfindet keinen Zustand: Der Ergebnistyp der
 * Funktion ist nach REAKTION sortiert, und eine zweite Sortierung daneben liefe
 * auseinander.
 *
 * WARUM attempts UEBERHAUPT DASTEHT — ohne diesen Satz ist es ein Feld ohne
 * Produktiv-Konsumenten und wird beim naechsten Aufraeumen gestrichen:
 * BEI ERSCHOEPFTEM DECKEL IST outcome UNVERAENDERT kind:"retry". Der Aufrufer sieht
 * also denselben Wert wie nach EINEM danebengegangenen Versuch.
 * attempts === REFRESH_MAX_ATTEMPTS IST DIE EINZIGE STELLE, AN DER ER "AUFGEGEBEN" VON
 * "EINMAL DANEBENGEGANGEN" TRENNEN KANN. Fuer 1b-2 ist das der Unterschied zwischen
 * "gleich nochmal" und "beim naechsten Takt wieder".
 */
export type RefreshRunResult = {
  outcome: RefreshResult;
  attempts: number;
};

/**
 * Faehrt EINEN Erneuerungs-Lauf fuer EIN Projekt und EIN Ziel.
 *
 * JE PROJEKT UND NICHT ALS SWEEP, und der Grund gehoert an die Funktion, sonst wird die
 * Form beim naechsten Umbau als willkuerlich gelesen: Ein verkehrsgetakteter Ausloeser
 * kennt genau EIN Projekt; ein Sweep ist eine SCHLEIFE ueber diese Funktion. Umgekehrt
 * gilt es nicht — aus einem Sweep laesst sich kein Ein-Projekt-Aufruf herausschneiden,
 * ohne ihn neu zu bauen. DIE FORM JE PROJEKT IST DAMIT DIE EINZIGE, DIE BEIDE
 * TAKT-FAMILIEN OFFENHAELT, ZWISCHEN DENEN 1b-2 ZU WAEHLEN HAT.
 *
 * WIEDERHOLT WIRD AUSSCHLIESSLICH BEI kind:"retry". Jeder andere Ausgang kehrt SOFORT
 * zurueck — auch dead und misconfigured, und gerade die: Eine Wiederholung heilte dort
 * nichts und verbrauchte einen echten Netzaufruf oder einen Datenbank-Zugriff je
 * Durchlauf.
 *
 * WARUM EINE WIEDERHOLUNG HIER FOLGENLOS IST (GEMESSEN am Code, CC, 2026-09-03): JEDER
 * retry-Ausgang von refreshAccessToken liegt VOR dem Upsert. Ein zweiter Versuch
 * wiederholt also nie einen Schreibvorgang, sondern liest die Zeile neu. Dazu rotiert
 * Google das Erneuerungs-Token nicht (GEMESSEN 2026-08-28, OWNER, Messung C) — zwei
 * Einloesungen desselben Tokens sind ein ueberfluessiger Netzaufruf, kein verlorener
 * Zugang.
 * DIE GRENZE DIESER BEGRUENDUNG GEHOERT MIT: Ihre zweite Haelfte ruht VOLLSTAENDIG auf
 * einer fremden Eigenschaft. Rotierte der Anbieter, waere dieselbe Wiederholung ein
 * VERLORENER ZUGANG. Er kann das aendern, ohne dass hier etwas rot wird.
 *
 * SIE WIRFT NIE SELBST. Wirft die Funktion darunter, verlaesst der Wurf diese Klammer
 * unveraendert — s. den Dateikopf.
 */
export async function runRefresh(params: {
  projectId: string;
  target: string;
}): Promise<RefreshRunResult> {
  const { projectId, target } = params;

  // DIE SCHLEIFE ZAEHLT VERSUCHE, NICHT WIEDERHOLUNGEN. attempts ist nach dem ersten
  // Durchlauf 1 — nicht 0 —, damit der Wert dasselbe bedeutet wie sein Name.
  let attempts = 0;
  let outcome: RefreshResult = await refreshAccessToken({ projectId, target });
  attempts = 1;

  // KEIN try/catch. S. den Dateikopf, Abschnitt "EIN WURF IST KEIN AUSGANG".
  while (outcome.kind === "retry" && attempts < REFRESH_MAX_ATTEMPTS) {
    outcome = await refreshAccessToken({ projectId, target });
    attempts += 1;
  }

  if (outcome.kind === "retry" && attempts >= REFRESH_MAX_ATTEMPTS) {
    // NUR DIE EIGENE STUFE. Der reason ist ein Mitglied UNSERER Union, kein Fremdtext;
    // ein Token, ein Chiffrat oder eine Anbieter-Meldung kommt hier nicht vor, weil der
    // Ergebnistyp keines von beidem traegt.
    console.error("[oauth/refresh-run] exhausted", {
      projectId,
      target,
      attempts,
    });
  }

  return { outcome, attempts };
}
