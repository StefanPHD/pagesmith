"use client";

import { VARIANT_B_NOT_PUBLISHED_MESSAGE } from "@/lib/hosting/variant";
import {
  CONSENT_COLOR_BACKGROUND_VORBELEGUNG,
  CONSENT_COLOR_TEXT_VORBELEGUNG,
  CONSENT_TEXT_MAX_LENGTH,
  consentTextLength,
  consentTextProblem,
  type ConsentDialog,
  type ConsentDialogRead,
  type ConsentColorRead,
  type ConsentTheme,
  type ConsentThemeRead,
  type ConsentLanguage,
  type ConsentLanguageRead,
} from "@/lib/settings";
import { contrastRatio } from "@/lib/contrast";
// DER KOLLISIONS-WORTLAUT KOMMT AUS DER ERKENNUNG UND WIRD HIER NICHT ABGESCHRIEBEN:
// EINE Quelle fuer die Fundliste im Bereich BAUEN und fuer diesen Hinweis — sonst
// bekaeme der Betreiber fuer dieselbe Ursache zwei verschiedene Erklaerungen.
import { FOREIGN_CMP_COLLISION } from "@/lib/foreign-scan";
// DER STANDARDTEXT KOMMT AUS DEM ERZEUGER UND WIRD HIER NICHT ABGESCHRIEBEN ("ABLEITEN
// STATT HARDCODEN"): Er steht an genau einer Stelle, und ein hier abgeschriebenes Literal
// liefe beim naechsten Aendern des Satzes still auseinander — der Platzhalter zeigte dann
// etwas anderes, als der Besucher zu sehen bekaeme.
// SEIT SCHEIBE 11.13e KOMMT ER AUS DER TABELLE UND FOLGT DER SPRACHE (bindende
// Entscheidung P11.13-34): Der Platzhalter zeigt den Standard der GEWAEHLTEN Sprache.
import { consentTexts } from "@/lib/tracking/consent-texts";
import DomainManager from "@/components/DomainManager";

/**
 * Bereich VEROEFFENTLICHEN des Einstellungs-Panels (Phase 10 Scheibe 10a-2). Buendelt
 * die drei Abschnitte, die nach 10a-1 hinter MeasureView stehen: Veroeffentlichen
 * (Publish-Button, Live-URL, Hinweis-Slot, Statuszeile), Variante B (A/B-Test-Schalter
 * UND Entfernen) und die Domain-Verwaltung.
 *
 * REINE ANSICHT — KEIN eigener Zustand, KEIN Hook, KEIN Lade-Effekt
 * (Phase-10-Entscheidung 3): getVariantBPublished bleibt als Lade-Effekt im Container
 * und feuert dort beim Seitenaufruf; hier kommt nur der fertige Wert an.
 *
 * KEIN settings-BLOB: Anders als beim Tracking-Bereich lesen diese Abschnitte settings
 * ohnehin nie direkt — sie sehen nur die Ableitungen hostingLabel und liveUrl. Beide
 * bleiben im Container, weil hostingLabel aus getHostingLabel(settings) stammt und
 * liveUrl zusaetzlich NEXT_PUBLIC_HOSTING_DOMAIN liest; eine Env-Lesung gehoert nicht
 * in eine rein darstellende Datei.
 *
 * DIE DREI HANDLER BLEIBEN IM CONTAINER und kommen als parameterlose Rueckrufe herein.
 * Das ist keine Stilfrage: handleRemoveVariantB schreibt im Erfolgsfall die
 * PROJEKT-WURZELN (code, savedCode, mappings, savedMappings, activeVariant) zurueck auf
 * Variante A, und handlePublish spiegelt das Label in settings UND savedSettings. Beide
 * Wirkungen reichen weit ueber diesen Bereich hinaus; die Ansicht soll davon nichts
 * wissen und nichts davon selbst tun koennen.
 *
 * KEIN umschliessendes Element: die Rueckgabe ist ein Fragment, damit der gerenderte
 * DOM gegenueber dem Zustand vor der Extraktion unveraendert bleibt — diese Scheibe
 * aendert NICHTS Sichtbares, auch nicht die Reihenfolge.
 */
