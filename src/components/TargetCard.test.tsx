import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
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
import { TRACKING_TARGETS, type TrackingTarget } from "@/lib/settings";

afterEach(() => {
  cleanup();
  // ACHTUNG, in diesem Projekt schon zweimal teuer geworden: clearAllMocks leert die
  // AUFRUFE, nicht die Implementierungen und nicht die Once-Warteschlange. Deshalb
  // setzt hier KEIN Test ein bleibendes mockResolvedValue — nur ...Once.
  vi.clearAllMocks();
});

/**
 * METAS KARTE als Anker fuer EINGEGRENZTE Abfragen.
 *
 * WARUM ES DEN ANKER BRAUCHT: Jede Karte zeigt denselben Statustext. Eine
 * unqualifizierte Abfrage darauf ist nur so lange eindeutig, wie GENAU EINE Karte
 * im gesuchten Zustand steht — eine Voraussetzung, die von der ZAHL DER ZIELE
 * abhaengt und mit jedem weiteren Ziel neu bricht. Der Kartenname ist dagegen
 * eindeutig und bleibt es.
 *
 * DER ANKER IST DER KOPF DER KARTE (Name und Status stehen in derselben Zeile).
 * Bewusst NICHT ueber die Platzhalter der Eingabefelder: Das Geheimnis-Feld traegt
 * bei Pinterest und TikTok denselben Platzhaltertext — unterschieden werden sie
 * ueber ihre BESCHRIFTUNG, nicht ueber den Platzhalter.
 */
