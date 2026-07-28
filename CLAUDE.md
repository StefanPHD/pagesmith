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
- [ ] Phase 9 — A/B-Testing: zwei Varianten je Projekt, 50/50-Split über die
      Serving-Schicht. Geschnitten in 9a (Varianten-Authoring — ABGESCHLOSSEN &
      live bewiesen 2026-07-27, Migration 0016), 9b (dreigeteilt) und 9c
      (Auswertung je Variante — OFFEN). 9b im Detail: 9b-1 (Split in der
      Serve-Route + __Host-ps_v-Cookie + Aktivierungs-Flag — ABGESCHLOSSEN &
      live bewiesen 2026-07-27, Migration 0017); 9b-1p (UI-Politur: lokaler
      Fehlerkanal + Hinweis auf unveröffentlichte Variante B — ABGESCHLOSSEN &
      live bewiesen 2026-07-27); 9b-2 (variant in Ingest und Persist SCHREIBEN
      — OFFEN). ANLEGEN UND BEFÜLLEN NICHT VERSCHMELZEN: events.variant wurde
      mit 0017 ANGELEGT (erledigt); das BEFÜLLEN ist 9b-2 und steht aus.
      Grundsatzentscheidungen + Scheiben-Detail: "## Aktiver Stand — Phase 9".
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
  Restore-Drill aus Tier 2): Die Event-Trigger-FUNKTION rls_auto_enable (aktiviert automatisch RLS
  auf neuen public-Tabellen, SECURITY DEFINER), gebunden über den Event-Trigger ensure_rls
  (ddl_command_end), existiert NUR in der laufenden DB — Zweck + Grant-Entzug sind in 0003
  dokumentiert, aber ein CREATE steht in KEINER Migration. Bei einem Rebuild rein aus den
  Migrationsdateien fehlt sie -> neue Tabellen bekämen dort NICHT mehr automatisch RLS (stiller
  Verlust einer Schutzschicht). DDL verbatim archiviert unter supabase/manual/rls_auto_enable.sql
  (beim Rebuild manuell mitziehen). evtowner = postgres (gemessen 2026-07-24) -> eine Migration
  unter der NÄCHSTEN FREIEN Nummer (Stand 2026-07-28: 0019; ableiten aus supabase/migrations/,
  NIE hardcoden — eine feste Nummer hier veraltet mit der nächsten Migration und überschriebe
  dann eine bestehende Datei) ist ein realistischer Kandidat, aber KEINE Nebenbei-Zeile:
  (a) create event trigger kennt KEIN
  "if not exists" -> Katalog-Guard nötig (DO-Block gegen pg_event_trigger); (b) "create or replace
  function" auf einer SICHERHEITSFUNKTION ersetzt die Definition VOLLSTÄNDIG (0014-Lektion) — jeder
  Transkriptionsfehler degradiert still den RLS-Schutz, daher nach dem Lauf Byte-Abgleich gegen
  pg_get_functiondef PFLICHT; (c) die Migration muss gegen die BESTEHENDE DB ein No-op sein.
- KEINE DB-BACKUPS IM FREE PLAN (Trigger: bevor die DB unersetzliche Daten trägt — de facto JETZT):
  Supabase Free enthält weder Scheduled Backups noch PITR. Für die laufende DB (Projekte,
  CAPI-Tokens, published_content, die Event-Historie mit den Phase-8-Live-Beweisen) existiert damit
  KEIN Wiederherstellungsweg; ein Rebuild aus den Migrationen wäre zudem unvollständig (s.
  ensure_rls oben). Zwischenlösung: manueller pg_dump, lokal verschlüsselt abgelegt (Ops-Weg, kein
  Verstoß gegen die "nur Supabase-JS-Client"-Regel, die für ANWENDUNGScode gilt) — EINMALIG
  vollzogen, Artefakt VERALTET (deckt nur den Stand VOR 0018 ab) -> ein Restore daraus ergäbe ein
  Schema, das der deployte Code nicht bedienen kann. Der Punkt bleibt damit OFFEN. Details und
  Provenienz: "## Security Manifest & Launch Blocker", BACKUPS. Dauerlösung: Pro
  (7 Tage Scheduled Backups). KOPPLUNG: mit dem Pro-Wechsel wird der Kosten-Circuit-Breaker fällig —
  Free deckelt strukturell, Pro rechnet Überverbrauch ab. Beides in EINEM Arbeitsschritt.
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
  Browser-Fingerprinting ist bereits ENTSCHIEDEN: wird nicht gebaut.
- LEERE VARIANTE IST VERÖFFENTLICHBAR -> LEERE LIVE-SEITE (gefunden 2026-07-27
  bei der 9b-1p-Aufklärung; Trigger: SOFORT — dies ist die NÄCHSTE Bau-Scheibe
  und der einzige Eintrag dieser Liste mit dieser Dringlichkeit; sie kommt vor 9b-2): Die
  Nicht-Leer-Prüfung aus 9b-1 (nonEmptyHtml / deliverableVariantB) greift zu
  SPÄT, weil der Server NACH der Prüfung Inhalt hinzufügt:
  injectPageViewEmitter("", key) liefert einen NICHT-LEEREN String (das
  Emitter-Script; bei fehlendem </body> hängt es ans Ende an). Kette: Variante
  leeren -> speichern -> publishen -> published_content(.variantB).html ist
  emitter-only -> nonEmptyHtml sagt "auslieferbar" -> der Besucher bekommt eine
  VISUELL LEERE Seite, ohne Fehler, ohne 404.
  ZWEITES, SCHLIMMERES LOCH (seit 9a): der Publish-Button prüft
  code.trim() === "" — das ist die AKTIVE Variante. Ist B aktiv und gefüllt, A
  aber leer, ist der Button frei und pairA kommt aus dem Stash -> ALLE Besucher
  bekommen die leere Seite, nicht nur Bucket B. Vor 9a war code immer A, deshalb
  trug der Guard damals.
  FIX-RICHTUNG (nicht entschieden, eigene Stufe 1): das EINGEHENDE
  functionalHtml server-seitig VOR der Emitter-Injektion auf nicht-leer prüfen,
  fail-closed — das deckt beide Varianten und hängt nicht am Client-Button.
  publishProject ist durch beide 9er-Scheiben byte-identisch geblieben; der
  Eingriff verdient eine eigene Runde.
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
PROVENIENZ: GEMESSEN am 2026-07-28 im SQL-Editor (schema_migrations, information_schema.columns,
pg_constraint, pg_class+pg_policy, pg_policies, role_table_grants, pg_indexes, pg_proc,
pg_event_trigger). Die Probe ist versioniert unter supabase/checks/db-stand.sql — vor jedem
Neuschreiben dieser Sektion dort fahren, nicht frisch tippen. AUCH die Index-DEFINITIONEN sind
diesmal gemessen (indexdef), nicht aus den Migrationsdateien übernommen.
FALLE bei jeder Wiederholung: schema_migrations existiert DREIMAL (public / auth / realtime).
Jede Katalog-Abfrage MUSS das Schema filtern — sonst liefert sie drei Zeilen mit
unterschiedlichen RLS-Werten und sieht wie ein Befund aus.

