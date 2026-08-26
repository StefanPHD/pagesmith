# Aktueller DB-/Analytics-Stand (ausgelagerter Ist-Zustand)

Der gemessene Ist-Zustand der Datenbank und des Analytics-Lesepfads: Migrationsstand,
Tabellen, Policies, Rollen-Grants, Spalten, Constraints, Indizes, Funktionen,
Event-Trigger, Backups. NUR Ist-Zustand — die Herleitung und die Entscheidungen dahinter
stehen in docs/claude-history/phase-8-analytics.md, die dauerhaft geltenden Regeln in
docs/immer-beachten.md bzw. in CLAUDE.md unter "## Code-Qualität, Performance &
SaaS-Skalierung". Aus CLAUDE.md ausgelagert am 2026-08-11, zeichengleich; der Inhalt
darunter ist unverändert.

DIESE DATEI WIRD NICHT AUTOMATISCH GELADEN. Jede Session lädt allein CLAUDE.md; dort
steht an der Stelle dieser Sektion ein PFLICHT-STOPP, der hierher zeigt. Wer eine
Migration schreibt oder am Schema, an Policies, an einem RPC oder am
Analytics-Lesepfad arbeitet, liest diese Datei ZUERST — sonst plant er gegen ein Schema,
das er nicht kennt, und es fällt erst in der laufenden DB auf.

FORTGESCHRIEBEN WIRD SIE AUSSCHLIESSLICH AUS EINER MESSUNG — nie aus dem Gedächtnis und
nie aus den Migrationsdateien. Die Probe liegt versioniert unter
supabase/checks/db-stand.sql und wird VOR jedem Neuschreiben dort gefahren; jede Angabe
behält ihre Provenienz (Messdatum, Messweg und die Grenzen der Messung), weil genau die
der Grund ist, dieser Datei überhaupt zu trauen. Sie beschreibt einen Zustand, sie
belegt ihn nicht: was gilt, steht im Repo bzw. in der laufenden DB.

## Aktueller DB-/Analytics-Stand (Ist-Zustand, kein Konzept)
Was der nächste Migrations-/Analytics-Schritt als Ausgangslage hier findet. Nur
Ist-Zustand — Herleitung und Entscheidungen: docs/claude-history/phase-8-analytics.md.
PROVENIENZ: GEMESSEN am 2026-08-05 im SQL-Editor, nach Migration 0021 (schema_migrations,
information_schema.columns, pg_constraint, pg_class+pg_policy, pg_policies, role_table_grants,
pg_indexes, pg_proc, pg_event_trigger). Die Probe ist versioniert unter
supabase/checks/db-stand.sql — vor jedem Neuschreiben dieser Sektion dort fahren, nicht frisch
tippen. AUCH die Index-DEFINITIONEN sind gemessen (indexdef), nicht aus den Migrationsdateien
übernommen. Der vorige Stand dieser Sektion stammte vom 2026-07-30 und war mit 0021 überholt.
FALLE bei jeder Wiederholung: schema_migrations existiert DREIMAL (public / auth / realtime).
Jede Katalog-Abfrage MUSS das Schema filtern — sonst liefert sie drei Zeilen mit
unterschiedlichen RLS-Werten und sieht wie ein Befund aus.

ERGEBNIS DES LAUFS VOM 2026-07-30 — ausdrücklich DIESEM Datum zugeordnet, damit der Absatz
nicht als Ergebnis des Laufs vom 2026-08-05 gelesen wird: Alle ZEHN Proben trafen ihre
ERWARTUNG exakt, KEINE Abweichung. Das ist
selbst eine Aussage wert — die wahrscheinlichere Alternative wäre ein stiller Drift zwischen
Doku und Schema gewesen, genau wie er diese Sektion zuvor bereits einmal getroffen hat (die
zwei Nachtrag-Markierungen aus 9c-1/9c-2, die zwischen 2026-07-28 und diesem Lauf hier
standen). Beide sind mit diesem Lauf VOLLSTÄNDIG überholt und entfernt; die Sektion unten ist
wieder ein einheitlicher, durchgehend gemessener Stand ohne Sonderfälle.

