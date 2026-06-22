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
  },
});
