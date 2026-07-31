"use client";

import { VARIANT_B_NOT_PUBLISHED_MESSAGE } from "@/lib/hosting/variant";
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
  publishStatus,
  publishNotice,
  hostingLabel,
  liveUrl,
  publishRestored,
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
  publishStatus: "idle" | "publishing" | "published" | "error";
  publishNotice: { tone: "error" | "hint"; text: string } | null;
  hostingLabel: string;
  liveUrl: string;
  publishRestored: boolean;
  // --- Variante B ---
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
  return (
    <>
      {/* Hosting / Veröffentlichen (Phase 7 Scheibe 7a): schaltet die funktionale
          Seite unter label.publayer.net live. Erzeugt das funktionale Dokument
          CLIENT-seitig (wie Export, WYSIWYG) und speichert es via publishProject.
          Braucht ein gespeichertes Projekt (projectId) -> sonst deaktiviert +
          Hinweis (wie beim CAPI-Token). */}
      <div className="mt-4 border-t border-gray-200 pt-4">
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
            disabled={
              !projectId ||
              emptyPublishTarget !== null ||
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
          CodeImporter weiter aufzublaehen; projectId gated wie das Publish/CAPI-UI. */}
      <DomainManager projectId={projectId} />
    </>
  );
}
