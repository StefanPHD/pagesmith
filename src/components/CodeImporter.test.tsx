import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { CONSENT_TEXT_MAX_LENGTH } from "@/lib/settings";
import {
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
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
  listConfiguredTargets,
  listTargetCredentialStates,
  listTestModeStates,
  startTestMode,
  endTestMode,
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
  // Phase 11 Scheibe 6, zweite Haelfte: Default ist eine LEERE Liste -> in den
  // Bestandstests steht jede Karte auf "Nicht konfiguriert". Ein Default mit Zielen
  // haette in jedem Bestandstest einen Entfernen-Knopf eingeblendet.
  listConfiguredTargets: vi.fn(async (): Promise<unknown> => []),
  // DER VORGABEWERT IST EINE FORM, DIE DER RESOLVER WIRKLICH ERZEUGT (Scheibe 11.2b):
  // ein geglueckter Lauf ohne Zeile. `{}` als Bequemlichkeit waere die Falle aus der
  // Scheibe 1b-2a — eine Attrappe in einer Gestalt, die es im Betrieb nicht gibt.
  listTargetCredentialStates: vi.fn(
    async (): Promise<unknown> => ({ ok: true, states: {} }),
  ),
  // DERSELBE VORGABEWERT-GRUNDSATZ WIE BEI DER NACHBARIN (Scheibe 11.3b): ein
  // geglueckter Lauf OHNE Eintrag. Damit traegt in den Bestandslaeufen keine Karte
  // einen Testmodus-Schalter und kein Banner steht ueber dem Editor — der Bestand
  // sieht aus wie vor dieser Scheibe. Die Laeufe, die den Schalter pruefen, setzen
  // den Wert ausdruecklich.
  listTestModeStates: vi.fn(
    async (): Promise<unknown> => ({ ok: true, states: {} }),
  ),
  startTestMode: vi.fn(),
  endTestMode: vi.fn(),
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
  listConfiguredTargets,
  listTargetCredentialStates,
  listTestModeStates,
  startTestMode,
  endTestMode,
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

// DIE ATTRAPPE FUER DEN FEHLERAUSGANG VON stripForeignGroup (Phase 11.11, Scheibe
// 11.11c).
//
// WARUM SIE UEBERHAUPT NOETIG IST: Die Rest-Meldung steht am GEKLICKTEN Fund und
// erscheint, wenn die Nachbedingung scheitert — der Klick ist gelaufen, und der Fund
// steht immer noch da. AUF DEM GEGLUECKTEN WEG KANN DAS NICHT PASSIEREN:
// stripForeignGroup nimmt ALLE Knoten seines Schluessels (GEMESSEN, Lauf F16 in
// foreign-strip.test.ts). Erreichbar ist der Zustand allein ueber die FEHLERAUSGAENGE
// der Funktion, die die EINGABE unveraendert zurueckgeben.
//
// WARUM EIN TEILMOCK MIT SCHALTER UND KEIN DATEIWEITER: Ein `vi.mock` gilt der ganzen
// Datei, und die uebrigen 11.11c-Laeufe brauchen die ECHTE Funktion — SK13 und SK14
// pruefen gerade, dass sie wirklich entfernt. Der Schalter steht per Vorgabe auf AUS;
// nur die zwei Rest-Meldungs-Laeufe schalten ihn ein, und afterEach stellt ihn zurueck.
const { foreignStripAttrappe } = vi.hoisted(() => ({
  foreignStripAttrappe: { aktiv: false },
}));
vi.mock("@/lib/foreign-strip", async (importOriginal) => {
  const echt = await importOriginal<typeof import("@/lib/foreign-strip")>();
  return {
    ...echt,
    // DIE ATTRAPPE BILDET DEN FEHLERAUSGANG NACH, nicht irgendeinen Zustand: Text
    // UNVERAENDERT zurueck, `rest` ungleich 0. Genau das liefert die echte Funktion
    // nach einem Wurf waehrend des Entfernens.
    stripForeignGroup: (html: string, schluessel: string) =>
      foreignStripAttrappe.aktiv
        ? { html, rest: 1 }
        : echt.stripForeignGroup(html, schluessel),
  };
});

// Erst nach dem Mock importieren, damit der Mock greift.
// listProjectDomains kommt aus DEMSELBEN gemockten Modul (oben, vi.mock) — der
// Import liefert genau die dortige vi.fn()-Instanz und macht sie fuer die
// Aufruf-Zaehlung in Scheibe 10b-1 (T2) greifbar. KEIN neuer Mock.
import { addCustomDomain, listProjectDomains } from "@/app/projects/domain-actions";
import CodeImporter from "@/components/CodeImporter";
// Die Fixture der 11.11d-Laeufe wird vom ECHTEN Erzeuger gebaut, nicht nachgebaut —
// der Gegenstand jener Scheibe ist der WIEDER IMPORTIERTE EIGENE EXPORT.
import { generateFunctional } from "@/lib/generate";
// Der ANBIETER-NAME aus derselben Konstante, die die Ansicht liest. Der Test
// behauptet damit, dass der Name GERENDERT wird — nicht, wie er lautet.
import { TARGET_CARDS } from "@/lib/tracking/target-cards";
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
  // DER SCHALTER DER foreign-strip-ATTRAPPE GEHOERT HIERHER UND NICHT IN DEN LAUF, DER
  // IHN SETZT: `clearAllMocks` leert die AUFRUFE, nicht einen eigenen Zustand. Bliebe
  // er stehen, sähen alle folgenden Laeufe eine Funktion, die nichts entfernt.
  foreignStripAttrappe.aktiv = false;
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
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ capi: { trackingKey: "k1", tokenSet: true } }}
      />
    );
    openSettings();
    // Indikator sichtbar (der gruene Span, nicht der Placeholder).
    expect(await screen.findByText("Zugangsdaten hinterlegt")).toBeTruthy();
    // Der echte Token faehrt NIE in den Client -> das Passwortfeld ist leer.
    expect(tokenInput().value).toBe("");
    expect(tokenInput().type).toBe("password");
  });

  it("Projektwechsel reseedet den Indikator (kein Leak: 'gesetzt' von A bleibt nicht in B)", async () => {
    // P2 hat KEINEN CAPI-Token (settings ohne capi).
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
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
    expect(await screen.findByText("Zugangsdaten hinterlegt")).toBeTruthy();

    // Auf P2 wechseln -> Indikator verschwindet (P2 hat keinen Token).
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));

    await waitFor(() =>
      expect(screen.queryByText("Zugangsdaten hinterlegt")).toBeNull()
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
          capi: { tokenSet: true },
        }}
        // DER SCHLUESSEL IST MIT DER SCHEIBE "Der Schluessel kommt aus der Spalte"
        // AUS DEM BLOB IN EINE EIGENE PROP GEZOGEN — DERSELBE WERT, ANDERER KANAL.
        // Beide Laeufe dieses Blocks pruefen unveraendert dasselbe: dass NUR die
        // capiProxyUrl zwischen Publish und Export divergiert. Ohne den Schluessel
        // entstuende gar kein Beacon-Rumpf und beide haetten nichts zu vergleichen.
        initialTrackingKey="tk-1"
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

  it("CAPI-Token entfernen: 'Entfernen' sichtbar wenn tokenSet true", async () => {
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(await screen.findByRole("button", { name: "Meta entfernen" })).toBeTruthy();
  });

  it("CAPI-Token entfernen: 'Entfernen' NICHT im DOM wenn kein Token gesetzt", () => {
    render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
    openSettings();
    expect(screen.queryByRole("button", { name: "Meta entfernen" })).toBeNull();
  });

  it("CAPI-Token entfernen: Bestätigen ruft removeCapiToken(projectId) + spiegelt tokenSet:false ('••• gesetzt' verschwindet)", async () => {
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(await screen.findByText("Zugangsdaten hinterlegt")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Meta entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, Meta entfernen" }));

    await waitFor(() => expect(removeCapiToken).toHaveBeenCalledWith("proj-1", "meta"));
    await waitFor(() => expect(screen.queryByText("Zugangsdaten hinterlegt")).toBeNull());
  });

  it("CAPI-Token entfernen: Abbrechen -> kein removeCapiToken-Call", async () => {
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    fireEvent.click(await screen.findByRole("button", { name: "Meta entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Abbrechen" }));
    expect(removeCapiToken).not.toHaveBeenCalled();
  });

  it("Platzhalter bei gesetztem Token ist neutral ('Neuen Token eingeben zum Ersetzen'), nicht die '•••'-Variante", async () => {
    listConfiguredTargets.mockResolvedValueOnce(["meta"]);
    render(<CodeImporter initialProjectId="proj-1" initialSettings={withToken} />);
    openSettings();
    expect(
      await screen.findByPlaceholderText("Neuen Token eingeben zum Ersetzen"),
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

  // --- DIE KACHEL SAGT, WAS SIE MISST -------------------------------------------
  //
  // WAS DIESER TEST SCHUETZT: dass der gemessene ANBIETER in der Kachel BENANNT ist.
  // Der Zaehler entsteht aus einer Bestaetigung, die am Laden von Metas Script
  // haengt — die Zahl ist die Blockrate GENAU EINES Anbieters. Seit ein Projekt bis
  // zu drei Ziele traegt, klingt die Ueberschrift breiter, als die Zahl deckt.
  //
  // BEWUSST NICHT DER GANZE SATZ: Ein Test auf den vollen Wortlaut waere beim
  // naechsten Wortdreher rot, ohne dass sich etwas geaendert haette.
  //
  // DER ANKER IST DIE KACHEL, NICHT DAS DOKUMENT. "Meta" steht auch auf der
  // Zielkarte (Feld-Beschriftungen, Speichern-/Entfernen-Knoepfe) — eine Abfrage
  // ueber document.body ginge auch dann durch, wenn die Zeile fehlte. Der Test waere
  // trivial wahr.
  //
  // ZWEI ZUSTAENDE IN EINER DEFINITION, und das ist keine Bequemlichkeit: Die Zeile
  // steht AUSSERHALB der Verzweigung der Kachel. Ein Test allein im Zahlen-Zustand
  // fienge NICHT, wenn jemand sie in den Zahlen-Zweig hineinzoege — der
  // Neutral-Status verloere sie dann still. Und ein Kommentar, der beide Zustaende
  // behauptet, waere genau die Selbstbeschreibung, die weiter reicht als ihr Test.
  // GEMESSEN, NICHT BEHAUPTET: Eine Mutationsprobe, die die Zeile in den Zahlen-Zweig
  // verschiebt, laesst GENAU EINEN Fall fallen — den Neutral-Status. Er ist damit der
  // EINZIGE Waechter dieser Fehlerklasse und keine Verdopplung des anderen Falls.
  //
  // DER ZUSTANDS-MARKER WIRD ZUERST ABGEWARTET, sonst sind die zwei Faelle EINER:
  // Ueberschrift und Hinweiszeile stehen schon VOR dem Laden da, ein sofortiges
  // Nachsehen pruefte also beide Male denselben Vor-Lade-Render.
  const KACHEL_ZUSTAENDE: Array<[string, unknown, string | RegExp]> = [
    [
      "Neutral-Status",
      {
        total_server_conversions: 0,
        confirmed_conversions: 0,
        first_confirm_at: null,
      },
      "Warte auf erste Bestätigung.",
    ],
    [
      "Zahlen-Zustand",
      {
        total_server_conversions: 19,
        confirmed_conversions: 11,
        first_confirm_at: "2026-07-23T10:00:00.000Z",
      },
      /mindestens\s*42\s*%/,
    ],
  ];

  it.each(KACHEL_ZUSTAENDE)(
    "nennt den gemessenen Anbieter — %s",
    async (_zustand, loss, zustandsMarker) => {
      getAdblockLoss.mockResolvedValueOnce(loss);

      render(<CodeImporter initialProjectId="proj-1" initialSettings={{}} />);
      openSettings();

      await waitFor(() =>
        expect(screen.getByText(zustandsMarker)).toBeTruthy(),
      );

      const kachel = screen.getByText("Adblocker-Verlust").parentElement;
      expect(kachel?.textContent).toContain(TARGET_CARDS.meta.name);
    },
  );
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

  // T1/T2 — DIE ZWEI ABWESENHEITS-WAECHTER DER SCHEIBE 11.12a.
  //
  // Sie stehen bewusst NEBEN dem Marker-Test darueber und nicht in ihm: sie
  // pruefen verschiedene Gegenstaende (den Riegel und die Editor-Bruecke), und
  // ein Lauf, der bei einer Aenderung rot wird, soll benennen WELCHE Sache
  // gebrochen ist.
  //
  // Die Erwartungen sind GETIPPT, nicht importiert — DIE ERWARTUNGEN STAMMEN AUS
  // DER ENTSCHEIDUNG, NIE AUS DEM CODE. Ein importiertes
  // PREVIEW_STORAGE_SHIM_ID machte eine Umbenennung unsichtbar, statt sie zu
  // fangen.
  async function vorschauSrcdoc(): Promise<string> {
    fireEvent.click(screen.getByRole("button", { name: "Vorschau" }));
    const frame = await screen.findByTitle("functional-preview");
    return frame.getAttribute("srcdoc") ?? "";
  }

  it("T1 ARTEFAKT-RIEGEL: der Vorschau-Riegel landet NIE im Export- oder Publish-Dokument", async () => {
    // WIRD ROT, WENN der Riegel in buildDocumentFor, generateFunctional oder
    // editPreviewHtml wandert — also sobald die Bauart-Trennung aus Entscheidung
    // P11.12-2 durch eine Modus-Verzweigung ersetzt wird.
    //
    // ZWEI NADELN, NICHT EINE: die Kennung UND ein Textstueck des Riegels. Sonst
    // ueberlebte eine Mutation, die nur das id-Attribut wegnimmt.
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

    // POSITIVKONTROLLE ZUERST, IN BEIDEN RAHMEN — ohne sie prueften die
    // Abwesenheits-Zusicherungen unten nur, dass ein nie erzeugter String fehlt.
    const editDoc =
      (screen.getByTitle("preview") as HTMLIFrameElement).getAttribute("srcdoc") ?? "";
    expect(editDoc).toContain("__ps_sbx");
    expect(editDoc).toContain("sessionStorage");

    const vorschauDoc = await vorschauSrcdoc();
    expect(vorschauDoc).toContain("__ps_sbx");
    expect(vorschauDoc).toContain("sessionStorage");

    fireEvent.click(screen.getByRole("button", { name: "Editieren" }));

    // Export (Copy) — das Dokument, das der Kunde herunterlaedt.
    fireEvent.click(screen.getByRole("button", { name: /kopieren/i }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const exportDoc = (writeText.mock.calls[0] as unknown[])[0] as string;
    expect(exportDoc).not.toContain("__ps_sbx");
    expect(exportDoc).not.toContain("sessionStorage");

    // Publish — beide Varianten-Artefakte.
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));
    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    const call = publishProject.mock.calls[0] as unknown[];
    expect(call[1] as string).not.toContain("__ps_sbx");
    expect(call[1] as string).not.toContain("sessionStorage");
    const variantB = (call[3] as { functionalHtml: string }).functionalHtml;
    expect(variantB).not.toContain("__ps_sbx");
    expect(variantB).not.toContain("sessionStorage");
  });

  it("T2 ARTEFAKT-RIEGEL: die Editor-Bruecke landet NIE im Export- oder Publish-Dokument", async () => {
    // WIRD ROT, WENN der Export seine Quelle von debouncedCode auf previewHtml
    // umstellt. DIESE ABWESENHEIT WAR BIS ZUR SCHEIBE 11.12a DURCH KEINEN TEST
    // GEDECKT (docs/claude-history/phase-11.12-vorschau-blocker.md, VERMERK P11.12-1,
    // Teil D): sie ruhte allein
    // auf der Quellenwahl, also auf einem Nebeneffekt — und ein Nebeneffekt ist
    // kein Waechter (docs/immer-beachten.md, NUR EIN TEST IST EIN WAECHTER).
    //
    // ER IST EIN EINZELSTUECK: GEMESSEN (CC, 2026-09-17, Mutation "Export-Quelle
    // auf previewHtml") faengt ihn GENAU EIN Lauf im gesamten Bestand — dieser.
    // 1789 andere blieben gruen. Wer ihn als redundant entfernt, nimmt die
    // einzige Abdeckung dieser Fehlerklasse mit (docs/immer-beachten.md,
    // MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE, Lektion (f)).
    //
    // Geprueft werden MARKER-FRAGMENTE, nicht der Gesamttext von LISTENER_SCRIPT:
    // der traegt Interpolationen und ist im Ausgabetext DOMParser-normalisiert.
    // HIGHLIGHT_CLASS/HIGHLIGHT_STYLE sind in detect.ts bewusst NICHT exportiert,
    // und detect.ts bleibt unberuehrt — die Klasse ist hier also getippt.
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

    // POSITIVKONTROLLE im Editor-Rahmen.
    const editDoc =
      (screen.getByTitle("preview") as HTMLIFrameElement).getAttribute("srcdoc") ?? "";
    expect(editDoc).toContain("ELEMENT_CLICKED");
    expect(editDoc).toContain("IFRAME_READY");
    expect(editDoc).toContain("pagesmith-highlight");

    fireEvent.click(screen.getByRole("button", { name: /kopieren/i }));
    await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
    const exportDoc = (writeText.mock.calls[0] as unknown[])[0] as string;
    expect(exportDoc).not.toContain("ELEMENT_CLICKED");
    expect(exportDoc).not.toContain("IFRAME_READY");
    expect(exportDoc).not.toContain("pagesmith-highlight");

    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));
    await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
    const call = publishProject.mock.calls[0] as unknown[];
    for (const doc of [
      call[1] as string,
      (call[3] as { functionalHtml: string }).functionalHtml,
    ]) {
      expect(doc).not.toContain("ELEMENT_CLICKED");
      expect(doc).not.toContain("IFRAME_READY");
      expect(doc).not.toContain("pagesmith-highlight");
    }
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
      fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));

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

/**
 * Lauf-Abgrenzung (Phase 9 Scheibe 9c-2) — Sichtbarkeit, Beschriftung, Leer-Text,
 * Neustart-Hinweis. Geprueft wird, was die Sektion dem Nutzer ZUSAGT.
 */
describe("Lauf-Abgrenzung (Scheibe 9c-2)", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const START = "2026-07-29T10:00:00.000Z";
  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  const ROWS = [
    { event_type: "__ps_pageview", count_a: 4, count_b: 5, count_none: 0 },
    { event_type: "Purchase", count_a: 1, count_b: 2, count_none: 0 },
  ];

  // K4 FALL A — der Fall, der 9c-1 kippen wuerde: Lauf gestartet, noch KEINE Zeile.
  // Ohne den Zeitstempel-Term verschwaende die Sektion genau in dem Moment, in dem der
  // Owner nach dem Start auf sie schaut.
  it("K4-A: Zeitstempel gesetzt, NULL Zeilen -> Sektion sichtbar mit Leer-Text", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: [] } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestStartedAt={START}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    expect(document.body.textContent).toContain("Noch keine Daten in diesem Testlauf.");
    // P4: "leer" ist NICHT "nicht ladbar" — der Fehlertext darf hier nicht stehen.
    expect(document.body.textContent).not.toContain("konnte nicht geladen werden");
  });

  // K4 FALL B — der LEGACY-Fall: Lauf vor 9c-2, kein Zeitstempel, aber Daten.
  // MUTATIONSPROBE M4: den hasVariantData-Term streichen -> dieser Test wird rot.
  // Das ist die Regression gegen das live bewiesene 9c-1-Verhalten.
  it("K4-B: Alt-Lauf ohne Zeitstempel, aber mit Daten -> Sektion sichtbar", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialAbTestStartedAt={null}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    expect(document.body.textContent).toContain("A 1 von 4");
  });

  // K4 FALL C — nie ein Test: unveraendert unsichtbar (J3 aus 9c-1).
  it("K4-C: kein Zeitstempel, keine Daten -> KEINE Sektion", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() => expect(document.body.textContent).toContain("Statistik"));
    expect(screen.queryByText("Auswertung je Variante")).toBeNull();
  });

  // NACHSCHAERFUNG 4 — benanntes, nicht repariertes Verhalten: Variante B entfernt, der
  // Zeitstempel bleibt -> die Sektion zeigt weiter die Zahlen des vergangenen Laufs.
  // Richtig so: die Messung hat stattgefunden, die Zeilen sind echt.
  it("Variante B entfernt, Zeitstempel bleibt -> Sektion weiterhin sichtbar", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={null}
        initialVariantBMappings={null}
        initialAbTestStartedAt={START}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    // Kein Varianten-Umschalter, kein Test-Schalter — und trotzdem die Auswertung.
    expect(screen.queryByRole("button", { name: /Test starten|Test stoppen/ })).toBeNull();
  });

  // P3 — der NULL-Text: keine Zeitraum-Behauptung UND keine Behauptung ueber genau
  // EINEN Lauf. Ein Projekt kann vor 9c-2 mehrfach getestet haben.
  it("P3: ohne Zeitstempel behauptet die Beschriftung weder Zeitraum noch EINEN Lauf", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialAbTestStartedAt={null}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    const text = document.body.textContent ?? "";
    expect(text).toContain("Ohne Zeitabgrenzung");
    expect(text).toContain("mehreren Läufen");
    expect(text).not.toMatch(/seit Beginn|gesamter Zeitraum|seit Teststart/i);
  });

  it("Beschriftung MIT Zeitstempel nennt den Teststart", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: true, rows: ROWS } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialAbTestStartedAt={START}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByText("Auswertung je Variante");
    const text = document.body.textContent ?? "";
    expect(text).toContain("Zeitraum: seit Teststart am");
    expect(text).not.toContain("Ohne Zeitabgrenzung");
  });

  // K6 — der Neustart-Hinweis: sagt, dass die ANZEIGE neu beginnt, und behauptet
  // KEINEN Datenverlust. Sichtbar nur, wenn ein Klick tatsaechlich ueberschriebe.
  it("K6: Neustart-Hinweis erscheint bei gestopptem Lauf und behauptet keinen Verlust", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={false}
        initialAbTestStartedAt={START}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    const hinweis = await screen.findByText(/Ein erneuter Start beginnt die Auswertung neu/);
    // Die Zusage steht ausdruecklich da …
    expect(hinweis.textContent).toContain("Gelöscht wird dabei nichts");
    // … und es steht KEINE Verlust-Behauptung daneben. Die Wortliste zielt bewusst auf
    // BEHAUPTUNGEN, nicht auf das Wort "gelöscht" selbst: das kommt in der VERNEINUNG
    // legitim vor ("Gelöscht wird dabei nichts"), und ein naives Verbot des Wortes
    // schluege genau bei der richtigen Formulierung an.
    expect(hinweis.textContent).not.toMatch(/verloren|unwiderruflich|endgültig/i);
  });

  // REFETCH NACH DEM TOGGLE (9c-2). Der Lade-Effect haengt an [projectId], und die
  // aendert sich beim Starten NICHT — ohne Tick stuende die neue Beschriftung ueber den
  // ALTEN Zahlen. Geprueft wird die Wirkung (zweiter Aufruf), nicht der Mechanismus.
  // PFLICHT-MUTATION M7: den Refetch-Punkt aus dem Handler entfernen -> rot.
  it("M7: erfolgreicher Toggle holt die Zaehlwerte NEU", async () => {
    setAbTestActive.mockResolvedValueOnce({
      ok: true,
      abTestActive: true,
      abTestStartedAt: START,
    } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={false}
        initialAbTestStartedAt={null}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await waitFor(() => expect(getVariantCounts).toHaveBeenCalledTimes(1));
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));

    // Zweiter Aufruf mit derselben projectId — der Effect ist ueber den Tick gelaufen.
    await waitFor(() => expect(getVariantCounts).toHaveBeenCalledTimes(2));
    expect(getVariantCounts).toHaveBeenLastCalledWith("proj-1");
  });

  // K2 auf der CLIENT-Seite: der Stopp liefert KEIN Feld -> der bekannte Zeitstempel
  // bleibt stehen. MUTATIONSKANDIDAT (kein Pflichtlauf): im Handler
  // "setAbTestStartedAt(result.abTestStartedAt ?? null)" schreiben -> die Beschriftung
  // kippte auf "Ohne Zeitabgrenzung", obwohl die DB den Wert behalten hat.
  it("STOPP wischt den client-seitigen Zeitstempel NICHT weg", async () => {
    setAbTestActive.mockResolvedValueOnce({
      ok: true,
      abTestActive: false,
    } as never);
    getVariantCounts.mockResolvedValue({ ok: true, rows: ROWS } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={true}
        initialAbTestStartedAt={START}
      />,
    );
    await screen.findByText("Titel");
    openSettings();
    await screen.findByText(/Zeitraum: seit Teststart am/);

    fireEvent.click(screen.getByRole("button", { name: "Test stoppen" }));

    await screen.findByRole("button", { name: "Test starten" });
    // Die Beschriftung steht unveraendert — und der NULL-Text taucht NICHT auf.
    expect(document.body.textContent).toContain("Zeitraum: seit Teststart am");
    expect(document.body.textContent).not.toContain("Ohne Zeitabgrenzung");
  });

  it("K6-Gegenprobe: ohne protokollierten Lauf steht KEIN Neustart-Hinweis", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
        initialAbTestActive={false}
        initialAbTestStartedAt={null}
      />,
    );
    await screen.findByText("Titel");
    openSettings();

    await screen.findByRole("button", { name: "Test starten" });
    expect(screen.queryByText(/Ein erneuter Start beginnt/)).toBeNull();
  });
});

