# Pagesmith — Projektgedächtnis

## Vision (Was wir bauen)
Eine schlanke Hosting- & Integrations-Plattform, maßgeschneidert für High-Level
Performance-Marketer (DACH-Raum & international).
KI-Tools (Claude, v0, Bolt) erzeugen hübsches, aber "stummes" HTML/CSS/JS.
Pagesmith macht diesen Code funktional: Buttons/Forms werden per "Click & Connect"
mit echten Aktionen (Stripe, PayPal, Form-Webhook, Meta/Google-Events) verdrahtet,
serverseitig getrackt (CAPI, adblocker-resistent) und mit 1 Klick auf eigener Domain
live geschaltet. Kernversprechen: ultraschnelles reines HTML statt WordPress-Ballast,
Server-Side-Tracking, federleichtes A/B-Testing.

Zielnutzer: Media Buyer, die wöchentlich neue Domains für Rapid Testing kaufen.

## Modus
Solo-Entwickler, "Build in Public" auf GitHub. Passion-Projekt in freien Stunden.
Lean MVP: kleinste nutzbare Schritte, Infrastruktur so spät wie möglich.
Jeder Schritt soll demobar / screenshot-tauglich sein.

## Tech-Stack
- Next.js (App Router) + TypeScript + Turbopack. Lokal: Node v24.16.0.
- Tailwind CSS
- Erkennung im Browser: nativer DOMParser (keine Dependency)
- Code-Transformation: clientseitig via DOMParser (wie Detection). Server-seitige
  HTML-Injektion (Serving-Schicht, Phase 7/8) ist eine REINE STRING-OP, KEIN Parser —
  Cheerio wurde nie eingeführt (keine Dependency). S. "## Immer beachten".
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3, seit 2026-07-29 auf PRO
- Hosting/Deploy-Orchestrierung: Vercel-API (Domains) — seit Phase 7 live. Vercel-Plan:
  HOBBY. Netlify stand hier als Alternative und wurde NIE eingesetzt — entfernt, damit
  niemand einen zweiten Provider vermutet, den es nicht gibt.

## Roadmap & aktueller Stand
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: Drei-Zonen-Workspace, postMessage-Klick-Brücke,
      bidirektionales Highlighting. Siehe Detail-Block unten.
- [x] Phase 3 — Persistenz & Auth (Supabase): stabile Element-IDs, E-Mail/Passwort-
      Auth, Code-Persistenz, Multi-Projekt-Verwaltung. Fundament steht. Siehe
      Detail-Block unten. Advanced Features (Consent-Gate, DTR) folgen danach.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: die "Click & Connect"-Wertschöpfung —
      Aktionen zuweisen/konfigurieren/speichern (Redirect) und verwaiste Mappings
      sichtbar machen/löschen/neu-verknüpfen. Siehe Detail-Blöcke unten.
- [x] Phase 4 — Code-Generierung + HTML-Export: generateFunctional bäckt die
      Mappings in funktionales HTML (reine Engine + funktionale Vorschau), Ausgabe
      per Download/Copy. Client-seitig via DOMParser (kein Cheerio — es wurde auch in
      der späteren Serving-Schicht nie eingeführt, die Injektion dort ist eine reine
      String-Op). Siehe Detail-Blöcke unten.
- [x] Phase 4.5 — Editor-Politur: (A) Datei-Upload/Drag-Drop als zweiter
      Import-Weg neben Copy-Paste und (B) Zen-Modus — der Collapse versteckt NUR
      die Code-EINGABE (Textarea + Upload), die Elementliste bleibt IMMER sichtbar.
      Reiner lokaler UI-View-State, KEIN Daten-/Mapping-Zustand, berührt
      dirty-Tracking nicht. ABGESCHLOSSEN (live getestet, inkl. Politur). Siehe
      Detail-Block unten.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN (live). Textdetektion +
      Override in Preview, Edit UND Export (Scheibe 1 + 1b + 2) sowie Text-Live-Patch
      im Edit-Modus ohne Reload-Sprung (Scheibe 3). Type-diskriminiertes
      Mapping-Modell ein zweites Mal bestätigt.
- [x] Phase 6 — Server-Side Tracking (CAPI): KOMPLETT (Mechanik). Type-diskriminiertes
      Mapping -> Mehr-Aktion -> echtes Meta-Pixel (consent-sauber) -> Secret-Storage
      (service_role + heiligstes Gate) -> CAPI-Route -> Dedup-Beacon. Offener
      End-to-End-Dedup-Sichtbarkeitstest auf verknüpfter Domain -> Phase 7.
- [x] Phase 7 — Hosting & Go-Live: ABGESCHLOSSEN.
      Alle Scheiben (7a Serving, 7b First-Party-Ingest, 7c-1 Middleware-Inversion +
      Custom-Domain-Serving, 7c-2a Wildcard-Infra (publayer.net), 7c-2b Add-Domain-
      Mutation, 7c-2c DNS-Anweisungs-UX + Domain entfernen) LIVE VERIFIZIERT — zuletzt
      bestätigt durch einen echten Produktions-Smoke: test.thrty.store wurde über
      die deployte Produktions-URL (pagesmith-delta.vercel.app, NICHT localhost)
      hinzugefügt und ist dort als "Live" bestätigt — beweist, dass
      VERCEL_API_TOKEN/VERCEL_PROJECT_ID auch in Vercels eigener Serverless-Runtime
      funktionieren, nicht nur lokal. Vollständiges Detail (inkl. 7c-2-Familie):
      docs/claude-history/phase-7-hosting.md. (war Phase 6)
- [x] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
      (Traffic-Gesundheit, ROI/Attribution, Betreiber-Metriken) + Adblocker-Verlustrate
      über geteilte-eventID-Vergleich ECHTER Events. (war A/B-Testing) — Scheibe 1
      (Persistenz-Fundament) LIVE in Produktion bewiesen (events via after() neben
      CAPI-Forward, source='server'), ebenso die nachgelagerte CAPI-Härtung (3s-Timeout +
      errorName-Util). Scheibe 2 (PageView-Tracking) KOMPLETT & live bewiesen (2b-0 server-
      autoritative trackingKey-Spalte + 2b-1 server-injizierter PageView-Emitter). Scheibe 3
      (Read-Pfad-Fundament) KOMPLETT & live bewiesen (owner-SELECT-RLS + get_event_counts +
      Statistik-Sektion; tenant-isolierte Anzeige gegengeprobt). Scheibe A (Bestätigungs-Signal) +
      Scheibe B (Verlustraten-RPC get_adblock_loss + Kachel, Migration 0015) KOMPLETT & live
      bewiesen (2026-07-23) — die Marquee-Metrik steht. Phase 8 als Feature rund: Erfassen ->
      tenant-isolierte Anzeige -> Adblocker-Verlustrate. Ist-Stand:
      "## Aktueller DB-/Analytics-Stand"; volle Herleitung: docs/claude-history/phase-8-analytics.md.
      ABGEHAKT 2026-07-29: der ZUGESAGTE Umfang ist fertig und live bewiesen. Die vier
      Weiterentwicklungen (Uniques, Charts/Zeiträume, CAPI-Einbettung server-vereinheitlichen,
      Launch-Härtung) sind IDEEN OHNE TERMIN und OHNE Zusage — sie hingen bisher als offener
      Haken an dieser Zeile und liessen die Phase unfertig aussehen, obwohl sie es nicht ist.
      Wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis; sie
      öffnet diese Checkbox nicht wieder.
- [x] Phase 9 — A/B-Testing: ABGESCHLOSSEN & live bewiesen (2026-07-27 bis
      2026-07-29). Volle Herleitung: docs/claude-history/phase-9-ab-testing.md.
- [ ] Phase 10 — Workspace-Reorganisation: reine Informationsarchitektur, KEIN
      neues Backend-Feature. Trennt die heute auf EINER Fläche liegenden
      Einstellungsbereiche (Hosting/Domain, Tracking, A/B-Testing, Analytics)
      in eigene Bereiche — Voraussetzung für Phase 11, BEVOR ein weiterer
      Pixel-Typ dazukommt.
- [ ] Phase 11 — Multi-Tracking (Server-Side Fan-Out): TikTok, Google,
      Pinterest, LinkedIn, Custom-Pixel als weitere ADDITIVE Fan-Out-Ziele
      neben Meta — source bleibt Beobachtungs-Ort, jedes Ziel bekommt seine
      EIGENE additive Spalte, kein Umbau. Dazu das kleine
      Tracking-Testmodus-Modul (test_event_code, s. future-roadmap.md,
      "Tracking-Testmodus für Kunden"). AUSDRÜCKLICH AUSGENOMMEN:
      Hotjar/Session-Recording ist KEIN Fan-Out-Ziel, sondern braucht einen
      eigenen Custom-Script-Mechanismus — separat zu bewerten.
      DESIGN-HINWEIS FÜRS KONZEPT-GESPRÄCH (verbindlich zu klären, NICHT
      vorentschieden): Das heutige Consent-Gate (psConsent) ist fest in die
      Meta-Pixel-Runtime eincodiert, kein wiederverwendbares Attribut. Mit
      jedem weiteren Netzwerk droht sonst eine KOPIERTE Consent-Prüfung pro
      Ziel — dasselbe Muster, das an anderer Stelle im Projekt konsequent
      vermieden wird ("kein drittes Urteil"). Phase 11 konzipiert deshalb EIN
      geteiltes Consent-Gate für alle Fan-Out-Ziele. Dabei GLEICH
      mitzudenken: die separat erwähnte generische Action-Consent-Checkbox
      (jede Aktion, nicht nur Tracking, gated) — beide Bedürfnisse sollen auf
      DENSELBEN Mechanismus laufen, nicht zwei parallele Gates entstehen.
- [ ] Phase 12 — Rich-Text / verschachtelte Textknoten: der Editor erkennt
      heute nur reine Textknoten, kein <strong>/<em> innerhalb eines <p>.
      Offene Designfragen seit Phase 5: Umgang mit Kind-Markup, Vorschau- vs.
      Export-Strategie — Klärung im Bau-Slice.
      KONZEPT-KANDIDAT, NICHT garantierter Umfang: Dynamic Text Replacement
      (Überschriften-Austausch per URL-Parameter) berührt dieselbe
      Text-Element-Infrastruktur, löst aber ein ANDERES Problem
      (Parameter-Substitution statt Markup-Erhalt) — im Konzept-Gespräch zu
      Phase 12 prüfen, ob es mitgebaut wird oder eigenständig bleibt, NICHT
      automatisch bündeln.
- [ ] Phase 13 — E-Mail-/ESP-Webhooks: Pagesmith wird KEIN Versender
      (Owner-Entscheidung) — stattdessen Webhooks auf Performance-Events, der
      Kunde behält seinen bestehenden ESP.
