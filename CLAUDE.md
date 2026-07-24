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
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3
- Hosting/Deploy-Orchestrierung: Vercel/Netlify API — ab Phase 7

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
- [ ] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
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
      Phase 8 bleibt OFFEN für Erweiterungen (eigene Scheiben): Uniques, Charts/Zeiträume,
      CAPI-Einbettung server-vereinheitlichen + Launch-Härtung.
- [ ] Phase 9 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 8)
- [ ] Phase 10 — AI-Native: Pagesmith MCP-Server. (Detail unter Zukunfts-Vision, war Phase 9)


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
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging /
  Restore-Drill aus Tier 2): Der Event-Trigger rls_auto_enable (aktiviert automatisch RLS auf
  neuen public-Tabellen, SECURITY DEFINER) existiert NUR in der laufenden DB — Zweck +
  Grant-Entzug sind in 0003 dokumentiert, aber ein CREATE steht in KEINER Migration. Bei einem
  Rebuild rein aus den Migrationsdateien fehlt die Funktion -> neue Tabellen bekämen dort NICHT
  mehr automatisch RLS (stiller Verlust einer Schutzschicht). Beim Rebuild mitziehen ODER RLS
  pro Tabelle bewusst manuell setzen.

## Aktueller DB-/Analytics-Stand (Ist-Zustand, kein Konzept)
Was der nächste Migrations-/Analytics-Schritt als Ausgangslage in der Root findet. Nur
Ist-Zustand — Herleitung und Entscheidungen: docs/claude-history/phase-8-analytics.md.
PROVENIENZ: GEMESSEN am 2026-07-24 (pg_proc / pg_policies / pg_indexes / information_schema /
pg_constraint) sind Existenz, Sicherheits-/Volatilitätsklauseln, Policies, Spalten, Constraints
und Index-NAMEN. AUS DEN DATEIEN stammen die Index-Spaltenlisten und die Migrationsnummern.
"Letzte Migration" ist NICHT direkt messbar (Migrationen laufen manuell im SQL-Editor, es gibt
keine gepflegte schema_migrations-Tabelle) — messbar sind nur die WIRKUNGEN.

- MIGRATIONSSTAND: Migrationsdateien bis 0015 (supabase/migrations/), ihre WIRKUNGEN in der DB
  verifiziert. Die Nummer stammt aus den Dateien, nicht aus einer Migrations-Tabelle.
- TABELLE public.events (in der DB verifiziert): id uuid PK DEFAULT gen_random_uuid();
  project_id uuid FK -> projects(id) ON DELETE CASCADE; event_type text; event_id text;
  source text (KEIN Default); created_at timestamptz DEFAULT now(). ALLE Spalten NOT NULL.
  CONSTRAINTS: events_pkey PK(id), events_project_id_fkey, CHECK events_event_type_max_len
  (length(event_type) <= 64). event_id trägt BEWUSST KEINEN Unique-Constraint (die geteilte
  browser/server-eventID IST der Verlustraten-Join).
- POLICIES auf events: RLS aktiv. events_select_own (FOR SELECT) — EXISTS auf projects mit
  p.user_id = (select auth.uid()) GEKAPSELT (gleiche Ownership-ACHSE wie projects_select_own,
  nicht byte-identisch: andere Syntax, EXISTS + Kapselung vs. direkter Vergleich). BEWUSST KEINE
  INSERT/UPDATE/DELETE-Policy -> Writes laufen ausschließlich über service_role (Ingest-Pfad);
  der Owner liest, schreibt nie. (Löst die frühere "RLS an, KEINE Policy — transient"-Notiz auf:
  seit Migration 0013 existiert die owner-SELECT-Policy.)
- RPCs (beide language sql, STABLE, set search_path = public, SECURITY INVOKER — die RLS des
  Aufrufers filtert von innen): get_event_counts(p_project_id) -> TABLE(event_type, count),
  gefiltert auf source='server' (0014); get_adblock_loss(p_project_id) ->
  TABLE(total_server_conversions, confirmed_conversions, first_confirm_at) (0015).
- INDIZES auf events: events_pkey; events_project_id_idx (project_id — trägt den äußeren Scan
  UND die Policy); events_project_event_idx (project_id, event_id — 0015, trägt den korrelierten
  Verlustraten-Join).
- projects.tracking_key text NULLABLE (2b-0, server-autoritative Identität) + partial-unique
  projects_tracking_key_key (WHERE tracking_key IS NOT NULL). projects.settings bleibt
  client-autoritativ (wird von saveProject ganzheitlich ersetzt).
- BEKANNTE ABWEICHUNG (Befund, reiner Performance-Punkt, KEIN Leak): projects/domains/
  project_tokens-Policies tragen blankes auth.uid() (Auswertung pro Zeile); nur events_select_own
  ist als (select auth.uid()) gekapselt. Ein Fix wäre eine Migration -> aufgeschoben, s.
  docs/claude-history/backlog-polish.md.
- rls_auto_enable: Event-Trigger-Funktion in public (SECURITY DEFINER, aktiviert RLS auf neuen
  public-Tabellen), EXECUTE-Grants per 0003 entzogen — existiert nur in der laufenden DB, aus
  KEINER Migration reproduzierbar (-> "## Offene Punkte").
