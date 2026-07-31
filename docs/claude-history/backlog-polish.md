## Polish-Liste (gesammelt für einen späteren, separaten Aufräum-Durchgang)
Bewusst aufgeschobene Aufräum-Arbeiten — NICHT im laufenden Feature-Schritt
miterledigen, sondern gebündelt abarbeiten.
- FOLGE-SCHRITT: Weg-C Scheibe 2 = Neu-Verknüpfen (Re-Link) eines verwaisten
  Mappings auf ein aktuelles Element. AUSSCHLIESSLICH vom Menschen ausgelöst, NIE
  automatisch geraten (gleiche Fehlerklasse wie früher die positionsbasierten IDs).
  Baut auf der fertigen Scheibe-1-Anzeige (findOrphans + Sektion) auf.
- INVARIANTE (Team-Gedächtnis): "Übernehmen" (handleAssignMapping) wirkt NUR in
  den Draft und ruft NIE saveProject / schreibt NIE in die DB. Der einzige
  DB-Write ist der große "Speichern"-Button. ERLEDIGT: behavioraler Riegel-Test
  in src/components/CodeImporter.test.tsx schreibt das fest (spioniert die echte
  saveProject-Action; Assign-Pfad -> 0 Aufrufe, Pflicht-Gegenprobe Speichern-Pfad
  -> 1 Aufruf). Dazu kam die Komponenten-Test-Basis (@testing-library/react als
  devDep, vitest-Alias + .test.tsx + jsx via tsconfig).
- DEBUGGING-MERKSATZ (aus dem "Autosave"-Fehlalarm dieser Phase): Bei Widerspruch
  zwischen Code-Analyse und Live-Verhalten ZUERST den Dev-Server neu starten
  (stale Cache/Build) und im Network-Tab den echten DB-Write prüfen, statt
  wiederholt denselben Code zu lesen. Die Code-Analyse war korrekt — der
  vermeintliche Autosave ließ sich im Code nicht finden, weil es keinen gab.
- src/middleware.ts -> proxy.ts umbenennen: Next 16.2.9 zeigt eine
  Deprecation-Warnung für die "middleware"-Konvention (proxy ist der Nachfolger).
  Funktioniert weiter, daher unkritisch.
- src/app/layout.tsx: veraltete "Create Next App"-Metadata (title/description)
  durch echte Pagesmith-Metadata ersetzen.
- VOR öffentlichem Launch: E-Mail-Bestätigung in Supabase wieder einschalten
  (fürs MVP bewusst deaktiviert — siehe TODO in Schritt 3.1).
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Leaked Password Protection aktivieren — ist Pro-gated
  (Free Tier kann nicht). Beim Wechsel auf Supabase Pro (Phase 6) einschalten.
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Next.js loggt Server-Action-Argumente im Klartext (im
  Scheibe-2a-Debug tauchte der CAPI-Token-Wert im Dev-Terminal auf). Prüfen, dass
  echte CAPI-Tokens nicht in Server-Logs landen (Prod-Logging der Action-Argumente
  unterdrücken).
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- project_tokens-Verschlüsselung at rest (aktuell Plaintext; tragende Kontrolle ist
  Isolation + RLS-SELECT-Sperre). pgcrypto / KMS-Envelope als spätere Härtung.
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- Phase-6-Abschlusstest nachholen: Browser+Server-Dedup im Meta-Test-Events-Tab, sobald
  eine Seite auf verknüpfter Domain (Phase 7) live ist.
- Initial-Load-Preview erscheint ~300ms verzögert (bewusster Trade-off des
  Hydration-Fixes; bei Bedarf Mount-Effect-Variante, die debouncedCode sofort
  setzt).
- Editor Element->Code-Zeile-Scroll: bewusst verworfen — bräuchte echten
  Code-Editor (CodeMirror/Monaco), Nutzen für Marketer fraglich (arbeiten in der
  Preview, nicht im Rohcode).
- ELEMENTLISTE: VERSCHACHTELTE ELEMENTE ERSCHEINEN ALS DOPPEL-EINTRAG.
  BEFUND (real beobachtet): Trägt importiertes Kunden-HTML ein <a href="...">, das
  ein <button> umschliesst, zeigt die Elementliste ZWEI Einträge mit IDENTISCHEM
  Label (z.B. zweimal "Klick mich (Mit Redirect)") — einmal als <a>, einmal als
  <button>. Farblich unterschieden, aber für Kunden verwirrend, weil es wie ein
  Duplikat aussieht.
  KEIN ERKENNUNGSFEHLER: Beide Elemente SIND real und getrennt adressierbar (das
  <a> trägt die Navigation, der <button> ist ein eigener interaktiver
  Anknüpfungspunkt). Die Liste zeigt korrekt zwei Objekte — sie zeigt nur nicht,
  dass eines IM anderen liegt. Das Problem ist die DARSTELLUNG der Verschachtelung,
  nicht die Erkennung.
  FIX-RICHTUNG (falls angegangen): Verschachtelung SICHTBAR machen (Einrückung,
  Hinweis "innerhalb von <a>", o.ä.) — NICHT deduplizieren.
  WARNUNG (der eigentliche Grund für diese Notiz): Genau das Konstrukt "<a>
  umschliesst <button>" ist das, was der href-Bake- + auxclick-Fix behandelt
  (Phase-4-Lektion, live verifiziert; s. CLAUDE.md "Immer beachten": 'click' deckt
  NUR die linke Maustaste ab, Mittelklick feuert auxclick). Wer die Liste
  "aufräumt", indem er das innere oder äussere Element wegdedupliziert, kann den
  getesteten Mittelklick-/Navigations-Pfad STILL brechen. -> Vor jedem Eingriff in
  die Detection-/Generate-Schicht gilt der HISTORIE-CHECK: erst der echte Code,
  dann gezielt die passende docs/claude-history/-Datei fürs WARUM (hier
  phase-4-mapping-codegen-export.md), und die geschützte Invariante EXPLIZIT
  benennen.
  EINORDNUNG: Polish, NICHT "Offene Punkte" — es geht nichts still kaputt, es ist
  eine Verständlichkeits-Frage. Kein Trigger, keine Dringlichkeit.