- MIGRATIONSSTAND: 0001-0018. Seit 0018 existiert public.schema_migrations als PROTOKOLL
  (version PK / filename / applied_at; RLS aktiv, KEINE Policy). Gemessen: 18 Zeilen, applied_at
  NUR bei 0018 (2026-07-27 18:09:01 UTC).
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
- TABELLE public.projects (server-logik-relevante Spalten): tracking_key text NULLABLE (2b-0,
  server-autoritativ); html_b text NULLABLE + mappings_b jsonb NULLABLE (0016); ab_test_active
  boolean NOT NULL DEFAULT false (0017); published_content jsonb NULLABLE; blocked_at +
  blocked_reason NULLABLE (0008); settings jsonb NOT NULL DEFAULT '{}' (CLIENT-autoritativ, wird
  von saveProject ganzheitlich ersetzt).
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
    trägt den Kill-Switch-Lookup.
  domains: domains_pkey (label); domains_custom_host_key UNIQUE (custom_host) WHERE custom_host
    IS NOT NULL; domains_project_id_idx (project_id).
  (projects_blocked_idx und domains_project_id_idx waren bisher in KEINER Doku-Zeile erfasst.)
- FUNKTIONEN in public: VIER.
  get_event_counts(p_project_id) -> TABLE(event_type, count), gefiltert auf source='server'
    (0014) — SECURITY INVOKER, stable, search_path=public.
  get_adblock_loss(p_project_id) -> TABLE(total_server_conversions, confirmed_conversions,
    first_confirm_at) (0015) — INVOKER, stable, search_path=public.
  BEIDE RPCs: SECURITY INVOKER — die RLS des Aufrufers filtert von INNEN. Das ist eine
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
- BACKUPS: Supabase Free hat KEINE Projekt-Backups (kein Scheduled, kein PITR; gemessen
  2026-07-24). Der vorhandene manuelle pg_dump deckt nur den Stand VOR 0018 ab -> s.
  "## Security Manifest & Launch Blocker", BACKUPS.
- AUFGESCHOBEN (konditionale Optimierung, kein Footgun): CAPI-Forward auf Hintergrund-
  Zustellung umstellen (die 204 löst sich von Metas Latenz) — Trigger: falls Beacon-Latenz je
  ein echtes Problem wird. Detail: docs/claude-history/phase-8-analytics.md.

## Aktiver Stand — Phase 9 (A/B-Testing)
Zwei Varianten je Projekt, hälftiger Split, stabile Zuordnung pro Besuch. Bewusst MINIMAL:
keine Gewichtung, keine Signifikanzrechnung, keine Multi-Varianten. Die future-roadmap hält
fest, dass der Seiten-Level-Split mit zwei published-Blobs funktioniert und die
JSON-Sektions-Architektur (Spur B) NICHT braucht — das ist der Schnitt.

### Grundsatzentscheidungen (heute entschieden, Bau in 9b/9c)
- STICKINESS = FIRST-PARTY SESSION-COOKIE auf der Serving-Domain, Wert ausschliesslich
  'a' oder 'b' — KEINE ID, kein Zeitstempel, kein Profil. AUSGESCHLOSSEN: localStorage/
  sessionStorage (fallen rechtlich unter dieselbe TTDSG-§25-Logik UND sind client-seitig,
  also ZU SPÄT für einen Server-Split — das HTML ist längst raus); IP/UA-Hash (zöge die
  30-Tage-Retentionspflicht herein, s. Manifest Tier 2, und wäre bei mobilen IPs instabil).
  EHRLICHE EINORDNUNG (KEINE Rechtsberatung): die Einstufung als "unbedingt erforderlich"
  (TTDSG §25(2) Nr. 2) ist für ein reines Varianten-Cookie vertretbar — der Nutzer hat DIESE
  Seite angefordert, das Cookie liefert sie nur konsistent —, aber NICHT risikofrei:
  Aufsichtsbehörden können A/B-Tests als Betreiber-Optimierung werten, dann wäre Einwilligung
  nötig, was das Feature bricht (der Split muss VOR dem ersten Rendern fallen). Vor dem
  öffentlichen Launch anwaltlich klären. PRODUKTPFLICHT: Pagesmith stellt dem Kunden einen
  fertigen Doku-Schnipsel (Cookie-Name, Zweck, Lebensdauer) für dessen Datenschutzerklärung
  bereit.
- SPLIT LIEGT KOMPLETT IN DER SERVE-ROUTE (KORRIGIERT 2026-07-27, die frühere
  Fassung sah eine Middleware-Zuweisung per Header vor — sie ist am Code und an
  einer Messung widerlegt): Die Serve-Route hat ALLES, was der Split braucht: das
  Cookie steht im Request (sie liest bereits request.headers), das Projekt lädt
  sie ohnehin, und das Response-Objekt gehört ihr (new Response mit eigenem
  Header-Objekt) -> Set-Cookie und Cache-Control sind dort ohne Umbau setzbar.
  Der Split ist bei uns KEIN Routing-Problem: beide Varianten kommen aus DEMSELBEN
  published_content DERSELBEN Route. Die Middleware bleibt UNBERÜHRT.
  DER EINZIGE GRUND, der für die Middleware gesprochen hätte, war die Frage, ob
  die Route bei CDN-Cache-Hits übersprungen wird — GEMESSEN und ausgeschlossen
  (s. nächstes Bullet). Ein Würfelwurf in der Middleware liefe zudem für JEDES
  Projekt, auch für die grosse Mehrheit ohne Test.
