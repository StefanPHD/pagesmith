"use client";

import { useState } from "react";
import type { DetectedElement } from "@/lib/detect";
import {
  isValidRedirectUrl,
  type Mapping,
  type RedirectConfig,
  type TextConfig,
} from "@/lib/mappings";

type ActionPanelProps = {
  // Das in der Preview angeklickte Element (via postMessage-Bruecke) oder null.
  selectedElement: DetectedElement | null;
  // Bestehendes Mapping des gewaehlten Elements (oder null = noch keine Aktion).
  mapping: Mapping | null;
  // Redirect-Aktion zuweisen/aendern. Der Parent kuemmert sich um ps-ID-Anker
  // + State.
  onSaveMapping: (config: RedirectConfig) => void;
  // Text-Override zuweisen/aendern (Phase 5). Eigener Callback, gleicher
  // ps-ID-Anker-/Draft-/Speichern-Pfad wie Redirect.
  onSaveTextMapping: (config: TextConfig) => void;
  // Aktion entfernen.
  onRemoveMapping: () => void;
};

/**
 * Rechte Zone des Workspace. Erfasst die ABSICHT (welche Aktion soll ein Element
 * ausloesen) und speichert sie als Mapping. Das echte AUSFUEHREN (Button feuert
 * wirklich) gehoert NICHT hierher, sondern in den spaeteren Code-Gen-Schritt
 * (Phase 4, Cheerio) — die Preview bleibt selektions-only.
 */
export default function ActionPanel({
  selectedElement,
  mapping,
  onSaveMapping,
  onSaveTextMapping,
  onRemoveMapping,
}: ActionPanelProps) {
  return (
    <aside className="flex w-80 shrink-0 flex-col rounded-lg border border-gray-300 bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-medium text-gray-700">Aktion</h2>
      </div>
      {selectedElement === null ? (
        <div className="flex flex-1 items-center justify-center p-6">
          <p className="text-center text-sm text-gray-400">
            Wähle ein Element in der Vorschau, um eine Aktion zu verknüpfen.
          </p>
        </div>
      ) : (
        // key auf die ps-ID: bei Auswahl-Wechsel wird ElementActions neu gemountet
        // -> Formular-State + Edit-Modus sauber aus dem (ggf.) neuen Mapping geseedet.
        <ElementActions
          key={selectedElement.id}
          element={selectedElement}
          mapping={mapping}
          onSaveRedirect={onSaveMapping}
          onSaveText={onSaveTextMapping}
          onRemove={onRemoveMapping}
        />
      )}
    </aside>
  );
}

/**
 * Dispatcher nach Element-Kategorie: Textelemente bekommen den Text-Override-Flow
 * (Phase 5), alle interaktiven Elemente den bestehenden Redirect-Flow. EINE
 * Auswahl, zwei kategoriespezifische Panels — gleiches select/config/Uebernehmen-
 * Muster, andere config (Text statt URL).
 */
function ElementActions({
  element,
  mapping,
  onSaveRedirect,
  onSaveText,
  onRemove,
}: {
  element: DetectedElement;
  mapping: Mapping | null;
  onSaveRedirect: (config: RedirectConfig) => void;
  onSaveText: (config: TextConfig) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Kontext: welches Element ist gerade gewaehlt. */}
      <div className="rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600">
        <span className="font-mono">&lt;{element.tag}&gt;</span>{" "}
        <span className="text-gray-800">{element.label}</span>
      </div>

      {element.type === "text" ? (
        <TextActions element={element} mapping={mapping} onSave={onSaveText} onRemove={onRemove} />
      ) : (
        <RedirectActions mapping={mapping} onSave={onSaveRedirect} onRemove={onRemove} />
      )}
    </div>
  );
}

/**
 * Redirect-Aktions-Zustand. Drei Ansichten:
 * - kein Mapping: Aktions-Kacheln (vorerst eine: Link/Weiterleitung).
 * - Mapping vorhanden: Anzeige der Ziel-URL + Bearbeiten/Entfernen.
 * - Bearbeiten/Anlegen: Formular (URL + neuer-Tab-Toggle + Speichern).
 */
