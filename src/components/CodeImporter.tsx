"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import {
  anchorMappingTarget,
  annotateAndDetect,
  filterElements,
  stabilizeIds,
  type ElementFilter,
  type ElementType,
} from "@/lib/detect";
import {
  createVariantB,
  deleteProject,
  getVariantBPublished,
  getAdblockLoss,
  getEventCounts,
  getVariantCounts,
  listProjects,
  loadProject,
  publishProject,
  removeCapiToken,
  removeVariantB,
  renameProject,
  saveProject,
  saveVariantB,
  setAbTestActive as setAbTestActiveAction,
  setCapiToken,
  type AdblockLoss,
  type EventCount,
  type ProjectListItem,
  type VariantCountsResult,
} from "@/app/projects/actions";
// Der reservierte PageView-Token als KONSTANTE, nicht als Literal (Scheibe 9c-1). Die
// Datei traegt bewusst KEIN "server-only" (dort ausdruecklich kommentiert), ist also
// client-importierbar — genau dafuer wurde sie seinerzeit aus tracking/meta.ts geloest.
import { PAGEVIEW_EVENT } from "@/lib/analytics/events";
import {
  findMapping,
  findOrphans,
  mappingsEqual,
  removeMapping,
  upsertMapping,
  displayTextFor,
  type Mapping,
  type RedirectConfig,
  type TextConfig,
  type TrackConfig,
} from "@/lib/mappings";
import { editPreviewHtml, generateFunctional } from "@/lib/generate";
import {
  getCapiTokenSet,
  getHostingLabel,
  getMetaPixelId,
  getTrackingKey,
  setCapiState,
  setHostingState,
  setMetaPixelId,
  settingsEqual,
  type ProjectSettings,
} from "@/lib/settings";
import { getCapiProxyUrl } from "@/lib/capi/proxy";
import { buildLiveUrl } from "@/lib/hosting/host";
import {
  emptyPublishVariant,
  EMPTY_PUBLISH_MESSAGE,
  EMPTY_VARIANT_A_MESSAGE,
  EMPTY_VARIANT_B_MESSAGE,
  VARIANT_B_NOT_PUBLISHED_MESSAGE,
} from "@/lib/hosting/variant";
import {
  SAVE_THROW_MESSAGE,
  actionThrew,
  safeAction,
} from "@/lib/safe-action";
import { exportFilename } from "@/lib/export";
import { validateUploadFile } from "@/lib/upload";
import ActionPanel from "@/components/ActionPanel";
import DomainManager from "@/components/DomainManager";

// Parsing + iframe-Preview sind die teuren Verbraucher. Sie sollen erst nach
// einer kurzen Tipp-Pause aktualisieren, damit grosse Landingpages die Eingabe
// nicht ausbremsen.
const DEBOUNCE_MS = 300;

const typeStyles: Record<ElementType, string> = {
  button: "bg-blue-100 text-blue-800 border-blue-200",
  form: "bg-green-100 text-green-800 border-green-200",
  link: "bg-amber-100 text-amber-800 border-amber-200",
  text: "bg-purple-100 text-purple-800 border-purple-200",
};

// Icon je Mapping-Typ fuer Badges (Liste) + Orphan-Karten. EINE Quelle.
const ACTION_ICON: Record<Mapping["type"], string> = {
  redirect: "🔗",
  track: "🎯",
  text: "✎",
};

// Anzeige-Label je event_type fuer die Analytics-Sektion (Scheibe 3). Der reservierte
// PageView-Token wird lesbar; jeder Conversion-Name (Purchase/Lead/Custom…) steht als
// Klartext.
//
// MITGENOMMEN IN 9c-1 (deklariert, nicht stillschweigend): hier stand '__ps_pageview' als
// handgetipptes LITERAL mit dem Kommentar, es MUESSE mit PAGEVIEW_EVENT uebereinstimmen —
// eine Uebereinstimmung per Zusage statt per Konstruktion. Da 9c-1 mit der Nenner/Zaehler-
// Trennung eine ZWEITE Stelle in dieser Datei anlegt, die denselben Token kennt, waere das
// Literal ab jetzt die dritte Fundstelle desselben Wertes gewesen. Die Konstante ist
// client-importierbar (events.ts traegt bewusst kein server-only), also gibt es keinen
// Grund fuer ein Duplikat. Verhalten unveraendert; durch die bestehenden Render-Tests
// gedeckt.
function eventTypeLabel(eventType: string): string {
  return eventType === PAGEVIEW_EVENT ? "PageViews" : eventType;
}

// FESTE Anzeige-Reihenfolge der Badges pro Element (Scheibe 1a): deterministisch,
// damit ein Mehr-Aktion-Element (redirect + track) stets gleich rendert (kein
// Set-Iterations-Flackern, stabile Tests).
const ACTION_BADGE_ORDER: Mapping["type"][] = ["redirect", "track", "text"];

// Welche Element-Kategorie darf ein verwaister Mapping-Typ neu ankern? Strikte
// Kategorientrennung (Phase 5): ein text-Override nur auf einen Textkandidaten,
// ein redirect nur auf ein interaktives Element (Button/Form/Link). Verhindert
// einen "klickbaren Absatz" oder ein Text-Override auf einem Button durch die
// Relink-Hintertuer. Weg-C unberuehrt — der Mensch waehlt, wir bieten nur
// Sinnvolles an (kein stilles Raten).
function isRelinkTarget(
  orphanType: Mapping["type"],
  elType: ElementType
): boolean {
  return orphanType === "text" ? elType === "text" : elType !== "text";
}

// Zustaende des Speichern-Buttons. saved faellt per Timeout zurueck auf idle.
type SaveStatus = "idle" | "saving" | "saved" | "error";

// Zustaende des Copy-Buttons. copied/error fallen per Timeout zurueck auf idle.
// Ehrliches Feedback ist Pflicht: navigator.clipboard kann in unsicherem Kontext
// oder ohne Permission fehlschlagen -> kein stilles Nichts.
type CopyStatus = "idle" | "copied" | "error";

