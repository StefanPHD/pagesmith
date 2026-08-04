## Phase 8 — Analytics & ROI-Ökosystem (Vision, NACH Phase 7)
Owner-Direktive: Pagesmith wird hybrides Server-Side-Marketing-/Analytics-Ökosystem.
Client erfasst Interaktion -> First-Party-Hit an unsere Hosting-Infra -> Server
verarbeitet (adblocker-resistent). Umfang je EIGENE Scheiben (nicht ein Block):

1. Kunden-Tracking/Traffic-Gesundheit: PageViews, Uniques, Verweildauer, Scrolltiefe
   (25/50/75/100), Klicks/Conversion-Rate, Form Start vs Submit, Video-Watchtime
   (HTML5/YouTube/Vimeo), Bot-/Fraud-Quote (serverseitige Filterung), Core Web Vitals
   + 404/500-Alarme auf Kundenseiten.
2. ROI/Attribution/Finanz — SCHEMA-VORBEREITUNG jetzt, BAU erst bei realer Ad-Spend-API
   (2+ Fälle, nicht vorab abstrahieren): Ad-Spend-Match (Meta/Google) -> ROAS, POAS
   (Produktmargen), CPA/CPL, Multi-Touch (First-/Last-Click). KISS-Dashboard im Backend
   + vollständiger Export als CSV UND Excel.
3. Betreiber-Metriken: aggregierte Best-Performer-Layouts (anonymisiert, KI-Training),
   Traffic-Zählung pro Projekt (datenbasiertes Rate-Limiting, SaaS-Tarifgrenzen,
   In-App-Upgrade-Meldungen).

VOR DEM BAU ZU KLÄREN (Bedrohungs-/Rechtsmodell):
- "Hybrid" ehrlich: Scrolltiefe/Verweildauer/Video/Vitals sind CLIENT-erfasst (der
  Server sieht kein Scrollen). ALLES Besucher-Tracking hängt hinter demselben
  psConsent() wie das Pixel (DACH) — sonst reißen wir das 1b-Loch wieder auf.
- ZWEI-EBENEN-DSGVO-TRENNUNG: Kunden-Ebene (im Auftrag des Marketers, consent-gated,
  ggf. gehashte Kennungen für Uniques) vs. Betreiber-Ebene (STRIKT anonym: nur
  Event-Typ, Projekt-ID, Zeitstempel — NIE IP/PII der Endbesucher). "Uniques
  serverseitig ohne PII" ist ein zu lösender Widerspruch, keine Selbstverständlichkeit.
- Datenvolumen unter Ad-Traffic: Aggregations-/Retention-Strategie ist Design-Frage der
  ersten Scheibe, kein Nachtrag (eine Event-Tabelle wächst unter Ad-Spend schnell).

ADBLOCKER-VERLUSTRATE — Ziel JA, Methodik BEWUSST festgelegt (nicht die naive Variante):
- NICHT über einen synthetischen blockbaren Test-Hit messen. Gründe: (a) ein absichtlich
  blockbarer Third-Party-Request an facebook/doubleclick erzeugt genau das
  Consent-/DSGVO-Problem, dessen Vermeidung unser Verkaufsargument ist; (b) "Hit fehlt"
  != "geblockt" (Timing/Abbruch/Navigation verzerren); (c) es misst ein Test-Pixel,
  nicht echte Conversions.
- STATTDESSEN: über den geteilte-eventID-Vergleich ECHTER Events. In der Hybrid-CAPI
  sehen wir beide Ströme; zähle Events, die NUR server-seitig ankamen (Beacon da,
  Browser-Pixel-Bestätigung fehlt) gegen die, die BEIDE Wege nahmen. Differenz =
  "gerettete" Quote, gemessen an echten Conversions, ohne zusätzlichen blockbaren
  Request, ohne neues Consent-Problem. Story: "X% deiner echten Conversions wären ohne
  uns bei Meta nie angekommen."
- Voraussetzung: der Server muss die Browser-Pixel-Bestätigung SEHEN (heute geht das
  Pixel direkt an Meta). Das ist Phase-8-Persistenz-Logik, KEINE 7b-Sache. KEIN Cheerio.

ARCHITEKTUR-NAHT (in 7b gelegt, Form statt Maschinerie): neutraler First-Party-
Ingest-Endpoint /api/e als EIN Trichter für alle Events gehosteter Seiten. Heute nur
Meta-CAPI-Forward; Phase-8-Persistenz (Dashboard, Betreiber-Metriken, Verlustraten-
Vergleich) hängt sich später ADDITIV in denselben Trichter. Keine weitere Vorab-Abstraktion.

## Phase 18 — AI-Native: Pagesmith MCP-Server (Vision, NACH Go-Live)
Ziel: Pagesmith als natives Tool in KI-Umgebungen der Marketer (Claude Desktop, Cursor,
Windsurf) via eigenem MCP-Server (Model Context Protocol, JSON-RPC-Endpunkt z.B. /api/mcp).
Marketer generiert im Profil einen Pagesmith-MCP-Key; seine KI kann dann Projekte anlegen,
Tracking-Status abfragen, Meta-Tokens aktualisieren etc. Verwandelt Pagesmith von
Web-App zu KI-Infrastruktur — potenzielles Alleinstellungsmerkmal.

TIMING (Stand 2026-08-03): Phase 18, bewusst ans ENDE der Roadmap gestellt. Grund, wie
in der Root-CLAUDE.md: MCP dreht das Sicherheitsmodell um — Lesen UND Schreiben mit
voller Owner-Autorität über einen langlebigen Key in fremder KI-Umgebung. Es braucht
eine eigene Autorisierungsschicht, KEINEN angehängten Endpunkt.
ÜBERHOLT, als Zeitdokument festgehalten: Die frühere Fassung band MCP an "NACH Phase 7
(Hosting/Go-Live)" und begründete das mit der fehlenden Nutzerbasis vor Go-Live. Phase 7
ist abgeschlossen — die Bindung ordnet nichts mehr —, und die Position trägt heute nicht
mehr das Nutzerbasis-, sondern das Sicherheitsargument.

VOR DEM BAU ZU KLÄREN (Bedrohungsmodell — eigene Phase, KEIN Endpunkt-Anhängsel):
MCP dreht das bisherige Sicherheitsmodell um. Bisher: Owner schreibt nur eingeloggt
(Session+RLS); der einzige anonyme Pfad (/api/capi) ist bewusst write-only, capability-
gated, ohne Datenrückgabe. MCP dagegen = LESEN UND SCHREIBEN mit voller Owner-Autorität,
ausgelöst von einem langlebigen API-Key in der KI-Umgebung eines Dritten. Konsequenzen:
- Der MCP-Key ist mächtiger als alles bisher Ausgegebene (kann alles, was der Owner kann,
  inkl. Meta-Token-Update). Geleakter Key = Vollzugriff + fremde Ad-Account-Umleitung.
  Blast-Radius größer als service_role, weil ABSICHTLICH nach außen gegeben.
- Umgeht RLS-Session-Bindung -> Autorisierung MUSS komplett in die App-Schicht, PRO
  MCP-Aufruf (Key -> User auflösen -> Ownership prüfen -> erst dann handeln). Die
  "heiligstes Gate"-Situation aus 2a, aber für JEDE Methode. Eine vergessene Prüfung =
  IDOR über die ganze Plattform.