- RLS-KAPSELUNG: BLANKES auth.uid() IN BESTANDS-POLICIES (Performance, KEIN Leak).
  Gemessen 2026-07-24: nur events_select_own kapselt (select auth.uid()); die
  projects-/domains-/project_tokens-Policies tragen blankes auth.uid() und werten es
  damit pro Zeile statt einmal aus. Reiner Performance-Punkt — die Ownership-Logik ist
  korrekt, es leakt nichts. Fix wäre eine Migration (create or replace policy je Tabelle
  mit (select auth.uid())) -> eigene kleine Scheibe, NICHT im laufenden Schritt.
  -> Löst zugleich den Vorwärtsverweis aus dem Root-A1-Block
  ("## Aktueller DB-/Analytics-Stand") ein.
- RENAME-GUARD FEHLT (Enter+Blur am selben Input, CodeImporter.tsx:1114-1118):
  commitRename hängt an onBlur UND an onKeyDown/Enter, ohne In-Flight-Flag und
  ohne "bereits committed"-Check. Dass Enter KEINEN Doppel-Write auslöst, ist
  INZIDENTELL: setRenamingId(null) steht synchron VOR dem ersten await, das
  Input unmountet, ein entferntes Element bekommt kein focusout. Wandert diese
  Zeile je hinter das await (oder tritt ein früher Return davor), ist der
  Doppel-Write sofort da — und bliebe unbemerkt, weil er idempotent ist
  (gleicher Name, gleicher Endzustand). Gleiche Klasse wie die
  Timeout-Scaffolding-Position in ingest.ts: Korrektheit hängt an einer
  Zeilenreihenfolge.
  -> Billigster Fix: Kommentar-Anker an :998, der die Reihenfolge als
  beabsichtigt markiert (Muster wie in ingest.ts). Sauberer: In-Flight-Guard.
  -> Einzige Enter+Blur-Paarung im gesamten src/ (verifiziert 2026-07-24);
  teure Mutationen (CAPI-Token, Domain-Add/Remove, Publish) sind an KEINEN
  Blur gebunden. Kein Handlungsdruck.
  -> Keine Testabdeckung: CodeImporter.test.tsx mockt renameProject nur, es
  gibt keinen Interaktionstest für Enter oder Blur.
- RENAME MACHT ZWEI ROUND-TRIPS (CodeImporter.tsx:1000 + :1006): nach
  renameProject folgt ein vollständiges listProjects(), um einen einzelnen
  Namen zu aktualisieren. Der neue Name ist nach dem ersten Call bereits
  bekannt. Das ist die einzige Stelle, an der beim Umbenennen echte Wartezeit
  entsteht (gemessener Kontext: die vermutete "Latenz" war KEIN Server-/
  DB-Problem — s. Aufklärung 2026-07-24, Save-Pfad in beiden Wegen bitgleich).
  -> Fix-Richtung: renameProject die aktualisierte Zeile zurückgeben lassen und
  projects lokal patchen, statt die Liste neu zu laden. KEIN Optimistic UI —
  der Wert kommt weiterhin aus der bestätigten Server-Antwort.
- EDIT-CANVAS BLITZT BEIM VARIANTENWECHSEL (nur bei UNTERSCHIEDLICHEM HTML,
  live beobachtet 2026-07-27): Beim Umschalten rechnet der edit-srcDoc-Memo
  SOFORT neu (neuer Marker, neue Overrides), während debouncedCode DEBOUNCE_MS
  nachhinkt -> für ~300 ms steht ein hybrides Dokument im iframe (altes HTML +
  neue Overrides), danach zieht der Code nach. Sichtbar als kurzes Aufblitzen
  der vorigen Variante. Beim Kopie-Normalfall (identisches HTML) tritt es NICHT
  auf. Kein Fehler, kein Datenweg betroffen (Export/Publish/Vorschau bauen aus
  debouncedCode) — rein kosmetisch, im Memo-Kommentar als benanntes transientes
  Fenster dokumentiert.
  -> Fix-Richtung, falls es je stört: den Umschalt-Pfad debouncedCode SYNCHRON
  nachziehen lassen, statt einen 300-ms-Guard zu bauen (ein Guard wäre Überbau
  und ein zweiter Mechanismus neben dem bestehenden Flash-Guard).

