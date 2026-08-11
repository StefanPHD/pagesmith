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
DIE MARKER: [x] abgeschlossen · [ ] offen · [~] TEILS ERLEDIGT — ein benannter Teil
steht und ist bewiesen, ein benannter Teil steht aus. Der dritte Marker ist NEU und
wird nur dort gesetzt, wo beide Teile im Text der Zeile ausdrücklich stehen; ohne diese
Benennung ist er unzulässig, weil er sonst nur "irgendwie halb" hiesse.
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Phase 3 — Persistenz & Auth (Supabase): ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4 — Code-Generierung + HTML-Export: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4.5 — Editor-Politur (Datei-Upload/Drag-Drop + Zen-Modus):
      ABGESCHLOSSEN & live getestet. Volle Herleitung:
      docs/claude-history/phase-4.5-editor-politur.md.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN & live bewiesen. Volle
      Herleitung: docs/claude-history/phase-5-copywriting.md.
- [x] Phase 6 — Server-Side Tracking (CAPI): ABGESCHLOSSEN & live bewiesen — der
      End-to-End-Dedup-Sichtbarkeitstest wurde in Phase 7 bestätigt (Owner, Meta
      Events Manager). Volle Herleitung: docs/claude-history/phase-6-capi.md.
- [x] Phase 7 — Hosting & Go-Live (war Phase 6): ABGESCHLOSSEN & live bewiesen
      (Produktions-Smoke über die deployte Produktions-URL, NICHT localhost).
      Volle Herleitung: docs/claude-history/phase-7-hosting.md.
- [x] Phase 8 — Analytics & ROI-Ökosystem (war A/B-Testing): ABGESCHLOSSEN & live
      bewiesen (2026-07-23). Ist-Stand: docs/db-stand.md; volle
      Herleitung: docs/claude-history/phase-8-analytics.md.
      ABGEHAKT 2026-07-29: der ZUGESAGTE Umfang ist fertig und live bewiesen. Die vier
      Weiterentwicklungen (Uniques, Charts/Zeiträume, CAPI-Einbettung server-vereinheitlichen,
      Launch-Härtung) sind IDEEN OHNE TERMIN und OHNE Zusage — sie hingen bisher als offener
      Haken an dieser Zeile und liessen die Phase unfertig aussehen, obwohl sie es nicht ist.
      Wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis; sie
      öffnet diese Checkbox nicht wieder.
- [x] Phase 9 — A/B-Testing: ABGESCHLOSSEN & live bewiesen (2026-07-27 bis
      2026-07-29). Volle Herleitung: docs/claude-history/phase-9-ab-testing.md.
- [x] Phase 10 — Workspace-Reorganisation: ABGESCHLOSSEN & live bewiesen
      (2026-07-31 bis 2026-08-01). Die Einstellungsbereiche liegen jetzt als
      Drawer mit zwei Reitern (Messen / Live) außerhalb des Dokumentflusses —
      Voraussetzung für Phase 11. Volle Herleitung:
      docs/claude-history/phase-10-workspace.md.
- [x] Phase 10.5 — Umzug middleware -> proxy (Next-Konvention): ABGESCHLOSSEN
      & live bewiesen (2026-08-03). Volle Herleitung:
      docs/claude-history/backlog-polish.md, Eintrag "src/middleware.ts ->
      proxy.ts umbenennen".
- [~] Phase 11 — Multi-Tracking (Server-Side Fan-Out): TEILS ERLEDIGT.
      ERLEDIGT IST DIE STRUKTUR: Der Fan-Out beliefert ein ZWEITES Ziel — live
      bewiesen gegen ein echtes fremdes System, nicht gegen eine Attrappe. Auflösung
      über mehrere Ziele, Einwilligung JE ZIEL, Oberfläche je Plattform und der
      nebenläufige Fan-Out mit EIGENEM Deckel je Empfänger sind gebaut und geprüft.
      GEBAUT UND TATSÄCHLICH BELIEFERT SIND ZWEI ZIELE: Meta und Pinterest.
      OFFEN ALS WIEDERHOLUNGEN SIND DREI ZIELE — TikTok, Google und LinkedIn —,
      dazu das Tracking-Testmodus-Modul und der Testknopf. DIESE DREI SIND
      WIEDERHOLUNGEN DESSELBEN HANDGRIFFS, KEIN NEUES FUNDAMENT — wer sie für
      gleich gross hält wie den erledigten Teil, plant eine Phase, die es so nicht
      mehr gibt. Ein solches Ziel ist ein Adapter, ein Eintrag in der Zuordnung,
      ein Zielwert im CHECK und ein Live-Test; alles, was daran schwierig war, ist
      einmal gemacht. CUSTOM-PIXEL GEHÖRT NICHT ZU DIESEN DREI — eigener Absatz
      weiter unten. AUCH DER TESTKNOPF FÄLLT NICHT IN DIESE KLASSE: er ist keine
      Scheibe, sondern mehrere einzeln beweisbare Teile plus eine unentschiedene
      Vorfrage — Auflagen, Messbefunde und Begründung stehen in
      docs/claude-history/phase-11-multi-tracking.md, "Die dreizehnte Scheibe —
      Der Testknopf (VERSCHOBEN, Owner 2026-08-10)".
      Volle Herleitung: docs/claude-history/phase-11-multi-tracking.md.
      TikTok, Google und LinkedIn als weitere ADDITIVE Fan-Out-Ziele
      neben Meta und Pinterest — source bleibt Beobachtungs-Ort, jedes Ziel
      bekommt seine EIGENE additive Spalte, kein Umbau. Dazu das kleine
      Tracking-Testmodus-Modul (test_event_code, s. future-roadmap.md,
      "Tracking-Testmodus für Kunden").
      CUSTOM-PIXEL IST KEINE WIEDERHOLUNG, SONDERN EINE EIGENE
      ARCHITEKTUR-SCHEIBE. UNGEKLÄRT IST ZUERST, WAS ES ÜBERHAUPT IST, und die
      beiden Lesarten führen an verschiedene Orte:
      (a) ein CLIENT-SEITIGES Snippet — dann ist es gar kein Fan-Out-Ziel,
      sondern derselbe Fall wie das gleich darunter ausgenommene Hotjar;
      (b) ein SERVER-SEITIGER Empfänger mit KUNDENEIGENEM Endpunkt — dann hängen
      drei Fragen daran, die KEIN anderes Ziel stellt: SSRF-Schutz bei einem
      betreiber-konfigurierten ausgehenden Aufruf, die Aufhebung des
      Primärschlüssels (project_id, target) bei mehreren Endpunkten pro Projekt,
      und ein dynamisches Nutzlast-Mapping ohne bekanntes Zielschema.
      DER ZUSCHNITT ENTSTEHT ERST NACH DIESER KLÄRUNG, nicht davor.
      AUSDRÜCKLICH AUSGENOMMEN:
      Hotjar/Session-Recording ist KEIN Fan-Out-Ziel, sondern braucht einen
      eigenen Custom-Script-Mechanismus — separat zu bewerten.
      DAS GETEILTE CONSENT-GATE IST GEBAUT. Die Einwilligungs-Auswertung liegt
      in einer EIGENEN Datei (src/lib/tracking/consent.ts, buildConsentRuntime),
      hängt WEDER an der Pixel-ID NOCH an der Mapping-Tabelle und wird von
      BEIDEN Konsumenten gefragt — der Meta-Laufzeit und dem PageView-Emitter.
      Sie beurteilt die Einwilligung JE ZIEL.
      RICHTIGGESTELLT, NICHT GESTEMPELT: Hier stand, das Consent-Gate sei fest
      in die Meta-Laufzeit eincodiert, und es wurde beim alten Namen genannt.
      Beides hat die zweite Scheibe beseitigt. Der Satz ist eine DESIGN-VORGABE
      für diese Phase — ein Satz, an dem sich ein Entwurf ausrichtet, darf nicht
      in falscher Fassung stehen, sonst plant die nächste Instanz einen Bau, den
      es schon gibt.
      DIE GEFAHR, GEGEN DIE ER GESCHRIEBEN WURDE, IST DAMIT ABGEWENDET: eine
      KOPIERTE Consent-Prüfung pro Ziel — dasselbe Muster, das an anderer Stelle
      im Projekt konsequent vermieden wird ("kein drittes Urteil").
      WEITERHIN OFFEN, als AUFLAGE an den Entwurf und ausdrücklich NICHT
      vorentschieden: die separat erwähnte generische Action-Consent-Checkbox
      (jede Aktion, nicht nur Tracking, gated). Sie muss auf DEMSELBEN
      Mechanismus laufen; ein zweites Urteil darf nicht entstehen.
      Protokoll und Begründung: docs/claude-history/phase-11-multi-tracking.md.
      Protokolle, Entscheidungen und was jede Scheibe ausdrücklich NICHT
      beweist: docs/claude-history/phase-11-multi-tracking.md.
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
      Phase-10-Position; umgedrehtes Sicherheitsmodell, Bedrohungsmodell und
      Scope: future-roadmap.md, "Phase 18 — AI-Native: Pagesmith MCP-Server"):
      Eigene Autorisierungsschicht, KEIN angehängter Endpunkt. Bewusst ans Ende
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

