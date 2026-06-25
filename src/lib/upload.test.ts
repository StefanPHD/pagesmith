import { describe, expect, it } from "vitest";
import { MAX_UPLOAD_BYTES, validateUploadFile } from "./upload";

// Baut eine minimale File-Attrappe mit kontrollierter Groesse, ohne tatsaechlich
// MB an Inhalt zu erzeugen (size ist als read-only definiert).
function fakeFile(name: string, type: string, size: number): File {
  const f = new File(["x"], name, { type });
  Object.defineProperty(f, "size", { value: size });
  return f;
}

describe("validateUploadFile", () => {
  it("akzeptiert eine .html-Datei mit text/html", () => {
    expect(validateUploadFile(fakeFile("seite.html", "text/html", 1024))).toEqual({
      ok: true,
    });
  });

  it("akzeptiert .html auch bei leerem type (lokale Datei)", () => {
    expect(validateUploadFile(fakeFile("seite.html", "", 1024))).toEqual({
      ok: true,
    });
  });

  it("lehnt einen falschen Dateityp mit Meldung ab", () => {
    const r = validateUploadFile(fakeFile("bild.png", "image/png", 1024));
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/HTML/i);
  });

  it("lehnt eine zu grosse Datei mit Meldung ab", () => {
    const r = validateUploadFile(
      fakeFile("riesig.html", "text/html", MAX_UPLOAD_BYTES + 1)
    );
    expect(r.ok).toBe(false);
    if (!r.ok) expect(r.error).toMatch(/2 MB/);
  });

  it("akzeptiert eine Datei exakt an der Groessengrenze", () => {
    expect(
      validateUploadFile(fakeFile("grenze.html", "text/html", MAX_UPLOAD_BYTES))
    ).toEqual({ ok: true });
  });
});
