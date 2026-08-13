"use client";

import { useState } from "react";
import { removeCapiToken, setCapiToken } from "@/app/projects/actions";
import { actionThrew, safeAction } from "@/lib/safe-action";
import type { TrackingTarget } from "@/lib/settings";
import { hasPixelId } from "@/lib/tracking/target-readiness";

/**
 * DIE KARTE JE PLATTFORM (Phase 11, sechste Scheibe, zweite Haelfte).
 *
 * Eine Karte traegt Name, oeffentliche Kennung, Zugangsdaten und den Status EINES
 * Ziels. Sie ist die zweite Ansicht im Repo mit EIGENEM Zustand — die erste ist
 * DomainManager, und ihr Muster ist hier absichtlich abgeschrieben statt neu
 * erfunden: eigener Zustand plus `key` am Projektwechsel plus die Flaechengrenze
 * des Drawers.
 *
 * WARUM EIGENER ZUSTAND UND NICHT FUENF PROP-SAETZE IM CONTAINER: Die fuenf Werte
 * (Eingabe, Status, Fehler, Bestaetigung, Busy) beschreiben je einen Vorgang an
 * EINEM Zugangsdatum. Im Container muessten sie je Ziel vervielfacht und an zwei
 * Reset-Stellen je Ziel wieder geleert werden — und eine davon koennte ein Ziel
 * vergessen, ohne dass etwas rot wird. Hier loest der Mount das Aufraeumen.
 *
 * WAS DIESE KARTE NICHT TUT — und der Absatz steht hier, damit niemand sie fuer
 * mehr haelt, als sie ist:
 * - SIE SENDET NICHTS. Sie legt Zugangsdaten ab, mehr nicht. Der Satz stand hier
 *   bis zur zwoelften Scheibe mit der Begruendung "es gibt keinen Adapter" — DIESE
 *   BEGRUENDUNG TRAEGT NICHT MEHR (beide Ziele haben seither einen), DIE AUSSAGE
 *   SCHON: Was sendet, ist der Ingest-Pfad; die Karte hinterlegt nur. Fuer ein Ziel
 *   ohne AUSLIEFERUNG sagt sie das weiterhin ausdruecklich (s. hasAdapter) — heute
 *   trifft das auf keines zu.
 * - SIE BEHAUPTET KEINE WIRKUNG. Der Statustext sagt, ob Zugangsdaten HINTERLEGT
 *   sind — nie, ob sie funktionieren. Eine Geheimnis-Zeile existiert auch bei
 *   widerrufenem Token; genau dieser Fall ist im Projekt schon einmal live
 *   eingetreten und blieb lautlos.
 * - SIE TRAEGT KEIN LOGO und keinen Platz dafuer. Im Produkt gibt es keine
 *   Bildquelle, kein Icon-System und keine Konvention; ein reservierter leerer
 *   Platz saehe nach einem Fehler aus. Das Erkennungszeichen ist der NAME.
 * - SIE TRAEGT KEINE UEBERSCHRIFTEN-ROLLE mit dem Namen eines Abschnitts. Der
 *   Reihenfolge-Test der Phase 10 waehlt Abschnitte ueber `role="heading"`; eine
 *   gleichnamige Karten-Ueberschrift machte ihn mehrdeutig.
 */

/** Die drei Zustaende der Karte. `null` heisst NOCH NICHT GELADEN. */
export type ConfiguredState = boolean | null;

