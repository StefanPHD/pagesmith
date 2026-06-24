import { describe, expect, it } from "vitest";
import { exportFilename } from "./export";

describe("exportFilename", () => {
  it("slugifiziert einen normalen Namen mit Leerzeichen", () => {
    expect(exportFilename("Mein Projekt")).toBe("mein-projekt.html");
  });

  it("fasst Sonderzeichen/Folgen zu einem Bindestrich zusammen und trimmt Raender", () => {
    expect(exportFilename("  Black Friday!!! 2026  ")).toBe(
      "black-friday-2026.html"
    );
    expect(exportFilename("a/b\\c:d")).toBe("a-b-c-d.html");
  });

  it("transliteriert Diakritika statt sie zu verschlucken", () => {
    expect(exportFilename("Über uns")).toBe("uber-uns.html");
    expect(exportFilename("Café Münster")).toBe("cafe-munster.html");
  });

  it("faellt bei leerem Namen auf den Fallback zurueck", () => {
    expect(exportFilename("")).toBe("pagesmith-export.html");
    expect(exportFilename("   ")).toBe("pagesmith-export.html");
    expect(exportFilename(null)).toBe("pagesmith-export.html");
    expect(exportFilename(undefined)).toBe("pagesmith-export.html");
  });

  it("faellt beim Default-Projektnamen auf den Fallback zurueck (nicht 'unbenanntes-projekt')", () => {
    expect(exportFilename("Unbenanntes Projekt")).toBe("pagesmith-export.html");
    // auch mit umgebenden Leerzeichen wird der Default erkannt
    expect(exportFilename("  Unbenanntes Projekt  ")).toBe(
      "pagesmith-export.html"
    );
  });

  it("faellt auf den Fallback, wenn nach dem Slugify nichts uebrig bleibt", () => {
    expect(exportFilename("🚀🚀")).toBe("pagesmith-export.html");
    expect(exportFilename("---")).toBe("pagesmith-export.html");
  });
});
