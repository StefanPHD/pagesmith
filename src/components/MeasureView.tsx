"use client";

import type {
  AdblockLoss,
  EventCount,
  VariantCountsResult,
} from "@/app/projects/actions";
// Der reservierte PageView-Token als KONSTANTE, nicht als Literal (Scheibe 9c-1). Die
// Datei traegt bewusst KEIN "server-only" (dort ausdruecklich kommentiert), ist also
// client-importierbar — genau dafuer wurde sie seinerzeit aus tracking/meta.ts geloest.
import { PAGEVIEW_EVENT } from "@/lib/analytics/events";

// Anzeige-Label je event_type fuer die Analytics-Sektion (Scheibe 3). Der reservierte
// PageView-Token wird lesbar; jeder Conversion-Name (Purchase/Lead/Custom…) steht als
// Klartext.
//
// MITGENOMMEN IN 9c-1 (deklariert, nicht stillschweigend): hier stand '__ps_pageview' als
// handgetipptes LITERAL mit dem Kommentar, es MUESSE mit PAGEVIEW_EVENT uebereinstimmen —
// eine Uebereinstimmung per Zusage statt per Konstruktion. Da 9c-1 mit der Nenner/Zaehler-
// Trennung eine ZWEITE Stelle in dieser Datei anlegt, die denselben Token kennt, waere das
// Literal ab jetzt die dritte Fundstelle desselben Wertes gewesen. Die Konstante ist
// client-importierbar (events.ts traegt bewusst kein server-only), also gibt es keinen
// Grund fuer ein Duplikat. Verhalten unveraendert; durch die bestehenden Render-Tests
// gedeckt.
function eventTypeLabel(eventType: string): string {
  return eventType === PAGEVIEW_EVENT ? "PageViews" : eventType;
}

/**
 * Bereich MESSEN des Einstellungs-Panels (Phase 10 Scheibe 10a-1). Buendelt die drei
 * Abschnitte, die frueher ueber das Panel VERTEILT lagen: Tracking-Pixel (Meta-Pixel-ID
 * + CAPI-Token), Statistik (event_type-Counts + Adblocker-Verlust) und Auswertung je
 * Variante.
 *
 * REINE ANSICHT — KEIN eigener Projekt-Zustand, KEIN Lade-Effekt (Phase-10-Entscheidung 3):
 * Die vier Lade-Effekte (getEventCounts, getAdblockLoss, getVariantCounts,
 * getVariantBPublished) BLEIBEN im Container und feuern dort beim Seitenaufruf. Wanderten
 * sie hierher, feuerten sie erst beim ersten Oeffnen des Panels — eine Verhaltensaenderung.
 * Diese Komponente bekommt ausschliesslich fertige Werte.
 *
 * KEIN settings-BLOB: Der Meta-Pixel-Zweig von settings wird zwar HIER bedient, aber von
 * BAUEN (Vorschau), VEROEFFENTLICHEN (hosting) und dem Export gelesen. Deshalb kommen nur
 * Skalare herein (metaPixelId, capiTokenSet) und Schreibzugriffe gehen ueber schmale
 * Rueckrufe zurueck an den Container — der bleibt der EINZIGE Schreiber des Blobs.
 *
 * KEIN umschliessendes Element: die Rueckgabe ist ein Fragment, damit der gerenderte DOM
 * gegenueber dem Zustand vor der Extraktion unveraendert bleibt (nur die Reihenfolge der
 * Abschnitte im Panel aendert sich).
 */