/**
 * Was eine Plattform an Beschriftung mitbringt.
 *
 * ZIEL-SPEZIFISCHE BESCHRIFTUNGEN SIND FACHLICH BEGRUENDET, NICHT TEST-GETRIEBEN:
 * "CAPI-Token" ist METAS Vokabular — Pinterest hat keinen CAPI-Token. Ein
 * gemeinsamer Text waere fachlich falsch UND machte jede Abfrage mehrdeutig, die
 * heute auf Metas Begriffe zeigt. Beides zeigt in dieselbe Richtung; die Fachlage
 * ist der Grund, die Eindeutigkeit die Folge.
 *
 * DAS FELD hasAdapter IST MIT SCHEIBE C2 ENTFALLEN. Es stand hier und steuerte den
 * Folgenlosigkeits-Hinweis — und war damit die ZWEITE Behauptung ueber dieselbe
 * Tatsache neben den Ziel-Zweigen im Verteiler; die beiden waren durch nichts
 * verbunden. Die Tatsache steht jetzt EINMAL, in TARGETS_WITH_ADAPTER
 * (lib/tracking/target-adapters.ts), und erreicht diese Karte als PROP.
 * WARUM ALS PROP UND NICHT DURCH EIGENEN ZUGRIFF AUF DIE LISTE: Nur so ist der
 * Hinweis-Zweig im Test erreichbar, ohne Modulzustand zu mutieren — und genau das
 * ist hier schon einmal begruendet verworfen worden (s. den Zweig selbst).
 * DIESE KONFIGURATION BESCHREIBT SEITHER NUR NOCH BESCHRIFTUNGEN. Ueber Adapter
 * behauptet sie nichts mehr.
 */
export type TargetCardConfig = {
  name: string;
  publicLabel: string;
  publicHint: string;
  publicPlaceholder: string;
  secretLabel: string;
  secretPlaceholderNew: string;
  secretPlaceholderReplace: string;
};

export const TARGET_CARDS: Record<TrackingTarget, TargetCardConfig> = {
  meta: {
    name: "Meta",
    publicLabel: "Meta-Pixel-ID",
    publicHint: "Öffentlich, steht im Seitenquelltext",
    publicPlaceholder: "z.B. 123456789012345",
    secretLabel: "Meta CAPI-Token",
    secretPlaceholderNew: "CAPI-Token einfügen",
    secretPlaceholderReplace: "Neuen Token eingeben zum Ersetzen",
  },
  // DIE DREI OEFFENTLICHEN FELDER NENNEN DIE KONTO-KENNUNG (Phase 11, elfte
  // Scheibe). Sie nannten bis dahin die TAG-Kennung des Browser-Tags — und den
  // injizieren wir gar nicht; der Adapter braucht die Kennung, die im
  // Endpunkt-PFAD steht. Zwei verschiedene Nummern im selben Anbieter-Konto,
  // und der Unterschied ist fuer den Betreiber unsichtbar.
  //
  // (1) DAS ANBIETER-PRAEFIX BLEIBT, obwohl der Kartenname es schon traegt: Die
  //     Karte des ersten Ziels ist genauso gebaut ("Meta-Pixel-ID"). Zwei
  //     Beschriftungen in verschiedener Bauart waeren schlechter als eine lange.
  //     "Anzeigenkonto-ID" ist der Wortlaut, den der Betreiber im Anbieter-Konto
  //     wiederfindet — nicht die interne Bezeichnung "Konto-Kennung" und nicht
  //     der Schnittstellen-Name ad_account_id.
  // (2) DER HILFETEXT TRIFFT EINE DOPPELAUSSAGE, die auf dieser Karte bisher
  //     keinen Ausdruck hatte: HERKUNFT plus ABGRENZUNG. Er ist NICHT mehr der
  //     des ersten Ziels — dort ist "steht im Seitenquelltext" wahr, weil
  //     buildMetaRuntime die Kennung als PS_PIXEL_ID einbettet; hier injiziert
  //     kein Erzeuger etwas, es landet allein der Consent-Schluessel. "Server-…"
  //     ist ausgeschlossen, weil es mit dem Untertext des Geheimnis-Feldes
  //     kollidierte ("Server-Side, geheim") — und genau dieser Unterschied ist
  //     das, was die Karte erklaeren muss.
  // (3) DER PLATZHALTER IST ABSTEIGEND, damit er nicht als Kuerzung von Metas
  //     aufsteigendem Beispiel gelesen wird. Er darf Metas Zeichenkette nicht
  //     ENTHALTEN — CodeImporter.test.tsx waehlt Metas Feld ueber dessen
  //     Platzhalter, per Teilstring-Muster.
  pinterest: {
    name: "Pinterest",
    publicLabel: "Pinterest-Anzeigenkonto-ID",
    publicHint: "Aus dem Anzeigenkonto, nicht im Seitenquelltext",
    publicPlaceholder: "z.B. 987654321098",
    secretLabel: "Pinterest-Zugangsdaten",
    secretPlaceholderNew: "Zugangsdaten einfügen",
    secretPlaceholderReplace: "Neue Zugangsdaten eingeben zum Ersetzen",
  },
  // DAS DRITTE ZIEL. Die oeffentliche Kennung heisst hier tatsaechlich Pixel-ID —
  // anders als beim zweiten Ziel, wo der Adapter die ANZEIGENKONTO-Kennung braucht
  // und die Karte deshalb umbenannt werden musste. Der Hilfetext folgt derselben
  // Doppelaussage wie dort (HERKUNFT plus ABGRENZUNG): Die Kennung stammt aus dem
  // Events Manager des Anbieters, und wir injizieren KEIN Browser-Tag — im
  // Seitenquelltext landet allein der Consent-Schluessel.
  // DER PLATZHALTER IST ABSTEIGEND und enthaelt Metas aufsteigende Beispielziffern
  // NICHT: CodeImporter.test.tsx waehlt Metas Feld ueber dessen Platzhalter, per
  // Teilstring-Muster.
  tiktok: {
    name: "TikTok",
    publicLabel: "TikTok-Pixel-ID",
    publicHint: "Aus dem Events Manager, nicht im Seitenquelltext",
    publicPlaceholder: "z.B. CABCDE0123FGHIJKLMNO",
    secretLabel: "TikTok-Zugangsdaten",
    secretPlaceholderNew: "Zugangsdaten einfügen",
    secretPlaceholderReplace: "Neue Zugangsdaten eingeben zum Ersetzen",
  },
};

