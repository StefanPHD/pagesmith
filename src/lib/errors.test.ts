import { describe, expect, it } from "vitest";

import { errorName } from "./errors";

describe("errorName", () => {
  it("Error -> .name", () => {
    expect(errorName(new Error("boom"))).toBe("Error");
    expect(errorName(new TypeError("nope"))).toBe("TypeError");
  });

  // DIE Achse, die diesen Helper ueberhaupt rechtfertigt: eine DOMException ist je nach
  // Runtime/Testumgebung KEINE Error-Instanz -> `err instanceof Error` haette hier
  // "unknown" geliefert und den Timeout-Fall undiagnostizierbar gemacht.
  it("DOMException('AbortError') -> 'AbortError' (NICHT 'unknown')", () => {
    const abort = new DOMException("aborted", "AbortError");
    expect(errorName(abort)).toBe("AbortError");
    expect(errorName(abort)).not.toBe("unknown");
  });

  it("Nicht-Objekte und name-lose Werte -> 'unknown'", () => {
    expect(errorName("kaputt")).toBe("unknown");
    expect(errorName(null)).toBe("unknown");
    expect(errorName(undefined)).toBe("unknown");
    expect(errorName(42)).toBe("unknown");
    expect(errorName({})).toBe("unknown");
  });

  it("gibt IMMER einen String zurueck (auch bei exotischem name)", () => {
    expect(errorName({ name: 123 })).toBe("123");
    expect(typeof errorName({ name: null })).toBe("string");
  });
});
