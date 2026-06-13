"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { annotateAndDetect, type ElementType } from "@/lib/detect";
import ActionPanel from "@/components/ActionPanel";

// Parsing + iframe-Preview sind die teuren Verbraucher. Sie sollen erst nach
// einer kurzen Tipp-Pause aktualisieren, damit grosse Landingpages die Eingabe
// nicht ausbremsen.
const DEBOUNCE_MS = 300;

const typeStyles: Record<ElementType, string> = {
  button: "bg-blue-100 text-blue-800 border-blue-200",
  form: "bg-green-100 text-green-800 border-green-200",
  link: "bg-amber-100 text-amber-800 border-amber-200",
};

export default function CodeImporter() {
  // Eingabe-State: aendert sich bei JEDEM Tastendruck und haelt die Textarea
  // sofort aktuell (Tippen darf nie auf Parsing/Preview warten).
  const [code, setCode] = useState("");
  // Debounced-State: speist Parsing + Preview erst nach DEBOUNCE_MS Ruhe.
  const [debouncedCode, setDebouncedCode] = useState("");
  // Linkes Panel manuell ein-/ausklappbar (Auto-Collapse beim Pasten kommt
  // bewusst erst in einem spaeteren Schritt).
  const [isInputCollapsed, setIsInputCollapsed] = useState(false);
  // In der Preview angeklicktes Element (via postMessage-Bruecke). Nur die ID
  // wird gehalten; das Element selbst wird abgeleitet, damit sich die Auswahl
  // bei Code-Aenderung sauber neu aufloest.
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedCode(code), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [code]);

  // EINE Quelle der Wahrheit: einmal parsen -> annotiertes HTML (mit IDs +
  // Listener-Script) fuers iframe UND die erkannten Elemente fuer die Liste.
  const { html: previewHtml, elements } = useMemo(
    () => annotateAndDetect(debouncedCode),
    [debouncedCode]
  );

  const counts = useMemo(
    () => ({
      button: elements.filter((e) => e.type === "button").length,
      form: elements.filter((e) => e.type === "form").length,
      link: elements.filter((e) => e.type === "link").length,
    }),
    [elements]
  );

  // Ausgewaehltes Element abgeleitet: faellt automatisch auf null zurueck, wenn
  // die ID nach einer Code-Aenderung nicht mehr existiert.
  const selectedElement = useMemo(
    () => elements.find((e) => e.id === selectedElementId) ?? null,
    [elements, selectedElementId]
  );

  // Klick-Bruecke aus dem sandboxed iframe. Registriert sich EINMAL ([] deps);
  // iframeRef + setSelectedElementId sind stabil.
  // Das iframe laeuft mit sandbox="allow-scripts" (ohne allow-same-origin) ->
  // event.origin ist "null", daher bewusst KEINE Origin-Pruefung. Stattdessen
  // pruefen wir die Quelle (contentWindow) und den Message-Typ.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      if (e.data?.type !== "ELEMENT_CLICKED") return;
      setSelectedElementId(e.data.elementId ?? null);
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  return (
    <div className="flex w-full flex-col gap-4 lg:flex-row">
      {/* Zone 1 (links): Code-Eingabe, manuell einklappbar. shrink-0, damit bei
          Platzmangel die Preview schrumpft, nicht dieses Panel. */}
      <section
        className={`flex shrink-0 flex-col self-start rounded-lg border border-gray-300 bg-white ${
          isInputCollapsed ? "w-12" : "w-full lg:w-80"
        }`}
      >
        {/* Header: Titel (nur expandiert) + Chevron-Toggle. */}
        <div
          className={`flex items-center border-b border-gray-200 px-2 py-3 ${
            isInputCollapsed ? "justify-center" : "justify-between"
          }`}
        >
          {!isInputCollapsed && (
            <h2 className="truncate pl-2 text-sm font-medium text-gray-700">
              Dein Code
            </h2>
          )}
          <button
            type="button"
            onClick={() => setIsInputCollapsed((v) => !v)}
            aria-label={isInputCollapsed ? "Eingabe ausklappen" : "Eingabe einklappen"}
            aria-expanded={!isInputCollapsed}
            className="flex h-7 w-7 items-center justify-center rounded text-gray-500 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <Chevron direction={isInputCollapsed ? "right" : "left"} />
          </button>
        </div>

        {/* Expandierter Inhalt: bleibt STETS gemountet (Textarea behaelt State
            + Debounce), wird beim Einklappen nur per display:none versteckt. */}
        <div className={isInputCollapsed ? "hidden" : "flex flex-col gap-3 p-3"}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="<button>Jetzt kaufen</button> ..."
            className="h-96 w-full resize-none rounded-lg border border-gray-300 p-4 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            spellCheck={false}
          />
          <div className="flex gap-3 text-sm text-gray-600">
            <span>🔘 {counts.button} Buttons</span>
            <span>📋 {counts.form} Forms</span>
            <span>🔗 {counts.link} Links</span>
          </div>

          {/* Erkannte Elemente (1:1 aus Phase 1, Logik/Styling unveraendert). */}
          <div>
            <h2 className="mb-2 text-sm font-medium text-gray-700">
              Erkannte Elemente ({elements.length})
            </h2>
            <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
              {elements.length === 0 && (
                <p className="text-sm text-gray-400">
                  Noch nichts erkannt – paste Code oben rein.
                </p>
              )}
              {elements.map((el, i) => (
                <div
                  key={i}
                  className={`flex items-center gap-2 rounded-md border px-3 py-2 text-sm ${typeStyles[el.type]}`}
                >
                  <span className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                    &lt;{el.tag}&gt;
                  </span>
                  <span className="truncate">{el.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Eingeklappt: kompakte vertikale Zaehler-Badges. */}
        {isInputCollapsed && (
          <div className="flex flex-col items-center gap-2 py-3 text-xs text-gray-600">
            <span title="Buttons">🔘{counts.button}</span>
            <span title="Forms">📋{counts.form}</span>
            <span title="Links">🔗{counts.link}</span>
          </div>
        )}
      </section>

      {/* Zone 2 (Mitte): Live-Preview. min-w-0 + flex-1 = nimmt die freie Breite
          und schrumpft zuerst. Das iframe bleibt an stabiler Baumposition,
          damit Ein-/Ausklappen es nicht neu mountet (kein srcDoc-Reload). */}
      <section className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-300 bg-white">
        <div className="border-b border-gray-200 px-4 py-3">
          <h2 className="text-sm font-medium text-gray-700">
            Live-Preview (sandboxed)
          </h2>
        </div>
        <div className="flex flex-1 flex-col p-3">
          <iframe
            ref={iframeRef}
            title="preview"
            srcDoc={previewHtml}
            // allow-scripts aktiviert das injizierte Listener-Script. NIEMALS
            // allow-same-origin dazu – die Kombination bricht den Fremdcode aus
            // der Sandbox aus.
            sandbox="allow-scripts"
            className="h-full min-h-[32rem] w-full flex-1 rounded-lg border border-gray-300 bg-white"
          />
        </div>
      </section>

      {/* Zone 3 (rechts): Action-Panel. CodeImporter bleibt State-Besitzer und
          reicht das gewaehlte Element durch – in diesem Schritt immer null. */}
      <ActionPanel selectedElement={selectedElement} />
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {direction === "left" ? (
        <polyline points="10 3 5 8 10 13" />
      ) : (
        <polyline points="6 3 11 8 6 13" />
      )}
    </svg>
  );
}
