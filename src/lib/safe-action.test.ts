import { describe, expect, it, vi } from "vitest";
import { redirect } from "next/navigation";
import {
  ACTION_THROW_MESSAGE,
  SAVE_THROW_MESSAGE,
  actionThrew,
  safeAction,
} from "./safe-action";

describe("safeAction (Fehlerbehandlung fuer Client-Action-Aufrufe)", () => {
  // Die reale Form einer Mutations-Action (SaveResult): T wird aus dem Thunk
  // inferiert, der Ersatzwert MUSS derselben Union genuegen — genau das ist der
  // Typschutz, der einen falschen Fallback zum Build-Fehler macht.
  type Save = { ok: true; id: string } | { ok: false; error: string };

  it("ERFOLG unveraendert durchgereicht (Invariante i: der Wrapper greift nur beim Wurf)", async () => {
    const run = vi.fn(async (): Promise<Save> => ({ ok: true, id: "p1" }));
    expect(await safeAction(run, actionThrew())).toEqual({ ok: true, id: "p1" });
    expect(run).toHaveBeenCalledTimes(1);
  });

  it("WURF -> der uebergebene Ersatzwert, kein Throw nach aussen", async () => {
    const boom = async () => {
      throw new Error("net::ERR_INTERNET_DISCONNECTED");
    };
    await expect(safeAction(boom, actionThrew())).resolves.toEqual({
      ok: false,
      error: ACTION_THROW_MESSAGE,
    });
  });

  it("der Ersatzwert wird 1:1 uebernommen — auch Leser-Formen und reason-Felder", async () => {
    const boom = async () => {
      throw new Error("x");
    };
    // Leser: [] bzw. null.
    await expect(safeAction<number[]>(boom, [])).resolves.toEqual([]);
    await expect(safeAction<string | null>(boom, null)).resolves.toBeNull();
    // Domain-Mutationen verlangen zusaetzlich reason — der Aufrufer stellt es.
    await expect(
      safeAction(boom, { ...actionThrew(), reason: "internal_error" as const })
    ).resolves.toEqual({
      ok: false,
      error: ACTION_THROW_MESSAGE,
      reason: "internal_error",
    });
  });

  it("AUFLAGE 1 / Invariante viii: ein KONTROLLFLUSS-Wurf wird DURCHGELASSEN, nicht normalisiert", async () => {
    // Next.js benutzt geworfene Fehler als Signal (redirect/notFound/…). Faenge der
    // Wrapper sie, faende die Weiterleitung schlicht nicht statt — ohne Fehler,
    // ohne Meldung. Der Test erzeugt das ECHTE Signal ueber redirect() selbst,
    // nicht ueber einen nachgebauten Fehler: nur so ist bewiesen, dass
    // unstable_rethrow genau diese Klasse erkennt.
    const run = async () => {
      redirect("/login");
    };
    await expect(safeAction(run, actionThrew())).rejects.toThrow();
    // Gegenprobe: der Ersatzwert wurde NICHT geliefert (sonst waere das Signal
    // verschluckt und der Test oben schon durch ein resolves gruen).
  });

  it("ein GEWOEHNLICHER Fehler wird NICHT durchgelassen (Gegenprobe zum Riegel oben)", async () => {
    const run = async () => {
      throw new TypeError("irgendein Programmierfehler");
    };
    await expect(safeAction(run, actionThrew())).resolves.toEqual({
      ok: false,
      error: ACTION_THROW_MESSAGE,
    });
  });

  it("Texte behaupten weder Ursache noch Ergebnis", async () => {
    // Wortwahl-Disziplin (Phase 8): eine Meldung darf nicht mehr sagen, als die
    // Daten hergeben. Wir wissen NICHT, warum es scheiterte, und NICHT, ob der
    // Write auf dem Rueckweg doch ankam.
    for (const msg of [ACTION_THROW_MESSAGE, SAVE_THROW_MESSAGE]) {
      expect(msg).toContain("konnte nicht abgeschlossen werden");
      expect(msg).not.toMatch(/Verbindung zum Server|Netzwerk|offline/i);
      expect(msg).not.toMatch(/wurde nicht ausgeführt|nicht gespeichert/i);
    }
    // Die Entwarnung steht NUR am Speicherpfad — beim Loeschen/Publish gibt es
    // keine "Aenderungen", die noch da waeren.
    expect(SAVE_THROW_MESSAGE).toContain("noch da");
    expect(ACTION_THROW_MESSAGE).not.toContain("noch da");
  });

  it("actionThrew nimmt optional einen eigenen Text", () => {
    expect(actionThrew()).toEqual({ ok: false, error: ACTION_THROW_MESSAGE });
    expect(actionThrew(SAVE_THROW_MESSAGE)).toEqual({
      ok: false,
      error: SAVE_THROW_MESSAGE,
    });
  });
});