/*
 * Phase 10 Scheibe 10a-1 — der Bereich MESSEN ist in MeasureView extrahiert und steht
 * im Einstellungs-Panel als BLOCK: Tracking-Pixel, Statistik, Auswertung je Variante
 * unmittelbar hintereinander, ohne dass ein VEROEFFENTLICHEN-Abschnitt dazwischenfaellt.
 * Das ist die EINZIGE beabsichtigte Verhaltensdifferenz der Scheibe (I6) und deshalb
 * das Einzige, was hier neu geprueft wird — alles Uebrige ist Regression und wird von
 * den Bestandstests getragen.
 *
 * BEWUSST compareDocumentPosition UND NICHT textContent.indexOf: ein Index im
 * zusammengefassten Text haengt am ersten zufaelligen Teilstring-Treffer und bliebe
 * z.B. am Wort "Veröffentlichen" im Publish-BUTTON haengen statt an der Ueberschrift —
 * der Test wuerde dann etwas anderes messen, als er behauptet.
 */
describe("Phase 10 Scheibe 10a-1: MESSEN steht als Block im Einstellungs-Panel", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  // Folgt b dem Element a in der Dokumentreihenfolge?
  const follows = (a: Element, b: Element) =>
    Boolean(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING);

  it("Tracking-Pixel -> Statistik -> Auswertung, und KEIN Veroeffentlichen-Abschnitt dazwischen", async () => {
    getVariantCounts.mockResolvedValueOnce({
      ok: true,
      rows: [
        { event_type: "__ps_pageview", count_a: 40, count_b: 38, count_none: 0 },
        { event_type: "Purchase", count_a: 2, count_b: 5, count_none: 0 },
      ],
    } as never);
    // Variante B vorhanden -> der Abschnitt "Variante B" existiert und ist damit ein
    // zweiter VEROEFFENTLICHEN-Abschnitt, der dazwischenfallen KOENNTE.
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
    await screen.findByText("Auswertung je Variante");

    const heading = (name: string) => screen.getByRole("heading", { name });
    const tracking = heading("Tracking-Pixel");
    const statistik = heading("Statistik");
    const auswertung = heading("Auswertung je Variante");
    const publish = heading("Veröffentlichen");
    const varianteB = heading("Variante B");

    // Der MESSEN-Block in sich.
    expect(follows(tracking, statistik)).toBe(true);
    expect(follows(statistik, auswertung)).toBe(true);
    // BEIDE VEROEFFENTLICHEN-Abschnitte liegen DAHINTER, nicht dazwischen.
    expect(follows(auswertung, publish)).toBe(true);
    expect(follows(auswertung, varianteB)).toBe(true);
  });
});

/*
 * Phase 10 Scheibe 10b-1 — das Einstellungs-Panel ist ein Drawer mit zwei Reitern
 * (Messen / Live). Geprueft wird die TRAGENDE Eigenschaft der Scheibe: innerhalb
 * der Flaeche wird VERSTECKT, nicht ausgehaengt (I1) — und der Reiterwechsel kostet
 * deshalb keinen Server-Aufruf (Entscheidung 2).
 *
 * WAS HIER NICHT GEPRUEFT WERDEN KANN, ausdruecklich: Die SICHTBARKEIT. In Stufe 1
 * gemessen — die Vitest-Umgebung laedt kein Stylesheet, `display` einer
 * `.hidden`-Klasse ist in jsdom `block` wie ohne Klasse. Kein Test in dieser Datei
 * darf deshalb behaupten, ein Bereich sei unsichtbar. Optik, Position, Scroll und
 * Verdraengung sind ausschliesslich Live-Test-Achsen.
 *
 * Die Reiter werden ueber VERANKERTE Rollen-Abfragen adressiert
 * (getByRole("button", { name: /^Messen$/ })). Das ist nicht nur Zukunftsschutz:
 * DomainManager rendert bereits heute ein Status-Badge mit dem Text "Live" — eine
 * Text-Abfrage waere dort mehrdeutig, sobald eine Domain verbunden ist.
 */
describe("Phase 10 Scheibe 10b-1: Drawer mit Reitern (Messen / Live)", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const openDrawer = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  const tab = (name: RegExp) => screen.getByRole("button", { name });

  it("T1: nach einem Reiterwechsel stehen BEIDE Bereiche weiterhin im DOM", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openDrawer();

    // Startbereich ist "Messen" — trotzdem ist der Live-Bereich gemountet.
    expect(screen.getByRole("heading", { name: "Tracking-Pixel" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Veröffentlichen" })).toBeTruthy();

    fireEvent.click(tab(/^Live$/));

    // Und nach dem Wechsel ist der Messen-Bereich NICHT verschwunden.
    expect(screen.getByRole("heading", { name: "Tracking-Pixel" })).toBeTruthy();
    expect(screen.getByRole("heading", { name: "Veröffentlichen" })).toBeTruthy();
  });

  it("T2: ein Reiterwechsel erzeugt KEINEN zusaetzlichen Server-Aufruf", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openDrawer();

    // Der Drawer-Mount laedt die Domain-Liste — genau wie das Panel vorher.
    await waitFor(() =>
      expect(vi.mocked(listProjectDomains).mock.calls.length).toBeGreaterThan(0),
    );
    const nachOeffnen = vi.mocked(listProjectDomains).mock.calls.length;

    fireEvent.click(tab(/^Live$/));
    fireEvent.click(tab(/^Messen$/));
    fireEvent.click(tab(/^Live$/));

    // Haengte der Wechsel einen Bereich aus, mountete DomainManager neu und der
    // Zaehler stiege. Er darf sich nicht bewegen.
    expect(vi.mocked(listProjectDomains).mock.calls.length).toBe(nachOeffnen);
  });

  it("T3 (STRUKTUR, KEINE Sichtbarkeit): die Huelle des inaktiven Bereichs traegt die Versteck-Klasse, die des aktiven nicht — und nach dem Wechsel umgekehrt", async () => {
    // EHRLICHE BENENNUNG, PFLICHT: Dies ist eine STRUKTUR-Zusicherung. Sie belegt,
    // dass die Bedingung am richtigen Bereich haengt — NICHT, dass irgendetwas
    // unsichtbar ist. jsdom wertet die Klasse nicht aus (s. Kopfkommentar). Ohne
    // diesen Test liefe der Fehler "Bedingung falsch, beide Bereiche sichtbar"
    // durch alle uebrigen Tests gruen hindurch, weil T1 nur DOM-Praesenz prueft.
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openDrawer();

    // Die Huellen sind die beiden direkten Kinder des Drawers. MeasureView gibt ein
    // Fragment zurueck -> "Tracking-Pixel" ist DIREKTES Kind seiner Huelle.
    // PublishView ebenso, seine erste Ueberschrift steckt aber noch im
    // Abschnitts-div -> eine Ebene weiter hoch.
    const messenHuelle = () =>
      screen.getByRole("heading", { name: "Tracking-Pixel" })
        .parentElement as HTMLElement;
    const liveHuelle = () =>
      screen.getByRole("heading", { name: "Veröffentlichen" }).parentElement
        ?.parentElement as HTMLElement;

    // Startzustand: Messen aktiv -> Messen-Huelle ohne "hidden", Live-Huelle mit.
    expect(messenHuelle().className).not.toContain("hidden");
    expect(liveHuelle().className).toContain("hidden");

    fireEvent.click(tab(/^Live$/));

    // Nach dem Wechsel exakt umgekehrt.
    expect(messenHuelle().className).toContain("hidden");
    expect(liveHuelle().className).not.toContain("hidden");
  });
});

/*
 * Phase 10 Scheibe 10b-2 — Mount-Disziplin DomainManager: key={projectId} an der
 * Aufrufstelle (PublishView) macht den PROJEKTWECHSEL zur Mount-Grenze.
 * DEKLARIERTE VERHALTENSAENDERUNG, I6 deckt sie nicht.
 *
 * WARUM NICHT UEBER DIE AUFRUFZAHL DES MOCKS GEPRUEFT — der naheliegende und hier
 * HOHLE Weg: Lade- und Poll-Effect in DomainManager haengen ohnehin an [projectId].
 * Bei p1 -> p2 laeuft der Lade-Effect also mit und ohne key genau einmal, bei
 * p1 -> null in beiden Faellen gar nicht (frueher return bei !projectId). Ein Test
 * auf listProjectDomains.mock.calls.length waere in BEIDEN Welten gruen und wuerde
 * nichts messen. Diskriminierend ist allein der beobachtbare ZUSTAND: der Wert im
 * Eingabefeld, der Text der Add-Fehlermeldung und die Anwesenheit der veralteten
 * Domain-Zeile.
 *
 * BEIDE TESTS PRUEFEN DOM-PRAESENZ, NICHT SICHTBARKEIT (jsdom wertet die
 * Versteck-Klasse nicht aus, s. Kopf des 10b-1-Blocks darueber). Der Drawer bleibt
 * ueber den Projektwechsel offen: weder resetToEmpty noch applyZenForLoadedCode
 * fasst isSettingsOpen oder drawerArea an — ohne diese Eigenschaft waere hier
 * nichts pruefbar, weil DomainManager sonst ohnehin unmountete.
 */
describe("Phase 10 Scheibe 10b-2: der Projektwechsel ist eine Mount-Grenze fuer DomainManager", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const openDrawer = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  const openProjectMenu = () =>
    fireEvent.click(screen.getByRole("button", { name: /^Projekte/ }));

  it("A: Wechsel auf '+ Neues Projekt' -> die Domain-Zeile des VORIGEN Projekts ist weg (nicht nur unsichtbar)", async () => {
    // Der beobachtete Fall (Backlog, Teilbefund (d)/(d2)): ohne key laeuft der
    // Lade-Effect wegen !projectId gar nicht, und die Liste rendert unbedingt
    // weiter -> die Zeile des Vorprojekts bleibt stehen, samt destruktivem
    // "Entfernen"-Knopf, unter dem Namen des neuen, leeren Projekts.
    vi.mocked(listProjectDomains).mockResolvedValueOnce({
      ok: true,
      domains: [
        {
          label: "kunde-de-abc",
          host: "kunde.de",
          verificationStatus: "pending",
          syncedAt: null,
        },
      ],
    });

    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={HTML}
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Titel");
    openDrawer();

    // VORBEDINGUNG: die Zeile ist wirklich da — sonst prueft der Test unten nichts.
    expect(await screen.findByText("kunde.de")).toBeTruthy();
    expect(screen.getByRole("button", { name: "Entfernen" })).toBeTruthy();

    openProjectMenu();
    fireEvent.click(screen.getByRole("button", { name: "+ Neues Projekt" }));

    // Ohne key stuende hier weiterhin die Zeile des Vorprojekts.
    expect(screen.queryByText("kunde.de")).toBeNull();
    expect(screen.queryByRole("button", { name: "Entfernen" })).toBeNull();
  });

  it("B: Wechsel auf ein anderes gespeichertes Projekt -> Eingabe UND Add-Fehlermeldung sind weg", async () => {
    // Die literale Reproduktion aus dem Backlog: in Projekt A eine bereits
    // verknuepfte Domain eintippen, die rote Meldung provozieren, Projekt wechseln.
    vi.mocked(addCustomDomain).mockResolvedValueOnce({
      ok: false,
      error: "Domain ist bereits verknuepft.",
      reason: "conflict_other_account",
    });
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: HTML,
      mappings: [],
      settings: {},
    });

    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={HTML}
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-02T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-01T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Titel");
    openDrawer();

    const feld = () =>
      screen.getByPlaceholderText(/meine-domain/i) as HTMLInputElement;
    fireEvent.change(feld(), { target: { value: "kunde.de" } });
    fireEvent.click(screen.getByRole("button", { name: "Domain hinzufügen" }));

    // VORBEDINGUNG: beide Zustaende sind wirklich gesetzt. Die Eingabe bleibt nach
    // einem FEHLGESCHLAGENEN Hinzufuegen bewusst stehen (geleert wird sie nur im
    // Erfolgsfall) — genau deshalb ueberlebte sie ohne key den Wechsel.
    expect(await screen.findByText(/bereits verknuepft/)).toBeTruthy();
    expect(feld().value).toBe("kunde.de");

    openProjectMenu();
    fireEvent.click(await screen.findByText("P2"));

    await waitFor(() =>
      expect(screen.queryByText(/bereits verknuepft/)).toBeNull(),
    );
    // Neu abgefragt: nach dem Remount ist es ein anderes DOM-Element.
    expect(feld().value).toBe("");
  });

  it("C: erstes Speichern eines neuen Projekts (null -> echte ID) laedt die Domain-Liste GENAU EINMAL, mit der NEUEN id", async () => {
    // Deckt den Uebergang null -> echte ID ab, den KEIN anderer Test prueft: das ist
    // die Stelle, an der key={projectId} erstmals vom konstanten "null" wechselt
    // (React koerziert null zum String-Key "null").
    // ER PRUEFT DAS ARGUMENT, NICHT NUR DIE ZAHL: ein DomainManager, der beim
    // Uebergang mit dem ALTEN Wert (null) oder gar nicht laedt, faellt hier auf,
    // waehrend eine reine Aufrufzaehlung ihn durchliesse.
    // WAS ER NICHT PRUEFT — gemessen, nicht angenommen (Mutation N1, 2026-08-01):
    // Wird key={projectId} entfernt, bleibt DIESER Test GRUEN. Er sichert also NICHT
    // die Mount-Grenze, sondern die DEPS-KETTE: dass der Uebergang ueberhaupt einen
    // Load mit der NEUEN id ausloest. Die Mount-Grenze sichern allein A und B (beide
    // werden von N1 rot). Wer diesen Test als "Key-Waechter" liest, ueberschaetzt ihn.
    // Rot wird er, wenn der fruehe Return im Lade-Effect faellt (Mutation N2: dann
    // laedt schon der Null-Zustand, und die Vorbedingung unten kippt).
    render(<CodeImporter initialCode={HTML} />);
    await screen.findByText("Titel");
    openDrawer();

    // VORBEDINGUNG: ohne Projekt wird NICHTS geladen (frueher Return im
    // Lade-Effect). Ohne sie koennte die Zahl unten von einem frueheren Lauf stammen.
    expect(vi.mocked(listProjectDomains).mock.calls.length).toBe(0);

    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });

    await waitFor(() =>
      expect(vi.mocked(listProjectDomains).mock.calls.length).toBe(1),
    );
    // Die id aus dem saveProject-Bestandsmock — NICHT null, NICHT doppelt.
    expect(vi.mocked(listProjectDomains)).toHaveBeenCalledWith("test-id");
  });
});

/*
 * Phase 10 Scheibe 10c-1 — Zustandssignal an der Reiterzeile (Invariante I3: "Die
 * Trennung darf keinen Zustand verstecken"). Genau EIN signalfaehiger Zustand: die
 * Varianten-Auswertung im Bereich MESSEN konnte nicht geladen werden.
 *
 * DIE WICHTIGERE HAELFTE IST DIE ABWESENHEIT. Ein Signal, das immer leuchtet, ist der
 * Fehlerfall dieser Scheibe — dann ist es wertlos und erzeugt Signal-Ermuedung.
 * Deshalb pruefen ZWEI der vier Tests, dass es AUS bleibt, und nur einer, dass es an
 * geht.
 *
 * T2 IST ZUGLEICH DER WAECHTER FUER EIN BEWUSSTES DUPLIKAT: die Bedingung des Signals
 * (CodeImporter.tsx, const measureSignal) bildet nach, wann MeasureView den Fehlertext
 * ueberhaupt rendert (dort showVariantCounts). Beide Stellen tragen einen Kommentar,
 * der auf die jeweils andere verweist; wer nur eine aendert, wird HIER rot.
 *
 * ANKER IST DAS title-ATTRIBUT (queryByTitle) — bestehendes Idiom dieser Datei
 * ("preview", "Verknuepft: track"). KEINE Klassen-Abfrage: jsdom wertet Klassen nicht
 * aus, ein Test darauf behauptete Sichtbarkeit, die er nicht pruefen kann.
 */