- CACHING-GATE: BESTANDEN (GEMESSEN 2026-07-27, curl gegen eine veröffentlichte
  Seite, drei Aufrufe inkl. einem nach 60s Pause): Cache-Control: public,
  max-age=0, must-revalidate · Age: 0 · X-Vercel-Cache: MISS bei ALLEN Aufrufen ·
  x-vercel-id ändert sich jedes Mal. Die Serve-Route läuft bei JEDEM
  Besucher-Request, das CDN fängt nichts ab. Am Code passt das zusammen:
  app-serve/route.ts trägt export const dynamic = "force-dynamic" und setzt heute
  KEINEN eigenen Cache-Control-Header.
  TROTZDEM SETZT 9b BEI AKTIVEM TEST "Cache-Control: private, no-store" — und der
  Grund ist NICHT primär das Vercel-CDN, sondern das Cookie: die heutige Antwort
  ist als "public" ausgewiesen, und eine als public markierte Antwort MIT
  Set-Cookie ist die klassische Konstellation, in der ein geteilter Zwischen-Cache
  Antwort samt Cookie speichert und mehreren Besuchern DENSELBEN Bucket gibt.
  must-revalidate verhindert das praktisch; "private, no-store" macht es
  strukturell unmöglich. NUR bei aktivem Test — Projekte ohne Test behalten ihre
  heutigen Header unverändert (Invariante: kein Verhaltenswechsel für Bestand).
  OFFENER MESSPUNKT für den 9b-1-Live-Test: dieselbe Header-Trias
  (x-vercel-cache / age / cache-control) einmal MIT gesetztem Cookie prüfen — es
  gibt heute keine Serving-Antwort mit Set-Cookie, also keinen Präzedenzfall.
- VARIANTE IN DER ANALYTIK = EIGENE additive, NULLABLE Spalte auf events. NIEMALS in source
  (source = Beobachtungs-ORT, s. "## Immer beachten"). Der SERVER liest die Variante aus dem
  mitgesendeten First-Party-Cookie (der Beacon geht auf dieselbe Domain) -> kein client-freies
  Feld, gleiche Achsen-Hygiene wie bei source. Export-Download auf fremder Domain: kein Cookie
  -> variant bleibt NULL (bekannter, bereits dokumentierter schwächerer Fall). Die Spalte gilt
  AUCH für __ps_pageview-Zeilen -> 9c bekommt Nenner (Besucher je Variante) und Zähler
  (Conversions je Variante) aus derselben Tabelle. ORDERING: die Spalte kommt MIT dem Split
  (9b), NICHT danach — sonst entstehen während der ersten Testphase Events ohne Zuordnung
  (vermeidbarer Bestandsdaten-Skew, Lektion aus Scheibe B).

### Scheibe 9a — Varianten-Authoring (KEIN Split) — ABGESCHLOSSEN, deployt, Migration 0016 gelaufen (html_b/mappings_b + CHECK projects_variant_b_pair), live bewiesen.
- ZWECK: ein Projekt kann eine zweite Variante tragen, bearbeiten und veröffentlichen. Die
  Live-URL liefert weiterhin AUSSCHLIESSLICH A. Ohne zweiten Inhalt gibt es nichts zu splitten.
- AUTHORING-ENTSCHEIDUNG (bewusstes Duplikat statt verfrühter Abstraktion): zweites Slot-Paar
  ADDITIV auf der Projektzeile — html_b, mappings_b, beide NULLABLE. BEGRÜNDUNG: echte Varianten
  brauchen zwei (html, mappings)-Paare, weil Mappings an den data-pagesmith-id-Element-IDs des
  JEWEILIGEN HTML hängen. Die saubere Lösung wäre die pages-Tabelle ("Projekt = N Seiten"), die
  laut future-roadmap strikt NACH Spur B kommt. Bei EXAKT ZWEI Fällen ist ein benanntes Duplikat
  billiger und ehrlicher als eine Abstraktion auf Verdacht (gleiches Muster wie der permanente
  /api/capi-Alias: benannte Ausnahme statt Umbau). BEI EINEM DRITTEN FALL wird dieses Modell
  durch die pages-Tabelle ERSETZT, nicht erweitert.
- VERWORFEN: (a) Variante B ohne Click&Connect (fertiges HTML einfügen) — bricht das
  Kernversprechen, B wäre "tot"; (b) A einfrieren und den Editor-Zustand als B nehmen —
  mentales Modell unklar ("welche bearbeite ich gerade?").
- PUBLISHED-SEITE (Empfehlung, Stufe-1-Gate): published_content ist SERVER-geschrieben (NICHT
  client-autoritativ wie settings) -> Variante B als zusätzlicher KEY im bestehenden jsonb statt
  als neue Spalte. Additiv, kein Migrationsbedarf auf der Publish-Seite, EIN atomarer
  Publish-Write.
  FALLE (dieselbe Klasse wie der trackingKey-in-settings-Bug): ersetzt publishProject
  published_content GANZHEITLICH, löscht ein Publish von A die veröffentlichte Variante B
  STILL — kein Fehler, die Live-Seite läuft weiter, nur B ist weg. Stufe 1 MUSS am echten Code
  belegen, WIE published_content geschrieben wird, und den Erhalt beider Keys als Invariante
  ausweisen.
- AKTIVIERUNG (Prinzip jetzt, Bau erst 9b): "Test läuft" wird NICHT aus der blossen Existenz
  von html_b abgeleitet — sonst wäre "Test stoppen" nur durch LÖSCHEN von B möglich
  (Datenverlust als Bedienschritt). 9b bekommt ein explizites, additives Flag. In 9a wird
  NICHTS aktiviert.
- SERVE-PFAD UNBERÜHRT: die Serve-Route liest weiterhin den A-Key. Ohne aktiven Test liefert
  ein Projekt IMMER A — fail-safe by default, auch wenn B existiert.