- [ ] Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic): Per-Tenant-
      Rate-Limiting auf /api/e + /api/capi, Safe-Browsing-Check der
      Redirect-Ziele, Login-Brute-Force (zuerst Supabase-Auth-Built-in
      prüfen). Security-Manifest-Tier-1 (s. "## Security Manifest & Launch
      Blocker"), kein Produkt-Feature. Bleibt an dieser Stelle: echter
      Ad-Traffic ist noch nicht terminiert, kein Grund zum Vorziehen.
- [ ] Phase 15 — Public-Launch-Restarbeit (Tier 0): E-Mail-Bestätigung
      (Dashboard-Toggle), Abuse-Kanal + security.txt (s. "## Security
      Manifest & Launch Blocker", Tier 0). Subprozessor-/Kunden-DPA ist KEIN
      Bau-Auftrag, sondern ein juristisches Dokument, das Stefan separat
      aufsetzt. Kein Termin — App bleibt im privaten Test-/Beta-Betrieb.
- [ ] Phase 16 — Analytics-Vertiefung (Uniques, Traffic-Health-Metriken):
      braucht als ERSTEN Schritt die Datenklassen-Grenze-Entscheidung (s.
      "## Offene Punkte") — eine gehashte Besucher-Kennung ist
      personenbezogen und löst die 30-Tage-Retentionspflicht aus. Eigenes
      Konzept-Gespräch VOR jedem Bau dieser Phase.
- [ ] Phase 17 — Multi-Page-Funnels (s. future-roadmap.md, "Zukunftsrichtung:
      Funnel-Architektur"): additive pages-Tabelle, funnel_step als neuer
      Aktionstyp im bestehenden, type-diskriminierten Mapping-Modell — kein
      Modellumbau. Setzt Phase 16 voraus.
- [ ] Phase 18 — MCP-Server (verschoben von der ursprünglichen
      Phase-10-Position, Detail: future-roadmap.md): dreht das
      Sicherheitsmodell um — Lesen UND Schreiben mit voller Owner-Autorität
      über einen langlebigen Key in fremder KI-Umgebung. Eigene
      Autorisierungsschicht, KEIN angehängter Endpunkt. Bewusst ans Ende
      gestellt.

**Bewusst nicht phasiert (Trigger fehlt):**
- ROI/Attribution (s. future-roadmap.md, "Strategischer Nordstern:
  Performance-CRM & CAPI-Attribution-Engine"): externe Ad-Spend-API noch
  nicht vorhanden.
- Click-ID-Erfassung/Dynamic-Audience-Engine: Datenklassen-Grenze, größere
  Reichweite als Uniques.
- GEO/llms.txt (s. future-roadmap.md, "Strategischer Nordstern: GEO"):
  PRÄZISE fassen — nur die manuelle JSON-LD-Injektion (Säule 1,
  Zwischenschritt 1c) trägt einen EXPLIZITEN Trigger ("wird erst gebaut, wenn
  ein Kunde es fordert"). Die automatische llms.txt-Erzeugung (1a) ist
  grundsätzlich baubar, aber schlicht noch nicht eingeplant — nicht denselben
  harten Trigger unterstellen. KI-Crawler-Erfassung (Säule 3) braucht einen
  eigenen, entkoppelten Schreibpfad auf der Serve-Route, KEINE reine
  Konfigurationsdatei — das bei etwaiger Einplanung nicht unterschätzen.
- Spur B (native JSON-Generierung) / Business-Website-Projekttyp (s.
  future-roadmap.md, "Strategischer Ausblick: Projekttyp 'Business-Website'"):
  eigene zweite Produktspur, deren natürlicher Zeitpunkt bei/nach Phase 18
  (MCP) liegt — dort liegt laut future-roadmap.md ihr
  Flaggschiff-Anwendungsfall.
- Betreiber-Metriken/SaaS-Tarifgrenzen (Rate-Limiting nach Tarif,
  In-App-Upgrade-Meldungen): kein Preismodell heute — kein Termin, reine
  Notiz.


## Offene Punkte (aktive TODOs mit Trigger — nicht in ein Abschluss-Archiv)
Kurz gehaltene Sammelstelle für Dinge, die HEUTE noch nicht beißen, aber zu einem
benennbaren Zeitpunkt zwingend erledigt sein müssen. Kein Backlog-Ersatz (aufgeschobene
Aufräumarbeiten: docs/claude-history/backlog-polish.md) — hier steht nur, was sonst STILL
kaputtgeht.

- isAppHost-PLATZHALTER (Trigger: Brand-Domain-Kauf): isAppHost trägt pagesmith.app als
  PLATZHALTER. Sobald eine echte Brand-Domain feststeht, MUSS sie in EINEM überlegten Schritt
  in die isAppHost-Allowlist (+ NEXT_PUBLIC_APP_URL + Doku) — sonst landet die eigene App auf
  ihrer eigenen Domain im SERVING-Zweig und 404t. In Prod heute harmlos (nur *.vercel.app ist
  relevant), aber vor dem Brand-Domain-Livegang nicht vergessen.
- HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung): Vercel Hobby deckelt bei 50 Custom-
  Domains PRO PROJEKT — geteilt über ALLE Kunden, also eine Multi-Tenant-Decke, nicht ein
  Per-Kunde-Limit. Der Per-User-Cap (Richtwert 3/User) schützt sie doppelt (Abuse + geteilte
  Decke). Pro-Upgrade VOR echter Skalierung einplanen.
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging
  REIN AUS DEN MIGRATIONSDATEIEN — der Restore-Drill-Fall ist unten GEMESSEN geklärt,
  das ist aber KEIN Freibrief für diese beiden anderen Fälle): Die Event-Trigger-FUNKTION
  rls_auto_enable (aktiviert automatisch RLS auf neuen public-Tabellen, SECURITY DEFINER),
  gebunden über den Event-Trigger ensure_rls (ddl_command_end), existiert NUR in der
  laufenden DB — Zweck + Grant-Entzug sind in 0003 dokumentiert, aber ein CREATE steht
  in KEINER Migration. Bei einem Rebuild REIN AUS DEN MIGRATIONSDATEIEN (z.B. lokales
  `supabase db reset`, CI, Self-Hosting) fehlt sie weiterhin -> neue Tabellen bekämen
  dort NICHT automatisch RLS (stiller Verlust einer Schutzschicht). DDL verbatim
  archiviert unter supabase/manual/rls_auto_enable.sql (bei einem Migrations-only-Rebuild
  manuell mitziehen). evtowner = postgres (gemessen 2026-07-24) -> eine Migration unter
  der NÄCHSTEN FREIEN Nummer (ableiten aus supabase/migrations/, NIE hardcoden — eine
  feste Nummer hier veraltet mit der nächsten Migration und überschriebe dann eine
  bestehende Datei) bleibt ein realistischer Kandidat für GENAU DIESEN
  Migrations-only-Fall, aber KEINE Nebenbei-Zeile: (a) create event trigger kennt KEIN
  "if not exists" -> Katalog-Guard nötig (DO-Block gegen pg_event_trigger); (b) "create or
  replace function" auf einer SICHERHEITSFUNKTION ersetzt die Definition VOLLSTÄNDIG
  (0014-Lektion) — jeder Transkriptionsfehler degradiert still den RLS-Schutz, daher
  nach dem Lauf Byte-Abgleich gegen pg_get_functiondef PFLICHT; (c) die Migration muss
  gegen die BESTEHENDE DB ein No-op sein.
  GEMESSEN (2026-07-30, Restore-Drill "Restore to new project",
  supabase/checks/restore-drill.sql): Für den SUPABASE-RESTORE-Pfad ist die Frage jetzt
  beantwortet — ensure_rls übersteht einen Restore aus einem Pro-Backup automatisch.
  Teil A/B (Migrationsstand, Event-Trigger, Funktionsliste) waren zeilenidentisch
  zwischen Original und restauriertem Projekt; die Positivkontrolle (Teil C,
  Wegwerf-Tabelle ohne explizites RLS-Enable) ergab rls_automatisch_aktiviert = true.
  Für den Restore-Fall ist damit KEIN manuelles Nachziehen von
  supabase/manual/rls_auto_enable.sql mehr nötig.
  GRENZE: Der Beweis gilt für DIESEN Drill mit DIESER Backup-Generation, KEIN Beweis für
  alle Zeit — ändert Supabase die Restore-Mechanik, wäre der Drill zu wiederholen.
  UNVERÄNDERT OFFEN bleiben die beiden anderen Trigger (DB-Neuaufbau / Staging rein aus
  den Migrationsdateien): dort fehlt ensure_rls weiterhin, s. oben.
- DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE (Trigger: die erste Scheibe, die
  personenbezogene Merkmale erfasst — Click-IDs, IP/UA, gehashte Kontaktdaten,
  Fingerprint-artige Merkmale; spätestens VOR dem ersten echten Ad-Traffic): Heute
  trägt events KEINE Personen-Identität, deshalb braucht es keinen Löschpfad und keine
  Auskunftsfähigkeit. Die Performance-CRM-Vision (docs/claude-history/future-roadmap.md)
  würde genau das ändern. Die Grenze — WAS erfasst wird, auf welcher Rechtsgrundlage,
  wie lange, mit welchem Löschpfad — MUSS entschieden sein, BEVOR die erste solche
  Scheibe gebaut wird. Grund: einmal unter falscher Grundlage erhobene Daten lassen
  sich nicht rückwirkend heilen, und die DSGVO-Sauberkeit IST das Verkaufsargument.
  Bindet die bestehende 30-Tage-Retentionspflicht (Manifest Tier 2) und die
  Zwei-Ebenen-Trennung Kunden- vs. Betreiber-Ebene aus der future-roadmap mit ein.
  Browser-Fingerprinting ist bereits ENTSCHIEDEN: wird nicht gebaut. EBENSO ERFASST
  (Phase 9): eine „anonyme" Zufalls-ID in einem First-Party-Cookie zur
  Besucher-Identifikation wäre ein fingerprint-artiges Merkmal und löst dieselbe Grenze
  aus — auch das keine Option ohne eine vorherige Entscheidung hier.
- COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH
  (Trigger: vor dem öffentlichen Launch; Phase 9): Für das A/B-Test-Cookie
  (__Host-ps_v) stellt Pagesmith dem Kunden heute KEINEN fertigen
  Doku-Schnipsel bereit, den er in seine eigene Datenschutzerklärung
  übernehmen könnte (Cookie-Name, Zweck, Lebensdauer) — das ist eine
  PRODUKTPFLICHT, kein Nice-to-have, weil der Kunde sonst mangels dieser
  Angabe rechtlich blank dasteht. Zusätzlich MUSS vor dem Launch anwaltlich
  geklärt werden, ob ein reines Varianten-Cookie tatsächlich ohne
  Einwilligung auskommt oder ob ein A/B-Test als Betreiber-Optimierung
  gilt, die eine Einwilligung verlangt — Letzteres würde den Split brechen
  (er muss vor dem ersten Rendern feststehen).
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- LABEL-VERGABE IST UNPROTOKOLLIERT (Trigger: vor öffentlichem Traffic bzw. mit
  dem Abuse-/Audit-Ausbau): assignDomainLabel und die Wiederherstellung
  schreiben KEINEN audit_logs-Eintrag, Custom-Domain-Mutationen dagegen schon
  (register.ts, remove.ts, je im finally). Das Tier-1-Item
  "Domain-Mutations-Audit-Log" ist damit nur teilweise erfüllt — und genau die
  Label-Vorgänge sind die, deren Historie man bei einer Divergenz bräuchte.
  Bewusst nicht in der Fix-Scheibe mitgebaut: writeAuditLog verlangt einen
  service_role-Client, den publishProject bewusst NICHT instanziiert
  (dokumentierte Entscheidung) — das umzustossen gehört in eine eigene Runde.

## Aktueller DB-/Analytics-Stand (Ist-Zustand, kein Konzept)
Was der nächste Migrations-/Analytics-Schritt als Ausgangslage in der Root findet. Nur
Ist-Zustand — Herleitung und Entscheidungen: docs/claude-history/phase-8-analytics.md.
PROVENIENZ: GEMESSEN am 2026-07-30 im SQL-Editor (schema_migrations, information_schema.columns,
pg_constraint, pg_class+pg_policy, pg_policies, role_table_grants, pg_indexes, pg_proc,
pg_event_trigger). Die Probe ist versioniert unter supabase/checks/db-stand.sql — vor jedem
Neuschreiben dieser Sektion dort fahren, nicht frisch tippen. AUCH die Index-DEFINITIONEN sind
gemessen (indexdef), nicht aus den Migrationsdateien übernommen.
FALLE bei jeder Wiederholung: schema_migrations existiert DREIMAL (public / auth / realtime).
Jede Katalog-Abfrage MUSS das Schema filtern — sonst liefert sie drei Zeilen mit
unterschiedlichen RLS-Werten und sieht wie ein Befund aus.

ERGEBNIS DES LAUFS: Alle ZEHN Proben trafen ihre ERWARTUNG exakt, KEINE Abweichung. Das ist
selbst eine Aussage wert — die wahrscheinlichere Alternative wäre ein stiller Drift zwischen
Doku und Schema gewesen, genau wie er diese Sektion zuvor bereits einmal getroffen hat (die
zwei Nachtrag-Markierungen aus 9c-1/9c-2, die zwischen 2026-07-28 und diesem Lauf hier
standen). Beide sind mit diesem Lauf VOLLSTÄNDIG überholt und entfernt; die Sektion unten ist
wieder ein einheitlicher, durchgehend gemessener Stand ohne Sonderfälle.

- MIGRATIONSSTAND: 0001-0020, LÜCKENLOS — arithmetisch bewiesen (Probe 1b: Zeilenzahl =
  Spannweite+1), nicht nur an der Dateisortierung abgelesen. Seit 0018 existiert
  public.schema_migrations als PROTOKOLL (version PK / filename / applied_at; RLS aktiv, KEINE
  Policy). Gemessen: 20 Zeilen, applied_at gefüllt bei DREI Zeilen — 0018, 0019, 0020
  (Protokollpflicht ab 0018; beide späteren Migrationen tragen den Insert bereits selbst mit).
  EHRLICHE EINORDNUNG: Die Zeilen 0001-0017 sind ein BACKFILL aus 0018, KEIN Vollzugsnachweis —
  ihr applied_at ist bewusst NULL, weil der Ausführungszeitpunkt nicht bekannt ist. Dass sie
  gelaufen sind, belegen ihre WIRKUNGEN (Spalten/Constraints unten), nicht die Tabelle. Ab 0018
  ist der Eintrag ein echtes Protokoll. PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: es gibt keinen
  Migrations-Runner und soll keinen geben (s. "## Immer beachten").
- TABELLEN in public: SECHS — projects, domains, project_tokens, events, audit_logs,
  schema_migrations. Bei ALLEN ist RLS aktiv. (Die frühere Zahl "fünf" ist seit 0018 überholt.)
- POLICIES: ZEHN. projects 4 (select/insert/update/delete); domains 3 (select/insert/update —
  KEINE DELETE); project_tokens 2 (insert/update — KEINE SELECT, das write-only-Gate auf den
  CAPI-Token); events 1 (events_select_own, SELECT); audit_logs 0; schema_migrations 0.
  Bei events ist das Fehlen der INSERT/UPDATE/DELETE-Policy eine ENTSCHEIDUNG, keine Lücke:
  Writes laufen ausschließlich über service_role (Ingest-Pfad, persistEvent). Der Owner LIEST
  seine Events, er schreibt sie nie. Wer hier eine Write-Policy ergänzt, öffnet den
  Analytics-Schreibpfad für den Client — dieselbe Denkfigur wie bei project_tokens und
  audit_logs (s. "## Immer beachten", "APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI"), nur für eine
  Tabelle, die jene Regel heute NICHT nennt.
- auth.uid()-KAPSELUNG (bekannte Abweichung, reiner Performance-Punkt, KEIN Leak): NUR
  events_select_own trägt (select auth.uid()) gekapselt. projects/domains/project_tokens tragen
  blankes auth.uid() (Auswertung pro Zeile). Ein Fix wäre eine Migration -> aufgeschoben, s.
  docs/claude-history/backlog-polish.md.
  events_select_own spiegelt die Ownership-ACHSE von projects_select_own 1:1 — EXISTS-Semi-Join
  statt direktem Vergleich, also andere SYNTAX bei gleicher ACHSE. Beide Unterschiede (Kapselung
  und EXISTS) sind bekannt und unbedenklich; eine Divergenz in der ACHSE selbst WÄRE das Leak.
- ROLLEN-GRANTS: anon, authenticated UND service_role haben volle DML-Rechte auf ALLE SECHS
  public-Tabellen, inkl. project_tokens und schema_migrations. Die Tenant-Isolation und das
  write-only-Gate tragen damit AUSSCHLIESSLICH über RLS (s. "## Immer beachten", "GRANTS
  SCHÜTZEN NICHTS").
- TABELLE public.events: id uuid PK (gen_random_uuid()); project_id uuid FK -> projects
  ON DELETE CASCADE; event_type text; event_id text; source text (KEIN Default); created_at
  timestamptz (now()) — diese SECHS NOT NULL. DAZU: variant text NULLABLE (0017).
  ACHTUNG: Die frühere Formulierung "ALLE Spalten NOT NULL" gilt seit 0017 NICHT mehr. Wer die
  Aufzählung als vollständig liest, plant gegen ein Schema, das es nicht gibt.
  CONSTRAINTS: events_event_type_max_len (length(event_type) <= 64); events_variant_valid
  (variant IS NULL OR variant IN ('a','b')). event_id trägt BEWUSST KEINEN Unique-Constraint
  (die geteilte browser/server-eventID IST der Verlustraten-Join).
- TABELLE public.projects (server-logik-relevante Spalten; SECHZEHN Spalten insgesamt):
  tracking_key text NULLABLE (2b-0, server-autoritativ); html_b text NULLABLE + mappings_b
  jsonb NULLABLE (0016); ab_test_active boolean NOT NULL DEFAULT false (0017);
  ab_test_started_at timestamptz NULLABLE, KEIN Default (0020); published_content jsonb
  NULLABLE; blocked_at + blocked_reason NULLABLE (0008); settings jsonb NOT NULL DEFAULT '{}'
  (CLIENT-autoritativ, wird von saveProject ganzheitlich ersetzt).
  CONSTRAINTS: projects_variant_b_pair ((html_b IS NULL) = (mappings_b IS NULL));
  projects_ab_test_needs_variant_b (NOT ab_test_active OR html_b IS NOT NULL).
- PRIMÄRSCHLÜSSEL, DIE NICHT "id" HEISSEN (Footgun, real aufgetreten): domains -> label;
  project_tokens -> project_id; schema_migrations -> version. Vor der Nutzung eines Feldnamens
  die Migration nachsehen.
- INDIZES (gemessen per indexdef):
  events: events_pkey (id); events_project_id_idx (project_id — trägt den äußeren Scan UND die
    Policy); events_project_event_idx (project_id, event_id — 0015, trägt den korrelierten
    Verlustraten-Join). KEIN Index auf variant (0017 legte bewusst keinen an; 9c aggregiert über
    project_id).
  projects: projects_pkey (id); projects_tracking_key_key UNIQUE (tracking_key) WHERE
    tracking_key IS NOT NULL; projects_blocked_idx (blocked_at) WHERE blocked_at IS NOT NULL —
    trägt den Kill-Switch-Lookup. KEIN Index auf ab_test_started_at (0020 legte bewusst keinen
    an — ein Zeilen-Lookup pro Auswertung über den PK, nie gefiltert/sortiert).
  domains: domains_pkey (label); domains_custom_host_key UNIQUE (custom_host) WHERE custom_host
    IS NOT NULL; domains_project_id_idx (project_id).
  (projects_blocked_idx und domains_project_id_idx waren bisher in KEINER Doku-Zeile erfasst.)
- FUNKTIONEN in public: FÜNF — gemessen, nicht nachgetragen.
  get_event_counts(p_project_id) -> TABLE(event_type, count), gefiltert auf source='server'
    (0014) — SECURITY INVOKER, stable, search_path=public.
  get_adblock_loss(p_project_id) -> TABLE(total_server_conversions, confirmed_conversions,
    first_confirm_at) (0015) — INVOKER, stable, search_path=public.
  get_variant_counts(p_project_id) -> TABLE(event_type, count_a, count_b, count_none),
    gefiltert auf source='server' (ANGELEGT 0019, Scheibe 9c-1; seit 0020, Scheibe 9c-2, per
    "create or replace function" um den Zeitfilter ERSETZT — Signatur und Rückgabetyp dabei
    BYTE-GLEICH) — INVOKER, stable, search_path=public. Der source-Filter ist WÖRTLICH aus
    get_event_counts übernommen; Divergenz zeigte zwei unvereinbare Zahlen im selben Dashboard.
  ALLE DREI RPCs: SECURITY INVOKER — die RLS des Aufrufers filtert von INNEN. Das ist eine
    Entscheidung, kein Zufall: als DEFINER würden die RPCs die RLS umgehen und Zahlen über
    ALLE Tenants liefern.
  set_updated_at() — Trigger-Funktion, INVOKER, volatile, search_path=public.
  rls_auto_enable() — Event-Trigger-Funktion, SECURITY DEFINER, volatile,
    search_path=pg_catalog. NICHT public — das ist korrekt und beabsichtigt, s.
    "## Immer beachten", "DB-FUNKTIONEN + SEARCH_PATH".
- EVENT-TRIGGER: SIEBEN. ensure_rls (ddl_command_end -> rls_auto_enable, evtowner postgres,
  aktiviert) plus SECHS Supabase-Plattform-Trigger (issue_graphql_placeholder,
  issue_pg_cron_access, issue_pg_graphql_access, issue_pg_net_access, pgrst_ddl_watch,
  pgrst_drop_watch; evtowner supabase_admin). ensure_rls existiert NUR in der laufenden DB, aus
  KEINER Migration reproduzierbar -> "## Offene Punkte".
- BACKUPS: Supabase liegt seit 2026-07-29 auf PRO -> TÄGLICHE Backups mit 7 Tagen
  Retention. Die frühere Aussage "Free hat KEINE Backups" ist damit überholt.
  WAS NICHT GELÖST IST — zwei Dinge, die ein "Backups vorhanden" sonst verdeckt:
  (1) PITR ist NICHT gebucht -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem
      letzten täglichen Snapshot). Das ist eine bewusste Entscheidung, kein Versehen.
  (2) Ein Rebuild REIN AUS DEN MIGRATIONEN bliebe unvollständig (ensure_rls /
      rls_auto_enable, s. "## Offene Punkte") — das Upgrade ändert daran NICHTS, weil der
      Event-Trigger am Cluster hängt und in keinem Schema-Dump steckt.
  Der Restore-DRILL ist weiterhin nicht gefahren -> s. "## Security Manifest & Launch
  Blocker", BACKUPS.
- AUFGESCHOBEN (konditionale Optimierung, kein Footgun): CAPI-Forward auf Hintergrund-
  Zustellung umstellen (die 204 löst sich von Metas Latenz) — Trigger: falls Beacon-Latenz je
  ein echtes Problem wird. Detail: docs/claude-history/phase-8-analytics.md.

## Aktiver Stand — Verfahren ab Phase 10

Ab Phase 10 wird der aktive Stand einer laufenden Phase NICHT mehr hier
geführt, sondern in einer eigenen, nicht automatisch geladenen Datei:
docs/aktiver-stand.md. Existiert diese Datei nicht, läuft aktuell keine
Phase — dann gibt es hier nichts zu lesen und auch sonst nichts zu tun.

Diese Datei muss JEDE Session, die an einer laufenden Phase arbeitet,
ZUERST gelesen werden — das ist kein Vorschlag, sondern ein Pflicht-Gate
("Auftrag 0") in jedem Bau- und Aufklärungs-Prompt. Details zum Ablauf
(Anlegen zu Phasenbeginn, Fortschreiben während der Phase, Hebung +
Archivierung am Phasenende): arbeitsweise.md.

## Code-Qualität, Performance & SaaS-Skalierung
Zwei bewusst GETRENNTE Blöcke. A gilt ab sofort und ist prüfbar — jede neue Query,
Policy und jeder externe Call wird daran gemessen. B sind Skalierungs-Leitplanken für
Features, die es HEUTE NICHT GIBT; sie sind NICHT bindend und der Code wird NICHT auf
sie hin vorgebaut (kein Ballast, kein spekulativer Infrastruktur-Aufbau). Jede B-Regel
trägt eine explizite TRIGGER-Bedingung — erst wenn die eintritt, wird die Regel scharf
und wandert (dann als geprüfte Entscheidung) nach A. So bleibt das Manifest ehrlich:
keine Statusänderung für etwas, das noch nicht existiert.

### A) Heute verbindlich (prüfbar, gilt ab sofort)
- DATENZUGRIFF: Ausschließlich über den Supabase-JS-Client (PostgREST/HTTP). Keine
  direkte PostgreSQL-Verbindung, kein ORM (Prisma/Drizzle etc.) ohne explizite
  Rücksprache — der Stack läuft heute bewusst rein über den HTTP-Layer.
- KEIN SELECT *: nur die für die Business-Logik nötigen Spalten abrufen (bereits
  gelebte Disziplin, siehe resolve.ts-Resolver-Muster — hier bestätigt, nicht neu).
- KEIN N+1: keine Schleifen mit Einzel-Query pro Element; Joins/gebündelte Queries
  nutzen.
- PROAKTIVE INDIZES: bei jeder neuen Tabelle/Spalte, die in WHERE/ORDER BY/Matching
  verwendet wird, direkt einen passenden Index vorschlagen (Präzedenzfall: partial
  unique index auf domains.custom_host).
- RLS-PRÄZISION (korrigierte Regel, NICHT "O(1) Policies" — das ist keine sinnvolle
  Metrik): auth.uid() in Policies IMMER als (select auth.uid()) wrappen, damit Postgres
  es einmal statt pro Zeile auswertet. Keine tiefen Joins/Subqueries in Policies.
  Eine neue Policy spiegelt die Ownership-ACHSE der bestehenden Tabellen-Policy (nie neu
  erfinden — Divergenz zwischen "wer darf das Projekt" und "wer darf die Events" WÄRE das
  Leak); korrelierter Semi-Join via EXISTS statt IN (kurzschließend, nutzt den Index).
  security definer NUR mit expliziter Einzelfall-Begründung vorschlagen (umgeht RLS,
  ist bei Fehlgebrauch selbst ein Sicherheitsloch) — NIEMALS als Standardempfehlung. BELEGTE
  AUSNAHME: die Event-Trigger-FUNKTION rls_auto_enable (gebunden über den Event-Trigger ensure_rls;
  existiert in der DB, NICHT aus einer Migration — 0003 entzog nur die Grants; DDL archiviert unter
  supabase/manual/rls_auto_enable.sql) IST SECURITY DEFINER — korrekt, weil Event-Trigger als Owner
  laufen; die DEFINER-Warnung des Advisors ist dort erwartet.
- LIKE-WILDCARD-FALLE bei Präfix-Filtern: '_' ist ein LIKE-Wildcard -> "not like '__ps_%'"
  matcht mehr als gedacht. Präfix-Ausschlüsse über left(spalte,5) <> '__ps_' formulieren
  (deckt künftige __ps_-Tokens automatisch, ohne Escaping-Falle).
- DEFENSIVE TIMEOUTS: JEDER externe API-Call (Meta CAPI heute, Vercel-Domains-API in
  7c-2b) braucht ein striktes Timeout, damit ein hängender Drittanbieter die
  Serverless-Funktion nicht blockiert.
- /API/E-SCHLANKHEIT (der reale Hotspot, NICHT CSV/Bulk): /api/e wird von JEDEM
  Besucher JEDER Kundenseite getroffen — jeder zusätzliche synchrone Call dort
  multipliziert sich mit dem Traffic ALLER Kunden zusammen. PRÄZISE Regel (bewusst
  KEIN pauschales "Drittanbieter nie synchron", das würde die Dedup-Garantie
  gefährden): die Beacon-Antwort an den Client darf NICHT auf den Meta-Call warten,
  aber der CAPI-Call selbst muss zuverlässig zugestellt werden.
- RATE-LIMITING: siehe Security Manifest Tier 1 (Per-Tenant-Limiting /api/e+/api/capi)
  — hier nur Cross-Link, keine Duplikation.
- AUDIT-LOGS: siehe Security Manifest (Vercel-Domain-Mutations-Log) — hier nur
  Cross-Link, keine Duplikation.

### B) Skalierungs-Leitplanken für SPÄTER (NICHT bindend, kein Code heute danach ausrichten)
- BULK-/CSV-STREAMING (Presigned Uploads, zeilenweise Verarbeitung, keine Volllast in
  RAM): Pagesmith hat heute KEINEN Bulk-Import/Export-Pfad. TRIGGER: sobald das
  Lead-Enrichment-Modul (Zukunfts-Roadmap) real umgesetzt wird.
- QUEUE-TOOLS / ASYNC-INFRASTRUKTUR (Inngest, Upstash, Database-Webhooks, Edge
  Functions für Hintergrundarbeit): heute existiert EIN async-Kandidat (CAPI), der
  bewusst so gebaut ist, wie er ist. TRIGGER: sobald ein ZWEITER unabhängiger
  Async-Anwendungsfall entsteht — keine Infrastruktur auf Verdacht bauen.
- REALTIME/WEBSOCKET-DISZIPLIN (RLS-gefilterte Subscriptions, aggregierte statt
  Event-per-Row-Pushes): Pagesmith hat heute KEIN Live-Dashboard-Feature. TRIGGER:
  sobald ein Realtime-/Live-Dashboard-Feature geplant wird.

## Security Manifest & Launch Blocker (Tier-Übersicht)
Launch-Blocker, sequenziert nach dem Moment, in dem das Risiko real BEISST (nicht alles ist
P0). Diese Datei trägt die Tier-Übersicht: pro Item Tragende Kontrolle + BINDET-AN.
VOLLFASSUNG (die vier Begründungsfelder je Item — RISIKO / TRAGENDE KONTROLLE / EHRLICHE
EINORDNUNG / BINDET-AN): docs/claude-history/security-manifest-full.md.
DER STATUS JE ITEM STEHT IN BEIDEN FASSUNGEN UND MUSS DECKUNGSGLEICH SEIN. Er ist NICHT
das Unterscheidungsmerkmal — die Regel "beide Fassungen IMMER im selben Commit ändern" ist
genau der Mechanismus, der die Deckungsgleichheit sichert, keine Formsache. Sie ist einmal
verletzt worden: der KILL-SWITCH stand in der Vollfassung als offener Blocker, während er
längst gebaut und live verifiziert war.
WAS DIE FASSUNGEN UNTERSCHEIDET — die Aufteilung ist NICHT "kompakt vs. voll": DIESE Datei
trägt zusätzlich die OPERATIVEN ARTEFAKTE für den Ernstfall (das SQL-Runbook zum Sperren/
Entsperren/Auflisten, die Verifikations-Lektionen, die offenen Betriebs-Punkte), weil
CLAUDE.md jede Session geladen ist und im Ernstfall ohne Suchen auffindbar sein muss. Die
VOLLFASSUNG trägt die vier Begründungsfelder je Item.

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH (höchste Prio): GEBAUT, LIVE VERIFIZIERT. Projektbasierte Sperre
  (projects.blocked_at; domains.blocked_at additiv vorbereitet + im Serve-Check schon
  mitgeprüft, operativ noch nicht gesetzt), FAIL-CLOSED, 451 + statische Erklärseite im
  Serve-Pfad, Ingest-Stop in /api/e (früher Verwurf VOR Token-Lookup, spart die
  Token-Query). Migration 0008, Serve-Resolver auf ServeResult-Union (ok/blocked/notfound).
  LIVE-SMOKE VOLLSTÄNDIG BESTANDEN (4/4): (1) 451-Anzeige bei Sperre, kein Content;
  (2) Isolation — paralleles ungesperrtes Projekt blieb durchgehend 200; (3) Ingest-Stop
  ECHT bewiesen: identischer Request/Format gegen gesperrtes vs. entsperrtes Projekt ergab
  in BEIDEN Fällen HTTP 204 (bewusst gleich, kein Leak), aber nur im entsperrten Fall
  erschien das Event im Meta Events Manager (eventID-Abgleich bestätigt), im gesperrten
  Fall NICHTS; (4) Reversibilität nach Entsperren bestätigt. BINDET-AN: Serving existiert
  (7a/7c-1) -> erledigt, vor erstem Fremd-Traffic.
- KILL-SWITCH — LEKTION (Manifest, nicht nur Chat): identischer HTTP-Status bei /api/e ist
  HIER bewusstes Sicherheitsdesign (Sperre von "unbekannter Key" nicht unterscheidbar),
  KEIN Testfehler. Verifikation dieses Pfades MUSS über die NACHGELAGERTE Wirkung laufen
  (Meta Events Manager: kommt etwas an oder nicht), NICHT über den Statuscode allein — ein
  curl-Status-Vergleich beweist hier nichts. (Zusatz: ein 400 an /api/e beweist ebenfalls
  nichts über die Sperre — die Pflichtfeld-Validierung {trackingKey,eventID,event} greift
  VOR dem blocked_at-Check; falsche Feldnamen ergeben immer 400, sperr-unabhängig.)
  ZWEI ACHSEN, ZWEI PRÜFUNGEN (ergänzt 2026-07-29): SERVE antwortet 451 mit Erklärseite,
  INGEST antwortet leer mit 204 — beides ist korrekt und beides ist DERSELBE Kill-Switch.
  In Live-Test-Anleitungen gehören sie als ZWEI getrennte Prüfungen aufgeführt, sonst liest
  sich das erwartete 204 wie ein fehlendes 451. Anlass: die zusammengezogene Formulierung
  hat jetzt in ZWEI Phasen den Verdacht eines Bugs erzeugt, obwohl das Verhalten korrekt
  ist. Der Sachverhalt selbst steht oben — neu ist nur die Auflage an die Anleitung.
- KILL-SWITCH — SQL-RUNBOOK (im Ernstfall auffindbar; bewusst hier in der Root-Doku statt
  in separater Datei, da CLAUDE.md jede Session geladen wird). Sperren:
  ```sql
  -- per project_id
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = '<PROJECT_UUID>' and blocked_at is null;
  -- per Label (publayer.net-Subdomain)
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = (select project_id from public.domains where label = '<LABEL>') and blocked_at is null;
  -- per Custom-Host
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = (select project_id from public.domains where custom_host = '<HOST>') and blocked_at is null;
  ```
  Entsperren:
  ```sql
  update public.projects set blocked_at = null, blocked_reason = null where id = '<PROJECT_UUID>';
  ```
  Alle gesperrten Projekte auflisten:
  ```sql
  select p.id, p.name, p.blocked_at, p.blocked_reason,
         array_agg(d.label)       filter (where d.label is not null)       as labels,
         array_agg(d.custom_host) filter (where d.custom_host is not null) as custom_hosts
  from public.projects p left join public.domains d on d.project_id = p.id
  where p.blocked_at is not null group by p.id order by p.blocked_at desc;
  ```
- KILL-SWITCH — OFFENER PUNKT (unverändert aktuell): ABUSE-KONTAKTADRESSE
  (NEXT_PUBLIC_ABUSE_CONTACT) bleibt bewusst LEER, bis publayer.net MX-Records hat -> die
  Kontaktzeile der 451-Seite entfällt bis dahin (getrimmt). Beim Live-Gang befüllen (bindet
  an den ABUSE-KANAL-Blocker unten).
- E-MAIL-BESTÄTIGUNG wieder aktiv: Double-Opt-in in Supabase Auth (Dashboard-Toggle).
  BINDET-AN: öffentlicher Launch.
- KOSTEN-CIRCUIT-BREAKER: SUPABASE ERLEDIGT (2026-07-29, mit dem Pro-Wechsel: Spend Cap $25
  HART, Alarm bei 80 %). VERCEL bleibt HOBBY und deckelt damit weiterhin STRUKTURELL — kein
  Überverbrauch, kein abrechenbarer Eskalationsweg, der Schaden wäre ein harter Stopp statt
  einer Rechnung. KEIN pauschales "erledigt" über beide Plattformen: der Trigger ist genau
  dort eingetreten, wo der Plan gewechselt hat. WIEDERVORLAGE: sobald Vercel auf Pro geht,
  wird der Cap dort SOFORT fällig — dann kippt die strukturelle Deckelung, die ihn heute
  ersetzt.
- ABUSE-KANAL + security.txt: /.well-known/security.txt (RFC 9116) auf beiden Origins +
  überwachtes Abuse-Postfach. BINDET-AN: Go-Live der Hosting-Schicht.
- SUBPROZESSOR-DPAs + Kunden-DPA: Vercel/Supabase-DPAs signiert + signierbarer Kunden-DPA
  (AVV-Generator ist Post-Launch-Feature, kein Blocker). BINDET-AN: öffentlicher Launch
  mit echten Kundendaten.

### Tier 1 — Vor echtem Ad-Traffic / Spend (nicht vor dem ersten Login)
- PER-TENANT-RATE-LIMITING /api/e + /api/capi: Limit pro trackingKey/Projekt, auf ABUSE
  kalibriert (nicht auf Erfolg — sonst fallen echte Conversions weg). BINDET-AN: vor
  echtem Ad-Traffic auf gehostete Seiten.
- LOGIN-BRUTE-FORCE: Rate-Limit auf IP + E-Mail (zuerst Supabase-Built-in prüfen).
  BINDET-AN: sobald Accounts echte Assets (Tokens/Domains) haben.
- SAFE-BROWSING: Redirect-ZIEL-URLs gegen Safe Browsing prüfen + publayer.net-Flag
  überwachen (KEIN HTML-Content-Scan, Kategoriefehler). BINDET-AN: Fremd-Content live.
- SHARED-REPUTATION publayer.net: Kill-Switch zur Isolierung + riskante Nutzer auf
  Custom-Domains (eigener eTLD+1) schieben. BINDET-AN: Multi-Tenant-Serving live;
  mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION: ERLEDIGT (2026-07-29, mit dem Pro-Wechsel aktiviert —
  Supabase-HaveIBeenPwned-Abgleich läuft). War Pro-gated; der Trigger "Pro-Tier" ist
  eingetreten und wurde im selben Zug abgearbeitet.
- ENCRYPTION-AT-REST CAPI-Token: tragend bleibt Isolation + RLS-SELECT-Sperre +
  service_role-only (Token physisch write-only); Verschlüsselung nur Defense-in-Depth
  (In-DB-Key = Theater, echtes Envelope braucht KMS). BINDET-AN: Härtung nach Launch.
- VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG: Token minimal scopen + jede
  Domain-Mutation mit Actor + Zeit protokollieren. BINDET-AN: 7c-2.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- LOGGING-LEAK (herabgestuft von Tier 0, gemessen 2026-07-24): In PRODUKTION wird das
  setCapiToken-Server-Action-Argument NICHT geloggt — Differenztest in Vercel-Prod-Logs mit
  Positivkontrolle (POST-Zeilen zum Aufrufzeitpunkt vorhanden, Aufruf lief durch), die Token-Sonde
  taucht in KEINER Zeile auf; Log-Drains sind Pro-gated und keine konfiguriert -> Logs verlassen
  Vercel nicht. Die 2a-Beobachtung war das Dev-Terminal (next dev). KEINE Token-Rotation nötig. Der
  strukturelle Fix (Token nicht als Action-Argument) bleibt Defense-in-Depth. Restrisiken:
  Fehlerpfad ungetestet, lokales Dev-Terminal. BINDET-AN: laufend (Defense-in-Depth), nicht mehr
  Launch-Gate. WIEDERVORLAGE: Der Befund gilt für den HEUTIGEN Code — setCapiToken ist die EINZIGE
  Server Action mit Secret-Parameter (erhoben 2026-07-24). Bei JEDER neuen Server Action mit
  Secret-Parameter neu bewerten.
- DEPENDABOT: ERLEDIGT (2026-07-24: Alerts, Security Updates, Dependency Graph aktiv, 1 Regel).
- BACKUPS + Restore-Drill (TEILWEISE ERLEDIGT — Backup-Tier steht, DRILL WEITERHIN OFFEN):
  BACKUP-TIER BESTÄTIGT (2026-07-29): Supabase auf PRO -> TÄGLICHE Backups, 7 Tage Retention.
  Die frühere Einordnung "Free hat GAR KEINE Backups" ist überholt und wurde ersetzt, nicht
  nur ergänzt.
  DREI DINGE BLEIBEN OFFEN — sie sind der Grund, warum der Punkt nicht abgehakt wird:
  (1) DER DRILL IST NICHT GEFAHREN. Ein ungetestetes Backup ist kein Backup; ein Backup-Tier
      zu BUCHEN und einen Restore zu KÖNNEN sind zwei verschiedene Aussagen.
  (2) PITR IST NICHT GEBUCHT -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem letzten
      täglichen Snapshot). Bewusste Entscheidung; sie muss aber SICHTBAR bleiben, sonst liest
      sich "tägliche Backups" wie Lückenlosigkeit.
  (3) DIE ensure_rls-REBUILD-LÜCKE BESTEHT UNVERÄNDERT: der Event-Trigger hängt am CLUSTER und
      steckt in keinem Schema-Dump — das Upgrade ändert daran nichts (s. "## Offene Punkte").
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
  ÜBERHOLT, HISTORISCH: der manuelle pg_dump war die ZWISCHENLÖSUNG für den Free-Zustand
  (Stand VOR 0018, damit nicht wiederherstellungstauglich). Er ist mit dem Pro-Wechsel kein
  tragender Bestandteil mehr — Details, Provenienz und der Wiedervorlage-Grundsatz stehen in
  der Vollfassung.
- DATA-RETENTION: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren; heute nur
  sicherstellen, dass Server-Logs keine IPs horten. BINDET-AN: Phase 8. — Präzisierung:
  Phase 8 Scheibe 1 löst die 30-Tage-Pflicht NICHT aus (es wird KEIN IP/UA persistiert); sie
  bindet erst an die Scheibe, die IP/UA einführt (Bot-Filter/Uniques). Heute NICHT fällig.
  WECHSELWIRKUNG fürs spätere events-Pruning: löscht ein Retention-/Aggregations-Pruning die
  ERSTE verankerte source='browser'-Bestätigung eines Projekts, springt der selbstheilende
  Stichtag der Adblocker-Verlustrate nach vorn -> die angezeigte Rate ändert sich RÜCKWIRKEND
  und STILL. Pruning muss die Verlustraten-Verankerung berücksichtigen.
- MCP-SICHERHEIT: scoped Tokens (nie globale Master-Rechte) + lückenloses Audit-Logging
  aller KI-induzierten Mutationen. BINDET-AN: Phase 10.

## Projektstruktur
- src/app/         Next.js App Router (Pages, API-Routes)
- src/components/   React-Komponenten
- src/lib/         Logik ohne UI (Detection, später Transformation, Clients)

## Code-Konventionen
- TypeScript strikt, keine `any` ohne guten Grund.
- Reine Logik (Detection, Mapping-Transformation) gehört in src/lib/ und ist
  unit-testbar, getrennt von den React-Komponenten.
- Client-Komponenten nur wo nötig ("use client"), sonst Server-Komponenten.
- Aussagekräftige, kleine Commits — Build-in-Public, der Verlauf wird gelesen.

## UX- & Design-Prinzipien (gelten bei JEDER Iteration)
- Dünnes, aber echtes Design-Fundament: Design-Tokens (kleine Palette, ein
  Font-Pairing, eine Spacing-Skala) statt Default-Tailwind-Look.
- Wiederverwendbare Primitive (Button, Panel, Badge) statt copy-paste-Styles.
- Konsistenz vor Verzierung. Keine vorzeitige Politur (Animationen, Onboarding,
  Dark-Mode) bevor der Kern-Loop steht.
- UX-Aufwand fließt ins HERZ des Produkts: "Click & Connect" muss sich direkt,
  sichtbar und fehlertolerant anfühlen.
- Marketer-Mindset: Geschwindigkeit und "1 Klick" über Konfig-Tiefe.

## Immer beachten
- DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER "IST DIESES PROJEKT LIVE?"
  (Phase 9, live gefundener Fehler 2026-07-27): settings.hosting.label ist ein
  SPIEGEL, keine Quelle. Grund: settings ist CLIENT-besessen (saveProject
  ersetzt es GANZHEITLICH), die Auslieferung hängt aber allein an der
  domains-Zeile (resolve.ts matcht sie). Wer den Publish-Status aus settings
  ABLEITET, baut zwei ungekoppelte Wahrheiten — real passiert: das UI zeigte
  "veröffentlicht ✓" mit klickbarer URL, während die Zeile fehlte und die Seite
  dauerhaft 404te. publishProject liest das Label deshalb aus der Zeile
  (project_id + custom_host IS NULL, ORDER BY created_at) und stellt sie bei
  Bedarf mit DEM ALTEN Label wieder her — abgeleitet, nicht erfunden, damit die
  URL stabil bleibt. Gehört einem FREMDEN Projekt dieses Label (23505 auf dem
  PK), wird fail-closed abgebrochen: NIE stillschweigend eine neue Adresse
  vergeben, laufende Ads zeigten sonst weiter auf die tote alte.
  MESSFALLE bei jeder Divergenz-Prüfung: ein JOIN auf domains OHNE
  "and custom_host is null" zieht auch Custom-Host-Zeilen mit und meldet
  Projekte mit Custom-Domain fälschlich als divergent (real passiert). Die
  Label-Zeile ist die mit custom_host IS NULL.
  Volle Herleitung: docs/claude-history/phase-7-hosting.md.
- APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI (gehoben aus der abgeschafften
  Reviewer-Checkliste): project_tokens UND audit_logs tragen bewusst KEINE
  SELECT/UPDATE/DELETE-Policy — Zugriff ausschliesslich ueber service_role. Eine neue
  Policy auf einer dieser Tabellen ist KEINE Kleinigkeit, sondern bricht eine tragende
  Garantie: bei project_tokens das write-only-Gate auf den CAPI-Token (s. "GRANTS
  SCHUETZEN NICHTS"), bei audit_logs die Unveraenderlichkeit UND das Rate-Limit, das
  seine Zaehlgrundlage aus genau diesem Log zieht (lib/domains/audit.ts). Wer dort eine
  Policy ergaenzt, macht das Audit faelschbar und das Limit umgehbar.
- AUDIT-LOG-DISZIPLIN: GENAU EIN Eintrag pro Mutations-AUFRUF, auch bei frueher
  Ablehnung — geschrieben aus einem finally, damit kein Ausgang ihn verliert (Muster:
  register.ts / remove.ts). Nie Doppel-Feuern (verfaelscht das Rate-Limit), nie
  Verschlucken (der Vorgang wird unsichtbar). writeAuditLog wirft bewusst nicht weiter:
  ein Log-Fehler darf den eigentlichen Mutations-Ausgang nicht kippen.
- TEST-DISZIPLIN: DISKRIMINIEREND STATT BREIT GEMOCKT (gehoben aus der abgeschafften
  Reviewer-Checkliste): Jeder Test muss bei einer echten Regression WIRKLICH rot werden —
  im Zweifel per Mutationsprobe belegen, nicht annehmen. ZU BREITES MOCKEN ist die
  haeufigste Ursache hohler Tests: wer die Funktion wegmockt, die den Bug traegt, prueft
  nur noch den Mock (real aufgetreten: im Dispatch-Test MUSS die echte extractLabel
  laufen, sonst faengt er den 7c-2a-Rueckfall nicht). Verwandt und schaerfer:
  "TESTDATEN UND TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD TREFFEN" unten.
- MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE — SECHS LEKTIONEN (Phase 9, mehrfach
  live aufgetreten; (e) und (f) aus Phase 10): Ergänzt TEST-DISZIPLIN oben um
  konkrete Fallstricke, die erst eine scharfe Mutationsprobe bzw. ein genau
  gelesener Live-Test sichtbar macht.
  (a) DREIWERTIGE LOGIK MACHT EINE TS-PORTIERUNG BLIND: Hängt eine
      Entscheidung an SQL-NULL-Semantik (ein Vergleich gegen NULL verwirft
      die Zeile), verhält sich eine reine TypeScript-Nachbildung anders — ein
      Vergleich gegen null liefert dort schlicht wahr oder falsch, die Zeile
      bleibt bestehen, wo SQL sie aussortiert hätte. Eine solche Mutation
      lässt sich über einen Unit-Test auf der Portierung NICHT fangen; der
      Beweis muss über einen Wächter auf dem echten SQL-Text plus den
      Live-Test laufen.
  (b) EINE MUTATION, DIE GRÜN BLEIBT, HAT ZWEI MÖGLICHE URSACHEN, DIE NICHT
      VERWECHSELT WERDEN DÜRFEN: entweder prüft der Test schlicht nichts
      Relevantes — oder die Mutation selbst ist ein SCHLECHTES MODELL des
      Fehlers, den sie erzeugen sollte (Fall (a) ist ein Beispiel dafür).
      Beides verlangt Anhalten und Nachdenken, nicht dieselbe Reparatur. Bei
      einem hohlen Wächter (ein zu weit gefasster Text-Ausschnitt trifft eine
      andere Stelle als die gemeinte) wird die WURZEL behoben — der
      Ausschnitt selbst —, nicht die Assertion enger geschrieben.
  (c) EIN GROBES LIVE-TEST-INSTRUMENT (Offline schalten, eine Sperre setzen,
      einen Netzabbruch simulieren) REISST OFT DIE VORAUSSETZUNG DESSEN MIT,
      WAS ES EIGENTLICH PRÜFEN SOLL: ein anderer Kanal meldet sich zuerst,
      und der eigentlich gemeinte Prüfschritt gilt fälschlich als bestanden,
      obwohl er nie erreicht wurde. Bei jedem Live-Test-Schritt fragen:
      welche Voraussetzung reisst das gewählte Instrument mit, und prüft der
      Schritt wirklich nur die eine Achse, die er zu prüfen behauptet?
  (d) EIN WÄCHTER, DER ÜBERWIEGEND ABWESENHEIT PRÜFT (kein security definer,
      kein Tabellen-DDL, kein neuer Index), BRAUCHT EINE EIGENE
      POSITIVKONTROLLE: ohne sie sind ein echter Nicht-Treffer und ein
      kaputt gewordener Wächter am Ergebnis nicht zu unterscheiden — gerade
      bei sicherheitsrelevanten Klauseln ist ein stiller Durchlass teuer.
  (e) EIN BESTANDSTEST SCHÜTZT NUR DIE ZUSTÄNDE, DIE SEINE FIXTURE HERSTELLT.
      Eine neue Bedingung erzeugt NEUE Zustände, und darin sind die alten Tests
      blind — auch wenn sie genau die Stelle adressieren, die man ändert. Ein
      neues Element wird deshalb IN DEM ZUSTAND geprüft, DEN ES HERSTELLT, nicht
      nur im Ruhezustand. BELEG (Phase 10): Die Annahme, ein Signaltext IM
      Reiter-Button breche die fünf verankerten Reiter-Abfragen, war falsch —
      in deren Fixtures leuchtet das Signal nie, der zugängliche Name bleibt
      unverändert. Der Fehlgriff wäre im gesamten Bestand unsichtbar geblieben.
  (f) WIRD EINE FEHLERKLASSE VON GENAU EINEM TEST GEFANGEN, GEHÖRT DAS IN SEINEN
      KOMMENTAR. Sonst entfernt ihn jemand später als vermeintlich redundant und
      nimmt damit die einzige Abdeckung mit. Nach jeder Mutationsrunde zählen,
      welcher Test gefallen ist — bleibt es bei EINEM, ist der Test ein
      Einzelstück und wird als solches benannt. BELEG (Phase 10, zweimal): der
      Struktur-Test der Reiter trägt allein zwei Fehlerklassen; der Wächter für
      den zugänglichen Namen der Reiter ist der einzige Test, der das Signal
      überhaupt zum Leuchten bringt.
  Herleitung mit den konkreten Fundstellen: docs/claude-history/phase-9-ab-testing.md
  bzw. docs/claude-history/phase-10-workspace.md.
- COMMIT-KONVENTIONEN: Conventional-Commit-Format type(scope): message (feat, fix, docs,
  chore, refactor). docs(claude)-Commits bleiben GETRENNT von feat/fix-Commits — der
  Verlauf wird gelesen, und eine Doku-Aenderung im Feature-Commit ist spaeter nicht mehr
  auffindbar. Vor JEDEM Push git status/git diff auf versehentliche Secrets/.env-Inhalte
  pruefen. Taucht eine Migration im Diff auf, gilt zusaetzlich die
  Migration-VOR-Code-Deploy-Reihenfolge (eigene Regel unten).
- TESTDATEN UND TEST-SEQUENZ MÜSSEN DEN PRODUKTIVEN PFAD TREFFEN (Phase 9, zwei live
  gefundene Fehlschläge): (1) DATENLAGE: der 9a-Umschalt-Test gab A und B bewusst
  UNTERSCHIEDLICHES HTML, um die Ableitungskette maximal sichtbar zu machen — und sparte
  damit ausgerechnet den Normalfall aus, den das Produkt selbst erzeugt (createVariantB
  kopiert byte-genau; eine reine Text-Änderung lässt den Code unangetastet). Der Bug lebte
  exakt dort. (2) SEQUENZ (die schärfere Ebene): der erste Fix-Versuch bekam einen Test, der
  die divergenten Zustände als PROPS beim Mount seedete — die Divergenz existierte damit
  schon beim ersten Umschalten, und der Test lief durch den funktionierenden Pfad. Der echte
  Ablauf erzeugt sie erst DANACH (umschalten -> editieren -> speichern -> zurückschalten).
  Der Fix wäre grün gewesen und hätte den Bug INTERMITTENT gemacht — die unangenehmste
  Bug-Klasse. REGEL: Bei jedem Test gegen einen Zustandswechsel zuerst fragen, welche
  Datenlage der produktive Pfad erzeugt UND durch welche SCHRITTFOLGE sie entsteht — maximal
  unterscheidbare Fixtures und vorgeseedete Endzustände sind bequem und verfehlen die reale
  Konstellation systematisch. Herleitung: docs/claude-history/phase-9-ab-testing.md,
  Abschnitt zur Scheibe 9a (NACHTRAG-Block zum live gefundenen Bug).
- CLIENT-SEITIGE SERVER-ACTION-AUFRUFE: KEIN WURF BLEIBT UNBEHANDELT — safeAction IST
  PFLICHT, WO UI-ZUSTAND DARAN HÄNGT (Fix-Scheibe 2026-07-27, Bestand gemessen 2026-07-28).
  GRUND (ohne ihn wird die Regel als überflüssig wegoptimiert): result.ok unterscheidet nur
  {ok:true} von {ok:false} — beides sind RÜCKGABEWERTE. Ein Netzwerk- oder Serverfehler
  liefert eine EXCEPTION: sie verlässt den Handler, jede Zeile ab der if-Prüfung entfällt,
  der Busy-State wird nie zurückgesetzt. Ergebnis: keine Meldung UND der Button blockiert
  den ZWEITEN Versuch. Der einzige Ausweg wäre ein Reload — und genau der vernichtet die
  Arbeit.
  UNTERGRENZE (gilt ausnahmslos): Kein client-seitiger Server-Action-Aufruf lässt einen Wurf
  unbehandelt. Nie.
  PFLICHT-FALL: Hängt am Aufruf ein UI-ZUSTAND — ein Busy-/Lade-Flag, das freigegeben werden
  muss, oder ein Fehlerkanal, der gefüllt werden muss —, läuft er über safeAction(run,
  onThrow) aus src/lib/safe-action.ts. Ein handgeschriebenes .catch() genügt dort NICHT: ihm
  fehlt der unstable_rethrow-Riegel, und eine Action mit Weiterleitung würde still
  verschluckt. Den Ersatzwert stellt der AUFRUFER, weil die Domain-Actions zusätzlich ein
  reason-Feld verlangen; TypeScript prüft ihn gegen den echten Rückgabetyp — ein vergessener
  Ersatzwert bricht den BUILD statt die Laufzeit.
  ERLAUBTER MINIMALFALL: Hängt KEIN UI-Zustand daran und ist der Leer-Wert bereits das
  richtige Verhalten (reine Lade-Effekte wie getEventCounts, getAdblockLoss,
  getVariantBPublished), genügt .catch() auf den Leer-Wert ([] bzw. null). safeAction ist
  dort EBENFALLS ZULÄSSIG — stärkeres Werkzeug als nötig, kein Verstoß. Die Erlaubnis gilt
  NUR in diese Richtung.
  DIE ACHSE IST NICHT "LESEN VS. SCHREIBEN" UND NICHT "HANDLER VS. EFFEKT" (beides am
  Bestand widerlegt, deshalb ausdrücklich benannt): Der LESER listProjectDomains läuft über
  den Wrapper, weil ein Fehlerkanal daran hängt — in DomainManager.tsx sowohl aus dem
  Handler-Kontext (loadList nach Hinzufügen/Entfernen) als auch aus einem LADE-EFFEKT beim
  Projektwechsel, der bewusst "Laden fehlgeschlagen" anzeigt, weil "leer" und "kaputt" nicht
  gleich aussehen dürfen. Nicht wer den Aufruf auslöst entscheidet, sondern ob ein Zustand
  zurückzusetzen oder eine Meldung zu zeigen ist.
  DREI NEBENBEDINGUNGEN, ohne die der Wrapper Schaden anrichtet:
  (i)   PRIMÄRERFOLG WIRD IMMER ZUERST QUITTIERT, dann der Folge-Refresh. Wirft listProjects
        nach einem erfolgreichen Save, darf das den Erfolg nicht in einen Fehler umkehren —
        "Fehler trotz Erfolg" ist schlimmer als vorher.
  (ii)  KONTROLLFLUSS-WÜRFE WERDEN DURCHGELASSEN (unstable_rethrow aus next/navigation).
        redirect()/notFound() sind Signale, kein Fehler.
  (iii) DER WRAPPER LOGGT NICHTS. Er ist generisch und weiß nie, was im Closure liegt — am
        CAPI-Pfad ist es der Klartext-Token. Das reale Risiko ist nicht das Argument (er
        sieht nur einen Thunk), sondern ein weitergereichtes Error-OBJEKT, das den Token
        bereits trägt. Logging am Aufrufer AUSSCHLIESSLICH über errorName(err) aus
        src/lib/errors.ts.
  MELDUNGSTEXTE behaupten WEDER URSACHE NOCH ERGEBNIS: "keine Verbindung" wäre eine Ursache,
  die wir nicht kennen; "wurde nicht ausgeführt" ein Ergebnis, das wir nicht kennen (bricht
  die Verbindung auf dem RÜCKWEG, ist der Write passiert). Die Entwarnung "deine Änderungen
  sind noch da" gilt NUR auf Speicherpfaden — beim Löschen wäre sie eine falsche Beruhigung.
  Herleitung + Live-Nachweis: docs/claude-history/phase-9-ab-testing.md, Abschnitt
  "Fix-Scheibe safeAction".
- DIFF-VORLAGE = GEZIELTE VERIFIKATION, NICHT VOLLTEXT-PFLICHT (Review-Kalibrierung, 2026-07-23):
  Nach jedem Bau wird die Vorlage für das Review dreistufig geliefert — Grundsatz: nichts wird
  stillschweigend durchgewunken, aber nicht alles muss im Wortlaut fließen (Volltext-Diffs fressen
  das Chat-Kontingent und erzwingen Umzüge).
  (1) IMMER IM VOLLTEXT: jedes Migrations-SQL Zeile für Zeile (EINE Klausel entscheidet über
      Tenant-Isolation — security definer, fehlendes set search_path, zu weite using-Klausel;
      Selbstauskunft wie "ist INVOKER" reicht NIE); jeder HUNK, an dem eine benannte Invariante
      hängt (der Hunk, nicht die Datei); neue sicherheitsnahe Logik (Ingest-Kontrollfluss, RLS, Auth).
  (2) ALS NACHWEIS: git status --short / git diff --stat als Scope-Beweis (welche Dateien — und
      explizit welche NICHT, z.B. "ingest.ts/meta.ts/generate.ts nicht dabei"); git diff -w für
      Byte-Identität bei reinen Umschließungen; gezielter Grep ("Datei X nicht im Diff", "Wort Y
      kommt nicht vor"); Testausgabe + Mutationsproben-Ergebnis.
  (3) AUF BERICHT: rein additive Tests und UI-Trivialitäten — unter der PFLICHT, jede Abweichung
      vom freigegebenen Plan unaufgefordert zu deklarieren.
  Der Reviewer benennt im GO ausdrücklich, was er NICHT im Wortlaut gelesen hat. Der Hebel liegt im
  PLAN-Review (Stufe 1 wird immer vollständig gelesen — der Scheibe-B-Stichtags-Fehler stand im
  Plan, nicht im Diff); das Diff-Review verifiziert danach nur noch Gebautes == Freigegebenes.
  Lange Vorlagen als Text direkt in die Antwort, als EIN Block — NICHT stückeln: wer stückelt,
  entscheidet selbst über die Schnittkanten, und ein verlorener Teil fällt niemandem auf. Der
  Bericht beginnt mit einer UMFANGS-ANSAGE ("deckt Aufträge X-Y ab"), damit ein fehlender
  Abschnitt beim LESEN auffällt statt beim Nachzählen. Nie als Datei-Anhang (kommt leer an).
- Erst der nutzbare Kern, dann Infrastruktur.
- Importierter User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts",
  niemals allow-same-origin), nie ungesandboxt.
- HISTORIE-CHECK VOR EINGRIFF IN KERN-DATEIEN (Regressions-Schutz, gilt bei JEDEM Plan): CLAUDE.md ist
  bewusst gekürzt; das WARUM abgeschlossener Phasen liegt in docs/claude-history/*. Wenn ein Plan eine
  BESTEHENDE Kern-/geteilte Datei modifiziert oder erweitert (z.B. ingest.ts, resolve.ts, host.ts,
  app-serve/route.ts, generate.ts, domain-actions.ts, die Middleware/Proxy-Schicht), gilt VOR dem
  Bauen:
  (1) CODE-FIRST, HISTORY-FOR-WHY: Wahrheitsanker ist immer der AKTUELLE echte Code der berührten
      Datei (History kann veralten) — zuerst den echten Code lesen. Die passende History-Datei wird
      NUR zusätzlich gelesen, um das WARUM zu klären (die Invariante, die der Code allein nicht
      verrät). GEZIELT die thematisch passende Datei, NICHT die ganze Historie (das würde das Kürzen
      der CLAUDE.md ad absurdum führen).
  (2) INVARIANTE NENNEN, NICHT ZUSAMMENFASSEN: Der Plan benennt die konkrete geschützte Regel
      explizit (z.B. "/api/capi-Alias bleibt bestehen, Persist hängt nur daneben"), statt die Doku
      allgemein zu referieren — nur so ist der Check sichtbar und prüfbar.
  (3) ADDITIV-VS-INVASIV-DEKLARATION: Der Plan erklärt PRO berührter Kern-Datei ausdrücklich, ob der
      Eingriff rein additiv ist oder bestehende Pfade angreift. Bei invasivem Eingriff: Begründung,
      warum das etablierte, getestete Verhalten erhalten bleibt.
  (4) SCOPE DER REGEL: greift NUR bei Eingriff in bestehende Kern-/geteilte Dateien, nicht bei jeder
      trivialen neuen Datei. Erste Verteidigungslinie bleibt diese "Immer beachten"-Sektion (immer
      geladen); die History ist die zweite, tiefere Linie fürs WARUM.
  Verweis auf die Archiv-Landkarte: die Zuordnung Thema -> History-Datei steht unter
  "## Detail-Archiv".
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits in freier
  Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL fest eingebacken
  und beaconen weiter dorthin. Neue Exporte/gehostete Seiten nutzen /api/e (geteilter
  Handler, lib/capi/ingest.ts). Entfernen der capi-Route bricht STILL das Tracking aller
  schon ausgelieferten Kundenseiten (kein Fehler, nur verschwundene Conversions).
- GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT (gemessen 2026-07-24): anon,
  authenticated UND service_role haben per Supabase-Default volle DML-Rechte auf ALLE public-
  Tabellen, auch auf project_tokens. Das "heiligste Gate" (CAPI-Token write-only, auch für den
  Owner) hält ALLEIN dadurch, dass project_tokens RLS aktiv hat und KEINE SELECT-Policy trägt. Eine
  neue Tabelle ohne "enable row level security" ist damit SOFORT für anon offen — und der anon-Key
  steckt im Client-Bundle jeder Seite. Das Sicherheitsnetz dagegen ist der Event-Trigger ensure_rls,
  der beim Rebuild aus den Migrationen NICHT entsteht (s. "## Offene Punkte"). Bei JEDER neuen
  Tabelle: RLS explizit aktivieren und Policies bewusst setzen, NIE auf den Trigger verlassen.
- HOST-ONLY-COOKIES AUF GETEILTEN WILDCARD-DOMAINS (Phase 9): Auf einer
  Serving-Domain, die als Wildcard mehrere Kundenprojekte gleichzeitig
  trägt, bekommt JEDES Cookie NIE ein explizites Domain-Attribut. Ein
  gesetztes Domain-Attribut (z.B. auf der geteilten Registrable Domain) gilt
  für ALLE Subdomains der Wildcard gemeinsam — ein Besucher, der bei Projekt
  X einen Wert erhält, trüge ihn stillschweigend zu Projekt Y mit. Auf einer
  Wildcard ist das der NORMALFALL, nicht ein Rand-Sonderfall, weil jedes
  Kundenprojekt dieselbe Registrable Domain teilt. Host-only (kein
  Domain-Attribut) bindet jedes Cookie an genau den Host, auf dem es gesetzt
  wurde, und verhindert diese stille Cross-Tenant-Kopplung der Messung.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- SET-COOKIE UND EINE ALS ÖFFENTLICH/CACHEBAR MARKIERTE ANTWORT VERTRAGEN
  SICH NICHT (Phase 9): Setzt eine Antwort ein besucherunterscheidendes
  Cookie, während sie gleichzeitig als public/cachebar ausgewiesen ist,
  entsteht die klassische Konstellation, in der ein geteilter Zwischen-Cache
  (CDN, Proxy) Antwort UND Cookie gemeinsam speichert und JEDEM
  nachfolgenden Besucher denselben gespeicherten Wert ausliefert — ein
  einzelner Erst-Besucher entscheidet dann stellvertretend für viele. Jede
  Antwort, die ein solches Cookie TATSÄCHLICH setzt, braucht private,
  no-store — und zwar NUR in dem Zweig, der wirklich setzt, damit Antworten
  ohne Cookie-Setzung ihr bisheriges Cache-Verhalten unverändert behalten.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- EIN SERVERSEITIG GELESENER COOKIE-WERT BLEIBT CLIENT-KONTROLLIERTE
  EINGABE (Phase 9): HttpOnly verhindert nur den Zugriff durch JavaScript im
  Browser — es verhindert NICHT, dass ein Aufrufer selbst einen beliebigen
  Cookie-Header setzt. Jeder serverseitig gelesene Cookie-Wert braucht
  deshalb Validierung VOR jeder Verwendung, genau wie jede andere
  Nutzereingabe. Das gilt VERSCHÄRFT vor einem Schreibpfad in
  Hintergrundcode (z.B. in after()), wo ein Bruch an einem
  DB-CHECK-Constraint NICHT als Fehler sichtbar wird, sondern die
  betroffene Zeile lautlos verschluckt — ein ungeprüfter Wert erzeugt dort
  einen stillen Datenverlust statt einer lauten Ablehnung.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- INGEST-204-CONTAINMENT (Sicherheitsregel, nicht bloß Defensive): /api/e bzw. handleIngest
  antwortet dem Client IMMER mit einer LEEREN 204 — nie ein Body, nie ein 500 — in JEDEM
  Pfad, auch bei Timeout/Abort/Body-Read-Fehler. GRUND (ohne ihn wird die Regel als
  "unnötig defensiv" wegoptimiert): ein 500 oder ein Body würde den Gültigkeitszustand des
  trackingKeys LEAKEN; 204-für-alles macht die Key-Existenz für einen anonymen Aufrufer
  unbeobachtbar (Enumeration-Schutz). Jede neue Fehlerbehandlung im Forward-/Ingest-Pfad
  MUSS innerhalb dieses Containments bleiben — auch das Fehler-Gerüst selbst (Timeout-
  Scaffolding, Body-Reads) darf nie nach außen werfen. AUSNAHME AUF ANDERER ACHSE (kein
  Widerspruch zum "IMMER 204"): ein strukturell kaputter Beacon (fehlende Pflichtfelder
  {trackingKey,eventID,event}) wird bewusst mit 400 VOR jedem DB-Zugriff abgewiesen — das
  ist ein CLIENT-Fehler, kein Zustands-Leak. Das 204-Containment schützt vor dem
  Key-Existenz-Leak bei GÜLTIGER Struktur; der 400-Guard ist die andere Achse. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL: der source-Wert in events beschreibt, WO ein
  Event beobachtet wurde (server vs. browser), NICHT an welches Werbe-Netzwerk es ging.
  'server' heißt server-beobachtet — egal ob der Forward zu Meta/CAPI oder später zu
  GA4/TikTok läuft. Ein späteres Tracking-ZIEL bekommt eine EIGENE additive Spalte; source
  NIE zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Verlustraten-Join.
  Die Werte sind PERMANENT (sie werden nie nachträglich transformiert) -> sie müssen ab
  Zeile 1 stimmen. MARKER-HYGIENE (Phase 8): der Client sendet NIE einen freien
  source-String, sondern nur einen ENG BEGRENZTEN Marker; den source-Wert (server/browser)
  setzt der SERVER — sonst könnte der Client die Analytics beliebig färben.
- KILL-SWITCH ALS EXPLIZITER, FAIL-CLOSED ZWEIG, nicht als Kopplungs-Nebeneffekt (Phase 8):
  Im Ingest wird ein gesperrtes Projekt (blocked) in einem EIGENEN sichtbaren Zweig VOR
  Persist UND Forward mit leerer 204 abgewiesen. Früher griff der Schutz nur als Nebeneffekt
  davon, dass der Persist im if(capiConfig)-Zweig hing — wer diese Kopplung löst
  (Meta-unabhängiger Traffic ab PageView), OHNE den expliziten blocked-Zweig, macht den
  Kill-Switch STILL fail-open. Bei jedem Umbau des Ingest-Kontrollflusses den expliziten Zweig
  erhalten. Herleitung: docs/claude-history/phase-8-analytics.md.
- isForwardable = NEGATIV-AUSSCHLUSS EINES RESERVIERTEN TOKENS, NIE Allowlist (Phase 8):
  TrackConfig.event ist ein FREIER Nutzer-String (jeder Custom-Event-Name via trackCustom ist
  erlaubt) -> eine Positiv-Allowlist der Forward-fähigen Events schnitte Custom-Conversions
  STILL vom CAPI-Forward ab. isForwardable schließt darum AUSSCHLIESSLICH den namespaced Token
  '__ps_pageview' aus (analytics-only, gehört nicht zu Meta), den nur unser eigener Emitter
  erzeugt. Ein zu breiter Ausschluss bricht STILL bestehende Conversions. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- BESTÄTIGUNGEN/CONFIRMS NIE AN META FORWARDEN (Phase 8, auf dem CAPI-Pfad): Das
  Adblock-Bestätigungs-Beacon (source='browser') trägt DIESELBE eventID wie die echte
  Conversion — würde es geforwardet, entstünde ein Duplikat bei Meta. Der Confirm-Pfad
  persistiert und returnt über einen FRÜHEN return, ohne je in den Forward-Block zu laufen
  (eigener Ausgang, kein Term in einem Guard). Bei Änderungen am Ingest-Forward mit Gegenprobe
  testen. Herleitung: docs/claude-history/phase-8-analytics.md.
- BEACON-keepalive PFLICHT (Conversion-/PageView-nahe Beacons): navigator.sendBeacon bzw.
  fetch({keepalive:true}) — solche Beacons gehen oft mit Form-Submit/Redirect/Seitenwechsel
  einher; ohne keepalive bricht der Browser den Request im Teardown ab und das Event bzw. die
  Bestätigung geht STILL verloren (fälschlich als Verlust gezählt). Detail:
  docs/claude-history/phase-8-analytics.md.
- DRITTANBIETER-SCRIPT-LADEPRÜFUNG am load/error-Event des SCRIPT-ELEMENTS, NIE am globalen
  Stub (Phase 8): Tracking-Snippets (Meta/GA4/TikTok) legen SYNCHRON ein globales Objekt +
  Queue + "loaded"-Flag an, BEVOR das echte Script nachlädt. Blockt ein Adblocker das Script,
  bleibt der Stub stehen -> `if (window.<lib>)` ist IMMER wahr -> eine Ladeprüfung darüber
  misst NICHTS ("grün aber falsch"). Verlässlich ist nur load/error am injizierten
  Script-Element. Volle Herleitung (fbevents, Fremd-Pixel, Surrogat-Blocker):
  docs/claude-history/phase-8-analytics.md.
- WORTWAHL DASHBOARD "NUR server-seitig erfasst", NIEMALS "gerettet" (Phase 8,
  Produkt-Ehrlichkeit): events protokolliert, was der SERVER BEOBACHTET hat — NICHT ob der
  CAPI-Forward bei Meta ankam (der 'Bad signature'-Bug hat gezeigt, dass Forwards still
  scheitern, während die Zeilen sauber weiterlaufen). "Gerettet" behauptet Empfang und lügt,
  wenn CAPI kaputt ist. Analytics-Zahlen als "mindestens X%" ausweisen (sie können in BEIDE
  Richtungen irren). Herleitung: docs/claude-history/phase-8-analytics.md.
- DARSTELLUNGS-EHRLICHKEIT BEI VERGLEICHSZAHLEN OHNE SIGNIFIKANZRECHNUNG
  (Phase 9): Werden zwei oder mehr Werte nebeneinander gezeigt, für die KEINE
  Signifikanz gerechnet wird, stehen ABSOLUTWERTE PRIMÄR und eine
  Rate/Prozentzahl höchstens SEKUNDÄR daneben — eine Prozentzahl allein
  verdeckt die Bezugsgrösse und wirkt bei einer kleinen wie bei einer grossen
  Stichprobe gleich überzeugend, obwohl die Aussagekraft radikal
  unterschiedlich ist. KEINE Sieger-Auszeichnung, KEINE Ampelfarben und keine
  Formulierung, die einer Option einen Vorsprung zuschreibt, wo keine
  Signifikanz vorliegt: das erzeugt Vertrauen, das die Zahlen nicht decken,
  und die Zielgruppe trifft mit genau solchen Zahlen echte
  Budget-Entscheidungen. Ebenso KEINE verdeckte Anzeige-Schwelle ("erst ab N
  Fällen anzeigen") als Ersatz für eine echte Signifikanzrechnung — das wäre
  ein verstecktes statistisches Urteil mit einer willkürlichen Konstante,
  ohne die Rechnung offenzulegen, die man damit eigentlich vermeiden wollte.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB (Phase 8, live widerlegt):
  projects.settings ist CLIENT-autoritativ — saveProject ersetzt es GANZHEITLICH. Eine
  server-vergebene Identität (z.B. der trackingKey), dort abgelegt, wird beim nächsten
  saveProject wortlos auf NULL zurückgekippt. Server-autoritative Werte gehören in eine EIGENE
  Spalte (projects.tracking_key), nicht in einen client-replaced Blob. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- KEIN SERVER-SEITIGES HTML-PARSING — server-seitige HTML-Injektion/Transformation ist eine
  REINE STRING-OP (Phase 7/8): Der Server injiziert z.B. den PageView-Emitter beim Publish per
  String-Suche (letztes </body>, case-insensitiv), NICHT über einen Parser. Cheerio ist
  bewusst NIE eingeführt worden (keine Dependency); die Client-Transformation läuft über
  DOMParser (Detection/Generate). Herleitung: docs/claude-history/phase-8-analytics.md.
- CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR (real aufgetreten, 2026-07-20): Ein
  CAPI-Zugriffstoken ist an eine bestimmte Meta-Dataset/Pixel-ID gebunden. Wird die ID
  gewechselt, MUSS ein zur neuen ID passendes Token neu generiert und gesetzt werden — das
  alte Token wird gegen die neue ID nicht mehr korrekt signiert. Symptom eines Mismatch:
  der Server-Forward scheitert mit code=190 / OAuthException / "Bad signature", WÄHREND die
  Browser-Pixel-Events unbeeinträchtigt weiterlaufen (der Browser-Pixel braucht kein Token).
  Das ist ein STILLER Fehlzustand: nichts schlägt sichtbar Alarm, weil Browser-Events
  durchkommen. VERIFIKATION daher IMMER über "Empfangen von: Server" im Events Manager
  (idealerweise als dedupliziertes Server-Event unter geteilter eventID), NIE über die bloße
  Anwesenheit von Browser-Events. Das describeMetaError-Ops-Logging im ingest.ts-Forward-
  Fehlerpfad macht solche Ablehnungen sofort lesbar (code/subcode/type/fbtrace/msg,
  sanitized). Hinweis: Das Token liegt in der DB (setCapiToken-Flow), nicht in einer
  Env-Var -> Token-Wechsel wirkt sofort, ohne Redeploy.
- KLICK-WIRING vs. Maustasten (Lektion, Phase-4-Bugfix): 'click' deckt NUR die linke
  Maustaste ab. Mittelklick feuert 'auxclick' (eigenes, separates Event), Rechtsklick
  ebenso -> bei JEDEM neuen Click-Wiring-Feature explizit prüfen, ob Mittelklick/Touch-
  Äquivalente mitbehandelt werden müssen (und bei auxclick event.button===1 gegen Rechtsklick-
  Ghost-Conversions guarden). Details: docs/claude-history/phase-4-mapping-codegen-export.md.
- "USE SERVER"-DATEIEN (Lektion, Phase-7c-2c-Bug): Next.js erlaubt in Dateien mit
  "use server" AUSSCHLIESSLICH async-Function-Exporte — kein Typ, kein Interface, keine
  Konstante darf ungeschützt mitexportiert werden. Jeder Typ-Import/-Export in einer
  solchen Datei MUSS import type/export type sein, sonst versucht der Server-Actions-
  Compiler, einen zur Laufzeit gelöschten Typnamen als Wert aufzulösen -> ReferenceError
  "X is not defined" beim Serverstart. Bei JEDER neuen Server-Action-Datei explizit prüfen.
  Ebenso verboten: "export * from" in einer "use server"-Datei — der Stern kann einen Typ
  unbemerkt als Wert mitexportieren und erzeugt denselben Fehler, nur ohne sichtbare
  Fundstelle.
- POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL (Lektion, 7c-2-Bug): JEDE Supabase/PostgREST-
  Query IMMER { data, error } destrukturieren, NIE nur { data } — sonst wird ein Fehler
  still verschluckt und die UI zeigt eine leere Liste statt einer Fehlermeldung. Und: vor
  der Nutzung eines Feldnamens den ECHTEN Primärschlüssel der Zieltabelle in der Migration
  nachsehen, nie aus dem Feldnamen "id" annehmen — der PK der domains-Tabelle ist label,
  NICHT id. Beides zusammen erzeugte den Bug: eine nicht-existente Spalte -> PostgREST-42703
  -> verschluckt -> still leere Liste.
- DB-FUNKTIONEN + SEARCH_PATH (Advisor-Regel, präzisiert nach Messung 2026-07-28): Jede neue
  DB-Funktion bekommt eine FIXIERTE search_path-Klausel (sonst flaggt der Supabase-Advisor
  "Function Search Path Mutable"). WELCHER Wert, hängt vom SICHERHEITSMODUS ab:
  - SECURITY INVOKER (Normalfall): `set search_path = public`. Body zusätzlich voll
    qualifizieren (public.tabelle).
  - SECURITY DEFINER: `set search_path = pg_catalog` — der MINIMALE Pfad, NICHT public. Grund:
    eine DEFINER-Funktion läuft mit Owner-Rechten; löst sie unqualifizierte Namen über public
    auf, kann ein dort angelegtes Objekt die Auflösung kapern. Alles ausserhalb von pg_catalog
    im Body voll qualifizieren.
  GEMESSENER IST-ZUSTAND, der NICHT "korrigiert" werden darf (2026-07-28): rls_auto_enable —
  die EINZIGE SECURITY-DEFINER-Funktion im System — trägt search_path=pg_catalog. Das ist
  korrekt. Die frühere Fassung dieser Regel sagte pauschal "gilt für SECURITY INVOKER wie
  DEFINER" und hätte beim Rebuild aus supabase/manual/rls_auto_enable.sql zu einer "Korrektur"
  auf public eingeladen — das hätte die einzige Sicherheitsfunktion des Systems STILL
  geschwächt, mit der Doku als Rückendeckung. Bei jedem Rebuild bleibt der Byte-Abgleich gegen
  pg_get_functiondef Pflicht (s. "## Offene Punkte").
- MIGRATION IMMER VOR CODE-DEPLOY (fail-closed): Eine Migration läuft IMMER im SQL-Editor VOR
  dem zugehörigen Code-Deploy — sonst liest der neue Code eine Spalte/Funktion, die es noch
  nicht gibt (bei CAPI hätte das die laufende trackingKey-Auflösung gebrochen). Umgekehrt ist
  eine Migration OHNE den zugehörigen Code in der Regel ein No-op und damit gefahrlos. Detail:
  docs/claude-history/phase-8-analytics.md.
  PROTOKOLL-PFLICHT (ab 0018): JEDE künftige Migration schreibt als LETZTE Anweisung ihren
  eigenen Eintrag:
  ```sql
  insert into public.schema_migrations (version, filename, applied_at)
  values ('00XX', '00XX_name.sql', now()) on conflict (version) do nothing;
  ```
  AM ENDE, damit der Eintrag nur bei erfolgreichem Durchlauf entsteht — bricht die Migration
  vorher ab, gibt es keine Zeile, die einen nie vollzogenen Lauf behauptet. Zweck: "welche
  Migration ist gelaufen?" war bisher NICHT direkt messbar (nur die WIRKUNGEN waren es —
  Spalte da? Constraint da?), damit hing die Reihenfolge-Regel allein an Disziplin.
  ACHTUNG — PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: Es gibt KEINEN Migrations-Runner, der aus
  schema_migrations liest, und es soll keinen geben. Wer die Tabelle als "hat schon
  gelaufen"-Gate missversteht, baut eine Automatik, die wir bewusst nicht haben — die
  Migrationen laufen weiterhin manuell im SQL-Editor, die Idempotenz-Guards in den Dateien
  selbst (if not exists, Katalog-Guard) bleiben die Absicherung gegen Doppelläufe.
- ANLEGEN UND BEFÜLLEN EINER ADDITIVEN SPALTE NICHT VERSCHMELZEN (Phase 9):
  Eine neue additive Spalte wird in einer Scheibe ANGELEGT (Migration plus
  CHECK, falls nötig) und in einer separaten, FOLGENDEN Scheibe tatsächlich
  BEFÜLLT — nicht beides in einem Schritt verschmolzen. GRUND: die
  Schreiblogik lässt sich isoliert bauen und testen, bevor sie den
  heissesten Pfad der Anwendung berührt, und ein Backfill sofort beim
  Anlegen wäre ein GERATENER Wert in einer Spalte, die zu diesem Zeitpunkt
  noch niemand liest und deren korrekter historischer Wert oft gar nicht
  mehr rekonstruierbar ist.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN, NICHT AM KALENDER (dieselbe Naht wie
  "Migration vor Deploy", nur am anderen Ende) — NEU GEFASST 2026-07-29 nach dem
  Pro-Wechsel, NICHT gestrichen:
  WAS ENTFÄLLT: die Pflicht zum manuellen pg_dump nach jeder Migration. Supabase Pro zieht
  TÄGLICH automatisch (7 Tage Retention); ein Handlauf daneben wäre Arbeit ohne Zugewinn.
  WAS BLEIBT — und das war immer der eigentliche Kern der Regel: die WIRKRICHTUNG. Ein
  Backup wird nicht durch ALTER gefährlich, sondern dadurch, dass das SCHEMA seither
  weitergezogen ist; ein Restore liefert dann eine DB, die der deployte Code nicht bedienen
  kann. Automatische Backups nehmen diese Gefahr NICHT weg, sie verschieben sie nur: das
  jüngste Backup ist jetzt höchstens 24 h alt, kann aber trotzdem VOR einer Migration liegen,
  die seither gelaufen ist.
  DARAUS DIE HEUTIGE FASSUNG: Nach JEDER ausgeführten Migration gilt das automatische Backup
  als NICHT mehr code-kompatibel, bis der nächste tägliche Snapshot durch ist. In diesem
  Fenster ist ein Restore nur mit anschliessendem manuellen Nachziehen der Migration
  brauchbar. Wer in diesem Fenster eine riskante Operation fährt, zieht vorher EINEN
  manuellen Dump — nicht als Routine, sondern als Absicherung genau dieser Lücke.
  KEIN VERSTOSS GEGEN DIE DATENZUGRIFFS-REGEL: ein pg_dump ist ein OPS-Weg. Die Regel "nur
  über den Supabase-JS-Client" gilt für ANWENDUNGScode; wer sie auf Betriebswerkzeuge
  ausdehnt, verbietet sich das einzige Mittel, das dieses Fenster überhaupt absichert.
  Seit 0018 trägt jeder Dump schema_migrations IN SICH: der abgedeckte Stand steht im Backup
  selbst statt in einer Notiz daneben, die verlorengeht. Das gilt für automatische Backups
  genauso und ist der Grund, warum die Lücke überhaupt erkennbar ist.
  Ist-Stand (Tier, PITR-Loch, Drill): "## Security Manifest & Launch Blocker", BACKUPS —
  hier nur die Regel.
- ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN (Entscheidung der
  Doku-Aufräumrunde 2026-07-28): Eine Migrationsdatei dokumentiert, was TATSÄCHLICH in der DB
  gelaufen ist. Sie im Nachhinein zu ändern — auch nur einen Kommentar — entkoppelt die Datei
  von dem, was die DB trägt, und macht sie als Rekonstruktionsquelle wertlos. BELEGTER ANLASS:
  Die Kopfkommentare von 0006/0007 nennen die alte Serving-Domain pgsm.site. Sie BLEIBEN,
  obwohl der Name überall sonst auf publayer.net korrigiert wurde — sie sind Zeitdokument,
  haben KEINE funktionale Wirkung (reiner Kommentar), und niemand leitet aus einem
  Migrations-Kopfkommentar eine operative Aufgabe ab. Korrekturen gehören in eine NEUE
  Migration oder in aktive Handlungsdokumente, NIE in eine gelaufene Datei. VERWANDT: die
  Phasen-Historien in docs/claude-history/ bleiben aus demselben Grund stehen; das
  Security-Manifest ist die benannte AUSNAHME, weil es ein aktives Dokument ist (dort wird
  umgestuft, nicht annotiert — s. den Kopf der Vollfassung).
- NEXT_PUBLIC_-REDEPLOY-PFLICHT (Ops-Regel, real aufgetreten): NEXT_PUBLIC_-Env-Vars werden
  zur BUILD-ZEIT ins Client-Bundle inlined -> die Variable in Vercel zu ändern reicht NICHT,
  nach JEDER Änderung ist ein REDEPLOY PFLICHT. Sonst trägt das laufende Bundle still den
  alten Wert, OHNE Fehlermeldung. Server-only Env-Vars vor der ersten Prod-Nutzung im
  Vercel-Dashboard setzen (sie sind nicht build-zeit-gebunden, fehlen aber sonst zur Laufzeit).
- HOST-QUELLE FÜR APP-vs-SERVING-BRANCHING (Sicherheit): x-forwarded-host ist die Quelle,
  empirisch auf einem echten Vercel-Preview als vertrauenswürdig BEWIESEN (Vercels Edge
  überschreibt einen client-gefälschten x-forwarded-host mit dem echten Host — die Doku
  schwieg dazu, also getestet statt angenommen). Daraus folgt die allgemeine Regel: NIEMALS
  einen client-kontrollierten Host ungeprüft für Auth- oder Host-Branching nutzen.
  Vollbeweis: docs/claude-history/phase-7-hosting.md.
- Vor neuer Phase: kurz bestätigen, dass die vorige demobar lief.
- Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung (was
  genau im Browser zu prüfen ist) — nicht nur Pipeline-grün. Die Pipeline beweist
  die Logik; den Produktanspruch beweist nur der Live-Blick. Ein CLAUDE.md-
  'erledigt'-Eintrag wird erst nach bestätigtem Live-Test geschrieben.
- Session-unabhängige Mutationen (MCP-Vorbereitung, kostenlos ab jetzt): Jede neue
  Server-Mutation als REINE Funktion (userId, params) bauen — Autorisierung
  (Ownership-Prüfung) DAVOR, Geschäftslogik DAHINTER, sauber getrennt (wie setCapiToken
  es bereits fast tut). So kann die spätere MCP-Schicht (Phase 10) dieselbe geprüfte Logik
  wiederverwenden, mit MCP-Autorisierung als ANDEREM Eingang zur GLEICHEN Funktion. Kein
  jetziger Bau, nur Baustil — verbessert den Code ohnehin (Testbarkeit, Trennung von
  Auth und Logik).
- ABLEITEN STATT HARDCODEN (Werte mit einer Quelle): Was aus Env/Config/API-Antwort
  ableitbar ist, wird NIE hardcodiert — hardcodierte Werte brechen STILL bei
  Umgebungswechsel. Real aufgetreten: der hardcodierte Serving-Suffix erzeugte auf der neuen
  Serving-Domain lautlose 404er (extractLabel=null -> falscher Dispatch). Beispiele:
  Serving-Suffixe aus NEXT_PUBLIC_HOSTING_DOMAIN ableiten, DNS-Werte (CNAME/A) aus der
  Vercel-Config-Antwort pro Domain lesen (sie sind projektspezifisch), Endpunkt-/Feldnamen
  gegen die AKTUELLE Anbieter-Doku prüfen statt aus dem Gedächtnis zu setzen.
- ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State): Jeder View-State, der ein
  Projekt-Attribut spiegelt (uploadError, capiTokenSet, Publish-Status/Live-URL, ...),
  muss beim Projektladen am kanonischen Chokepoint aus dem GELADENEN Projekt ABGELEITET
  werden — nicht nur bei Bedarf gelöscht. Dreimal aufgetreten (uploadError -> capiTokenSet
  -> Publish-State). "Löschen" ist die schwächere Regel: sie zeigt einen "war schon mal
  an"-Zustand (z.B. bereits publiziertes Projekt) fälschlich als aus. Ableiten aus der
  Wahrheitsquelle (settings.hosting / settings.capi.tokenSet / ...) ist korrekt für beide
  Fälle. Beim Publish-Leak zusätzlich sicherheitsrelevant: falscher "veröffentlicht"-
  Zustand könnte Ad-Budget auf die falsche URL lenken.
- DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER (Phase 10, an der
  eigenen Doku widerlegt): Wer in Doku, Kommentar oder Backlog auf Code verweist,
  nennt den SYMBOLNAMEN (applyZenForLoadedCode, settingsEqual, statusBadge). Namen
  überleben Refactorings, Zeilennummern nicht — und eine falsche Zeilennummer ist
  teurer als keine, weil sie auf eine ANDERE Stelle zeigt statt zum Suchen zu
  zwingen. BELEG: Ein 16-zeiliger Kommentar verschob in Phase 10 sämtliche Angaben
  einer Datei um +16; ein Dokument, das zwei Runden zuvor als "gemessen" galt, war
  damit falsch. Zeilennummern in einem MESSBERICHT bleiben erlaubt (sie datieren
  sich selbst); in dauerhaften Dokumenten nicht.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EIN WIEDERKEHRENDER AUFRUF GEGEN EINEN EXTERNEN DIENST HÄNGT AN DER SICHTBARKEIT
  DES BEREICHS, DER IHN BRAUCHT — NICHT AN DER DES TABS (Phase 10): Die
  document.hidden-Pause greift NICHT, wenn der Nutzer im selben Tab anderswo
  arbeitet; ein Poll läuft dann weiter, obwohl niemand hinsieht, und multipliziert
  sich über alle Nutzer. BELEG: das 60-Sekunden-Poll-Intervall der Domain-Liste
  gegen Vercel — es rechtfertigt allein, dass die Einstellungs-Fläche beim
  Schliessen ABGEBAUT wird, statt dauerhaft gemountet zu bleiben.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EINE KOMPONENTE MIT EIGENEM ZUSTAND DARF NICHT HINTER EINEM UMSCHALTER LIEGEN,
  DER SIE AUSHÄNGT (Phase 10): Entweder sie wird VERSTECKT statt ausgehängt, oder
  ihr Zustand wird hochgezogen. Sonst entscheidet ein reiner Ansichtswechsel
  darüber, ob Arbeit verlorengeht. Umgekehrt gilt dieselbe Regel als WERKZEUG: Wo
  der Zustand dort liegt, wo seine Lebensdauer endet, löst sich das Aufräumen ohne
  eine Zeile Code. BELEG: Die Bestätigung einer Domain-Zeile stirbt mit dem Unmount
  ihrer Komponente; die gleichartige Bestätigung im Container überlebt das
  Schliessen der Fläche und steht Stunden später scharf da.
  Verwandt: "ABLEITEN STATT LÖSCHEN" oben. Herleitung:
  docs/claude-history/phase-10-workspace.md.
- KEIN ZEIT- ODER LOCALE-ABHÄNGIGER WERT IN EINEM TEILBAUM, DER BEIM ERSTEN RENDER
  SICHTBAR IST (Hydration-Regel, Phase 10): toLocale*, Intl.*, Date.now() und
  Verwandte formatieren auf Server und Client verschieden (Zeitzone, Locale) und
  erzeugen einen Hydration-Mismatch. Solche Ausgaben gehören hinter ein Gate, das
  im ersten Render GARANTIERT geschlossen ist — und diese Abhängigkeit gehört an
  die Fundstelle kommentiert, weil sie sonst beim nächsten Umbau unbemerkt kippt.
  BELEG: Die lokalisierte Datumsausgabe der Varianten-Auswertung und formatRelative
  im Projekt-Menü sind NUR deshalb kollisionsfrei, weil ihr jeweiliges Gate
  deterministisch geschlossen startet. VERWORFEN wurden dort Mount-Flag,
  suppressHydrationWarning und ein fester timeZone-Parameter: der erste baut
  Mechanik gegen ein Problem, das es nicht gibt, der zweite unterdrückt die Meldung
  statt der Abweichung, der dritte nimmt dem Nutzer seine lokale Zeit.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- VERSTECKEN PER CSS-KLASSE — WEDER DAS HTML-ATTRIBUT hidden NOCH aria-hidden
  (Phase 10): Beide nehmen den Teilbaum aus dem Accessibility-Tree, und getByRole
  filtert per Default danach — jede Bestandsabfrage auf den inaktiven Teilbaum geht
  dann rot, ohne erkennbare Ursache. Wer einen gemounteten Teilbaum unsichtbar
  machen will, nutzt echtes display:none per Klasse. GEGENPROBE beim Testen: Die
  Klasse belegt STRUKTUR, nicht Sichtbarkeit — s. die jsdom-Regel unten.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WER EIN ELEMENT AUS DEM DOKUMENTFLUSS NIMMT (fixed/absolute), PRÜFT, OB DER
  BEDIENWEG DORTHIN MITSCROLLT (Phase 10): Das fixierte Element bleibt stehen, sein
  Auslöser nicht — bei gescrollter Seite kann der einzige Zugang (oder der einzige
  Schliessweg) aus dem Sichtfeld wandern. BELEG: Der Einstellungs-Drawer ist fixed,
  sein Toolbar-Schalter nicht; ohne das Schliesskreuz IM Drawer wäre er bei
  gescrollter Seite nicht mehr schliessbar gewesen. Die Ausgleichsmassnahme gehört
  in dieselbe Scheibe, die das Problem erzeugt.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
  OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM (Phase 10): Wird eine Testabfrage
  mehrdeutig, ist ZUERST die Oberfläche zu prüfen — nicht die Abfrage eindeutig zu
  machen. aria-label oder role reparieren die Abfrage und lassen die
  Doppeldeutigkeit auf dem Bildschirm stehen; das justiert das Instrument statt der
  Sache. BELEG: Ein Reiter "Veröffentlichen" neben dem gleichnamigen Publish-Knopf
  hätte acht Abfragen mehrdeutig gemacht — bei bereits veröffentlichtem Projekt
  hätte eine davon still den falschen Knopf getroffen; gewählt wurde ein anderer
  NAME.
  PFLICHT-PRÜFSCHRITT VOR DEM BAU, nicht danach: Ein neues Bedienelement oder ein
  neuer Text kann bestehende Abfragen auf ZWEI Weisen brechen — es macht sie
  MEHRDEUTIG, ODER es kippt eine Behauptung über die ABWESENHEIT eines Textes
  (not.toContain, queryBy… toBeNull und Verwandte). Beide Achsen einzeln durchgehen.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- DIE TESTUMGEBUNG WERTET KEIN CSS AUS (gemessen, dauerhafte Eigenschaft des
  Setups): vitest.config.ts lädt kein Stylesheet, display einer .hidden-Klasse ist
  in jsdom "block" wie ohne Klasse, checkVisibility fehlt. FOLGE: KEIN Test darf
  behaupten, etwas sei sichtbar oder unsichtbar. Prüfbar sind DOM-Präsenz,
  Attribute und Textinhalt; Sichtbarkeit, Position, Farbe und Verdrängung sind
  ausschliesslich Live-Test-Achsen. Ein Test, der eine Klasse prüft, benennt sich
  selbst als STRUKTUR-Zusicherung.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- SERVER-ACTIONS SIND IM NETZWERK-TAB NICHT AN IHREM NAMEN ERKENNBAR (gemessen am
  gebauten Bundle, Phase 10): Sie erscheinen als POST auf die SEITEN-URL; der
  Klartextname steht nur als Sourcemap-Argument im Bundle
  (createServerReference(<opake id>, callServer, …, "name")), gesendet wird die
  opake ID im next-action-Header. Alle Actions einer Seite sehen in der
  Namensspalte identisch aus. FOLGE FÜR JEDE LIVE-ANLEITUNG: "im Netzwerk-Tab nach
  <Action> suchen" ist eine UNTAUGLICHE Sonde und erzeugt FALSCHE ENTWARNUNG.
  Tauglich sind: POSTs auf die Seiten-URL zählen, der next-action-Header — oder,
  schärfer, die Nachstellung im Test. BELEG: Ein Live-Schritt meldete "kein
  Aufruf", während der Aufruf nachweislich stattfand.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EIN SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN (Phase 10,
  Produkt-Regel für Statusanzeigen): NICHT qualifiziert sind wartende Vorgänge, bei
  denen niemand handeln kann (DNS-Propagierung), und normale Anfangszustände (nichts
  gespeichert, keine Daten, nichts gestartet). Grund: Eine Anzeige, die stundenlang
  leuchtet, ohne dass jemand handeln kann, erzeugt SIGNAL-ERMÜDUNG — dann ist sie
  wertlos, auch für den Fall, der wirklich zählt. ZWEITE BEDINGUNG: Das Signal muss
  dieselbe Sichtbarkeits-Bedingung tragen wie die Meldung, auf die es zeigt — sonst
  führt es in einen Bereich, in dem nichts steht.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- AUFRÄUMEN AM ANFANG EINER SITZUNG, NICHT AN IHREM ENDE (Phase 10): Soll ein
  Kontext "sauber starten", wird er beim BETRETEN zurückgesetzt, nicht beim
  Verlassen. Grund: Laufende Handler enden nicht mit der Ansicht — ein Fehlschlag
  kann NACH dem Verlassen eintreffen und stünde beim nächsten Betreten wieder da.
  Nebeneffekt: Es gibt meist nur EINEN Eintrittspunkt, aber mehrere Ausgänge.
  BELEG: Der Statuskanal des Einstellungs-Drawers wird beim Öffnen geleert; ein
  Reset beim Schliessen hätte genau den nachträglich eintreffenden Fehler
  stehenlassen, den die Massnahme abschaffen sollte.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WAS DIE HÜLLE VOM INHALT TRENNT, GEHÖRT DER HÜLLE — NICHT DEM INHALT (Phase 10):
  Trennlinien, Abstände und Rahmen, die eine Navigation von ihrem Inhalt abgrenzen,
  sind Eigenschaft des CONTAINERS. Trägt der erste Abschnitt eines austauschbaren
  Bereichs sie selbst, weiss dieser Bereich etwas über seine POSITION — und bei
  einem dritten Bereich oder einer Umsortierung ist es sofort wieder falsch;
  ausserdem sieht jeder Bereich anders aus, je nachdem, ob er die Klassen trägt.
  Eine Stelle statt zwei.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST KEINER
  (Phase 10, zwei Ausprägungen): (1) Wird eine Entscheidung bewusst an ZWEI Stellen
  getroffen (ein deklariertes Duplikat), sichern Querverweis-Kommentare sie NICHT —
  sie werden beim Ändern nicht gelesen. Der Wächter ist ein Test, der rot wird, wenn
  nur eine Seite geändert wird; der Kommentar sagt, WELCHER. (2) Ein Schutz, der nur
  NEBENEFFEKT einer anderen Logik ist (eine Mount-Grenze, eine disabled-Bedingung),
  verschwindet STILL, sobald diese Logik sich ändert — kein Typfehler, kein roter
  Build. Wer sich auf so einen Schutz verlässt, schreibt den Test dazu, der ihn
  benennt. BELEG: Der Schutz vor einer destruktiven Aktion auf veralteten Daten
  ruht auf einer Mount-Grenze; und der Schutz des CAPI-Klartext-Tokens ruhte allein
  auf einer disabled-Bedingung, ohne dass ein Test ihn behauptete.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- BEIM EXTRAHIEREN EINER ANSICHT WANDERT EINE ABLEITUNG NUR MIT, WENN SIE
  AUSSCHLIESSLICH VON DIESER ANSICHT GELESEN WIRD **UND** IHRE EINGÄNGE EBENFALLS
  MITWANDERN ODER OHNEHIN PROPS SIND (Phase 10, nachgeschärft nach der ersten,
  unzureichenden Fassung): Sonst zieht die Ableitung eine Kette von Werten aus dem
  Container mit sich, die dort gebraucht werden — oder sie muss neu berechnet
  werden, und dann gibt es zwei Rechenwege für dieselbe Frage. BELEG: Bei der ersten
  Extraktion wanderten vier Ableitungen mit, bei der zweiten KEINE einzige, weil
  deren Eingänge im Container gelesen werden.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR (Phase 10, real
  aufgetreten): Eine mit sed geschriebene ODER ZURÜCKGENOMMENE Datei kann danach als
  geändert gelten, obwohl ihr Inhalts-Diff LEER ist — und wandert unbemerkt in den
  Commit. Für Datei-Änderungen das Edit-Werkzeug nutzen, nicht sed. DER
  MUTATIONSZYKLUS IST EBENSO GEFÄHRDET WIE DER BAU: setzen, messen, zurücknehmen —
  nach der Rücknahme IMMER git status prüfen und leere Diffs (Datei gelistet, aber
  numstat leer) ausdrücklich ausschliessen. BELEG: Ohne die Datei-ZÄHLUNG im
  Scope-Wächter ("genau drei Einträge") wäre eine vierte Datei in den Commit
  gewandert. Ergänzt "COMMIT-KONVENTIONEN" oben um eine zweite Prüfung neben der
  Secret-Prüfung.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- NAHT-HYGIENE (7c-2, aktiv): 7c-2 koppelt Domain-/Routing-Logik NICHT an Tracking-/
  Lead-Logik. Die Andock-Punkte für spätere Module existieren BEREITS (neutraler
  /api/e-Trichter, projekt-scoped Settings); "nahtloses Andocken" folgt aus sauberen
  Nähten + additiver Disziplin, NICHT aus spekulativem Vorbau. KEINE Webhook-Interfaces/
  Schema-Erweiterungen ohne realen Konsumenten + Spec. Kontext:
  docs/claude-history/future-roadmap.md.

## Detail-Archiv (bei Bedarf lesen — NICHT automatisch geladen)
Abgeschlossene Phasen-Historie + Vollbegründungen sind ausgelagert, damit CLAUDE.md unter
dem 150k-Ladelimit bleibt (jede Session lädt nur diese Root-Datei). Reine Pfad-Verweise,
KEIN @-Import. Bei Arbeit an einem Thema die passende Datei gezielt lesen:
- docs/claude-history/phase-2-3-foundation.md — Phase 2 (Click & Connect) + Phase 3
  (Persistenz/Auth, stabile ps-IDs, Multi-Projekt, DB-Härtung 0003).
- docs/claude-history/phase-4-mapping-codegen-export.md — Mapping-/Action-Zuweisung +
  Weg-C-Netz (Orphans anzeigen/löschen/Re-Link) + Code-Gen-Engine + HTML-Export.
- docs/claude-history/phase-4.5-editor-politur.md — Datei-Upload/Drag-Drop + Zen-Modus
  + A11y-Politur.
- docs/claude-history/phase-5-copywriting.md — In-Place Copywriting (Text-Mapping,
  Live-Patch PS_SET_TEXT, direkt-in-DOM-Export, revert-Lektion).
- docs/claude-history/phase-6-capi.md — Server-Side Tracking / Meta-CAPI (Scheiben
  0–2b-ii, Secret-Storage, Dedup-Beacon, alle Debug-Lektionen).
- docs/claude-history/phase-7-hosting.md — Hosting/Go-Live: 7a/7b + 7c-Konzept + 7c-1
  + XFH-Gate-Vollbeweis + die KOMPLETTE 7c-2-Familie (2a Wildcard-Infra, 2b Add-Domain-
  Mutation, 2c DNS-Anweisungs-UX, Entfernen). DORT stehen auch die Hosting-Ops-Details, die
  bewusst NICHT in der Root liegen: Registrierungs-Rate-Limit (5/Stunde/User),
  Support-Playbooks für CAA-Records und Metas Traffic-Permissions-Allow-List, die
  Vercel-Fehler-Mappings (409 domain_already_in_use -> Heilung) und das
  Verification-vs-Configuration-Statusmodell. Bei Domain-/DNS-Support-Fragen zuerst hier
  nachsehen.
- docs/claude-history/phase-8-analytics.md — GESAMTE gebaute Phase 8: Scheibe 1 (Analytics-
  Persistenz-Fundament) + CAPI-Härtung (3s-Timeout + errorName-Util) sowie die am 2026-07-24
  ausgelagerten Scheiben 2a (Handler-Umbau/Kill-Switch), 2b-0 (server-autoritative tracking_key-
  Spalte), 2b-1 (PageView-Emitter), 3 (Read-Pfad/owner-SELECT-RLS + Counts), A + B (Adblocker-
  Verlustrate): volle Herleitung, Entscheidungen, Tests, Live-Verifikation je Scheibe (mit
  STATUS-NACHTRAG). Der aktive Ist-Stand steht in der Root ("## Aktueller DB-/Analytics-Stand"),
  nicht hier.
- docs/claude-history/phase-9-ab-testing.md — GESAMTE gebaute Phase 9
  (A/B-Testing): Scheibe 9a (Varianten-Authoring), 9b-1 (Split in der
  Serve-Route + Cookie + Aktivierungs-Flag), 9b-1p (UI-Politur), 9b-2
  (variant in Ingest und Persist), 9c-1 (Auswertung je Variante) und 9c-2
  (Lauf-Abgrenzung) — alle SECHS ABGESCHLOSSEN und live bewiesen; dazu die
  zwei mitgereisten Nicht-A/B-Scheiben Fix-Scheibe safeAction
  (Client-Fehlerbehandlung) und Leere-Variante-Riegel (Publish verweigert
  leeren Inhalt). Der aktive Ist-Stand steht in der Root ("## Aktueller
  DB-/Analytics-Stand" bzw. "## Offene Punkte"), nicht hier.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 10 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
- supabase/checks/ — versionierte, NUR LESENDE Messproben für Live-Tests und Gegenproben.
  KEIN Migrationsverzeichnis, wird nie automatisch angewandt. VOR jeder handgetippten
  Prüf-Query dort nachsehen (dort steht auch, welche Fallen eine Probe hat — z.B. der
  custom_host-Filter bei der Domain-Divergenz). Details: README im Ordner.
