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
