"use client";

import { useState } from "react";
import { removeCapiToken, setCapiToken } from "@/app/projects/actions";
import { actionThrew, safeAction } from "@/lib/safe-action";
import { hasTargetPixelId, type TrackingTarget } from "@/lib/settings";
// DIE BESCHRIFTUNGEN LIEGEN SEIT DER SCHEIBE 3 IN EINEM REINEN lib-MODUL und NICHT mehr
// hier. Grund und die verworfenen Alternativen stehen in dessen Kopf; kurz: setCapiToken
// ("use server") muss dieselbe Quelle lesen wie diese Karte, und ein reines Modul ist der
// einzige Weg ueber diese Grenze, der unter beiden Ausgaengen einer nicht entscheidbaren
// Frage traegt. DIESE DATEI RE-EXPORTIERT NICHTS — zwei Adressen fuer eine Sache waeren
// genau das Problem, das der Umzug beseitigt.
import { TARGET_CARDS } from "@/lib/tracking/target-cards";
// NUR DER TYP. Die Berechnung laeuft in der Aktion, die Ableitung in MeasureView;
// diese Karte ZEIGT die Lage und bildet sie nicht. Das reine Modul traegt keine
// Direktive und zieht nichts aus secrets/ in dieses Buendel — s. seinen Kopf.
import type { TargetCredentialState } from "@/lib/tracking/credential-state";

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
 *   NACHGEZOGEN 11.1a, NICHT UMFORMULIERT: Der letzte Halbsatz ist ueberholt. Seit dem
 *   vierten Ziel trifft es auf GENAU EINES zu ('linkedin' — in TRACKING_TARGETS, nicht
 *   in TARGETS_WITH_ADAPTER). Die Aussage davor bleibt unveraendert richtig.
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

/**
 * Die VIER Zustaende der Karte. `null` heisst NOCH NICHT GELADEN.
 *
 * ERWEITERT MIT SCHEIBE 11.2b UM "unknown" — der Satz "die drei Zustaende" stand hier
 * und ist ersetzt, nicht gestempelt: Ein Typ ist keine Beschreibung, die altern darf.
 * `"unknown"` heisst GELADEN, ABER NICHTS GEWUSST — die Lage-Aktion ist gescheitert,
 * und dann ist jede Aussage ueber die Zugangsdaten eine Behauptung ohne Grundlage.
 *
 * DER WERT WIRD NICHT HIER GEBILDET, sondern in resolveConfigured
 * (lib/tracking/credential-state.ts). Dort steht auch die Vorrangregel und ihr Grund;
 * DIESE DATEI TRIFFT KEINE ZWEITE ENTSCHEIDUNG DARUEBER.
 * DIE KOPPLUNG IST STRUKTURELL UND NICHT UEBER EINEN IMPORT: Jene Funktion gibt
 * `boolean | null | "unknown"` zurueck und importiert diesen Typ NICHT — die Richtung
 * Client -> rein gilt nicht, und ein zweiter NAME waere eine zweite Wahrheit. Ein Lauf
 * haelt die Zuweisbarkeit fest.
 */
export type ConfiguredState = boolean | null | "unknown";

/** Die VIER erlaubten Statustexte. Mehr gibt es nicht, und das ist die Zusage. */
export const STATUS_LOADING = "Wird geladen";
export const STATUS_UNCONFIGURED = "Nicht konfiguriert";
export const STATUS_CONFIGURED = "Zugangsdaten hinterlegt";
/**
 * DER VIERTE TEXT (Scheibe 11.2b).
 *
 * ER BEHAUPTET NICHTS UEBER DIE ZUGANGSDATEN, und genau das ist sein Zweck. Er steht
 * nur da, wo die Lage-Aktion gescheitert ist — nicht bei "keine Zeile" und nicht beim
 * Laden.
 * KEIN WORT AUS DER VERBOTEN-LISTE des Wirkungs-Waechters in TargetCard.test.tsx.
 */
export const STATUS_UNKNOWN = "Zustand unbekannt";