export default function CodeImporter({
  initialCode = "",
  initialProjectId = null,
  initialProjects = [],
  initialMappings = [],
  initialSettings = {},
  initialVariantBHtml = null,
  initialVariantBMappings = null,
  initialAbTestActive = false,
}: {
  // Auto-Load: das zuletzt bearbeitete (bereits stabilisierte) HTML des Users.
  // Leer -> Editor startet leer wie bisher.
  initialCode?: string;
  // Aktives Projekt beim ersten Laden (3.3). null -> leerer "Unbenanntes
  // Projekt"-Zustand, der noch KEINE DB-Zeile hat.
  initialProjectId?: string | null;
  // Projektliste fuer den Switcher (server-seitig vorgeladen, danach clientseitig
  // aktuell gehalten).
  initialProjects?: ProjectListItem[];
  // Aktions-Zuweisungen des geladenen Projekts (zusammen mit initialCode geseedet).
  initialMappings?: Mapping[];
  // Projektweite Einstellungen (Scheibe 1b), z.B. Meta-Pixel-ID. Parallel zu
  // initialMappings geseedet; reine Projekt-Daten (kein View-State).
  initialSettings?: ProjectSettings;
  // Variante B des geladenen Projekts (Phase 9 Scheibe 9a), aus projects.html_b /
  // projects.mappings_b. BEIDE null = dieses Projekt hat KEINE Variante B.
  initialVariantBHtml?: string | null;
  initialVariantBMappings?: Mapping[] | null;
  // Laeuft der A/B-Test? (Phase 9 Scheibe 9b-1). Aus projects.ab_test_active —
  // SERVER-autoritativ, projekt-abgeleitet wie die beiden Felder darueber.
  initialAbTestActive?: boolean;
}) {
  // Eingabe-State: aendert sich bei JEDEM Tastendruck und haelt die Textarea
  // sofort aktuell (Tippen darf nie auf Parsing/Preview warten). Startet mit dem
  // geladenen Projekt-Code.
  const [code, setCode] = useState(initialCode);
  // Aktives Projekt. null = neues, noch nicht gespeichertes Projekt (keine
  // DB-Zeile bis zum ersten Speichern).
  const [projectId, setProjectId] = useState<string | null>(initialProjectId);
  // Projektliste fuer den Switcher (zuletzt bearbeitet zuerst).
  const [projects, setProjects] = useState<ProjectListItem[]>(initialProjects);
  // Zuletzt gespeicherter/geladener Code -> Dirty-Erkennung, schuetzt vor stillem
  // Verlust beim Wechseln/Neu-Anlegen.
  const [savedCode, setSavedCode] = useState(initialCode);
  // Aktions-Zuweisungen (per stabiler ps-ID). Mapping-Aenderungen fassen den Code
  // NICHT an -> sie brauchen eine EIGENE Dirty-Baseline, sonst stiller Verlust
  // beim Projektwechsel.
  const [mappings, setMappings] = useState<Mapping[]>(initialMappings);
  const [savedMappings, setSavedMappings] = useState<Mapping[]>(initialMappings);
  // Projektweite Einstellungen (Scheibe 1b) + ihre Dirty-Baseline. Spiegeln
  // mappings/savedMappings 1:1: reseedet an GENAU denselben Projekt-Load-Punkten,
  // sonst leakt die Pixel-ID von Projekt A nach B. Settings fassen den Code NICHT
  // an -> eigene Baseline noetig (wie mappings).
  const [settings, setSettings] = useState<ProjectSettings>(initialSettings);
  const [savedSettings, setSavedSettings] =
    useState<ProjectSettings>(initialSettings);
  // A/B-VARIANTEN (Phase 9 Scheibe 9a) — WURZELTAUSCH-MODELL.
  //
  // Der Editor arbeitet IMMER auf genau EINER Variante, und zwar ueber die
  // bestehenden Wurzeln code/mappings. Der Umschalter TAUSCHT diese Wurzeln; alles
  // Abgeleitete (erkannte Elemente, Badges, Orphan-/Weg-C-Netz, Preview, Edit-
  // iframe, Export-Dokument, dirty) haengt unveraendert an ihnen und leitet sich
  // damit AUTOMATISCH und VOLLSTAENDIG neu ab. Es gibt bewusst KEINE parallelen
  // codeA/codeB-States: die muessten an jeder der ~20 Ableitungsstellen richtig
  // ausgewaehlt werden, und eine vergessene Stelle zeigte A-Zustand ueber B-HTML.
  //
  // stashHtml/stashMappings halten den GESPEICHERTEN Stand der INAKTIVEN Variante.
  // Sie sind projekt-abgeleiteter View-State (Spiegel von html_b/mappings_b) und
  // werden darum am kanonischen Projekt-Lade-Punkt ABGELEITET, nicht nur geleert
  // ("ABLEITEN STATT LOESCHEN").
  //
  // INVARIANTE des Stash: er ist genau dann null, wenn Variante A aktiv ist UND das
  // Projekt keine Variante B hat. Ist B aktiv, haelt er A (immer ein String, ggf.
  // "") -> "B existiert" ist unten aus beidem ableitbar, ohne zweites Flag.
  const [activeVariant, setActiveVariant] = useState<"a" | "b">("a");
  const [stashHtml, setStashHtml] = useState<string | null>(initialVariantBHtml);
  const [stashMappings, setStashMappings] = useState<Mapping[] | null>(
    initialVariantBMappings
  );
  // Laeuft der A/B-Test? (9b-1) Projekt-ABGELEITET wie der Stash: wird am
  // kanonischen Lade-Chokepoint (seedVariantState) aus dem GELADENEN Projekt
  // gesetzt und nach dem Umschalten aus der SERVER-Antwort uebernommen, nie lokal
  // angenommen.
  const [abTestActive, setAbTestActive] = useState(initialAbTestActive);
  // Variante-B-Aktionen: transienter Status (destruktives Entfernen zweistufig,
  // exakt wie beim CAPI-Token). Projekt-ungebunden -> beim Kontextwechsel leeren.
  const [variantBusy, setVariantBusy] = useState(false);
  // LOKALER Fehler-Kanal der Varianten-Sektion (Scheibe 9b-1p), Muster
  // <state>Error + <state>Status wie capiTokenError/publishError. Vorher schrieben
  // die drei Varianten-Handler in den ZENTRALEN saveError, der nur EINMAL gerendert
  // wird — in der Preview-Kopfzeile, mit "truncate": die Meldung erschien weit weg
  // vom geklickten Button und abgeschnitten. saveError bleibt fuer seine uebrigen
  // Schreiber (Speichern, Projektwechsel, Loeschen, Umbenennen) UNVERAENDERT.
  const [variantStatus, setVariantStatus] = useState<"idle" | "error">("idle");
  const [variantError, setVariantError] = useState<string | null>(null);
  // Ist die VEROEFFENTLICHTE Variante B auslieferbar? (9b-1p) null = nicht
  // ermittelbar -> es wird NICHTS behauptet. Projekt-abgeleitet ueber den Effect
  // unten, nie lokal angenommen.
  const [variantBPublished, setVariantBPublished] = useState<boolean | null>(null);
  // Refetch-Signal fuer genau die beiden Ereignisse, die den Wert aendern koennen
  // (Publish, removeVariantB). Muster: pollTick im DomainManager. Wird NUR in diesen
  // beiden Handlern hochgezaehlt — nirgends beim Projektwechsel, sonst liefe der
  // Effect dort doppelt (projectId aendert sich bereits).
  const [variantBPublishTick, setVariantBPublishTick] = useState(0);
  const [variantBRemoveConfirming, setVariantBRemoveConfirming] =
    useState(false);
  // Ausklappbares Einstellungs-Panel (Tracking-Pixel). Reiner View-State.
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  // Write-only-Eingabe fuer den GEHEIMEN CAPI-Token (Scheibe 2a). Startet IMMER
  // leer und wird NIE aus settings gespeist -> der echte Token faehrt nie in den
  // Client. Der "gesetzt?"-Indikator kommt aus settings.capi.tokenSet, nicht hier.
  const [capiTokenInput, setCapiTokenInput] = useState("");
  const [capiTokenStatus, setCapiTokenStatus] = useState<
    "idle" | "saving" | "saved" | "error"
  >("idle");
  const [capiTokenError, setCapiTokenError] = useState<string | null>(null);
  // Token-Entfernen: zweistufige Inline-Bestaetigung (destruktiv -> deaktiviert Tracking).
  // Reiner View-State, projekt-ungebunden -> beim Projektwechsel mit zuruecksetzen.
  const [capiRemoveConfirming, setCapiRemoveConfirming] = useState(false);
  const [capiRemoving, setCapiRemoving] = useState(false);
  // Hosting/Publish (Phase 7 Scheibe 7a). NUR der TRANSIENTE Aktions-Status lebt hier;
  // der "veröffentlicht?"-Zustand + die Live-URL werden AUS settings.hosting ABGELEITET
  // (hostingLabel/liveUrl unten), NICHT als eigener leakender State gehalten — exakt
  // wie getCapiTokenSet aus settings. So reseedet ein Projektwechsel den Indikator
  // automatisch mit settings, ohne separaten Reset-Pfad.
  const [publishStatus, setPublishStatus] = useState<
    "idle" | "publishing" | "published" | "error"
  >("idle");
  const [publishError, setPublishError] = useState<string | null>(null);
  // Wurde beim letzten Publish eine FEHLENDE Label-Zeile wiederhergestellt (die
  // Live-URL war bis dahin tot)? Transienter Aktions-Status wie publishStatus —
  // beim Projektwechsel geleert, NICHT projekt-abgeleitet.
  const [publishRestored, setPublishRestored] = useState(false);
  // Analytics-Counts (Phase 8 Scheibe 3): gruppierte event_type-Counts des aktiven
  // Projekts. Projekt-abgeleitet -> reseedet ueber einen projectId-gekoppelten Effect
  // (leer bei keinem/neuem Projekt), NICHT als leakender State gehalten.
  const [eventCounts, setEventCounts] = useState<EventCount[]>([]);
  // Adblocker-Verlustrate (Phase 8 Scheibe B). null = noch keine Aussage moeglich
  // (Neutral-Status), NICHT "0% Verlust". Projekt-abgeleitet wie eventCounts.
  const [adblockLoss, setAdblockLoss] = useState<AdblockLoss | null>(null);
  // Auswertung je Variante (Phase 9 Scheibe 9c-1). DREI Zustaende, bewusst nicht zwei:
  // null = noch nicht geladen, {ok:false} = NICHT LADBAR, {ok:true} = geladen (ggf. mit
  // leeren rows). Genau diese Unterscheidung fehlt den beiden Kacheln darueber, deren
  // Fehlerzustand in einem Leer-Wert verschwindet — hier wird sie eingeloest.
  const [variantCounts, setVariantCounts] = useState<VariantCountsResult | null>(
    null
  );
  // Ausklappbares Projekt-Menue (Default zu: sein Inhalt rendert erst beim
  // Oeffnen clientseitig -> keine Hydration-Mismatches bei relativen Zeitstempeln).
  const [isProjectMenuOpen, setIsProjectMenuOpen] = useState(false);
  // Inline-Umbenennung: id der gerade editierten Zeile + aktueller Eingabewert.
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  // Debounced-State: speist Parsing + Preview erst nach DEBOUNCE_MS Ruhe. Startet
  // bewusst LEER (nicht mit initialCode): annotateAndDetect nutzt DOMParser, der
  // serverseitig fehlt (SSR-Guard -> leer) und clientseitig parst. Mit initialCode
  // im ersten Render divergieren Server- und Client-Paint -> Hydration-Mismatch.
  // Leer startend ist der erste Paint auf beiden Seiten identisch; der vorhandene
  // Debounce-Effect zieht initialCode beim Mount clientseitig nach.
  const [debouncedCode, setDebouncedCode] = useState("");
  // Status des Speichern-Buttons + letzte Fehlermeldung der Server-Action.
  const [saveStatus, setSaveStatus] = useState<SaveStatus>("idle");
  const [saveError, setSaveError] = useState<string | null>(null);
  // Status des "In Zwischenablage kopieren"-Buttons (ehrliches Erfolg/Fehler-
  // Feedback).
  const [copyStatus, setCopyStatus] = useState<CopyStatus>("idle");
  // Linkes Panel ein-/ausklappbar. Zen-Modus: ein Projekt MIT Code startet
  // eingeklappt (Fokus aufs Dashboard), ein leeres Projekt offen (man muss erst
  // importieren koennen). Deterministisch aus initialCode -> server- und
  // client-identischer erster Paint, kein Hydration-Mismatch (Lektion aus 3.2).
  const [isInputCollapsed, setIsInputCollapsed] = useState(
    initialCode.trim() !== ""
  );
  // Zen-Modus "manuell schlaegt Auto": sobald der Nutzer das Panel selbst
  // aufklappt, uebernimmt er die Kontrolle -> KEIN Auto-Collapse mehr in diesem
  // Projekt-Kontext (bleibt true, auch wenn er danach wieder zuklappt). Wird NUR
  // beim Projekt-Kontext-Wechsel via applyZenForLoadedCode zurueckgesetzt.
  const [userExpandedManually, setUserExpandedManually] = useState(false);
  // Datei-Upload: letzter Validierungs-/Lesefehler (freundlich sichtbar, kein
  // stilles Schlucken) + Drag-Hover-Feedback fuer die Dropzone.
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  // Preview-Modus: "edit" = selektions-only Bruecke (Klick waehlt aus), wie
  // bisher. "functional" = generateFunctional rendert das verdrahtete HTML, Klick
  // FEUERT echt (Redirect). Strikt getrennt: der funktionale Modus injiziert NIE
  // die Selektions-Bruecke, der Edit-Modus feuert NIE eine Aktion.
  const [previewMode, setPreviewMode] = useState<"edit" | "functional">("edit");
  // Kategorie-Filter der Elementliste (Scheibe 1b). REINER View-State: steuert nur,
  // welche Elemente in der Liste gerendert werden. Beruehrt selectedElementId NICHT
  // (ein weggefiltertes ausgewaehltes Element behaelt seine Auswahl + Bruecke +
  // Highlighting; ActionPanel leitet aus elements ab, nicht aus der Filtermenge).
  const [activeFilter, setActiveFilter] = useState<ElementFilter>("all");
  // In der Preview angeklicktes Element (via postMessage-Bruecke). Nur die ID
  // wird gehalten; das Element selbst wird abgeleitet, damit sich die Auswahl
  // bei Code-Aenderung sauber neu aufloest.
  const [selectedElementId, setSelectedElementId] = useState<string | null>(
    null
  );

  const iframeRef = useRef<HTMLIFrameElement>(null);
  // Verstecktes <input type="file"> -> per Klick aus der sichtbaren Dropzone
  // ausgeloest.
  const fileInputRef = useRef<HTMLInputElement>(null);
  // Ref auf das aktuell ausgewaehlte Listen-Item -> Forward-Bridge-Scroll.
  const activeItemRef = useRef<HTMLButtonElement>(null);
  // Spiegelt selectedElementId fuer den []-deps Message-Listener (sonst stale
  // closure beim IFRAME_READY-Antworten).
  const selectedIdRef = useRef<string | null>(null);
  // Markiert, ob die letzte Auswahl aus einem iframe-Klick stammt. Steuert (in
  // beide Richtungen, eine Quelle), ob gescrollt wird: bei iframe-Klick NICHT.
  const cameFromIframeRef = useRef(false);

  useEffect(() => {
    const id = setTimeout(() => setDebouncedCode(code), DEBOUNCE_MS);
    return () => clearTimeout(id);
  }, [code]);

  // EINE Quelle der Wahrheit: einmal parsen -> annotiertes HTML (mit IDs +
  // Listener-Script) fuers iframe UND die erkannten Elemente fuer die Liste.
  const { html: previewHtml, elements } = useMemo(
    () => annotateAndDetect(debouncedCode),
    [debouncedCode]
  );

  const counts = useMemo(
    () => ({
      button: elements.filter((e) => e.type === "button").length,
      form: elements.filter((e) => e.type === "form").length,
      link: elements.filter((e) => e.type === "link").length,
      text: elements.filter((e) => e.type === "text").length,
    }),
    [elements]
  );

  // Sichtbare (gefilterte) Teilmenge der Liste. NUR Anzeige: keine Auswahl-Logik
  // haengt hieran (selectedElement leitet aus elements ab, nicht aus dieser Menge).
  const visibleElements = useMemo(
    () => filterElements(elements, activeFilter),
    [elements, activeFilter]
  );
  // Pillen-Zaehler: interaktiv = button+link+form, Texte = text, alle = gesamt.
  const interactiveCount = counts.button + counts.link + counts.form;

  // Funktionales HTML fuer den Vorschau-Modus. Nur im funktionalen Modus
  // berechnet (sonst ""), damit das Tippen im Edit-Modus keinen zusaetzlichen
  // DOMParser-Lauf zahlt. Quelle ist der saubere debouncedCode (die
  // Preview-Injektionen leben nur in previewHtml, NIE im code) -> idempotent,
  // kein doppeltes Einbacken. mappings ist nicht debounced -> eine neue Aktion
  // wirkt sofort sichtbar.
  const functionalHtml = useMemo(
    () =>
      previewMode === "functional"
        ? generateFunctional(debouncedCode, mappings, "preview", {
            metaPixelId: getMetaPixelId(settings),
            trackingKey: getTrackingKey(settings),
            capiProxyUrl: getCapiProxyUrl(),
          })
        : "",
    [previewMode, debouncedCode, mappings, settings]
  );

  // Edit-iframe-HTML: bei aktivem Text-Override zeigt AUCH der Editieren-Modus den
  // Override-Text (Konsistenz mit Vorschau/Liste/Header). Geteilte, getestete
  // Komposition in editPreviewHtml: Normalfall ohne Text-Mapping -> previewHtml
  // unveraendert (Kurzschluss, kein Reload); sonst Text-Injektion HINTER die
  // Bruecke gehaengt, ohne sie anzutasten. Reine Darstellung, kein Rueckfluss.
  //
  // WURZEL-ENTKOPPLUNG (Scheibe 3): srcDoc haengt BEWUSST NUR vom Code
  // (previewHtml, aus debouncedCode — mappings fliessen NICHT in previewHtml ein)
  // ab, NICHT von mappings. Sonst loeste jede Text-Mutation einen iframe-Reload
  // (Scroll-Sprung) aus. Live-Text-Aenderungen fliessen stattdessen ueber
  // PS_SET_TEXT an das laufende iframe. Bei Code-Aenderung recomputed der Memo und
  // bäckt die DANN aktuellen Overrides per generateFunctional("edit") frisch ein
  // (Override-ueberlebt-Reload). Die mappings-Auslassung ist die gezielte, hier
  // begruendete exhaustive-deps-Ausnahme.
  //
  // ZWEI TEILE, DIE NUR ZUSAMMEN WIRKEN (Phase 9 Scheibe 9a, Live-Bug) — wer einen
  // davon entfernt, stellt den Bug wieder her, OHNE dass etwas rot wird ausser dem
  // Reproduktions-Test:
  //   (1) activeVariant als DEP sorgt dafuer, dass der Memo beim Umschalten LAEUFT;
  //   (2) der Varianten-MARKER in editPreviewHtml sorgt dafuer, dass dabei ein
  //       ANDERER STRING herauskommt.
  // Beides ist noetig, weil srcDoc ein STRING ist: React schreibt das Attribut nur
  // bei WERT-Aenderung, und editPreviewHtml gibt bei fehlendem Text-Override
  // previewHtml BYTE-IDENTISCH zurueck (Kurzschluss) — der Rueckgabewert haengt dann
  // gar nicht am mappings-Inhalt. Ein laufender Memo allein aendert also nichts.
  // Der Marker sitzt im edit-Wrapper und NICHT in generateFunctional, weil der
  // sonst in Export- und Publish-Artefakte geriete (generateFunctional bedient auch
  // "preview" und "export").
  //
  // activeVariant IST EINE ECHTE DEP, KEIN VERSEHEN (Phase 9 Scheibe 9a, Live-Bug):
  // Die Phase-5-Doku zaehlt als Reload-Faelle "Code-Aenderung / Projektwechsel" auf.
  // Der VARIANTENWECHSEL ist ein dritter Fall derselben Klasse — und der einzige, in
  // dem sich der Code NICHT aendert: createVariantB kopiert A byte-genau, und eine
  // reine Text-Aenderung laesst den Code unangetastet (anchorMappingTarget ist auf
  // einem bereits verankerten Element ein No-op). A und B tragen dann denselben
  // HTML-STRING -> Object.is(debouncedCode_alt, debouncedCode_neu) ist true -> weder
  // der annotateAndDetect-Memo noch dieser hier feuern -> srcDoc bleibt derselbe
  // String -> KEIN Reload -> im Canvas steht weiter der per PS_SET_TEXT imperativ
  // gepatchte DOM der ZULETZT BEARBEITETEN Variante, waehrend Liste/Badges/State
  // schon die neue zeigen. Genau das war der Live-Bug. activeVariant ist der einzige
  // Wert, der sich beim Umschalten GARANTIERT aendert.
  //
  // mappings BLEIBT DRAUSSEN — das ist der Kern der Phase-5-Invariante und nicht
  // verhandelbar: "Wurzel-Entkopplung: Edit-srcDoc haengt ab jetzt NUR vom Code ab
  // (nicht mehr von Text-Mappings)" (docs/claude-history/phase-5-copywriting.md).
  // Mit mappings als Dep kaeme der Reload-Sprung beim Tippen/Uebernehmen zurueck,
  // den Scheibe 3 an der Wurzel beseitigt hat. Waechter dafuer ist der Bestandstest
  // "Text-Mapping-Aenderung bei unveraendertem Code erzeugt KEIN neues srcDoc".
  //
  // BENANNTES TRANSIENTES FENSTER (bewusste Eigenschaft, KEIN zusaetzlicher
  // Mechanismus): beim Umschalten rechnet dieser Memo SOFORT neu — mit dem neuen
  // mappings, aber dem noch alten previewHtml (debouncedCode hinkt DEBOUNCE_MS
  // nach). Tragen die Varianten UNTERSCHIEDLICHES HTML, steht fuer ~300ms ein
  // hybrides srcDoc im iframe (altes HTML + neue Overrides); danach zieht
  // debouncedCode nach und der Zustand ist korrekt. Das ist unkritisch: der Hybrid
  // ist reine ANZEIGE (Export/Publish/Vorschau bauen aus debouncedCode, nie aus dem
  // iframe), die Orphan-Anzeige ist im selben Fenster durch
  // elementsReflectCurrentCode (debouncedCode === code -> false) gedeckt, und ein
  // Guard fuer 300ms waere Ueberbau. Im Normalfall (Kopie, identisches HTML) gibt es
  // das Fenster gar nicht — dort ist das neu berechnete srcDoc sofort das richtige.
  const editHtml = useMemo(
    () => editPreviewHtml(previewHtml, mappings, activeVariant),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [previewHtml, activeVariant]
  );

  // Ausgewaehltes Element abgeleitet: faellt automatisch auf null zurueck, wenn
  // die ID nach einer Code-Aenderung nicht mehr existiert.
  const selectedElement = useMemo(
    () => elements.find((e) => e.id === selectedElementId) ?? null,
    [elements, selectedElementId]
  );

  // ps-ID -> Set der Mapping-Typen fuer die "verknuepft"-Badges (Compound-Key,
  // Scheibe 1a): ein interaktives Element kann mehrere Aktionen tragen
  // (redirect + track) -> Set statt last-wins. Die Anzeige-Reihenfolge erzwingt
  // ACTION_BADGE_ORDER (deterministisch, kein Set-Iterations-Flackern).
  const mappingTypesById = useMemo(() => {
    const m = new Map<string, Set<Mapping["type"]>>();
    for (const x of mappings) {
      const s = m.get(x.elementId) ?? new Set<Mapping["type"]>();
      s.add(x.type);
      m.set(x.elementId, s);
    }
    return m;
  }, [mappings]);

  // Weg-C-Netz: verwaiste Mappings (ps-ID nicht mehr im Code) SICHTBAR machen,
  // statt sie still zu loeschen oder falsch neu zu verknuepfen.
  //
  // FLASH-GUARD (kritisch): elements wird aus debouncedCode abgeleitet, das beim
  // Laden bewusst LEER startet und code um DEBOUNCE_MS nachlaeuft. Wuerden wir
  // Orphans gegen diese noch-leere Liste berechnen, blinkte kurz "alles
  // verwaist". Erst rechnen, wenn debouncedCode === code -> dann spiegelt
  // elements GARANTIERT den AKTUELLEN Code wider (mindestens einmal echt
  // geparst). Nutzt bestehenden State, kein neues Flag; irrt sicher Richtung
  // "nichts zeigen". Auch hydration-sicher: im ersten Paint ist debouncedCode ""
  // -> bei nicht-leerem code ungleich (Guard aus, identischer Server/Client-Paint).
  const elementsReflectCurrentCode = debouncedCode === code;
  const orphans = useMemo(
    () =>
      elementsReflectCurrentCode
        ? findOrphans(
            mappings,
            elements.map((e) => e.id)
          )
        : [],
    [elementsReflectCurrentCode, mappings, elements]
  );

  // Klick-Bruecke aus dem sandboxed iframe. Registriert sich EINMAL ([] deps);
  // iframeRef + setSelectedElementId sind stabil.
  // Das iframe laeuft mit sandbox="allow-scripts" (ohne allow-same-origin) ->
  // event.origin ist "null", daher bewusst KEINE Origin-Pruefung. Stattdessen
  // pruefen wir die Quelle (contentWindow) und den Message-Typ.
  useEffect(() => {
    function onMessage(e: MessageEvent) {
      if (e.source !== iframeRef.current?.contentWindow) return;
      const d = e.data;
      if (d?.type === "ELEMENT_CLICKED") {
        // Vorwaerts-Bruecke (iframe -> Liste): Auswahl kam aus dem iframe.
        cameFromIframeRef.current = true;
        setSelectedElementId(d.elementId ?? null);
      } else if (d?.type === "IFRAME_READY") {
        // Re-Sync nach jedem srcDoc-Reload: aktuelle Auswahl zuruecksenden.
        // selectedIdRef statt State -> kein stale closure trotz []-deps.
        iframeRef.current?.contentWindow?.postMessage(
          { type: "SET_SELECTED_ID", elementId: selectedIdRef.current, scroll: false },
          "*"
        );
      }
    }
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  // Sync + Post: einzige Brücke State -> iframe. Idempotentes Highlight im
  // iframe macht das wiederholte Senden nach einem ELEMENT_CLICKED flackerfrei.
  // cameFromIframeRef gated NUR das iframe-Scrollen (sonst springt die Vorschau
  // beim iframe-Klick) – das Listen-Scrollen feuert bewusst IMMER, damit ein
  // weit unten liegender Eintrag auch bei Auswahl aus dem iframe sichtbar wird.
  useEffect(() => {
    selectedIdRef.current = selectedElementId;
    const fromIframe = cameFromIframeRef.current;
    cameFromIframeRef.current = false;
    const scroll = !fromIframe;
    iframeRef.current?.contentWindow?.postMessage(
      { type: "SET_SELECTED_ID", elementId: selectedElementId, scroll },
      "*"
    );
    // Listen-Scroll feuert IMMER, nur der block-Wert haengt von der Herkunft ab
    // (fromIframe oben gelesen, vor dem Reset): Auswahl aus dem iframe ->
    // 'center' (aktiver Eintrag als Orientierungspunkt mittig); Auswahl aus der
    // Liste selbst -> 'nearest' (gerade angeklicktes Item nicht wegzentrieren).
    activeItemRef.current?.scrollIntoView({
      behavior: "smooth",
      block: fromIframe ? "center" : "nearest",
    });
  }, [selectedElementId]);

  // "Gespeichert"-Bestaetigung nach kurzer Zeit zuruecksetzen.
  useEffect(() => {
    if (saveStatus !== "saved") return;
    const id = setTimeout(() => setSaveStatus("idle"), 2000);
    return () => clearTimeout(id);
  }, [saveStatus]);

  // Analytics-Counts laden, sobald ein gespeichertes Projekt aktiv ist (Scheibe 3).
  // Projekt-abgeleitet: bei Projektwechsel neu geladen, bei keinem Projekt geleert.
  // EINZIGES setState liegt im async .then()-Callback (kein synchrones setState im
  // Effekt-Body) -> kein Kaskaden-Render. cancelled-Guard gegen ein spaet zurueck-
  // kommendes Ergebnis eines alten projectId. Kein Projekt -> Promise auf [] (leert).
  useEffect(() => {
    let cancelled = false;
    const load = projectId
      ? getEventCounts(projectId).catch(() => [])
      : Promise.resolve<EventCount[]>([]);
    load.then((counts) => {
      if (!cancelled) setEventCounts(counts);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // Adblocker-Verlustrate laden (Scheibe B) — identischer Schnitt wie die Counts oben,
  // bewusst als ZWEITER Effect statt gebuendelt: die beiden Kennzahlen kommen aus zwei
  // getrennten RPCs, und die Counts-Kachel soll weiterlaufen, falls die Raten-Query zickt.
  // Leer-Wert ist null (Neutral-Status), nicht [] — eine erfundene 0%-Zahl waere schlimmer
  // als "noch keine Aussage".
  useEffect(() => {
    let cancelled = false;
    const load = projectId
      ? getAdblockLoss(projectId).catch(() => null)
      : Promise.resolve<AdblockLoss | null>(null);
    load.then((loss) => {
      if (!cancelled) setAdblockLoss(loss);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // Auswertung je Variante laden (Scheibe 9c-1) — gleicher Schnitt wie die beiden Effects
  // darueber (cancelled-Guard, setState nur im then), mit EINEM bewussten Unterschied:
  //
  // safeAction STATT .catch() AUF DEN LEER-WERT. Die Achse ist nicht "Handler vs. Effekt",
  // sondern ob ein UI-Zustand am Aufruf haengt (s. "## Immer beachten"): hier haengt ein
  // FEHLERKANAL daran. Ein Wurf muss als "nicht ladbar" sichtbar werden, nicht als "keine
  // Daten" — der Ersatzwert ist deshalb {ok:false} und NICHT {ok:true, rows:[]}.
  //
  // Die beiden Effects DARUEBER behalten ihr .catch()-Verhalten bewusst unveraendert: das
  // ist live bewiesener Bestand, und ein Umbau ohne Anlass waere genau die Regression, die
  // diese Scheibe nicht riskieren soll. Der Backlog-Punkt bleibt fuer sie offen.
  useEffect(() => {
    let cancelled = false;
    const load = projectId
      ? safeAction<VariantCountsResult>(
          () => getVariantCounts(projectId),
          { ok: false }
        )
      : Promise.resolve<VariantCountsResult | null>(null);
    load.then((result) => {
      if (!cancelled) setVariantCounts(result);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId]);

  // "Ist Variante B veroeffentlicht?" laden (Scheibe 9b-1p) — identischer Schnitt wie
  // die beiden Analytics-Effects darueber (cancelled-Guard, setState nur im then).
  // Leer-Wert ist null (nicht ermittelbar), NICHT false: false waere eine Behauptung.
  // Deps: projectId (Projektwechsel/-laden/-loeschen/neues Projekt) + der Tick aus
  // Publish/removeVariantB. createVariantB und saveVariantB stehen bewusst NICHT
  // drin: sie schreiben nur die Draft-Spalten, nicht published_content.
  //
  // UNBEDINGT, AUCH OHNE VARIANTE B — BITTE NICHT AUF hasVariantB GATEN: das saehe
  // nach einer billigen Ersparnis aus und braeche den Hinweis genau dort, wo er
  // gebraucht wird. createVariantB loest bewusst KEINEN Tick aus (es schreibt nur
  // html_b/mappings_b, nicht published_content). Waere die Abfrage gegated, stuende
  // der Wert im Moment des Anlegens auf null (nie geladen) statt auf false — und
  // bei null zeigt das UI absichtlich NICHTS. Der Nutzer legte B an, saehe keinen
  // Hinweis und liefe in den Riegel. Weil hier UNBEDINGT geladen wird, liegt das
  // korrekte false bereits bereit, sobald hasVariantB kippt.
  useEffect(() => {
    let cancelled = false;
    const load = projectId
      ? getVariantBPublished(projectId).catch(() => null)
      : Promise.resolve<boolean | null>(null);
    load.then((v) => {
      if (!cancelled) setVariantBPublished(v);
    });
    return () => {
      cancelled = true;
    };
  }, [projectId, variantBPublishTick]);

  // Copy-Feedback ("Kopiert ✓" / Fehler) nach kurzer Zeit zuruecksetzen.
  useEffect(() => {
    if (copyStatus === "idle") return;
    const id = setTimeout(() => setCopyStatus("idle"), 2500);
    return () => clearTimeout(id);
  }, [copyStatus]);

  // Ungespeicherte Aenderungen seit dem letzten Speichern/Laden. Schuetzt das
  // Wechseln/Neu-Anlegen vor stillem Verlust. Umfasst CODE, MAPPINGS UND SETTINGS:
  // weder Mapping- noch Settings-Aenderungen fassen den Code an, wuerden sonst
  // still verloren gehen. mappingsEqual/settingsEqual vergleichen wertbasiert.
  const dirty =
    code !== savedCode ||
    !mappingsEqual(mappings, savedMappings) ||
    !settingsEqual(settings, savedSettings);

  // Generischer Browser-Warndialog vor F5/Tab-Schliessen, solange ungespeicherte
  // Aenderungen offen sind. Speist sich aus DEMSELBEN dirty wie die In-App-Guards.
  // preventDefault + returnValue ist das vom Browser geforderte Muster; den Text
  // bestimmt der Browser selbst (eigener String wird ignoriert).
  useEffect(() => {
    if (!dirty) return;
    function onBeforeUnload(e: BeforeUnloadEvent) {
      e.preventDefault();
      e.returnValue = "";
    }
    window.addEventListener("beforeunload", onBeforeUnload);
    return () => window.removeEventListener("beforeunload", onBeforeUnload);
  }, [dirty]);
  // "Traegt dieses Projekt eine Variante B?" — ABGELEITET aus der Stash-Invariante,
  // kein zweites Flag, das divergieren koennte: ist B aktiv, existiert B per
  // Definition; ist A aktiv, haelt der Stash genau dann etwas, wenn B existiert.
  const hasVariantB = activeVariant === "b" || stashHtml !== null;
  // Anzeige-Label der aktiven Variante (Toolbar, Export-Button, Publish-Hinweis).
  const activeVariantLabel = activeVariant === "b" ? "B" : "A";

  // --- SICHTBARKEIT DER VARIANTEN-AUSWERTUNG (Scheibe 9c-1) ---
  //
  // AUS DEN DATEN ABGELEITET: gibt es keine Zeile mit Varianten-Zuordnung, gibt es nichts
  // auszuwerten -> die Sektion erscheint gar nicht. Damit sieht ein Projekt, fuer das nie
  // ein Test lief, KEINE UI-Aenderung (Invariante J3) — ohne dass dafuer ein eigener
  // Zustand gehalten werden muesste.
  //
  // BEKANNTER UEBERGANG NACH 9c-2 (hier bewusst NICHT vorgebaut, damit er dort nicht als
  // Bug auftaucht): Sobald 9c-2 einen Lauf-Beginn einfuehrt, KIPPT diese Ableitung. Wer
  // einen Test NEU startet, hat im neuen Fenster null zugeordnete Zeilen — die Sektion
  // verschwaende genau in dem Moment, in dem er auf sie schaut. Ab dann muss die
  // Sichtbarkeit am Zeitstempel haengen und die leere Sektion "noch keine Daten" sagen.
  // Fuer 9c-1, das kein Fenster kennt, ist die Daten-Ableitung die richtige und die
  // ehrlichere: sie behauptet nichts ueber einen Zeitraum.
  const variantRows = variantCounts?.ok ? variantCounts.rows : [];
  const hasVariantData = variantRows.some(
    (r) => r.count_a > 0 || r.count_b > 0
  );
  // Der FEHLERFALL kann nicht datengetrieben entschieden werden — bei {ok:false} wissen
  // wir gerade NICHT, ob es Daten gaebe. Er wird deshalb an hasVariantB gehaengt: dort ist
  // eine Auswertung plausibel, und ein Projekt ohne Variante B bleibt frei von einer
  // Fehlermeldung zu einer Sektion, die es nie zu sehen bekaeme (J3).
  const variantCountsFailed = variantCounts?.ok === false;
  const showVariantCounts = hasVariantData || (variantCountsFailed && hasVariantB);

  // DIE PAAR-ABLEITUNG, EINMAL — geteilt zwischen Publish-HANDLER und Publish-BUTTON.
  // Sie lag frueher INNERHALB von handlePublish; der Leer-Guard braucht dieselben
  // Werte, und eine zweite Ableitung nur fuer die disabled-Bedingung waeren ZWEI
  // Stellen, die "welche Variante traegt was" beantworten — exakt die Konstellation,
  // aus der der 9b-1-Befund kam (zwei Urteile ueber denselben Sachverhalt, die
  // auseinanderlaufen, ohne dass es jemand merkt).
  //
  // Quelle je Variante, inhaltlich unveraendert zu 9a: die AKTIVE aus dem Live-Draft
  // (debouncedCode/mappings), die INAKTIVE aus ihrem GESPEICHERTEN Stand (Stash).
  // Das ist keine Inkonsistenz, sondern folgt aus dem Umschalt-Guard: die inaktive
  // Variante ist per Konstruktion immer im gespeicherten Zustand.
  //
  // DEKLARIERTE VERHALTENSAENDERUNG (nicht stillschweigend eingefuehrt): der Memo
  // haengt an debouncedCode, der Publish-BUTTON damit auch — bisher las er das
  // ungedebouncte code. Er wird also um die Debounce-Spanne spaeter frei (nach dem
  // ersten Zeichen) bzw. spaeter gesperrt (nach dem Leeren). Beide Richtungen sind
  // sicher, weil die Autoritaet der SERVER-Riegel ist und nicht der Button.
  const publishPairs = useMemo(() => {
    const activePair = { html: debouncedCode, mappings };
    const inactivePair = {
      html: stashHtml ?? "",
      mappings: stashMappings ?? [],
    };
    return {
      pairA: activeVariant === "a" ? activePair : inactivePair,
      pairB: activeVariant === "b" ? activePair : inactivePair,
    };
  }, [activeVariant, debouncedCode, mappings, stashHtml, stashMappings]);

  // DER CLIENT-GUARD — DASSELBE Praedikat wie der Server-Riegel, aus der reinen
  // Datei. Er prueft das ROH-HTML, der Server das daraus gebaute functionalHtml;
  // das ist trotzdem EIN Urteil und nicht zwei, weil generateFunctional bei leerem
  // oder whitespace-only Input "" zurueckgibt (erste Anweisung im Rumpf, vor
  // SSR-Guard, DOMParser und Meta-Injektion — greift also auch bei konfiguriertem
  // Pixel). Diese Aequivalenz ist FRAGIL und deshalb per Test festgenagelt, nicht
  // behauptet.
  //
  // Das null bei fehlender Variante B spiegelt die Write-Bedingung: ohne B wird B
  // nicht publiziert, also auch nicht geprueft.
  const emptyPublishTarget = emptyPublishVariant(
    publishPairs.pairA.html,
    hasVariantB ? { html: publishPairs.pairB.html } : null
  );
  // Textauswahl wie auf dem Server: ohne B der neutrale Satz, mit B der
  // varianten-spezifische. DIESELBEN Konstanten — der Nutzer soll fuer dieselbe
  // Ursache nicht zwei verschiedene Erklaerungen bekommen, je nachdem ob der Button
  // ihn bremst oder der Server ihn ablehnt.
  const emptyPublishMessage = !emptyPublishTarget
    ? null
    : !hasVariantB
      ? EMPTY_PUBLISH_MESSAGE
      : emptyPublishTarget === "a"
        ? EMPTY_VARIANT_A_MESSAGE
        : EMPTY_VARIANT_B_MESSAGE;

  // EIN ANZEIGESLOT fuer die Publish-Sektion, Rangfolge STRUKTURELL statt per
  // Textvergleich: ein aufgetretener Server-Fehler schlaegt jeden vorbeugenden
  // Hinweis, und das fehlende Projekt schlaegt den Leer-Hinweis (ohne
  // gespeichertes Projekt ist "die Seite ist leer" die zweitwichtigste Nachricht).
  // Der 9b-1p-NACHTRAG kam daher, dass Hinweis und Riegel-Fehler NEBENEINANDER
  // standen und denselben Satz doppelt zeigten — mit einem Slot ist das strukturell
  // ausgeschlossen.
  const publishNotice: { tone: "error" | "hint"; text: string } | null =
    publishStatus === "error" && publishError
      ? { tone: "error", text: publishError }
      : !projectId
        ? {
            tone: "hint",
            text: "Erst speichern, dann ist das Projekt veröffentlichbar.",
          }
        : emptyPublishMessage
          ? { tone: "hint", text: emptyPublishMessage }
          : null;

  // Name des aktiven Projekts fuer die Toolbar. Neues (ungespeichertes) Projekt
  // -> "Unbenanntes Projekt" (entspricht dem spaeteren DB-Default).
  const activeName =
    projects.find((p) => p.id === projectId)?.name ?? "Unbenanntes Projekt";

  // Publish-Anzeige ABGELEITET aus dem GELADENEN settings.hosting (nicht aus leakendem
  // State): ein Projektwechsel reseedet settings am Chokepoint -> Label/URL spiegeln
  // IMMER das aktuell geladene Projekt. WICHTIG (nicht nur kosmetisch): ein geleakter
  // "veröffentlicht"-Zustand könnte den Marketer Ad-Budget auf eine URL schalten lassen,
  // die zum FALSCHEN Projekt gehört -> der Indikator MUSS die Wahrheit des geladenen
  // Projekts zeigen. liveUrl wird aus dem Label + NEXT_PUBLIC_HOSTING_DOMAIN
  // rekonstruiert (leere env -> "" -> nur Label-Zustand ohne Link).
  const hostingLabel = getHostingLabel(settings);
  const liveUrl = hostingLabel
    ? buildLiveUrl(hostingLabel, process.env.NEXT_PUBLIC_HOSTING_DOMAIN ?? "")
    : "";

  // Setzt den Editor auf den leeren "Unbenanntes Projekt"-Zustand zurueck (keine
  // DB-Zeile, keine tote projectId).
  function resetToEmpty() {
    setProjectId(null);
    setCode("");
    setSavedCode("");
    setMappings([]);
    setSavedMappings([]);
    // Settings spiegeln mappings: leeres Projekt -> leere Settings + Baseline.
    setSettings({});
    setSavedSettings({});
    setSelectedElementId(null);
    // Leeres Projekt hat per Definition keine Variante B -> Stash leer, Variante A.
    seedVariantState(null, null, false);
    // Leerer Kontext -> Panel offen (man muss importieren koennen), Flag frisch.
    applyZenForLoadedCode("");
  }

  // Zen-Modus: an ein Import-EREIGNIS gehaengt (onPaste / erfolgreicher Upload),
  // NICHT an den Detektions-State (sonst feuerte es bei jedem Tastendruck und
  // klappte dem Nutzer das Panel beim Tippen weg). Genau einmal pro Ereignis.
  // "Manuell schlaegt Auto": hat der Nutzer selbst aufgeklappt, kein Auto-Collapse.
  function autoCollapseOnImport() {
    if (!userExpandedManually) setIsInputCollapsed(true);
  }

  // Zen-Default beim Laden/Wechseln eines Projekt-Kontexts: Code vorhanden ->
  // eingeklappt, leer -> offen. Setzt zugleich das "manuell"-Flag zurueck (neuer
  // Kontext = frische Auto-Collapse-Erlaubnis). Kein Merken pro Projekt.
  function applyZenForLoadedCode(html: string) {
    setUserExpandedManually(false);
    setIsInputCollapsed(html.trim() !== "");
    // uploadError ist projekt-ungebundener View-State -> beim Kontext-Wechsel
    // mit zuruecksetzen, sonst leuchtet ein Fehler aus Projekt A in B weiter.
    setUploadError(null);
    // CAPI-Token-Eingabe/Status ebenso projekt-ungebunden: leeren, damit kein
    // stehengebliebener Klartext / Fehler in den neuen Kontext leckt. Der
    // "gesetzt?"-Indikator selbst reseedet ueber settings (getCapiTokenSet).
    setCapiTokenInput("");
    setCapiTokenStatus("idle");
    setCapiTokenError(null);
    setCapiRemoveConfirming(false);
    setCapiRemoving(false);
    // Publish: NUR der transiente Aktions-Status wird hier geleert (ein "gerade
    // veröffentlicht"/Fehler aus Projekt A darf nicht in B stehenbleiben). Der
    // "veröffentlicht?"-Indikator + die Live-URL reseeden ueber settings.hosting
    // (getHostingLabel), genau wie getCapiTokenSet -> kein separater Reset noetig.
    setPublishStatus("idle");
    setPublishError(null);
    setPublishRestored(false);
    // Varianten-Aktionsstatus ist ebenfalls projekt-ungebundener View-State.
    // NICHT hier zurueckgesetzt werden activeVariant/Stash: die sind projekt-
    // ABGELEITET und werden am Lade-Chokepoint aus dem geladenen Projekt gesetzt
    // (seedVariantState), nicht bloss geleert.
    setVariantBusy(false);
    setVariantBRemoveConfirming(false);
    // Der lokale Varianten-Fehler ist projekt-ungebundener View-State — ohne Reset
    // leuchtete eine Meldung aus Projekt A in Projekt B weiter (dieselbe Klasse wie
    // uploadError/capiTokenError darueber).
    setVariantStatus("idle");
    setVariantError(null);
  }

  // Varianten-Zustand aus dem GELADENEN Projekt ableiten (kanonischer Chokepoint,
  // gerufen an GENAU denselben Stellen wie setSavedMappings/setSavedSettings).
  // Ein Projektwechsel muss den Stash aus html_b/mappings_b des NEUEN Projekts
  // speisen — ein bloss geleerter Stash zeigte ein Projekt MIT Variante B faelsch-
  // licherweise als "hat keine Variante B" ("ABLEITEN STATT LOESCHEN").
  // Der Editor startet in jedem neuen Projekt-Kontext auf Variante A.
  function seedVariantState(
    htmlB: string | null,
    mappingsB: Mapping[] | null,
    abActive: boolean
  ) {
    setActiveVariant("a");
    setStashHtml(htmlB);
    setStashMappings(mappingsB);
    // Der Test-Schalter spiegelt eine Projekt-Spalte -> hier ableiten, nicht nur
    // zuruecksetzen. Sonst zeigte ein Projektwechsel den Testzustand von A weiter,
    // waehrend B laengst geladen ist.
    setAbTestActive(abActive);
  }

  // Variante umschalten: TAUSCHT die Wurzeln code/mappings gegen den Stash.
  //
  // DIRTY-GUARD: exakt dasselbe Muster wie handleSwitch/handleNew (window.confirm
  // auf demselben dirty, aus dem sich auch der beforeunload-Listener speist) — kein
  // neu erfundener Mechanismus. Bei Bestaetigung wird der Draft VERWORFEN: in den
  // Stash wandert der GESPEICHERTE Stand (savedCode/savedMappings), nicht der
  // Draft. Damit gilt durchgehend: die inaktive Variante ist IMMER im gespeicherten
  // Zustand — es gibt nie zwei konkurrierende Dirty-Drafts, fuer die der EINE
  // Speichern-Button mehrdeutig waere.
  //
  // selectedElementId ist gelatchter (nicht abgeleiteter) State und wird geleert:
  // eine Element-ID aus A hat in B eine andere Bedeutung, auch wenn B als Kopie
  // dieselben Anker traegt.
  function switchVariant(next: "a" | "b") {
    if (next === activeVariant || variantBusy) return;
    // SYMMETRISCHER GUARD, bewusst NICHT "next === 'b' && stashHtml === null":
    // Umschalten heisst Wurzeltausch GEGEN den Stash — in BEIDE Richtungen. Ist der
    // Stash leer, gibt es nichts einzutauschen, und der Tausch wuerde code UND
    // savedCode auf "" setzen (ein leerer Editor mit dirty=false, dessen naechster
    // Save die Variante mit Leerstring ueberschreibt). Ein auf "nach B" verengter
    // Guard liesse genau den Rueckweg offen, falls der Zustand je inkonsistent
    // wuerde. Diese Fassung ist gegen JEDE Inkonsistenz dicht, ohne von der
    // Korrektheit anderer Stellen abzuhaengen.
    if (stashHtml === null) return;
    if (
      dirty &&
      !window.confirm(
        `Ungespeicherte Änderungen an Variante ${activeVariantLabel} verwerfen und zu Variante ${next.toUpperCase()} wechseln?`
      )
    )
      return;

    const incomingHtml = stashHtml ?? "";
    const incomingMappings = stashMappings ?? [];
    // Die VERLASSENE Variante wandert mit ihrem GESPEICHERTEN Stand in den Stash.
    setStashHtml(savedCode);
    setStashMappings(savedMappings);
    // Wurzeltausch: ab hier leiten sich Elemente, Badges, Orphans, Preview,
    // Edit-iframe, Export-Dokument und dirty automatisch aus der neuen Variante ab.
    setCode(incomingHtml);
    setSavedCode(incomingHtml);
    setMappings(incomingMappings);
    setSavedMappings(incomingMappings);
    setSelectedElementId(null);
    setActiveVariant(next);
    applyZenForLoadedCode(incomingHtml);
  }

  // Variante B anlegen: SERVER-seitige Kopie der GESPEICHERTEN Variante A. Der
  // Client schickt kein HTML mit und nimmt den Inhalt danach auch NICHT lokal an
  // ("ist ja die Kopie von A"), sondern uebernimmt die vom Server ZURUECKGEGEBENEN
  // Werte in den Stash — abgeleitet aus der Wahrheitsquelle, nicht geraten.
  //
  // Gegated auf ein gespeichertes UND sauberes Projekt: kopiert wird der
  // gespeicherte A-Stand, deshalb darf es keinen abweichenden Draft geben, sonst
  // luege "B ist eine Kopie von A" gegenueber dem, was der Nutzer gerade sieht.
  async function handleCreateVariantB() {
    if (!projectId || dirty || hasVariantB || variantBusy) return;
    setVariantBusy(true);
    setVariantError(null);
    setVariantStatus("idle");
    const result = await safeAction(
      () => createVariantB(projectId),
      actionThrew()
    );
    if (result.ok) {
      setStashHtml(result.html);
      setStashMappings(result.mappings);
    } else {
      setVariantError(result.error);
      setVariantStatus("error");
    }
    setVariantBusy(false);
  }

  // Variante B entfernen (destruktiv -> zweistufige Bestaetigung im UI, Muster wie
  // beim CAPI-Token). Loescht INHALT; das ist NICHT "Test stoppen" (das kommt in 9b
  // als eigenes Flag). Variante A bleibt unberuehrt.
  //
  // War B gerade aktiv, holt der Client anschliessend A aus dem Stash zurueck in die
  // Wurzeln — der Editor darf nicht auf einer geloeschten Variante stehenbleiben.
  async function handleRemoveVariantB() {
    if (!projectId || !hasVariantB || variantBusy) return;
    setVariantBusy(true);
    setVariantError(null);
    setVariantStatus("idle");

    // A-RUECKHOLUNG VOR JEDEM setState UND VOR DEM await festgehalten. Die
    // Korrektheit haengt damit an einer CLOSURE-BINDUNG, nicht an der
    // Zeilenreihenfolge der setState-Aufrufe weiter unten — ein spaeteres
    // Umsortieren (z.B. "Stash zuerst leeren") kann sie nicht mehr still
    // zerbrechen (Lektion aus dem Rename-Guard: Korrektheit, die an einer
    // Reihenfolge haengt, zerbricht beim naechsten Refactor lautlos).
    //
    // WAS HIER SCHIEFGEHEN KANN, wenn man es weglaesst: bliebe activeVariant nach
    // dem Entfernen auf 'b', waehrend der Stash auf null faellt, dann waere
    // (a) hasVariantB ueber den Term activeVariant === "b" faelschlich true,
    // (b) ein Speichern-Klick riefe saveVariantB und legte B NEU an, und
    // (c) ein spaeterer Wechsel nach A setzte code UND savedCode auf "" ->
    // ein leeres "A" mit dirty=false, dessen naechster Save Variante A mit
    // Leerstring ueberschreibt. Ohne Fehler, ohne Warnung.
    const wasEditingB = activeVariant === "b";
    const restoreA = {
      html: stashHtml ?? "",
      mappings: stashMappings ?? [],
    };

    const result = await safeAction(
      () => removeVariantB(projectId),
      actionThrew()
    );
    if (result.ok) {
      // Erst die Wurzeln auf A zurueckholen (aus der oben festgehaltenen Kopie),
      // dann den Stash leeren. Beide Schritte lesen KEINEN State mehr.
      if (wasEditingB) {
        setCode(restoreA.html);
        setSavedCode(restoreA.html);
        setMappings(restoreA.mappings);
        setSavedMappings(restoreA.mappings);
        setSelectedElementId(null);
        setActiveVariant("a");
        applyZenForLoadedCode(restoreA.html);
      }
      setStashHtml(null);
      setStashMappings(null);
      // Der Server hat ab_test_active im SELBEN Update auf false gesetzt (CHECK-
      // Bedingung) -> der Client spiegelt genau das. Ohne B ist der Schalter zwar
      // ohnehin unsichtbar, aber ein stehengebliebenes true waere ein falscher
      // Zustand, der beim naechsten Anlegen von B wieder auftauchte.
      setAbTestActive(false);
      // REFETCH-PUNKT 1: der variantB-Key ist aus published_content entfernt -> der
      // Wert kippt true->false. Ohne Refetch bliebe er stale TRUE; legt der Nutzer B
      // gleich neu an, waere hasVariantB true und der Wert faelschlich true -> der
      // Hinweis FEHLTE, obwohl B nicht veroeffentlicht ist.
      setVariantBPublishTick((t) => t + 1);
      setVariantBRemoveConfirming(false);
    } else {
      setVariantError(result.error);
      setVariantStatus("error");
      setVariantBRemoveConfirming(false);
    }
    setVariantBusy(false);
  }

  // Manuelles Toggle: klappt der Nutzer AUF (next = nicht collapsed), uebernimmt
  // er die Kontrolle -> Flag setzen, ab dann kein Auto-Collapse mehr. Zuklappen
  // laesst das Flag unberuehrt (Kontrolle bleibt beim Nutzer).
  function toggleInputCollapsed() {
    setIsInputCollapsed((v) => {
      const next = !v;
      if (!next) setUserExpandedManually(true);
      return next;
    });
  }

  // Datei-Import (zweiter Weg neben Copy-Paste): validieren -> via FileReader
  // lesen -> Inhalt EXAKT in denselben setCode-Pfad kippen wie Paste. KEIN
  // Server-Upload, KEINE zweite Verarbeitungskette (Detektion/Stabilisierung/
  // Preview haengen unveraendert an setCode/code). Validierung VOR dem Lesen,
  // damit ein falscher Typ / zu grosse Datei den Browser nicht haengen laesst.
  function importFile(file: File) {
    // Am ANFANG jedes Import-Versuchs clearen (vor der Validierung), damit keine
    // alte Meldung stehen bleibt, waehrend eine gueltige Datei schon laedt.
    setUploadError(null);
    const v = validateUploadFile(file);
    if (!v.ok) {
      setUploadError(v.error);
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const text = typeof reader.result === "string" ? reader.result : "";
      setCode(text);
      // Erfolgreicher Upload = Import-Ereignis -> Zen-Auto-Collapse (einmalig).
      autoCollapseOnImport();
    };
    reader.onerror = () => setUploadError("Datei konnte nicht gelesen werden.");
    reader.readAsText(file);
  }

  // Speichern: CLIENT-seitig stabilisieren (nur IDs ins Attribut, OHNE
  // Script/Style-Injektion) -> ans Server-Action geben -> bei Erfolg das
  // stabilisierte HTML zurueck in die Textarea spiegeln, damit der User die in
  // seinen Code geschriebenen ps-IDs SIEHT. stabilizeIds nutzt DOMParser und
  // laeuft nur hier im Browser zuverlaessig (auf dem Server greift der SSR-Guard).
  // saveProject bekommt die aktive projectId (null -> neue Zeile); die
  // zurueckgegebene id wird zum aktiven Projekt.
  async function handleSave() {
    setSaveStatus("saving");
    setSaveError(null);
    const stabilized = stabilizeIds(code);
    // EINZIGE Varianten-Verzweigung des Speicherpfades (Scheibe 9a). Bewusst
    // sichtbar und ohne Fallback: KEIN "wenn projectId fehlt, dann eben
    // saveProject" — das wuerde bei aktiver Variante B in die A-Spalten schreiben
    // und Variante A still vernichten. Die beiden Actions tragen jeweils eine
    // FESTE Spaltenmenge, damit hier nur der Aufruf falsch sein koennte, nie das
    // Ziel innerhalb einer Action.
    let result: Awaited<ReturnType<typeof saveProject>>;
    if (activeVariant === "b") {
      if (!projectId) {
        setSaveError("Variante B braucht ein gespeichertes Projekt.");
        setSaveStatus("error");
        return;
      }
      result = await safeAction(
        () => saveVariantB(projectId, stabilized, mappings, settings),
        actionThrew(SAVE_THROW_MESSAGE)
      );
    } else {
      result = await safeAction(
        () => saveProject(projectId, stabilized, mappings, settings),
        actionThrew(SAVE_THROW_MESSAGE)
      );
    }
    if (result.ok) {
      setCode(stabilized);
      setSavedCode(stabilized);
      setSavedMappings(mappings);
      setSavedSettings(settings);
      setProjectId(result.id);
      // ERFOLG ZUERST QUITTIEREN, DANN erst der Folge-Refresh (Invariante iv):
      // stand setSaveStatus("saved") hinter listProjects(), liess ein Wurf DORT den
      // Button haengen, OBWOHL gespeichert wurde. Die Projektliste ist ein
      // Nebeneffekt (Sortierung nach updated_at) — eine veraltete Liste ist
      // kosmetisch, ein faelschlicher Speicherfehler waere ein Datenverlust-Alarm.
      setSaveStatus("saved");
      // Fallback = der aktuelle State: "lass die Liste, wie sie ist". KEIN [], das
      // saehe aus, als waeren alle Projekte weg.
      //
      // BEKANNTE, AKZEPTIERTE DEGRADATION (kein Versehen): beim ERSTEN Speichern
      // eines neuen Projekts kommt die id frisch aus dem Insert-Pfad — der Fallback
      // `projects` kennt diese Zeile noch nicht. Wirft listProjects ausgerechnet
      // dann, steht der Editor korrekt auf dem neuen Projekt (projectId gesetzt,
      // gespeichert ist gespeichert), aber der Switcher listet es erst nach einem
      // Reload. BEWUSST NICHT "repariert": einen Listeneintrag hier selbst zu bauen
      // hiesse ERFINDEN statt ableiten — wir kennen id und Name, aber nicht die
      // uebrige Zeilenform (updated_at kommt vom Server). Eine kosmetisch veraltete
      // Liste ist der ehrlichere Zustand als eine mit einem halb erfundenen Eintrag.
      setProjects(await safeAction(() => listProjects(), projects));
    } else {
      setSaveError(result.error);
      setSaveStatus("error");
    }
  }

  // CAPI-Token setzen (Scheibe 2a, write-only). Der GEHEIME Token geht nur in die
  // Server-Action (project_tokens, RLS-SELECT-gesperrt) und kommt NIE zurueck. Bei
  // Erfolg spiegeln wir NUR {trackingKey, tokenSet:true} in settings UND
  // savedSettings (setCapiState laesst pixels/Pixel-ID unangetastet -> eine unsaved
  // Pixel-ID-Edit bleibt erhalten; settingsEqual ignoriert capi -> kein false-dirty).
  // Danach das Eingabefeld leeren (kein Roundtrip des Klartexts).
  async function handleSetCapiToken() {
    // Ohne persistierte Projektzeile gibt es keine project_id fuer den FK -> die UI
    // deaktiviert den Button in diesem Fall; hier zusaetzlich als Riegel.
    if (!projectId) return;
    if (!capiTokenInput.trim()) return;

    setCapiTokenStatus("saving");
    setCapiTokenError(null);
    const result = await safeAction(
      () => setCapiToken(projectId, capiTokenInput),
      actionThrew()
    );
    if (result.ok) {
      setSettings((prev) =>
        setCapiState(prev, { trackingKey: result.trackingKey, tokenSet: true }),
      );
      setSavedSettings((prev) =>
        setCapiState(prev, { trackingKey: result.trackingKey, tokenSet: true }),
      );
      setCapiTokenInput("");
      setCapiTokenStatus("saved");
    } else {
      setCapiTokenError(result.error);
      setCapiTokenStatus("error");
    }
  }

  async function handleRemoveCapiToken() {
    if (!projectId || capiRemoving) return;
    setCapiRemoving(true);
    setCapiTokenError(null);
    const result = await safeAction(
      () => removeCapiToken(projectId),
      actionThrew()
    );
    if (result.ok) {
      // tokenSet:false in settings UND savedSettings spiegeln (trackingKey erhalten,
      // wie serverseitig) -> "••• gesetzt" verschwindet, kein false-dirty.
      setSettings((prev) =>
        setCapiState(prev, { trackingKey: getTrackingKey(prev), tokenSet: false }),
      );
      setSavedSettings((prev) =>
        setCapiState(prev, { trackingKey: getTrackingKey(prev), tokenSet: false }),
      );
      setCapiRemoveConfirming(false);
      setCapiRemoving(false);
      setCapiTokenStatus("idle");
    } else {
      setCapiRemoving(false);
      setCapiRemoveConfirming(false);
      setCapiTokenError(result.error);
      setCapiTokenStatus("error");
    }
  }

  // Export: erzeugt das funktionale Dokument FRISCH im Handler (nicht aus dem
  // functionalHtml-Memo, das nur im Vorschau-Modus belegt ist) -> Export geht auch
  // aus dem Edit-Modus. Quelle ist debouncedCode mit mode:"export": GENAU dieselben
  // Eingaben wie die funktionale Vorschau (die generateFunctional(debouncedCode,
  // mappings, "preview") baut), nur der mode kippt. debouncedCode (nicht das rohe
  // code) ist kritisch: es traegt garantiert die ps-id-Anker, auf die die Mappings
  // zeigen — roher code koennte im Tipp-Fenster davon abweichen und das Wiring ins
  // Leere laufen lassen. Generiert wird aus dem sauberen Klartext (keine
  // Preview-Injektionen), daher idempotent.
  // Baut das funktionale Dokument; NUR der capiProxyUrl-Wert divergiert zwischen den
  // beiden Auslieferwegen (Phase 7b), sonst identische Engine/Eingaben:
  // - Export-Download (fremde Domain): absolute ${NEXT_PUBLIC_APP_URL}/api/e (fail-loud
  //   bei fehlender env -> kein Beacon + warn).
  // - Publish (gehostete Seite, same-origin): relativer /api/e-Pfad (braucht keine env).
  // Scheibe 9a: derselbe Aufruf, nur mit EXPLIZITEN (html, mappings) statt der fest
  // verdrahteten Editor-Wurzeln. Rein mechanische Herausloesung — die
  // generateFunctional-Engine ist eine REINE Funktion (kein Editor-/Modul-State),
  // also laesst sich das Dokument der INAKTIVEN Variante erzeugen, OHNE dass der
  // Editor auf sie umschaltet. Die options sind projektweit (Pixel/trackingKey/
  // Proxy) und darum fuer beide Varianten identisch.
  function buildDocumentFor(
    html: string,
    docMappings: Mapping[],
    capiProxyUrl: string
  ): string {
    return generateFunctional(html, docMappings, "export", {
      metaPixelId: getMetaPixelId(settings),
      trackingKey: getTrackingKey(settings),
      capiProxyUrl,
    });
  }

  function buildFunctionalDocument(capiProxyUrl: string): string {
    return buildDocumentFor(debouncedCode, mappings, capiProxyUrl);
  }

  function buildExportDocument(): string {
    return buildFunctionalDocument(getCapiProxyUrl());
  }

  // Download als .html: Blob -> Object-URL -> temporaerer <a download> -> Klick ->
  // URL wieder freigeben. Dateiname aus dem Projektnamen slugifiziert (Default-/
  // Leer-Name -> "pagesmith-export.html").
  function handleExportDownload() {
    const blob = new Blob([buildExportDocument()], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = exportFilename(activeName);
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  }

  // Kopieren in die Zwischenablage mit EHRLICHEM Feedback. clipboard.writeText kann
  // in unsicherem Kontext / ohne Permission fehlschlagen -> try/catch, kein stilles
  // Nichts.
  async function handleExportCopy() {
    try {
      await navigator.clipboard.writeText(buildExportDocument());
      setCopyStatus("copied");
    } catch {
      setCopyStatus("error");
    }
  }

  // Veroeffentlichen (Phase 7 Scheibe 7a): das funktionale Dokument wird CLIENT-seitig
  // erzeugt (der Server hat kein DOM — generate.ts SSR-Guard), GENAU wie beim Export,
  // und an publishProject gegeben, das es in published_content speichert und ein Label
  // vergibt/wiederverwendet. Braucht ein persistiertes Projekt (projectId); die UI
  // deaktiviert den Button sonst. Das Label wird in settings UND savedSettings
  // gespiegelt (settingsEqual ignoriert hosting -> kein false-dirty), analog setCapiToken.
  async function handlePublish() {
    if (!projectId) return;
    setPublishStatus("publishing");
    setPublishError(null);
    // Publish bäckt den RELATIVEN /api/e-Beacon ein (Phase 7b): die gehostete Seite
    // läuft same-origin auf *.publayer.net -> /api/e wird von der Middleware chirurgisch
    // durchgelassen und trifft den Ingest-Handler. Kein absoluter Pfad/keine env nötig.
    // Scheibe 9a: EIN Publish schreibt BEIDE Varianten (falls B existiert) in EINEM
    // atomaren Write -> es gibt kein "nur A publishen", das B veraltet zuruecklassen
    // koennte. Die Paar-Ableitung selbst liegt seit dem Leer-Riegel WEITER OBEN im
    // geteilten Memo publishPairs — der Publish-Button braucht dieselben Werte, und
    // zwei Ableitungen derselben Frage waren genau der 9b-1-Befund. Inhaltlich
    // unveraendert: aktive Variante aus dem Live-Draft, inaktive aus dem Stash.
    const { pairA, pairB } = publishPairs;

    const result = await safeAction(
      () =>
        publishProject(
          projectId,
          buildDocumentFor(pairA.html, pairA.mappings, "/api/e"),
          { html: pairA.html, mappings: pairA.mappings, settings },
          hasVariantB
            ? {
                functionalHtml: buildDocumentFor(
                  pairB.html,
                  pairB.mappings,
                  "/api/e"
                ),
                mappings: pairB.mappings,
              }
            : undefined
        ),
      actionThrew()
    );
    if (result.ok) {
      // Label in settings UND savedSettings spiegeln (settingsEqual ignoriert hosting
      // -> kein false-dirty). Ab hier leitet liveUrl die URL aus settings.hosting ab —
      // kein separater publishUrl-State noetig, der beim Wechsel leaken koennte.
      const publishedAt = new Date().toISOString();
      setSettings((prev) =>
        setHostingState(prev, { label: result.label, publishedAt })
      );
      setSavedSettings((prev) =>
        setHostingState(prev, { label: result.label, publishedAt })
      );
      setPublishStatus("published");
      // Heilungs-Hinweis: nur gesetzt, wenn der Server die Zeile wirklich
      // wiederhergestellt hat (Feld fehlt im Normalfall -> false).
      setPublishRestored(result.restored === true);
      // REFETCH-PUNKT 2: ein Publish veroeffentlicht seit 9a BEIDE Varianten -> der
      // Wert kann false->true kippen. Der publishProject-Rumpf bleibt unangetastet;
      // das Signal setzt allein dieser Client-Handler.
      setVariantBPublishTick((t) => t + 1);
    } else {
      setPublishError(result.error);
      setPublishStatus("error");
    }
  }

  // A/B-Test starten/stoppen (9b-1). Der neue Zustand wird NICHT lokal angenommen,
  // sondern aus der SERVER-Antwort uebernommen (result.abTestActive) — dasselbe
  // Muster wie createVariantB: der Server ist die Wahrheitsquelle, der Client
  // spiegelt. Bei Verweigerung (B nicht veroeffentlicht) bleibt der Schalter, wo er
  // war, und der Grund erscheint im bestehenden Fehlerkanal.
  async function handleToggleAbTest() {
    if (!projectId || !hasVariantB || variantBusy) return;
    setVariantBusy(true);
    setVariantError(null);
    setVariantStatus("idle");
    const result = await safeAction(
      () => setAbTestActiveAction(projectId, !abTestActive),
      actionThrew()
    );
    if (result.ok) {
      setAbTestActive(result.abTestActive);
    } else {
      setVariantError(result.error);
      setVariantStatus("error");
    }
    setVariantBusy(false);
  }

  // Aktion zuweisen/aendern. ps-ID-ANKER (gemeinsame Logik in anchorMappingTarget):
  // bevor das Mapping gespeichert wird, muss die ps-ID des Ziel-Elements DAUERHAFT
  // im Code stehen, sonst verwaist es sofort. Bei Aenderung spiegeln wir den
  // stabilisierten Code in die Textarea zurueck (wie beim Speichern) und ziehen die
  // Auswahl auf die kanonische ID nach.
  function handleAssignMapping(config: RedirectConfig) {
    if (!selectedElementId) return;
    const { code: nextCode, canonicalId } = anchorMappingTarget(
      code,
      elements,
      selectedElementId
    );
    if (nextCode !== code) {
      setCode(nextCode);
      setSelectedElementId(canonicalId);
    }
    setMappings((prev) =>
      upsertMapping(prev, { elementId: canonicalId, type: "redirect", config })
    );
  }

  // Text-Live-Patch (Scheibe 3): den Override-Text per postMessage an das LAUFENDE
  // Edit-iframe schicken (kein srcDoc-Reload, kein Scroll-Sprung). Zielt
  // ausschliesslich auf das Edit-iframe (iframeRef) — das Preview-iframe traegt
  // bewusst keinen ref und bleibt unberuehrt. Wird NUR bei type:"text"-Mutationen
  // eines PRAESENTEN Elements aufgerufen; abwesende Faelle (Orphan-Loeschen) sind
  // inhaerent sicher (querySelector findet im iframe nichts -> no-op). Beim
  // Erst-Anker eines noch nicht verankerten Elements aendert sich der Code -> ein
  // Reload backt den Stand ohnehin frisch ein; der Post ist dann harmlos (Bake =
  // Quelle der Wahrheit).
  function postTextPatch(elementId: string, content: string) {
    iframeRef.current?.contentWindow?.postMessage(
      { type: "PS_SET_TEXT", elementId, content },
      "*"
    );
  }

  // Text-Override zuweisen/aendern (Phase 5). Exakt derselbe ps-ID-Anker-Pfad wie
  // handleAssignMapping (anchorMappingTarget), nur config = Text statt URL ->
  // bestaetigt, dass der Anker typ-agnostisch traegt. Wirkt NUR in den Draft.
  function handleAssignTextMapping(config: TextConfig) {
    if (!selectedElementId) return;
    const { code: nextCode, canonicalId } = anchorMappingTarget(
      code,
      elements,
      selectedElementId
    );
    if (nextCode !== code) {
      setCode(nextCode);
      setSelectedElementId(canonicalId);
    }
    setMappings((prev) =>
      upsertMapping(prev, { elementId: canonicalId, type: "text", config })
    );
    // Live-Patch ins stehende iframe (Scheibe 3): neuer Text sofort sichtbar.
    postTextPatch(canonicalId, config.content);
  }

  // Tracking-Aktion zuweisen/aendern (Phase 6 Scheibe 1a, STRUKTURELL). Exakt
  // derselbe ps-ID-Anker-Pfad wie handleAssignMapping (interaktives Element); nur
  // config = { event }. KEIN PS_SET_TEXT (track ist kein Text). Wirkt NUR in den
  // Draft; das Firing ist erst im generierten Wiring ein console.log-Stub.
  function handleAssignTrack(config: TrackConfig) {
    if (!selectedElementId) return;
    const { code: nextCode, canonicalId } = anchorMappingTarget(
      code,
      elements,
      selectedElementId
    );
    if (nextCode !== code) {
      setCode(nextCode);
      setSelectedElementId(canonicalId);
    }
    setMappings((prev) =>
      upsertMapping(prev, { elementId: canonicalId, type: "track", config })
    );
  }

  // Aktion eines Slots entfernen (Compound-Key, Scheibe 1a): type waehlt den Slot
  // (redirect | track | text). Der Code (samt ps-ID) bleibt unangetastet; nur das
  // (elementId, type)-Mapping verschwindet, andere Slots desselben Elements bleiben.
  function handleRemoveMapping(type: Mapping["type"]) {
    if (!selectedElementId) return;
    // Scheibe 3: war es ein Text-Override, das iframe LIVE auf den ORIGINAL-
    // Detektionstext zuruecksetzen (nicht den Override stehen lassen). Quelle ist
    // selectedElement.text (untruncierter Originalinhalt). Nur fuer type:"text" —
    // Redirect/Track-Entfernen aendert nichts Sichtbares im Edit-iframe.
    if (type === "text") {
      postTextPatch(selectedElementId, selectedElement?.text ?? "");
    }
    setMappings((prev) => removeMapping(prev, selectedElementId, type));
  }

  // Verwaistes Mapping loeschen. Destruktiv (die gespeicherte URL geht verloren)
  // -> Bestaetigung. Mutiert NUR den State (-> dirty); persistiert wird erst ueber
  // den grossen "Speichern"-Button, kein Auto-Save. Reines Erkennen aendert die
  // Mappings NICHT; Loeschen ist die einzige Mutation. Re-Link ist bewusst NICHT
  // Teil dieser Scheibe (kein automatisches Reparieren/Neu-Verknuepfen).
  function handleRemoveOrphan(elementId: string, type: Mapping["type"]) {
    if (
      !window.confirm(
        "Verwaiste Verknüpfung löschen? Die gespeicherte Konfiguration geht verloren."
      )
    )
      return;
    setMappings((prev) => removeMapping(prev, elementId, type));
  }

  // Re-Link (Weg-C Scheibe 2): die gespeicherte Config eines verwaisten Mappings
  // einem vom USER gewaehlten aktuellen Element neu zuweisen. Komposition
  // bestehender, getesteter Teile — KEINE Logik-Duplikation:
  // (1) Config aus dem Orphan holen, (2) Ueberschreib-Schutz VOR dem Schreiben,
  // (3) ps-ID-Anker via anchorMappingTarget (gleiche Mechanik wie Assign),
  // (4) alten Orphan entfernen UND Config aufs Ziel upserten in EINER State-
  //     Aktualisierung -> Orphan verschwindet, neues Mapping erscheint.
  // Self-resolving: der abgeleitete findOrphans-Status loest den Eintrag selbst
  // auf; das Badge erscheint am Ziel. NIE automatisch raten — nur die explizite
  // Dropdown-Wahl verknuepft. Mutiert State (+ ggf. code) -> dirty, kein Auto-Save.
  function handleRelinkOrphan(
    orphanElementId: string,
    orphanType: Mapping["type"],
    targetElementId: string
  ) {
    const orphan = findMapping(mappings, orphanElementId, orphanType);
    if (!orphan) return;
    // Ueberschreib-Schutz TYP-AWARE (Scheibe 1a): nur warnen, wenn das Ziel bereits
    // ein Mapping DESSELBEN Typs traegt — genau das, was der folgende upsert ersetzen
    // wuerde. Ein redirect-Orphan auf ein Element mit nur track ist KEINE
    // Ueberschreibung (anderer Slot) -> kein Fehlalarm.
    if (
      mappings.some(
        (m) => m.elementId === targetElementId && m.type === orphanType
      ) &&
      !window.confirm("Dieses Element hat bereits eine Aktion dieses Typs — ersetzen?")
    )
      return;
    const { code: nextCode, canonicalId } = anchorMappingTarget(
      code,
      elements,
      targetElementId
    );
    if (nextCode !== code) setCode(nextCode);
    // Pro Zweig narrowen, damit type<->config korreliert bleibt (diskriminierte
    // Union). Die gespeicherte Config wandert 1:1 auf das neue Element.
    const relinked: Mapping =
      orphan.type === "text"
        ? { elementId: canonicalId, type: "text", config: orphan.config }
        : orphan.type === "track"
          ? { elementId: canonicalId, type: "track", config: orphan.config }
          : { elementId: canonicalId, type: "redirect", config: orphan.config };
    setMappings((prev) =>
      upsertMapping(removeMapping(prev, orphanElementId, orphanType), relinked)
    );
    // Scheibe 3: ein re-verknuepftes Text-Mapping landet auf einem PRAESENTEN
    // Zielelement -> dessen Text live patchen (sonst divergiert das stehende
    // iframe von Liste/Header). Nur fuer type:"text".
    if (orphan.type === "text") {
      postTextPatch(canonicalId, orphan.config.content);
    }
  }

  // Projekt wechseln: laedt dessen HTML in den Editor. Dirty-Guard verhindert
  // stillen Verlust ungespeicherter Aenderungen.
  async function handleSwitch(id: string) {
    if (id === projectId) {
      setIsProjectMenuOpen(false);
      return;
    }
    if (dirty && !window.confirm("Ungespeicherte Aenderungen verwerfen und Projekt wechseln?"))
      return;
    const proj = await safeAction(() => loadProject(id), null);
    if (!proj) {
      setSaveError("Projekt konnte nicht geladen werden.");
      setSaveStatus("error");
      return;
    }
    setProjectId(proj.id);
    setCode(proj.html);
    setSavedCode(proj.html);
    setMappings(proj.mappings);
    setSavedMappings(proj.mappings);
    // Settings am SELBEN Punkt wie savedMappings reseeden -> kein Leak zwischen
    // Projekten (Pixel-ID von A darf nicht in B stehen bleiben).
    setSettings(proj.settings);
    setSavedSettings(proj.settings);
    // Varianten-Zustand am SELBEN Punkt aus dem GELADENEN Projekt ableiten.
    seedVariantState(proj.html_b, proj.mappings_b, proj.ab_test_active);
    setSelectedElementId(null);
    setIsProjectMenuOpen(false);
    // Zen-Default fuer den neuen Kontext: mit Code eingeklappt, leer offen.
    applyZenForLoadedCode(proj.html);
  }

  // Neues Projekt: lebt zunaechst NUR im Editor-State, DB-Zeile entsteht erst
  // beim ersten Speichern. Dirty-Guard wie beim Wechseln.
  function handleNew() {
    if (dirty && !window.confirm("Ungespeicherte Aenderungen verwerfen?")) return;
    resetToEmpty();
    setIsProjectMenuOpen(false);
  }

  // Loeschen: destruktiv -> Bestaetigung. War es das AKTIVE Projekt, faellt der
  // Editor auf das zuletzt bearbeitete verbleibende zurueck; war es das letzte,
  // auf den leeren Zustand. Nie eine tote projectId behalten.
  async function handleDelete(id: string) {
    const target = projects.find((p) => p.id === id);
    if (!window.confirm(`Projekt "${target?.name ?? ""}" wirklich loeschen?`)) return;

    const result = await safeAction(() => deleteProject(id), actionThrew());
    if (!result.ok) {
      setSaveError(result.error);
      setSaveStatus("error");
      return;
    }

    // AUFLAGE 3 — Fallback = aktuelle Liste OHNE das gerade geloeschte Projekt.
    // KEIN erfundener Zustand: der Primaervorgang war ERFOLGREICH, das Projekt ist
    // wirklich weg; die lokale Liste um genau diesen Eintrag zu kuerzen, ist aus
    // einer BEKANNTEN Tatsache abgeleitet. Ein [] saehe aus, als waeren ALLE
    // Projekte weg, und remaining[0] unten waere undefined -> der Editor fiele
    // faelschlich auf den Leerzustand statt auf den richtigen Nachbarn.
    const remaining = await safeAction(
      () => listProjects(),
      projects.filter((p) => p.id !== id)
    );
    setProjects(remaining);

    if (id === projectId) {
      // remaining ist nach updated_at desc sortiert -> [0] ist das zuletzt
      // bearbeitete verbleibende Projekt.
      const next = remaining[0]
        ? await safeAction(() => loadProject(remaining[0].id), null)
        : null;
      if (next) {
        setProjectId(next.id);
        setCode(next.html);
        setSavedCode(next.html);
        setMappings(next.mappings);
        setSavedMappings(next.mappings);
        // Settings am SELBEN Punkt wie savedMappings reseeden (kein Leak).
        setSettings(next.settings);
        setSavedSettings(next.settings);
        // Varianten-Zustand aus dem nachgerueckten Projekt ableiten.
        seedVariantState(next.html_b, next.mappings_b, next.ab_test_active);
        setSelectedElementId(null);
        // Zen-Default fuer den nachgerueckten Kontext (resetToEmpty deckt den
        // leeren Fall im else selbst ab).
        applyZenForLoadedCode(next.html);
      } else {
        resetToEmpty();
      }
    }
  }

  // Inline-Umbenennung bestaetigen.
  async function commitRename(id: string) {
    const name = renameValue.trim();
    setRenamingId(null);
    if (!name) return;
    const result = await safeAction(() => renameProject(id, name), actionThrew());
    if (!result.ok) {
      setSaveError(result.error);
      setSaveStatus("error");
      return;
    }
    // Fallback = der aktuelle State (Invariante iv): der Primaervorgang ist
    // geglueckt, ein Wurf im Folge-Refresh darf ihn nicht in einen Fehler kippen.
    setProjects(await safeAction(() => listProjects(), projects));
  }

  return (
    <div className="flex w-full flex-col gap-4">
      {/* Projekt-Toolbar (3.3): aktives Projekt + ausklappbarer Switcher.
          Liegt UEBER den drei Zonen, damit der Editor-Kern unveraendert bleibt. */}
      <div className="relative flex flex-wrap items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-2">
        <button
          type="button"
          onClick={() => setIsProjectMenuOpen((v) => !v)}
          aria-expanded={isProjectMenuOpen}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          Projekte
          <Chevron direction={isProjectMenuOpen ? "left" : "right"} />
        </button>
        <span className="min-w-0 truncate text-sm text-gray-600">
          Aktiv:{" "}
          <span className="font-medium text-gray-900">{activeName}</span>
          {dirty && (
            <span className="text-amber-600" title="Ungespeicherte Aenderungen">
              {" "}
              •
            </span>
          )}
        </span>
        <button
          type="button"
          onClick={handleNew}
          className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          + Neues Projekt
        </button>

        {/* A/B-Varianten (Phase 9 Scheibe 9a). Der Editor arbeitet IMMER auf genau
            EINER Variante — welche das ist, muss zu jedem Zeitpunkt sichtbar sein.
            Ohne Variante B steht hier nur der Anlegen-Button; die Toolbar eines
            Bestandsprojekts sieht damit aus wie bisher (Invariante i).
            KEIN Split: die Live-URL liefert weiterhin ausschliesslich Variante A. */}
        {hasVariantB ? (
          <div
            className="flex items-center gap-1 rounded-md border border-gray-300 p-0.5"
            role="group"
            aria-label="Variante"
          >
            {(["a", "b"] as const).map((v) => (
              <button
                key={v}
                type="button"
                onClick={() => switchVariant(v)}
                aria-pressed={activeVariant === v}
                className={`rounded px-3 py-1 text-sm font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  activeVariant === v
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                Variante {v.toUpperCase()}
              </button>
            ))}
          </div>
        ) : (
          <button
            type="button"
            onClick={handleCreateVariantB}
            disabled={!projectId || dirty || variantBusy}
            title={
              !projectId
                ? "Projekt zuerst speichern"
                : dirty
                  ? "Erst speichern — Variante B wird als Kopie des gespeicherten Stands angelegt"
                  : "Variante B als Kopie von Variante A anlegen"
            }
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {variantBusy ? "…" : "+ Variante B"}
          </button>
        )}
        {/* ZWEITER Anzeigeort DESSELBEN lokalen Kanals: scheitert das ANLEGEN von
            Variante B, ist die Varianten-Sektion im Einstellungs-Panel noch gar
            nicht sichtbar (sie haengt an hasVariantB, und genau das ist dann false)
            -> ohne diese Stelle waere der Fehler unsichtbar. Ein State, zwei Orte,
            jeweils neben dem Button, den der Nutzer geklickt hat. */}
        {!hasVariantB && variantStatus === "error" && variantError && (
          <span className="text-xs text-red-600">{variantError}</span>
        )}

        <button
          type="button"
          onClick={() => setIsSettingsOpen((v) => !v)}
          aria-expanded={isSettingsOpen}
          className="flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500"
        >
          ⚙ Einstellungen
          <Chevron direction={isSettingsOpen ? "up" : "down"} />
        </button>

        {/* Export-Gruppe (rechts). Erzeugt das funktionale Dokument aus genau der
            Quelle, aus der die Vorschau baut (debouncedCode, mode:"export") ->
            "was in der Vorschau klickt, tut die Datei". WYSIWYG, unabhaengig vom
            Speichern. Beide Buttons sind bei leerem Code deaktiviert. */}
        <div className="ml-auto flex flex-wrap items-center gap-2 border-l border-gray-200 pl-3">
          {/* Orphan-Hinweis: nur bei >0, gespeist aus dem vorhandenen orphans-Array
              (kein neuer Detektionsweg). Verwaiste Mappings werden vom Generator
              ohnehin still rausgefiltert — hier nur transparent gemacht. */}
          {orphans.length > 0 && (
            <span className="text-xs text-amber-600">
              {orphans.length} verwaiste Verknüpfung
              {orphans.length === 1 ? "" : "en"} werden nicht exportiert
            </span>
          )}
          {/* Copy-Feedback (ehrlich): copied/error sichtbar, kein stilles Nichts. */}
          {copyStatus === "copied" && (
            <span className="text-xs font-medium text-green-600">Kopiert ✓</span>
          )}
          {copyStatus === "error" && (
            <span className="text-xs font-medium text-red-600">
              Kopieren fehlgeschlagen
            </span>
          )}
          <button
            type="button"
            onClick={handleExportCopy}
            disabled={code.trim() === ""}
            className="rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {hasVariantB
              ? `Variante ${activeVariantLabel} kopieren`
              : "In Zwischenablage kopieren"}
          </button>
          <button
            type="button"
            onClick={handleExportDownload}
            disabled={code.trim() === ""}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {/* Exportiert die im Editor AKTIVE Variante — mit B im Spiel wird sie
                explizit benannt. Ohne B bleibt die Beschriftung unveraendert
                (Invariante i: kein UI-Drift fuer Bestandsprojekte). Der Export
                folgt dem Wurzeltausch automatisch, es gibt keinen zweiten
                Lesepfad. */}
            {hasVariantB
              ? `Variante ${activeVariantLabel} exportieren`
              : "Projekt exportieren"}
          </button>
        </div>

        {/* Dropdown: rendert nur im offenen Zustand (clientseitig) -> keine
            Hydration-Mismatches bei den relativen Zeitstempeln. */}
        {isProjectMenuOpen && (
          <div className="absolute left-0 top-full z-10 mt-1 max-h-96 w-80 overflow-y-auto rounded-lg border border-gray-300 bg-white py-1 shadow-lg">
            {projects.length === 0 ? (
              <p className="px-3 py-2 text-sm text-gray-400">
                Noch keine gespeicherten Projekte.
              </p>
            ) : (
              projects.map((p) => {
                const isActive = p.id === projectId;
                return (
                  <div
                    key={p.id}
                    className={`flex items-center gap-2 px-2 py-1.5 ${
                      isActive ? "bg-blue-50" : "hover:bg-gray-50"
                    }`}
                  >
                    {renamingId === p.id ? (
                      <input
                        autoFocus
                        value={renameValue}
                        onChange={(e) => setRenameValue(e.target.value)}
                        onBlur={() => commitRename(p.id)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") commitRename(p.id);
                          else if (e.key === "Escape") setRenamingId(null);
                        }}
                        className="min-w-0 flex-1 rounded border border-gray-300 px-2 py-1 text-sm focus:border-blue-500 focus:outline-none"
                      />
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleSwitch(p.id)}
                        className="flex min-w-0 flex-1 flex-col items-start text-left focus:outline-none"
                      >
                        <span
                          className={`truncate text-sm ${
                            isActive
                              ? "font-medium text-blue-800"
                              : "text-gray-800"
                          }`}
                        >
                          {p.name}
                        </span>
                        <span className="text-xs text-gray-400">
                          {formatRelative(p.updated_at)}
                        </span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => {
                        setRenamingId(p.id);
                        setRenameValue(p.name);
                      }}
                      aria-label="Umbenennen"
                      className="rounded p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                    >
                      ✎
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(p.id)}
                      aria-label="Loeschen"
                      className="rounded p-1 text-gray-400 hover:bg-red-50 hover:text-red-600 focus:outline-none"
                    >
                      🗑
                    </button>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Projekt-Einstellungen (Scheibe 1b): projektweite Tracking-Pixel. Als
          beschriftete Plattform-LISTE aufgebaut -> weitere Plattformen (Google/
          TikTok/…) passen spaeter als weitere Zeilen daneben, ohne Umbau. In 1b
          genau EINE Zeile: Meta-Pixel-ID. Projektweit (nicht pro Element);
          Aenderung -> dirty -> grosser Speichern-Button persistiert (kein Auto-Save).
          Pixel-ID ist OEFFENTLICH -> Plain-Feld, kein Secret-Handling. */}
      {isSettingsOpen && (
        <div className="rounded-lg border border-gray-300 bg-white px-4 py-3">
          <h2 className="mb-1 text-sm font-medium text-gray-700">
            Tracking-Pixel
          </h2>
          <p className="mb-3 text-xs text-gray-500">
            Projektweite Pixel-IDs. Gilt für alle Tracking-Events dieses Projekts.
          </p>
          <div className="flex flex-col gap-3">
            <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-center sm:gap-3">
              <span className="w-40 shrink-0 font-medium text-gray-700">
                Meta-Pixel-ID
              </span>
              <input
                type="text"
                inputMode="numeric"
                value={getMetaPixelId(settings)}
                onChange={(e) =>
                  setSettings((prev) => setMetaPixelId(prev, e.target.value))
                }
                placeholder="z.B. 123456789012345"
                className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </label>

            {/* Meta-CAPI-Token (Scheibe 2a): GEHEIM, write-only. Der echte Wert
                geht nur in die Server-Action und kommt NIE zurueck -> das Feld
                startet/bleibt leer, gespeist wird es NIE aus settings. Der
                "gesetzt?"-Indikator kommt aus settings.capi.tokenSet. Ohne
                gespeichertes Projekt (kein projectId) fehlt die project_id fuer
                den FK -> deaktiviert + Hinweis. */}
            <label className="flex flex-col gap-1 text-sm sm:flex-row sm:items-start sm:gap-3">
              <span className="w-40 shrink-0 pt-2 font-medium text-gray-700">
                Meta CAPI-Token
                <span className="block text-xs font-normal text-gray-400">
                  Server-Side, geheim
                </span>
              </span>
              <div className="flex w-full max-w-xs flex-col gap-1">
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    autoComplete="off"
                    value={capiTokenInput}
                    onChange={(e) => setCapiTokenInput(e.target.value)}
                    disabled={!projectId}
                    placeholder={
                      getCapiTokenSet(settings)
                        ? "Neuen Token eingeben zum Ersetzen"
                        : "CAPI-Token einfügen"
                    }
                    className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 disabled:cursor-not-allowed disabled:bg-gray-100"
                  />
                  <button
                    type="button"
                    onClick={handleSetCapiToken}
                    disabled={
                      !projectId ||
                      !capiTokenInput.trim() ||
                      capiTokenStatus === "saving"
                    }
                    className="shrink-0 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {capiTokenStatus === "saving" ? "…" : "Setzen"}
                  </button>
                  {/* "Entfernen" nur wenn bereits ein Token gesetzt ist. */}
                  {projectId &&
                    getCapiTokenSet(settings) &&
                    !capiRemoveConfirming && (
                      <button
                        type="button"
                        onClick={() => setCapiRemoveConfirming(true)}
                        disabled={capiRemoving}
                        className="shrink-0 rounded-md border border-red-200 px-2 py-2 text-xs text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        Entfernen
                      </button>
                    )}
                </div>
                {/* Zweistufige Bestaetigung — deaktiviert das Tracking (destruktiv). */}
                {capiRemoveConfirming && (
                  <div className="flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
                    <span className="text-xs text-red-700">
                      Tracking für dieses Projekt deaktivieren? Der Token wird gelöscht.
                    </span>
                    <button
                      type="button"
                      onClick={handleRemoveCapiToken}
                      disabled={capiRemoving}
                      className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                    >
                      {capiRemoving ? "Entferne…" : "Ja, entfernen"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setCapiRemoveConfirming(false)}
                      disabled={capiRemoving}
                      className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Abbrechen
                    </button>
                  </div>
                )}
                {!projectId && (
                  <span className="text-xs text-gray-500">
                    Projekt zuerst speichern, dann ist der Token setzbar.
                  </span>
                )}
                {projectId && getCapiTokenSet(settings) && (
                  <span className="text-xs text-green-600">••• gesetzt</span>
                )}
                {capiTokenStatus === "saved" && (
                  <span className="text-xs text-green-600">
                    Token gespeichert ✓
                  </span>
                )}
                {capiTokenStatus === "error" && capiTokenError && (
                  <span className="text-xs text-red-600">{capiTokenError}</span>
                )}
              </div>
            </label>
          </div>

          {/* Hosting / Veröffentlichen (Phase 7 Scheibe 7a): schaltet die funktionale
              Seite unter label.publayer.net live. Erzeugt das funktionale Dokument
              CLIENT-seitig (wie Export, WYSIWYG) und speichert es via publishProject.
              Braucht ein gespeichertes Projekt (projectId) -> sonst deaktiviert +
              Hinweis (wie beim CAPI-Token). */}
          <div className="mt-4 border-t border-gray-200 pt-4">
            <h2 className="mb-1 text-sm font-medium text-gray-700">
              Veröffentlichen
            </h2>
            <p className="mb-3 text-xs text-gray-500">
              Schaltet die funktionale Seite unter einer eigenen Subdomain live.
            </p>
            {/* Ehrlich benannt, weil es beim Publish mit zwei Varianten genau eine
                Asymmetrie gibt: die bearbeitete Variante geht im aktuellen
                Editor-Stand live, die andere in ihrem gespeicherten (sie existiert
                im Editor gar nicht anders). Und: die Live-URL zeigt weiterhin
                ausschliesslich Variante A — der Split kommt erst in 9b. */}
            {hasVariantB && (
              <p className="mb-3 text-xs text-gray-500">
                Veröffentlicht <strong>beide Varianten</strong>: Variante{" "}
                {activeVariantLabel} im aktuellen Editor-Stand, die andere in ihrem
                zuletzt gespeicherten Stand. Die Live-URL zeigt weiterhin nur
                Variante A.
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handlePublish}
                // SPERRT, beraet nicht — anders als der 9b-1p-Hinweis, dessen Wert
                // aus einem ASYNCHRONEN Server-Read kam (ein haengender Ladevorgang
                // darf keine funktionierende Aktion sperren). Hier ist der Wert
                // lokaler State, synchron, immer bekannt: es gibt keinen
                // "unbekannt"-Zustand, also darf der Button sperren. Autoritaet
                // bleibt trotzdem der SERVER-Riegel — der Button ist Komfort, der
                // Riegel ist die Garantie.
                //
                // emptyPublishTarget ERSETZT das fruehere code.trim() === "": jenes
                // las nur die AKTIVE Variante und liess damit genau den schlimmsten
                // Fall durch (B aktiv und gefuellt, A leer -> ALLE Besucher bekommen
                // die leere Seite, weil die Route ohne aktiven Test immer A liefert).
                disabled={
                  !projectId ||
                  emptyPublishTarget !== null ||
                  publishStatus === "publishing"
                }
                className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                {publishStatus === "publishing"
                  ? "Veröffentliche…"
                  : liveUrl || hostingLabel
                    ? "Erneut veröffentlichen"
                    : "Veröffentlichen"}
              </button>
              {/* Link/Indikator ABGELEITET aus settings.hosting (liveUrl/hostingLabel)
                  -> reseedet beim Projektwechsel automatisch, kein A->B-Leak. */}
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm font-medium text-green-700 underline"
                >
                  {liveUrl}
                </a>
              )}
            </div>
            {/* EIN ANZEIGESLOT, PRIORITAET FEHLER VOR HINWEIS — strukturell ueber
                eine Rangfolge, NICHT per Textvergleich. Der 9b-1p-NACHTRAG kam
                genau daher: Hinweis und Riegel-Fehler waren gleichzeitig sichtbar
                und zeigten denselben Satz doppelt. Mit einem Slot ist das
                unmoeglich statt nur unwahrscheinlich.
                Rangfolge: (1) ein tatsaechlich aufgetretener Server-Fehler, (2) das
                fehlende Projekt (fundamentaler Blocker als leerer Inhalt), (3) der
                Leer-Hinweis. Die projektweite Status-Zeile darunter bleibt
                UNVERAENDERT — sie beantwortet eine andere Frage (ist veroeffentlicht?)
                und war nie Teil des Befunds. */}
            {publishNotice && (
              <p
                className={`mt-2 text-xs ${
                  publishNotice.tone === "error"
                    ? "text-red-600"
                    : "text-gray-500"
                }`}
              >
                {publishNotice.text}
              </p>
            )}
            {hostingLabel ? (
              <p className="mt-2 text-xs text-green-600">
                ● veröffentlicht
                {publishStatus === "published" && " ✓ aktualisiert"}
                {/* Ein Publish, der eine tote Adresse wiederbelebt hat, darf nicht
                    aussehen wie jeder andere — der Nutzer soll wissen, dass etwas
                    repariert wurde. Zusatz in der BESTEHENDEN Statuszeile, kein
                    neues UI-Konzept. */}
                {publishStatus === "published" && publishRestored && (
                  <span className="font-medium">
                    {" "}
                    — Adresse war nicht mehr erreichbar und wurde wiederhergestellt.
                  </span>
                )}
              </p>
            ) : (
              projectId && (
                <p className="mt-2 text-xs text-gray-500">
                  Noch nicht veröffentlicht.
                </p>
              )
            )}
          </div>

          {/* Variante B verwalten (Phase 9 Scheibe 9a). Destruktiv -> zweistufige
              Inline-Bestaetigung, exakt wie "CAPI-Token entfernen". Bewusst hier im
              Einstellungs-Panel und NICHT neben dem Umschalter in der Toolbar: ein
              Loeschen gehoert nicht in Klick-Naehe eines reinen Ansichtswechsels. */}
          {hasVariantB && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="mb-1 text-sm font-medium text-gray-700">
                Variante B
              </h2>
              {/* A/B-Test-Schalter (Phase 9 Scheibe 9b-1). Zustand ABGELEITET aus
                  ab_test_active (Projekt-Spalte), nicht lokal gehalten. Klartext
                  zur Abgrenzung: "Test stoppen" löscht NICHTS — das ist
                  "Variante B entfernen" darunter. */}
              <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-gray-200 px-3 py-2">
                <button
                  type="button"
                  onClick={handleToggleAbTest}
                  disabled={variantBusy}
                  className={`rounded-md px-3 py-1.5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:bg-gray-300 ${
                    abTestActive
                      ? "bg-amber-600 hover:bg-amber-700"
                      : "bg-green-600 hover:bg-green-700"
                  }`}
                >
                  {variantBusy
                    ? "…"
                    : abTestActive
                      ? "Test stoppen"
                      : "Test starten"}
                </button>
                {abTestActive ? (
                  <span className="text-xs font-medium text-green-700">
                    ● Test läuft — Besucher sehen zur Hälfte Variante A, zur Hälfte
                    Variante B.
                  </span>
                ) : (
                  <span className="text-xs text-gray-500">
                    Test aus — die Live-URL liefert ausschließlich Variante A.
                  </span>
                )}
                <span className="w-full text-xs text-gray-400">
                  „Test stoppen“ löscht nichts, es schaltet nur den Split ab.
                  Variante B muss veröffentlicht sein, damit der Test starten kann.
                </span>
                {/* EIN ANZEIGESLOT, ZWEI QUELLEN — PRIORITAET: FEHLER VOR HINWEIS.
                    Sie schliessen sich gegenseitig aus, weil sie dieselbe Frage
                    beantworten ("warum geht der Test gerade nicht?"): der HINWEIS
                    sagt es vorab, der FEHLER nach dem Klick. Beide gleichzeitig hiess
                    im Fall "B nicht veroeffentlicht" DENSELBEN Satz zweimal
                    untereinander (beide aus VARIANT_B_NOT_PUBLISHED_MESSAGE).
                    STRUKTURELL geloest, NICHT per Textvergleich: ein Vergleich der
                    Inhalte wuerde nur DIESES Satzpaar entdecken und bei jedem
                    kuenftigen Fehlertext, der dieselbe Ursache anders formuliert,
                    wieder doppeln. Ein Slot kann per Konstruktion nur eines zeigen.
                    Prioritaet FEHLER, weil er die juengere und konkretere Auskunft
                    ist: er bezieht sich auf den Klick, den der Nutzer GERADE getan
                    hat, und kann Ursachen nennen, die der Hinweis nicht kennt.
                    HINWEIS-Regeln unveraendert: nur bei EINDEUTIGEM false; bei null
                    (nicht ermittelbar) und bei true steht hier nichts, und der Button
                    bleibt in JEDEM Fall klickbar (Autoritaet ist der Server-Riegel).
                    Die zweite Render-Stelle neben "+ Variante B" bleibt, wie sie ist:
                    dort gibt es keinen Hinweis, also auch keine Doppelung. */}
                {variantStatus === "error" && variantError ? (
                  <p className="w-full text-xs text-red-600">{variantError}</p>
                ) : variantBPublished === false ? (
                  <p className="w-full text-xs text-amber-700">
                    {VARIANT_B_NOT_PUBLISHED_MESSAGE}
                  </p>
                ) : null}
              </div>
              <p className="mb-3 text-xs text-gray-500">
                Entfernt den <strong>Inhalt</strong> von Variante B (HTML +
                Verknüpfungen) und nimmt sie aus der Veröffentlichung. Variante A
                bleibt unberührt.
              </p>
              {!variantBRemoveConfirming ? (
                <button
                  type="button"
                  onClick={() => setVariantBRemoveConfirming(true)}
                  disabled={variantBusy}
                  className="rounded-md border border-red-200 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Variante B entfernen
                </button>
              ) : (
                <div className="flex flex-wrap items-center gap-2 rounded-md bg-red-50 px-3 py-2">
                  <span className="text-xs text-red-700">
                    Variante B endgültig entfernen? Ihr HTML und ihre
                    Verknüpfungen gehen verloren.
                  </span>
                  <button
                    type="button"
                    onClick={handleRemoveVariantB}
                    disabled={variantBusy}
                    className="rounded-md bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                  >
                    {variantBusy ? "Entferne…" : "Ja, entfernen"}
                  </button>
                  <button
                    type="button"
                    onClick={() => setVariantBRemoveConfirming(false)}
                    disabled={variantBusy}
                    className="rounded-md border border-gray-300 px-3 py-1 text-xs text-gray-600 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Abbrechen
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Statistik (Phase 8 Scheibe 3): server-seitige Analytics-Counts des aktiven
              Projekts (PageViews + Conversions), server-beobachtet (source='server'),
              adblocker-resistent. Nur bei gespeichertem Projekt; leer -> Hinweis. */}
          {projectId && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="mb-1 text-sm font-medium text-gray-700">Statistik</h2>
              <p className="mb-3 text-xs text-gray-500">
                Server-seitig erfasste Events dieses Projekts.
              </p>
              {eventCounts.length === 0 ? (
                <p className="text-xs text-gray-500">Noch keine Events.</p>
              ) : (
                <ul className="flex flex-col gap-1">
                  {eventCounts.map((c) => (
                    <li
                      key={c.event_type}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-gray-700">
                        {eventTypeLabel(c.event_type)}
                      </span>
                      <span className="font-semibold tabular-nums text-gray-900">
                        {c.count}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Adblocker-Verlustrate (Phase 8 Scheibe B): die Marquee-Zahl, additiv unter
                  den Counts.

                  WORTWAHL (nicht verhandelbar): "NUR server-seitig erfasst" — NIEMALS
                  "gerettet". "Gerettet" behauptet, Meta habe die Events EMPFANGEN; das
                  steht NICHT in unseren Daten. events protokolliert, was der SERVER
                  BEOBACHTET hat, nicht ob der Forward ankam — der CAPI-'Bad signature'-Bug
                  hat live gezeigt, dass Forwards STILL scheitern, waehrend die Zeilen
                  sauber weiterlaufen. Eine Kachel, die in genau diesem Zustand "gerettet"
                  sagt, luegt den Kunden an.

                  "mindestens": die Zahl kann in BEIDE Richtungen irren — nach oben durch
                  das Redirect-Rennen und JS-Fehler/schnellen Bounce, nach unten durch
                  Surrogat-Blocker (Noop-Skript -> onload feuert, Pixel ist tot).

                  NEUTRAL-STATUS statt Zahl, wenn kein Stichtag existiert ODER das Fenster
                  leer ist (total === 0) -> keine Division, keine erfundene 0%/100%-Zahl. */}
              <div className="mt-4 border-t border-gray-100 pt-3">
                <h3 className="mb-1 text-sm font-medium text-gray-700">
                  Adblocker-Verlust
                </h3>
                {!adblockLoss ||
                adblockLoss.first_confirm_at === null ||
                adblockLoss.total_server_conversions === 0 ? (
                  <p className="text-xs text-gray-500">
                    Warte auf erste Bestätigung.
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-semibold tabular-nums text-gray-900">
                      mindestens{" "}
                      {Math.round(
                        ((adblockLoss.total_server_conversions -
                          adblockLoss.confirmed_conversions) /
                          adblockLoss.total_server_conversions) *
                          100
                      )}
                      %
                    </p>
                    <p className="mt-0.5 text-xs text-gray-500">
                      {adblockLoss.total_server_conversions -
                        adblockLoss.confirmed_conversions}{" "}
                      von {adblockLoss.total_server_conversions} Conversions wurden
                      NUR server-seitig erfasst.
                    </p>
                  </>
                )}
              </div>
            </div>
          )}

          {/* Auswertung je Variante (Phase 9 Scheibe 9c-1). EIGENE Sektion, additiv neben
              der projektweiten Statistik — bewusst NICHT in sie hinein:

              Stuende eine projektweite Gesamtzahl neben den Varianten-Zahlen, fragte der
              Nutzer zu Recht, warum das nicht aufgeht. Es sind ZWEI Fragen (projektweit vs.
              varianten-zugeordnet), und getrennte Sektionen sagen das; geteilte Spalten
              laden zum Addieren ein und produzieren einen Support-Fall aus einer korrekten
              Anzeige.

              WORTWAHL (nicht verhandelbar, gleiche Disziplin wie "nur server-seitig
              erfasst"): "Conversions je Seitenaufruf" — NIEMALS "Conversion-Rate je
              Besucher". Es gibt keine Besucher-Identitaet: ein Besucher, der dreimal laedt,
              zaehlt dreimal. Die Bezugsgroesse steht im Namen, sonst liest der Nutzer eine
              Zahl, die es nicht gibt.

              ABSOLUTWERTE PRIMAER, Rate sekundaer, KEINE Sieger-Auszeichnung, keine
              Ampelfarben, keine Schwelle: die Zielgruppe trifft mit diesen Zahlen
              Budget-Entscheidungen, und eine Darstellung, die einen Sieger suggeriert,
              erzeugt Vertrauen, das sie nicht deckt. "12 von 340" ENTHAELT die
              Bezugsgroesse, "3,5 %" nicht. */}
          {projectId && showVariantCounts && (
            <div className="mt-4 border-t border-gray-200 pt-4">
              <h2 className="mb-1 text-sm font-medium text-gray-700">
                Auswertung je Variante
              </h2>
              <p className="mb-3 text-xs text-gray-500">
                Server-seitig erfasste Events, aufgeteilt nach ausgelieferter
                Variante.
              </p>

              {variantCountsFailed ? (
                /* "LEER" UND "NICHT LADBAR" SEHEN NICHT GLEICH AUS (Backlog-Punkt, hier
                   fuer DIESE Sektion eingeloest). Eine Sektion, die bei einem Ladefehler
                   "keine Daten" sagt, behauptet etwas, das sie nicht belegen kann. Der
                   Text nennt weder Ursache noch Ergebnis — dieselbe Wortwahl-Disziplin
                   wie ACTION_THROW_MESSAGE. */
                <p className="text-xs text-amber-700">
                  Die Auswertung konnte nicht geladen werden — bitte Seite neu
                  laden.
                </p>
              ) : (
                <>
                  {/* Der NENNER (Seitenaufrufe je Variante) und die ZAEHLER (Conversions)
                      stehen in DERSELBEN Tabelle und stammen aus DEMSELBEN RPC-Ergebnis —
                      getrennt wird hier, beim Aufrufer, anhand des reservierten Tokens.
                      Eine zweite Abfrage waere ein zweiter Roundtrip fuer Daten, die
                      dieselbe Gruppierung ohnehin liefert, und koennte gegen den Zaehler
                      desynchronisieren. */}
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-xs text-gray-500">
                        <th className="pb-1 text-left font-medium">Event</th>
                        <th className="pb-1 text-right font-medium">
                          Variante A
                        </th>
                        <th className="pb-1 text-right font-medium">
                          Variante B
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {variantRows.map((r) => (
                        <tr key={r.event_type}>
                          <td className="py-0.5 text-gray-700">
                            {eventTypeLabel(r.event_type)}
                          </td>
                          <td className="py-0.5 text-right font-semibold tabular-nums text-gray-900">
                            {r.count_a}
                          </td>
                          <td className="py-0.5 text-right font-semibold tabular-nums text-gray-900">
                            {r.count_b}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* CONVERSIONS JE SEITENAUFRUF — Absolutwerte zuerst, Rate in Klammern.
                      Nur fuer Event-Arten, die KEINE PageViews sind, und nur wenn im
                      Nenner ueberhaupt Aufrufe stehen (keine Division durch 0, keine
                      erfundene Zahl). */}
                  {(() => {
                    const pageviews = variantRows.find(
                      (r) => r.event_type === PAGEVIEW_EVENT
                    );
                    const conversions = variantRows.filter(
                      (r) => r.event_type !== PAGEVIEW_EVENT
                    );
                    if (!pageviews || conversions.length === 0) return null;
                    return (
                      <div className="mt-3 border-t border-gray-100 pt-2">
                        <h3 className="mb-1 text-xs font-medium text-gray-700">
                          Conversions je Seitenaufruf
                        </h3>
                        <ul className="flex flex-col gap-0.5">
                          {conversions.map((c) => (
                            <li key={c.event_type} className="text-xs text-gray-600">
                              {c.event_type}: A {c.count_a} von{" "}
                              {pageviews.count_a}
                              {pageviews.count_a > 0 &&
                                ` (${((c.count_a / pageviews.count_a) * 100).toFixed(1)} %)`}
                              {" · "}B {c.count_b} von {pageviews.count_b}
                              {pageviews.count_b > 0 &&
                                ` (${((c.count_b / pageviews.count_b) * 100).toFixed(1)} %)`}
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })()}

                  {/* ZEILEN OHNE ZUORDNUNG — NUR wenn ihre Zahl nicht null ist (J13). Sie
                      sind das einzige Signal ueber Messverluste, das der Owner hat
                      (cookie-verweigernder Browser, Export-Download auf fremder Domain,
                      Seite vor der Aktivierung ausgeliefert). Sie wegzulassen hiesse, den
                      Nenner stillschweigend zu beschoenigen.
                      OHNE Lauf-Abgrenzung (9c-2) zaehlen hier AUCH alle Zeilen mit, die vor
                      dem ersten Test entstanden sind — der Text sagt deshalb "ohne
                      Zuordnung" und nicht "Messverlust". */}
                  {variantRows.some((r) => r.count_none > 0) && (
                    <p className="mt-3 text-xs text-gray-500">
                      Ohne Varianten-Zuordnung:{" "}
                      {variantRows.reduce((sum, r) => sum + r.count_none, 0)}{" "}
                      Events.
                    </p>
                  )}
                </>
              )}
            </div>
          )}

          {/* Eigene Domain verbinden (Phase 7 Scheibe 7c-2c): Add-Domain-Formular +
              dynamische DNS-Anweisungen + Status-Refresh. Eigene Komponente statt
              CodeImporter weiter aufzublaehen; projectId gated wie das Publish/CAPI-UI. */}
          <DomainManager projectId={projectId} />
        </div>
      )}

      {/* Weg-C-Netz: verwaiste Verknuepfungen. Eigene, immer sichtbare Sektion
          (nicht im einklappbaren linken Panel, da Orphans GLOBAL sind und kein
          Element-Badge tragen koennen — das Element fehlt ja). Nur bei N>0. */}
      {orphans.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3">
          <h2 className="mb-2 text-sm font-medium text-amber-800">
            ⚠ Verwaiste Verknüpfungen ({orphans.length})
          </h2>
          <p className="mb-3 text-xs text-amber-700">
            Diese Aktionen verweisen auf Elemente, die im Code nicht mehr existieren.
            Lösche sie oder stelle das Element wieder her.
          </p>
          <ul className="flex flex-col gap-2">
            {orphans.map((m) => {
              // Typ-aware Anzeige + KATEGORIE-eingeschraenkte Relink-Ziele: ein
              // text-Orphan listet nur Textkandidaten, ein redirect-/track-Orphan
              // nur interaktive Elemente (Button/Form/Link). Pro Typ die richtige
              // Config lesen (track hat KEINE url -> sonst TS-Fehler).
              const value =
                m.type === "text"
                  ? m.config.content
                  : m.type === "track"
                    ? m.config.event
                    : m.config.url;
              const badgeLabel =
                m.type === "text"
                  ? "✎ Text"
                  : m.type === "track"
                    ? "🎯 Tracking"
                    : "🔗 Weiterleitung";
              const targets = elements.filter((el) =>
                isRelinkTarget(m.type, el.type)
              );
              return (
                // Key auf (elementId, type): eine id kann mehrere verwaiste Slots
                // tragen (redirect + track) -> sonst React-Key-Kollision.
                <li
                  key={`${m.elementId}-${m.type}`}
                  className="flex items-center gap-3 rounded-md border border-amber-200 bg-white px-3 py-2"
                >
                  <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                    {badgeLabel}
                  </span>
                  <span
                    className="min-w-0 flex-1 truncate text-sm text-gray-700"
                    title={value}
                  >
                    {value || "(leer)"}
                  </span>
                  <span className="shrink-0 font-mono text-xs text-gray-400">
                    {m.elementId}
                  </span>
                  {/* Re-Link: nur wenn es ueberhaupt PASSENDE Ziele gibt; sonst
                      bleibt nur Loeschen. Controlled mit value="" -> setzt sich
                      nach der Wahl optisch zurueck, auch wenn der Ueberschreib-
                      Schutz abgebrochen wird. */}
                  {targets.length > 0 && (
                    <select
                      value=""
                      onChange={(e) => {
                        if (e.target.value)
                          handleRelinkOrphan(m.elementId, m.type, e.target.value);
                      }}
                      aria-label="Verknüpfen mit Element"
                      className="shrink-0 rounded-md border border-gray-300 bg-white px-2 py-1.5 text-sm text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="">Verknüpfen mit …</option>
                      {targets.map((el) => (
                        <option key={el.id} value={el.id}>
                          {`<${el.tag}> ${el.label}`}
                        </option>
                      ))}
                    </select>
                  )}
                  <button
                    type="button"
                    onClick={() => handleRemoveOrphan(m.elementId, m.type)}
                    className="shrink-0 rounded-md border border-gray-300 px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-1 focus:ring-red-400"
                  >
                    Löschen
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {/* Bestehende drei Zonen (Editor-Kern) — unveraendert. */}
      <div className="flex w-full flex-col gap-4 lg:flex-row">
      {/* Zone 1 (links): Code-Eingabe (einklappbares Akkordeon) + Zaehler +
          Elementliste. shrink-0, damit bei Platzmangel die Preview schrumpft,
          nicht dieses Panel. Der Zen-Collapse versteckt NUR die Code-Eingabe
          (Textarea + Upload) — Zaehler und Elementliste bleiben IMMER sichtbar,
          denn die Liste ist das Arbeitswerkzeug, nur der Rohcode ist Ablenkung. */}
      <section className="flex w-full shrink-0 flex-col self-start rounded-lg border border-gray-300 bg-white lg:w-80">
        {/* (1) Code-Eingabe-Block. Voller Akkordeon-Trigger klappt NUR diesen
            Block (Textarea + Upload); Zaehler und Elementliste darunter bleiben
            immer sichtbar. Der Inhalt bleibt STETS gemountet (Textarea behaelt
            State + Debounce), wird beim Einklappen nur per display:none
            versteckt. */}
        <div className="border-b border-gray-200">
          <button
            type="button"
            onClick={toggleInputCollapsed}
            aria-expanded={!isInputCollapsed}
            className="flex w-full items-center justify-between gap-2 rounded-t-lg px-3 py-3 text-left text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-blue-500"
          >
            <span className="truncate">
              {isInputCollapsed ? "Code anzeigen/editieren" : "Dein Code"}
            </span>
            <Chevron direction={isInputCollapsed ? "down" : "up"} />
          </button>

          <div className={isInputCollapsed ? "hidden" : "flex flex-col gap-3 px-3 pb-3"}>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onPaste={() => {
              // Paste ist auch ein Import-Versuch -> alte Upload-Meldung clearen.
              setUploadError(null);
              autoCollapseOnImport();
            }}
            placeholder="Füge hier deinen HTML-Code ein – oder nutze den Datei-Upload unten."
            className="h-96 w-full resize-none rounded-lg border border-gray-300 bg-gray-50 p-4 font-mono text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            spellCheck={false}
          />

          {/* Datei-Upload / Drag-Drop: zweiter Import-Weg neben Paste. Klick
              loest das versteckte <input> aus; Drop nimmt nur die ERSTE Datei.
              preventDefault auf dragOver/drop ist Pflicht, sonst oeffnet der
              Browser die Datei selbst. Beide Wege muenden in importFile ->
              setCode (gleicher Pfad wie Paste). */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={(e) => {
              e.preventDefault();
              setIsDragging(false);
            }}
            onDrop={(e) => {
              e.preventDefault();
              setIsDragging(false);
              const file = e.dataTransfer.files?.[0];
              if (file) importFile(file);
            }}
            className={`flex flex-col items-center gap-1 rounded-lg border border-dashed px-3 py-4 text-center text-xs transition-colors ${
              isDragging
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-300 bg-gray-50 text-gray-500"
            }`}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".html,text/html"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) importFile(file);
                // Wert leeren -> dieselbe Datei kann erneut gewaehlt werden und
                // loest wieder onChange aus.
                e.target.value = "";
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="font-medium text-blue-600 hover:text-blue-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              HTML-Datei hochladen
            </button>
            <span>oder hierher ziehen</span>
          </div>
          {uploadError && (
            <p className="text-xs font-medium text-red-600">{uploadError}</p>
          )}
          </div>
        </div>

        {/* (2) Zaehler (Buttons/Forms/Links) — immer sichtbar, unabhaengig vom
            Code-Collapse. */}
        <div className="flex gap-3 border-b border-gray-200 px-3 py-2.5 text-sm text-gray-600">
          <span>🔘 {counts.button} Buttons</span>
          <span>📋 {counts.form} Forms</span>
          <span>🔗 {counts.link} Links</span>
          <span>✎ {counts.text} Texte</span>
        </div>

        {/* (3) Erkannte Elemente — IMMER sichtbar und scrollbar (das
            Arbeitswerkzeug des Marketers; nur der Rohcode oben ist die
            Ablenkung). Stabiler DOM-Knoten: der Collapse haengt ihn nie ab ->
            Scroll-Position und Hoehe springen beim Auf-/Zuklappen nicht. */}
        <div className="p-3">
          <h2 className="mb-2 text-sm font-medium text-gray-700">
            Erkannte Elemente ({elements.length})
          </h2>

          {/* Kategorie-Filter-PILLEN (Steuerung, klar klickbares Idiom — abgesetzt
              von der ruhigen Zaehler-Textzeile oben). Filtert NUR die Liste, nie die
              Auswahl oder die Orphan-Sektion. */}
          <div className="mb-2 flex gap-1.5">
            {(
              [
                { key: "all", label: "Alle", count: elements.length },
                { key: "interactive", label: "Interaktiv", count: interactiveCount },
                { key: "text", label: "Texte", count: counts.text },
              ] as const
            ).map((p) => (
              <button
                key={p.key}
                type="button"
                onClick={() => setActiveFilter(p.key)}
                aria-pressed={activeFilter === p.key}
                className={`rounded-full border px-2.5 py-1 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-blue-500 ${
                  activeFilter === p.key
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p.label} ({p.count})
              </button>
            ))}
          </div>

          <div className="flex max-h-48 flex-col gap-2 overflow-y-auto">
            {elements.length === 0 ? (
              <p className="text-sm text-gray-400">
                Noch nichts erkannt – füge oben Code ein.
              </p>
            ) : visibleElements.length === 0 ? (
              <p className="text-sm text-gray-400">
                Keine Elemente in dieser Kategorie.
              </p>
            ) : null}
            {visibleElements.map((el) => {
                const isSelected = el.id === selectedElementId;
                const mappedTypes = mappingTypesById.get(el.id);
                return (
                  // text-left + w-full neutralisieren das Button-Default (zentrierter
                  // Text); bg/Font kommen unveraendert aus typeStyles wie in Phase 1.
                  <button
                    key={el.id}
                    type="button"
                    ref={isSelected ? activeItemRef : null}
                    onClick={() => setSelectedElementId(el.id)}
                    className={`flex w-full cursor-pointer items-center gap-2 rounded-md border px-3 py-2 text-left text-sm focus:outline-none ${typeStyles[el.type]} ${
                      isSelected ? "ring-2 ring-inset ring-blue-500" : ""
                    }`}
                  >
                    <span className="rounded bg-white/60 px-1.5 py-0.5 font-mono text-xs">
                      &lt;{el.tag}&gt;
                    </span>
                    <span className="truncate">
                      {displayTextFor(el, mappings)}
                    </span>
                    {/* Verdrahtetes Element: dezente Badges, EIN Icon je Aktionstyp
                        (🔗 Redirect / 🎯 Track / ✎ Text). Mehr-Aktion-Element traegt
                        mehrere; feste ACTION_BADGE_ORDER -> deterministische Reihen-
                        folge (kein Set-Iterations-Flackern). title je Typ -> testbar. */}
                    {mappedTypes && (
                      <span className="ml-auto flex shrink-0 items-center gap-1">
                        {ACTION_BADGE_ORDER.filter((t) => mappedTypes.has(t)).map(
                          (t) => (
                            <span
                              key={t}
                              className="rounded-full bg-white/70 px-1.5 py-0.5 text-xs"
                              title={`Verknüpft: ${t}`}
                            >
                              {ACTION_ICON[t]}
                            </span>
                          )
                        )}
                      </span>
                    )}
                  </button>
                );
              })}
          </div>
        </div>
      </section>

      {/* Zone 2 (Mitte): Live-Preview. min-w-0 + flex-1 = nimmt die freie Breite
          und schrumpft zuerst. Das iframe bleibt an stabiler Baumposition,
          damit Ein-/Ausklappen es nicht neu mountet (kein srcDoc-Reload). */}
      <section className="flex min-w-0 flex-1 flex-col rounded-lg border border-gray-300 bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-gray-200 px-4 py-3">
          <div className="flex items-center gap-3">
            <h2 className="text-sm font-medium text-gray-700">
              Live-Preview (sandboxed)
            </h2>
            {/* Modus-Umschalter: Editieren (selektions-only Bruecke) vs.
                Vorschau (verdrahtetes HTML, Klick feuert echt). Segmentierter
                Zwei-Knopf-Schalter. */}
            <div className="flex rounded-md border border-gray-300 p-0.5 text-xs font-medium">
              <button
                type="button"
                onClick={() => setPreviewMode("edit")}
                aria-pressed={previewMode === "edit"}
                className={`rounded px-2.5 py-1 focus:outline-none ${
                  previewMode === "edit"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Editieren
              </button>
              <button
                type="button"
                onClick={() => setPreviewMode("functional")}
                aria-pressed={previewMode === "functional"}
                className={`rounded px-2.5 py-1 focus:outline-none ${
                  previewMode === "functional"
                    ? "bg-blue-600 text-white"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                Vorschau
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {saveStatus === "error" && saveError && (
              <span className="truncate text-xs text-red-600" title={saveError}>
                {saveError}
              </span>
            )}
            {/* Laute Dirty-Anzeige: dieselbe dirty-Quelle wie der kleine Punkt am
                Projektnamen, hier aber gross neben dem Button. Nur im Ruhezustand
                (idle) zeigen — waehrend Speichern/Erfolg sprechen die Button-Texte
                selbst, danach faellt dirty automatisch zurueck. */}
            {dirty && saveStatus !== "saving" && saveStatus !== "saved" && (
              <span className="text-xs font-medium text-amber-600">
                Ungespeicherte Änderungen
              </span>
            )}
            <button
              type="button"
              onClick={handleSave}
              disabled={saveStatus === "saving" || code.trim() === ""}
              className={`rounded-md px-3 py-1.5 text-sm font-medium text-white focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 ${
                // Dirty + ruhend -> auffaelliges Amber, sonst neutrales Blau.
                dirty && saveStatus !== "saving" && saveStatus !== "saved"
                  ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-500"
                  : "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500"
              }`}
            >
              {saveStatus === "saving"
                ? "Speichern…"
                : saveStatus === "saved"
                  ? "Gespeichert ✓"
                  : saveStatus === "error"
                    ? "Erneut versuchen"
                    : dirty
                      ? "Speichern •"
                      : "Speichern"}
            </button>
          </div>
        </div>
        <div className="flex flex-1 flex-col p-3">
          {/* Das Edit-iframe ist IMMER gemountet (stabiler key, ref/Bruecke) und
              wird nur per echtem display:none (Tailwind "hidden") versteckt, wenn
              die funktionale Vorschau aktiv ist -> es mountet GENAU EINMAL und
              remountet NIE (Bruecke/READY/Selektion/Highlighting unangetastet).
              Display-Toggle laedt das iframe nicht neu, der Inhalt bleibt. */}
          <iframe
            key="ps-edit"
            ref={iframeRef}
            title="preview"
            srcDoc={editHtml}
            // allow-scripts aktiviert das injizierte Listener-Script. NIEMALS
            // allow-same-origin dazu – die Kombination bricht den Fremdcode aus
            // der Sandbox aus.
            sandbox="allow-scripts"
            className={`h-full min-h-[32rem] w-full flex-1 rounded-lg border border-gray-300 bg-white ${
              previewMode === "edit" ? "" : "hidden"
            }`}
          />
          {/* Funktionales iframe: NUR im Vorschau-Modus gerendert -> es mountet
              FRISCH mit bereits gefuelltem srcDoc und korrekten Popup-Rechten.
              Zwei Gruende, warum frisch-mit-Inhalt statt dauerhaft-gemountet:
              (1) der Browser friert die Sandbox-Rechte beim Mount ein -> nur ein
              frischer Mount traegt "allow-popups …" ab Start, window.open oeffnet
              dann einen ECHTEN Top-Level-Tab; (2) ein iframe, dessen srcDoc von ""
              auf Inhalt wechselt WAEHREND es display:none ist, malt im Browser
              nicht zuverlaessig neu -> leeres Feld. Frisch-mit-Inhalt umgeht beides.
              KEIN iframeRef/Bruecke (das HTML traegt nur das mode:"preview"-Wiring).
              allow-same-origin bleibt AUS (die Grenze, die zaehlt) — escape-sandbox
              betrifft NUR die Popups, nicht den Zugriff aufs Eltern-Origin. Im
              Edit-Modus ist das iframe gar nicht im DOM -> kein Hintergrund-Wiring,
              keine laufenden User-Scripts, kein window.open. Der zweite, dauerhaft
              gemountete Knoten (Edit) garantiert, dass das Edit-iframe davon
              UNBERUEHRT bleibt und nie remountet. functionalHtml steht im selben
              Render bereit (useMemo aus previewMode+debouncedCode+mappings). */}
          {previewMode === "functional" && (
            <iframe
              key="ps-functional"
              title="functional-preview"
              srcDoc={functionalHtml}
              sandbox="allow-scripts allow-popups allow-popups-to-escape-sandbox"
              className="h-full min-h-[32rem] w-full flex-1 rounded-lg border border-gray-300 bg-white"
            />
          )}
          {previewMode === "functional" && (
            <p className="mt-2 text-xs text-gray-400">
              Vorschau öffnet Weiterleitungen immer in neuem Tab; im Export gilt
              deine Einstellung (selber/neuer Tab).
            </p>
          )}
        </div>
      </section>

      {/* Zone 3 (rechts): Action-Panel. CodeImporter bleibt State-Besitzer und
          reicht Element + dessen Mapping + die Zuweisungs-Callbacks durch. */}
      <ActionPanel
        selectedElement={selectedElement}
        mappings={mappings}
        onSaveRedirect={handleAssignMapping}
        onSaveTrack={handleAssignTrack}
        onSaveText={handleAssignTextMapping}
        onRemove={handleRemoveMapping}
      />
      </div>
    </div>
  );
}

// Relative Zeitangabe fuer die Projektliste. Wird nur im geoeffneten Menue
// (clientseitig) gerendert, daher ist Date.now() hier unkritisch fuer Hydration.
function formatRelative(iso: string): string {
  const diffSec = Math.round((Date.now() - new Date(iso).getTime()) / 1000);
  if (diffSec < 60) return "gerade eben";
  const min = Math.round(diffSec / 60);
  if (min < 60) return `vor ${min} Min`;
  const hr = Math.round(min / 60);
  if (hr < 24) return `vor ${hr} Std`;
  const d = Math.round(hr / 24);
  return `vor ${d} Tg`;
}

function Chevron({
  direction,
}: {
  direction: "left" | "right" | "up" | "down";
}) {
  const points = {
    left: "10 3 5 8 10 13",
    right: "6 3 11 8 6 13",
    up: "3 10 8 5 13 10",
    down: "3 6 8 11 13 6",
  }[direction];
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points={points} />
    </svg>
  );
}
