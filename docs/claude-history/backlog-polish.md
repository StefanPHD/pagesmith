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
