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
  removeCapiToken,
  getEventCounts,
  getAdblockLoss,
  saveVariantB,
  createVariantB,
  removeVariantB,
  setAbTestActive,
  getVariantBPublished,
  getVariantCounts,
} = vi.hoisted(() => ({
  saveProject: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
  // Scheibe 9a: die Varianten-Actions. saveVariantB ist der Spy, auf dem der
  // Dispatch-Riegel laeuft (Save auf B darf NIE saveProject treffen).
  saveVariantB: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
  createVariantB: vi.fn(async () => ({
    ok: true as const,
    html: "",
    mappings: [],
  })),
  removeVariantB: vi.fn(async () => ({ ok: true as const })),
  // Scheibe 9b-1: Default spiegelt "eingeschaltet" — einzelne Tests ueberschreiben.
  setAbTestActive: vi.fn(async () => ({ ok: true as const, abTestActive: true })),
  // Scheibe 9b-1p: Default ist der NEUTRAL-Status (null = nicht ermittelbar) ->
  // Bestandstests sehen keinen Hinweis. Rueckgabe bewusst Promise<boolean | null>.
  getVariantBPublished: vi.fn(async (): Promise<boolean | null> => null),
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
  removeCapiToken: vi.fn(async () => ({ ok: true as const })),
  getEventCounts: vi.fn(async () => []),
  // Scheibe B: Default ist der Neutral-Status (null) -> bestehende Tests sehen die
  // Verlust-Kachel nur als "Warte auf erste Bestaetigung", keine Zahl. Rueckgabe bewusst
  // Promise<unknown>, damit einzelne Tests via mockResolvedValueOnce Rohzahlen liefern.
  getAdblockLoss: vi.fn(async (): Promise<unknown> => null),
  // Scheibe 9c-1: Default ist ein ERFOLG mit leeren Zeilen -> die Varianten-Sektion
  // erscheint in den Bestandstests NICHT (keine zugeordneten Zeilen). Ein Default von
  // {ok:false} haette in jedem Bestandstest eine Fehlermeldung eingeblendet.
  getVariantCounts: vi.fn(async (): Promise<unknown> => ({ ok: true, rows: [] })),
}));

vi.mock("@/app/projects/actions", () => ({
  saveProject,
  listProjects,
  loadProject,
  deleteProject,
  renameProject,
  publishProject,
  setCapiToken,
  removeCapiToken,
  getEventCounts,
  getAdblockLoss,
  saveVariantB,
  createVariantB,
  removeVariantB,
  setAbTestActive,
  getVariantBPublished,
  getVariantCounts,
}));

// DomainManager (in der Publish-Sektion gemountet) zieht ueber @/app/projects/domain-
// actions server-only-Code (status/register) — hier mocken, sonst laedt der echte
// Server-Code beim Import. Leere Liste -> die Domain-UI rendert nur das Add-Formular.
vi.mock("@/app/projects/domain-actions", () => ({
  addCustomDomain: vi.fn(async () => ({ ok: true, status: "pending", healed: false })),
  checkDomainStatusAction: vi.fn(async () => ({
    ok: false,
    reason: "not_found",
    error: "x",
  })),
  listProjectDomains: vi.fn(async () => ({ ok: true, domains: [] })),
  removeCustomDomainAction: vi.fn(async () => ({ ok: true, healed: false })),
}));

// Erst nach dem Mock importieren, damit der Mock greift.
import CodeImporter from "@/components/CodeImporter";
import {
  ACTION_THROW_MESSAGE,
  SAVE_THROW_MESSAGE,
} from "@/lib/safe-action";

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
    // Platzhalter ist jetzt neutral (Teil B): "CAPI-Token einfügen" (nicht gesetzt) /
    // "Neuen Token eingeben zum Ersetzen" (gesetzt) — beide Zustaende matchen.
    return screen.getByPlaceholderText(
      /CAPI-Token|Neuen Token eingeben/,
    ) as HTMLInputElement;
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

describe("CodeImporter — Scheibe 7b: Publish bäckt RELATIVEN /api/e-Beacon, Export absoluten", () => {
  // Button mit track-Mapping + Meta-Pixel + trackingKey -> das Wiring enthält den
  // CAPI-Beacon. NUR der capiProxyUrl-Wert divergiert zwischen Publish und Export.
  const CANON_BTN =
    '<!DOCTYPE html><html><head></head><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>';
  const ORIGINAL_APP_URL = process.env.NEXT_PUBLIC_APP_URL;

  beforeEach(() => {
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pagesmith.io";
  });
  afterEach(() => {
    if (ORIGINAL_APP_URL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
    else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL_APP_URL;
  });

  function renderWithTracking() {
    return render(
      <CodeImporter
        initialCode={CANON_BTN}
        initialProjectId="p1"
        initialMappings={[
          { elementId: "ps-aaaaaa", type: "track", config: { event: "Lead" } },
        ]}
        initialSettings={{
          pixels: { meta: { pixelId: "999000111" } },
          capi: { trackingKey: "tk-1", tokenSet: true },
        }}
      />
    );
  }

  it("Publish: functionalHtml an publishProject trägt sendBeacon('/api/e') RELATIV, KEINE absolute URL", async () => {
    renderWithTracking();
    // Detection abwarten -> debouncedCode === code (die Publish-Quelle).
    await screen.findByText("Kaufen");

    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^(Veröffentlichen|Erneut veröffentlichen)$/ }));

    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    const functionalHtml = (publishProject.mock.calls[0] as unknown[])[1] as string;
    expect(functionalHtml).toContain('navigator.sendBeacon("/api/e"');
    // KEIN absoluter Export-Endpunkt in der gehosteten Variante (same-origin).
    expect(functionalHtml).not.toContain("https://app.pagesmith.io");
  });

  it("Export (Copy): Dokument trägt die ABSOLUTE ${NEXT_PUBLIC_APP_URL}/api/e-URL (Gegenprobe)", async () => {
    // clipboard.writeText erfasst das Export-Dokument als String.
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      renderWithTracking();
      await screen.findByText("Kaufen");

      fireEvent.click(
        screen.getByRole("button", { name: "In Zwischenablage kopieren" })
      );

      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      const exportDoc = (writeText.mock.calls[0] as unknown[])[0] as string;
      expect(exportDoc).toContain(
        'navigator.sendBeacon("https://app.pagesmith.io/api/e"'
      );
    } finally {
      delete (navigator as { clipboard?: unknown }).clipboard;
    }
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

describe("CAPI-Token entfernen + Platzhalter-Klarheit", () => {
  const withToken = { capi: { trackingKey: "k1", tokenSet: true } };

  function openSettings() {
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  }

  it("CAPI-Token entfernen: 'Entfernen' sichtbar wenn tokenSet true", () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(screen.getByRole("button", { name: "Entfernen" })).toBeTruthy();
  });

  it("CAPI-Token entfernen: 'Entfernen' NICHT im DOM wenn kein Token gesetzt", () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
    openSettings();
    expect(screen.queryByRole("button", { name: "Entfernen" })).toBeNull();
  });

  it("CAPI-Token entfernen: Bestätigen ruft removeCapiToken(projectId) + spiegelt tokenSet:false ('••• gesetzt' verschwindet)", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(screen.getByText("••• gesetzt")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, entfernen" }));

    await waitFor(() => expect(removeCapiToken).toHaveBeenCalledWith("proj-1"));
    await waitFor(() => expect(screen.queryByText("••• gesetzt")).toBeNull());
  });

  it("CAPI-Token entfernen: Abbrechen -> kein removeCapiToken-Call", () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    fireEvent.click(screen.getByRole("button", { name: "Entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(removeCapiToken).not.toHaveBeenCalled();
  });

  it("Platzhalter bei gesetztem Token ist neutral ('Neuen Token eingeben zum Ersetzen'), nicht die '•••'-Variante", () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(
      screen.getByPlaceholderText("Neuen Token eingeben zum Ersetzen"),
    ).toBeTruthy();
    expect(screen.queryByPlaceholderText(/gesetzt/)).toBeNull();
  });
});