- EDITOR: ein A/B-Umschalter; der Editor arbeitet immer auf GENAU EINER Variante. ABLEITEN
  STATT LÖSCHEN gilt doppelt: (i) der Umschalter ist projekt-abgeleiteter View-State und wird
  beim Projektladen am kanonischen Chokepoint aus dem GELADENEN Projekt abgeleitet, nicht nur
  zurückgesetzt; (ii) beim Umschalten müssen ALLE aus html/mappings abgeleiteten Zustände
  (erkannte Elemente, Mapping-Anzeige, Orphan-/Weg-C-Netz, dirty-Tracking) auf die aktive
  Variante NEU abgeleitet werden. Ein stehengebliebener A-Zustand über B-HTML zeigt Mappings
  auf Element-IDs, die es dort nicht gibt.
- INVARIANTEN: (i) Projekte OHNE B verhalten sich byte-gleich wie heute (Serve, Publish,
  Export, Tracking, Statistik); (ii) ein Publish von A zerstört B nicht und umgekehrt;
  (iii) trackingKey und PageView-Emitter-Injektion gelten pro PROJEKT, nicht pro Variante —
  beide Varianten tragen denselben Key; (iv) KEIN Split, KEINE Cookie-Logik, KEINE
  events-Änderung in 9a.
- STUFE-1-GATES (am echten Code zu klären, VOR dem Plan): (1) wie schreibt publishProject
  published_content — ganzheitlich oder feldweise? (2) welche Stellen im CodeImporter leiten
  Zustand aus html/mappings ab — vollständige Liste, damit der Umschalter keine vergisst;
  (3) was exportiert "Projekt exportieren" bei zwei Varianten? ENTSCHEIDUNG: die im Editor
  AKTIVE Variante, im UI explizit benannt.
- DEMOBAR / LIVE-TEST: (a) Projekt mit Variante B anlegen, B eigenes HTML + eigenes Mapping
  geben, publishen -> published_content trägt BEIDE Keys (SQL-Gegenprobe); (b) die Live-URL
  zeigt weiterhin A; (c) Umschalten A<->B im Editor zeigt jeweils die richtigen Elemente und
  Mappings, kein Orphan-Rauschen; (d) REGRESSIONSPROBE: ein Projekt OHNE B verhält sich
  unverändert (publishen, serven, Conversion tracken).