function RedirectActions({
  mapping,
  onSave,
  onRemove,
}: {
  mapping: Mapping | null;
  onSave: (config: RedirectConfig) => void;
  onRemove: () => void;
}) {
  // Nur ein Redirect-Mapping seedet das Formular; ein (defensiv moeglicher)
  // anderer Typ wird wie "kein Mapping" behandelt.
  const redirectMapping = mapping?.type === "redirect" ? mapping : null;
  const [isEditing, setIsEditing] = useState(false);
  // Felder aus dem bestehenden Mapping seeden (beim ersten Mount, da key=ps-ID).
  const [url, setUrl] = useState(redirectMapping?.config.url ?? "");
  const [openInNewTab, setOpenInNewTab] = useState(
    redirectMapping?.config.openInNewTab ?? false
  );

  const valid = isValidRedirectUrl(url);

  function handleSubmit() {
    // Defense: Speichern ist im UI bereits gesperrt, solange invalid.
    if (!valid) return;
    onSave({ url: url.trim(), openInNewTab });
    setIsEditing(false);
  }

  function handleCancel() {
    // Aenderungen verwerfen -> Felder auf das bestehende Mapping zuruecksetzen.
    setUrl(redirectMapping?.config.url ?? "");
    setOpenInNewTab(redirectMapping?.config.openInNewTab ?? false);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <RedirectForm
        url={url}
        openInNewTab={openInNewTab}
        valid={valid}
        onUrlChange={setUrl}
        onOpenInNewTabChange={setOpenInNewTab}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
  if (redirectMapping) {
    return (
      <RedirectView
        config={redirectMapping.config}
        onEdit={() => setIsEditing(true)}
        onRemove={onRemove}
      />
    );
  }
  return <ActionTiles onPickRedirect={() => setIsEditing(true)} />;
}

/**
 * Text-Override-Zustand fuer ein Textelement (Phase 5). Spiegelt RedirectActions:
 * - kein Mapping: Kachel "Text bearbeiten".
 * - Mapping vorhanden: Anzeige des Override-Texts + Bearbeiten/Entfernen.
 * - Bearbeiten/Anlegen: Textfeld (mit aktuellem Inhalt vorbefuellt) + Uebernehmen.
 */
function TextActions({
  element,
  mapping,
  onSave,
  onRemove,
}: {
  element: DetectedElement;
  mapping: Mapping | null;
  onSave: (config: TextConfig) => void;
  onRemove: () => void;
}) {
  const textMapping = mapping?.type === "text" ? mapping : null;
  const [isEditing, setIsEditing] = useState(false);
  // Vorbefuellung: bestehender Override -> dessen content; sonst der AKTUELLE
  // Textinhalt des Elements (element.text, voll/untrunciert).
  const [content, setContent] = useState(
    textMapping?.config.content ?? element.text ?? ""
  );

  function handleSubmit() {
    onSave({ content });
    setIsEditing(false);
  }

  function handleCancel() {
    setContent(textMapping?.config.content ?? element.text ?? "");
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <TextForm
        content={content}
        onContentChange={setContent}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
  if (textMapping) {
    return (
      <TextView
        content={textMapping.config.content}
        onEdit={() => setIsEditing(true)}
        onRemove={onRemove}
      />
    );
  }
  return <TextTile onPick={() => setIsEditing(true)} />;
}

/** Kachel: Text-Override starten. */
function TextTile({ onPick }: { onPick: () => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        Aktion wählen
      </p>
      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onPick}
          className="flex flex-col items-start gap-1 rounded-lg border border-gray-300 px-3 py-3 text-left hover:border-purple-400 hover:bg-purple-50 focus:outline-none focus:ring-1 focus:ring-purple-500"
        >
          <span className="text-sm font-medium text-gray-800">✎ Text bearbeiten</span>
          <span className="text-xs text-gray-500">
            Überschreibt den Text dieses Elements (A/B-Test am Wording).
          </span>
        </button>
      </div>
    </div>
  );
}

/** Anzeige eines bestehenden Text-Overrides. */
function TextView({
  content,
  onEdit,
  onRemove,
}: {
  content: string;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-purple-200 bg-purple-50 px-3 py-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-purple-700">
          ✎ Text-Override
        </p>
        <p className="whitespace-pre-wrap break-words text-sm text-gray-800">
          {content || "(leerer Text)"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Bearbeiten
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-400"
        >
          Entfernen
        </button>
      </div>
    </div>
  );
}

/** Textfeld (Anlegen/Bearbeiten). Uebernehmen wirkt NUR in den Draft. */
function TextForm({
  content,
  onContentChange,
  onSubmit,
  onCancel,
}: {
  content: string;
  onContentChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Text</span>
        <textarea
          autoFocus
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
          rows={5}
          className="resize-y rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500"
        />
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSubmit}
          className="flex-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1"
        >
          {/* "Übernehmen" wirkt NUR in den Draft (Code-/Mappings-State), klar
              abgegrenzt vom grossen "Speichern"-Button (DB). */}
          Übernehmen
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}

/** Kachel-Auswahl. Vorerst genau eine Kachel; das Grid traegt weitere mit. */
function ActionTiles({ onPickRedirect }: { onPickRedirect: () => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        Aktion wählen
      </p>
      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onPickRedirect}
          className="flex flex-col items-start gap-1 rounded-lg border border-gray-300 px-3 py-3 text-left hover:border-blue-400 hover:bg-blue-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          <span className="text-sm font-medium text-gray-800">
            🔗 Link / Weiterleitung
          </span>
          <span className="text-xs text-gray-500">
            Klick leitet auf eine URL weiter (Stripe-/PayPal-Link, generischer Link).
          </span>
        </button>
      </div>
    </div>
  );
}

/** Anzeige eines bestehenden Redirect-Mappings. */
function RedirectView({
  config,
  onEdit,
  onRemove,
}: {
  config: RedirectConfig;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-blue-700">
          🔗 Weiterleitung
        </p>
        <p className="break-all text-sm text-gray-800">{config.url}</p>
        <p className="mt-1 text-xs text-gray-500">
          {config.openInNewTab ? "Öffnet in neuem Tab" : "Öffnet im selben Tab"}
        </p>
      </div>
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onEdit}
          className="flex-1 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Bearbeiten
        </button>
        <button
          type="button"
          onClick={onRemove}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-400"
        >
          Entfernen
        </button>
      </div>
    </div>
  );
}