// Test 7 (Phase 8 Scheibe B): der WORTLAUT der Verlust-Kachel ist eine Produktzusage, kein
// Styling — deshalb festgenagelt. "gerettet" ist verboten: events beweist SERVER-BEOBACHTUNG,
// nicht Meta-EMPFANG (der 'Bad signature'-Bug liess Forwards still scheitern, waehrend die
// Zeilen sauber weiterliefen). Eine Kachel, die dann "gerettet" sagt, luegt den Kunden an.
describe("Adblocker-Verlust-Kachel: Wortlaut + Neutral-Status (Scheibe B)", () => {
  function openSettings() {
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  }

  it("mit Rohzahlen: 'mindestens X %' + 'N von M ... NUR server-seitig erfasst', NIE 'gerettet'", async () => {
    // 8 von 19 unbestaetigt -> 42%.
    getAdblockLoss.mockResolvedValueOnce({
      total_server_conversions: 19,
      confirmed_conversions: 11,
      first_confirm_at: "2026-07-23T10:00:00.000Z",
    });

    render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
    openSettings();

    await waitFor(() =>
      expect(screen.getByText(/mindestens\s*42\s*%/)).toBeTruthy(),
    );
    expect(
      screen.getByText(/8 von 19 Conversions wurden\s+NUR server-seitig erfasst/),
    ).toBeTruthy();

    // Das verbotene Wort — nirgends im gerenderten Dokument.
    expect(document.body.textContent).not.toMatch(/gerettet/i);
  });

  it("ohne Bestätigung (first_confirm_at null): Neutral-Status statt 0%/100%", async () => {
    getAdblockLoss.mockResolvedValueOnce({
      total_server_conversions: 0,
      confirmed_conversions: 0,
      first_confirm_at: null,
    });

    render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
    openSettings();

    await waitFor(() =>
      expect(screen.getByText("Warte auf erste Bestätigung.")).toBeTruthy(),
    );
    expect(document.body.textContent).not.toMatch(/mindestens/);
    expect(document.body.textContent).not.toMatch(/%/);
  });

  // Grenzfall aus der Zustandstabelle: Stichtag gesetzt, Fenster aber leer (die einzige
  // Bestaetigung hat ihre server-Zeile VOR dem Stichtag). Ohne diesen Zweig teilte das UI
  // durch 0 -> NaN%.
  it("Stichtag gesetzt, aber total = 0: Neutral-Status statt NaN%", async () => {
    getAdblockLoss.mockResolvedValueOnce({
      total_server_conversions: 0,
      confirmed_conversions: 0,
      first_confirm_at: "2026-07-23T10:00:00.000Z",
    });

    render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
    openSettings();

    await waitFor(() =>
      expect(screen.getByText("Warte auf erste Bestätigung.")).toBeTruthy(),
    );
    expect(document.body.textContent).not.toMatch(/NaN/);
  });
});