- Echter Scope (nicht "ein Endpunkt"): MCP-Protokoll korrekt (Tool-Discovery/Schemas/
  Fehler-Semantik), Key-Gen/-Rotation/-Widerruf-UI + sicherer Storage, Rate-Limiting
  (KI-Agent in Schleife), Audit-Logging (fremd-gesteuerte Schreibzugriffe), pro-Key-
  Scoping (read-only vs. token-write). Eigene Phase auf Augenhöhe mit Phase 6.
Merksatz: Die bestehende Server-Logik geht von einer Owner-Session aus; MCP hat keine.
NICHT "direkt ansprechen" — eine neue Autorisierungsschicht DAVOR bauen.

## Zukunftsrichtung: Funnel-Architektur (bewusst vertagt, NICHT jetzt bauen)
Festgehaltene Richtung, kein Auftrag. Dient als Bauplan-Anker, damit heutige
Entscheidungen sie nicht versperren. Wird NICHT im laufenden Schritt angefasst.

### Vision
Ein Projekt kann perspektivisch ein mehrstufiger Funnel sein (z.B. Landingpage ->
Checkout-Seite -> Dankeseite), alle Seiten im selben Branding, komplett in
Pagesmith gebaut. Marketer denken in Funnels, nicht in Einzelseiten — die
Plattform soll dieser Denkweise folgen.

### Zwei UNTERSCHIEDLICHE Fähigkeiten (nicht vermischen)
Diese zwei Achsen sind getrennte Baustellen und dürfen nicht in einen Topf:

(1) Mehrseitige Projekte + interne Navigation ("Button -> nächster Funnelschritt").
    Neuer Aktionstyp, z.B. { type: "funnel_step", config: { targetPageId } }.
    Das bestehende erweiterbare Mapping-Modell (type-Diskriminator aus dem
    Redirect-Schritt) deckt das bereits ab -> KEIN Modell-Umbau für die Aktion
    nötig, nur ein neuer Union-Zweig.

(2) Formular- / Schnittstellen-Anbindung (eigene Baustelle, NICHT mit Navigation
    vermischen). Beispiele und ihre unterschiedliche Schwere:
    - DOI-/Freebie-Formular an E-Mail-Anbieter posten -> Formular-Handling, nahe
      am künftigen Webhook-Primitiv (POST bei Submit).
    - Zahlungsanbieter Digistore24 / Copecart (Lieferung digitaler Produkte):
      a) Einfacher Link zum externen Bestellformular -> HEUTE SCHON via
         type:"redirect" abgedeckt.
      b) Eingebettetes Bestellformular (InCart-Widgets / embedded Checkout) ->
         Einbettung von Drittanbieter-Code/Skripten in die Seite. Eigene
         Baustelle, später.
      c) Zahlungsbestätigungs-Webhooks (Anbieter ruft UNS bei erfolgter Zahlung)
         -> EINGEHENDES Server-zu-Server-Handling, braucht einen empfangenden
         Endpunkt (nicht nur sendend bei Klick). Technisch anspruchsvollster Teil,
         hängt eng an Hosting (Phase 6) -> ohne ausgelieferte Seite mit
         Server-Komponente kein Webhook-Empfänger.

### Strukturelle Konsequenz
Heute gilt "Projekt = 1 Seite" (html + mappings direkt auf der Projektzeile).
Funnel bräuchte "Projekt = N Seiten" (Seiten als eigene Einheit mit je
html+mappings). Das ist derselbe begrenzte Umbau-Typ wie 3.3 (Multi-Projekt), nur
eine Ebene tiefer -> Bauplan ist vorhanden, machbar, aber NICHT jetzt.

### Timing-Begründung (Lean)
Abstraktion erst bei 2 echten Fällen. Erst muss die Einzelseite end-to-end durch
die gesamte Pipeline (bis Hosting, Phase 6) bewiesen sein, dann die Funnel-/
Mehrseiten-Ebene obendrauf. Vorher = Vorbauen ins Blaue.

### Fußnote fürs Weg-C-Netz
Das Orphan-Konzept (verwaiste Mappings) bekommt später eine Variante "Ziel-Seite
gelöscht" (verwaister funnel_step). Gleiche Idee, nur erweitert.

Siehe auch: "Strategischer Ausblick: Projekttyp Business-Website" weiter unten —
verfeinert die Weg-A/Weg-B-Frage für Mehrseiten-Projekte. Der Funnel-Typ behält
BEIDE Wege, wie hier ursprünglich gedacht.

## Zukunfts-Vision UX & In-Place Editing (jetzt terminiert: Phase 4.5 + Phase 5)
Diese Vision ist inzwischen in der Roadmap terminiert: Zen-Modus als Phase 4.5,
In-Place Copywriting als Phase 5. Der folgende Block bleibt die ausführliche
Quelle (Architektur-Parallele + OFFENE Designfragen) — die Roadmap oben verweist
hierher, statt zu duplizieren. Reihenfolge im Bau: erst Phase 4.5, dann Phase 5.

### 1) Zen-Modus (Code-Feld einklappen)
- Nach erfolgreichem Import startet die linke Code-Spalte standardmäßig
  EINGEKLAPPT (kollabierbares Panel; der bereits vorhandene Collapse-Pfeil wird
  genutzt). Der Marketer braucht Fokus auf Vorschau + Dashboard, nicht aufs
  Code-Feld. Jederzeit wieder aufklappbar.
- Architektur-Leitplanke: das ist REINER lokaler UI-View-State, KEIN Daten-/
  Mapping-Zustand. Gehört NICHT in DB oder Mapping-Modell und berührt das
  dirty-Tracking NICHT.

### 2) In-Place Copywriting (Text-/Headline-Editor) — zweiter Modus neben Link-Mapping
- Liest Fließtexte (<p>) und Überschriften (<h1>..<h6>) aus, listet sie im
  Dashboard; der Marketer überschreibt Texte direkt (schnelle A/B-Tests am
  Wording).
- Architektur-Parallele (Stärke des bestehenden Designs explizit festgehalten):
  ein Text-Override ist nur ein NEUER Mapping-Typ
  { elementId, type: "text", config: { content } }. Nutzt dieselbe
  ID-Verankerung (anchorMappingTarget), dasselbe Weg-C-Orphan-Netz (gelöschtes
  Element -> verwaiste Verknüpfung, unverändert), denselben JSON-Datenblock und
  dieselbe generateFunctional-Engine mit einem zusätzlichen Handler. Bestätigt:
  das type-diskriminierte Mapping-Modell war die richtige Wahl.
- BEWUSST OFFENE DESIGNFRAGEN (als offen dokumentiert, NICHT jetzt entscheiden —
  Klärung erst im Bau-Slice):
  a) Textdetektion ist nicht trivial: verschachtelte Kinder
     (<p>...<strong>...</p>). Ein textContent-Überschreiben würde das Kind-Markup
     zerstören. Zu klären: nur Elemente OHNE Kind-Elemente anbieten? Rich-Text?
     Erstmal nur "reine" Textknoten?
  b) Vorschau vs. Export getrennt (gleiche Lektion wie beim Redirect, eine Ebene
     höher): Die Vorschau kann Text per JS injizieren (live). Der Export sollte
     den Text vermutlich DIREKT in den DOM backen (das <h1> enthält im Export
     schon den neuen Text) statt Laufzeit-JS -> besser für SEO, kein FOUC/
     Flackern, funktioniert ohne JS. Beim Link ist Laufzeit-JS zwingend
     (Klick = Laufzeit), bei Text nicht. Finale Entscheidung im Bau-Slice.