describe("Phase 10 Scheibe 10c-1: Zustandssignal an der Reiterzeile", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const SIGNAL_TITLE =
    "Die Auswertung je Variante konnte nicht geladen werden — bitte die Seite neu laden.";
  const openDrawer = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  const signal = () => screen.queryByTitle(SIGNAL_TITLE);

  it("T1: Normalbetrieb (Auswertung laedt) -> KEIN Signal", async () => {
    // Bestands-Default des Mocks ist {ok:true, rows:[]}.
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    openDrawer();

    // Erst abwarten, dass der Lade-Effekt DURCH ist — sonst pruefte der Test nur,
    // dass das Signal vor dem Laden noch nicht da ist, und waere hohl.
    await waitFor(() => expect(vi.mocked(getVariantCounts)).toHaveBeenCalled());
    expect(signal()).toBeNull();
  });

  it("T2: Ladefehler, aber die Sektion wuerde gar nichts anzeigen -> KEIN Signal", async () => {
    // {ok:false} bei einem Projekt OHNE Variante B und OHNE protokollierten
    // Teststart: MeasureView rendert den Fehlertext dann nicht (showVariantCounts
    // ist falsch). Ein Signal zeigte hier auf einen Bereich, in dem nichts steht —
    // genau der Fall, den das Kriterium "nur wenn der Nutzer JETZT handeln kann"
    // ausschliesst.
    getVariantCounts.mockResolvedValueOnce({ ok: false } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    openDrawer();

    await waitFor(() => expect(vi.mocked(getVariantCounts)).toHaveBeenCalled());
    expect(signal()).toBeNull();
    // GEGENPROBE zur Voraussetzung: der Fehlertext steht wirklich nirgends.
    expect(document.body.textContent).not.toContain(
      "Die Auswertung konnte nicht geladen werden",
    );
  });

  it("T3: Ladefehler bei einem Projekt mit Variante B -> Signal, auch im INAKTIVEN Reiter", async () => {
    getVariantCounts.mockResolvedValueOnce({ ok: false } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    openDrawer();

    // Der Fehler sitzt in MESSEN; wir schauen auf LIVE. Genau dafuer gibt es das
    // Signal: der Bereich ist versteckt, der Zustand bleibt.
    fireEvent.click(screen.getByRole("button", { name: /^Live$/ }));
    expect(await screen.findByTitle(SIGNAL_TITLE)).toBeTruthy();
  });

  it("T4: bei leuchtendem Signal bleiben die zugaenglichen Namen der Reiter unveraendert", async () => {
    // WAECHTER gegen die verworfene Form (Text IM Button oder aria-label): beides
    // aenderte den zugaenglichen Namen und braeche die fuenf verankerten
    // Reiter-Abfragen der Bestandstests.
    getVariantCounts.mockResolvedValueOnce({ ok: false } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    openDrawer();
    await screen.findByTitle(SIGNAL_TITLE);

    expect(screen.getByRole("button", { name: /^Messen$/ })).toBeTruthy();
    expect(screen.getByRole("button", { name: /^Live$/ })).toBeTruthy();
  });
});

/*
 * Phase 10 Scheibe 10c-2 — DER STATUSKANAL DES DRAWERS ENDET MIT DER SITZUNG.
 * DEKLARIERTE VERHALTENSAENDERUNG, I6 deckt sie nicht.
 *
 * ZWEI ACHSEN, BEIDE GLEICH WICHTIG: (i) der Kanal ueberlebt den REITERWECHSEL —
 * Messen und Live sind DIESELBE Sitzung; (ii) er ist nach Schliessen und erneutem
 * Oeffnen weg. Ein Test nur fuer (ii) liesse einen Reset an drawerArea unbemerkt
 * durch, und der waere die naheliegendste Fehlimplementierung.
 *
 * Der Reset laeuft beim OEFFNEN, nicht beim Schliessen (Nachzuegler-Loch, s.
 * Kommentar an resetDrawerStatusChannel). Fuer die Tests heisst das: nach dem
 * Schliessen ist der Text ohnehin aus dem DOM (die Flaeche ist abgebaut) — die
 * Aussage steckt AUSSCHLIESSLICH in der Pruefung NACH dem erneuten Oeffnen.
 *
 * T4 und T5 sind Wächter gegen ZU VIEL: T4 gegen einen Uebergriff in die Zone
 * BAUEN, T5 gegen das nachtraegliche Aufnehmen des Varianten-Kanals (Entscheidung
 * O1 — dieser Kanal ist strukturell nicht Teil der Drawer-Sitzung).
 */
describe("Phase 10 Scheibe 10c-2: der Statuskanal des Drawers endet mit der Sitzung", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;
  const toggleDrawer = () =>
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  const tab = (name: RegExp) =>
    fireEvent.click(screen.getByRole("button", { name }));

  async function publishFehlschlag() {
    publishProject.mockResolvedValueOnce({
      ok: false as const,
      error: "Publish kaputt.",
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    toggleDrawer();
    fireEvent.click(screen.getByRole("button", { name: "Veröffentlichen" }));
    // VORBEDINGUNG: der Fehler steht wirklich da — sonst prueft der Test nichts.
    expect(await screen.findByText("Publish kaputt.")).toBeTruthy();
  }

  it("T1 (Achse i): der Fehler UEBERLEBT den Reiterwechsel — Messen und Live sind dieselbe Sitzung", async () => {
    await publishFehlschlag();

    tab(/^Messen$/);
    tab(/^Live$/);
    tab(/^Messen$/);

    // Haengte der Reset an drawerArea, waere der Text hier weg.
    expect(screen.queryByText("Publish kaputt.")).toBeTruthy();
  });

  it("T2 (Achse ii): nach Schliessen und erneutem Oeffnen ist er weg", async () => {
    await publishFehlschlag();

    toggleDrawer(); // schliessen
    toggleDrawer(); // wieder oeffnen — HIER laeuft der Reset

    // Der Drawer ist offen (der Publish-Knopf ist wieder da), aber ohne Meldung.
    expect(screen.getByRole("button", { name: "Veröffentlichen" })).toBeTruthy();
    expect(screen.queryByText("Publish kaputt.")).toBeNull();
  });

  it("T3 (zweiter Kanal): auch der CAPI-Fehler ist nach dem erneuten Oeffnen weg", async () => {
    // Nicht nur ein Kanal traegt die Scheibe: ein Reset, der publish leert und capi
    // vergisst, laeuft sonst durch.
    setCapiToken.mockResolvedValueOnce({
      ok: false as const,
      error: "Token abgelehnt.",
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    toggleDrawer();
    fireEvent.change(screen.getByPlaceholderText(/CAPI-Token einfügen/), {
      target: { value: "geheim" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));
    expect(await screen.findByText("Token abgelehnt.")).toBeTruthy();

    toggleDrawer();
    toggleDrawer();

    expect(screen.queryByText("Token abgelehnt.")).toBeNull();
  });

  it("T4 (Waechter gegen Uebergriff): ein Fehler AUSSERHALB des Drawers ueberlebt", async () => {
    // saveError gehoert der Zone BAUEN und wird in der Workspace-Kopfzeile
    // angezeigt. Ein zu breiter Reset (z.B. applyZenForLoadedCode wiederverwendet)
    // loeschte ihn mit.
    saveProject.mockResolvedValueOnce({
      ok: false as const,
      error: "Speichern kaputt.",
    } as never);
    render(<CodeImporter initialProjectId="proj-1" initialCode={HTML} />);
    await screen.findByText("Titel");
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    expect(await screen.findByText("Speichern kaputt.")).toBeTruthy();

    toggleDrawer();
    toggleDrawer();

    expect(screen.queryByText("Speichern kaputt.")).toBeTruthy();
  });

  it("T5 (Waechter fuer O1): ein Varianten-Fehler UEBERLEBT Schliessen und Oeffnen", async () => {
    // BEWUSST ausgenommen: einer der drei Ausloeser dieses Kanals ("+ Variante B")
    // sitzt in der Toolbar und ist bei GESCHLOSSENEM Drawer klickbar — der Kanal ist
    // strukturell nicht Teil der Drawer-Sitzung. Ohne diesen Test koennte ihn jemand
    // spaeter "der Vollstaendigkeit halber" mit aufnehmen.
    setAbTestActive.mockResolvedValueOnce({
      ok: false as const,
      error: "Riegel greift.",
    } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={HTML}
        initialVariantBHtml={HTML}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Titel");
    toggleDrawer();
    tab(/^Live$/);
    fireEvent.click(screen.getByRole("button", { name: "Test starten" }));
    expect(await screen.findByText("Riegel greift.")).toBeTruthy();

    toggleDrawer();
    toggleDrawer();

    expect(screen.queryByText("Riegel greift.")).toBeTruthy();
  });
});

// ===========================================================================
// PHASE 11, SCHEIBE D1 — DER WAECHTER UEBER DAS CONSENT-MEMO
//
// GEGENSTAND: die ABLEITUNG vom Einstellungs-Stand zum Consent-Schluesselsatz —
// das Memo consentTargets in CodeImporter.tsx. Es filtert TRACKING_TARGETS auf
// eine gesetzte Kennung und bildet ueber CONSENT_KEY_BY_TARGET ab; der Erzeuger
// schreibt das Ergebnis an ZWEI Stellen in den ausgelieferten Text — in die
// Ziehung (__psConsentAll) und in das Draht-Feld des Beacons (cns), beide in
// tracking/meta.ts.
//
// DER GEMESSENE ANLASS (2026-08-13, formale Suche ueber diese Datei): "consentTargets",
// "__psConsentAll" und "cns" hatten hier NULL Treffer. Deckung bestand
// AUSSCHLIESSLICH in lib/generate.test.ts — und dort wird die Liste VON HAND
// uebergeben. Die Engine war damit gedeckt, die ABLEITUNG nicht: Ein Fehler im Memo
// haette jede neu publizierte Seite Ziele verlieren lassen, ohne dass ein Test rot
// wird.
//
// WARUM DURCH DIE KOMPONENTE UND NICHT UEBER generateFunctional — der Grund ist der
// Prueflings-Wechsel: Ein Aufruf des Erzeugers mit einer selbst gebauten Liste
// beweist die ENGINE. Pruefling ist hier aber das MEMO, und das laeuft nur, wenn die
// Komponente laeuft. Genau diese Verwechslung ist der Grund, warum die Achse trotz
// vorhandener Engine-Tests ungedeckt war.
//
// WARUM DIESE ACHSE EINEN EIGENEN WAECHTER RECHTFERTIGT: Der Schluessel ist eine
// EINBAHNSTRASSE. Ein publizierter Text traegt ihn, ein Code-Deploy erreicht ihn
// nicht — und ein fehlender Schluessel heisst beim Leser fail-closed "nicht erlaubt"
// (consentAllows in tracking/consent-wire.ts). Ein Fehler hier ist auf keinem Kanal
// sichtbar und durch kein Deploy heilbar.
//
// ABFRAGE-DISZIPLIN: KEINE unqualifizierte Textsuche und KEINE Zaehlung. Bei drei
// Zielen steht derselbe Schluessel MEHRFACH im Dokument (einmal in der Ziehung,
// einmal im Draht) — eine Suche nach "meta" oder ein Zaehlen von Treffern waere in
// beide Richtungen blind. Die beiden Leser unten ziehen die Schluessel ANKERND
// heraus und vergleichen die FOLGE mit toEqual.
// ===========================================================================
describe("CodeImporter — Scheibe D1: das Consent-Memo, durch die Komponente bewacht", () => {
  type D1Settings = NonNullable<Parameters<typeof CodeImporter>[0]["initialSettings"]>;

  const D1_HTML =
    '<!DOCTYPE html><html><head></head><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>';
  const D1_MAPPINGS = [
    { elementId: "ps-aaaaaa", type: "track" as const, config: { event: "Lead" } },
  ];
  // OHNE trackingKey entsteht KEIN Beacon-Rumpf und damit kein Draht-Feld. Dass die
  // Beobachtbarkeit daran haengt und NICHT am Memo, ist die Aussage von D-T8.
  //
  // DER SCHLUESSEL IST MIT DER SCHEIBE "Der Schluessel kommt aus der Spalte" AUS DEM
  // BLOB IN EINE EIGENE PROP GEZOGEN — DERSELBE WERT, ANDERER KANAL. Der Erzeuger
  // liest ihn seither aus projects.tracking_key statt aus settings.capi.trackingKey;
  // eine Fixture, die ihn weiter im Blob truege, pruefte einen Kanal, den das
  // Produkt nicht mehr benutzt. D1_TK behaelt tokenSet, weil das eine ANDERE Achse
  // ist und diese Scheibe sie nicht anfasst (Vorrat 55).
  const D1_KEY = "tk-d1";
  const D1_TK = { tokenSet: true };

  const ORIGINAL_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  beforeEach(() => {
    // Der Export-Pfad bildet seine Proxy-URL aus dieser Variablen. Fehlt sie, faellt
    // buildCapiBeaconStatement in den fail-loud-Zweig und der Draht entfaellt — dann
    // pruefte die Haelfte "verdrahtete Schluessel" nichts.
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pagesmith.io";
  });
  afterEach(() => {
    if (ORIGINAL_APP_URL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
    else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL_APP_URL;
  });

  // DIE GEZOGENEN Schluessel: das Argument des __psConsentAll-AUFRUFS.
  // ANKER IST DIE OEFFNENDE KLAMMER DIREKT AM NAMEN — die DEFINITION der Funktion
  // lautet "window.__psConsentAll = function (ts)" und traegt diese Form NICHT.
  // Sie steht auf JEDER Seite mit Wiring; ohne diesen Anker meldete der Leser auch
  // dort einen Treffer, wo gar kein Aufruf erzeugt wurde. null = kein Aufruf.
  function gezogeneSchluessel(doc: string): string[] | null {
    const m = doc.match(/__psConsentAll\((\[[^\]]*\])\)/);
    return m ? (JSON.parse(m[1]) as string[]) : null;
  }

  // DIE VERDRAHTETEN Schluessel: die Feldnamen im cns-Objekt des Beacon-Rumpfes.
  // Anker ist der Feldname selbst, nicht ein Ziel-Wort — der Ausschnitt endet an der
  // ersten schliessenden Klammer, das Objekt enthaelt keine geschachtelte. null =
  // kein Draht-Feld.
  function verdrahteteSchluessel(doc: string): string[] | null {
    const m = doc.match(/"cns": \{([^}]*)\}/);
    if (!m) return null;
    return Array.from(m[1].matchAll(/"([^"]+)":/g)).map((t) => t[1]);
  }

  // Das EXPORT-Dokument, so wie der Kunde es herunterlaedt — abgefangen an der
  // Zwischenablage, dieselbe Bauform wie im Artefakt-Riegel der Scheibe 9a.
  // DER SCHLUESSEL IST EIN EIGENER PARAMETER MIT VORGABE, und die Vorgabe ist der
  // BELEGTE Fall: die uebrigen Laeufe brauchen ihn, damit ihre Zusicherungen ueber
  // den Draht ueberhaupt etwas sehen koennen. NUR D-T8 uebergibt "" — und dass er es
  // SICHTBAR tut, ist genau seine Aussage.
  async function exportDokument(
    settings: D1Settings,
    trackingKey: string = D1_KEY,
  ): Promise<string> {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      render(
        <CodeImporter
          initialProjectId="p-d1"
          initialCode={D1_HTML}
          initialMappings={D1_MAPPINGS}
          initialSettings={settings}
          initialTrackingKey={trackingKey}
        />,
      );
      // Die Detection abwarten: der Export liest debouncedCode, nicht code.
      await screen.findByText("Kaufen");
      fireEvent.click(
        screen.getByRole("button", { name: "In Zwischenablage kopieren" }),
      );
      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      return (writeText.mock.calls[0] as unknown[])[0] as string;
    } finally {
      delete (navigator as { clipboard?: unknown }).clipboard;
    }
  }

  it("D-T1: alle drei Kennungen -> beide Stellen tragen alle drei Schluessel", async () => {
    // WIRD ROT, WENN das Memo ein Ziel auslaesst, ein Ziel erfindet oder die
    // Abbildung ueber CONSENT_KEY_BY_TARGET verliert.
    const doc = await exportDokument({
      pixels: {
        meta: { pixelId: "111" },
        pinterest: { pixelId: "222" },
        tiktok: { pixelId: "333" },
      },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["meta", "pinterest", "tiktok"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["meta", "pinterest", "tiktok"]);
  });

  it("D-T2: NUR Pinterest, kein Meta-Pixel -> nur dessen Schluessel, und keine Meta-Laufzeit", async () => {
    // WIRD ROT, WENN das Memo auf Meta fest verdrahtet ist oder ein Ziel ohne
    // Kennung mitnimmt. Die zweite Zusicherung ist der Gegenbeweis dazu, dass der
    // Schluessel an der Meta-Kennung haengen koennte: hier gibt es keine.
    const doc = await exportDokument({
      pixels: { pinterest: { pixelId: "222" } },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["pinterest"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["pinterest"]);
    expect(doc).not.toContain("PS_PIXEL_ID");
  });

  it("D-T3: NUR TikTok -> nur dessen Schluessel", async () => {
    // WIRD ROT, WENN das Memo auf ein festes Ziel verdrahtet ist. Das dritte Ziel
    // ist das LETZTE der Konstanten-Ordnung — ein Memo, das nur den Kopf der Liste
    // sieht, faellt hier und nicht bei D-T2.
    const doc = await exportDokument({
      pixels: { tiktok: { pixelId: "333" } },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["tiktok"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["tiktok"]);
  });

  it("D-T4: KEINE Kennung -> der Alt-Pfad, kein __psConsentAll-Aufruf", async () => {
    // WIRD ROT, WENN die leere Liste umgangen wird — dann entstuende der
    // Mehr-Ziele-Pfad, wo der Alt-Pfad stehen muss.
    // DER STRUKTURBRUCH IST DER GEGENSTAND, nicht die Schluesselmenge: Bei leerer
    // Liste kippt buildMetaRuntime auf VIER bau-zeit-gegatete Bloecke zurueck —
    // Einzel-Ziehung __psConsent("meta") statt der Sammel-Ziehung, und im Draht
    // "__c === true" statt "__c[...] === true". Genau daran unterscheidet sich
    // dieser Fall von "nur Meta konfiguriert", wo die Schluesselmenge dieselbe ist.
    // EINZELSTUECK, GEMESSEN (Mutationsprobe M4 am 2026-08-13: bei leerer Liste alle
    // Ziele zurueckgeben -> GENAU DIESER Test faellt, 1 von 1070). Er ist der einzige
    // Waechter dieser Fehlerklasse; wer ihn als Variante von D-T2/D-T3 entfernt, nimmt
    // die einzige Abdeckung des Strukturbruchs mit.
    const doc = await exportDokument({ pixels: {}, capi: D1_TK });
    expect(gezogeneSchluessel(doc)).toBeNull();
    expect(verdrahteteSchluessel(doc)).toEqual(["meta"]);
    expect(doc).toContain('"cns": { "meta": __c === true }');
  });

  it("D-T5: Meta + TikTok -> die Luecke in der Mitte, Ordnung erhalten", async () => {
    // WIRD ROT, WENN das Memo die Ordnung von TRACKING_TARGETS nicht erhaelt oder
    // ein uebersprungenes Ziel doch mitnimmt. Die Ordnung ist keine Kosmetik: Sie
    // steht WOERTLICH im ausgelieferten Text und ist damit Teil der Einbahnstrasse.
    const doc = await exportDokument({
      pixels: { meta: { pixelId: "111" }, tiktok: { pixelId: "333" } },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["meta", "tiktok"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["meta", "tiktok"]);
  });

  it("D-T6: eine Kennung aus reinem Leerraum gilt als ABWESEND", async () => {
    // WIRD ROT, WENN die Leere-Bedingung des Memos den Trim verliert. Das ist die
    // EINZIGE Achse, an der die heutige Ausformulierung (Vergleich gegen "") und das
    // geteilte Praedikat hasPixelId ueberhaupt etwas zu entscheiden haben — beide
    // laufen durch getPixelId, das trimmt.
    // KEIN EINZELSTUECK, UND DAS IST GEMESSEN (M7 am 2026-08-13: die Leere-Bedingung
    // des Memos entfernt -> dieser Test faellt zusammen mit SECHS weiteren, alle
    // derselben Klasse "ein Ziel ohne Kennung wird verdrahtet"). Der Vermerk steht
    // hier, damit niemand ihm eine Alleinstellung zuschreibt, die die Probe nicht
    // hergegeben hat.
    // WAS DIE PROBE NICHT ZEIGEN KONNTE: eine Mutation, die NUR den Trim trifft, gibt
    // es am Memo nicht — der Trim liegt in getPixelId, nicht hier.
    const doc = await exportDokument({
      pixels: { meta: { pixelId: "111" }, pinterest: { pixelId: "   " } },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["meta"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["meta"]);
  });

  it("D-T7: eine LEERE Kennung gilt als abwesend", async () => {
    // WIRD ROT, WENN die Leere-Bedingung ganz entfaellt und die blosse Anwesenheit
    // des Feldes genuegt. Getrennt von D-T6 gefuehrt, weil beide Fixturen
    // verschiedene Stellen des Ausdrucks treffen: hier den Vergleich, dort den Trim.
    const doc = await exportDokument({
      pixels: { meta: { pixelId: "111" }, tiktok: { pixelId: "" } },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["meta"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["meta"]);
  });

  it("D-T8 (VORAUSSETZUNG der uebrigen sieben): ohne Kennung UND ohne Tracking-Schluessel steht gar nichts im Text", async () => {
    // DIESER TEST IST KEINE ZUGABE, SONDERN DIE VORAUSSETZUNG DER UEBRIGEN SIEBEN.
    // Die Beobachtbarkeit haengt am TRACKING-SCHLUESSEL, nicht am Memo: Ohne ihn und
    // ohne Meta-Kennung gibt buildMetaRuntime "" zurueck (tracking/meta.ts), und dann
    // steht WEDER eine Ziehung NOCH ein Draht-Feld im Dokument.
    // NIMMT JEMAND DEN SCHLUESSEL AUS EINER FIXTURE der uebrigen sieben, waeren die
    // dortigen Zusicherungen ueber die verdrahteten Schluessel trivial wahr und
    // saehen weiter wie Abdeckung aus. Dieser Test macht die Abhaengigkeit sichtbar,
    // statt sie zu unterstellen.
    // DER LEERE ZWEITE PARAMETER IST DER GEGENSTAND DIESES LAUFS und steht deshalb
    // ausgeschrieben da: Seit der Scheibe "Der Schluessel kommt aus der Spalte" reist
    // der Schluessel in einer eigenen Prop, nicht mehr im Blob. Ohne dieses ""
    // bekaeme der Lauf die Vorgabe D1_KEY, truege also einen Schluessel — und seine
    // zwei Abwesenheits-Zusicherungen fielen, statt still trivial wahr zu werden.
    const doc = await exportDokument({ pixels: {} }, "");
    expect(gezogeneSchluessel(doc)).toBeNull();
    expect(verdrahteteSchluessel(doc)).toBeNull();
    // GEGENPROBE IM SELBEN TEST: das Wiring selbst ENTSTEHT sehr wohl. Ohne sie
    // waeren beide Zusicherungen darueber auch dann wahr, wenn gar kein Dokument
    // erzeugt worden waere.
    expect(doc).toContain("data-pagesmith-id=\"ps-aaaaaa\"");
  });

  it("D-T9: das Publish-Artefakt traegt DENSELBEN Schluesselsatz wie das Export-Dokument", async () => {
    // WIRD ROT, WENN einer der vier Konsumenten des Memos eine eigene Liste bekommt.
    // Das Memo speist Vorschau, Export und BEIDE Publish-Artefakte; ein Test auf nur
    // einem Weg liesse offen, ob die anderen dieselbe Quelle benutzen.
    // EINZELSTUECK, GEMESSEN (Mutationsprobe M5 am 2026-08-13: der Publish-Zweig
    // bekommt eine eigene Liste -> GENAU DIESER Test faellt, 1 von 1070). Kein anderer
    // Test im Bestand vergleicht die beiden Auslieferwege miteinander.
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      render(
        <CodeImporter
          initialProjectId="p-d1"
          initialCode={D1_HTML}
          initialMappings={D1_MAPPINGS}
          initialSettings={{
            pixels: { meta: { pixelId: "111" }, pinterest: { pixelId: "222" } },
            capi: D1_TK,
          }}
          initialTrackingKey={D1_KEY}
        />,
      );
      await screen.findByText("Kaufen");

      fireEvent.click(
        screen.getByRole("button", { name: "In Zwischenablage kopieren" }),
      );
      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      const exportDoc = (writeText.mock.calls[0] as unknown[])[0] as string;

      fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
      fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));
      await waitFor(() => expect(publishProject).toHaveBeenCalledTimes(1));
      const publishDoc = (publishProject.mock.calls[0] as unknown[])[1] as string;

      // VORBEDINGUNG, sonst vergliche der Test zweimal "nichts": beide Wege muessen
      // ueberhaupt einen Schluesselsatz tragen.
      expect(gezogeneSchluessel(exportDoc)).toEqual(["meta", "pinterest"]);
      expect(gezogeneSchluessel(publishDoc)).toEqual(gezogeneSchluessel(exportDoc));
      expect(verdrahteteSchluessel(publishDoc)).toEqual(
        verdrahteteSchluessel(exportDoc),
      );
    } finally {
      delete (navigator as { clipboard?: unknown }).clipboard;
    }
  });

  it("D-T10: ALLE VIER Ziele mit Kennung -> die vollstaendige FOLGE, in beiden Lesern", async () => {
    // DIE EINZIGE STELLE IM REPO, DIE DAS VIERTE ZIEL AUF DIESER ACHSE PRUEFT.
    // GEMESSEN am 2026-08-18: KEIN anderer Test setzt je eine linkedin-KENNUNG —
    // die uebrigen linkedin-Fundstellen betreffen die Adapter-Liste, den
    // Fan-Out-Riegel oder das Zugangsdatum. WER DIESEN TEST ENTFERNT, NIMMT DIE
    // EINZIGE ABDECKUNG MIT, und zwar fuer genau das Ziel, dessen Unveraendertheit
    // die Scheibe 11.1c zusagt.
    // WARUM ER UEBER DEN BLOB GEHT UND NICHT UEBER DIE OBERFLAECHE: Die
    // LinkedIn-Karte fuehrt (11.1a) kein oeffentliches Feld, es gibt also keinen
    // Bedienweg zu einer Kennung. Der Einstellungs-Blob nimmt sie trotzdem an — der
    // Typ ist Partial<Record<TrackingTarget, …>>, und genau diese Konstellation
    // entstuende, sobald ein solches Feld existiert.
    //
    // DIE FOLGE, NICHT DIE MENGE: Die Reihenfolge stammt aus TRACKING_TARGETS und
    // steht WOERTLICH im ausgelieferten Text — sie ist damit Teil der
    // Einbahnstrasse, genau wie in D-T5 begruendet. toEqual auf ein Array prueft
    // sie mit; ein Mengen-Vergleich liesse eine Umsortierung durch.
    //
    // BEIDE LESER, weil sie zwei verschiedene Stellen im Dokument abgreifen: die
    // Ziehung (__psConsentAll) und das Draht-Feld des Beacons. Ein Test auf nur
    // einem liesse offen, ob die andere Stelle dieselbe Quelle benutzt.
    const doc = await exportDokument({
      pixels: {
        meta: { pixelId: "111" },
        pinterest: { pixelId: "222" },
        tiktok: { pixelId: "333" },
        linkedin: { pixelId: "444" },
      },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual([
      "meta",
      "pinterest",
      "tiktok",
      "linkedin",
    ]);
    expect(verdrahteteSchluessel(doc)).toEqual([
      "meta",
      "pinterest",
      "tiktok",
      "linkedin",
    ]);
  });

  it("D-T11: LinkedIn traegt NUR eine ZUORDNUNG, keine Skalar-Kennung -> es steht trotzdem im Draht", async () => {
    // DIE (b)-SEITE DER SCHEIBE 11.1d, UND SIE IST DIE EINZIGE STELLE, DIE SIE
    // PRUEFT: Die zweite Kennungsform (Ereignisname -> Regel-Kennung) erreicht den
    // ausgelieferten Text ueber isTargetDeliverable (lib/settings.ts). WIRD ROT,
    // WENN das Consent-Memo wieder allein den Skalar befragt — dann faellt ein
    // Ziel, dessen Kennung JE EREIGNISTYP gilt, lautlos aus dem Draht, am Ingest
    // greift fail-closed, und auf keinem Kanal wird etwas rot.
    //
    // ABGRENZUNG ZU D-T10, damit keiner der beiden als redundant gestrichen wird:
    // D-T10 setzt fuer LinkedIn einen SKALAR, dieser Test setzt AUSSCHLIESSLICH
    // die Zuordnung — es sind ZWEI verschiedene Kennungsformen, und das Urteil
    // verknuepft sie mit ODER. Faellt eine Haelfte weg, bleibt der jeweils andere
    // Test gruen; nur beide zusammen decken die Verknuepfung.
    //
    // KEIN BEDIENWEG, DESHALB UEBER DEN BLOB: Die Zuordnung wird in der Oberflaeche
    // je Ereignisname eingetragen (MeasureView); diese Fixture setzt den
    // Endzustand direkt, weil hier der EXPORT geprueft wird und nicht die Eingabe.
    const doc = await exportDokument({
      pixels: {
        meta: { pixelId: "111" },
        pinterest: { pixelId: "222" },
        tiktok: { pixelId: "333" },
        linkedin: { conversionRules: { Lead: "urn:lla:llaPartnerConversion:1" } },
      },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual([
      "meta",
      "pinterest",
      "tiktok",
      "linkedin",
    ]);
    expect(verdrahteteSchluessel(doc)).toEqual([
      "meta",
      "pinterest",
      "tiktok",
      "linkedin",
    ]);
  });

  it("D-T12: eine LEERE Zuordnung ist KEINE Kennung -> LinkedIn bleibt aus dem Draht", async () => {
    // DIE GEGENPROBE ZU D-T11, und ohne sie waere jener trivial erfuellbar: Ein
    // Memo, das schlicht die ANWESENHEIT des Feldes liest, bestuende D-T11 und
    // faellt hier. Geprueft wird damit, dass das Form-Praedikat die WERTE ansieht.
    const doc = await exportDokument({
      pixels: {
        meta: { pixelId: "111" },
        linkedin: { conversionRules: { Lead: "" } },
      },
      capi: D1_TK,
    });
    expect(gezogeneSchluessel(doc)).toEqual(["meta"]);
    expect(verdrahteteSchluessel(doc)).toEqual(["meta"]);
  });
});

// ===========================================================================
// Phase 11.1b — VERWENDETE EVENTS. Der Abschnitt im Bereich MESSEN zeigt die
// Track-Ereignisnamen, die dieses Projekt VERWENDET — als VEREINIGUNG ueber
// beide Varianten-Mengen.
//
// WAS DIESE DREI TESTS SCHUETZEN, und warum jeder einzeln noetig ist:
// T8 die VEREINIGUNG (ein Nenner, der nur A kennt, meldet vollstaendig,
//    waehrend beim halben Traffic ein Name fehlt),
// T9 die AUSSAGE (ohne Variante B darf keine Aussage ueber B fallen),
// T10 den LEER-Zustand (er darf nicht wie ein Ladefehler und nicht wie ein
//    leerer Kasten aussehen).
//
// T8 FAEHRT DIE PRODUKTIVE SCHRITTFOLGE, NICHT EINEN VORGESEEDETEN ENDZUSTAND:
// anlegen -> Variante B erzeugen (sie startet als byte-genaue KOPIE, deshalb
// tragen A und B zunaechst DENSELBEN Namenssatz) -> in B einen Namen aendern ->
// speichern -> zurueckschalten. Ein geseedeter Endzustand liefe durch einen
// Zustand, den das Produkt so gar nicht herstellt (die 9a-Lektion), und liesse
// gerade den Weg aus, auf dem die Divergenz zwischen A und B real entsteht.
//
// DIE FIXTURE IST PFLICHT UND NICHT BELIEBIG: A und B tragen VERSCHIEDENE Namen
// UND einen gemeinsamen (A = Lead, Purchase · B = Lead, Signup). Ohne den
// gemeinsamen waere Vereinigung nicht von Konkatenation zu unterscheiden; ohne
// die verschiedenen bliebe B-Blindheit unsichtbar.
// ===========================================================================
describe("CodeImporter — Scheibe 11.1b: verwendete Events", () => {
  const EV_HTML =
    '<!DOCTYPE html><html><head></head><body><button data-pagesmith-id="ps-aaaaaa">Anfragen</button><button data-pagesmith-id="ps-aaaaab">Kaufen</button></body></html>';
  const EV_MAP_A = [
    { elementId: "ps-aaaaaa", type: "track" as const, config: { event: "Lead" } },
    {
      elementId: "ps-aaaaab",
      type: "track" as const,
      config: { event: "Purchase" },
    },
  ];

  const openSettings = () =>
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
  // ANKER IST DIE UEBERSCHRIFT, NICHT DER DOKUMENT-TEXT: eine body-weite
  // Textsuche traefe auch die Statistik und die Varianten-Auswertung, und ein
  // Ereignisname ist ein FREIER Nutzer-String, der dort ebenfalls stehen kann.
  const section = () =>
    screen.getByRole("heading", { name: "Verwendete Events" })
      .parentElement as HTMLElement;

  it("T8: vereinigt beide Varianten — erzeugt ueber die PRODUKTIVE Schrittfolge", async () => {
    // createVariantB antwortet wie der echte Pfad: B ist die Kopie von A.
    // `as never` wie bei den uebrigen Once-Ueberschreibungen dieser Datei: der
    // gehoistete Spy ist auf seinen Default-Rueckgabetyp (mappings: never[])
    // eingeengt, nicht auf die echte Action-Signatur.
    createVariantB.mockResolvedValueOnce({
      ok: true as const,
      html: EV_HTML,
      mappings: EV_MAP_A,
    } as never);
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={EV_HTML}
        initialMappings={EV_MAP_A}
      />,
    );
    await screen.findByText("Kaufen");

    // (1) Variante B anlegen.
    fireEvent.click(screen.getByRole("button", { name: "+ Variante B" }));
    await screen.findByRole("group", { name: "Variante" });

    // (2) Auf B umschalten und dort GENAU EINEN Namen aendern: Purchase ->
    // Signup, ueber den Custom-Zweig (der freie Nutzer-String ist der reale Weg
    // zu einem Namen, den die Standard-Liste nicht kennt).
    fireEvent.click(screen.getByRole("button", { name: "Variante B" }));
    fireEvent.click(await screen.findByText("Kaufen"));
    fireEvent.click(await screen.findByRole("button", { name: "Bearbeiten" }));
    fireEvent.change(screen.getByLabelText("Standard-Event"), {
      target: { value: "__custom__" },
    });
    fireEvent.change(screen.getByLabelText("Custom-Event-Name"), {
      target: { value: "Signup" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Übernehmen" }));

    // (3) B speichern, (4) zurueck auf A.
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    fireEvent.click(screen.getByRole("button", { name: "Variante A" }));

    openSettings();
    const text = section().textContent ?? "";
    expect(text).toContain("Lead");
    expect(text).toContain("Purchase");
    expect(text).toContain("Signup");
    expect(text).toContain("über beide Varianten");
    // DER GEMEINSAME NAME STEHT GENAU EINMAL. Ohne diese Zeile bewiese der Test
    // nur Konkatenation: "Lead" stuende dann zweimal und toContain waere blind.
    expect(section().querySelectorAll("li").length).toBe(3);
  });

  it("T9: ohne Variante B faellt KEINE Aussage ueber Varianten", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={EV_HTML}
        initialMappings={EV_MAP_A}
      />,
    );
    await screen.findByText("Kaufen");
    openSettings();

    const text = section().textContent ?? "";
    expect(text).toContain("Lead");
    expect(text).toContain("Purchase");
    expect(text).not.toContain("über beide Varianten");
  });

  it("T10: ohne Track-Mappings der eigene Leer-Text — kein undefined, kein leerer Kasten", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={EV_HTML} />);
    await screen.findByText("Kaufen");
    openSettings();

    const text = section().textContent ?? "";
    expect(text).toContain("Noch keine Tracking-Events verknüpft.");
    expect(text).not.toContain("undefined");
    expect(section().querySelectorAll("li").length).toBe(0);
  });
});

// ===========================================================================
// T7 — DIE ADRESSE WIRD BEIM MOUNT GERAEUMT, UND ZWAR FUER BEIDE PARAMETER
// (mitgereiste Fix-Scheibe zur Phase 11.2).
//
// WARUM DER GUARD SICH GEAENDERT HAT: Er fragte bis dahin nach dem ERGEBNISCODE. Seit die
// Adresse ZWEI fluechtige Parameter traegt, liesse er einen Projekt-Parameter OHNE
// Ergebniscode stehen — und der waehlte dann bei JEDEM Neuladen erneut. Genau das halbe
// Deep-Linking, das der Zuschnitt ausschliesst.
//
// DIE LAEUFE STEHEN EINZELN, weil sie verschieden brechen: der erste am neuen Guard, der
// zweite an seiner Untergrenze (ohne Suchzeichenkette wird NICHTS angefasst).
// ===========================================================================
describe("Der Mount-Effekt raeumt die Adresse", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;

  afterEach(() => {
    window.history.replaceState(null, "", "/");
  });

  it("T7 — ein Projekt-Parameter OHNE Ergebniscode wird entfernt", async () => {
    // ROT DURCH DIE MUTATION "den alten Guard stehen lassen" (Rueckkehr zu
    // `initialConnectOutcome === null` -> frueh zurueck): Dann bliebe die Kennung stehen.
    window.history.replaceState(null, "", "/?project=abc");
    render(<CodeImporter initialProjectId="p1" initialCode={HTML} />);
    await screen.findByText("Titel");
    expect(window.location.search).toBe("");
  });

  it("T7b — beide Parameter zusammen werden entfernt", async () => {
    // DIE FESTLEGUNG WOERTLICH: zusammen konsumiert, zusammen entfernt. Ein Lauf, der nur
    // den Projekt-Parameter prueft, liesse offen, ob der Ergebniscode weiterhin
    // mitgeht — er war der einzige, den der alte Guard kannte.
    window.history.replaceState(null, "", "/?google=write&project=abc");
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={HTML}
        initialConnectOutcome="write"
      />,
    );
    await screen.findByText("Titel");
    expect(window.location.search).toBe("");
  });

  it("T7c — ohne Suchzeichenkette wird die Adresse NICHT angefasst", async () => {
    // DIE UNTERGRENZE, und ohne sie waeren die zwei Laeufe darueber hohl: Sie zeigten nur,
    // dass am Ende nichts dasteht — auch eine Fassung, die IMMER schreibt, saehe dort
    // richtig aus. Hier wird belegt, dass der frueh zurueckkehrende Zweig existiert.
    window.history.replaceState(null, "", "/unterseite");
    render(<CodeImporter initialProjectId="p1" initialCode={HTML} />);
    await screen.findByText("Titel");
    expect(window.location.pathname).toBe("/unterseite");
    expect(window.location.search).toBe("");
  });
});

// ===========================================================================
// SCHEIBE 2 DER PHASE 11.2 — DIE KONTO-KENNUNGEN BEKOMMEN IHRE EINGABE.
//
// GEPRUEFT WIRD HIER DAS, WAS DIE UNIT-LAEUFE NICHT ZEIGEN KOENNEN: dass die
// Umformung im DOM ANKOMMT (das Feld zeigt den abgelegten Wert) und dass die
// Ereignis-Achse ZWEI Bloecke traegt. Die Umformung selbst und die Reihenfolge der
// Ziele sind in lib/settings.test.ts geprueft; hier steht die Verdrahtung.
// ===========================================================================
describe("CodeImporter — Scheibe 2: die Google-Konto-Kennung", () => {
  function googleInput() {
    return screen.getByPlaceholderText(
      TARGET_CARDS.google.publicPlaceholder!
    ) as HTMLInputElement;
  }

  it("G-T1: das Feld zeigt den UMGEFORMTEN Wert — die Sichtbarkeits-Auflage aus Festlegung (6)", () => {
    // DIE ANDERE HAELFTE VON N-E: Jener Lauf prueft die zwei Funktionen, dieser das
    // DOM. Das Feld ist KONTROLLIERT — sein value kommt aus getPixelId ueber den
    // Container —, also ist "was der Betreiber sieht" hier woertlich messbar.
    // WIRD ROT, WENN die Umformung aus setPixelId in den Speicherpfad wandert: Dann
    // stuende hier weiter "987-654-3210", waehrend die Datenbank etwas anderes traegt.
    render(<CodeImporter initialCode="<button>X</button>" />);
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    fireEvent.change(googleInput(), { target: { value: "987-654-3210" } });
    expect(googleInput().value).toBe("9876543210");
  });

  it("G-T2: der umgeformte Wert ist auch der GESPEICHERTE — kein unsichtbarer Unterschied", () => {
    // DIE ZWEITE HAELFTE DER AUFLAGE: Feld und Datenbank tragen DENSELBEN Wert. Ein
    // Lauf, der nur das Feld prueft, liesse eine zweite Umformung im Speicherpfad
    // unbemerkt; einer, der nur den Speicherpfad prueft, liesse ein Feld zu, das
    // etwas anderes zeigt. Erst beide zusammen schliessen den unsichtbaren
    // Unterschied aus.
    render(<CodeImporter initialCode="<button>X</button>" />);
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    fireEvent.change(googleInput(), { target: { value: " 987 654-3210 " } });
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    return screen
      .findByRole("button", { name: /Gespeichert/ })
      .then(() => {
        const args = saveProject.mock.calls[0] as unknown[];
        expect(args[3]).toEqual({ pixels: { google: { pixelId: "9876543210" } } });
        expect(googleInput().value).toBe("9876543210");
      });
  });

  it("G-T3: die VIER bestehenden Ziele werden im Container NICHT umgeformt", () => {
    // DIE GEGENPROBE AM ECHTEN BEDIENWEG, nicht nur an der reinen Funktion: setPixelId
    // ist GETEILT, und der Container ruft fuer alle Ziele denselben Rueckruf.
    // ROT DURCH DIE PFLICHT-MUTATION "die Umformung auf alle Ziele ausweiten".
    render(<CodeImporter initialCode="<button>X</button>" />);
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    const meta = screen.getByPlaceholderText(
      TARGET_CARDS.meta.publicPlaceholder!
    ) as HTMLInputElement;
    fireEvent.change(meta, { target: { value: "123-456" } });
    expect(meta.value).toBe("123-456");
    // POSITIVKONTROLLE IM SELBEN LAUF: dass ueberhaupt umgeformt wird, zeigt das
    // Google-Feld daneben — sonst waere "nicht umgeformt" auch dann wahr, wenn die
    // Umformung gar nicht existierte.
    fireEvent.change(googleInput(), { target: { value: "123-456" } });
    expect(googleInput().value).toBe("123456");
  });
});

describe("CodeImporter — Scheibe 2: die Ereignis-Achse traegt ZWEI Ziele", () => {
  it("G-T4: beide Bloecke stehen, in der Ordnung von TRACKING_TARGETS", () => {
    // WIRD ROT, WENN die Liste wieder einwertig wird ODER wenn jemand sie in der
    // Ansicht sortiert. Die Ordnung wird aus dem gerenderten Text gelesen, nicht aus
    // der Liste — sonst pruefte der Lauf die Quelle gegen sich selbst.
    const { container } = render(<CodeImporter initialCode="<button>X</button>" />);
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    const text = container.textContent ?? "";
    const linkedin = text.indexOf("Conversion-Regeln (LinkedIn)");
    const google = text.indexOf("Conversion-Regeln (Google)");
    expect(linkedin).toBeGreaterThan(-1);
    expect(google).toBeGreaterThan(-1);
    // LinkedIn steht in TRACKING_TARGETS VOR Google — also auch hier.
    expect(linkedin).toBeLessThan(google);
  });

  it("G-T5: die Regel-Felder beider Ziele sind EINDEUTIG benannt und schreiben in VERSCHIEDENE Slots", () => {
    // ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG WAEREN EIN
    // OBERFLAECHEN-PROBLEM (docs/immer-beachten.md). Beide Bloecke schleifen ueber
    // DIESELBE Ereignisliste; ohne den ziel-tragenden zugaenglichen Namen hiessen
    // beide Felder "Lead".
    // ROT, WENN das aria-label faellt (dann ist getByLabelText mehrdeutig) ODER wenn
    // beide Rueckrufe in dasselbe Ziel schreiben.
    render(
      <CodeImporter
        initialCode='<button id="ps-aaaaaa">X</button>'
        initialMappings={[
          { elementId: "ps-aaaaaa", type: "track", config: { event: "Lead" } },
        ]}
      />
    );
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    const li = screen.getByLabelText("LinkedIn: Lead") as HTMLInputElement;
    const go = screen.getByLabelText("Google: Lead") as HTMLInputElement;
    fireEvent.change(li, { target: { value: "urn:lla:x" } });
    fireEvent.change(go, { target: { value: "555000" } });
    // JEDER WERT STEHT IN SEINEM EIGENEN FELD — die Gegenprobe dazu, dass beide
    // Rueckrufe dasselbe Ziel treffen wuerden.
    expect((screen.getByLabelText("LinkedIn: Lead") as HTMLInputElement).value).toBe(
      "urn:lla:x"
    );
    expect((screen.getByLabelText("Google: Lead") as HTMLInputElement).value).toBe(
      "555000"
    );
  });
});

// ===========================================================================
// SCHEIBE "Der Schluessel kommt aus der Spalte" — SECHS LAEUFE.
//
// DER SIEBTE LIEGT WOANDERS und wird hier nur benannt, damit niemand ihn vermisst:
// Die exakte Projektions-Zusicherung von loadProject steht in
// src/app/projects/actions.test.ts. Sie ist der Waechter dafuer, dass die Spalte
// ueberhaupt geladen wird; alles hier setzt voraus, dass sie ankommt.
//
// WAS DIESE SECHS NICHT LEISTEN: Sie laufen saemtlich gegen Attrappen. Dass die
// Spalte im DEPLOYTEN Pfad ankommt, zeigt allein ein Live-Test.
// ===========================================================================
describe("CodeImporter — der Beacon-Schluessel stammt aus der Spalte, nicht aus dem Blob", () => {
  const K_HTML =
    '<!DOCTYPE html><html><head></head><body><button data-pagesmith-id="ps-aaaaaa">Kaufen</button></body></html>';
  const K_MAPPINGS = [
    { elementId: "ps-aaaaaa", type: "track" as const, config: { event: "Lead" } },
  ];

  const ORIGINAL_APP_URL = process.env.NEXT_PUBLIC_APP_URL;
  beforeEach(() => {
    // PFLICHT-VORBEDINGUNG, keine Bequemlichkeit: Fehlt die Variable, faellt
    // buildCapiBeaconStatement in den fail-loud-Zweig und es entstuende auch bei
    // gefuelltem Schluessel KEIN Beacon — jede Zusicherung unten waere dann aus dem
    // FALSCHEN Grund erfuellt bzw. verletzt.
    process.env.NEXT_PUBLIC_APP_URL = "https://app.pagesmith.io";
  });
  afterEach(() => {
    if (ORIGINAL_APP_URL === undefined) delete process.env.NEXT_PUBLIC_APP_URL;
    else process.env.NEXT_PUBLIC_APP_URL = ORIGINAL_APP_URL;
  });

  // Das EXPORT-Dokument, abgefangen an der Zwischenablage — dieselbe Bauform wie im
  // D1-Block weiter oben.
  async function exportDoc(): Promise<string> {
    const writeText = vi.fn(async () => {});
    Object.defineProperty(navigator, "clipboard", {
      configurable: true,
      value: { writeText },
    });
    try {
      fireEvent.click(
        screen.getByRole("button", { name: "In Zwischenablage kopieren" }),
      );
      await waitFor(() => expect(writeText).toHaveBeenCalledTimes(1));
      return (writeText.mock.calls[0] as unknown[])[0] as string;
    } finally {
      delete (navigator as { clipboard?: unknown }).clipboard;
    }
  }

  // Das VORSCHAU-Dokument. Es ist ein EIGENER Messpunkt und keine Verdopplung des
  // Exports: Die Vorschau laeuft ueber ein MEMO, der Export ueber eine gewoehnliche
  // Funktion — es sind ZWEI Konsumenten, und ein Test auf nur einem liesse offen, ob
  // der andere dieselbe Quelle benutzt.
  //
  // WAS DIESER MESSPUNKT NICHT DECKT, und der Satz gehoert hierher, damit ihm niemand
  // mehr zuschreibt, als er traegt: die MEMO-ABHAENGIGKEIT. GEMESSEN (Mutationsproben
  // M4 und M4b, 2026-09-07): Wird trackingKey aus der Dep-Liste entfernt, bleibt der
  // GESAMTE Bestand gruen — settings steht in derselben Liste und wechselt an jedem
  // Saat-Punkt die Referenz, das Memo rechnet also ohnehin neu. Wird dagegen der
  // VORSCHAU-KONSUMENT auf den Blob zurueckgedreht, faellt GENAU die Zusicherung in
  // K3, die diesen Messpunkt benutzt. Er ist der Waechter des zweiten KONSUMENTEN,
  // nicht der Dep-Liste.
  async function vorschauDoc(): Promise<string> {
    fireEvent.click(screen.getByRole("button", { name: "Vorschau" }));
    const frame = await screen.findByTitle("functional-preview");
    return frame.getAttribute("srcdoc") ?? "";
  }

  // LAUF 2 — DER FALL, DER VOR DIESER SCHEIBE BRACH.
  it("K1: Spalte gefuellt, Blob LEER -> der erzeugte Text traegt den Beacon mit dem Spaltenwert", async () => {
    // WIRD ROT, WENN der Erzeuger wieder ueber den Blob liest: dann ist der
    // Schluessel leer, buildCapiBeaconStatement gibt "" zurueck, und es entsteht
    // ueberhaupt kein Beacon-Rumpf.
    // ER IST DER EINZIGE LAUF, DER DIESE ACHSE DECKT. Die dreizehn Bestandslaeufe
    // des D1- und des 7b-Blocks tragen ihren Schluessel seit dem Nachziehen zwar
    // ebenfalls in der Prop — aber ihr Blob ist dabei nicht LEER, sondern traegt
    // weiter capi.tokenSet. Nur hier fehlt der capi-Zweig vollstaendig.
    render(
      <CodeImporter
        initialProjectId="p-k1"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey="tk-aus-der-spalte"
      />,
    );
    await screen.findByText("Kaufen");
    const doc = await exportDoc();
    expect(doc).toContain("navigator.sendBeacon(");
    expect(doc).toContain('"tk-aus-der-spalte"');
  });

  // LAUF 3 — DIE GEGENRICHTUNG ZU K1.
  it("K2: leerer Schluessel -> weiterhin KEIN Beacon und KEIN Wurf", async () => {
    // WIRD ROT, WENN jemand aus dem fehlenden Schluessel einen Fehlerpfad macht.
    // OHNE IHN BEWIESE K1 NUR, DASS ETWAS ENTSTEHT — nicht, dass der Schluessel
    // darueber entscheidet.
    // DIE DRITTE ZUSICHERUNG IST PFLICHT UND KEINE ZUGABE: Ein Test, der nur
    // Abwesenheit prueft, unterscheidet ein wirksames Gate nicht von einem
    // abgestuerzten Handler. Sie belegt, dass der Erzeuger ZU ENDE laeuft.
    render(
      <CodeImporter
        initialProjectId="p-k2"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey=""
      />,
    );
    await screen.findByText("Kaufen");
    const doc = await exportDoc();
    expect(doc).not.toContain("navigator.sendBeacon(");
    expect(doc).toContain('data-pagesmith-id="ps-aaaaaa"');
  });

  // LAUF 4 — DER WAECHTER VON (I-3), AUF ZWEI MESSPUNKTEN.
  it("K3: Projektwechsel -> Export UND Vorschau tragen den Schluessel des NEUEN Projekts", async () => {
    // WIRD ROT, WENN der Saat-Punkt in handleSwitch den neuen Zustand nicht setzt.
    // SEINE GRENZE TRAEGT ER AN SICH SELBST: Er stellt die Saat-Punkte 1
    // (Erstbelegung aus den Props) und 3 (handleSwitch) her — NICHT die Punkte 2
    // und 4. Die haben ihre eigenen Laeufe (K4, K5), und zwar bewusst getrennt:
    // eine Fixture, die alle vier nacheinander durchliefe, meldete bei Rot nicht
    // mehr, WELCHER gefallen ist.
    // DIE ZWEITE HAELFTE DES MESSPUNKTS IST DER EIGENTLICHE ZUSATZ: Der Export laeuft
    // ueber eine gewoehnliche Funktion, die Vorschau ueber ein Memo — ZWEI Konsumenten,
    // zwei Stellen, an denen die Quelle falsch sein kann. Was sie NICHT deckt (die
    // Dep-Liste des Memos) und warum, steht am Helfer vorschauDoc.
    // DIE ATTRAPPE TRAEGT DIE VOLLE ZEILENGESTALT, und das ist keine Sorgfalt um
    // ihrer selbst willen: Fehlt html_b, ist der Varianten-Zustand nach dem Wechsel
    // undefined statt null, der Editor haelt eine Variante B fuer vorhanden, und der
    // Kopier-Knopf heisst dann "Variante A kopieren". Der Lauf misst dann nichts
    // mehr — er findet den Knopf nicht.
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: K_HTML,
      mappings: K_MAPPINGS,
      settings: {},
      html_b: null,
      mappings_b: null,
      ab_test_active: false,
      ab_test_started_at: null,
      tracking_key: "tk-von-B",
    });
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey="tk-von-A"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Kaufen");
    // VORBEDINGUNG MIT BEWEISKRAFT: A traegt seinen Schluessel wirklich. Ohne sie
    // ginge die Zusicherung unten auch dann auf, wenn NIE ein Beacon entstuende.
    expect(await exportDoc()).toContain('"tk-von-A"');

    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));
    await waitFor(() => expect(loadProject).toHaveBeenCalledWith("p2"));

    const nachher = await exportDoc();
    expect(nachher).toContain('"tk-von-B"');
    expect(nachher).not.toContain("tk-von-A");

    const vorschau = await vorschauDoc();
    expect(vorschau).toContain('"tk-von-B"');
    expect(vorschau).not.toContain("tk-von-A");
  });

  // LAUF 5 — SAAT-PUNKT 2.
  it("K4: Leerzustand -> das Dokument traegt NICHT den Schluessel des vorigen Projekts", async () => {
    // WIRD ROT, WENN resetToEmpty den neuen Zustand nicht zuruecksetzt.
    // DER SCHADEN AUF DIESER ACHSE IST KEIN KOSMETISCHER: Ein Leak hiesse, das
    // Dokument des leeren Kontexts truege den Schluessel des VORIGEN Projekts —
    // der Ingest loeste jede Conversion zum falschen Projekt auf.
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey="tk-von-A"
      />,
    );
    await screen.findByText("Kaufen");
    expect(await exportDoc()).toContain('"tk-von-A"');

    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(screen.getByRole("button", { name: "+ Neues Projekt" }));

    // Der leere Kontext hat kein HTML mehr -> gemessen wird an der VORSCHAU, die
    // auch fuer leeren Code ein (leeres) Dokument erzeugt.
    expect(await vorschauDoc()).not.toContain("tk-von-A");
  });

  // LAUF 6 — SAAT-PUNKT 4.
  it("K5: Nachrueck-Zweig nach dem Loeschen -> das Dokument traegt den Schluessel des NACHGERUECKTEN Projekts", async () => {
    // WIRD ROT, WENN der Saat-Punkt im Nachrueck-Zweig von handleDelete den neuen
    // Zustand nicht setzt. Dieser Zweig laedt ein Projekt, OHNE dass der Nutzer
    // gewechselt haette — kein anderer Lauf erreicht ihn.
    vi.mocked(window).confirm = vi.fn(() => true);
    listProjects.mockResolvedValueOnce([
      { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
    ] as never);
    // VOLLE ZEILENGESTALT, aus demselben Grund wie in K3.
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: K_HTML,
      mappings: K_MAPPINGS,
      settings: {},
      html_b: null,
      mappings_b: null,
      ab_test_active: false,
      ab_test_started_at: null,
      tracking_key: "tk-nachgerueckt",
    });
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey="tk-geloescht"
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Kaufen");
    expect(await exportDoc()).toContain('"tk-geloescht"');

    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    // DER KNOPF TRAEGT EIN aria-label OHNE UMLAUT ("Loeschen") — an der Oberflaeche
    // steht ein Papierkorb-Zeichen. Der Anker ist das Label, nicht das Zeichen.
    fireEvent.click(screen.getAllByRole("button", { name: "Loeschen" })[0]);
    await waitFor(() => expect(loadProject).toHaveBeenCalledWith("p2"));

    const nachher = await exportDoc();
    expect(nachher).toContain('"tk-nachgerueckt"');
    expect(nachher).not.toContain("tk-geloescht");
  });

  // LAUF 7 — DAS VIERTE STUECK.
  it("K6: nach dem Setzen eines Zugangsdatums traegt das Dokument den Schluessel SOFORT, ohne Neuladen", async () => {
    // WIRD ROT, WENN handleCredentialsSaved den neuen Zustand nicht setzt.
    // OHNE DIESE ZEILE ERZEUGTE DIE SCHEIBE AUF DEM META-PFAD GENAU DEN
    // FEHLZUSTAND, DEN SIE AUF DEM GOOGLE-PFAD BEHEBT: Der Server legt die Spalte
    // beim Setzen lazy an und gibt den Wert zurueck; ohne die Uebernahme truege das
    // Dokument bis zum naechsten Projektladen keinen Beacon.
    // DIE ACHSE IST EINE ANDERE ALS BEI K3 BIS K5: dort ein Leak ZWISCHEN
    // Projekten, hier ein veralteter Zustand IM SELBEN Projekt.
    render(
      <CodeImporter
        initialProjectId="p-k6"
        initialCode={K_HTML}
        initialMappings={K_MAPPINGS}
        initialSettings={{ pixels: { meta: { pixelId: "111" } } }}
        initialTrackingKey=""
      />,
    );
    await screen.findByText("Kaufen");
    // VORBEDINGUNG MIT BEWEISKRAFT: vorher steht kein Beacon im Text. Ohne sie
    // ginge die Zusicherung unten auch dann auf, wenn der Schluessel schon da war.
    expect(await exportDoc()).not.toContain("navigator.sendBeacon(");

    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
    fireEvent.change(screen.getByPlaceholderText("CAPI-Token einfügen"), {
      target: { value: "geheim" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));
    // Der Spy liefert tk-mock zurueck; das ist der Wert, den der Server vergeben hat.
    await waitFor(() => expect(setCapiToken).toHaveBeenCalledTimes(1));

    const nachher = await exportDoc();
    expect(nachher).toContain("navigator.sendBeacon(");
    expect(nachher).toContain('"tk-mock"');
  });
});

describe("CodeImporter — die Darstellung des Einwilligungs-Dialogs (Scheibe 11.13b)", () => {
  // DIE ERWARTUNGEN STAMMEN AUS ENTSCHEIDUNG P11.13-6, NICHT AUS DER GEBAUTEN
  // OBERFLAECHE. DIESER BLOCK IST DIE ERSTE ABDECKUNG UEBERHAUPT FUER DIE
  // EINWILLIGUNGS-FLAECHE IN PublishView (GEMESSEN, VERMERK P11.13-3): bis zur Scheibe
  // 11.13b hat kein Test sie gerendert.
  function openSettings() {
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));
  }
  function themenGruppe() {
    return screen.queryByRole("radiogroup", { name: "Darstellung" });
  }

  // UI1. Sichtbar bei eingeschaltetem Dialog, mit "Hell" als Vorgabe.
  it("UI1: bei 'Leiste' steht die Gruppe 'Darstellung' mit VIER Optionen, 'Hell' gewaehlt", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    const gruppe = themenGruppe();
    expect(gruppe).not.toBeNull();
    const radios = within(gruppe as HTMLElement).getAllByRole("radio");
    // SEIT SCHEIBE 11.13c SIND ES VIER: "Eigene Farben" ist eine vierte DARSTELLUNG und
    // kein zweiter Schalter (Entscheidung P11.13-12).
    expect(radios).toHaveLength(4);
    expect((radios[0] as HTMLInputElement).checked).toBe(true);
    for (const r of radios.slice(1)) {
      expect((r as HTMLInputElement).checked).toBe(false);
    }
    // UND DIE ZWEI FARBFELDER STEHEN NICHT DA, solange "Hell" gewaehlt ist.
    expect(screen.queryByLabelText("Hintergrundfarbe")).toBeNull();
    expect(screen.queryByLabelText("Textfarbe")).toBeNull();
  });

  // UI2. DER EINZIGE TEST, DER DIE SICHTBARKEITS-BEDINGUNG UND DAS ERHALTENBLEIBEN
  // HAELT (Pflicht-Mutation Mu8). Beide Haelften gehoeren in EINEN Lauf: Eine Gruppe, die
  // beim Ausschalten verschwindet UND den Wert mitnimmt, waere ein Datenverlust, den der
  // Sichtbarkeits-Test allein nicht faengt.
  it("UI2: bei 'Aus' ist die Gruppe weg — und der gewaehlte Wert ueberlebt das Aus- und Einschalten", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar", theme: "dark" } }}
      />,
    );
    openSettings();
    // Vorbedingung: "Dunkel" ist gewaehlt.
    expect(
      (within(themenGruppe() as HTMLElement).getAllByRole(
        "radio",
      )[1] as HTMLInputElement).checked,
    ).toBe(true);

    // Dialog auf "Aus" -> die Gruppe ist NICHT im Dokument.
    fireEvent.click(screen.getByRole("radio", { name: /Aus/ }));
    expect(themenGruppe()).toBeNull();

    // Zurueck auf "Leiste" -> die alte Wahl steht wieder da.
    fireEvent.click(screen.getByRole("radio", { name: /Leiste/ }));
    expect(
      (within(themenGruppe() as HTMLElement).getAllByRole(
        "radio",
      )[1] as HTMLInputElement).checked,
    ).toBe(true);
  });

  // UI3. Die Wahl ist fuer dirty SICHTBAR — das ist die Wirkung des Terms in
  // settingsEqual, hier am Bedienweg statt an der reinen Funktion.
  it("UI3: die Wahl 'Dunkel' macht dirty sichtbar und reicht den Wert an saveProject", async () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    // Vorbedingung: noch nicht dirty.
    expect(screen.queryByText(/Ungespeicherte/i)).toBeNull();

    fireEvent.click(screen.getByRole("radio", { name: /Dunkel/ }));
    expect(screen.getAllByText(/Ungespeicherte/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    const args = saveProject.mock.calls[0] as unknown[];
    expect(args[3]).toEqual({ consent: { dialog: "bar", theme: "dark" } });
  });

  // UI4. Der Guard beim Projektwechsel greift — dieselbe dirty-Quelle.
  it("UI4: nach der Wahl fragt der Projektwechsel nach", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => false);
    try {
      render(
        <CodeImporter
          initialCode="<button>X</button>"
          initialProjectId="p1"
          initialProjects={[
            { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
            { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
          ]}
          initialSettings={{ consent: { dialog: "bar" } }}
        />,
      );
      openSettings();
      fireEvent.click(screen.getByRole("radio", { name: /Automatisch/ }));

      fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
      fireEvent.click(await screen.findByText("P2"));
      expect(confirmSpy).toHaveBeenCalledTimes(1);
      // Abgelehnt -> kein Laden des anderen Projekts.
      expect(loadProject).not.toHaveBeenCalled();
    } finally {
      confirmSpy.mockRestore();
    }
  });

  // UI5. Der unbekannte Wert: nichts markiert, roter Hinweis. ER TRAEGT ZUSAMMEN MIT PT1
  // UND PT2 DIE ACHSE, FUER DIE DER LIVE-SCHRITT ENTFALLEN IST (Freigabe F3).
  it("UI5: ein unbekannter Themenwert -> kein Radio markiert, Hinweis sichtbar", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "modal", theme: "__ps_x" } }}
      />,
    );
    openSettings();
    const gruppe = themenGruppe() as HTMLElement;
    for (const r of within(gruppe).getAllByRole("radio")) {
      expect((r as HTMLInputElement).checked).toBe(false);
    }
    expect(within(gruppe).getByText(/unbekannter Wert/i)).toBeTruthy();
    // POSITIVKONTROLLE im selben Lauf: mit einem gebauten Wert ist eins markiert und der
    // Hinweis weg.
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "modal", theme: "auto" } }}
      />,
    );
    openSettings();
    const g2 = themenGruppe() as HTMLElement;
    expect(
      within(g2)
        .getAllByRole("radio")
        .filter((r) => (r as HTMLInputElement).checked),
    ).toHaveLength(1);
    expect(within(g2).queryByText(/unbekannter Wert/i)).toBeNull();
  });

  // ===== DIE ZWEI FREIEN FARBEN (Scheibe 11.13c) ==================================
  // DIE ERWARTUNGEN STAMMEN AUS DEN ENTSCHEIDUNGEN P11.13-16 UND P11.13-22.
  // `PublishView.tsx` hat weiterhin KEINE eigene Testdatei (GEMESSEN, VERMERK P11.13-5);
  // die Abdeckung entsteht hier, durch den Container hindurch — wie bei UI1 bis UI5.

  // UI6. DIE SICHTBARKEITS-BEDINGUNG UND DIE VORBELEGUNG IN EINEM LAUF (Entscheidung
  // P11.13-22). BEIDE HAELFTEN GEHOEREN ZUSAMMEN: Ein Feld, das erscheint, ohne dass ein
  // Wert gespeichert wird, zeigte eine Farbe, die es im Blob nicht gibt — und das
  // Veroeffentlichen verweigerte anschliessend mit Verweis auf genau diese Anzeige.
  it("UI6: 'Eigene Farben' zeigt zwei Felder UND schreibt die Vorbelegung in den Blob", async () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    // Vorbedingung: noch keine Felder, noch nicht dirty.
    expect(screen.queryByLabelText("Hintergrundfarbe")).toBeNull();
    expect(screen.queryByText(/Ungespeicherte/i)).toBeNull();

    fireEvent.click(screen.getByRole("radio", { name: /Eigene Farben/ }));
    const hg = screen.getByLabelText("Hintergrundfarbe") as HTMLInputElement;
    const tx = screen.getByLabelText("Textfarbe") as HTMLInputElement;
    expect(hg.value).toBe("#ffffff");
    expect(tx.value).toBe("#111827");
    // DIE VORBELEGUNG IST EINE SCHREIBUNG, KEINE ANZEIGE: sie macht dirty …
    expect(screen.getAllByText(/Ungespeicherte/i).length).toBeGreaterThan(0);
    // … und sie steht im gespeicherten Blob.
    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    const args = saveProject.mock.calls[0] as unknown[];
    expect(args[3]).toEqual({
      consent: {
        dialog: "bar",
        theme: "custom",
        colorBackground: "#ffffff",
        colorText: "#111827",
      },
    });
  });

  // UI7. EIN GESPEICHERTES GUELTIGES PAAR WIRD NIE UEBERSCHRIEBEN (P11.13-22), und die
  // Wahl ueberlebt das Umschalten der Darstellung (P11.13-14). Spiegel von UI2.
  it("UI7: ein gueltiges Paar ueberlebt den Wechsel und wird nicht vorbelegt", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#010203",
            colorText: "#0a0b0c",
          },
        }}
      />,
    );
    openSettings();
    expect((screen.getByLabelText("Hintergrundfarbe") as HTMLInputElement).value).toBe(
      "#010203",
    );

    // Weg auf "Hell": die Felder verschwinden.
    fireEvent.click(screen.getByRole("radio", { name: /Hell/ }));
    expect(screen.queryByLabelText("Hintergrundfarbe")).toBeNull();

    // Und zurueck: die ALTE Wahl steht wieder da, NICHT die Vorbelegung.
    fireEvent.click(screen.getByRole("radio", { name: /Eigene Farben/ }));
    expect((screen.getByLabelText("Hintergrundfarbe") as HTMLInputElement).value).toBe(
      "#010203",
    );
    expect((screen.getByLabelText("Textfarbe") as HTMLInputElement).value).toBe(
      "#0a0b0c",
    );
  });

  // UI8. DIE WAHL EINER FARBE IST FUER dirty SICHTBAR — die Wirkung der zwei Terme in
  // settingsEqual, hier am Bedienweg statt an der reinen Funktion (Pflicht-Mutation M-d).
  it("UI8: eine geaenderte Farbe macht dirty sichtbar und geht an saveProject", async () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#ffffff",
            colorText: "#111827",
          },
        }}
      />,
    );
    openSettings();
    expect(screen.queryByText(/Ungespeicherte/i)).toBeNull();

    fireEvent.change(screen.getByLabelText("Textfarbe"), {
      target: { value: "#00ff00" },
    });
    expect(screen.getAllByText(/Ungespeicherte/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: /^Speichern/ }));
    await screen.findByRole("button", { name: /Gespeichert/ });
    const args = saveProject.mock.calls[0] as unknown[];
    expect(args[3]).toEqual({
      consent: {
        dialog: "bar",
        theme: "custom",
        colorBackground: "#ffffff",
        colorText: "#00ff00",
      },
    });
  });

  // UI9. BEIM LADEN WIRD NICHTS VORBELEGT (P11.13-22): Steht im Blob bereits "custom" mit
  // einem kaputten Wert, zeigt das Feld den hellen Bestand und DANEBEN den roten Hinweis —
  // geschrieben wird dabei NICHTS, und dirty entsteht nicht.
  it("UI9: geladener kaputter Farbwert -> roter Hinweis, keine Schreibung, nicht dirty", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: { dialog: "bar", theme: "custom", colorBackground: "#FFF" },
        }}
      />,
    );
    openSettings();
    expect(screen.getByText(/unbekannter Farbwert/i)).toBeTruthy();
    expect(screen.queryByText(/Ungespeicherte/i)).toBeNull();
    // POSITIVKONTROLLE im selben Lauf: mit zwei gueltigen Werten ist der Hinweis weg.
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#ffffff",
            colorText: "#111827",
          },
        }}
      />,
    );
    openSettings();
    expect(screen.queryByText(/unbekannter Farbwert/i)).toBeNull();
  });

  // UI10. DER KONTRAST-HINWEIS ERSCHEINT UND SPERRT NICHTS (Entscheidung P11.13-16).
  // DIE ZWEITE HAELFTE IST DIE TRAGENDE: Ein Hinweis, der den Knopf abschaltete, waere
  // ein Riegel — und genau den schliesst die Entscheidung aus. Der Text nennt WERT und
  // SCHWELLE, keine Ursache und keine Rechtsfolge.
  it("UI10: unter der Schwelle erscheint der Hinweis, und Veroeffentlichen bleibt bedienbar", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#ffffff",
            colorText: "#808080",
          },
        }}
      />,
    );
    openSettings();
    // 3,94:1 gegen Weiss (GELESEN bei WebAIM, s. contrast.test.ts) — unter 4,5.
    // GEPRUEFT AM textContent DER GRUPPE, nicht an einem Textknoten: React zerlegt den
    // Satz an der eingesetzten Zahl in mehrere Knoten, und getByText sieht je einen.
    expect(themenGruppe()?.textContent).toContain("Kontrast 3,94:1");
    expect(themenGruppe()?.textContent).toContain("die Schwelle ist 4,5:1");
    // DER HINWEIS SPERRT NICHTS — UND DAS WIRD ALS UNTERSCHIED GEMESSEN, nicht als
    // absoluter Zustand: Ob der Knopf ueberhaupt bedienbar ist, haengt an ganz anderen
    // Bedingungen (gespeichertes Projekt, leere Seite). Die Zusage dieser Entscheidung
    // ist, dass der KONTRAST daran nichts aendert.
    const knopf = () =>
      screen.getByRole("button", {
        name: /^(Veröffentlichen|Erneut veröffentlichen)$/,
      }) as HTMLButtonElement;
    const gesperrtMitHinweis = knopf().disabled;

    // POSITIVKONTROLLE im selben Lauf: ueber der Schwelle steht kein Hinweis …
    fireEvent.change(screen.getByLabelText("Textfarbe"), {
      target: { value: "#111827" },
    });
    expect(themenGruppe()?.textContent).not.toContain("Kontrast");
    // … und der Knopf ist GENAUSO bedienbar wie vorher.
    expect(knopf().disabled).toBe(gesperrtMitHinweis);
  });

  // UI11. DER GEMISCHTE ZUSTAND: EINE Farbe gueltig, EINE ungueltig — und er ist der
  // Grund, warum `farbenUnbekannt` mit ODER und nicht mit UND gebildet ist.
  // WAS HIER SCHIEFGEHEN KANN: `contrastRatio` WIRFT bei allem, was nicht `#rrggbb` ist
  // (CT4 in contrast.test.ts). Wuerde der Hinweis auch nur EINEN "unknown"-Wert in die
  // Rechnung geben, wuerfe das Rendern — und der Betreiber saehe statt seiner Einstellung
  // eine kaputte Seite.
  // DER WURF IST HIER KEINE EIGENE ZUSICHERUNG, SONDERN DIE VORBEDINGUNG DES GANZEN
  // LAUFS: Wirft das Rendern, faellt dieser Test, bevor eine Abfrage laeuft. Das gehoert
  // in den Kommentar, damit niemand ihn spaeter um ein `expect(...).not.toThrow()`
  // "ergaenzt", das nichts hinzufuegt.
  // UI9 FAENGT DIESEN FALL NICHT: Dort sind BEIDE Werte ungueltig, und die Rechnung
  // unterbliebe auch bei einer UND-Verknuepfung.
  it("UI11: eine ungueltige neben einer gueltigen Farbe -> roter Hinweis, KEIN Kontrast-Hinweis", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#ffffff",
            colorText: "#GGGGGG",
          },
        }}
      />,
    );
    openSettings();
    // Die Flaeche steht, die Felder stehen — das Rendern ist durchgelaufen.
    expect(screen.getByLabelText("Hintergrundfarbe")).toBeTruthy();
    expect(screen.getByLabelText("Textfarbe")).toBeTruthy();
    expect(screen.getByText(/unbekannter Farbwert/i)).toBeTruthy();
    // UND KEIN KONTRAST-HINWEIS: ueber einen halb ungueltigen Zustand gibt es keine Zahl.
    expect(themenGruppe()?.textContent).not.toContain("Kontrast");

    // POSITIVKONTROLLE im selben Lauf: mit ZWEI gueltigen, knapp scheiternden Werten
    // steht der Kontrast-Hinweis sehr wohl — die Abfrage oben prueft also etwas.
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: {
            dialog: "bar",
            theme: "custom",
            colorBackground: "#ffffff",
            colorText: "#777777",
          },
        }}
      />,
    );
    openSettings();
    expect(themenGruppe()?.textContent).toContain("Kontrast 4,47:1");
    expect(screen.queryByText(/unbekannter Farbwert/i)).toBeNull();
  });

  // ===================================================================================
  // DER FREIE SACHTEXT (Phase 11.13, Scheibe 11.13d) — UI12 bis UI15.
  // `PublishView.tsx` hat weiterhin KEINE eigene Testdatei; die Abdeckung der
  // Einwilligungs-Flaeche entsteht hier (Pflicht 4 des Zuschnitts).
  // ===================================================================================

  // UI12. DAS FELD IST DA, ES HAENGT NICHT AN "custom", UND DER PLATZHALTER IST UNSER
  // STANDARDTEXT (Entscheidung P11.13-23, Plan-Frage 5).
  // WODURCH ROT: wenn das Feld an die Darstellung gebunden wuerde — dann saehe ein
  // Betreiber mit "hell" seinen eigenen Satz nirgends —, oder wenn der Platzhalter
  // abgeschrieben statt importiert wuerde und auseinanderliefe.
  it("UI12: das Sachtext-Feld steht bei JEDER Darstellung, mit unserem Satz als Platzhalter", () => {
    for (const theme of ["light", "dark", "auto", "custom"]) {
      cleanup();
      render(
        <CodeImporter
          initialCode="<button>X</button>"
          initialProjectId="p1"
          initialSettings={{
            consent: {
              dialog: "bar",
              theme,
              colorBackground: "#ffffff",
              colorText: "#111827",
            },
          }}
        />,
      );
      openSettings();
      const feld = screen.getByLabelText(
        "Erläuternder Text",
      ) as HTMLInputElement;
      expect(feld, theme).toBeTruthy();
      expect(feld.value, theme).toBe("");
      expect(feld.placeholder, theme).toBe(
        "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.",
      );
    }
    // POSITIVKONTROLLE im selben Lauf: bei AUSGESCHALTETEM Dialog gibt es das Feld
    // nicht — sonst waere die Abfrage oben auch dann gruen, wenn sie irgendetwas
    // anderes traefe.
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "off" } }}
      />,
    );
    openSettings();
    expect(screen.queryByLabelText("Erläuternder Text")).toBeNull();
  });

  // UI13. EIN GELEERTES FELD ENTFERNT DEN WERT UND SCHREIBT NIE EINEN LEEREN STRING
  // (Entscheidung P11.13-26). WODURCH ROT: wenn der Handler den Rohwert durchreicht —
  // dann stuende ein leerer String im Blob, der Leser lieferte "unknown", und das
  // Veroeffentlichen waere gesperrt, obwohl der Betreiber nur zurueck auf unseren Satz
  // wollte.
  it("UI13: tippen setzt den Wert, leeren entfernt ihn — und beides macht dirty", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    const feld = screen.getByLabelText("Erläuternder Text") as HTMLInputElement;
    fireEvent.change(feld, { target: { value: "Mein eigener Satz." } });
    expect(
      (screen.getByLabelText("Erläuternder Text") as HTMLInputElement).value,
    ).toBe("Mein eigener Satz.");
    expect(screen.getByText(/Ungespeicherte Änderungen/i)).toBeTruthy();
    // Leeren -> das Feld zeigt wieder den Platzhalter, kein leerer String im Blob.
    fireEvent.change(feld, { target: { value: "" } });
    expect(
      (screen.getByLabelText("Erläuternder Text") as HTMLInputElement).value,
    ).toBe("");
    // NUR LEERZEICHEN GILT ALS LEER — sonst laege ein Wert im Blob, den das Tor
    // abweist, waehrend das Feld leer aussieht.
    fireEvent.change(feld, { target: { value: "   " } });
    expect(screen.queryByText(/Steuerzeichen/i)).toBeNull();
    expect(screen.queryByText(/unbrauchbarer Wert/i)).toBeNull();
  });

  // UI14. DER ZEICHENZAEHLER LIEST N AUS DER KONSTANTE UND ZAEHLT MIT DERSELBEN FUNKTION
  // WIE DAS TOR (Entscheidung P11.13-27). WODURCH ROT: wenn jemand eine zweite Zaehlung
  // einzieht oder die Zahl hinschreibt — dann liefen Anzeige und Tor STILL auseinander.
  it("UI14: der Zaehler zeigt Codepunkte und die Grenze aus der Konstante", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    const feld = screen.getByLabelText("Erläuternder Text") as HTMLInputElement;
    expect(themenGruppe()?.textContent).toContain(
      `0 von ${CONSENT_TEXT_MAX_LENGTH} Zeichen`,
    );
    fireEvent.change(feld, { target: { value: "abc" } });
    expect(themenGruppe()?.textContent).toContain(
      `3 von ${CONSENT_TEXT_MAX_LENGTH} Zeichen`,
    );
    // EIN EMOJI IST EIN ZEICHEN, nicht zwei — das ist die ganze Zusage von P11.13-27.
    fireEvent.change(feld, {
      target: { value: String.fromCodePoint(0x1f600) },
    });
    expect(themenGruppe()?.textContent).toContain(
      `1 von ${CONSENT_TEXT_MAX_LENGTH} Zeichen`,
    );
  });

  // UI15. DER ROTE HINWEIS NENNT DIE ZEICHENKLASSE UND ERSCHEINT AUS DEM GRUND, DEN AUCH
  // DAS TOR NENNT (Plan-Frage 5; er kommt aus consentTextProblem, also aus DERSELBEN
  // Funktion wie der Abbruch in publishProject).
  // WODURCH ROT: wenn eine zweite, gleichlautende Bedingung in der Ansicht entsteht —
  // dann saehe der Betreiber einen Hinweis, der nicht zur Verweigerung passt, oder
  // keinen, wo verweigert wird.
  it("UI15: gespeicherte Steuerzeichen und Ueberlaenge erzeugen je ihren eigenen Hinweis", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: { dialog: "bar", text: "a" + String.fromCharCode(0x0a) + "b" },
        }}
      />,
    );
    openSettings();
    // Das Feld ZEIGT den gespeicherten Wert — auch den ungueltigen, sonst kann der
    // Betreiber ihn nicht korrigieren.
    // EIN BEFUND, GEMESSEN IN DIESEM LAUF (CC, 2026-09-18): Ein einzeiliges
    // `input[type="text"]` ENTFERNT Zeilenumbrueche aus seinem `value` — der
    // gespeicherte Wert traegt das Steuerzeichen, das FELD zeigt "ab". DER BETREIBER
    // SIEHT DAS UNSICHTBARE ZEICHEN ALSO NICHT, und genau deshalb steht der rote Hinweis
    // daneben; er ist hier nicht Beiwerk, sondern das einzige, was den Zustand erklaert.
    // (Es ist zugleich ein kleines Argument FUER die einzeilige Gestalt aus Plan-Frage 5:
    // Das Bedienelement selbst nimmt die verbotene Klasse gar nicht erst an.)
    expect(
      (screen.getByLabelText("Erläuternder Text") as HTMLInputElement).value,
    ).toBe("ab");
    expect(screen.getByText(/Steuerzeichen/i)).toBeTruthy();

    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: { dialog: "bar", text: "W".repeat(CONSENT_TEXT_MAX_LENGTH + 1) },
        }}
      />,
    );
    openSettings();
    expect(screen.getByText(/länger als/i)).toBeTruthy();

    // POSITIVKONTROLLE im selben Lauf: ein GUELTIGER Text mit "<" erzeugt KEINEN
    // Hinweis — das Tor laesst ihn durch, und der Helfer maskiert ihn (Invariante S4).
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{
          consent: { dialog: "bar", text: "Wir setzen <3 Cookies" },
        }}
      />,
    );
    openSettings();
    expect(screen.queryByText(/Steuerzeichen/i)).toBeNull();
    expect(screen.queryByText(/länger als/i)).toBeNull();
    expect(screen.queryByText(/unbrauchbarer Wert/i)).toBeNull();
  });

  // ===================================================================================
  // DIE SPRACHE (Phase 11.13, Scheibe 11.13e) — UI16 bis UI19.
  // `PublishView.tsx` hat weiterhin KEINE eigene Testdatei; die Abdeckung der
  // Einwilligungs-Flaeche entsteht hier (Pflicht 4 des Zuschnitts).
  // ACHTUNG — DIE BESCHRIFTUNGEN "Sprache", "Deutsch" und "Englisch" SIND
  // APP-OBERFLAECHE UND KEIN AUSGELIEFERTER TEXT. Sie fallen NICHT unter Entscheidung
  // P11.13-31; ihre Freigabe steht aus.
  // ===================================================================================

  function sprachGruppe() {
    return screen.queryByRole("radiogroup", { name: "Sprache" });
  }

  // UI16. SICHTBAR BEI EINGESCHALTETEM DIALOG, MIT "Deutsch" ALS VORGABE — und
  // AUSSERHALB der Radiogruppe "Darstellung".
  // DIE LETZTE HAELFTE IST KEIN DETAIL: Eine verschachtelte Radiogruppe machte
  // `within(Darstellung).getAllByRole("radio")` von vier auf sechs und damit UI1 rot.
  // Das waere ein OBERFLAECHEN-Problem, kein Testproblem (docs/immer-beachten.md, ZWEI
  // BEDIENELEMENTE MIT GLEICHEM NAMEN …) — der Test haelt die Trennung fest.
  it("UI16: bei 'Leiste' steht die Gruppe 'Sprache' mit ZWEI Optionen, 'Deutsch' gewaehlt — getrennt von 'Darstellung'", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar" } }}
      />,
    );
    openSettings();
    const gruppe = sprachGruppe();
    expect(gruppe).not.toBeNull();
    const radios = within(gruppe as HTMLElement).getAllByRole("radio");
    expect(radios).toHaveLength(2);
    expect((radios[0] as HTMLInputElement).checked).toBe(true);
    expect((radios[1] as HTMLInputElement).checked).toBe(false);
    // DIE TRENNUNG: die Darstellungs-Gruppe traegt weiterhin GENAU VIER Radios.
    expect(
      within(themenGruppe() as HTMLElement).getAllByRole("radio"),
    ).toHaveLength(4);
  });

  // UI17. UNSICHTBAR BEI "Aus" — dieselbe Sichtbarkeits-Bedingung wie Darstellung und
  // Sachtext. DER WERT IM BLOB BLEIBT dabei erhalten; das prueft der Publish-Weg.
  it("UI17: bei 'Aus' gibt es die Gruppe 'Sprache' nicht", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "off", language: "en" } }}
      />,
    );
    openSettings();
    expect(sprachGruppe()).toBeNull();
    // POSITIVKONTROLLE im selben Lauf: mit eingeschaltetem Dialog ist sie da, und die
    // gespeicherte Wahl steht vorgewaehlt — der Wert hat das Ausschalten ueberlebt.
    cleanup();
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar", language: "en" } }}
      />,
    );
    openSettings();
    const radios = within(sprachGruppe() as HTMLElement).getAllByRole("radio");
    expect((radios[1] as HTMLInputElement).checked).toBe(true);
  });

  // UI18. DER BEDIENWEG MACHT dirty (Pflicht-Mutation "settingsEqual-Term entfernt").
  // ER IST DIE ZWEITE HAELFTE ZU CL2: Jener prueft die reine Funktion, dieser den WEG —
  // Klick, setSettings, dirty. Ohne den Term bliebe die Wahl still liegen.
  // DAS INSTRUMENT IST DER BESTAETIGUNGS-DIALOG BEIM PROJEKTWECHSEL: Er erscheint NUR bei
  // dirty. Dieselbe Bauform wie UI4 fuer den Themenwert.
  it("UI18: ein Klick auf 'Englisch' macht dirty — der Projektwechsel fragt nach", async () => {
    const confirmSpy = vi
      .spyOn(window, "confirm")
      .mockImplementation(() => false);
    try {
      render(
        <CodeImporter
          initialCode="<button>X</button>"
          initialProjectId="p1"
          initialProjects={[
            { id: "p1", name: "P1", updated_at: "2026-09-18T00:00:00Z" },
            { id: "p2", name: "P2", updated_at: "2026-09-18T00:00:00Z" },
          ]}
          initialSettings={{ consent: { dialog: "bar" } }}
        />,
      );
      openSettings();
      fireEvent.click(screen.getByRole("radio", { name: /Englisch/ }));

      fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
      fireEvent.click(await screen.findByText("P2"));
      expect(confirmSpy).toHaveBeenCalledTimes(1);
      expect(loadProject).not.toHaveBeenCalled();
    } finally {
      confirmSpy.mockRestore();
    }
  });

  // UI19. ZWEI ACHSEN IN EINEM LAUF: (a) der unbekannte Wert — nichts markiert, roter
  // Hinweis; (b) DER PLATZHALTER DES SACHTEXT-FELDS FOLGT DER SPRACHE (bindende
  // Entscheidung P11.13-34).
  // (b) IST DIE EIGENTLICHE SACHE: Ohne sie saehe ein Betreiber mit englischem Dialog im
  // Editor den deutschen Satz als Platzhalter — also etwas anderes, als seine Seite zeigt.
  // DIE ZWEI SAETZE STEHEN ALS LITERAL AUS ENTSCHEIDUNG P11.13-31 (Invariante Q5).
  it("UI19: unbekannte Sprache -> nichts markiert und Hinweis; und der Platzhalter folgt der Sprache", () => {
    render(
      <CodeImporter
        initialCode="<button>X</button>"
        initialProjectId="p1"
        initialSettings={{ consent: { dialog: "bar", language: "__ps_x" } }}
      />,
    );
    openSettings();
    const gruppe = sprachGruppe() as HTMLElement;
    for (const r of within(gruppe).getAllByRole("radio")) {
      expect((r as HTMLInputElement).checked).toBe(false);
    }
    expect(within(gruppe).getByText(/unbekannter Wert/i)).toBeTruthy();

    // (b) DER PLATZHALTER, je Sprache.
    for (const [language, satz] of [
      [
        "de",
        "Diese Seite kann Tracking-Dienste einbinden. Du entscheidest, ob das geschieht.",
      ],
      ["en", "This site can use tracking services. You decide whether that happens."],
    ] as const) {
      cleanup();
      render(
        <CodeImporter
          initialCode="<button>X</button>"
          initialProjectId="p1"
          initialSettings={{ consent: { dialog: "bar", language } }}
        />,
      );
      openSettings();
      expect(
        (screen.getByLabelText("Erläuternder Text") as HTMLInputElement)
          .placeholder,
        language,
      ).toBe(satz);
    }
  });

});

