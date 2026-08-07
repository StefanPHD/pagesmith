import { act, cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";

// Die Karte ruft ZWEI Server-Actions auf. Beide hier gemockt — der echte Modul-Import
// zoege server-only-Code in die Testumgebung. Rueckgaben bewusst als Promise<unknown>,
// damit einzelne Tests ueber mockResolvedValueOnce auch den Fehlerzweig liefern koennen.
//
// DIE UEBRIGEN EXPORTE stehen hier NUR fuer den Waechter am Ende dieser Datei, der den
// CONTAINER rendert. Die Fabrik ist ein VOLLERSATZ des Moduls — ein fehlender Export
// ist zur Laufzeit undefined, nicht ein Fehler beim Import.
const {
  setCapiToken,
  removeCapiToken,
  listConfiguredTargets,
  loadProject,
  saveProject,
  listProjects,
  deleteProject,
  renameProject,
  publishProject,
  getEventCounts,
  getAdblockLoss,
  getVariantCounts,
  getVariantBPublished,
  saveVariantB,
  createVariantB,
  removeVariantB,
  setAbTestActive,
} = vi.hoisted(() => ({
  setCapiToken: vi.fn(async (): Promise<unknown> => ({
    ok: true as const,
    trackingKey: "tk-mock",
  })),
  removeCapiToken: vi.fn(async (): Promise<unknown> => ({ ok: true as const })),
  listConfiguredTargets: vi.fn(async (): Promise<unknown> => []),
  loadProject: vi.fn(async (): Promise<unknown> => null),
  saveProject: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
  listProjects: vi.fn(async () => []),
  deleteProject: vi.fn(async () => ({ ok: true as const })),
  renameProject: vi.fn(async () => ({ ok: true as const })),
  publishProject: vi.fn(async () => ({
    ok: true as const,
    url: "http://mock.lvh.me:3000",
    label: "mock",
  })),
  getEventCounts: vi.fn(async () => []),
  getAdblockLoss: vi.fn(async (): Promise<unknown> => null),
  getVariantCounts: vi.fn(async (): Promise<unknown> => ({ ok: true, rows: [] })),
  getVariantBPublished: vi.fn(async (): Promise<boolean | null> => null),
  saveVariantB: vi.fn(async () => ({ ok: true as const, id: "test-id" })),
  createVariantB: vi.fn(async () => ({ ok: true as const, html: "", mappings: [] })),
  removeVariantB: vi.fn(async () => ({ ok: true as const })),
  setAbTestActive: vi.fn(async () => ({ ok: true as const, abTestActive: true })),
}));

vi.mock("@/app/projects/actions", () => ({
  setCapiToken,
  removeCapiToken,
  listConfiguredTargets,
  loadProject,
  saveProject,
  listProjects,
  deleteProject,
  renameProject,
  publishProject,
  getEventCounts,
  getAdblockLoss,
  getVariantCounts,
  getVariantBPublished,
  saveVariantB,
  createVariantB,
  removeVariantB,
  setAbTestActive,
}));

// DomainManager haengt in der Veroeffentlichen-Flaeche des Containers und zoege sonst
// server-only-Code (status/register) in die Testumgebung.
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

import CodeImporter from "@/components/CodeImporter";

import TargetCard, {
  STATUS_CONFIGURED,
  STATUS_LOADING,
  STATUS_UNCONFIGURED,
  TARGET_CARDS,
} from "@/components/TargetCard";
import type { ConfiguredState } from "@/components/TargetCard";
import type { TrackingTarget } from "@/lib/settings";

afterEach(() => {
  cleanup();
  // ACHTUNG, in diesem Projekt schon zweimal teuer geworden: clearAllMocks leert die
  // AUFRUFE, nicht die Implementierungen und nicht die Once-Warteschlange. Deshalb
  // setzt hier KEIN Test ein bleibendes mockResolvedValue — nur ...Once.
  vi.clearAllMocks();
});

function renderCard(
  overrides: {
    projectId?: string | null;
    target?: TrackingTarget;
    configured?: ConfiguredState;
    pixelId?: string;
    onCredentialsSaved?: (
      forProjectId: string,
      target: TrackingTarget,
      trackingKey: string,
    ) => void;
    onCredentialsRemoved?: (forProjectId: string, target: TrackingTarget) => void;
  } = {},
) {
  const props = {
    projectId: "p1" as string | null,
    target: "meta" as TrackingTarget,
    pixelId: "",
    onPixelIdChange: vi.fn(),
    configured: false as ConfiguredState,
    onCredentialsSaved: vi.fn(),
    onCredentialsRemoved: vi.fn(),
    ...overrides,
  };
  return { ...render(<TargetCard {...props} />), props };
}

describe("TargetCard — die drei Zustaende der Statuszeile", () => {
  // DER KERN DIESER SCHEIBE. Ein Zwei-Zustands-Modell wuerde im unsichersten Moment
  // (noch nicht geladen) die STAERKERE Aussage zeigen. Die drei Faelle stehen
  // deshalb einzeln da, und der Test darunter nagelt fest, dass sie DREI sind.
  it("configured=null -> 'Wird geladen'", () => {
    renderCard({ configured: null });
    expect(screen.getByText(STATUS_LOADING)).toBeTruthy();
  });

  it("configured=false -> 'Nicht konfiguriert'", () => {
    renderCard({ configured: false });
    expect(screen.getByText(STATUS_UNCONFIGURED)).toBeTruthy();
  });

  it("configured=true -> 'Zugangsdaten hinterlegt'", () => {
    renderCard({ configured: true });
    expect(screen.getByText(STATUS_CONFIGURED)).toBeTruthy();
  });

  it("LADEN IST NICHT 'NICHT KONFIGURIERT' — die beiden Texte sind verschieden und schliessen sich aus", () => {
    // Ohne diesen Test waere ein Rueckfall auf zwei Zustaende gruen: es genuegte,
    // STATUS_LOADING auf denselben Text zu setzen wie STATUS_UNCONFIGURED, und die
    // drei Tests darueber blieben allesamt gruen.
    expect(STATUS_LOADING).not.toBe(STATUS_UNCONFIGURED);

    const { unmount } = renderCard({ configured: null });
    expect(screen.queryByText(STATUS_UNCONFIGURED)).toBeNull();
    unmount();

    renderCard({ configured: false });
    expect(screen.queryByText(STATUS_LOADING)).toBeNull();
  });

  it("KEIN Entfernen-Knopf, solange der Zustand nicht geladen ist", () => {
    // Der Ladezustand ist falsy — ohne den expliziten null-Zweig saehe die Karte
    // hier aus wie "nicht konfiguriert", und das ist genau die Aussage, die sie
    // nicht treffen soll.
    renderCard({ configured: null });
    expect(screen.queryByRole("button", { name: /entfernen/i })).toBeNull();
  });
});

describe("TargetCard — der Wortlaut behauptet KEINE Wirkung", () => {
  // Regel aus Phase 8: die Anzeige sagt, was BEOBACHTET ist, nie was FUNKTIONIERT.
  // Eine Geheimnis-Zeile existiert auch bei laengst widerrufenem Token — das ist im
  // Projekt live eingetreten und blieb lautlos ('Bad signature').
  const VERBOTEN = ["aktiv", "läuft", "verbunden", "✓", "•••", "gerettet"];

  it("kein Wort behauptet Wirkung — mit Positivkontrolle, dass der Scan den Kartentext wirklich liest", () => {
    const { container } = renderCard({ configured: true });
    const text = container.textContent ?? "";

    // POSITIVKONTROLLE ZUERST (Projektregel (d) zu Waechtern, die Abwesenheit
    // pruefen): Ohne sie waere ein leerer oder falsch gewaehlter Teilbaum von einem
    // echten Nicht-Treffer nicht zu unterscheiden.
    expect(text).toContain(STATUS_CONFIGURED);
    expect(text).toContain("Meta");

    for (const wort of VERBOTEN) {
      expect(text.toLowerCase()).not.toContain(wort.toLowerCase());
    }
  });

  it("der konfigurierte Zustand ist NIE gruen — geprueft an den gesetzten Klassen, nicht am Text", () => {
    // DIE EINZIGE ZUSICHERUNG GEGEN EIN SPAETERES "KURZ GRUEN MACHEN". Der
    // Wortlaut-Waechter faengt das NICHT: eine Farbe aendert keinen Text.
    // Gruen heisst in der Bildsprache jeder Oberflaeche "laeuft" — der Ausfall
    // der dritten Scheibe (Token widerrufen, Anzeige gruen, Forward tot) ist der
    // Grund, warum diese Karte es nicht sagen darf. Auch nicht in Farbe.
    const GRUEN = /green|emerald|teal|lime/;
    const { container } = renderCard({ configured: true });

    // POSITIVKONTROLLE: Der Scan liest wirklich die Klassen DIESER Karte, und das
    // Status-Element traegt das Gewicht, um das es hier geht. Ohne sie waere ein
    // leerer Scan von einem echten Nicht-Treffer nicht zu unterscheiden.
    const status = screen.getByText(STATUS_CONFIGURED);
    expect(status.className).toContain("font-medium");
    expect(container.querySelectorAll("[class]").length).toBeGreaterThan(5);

    // KEIN Element der Karte traegt eine Gruen-Klasse — auch kein Punkt, kein
    // Rahmen, kein Symbol, das jemand spaeter danebenstellt.
    for (const el of container.querySelectorAll("[class]")) {
      expect(el.className).not.toMatch(GRUEN);
    }
  });

  it("auch der Ladezustand und der unkonfigurierte Zustand tragen keines der Woerter", () => {
    for (const zustand of [null, false] as ConfiguredState[]) {
      const { container, unmount } = renderCard({ configured: zustand });
      const text = (container.textContent ?? "").toLowerCase();
      for (const wort of VERBOTEN) {
        expect(text).not.toContain(wort.toLowerCase());
      }
      unmount();
    }
  });
});

describe("TargetCard — der Folgenlosigkeits-Hinweis haengt an hasAdapter", () => {
  const HINWEIS = /Auslieferung folgt/;

  it("Ziel OHNE Adapter (pinterest) sagt ausdruecklich, dass es noch nicht sendet", () => {
    // Die Karte darf nicht so aussehen, als wuerde sie durch das blosse Hinterlegen
    // von Zugangsdaten senden. Bei Pinterest gibt es in dieser Scheibe keinen
    // Adapter — das MUSS auf der Oberflaeche stehen, nicht nur im Zuschnitt.
    expect(TARGET_CARDS.pinterest.hasAdapter).toBe(false);
    renderCard({ target: "pinterest", configured: true });
    expect(screen.getByText(HINWEIS)).toBeTruthy();
  });

  it("Ziel MIT Adapter (meta) traegt den Hinweis NICHT", () => {
    expect(TARGET_CARDS.meta.hasAdapter).toBe(true);
    renderCard({ target: "meta", configured: true });
    expect(screen.queryByText(HINWEIS)).toBeNull();
  });
});

describe("TargetCard — zwei Karten nebeneinander bleiben unterscheidbar", () => {
  it("die Bedienelemente beider Karten sind EINDEUTIG benannt", () => {
    // Die Projektregel nennt zwei gleich benannte Bedienelemente mit verschiedener
    // Wirkung ein OBERFLAECHEN-Problem. Mit zwei Zielen im selben Drawer waere ein
    // gemeinsames "Setzen"/"Entfernen" genau das — und getByRole wuerde werfen.
    render(
      <div>
        <TargetCard
          projectId="p1"
          target="meta"
          pixelId=""
          onPixelIdChange={vi.fn()}
          configured={true}
          onCredentialsSaved={vi.fn()}
          onCredentialsRemoved={vi.fn()}
        />
        <TargetCard
          projectId="p1"
          target="pinterest"
          pixelId=""
          onPixelIdChange={vi.fn()}
          configured={true}
          onCredentialsSaved={vi.fn()}
          onCredentialsRemoved={vi.fn()}
        />
      </div>,
    );

    // getByRole wirft bei MEHREREN Treffern — der Aufruf selbst ist die Zusicherung.
    expect(screen.getByRole("button", { name: "Meta speichern" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Pinterest speichern" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Meta entfernen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Pinterest entfernen" })).toBeTruthy();
  });

  it("beide Bestaetigungen koennen GLEICHZEITIG offen stehen und bleiben unterscheidbar", () => {
    // Der Grund fuer den Ziel-Namen auch auf dem Bestaetigungs-Knopf: nichts
    // schliesst die eine Bestaetigung, wenn die andere aufgeht. Ein blosses
    // "Ja, entfernen" stuende dann zweimal da — auf zwei verschiedenen Karten.
    render(
      <div>
        <TargetCard
          projectId="p1"
          target="meta"
          pixelId=""
          onPixelIdChange={vi.fn()}
          configured={true}
          onCredentialsSaved={vi.fn()}
          onCredentialsRemoved={vi.fn()}
        />
        <TargetCard
          projectId="p1"
          target="pinterest"
          pixelId=""
          onPixelIdChange={vi.fn()}
          configured={true}
          onCredentialsSaved={vi.fn()}
          onCredentialsRemoved={vi.fn()}
        />
      </div>,
    );

    fireEvent.click(screen.getByRole("button", { name: "Meta entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Pinterest entfernen" }));

    expect(screen.getByRole("button", { name: "Ja, Meta entfernen" })).toBeTruthy();
    expect(screen.getByRole("button", { name: "Ja, Pinterest entfernen" })).toBeTruthy();
  });

  it("die Karte des einen Ziels traegt NIE das Vokabular des anderen", () => {
    // "CAPI-Token" ist METAS Wort. Stuende es auf der Pinterest-Karte, waere die
    // Beschriftung fachlich falsch — und jede Abfrage darauf mehrdeutig.
    const { container } = renderCard({ target: "pinterest" });
    expect(container.textContent).toContain("Pinterest-Zugangsdaten");
    expect(container.textContent).not.toContain("CAPI");
  });
});

describe("TargetCard — die Rueckrufe tragen Projekt UND Ziel", () => {
  it("Speichern ruft setCapiToken(projectId, target, wert) und meldet BEIDE Kennungen zurueck", async () => {
    const onCredentialsSaved = vi.fn();
    renderCard({ target: "pinterest", onCredentialsSaved });

    fireEvent.change(screen.getByPlaceholderText("Zugangsdaten einfügen"), {
      target: { value: "geheim" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Pinterest speichern" }));

    await waitFor(() =>
      expect(setCapiToken).toHaveBeenCalledWith("p1", "pinterest", "geheim"),
    );
    // OHNE das Ziel im Rueckruf wuesste der Container nicht, WELCHER Eintrag in die
    // Liste der konfigurierten Ziele kommt — der Indikator bliebe stehen.
    await waitFor(() =>
      expect(onCredentialsSaved).toHaveBeenCalledWith("p1", "pinterest", "tk-mock"),
    );
  });

  it("Entfernen ruft removeCapiToken(projectId, target) und meldet BEIDE Kennungen zurueck", async () => {
    const onCredentialsRemoved = vi.fn();
    renderCard({ target: "pinterest", configured: true, onCredentialsRemoved });

    fireEvent.click(screen.getByRole("button", { name: "Pinterest entfernen" }));
    fireEvent.click(screen.getByRole("button", { name: "Ja, Pinterest entfernen" }));

    await waitFor(() =>
      expect(removeCapiToken).toHaveBeenCalledWith("p1", "pinterest"),
    );
    await waitFor(() =>
      expect(onCredentialsRemoved).toHaveBeenCalledWith("p1", "pinterest"),
    );
  });

  it("NACHZUEGLER: der Rueckruf traegt die Kennung des Projekts, in dem gespeichert wurde", async () => {
    // Der Befund aus der Aufklaerung: Loest die Action erst NACH einem
    // Projektwechsel auf, schriebe der Container die fremde Antwort in das neue
    // Projekt. Er kann das nur abweisen, weil die Karte die Kennung MITGIBT — sie
    // stammt aus dem Aufruf-Zeitpunkt, nicht aus dem Zustand des Containers.
    const onCredentialsSaved = vi.fn();
    renderCard({ projectId: "alt-projekt", onCredentialsSaved });

    fireEvent.change(screen.getByPlaceholderText("CAPI-Token einfügen"), {
      target: { value: "geheim" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));

    await waitFor(() => expect(onCredentialsSaved).toHaveBeenCalled());
    expect(onCredentialsSaved.mock.calls[0][0]).toBe("alt-projekt");
  });

  it("Fehlschlag: die Meldung erscheint UND kein Rueckruf laeuft (der Container spiegelt nichts)", async () => {
    setCapiToken.mockResolvedValueOnce({ ok: false as const, error: "Token abgelehnt." });
    const onCredentialsSaved = vi.fn();
    renderCard({ onCredentialsSaved });

    fireEvent.change(screen.getByPlaceholderText("CAPI-Token einfügen"), {
      target: { value: "geheim" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));

    expect(await screen.findByText("Token abgelehnt.")).toBeTruthy();
    expect(onCredentialsSaved).not.toHaveBeenCalled();
  });
});

describe("TargetCard — ohne gespeichertes Projekt", () => {
  it("das Geheimnis-Feld ist deaktiviert und es gibt keinen Entfernen-Knopf", () => {
    // Ohne projectId gibt es kein Ziel fuer die Ablage. Der Entfernen-Knopf haengt
    // zusaetzlich an projectId — sonst stuende er da und liefe ins Leere.
    renderCard({ projectId: null, configured: true });
    const feld = screen.getByPlaceholderText(
      "Neuen Token eingeben zum Ersetzen",
    ) as HTMLInputElement;
    expect(feld.disabled).toBe(true);
    expect(screen.queryByRole("button", { name: "Meta entfernen" })).toBeNull();
  });

  it("das Geheimnis-Feld ist write-only: es startet leer und wird NIE aus einem Wert gespeist", () => {
    // Der echte Token faehrt nie in den Client. Die Karte hat kein Prop dafuer —
    // dieser Test nagelt fest, dass auch der KONFIGURIERTE Zustand nichts anzeigt.
    renderCard({ configured: true });
    const feld = screen.getByPlaceholderText(
      "Neuen Token eingeben zum Ersetzen",
    ) as HTMLInputElement;
    expect(feld.value).toBe("");
    expect(feld.type).toBe("password");
  });
});

/**
 * DER WAECHTER FUER DEN KENNUNGS-VERGLEICH IM CONTAINER.
 *
 * WARUM ER IN DIESER DATEI STEHT UND NICHT IN CodeImporter.test.tsx: Der Umfang
 * jener Datei ist fuer diese Scheibe festgeschrieben. Sein natuerlicher Ort ist
 * dort — er rendert den CONTAINER, nicht die Karte. Wer den Umfang jener Datei das
 * naechste Mal oeffnet, verschiebt ihn.
 *
 * ER IST DER EINZIGE TEST IM REPO, DER DEN RIEGEL PRUEFT (per Mutationsprobe
 * belegt: ohne ihn bleibt das Entfernen von `if (forProjectId !== ...)` GRUEN).
 * Wer ihn fuer redundant haelt, nimmt die einzige Abdeckung mit.
 */
describe("Container-Waechter: ein Rueckruf nach dem Projektwechsel darf NICHTS aendern", () => {
  const HTML = `<h1 data-pagesmith-id="ps-aaaaaa">Titel</h1>`;

  it("die Antwort fuer Projekt A laesst den Indikator von Projekt B unberuehrt", async () => {
    // Der Nachzuegler wird HERGESTELLT, nicht simuliert: die Action bleibt offen,
    // bis der Wechsel vollzogen ist. Genau diese Reihenfolge erzeugt der echte
    // Ablauf, wenn eine langsame Antwort einen schnellen Wechsel ueberholt.
    let antwortFuerA: ((wert: unknown) => void) | null = null;
    setCapiToken.mockImplementationOnce(
      (() =>
        new Promise((resolve) => {
          antwortFuerA = resolve;
        })) as never,
    );
    // P1 hat nichts, P2 hat PINTEREST. Der Unterschied ist die VERANKERUNG: Ohne
    // ihn war dieser Test schon einmal gruen, weil P2s noch laufender Lade-Vorgang
    // den fremden Eintrag ueberschrieb — der Riegel wurde dabei nie geprueft
    // (Projektregel: ein grobes Instrument reisst die Voraussetzung mit).
    listConfiguredTargets.mockResolvedValueOnce([]);
    listConfiguredTargets.mockResolvedValueOnce(["pinterest"]);
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
          { id: "p1", name: "P1", updated_at: "2026-01-01T00:00:00Z" },
          { id: "p2", name: "P2", updated_at: "2026-01-02T00:00:00Z" },
        ]}
      />,
    );
    await screen.findByText("Titel");
    fireEvent.click(screen.getByRole("button", { name: /Einstellungen/ }));

    // In Projekt A speichern — die Antwort bleibt aus.
    fireEvent.change(screen.getByPlaceholderText("CAPI-Token einfügen"), {
      target: { value: "geheim-von-A" },
    });
    fireEvent.click(screen.getByRole("button", { name: "Meta speichern" }));
    await waitFor(() =>
      expect(setCapiToken).toHaveBeenCalledWith("p1", "meta", "geheim-von-A"),
    );

    // Auf B wechseln. VORBEDINGUNG mit Beweiskraft: B hat PINTEREST hinterlegt —
    // steht dieser Text da, ist Bs Lade-Vorgang nachweislich ABGESCHLOSSEN und
    // kann den fremden Eintrag nicht mehr wegraeumen. Metas Karte steht dann als
    // EINZIGE auf "nicht konfiguriert", die Abfrage darauf ist eindeutig.
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));
    expect(await screen.findByText(STATUS_CONFIGURED)).toBeTruthy();
    expect(screen.getByText(STATUS_UNCONFIGURED)).toBeTruthy();

    // JETZT trifft die Antwort fuer A ein. Sie gehoert einem Projekt, das nicht
    // mehr offen ist.
    await act(async () => {
      antwortFuerA?.({ ok: true, trackingKey: "tk-von-A" });
    });

    // OHNE den Kennungs-Vergleich stuende Metas Karte hier auf "Zugangsdaten
    // hinterlegt" — Projekt B haette den Zustand von Projekt A geerbt.
    expect(screen.getAllByText(STATUS_CONFIGURED)).toHaveLength(1);
    expect(screen.getByText(STATUS_UNCONFIGURED)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Meta entfernen" })).toBeNull();
  });
});
