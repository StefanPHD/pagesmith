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
import type { TrackingTarget } from "@/lib/settings";
// TARGET_CARDS liefert den ANBIETER-NAMEN fuer die Verlust-Kachel (s. dort). Named
// neben dem Default-Import derselben Datei — kein zweiter Modulpfad.
import TargetCard, { TARGET_CARDS } from "@/components/TargetCard";
import { hasAdapter } from "@/lib/tracking/target-adapters";

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
  targets,
  pixelIdFor,
  savedPixelIdFor,
  onPixelIdChange,
  configuredTargets,
  onCredentialsSaved,
  onCredentialsRemoved,
  usedEvents,
  rulesTarget,
  conversionRuleFor,
  onConversionRuleChange,
  eventCounts,
  adblockLoss,
  variantCounts,
  abTestStartedAt,
  hasVariantB,
}: {
  projectId: string | null;
  // --- Tracking-Pixel: eine Karte je Ziel ---
  targets: readonly TrackingTarget[];
  pixelIdFor: (target: TrackingTarget) => string;
  /**
   * Die zuletzt GESPEICHERTE Kennung je Ziel (Scheibe B2). Zweite Skalar-Funktion
   * neben pixelIdFor, KEIN Blob: Die Karte braucht beide Werte fuer verschiedene
   * Dinge — den laufenden fuers Eingabefeld, den gespeicherten fuer die Aussage
   * ueber die Auslieferung. Diese Ansicht entscheidet nichts davon, sie reicht
   * durch; das Urteil faellt in der Karte, wo auch der Nicht-geladen-Fall liegt.
   */
  savedPixelIdFor: (target: TrackingTarget) => string;
  onPixelIdChange: (target: TrackingTarget, value: string) => void;
  /** null = noch nicht geladen; das traegt den dritten Karten-Zustand. */
  configuredTargets: TrackingTarget[] | null;
  onCredentialsSaved: (
    forProjectId: string,
    target: TrackingTarget,
    trackingKey: string,
  ) => void;
  onCredentialsRemoved: (forProjectId: string, target: TrackingTarget) => void;
  // --- Verwendete Events (Scheibe 11.1b) ---
  /**
   * Die FERTIGE Ableitung aus dem Container: die Vereinigung der
   * Track-Ereignisnamen ueber beide Varianten-Mengen, plus die AUSSAGE, ueber
   * wie viele Varianten sie reicht.
   *
   * scope IST NICHT REDUNDANT ZU hasVariantB, auch wenn es so aussieht: Diese
   * Ansicht bekommt hasVariantB ohnehin (fuer den Fehlerzweig der
   * Varianten-Auswertung). Wuerde die Aussage HIER daraus neu gebildet, stuende
   * dasselbe Urteil an ZWEI Stellen — und zwei Instanzen derselben Frage laufen
   * auseinander, in diesem Projekt bereits geschehen (9b-1). Die Ableitung faellt
   * das Urteil EINMAL, im Container; hier wird es nur gelesen.
   */
  usedEvents: { names: string[]; scope: "a-only" | "a-and-b" };
  // --- Conversion-Regeln (Scheibe 11.1d) ---
  /**
   * DAS ZIEL, dessen Kennung JE EREIGNISTYP gilt. Es kommt als PROP herein und
   * wird hier NICHT gewaehlt — dieselbe Trennung wie bei `targets` darueber: Der
   * Container weiss, WELCHES Ziel gemeint ist, diese Ansicht nur, DASS eines
   * gemeint ist. Ein Zielwert in dieser Datei waere eine ziel-geschluesselte
   * Aussage in einer reinen Ansicht.
   */
  rulesTarget: TrackingTarget;
  /** Die GESPEICHERTE bzw. laufende Regel-Kennung eines Ereignisnamens, "" wenn
   *  keine hinterlegt ist. Skalar je Name, KEIN Record — dieselbe Bauform wie
   *  `pixelIdFor`: die Ansicht bekommt Werte, keinen Blob. */
  conversionRuleFor: (event: string) => string;
  onConversionRuleChange: (event: string, value: string) => void;
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
  // ZWEITE STELLE DESSELBEN URTEILS — MIT ANSAGE (Phase 10 Scheibe 10c-1). Das
  // Zustandssignal an der Reiterzeile (CodeImporter.tsx, const measureSignal) bildet
  // nach, WANN der Fehlertext unten tatsaechlich erscheint, damit es nicht auf einen
  // Bereich zeigt, in dem gar nichts steht. Es liest denselben State-Wert, rechnet
  // also nichts neu — aber es beurteilt dieselbe Frage ein zweites Mal.
  // BEIDE MUESSEN SYNCHRON BLEIBEN: Wer showVariantCounts hier aendert, aendert die
  // Bedingung dort mit. Der Waechter dagegen ist Test T2 des 10c-1-Blocks ("Signal
  // bleibt AUS, wenn der Fehler gar nicht angezeigt wird") — eine einseitige
  // Aenderung wird dort rot.
  const variantCountsFailed = variantCounts?.ok === false;
  const showVariantCounts =
    hasVariantData ||
    abTestStartedAt !== null ||
    (variantCountsFailed && hasVariantB);

  return (
    <>
      {/* TRACKING-PIXEL: EINE KARTE JE PLATTFORM (Phase 11 Scheibe 6, zweite
          Haelfte). Der Kommentar von 1b sagte "als beschriftete Plattform-LISTE
          aufgebaut -> weitere Plattformen passen spaeter als weitere Zeilen
          daneben" — das ist hiermit eingeloest, nur als Karten statt als Zeilen.

          DIE UEBERSCHRIFT BLEIBT, DIE KARTEN LIEGEN DARUNTER. Keine Karte traegt
          eine Ueberschriften-Rolle: der Reihenfolge-Test der Phase 10 waehlt
          Abschnitte ueber role="heading", und eine gleichnamige Karten-Ueberschrift
          machte ihn mehrdeutig. */}
      <h2 className="mb-1 text-sm font-medium text-gray-700">
        Tracking-Pixel
      </h2>
      <p className="mb-3 text-xs text-gray-500">
        Projektweite Zugangsdaten je Plattform. Gilt für alle Tracking-Events
        dieses Projekts.
      </p>
      {/* DER PROJEKT-HINWEIS STEHT EINMAL, NICHT JE KARTE. Er beschreibt eine
          Eigenschaft des PROJEKTS ("noch nicht gespeichert"), nicht eine des
          Ziels — je Karte wiederholt waere er nicht nur redundant, sondern bei
          zwei Karten auch zweimal derselbe Text. */}
      {!projectId && (
        <p className="mb-3 text-xs text-gray-500">
          Projekt zuerst speichern, dann sind Zugangsdaten setzbar.
        </p>
      )}
      <div className="flex flex-col gap-3">
        {targets.map((target) => (
          <TargetCard
            // key AM PROJEKT (Phase 11 Scheibe 6): der Projektwechsel ist damit
            // eine MOUNT-Grenze — Eingabe, Status, Fehler, Bestaetigung und
            // Busy-Flag der Karte sterben mit ihm. Dieselbe Figur wie bei
            // DomainManager, und der zweite Anlass im Repo dafuer.
            // Das ZIEL steht mit im Schluessel, weil die Karten sonst allein
            // ueber ihre Position unterschieden waeren.
            key={`${projectId ?? "neu"}:${target}`}
            projectId={projectId}
            target={target}
            // ABGELEITET, NICHT BEHAUPTET (Scheibe C2): Die Quelle bleibt die Liste
            // in lib/tracking/target-adapters.ts — hier wird sie nur GELESEN. Lesen
            // ist kein Behaupten; ein zweiter Ort, der es SETZT, waere genau die
            // Doppelung, die diese Scheibe beseitigt hat.
            // WARUM HIER UND NICHT IN DER KARTE: Bekaeme die Karte die Tatsache nicht
            // als Prop, sondern holte sie selbst, waere ihr Hinweis-Zweig im Test nur
            // ueber eine Mutation von Modulzustand erreichbar — und die ist dort
            // begruendet verworfen.
            hasAdapter={hasAdapter(target)}
            pixelId={pixelIdFor(target)}
            savedPixelId={savedPixelIdFor(target)}
            onPixelIdChange={(value) => onPixelIdChange(target, value)}
            configured={
              configuredTargets === null
                ? null
                : configuredTargets.includes(target)
            }
            onCredentialsSaved={onCredentialsSaved}
            onCredentialsRemoved={onCredentialsRemoved}
          />
        ))}
      </div>

      {/* VERWENDETE EVENTS (Phase 11.1b). Zwischen den Ziel-Karten und der
          Statistik, und das ist eine Entscheidung: Die Karten daruber tragen die
          ZIEL-Achse (Zugangsdaten je Plattform), die Statistik darunter die
          LAUFZEIT-Achse (was tatsaechlich beobachtet wurde). Dieser Abschnitt
          steht dazwischen, weil er die dritte Achse traegt — was das Projekt
          KONFIGURIERT hat.

          AUS DER KONFIGURATION, NIE AUS LAUFZEITDATEN: Ein Ereignis, das
          eingerichtet ist und nie gefeuert hat, hinterlaesst in KEINEM
          persistierten Datensatz eine Spur. Wer diese Liste aus den Ereignissen
          ableiten wollte, leitete sie aus dem Nichts ab — und genau darum steht
          sie neben der Statistik und nicht in ihr.

          NICHT AN projectId GEGATET, anders als die beiden Abschnitte darunter:
          Die Namen stammen aus dem Editor-Zustand, nicht aus der Datenbank. Sie
          stehen auch fuer ein noch nicht gespeichertes Projekt zur Verfuegung,
          und ein Gate haette hier nichts zu schuetzen (keine Abfrage, keine
          Zeile, kein Geheimnis).

          KEINE AUSSAGE DER FORM "VOLLSTAENDIG": Die Liste sagt, was
          KONFIGURIERT ist. Ob dazu je ein Ereignis eintrifft, sagt sie nicht,
          und ob ein Ziel es annimmt, erst recht nicht — dieselbe
          Wortwahl-Disziplin wie "nur server-seitig erfasst".

          scope STATT hasVariantB: s. die Begruendung an der Prop-Deklaration.
          Ein zweites Urteil ueber dieselbe Frage waere hier eine Zeile Arbeit
          und spaeter ein stiller Widerspruch. */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h2 className="mb-1 text-sm font-medium text-gray-700">
          Verwendete Events
        </h2>
        <p className="mb-3 text-xs text-gray-500">
          Aus der Konfiguration dieses Projekts abgeleitet
          {usedEvents.scope === "a-and-b"
            ? " — über beide Varianten."
            : "."}
        </p>
        {usedEvents.names.length === 0 ? (
          /* EIGENER WORTLAUT, bewusst NICHT "Noch keine Events." — den traegt die
             Statistik darunter, und er wird von einem Bestandstest woertlich
             behauptet. Zwei gleichlautende Leer-Texte im selben Bereich waeren
             ausserdem auf dem Bildschirm nicht auseinanderzuhalten. */
          <p className="text-xs text-gray-500">
            Noch keine Tracking-Events verknüpft.
          </p>
        ) : (
          <ul className="flex flex-col gap-1">
            {usedEvents.names.map((name) => (
              <li key={name} className="text-sm text-gray-700">
                {name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* CONVERSION-REGELN (Phase 11.1d). UNMITTELBAR NEBEN "Verwendete Events",
          und das ist eine Entscheidung: Dieser Abschnitt SCHLUESSELT gegen genau
          die Menge, die der Abschnitt darueber ANZEIGT. Stuende etwas dazwischen,
          muesste der Betreiber sich die Namen merken, statt sie danebenliegen zu
          haben.

          DIE UEBERSCHRIFT NENNT DAS ZIEL AUS TARGET_CARDS, nicht aus einem eigenen
          Text: Der Anzeigename je Ziel steht dort bereits genau einmal, und ein
          zweiter hier liefe beim naechsten Umbenennen auseinander.

          KEINE AUSSAGE DER FORM "VOLLSTAENDIG" und keine ueber die WIRKUNG: Die
          Flaeche sagt, welche Zuordnung KONFIGURIERT ist. Ob das Ziel sie annimmt,
          sagt sie nicht — dieselbe Wortwahl-Disziplin wie beim Abschnitt darueber.

          scope WIRD UEBERNOMMEN, NICHT NEU GEBILDET: dieselbe Aussage aus derselben
          Ableitung wie oben. Ein zweites Urteil ueber dieselbe Frage waere hier eine
          Zeile Arbeit und spaeter ein stiller Widerspruch — die Flaeche behauptete
          sonst Vollstaendigkeit ueber eine Variante, die es gar nicht gibt.

          NICHT AN projectId GEGATET, wie der Abschnitt darueber und anders als die
          beiden darunter: Die Namen stammen aus dem Editor-Zustand und die
          Zuordnung aus dem Einstellungs-Blob — keine Abfrage, keine Zeile, kein
          Geheimnis, das ein Gate zu schuetzen haette. */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h2 className="mb-1 text-sm font-medium text-gray-700">
          Conversion-Regeln ({TARGET_CARDS[rulesTarget].name})
        </h2>
        <p className="mb-3 text-xs text-gray-500">
          Je verwendetem Event eine Regel-Kennung des Ziels
          {usedEvents.scope === "a-and-b"
            ? " — über beide Varianten."
            : "."}
        </p>
        {usedEvents.names.length === 0 ? (
          /* EIGENER WORTLAUT, bewusst NICHT der des Abschnitts darueber: Zwei
             gleichlautende Leer-Texte unmittelbar uebereinander waeren auf dem
             Bildschirm nicht auseinanderzuhalten, und ein Bestandstest behauptet
             den oberen woertlich. Er nennt ausserdem die FOLGE ("nichts
             zuzuordnen") statt nur den Zustand — sonst liest sich ein leerer
             Kasten wie ein Ladefehler. */
          <p className="text-xs text-gray-500">
            Ohne verknüpfte Events gibt es nichts zuzuordnen.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {usedEvents.names.map((name) => (
              <li key={name}>
                <label className="flex flex-col gap-1 text-sm">
                  <span className="font-medium text-gray-700">{name}</span>
                  <input
                    type="text"
                    value={conversionRuleFor(name)}
                    onChange={(e) => onConversionRuleChange(name, e.target.value)}
                    placeholder="Regel-Kennung eintragen"
                    className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  />
                </label>
              </li>
            ))}
          </ul>
        )}
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
            {/* WAS DIESE ZAHL MISST — GEMESSEN am 2026-08-12, nur der TEXT wurde
                geaendert: Die Bestaetigung, aus der der Zaehler entsteht, haengt am
                LADEN VON METAS SCRIPT. Ohne Metas Kennung entsteht NIE eine
                browser-Zeile, und die Kachel bleibt dauerhaft im Neutral-Status.
                Die Zahl ist also die Blockrate GENAU EINES Anbieters.
                WARUM DIE ZEILE UEBERHAUPT NOETIG WURDE: Mit EINEM Ziel war
                "Adblocker-Verlust" dasselbe wie "Blockrate dieses Anbieters". Seit
                Phase 11 traegt ein Projekt bis zu drei Ziele — die Ueberschrift
                klingt seither breiter, als die Zahl deckt, und sie steht in der
                OBERFLAECHE, nicht in einer Doku.
                "ALLEIN" IST DAS TRAGENDE WORT: Es sagt, dass die uebrigen Ziele
                NICHT eingehen, ohne vorauszusetzen, dass es welche gibt — der Satz
                bleibt fuer ein Projekt mit nur einem Ziel genauso wahr.
                SIE STEHT AUSSERHALB DER VERZWEIGUNG, und das ist eine Entscheidung:
                Der Neutral-Status ("Warte auf erste Bestaetigung") war ueber den
                GRUND genauso stumm wie die Zahl. Hier erklaert dieselbe Zeile das
                Schweigen mit — ein Projekt ohne Metas Kennung sieht jetzt, WORAUF
                gewartet wird. Eine zweite, eigene Zeile fuer den Neutral-Fall waere
                eine Zeile mehr in einer Seitenspalte, in der Wachstum anderes
                verdraengt.
                DER NAME KOMMT AUS DER KONSTANTE, nicht als Literal: TARGET_CARDS ist
                Record<TrackingTarget, …>, der Zugriff also compiler-geprueft. Wird
                das Ziel in TRACKING_TARGETS umbenannt, ist diese Zeile ein
                BUILD-Fehler statt einer Beschriftung, die still auf einen Anbieter
                zeigt, den es nicht mehr gibt.
                SIE BESCHREIBT, SIE EMPFIEHLT NICHT: keine Handlungsaufforderung,
                kein Hinweis auf weitere Ziele. Die Kachel sagt, was sie misst.
                WAS SIE NICHT BEHEBT (Vorrat/Abschnitt 8 der Standdatei): dass bei
                ABGELEHNTER Einwilligung fuer dieses Ziel der Nenner ohne den Zaehler
                waechst. Das ist ein DEFEKT und braucht eine Ziel-Dimension auf den
                Ereignissen — hier wurde nur der Text wahr. */}
            <p className="mb-2 text-xs text-gray-500">
              Gemessen allein am {TARGET_CARDS.meta.name}-Pixel.
            </p>
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