- "LEER" UND "NICHT LADBAR" SIND IM UI NICHT UNTERSCHEIDBAR (Statistik- und
  Verlust-Kachel): getEventCounts liefert bei jedem Fehler [] und getAdblockLoss
  null — die Kacheln zeigen dann "Noch keine Events" bzw. "Warte auf erste
  Bestätigung", also eine AUSSAGE, die sie nicht belegen können. BESTANDS-
  VERHALTEN, NICHT durch safeAction eingeführt (der .catch macht den Wurf nur
  gleich zum bereits vorhandenen Fehlerverhalten der Actions).
  -> Fix bräuchte einen DRITTEN UI-Zustand ("nicht ladbar") und damit eine
  Rückgabeform, die ihn transportiert -> gehört zu 9c, nicht in eine eigene
  Runde.
- FEHLERTEXT-ZUORDNUNG NUR AUF ZWEI PFADEN ABGESICHERT (safeAction, 2026-07-27):
  Tests nageln fest, dass der Speicherpfad SAVE_THROW_MESSAGE nutzt und der
  Publish-Pfad sie NICHT trägt. Die übrigen Nicht-Speicherpfade (Löschen,
  Umbenennen, Token, Varianten, Domains) haben keine Wortlaut-Assertion —
  würde dort versehentlich die "deine Änderungen sind noch da"-Entwarnung
  gesetzt, bliebe es unbemerkt. Heute folgenlos (alle nutzen den neutralen
  Text).
  -> Bei Bedarf EIN parametrisierter Test über alle Nicht-Speicherpfade statt
  einzelner Assertions.