- Lean-Timing: erst NACH dem HTML-Export-Feature angehen; nicht vorziehen.

## Advanced Features (nach Phase 3, Vorausblick)
- DSGVO/Cookie-Consent-Gate: Checkbox im Action-Panel "Erst feuern nach Consent".
  Aktionen (v.a. Tracking-Events) werden erst nach erteiltem Consent ausgelöst.
  Kompatibel zu gängigen Cookie-Bannern (Cookiebot, Usercentrics).
- Dynamic Text Replacement (DTR): Scanner erkennt zusätzlich Überschriften
  (H1, H2). Der Marketer weist ihnen Parameter zu, sodass sich Texte per
  URL-Parameter austauschen (z.B. ?zielgruppe=Handwerker ersetzt den H1-Text).
  Hinweis: Heading-Erkennung kann den bestehenden Scanner früh erweitern.

### Optionale Module, Post-7c-2 (UNVERBINDLICH — Richtungsgeber, KEINE committete Roadmap)
Die folgenden Sektionen sind UNVERBINDLICHE "Optionale Module, Post-7c-2" —
Richtungsgeber, KEINE committete Roadmap, KEIN Statuswechsel, KEINE Scope-Erweiterung
von 7c-2. Sie ändern an der laufenden Arbeit (7c-2a) NICHTS. Jedes Modul wird bei echter
Umsetzung eine eigene beweisbare Slice mit eigenem Konzept.

NAHT-HYGIENE-PRINZIP (das EINZIGE, das die laufende Arbeit überhaupt berührt):
Die einzige berechtigte "Vorbereitung" ist Naht-Hygiene, KEIN Code-Vorbau. 7c-2 koppelt
Domain-/Routing-Logik NICHT an Tracking-/Lead-Logik. Die Andock-Punkte für alle Module
unten EXISTIEREN BEREITS: der neutrale /api/e-Trichter (Multi-Tracking dockt additiv an)
und die projekt-scoped Settings (Pixel/Token; Auto-Tracking dockt an). "Nahtloses
Andocken" ist Ergebnis sauberer Nähte + additiver Disziplin, NICHT von spekulativem
Vorbau. KEINE Webhook-Interfaces/Schema-Erweiterungen ohne realen Konsumenten + Spec
(Prinzip "Abstraktion erst bei echtem Bedarf").

## Zukunfts-Roadmap: Owned Traffic Mastery (Post-7c-2, OPTIONALE MODULE)
Unverbindliche Erweiterungsrichtung; jedes Modul wird bei echter Umsetzung eine eigene
beweisbare Slice mit eigenem Konzept. Reihenfolge/Umfang offen.

### 1. Lead-Enrichment & Conversion (Next-Gen Formulare)
- KI-gestützte Multi-Step-Quizze; Zero-Party-Data-Erfassung.
- EHRLICHE EINORDNUNG (wichtig): Pagesmith speichert HEUTE KEINE Lead-PII (feuert nur
  Tracking-Events). Dieses Modul = PII PERSISTIEREN -> löst unmittelbar das Security-
  Manifest aus (30-Tage-Retention, AVV, RLS für Lead-Daten). Eigenes Daten-/Compliance-
  Universum, kein Feature-Anbau. Größte neue Fläche, NICHT "bald".

### 2. Conversational & Mobile Channels
- Click-to-Chat-Kits (WhatsApp-Opt-in-Doku), generische Webhooks für SMS/RCS.
- EINORDNUNG: Click-to-Chat ist billig (Link/Kit). Wallet-Pässe (Apple/Google) sind ein
  GROSSER Brocken (Pass-Signing, Zertifikate, eigenes Renewal), unklarer ROID fürs
  Kernprodukt -> separat gewichten, nicht gleichrangig.

### 3. Server-Side Data Hub (DSGVO-safe)
- Multi-Tracking-Hub: Meta CAPI + GA4 + TikTok Events API server-side (kein Client-Bloat).
- Edge-Puffer für Lead-Daten bei CRM-Ausfall.
- EINORDNUNG: STÄRKSTER, natürlichster Fit -> exakt die Verallgemeinerung, für die der
  neutrale /api/e-Trichter gebaut wurde ("mehr Ziele am selben Event", kein Bruch).
  Verortung Phase 8.

### 4. Native CRO-Optimierung
- Smart Sections (Content nach Traffic-Quelle); Native AI-A/B.
- EINORDNUNG: AI-A/B ist bereits Phase 9. Smart Sections = Serve-Zeit-Variantenwahl ->
  dockt später ADDITIV an die Serve-Route (liefert heute published_content verbatim;
  Variantenwahl ist additiver Schritt). JETZT einzubauen wäre premature.

## Architektur-Vision: "Smart-Tracking & Automation" (Leitprinzip, Post-7c-2)
Leitprinzip "Smarte Veredelung": technische Konfiguration automatisieren, wo möglich;
Hybrid aus Autopilot (Vorschläge) + Experten-Modus (manuelle Kontrolle); manuelles
JS-Snippet-Copy-Paste minimieren.
- GENAUIGKEITS-KORREKTUR (wichtig, sonst Doppel-Bau-Gefahr): Die "automatische Erkennung
  der Element-Funktion" ist KEIN Zukunftsfeature — die Detection (detect.ts, "Erkannte
  Elemente") existiert seit Phase 2. Ebenso speichert die Mapping-Tabelle Element->Event
  BEREITS. NEU ist allein die Auto-VORSCHLAGS-/Hybrid-Schicht obendrauf (Autopilot vs.
  Experten-Modus). "Mapping-Intelligenz speichern" braucht daher voraussichtlich KEINE
  neue Struktur — höchstens irgendwann eine ADDITIVE Spalte "auto-vorgeschlagen vs.
  bestätigt". App-Logik auf existierendem Storage, KEIN Schema-Vorbau.
- ENTWICKLUNGS-LEITSATZ: jedes künftige Feature prüft, ob der Intent schon bekannt ist
  (automatisierbar) oder manuell konfiguriert werden muss — OHNE dafür jetzt Struktur auf
  Vorrat zu bauen.

## Tracking-Testmodus für Kunden (Optionale Module, Post-7c-2 — kleines, eigenständiges Modul)
- IDEE: Dashboard-Schalter "Tracking-Testmodus". Marketer trägt seinen Meta
  test_event_code ein; Events tauchen im Events-Manager-Testtab auf, ohne die echten
  Kampagnendaten zu verfälschen.
- TECHNISCHE KORREKTUR (recherchiert, nicht angenommen): test_event_code ist
  AUSSCHLIESSLICH ein CAPI-/Server-Request-Feld. Es gibt KEIN entsprechendes
  fbq()-Client-Parameter in Metas API. Der Client-Pixel braucht KEINE Änderung —
  Metas "Ereignisse testen"-Tool erfasst Browser-Events ohnehin passiv, sobald der
  Test-Tab offen ist (in dieser Session selbst beobachtet: Browser-Event erschien
  dort ohne jeden eingeschleusten Code). SCOPE DAMIT KLEINER als ursprünglich gedacht:
  nur die interne CAPI-Route muss test_event_code optional in den Meta-Request-Body
  aufnehmen, wenn im Projekt gesetzt.