/**
 * DER TEXT DER DRITTEN ZEILE — oder null, wenn keine steht (Scheibe 11.2b).
 *
 * ZWEI LAGEN ERZEUGEN AUSDRUECKLICH KEINE ZEILE:
 * · `no_clock` — die vier Klartext-Ziele. Sie haben keine Nutzlast und keine Uhr; ein
 *   Ablaufdatum dort waere ERFUNDEN. Die Aktion selektiert die Klartext-Spalte nicht
 *   einmal, es gibt also gar keinen Wert, aus dem eines zu lesen waere. EIN LAUF MIT
 *   POSITIVKONTROLLE HAELT DAS FEST — ohne sie waeren "kein Datum" und "die Karte
 *   rendert gar nichts" am Ergebnis nicht zu unterscheiden.
 * · `null` — noch nicht geladen ODER die Aktion ist gescheitert ODER es gibt keine
 *   Zeile. Alle drei sagen dasselbe: Wir wissen nichts, also steht hier nichts. Die
 *   Unterscheidung traegt die STATUSZEILE.
 *
 * DIE ZEIT WIRD MIT toLocaleString("de-DE") FORMATIERT — dieselbe Hausform wie die
 * Varianten-Auswertung in MeasureView. KEIN timeZone-Parameter: er naehme dem Nutzer
 * seine lokale Zeit, und er ist dort schon einmal geprueft und verworfen worden.
 *
 * DER GRUND FUER DEN ROHEN `reason` IM UNLESBAR-FALL ist derselbe wie beim rohen
 * Ergebniscode des Autorisierungs-Flusses: Er kostet keine sieben Formulierungen und
 * macht einen Support-Fall trotzdem adressierbar. ER IST SELBSTVERGEBEN — ein
 * Mitglied unserer geschlossenen Union, kein Anbieter-Fremdtext.
 */
export function describeCredentialState(
  state: TargetCredentialState | null,
): string | null {
  if (state === null) return null;
  switch (state.kind) {
    case "no_clock":
      return null;
    case "unknown_expiry":
      return "Ablaufzeitpunkt unbekannt";
    case "unreadable":
      return `Zugangsdaten nicht lesbar (${state.reason})`;
    case "live":
      return `Zugang gültig bis ${formatEpochSeconds(state.expiresAt)}`;
    case "expiring":
      return `Zugang endet am ${formatEpochSeconds(state.expiresAt)} — bitte neu autorisieren`;
    case "dead":
      return `Zugang abgelaufen am ${formatEpochSeconds(state.expiredAt)} — bitte neu autorisieren`;
  }
}

/**
 * Epochensekunden als lesbarer Zeitpunkt.
 *
 * ES IST DIE ERSTE STELLE IM REPO, DIE EPOCHENSEKUNDEN ANZEIGT — bis zu dieser
 * Scheibe wurden sie ausschliesslich gerechnet und verglichen, nie dargestellt. Der
 * Faktor 1000 steht deshalb hier und nicht verstreut an drei Aufrufstellen.
 */
