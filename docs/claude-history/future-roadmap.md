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

## Phase 10 — AI-Native: Pagesmith MCP-Server (Vision, NACH Go-Live)
Ziel: Pagesmith als natives Tool in KI-Umgebungen der Marketer (Claude Desktop, Cursor,
Windsurf) via eigenem MCP-Server (Model Context Protocol, JSON-RPC-Endpunkt z.B. /api/mcp).
Marketer generiert im Profil einen Pagesmith-MCP-Key; seine KI kann dann Projekte anlegen,
Tracking-Status abfragen, Meta-Tokens aktualisieren etc. Verwandelt Pagesmith von
Web-App zu KI-Infrastruktur — potenzielles Alleinstellungsmerkmal.

TIMING (Owner-Entscheidung, endgültig): Phase 10, NACH Phase 7 (Hosting/Go-Live). Grund:
MCP ist ein Feature für eine Nutzerbasis, die es vor Go-Live noch nicht gibt; sein Wert
entsteht, wenn reale Projekte existieren, die eine KI managen kann. Es JETZT zu bauen
verstößt gegen "kleine beweisbare Slices / Abstraktion erst bei 2+ Fällen" und lenkt vom
Wert-Schalter (Go-Live) ab.

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
- SYNERGIE MIT PHASE 10 (MCP): Spur B gibt der MCP-Vision (scoped Tokens, Audit-
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

