-- ZWECK:       Erhebt den KOMPLETTEN Ist-Zustand des public-Schemas in ZEHN Proben:
--              Migrations-Protokoll (inkl. Luecklosigkeit), Spalten, Constraints,
--              RLS/Policies, Grants, Indizes, Funktionen, Event-Trigger. Das ist die
--              Quelle fuer die Sektion "## Aktueller DB-/Analytics-Stand" in
--              CLAUDE.md. Ohne diese Datei wurde die Sektion aus dem Gedaechtnis und
--              aus den Migrations-DATEIEN geschrieben — und hing dadurch drei
--              Migrationen zurueck und behauptete "ALLE Spalten NOT NULL" bei
--              events, obwohl variant seit 0017 NULLABLE ist.
-- ERWARTUNG:   Je Probe unten als eigener Kommentar. Weicht ein Wert ab, ist das ein
--              echter Fund — entweder ist eine Migration nicht gelaufen, oder die
--              Doku-Sektion ist veraltet. Beides ist berichtenswert, keines wird
--              stillschweigend angeglichen.
-- WANN:        Vor jedem Schreiben der DB-Stand-Sektion, und nach JEDER Migration,
--              die Spalten, Constraints oder Policies beruehrt.
-- PLATZHALTER: keine.
-- FALLE:       schema_migrations existiert DREIMAL im Cluster (public / auth /
--              realtime). Jede Katalog-Abfrage MUSS das Schema filtern — sonst
--              liefert sie drei Zeilen mit unterschiedlichen RLS-Werten und sieht
--              wie ein Befund aus. Probe 9 ist die BEWUSSTE Ausnahme: Event-Trigger
--              sind cluster-weit und haben kein Schema.
-- VERIFIZIERT: 2026-07-28, Ergebnisse in CLAUDE.md "## Aktueller DB-/Analytics-Stand"
-- AKTUALISIERT: 2026-07-30 — NUR der Query-Text wurde auf 0019/0020 nachgezogen
--              (Probe 1 ERWARTUNG, neue Probe 1b, Probe 2/7/8 ERWARTUNG). KEIN
--              Lauf gegen echte Daten fand in dieser Runde statt — es bestand keine
--              DB-Verbindung (s. Aufklärungsbericht). VERIFIZIERT oben bleibt
--              deshalb UNVERAENDERT auf 2026-07-28 stehen; ein Nachziehen dieses
--              Datums ist erst nach dem naechsten echten Lauf im SQL-Editor faellig.

-- PROBE 1 — Migrations-Protokoll
-- ERWARTUNG: ZWANZIG Zeilen ('0001' bis '0020'). applied_at ist bei DREI Zeilen
--            gefuellt — '0018', '0019', '0020' (Protokoll-Pflicht ab 0018, beide
--            spaeteren Migrationen tragen den Insert bereits mit); 0001-0017 tragen
--            NULL — sie sind ein BACKFILL aus 0018, kein Vollzugsnachweis.
select version, filename, applied_at
from public.schema_migrations
order by version;

-- PROBE 1b — Luecklosigkeit der Migrationsnummern
-- ERWARTUNG: eine Zeile, luecke = false. anzahl_zeilen = erwartete_anzahl UND
--            niedrigste = '0001' UND hoechste = '0020' beweisen zusammen die
--            Luecklosigkeit rein arithmetisch (Zeilenzahl = Spannweite+1), OHNE die
--            zwanzig Werte einzeln abzutippen. Die zweite Abfrage listet im
--            Fehlerfall die FEHLENDEN Nummern explizit, statt nur "luecke = true"
--            zu melden.
select
  min(version)                                  as niedrigste,
  max(version)                                  as hoechste,
  count(*)                                       as anzahl_zeilen,
  (max(version::int) - min(version::int) + 1)    as erwartete_anzahl_bei_luecklos,
  count(*) <> (max(version::int) - min(version::int) + 1) as luecke
from public.schema_migrations;

-- Nur bei Bedarf (luecke = true oben): zeigt die fehlenden Nummern konkret.
select gs.nr
from generate_series(
       (select min(version::int) from public.schema_migrations),
       (select max(version::int) from public.schema_migrations)
     ) as gs(nr)
where not exists (
  select 1 from public.schema_migrations sm where sm.version::int = gs.nr
)
order by gs.nr;

-- PROBE 2 — Spalten von projects + events
-- ERWARTUNG: events traegt SIEBEN Spalten — id, project_id, event_type, event_id,
--            source, created_at (alle NOT NULL) plus variant (NULLABLE, 0017).
--            projects traegt u.a. tracking_key, html_b, mappings_b (alle NULLABLE),
--            ab_test_active (NOT NULL, default false), ab_test_started_at
--            (NULLABLE, KEIN Default, 0020), settings (NOT NULL, '{}').
select table_name, ordinal_position, column_name, data_type,
       is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('projects', 'events')