function metaKarte(): HTMLElement {
  return screen.getByText(TARGET_CARDS.meta.name).parentElement!;
}

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

  // =====================================================================
  // WAS DIESER TEST ERSETZT, und warum er anders gebaut ist als seine zwei
  // Vorgaenger (Phase 11, zwoelfte Scheibe):
  //
  // Bis hierher standen hier ZWEI Tests — "Ziel OHNE Adapter (pinterest) sagt
  // ausdruecklich, dass es noch nicht sendet" (der den Hinweis erwartete) und "Ziel
  // MIT Adapter (meta) traegt den Hinweis NICHT". Der erste ist mit dem zweiten
  // Zweig in dispatchForward inhaltlich FALSCH geworden: Pinterest wird jetzt
  // beliefert, hasAdapter ist true, der Hinweis erscheint zu Recht nicht mehr. Der
  // zweite blieb zwar gruen, unterschied aber nichts mehr — ohne ein Ziel, das den
  // Hinweis traegt, waere er auch dann gruen, wenn der Render-Zweig ersatzlos
  // gestrichen wuerde. BEIDE gehen in diesem einen auf.
  //
  // ER LAEUFT UEBER DIE ZIEL-LISTE, NICHT UEBER EINE HANDLISTE: Kommt ein DRITTES
  // Ziel dazu, dessen Adapter noch fehlt, wird dieser Test ROT — und das ist genau
  // die Erinnerung, die der Mechanismus dann braucht ("setz hasAdapter: false, dann
  // sagt die Karte es von selbst"). Eine Handliste haette geschwiegen.
  //
  // VERWORFEN: ein Test, der TARGET_CARDS zur Laufzeit mutiert, um den unerreichten
  // Render-Zweig doch noch auszuloesen. Er koppelte sich an die Reihenfolge der
  // Tests (das exportierte Objekt ist geteilter Modulzustand) — genau die Klasse,
  // die in der elften Scheibe fuenf statt drei Tests hat fallen lassen.
  // =====================================================================
  it("KEIN Ziel traegt den Hinweis — und die Daten sagen dasselbe wie die Oberflaeche", () => {
    for (const target of TRACKING_TARGETS) {
      const { container, unmount } = renderCard({ target, configured: true });

      // POSITIVKONTROLLE, ohne die eine Abwesenheits-Behauptung wertlos waere: Ein
      // leerer Render und ein echter Nicht-Treffer saehen sonst gleich aus. Der
      // Statustext beweist, dass DIESE Karte wirklich gerendert wurde.
      expect(screen.getByText(STATUS_CONFIGURED)).toBeTruthy();
      expect(container.textContent).toContain(TARGET_CARDS[target].publicLabel);

      // Die DATEN-Seite und die OBERFLAECHEN-Seite derselben Aussage, getrennt
      // geprueft: Ein Umlegen des Feldes ohne Wirkung im Render (oder umgekehrt)
      // faellt nur so auf.
      expect(TARGET_CARDS[target].hasAdapter).toBe(true);
      expect(screen.queryByText(HINWEIS)).toBeNull();

      unmount();
    }
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

/**
 * DIE KARTE FRAGT NACH DER RICHTIGEN KENNUNG (Phase 11, elfte Scheibe).
 *
 * DER GEGENSTAND, in einem Satz: Die Karte des zweiten Ziels fragte nach der
 * TAG-Kennung des Browser-Tags, den wir gar nicht injizieren; der Adapter braucht
 * die KONTO-Kennung, die im Endpunkt-Pfad steht. Zwei verschiedene Nummern im
 * selben Anbieter-Konto.
 *
 * WARUM EINE AENDERUNG VON DREI ZEICHENKETTEN EINEN EIGENEN TESTBLOCK BEKOMMT —
 * und das ist die tragende Auflage der Scheibe, kein Zierrat: Vor diesem Block
 * waehlte KEIN Test die drei Zeichenketten und KEINER behauptete sie. Die
 * Korrektur brach also nichts, und nichts hielte fest, dass sie stattgefunden
 * hat. Ihre spaetere Ruecknahme waere ebenso still gewesen wie ihr Ausbleiben.
 */
describe("TargetCard — die Karte fragt nach der richtigen Kennung", () => {
  it("T1: die Beschriftung nennt die KONTO-Kennung, nicht die Tag-Kennung", () => {
    // ZWEI ASSERTIONS, UND DIE ZWEITE IST DER EIGENTLICHE WAECHTER: "enthaelt
    // Anzeigenkonto" allein bestuende auch ein Text, der BEIDE Groessen nennt.
    // "Anzeigenkonto-ID" ist der Wortlaut, den der Betreiber im Anbieter-Konto
    // wiederfindet (Kopier-Tooltip, deutschsprachige Oberflaeche) — nicht die
    // interne Bezeichnung "Konto-Kennung" und nicht der Schnittstellen-Name
    // ad_account_id.
    expect(TARGET_CARDS.pinterest.publicLabel).toContain("Anzeigenkonto");
    expect(TARGET_CARDS.pinterest.publicLabel).not.toContain("Tag");
  });

  it("T2: der Platzhalter zeigt nicht mehr die Tag-Kennung und beruehrt Metas Muster nicht", () => {
    // DREI ASSERTIONS AUF DREI VERSCHIEDENEN ACHSEN.
    //
    // (1) DIE KORREKTUR: der Platzhalter nannte die dreizehnstellige TAG-Kennung.
    // (2) DER RAND, und er wirkt ueber die Dateigrenze: CodeImporter.test.tsx
    //     waehlt Metas oeffentliches Feld ueber dessen Platzhalter, per
    //     getByPlaceholderText(/123456789012345/) — ein TEILSTRING-Muster.
    //     getByPlaceholderText wirft bei MEHREREN Treffern, und im Container
    //     stehen beide Karten im selben Baum. Ein Platzhalter, der diese fuenfzehn
    //     Ziffern ENTHIELTE, machte dort zwei Tests mehrdeutig.
    // (3) Die beiden Karten zeigen nicht dasselbe Beispiel.
    //
    // KEINE PRUEFUNG DER STELLENZAHL, und das ist eine Entscheidung (Owner,
    // 2026-08-10), keine Luecke: Ein Test, der zwoelf Stellen behauptet, machte
    // aus einer ungepruesten ABLESUNG im Anbieter-Konto eine Zusicherung UNSERES
    // Codes. Aendert der Anbieter das Format, wuerde er rot aus einem Grund, der
    // mit unserem Bau nichts zu tun hat — und der Naechste reparierte den
    // Platzhalter passend zum Test statt passend zur Wirklichkeit. Der Platzhalter
    // HAT zwoelf Stellen; dieser Test sichert die GRENZE, nicht die Ablesung.
    expect(TARGET_CARDS.pinterest.publicPlaceholder).not.toContain("2612345678901");
    expect(TARGET_CARDS.pinterest.publicPlaceholder).not.toContain("123456789012345");
    expect(TARGET_CARDS.pinterest.publicPlaceholder).not.toBe(
      TARGET_CARDS.meta.publicPlaceholder,
    );
  });

  it("T3: der Hilfetext trifft eine WAHRE Aussage ueber dieses Ziel", () => {
    // Fuer das ERSTE Ziel ist "steht im Seitenquelltext" wahr: buildMetaRuntime
    // bettet die Kennung als PS_PIXEL_ID in den erzeugten Text ein. Fuer das
    // ZWEITE injiziert kein Erzeuger irgendetwas — dort landet allein der
    // Consent-Schluessel, nie der Wert. Der Hilfetext muss das sagen.
    expect(TARGET_CARDS.pinterest.publicHint).toContain("nicht im Seitenquelltext");
  });

  // =====================================================================
  // T4 — DER EINZIGE TEST, DER DIE WIEDER-VEREINHEITLICHUNG FAENGT.
  //
  // Er steht hier mit diesem Kommentar, weil die Projektregel es verlangt: Traegt
  // ein einzelner Test eine Fehlerklasse, gehoert das in seinen Kommentar — sonst
  // entfernt ihn spaeter jemand als vermeintlich redundant und nimmt die einzige
  // Abdeckung mit.
  //
  // DIE FEHLERKLASSE: Der Hilfetext stand in BEIDEN Karten BYTE-GLEICH und sah
  // deshalb wie ein neutraler, geteilter Satz aus. Er war aber eine
  // ZIEL-SPEZIFISCHE Tatsachenbehauptung, und nur an einer der beiden Stellen
  // stimmte sie. Ein Satz, der an zwei Stellen identisch steht und nur an einer
  // stimmt, ist die unauffaelligste Form einer falschen Aussage — und die
  // Gleichheit liest sich als Absicht.
  //
  // WARUM DIESE FORM UND KEINE WORTLAUT-ZUSICHERUNG: Der Vergleich laeuft
  // zwischen den beiden LEBENDEN Werten, nicht gegen ein Literal. Er faengt
  // deshalb JEDE Wieder-Vereinheitlichung, in BEIDE Richtungen und mit JEDEM
  // Wortlaut — auch die, bei der jemand beide Karten auf einen neuen gemeinsamen
  // Text setzt. Eine Zusicherung auf den neuen Wortlaut faenge sie erst, wenn
  // jemand zufaellig den alten Text wieder traefe.
  // =====================================================================
  it("T4: die Hilfetexte der beiden Karten sind NICHT identisch", () => {
    expect(TARGET_CARDS.pinterest.publicHint).not.toBe(
      TARGET_CARDS.meta.publicHint,
    );
  });

  it("T5: die Karte des ERSTEN Ziels bleibt unveraendert", () => {
    // Invariante 3 der Scheibe. Er ist KEIN Zeuge der Korrektur — er lief schon
    // vorher gruen und soll es bleiben; er faengt die versehentliche
    // Mitaenderung des Nachbarn.
    expect(TARGET_CARDS.meta.publicLabel).toBe("Meta-Pixel-ID");
    expect(TARGET_CARDS.meta.publicHint).toBe("Öffentlich, steht im Seitenquelltext");
    expect(TARGET_CARDS.meta.publicPlaceholder).toBe("z.B. 123456789012345");
  });

  it("T6: die Beschriftung kommt auch auf dem Bildschirm an", () => {
    // T1 prueft den DATENSATZ, dieser Test den gerenderten Baum — zwei
    // verschiedene Fehler: ein falscher Wert gegen einen, der die JSX gar nicht
    // mehr erreicht.
    //
    // GEPRUEFT WIRD UEBER container.textContent UND NICHT ueber getByText, und
    // das ist kein Geschmack: Beschriftung und Hilfetext liegen im SELBEN
    // aeusseren <span> (der Hilfetext als verschachteltes <span> darin). Ein
    // Text-Matcher traefe damit Eltern UND Kind, und getByText wirft bei
    // mehreren Treffern.
    const { container } = renderCard({ target: "pinterest" });
    expect(container.textContent).toContain("Pinterest-Anzeigenkonto-ID");
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
    // kann den fremden Eintrag nicht mehr wegraeumen.
    //
    // DIE ABFRAGE WIRD AUF METAS KARTE EINGEGRENZT, NICHT AUF EINE ZAHL. Hier
    // stand bis zur TikTok-Scheibe eine unqualifizierte Abfrage auf den
    // Statustext — sie setzte voraus, dass Metas Karte die EINZIGE unkonfigurierte
    // ist, und genau das galt nur, solange es ZWEI Ziele gab. Eine Zaehlung waere
    // dieselbe Abhaengigkeit in neuer Gestalt: bei drei Zielen gruen, beim vierten
    // wieder rot. Der Anker ist deshalb Metas Karte selbst — er traegt unabhaengig
    // davon, wie viele Ziele daneben stehen.
    fireEvent.click(screen.getByRole("button", { name: "Projekte" }));
    fireEvent.click(await screen.findByText("P2"));
    expect(await screen.findByText(STATUS_CONFIGURED)).toBeTruthy();
    expect(within(metaKarte()).getByText(STATUS_UNCONFIGURED)).toBeTruthy();

    // JETZT trifft die Antwort fuer A ein. Sie gehoert einem Projekt, das nicht
    // mehr offen ist.
    await act(async () => {
      antwortFuerA?.({ ok: true, trackingKey: "tk-von-A" });
    });

    // OHNE den Kennungs-Vergleich stuende Metas Karte hier auf "Zugangsdaten
    // hinterlegt" — Projekt B haette den Zustand von Projekt A geerbt.
    expect(screen.getAllByText(STATUS_CONFIGURED)).toHaveLength(1);
    expect(within(metaKarte()).getByText(STATUS_UNCONFIGURED)).toBeTruthy();
    expect(screen.queryByRole("button", { name: "Meta entfernen" })).toBeNull();
  });
});
