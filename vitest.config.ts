import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // jsdom liefert DOMParser & DOM-APIs fuer die Detection-Logik.
    environment: "jsdom",
    include: ["src/**/*.test.ts"],
  },
});