function formatEpochSeconds(seconds: number): string {
  return new Date(seconds * 1000).toLocaleString("de-DE");
}

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
  connectOutcome,
  configured,
  credentialState,
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
  /**
   * DER ERGEBNISCODE DES AUTORISIERUNGS-FLUSSES (Scheibe 3), oder null.
   *
   * ER KOMMT AUS DER ADRESSE und wird von der Server-Komponente hereingereicht — die
   * Karte liest keinen Query-Parameter selbst. Grund: Ein Lesen im Browser waere beim
   * ersten Render auf Server und Client verschieden; als Prop ist der Wert auf beiden
   * Seiten derselbe.
   *
   * PFLICHTIG UND NICHT OPTIONAL, aus demselben Grund wie savedPixelId: Ein Default
   * liesse eine vergessene Aufrufstelle still auf null zurueckfallen, und die Karte
   * schwiege dauerhaft ueber jeden Fehlschlag. So ist eine vergessene Stelle ein
   * BUILD-Fehler.
   *
   * ER WIRD NUR IM VERBINDEN-ZWEIG GELESEN, also nur auf einer Karte OHNE
   * Geheimnis-Feld. Das ist KEINE Fallunterscheidung ueber Zielnamen — die Karte fragt
   * nach ihrer eigenen Gestalt, nicht danach, wie das Ziel heisst.
   */
  connectOutcome: string | null;
  /** null = noch nicht geladen. S. den Kommentar an der Statuszeile unten. */
  configured: ConfiguredState;
  /**
   * DIE LAGE DER ABGELEGTEN ZUGANGSDATEN (Scheibe 11.2b), oder null.
   *
   * OPTIONAL — UND DAS IST EINE BEWUSSTE ABWEICHUNG VON DER NACHBARFORM, nicht eine
   * Nachlaessigkeit. Das Feld `renewable` an TrackingKeyResolution (lib/capi/token.ts)
   * ist ausdruecklich PFLICHTIG, weil dort ACHTZEHN Ganz-Objekt-Vergleiche mit toEqual
   * an der Aufloesung haengen und toEqual einen Schluessel mit dem Wert `undefined`
   * IGNORIERT (GEMESSEN 2026-08-18) — ein optionales Feld waere dort an allen achtzehn
   * STILL vorbeigegangen.
   * HIER GIBT ES KEINE SOLCHEN VERGLEICHE: Die Karten-Props werden nirgends als ganzes
   * Objekt gepinnt. Was es dagegen gibt, ist ein ECHTER dritter Zustand — "noch nicht
   * geladen" —, und der braucht einen Traeger. `undefined` ist er.
   * WER DARAUS EIN PFLICHTFELD MACHT, muss einen Wert erfinden, den es vor dem Laden
   * nicht gibt.
   *
   * `null` UND `undefined` FUEHREN ZU DERSELBEN ANZEIGE, naemlich zu keiner. Die drei
   * Faelle dahinter trennt die STATUSZEILE, nicht diese Zeile — s. credentialStateFor
   * in lib/tracking/credential-state.ts.
   */
  credentialState?: TargetCredentialState | null;
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
  // ERWEITERT MIT SCHEIBE 11.2b UM DEN VIERTEN ZUSTAND. Der Absatz darueber bleibt
  // woertlich und beschreibt die Schwaeche unveraendert richtig — was sich aendert,
  // ist, dass sie jetzt einen AUSGANG hat: Scheitert die Lage-Aktion, steht hier
  // "Zustand unbekannt" statt einer Behauptung. Die Nachbarin listConfiguredTargets
  // ebnet ihre Fehler weiterhin auf eine leere Liste ein; die zweite Quelle traegt den
  // benannten Kanal, und die Vorrangregel steht in resolveConfigured.
  const statusText =
    configured === null
      ? STATUS_LOADING
      : configured === "unknown"
        ? STATUS_UNKNOWN
        : configured
          ? STATUS_CONFIGURED
          : STATUS_UNCONFIGURED;

  // DIE DRITTE ZEILE (Scheibe 11.2b) — DIE LAGE DER ZUGANGSDATEN.
  //
  // SIE STEHT NEBEN statusText UND NICHT DARIN, und das ist die Hausform dieser Datei
  // und keine Geschmacksfrage: Der Hinweis ueber die AUSLIEFERUNG steht aus genau
  // demselben Grund in einer eigenen Zeile ("zwei verschiedene Sachen, deshalb zwei
  // Zeilen und kein Zusatz im Statustext"). Der Status sagt, ob Zugangsdaten
  // HINTERLEGT sind; diese Zeile sagt, ob sie NOCH GUELTIG sind. Das ist eine DRITTE
  // Aussage, und sie bekommt eine dritte Zeile.
  //
  // DIE AMPEL ZEIGT UHR 2, NICHT UHR 1. Uhr 1 stirbt seit Scheibe 1b-2a stuendlich und
  // wird verkehrsgetaktet erneuert — sie anzuzeigen hiesse, dauerhaft "es endet in 43
  // Minuten" zu melden. Uhr 1 kommt im Rueckgabetyp gar nicht vor.
  //
  // KEIN GRUEN, KEIN HAKEN, KEIN PUNKT — auch hier nicht. Dass die Scheibe "Ampel"
  // heisst, hebt die Grenze an der Statusflaeche nicht auf; sie schafft die
  // Voraussetzung, unter der eine Aussage ueberhaupt gehalten werden koennte. Alle
  // vier Texte tragen dieselbe neutrale Klasse.
  //
  // DIE ZEITZONE IST KOLLISIONSFREI, WEIL DIESE KARTE IM ERSTEN RENDER NICHT IM BAUM
  // LIEGT: Sie steckt im Einstellungs-Drawer, und der startet geschlossen (s. den
  // Kommentar am isSettingsOpen-Gate in CodeImporter.tsx, wo diese Karte seit dieser
  // Scheibe als ZWEITER Konsument genannt ist). Waere sie im Server-HTML,
  // formatierten Server und Client denselben Zeitpunkt in VERSCHIEDENEN Zeitzonen —
  // ein Hydration-Mismatch. Mount-Flag, suppressHydrationWarning und ein fester
  // timeZone-Parameter sind an der Varianten-Auswertung geprueft und VERWORFEN; die
  // Abhaengigkeit ist stattdessen benannt, hier und dort.
  //
  // KEIN WORT AUS DER VERBOTEN-LISTE des Wirkungs-Waechters — insbesondere kein
  // "laeuft". Der naheliegende Text "laeuft bald ab" macht jenen Lauf ROT, und zwar
  // zu Recht: Die Liste haelt die Karte davon ab, ueber WIRKUNG zu sprechen.
  const credentialLine = describeCredentialState(credentialState ?? null);

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

      {/* DIE LAGE DER ZUGANGSDATEN (Scheibe 11.2b). Dieselbe neutrale Klasse wie der
          Folgenlosigkeits-Hinweis darunter — keine Farbe, kein Symbol, kein Punkt.
          Der Text und die Faelle stehen in describeCredentialState oben. */}
      {credentialLine !== null && (
        <p className="mb-2 text-xs text-gray-500">{credentialLine}</p>
      )}

      {/* Der Folgenlosigkeits-Hinweis (Invariante 6). Er sagt etwas ueber die
          AUSLIEFERUNG, der Status etwas ueber die ZUGANGSDATEN — zwei verschiedene
          Sachen, deshalb zwei Zeilen und kein Zusatz im Statustext. Ein Zusatz
          dort haette den entschiedenen Wortlaut verhandelbar gemacht.

          SEIT 11.1a IM BETRIEB ERREICHT — NACHGEZOGEN, NICHT UMFORMULIERT: Hier stand
          "UNERREICHT IM BETRIEB, ABER SEIT SCHEIBE C2 BEWEISBAR … Solange jedes
          bekannte Ziel in TARGETS_WITH_ADAPTER steht, erreicht ihn kein Betrieb", und
          weiter unten "heute trifft das auf keines zu". BEIDE ANGABEN SIND MIT DEM
          VIERTEN ZIEL FALSCH GEWORDEN: 'linkedin' steht in TRACKING_TARGETS und NICHT
          in TARGETS_WITH_ADAPTER, seine Karte zeigt diesen Hinweis, und das ist der
          Zweck der Scheibe. Die AUSSAGE des Zweiges ist unveraendert; ueberholt war
          eine Tatsachenbehauptung ueber den Code.
          WAS BLEIBT: Er ist ausserdem jedem Test erreichbar, denn die Tatsache kommt
          als PROP herein und nicht mehr aus einem Modul-Objekt.
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
          hier `savedPixelId !== ""` schreibt, hat wieder zwei Wahrheiten.
          NACHGEZOGEN 11.1c — DIE AUSSAGE DARUEBER GILT UNVERAENDERT, nur das Symbol
          ist ein anderes: Gerufen wird hasTargetPixelId (lib/settings.ts), das ZIEL
          und Wert entgegennimmt und an genau jenes Praedikat delegiert. Es bleibt
          EINE Bedingung, und sie entscheidet weiterhin auch im Aufloesungs-Pfad.
          DAS ZIEL WAR HIER SCHON DA — es ist eine Prop dieser Karte; deshalb kostet
          die Umstellung an dieser Stelle keine einzige Aenderung an den Props, den
          Fixtures oder der Aussage darueber, WELCHEN der beiden Kennungs-Werte die
          Zeile liest (weiterhin den GESPEICHERTEN). */}
      {/* UNTERDRUECKT AUF EINER KARTE OHNE OEFFENTLICHES FELD (11.1a), und der Grund
          ist eine FALSCHE DIAGNOSE, nicht Redundanz: Diese Zeile nennt als Grund eine
          fehlende Kennung. Wo es gar kein Kennungs-Feld gibt, ist das nicht der Grund —
          der Grund ist der fehlende Empfaenger, und den nennt bereits die Zeile
          darueber. Stuenden beide da, waeren es zwei Meldungen, von denen eine in die
          Irre fuehrt: der Betreiber suchte nach einem Feld, das die Karte nicht hat.
          DIE BEDINGUNG LIEST DIESELBE QUELLE WIE DIE ANZEIGE DES FELDES (config.
          publicLabel) — nicht ein zweites Merkmal, das danebenlaufen koennte. */}
      {/* DER ADAPTER-TERM IST MIT SCHEIBE 2 DER PHASE 11.2 DAZUGEKOMMEN (E1), und er
          ist keine Politur: Ohne ihn traegt EIN Kartenzustand BEIDE Zeilen, und die
          zweite nennt den falschen Grund.
          DER ZUSTAND, UM DEN ES GEHT: Zugangsdaten hinterlegt UND gespeicherte Kennung
          noch leer. Das ist der Zustand UNMITTELBAR NACH DEM VERBINDEN — also der
          erste, den jeder Betreiber ueberhaupt zu sehen bekommt. Der Adapter-Hinweis
          darueber nennt dort den WAHREN Grund (es gibt keinen Empfaenger); diese Zeile
          nennt einen unvollstaendigen (die Kennung fehle). Traegt er sie ein,
          verschwindet die Zeile — und es geht weiterhin nichts hinaus.
          SIE HEILT SICH SELBST, UND DAS IST DER GRUND FUER DIESE FORM: Sobald das Ziel
          einen Empfaenger bekommt, wird hasAdapter wahr, die Zeile kehrt von selbst
          zurueck — und dann ist ihre Aussage richtig. Es braucht weder eine Rangfolge
          zwischen den beiden Zeilen noch einen neuen Wortlaut.
          FUER DIE VIER BESTEHENDEN ZIELE AENDERT SICH NICHTS: hasAdapter ist dort true,
          der Term ist wirkungslos. Ein Test sichert das, dieser Kommentar nicht.
          ES IST KEIN ZIELNAMEN-ZWEIG: Der Wert kommt als Prop und wird in MeasureView
          aus TARGETS_WITH_ADAPTER abgeleitet. Diese Komponente kennt keinen Zielwert. */}
      {hasAdapter &&
        config.publicLabel !== undefined &&
        configured === true &&
        !hasTargetPixelId(savedPixelId, target) && (
          <p className="mb-2 text-xs text-gray-500">
            {noDeliveryText(config.publicLabel)}
          </p>
        )}

      <div className="flex flex-col gap-3">
        {/* DAS OEFFENTLICHE FELD ENTFAELLT GANZ, wenn die Karte keines fuehrt (11.1a).
            NICHT nur die Beschriftung, und der Grund liegt in der SACHLAGE und nicht in
            einer offenen Frage: Ein Ziel ohne oeffentliches Feld hat keine Kennung, die
            auf diese Ebene gehoerte — seine Kennung gilt JE EREIGNISTYP und lebt im
            Ereignis-Block. Ein Eingabefeld dafuer waere ein Feld ohne Bedeutung und
            damit eine Einladung, etwas Falsches hineinzuschreiben. DIE HERLEITUNG WIRD
            HIER NICHT VERDOPPELT: sie steht am Typ in lib/tracking/target-cards.ts,
            Absatz "WARUM UEBERHAUPT".

            DIE FOLGE FUER DEN AUSGELIEFERTEN CODE gehoert hierher, weil sie an genau
            dieser Zeile haengt — ABER SIE HAENGT NICHT AM FELD, SONDERN AN DER KENNUNG,
            GLEICH WELCHER FORM. Das Memo consentTargets (components/CodeImporter.tsx)
            filtert ueber isTargetDeliverable, und das ist ein ODER: Skalar ODER
            Zuordnung je Ereignistyp. Ein Ziel ohne Kartenfeld kann seinen
            Consent-Schluessel also sehr wohl in den ausgelieferten Text bringen.
            DER GEGENBEWEIS STEHT IM EIGENEN BESTAND: LinkedIn hat kein Kartenfeld und
            trotzdem einen Weg, eine Kennung zu setzen — den Ereignis-Block; es ist damit
            auslieferfaehig, und sein Schluessel steht im Draht. Die ANDERE Haelfte
            desselben ODER ist live bestaetigt (Owner, 2026-08-31, Live-Test der Scheibe
            2, Schritt 7: NUR die Kundennummer hinterlegt, Schluessel im Draht).

            ERSETZT (Scheibe 2 der Phase 11.2), NICHT GESTEMPELT — ZWEI SAETZE SIND
            GEFALLEN, und die Begruendung gehoert an die Stelle, weil sie sonst
            zurueckkehrt.
            DIE ZWEI WOERTLICHEN ZITATE SIND EINE STREICHUNGS-SPUR UND KEIN STEMPEL, und
            der Unterschied entscheidet ueber ihr Ueberleben: Ein Stempel bewahrt eine
            HERLEITUNG, die beim naechsten Wechsel wieder gebraucht wird — die gibt es
            hier nicht. Diese Zitate bewahren den WORTLAUT ALS SUCHANKER. Satz (2) war
            ZWEI SCHEIBEN LANG unbemerkt falsch, und die Zwillingsstelle in
            lib/tracking/target-cards.ts wurde NUR gefunden, weil nach dem Wortlaut
            gesucht werden konnte. Wer sie nach der Regel wegraeumt, die fuer Stempel
            gilt, nimmt dem naechsten Fund sein Werkzeug.
            (1) "entschiede damit eine Ablage, die niemand beschlossen hat" — die Ablage
                IST beschlossen; der Satz hat keinen Gegenstand mehr.
            (2) "Ohne Feld gibt es keinen Weg, eine zu setzen -> das Ziel erscheint in
                KEINEM ausgelieferten Text" — das war seit 11.1d FALSCH, nicht erst seit
                dieser Scheibe. ER MACHTE EINE WIRKUNG AN DER FALSCHEN URSACHE FEST, und
                zwar an genau der Zeile, die das Feld schaltet: Wer ihm folgte, hielt den
                Consent-Draht fuer ans Kartenfeld gekoppelt.

            WAS RICHTIG BLEIBT UND NICHT VERLORENGEHT: Wer hier ein Feld ergaenzt,
            aendert damit den ausgelieferten Code jeder Seite, die es benutzt. DIE FOLGE
            STIMMT, NUR IHRE HERLEITUNG WAR FALSCH — ein neues Feld erzeugt einen neuen
            WEG, eine Kennung zu setzen, und DAS wirkt auf den Draht. */}
        {config.publicLabel !== undefined && (
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
        )}

        {/* Zugangsdaten: GEHEIM, write-only. Der echte Wert geht nur in die
            Server-Action und kommt NIE zurueck -> das Feld startet und bleibt
            leer, gespeist wird es NIE aus einem geladenen Wert.

            DIE GANZE GRUPPE ENTFAELLT, WENN DIE KARTE KEIN GEHEIMNIS-FELD FUEHRT
            (Scheibe 3) — dieselbe Bauform wie beim oeffentlichen Feld darueber, und
            derselbe Schalter: die ABWESENHEIT der Beschriftung. Ein Ziel, dessen
            Zugangsdatum ueber einen Autorisierungs-Fluss entsteht und CHIFFRIERT liegt,
            darf kein Feld anbieten, in das jemand einen Klartext einfuegt.
            WAS DABEI AUSDRUECKLICH NICHT MITENTFAELLT: der TRENNEN-Weg und der
            Statuskanal. Beide standen bis zur Scheibe 3 INNERHALB dieser Gruppe — ein
            Ziel ohne Geheimnis-Feld haette damit auch keinen Weg mehr aus dem Projekt
            heraus, und KEIN Test waere davon rot geworden. Sie stehen jetzt darunter,
            ausserhalb dieser Bedingung. */}
        {config.secretLabel !== undefined && (
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
            </div>
          </div>
        </label>
        )}

        {/* DER VERBINDEN-WEG (Scheibe 3). Er tritt NEBEN das Geheimnis-Feld und
            erscheint nur, wo es keines gibt — dieselbe Bedingung, umgekehrt gelesen.

            ES IST EIN KNOPF UND KEIN LINK, und das ist ENTSCHIEDEN (Entscheidung (A) des
            Zuschnitts): Ein <a href> oder <Link> traegt eine Adresse, die ein
            Vorablade-Mechanismus verfolgen kann; hier gibt es keine — der Ruf entsteht
            erst im Handler.
            DER TRAGENDE GRUND IST KEIN SICHERHEITS-, SONDERN EIN PRODUKT-ARGUMENT: Ein
            Verbinden ist ein BEWUSSTER AKT des Betreibers. Ein Element, das ohne Klick
            feuert, ist keiner — es autorisierte in seinem Namen, ohne dass er es getan
            hat. Dazu die Empfindlichkeit der State-Achse: der Live-Test der Scheibe 1a
            hat ein ?google=no_state erzeugt, dessen Ursache bis heute NICHT GEMESSEN ist.
            DAS P3-ARGUMENT (GET wird vorabgeladen) TRAEGT HIER NUR ZUR HAELFTE: Anders
            als die Beweis-Route schreibt die Start-Route keine Zeile und ruft keinen
            fremden Endpunkt; der Schaden waere ein ueberschriebenes State-Cookie, und der
            ist klein und ungemessen.

            KEIN safeAction: Der Knopf ruft KEINE Server-Action, sondern navigiert. Es
            haengt kein Busy-Flag und kein Fehlerkanal daran, den ein Wurf leer liesse.
            Rief er je eine Action, greift die Pflicht sofort. */}
        {config.secretLabel === undefined && (
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">
              Zugangsdaten
              <span className="block text-xs font-normal text-gray-400">
                Über den Anbieter autorisieren — kein Einfügen
              </span>
            </span>
            <div>
              <button
                type="button"
                onClick={() => {
                  if (!projectId) return;
                  window.location.assign(
                    `/api/oauth/google/start?project=${encodeURIComponent(projectId)}`,
                  );
                }}
                disabled={!projectId}
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {configured
                  ? `${config.name} neu verbinden`
                  : `${config.name} verbinden`}
              </button>
            </div>

            {/* DIE RUECKMELDUNG DES FLUSSES — DREI FAELLE, NICHT DREIZEHN TEXTE
                (Entscheidung (B) des Zuschnitts).
                · ok  -> KEIN Text. Der Erfolgsfall traegt sich selbst: die Karte kippt
                         auf "Zugangsdaten hinterlegt".
                · denied -> KEIN FEHLER, sondern eine WAHL des Nutzers. Neutral, keine
                         Fehlersprache, keine Warnfarbe.
                · sonst -> EIN Text plus der ROHE CODE, sichtbar fuer den Support.
                DER TEXT BEHAUPTET WEDER URSACHE NOCH ERGEBNIS (docs/immer-beachten.md,
                die Meldungstext-Auflage an der safeAction-Regel), UND HIER IST DAS
                SCHAERFER ALS SONST — der Grund gehoert an diese Stelle, damit die
                naechste Runde den Text nicht "klarer" macht und die Aussage
                zurueckholt:
                · BEOBACHTET IST NUR, DASS EIN FEHLERCODE ZURUECKKAM. Ob die
                  Autorisierung durchlief, ob etwas hinterlegt wurde und woran es lag,
                  wissen wir NICHT.
                · BEIM CODE `write` HAT DER KUNDE AUTORISIERT und der Tausch lief durch —
                  gescheitert ist die Ablage. Und bricht die Verbindung auf dem RUECKWEG
                  eines Schreibvorgangs, IST die Zeile geschrieben.
                · DIE KARTE STEHT DANEBEN UND IST DIE AUTORITAET: Sie leitet ihren
                  Zustand aus der DATENBANK ab. Ein Text, der einen Ausgang behauptet,
                  erzeugt im Zweifel einen SICHTBAREN WIDERSPRUCH in derselben Kachel —
                  "Zugangsdaten hinterlegt" oben, "nicht abgeschlossen" darunter.
                DESHALB VERWEIST DER TEXT AUF DIE STATUSZEILE, statt selbst etwas ueber
                den Zustand zu sagen.
                WARUM DREIZEHN EIGENE TEXTE AUSDRUECKLICH NICHT: Sie waeren dreizehn
                Formulierungen, die niemand liest und die driften. Der rohe Code kostet
                keine und macht einen Support-Fall trotzdem adressierbar.
                `denied` BLEIBT DAVON UNBERUEHRT: Dort ist die Ablehnung vom ANBIETER
                gemeldet und damit bekannt — der Text sagt, was geschehen ist, nicht was
                daraus folgt. */}
            {connectOutcome === "denied" && (
              <p className="text-xs text-gray-500">
                Die Autorisierung wurde abgebrochen.
              </p>
            )}
            {connectOutcome !== null &&
              connectOutcome !== "ok" &&
              connectOutcome !== "denied" && (
                <p className="text-xs text-red-600">
                  Der Verbindungsversuch kam mit einem Fehlercode zurück. Was
                  hinterlegt ist, sagt die Statuszeile oben. Code:{" "}
                  {connectOutcome}
                </p>
              )}
          </div>
        )}

        {/* DER TRENNEN-WEG UND DER STATUSKANAL — AUSSERHALB BEIDER GRUPPEN.
            SIE STANDEN BIS ZUR SCHEIBE 3 INNERHALB DES GEHEIMNIS-FELDES, und das war
            solange folgenlos, wie jede Karte eines hatte. Mit der ersten Karte ohne
            Feld waere der Trennen-Weg mit dem Feld verschwunden: ein Betreiber koennte
            verbinden und danach nicht mehr trennen — schlechter als der Zustand vorher,
            und KEIN Test waere davon rot geworden. Deshalb steht dieser Block hier und
            nicht dort.
            Ein Test haelt das fest, nicht dieser Kommentar. */}
        {projectId && configured && !confirming && (
          <div className="flex flex-wrap items-center gap-2">
            {/* ZIEL-SPEZIFISCHER NAME. Zwei Karten traegen sonst zwei Knoepfe
                desselben Namens — und im selben Drawer steht bereits ein
                "Entfernen" je Domain-Zeile. Die Projektregel nennt zwei gleich
                benannte Bedienelemente mit verschiedener Wirkung ein
                Oberflaechen-Problem; diese Karte darf es nicht verschaerfen. */}
            <button
              type="button"
              onClick={() => setConfirming(true)}
              disabled={removing}
              className="shrink-0 rounded-md border border-red-200 px-2 py-2 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {config.name} entfernen
            </button>
          </div>
        )}

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
    </div>
  );
}
