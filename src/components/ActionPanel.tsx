"use client";

import { useState } from "react";
import type { DetectedElement } from "@/lib/detect";
import {
  displayTextFor,
  findMapping,
  isValidRedirectUrl,
  type Mapping,
  type RedirectConfig,
  type TextConfig,
  type TrackConfig,
} from "@/lib/mappings";
import { META_STANDARD_EVENTS, META_VALUE_EVENTS } from "@/lib/tracking/meta";

// Sentinel im Event-Dropdown fuer "Custom…": schaltet auf ein freies Textfeld
// (fbq trackCustom). Kollidiert nicht mit Meta-Standard-Event-Namen.
const CUSTOM_EVENT = "__custom__";

// Waehrungen fuers value/currency-Feld. Klein gehalten (DACH + international).
const CURRENCIES = ["EUR", "USD", "GBP", "CHF"] as const;

type ActionPanelProps = {
  // Das in der Preview angeklickte Element (via postMessage-Bruecke) oder null.
  selectedElement: DetectedElement | null;
  // Die VOLLSTAENDIGE Mapping-Liste; ActionPanel leitet pro selektiertem Element
  // die Slots (redirect / track / text) per (elementId, type) ab. Ein interaktives
  // Element kann zwei Slots zugleich tragen (redirect + track).
  mappings: Mapping[];
  // Redirect-Aktion zuweisen/aendern. Der Parent kuemmert sich um ps-ID-Anker + State.
  onSaveRedirect: (config: RedirectConfig) => void;
  // Tracking-Aktion zuweisen/aendern (Phase 6 Scheibe 1a, STRUKTURELL).
  onSaveTrack: (config: TrackConfig) => void;
  // Text-Override zuweisen/aendern (Phase 5).
  onSaveText: (config: TextConfig) => void;
  // Aktion entfernen — type waehlt den Slot (redirect | track | text).
  onRemove: (type: Mapping["type"]) => void;
};

/**
 * Rechte Zone des Workspace. Erfasst die ABSICHT (welche Aktion soll ein Element
 * ausloesen) und speichert sie als Mapping. Das echte AUSFUEHREN (Button feuert
 * wirklich) gehoert NICHT hierher, sondern in den spaeteren Code-Gen-Schritt
 * (Phase 4, Cheerio) — die Preview bleibt selektions-only.
 */
export default function ActionPanel({
  selectedElement,
  mappings,
  onSaveRedirect,
  onSaveTrack,
  onSaveText,
  onRemove,
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
          mappings={mappings}
          onSaveRedirect={onSaveRedirect}
          onSaveTrack={onSaveTrack}
          onSaveText={onSaveText}
          onRemove={onRemove}
        />
      )}
    </aside>
  );
}

/**
 * Dispatcher nach Element-Kategorie: Textelemente bekommen den Text-Override-Flow
 * (Phase 5, Ein-Aktion). Interaktive Elemente bekommen ZWEI gestapelte Sektionen —
 * Weiterleitung (redirect) UND Tracking (track) —, je unabhaengig zuweisbar/
 * entfernbar (Compound-Key, Scheibe 1a). Die Slots werden per (elementId, type) aus
 * der vollen mappings-Liste abgeleitet.
 */