// =====================================================================
// SCHEIBE 11.11a — DER SANDBOX-WAECHTER (2026-09-21).
//
// WAS ER ZUSICHERT, je Rahmen, der importierten oder erzeugten Kundencode
// rendert: das Attribut sandbox EXISTIERT · allow-same-origin FEHLT ·
// allow-scripts ist VORHANDEN · und die Werteliste ist ABSCHLIESSEND.
//
// ER IST EIN EINZELSTUECK, UND DAS GEHOERT IN SEINEN KOMMENTAR (Lektion (f) an
// MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE): GEMESSEN am Repo (CC, 2026-09-21)
// hat vor dieser Scheibe KEIN Test im Repo eine Zusicherung ueber sandbox
// getragen — der einzige Treffer des Wortes in einer Testdatei stand in einem
// KOMMENTAR (preview-storage-shim.test.ts). Wer diesen Block loescht, weil er
// redundant aussieht, nimmt die EINZIGE Abdeckung der Dauerregel mit:
// "Importierter User-Code laeuft NUR im sandboxed iframe (sandbox=allow-scripts,
// niemals allow-same-origin), nie ungesandboxt" (docs/immer-beachten.md).
//
// SEINE GRENZE, und sie steht an ihm selbst statt in einem Bericht: Er prueft
// das im TEST GERENDERTE ATTRIBUT, nicht das Verhalten eines Browsers. jsdom
// setzt keine Sandbox durch. GEMESSEN (CC, 2026-09-21, jsdom 29.1.1): die
// Eigenschaft iframe.sandbox ist dort `undefined` — es gibt KEIN DOMTokenList.
// Ein Lauf der Form `frame.sandbox?.contains(...)` waere deshalb TRIVIAL WAHR
// und wuerde NIE rot (docs/immer-beachten.md, EINE ABWESENHEITS-BEHAUPTUNG WIRD
// AUF DREI WEISEN HOHL, Fall (2)). Gelesen wird ausschliesslich ueber
// getAttribute.
//
// DIE HERKUNFT JEDES WERTS — sie geht aus dem Code nicht hervor und steht
// deshalb hier:
// · allow-scripts (Pflicht) und das Verbot von allow-same-origin kommen aus der
//   Dauerregel oben. Das ist die SICHERHEITS-Achse, und sie ist nicht
//   verhandelbar.
// · allow-popups und allow-popups-to-escape-sandbox am Vorschau-Rahmen sind
//   EINGEFRORENER BESTAND. Ihre NOTWENDIGKEIT IST UNGEMESSEN; der Kommentar am
//   Rahmen nennt als Grund einen echten Top-Level-Tab bei window.open.
// WER EINEN DER ZWEI ENTFERNT, BRAUCHT EINE MESSUNG. WER EINEN WERT HINZUFUEGT,
// BRAUCHT EINE ENTSCHEIDUNG — JEDE ERWEITERUNG EINER SANDBOX IST EINE LOCKERUNG.
//
// WARUM DIE LISTE ABSCHLIESSEND IST (ARCHITEKT-ENTSCHEIDUNG 2026-09-21): Ohne
// den Abschluss faengt KEIN Lauf einen HINZUGEFUEGTEN Wert. Ein
// allow-top-navigation liefe an "allow-scripts vorhanden" und an
// "allow-same-origin fehlt" vorbei und waere STILL. Der Preis ist benannt: Der
// Abschluss-Lauf wird bei JEDER Erweiterung rot — das ist die Absicht, nicht
// sein Mangel.
//
// DIE ERWARTUNG IST GETIPPT, NICHT IMPORTIERT (docs/immer-beachten.md, EIN
// WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE): Sie
// stammt aus der Entscheidung. Ein Import aus dem Produktivcode machte den
// Waechter zum SPIEGEL, der jede Aenderung bestaetigt, statt sie zu fangen.
// =====================================================================

