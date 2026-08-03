## Merksätze und Nicht-Vorhaben (zählen NICHT als offene Punkte)
Angelegt 2026-08-01. Drei Einträge dieser Datei sind KEINE Aufgaben und können
deshalb nie "erledigt" werden — eine Verhaltensregel, eine ausdrücklich VERWORFENE
Idee und eine dokumentierte, akzeptierte Verhaltensänderung. In der Polish-Liste
zählten sie stillschweigend als offene Punkte mit und liessen sie länger aussehen,
als sie ist. Ihr Inhalt ist wertvoll und bleibt WÖRTLICH unverändert; sie stehen nur
an anderer Stelle.
WARUM DIESER ABSCHNITT OBEN STEHT und nicht am Dateiende: Neue Backlog-Einträge
werden ans DATEIENDE angehängt. Läge dieser Abschnitt dort, landete jeder künftige
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
    Eintrag. In der Root-CLAUDE.md nennt die Regel HISTORIE-CHECK VOR EINGRIFF IN
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