## Aktueller DB-/Analytics-Stand — AUSGELAGERT nach docs/db-stand.md
Der gemessene Ist-Zustand (Migrationsstand, Tabellen, Policies, Rollen-Grants, Spalten,
Constraints, Indizes, Funktionen, Event-Trigger, Backups) steht in docs/db-stand.md.
Diese Datei wird NICHT automatisch geladen.
PFLICHT-STOPP, KEINE EMPFEHLUNG: Wer eine Migration schreibt oder am Schema, an Policies,
an einem RPC oder am Analytics-Lesepfad arbeitet, LÄDT docs/db-stand.md ZUERST — vor dem
Plan, nicht während des Baus. Ohne sie plant man gegen ein Schema, das man nicht kennt,
und es fällt erst in der laufenden DB auf.
UND AUCH DANN IST SIE KEINE QUELLE: Ein Dokument beschreibt einen Codezustand, es belegt
ihn nicht. Was gilt, steht im Repo bzw. in der laufenden DB — gemessen wird am Code oder
im SQL-Editor (Probe: supabase/checks/db-stand.sql), nicht abgelesen.

## Aktiver Stand — Verfahren ab Phase 10

Ab Phase 10 wird der aktive Stand einer laufenden Phase NICHT mehr hier
geführt, sondern in einer eigenen, nicht automatisch geladenen Datei:
docs/aktiver-stand.md. Existiert diese Datei nicht, läuft aktuell keine
Phase — dann gibt es hier nichts zu lesen und auch sonst nichts zu tun.

