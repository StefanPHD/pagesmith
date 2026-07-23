import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("server-only", () => ({}));

// Der Insert-Builder: .insert(...).abortSignal(...) — abortSignal ist das Ende der
// Kette und liefert das {data,error}-Ergebnis.
type EventRow = Record<string, unknown>;
type InsertResult = { data: null; error: { code?: string; message?: string } | null };

const { createAdminClient, insert, abortSignal, from } = vi.hoisted(() => {
  const abortSignal =
    vi.fn<(signal: AbortSignal) => Promise<InsertResult>>();
  const insert = vi.fn<(row: EventRow) => { abortSignal: typeof abortSignal }>(
    () => ({ abortSignal }),
  );
  const from = vi.fn<(table: string) => { insert: typeof insert }>(() => ({
    insert,
  }));
  return { createAdminClient: vi.fn(() => ({ from })), insert, abortSignal, from };
});
vi.mock("@/lib/supabase/admin", () => ({ createAdminClient }));

import { persistEvent } from "./persist";

const PARAMS = {
  projectId: "proj-1",
  eventType: "Purchase",
  eventId: "evt-123",
  // source ist seit Scheibe A ein PFLICHT-Argument (kein Default): events.source ist
  // NOT NULL ohne column-DEFAULT -> jeder Schreibpfad setzt die Herkunft bewusst.
  source: "server",
} as const;

beforeEach(() => {
  abortSignal.mockResolvedValue({ data: null, error: null });
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("persistEvent (Phase 8 Scheibe 1)", () => {
  it("schreibt GENAU EINE Zeile in events mit source='server' und exakt den Spec-Spalten", async () => {
    await persistEvent(PARAMS);

    expect(from).toHaveBeenCalledWith("events");
    expect(insert).toHaveBeenCalledTimes(1);
    // Exakte Spaltenmenge: id/created_at kommen per DB-Default, KEIN IP/UA.
    expect(insert).toHaveBeenCalledWith({
      project_id: "proj-1",
      event_type: "Purchase",
      event_id: "evt-123",
      source: "server",
    });
  });

  // Scheibe A: der zweite Beobachtungs-Ort. Diskriminierend gegen einen stillen
  // 'server'-Fallback — faellt der Wert je zurueck, bricht der browser-vs-server-Join
  // der Verlustrate lautlos (die Rate zeigte dann permanent 0%).
  it("source='browser' landet als 'browser' im Insert (kein stiller server-Fallback)", async () => {
    await persistEvent({ ...PARAMS, source: "browser" });

    expect(insert).toHaveBeenCalledWith({
      project_id: "proj-1",
      event_type: "Purchase",
      event_id: "evt-123",
      source: "browser",
    });
  });

  it("(e) event_type laenger als 64 Zeichen wird HART getruncated", async () => {
    await persistEvent({ ...PARAMS, eventType: "X".repeat(200) });

    const row = insert.mock.calls[0][0] as EventRow & { event_type: string };
    expect(row.event_type).toHaveLength(64);
    expect(row.event_type).toBe("X".repeat(64));
  });

  it("kuerzere event_type bleiben unveraendert (kein Padding/Verstuemmeln)", async () => {
    await persistEvent({ ...PARAMS, eventType: "Lead" });

    const row = insert.mock.calls[0][0] as EventRow & { event_type: string };
    expect(row.event_type).toBe("Lead");
  });

  it("Insert laeuft unter einem AbortSignal (Timeout-Schutz)", async () => {
    await persistEvent(PARAMS);

    expect(abortSignal).toHaveBeenCalledTimes(1);
    expect(abortSignal.mock.calls[0]?.[0]).toBeInstanceOf(AbortSignal);
  });

  it("PostgREST-Fehler wird destrukturiert + geloggt, NIE geworfen", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    abortSignal.mockResolvedValue({
      data: null,
      error: { code: "42703", message: "column does not exist" },
    });

    // Wirft nicht — ein Analytics-Fehler darf den Ingest nie beeintraechtigen.
    await expect(persistEvent(PARAMS)).resolves.toBeUndefined();

    expect(spy).toHaveBeenCalledTimes(1);
    const logged = spy.mock.calls[0]?.[0] as string;
    expect(logged).toContain("42703");
    // Die Message koennte Client-Input tragen -> gehoert NICHT ins Log.
    expect(logged).not.toContain("column does not exist");
    spy.mockRestore();
  });

  it("geworfener Insert (z.B. Abort) wird geschluckt und sanitized geloggt", async () => {
    const spy = vi.spyOn(console, "error").mockImplementation(() => {});
    abortSignal.mockRejectedValue(new DOMException("aborted", "AbortError"));

    await expect(persistEvent(PARAMS)).resolves.toBeUndefined();

    expect(spy).toHaveBeenCalledTimes(1);
    expect(spy.mock.calls[0]?.[0] as string).toContain("AbortError");
    spy.mockRestore();
  });
});
