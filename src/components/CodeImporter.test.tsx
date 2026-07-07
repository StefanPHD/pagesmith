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
const {
  saveProject,
  listProjects,
  loadProject,
  deleteProject,
  renameProject,
  publishProject,
  setCapiToken,
} = vi.hoisted(() => ({
  saveProject: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
  listProjects: vi.fn(async () => []),
  // Rueckgabe bewusst Promise<unknown> -> einzelne Tests koennen via
  // mockResolvedValueOnce eine volle ProjectRow (inkl. settings) liefern.
  loadProject: vi.fn(async (): Promise<unknown> => null),
  deleteProject: vi.fn(async () => ({ ok: true as const })),
  renameProject: vi.fn(async () => ({ ok: true as const })),
  publishProject: vi.fn(async () => ({
    ok: true as const,
    url: "http://mock.lvh.me:3000",
    label: "mock",
  })),
  setCapiToken: vi.fn(async () => ({
    ok: true as const,
    trackingKey: "tk-mock",
  })),
}));

vi.mock("@/app/projects/actions", () => ({
  saveProject,
  listProjects,
  loadProject,
  deleteProject,
  renameProject,
  publishProject,
  setCapiToken,
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

describe("CodeImporter — Scheibe 1a: Mehr-Aktion (redirect + track)", () => {
  // Kanonisches (idempotent stabilisiertes) Button-Dokument -> anchorMappingTarget
  // ist ein No-op (kein Reload bei Assign).
  const CANON_BTN =
    '<!DOCTYPE html><html><head></head><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>';

  it("Badge zeigt bei Mehr-Aktion beide Icons (redirect + track)", async () => {
    render(
      <CodeImporter
        initialCode={CANON_BTN}
        initialMappings={[
          { elementId: "ps-aaaaaa", type: "redirect", config: { url: "https://a.com", openInNewTab: false } },
          { elementId: "ps-aaaaaa", type: "track", config: { event: "Lead" } },
        ]}
      />
    );
    await screen.findByText("Kaufen");
    expect(screen.getByTitle("Verknüpft: redirect")).toBeTruthy();
    expect(screen.getByTitle("Verknüpft: track")).toBeTruthy();
  });

  it("interaktives Element: Track-Slot zuweisen erzeugt track-Mapping (Badge erscheint)", async () => {
    render(<CodeImporter initialCode={CANON_BTN} />);
    fireEvent.click(await screen.findByText("Kaufen"));
    // Track-Kachel im interaktiven Panel (neben der Weiterleitung).
    fireEvent.click(await screen.findByText(/Tracking-Event/));
    // Scheibe 1b: Standard-Event-Dropdown statt freiem Textfeld.
    fireEvent.change(await screen.findByRole("combobox"), {
      target: { value: "Purchase" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));
    expect(await screen.findByTitle("Verknüpft: track")).toBeTruthy();
  });

  it("zwei verwaiste Mappings gleicher id rendern BEIDE (kein Key-Kollaps)", async () => {
    render(
      <CodeImporter
        initialCode={CANON_BTN}
        initialMappings={[
          { elementId: "ps-zzzzzz", type: "redirect", config: { url: "https://o.com", openInNewTab: false } },
          { elementId: "ps-zzzzzz", type: "track", config: { event: "GhostLead" } },
        ]}
      />
    );
    await screen.findByText(/Verwaiste Verknüpfungen/);
    // Beide Orphan-Karten sichtbar (eigene (id,type)-Keys -> kein Kollaps).
    expect(screen.getByText("https://o.com")).toBeTruthy();
    expect(screen.getByText("GhostLead")).toBeTruthy();
  });

  it("Re-Link redirect-Orphan auf Element-mit-track -> KEINE Fehlalarm-Warnung", async () => {
    const confirmSpy = vi.spyOn(window, "confirm").mockReturnValue(true);
    render(
      <CodeImporter
        initialCode={CANON_BTN}
        initialMappings={[
          // present element traegt NUR track ...
          { elementId: "ps-aaaaaa", type: "track", config: { event: "Lead" } },
          // ... der redirect-Orphan wird darauf relinkt -> anderer Slot, kein Konflikt.
          { elementId: "ps-zzzzzz", type: "redirect", config: { url: "https://o.com", openInNewTab: false } },
        ]}
      />
    );
    await screen.findByText(/Verwaiste Verknüpfungen/);
    fireEvent.change(screen.getByLabelText("Verknüpfen mit Element"), {
      target: { value: "ps-aaaaaa" },
    });
    // typ-aware Schutz: Ziel hat kein redirect -> keine Ueberschreib-Warnung.
    expect(confirmSpy).not.toHaveBeenCalled();
    confirmSpy.mockRestore();
  });
});

describe("CodeImporter — Scheibe 1b: Settings (Meta-Pixel-ID) Persistenz + Isolation", () => {
  function pixelInput() {
    return screen.getByPlaceholderText(/123456789012345/) as HTMLInputElement;
  }

  it("Pixel-ID -> dirty -> grosser Speichern-Button reicht settings an saveProject", async () => {
    render(<CodeImporter initialCode="<button>X</button>" />);
    // Einstellungs-Panel oeffnen und Pixel-ID setzen.
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    fireEvent.change(pixelInput(), { target: { value: "999000111" } });

    // Speichern (einziger DB-Write).
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });

    expect(saveProject).toHaveBeenCalledTimes(1);
    // 4. Argument = settings, plattform-genestet. (Cast: der Spy ist arg-los typisiert.)
    const args = saveProject.mock.calls[0] as unknown[];
    expect(args[3]).toEqual({ pixels: { meta: { pixelId: "999000111" } } });
  });

  it("Projektwechsel reseedet settings (kein Leak: Pixel-ID von A bleibt nicht in B)", async () => {
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: "<button>Y</button>",
      mappings: [],
      settings: { pixels: { meta: { pixelId: "222" } } },
    });
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    expect(pixelInput().value).toBe("111");

    // Auf P2 wechseln.
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));

    // Reseeded auf P2s Pixel-ID, NICHT die von P1 (kein Leak).
    await waitFor(() => expect(pixelInput().value).toBe("222"));
  });
});