/** Die drei erlaubten Statustexte. Mehr gibt es nicht, und das ist die Zusage. */
export const STATUS_LOADING = "Wird geladen";
export const STATUS_UNCONFIGURED = "Nicht konfiguriert";
export const STATUS_CONFIGURED = "Zugangsdaten hinterlegt";

/**
 * DIE ZEILE UEBER DIE AUSLIEFERUNG (Phase 11, Scheibe B2). Sie erscheint, wenn
 * Zugangsdaten hinterlegt sind und die KENNUNG fehlt — ein Zustand, der bis hierher
 * auf keinem Kanal sichtbar war: Die Karte sagte "Zugangsdaten hinterlegt", der
 * Auflaesungs-Pfad nahm das Ziel nie auf, und niemand erfuhr es.
 *
 * SIE IST EINE FUNKTION UND KEIN FESTER TEXT, weil ihr variabler Teil die
 * BESTEHENDE Beschriftung des oeffentlichen Feldes dieser Karte ist
 * (TargetCardConfig.publicLabel). DER GRUND GEHOERT HIERHER: Ein fest verdrahtetes
 * Wort widerspraeche der Karte, auf der die Zeile steht, sobald ein Ziel sein Feld
 * anders nennt — und genau das ist eingetreten, das zweite Ziel fragt nach der
 * Anzeigenkonto-Kennung und nicht nach einer Pixel-ID. Es gibt deshalb KEINE zweite
 * Bezeichnung fuer dasselbe Feld; die Zeile zitiert die Beschriftung, die zwei
 * Zeilen weiter unten am Eingabefeld steht.
 *
 * BENANNT UND EXPORTIERT, damit die Tests sie AUFRUFEN statt abzuschreiben: Eine
 * abgeschriebene Zeichenkette im Test bliebe gruen, wenn hier jemand den Wortlaut
 * aendert — sie prueft dann nur noch sich selbst.
 */
export function noDeliveryText(publicLabel: string): string {
  return `Ohne ${publicLabel} wird an dieses Ziel nichts gesendet.`;
}