- SCHMALER VIEWPORT VERDECKT FEHLERMELDUNGEN (live beobachtet 2026-07-27): Bei
  geöffneter DevTools-Konsole bricht die Kopfzeile der Live-Preview-Zone um; der
  Speichern-Button rutscht aus dem sichtbaren Bereich und die Fehlermeldung
  daneben läuft unter das Aktion-Panel. Reines Responsive-Verhalten, KEIN Bug.
  -> Relevanz trotzdem: der zentrale Fehlerkanal sitzt genau dort und trägt
  zusätzlich "truncate". Ein Fehler kann damit unsichtbar oder abgeschnitten
  sein — real passiert (ein fehlgeschlagenes Publish wirkte "sauber
  durchgelaufen"). Das UI wird ohnehin neu gestaltet; beim Redesign gehört der
  Kanal an eine Stelle, die nicht wegbrechen kann.
- AUFLAGE-/INVARIANTEN-NUMMERIERUNG IN CODE-KOMMENTAREN NICHT AUFLÖSBAR:
  Code und Tests tragen Vermerke der Form "AUFLAGE n" / "Invariante n" —
  safe-action.ts, safe-action.test.ts, CodeImporter.tsx und .test.tsx,
  resolve.ts und .test.ts. Diese Nummern stammen aus den Stufe-1-Plänen der
  jeweiligen Bau-Session und existieren im Repo nicht; die Zählungen decken
  sich nicht einmal untereinander (die "AUFLAGE 1" in safe-action.test.ts
  meint etwas anderes als die in resolve.test.ts). Am 2026-07-28 repo-weit
  gesucht, kein Dokument gefunden.
  -> KEIN Bug: die Kommentare beschreiben ihre Sache auch ohne die Nummer,
  nur der Rückverweis läuft ins Leere. Ein Fix wäre ein Kommentar-Rename,
  also ein Code-Commit — gehört nicht in eine Doku-Runde.
- KEIN WURF-TEST IM DOMAINMANAGER (safeAction, erhoben 2026-07-28):
  DomainManager.test.tsx enthält keinen einzigen Test, der eine Server-Action
  WERFEN lässt. Die sechs dort über safeAction laufenden Aufrufe sind allein
  durch den Unit-Test von safeAction gedeckt, nicht durch einen
  Integrationstest an ihrem eigenen UI-Fehlerkanal (addError, removeError,
  loadError, das checking-Flag). Ein Live-Test der Domain-Pfade unter Wurf ist
  ebenfalls nicht protokolliert.
  -> Verwandt mit "FEHLERTEXT-ZUORDNUNG NUR AUF ZWEI PFADEN ABGESICHERT"
  oben, aber NICHT dasselbe: dort fehlt die Wortlaut-Assertion auf Pfaden,
  die getestet werden — hier fehlt der Test überhaupt. Wer den einen baut,
  löst den anderen nicht mit; ein gemeinsamer Durchgang ist trotzdem
  sinnvoll.
- DRIFT-MÖGLICHKEIT BEI LADE-EFFEKTEN OHNE UI-ZUSTAND: Die Dauerregel zu
  client-seitigen Action-Aufrufen ist bewusst eine UNTERGRENZE — sie lässt
  offen, ob ein Lade-Effekt OHNE UI-Zustand .catch() oder safeAction nimmt.
  Beides ist zulässig, safeAction ist dort nur das stärkere Werkzeug als
  nötig. Folge im Bestand: CodeImporter nutzt .catch() (3x), DomainManager
  nimmt beim Auto-Poll safeAction. Kein Fehler und keine Regelverletzung —
  aber funktional gleichartige Aufrufe sehen je nach Datei verschieden aus,
  und das kann mit jeder neuen Scheibe wachsen.
  -> Falls es je stört: die Vereinheitlichung ist ein Code-Commit, KEINE
  Regeländerung. Die Untergrenze bleibt richtig, sonst wären drei korrekt
  gebaute Lade-Effekte plötzlich Verstöße.
- SERVER-FEHLER UND CLIENT-HINWEIS KÖNNEN DENSELBEN WORTLAUT TRAGEN
  (Leere-Variante-Riegel, beobachtet 2026-07-28): Bei einem Projekt OHNE
  Variante B zeigen BEIDE Ränge des Publish-Anzeigeslots denselben Satz
  ("Die Seite ist leer — es gibt nichts zu veröffentlichen.") — er stammt aus
  derselben geteilten Konstante, das ist so gewollt. Sie unterscheiden sich
  nur in der FARBE: grau = vorbeugender Client-Hinweis, rot = tatsächliche
  Server-Antwort. Am UI ist damit nicht erkennbar, ob der Server überhaupt
  geantwortet hat.
  -> KEIN Bug, aber eine schwache Rückmeldung — und der konkrete Grund, warum
  der Live-Test an genau dieser Stelle schwer zu lesen war (s. "## Aktiver
  Stand — Phase 9", VERIFIZIERT-Block, "NICHT LIVE AUSLÖSBAR"). Wer das
  angeht: die Unterscheidung muss aus dem TEXT kommen, nicht aus der Farbe
  allein (Farbe ist zudem kein zugängliches Alleinmerkmal).
- DIE TEXTAUSWAHL IST DUPLIZIERT (Leere-Variante-Riegel, erhoben 2026-07-28):
  Das PRÄDIKAT ist geteilt (emptyPublishVariant in variant.ts, eine Instanz),
  die ABBILDUNG darauf aber nicht: von ("a"/"b"/null + publiziert dieses
  Projekt überhaupt eine Variante B?) auf einen der drei Meldungstexte —
  DIESE Abbildung existiert ZWEIMAL: einmal im Server-Riegel (actions.ts,
  publishProject) und einmal in
  der Client-Ableitung (CodeImporter.tsx, emptyPublishMessage). Beide Male
  dieselbe Ternär-Kette über dieselben Konstanten.
  -> Heute KEIN Fehlerrisiko: Tests prüfen die Texte auf beiden Seiten, und der
  Live-Test hat alle drei im richtigen Fall gesehen. Es ist trotzdem eine
  zweite Stelle für dieselbe Frage — genau die Konstellation, aus der der
  9b-1-Befund kam. Fix wäre eine reine Funktion in variant.ts, die beide
  aufrufen: Code-Commit, keine Doku-Sache.
- PUBLISH-BUTTON HÄNGT AN debouncedCode (Leere-Variante-Riegel, deklarierte
  Verhaltensänderung 2026-07-28): Folge der geteilten Paar-Ableitung
  (publishPairs) — Handler und Button lesen jetzt zwingend dieselbe Quelle,
  und die ist debouncedCode. Das startet bewusst als "" (Hydration-Parität,
  server- und client-identischer erster Paint), der Button ist damit nach
  JEDEM Mount für die Debounce-Spanne gesperrt, nicht nur während des Tippens.
  -> Live NICHT sichtbar (GEMESSEN 2026-07-28: bei gefülltem Projekt erscheint
  beim Öffnen des Panels kein Leer-Hinweis) — der Nutzer muss erst das
  Einstellungs-Panel öffnen, das dauert länger als der Debounce. Ein
  BESTEHENDER Test (9b-1p "TEST 7a") brauchte deshalb ein await findByText vor
  dem Klick; die Assertion selbst blieb unverändert. Beide Richtungen sind
  sicher, weil die Autorität der Server-Riegel ist und nicht der Button.
- ZEN-MODUS: ERSTES EINFÜGEN SCHLIESST DAS PANEL, OHNE DASS DER CODE LANDET
  (CodeImporter.tsx, gemeldet, Trigger: eilt nicht, low priority): Beim
  ERSTEN Einfügen von Code nach Import schliesst sich das Code-Panel, der
  Code landet aber NICHT im Feld; erst ein ZWEITES Einfügen übernimmt den
  Code, das Panel bleibt dann aber offen.
  FUNDSTELLEN: initialer Collapse-State (:351-353), das
  userExpandedManually-Flag (:358), autoCollapseOnImport (:892-894),
  toggleInputCollapsed (:1105-1111), Textarea + onPaste-Handler (:2686-2694).
  HYPOTHESE (NICHT bewiesen, nicht reproduziert): Race zwischen dem synchron
  im onPaste-Handler ausgelösten Collapse und dem separat, ERST NACH dem
  nativen Paste-Insert feuernden onChange-Commit desselben kontrollierten
  Feldes — der Collapse-Re-Render synchronisiert die (weiterhin gemountete,
  nur versteckte) Textarea auf den noch alten code-State, bevor onChange den
  neuen Wert committet. Erklärt beide Symptomhälften aus einer Ursache: nach
  dem ersten fehlgeschlagenen Paste öffnet der Nutzer das Panel manuell
  wieder -> userExpandedManually wird true -> beim zweiten Paste feuert
  autoCollapseOnImport nicht mehr, der Wert committet ungestört, das Panel
  bleibt aber offen.
  -> Ein echter Fix braucht Live-Reproduktion (React-DevTools-Profiler, um
  die tatsächliche Event-/Render-Reihenfolge zu bestätigen) — nicht Teil
  dieser Notiz.
- ROHES NUL-BYTE IN mappings.ts (Trigger: bei Gelegenheit prüfen, keine
  bekannte Auswirkung): src/lib/mappings.ts enthält bei Offset ~6974 ein
  rohes NUL-Byte (macht die Datei für grep ohne -a-Flag "binär"). Herkunft
  ungeklärt — Encoding-Problem, Editor-Artefakt oder fehlerhafter Copy-Paste
  sind gleichermassen plausibel.
  -> Keine beobachtete Fehlfunktion, aber ein rohes NUL-Byte in Quellcode ist
  ungewöhnlich genug, um es nicht stillschweigend zu ignorieren.
- KEIN GEMEINSAMER CHOKEPOINT FÜR DIE PROJEKT-WURZELN (erhoben 2026-07-31,
  Phase-10-Aufklärung; Trigger: sobald ein Bereich EIGENEN Projekt-Zustand
  bekommt): Die sieben Wurzeln eines geladenen Projekts (projectId, code,
  savedCode, mappings, savedMappings, settings, savedSettings) werden in DREI
  Ladepfaden je EINZELN von Hand gesetzt — handleSwitch
  (CodeImporter.tsx:1604-1612), handleDelete im Nachrücker-Zweig (:1667-1674)
  und resetToEmpty (:873-880). Ein vierter Eingang ist der Server-Seed über die
  Props (src/app/page.tsx:39-49 -> Initialisierung :182, :185, :190, :194, :195,
  :200, :201).
  Die beiden GETEILTEN Unterroutinen decken diese Wurzeln NICHT ab: seedVariantState
  (:939-956) deckt nur den Varianten-Zustand, applyZenForLoadedCode (:899-931) nur
  den projekt-ungebundenen View-State. Beide werden aus allen drei Pfaden gerufen
  (:1614/:1676/:883 bzw. :1623/:1685/:885) — die Wurzeln laufen durch keine davon.
  -> BESTEHENDE Divergenzquelle (eine vergessene Zuweisung in EINEM Pfad zeigt
  Projekt A mit der Baseline von B), NICHT von Phase 10 verschärft, solange die
  Bereiche reine Kind-Komponenten ohne eigenen Projekt-Zustand bleiben (s.
  docs/aktiver-stand.md, Entscheidung 3). Wird zur VORAUSSETZUNG, sobald ein
  Bereich eigenen Projekt-Zustand bekommt: dann müsste jeder neue Zustand an drei
  Stellen nachgezogen werden, und die vierte (der Server-Seed) ist kein Handler,
  in dem man es bemerken würde.
- DOKU-NACHZUG: "PHASE 10" STEHT NOCH FÜR DEN MCP-SERVER, DER INZWISCHEN PHASE 18
  IST (erhoben 2026-07-31; Trigger: nächste Doku-Aufräumrunde — NICHT jetzt
  korrigieren): Die Roadmap führt den MCP-Server seit der Phasenplanung 10-18 als
  Phase 18 (CLAUDE.md, Roadmap-Zeile "Phase 18 — MCP-Server", "verschoben von der
  ursprünglichen Phase-10-Position"). VIER Fundstellen tragen noch die alte
  Nummer, alle am Text verifiziert:
  (1) CLAUDE.md:601 — Security Manifest, Tier 2: "MCP-SICHERHEIT: … BINDET-AN:
      Phase 10."
  (2) CLAUDE.md:1076 — "## Immer beachten", session-unabhängige Mutationen: "So
      kann die spätere MCP-Schicht (Phase 10) dieselbe geprüfte Logik
      wiederverwenden".
  (3) CLAUDE.md:1144 — "## Detail-Archiv", Beschreibung der future-roadmap.md:
      "nicht-gebaute Vision: Phase 8 (Analytics), Phase 10 (MCP), …".
  (4) docs/claude-history/security-manifest-full.md:311 und :314 — "EXPLIZIT kein
      Launch-Gate (das Feature existiert vor Phase 10 nicht)" bzw. "BINDET-AN:
      Phase 10."
  -> BEIM ABARBEITEN ZWINGEND ZUSAMMEN: (1) und (4) sind die Tier-Übersicht und
  die Vollfassung DESSELBEN Manifest-Items. Die Regel im Kopf des Security-Manifests
  verlangt, dass beide Fassungen deckungsgleich sind und IMMER im selben Commit
  geändert werden. Wer nur die CLAUDE.md-Stelle korrigiert, verletzt beim Abarbeiten
  genau die Regel, die schon einmal gebrochen wurde (der Kill-Switch stand in der
  Vollfassung als offener Blocker, während er längst gebaut und live verifiziert war).
  An diesen vier Fundstellen ist es reiner Nummern-Nachzug ohne inhaltliche Wirkung —
  die Bindung selbst ("bindet an die MCP-Phase") bleibt dort in allen vier Fällen
  korrekt.
  -> ABER DAS THEMA IST MIT DEN NUMMERN NICHT ERLEDIGT: In
  docs/claude-history/future-roadmap.md:49 trägt die MCP-Vision noch die
  ÜBERSCHRIFT "## Phase 10 — AI-Native: Pagesmith MCP-Server (Vision, NACH
  Go-Live)", und die Timing-Begründung darunter (:55-59) stellt ausdrücklich auf
  Go-Live ab: "TIMING (Owner-Entscheidung, endgültig): Phase 10, NACH Phase 7
  (Hosting/Go-Live)". Phase 7 ist inzwischen abgeschlossen, die Position aber auf
  Phase 18 verschoben — dort steht also eine INHALTLICHE Überarbeitung aus
  (Überschrift UND Timing-Begründung), nicht nur eine Ziffer. Wer nur die vier
  Nummern zieht, hat das Thema NICHT erledigt und lässt die Begründung stehen,
  die die alte Position getragen hat.
- FEHLENDER WÄCHTER FÜR DEN TOKEN-PFAD (erhoben 2026-07-31 aus der Mutationsprobe
  zu Phase 10 Scheibe 10a-1; Trigger: sobald jemand die Setzen-Kette oder ihre
  disabled-Bedingung anfasst): Der "Setzen"-Button des CAPI-Tokens ist deaktiviert
  über `!projectId || !capiTokenInput.trim() || capiTokenStatus === "saving"`
  (MeasureView.tsx:192-196); handleSetCapiToken trägt dieselben ersten beiden
  Bedingungen noch einmal als Riegel (CodeImporter.tsx:1153-1154). GEMESSEN: Es
  gibt KEINEN Test, der unabhängig davon prüft, dass der Klartext-Token nicht in
  settings landet. Der einzige Test, der den Token überhaupt als Geheimnis
  behandelt, ist "TEST 5 (Invariante vi)" (CodeImporter.test.tsx:1609-1648) — er
  prüft ausschliesslich, dass das Secret in KEINER Konsolen-Ausgabe und nicht im
  sichtbaren Text steht; settings sieht er nie an. Der Pixel-Test
  (CodeImporter.test.tsx:385-399) prüft settings zwar per toEqual exakt, tippt aber
  nie in das Token-Feld und kann den Pfad deshalb nicht treffen.
  -> FOLGE: Eine einseitige Fehlverdrahtung des Token-Rückrufs (Token flösse in
  settings und beim nächsten Speichern in eine Spalte, die der Owner LESEN kann —
  während der CAPI-Token bewusst in project_tokens ohne SELECT-Policy liegt) wird
  heute nur deshalb rot, weil die Setzen-Kette ausfällt: capiTokenInput bleibt
  leer, der Button bleibt disabled, die Action wird nie gerufen, und TEST 5
  scheitert an der ausbleibenden Meldung. Der Schutz ist damit ein NEBENEFFEKT der
  Button-Logik, kein benannter Wächter. Wer die disabled-Bedingung lockert,
  entfernt unbemerkt die einzige Abdeckung dieses Pfades. Nicht von 10a-1
  verursacht — die Mutationsprobe hat es nur sichtbar gemacht.
- GESTAFFELTER RÜCKBAU BEIM PROJEKTWECHSEL (beobachtet und am Code GEMESSEN
  2026-07-31, Phase 10 Scheibe 10a-1; Trigger: mit der UX-Politur dieser Phase,
  spätestens vor Fremd-Traffic): Beim Projektwechsel werden die Projekt-Wurzeln und
  der Varianten-Zustand SYNCHRON in EINEM Render gesetzt — handleSwitch setzt
  projectId, code/savedCode, mappings/savedMappings, settings/savedSettings
  unmittelbar nacheinander und ruft seedVariantState
  (CodeImporter.tsx:1545-1560). Die vier Analytics-/Varianten-Zustände hängen
  dagegen an [projectId] und ziehen ASYNCHRON nach: eventCounts, adblockLoss,
  variantCounts und variantBPublished werden AUSSCHLIESSLICH in den .then()-
  Callbacks ihrer Lade-Effekte geschrieben (CodeImporter.tsx:601, :619, :646,
  :677). GEGENGEPROBT: Ausserhalb dieser vier Stellen gibt es im gesamten Container
  KEINE weitere Schreibstelle für sie — insbesondere leert weder handleSwitch noch
  applyZenForLoadedCode noch resetToEmpty noch handleDelete einen der vier Werte.
  Zwischen dem Setzen von projectId und dem Auflösen der Promises steht also der
  Wert des VORIGEN Projekts.
  -> WARUM DAS MEHR ALS OPTIK IST: In diesem Fenster zeigt die Oberfläche Zahlen des
  Vorprojekts unter dem Namen des neuen (activeName leitet synchron aus projects +
  projectId ab, CodeImporter.tsx:796). Die Zielgruppe trifft mit genau diesen Zahlen
  Budget-Entscheidungen. Verschärfend bei der Varianten-Auswertung: showVariantCounts
  liest hasVariantData aus dem noch alten variantCounts (MeasureView.tsx:127-130) —
  die Sektion kann also sichtbar BLEIBEN und die Zahlen des Vorprojekts zeigen,
  obwohl das neue Projekt nie einen Test hatte. Der gestaffelte Eindruck entsteht,
  weil die vier Promises unabhängig voneinander auflösen.
  -> WAS EIN FIX KOSTEN WÜRDE: Ein synchrones Leeren der vier Zustände müsste an
  ALLEN Projekt-Ladepfaden nachgezogen werden — und genau die laufen heute durch
  keinen gemeinsamen Chokepoint (s. Eintrag "KEIN GEMEINSAMER CHOKEPOINT FÜR DIE
  PROJEKT-WURZELN" oben). Beide Punkte gehören deshalb zusammen abgearbeitet, sonst
  bekommt ein Ladepfad die Leerung und ein anderer nicht.
  -> NICHT von Phase 10 verursacht: das Verhalten ist älter als die Scheibe, die
  Umsortierung hat es nur sichtbarer gemacht. I6 ist gewahrt.
- DOMAINMANAGER BEHÄLT EINGABE UND FEHLERMELDUNG ÜBER DEN PROJEKTWECHSEL
  (beobachtet Stefan 2026-07-31 beim Live-Test zu Scheibe 10a-2, Ursache am Code
  GEMESSEN; Trigger: Stufe-1-Planung von 10b — dort wird die Mount-Disziplin
  gebaut, und dies ist eine Mount-Frage): In Projekt A eine bereits anderswo
  verknüpfte Domain eintippen, die rote Fehlermeldung provozieren, dann oben das
  Projekt wechseln -> Eingabetext UND Fehlermeldung bleiben stehen; erst ein
  Reload setzt zurück.
  GEMESSENER UMFANG — welche Zustände bleiben stehen und welche nicht:
  (a) BLEIBEN STEHEN: input (DomainManager.tsx:27) und addError (:29). Beide haben
      KEINEN an projectId gebundenen Schreibpfad — input wird nur bei :95 (nach
      erfolgreichem Hinzufügen) und :116 (onChange) gesetzt, addError nur bei :88
      (Start von handleAdd) und :98 (Fehlschlag). Kein Effect berührt sie.
  (b) WERDEN ZURÜCKGESETZT: domains (:63) und loadError (:64/:66) über den
      Lade-Effect :53-72 mit deps [projectId] (:72) — also asynchron, nach dem
      Roundtrip. Ebenso die sieben Zustände je Domain-Zeile (status :173,
      checking :174, cooldownLeft :175, cooldownTimer :176, confirming :178,
      removing :179, removeError :180) und copied (:419): sie sterben mit dem
      Unmount ihrer Zeile, weil DomainRow auf d.label gekeyt ist (:148) und die
      neue Liste andere Labels trägt. Das ist eine Mount-Grenze, keine Zuweisung.
  (c) KEIN LECK ZWISCHEN NUTZERN, und beim Wechsel auf ein GESPEICHERTES Projekt
      auch keines zwischen Projekten: die Liste lädt neu (:53-72) und zeigt die
      Domains des NEUEN Projekts. Für DIESEN Pfad ist es veralteter
      ANZEIGEzustand. Die Formulierung deckt aber NICHT den Fall (d) ab, und
      "Anzeige" heisst dort ausdrücklich nicht "folgenlos" — s. (d2).
  (d) EINE AUSNAHME ZU (c), ebenfalls gemessen und beim Live-Test nicht berührt:
      Der Lade-Effect trägt ein frühes `if (!projectId) return` (:54). Beim Wechsel
      auf ein NEUES, noch ungespeichertes Projekt ("+ Neues Projekt" ->
      resetToEmpty -> setProjectId(null), CodeImporter.tsx:812ff) läuft der Effect
      also nicht, und die Liste rendert unbedingt weiter über
      `domains.length > 0` (:144) — dort steht dann die Domain-Liste des VORIGEN
      Projekts. Beim erneuten Öffnen des Panels ist sie weg (Neu-Mount), aber
      solange es offen bleibt, ist sie sichtbar.
  (d2) DIESE VERALTETE LISTE IST BEDIENBAR — gemessen, und der Grund, warum dieser
      Eintrag NICHT als reine Kosmetik geführt wird:
      - DomainRow bekommt projectId GAR NICHT als Prop (:164-172: domain, pollTick,
        onChanged). Die Zeile kennt nur domain.label und kann deshalb konstruktiv
        nicht bemerken, dass der Projekt-Kontext gewechselt hat.
      - "Status prüfen": KEIN projectId-Riegel. Handler :224 prüft nur
        `checking || cooldownLeft > 0`, Button :265 ebenso; Aufruf
        `checkDomainStatusAction(domain.label)` :230. Auch der Auto-Poll je Zeile
        (:203-215) trägt keine projectId-Bedingung. Lesend, daher unkritisch.
      - "Entfernen": KEIN projectId-Riegel und im Handler ÜBERHAUPT KEIN Riegel
        (handleRemove :182 beginnt direkt mit setRemoving(true)); Buttons nur
        `disabled={removing}` (:278 Auslöser, :297 Bestätigung); Aufruf
        `removeCustomDomainAction(domain.label)` :186. DESTRUKTIV: der Klick löscht
        die Domain WIRKLICH (Vercel-DELETE + DB-Zeile) — und zwar eine Domain des
        VORIGEN Projekts, während die Toolbar das neue, leere Projekt anzeigt.
      - Es ist kein Aufruf mit null: beide Zeilen-Aktionen benutzen projectId
        NIRGENDS, sie arbeiten auf dem echten Label der veralteten Zeile. Der
        Server-Aufruf ist also wohlgeformt und wird ausgeführt.
      - "Domain hinzufügen" ist als EINZIGE Aktion abgeriegelt: handleAdd :86
        (`if (!projectId || …) return`), Button :124, Eingabefeld :117.
      ENTWARNUNG, soweit sie trägt (ebenfalls gemessen): serverseitig ist beides
      autorisiert. checkDomainStatusAction (domain-actions.ts:76-87) und
      removeCustomDomainAction (:95-106) ziehen die userId AUSSCHLIESSLICH aus der
      Session und delegieren an checkDomainStatus / removeCustomDomain, die je ein
      explizites Ownership-Gate tragen (status.ts:105-121 — bei fremdem Owner
      dieselbe Meldung wie not_found, also keine Existenz-Preisgabe;
      remove.ts:76-78 — kein Vercel-Call vor bestandenem Gate). Ein fremdes oder
      unbekanntes Label wird abgewiesen.
      SCHWERE-EINORDNUNG (angehoben gegenüber der ersten Fassung dieses Eintrags):
      KEINE Sicherheitslücke — die Domain gehört demselben Nutzer, und die
      Zweistufigkeit (:277/:288) verhindert den Ein-Klick-Unfall. ABER eine
      DESTRUKTIVE Aktion ist in einem Kontext erreichbar, den die Oberfläche
      falsch beschriftet: Der Bestätigungstext nennt die Domain, nicht das Projekt,
      und oben steht bereits der Name des neuen Projekts. Ein Nutzer, der nach dem
      Anlegen eines neuen Projekts "aufräumt", löscht die Live-Adresse des alten.
      FIX-EBENE — damit nicht der naheliegendste und schlechteste gewählt wird: Ein
      projectId-Riegel JE AKTION ist symptomatisch; er lässt eine veraltete Liste mit
      toten Knöpfen stehen und muss bei jeder künftigen Zeilen-Aktion erneut
      angebracht werden. Die Render-Bedingung der Liste (:144) um projectId zu
      erweitern ist besser. Am saubersten ist key={projectId} an der Komponente: dann
      entsteht der veraltete Zustand gar nicht, und Eingabefeld (a), Add-Fehler (a)
      und Liste (d) sind mit EINER Massnahme erledigt statt mit dreien — wer
      symptomatisch fixt, lässt die beiden anderen Teilbefunde offen, ohne es zu
      merken.
      TERMINIERUNG (Owner-Entscheidung, getroffen 2026-07-31): Trigger bleibt die
      Stufe-1-Planung von 10b, und er wird dort ENTSCHIEDEN, nicht nur erwähnt — 10b
      darf nicht abgeschlossen werden, solange er offen ist. Unabhängig davon
      BLOCKIEREND, bevor ein anderer Nutzer als der Owner die App benutzt.
  KEIN REMOUNT beim Projektwechsel (gemessen): Der Aufruf
  `<DomainManager projectId={projectId} />` (PublishView.tsx:326) trägt KEINEN key
  und steht unter keiner eigenen Bedingung; `<PublishView …>`
  (CodeImporter.tsx:1907) ebenso wenig. Das einzige Gate darüber ist isSettingsOpen
  (CodeImporter.tsx:1876) — nichts davon ändert sich mit projectId.
  -> WARUM MEHR ALS KOSMETIK: Die Fehlermeldung bewertet das VORIGE Projekt, steht
  aber unter dem Namen des neuen ("Domain ist bereits verknüpft" bezieht sich dann
  auf einen Konflikt, den es im aktuellen Projekt gar nicht gibt). Dieselbe
  Fehlerklasse wie im Eintrag "GESTAFFELTER RÜCKBAU BEIM PROJEKTWECHSEL" oben:
  synchron umgeschalteter Kontext, asynchron oder gar nicht nachgezogene Anzeige.
  -> GEGENPROBE ActionPanel (hält ebenfalls eigenen Zustand, 10 useState): NICHT
  betroffen, und zwar aus einem strukturellen Grund. ActionPanel rendert bei
  selectedElement === null nur den Platzhalter (ActionPanel.tsx:59) und sonst
  <ElementActions key={selectedElement.id} …> (:68-69); der Formular-Zustand liegt
  unterhalb von ElementActions. Jeder Projekt-Ladepfad im Container setzt
  setSelectedElementId(null) — resetToEmpty (CodeImporter.tsx:821), handleSwitch
  (:1560), handleDelete (:1622), dazu switchVariant (:941) und
  handleRemoveVariantB (:1017). Damit verschwindet ElementActions aus dem Baum und
  sein Zustand stirbt. ActionPanels Zustand wird also über eine Mount-Grenze
  zurückgesetzt, die der CONTAINER kontrolliert — DomainManagers Zustand nicht.
  -> FIX-KANDIDAT, AUSDRÜCKLICH NICHT ENTSCHIEDEN: key={projectId} an der
  Komponente. VOR einer Entscheidung zu MESSEN: Ein Remount stellt das
  60-Sekunden-Poll-Intervall (:78) und die Status-Prüfung je Zeile (:203-215) neu
  auf — ändert sich dadurch die ZAHL oder der ZEITPUNKT der Server-Aufrufe
  gegenüber heute? Das ist offen und darf nicht angenommen werden.
  -> ENTSCHEIDUNG GEHÖRT IN 10b: Läuft der Fix dort mit, ist er als
  Verhaltensänderung zu DEKLARIEREN — I6 deckt ihn NICHT, denn er ändert einen
  bestehenden Zustandsverlauf. Andernfalls bleibt der Punkt geparkt.
  -> NICHT von Phase 10 verursacht: Commit ef106a6 (10a-2) enthält
  DomainManager.tsx nicht — er trägt genau zwei Dateien (CodeImporter.tsx 23/249,
  PublishView.tsx 329/0) —, und die Bedingung über dem Aufruf ist unverändert:
  vorher stand er bei CodeImporter.tsx:2154 unter demselben einzigen Gate
  isSettingsOpen. GEÄNDERT hat sich allein der ORT des Aufrufs (jetzt in
  PublishView) und damit eine zusätzliche Komponentengrenze — keine Bedingung,
  kein key, kein Mount-Zeitpunkt.