describe("CodeImporter — Scheibe 2a: CAPI-Token write-only Indikator + Reseed", () => {
  function openSettings() {
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  }
  function tokenInput() {
    return screen.getByPlaceholderText(/CAPI-Token|gesetzt/) as HTMLInputElement;
  }

  it("tokenSet:true -> '••• gesetzt'-Indikator; Eingabefeld bleibt LEER (write-only)", async () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ capi: { trackingKey: "k1", tokenSet: true } }}
      />
    );
    openSettings();
    // Indikator sichtbar (der gruene Span, nicht der Placeholder).
    expect(screen.getByText("••• gesetzt")).toBeTruthy();
    // Der echte Token faehrt NIE in den Client -> das Passwortfeld ist leer.
    expect(tokenInput().value).toBe("");
    expect(tokenInput().type).toBe("password");
  });

  it("Projektwechsel reseedet den Indikator (kein Leak: 'gesetzt' von A bleibt nicht in B)", async () => {
    // P2 hat KEINEN CAPI-Token (settings ohne capi).
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: "<button>Y</button>",
      mappings: [],
      settings: {},
    });
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
        initialSettings={{ capi: { trackingKey: "k1", tokenSet: true } }}
      />
    );
    openSettings();
    expect(screen.getByText("••• gesetzt")).toBeTruthy();

    // Auf P2 wechseln -> Indikator verschwindet (P2 hat keinen Token).
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));

    await waitFor(() =>
      expect(screen.queryByText("••• gesetzt")).toBeNull()
    );
  });

  it("ohne gespeichertes Projekt (kein projectId) ist das Token-Feld deaktiviert", () => {
    render(<CodeImporter initialCode="<button>X</button>" />);
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    expect(tokenInput().disabled).toBe(true);
    expect(screen.getByText(/Projekt zuerst speichern/)).toBeTruthy();
  });
});

describe("CodeImporter — Scheibe 7a: Publish-Indikator aus settings.hosting (kein Leak)", () => {
  function openSettings() {
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  }
  function switchTo(name: string) {
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    return screen.findByText(name);
  }

  // NEXT_PUBLIC_HOSTING_DOMAIN ist normalerweise build-inlined; im vitest-Node-Prozess
  // liest die abgeleitete liveUrl es zur Render-Zeit aus process.env.
  beforeEach(() => {
    process.env.NEXT_PUBLIC_HOSTING_DOMAIN = "lvh.me:3000";
  });

  it("A(publiziert) -> B(nie publiziert): Indikator + Link reseeden auf 'nicht veröffentlicht', KEIN A-Link", async () => {
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: "<button>Y</button>",
      mappings: [],
      settings: {}, // nie publiziert
    });
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
        initialSettings={{ hosting: { label: "shop-a" } }}
      />
    );
    openSettings();
    // A ist publiziert -> A-Link sichtbar.
    expect(screen.getByText(/shop-a\.lvh\.me:3000/)).toBeTruthy();

    fireEvent.click(await switchTo("P2"));

    // B ist nie publiziert -> A-Link WEG, "Noch nicht veröffentlicht" sichtbar.
    await waitFor(() =>
      expect(screen.queryByText(/shop-a\.lvh\.me/)).toBeNull()
    );
    expect(screen.getByText(/Noch nicht veröffentlicht/)).toBeTruthy();
  });

  it("A(publiziert) -> B(publiziert, anderes Label): zeigt BS Link, nicht A's", async () => {
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: "<button>Y</button>",
      mappings: [],
      settings: { hosting: { label: "shop-b" } },
    });
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
        initialSettings={{ hosting: { label: "shop-a" } }}
      />
    );
    openSettings();
    expect(screen.getByText(/shop-a\.lvh\.me:3000/)).toBeTruthy();

    fireEvent.click(await switchTo("P2"));

    await waitFor(() =>
      expect(screen.getByText(/shop-b\.lvh\.me:3000/)).toBeTruthy()
    );
    // A-Link darf NICHT mehr da sein.
    expect(screen.queryByText(/shop-a\.lvh\.me/)).toBeNull();
  });

  it("A(publiziert) -> B(nie) -> zurück zu A: A zeigt wieder 'veröffentlicht' + A-Link", async () => {
    loadProject
      .mockResolvedValueOnce({
        id: "p2",
        name: "P2",
        html: "<button>Y</button>",
        mappings: [],
        settings: {},
      })
      .mockResolvedValueOnce({
        id: "p1",
        name: "P1",
        html: "<button>X</button>",
        mappings: [],
        settings: { hosting: { label: "shop-a" } },
      });
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
        initialSettings={{ hosting: { label: "shop-a" } }}
      />
    );
    openSettings();
    expect(screen.getByText(/shop-a\.lvh\.me:3000/)).toBeTruthy();

    // A -> B (kein Link mehr).
    fireEvent.click(await switchTo("P2"));
    await waitFor(() =>
      expect(screen.queryByText(/shop-a\.lvh\.me/)).toBeNull()
    );

    // B -> zurück zu A (Link wieder da, aus A's settings.hosting abgeleitet).
    fireEvent.click(await switchTo("P1"));
    await waitFor(() =>
      expect(screen.getByText(/shop-a\.lvh\.me:3000/)).toBeTruthy()
    );
  });
});