/** URL-Formular (Anlegen/Bearbeiten). Speichern gesperrt, solange URL invalid. */
function RedirectForm({
  url,
  openInNewTab,
  valid,
  onUrlChange,
  onOpenInNewTabChange,
  onSubmit,
  onCancel,
}: {
  url: string;
  openInNewTab: boolean;
  valid: boolean;
  onUrlChange: (v: string) => void;
  onOpenInNewTabChange: (v: boolean) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  // Fehlertext nur zeigen, wenn schon getippt wurde (leeres Feld nicht anmeckern).
  const showError = url.trim() !== "" && !valid;
  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Ziel-URL</span>
        <input
          type="url"
          inputMode="url"
          autoFocus
          value={url}
          onChange={(e) => onUrlChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && valid) onSubmit();
          }}
          placeholder="https://buy.stripe.com/..."
          className={`rounded-md border px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-1 ${
            showError
              ? "border-red-400 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500"
          }`}
        />
        {showError && (
          <span className="text-xs text-red-600">
            Bitte eine gültige http(s)-URL eingeben.
          </span>
        )}
      </label>

      <label className="flex items-center gap-2 text-sm text-gray-700">
        <input
          type="checkbox"
          checked={openInNewTab}
          onChange={(e) => onOpenInNewTabChange(e.target.checked)}
          className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
        />
        In neuem Tab öffnen
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!valid}
          className="flex-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {/* "Übernehmen" (nur in den Draft), klar abgegrenzt vom grossen
              "Speichern"-Button, der in die DB persistiert. */}
          Übernehmen
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Abbrechen
        </button>
      </div>
    </div>
  );
}
