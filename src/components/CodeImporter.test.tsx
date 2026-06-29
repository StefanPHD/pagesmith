import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";

// RIEGEL-TEST der in der Mapping-Phase erkaempften INVARIANTE:
// "Uebernehmen" (handleAssignMapping) wirkt NUR in den Draft und ruft NIEMALS
// saveProject / loest KEINEN DB-Write aus. Der einzige DB-Write ist der grosse
// "Speichern"-Button (handleSave). Hintergrund: der "Autosave"-Fehlalarm dieser
// Phase — dieser Test schreibt fest, dass es keinen Autosave gibt.
//
// Behavioral, nicht hohl: wir spionieren die ECHTE Server-Action saveProject und
// fahren BEIDE Pfade. Die Gegenprobe (Speichern -> Spy == 1) ist PFLICHT, sonst
// misst der Test nichts.

// Server-Action-Modul komplett durch Spies ersetzen. Verhindert zugleich, dass
// der echte Supabase-/next-headers-Servercode beim Import geladen wird.
// vi.hoisted: die Spies muessen VOR der (ebenfalls gehoisteten) vi.mock-Factory
// existieren.
const { saveProject, listProjects, loadProject, deleteProject, renameProject } =
  vi.hoisted(() => ({
    saveProject: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
    listProjects: vi.fn(async () => []),
    loadProject: vi.fn(async () => null),
    deleteProject: vi.fn(async () => ({ ok: true as const })),
    renameProject: vi.fn(async () => ({ ok: true as const })),
  }));

vi.mock("@/app/projects/actions", () => ({
  saveProject,
  listProjects,
  loadProject,
  deleteProject,
  renameProject,
}));

// Erst nach dem Mock importieren, damit der Mock greift.
import CodeImporter from "@/components/CodeImporter";

beforeEach(() => {
  // jsdom kennt scrollIntoView nicht; der Auswahl-Effekt ruft es auf.
  if (!HTMLElement.prototype.scrollIntoView) {
    HTMLElement.prototype.scrollIntoView = vi.fn();
  }
});

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

describe("CodeImporter — INVARIANTE: Uebernehmen schreibt NIE in die DB", () => {
  it("Uebernehmen-Pfad ruft saveProject NICHT auf; grosser Speichern-Pfad ruft es genau einmal", async () => {
    render(<CodeImporter initialCode="<button>Jetzt kaufen</button>" />);

    // Das erkannte Element erscheint erst nach der ~300ms-Debounce in der Liste.
    // findBy* pollt -> kein fixer Wait, kein fake timer.
    const elementButton = await screen.findByText("Jetzt kaufen");
    fireEvent.click(elementButton);

    // Aktions-Kachel "Link / Weiterleitung" oeffnet das URL-Formular.
    const tile = await screen.findByText(/Link \/ Weiterleitung/);
    fireEvent.click(tile);

    // Gueltige URL eintragen (sonst ist "Uebernehmen" gesperrt).
    const urlInput = await screen.findByPlaceholderText("https://buy.stripe.com/...");
    fireEvent.change(urlInput, { target: { value: "https://buy.stripe.com/abc" } });

    // "Uebernehmen" wirkt NUR in den Draft.
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    // KERN-ASSERTION: kein DB-Write durch den Assign-Pfad.
    expect(saveProject).not.toHaveBeenCalled();

    // GEGENPROBE (PFLICHT): der grosse Speichern-Button schreibt sehr wohl.
    // Schlaegt sie fehl, misst der Test nichts -> dann ist der Riegel wertlos.
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));

    // saveProject ist async; findBy auf den "Gespeichert ✓"-Zustand wartet auf
    // den abgeschlossenen Aufruf, ohne fixen Wait.
    await screen.findByRole("button", { name: /Gespeichert/ });
    expect(saveProject).toHaveBeenCalledTimes(1);
  });
});

describe("CodeImporter — Re-Link ist KATEGORIE-eingeschraenkt (Phase 5)", () => {
  it("text-Orphan-Dropdown listet nur Text-Ziele, KEINE Button/Link-Ziele", async () => {
    // ps-zzzzzz (text) ist nicht im Code -> verwaist. Aktuelle Elemente: ein
    // Button UND eine Headline. Der text-Orphan darf nur die Headline anbieten.
    render(
      <CodeImporter
        initialCode="<button>Klick mich</button><h1>Echte Headline</h1>"
        initialMappings={[
          { elementId: "ps-zzzzzz", type: "text", config: { content: "verwaist" } },
        ]}
      />
    );

    // Orphan-Sektion erscheint erst nach der Debounce (Flash-Guard: erst rechnen,
    // wenn debouncedCode === code).
    await screen.findByText(/Verwaiste Verknüpfungen/);
    const select = await screen.findByLabelText("Verknüpfen mit Element");
    const optionTexts = Array.from(select.querySelectorAll("option")).map(
      (o) => o.textContent ?? ""
    );

    // Nur das Text-Ziel (<h1>) wird angeboten; der Button taucht NICHT auf.
    expect(optionTexts.some((t) => t.includes("Echte Headline"))).toBe(true);
    expect(optionTexts.some((t) => t.includes("Klick mich"))).toBe(false);
  });
});