- ECHTES RISIKO, nicht nur Fußnote: Der Sinn von test_event_code ist typischerweise,
  dass so markierte Events aus der ECHTEN Kampagnen-Optimierung ausgeschlossen werden.
  Vergisst ein Marketer, den Testmodus zu deaktivieren, verschwinden seine echten
  Käufe lautlos aus Metas Optimierungssignal, während das Werbebudget weiterläuft.
  DESIGN-ANFORDERUNG bei Umsetzung: kein stiller Dauer-Toggle — Auto-Ablauf nach
  X Stunden und/oder unübersehbarer Dashboard-Banner "Testmodus aktiv seit...".
- (Vor Umsetzung: Metas eigene Doku zur Ausschluss-Regel von test_event_code aus der
  Optimierung nochmal verifizieren, nicht nur aus dieser Einschätzung übernehmen.)

## Zweigleisige Architektur: Import-Layer + Nativer Generierungs-Layer (JSON-First) (Optionale Module, Post-7c-2)
- STRATEGISCHE EINORDNUNG (wichtig, festhalten): Dies ist KEINE Erweiterung des
  bestehenden Import-Flows, sondern eine BEWUSST GETRENNTE zweite Produktspur.
  Grund: beliebiges/fremdes importiertes HTML nachträglich verlustfrei in
  semantische Sektionen (Hero/Features/Pricing) zu zerlegen, ist ein offenes,
  heuristisches Problem ohne verlässliche Lösung (anders als die begrenzte
  Element-Erkennung in detect.ts). Die Zweigleisigkeit UMGEHT dieses Problem,
  statt es zu lösen.
- SPUR A (bestehend, UNVERÄNDERT): Import beliebiger KI-generierter/fremder HTML-
  Seiten, Click & Connect-Wiring wie heute. published_content bleibt wie es ist.
  Bleibt agnostisch gegenüber der Quelle (v0, Bolt, Lovable, ChatGPT, manuell).
- SPUR B (neu, eigene Rubrik in der App): Seiten werden NATIV per Prompt über
  Claude Code/MCP generiert. Da die Ausgabeform von Pagesmith selbst diktiert wird,
  kann das LLM von Geburt an strukturiertes JSON (Array einzelner Sektionen)
  ausgeben — KEINE Rückwärts-Extraktion nötig. Nur auf Spur-B-Seiten: volle
  Bearbeitung (Sektions-Reordering/Drag&Drop trivial über Array-Position,
  scoped Prompt-to-Edit pro Sektion, Branding-DNA-Konsistenz, Sektions-Level-
  A/B-Testing).
- DATENMODELL-PRINZIP (additiv, wie bisher immer in diesem Projekt): Spur A und
  Spur B unterscheiden sich über einen Diskriminator (z.B. project_type oder eine
  eigene nullable Spalte wie sections_json), KEINE Migration bestehender Spur-A-
  Zeilen. Exakt das gleiche additive Muster wie custom_host neben dem Label-Modell
  in 7c-1 — hier nur erwähnen, nicht implementieren.
- SYNERGIE MIT SMART-TRACKING-VISION: Spur B ist der natürlichere Ort für
  automatische Tracking-Vorschläge (Vision B, bereits dokumentiert) als Spur A:
  bei nativer Generierung WEISS das System bereits zur Erzeugungszeit, dass ein
  Button der Hero-CTA ist — keine nachträgliche Heuristik/Ratewerk wie bei
  importiertem Fremd-HTML nötig.
- SYNERGIE MIT PHASE 18 (MCP): Spur B gibt der MCP-Vision (scoped Tokens, Audit-
  Logging aller KI-induzierten Mutationen) einen konkreten Flaggschiff-Anwendungs-
  fall statt nur abstrakter Prinzipien.
- EIGENSTÄNDIGE, KLEINERE MODULE, die KEINE der beiden Spuren-Architektur brauchen
  (bei Umsetzung ZUERST prüfen, ob der kleine Schnitt reicht, bevor die große
  Architektur angefasst wird):
  (a) Seiten-Level-A/B-Testing (zwei komplette HTML-Varianten, 50/50-Split per
      Middleware) funktioniert bereits mit zwei published_content-Blobs, BRAUCHT
      keine JSON-Sektions-Architektur.
  (b) Scoped Prompt-Editing auf bestehenden importierten Seiten (Spur A) wäre
      OHNE volle Sektions-Segmentierung denkbar: Element in der Vorschau
      auswählen (Detection-Infrastruktur existiert bereits), nur dessen
      umgebender HTML-Kontext geht ans LLM statt der ganzen Seite.
- OFFENER PUNKT FÜR SPÄTER (bei tatsächlicher Umsetzung, nicht jetzt): sobald
  Pagesmith selbst per Prompt generiert statt nur zu hosten, wird Content-
  Moderation eines böswilligen Generierungs-Prompts relevant (analog zum
  Content-Moderations-Problem jedes generativen KI-Tools) — als künftiger
  Security-Manifest-Punkt vormerken, nicht heute bauen.
- POSITIONIERUNG (festhalten, nicht jetzt umsetzen): Wird Spur B real gebaut, wird
  die Root-Identitätszeile "Eine schlanke Hosting- & Integrations-Plattform" nicht
  mehr die volle Wahrheit sein (Pagesmith wäre dann zusätzlich ein generativer
  Builder). Die Umschreibung ist DANN ein bewusster eigener Doku-Schritt bei
  Umsetzungsbeginn, KEINE Änderung heute.

Siehe auch: "Strategischer Ausblick: Projekttyp Business-Website" weiter unten —
wendet Spur A/Spur B auf zwei Projekttypen an und begründet, warum Business-Website
exklusiv Spur B nutzt.

## Strategischer Ausblick: Projekttyp "Business-Website" — Multi-Page-Fundament
(bewusst vertagt, NICHT jetzt bauen)

KEINE dritte, unabhängige Vision — verzahnt und präzisiert zwei bereits dokumentierte:
"Funnel-Architektur" ("Projekt = N Seiten") und "Zweigleisige Architektur" (Spur A
Import vs. Spur B Nativ/JSON-First). Beide Konzepte bleiben gültig; diese Sektion
löst die Frage, WIE sie zusammen für einen zweiten Projekttyp greifen.

KERNENTSCHEIDUNG: EIN gemeinsames Multi-Page-Projekt-Fundament (neue additive
pages-Tabelle neben projects, parent/child über project_id). Die Unterscheidung
Conversion-Funnel vs. Business-Website ist REINE Navigations-Choreografie/ein
project_type-Flag im Frontend — KEIN separates Backend-Modell, KEINE zweite
Architektur.

DIE WEG-A/WEG-B-MATRIX (asymmetrisch nach Projekttyp, NICHT symmetrisch):

- Projekttyp "Conversion-Funnel" — BEIDE Wege erlaubt:
  - Weg A (Import): unabhängig voneinander importierte Seiten (Optin/Sales/
    Checkout), verkettet über das bestehende Mapping-Modell (funnel_step-
    Aktionstyp, bereits in "Funnel-Architektur" vorgedacht, KEIN Modellumbau
    nötig). Visuelle Kohärenz zwischen Schritten wird hier NICHT versprochen
    und NICHT erzwungen — das ist beim Funnel kein Mangel, sondern normale
    Praxis: Optin/Sales/Checkout stammen in der Realität oft bewusst aus
    unterschiedlichen Quellen/Templates.
  - Weg B (Nativ/JSON-First via MCP): volle JSON-Sections-Maschinerie,
    Branding-DNA, perspektivisch Drag&Drop.
