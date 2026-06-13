"use client";

import type { DetectedElement } from "@/lib/detect";

type ActionPanelProps = {
  // Das in der Preview angeklickte Element (via postMessage-Bruecke) oder null.
  selectedElement: DetectedElement | null;
};

/**
 * Rechte Zone des Workspace. Zeigt spaeter die Aktions-Kacheln (Stripe, PayPal,
 * Webhook ...) fuer das aktuell gewaehlte Element. Hier (Schritt 2.2) erst der
 * Empty-State bzw. die reine Anzeige der Auswahl – noch keine Aktionslogik.
 */
export default function ActionPanel({ selectedElement }: ActionPanelProps) {
  return (
    <aside className="flex w-80 shrink-0 flex-col rounded-lg border border-gray-300 bg-white">
      <div className="border-b border-gray-200 px-4 py-3">
        <h2 className="text-sm font-medium text-gray-700">Aktion</h2>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        {selectedElement === null ? (
          <p className="text-center text-sm text-gray-400">
            Wähle ein Element in der Vorschau, um eine Aktion zu verknüpfen.
          </p>
        ) : (
          <p className="text-center text-sm text-gray-700">
            {`Ausgewähltes Element: ${selectedElement.type} „${selectedElement.label}" (ID: ${selectedElement.id})`}
          </p>
        )}
      </div>
    </aside>
  );
}