describe("CodeImporter — Scheibe 3: Text-Live-Patch (Edit-iframe)", () => {
  // Bereits stabilisiertes (kanonisches) Dokument: stabilizeIds ist darauf
  // idempotent -> anchorMappingTarget ist ein No-op -> "Übernehmen" aendert den
  // Code NICHT -> kein srcDoc-Reload (Voraussetzung fuer den Stabilitaets-Test).
  const CANON =
    '<!DOCTYPE html><html><head></head><body><h1 data-pagesmith-id="ps-aaaaaa">Alt</h1></body></html>';

  function editIframe() {
    return screen.getByTitle("preview") as HTMLIFrameElement;
  }
  function srcdoc() {
    return editIframe().getAttribute("srcdoc") ?? "";
  }
  // Nur die PS_SET_TEXT-Posts aus dem postMessage-Spy (die Selektions-Bruecke
  // postet zusaetzlich SET_SELECTED_ID -> hier herausgefiltert).
  function psSetText(spy: { mock: { calls: unknown[][] } }) {
    return spy.mock.calls
      .map((c) => c[0] as { type?: string; elementId?: string; content?: string })
      .filter((m) => m?.type === "PS_SET_TEXT");
  }

  it("Text-Mapping-Aenderung bei unveraendertem Code erzeugt KEIN neues srcDoc; Code-Aenderung schon (Bake)", async () => {
    render(<CodeImporter initialCode={CANON} />);
    const item = await screen.findByText("Alt");
    const before = srcdoc();
    expect(before).toContain('data-pagesmith-id="ps-aaaaaa"');

    // Element waehlen -> Text-Kachel -> bearbeiten -> neuen Text uebernehmen.
    fireEvent.click(item);
    fireEvent.click(await screen.findByText(/Text bearbeiten/));
    fireEvent.change(screen.getByDisplayValue("Alt"), {
      target: { value: "Neu" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    // ENTKOPPLUNG: kein Reload -> srcDoc byte-identisch.
    expect(srcdoc()).toBe(before);

    // GEGENPROBE: Code aendern -> nach Debounce frisches srcDoc, das den Override
    // "Neu" weiterhin einbaeckt (Reload-Pfad / Bake greift).
    fireEvent.change(screen.getByPlaceholderText(/Füge hier deinen HTML-Code/), {
      target: { value: CANON.replace("</body>", "<p>extra</p></body>") },
    });
    await waitFor(() => expect(srcdoc()).not.toBe(before));
    expect(srcdoc()).toContain("Neu");
  });

  it("Übernehmen postet PS_SET_TEXT mit der neuen Konfiguration ans Edit-iframe", async () => {
    render(<CodeImporter initialCode={CANON} />);
    const item = await screen.findByText("Alt");
    const spy = vi.spyOn(editIframe().contentWindow!, "postMessage");

    fireEvent.click(item);
    fireEvent.click(await screen.findByText(/Text bearbeiten/));
    fireEvent.change(screen.getByDisplayValue("Alt"), {
      target: { value: "Neu" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    const calls = psSetText(spy);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ elementId: "ps-aaaaaa", content: "Neu" });
  });

  it("Entfernen eines Text-Overrides postet den ORIGINAL-Detektionstext", async () => {
    render(
      <CodeImporter
        initialCode={CANON}
        initialMappings={[
          { elementId: "ps-aaaaaa", type: "text", config: { content: "Override" } },
        ]}
      />
    );
    // displayTextFor zeigt bei aktivem Override den Override-Text in der Liste.
    const item = await screen.findByText("Override");
    const spy = vi.spyOn(editIframe().contentWindow!, "postMessage");

    fireEvent.click(item);
    fireEvent.click(await screen.findByRole("button", { name: "Entfernen" }));

    const calls = psSetText(spy);
    expect(calls).toHaveLength(1);
    // Original-Detektionstext des <h1> ist "Alt" (der Override lebte nur im Mapping).
    expect(calls[0]).toMatchObject({ elementId: "ps-aaaaaa", content: "Alt" });
  });

  it("Re-Link eines Text-Orphans postet PS_SET_TEXT ans neue Zielelement", async () => {
    const CANON_B =
      '<!DOCTYPE html><html><head></head><body><h1 data-pagesmith-id="ps-bbbbbb">Headline</h1></body></html>';
    render(
      <CodeImporter
        initialCode={CANON_B}
        initialMappings={[
          { elementId: "ps-zzzzzz", type: "text", config: { content: "verwaist" } },
        ]}
      />
    );
    await screen.findByText(/Verwaiste Verknüpfungen/);
    const spy = vi.spyOn(editIframe().contentWindow!, "postMessage");

    fireEvent.change(screen.getByLabelText("Verknüpfen mit Element"), {
      target: { value: "ps-bbbbbb" },
    });

    const calls = psSetText(spy);
    expect(calls).toHaveLength(1);
    expect(calls[0]).toMatchObject({ elementId: "ps-bbbbbb", content: "verwaist" });
  });
});