export default function PublishView({
  projectId,
  hasVariantB,
  activeVariantLabel,
  onPublish,
  emptyPublishTarget,
  ownBlocksTarget,
  publishStatus,
  publishNotice,
  hostingLabel,
  liveUrl,
  publishRestored,
  consentDialog,
  foreignCmp,
  onConsentDialogChange,
  consentTheme,
  onConsentThemeChange,
  consentColorBackground,
  consentColorText,
  onConsentColorChange,
  consentTextRaw,
  onConsentTextChange,
  consentLanguage,
  onConsentLanguageChange,
  onToggleAbTest,
  abTestActive,
  abTestStartedAt,
  variantBusy,
  variantStatus,
  variantError,
  variantBPublished,
  variantBRemoveConfirming,
  onRemoveConfirmingChange,
  onRemoveVariantB,
}: {
  projectId: string | null;
  // --- Veroeffentlichen ---
  hasVariantB: boolean;
  activeVariantLabel: string;
  onPublish: () => void;
  emptyPublishTarget: "a" | "b" | null;
  // EIGENE BAUSTEINE AUS EINEM FRUEHEREN EXPORT (Phase 11.11, Scheibe 11.11d).
  // EIGENER PROP NEBEN emptyPublishTarget, NICHT MIT IHM VERSCHMOLZEN: Die zwei Riegel
  // haben verschiedene Ursachen und verschiedene Ausgaenge ("both" gibt es nur hier).
  // Ein gemeinsamer Wert naehme dem Leer-Riegel seine Bedeutung, und die Meldung
  // koennte nicht mehr sagen, welcher der beiden gesperrt hat.
  ownBlocksTarget: "a" | "b" | "both" | null;
  publishStatus: "idle" | "publishing" | "published" | "error";
  publishNotice: { tone: "error" | "hint"; text: string } | null;
  hostingLabel: string;
  liveUrl: string;
  publishRestored: boolean;
  // --- Variante B ---
  // --- Einwilligung (Phase 11.5, Scheiben 11.5a und 11.5d) ---
  // Zustand ABGELEITET aus dem Einstellungs-Blob des Projekts (getConsentDialog), nicht
  // lokal gehalten — dieselbe Bauform wie beim A/B-Schalter darunter.
  consentDialog: ConsentDialogRead;
  // STEHT EIN FREMDES EINWILLIGUNGS-WERKZEUG IM CODE? (Phase 11.11, Scheibe 11.11b.)
  // ABGELEITET aus dem aktuellen Editor-Text, NIE gespeichert — eine Meldung ueber
  // einen Text wird aus dem AKTUELLEN Text abgeleitet (Entscheidung P11.11-24).
  foreignCmp: boolean;
  onConsentDialogChange: (mode: ConsentDialog) => void;
  // --- Darstellung (Phase 11.13, Scheibe 11.13b) ---
  // Gleiche Bauform wie der Schalter darueber: ABGELEITET aus dem Einstellungs-Blob
  // (getConsentTheme), nicht lokal gehalten.
  consentTheme: ConsentThemeRead;
  onConsentThemeChange: (theme: ConsentTheme) => void;
  // --- Die zwei freien Farben (Phase 11.13, Scheibe 11.13c) ---
  // Gleiche Bauform: ABGELEITET aus dem Einstellungs-Blob, nicht lokal gehalten. Der
  // Setzer bekommt BEIDE Werte, weil das Bedienelement immer beide zeigt.
  consentColorBackground: ConsentColorRead;
  consentColorText: ConsentColorRead;
  onConsentColorChange: (background: string, text: string) => void;
  // --- Der freie Sachtext (Phase 11.13, Scheibe 11.13d) ---
  // ANDERS ALS DIE DREI DARUEBER KOMMT HIER DER ROHE WERT, NICHT DER GELESENE, und das
  // ist kein Ausrutscher: Ein Eingabefeld muss zeigen, WAS GESPEICHERT IST — auch wenn
  // es ungueltig ist, sonst kann der Betreiber es nicht korrigieren. Die drei anderen
  // sind Auswahlen, bei denen "unknown" schlicht nichts markiert.
  // `undefined` heisst "kein eigener Text" — dann steht unser Standardtext als
  // PLATZHALTER da und es ist nichts gespeichert.
  consentTextRaw: string | undefined;
  // Der Setzer bekommt `undefined`, wenn das Feld geleert wird: Das ENTFERNT den Wert
  // (bindende Entscheidung P11.13-26). Ein leerer String waere "unknown" und sperrte
  // das Veroeffentlichen.
  onConsentTextChange: (value: string | undefined) => void;
  // --- Die Sprache (Phase 11.13, Scheibe 11.13e) ---
  // Gleiche Bauform wie Dialog- und Themenwert: ABGELEITET aus dem Einstellungs-Blob
  // (getConsentLanguage), nicht lokal gehalten. Bei "unknown" ist nichts markiert.
  consentLanguage: ConsentLanguageRead;
  onConsentLanguageChange: (language: ConsentLanguage) => void;
  onToggleAbTest: () => void;
  abTestActive: boolean;
  abTestStartedAt: string | null;
  variantBusy: boolean;
  variantStatus: "idle" | "error";
  variantError: string | null;
  variantBPublished: boolean | null;
  variantBRemoveConfirming: boolean;
  onRemoveConfirmingChange: (value: boolean) => void;
  onRemoveVariantB: () => void;
}) {
  // DIE DREI ABLEITUNGEN DER FARB-FLAECHE (Phase 11.13, Scheibe 11.13c). REINE
  // RENDER-ZEIT-RECHNUNG — kein Hook, kein Zustand, keine Locale-API: `toFixed` und
  // `replace` sind sprach-unabhaengig, ein toLocaleString braeche die Hydration-Regel.
  //
  // DIE ANZEIGEWERTE SIND NICHT DER SPEICHER, und das ist die Unterscheidung, die
  // Entscheidung P11.13-22 traegt: `input[type="color"]` KENNT KEIN "nicht gesetzt" und
  // zeigt ohne `value` schlicht Schwarz. Steht im Blob ein ungueltiger Wert, zeigt das
  // Feld deshalb den hellen Bestand — GESCHRIEBEN WIRD DABEI NICHTS. Der rote Hinweis
  // daneben sagt, dass der gespeicherte Wert unbrauchbar ist. Die Vorbelegung geschieht
  // allein beim WECHSEL auf "custom", also auf eine Nutzerhandlung hin, und sie liegt im
  // Container (handleConsentThemeChange), nicht hier.
  const farbeHintergrund =
    consentColorBackground === "unknown"
      ? CONSENT_COLOR_BACKGROUND_VORBELEGUNG
      : consentColorBackground;
  const farbeText =
    consentColorText === "unknown"
      ? CONSENT_COLOR_TEXT_VORBELEGUNG
      : consentColorText;
  const farbenUnbekannt =
    consentColorBackground === "unknown" || consentColorText === "unknown";
  // DER HINWEIS ENTSTEHT IM CLIENT UND SPERRT NICHTS (Entscheidung P11.13-16). Der Server
  // rechnet ihn nie; es gibt fuer ihn auch keinen Rueckkanal (PublishResult kennt kein
  // Textfeld ausser `error`). Er nennt WERT und SCHWELLE — keine Ursache, keine
  // Rechtsfolge.
  const kontrast = farbenUnbekannt
    ? null
    : contrastRatio(consentColorBackground, consentColorText);
  // DIE ANZEIGE SCHNEIDET AB, SIE RUNDET NICHT — zwei Gruende, und der zweite ist der
  // tragende:
  // (1) Die gelesene Quelle tut es auch (WebAIM-Rechner, GEMESSEN 2026-09-18: 3,9494
  //     erscheint dort als 3.94, nicht als 3.95). Wer unsere Zahl mit einem oeffentlichen
  //     Rechner vergleicht, soll dieselbe sehen.
  // (2) GERUNDET KOENNTE DIE ANZEIGE DIE SCHWELLE UEBERSPRINGEN: 4,4996 erschiene als
  //     "4,50:1 — die Schwelle ist 4,5:1", waehrend der Hinweis zu Recht steht. So gilt
  //     ausnahmslos: STEHT DER HINWEIS, IST DIE ANGEZEIGTE ZAHL KLEINER ALS 4,5.
  const kontrastText =
    kontrast === null
      ? null
      : (Math.floor(kontrast * 100) / 100).toFixed(2).replace(".", ",");
  // DER GRUND, AUS DEM DER GESPEICHERTE SACHTEXT ABGEWIESEN WUERDE — oder `null`.
  // ER KOMMT AUS DERSELBEN FUNKTION WIE DAS TOR (consentTextProblem): Eine zweite,
  // gleichlautende Bedingung hier liefe still auseinander, und der Betreiber saehe einen
  // Hinweis, der nicht zur Verweigerung passt — oder keinen, wo verweigert wird.
  // `undefined` ist KEIN Problem, sondern der Normalfall: kein eigener Text.
  const sachtextProblem =
    consentTextRaw === undefined ? null : consentTextProblem(consentTextRaw);
  // DER PLATZHALTER DES SACHTEXT-FELDS FOLGT DER SPRACHE (bindende Entscheidung
  // P11.13-34). Bei "unknown" steht der deutsche Satz da — das ist KEIN Rueckfall im
  // Sinne der Dauerregel, sondern eine ANZEIGE-Entscheidung: Der Leser bleibt bei
  // "unknown", der rote Hinweis darunter erklaert den Zustand, und das Veroeffentlichen
  // wird verweigert. Ein leeres Feld ohne Platzhalter zeigte gar nichts.
  const platzhalterSachtext = consentTexts(
    consentLanguage === "unknown" ? "de" : consentLanguage
  ).sachtext;
  return (
    <>
      {/* Hosting / Veröffentlichen (Phase 7 Scheibe 7a): schaltet die funktionale
          Seite unter label.publayer.net live. Erzeugt das funktionale Dokument
          CLIENT-seitig (wie Export, WYSIWYG) und speichert es via publishProject.
          Braucht ein gespeichertes Projekt (projectId) -> sonst deaktiviert +
          Hinweis (wie beim CAPI-Token).
          KEIN mt-4/border-t/pt-4 mehr (Scheibe 10c-1): Diese Klassen trugen die
          Trennlinie, die im Drawer freistehend UEBER "Veroeffentlichen" stand,
          waehrend der Messen-Reiter keine hatte. Die Linie ist jetzt eine
          Eigenschaft der DRAWER-Kopfzeile (CodeImporter.tsx) — eine Stelle statt
          zwei, und beide Bereiche beginnen gleich. Das div BLEIBT: eine bestehende
          Testabfrage findet die Bereichs-Huelle ueber
          getByRole("heading").parentElement.parentElement, und diese Kette haengt
          an genau dieser Ebene. */}
      <div>
        <h2 className="mb-1 text-sm font-medium text-gray-700">
          Veröffentlichen
        </h2>
        <p className="mb-3 text-xs text-gray-500">
          Schaltet die funktionale Seite unter einer eigenen Subdomain live.
        </p>
        {/* Ehrlich benannt, weil es beim Publish mit zwei Varianten genau eine
            Asymmetrie gibt: die bearbeitete Variante geht im aktuellen
            Editor-Stand live, die andere in ihrem gespeicherten (sie existiert
            im Editor gar nicht anders). Und: die Live-URL zeigt weiterhin
            ausschliesslich Variante A — der Split kommt erst in 9b. */}
        {hasVariantB && (
          <p className="mb-3 text-xs text-gray-500">
            Veröffentlicht <strong>beide Varianten</strong>: Variante{" "}
            {activeVariantLabel} im aktuellen Editor-Stand, die andere in ihrem
            zuletzt gespeicherten Stand. Die Live-URL zeigt weiterhin nur
            Variante A.
          </p>
        )}
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={onPublish}
            // SPERRT, beraet nicht — anders als der 9b-1p-Hinweis, dessen Wert
            // aus einem ASYNCHRONEN Server-Read kam (ein haengender Ladevorgang
            // darf keine funktionierende Aktion sperren). Hier ist der Wert
            // lokaler State, synchron, immer bekannt: es gibt keinen
            // "unbekannt"-Zustand, also darf der Button sperren. Autoritaet
            // bleibt trotzdem der SERVER-Riegel — der Button ist Komfort, der
            // Riegel ist die Garantie.
            //
            // emptyPublishTarget ERSETZT das fruehere code.trim() === "": jenes
            // las nur die AKTIVE Variante und liess damit genau den schlimmsten
            // Fall durch (B aktiv und gefuellt, A leer -> ALLE Besucher bekommen
            // die leere Seite, weil die Route ohne aktiven Test immer A liefert).
            // ownBlocksTarget ist der DRITTE Term (Scheibe 11.11d): Ein Text mit
            // Bausteinen aus einem frueheren Export wuerde Conversions an das
            // URSPRUNGS-Projekt senden und sie beim Veroeffentlichen verdoppeln —
            // GEMESSEN, VERMERK P11.11-16. Derselbe Rang wie der Leer-Riegel: Der
            // Button ist Komfort, der SERVER-Riegel ist die Garantie.
            disabled={
              !projectId ||
              emptyPublishTarget !== null ||
              ownBlocksTarget !== null ||
              publishStatus === "publishing"
            }
            className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
          >
            {publishStatus === "publishing"
              ? "Veröffentliche…"
              : liveUrl || hostingLabel
                ? "Erneut veröffentlichen"
                : "Veröffentlichen"}
          </button>
          {/* Link/Indikator ABGELEITET aus settings.hosting (liveUrl/hostingLabel)
              -> reseedet beim Projektwechsel automatisch, kein A->B-Leak. */}
          {liveUrl && (
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="break-all text-sm font-medium text-green-700 underline"
            >
              {liveUrl}
            </a>
          )}
        </div>
        {/* EIN ANZEIGESLOT, PRIORITAET FEHLER VOR HINWEIS — strukturell ueber
            eine Rangfolge, NICHT per Textvergleich. Der 9b-1p-NACHTRAG kam
            genau daher: Hinweis und Riegel-Fehler waren gleichzeitig sichtbar
            und zeigten denselben Satz doppelt. Mit einem Slot ist das
            unmoeglich statt nur unwahrscheinlich.
            Rangfolge: (1) ein tatsaechlich aufgetretener Server-Fehler, (2) das
            fehlende Projekt (fundamentaler Blocker als leerer Inhalt), (3) der
            Leer-Hinweis. Die projektweite Status-Zeile darunter bleibt
            UNVERAENDERT — sie beantwortet eine andere Frage (ist veroeffentlicht?)
            und war nie Teil des Befunds. */}
        {publishNotice && (
          <p
            className={`mt-2 text-xs ${
              publishNotice.tone === "error"
                ? "text-red-600"
                : "text-gray-500"
            }`}
          >
            {publishNotice.text}
          </p>
        )}
        {hostingLabel ? (
          <p className="mt-2 text-xs text-green-600">
            ● veröffentlicht
            {publishStatus === "published" && " ✓ aktualisiert"}
            {/* Ein Publish, der eine tote Adresse wiederbelebt hat, darf nicht
                aussehen wie jeder andere — der Nutzer soll wissen, dass etwas
                repariert wurde. Zusatz in der BESTEHENDEN Statuszeile, kein
                neues UI-Konzept. */}
            {publishStatus === "published" && publishRestored && (
              <span className="font-medium">
                {" "}
                — Adresse war nicht mehr erreichbar und wurde wiederhergestellt.
              </span>
            )}
          </p>
        ) : (
          projectId && (
            <p className="mt-2 text-xs text-gray-500">
              Noch nicht veröffentlicht.
            </p>
          )
        )}
      </div>

      {/* EINWILLIGUNGS-SCHALTER (Phase 11.5, Scheibe 11.5a).
          BEWUSST HIER UND NICHT IM BEREICH MESSEN: Er aendert den AUSGELIEFERTEN
          TEXT und wird erst mit dem naechsten Veroeffentlichen wirksam — er gehoert
          dorthin, wo der Knopf steht, der ihn wirksam macht. Im Bereich MESSEN
          erwartet man Wirkung auf die ZAHLEN, nicht auf das Dokument.
          DER HINWEIS AUF DAS NEU-VEROEFFENTLICHEN IST KEINE HOEFLICHKEIT: Ein
          ausgeliefertes Artefakt altert nicht mit dem Deploy — ohne neuen Publish
          traegt die Live-Seite den Schalter nicht.
          SEIT SCHEIBE 11.5d EINE GRUPPE AUS OPTIONSFELDERN STATT EINES
          KONTROLLKAESTCHENS: Ein Kontrollkaestchen traegt nicht mehr als zwei
          Zustaende; seit Scheibe 11.5d-2 sind es drei (Aus, Leiste, Fenster). ANGEBOTEN
          WIRD NUR, WAS GEBAUT IST — ein Wert ohne Block wuerde beim Veroeffentlichen
          verweigert.
          DER HINWEIS BEI "unknown" leitet sich aus settings ab, nicht aus dem
          Publish-Kanal: resetDrawerStatusChannel leert publishError beim Oeffnen des
          Drawers, dieser Hinweis steht dagegen, solange der Wert im Blob liegt. Er
          bleibt im Bereich; ein Signal an der Reiterzeile gibt es bewusst nicht.
          DIE ANZEIGE UEBERSCHREIBT KEINEN UNBEKANNTEN WERT: Ohne gesetztes Feld ist
          keins markiert, und erst ein Klick des Betreibers schreibt. */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h2 className="mb-1 text-sm font-medium text-gray-700">Einwilligung</h2>
        <div
          role="radiogroup"
          aria-label="Einwilligungs-Oberfläche"
          className="space-y-2 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600"
        >
          <label className="flex items-start gap-2">
            <input
              type="radio"
              name="consent-dialog"
              className="mt-0.5"
              checked={consentDialog === "off"}
              onChange={() => onConsentDialogChange("off")}
            />
            <span>
              <span className="font-medium text-gray-700">Aus</span>
              <br />
              Keine Einwilligungs-Oberfläche. Ohne eigenes Consent-Management auf der
              Seite gelten alle Ziele als erlaubt.
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="radio"
              name="consent-dialog"
              className="mt-0.5"
              checked={consentDialog === "bar"}
              onChange={() => onConsentDialogChange("bar")}
            />
            <span>
              <span className="font-medium text-gray-700">Leiste</span>
              <br />
              Am unteren Rand erscheint eine Leiste. Der Besucher kann Messung und
              Werbung einzeln erlauben, alles akzeptieren oder alles ablehnen. Bis zur
              Entscheidung wird nichts gesendet.
            </span>
          </label>
          <label className="flex items-start gap-2">
            <input
              type="radio"
              name="consent-dialog"
              className="mt-0.5"
              checked={consentDialog === "modal"}
              onChange={() => onConsentDialogChange("modal")}
            />
            <span>
              <span className="font-medium text-gray-700">Fenster</span>
              <br />
              In der Mitte der Seite erscheint ein Fenster über einer Abdunkelung.
              Der Besucher kann Messung und Werbung einzeln erlauben, alles akzeptieren
              oder alles ablehnen. Die Seite dahinter wird nicht gesperrt. Bis zur
              Entscheidung wird nichts gesendet.
            </span>
          </label>
          {consentDialog === "unknown" && (
            <p className="text-red-600">
              Gespeichert ist ein unbekannter Wert. Veröffentlichen wird verweigert,
              bis hier eine Einstellung gewählt ist.
            </p>
          )}
          {/* ERSETZT IN SCHEIBE 11.11b (Entscheidung P11.11-32, Punkt (e)). Hier
              stand: "Ein bereits eingebundenes Consent-Management wird nicht erkannt
              — …". MIT DER ERKENNUNG WIRD DIESER SATZ FALSCH, und ein falscher Satz
              zwei Bildschirme neben einer Liste, die das Gegenteil zeigt, ist teurer
              als eine fehlende Warnung. Die HAELFTE, die wahr bleibt — unsere
              Oberflaeche erscheint zusaetzlich —, steht weiter da. */}
          <p>
            Ist bereits ein fremdes Einwilligungs-Werkzeug eingebunden, erscheint
            unsere Leiste oder unser Fenster zusätzlich.
          </p>
          {/* DER KOLLISIONSHINWEIS (Entscheidung P11.11-4, P11.11-12 Satz 8).
              ER STEHT AM SCHALTER, weil der Betreiber ihn hier bedient, und er liest
              den ENTWURFS-Stand: `consentDialog` kommt aus getConsentDialog(settings),
              nicht aus savedSettings — er erscheint also SOFORT beim Umschalten und
              nicht erst nach dem Speichern.
              ER IST EIN SIGNAL, KEINE LOESUNG: Der offene Punkt UNSER
              EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP UEBERFAHREN bleibt bestehen. */}
          {foreignCmp && (consentDialog === "bar" || consentDialog === "modal") && (
            <p className="text-red-600">{FOREIGN_CMP_COLLISION}</p>
          )}
          <p className="text-gray-400">
            Wirkt erst nach dem nächsten Veröffentlichen.
          </p>
        </div>

        {/* DIE DARSTELLUNG (Phase 11.13, Scheibe 11.13b; bindende Entscheidung P11.13-6).
            SICHTBAR NUR BEI "bar" ODER "modal": Ohne Oberfläche gibt es nichts zu
            gestalten, und eine Wahl ohne Wirkung sähe aus wie eine Einstellung, die
            nicht greift.
            DER WERT BLEIBT BEIM AUSSCHALTEN ERHALTEN — die Gruppe verschwindet, das Feld
            im Blob nicht; wer den Dialog wieder einschaltet, findet seine Wahl vor.
            DIE ANZEIGE ÜBERSCHREIBT KEINEN UNBEKANNTEN WERT: Ohne gesetztes Feld liest
            getConsentTheme "light", bei einem unbekannten Wert ist keins markiert. */}
        {(consentDialog === "bar" || consentDialog === "modal") && (
          <div className="mt-3">
            <h3 className="mb-1 text-xs font-medium text-gray-700">Darstellung</h3>
            <div
              role="radiogroup"
              aria-label="Darstellung"
              className="space-y-2 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600"
            >
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="consent-theme"
                  className="mt-0.5"
                  checked={consentTheme === "light"}
                  onChange={() => onConsentThemeChange("light")}
                />
                <span>
                  <span className="font-medium text-gray-700">Hell</span>
                  <br />
                  Heller Hintergrund, dunkler Text.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="consent-theme"
                  className="mt-0.5"
                  checked={consentTheme === "dark"}
                  onChange={() => onConsentThemeChange("dark")}
                />
                <span>
                  <span className="font-medium text-gray-700">Dunkel</span>
                  <br />
                  Dunkler Hintergrund, heller Text — für Seiten mit dunklem Design.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="consent-theme"
                  className="mt-0.5"
                  checked={consentTheme === "auto"}
                  onChange={() => onConsentThemeChange("auto")}
                />
                <span>
                  <span className="font-medium text-gray-700">Automatisch</span>
                  <br />
                  Folgt der Einstellung des Besuchers, nicht dem Design der Seite. Ohne
                  Einstellung erscheint die helle Darstellung.
                </span>
              </label>
              {/* DIE VIERTE DARSTELLUNG (Phase 11.13, Scheibe 11.13c; bindende
                  Entscheidung P11.13-12). SIE IST EIN VIERTER WERT DERSELBEN Wahl und
                  kein zweiter Schalter — "Dunkel PLUS eigene Farben" entsteht damit gar
                  nicht erst als Zustand. */}
              <label className="flex items-start gap-2">
                <input
                  type="radio"
                  name="consent-theme"
                  className="mt-0.5"
                  checked={consentTheme === "custom"}
                  onChange={() => onConsentThemeChange("custom")}
                />
                <span>
                  <span className="font-medium text-gray-700">Eigene Farben</span>
                  <br />
                  Zwei Farben — Hintergrund und Text. Rahmen, Kästchen und Fokus-Ring
                  übernehmen die Textfarbe.
                </span>
              </label>
              {consentTheme === "unknown" && (
                <p className="text-red-600">
                  Gespeichert ist ein unbekannter Wert. Veröffentlichen wird verweigert,
                  bis hier eine Darstellung gewählt ist.
                </p>
              )}
              {/* DIE ZWEI FARBFELDER — SICHTBAR NUR BEI "custom" (P11.13-22). Der native
                  Waehler liefert genau `#rrggbb` in Kleinbuchstaben und damit exakt das
                  Alphabet des Format-Tors (P11.13-14); ein Tippfehler ist auf diesem Weg
                  nicht herstellbar. */}
              {consentTheme === "custom" && (
                <div className="space-y-2 border-t border-gray-200 pt-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label="Hintergrundfarbe"
                      value={farbeHintergrund}
                      onChange={(e) =>
                        onConsentColorChange(e.target.value, farbeText)
                      }
                    />
                    <span className="font-medium text-gray-700">Hintergrund</span>
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="color"
                      aria-label="Textfarbe"
                      value={farbeText}
                      onChange={(e) =>
                        onConsentColorChange(farbeHintergrund, e.target.value)
                      }
                    />
                    <span className="font-medium text-gray-700">Text</span>
                  </label>
                  {farbenUnbekannt ? (
                    <p className="text-red-600">
                      Gespeichert ist ein unbekannter Farbwert. Veröffentlichen wird
                      verweigert, bis beide Farben neu gewählt sind.
                    </p>
                  ) : (
                    kontrast !== null &&
                    kontrast < 4.5 && (
                      <p className="text-amber-700">
                        Kontrast {kontrastText}:1 — die Schwelle ist 4,5:1.
                        Veröffentlichen bleibt möglich.
                      </p>
                    )
                  )}
                </div>
              )}
              {/* DAS FELD FUER DEN FREIEN SACHTEXT (Phase 11.13, Scheibe 11.13d;
                  bindende Entscheidungen P11.13-23, P11.13-26 und P11.13-27).
                  ES HAENGT NICHT AN "custom": Der Sachtext gilt in JEDER Darstellung —
                  anders als die zwei Farbfelder darueber.
                  EINZEILIG UND KEIN `textarea`: Ein `textarea` verspraeche
                  Zeilenumbrueche, die das Tor abweist (P11.13-26, Grenze).
                  DER PLATZHALTER IST UNSER STANDARDTEXT — er ZEIGT, was ohne Eingabe
                  erscheint, und SCHREIBT NICHTS. Das ist der Unterschied zur
                  Farb-Vorbelegung aus P11.13-22: Der native Farbwaehler kennt kein
                  "nicht gesetzt", ein Textfeld sehr wohl. */}
              <div className="space-y-1 border-t border-gray-200 pt-2">
                <label className="block">
                  <span className="font-medium text-gray-700">Eigener Text</span>
                  <input
                    type="text"
                    aria-label="Erläuternder Text"
                    className="mt-1 w-full rounded border border-gray-300 px-2 py-1"
                    placeholder={platzhalterSachtext}
                    value={consentTextRaw ?? ""}
                    onChange={(e) =>
                      // EIN GELEERTES FELD ENTFERNT DEN WERT und schreibt NIE einen
                      // leeren String (P11.13-26). Geprueft wird mit trim, gespeichert
                      // wird der ROHE Wert — das Tor veraendert nichts.
                      onConsentTextChange(
                        e.target.value.trim() === "" ? undefined : e.target.value
                      )
                    }
                  />
                </label>
                {/* DER ZAEHLER LIEST N AUS DER KONSTANTE UND ZAEHLT MIT DERSELBEN
                    FUNKTION WIE DAS TOR (P11.13-27, ABLEITEN STATT HARDCODEN). Zwei
                    Zaehlungen liefen sonst STILL auseinander, und der Betreiber saehe
                    eine Zahl, die seine Ablehnung nicht erklaert. */}
                <p className="text-gray-500">
                  {consentTextRaw === undefined
                    ? 0
                    : consentTextLength(consentTextRaw)}{" "}
                  von {CONSENT_TEXT_MAX_LENGTH} Zeichen
                </p>
                {/* DER HINWEIS IST ROT, WEIL DIESER FALL ETWAS SPERRT — anders als der
                    Kontrast-Hinweis darueber, der ausdruecklich nichts sperrt
                    (P11.13-16). Er nennt die ZEICHENKLASSE und behauptet weder Ursache
                    noch Rechtsfolge. */}
                {sachtextProblem !== null && (
                  <p className="text-red-600">
                    {sachtextProblem === "laenge"
                      ? `Der Text ist länger als ${CONSENT_TEXT_MAX_LENGTH} Zeichen. Veröffentlichen wird verweigert, bis er kürzer ist.`
                      : sachtextProblem === "zeichen"
                        ? "Der Text enthält Steuerzeichen (unter anderem Zeilenumbruch, Tabulator oder Bidi-Steuerzeichen). Veröffentlichen wird verweigert, bis sie entfernt sind."
                        : "Gespeichert ist ein unbrauchbarer Wert. Veröffentlichen wird verweigert, bis hier ein Text steht oder das Feld geleert ist."}
                  </p>
                )}
              </div>
            </div>
            {/* DIE SPRACHE (Phase 11.13, Scheibe 11.13e; bindende Entscheidungen
                P11.13-31 bis -37). SIE STEHT IM SELBEN SICHTBARKEITS-ZWEIG wie
                Darstellung und Sachtext: bei "Aus" verschwindet die Gruppe, der WERT im
                Blob bleibt — wer den Dialog wieder einschaltet, findet seine Wahl vor.
                SIE HAENGT NICHT AN DER DARSTELLUNG: Die Sprache gilt in jeder.
                ACHTUNG — DIE DREI BESCHRIFTUNGEN HIER SIND APP-OBERFLAECHE UND KEIN
                AUSGELIEFERTER TEXT. Sie fallen NICHT unter Entscheidung P11.13-31, ihr
                Leser ist der Betreiber, und sie brauchen eine eigene Freigabe. */}
            <div className="space-y-1 border-t border-gray-200 pt-2">
              <h3 className="mb-1 text-xs font-medium text-gray-700">Sprache</h3>
              <div role="radiogroup" aria-label="Sprache" className="space-y-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="consent-language"
                    value="de"
                    checked={consentLanguage === "de"}
                    onChange={() => onConsentLanguageChange("de")}
                  />
                  <span>Deutsch</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="consent-language"
                    value="en"
                    checked={consentLanguage === "en"}
                    onChange={() => onConsentLanguageChange("en")}
                  />
                  <span>Englisch</span>
                </label>
                {/* DER HINWEIS STEHT IN DER RADIOGRUPPE, nicht daneben — dieselbe
                    Stelle wie beim Themenwert. Eine Gruppe mit "nichts markiert" ohne
                    Erklaerung IN ihr laesst den Betreiber raten, warum das
                    Veroeffentlichen verweigert wird. */}
                {consentLanguage === "unknown" && (
                  <p className="text-red-600">
                    Gespeichert ist ein unbekannter Wert. Veröffentlichen wird verweigert,
                    bis hier eine Sprache gewählt ist.
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* DER WIDERRUF (Phase 11.5, Scheibe 11.5e-2). Wir liefern einen AUFRUF, das
          Bedienelement stellt der Betreiber — bindende Entscheidung (24).
          DIESER ABSCHNITT IST TEIL DER SCHEIBE UND KEINE NACHARBEIT: Ohne ihn ist die
          Funktion unbenutzbar, denn es gibt KEINEN anderen Ort, an dem ein Betreiber vom
          Aufruf erfuehre. GEMESSEN (CC, 2026-09-16): keine Doku-Route, ein einziger `href`
          im ganzen Produkt (er zeigt auf die Live-Seite des Betreibers), und auf der Achse
          `anleitung|hilfe|dokumentation|handbuch|tutorial|leitfaden` ueber src/ nur
          Kommentare. Der Bereich VEROEFFENTLICHEN ist der Ort, an dem er ohnehin steht,
          wenn er den Schalter setzt.
          ER STEHT IMMER, AUCH BEI "Aus", UND DAS IST DER PUNKT: Genau dort muss der Fall
          stehen, dass der Aufruf ins Leere laeuft. Ein Text, der nur bei eingeschaltetem
          Dialog erschiene, erreichte den Betreiber im einzigen Fall nicht, in dem er ihn
          braucht.
          ALLE FUENF WORTLAUTE SIND FREIGABEN (G1 bis G5, Owner 2026-09-16) und werden
          nicht umformuliert; G6, die Warnung in der Konsole, steht in
          tracking/consent-revoke.ts. */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        <h2 className="mb-1 text-sm font-medium text-gray-700">Widerruf</h2>
        <div className="space-y-2 rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600">
          <p>
            Ein Besucher kann seine Entscheidung widerrufen. Rufe dafür aus deiner
            Seite pagesmithConsentRevoke() auf. Der Aufruf gibt true zurück, wenn
            der Dialog daraufhin erscheint, sonst false — etwa weil noch keine
            Entscheidung vorliegt oder der Dialog schon offen steht.
          </p>
          <pre className="overflow-x-auto rounded bg-gray-50 px-2 py-1 text-[11px] text-gray-700">
            <code>
              {
                '<a href="#" onclick="pagesmithConsentRevoke(); return false;">Einwilligung ändern</a>'
              }
            </code>
          </pre>
          <p>
            Den Aufruf gibt es nur, solange oben Leiste oder Fenster eingeschaltet
            ist. Steht der Schalter auf „Aus“, läuft er ins Leere, und der Fehler
            erscheint nur in der Konsole des Besuchers.
          </p>
          <p>
            Ein Widerruf gilt ab dem Moment, in dem er geschieht. Was vorher
            gesendet oder geladen wurde, holt er nicht zurück.
          </p>
        </div>
      </div>

      {/* Variante B verwalten (Phase 9 Scheibe 9a). Destruktiv -> zweistufige
          Inline-Bestaetigung, exakt wie "CAPI-Token entfernen". Bewusst hier im
          Einstellungs-Panel und NICHT neben dem Umschalter in der Toolbar: ein
          Loeschen gehoert nicht in Klick-Naehe eines reinen Ansichtswechsels. */}
      {hasVariantB && (
        <div className="mt-4 border-t border-gray-200 pt-4">
          <h2 className="mb-1 text-sm font-medium text-gray-700">
            Variante B
          </h2>
          {/* A/B-Test-Schalter (Phase 9 Scheibe 9b-1). Zustand ABGELEITET aus
              ab_test_active (Projekt-Spalte), nicht lokal gehalten. Klartext
              zur Abgrenzung: "Test stoppen" löscht NICHTS — das ist
              "Variante B entfernen" darunter. */}
          <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
            <button
              type="button"
              onClick={onToggleAbTest}
              disabled={variantBusy}
              className={`rounded-md px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300 ${
                abTestActive
                  ? "bg-amber-600 hover:bg-amber-700"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {variantBusy
                ? "…"
                : abTestActive
                  ? "Test stoppen"
                  : "Test starten"}
            </button>
            {abTestActive ? (
              <span className="text-xs font-medium text-green-700">
                ● Test läuft — Besucher sehen zur Hälfte Variante A, zur Hälfte
                Variante B.
              </span>
            ) : (
              <span className="text-xs text-gray-500">
                Test aus — die Live-URL liefert ausschließlich Variante A.
              </span>
            )}
            <span className="w-full text-xs text-gray-400">
              „Test stoppen“ löscht nichts, es schaltet nur den Split ab.
              Variante B muss veröffentlicht sein, damit der Test starten kann.
            </span>
            {/* NEUSTART-HINWEIS (Scheibe 9c-2). BEWUSST NICHT im EIN-Slot darunter:
                der Slot beantwortet "warum geht der Test gerade nicht?" (Riegel-Fehler
                vs. Hinweis auf unveroeffentlichte Variante B). Dieser Text beantwortet
                eine ANDERE Frage — "was passiert, wenn ich jetzt starte?". Im Slot
                wuerde er den Riegel-Fehler verdraengen oder von ihm verdraengt.

                Gezeigt nur, wenn ein Klick tatsaechlich ueberschriebe: es gibt einen
                protokollierten Lauf UND der Test ist gerade aus.

                WORTWAHL (K6): er sagt, dass die ANZEIGE neu beginnt. Er behauptet
                KEINEN Datenverlust — es wird nichts geloescht, die Zeilen bleiben
                vollstaendig in events. Ein Hinweis, der Verlust behauptet, erzeugt
                Angst vor einer harmlosen Aktion. */}
            {abTestStartedAt && !abTestActive && (
              <span className="w-full text-xs text-amber-700">
                Ein erneuter Start beginnt die Auswertung neu: ab dann zeigt
                „Auswertung je Variante“ nur noch Ereignisse des neuen Laufs.
                Gelöscht wird dabei nichts.
              </span>
            )}
            {/* EIN ANZEIGESLOT, ZWEI QUELLEN — PRIORITAET: FEHLER VOR HINWEIS.
                Sie schliessen sich gegenseitig aus, weil sie dieselbe Frage
                beantworten ("warum geht der Test gerade nicht?"): der HINWEIS
                sagt es vorab, der FEHLER nach dem Klick. Beide gleichzeitig hiess
                im Fall "B nicht veroeffentlicht" DENSELBEN Satz zweimal
                untereinander (beide aus VARIANT_B_NOT_PUBLISHED_MESSAGE).
                STRUKTURELL geloest, NICHT per Textvergleich: ein Vergleich der
                Inhalte wuerde nur DIESES Satzpaar entdecken und bei jedem
                kuenftigen Fehlertext, der dieselbe Ursache anders formuliert,
                wieder doppeln. Ein Slot kann per Konstruktion nur eines zeigen.
                Prioritaet FEHLER, weil er die juengere und konkretere Auskunft
                ist: er bezieht sich auf den Klick, den der Nutzer GERADE getan
                hat, und kann Ursachen nennen, die der Hinweis nicht kennt.
                HINWEIS-Regeln unveraendert: nur bei EINDEUTIGEM false; bei null
                (nicht ermittelbar) und bei true steht hier nichts, und der Button
                bleibt in JEDEM Fall klickbar (Autoritaet ist der Server-Riegel).
                Die zweite Render-Stelle neben "+ Variante B" bleibt, wie sie ist:
                dort gibt es keinen Hinweis, also auch keine Doppelung. */}
            {variantStatus === "error" && variantError ? (
              <p className="w-full text-xs text-red-600">{variantError}</p>
            ) : variantBPublished === false ? (
              <p className="w-full text-xs text-amber-700">
                {VARIANT_B_NOT_PUBLISHED_MESSAGE}
              </p>
            ) : null}
          </div>
          <p className="mb-3 text-xs text-gray-500">
            Entfernt den <strong>Inhalt</strong> von Variante B (HTML +
            Verknüpfungen) und nimmt sie aus der Veröffentlichung. Variante A
            bleibt unberührt.
          </p>
          {!variantBRemoveConfirming ? (
            <button
              type="button"
              onClick={() => onRemoveConfirmingChange(true)}
              disabled={variantBusy}
              className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Variante B entfernen
            </button>
          ) : (
            <div className="flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
              <span className="text-xs text-red-700">
                Variante B endgültig entfernen? Ihr HTML und ihre
                Verknüpfungen gehen verloren.
              </span>
              <button
                type="button"
                onClick={onRemoveVariantB}
                disabled={variantBusy}
                className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {variantBusy ? "Entferne…" : "Ja, entfernen"}
              </button>
              <button
                type="button"
                onClick={() => onRemoveConfirmingChange(false)}
                disabled={variantBusy}
                className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Abbrechen
              </button>
            </div>
          )}
        </div>
      )}

      {/* Eigene Domain verbinden (Phase 7 Scheibe 7c-2c): Add-Domain-Formular +
          dynamische DNS-Anweisungen + Status-Refresh. Eigene Komponente statt
          CodeImporter weiter aufzublaehen; projectId gated wie das Publish/CAPI-UI.

          key={projectId} (Phase 10 Scheibe 10b-2) — DEKLARIERTE VERHALTENSAENDERUNG,
          I6 deckt sie NICHT: sie aendert einen Zustands-LEBENSZYKLUS.
          DomainManager ist die einzige Ansicht dieses Bereichs mit EIGENEM Zustand
          (Container 6 useState, je Zeile 7, je kopierbarem Wert 1). Ohne den Key
          ueberlebten die Eingabe (input) und der Add-Fehler (addError) den
          Projektwechsel — und beim Wechsel auf ein noch UNGESPEICHERTES Projekt die
          komplette Domain-LISTE des Vorprojekts, weil der Lade-Effect dort bei
          !projectId frueh zurueckkehrt, waehrend die Liste unbedingt weiterrendert.
          Diese veraltete Zeile war voll bedienbar, inklusive des destruktiven
          "Entfernen"-Knopfs, unter dem Namen des neuen Projekts.
          Der Key macht den Projektwechsel zur Mount-Grenze. ZAHL und ZEITPUNKT der
          Server-Aufrufe aendern sich dadurch NICHT: Lade- und Poll-Effect hingen
          ohnehin an [projectId], der Remount ersetzt einen deps-Neulauf durch einen
          Mount-Lauf im selben Commit.
          Das Gate isSettingsOpen bleibt die Flaechengrenze (Entscheidung 2); der Key
          fuegt eine ZWEITE Mount-Grenze hinzu, er ersetzt die erste nicht.
          ACHSE: projectId, NICHT drawerArea — der Reiterwechsel bleibt ein reines
          Verstecken und loest weiterhin keinen Remount und keinen Server-Aufruf aus
          (I1: "Der Wechsel innerhalb der Flaeche versteckt, er haengt nicht aus.").
          VERWORFEN — ein projectId-Riegel JE AKTION: liesse eine tote Liste mit toten
          Knoepfen stehen und muesste bei jeder kuenftigen Zeilen-Aktion erneut
          angebracht werden. VERWORFEN — die Render-Bedingung der Liste erweitern:
          loest Eingabe und Fehlermeldung nicht.
          GRENZE, bewusst offen (Entscheidung zu 10b-2): null -> null, also zwei neue
          Projekte nacheinander, ist KEIN Key-Wechsel und damit kein Remount. Heute
          folgenlos, weil im Null-Zustand JEDER Schreibpfad gesperrt ist — die Auflage
          dazu steht an der Schreibpfad-Grenze in DomainManager.tsx. */}
      <DomainManager key={projectId} projectId={projectId} />
    </>
  );
}