function ElementActions({
  element,
  mappings,
  onSaveRedirect,
  onSaveTrack,
  onSaveText,
  onRemove,
}: {
  element: DetectedElement;
  mappings: Mapping[];
  onSaveRedirect: (config: RedirectConfig) => void;
  onSaveTrack: (config: TrackConfig) => void;
  onSaveText: (config: TextConfig) => void;
  onRemove: (type: Mapping["type"]) => void;
}) {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      {/* Kontext: welches Element ist gerade gewaehlt. Zeigt — wie die Liste —
          ueber den GETEILTEN Deriver den ueberschriebenen Text, sobald ein
          Text-Override existiert. */}
      <div className="rounded-md bg-gray-50 px-3 py-2 text-xs text-gray-600">
        <span className="font-mono">&lt;{element.tag}&gt;</span>{" "}
        <span className="text-gray-800">{displayTextFor(element, mappings)}</span>
      </div>

      {element.type === "text" ? (
        <TextActions
          element={element}
          mapping={findMapping(mappings, element.id, "text")}
          onSave={onSaveText}
          onRemove={() => onRemove("text")}
        />
      ) : (
        // Interaktiv = zwei unabhaengige Slots, gestapelt.
        <div className="flex flex-col gap-4">
          <RedirectActions
            mapping={findMapping(mappings, element.id, "redirect")}
            onSave={onSaveRedirect}
            onRemove={() => onRemove("redirect")}
          />
          <TrackActions
            mapping={findMapping(mappings, element.id, "track")}
            onSave={onSaveTrack}
            onRemove={() => onRemove("track")}
          />
        </div>
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

/**
 * Tracking-Aktions-Zustand (Phase 6 Scheibe 1b, ECHTE Meta-Semantik). Spiegelt
 * RedirectActions: Kachel -> Anzeige -> Formular. Standard-Event-Dropdown +
 * "Custom…"-Zweig (fbq trackCustom); value/currency dynamisch nur bei
 * wert-tragenden Events (META_VALUE_EVENTS) ODER Custom-Events.
 */
function TrackActions({
  mapping,
  onSave,
  onRemove,
}: {
  mapping: Mapping | null;
  onSave: (config: TrackConfig) => void;
  onRemove: () => void;
}) {
  const trackMapping = mapping?.type === "track" ? mapping : null;
  const [isEditing, setIsEditing] = useState(false);
  // Seed aus bestehendem Mapping (key=ps-ID -> nur beim Mount). isCustom traegt der
  // Config-Flag; defensiv faellt ein nicht-Standard-Event ohne Flag auch auf custom.
  const seededCustom =
    trackMapping?.config.isCustom ??
    (trackMapping
      ? !META_STANDARD_EVENTS.includes(
          trackMapping.config.event as (typeof META_STANDARD_EVENTS)[number]
        )
      : false);
  const [isCustom, setIsCustom] = useState(seededCustom);
  const [event, setEvent] = useState(trackMapping?.config.event ?? "");
  const [value, setValue] = useState(
    trackMapping?.config.value != null ? String(trackMapping.config.value) : ""
  );
  const [currency, setCurrency] = useState(
    trackMapping?.config.currency ?? "EUR"
  );

  const valid = event.trim() !== "";
  // value/currency nur bei wert-tragenden Standard-Events ODER Custom (freie Wahl).
  const showValue = isCustom || META_VALUE_EVENTS.has(event);

  function reseed() {
    setIsCustom(seededCustom);
    setEvent(trackMapping?.config.event ?? "");
    setValue(
      trackMapping?.config.value != null ? String(trackMapping.config.value) : ""
    );
    setCurrency(trackMapping?.config.currency ?? "EUR");
  }

  function handleSubmit() {
    if (!valid) return;
    const config: TrackConfig = { event: event.trim() };
    if (isCustom) config.isCustom = true;
    // value/currency nur mitschicken, wenn sichtbar UND eine gueltige Zahl steht.
    if (showValue && value.trim() !== "") {
      const num = Number(value);
      if (!Number.isNaN(num)) {
        config.value = num;
        config.currency = currency;
      }
    }
    onSave(config);
    setIsEditing(false);
  }

  function handleCancel() {
    reseed();
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <TrackForm
        isCustom={isCustom}
        event={event}
        value={value}
        currency={currency}
        showValue={showValue}
        valid={valid}
        onSelectChange={(v) => {
          if (v === CUSTOM_EVENT) {
            setIsCustom(true);
            setEvent("");
          } else {
            setIsCustom(false);
            setEvent(v);
          }
        }}
        onEventChange={setEvent}
        onValueChange={setValue}
        onCurrencyChange={setCurrency}
        onSubmit={handleSubmit}
        onCancel={handleCancel}
      />
    );
  }
  if (trackMapping) {
    return (
      <TrackView
        config={trackMapping.config}
        onEdit={() => setIsEditing(true)}
        onRemove={onRemove}
      />
    );
  }
  return <TrackTile onPick={() => setIsEditing(true)} />;
}

/** Kachel: Tracking-Event starten. */
function TrackTile({ onPick }: { onPick: () => void }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-gray-400">
        Tracking
      </p>
      <div className="grid grid-cols-1 gap-2">
        <button
          type="button"
          onClick={onPick}
          className="flex flex-col items-start gap-1 rounded-lg border border-gray-300 px-3 py-3 text-left hover:border-emerald-400 hover:bg-emerald-50 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <span className="text-sm font-medium text-gray-800">
            🎯 Tracking-Event
          </span>
          <span className="text-xs text-gray-500">
            Feuert bei Klick ein Event (zusätzlich zur Weiterleitung).
          </span>
        </button>
      </div>
    </div>
  );
}

/** Anzeige eines bestehenden Tracking-Mappings. */
function TrackView({
  config,
  onEdit,
  onRemove,
}: {
  config: TrackConfig;
  onEdit: () => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-3">
        <p className="mb-1 text-xs font-medium uppercase tracking-wide text-emerald-700">
          🎯 Meta-Pixel-Event{config.isCustom ? " (Custom)" : ""}
        </p>
        <p className="break-all text-sm text-gray-800">
          {config.event || "(kein Event)"}
        </p>
        {config.value != null && (
          <p className="mt-1 text-xs text-gray-500">
            Wert: {config.value} {config.currency ?? ""}
          </p>
        )}
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

/**
 * Event-Formular (Anlegen/Bearbeiten, Scheibe 1b). Standard-Event-Dropdown +
 * "Custom…"-Zweig; value/currency dynamisch nur bei showValue. Übernehmen gesperrt
 * bei leerem Event.
 */
function TrackForm({
  isCustom,
  event,
  value,
  currency,
  showValue,
  valid,
  onSelectChange,
  onEventChange,
  onValueChange,
  onCurrencyChange,
  onSubmit,
  onCancel,
}: {
  isCustom: boolean;
  event: string;
  value: string;
  currency: string;
  showValue: boolean;
  valid: boolean;
  onSelectChange: (v: string) => void;
  onEventChange: (v: string) => void;
  onValueChange: (v: string) => void;
  onCurrencyChange: (v: string) => void;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <label className="flex flex-col gap-1 text-sm">
        <span className="font-medium text-gray-700">Standard-Event</span>
        <select
          autoFocus
          value={isCustom ? CUSTOM_EVENT : event}
          onChange={(e) => onSelectChange(e.target.value)}
          className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
        >
          <option value="" disabled>
            Event wählen …
          </option>
          {META_STANDARD_EVENTS.map((ev) => (
            <option key={ev} value={ev}>
              {ev}
            </option>
          ))}
          <option value={CUSTOM_EVENT}>Custom …</option>
        </select>
      </label>

      {isCustom && (
        <label className="flex flex-col gap-1 text-sm">
          <span className="font-medium text-gray-700">Custom-Event-Name</span>
          <input
            type="text"
            value={event}
            onChange={(e) => onEventChange(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && valid) onSubmit();
            }}
            placeholder="z.B. ViewPricing"
            className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
        </label>
      )}

      {showValue && (
        <div className="flex gap-2">
          <label className="flex flex-1 flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Wert (optional)</span>
            <input
              type="number"
              inputMode="decimal"
              min="0"
              step="0.01"
              value={value}
              onChange={(e) => onValueChange(e.target.value)}
              placeholder="z.B. 49.90"
              className="rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </label>
          <label className="flex flex-col gap-1 text-sm">
            <span className="font-medium text-gray-700">Währung</span>
            <select
              value={currency}
              onChange={(e) => onCurrencyChange(e.target.value)}
              className="rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {CURRENCIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSubmit}
          disabled={!valid}
          className="flex-1 rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {/* "Übernehmen" wirkt NUR in den Draft, klar abgegrenzt vom grossen
              "Speichern"-Button (DB). */}
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