describe("CodeImporter — Scheibe 9a: A/B-Varianten (Wurzeltausch)", () => {
  // A und B tragen BEWUSST verschiedene ps-IDs und verschiedene Mappings. Nur so
  // faellt auf, wenn nach dem Umschalten noch der Zustand der anderen Variante steht:
  // B's Mappings ueber A's Elementen (oder umgekehrt) waeren verwaist -> die
  // Orphan-Sektion wuerde erscheinen.
  const HTML_A = `<button data-pagesmith-id="ps-aaaaaa">Kaufen A</button>`;
  const HTML_B = `<button data-pagesmith-id="ps-bbbbbb">Kaufen B</button>`;
  const MAP_A = [
    {
      elementId: "ps-aaaaaa",
      type: "redirect" as const,
      config: { url: "https://a.test", openInNewTab: false },
    },
  ];
  const MAP_B = [
    {
      elementId: "ps-bbbbbb",
      type: "track" as const,
      config: { event: "Lead" },
    },
  ];

  function renderWithB() {
    return render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML_A}
        initialMappings={MAP_A}
        initialVariantBHtml={HTML_B}
        initialVariantBMappings={MAP_B}
      />,
    );
  }

  // NORMALFALL-DATENLAGE (der Live-Bug): createVariantB kopiert A byte-genau, und
  // eine reine Text-Aenderung laesst den Code unangetastet -> beide Varianten tragen
  // DENSELBEN HTML-String und unterscheiden sich NUR in den Text-Overrides. Genau
  // diese Konstellation hat der Umschalt-Test oben (HTML_A !== HTML_B) ausgespart:
  // dort aendert sich previewHtml, der srcDoc-Memo feuert ohnehin, und der kaputte
  // Anker faellt nicht auf. Ergaenzt, nicht ersetzt — der andere Fall prueft die
  // Ableitungskette, dieser den ANKER.
  const HTML_COPY = `<h1 data-pagesmith-id="ps-aaaaaa">Original</h1>`;
  const TEXT_A = [
    {
      elementId: "ps-aaaaaa",
      type: "text" as const,
      config: { content: "Headline A" },
    },
  ];
  const TEXT_B = [
    {
      elementId: "ps-aaaaaa",
      type: "text" as const,
      config: { content: "Headline B" },
    },
  ];

  it("ARTEFAKT-RIEGEL: der Varianten-Marker landet NIE im Export- oder Publish-Dokument", async () => {
    // Der Marker ist ein reines Edit-Canvas-Hilfsmittel. Saesse er in
    // generateFunctional statt im edit-Wrapper editPreviewHtml, geriete er in JEDES
    // exportierte und veroeffentlichte Dokument — bei einem Tool, dessen Ausgabe der
    // Kunde auf seiner eigenen Domain ausliefert, ist das kein Schoenheitsfehler.
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });

    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML_COPY}
        initialMappings={TEXT_A}
        initialVariantBHtml={HTML_COPY}
        initialVariantBMappings={TEXT_B}
      />,
    );
    await screen.findByText("Headline A");

    // Gegenprobe zuerst: im EDIT-srcDoc MUSS der Marker stehen (sonst prueft der
    // Test unten nur, dass ein nie erzeugter String fehlt).
    const editDoc =
      (screen.getByTitle("preview") as HTMLIFrameElement).getAttribute("srcdoc") ?? "";
    expect(editDoc).toContain("__ps_variant");

    // Export (Copy) — das Dokument, das der Kunde herunterlaedt.
    fireEvent.click(screen.getByRole("button", { name: /kopieren/i }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const exportDoc = (writeText.mock.calls[0] as unknown[])[0] as string;
    expect(exportDoc).not.toContain("__ps_variant");

    // Publish — beide Varianten-Artefakte.
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));
    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    const call = publishProject.mock.calls[0] as unknown[];
    expect(call[1] as string).not.toContain("__ps_variant");
    expect((call[3] as { functionalHtml: string }).functionalHtml).not.toContain(
      "__ps_variant",
    );
  });

  it("REPRODUKTION (Live-Sequenz): identische Mappings beim Umschalten, Divergenz entsteht ERST danach per UI", async () => {
    // Der Unterschied zum ANKER-Test unten ist die SEQUENZ, nicht die Datenlage:
    // dort sind A und B schon beim Mount verschieden (Props), hier entstehen sie so,
    // wie das Produkt sie erzeugt — createVariantB kopiert byte-genau, BEIDE
    // Varianten starten mit IDENTISCHEN (hier: leeren) Mappings, und der Override
    // wird erst nach dem Umschalten per UI gesetzt.
    //
    // srcDoc ist ein STRING: React schreibt das Attribut nur bei WERT-Aenderung.
    // Ein Memo, der LAEUFT, aber denselben String liefert, loest KEINEN Reload aus.
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML_COPY}
        initialMappings={[]}
        initialVariantBHtml={HTML_COPY}
        initialVariantBMappings={[]}
      />,
    );
    const doc = () =>
      (screen.getByTitle("preview") as HTMLIFrameElement).getAttribute("srcdoc") ??
      "";
    await screen.findByText("Original");

    // Auf B umschalten (Mappings noch identisch -> gleicher String, kein Reload).
    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Variante B" }).getAttribute("aria-pressed"),
      ).toBe("true"),
    );

    // B's Text per UI setzen — genau wie der Owner. mappings ist KEIN Memo-Dep,
    // also bleibt srcDoc stehen; sichtbar wird der Text nur via PS_SET_TEXT.
    fireEvent.click(await screen.findByText("Original"));
    fireEvent.click(await screen.findByText(/Text bearbeiten/));
    fireEvent.change(screen.getByDisplayValue("Original"), {
      target: { value: "Headline B" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    // Speichern — Schritt 5 der gemeldeten Sequenz. Ohne ihn blockt der
    // Dirty-Guard den Rueckwechsel (window.confirm liefert in jsdom falsy), und
    // der Test wuerde am falschen Punkt scheitern.
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    const duringB = doc();

    // Zurueck auf A. DAMIT DAS CANVAS A ZEIGT, MUSS DAS DOKUMENT NEU AUSGELIEFERT
    // WERDEN — nur ein WERT-Wechsel des srcDoc-Attributs loest den Reload aus, der
    // den imperativen PS_SET_TEXT-Patch verwirft. Bleibt der String gleich, ueberlebt
    // B's gepatchter DOM.
    fireEvent.click(screen.getByRole("button", { name: "Variante A" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Variante A" }).getAttribute("aria-pressed"),
      ).toBe("true"),
    );
    expect(doc()).not.toBe(duringB);
  });

  it("ANKER: identisches HTML, nur Overrides verschieden -> srcDoc des Edit-iframes folgt dem Variantenwechsel", async () => {
    // Ohne activeVariant in den Memo-Deps ist debouncedCode nach dem Umschalten
    // Object.is-gleich -> weder annotateAndDetect noch der editHtml-Memo feuern ->
    // srcDoc bleibt Zeichen fuer Zeichen stehen und im Canvas ueberlebt der per
    // PS_SET_TEXT gepatchte DOM der zuletzt bearbeiteten Variante.
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML_COPY}
        initialMappings={TEXT_A}
        initialVariantBHtml={HTML_COPY}
        initialVariantBMappings={TEXT_B}
      />,
    );
    const frame = () => screen.getByTitle("preview") as HTMLIFrameElement;
    const doc = () => frame().getAttribute("srcdoc") ?? "";

    // Ausgangslage: A's Override ist eingebacken.
    await waitFor(() => expect(doc()).toContain("Headline A"));
    expect(doc()).not.toContain("Headline B");

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await waitFor(() => expect(doc()).toContain("Headline B"));
    expect(doc()).not.toContain("Headline A");

    // Und zurueck (der Bug trat in BEIDE Richtungen auf).
    fireEvent.click(screen.getByRole("button", { name: "Variante A" }));
    await waitFor(() => expect(doc()).toContain("Headline A"));
    expect(doc()).not.toContain("Headline B");
  });

  it("GEGENPROBE zum Anker: eine Text-Mutation bei unveraendertem Code laesst srcDoc IN RUHE (Phase-5-Invariante)", async () => {
    // Der Fix darf den Reload-Sprung beim Tippen/Uebernehmen NICHT wieder
    // einfuehren: mappings ist weiterhin KEINE Dep. Bewusst hier neben dem
    // Anker-Test, damit beide Kraefte an einer Stelle sichtbar sind (der
    // Bestandstest in Scheibe-3 bleibt der eigentliche Waechter).
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML_COPY}
        initialMappings={TEXT_A}
        initialVariantBHtml={HTML_COPY}
        initialVariantBMappings={TEXT_B}
      />,
    );
    const frame = () => screen.getByTitle("preview") as HTMLIFrameElement;
    const doc = () => frame().getAttribute("srcdoc") ?? "";
    await waitFor(() => expect(doc()).toContain("Headline A"));
    const before = doc();

    fireEvent.click(await screen.findByText("Headline A"));
    // Variante A traegt bereits einen Override -> ActionPanel zeigt die
    // Override-Ansicht mit "Bearbeiten" (nicht die "Text bearbeiten"-Kachel).
    fireEvent.click(await screen.findByRole("button", { name: "Bearbeiten" }));
    fireEvent.change(screen.getByDisplayValue("Headline A"), {
      target: { value: "Headline A v2" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    // srcDoc UNVERAENDERT -> kein Reload, kein Scroll-Sprung. Der neue Text geht
    // ueber PS_SET_TEXT ans laufende iframe.
    expect(doc()).toBe(before);
  });

  it("ohne Variante B: KEIN Umschalter, Export-Beschriftung unveraendert (Invariante i)", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML_A} />);
    // Bestandsprojekte sehen exakt die bisherige Toolbar.
    expect(screen.queryByRole("group", { name: "Variante" })).toBeNull();
    expect(screen.getByRole("button", { name: "Projekt exportieren" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "In Zwischenablage kopieren" })).toBeTruthy();
    // Stattdessen der Anlegen-Button.
    expect(screen.getByRole("button", { name: "+ Variante B" })).toBeTruthy();
  });

  it("Umschalten A->B: waehrend des Debounce-Fensters KEIN Orphan-Rauschen, danach B's Elemente + B's Badge", async () => {
    // ZWEISTUFIG mit Absicht. Ein Test, der nur den Endzustand prueft, waere trivial
    // gruen und liesse die eigentliche Behauptung UNBEWIESEN: unmittelbar nach dem
    // Umschalten ist code bereits B, debouncedCode aber noch A (~300ms). In diesem
    // Fenster stuenden B's Mappings ueber A's Elementen -> alles verwaist. Der
    // Flash-Guard elementsReflectCurrentCode (debouncedCode === code) haelt genau
    // dieses Fenster zu.
    renderWithB();

    // Ausgangslage: A ist vollstaendig durchgeparst (debouncedCode === code).
    await screen.findByText("Kaufen A");
    expect(screen.queryByText(/Verwaiste Verknüpfungen/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));

    // (a) IM FENSTER, synchron nach dem Klick: der Guard greift, keine Orphan-Sektion.
    expect(screen.queryByText(/Verwaiste Verknüpfungen/)).toBeNull();

    // (b) NACH dem Debounce: die Liste zeigt B, nicht mehr A — und weiterhin keine
    // verwaisten Verknuepfungen (B's Mapping haengt an B's Element).
    await screen.findByText("Kaufen B");
    expect(screen.queryByText("Kaufen A")).toBeNull();
    expect(screen.queryByText(/Verwaiste Verknüpfungen/)).toBeNull();
    // B traegt ein track-Mapping -> das Ziel-Badge ist da, A's redirect-Badge nicht.
    await waitFor(() =>
      expect(screen.getByTitle("Verknüpft: track")).toBeTruthy(),
    );
    expect(screen.queryByTitle("Verknüpft: redirect")).toBeNull();
  });

  it("Umschalten zurueck B->A stellt A's Elemente + A's Badge wieder her (kein Rest von B)", async () => {
    renderWithB();
    await screen.findByText("Kaufen A");

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await screen.findByText("Kaufen B");
    fireEvent.click(screen.getByRole("button", { name: "Variante A" }));

    await screen.findByText("Kaufen A");
    expect(screen.queryByText("Kaufen B")).toBeNull();
    expect(screen.queryByText(/Verwaiste Verknüpfungen/)).toBeNull();
    await waitFor(() =>
      expect(screen.getByTitle("Verknüpft: redirect")).toBeTruthy(),
    );
    expect(screen.queryByTitle("Verknüpft: track")).toBeNull();
  });

  it("RIEGEL (Invariante ii): Speichern bei aktiver Variante B ruft saveVariantB — saveProject NIE", async () => {
    // Der Fehler, den dieser Test abfaengt, ist der stille Totalverlust von
    // Variante A: ein Save auf B, der in die A-Spalten schreibt, meldet nichts.
    renderWithB();
    await screen.findByText("Kaufen A");

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await screen.findByText("Kaufen B");

    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });

    expect(saveVariantB).toHaveBeenCalledTimes(1);
    expect(saveProject).not.toHaveBeenCalled();
    // Die B-Action bekommt B's Inhalt, nicht A's.
    const bArgs = saveVariantB.mock.calls[0] as unknown[];
    expect(bArgs[0]).toBe("proj-1");
    expect(bArgs[1] as string).toContain("ps-bbbbbb");
    expect(bArgs[2]).toEqual(MAP_B);
  });

  it("GEGENPROBE: Speichern bei aktiver Variante A ruft saveProject — saveVariantB NIE", async () => {
    renderWithB();
    await screen.findByText("Kaufen A");

    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });

    expect(saveProject).toHaveBeenCalledTimes(1);
    expect(saveVariantB).not.toHaveBeenCalled();
    expect((saveProject.mock.calls[0] as unknown[])[1] as string).toContain(
      "ps-aaaaaa",
    );
  });

  it("Publish mit B: beide Varianten gehen mit — A aus dem Live-Draft, B aus dem gespeicherten Stand", async () => {
    renderWithB();
    await screen.findByText("Kaufen A");
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));

    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    const call = publishProject.mock.calls[0] as unknown[];
    // 2. Argument = Variante A (aktiv, Live-Draft), 4. Argument = Variante B.
    const docA = call[1] as string;
    expect(docA).toContain("ps-aaaaaa");
    expect(docA).not.toContain("ps-bbbbbb");
    const argB = call[3] as { functionalHtml: string; mappings: unknown };
    expect(argB).toBeTruthy();
    expect(argB.functionalHtml).toContain("ps-bbbbbb");
    expect(argB.mappings).toEqual(MAP_B);
  });

  it("Publish OHNE B: das 4. Argument bleibt undefined (Invariante i — Aufruf wie bisher)", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML_A} />);
    await screen.findByText("Kaufen A");
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));

    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    expect((publishProject.mock.calls[0] as unknown[])[3]).toBeUndefined();
  });

  it("Variante B anlegen: uebernimmt die SERVER-Antwort in den Stash (nicht die lokale Annahme)", async () => {
    // ABLEITEN STATT ANNEHMEN: der Server liefert zurueck, was er wirklich
    // geschrieben hat. Hier antwortet er bewusst mit einem ANDEREN Inhalt als dem
    // lokalen A-Stand — der Client muss dessen Werte uebernehmen.
    createVariantB.mockResolvedValueOnce({
      ok: true as const,
      html: `<button data-pagesmith-id="ps-cccccc">Vom Server</button>`,
      mappings: [],
    });
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML_A} />);
    await screen.findByText("Kaufen A");

    fireEvent.click(screen.getByRole("button", { name: "+ Variante B" }));
    await screen.findByRole("group", { name: "Variante" });

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    expect(await screen.findByText("Vom Server")).toBeTruthy();
  });

  it("Publish-Hinweis benennt die AKTIVE Variante (nicht statisch 'A')", async () => {
    // Ein UI, das ueber den eigenen Zustand eine unwahre Aussage macht, ist
    // dieselbe Klasse wie das verbotene "gerettet". Bei aktiver Variante B muss B
    // als "aktueller Editor-Stand" ausgewiesen sein.
    renderWithB();
    await screen.findByText("Kaufen A");
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    expect(document.body.textContent).toContain(
      "Variante A im aktuellen Editor-Stand",
    );

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await screen.findByText("Kaufen B");
    expect(document.body.textContent).toContain(
      "Variante B im aktuellen Editor-Stand",
    );
    expect(document.body.textContent).not.toContain(
      "Variante A im aktuellen Editor-Stand",
    );
  });

  it("RIEGEL: Variante B entfernen, WÄHREND B aktiv ist -> Editor faellt auf A zurueck (nicht auf leer)", async () => {
    // Der stille Totalverlust, den dieser Test verriegelt: bliebe activeVariant nach
    // dem Entfernen auf 'b' waehrend der Stash leer wird, zeigte der Editor ein
    // leeres "A" mit dirty=false — und der naechste Speichern-Klick ueberschriebe
    // Variante A mit Leerstring. Ohne Fehler, ohne Warnung.
    renderWithB();
    await screen.findByText("Kaufen A");

    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await screen.findByText("Kaufen B");

    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: "Variante B entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, entfernen" }));

    // (i) Der Editor zeigt A's Inhalt — NICHT leer, NICHT weiter B.
    expect(await screen.findByText("Kaufen A")).toBeTruthy();
    expect(screen.queryByText("Kaufen B")).toBeNull();
    // (ii) activeVariant ist 'a': kein Umschalter mehr, der Anlegen-Button ist zurueck.
    expect(screen.queryByRole("group", { name: "Variante" })).toBeNull();
    expect(screen.getByRole("button", { name: "+ Variante B" })).toBeTruthy();

    // (iii) Der anschliessende Speichern-Klick geht in den A-Slot, mit A's Inhalt.
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    expect(saveVariantB).not.toHaveBeenCalled();
    expect(saveProject).toHaveBeenCalledTimes(1);
    const savedHtml = (saveProject.mock.calls[0] as unknown[])[1] as string;
    expect(savedHtml).toContain("ps-aaaaaa");
    expect(savedHtml).not.toBe("");
  });

  it("Variante B entfernen: ruft removeVariantB, Umschalter verschwindet, A bleibt stehen", async () => {
    renderWithB();
    await screen.findByText("Kaufen A");
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));

    fireEvent.click(screen.getByRole("button", { name: "Variante B entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, entfernen" }));

    await waitFor(() =>
      expect(screen.queryByRole("group", { name: "Variante" })).toBeNull(),
    );
    expect(removeVariantB).toHaveBeenCalledWith("proj-1");
    // Variante A ist unberuehrt (der Editor steht weiter auf A's Inhalt).
    expect(screen.getByText("Kaufen A")).toBeTruthy();
    expect(screen.getByRole("button", { name: "+ Variante B" })).toBeTruthy();
  });
});

