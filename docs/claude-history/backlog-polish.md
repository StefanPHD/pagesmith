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