- Projekttyp "Business-Website" — NUR Weg B erlaubt:
  - Mehrseiten-Import (Weg A) ist für diesen Projekttyp BEWUSST GESPERRT.
  - Begründung (hart, nicht verhandelbar): geteiltes Site-Chrome (globales
    Menü/Footer) + einheitliches Branding über Unterseiten hinweg ist bei
    unabhängig importiertem HTML strukturell NICHT garantierbar (keine
    gemeinsame Design-Quelle zwischen z.B. separat importierter Startseite
    und "Über uns"-Seite). Bei Weg B ist es garantierbar, weil Pagesmith die
    Ausgabe selbst kontrolliert (Branding-DNA). Deshalb: die Kombination, die
    das Problem erzeugt, wird ENTFERNT statt nachträglich zu flicken.

NEUE TECHNISCHE BEDARFE (ehrlich benannt, NICHT jetzt gebaut):
- pages-Tabelle additiv neben projects (parent/child via project_id) — gleiche
  additive Disziplin wie bisher im Projekt (siehe custom_host, dns_config etc.).
- PFADBASIERTES ROUTING MUSS VOR JEDER UMSETZUNG VERIFIZIERT WERDEN, nicht
  angenommen: das heutige app-serve ist host-basiert (Domain/Subdomain ->
  Projekt); OB und WIE es den angefragten PFAD innerhalb einer Domain liest,
  ist unbekannt und beim Bau-Kickoff zuerst am echten Code zu prüfen, nicht aus
  dem Gedächtnis zu behaupten.
- Geteiltes Site-Chrome (Header/Footer/Menü) ist ein NEUES Konzept, KEINE
  Erweiterung des bestehenden funnel_step-Mappings: eine punktuelle Klick-
  Aktion ist etwas anderes als ein persistentes, auf JEDER Seite sichtbares
  Menü.
- SEO-Metadaten pro Unterseite (Title/Description/OG-Tags) existieren nirgends
  im heutigen Ein-Seiten-Modell — neuer Scope.
- Sitemap-Generierung (durch Mehrseiten+SEO-Fokus impliziert) — neue Route, die
  alle Live-Seiten eines Projekts aufzählt.
- Neuer Diskriminator project_type (funnel|business_website) auf projects,
  additiv.

WAS NICHT NEU GEBAUT WERDEN MUSS (bereits kompatibel, keine Änderung nötig):
- Domain->Projekt-Routing (Kill-Switch, RLS, Ownership-Gates) bleibt komplett
  unverändert, unabhängig von der Seitenzahl eines Projekts.
- Additive Migrationsdisziplin passt direkt, kein neues Muster nötig.
- Type-diskriminiertes Mapping-Modell verträgt funnel_step ohne Umbau
  (Funnel-Fall, bereits in "Funnel-Architektur" festgehalten).
- Vercel-Domains-API braucht KEINE Erweiterung — mehrere Seiten unter EINER
  Domain sind reines Pfad-Routing, keine zusätzliche Domain-Registrierung
  nötig.

OFFENE, BEWUSST NICHT JETZT ENTSCHIEDENE PUNKTE:
- Ob pages einen eigenen content_source-Flag braucht (import|native) oder ob
  das rein über project_type impliziert wird (bei Funnel könnten theoretisch
  einzelne Seiten unterschiedliche Quellen haben).
- Exaktes Sitemap-Generierungs-Design.
- Site-Chrome-Modell: eigene Tabelle vs. zur Serve-Zeit aus Geschwister-Seiten
  berechnet.

TIMING: strikt NACH Phase 8 (Analytics/ROI) und NACH der ersten echten Umsetzung
der Zweigleisigen Architektur (Spur B muss für andere Zwecke ohnehin existieren,
bevor Business-Website darauf aufbauen kann). Kein Vorziehen — "Abstraktion erst
bei echtem Bedarf".

NOTIZ (2026-08-03, BENANNT UND NICHT AUFGELÖST): Diese Zeitbedingung und die
Verortung in der Root-CLAUDE.md sind MÖGLICHERWEISE DIVERGENT. Hier steht
"strikt NACH Phase 8"; die Root führt Spur B / Business-Website unter "Bewusst
nicht phasiert" mit dem natürlichen Zeitpunkt "bei/nach Phase 18 (MCP)". Die
zweite Aussage ist die STRENGERE — Phase 8 ist längst abgeschlossen, Phase 18
liegt am Ende der Roadmap. Ob beide dasselbe meinen (Phase 8 als Mindest-
bedingung, Phase 18 als erwarteter Zeitpunkt) oder ob eine die andere ablöst,
ist eine OWNER-ENTSCHEIDUNG und wurde in der Doku-Runde vom 2026-08-03 NICHT
getroffen. Keine der beiden Aussagen ist dabei geändert worden.

