"use client";

import { useEffect, useMemo, useState } from "react";
import { detectElements, type ElementType } from "@/lib/detect";

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

  useEffect(() => {
    const id = setTimeout(() => setDebouncedCode(code), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [code]);

  const elements = useMemo(
    () => detectElements(debouncedCode),
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

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
      {/* Linke Spalte: Eingabe */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-gray-700">
          Dein HTML / CSS / JS reinpasten:
        </label>
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
      </div>

      {/* Rechte Spalte: Preview + erkannte Elemente */}
      <div className="flex flex-col gap-4">
        <div>
          <h2 className="mb-2 text-sm font-medium text-gray-700">
            Live-Preview (sandboxed)
          </h2>
          <iframe
            title="preview"
            srcDoc={debouncedCode}
            sandbox=""
            className="h-64 w-full rounded-lg border border-gray-300 bg-white"
          />
        </div>

        <div>
          <h2 className="mb-2 text-sm font-medium text-gray-700">
            Erkannte Elemente ({elements.length})
          </h2>
          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
            {elements.length === 0 && (
              <p className="text-sm text-gray-400">
                Noch nichts erkannt – paste Code links rein.
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
    </div>
  );
}
