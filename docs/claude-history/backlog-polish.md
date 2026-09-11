## Merksätze und Nicht-Vorhaben (zählen NICHT als offene Punkte)
Angelegt 2026-08-01. Drei Einträge dieser Datei sind KEINE Aufgaben und können
deshalb nie "erledigt" werden — eine Verhaltensregel, eine ausdrücklich VERWORFENE
Idee und eine dokumentierte, akzeptierte Verhaltensänderung. In der Polish-Liste
zählten sie stillschweigend als offene Punkte mit und liessen sie länger aussehen,
als sie ist. Ihr Inhalt ist wertvoll und bleibt WÖRTLICH unverändert; sie stehen nur
an anderer Stelle.
WARUM DIESER ABSCHNITT OBEN STEHT und nicht am Dateiende: Neue Backlog-Einträge
werden ans DATEIENDE angehängt — seit dem 2026-08-13 aber unter eine EIGENE
ÜBERSCHRIFT, wenn dort bereits eine datierte Sektion steht (heute "Aus Phase 11
gehoben (2026-08-13)"); sonst rutscht der neue Eintrag stillschweigend unter eine
FREMDE HERKUNFT. Beim Eintrag vom 2026-08-14 ist genau das aufgefallen und so gelöst
worden. Läge dieser Abschnitt dort, landete jeder künftige
Eintrag stillschweigend INNERHALB der Nicht-Vorhaben. Oben kann das nicht passieren.

- DEBUGGING-MERKSATZ (aus dem "Autosave"-Fehlalarm dieser Phase): Bei Widerspruch
  zwischen Code-Analyse und Live-Verhalten ZUERST den Dev-Server neu starten
  (stale Cache/Build) und im Network-Tab den echten DB-Write prüfen, statt
  wiederholt denselben Code zu lesen. Die Code-Analyse war korrekt — der
  vermeintliche Autosave ließ sich im Code nicht finden, weil es keinen gab.
- Editor Element->Code-Zeile-Scroll: bewusst verworfen — bräuchte echten
  Code-Editor (CodeMirror/Monaco), Nutzen für Marketer fraglich (arbeiten in der
  Preview, nicht im Rohcode).
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

## Polish-Liste (gesammelt für einen späteren, separaten Aufräum-Durchgang)
Bewusst aufgeschobene Aufräum-Arbeiten — NICHT im laufenden Feature-Schritt
miterledigen, sondern gebündelt abarbeiten.
- FOLGE-SCHRITT: Weg-C Scheibe 2 = Neu-Verknüpfen (Re-Link) eines verwaisten
  Mappings auf ein aktuelles Element.
  ERLEDIGT — Kennzeichnung am 2026-08-01 nachgetragen (der Eintrag stand seit dem
  Bau als offen in der Liste). BELEG, am Code neu erhoben: der Handler
  handleRelinkOrphan existiert in CodeImporter.tsx und wird aus dem Orphan-Dropdown
  gerufen (aria-label "Verknüpfen mit Element"); die Anzeige speist sich aus
  findOrphans. Vom MENSCHEN ausgelöst wie gefordert — das Dropdown ist der einzige
  Eingang, es wird nichts automatisch geraten. Testabdeckung vorhanden, u.a.
  "Re-Link ist KATEGORIE-eingeschraenkt", "Re-Link eines Text-Orphans postet
  PS_SET_TEXT ans neue Zielelement" und "Re-Link redirect-Orphan auf
  Element-mit-track -> KEINE Fehlalarm-Warnung".
  Der ursprüngliche Eintragstext bleibt unverändert stehen:
  AUSSCHLIESSLICH vom Menschen ausgelöst, NIE
  automatisch geraten (gleiche Fehlerklasse wie früher die positionsbasierten IDs).
  Baut auf der fertigen Scheibe-1-Anzeige (findOrphans + Sektion) auf.
- INVARIANTE (Team-Gedächtnis): "Übernehmen" (handleAssignMapping) wirkt NUR in
  den Draft und ruft NIE saveProject / schreibt NIE in die DB. Der einzige
  DB-Write ist der große "Speichern"-Button. ERLEDIGT: behavioraler Riegel-Test
  in src/components/CodeImporter.test.tsx schreibt das fest (spioniert die echte
  saveProject-Action; Assign-Pfad -> 0 Aufrufe, Pflicht-Gegenprobe Speichern-Pfad
  -> 1 Aufruf). Dazu kam die Komponenten-Test-Basis (@testing-library/react als
  devDep, vitest-Alias + .test.tsx + jsx via tsconfig).
- src/middleware.ts -> proxy.ts umbenennen: Next 16.2.9 zeigt eine
  Deprecation-Warnung für die "middleware"-Konvention (proxy ist der Nachfolger).
  Funktioniert weiter, daher unkritisch.
  STATUS: OFFEN, MIT ECHTEM TRIGGER — EINGEPLANT ALS **PHASE 10.5** (Roadmap-Zeile
  in der Root-CLAUDE.md, zwischen Phase 10 und Phase 11). Bis 2026-08-01 hatte
  dieser Eintrag KEINEN Trigger ("unkritisch"); er wird vor Phase 11 gebaut, weil
  die Datei dort nicht angefasst wird und der Umbau mit jeder weiteren Phase
  teurer wird. Die folgende Aufklärung ist am 2026-08-01 am installierten Paket
  erhoben — DAMIT DIE NÄCHSTE SESSION NICHT NEU MESSEN MUSS.
  VERSION, drei übereinstimmende Quellen: package.json "next": "16.2.12",
  package-lock (node_modules/next) 16.2.12, node_modules/next/package.json
  16.2.12. Die Notiz oben nennt 16.2.9 — das war der Stand bei ihrer Entstehung
  und bleibt als Zeitdokument stehen.
  BEIDE KONVENTIONEN WERDEN UNTERSTÜTZT — vier unabhängige Fundstellen im
  installierten Paket:
  (1) dist/lib/constants.js definiert BEIDES: MIDDLEWARE_FILENAME = 'middleware'
      und PROXY_FILENAME = 'proxy'.
  (2) dist/build/index.js erzeugt exakt die Build-Meldung, die Vercel zeigt:
      warnOnce("The \"middleware\" file convention is deprecated. Please use
      \"proxy\" instead. … /docs/messages/middleware-to-proxy").
  (3) Die Doku liegt IM PAKET: dist/docs/01-app/03-api-reference/
      03-file-conventions/proxy.md — und es gibt dort KEINE middleware.md mehr.
  (4) Der Build-Output dieses Projekts beschriftet die Funktion bereits als
      "ƒ Proxy (Middleware)".
  FUNDORT: gleiche Ebene wie heute. dist/build/index.js akzeptiert eine solche
  Datei nur, wenn isAtConventionLevel — normalizedFileDir === '/' ODER '/src'.
  Ziel ist also src/proxy.ts, nicht das Projekt-Root.
  DIE FUNKTION MUSS proxy HEISSEN (oder Default-Export sein). Belegt im
  Entrypoint-Template dist/build/templates/middleware.js:
      const isProxy = page === '/proxy' || page === '/src/proxy';
      const handlerUserland = (isProxy ? mod.proxy : mod.middleware) || mod.default;
  Fehlt der passende Export, wirft der ProxyMissingExportError ("must export a
  function named `proxy` or a default function"). EIN REINES DATEI-RENAME SCHLÄGT
  ALSO FEHL — aber LAUT, nicht still. OFFIZIELLER CODEMOD (benennt Datei UND
  Funktion): npx @next/codemod@canary middleware-to-proxy .
  BEIDE DATEIEN GLEICHZEITIG = BUILD-FEHLER, KEIN ÜBERGANGSZUSTAND. dist/build/
  index.js: if (middlewareFilePath) { if (proxyFilePath) { throw new Error("Both
  middleware file … and proxy file … are detected. Please use … only.") } } mit
  __NEXT_ERROR_CODE "E900". Es ist ein throw, keine Warnung — ein Nebeneinander
  zum Vergleichen gibt es nicht.
  RUNTIME — DIE FRAGE IST BEANTWORTET UND WAR DIE EINZIGE ECHTE UNBEKANNTE:
  proxy.md sagt "Proxy defaults to using the Node.js runtime. The runtime config
  option is not available in Proxy files"; die Versionshistorie dort nennt zu
  v16.0.0 "Proxy defaults to the Node.js runtime". OWNER-MESSUNG (2026-08-01, im
  Vercel-Dashboard): ALLE Functions des Projekts laufen BEREITS unter Node.js
  24.x. Die Umstellung VERSCHIEBT die Runtime damit NICHT, und der empirische
  Beweis für x-forwarded-host (s. CLAUDE.md, "HOST-QUELLE FÜR APP-vs-SERVING-
  BRANCHING") bleibt in DERSELBEN Umgebung gültig. BELEGART: Owner-Messung im
  Dashboard, NICHT am Repo prüfbar — das Build-Manifest führt kein runtime-Feld,
  und der Kommentar "Edge-Middleware" in host.ts ist eine Formulierung, kein
  Messwert.
  WAS NACHZIEHT — vollständige Trefferliste, neu erhoben:
  - CODE: src/middleware.ts (Datei + exportierte Funktion middleware).
  - NICHT BETROFFEN, leicht zu verwechseln: src/lib/supabase/middleware.ts
    (updateSession) ist ein normales Hilfsmodul, KEINE Konventionsdatei — es
    behält seinen Namen. Wer es "mit umbenennt", ändert zwei Importe ohne Not.
  - TESTS (zwei Dateien): src/middleware.test.ts importiert { middleware } from
    "./middleware" und mockt "@/lib/supabase/middleware" (13 Tests: Host-
    Verzweigung + Ingest-Passthrough inkl. Leak-Gegenprobe);
    src/lib/supabase/middleware.test.ts importiert { updateSession } from
    "./middleware" (8 Tests aufs Auth-Gate). Die erste Datei zieht mit Namen UND
    Import nach; die zweite bleibt unberührt (sie testet das Hilfsmodul).
  - DOKU, Stellen mit dem DATEINAMEN (Zeitdokumente — beim Abarbeiten
    entscheiden, welche stehen bleiben): arbeitsweise.md (Scope-Beispiel),
    phase-2-3-foundation.md (2x), phase-6-capi.md (2x, davon eine für das
    Hilfsmodul), phase-7-hosting.md ("src/middleware.ts (Entry, KEIN
    middleware->proxy-Rename)" — damals bewusst NICHT mitgemacht), sowie dieser
    Eintrag. In docs/immer-beachten.md nennt die Regel HISTORIE-CHECK VOR EINGRIFF IN
    KERN-DATEIEN die "Middleware/Proxy-Schicht" bereits mit beiden Namen und
    braucht nichts.
  - WERKZEUG: .claude/settings.local.json trägt zwei Allowlist-Einträge mit dem
    Dateinamen.
  RÜCKWEG: Instant Rollback im Vercel-Dashboard auf das vorherige READY-
  Deployment — Sekunden, ohne Build. Im Repo ein git revert der beiden Commits.
  Wegen E900 gibt es KEINEN schrittweisen Wechsel; der Rückweg ist der ganze
  Schnitt zurück.
  NACHWEIS-AUFLAGE (aus der Aufklärung): Die Tests rufen die Funktion DIREKT auf
  und beweisen deshalb NICHT, dass Next die Datei unter der neuen Konvention
  überhaupt lädt. Das kann nur ein Deployment zeigen — Live-Test auf BEIDEN
  Host-Typen (App-Host: Auth-Gate greift; Kunden-Domain: Seite wird ausgeliefert
  und /api/e kommt durch).
- src/app/layout.tsx: veraltete "Create Next App"-Metadata (title/description)
  durch echte Pagesmith-Metadata ersetzen.
- VOR öffentlichem Launch: E-Mail-Bestätigung in Supabase wieder einschalten
  (fürs MVP bewusst deaktiviert — siehe TODO in Schritt 3.1).
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Leaked Password Protection aktivieren — ist Pro-gated
  (Free Tier kann nicht). Beim Wechsel auf Supabase Pro (Phase 6) einschalten.
  ERLEDIGT — Kennzeichnung am 2026-08-01 nachgetragen. BELEG: Die führende Fassung
  ist das Security Manifest, dort Tier 1, Eintrag "LEAKED-PASSWORD-PROTECTION":
  "ERLEDIGT (2026-07-29, mit dem Pro-Wechsel aktiviert — Supabase-HaveIBeenPwned-
  Abgleich läuft). War Pro-gated; der Trigger 'Pro-Tier' ist eingetreten und wurde
  im selben Zug abgearbeitet." Nicht am Code messbar (Dashboard-Einstellung).
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- VOR öffentlichem Launch: Next.js loggt Server-Action-Argumente im Klartext (im
  Scheibe-2a-Debug tauchte der CAPI-Token-Wert im Dev-Terminal auf). Prüfen, dass
  echte CAPI-Tokens nicht in Server-Logs landen (Prod-Logging der Action-Argumente
  unterdrücken).
  TEILWEISE ERLEDIGT — Kennzeichnung am 2026-08-01 nachgetragen, und die Teilung
  ist wichtig:
  (a) DIE VERLANGTE PRÜFUNG IST GELAUFEN. BELEG: Security Manifest, Tier 2,
      Eintrag "LOGGING-LEAK (herabgestuft von Tier 0, gemessen 2026-07-24)" — in
      PRODUKTION wird das setCapiToken-Server-Action-Argument NICHT geloggt,
      belegt per Differenztest mit Positivkontrolle; Log-Drains sind Pro-gated und
      keine konfiguriert. KEINE Token-Rotation nötig. Die 2a-Beobachtung war das
      Dev-Terminal.
  (b) OFFEN BLEIBT der STRUKTURELLE FIX als Defense-in-Depth (den Token nicht als
      Server-Action-Argument führen) sowie die dort benannten Restrisiken
      (Fehlerpfad ungetestet, lokales Dev-Terminal). Das Manifest führt ihn als
      laufende Hygiene, nicht mehr als Launch-Gate — samt Wiedervorlage bei JEDER
      neuen Server Action mit Secret-Parameter.
  -> jetzt im SECURITY MANIFEST (Tier 0) als Launch-Blocker geführt.
- project_tokens-Verschlüsselung at rest (aktuell Plaintext; tragende Kontrolle ist
  Isolation + RLS-SELECT-Sperre). pgcrypto / KMS-Envelope als spätere Härtung.
  -> jetzt im SECURITY MANIFEST (Tier 1) als Launch-Blocker geführt.
- Phase-6-Abschlusstest nachholen: Browser+Server-Dedup im Meta-Test-Events-Tab, sobald
  eine Seite auf verknüpfter Domain (Phase 7) live ist.
  ERLEDIGT 2026-08-01 — der Test ist gefahren, das Dedup ist bewiesen.
  BELEGART: BESTÄTIGUNG DURCH DEN OWNER, NICHT am Code messbar. Der Nachweis liegt
  im Meta Events Manager (geteilte eventID, Browser- und Server-Ereignis als EIN
  dedupliziertes Ereignis) — ein externes Werkzeug, das kein Repo-Artefakt
  hinterlässt. Wer diesen Punkt später anzweifelt, findet im Code KEINEN Beleg und
  muss ihn erneut live fahren; das ist die Natur dieses Tests, kein Versäumnis.
- Initial-Load-Preview erscheint ~300ms verzögert (bewusster Trade-off des
  Hydration-Fixes; bei Bedarf Mount-Effect-Variante, die debouncedCode sofort
  setzt).
  EINORDNUNG 2026-08-01: BEOBACHTETER TRADE-OFF, KEIN HANDLUNGSAUFTRAG. Wird
  angefasst, wenn jemand den Bereich ohnehin öffnet oder es im Betrieb auffällt.
  BEWUSST OHNE KRITERIUM: Ein ausgedachter Schwellwert ("ab 500 ms") wäre nicht
  besser als die ehrliche Empfindung, nur schwerer zu widerrufen.
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
  (Phase-4-Lektion, live verifiziert; s. docs/immer-beachten.md, "KLICK-WIRING vs.
  Maustasten": 'click' deckt NUR die linke Maustaste ab, Mittelklick feuert
  auxclick). Wer die Liste
  "aufräumt", indem er das innere oder äussere Element wegdedupliziert, kann den
  getesteten Mittelklick-/Navigations-Pfad STILL brechen. -> Vor jedem Eingriff in
  die Detection-/Generate-Schicht gilt der HISTORIE-CHECK: erst der echte Code,
  dann gezielt die passende docs/claude-history/-Datei fürs WARUM (hier
  phase-4-mapping-codegen-export.md), und die geschützte Invariante EXPLIZIT
  benennen.
  EINORDNUNG: Polish, NICHT "Offene Punkte" — es geht nichts still kaputt, es ist
  eine Verständlichkeits-Frage. Kein Trigger, keine Dringlichkeit.
  ERSTER SCHRITT ALS AUFGABE (ergänzt 2026-08-01, weil die Fix-Richtung ein
  ERGEBNIS beschreibt und kein Kriterium — "Verschachtelung sichtbar machen" ist
  nie nachweisbar erreicht): Zuerst zu ENTSCHEIDEN, nicht zu bauen — trägt die
  Elementliste künftig eine HIERARCHIE (Kind eingerückt unter dem Elternteil) oder
  bleibt sie FLACH mit einem Zusatz am Kind ("innerhalb von <a>")? Das ist die
  Weiche: Die erste Variante ändert die Datenform der Liste (sie braucht die
  Eltern-Kind-Beziehung, die die Detection heute nicht mitliefert), die zweite ist
  eine reine Anzeige-Ergänzung an einem bestehenden Eintrag. ZU MESSEN VOR DER
  ENTSCHEIDUNG: Liefert die Detection die Verschachtelung überhaupt schon mit, oder
  müsste sie dafür erweitert werden? Erst danach ist überhaupt klar, ob dies eine
  Nebenrunde oder eine eigene Scheibe ist.
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
  EINORDNUNG 2026-08-01: BEOBACHTETER TRADE-OFF, KEIN HANDLUNGSAUFTRAG. Wird
  angefasst, wenn jemand den Bereich ohnehin öffnet oder es im Betrieb auffällt.
  Der Eintrag sagt es selbst: kein Fehler, kein Datenweg betroffen, rein kosmetisch
  und im Memo-Kommentar als benanntes transientes Fenster dokumentiert.

- "LEER" UND "NICHT LADBAR" SIND IM UI NICHT UNTERSCHEIDBAR (Statistik- und
  Verlust-Kachel): getEventCounts liefert bei jedem Fehler [] und getAdblockLoss
  null — die Kacheln zeigen dann "Noch keine Events" bzw. "Warte auf erste
  Bestätigung", also eine AUSSAGE, die sie nicht belegen können. BESTANDS-
  VERHALTEN, NICHT durch safeAction eingeführt (der .catch macht den Wurf nur
  gleich zum bereits vorhandenen Fehlerverhalten der Actions).
  -> Fix bräuchte einen DRITTEN UI-Zustand ("nicht ladbar") und damit eine
  Rückgabeform, die ihn transportiert -> gehört zu 9c, nicht in eine eigene
  Runde.
  NACHTRAG 2026-08-01 — DER 9c-VERWEIS IST EINGELÖST, ABER NUR FÜR EINE ANDERE
  SEKTION; DIESER EINTRAG BLEIBT OFFEN. 9c hat den dritten Zustand für die
  VARIANTEN-Auswertung gebaut: variantCountsFailed in MeasureView unterscheidet
  {ok:false} ("Die Auswertung konnte nicht geladen werden") strukturell von
  {ok:true, rows:[]} ("Noch keine Daten in diesem Testlauf"), gespeist aus dem
  safeAction-Ersatzwert des zugehörigen Lade-Effekts. DIE ZWEI KACHELN DIESES
  EINTRAGS SIND UNVERÄNDERT: getEventCounts und getAdblockLoss fallen weiterhin per
  .catch() auf [] bzw. null, und die Anzeige sagt weiterhin "Noch keine Events."
  bzw. "Warte auf erste Bestätigung." — am Code neu erhoben 2026-08-01. Der Verweis
  "gehört zu 9c" ist damit ÜBERHOLT: er zeigt auf eine abgeschlossene Phase, die
  diesen Punkt nicht mitgenommen hat. Er bleibt als Zeitdokument stehen; die
  Zuordnung ist offen und gehört neu getroffen, wenn der Punkt angefasst wird.
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
  EINORDNUNG 2026-08-01: BEOBACHTETER TRADE-OFF, KEIN HANDLUNGSAUFTRAG. Wird
  angefasst, wenn jemand den Bereich ohnehin öffnet oder es im Betrieb auffällt.
  ABER HIER GIBT ES EIN ECHTES KRITERIUM STATT EINER EMPFINDUNG — die ZAHL, denn
  der Eintrag behauptet Wachstum. AM CODE GEZÄHLT (2026-08-01, Lade-Effekte OHNE
  eigenen UI-Fehlerkanal): DREI per .catch() — getEventCounts, getAdblockLoss und
  getVariantBPublished, alle in CodeImporter.tsx — und EINER per safeAction: der
  Status-Effekt je Domain-Zeile in DomainRow (er verwirft ein {ok:false} wortlos,
  hat also ebenfalls keinen Fehlerkanal). NICHT mitgezählt, weil sie einen
  Fehlerkanal HABEN und damit unter die Pflicht-Regel fallen: der Listen-Lader in
  DomainManager (loadError) und der getVariantCounts-Effekt (variantCountsFailed).
  DAMIT STEHT ES 3:1 — exakt wie bei der Erhebung am 2026-07-28. Über die
  Phase-10-Scheiben hinweg ist die Zahl NICHT gewachsen; die Sorge des Eintrags hat
  sich bisher nicht bestätigt. KRITERIUM FÜR DIE WIEDERVORLAGE: erneut zählen und
  vergleichen — steigt die Zahl, ist es ein Befund; bleibt sie, ist es Geschmack.
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
  ERSTER SCHRITT ALS AUFGABE (ergänzt 2026-08-01): DIE AUFGABE IST NICHT "FIXEN",
  SONDERN "REPRODUZIEREN". Die Hypothese oben bleibt unverändert stehen — sie ist
  weiterhin unbewiesen, und ein Fix auf eine unbewiesene Ursache wäre geraten.
  WAS EINE REPRODUKTION ZEIGEN MÜSSTE, damit sie den Namen verdient:
  (1) den EINGABEWEG, der es auslöst (frisch geladene Seite, erstes Einfügen in die
      leere Textarea — und ob Tastatur-Paste, Kontextmenü und Drag-Drop sich gleich
      verhalten);
  (2) die tatsächliche REIHENFOLGE von onPaste, dem Collapse-Re-Render und dem
      onChange-Commit (Profiler-Aufzeichnung oder Log-Punkte an den drei Stellen) —
      das ist der Kern der Hypothese;
  (3) den ZUSTAND von code und isInputCollapsed unmittelbar nach dem ersten Paste,
      der belegt, dass der Wert wirklich nicht committet wurde;
  (4) die GEGENPROBE: bei gesetztem userExpandedManually tritt es nicht auf — das
      erklärt die zweite Symptomhälfte und bestätigt oder widerlegt die Hypothese
      als Ganzes.
  ERST DANACH ist entscheidbar, ob der Fix am Collapse-Zeitpunkt, am kontrollierten
  Feld oder an beidem ansetzt.
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
  docs/claude-history/phase-10-workspace.md, Entscheidung 3). Wird zur
  VORAUSSETZUNG, sobald ein
  Bereich eigenen Projekt-Zustand bekommt: dann müsste jeder neue Zustand an drei
  Stellen nachgezogen werden, und die vierte (der Server-Seed) ist kein Handler,
  in dem man es bemerken würde.
- DOKU-NACHZUG: "PHASE 10" STEHT NOCH FÜR DEN MCP-SERVER, DER INZWISCHEN PHASE 18
  IST (erhoben 2026-07-31; Trigger: nächste Doku-Aufräumrunde — NICHT jetzt
  korrigieren):
  ERLEDIGT 2026-08-03 — abgearbeitet in der Doku-Runde nach Phase 10.5. Der
  ursprüngliche Eintragstext bleibt darunter WÖRTLICH stehen; er war in vier
  Punkten unvollständig, und genau das ist der Teil, der aufbewahrt gehört:
  (a) ES WAREN NICHT VIER FUNDSTELLEN, SONDERN ZWÖLF. Neben den vier gelisteten:
      die Überschrift und die TIMING-Zeile in future-roadmap.md, die
      SYNERGIE-Zeile ebenda, ZWEI QUELLKOMMENTARE
      (src/app/projects/domain-actions.ts, src/lib/domains/register.ts) und eine
      Stelle in einer Phasen-Historie (phase-7-hosting.md) — Letztere BEWUSST
      STEHENGELASSEN, weil Phasen-Historien Zeitdokumente sind.
  (b) "PHASE 10" IST IM REPO DOPPELT BELEGT: einmal für den MCP-Server (falsch)
      und einmal für die Workspace-Reorganisation (richtig, ZWANZIG Nennungen in
      src/, davon zehn in Testdateien). Ein pauschaler Nummernzug hätte die
      zwanzig korrekten Angaben zerstört. Der Eintrag hat diese Kollision nicht
      benannt — ohne die Gegenprobe wäre sie beim Abarbeiten unsichtbar geblieben.
  (c) DIE HIER GEFÜHRTEN ZEILENNUMMERN WAREN ZUM ABARBEITUNGSZEITPUNKT VERALTET
      (CLAUDE.md:601/1076/1144 — tatsächlich :606/:1133/:1413). Erneuter Beleg für
      die Regel "DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER"
      (docs/immer-beachten.md). Editiert wurde deshalb über den
      WORTLAUT, nicht über die Nummer.
  (d) IN DEN ZWEI QUELLKOMMENTAREN WURDE DIE NUMMER GESTRICHEN, NICHT KORRIGIERT.
      Eine Phasennummer in einem Quellkommentar ist ein wandernder Zeiger; sie war
      schon einmal falsch. Ohne sie ist die Aussage — MCP hängt sich mit eigener
      Autorisierung an denselben Eingang — dauerhaft richtig.
  DIE IM EINTRAG VERANKERTE MANIFEST-INVARIANTE WURDE EINGEHALTEN: Tier-Übersicht
  (CLAUDE.md) und Vollfassung (security-manifest-full.md) sind im SELBEN Commit
  geändert worden. Kein Item-STATUS wurde dabei berührt, nur Zeitangaben.
  Der ursprüngliche Eintragstext, unverändert:
  Die Roadmap führt den MCP-Server seit der Phasenplanung 10-18 als
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
  ERLEDIGT 2026-08-01 (Commit 4abefdc, Scheibe 10b-2) — behoben durch
  key={projectId} an der DomainManager-Aufrufstelle in PublishView: der
  Projektwechsel ist damit eine Mount-Grenze, der veraltete Zustand entsteht gar
  nicht erst. Live verifiziert; Nachweis im Test über A (veraltete Liste) und B
  (Eingabe + Fehlermeldung), beide werden rot, sobald der key fällt.
  DER EINTRAG WIRD NICHT GELÖSCHT: er trägt die Messung und die Begründung, und
  der Abschnitt "NICHT BEHOBEN" am Ende ist weiterhin aktiv.
  FORM DIESES VERMERKS = KONVENTION FÜR DIESE DATEI (bestätigt 2026-08-01):
  Status als ERSTE Zeile unter dem Titel, "WAS DER FIX NICHT BEHOBEN HAT" am Ende.
  Grund: Bei einem langen Eintrag liest sich eine Erledigt-Notiz mitten im Absatz
  bis zum Ende wie offen. Der einzige ältere Präzedenzfall (Eintrag "INVARIANTE
  (Team-Gedächtnis)" oben) setzt sein ERLEDIGT inline und ohne Datum/Hash — für
  kurze Einträge tragbar, für lange nicht.
  ACHTUNG — ALLE ZEILENNUMMERN ZU DomainManager.tsx IN DIESEM EINTRAG SIND SEIT
  10b-2 UM +16 VERSCHOBEN (ein Auflagen-Kommentar über dem State-Block). Sie
  bleiben als Zeitdokument stehen; der haltbare Anker ist der Symbolname.
  (beobachtet Stefan 2026-07-31 beim Live-Test zu Scheibe 10a-2, Ursache am Code
  GEMESSEN; Trigger GEFEUERT — Entscheidung 2026-07-31, s. ENTSCHIEDEN-Block
  unten. Behebung eingeplant als Scheibe 10b-2; der Eintrag bleibt OFFEN, bis
  10b-2 abgeschlossen ist — DIESE BEDINGUNG IST MIT DEM OBIGEN ERLEDIGT-VERMERK
  EINGETRETEN): In Projekt A eine bereits anderswo
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
  (d) EINE AUSNAHME ZU (c) — am Code gemessen UND in der laufenden App BEOBACHTET:
      Der Lade-Effect trägt ein frühes `if (!projectId) return` (:54). Beim Wechsel
      auf ein NEUES, noch ungespeichertes Projekt ("+ Neues Projekt" ->
      resetToEmpty -> setProjectId(null), CodeImporter.tsx:812ff) läuft der Effect
      also nicht, und die Liste rendert unbedingt weiter über
      `domains.length > 0` (:144) — dort steht dann die Domain-Liste des VORIGEN
      Projekts. Beim erneuten Öffnen des Panels ist sie weg (Neu-Mount), aber
      solange es offen bleibt, ist sie sichtbar.
      BEOBACHTUNGSBEFUND (Owner, 2026-07-31, laufende App): von einem Projekt mit
      verbundener Custom-Domain bei GEÖFFNETEM Einstellungs-Panel auf "+ Neues
      Projekt" gewechselt -> die Domain-Zeile des vorigen Projekts bleibt sichtbar,
      einschliesslich ihres Entfernen-Knopfs, unter dem neuen Projekt. Der Knopf
      wurde bewusst NICHT geklickt. Dieser Eintrag ruht damit NICHT mehr auf einer
      Schlusskette: die Sichtbarkeit ist BEOBACHTET, die fehlenden Riegel sind am
      Code GEMESSEN (d2). Ungetestet bleibt allein die AUSFÜHRUNG des
      Löschvorgangs — absichtlich, sie wäre destruktiv.
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
      DIESE TERMINIERUNG ÄNDERT SICH UNTER EINER BEDINGUNG: Verzögert sich 10b, oder
      bekommt jemand ausser dem Owner Zugang, wird der Fix ein eigener, VORGEZOGENER
      Schritt.
      ENTSCHIEDEN 2026-07-31, VOR der Planung: Der Fix bekommt eine EIGENE Scheibe
      10b-2, unmittelbar nach 10b-1, und wird dort als Verhaltensänderung
      DEKLARIERT. NICHT in 10b-1 mitgebaut — zwei Wirkungen mit verschiedenen
      Risikoprofilen (s. docs/claude-history/phase-10-workspace.md,
      "Scheiben-Schnitt der Phase").
      VORAUSSETZUNG, weiterhin offen und in 10b-2 zu MESSEN statt anzunehmen:
      Verschiebt ein Remount die ZAHL oder den ZEITPUNKT der Server-Aufrufe
      gegenüber heute? Und ausdrücklich mitzuprüfen: Bei einem ungespeicherten
      Projekt ist projectId null — ein Key aus einem Nullwert verhält sich nicht wie
      ein Key, und genau dieser Fall ist der BEOBACHTETE (s. (d)).
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
  -> AUFLÖSUNG DER OFFENEN MESSFRAGE (10b-2, gemessen): Die ZAHL und der ZEITPUNKT
  der Server-Aufrufe ändern sich durch den Remount NICHT — Lade- und Poll-Effect
  hängen ohnehin an [projectId], der Remount ersetzt einen deps-Neulauf durch einen
  Mount-Lauf im selben Commit. Das Poll-Intervall wird sauber abgeräumt und einmal
  neu aufgesetzt (ein Erzeuger, ein Vernichter je Effekt-Instanz); live über zwei
  Minuten gegengeprobt, kein doppeltes Intervall.
  -> WAS DER FIX NICHT BEHOBEN HAT — weiterhin OFFEN und der Grund, warum dieser
  Eintrag stehen bleibt:
     (1) handleRemove trägt weiterhin KEINEN projectId-Riegel (die Funktion beginnt
         unverändert mit setRemoving(true)); die Zeilen-Buttons sind nur
         disabled={removing}.
     (2) DomainRow bekommt projectId weiterhin NICHT als Prop (domain, pollTick,
         onChanged) und kann einen Kontextwechsel konstruktiv nicht bemerken.
     (3) Der Schutz ist eine MOUNT-Eigenschaft, kein Riegel in der Aktion: die
         veraltete Zeile ist nicht mehr erreichbar, weil sie nicht mehr EXISTIERT.
         Wird der Remount aufgehoben (key entfernt, memo davor, Zustand hochgezogen,
         Fläche dauerhaft gemountet), ist die Lücke SOFORT und STILL zurück — kein
         Typfehler, kein roter Build. Einzige Verteidigung sind die beiden Tests.
     (4) Die Grenze null -> null (zwei ungespeicherte Projekte nacheinander) ist KEIN
         Key-Wechsel und wurde bewusst NICHT konstruktiv geschlossen (verworfen: ein
         Wechselzähler, der eine fünfte Zuweisung an die vier setProjectId-Stellen
         gehängt hätte — s. Eintrag "KEIN GEMEINSAMER CHOKEPOINT FÜR DIE
         PROJEKT-WURZELN"). Heute folgenlos, weil im Null-Zustand jeder Schreibpfad
         gesperrt ist; diese Bedingung TRÄGT den Schutz und steht als Auflage über
         dem State-Block von DomainManager.
     (5) Die Label-Vergabe bleibt unprotokolliert (eigener Punkt in CLAUDE.md,
         "## Offene Punkte") — von dieser Scheibe nicht berührt.
- ZWEI SIGNAL-KANDIDATEN AUS DomainManager GELANGEN NICHT AN DIE REITERZEILE
  STATUS: OFFEN — BENANNTE GRENZE VON SCHEIBE 10c-1 (2026-08-01, Commit 065573d),
  ausdrücklich KEIN Versäumnis. 10c-1 hat GEMESSEN, dass beide Kandidaten
  signalwürdig WÄREN, und sie NICHT gebaut, weil kein Weg nach oben die
  Phase-10-Entscheidung 3 wahrt (Bereiche sind reine Kinder; DomainManager ist die
  geerbte Ausnahme). Der Eintrag trägt die Vorarbeit, damit sie nicht verlorengeht.
  DIE BEIDEN KANDIDATEN (Fundstellen am Code erhoben 2026-08-01; ANKER SIND DIE
  SYMBOLE, die Zeilen altern):
  (a) LADEFEHLER DER DOMAIN-LISTE — loadError (DomainManager.tsx:48), gesetzt in
      loadList (:63) und im Lade-Effect (:82), gerendert :154. Entsteht OHNE Zutun:
      der Effect läuft beim Mount und bei jedem projectId-Wechsel (deps :88), völlig
      unabhängig vom aktiven Reiter. Konkreter Ablauf: Drawer offen im Reiter MESSEN,
      Projekt wechseln -> DomainManager remountet (10b-2) -> Liste scheitert -> der
      rote Text steht im VERSTECKTEN Live-Bereich.
  (b) "AKTION NÖTIG" AN EINER DOMAIN-ZEILE — statusBadge (:489), Treffer bei
      fineState wrong_record/proxy_detected bzw. grob misconfigured (:497), gerendert
      über const badge (:266). Speist sich aus dem Zeilen-Status (DomainRow, status
      :189), den der Effect :219-231 aus checkDomainStatusAction (:223) holt, deps
      [domain.label, pollTick] (:231). WIEDERKEHREND: der 60-Sekunden-Poll
      (AUTO_POLL_MS :22, setInterval :94) läuft, solange der Drawer offen ist — die
      document.hidden-Pause greift NICHT, wenn der Nutzer im selben Tab nur im
      anderen Bereich arbeitet. Ein Domain-Status kann also kippen, während MESSEN
      aktiv ist. Dies ist der EINZIGE wiederkehrend im Hintergrund entstehende
      Zustand des ganzen Drawers.
      ER ERFÜLLT DAS KRITERIUM WÖRTLICH ("nur wenn der Nutzer JETZT handeln kann"):
      falscher DNS-Eintrag oder aktiver Proxy sind behebbar. Er ist damit der
      STÄRKSTE der drei Kandidaten und trotzdem der unerreichbarste.
  WARUM NICHT GEBAUT — die geprüften Wege mit ihren Kosten:
     (W1) RÜCKRUF-PROP nach oben (für (b) zwei Hops: DomainRow -> DomainManager ->
          PublishView -> Container). Erzeugt eine RÜCKWÄRTS-ABHÄNGIGKEIT (das Kind
          schiebt in den Elternteil); für (b) zusätzlich neuer Zustand in
          DomainManager, weil die Meldungen je Zeile gesammelt werden müssten.
          Nebenwirkung: PublishView verlöre sein 10a-2-Merkmal "kein einziger neu
          geschriebener Rückruf".
     (W2) LISTENZUSTAND HOCHZIEHEN (domains + loadError + Lade-Effect in den
          Container). Löst NUR (a), nicht (b). UND ER HOLT DEN 10b-2-BUG ZURÜCK: die
          Mount-Grenze hinge dann am Container, wo key={projectId} NICHT greift —
          beim Wechsel auf ein ungespeichertes Projekt bliebe die alte Liste stehen,
          exakt der gerade behobene Zustand, sofern nicht zusätzlich explizit geleert
          wird.
     (W3) STATUS JE ZEILE IN DomainManager SAMMELN (Map label -> fineState). Für (b)
          der einzige "saubere" Weg — und fügt genau den Zustand hinzu, den
          Entscheidung 3 vermeiden will.
     (W4) CONTEXT/STORE: dieselbe Klasse wie W1, nur unsichtbarer; zusätzlich ein
          neues Idiom, das das Projekt heute nicht kennt.
     (W5) CONTAINER RUFT DIE ACTIONS SELBST: zweiter Rechenweg UND doppelte
          Vercel-Calls je Poll gegen einen externen Anbieter. Ausgeschlossen.
  TRIGGER: sobald entschieden wird, ob DomainManager seinen Zustand behalten soll.
  KEIN eigener Termin — die Frage ist eine Architektur-Entscheidung, kein Bug.
  WAS OFFEN BLEIBT, falls jemand nur einen Teil angeht: (a) allein ist über W2
  erreichbar und wäre trotzdem der schwächere Kandidat; (b) ist der stärkere und hat
  KEINEN Weg, der die Entscheidung wahrt. Wer (a) baut und (b) liegen lässt, hat die
  einzige wirklich im Hintergrund entstehende Meldung weiterhin unsichtbar.
- SPEICHER-/LADEFEHLER (saveError) ÜBERLEBT DEN PROJEKTWECHSEL — ZONE BAUEN
  STATUS: OFFEN (beobachtet Stefan 2026-08-01 beim Live-Test zu Scheibe 10c-2,
  Ursache am Code GEMESSEN 2026-08-01). Kein eigener Termin; BLOCKIEREND, bevor
  jemand ausser dem Owner die App benutzt — dieselbe Bedingung wie beim Eintrag
  "DOMAINMANAGER BEHÄLT EINGABE UND FEHLERMELDUNG ÜBER DEN PROJEKTWECHSEL".
  DIE BEIDEN BEOBACHTUNGEN (Owner, wörtlich):
  (B1) "Speichern schlägt fehl (offline), die rote Meldung erscheint im Workspace.
       Projekt wechseln -> die Meldung bleibt projektübergreifend stehen."
  (B2) "Ein Projektwechsel im Offline-Modus scheitert ('Projekt konnte nicht
       geladen werden'). Danach wieder online gehen und erneut wechseln -> die
       rote Lade-Fehlermeldung bleibt stehen."
  EIN EINTRAG, NICHT ZWEI — und das ist selbst das Messergebnis: B1 und B2 tragen
  DENSELBEN Zustand und haben DIESELBE Ursache. Sie sehen nur verschieden aus, weil
  zwei verschiedene Stellen denselben Kanal befüllen.
  GEMESSENE URSACHE (Anker sind die SYMBOLE, die Zeilen altern):
  - EIN Zustandspaar für beide Fälle: saveStatus (CodeImporter.tsx:322) und
    saveError (:323). Angezeigt in der Workspace-Kopfzeile (:2450-:2453) unter der
    Bedingung saveStatus === "error" && saveError.
  - FÜNF Setz-Stellen, verteilt über vier Vorgänge: handleSave (:1229-:1230 und
    :1189-:1190), handleSwitch (:1631-:1632, der Text aus B2), handleDelete
    (:1674-:1675) und commitRename (:1730-:1731).
  - DIE EIGENTLICHE LÜCKE: applyZenForLoadedCode — die geteilte Rücksetz-Routine
    aller Projekt-Ladepfade — leert saveStatus/saveError NICHT. Sie leert
    uploadError, capiTokenStatus/capiTokenError, publishStatus/publishError/
    publishRestored und variantStatus/variantError, dazu die Busy-/Bestätigungs-
    Flags. GEGENGEPROBT: Von den FÜNF *Error-Kanälen des Containers (variantError,
    capiTokenError, publishError, saveError, uploadError) fehlt dort GENAU EINER,
    nämlich saveError. Es ist kein Muster, es ist eine einzelne Auslassung.
  - EINZIGE ENTLEERUNG heute: der Beginn des nächsten Speicherversuchs
    (setSaveError(null) in handleSave). Der Auto-Reset per Timeout gilt NUR für
    saveStatus === "saved" (Effekt :590-:594) — "error" läuft nie ab.
  ZU B2 GESONDERT, weil der Verdacht dort ein anderer war: Der Fehlerpfad in
  handleSwitch kehrt VOR setProjectId und VOR applyZenForLoadedCode früh zurück
  (:1629-:1633) — die Rücksetz-Routine läuft also gar nicht. DAS IST ABER NICHT DIE
  URSACHE, sondern nur ein erschwerender Umstand: Auch der NÄCHSTE, ERFOLGREICHE
  Wechsel räumt die Meldung nicht, weil applyZenForLoadedCode sie nicht kennt.
  Genau das beschreibt B2, und genau deshalb ist es derselbe Befund wie B1.
  NEBENBEFUND aus demselben frühen Return: setIsProjectMenuOpen(false) steht
  dahinter, das Projekt-Menü bleibt nach einem gescheiterten Wechsel also offen.
  Für einen Wiederholungsversuch plausibel, hier nur festgehalten.
  GILT FÜR ALLE LADEPFADE (gemessen): resetToEmpty und handleDelete rufen dieselbe
  Routine und lassen die Meldung damit ebenso stehen; "+ Neues Projekt" trägt den
  Fehler des vorigen Projekts also mit in ein leeres, nie gespeichertes Projekt.
  WARUM DAS MEHR ALS OPTIK IST — die Meldung ist nach dem Wechsel nachweislich
  FALSCH, und zwar auf zwei Ebenen:
  (1) TEXT: Bei B2 behauptet "Projekt konnte nicht geladen werden.", das aktuelle
      Projekt sei nicht ladbar, während sein Inhalt im Editor steht. Bei B1 bezieht
      sich der Text auf einen Speicherversuch, den es in diesem Projekt nie gab.
      Daneben steht der Name des NEUEN Projekts (activeName :839-:840 leitet
      synchron aus projects + projectId ab) — dieselbe Konstellation wie im Eintrag
      "GESTAFFELTER RÜCKBAU BEIM PROJEKTWECHSEL".
  (2) DIE PRIMÄRAKTION ÄNDERT IHRE BESCHRIFTUNG: Der Speichern-Button liest
      denselben Zustand (:2477-:2482) und heisst bei saveStatus === "error"
      "Erneut versuchen". Nach dem Wechsel steht dort also "Erneut versuchen" für
      ein Projekt, in dem nie etwas versucht wurde. Das ist der Teil, der über
      Anzeige hinausgeht: Der Nutzer liest eine Wiederholung dessen, was er zuletzt
      tat, und trifft damit ein anderes Projekt.
  EINORDNUNG — DRITTE AUSPRÄGUNG DERSELBEN FEHLERKLASSE: "eine Meldung, die für das
  FALSCHE Projekt gilt". Die beiden anderen stehen oben: "GESTAFFELTER RÜCKBAU BEIM
  PROJEKTWECHSEL" (Zahlen des Vorprojekts unter dem neuen Namen, Zone MESSEN) und
  "DOMAINMANAGER BEHÄLT EINGABE UND FEHLERMELDUNG ÜBER DEN PROJEKTWECHSEL" (Zone
  LIVE, inzwischen behoben). Dieser hier ist die Ausprägung in ZONE BAUEN — und
  damit die letzte der drei Zonen. Das legt nahe, dass die Klasse strukturell ist
  und nicht dreimal zufällig auftrat; s. auch "KEIN GEMEINSAMER CHOKEPOINT FÜR DIE
  PROJEKT-WURZELN".
  NICHT VON PHASE 10 VERURSACHT — gemessen, nicht behauptet: Über den GESAMTEN
  Phase-10-Bereich (6982dba~1..31b8ab2, 19 Commits) enthält der Diff von
  CodeImporter.tsx KEINE EINZIGE hinzugefügte oder entfernte Zeile mit saveError
  oder saveStatus, und weder der Rumpf von handleSwitch noch handleDelete noch
  applyZenForLoadedCode wurde angefasst. Der Befund ist älter als die Phase; 10c-2
  hat ihn nur sichtbar gemacht.
  WIE GEFUNDEN — die Lehre trägt weiter als der Bug: Live-Schritt 4 zu 10c-2 prüfte,
  dass saveError den DRAWER-Reset ÜBERLEBT (Übergriffs-Wächter, er tut es). Beim
  Danebenschauen fiel auf, dass er auch den PROJEKTWECHSEL überlebt, wo er es NICHT
  sollte. Ein Test prüft "bleibt bei X stehen"; die Frage "sollte er bei Y auch
  stehenbleiben?" stellt keiner. WER EINEN ÜBERLEBENS-TEST SCHREIBT, PRÜFT IM SELBEN
  ZUG, WELCHE ANDEREN GRENZEN DERSELBE ZUSTAND ÜBERLEBT — die Antwort ist dort
  billig zu haben und später teuer.
  FIX-KANDIDAT, AUSDRÜCKLICH NICHT ENTSCHIEDEN: setSaveStatus("idle") +
  setSaveError(null) in applyZenForLoadedCode aufnehmen — eine Zeile mehr in der
  Routine, die die vier anderen Kanäle bereits leert.
  VORHER ZU MESSEN, statt es anzunehmen:
  (a) Der Fehlerpfad von handleSwitch kehrt VOR der Routine zurück. Ein Reset IN der
      Routine räumt die Meldung damit erst beim nächsten ERFOLGREICHEN Wechsel — das
      löst B2, aber es lässt die Meldung während der gescheiterten Versuche stehen,
      was dort richtig ist. Prüfen, ob das die gewünschte Semantik ist.
  (b) applyZenForLoadedCode wird auch von switchVariant und vom Erfolgspfad von
      handleRemoveVariantB gerufen. Ein Reset dort leert den Speicher-Fehler also
      AUCH beim Varianten-Umschalten. Ob das erwünscht ist, ist eine eigene Frage —
      und genau die Art Kopplung, wegen der 10c-2 diese Routine bewusst NICHT
      wiederverwendet hat.
  (c) Der Umfang: NUR saveError/saveStatus, oder gehört der Fall in eine grössere
      Runde zusammen mit "KEIN GEMEINSAMER CHOKEPOINT FÜR DIE PROJEKT-WURZELN"?
      Drei Ausprägungen derselben Klasse sprechen für die grössere Runde.
- HALB BESTÄTIGTE DESTRUKTIVE ABFRAGEN ÜBERLEBEN DAS SCHLIESSEN DES DRAWERS
  STATUS: OFFEN — GEMESSENER, BEWUSST NICHT MITGEBAUTER BEFUND AUS SCHEIBE 10c-2
  (2026-08-01, Commit 31b8ab2). Kein eigener Termin; BLOCKIEREND, bevor jemand ausser
  dem Owner die App benutzt — dieselbe Bedingung wie bei den beiden anderen
  Projektwechsel-/Sitzungs-Einträgen oben.
  BEFUND: Klickt der Nutzer "CAPI-Token entfernen" oder "Variante B entfernen", steht
  die zweistufige Bestätigung offen ("Tracking für dieses Projekt deaktivieren? Der
  Token wird gelöscht." bzw. "Variante B endgültig entfernen? Ihr HTML und ihre
  Verknüpfungen gehen verloren."). Schliesst er den Drawer, ohne zu bestätigen oder
  abzubrechen, steht die Abfrage beim nächsten Öffnen wieder da — auch Stunden
  später, ohne jeden Bezug zu dem, was der Nutzer dann gerade tut.
  GEMESSEN (Anker sind die SYMBOLE, die Zeilen altern):
  - Die Flags liegen im CONTAINER, nicht in den Ansichten: capiRemoveConfirming
    (CodeImporter.tsx:266) und variantBRemoveConfirming (:237); dazu die Busy-Flags
    capiRemoving (:267) und variantBusy (:219). Sie werden als Props durchgereicht
    (:2084-:2085 bzw. :2118-:2119) und in MeasureView.tsx:223 bzw. PublishView.tsx:295
    gerendert.
  - DESHALB überleben sie das Schliessen: Das Drawer-Gate baut nur die FLÄCHE ab
    (I1); der Container bleibt gemountet, seine Zustände sterben nicht mit ihr.
  - ZURÜCKGESETZT werden sie heute an drei Sorten von Stellen, aber an KEINER, die
    mit dem Drawer zu tun hat: beim Projektwechsel über applyZenForLoadedCode (:895,
    :909) und jeweils am Ende ihres eigenen Vorgangs (handleRemoveVariantB :1124 im
    Erfolgs- und :1128 im Fehlerzweig; handleRemoveCapiToken :1284 bzw. :1289).
  - NICHT BETROFFEN und der lehrreiche Gegenfall: die Zeilen-Bestätigung im
    DomainManager (confirming, DomainManager.tsx:194, gerendert :304) verschwindet
    beim Schliessen von selbst — sie stirbt mit dem Unmount der Komponente. Wo der
    Zustand dort liegt, wo er hingehört, löst sich das Problem ohne Zutun.
  EINORDNUNG — DIESELBE FEHLERKLASSE WIE DER STATUSKANAL AUS 10c-2, IN EINER HINSICHT
  SCHÄRFER: Dort blieb ein HINWEIS stehen; hier bleibt eine SCHARF GESTELLTE
  DESTRUKTIVE AKTION stehen, deren Auslöser der Nutzer vergessen haben kann. Der
  nächste Klick auf "Ja, entfernen" löscht dann wirklich (CAPI-Token bzw. das HTML
  und die Verknüpfungen von Variante B). Verwandt mit "DOMAINMANAGER BEHÄLT EINGABE
  UND FEHLERMELDUNG ÜBER DEN PROJEKTWECHSEL" (dort war es der Entfernen-Knopf einer
  veralteten Zeile), nur auf der Sitzungs- statt auf der Projekt-Achse.
  WARUM 10c-2 IHN NICHT MITGENOMMEN HAT — bewusste Grenze, kein Übersehen: Eine
  offene Bestätigung ist eine BEDIENABSICHT, kein Statuskanal. Die Scheibe war auf
  "der Statuskanal endet mit der Sitzung" geschnitten, und ihr Reset räumt genau vier
  Werte. Die Bestätigungs-Flags mitzunehmen hiesse, eine zweite Fehlerklasse in
  denselben Nachweis zu packen — dieselbe Vermischung, die bei 10b und 10c bewusst
  vermieden wurde.
  FIX-KANDIDAT, AUSDRÜCKLICH NICHT ENTSCHIEDEN: die beiden Flags (und ihre
  Busy-Partner) in resetDrawerStatusChannel aufnehmen — mechanisch trivial.
  VORHER ZU ENTSCHEIDEN, nicht anzunehmen:
  (a) IST "ABBRECHEN" DIE RICHTIGE ANTWORT? Ein Reset bricht die Abfrage stillschwei-
      gend ab. Das ist bei einer destruktiven Aktion vermutlich richtig, aber es ist
      eine Produktentscheidung: Der Nutzer hat den Knopf bewusst gedrückt.
  (b) BEIM ÖFFNEN ODER BEIM SCHLIESSEN? Der Statuskanal wird beim ÖFFNEN geräumt
      (Nachzügler-Loch, s. 10c-2). Für eine Bestätigung gilt dieselbe Überlegung
      nicht — dort gibt es keinen Nachzügler; ein Reset beim Schliessen wäre
      ehrlicher, weil die Abfrage dann nicht unsichtbar weiterlebt. Das wären dann
      ZWEI verschiedene Zeitpunkte in derselben Fläche, und genau das gehört
      entschieden statt nebenbei gebaut.
  (c) GEHÖREN DIE BUSY-FLAGS DAZU? capiRemoving/variantBusy sind KEINE Absicht,
      sondern die Anzeige eines laufenden Vorgangs. Sie zurückzusetzen, während der
      Vorgang noch läuft, entsperrte einen Button, der gesperrt sein soll — hier
      wäre ein Reset SCHÄDLICH. Die beiden Sorten dürfen nicht in einen Topf.
- EXTRAKTION DES BAUEN-BEREICHS AUS CodeImporter.tsx
  STATUS: OFFEN — BEWUSST AUFGESCHOBENER UMFANG AUS PHASE 10 (Entscheidung 5,
  ausgelagert 2026-08-01). Er stand dort unter "Ausdrücklich NICHT in dieser Phase"
  und hätte nach der Archivierung nur noch im Archiv gelebt; deshalb dieser Eintrag.
  Ein Eintrag zu viel kostet Lesezeit, ein verlorener Punkt kostet die Sache.
  WORUM ES GEHT: Phase 10 hat MESSEN und VERÖFFENTLICHEN in eigene Komponenten
  gezogen (MeasureView, PublishView). BAUEN — der Drei-Zonen-Workspace mit
  Code-Eingabe, Elementliste, Vorschau/Edit-iframe und ActionPanel — blieb im
  Container.
  DIE DREI GRÜNDE FÜR DIE AUSLASSUNG, alle aus Entscheidung 5:
  (1) Am Bauen-Bereich hängt der GESAMTE Handler-Block. Am Code neu gemessen
      (2026-08-01): CodeImporter.tsx trägt 31 Funktionen im Komponenten-Rumpf, von
      resetToEmpty bis commitRename, dazu 48 useState, 11 useMemo und 6 useRef. Die
      Zonen MESSEN und VERÖFFENTLICHEN kamen mit 18 bzw. 20 Props aus; für BAUEN
      trägt die Phase-10-Datei KEINE Prop-Schätzung, und der Grund dafür steht dort:
      es wurde nicht durchgerechnet, weil die Auslassung schon aus (2) und (3) folgt.
      Wer es angeht, rechnet es zuerst aus.
  (2) Der Bereich darf NIE unmounten (Entscheidung 2): An ihm hängt der
      ungespeicherte Entwurf. Eine Extraktion ist deshalb nur als VERSTECKEN
      denkbar, nicht als Aushängen — s. die Regel "Eine Komponente mit eigenem
      Zustand darf nicht hinter einem Umschalter liegen, der sie aushängt" in der
      Root-CLAUDE.md.
  (3) Der Nutzen war für Phase 11 nicht abrufbar: Phase 11 lädt ausschliesslich in
      den Messen-/Tracking-Bereich. Eine Bauen-Extraktion hätte Risiko erzeugt, ohne
      das Problem zu lösen, das die Phase auslöste.
  TRIGGER: wenn eine Phase den Bauen-Bereich ohnehin invasiv anfasst — dann ist der
  Aufwand ohnehin da und die Extraktion kostet nur noch die Differenz. KEIN eigener
  Termin; ausdrücklich "aufgeschoben, nicht ausgeschlossen".
  VOLLE HERLEITUNG: docs/claude-history/phase-10-workspace.md, Entscheidung 5.
- DER DRITTE STATUSKANAL (variantStatus/variantError) ENDET NICHT MIT DER
  DRAWER-SITZUNG
  STATUS: OFFEN — BENANNTE LÜCKE VON SCHEIBE 10c-2 (Entscheidung O1, Commit
  31b8ab2, ausgelagert 2026-08-01). 10c-2 löst ZWEI VON DREI Kanälen; das war so
  entschieden und wurde nicht kaschiert. Der Punkt stand unter "Noch offen" und
  hätte nach der Archivierung nur noch dort gelebt.
  WORUM ES GEHT: Der Statuskanal des Einstellungs-Drawers wird beim ÖFFNEN geleert
  (resetDrawerStatusChannel) — publishStatus/publishError und
  capiTokenStatus/capiTokenError. variantStatus/variantError bleiben ausgenommen
  und überleben damit Reiterwechsel UND Schliessen.
  GRUND FÜR DIE AUSNAHME (am Code gemessen, 2026-08-01): Der Kanal hat DREI
  Auslöser, und einer davon — handleCreateVariantB, ausgelöst vom "+ Variante
  B"-Knopf — sitzt in der TOOLBAR und ist bei GESCHLOSSENEM Drawer klickbar. Sein
  Fehler wird auch dort angezeigt (die Toolbar-Stelle greift bei !hasVariantB; die
  Drawer-Stelle liegt im hasVariantB-Block von PublishView, beide schliessen sich
  gegenseitig aus). Der Kanal ist strukturell nicht Teil der Drawer-Sitzung.
  DIE VIER GEPRÜFTEN OPTIONEN (10c-2, Stufe 1):
  (O1, GEWÄHLT) Kanal ganz ausnehmen. Kosten: zwei von drei Kanälen gelöst.
  (O2, VERWORFEN) Nur zurücksetzen, wenn hasVariantB — also wenn die Meldung im
      Drawer stand. Technisch trivial, aber ein ZWEITES URTEIL über den Anzeigeort:
      dieselbe Duplikat-Klasse, die 10c-1 nur deshalb akzeptiert hat, weil es dort
      keine Alternative gab. Hier gab es eine. DAS IST DER KERN DER ENTSCHEIDUNG —
      wer den Punkt später angeht, muss sie kennen, sonst greift er zu O2 als
      "offensichtlicher" Lösung.
  (O3, VERWORFEN) Den Kanal trennen (eigener Zustand für den Toolbar-Fall). Der
      Code hat "Ein State, zwei Orte" BEWUSST so gebaut; das aufzubrechen ist ein
      eigener Umbau mit eigenem Nachweis.
  (O4, VERWORFEN) Mit zurücksetzen und den Verlust hinnehmen: löscht eine Meldung
      ausserhalb des Drawers, die der Nutzer eventuell nie gelesen hat.
  ACHTUNG — T5 BEWACHT HEUTE, DASS DER KANAL DRAUSSEN BLEIBT: Der Test "ein
  Varianten-Fehler ÜBERLEBT Schliessen und Öffnen" (10c-2-Block in
  CodeImporter.test.tsx) wird ROT, sobald jemand den Kanal aufnimmt — Mutation M3
  hat das belegt, und er ist der EINZIGE Test, der es fängt. Wer den Punkt umsetzt,
  ändert diesen Test BEWUSST und begründet die Änderung; ein "der Test ist wohl
  veraltet" wäre genau der Fehler, gegen den er geschrieben wurde.
  TRIGGER: kein eigener Termin. Fällig, sobald der Toolbar-Auslöser verschwindet
  oder der Kanal getrennt wird — dann ist die Ausnahme gegenstandslos.
  VOLLE HERLEITUNG: docs/claude-history/phase-10-workspace.md, Scheibe 10c-2.
- I3 IN DER WEITERGEHENDEN LESART: "NICHT BESUCHT" UND "IN ORDNUNG" SEHEN GLEICH AUS
  STATUS: OFFEN — VON SCHEIBE 10c-1 AUSDRÜCKLICH NICHT ANGEGANGEN (ausgelagert
  2026-08-01). Der Punkt stand unter "Noch offen" und hätte nach der Archivierung
  nur noch im Archiv gelebt.
  WORUM ES GEHT: Invariante I3 der Phase 10 lautete wörtlich: "Die Trennung darf
  keinen Zustand verstecken. Pro Bereich wird benannt, welche Zustände
  aufmerksamkeitswürdig sind und wie sie an der Navigation SELBST sichtbar werden —
  'nicht besucht' und 'in Ordnung' dürfen nicht gleich aussehen." 10c-1 hat davon
  NUR die Fehler-Hälfte gelöst: ein handlungsfähiger Fehler, der im unsichtbaren
  Bereich entsteht, leuchtet an der Reiterzeile. Die andere Hälfte steht offen.
  WAS ES KONKRET HIESSE: Ein Reiter müsste unterscheidbar machen, ob der Nutzer
  seinen Bereich in diesem Projekt je geöffnet hat — also ein BESUCHT-Zustand je
  Bereich und je Projekt. Das ist ein neues Konzept, keine Fehleranzeige: Es
  braucht einen persistenten oder zumindest projekt-gebundenen Zustand (wo? settings
  ist client-besessen und wird ganzheitlich ersetzt — s. "SERVER-EIGENE IDENTITÄT
  NIE IN EINEN CLIENT-BESESSENEN BLOB" in der Root), eine Regel für sein Ende und
  eine Antwort darauf, was "besucht" nach einer Änderung im Bereich bedeutet.
  WARUM 10c-1 ES NICHT ANGING: Die Scheibe war auf das geschärfte Signal-Kriterium
  geschnitten — "ein Signal leuchtet NUR, wenn der Nutzer JETZT etwas tun kann".
  Ein "nicht besucht"-Hinweis erfüllt das gerade NICHT: Er ist ein normaler
  Anfangszustand und würde bei jedem frischen Projekt an beiden Reitern leuchten —
  genau die Signal-Ermüdung, die das Kriterium ausschliesst. Der Punkt ist damit
  kein vergessener Rest, sondern einer, der ohne ein anderes Anzeige-Mittel als das
  Fehler-Signal nicht lösbar ist.
  TRIGGER: kein eigener Termin. Sinnvoll erst mit einem Onboarding-/Fortschritts-
  Konzept, das ohnehin einen Besucht-Zustand braucht.
  VOLLE HERLEITUNG: docs/claude-history/phase-10-workspace.md, Invariante I3 und
  Scheibe 10c-1.
- MATCHER DER KONVENTIONSDATEI SCHLIESST DIE INGEST-PFADE NICHT AUS
  STATUS: OFFEN — BEWUSST NICHT TEIL VON PHASE 10.5 (angelegt 2026-08-03 bei der
  Eröffnung jener Phase, aus deren Aufklärung der Befund stammt).
  BEFUND (gemessen 2026-08-03): Der Matcher in src/middleware.ts:34-46 ist ein
  einziger negativer Ausdruck und schliesst NUR vier Dinge aus — _next/static,
  _next/image, favicon.ico und die aufgezählten Bilddateien. /api/e und /api/capi
  sind damit GEMATCHT: die Konventionsdatei läuft bei jedem Beacon jedes Besuchers
  jeder Kundenseite an und tut dort nichts weiter, als den Request durchzureichen
  (src/middleware.ts:25-28, exakter Pfad-Vergleich, dann NextResponse.next()). Ein
  Ausschluss im Matcher wäre schneller als ein Passthrough im Code — der Ausschluss
  greift, bevor die Funktion überhaupt startet.
  GRENZE, UND SIE IST DER GRUND FÜR DIE ABTRENNUNG: Das ist eine
  Verhaltensänderung auf dem HEISSESTEN Pfad der Anwendung. Greift der Ausschluss
  zu weit, verliert die Kunden-Domain ihre Host-Weiche — dann läuft die
  Host-Verzweigung für betroffene Pfade gar nicht mehr, und der Ausfall ist nicht
  laut, sondern still. Damit hat der Punkt ein ANDERES Risikoprofil als eine reine
  Umbenennung, die den Rumpf unangetastet lässt. Beides in einen Schnitt zu legen
  hiesse, im Fehlerfall nicht mehr unterscheiden zu können, welche der beiden
  Änderungen ihn verursacht hat.
  ERSTER SCHRITT (am Code, vor jedem Plan): klären, ob der Passthrough-Zweig
  ausser dem Durchreichen noch etwas tut, das bei einem Matcher-Ausschluss
  ENTFIELE — und zwar für beide Pfade getrennt, /api/e und /api/capi. Solange das
  nicht am Code beantwortet ist, gibt es keinen Plan, sondern nur eine Vermutung.
  BEZUG: CLAUDE.md, "## Code-Qualität, Performance & SaaS-Skalierung", Abschnitt
  A, Regel "/API/E-SCHLANKHEIT" — sie benennt genau diesen Pfad als den realen
  Hotspot, weil jeder zusätzliche Aufwand dort sich mit dem Traffic ALLER Kunden
  zusammen multipliziert.
  TRIGGER: kein eigener Termin.
- TTFB DER KUNDENSEITE — DAS PRODUKTVERSPRECHEN IST NICHT GEDECKT
  STATUS: OFFEN (angelegt 2026-08-03 am Phasenende 10.5).
  BEFUND, GEMESSEN: Auf Commit 9ccd044 (VOR dem Umzug) warm 519 ms (cached) bis
  1.780 ms (dynamisch), kalt 1.830 ms. Auf Commit c40ebb8 (NACH dem Umzug)
  450-476 ms über drei Aufrufe.
  GRENZE — DIE BEIDEN REIHEN SIND NICHT VERGLEICHBAR, und das ist der wichtigste
  Satz dieses Eintrags: Die Vorher-Reihe streut über einen FAKTOR DREI und
  vermischt gecachte mit dynamischen Auslieferungen. Der Unterschied zwischen den
  Reihen darf NICHT als Verbesserung gelesen werden — er ist UNGEKLÄRT. Wer ihn
  als Erfolg des Umzugs verbucht, schreibt eine Verbesserung fest, die niemand
  gemessen hat, und verliert damit den Anlass, sauber nachzumessen.
  WARUM DER EINTRAG TROTZDEM STEHT, unabhängig von der Vergleichbarkeit: Das
  Produktversprechen lautet "ultraschnelles reines HTML statt WordPress-Ballast"
  (s. Vision in der Root-CLAUDE.md). In DIESEN Grössenordnungen trägt der Satz
  nicht — und zwar in beiden Reihen. Das ist kein Messfehler, sondern eine Lücke
  zwischen Anspruch und Ist.
  ERSTER SCHRITT, in dieser Reihenfolge: (1) Eine saubere Messreihe auf EINEM
  Regime — dynamisch, Cache aus —, zehn Aufrufe, die ersten drei verworfen. Erst
  damit gibt es überhaupt eine belastbare Zahl. (2) Danach am Code klären, WO die
  Zeit hingeht: /app-serve, die Supabase-Abfrage, die Auslieferung — ODER der
  VERBINDUNGSAUFBAU, s. den vierten Kandidaten gleich darunter. Heute weiss das
  niemand.
  VIERTER KANDIDAT — VERBINDUNGSAUFBAU (DNS, TLS, Erstkontakt), GEMESSEN
  2026-08-03: Auf dem APP-HOST, frisches Inkognito-Fenster nach über zehn Minuten
  Ruhe, dauerte es 612 ms bis zur Antwort. Davon entfallen rund 50 ms auf die
  Konventionsdatei selbst — das ist der warme, eingeschwungene Wert DERSELBEN
  Route. Die Differenz von rund 560 ms ist Verbindungsaufbau.
  GRENZE: gemessen auf dem APP-Host, NICHT auf einer Kunden-Domain. Ob dort
  dieselbe Grössenordnung anfällt, ist UNGEPRÜFT — Kunden-Domains haben eigene
  DNS- und Zertifikatswege.
  WARUM DER KANDIDAT DAZUGEHÖRT: Auf einer Landingpage ist praktisch jeder
  Besucher ein Erstbesucher. Ein Anteil dieser Grösse wäre damit der GRÖSSTE
  Einzelposten — und er kam in keinem der drei bisherigen Kandidaten vor, die
  alle erst NACH dem Verbindungsaufbau ansetzen.
  KANDIDAT, KEINE DIAGNOSE: Dass die Zahl gross ist, sagt nicht, dass sie
  vermeidbar ist. Was daraus folgt, entscheidet Schritt (2), nicht dieser Eintrag.
  KEIN ZIEL FESTLEGEN, bevor (2) beantwortet ist. Eine Zielzahl ohne Kenntnis des
  Engpasses ist geraten und lenkt die Arbeit an die falsche Stelle.
  ZWEITER, GETRENNTER PUNKT — ABRECHNUNG DER FUNCTION-AUFRUFE (eigene Achse,
  nicht Teil der Latenzfrage): Ob Vercel auf dem HOBBY-Plan Edge-Middleware-
  Aufrufe und Node-Function-Aufrufe GLEICH verrechnet, ist UNGEMESSEN. Seit dem
  Umzug (Phase 10.5) läuft jeder Beacon als Node-Function-Aufruf. Das wiegt hier
  schwerer als eine Kostenfrage sonst: Der Ausfallmodus des Hobby-Plans ist ein
  HARTER STOPP, keine Rechnung — also ausgefallene Kundenseiten, nicht ein
  überraschender Rechnungsbetrag.
  TRIGGER: vor echtem Ad-Traffic.
- PAGEVIEW-EMITTER IGNORIERT EINE ERTEILTE ABLEHNUNG
  STATUS: OFFEN — BLOCKIEREND VOR FREMDNUTZUNG (erhoben 2026-08-03 in der
  Aufklärung zur Phase-11-Eröffnung).
  BEFUND, GEMESSEN: buildPageViewScript (src/lib/analytics/pageview-emitter.ts:30-52)
  ruft WEDER psConsent NOCH window.pagesmithConsent. Die IIFE feuert nach dem
  window.__ps_pv-Guard (:33) unbedingt einen Beacon an /api/e (:45). Von den ZWEI
  first-party-Inline-Skripten einer publizierten Seite ist damit EINES gegated
  (das Wiring-Skript, generate.ts:346-352, enthält psConsent) und EINES NICHT.
  WAS DABEI TATSÄCHLICH GESCHRIEBEN WIRD — bewusst genau benannt, weil eine zu
  weite Fassung den Punkt schwächt: persistEvent schreibt project_id, event_type,
  event_id, source, variant und created_at, ausdrücklich KEIN IP/UA
  (src/lib/analytics/persist.ts:75, PersistEventParams :34-57). IP und User-Agent
  werden im Ingest NUR innerhalb des Forward-Blocks aufgelöst
  (src/lib/capi/ingest.ts:316-317, umschlossen von der Bedingung in :313) — und
  den erreicht ein PageView nie, weil isForwardable ihn ausschliesst
  (src/lib/analytics/events.ts:34-36). Der Defekt ist also KEINE
  PII-Erhebung gegen den Willen des Besuchers; er ist eine MISSACHTETE ABLEHNUNG.
  WARUM ES EIN DEFEKT IST, ohne jede rechtliche Wertung: Es trifft ausgerechnet
  den Betreiber, der den Hook implementiert HAT. Sein Besucher lehnt ab, der
  Conversion-Pfad hält sich daran (meta.ts:163), der PageView-Pfad nicht. Das
  System liest ein Nein und überschreibt es auf EINEM VON ZWEI Wegen —
  inkonsistent mit dem eigenen Entwurf. Ein Betreiber, der die eine Hälfte
  geprüft hat, hat keinen Anlass, die andere zu vermuten.
  VERMUTETE URSACHE (als VERMUTUNG gekennzeichnet, nicht gemessen): zwei
  Erzeugungswege. Der Emitter wird beim Publish per reiner String-Operation
  eingefügt (injectPageViewEmitter, aufgerufen in src/app/projects/actions.ts:974
  und :1004), das Wiring-Skript kommt aus dem Generator. Die Consent-Regel kennt
  nur einer der beiden Wege.
  ERSTER SCHRITT: klären, gegen WELCHEN Schlüssel der Emitter prüfen soll. Das
  hängt an der offenen Frage (a) der Phase 11 (Schlüssel-Namensraum) und lässt
  sich davor nicht beantworten, ohne den Namen zu präjudizieren.
- DER CONSENT-HOOK IST EINE SCHNITTSTELLE, DIE NIEMAND KENNT
  STATUS: OFFEN — BLOCKIEREND VOR FREMDNUTZUNG (erhoben 2026-08-03 in der
  Aufklärung zur Phase-11-Eröffnung).
  BEFUND, GEMESSEN: Pagesmith LIEST window.pagesmithConsent an DREI Stellen
  (src/lib/tracking/meta.ts:105-106, :114, :163) und SETZT es an NULL. Kein
  Banner, keine Komponente, keine Einstellung, kein Hinweis im Produkt — die
  Repo-weite Suche findet als Setzer ausschliesslich zwei vi.stubGlobal-Aufrufe
  in Tests. Fehlt der Hook, liefert psConsent() true (meta.ts:107).
  WARUM ES EIN PRODUKTBEFUND IST, kein Rechtsgutachten: Als ARCHITEKTUR ist die
  Aufgabenteilung vertretbar — der Seitenbetreiber ist der Verantwortliche, und
  ein Hook, den er bedient, ist ein legitimer Übergabepunkt. Aber NICHTS im
  Produkt sagt ihm, DASS es diesen Hook gibt. Er erfüllt eine Bedingung nicht,
  von der er nichts weiss.
  DIESELBE FEHLERKLASSE WIE "TRACK-AKTION OHNE PIXEL-ID": eine unsichtbare
  Bedingung mit stillem Ausfall — nur dass der Ausfall hier nicht das Tracking
  betrifft, sondern seine Voraussetzung.
  AUSDRÜCKLICH NICHT EMPFOHLEN: den Client-Default auf false zu drehen. Das
  würde das Tracking JEDES bestehenden Kunden augenblicklich abschalten, ohne
  dass einer davon etwas falsch gemacht hätte. Die Richtung des Standardwerts
  ist eine PRODUKTENTSCHEIDUNG MIT UMSTELLUNGSPFAD, kein Einzeiler. (Das
  beschlossene Consent-Modell der Phase 11 hält den Top-Level-Default aus genau
  diesem Grund permissiv und zieht die Strenge nur in die neue Objektform.)
  ERSTER SCHRITT: entscheiden, WO IM PRODUKT der Betreiber davon erfährt. Fällt
  mit der Produktanforderung aus dem aktiven Stand der Phase 11 zusammen (die
  vollständige Schlüsselliste muss dort stehen, wo Tracking eingerichtet wird) —
  beide sind dieselbe Frage, einmal für den Hook und einmal für seine Schlüssel.
- RESERVIERTE NAMEN SIND NICHT GESCHÜTZT
  STATUS: OFFEN (erhoben 2026-08-03).
  BEFUND, GEMESSEN: TrackConfig.event ist ein freier String; die EINZIGE
  Validierung ist eine Leerprüfung (src/components/ActionPanel.tsx:554,
  "const valid = event.trim() !== ''"). Nichts hindert einen Betreiber daran, ein
  Event __ps_pageview zu nennen — dann greift isForwardable
  (src/lib/analytics/events.ts:34-36) und der CAPI-Forward dieses Events
  unterbleibt LAUTLOS: kein Fehler, keine Meldung, nur eine Conversion, die nie
  bei Meta ankommt.
  DER SCHUTZ IST PROBABILISTISCH, NICHT DURCHGESETZT: Er steht als Begründung im
  Kommentar an der Konstante — der Token sei "praktisch nicht versehentlich
  eintippbar" (events.ts:21-23). Das ist eine Wahrscheinlichkeitsaussage, keine
  Prüfung. GEMESSEN: Es gibt KEINE zentrale Liste reservierter Namen und KEINE
  gemeinsame Prüf-Funktion; die beiden reservierten Token (__ps_pageview,
  events.ts:24; __ps_browser, events.ts:65) sind ausschliesslich an ihren eigenen
  Deklarationen als reserviert vermerkt.
  WARUM ES JETZT WICHTIGER WIRD: Phase 11 eröffnet mit den Consent-Schlüsseln
  einen ZWEITEN Namensraum, in dem der Betreiber schreibt — und dort sind die
  Namen kurz und naheliegend (meta, custom, analytics). Eine Kollision ist damit
  wahrscheinlicher als bei __ps_pageview, wo die Unwahrscheinlichkeit selbst der
  Schutz war.
  ERSTER SCHRITT: erheben, WELCHE Namen im Produkt reserviert sind und WO das
  jeweils festgehalten ist. Solange es keine Liste gibt, kann keine Prüfung sie
  durchsetzen — und eine Prüfung ohne vollständige Liste wäre schlimmer als
  keine, weil sie Vollständigkeit suggeriert.
- WITH-CHECK-POLICIES DER GEHEIMNIS-TABELLE: SCHREIBWEG AM GATE VORBEI?
  STATUS: OFFEN — ZU PRÜFEN (erhoben 2026-08-03).
  DIES IST EINE ABLEITUNG AUS DEM POLICY-TEXT, KEINE MESSUNG. Die Kennzeichnung
  ist Teil der Aussage: NIEMAND HAT ES VERSUCHT. Wer diesen Eintrag später liest,
  liest eine Vermutung, keinen Befund — und darf ihn nicht als solchen zitieren.
  GEMESSEN IST NUR: Die Insert-Policy in
  supabase/migrations/0005_project_tokens.sql:38-39 verlangt ausschliesslich
  auth.uid() = user_id, NICHT dass das Projekt dem Nutzer gehört — die
  Migrationsdatei sagt das selbst (:35-37: "WITH CHECK prueft NUR user_id, NICHT
  dass project_id dem User gehoert"). Der anon-Schlüssel liegt öffentlich im
  ausgelieferten Bundle (docs/immer-beachten.md, "GRANTS SCHÜTZEN NICHTS").
  DER VERDACHT, ALS VERDACHT: Ein beliebiger eingeloggter Nutzer könnte damit
  direkt gegen die Tabelle schreiben und eine Token-Zeile für ein FREMDES Projekt
  anlegen, sofern dort noch keine existiert. Das Ownership-Gate der Server-Action
  (src/app/projects/actions.ts:566-580) wird dabei NICHT durchlaufen, weil dieser
  Weg daran vorbeigeht.
  UNGEPRÜFT UND ENTSCHEIDEND — zwei Dinge, ohne die der Verdacht weder bestätigt
  noch entkräftet ist: (1) ob RLS im LAUFENDEN Katalog so steht wie in der Datei,
  und (2) was der Fremdschlüssel auf die Projekte zulässt.
  VERMUTETE AUSWIRKUNG, KLEIN: ein fremder Token zu einer fremden Pixel-ID lässt
  Forwards scheitern. Es wäre aber ein UNAUTORISIERTER SCHREIBZUGRIFF auf die
  Tabelle mit den Geheimnissen — und das ist die Achse, auf der es zählt, nicht
  die Auswirkung.
  ERSTER SCHRITT: am LAUFENDEN Katalog prüfen, welche Policies dort tatsächlich
  stehen. Die Migrationsdatei ist NICHT der Beweis dafür — dieselbe Unterscheidung
  wie bei ensure_rls (s. Root-CLAUDE.md, "## Offene Punkte"). Erst danach
  entscheiden, ob überhaupt etwas zu tun ist.
  BEZUG: Die Entscheidung zur NEUEN Tabelle (Phase 11, aktiver Stand, Punkt (d))
  nimmt diese Policies bewusst NICHT mit — sie trägt RLS mit LEERER Policy-Liste.
  Der Verdacht wandert damit nicht weiter; er betrifft ausschliesslich die
  BESTEHENDE Tabelle.

- IMPORTIERTES HTML KANN BELIEBIGE SKRIPTE MITBRINGEN, AM CONSENT VORBEI
  STATUS: OFFEN (gemessen 2026-08-04).
  BEFUND, GEMESSEN: Weder annotateAndDetect (Import/Vorschau) noch
  generateFunctional im Modus "export" (Export/Veröffentlichen) entfernt
  <script>. Beide sind reine DOMParser-Round-Trips und führen externes wie
  inline <script> verbatim mit; ein Sanitizer existiert an keiner Stelle des
  Pfades. Nachgewiesen mit einer Wegwerf-Probe gegen die echten Pfade, danach
  entfernt.
  WARUM DAS DIE CONSENT-ARCHITEKTUR BETRIFFT: Der Gate deckt, was PAGESMITH
  einbettet. Was die SEITE SELBST mitbringt, läuft daran vorbei. Der Regelfall
  des Produkts ist importiertes, oft KI-erzeugtes HTML — das häufig
  Analytics-Schnipsel enthält, die der Betreiber nicht bewusst wahrgenommen hat.
  Wer den Consent-Hook implementiert, hält seine Seite danach für konform; für
  alles in seinem eigenen HTML stimmt das nicht.
  EINORDNUNG, ohne Dramatisierung: Es ist SEIN Code auf SEINER Seite, also seine
  Verantwortung. Das Produkt sagt es ihm aber nirgends — dieselbe Fehlerklasse
  wie "Track-Aktion ohne Pixel-ID" und "der Consent-Hook, den niemand kennt":
  eine unsichtbare Bedingung mit stillem Ausfall.
  ZWEI DINGE, DIE DIE REICHWEITE BEGRENZEN KÖNNTEN — VERMUTUNG, NICHT GEMESSEN:
  (1) Die Kundenseite wird auf der Kunden-Domain ausgeliefert, also in einem
  anderen Ursprung als die App; ein Skript dort käme an App-Sitzungen vermutlich
  nicht heran. (2) Der Code erkennt bereits fremde Meta-Pixel und meldet das auf
  der Konsole — ein Bewusstsein für die Klasse existiert also. BEIDES ZU PRÜFEN.
  ERSTER SCHRITT: entscheiden, welche Frage zuerst beantwortet wird — ob dem
  Betreiber angezeigt wird, WAS sein HTML mitbringt (Erkennung, kein Eingriff),
  oder ob überhaupt gefiltert wird. Das sind zwei verschiedene Vorhaben mit
  verschiedenem Risiko; ein Filter kann fremde Seiten brechen, eine Anzeige
  nicht.
  KEINE MASSNAHME VORSCHLAGEN, bevor das entschieden ist.
  BEZUG: docs/claude-history/future-roadmap.md, Abschnitt
  "Session-Analyse-Werkzeuge auf Kundenseiten" — dort steht dieselbe Messung als
  Begründung dafür, dass ein Custom-Script-Feld Schadensbegrenzung wäre und
  keine neue Fähigkeit.

- DIE WURF-LÜCKE IN `__psConsent` — VOM OWNER ALS DRINGEND EINGESTUFT
  STATUS: OFFEN (am Code gemessen 2026-08-06, beobachtbar am Code, NICHT live
  gesehen). HERKUNFT: Aufklärung zur fünften Scheibe der Phase 11; in der
  Aufklärung zur neunten BESTÄTIGT, nicht neu gefunden.
  BEFUND: Der `try` in `buildConsentRuntime` umschliesst nur den Hook-AUFRUF. Ein
  werfender `window`-Accessor oder ein werfender Getter beim Schlüssel-Zugriff läuft
  ungebremst durch `__psMetaFire` in den Klick-Handler des Wirings. KEIN TEST DECKT
  DAS AB.
  WAS VERLORENGEHT, IST NICHT IN ALLEN FÄLLEN DASSELBE — und die teurere Hälfte ist
  die unauffälligere: Bei einem `<a>` im Export-Modus ist die Ziel-URL zusätzlich ins
  `href` gebacken; fällt der Handler aus, unterbleibt auch sein `preventDefault`, und
  der Browser navigiert NATIV zur richtigen Adresse — der Besucher merkt nichts. Bei
  einem NICHT-Anker (`<button>`, `<div>`) gibt es kein `href`; dort ist der Redirect
  VOLLSTÄNDIG weg, und der Besucher klickt ins Leere. Das sähe wie ein sporadischer
  Defekt der Kundenseite aus.
  ERSTER SCHRITT: den Riegel um den Schlüssel-Zugriff ziehen, nicht nur um den
  Aufruf — und den Nicht-Anker-Fall als Testfall bauen, nicht den Anker-Fall.
  BEZUG: docs/claude-history/phase-11-multi-tracking.md, "## Das beschlossene
  Consent-Modell".

- DER CONSENT-HOOK WIRD BEIM ERSTEN ERLAUBTEN KLICK ZWEIMAL GEFRAGT
  STATUS: OFFEN (am Code gemessen 2026-08-06). HERKUNFT: Aufklärung zur fünften
  Scheibe der Phase 11.
  BEFUND: Einmal in `__psMetaFire`, einmal in `__psMetaInit` — ohne dass das Ergebnis
  gemerkt wird. HEUTE FOLGENLOS, weil beide Fragen im selben synchronen Aufruf liegen
  und ein deterministischer Hook zweimal dasselbe sagt.
  WARUM ER TROTZDEM STEHT: Es wird mit jedem weiteren Ziel mehr, und ein
  Betreiber-Hook ist FREMDER Code, über dessen Determinismus wir nichts wissen.
  NACHTRAG (2026-08-07): Der Bau der sechsten Scheibe hat die Zahl NICHT erhöht — das
  Urteil wird dort gehoben statt neu erfragt, und ein zählender Wächter hält es fest.
  Der Kandidat beschreibt unverändert die ZWEI Aufrufe, die es schon vorher gab.

- DER BETREIBER ERFÄHRT NICHT, DASS EIN NEUES ZIEL ERST NACH DEM REPUBLISH WIRKT
  STATUS: OFFEN (Anstoss vom Owner-Gegenüber, 2026-08-07). HERKUNFT: Zuschnitt der
  sechsten Scheibe der Phase 11.
  DER MECHANISMUS, und er folgt zwingend aus der Consent-Entscheidung: Ein
  VORHANDENES Draht-Feld ohne den neuen Schlüssel ist ein VERBOT. Eine Seite, die vor
  der Einführung eines Ziels publiziert wurde, trägt das Feld — aber ohne dessen
  Schlüssel. Sie bekommt für das neue Ziel nie einen Forward, bis sie neu
  veröffentlicht wird. Der Betreiber richtet das Ziel ein, sieht "Zugangsdaten
  hinterlegt", und es passiert nichts.
  ES IST KEIN FEHLER DES VERHALTENS: Die Alternative wäre, ein Ziel zu beliefern, zu
  dem der Besucher nie gefragt wurde. FEHLEND IST NICHT DAS VERHALTEN, SONDERN DIE
  MITTEILUNG.
  DIESELBE FEHLERKLASSE wie "Track-Aktion ohne Pixel-ID" und "der Consent-Hook, den
  niemand kennt": eine unsichtbare Bedingung mit stillem Ausfall.
  BEZUG: derselbe Sachverhalt trägt im Live-Test der zwölften Scheibe den
  PFLICHT-STOPP — s. docs/claude-history/phase-11-multi-tracking.md, "## Der Einstieg
  für die nächste Sitzung", Auflage 6.

- DIE NAMENSKOLLISION IM PRODUKT — DIE PROJEKTREGEL IST BEREITS VERLETZT
  STATUS: OFFEN (am Code gemessen 2026-08-07). HERKUNFT: Aufklärung zur sechsten
  Scheibe der Phase 11, Hälfte A.
  BEFUND: "Entfernen" trägt ZWEI verschiedene Bedienelemente (CAPI-Token und
  Domain-Zeile), "Ja, entfernen" sogar DREI (Token, Domain, Variante B). Und BEIDE
  Bereiche des Drawers stehen GLEICHZEITIG im DOM — der Reiterwechsel versteckt per
  Klasse, er hängt nicht aus. Die Mehrdeutigkeit ist heute nur deshalb latent, weil
  keine Test-Vorrichtung Token und Domain gleichzeitig setzt.
  DIE PROJEKTREGEL SAGT: "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER
  WIRKUNG SIND EIN OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM." Sie ist verletzt,
  unabhängig von jener Scheibe. Der Fund entstand nur, weil eine Zählung nach "wählt"
  und "prüft" getrennt hat.

- ES GIBT KEINE GESTALTERISCHEN PRIMITIVE, OBWOHL EINE PROJEKTREGEL SIE VERLANGT
  STATUS: OFFEN (am Code gemessen 2026-08-07). HERKUNFT: Aufklärung zur sechsten
  Scheibe der Phase 11, Hälfte A.
  BEFUND: Root-CLAUDE.md, UX-Prinzipien, verlangt "wiederverwendbare Primitive
  (Button, Panel, Badge) statt copy-paste-Styles". Gemessen: KEINE EINZIGE. Jede
  Karte, jeder Knopf und jeder Statustext wiederholt seine Klassenkette.
  MIT JEDER WEITEREN KARTE WÄCHST DER PREIS DIESES FEHLENS.

- DER NACHZÜGLER-BEFUND AN DEN ÜBRIGEN HANDLERN IST NICHT AUSGEZÄHLT
  STATUS: OFFEN (Lücke der Aufklärung vom 2026-08-07, ausdrücklich als solche
  benannt). HERKUNFT: Aufklärung zur sechsten Scheibe der Phase 11, Hälfte A.
  BEFUND: Für den Token-Pfad ist die Nachzügler-Figur gelöst (der Rückruf trägt die
  Projekt-Kennung, auf die er sich bezieht). WELCHE ANDEREN HANDLER DIESELBE FIGUR
  TRAGEN, IST NICHT AUSGEZÄHLT WORDEN — gemessen ist allein der Token-Pfad.
  DAS STEHT HIER ALS LÜCKE, NICHT ALS VOLLSTÄNDIGKEITS-BEHAUPTUNG.
  ERSTER SCHRITT: die Handler auszählen, die einen asynchronen Rückruf in
  projekt-gebundenen Zustand schreiben.

- DIE ABLEITUNG MACHT EINEN FEHLSCHLAG NICHT VON LEERE UNTERSCHEIDBAR
  STATUS: OFFEN (beim Bau am 2026-08-07 gefunden). HERKUNFT: sechste Scheibe der
  Phase 11, Hälfte B.
  BEFUND: `listConfiguredTargets` gibt bei JEDEM Fehler `[]` zurück; die Karte kann
  daraus nicht lesen, ob nichts hinterlegt ist oder ob die Abfrage scheiterte.
  WO DIE ÄNDERUNG LIEGT: in `src/app/projects/actions.ts`, NICHT in der Karte. Wer
  sie in der Karte versucht, baut einen Notbehelf, der rät.
  ERST DANN könnte die Karte einen vierten Zustand ehrlich zeigen.

- DAS ZURÜCKSETZEN DER MOCK-ABLAGE IN DER GANZEN TESTBASIS
  STATUS: OFFEN (beim Bau am 2026-08-07 gefunden, in Phase 11 mehrfach real
  eingetreten). HERKUNFT: sechste Scheibe der Phase 11, Hälfte B.
  BEFUND: `vi.clearAllMocks()` im `afterEach` leert WEDER die `...Once`-Warteschlange
  NOCH bleibende Implementierungen — beide Richtungen sind real aufgetreten. In der
  elften Scheibe hat ein unverbrauchter Once-Wert aus einem abgebrochenen Test zwei
  fremde Tests rot gemacht (die KASKADE, s. docs/immer-beachten.md, Lektion (g) an
  "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE").
  DER NAHELIEGENDE UMBAU AUF `resetAllMocks` IST KEIN EINZEILER: Er nähme jeden
  Default aus den Mock-Fabriken mit, und genau auf diesen Defaults ruhen die
  Bestandstests. EIGENE RUNDE MIT EIGENEM NACHWEIS.

- DER TESTDATEI `CodeImporter.test.tsx` FEHLT DER WARN-KOMMENTAR IHRER SCHWESTER
  STATUS: OFFEN (am Code gemessen 2026-08-10). HERKUNFT: Bau der elften Scheibe der
  Phase 11.
  BEFUND: Ihr `afterEach` ruft `cleanup()` und `vi.clearAllMocks()`; `TargetCard.test.tsx`
  trägt an derselben Stelle den Warnkommentar dazu, `CodeImporter.test.tsx` nicht.
  WAS DEN KANDIDATEN SCHARF MACHT — es ist nicht die eine Mutation: Jene Tests würden
  von JEDEM frühen Abbruch im Vorgänger rot, unabhängig von der Ursache. Ein späterer
  Leser sieht mehr rote Tests und schliesst auf eine breitere Wirkung, als es sie gibt.
  ERSTER SCHRITT (der billigere von zweien): den Warnkommentar übernehmen. Der zweite
  wäre ein Verbrauchs-Nachweis für die Warteschlange.
  BEZUG: derselbe Gegenstand wie der Eintrag darüber, aus anderer Richtung.

- DIE KARTE TRÄGT ZWEI FELDER MIT VERSCHIEDENEM SPEICHERVERHALTEN UND ERKLÄRT ES NICHT
  STATUS: OFFEN (im Betrieb am 2026-08-07 gefunden). HERKUNFT: sechste Scheibe der
  Phase 11, Hälfte B.
  BEFUND: Die öffentliche Kennung (Pixel-/Konto-ID) wandert in den Einstellungs-Blob
  und wird erst mit dem globalen Speichern-Knopf persistiert; die Zugangsdaten gehen
  SOFORT über eine eigene Server-Aktion in die Geheimnis-Tabelle. Zwei Felder,
  äusserlich gleich, mit verschiedener Wirkung beim Verlassen der Seite.
  HEUTE STEHT KEIN WORT DAZU AUF DER KARTE.

- EIN AKKORDEON FÜR DIE ZIEL-KARTEN, WENN ES MEHR ALS ZWEI WERDEN
  STATUS: OFFEN, IDEE MIT PREIS (2026-08-07). HERKUNFT: sechste Scheibe der Phase 11,
  Hälfte B.
  DER PREIS GEHÖRT IN DENSELBEN SATZ WIE DIE IDEE: Eingeklappt verschwindet der
  Status. Die eingeklappte Zeile müsste ihn MITFÜHREN, sonst nimmt das Akkordeon der
  Karte ihren Zweck — der Betreiber öffnete sie nur, um zu sehen, was vorher auf
  einen Blick dastand.

- `getMetaPixelId` HAT KEINEN AUFRUFER MEHR, UND IHR KOPFKOMMENTAR BEGRÜNDET EINEN
  ZUSTAND, DEN ES NICHT MEHR GIBT
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Bau der siebten Scheibe der
  Phase 11.
  BEFUND: Die Auflösung ist auf `getPixelId` (ziel-parametrisiert) umgestellt; die
  alte Einzelfunktion blieb stehen. Ein dritter Fund an derselben Stelle: auch
  Kommentare in der Umgebung beschreiben den abgelösten Zustand.
  ERSTER SCHRITT: prüfen, ob sie ausser in Tests noch gelesen wird — dann entfernen
  oder ihren Kopf richtigstellen.

- EINIGE TESTTITEL UND KOMMENTARE TRAGEN NOCH DEN ALTEN FELDNAMEN
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Bau der siebten Scheibe der
  Phase 11.
  WARUM SIE STEHENBLIEBEN: Einen Testnamen zu ändern ginge über "nur die Vorrichtung
  anfassen" hinaus, und die Runde durfte das nicht.
  EINORDNUNG: reine Lesbarkeit, kein Verhaltensrisiko — aber ein Testtitel, der einen
  Feldnamen nennt, den es nicht mehr gibt, kostet beim nächsten Suchen Zeit.

- VIER KOMMENTARSTELLEN IN ZWEI DATEIEN SIND ÜBERHOLT, PLUS EINE NAMENSFRAGE
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Bau der achten Scheibe der
  Phase 11.
  BEFUND: Alle vier stammen aus derselben Ursache — der Beacon hing bis dahin
  INNERHALB von Metas Gate, und die Kommentare beschreiben diese Kopplung noch.
  DIE NAMENSFRAGE DAZU: Zwei Symbole tragen Meta im Namen und decken eine Rolle ab,
  die nicht mehr Meta-spezifisch ist. EIN GEGENSTAND, EINE EIGENE RUNDE — wer nur die
  Kommentare anfasst und die Namen stehen lässt, hat die Hälfte gemacht.

- DIE STEIGENDE, FALSCHE VERLUSTRATE
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Bau der achten Scheibe der
  Phase 11.
  BEFUND: Ein Projekt, das einmal einen Zustand erreicht hat, in dem
  Server-Beobachtungen ohne zugehörige Browser-Bestätigung anfallen, zeigt eine
  Adblocker-Verlustrate, die STEIGT, ohne dass ein Adblocker im Spiel wäre.
  ER ENTSTEHT NICHT DURCH JENE SCHEIBE, WIRD VON IHR ABER SICHTBAR.
  WARUM ER HIER ZÄHLT: Die Verlustrate ist die Marquee-Metrik des Produkts. Eine
  Zahl, die aus dem falschen Grund steigt, ist teurer als eine fehlende.
  BEZUG: docs/immer-beachten.md, "WORTWAHL DASHBOARD 'NUR server-seitig erfasst', NIEMALS
  'gerettet'" — dieselbe Achse der Produkt-Ehrlichkeit.

- DER ARRAY-RIEGEL EXISTIERT IM SERVER-LESER, NICHT IN DER BROWSER-REGEL
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Aufklärung zur neunten
  Scheibe der Phase 11, Hälfte B.
  BEFUND: Der server-seitige Leser weist ein Array als Signal-Form ab; die im Browser
  erzeugte Regel tut das nicht in derselben Schärfe. Zwei Leser derselben Eingabe mit
  verschiedener Strenge.
  EINORDNUNG: Kein bekannter Fall, in dem es heute auseinanderläuft — die
  Kennzeichnung ist Teil der Aussage.

- DER DECKELWERT IST MODUL-PRIVAT UND VON AUSSEN NICHT LESBAR
  STATUS: OFFEN (am Code gemessen 2026-08-08, seit 2026-08-10 EINGETRETEN).
  HERKUNFT: Aufklärung vom 2026-08-08 zur Auflösung, Phase 11.
  BEFUND, ALS ER GESCHRIEBEN WURDE: `META_FORWARD_TIMEOUT_MS` trägt kein `export`.
  Bekäme ein zweiter Empfänger seinen eigenen Wert, existierten zwei unabhängige
  Zahlen für dieselbe Frage — und KEIN Test kann ihre Divergenz bemerken, weil keine
  Stelle sie je nebeneinander sieht.
  WAS SICH SEITHER GEÄNDERT HAT: Der zweite Empfänger existiert.
  `PINTEREST_FORWARD_TIMEOUT_MS` steht ebenfalls auf 3_000 und ebenfalls modul-privat.
  DER KANDIDAT WAR EINE VORHERSAGE UND IST JETZT EIN ZUSTAND.
  EIN TEST UNTERSTELLT DIE GLEICHHEIT BEREITS FAKTISCH (`T14` in
  `src/lib/capi/fan-out.test.ts`) und ist dort entsprechend beschriftet: Wird er rot,
  heisst das ZUERST "einer der beiden Deckel hat sich bewegt".
  ES IST DIESELBE KLASSE wie das `asString`-Duplikat, nur eine Ebene gefährlicher:
  Ein divergenter TEXT fällt beim Lesen auf, eine divergente ZAHL nicht.
  NACHGEZOGEN 2026-08-19 (Hebung Phase 11.1) — DIE ZAHL WAR AUF ZWEI STEHENGEBLIEBEN, DER
  TEXT DARÜBER BLEIBT UNVERÄNDERT: Es sind inzwischen VIER. GEMESSEN am Code (2026-08-19):
  `META_FORWARD_TIMEOUT_MS` (`meta-forward.ts`), `PINTEREST_FORWARD_TIMEOUT_MS`
  (`pinterest-forward.ts`), `TIKTOK_FORWARD_TIMEOUT_MS` (`tiktok-forward.ts`) und seit
  Scheibe 11.1f `LINKEDIN_FORWARD_TIMEOUT_MS` (`linkedin-forward.ts`) — alle vier auf
  `3_000`, alle vier modul-privat, und KEINE Stelle im Repo sieht zwei davon nebeneinander.
  WAS DAS NICHT IST, und das gehört ausdrücklich dazu: KEIN Defekt am Aufräumen. Alle vier
  Adapter deckeln über `AbortController` plus `setTimeout` und löschen den Timer je in
  einem `finally` (`clearTimeout(timer)`); `Promise.race` kommt in `src/` NIRGENDS vor, der
  Verteiler verbietet es sogar ausdrücklich. Wer hier einen liegengebliebenen Timer sucht,
  sucht etwas, das es nicht gibt — die Gefahr ist die DIVERGENZ der Zahlen, nicht ihr
  Verhalten.
  DER SATZ „DER KANDIDAT WAR EINE VORHERSAGE UND IST JETZT EIN ZUSTAND" GILT DAMIT
  VERSCHÄRFT: Mit dem vierten Empfänger ist die Zahl nicht mehr zu zweit falsch zu machen,
  sondern zu viert.
  WARUM NICHT MIT 11.1f ZUSAMMENGEFÜHRT: Eine Zusammenführung fasst DREI bestehende
  Adapter-Dateien an — im selben Diff wie ein neuer Adapter wären bei einem Fehlschlag zwei
  Achsen nicht zu trennen. TRIGGER: die nächste Runde, die eine Forward-Datei ohnehin
  anfasst.

- DAS ZIEL-VOKABULAR HAT MEHRERE UNABHÄNGIGE KOPIEN, EINE DAVON AUSSERHALB JEDER
  PRÜFUNG
  STATUS: OFFEN (am Code gemessen 2026-08-08, fortgeschrieben 2026-08-10).
  HERKUNFT: Aufklärung vom 2026-08-08 zur Auflösung, Phase 11.
  GEMESSEN: `META_TARGET` (server-only), `META_CONSENT_TARGET` (client-erreichbar),
  `TRACKING_TARGETS` (client-erreichbar) und der CHECK der Geheimnis-Tabelle. Seit
  der zwölften Scheibe kommt `PINTEREST_TARGET` in `src/lib/capi/ingest.ts` dazu, seit
  der sechsten `TARGET_CARDS.hasAdapter`.
  "UNABHÄNGIG" HEISST PRÄZISE: eine Änderung an einer macht die anderen nicht rot. Die
  übrigen Fundstellen sind TYP-GEBUNDEN an `TRACKING_TARGETS` — ein Tippfehler dort
  bricht den Build und zählt nicht mit.
  DIE GEFÄHRLICHE IST DER CHECK: Er hat keinen Compiler und keinen Test und kann gegen
  alle anderen driften, ohne dass irgendetwas rot wird. Ein Geheimnis unter einem
  verschriebenen Zielwert liesse sich speichern, der Adapter suchte den richtigen,
  fände nichts, und das Ziel bliebe STILL inaktiv.
  DER KANDIDAT IST AUSDRÜCKLICH NICHT "die Kopien zusammenlegen": Zwei von ihnen
  tragen VERSCHIEDENE Vokabulare (Consent-Schlüssel gegen Zielwert der
  Geheimnis-Tabelle), die heute nur zufällig gleich lauten. Verlangt ist eine
  ENTSCHEIDUNG, ob sie dasselbe sein sollen — und ein Wächter für die SQL-Kopie, egal
  wie sie ausfällt.
  GEMESSEN UND DAZUGEHÖRIG: `src/lib/capi/token.ts` importiert bereits aus
  `src/lib/settings.ts` — eine Ableitung der server-seitigen Kopie aus der Ziel-Liste
  bräuchte KEINE neue Import-Kante. Umgekehrt geht es nicht: Die server-only-Datei ist
  aus client-erreichbarem Code nicht importierbar, und der Verzicht auf diese Kante ist
  im Ingest ausdrücklich BEGRÜNDET, nicht vergessen.

- ZWEI TESTDATEIEN DECKEN BEACON UND BESTÄTIGUNG AB UND FÜHREN DEN ERZEUGTEN TEXT NIE AUS
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Aufklärung zum Browser-Pfad,
  Phase 11.
  BEFUND: Sie prüfen ausschliesslich Zeichenketten — zusammen 22 Tests, kein einziger
  Lauf des erzeugten Codes.
  DIE FEHLERFIGUR: Ein Umbau, der den Rumpf SYNTAKTISCH ERHÄLT und SEMANTISCH
  VERSCHIEBT, bleibt in einer Zeichenketten-Prüfung unsichtbar. Ein Wert, der aus einem
  anderen Gültigkeitsbereich gelesen wird als vorher, sieht im Text identisch aus.
  DIE ZAHL MIT IHRER ACHSE: Von 146 Text-Behauptungen dieser Ecke prüfen 103 die
  ANWESENHEIT eines Bausteins, 43 seine ABWESENHEIT, und 49 führen den Text
  tatsächlich aus — die Ausführungen liegen geschlossen in zwei ANDEREN Dateien.
  GRENZE: über `toContain`/`toMatch` und die drei Ausführungs-Helfer ausgezählt; andere
  Zusicherungsformen sind NICHT mitgezählt. Die Verhältnisse stimmen, die Absolutwerte
  sind eine Untergrenze.
  WAS ER NICHT VERLANGT: die beiden Dateien umzuschreiben. Er betrifft den REST — die
  Zusicherungen, die weiterhin nur den Wortlaut prüfen.

- ZWEI VERDICHTUNGEN TRAGEN DIESELBE UNTERÜBERSCHRIFT
  STATUS: OFFEN (real aufgetreten 2026-08-08). HERKUNFT: Aufklärung zur Einwilligung
  je Ziel, Phase 11.
  BEFUND: Zwei verschiedene Verdichtungen sind unter derselben Unterüberschrift
  abgelegt; ein Gate griff im Betrieb zur FALSCHEN.
  WARUM DAS KEIN SCHÖNHEITSFEHLER IST: Eine Überschrift, die zweimal vorkommt, ist kein
  Anker mehr — und die Projektregel zum haltbaren Anker (Symbolname statt Zeilennummer)
  setzt Eindeutigkeit voraus.

- KEIN TEST DECKT EINEN CONSENT-HOOK, DER VERSCHIEDEN ANTWORTET
  STATUS: OFFEN (am Code gemessen 2026-08-08). HERKUNFT: Aufklärung zur Einwilligung
  je Ziel, Phase 11.
  BEFUND: Geprüft ist ein Hook, der wirft, und einer, der einen festen Wert liefert.
  NICHT geprüft ist einer, der bei zwei Aufrufen VERSCHIEDEN antwortet — genau der
  Fall, den der Doppelfrage-Kandibat weiter oben möglich macht.
  BEZUG: Eintrag "DER CONSENT-HOOK WIRD BEIM ERSTEN ERLAUBTEN KLICK ZWEIMAL GEFRAGT" —
  beide zusammen beschreiben denselben Riss aus zwei Richtungen.

- DIE UMBENENNUNG DES ÖFFENTLICHEN FELDES
  STATUS: OFFEN, MIT AUSDRÜCKLICHER ENTSCHEIDUNG DAGEGEN FÜR PHASE 11 (2026-08-10).
  HERKUNFT: Aufklärung vom 2026-08-10, Phase 11.
  BEFUND: Das öffentliche Feld heisst im Datenmodell nach Metas Vokabular, trägt aber
  seit dem zweiten Ziel eine Grösse, die dort anders heisst.
  WAS ENTSCHIEDEN IST: Das Feld BEHÄLT seinen Namen; ein Kommentar an der Fundstelle
  trägt die Erklärung. Eine Umbenennung berührte Datenmodell, Server-Aktionen und
  Oberfläche gleichzeitig.
  DER EINTRAG STEHT HIER, DAMIT DIE ENTSCHEIDUNG AUFFINDBAR BLEIBT — nicht als Auftrag.

- EINE EINGABE-PRÜFUNG FÜR OFFENSICHTLICH UNMÖGLICHE KENNUNGEN
  STATUS: OFFEN (am Code gemessen 2026-08-10). HERKUNFT: Aufklärung zur Karte,
  Phase 11.
  BEFUND: Das öffentliche Kennungs-Feld hat KEINE Prüfung und KEINEN Fehlerkanal. Der
  Betreiber kann jeden Text eintragen; der Adapter setzt ihn (kodiert) in den
  Endpunkt-Pfad.
  WAS ER AUSDRÜCKLICH NICHT IST: eine Zusicherung über die Gültigkeit des Kontos. Eine
  Formatprüfung machte die ungeprüfte Stellenzahl aus dem Anbieter-Konto zur Bedingung
  — das ist genau der Fehler, den der Adapter-Kommentar ausschliesst.
  ERSTER SCHRITT: entscheiden, ob überhaupt geprüft wird, und wenn ja: nur auf
  OFFENSICHTLICH Unmögliches (leer, Leerzeichen, Steuerzeichen), nicht auf Form.

- KEIN TEST ÜBER DEN VOLLEN KREIS "EINGEBEN → SPEICHERN → NEU LADEN → WIEDERSEHEN"
  STATUS: OFFEN (am Code gemessen 2026-08-10). HERKUNFT: Aufklärung zur Karte,
  Phase 11.
  BEFUND: Der volle Kreis ist im Live-Test der elften Scheibe EINMAL gefahren worden
  und hat gehalten; ein TEST, der ihn hält, existiert nicht.
  EINORDNUNG: Der Live-Test beweist den Kreis für EINEN Zeitpunkt. Was ihn gegen den
  nächsten Umbau hält, wäre ein Test — und die Projektregel "ein grüner Test ist kein
  Beleg, dass der Grund seiner Grünheit derselbe geblieben ist" zielt genau darauf.

- DER ERSTE ADAPTER SETZT DIE KENNUNG OHNE KODIERUNG IN DEN PFAD
  STATUS: OFFEN (am Code gemessen 2026-08-09). HERKUNFT: Bau der zehnten Scheibe der
  Phase 11. ARBEITSVORRAT, NICHT POLISH — s. den Sammelvermerk am Ende dieser Gruppe.
  BEFUND: `src/lib/capi/meta-forward.ts` setzt die Pixel-ID unkodiert in die URL; der
  ZWEITE Adapter kodiert (`encodeURIComponent`). Der Kontrast ist der Grund, warum es
  auffiel.
  DAZU GEHÖRT: Das öffentliche Feld hat keine Eingabe-Prüfung (eigener Eintrag oben) —
  der Wert ist owner-kontrolliert, nicht besucher-kontrolliert. GEMELDET: ob das
  Sicherheitsbezug hat, ist NICHT entschieden und gehört ins Manifest-Gespräch, nicht
  hierher.

- BEIM ERSTEN ADAPTER LIEGT DER NUTZLAST-BAU VOR DEM `try`
  STATUS: OFFEN (am Code gemessen 2026-08-09). HERKUNFT: Bau der zehnten Scheibe der
  Phase 11. ARBEITSVORRAT, NICHT POLISH.
  BEFUND: Die Zusage "wirft nie" ist beim ERSTEN Adapter nur FAKTISCH erfüllt — sie
  hängt daran, dass der Body aus `JSON.parse` stammt und deshalb keine werfenden
  Getter trägt, also an einer Eigenschaft des AUFRUFERS. Beim ZWEITEN hängt sie an der
  ANORDNUNG (vor dem `try` steht keine Anweisung) und hält auch dann, wenn jemand
  später eine Zeile ergänzt.
  WARUM DAS ZÄHLT: Ein Wurf verliesse die Funktion, liefe durch das `await` des
  Aufrufers und aus dem Handler heraus — statt der garantierten leeren 204 entstünde
  ein 500, und der leakt den Gültigkeitszustand des trackingKeys an einen anonymen
  Aufrufer.

- DIE NEUTRALE DATEI FÜR DIE TRIMM-FUNKTION — JETZT FÄLLIG STATT HYPOTHETISCH
  STATUS: OFFEN (am Code gemessen 2026-08-09). HERKUNFT: vorhergesagt im Protokoll der
  vierten Scheibe der Phase 11, eingetreten mit der zehnten. ARBEITSVORRAT, NICHT
  POLISH.
  BEFUND: `asString` steht zeichengleich in `src/lib/capi/ingest.ts`,
  `src/lib/capi/meta-forward.ts` und `src/lib/capi/pinterest-forward.ts`. KEIN TEST
  SICHERT DIE GLEICHHEIT DER DREI.
  DAS PROTOKOLL DER VIERTEN SCHEIBE HAT DIESEN MOMENT VORHERGESAGT: "Die dritte Kopie
  kommt mit dem zweiten Ziel — und DANN wird die neutrale Datei richtig, weil aus zwei
  Fällen drei werden und die Abstraktionsregel des Projekts sie deckt."
  WAS SICH GEÄNDERT HAT: nicht die Sache, sondern ihr STATUS. Der Kandidat war eine
  Vorhersage; er ist jetzt ein Zustand.

- KEIN WÄCHTER HÄLT DEN ERZEUGTEN CONSENT-LAUFZEIT-TEXT GEGEN SEINE SPEZIFIKATION
  STATUS: OFFEN (am Code gemessen 2026-08-10). HERKUNFT: Blocker-Runde zur
  Archivierung der Phase 11. ARBEITSVORRAT, NICHT POLISH.
  BEFUND: Der Kommentarkopf von `buildConsentRuntime` erklärt seine Aufzählung zur
  VERBINDLICHEN Fassung dessen, was geschieht, und sagt: weichen Code und Doku ab, ist
  das ein Befund und kein Ermessen. ES GIBT KEINEN TEST, DER DEN ERZEUGTEN TEXT GEGEN
  DIESE AUFZÄHLUNG HÄLT, und keinen gegen die Doku.
  DER SATZ IST DAMIT EINE VERPFLICHTUNG, KEINE ZUSICHERUNG — der Kommentar sagt das
  selbst, an Ort und Stelle.
  ERSTER SCHRITT: einen Test, der die sechs Zweige gegen das erzeugte Verhalten stellt.
  BEZUG: docs/claude-history/phase-11-multi-tracking.md, "## Das beschlossene
  Consent-Modell".

- SAMMELVERMERK ZU DEN VIER EINTRÄGEN MIT DER MARKIERUNG "ARBEITSVORRAT, NICHT POLISH"
  STATUS: HINWEIS, kein eigener Vorgang (2026-08-10).
  Sie stehen in DIESER Datei, weil ein Eintrag zu viel billig ist und einer, der
  nirgends steht, nach dem Löschen der Standdatei weg wäre. IHR EIGENTLICHER FINDEWEG
  IST EIN ANDERER: die Roadmap-Zeile "Phase 11" in der Root-CLAUDE.md zeigt auf
  docs/claude-history/phase-11-multi-tracking.md, und dort stehen sie unter "## Der
  Arbeitsvorrat — vier fällige Punkte am ersten Adapter" mit ihrer vollen Herleitung.
  DREI VON IHNEN BETREFFEN DIESELBE DATEI (`src/lib/capi/meta-forward.ts`) und gehören
  gebündelt — zusammen mit dem Tier-1-Punkt aus dem Security-Manifest, der dieselbe
  Datei anfasst.

## Aus Phase 11 gehoben (2026-08-13) — Vorrats-Punkte aus docs/aktiver-stand.md

Übernommen im Zug der Hebung am Phasenende. **Jeder Punkt trägt seinen Messbefund aus der
Standdatei UNVERÄNDERT** — nichts ist hier neu erhoben worden; wo eine Angabe ein Datum
trägt, ist es das der ursprünglichen Messung.

- KODIERUNG DER KENNUNG IM ENDPUNKT-PFAD: `forwardToMeta` in `src/lib/capi/meta-forward.ts`
  setzt die Kennung anders in den Pfad ein als `forwardToPinterest` in
  `src/lib/capi/pinterest-forward.ts`. GEMESSEN (2026-08-13): Meta interpoliert die
  Pixel-Kennung roh in den Pfad, Pinterest fuehrt sie durch `encodeURIComponent`.
- WURFFREIHEIT DES NUTZLAST-BAUS: Bei `forwardToMeta` liegt der Nutzlast- und URL-Bau
  ausserhalb des umschliessenden `try`; beim zweiten Adapter haelt dieselbe Zusage an der
  ANORDNUNG. GEMESSEN (2026-08-13): Metas URL-Bau steht vor dem `try`, Pinterests
  innerhalb.
- VIERTE TRIMM-KOPIE: `asString` steht in `src/lib/capi/ingest.ts`,
  `src/lib/capi/meta-forward.ts`, `src/lib/capi/pinterest-forward.ts` und seit dem dritten
  Ziel in `src/lib/capi/tiktok-forward.ts`. Derselbe Punkt, eine Kopie mehr — kein neuer.
- ABWESENHEITS-TEST OHNE EIGENE POSITIVKONTROLLE: in
  `src/lib/capi/ingest.timeout.test.ts` der Test, der die schnelle Antwort prueft — seine
  Behauptung ueber den Log-Kanal steht ohne Nachweis, dass dieser Kanal im selben Lauf
  etwas fangen wuerde.
- DREI UNABHAENGIGE KONSTANTEN DESSELBEN WERTES FUER DIESELBE AUFGABE:
  `META_ERROR_MSG_MAX` (`meta-forward.ts`), `PINTEREST_LOG_MAX` (`pinterest-forward.ts`)
  und `TIKTOK_LOG_MAX` (`tiktok-forward.ts`), alle 200 — dazu drei gleichlautende
  Timeout-Deckel (je 3_000).
- SECHS UNGEDECKTE ACHSEN AM SCHWAERZ-PRIMITIV DES ZWEITEN ADAPTERS
  (`sanitizeProviderText` in `src/lib/capi/pinterest-forward.ts`): Reihenfolge,
  Mindestlaenge, Nicht-Strings, Leerwerte, Kappung, Globalitaet — Kandidat fuer eine EIGENE
  Scheibe mit Charakterisierungs-Tests VOR einer spaeteren Vereinheitlichung.
- EIN TESTNAME BEHAUPTET DIE SCHWAERZUNG FUER EIN FELD, DAS SEINE FIXTURE NICHT DECKT:
  `T12b` in `src/lib/capi/pinterest-forward.test.ts` nennt `error_message` und
  `warning_message`, seine Fixture traegt nur `warning_message`.
- EINE KONSTANTE DECKT FUENF FELDER AB: `META_SHORT_MAX` in
  `src/lib/capi/meta-forward.ts` gilt fuer Code, Subcode, Typ, Trace-Bezeichner und
  Content-Type — wer sie fuer eines anhebt, hebt sie fuer alle; heute richtig, weil alle
  fuenf kurz sind, aber eine Kopplung, die niemand bemerkt, bis eines sie sprengt.
- DER NICHT-JSON-AUSGANG IST LIVE NICHT ERZWINGBAR (er verlangt eine nicht-JSON-Antwort
  des Anbieters) und bleibt damit dauerhaft eine Test-only-Achse.
- DIE VORGANGS-KENNUNG DES DRITTEN ANBIETERS WIRD IMMER GESCHWAERZT (`asLogShort` in
  `src/lib/capi/tiktok-forward.ts`): Sie ist strukturell eine lange undurchsichtige Folge
  und liegt in JEDEM Aufruf ueber der Grenze — das Feld liefert nie einen Wert und sieht
  trotzdem aus wie unterdrueckte Information. Zwei Auswege, beide UNENTSCHIEDEN: das Feld
  weglassen, oder ihm eine benannte Ausnahme geben wie beim ersten Adapter. Letzteres
  braucht denselben GEMESSENEN Grund, der dort vorlag und hier fehlt — dass der Support
  dieses Anbieters ohne den Wert nicht arbeiten kann.
- UNS FEHLT DIE INHALTS-KENNUNG, die der Anbieter erwartet (`TrackConfig` in
  `src/lib/mappings.ts` traegt `event`, `isCustom?`, `value?`, `currency?` — keine
  Inhalts-Kennung): Der Test-Tab beanstandet sie im Betrieb dauerhaft — bekannt und
  akzeptiert. Gemessener Nebenbefund: Der Anbieter leitet aus unseren zwei Feldern selbst
  ein Sammelfeld ab; dort laege die Kennung, wenn wir eine haetten.
- EINE WARNUNG AN DER OBERFLAECHE, dass ein frei benanntes Ereignis beim dritten Anbieter
  nicht optimierungsfaehig ist (`ActionPanel` in `src/components/`): eigener Bereich,
  eigene Produktfrage, kein Live-Nachweis noetig. Die Messung, die sie belegt: ein
  erfundener Name wird angenommen und als Custom gefuehrt, und die Quittung sagt das nicht
  — nur die Oberflaeche des Anbieters tut es. GEMESSEN (2026-08-13): `ActionPanel.tsx`
  traegt heute keine solche Warnung.
- DER GEHEIMNIS-PLATZHALTER IST BEI ZWEI ZIELKARTEN IDENTISCH (`TARGET_CARDS` in
  `src/components/TargetCard.tsx`): fuer den Nutzer folgenlos, weil die BESCHRIFTUNGEN
  sich unterscheiden — fuer eine Testabfrage ueber den Platzhalter nicht. GEMESSEN
  (2026-08-13): Pinterest und TikTok tragen beide denselben Platzhaltertext.
- DIE FAN-OUT-TESTS KENNEN DAS DRITTE ZIEL NUR IM KREUZVERGLEICH
  (`src/lib/capi/fan-out.test.ts`): Der Punkt stand als "kennen es NICHT" (GEMESSEN
  2026-08-12, null Treffer). SEITHER TEILWEISE ERLEDIGT durch die C1-Scheibe — GEMESSEN
  (2026-08-13): fuenf Treffer, aber ausschliesslich im Kreuzvergleich-Block. Der Block zu
  Nebenlaeufigkeit und Containment traegt weiterhin den Namen "ZWEI ECHTE EMPFAENGER".
  Was still kaputtgeht: eine Aenderung, die erst ab dem DRITTEN Empfaenger bricht, faellt
  keinem Test auf.
- KEIN KREUZVERGLEICH BEIM ZWEITEN ZIEL (`EVENT_MAP` in
  `src/lib/capi/pinterest-forward.ts`): GEMESSEN am Repo (2026-08-12, erneut 2026-08-13),
  formale Suche nach `META_STANDARD_EVENTS` — kein Treffer in
  `pinterest-forward.test.ts`. Was still kaputtgeht: Waechst unsere Standardliste um einen
  neunten Namen, wird ausschliesslich `T11` rot — der Waechter des DRITTEN Ziels. Die
  Tabelle des zweiten bleibt stumm, und der neue Name ginge dort als nicht abgebildeter
  Name hinaus, unter einer Bedeutung, die niemand vergeben hat.
- EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN (`dispatchForward` in
  `src/lib/capi/ingest.ts`, dazu die drei Adapter): GEMESSEN (2026-08-12, erneut
  2026-08-13) — die Zuordnung gibt `Promise<void>` zurueck, und alle drei Adapter tragen
  die Zusage "SIE GIBT NICHTS ZURUECK" woertlich in ihrem Kopf. Es gibt keinen
  Rueckgabewert, der "fuer dieses Ereignis nicht abbildbar" von "gesendet" oder
  "fehlgeschlagen" unterscheiden koennte. DER PREIS IST GROESSER ALS EIN NEUES ZIEL: Ein
  Rueckkanal beruehrt ALLE DREI bestehenden Adapter — er gehoert zum Preis eines Ziels mit
  Kennung JE EREIGNISTYP.
- DER IDENTITAETS-RIEGEL IST NICHT BEI ALLEN DREI ADAPTERN GLEICH: GEMESSEN (2026-08-12,
  erneut 2026-08-13) — Pinterest und TikTok brechen ohne IP oder User-Agent ab, bevor
  irgendein Aufruf hinausgeht; beim ersten kommt dieser Riegel NICHT vor, dort werden die
  beiden Felder nur konditional in die Nutzlast gesetzt. Ob die Ungleichheit richtig oder
  falsch ist, ist NICHT entschieden; gemeldet ist, dass sie besteht und nirgends als
  Unterschied benannt wird.
- ZWEI UNABHAENGIGE RIEGEL AUF DERSELBEN ACHSE — DER ZWEITE DECKT DEN ERSTEN ZU
  (`getCapiConfigByTrackingKey` in `src/lib/capi/token.ts`: `hasSecret` in der
  Geheimnis-Schleife und der Falsy-Riegel in der Paarung darunter): GEMESSEN
  (Mutationsproben M2/M3 am 2026-08-13) — wird `hasSecret` aufgeweicht, faellt ein leeres
  oder `null`-Geheimnis trotzdem am zweiten Riegel heraus. DER RIEGEL BLEIBT, und dieser
  Punkt beantragt NICHT seine Entfernung: Er ist eine zweite, unabhaengige Deckung auf dem
  meistgetroffenen Pfad der Plattform. Was still kaputtgeht, ist etwas anderes: Jeder Test,
  der diese Achse ueber einen FALSY Wert prueft, ist blind gegen einen Fehler im ersten
  Riegel. Wer hier kuenftig einen Waechter baut, waehlt einen TRUTHY Wert (Muster: N3 in
  `src/lib/capi/token.test.ts`).
- DER GESPEICHERTE STAND IST EIN SPIEGEL, NICHT DIE DATENBANK (`savedSettings` in
  `src/components/CodeImporter.tsx`, seit Scheibe B2 bis in `TargetCard` gereicht):
  GEMESSEN (2026-08-13) — er wird beim Laden aus der Projekt-Zeile geseedet und im
  Erfolgszweig des Speicherns nachgefuehrt; eine Bestaetigung aus der Datenbank holt er
  nie. Ein zweiter Tab, der dasselbe Projekt speichert, macht ihn stumm veraltet.
  Aufloesbar nur mit einer neuen Abfrage, und die war in B2 ausdruecklich ausgeschlossen.
  PRAEZEDENZ, kein neues Risiko: Dieselbe Bauform traegt seit Phase 7 der Publish-Zustand.
- EIN STANDARD-EREIGNIS OHNE BETRAGS-FELD — OFFENE PRODUKTFRAGE, KEIN BEFUND UEBER EINEN
  FEHLER (`META_VALUE_EVENTS` in `src/lib/tracking/meta.ts`, gelesen ueber `showValue` in
  `src/components/ActionPanel.tsx`): GEMESSEN (Live, 2026-08-13) — bei einem der
  Standard-Ereignisse laesst die Oberflaeche keinen Betrag eingeben, das Feld erscheint
  nicht. UNGEMESSEN ist zweierlei, und beides entscheidet den Rang: ob das eine BEWUSSTE
  fachliche Einschraenkung ist oder eine beilaeufige Folge der Feld-Logik, UND ob der
  Anbieter fuer dieses Ereignis ueberhaupt einen Wert annimmt. Was still kaputtgeht, falls
  es beilaeufig ist: Der Betreiber kann fuer dieses Ereignis keinen Wert hinterlegen,
  bekommt dafuer keine Begruendung zu sehen, und in der Auswertung beim Anbieter fehlt der
  Umsatz. KEINE REPARATUR UND KEIN VORSCHLAG: Solange die zweite Provenienz fehlt, waere
  jede Aenderung eine Wette darauf, welcher der beiden Faelle vorliegt.
- "KONFIGURIERT" HEISST AN ZWEI ORTEN VERSCHIEDENES — DIE STRUKTURELLE HAELFTE BESTEHT
  FORT (`listConfiguredTargets` in `src/app/projects/actions.ts` gegen die Paarung in
  `getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`): GEMESSEN (2026-08-12, erneut
  2026-08-13) — die Oberflaechen-Ableitung selektiert ausschliesslich die Ziel-Spalte und
  liest den Wert nie; der Forward verlangt Kennung UND Zugangsdatum. Die SICHTBARE Haelfte
  ist mit Scheibe B2 behoben (die Karte sagt selbst, dass an ein Ziel nichts gesendet
  wird); geteilt ist seither die BEDINGUNG (`hasPixelId`), nicht das URTEIL.
  ZU PRUEFEN, SOBALD DER LOGGING-/MONITORING-UMBAU ANSTEHT. **DAS IST KEIN TRIGGER IM
  SINNE VON "## Offene Punkte"** — jener Abschnitt verlangt einen benennbaren Zeitpunkt,
  und ein Umbau, den niemand terminiert hat, ist keiner. Der Vermerk steht hier, damit der
  Punkt beim naechsten Lesen nicht dorthin wandert.
- DAS ERGEBNIS DES FAN-OUTS WIRD VERWORFEN (der Fan-Out in `src/lib/capi/ingest.ts`):
  GEMESSEN (2026-08-12, erneut 2026-08-13) — das Sammel-Warten wird erwartet, sein
  RUECKGABEWERT aber nirgends gelesen; direkt danach steht die leere 204. Welcher
  Empfaenger geliefert hat und welcher nicht, ist im Handler vorhanden und wird
  fallengelassen. ERSTE INSTANZ, GEMESSEN (Live, 2026-08-13, berichtet): In einem realen
  Lauf hat ein Ziel dauerhaft NICHT geliefert; das Einzige, was davon existierte, war eine
  fluechtige Logzeile ohne Projekt- und ohne Ereignis-Bezug — bemerkt wurde es NUR, weil
  jemand aus einem ANDEREN Grund ins Protokoll sah. Damit beschreibt der Punkt keinen
  MOEGLICHEN, sondern einen EINGETRETENEN Zustand.
  ZU PRUEFEN, SOBALD DER LOGGING-/MONITORING-UMBAU ANSTEHT. **DAS IST KEIN TRIGGER IM
  SINNE VON "## Offene Punkte"** — dieselbe Begruendung wie beim Punkt darueber.
- "ZEILE EXISTIERT" GLEICH "WERT VORHANDEN" RUHT AUF DEM SCHREIBPFAD, NICHT AUF DEM SCHEMA
  (`setCapiToken` in `src/app/projects/actions.ts` gegen
  `supabase/migrations/0021_project_secrets.sql`): GEMESSEN (2026-08-12, erneut
  2026-08-13) — die Spalte ist `not null`, und `not null` ist nicht "nicht leer"; der
  einzige CHECK der Tabelle bindet `target`. Nicht-leer ist allein zugesichert, weil die
  Server-Action trimmt und bei leerem Ergebnis abbricht. Was still kaputtgeht: Jeder
  Schreibweg, der an dieser Action vorbeigeht — und ueber `service_role` ist das der
  einzige Weg, den es auf dieser Tabelle ueberhaupt gibt —, kann eine Zeile erzeugen, die
  die Oberflaeche als konfiguriert meldet. Ein CHECK auf Nicht-Leere machte aus dem
  schwachen Argument das starke. WARUM HIER UND NICHT IN `docs/db-stand.md`: Jene Datei
  wird ausschliesslich aus einer Messung des IST-ZUSTANDS fortgeschrieben und traegt keine
  Vorhaben; dieser Punkt nennt ausserdem keinen Zeitpunkt.
- VOLLSTAENDIGKEITS-ACHSE — WAS DANN SOFORT GILT (Rueckverweis aus CLAUDE.md,
  "## Offene Punkte", Eintrag "DIE VOLLSTAENDIGKEITS-ACHSE IST NICHT GEBAUT"): Drei
  Messbefunde, GEMESSEN am Repo (2026-08-12), damit sie beim Bau nicht neu erhoben werden
  muessen. (1) DER NENNER IST DIE VEREINIGUNG DER TRACK-EREIGNISSE AUS BEIDEN
  VARIANTEN-MAPPINGS: A und B laufen nachweislich auseinander — der Umschalter tauscht die
  Wurzeln, eine Aenderung schreibt in die aktive, und der Speicherpfad je Variante
  beruehrt die Spalten der anderen NICHT; KEINE Stelle im Produktivcode bildet ihre
  Vereinigung. Ein Nenner, der nur A kennt, meldet vollstaendig, waehrend beim halben
  Traffic nichts ankommt. (2) ES BRAUCHT KEINE ZUSAETZLICHE DATENBANK-RUNDE: Beide Mengen
  reisen bereits in derselben Projekt-Ladeantwort und liegen im Container — zwei Ebenen
  von der Karte entfernt. (3) "UNVOLLSTAENDIG" IST AUS DER KONFIGURATION ZU RECHNEN, NIE
  AUS LAUFZEITDATEN: Ein nicht beliefertes Ziel hinterlaesst in KEINEM persistierten
  Datensatz eine Spur — wer die Antwort aus den Ereignissen ableiten wollte, leitete sie
  aus dem Nichts ab.
- DIE PROVENIENZ-PFLICHT STEHT AN ZWEI ORTEN — BEKANNTE SCHULD, KEIN VERSEHEN (angelegt
  2026-08-13): Dieselbe Fehlerklasse — eine Anbieter-Angabe aus dem Gedaechtnis statt aus
  einer Lesung — ist ab jetzt ZWEIMAL geregelt. In `docs/db-regeln.md` (vierte Regel) fuer
  Supabase, und in den Roadmap-Zeilen 11.1/11.2 fuer fremde Werbe-Anbieter ("eine eigene
  Anbieter-Recherche mit derselben Sorgfalt, NICHTS DAVON AUS DEM GEDAECHTNIS"). Zwei
  Aussagen, EIN Gegenstand, kein gemeinsamer Ort — und keine der beiden weiss von der
  anderen. WARUM SIE HEUTE NICHT ZUSAMMENGEFUEHRT WERDEN: Der gemeinsame Ort waere
  CLAUDE.md, "## Immer beachten", und dort sind nach der Archivierung der Phase 11 noch
  30 Bytes frei (GEMESSEN 2026-08-13). Eine Zusammenfuehrung waere heute nicht additiv,
  sondern erzwaenge eine Kuerzung an bestehenden Regeln — das ist ein eigener Vorgang mit
  eigener Freigabe, kein Nebenbei. TRIGGER: sobald CLAUDE.md wieder Platz hat (er haengt
  am offenen Punkt "CLAUDE.md NAEHERT SICH DEM LADELIMIT"). DER SATZ, DER MITMUSS: Wer die
  Doppelung spaeter findet, soll sie als BEKANNTE SCHULD lesen und nicht als
  Nachlaessigkeit — sie ist gesehen, benannt und datiert, und die Entscheidung, sie
  vorerst stehen zu lassen, ist bewusst gefallen.
  TRIGGER EINGETRETEN AM 2026-08-14 (GEMESSEN am Repo): Mit der Auslagerung von
  "## Immer beachten" nach docs/immer-beachten.md steht CLAUDE.md bei 70 144 Bytes —
  79 856 Bytes unter dem 150k-Ladelimit statt der 30 von oben. Die Platz-Begruendung
  traegt damit nicht mehr, und die Zusammenfuehrung ist ABARBEITBAR.
  SIE IST IN DIESEM NACHTRAG AUSDRUECKLICH NICHT AUSGEFUEHRT WORDEN: Sie aendert eine
  Regel ueber ZWEI Dateien hinweg und gehoert damit in die naechste Hebung, nicht in
  eine Ortsangaben-Runde. WAS SICH GEAENDERT HAT, IST DER GEMEINSAME ORT: nicht mehr
  CLAUDE.md, sondern docs/immer-beachten.md — dort ist der Platz.
- DEKLARATIVE SCHEMAS — EINE OFFENE FRAGE, AUSDRUECKLICH KEINE EMPFEHLUNG (angelegt
  2026-08-13): BEFUND, GELESEN (Supabase-Blog zu Agenten-Evals, 31.07.2026; vom Owner in
  den Auftrag eingebracht, von dieser Runde NICHT selbst nachgeschlagen — die Angabe ist
  damit UNGEPRUEFT im Sinne der neuen Provenienz-Regel): Agenten greifen nicht zu
  deklarativen Schema-Workflows und schreiben Migrationen von Hand, selbst in Projekten,
  die bereits deklarative Schemas benutzen. GEMESSEN AM REPO (2026-08-13): Dieses Projekt
  fuehrt 23 handgeschriebene Migrationen (0001 bis 0023) und hat KEIN
  `supabase/schemas`-Verzeichnis. UNGEMESSEN IST, ob das hier RICHTIG ist — eine bewusste
  Bauform — oder ein SYMPTOM genau des beschriebenen Verhaltens. DIE FRAGE BERUEHRT EINE
  DOKUMENTIERTE ENTSCHEIDUNG und ist deshalb keine Aufraeumarbeit: `docs/db-regeln.md`
  haelt fest, dass die Migrationen manuell im SQL-Editor laufen und es "KEINEN
  Migrations-Runner" gibt "und keinen geben soll". Ein deklarativer Workflow erzeugt
  Migrationen aus einem Schema-Stand — wer ihn einfuehrt, ruehrt genau daran. KEINE
  EMPFEHLUNG, KEIN VORSCHLAG, KEIN TRIGGER: Die Frage steht, die Antwort nicht. Wer sie
  beantworten will, faengt bei der Messung an, nicht beim Werkzeug.
- DIE search_path-DIVERGENZ — VORGELEGT UND NICHT AUFGELOEST (angelegt 2026-08-13, beim
  Bau des Supabase-Doku-Skills aufgefallen): Anbieter-Doku und Bestandsregel nennen fuer
  SECURITY DEFINER VERSCHIEDENE Werte. BEIDE SEITEN, je mit Provenienz:
  · GELESEN (2026-08-13, Supabase "Database Functions", Abschnitt "Security `definer` vs
    `invoker`"): Der Anbieter empfiehlt den LEEREN Pfad (`search_path = ''`) und
    verlangt dafuer die volle Qualifizierung JEDER Relation im Rumpf.
  · Die Bestandsregel in `docs/db-regeln.md` ("DB-FUNKTIONEN + SEARCH_PATH") verlangt
    `pg_catalog` und traegt eine GEMESSENE Warnung (2026-07-28) dazu: rls_auto_enable —
    die einzige SECURITY-DEFINER-Funktion des Systems — laeuft mit genau diesem Wert, und
    eine "Korrektur" haette die einzige Sicherheitsfunktion des Systems STILL geschwaecht,
    mit der Doku als Rueckendeckung.
  UNGEMESSEN: welcher Wert fuer DIESE Funktion in DIESER Datenbank richtig ist.
  DAS IST KEIN LOCH, SONDERN EIN UNTERSCHIED IN DER STRENGE, und dieser Satz gehoert zum
  Eintrag: Beide zielen auf DASSELBE — minimaler Pfad, volle Qualifizierung — und
  unterscheiden sich darin, WIE WEIT der Pfad zusammengezogen wird. Der leere Pfad ist die
  striktere Fassung desselben Gedankens, nicht sein Gegenteil. Wer hier einen BEFUND
  liest, liest etwas hinein, das nicht dasteht: Es ist nichts kaputt, nichts ungeschuetzt
  und nichts zu reparieren.
  TRIGGER, GEKOPPELT: sobald der offene Punkt "rls_auto_enable-CREATE FEHLT IN DEN
  MIGRATIONEN" (CLAUDE.md, "## Offene Punkte") bearbeitet wird. Dieselbe Funktion,
  derselbe Moment — dort steht ohnehin der Byte-Abgleich gegen pg_get_functiondef an, und
  genau dann liegt der gemessene Ist-Wert auf dem Tisch, den es fuer eine Entscheidung
  braucht. Frueher waere sie ohne Messgrundlage zu treffen.
  KEINE EMPFEHLUNG, KEINE ANGLEICHUNG, KEINE AENDERUNG AN DER BESTANDSREGEL. Die
  Vorlage ist die Erledigung dieses Eintrags, nicht ihr Anfang — die neue vierte Regel in
  `docs/db-regeln.md` verlangt fuer genau diesen Fall, VORZULEGEN statt anzugleichen, und
  dieser Eintrag IST diese Vorlage.

## Nachtrag 2026-08-14 — KANDIDATEN für docs/immer-beachten.md (noch KEINE Regeln)
Eigener Abschnitt, weil ein Anhängen ans Dateiende den Eintrag sonst unter
"Aus Phase 11 gehoben (2026-08-13)" einsortiert hätte — er stammt nicht von dort.
Er hat heute keinen anderen Ort: Es existiert keine Standdatei, also auch keine
Kandidatenliste. Gehoben wird er NICHT in dieser Runde.

- EINE MESSUNG, DIE DIE ERWARTUNG TRIFFT, WIRD NICHT NACHGEPRÜFT.
  DER GEMESSENE FALL (2026-08-14): Ein Zähl-Lauf mit `git log --since` ergab SECHS —
  genau die Zahl, die der Architekt zuvor aus der Erinnerung genannt hatte. `--since`
  schneidet an UTC-Mitternacht; ein Commit um 08:34 (+0200) fiel lautlos aus der
  Menge. Die richtige Zahl ist SIEBEN.
  WAS STILL KAPUTTGEHT: Eine Zahl, die zur Erwartung passt, bekommt keine Gegenprobe —
  sie sieht aus wie eine Bestätigung. Aufgefallen ist es nur, weil zur Abwesenheit eine
  POSITIVKONTROLLE gefahren wurde: dasselbe Muster traf im fehlenden Commit direkt
  sehr wohl.
  ABGRENZUNG ZUR BESTEHENDEN REGEL, sie ist nötig: "Ein Nicht-Treffer ist kein Beweis
  ohne Positivkontrolle" adressiert die ABWESENHEIT. Hier war das Ergebnis kein
  Nicht-Treffer, sondern eine plausible ZAHL — und plausibel ist gefährlicher als leer.
  ZWEITER TEIL, aus demselben Lauf: Ein Zeitfilter am Werkzeug arbeitet in UTC, die
  Zeitstempel im Repo nicht. Wer nach Datum filtert, filtert am AUTOR-Datum per
  Zeichenvergleich.
- EIN FILTER, DER DIFF-PRÄFIXE ENTFERNT, VERSCHLUCKT ZEILEN, DIE SELBST MIT DEM
  PRÄFIX-ZEICHEN BEGINNEN.
  DER GEMESSENE FALL (2026-08-14): Ein Filter gegen `^(\+\+\+|---)` sollte die
  Diff-Kopfzeilen entfernen — er hätte jede GELÖSCHTE SQL-Kommentarzeile verschluckt,
  weil "-" (Diff-Präfix) plus "--" (SQL-Kommentar) im Diff als "---" erscheint. Der
  Nachweis "keine ausführbare Zeile berührt" wäre damit TRIVIAL WAHR gewesen.
  WAS STILL KAPUTTGEHT: Der Filter meldet keinen Fehler, er meldet WENIGER. Und
  weniger sieht aus wie ein sauberes Ergebnis.
  WAS IHN GEFANGEN HAT: zwei unabhängige Instrumente statt eines, das zweite mit
  POSITIVKONTROLLE (eine ausführbare Zeile angehängt und geprüft, dass der Wächter
  anschlägt).
  ABGRENZUNG ZUR BESTEHENDEN WERKZEUG-REGEL: Jene handelt davon, dass ein Werkzeug den
  GEGENSTAND still verändert, und ihre Gegenrichtung davon, dass es einen BEFUND
  ERZEUGT. Hier ENTFERNT es einen Befund — eine dritte Richtung.
- EINE ZAHL IN EINER COMMIT-MESSAGE IST NACH DEM PUSH NICHT MEHR KORRIGIERBAR — ALSO
  WIRD SIE VORHER GEMESSEN.
  DIE GEMESSENEN FÄLLE (2026-08-14): Drei Zahlen kamen aus der Erinnerung des
  Architekten in Commit-Messages und waren alle drei falsch — "rund 13 KB" (gemessen
  10 293 Bytes), "elf Stellen" (gemessen 18 Hunks), "sechsmal" (gemessen siebenmal).
  WAS STILL KAPUTTGEHT: Der Diff wird geprüft, die Message nicht. Sie beschreibt ihn,
  aber niemand hält sie gegen ihn — und nach dem Push ist sie nur per Force zu ändern.
  Bei "Build in Public" wird genau dieser Verlauf gelesen.
  WAS SIE GEFANGEN HAT: dass die Zahlen VOR dem Push gegen die eigene Messung gehalten
  wurden, solange ein Amend ohne Force möglich war. Kein Gate hat das erzwungen.
  DIE ABLEITUNG, falls dies gehoben wird: Jede Zahl in einer Commit-Message gehört
  gegen die Messung derselben Runde geprüft, BEVOR gepusht wird — und wo sie abweicht,
  wird amendet, nicht gepusht.
  ABGRENZUNG ZUR BESTEHENDEN REGEL "jede Zahl ist gemessen oder ausdrücklich als
  geschätzt gekennzeichnet": Jene gilt Dokumenten und Berichten, die sich korrigieren
  lassen. Hier ist der TRÄGER nach dem Push unveränderlich — das ist der Unterschied,
  der sie zu einer eigenen Regel macht.
- EIN DOKUMENT KANN JAHRELANG BEHAUPTEN, ETWAS STEHE IM CODE, OHNE DASS ES DORT STEHT —
  UND EINE DURCHNUMMERIERTE LISTE BEHAUPTET DABEI VOLLSTÄNDIGKEIT.
  DER GEMESSENE FALL (gefunden am 2026-08-13 beim Gate vor der Archivierung): Die
  Standdatei führte seit dem 2026-08-05 zwei Adapter-Unterschiede mit der Angabe, sie
  seien im Kopf von `src/lib/capi/pinterest-forward.ts` aufgezählt. Sie waren es nie.
  Jene Liste zählte FÜNF durch — und eine durchnummerierte Liste liest sich als
  vollständig, auch wenn sie es nicht ist.
  WAS STILL KAPUTTGEHT: Ein Adapter-Bauer liest die Liste AM ORT DER ARBEIT und glaubt
  ihr. Die Standdatei, die die zwei fehlenden trug, liest er nicht — und nach der
  Archivierung hätte er sie gar nicht mehr gelesen.
  WAS ES GEFANGEN HAT: nicht die Liste und nicht der Vermerk, sondern ein GATE VOR DER
  LÖSCHUNG — die Frage "steht hier etwas, das gelesen werden muss und nur hier steht?",
  abschnittsweise durchgegangen.
  DIE ABLEITUNG, falls dies gehoben wird: Wer eine Aussage der Form "steht im Code" in
  ein Dokument schreibt, trägt sie im selben Zug DORT ein. Und wer eine nummerierte
  Liste erweitert, prüft, ob die Zahl davor mitwandert.
  ABGRENZUNG ZUR BESTEHENDEN REGEL "eine Regel kann gültig bleiben, während ihr Beleg
  falsch wird": Jene handelt vom ALTERN eines einmal richtigen Belegs. Hier war der
  Beleg NIE richtig — der Vollzug hat nie stattgefunden.
  DER FALL SELBST IST ERLEDIGT, damit ihn niemand ein zweites Mal repariert (GEMESSEN
  am 2026-08-14): Der Kopf jener Datei trägt heute SIEBEN durchnummerierte Unterschiede;
  die beiden fehlenden sind mit dem Archivierungs-Commit `3ad7995` nachgetragen worden.
  Kandidat ist die LEHRE, nicht der Fall.
- EINE ALS UNGEPRÜFT GEFÜHRTE FORM ALS PASSEND ZU BEHAUPTEN IST EIN VERGLEICHS-FEHLER,
  KEIN WISSENSLÜCKEN-FEHLER — UND ES BRAUCHT DAFÜR KEINE WIDERLEGUNG IM REPO, EIN
  VORBEHALT GENÜGT.
  DER GEMESSENE FALL (gefunden am 2026-08-14): In der Roadmap-Zeile 11.1 stand seit dem
  2026-08-11 "Immerhin: das Zugangsdatum ist ein nicht ablaufendes Token und passt in
  die Geheimnis-Tabelle." Im Repo lag zu diesem Zeitpunkt KEIN Gegenbeweis — sondern
  eine EINSTUFUNG, und die ist der Maßstab: Der Kommentar am CHECK in
  `supabase/migrations/0021_project_secrets.sql` nennt Ziele, "deren Zugangsdaten-FORM
  ungeprueft ist oder bekannt NICHT auf 'ein Geheimnis pro Zeile' passt (OAuth-artige
  Anmeldungen brauchen mehrere Werte nebeneinander)". Das sind ZWEI Hälften; für
  LinkedIn galt am 2026-08-11 die ERSTE — UNGEPRÜFT. Drei Tage später stand in der
  Roadmap, die Form passe. Der Fehler war also nicht, eine bekannte Widerlegung
  übersehen zu haben, sondern eine ausdrücklich als ungeprüft geführte Form als geprüft
  zu BEHAUPTEN.
  WAS STILL KAPUTTGEHT: Ein Vorbehalt liest sich wie eine offene Frage, nicht wie ein
  Verbot — also hält niemand die neue Aussage dagegen, und sie sieht danach geprüft aus,
  obwohl sie den einzigen Prüfstand des Repos gerade übergeht. Mehr Recherche nach
  aussen verhindert das nicht: die Einstufung stand schon da, sie wurde nur nicht
  gelesen.
  DIE ABLEITUNG, falls dies gehoben wird: Wer eine Aussage über die FORM oder EIGNUNG
  eines Werts in ein Dokument schreibt, sucht vorher im Repo die Stelle, die diese Form
  BESCHRÄNKT ODER EINSTUFT — Constraint, Migration, Kommentar. Führt sie den Fall als
  UNGEPRÜFT, ist "es passt" nicht schreibbar; schreibbar ist dann nur "ungeprüft" oder
  das Ergebnis einer Prüfung, die auch stattgefunden hat.
  ABGRENZUNG ZU DEN BEIDEN NACHBAR-KANDIDATEN, gegen DIESE Fassung nachgeprüft — beide
  halten, aber an anderer Stelle als zuvor: "Ein Dokument kann behaupten, etwas stehe im
  Code" handelt von einem BELEG, dessen Vollzug nie stattfand; hier ist der Beleg
  vorhanden und vollzogen, er sagt nur etwas anderes, als die neue Aussage unterstellt.
  "Eine Messung, die die Erwartung trifft, wird nicht nachgeprüft" setzt eine MESSUNG
  voraus, der die Gegenprobe fehlte; hier gab es gar keine — an ihrer Stelle stand der
  Vorbehalt, der eine verlangt hätte.

## Nachtrag 2026-08-15 — KANDIDAT aus der LinkedIn-Messung (noch KEINE Regel)
Eigener Abschnitt nach der Konvention oben: Ein Anhängen ans Dateiende hätte den
Eintrag sonst unter "Nachtrag 2026-08-14 — KANDIDATEN für docs/immer-beachten.md"
einsortiert, und von dort stammt er nicht. Er hat heute keinen anderen Ort: Es
existiert keine Standdatei, also auch keine Kandidatenliste. Gehoben wird er NICHT in
dieser Runde.

- EINE FREMDE SCHNITTSTELLE KANN DIE STRUKTUR EINER NUTZLAST PRÜFEN UND IHRE BEDEUTUNG
  NICHT — WER AUS EINER ERFOLGSANTWORT SCHLIESST, DAS GESENDETE SEI BRAUCHBAR,
  VERWECHSELT ZWEI PRÜFUNGEN.
  DER GEMESSENE FALL (2026-08-15, sieben Läufe gegen die echte
  LinkedIn-Conversions-Schnittstelle): Derselbe Endpunkt lehnte ein fehlendes
  Pflichtfeld mit 422 ab — die Meldung nennt sogar den Pfad des beanstandeten Feldes —
  und nahm einen FREI ERFUNDENEN Währungscode bei sonst gültiger Nutzlast mit 201
  Created an. Weder eine Ablehnung noch eine Liste erlaubter Werte.
  WAS STILL KAPUTTGEHT: Eine falsch konfigurierte Währung erzeugt eine
  ERFOLGSQUITTUNG. Der Fehlzustand sitzt nicht bei der ANNAHME des Ereignisses, sondern
  in dessen INHALT — und dort sieht ihn niemand, weil die Quittung einwandfrei
  aussieht. Der Wert ist danach entweder unbrauchbar oder verfällt.
  DIE ABLEITUNG, falls dies gehoben wird: Werte, deren Gültigkeit der Empfänger NICHT
  prüft, müssen VOR dem Absenden geprüft werden — sonst gibt es für sie überhaupt keine
  Prüfung. Für jeden Adapter gehört damit benannt, WELCHE Felder der Empfänger prüft
  und welche nicht; die ungeprüften sind die Arbeit.
  ABGRENZUNG ZUR BESTEHENDEN REGEL "(c) EINE ERFOLGSQUITTUNG KANN BLIND SEIN FÜR DAS,
  WAS MAN MISST" (Teil von "BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN,
  DASS DAS RICHTIGE GEMESSEN WIRD" in docs/immer-beachten.md): Jene handelt vom MESSEN
  — sie verlangt eine Gegenprobe, damit eine fremde Quittung überhaupt als Beleg taugt.
  Hier geht es um den PRODUKTIVEN Pfad: Dort ist die Quittung kein Messinstrument,
  sondern das Einzige, was der Betreiber je zu sehen bekommt, und eine Gegenprobe gibt
  es im laufenden Betrieb nicht.
  FUNDSTELLE DER MESSWERTE: docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions
  API)", Messprotokoll 2026-08-15, Teile (e) und (f). (NACHGEZOGEN AM 2026-08-15: Hier
  stand "CLAUDE.md, Roadmap-Zeile 11.1, MESS-BLOCK 2026-08-15, Teile (e) und (f)" —
  beide Teile sind noch am selben Tag aus der Roadmap-Zeile nach docs/ziel-befunde.md
  ausgezogen. Die Teil-Buchstaben sind dabei unverändert geblieben, damit dieser
  Verweis trifft.)

## Nachtrag 2026-08-15, ZWEITER DES TAGES — KANDIDATEN aus der Datenklassen-Entscheidung (VORRAT, KEINE Regeln, KEIN Auftrag)
Eigener Abschnitt nach der Konvention oben, obwohl am Dateiende bereits eine Sektion mit
DEMSELBEN Datum steht: Jene trägt Kandidaten für docs/immer-beachten.md aus der
LinkedIn-Messung, diese hier zwei Befunde aus der Owner-Entscheidung zur
Datenklassen-Grenze. Das Datum ist gleich, die HERKUNFT nicht — und die Konvention
trennt nach Herkunft, nicht nach Tag.
BEIDE BETREFFEN EINEN BAU, DEN ES NICHT GIBT. Sie sind Vorrat für einen späteren
Zuschnitt und ausdrücklich kein Auftrag; keiner von beiden ist ein Kandidat für
docs/immer-beachten.md.
DIE ENTSCHEIDUNG SELBST STEHT NICHT HIER, sondern an ihrem Ort: CLAUDE.md,
"## Offene Punkte", Eintrag "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block
"ENTSCHIEDEN AM 2026-08-15 (OWNER)".

- EIN IM BROWSER GEBILDETES IDENTITÄTS-MERKMAL STEHT VOR EINEM CONVERSION-BEACON — UND
  DIE EINGEBAUTE HASH-SCHNITTSTELLE IST ASYNCHRON.
  DER BEFUND: Damit entsteht auf dem Beacon-Pfad ein WARTEPUNKT, den er heute nicht hat.
  Die keepalive-Pflicht (docs/immer-beachten.md, "BEACON-keepalive PFLICHT
  (Conversion-/PageView-nahe Beacons)") schützt einen Request, der bereits ABGESCHICKT
  IST — sie schützt NICHT davor, dass der Wert erst fertig wird, wenn die Seite schon
  weg ist. Bei Formular-Absenden, Weiterleitung und Seitenwechsel ist genau das der
  NORMALFALL und nicht der Ausreisser; es sind dieselben Situationen, für die die
  keepalive-Regel überhaupt existiert.
  WAS STILL KAPUTTGEHT: Das Ereignis geht verloren, ohne dass etwas fehlschlägt — kein
  Fehler, keine Meldung, nur eine Conversion weniger. Dieselbe Fehlerklasse, gegen die
  die keepalive-Regel geschrieben wurde, nur eine Stufe früher im Ablauf.
  HIER STEHT AUSDRÜCKLICH KEINE LÖSUNG: Genannt worden sind DREI Kandidaten — das
  Absenden aufhalten · früher bilden und zwischenhalten · eine synchrone
  Implementierung. Jeder hat einen anderen Preis, und die Auswahl gehört in den
  Zuschnitt, nicht in diesen Eintrag.
  PROVENIENZ: aus der Owner-Runde vom 2026-08-15. Die Asynchronität der eingebauten
  Schnittstelle ist hier VORAUSGESETZT — sie ist weder am eigenen Code noch an der
  Anbieter-Doku belegt worden und gehört vor einem Zuschnitt geprüft.

- EIN NEUES NUTZERKONTROLLIERTES FELD AUF DEM INGEST-PFAD IST EIN WEITERER KANDIDAT FÜR
  DEN 204-CONTAINMENT-PUNKT.
  DER BEFUND: Der Eintrag "DREI WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN
  KÖNNTE" (CLAUDE.md, "## Offene Punkte") führt drei Wege, auf denen ein Wurf die
  garantierte leere 204 brechen könnte. Ein Identitäts-Feld, das eine
  NICHT-ZEICHENKETTE trägt, wäre ein weiterer DERSELBEN Klasse — nutzerkontrolliert,
  auf demselben Pfad, mit demselben möglichen Ausgang.
  UNGEMESSEN, wie heute schon die anderen drei. Der Rang wird hier weder behauptet noch
  ausgeschlossen.
  DER EINTRAG UNTER "## Offene Punkte" WIRD DESHALB NICHT GEÄNDERT UND SEINE ZAHL NICHT
  HOCHGEZÄHLT: Er handelt von Code, der EXISTIERT; dieser Kandidat von Code, den es
  nicht gibt. Wird das Feld gebaut, gehört er DORT hinein — und dann wandert die Zahl
  mit.
  PROVENIENZ: aus der Owner-Runde vom 2026-08-15.

## Aus Phase 11.1 gehoben (2026-08-19) — Vorrats-Punkte aus docs/aktiver-stand.md

Übernommen im Zug der Hebung am Phasenende, zweite Runde. **Jeder Punkt trägt seinen
Messbefund aus der Standdatei UNVERÄNDERT** — nichts ist hier neu erhoben worden; wo eine
Angabe ein Datum trägt, ist es das der ursprünglichen Messung. Was an anderen Orten gelandet
ist (CLAUDE.md, docs/immer-beachten.md), steht hier NICHT noch einmal.

- ZWEI PRÄDIKATFREIE KENNUNGS-PRÜFUNGEN IM ERZEUGER-PFAD
  GEMESSEN (2026-08-17): `buildMetaRuntime` (`src/lib/tracking/meta.ts`) und
  `buildWiringScript` (`src/lib/generate.ts`) entscheiden „trägt dieses Ziel eine Kennung?"
  per Vergleich gegen `""` statt über `hasPixelId` — obwohl
  `src/lib/tracking/target-readiness.ts` wörtlich davor warnt („wer hier
  `savedPixelId !== \"\"` schreibt, hat wieder zwei Wahrheiten"). HEUTE WERTGLEICH, weil
  `getPixelId` bereits trimmt.
  TRIGGER, AM 2026-08-18 VERENGT (der frühere lautete „sobald EINE Kennung eine andere Form
  hat"): „sobald METAS Kennung eine andere Form hat als einen getrimmten Skalar". GRUND,
  GEMESSEN (2026-08-18): Der Kennungs-Pfad beider Stellen ist META-SPEZIFISCH — kein anderes
  Ziel kommt darin vor; die alte Fassung feuerte auf eine Tatsache, die diese Stellen NIE
  erreicht.
  UNBERÜHRT BLEIBT der EINWILLIGUNGS-Pfad derselben Funktionen: `consentTargets` reist
  ziel-ÜBERGREIFEND durch sie hindurch. Meta-spezifisch ist die KENNUNG, nicht die
  Einwilligung.

- DER ZEIGER IN CLAUDE.md AUF `docs/claude-history/backlog-polish.md` IST FÜR EINE WÖRTLICHE
  SUCHE TOT
  GEMESSEN (2026-08-17): Er nennt „VOLLSTÄNDIGKEITS-ACHSE — WAS DANN SOFORT GILT" mit Umlaut
  und als Abschnitt; im Ziel steht ein AUFZÄHLUNGSPUNKT in ASCII-Umschrift
  (`VOLLSTAENDIGKEITS-ACHSE`). Gefunden nur, weil beide Schreibweisen probiert wurden.
  DOKU-PUNKT, EIGENE RUNDE — hier ausdrücklich nicht repariert. Ein Ort-Vorschlag steht nur
  für die zu ändernde Stelle (CLAUDE.md), nicht für eine Zielform.

- DER KOMMENTAR AN `mappingsEqual` NENNT DEN FALSCHEN SEPARATOR
  GEMESSEN am Repo (2026-08-18): Er sagt „Leerzeichen-Separator ist kollisionsfrei, da
  ps-IDs nur `[a-z0-9-]` sind (kein Leerzeichen)". Gebaut ist ein NUL-BYTE (`\x00`), kein
  Leerzeichen — gemessen als Byte 6974 von 8179 in `src/lib/mappings.ts`.
  DIE AUSSAGE ÜBER DIE KOLLISIONSFREIHEIT BLEIBT WAHR (ein NUL ist erst recht nicht in einer
  ps-ID); FALSCH IST DIE BEGRÜNDUNG, weil sie ein anderes Zeichen nennt als das gebaute.
  Genau dieses Byte ist ausserdem die gemessene Ursache der grep-Falle in jener Datei
  („Binary file … matches" statt der Trefferzeilen) — die Regel dazu steht in
  `docs/immer-beachten.md` unter „WERKZEUG-REGEL", Abschnitt zur Gegenrichtung.
  KOMMENTAR-vs-CODE-BEFUND AN EINER KERN-DATEI, EIGENE RUNDE. Kein Trigger benannt.

- ZWEI TABS ÜBERSCHREIBEN EINANDER LAUTLOS
  GEMESSEN am Code (2026-08-18): `updated_at` wird bei JEDEM Write gesetzt
  (`new Date().toISOString()`), aber an KEINER Stelle VERGLICHEN — kein `.eq` auf
  `updated_at`, keine Versionsspalte, kein `If-Match`, keine Sperre. Die einzigen Filter
  sind `.eq("id", projectId).eq("user_id", user.id)`, also EIGENTÜMERSCHAFT und nicht
  Nebenläufigkeit. Der zweite Write ersetzt den Blob des ersten VOLLSTÄNDIG.
  DASS DAS MUSTER IM REPO BEKANNT IST, zeigen DREI SERVER-seitige Read-Merges auf
  `settings` — `setCapiToken`, `removeCapiToken` und `publishProject` (alle
  `src/app/projects/actions.ts`). Sie schützen sich gegenseitig, aber NICHT gegen den
  Client: ein nachfolgendes `saveProject` ersetzt den Blob ganzheitlich.
  DIE EINORDNUNG GEHÖRT DAZU: Das trifft `settings.pixels` HEUTE schon genauso. Eine
  Zuordnung je Ereignistyp vergrössert das VOLUMEN des Verlusts, nicht seine KLASSE.
  TRIGGER: sobald ein Teilbaum des Blobs so gross wird, dass sein Verlust nicht in einer
  Minute nachgetragen ist.

- DER BLOB HAT KEINE GEMESSENE GRÖSSENGRENZE
  GEMESSEN (2026-08-18): Weder Code noch Schema prüfen etwas — kein
  `length`/`size`/`byteLength` auf `settings` in `src/` (ohne Testdateien, null Treffer),
  kein `CHECK` und keine Längenbeschränkung in `supabase/migrations/*.sql` (null Treffer).
  Die Spalte ist `settings jsonb NOT NULL DEFAULT '{}'` (GELESEN, `docs/db-stand.md`).
  DIE GRENZE DIESER AUSSAGE IST DER WICHTIGERE TEIL: NICHT gemessen sind die
  Postgres-eigene `jsonb`-Obergrenze und etwaige Limits von PostgREST bzw. Supabase auf die
  Payload-Grösse. Das ist KEINE Aussage über deren Nichtexistenz — es ist die Aussage, dass
  DIESES Repo nichts prüft. Kein Trigger benannt.

- VERWAISTE ZUORDNUNGEN ANZEIGEN
  Eine URN, deren Ereignisname nicht mehr im Schlüsselraum steht, ist heute unsichtbar und
  nur über einen Umweg wieder erreichbar — die Oberfläche zeigt ausschliesslich Namen aus
  dem Schlüsselraum. (Aus dem Zuschnitt 11.1d; dort ist BEHALTEN entschieden, und dieser
  Punkt nimmt das nicht zurück.)
  DER BESSERE ENDZUSTAND IST DIE WEG-C-HALTUNG DES REPOS, und sie ist gebaut und bewährt
  (GEMESSEN am Code, 2026-08-18, an `findOrphans` in `src/lib/mappings.ts` und der Sektion
  „⚠ Verwaiste Verknüpfungen" in `src/components/CodeImporter.tsx`): nichts still löschen,
  nichts raten, der Mensch entscheidet — Status ABGELEITET, nie gespeichert; Löschen nur
  nach Bestätigung; Neu-Verknüpfen nur nach expliziter Wahl.
  WARUM EIGENE SCHEIBE: Ein ZWEITER Verwaisten-Begriff in der Oberfläche braucht seinen
  eigenen Ort, seinen eigenen Wortlaut und die Abgrenzung gegen den bestehenden, der auf
  ELEMENTE zeigt und nicht auf Ereignisnamen.
  TRIGGER: sobald ein Betreiber meldet, dass eine eingetragene URN unauffindbar ist — ODER
  mit einer Anzeige-Runde.

- `withPixel` HEISST NICHT MEHR, WAS ER ENTHÄLT
  Seit Scheibe 11.1e trägt die Liste Ziele, die KEINEN Pixel führen — der Filter urteilt
  über beide Kennungsformen. Der Name behauptet damit das Gegenteil seines Inhalts.
  GEMESSEN am Repo (2026-08-19), UND DIESE FASSUNG ERSETZT EINE FRÜHERE ZÄHLUNG: Der
  Bezeichner steht VIERMAL im Rumpf von `getCapiConfigByTrackingKey`
  (`src/lib/capi/token.ts`) — die Bindung, der Frühausstieg, die `map` auf die `in`-Liste
  der Geheimnis-Abfrage und der Kopf der Paarungsschleife. Gemeldet waren SECHS.
  DIE ZWEITE HÄLFTE DER FRÜHEREN MELDUNG TRIFFT EBENFALLS NICHT ZU, und sie ist die
  wichtigere: Die Kommentare an derselben Stelle nennen den Bezeichner NICHT — sie
  umschreiben ihn („DER FILTER", „der Kosten-Absatz"). Genannt wird er in Kommentaren
  ANDERSWO: einmal in `src/lib/tracking/target-readiness.ts` und zweimal in
  `src/lib/tracking/target-readiness.test.ts` (die Treffer auf `projectWithPixel` in
  `src/lib/capi/token.test.ts` sind eine FIXTURE und nicht dieser Bezeichner).
  DAS VERSCHIEBT DEN PREIS, ES SENKT IHN NICHT: Eine Umbenennung zieht KEINE
  Entscheidungs-Prosa an der Fundstelle mit, dafür aber drei Nennungen in ZWEI ANDEREN
  Dateien — darunter `src/lib/tracking/target-readiness.ts`, deren Kopf-Absatz als
  unangetastet markiert ist und von `src/lib/tracking/target-adapters.ts` wörtlich zitiert
  wird.
  TRIGGER: mit der nächsten Runde, die `src/lib/capi/token.ts` ohnehin anfasst.
  Ausdrücklich KEIN Namensvorschlag.

- MIT 11.1f IST DIE VIERTE UNABHÄNGIGE DECKEL-KONSTANTE ENTSTANDEN
  Der Punkt ist NICHT neu: Er steht als „DER DECKELWERT IST MODUL-PRIVAT UND VON AUSSEN
  NICHT LESBAR" weiter oben in dieser Datei und ist dort am 2026-08-19 auf VIER nachgezogen
  worden. Dieser Eintrag steht hier nur, damit die Hebung der Phase 11.1 vollständig ist und
  niemand ihn ein zweites Mal aus der Standdatei holt.
  KEIN eigener Trigger — es gilt der dort genannte: die nächste Runde, die eine
  Forward-Datei ohnehin anfasst.

- EIN CODE-ZEIGER AUF EINEN ABSCHNITT DER ARCHIVIERTEN PHASE-11-STANDDATEI IST STUMPF
  GEMESSEN (2026-08-19): `src/components/MeasureView.tsx`, im Kommentar an der
  Adblocker-Kachel, verweist auf „Vorrat/Abschnitt 8 der Standdatei". EINEN ABSCHNITT
  DIESER NUMMER GIBT ES NUR IN DER BEREITS ARCHIVIERTEN
  `docs/claude-history/phase-11-multi-tracking-aktiver-stand.md` (dort „## 8. Die Hebung");
  seit deren Archivierung zeigt der Verweis ins Leere — die heutige Standdatei nummeriert
  ihre Abschnitte nicht.
  DIE ABGRENZUNG GEHÖRT DAZU, sonst wird beim Aufräumen das Falsche mitgenommen: Der
  ZWEITE Verweis auf dieselbe Datei — `src/lib/capi/pinterest-forward.ts`, Kopf („Sie
  standen seit dem 2026-08-05 in der Standdatei der Phase MIT DER ANGABE, sie seien hier
  aufgezaehlt") — ist KEIN Fall. Er trägt eine historische Aussage über die Phase 11 und
  ist als Zeitdokument richtig.
  WARUM NICHT MIT DER ARCHIVIERUNG DER PHASE 11.1 REPARIERT: Er ist kein Nebenprodukt jener
  Umbenennung, sondern ein Altbefund. Ihn dort mitzunehmen legte zwei Ursachen in einen
  Diff.
  KEIN TRIGGER, KEINE EMPFEHLUNG. GEMELDET, NICHT GEBAUT.

- DER CODE KANN KEINEN WERT AUS EINEM EINGABEFELD LESEN — UND FÜR LINKEDIN BRAUCHTE ER ES
  NICHT
  HERKUNFT: Roadmap-Zeile 11.1 (CLAUDE.md), Wortlaut dort. Der Befund steht am 2026-08-19
  hierher KOPIERT, nicht verschoben — die Roadmap-Zeile ist unverändert; erst ihr Kollaps
  entfernt ihn dort.
  DER SATZ, DER IHN HIERHER BRINGT, STEHT IN IHM SELBST: "Die Fähigkeit ist EIGENSTÄNDIG
  und hat keine eigene Roadmap-Zeile; ihre Verortung ist offen." Ein Befund, der seine
  eigene Ortlosigkeit protokolliert, verlöre mit dem Kollaps auch den letzten Ort.
  GEMESSEN AM CODE (2026-08-17), DREI ACHSEN:
  · Das Mapping-Modell kennt GENAU DREI Aktionstypen — redirect, text, track (die Union
    `Mapping` in `src/lib/mappings.ts`); keiner trägt oder liest einen Feldwert. Der
    Betrag in `TrackConfig` wird im Panel eingetippt, nicht von einer Seite gelesen.
  · Wert-tragende Eingabeelemente werden GAR NICHT ERKANNT und bekommen deshalb auch keine
    dauerhafte Kennung: `stabilizeDoc`/`stabilizeIds` (`src/lib/detect.ts`) ankert nur, was
    `classify` (dieselbe Datei) annimmt, und die Selektoren dort kennen `input` NUR als
    Knopf (`BUTTON_SELECTOR`: `input[type=submit|button|image]`). `input[type=text]` und
    Verwandte, `textarea` und `select` stehen in KEINEM Selektor.
  · Im ERZEUGTEN Client-Code steht kein Lesezugriff auf den Wert eines Eingabeelements —
    geprüft an allen fünf Erzeugern: `buildWiringScript` (`src/lib/generate.ts`),
    `buildMetaRuntime` (`src/lib/tracking/meta.ts`), `buildConsentRuntimes`
    (`src/lib/tracking/consent.ts`), `LISTENER_SCRIPT` (`src/lib/detect.ts`) und
    `injectPageViewEmitter` (`src/lib/analytics/pageview-emitter.ts`).
  DIE REICHWEITE DIESES NICHT-TREFFERS GEHÖRT DAZU, sonst ist die Abwesenheits-Behauptung
  hohl: Abgesucht ist die Achse "Lesen von .value an einem Element", und für sie ist die
  POSITIVKONTROLLE BESTANDEN — dieselbe Suche findet `input.value` in `classify`
  (`src/lib/detect.ts`), wo der KNOPF-BESCHRIFTUNGS-Wert gelesen wird und kein
  Formularwert. NICHT positiv kontrolliert sind die Achsen `FormData` und Zugriff über
  `.elements` bzw. `[name=…]`: beide Konstrukte kommen im gesamten `src/` nirgends vor, ein
  Nicht-Treffer auf ihnen ist daher unbelegt.
  DIESER BEFUND IST EINE AUSSAGE ÜBER DEN CODE, nicht über ein Ziel — er sagt, was das
  Mapping-Modell HEUTE kann, und daraus folgte erst, dass 11.1 es nicht brauchte.
  TRIGGER: sobald eine Kennungsform gebraucht wird, die einen Wert aus einem Eingabefeld
  liest — bei LinkedIn wäre das die gehashte E-Mail-Adresse (docs/ziel-befunde.md, Teil
  (b)/(i)). KEINE Empfehlung, ob und wie gebaut wird.

- DER ZEIGER AM TEIL (a) IN `docs/ziel-befunde.md` IST STUMPF
  FUNDSTELLE: `docs/ziel-befunde.md`, Abschnitt „LinkedIn (Conversions API)",
  Messprotokoll 2026-08-15, Teil (a) — Ankersatz „DIE RICHTIGSTELLUNG DAZU STEHT NICHT
  HIER".
  WAS ER HEUTE SAGT, im Wortlaut: „DIE RICHTIGSTELLUNG DAZU STEHT NICHT HIER, sondern an
  der Roadmap-Zeile 11.1: dort stand die widerlegte Angabe, und dort sucht sie, wer den
  alten Satz kennt."
  WARUM ER STUMPF IST: Er steht im PRÄSENS und nennt einen Ort, der den Inhalt nicht mehr
  trägt. Die Roadmap-Zeile 11.1 ist am 2026-08-19 kollabiert (Commit `3523c0a`); die
  Richtigstellung stand in ihrem Rumpf und ist mit ihm entfallen.
  WO DIE SUBSTANZ LEBT: in DERSELBEN Datei — Teil (a) und Teil (i) —, dazu der
  `isIpv4`-Riegel in `src/lib/capi/linkedin-forward.ts`. Der Zeiger nennt also nur EINEN
  Ort, der sie nicht mehr trägt; verloren ist nichts.
  KEIN TRIGGER, KEINE EMPFEHLUNG. GEMELDET, NICHT GEBAUT.

- DER ZEIGER AM TEIL (d) IN `docs/ziel-befunde.md` IST STUMPF
  FUNDSTELLE: `docs/ziel-befunde.md`, Abschnitt „LinkedIn (Conversions API)",
  Messprotokoll 2026-08-15, Teil (d) — Ankersatz „DASS DAS EINE PRODUKTZUSAGE KIPPT".
  WAS ER HEUTE SAGT, im Wortlaut: „DASS DAS EINE PRODUKTZUSAGE KIPPT, steht als EIN Satz
  an der Roadmap-Zeile 11.1 — hier steht der Befund, dort seine Folge für den Zuschnitt."
  WARUM ER STUMPF IST: Dieselbe Ursache wie beim Zeiger davor — Präsens auf den Rumpf
  einer kollabierten Zeile.
  WO DIE SUBSTANZ LEBT: `CLAUDE.md`, „## Offene Punkte", Eintrag „BETREIBER-DOKUMENTATION
  FEHLT — ZWEI PUNKTE", dort der Absatz „ERGÄNZT AM 2026-08-19 (Hebung Phase 11.1) —
  PUNKT (2) IST SEIT 11.1f NICHT MEHR NUR THEORETISCH BERÜHRT". Die Folge für das Produkt
  ist damit verortet, nur nicht mehr dort, wohin der Zeiger weist.
  KEIN TRIGGER, KEINE EMPFEHLUNG. GEMELDET, NICHT GEBAUT.

- DIE PHASE-11-ROADMAP-ZEILE FÜHRT 11.1 NOCH ALS NICHT GEBAUT
  FUNDSTELLE: `CLAUDE.md`, Roadmap-Zeile „Phase 11 — Multi-Tracking (Server-Side
  Fan-Out)", letzter Absatz.
  WAS SIE HEUTE SAGT, im Wortlaut: „DER HAKEN GILT DEM GEBAUTEN TEIL. Was NICHT gebaut
  wurde, steht als eigene Zeile darunter (11.1–11.4 und 11.6) — NICHT als Sammelposten,
  weil die offenen Ziele KEINE Klasse sind."
  WARUM SIE FALSCH GEWORDEN IST: 11.1 ist gebaut, live bewiesen und am 2026-08-19
  kollabiert; die Aufzählung nennt sie weiterhin unter dem, was NICHT gebaut wurde. Der
  Satz davor und der Grundsatz dahinter („KEINE Klasse") sind unberührt — falsch ist
  allein die Aufzählung.
  WO DIE SUBSTANZ LEBT: Der gebaute Stand steht in der kollabierten Zeile 11.1 selbst und
  in `docs/claude-history/phase-11.1-linkedin.md`. Hier fehlt nichts, hier steht etwas zu
  viel.
  KEIN TRIGGER, KEINE EMPFEHLUNG. GEMELDET, NICHT GEBAUT.

## Nachtrag 2026-08-31 — BEOBACHTUNG AUS DEM LIVE-TEST DER SCHEIBE 3 (kosmetisch)

- DAS LAYOUT UNTER DER LINKEDIN-KARTE LIEST SICH ZERRISSEN.
  DIE BEOBACHTUNG (OWNER, 2026-08-31, am Live-Test der Scheibe 3): Die Abschnitte
  "Verwendete Events" und "Conversion-Regeln" wirken optisch direkt an die
  LinkedIn-Karte angehängt, als gehörten sie zu ihr. Der Bereich MESSEN liest sich an
  dieser Stelle zerrissen.
  KOSMETISCH, KEIN BLOCKER: Es geht keine Aussage verloren und nichts wird falsch
  dargestellt — die Zuordnung ist nur nicht auf einen Blick erkennbar.
  WARUM ES HIER UND NICHT ALS OFFENER PUNKT STEHT: Es gibt keinen Zeitpunkt, zu dem es
  still kaputtginge. Das UI wird ohnehin neu gestaltet; wer das tut, nimmt es mit.
  KEIN TRIGGER, KEINE EMPFEHLUNG zur Bauform. GEMELDET, NICHT GEBAUT.

## Aus Phase 11.8 gehoben (2026-09-08) — Vorrats-Punkte aus docs/aktiver-stand-11.8.md

HERKUNFT: Der Vorrat der Phase 11.8 (Autorisierungsschicht), gehoben am 2026-09-08 im
Rahmen des nachgeholten Phasenendes — Schritt 1 war beim Abschluss am 2026-08-27
übersprungen worden. Die Nummern sind die des Ursprungs und werden NICHT neu vergeben.
VON SIEBEN VORRATS-EINTRÄGEN KOMMEN DREI HIERHER. Einer (6) ist als offener Punkt nach
docs/offene-punkte.md gegangen, weil er einen Trigger trägt; drei (4, 5, 7) sind
GESTRICHEN worden, weil ihr Gegenstand erledigt ist — der Beleg je Streichung steht am
Zeiger in der Herkunftsdatei.

1. **DIE VIER BESTEHENDEN ZIELE TRAGEN IHR GEHEIMNIS HEUTE ALS KLARTEXT.** GEMESSEN am
   Migrations-SQL (CC, 2026-08-25): `project_secrets` trägt `secret text not null` als
   Skalar, und der Kommentar an dieser Spalte sagt es ausdrücklich — "KLARTEXT, wie in
   project_tokens. Tragende Kontrolle ist die ISOLATION (eigene Tabelle + RLS ohne jede
   Policy), NICHT Verschluesselung."
   WAS SICH MIT DEN ENTSCHEIDUNGEN DER PHASE 11.8 ÄNDERT: Aus einem Dauerzustand wird ein
   ÜBERGANGSZUSTAND MIT ENDE. Die additive Form — neue Spalte neben dem Skalar, CHECK auf
   genau eines von beiden — macht ihn strukturell sichtbar, und jedes Ziel wandert einzeln.
   WAS SICH NICHT ÄNDERT: DIE WANDERUNG IST NICHT ZUGESCHNITTEN UND NICHT TERMINIERT. Sie
   ist keine Scheibe, kein Plan und kein Termin — sie ist GEMELDET.
   KEIN TRIGGER. KEINE EMPFEHLUNG, weder zum Zeitpunkt noch zur Reihenfolge der vier Ziele.
   AM 2026-09-08 ERNEUT GEPRÜFT (CC): Der Zustand besteht unverändert —
   `0021_project_secrets.sql` führt weiterhin `secret text not null`; `secret_enc` ist mit
   Migration 0025 ADDITIV danebengetreten und hat den Skalar nicht ersetzt.
   PROVENIENZ: der Klartext-Zustand GEMESSEN am Migrations-SQL (2026-08-25) und am Repo
   (2026-09-08); die Folge aus den Entscheidungen ist eine ABLEITUNG aus docs/roadmap.md,
   Eintrag 11.8, Block vom 2026-08-25 — keine Messung.

2. **`pinterest` STEHT IM target-CHECK UND TRÄGT NULL ZEILEN.** GEMESSEN (Owner,
   2026-08-25): linkedin 2 · meta 4 · tiktok 1 · **pinterest 0**.
   WAS AM REPO NICHT ENTSCHEIDBAR IST: ob das Ziel NIE konfiguriert war oder ob eine Zeile
   wieder entfernt wurde. Beide Zustände sehen heute identisch aus — die Tabelle führt kein
   Protokoll, und `removeCapiToken` löscht die Zeile ersatzlos.
   FALLS ERSTERES: Dann hätte der Pinterest-Adapter NIE live gesendet und trüge eine offene
   LIVE-TEST-SCHULD — an einem Ziel, das im CHECK steht und damit konfigurierbar aussieht.
   GEMELDET, NICHT GEPRÜFT. Die Prüfung wäre eine eigene Arbeit (Anbieter-Oberfläche oder
   Ereignis-Protokoll). KEIN TRIGGER, KEINE EMPFEHLUNG.
   WARUM ER TROTZ SEINES PRODUKT-GEWICHTS HIER UND NICHT IN docs/offene-punkte.md STEHT:
   Er trägt keinen Trigger, und ein erfundener wäre genau die Formulierung, die jene Datei
   nicht zulässt. AM 2026-09-08 NICHT NEU GEZÄHLT — die Zahlen stammen aus einer Abfrage
   gegen die laufende Datenbank, und diese Runde hat keine gefahren.
   PROVENIENZ: die Zeilenzahlen GEMESSEN (Owner, 2026-08-25); die Folgerung "dann nie live
   gesendet" ist eine ABLEITUNG und ausdrücklich keine Messung.

3. **BEIDE ABLAUFZEITPUNKTE STECKEN IM CHIFFRAT.** Die Nutzlast trägt sie als Felder
   (`accessTokenExpiresAt` und `refreshTokenExpiresAt` in
   `src/lib/secrets/oauth-payload.ts`), und die Nutzlast geht verschlüsselt in
   `project_secrets.secret_enc`. `project_secrets` TRÄGT KEINE ABLAUF-SPALTE — GEMESSEN
   (CC, 2026-08-27, erneut 2026-09-08 über die Migrationen 0021, 0025, 0026 und 0027: kein
   Treffer).
   DIE FOLGE, und sie ist der ganze Eintrag: Eine Überwachung, die wissen will, WELCHE
   Zugänge demnächst ablaufen, müsste JEDE Zeile entschlüsseln. Es gibt keine Spalte, über
   die sich das filtern oder sortieren liesse.
   DAS IST KEIN ENTWURFSFEHLER, SONDERN DIE ANDERE SEITE EINER ENTSCHEIDUNG: Der Ablauf
   steht in der Nutzlast, weil sie der eine Ort der Form ist; eine zweite, unverschlüsselte
   Kopie in einer Spalte wäre eine zweite Wahrheit, die neben dem Chiffrat altert.
   HEUTE KEIN PROBLEM, UND AUSDRÜCKLICH KEIN BAUAUFTRAG. Es gibt keine Überwachung, die das
   bräuchte.
   WARUM ER KEIN OFFENER PUNKT IST — der Eintrag begründet es selbst: "Ein offener Punkt
   braucht einen TRIGGER, und für diesen ist keiner benennbar, der nicht erfunden wäre.
   ‚Falls es je nötig wird' ist genau die Formulierung, die docs/offene-punkte.md nicht
   zulässt."
   EIN NEBENSATZ DES URSPRUNGS IST ÜBERHOLT, und er wird hier NICHT mitgeschleppt: Dort
   stand "und keine Zeile mit einem Chiffrat". Es gibt seit der Phase 11.2 Chiffrate; die
   Kernaussage — die fehlende Spalte — ist davon unberührt. GEMESSEN am Repo (CC,
   2026-09-08).
   PROVENIENZ: die fehlende Spalte und der Feldsatz der Nutzlast sind GEMESSEN am Repo (CC,
   2026-08-27 und 2026-09-08). Die Folge für eine Überwachung ist eine ABLEITUNG daraus und
   keine Messung.

## Aus Phase 11.2 gehoben (2026-09-08) — Vorrats-Punkte aus docs/aktiver-stand-vorrat.md

**WOHER SIE KOMMEN:** Aus dem Vorrat der Phase 11.2, beim Phasenende am 2026-09-08. Der
Vorrat führte SECHSUNDSECHZIG Einträge; **FÜNFZIG stehen hier**, VIERZEHN sind als offene
Punkte gehoben (docs/offene-punkte.md, je mit Stub in CLAUDE.md), ZWEI sind gestrichen.
**DIE URSPRUNGS-NUMMERN SIND UNVERÄNDERT** — sie sind aus dem Vorrat übernommen und NICHT
neu vergeben; die Lücken in der Zählung sind die gehobenen und die gestrichenen. Wer eine
fehlende Nummer sucht, sucht sie in docs/offene-punkte.md oder findet sie im Protokoll der
Hebung an der Roadmap-Zeile 11.2.

**DAS KRITERIUM, NACH DEM SORTIERT WURDE, und es ist schärfer als die Fortschreibungs-Regel
dieser Datei bisher sagte:** Nach docs/offene-punkte.md geht nur, was einen **benennbaren
Trigger** trägt **UND** sonst **STILL kaputtgeht**. Der Trigger allein trennt nicht — fast
jeder Vorrats-Eintrag trägt einen, und eine Aufräumarbeit mit dem Trigger "die nächste
Runde, die diese Datei ohnehin öffnet" ist keine Sache, die still kaputtgeht.
**GEMESSEN AN DIESER RUNDE (CC, 2026-09-08):** Nach dem Trigger allein wären es
FÜNFUNDFÜNFZIG von 66 gewesen, nach beiden Kriterien sind es VIERZEHN. Die Differenz von
41 wäre als Stub in eine Datei gewandert, die JEDE Sitzung lädt — und hätte einen offenen
Punkt ("CLAUDE.md NÄHERT SICH DEM LADELIMIT") ausgelöst.
**DER TEXT DER EINTRÄGE IST ZEICHENGLEICH ÜBERNOMMEN.** Kein Wort umformuliert, keine
Zeile gekürzt; wo unten ein Zusatz steht, ist er als solcher gekennzeichnet.

**FÜNF EINTRÄGE STEHEN HIER, OBWOHL IHR GEGENSTAND ERLEDIGT IST — 7, 15, 22, 27 und 41.**
Jeder von ihnen sagt in seinem eigenen Text, er bleibe wegen seiner MESSUNG bzw. als BELEG
stehen ("DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINER MESSUNG"). Mit dem Löschen der
Vorratsdatei überlebt dieses Stehenbleiben nur hier. **SIE SIND NICHT OFFEN** — wer sie als
offene Posten liest, liest sie falsch; ihr Erledigungs-Vermerk steht in ihrem eigenen Text.

2. **GENAU EINE STELLE IM REPO ZERLEGT EINEN QUERY-STRING, UND ES IST DIE EIGENE.**
   DIE FRÜHERE FASSUNG DIESES EINTRAGS BEHAUPTETE, ES ZERLEGE KEINE — DAS IST SEIT DEM
   COMMIT 6653f37 FALSCH UND WIRD NICHT GERETTET. Der Eintrag ist ERSETZT.
   WAS VON IHM BLEIBT, IST EIN BEFUND ÜBER DEN BESTAND VORHER, und der ist als
   ZEITANGABE weiterhin richtig: Bis zum 6653f37 zerlegte KEINE Stelle im Repo einen
   Query-String — GEMESSEN am 2026-08-24 und am 2026-08-25 erneut, auf der breiteren
   Achse unten. Aufgehoben hat ihn genau dieser Commit.
   DER STAND HEUTE — GEMESSEN am Repo (CC, 2026-08-25). ACHSE: src/** über *.ts und
   *.tsx, EINSCHLIESSLICH Testdateien, binärsicher gelesen, Begriffe URLSearchParams ·
   location.search · searchParams · "new URL(" · decodeURIComponent · split("&"):
   · ZERLEGT WIRD AN GENAU EINER STELLE: extractGoogleClickIds
     (src/lib/capi/google-click-ids.ts) über URL.searchParams.
   · ZWEI URL-KONSTRUKTOREN IM PRODUKTIVCODE, und der Unterschied zwischen ihnen ist
     der Punkt: isValidRedirectUrl (src/lib/mappings.ts) baut zwar eine URL, liest
     aber AUSSCHLIESSLICH das Protokoll und rührt searchParams nicht an. Einen
     Konstruktor zu zählen ist deshalb etwas anderes, als eine Zerlegung zu zählen.
   · Alle übrigen Treffer liegen in Testdateien (proxy.test.ts,
     supabase/middleware.test.ts) und dienen dem BAUEN einer Anfrage bzw. dem Lesen
     von pathname. Auf decodeURIComponent und split("&") gibt es ausserhalb eines
     Testkommentars KEINEN Treffer.
   DIE BINÄRSICHERHEIT IST KEINE FORMALIE, UND SIE IST JETZT GEMESSEN: src/lib/mappings.ts
   trägt GENAU EIN NUL-Byte. Eine gewöhnliche Suche meldet dort "Binary file … matches"
   STATT der Trefferzeile, und ein Datei-Suchwerkzeug übergeht sie stillschweigend —
   die Datei fällt still aus jeder Achse heraus, und wer ohne diese Vorkehrung sucht,
   ÜBERSIEHT AUSGERECHNET DEN ZWEITEN KONSTRUKTOR.
3. **EIN ADAPTER HAT KEINEN RÜCKKANAL — AUF ZWEI EBENEN, NICHT AUF EINER.** GEMESSEN
   am Code (CC, 2026-08-25):
   · EBENE 1, DAS MELDEN: Der Typ Forwarder (src/lib/capi/ingest.ts) gibt
     Promise<void> zurück. Ein Adapter, der ein Ereignis verwirft, kann das nicht
     mitteilen. Dasselbe gilt für den Verteiler dispatchForward, der für ein Ziel ohne
     Adapter Promise.resolve() liefert — ein ÜBERSPRUNGENES und ein ZUGESTELLTES Ziel
     sind am Rückgabewert nicht zu unterscheiden.
   · EBENE 2, DAS SEHEN: Am Aufrufort wird das Ergebnis-Array von Promise.allSettled
     WEDER GEBUNDEN NOCH GELESEN NOCH GELOGGT; unmittelbar danach steht die 204. Ein
     abgewiesener Empfänger ist dort strukturell unbeobachtbar.
   DAS allSettled SELBST IST ABSICHT UND WIRD NICHT ANGETASTET: Es trägt das
   204-Containment — "allSettled rejectet NIE, also kann kein Empfaenger einen Wurf aus
   diesem Handler heraustragen" (Kommentar an der Fan-Out-Stelle in ingest.ts; die
   Regel dahinter ist INGEST-204-CONTAINMENT in docs/immer-beachten.md). Wer Ebene 2
   "repariert", indem er allSettled ersetzt, bricht eine Sicherheitsgarantie.
   FÜR EIN ZIEL, DAS OHNE KLICK-KENNUNG NICHTS SENDEN KANN, WÄRE DIE VERWERFUNG AUF
   BEIDEN EBENEN STUMM. Der Kandidat dazu steht in docs/claude-history/backlog-polish.md,
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN"; die Regel "JEDES WEITERE
   FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT" hält fest, dass ein
   solcher Kanal ALLE VIER bestehenden Adapter berührt.
7. **DIE NORMALISIERUNG DER KUNDENNUMMER GEHÖRT AN DIE EINGABE, NICHT IN DEN REINEN
   BAUER.** GEMESSEN 2026-08-28 (OWNER), Messung B1: `operatingAccount.accountId` muss
   numerisch sein — "000-ERFUNDEN-000" wird mit `INVALID_NUMBER_FORMAT` abgewiesen
   (docs/ziel-befunde.md, Teil (bt)).
   DER PREIS, UND ER IST DER GRUND FÜR DIESEN EINTRAG: **Google Ads zeigt Kundennummern
   MIT Bindestrichen an.** Ein Betreiber schreibt ab, was er sieht. Ohne Normalisierung
   an der EINGABE entsteht ein STILLER Fehlschlag — die Anfrage wird abgewiesen, niemand
   sieht etwas, und die Conversion fehlt.
   **buildIngestEventsRequest NORMALISIERT AUSDRÜCKLICH NICHT UND SOLL DAS NICHT ÄNDERN**
   — der reine Bauer reicht beide Kennungen unverändert durch, und diese Entscheidung
   steht im Zuschnitt dieser Scheibe. Der Ort für die Normalisierung ist die Stelle, an
   der der Betreiber die Nummer eingibt; die gibt es heute nicht.
   GRENZE: Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
   gemessen (s. Teil (bt)).
   TRIGGER: die Ablage-Scheibe für die Konto-Kennungen.

   **VERMERK 2026-08-31 — TRIGGER EINGETRETEN, UND DIESER EINTRAG GILT. ENTSCHIEDEN
   (OWNER, 2026-08-31).**
   Die Ablage-Scheibe ist zugeschnitten (s. den Abschnitt "Die Konto-Kennungen bekommen ihre
   Eingabe"), damit ist der Trigger dieses Eintrags erfüllt — **und anders als bei einem
   blossen Trigger-Vermerk ist die Frage dahinter jetzt beantwortet.**
   · **WAS DER ZUSCHNITT EINLÖST:** Den Ort, den dieser Eintrag vermisst hat — "die Stelle,
     an der der Betreiber die Nummer eingibt; die gibt es heute nicht" — **gibt es mit
     Scheibe 2.** Und der zweite Halbsatz des Titels ist unberührt: Der reine Bauer
     `buildIngestEventsRequest` wird von dieser Scheibe nicht angefasst.
   · **DIE ENTSCHEIDUNG, IN EINEM SATZ: ES WIRD AN DER EINGABE NORMALISIERT — DIESER EINTRAG
     GILT WÖRTLICH, MIT TITEL UND RUMPF.** Damit ist er **kein Vorrats-Posten mehr im Sinne
     des Kopfes dieses Abschnitts** ("NICHT gebaut und NICHT entschieden"): **nicht gebaut,
     aber entschieden.**
   · **DIE ENTSCHEIDUNG TRÄGT EINE FESTLEGUNG, UND ZWAR DIE SECHSTE DES ZUSCHNITTS DER
     SCHEIBE 2** ("DIE KUNDENNUMMER WIRD AN DER EINGABE NORMALISIERT", 2026-08-31). Was sie
     sagt — Bindestriche und Leerraum fallen, sonst nichts, an der Eingabe, nur die
     Kundennummer, sichtbar — steht **dort und nicht hier**; zweimal geschrieben liefe es
     auseinander.
   · **EINE GEGENFASSUNG IST ERWOGEN UND ZURÜCKGEZOGEN WORDEN, und sie gehört festgehalten,
     damit niemand sie für ungeprüft hält und neu vorbringt:** Sie hätte das Gegenteil gesagt
     — keine Normalisierung im Code, die Form nur im Platzhalter und im Hinweistext der
     Karte. **Ihre Begründung war eine Asymmetrie:** eine falsche Normalisierung schreibe
     einen veränderten Wert in die Datenbank, und niemand sehe mehr, was der Betreiber
     getippt hat.
     **SIE IST WIDERLEGT, NICHT ÜBERSTIMMT** (ARCHITEKT, 2026-08-31): Das Argument trifft
     eine **VERSTECKTE** Transformation, also eine server-seitige Umformung. Hier ist es ein
     **Eingabefeld**, und der gespeicherte Wert steht sichtbar darin. Dazu ein Präzedenzfall
     im Haus — `setPixelId` trimmt bereits, eine Normalisierung an der Eingabe ist gebaut,
     nur eine schwächere. **Die volle Herleitung steht an Festlegung (6) selbst.**
   · **WAS DIE ENTSCHEIDUNG NICHT BERÜHRT — FESTLEGUNG (5) DES ZUSCHNITTS BLEIBT WÖRTLICH
     STEHEN.** Sie sagt, dass die beiden Kennungen **nicht auf FORM GEPRÜFT** werden, weil
     eine Prüfung auf beiden Achsen erfunden wäre. **PRÜFEN UND NORMALISIEREN SIND ZWEI
     VERSCHIEDENE DINGE:** Das eine WEIST AB, das andere VERÄNDERT. Wer die Entscheidung als
     Aufhebung von Festlegung (5) liest, baut eine Formprüfung, die niemand entschieden hat.
   · **DIE GRENZE DIESES EINTRAGS GILT UNVERÄNDERT MIT, UND SIE IST JETZT DIE GRENZE DER
     ENTSCHEIDUNG:** Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
     gemessen (Teil (bt)). Die Normalisierung ruht damit auf einer **Lesung plus einer
     Messung, die zwei Ursachen nicht trennt** — nicht auf einem Beleg, dass Bindestriche
     abgewiesen werden. **Zeigt Scheibe 4 an einer echten Antwort etwas anderes, ist sie neu
     zu bewerten.**
   · **WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST:** WIE normalisiert wird — welche Zeichen
     fallen, ob beim Schreiben oder beim Lesen, und was mit einem Wert geschieht, der danach
     leer wäre. Das ist Sache des Bau-Plans, wie der TRIM aus Festlegung (5).
   PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
   Existenz des Zuschnitts (CC, 2026-08-31). **Die Entscheidung ist eine OWNER-ENTSCHEIDUNG
   vom 2026-08-31 — keine Messung und keine Ableitung.** Der gemessene Stand, auf dem sie
   ruht, steht unverändert im Rumpf dieses Eintrags.

   **ERLEDIGT AM 2026-08-31 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINER MESSUNG UND
   SEINER GRENZE.** Bauform wie bei Eintrag 15: ein eigener datierter Absatz UNTER dem
   unveränderten Eintrag, mit Datum, Grund und dem, was ihn eingelöst hat.
   **WAS IHN EINLÖST:** Der Eintrag sagte "Der Ort für die Normalisierung ist die Stelle,
   an der der Betreiber die Nummer eingibt; **die gibt es heute nicht**." **ES GIBT SIE
   JETZT, UND DORT WIRD NORMALISIERT** — `NORMALIZE_PIXEL_ID` in `src/lib/settings.ts`,
   gerufen aus `setPixelId`, also im Schreibpfad der Eingabe. Bau-Commit `6dc7e27`, live
   bestätigt (VERMERK 9, Schritt 2: die Bindestriche fallen sichtbar im Feld).
   **DER ZWEITE HALBSATZ DES TITELS IST EINGEHALTEN:** `buildIngestEventsRequest`
   normalisiert weiterhin nicht und ist nicht angefasst worden.
   **WARUM DER EINTRAG NICHT GELÖSCHT WIRD — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
   (1) Seine MESSUNG (Teil (bt): `INVALID_NUMBER_FORMAT` auf `account_id`) ist der Beleg,
   auf dem die Umformung überhaupt ruht. (2) Seine GRENZE — dass **nicht isoliert gemessen
   ist, ob die Bindestriche der Grund der Abweisung waren** — ist der MASSSTAB für jede
   spätere Frage an dieser Achse, etwa den Schrägstrich aus Eintrag 28 oder den
   Zeichenvorrat aus Eintrag 29. **Ein gelöschter Eintrag nähme beide mit.**
   **ERSETZT AM 2026-08-31:** Hier stand ein Vermerk, der die Frage als OFFEN und beim Owner
   liegend führte. Er beschrieb einen Vorgangs-Zustand, der mit der Entscheidung vorbei ist;
   ihn stehenzulassen hiesse, neben einer getroffenen Entscheidung zu behaupten, sie stehe
   aus. **Was er festhielt — dass eine Gegenrede erwogen wurde —, ist oben aufgenommen und
   nicht verloren.**
11. **G18/G19 MESSEN UNSERE VERZWEIGUNG, NICHT DIE FEHLERFORM DER LAUFZEIT.** Die zwei
    Tests, die den verschobenen Deckel bewachen (Entscheidung B-4), arbeiten mit einer
    Attrappe, die **den Namen `AbortError` SELBST WÄHLT**. Sie beweisen, dass unsere
    Verzweigung diesen Namen richtig behandelt.
    **WAS SIE NICHT BEWEISEN: ob die Laufzeit bei einem Abbruch WÄHREND DES RUMPF-LESENS
    denselben Namen wirft.** Das ist UNGEMESSEN — für `fetch` selbst ist das Verhalten im
    Bestand mehrfach beobachtet, für den Rumpf-Strom nicht.
    **DER SCHADEN WÄRE BEGRENZT, und der Satz gehört dazu, damit der Posten nicht grösser
    gelesen wird als er ist:** Beide Wege enden in `retry` — nur die Diagnose wäre
    `network` statt `timeout`. **OHNE DIESEN EINTRAG GILT DIE ACHSE BEIM NÄCHSTEN LESEN
    ALS GEPRÜFT**, weil zwei grüne Tests danebenstehen.
    GILT FÜR G18 UND G19 GLEICHERMASSEN.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die erste Runde, die einen echten Abbruch am Rumpf-Strom beobachten kann.
12. **TEIL (bv) IST MEHRDEUTIG UND BLEIBT ES.** "Kein neues Erneuerungs-Token an die
    Stelle des alten" trennt **"das Feld fehlt"** nicht von **"das Feld trägt denselben
    Wert"**.
    **DER BAU IST UNTER BEIDEN AUSLEGUNGEN RICHTIG** — `toRefreshedPayload`
    (src/lib/oauth/google-refresh.ts) übernimmt einen vorhandenen, nicht-leeren Wert und
    lässt sonst den abgelegten stehen; er bliebe auch dann richtig, wenn der Anbieter
    eines Tages doch rotierte. **DER POSTEN IST NICHT DER CODE, SONDERN DIE FUNDSTELLE:**
    Solange der Satz dort steht, leitet die nächste Runde die Mehrdeutigkeit neu ab.
    NICHT IN DIESER RUNDE: docs/ziel-befunde.md bleibt unberührt.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dann wird es
    dort nachgezogen.
14. **DER KOMMENTARKOPF VON `createAdminClient` IST ZU WEIT.** Er sagt: "GESCHRIEBEN wird
    in BEIDE — project_secrets UND project_tokens (Doppelschreib in
    setCapiToken/removeCapiToken; die Alt-Tabelle ist die Rollback-Reserve)".
    **GEMESSEN am Code (CC, 2026-08-29):** Der `project_tokens`-Zweig in `setCapiToken`
    liegt hinter `if (target === META_TARGET)`, ebenso der in `removeCapiToken`. Für die
    drei anderen Ziele beschreibt der privilegierte Client **nur EINE** Tabelle.
    **ALS AUSSAGE ÜBER META RICHTIG, ALS AUSSAGE ÜBER DEN CLIENT ZU WEIT** — und der Satz
    steht dort, um zu erklären, WOFÜR es diesen Client gibt; mit einer Tabelle zu viel
    erklärt er einen Doppelschreib, den es für drei von vier Zielen nicht gibt.
    FUNDSTELLE: `src/lib/supabase/admin.ts`, Kommentarkopf von `createAdminClient`.
    **AUSDRÜCKLICH NICHT MITGEZÄHLT:** `setCapiToken` schreibt zusätzlich `projects`
    (settings und tracking_key) — aber über den SSR-Client, nicht über diesen. Der
    Kommentar ist an dieser Stelle also nicht unvollständig, sondern nur zu weit.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/lib/supabase/admin.ts` ohnehin anfasst.
15. **DIE FIXTURE-LISTEN IN `CodeImporter.test.tsx` SIND UNGEPRÜFT.** Mehrere Läufe dort
    schreiben Consent-Schlüsselmengen als Literal ab (`toEqual(["meta", "pinterest",
    "tiktok"])` und Verwandte) und prüfen damit den ausgelieferten Text eines konkreten
    Fixtures, nicht die Konstante.
    **OB SIE BEI EINEM FÜNFTEN ZIEL BRECHEN, HÄNGT AM FIXTURE UND IST NICHT ERHOBEN.**
    Der Unterschied zu den zwei Zahlen aus Festlegung (5) ist genau dieser: jene sind
    GEMESSEN und brechen sicher, diese sind UNGEMESSEN und brechen vielleicht.
    Beides ungeprüft in einen Bau-Plan zu schreiben wäre dieselbe Sicherheit für zwei
    verschiedene Wissensstände.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: Stufe 1 der Scheibe 3 — dort ist es ein GATE, kein Hinweis.

    **ERLEDIGT AM 2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG.**
    Gate (1) der Stufe 1 hat es beantwortet (GEMESSEN am Repo, CC, 2026-08-29): **Alle
    ACHT Läufe D-T1 bis D-T8 zählen ihr `pixels`-Objekt VOLLSTÄNDIG auf, und KEINER trägt
    einen `google`-Eintrag.** Das Memo `consentTargets` filtert über
    `isTargetDeliverable`; ein Ziel ohne Kennung erscheint in keiner der geprüften
    Mengen. **Sie brechen nicht** — und der volle Lauf nach der Aufnahme hat es bestätigt:
    von den 1376 Bestandstests fielen genau die ZWEI fest verdrahteten Längen-Zahlen,
    keine Fixture-Liste.
    **MITGEPRÜFT UND HIER FESTGEHALTEN, weil der Eintrag es nicht nannte:**
    `TargetCard.test.tsx` enthält EINE kartenzählende Zusicherung
    (`getAllByText(STATUS_CONFIGURED)).toHaveLength(1)`). Auch sie bricht nicht — die
    Liste der konfigurierten Ziele ist dort gemockt.
    **WARUM DER EINTRAG NICHT GELÖSCHT WIRD:** Ein gelöschter Eintrag nähme die MESSUNG
    mit. Die Frage "brechen die Fixture-Listen beim nächsten Ziel?" stellt sich beim
    sechsten wieder, und dann ist der Unterschied zwischen "geprüft und tragfähig" und
    "nie geprüft" die ganze Auskunft.
    **DIES IST DIE ERSTE ERLEDIGT-KENNZEICHNUNG IN DIESEM VORRAT.** Es gab bisher keine
    Bauform dafür; diese hier ist gewählt und nicht vorgefunden — sie steht als eigener
    Absatz UNTER dem unveränderten Eintrag, mit Datum, Grund und der Messung.
17. **DIE GIT-WARNUNG WAR DER AUSLÖSER, NICHT DIE KONTROLLE.**
    **DER VORFALL (CC, 2026-08-29):** `src/app/projects/actions.ts` kippte während der
    Bau-Runde auf CRLF. **ALLE VIER GATES WAREN GRÜN**, und der Inhalts-Diff war sauber
    (34 Einfügungen, 0 Löschungen), weil git beim Stagen normalisiert. **Sichtbar wurde es
    allein an der Zeile "CRLF will be replaced by LF"** aus `git diff --numstat`.
    **DIE ZAHL IST AM 2026-08-31 ERSETZT WORDEN, NICHT GESTEMPELT.** Hier stand
    "**1504 CR-Bytes, HEAD 0**" und das Wort **VOLLSTÄNDIG**. Beides ruhte auf
    `grep -c $'\r'`, und diese Sonde zählt in dieser Umgebung ALLE Zeilen statt der
    CR-Zeilen (Herleitung mit Positiv- und Negativkontrolle: Vorrats-Eintrag 22). **Die
    Datei hat exakt 1504 Zeilen** — die Zahl war die Zeilenzahl, nicht der Umfang des
    Schadens. **ERSETZT statt gestempelt, weil dieser Eintrag ein MASSSTAB ist:** Wer die
    nächste CRLF-Frage an ihm misst, misst sonst an einer Zahl, die nichts gezählt hat.
    **DER BEFUND SELBST BLEIBT, UND ZWAR AUS EINEM GEMESSENEN GRUND:** "CR = Zeilenzahl"
    ist **auch das erwartete Bild einer echt gekippten Datei** — das Merkmal trennt die
    beiden Fälle nicht. **Was sie trennt, ist die Git-Warnung**, und die kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt; sie stammt nicht aus der
    Sonde. **Der Titel dieses Eintrags wird dadurch schärfer:** Die Warnung war nicht nur
    der Auslöser — sie war das einzige Instrument jener Runde, das nicht gelogen hat.
    **WELCHES WERKZEUG ES WAR, IST NICHT GEMESSEN.** Die Gegenprobe spricht gegen die
    naheliegende Antwort: Nach `git checkout` wurden DIESELBEN zwei Änderungen mit
    DEMSELBEN Editier-Werkzeug erneut eingetragen und nach jeder einzelnen nachgemessen —
    **CR = 0**. Die zwölf anderen Dateien derselben Runde, gleiches Werkzeug, blieben
    ebenfalls sauber.
    **DIE HYPOTHESE IST ALS HYPOTHESE ZU LESEN UND NICHT ALS BEFUND:** Was diese Datei von
    den anderen unterschied, war ein MUTATIONS-ZYKLUS (setzen, messen, zurücknehmen). Ob
    er die Ursache war, ist **nicht geprüft**.
    **DIE KONTROLLE WAR NICHT NACHLÄSSIG, und das gehört dazu, sonst liest sich der
    Eintrag als Vorwurf:** Sie folgte der Regel "EIN NACHWEIS AN EINER NEUEN DATEI IST
    BLIND" und traf damit genau die Dateien, bei denen das Problem NICHT lag — die neu
    geschriebenen. Die bearbeiteten Bestands-Dateien waren zu diesem Zeitpunkt nicht
    geprüft.
    **WAS OHNE DEN VERURSACHER HANDHABBAR FOLGT — zwei Dinge:** Die Byte-Kontrolle gehört
    nach **JEDEM** Mutations-Zyklus über die mutierte Datei, nicht nur ans Rundenende —
    **die RÜCKNAHME ist der Schreibvorgang**, der hier still etwas verändert hat. Und sie
    vergleicht **gegen HEAD**, nicht nur absolut: "CR = 0" allein sagt nichts, wenn die
    Datei schon vorher CR trug.
    **GEGENRICHTUNG ZUR BESTEHENDEN REGEL:** "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER
    UMGEBUNG STILL DAS CR" (docs/immer-beachten.md) beschreibt ein still GESTRIPPTES CR —
    hier ist eines still HINZUGEFÜGT worden. Dieselbe Achse, entgegengesetzte Richtung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde mit einem Mutations-Zyklus.
18. **`connectOutcome` HÄNGT AM ZWEIG "KEIN GEHEIMNIS-FELD", NICHT AM ZIEL.**
    Die Karte liest den Ergebniscode ausschliesslich im Verbinden-Zweig, und den gibt es
    nur, wo `secretLabel` fehlt. **HEUTE IST DAS DECKUNGSGLEICH**, weil
    `tracking/target-cards.test.ts` die Menge der Ziele ohne Geheimnis-Feld auf `{google}`
    festnagelt.
    **KOMMT EIN ZWEITES ZIEL OHNE GEHEIMNIS-FELD, WIRD JENER TEST ROT — UND DAS IST DER
    GANZE MECHANISMUS: DER TEST ERZWINGT EINEN BLICK, NICHT EINE LÖSUNG.** Wer ihn nur
    nachzieht, zeigt dem neuen Ziel Googles Ergebniscode.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG — weder eine Ziel-Bindung des
    Codes noch ein zweiter Zustand ist hier vorgeschlagen.
    TRIGGER: das zweite Ziel ohne Geheimnis-Feld.
19. **DER RESET LEERT DIE MELDUNG AUCH BEI EINEM ANDEREN ZIEL.**
    Ein Google-Fehlercode verschwindet, sobald der Betreiber sein Meta-Token speichert —
    die erste der drei Rücksetz-Stellen hängt an `handleCredentialsSaved`, also am
    VORGANG und nicht am ZIEL.
    **DAS IST DIE GEWOLLTE RICHTUNG, und sie gehört so begründet, sonst liest die nächste
    Runde es als Fehler:** Zu früh geleert kostet eine Information, die **ein Klick
    wiederherstellt** — der Betreiber versucht es erneut. Zu spät geleert erzeugt genau
    den Widerspruch in der Kachel, den der Fix `7771019` beseitigt hat. Von zwei
    Ungenauigkeiten ist die gewählt, deren Fehlgriff billiger ist.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Runde, die die Rücksetz-Bedingung ziel-genau machen will — dann ist
    dieser Absatz die Gegenrede, die sie zu widerlegen hat.
20. **DIE MUTATIONS-VORHERSAGE 1 WAR ZU ENG — DER SECHSTE PROTOKOLLIERTE FALL, DER FÜNFTE
    IN DERSELBEN RICHTUNG.**
    Vorhergesagt war: nur T-A2 fällt. **Gefallen sind DREI** — T-A2 (Oberfläche), der neue
    Daten-Lauf in `tracking/target-cards.test.ts` und der bestehende Lauf "JEDES Ziel:
    Daten-Seite und Oberfläche sagen dasselbe über die Auslieferung".
    **ALLE DREI MELDEN DIESELBE FEHLERKLASSE** ("die Google-Karte trägt ein öffentliches
    Feld"), zweimal als Daten-Aussage, einmal als DOM-Aussage — nach Lektion (g) also
    **Deckung, keine Kaskade**.
    **TROTZDEM IST ES EIN BEFUND UND KEIN TREFFER:** Die vorab benannte
    Überschuss-KLASSE lautete "Abfragen werden MEHRDEUTIG". Die zwei Zusatztreffer liegen
    **ausserhalb** dieser Klasse. Damit ist es der **sechste** protokollierte Fall der
    Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    (docs/immer-beachten.md) und der **fünfte in derselben Richtung: zu eng gezählt**.
    **DIE REGEL SAGT ES SELBST — die einseitige Streuung ist die eigentliche Aussage:**
    Zufall träfe mal nach oben, mal nach unten; eine systematische Ursache trifft immer
    dieselbe Seite.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie eine Vorhersage künftig
    breiter zu fassen wäre.
    TRIGGER: die nächste Hebung an docs/immer-beachten.md, die jene Regel ohnehin
    berührt — dort ist die Zahl der Fälle zu führen, nicht hier.
21. **VORRATS-EINTRAG 19 WIRD DURCH DIE FIX-SCHEIBE SCHÄRFER, NICHT GEGENSTANDSLOS.**
    **DER BEFUND (GEMESSEN am Code bzw. ABGELEITET daraus, CC, 2026-08-31):** Heute steht
    die Meldung des Autorisierungs-Flusses ohnehin am FALSCHEN Projekt — ihr Verlust durch
    ein fremdes Speichern fällt deshalb kaum auf. **Landet der Nutzer nach der Fix-Scheibe
    im richtigen Projekt, steht sie an der RICHTIGEN Karte** — und dann ist das Leeren
    durch ein Meta-Speichern ein **sichtbarer Verlust einer Information, die gerade jemand
    liest**.
    **DIE BEGRÜNDUNG IN EINTRAG 19 BLEIBT GÜLTIG** (zu früh geleert kostet eine
    Information, die ein Klick wiederherstellt; zu spät geleert erzeugt den Widerspruch in
    der Kachel) — **IHR PREIS STEIGT.** Der Text dort wird hier NICHT verdoppelt; wer
    entscheiden will, liest ihn und diesen Absatz zusammen.
    **WAS DAS NICHT HEISST:** Es ist keine Aufforderung, den Reset ziel-genau zu machen.
    Die Gegenrede dazu steht unverändert in Eintrag 19.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Live-Test der Fix-Scheibe — ab da ist der Fall beobachtbar, und erst
    dann ist er zu bewerten.
22. **KORREKTUR AN VORRATS-EINTRAG 17 — DIE ZAHL, NICHT DER BEFUND.**
    **DIE MESSUNG (CC, 2026-08-31):** `grep -c $'\r'` zählt in dieser Umgebung nicht
    CR-Zeilen, sondern **ALLE** Zeilen. Belegt mit Positiv- und Negativkontrolle in EINEM
    Lauf: eine reine LF-Datei mit drei Zeilen ergab `grep=3` und `tr=0`; eine echte
    CRLF-Datei mit zwei Zeilen ergab `grep=2` und `tr=2`.
    **DIE FOLGE FÜR EINTRAG 17:** Die dort protokollierte Zahl **"1504 CR-Bytes"** ist
    nicht mehr belegbar — `src/app/projects/actions.ts` hat **exakt 1504 Zeilen**.
    **ABER DER BEFUND STEHT, UND DAS IST DIE FASSUNG, DIE GILT:** "CR = Zeilenzahl" ist
    **AUCH das erwartete Bild einer echt auf CRLF gekippten Datei** — dort trägt jede
    Zeile ein CR. **DAS MERKMAL TRENNT DIE BEIDEN FÄLLE NICHT.**
    **WAS SIE TRENNT, IST DIE GIT-WARNUNG:** `"CRLF will be replaced by LF"` kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt. **Sie stammt nicht aus
    der Sonde und kann von ihr nicht erzeugt worden sein.**
    **DASS HEUTE NIRGENDS `i/crlf` STEHT, WIDERSPRICHT DEM NICHT** (GEMESSEN, CC,
    2026-08-31: `git ls-files --eol` über alle verfolgten Dateien — 227× `i/lf`, 5×
    `i/none`, 2× `i/-text`): Das ist die Normalisierung beim Commit; **der Index sollte
    den Zustand nie gesehen haben.**
    **DER TITEL VON EINTRAG 17 WIRD DADURCH SCHÄRFER, NICHT HINFÄLLIG:** Die Git-Warnung
    war nicht nur der Auslöser — **sie war in jener Runde das einzige Instrument, das
    nicht gelogen hat.**
    KORRIGIERT AM EINTRAG 17 SELBST (2026-08-31), nicht daneben: dort ist die Zahl
    ERSETZT. Dieser Eintrag trägt die Herleitung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: keiner — die Korrektur ist vollzogen; der Eintrag steht als Beleg.
25. **`loadProject` EBNET DREI FÄLLE AUF `null` EIN.**
    **GEMESSEN am Code (CC, 2026-08-31):** "nicht gefunden", "gehört einem anderen Nutzer"
    und "DB-Fehler" sind an der Rückgabe **nicht zu trennen** — alle drei liefern `null`.
    **FÜR DIE FIX-SCHEIBE IST DAS FOLGENLOS:** Alle drei bekommen dieselbe Behandlung
    (Rückfall auf "zuletzt bearbeitet", Meldung unterdrückt), und für zwei von ihnen ist
    genau das gewollt — ein eigener Text für "gehört dir nicht" verriete die Existenz
    einer fremden Kennung.
    **ABER: EIN DB-FEHLER FÜHRT DAMIT ZU RÜCKFALL UND UNTERDRÜCKTER MELDUNG — DER
    BETREIBER SÄHE NICHTS.** Er hat gerade einen Autorisierungs-Fluss durchlaufen, steht
    danach im falschen Projekt, und nichts sagt ihm, dass etwas schiefging.
    **EIN FIX LÄGE IN `loadProject` UND DAMIT AUSSERHALB JEDES BISHERIGEN SCOPES** — die
    Fix-Scheibe hat das Eigentums-Gate ausdrücklich nicht angefasst.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `loadProject` oder an der Fehlerbehandlung des
    Projekt-Ladepfads.
26. **EINE BESTANDS-LINT-WARNUNG IN `src/lib/tracking/consent.test.ts`.**
    **GEMESSEN (CC, 2026-08-31):** `consent.test.ts:33 — Unused eslint-disable directive
    (no problems were reported from 'no-new-func')`. `eslint` meldet 0 Fehler und genau
    diese eine Warnung.
    **SIE STAMMT NICHT AUS DIESER SCHEIBE:** Die Datei steht in keinem Diff der Runde
    (`git status` führt sie nicht), und die Lint-Konfiguration ist ebenfalls unberührt.
    **GEMELDET, NICHT BEHOBEN** — sie ausserhalb ihres Scopes anzufassen wäre ein
    Scope-Bruch, und eine unbenutzte Direktive ist kein Defekt, sondern eine Altlast.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `consent.test.ts` oder eine Aufräumrunde am Lint-Stand.
27. **DER BELEG AN `settingsEqual` TRÄGT NICHT MEHR — DIE REGEL BLEIBT WAHR.**
    **DER KOMMENTAR** über `settingsEqual` (src/lib/settings.ts) begründet die Schleife über
    alle Ziele so: "Der Nutzer ändert die Pixel-ID des zweiten Ziels, der Vergleich meldet
    'nicht dirty', **der Speichern-Knopf bleibt inaktiv** — und die Eingabe ist beim nächsten
    Projektwechsel weg."
    **GEMESSEN am Code (CC, 2026-08-31):** Der Knopf trägt
    `disabled={saveStatus === "saving" || code.trim() === ""}`. **`dirty` steht dort nicht.**
    Wer trotz fehlender Markierung auf Speichern drückt, rettet den Wert.
    **DIE REGEL BLEIBT WAHR, IHR BELEG IST ZU STARK:** Der Wert geht beim Projektwechsel
    still verloren — aber nicht, weil der Knopf gesperrt wäre, sondern weil **alle drei
    Warnungen ausbleiben**: der Text "Ungespeicherte Änderungen", der `beforeunload`-Wächter
    (er kehrt bei `!dirty` sofort zurück) und der `confirm`-Riegel in `handleSwitch`. Eine
    mildere Lesart von "inaktiv" — neutral gefärbt, ohne Punkt im Label — trüge ebenfalls;
    sie steht dort aber nicht.
    **WARUM NICHT JETZT KORRIGIERT:** Diese Runde ist eine Doku-Runde und fasst keine
    Produktivdatei an. Es ist der Fall der Regel "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR
    BELEG FALSCH WIRD" (docs/immer-beachten.md) — dort mit der Auflage, den Beleg zu
    RICHTIGSTELLEN und nicht zu stempeln, sobald jemand die Stelle ohnehin öffnet.
    TRIGGER: Scheibe 2 fasst `settingsEqual` ohnehin an — dort wird der Beleg im selben Zug
    korrigiert.
    **DIE GRENZE DIESES TRIGGERS, UND SIE GEHÖRT DAZU, SONST LIEGT DER EINTRAG STILL:**
    **Er ist nicht sicher.** Festlegung (1) des Zuschnitts der Scheibe 2 ist gerade so
    gewählt, dass `settingsEqual` **KEINE Änderung braucht** — beide Slots existieren und
    werden bereits verglichen. Ob der Bau-Plan die Datei dennoch öffnet (etwa für den
    Kommentar am Typ, der die zweite Kennungsform heute allein LinkedIn zuschreibt), ist am
    Zuschnitt **nicht entscheidbar**.
    **ZWEITER TRIGGER, damit der Eintrag nicht an einer unsicheren Bedingung hängt:** die
    nächste Runde, die `src/lib/settings.ts` oder den Dirty-Pfad ohnehin öffnet.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie der Beleg zu lauten hat.

    **NACHTRAG 2026-08-31 — DER ERSTE TRIGGER IST EINGETRETEN UND DER EINTRAG IST
    ERLEDIGT.** Scheibe 2 hat `src/lib/settings.ts` geöffnet, und der Beleg ist im selben
    Zug korrigiert worden: Der Kommentar über `settingsEqual` behauptete, der
    Speichern-Knopf bleibe inaktiv. **DIE FUNKTION SELBST IST NICHT ANGEFASST WORDEN** —
    Festlegung (1) ist gerade so gewählt, dass sie unverändert trägt.
    **DER EINTRAG BLEIBT STEHEN, WEIL ER DIE MESSUNG TRÄGT:** dass `dirty` nicht im
    `disabled` steht und der Verlust an den drei ausbleibenden Warnungen hängt. Die
    Unterscheidung stellt sich bei der nächsten Dirty-Frage wieder, und dann ist der
    Unterschied zwischen "gemessen" und "nie geprüft" die ganze Auskunft.
28. **DER SCHRÄGSTRICH FÄLLT NICHT — UND DAS IST KONFORM, KEIN DEFEKT.**
    **GEMESSEN LIVE (OWNER, 2026-08-31):** Ein `/` im Kundennummer-Feld bleibt stehen.
    Festlegung (6) sagt "Bindestriche und Leerraum, SONST NICHTS", und Festlegung (5)
    prüft keine Form — beides greift hier genau so, wie es dasteht.
    **DIE UNTERSCHEIDUNG, DIE DEN FILTER RECHTFERTIGT UND DEN SCHRÄGSTRICH AUSSCHLIESST:**
    Bindestriche fallen, **WEIL Google Ads Kundennummern MIT Bindestrichen ANZEIGT** — der
    Betreiber schreibt ab, was er sieht, und die Umformung heilt ein KOPIER-Artefakt. Für
    Schrägstriche gibt es keine solche Grundlage; sie wären ein TIPPFEHLER.
    **DEN FILTER "ZU VERVOLLSTÄNDIGEN" HIESSE, AUF EINER UNGEMESSENEN ACHSE ZU RATEN** —
    genau das, wogegen Festlegung (5) argumentiert. **Der Eintrag steht hier, damit die
    nächste Runde ihn nicht als Lücke aufräumt.**
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine gemessene Anzeigekonvention des Anbieters, die ein ANDERES Trennzeichen
    führt.
29. **EINE GRENZE AM ZEICHENVORRAT DER NORMALISIERUNG.**
    `[-\s]` trifft den **ASCII-Bindestrich**; `\s` deckt auch das **geschützte
    Leerzeichen** ab. **EIN GEDANKENSTRICH AUS EINER FREMDEN QUELLE FÄLLT NICHT** — weder
    Halbgeviert- noch Geviertstrich sind ASCII-Bindestriche.
    **OB DAS JE VORKOMMT, IST UNGEMESSEN.** Als GRENZE notiert und nicht gebaut: Ein
    breiterer Zeichenvorrat wäre dieselbe Ratearbeit wie beim Schrägstrich oben.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: ein beobachteter Fall — ein Betreiber, dessen Kundennummer nach dem Eintragen
    einen Strich behält.
30. **DER `never`-KOMMENTAR IN `TargetCard.test.tsx` IST ÜBERHOLT — UND WAR ES SCHON VOR
    DIESER RUNDE.**
    Er sagt, im `else`-Zweig von "JEDES Ziel" verenge TypeScript `target` auf `never`,
    "seit 11.1f deckt sich diese Union mit `TrackingTarget`".
    **GEMESSEN am Repo (CC, 2026-08-31):** Seit Scheibe 3 hat `TARGETS_WITH_ADAPTER` VIER
    Mitglieder und `TRACKING_TARGETS` FÜNF; der Zweig verengt auf `'google'`, nicht auf
    `never`. **Der Satz war also schon vor Scheibe 2 falsch** — diese Runde hat ihn nur
    sichtbar gemacht, weil sie den Nachbarzweig umgeschrieben hat.
    **ES IST EINE TATSACHENBEHAUPTUNG ÜBER DEN COMPILER, KEINE ZUSAGE DES TESTS** — der
    Lauf misst unverändert das Richtige. Deshalb nicht in derselben Runde korrigiert: Eine
    Kommentar-Sachkorrektur gehört nicht in den Diff eines Baus.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet.
31. **DAS `aria-label`-MUSTER AN DER EREIGNIS-ACHSE IST DATEN, KEIN MECHANISMUS.**
    **DER BEFUND:** Mit zwei Zielen auf derselben Ereignisliste tragen zwei Eingabefelder
    denselben zugänglichen Namen ("Lead") und schreiben in VERSCHIEDENE Ziel-Slots — die
    Lage aus "ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
    OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM" (docs/immer-beachten.md). Aufgelöst ist sie
    durch ein ziel-präfixiertes `aria-label`, nach der Hausform der Karten.
    **EIN DRITTES ZIEL AUF DIESER ACHSE ERBT DAS MUSTER NICHT VON SELBST.** Der Ausdruck
    baut den Namen aus `TARGET_CARDS[…].name` und wächst damit mit — **aber nur, solange
    die Namen unterscheidbar bleiben.** Zwei Ziele mit gleichem Kartennamen erzeugten
    dieselbe Mehrdeutigkeit erneut, und **kein Test hielte das** (der bestehende prüft
    genau zwei benannte Felder).
    **GEMELDET, DAMIT ES NICHT ALS GELÖST GILT.** Nicht gebaut, keine Empfehlung.
    TRIGGER: ein drittes Ziel mit Ereignis-Achse, ODER zwei Ziele mit gleichlautendem
    Kartennamen.
32. **VERMERK AN VORRATS-EINTRAG 20 — DIE URSACHE, NICHT DIE ZAHL.**
    Jener Eintrag hält fest, dass eine Mutations-Vorhersage zu eng war, und ordnet den Fall
    in die Reihe der Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    ein. **MIT SCHEIBE 2 SIND ZWEI WEITERE FÄLLE AUFGETRETEN, BEIDE IN DERSELBEN RICHTUNG**
    (zu eng), beide als DECKUNG und nicht als Kaskade geprüft — die Einzelheiten stehen in
    VERMERK 9 und werden hier nicht verdoppelt.
    **HIER STEHT KEINE FALLZAHL, UND DAS IST ABSICHT:** Eintrag 20 führt bewusst keine, die
    Regel selbst führt eine datierte, und eine dritte Zahl daneben würde bei jedem Zuwachs
    neu falsch — dieselbe Bauform, die in dieser Datei mehrfach protokolliert
    kaputtgegangen ist.
    **WAS NEU IST UND DEN VERMERK RECHTFERTIGT: DIE URSACHE IST ERSTMALS BENENNBAR.** Sie
    ist nicht Unachtsamkeit, sondern eine übernommene Vorhersage über einen INZWISCHEN
    GEWACHSENEN Testbestand. Der Hebungs-Kandidat dazu steht unten.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: derselbe wie bei Eintrag 20 — die nächste Hebung an docs/immer-beachten.md,
    die jene Regel ohnehin berührt.
33. **DAS INSTRUMENT ZUM AUFFINDEN EINES NUL-BYTES IST EIN ANDERES ALS DAS ZUM SUCHEN
    DARIN — UND DIE EINE HÄLFTE DIESES EINTRAGS STEHT SCHON IN docs/immer-beachten.md.**
    **DIE ERSTE HÄLFTE IST BESTÄTIGUNG, NICHT BEFUND, UND DAS STEHT ZUERST:** Dass `grep`
    OHNE `-a` bei einer Datei mit NUL-Byte "Binary file … matches" meldet **STATT** der
    Trefferzeilen — und die Datei damit still aus jeder Achse fällt —, steht bereits in
    docs/immer-beachten.md, in der Regel "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG
    STILL DAS CR", Absatz "DIE GEGENRICHTUNG GEHÖRT DAZU", dort mit derselben Fundstelle
    (`src/lib/mappings.ts`) und GEMESSEN am 2026-08-13. **ERNEUT GEMESSEN (CC, 2026-09-01):**
    Die Datei trägt **genau ein** NUL-Byte (`tr -dc '\000' < … | wc -c` → 1); `grep -na` findet
    darin `isValidRedirectUrl` in Zeile 44, `grep -n` meldet stattdessen die Binärzeile.
    **DIE ZWEITE HÄLFTE IST NEU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: DAS
    NAHELIEGENDE SUCHINSTRUMENT FINDET DIE DATEI GAR NICHT.** Ein Lauf über `src/` mit
    `grep -qP '\x00'` je Datei lieferte **NULL** Treffer; derselbe Lauf mit
    `tr -dc '\000' | wc -c` fand `src/lib/mappings.ts`. GEMESSEN (CC, 2026-09-01), beide
    Läufe im selben Durchgang, derselbe Suchraum.
    **WARUM DAS TEUER IST:** Die Abwesenheit war vom WERKZEUG erzeugt, nicht vom Gegenstand —
    genau die Klasse, die docs/immer-beachten.md als "EINE ABWESENHEIT KANN VOM WERKZEUG
    ERZEUGT SEIN, NICHT VOM GEGENSTAND" führt. Ohne den zweiten Griff wäre "im Repo liegt kein
    NUL-Byte" als Befund protokolliert worden, **mit benannter Reichweite, sauber ausgewiesen
    und trotzdem falsch**.
    **DER VORSCHLAG — UND ER IST EIN VORSCHLAG, KEINE ENTSCHEIDUNG:** Ein **ABSATZ** an der
    bestehenden Werkzeug-Regel, nicht ein eigener. Zwei Gründe: Die erste Hälfte steht dort
    schon und würde als eigener Eintrag ein zweites Mal behauptet; und der neue Teil ist die
    **Vervollständigung** desselben Befundes — er sagt, WOMIT man die Datei findet, die jener
    Absatz beschreibt.
    **DIE GEGENREDE GEHÖRT DAZU:** Die 11.8er-Regel oben ist die sachlich nähere (sie handelt
    von der werkzeug-erzeugten ABWESENHEIT), und ein Absatz an der sed-Regel legte den Befund
    an die entferntere. **NICHT ENTSCHIEDEN**, an welcher der beiden er landet.
    **DER BEZUG ZU HEBUNGS-KANDIDAT 6 GEHÖRT MIT:** Jener stellt dieselbe Ablage-Frage für die
    Byte-Kontrolle (`tr` gegen `grep -c $'\r'`) und lässt sie ebenfalls offen. **Wer einen von
    beiden hebt, liest den anderen mit** — es ist dieselbe Werkzeug-Achse, und zwei getrennt
    getroffene Entscheidungen darüber liefen auseinander.
    GEMELDET 2026-09-01, NICHT GEBAUT.
34. **EIN ZEILENWEISER KOMMENTAR-FILTER IST BEI MEHRZEILIGEN BLÖCKEN UNTAUGLICH.**
    Er erkennt einen Kommentar an seinem **ZEILENANFANG**. Die Fortsetzungszeilen eines
    `{/* … */}`-Blocks beginnen mit **Fliesstext** und zählen deshalb als Code — ein Vergleich
    zweier Fassungen "ohne Kommentare" meldet dann eine Code-Änderung, die es nicht gibt, oder
    verdeckt eine, die es gibt.
    **DER ERSATZ:** beide Fassungen **OHNE Kommentare** vergleichen — also den Kommentar
    entfernen statt die Zeile zu übergehen —, **mit einer künstlichen Code-Änderung als
    POSITIVKONTROLLE**. Ohne die Positivkontrolle ist ein leerer Vergleich nicht von einem
    kaputten Vergleich zu unterscheiden; es ist der Fall der Lektion (d) an "MUTATIONSPROBEN
    UND LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md), nur am Diff statt am Test.
    **WARUM DER EINTRAG ÜBERHAUPT NÖTIG IST — DAS IST SEIN GANZER ZWECK:** Der Befund ist
    bisher **NUR in der Commit-Botschaft von `3efa01b` verwahrt**. Eine Commit-Botschaft wird
    nicht gelesen, wenn jemand das nächste Mal zwei Fassungen vergleicht; sie ist ein
    Zeitdokument und kein Nachschlagewerk. **Ohne diesen Eintrag wird dasselbe Instrument
    wieder gebaut und liefert wieder eine falsche Auskunft.**
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG, ob daraus eine Regel wird.
35. **DER KOMMENTARKOPF VON `schedulePersist` DECKT DEN CODE NICHT.**
    **GEMESSEN am Code (CC, 2026-09-01):** Der Kopf von `schedulePersist`
    (src/lib/capi/ingest.ts) sagt, sein `try/catch` sei "die zweite Schicht, falls die
    Registrierung/der Aufruf selbst wirft". **Am Code liegt das `try` INNERHALB des an
    `after()` übergebenen Callbacks**; der Aufruf `after(...)` selbst steht **ungeschützt**, und
    `handleIngest` trägt an dieser Stelle kein umschliessendes `try`. Wirft die Registrierung,
    verlässt der Wurf die Funktion.
    **KEIN TEST DECKT DAS:** Alle sechs `ingest.*.test.ts` mocken `next/server` mit einem
    `after`, das die Callbacks nur einsammelt — **die Registrierung kann dort gar nicht
    werfen.** GEMESSEN am Repo (CC, 2026-09-01).
    **DIES IST EINE AUSSAGE ÜBER DEN KOMMENTAR, NICHT ÜBER DIE EINTRITTSWAHRSCHEINLICHKEIT.**
    Ob der Fall je eintritt, ist nicht erhoben und wird hier nicht behauptet. Es ist der Fall
    der Regel "EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT" (docs/immer-beachten.md):
    Die Selbstbeschreibung ist zu weit, und sie lädt dazu ein, eine Achse für gedeckt zu halten
    und keinen Test dafür zu schreiben.
    **KEIN VORSCHLAG** — weder eine Umschliessung noch eine Kommentar-Korrektur ist hier
    vorgeschlagen.
    GEMELDET 2026-09-01, NICHT GEBAUT.

    **VERMERK 2026-09-03 — DIESER EINTRAG WIRD IN SCHEIBE 1b-2a AUFGENOMMEN. DER TEXT
    DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    Der Zuschnitt steht (s. den Abschnitt "Die Rettung am Beacon — Scheibe 1b-2a des
    Schritts 1b-2 der Scheibe 1b") und führt ihn dort als **DRITTES STÜCK** — sowohl der
    Schutz der Registrierung als auch die Richtigstellung des Kommentarkopfes.
    **DER GRUND FÜR DIE AUFNAHME IST NICHT, DASS DER POSTEN REIF WÄRE, SONDERN WO ER
    LIEGT:** 1b-2a hängt eine **ZWEITE** `after()`-Registrierung an dieselbe Stelle. **Eine
    Scheibe, die eine bekannte Lücke in genau dem Mechanismus stehen lässt, den sie gerade
    benutzt, hat den Scope-Schutz gegen die Sache gewendet, die er schützen soll.**
    **WAS DAMIT ZUR AUFLAGE WIRD:** Der Schutz gilt der NEUEN Registrierung **UND** der
    bestehenden in `schedulePersist` — eine Scheibe, die nur ihre eigene absichert, liesse
    die ältere Lücke als die unauffälligere zurück.
    **DER EINTRAG WIRD NICHT ABGEHAKT.** Er ist gemeldet und aufgenommen, nicht gebaut; sein
    Satz "KEIN VORSCHLAG" bleibt für den Zeitraum bis zum Bau richtig.
    **WAS SEIN "Ob der Fall je eintritt, ist nicht erhoben" ANGEHT:** Es bleibt unerhoben,
    und die Aufnahme ändert daran nichts. Gebaut wird gegen die **fehlende Deckung**, nicht
    gegen eine beobachtete Häufigkeit.
    PROVENIENZ: ARCHITEKTEN-ZUSCHNITT 2026-09-03, auf Owner-GO. Der Code-Befund ist der
    unveränderte aus dem Eintrag oben, am 2026-09-03 erneut am Code bestätigt (CC).

    **ZWEITER VERMERK 2026-09-03 — VOLLZOGEN MIT SCHEIBE 1b-2a. DER TEXT DARÜBER BLEIBT
    ZEICHEN FÜR ZEICHEN STEHEN; DIESER VERMERK TRITT DANEBEN.**
    **WAS GEBAUT IST:** `scheduleAfter` (src/lib/capi/ingest.ts) umschliesst den
    `after()`-Aufruf und fängt den Wurf bei der **REGISTRIERUNG** — für die NEUE
    Registrierung der Scheibe **UND** für die bestehende in `schedulePersist`. Der `catch`
    **loggt** über `errorName`; ein Wurf verschwindet nicht. **DER KOMMENTARKOPF VON
    `schedulePersist` IST IM SELBEN ZUG RICHTIGGESTELLT** und trägt den Satz, dass er
    diese Deckung behauptet hat, ohne sie zu haben. Bau-Commit `d57d50c`, s. VERMERK 12,
    Abschnitt (a).
    **DER BEFUND DIESES EINTRAGS IST DAMIT NICHT NUR BEHOBEN, SONDERN GEMESSEN:** Die
    Pflicht-Mutation "Schutz der Registrierung ausbauen" hat **genau EINEN** Lauf fallen
    lassen — **H9** in `ingest.refresh.test.ts`, 1 von 1487 — und **alle sechs bestehenden
    `ingest.*.test.ts` blieben grün.** Das ist die Aussage dieses Eintrags ("KEIN TEST
    DECKT DAS", weil die sammelnde `after`-Attrappe nicht werfen kann) **gemessen statt
    hergeleitet**; H9 trägt dafür eine eigene, umschaltbare Attrappe, die wirft.
    **DER EINTRAG WIRD NICHT ABGEHAKT, UND DAS IST DIE BAUFORM DIESER DATEI, KEINE
    UNENTSCHLOSSENHEIT:** Der Vorrat kennt kein Abhaken. Er kennt einen **eigenen
    datierten Absatz UNTER dem unveränderten Eintrag** — so bei Eintrag 15 ("ERLEDIGT AM
    2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG") und bei
    Eintrag 7 ("ERLEDIGT AM 2026-08-31"). **Diese Runde folgt ihr.**
    **WARUM DER EINTRAG STEHEN BLEIBT — ZWEI GRÜNDE, und der zweite wiegt schwerer:**
    (1) Seine **MESSUNG** — dass das `try` IM Callback liegt und alle sechs Attrappen die
    Registrierung gar nicht werfen lassen können — ist der Beleg, auf dem der Schutz
    überhaupt ruht. (2) Seine **BLINDHEITS-AUSSAGE über die Attrappen** ist der MASSSTAB
    für jede künftige Frage an dieser Achse: Ein Mechanismus, den alle Tests durch eine
    sammelnde Attrappe ersetzen, ist an ihnen nicht messbar. **Ein gelöschter Eintrag
    nähme beide mit.**
    **WAS SEIN SATZ "KEIN VORSCHLAG" ANGEHT:** Er war für den Zeitraum bis zum Bau
    richtig und ist mit dem Bau abgelaufen — **nicht falsch geworden, sondern
    gegenstandslos.** Und sein "Ob der Fall je eintritt, ist nicht erhoben" gilt
    **unverändert**: Gebaut ist gegen die fehlende Deckung, nicht gegen eine beobachtete
    Häufigkeit; der Live-Test hat **keinen** Registrierungs-Wurf erzeugt.
    PROVENIENZ: der Bau GEMESSEN am Repo (CC, 2026-09-03), die Mutationsprobe am Lauf
    desselben Tages. Dass die Bauform dieser Datei kein Abhaken vorsieht, ist GEMESSEN am
    Dateitext (CC, 2026-09-03; Einträge 7 und 15).
36. **DIE ADAPTER REICHEN EINE KLICK-KENNUNG HEUTE SCHON DURCH — AUF EINER ANDEREN ACHSE ALS
    DER GEMESSENEN.**
    **GEMESSEN am Code (CC, 2026-09-01):** `eventSourceUrl` wird im Beacon-Bau
    (`buildCapiBeaconStatement`, src/lib/tracking/meta.ts) als **`location.href`** gesetzt —
    also die vollständige Adresse **einschliesslich Query-String**. `handleIngest` reicht den
    Rumpf unverändert an `dispatchForward` weiter, und **drei der vier Adapter lesen das Feld**:
    `forwardToMeta` als `event_source_url`, `forwardToPinterest` ebenso,
    `forwardToTiktok` als `page.url`. `forwardToLinkedin` liest es nicht.
    **FOLGE:** Ein `gclid` im Query-String einer gehosteten Kundenseite **reist heute schon
    mit** — an meta, pinterest und tiktok —, **UNBENANNT**, als Bestandteil einer Zeichenkette.
    Das gilt für **jeden** Klick-Parameter eines Werbenetzwerks, nicht nur für Googles.
    **DIE ABGRENZUNG GEHÖRT DAZU UND IST KEIN EINWAND GEGEN DEN BESTEHENDEN BEFUND:** Der
    offene Punkt "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (docs/offene-punkte.md,
    Block vom 2026-08-28, Punkt (a)) sagt "KEIN ADAPTER NIMMT HEUTE EINE KLICK-KENNUNG
    ENTGEGEN ODER REICHT EINE DURCH". **Das ist auf der Achse BENANNTER Kennungsfelder
    gemessen** — die dortige Achse nennt `gclid · gbraid · wbraid · fbclid · _fbc · ttclid ·
    li_fat_id — **und dort ist es richtig**: null Treffer in allen vier Adaptern, heute erneut
    bestätigt. **DIESER EINTRAG NENNT EINE ZWEITE ACHSE, KEINE KORREKTUR DER ERSTEN.**
    **OB DIE UNBENANNTE DURCHLEITUNG UNTER DIE DRITTE DATENKLASSE FÄLLT, IST HIER NICHT
    ENTSCHIEDEN.** Es ist eine **OWNER-Frage**, und sie wird in diesem Eintrag ausdrücklich
    nicht beantwortet und nicht vorbereitet.
    **WAS HEUTE GILT UND GEPRÜFT IST — und es ist der Teil, der die Auflage TRANSIT-ONLY auf
    ihren beiden anderen Hälften einlöst:** `persistEvent` (src/lib/analytics/persist.ts)
    schreibt die Kennung **nicht** — es schreibt genau fünf Werte, und keiner trägt sie. Und
    **keiner der 48 console-Aufrufe** im Produktivcode führt sie (GEMESSEN, CC, 2026-08-28,
    im offenen Punkt mit Achse und Positivkontrolle protokolliert; in dieser Runde **nicht**
    neu gezählt).
    GEMELDET 2026-09-01, NICHT GEBAUT. KEINE EMPFEHLUNG.
37. **DER `else`-ZWEIG IN `TargetCard.test.tsx` HAT SEIT SCHEIBE 4 KEINEN FALL MEHR — UND
    DERSELBE GRÜNE LAUF IST DURCH EINEN ANDEREN ZWEIG GRÜN.**
    **GEMESSEN am Repo (CC, 2026-09-01):** Der Lauf "JEDES Ziel: Daten-Seite und Oberflaeche
    sagen dasselbe ueber die Auslieferung" (`src/components/TargetCard.test.tsx`) verzweigt
    dreifach über `hasAdapter(target)` und `card.publicLabel !== undefined`. Seit Scheibe 4
    hat `TARGETS_WITH_ADAPTER` **FÜNF** Mitglieder und `TRACKING_TARGETS` ebenfalls fünf —
    **kein bekanntes Ziel ist mehr ohne Adapter.** Die Zuordnung heute: meta, pinterest,
    tiktok und **google** laufen in den ERSTEN Zweig (Adapter UND öffentliches Feld),
    linkedin in den ZWEITEN (Adapter, kein Feld), **in den `else`-Zweig KEINES.**
    **WAS DAMIT STILL AUFGEHÖRT HAT ZU MESSEN:** Jener Zweig trägt die Zusicherung aus der
    Auflage der Scheibe 11.1a — neben dem Folgenlosigkeits-Hinweis darf keine zweite Meldung
    stehen, die als Grund eine fehlende Kennung nennt — und benennt seine eigene
    Rot-Bedingung: "WIRD ROT, WENN: jemand den hasAdapter-Term in TargetCard entfernt."
    **DIESE BEDINGUNG IST HEUTE UNERFÜLLBAR.** Der Zweig läuft nie, also wird er nie rot.
    **ES IST DIE FEHLERKLASSE "EIN WÄCHTER OHNE GEGENSTAND GEHT AB DA IMMER AUF"**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL",
    Weise (1)) — **und sie ist hier STILL:** Anders als bei einer Schleife, die kein `it()`
    erzeugt, läuft der Test weiter und bleibt grün; nichts zeigt an, dass eine Zusicherung
    aufgehört hat zu greifen.
    **WARUM ES NIEMANDEM AUFGEFALLEN IST — GEMESSEN am Commit:** Der Transport-Commit
    `26caa38` hat `src/components/TargetCard.test.tsx` **nicht angefasst** (neun Dateien, die
    Datei ist nicht darunter). **DIE GLEICHARTIGE STELLE IN `fan-out.test.ts` IST BEHANDELT
    WORDEN** — dort steht der Befund ausgeschrieben im Kommentar, und `W-REST` tritt an die
    Stelle des toten Zweigs. **Der Unterschied zwischen den beiden Stellen ist allein, dass
    die eine im Diff lag und die andere nicht.**
    **DAZU, UND ES IST EINE SELBSTHEILUNG:** **Vorrats-Eintrag 30** hält fest, der
    `never`-Kommentar in derselben Datei sei überholt — er behauptet, TypeScript verenge
    `target` im `else`-Zweig auf `never`, was seit Scheibe 3 (vier gegen fünf Mitglieder)
    falsch war. **MIT SCHEIBE 4 IST DIE AUSSAGE WIEDER WAHR:** `hasAdapter` ist ein
    Typprädikat (`target is TargetWithAdapter`), und die beiden Unionen decken sich wieder.
    **SEINE DATIERUNG HEILT SICH NICHT MIT:** Der Kommentar sagt "seit 11.1f", und das war
    zwischen Scheibe 3 und Scheibe 4 nicht durchgehend wahr. **Die Aussage stimmt, ihre
    Herkunftsangabe nicht.**
    **KEINE EMPFEHLUNG**, weder den Zweig zu entfernen noch ihn durch einen erfundenen
    Zielwert erreichbar zu machen. **Der Zweig ist die Zusicherung für das nächste Ziel ohne
    Empfänger** — dieselbe Erwägung, aus der er in `fan-out.test.ts` stehen geblieben ist.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die `src/components/TargetCard.test.tsx` ohnehin öffnet —
    dieselbe wie bei Eintrag 30, und beides gehört zusammen erledigt.
38. **DER KOPF DES GOOGLE-ABSCHNITTS IN docs/ziel-befunde.md SAGT "NICHTS IST GEMESSEN" — DAS
    IST SEIT MESSUNG A ÜBERHOLT UND WAR ES SCHON VOR DIESER SCHEIBE.**
    **DER WORTLAUT, GEMESSEN am Dateitext (CC, 2026-09-01):** "**HERKUNFT — ALLES IN DIESEM
    ABSCHNITT IST GELESEN, NICHTS IST GEMESSEN (2026-08-20):** Es ist KEIN Aufruf gegen eine
    Google-Schnittstelle gefahren worden — kein Token beschafft, kein Endpunkt angesprochen,
    keine Fehlerform erhoben."
    **WAS DAGEGEN STEHT:** Vier Messreihen gegen zwei Google-Endpunkte liegen inzwischen IM
    SELBEN ABSCHNITT — Messung A (Teile (bj) bis (bm)), Messung B1 ((bn) bis (bu)), Messung C
    ((bv) bis (bz)) und Messung D ((ca)). Jede von ihnen hat ein Token beschafft, einen
    Endpunkt angesprochen und Fehlerformen erhoben.
    **DIE AUSSAGE IST DATIERT UND DAMIT ALT, NICHT FALSCH** — sie trägt "(2026-08-20)" in
    ihrem eigenen Text und beschreibt den Stand jenes Tages zutreffend. Es ist dieselbe
    Bauform wie bei den Stückzahlen dieser Datei: **wer sie ohne ihr Datum liest, liest sie
    falsch; wer sie überschreibt, nimmt eine Messung mit.**
    **WAS SIE TROTZDEM GEFÄHRLICH MACHT:** Sie steht im **KOPF** des Abschnitts, also an der
    Stelle, die jeder zuerst liest, und sie ist als **HERKUNFT** ausgezeichnet — also als
    Aussage über den ganzen Abschnitt. Ein Leser, der den Pflicht-Stopp befolgt und die Datei
    vor einem Zuschnitt öffnet, nimmt aus dem ersten Absatz mit, dass hier nichts gemessen
    sei, und behandelt (ca) als Doku-Lesung.
    **NICHT GEÄNDERT, UND DAS IST SCOPE UND KEIN URTEIL:** docs/ziel-befunde.md liegt
    ausserhalb des Scopes dieser Runde. **KEINE EMPFEHLUNG**, ob der Kopf einen Vorbehalt
    daneben bekommt, ob er ersetzt wird oder ob es bei der Datierung bleibt.
    GEMELDET 2026-09-01, NICHT GEBAUT.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dieselbe wie bei
    Vorrats-Eintrag 12 und Hebungs-Kandidat 4, und alle drei gehören zusammen erledigt.
40. **EINE MESSUNG WURDE MIT AUSGELASSENEM SCHLÜSSELWERT ABGELEGT — UND DER AUSGELASSENE WERT
    WAR DIE EINZIGE EINGABE DES DIAGNOSE-INSTRUMENTS.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-02), zwei unabhängige Suchläufe:** Der
    Erfolgsrumpf des 200er-Aufrufs der Messung D steht in docs/ziel-befunde.md, Teil (ca)/(a),
    als `{ "requestId": "…" }` — **mit drei Punkten an der Stelle des Wertes.** Eine Suche über
    den gesamten Google-Abschnitt nach UUID-artigen Zeichenfolgen findet dort **genau zwei**,
    und **beide sind Beispiele aus der Anbieter-Doku** ((o)/G5), keine eigenen Messwerte. Eine
    zweite, repo-weite Suche über das **gesamte Arbeitsverzeichnis rekursiv, ohne
    Dateityp-Filter**, nach der tatsächlichen Kennung liefert **null Treffer**.
    **Positivkontrolle:** Dieselbe UUID-Achse hat die zwei Doku-Beispiele erreicht, ist also
    nicht leer gelaufen.
    **WARUM DAS ZÄHLT, UND ES IST NICHT DIE ÜBLICHE GEHEIMNIS-FRAGE:** Der Statusabruf über
    `requestStatus:retrieve` nimmt **GENAU EINE** Eingabe — die `requestId` ((x)/G5). **Ohne
    sie ist der einzige Diagnostik-Kanal des Anbieters nicht adressierbar.** Die Doku macht
    daraus selbst eine Auflage: "Record the requestId returned" und "Capture and collect the
    request_id from each … response" ((o)/G5, GELESEN 2026-08-24). Der Wert war am 2026-09-02
    nur noch da, weil der Owner ihn in seinem eigenen Verlauf hatte; **aus dem Repo wäre er
    nicht mehr zu beschaffen gewesen.**
    **EINE `requestId` IST KEIN GEHEIMNIS.** Sie ist ein Vorgangs-Bezeichner ohne
    Zugriffswirkung; die Auslassung war keine Schwärzung, sondern eine Kürzung.
    **DER BEFUND GILT DEM ABLAGE-VERFAHREN, NICHT DIESER EINEN STELLE — und das ist der ganze
    Grund für den Eintrag:** Eine Kürzung mit "…" sieht in einem Protokoll wie Sorgfalt aus.
    Sie ist es dort, wo der Wert ein Geheimnis ist, und sie ist das Gegenteil davon, wo der
    Wert der **einzige Schlüssel zu einer späteren Nachfrage** ist. **Was die beiden Fälle
    trennt, steht heute nirgends.**
    **DIE ABGRENZUNG GEHÖRT ZWINGEND DAZU, SONST WIDERSPRICHT DIESER EINTRAG EINER
    ENTSCHEIDUNG DESSELBEN TAGES.** Am 2026-09-02 sind in docs/ziel-befunde.md, Teil (cb),
    **ZWEI Werte ABSICHTLICH nicht im Klartext abgelegt** worden — die Google-Ads-Kundennummer
    und die Conversion-Type-ID, beide maskiert (ARCHITEKTEN-ENTSCHEIDUNG 2026-09-02). Wer
    diesen Eintrag ohne die Abgrenzung liest, hält das für denselben Fehler.
    **DIE TRENNLINIE IST DIE BESCHAFFBARKEIT, NICHT DIE VERTRAULICHKEIT:**
    · **Eine `requestId` existiert EINMAL UND FLÜCHTIG.** Sie entsteht in einer Antwort, sie
      steht in keiner Oberfläche, und **ist sie einmal nicht aufgeschrieben, ist sie aus KEINER
      Quelle wiederzubeschaffen.** Ihr Verlust kostet das Instrument der nächsten Runde.
    · **Eine Kundennummer steht JEDERZEIT in der Oberfläche des Kontos**, ebenso die
      Conversion-Type-ID. Ihr Fehlen im Repo kostet einen Blick, nicht eine Messung.
    **IN EINEM SATZ: NICHT ABGELEGT WIRD, WAS JEDERZEIT ABLESBAR IST; ABGELEGT WIRD, WAS SONST
    VERSCHWINDET.** Das ist die Regel, die beide Fälle zugleich erklärt — und sie ist etwas
    anderes als "Geheimnisse werden geschwärzt", weil **keiner der drei Werte ein Geheimnis
    ist**.
    **KEINE EMPFEHLUNG** — weder eine Regel noch eine Auflage an künftige Messprotokolle ist
    hier vorgeschlagen, und (ca) ist **nicht** nachträglich befüllt worden.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: die zwei Suchläufe GEMESSEN am Repo (CC, 2026-09-02). Dass der Wert aus dem
    Verlauf des Owners stammt, ist eine **OWNER-ANGABE 2026-09-02**. Die Doku-Auflage ist
    GELESEN (s. (o)/G5).
    TRIGGER: die nächste Messung, deren Antwort einen Bezeichner für eine **spätere** Nachfrage
    trägt.
41. **`INVALID_GCLID` VERDECKT DIE TAG-HYPOTHESE — SIE IST WEDER BESTÄTIGT NOCH WIDERLEGT.**
    **DER VERDACHT VOM 2026-09-01 (OWNER):** Die im Google-Ads-Konto hinterlegte
    Conversion-Aktion könnte **tag-basiert** sein, während Pagesmith **kein Google-Tag
    ausliefert** — die Gestalt-Entscheidung schliesst eines ausdrücklich aus (s. "### (3) Der
    Vorbehalt der Owner-Entscheidung zur Gestalt").
    **WAS MESSUNG E DAZU SAGT — GEMESSEN 2026-09-02 (OWNER), docs/ziel-befunde.md,
    Teil (cb):** **NICHTS.** Die Anfrage vom 2026-09-01 ist mit
    `PROCESSING_ERROR_REASON_INVALID_GCLID` verworfen worden, `errorCounts` trägt **genau
    einen** Eintrag bei **einem** gesendeten Datensatz.
    **DER MECHANISMUS, DER DEN VERDACHT VERDECKT:** Ein Datensatz, dessen Klick-Kennung schon
    verworfen wird, **kommt an einer etwaigen zweiten Prüfung gar nicht erst an**. Ob nach
    einer gültigen Kennung ein ZWEITER Grund käme, ist an dieser Antwort **nicht zu sehen** —
    sie konnte nur einen Grund haben.
    **WER AUS DEM EINEN ZURÜCKGEGEBENEN GRUND SCHLIESST, ES GEBE NUR DIESEN, SCHLIESST AUS
    EINER ANTWORT, DIE NUR EINEN GRUND HABEN KONNTE.** Das ist der Satz, der diesen Eintrag
    trägt, und er ist der Grund, warum er neben Messung E steht statt in ihr aufzugehen: Ein
    erledigt aussehender Verdacht wird nicht wieder aufgenommen.
    **DIE VERBINDUNG ZUR SPERRE, und sie macht den Eintrag unauflösbar-bis-auf-weiteres:**
    Solange auf dem Konto kein echter Anzeigenklick existiert (s. die zweite Sperre in
    "### (1) Der Gegenstand"), **gibt es keine gültige Klick-Kennung**, mit der man die zweite
    Prüfung überhaupt erreichen könnte. **Der Verdacht hängt an derselben Sperre wie der
    Nachweis.**
    **KEINE EMPFEHLUNG**, und ausdrücklich keine Aussage darüber, ob die Conversion-Aktion
    tag-basiert IST — der Zuschnitt der Aktion im Kundenkonto ist **nicht erhoben**.
    GEMELDET 2026-09-02, NICHT GEBAUT.
    PROVENIENZ: Der Fehlergrund GEMESSEN 2026-09-02 (OWNER). Der Verdacht ist eine
    **OWNER-ANGABE 2026-09-01**. Dass der eine den anderen verdeckt, ist eine **FOLGE** aus
    dem Fast-Fail-Verhalten und der Einzahl des `errorCounts`-Eintrags, **keine Messung**.
    TRIGGER: der erste Aufruf mit einer **gültigen** Klick-Kennung — also derselbe wie das
    Fallen der Sperre.

    **ERGÄNZT 2026-09-02 NACH DEM DOKU-LAUF 8 — DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN
    STEHEN UND IST RICHTIG; ER WAR NUR UNVOLLSTÄNDIG.** Zwei Dinge treten hinzu, und das
    zweite ist das schwerere.
    · **DER VERDECKTE ZWEITE GRUND HAT JETZT EINEN ZWEITEN, DOKUMENTIERTEN KANDIDATEN NEBEN
      DER TAG-HYPOTHESE: DIE `UPLOAD_CLICKS`-AUFLAGE.** GELESEN 2026-09-02
      (docs/ziel-befunde.md, Google-Abschnitt, Teil (cc)/(b);
      `/devguides/events/send-events`, Doku-Stand 2026-08-18): "For Google Ads offline
      conversions or enhanced conversions for leads, the productDestinationId must be the ID
      of a Google Ads conversion action with type set to **UPLOAD_CLICKS**."
      **DER EINTRAG NANNTE BISHER NUR EINEN KANDIDATEN.** Es sind zwei, und sie schliessen
      einander nicht aus. **OB DIE SCHNITTSTELLE EINE AKTION FALSCHEN TYPS ÜBERHAUPT ABLEHNT,
      IST UNGEMESSEN** — die Doku sagt "must be", nicht, was bei einem Verstoss geschieht.
    · **DER VERDECKUNGS-MECHANISMUS GREIFT EINE STUFE FRÜHER, ALS DIESER EINTRAG ANNIMMT.**
      Der Text oben sagt, der Datensatz komme "an einer etwaigen zweiten Prüfung gar nicht
      erst an". **Das ist richtig und noch zu schwach:** Unser Fehlergrund ist ein
      **DEKODIER-Fehler**, nicht ein Zuordnungs-Fehler — GELESEN 2026-09-02, Teil (cc)/(a):
      `PROCESSING_ERROR_REASON_INVALID_GCLID` heisst wörtlich "The google click ID could not
      be decoded", während der Zuordnungs-Fehler ein eigener Enum-Wert ist
      (`PROCESSING_ERROR_REASON_INVALID_CLICK`, "The event can't be attributed to a click").
      **EIN DATENSATZ, DESSEN KENNUNG NICHT EINMAL DEKODIERT WERDEN KANN, ERREICHT WEDER DIE
      ZUORDNUNG NOCH EINE PRÜFUNG DER CONVERSION-AKTION.** Verdeckt ist also nicht ein
      zweiter Grund hinter einem ersten, sondern **alles, was hinter der Dekodierung liegt**.
    **WAS SICH DADURCH NICHT ÄNDERT — UND DAS IST DER GRUND, WARUM HIER ERGÄNZT UND NICHT
    ERSETZT WIRD:** Der Eintrag bleibt in seiner Aussage unberührt. Die Tag-Hypothese ist
    weiterhin **weder bestätigt noch widerlegt**, der Satz über die Antwort, die nur einen
    Grund haben konnte, gilt unverändert, und **der TRIGGER bleibt wörtlich stehen**.
    PROVENIENZ: beide Zusätze **GELESEN 2026-09-02** (Doku-Lauf 8, s. Teil (cc)); dass der
    Dekodier-Fehler vor der Zuordnung liegt, ist eine **ABLEITUNG** aus den zwei gelesenen
    Enum-Beschreibungen, **keine Messung**.

    **ERLEDIGT AM 2026-09-07 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN SEINES SATZES ÜBER
    DIE VERDECKUNG.** Bauform wie bei Eintrag 15 und Eintrag 7: ein eigener datierter Absatz
    UNTER dem unveränderten Eintrag, mit Datum, Grund und dem, was ihn eingelöst hat. **Der
    Text darüber bleibt Zeichen für Zeichen stehen, der TRIGGER eingeschlossen.**

    **WAS IHN EINLÖST — GEMESSEN 2026-09-07 (OWNER), abgelesen in der Google-Ads-Oberfläche
    unter Data Manager, Integrationsdetails, Protokolle:** Die Zeile vom **7. Sept. 2026**
    (Nutzung "offline (Upload)", Nutzungstyp Conversion, Vorgang Hinzufügen) steht auf
    **1 Anfrage · 1 Datensatz · Erfolgsquote 100 % · 0 Fehler**. Die Nutzungsübersicht der
    letzten sieben Tage nennt **2 Conversions und 9 Anfragen**.
    **DER KONTRAST IST DER EIGENTLICHE BELEG, nicht die 100 % für sich:** In **derselben
    Tabelle** stehen die Zeilen vom **1., 2. und 3. September** auf **0 %**, mit Fehlern in
    Höhe der Datensätze — das waren die Läufe mit **erfundenen** Kennungen. **Die Tabelle
    zeigt Fehlschläge also an.** Eine Erfolgsquote ohne diesen Nachbarn wäre eine
    Abwesenheits-Behauptung ohne Positivkontrolle; mit ihm ist sie eine Messung.

    **WAS DAMIT BEANTWORTET IST — BEIDE KANDIDATEN DIESES EINTRAGS, in seiner eigenen
    Wortwahl:**
    · **DIE TAG-HYPOTHESE IST GEGENSTANDSLOS.** Eine tag-basierte Conversion-Aktion hätte
      diesen Import nicht mit 100 % und 0 Fehlern angenommen. Der Eintrag hatte sie
      ausdrücklich als "weder bestätigt noch widerlegt" geführt; sie ist jetzt **widerlegt**.
    · **DIE `UPLOAD_CLICKS`-AUFLAGE IST ERFÜLLT.** Die verwendete Conversion-Aktion trägt
      offenbar den verlangten Typ — sonst wäre der Datensatz nicht angenommen worden. Der
      zweite Kandidat, den die Ergänzung vom 2026-09-02 hinzugefügt hatte, ist damit
      ebenfalls erledigt.
    **DASS BEIDE ZUGLEICH FALLEN, IST KEIN ZUFALL, SONDERN DIE FIGUR DIESES EINTRAGS:** Der
    Datensatz hat die Dekodierung überstanden und ist damit zum ersten Mal überhaupt bis
    hinter sie gelangt — **genau dorthin, wo dieser Eintrag alles vermutet hat, was er nicht
    sehen konnte.**

    **DIE GRENZE, UND SIE IST DER WICHTIGSTE SATZ DIESES BLOCKS: GEMESSEN IST DIE ANNAHME,
    NICHT DIE VERBUCHUNG.** Google hat den Datensatz entgegengenommen. **Ob daraus eine
    Conversion in der Berichterstattung wird und ob sie auf Gebote wirkt, ist eine ANDERE
    ACHSE mit einem anderen Instrument.**
    **DIE ABLAGE FÜHRT DAFÜR EIN ZEITFENSTER, und es steht dort im Wortlaut** —
    docs/ziel-befunde.md, Google-Abschnitt, Teil H2: "In den ersten **14 TAGEN** je
    Conversion-Action fliessen die per API gelieferten Multi-Source-Daten **NICHT** in die
    Gebotssteuerung, und WERT-ÜBERSCHREIBUNGEN SIND ABGESCHALTET". Dieselbe Ablage führt in
    Teil H1 unter den vier täuschenden Instrumenten ausdrücklich auch "**DER BLICK IN DIE
    GOOGLE-ADS-OBERFLÄCHE INNERHALB DER 14 TAGE** — die Ereignisse erscheinen in der
    Berichterstattung, wirken aber nicht auf die Gebote".
    **DIE ABLAGE WIDERSPRICHT DER DEUTUNG NICHT, SIE SCHÄRFT SIE:** Teil G1 hält fest, eine
    200 heisse "ENTGEGENGENOMMEN UND STRUKTURELL IN ORDNUNG", nicht "verarbeitet" und schon
    gar nicht "gezählt", und die eigentliche Verarbeitung sei asynchron — die Diagnostik
    stehe **frühestens 30 Minuten, bis zu 24 Stunden später**. **DIE ABGELESENE TABELLE LIEGT
    HINTER DIESER STUFE** (die Fehlerzeilen vom 1. bis 3. September stammen aus eben dieser
    asynchronen Verarbeitung), **aber vor der Verbuchung.**
    **DARAUS FOLGT EINE AUFLAGE UND NICHT NUR EINE GRENZE, NACHGETRAGEN 2026-09-07: WER
    INNERHALB DIESES FENSTERS IN DIE BERICHTERSTATTUNG SIEHT, HAT KEIN TAUGLICHES INSTRUMENT
    FÜR DIE FRAGE "WIRKT DIE CONVERSION"** — docs/ziel-befunde.md, Google-Abschnitt, Teil H1,
    führt genau diesen Blick als eines von vier täuschenden Instrumenten, wörtlich: "**DER
    BLICK IN DIE GOOGLE-ADS-OBERFLÄCHE INNERHALB DER 14 TAGE** — die Ereignisse erscheinen in
    der Berichterstattung, wirken aber nicht auf die Gebote, und Wert-Überschreibungen sind
    abgeschaltet". Der Absatz darüber nennt das Fenster als **GRENZE dieser Messung**; dieser
    Satz macht daraus die **AUFLAGE an die nächste** — sonst liest die nächste Runde ein
    Erscheinen in der Berichterstattung als Wirkung.

    **NACHTRAG 2026-09-07, SPÄTER AM TAG — DIE VERBUCHUNG IST GEMESSEN. DER ABSATZ DARÜBER
    BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER NACHTRAG TRITT DANEBEN.**
    **WARUM ERGÄNZT UND NICHT ERSETZT, und der ganze Absatz ist dafür gelesen worden:** Der
    Satz "GEMESSEN IST DIE ANNAHME, NICHT DIE VERBUCHUNG" steht in einem Block, der die
    **GRENZE DIESER Ablesung** beschreibt — der des Data-Manager-Protokolls. **Als Aussage
    über JENE Ablesung ist er unverändert wahr:** Sie hat die Annahme gezeigt und die
    Verbuchung nicht. Überholt ist allein seine **Reichweite als Aussage über den
    Wissensstand**. Wer ihn ersetzte, machte aus einer richtigen Grenzangabe eine falsche.
    **WAS DIE VERBUCHUNG BELEGT — ALS ZEIGER, NICHT ALS KOPIE:** docs/ziel-befunde.md,
    Google-Abschnitt, **Teil (cf)** (MESSUNG G, 2026-09-07). Dort steht die Ablesung samt
    ihren Grenzen; **zweimal geschrieben liefe es auseinander.** In einem Satz: Die eine
    Conversion des Zeitraums sitzt auf der **Offline-Aktion**, und die Detailseite nennt den
    Zeitpunkt selbst.
    **DIE ZUORDNUNG ZU UNSEREM AUFRUF IST AUCH DORT EINE ABLEITUNG UND KEINE MESSUNG** — es
    gibt weiterhin **keine gemeinsame Kennung** zwischen den zwei Seiten; sie ruht auf drei
    unabhängigen Beobachtungen. **Das ist genau die Figur, die dieser Block schon für die
    Einlieferung führt**, und sie wird durch die Verbuchung nicht aufgelöst.
    **WAS AUSDRÜCKLICH NICHT MITFÄLLT:** der Satz über die **GEBOTSWIRKUNG**. Ob die
    Conversion auf Gebote wirkt, ist **weiterhin nicht gemessen**; das Zeitfenster-Zitat und
    die Auflage darüber gelten unverändert. **NUR DIE VERBUCHUNG IST GEMESSEN, NICHT IHRE
    WIRKUNG.**
    **UND EINE FRAGE IST DABEI NEU AUFGEGANGEN, die dieser Block noch nicht kennt:** Ob das
    Zeitfenster für die **gewählte** Gestalt überhaupt gilt oder nur für die
    Multi-Source-Gestalt, ist **gelesen und nicht geklärt** — die Ablage führte dazu bis zum
    2026-09-07 **keinen Vorbehalt**. Sie ist als Grenze in **(cf)** benannt und **hier nicht
    entschieden**; der Absatz darüber wird davon **nicht angetastet**.
    PROVENIENZ: Die Verbuchung **GEMESSEN 2026-09-07 (OWNER)**, abgelesen in der
    Google-Ads-Oberfläche (Zielvorhaben → Conversions und die Detailseite der
    Offline-Aktion). Dass der Satz oben als Grenze SEINER Ablesung wahr bleibt, ist eine
    **ABLEITUNG** aus seinem Ort im Block (CC, 2026-09-07, Doku-Runde), **keine zweite
    Messung**. **KEIN Aufruf gegen eine Schnittstelle in dieser Runde.**

    **DIE AUSGELASSENE NACHLESE — AUSDRÜCKLICH EINE ENTSCHEIDUNG UND KEIN VERSÄUMNIS.** Die
    drei Statusabfragen über die Diagnose-Kennungen — die zwei vom 2026-09-02 und eine neue —
    **sind NICHT gefahren worden.** **GRUND:** Sie waren das Instrument für den Fall, dass
    die Einlieferung **scheitert**. Sie ist nicht gescheitert, und die zwei alten würden nur
    bestätigen, was die Tabelle ohnehin zeigt.
    **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07, Owner-GO.**
    **WARUM DAS ÜBERHAUPT DASTEHT: EIN NICHT GEFAHRENER SCHRITT, DEN NIEMAND ALS
    ENTSCHEIDUNG PROTOKOLLIERT, LIEST SICH IN EINEM JAHR WIE EINE LÜCKE** — und die nächste
    Runde fährt ihn nach, um etwas zu schliessen, das bewusst offen gelassen wurde.

    **WAS DIESER BLOCK NICHT SAGT: dass der Weg für JEDE Kennungsform trägt.** **GEMESSEN
    IST EINE EINLIEFERUNG MIT EINER KENNUNGSFORM.** Über die beiden anderen, die die
    gewählte Gestalt kennt, sagt diese Messung nichts.

    **EIN BEFUND ÜBER DIE ABLAGE SELBST, der in diesen Block gehört, weil er sonst nirgends
    steht — GEMESSEN am Dateitext (CC, 2026-09-07, Doku-Runde):** **DER TRANSPORT MIT EINER
    GÜLTIGEN KLICK-KENNUNG IST IN DIESER DATEI AN KEINER STELLE FESTGEHALTEN.** ACHSE: alle
    Erwähnungen eines geglückten Google-Transports, einer echten bzw. gültigen
    Klick-Kennung und eines Anzeigenklicks über den ganzen Dateitext.
    **JEDER dokumentierte Transport mit einer Kennung nennt einen VON HAND GESETZTEN Wert** —
    VERMERK 12 führt für den 2026-09-03 "Conversion mit `gclid`: der Google-Adapter
    SCHWEIGT", und der Eintrag zur Landepage sagt für den 2026-09-01 ausdrücklich "bei einem
    von Hand gesetzten Wert" samt dem Satz, ob eine **ECHTE** Kennung denselben Weg nehme,
    sei "weiterhin **NICHT GEPRÜFT**". **VERMERK 15 (2026-09-07) endet am Adapter mit
    `no destination for event` — er trägt keinen Transport.**
    **POSITIVKONTROLLE:** dieselbe Achse trifft diese drei Stellen und mehrere weitere; sie
    läuft nicht leer.
    **FOLGE, und sie ist der Grund für diesen Absatz: DIESER EINTRAG WIRD AUF EINEN BELEG
    GESCHLOSSEN, DER AUSSCHLIESSLICH BEIM ANBIETER LIEGT.** Der eigene Kanal hat den
    dazugehörigen Aufruf nicht protokolliert — oder er ist nicht abgelesen worden; **welches
    von beidem, ist NICHT ERHOBEN.** Wer später fragt, wann Pagesmith zum ersten Mal mit
    einer gültigen Kennung gesendet hat, findet die Antwort **nicht im Repo**.

    **WAS DIESER BLOCK AUSDRÜCKLICH NICHT TUT — Scope dieser Runde:** Er ändert nichts an der
    **zweiten Sperre** in "### (1) Der Gegenstand". Jene führt als OWNER-ANGABE vom
    2026-09-02, auf dem Konto habe es "nie einen echten Anzeigenklick gegeben". **Diese
    Messung ist damit nicht vereinbar** — ein Datensatz, dessen Kennung dekodiert werden
    konnte, setzt einen Klick voraus. **DASS DIE SPERRE DAMIT GEFALLEN IST, IST EINE
    ABLEITUNG AUS DIESER MESSUNG UND KEINE ZWEITE MESSUNG**, und sie wird hier **nur
    gemeldet**: Der Ort jener Sperre ist nicht Gegenstand dieser Runde.

    PROVENIENZ: Die abgelesene Tabelle samt Kontrast-Zeilen und der Nutzungsübersicht
    **GEMESSEN 2026-09-07 (OWNER)**, an der Oberfläche des Anbieters. Dass die Kennung des
    7. September eine **echte** war, ist eine **OWNER-ANGABE 2026-09-07**. Dass daraus das
    Fallen beider Kandidaten und der zweiten Sperre folgt, ist eine **ABLEITUNG** aus dieser
    Messung, **keine Messung**. Die Zitate aus docs/ziel-befunde.md sind **GELESEN
    2026-09-07 (CC, Doku-Runde)**; der Nicht-Befund über den fehlenden Transport-Beleg ist
    **GEMESSEN am Dateitext (CC, 2026-09-07)**. Die ausgelassene Nachlese ist eine
    **ARCHITEKTEN-ENTSCHEIDUNG 2026-09-07** auf Owner-GO.
43. **"STUMM" GILT FÜR DIE OBERFLÄCHE, NICHT FÜR DEN BETRIEB.** Diese Datei sagt an ZWEI
    Stellen, der Ausfall nach Ablauf des Zugangsdatums sei "in ihrer stummen Form" —
    Festlegung (4) des Zuschnitts der Scheibe 4 und VERMERK 10, Abschnitt (g). **BEIDE
    BLEIBEN RICHTIG UND SIND DESHALB ERGÄNZT UND NICHT ERSETZT WORDEN;** zu eng ist nicht die
    Aussage, sondern ihr Geltungsbereich.
    GEMESSEN am Code (CC, 2026-09-02):
    · **DIE OBERFLÄCHE SCHWEIGT WIRKLICH.** `listConfiguredTargets`
      (src/app/projects/actions.ts) selektiert aus `project_secrets` ausschliesslich
      `target` — kein `secret_enc`, keine Uhr. Die Karte sagt "Zugangsdaten hinterlegt",
      solange die Zeile existiert, unabhängig von jedem Ablauf.
    · **DAS SERVER-LOG SCHWEIGT NICHT.** S. Vorrats-Eintrag 42; hier nicht verdoppelt.
    **WARUM DIE UNTERSCHEIDUNG FÜR EINEN ZUSCHNITT ZÄHLT:** Aus "stumm" folgt sonst, es gebe
    nichts zu beobachten — und damit keine Live-Test-Achse. **Die gibt es.**
    GEMELDET 2026-09-02, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER jede Arbeit, die eine Anzeige des
    Ablauf-Zustands in der Oberfläche berührt.
44. **DIE BEWEIS-ROUTE HAT KEINEN AUFRUFER IN DER ANWENDUNG.** Diese Datei sagt an zwei
    Stellen "nach einem Druck auf die Beweis-Route" (Festlegung (4) des Zuschnitts der
    Scheibe 4 und VERMERK 10, Abschnitt (g)).
    GEMESSEN am Repo (CC, 2026-09-02; Achse: formale Suche über `src/` nach "oauth/google"
    ausserhalb von `src/app/api/oauth/`, dazu eine Suche nach "fetch" in `src/components/`;
    POSITIVKONTROLLE: dieselbe Suche findet den Verbinden-Weg): **Es gibt kein Bedienelement,
    das `/api/oauth/google/refresh` ruft.** Der einzige Oberflächen-Bezug zu einer
    Google-OAuth-Route steht in `src/components/TargetCard.tsx` und ruft
    `/api/oauth/google/start` — der Knopf "Google verbinden" bzw. "Google neu verbinden".
    **ES IST KEIN WIDERSPRUCH, SONDERN EINE ZU WEICHE FORMULIERUNG — UND DIESELBE DATEI KENNT
    DIE SACHE GENAUER:** Entscheidung **P3** (s. "Die Entscheidungen vom 2026-08-29") sagt
    wörtlich "DER PREIS IST BENANNT: Der Live-Test braucht einen `fetch` aus der eingeloggten
    Anwendung statt einer URL-Eingabe." **ZWEI STELLEN, ZWEI GENAUIGKEITEN; BEIM ZUSCHNITT
    ZÄHLT DIE GENAUERE.**
    **WAS AM CODE TRÄGT:** Die Stunde beginnt in der Praxis mit dem Verbinden bzw.
    Neu-Verbinden; die zweite genannte Quelle ist nur VON HAND erreichbar. **UND FÜR EINEN
    MASCHINELLEN AUFRUFER IST SIE GAR NICHT ERREICHBAR** — s. Vorbedingung (v) im Abschnitt
    "1b als Folgetask".
    GEMELDET 2026-09-02, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob ein Bedienelement entstehen
    sollte.
    TRIGGER: der Zuschnitt der Scheibe 1b, ODER die erste Arbeit, die den Ablauf-Zustand in
    der Oberfläche sichtbar macht.

    **VERMERK 2026-09-03 — DER ERSTE TRIGGER IST EINGETRETEN, UND 1b-1 SCHLIESST DIESEN
    EINTRAG AUSDRÜCKLICH AUS. DER TEXT DARÜBER BLEIBT ZEICHEN FÜR ZEICHEN STEHEN; DIESER
    VERMERK TRITT DANEBEN.**
    **DIE SCHEIBE 1b ENTSTEHT IN ZWEI SCHRITTEN — 1b-1 (die Klammer) und 1b-2 (der Takt);**
    der Nachtrag dazu steht am Ende der bindenden Entscheidung (7). **DER TRIGGER-WORTLAUT
    OBEN ZEIGT AUF DAS PAKET UND IST UNTER DIESER ZERLEGUNG UNVERÄNDERT RICHTIG.**
    Der Zuschnitt steht (s. den Abschnitt "Die Klammer um die Erneuerung — Schritt 1b-1 der
    Scheibe 1b des Schnitts der Phase 11.2") und führt diesen Eintrag unter "Was
    ausdrücklich draussen bleibt, je mit seinem Grund".
    **DIE BEWEIS-ROUTE BEKOMMT KEIN BEDIENELEMENT.** 1b-1 verdrahtet sie auf die Klammer um
    und macht sich damit demobar; **die Live-Test-Achse bleibt der `fetch` aus dem
    eingeloggten Tab** — der Preis, den Entscheidung P3 benannt hat. **ES ENTSTEHT KEIN
    NEUER ZUGANG:** Es kommt kein Pfad hinzu, es wechselt nur, was hinter dem bestehenden
    liegt.
    **DER BEFUND DIESES EINTRAGS GILT DAMIT UNVERÄNDERT WEITER:** Auch nach 1b-1 gibt es
    kein Bedienelement, das die Route ruft, und für einen maschinellen Aufrufer ist sie
    unverändert nicht erreichbar (Vorbedingung (v) im Abschnitt "1b als Folgetask", die dort
    1b-2 bindet).
    **DER EINTRAG WIRD NICHT ABGEHAKT UND NICHT UMFORMULIERT; SEIN ZWEITER TRIGGER IST
    UNBERÜHRT** — die erste Arbeit, die den Ablauf-Zustand in der Oberfläche sichtbar macht,
    steht aus. **KEINE EMPFEHLUNG.**
    PROVENIENZ: Dass der erste Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut
    und der Existenz des Zuschnitts (CC, 2026-09-03). Der Ausschluss ist ein
    ARCHITEKTEN-ZUSCHNITT vom 2026-09-03, die Zerlegung in zwei Schritte eine
    ARCHITEKTEN-FESTLEGUNG desselben Tages; keine Messung.
45. **DER BEREICH "VERÖFFENTLICHEN" FÜHRT BEI EINEM PROJEKT MIT VERBUNDENER CUSTOM-DOMAIN
    NUR DIE LABEL-URL, NICHT DIE CUSTOM-DOMAIN.**
    **ES IST KEIN SERVING-FEHLER, UND DIESER SATZ STEHT ZUERST:** Beide Adressen
    funktionieren. Die Seite ist unter der Label-URL **und** unter der Custom-Domain
    erreichbar; es geht nichts verloren und nichts 404t.
    **DER SCHADEN LIEGT IN DER ANZEIGE:** Wer die Live-Adresse von dort kopiert, **nimmt die
    falsche** — er trägt eine Adresse in eine Anzeige, in eine Übergabe oder in ein
    Dokument, die nicht die ist, unter der die Seite laufen soll.
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist weder erhoben, welche Stelle die angezeigte Adresse baut, noch ob die Beobachtung
    für jedes Projekt mit Custom-Domain gilt oder nur für das beobachtete. **Wer sie
    aufgreift, misst sie zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder dazu, welche der beiden
    Adressen führen sollte, noch dazu, ob beide zu zeigen wären.
    TRIGGER: die nächste Arbeit am Bereich "Veröffentlichen".
46. **DIE NUTZLAST VON HANDAUFRUF 3 DER MESSUNG D IST NUR RELATIONAL PROTOKOLLIERT — VIER
    FELDER SIND NICHT AUFLÖSBAR.**
    **DER BEFUND:** Das Protokoll beschreibt Aufruf 3 als "sonst zeichengleich zu 3" und
    Aufruf 3 seinerseits über Aufruf 2. **Eine Kette aus Verweisen endet damit nicht bei
    einem Wert**, und vier Felder der gesendeten Nutzlast lassen sich heute nicht mehr
    bestimmen.
    **ES IST DIESELBE KLASSE WIE VORRATS-EINTRAG 40, und darin liegt der Grund für diesen
    Eintrag: EIN PROTOKOLL, DAS AUF EINEN VORGÄNGER ZEIGT STATT SEINEN GEGENSTAND ZU NENNEN,
    IST NICHT WIEDERVERWENDBAR.** Jener Eintrag hält denselben Mechanismus an einer
    ausgelassenen `requestId` fest — dort fehlt der Wert, hier steht an seiner Stelle ein
    Zeiger. **Der Ausgang ist derselbe: Die Messung ist nicht nachzubauen, und ihre Aussage
    ist an keinem Feld nachzuprüfen.**
    **PROVENIENZ: OWNER-BEOBACHTUNG 2026-09-02. NICHT GEMESSEN, NICHT AM CODE GEPRÜFT.** Es
    ist in dieser Runde **kein** Abgleich am Dateitext gefahren worden — weder darüber,
    welche vier Felder es sind, noch darüber, wie viele Aufrufe der Messung D relational
    beschrieben sind. **Wer den Eintrag aufgreift, erhebt beides zuerst.**
    GEMELDET 2026-09-03, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder eine Auflage an künftige
    Messprotokolle noch eine nachträgliche Befüllung ist hier vorgeschlagen.
    TRIGGER: die nächste Messung mit einem Bezeichner für eine spätere Nachfrage.
47. **DAS TOKEN "1b" IST IM REPO NICHT EINDEUTIG — ZWEI NUMMERIERUNGEN TEILEN DIE KÜRZEL
    1a, 1b UND 1c.**
    Neben dem Schnitt der Phase 11.2 führt `docs/claude-history/future-roadmap.md` unter
    **Säule 1** eine EIGENE Aufzählung — **(1a)** llms.txt · **(1b)** Schema.org/JSON-LD ·
    **(1c)** Zwischenschritt (manuelle JSON-LD-Injektion) —, und `docs/roadmap.md` zitiert
    daraus. **ES SIND DREI KOLLIDIERENDE KÜRZEL, NICHT NUR DAS EINE, NACH DEM GESUCHT
    WURDE.**
    **WAS HEUTE TRÄGT UND WARUM DAS KEIN ZUFALL BLEIBEN DARF: EINDEUTIG WIRD DIE ANGABE
    ALLEIN DURCH DAS WORT DAVOR.** "Scheibe 1b" bzw. "Schritt 1b-1" trifft; **das nackte
    "1b" trifft beide Nummerierungen.** Wer den Suffix- und Präfix-Gebrauch für Kosmetik
    hält und ihn beim nächsten Aufräumen kürzt, **erzeugt die Mehrdeutigkeit, die es heute
    nicht gibt.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob eine der beiden Nummerierungen
    umbenannt wird — die fremde liegt in einem ARCHIV und in der ROADMAP, und beide sind
    ausserhalb jedes heutigen Scopes.
    TRIGGER: die nächste Arbeit an Säule 1 der Zukunfts-Roadmap, ODER die erste Umbenennung
    an einer der beiden Nummerierungen.
    PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-03; Achse: rekursive Suche über `*.md`,
    `*.ts` und `*.tsx`, binärsicher, mit Positivkontrolle über die 22 `11.1c`-Treffer).
    Dass die Kollision heute folgenlos ist, ist eine ABLEITUNG aus dem Sprachgebrauch, keine
    zweite Messung.
48. **DIE FEHLERZEILE IST MEHRDEUTIG GEWORDEN — DERSELBE WORTLAUT UND DIESELBE LOG-EBENE
    TRAGEN JETZT ZWEI ZUSTÄNDE.**
    **GEMESSEN am Code (CC, 2026-09-03), LIVE bestätigt (OWNER, 2026-09-03):**
    `usableTokenFromRow` (src/lib/capi/token.ts) schreibt bei toter Uhr 1 unverändert
    `console.error("[capi/resolve] secret unusable", …)`. **Der Aufruf steht VOR der
    Verzweigung und wird in BEIDEN Fällen geschrieben;** was sie trennt, ist allein der
    `reason`:
    · **`access_token_expired` IST EIN NORMALVORGANG.** Uhr 2 lebt, das Ziel landet in
      `renewable`, **die Rettung greift** — und die Conversion geht hinaus.
    · **`refresh_token_expired` IST EIN ECHTER AUSFALL.** Uhr 2 ist überschritten, es gibt
      keinen Weg zurück ausser einer **Neu-Autorisierung durch den Kunden**. **KEIN CODE
      BEHEBT DAS.**
    **DIE SCHEIBE HAT DIE ZEILE SELTENER GEMACHT UND IHRE BEDEUTUNG MEHRDEUTIG.** Das ist
    kein Widerspruch, sondern der ganze Posten: Vor 1b-2a bezeichnete sie **nur** den
    Bruch, und `console.error` war dafür die richtige Ebene. **Jetzt bezeichnet sie ihn in
    der Hälfte der Fälle** — in der anderen Hälfte bezeichnet sie einen Vorgang, der
    funktioniert hat.
    **DER SCHADEN IST EINE GEWÖHNUNG, KEIN DEFEKT — und darin liegt seine Tücke:** Wer die
    Zeile regelmässig sieht und regelmässig feststellt, dass alles läuft, hört auf, den
    `reason` zu lesen. **Dann steht der echte Ausfall im selben Gewand da wie der
    Normalvorgang.**
    **EINE DRITTE QUELLE KOMMT DAZU UND MACHT DIE GEWÖHNUNG WAHRSCHEINLICHER:** Der
    Bestätigungs-Beacon erzeugt die Zeile **auch im Erfolgsfall** (VERMERK 12, Abschnitt
    (d)) — ein Conversion-Beacon-Paar hinterlässt sie also selbst dann, wenn die Rettung
    geglückt ist.
    **KEINE EMPFEHLUNG zur Log-Ebene oder zum Wortlaut.** Weder eine Herabstufung des
    Normalfalls auf `console.info` noch eine Umbenennung noch eine zweite Zeile ist hier
    vorgeschlagen — jede davon berührt den meistgetroffenen Pfad der Plattform und ist eine
    eigene Entscheidung.
    **DIE ABGRENZUNG ZU VORRATS-EINTRAG 42 GEHÖRT DAZU, sonst liest die nächste Runde zwei
    Fassungen derselben Sache:** Jener fragt **WIE OFT** die Zeile entsteht (ungedrosselt,
    je Besucher) und führt sie als Live-Test-Achse. **Dieser fragt, WAS SIE BEDEUTET.**
    Zwei verschiedene Fragen an derselben Zeile; 42 trägt seit dem 2026-09-03 einen
    Vermerk, der die Verschiebung seiner zweiten Richtung festhält.
    GEMELDET 2026-09-03, NICHT GEBAUT.
    TRIGGER, wörtlich vom Owner: **sobald Logs überflogen statt gelesen werden** — dann
    wird aus einer harmlosen Gewöhnung eine übersehene Neu-Autorisierung.
    PROVENIENZ: **OWNER-BEOBACHTUNG und ARCHITEKTEN-EINORDNUNG 2026-09-03**, am Code
    bestätigt (CC, 2026-09-03). Die Häufigkeit der beiden Fälle ist **nicht erhoben**.
49. **DIE BENENNUNG EINES TESTLAUFS IST WEITER ALS DIE SACHE — "PageView rettet nicht,
    sorgt aber vor".**
    Der Lauf **H7** in `src/lib/capi/ingest.refresh.test.ts` trägt diesen Namen. **DER LAUF
    SELBST IST RICHTIG** und misst, was er messen soll: Ein nicht forwardbares Ereignis löst
    **keine** Rettung aus, wohl aber die Vorsorge.
    **SEIN NAME BEHAUPTET MEHR, ALS BEI TOTEM TOKEN GESCHIEHT.** "Erneuerbar, tot" landet in
    `rettbar`, und `rettbar` wird **ausschliesslich innerhalb der Forward-Wache**
    abgearbeitet — also hinter `isForwardable`. **Ein Projekt, das nur Pageviews erzeugt,
    wird weder gerettet noch vorgesorgt**; vorgesorgt wird **nur im Vorlauf-Band eines
    lebenden Zugangsdatums**. Der Name legt eine Vorsorge nahe, die in genau dem Fall
    ausbleibt, den der Lauf im Titel führt.
    **ES IST KEIN DEFEKT, UND DER GRUND GEHÖRT DAZU, sonst wird der Eintrag grösser gelesen
    als er ist:** Es steht dabei **keine Conversion auf dem Spiel** — ein Pageview forwardet
    ohnehin nicht —, und **die erste Conversion rettet**. Der Zustand kostet nichts, was
    jemand vermissen könnte. **Volltext der Einordnung: VERMERK 12, Abschnitt (d).**
    **WARUM DAS ÜBERHAUPT EIN POSTEN IST:** Ein Testname wird gelesen, wenn niemand den
    Testkörper liest — beim Überfliegen einer Suite, beim Suchen nach Abdeckung, beim
    Streichen vermeintlich redundanter Läufe. **Eine zu weite Selbstbeschreibung lädt dazu
    ein, eine Achse für gedeckt zu halten und keinen Test dafür zu schreiben**
    (docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL", die
    vierte Weise: der Testkommentar behauptet eine Garantie, die sein Test nicht deckt).
    **HIER IST ES DER NAME STATT DES KOMMENTARS — dieselbe Achse, eine Stelle davor.**
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, wie der Lauf heissen sollte, und
    ausdrücklich keine, den Zuschnitt zu ändern.
    TRIGGER: die nächste Arbeit an `src/lib/capi/ingest.refresh.test.ts`.
    PROVENIENZ: GEMESSEN am Code (CC, 2026-09-03); die Einordnung ist eine
    ARCHITEKTEN-BEOBACHTUNG desselben Tages.
51. **`cut -c<n>` SCHNEIDET NACH ZEICHEN UND ZERLEGT DABEI MEHRBYTE-ZEICHEN — DIE FOLGE IST
    KEINE FEHLERMELDUNG, SONDERN EINE ANDERE AUSGABEFORM.**
    **GEMESSEN am eigenen Lauf (CC, 2026-09-04):** Ein Reihenfolge-Vergleich zweier
    Titel-Listen schnitt mit `cut -c1-70`. Das halbiert bei UTF-8 ein Mehrbyte-Zeichen; die
    entstandene Datei trägt danach eine ungültige Byte-Folge, und `diff` meldet
    **`Binary file … matches`** STATT der Trefferzeilen. **Die Vergleichsdatei fällt damit
    aus der Auswertung, ohne dass irgendetwas rot wird.**
    **GEWECHSELT** auf einen Schnitt an einem TEXTMUSTER (`sed 's/ (Trigger.*//'`), der keine
    Byte-Grenze verletzt — dazu eine NUL-Zählung über die Messdateien selbst und eine
    künstliche Abweichung als **POSITIVKONTROLLE**, die anschlug.
    **WAS DIESER FALL DEN BEKANNTEN HINZUFÜGT, UND ES IST DER GRUND FÜR DEN EINTRAG:** Die
    bisher protokollierten Fälle erzeugten eine **ABWESENHEIT** — kein Treffer, wo einer
    wäre. **DIESER ERZEUGT EINE AUSGABE, DIE WIE EIN BEFUND ÜBER DEN INHALT AUSSIEHT UND IN
    WAHRHEIT EINER ÜBER DAS INSTRUMENT IST.** „Binary file matches" liest sich wie eine
    Aussage über die Datei; es ist eine über den Schnitt, den man selbst gesetzt hat.
    **DIE REGEL DAZU STEHT UND WIRD NICHT ERSETZT:** docs/immer-beachten.md, „EINE ABWESENHEIT
    KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND". **DIESER EINTRAG IST EIN BELEG,
    KEINE NEUE REGEL** — und ob er dort als Beleg ergänzt wird, ist eine EIGENE Entscheidung;
    docs/immer-beachten.md ist in dieser Runde unberührt.
    **HIER STEHT BEWUSST KEINE ORDNUNGSZAHL, UND DAS IST DER ZWEITE BEFUND DIESES EINTRAGS.**
    Die Vorlage dieser Runde nannte ihn den „fünften Fall … nach `sed -i`, `grep -c $'\r'`,
    `grep -qP '\x00'` und `LC_ALL=C grep -P`". **DIE ZWEI BESTEHENDEN AUFZÄHLUNGEN DIESER
    DATEI ZÄHLEN ABER VERSCHIEDENE MITGLIEDER** — GEMESSEN am Dateitext (CC, 2026-09-04):
    · **VERMERK 10, Abschnitt (h)** nennt sich den DRITTEN Fall, „nach `sed -i` … und `grep`
      ohne `-a`".
    · **VERMERK 11, Abschnitt (e)** nennt sich den VIERTEN, „neben `grep -c $'\r'`
      (Hebungs-Kandidat 6), `grep -qP '\x00'` (Vorrats-Eintrag 33) und `python3`".
    **KEINE DER BEIDEN LISTEN ENTHÄLT DIE ANDERE.** Die Vereinigung trägt SECHS Werkzeuge,
    keine der zwei Ordnungszahlen ist an ihr gemessen, und eine dritte Zahl daneben wäre bei
    der nächsten Ergänzung neu falsch — **dieselbe Bauform, die in dieser Datei mehrfach
    protokolliert kaputtgegangen ist** (s. die Köpfe von „Entscheidungen, die über ihre
    Scheibe hinaus binden" und „Vorrat"). **DIE ZAHL WIRD DESHALB NICHT GESETZT UND DIE
    BESTEHENDEN WERDEN NICHT ANGETASTET:** Sie sind als Aussage über IHRE Liste richtig.
    **WER DIE REIHE JE ZUSAMMENFÜHRT, FÜHRT DIE MITGLIEDER ZUSAMMEN UND NICHT DIE ZAHLEN**
    (docs/immer-beachten.md, „MENGEN — ZWEI REGELN, DIE ZUSAMMENGEHÖREN", Teil (a)).
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Messung, die Text nach Zeichenzahl beschneidet.
52. **DREI COMMITTETE ABSCHNITTE TRAGEN DENSELBEN SAMMEL-PROVENIENZ-SATZ — UND AN KEINEM
    IST ER JE GEPRÜFT WORDEN.**
    **DER BEFUND — GEMESSEN am Dateitext (CC, 2026-09-04, Doku-Runde; Achse: der Wortlaut
    "stammt aus der Aufklärungsrunde" über docs/aktiver-stand.md im Volltext, binärsicher):
    DREI Treffer**, je einer im Zuschnitt zu Schritt 1b-1, im Zuschnitt der Scheibe 1b-2a
    und im Zuschnitt der Scheibe 11.2b. Alle drei tragen dasselbe Konstrukt und alle drei
    dasselbe Datum, den 2026-09-03.
    **DIE MESSUNG LIEF VOR DEM ENTSTEHEN DIESES EINTRAGS, UND SEITHER TRIFFT DIE ACHSE IHRE
    EIGENE BESCHREIBUNG — das gehört dazu, sonst zählt die nächste Runde nach und kommt auf
    VIER:** Der zitierte Wortlaut steht jetzt auch in DIESER Zeile. **Wer nachmisst, zieht
    die Treffer dieses Eintrags ab; die Zahl der Zuschnitte, die das Konstrukt tragen,
    bleibt DREI.**
    **WARUM DAS EIN POSTEN IST UND NICHT EINE STILFRAGE:** Am **VIERTEN** Exemplar
    desselben Konstrukts — im Zuschnitt der Scheibe 1b-2b — ist am 2026-09-04 gemessen
    worden, dass es für **VIER von vier geprüften Angaben NICHT zutraf**; sie stammten aus
    einer anderen Runde (GEMESSEN am Repo, CC, 2026-09-04, Korrektur-Runde). **Das
    Konstrukt hat sich also vermehrt, und an keinem der drei übrigen Exemplare hat es je
    jemand geprüft.**
    **DIE BAUFORM IST DAS EIGENTLICHE, NICHT DIE EINZELNE FUNDSTELLE:** Eine
    Sammel-Provenienz behauptet eine Herkunft über eine **MENGE**, deren Mitglieder sie nie
    einzeln geprüft hat — **sie kann gar nicht anders.** Sie ist damit die einzige
    Provenienz-Form, die bei jedem Zuwachs ihres Abschnitts neu falsch werden kann, **ohne
    dass irgendetwas rot wird.**
    **DIE GRENZE, UND SIE MUSS MIT — ohne sie liest die nächste Runde hier eine
    Fehlerbehauptung, die niemand erhoben hat: OB DIE DREI FALSCH SIND, IST UNGEMESSEN.**
    Gemessen ist ihre **EXISTENZ** und die Falschheit **EINES ANDEREN** Exemplars. **Eine
    Mengen-Aussage wird nicht dadurch wahr, dass ein Mitglied geprüft ist** — es ist
    dieselbe Figur, gegen die dieser Eintrag sich richtet, nur in die andere Richtung.
    **DIE NACHBARSCHAFT IN DIESER DATEI GEHÖRT DAZU, sonst sieht der Posten wie ein
    Einzelfall aus:** Die Köpfe von "Entscheidungen, die über ihre Scheibe hinaus binden"
    und von "Vorrat (gemeldet, nicht gebaut)" führen bereits "UND KEINE SAMMEL-HERKUNFT"
    bzw. "KEINE SAMMEL-DATIERUNG IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK" — **die
    Bauform ist an zwei Listen schon einmal kaputtgegangen und dort abgeschafft worden.**
    An den ZUSCHNITTEN steht sie unverändert.
    GEMELDET, NICHT GEBAUT. **KEINE EMPFEHLUNG**, ob und wie die drei zu korrigieren sind —
    weder eine Prüfung je Angabe noch eine Streichung noch ein Stempel ist hier
    vorgeschlagen.
    TRIGGER: die nächste Runde, die einen dieser drei Abschnitte ohnehin öffnet.
    PROVENIENZ: die drei Fundstellen **GEMESSEN am Dateitext (CC, 2026-09-04,
    Doku-Runde)**, mit Positivkontrolle über zwei bestehende Titel und einer
    Negativkontrolle; die Falschheit des vierten Exemplars **GEMESSEN am Repo (CC,
    2026-09-04, Korrektur-Runde)**; dass die drei deshalb **verdächtig** sind, ist eine
    **ABLEITUNG und keine Messung**.
54. **SIEBEN LOG-ZEILEN IN `token-refresh.ts` TEILEN SICH ZWEI WORTLAUTE — `provider`
    FÜNFMAL, `parse` ZWEIMAL.**
    **GEMESSEN am Repo (CC, 2026-09-05, Korrektur-Runde zum Bau der Scheibe 1b-2b).
    ACHSE:** wörtliche Suche nach der vollständigen Zeichenkette `"[oauth/token-refresh]
    provider"` bzw. `"[oauth/token-refresh] parse"` in `src/lib/oauth/token-refresh.ts`,
    binärsicher und mit Zeilennummern.
    **POSITIVKONTROLLE:** dieselbe Achse liefert für `unknown_target` und `write_threw` je
    **EINEN** Treffer — sie läuft nicht leer und unterscheidet die Vielfachen von den
    Einzelnen. **GEGENPROBE:** ausserhalb dieser Datei kommt keiner der beiden Wortlaute
    vor.
    **DER BEFUND IST ÄLTER ALS DIE SCHEIBE 1b-2b UND VON IHR NICHT VERURSACHT.** Er ist
    beim Auflösen eines DRITTEN Vorkommens derselben Figur aufgefallen — dort standen zwei
    `console.error` unter dem identischen Wortlaut `[oauth/token-refresh] write`, und die
    zwei sind in derselben Runde getrennt worden. **DIESE SIEBEN SIND ES NICHT.**
    **`provider` (fünf Zeilen) TRÄGT FÜNF ANBIETER-ZUSTÄNDE:** Zeitüberschreitung ·
    Netzfehler · ein 5xx · `invalid_grant` · alles Übrige.
    **`parse` (zwei Zeilen) TRÄGT ZWEI LESE-ZUSTÄNDE:** eine fremde Fassung der Nutzlast ·
    eine kaputte Zeichenkette.
    **EINE ABWEICHUNG ZUR EINSCHÄTZUNG IM AUFTRAG, UND SIE GEHÖRT HIERHER, WEIL SIE DIE
    RANGFOLGE UMDREHT — GEMESSEN am Code (CC, 2026-09-05):** Der Auftrag führte `parse` als
    den schärferen Fall. **AM CODE IST ES `provider`.** Die zwei `parse`-Zeilen enden
    **BEIDE** in `dead` und unterscheiden sich nur im `reason` — **dieselbe HANDLUNG**. Die
    fünf `provider`-Zeilen enden in **ZWEI VERSCHIEDENEN Ausgängen**: viermal `retry`,
    einmal `dead`. **DERSELBE WORTLAUT TRÄGT DORT ALSO "NOCHMAL VERSUCHEN" UND "DER KUNDE
    MUSS NEU AUTORISIEREN"** — und genau diese Trennung ist das Kriterium, an dem
    Vorrats-Eintrag 48 seinen Schaden festmacht (Normalvorgang gegen echten Ausfall unter
    einem Wortlaut). **DIE ZWEI ZAHLEN DES AUFTRAGS SIND UNVERÄNDERT RICHTIG**; abweichend
    ist allein die Einordnung, welcher der beiden Fälle schwerer wiegt.
    **ALLE SIEBEN ZEILEN FÜHREN BEREITS EINEN `reason` IN IHRER NUTZLAST**, und das macht
    den Posten nicht kleiner, sondern bestimmt ihn: **Was sie trennt, steht im Feld und
    nicht im Wortlaut** — wer im Log GREPPT oder eine Zeile überfliegt, sieht es nicht.
    **Es ist zeichengenau dieselbe Figur wie in Vorrats-Eintrag 48**, wo derselbe Satz über
    `[capi/resolve] secret unusable` steht.
    **GEMELDET, NICHT GEBAUT. KEINE EMPFEHLUNG** — weder darüber, ob getrennt wird, noch
    wie die Wortlaute dann hiessen.
    **TRIGGER: die nächste Arbeit an den Log-Wortlauten dieser Datei.**
55. **ZWEI WERTE IM EINSTELLUNGS-BLOB WERDEN GEPFLEGT UND VON KEINEM KONSUMENTEN GELESEN.**
    Es geht um `settings.capi.tokenSet` und `settings.capi.trackingKey` — beide unter
    demselben Unterobjekt, beide von denselben Stellen geschrieben.

    **`tokenSet` IST ES HEUTE SCHON. GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde);
    ACHSE:** alle Vorkommen von `getCapiTokenSet` sowie jeder direkte Zugriff auf das Feld
    über `src/`, rekursiv, binärsicher, **Testdateien mitgezählt**. **ERGEBNIS:**
    `getCapiTokenSet` hat **NULL Produktiv-Aufrufer** — es gibt die Definition in
    `src/lib/settings.ts`, sechs Zeilen in deren Testdatei und zwei blosse
    Kommentar-Erwähnungen. **POSITIVKONTROLLE:** dieselbe Achse, auf `getTrackingKey`
    angewandt, fördert dessen fünf Produktiv-Aufrufer zutage; sie läuft nicht leer.

    **DIE FORMULIERUNG "VON NIEMANDEM GELESEN" WÄRE ZU WEIT, UND DIE PRÄZISIERUNG IST DER
    EIGENTLICHE BEFUND DIESES EINTRAGS:** Das Feld **wird** im Produktivcode an zwei
    Stellen gelesen — in `setCapiToken` und in `removeCapiToken` (beide
    src/app/projects/actions.ts) —, aber **beide Male ausschliesslich, um es
    zurückzuschreiben**. **KEIN KONSUMENT LEITET DARAUS EINE ANZEIGE ODER EIN VERHALTEN
    AB.** Wer den weiteren Satz schreibt, behauptet mehr, als die Messung hergibt; wer den
    Unterschied einebnet, hält eine Selbst-Fortschreibung für einen Leser.
    **DER BESTAND BENENNT DIE LAGE SELBST** — der Kommentar an der Karten-Rückmeldung in
    src/components/CodeImporter.tsx hält fest, dass der Wert seit der Oberflächen-Hälfte
    von niemandem mehr gelesen wird, trotzdem stehen bleibt, weil der Server ihn weiter
    schreibt, und dass seine Abschaffung **eine eigene Runde** ist.

    **`trackingKey` WIRD ES MIT DER SCHEIBE "Der Schlüssel kommt aus der Spalte".** Danach
    liest ihn **kein Dokument-Erzeuger** mehr; geschrieben wird er weiterhin an **vier**
    Stellen — der Server-Action beim Setzen, der beim Entfernen und den zwei
    Client-Handlern der Karten-Rückmeldung. **DAS IST EINE ABLEITUNG AUS DEM ZUSCHNITT
    JENER SCHEIBE UND KEINE MESSUNG** — sie ist zum Zeitpunkt dieses Eintrags nicht gebaut.

    **WARUM DIE BEIDEN ZUSAMMEN STEHEN UND NICHT ALS ZWEI EINTRÄGE:** dieselbe Ursache
    (ein server-geschriebener Wert in einem client-besessenen Blob), dieselbe Abräum-Arbeit
    (dieselben vier Schreiber, dieselbe Setzer-Funktion `setCapiState`), und **getrennt
    bearbeitet zieht jede die andere nach** — wer `trackingKey` aus `setCapiState`
    entfernt, steht unmittelbar vor derselben Frage für `tokenSet`, und umgekehrt.

    **WAS DIESER EINTRAG NICHT SAGT:** dass die Werte weg sollen. **Ein toter Wert, der
    weiter geschrieben wird, ist eine dritte Wahrheit** — das ist der Befund. Ob die
    Antwort das Abräumen ist, ob es ein Lese-Verbot ist oder ob er stehen bleibt, ist
    **hier nicht entschieden**.

    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Arbeit am Einstellungs-Blob oder an `setCapiState`.
56. **EINE WARNZEILE IM AUSGELIEFERTEN TEXT SAGT "NICHT KONFIGURIERT" UND STEHT DIREKT ÜBER
    DEM ZEILE, DIE SENDET.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-07, Doku-Runde), Achse: alle `console.warn`
    in `src/lib/tracking/` und `src/lib/generate.ts`, Testdateien ausgenommen;
    POSITIVKONTROLLE: dieselbe Achse trifft die zweite Warnung des Beacon-Bauers, sie läuft
    nicht leer:** `metaTrackStatement` (`src/lib/tracking/meta.ts`) nimmt **zwei** Fragen
    entgegen — ob die Meta-Laufzeit existiert und ob eine Meta-Kennung hinterlegt ist. Fehlt
    die Kennung, erzeugt es die Warnung; existiert die Laufzeit trotzdem, hängt es den
    Feuer-Aufruf **unmittelbar darunter**. **IM ERZEUGTEN TEXT STEHEN BEIDE AUF ZWEI
    AUFEINANDERFOLGENDEN ZEILEN.**

    **DIE GEMESSENE FASSUNG WEICHT VON DER ERSTEN BESCHREIBUNG AB, UND DIE ABWEICHUNG IST
    DER EIGENTLICHE INHALT DIESES EINTRAGS:** Der Satz behauptet **kein falsches Ergebnis**.
    "Meta-Pixel nicht konfiguriert" ist über **Meta** wörtlich wahr, und der Kommentar am
    Symbol sagt das ausdrücklich — er hält seit der achten Scheibe der Phase 11 fest, die
    Zeile sei "kein no-op-Hinweis mehr: der Klick sendet trotzdem, nur eben nicht an Meta".
    **WAS IRREFÜHRT, IST NICHT DER SATZ, SONDERN SEIN ORT.** Wer im Netzwerk-Tab einen
    feuernden Beacon sieht und eine Zeile darüber "nicht konfiguriert" liest, hält
    **entweder** die Warnung für einen Defekt **oder** den Beacon für wirkungslos. Die
    Zeile ist **unvollständig**, nicht falsch: Sie sagt nicht, dass anderswohin gesendet
    wird.
    **DER OWNER IST GENAU DARÜBER GESTOLPERT** (GEMESSEN 2026-09-07, Live-Lauf zur Scheibe
    "Der Schlüssel kommt aus der Spalte").

    **ABGRENZUNG ZU DEN EINTRÄGEN ÜBER MEHRDEUTIGE LOG-WORTLAUTE (48 und 42):** Jene
    betreffen **Betreiber**-Logs auf dem Server — wer sie liest, ist der Betreiber, und die
    Frage ist, ob der Wortlaut die Beobachtung von der Ursache trennt. **DIESE Zeile steht
    im AUSGELIEFERTEN KUNDENTEXT und läuft in der Konsole des BESUCHERS.** Sie hat einen
    anderen Leser, einen anderen Ort und eine andere Einbahnstrasse: Ein Code-Deploy
    erreicht bereits publizierte Seiten nicht.
    **DASS SIE BLEIBT, WAR EINE ENTSCHEIDUNG und ist es weiterhin** — sie zu entfernen war
    schon damals ausdrücklich als zweite Wirkung ausgeschlossen. **DIESER EINTRAG KIPPT SIE
    NICHT**, er hält fest, was ihre Nachbarschaft aus ihr gemacht hat.

    **WAS DIESER EINTRAG NICHT SAGT:** dass die Zeile weg soll, dass sie umformuliert werden
    soll oder dass ein zweiter Satz danebengehört. **BESTAND, nicht von jener Scheibe
    erzeugt.**
    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Arbeit an `metaTrackStatement` oder an den Warn-Wortlauten des
    erzeugten Textes.
57. **EIN BESTANDSLAUF VERGLEICHT ZWEI WEGE GEGENEINANDER UND GEHT AUCH DANN AUF, WENN
    BEIDE NICHTS TRAGEN.**
    Es geht um **D-T9** in `src/components/CodeImporter.test.tsx`, wörtlich: "das
    Publish-Artefakt traegt DENSELBEN Schluesselsatz wie das Export-Dokument".

    **DER BEFUND — GEMESSEN an der Mutationsprobe M1 der Bau-Runde (CC, 2026-09-07):** Bei
    einer Mutation, die den Dokument-Erzeuger wieder über den Einstellungs-Blob lesen liess,
    fielen **SECHZEHN** Läufe. **Vorhergesagt waren SIEBZEHN.** Der eine, der nicht fiel,
    war D-T9 — **und die Abweichung hatte eine benennbare Ursache, keinen Zufall.**

    **DIE URSACHE:** Seine tragenden Zusicherungen sind **RELATIV** — sie halten das
    Publish-Artefakt gegen das Export-Dokument. Trägt **keiner** der beiden Wege einen
    Beacon-Rumpf, liefern beide Leser `null`, und der Vergleich geht auf.
    **SEINE EIGENE VORBEDINGUNG DECKT GENAU DIESEN FALL NICHT.** Sie lautet im Kommentar
    "VORBEDINGUNG, sonst vergliche der Test zweimal 'nichts': beide Wege muessen ueberhaupt
    einen Schluesselsatz tragen" und prüft die **gezogenen** Consent-Schlüssel.
    **WAS SIE DECKT:** dass überhaupt eine Sammel-Ziehung im Text steht.
    **WAS SIE NICHT DECKT:** den **Beacon-Rumpf**. Die Ziehung entsteht bereits aus den
    Pixel-Kennungen und braucht **keinen** Tracking-Schlüssel; das Draht-Feld dagegen
    existiert nur mit ihm. **Die Vorbedingung greift also eine Ebene zu früh.**

    **ES IST KEINE DECKUNGSLÜCKE DER SCHEIBE, DIE IHN GEFUNDEN HAT** — der absolute Fall ist
    dort von einem eigenen Lauf gedeckt. **UND ES IST KEIN DEFEKT AN D-T9:** Was er zu
    prüfen behauptet — dass die zwei Auslieferwege dieselbe Quelle benutzen — prüft er, und
    er ist laut seinem eigenen Kommentar der einzige Lauf im Bestand, der die beiden Wege
    überhaupt gegeneinander hält. **Der Befund betrifft seine REICHWEITE, nicht seine
    Richtigkeit.**

    **WARUM ES ÜBERHAUPT EIN POSTEN IST:** Eine relative Zusicherung sieht wie eine doppelte
    Absicherung aus und ist gegen jeden Fehler blind, der **beide** Seiten gleich trifft.
    Wer künftig eine Mutation ansagt, die den Erzeuger als Ganzes betrifft, sollte wissen,
    dass dieser Lauf sie **nicht** meldet — sonst wird sein Grün als Entwarnung gelesen.
    Es ist dieselbe Denkfigur wie in docs/immer-beachten.md, "EINE ABWESENHEITS-BEHAUPTUNG
    WIRD AUF DREI WEISEN HOHL", zweite Weise (trivial wahr) — nur an einer
    **Gleichheits**-Behauptung statt an einer Abwesenheits-Behauptung.

    **WAS DIESER EINTRAG NICHT SAGT:** wie die Vorbedingung lauten müsste, ob D-T9 eine
    zweite bekommen soll oder ob ein eigener Lauf danebengehört. **NICHT ENTSCHIEDEN.**
    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG.**
    TRIGGER: die nächste Mutationsprobe, die den Dokument-Erzeuger als Ganzes trifft,
    spätestens die nächste Arbeit am D1-Block jener Testdatei.
58. **DAS INSTRUMENT DER PRÜFUNG HAT DEN ZUSTAND VERÄNDERT, DEN ES PRÜFEN SOLLTE — EIN
    NACHWEIS-SCHRITT HAT ZWEI UNTRACKED DATEIEN IM WURZELVERZEICHNIS HINTERLASSEN.**
    **DER TITEL NENNT DIE KLASSE UND NICHT DIE DATEIEN, und das ist der ganze Eintrag:** Die
    zwei Dateien sind gelöscht und das Muster ist ergänzt (s. unten). **Was bleibt, ist die
    Figur.**

    **DER VORGANG — GEMESSEN in dieser Sitzung (CC, 2026-09-07):** Ein `git stash`-Rundlauf,
    gefahren als **NACHWEIS-SCHRITT** — er sollte belegen, dass der Arbeitsbaum ausser den
    beabsichtigten Änderungen nichts trägt —, hat **zwei Temporärdateien** im
    Wurzelverzeichnis zurückgelassen. Sie standen als **untracked** im Status, waren
    zusammen **über ein Megabyte** gross, und **ein pauschales Stagen hätte sie
    mitgenommen**. `.gitignore` deckte sie **nicht**.

    **WAS DEN EINTRAG TRÄGT UND NICHT DIE EINZELNE DATEI IST:** Eine Invariante der Form
    "keine Datei angelegt" war **verletzt, bevor jemand hinsah — und zwar durch den Nachweis
    selbst.** Wer den Scope prüft, erzeugt dabei den Befund, den er ausschliessen will. **Der
    Prüfschritt ist damit nicht neutral gegenüber seinem Gegenstand**, und das ist keine
    Eigenheit dieses einen Kommandos.

    **DIESELBE KLASSE IST SCHON EINMAL AUFGETRETEN UND HAT DORT EINE REGEL ERZEUGT** —
    docs/immer-beachten.md, Regel "EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE
    DOKUMENTATION ABSCHNITTSWEISE GELESEN UND DIE BEFUNDE VERORTET SIND", Zusatz vom
    2026-08-20, wörtlich: "**DAS WERKZEUG LEGT BEIM ERSTEN AUFRUF UNGEFRAGT EIN VERZEICHNIS
    IM ARBEITSVERZEICHNIS AN** (BEFUND DES ERSTEN LAUFS, 2026-08-20). Es steht seit dem
    2026-08-20 in `.gitignore` — **DER GRUND GEHÖRT TROTZDEM HIERHER, damit niemand den
    Eintrag für überflüssig hält und entfernt.** Eine Invariante 'keine Datei angelegt' ist
    sonst verletzt, bevor die erste Seite gelesen ist."
    **WAS GLEICH IST:** ein Werkzeug schreibt **ungefragt** in den Arbeitsbaum · die
    Invariante fällt, **bevor** jemand hinsieht · die Antwort war **beide Male** ein
    `.gitignore`-Muster, und beide Male gehört der **Grund** in die Ablage, damit das Muster
    nicht als überflüssig gestrichen wird.
    **WAS NICHT GLEICH IST, und ohne diesen Absatz wird die Abgrenzung nachlässig gelesen:**
    Dort war das Werkzeug ein **fremdes Zusatzwerkzeug** (der Browser des Anbieter-Crawls),
    das jemand bewusst gestartet hat; **hier ist es `git` selbst**, gerufen in einem
    Kommando, dessen erklärter Zweck die **Kontrolle** war. Dort war der Nebeneffekt eine
    **Voraussetzung** der Arbeit, hier eine **Folge der Prüfung**. **Die zweite Lage ist die
    unangenehmere**: Ein Werkzeug, das man startet, hat man im Blick; ein Nachweis-Schritt
    gilt als folgenlos.

    **DIE GRENZE, UND SIE MUSS MIT: DASS DER STASH-RUNDLAUF SIE ERZEUGT HAT, IST EINE
    ABLEITUNG.** Git protokolliert **keinen Erzeuger**. Die Ableitung ruht auf drei
    Beobachtungen: **Zeitgleichheit** (beide Zeitstempel 12:54:11, 274 Millisekunden
    auseinander, also ein Vorgang), **Zweizahl** (genau zwei, wie die zwei geänderten
    Dateien) und **Dateiauswahl** (genau jene zwei).
    **GEMESSEN sind:** die Zeitstempel · die Grössen (397 526 und 650 076 Bytes) · und die
    **Inhalts-Identität mit dem committeten Stand** — beide entsprachen per Prüfsumme ihrer
    verfolgten Datei im damaligen HEAD, weshalb ihr Löschen **keinen** Verlust bedeutete.
    **NICHT GEMESSEN IST DER ERZEUGER SELBST.**

    **WAS DER EINTRAG NICHT SAGT: welche Werkzeuge sonst noch so etwas tun.** Die Frage
    lautet nie "steht es in der Aufzählung", sondern **"schreibt es in den Arbeitsbaum"** —
    dieselbe Zuschnitt-Frage wie in der Werkzeug-Regel zu den Ganz-Datei-Schreibern
    (docs/immer-beachten.md). Eine Aufzählung wäre hier eine zweite Wahrheit, die beim
    nächsten Kommando falsch ist.
    **UND ER SAGT NICHT, DASS DER NACHWEIS-SCHRITT FALSCH WAR.** Er hat belegt, was er
    belegen sollte; **der Befund betrifft seinen Preis, nicht seine Gültigkeit.**

    **WAS IN DERSELBEN RUNDE GEBAUT WORDEN IST — genau EINE Sache, damit der Eintrag nicht
    als offen gelesen wird, wo er es nicht ist:** das Muster `.merge_file_*` in `.gitignore`,
    in der Bauform des Playwright-Eintrags daneben, mit Kommentar. **Alles andere ist
    GEMELDET, NICHT GEBAUT** — insbesondere ist **kein** Prüfschritt geändert und **keine**
    Regel gehoben worden.
    **KEINE EMPFEHLUNG**, ob daraus eine Dauerregel wird und ob der Nachweis künftig anders
    zu führen ist.
    GEMELDET 2026-09-07, NICHT GEBAUT.
    PROVENIENZ: Zeitstempel, Grössen und Inhalts-Identität **GEMESSEN (CC, 2026-09-07)**;
    der Erzeuger ist eine **ABLEITUNG** aus den drei genannten Beobachtungen, **keine
    Messung**. Das Zitat aus docs/immer-beachten.md ist **GELESEN (CC, 2026-09-07)**.
    TRIGGER: der nächste Nachweis-Schritt, der ein Git-Kommando mit Zusammenführung benutzt
    — `stash`, `merge`, `rebase`, `cherry-pick` —, spätestens wenn erneut eine untracked
    Datei nach einer reinen Kontrolle im Status steht.
59. **DIE DREI KLICK-KENNUNGS-PARAMETER — DREI HÄLFTEN EINES THEMAS, UND ES IST NICHTS ZU
    BEHEBEN.**
    **WARUM SIE ZUSAMMENSTEHEN UND NICHT AN DREI ORTEN:** Wer eine davon aufschlägt, braucht
    die anderen zwei, um sie richtig zu lesen. Getrennt abgelegt erzeugen sie **drei Runden
    statt einer** — und die zweite fände die erste nicht mehr.
    **DREI QUELLEN, DREI KENNZEICHNUNGEN, und sie werden hier durchgehend getrennt:** was am
    **CODE** gemessen ist · was am **DATEITEXT DER ABLAGE** gemessen ist · und was eine
    **OWNER-ANGABE** ist. Wer sie einebnet, hält eine Lesung für eine Messung.

    **ERSTE HÄLFTE — VORRATS-EINTRAG 4 STELLT SEINE FRAGE IN DER EINZAHL, UND DIE
    VORAUSSETZUNG TRÄGT NICHT.**
    Der Vermerk vom 2026-09-02 an jenem Eintrag führt als seine Grenze, **WELCHER** der drei
    Namen getroffen hat, und nennt das ungemessen.
    **GEMESSEN AM CODE (CC, 2026-09-07):** Die Auslese-Funktion `extractGoogleClickIds`
    (src/lib/capi/google-click-ids.ts) iteriert über die Konstante der drei Namen und
    sammelt **JEDEN gefundenen** in ein Ergebnis-Objekt; **eine Vorrangregel gibt es nicht.**
    Die Nutzlast-Funktion `pickClickIds` (src/lib/capi/google-payload.ts) kopiert alle drei
    **einzeln**, und der Verwerfungs-Zweig in `buildGoogleEvent` greift **nur bei NULL**
    Kennungen.
    **ACHSE:** alle Vorkommen der drei Parameternamen sowie von `GoogleClickIds` und
    `adIdentifiers` über src/, Testdateien ausgenommen. **POSITIVKONTROLLE:** dieselbe Achse
    trifft **vierundzwanzigmal**; sie läuft nicht leer.
    **FOLGE FÜR DIE EINLIEFERUNG VOM 2026-09-07:** Die Adresse trug **zwei** Parameter
    (OWNER-ANGABE 2026-09-07, an der eigenen Landepage abgelesen), und **BEIDE sind
    gegangen**. **DIE FRAGE HAT KEINE EINZAHL-ANTWORT.**
    **WAS OFFEN BLEIBT UND AM CODE NICHT ENTSCHEIDBAR IST:** welchen der beiden der
    **ANBIETER** zur Zuordnung benutzt hat. Das Log nennt bei Erfolg keinen Namen — es nennt
    im Erfolgsfall gar nichts.
    **VORRATS-EINTRAG 4 WIRD ZITIERT UND NICHT GEÄNDERT**; sein Trigger bleibt wörtlich.
    **UND EINE PRÄZISIERUNG, OHNE DIE DIESER ABSATZ ZU VIEL BEANSPRUCHT:** Die **Hauptfrage**
    jenes Eintrags ist **nicht** "welcher hat getroffen", sondern die **SCHREIBUNG** der drei
    Namen — sein Titel sagt, sie stütze sich auf nichts Gelesenes, und sein Schlussabsatz
    hält das für **ALLE DREI** offen. **DIESE RUNDE SCHLIESST SIE NICHT.** Beantwortet ist
    die Grenze seines Vermerks, nicht die Frage seines Titels.

    **ZWEITE HÄLFTE — DIE AUSSCHLIESSLICHKEIT IST GELESEN WIDERLEGT.**
    Eine **OWNER-ANGABE 2026-09-07 (GELESEN, nicht gemessen)** besagte, der Anbieter erwarte
    **GENAU EINEN** der drei Parameter.
    **GEMESSEN AM DATEITEXT von docs/ziel-befunde.md (CC, 2026-09-07):** **DREI** gelesene
    Stellen sagen **"MINDESTENS EINEN"** — die Fünfer-Liste der Kennungen im Google-Abschnitt,
    die Feld-Aufzählung "AdIdentifiers — ZEHN Felder, **alle Optional**", und das wörtliche
    Anbieter-Zitat "Set at least one of the following: `adIdentifiers` with at least one of
    gclid, gbraid or wbraid". **KEINE sagt "genau einen".**
    **ACHSE:** die Wendungen "genau ein/nur ein … Kennung", `exactly one` und `only one of`
    über docs/ziel-befunde.md. **ERGEBNIS:** kein Treffer, der die drei Klick-Kennungen
    betrifft; **der einzige `exactly one`-Treffer gilt einem ANDEREN Feld** (den
    Kontaktdaten). **POSITIVKONTROLLE:** "mindestens ein" trifft in derselben Datei
    **siebenmal**.
    **WAS DAS NICHT HEISST, UND DER SATZ IST DER WICHTIGERE:** Dass **zwei** Kennungen
    zugleich beim Anbieter **RICHTIG** verarbeitet werden, ist damit **NICHT belegt**. Es ist
    **UNGELESEN und UNGEMESSEN**. Der Code sendet beide; **wie der Anbieter damit verfährt,
    weiss niemand.** Widerlegt ist eine Auflage, nicht bestätigt eine Unbedenklichkeit.

    **DRITTE HÄLFTE — DIE PLATTFORM-ZUORDNUNG IST UNGELESEN.**
    Die **OWNER-ANGABE 2026-09-07** ordnet die zwei Nicht-Standard-Parameter je einer
    Sitzungsart auf einem bestimmten Betriebssystem zu.
    **GEMESSEN AM DATEITEXT (CC, 2026-09-07): docs/ziel-befunde.md nennt beide NUR als
    Feldnamen, NIE mit einer Herkunfts- oder Plattform-Zuordnung.** **NICHT-TREFFER MIT
    BENANNTER REICHWEITE — ACHSE:** die Begriffe des Betriebssystems, "App-zu-Web" und
    "Web-to-App" über docs/ziel-befunde.md. **POSITIVKONTROLLE:** der Feldname `gbraid`
    trifft in derselben Datei **siebenmal**; die Achse läuft nicht leer, sie trifft nur diese
    Zuordnung nicht. **WELCHER der beiden welcher Sitzungsart gehört, ist am Repo NICHT
    ENTSCHEIDBAR.**
    **FÜR DEN CODE IST DAS FOLGENLOS:** Er sendet, was in der Adresse steht, **ohne zu
    wissen, woher es kommt**. Es ist eine **ungelesene Stelle in der Anbieter-Dokumentation
    und keine offene Frage an das Produkt.**

    **DAS ERGEBNIS DER RUNDE, UND ES STEHT AUSDRÜCKLICH DA: ES GIBT NICHTS ZU BEHEBEN.**
    Der Code führt **genau die drei Namen**, die die Ablage als zulässig nennt, und für die
    gemessene Adresse **war die richtige dabei**.
    **DER GRUND IST BEMERKENSWERT GENUG, UM DAZUSTEHEN: WEIL ES KEINE VORRANGREGEL GIBT,
    KANN DER CODE AUCH KEINE FALSCHE TREFFEN.** Ein Vorrang wäre die Stelle, an der man sich
    vertut — **sie existiert nicht. DIE ABWESENHEIT IST HIER DIE SICHERHEIT, NICHT DIE
    LÜCKE.** Wer später eine Vorrangregel einzieht, führt diese Stelle ein.

    **TRANSIT-ONLY IST EINGEHALTEN — GEMESSEN AM CODE (CC, 2026-09-07), auf ZWEI
    UNABHÄNGIGEN ACHSEN.**
    **ACHSE 1:** die drei Parameternamen sowie `GoogleClickIds` und `adIdentifiers` im
    Schnitt mit den Persistenz-Verben (`insert`, `update`, `upsert`, `persist`, Browser-
    Speicher, Cookie, Tabellenzugriff) über src/, ohne Tests. **KEIN Treffer.**
    **POSITIVKONTROLLE:** die Kennungsnamen treffen vierundzwanzigmal, die Persistenz-Verben
    dreizehnmal — **beide Achsen leben, ihr Schnitt ist leer.**
    **ACHSE 2 WAR NÖTIG, UND WARUM, GEHÖRT DAZU: ACHSE 1 HÄTTE DEN PERSIST-PFAD VERFEHLT.**
    Dort steht **keiner** der Kennungsnamen — der Persist sieht nur den Beacon-Rumpf, und die
    Kennung säse in der Adresse darin. Geprüft wurde deshalb der Schreibvorgang **selbst**:
    `persistEvent` (src/lib/analytics/persist.ts) schreibt in die Ereignis-Tabelle **fünf**
    Spalten — Projekt, Ereignistyp, Ereignis-Kennung, Beobachtungsort und Variante. **Das
    Adressfeld ist NICHT darunter.**
    **DIE KENNUNG LEBT DAMIT AUSSCHLIESSLICH IM TRANSIT:** Beacon-Rumpf → Auslese →
    Netzruf. **Nirgends abgelegt.**

    GEMELDET 2026-09-07, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zur Ausschliesslichkeit
    noch zur Plattform-Zuordnung noch zu Vorrats-Eintrag 4.
    TRIGGER: **die nächste Arbeit am Google-Adapter** (Auslese der Kennungen, Bau der
    Nutzlast, Verwerfungs-Zweig) **ODER die nächste Anbieter-Lesung am Abschnitt zu den
    Kennungen** — dort sind die zwei ungelesenen Stellen zu holen: ob mehrere Kennungen
    zugleich zulässig sind und wie sie dann behandelt werden, und welche Sitzungsart hinter
    welchem der zwei Nicht-Standard-Parameter steht.
60. **DIE UMLAUT-AUFLAGE UND DIE TITEL-ZEIGER KOLLIDIEREN — DIESMAL NUR ZUFÄLLIG NICHT.**
    **FÜNF Produktivdateien tragen die Auflage "KEINE UMLAUTE IM QUELLTEXT"** — GEMESSEN
    (CC, 2026-09-08): `src/app/api/oauth/google/refresh/route.ts`,
    `src/lib/oauth/refresh-run.ts`, `src/lib/oauth/token-refresh.ts`,
    `src/lib/secrets/oauth-payload.ts` und `src/lib/tracking/credential-state.ts`; alle fünf
    tragen null Umlaut-Zeilen, vor wie nach Schritt 3 der Teilung.
    **DIE KOLLISION:** Ein Titel-Zeiger aus einer dieser Dateien auf einen Abschnitt, dessen
    Überschrift einen Umlaut trägt, ist **entweder ein Regelbruch** — die Auflage verlangt
    ae/oe/ue/ss — **oder, nach Transliteration, ein maschinell nicht auffindbarer Anker**:
    Eine wörtliche Suche nach dem transliterierten String findet die Überschrift nicht.
    **BEIDE AUFLAGEN GELTEN, UND SIE SCHLIESSEN EINANDER AUS**, sobald eine deutsche
    Überschrift mit Umlaut aus einer dieser Dateien zitiert wird.
    **DIESMAL IST SIE NICHT EINGETRETEN, UND ZWAR AUS GLÜCK UND NICHT AUS SORGFALT**
    (GEMESSEN, CC, 2026-09-08): Jeder Titel, der in Schritt 3 in eine dieser fünf Dateien
    eingesetzt werden musste, ist **zufällig umlautfrei** — "Die Beweis-Route bleibt stehen",
    "Die Erneuerung des Zugangsdatums", "Die Klammer um die Erneuerung — Schritt 1b-1 …",
    "Die Ampel an der Ziel-Karte — Scheibe 11.2b", "Vollzogen — was hier stand und wohin es
    gegangen ist", "Warum sie zuerst kommt — und dieser Grund bindet". **Der einzige Titel mit
    Umlaut** — "Google als reguläres Ziel in der Oberfläche — Scheibe 3 …" — **landete in
    `src/lib/settings.ts`, und die trägt die Auflage nicht**; er steht dort mit Umlauten und
    ist damit auffindbar.
    **DER BESTAND IST DAMIT HEUTE SAUBER, DIE KOLLISION ABER UNVERÄNDERT DA.**
    **VERWANDT UND NICHT DASSELBE:** Hebungs-Kandidat 3 der Steuerdatei
    ("EIN TITEL-ZEIGER AUS UMLAUTFREIEM QUELLTEXT IST INHALTLICH EINDEUTIG UND ALS SUCHANKER
    UNBRAUCHBAR") beschreibt **den bereits eingetretenen Fall an einer Bestandsstelle**;
    dieser Eintrag hält fest, dass die Kollision **für jeden künftigen Titel-Zeiger** in diese
    fünf Dateien scharf ist und diesmal nur nicht ausgelöst hat.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zu umlautfrei gewählten
    Überschriften, noch zu einer Ausnahme von der Umlaut-Auflage an Zeiger-Stellen, noch zu
    einer anderen Zeigerform.
    TRIGGER: **der nächste Titel-Zeiger aus einer dieser fünf Dateien auf einen Abschnitt mit
    Umlaut in der Überschrift.**
    PROVENIENZ: Die fünf Dateien, ihre Umlaut-Freiheit und die eingesetzten Titel sind
    **GEMESSEN am Repo (CC, 2026-09-08)**. Dass die Kollision jeden künftigen Zeiger dieser
    Art trifft, ist eine **ABLEITUNG** aus den zwei Auflagen, keine Messung.
61. **45 PFAD-ZEIGER IN DER GEPFLEGTEN DOKU SIND NICHT NACHGEZOGEN.**
    **GEMESSEN (CC, 2026-09-08**, über `git ls-files`, Achse: die wörtliche Zeichenfolge
    `docs/aktiver-stand.md`**):** `docs/offene-punkte.md` 6 · `docs/roadmap.md` 7 ·
    `docs/ziel-befunde.md` 17 · `docs/plattform-befunde.md` 8 · `docs/db-stand.md` 1 ·
    `docs/immer-beachten.md` 2, die übrigen verteilt.
    **EIN TEIL VON IHNEN ZEIGT AUF ANKER, DIE MIT DEM SCHNITT VOM 2026-09-08 INS ARCHIV ODER
    IN DEN VORRAT GEWANDERT SIND** — etwa auf VERMERK 6 und VERMERK 10, auf Vorrats-Eintrag 40
    und 41, auf "Der Transport — Scheibe 4 …" und auf "Die Erneuerung des Zugangsdatums".
    **SIE SIND LESBAR FALSCH, NICHT TOT, und dieser Satz ist der Grund, warum die Vertagung
    vertretbar ist:** Jeder trifft eine EXISTIERENDE Datei, und die trägt seit dem Schnitt DREI
    REGISTER, die sagen, wo der Anker jetzt liegt. **Der Preis ist eine Suche, kein
    Nicht-Treffer.**
    **WELCHE DER 45 TATSÄCHLICH INS LEERE ZEIGEN, IST NICHT ERHOBEN.** Die Messung zählt
    Pfadnennungen, nicht Anker; ein Teil zeigt auf Abschnitte, die in der Steuerdatei
    GEBLIEBEN sind (den Rahmen, die bindenden Entscheidungen, "1b als Folgetask", die
    Hebungs-Kandidaten) und ist damit unverändert richtig. **Wer die Arbeit anfasst, misst je
    Zeiger neu — die 45 sind ein Bestand, kein Prüfumfang.**
    **BEWUSST VERTAGT (ARCHITEKT, 2026-09-08): DER BAU HAT VORRANG.** Schritt 3 der Teilung
    hat ausschliesslich die Zeiger aus `src/` und `supabase/` nachgezogen, weil dort ein
    falscher Pfad in einem Kommentarkopf beim Bauen gelesen wird; die Doku-Zeiger treffen
    Leser, die ohnehin über die Register gehen.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zur Reihenfolge noch dazu,
    ob alle 45 oder nur die tatsächlich verschobenen anzufassen sind.
    TRIGGER: **die nächste Runde, die eine dieser Dateien ohnehin öffnet** — dann geht ihr
    Anteil beiläufig mit und kostet keinen eigenen Vollzug.
    PROVENIENZ: Die Zahlen sind **GEMESSEN am Repo (CC, 2026-09-08)**. Dass ein Teil der
    Zeiger auf ausgewanderte Anker zeigt, ist an Beispielen **GEMESSEN**; die Aussage über den
    Rest ist ausdrücklich **NICHT erhoben**. Die Vertagung ist eine **ENTSCHEIDUNG**, keine
    Messung.
63. **DIE 110 ZEIGER AUF "11.2" IN DER GEPFLEGTEN DOKU SIND NICHT KLASSIFIZIERT.**
    **GEMESSEN (CC, 2026-09-08**, über `git ls-files`, Achse: die Zeichenfolge `11.2`, ohne
    `docs/roadmap.md` und ohne `docs/claude-history/`**):** `CLAUDE.md` 6 ·
    `docs/offene-punkte.md` 14 · `docs/db-stand.md` 1 · `docs/db-regeln.md` 1 ·
    `docs/plattform-befunde.md` 2 · `docs/ziel-befunde.md` 6 · `docs/aktiver-stand.md` 48 ·
    `docs/aktiver-stand-vorrat.md` 17 ·
    `docs/claude-history/phase-11.8-autorisierungsschicht.md` 15.
    **WARUM DAS SEIT DEM 2026-09-08 ZÄHLT:** An diesem Tag ist GA4 aus dem Eintrag 11.2
    herausgelöst worden (neue Zeile 11.9). **Ob einer dieser 110 Zeiger nach der Trennung GA4
    meint, ist NICHT ERHOBEN.**
    **IM PRODUKTIVCODE IST DIE LAGE GEMESSEN UND GÜNSTIG:** Dort ist die Klasse "meint
    beides" **NULL** — von 48 Stellen meinen 12 dem Text nach Google Ads, EINE nennt GA4 (und
    zwar als Abgrenzung), und der Rest nennt kein Ziel, sondern eine Scheibe (GEMESSEN, CC,
    2026-09-08). **IN DER DOKU IST GENAU DAS UNGEPRÜFT.**
    **DIE ZAHL IST EIN BESTAND UND KEIN PRÜFUMFANG:** Ein Teil der Zeiger zeigt auf
    Abschnitte, die von der Trennung gar nicht berührt sind. Wer die Arbeit anfasst, misst je
    Zeiger neu.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zur Reihenfolge noch
    dazu, ob alle 110 oder nur die tatsächlich mehrdeutigen anzufassen sind.
    TRIGGER: **die erste Arbeit an GA4** — spätestens ein Zuschnitt der Zeile 11.9 —, ODER
    die nächste Runde, die eine dieser Dateien ohnehin öffnet.
    **ABGRENZUNG ZU EINTRAG 61, damit die zwei nicht zusammengezogen werden:** Jener zählt
    Zeiger auf den PFAD `docs/aktiver-stand.md`, die nach dem Schnitt vom 2026-09-08 auf eine
    andere Datei zeigen müssten. Dieser zählt Zeiger auf die PHASENNUMMER `11.2`, die nach der
    Trennung ein anderes Ziel meinen könnten. **Zwei verschiedene Achsen, zwei verschiedene
    Schäden;** eine gemeinsame Runde ist möglich, aber keine der beiden erledigt die andere.
    PROVENIENZ: Alle Zahlen **GEMESSEN am Repo (CC, 2026-09-08)**. Dass die Trennung die
    Mehrdeutigkeit erzeugt, ist eine **ABLEITUNG** aus der Owner-Entscheidung desselben Tages,
    keine Messung.
64. **DIE ÜBERGABE-ANWEISUNG "WER EINEN BEACON PRÜFT, LIEST DEN EREIGNISNAMEN AUS DEM
    PAYLOAD" IST AUF DER LOG-ACHSE NICHT AUSFÜHRBAR.**
    **GEMESSEN am Code (CC, 2026-09-08): DER EREIGNISNAME WIRD NIRGENDS GELOGGT, UND ZWAR
    ABSICHTLICH.** Der Kommentar in `src/lib/capi/google-forward.ts` sagt den Grund an Ort
    und Stelle: "DER EREIGNIS-NAME STEHT NICHT IN DER MELDUNG. Er ist ein vom Betreiber FREI
    getippter String … also Kundendatum auf dem meistgetroffenen Pfad der Plattform.
    **Geloggt wird der GRUND, nie der WERT.**" Die Riegel-Zeile lautet deshalb "no
    destination for event" ohne den Namen. **DER PAYLOAD WIRD EBENFALLS NIE AUSGEGEBEN** —
    `JSON.stringify(payload)` geht in den Netzruf, nicht in eine Logzeile; und der
    Antwort-Rumpf wird bewusst nicht gelesen (Auflage TRANSIT-ONLY).
    **WO ER SEHR WOHL ABLESBAR IST — zwei Orte, beide KEINE Log-Achse:** in der Datenbank
    als `events.event_type` (`persistEvent`, `src/lib/analytics/persist.ts`, gekappt auf
    `EVENT_TYPE_MAX_LENGTH`), und als **Schlüssel des Nachschlags** in `resolveDestinationId`
    (`google-forward.ts`) — dort entscheidet er über die `productDestinationId`, erscheint
    aber selbst nicht in der Nutzlast.
    **WARUM DAS EIN EIGENER POSTEN IST UND KEIN HINWEIS: WER IHN IM LOG SUCHT, FINDET IHN NIE
    UND HÄLT DAS FÜR EINEN BEFUND.** Eine Anleitung, die "lies den Ereignisnamen aus dem
    Payload" sagt, schickt den Prüfenden an eine Achse, die es nicht gibt — und der
    Nicht-Treffer sieht aus wie ein Defekt am Adapter.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder dazu, ob der Name
    geloggt werden sollte (die Auflage spricht dagegen), noch dazu, welche Achse
    stattdessen zu nehmen ist.
    TRIGGER: **die nächste Live-Test-Anleitung für ein Google-Ereignis** — spätestens die,
    die den Ereignisnamen als Prüfschritt führt.
    PROVENIENZ: Alle vier Fundstellen **GEMESSEN am Code (CC, 2026-09-08)**. Dass ein
    Prüfender den Nicht-Treffer als Befund liest, ist eine **ABLEITUNG**, keine Beobachtung.
65. **DIE ZUSTÄNDE HINTER `[capi/resolve] secret unusable` SIND MEHR ALS DREI.**
    **VERMERK ZU VORRATS-EINTRAG 42, KEINE KORREKTUR DORT.** Jener Eintrag zählt in seinem
    dritten Vermerk **DREI** Ursachen — `access_token_expired`, `refresh_token_expired` und
    den Bestätigungs-Beacon, der die Zeile auch im Erfolgsfall erzeugt.
    **AM CODE ENTSTEHT SIE AN DREI FUNDSTELLEN, UND ZWEI DAVON FÜHRT ER NICHT** (GEMESSEN,
    `src/lib/capi/token.ts`, CC, 2026-09-08): zusätzlich bei `reason: decrypt_${kind}` und
    bei `reason: parse_${kind}`. Beide `reason`-Werte sind ihrerseits mehrwertig — sie tragen
    das `kind` einer Union.
    **DER EINTRAG 42 IST NICHT FALSCH, UND DAS STEHT ZUERST:** Er zählt die Zustände SEINER
    Achse — die der Uhren-Prüfung, um die es ihm geht. Die zwei anderen liegen davor im
    Kontrollfluss und gehören einer anderen Frage.
    **DIE FOLGE GEHT IN DIESELBE RICHTUNG WIE JENER EINTRAG, NICHT GEGEN IHN: DIE ZEILE IST
    ALS LIVE-TEST-ACHSE NUR NOCH UNTAUGLICHER.** Eintrag 42 sagt "Wer mit ihr misst, misst
    die Anwesenheit eines Wortes, nicht mehr die eines Defekts" — bei fünf statt drei
    Ursachen gilt das verschärft.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder zur Aufspaltung der
    Zeile noch zu einem anderen Wortlaut je Zweig.
    TRIGGER: **die nächste Runde, die Vorrats-Eintrag 42 ohnehin öffnet**, ODER die erste
    Live-Anleitung, die diese Zeile als Achse vorsieht.
    PROVENIENZ: Die drei Fundstellen und ihre `reason`-Werte **GEMESSEN am Code (CC,
    2026-09-08)**. Dass Eintrag 42 auf seiner Achse richtig zählt, ist eine **ABLEITUNG** aus
    dem Vergleich der beiden Achsen, keine zweite Messung.
66. **EINE PRÜFVORSCHRIFT, DIE EINE ACHSE BENENNT, DECKT NUR DIESE ACHSE — UND MELDET DAS
    NIE.**
    **DER BELEG (GEMESSEN, CC, 2026-09-08):** Die Bedingung, unter der die Standdatei der
    Phase 11.8 ins Archiv wandern sollte, lautete in ihrem eigenen Kopf: "Sobald **kein
    Produktivcode** diesen Pfad mehr zitiert … Das ist prüfbar — **eine Suche über `src/`
    nach dem Dateinamen**." Gemessen zitieren **SIEBEN** Dateien den Pfad, nicht sechs; die
    siebte ist `supabase/checks/db-stand.sql` und liegt **ausserhalb der benannten Achse**.
    **DIE SECHS SIND FÜR IHRE ACHSE VOLLSTÄNDIG — DIE ACHSE IST ENGER ALS IHR GEGENSTAND.**
    "Produktivcode" ist mehr als `src/`.
    **WARUM DAS TEUER IST:** Wäre der Umzug über die Bedingung ausgelöst worden statt über
    die widerlegte Prämisse, hätte die Prüfung "keine Treffer unter `src/`" gemeldet — und
    **der siebte Zeiger wäre still tot geblieben.** Eine Vorschrift, die ihre Achse
    benennt, ist ehrlich; sie kann aber nicht sagen, dass ihr Gegenstand grösser ist als
    ihre Achse. **Die Ehrlichkeit der Angabe verhindert den Fehler nicht, sie
    dokumentiert ihn nur im Nachhinein.**
    **ABGRENZUNG ZU "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL"**
    (docs/immer-beachten.md): Dort ist der **WÄCHTER** hohl — sein Gegenstand ist weg, er
    ist trivial wahr, oder er trennt Blockade nicht von Absturz. **Hier ist der Wächter in
    Ordnung und seine ACHSE zu eng.** Er misst korrekt, was er zu messen behauptet;
    falsch ist nur die Erwartung, dass das die ganze Frage beantwortet.
    **ABGRENZUNG ZU "EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM
    GEGENSTAND"** (ebenda): Dort erzeugt das **INSTRUMENT** einen Nicht-Treffer, den der
    Gegenstand nicht hergibt, und die Antwort ist ein Werkzeug-Wechsel. **Hier ist das
    Instrument tadellos** — `grep` über `src/` findet, was unter `src/` liegt. Falsch ist
    der ZUSCHNITT der Suche, nicht ihr Werkzeug.
    GEMELDET 2026-09-08, NICHT GEBAUT. **KEINE EMPFEHLUNG** — weder dazu, ob daraus eine
    Regel wird, noch dazu, ob Prüfvorschriften künftig ihre Achse gegen ihren Gegenstand
    begründen müssen.
    TRIGGER: **die nächste Prüfvorschrift, die eine Achse benennt** — also die nächste
    Bedingung der Form "das ist prüfbar: eine Suche über <Ort>".
    PROVENIENZ: Der Zähl-Unterschied sechs gegen sieben und der Ort der siebten Datei sind
    **GEMESSEN am Repo (CC, 2026-09-08)**, Achse: `git ls-files` über alle verfolgten
    Dateien. Dass der Zeiger bei einer Auslösung über die Bedingung still tot geblieben
    wäre, ist eine **ABLEITUNG** aus dem Wortlaut der Bedingung, keine zweite Messung.

**HEBUNGS-KANDIDAT 4 AUS docs/aktiver-stand.md, HIERHER GEHOBEN — ER TRÄGT KEINE NUMMER
DIESES VORRATS UND BEHÄLT DIE SEINE.**
**WARUM ER HIER STEHT UND NICHT IN docs/immer-beachten.md:** Er ist **keine Regel**,
sondern eine **Verortungs-Aufgabe** — er sagt nicht, was zu tun IST, sondern was noch
nicht abgelegt ist. Nach docs/immer-beachten.md gehoben wäre er eine Regel, die nichts
regelt. Er trägt weder eine Bedingung seines Entfallens noch einen strukturellen Grund,
warum keine formulierbar wäre; damit fällt er unter keine der zwei Klassen, nach denen
die übrigen neun Kandidaten sortiert worden sind.
**ER STEHT UNMITTELBAR NACH VORRATS-EINTRAG 12, UND DAS IST ABSICHT: BEIDE TRAGEN
DENSELBEN TRIGGER UND SIND ZUSAMMEN ZU ERLEDIGEN** — "die nächste Runde, die
docs/ziel-befunde.md ohnehin öffnet". Der Kandidat sagt das selbst ("dieselbe Runde wie
Vorrats-Eintrag 12 dieser Datei, und beides gehört zusammen erledigt"); getrennt abgelegt
fände die nächste Runde nur eine der beiden Hälften.
**SEINE EIGENE DRINGLICHKEIT IST MIT DIESER RUNDE EINGETRETEN:** Er sagt, "solange sie nur
in dieser Standdatei steht, verschwindet sie mit der Archivierung der Phase aus dem
Befund-Bestand" — genau das tut Schritt 2 des Phasenendes. Dass er hier liegt, ist die
Antwort darauf.

4. **DIE LIVE-BESTÄTIGUNG AUS VERMERK 6, ABLEITUNG 1, GEHÖRT SACHLICH NACH
   docs/ziel-befunde.md, TEIL (bx) — DORT IST SIE NOCH NICHT VERORTET** (angetreten
   2026-08-31). Teil (bx) hält fest, dass `refresh_token_expires_in` beim CODE-TAUSCH kam,
   und lässt die Erneuerung offen; VERMERK 6, Ableitung 1 schliesst genau diese Lücke am
   eigenen Produktivpfad. Solange sie nur in dieser Standdatei steht, verschwindet sie mit
   der Archivierung der Phase aus dem Befund-Bestand. NICHT IN DIESER RUNDE VOLLZOGEN:
   docs/ziel-befunde.md bleibt unberührt. TRIGGER: die nächste Runde, die
   docs/ziel-befunde.md ohnehin öffnet — dieselbe Runde wie Vorrats-Eintrag 12 dieser
   Datei, und beides gehört zusammen erledigt. KEINE EMPFEHLUNG. PROVENIENZ: FOLGE aus
   dem Vergleich der beiden Fundstellen (CC, 2026-08-31), keine Messung.

67. **DIE ZEIGER AUF DIE ZWEI GELÖSCHTEN DATEIEN DER PHASE 11.2 SIND NICHT NACHGEZOGEN —
    145 IN DER DOKU, EINER IN EINER MIGRATION.**
    **DER BEFUND — GEMESSEN am Repo (CC, 2026-09-08, nach dem `git rm`; Achse:
    `git ls-files` über alle verfolgten Dateien, `grep -o` je Pfad, also Vorkommen und
    nicht Zeilen):** `docs/aktiver-stand.md` und `docs/aktiver-stand-vorrat.md` sind am
    2026-09-08 gelöscht worden. **Die Zeiger auf sie sind es nicht.**
    · **PRODUKTIVCODE UND TESTS: 0 offen.** Alle zehn sind in derselben Runde nachgezogen
      worden (acht in `src/lib/`, zwei in `src/lib/capi/google-click-ids.test.ts`) — reine
      Adresse, kein Kommentar umformuliert. **Ein toter Pfad im Code ist teurer als einer in
      der Doku**, deshalb die Ausnahme.
    · **EINE MIGRATION: 1, UND SIE WIRD NIE NACHGEZOGEN.**
      `supabase/migrations/0027_project_secrets_version.sql` zeigt auf
      `docs/aktiver-stand.md`, Abschnitt "Der Riegel gegen die verlorene Schreibung". **DER
      ANKER ÜBERLEBT** — der Abschnitt liegt als Zuschnitt in
      `docs/claude-history/phase-11.2-google.md`; **NUR DER PFAD STIRBT.** Die Regel
      "ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN, auch nicht ein
      Kommentar" gewinnt gegen jeden Aufräum-Wunsch. **DIESER EINE PUNKT IST KEIN
      VORRAT-POSTEN, SONDERN EIN DAUERZUSTAND** und steht hier nur, damit ihn niemand als
      vergessen zählt.
    · **GEPFLEGTE DOKU: 71.** `docs/ziel-befunde.md` 20 · `docs/roadmap.md` 12 ·
      `CLAUDE.md` 10 · `docs/plattform-befunde.md` 8 · `docs/offene-punkte.md` 22 ·
      `docs/arbeitsweise.md` 6 · `docs/immer-beachten.md` 3 · `docs/db-stand.md` 1.
    · **ARCHIV: 74.** `docs/claude-history/phase-11.2-google.md` 32 ·
      `docs/claude-history/backlog-polish.md` 9 ·
      `docs/claude-history/phase-11.8-autorisierungsschicht.md` 7 ·
      `phase-11.1-linkedin.md` 2 · `phase-11-multi-tracking-rohfassung.md` 1 ·
      `phase-11-multi-tracking-aktiver-stand.md` 1 · `phase-10-workspace.md` 1.
    **WARUM SIE NICHT IN EINEM ZUG NACHGEZOGEN WURDEN:** 145 Doku-Zeiger in EINER Runde
    hätten den Diff der Archivierung so gross gemacht, dass die Löschung selbst darin nicht
    mehr prüfbar gewesen wäre. **ZWEI ACHSEN GLEICHZEITIG ZU BEWEGEN** ist genau der
    Fehler, den der Teilungs-Zuschnitt für die Zuschnitte ausgeschlossen hat.
    **WAS EIN TOTER DOKU-ZEIGER KOSTET, ehrlich und nicht dramatisiert:** Er zeigt auf einen
    Pfad, den es nicht mehr gibt. Der ZIEL-TEXT ist in fast allen Fällen weiterhin da — die
    Vorrats-Einträge in `docs/offene-punkte.md` bzw. `docs/claude-history/backlog-polish.md`,
    die Zuschnitte und Vermerke im Archiv —, und der Abschluss-Block im Kopf des Archivs
    nennt den Commit, unter dem beide gelöschten Dateien vollständig nachzulesen sind.
    **DER SCHADEN IST EIN SUCHWEG, KEIN VERLUST.**
    **KEINE EMPFEHLUNG**, in welcher Reihenfolge nachgezogen wird, ob überhaupt alle
    nachgezogen werden, oder ob ein Zeiger auf eine gelöschte Datei in einem ARCHIV
    (74 der 145) als Zeitdokument stehen bleiben darf — **letzteres ist die eigentlich
    offene Frage und ausdrücklich nicht entschieden.**
    GEMELDET 2026-09-08, NICHT GEBAUT.
    TRIGGER: **die nächste Runde, die eine dieser Dateien ohnehin öffnet** — dann geht ihr
    Anteil beiläufig mit, und die Zahl schrumpft ohne eine eigene Runde.
    PROVENIENZ: Die Zahlen sind **GEMESSEN am Repo (CC, 2026-09-08)** nach dem `git rm` und
    nach dem Nachziehen der Produktivcode-Zeiger; sie zählen VORKOMMEN, nicht Zeilen. Dass
    ein Zeiger im Archiv als Zeitdokument gelten könnte, ist eine **FRAGE** und keine
    Feststellung.

## Aus Phase 11.3 gehoben (2026-09-11) — Vorrat und drei Hebungs-Kandidaten der Standdatei

**WOHER SIE KOMMEN:** Aus der Standdatei der Phase 11.3 (Tracking-Testmodus-Modul), beim
Phasenende am 2026-09-11. Hier stehen die Vorrats-Einträge (1), (2), (5), (11), (16),
(17), (19), (20), (24), (27) und (29) unter ihren Ursprungs-Nummern, dahinter drei
Hebungs-Kandidaten. **Die übrigen offenen Vorrats-Einträge sind als offene Punkte
gehoben:** (3), (10), (15) und (28) nach docs/offene-punkte.md, (21) dort als Ursache (5)
des Postens "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN". (9) und (14) sind
gestrichen; der Beleg steht am Eintrag in der Standdatei.
**EIN NUMMERN-ZEIGER OHNE PFAD IN DIESEN EINTRÄGEN MEINT DIE STANDDATEI DER PHASE 11.3** —
"VERMERK 2", "Vorrat (21)", "Entscheidung (3)", "diese Scheibe", "diese Phase". Sie wird am
Phasenende archiviert; dieser Satz löst die Zeiger auf, umgeschrieben sind sie NICHT.
**DER TEXT DER VORRATS-EINTRÄGE IST ZEICHENGLEICH ÜBERNOMMEN.** Hinzu kommt je ein als
solcher gekennzeichneter Zusatz BEI DER HEBUNG an (2) und an (24).

**(1) OB TIKTOK TEST-MARKIERTE EREIGNISSE MITZÄHLT WIE META — UNGELESEN UND UNGEMESSEN.**
Die Doku der Events API 2.0 sagt zu Berichterstattung und Optimierung markierter Ereignisse
NICHTS. Das ist ein Schweigen mit benannter Achse und keine Auslassung: gesucht wurde
`optimi`, `report`, `discard`, `exclud`, `drop` über den gerenderten Rumpf von sechs Seiten
(Fundstellen in docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teil (d)).
**WEDER BESTÄTIGT NOCH WIDERLEGT** — Metas Aussage auf tiktok zu übertragen wäre eine
Annahme über ein fremdes System.
TRIGGER: die Scheibe, die den tiktok-Zweig des Riegels zuschneidet — spätestens der erste
Live-Nachweis gegen tiktok. PROVENIENZ: GELESEN 2026-09-08.

**(2) WAS METAS AUFLAGE "REMOVE IT IN PRODUCTION" BEWIRKT, WENN SIE MISSACHTET WIRD — DIE
DOKU NENNT KEINE FOLGE.** Meta verlangt, das Feld vor dem Produktiv-Rumpf zu entfernen, und
sagt im selben Abschnitt, die Ereignisse würden ohnehin nicht verworfen und flössen in
Targeting und Messung. **Was das Entfernen dann bewirkt, steht nirgends.** Solange das
offen ist, lässt sich nicht sagen, ob ein hängengebliebener Testmodus beim Anbieter
irgendeinen Schaden anrichtet — die Frist dieser Phase ist mit unserem eigenen Grund
begründet und nicht mit diesem.
TRIGGER: die erste Messung gegen die Meta-Schnittstelle, die mit und ohne das Feld
vergleicht. PROVENIENZ: GELESEN 2026-09-08.
ZUSATZ BEI DER HEBUNG (2026-09-11): Der Gegenstand ist unberührt — die Doku nennt weiterhin
keine Folge. Der deployment-weite Fall, `META_TEST_EVENT_CODE` in einer Vercel-Umgebung und
damit an jeder Meta-Nutzlast ohne Projekt-Code, ist entfallen: Die Variable ist dort
gelöscht (OWNER-ANGABE, 2026-09-11, keine Messung). Der Code liest sie weiterhin; das führt
der offene Punkt "DER CODE TRÄGT EINEN DEPLOYMENT-WEITEN TESTMODUS-HEBEL, DEN IN VERCEL
HEUTE NIEMAND SETZT UND DEN NIEMAND BEOBACHTET" (docs/offene-punkte.md).

**(5) LÄUFT DIE FRIST ZWISCHEN DEM SERVER-BEACON UND DEM BESTÄTIGUNGS-BEACON AB, ENTSTEHT
EINE `browser`-ZEILE OHNE `server`-GEGENSTÜCK.** Das ist derselbe Schaden, den Invariante
I1 benennt — nur zeitlich statt strukturell verursacht: Es sind ZWEI Anfragen mit zwei
Auflösungen, und der Riegel urteilt in jeder neu. Das Fenster ist Sekunden breit, die
Frist Stunden; die Adblocker-Verlustrate würde den Lauf dann als Verlust zählen.
TRIGGER: die erste Runde, die Zustand über zwei Anfragen hinweg führt. PROVENIENZ:
ABLEITUNG aus dem gebauten Kontrollfluss (CC, 2026-09-09), **keine Messung** — der Fall
ist nicht herbeigeführt worden.

**(11) EIN ZIEL MIT TESTZUSTAND, ABER UNBRAUCHBAREM GEHEIMNIS, VERLIERT DAS EREIGNIS AUF
BEIDEN SEITEN.** Der Riegel feuert (der Testzustand ist gültig), das Ereignis verschwindet
aus `events` — **und der Anbieter bekommt nichts, weil gar nicht gesendet wird.** Das ist
derselbe Schaden, den der CHECK für "Frist ohne Code" ausschliesst, nur durch eine andere
Tür: Riegel ohne Gegenwert. Der Fall ist im Test festgehalten (TM4e) und im Code bewusst so
angeordnet — der Testzustand wird VOR dem Ausstieg für unbrauchbare Zeilen eingesammelt.
TRIGGER: der Schalter in 11.3b — er darf nur an Zielen erscheinen, die tatsächlich senden
können. PROVENIENZ: GEMESSEN am gebauten Code (CC, 2026-09-09, Lauf TM4e).

**NICHT GESTRICHEN — UND DAS IST EIN BEFUND, KEINE FORMALIE (GEGENGEPRÜFT AM BESTAND,
CC, 2026-09-09).** Der Trigger ist abgearbeitet, SOWEIT ER ABARBEITBAR WAR: Der Schalter
erscheint nur an Zielen mit Testmodus, mit Kennung und mit Geheimnis-Zeile. **DER
EINTRAG SELBST BLEIBT TROTZDEM WAHR, weil "senden können" für ein Klartext-Ziel GAR NICHT
BEOBACHTBAR IST.** Der Leser sieht, DASS eine Zeile da ist — ob das Zugangsdatum beim
Anbieter noch gilt, weiss allein der Anbieter.

**DER REALE FALL, an dem das beisst:** ein widerrufenes Meta-Zugangsdatum. Die Karte
zeigt "Zugangsdaten hinterlegt", der Schalter steht da, der Kunde startet den Testmodus —
**der Riegel feuert, die `events`-Zeile entfällt, und der Forward stirbt bei Meta mit
`Bad signature`.** Das Ereignis ist auf BEIDEN Seiten weg, also genau der Schaden, den
dieser Eintrag beschreibt. Der Fehlzustand ist im Projekt schon einmal live aufgetreten
und blieb damals lautlos (s. die Regel "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR").

**WAS DAS FÜR DIE STREICHUNG HEISST:** Sie wäre nur zu haben, wenn die Oberfläche eine
Aussage über die GÜLTIGKEIT eines Klartext-Geheimnisses treffen könnte. Das kann sie
nicht, und ein Ratewert wäre schlimmer als keiner.
NEUER TRIGGER: ein Rückkanal, der einen abgelehnten Forward sichtbar macht — dasselbe
Stück, das der Phase 11.4 fehlt. **VERWANDT, ABER ENGER: Eintrag (21)**, der allein den
code-nahen Sonderfall des leeren Klartext-Geheimnisses führt.

**(16) DIE OWNERSHIP-ACHSE IST LIVE NICHT PRÜFBAR — ES FEHLT EIN WERKZEUGSTAND, NICHT EIN
BAUTEIL.** Die Oberfläche BIETET DEN ANGRIFF GAR NICHT AN: Ein zweites Konto sieht das
fremde Projekt nicht, es gibt kein Feld für eine fremde Projekt-Kennung und keinen Weg,
per Klick eine Aktion mit fremdem Ziel auszulösen. Der Angriff, gegen den das Gate
schützt, ist eine **gebastelte Anfrage**, kein Klick. **Die Achse trägt heute allein der
Unit-Wächter IDOR 2** — er belegt, dass der Riegel im CODE greift, nicht dass er im
BETRIEB greift.
TRIGGER: der erste Werkzeugstand, der eine gebastelte Anfrage gegen eine Server-Action
erlaubt. PROVENIENZ: FESTGESTELLT beim Live-Test (Stefan/CC, 2026-09-09); s. VERMERK 2,
Abschnitt zur nicht gefahrenen Achse.

**(17) `credential-state.ts` BESCHREIBT EINE ARBEITSTEILUNG, DIE FÜR DEN TESTZUSTAND NICHT
GILT.** Ihr Kopf sagt: "die Aktion klassifiziert die Zeile, diese Datei deutet die Uhr".
Das umgezogene Prädikat `activeTestCodeFromRow` nimmt eine **ROHE Zeile** entgegen und ist
dort der erste Leser dieser Art. **Bewusst so belassen, weil der Umzug byte-identisch sein
musste** — ein umgeschriebener Ausdruck wäre ein Eingriff in einen live bewiesenen
Resolver gewesen. Der Kopf trägt einen NACHGEZOGEN-Absatz, der es benennt.
TRIGGER: die nächste Runde, die diese Datei um eine Ableitung erweitert. PROVENIENZ:
GEMESSEN am Repo (CC, 2026-09-09).

**(19) DREI LESER, DREI OWNERSHIP-GATES, DREI RUNDEN IM SELBEN LADE-EFFEKT.**
`listConfiguredTargets`, `listTargetCredentialStates` und `listTestModeStates` laufen
gebündelt und prüfen jeder für sich dasselbe. **Das folgt heute der Hausform** und ist
kein Versehen: Die erste trägt einen Wächter auf ihrer Spaltenliste, die zweite ist auf
Uhr 2 zugeschnitten. Ein geteiltes Gate wäre ein eigener Zuschnitt — und (15) sagt, warum
es keinen gibt.
TRIGGER: der vierte Leser. PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-09).

**(20) DER PLATZHALTER DES TESTCODE-FELDES IST GRAU AUF GRAU UND KAUM ZU LESEN.** Für den
Betreiber tragbar, **für einen Kunden nicht**. Es ist eine Darstellungs-Achse und keine
Logik-Achse: Die Testumgebung wertet kein CSS aus, kein Lauf kann das fangen.
TRIGGER: das UI-Redesign — und früher, wenn ein Kunde die Karte sieht. PROVENIENZ:
GEMELDET von Stefan an der Live-Oberfläche, 2026-09-09.

**(24) TIKTOKS TESTCODE HÄLT NACH OWNER-ANGABE MINDESTENS EINEN TAG.** Das **entlastet die
60-Minuten-Frist für TikTok**: Die Frist ist dann deutlich kürzer als das
Wechselintervall und kann keinen brauchbaren Zustand abschneiden — dieselbe Ungleichung,
die die Frist für Meta trägt.
**WAS ES NICHT TUT:** Es beantwortet Vorrat (14) nicht. Dort steht die Frage, ob TikToks
Code DAUERHAFT ablegbar ist; "mindestens einen Tag" ist eine Untergrenze und keine
Aussage über Beständigkeit. **Und es widerspricht dem Repo-Befund "wechselt pro Sitzung"
nicht, sondern lässt ihn offen** — eine Sitzung kann länger als einen Tag dauern.
TRIGGER: die Scheibe, die den tiktok-Zweig zuschneidet — dieselbe wie bei (14), und beide
werden zusammen gelesen. PROVENIENZ: GEMELDET von Stefan, 2026-09-09, **keine Messung**.
ZUSATZ BEI DER HEBUNG (2026-09-11): Sein Lese-Partner, Vorrat (14), ist gestrichen — die
Oberfläche verlangt den Testcode bei jedem Start und jeder Verlängerung, eine dauerhafte
Ablage gibt es nicht. Die Anbieter-Frage, ob der Code je Sitzung wechselt, steht in
docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teile (e) und (f).

**(27) DAS TESTANFRAGEN-LIMIT BINDET PHASE 11.4, NICHT DIESE.**
Pinterest deckelt Testanfragen eigens (docs/ziel-befunde.md, Abschnitt "Pinterest
(Conversions API)", Teil (e): "Test requests have a rate limit of 10 per app per second")
und rät in der Oberfläche von hohen Testmengen ab.
**FÜR HANDLÄUFE IST DAS UNERHEBLICH** — ein Mensch, der einen Testklick auslöst, kommt
diesem Deckel nicht nahe. **EIN TESTKNOPF, DER JE KUNDE FEUERT, LÄUFT DAGEGEN GEGEN EIN
APP-WEITES LIMIT**: Der Deckel gilt **je App**, nicht je Werbekonto und nicht je Kunde —
die Kunden teilen ihn sich also, und ein einzelner kann ihn für alle ausschöpfen.
**DER EINTRAG STEHT HIER UND NICHT BEI 11.4**, weil er in dieser Phase gemessen worden ist;
sein Trigger zeigt aber dorthin.
TRIGGER: der Zuschnitt der Phase 11.4.
PROVENIENZ: GELESEN 2026-08-20 (das Limit, Teil (e) der Befund-Datei); die Oberflächen-
Empfehlung ist GELESEN an der Anbieter-Oberfläche (Stefan, 2026-09-10). Die Folge für einen
Testknopf ist eine ABLEITUNG, **keine Messung** — es ist kein Lauf gegen den Deckel
gefahren worden.

**(29) SECHS KOMMENTARE UNTER `src/` NENNEN EINEN CONSTRAINT, DEN ES NICHT MEHR GIBT —
IHRE AUSSAGE GILT, IHR NAME IST TOT.** Migration 0029 hat
`project_secrets_test_mode_paar` durch `project_secrets_test_mode_je_ziel` ersetzt
(VERMERK 4). Sechs Kommentarstellen in VIER Dateien führen den alten Namen weiter:
`startTestMode` und `stopTestMode` (`src/app/projects/actions.ts`, je eine Stelle im
Funktionskopf), zwei Läufe in `src/app/projects/actions.testmode.test.ts`, ein Lauf in
`src/components/TargetCard.test.tsx` und der Erklärtext an der Ziel-Karte
(`src/components/TargetCard.tsx`).
**WAS SIE SAGEN, BLEIBT FÜR `meta` UND `tiktok` RICHTIG:** "beide oder keine" gilt dort
unverändert — der neue CHECK urteilt für diese zwei Ziele wortgleich wie der alte. **NUR
DER NAME ZEIGT INS LEERE.** Wer ihn im Katalog nachschlägt, findet nichts und hält den
Kommentar für überholt, obwohl seine Aussage trägt.
**WARUM DAS NICHT SCHLIMMER IST, ALS ES KLINGT, UND WARUM ES TROTZDEM HIERHER GEHÖRT:** Es
sind Kommentare, kein Verhalten; nichts wird davon rot, und nichts läuft falsch. **Teuer
wird es erst an der Ziel-Karte** (`TargetCard.tsx`), wo der Text dem Betreiber erklärt,
warum es keinen An/Aus-Schalter gibt — und die Erklärung ab 11.3e für `pinterest` eine
ANDERE ist, weil dort gerade kein Code abgelegt werden darf.
TRIGGER: die nächste Runde, die eine dieser Dateien ohnehin öffnet — praktisch Scheibe
11.3e, die `TARGETS_WITH_TEST_MODE` und die Ziel-Karte anfasst.
**NACHGEZOGEN AM 2026-09-10:** An beiden Stellen stand "11.3d". **EIN TRIGGER IST DIE
HANDLUNGS-BINDUNG SCHLECHTHIN** — er sagt, WANN der Eintrag fällig wird, und ein Trigger
auf die falsche Scheibe feuert zu früh und ins Leere. Zielmenge und Ziel-Karte sind seit
der Teilung vom 2026-09-10 **11.3e**.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10), Achse: der alte Constraint-Name,
case-insensitiv, Suchraum `src/`, alle Dateitypen, Testdateien eingeschlossen — sechs
Treffer in vier Dateien, mit Negativkontrolle (0) und Gegenprobe (der NEUE Name kommt
unter `src/` NICHT vor).

**ZUSATZ 2026-09-10 — DIE SECHS ZERFALLEN IN ZWEI KLASSEN, UND NUR VIER GEHÖREN NOCH
HIERHER.** Der Text darüber bleibt wörtlich stehen; der Eintrag wird NICHT gestrichen.
**VIER STELLEN TRAGEN NUR EINEN TOTEN NAMEN** — ihre Aussage gilt für `meta` und `tiktok`
unverändert: `endTestMode` (`src/app/projects/actions.ts`), zwei Läufe in
`src/app/projects/actions.testmode.test.ts` und einer in
`src/components/TargetCard.test.tsx`. **Sie bleiben der Gegenstand dieses Eintrags.**
**ZWEI STELLEN TRAGEN EINE AUSSAGE, DIE AB 11.3e SACHLICH FALSCH WIRD**, und sie sind
damit **SCHEIBENARBEIT und keine Aufräumarbeit**: der Kopf von `startTestMode`
(`src/app/projects/actions.ts`) und der sichtbare Erklärtext an der Ziel-Karte
(`src/components/TargetCard.tsx`). Beide sagen, ein Zustand ohne Code sei unmöglich — für
`pinterest` ist genau das ab 11.3e der Normalfall. **Sie stehen unter "Was beim Zuschnitt
von 11.3d vorliegen muss", Teil (a), und gehören in die Scheibe 11.3e, nicht in eine
Aufräumrunde.**
**NACHGEZOGEN AM 2026-09-10:** Hier stand zweimal "ab 11.3d" und "gehören in die Scheibe".
Beides ist **handlungsbindend** — es sagt, welche Scheibe die zwei Stellen mitnimmt. Seit
der Teilung desselben Tages ist das **11.3e**. **Der Titel des Abschnitts bleibt wörtlich
zitiert**, weil er nicht umbenannt worden ist; **verschoben ist die SCHEIBE, nicht der
ABLAGEORT.**
PROVENIENZ: die Einteilung ist eine ABLEITUNG aus Entscheidung (14) und den am 2026-09-10
gemessenen Fundstellen; die Fundstellen selbst sind GEMESSEN am Repo (CC, 2026-09-10).

**ZUSATZ 2026-09-10 — ZWEI ANGABEN DIESES EINTRAGS SIND ÜBERHOLT, DER EINTRAG BLEIBT.** Der
Text darüber bleibt wörtlich stehen und wird nicht gestrichen; was folgt, tritt daneben.
**DIE ZWEI STELLEN:** "**Teuer wird es erst an der Ziel-Karte**, wo der Text **dem
Betreiber erklärt**, warum es keinen An/Aus-Schalter gibt" (im Text oben) und "der
**sichtbare** Erklärtext an der Ziel-Karte" (im Zusatz darüber). **Beide unterstellen, der
Erklärtext werde AUSGELIEFERT.**
**GEMESSEN am Repo (CC, 2026-09-10), Achse `schalter|an/aus`, case-insensitiv, über
`src/components/TargetCard.tsx`:** FÜNF Treffer, **KEINER im gerenderten JSX**. Der Text
steht in einem **JSX-KOMMENTAR** und wird nicht ausgeliefert. Gegenprobe: kein Lauf in
`TargetCard.test.tsx` erwartet ihn im gerenderten Text.
**ES SIND ZWEI KOMMENTARE, KEIN KUNDENTEXT** — und damit fällt auch die Einstufung "die
teuerste der sechs Stellen".
**WAS DAVON UNBERÜHRT BLEIBT UND DER GRUND IST, WARUM DER EINTRAG NICHT SCHRUMPFT:** Die
Einteilung in VIER Aufräum-Stellen und ZWEI Scheibenarbeit-Stellen **stimmt unverändert**
— nur ihre Begründung wechselt. **Nicht die Sichtbarkeit trennt sie, sondern die AUSSAGE:**
Die vier tragen einen toten NAMEN, diese zwei eine falsche AUSSAGE ("ein Zustand ohne Code
ist unmöglich"), und die wird mit 11.3e für `pinterest` zum Normalfall.
**WARUM DIESER SATZ HIER STEHT:** Dieselbe Richtigstellung ist am 2026-09-10 bereits an
**zwei** anderen Stellen vollzogen worden — im Abschnitt 11.3e und in "Was beim Zuschnitt
von 11.3d vorliegen muss", Teil (a). **Dieser Eintrag war die dritte und letzte.** Wer ihn
öffnet, ohne die zwei anderen zu lesen, hielte den Erklärtext weiterhin für Kundentext.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10), mit Gegenprobe.

**ZUSATZ 2026-09-10 — DIE ZWEI SCHEIBENARBEIT-STELLEN SIND ERLEDIGT, DER EINTRAG BLEIBT
OFFEN. Der Text darüber bleibt wörtlich stehen.**
**DER BELEG:** Commit `9422920` (Scheibe 11.3e, VERMERK 6). Beide Stellen — der Kopf von
`startTestMode` (`src/app/projects/actions.ts`) und der JSX-Kommentar am Testmodus-Block
(`src/components/TargetCard.tsx`) — tragen seither einen NACHGEZOGEN-Block, der (1) den
neuen Namen `project_secrets_test_mode_je_ziel` nennt und (2) die falsche Aussage
richtigstellt: "ein Zustand ohne Code ist unmöglich" gilt **nur noch für Ziele MIT
Code-Pflicht**, und für `meta` und `tiktok` bleibt "beide oder keine" **wortgleich**
bestehen. **DIE ALTEN ABSÄTZE SIND NICHT GESTRICHEN, SONDERN RICHTIGGESTELLT** — Hausform
dieses Projekts.
**DER EINTRAG WIRD NICHT GESTRICHEN, UND SEIN TRIGGER GILT UNVERÄNDERT DEN VIER ÜBRIGEN
STELLEN:** `endTestMode` (`src/app/projects/actions.ts`), zwei Läufe in
`src/app/projects/actions.testmode.test.ts` und einer in
`src/components/TargetCard.test.tsx`. Sie tragen weiterhin **nur einen toten NAMEN** und
keine falsche Aussage; sie bleiben **Aufräumarbeit**.

**DIE AUFTEILUNG STIMMT WEITER — DIE ZAHL SECHS NICHT MEHR, UND SIE WIRD NICHT
ANGEGLICHEN.** GEMESSEN am Repo (CC, 2026-09-10, nach `9422920`; Achse: der alte
Constraint-Name, case-insensitiv, Suchraum `src/`, alle Dateitypen, Testdateien
eingeschlossen): **SIEBEN Fundstellen in VIER Dateien**, nicht sechs. **DIE SIEBTE IST DIE
RICHTIGSTELLUNG SELBST** — der Nachzug im Kopf von `startTestMode` muss den toten Namen
NENNEN, um sagen zu können, dass er tot ist.
**DAS IST KEIN RÜCKSCHRITT, SONDERN DIE BAUFORM:** Eine Richtigstellung, die ihren
Gegenstand nicht benennt, ist keine. Gegenprobe: der NEUE Name steht seit `9422920` in
**zwei** Dateien unter `src/` (`actions.ts`, `TargetCard.tsx`) — vorher in keiner.
**WER KÜNFTIG NACH DEM TOTEN NAMEN SUCHT, ZIEHT DIE ZWEI RICHTIGSTELLUNGS-STELLEN AB** und
findet die vier, die der Trigger meint. **DIE ZAHL IM TITEL DES EINTRAGS BLEIBT WÖRTLICH
STEHEN** — sie ist als Messung vom 2026-09-10 datiert und damit alt, nicht falsch; eine
zweite Zahl daneben wäre genau die Bauform, die diese Datei mehrfach als kaputtgegangen
führt.
PROVENIENZ DIESES ZUSATZES: die sieben Fundstellen, ihre Verteilung und die Gegenprobe sind
GEMESSEN am Repo (CC, 2026-09-10) nach dem Bau-Commit; dass die siebte von der
Richtigstellung selbst stammt, ist am Dateitext ABLESBAR und keine Ableitung.

**DREI HEBUNGS-KANDIDATEN — ÄNDERUNGSANTRÄGE IN WARTESTELLUNG, KEINE REGELN.** Sie richten
sich an den, der den Prompt oder den Commit-Body schreibt — das ist der Architekt, und über
den INHALT von docs/arbeitsweise.md entscheidet nicht CC (CLAUDE.md, Abschnitt "Aktive
Dokumente", Weg 7). Der Volltext jedes Kandidaten steht unter seiner Nummer im Archiv der
Phase 11.3, Abschnitt "Hebungs-Kandidaten"; hier steht nur sein Gegenstand.

**HEBUNGS-KANDIDAT (1) — EINE VERWORFENE ALTERNATIVE, DIE NUR IM COMMIT-BODY STEHT, IST FÜR
KÜNFTIGE RUNDEN VERLOREN.** docs/arbeitsweise.md weist der verworfenen Alternative den
Commit-Body als Ort zu, und ein Commit-Body lädt nicht — was nur dort steht, wird beim
nächsten Mal als Einfall neu vorgeschlagen. Wo die Grenze liegt, ist nicht erhoben: Manche
Alternativen sollen mit ihrer Scheibe ablaufen, und für die ist der Body der richtige Ort.
**EIN ÄNDERUNGSANTRAG AN docs/arbeitsweise.md STEHT AUS.**

**HEBUNGS-KANDIDAT (4) — EINE ZAHL IN EINER WÖRTLICHEN PROMPT-VORGABE WIRD NICHT GEPRÜFT,
WEIL SIE VORGABE IST.** Ein wörtlich vorgegebener Commit-Body trug eine Zahl aus einem
früheren Bericht, die der Messung derselben Runde widersprach, und wurde übernommen, weil er
Vorgabe war. Die Gegenform: keine Zahl in eine wörtliche Body-Vorgabe, oder ausdrücklich
die Prüfung gegen die Messung der Runde verlangen. Die Nachbarregel "Liste schlägt Zahl"
steht in docs/arbeitsweise.md, Abschnitt "Review-Kalibrierung — nach Tragweite, nicht nach
Artefakt-Typ". **EIN ÄNDERUNGSANTRAG AN docs/arbeitsweise.md STEHT AUS.**

**HEBUNGS-KANDIDAT (7) — DIE COMMIT-LÜCKE EINES VERMERKS ENTSTEHT STRUKTURELL UND FÄLLT ERST
DER NÄCHSTEN RUNDE AUF.** Der Hash existiert beim Schreiben des Vermerks noch nicht, die
Lücke ist also die Bauform und schliesst sich frühestens in der nächsten Runde — vier von
fünf Vermerken der Phase trugen denselben Nachtrag. Bleibt er aus, entsteht beim nächsten
Vermerk ohne Zutun eine zweite Lücke, und die Lücken-Regel verliert ihre Diagnose.
**EIN ÄNDERUNGSANTRAG AN docs/arbeitsweise.md STEHT AUS.**