- AUFGESCHOBEN (konditionale Optimierung, kein Footgun): CAPI-Forward auf Hintergrund-
  Zustellung umstellen (die 204 löst sich von Metas Latenz) — Trigger: falls Beacon-Latenz je
  ein echtes Problem wird. Detail: docs/claude-history/phase-8-analytics.md.

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
  AUSNAHME: der Event-Trigger rls_auto_enable (Migration 0003) IST SECURITY DEFINER — korrekt,
  weil Event-Trigger als Owner laufen; die DEFINER-Warnung des Advisors ist dort erwartet.
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
EINE Wahrheitsquelle für Launch-Blocker; sequenziert nach dem Moment, in dem das Risiko
real BEISST (nicht alles ist P0). Kompakt: pro Item Tragende Kontrolle + BINDET-AN.
Voll (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item):
docs/claude-history/security-manifest-full.md.

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
- LOGGING-LEAK: struktureller Fix — Token gar nicht erst als Server-Action-Argument
  loggen (nicht nur maskieren). BINDET-AN: seit 2a; vor Prod-Logging mit echten Tokens.
- E-MAIL-BESTÄTIGUNG wieder aktiv: Double-Opt-in in Supabase Auth (Dashboard-Toggle).
  BINDET-AN: öffentlicher Launch.
- KOSTEN-CIRCUIT-BREAKER: harter Spend-Cap + Alarm auf Vercel & Supabase (Plattform-
  Budget, nicht App-Logik). BINDET-AN: bevor eine Domain öffentlich Traffic zieht.
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
- SAFE-BROWSING: Redirect-ZIEL-URLs gegen Safe Browsing prüfen + pgsm.site-Flag
  überwachen (KEIN HTML-Content-Scan, Kategoriefehler). BINDET-AN: Fremd-Content live.
- SHARED-REPUTATION pgsm.site: Kill-Switch zur Isolierung + riskante Nutzer auf
  Custom-Domains (eigener eTLD+1) schieben. BINDET-AN: Multi-Tenant-Serving live;
  mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION: Supabase-HaveIBeenPwned-Abgleich (Pro-gated). BINDET-AN:
  öffentlicher Launch / Pro-Tier.
- ENCRYPTION-AT-REST CAPI-Token: tragend bleibt Isolation + RLS-SELECT-Sperre +
  service_role-only (Token physisch write-only); Verschlüsselung nur Defense-in-Depth
  (In-DB-Key = Theater, echtes Envelope braucht KMS). BINDET-AN: Härtung nach Launch.
- VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG: Token minimal scopen + jede
  Domain-Mutation mit Actor + Zeit protokollieren. BINDET-AN: 7c-2.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- DEPENDABOT: jetzt anschalten (gratis; optional Snyk). BINDET-AN: laufend.
- BACKUPS + Restore-Drill: Backup-Tier bestätigen + EINEN echten Restore-Drill fahren.
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
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
- CODE-REVIEWER-SUBAGENT: .claude/agents/code-reviewer.md — rein lesend/prüfend
  (Read/Grep/Glob + scoped Bash für tsc/lint/test/build, KEIN Schreiben/Committen),
  proaktiv nach Änderungen an Server-Actions, Supabase-Migrationen, Domain-/Hosting-
  Code (src/lib/hosting, src/lib/domains, src/lib/vercel) oder Tracking-Code
  (src/lib/capi) einsetzbar. Trägt unsere real aufgetretenen Fehlerklassen als feste
  Checkliste (Ownership-Gates, "use server"-Typ-Exporte, {data,error}-Destrukturierung,
  echte PKs statt angenommenem "id", DNS-Werte nie hardcoden, isAppHost-Änderungen,
  Klick-Wiring/auxclick, Status-vs-Wirkung-Tests). SYNCHRONISIERT SICH SELBST: liest
  bei jedem Review zuerst diese "Immer beachten"-Sektion und flaggt eigenständig
  ([SUGGESTION] Synchronisations-Hinweis), falls eine neue Lektion hier fehlt, die
  noch nicht in seiner Checkliste steht — KEIN manuelles Nachziehen bei jeder neuen
  Zeile hier nötig, außer bei einer echten gemeldeten Lücke.
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
  Lange Vorlagen als Text direkt in die Antwort, gestückelt — nie als Datei-Anhang (kommt leer an).
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
- POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL (Lektion, 7c-2-Bug): JEDE Supabase/PostgREST-
  Query IMMER { data, error } destrukturieren, NIE nur { data } — sonst wird ein Fehler
  still verschluckt und die UI zeigt eine leere Liste statt einer Fehlermeldung. Und: vor
  der Nutzung eines Feldnamens den ECHTEN Primärschlüssel der Zieltabelle in der Migration
  nachsehen, nie aus dem Feldnamen "id" annehmen — der PK der domains-Tabelle ist label,
  NICHT id. Beides zusammen erzeugte den Bug: eine nicht-existente Spalte -> PostgREST-42703
  -> verschluckt -> still leere Liste.
- DB-FUNKTIONEN + SEARCH_PATH (Advisor-Regel): Neue DB-Funktionen bekommen
  `set search_path = public` (fixiert die Namensauflösung; Supabase-Advisor "Function Search
  Path Mutable" flaggt sie sonst). Body zusätzlich voll qualifizieren (public.tabelle). Gilt
  für SECURITY INVOKER wie DEFINER.
- MIGRATION IMMER VOR CODE-DEPLOY (fail-closed): Eine Migration läuft IMMER im SQL-Editor VOR
  dem zugehörigen Code-Deploy — sonst liest der neue Code eine Spalte/Funktion, die es noch
  nicht gibt (bei CAPI hätte das die laufende trackingKey-Auflösung gebrochen). Umgekehrt ist
  eine Migration OHNE den zugehörigen Code in der Regel ein No-op und damit gefahrlos. Detail:
  docs/claude-history/phase-8-analytics.md.
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
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 10 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
