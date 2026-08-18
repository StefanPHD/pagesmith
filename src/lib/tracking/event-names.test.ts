import { describe, expect, it } from "vitest";

import { PAGEVIEW_EVENT } from "@/lib/analytics/events";
import type { Mapping } from "@/lib/mappings";
import { trackEventNames, usedTrackEventNames } from "./event-names";

// Kurzformen fuer die Fixtures. Bewusst DREI Zweige, damit der Typ-Diskriminator
// als vollstaendiger Filter geprueft werden kann und nicht nur der track-Zweig
// vorkommt.
const track = (id: string, event: string): Mapping => ({
  elementId: id,
  type: "track",
  config: { event },
});
const redirect = (id: string, url: string): Mapping => ({
  elementId: id,
  type: "redirect",
  config: { url, openInNewTab: false },
});
const text = (id: string, content: string): Mapping => ({
  elementId: id,
  type: "text",
  config: { content },
});

describe("trackEventNames — das Praedikat ueber EINER Mapping-Menge", () => {
  // T1
  it("nimmt NUR track-Zweige auf (redirect und text tragen keinen Ereignisnamen)", () => {
    const mappings = [
      redirect("ps-aaaaaa", "https://a.test"),
      track("ps-bbbbbb", "Lead"),
      text("ps-cccccc", "Headline"),
    ];
    expect(trackEventNames(mappings)).toEqual(["Lead"]);
  });

  // T2 — die Dedup liegt in der VEREINIGUNG, nicht hier. Der Test haelt diese
  // Arbeitsteilung fest: wer sie hierher zieht, hat sie an ZWEI Stellen.
  it("dedupliziert NICHT — Duplikate innerhalb einer Menge bleiben stehen", () => {
    expect(trackEventNames([track("ps-a", "Lead"), track("ps-b", "Lead")])).toEqual([
      "Lead",
      "Lead",
    ]);
  });

  // T3
  it("nimmt den LEEREN Namen nicht auf (Auslegung, kein Riegel — das Mapping bleibt)", () => {
    expect(trackEventNames([track("ps-a", ""), track("ps-b", "Purchase")])).toEqual([
      "Purchase",
    ]);
  });

  // T3b — die GEGENPROBE zur Normalisierungs-Grenze. Ohne sie liesse sich aus T3
  // lesen, das Praedikat trimme; es tut es ausdruecklich NICHT.
  it("trimmt NICHT: ein Name aus reinem Leerraum ist nicht der leere Name", () => {
    expect(trackEventNames([track("ps-a", "  ")])).toEqual(["  "]);
  });

  // T4
  it("leeres Array -> leeres Ergebnis, kein Wurf", () => {
    expect(trackEventNames([])).toEqual([]);
  });

  // T8 (aus der Owner-Entscheidung F1). DIE KONSTANTE WIRD IMPORTIERT, NIE
  // getippt: ein Literal hier waere eine zweite Wahrheit, die neben
  // analytics/events.ts altert.
  // EINZELSTUECK: Dies ist der einzige Test, der den Negativ-Ausschluss deckt —
  // wer ihn als redundant entfernt, nimmt die gesamte Abdeckung dieser Achse mit.
  it("schliesst den reservierten PageView-Token aus, laesst jeden anderen Namen durch", () => {
    const mappings = [
      track("ps-a", PAGEVIEW_EVENT),
      track("ps-b", "PageView"),
      track("ps-c", "Purchase"),
    ];
    // "PageView" OHNE Namensraum ist ein legitimer Custom-Name und bleibt drin —
    // der Ausschluss trifft GENAU einen Token, nicht eine Namens-Familie.
    expect(trackEventNames(mappings)).toEqual(["PageView", "Purchase"]);
  });
});

describe("usedTrackEventNames — die Vereinigung ueber beide Varianten", () => {
  // DIE PFLICHT-FIXTURE: A und B tragen VERSCHIEDENE Namen UND einen
  // gemeinsamen. Ohne den gemeinsamen waere Vereinigung nicht von Konkatenation
  // zu unterscheiden; ohne die verschiedenen bliebe B-Blindheit unsichtbar.
  const A = [track("ps-aaaaaa", "Lead"), track("ps-aaaaab", "Purchase")];
  const B = [track("ps-bbbbbb", "Lead"), track("ps-bbbbbc", "Signup")];

  // T5
  it("vereinigt beide Mengen, Duplikate verschwinden, A-Reihenfolge zuerst", () => {
    expect(usedTrackEventNames(A, B).names).toEqual(["Lead", "Purchase", "Signup"]);
  });

  // T6
  it("mappingsB === null (keine Variante B) -> nur A, scope 'a-only'", () => {
    const r = usedTrackEventNames(A, null);
    expect(r.names).toEqual(["Lead", "Purchase"]);
    expect(r.scope).toBe("a-only");
  });

  // T7 — DIE AUFLAGE DER SCHEIBE: "B existiert nicht" und "B ist leer" duerfen
  // nicht zusammenfallen. Am WERT sind beide Faelle gleich (die Vereinigung mit
  // der leeren Menge ist die Identitaet) — unterscheidbar sind sie NUR ueber
  // scope. Genau deshalb prueft dieser Test beides.
  it("mappingsB === [] (B existiert, ist leer) -> Namen wie A, aber scope 'a-and-b'", () => {
    const r = usedTrackEventNames(A, []);
    expect(r.names).toEqual(["Lead", "Purchase"]);
    expect(r.scope).toBe("a-and-b");
  });

  it("beide Mengen leer -> leere Namen, scope traegt trotzdem die Aussage", () => {
    expect(usedTrackEventNames([], [])).toEqual({ names: [], scope: "a-and-b" });
    expect(usedTrackEventNames([], null)).toEqual({ names: [], scope: "a-only" });
  });
});