describe("CodeImporter — Scheibe 9b-1: A/B-Test-Schalter", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Original</h1>`;

  function renderWith(abActive: boolean) {
    return render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={abActive}
      />,
    );
  }

  it("ohne Variante B gibt es KEINEN Test-Schalter", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    expect(screen.queryByRole("button", { name: /Test starten|Test stoppen/ })).toBeNull();
  });

  it("Zustand wird aus dem Projekt ABGELEITET (initialAbTestActive)", async () => {
    renderWith(true);
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    expect(screen.getByRole("button", { name: "Test stoppen" })).toBeTruthy();
    expect(document.body.textContent).toContain("Test läuft");
  });

  it("RIEGEL: der Schalter uebernimmt die SERVER-Antwort, nicht die lokale Annahme", async () => {
    // Der Server antwortet bewusst mit dem GEGENTEIL dessen, was ein lokaler Toggle
    // ergaebe: lokal aus -> Klick -> lokale Annahme waere "an", der Server sagt
    // aber "aus". Der Schalter MUSS dem Server folgen.
    setAbTestActive.mockResolvedValueOnce({ ok: true as const, abTestActive: false });
    renderWith(false);
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));

    await waitFor(() => expect(setAbTestActive).toHaveBeenCalledWith("proj-1", true));
    await waitFor(() =>
      expect(screen.getByRole("button", { name: "Test starten" })).toBeTruthy(),
    );
    expect(screen.queryByRole("button", { name: "Test stoppen" })).toBeNull();
  });

  it("Verweigerung (B nicht veroeffentlicht) -> Fehlertext, Schalter bleibt aus", async () => {
    setAbTestActive.mockResolvedValueOnce({
      ok: false as const,
      error: "Variante B ist noch nicht veröffentlicht — erst veröffentlichen, dann den Test starten.",
    } as never);
    renderWith(false);
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));

    await waitFor(() =>
      expect(document.body.textContent).toMatch(/noch nicht veröffentlicht/),
    );
    expect(screen.getByRole("button", { name: "Test starten" })).toBeTruthy();
  });
});

describe("CodeImporter — Scheibe 9b-1p: lokaler Fehler-Kanal + B-Publish-Hinweis", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Original</h1>`;

  function renderWithB(abActive = false) {
    return render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={abActive}
      />,
    );
  }
  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));

  // Der Riegel-Fehler muss in der VARIANTEN-SEKTION stehen, nicht in der
  // Preview-Kopfzeile. Anker: die Sektion enthaelt die Ueberschrift "Variante B".
  function variantSection(): HTMLElement {
    const h = screen.getByRole("heading", { name: "Variante B" });
    return h.parentElement as HTMLElement;
  }

  it("TEST 1: Riegel-Fehler steht in der Varianten-Sektion und ist NICHT gekuerzt", async () => {
    const LONG =
      "Variante B ist noch nicht veröffentlicht — erst veröffentlichen, dann den Test starten.";
    setAbTestActive.mockResolvedValueOnce({ ok: false as const, error: LONG } as never);
    renderWithB();
    openSettings();
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));

    const el = await waitFor(() => {
      const m = variantSection().querySelector("p.text-red-600");
      if (!m) throw new Error("kein Fehler in der Varianten-Sektion");
      return m as HTMLElement;
    });
    // Vollstaendiger Wortlaut, kein truncate.
    expect(el.textContent).toBe(LONG);
    expect(el.className).not.toContain("truncate");
  });

  it("WAECHTER zweite Render-Stelle: createVariantB-Fehler ist OHNE Variante B sichtbar", async () => {
    // Die Varianten-Sektion haengt an hasVariantB — und genau das ist false, waehrend
    // das ANLEGEN von B laeuft. Ohne die zweite Render-Stelle neben dem
    // "+ Variante B"-Button waere ein Fehlschlag nach der 9b-1p-Umstellung
    // UNSICHTBAR (vorher erschien er im zentralen Kanal). Dieser Test ist ihr
    // einziger Waechter.
    createVariantB.mockResolvedValueOnce({
      ok: false as const,
      error: "Variante B existiert bereits.",
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Original");
    expect(screen.queryByRole("group", { name: "Variante" })).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "+ Variante B" }));

    // Sichtbar …
    await waitFor(() =>
      expect(document.body.textContent).toContain("Variante B existiert bereits."),
    );
    // … und NICHT im zentralen Kanal (der rendert als span.truncate.text-red-600
    // in der Preview-Kopfzeile).
    expect(document.querySelector("span.truncate.text-red-600")).toBeNull();
  });

  it("SLOT: Hinweis UND Riegel-Fehler zeigen den Satz GENAU EINMAL, nicht doppelt", async () => {
    // Beide Quellen tragen im Fall "B nicht veroeffentlicht" DENSELBEN Satz
    // (VARIANT_B_NOT_PUBLISHED_MESSAGE). Ohne den gemeinsamen Slot stuenden Hinweis
    // (amber) und Fehler (rot) untereinander und wiederholten sich wortgleich.
    const MSG =
      "Variante B ist noch nicht veröffentlicht — erst veröffentlichen, dann den Test starten.";
    getVariantBPublished.mockResolvedValue(false);
    setAbTestActive.mockResolvedValueOnce({ ok: false as const, error: MSG } as never);
    renderWithB();
    openSettings();
    // Ausgangslage: der Hinweis steht (genau einmal).
    await waitFor(() =>
      expect(variantSection().textContent).toContain("noch nicht veröffentlicht"),
    );

    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));
    // Nach dem Riegel: der Fehler ist da …
    await waitFor(() => {
      const el = variantSection().querySelector("p.text-red-600");
      if (!el) throw new Error("kein Fehler");
    });
    // … und der Satz steht GENAU EINMAL im Dokument.
    const occurrences = (document.body.textContent ?? "").split(MSG).length - 1;
    expect(occurrences).toBe(1);
    // Gegenprobe zur Prioritaet: der amber-Hinweis ist verdraengt, nicht danebengesetzt.
    expect(variantSection().querySelector("p.text-amber-700")).toBeNull();
  });

  it("TEST 2 (Invariante ii): ein SPEICHERN-Fehler bleibt im zentralen Kanal", async () => {
    saveProject.mockResolvedValueOnce({
      ok: false as const,
      error: "Speichern kaputt",
    } as never);
    renderWithB();
    await screen.findByText("Original");
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));

    // Der zentrale Kanal rendert als <span class="truncate …"> in der Preview-Kopfzeile.
    const central = await waitFor(() => {
      const m = document.querySelector("span.truncate.text-red-600");
      if (!m) throw new Error("kein zentraler Fehler");
      return m as HTMLElement;
    });
    expect(central.textContent).toBe("Speichern kaputt");
    // … und NICHT in der Varianten-Sektion.
    openSettings();
    expect(variantSection().querySelector("p.text-red-600")).toBeNull();
  });

  it("AUFLAGE B — LEAK: ein Varianten-Fehler ist nach dem Projektwechsel WEG", async () => {
    setAbTestActive.mockResolvedValueOnce({
      ok: false as const,
      error: "Riegel A",
    } as never);
    loadProject.mockResolvedValueOnce({
      id: "proj-2",
      name: "B",
      html: HTML,
      mappings: [],
      settings: {},
      html_b: HTML,
      mappings_b: [],
      ab_test_active: false,
    });
    renderWithB();
    openSettings();
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));
    await waitFor(() =>
      expect(variantSection().textContent).toContain("Riegel A"),
    );

    // Projektwechsel -> applyZenForLoadedCode raeumt den lokalen Kanal.
    fireEvent.click(screen.getByRole("button", { name: /^Projekte/ }));
    // Der Switcher listet aus initialProjects; hier direkt ueber handleSwitch-Pfad:
    // ein zweites Projekt existiert im Mock nicht -> stattdessen "+ Neues Projekt",
    // das denselben Chokepoint (resetToEmpty -> applyZenForLoadedCode) durchlaeuft.
    fireEvent.click(screen.getByRole("button", { name: "+ Neues Projekt" }));
    expect(document.body.textContent).not.toContain("Riegel A");
  });

  it("TEST 5: Hinweis NUR bei eindeutigem false — nicht bei null, nicht bei true", async () => {
    getVariantBPublished.mockResolvedValue(false);
    const { unmount } = renderWithB();
    openSettings();
    await waitFor(() =>
      expect(variantSection().textContent).toContain("noch nicht veröffentlicht"),
    );
    unmount();

    for (const v of [null, true]) {
      getVariantBPublished.mockResolvedValue(v as boolean | null);
      const r = render(
        <CodeImporter
          initialProjectId="proj-1"
          initialCode={HTML}
          initialVariantBHtml={HTML}
          initialVariantBMappings={[]}
        />,
      );
      openSettings();
      await waitFor(() => expect(getVariantBPublished).toHaveBeenCalled());
      expect(variantSection().textContent).not.toContain("noch nicht veröffentlicht");
      r.unmount();
    }
  });

  it("TEST 6 (Invariante iv): der Button bleibt bei false UND bei null klickbar", async () => {
    for (const v of [false, null]) {
      getVariantBPublished.mockResolvedValue(v as boolean | null);
      const r = renderWithB();
      openSettings();
      await waitFor(() => expect(getVariantBPublished).toHaveBeenCalled());
      const btn = screen.getByRole("button", { name: "Test starten" });
      expect((btn as HTMLButtonElement).disabled).toBe(false);
      r.unmount();
    }
  });

  it("TEST 7a: nach erfolgreichem Publish wird der Wert NEU geholt (nicht angenommen)", async () => {
    getVariantBPublished.mockResolvedValueOnce(false);
    renderWithB();
    openSettings();
    await waitFor(() =>
      expect(variantSection().textContent).toContain("noch nicht veröffentlicht"),
    );

    // Der Mock liefert beim Refetch einen ABWEICHENDEN Wert -> das UI muss DIESEN zeigen.
    getVariantBPublished.mockResolvedValue(true);
    // Detection abwarten, BEVOR geklickt wird: seit dem Leer-Riegel haengt der
    // Publish-Button am geteilten publishPairs-Memo und damit an debouncedCode,
    // das bewusst leer startet (Hydration-Paritaet). Vor dem ersten Debounce-Lauf
    // ist der Button also gesperrt — deklarierte Verhaltensaenderung (Auflage 5),
    // kein Fehler. Der Test wartet jetzt auf denselben Zustand, den ein echter
    // Nutzer ohnehin vorfindet.
    await screen.findByText("Original");
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));
    await waitFor(() =>
      expect(variantSection().textContent).not.toContain("noch nicht veröffentlicht"),
    );
  });

  it("TEST 7b: nach removeVariantB wird der Wert NEU geholt (sonst stale TRUE)", async () => {
    // Warum dieser zweite Punkt: nach dem Entfernen waere der Wert stale true. Legt
    // der Nutzer B gleich neu an, waere hasVariantB true und der Wert faelschlich
    // true -> der Hinweis FEHLTE, obwohl B nicht veroeffentlicht ist.
    getVariantBPublished.mockResolvedValue(true);
    renderWithB();
    openSettings();
    await waitFor(() => expect(getVariantBPublished).toHaveBeenCalledTimes(1));

    getVariantBPublished.mockResolvedValue(false);
    fireEvent.click(screen.getByRole("button", { name: "Variante B entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, entfernen" }));
    await waitFor(() => expect(getVariantBPublished).toHaveBeenCalledTimes(2));
  });
});

