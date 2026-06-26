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
  deleteProject,
  listProjects,
  loadProject,
  renameProject,
  saveProject,
  type ProjectListItem,
} from "@/app/projects/actions";
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
} from "@/lib/mappings";
import { editPreviewHtml, generateFunctional } from "@/lib/generate";
import { exportFilename } from "@/lib/export";
import { validateUploadFile } from "@/lib/upload";
import ActionPanel from "@/components/ActionPanel";

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
        ? generateFunctional(debouncedCode, mappings, "preview")
        : "",
    [previewMode, debouncedCode, mappings]
  );

  // Edit-iframe-srcdoc IMPERATIV setzen — bewusst NICHT als reaktives srcDoc-Prop.
  // Es wird NUR bei einem CODE-Wechsel (previewHtml) neu geschrieben, NICHT bei
  // Mapping-Aenderungen. Damit loest ein Text-Override KEINEN Reload aus (er wird
  // live per PS_SET_TEXT ins stehende Dokument gepatcht, siehe Handler unten).
  // Bei einem echten Code-Reload werden die AKTUELLEN Overrides via editPreviewHtml
  // ("edit"-Bake) eingebacken -> flackerfrei sichtbar, kein Desync zum Live-Patch.
  // Lint-sauber: DOM-Seiteneffekt gehoert in einen Effekt (nicht in ein Memo); die
  // Ref wird NUR im Effekt gelesen/geschrieben; vollstaendige Deps. Das
  // previewHtml-Gate verhindert einen DOM-Write (und damit Reload-Loop) bei jedem
  // Render bzw. bei reinen Mapping-Aenderungen.
  const prevBakedPreviewRef = useRef<string | null>(null);
  useEffect(() => {
    if (previewHtml === prevBakedPreviewRef.current) return;
    prevBakedPreviewRef.current = previewHtml;
    const frame = iframeRef.current;
    if (frame) frame.srcdoc = editPreviewHtml(previewHtml, mappings);
  }, [previewHtml, mappings]);

  // Ausgewaehltes Element abgeleitet: faellt automatisch auf null zurueck, wenn
  // die ID nach einer Code-Aenderung nicht mehr existiert.
  const selectedElement = useMemo(
    () => elements.find((e) => e.id === selectedElementId) ?? null,
    [elements, selectedElementId]
  );

  // Mapping des ausgewaehlten Elements (Schluessel elementId, ein Mapping pro
  // Element) fuers Action-Panel.
  const selectedMapping = useMemo(
    () => (selectedElementId ? findMapping(mappings, selectedElementId) : null),
    [mappings, selectedElementId]
  );

  // ps-ID -> Mapping-Typ fuer die "verknuepft"-Badges in der Erkannte-Elemente-
  // Liste (verdrahtete Elemente auf einen Blick, Icon je Typ: 🔗 Redirect / ✎ Text).
  const mappingTypeById = useMemo(() => {
    const m = new Map<string, Mapping["type"]>();
    for (const x of mappings) m.set(x.elementId, x.type);
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
  // Orphans NUR berechnen, wenn die Detektion den aktuellen Code widerspiegelt
  // (sonst null = "noch nicht stabil"). Reiner Flash-Guard wie oben beschrieben.
  const computedOrphans = useMemo(
    () =>
      elementsReflectCurrentCode
        ? findOrphans(
            mappings,
            elements.map((e) => e.id)
          )
        : null,
    [elementsReflectCurrentCode, mappings, elements]
  );
  // Letzte STABILE Menge in State halten. Waehrend der Re-Detektion nach
  // "Uebernehmen" ist computedOrphans null -> dann die letzte stabile Menge
  // weiterzeigen statt [] (die gelbe Box klappt nicht weg, die drei Spalten
  // springen nicht). Sobald wieder stabil gewinnt computedOrphans SOFORT (kein Lag,
  // kein veraltetes Einfrieren). Fortschreiben per setState WAEHREND DES RENDERS
  // (Reacts dokumentiertes "store info from previous renders"-Muster, NICHT im
  // Effekt): terminiert, weil computedOrphans eine stabile useMemo-Referenz ist
  // (nach dem Setzen gilt computedOrphans === stableOrphans -> kein erneutes set).
  const [stableOrphans, setStableOrphans] = useState<Mapping[]>([]);
  if (computedOrphans !== null && computedOrphans !== stableOrphans) {
    setStableOrphans(computedOrphans);
  }
  const orphans = computedOrphans ?? stableOrphans;

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

  // Copy-Feedback ("Kopiert ✓" / Fehler) nach kurzer Zeit zuruecksetzen.
  useEffect(() => {
    if (copyStatus === "idle") return;
    const id = setTimeout(() => setCopyStatus("idle"), 2500);
    return () => clearTimeout(id);
  }, [copyStatus]);

  // Ungespeicherte Aenderungen seit dem letzten Speichern/Laden. Schuetzt das
  // Wechseln/Neu-Anlegen vor stillem Verlust. Umfasst CODE UND MAPPINGS:
  // Mapping-Aenderungen veraendern den Code nicht, wuerden sonst still verloren
  // gehen. mappingsEqual vergleicht mengenbasiert (Umsortieren != dirty).
  const dirty =
    code !== savedCode || !mappingsEqual(mappings, savedMappings);

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
  // Name des aktiven Projekts fuer die Toolbar. Neues (ungespeichertes) Projekt
  // -> "Unbenanntes Projekt" (entspricht dem spaeteren DB-Default).
  const activeName =
    projects.find((p) => p.id === projectId)?.name ?? "Unbenanntes Projekt";

  // Setzt den Editor auf den leeren "Unbenanntes Projekt"-Zustand zurueck (keine
  // DB-Zeile, keine tote projectId).
  function resetToEmpty() {
    setProjectId(null);
    setCode("");
    setSavedCode("");
    setMappings([]);
    setSavedMappings([]);
    setSelectedElementId(null);
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
    const result = await saveProject(projectId, stabilized, mappings);
    if (result.ok) {
      setCode(stabilized);
      setSavedCode(stabilized);
      setSavedMappings(mappings);
      setProjectId(result.id);
      setProjects(await listProjects());
      setSaveStatus("saved");
    } else {
      setSaveError(result.error);
      setSaveStatus("error");
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
  function buildExportDocument(): string {
    return generateFunctional(debouncedCode, mappings, "export");
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

  // Text live ins STEHENDE Edit-iframe patchen (kein Reload), via Selektions-
  // Bruecke. Reine Anzeige; Mapping/Code/Dirty unberuehrt. Quelle: das eine
  // gemountete Edit-iframe (iframeRef).
  function pushTextToPreview(elementId: string, content: string) {
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
    // Live patchen statt Reload -> kein Scroll-Sprung, kein Flackern.
    pushTextToPreview(canonicalId, config.content);
  }

  // Aktion entfernen. Der Code (samt ps-ID) bleibt unangetastet; nur das Mapping
  // verschwindet. War es ein TEXT-Override -> den Originaltext (element.text) live
  // ins stehende iframe zuruecksetzen, sonst zeigt es weiter den Override.
  function handleRemoveMapping() {
    if (!selectedElementId) return;
    const removed = findMapping(mappings, selectedElementId);
    setMappings((prev) => removeMapping(prev, selectedElementId));
    if (removed?.type === "text") {
      pushTextToPreview(selectedElementId, selectedElement?.text ?? "");
    }
  }

  // Verwaistes Mapping loeschen. Destruktiv (die gespeicherte URL geht verloren)
  // -> Bestaetigung. Mutiert NUR den State (-> dirty); persistiert wird erst ueber
  // den grossen "Speichern"-Button, kein Auto-Save. Reines Erkennen aendert die
  // Mappings NICHT; Loeschen ist die einzige Mutation. Re-Link ist bewusst NICHT
  // Teil dieser Scheibe (kein automatisches Reparieren/Neu-Verknuepfen).
  function handleRemoveOrphan(elementId: string) {
    if (
      !window.confirm(
        "Verwaiste Verknüpfung löschen? Die gespeicherte Konfiguration geht verloren."
      )
    )
      return;
    setMappings((prev) => removeMapping(prev, elementId));
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
  function handleRelinkOrphan(orphanElementId: string, targetElementId: string) {
    const orphan = findMapping(mappings, orphanElementId);
    if (!orphan) return;
    if (
      findMapping(mappings, targetElementId) &&
      !window.confirm("Dieses Element hat bereits eine Aktion — ersetzen?")
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
        : { elementId: canonicalId, type: "redirect", config: orphan.config };
    setMappings((prev) =>
      upsertMapping(removeMapping(prev, orphanElementId), relinked)
    );
    // Relink eines TEXT-Orphans erzeugt ein PRAESENTES Text-Mapping -> live ins
    // stehende iframe patchen, sonst divergiert es von Liste/Header (editHtml
    // reagiert bewusst nicht mehr auf mappings).
    if (relinked.type === "text") {
      pushTextToPreview(canonicalId, relinked.config.content);
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
    const proj = await loadProject(id);
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

    const result = await deleteProject(id);
    if (!result.ok) {
      setSaveError(result.error);
      setSaveStatus("error");
      return;
    }

    const remaining = await listProjects();
    setProjects(remaining);

    if (id === projectId) {
      // remaining ist nach updated_at desc sortiert -> [0] ist das zuletzt
      // bearbeitete verbleibende Projekt.
      const next = remaining[0] ? await loadProject(remaining[0].id) : null;
      if (next) {
        setProjectId(next.id);
        setCode(next.html);
        setSavedCode(next.html);
        setMappings(next.mappings);
        setSavedMappings(next.mappings);
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
    const result = await renameProject(id, name);
    if (!result.ok) {
      setSaveError(result.error);
      setSaveStatus("error");
      return;
    }
    setProjects(await listProjects());
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
            In Zwischenablage kopieren
          </button>
          <button
            type="button"
            onClick={handleExportDownload}
            disabled={code.trim() === ""}
            className="rounded-md bg-blue-600 px-4 py-1.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Projekt exportieren
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
              // text-Orphan listet nur Textkandidaten, ein redirect-Orphan nur
              // interaktive Elemente (Button/Form/Link).
              const isText = m.type === "text";
              const value = isText ? m.config.content : m.config.url;
              const targets = elements.filter((el) =>
                isRelinkTarget(m.type, el.type)
              );
              return (
                <li
                  key={m.elementId}
                  className="flex items-center gap-3 rounded-md border border-amber-200 bg-white px-3 py-2"
                >
                  <span className="shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-xs font-medium text-amber-800">
                    {isText ? "✎ Text" : "🔗 Weiterleitung"}
                  </span>
                  <span
                    className="min-w-0 flex-1 truncate text-sm text-gray-700"
                    title={value}
                  >
                    {value || "(leerer Text)"}
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
                          handleRelinkOrphan(m.elementId, e.target.value);
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
                    onClick={() => handleRemoveOrphan(m.elementId)}
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
                const mappedType = mappingTypeById.get(el.id);
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
                    {/* Verdrahtetes Element: dezentes Badge, Icon je Mapping-Typ
                        (🔗 Redirect / ✎ Text), damit man verknuepfte Elemente auf
                        einen Blick sieht. */}
                    {mappedType && (
                      <span
                        className="ml-auto shrink-0 rounded-full bg-white/70 px-1.5 py-0.5 text-xs"
                        title="Aktion verknüpft"
                      >
                        {mappedType === "text" ? "✎" : "🔗"}
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
              srcdoc wird IMPERATIV per Effekt gesetzt (nur bei Code-Wechsel, siehe
              oben) -> KEIN reaktives srcDoc-Prop, damit ein Text-Override keinen
              Reload ausloest (Live-Patch via PS_SET_TEXT). */}
          <iframe
            key="ps-edit"
            ref={iframeRef}
            title="preview"
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
        mapping={selectedMapping}
        onSaveMapping={handleAssignMapping}
        onSaveTextMapping={handleAssignTextMapping}
        onRemoveMapping={handleRemoveMapping}
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