export default function MeasureView({
  projectId,
  metaPixelId,
  onMetaPixelIdChange,
  capiTokenSet,
  capiTokenInput,
  onCapiTokenInputChange,
  capiTokenStatus,
  capiTokenError,
  capiRemoveConfirming,
  onCapiRemoveConfirmingChange,
  capiRemoving,
  onSetCapiToken,
  onRemoveCapiToken,
  eventCounts,
  adblockLoss,
  variantCounts,
  abTestStartedAt,
  hasVariantB,
}: {
  projectId: string | null;
  // --- Tracking-Pixel ---
  metaPixelId: string;
  onMetaPixelIdChange: (value: string) => void;
  capiTokenSet: boolean;
  capiTokenInput: string;
  onCapiTokenInputChange: (value: string) => void;
  capiTokenStatus: "idle" | "saving" | "saved" | "error";
  capiTokenError: string | null;
  capiRemoveConfirming: boolean;
  onCapiRemoveConfirmingChange: (value: boolean) => void;
  capiRemoving: boolean;
  onSetCapiToken: () => void;
  onRemoveCapiToken: () => void;
  // --- Statistik ---
  eventCounts: EventCount[];
  adblockLoss: AdblockLoss | null;
  // --- Auswertung je Variante ---
  variantCounts: VariantCountsResult | null;
  abTestStartedAt: string | null;
  hasVariantB: boolean;
}) {
  // --- SICHTBARKEIT DER VARIANTEN-AUSWERTUNG (Scheibe 9c-1) ---
  //
  // AUS DEN DATEN ABGELEITET: gibt es keine Zeile mit Varianten-Zuordnung, gibt es nichts
  // auszuwerten -> die Sektion erscheint gar nicht. Damit sieht ein Projekt, fuer das nie
  // ein Test lief, KEINE UI-Aenderung (Invariante J3) — ohne dass dafuer ein eigener
  // Zustand gehalten werden muesste.
  //
  // DER UEBERGANG IST MIT 9c-2 EINGETRETEN — und die Ableitung wurde ERWEITERT, nicht
  // ersetzt. Beide Terme werden gebraucht, und zwar fuer verschiedene Projekte:
  //
  //  FALL A — Lauf MIT Zeitstempel (laufend ODER gestoppt; der Wert bleibt, K2): sichtbar
  //    AUCH bei null Zeilen. Ohne diesen Term verschwaende die Sektion unmittelbar nach
  //    einem Neustart — genau in dem Moment, in dem der Owner auf sie schaut.
  //  FALL B — ALT-LAUF ohne Zeitstempel, aber mit Varianten-Daten (Test lief VOR 9c-2,
  //    kein Backfill): sichtbar ueber hasVariantData, exakt wie in 9c-1. Haenge die
  //    Sichtbarkeit ALLEIN an den Zeitstempel, und diese Projekte verlieren ihre
  //    Auswertung — eine Regression gegen live bewiesenes Verhalten.
  //  FALL C — nie ein Test: beide Terme falsch -> unsichtbar (J3 unveraendert).
  const variantRows = variantCounts?.ok ? variantCounts.rows : [];
  const hasVariantData = variantRows.some(
    (r) => r.count_a > 0 || r.count_b > 0
  );
  // Der FEHLERFALL kann nicht datengetrieben entschieden werden — bei {ok:false} wissen
  // wir gerade NICHT, ob es Daten gaebe. Er wird deshalb an hasVariantB gehaengt: dort ist
  // eine Auswertung plausibel, und ein Projekt ohne Variante B bleibt frei von einer
  // Fehlermeldung zu einer Sektion, die es nie zu sehen bekaeme (J3).
  //
  // BENANNTES, NICHT REPARIERTES VERHALTEN (9c-2): Wird Variante B nach einem Lauf
  // ENTFERNT, erzwingt der DB-CHECK ab_test_active = false — der ZEITSTEMPEL bleibt
  // jedoch stehen. Die Sektion bleibt damit sichtbar und zeigt weiter die Zahlen des
  // vergangenen Laufs, obwohl es keine Variante B mehr gibt (hasVariantB ist hier NUR am
  // Fehlerzweig beteiligt). Das ist RICHTIG so: die Messung hat stattgefunden, die Zeilen
  // sind echt, und sie zu verstecken hiesse, ein Ergebnis zu unterschlagen, weil sein
  // Gegenstand geloescht wurde. Ueberraschend genug, um hier zu stehen.
  const variantCountsFailed = variantCounts?.ok === false;
  const showVariantCounts =
    hasVariantData ||
    abTestStartedAt !== null ||
    (variantCountsFailed && hasVariantB);

  return (
    <>
      {/* Projekt-Einstellungen (Scheibe 1b): projektweite Tracking-Pixel. Als
          beschriftete Plattform-LISTE aufgebaut -> weitere Plattformen (Google/
          TikTok/…) passen spaeter als weitere Zeilen daneben, ohne Umbau. In 1b
          genau EINE Zeile: Meta-Pixel-ID. Projektweit (nicht pro Element);
          Aenderung -> dirty -> grosser Speichern-Button persistiert (kein Auto-Save).
          Pixel-ID ist OEFFENTLICH -> Plain-Feld, kein Secret-Handling. */}
      <h2 className="mb-1 text-sm font-medium text-gray-700">
        Tracking-Pixel
      </h2>
      <p className="mb-3 text-xs text-gray-500">
        Projektweite Pixel-IDs. Gilt für alle Tracking-Events dieses Projekts.
      </p>
      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
          <span className="w-40 shrink-0 font-medium text-gray-700">
            Meta-Pixel-ID
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={metaPixelId}
            onChange={(e) => onMetaPixelIdChange(e.target.value)}
            placeholder="z.B. 123456789012345"
            className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        {/* Meta-CAPI-Token (Scheibe 2a): GEHEIM, write-only. Der echte Wert
            geht nur in die Server-Action und kommt NIE zurueck -> das Feld
            startet/bleibt leer, gespeist wird es NIE aus settings. Der
            "gesetzt?"-Indikator kommt aus settings.capi.tokenSet. Ohne
            gespeichertes Projekt (kein projectId) fehlt die project_id fuer
            den FK -> deaktiviert + Hinweis. */}
        <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-start sm:gap-3">
          <span className="w-40 shrink-0 pt-2 font-medium text-gray-700">
            Meta CAPI-Token
            <span className="block text-xs font-normal text-gray-400">
              Server-Side, geheim
            </span>
          </span>
          <div className="flex w-full max-w-xs flex-col gap-1">
            <div className="flex items-center gap-2">
              <input
                type="password"
                autoComplete="off"
                value={capiTokenInput}
                onChange={(e) => onCapiTokenInputChange(e.target.value)}
                disabled={!projectId}
                placeholder={
                  capiTokenSet
                    ? "Neuen Token eingeben zum Ersetzen"
                    : "CAPI-Token einfügen"
                }
                className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
              />
              <button
                type="button"
                onClick={onSetCapiToken}
                disabled={
                  !projectId ||
                  !capiTokenInput.trim() ||
                  capiTokenStatus === "saving"
                }
                className="shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {capiTokenStatus === "saving" ? "…" : "Setzen"}
              </button>
              {/* "Entfernen" nur wenn bereits ein Token gesetzt ist. */}
              {projectId && capiTokenSet && !capiRemoveConfirming && (
                <button
                  type="button"
                  onClick={() => onCapiRemoveConfirmingChange(true)}
                  disabled={capiRemoving}
                  className="shrink-0 rounded-md border border-red-200 px-2 py-2 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Entfernen
                </button>
              )}
            </div>
            {/* Zweistufige Bestaetigung — deaktiviert das Tracking (destruktiv). */}
            {capiRemoveConfirming && (
              <div className="flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
                <span className="text-xs text-red-700">
                  Tracking für dieses Projekt deaktivieren? Der Token wird gelöscht.
                </span>
                <button
                  type="button"
                  onClick={onRemoveCapiToken}
                  disabled={capiRemoving}
                  className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {capiRemoving ? "Entferne…" : "Ja, entfernen"}
                </button>
                <button
                  type="button"
                  onClick={() => onCapiRemoveConfirmingChange(false)}
                  disabled={capiRemoving}
                  className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Abbrechen
                </button>
              </div>
            )}
            {!projectId && (
              <span className="text-xs text-gray-500">
                Projekt zuerst speichern, dann ist der Token setzbar.
              </span>
            )}
            {projectId && capiTokenSet && (
              <span className="text-xs text-green-600">••• gesetzt</span>
            )}
            {capiTokenStatus === "saved" && (
              <span className="text-xs text-green-600">
                Token gespeichert ✓
              </span>
            )}
            {capiTokenStatus === "error" && capiTokenError && (
              <span className="text-xs text-red-600">{capiTokenError}</span>
            )}
          </div>
        </label>
      </div>

      {/* Statistik (Phase 8 Scheibe 3): server-seitige Analytics-Counts des aktiven
          Projekts (PageViews + Conversions), server-beobachtet (source='server'),
          adblocker-resistent. Nur bei gespeichertem Projekt; leer -> Hinweis. */}
      {projectId && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h2 className="mb-1 text-sm font-medium text-gray-700">Statistik</h2>
          <p className="mb-3 text-xs text-gray-500">
            Server-seitig erfasste Events dieses Projekts.
          </p>
          {eventCounts.length === 0 ? (
            <p className="text-xs text-gray-500">Noch keine Events.</p>
          ) : (
            <ul className="flex flex-col gap-1">
              {eventCounts.map((c) => (
                <li
                  key={c.event_type}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-gray-700">
                    {eventTypeLabel(c.event_type)}
                  </span>
                  <span className="font-semibold tabular-nums text-gray-900">
                    {c.count}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Adblocker-Verlustrate (Phase 8 Scheibe B): die Marquee-Zahl, additiv unter
              den Counts.

              WORTWAHL (nicht verhandelbar): "NUR server-seitig erfasst" — NIEMALS
              "gerettet". "Gerettet" behauptet, Meta habe die Events EMPFANGEN; das
              steht NICHT in unseren Daten. events protokolliert, was der SERVER
              BEOBACHTET hat, nicht ob der Forward ankam — der CAPI-'Bad signature'-Bug
              hat live gezeigt, dass Forwards STILL scheitern, waehrend die Zeilen
              sauber weiterlaufen. Eine Kachel, die in genau diesem Zustand "gerettet"
              sagt, luegt den Kunden an.

              "mindestens": die Zahl kann in BEIDE Richtungen irren — nach oben durch
              das Redirect-Rennen und JS-Fehler/schnellen Bounce, nach unten durch
              Surrogat-Blocker (Noop-Skript -> onload feuert, Pixel ist tot).

              NEUTRAL-STATUS statt Zahl, wenn kein Stichtag existiert ODER das Fenster
              leer ist (total === 0) -> keine Division, keine erfundene 0%/100%-Zahl. */}
          <div className="mt-4 border-t border-gray-100 pt-3">
            <h3 className="mb-1 text-sm font-medium text-gray-700">
              Adblocker-Verlust
            </h3>
            {!adblockLoss ||
            adblockLoss.first_confirm_at === null ||
            adblockLoss.total_server_conversions === 0 ? (
              <p className="text-xs text-gray-500">
                Warte auf erste Bestätigung.
              </p>
            ) : (
              <>
                <p className="text-sm font-semibold tabular-nums text-gray-900">
                  mindestens{" "}
                  {Math.round(
                    ((adblockLoss.total_server_conversions -
                      adblockLoss.confirmed_conversions) /
                      adblockLoss.total_server_conversions) *
                      100
                  )}
                  %
                </p>
                <p className="mt-0.5 text-xs text-gray-500">
                  {adblockLoss.total_server_conversions -
                    adblockLoss.confirmed_conversions}{" "}
                  von {adblockLoss.total_server_conversions} Conversions wurden
                  NUR server-seitig erfasst.
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Auswertung je Variante (Phase 9 Scheibe 9c-1). EIGENE Sektion, additiv neben
          der projektweiten Statistik — bewusst NICHT in sie hinein:

          Stuende eine projektweite Gesamtzahl neben den Varianten-Zahlen, fragte der
          Nutzer zu Recht, warum das nicht aufgeht. Es sind ZWEI Fragen (projektweit vs.
          varianten-zugeordnet), und getrennte Sektionen sagen das; geteilte Spalten
          laden zum Addieren ein und produzieren einen Support-Fall aus einer korrekten
          Anzeige.

          WORTWAHL (nicht verhandelbar, gleiche Disziplin wie "nur server-seitig
          erfasst"): "Conversions je Seitenaufruf" — NIEMALS "Conversion-Rate je
          Besucher". Es gibt keine Besucher-Identitaet: ein Besucher, der dreimal laedt,
          zaehlt dreimal. Die Bezugsgroesse steht im Namen, sonst liest der Nutzer eine
          Zahl, die es nicht gibt.

          ABSOLUTWERTE PRIMAER, Rate sekundaer, KEINE Sieger-Auszeichnung, keine
          Ampelfarben, keine Schwelle: die Zielgruppe trifft mit diesen Zahlen
          Budget-Entscheidungen, und eine Darstellung, die einen Sieger suggeriert,
          erzeugt Vertrauen, das sie nicht deckt. "12 von 340" ENTHAELT die
          Bezugsgroesse, "3,5 %" nicht. */}
      {projectId && showVariantCounts && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h2 className="mb-1 text-sm font-medium text-gray-700">
            Auswertung je Variante
          </h2>
          <p className="mb-1 text-xs text-gray-500">
            Server-seitig erfasste Events, aufgeteilt nach ausgelieferter
            Variante.
          </p>
          {/* ZEITRAUM-BESCHRIFTUNG (Scheibe 9c-2). Zwei Faelle, und der NULL-Fall ist
              der heiklere: er darf WEDER einen Zeitraum behaupten ("seit Beginn",
              "gesamter Zeitraum" sind ausgeschlossen) NOCH die Existenz genau EINES
              Laufs — ein Projekt kann seinen Test vor 9c-2 mehrfach gefahren haben,
              und dann mischen die Zahlen mehrere Laeufe. Genau das ist das Problem,
              das die Abgrenzung loest; der Text muss es benennen statt es zu
              ueberdecken.

              EHRLICHE GRENZE DER GESETZTEN VARIANTE: die Beschriftung stammt aus dem
              GELADENEN Projekt, der Filter liest DB-seitig zum Abfragezeitpunkt.
              Startet jemand den Test in einem zweiten Tab, kann die Beschriftung
              AELTER sein als das Fenster der Zahlen — nie umgekehrt, weil die DB die
              Quelle ist. Wirkung: ein zu WEIT gefasster Zeitraum bei korrekten
              Zahlen. Ein Reload heilt es.

              LOKALE DATUMSFORMATIERUNG IST HIER NUR DESHALB KOLLISIONSFREI, weil
              diese Sektion im SERVER-Render gar nicht im Baum liegt: sie steckt im
              Einstellungs-Panel, und das ist beim ersten Render geschlossen (s. den
              Kommentar am isSettingsOpen-Gate). Waere sie im Server-HTML, formatierten
              Server und Client dasselbe Datum in VERSCHIEDENEN Zeitzonen — ein
              Hydration-Mismatch mit Konsolenfehler.
              DAS IST EINE ENTSCHIEDENE NICHT-MASSNAHME, kein Uebersehen: Mount-Flag,
              suppressHydrationWarning und ein fest gesetzter timeZone-Parameter wurden
              geprueft und VERWORFEN. Der erste baut Mechanik gegen ein Problem, das es
              nicht gibt; der zweite unterdrueckt die Meldung statt der Abweichung; der
              dritte naehme dem Nutzer seine lokale Zeit. Stattdessen ist die
              Abhaengigkeit benannt — hier und an der Stelle, die sie tatsaechlich
              brechen wuerde. */}
          <p className="mb-3 text-xs text-gray-500">
            {abTestStartedAt ? (
              <>
                Zeitraum: seit Teststart am{" "}
                {new Date(abTestStartedAt).toLocaleString("de-DE")}.
              </>
            ) : (
              <>
                Ohne Zeitabgrenzung — für dieses Projekt ist kein Teststart
                protokolliert. Die Zahlen können Ereignisse aus mehreren
                Läufen enthalten.
              </>
            )}
          </p>

          {variantCountsFailed ? (
            /* "LEER" UND "NICHT LADBAR" SEHEN NICHT GLEICH AUS (Backlog-Punkt, hier
               fuer DIESE Sektion eingeloest). Eine Sektion, die bei einem Ladefehler
               "keine Daten" sagt, behauptet etwas, das sie nicht belegen kann. Der
               Text nennt weder Ursache noch Ergebnis — dieselbe Wortwahl-Disziplin
               wie ACTION_THROW_MESSAGE. */
            <p className="text-xs text-amber-700">
              Die Auswertung konnte nicht geladen werden — bitte Seite neu
              laden.
            </p>
          ) : variantRows.length === 0 ? (
            /* LEER, ABER GELADEN (Scheibe 9c-2). Der Normalfall unmittelbar nach
               einem Start: das Fenster ist offen, es ist nur noch nichts drin.
               STRUKTURELL vom Fehlerfall getrennt, nicht per Textvergleich — der
               Fehlerzweig darueber greift auf {ok:false}, dieser hier auf
               {ok:true, rows:[]}. Zwei Zustaende, zwei Aussagen; der Backlog-Punkt
               "leer vs. nicht ladbar" bleibt fuer diese Sektion eingeloest. */
            <p className="text-xs text-gray-500">
              Noch keine Daten in diesem Testlauf.
            </p>
          ) : (
            <>
              {/* Der NENNER (Seitenaufrufe je Variante) und die ZAEHLER (Conversions)
                  stehen in DERSELBEN Tabelle und stammen aus DEMSELBEN RPC-Ergebnis —
                  getrennt wird hier, beim Aufrufer, anhand des reservierten Tokens.
                  Eine zweite Abfrage waere ein zweiter Roundtrip fuer Daten, die
                  dieselbe Gruppierung ohnehin liefert, und koennte gegen den Zaehler
                  desynchronisieren. */}
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-gray-500">
                    <th className="pb-1 text-left font-medium">Event</th>
                    <th className="pb-1 text-right font-medium">
                      Variante A
                    </th>
                    <th className="pb-1 text-right font-medium">
                      Variante B
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {variantRows.map((r) => (
                    <tr key={r.event_type}>
                      <td className="py-0.5 text-gray-700">
                        {eventTypeLabel(r.event_type)}
                      </td>
                      <td className="py-0.5 text-right font-semibold tabular-nums text-gray-900">
                        {r.count_a}
                      </td>
                      <td className="py-0.5 text-right font-semibold tabular-nums text-gray-900">
                        {r.count_b}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* CONVERSIONS JE SEITENAUFRUF — Absolutwerte zuerst, Rate in Klammern.
                  Nur fuer Event-Arten, die KEINE PageViews sind, und nur wenn im
                  Nenner ueberhaupt Aufrufe stehen (keine Division durch 0, keine
                  erfundene Zahl). */}
              {(() => {
                const pageviews = variantRows.find(
                  (r) => r.event_type === PAGEVIEW_EVENT
                );
                const conversions = variantRows.filter(
                  (r) => r.event_type !== PAGEVIEW_EVENT
                );
                if (!pageviews || conversions.length === 0) return null;
                return (
                  <div className="mt-3 border-t border-gray-100 pt-2">
                    <h3 className="mb-1 text-xs font-medium text-gray-700">
                      Conversions je Seitenaufruf
                    </h3>
                    <ul className="flex flex-col gap-0.5">
                      {conversions.map((c) => (
                        <li key={c.event_type} className="text-xs text-gray-600">
                          {c.event_type}: A {c.count_a} von{" "}
                          {pageviews.count_a}
                          {pageviews.count_a > 0 &&
                            ` (${((c.count_a / pageviews.count_a) * 100).toFixed(1)} %)`}
                          {" · "}B {c.count_b} von {pageviews.count_b}
                          {pageviews.count_b > 0 &&
                            ` (${((c.count_b / pageviews.count_b) * 100).toFixed(1)} %)`}
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })()}

              {/* ZEILEN OHNE ZUORDNUNG — NUR wenn ihre Zahl nicht null ist (J13). Sie
                  sind das einzige Signal ueber Messverluste, das der Owner hat
                  (cookie-verweigernder Browser, Export-Download auf fremder Domain,
                  Seite vor der Aktivierung ausgeliefert). Sie wegzulassen hiesse, den
                  Nenner stillschweigend zu beschoenigen.
                  OHNE Lauf-Abgrenzung (9c-2) zaehlen hier AUCH alle Zeilen mit, die vor
                  dem ersten Test entstanden sind — der Text sagt deshalb "ohne
                  Zuordnung" und nicht "Messverlust". */}
              {variantRows.some((r) => r.count_none > 0) && (
                <p className="mt-3 text-xs text-gray-500">
                  Ohne Varianten-Zuordnung:{" "}
                  {variantRows.reduce((sum, r) => sum + r.count_none, 0)}{" "}
                  Events.
                </p>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}