describe("CodeImporter — safeAction: geworfene Server-Action-Fehler", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Original</h1>`;
  const BOOM = () => Promise.reject(new Error("net::ERR_INTERNET_DISCONNECTED"));

  it("TEST 1: saveProject WIRFT -> Meldung, Button wieder klickbar, dirty bleibt", async () => {
    // Der live gemessene Fall: ohne Wrapper verlaesst die Exception den Handler,
    // setSaveStatus bleibt auf "saving" und der Button ist dauerhaft ausgegraut.
    saveProject.mockImplementationOnce(BOOM as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Original");
    fireEvent.change(screen.getByPlaceholderText(/Füge hier deinen HTML-Code/), {
      target: { value: HTML + "<p>neu</p>" },
    });
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));

    await waitFor(() =>
      expect(document.body.textContent).toContain("konnte nicht abgeschlossen"),
    );
    // ZUORDNUNG DER ZWEI TEXTE (verbindlich, nicht kosmetisch): der Speicherpfad
    // MUSS SAVE_THROW_MESSAGE nutzen. Die Entwarnung ist nur HIER belegbar —
    // savedCode/savedMappings werden ausschliesslich im Erfolgszweig gesetzt, der
    // Draft bleibt also wirklich stehen. Ohne diese Assertion bliebe ein Wechsel
    // auf den neutralen Text unbemerkt, und der Nutzer verlöre die Information,
    // die ihn vom Reload abhält.
    expect(document.body.textContent).toContain(SAVE_THROW_MESSAGE);
    expect(document.body.textContent).toContain("deine Änderungen sind noch da");
    const btn = screen.getByRole("button", { name: /Erneut versuchen|Speichern/ });
    expect((btn as HTMLButtonElement).disabled).toBe(false);
    // dirty haelt: savedCode wurde nicht gesetzt.
    expect(document.body.textContent).toContain("Ungespeicherte Änderungen");
  });

  it("TEST 2 (Invariante iii): sofortiger zweiter Versuch gelingt, ohne Reload", async () => {
    saveProject.mockImplementationOnce(BOOM as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Original");
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await waitFor(() =>
      expect(document.body.textContent).toContain("konnte nicht abgeschlossen"),
    );

    // Zweiter Klick — der Mock liefert jetzt wieder Erfolg.
    fireEvent.click(screen.getByRole("button", { name: /Erneut versuchen|Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    expect(saveProject).toHaveBeenCalledTimes(2);
  });

  it("TEST 3 (Invariante iv): Speichern ERFOLG + listProjects WIRFT -> Erfolg bleibt, KEIN Fehler", async () => {
    listProjects.mockImplementationOnce(BOOM as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Original");
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));

    await screen.findByRole("button", { name: /Gespeichert/ });
    expect(document.body.textContent).not.toContain("konnte nicht abgeschlossen");
  });

  it("TEST 4: publishProject WIRFT -> Publish-Kanal, Button frei", async () => {
    publishProject.mockImplementationOnce(BOOM as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Original");
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));

    await waitFor(() =>
      expect(document.body.textContent).toContain("konnte nicht abgeschlossen"),
    );
    // GEGENRICHTUNG der Zuordnung: ein Nicht-Speicherpfad darf die Entwarnung NIE
    // tragen. Beim Publish gibt es keine "Aenderungen, die noch da sind" — der
    // Zusatz waere eine falsche Beruhigung, und die ist schlimmer als ein
    // neutraler Text.
    expect(document.body.textContent).toContain(ACTION_THROW_MESSAGE);
    expect(document.body.textContent).not.toContain(SAVE_THROW_MESSAGE);
    expect(document.body.textContent).not.toContain("deine Änderungen sind noch da");
    const btn = screen.getByRole("button", { name: /^Veröffentlichen$/ });
    expect((btn as HTMLButtonElement).disabled).toBe(false);
  });

  it("TEST 5 (Invariante vi): setCapiToken WIRFT -> Meldung, und der TOKEN taucht in KEINER Ausgabe auf", async () => {
    const SECRET = "EAAG-super-geheimes-token-xyz";
    const spies = (["log", "warn", "error", "info", "debug"] as const).map((m) =>
      vi.spyOn(console, m).mockImplementation(() => {}),
    );
    try {
      // Der Fehler TRAEGT das Secret — so, wie ein Server-/Framework-Fehler die
      // Payload echoen koennte. Genau das ist das Risiko: nicht dass der Wrapper
      // das Argument bekaeme (er sieht nur einen Thunk), sondern dass er ein
      // Error-Objekt weiterreicht, das es schon enthaelt. Ein Test mit einem
      // harmlosen Fehler waere hohl (per Mutationsprobe belegt).
      setCapiToken.mockImplementationOnce(
        (() =>
          Promise.reject(
            new Error(`upstream rejected payload token=${SECRET}`),
          )) as never,
      );
      render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
      fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
      fireEvent.change(screen.getByPlaceholderText(/CAPI-Token einfügen/), {
        target: { value: SECRET },
      });
      fireEvent.click(screen.getByRole("button", { name: "Setzen" }));

      await waitFor(() =>
        expect(document.body.textContent).toContain("konnte nicht abgeschlossen"),
      );
      // KERN: keine Konsolen-Ausgabe traegt das Secret.
      for (const sp of spies) {
        for (const call of sp.mock.calls) {
          // String() statt JSON.stringify: letzteres verschluckt Funktionen und
          // serialisiert Error zu {} — es haette den Leak nicht gesehen.
          expect(call.map((a) => String(a)).join(" ")).not.toContain(SECRET);
        }
      }
      // Und es steht auch nicht in der Fehlermeldung.
      expect(document.body.textContent).not.toContain(SECRET);
    } finally {
      spies.forEach((sp) => sp.mockRestore());
    }
  });

  it("TEST 6: Varianten-Actions WERFEN -> lokaler Varianten-Kanal, Busy frei", async () => {
    setAbTestActive.mockImplementationOnce(BOOM as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));

    const section = (
      screen.getByRole("heading", { name: "Variante B" }).parentElement as HTMLElement
    );
    await waitFor(() =>
      expect(section.querySelector("p.text-red-600")?.textContent).toContain(
        "konnte nicht abgeschlossen",
      ),
    );
    expect(
      (screen.getByRole("button", { name: "Test starten" }) as HTMLButtonElement)
        .disabled,
    ).toBe(false);
  });

  it("TEST 7: Lese-Effekt WIRFT -> Leer-Wert, kein hängender Zustand", async () => {
    getEventCounts.mockImplementationOnce(BOOM as never);
    getAdblockLoss.mockImplementationOnce(BOOM as never);
    getVariantBPublished.mockImplementationOnce(BOOM as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));

    await waitFor(() =>
      expect(document.body.textContent).toContain("Noch keine Events."),
    );
    expect(document.body.textContent).toContain("Warte auf erste Bestätigung.");
    // getVariantBPublished -> null: es wird NICHTS behauptet (kein Hinweis).
    expect(document.body.textContent).not.toContain("noch nicht veröffentlicht");
  });

  it("AUFLAGE 3: Löschen ERFOLG + listProjects WIRFT -> Liste ohne das gelöschte Projekt, NICHT leer", async () => {
    const PROJECTS = [
      { id: "proj-1", name: "Alpha", updated_at: "2026-07-27T10:00:00.000Z" },
      { id: "proj-2", name: "Beta", updated_at: "2026-07-27T09:00:00.000Z" },
    ];
    listProjects.mockImplementationOnce(BOOM as never);
    vi.spyOn(window, "confirm").mockReturnValue(true);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialProjects={PROJECTS}
      />,
    );
    fireEvent.click(screen.getByRole("button", { name: /^Projekte/ }));
    fireEvent.click(screen.getAllByRole("button", { name: "Loeschen" })[0]);

    await waitFor(() => expect(deleteProject).toHaveBeenCalledWith("proj-1"));
    // Die uebrigen Projekte stehen weiterhin, das geloeschte ist weg.
    await waitFor(() => expect(screen.queryByText("Alpha")).toBeNull());
    // "Beta" steht MEHRFACH: in der Liste UND als "Aktiv: Beta" — genau der Beleg,
    // dass remaining[0] der richtige Nachbar ist statt undefined (mit [] als
    // Fallback waere der Editor faelschlich auf den Leerzustand gefallen).
    expect(screen.getAllByText("Beta").length).toBeGreaterThan(0);
    expect(document.body.textContent).not.toContain("Noch keine gespeicherten Projekte");
  });
});

// =============================================================================
// LEER-RIEGEL — CLIENT-SEITE (Scheibe Leere-Variante-Riegel)
//
// ZUR ERREICHBARKEIT, ehrlich vermerkt: Ein LEERES html/html_b laesst sich ueber
// die heutige UI nicht ERZEUGEN — der Speichern-Button ist bei leerer aktiver
// Variante gesperrt. Die DB erlaubt den Zustand trotzdem (weder html noch html_b
// tragen eine Nicht-Leer-Bedingung; der CHECK verlangt nur "is not null"), und
// genau so kommt er in den Client: ueber den LADEPFAD.
//
// Deshalb wird hier NICHT interner State geseedet, sondern eine reale DB-Zeile
// modelliert (die Props sind exakt das, was loadProject zurueckgibt) — und der
// interessante Zustand entsteht danach durch einen ECHTEN UI-Klick, nicht durch
// ein weiteres Prop. Das ist der Unterschied, den die 9a-Lektion meint.
// =============================================================================
describe("CodeImporter — Leer-Riegel (Client-Guard + ein Anzeigeslot)", () => {
  const HTML = '<!DOCTYPE html><html><head></head><body><h1 data-pagesmith-id="ps-aaaaaa">Titel</h1></body></html>';
  const publishBtn = () =>
    screen.getByRole("button", { name: /^(Veröffentlichen|Erneut veröffentlichen)$/ });
  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));

  it("T8 DER SCHLIMMERE FALL ueber die reale Sequenz: A leer, dann per Klick auf B — Button GESPERRT, Hinweis nennt Variante A", async () => {
    // Ladepfad: die Zeile traegt ein leeres html und eine gefuellte Variante B.
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode=""
        initialMappings={[]}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );

    // SCHRITT 1 (noch auf A): schon hier greift der Guard — A ist leer.
    openSettings();
    await waitFor(() => expect((publishBtn() as HTMLButtonElement).disabled).toBe(true));
    expect(screen.getByText(/Variante A ist leer/)).toBeTruthy();

    // SCHRITT 2 — DER ECHTE KLICK, der den frueheren Guard aushebelte: auf B
    // umschalten. Ab hier ist code (= B) GEFUELLT, waehrend pairA aus dem leeren
    // Stash kommt. Der alte Guard (code.trim() === "") waere jetzt FREI und ALLE
    // Besucher bekaemen die leere Seite — ohne aktiven Test liefert die Route
    // immer A.
    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    await waitFor(() =>
      expect(
        screen.getByRole("button", { name: "Variante B" }).getAttribute("aria-pressed"),
      ).toBe("true"),
    );
    await screen.findByText("Titel"); // B ist wirklich gefuellt und erkannt

    // KEIN erneutes openSettings(): der Button ist ein TOGGLE, ein zweiter Klick
    // schloesse das Panel wieder. Es ist seit Schritt 1 offen.
    // DER KERN DES TESTS: gefuellter Editor, trotzdem gesperrt — und der Hinweis
    // erklaert warum, sonst waere der graue Button unerklaerlich (Auflage 3).
    await waitFor(() => expect((publishBtn() as HTMLButtonElement).disabled).toBe(true));
    expect(screen.getByText(/Variante A ist leer/)).toBeTruthy();
    expect(publishProject).not.toHaveBeenCalled();
  });

  it("T8b LEERE VARIANTE B (Ladepfad html_b = ''): Button gesperrt, Hinweis nennt B UND den Ausweg", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialMappings={[]}
        initialVariantBHtml=""
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() => expect((publishBtn() as HTMLButtonElement).disabled).toBe(true));
    // AUFLAGE 6: ohne den Ausweg waere dieses Projekt komplett unveroeffentlichbar
    // ohne erkennbaren Weg zurueck.
    expect(screen.getByText(/Variante B ist leer/)).toBeTruthy();
    expect(screen.getByText(/entferne sie/)).toBeTruthy();
  });

  it("T9 REGRESSION: Projekt OHNE B verhaelt sich unveraendert (gefuellt -> frei, kein Hinweis)", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} initialMappings={[]} />);
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() => expect((publishBtn() as HTMLButtonElement).disabled).toBe(false));
    // Kein neuer Text fuer Bestandsprojekte (Invariante ii auf UI-Ebene).
    expect(screen.queryByText(/ist leer und würde/)).toBeNull();
    expect(screen.queryByText(/Die Seite ist leer/)).toBeNull();
  });

  it("T9b OHNE B und LEER: der neutrale Satz, KEIN Varianten-Jargon", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode="" initialMappings={[]} />);
    openSettings();

    await waitFor(() => expect((publishBtn() as HTMLButtonElement).disabled).toBe(true));
    expect(screen.getByText(/Die Seite ist leer/)).toBeTruthy();
    // "Variante A" waere hier Fachjargon fuer einen Zustand, den der Nutzer nicht kennt.
    expect(screen.queryByText(/Variante A/)).toBeNull();
  });

  it("EIN ANZEIGESLOT, PRIORITAET FEHLER VOR HINWEIS (9b-1p-NACHTRAG, nicht wiederholen)", async () => {
    // Der Befund von damals: Hinweis und Riegel-Fehler waren GLEICHZEITIG sichtbar
    // und zeigten denselben Satz doppelt. Hier wird der Server-Fehler erzwungen,
    // waehrend der lokale Hinweis-Zustand ebenfalls anliegen koennte.
    // `as never` wie beim bestehenden BOOM-Muster: der Spy ist auf den
    // Erfolgs-Zweig hin typisiert, der Fehlerfall ist hier der Prueffall.
    publishProject.mockResolvedValueOnce({
      ok: false,
      error: "Serverseitig abgelehnt.",
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} initialMappings={[]} />);
    await screen.findByText("Titel");
    openSettings();

    fireEvent.click(publishBtn());
    const fehler = await screen.findByText("Serverseitig abgelehnt.");
    expect(fehler).toBeTruthy();
    // Genau EIN Slot: der Hinweis-Kanal schweigt, solange ein Fehler steht.
    expect(screen.queryByText(/Erst speichern/)).toBeNull();
    expect(screen.queryByText(/ist leer/)).toBeNull();
  });
});

/**
 * Auswertung je Variante (Phase 9 Scheibe 9c-1) — die neue Sektion im Einstellungs-Panel.
 *
 * Geprueft wird das, was die Sektion dem Nutzer ZUSAGT: sie erscheint nur, wenn es etwas
 * auszuwerten gibt (J3), sie unterscheidet "leer" von "nicht ladbar" (J10), sie weist
 * Zeilen ohne Zuordnung nur bei einer Zahl != 0 aus (J13), und sie behauptet keine
 * Besucher-Rate (J11).
 */
describe("Auswertung je Variante (Scheibe 9c-1)", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));

  const ROWS = [
    { event_type: "__ps_pageview", count_a: 40, count_b: 38, count_none: 0 },
    { event_type: "Purchase", count_a: 2, count_b: 5, count_none: 0 },
  ];

  it("J3: keine zugeordneten Zeilen -> die Sektion erscheint gar nicht", async () => {
    // Default-Mock: {ok:true, rows:[]}. Ein Projekt, fuer das nie ein Test lief, sieht
    // KEINE UI-Aenderung — kein leerer Kasten, keine Ueberschrift.
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() =>
      expect(document.body.textContent).toContain("Statistik"),
    );
    expect(screen.queryByText("Auswertung je Variante")).toBeNull();
  });

  it("zeigt Zeilen je Variante und die Conversions je Seitenaufruf", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    // PageViews werden ueber die geteilte Konstante gelabelt, nicht als Rohtoken gezeigt.
    expect(document.body.textContent).toContain("PageViews");
    expect(document.body.textContent).not.toContain("__ps_pageview");
    // ABSOLUTWERTE PRIMAER: die Bezugsgroesse steht in der Zeile.
    expect(document.body.textContent).toContain("Conversions je Seitenaufruf");
    expect(document.body.textContent).toContain("A 2 von 40");
    expect(document.body.textContent).toContain("B 5 von 38");
  });

  // J11, diskriminierend: die Wortwahl ist eine Zusage an den Nutzer, keine Kosmetik.
  // Es gibt keine Besucher-Identitaet — "je Besucher" waere eine Zahl, die es nicht gibt.
  it("J11: nennt NIE eine Rate je Besucher und kuert keinen Sieger", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    const text = document.body.textContent ?? "";
    expect(text).not.toMatch(/je Besucher/i);
    expect(text).not.toMatch(/Gewinner|Sieger|schlaegt|besser/i);
  });

  // J13 mit Gegenprobe: ohne die zweite Haelfte bewiese der erste Fall nur, dass der Text
  // irgendwo fehlt.
  it("J13: 'ohne Zuordnung' erscheint NUR, wenn die Zahl nicht null ist", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    const view = render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();
    await screen.findByText("Auswertung je Variante");
    expect(screen.queryByText(/Ohne Varianten-Zuordnung/)).toBeNull();
    view.unmount();

    getVariantCounts.mockResolvedValueOnce({
      ok: true,
      rows: [{ ...ROWS[0], count_none: 7 }, ROWS[1]],
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();
    await screen.findByText("Auswertung je Variante");
    expect(document.body.textContent).toContain("Ohne Varianten-Zuordnung: 7");
  });

  // NENNER NULL — der Zustand unmittelbar nach dem Teststart: die noch nicht
  // ausgelieferte Variante hat 0 Aufrufe. Eine Rate waere hier 1/0 bzw. 0/0, also
  // Infinity oder NaN. J11 konsequent zu Ende gedacht: die ABSOLUTWERTE sind primaer und
  // bleiben stehen, die abgeleitete Rate entfaellt, wenn ihre Grundlage fehlt — es wird
  // nichts gerundet, geschaetzt oder als Platzhalter erfunden.
  // ROT DURCH: den `pageviews.count_a > 0`-Guard entfernen (Mutationskandidat) -> im Text
  // stuende "Infinity" bzw. "NaN".
  it("Nenner 0 -> Absolutwerte bleiben, KEINE Rate, kein NaN/Infinity", async () => {
    getVariantCounts.mockResolvedValueOnce({
      ok: true,
      rows: [
        { event_type: "__ps_pageview", count_a: 0, count_b: 12, count_none: 0 },
        { event_type: "Purchase", count_a: 1, count_b: 3, count_none: 0 },
      ],
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    const text = document.body.textContent ?? "";
    // Der Absolutwert steht da — samt seiner Bezugsgroesse 0, die genau das aussagt.
    expect(text).toContain("A 1 von 0");
    // Die Rate der A-Seite entfaellt; die der B-Seite steht, weil ihr Nenner traegt.
    expect(text).toContain("B 3 von 12 (25.0 %)");
    expect(text).not.toMatch(/NaN|Infinity/);
  });

  // FEHLENDE PAGEVIEW-ZEILE: ohne Nenner gibt es keine "Conversions je Seitenaufruf" —
  // die Tabelle mit den Absolutwerten bleibt trotzdem stehen. Real erreichbar, wenn der
  // PageView-Emitter blockiert wurde, eine Conversion aber durchkam.
  // ROT DURCH: den `!pageviews`-Guard entfernen (Mutationskandidat) -> die Sektion
  // rendert "von undefined" oder wirft beim Zugriff auf count_a.
  it("keine PageView-Zeile -> keine Raten-Sektion, Absolutwerte bleiben", async () => {
    getVariantCounts.mockResolvedValueOnce({
      ok: true,
      rows: [{ event_type: "Purchase", count_a: 1, count_b: 3, count_none: 0 }],
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    expect(screen.queryByText("Conversions je Seitenaufruf")).toBeNull();
    const text = document.body.textContent ?? "";
    expect(text).toContain("Purchase");
    expect(text).not.toContain("undefined");
    expect(text).not.toMatch(/NaN|Infinity/);
  });

  // J10 — DER KERN DIESER SCHEIBE fuer die neue Sektion: ein Wurf muss als "nicht ladbar"
  // sichtbar werden, NICHT als "keine Daten". Der Test setzt zusaetzlich eine Variante B
  // voraus, weil der Fehlerfall an hasVariantB haengt (ein Projekt ohne Variante bekommt
  // keine Fehlermeldung zu einer Sektion, die es nie saehe).
  it("J10: Lese-Effekt WIRFT -> 'nicht geladen', NICHT stillschweigend leer", async () => {
    getVariantCounts.mockImplementationOnce(
      (() => Promise.reject(new Error("net::ERR_INTERNET_DISCONNECTED"))) as never,
    );
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() =>
      expect(document.body.textContent).toContain(
        "Die Auswertung konnte nicht geladen werden",
      ),
    );
    // Die Sektion behauptet in diesem Zustand NICHTS ueber Zahlen.
    expect(screen.queryByText("Conversions je Seitenaufruf")).toBeNull();
  });
});