/**
 * Die ABSCHLIESSENDE Werteliste je Rahmen — getippt aus der Entscheidung vom
 * 2026-09-21, NICHT aus dem Produktivcode abgelesen.
 */
const SANDBOX_SOLL = {
  bearbeiten: ["allow-scripts"],
  vorschau: [
    "allow-scripts",
    "allow-popups",
    "allow-popups-to-escape-sandbox",
  ],
} as const;

/** Der Wert, der an KEINEM Rahmen stehen darf — er hebt die Sandbox faktisch auf. */
const SANDBOX_VERBOTEN = "allow-same-origin";

/** Der Wert, ohne den in der Vorschau nichts laeuft. */
const SANDBOX_PFLICHT = "allow-scripts";

/**
 * Zerlegt den ROHEN Attributwert in seine Werte: kleingeschrieben (sandbox-Werte
 * sind ASCII-case-insensitiv — ABLEITUNG aus der Spezifikation, NICHT gemessen),
 * an Leerraum getrennt, leere Eintraege verworfen.
 * NIE ueber eine Teilzeichenkette: ein `includes("allow-same-origin")` auf dem
 * Rohstring ist zugleich zu weit (traefe einen laengeren Wert, der ihn enthaelt)
 * und zu eng (traefe die Grossschreibung nicht).
 */