- MIGRATIONSSTAND: 0001-0022. ZWEI PROVENIENZEN, hier bewusst GETRENNT gehalten — die
  Sektions-Provenienz oben (2026-08-05) deckt nur die erste ab:
  RICHTIGGESTELLT AM 2026-08-17, NICHT GESTEMPELT: Die Zahl 0022 und die zwei Provenienzen
  darunter bleiben lesbar — sie sind als Aussage über den 2026-08-07 richtig und tragen die
  Herleitung, warum diese Zeile NIE aus dem Verzeichnis fortgeschrieben wird. DER HEUTIGE
  STAND IST 0001-0024. LIVE ABGELESEN am 2026-08-17 (SQL-Editor, Owner, Probe:
  supabase/checks/project-secrets-target-check.sql): schema_migrations trägt 0021
  (applied_at 2026-08-05 06:41:30), 0022 (2026-08-07 10:14:37), 0023 (2026-08-11 15:58:43)
  und 0024 (2026-08-17 13:59:53) — je ein VOLLZUGSNACHWEIS, KEINE erneute
  Lückenlosigkeits-Rechnung. Die abgelesene Probe filterte auf Dateinamen mit
  'project_secrets'; über Migrationen ausserhalb dieses Musters sagt sie NICHTS, und für
  0001-0020 gilt weiterhin allein die Messung vom 2026-08-05.
  0023 ist damit erstmals hier erfasst — sie fehlte in dieser Zeile, obwohl sie seit dem
  2026-08-11 angewandt ist.
  NACHGEZOGEN AM 2026-08-26, UND DIESMAL AUS DER VOLLEN PROBE STATT AUS EINER GEFILTERTEN:
  DER HEUTIGE STAND IST 0001-0025. GEMESSEN am 2026-08-26 (SQL-Editor, Owner, Proben 1 und
  1b aus supabase/checks/db-stand.sql): 25 Zeilen, niedrigste 0001, höchste 0025, erwartete
  Anzahl 25, luecke = false. Die LÜCKENLOSIGKEIT ist damit erstmals seit dem 2026-08-05
  wieder ARITHMETISCH bewiesen und nicht nur je Migration als Vollzug abgelesen.
  DIE APPLIED_AT-REGEL, ebenfalls gemessen und nicht abgeleitet: NULL bei 0001-0017 (der
  BACKFILL aus 0018, kein Vollzugsnachweis), GEFÜLLT ab 0018 durchgehend. 0025 trägt
  applied_at 2026-08-26 07:18:41.742605+00.
  WAS DIESE MESSUNG GEGENÜBER DER VOM 2026-08-17 KANN: Jene filterte auf Dateinamen mit
  'project_secrets' und sagte über Migrationen ausserhalb dieses Musters ausdrücklich
  NICHTS. Probe 1 filtert nicht — die Einschränkung im Absatz darüber gilt für JENE
  Messung und ist für den heutigen Stand aufgehoben.
  · 0001-0021, LÜCKENLOS — arithmetisch bewiesen (Probe 1b: Zeilenzahl = Spannweite+1),
    nicht nur an der Dateisortierung abgelesen. GEMESSEN am 2026-08-05: 21 Zeilen,
    Spannweite 0001-0021; applied_at gefüllt bei 0018, 0019, 0020 und 0021 — bei 0021 mit
    dem 2026-08-05.
  · 0022 (Zielwert-Erweiterung der Geheimnis-Tabelle, Phase 11 Scheibe 6) — LIVE BESTÄTIGT
    am 2026-08-07 im SQL-Editor, im Live-Test jener Scheibe: ordnungsgemäss angewendet,
    Protokoll-Eintrag vorhanden. Die Lückenlosigkeits-Rechnung wurde dabei NICHT wiederholt;
    für 0022 liegt ein VOLLZUGSNACHWEIS vor, nicht die erneute Spannweiten-Probe.
  DIE GRENZE, DIE ZWINGEND DAZUGEHÖRT — und sie gilt für JEDE künftige Fortschreibung dieser
  Zeile, nicht nur für 0022: Ob eine Migration in der LAUFENDEN DB angewandt ist, ist AM REPO
  NICHT entscheidbar. Eine Datei in supabase/migrations/ beweist nur, dass sie GESCHRIEBEN
  wurde — es gibt keinen Migrations-Runner (s. unten), also gibt es auch keinen Automatismus,
  der aus der Datei einen Vollzug macht. Diese Zeile darf deshalb NIE aus dem Verzeichnis
  fortgeschrieben werden, sondern ausschliesslich aus einer Messung oder einem Live-Test.
  Seit 0018 existiert public.schema_migrations als PROTOKOLL (version PK / filename /
  applied_at; RLS aktiv, KEINE Policy); Protokollpflicht ab 0018, alle späteren Migrationen
  tragen den Insert bereits selbst mit.
  EHRLICHE EINORDNUNG: Die Zeilen 0001-0017 sind ein BACKFILL aus 0018, KEIN Vollzugsnachweis —
  ihr applied_at ist bewusst NULL, weil der Ausführungszeitpunkt nicht bekannt ist. Dass sie
  gelaufen sind, belegen ihre WIRKUNGEN (Spalten/Constraints unten), nicht die Tabelle. Ab 0018
  ist der Eintrag ein echtes Protokoll. PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: es gibt keinen
  Migrations-Runner und soll keinen geben (s. docs/immer-beachten.md, "OB EINE MIGRATION
  IN DER LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT ENTSCHEIDBAR").
- TABELLEN in public: SIEBEN — projects, domains, project_tokens, events, audit_logs,
  schema_migrations, project_secrets. Bei ALLEN ist RLS aktiv. (Die frühere Zahl "sechs" ist
  seit 0021 überholt und wird ERSETZT, nicht ergänzt — dieselbe Behandlung wie zuvor die
  überholte "fünf".)
- POLICIES: ZEHN. projects 4 (select/insert/update/delete); domains 3 (select/insert/update —
  KEINE DELETE); project_tokens 2 (insert/update — KEINE SELECT, das write-only-Gate auf den
  CAPI-Token); events 1 (events_select_own, SELECT); audit_logs 0; schema_migrations 0;
  project_secrets 0.
  BEI project_secrets IST DIE LEERE POLICY-LISTE DIE TRAGENDE KONTROLLE — der Satz gehört
  zwingend dazu, sonst liest jemand die Null als Lücke und "repariert" sie: unter aktiver RLS
  ohne JEDE Policy ist die Tabelle für anon und authenticated VOLLSTÄNDIG verschlossen, nur
  service_role kommt durch. Die einzige Schreib-Autorisierung liegt im OWNERSHIP-GATE der
  Server-Actions. Es ist dieselbe Denkfigur wie bei project_tokens, audit_logs und events,
  hier aber VERSCHÄRFT: project_secrets ist die GEHEIMNIS-Tabelle, und sie hängt vollständig
  an dieser Leere.
  Bei events ist das Fehlen der INSERT/UPDATE/DELETE-Policy eine ENTSCHEIDUNG, keine Lücke:
  Writes laufen ausschließlich über service_role (Ingest-Pfad, persistEvent). Der Owner LIEST
  seine Events, er schreibt sie nie. Wer hier eine Write-Policy ergänzt, öffnet den
  Analytics-Schreibpfad für den Client — dieselbe Denkfigur wie bei project_tokens und
  audit_logs (s. docs/immer-beachten.md, "APPEND-ONLY-TABELLEN BLEIBEN
  POLICY-FREI"), nur für eine
  Tabelle, die jene Regel heute NICHT nennt.
- auth.uid()-KAPSELUNG (bekannte Abweichung, reiner Performance-Punkt, KEIN Leak): NUR
  events_select_own trägt (select auth.uid()) gekapselt. projects/domains/project_tokens tragen
  blankes auth.uid() (Auswertung pro Zeile). Ein Fix wäre eine Migration -> aufgeschoben, s.
  docs/claude-history/backlog-polish.md.
  events_select_own spiegelt die Ownership-ACHSE von projects_select_own 1:1 — EXISTS-Semi-Join
  statt direktem Vergleich, also andere SYNTAX bei gleicher ACHSE. Beide Unterschiede (Kapselung
  und EXISTS) sind bekannt und unbedenklich; eine Divergenz in der ACHSE selbst WÄRE das Leak.
- ROLLEN-GRANTS: anon, authenticated UND service_role haben volle DML-Rechte auf ALLE SIEBEN
  public-Tabellen, inkl. project_tokens, schema_migrations UND project_secrets. Die
  Tenant-Isolation und das write-only-Gate tragen damit AUSSCHLIESSLICH über RLS
  (s. docs/immer-beachten.md, "GRANTS SCHÜTZEN NICHTS").
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
- TABELLE public.project_secrets (0021, Phase 11 Scheibe 1; umgebaut durch 0025, Phase 11.8
  Scheibe 11.8b). SPALTEN IN DER GEMESSENEN REIHENFOLGE (GEMESSEN 2026-08-26, SQL-Editor,
  Owner, Probe 2 aus supabase/checks/db-stand.sql): project_id uuid NULLABLE; target text
  NOT NULL; secret text NULLABLE; created_at timestamptz NOT NULL DEFAULT now();
  updated_at timestamptz NOT NULL DEFAULT now(); secret_enc text NULLABLE; id uuid NOT NULL
  DEFAULT gen_random_uuid().
  DIE REIHENFOLGE IST DIE GEMESSENE UND NICHT DIE LOGISCHE — sie steht so da, weil die
  Probe nach ordinal_position sortiert und ein zeilenweiser Abgleich sonst stolpert. Dass
  der Schlüssel HINTEN steht, ist kein Entwurfsfehler: "alter table ... add column" hängt
  an, und secret_enc und id sind die beiden Spalten, die 0025 angefügt hat. Eine
  Spaltenreihenfolge ist ein ABLAGERUNGSPROFIL, kein Entwurf.
  PRIMÄRSCHLÜSSEL ist die EINSPALTIGE id (project_secrets_pkey) — GEMESSEN 2026-08-26
  (Probe 3, pg_get_constraintdef). Bis 0025 war es das PAAR (project_id, target); die
  Footgun-Zeile darunter führt project_secrets deshalb NICHT mehr.
  DIE EINDEUTIGKEIT AUF (project_id, target) IST DAMIT NICHT WEG, sondern UMGEZOGEN:
  project_secrets_project_id_target_key, UNIQUE NULLS NOT DISTINCT (project_id, target) —
  Definition im WORTLAUT, GEMESSEN 2026-08-26 (Probe 3). Der Wortlaut NULLS NOT DISTINCT
  gehört zwingend dazu: ohne ihn wären zwei Zeilen mit project_id IS NULL und demselben
  Ziel BEIDE erlaubt, und die Eindeutigkeit trüge genau den Fall nicht, für den
  project_id nullbar gemacht wurde.
  secret text ist seit 0025 NULLABLE, und das ist keine Aufweichung, sondern die eine
  Hälfte eines Paares: CONSTRAINT project_secrets_secret_genau_eines CHECK (((secret IS
  NULL) <> (secret_enc IS NULL))) — GEMESSEN 2026-08-26 (Probe 3). GENAU EINES der beiden
  Felder trägt einen Wert; die frühere NOT-NULL-Bedingung auf secret ist durch diesen
  CHECK ERSETZT, nicht ersatzlos gefallen. Wer nur "secret ist jetzt nullbar" liest, hält
  eine Zeile ohne jedes Geheimnis für möglich — sie ist es nicht.
  FK project_id -> projects(id) ON DELETE CASCADE; er heisst project_secrets_project_id_fkey
  (GEMESSEN 2026-08-26, Probe 3 — bis dahin stand er hier ohne Namen, weil 0021 ihn inline
  deklariert). KEINE user_id-Spalte.
  DER SATZ DARÜBER BLEIBT WAHR, SEINE BEGRÜNDUNG IST SEIT 0025 BEDINGT — und NICHTS an
  dieser Zeile wird dadurch rot, was genau der Grund ist, warum der Zusatz hier stehen
  muss: Das Fehlen der user_id-Spalte ruhte darauf, dass die Kette
  auth.users -> projects -> project_secrets über project_id trägt (0021 sagt es im Kopf
  ausdrücklich). Seit project_id NULLBAR ist, hängt eine Zeile OHNE Projekt an dieser
  Kette NICHT mehr — weder eine Projekt- noch eine Nutzerlöschung erfasst sie. Volltext,
  Trigger und die vier nicht gewählten Kandidaten: docs/offene-punkte.md, Eintrag "EINE
  ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE".
  CONSTRAINT project_secrets_target_valid: CHECK ((target = ANY (ARRAY['meta'::text,
  'pinterest'::text]))) — Definition im WORTLAUT, LIVE ABGELESEN am 2026-08-07 und damit
  ABWEICHEND von der Sektions-Provenienz oben (nicht aus der Migrationsdatei übernommen).
  RICHTIGGESTELLT AM 2026-08-17, NICHT GESTEMPELT — der Wortlaut darüber bleibt lesbar,
  weil er als Aussage über den 2026-08-07 richtig ist und weil an ihm die Provenienz-Regel
  dieser Datei hängt: er war LIVE abgelesen und nicht aus einer Migrationsdatei
  übernommen. HEUTE GILT ER NICHT MEHR. LIVE ABGELESEN am 2026-08-17 (SQL-Editor, Owner,
  im Live-Test der Scheibe 11.1a; Probe: supabase/checks/project-secrets-target-check.sql):
  CHECK ((target = ANY (ARRAY['meta'::text, 'pinterest'::text, 'tiktok'::text,
  'linkedin'::text]))) — VIER Zielwerte. Gesetzt haben ihn 0023 (drittes Ziel) und 0024
  (viertes Ziel), jeweils per drop + add in EINER Transaktion.
  MITGEMESSEN AM 2026-08-17, und es ist wie schon 2026-08-07 der wertvollere der beiden
  Belege: ein Wegwerf-Insert mit 'linkedin' wurde ANGENOMMEN, einer mit 'linkedn_falsch'
  mit 23514 (check_violation) unter dem Namen project_secrets_target_valid ABGEWIESEN. Die
  Annahme allein sähe bei einem Constraint, der alles durchlässt, identisch aus.
  DIE GRENZE DIESER MESSUNG GEHÖRT DAZU: Migration und Deploy waren zum Messzeitpunkt
  BEREITS eingespielt, ein Ausgangswert VOR dem Lauf wurde also nicht abgelesen. Gemessen
  ist, dass der Constraint HEUTE so lautet und wirkt — NICHT, dass 0024 den Übergang
  bewirkt hat. Das ruht auf dem Protokoll-Eintrag und ist eine Ableitung.
  0021 legte den Constraint mit einem EINZIGEN Zielwert an; 0022 hat ihn ERSETZT (drop + add
  in EINER Transaktion). Der Zielwert bleibt eng gefasst, jedes weitere Ziel bringt seine
  EIGENE Constraint-Erweiterung mit — der beabsichtigte Preis: der sichtbare Moment, in dem
  ein Ziel real wird.
  MITGEMESSEN am 2026-08-07, und es ist der wertvollere der beiden Belege: ein
  Wegwerf-Insert mit 'pinterest' wurde ANGENOMMEN, einer mit 'pintrest' ABGEWIESEN (Postgres
  23514, check_violation). Die Annahme allein sähe bei einem Constraint, der alles
  durchlässt, identisch aus — erst die Abweisung zeigt, dass der Schutz noch da ist.
  TRIGGER project_secrets_set_updated_at, gebunden an DIESELBE Funktion set_updated_at wie
  projects und project_tokens — KEINE zweite Implementierung.
  DIESE ZEILE IST SEIT DEM 2026-08-26 GEMESSEN, VORHER WAR SIE EINE BEHAUPTUNG — und der
  Unterschied gehört in eine Datei, die sich ausschliesslich aus Messungen fortschreibt:
  Sie stand hier seit dem 2026-08-05, ohne dass irgendeine Probe sie trug. Probe 8 misst
  die FUNKTION, Probe 9 misst EVENT-Trigger — die BINDUNG einer Funktion an eine Tabelle
  maß keine von beiden. Die Lücke ist ÄLTER als 0025 und ist mit Probe 10 (angelegt
  2026-08-26, supabase/checks/db-stand.sql) geschlossen.
  GEMESSEN 2026-08-26 (SQL-Editor, Owner, Probe 10; pg_trigger mit not tgisinternal, join
  auf pg_proc): DREI Row-Trigger in public — project_secrets_set_updated_at,
  project_tokens_set_updated_at, projects_set_updated_at. ALLE DREI an set_updated_at
  gebunden; die Aussage "KEINE zweite Implementierung" ist damit belegt und nicht mehr
  behauptet.
  ALLE DREI TRAGEN tgenabled = 'O', also aktiv. Das ist mitgemessen und kein Beifang: ein
  Trigger kann DASTEHEN und NICHT FEUERN ('D' für disabled). Wer nur die Anwesenheit der
  Zeile prüft, sieht diesen stillen Fehlzustand nicht — updated_at bliebe dann einfach
  stehen, ohne dass irgendwo ein Fehler entstünde.
  UND EINE ABWESENHEIT MIT BENANNTER REICHWEITE, die erst dieser Lauf sichtbar gemacht
  hat: Es gibt in public KEINE weiteren Row-Trigger — die Plattform legt keine an. Die
  Reichweite ist genau die der Probe: alle Objekte im Schema public, ohne Filter auf
  Tabellen, unter Ausschluss der system-erzeugten Constraint-Trigger. Über andere Schemata
  sagt sie NICHTS.
- PRIMÄRSCHLÜSSEL, DIE NICHT "id" HEISSEN (Footgun, real aufgetreten): domains -> label;
  project_tokens -> project_id; schema_migrations -> version. Vor der Nutzung eines
  Feldnamens die Migration nachsehen.
  ALLE DREI SIND AM 2026-08-26 NACHGEMESSEN UND BESTÄTIGT (SQL-Editor, Owner, Probe 3 aus
  supabase/checks/db-stand.sql; pg_get_constraintdef): domains_pkey PRIMARY KEY (label),
  project_tokens_pkey PRIMARY KEY (project_id), schema_migrations_pkey PRIMARY KEY
  (version).
  WARUM DIE VERBLEIBENDEN EIGENS GEMESSEN WURDEN, statt sie einfach stehenzulassen:
  project_secrets ist am 2026-08-26 aus dieser Liste ENTFERNT worden (0025 gab der Tabelle
  einen einspaltigen Schlüssel id). Eine Mengen-Aussage wird aber nicht dadurch richtig,
  dass man ein falsches Mitglied entfernt — wer korrigiert, prüft die VERBLEIBENDEN, sonst
  wird sie präziser statt wahr (s. docs/immer-beachten.md, "MENGEN — ZWEI REGELN, DIE
  ZUSAMMENGEHÖREN"). Die drei standen seit dem 2026-08-05 ungeprüft da.
  DER EINTRAG WURDE ENTFERNT UND NICHT KORRIGIERT, und das ist der teuerste Punkt dieser
  Zeile: Eine WARNLISTE mit einem falschen Mitglied erzeugt genau den Fehler, vor dem sie
  warnt — jemand schlägt hier nach, liest "das PAAR" und baut eine Query auf einen
  Schlüssel, den es nicht mehr gibt.
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
  project_secrets: ZWEI Indizes, beide von 0025 benannt (GEMESSEN 2026-08-26, SQL-Editor,
    Owner, Probe 7 per indexdef): project_secrets_pkey auf (id); und
    project_secrets_project_id_target_key auf (project_id, target), dessen indexdef den
    Wortlaut NULLS NOT DISTINCT trägt.
    DIE AUFLAGE GILT WÖRTLICH WEITER: Wer hier später einen Index ergänzt, sollte vorher
    einen Zugriff nennen können, der ihn braucht.
    WAS SICH GEÄNDERT HAT, IST IHR TRÄGER UND NICHT SIE SELBST: Bis 0025 trug der
    PRIMÄRSCHLÜSSEL den Zugriff des Lesepfads — eine Gleichheit auf BEIDEN Spalten. Seit
    0025 liegt der PK auf id und trägt ihn NICHT mehr; getragen wird er jetzt vom
    UNIQUE-Constraint. Die frühere Fassung dieser Zeile ("AUSSER dem PK KEIN Index") ist
    damit überholt, ihre Begründung ist es MIT — wer nur die Zahl nachzieht und den Satz
    stehen lässt, hängt die Auflage an ein Objekt, das sie nicht mehr trägt.
    DER ZWEITE INDEX ERFÜLLT DIE AUFLAGE BEREITS, und der Satz gehört hierher, sonst liest
    der nächste Leser ihn als genau den Verstoss, vor dem sie warnt: Sein Zugriff ist
    ZWEIFACH nennbar — der Arbiter des upsert (on_conflict auf beide Spalten; GEMESSEN
    2026-08-25 an der Probe, im Live-Test am 2026-08-26 am laufenden Schreibpfad
    bestätigt) und die Gleichheit auf beiden Spalten im Lesepfad
    (getCapiConfigByTrackingKey).
    WER EINEN DRITTEN EINTRAG SIEHT, hat deshalb keinen automatischen Befund, sondern eine
    FRAGE: Lässt sich sein Zugriff nennen? Wenn nein, ist es einer.
- FUNKTIONEN in public: FÜNF (2026-08-05 erneut gemessen: unverändert) — gemessen, nicht
  nachgetragen.
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
    docs/db-regeln.md, "DB-FUNKTIONEN + SEARCH_PATH".
- EVENT-TRIGGER: SIEBEN (2026-08-05 erneut gemessen: unverändert). ensure_rls
  (ddl_command_end -> rls_auto_enable, evtowner postgres,
  aktiviert) plus SECHS Supabase-Plattform-Trigger (issue_graphql_placeholder,
  issue_pg_cron_access, issue_pg_graphql_access, issue_pg_net_access, pgrst_ddl_watch,
  pgrst_drop_watch; evtowner supabase_admin). ensure_rls existiert NUR in der laufenden DB, aus
  KEINER Migration reproduzierbar -> CLAUDE.md, "## Offene Punkte".
- BACKUPS: Supabase liegt seit 2026-07-29 auf PRO -> TÄGLICHE Backups mit 7 Tagen
  Retention. Die frühere Aussage "Free hat KEINE Backups" ist damit überholt.
  WAS NICHT GELÖST IST — zwei Dinge, die ein "Backups vorhanden" sonst verdeckt:
  (1) PITR ist NICHT gebucht -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem
      letzten täglichen Snapshot). Das ist eine bewusste Entscheidung, kein Versehen.
  (2) Ein Rebuild REIN AUS DEN MIGRATIONEN bliebe unvollständig (ensure_rls /
      rls_auto_enable, s. CLAUDE.md, "## Offene Punkte") — das Upgrade ändert daran NICHTS, weil der
      Event-Trigger am Cluster hängt und in keinem Schema-Dump steckt.
  Der Restore-DRILL ist weiterhin nicht gefahren -> s. CLAUDE.md, "## Security Manifest &
  Launch Blocker", BACKUPS.
- NICHT GEPLANT (war: AUFGESCHOBEN, dann kurzzeitig GEPLANT): CAPI-Forward auf
  Hintergrund-Zustellung umstellen (die 204 löst sich von Metas Latenz). Am 2026-08-06
  GESTRICHEN, weil die BEGRÜNDUNG weggefallen ist — nicht, weil die Absicht vertagt wäre.
  DAS WARUM STEHT AN GENAU EINER STELLE, und diese Zeile führt es bewusst NICHT aus:
  CLAUDE.md, Sektion "## Code-Qualität, Performance & SaaS-Skalierung", Eintrag
  /API/E-SCHLANKHEIT. Dort stehen die Begründung, der TRIGGER, die PROVENIENZ und die
  GRENZE der Entscheidung — zwei Fassungen derselben Begründung müssten synchron gehalten
  werden und sind es schon einmal nicht gewesen. Detail zum ursprünglichen Aufschub:
  docs/claude-history/phase-8-analytics.md.