export default function TargetCard({
  projectId,
  target,
  hasAdapter,
  pixelId,
  savedPixelId,
  onPixelIdChange,
  configured,
  onCredentialsSaved,
  onCredentialsRemoved,
}: {
  projectId: string | null;
  target: TrackingTarget;
  /**
   * Bringt DIESER BUILD fuer das Ziel einen Empfaenger mit? (Scheibe C2)
   *
   * KEINE EIGENSCHAFT DES PROJEKTS, sondern des Builds — sie aendert sich nur mit
   * einem Deploy. Abgeleitet wird sie in MeasureView aus TARGETS_WITH_ADAPTER
   * (lib/tracking/target-adapters.ts), der EINEN Quelle; dieselbe Liste bindet den
   * Verteiler im Ingest-Pfad.
   *
   * PFLICHTIG UND NICHT OPTIONAL: Ein Default liesse eine vergessene Aufrufstelle
   * still durchrutschen — und zwar in die gefaehrliche Richtung, denn der
   * naheliegende Default waere "hat einen Adapter". So ist eine vergessene Stelle
   * ein BUILD-Fehler.
   */
  hasAdapter: boolean;
  pixelId: string;
  /**
   * Die zuletzt GESPEICHERTE Kennung dieses Ziels — NICHT die im Feld stehende.
   *
   * ZWEI WERTE FUER DIESELBE SACHE, UND DAS IST ABSICHT: `pixelId` ist, was der
   * Betreiber gerade tippt (das Feld muss es zeigen); dieser Wert ist, was
   * ausgeliefert wird. Die Zeile ueber die AUSLIEFERUNG haengt am zweiten, denn
   * eine Aussage darueber, dass nichts gesendet wird, darf nicht beim Tippen
   * verschwinden — der Forward liest die Datenbank, nicht das Formular.
   *
   * PFLICHTIG UND NICHT OPTIONAL: Ein Default liesse eine vergessene Aufrufstelle
   * still auf "" zurueckfallen, und die Karte behauptete dort dauerhaft, es werde
   * nichts gesendet. So ist eine vergessene Stelle ein BUILD-Fehler.
   */
  savedPixelId: string;
  onPixelIdChange: (value: string) => void;
  /** null = noch nicht geladen. S. den Kommentar an der Statuszeile unten. */
  configured: ConfiguredState;
  /**
   * Erfolgs-Rueckruf an den Container. Er traegt die Projekt-Kennung, AUF DIE er
   * sich bezieht — der Container vergleicht sie gegen die aktuelle, bevor er
   * spiegelt. Ohne dieses Argument koennte er es nicht: ein Nachzuegler nach einem
   * Projektwechsel sieht im Container nur noch das NEUE Projekt.
   *
   * Er traegt AUSSERDEM das Ziel: der Container haelt die Liste der konfigurierten
   * Ziele, aus der sich `configured` speist. Ohne dieses Argument wuesste er nach
   * einer Mutation nicht, WELCHER Eintrag hinzukommt oder faellt — der Indikator
   * bliebe bis zum naechsten Projektwechsel auf dem alten Stand stehen.
   */
  onCredentialsSaved: (
    forProjectId: string,
    target: TrackingTarget,
    trackingKey: string,
  ) => void;
  onCredentialsRemoved: (forProjectId: string, target: TrackingTarget) => void;
}) {
  const config = TARGET_CARDS[target];

  // DIE FUENF ZUSTAENDE — hier statt im Container. Ihre Lebensdauer ist der MOUNT
  // dieser Karte, und der endet an zwei Grenzen: beim Projektwechsel (`key`) und
  // beim Schliessen des Drawers (der wird als Ganzes abgebaut).
  // DAS IST FUER ZWEI VON IHNEN EINE VERHALTENSAENDERUNG, und sie ist entschieden:
  // Bestaetigung und Busy-Flag ueberlebten bisher das Schliessen der Flaeche. Ein
  // halb bestaetigter Loesch-Dialog, der Stunden spaeter scharf dasteht, ist selbst
  // ein Problem — die Projektregel fuehrt ihn als BELEG fuer die Gefahr an.
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [error, setError] = useState<string | null>(null);
  const [confirming, setConfirming] = useState(false);
  const [removing, setRemoving] = useState(false);

  async function handleSave() {
    if (!projectId) return;
    if (!input.trim()) return;
    setStatus("saving");
    setError(null);
    // Die Karte kennt ihr Ziel und reicht es selbst durch — der Container muss es
    // nicht wissen. Das ist der ganze Zweck der Ziel-Dimension aus Haelfte A.
    const result = await safeAction(
      () => setCapiToken(projectId, target, input),
      actionThrew()
    );
    if (result.ok) {
      // KEIN Zustands-Schreiben vor dem Rueckruf und keines danach, das von ihm
      // abhinge: Ist die Karte inzwischen ausgehaengt, laufen diese Zeilen ins
      // Leere (React verwirft setState auf ausgehaengten Komponenten), und der
      // Container weist den Rueckruf ueber die Projekt-Kennung ab.
      onCredentialsSaved(projectId, target, result.trackingKey);
      setInput("");
      setStatus("saved");
    } else {
      setError(result.error);
      setStatus("error");
    }
  }

  async function handleRemove() {
    if (!projectId || removing) return;
    setRemoving(true);
    setError(null);
    const result = await safeAction(
      () => removeCapiToken(projectId, target),
      actionThrew()
    );
    if (result.ok) {
      onCredentialsRemoved(projectId, target);
      setConfirming(false);
      setRemoving(false);
      setStatus("idle");
    } else {
      setRemoving(false);
      setConfirming(false);
      setError(result.error);
      setStatus("error");
    }
  }

  // DIE STATUSZEILE — DREI ZUSTAENDE, NICHT ZWEI.
  //
  // `configured === null` heisst NOCH NICHT GELADEN. Ohne diesen Fall zeigte die
  // Karte im unsichersten Moment die STAERKERE Aussage ("nicht konfiguriert") —
  // genau gegen die Entscheidung, dass sie nur sagt, was sie weiss.
  //
  // BENANNTE SCHWAECHE, NICHT BEHOBEN (Backlog): Die Ableitung im Container
  // (listConfiguredTargets) antwortet auf JEDEN Fehler — fehlende Sitzung, fremdes
  // Projekt, Datenbankfehler — mit einer LEEREN Liste. Diese Karte liest daraus
  // "nicht konfiguriert", obwohl sie in Wahrheit NICHTS weiss. Ein vierter Zustand
  // liesse sich hier NICHT ehrlich ableiten: Der Unterschied entsteht in
  // src/app/projects/actions.ts, und jene Datei ist in dieser Haelfte unantastbar
  // (Haelfte A ist abgeschlossen und live geprueft). Wer den Fall beheben will,
  // faengt DORT an — nicht hier mit einem Notbehelf, der raet.
  const statusText =
    configured === null
      ? STATUS_LOADING
      : configured
        ? STATUS_CONFIGURED
        : STATUS_UNCONFIGURED;

  return (
    <div className="rounded-md border border-gray-200 px-3 py-3">
      {/* NAME, KEINE UEBERSCHRIFTEN-ROLLE. Ein <h3> traege eine Rolle, ueber die
          der Reihenfolge-Test der Phase 10 Abschnitte waehlt; die Karten sollen
          dort nicht mitspielen. */}
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <span className="text-sm font-medium text-gray-800">{config.name}</span>
        {/* GEWICHT, KEINE BEHAUPTUNG. Der Zuschnitt verbietet eine AUSSAGE, nicht
            SICHTBARKEIT — "Zugangsdaten hinterlegt" ist wahr, und der Betreiber
            braucht nach dem Speichern einen Anker. Deshalb bekommt NUR dieser
            Zustand eine Flaeche; die beiden anderen behalten ihr Gewicht.
            AUSDRUECKLICH NEUTRAL, und das ist die Grenze, nicht Geschmack: KEIN
            Gruen, kein Haken, kein Punkt. Gruen heisst in der Bildsprache jeder
            Oberflaeche "laeuft" — genau die Aussage, die hier nicht gehalten
            wird. Der Ausfall der dritten Scheibe (Token widerrufen, Anzeige
            gruen, Forward tot) ist der Grund. Ein Test haelt die Grenze. */}
        <span
          className={
            configured === null
              ? "text-xs text-gray-400"
              : configured
                ? "rounded-md bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-900"
                : "text-xs text-gray-500"
          }
        >
          {statusText}
        </span>
      </div>

      {/* Der Folgenlosigkeits-Hinweis (Invariante 6). Er sagt etwas ueber die
          AUSLIEFERUNG, der Status etwas ueber die ZUGANGSDATEN — zwei verschiedene
          Sachen, deshalb zwei Zeilen und kein Zusatz im Statustext. Ein Zusatz
          dort haette den entschiedenen Wortlaut verhandelbar gemacht.

          UNERREICHT IM BETRIEB, ABER SEIT SCHEIBE C2 BEWEISBAR — und das ist der
          Unterschied, den diese Scheibe an dieser Stelle macht: Solange jedes
          bekannte Ziel in TARGETS_WITH_ADAPTER steht, erreicht ihn kein Betrieb.
          ERREICHEN kann ihn aber jetzt jeder Test, denn die Tatsache kommt als PROP
          herein und nicht mehr aus einem Modul-Objekt.
          HIER STAND, ER SEI NUR UEBER DIE DATEN PRUEFBAR, und ein Test, der ihn ueber
          eine Laufzeit-Mutation von TARGET_CARDS erzwaenge, sei VERWORFEN (er
          koppelte sich an die Reihenfolge der Tests — die Klasse, die in der elften
          Scheibe fuenf statt drei Tests hat fallen lassen). DIE VERWERFUNG BLEIBT
          RICHTIG; sie hat sich nur erledigt, weil es die Modul-Mutation nicht mehr
          braucht.
          ER BLEIBT AUS DEMSELBEN GRUND WIE VORHER: fuer den Moment, in dem ein Ziel
          ohne Empfaenger dazukommt. Dann genuegt es, es NICHT in die Liste zu
          schreiben, und die Karte sagt es von selbst. */}
      {!hasAdapter && (
        <p className="mb-2 text-xs text-gray-500">
          Auslieferung folgt — dieses Ziel sendet noch nicht.
        </p>
      )}

      {/* DIE ZEILE UEBER DIE AUSLIEFERUNG (Scheibe B2). Sie steht bewusst HIER und
          nicht im Statustext: Die Karte hat diese Trennung schon getroffen (s. den
          Kommentar am Hinweis darueber) — der Status sagt etwas ueber die
          ZUGANGSDATEN, diese Zeile etwas ueber die AUSLIEFERUNG. "Zugangsdaten
          hinterlegt" ist wahr und bleibt wortgleich stehen; was fehlte, war die
          zweite Aussage daneben.

          DIE BEDINGUNG LIEST DEN GESPEICHERTEN WERT, NICHT DEN GETIPPTEN. Am
          laufenden Wert waere sie in genau den zwei Faellen falsch, in denen jemand
          gerade handelt: Wer eine Kennung eintippt und nicht speichert, bekaeme eine
          ENTWARNUNG fuer ein Ziel, das weiterhin nichts empfaengt; wer sie loescht
          und nicht speichert, einen ALARM fuer eines, das unveraendert beliefert
          wird.

          DIE GRENZE, und sie gehoert an diese Stelle: Der gespeicherte Zustand ist
          ein SPIEGEL des zuletzt geladenen bzw. erfolgreich gespeicherten Standes,
          NICHT die Datenbank. Ein zweiter Tab, der dasselbe Projekt speichert, macht
          ihn stumm veraltet. Er ist der beste verfuegbare Stellvertreter OHNE eine
          neue Abfrage — und er ist dieselbe Bauform, die das Projekt fuer den
          Publish-Zustand schon einsetzt (settings.hosting als Spiegel der
          domains-Zeile).

          `configured === true` STATT `configured`: Der Nicht-geladen-Fall ist falsy
          und wuerde sonst mitgefangen — die Karte behauptete im unsichersten Moment,
          es werde nichts gesendet. Dieselbe Dreiwertigkeit wie beim Statustext.

          hasPixelId IST DIE GETEILTE BEDINGUNG (lib/tracking/target-readiness.ts),
          KEINE zweite Ausformulierung: Genau dieses Praedikat entscheidet seit
          Scheibe B1 auch im Aufloesungs-Pfad, ob ein Ziel eine Kennung traegt. Wer
          hier `savedPixelId !== ""` schreibt, hat wieder zwei Wahrheiten. */}
      {configured === true && !hasPixelId(savedPixelId) && (
        <p className="mb-2 text-xs text-gray-500">
          {noDeliveryText(config.publicLabel)}
        </p>
      )}

      <div className="flex flex-col gap-3">
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">
            {config.publicLabel}
            <span className="block text-xs font-normal text-gray-400">
              {config.publicHint}
            </span>
          </span>
          <input
            type="text"
            inputMode="numeric"
            value={pixelId}
            onChange={(e) => onPixelIdChange(e.target.value)}
            placeholder={config.publicPlaceholder}
            className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>

        {/* Zugangsdaten: GEHEIM, write-only. Der echte Wert geht nur in die
            Server-Action und kommt NIE zurueck -> das Feld startet und bleibt
            leer, gespeist wird es NIE aus einem geladenen Wert. */}
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">
            {config.secretLabel}
            <span className="block text-xs font-normal text-gray-400">
              Server-Side, geheim
            </span>
          </span>
          {/* DAS FELD STEHT ALLEIN, DIE KNOEPFE DARUNTER — im Betrieb gefunden:
              Sobald der Entfernen-Knopf erscheint, teilten sich Feld und ZWEI
              Knoepfe eine Zeile, und der Platzhalter war abgeschnitten ("Neuen
              To"). Die Ursache ist HAUSGEMACHT: die ziel-spezifischen Namen aus
              E3 brauchen mehr Platz als die frueheren "Setzen"/"Entfernen". Das
              Feld darf ihn nicht bezahlen — der laengste Platzhalter gehoert zum
              laengsten Zielnamen, und beide muessen gleichzeitig passen. */}
          <div className="flex w-full max-w-xs flex-col gap-2">
            <input
              type="password"
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={!projectId}
              placeholder={
                configured
                  ? config.secretPlaceholderReplace
                  : config.secretPlaceholderNew
              }
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
            />
            {/* flex-wrap wie in der Bestaetigungszeile darunter: bei langen
                Zielnamen bricht die Knopfzeile um, statt zu draengen. */}
            <div className="flex flex-wrap items-center gap-2">
              {/* ZIEL-SPEZIFISCHER NAME. Zwei Karten traegen sonst zwei Knoepfe
                  desselben Namens — und im selben Drawer steht bereits ein
                  "Entfernen" je Domain-Zeile. Die Projektregel nennt zwei gleich
                  benannte Bedienelemente mit verschiedener Wirkung ein
                  Oberflaechen-Problem; diese Karte darf es nicht verschaerfen. */}
              <button
                type="button"
                onClick={handleSave}
                disabled={!projectId || !input.trim() || status === "saving"}
                className="shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {status === "saving" ? "…" : `${config.name} speichern`}
              </button>
              {projectId && configured && !confirming && (
                <button
                  type="button"
                  onClick={() => setConfirming(true)}
                  disabled={removing}
                  className="shrink-0 rounded-md border border-red-200 px-2 py-2 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {config.name} entfernen
                </button>
              )}
            </div>

            {/* Zweistufige Bestaetigung. AUCH SIE TRAEGT DEN ZIEL-NAMEN: Zwei
                Karten koennen ihre Bestaetigung GLEICHZEITIG offen haben — sie
                halten getrennte Zustaende, und nichts schliesst die eine, wenn die
                andere aufgeht. Ein blosses "Ja, entfernen" waere dann zweimal da,
                und im selben Drawer steht es bereits bei der Domain-Zeile und bei
                Variante B. Am Code entschieden, nicht aus Vorsicht. */}
            {confirming && (
              <div className="flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
                <span className="text-xs text-red-700">
                  Zugangsdaten für {config.name} löschen?
                </span>
                <button
                  type="button"
                  onClick={handleRemove}
                  disabled={removing}
                  className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                >
                  {removing ? "Entferne…" : `Ja, ${config.name} entfernen`}
                </button>
                <button
                  type="button"
                  onClick={() => setConfirming(false)}
                  disabled={removing}
                  className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Abbrechen
                </button>
              </div>
            )}

            {status === "saved" && (
              <span className="text-xs text-green-600">Zugangsdaten gespeichert</span>
            )}
            {status === "error" && error && (
              <span className="text-xs text-red-600">{error}</span>
            )}
          </div>
        </label>
      </div>
    </div>
  );
}