function sandboxWerte(roh: string | null): string[] {
  return (roh ?? "")
    .toLowerCase()
    .split(/\s+/)
    .filter((wert) => wert !== "");
}

/** Der Bearbeiten-Rahmen ist IMMER gemountet — kein Umschalter noetig. */
function bearbeitenRahmen(): HTMLIFrameElement {
  render(<CodeImporter initialCode="<button>X</button>" />);
  return screen.getByTitle("preview") as HTMLIFrameElement;
}

/**
 * Der Vorschau-Rahmen entsteht erst mit previewMode="functional" und haengt am
 * entprellten Code — deshalb der Umschalter UND findBy* (pollt, kein fixer Wait).
 * Bewusst ein EIGENER Helfer: vorschauSrcdoc/vorschauDoc gehoeren anderen
 * describe-Bloecken und bleiben unangetastet.
 */
async function vorschauRahmen(): Promise<HTMLIFrameElement> {
  render(<CodeImporter initialCode="<button>X</button>" />);
  fireEvent.click(screen.getByRole("button", { name: "Vorschau" }));
  return (await screen.findByTitle(
    "functional-preview",
  )) as HTMLIFrameElement;
}

describe("Scheibe 11.11a — der Sandbox-Waechter", () => {
  describe("Bearbeiten-Rahmen (title=preview)", () => {
    it("S1: das Attribut sandbox EXISTIERT", () => {
      // ZUERST, WEIL SEIN FEHLEN DER GEFAEHRLICHSTE FALL IST: ein Rahmen ohne
      // Attribut ist UNGESANDBOXT, und jede Wert-Pruefung liefe auf einer leeren
      // Liste freundlich durch (S2 waere dann trivial wahr).
      expect(bearbeitenRahmen().hasAttribute("sandbox")).toBe(true);
    });

    it("S2: allow-same-origin FEHLT", () => {
      const werte = sandboxWerte(bearbeitenRahmen().getAttribute("sandbox"));
      // POSITIVKONTROLLE IM SELBEN LAUF: ohne sie prueft die Abwesenheit nur,
      // dass eine leere Liste nichts enthaelt.
      expect(werte.length).toBeGreaterThan(0);
      expect(werte).not.toContain(SANDBOX_VERBOTEN);
    });

    it("S3: allow-scripts ist VORHANDEN", () => {
      expect(
        sandboxWerte(bearbeitenRahmen().getAttribute("sandbox")),
      ).toContain(SANDBOX_PFLICHT);
    });

    it("S4: die Werteliste ist ABSCHLIESSEND — genau {allow-scripts}", () => {
      // DER EINZIGE LAUF, DER EINEN HINZUGEFUEGTEN WERT FAENGT. Sortiert
      // verglichen, damit die REIHENFOLGE im Attribut nicht mitgeprueft wird —
      // sie traegt keine Bedeutung.
      expect(
        sandboxWerte(bearbeitenRahmen().getAttribute("sandbox")).sort(),
      ).toEqual([...SANDBOX_SOLL.bearbeiten].sort());
    });
  });

  describe("Vorschau-Rahmen (title=functional-preview)", () => {
    it("V1: das Attribut sandbox EXISTIERT", async () => {
      expect((await vorschauRahmen()).hasAttribute("sandbox")).toBe(true);
    });

    it("V2: allow-same-origin FEHLT", async () => {
      const werte = sandboxWerte(
        (await vorschauRahmen()).getAttribute("sandbox"),
      );
      expect(werte.length).toBeGreaterThan(0);
      expect(werte).not.toContain(SANDBOX_VERBOTEN);
    });

    it("V3: allow-scripts ist VORHANDEN", async () => {
      expect(
        sandboxWerte((await vorschauRahmen()).getAttribute("sandbox")),
      ).toContain(SANDBOX_PFLICHT);
    });

    it("V4: die Werteliste ist ABSCHLIESSEND — genau die drei entschiedenen Werte", async () => {
      expect(
        sandboxWerte((await vorschauRahmen()).getAttribute("sandbox")).sort(),
      ).toEqual([...SANDBOX_SOLL.vorschau].sort());
    });
  });
});

// =============================================================================
// EIGENE PAGESMITH-BAUSTEINE IM IMPORTIERTEN TEXT (Phase 11.11, Scheibe 11.11d)
//
// DIE FIXTURE WIRD VOM ECHTEN ERZEUGER GEBAUT, nicht nachgebaut: Der Gegenstand dieser
// Scheibe ist der WIEDER IMPORTIERTE EIGENE EXPORT, und ein handgeschriebener
// Schnipsel waere eine Attrappe in einer Gestalt, die es im Betrieb nicht gibt.
//
// DIE ERWARTETEN WORTLAUTE SIND GETIPPT, NICHT AUS own-blocks.ts IMPORTIERT — ein
// Import machte diese Laeufe zum SPIEGEL, der jeden Tippfehler bestaetigt
// (docs/immer-beachten.md, EIN WAECHTER UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG
// NIE AUS DEM CODE). Quelle der Wortlaute: ENTSCHEIDUNG P11.11-22, Punkt (e).
// =============================================================================
describe("CodeImporter — eigene Bausteine aus einem frueheren Export (11.11d)", () => {
  const SAUBER =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head>\n' +
    "<body>\n" +
    '  <h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>\n' +
    '  <button data-pagesmith-id="ps-bbbbbb">Kaufen</button>\n' +
    "</body></html>";

  // Ein echtes Export-Dokument — das, was ein Betreiber herunterlaedt und wieder
  // importiert.
  const MIT_BAUSTEINEN = generateFunctional(
    SAUBER,
    [
      {
        elementId: "ps-bbbbbb",
        type: "redirect",
        config: { url: "https://example.com/x", openInNewTab: false },
      },
    ],
    "export",
    { metaPixelId: "1234567890", trackingKey: "tk-alt", capiProxyUrl: "/api/e" },
  );

  const WARNUNG =
    "Dieser Code enthält Pagesmith-Bausteine aus einem früheren Export. Sie senden Conversions an das ursprüngliche Projekt und würden sich beim Veröffentlichen verdoppeln.";
  const KNOPF = "Pagesmith-Bausteine entfernen";
  const EXPORT_GESPERRT =
    "Export gesperrt: Der Code enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie zuerst.";
  const PUBLISH_NEUTRAL =
    "Veröffentlichen gesperrt: Der Code enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";
  const PUBLISH_B =
    "Veröffentlichen gesperrt: Variante B enthält noch Pagesmith-Bausteine aus einem früheren Export. Entferne sie im Bereich Bauen.";
  const REST_SATZ =
    "Nicht alles ließ sich automatisch entfernen. Bitte diese Stellen von Hand löschen:";

  const oeffneEinstellungen = () =>
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
  const publishKnopf = () =>
    screen.getByRole("button", {
      name: /^(Veröffentlichen|Erneut veröffentlichen)$/,
    }) as HTMLButtonElement;

  it("U1: Code MIT Bausteinen -> Warnung und Knopf stehen da", async () => {
    // POSITIVKONTROLLE: die Fixture traegt wirklich Bausteine.
    expect(MIT_BAUSTEINEN).toContain('id="pagesmith-mappings"');
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    expect(await screen.findByText(WARNUNG)).toBeTruthy();
    expect(screen.getByRole("button", { name: KNOPF })).toBeTruthy();
  });

  it("U2: der Knopf entfernt sie aus dem Editor-Text, und die Warnung verschwindet", async () => {
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    await screen.findByText(WARNUNG);
    fireEvent.click(screen.getByRole("button", { name: KNOPF }));

    await waitFor(() => expect(screen.queryByText(WARNUNG)).toBeNull());
    expect(screen.queryByRole("button", { name: KNOPF })).toBeNull();
    // Der Text im Editor traegt die Bausteine wirklich nicht mehr …
    const feld = document.querySelector("textarea") as HTMLTextAreaElement;
    expect(feld.value).not.toContain('id="pagesmith-mappings"');
    expect(feld.value).not.toContain('id="pagesmith-consent"');
    // … die Inhalte des Betreibers aber schon.
    expect(feld.value).toContain('data-pagesmith-id="ps-bbbbbb"');
    expect(feld.value).toContain("Kaufen");
  });

  it("U3: sauberer Code -> WEDER Warnung NOCH Knopf (mit Positivkontrolle)", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={SAUBER} />);
    // DER ANKER IST DER ZUSTAND NACH DER ENTPRELLUNG, NICHT IRGENDEINER DAVOR: Die
    // Warnung haengt an debouncedCode, und der ist beim ersten Render noch "". Ein
    // Anker, den auch der ALTE Zustand erfuellt, macht diese Abwesenheits-Zusicherung
    // trivial wahr (docs/immer-beachten.md, EINE VORBEDINGUNG, DIE AUCH DER ALTE
    // ZUSTAND ERFUELLT, IST KEINE VORBEDINGUNG). "(2)" kann nur der verarbeitete Code
    // herstellen: ein Button und eine Ueberschrift.
    await screen.findByText("Erkannte Elemente (2)");
    expect(screen.queryByText(WARNUNG)).toBeNull();
    expect(screen.queryByRole("button", { name: KNOPF })).toBeNull();
  });

  it("U4: der Veroeffentlichen-Knopf ist gesperrt und nennt den Grund", async () => {
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    await screen.findByText(WARNUNG);
    oeffneEinstellungen();
    await waitFor(() => expect(publishKnopf().disabled).toBe(true));
    expect(document.body.textContent).toContain(PUBLISH_NEUTRAL);
  });

  it("U4b: der Knopf ist bei sauberem Code NICHT gesperrt — Gegenprobe zu U4", async () => {
    // Ohne diese Gegenprobe waere U4 von einem Knopf, der IMMER gesperrt ist, nicht zu
    // unterscheiden.
    render(<CodeImporter initialProjectId="proj-1" initialCode={SAUBER} />);
    await screen.findByText("Erkannte Elemente (2)");
    oeffneEinstellungen();
    // "false" ist hier ein tauglicher Anker: VOR der Entprellung ist der Knopf wegen
    // des Leer-Riegels gesperrt, der Zustand ist also unterscheidbar.
    await waitFor(() => expect(publishKnopf().disabled).toBe(false));
    expect(document.body.textContent).not.toContain(PUBLISH_NEUTRAL);
  });

  it("U4c: liegt der Fund in der INAKTIVEN Variante B, nennt die Meldung B", async () => {
    // Der Fall, fuer den Entscheidung P11.11-22, Punkt (d) die Variantenangabe
    // verlangt: Die Warnung im Bereich BAUEN zeigt NUR die aktive Variante — ohne den
    // Variantennamen saehe der Betreiber eine Sperre ohne sichtbare Ursache.
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={SAUBER}
        initialVariantBHtml={MIT_BAUSTEINEN}
        initialVariantBMappings={[]}
      />,
    );
    await screen.findByText("Erkannte Elemente (2)");
    oeffneEinstellungen();
    // DER ANKER IST DIE MELDUNG SELBST, NICHT "der Knopf ist gesperrt": Gesperrt ist
    // er VOR der Entprellung schon, und zwar vom LEER-Riegel (debouncedCode ist beim
    // ersten Render ""). Ein Anker, den auch der alte Zustand erfuellt, trennt VORHER
    // nicht von NACHHER — dieser Lauf ist beim ersten Wurf genau daran gescheitert.
    await screen.findByText(PUBLISH_B);
    expect(publishKnopf().disabled).toBe(true);
    expect(document.body.textContent).not.toContain(PUBLISH_NEUTRAL);
    // Die Warnung im Bereich BAUEN steht NICHT da — A ist sauber.
    expect(screen.queryByText(WARNUNG)).toBeNull();
  });

  it("U5: der Export-Download wird verweigert und meldet es", async () => {
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    await screen.findByText(WARNUNG);
    const erzeugt = vi
      .spyOn(URL, "createObjectURL")
      .mockReturnValue("blob:test");
    fireEvent.click(screen.getByRole("button", { name: "Projekt exportieren" }));
    await screen.findByText(EXPORT_GESPERRT);
    // … und es ist WIRKLICH nichts erzeugt worden.
    expect(erzeugt).not.toHaveBeenCalled();
    erzeugt.mockRestore();
  });

  it("U6: das Kopieren wird verweigert und meldet es", async () => {
    const writeText = vi.fn(async () => undefined);
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText },
      configurable: true,
    });
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    await screen.findByText(WARNUNG);
    fireEvent.click(
      screen.getByRole("button", { name: "In Zwischenablage kopieren" }),
    );
    await screen.findByText(EXPORT_GESPERRT);
    expect(writeText).not.toHaveBeenCalled();
    expect(screen.queryByText("Kopiert ✓")).toBeNull();
  });

  it("U7: der Warntext traegt NICHT die Klasse truncate", async () => {
    // DIREKTER WAECHTER GEGEN DIE TEST-FALLE aus Vermerk P11.11-17, Punkt (k): Der
    // Selektor span.truncate.text-red-600 bezeichnet den ZENTRALEN Fehlerkanal. Ein
    // roter Text mit beiden Klassen braeche zwei Bestandslaeufe, und einer davon
    // braeche STILL — er bekaeme einfach den falschen Satz.
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    const el = await screen.findByText(WARNUNG);
    expect(el.className).toContain("text-red-600");
    expect(el.className).not.toContain("truncate");
    expect(document.querySelector("span.truncate.text-red-600")).toBeNull();
  });

  it("U8: bleibt eine Kennung in einem KOMMENTAR stehen, NENNT die Meldung sie", async () => {
    // Die Nachbedingung aus Entscheidung P11.11-19. Ohne sie waere der Publish-Riegel
    // ein toter Zustand, den kein Knopf loesen kann.
    const mitKommentar = MIT_BAUSTEINEN.replace(
      "</body>",
      '<!-- id="pagesmith-mappings" Rest --></body>',
    );
    render(<CodeImporter initialProjectId="proj-1" initialCode={mitKommentar} />);
    await screen.findByText(WARNUNG);
    fireEvent.click(screen.getByRole("button", { name: KNOPF }));

    await screen.findByText(REST_SATZ);
    expect(document.body.textContent).toContain('id="pagesmith-mappings"');
    // Die Warnung steht weiter — der Riegel greift also zu Recht noch.
    expect(screen.queryByText(WARNUNG)).not.toBeNull();
  });

  // ---------------------------------------------------------------------------
  // K2: DIE ZWEI MELDUNGEN WERDEN AUS DEM AKTUELLEN TEXT ABGELEITET, NICHT AUS EINEM
  // GESPEICHERTEN ZUSTAND (Dauerregel ABLEITEN STATT LOESCHEN).
  //
  // BEIDE LAEUFE ENTFERNEN VON HAND, nicht per Knopf — der Knopf raeumt seine eigene
  // Meldung ohnehin ab. Der Fall, der zaehlt, ist der, in dem die URSACHE auf einem
  // Weg verschwindet, den der Setzer der Meldung nie sieht.
  // ---------------------------------------------------------------------------
  const feld = () => document.querySelector("textarea") as HTMLTextAreaElement;

  it("U9: Export verweigert -> Bloecke VON HAND entfernt -> die Export-Meldung ist weg", async () => {
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={MIT_BAUSTEINEN} />,
    );
    await screen.findByText(WARNUNG);
    fireEvent.click(screen.getByRole("button", { name: "Projekt exportieren" }));
    await screen.findByText(EXPORT_GESPERRT);

    // Von Hand sauber machen — kein Knopf, kein Projektwechsel.
    fireEvent.change(feld(), { target: { value: SAUBER } });

    // ANKER: die Warnung ist abgeleitet und verschwindet mit der Entprellung. Erst
    // danach ist die Frage nach der Export-Meldung ueberhaupt gestellt.
    await waitFor(() => expect(screen.queryByText(WARNUNG)).toBeNull());
    expect(screen.queryByText(EXPORT_GESPERRT)).toBeNull();
  });

  it("U10: Rest-Meldung steht -> Fundstelle VON HAND geloescht -> die Rest-Meldung ist weg", async () => {
    const mitKommentar = MIT_BAUSTEINEN.replace(
      "</body>",
      '<!-- id="pagesmith-mappings" Rest --></body>',
    );
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={mitKommentar} />,
    );
    await screen.findByText(WARNUNG);
    fireEvent.click(screen.getByRole("button", { name: KNOPF }));
    await screen.findByText(REST_SATZ);

    fireEvent.change(feld(), { target: { value: SAUBER } });

    await waitFor(() => expect(screen.queryByText(WARNUNG)).toBeNull());
    expect(screen.queryByText(REST_SATZ)).toBeNull();
    expect(document.body.textContent).not.toContain('id="pagesmith-mappings"');
  });
});