order by table_name, ordinal_position;

-- PROBE 3 — Constraints (Schema-gefiltert)
-- ERWARTUNG: events_event_type_max_len, events_variant_valid (variant IS NULL OR
--            variant IN ('a','b')), projects_variant_b_pair,
--            projects_ab_test_needs_variant_b. KEIN Unique auf events.event_id —
--            die geteilte browser/server-eventID IST der Verlustraten-Join.
select rel.relname as tabelle, con.conname,
       pg_get_constraintdef(con.oid) as definition
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
order by rel.relname, con.conname;

-- PROBE 4 — Tabellen, RLS-Status, Policy-Anzahl
-- ERWARTUNG: SECHS Tabellen (projects, domains, project_tokens, events, audit_logs,
--            schema_migrations), ALLE mit rls_aktiv = true. Policy-Zahlen: projects 4,
--            domains 3, project_tokens 2, events 1, audit_logs 0,
--            schema_migrations 0. Summe ZEHN. Die Null-Werte sind Absicht, kein
--            Versaeumnis (s. "APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI").
select rel.relname as tabelle,
       rel.relrowsecurity as rls_aktiv,
       count(pol.polname) as policies
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
left join pg_policy pol on pol.polrelid = rel.oid
where nsp.nspname = 'public'
  and rel.relkind = 'r'
group by rel.relname, rel.relrowsecurity
order by rel.relname;

-- PROBE 5 — Policies im Wortlaut
-- ERWARTUNG: project_tokens traegt KEINE SELECT-Policy (write-only-Gate auf den
--            CAPI-Token), domains KEINE DELETE-Policy. NUR events_select_own kapselt
--            (select auth.uid()); projects/domains/project_tokens tragen blankes
--            auth.uid() — bekannte Abweichung, reiner Performance-Punkt, KEIN Leak.
select tablename, policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- PROBE 6 — Rollen-Grants
-- ERWARTUNG: anon, authenticated UND service_role haben volle DML-Rechte auf ALLE
--            SECHS Tabellen, inkl. project_tokens und schema_migrations. Das ist der
--            Supabase-Default und wird NICHT als Schutzschicht gelesen: Isolation und
--            write-only-Gate tragen ausschliesslich ueber RLS.
select table_name, grantee,
       string_agg(privilege_type, ', ' order by privilege_type) as rechte
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee in ('anon', 'authenticated', 'service_role')
group by table_name, grantee
order by table_name, grantee;

-- PROBE 7 — Indizes auf events, projects, domains
-- ERWARTUNG: events_pkey, events_project_id_idx, events_project_event_idx — KEIN
--            Index auf variant (0017 legte bewusst keinen an). projects_pkey,
--            projects_tracking_key_key (partial unique), projects_blocked_idx
--            (partial, traegt den Kill-Switch-Lookup) — KEIN Index auf
--            ab_test_started_at (0020: ein Zeilen-Lookup pro Auswertung ueber den
--            PK, nie gefiltert/sortiert). domains_pkey auf LABEL (nicht id),
--            domains_custom_host_key (partial unique), domains_project_id_idx.
select tablename, indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('events', 'projects', 'domains')
order by tablename, indexname;

-- PROBE 8 — Funktionen in public
-- ERWARTUNG: FUENF. get_event_counts + get_adblock_loss + get_variant_counts
--            (0019, ERSETZT durch 0020 — Signatur/Rueckgabetyp byte-gleich, nur der
--            Zeitfilter ist neu) + set_updated_at sind INVOKER mit
--            search_path=public. rls_auto_enable ist die EINZIGE SECURITY DEFINER
--            und traegt search_path=pg_catalog — das ist KORREKT und darf nicht auf
--            public "korrigiert" werden (s. "DB-FUNKTIONEN + SEARCH_PATH").
select p.proname,
       case p.prosecdef when true then 'DEFINER' else 'INVOKER' end as sicherheit,
       p.provolatile as volatilitaet,
       p.proconfig as set_klauseln
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
order by p.proname;

-- PROBE 9 — Event-Trigger (cluster-weit, bewusst KEIN Schema-Filter)
-- ERWARTUNG: SIEBEN. ensure_rls (ddl_command_end -> rls_auto_enable, owner postgres,
--            aktiviert) plus SECHS Supabase-Plattform-Trigger (owner supabase_admin).
--            Fehlt ensure_rls, ist das Schutznetz gegen RLS-lose neue Tabellen weg.
select et.evtname, et.evtevent, et.evtenabled,
       p.proname as funktion,
       pg_get_userbyid(et.evtowner) as owner
from pg_event_trigger et
join pg_proc p on p.oid = et.evtfoid
order by et.evtname;