## Strategischer Nordstern: Performance-CRM & CAPI-Attribution-Engine
(Owner-Vision 2026-07-24. NICHT gebaut, KEIN Auftrag, KEIN Vorbau. Zweck: heutige
Entscheidungen sollen diese Richtung nicht VERSPERREN — mehr nicht. Es wird NICHTS
auf diese Vision hin abstrahiert; es gilt weiterhin "Abstraktion erst bei 2+ echten
Fällen".)

ZIELGRUPPE (geschärft): Performance Marketer, Media Buyer, Performance-Agenturen.

DER KEIL (warum ausgerechnet Pagesmith): Bei Pagesmith sind Landingpage und Tracking
DASSELBE System. Attribution wird nicht nachträglich rekonstruiert, sie ist zur
Erzeugungszeit bekannt. Konkurrenzprodukte (Hyros, Triple Whale, Northbeam) sitzen als
Bolt-on auf Seiten, die sie nicht kontrollieren. Daraus folgt die Sortierung unten:
KERN = nutzt das Besitzen der Seite aus. COMMODITY = dupliziert nur ein bestehendes
Fremdsystem -> ans Ende oder auslagern.

### KERN-BAUSTEINE (nutzen das Fundament, das schon steht)
- CLICK-ID-ERFASSUNG (gclid, fbclid, ttclid, msclkid) beim ersten PageView.
  ZEITKRITISCH, aber nicht dringend: die IDs existieren NUR im Moment des Landings in
  der URL — nicht erfasst = unwiederbringlich. Heute nahe null Kosten (kein realer
  Ad-Traffic); die Frist ist "vor dem ersten echten Ad-Traffic", nicht "sofort".
  BLOCKIERT durch die Datenklassen-Grenze (s.u.).
- MICRO-CONVERSIONS / Funnel-Sprünge als Events (Quiz gestartet, MQL, Offer Made).
  LÄUFT HEUTE SCHON: TrackConfig.event ist ein freier Nutzer-String, und isForwardable
  schliesst nur den reservierten Token aus — genau deshalb wurde damals gegen eine
  Allowlist entschieden. Kein Codeumbau nötig, nur UI/Value-Felder.
- SERVER-SIDE FAN-OUT an mehrere Netzwerke (Meta, Google, TikTok, LinkedIn, Pinterest).
  VORGEDACHT: 'source' ist der Beobachtungs-ORT, das ZIEL bekommt laut geltender Regel
  eine EIGENE additive Spalte. Der Persist ist vom Forward-Ausgang entkoppelt (after()),
  d.h. ein scheiterndes Netzwerk kostet keine Zeile. Additive Erweiterung, kein Umbau.
- ATTRIBUTION BIS AUF CREATIVE-/HOOK-/AdSet-EBENE (UTM + Click-ID-Deep-Dive).
- A/B- bzw. Varianten-Dimension: kommt mit Phase 9b als eigene additive events-Spalte
  und ist die erste Instanz des Musters "neue Dimension = eigene Spalte".

### SPÄTER / EIGENE PHASEN (Reihenfolge = Abhängigkeit, nicht Wunsch)
- FINANZ-/UNIT-ECONOMICS-LAYER (eROAS, Deckungsbeitrag, pLTV, Churn): braucht Daten,
  die Pagesmith NICHT hat — Ad-Spend-APIs (Google Ads API mit Developer-Token-Freigabe),
  Produktkosten aus dem Shopsystem, Bestellwerte via Payment-Webhooks (in der
  Funnel-Vision bereits als technisch anspruchsvollster Teil markiert). Eigene
  Phasen-Familie. Es gilt die bestehende Regel: SCHEMA-Vorbereitung ja, BAU erst bei
  realer Ad-Spend-API.
- DYNAMIC AUDIENCE ENGINE / Ad-Sync (Custom Audiences, Customer Match, Exclusions):
  Schreib-Integration in Werbeplattformen. Setzt den Identitäts-Layer voraus (s.
  Datenklassen-Grenze) — vorher nicht baubar.
- LEAD-SCORING + "Bad Lead"-Signal ans Netzwerk: Profiling. Braucht eine Rechtsgrundlage
  auf KUNDENEBENE, die Pagesmith nicht selbst herstellen, sondern nur ermöglichen kann
  (Consent-Erfassung + Nachweis beim Kunden).
- MARKETING AUTOMATION: ENTSCHIEDEN (Owner, 2026-07-24) — Pagesmith wird NICHT E-Mail-/
  WhatsApp-/SMS-Versender. Stattdessen WEBHOOKS auf Performance-Events; der Kunde behält seinen
  bestehenden ESP. Begründung: Zustellbarkeit, Opt-in-Nachweise, WhatsApp-Business-
  Freigabe und Carrier-Regeln sind ein eigenes, ops-schweres Geschäft — für einen
  Solo-Betrieb der teuerste Baustein bei geringstem Differenzierungswert (Commodity).

### GESTRICHEN (nicht "später", sondern NICHT)
- BROWSER-FINGERPRINTING: widerspricht dem KERNVERSPRECHEN. Fingerprinting ist unter
  TTDSG §25 zustimmungspflichtiger Zugriff auf Endgeräte-Informationen, und anders als
  beim funktionalen Varianten-Cookie gibt es KEIN "unbedingt erforderlich"-Argument.
  Pagesmith verkauft DSGVO-saubere First-Party-Erfassung an den DACH-Markt; ein
  Fingerprinting-Modul zerstört diese Positionierung und macht die KUNDEN angreifbar —
  und Pagesmith als deren Auftragsverarbeiter mit. Wird NICHT gebaut.

### ARCHITEKTUR-GARANTIEN (kosten heute NICHTS, wären später teuer)
- /api/e BLEIBT SCHREIBEND UND ANTWORTLOS. "Bi-direktionale CAPI" heisst NICHT, das
  204-Containment aufzuweichen: eine leere 204 in jedem Pfad ist Enumeration-Schutz,
  kein Stilmittel. Rückkanäle (Offline-Conversion-Sync, Audience-Push) brauchen einen
  EIGENEN, authentifizierten Endpunkt mit eigener Autorisierungsschicht DAVOR — exakt
  die Lehre aus der MCP-Vorüberlegung ("nicht direkt ansprechen, eine neue
  Autorisierungsschicht davor bauen").
- JEDE NEUE DIMENSION = EIGENE additive, nullable Spalte auf events. NIEMALS 'source'
  oder 'event_type' überladen. events bleibt append-only, eine Zeile je Beobachtung.
- IDENTITÄTS-LAYER, FALLS ER KOMMT: gehashte Kontaktdaten sind PSEUDONYMISIERT, nicht
  anonymisiert — also weiterhin personenbezogen. Ab diesem Moment braucht es einen
  LÖSCHPFAD JE BETROFFENER PERSON, Auskunfts-/Exportfähigkeit, und Encryption-at-Rest
  wird von Defense-in-Depth zur TRAGENDEN Kontrolle (Manifest sagt heute korrekt: ein
  In-DB-Key ist Theater, echtes Envelope braucht KMS). Heute existiert kein Löschpfad,
  weil events keine Personen-Identität trägt — das ist ein Zustand, kein Versäumnis.

## Strategischer Nordstern: GEO (Generative Engine Optimization)
(Owner-Vision 2026-07-24. NICHT gebaut, KEIN Auftrag, KEIN Vorbau. Wie beim
Performance-CRM-Nordstern gilt: heutige Entscheidungen sollen die Richtung nicht
VERSPERREN — es wird NICHTS darauf hin abstrahiert.)

POSITIONIERUNG (bewusst NICHT "SEO"): Wer eine Performance-Ad sieht, kauft oft nicht
sofort, sondern fragt ein KI-Modell ("Ist Anbieter X seriös? Lohnt sich das?"). Ziel ist
KI-EMPFEHLUNGSMARKETING und CONVERSION-ABSICHERUNG, nicht organische Auffindbarkeit für
Nischen-Keywords. Der Keil ist derselbe wie beim Performance-CRM: Pagesmith BESITZT die
Seite und muss ihre Bedeutung nicht nachträglich rekonstruieren.

### EHRLICHE GRENZEN (vor jeder Marketing-Aussage lesen — Lektion aus dem "gerettet"-Verbot)
- llms.txt ist eine VORGESCHLAGENE Konvention (Answer.AI, Ende 2024), kein etablierter
  Standard: es ist nicht belegt, dass grosse Anbieter sie konsumieren. Die Datei zu
  erzeugen ist billig und schadet nicht — aber "die KI liest unsere Zusammenfassung" ist
  eine HOFFNUNG, keine Messung. Vor dem Verkaufen: Stand der Konvention neu prüfen.
- ZIELGRUPPEN-SPANNUNG (wichtig): Rapid-Testing-Landingpages von Media Buyern sind
  kurzlebig, oft noindex, reiner Paid Traffic. Was nie in einen Index kommt, kann keine
  KI zitieren. Für "ist Anbieter X seriös" gewichten Modelle zudem DRITT-Quellen
  (Bewertungsportale, Foren, Presse) höher als die Verkaufsseite des Anbieters selbst.
  GEO greift damit bei EVERGREEN-Angeboten, Brand- und Business-Seiten — NICHT beim
  Drei-Wochen-Testfunnel. Natürlicher Partner: der Projekttyp "Business-Website"
  (s. eigener Abschnitt in dieser Datei).
- MESSBAR ist NUR, dass ein KI-Crawler die Seite geholt hat — NICHT, ob ein Modell sie
  gelesen, behalten oder empfohlen hat. Jede Kachel muss diesen Unterschied benennen
  (gleiche Disziplin wie "N von M Conversions wurden NUR server-seitig erfasst").

### SÄULE 1 — MASCHINENLESBARKEIT (zerfällt in zwei ungleiche Hälften)
- (1a) llms.txt / llms-full.txt — BAUBAR AUF SPUR A, mit EINER Auflage: die Erzeugung
  passiert CLIENT-SEITIG BEIM PUBLISH, nicht am Edge. GRUND: eine Zusammenfassung
  braucht Textextraktion = HTML-Parsing, und "KEIN server-seitiges HTML-Parsing" ist
  eine geltende Regel ("## Immer beachten"). Der Client hat den DOMParser bereits und
  macht bereits Textdetektion (Phase 5). Ablage als ZUSÄTZLICHER KEY in
  published_content (server-geschrieben, ein atomarer Publish-Write — dasselbe Muster
  wie Variante B in 9a); die Serve-Route liefert einen FERTIGEN STRING aus, ohne zu
  parsen, ohne Zusatzlatenz. FALLE (wie bei 9a): schreibt publishProject
  published_content ganzheitlich, überschreibt ein Publish die anderen Keys STILL —
  Erhalt aller Keys ist Invariante.
- (1b) Schema.org/JSON-LD AUTOMATISCH + semantisches HTML5 — NUR SPUR B, auf Spur A
  NICHT lösbar. GRÜNDE: (i) Pagesmith hat KEINE eigenen UI-Komponenten, es importiert
  fremdes Div-Suppen-HTML (v0/Bolt/Lovable). Zu erkennen, dass ein Div-Cluster eine FAQ
  oder eine Preistabelle IST, wäre Heuristik oder ein LLM-Call — beides fehleranfällig,
  und FALSCHES Schema.org ist schlechter als keines (Suchmaschinen sanktionieren es).
  (ii) Importiertes HTML in semantisches HTML5 UMZUSCHREIBEN würde die
  data-pagesmith-id-Anker zerstören, an denen sämtliche Mappings hängen -> der komplette
  Click&Connect-Pfad bräche STILL. Auf Spur B ist beides GESCHENKT: der Generator weiss
  zur Erzeugungszeit, was ein Block ist, und emittiert Schema.org + semantische Tags
  direkt mit — exakt dieselbe Logik, mit der Smart-Tracking-Vorschläge bereits auf Spur B
  verortet wurden. GEO ist damit ein weiteres tragendes Argument FÜR Spur B.
- (1c) ZWISCHENSCHRITT, falls früher Bedarf besteht: die JSON-LD-INJEKTION selbst ist
  eine reine String-Op vor </body> (identisch zum PageView-Emitter) — machbar auf Spur A
  mit MANUELL im UI gepflegtem Schema statt automatisch erkanntem. Klein und ehrlich.
  TRIGGER (Owner-Entscheidung 2026-07-24): wird erst gebaut, wenn ein Kunde ihn explizit
  fordert — bis dahin dokumentierte Option, kein Vorbau.

### SÄULE 2 — QUOTABILITY / IN-EDITOR-ASSISTENZ (niedrigste Priorität)
- PRODUKT-SPANNUNG, ehrlich: "Werbe-Phrasen vermeiden, Faktengehalt hoch" ist das
  GEGENTEIL von gutem Direct-Response-Copywriting. Ein Score, der geübtes Copywriting
  abwertet, wird entweder ignoriert oder befolgt — und senkt dann die Conversion. Das
  wäre ein Feature, das dem Kern des Produkts schadet.
- ENTSCHIEDEN (Owner, 2026-07-24): ein Score, der den VERKAUFSTEXT bewertet, wird NICHT
  gebaut — die harte Direct-Response-Qualität der Nutzer wird nicht einem KI-Score
  untergeordnet. Stattdessen: einen ZUSÄTZLICHEN, klar getrennten Block anbieten
  ("AI Answer Block" / "Key Facts": nüchterne, zitierfähige Fakten für Maschinen,
  unterhalb der Verkaufssektion). Zwei Leser, zwei Texte, kein
  Kompromiss. Ein LLM-gestützter Score kostet zudem pro Aufruf Geld — eigene Kosten- und
  Missbrauchsbetrachtung.

### SÄULE 3 — KI-CRAWLER-ERFASSUNG (baubar, mit vier harten Auflagen)
- (3a) BOTS FÜHREN KEIN JS AUS: GPTBot & Co. holen HTML und gehen — der PageView-Emitter
  feuert NIE. Heute entsteht KEINE Zeile. Bot-Erfassung braucht daher einen NEUEN
  Schreibpfad in der SERVE-ROUTE (dem meistgetroffenen Code der Plattform). Der MUSS
  entkoppelt laufen (after()-Muster wie der Ingest-Persist), sonst zahlt jeder Aufruf
  jedes Kunden dafür — /API/E-SCHLANKHEIT sinngemäss auf den Serve-Pfad angewandt.
- (3b) UA IST CLIENT-KONTROLLIERT und trivial fälschbar -> die Zahl ist eine UNTERGRENZE,
  kein Beweis. Echte Verifikation (Reverse-DNS, veröffentlichte IP-Bereiche) wäre ein
  Lookup auf dem heissen Pfad -> verworfen. Also: UA-basiert messen und wie die
  Verlustrate ehrlich labeln.
- (3c) PHASE-8-ZAHLEN DÜRFEN NICHT VERSCHMUTZEN: get_event_counts gruppiert nach
  event_type über source='server' — ein Bot-Besuch als gewöhnliche Zeile erschiene in der
  Statistik-Sektion und verfälschte die PageView-Zahl. Optionen: reservierter
  __ps_-Token (etabliertes Muster, von der Verlustrate bereits ausgeschlossen; die
  Counts-Kachel bräuchte dann ein Anzeige-Mapping) ODER eigene Tabelle. Entscheidung
  gehört in die Scheibe, hier NICHT vorentschieden.
- (3d) NUR DEN NORMALISIERTEN BOT-NAMEN SPEICHERN, niemals rohe UA oder IP. Sonst zieht
  die 30-Tage-Retentionspflicht (Manifest Tier 2) für Daten herein, die gar keine
  natürliche Person betreffen. Ein Bot ist keine betroffene Person — das bleibt nur so,
  wenn nichts Personenbezogenes mitgeschrieben wird.

### PRODUKT-PHILOSOPHIE (Owner-Entscheidung, übernommen)
- INFRASTRUKTUR = DEFAULT ON, passiv: Crawler-Erfassung, llms.txt, (auf Spur B)
  semantisches Markup laufen im Hintergrund, ohne Seite oder Skripte des Nutzers zu
  verändern.
- CONTENT & SKRIPTE = FULL CONTROL: generierte llms.txt/JSON-LD sind im UI
  überschreibbar und abschaltbar. GEO-Features dürfen NIEMALS benutzerdefiniertes
  JavaScript (GTM, Custom Tracking, Pixel) blockieren, verändern oder umordnen — der
  Fremd-Pixel-Fall aus Phase 8 hat gezeigt, wie schnell fremder Code mit eigenem
  kollidiert.

### VOR JEDER GEO-SCHEIBE ZU MESSEN (nicht annehmen)
- Was passiert heute auf den Serving-Domains bei /robots.txt? (In den Vercel-Logs war ein
  GET /robots.txt mit 307 zu sehen — ungeklärt.) Für GEO ist die robots.txt
  mitentscheidend: viele Seiten sperren KI-Crawler pauschal aus. Die Crawler-Erlaubnis
  gehört perspektivisch PRO PROJEKT steuerbar.
- RESERVIERTE PFADE: /llms.txt (und ggf. /robots.txt) belegen einen Pfad auf der
  KUNDEN-Domain. Das ist heute unkritisch (ein Projekt = eine Seite = ein Host), kollidiert
  aber potenziell mit dem pfadbasierten Routing des Projekttyps "Business-Website" —
  dort steht bereits die Auflage, das Pfad-Routing VOR jeder Umsetzung am echten Code zu
  verifizieren. Beide Abschnitte zusammen lesen.
- KILL-SWITCH GILT AUCH FÜR MASCHINEN: ein gesperrtes Projekt darf weder llms.txt noch
  Inhalte an Crawler ausliefern. Der bestehende blocked-Check in der Serve-Route deckt
  das ab — bei jedem neuen Ausgabepfad explizit mitprüfen.

## Session-Analyse-Werkzeuge auf Kundenseiten (Vision)

TIMING (Stand 2026-08-03, NICHT endgültig): Phase 14/15 — Härtung vor echtem
Ad-Traffic bzw. Public-Launch-Restarbeit. Der Grund ist inhaltlich: Das Vorhaben
setzt EINEN geteilten Consent-Mechanismus voraus, den erst Phase 11 schafft, und
es holt fremden Code auf Kundenseiten — beides gehört in die Nachbarschaft der
Härtung, nicht davor. Diese Einordnung ist ein STAND, keine Festlegung: die
MCP-Timing-Zeile weiter oben in dieser Datei zeigt, wie eine an eine Phase
gebundene Begründung überholt, sobald jene Phase abgeschlossen ist. Wer diese
Zeile später bewegt, prüft zuerst, ob ihre BEGRÜNDUNG noch trägt — nicht nur ihre
Nummer.

### BESCHLOSSEN (Owner, 2026-08-03)
Abgedeckt werden DREI Betreiber-Typen, ohne Bevormundung:
- wer bereits ein Hotjar-Abo hat, trägt seine Site-ID ein;
- wer keins will, bekommt eine kostenlose Alternative angeboten;
- wer ein anderes Werkzeug nutzt, trägt es in ein universelles Custom-Script-Feld
  ein.

Der Konflikt mit dem Produktversprechen (ultraschnelles reines HTML) wird über
TRANSPARENZ gelöst, NICHT über ein Verbot: beim Aktivieren steht ein
ausdrücklicher Hinweis, dass Sitzungsaufzeichnung die Ladezeit beeinflusst. Die
Entscheidung bleibt beim Betreiber. Das ist bewusst so entschieden — wer später
ein hartes Verbot oder eine stille Drosselung erwägt, ändert eine getroffene
Entscheidung, nicht ein Detail.

### ARCHITEKTUR-EINORDNUNG: ZWEI MECHANISMEN, NICHT DREI VARIANTEN
Die drei Betreiber-Typen oben sind eine Bedarfs-Aufzählung, keine
Architektur. Technisch sind es ZWEI Mechanismen:
- KURATIERT (ID-Feld): Der Betreiber trägt eine Kennung ein, WIR erzeugen das
  Snippet und bestimmen, wann es lädt. Nur hier greift der Consent-Gate sauber,
  weil wir den Ladezeitpunkt in der Hand haben.
- NOTAUSGANG (Custom-Script-Feld): beliebiger fremder Code. Wir können ihn erst
  NACH Einwilligung einfügen — aber wir können nicht prüfen, was er tut.
Die Tür wird als Tür geführt, nicht als dritte gleichrangige Option. Wer sie im
UI gleichrangig neben die kuratierten Felder stellt, verwischt genau den
Unterschied, der ihre Existenz rechtfertigt.

GEMESSEN (2026-08-03, an fremder Doku, nicht angenommen): Hotjars Events-API ist
client-seitiges JavaScript und nur auf Seiten verfügbar, die den Tracking-Code
tragen; einen Server-Endpunkt gibt es nicht. FOLGE FÜR DIE EINORDNUNG:
Session-Werkzeuge sind KEINE Fan-Out-Ziele im Sinne von Phase 11, sondern
SKRIPT-EINBETTUNG — dieselbe Klasse wie die Meta-Pixel-ID. Wer sie in den
server-seitigen Fan-Out einsortiert, plant gegen eine Schnittstelle, die es nicht
gibt.

### DREI OFFENE FRAGEN (ausdrücklich offen — keine ist vorentschieden)
1. EIGENE CONSENT-SCHLÜSSEL. Session-Werkzeuge dürfen NICHT unter den Schlüssel
   für unsere eigene Auswertung fallen: Wer der Reichweitenmessung zustimmt, hat
   nicht zugestimmt, dass ein Dritter seine Mausbewegungen aufzeichnet. Es ist
   dieselbe Unterscheidung, die schon zwischen den beiden Google-Zielen gezogen
   wurde. ZU KLÄRENDE FOLGE: Der Namensraum aus Phase 11 (Entscheidung (a))
   bekommt damit Mitglieder, die KEINE Fan-Out-Ziele sind — der Namensraum ist
   dann breiter als der Fan-Out. Welche Namen das sind, wird HIER bewusst nicht
   festgelegt.
2. DER SCHLÜSSEL "custom". Er wurde als EIN Schlüssel beschlossen, weil
   Drittanbieter-PIXEL im Consent-Banner unter eine Kategorie fallen. Ein Feld
   für BELIEBIGEN Code fällt dort nicht selbstverständlich hinein. Zu
   entscheiden, BEVOR gebaut wird — nicht beim Bauen nebenbei.
3. EMPFEHLEN ODER ANBIETEN. Ein Feld ist neutral; eine Empfehlung im Produkt ist
   eine Aussage, für die der Betreiber geradesteht. Vor jeder Empfehlung sind die
   AKTUELLEN Nutzungsbedingungen des empfohlenen Werkzeugs zu lesen, insbesondere,
   was der Anbieter mit den erhobenen Daten tun darf. NICHT geprüft — dieser Text
   trifft deshalb bewusst KEINE Aussage darüber.

### ERSTER SCHRITT, VOR JEDER PLANUNG (er kann die Begründung umdrehen)
AM CODE MESSEN, ob Pagesmith heute `<script>` aus importiertem HTML entfernt.
Nicht vermuten — die Antwort ändert die BEGRÜNDUNG des ganzen Vorhabens, nicht
nur ein Detail:
- Falls NEIN: Betreiber können bereits jetzt beliebigen Code auf ihre Seite
  bringen. Das Custom-Feld wäre dann SCHADENSBEGRENZUNG — es holt Skripte aus dem
  ungeprüften HTML in einen Slot, der wenigstens am Consent hängt.
- Falls JA: Es wäre eine NEUE Fähigkeit und braucht ein anderes Mass an Vorsicht.

ERGEBNIS DER MESSUNG (2026-08-04, am Code gemessen, Wegwerf-Probe gegen den
echten Import- und Export-Pfad, danach entfernt): NEIN — Pagesmith entfernt
`<script>` heute NICHT. Weder `annotateAndDetect` (Import/Vorschau) noch
`generateFunctional` im Modus "export" (Export/Veröffentlichen) filtert: beide
sind reine DOMParser-Round-Trips, die externes wie inline `<script>` verbatim
mitführen; ein Sanitizer existiert an keiner Stelle des Pfades. Damit gilt der
erste Fall: DAS CUSTOM-FELD IST SCHADENSBEGRENZUNG, KEINE NEUE FÄHIGKEIT. Die
Fähigkeit ist schon da, sie hängt heute nur an keinem Consent.
GRENZE DIESER MESSUNG: sie gilt für den HEUTIGEN Code (Stand 2026-08-04). Führt
jemand später eine Filterung ein, kippt die Begründung zurück in den zweiten Fall
— vor dem Bau erneut messen, nicht diese Zeile zitieren.