// ===========================================================================
// SKRIPTE UND TAGS IM CODE — DIE FUNDLISTE (Phase 11.11, Scheibe 11.11b).
//
// DIE FIXTURES SIND ECHTE ANBIETER-GESTALTEN aus den Belegen, keine erfundenen
// (docs/ziel-befunde.md, Teile (g), (ab), (ct); docs/claude-history/phase-11.11-import-bereinigung.md, VERMERK
// P11.11-25).
//
// EINE AUFLAGE AN JEDE SPAETERE RUNDE, DIE HIER EINE FIXTURE ERGAENZT: Diese
// Datei traegt VIER dokumentweite Abwesenheits-Zusicherungen auf
// document.body.textContent — /gerettet/i, /mindestens/, /%/ und /NaN/. Sie
// rendern heute OHNE initialCode, und keine BESTEHENDE Fixture traegt ein
// <script, <img, <iframe oder <noscript; die Fundliste erscheint dort also gar
// nicht. WER DAS AENDERT, PRUEFT ZUERST DIESE VIER ZEILEN — ein gerenderter
// Ausschnitt ist Text des Betreibers und kann jede der vier Nadeln tragen.
// ===========================================================================

describe("CodeImporter — Skripte und Tags im Code (11.11b)", () => {
  const SAUBER =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head>' +
    '<body><button data-pagesmith-id="ps-bbbbbb">Kaufen</button></body></html>';

  const MIT_META =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
    '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>' +
    "</body></html>";

  const MIT_CMP =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
    '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>' +
    "</body></html>";

  const MIT_CONTAINER =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
    '<script src="https://www.googletagmanager.com/gtm.js?id=GTM-ABCDEFGH"></script>' +
    "</body></html>";

  const MIT_UNBEKANNT =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
    '<script src="https://example.com/slider.js"></script>' +
    "</body></html>";

  const KEINE_FUNDE = "Keine Skripte oder Tags gefunden.";
  const CONTAINER_HINWEIS =
    "Ein Tag-Container kann weitere Tags nachladen. Was er lädt, steht nicht in diesem Code.";
  const CMP_HINWEIS = "Pagesmith lässt dieses Einwilligungs-Werkzeug unverändert.";
  const KOLLISION =
    "Im Code steht ein fremdes Einwilligungs-Werkzeug. Ist unsere Leiste oder unser Fenster eingeschaltet, erscheint sie zusätzlich.";
  const ALTER_SATZ_ANFANG = "Ein bereits eingebundenes Consent-Management";
  const NEUER_SATZ =
    "Ist bereits ein fremdes Einwilligungs-Werkzeug eingebunden, erscheint unsere Leiste oder unser Fenster zusätzlich.";

  const oeffneEinstellungen = () =>
    fireEvent.click(screen.getByRole("button", { name: /⚙ Einstellungen/ }));
  const oeffneVeroeffentlichen = () =>
    fireEvent.click(screen.getByRole("button", { name: /^Veröffentlichen$/ }));

  const liste = () =>
    screen.getByRole("heading", { name: /^Skripte und Tags im Code/ })
      .parentElement as HTMLElement;

  // SK1. OHNE CODE GAR KEIN BLOCK. Das ist zugleich der Grund, warum die vier
  // dokumentweiten Abwesenheits-Zusicherungen dieser Datei unberuehrt bleiben:
  // sie rendern alle ohne initialCode.
  it("SK1: ohne Code im Editor erscheint der Block nicht", () => {
    render(<CodeImporter initialProjectId="proj-1" />);
    expect(
      screen.queryByRole("heading", { name: /^Skripte und Tags im Code/ }),
    ).toBeNull();
  });

  // SK2. MIT CODE, ABER OHNE FUND: eine POSITIVE Aussage, nicht nichts. "Nichts
  // gefunden" und "fehlgeschlagen" muessen unterscheidbar sein (P11.11-12, Satz 2).
  it("SK2: Code ohne fremde Bausteine -> Keine Skripte oder Tags gefunden", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={SAUBER} />);
    await screen.findByText("Kaufen");
    expect(
      screen.getByRole("heading", { name: "Skripte und Tags im Code (0)" }),
    ).toBeTruthy();
    expect(screen.getByText(KEINE_FUNDE)).toBeTruthy();
  });

  // SK3. EIN BEKANNTES PIXEL: Anbieter, Etikett und die Zahl der Fundstellen.
  // DAS ETIKETT HEISST "Fremdes Pixel" UND NICHT "Tracking-Pixel" — jener Name ist
  // im Einstellungs-Drawer eine Ueberschrift fuer eine ANDERE Sache, und dreimal
  // fragt diese Datei sie dokumentweit als heading ab.
  it("SK3: ein Meta-Pixel erscheint mit Anbieter, Etikett und Fundstelle", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_META} />);
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByText("Meta")).toBeTruthy();
    expect(within(l).getByText("Fremdes Pixel")).toBeTruthy();
    expect(within(l).getByText("1 Fundstelle")).toBeTruthy();
    expect(within(l).queryByText("Tracking-Pixel")).toBeNull();
  });

  // SK4. DER CONTAINER: eigenes Etikett und der Nachlade-Hinweis. ER IST DIE
  // EIGENTLICHE LEISTUNG DIESER KLASSE — die Liste sagt, dass sie unvollstaendig
  // sein kann.
  it("SK4: ein Tag Manager traegt Tag-Container und den Nachlade-Hinweis", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_CONTAINER} />);
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByText("Google Tag Manager")).toBeTruthy();
    expect(within(l).getByText("Tag-Container")).toBeTruthy();
    expect(within(l).getByText(CONTAINER_HINWEIS)).toBeTruthy();
    // KEIN Entfernen-Angebot (P11.11-27) — und in 11.11b ueberhaupt kein Knopf.
    expect(within(l).queryAllByRole("button")).toHaveLength(0);
  });

  // SK5. EIN UNBEKANNTES SCRIPT WIRD ANGEZEIGT, ABER NICHT MARKIERT (P11.11-3) —
  // und es LEUCHTET NICHT: kein Rot, kein Signal. Jede importierte Seite traegt
  // Skripte; ein Signal bei jeder Seite waere Signal-Ermuedung.
  it("SK5: ein unbekanntes Script steht in der Liste, ohne Etikett und ohne Rot", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_UNBEKANNT} />);
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByText("https://example.com/slider.js")).toBeTruthy();
    expect(within(l).queryByText("Fremdes Pixel")).toBeNull();
    expect(within(l).queryByText("Einwilligungs-Werkzeug")).toBeNull();
    expect(within(l).queryByText("Tag-Container")).toBeNull();
    expect(l.querySelector(".text-red-600")).toBeNull();
    // UND DER ZENTRALE FEHLERKANAL BLEIBT FREI: Der Selektor
    // span.truncate.text-red-600 bezeichnet ihn dokumentweit; ein roter Text mit
    // beiden Klassen in dieser Liste braeche zwei Bestandslaeufe, einen davon STILL.
    expect(l.querySelector("span.truncate.text-red-600")).toBeNull();
  });

  // SK6. EIN CMP: Etikett plus der Hinweis, der NICHTS VERSPRICHT. Es gibt heute
  // keinen fuer einen Betreiber erreichbaren Ort, der den Einwilligungs-Hook
  // beschreibt; der Satz sagt deshalb nur, was Pagesmith TUT.
  it("SK6: ein CMP traegt Einwilligungs-Werkzeug und den Unveraendert-Hinweis", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_CMP} />);
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByText("Cookiebot")).toBeTruthy();
    expect(within(l).getByText("Einwilligungs-Werkzeug")).toBeTruthy();
    expect(within(l).getByText(CMP_HINWEIS)).toBeTruthy();
  });

  // SK7. DIE KOLLISION LIEST DEN ENTWURFS-STAND (P11.11-12, Satz 8): Sie erscheint
  // SOFORT beim Umschalten des Radios und nicht erst nach dem Speichern. DAS IST
  // DER LAUF, DEN M8 SPIEGELT.
  it("SK7: Kollision — CMP im Code UND Dialog eingeschaltet, ohne Speichern", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_CMP} />);
    await screen.findByText("Kaufen");
    oeffneEinstellungen();
    oeffneVeroeffentlichen();

    // VORBEDINGUNG: Der Dialog ist AUS, also steht der Hinweis noch nicht da.
    // Ohne diese Zeile waere der Lauf gruen, auch wenn der Hinweis IMMER stuende.
    expect(screen.queryByText(KOLLISION)).toBeNull();

    fireEvent.click(await screen.findByRole("radio", { name: /Leiste/ }));

    expect(await screen.findByText(KOLLISION)).toBeTruthy();
  });

  // SK8. OHNE FUND KEIN HINWEIS — auch bei eingeschaltetem Dialog. Sonst warnte die
  // Oberflaeche bei jeder Seite.
  it("SK8: eingeschalteter Dialog OHNE fremdes CMP zeigt keine Kollision", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_META} />);
    await screen.findByText("Kaufen");
    oeffneEinstellungen();
    oeffneVeroeffentlichen();
    fireEvent.click(await screen.findByRole("radio", { name: /Leiste/ }));

    // POSITIVKONTROLLE: Der Schalter steht wirklich auf "Leiste" — sonst waere die
    // Abwesenheit des Hinweises trivial wahr.
    expect(
      (screen.getByRole("radio", { name: /Leiste/ }) as HTMLInputElement).checked,
    ).toBe(true);
    expect(screen.queryByText(KOLLISION)).toBeNull();
  });

  // SK9. DER ALTE SATZ IST WEG UND DER NEUE STEHT DA. Der alte behauptete, ein
  // fremdes Consent-Management werde NICHT erkannt — mit dieser Scheibe ist das
  // falsch, und ein falscher Satz neben einer Liste, die das Gegenteil zeigt, ist
  // teurer als eine fehlende Warnung.
  it("SK9: der ueberholte Satz in PublishView ist ersetzt", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={SAUBER} />);
    await screen.findByText("Kaufen");
    oeffneEinstellungen();
    oeffneVeroeffentlichen();
    await screen.findByRole("radio", { name: /Leiste/ });

    expect(document.body.textContent).not.toContain(ALTER_SATZ_ANFANG);
    expect(screen.getByText(NEUER_SATZ)).toBeTruthy();
  });

  // SK10. DIE SCHREIBUNG IST "SKRIPTE". Ein Waechter, weil die falsche Form sich
  // sonst ueber die naechste Runde einschleicht und niemand sie bemerkt.
  it("SK10: die Form Scripte kommt in der Oberflaeche nicht vor", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_META} />);
    await screen.findByText("Kaufen");
    expect(document.body.textContent).not.toContain("Scripte");
    expect(document.body.textContent).toContain("Skripte");
  });

  // SK11. DER AUSSCHNITT IST TEXT, NIE HTML. Er ist Betreiber-Code aus einer fremden
  // Seite; als Markup gerendert brächte er dessen Elemente in UNSERE Oberflaeche.
  // React setzt einen String als Textknoten — dieser Lauf haelt fest, dass es dabei
  // bleibt, und wird rot, sobald jemand hier dangerouslySetInnerHTML einsetzt.
  it("SK11: der Ausschnitt eines Inline-Skripts wird als Text gerendert", async () => {
    const MIT_MARKUP =
      '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
      '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>' +
      '<script>var s = "<b>fett</b>";</script>' +
      "</body></html>";
    render(<CodeImporter initialProjectId="proj-1" initialCode={MIT_MARKUP} />);
    await screen.findByText("Kaufen");
    const l = liste();

    // (1) Der Ausschnitt steht als TEXT da.
    expect(l.textContent).toContain('var s = "<b>fett</b>";');
    // (2) UND ER HAT KEIN ELEMENT ERZEUGT. Ohne diese Zeile waere (1) auch dann
    // gruen, wenn das Markup gedeutet worden waere — textContent liest beides.
    expect(l.querySelector("b")).toBeNull();
  });
});

// ===========================================================================
// DAS ENTFERNEN FREMDER PIXEL AUF KLICK (Phase 11.11, Scheibe 11.11c).
//
// DIE FIXTURES SIND ECHTE ANBIETER-GESTALTEN aus den Belegen, keine erfundenen.
//
// DIE AUFLAGE AUS DEM KOPF DES 11.11b-BLOCKS GILT HIER UNVERAENDERT: Diese Datei
// traegt VIER dokumentweite Abwesenheits-Zusicherungen ueber document.body.textContent
// — /gerettet/i, /mindestens/, /%/ und /NaN/ — und SK10 verbietet die Form "Scripte".
// Die vier Wortlaute dieser Scheibe sind dagegen geprueft (Lauf S26 in
// foreign-scan.test.ts); wer HIER eine Fixture ergaenzt, prueft sie erneut.
// ===========================================================================

