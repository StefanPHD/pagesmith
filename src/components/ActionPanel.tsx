"use client";

import { useState } from "react";
import type { DetectedElement } from "@/lib/detect";
import {
  isValidRedirectUrl,
  type Mapping,
  type RedirectConfig,
} from "@/lib/mappings";

type ActionPanelProps = {
  // Das in der Preview angeklickte Element (via postMessage-Bruecke) oder null.
  selectedElement: DetectedElement | null;
  // Bestehendes Mapping des gewaehlten Elements (oder null = noch keine Aktion).
  mapping: Mapping | null;
  // Aktion zuweisen/aendern. Der Parent kuemmert sich um ps-ID-Anker + State.
  onSaveMapping: (config: RedirectConfig) => void;
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
          onSave={onSaveMapping}
          onRemove={onRemoveMapping}
        />
      )}
    </aside>
  );
}

/**
 * Aktions-Zustand fuer EIN ausgewaehltes Element. Drei Ansichten:
 * - kein Mapping: Aktions-Kacheln (vorerst eine: Link/Weiterleitung).
 * - Mapping vorhanden: Anzeige der Ziel-URL + Bearbeiten/Entfernen.
 * - Bearbeiten/Anlegen: Formular (URL + neuer-Tab-Toggle + Speichern).
 */
function ElementActions({
  element,
  mapping,
  onSave,
  onRemove,
}: {
  element: DetectedElement;
  mapping: Mapping | null;
  onSave: (config: RedirectConfig) => void;
  onRemove: () => void;
}) {
  const [isEditing, setIsEditing] = useState(false);
  // Felder aus dem bestehenden Mapping seeden (beim ersten Mount, da key=ps-ID).
  const [url, setUrl] = useState(mapping?.config.url ?? "");
  const [openInNewTab, setOpenInNewTab] = useState(
    mapping?.config.openInNewTab ?? false
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
    setUrl(mapping?.config.url ?? "");
    setOpenInNewTab(mapping?.config.openInNewTab ?? false);
    setIsEditing(false);
  }

  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Kontext: welches Element ist gerade gewaehlt. */}
      <div className="rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600">
        <span className="font-mono">&lt;{element.tag}&gt;</span>{" "}
        <span className="text-gray-800">{element.label}</span>
      </div>

      {isEditing ? (
        <RedirectForm
          url={url}
          openInNewTab={openInNewTab}
          valid={valid}
          onUrlChange={setUrl}
          onOpenInNewTabChange={setOpenInNewTab}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      ) : mapping ? (
        <RedirectView
          config={mapping.config}
          onEdit={() => setIsEditing(true)}
          onRemove={onRemove}
        />
      ) : (
        <ActionTiles onPickRedirect={() => setIsEditing(true)} />
      )}
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
