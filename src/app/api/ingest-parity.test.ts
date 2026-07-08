import { describe, expect, it, vi } from "vitest";

// Die Routen importieren mittelbar server-only Module (token.ts). Fuer den reinen
// Referenz-Identitaets-Test brauchen wir keine echte Supabase/Config-Umgebung —
// die Handler werden NICHT ausgefuehrt, nur ihre Funktionsreferenz verglichen.
vi.mock("server-only", () => ({}));
vi.mock("@/lib/capi/token", () => ({
  getCapiConfigByTrackingKey: vi.fn(async () => null),
}));

import * as capiRoute from "./capi/route";
import * as eRoute from "./e/route";
import { handleIngest, handleIngestOptions } from "@/lib/capi/ingest";

// Phase 7b: /api/e und /api/capi teilen sich EINEN Handler (src/lib/capi/ingest.ts),
// kein Copy-Paste. Der schaerfste Beweis ist Referenz-Identitaet: beide Routen
// exportieren buchstaeblich dieselbe Funktion -> CORS-Header, OPTIONS, Semantik koennen
// gar nicht divergieren.
describe("Ingest-Routen /api/e + /api/capi — geteilte Handler-Referenz (Scheibe 7b)", () => {
  it("POST beider Routen ist DIESELBE Funktion wie handleIngest", () => {
    expect(capiRoute.POST).toBe(handleIngest);
    expect(eRoute.POST).toBe(handleIngest);
    expect(capiRoute.POST).toBe(eRoute.POST);
  });

  it("OPTIONS beider Routen ist DIESELBE Funktion wie handleIngestOptions", () => {
    expect(capiRoute.OPTIONS).toBe(handleIngestOptions);
    expect(eRoute.OPTIONS).toBe(handleIngestOptions);
    expect(capiRoute.OPTIONS).toBe(eRoute.OPTIONS);
  });
});