describe("CodeImporter — fremde Pixel entfernen (11.11c)", () => {
  const KOPF =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>';

  const META_SCRIPT =
    '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>';
  const META_IMG =
    '<img height="1" width="1" src="https://www.facebook.com/tr?id=123&ev=PageView">';
  const PIN_IMG =
    '<img height="1" width="1" src="https://ct.pinterest.com/v3/?tid=2612345678901">';
  const CMP_SCRIPT =
    '<script id="Cookiebot" src="https://consent.cookiebot.com/uc.js"></script>';
  const GTAG_SCRIPT =
    '<script src="https://www.googletagmanager.com/gtag/js?id=AW-111111111"></script>';
  const META_HANDLER =
    '<a href="https://example.com/x" onclick="fbq(\'track\',\'Lead\')">Jetzt</a>';
  // DER KONFIGURATIONS-SCHNIPSEL DES GOOGLE-TAGS — er traegt KEINE Adresse und ist
  // damit ein AUFRUF (ENTSCHEIDUNG P11.11-38; V1, docs/ziel-befunde.md, Teil (cs)).
  const GTAG_CONFIG =
    "<script>window.dataLayer=window.dataLayer||[];" +
    "function gtag(){dataLayer.push(arguments);}" +
    "gtag('js',new Date());gtag('config','AW-111111111');</script>";
  // SEITENLOGIK DES BETREIBERS MIT EINER EREIGNISZEILE DARIN — der produktive Fall,
  // um dessentwillen "aufruf" existiert. KEINE Lade-Adresse, also kein Knopf.
  const META_SEITENLOGIK =
    "<script>document.querySelector('#m').addEventListener('click'," +
    "function(){document.body.classList.toggle('offen');});" +
    "fbq('track','Lead');</script>";

  const seite = (rumpf: string) => `${KOPF}${rumpf}</body></html>`;

  // DIE WORTLAUTE STEHEN HIER ALS LITERAL UND WERDEN NICHT IMPORTIERT — sonst waere
  // der Waechter ein SPIEGEL, der jeden Tippfehler bestaetigt (Dauerregel EIN WAECHTER
  // UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE).
  const META_KNOPF = "Meta aus dem Code entfernen";
  const PIN_KNOPF = "Pinterest aus dem Code entfernen";
  const GOOGLE_KNOPF = "Google-Tag aus dem Code entfernen";
  const GOOGLE_HINWEIS =
    "Dieser Tag kann neben Google Ads auch Google Analytics und weitere Google-Produkte bedienen. Beim Entfernen hört alles auf, was über ihn läuft.";
  // EIN WORTLAUT FUER BEIDE NICHT-KNOTEN-TRAEGER — Handler UND Aufruf in Seiten-Code
  // (ENTSCHEIDUNG P11.11-38). Bis zum 2026-09-21 hiess er HANDLER_HINWEIS und nannte
  // den Handler ausdruecklich; seither ist es dieselbe Auskunft fuer beide Faelle.
  const MANUELL_HINWEIS =
    "Dieser Aufruf steckt in Code der Seite, der auch anderes enthalten kann, und wird nicht automatisch entfernt. Bitte von Hand löschen.";
  const REST_HINWEIS =
    "Dieser Fund steht nach dem Entfernen noch im Code. Bitte die Stelle von Hand löschen.";

  const liste = () =>
    screen.getByRole("heading", { name: /^Skripte und Tags im Code/ })
      .parentElement as HTMLElement;
  const feld = () => document.querySelector("textarea") as HTMLTextAreaElement;

  // SK12. DER KNOPF STEHT AM PIXEL — UND NUR DORT. Das ist zugleich die Zusicherung,
  // die die Mutation M2 wieder rot macht: Ein CMP bekommt nie einen (P11.11-3), ein
  // Container nie (P11.11-27).
  it("SK12: ein Meta-Pixel traegt den Knopf, ein CMP traegt keinen", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${CMP_SCRIPT}`)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByRole("button", { name: META_KNOPF })).toBeTruthy();
    // Der CMP-Fund steht da — POSITIVKONTROLLE, sonst waere die naechste Zeile
    // trivial wahr — und traegt KEINEN Knopf.
    expect(within(l).getByText("Cookiebot")).toBeTruthy();
    expect(within(l).queryAllByRole("button")).toHaveLength(1);
  });

  // SK13. DER KLICK ENTFERNT ALLE FUNDSTELLEN DES FUNDES aus dem EDITOR-Text — Script
  // UND Rueckfall-Bild (P11.11-35, Satz (a)) — und der Inhalt des Betreibers bleibt.
  it("SK13: ein Klick entfernt Script und Rueckfall-Bild aus dem Editor-Text", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${META_IMG}`)}
      />,
    );
    await screen.findByText("Kaufen");
    // POSITIVKONTROLLE: ZWEI Fundstellen, EIN Fund.
    expect(within(liste()).getByText("2 Fundstellen")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: META_KNOPF }));

    await waitFor(() =>
      expect(
        screen.queryByRole("button", { name: META_KNOPF }),
      ).toBeNull(),
    );
    expect(feld().value).not.toContain("connect.facebook.net");
    expect(feld().value).not.toContain("www.facebook.com/tr?");
    // … der Inhalt des Betreibers aber schon.
    expect(feld().value).toContain("Kaufen");
  });

  // SK14. EIN KLICK AUF META LAESST PINTEREST STEHEN. Ohne ihn waere SK13 auch dann
  // gruen, wenn der Klick die ganze Liste abraeumte.
  it("SK14: ein Klick auf Meta laesst den Pinterest-Fund unberuehrt", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${PIN_IMG}`)}
      />,
    );
    await screen.findByText("Kaufen");
    expect(screen.getByRole("button", { name: PIN_KNOPF })).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: META_KNOPF }));

    await waitFor(() =>
      expect(screen.queryByRole("button", { name: META_KNOPF })).toBeNull(),
    );
    expect(screen.getByRole("button", { name: PIN_KNOPF })).toBeTruthy();
    expect(feld().value).toContain("ct.pinterest.com");
  });

  // SK15. DER GOOGLE-HINWEIS STEHT AM GOOGLE-TAG UND NUR DORT (ENTSCHEIDUNG P11.11-34).
  // Er ist der Preis der Entscheidung, den Tag ueberhaupt zum Entfernen anzubieten.
  it("SK15: der Google-Tag traegt den Analytics-Hinweis, Meta nicht", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${GTAG_SCRIPT}${META_SCRIPT}`)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();
    expect(within(l).getByRole("button", { name: GOOGLE_KNOPF })).toBeTruthy();
    expect(within(l).getByText(GOOGLE_HINWEIS)).toBeTruthy();
    // NUR EINMAL — der Meta-Fund daneben traegt ihn nicht.
    expect(within(l).queryAllByText(GOOGLE_HINWEIS)).toHaveLength(1);
  });

  // SK16. EIN INLINE-HANDLER BEKOMMT DEN HANDARBEITS-HINWEIS STATT EINES KNOPFES
  // (P11.11-35, Satz (b)) — und er ist eine EIGENE Gruppe neben dem Script desselben
  // Anbieters (ENTSCHEIDUNG P11.11-36, Punkt (F1)).
  it("SK16: ein onclick-Fund traegt den Handarbeits-Hinweis und keinen Knopf", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${META_HANDLER}`)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();
    // ZWEI Meta-Zeilen: Knoten (mit Knopf) und Handler (ohne).
    expect(within(l).getAllByText("Meta")).toHaveLength(2);
    expect(within(l).getByText(MANUELL_HINWEIS)).toBeTruthy();
    expect(within(l).queryAllByRole("button")).toHaveLength(1);
  });

  // SK16b. DERSELBE HINWEIS AM AUFRUF IN SEITEN-CODE (ENTSCHEIDUNG P11.11-38) — EIN
  // Wortlaut fuer beide Traeger, und deshalb genuegt EINE Zeile fuer die Behauptung.
  //
  // DIE FIXTURE IST DER PRODUKTIVE FALL: Formular- und Menuelogik des Betreibers UND
  // die Ereigniszeile in EINEM Script. Ein Knopf daran haette diese Logik geloescht.
  it("SK16b: ein Aufruf in Seiten-Code traegt denselben Hinweis und keinen Knopf", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(META_SEITENLOGIK)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();
    // Der Fund steht da — POSITIVKONTROLLE, sonst waere die Knopf-Zeile trivial wahr.
    expect(within(l).getByText("Meta")).toBeTruthy();
    expect(within(l).getByText(MANUELL_HINWEIS)).toBeTruthy();
    expect(within(l).queryAllByRole("button")).toHaveLength(0);
  });

  // SK16c. UND DIE GEGENPROBE AM GOOGLE-TAG: Das LADE-Script bekommt einen Knopf, der
  // Konfigurations-Schnipsel daneben nicht (V1, docs/ziel-befunde.md, Teil (cs)).
  it("SK16c: gtag-Lader traegt einen Knopf, der Konfigurations-Schnipsel nicht", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${GTAG_SCRIPT}${GTAG_CONFIG}`)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();
    // ZWEI Google-Zeilen, und GENAU EINE traegt einen Knopf.
    expect(within(l).getAllByText("Google-Tag")).toHaveLength(2);
    expect(within(l).getAllByRole("button", { name: GOOGLE_KNOPF })).toHaveLength(1);
    expect(within(l).getByText(MANUELL_HINWEIS)).toBeTruthy();
  });

  // SK17. DER GEGLUECKTE KLICK ERZEUGT KEINE REST-MELDUNG. Er steht VOR den zwei
  // Attrappen-Laeufen, weil er ihre POSITIVKONTROLLE in der anderen Richtung ist:
  // Ohne ihn waere nicht zu unterscheiden, ob die Meldung am SCHEITERN haengt oder
  // schlicht nach jedem Klick erscheint.
  it("SK17: nach einem geglueckten Klick steht KEINE Rest-Meldung", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${META_HANDLER}`)}
      />,
    );
    await screen.findByText("Kaufen");
    fireEvent.click(screen.getByRole("button", { name: META_KNOPF }));

    await waitFor(() =>
      expect(screen.queryByRole("button", { name: META_KNOPF })).toBeNull(),
    );
    expect(screen.queryByText(REST_HINWEIS)).toBeNull();
    // ANKER: der Handler-Fund steht noch da, die Liste ist also nicht einfach leer.
    // (Der Hinweis gilt seit P11.11-38 Handler UND Aufruf; hier ist es der Handler.)
    expect(screen.getByText(MANUELL_HINWEIS)).toBeTruthy();
  });

  // SK18. SCHEITERT DIE NACHBEDINGUNG, STEHT DIE MELDUNG AM GEKLICKTEN FUND.
  //
  // DER ZUSTAND IST UEBER DEN FEHLERAUSGANG HERGESTELLT, nicht ueber einen erfundenen:
  // Die Attrappe gibt den Text UNVERAENDERT zurueck — genau das tut die echte Funktion
  // nach einem Wurf waehrend des Entfernens.
  //
  // DIE MELDUNG STEHT IN DER ZEILE DES GEKLICKTEN FUNDES, und das wird eigens geprueft:
  // Ein blosses "sie ist irgendwo im Dokument" waere auch dann gruen, wenn sie an der
  // Handler-Zeile stuende — also genau in der Bauform, die K1 zurueckgenommen hat.
  it("SK18: Nachbedingung gescheitert -> die Meldung steht in der Zeile des geklickten Fundes", async () => {
    foreignStripAttrappe.aktiv = true;
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${META_HANDLER}`)}
      />,
    );
    await screen.findByText("Kaufen");
    // VORHER steht sie NICHT da — sonst waere der Lauf trivial wahr.
    expect(screen.queryByText(REST_HINWEIS)).toBeNull();

    const knopf = screen.getByRole("button", { name: META_KNOPF });
    fireEvent.click(knopf);

    const meldung = await screen.findByText(REST_HINWEIS);
    // Der Knopf steht noch da (nichts wurde entfernt) …
    expect(screen.getByRole("button", { name: META_KNOPF })).toBeTruthy();
    // … und die Meldung steht in SEINER Zeile.
    const zeile = screen
      .getByRole("button", { name: META_KNOPF })
      .closest("li") as HTMLElement;
    expect(zeile.contains(meldung)).toBe(true);
    // NICHT in der Handler-Zeile: dort steht bereits der Handarbeits-Hinweis, und
    // zwei gleichlautende Aufforderungen an einer Zeile waren der Grund fuer K1.
    const handlerZeile = screen
      .getByText(MANUELL_HINWEIS)
      .closest("li") as HTMLElement;
    expect(within(handlerZeile).queryByText(REST_HINWEIS)).toBeNull();
  });

  // SK19. UND SIE VERALTET NICHT — DER ANKER IST DAS, WAS SIE DAVOR BEWAHRT.
  //
  // ER IST EIN EINZELSTUECK: Er ist der EINZIGE Lauf, der faellt, wenn die Meldung
  // ihren Anker verliert und am gespeicherten statt am aktuellen Text haengt
  // (Mutation M7, GEMESSEN: genau ein roter Lauf). Wer ihn als redundant streicht,
  // nimmt die einzige Abdeckung von ENTSCHEIDUNG P11.11-24 an dieser Scheibe mit
  // (Dauerregel MUTATIONSPROBEN …, Lektion (f)).
  //
  // DER FALL IST BEWUSST DER SCHWERERE: Der Betreiber aendert den Text VON HAND, und
  // der Fund BLEIBT dabei stehen. Ein blosses "der Fund ist weg" liefe auch ohne Anker
  // gruen — dort raeumt schon die Liste die Zeile ab. ERST WENN DER FUND STEHEN BLEIBT,
  // trennt sich abgeleitet von gespeichert.
  it("SK19: Text VON HAND geaendert, Fund bleibt -> die Rest-Meldung ist weg", async () => {
    foreignStripAttrappe.aktiv = true;
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${META_HANDLER}`)}
      />,
    );
    await screen.findByText("Kaufen");
    fireEvent.click(screen.getByRole("button", { name: META_KNOPF }));
    await screen.findByText(REST_HINWEIS);

    // VON HAND: ein Absatz dazu. Der Meta-Fund bleibt unveraendert stehen.
    fireEvent.change(feld(), {
      target: { value: seite(`${META_SCRIPT}${META_HANDLER}<p>neu</p>`) },
    });

    await waitFor(() => expect(screen.queryByText(REST_HINWEIS)).toBeNull());
    // ANKER: der geklickte Fund steht wirklich noch da — sonst waere die Zeile
    // darueber aus dem falschen Grund gruen.
    expect(screen.getByRole("button", { name: META_KNOPF })).toBeTruthy();
  });
});

// ===========================================================================
// DIE FUNDLISTE WIRD GEBUENDELT (Phase 11.11, Scheibe 11.11e).
//
// DER ANLASS IST EINE ECHTE SEITE MIT 136 SKRIPTEN (OWNER-TEST, 2026-09-21): Die Liste
// war dort nicht falsch, sondern unbenutzbar. GEBUENDELT statt GEFILTERT — ein
// Pfad-Filter haette auf derselben Seite einen Tracker versteckt (P11.11-37).
//
// DIE FIXTURE IST SYNTHETISCH UND KEINE ECHTE DRITTSEITE: Das Repo ist oeffentlich.
// Die Hosts sind `*.example` bzw. `*.example.com` — reservierte Namen, die niemandem
// gehoeren.
//
// DIE AUFLAGE AUS DEM KOPF DER 11.11b/c-BLOECKE GILT HIER UNVERAENDERT: Diese Datei
// traegt VIER dokumentweite Abwesenheits-Zusicherungen ueber document.body.textContent
// — /gerettet/i, /mindestens/, /%/ und /NaN/ — und SK10 verbietet die Form "Scripte".
// Die drei Wortlaute dieser Scheibe sind dagegen geprueft (Lauf S38 in
// foreign-scan.test.ts); wer HIER eine Fixture ergaenzt, prueft sie erneut.
// ===========================================================================

describe("CodeImporter — die Fundliste buendelt (11.11e)", () => {
  const KOPF =
    '<!DOCTYPE html><html lang="de"><head><title>S</title></head><body>' +
    '<button data-pagesmith-id="ps-bbbbbb">Kaufen</button>';
  const seite = (rumpf: string) => `${KOPF}${rumpf}</body></html>`;
  const skript = (src: string) => `<script src="${src}"></script>`;

  // DREI SKRIPTE EINES HOSTS, EINES EINES ZWEITEN, EINE RELATIVE ADRESSE UND EIN
  // INLINE-SKRIPT — der Fall der echten Seite im Kleinen.
  const VIELE =
    skript("https://cdn.theme.example/a.js") +
    skript("https://cdn.theme.example/b.js") +
    skript("https://cdn.theme.example/c.js") +
    skript("https://andere.example/x.js") +
    skript("/wp-content/plugins/irgendwas/f.js") +
    "<script>console.log('seitenlogik');</script>";

  const META_SCRIPT =
    '<script src="https://connect.facebook.net/en_US/fbevents.js"></script>';

  // DIE WORTLAUTE STEHEN HIER ALS LITERAL UND WERDEN NICHT IMPORTIERT — sonst waere
  // der Waechter ein SPIEGEL, der jeden Tippfehler bestaetigt (Dauerregel EIN WAECHTER
  // UEBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE).
  const WEITERE = "Weitere Skripte (6)";
  const OHNE_DOMAIN = "Ohne Domain-Angabe (1)";
  const INLINE = "Inline-Skripte (1)";
  // Fuer SK25: derselbe Handler und derselbe Wortlaut wie im 11.11c-Block, hier
  // eigens getippt — die Konstanten dort sind auf jenen `describe` beschraenkt, und
  // ein Import machte den Waechter zum Spiegel.
  const META_HANDLER_E =
    '<a href="https://example.com/x" onclick="fbq(\'track\',\'Lead\')">Jetzt</a>';
  const REST_HINWEIS_E =
    "Dieser Fund steht nach dem Entfernen noch im Code. Bitte die Stelle von Hand löschen.";

  const liste = () =>
    screen.getByRole("heading", { name: /^Skripte und Tags im Code/ })
      .parentElement as HTMLElement;
  // DER HELFER BENENNT DIE SEKTION UEBER IHRE UEBERSCHRIFT UND NICHT ALS "das erste
  // details in der Liste". DAS IST IN DER MUTATIONSRUNDE NACHGESCHAERFT WORDEN: Unter
  // der Mutation M4 (ein zusaetzliches details um die ganze Liste) traf die lose
  // Fassung das FALSCHE Element, und SK22/SK24 fielen mit einer ANDEREN Fehlerklasse
  // als der gemeinten — eine Kaskade, keine Abdeckung. Behoben wird die Wurzel, also
  // der Ausschnitt, nicht die Assertion (Dauerregel MUTATIONSPROBEN …, Lektion (b)).
  const sektion = () =>
    within(liste())
      .getByText(/^Weitere Skripte \(/)
      .closest("details") as HTMLDetailsElement;

  // SK20. EINGEKLAPPT — UND ZWAR IM DOM PRUEFBAR (P11.11-41, Punkt (F)).
  //
  // DAS IST DER TRAGENDE LAUF DIESER SCHEIBE, UND SEINE ZWEITE HAELFTE IST DER GRUND
  // FUER `<details>`: Der Zustand ist das `open`-Attribut, UND DIE EINTRAEGE STEHEN
  // TROTZDEM IM DOM. Bei bedingtem Rendern waere die zweite Zeile rot, und ein Test
  // koennte "gebuendelt" nicht mehr von "ausgeblendet" unterscheiden — genau das ist
  // die Zusage "NICHTS WIRD AUSGEBLENDET" (P11.11-37).
  //
  // DIE TESTUMGEBUNG WERTET KEIN CSS AUS (Dauerregel): Dieser Lauf behauptet NICHT,
  // dass etwas unsichtbar ist. Er prueft STRUKTUR — ein Attribut und die Praesenz.
  it("SK20: die Sektion ist zu, und ihre Eintraege stehen dennoch im DOM", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={seite(VIELE)} />);
    await screen.findByText("Kaufen");

    const d = sektion();
    expect(d.hasAttribute("open")).toBe(false);
    expect(d.open).toBe(false);
    // NICHTS IST AUSGEBLENDET: die Gruppen-Ueberschriften UND ein einzelner Eintrag
    // sind auffindbar, obwohl alles zu ist.
    expect(within(liste()).getByText("cdn.theme.example (3)")).toBeTruthy();
    expect(within(liste()).getByText(OHNE_DOMAIN)).toBeTruthy();
    expect(within(liste()).getByText(INLINE)).toBeTruthy();
    expect(
      within(liste()).getByText("https://cdn.theme.example/b.js"),
    ).toBeTruthy();
    // UND DER PFAD, DEN EIN FILTER VERSTECKT HAETTE, STEHT DA — der Live-Beleg von
    // ENTSCHEIDUNG P11.11-37 im Kleinen.
    expect(
      within(liste()).getByText("/wp-content/plugins/irgendwas/f.js"),
    ).toBeTruthy();
  });

  // SK21. DIE ERKANNTEN FUNDE STEHEN OFFEN OBEN, MIT IHREM KNOPF (P11.11-37).
  // OHNE DIESEN LAUF waere ein Bau gruen, der die bekannten Funde mit einklappt.
  it("SK21: der bekannte Fund steht offen, sein Knopf ist unmittelbar erreichbar", async () => {
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${VIELE}`)}
      />,
    );
    await screen.findByText("Kaufen");

    const l = liste();
    // Der Meta-Fund liegt AUSSERHALB der eingeklappten Sektion.
    const metaZeile = within(l).getByText("Meta").closest("li") as HTMLElement;
    expect(metaZeile.closest("details")).toBeNull();
    expect(
      within(l).getByRole("button", { name: "Meta aus dem Code entfernen" }),
    ).toBeTruthy();
    // UND DIE UEBERSCHRIFT DER SEKTION ZAEHLT SKRIPTE, NICHT GRUPPEN (P11.11-41 (H)):
    // sechs unbekannte Skripte in drei Gruppen.
    expect(within(l).getByText(WEITERE)).toBeTruthy();
  });

  // SK22. AUFKLAPPEN DREHT DEN ZUSTAND. GEMESSEN (CC, 2026-09-22): ein Klick auf das
  // `<summary>` setzt `open` auch in jsdom — der Lauf prueft also die echte Bedienung
  // und nicht eine programmatische Zuweisung.
  it("SK22: ein Klick auf die Ueberschrift klappt die Sektion auf", async () => {
    render(<CodeImporter initialProjectId="proj-1" initialCode={seite(VIELE)} />);
    await screen.findByText("Kaufen");

    const d = sektion();
    expect(d.open).toBe(false);
    fireEvent.click(within(liste()).getByText(WEITERE));
    expect(d.open).toBe(true);
  });

  // SK23. OHNE UNBEKANNTEN FUND GIBT ES DIE SEKTION NICHT (P11.11-41, Punkt (K)).
  //
  // DAS IST DIE AUFLAGE, DIE SK4 UND SK12 SCHUETZT: beide zaehlen die Knoepfe INNERHALB
  // der Liste (null bzw. genau einen). Eine Sektion mit "(0)" waere ausserdem eine
  // Auskunft ueber nichts.
  it("SK23: ein Code nur mit bekanntem Fund traegt keine eingeklappte Sektion", async () => {
    render(
      <CodeImporter initialProjectId="proj-1" initialCode={seite(META_SCRIPT)} />,
    );
    await screen.findByText("Kaufen");

    const l = liste();
    // POSITIVKONTROLLE: der bekannte Fund IST da — sonst waere die Zeile darunter
    // trivial wahr, weil die ganze Liste leer ist.
    expect(within(l).getByText("Meta")).toBeTruthy();
    expect(l.querySelector("details")).toBeNull();
    expect(within(l).queryByText(/^Weitere Skripte/)).toBeNull();
  });

  // SK24. DER AUFKLAPP-ZUSTAND UEBERLEBT DEN PROJEKTWECHSEL NICHT (P11.11-41, Punkt
  // (G)). Er lebt im DOM und stirbt mit dem `key` am Projekt — kein Aufruf leert ihn.
  //
  // ER IST EIN EINZELSTUECK, UND ZWAR GEMESSEN (Mutation M5, CC, 2026-09-22): Faellt der
  // `key` weg, faellt NUR DIESER LAUF — React gleicht dann nach Position ab, und `open`
  // ueberlebt den Wechsel (Dauerregel MUTATIONSPROBEN …, Lektion (f)).
  it("SK24: nach einem Projektwechsel ist die Sektion wieder zu", async () => {
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: seite(VIELE),
      mappings: [],
      settings: {},
    });
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={seite(VIELE)}
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-02T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-01T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Kaufen");

    fireEvent.click(within(liste()).getByText(WEITERE));
    // VORBEDINGUNG: sie ist wirklich offen. Ohne diese Zeile waere der Schluss unten
    // aus dem falschen Grund gruen (Dauerregel EINE VORBEDINGUNG, DIE AUCH DER ALTE
    // ZUSTAND ERFUELLT, IST KEINE VORBEDINGUNG).
    expect(sektion().open).toBe(true);

    fireEvent.click(screen.getByRole("button", { name: /^Projekte/ }));
    fireEvent.click(await screen.findByText("P2"));

    // Neu abgefragt: nach dem Remount ist es ein anderes DOM-Element.
    await waitFor(() => expect(sektion().open).toBe(false));
  });

  // SK25 (E3). DER ANKER DER REST-MELDUNG STIRBT BEIM PROJEKTWECHSEL.
  //
  // DER FALL IST BENENNBAR UND NICHT ERFUNDEN: Zwei Projekte mit BYTE-GLEICHEM Text —
  // ein duplizierter Entwurf. Ohne das Zuruecksetzen von `foreignStrip` in
  // applyZenForLoadedCode blieb der Anker gueltig, weil er nur `debouncedCode ===
  // foreignStrip.text` prueft, und die Rest-Meldung stuende im ZWEITEN Projekt fuer
  // einen Klick im ERSTEN.
  //
  // ER IST EIN EINZELSTUECK, UND ZWAR GEMESSEN (Mutation M8, CC, 2026-09-22): Faellt die
  // Zeile `setForeignStrip(null)` in applyZenForLoadedCode weg, faellt NUR DIESER LAUF.
  // Wer ihn streicht, nimmt die einzige Abdeckung mit (Dauerregel MUTATIONSPROBEN …,
  // Lektion (f)).
  it("SK25: gleicher Text in zwei Projekten — der Klick im ersten erzeugt keine Rest-Meldung im zweiten", async () => {
    foreignStripAttrappe.aktiv = true;
    const CODE = seite(`${META_SCRIPT}${META_HANDLER_E}`);
    loadProject.mockResolvedValueOnce({
      id: "p2",
      name: "P2",
      html: CODE,
      mappings: [],
      settings: {},
    });
    render(
      <CodeImporter
        initialProjectId="p1"
        initialCode={CODE}
        initialProjects={[
          { id: "p1", name: "P1", updated_at: "2026-01-02T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-01T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Kaufen");

    fireEvent.click(
      screen.getByRole("button", { name: "Meta aus dem Code entfernen" }),
    );
    // VORBEDINGUNG: die Meldung steht wirklich — sonst prueft der Schluss unten nichts.
    await screen.findByText(REST_HINWEIS_E);

    fireEvent.click(screen.getByRole("button", { name: /^Projekte/ }));
    fireEvent.click(await screen.findByText("P2"));

    await waitFor(() => expect(screen.queryByText(REST_HINWEIS_E)).toBeNull());
    // ANKER: der Fund steht im zweiten Projekt weiterhin da — der Text ist ja
    // derselbe. Ohne diese Zeile waere die Zeile darueber auch dann gruen, wenn
    // schlicht die ganze Liste fehlte.
    expect(
      screen.getByRole("button", { name: "Meta aus dem Code entfernen" }),
    ).toBeTruthy();
  });

  // SK26. DER ORTSHINWEIS WIRD GERENDERT — UND ZWAR AN DER ZEILE OHNE KNOPF
  // (P11.11-41, Punkt (I)).
  //
  // ER GEHOERT HIERHER UND NICHT NUR ZU S37, und der Grund ist die Dauerregel NUR EIN
  // TEST IST EIN WAECHTER: S37 prueft das FELD, dieser Lauf prueft, dass es auch
  // ANKOMMT. Ohne ihn bliebe S37 gruen, wenn jemand den JSX-Block entfernt.
  //
  // ER LOEST DAS GEMESSENE PROBLEM: Zwei Zeilen "Meta · Fremdes Pixel · 1 Fundstelle"
  // untereinander sahen GLEICH AUS — ein Seiten-Script und ein `onclick` —, und beide
  // sagten "von Hand loeschen", ohne zu sagen WO.
  //
  // ER IST EIN EINZELSTUECK, UND ZWAR GEMESSEN (Mutation M6c, CC, 2026-09-22): Wird der
  // JSX-Block des Ortshinweises entfernt, faellt NUR DIESER LAUF — S37 bleibt gruen,
  // weil das FELD unberuehrt ist. Wer ihn als redundant streicht, nimmt die einzige
  // Abdeckung des Renderns mit (Dauerregel MUTATIONSPROBEN …, Lektion (f)).
  it("SK26: die Zeile ohne Knopf zeigt ihren Ausschnitt, die Zeile mit Knopf nicht", async () => {
    const AUFRUF = "<script>document.title='x';fbq('track','Purchase');</script>";
    render(
      <CodeImporter
        initialProjectId="proj-1"
        initialCode={seite(`${META_SCRIPT}${AUFRUF}${META_HANDLER_E}`)}
      />,
    );
    await screen.findByText("Kaufen");
    const l = liste();

    // VORBEDINGUNG: es sind wirklich DREI Meta-Zeilen — Knoten, Aufruf, Handler.
    // Ohne sie prueften die Zeilen darunter eine Liste, die es so nicht gibt.
    expect(within(l).getAllByText("Meta")).toHaveLength(3);

    // DER AUSSCHNITT DES AUFRUFS UND DER DES HANDLERS STEHEN DA — als TEXT.
    const aufrufZeile = within(l)
      .getByText(/document\.title='x';fbq\('track','Purchase'\);/)
      .closest("li") as HTMLElement;
    expect(aufrufZeile).toBeTruthy();
    expect(within(l).getByText("fbq('track','Lead')")).toBeTruthy();

    // UND DIE ZEILE MIT DEM KNOPF TRAEGT KEINEN — sie braucht keine Wegbeschreibung.
    const knopfZeile = within(l)
      .getByRole("button", { name: "Meta aus dem Code entfernen" })
      .closest("li") as HTMLElement;
    expect(knopfZeile.querySelector(".font-mono")).toBeNull();
  });
});

describe("CodeImporter — Absende-Buttons ohne eigene Aktionen (Phase 12.5, Scheibe 1c)", () => {
  // Entscheidungen P12.5-37 und P12.5-40 bis P12.5-42 der Phase 12.5. Kanonisches Dokument
  // mit festen ps-IDs: ein Formular (ps-ffffff) mit Absende-Button (ps-bbbbbb) und einem
  // Knopf type="button" (ps-cccccc); ausserhalb ein Button ohne Formular (ps-dddddd).
  const SUBMIT_DOC =
    '<!DOCTYPE html><html><head></head><body><form data-pagesmith-id="ps-ffffff" action="#unten"><input type="email" name="email"><button type="submit" data-pagesmith-id="ps-bbbbbb">Absenden</button><button type="button" data-pagesmith-id="ps-cccccc">Mehr Info</button></form><button data-pagesmith-id="ps-dddddd">Aussen</button></body></html>';
  // Wortlaut aus Entscheidung P12.5-37 bzw. P12.5-42 — GETIPPT, nicht aus ActionPanel.tsx.
  const HINWEIS =
    "Aktionen, Events und Weiterleitungen bitte direkt am übergeordneten Formular (<form>) einstellen.";
  const NEU_VEROEFFENTLICHEN = /Auf bereits veröffentlichten Seiten erst nach erneutem Veröffentlichen\./;

  it("A1: Absende-Button ohne Aktion -> nur Hinweis und 'Formular auswählen', KEINE Kacheln", async () => {
    // Rot, wenn der Zweig fuer Absende-Buttons im Panel fehlt (M-UI1).
    render(<CodeImporter initialCode={SUBMIT_DOC} />);
    fireEvent.click(await screen.findByText("Absenden"));
    expect(screen.getByText(HINWEIS)).toBeTruthy();
    expect(screen.getByRole("button", { name: "Formular auswählen" })).toBeTruthy();
    expect(screen.queryByText(/Link \/ Weiterleitung/)).toBeNull();
    expect(screen.queryByText(/Tracking-Event/)).toBeNull();
  });

  it("A2: Absende-Button mit Weiterleitung und Track -> beide 'wirkt nicht mehr', einzeln entfernbar", async () => {
    render(
      <CodeImporter
        initialCode={SUBMIT_DOC}
        initialMappings={[
          { elementId: "ps-bbbbbb", type: "redirect", config: { url: "https://example.com/weg", openInNewTab: false } },
          { elementId: "ps-bbbbbb", type: "track", config: { event: "ButtonProbe" } },
        ]}
      />
    );
    fireEvent.click(await screen.findByText("Absenden"));
    expect(screen.getByText(/Weiterleitung — wirkt nicht mehr/)).toBeTruthy();
    expect(screen.getByText("https://example.com/weg")).toBeTruthy();
    expect(screen.getByText(/Tracking-Event — wirkt nicht mehr/)).toBeTruthy();
    expect(screen.getByText("ButtonProbe")).toBeTruthy();
    expect(screen.getAllByText(NEU_VEROEFFENTLICHEN)).toHaveLength(2);
    expect(screen.queryByRole("button", { name: "Bearbeiten" })).toBeNull();
    expect(screen.queryByText(/Link \/ Weiterleitung/)).toBeNull();

    fireEvent.click(screen.getByRole("button", { name: "Weiterleitung entfernen" }));
    expect(screen.queryByTitle("Verknüpft: redirect")).toBeNull();
    expect(screen.getByTitle("Verknüpft: track")).toBeTruthy();

    fireEvent.click(screen.getByRole("button", { name: "Event entfernen" }));
    expect(screen.queryByTitle("Verknüpft: track")).toBeNull();
    // Danach steht nur noch der Hinweis da — weiterhin keine Kacheln.
    expect(screen.getByText(HINWEIS)).toBeTruthy();
    expect(screen.queryByText(/Tracking-Event/)).toBeNull();
  });

  it("A3: 'Formular auswählen' waehlt das Formular — Panel des Formulars, SET_SELECTED_ID mit seiner ps-ID", async () => {
    // Rot, wenn der Link eine andere ID waehlt (M-UI3) oder fehlt (M-UI1).
    render(<CodeImporter initialCode={SUBMIT_DOC} />);
    fireEvent.click(await screen.findByText("Absenden"));
    const frame = screen.getByTitle("preview") as HTMLIFrameElement;
    const spy = vi.spyOn(frame.contentWindow!, "postMessage");
    fireEvent.click(screen.getByRole("button", { name: "Formular auswählen" }));
    expect(
      await screen.findByText("Feuert beim Abschicken des Formulars ein Event.")
    ).toBeTruthy();
    expect(screen.queryByText(HINWEIS)).toBeNull();
    const sel = spy.mock.calls
      .map((c) => c[0] as { type?: string; elementId?: string })
      .filter((m) => m?.type === "SET_SELECTED_ID");
    expect(sel.at(-1)?.elementId).toBe("ps-ffffff");
  });

  it("A4: Knopf type=\"button\" im Formular -> normale Kacheln, kein Hinweis", async () => {
    // Rot, wenn das Editor-Urteil type="button" als Absende-Button fuehrt (M-E1).
    render(<CodeImporter initialCode={SUBMIT_DOC} />);
    fireEvent.click(await screen.findByText("Mehr Info"));
    expect(screen.getByText(/Link \/ Weiterleitung/)).toBeTruthy();
    expect(screen.getByText(/Tracking-Event/)).toBeTruthy();
    expect(screen.queryByText(HINWEIS)).toBeNull();
  });

  it("A5 (N8 der Scheibe 1b): bestehende Weiterleitung am Formular -> 'wirkt nicht mehr', entfernbar, keine Kachel", async () => {
    // Die Auflage aus Entscheidung P12.5-23. Rot, wenn die tote Weiterleitung am Formular
    // nicht mehr erscheint (M-UI2).
    render(
      <CodeImporter
        initialCode={SUBMIT_DOC}
        initialMappings={[
          { elementId: "ps-ffffff", type: "redirect", config: { url: "https://example.com/formular", openInNewTab: false } },
          { elementId: "ps-ffffff", type: "track", config: { event: "Contact" } },
        ]}
      />
    );
    fireEvent.click(await screen.findByText("#unten"));
    expect(screen.getByText(/Weiterleitung — wirkt nicht mehr/)).toBeTruthy();
    expect(screen.getByText("https://example.com/formular")).toBeTruthy();
    expect(screen.getByText(NEU_VEROEFFENTLICHEN)).toBeTruthy();
    expect(screen.queryByText(/Link \/ Weiterleitung/)).toBeNull();
    // Der lebende Track daneben traegt SEINEN Entfernen-Knopf; die tote Weiterleitung
    // einen eigenen Namen (Entscheidung P12.5-41).
    expect(screen.getByRole("button", { name: "Entfernen" })).toBeTruthy();
    fireEvent.click(screen.getByRole("button", { name: "Weiterleitung entfernen" }));
    expect(screen.queryByTitle("Verknüpft: redirect")).toBeNull();
    expect(screen.getByTitle("Verknüpft: track")).toBeTruthy();
    expect(screen.queryByText(/Weiterleitung — wirkt nicht mehr/)).toBeNull();
  });

  it("A6: Button ausserhalb eines Formulars -> normale Kacheln, kein Hinweis", async () => {
    render(<CodeImporter initialCode={SUBMIT_DOC} />);
    fireEvent.click(await screen.findByText("Aussen"));
    expect(screen.getByText(/Link \/ Weiterleitung/)).toBeTruthy();
    expect(screen.getByText(/Tracking-Event/)).toBeTruthy();
    expect(screen.queryByText(HINWEIS)).toBeNull();
  });
});
