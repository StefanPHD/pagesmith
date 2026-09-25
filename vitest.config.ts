import { resolve } from "node:path";
import { defineConfig } from "vitest/config";

export default defineConfig({
  // "@/..."-Imports (wie in den Komponenten) auch im Test aufloesen.
  resolve: {
    alias: { "@": resolve(__dirname, "src") },
  },
  // React-19-JSX (automatic runtime) wird von oxc anhand tsconfig "jsx":
  // "react-jsx" transformiert — kein zusaetzliches Plugin noetig.
  test: {
    // jsdom liefert DOMParser & DOM-APIs fuer die Detection-Logik.
    environment: "jsdom",
    include: ["src/**/*.test.{ts,tsx}"],
    // DER FILTER GEGEN DAS RAUSCHEN DER ERFOLGSZEILEN (Phase 11.7, S10c, Mitnahme an Q7).
    // Seit S10 schreibt jeder Adapter bei einer angenommenen Antwort
    // "[capi] <Ziel> forward accepted: HTTP <Status>" nach stdout; in Tests, die einen
    // echten Adapter mit einer 2xx-Antwort fahren und console.info nicht abfangen, landete
    // diese Zeile im Protokoll.
    // WAS ER TRIFFT: AUSSCHLIESSLICH eine stdout-Zeile, die von Anfang bis Ende genau
    // diese Form hat — die fuenf Anzeigenamen, drei Ziffern, sonst nichts (verankert).
    // WAS ER NICHT TRIFFT: stderr, jede Fehler-, Warn- oder skipped-Zeile, jede Zeile mit
    // Zusatz vor oder nach dem Muster, einen sechsten Zielnamen. Sie bleiben sichtbar.
    // WARUM ENG: Ein Filter sieht Zeichen, nicht Bedeutung; er muss streng irren — lieber
    // eine Zeile zu viel im Protokoll als eine verschluckte Meldung
    // (docs/immer-beachten.md, "EIN WÄCHTER ÜBER QUELLTEXT SIEHT ZEICHEN, NICHT
    // BEDEUTUNG"). Ein neues Ziel kommt deshalb ausdruecklich in die Namensliste.
    // SPIONE BLEIBEN UNBERUEHRT: Er wirkt allein auf die Ausgabe des Reporters. Ein
    // vi.spyOn(console, "info") sieht die Zeile weiter und zaehlt sie; die Tests der
    // Erfolgszeile (T8, TS, MS, PS, GS) pruefen sie dort.
    onConsoleLog(log, type) {
      if (
        type === "stdout" &&
        /^\[capi\] (?:Meta|Pinterest|TikTok|LinkedIn|Google) forward accepted: HTTP [0-9]{3}\n?$/.test(
          log,
        )
      ) {
        return false;
      }
    },
  },
});