- VERIFIZIERT (live, 2026-07-27):
  - REGRESSION / INVARIANTE (i) (GEMESSEN, zuerst geprüft): Bestandsprojekt OHNE B ->
    speichern, publishen, Live-URL, Conversion — alles unverändert; Toolbar ohne
    Umschalter. SQL-Key-Set von published_content exakt {html,mappings,publishedAt,settings}
    -> kein Schema-Drift.
  - PUBLISH MIT B (GEMESSEN): alle sechs Prüffelder true — hat_b, hat_b_mappings, pc_hat_a,
    pc_hat_b, emitter_a, emitter_b. Damit belegt: variantB liegt als ADDITIVER
    Geschwister-Key im jsonb (Invariante iii), der PageView-Emitter steckt in BEIDEN
    Varianten (Invariante iv — sonst verschwänden B's PageViews still, sobald 9b splittet),
    und die Live-URL zeigt trotzdem A (Invariante vi, fail-safe by default).
  - EXPORT (GEMESSEN): Button schaltet dynamisch auf "Variante B exportieren" und liefert
    B's Inhalt — der Wurzeltausch schlägt bis in den Export durch, weil dieser aus
    debouncedCode baut.
  - ENTFERNEN + RIEGEL (GEMESSEN): B entfernen bei AKTIVER Variante B -> der Editor fällt
    sofort auf A zurück (nicht auf leer). SQL: hat_b=false, hat_b_mappings=false (Gleichlauf,
    CHECK), pc_hat_a=true, pc_hat_b=false, emitter_a=true, emitter_b=NULL. A unangetastet.
  - KEINE KONTAMINATION (GEMESSEN, SQL): beide Varianten tragen ihren Text-Override im
    richtigen Slot — mappings trägt A's Wortlaut, mappings_b B's, beide am SELBEN
    Element-Anker. Invariante (ii) unter echtem Traffic bestätigt.
  - DIRTY-GUARD (GEMESSEN, nebenbei): eine unbestätigte A-Änderung wurde beim Umschalten
    korrekt verworfen — der B4-Guard hält live.
- NACHTRAG — LIVE GEFUNDENER BUG UND FIX (2026-07-27, stale Edit-Canvas):
  SYMPTOM: nach einem Variantenwechsel zeigte das Live-Preview im Modus "Editieren" weiter
  die ZULETZT BEARBEITETE Variante (in beide Richtungen); Vorschau, Export, Publish und
  Serve waren korrekt.
  URSACHE (zwei Schichten): (1) srcDoc ist ein STRING — React schreibt das Attribut nur bei
  WERT-Änderung; (2) createVariantB kopiert byte-genau und eine reine Text-Änderung lässt
  den Code unangetastet -> A und B tragen denselben HTML-String. Zusätzlich gibt
  editPreviewHtml bei fehlendem Text-Override previewHtml BYTE-IDENTISCH zurück
  (Kurzschluss) — das Ergebnis hängt dann gar nicht am mappings-Inhalt. Folge: kein Reload,
  und im Canvas überlebte der per PS_SET_TEXT imperativ gepatchte DOM.
  FIX (zwei Teile, die NUR ZUSAMMEN wirken): activeVariant als Memo-Dep (der Memo LÄUFT) +
  ein Varianten-Marker als String-Anhängung am Ende des edit-srcDoc (es kommt ein ANDERER
  String heraus). Der Marker sitzt im edit-Wrapper und NICHT in generateFunctional, sonst
  geriete er in Export- und Publish-Artefakte; ein Artefakt-Test nagelt das fest (mit
  Positiv-Gegenprobe, sonst prüfte er die Abwesenheit eines nie erzeugten Strings).
  mappings bleibt bewusst KEINE Dep — das ist die Phase-5-Wurzel-Entkopplung (kein
  Reload-Sprung beim Tippen).
  ZWISCHENSTAND, DER NICHT GEREICHT HÄTTE (wichtig für später): der erste Fix hatte NUR die
  Dep. Er hätte den Bug INTERMITTENT gemacht — behoben, wenn die Varianten beim Umschalten
  schon divergierten (nach Seiten-Reload), weiter kaputt, wenn die Divergenz erst DANACH
  durch Editieren entstand. Gefunden durch einen Reproduktionstest, der die SEQUENZ statt
  nur die Datenlage abbildet.
  VERIFIZIERT (live, 2026-07-27): Umschalten zeigt in BEIDEN Richtungen sofort die richtige
  Variante, ohne Umweg über die Vorschau; auch am frisch kopierten Projekt ohne jeden
  Text-Override (der Startzustand, der den Bug auslöste). Die Phase-5-Eigenschaft hält:
  Text ändern + übernehmen erzeugt KEINEN Reload-Sprung. Der Marker taucht im Export NICHT
  auf.
- OFFEN -> 9b: Split + Cookie + variant-Spalte auf events. -> 9c: Auswertung je Variante.

### Scheibe 9b-1 — Split + Cookie + Aktivierung (ABGESCHLOSSEN — live bewiesen (2026-07-27), Migration 0017 gelaufen)
Erste Hälfte von 9b: die Live-URL liefert erstmals BEIDE Varianten. Die
Varianten-Dimension in events (Schreibpfad) ist ausdrücklich 9b-2. Grund für den
Schnitt: 9b berührt ZWEI Kern-Pfade (Serve und Ingest) — beide in einer Scheibe
anzufassen ist mehr Risiko als nötig.

- MIGRATION 0017 (BEIDE Spalten auf einmal, damit es keinen zweiten
  Migrationsschritt gibt — die events-Spalte wird aber erst in 9b-2 beschrieben):
  - projects.ab_test_active boolean NOT NULL DEFAULT false. EIGENE SPALTE, NICHT
    in settings: settings ist CLIENT-autoritativ und wird von saveProject
    GANZHEITLICH ersetzt (2b-0-Lektion) — ein server-relevanter Schalter dort
    stürbe beim nächsten Client-Save.
  - CHECK projects_ab_test_needs_variant_b:
    check (not ab_test_active or html_b is not null)
    "Der Test kann nur aktiv sein, wenn B existiert." STRUKTURELL statt per
    Konvention: vergisst removeVariantB das Flag, schlägt die DB LAUT fehl statt
    still einen Test laufen zu lassen, dessen Variante es nicht mehr gibt.
    Gleiche Denkfigur wie projects_variant_b_pair.
  - events.variant text NULLABLE + CHECK (variant is null or variant in ('a','b')).
    Additiv, KEIN Backfill, KEIN Index (nirgends gematcht; 9c aggregiert über
    project_id). Wird in 9b-1 NICHT geschrieben — die Spalte kommt mit, damit 9b-2
    keine zweite Migration braucht.
- BUCKET-ZUWEISUNG: Cookie vorhanden und gültig -> dieser Bucket. Sonst
  Münzwurf (hälftig), Ergebnis per Set-Cookie festhalten. KEINE Identität, kein
  Hash, kein Zeitstempel — nur 'a' oder 'b'.
- COOKIE-ATTRIBUTE (die Host-Frage ist die kritische):
  - HOST-ONLY: das Domain-Attribut wird NICHT gesetzt. Mit Domain=.publayer.net
    gälte das Cookie für ALLE Kundenprojekte auf der Wildcard — ein Besucher, der
    bei Projekt X in Bucket B landet, bekäme bei Projekt Y ebenfalls B. Das wäre
    stille Cross-Tenant-Kopplung der Messung, und wegen der Wildcard-Subdomains
    der Normalfall, nicht der Sonderfall. Host-only heisst: ein Projekt, ein Host,
    saubere Isolation.
  - HttpOnly: der Client braucht den Wert nie — das Cookie fährt beim /api/e-Beacon
    automatisch mit (first-party, gleicher Host). Kein Grund, es JS zugänglich zu
    machen.
  - Secure, SameSite=Lax (die Ad-Klick-Navigation ist top-level -> Lax reicht),
    Path=/, KEIN Max-Age (Session-Cookie, s. Grundsatzentscheidung).
  - Name namespaced nach bestehendem Muster (__ps_*).
- FALLE — "AKTIV" HEISST NICHT "VERÖFFENTLICHT" (am Datenmodell hergeleitet): Der
  CHECK garantiert, dass B als ENTWURF existiert (html_b), NICHT dass B
  VERÖFFENTLICHT ist. Wer B anlegt und den Test aktiviert, OHNE neu zu publishen,
  hat ab_test_active = true, aber KEINEN variantB-Key in published_content — die
  Serve-Route würfelte Besucher in einen Bucket, der ins Leere greift. ZWEI
  Massnahmen, bewusst beide:
  (1) Die Aktivierungs-Action verweigert mit klarer Meldung, wenn published_content
      keinen variantB-Key trägt ("Variante B ist noch nicht veröffentlicht — erst
      veröffentlichen, dann den Test starten").
  (2) Die Serve-Route fällt trotzdem auf A zurück, wenn der Bucket B ist und kein
      variantB-Key existiert. Defense-in-Depth: die Route trifft nie eine Annahme
      über den Publish-Zustand.
- KILL-SWITCH HAT VORRANG: ein gesperrtes Projekt liefert 451 — kein Split, kein
  Cookie, keine Variantenwahl. Der blocked-Check bleibt VOR jeder Varianten-Logik.
- DEAKTIVIEREN: das Flag ist die AUTORITÄT, nicht das Cookie. Ist der Test aus,
  liefert die Route IMMER A — auch wenn im Browser noch ein Cookie aus einem
  früheren Test liegt. Fail-safe by default, gleiche Logik wie in 9a.
- UI: ein Schalter in der bestehenden Varianten-Sektion (Test starten / Test
  stoppen), sichtbar nur wenn B existiert. Der Zustand wird aus dem GELADENEN
  Projekt ABGELEITET (ab_test_active), nicht lokal gehalten — "ABLEITEN STATT
  LÖSCHEN". Klartext dazu: "Test stoppen" löscht NICHTS (das ist "Variante B
  entfernen"), es schaltet nur den Split ab.
- INVARIANTEN: (i) Projekte OHNE aktiven Test verhalten sich byte-gleich wie heute
  (gleiche Antwort, gleiche Header, kein Cookie); (ii) der Kill-Switch bleibt
  vorrangig und unverändert; (iii) Middleware, Ingest, events, CAPI-Pfad und
  Publish-Pfad werden NICHT angefasst; (iv) das Cookie ist host-only und trägt
  ausschliesslich 'a' oder 'b'; (v) ohne veröffentlichte Variante B liefert die
  Route A.
- DEMOBAR / LIVE-TEST: (a) REGRESSION zuerst — Projekt ohne Test: Antwort und
  Header unverändert, KEIN Set-Cookie; (b) Test starten, Seite in einem frischen
  Inkognito-Fenster laden -> Variante notieren, Cookie im DevTools prüfen
  (host-only, HttpOnly, Secure, Session); (c) Reload -> DIESELBE Variante
  (Stickiness); (d) zweites Inkognito-Fenster -> über mehrere Fenster hinweg
  tauchen BEIDE Varianten auf; (e) Header-Probe mit gesetztem Cookie
  (x-vercel-cache / age / cache-control — der offene Messpunkt aus den
  Grundsatzentscheidungen); (f) Test stoppen -> alle Aufrufe liefern wieder A,
  auch mit altem Cookie im Browser; (g) Kill-Switch-Gegenprobe: gesperrtes Projekt
  -> 451, kein Cookie.
- VERIFIZIERT (live, 2026-07-27):
  - REGRESSION / INVARIANTE (i) (GEMESSEN, zuerst geprüft): Live-Seite ohne aktiven Test
    liefert die Bestands-Header (public, max-age=0, must-revalidate) und KEIN Set-Cookie.
  - RIEGEL (GEMESSEN): Aktivierung bei nicht veröffentlichter Variante B wird verweigert,
    es wird nichts geschrieben.
  - COOKIE-ATTRIBUTE (GEMESSEN, DevTools): __Host-ps_v ist host-only, HttpOnly, Secure,
    SameSite=Lax, Session — kein Domain, kein Max-Age.
  - CACHE-HEADER BEI AKTIVEM SPLIT (GEMESSEN): mit Cookie liefert die Antwort exakt
    "Cache-Control: private, no-store". Der offene Messpunkt aus den
    Grundsatzentscheidungen ist damit positiv beschieden.
  - STICKINESS (GEMESSEN): derselbe Besucher bleibt stabil auf seiner Variante.
  - FLAG SCHLÄGT COOKIE (GEMESSEN, Invariante iii): bei inaktivem Test liefert die Route
    ausnahmslos A — auch mit vorhandenem b-Cookie im Browser.
  - KILL-SWITCH (GEMESSEN, Invariante ii): gesperrtes Projekt mit aktivem Test -> 451,
    KEIN Set-Cookie; nach Entsperren wieder 200.
  - VORBEDINGUNG FÜR 9b-2 (GEMESSEN, nicht angenommen): das HttpOnly-Cookie __Host-ps_v
    fährt beim /api/e-Beacon im Request-Header MIT (DevTools -> Network -> /api/e). Der
    Ingest kann die Variante damit server-seitig aus dem Cookie lesen; 9b-2 braucht dafür
    keinen Ersatzweg.
- SCHEIBE 9b-1p — UI-POLITUR (ABGESCHLOSSEN — live bewiesen 2026-07-27):
  (1) FEHLER-KANAL DER VARIANTEN-SEKTION IST DER FALSCHE (am Code erhoben):
      handleToggleAbTest, handleCreateVariantB und handleRemoveVariantB schreiben
      in den ZENTRALEN saveError/saveStatus-Kanal, der an genau EINER Stelle
      gerendert wird — in der Kopfzeile der Live-Preview-Zone, neben dem
      Speichern-Button, mit "truncate". Der Schalter steht aber im
      Einstellungs-Panel: die Meldung erscheint weit entfernt vom geklickten
      Button UND wird dort abgeschnitten (nur per title-Tooltip lesbar).
      ENTSCHEIDUNG: eigener lokaler State für die Varianten-Sektion nach dem
      ETABLIERTEN Muster (<state>Error + <state>Status wie capiTokenError /
      publishError; 6 von 8 Sektionen machen es bereits so — die beiden
      Ausreisser sind genau diese 9a/9b-1-Handler). Gerendert direkt in der
      Varianten-Sektion, OHNE truncate.
      saveError bleibt UNANGETASTET: es hat neun Schreiber, darunter Speichern,
      Projektwechsel, Löschen und Umbenennen — ein Umhängen wäre invasiv, ein
      eigener State ist additiv.
  (2) FEHLENDE INFORMATION "IST VARIANTE B VERÖFFENTLICHT?" (KEIN
      Button-State-Bug — am Code bestätigt): der Publish-Indikator speist sich
      aus settings.hosting.label und ist PROJEKTWEIT; er ist inhaltlich korrekt
      und beantwortet nur eine andere Frage als der Riegel. Es fehlt eine
      Information, kein Zustand.
      DATENWEG — ENTSCHIEDEN: eine eigene kleine Read-Action nach dem
      getEventCounts-Muster (Session-Check -> Query -> {data,error} -> sicherer
      Leer-Wert). Sie liest published_content SERVERSEITIG und gibt nur ein
      Boolean zurück; das Urteil fällt DORT das geteilte Prädikat
      deliverableVariantB (variant.ts) — dasselbe wie im Serve-Pfad und in
      setAbTestActive, KEIN drittes Urteil.
      VERWORFEN, mit Grund: (a) JSON-Pfad-Selektion im loadProject-Select — es
      gibt im ganzen Projekt keinen PostgREST-Präzedenzfall dafür, und ein
      published_content->variantB->>html zöge das KOMPLETTE B-HTML in den
      Ladepfad (schlimmer als der Blob-Verzicht, den die Randbedingung schützt);
      zudem wanderte das Auslieferbarkeits-Urteil in den Client. (c) Rückgabe
      aus publishProject als ALLEINIGE Quelle — bricht bei Reload und
      Projektwechsel ("ABLEITEN STATT LÖSCHEN"). (d) abgeleitete Spalte beim
      Publish — zweiter Wahrheitsträger neben published_content, müsste
      publishProject anfassen (bislang durch beide 9er-Scheiben byte-identisch)
      und wäre per CHECK über einen jsonb-Pfad kaum absicherbar; nach dem
      9b-1-Befund (zwei divergierende Urteile) die falsche Richtung.
      ABLEITUNG: Effect auf [projectId] mit cancelled-Guard wie eventCounts /
      adblockLoss, plus Refetch nach erfolgreichem Publish und nach
      removeVariantB. Kein lokal angenommener Wert.
      ORT: in der VARIANTEN-SEKTION beim Test-Schalter — dort greift der Riegel,
      dort gehört die Information hin. Die projektweite Publish-Statuszeile
      bleibt UNVERÄNDERT (sie ist korrekt).
      BERATEND, NICHT SPERREND: der Hinweis erklärt vorab, was der Riegel sonst
      erst nach dem Klick sagt — der Button wird NICHT deaktiviert. Autorität
      bleibt der SERVER-Riegel in setAbTestActive. Grund: ein fehlgeschlagener
      oder noch laufender Ladevorgang darf keine Aktion sperren, die
      funktionieren würde; ist der Wert nicht ermittelbar (null), wird KEIN
      Hinweis gezeigt und nichts behauptet.
  INVARIANTE für beide Punkte: für Projekte OHNE Variante B ändert sich am UI
  NICHTS (hasVariantB ist das etablierte Gate).
  NICHT IN DIESER RUNDE (erhoben, gehört zu 9c): die Statistik-Sektion
  (get_event_counts) und die Adblocker-Kachel (get_adblock_loss) aggregieren
  PROJEKTWEIT. Sobald 9b-2 events.variant füllt, wären Zahlen je Variante
  möglich; die Gesamtzahl wäre dann uninformativ, aber nicht falsch. Das ist
  9c-Gebiet und wird HIER nicht angefasst.
  VERIFIZIERT (live, 2026-07-27):
  - REGRESSION (GEMESSEN, zuerst geprüft): Projekt ohne Variante B zeigt keine
    neuen Elemente; der zentrale saveError-Kanal ist unberührt.
  - RIEGEL-MELDUNG AM RICHTIGEN ORT (GEMESSEN): die Verweigerung erscheint jetzt
    in der Varianten-Sektion direkt beim geklickten Button und ungekürzt — nicht
    mehr abgeschnitten in der Preview-Kopfzeile.
  - HINWEIS + REFETCH (GEMESSEN): bei nicht veröffentlichter Variante B steht
    der Hinweis vorab in der Sektion; nach dem Publish verschwindet er OHNE
    Reload (Refetch-Punkt 2), nach "Variante B entfernen" und erneutem Anlegen
    ist er wieder da (Refetch-Punkt 1 + unbedingte Abfrage).
  - KEIN LEAK (GEMESSEN): ein Projektwechsel mit stehendem Varianten-Fehler
    zeigt ihn im neuen Projekt nicht mehr.
  - NACHTRAG (live gefunden, im selben Zug behoben): Hinweis und Riegel-Fehler
    waren gleichzeitig sichtbar und zeigten denselben Satz doppelt. Gelöst mit
    EINEM Anzeigeslot und Priorität Fehler vor Hinweis — strukturell, nicht per
    Textvergleich.
  - NICHT LIVE AUSLÖSBAR (bewusst vermerkt): der "Variante B existiert
    bereits"-Fall ist im Browser praktisch nicht provozierbar, weil der
    Anlege-Button nach dem ersten Klick zum Umschalter wird. Der Fall existiert
    trotzdem (zwei offene Tabs desselben Projekts) — der Server-Guard fängt ihn,
    der Unit-Wächter deckt die Anzeige ab. Nachweis bleibt der Test, nicht der
    Live-Blick.
- OFFEN -> 9b-2: variant in Ingest und Persist. VORAB ZU ENTSCHEIDEN (Gate für
  9b-2): Soll der Ingest die Variante nur schreiben, wenn der Test AKTIV ist?
  Ein altes Cookie nach Testende würde sonst Events einer Variante zuschreiben,
  die gar nicht ausgeliefert wurde. Naheliegender Weg: den Resolver additiv um
  ab_test_active erweitern (gleicher Präzedenzfall wie das blocked-Feld in 2a —
  eine Spalte mehr im selben Select, KEINE zweite Query). Am Code zu prüfen, nicht
  vorab zu setzen.

### Fix-Scheibe safeAction — Client-Fehlerbehandlung (ABGESCHLOSSEN — live bewiesen 2026-07-27, Commit bd05e34)
WARUM DIESER ABSCHNITT HIER STEHT (sonst wirkt er später deplatziert): Die Scheibe ist
KEINE A/B-Arbeit. Sie steht hier, weil es keine History-Datei zur Client-Fehlerbehandlung
gibt und eine neue für eine einzelne Scheibe Wildwuchs wäre; bei der nach 9c fälligen
Phase-9-Auslagerung reist der Abschnitt mit, und die thematische Entscheidung fällt dann
EINMAL statt zweimal.
- WAS GEBAUT WURDE: src/lib/safe-action.ts (reine Datei, bewusst OHNE server-only, damit
  client-importierbar). Exporte: safeAction, actionThrew, ACTION_THROW_MESSAGE,
  SAVE_THROW_MESSAGE. Die Dauerregel steht in "## Immer beachten"
  ("CLIENT-SEITIGE SERVER-ACTION-AUFRUFE").
- GEMESSENER BESTAND (2026-07-28, am Code erhoben): 24 Server-Action-Aufrufe aus
  Client-Code, 0 unbehandelt. Drei Muster:
  (1) Handler mit Busy-/Fehlerzustand -> safeAction: 15x CodeImporter.tsx, dazu
      DomainManager.tsx loadList (via handleAdd/onChanged) und handleManualCheck.
  (2) Lade-Effekt MIT Fehlerkanal -> safeAction: DomainManager.tsx Projektwechsel-Load
      (zeigt "Laden fehlgeschlagen", bewusst getrennt vom Leerzustand).
  (3) Lade-Effekt OHNE Fehlerkanal: CodeImporter.tsx 3x via .catch() auf den Leer-Wert,
      DomainManager.tsx Auto-Poll via safeAction. BEIDE Formen sind nach der Dauerregel
      zulässig — hier hängt kein UI-Zustand am Aufruf.
  Muster (2) ist der Grund, warum die Regel nicht an "Handler vs. Effekt" hängt.
  login/page.tsx ruft KEINE Server-Action, sondern direkt den Browser-Supabase-Client —
  liegt außerhalb des Musters.
- TESTS: 13 (7 Unit in safe-action.test.ts, 6 Integration in CodeImporter.test.tsx).
  HERVORZUHEBEN, weil es eine TAUTOLOGIE VERMEIDET: Der Secret-Test lässt den Fehler den
  Token im Klartext TRAGEN und prüft alle fünf console-Methoden per String(a), NICHT per
  JSON.stringify — letzteres liefert auf einem Error-Objekt "{}", und der Test wäre hohl
  durchgelaufen.
- VERIFIZIERT (live, 2026-07-27): Offline-Test in Produktion (DevTools offline, Speichern)
  — die Meldung erscheint, der Button ist wieder klickbar, der zweite Versuch gelingt OHNE
  Reload. Das ist der Kernbeweis: der blockierte Zweitversuch war der schwerste Teil des
  Befunds.
- WAS DER NACHWEIS NICHT ZEIGT (ausdrücklich): DomainManager.test.tsx enthält KEINEN
  Wurf-Test — die 6 gewrappten Aufrufe dort sind nur durch den Unit-Test von safeAction
  selbst gedeckt, nicht durch einen Integrationstest an ihrem eigenen UI-Fehlerkanal. Ein
  Live-Test der Domain-Pfade unter Wurf ist nicht protokolliert.
- HINWEIS ZUR NUMMERIERUNG: Code und Tests tragen Vermerke der Form "AUFLAGE n" /
  "Invariante n". Diese Nummern stammen aus dem Stufe-1-Plan der Bau-Session und sind im
  Repo NICHT auflösbar (am 2026-07-28 repo-weit gesucht, kein Dokument gefunden); ihre
  Zählung deckt sich NICHT mit den Auflagen (1)/(2)/(3) des zurückgezogenen Offenen Punkts.
  Die Nebenbedingungen (i)-(iii) der Dauerregel in "## Immer beachten" sind die inhaltlich
  gültige Fassung — sie ERSETZEN die Code-Nummerierung nicht und sind nicht deckungsgleich
  mit ihr.

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
- KOSTEN-CIRCUIT-BREAKER: harter Spend-Cap + Alarm auf Vercel & Supabase (Plattform-
  Budget, nicht App-Logik). BINDET-AN: PRO-UPGRADE (Vercel oder Supabase) — auf Free/Hobby deckeln
  die Plattform-Limits strukturell (kein Überverbrauch, kein abrechenbarer Eskalationsweg); erst
  mit Pro kippt das und Überverbrauch wird kostenwirksam. Kopplung: der Pro-Wechsel fällt mit dem
  Backup-Bedarf zusammen (s. "## Offene Punkte").
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
- LEAKED-PASSWORD-PROTECTION: Supabase-HaveIBeenPwned-Abgleich (Pro-gated). BINDET-AN:
  öffentlicher Launch / Pro-Tier.
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
- BACKUPS + Restore-Drill (OFFEN): Backup-Tier bestätigen + EINEN echten Restore-Drill fahren.
  BINDET-AN: laufend; erster Drill vor echten Kundendaten. EHRLICHE EINORDNUNG (gemessen 2026-07-24):
  Free hat GAR KEINE Backups (kein Scheduled, kein PITR) -> der erste Drill fällt mit dem Pro-Wechsel
  bzw. einem frischen pg_dump zusammen und würde zugleich die ensure_rls-Rebuild-Lücke praktisch
  nachweisen (s. "## Offene Punkte").
  ZWISCHENLÖSUNG VOLLZOGEN, ARTEFAKT VERALTET -> Status bleibt OFFEN: Ein manueller pg_dump wurde
  gezogen, deckt aber nur den Stand VOR 0018 ab (0016/0017/0018 kamen danach) -> ein Restore
  daraus ergäbe ein Schema, das der deployte Code nicht bedienen kann. Die Zwischenlösung war
  EINMALIG, nicht laufend. IM REPO LIEGT BEWUSST KEIN BELEG — ein DB-Dump gehört nicht ins Git,
  auch verschlüsselt nicht; wer hier nichts findet, darf NICHT "nicht erledigt" schließen.
  Vollzugs-Details, Provenienz, der erwartungsgemäß fehlende Event-Trigger und der
  Wiedervorlage-Grundsatz (frischer Dump nach JEDER Migration): Vollfassung.
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
  Konstellation systematisch. Herleitung: die 9a-Sektion ("## Aktiver Stand — Phase 9",
  NACHTRAG-Block).
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
  Herleitung + Live-Nachweis: "## Aktiver Stand — Phase 9", Abschnitt "Fix-Scheibe safeAction".
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
- GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT (gemessen 2026-07-24): anon,
  authenticated UND service_role haben per Supabase-Default volle DML-Rechte auf ALLE public-
  Tabellen, auch auf project_tokens. Das "heiligste Gate" (CAPI-Token write-only, auch für den
  Owner) hält ALLEIN dadurch, dass project_tokens RLS aktiv hat und KEINE SELECT-Policy trägt. Eine
  neue Tabelle ohne "enable row level security" ist damit SOFORT für anon offen — und der anon-Key
  steckt im Client-Bundle jeder Seite. Das Sicherheitsnetz dagegen ist der Event-Trigger ensure_rls,
  der beim Rebuild aus den Migrationen NICHT entsteht (s. "## Offene Punkte"). Bei JEDER neuen
  Tabelle: RLS explizit aktivieren und Policies bewusst setzen, NIE auf den Trigger verlassen.
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
- supabase/checks/ — versionierte, NUR LESENDE Messproben für Live-Tests und Gegenproben.
  KEIN Migrationsverzeichnis, wird nie automatisch angewandt. VOR jeder handgetippten
  Prüf-Query dort nachsehen (dort steht auch, welche Fallen eine Probe hat — z.B. der
  custom_host-Filter bei der Domain-Divergenz). Details: README im Ordner.