Diese Datei muss JEDE Session, die an einer laufenden Phase arbeitet,
ZUERST gelesen werden — das ist kein Vorschlag, sondern ein Pflicht-Gate
("Auftrag 0") in jedem Bau- und Aufklärungs-Prompt. Details zum Ablauf
(Anlegen zu Phasenbeginn, Fortschreiben während der Phase, Hebung +
Archivierung am Phasenende): docs/arbeitsweise.md.

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
  ACHTUNG, DIE BEIDEN HÄLFTEN DIESES SATZES HABEN SEIT DEM 2026-08-10 VERSCHIEDENEN
  RANG: die ERSTE ist BEDINGT (sie wird mit einem benannten Trigger scharf), die ZWEITE
  gilt UNBEDINGT. Wer nur diesen Satz liest, liest die erste Hälfte zu streng — die
  Begründung steht im Stempel unter "SOLL" weiter unten.
  SOLL UND IST FALLEN HIER AUSEINANDER — getrennt aufgeschrieben am 2026-08-05, weil der
  Satz darüber sonst als Beschreibung des heutigen Codes gelesen wird und er ist es nicht:
  - IST, GEMESSEN am 2026-08-05, am 2026-08-08 erneut am Code erhoben: Der Meta-Forward
    wird mit await IM REQUEST erwartet, gedeckelt per AbortController auf
    META_FORWARD_TIMEOUT_MS; das abschliessende status(204) steht DAHINTER. Die
    Beacon-Antwort wartet also auf Meta — bis zum Deckel. Der Hintergrund-Mechanismus
    (after aus next/server) existiert im selben Handler, trägt aber NUR den Analytics-
    Persist über schedulePersist, nicht den Forward.
    WO DAS HEUTE LIEGT — ORTSANGABE RICHTIGGESTELLT (Phase 11 Scheibe 4): Die Messung vom
    2026-08-05 fand all das in handleIngest (src/lib/capi/ingest.ts), und so stand es hier.
    Seither liegen Nutzlast-Bau, AbortController, Timer und Fehlerdeutung in
    src/lib/capi/meta-forward.ts (forwardToMeta); in handleIngest stehen nur noch das await
    und die 204 dahinter.
    DER SACHVERHALT SELBST IST UNVERÄNDERT — verschoben hat sich der ORT, nicht das
    Verhalten. Genau deshalb RICHTIGGESTELLT und NICHT gestempelt: Wäre das Verhalten
    anders geworden, wäre die alte Messung ein Zeitdokument. So ist sie ein MASSSTAB mit
    einem toten Verweis — und dieser Block ist der Maßstab, gegen den die nächste Änderung
    an diesem Pfad misst. Wer den Deckel in ingest.ts sucht und nicht findet, hält ihn für
    abgeschafft und baut den nächsten Empfänger ohne ihn.
  - SOLL: der Satz oben. Er ist als ABSICHT richtig und wird NICHT gestrichen — er ist nur
    NOCH NICHT EINGELÖST.
    STEMPEL 2026-08-10 — DIE SOLL-HÄLFTE IST BEDINGT GEWORDEN, NICHT GESTRICHEN. Was sie
    FORDERT, bleibt wörtlich stehen; was sich ändert, ist ihr RANG: Sie ist keine Auflage
    an den heutigen Code mehr, sondern wird erst mit dem unten benannten TRIGGER scharf.
    DER BEFUND, DER DAS ENTSCHEIDET, und er ist NEU — er stand in keiner der beiden
    bisherigen Fassungen: DER MECHANISMUS DIENT DEM PREIS NICHT, DEN DIESE REGEL SELBST
    NENNT. Der Preis ist seit der Präzisierung ganz unten der SLOT, nicht die Rechenzeit.
    Eine Hintergrund-Zustellung über after() verkürzt die Invocation aber NICHT — sie
    lässt nur die Antwort früher hinausgehen, die Belegung des Slots bliebe identisch.
    FOLGE: Die SOLL-Hälfte und die einzige noch tragende Preis-Begründung dieser Regel
    hängen NICHT zusammen; ihre Umsetzung brächte an genau der Stelle, die den Preis
    trägt, exakt nichts. Das ist ein schärferer Grund als "kein messbarer Gewinn" — er
    sagt, dass Forderung und Begründung auseinanderlaufen, nicht bloss dass der Gewinn
    klein ist.
    GEMESSEN AM 2026-08-11 (formale Suche über src/, case-INSENSITIV, MEHRZEILIG und mit
    Testdateien; alle drei Anforderungen sind nötig — ein Vorkommen zitiert den Namen in
    GROSSSCHREIBUNG, zwei stehen über einen Zeilenumbruch getrennt und entgehen einer
    zeilenweisen Suche, und eines liegt in einer Testdatei):
    ACHT Stellen berufen sich auf diese Regel — alle auf ihren KOPF (keine zusätzliche
    Arbeit je Beacon, keine zweite Abfrage), in capi/ingest.ts (drei), capi/token.ts
    (drei), capi/token.test.ts (eine) und tracking/consent-wire.ts (eine). AUF DIE
    SOLL-HÄLFTE BERUFT SICH KEINE EINZIGE. Sie hat im Produktivcode keinen Konsumenten
    und hatte nie einen.
    WAS UNBERÜHRT BLEIBT: Die ZWEITE Hälfte ("der CAPI-Call muss zuverlässig zugestellt
    werden") gilt UNBEDINGT weiter. Die Recherche berührt sie nicht — im Gegenteil, sie
    ist der Grund, warum die Umstellung TEUER wäre (waitUntil sichert ABSCHLUSS zu, nicht
    ERFOLG).
    DIE ALTE BEGRÜNDUNG BLEIBT LESBAR UND WIRD NICHT GESTRICHEN: Sie war unter dem
    damaligen Kostenmodell richtig — jeder zusätzliche synchrone Call multipliziert sich
    mit dem Traffic aller Kunden — und sie ist die Herleitung, unter der mehrere Scheiben
    dieser Phase entschieden wurden. Überholt hat sie eine Doku-Lesung, kein Sinneswandel.
    DIE LÜCKE, DIE ZWINGEND DAZUGEHÖRT: Der Trigger unten hat ZWEI Hälften, und nur eine
    hat einen Beobachter. "Wegfall von Fluid Compute" ist im Dashboard ablesbar. "Eine
    GEMESSENE Grenze unter echtem Traffic" hat heute NIEMANDEN, der sie misst — es gibt
    kein Monitoring auf Concurrency-Slots. Wer diese Hälfte scharf haben will, braucht
    zuerst die Messung; ohne sie schlägt sie nie an und ist genau das "falls es je ein
    Problem wird", das der Trigger ausdrücklich nicht sein soll.
    PROVENIENZ DIESES STEMPELS: die Anbieter-Doku vom 2026-08-06 (KEINE Messung am
    eigenen Ingest-Pfad, s. die GRENZE weiter unten) plus die formale Code-Suche vom
    2026-08-10.
  - WARUM ES EINE UMSTELLUNG BRAUCHT UND KEINE STREICHUNG: Beide Hälften gelten
    gleichzeitig — die Antwort soll sich von Metas Latenz lösen, UND der Forward muss
    trotzdem zuverlässig zugestellt werden. Wer nur die erste Hälfte umsetzt, verliert
    Conversions; wer nur die zweite liest, sieht keinen Änderungsbedarf.
  - NICHT GEPLANT — und zwar, weil die BEGRÜNDUNG weggefallen ist, nicht weil die Absicht
    vertagt wäre. Die Umstellung ("CAPI-Forward auf Hintergrund-Zustellung, die 204 löst
    sich von Metas Latenz") war als eigene Scheibe zugeschnitten und ist am 2026-08-06
    GESTRICHEN worden. Der noch frühere Trigger "falls Beacon-Latenz je ein echtes Problem
    wird" bleibt ebenfalls ERSETZT und darf nicht zurückkommen.
    WARUM SIE NICHTS BRINGT — PROVENIENZ: VERCEL-/NEXT-DOKU, gelesen am 2026-08-06. KEINE
    Messung am eigenen Ingest-Pfad:
    · after() setzt auf waitUntil auf und verlängert die Lebensdauer DERSELBEN Invocation,
      bis deren Promises abgeschlossen sind. Die Invocation wird also NICHT kürzer — nur
      die Antwort geht früher raus.
    · Unter Fluid Compute pausiert die Active-CPU-Abrechnung, solange die Funktion auf I/O
      wartet. Das Warten auf Meta IST I/O.
    · waitUntil sichert ABSCHLUSS zu, nicht ERFOLG: kein Wiederholungsweg, und beim
      Herunterskalieren bleiben nach SIGTERM nur noch bis zu 500 ms.
    GEMESSEN AM EIGENEN PROJEKT (Vercel-Dashboard, 2026-08-06) — und NUR diese zwei Werte
    sind gemessen, alles andere oben ist Anbieter-Doku: Fluid Compute ist AKTIV, die
    Default Max Duration steht auf 300 Sekunden.
    FOLGE: Die Umstellung brächte keinen messbaren Gewinn und kostete die Zusicherung, dass
    der Forward vor der Antwort abgeschlossen ODER am Deckel gescheitert ist. Ein
    Conversion-Forward ist kritische Arbeit — diese Zusicherung für nichts aufzugeben wäre
    ein schlechter Tausch.
    TRIGGER, präzise und ausdrücklich NICHT "falls es je ein Problem wird": eine GEMESSENE
    Grenze unter echtem Traffic (Concurrency-Slots bzw. Skalierungsverhalten auf dem
    Ingest-Pfad), ODER ein Wegfall von Fluid Compute.
    GRENZE DIESER ENTSCHEIDUNG, die mitmuss: Sie stützt sich auf ANBIETER-DOKU plus die zwei
    Dashboard-Werte, NICHT auf eine Messung am eigenen Ingest-Pfad. Ändert der Anbieter sein
    Ausführungsmodell, ist sie NEU ZU PRÜFEN. Herleitung des ursprünglichen Aufschubs:
    docs/claude-history/phase-8-analytics.md.
  - JEDER WEITERE EMPFÄNGER VERSCHÄRFT DIESE REGEL, UND NEBENLÄUFIGKEIT LÖST DAS NICHT:
    Wird neben Meta ein weiteres Ziel im Request erwartet, wächst die Funktionslaufzeit.
    Wer nebenläufig statt seriell wartet, wartet auf das MAXIMUM statt auf die SUMME — das
    ist eine Dämpfung, keine Aufhebung: es genügt EIN langsamer Empfänger, und das Maximum
    wandert mit jedem zusätzlichen Empfänger nach oben, auch im Normalfall und nicht nur im
    seltenen Ausreisser.
    WO DER PREIS LIEGT — der Satz gehört zwingend dazu, sonst wird die Regel beim nächsten
    Refactor wegoptimiert, weil sie an der falschen Stelle gesucht wird: NICHT in der
    Wartezeit des BESUCHERS (ein keepalive-Beacon blockiert weder Rendering noch
    Interaktion, und ein Tracking-Verlust entsteht beim ABSENDEN, nicht beim Antworten),
    sondern in der BELEGUNG VON CONCURRENCY-SLOTS auf dem meistgetroffenen Pfad der
    Plattform, multipliziert über ALLE Kunden: eine länger offene Invocation belegt ihren
    Platz länger, und unter Last wird früher auf weitere Instanzen skaliert. Wer den Preis
    beim Besucher sucht, findet keinen und streicht die Regel.
    PRÄZISIERT AM 2026-08-06: Hier stand "FUNKTIONSLAUFZEIT und NEBENLÄUFIGKEIT", und das
    ist zu grob — unter Fluid Compute pausiert die Active-CPU-Abrechnung, solange die
    Funktion auf I/O wartet. Was bleibt, ist der SLOT, nicht die Rechenzeit. PROVENIENZ
    dieser Präzisierung: Anbieter-Doku vom 2026-08-06, KEINE eigene Messung.
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
- META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK (eingestuft 2026-08-10, zuvor ohne Stufe;
  OFFEN): describeMetaError (src/lib/capi/meta-forward.ts) loggt Fremdtext aus der
  Anbieter-Antwort — darin kann das gesendete Zugangsdatum zurückgespiegelt sein.
  BINDET-AN: das erste Projekt mit hinterlegtem Zugangsdatum.

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
  aller KI-induzierten Mutationen. BINDET-AN: Phase 18.

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
  DIESE AUFZAEHLUNG IST NICHT DIE VOLLSTAENDIGE LISTE DER POLICY-FREIEN TABELLEN: Policy-
  Freiheit kommt im System aus ZWEI verschiedenen Gruenden vor — append-only (diese Regel)
  UND ausschliesslicher service_role-Zugriff bei service-seitig geschriebenen Tabellen
  (project_secrets, events). Wer die Liste oben als vollstaendig liest, haelt eine
  policy-freie Tabelle ausserhalb davon fuer einen Fehler und "repariert" sie.
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
- MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE — NEUN LEKTIONEN (Phase 9, mehrfach
  live aufgetreten; (e) und (f) aus Phase 10, (g) bis (i) aus Phase 11): Ergänzt TEST-DISZIPLIN oben um
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
  (g) TRIFFT EINE MUTATION MEHR ALS VORHERGESAGT, IST VOR JEDER REPARATUR ZU PRÜFEN,
      OB DIE ZUSATZTREFFER DIESELBE FEHLERKLASSE MELDEN. Tun sie es nicht, ist der
      Überschuss KEINE Abdeckung, sondern eine KASKADE — und wer ihn als Abdeckung
      verbucht, schreibt sich eine Sicherheit auf, die es nicht gibt. BELEG: Eine
      Mutation traf fünf statt drei Tests; die drei erwarteten meldeten "Found
      multiple elements", die zwei zusätzlichen "Unable to find an element". Zwei
      Fehlerklassen haben keine gemeinsame Ursache. Die Gegenprobe entscheidet es:
      derselbe Block ISOLIERT unter derselben Mutation — grün. Ursache war ein
      unverbrauchter Once-Wert aus einem früher abgebrochenen Test (clearAllMocks
      leert die AUFRUFE, nicht die Warteschlange), also Folgeschaden statt Deckung.
  (h) EINE MUTATION, DIE ZWEI ACHSEN GLEICHZEITIG BEWEGT, IST KEINE MUTATION, SONDERN
      EIN UMBAU. Ihr Ergebnis sagt nicht, WELCHE Achse gedeckt ist. Aufgelöst wird das
      durch TEILEN und eine Vorab-Ansage je Teilprobe, nicht durch Nachbessern am
      Code. BELEG: Eine Serialisierung des Fan-Outs änderte Gleichzeitigkeit UND
      Containment in einem Schritt; drei Tests fielen, und welcher zu welcher Achse
      gehörte, war am Ergebnis nicht zu sehen.
  (i) EINE VORHERSAGE, DIE IHRE EIGENE UNSCHÄRFE BENENNT, IST AUCH DANN BRAUCHBAR,
      WENN SIE DANEBENLIEGT — entscheidend ist, ob die Abweichung INNERHALB der vorab
      benannten Klasse liegt. Der Preis der Unschärfe ist eine Zeile ("ich nenne die
      Klasse, nicht die Zahl"); der Preis der falschen Bestimmtheit ist, dass niemand
      unterscheiden kann, ob ein Überlauf ein Zufall oder ein Befund war.
  Herleitung mit den konkreten Fundstellen: docs/claude-history/phase-9-ab-testing.md
  bzw. docs/claude-history/phase-10-workspace.md.
- EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, UND KEINE DAVON MACHT SIE ROT
  (Ergänzung zu Lektion (d) darüber, die den vierten Fall führt — einen Wächter ohne
  Positivkontrolle):
  (1) IHR GEGENSTAND WIRD ENTFERNT. Nimmt ein Umbau die Sache weg, deren Abwesenheit
      behauptet wird, geht die Behauptung ab da IMMER auf. Der Wächter meldet weiter
      Erfolg und schützt nichts. BELEG: Ein Test behauptete, ein Pfad greife nicht auf
      eine Alt-Tabelle zu — nach der Umstellung kannte der Pfad diese Tabelle gar nicht
      mehr. FOLGE: Bei jedem Umbau, der eine Quelle oder ein Ziel AUSTAUSCHT, werden die
      Abwesenheits-Behauptungen eigens durchgegangen; sie sind die einzige Testart, die
      durch das Verschwinden ihres Gegenstands STÄRKER aussieht statt schwächer.
  (2) SIE IST TRIVIAL WAHR. "Nichts passiert" gilt auch dann, wenn die geprüfte Wirkung
      aus einem ganz anderen Grund gar nicht eintreten KANN — etwa weil eine
      Vorbedingung tiefer im Pfad vorher zurückkehrt. Der Test ist grün, bevor es die
      geprüfte Sache überhaupt gibt.
  (3) "BLOCKIERT" UND "ABGESTÜRZT" SEHEN AN IHR IDENTISCH AUS. Ein Test, der nur prüft,
      dass etwas NICHT passiert, unterscheidet ein wirksames Gate nicht von einem
      abgebrochenen Handler. Es braucht zusätzlich einen Test, der prüft, dass der
      Handler ZU ENDE läuft.
  DAZU GEHÖRT EINE VIERTE, DIE KEIN TEST-, SONDERN EIN KOMMENTAR-FEHLER IST: EIN
  TESTKOMMENTAR KANN EINE GARANTIE BEHAUPTEN, DIE SEIN TEST NICHT DECKT. Der Test ist
  dann nicht falsch — seine SELBSTBESCHREIBUNG ist zu weit, und sie lädt dazu ein, eine
  Achse für gedeckt zu halten und keinen Test dafür zu schreiben. BELEG: Ein Kommentar
  behauptete "beide Aufrufe stehen, bevor einer antwortet"; bei serieller Abarbeitung
  blieb der Test grün, weil das erste Bein sofort antwortet. Wird das entdeckt, wird
  BEIDES getan — den Kommentar berichtigen UND den fehlenden Test ergänzen.
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
- WAS NUR IM GESPRÄCH GESAGT WIRD, EXISTIERT FÜR DIE NÄCHSTE SITZUNG NICHT: Jede
  Entscheidung, jede gemessene Angabe und jede Zusage, die künftige Arbeit BINDET, wird
  noch in derselben Runde in eine Datei geschrieben — nicht in eine Antwort, nicht in
  den Verlauf. BELEG: dreimal in EINER Phase; zweimal fiel es erst auf, als ein
  Zuschnitt darauf bauen wollte und ins Leere griff, beim dritten Mal betraf es diese
  Regel selbst, die bis zu ihrer Aufnahme nirgends stand. ABGRENZUNG zur
  Protokollpflicht am Rundenende: die greift, WENN eine Runde endet — diese greift,
  SOBALD etwas entschieden ist. Wer auf das Rundenende wartet, hat den Kontextwechsel
  schon verloren.
- EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN: Unerwartetes ROT ist
  genauso ein Befund wie unerwartetes Grün — es fällt nur seltener auf, weil Rot nach
  Erfolg aussieht. Beide Abweichungen werden VOR jeder Reparatur untersucht, nicht
  weggebucht. BELEG: sechsmal in einer Phase, davon FÜNFMAL in dieselbe Richtung (zu
  eng gezählt). Dass die Streuung einseitig ist, ist die eigentliche Aussage — Zufall
  träfe mal nach oben, mal nach unten; eine systematische Ursache trifft immer dieselbe
  Seite. Was bei einem Überschuss zu prüfen ist, steht als Lektion (g) an
  "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE".
- EINE REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN — DER BRUCH ZEIGT SICH AN IHRER
  BEGRÜNDUNG, NICHT AN IHREM WORTLAUT: Wer prüfen will, ob eine Regel den NÄCHSTEN Fall
  noch trägt, liest ihre Begründung, nicht ihren Text. BELEG: "abwesendes Feld heisst
  erlaubt", begründet mit "die Seite ist älter als das Feld". Bei EINEM Ziel deckten
  sich Regel und Grund vollständig; beim zweiten heisst "abwesend" für das eine "alte
  Seite" und für das andere "über dieses Ziel wurde nie gefragt" — und ein Ja daraus
  wäre ein Forward ohne Einwilligung gewesen. Am WORTLAUT war bis zuletzt nichts zu
  sehen; er war korrekt formuliert.
- EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD — UND DAS FÄLLT
  NIEMANDEM AUF, WEIL DIE REGEL WEITER STIMMT: Ein Beleg ist eine TATSACHENBEHAUPTUNG
  ÜBER DEN CODE und altert mit ihm; die Regel darüber altert nicht mit. Wer eine Regel
  als Maßstab benutzt, prüft ihren Beleg am HEUTIGEN Code, bevor er ihm folgt. Ist er
  überholt, wird er RICHTIGGESTELLT und nicht gestempelt — ein Maßstab mit falschen
  Angaben taugt nicht als Maßstab, auch wenn sein Satz stimmt. BELEG: In dieser Datei
  ist die Figur VIERMAL angewandt worden ("RICHTIGGESTELLT, NICHT GESTEMPELT"), ohne je
  als Regel formuliert zu sein. Eine Regel, die viermal gebraucht wurde, ohne zu
  existieren, ist reif. ABGRENZUNG zur Regel darüber: dort trägt die BEGRÜNDUNG nicht
  mehr, hier ist die TATSACHENANGABE veraltet — die Regel bleibt in beiden Fällen wahr.
- EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE VORBEDINGUNG: Sie
  trennt VORHER nicht von NACHHER, und ein Test darauf ist grün AUS DEM FALSCHEN GRUND.
  BELEG: Ein Wächter verlangte "beide Karten stehen auf nicht konfiguriert" — das war
  schon durch den stehengebliebenen Wert des VORIGEN Projekts erfüllt. Der Test war
  grün, weil eine Wettlaufsituation ihn rettete, nicht weil der Riegel hielt. AUFGELÖST
  DURCH EINE VERANKERUNG, NICHT DURCH EINE SCHÄRFERE ASSERTION: Der Zustand bekam ein
  Merkmal, das NUR er haben kann. ABGRENZUNG zu Lektion (c) an "MUTATIONSPROBEN": jene
  spricht vom INSTRUMENT, das die Voraussetzung mitreisst — diese vom ANKER, der die
  beiden Zustände nicht unterscheidet. Ein Instrument kann tadellos sein und der Anker
  trotzdem untauglich.
- EIN GRÜNER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRÜNHEIT DERSELBE GEBLIEBEN
  IST: Wer einen Zustand von einem Ort an einen anderen verlegt, prüft die Tests, die
  ihn BETREFFEN — nicht nur die, die dabei brechen. BELEG: Eine Zusage ("der Fehler ist
  nach dem erneuten Öffnen weg") hielt vorher, weil ein Reset-Aufruf ihn leerte, und
  hält nachher, weil die haltende Komponente ABGEBAUT wird. Zusage gleich, Mechanismus
  anders, Test durchgehend grün — niemand hätte es gemerkt, weil ein roter Test zum
  Hinsehen zwingt und ein grüner nicht. ABGRENZUNG zu "NUR EIN TEST IST EIN WÄCHTER":
  dort geht es um einen Schutz OHNE Test, hier um einen Test, der seinen Gegenstand
  unbemerkt gewechselt hat.
- EINE ZÄHLUNG ENTLANG EINER ACHSE IST BEI EINEM UMBAU SYSTEMATISCH ZU NIEDRIG, NICHT
  ZUFÄLLIG: Vor jeder Umfangs-Zahl werden die Achsen einzeln benannt, an denen eine
  Änderung brechen kann — und die Zahl gilt je Achse, nicht insgesamt. BELEG: Dieselbe
  Änderung brach Bestandstests auf DREI Achsen (Beschriftung, Quelle des Zustands,
  Synchronität), und die Achsen überlagerten sich zeilenweise. Die erste Zählung sah nur
  die erste, die zweite fand die zweite, und die dritte war aus dem Code überhaupt nicht
  ablesbar — sie fand erst eine Probe. Wer EINE Achse zählt, zählt zu niedrig, und zwar
  immer nach unten.
- EINE BEDINGUNG, DIE EINE ARBEIT AN EINE ANDERE HÄNGT, MUSS BENENNEN, WAS DER
  GEGENSTAND BRAUCHT — NICHT, WAS ZUR SELBEN ZEIT GERADE SONST NOCH AUSSTEHT: Sonst gilt
  sie als erfüllt, sobald das Zufällige erledigt ist, und die Arbeit sieht baubar aus,
  ohne es zu sein. BELEG: Ein Vorhaben war an "es braucht die Adapter, die es hier nicht
  gibt" gebunden. Beide Adapter entstanden — und es war KEINEN Schritt näher, weil ihm
  in Wahrheit ein Lesepfad, ein Rückkanal und eine Maskierung fehlten. Die Bedingung war
  formuliert worden, als GAR KEIN Adapter existierte; sie beschrieb, was zufällig auch
  fehlte.
- WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE: Eine
  Teilkorrektur an einem Satz, der zwei zusammengehörige Angaben trägt, ist gefährlicher
  als gar keine — danach stimmt die eine Hälfte, und genau deshalb liest niemand die
  andere nach. Vor jeder punktuellen Korrektur wird der GANZE Satz gelesen. BELEG:
  Angeordnet war, in einem Kommentar nur eine Nummer nachzuziehen; danach war die Nummer
  richtig und die BEDINGUNG davor falsch, und der Satz sah korrigiert aus.
- EINE ANLEITUNG, DIE EINE VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ENTWARNUNG:
  Wer eine Prüfanleitung schreibt, nennt die Zustände, die vorliegen MÜSSEN, damit der
  Schritt überhaupt etwas messen kann — der Ausführende kann nicht wissen, dass eine
  fehlt, und meldet dann "geprüft, in Ordnung" für einen Schritt, der nie stattgefunden
  hat. ABGRENZUNG zu Lektion (c) an "MUTATIONSPROBEN": dort reisst das INSTRUMENT die
  Voraussetzung mit — hier nennt die ANLEITUNG sie nicht, und das Instrument ist in
  Ordnung. Zwei verschiedene Achsen, dieselbe falsche Entwarnung als Ergebnis.
- EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS: Vor dem Schritt wird
  geprüft, ob im ausgelieferten Artefakt etwas steht, das die geprüfte Wirkung SCHON VOR
  der geprüften Stelle abfängt. Fehlt der vorausgesetzte Zustand, misst der Schritt
  einen Fehlschlag, der keiner ist — und die Suche beginnt am falschen Ende. Ein solcher
  Schritt gehört als PFLICHT-STOPP in die Anleitung, nicht als Hinweis: was er
  abfängt, ist korrektes Verhalten und darf nicht als Befund protokolliert werden.
  BELEG: Ein ausgelieferter Consent-Schlüssel entsteht zur ERZEUGUNGSZEIT; wer nach dem
  Eintragen einer Kennung nicht neu veröffentlicht, misst ein fail-closed-Verhalten und
  schreibt es dem Adapter zu.
- EINE BILLIGE MESSUNG WIRD NICHT DURCH EINE HERLEITUNG ERSETZT: Eine schlüssige
  Ableitung aus dem Code oder dem Diff sagt nichts über die deployte Laufzeit. Ist die
  Messung billig, wird gemessen — und wo nicht gemessen wurde, steht das dabei.
  ABGRENZUNG zur Provenienz-Disziplin, die in dieser Datei schon gelebt wird: jene
  verlangt, die HERKUNFT einer Angabe zu nennen; diese verlangt, die Messung nicht
  wegzulassen, nur weil eine Herleitung überzeugend klingt. Eine korrekt als
  "hergeleitet" gekennzeichnete Angabe ist ehrlich und trotzdem die schlechtere.
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
  ERGÄNZT 2026-08-05 — DAS SCHÄRFERE BEISPIEL, ohne dass am Obenstehenden etwas zurückgenommen
  wird: project_secrets (0021, die Geheimnis-Tabelle der Phase 11) trägt RLS aktiv und KEINE
  EINZIGE Policy. Der Unterschied zu project_tokens ist genau der Punkt: project_tokens trägt
  ZWEI Policies (insert/update), project_secrets trägt KEINE — sie ist damit das REINSTE
  Beispiel dieser Regel im System. Für anon und authenticated ist sie vollständig
  verschlossen, obwohl beide per Grant volle DML-Rechte auf ihr haben; die einzige
  Schreib-Autorisierung liegt im Ownership-Gate der Server-Actions. Wer dort eine Policy
  ergänzt, gewinnt keinen Schutz, sondern nur dessen Anschein.
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
- OB EINE MIGRATION IN DER LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT
  ENTSCHEIDBAR: Eine Datei in supabase/migrations/ beweist, dass sie
  GESCHRIEBEN wurde — nicht, dass sie gelaufen ist. Es gibt keinen
  Migrations-Runner und soll keinen geben (s. "MIGRATION IMMER VOR
  CODE-DEPLOY"), also macht kein Automatismus aus einer Datei einen Vollzug.
  FOLGE: Eine Aussage über den angewandten Stand wird NIE aus dem Verzeichnis
  fortgeschrieben, sondern ausschliesslich aus einer Messung im SQL-Editor
  oder aus einem Live-Test — und der Beleg dafür gehört dazu. Wer aus der
  Anwesenheit einer Datei auf den Zustand der Datenbank schliesst, plant gegen
  ein Schema, das es so nicht geben muss. Der gemessene Ist-Stand steht in
  docs/db-stand.md (NICHT automatisch geladen).
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
- DAS ETIKETT IM NEXT-BUILD-OUTPUT BENENNT DIE KONVENTION, NICHT DIE LAUFZEIT (Phase 10.5,
  gemessen 2026-08-03): Die Zeile "ƒ Proxy (Middleware)" stand VOR und NACH dem Umzug
  middleware -> proxy WÖRTLICH UNVERÄNDERT da — während die Laufzeit im selben Schritt von
  der Edge auf Node wechselte. Das Etikett ist damit ein KONSTANTER Text und trägt KEINE
  Information über die Laufzeit. Wer eine Runtime daraus abliest, liegt falsch, und zwar
  ohne es zu merken: Der Text sieht in beiden Zuständen aus wie eine Bestätigung.
  IN DIESEM PROJEKT BEREITS ZWEIMAL PASSIERT — beide Male in die falsche Richtung:
  (1) in der Aufklärung, wo das Etikett als einer von vier Belegen dafür geführt wurde,
  dass Next die neue Konvention schon zieht; (2) im Bau-Plan, wo "Etikett zeigt ƒ Proxy
  OHNE die Klammer" zunächst als LADEBEWEIS-Kriterium vorgesehen war — hätte es als
  Kriterium gegolten, wäre eine gelungene Umstellung als gescheitert gemeldet worden.
  WO DIE LAUFZEIT WIRKLICH STEHT (beides am eigenen Build gemessen, nicht aus Doku):
  - EDGE: Eintrag in .next/server/middleware-manifest.json; files und entrypoint liegen
    unter server/edge/, gebaut über ein edge-wrapper-Template.
  - NODE: Eintrag in .next/server/functions-config-manifest.json mit "runtime": "nodejs",
    dazu .next/server/middleware.js im CommonJS-Format (require/module.exports) plus ein
    .nft.json (Node File Trace) — beide gibt es im Edge-Fall nicht.
  GRENZE: Gilt für Next 16.2.12 und den Turbopack-Build dieses Projekts. Ändert Next die
  Ausgabe oder das Manifest-Schema, ist die Zuordnung neu zu messen — die REGEL bleibt.
  FOLGE, und sie ist der eigentliche Punkt: Jede künftige Runtime-Frage wird AM MANIFEST
  beantwortet. Nie am Etikett, nie an einem Doku-Zitat. Ein Zitat sagt, was gelten SOLL;
  das Manifest sagt, was der Build TATSÄCHLICH erzeugt hat.
- DIE NEXT-KONVENTIONSDATEI IST src/proxy.ts UND LÄUFT IN DER NODE-RUNTIME (Fakt über den
  heutigen Code, Stand Phase 10.5): Sie exportiert die Funktion proxy. Die Laufzeit ist
  dort NICHT konfigurierbar — Edge steht für die proxy-Konvention nicht zur Verfügung
  (Herkunft dieser Aussage: Next-Doku im installierten Paket, NICHT eigene Messung; eigene
  Messung ist der Node-Befund oben). Wer also eine Edge-Laufzeit für diese Datei braucht,
  hat kein Konfigurationsproblem, sondern muss die Konvention wechseln.
  IHR MATCHER SCHLIESST NUR VIER DINGE AUS: _next/static, _next/image, favicon.ico und die
  aufgezählten Bilddateien. Daraus folgt, was leicht übersehen wird: /api/e UND /api/capi
  laufen DURCH diese Datei hindurch — bei jedem Beacon jedes Besuchers jeder Kundenseite.
  Der Passthrough im Rumpf reicht sie nur durch. Ein Ausschluss im Matcher wäre der
  kürzere Weg, ist aber eine Verhaltensänderung auf dem heissesten Pfad und deshalb
  bewusst NICHT mitgebaut: docs/claude-history/backlog-polish.md, Eintrag "MATCHER DER
  KONVENTIONSDATEI SCHLIESST DIE INGEST-PFADE NICHT AUS".
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
  es bereits fast tut). So kann die spätere MCP-Schicht (Phase 18) dieselbe geprüfte Logik
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
  an"-Zustand (z.B. bereits publiziertes Projekt) fälschlich als aus. Beim Publish-Leak
  zusätzlich sicherheitsrelevant: falscher "veröffentlicht"-Zustand könnte Ad-Budget auf
  die falsche URL lenken.
  AUS WELCHER QUELLE — die zweite Hälfte der Regel, und ohne sie führt die erste in die
  Irre: Ein abgeleiteter Zustand ist nur so gut wie seine Quelle. Behaupten ZWEI Quellen
  dasselbe, wird die genommen, aus der auch die WIRKUNG gespeist wird — dieselbe Tabelle,
  dieselbe Zeile, die der ausführende Pfad liest. Ein CLIENT-besessener Blob-Wert ist die
  SCHWÄCHERE: er überlebt nur, solange der Client ihn zurückspiegelt, und ein alter Tab
  kann ihn jederzeit überschreiben. BEISPIEL, an dem beide Seiten sichtbar sind: "sind
  Zugangsdaten für dieses Ziel hinterlegt?" wird aus der Geheimnis-Tabelle abgeleitet
  (listConfiguredTargets), weil GENAU DIESE Tabelle auch der Forward-Pfad liest
  (getCapiConfigByTrackingKey) — zwei Wahrheiten werden damit zu einer.
  RICHTIGGESTELLT (Phase 11 Scheibe 6), Wortlaut vorher: "Ableiten aus der Wahrheitsquelle
  (settings.hosting / settings.capi.tokenSet / ...) ist korrekt für beide Fälle." DER
  ZWEITE WERT IST KEINE WAHRHEITSQUELLE MEHR. Am Code gemessen (2026-08-08): getCapiTokenSet
  hat im Produktivcode KEINEN Aufrufer; settings.capi.tokenSet wird von Server und Client
  weiterhin GESCHRIEBEN, aber nur noch gelesen, um sich selbst fortzuschreiben. Wer dem
  alten Beispiel folgte, baute das Gegenteil dessen, was jene Scheibe entschieden hat.
  RICHTIGGESTELLT und NICHT gestempelt, weil diese Regel eine VORGABE ist: ein Maßstab mit
  falschen Angaben taugt nicht als Maßstab.
  settings.hosting BLEIBT als Beispiel richtig — für den CLIENT-seitigen View-State. Es
  ersetzt NICHT die Regel weiter oben in dieser Sektion, dass die domains-ZEILE die
  alleinige Wahrheit über "ist dieses Projekt live?" ist; settings.hosting ist deren
  Spiegel, und der Publish-Pfad leitet aus der Zeile ab, nicht aus dem Spiegel.
  Die Aufzählung im ersten Satz und das "Dreimal aufgetreten" bleiben unangetastet: sie
  benennen VIEW-States und eine Historie, nicht Quellen.
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
  führt es in einen Bereich, in dem nichts steht. DRITTE BEDINGUNG, DER TEXT: der
  SICHTBARE Text trägt den BEFUND (was nicht stimmt, und wo), das title-Attribut die
  HANDLUNG (was zu tun ist). Beides in den sichtbaren Text zu packen sprengt jede
  Leiste; nur die Handlung zu zeigen zwingt zum Raten, was überhaupt kaputt ist. Der
  Befund muss ausserdem den BEREICH erkennen lassen, sonst weiss der Nutzer nicht,
  wohin er klicken soll.
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
- WELCHE REGEL WANN GREIFT: BEKOMMT DIESER FEHLER EIN BLEIBENDES SIGNAL? (Phase 10;
  das KRITERIUM neu gefasst 2026-08-03 — der Rahmen über den drei Regeln in dieser
  Nachbarschaft: "EIN SIGNAL LEUCHTET NUR …", "AUFRÄUMEN AM ANFANG …" und dieser
  hier; sie werden NICHT wiederholt, sondern eingeordnet).
  DAS KRITERIUM, EIN EINZIGER SATZ: Ein Fehler bekommt genau dann ein bleibendes
  Signal, wenn SEINE BEDINGUNG NOCH WAHR IST, wenn der Nutzer das nächste Mal
  hinsieht. Ist sie das nicht, erscheint er in dessen Sichtfeld und wird beim
  BETRETEN des Kontexts zurückgesetzt (Mechanik: s. "AUFRÄUMEN AM ANFANG EINER
  SITZUNG"). Das Signal selbst steht zusätzlich unter den Bedingungen der Regel
  "EIN SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN".
  WAS DIESES KRITERIUM ABLÖST — UND WARUM ES NICHT ZURÜCKGEDREHT WERDEN DARF: Bis
  2026-08-03 stand hier eine Einteilung in "KLASSE A — interaktive Aktion" gegen
  "KLASSE B — Hintergrund-Ereignis". Beide waren NÄHERUNGEN für genau die eine Frage
  oben, und sie nähern FALSCH. Dass der Nutzer geklickt hat, sagt nichts darüber,
  wie lange die Bedingung wahr bleibt: EIN INTERAKTIVER FEHLER KANN EIN DAUERHAFTER
  ZUSTAND SEIN.
  BELEG, DER DIE ALTE FASSUNG WIDERLEGT HAT (erster realer Fall, 2026-08-03): Eine
  Track-Aktion in einem Projekt OHNE hinterlegte Pixel-ID/Token ist nach dem alten
  Muster Klasse A — der Nutzer klickt, der Fehler steht in seinem Sichtfeld, also
  kein Signal. Das ist FALSCH. Der Zustand bleibt wahr, bis jemand einen Pixel
  hinterlegt; er überlebt jeden Kontextwechsel und ist genau das, wofür ein Signal
  existiert. Die alte Regel wurde in diesem Fall in die falsche Richtung angewandt —
  sie war nicht bloss unscharf, sie hat aktiv fehlgeleitet.
  DER GEMESSENE BESTAND, jetzt richtig erklärt (Symbole am Code erhoben):
  publishStatus/publishError beschreiben einen ABGESCHLOSSENEN VERSUCH — beim
  nächsten Hinsehen ist ihre Aussage veraltet. Deshalb kein Signal, und deshalb
  leert resetDrawerStatusChannel genau diese ZWEI Werte beim Öffnen.
  BELEG RICHTIGGESTELLT (Phase 11 Scheibe 6; am Code gemessen 2026-08-08): Hier
  standen VIER Werte, weil capiTokenStatus/capiTokenError mitgezählt waren. Beide
  gibt es im Container nicht mehr — der Statuskanal der Zugangsdaten liegt in der
  Karte je Ziel und heisst dort status/error. DIE REGEL IST UNBERÜHRT und steht
  wörtlich wie zuvor; überholt war allein ihr Beleg, also eine TATSACHENBEHAUPTUNG
  ÜBER DEN CODE.
  DER NEUE BELEG TRITT DANEBEN, weil er die STÄRKERE Illustration derselben Regel
  ist: Jener Zustand liegt jetzt dort, wo seine Lebensdauer endet, und stirbt mit
  dem ABBAU seiner Komponente — beim Projektwechsel über den key, beim Schliessen
  der Fläche über den Abbau des Drawers. Er braucht gar keinen Reset mehr. Ein
  Zustand, der von selbst endet, ist die bessere Bauform als einer, den ein Aufruf
  leeren muss; der Reset bleibt für den Publish-Kanal, weil dieser im Container
  lebt und dort leben muss. Der Ladefehler der Varianten-Auswertung
  dagegen ist beim nächsten Hinsehen NOCH DA, weil niemand erneut geladen hat —
  deshalb trägt measureSignal ihn (liest variantCounts?.ok === false plus den
  Sichtbarkeits-Term und enthält KEIN drawerArea). DAS NEUE KRITERIUM ERKLÄRT BEIDE
  FÄLLE; das alte traf sie nur zufällig richtig.
  WO DAS SIGNAL SITZT — CONTEXT FIRST: in den Bereich, in dem das Problem
  HANDHABBAR ist (am Reiter/Abschnitt), NICHT global am Haupt-Bedienelement. Ein
  Signal am globalen Icon liest sich als Störung der ganzen Anwendung; ein Fehler in
  den Einstellungen gehört dorthin, wo er behebbar ist. AUSNAHME: echte
  systemkritische Blocker, die den ganzen Editor betreffen — die dürfen global sein.
  ZUSTANDSBASIERT, NICHT FLACKERND: Die Signalbedingung liest AUSSCHLIESSLICH den
  Fehlerzustand, NIE die gerade aktive Ansicht. Ein Signal, das beim Anklicken des
  Reiters verschwindet, verschwindet beim Hinschauen statt beim Lösen — es
  beschreibt dann die Navigation, nicht den Zustand. Es geht aus, wenn das Problem
  weg ist, und sonst nie.
  DIE FRÜHER HIER OFFEN GEFÜHRTE FRAGE IST BEANTWORTET (Fan-Out, Phase 11): Sie
  lautete, ob die Klasse am AUSLÖSER hängt oder am ZEITPUNKT. Die Antwort ist: an
  KEINEM von beiden — die Frage war falsch gestellt. Beim Multi-Tracking-Fan-Out
  sind es ZWEI VERSCHIEDENE EREIGNISSE, nicht dasselbe zu zwei Zeitpunkten:
  - Eine abgewiesene ZIELKONFIGURATION ist ein ZUSTAND des Projekts: einmal wahr,
    bleibend, behebbar. Ihre Bedingung ist beim nächsten Hinsehen noch wahr — sie
    bekommt ein Signal.
  - Ein gescheiterter FORWARD beim Besucher-Traffic ist ein VORKOMMNIS im
    Ingest-Pfad: unbegrenzt oft, ohne Zustandsänderung.
  FOLGE, die dazugehört: Der server-seitige Ziel-Fehlschlag gehört NICHT ins
  Fehlersystem. Er ist keine Meldung, sondern eine GRÖSSE — dieselbe Denkfigur wie
  die Adblocker-Verlustrate. Wer ihn als Fehlermeldung baut, hängt eine Anzeige an
  ein Ereignis, das pro Besucher eintreten kann. S. "WORTWAHL DASHBOARD 'NUR
  server-seitig erfasst', NIEMALS 'gerettet'".
  Herleitung: docs/claude-history/phase-10-workspace.md — dort steht die
  A/B-Beobachtung von damals unverändert. Sie war korrekt BEOBACHTET; untauglich war
  sie als KRITERIUM, nicht als Beschreibung.
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
  DIE REICHWEITE DIESER REGEL IST DIE WIRKUNG, NICHT DAS KOMMANDO IN IHREM TITEL:
  JEDES Werkzeug, das eine Datei GANZ NEU SCHREIBT, statt sie zu BEARBEITEN, kann
  Zeichen verändern, die niemand angefasst hat. Betroffen sind ZEILENENDEN und
  KODIERUNG, einzeln oder beides zugleich — eine zurückgeschriebene Datei kann ihre
  Umlaute und Gedankenstriche doppelt kodiert wiederbekommen, obwohl an ihrem Inhalt
  nichts geändert wurde.
  WARUM DAS STILL IST UND DESHALB TEUER: Kein Werkzeug meldet etwas, der Bau läuft
  weiter, die Tests bleiben grün. Sichtbar wird es ausschliesslich im DIFF — wer nur
  auf "grün" schaut, sieht es nie.
  DIE KOMMANDOS SIND BEISPIELE, NICHT DIE LISTE: die in-place-Schreiber (sed -i,
  perl -i), die Ganz-Datei-Schreiber der PowerShell (Set-Content, Add-Content,
  Out-File) und die Umlenkungen > und >> in beiden Welten, tee, jedes Skript mit
  einem writeFileSync-Äquivalent, ein Formatierer-Durchlauf über eine ganze Datei —
  und das Write-Werkzeug, wo es eine BESTEHENDE Datei ersetzt statt sie zu
  bearbeiten. WER SEIN WERKZEUG HIER NICHT FINDET, IST NICHT AUSGENOMMEN: Die Frage
  lautet nie "steht es in der Aufzählung?", sondern "schreibt es die ganze Datei?".
  DIE VORSCHRIFT OBEN — für Datei-Änderungen das Editier-Werkzeug nutzen — GILT
  DAMIT FÜR ALLE DIESE WERKZEUGE, nicht nur für das eine im Titel genannte. Ebenso
  die Prüfung: nach jedem Schreiben UND nach jeder Rücknahme git status, leere Diffs
  ausschliessen. BEI KODIERUNGS-VERDACHT KOMMT EINE ZWEITE PRÜFUNG DAZU, und sie ist
  nicht dieselbe: Ein doppelt kodierter Text zählt als INHALT, der Diff ist also
  gerade NICHT leer, sondern gross — geprüft wird per Suche nach zerstörten Zeichen
  im Diff, nicht per Zeilenzahl.
  IST ES PASSIERT: aus der Versionsverwaltung wiederherstellen und die Änderung mit
  dem Editier-Werkzeug neu eintragen. Eine Reparatur mit demselben Werkzeugtyp kann
  denselben Fehler ein zweites Mal erzeugen.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- NAHT-HYGIENE (7c-2, aktiv): 7c-2 koppelt Domain-/Routing-Logik NICHT an Tracking-/
  Lead-Logik. Die Andock-Punkte für spätere Module existieren BEREITS (neutraler
  /api/e-Trichter, projekt-scoped Settings); "nahtloses Andocken" folgt aus sauberen
  Nähten + additiver Disziplin, NICHT aus spekulativem Vorbau. KEINE Webhook-Interfaces/
  Schema-Erweiterungen ohne realen Konsumenten + Spec. Kontext:
  docs/claude-history/future-roadmap.md.

## Aktive Dokumente (nicht geladen, nicht Teil des CC-Kontexts)
Aktiv und konstant gepflegt — im Unterschied zum Detail-Archiv darunter, das
ABGESCHLOSSENE Historie trägt. Hier steht, was fortlaufend gilt, aber bewusst
nicht in jede Session geladen wird.
- docs/arbeitsweise.md — Arbeits- und Prompt-Disziplin (Kadenz, Stufen,
  Nachweisführung, Phasenende-Ablauf). VOM ARCHITEKTEN GEPFLEGT und NICHT Teil
  des CC-Kontexts: CC bekommt sie nicht automatisch und soll sie nicht lesen; sie
  beschreibt, WIE Aufträge entstehen, nicht was gebaut wird. Die CLAUDE.md
  verweist an einer Stelle auf sie ("## Aktiver Stand — Verfahren ab Phase 10").
- docs/db-stand.md — der gemessene Ist-Zustand von DB und Analytics-Lesepfad
  (Migrationsstand, Tabellen, Policies, Grants, Spalten, Constraints, Indizes,
  Funktionen, Event-Trigger, Backups). Am 2026-08-11 aus dieser Datei ausgelagert,
  zeichengleich. PFLICHTLEKTÜRE VOR jeder Migration und vor jedem Eingriff in Schema,
  Policies, RPCs oder den Analytics-Lesepfad — die Auflage steht oben unter
  "## Aktueller DB-/Analytics-Stand — AUSGELAGERT nach docs/db-stand.md".
  Fortgeschrieben wird sie ausschliesslich aus einer Messung (Probe:
  supabase/checks/db-stand.sql), nie aus den Migrationsdateien.

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
- docs/claude-history/phase-6-capi.md — Server-Side Tracking / Meta-CAPI
  (Secret-Storage, Dedup-Beacon, alle Debug-Lektionen).
- docs/claude-history/phase-7-hosting.md — Hosting/Go-Live inkl. XFH-Gate-Vollbeweis
  und der kompletten 7c-2-Familie (Wildcard-Infra, Add-Domain-Mutation,
  DNS-Anweisungs-UX, Entfernen). DORT stehen auch die Hosting-Ops-Details, die
  bewusst NICHT in der Root liegen: Registrierungs-Rate-Limit (5/Stunde/User),
  Support-Playbooks für CAA-Records und Metas Traffic-Permissions-Allow-List, die
  Vercel-Fehler-Mappings (409 domain_already_in_use -> Heilung) und das
  Verification-vs-Configuration-Statusmodell. Bei Domain-/DNS-Support-Fragen zuerst hier
  nachsehen.
- docs/claude-history/phase-8-analytics.md — GESAMTE gebaute Phase 8 (Analytics-
  Persistenz, CAPI-Härtung, Kill-Switch im Ingest, tracking_key-Spalte, PageView-Emitter,
  Read-Pfad/owner-SELECT-RLS, Adblocker-Verlustrate): volle Herleitung, Entscheidungen,
  Tests, Live-Verifikation je Scheibe. Der aktive Ist-Stand steht in
  docs/db-stand.md, nicht hier.
- docs/claude-history/phase-9-ab-testing.md — GESAMTE gebaute Phase 9
  (A/B-Testing: Varianten-Authoring, Split in der Serve-Route + Cookie,
  variant in Ingest und Persist, Auswertung je Variante, Lauf-Abgrenzung);
  dazu die zwei mitgereisten Nicht-A/B-Scheiben Fix-Scheibe safeAction
  (Client-Fehlerbehandlung) und Leere-Variante-Riegel (Publish verweigert
  leeren Inhalt). Der aktive Ist-Stand steht in docs/db-stand.md bzw. in
  "## Offene Punkte", nicht hier.
- docs/claude-history/phase-10-workspace.md — GESAMTE gebaute Phase 10
  (Workspace-Reorganisation: Bereiche MESSEN und VERÖFFENTLICHEN extrahiert,
  Einstellungen als Drawer mit Bereichs-Reitern, Projektwechsel als Mount-Grenze,
  Zustandssignal an der Reiterzeile, Statuskanal des Drawers). Trägt zusätzlich
  die verworfenen Alternativen (eigene Routen, Accordion, Modal) und die
  Invarianten der Phase. Die 17 dauerhaften Regeln daraus stehen bereits oben
  unter "## Immer beachten" und werden dort NICHT wiederholt; die Datei nennt im
  Kopf, welche das sind.
- docs/claude-history/phase-11-multi-tracking.md — GESAMTE gebaute Phase 11
  (Multi-Tracking / Server-Side Fan-Out). Trägt den Einstiegs-Block für die nächste
  Sitzung (was erreicht ist, was offen bleibt, die sechs weitergeltenden Auflagen),
  das beschlossene Consent-Modell, die Anbieter-Befunde zum zweiten Ziel, den
  Arbeitsvorrat am ersten Adapter und die verschobene dreizehnte Scheibe.
  DIES IST DIE FASSUNG, DIE GELESEN WIRD.
- docs/claude-history/phase-11-multi-tracking-rohfassung.md — die ROHFASSUNG derselben
  Phase: der ungekürzte Arbeitsstand, wie er WÄHREND des Baus geführt wurde,
  zeichengleich verschoben. NICHT der Einstieg — der ist die kuratierte Datei darüber.
  AUFSCHLAGEN, WENN MAN DORT ETWAS VERMISST: die Kuration war eine Auswahl, und diese
  Datei ist der Rückfall für den Fall, dass dabei etwas übersehen wurde. Wird NICHT
  gepflegt; ihre Zeiger sind tot oder werden es.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 18 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
- supabase/checks/ — versionierte, NUR LESENDE Messproben für Live-Tests und Gegenproben.
  KEIN Migrationsverzeichnis, wird nie automatisch angewandt. VOR jeder handgetippten
  Prüf-Query dort nachsehen (dort steht auch, welche Fallen eine Probe hat — z.B. der
  custom_host-Filter bei der Domain-Divergenz). Details: README im Ordner.
