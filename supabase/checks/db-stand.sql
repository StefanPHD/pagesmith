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
-- VERIFIZIERT: ZULETZT GEFAHREN 2026-08-05, nach Migration 0021; die Ergebnisse dieses
--              Laufs stehen in CLAUDE.md "## Aktueller DB-/Analytics-Stand". Mit
--              DIESEM Lauf sind die ERWARTUNGEN unten auf den Stand nach 0021 gezogen
--              (Proben 1, 1b, 3, 4, 6).
--              KEINE TREFFERBILANZ FUER DEN 2026-08-05-LAUF: gemeldet wurden WERTE,
--              nicht "alle Proben trafen ihre Erwartung". Hier steht deshalb keine —
--              eine erfundene Bilanz waere schlimmer als gar keine.
--              FRUEHERER LAUF, historisch: 2026-07-30 — ALLE ZEHN Proben trafen ihre
--              ERWARTUNG exakt, KEINE Abweichung. Diese Bilanz gilt fuer JENEN Lauf
--              und jene Erwartungen, nicht fuer die heutigen.
--              PROBE 2 UND PROBE 7 SIND SEITHER AUF project_secrets ERWEITERT (die
--              Tabellenliste ihrer Abfrage trug sie vorher nicht, die neue Tabelle war
--              damit von KEINER Probe auf Spalten und Indizes erfasst). Ihre
--              ERWARTUNGEN sind gegen den Lauf vom 2026-08-05 formuliert, aber IN
--              DIESER FORM NOCH NICHT GEFAHREN — fuer die erweiterten Proben gibt es
--              also KEIN Verifiziert-Datum. Wer sie das erste Mal faehrt, traegt es
--              hier nach.
-- NACHTRAG:    DERSELBE TAG TRAEGT ZWEI VERSCHIEDENE EREIGNISSE, die nicht
--              ineinanderfallen duerfen: VORMITTAGS wurde nur der Query-TEXT dieser
--              Datei auf 0019/0020 nachgezogen (Probe 1 ERWARTUNG, neue Probe 1b,
--              Probe 2/7/8 ERWARTUNG) — OHNE DB-Verbindung, da diese Umgebung keine
--              Postgres-Direktverbindung hat (keine DATABASE_URL, keine verlinkte CLI,
--              keine generische SQL-Ausfuehrungs-RPC; s. Aufklärungsbericht). ERST
--              DANACH, am selben Tag, hat Stefan die so aktualisierten Proben ECHT im
--              SQL-Editor gefahren — das ist der Lauf, den VERIFIZIERT oben datiert.

-- PROBE 1 — Migrations-Protokoll
-- ERWARTUNG: EINUNDZWANZIG Zeilen ('0001' bis '0021'). applied_at ist bei VIER Zeilen
--            gefuellt — '0018', '0019', '0020', '0021' (Protokoll-Pflicht ab 0018, alle
--            spaeteren Migrationen tragen den Insert bereits mit); 0001-0017 tragen
--            NULL — sie sind ein BACKFILL aus 0018, kein Vollzugsnachweis.
select version, filename, applied_at
from public.schema_migrations
order by version;

-- PROBE 1b — Luecklosigkeit der Migrationsnummern
-- ERWARTUNG: eine Zeile, luecke = false. anzahl_zeilen = erwartete_anzahl UND
--            niedrigste = '0001' UND hoechste = '0021' beweisen zusammen die
--            Luecklosigkeit rein arithmetisch (Zeilenzahl = Spannweite+1), OHNE die
--            Werte einzeln abzutippen. Die zweite Abfrage listet im
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

-- PROBE 2 — Spalten von projects + events + project_secrets
-- ERWARTUNG: events traegt SIEBEN Spalten — id, project_id, event_type, event_id,
--            source, created_at (alle NOT NULL) plus variant (NULLABLE, 0017).
--            projects traegt u.a. tracking_key, html_b, mappings_b (alle NULLABLE),
--            ab_test_active (NOT NULL, default false), ab_test_started_at
--            (NULLABLE, KEIN Default, 0020), settings (NOT NULL, '{}').
--            project_secrets (0021) traegt FUENF Spalten — project_id (uuid), target
--            (text), secret (text), created_at, updated_at (beide timestamptz).
--            KEINE user_id-Spalte: die Alt-Tabelle project_tokens fuehrt sie nur, um
--            ihre WITH-CHECK-Policies zu bedienen; ohne Policies haette sie hier
--            keinen Zweck (s. den Kommentarkopf von 0021).
--            WAS DIE PROBE ZEIGEN SOLL, statt es zu behaupten: Migration 0021 legt
--            alle fuenf Spalten NOT NULL an und gibt created_at/updated_at je ein
--            now()-Default mit. Ob die DB das traegt, ist genau die Frage dieser
--            Probe — deshalb steht es hier als Soll, nicht als Befund.
select table_name, ordinal_position, column_name, data_type,
       is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('projects', 'events', 'project_secrets')
order by table_name, ordinal_position;

-- PROBE 3 — Constraints (Schema-gefiltert)
-- ERWARTUNG: events_event_type_max_len, events_variant_valid (variant IS NULL OR
--            variant IN ('a','b')), projects_variant_b_pair,
--            projects_ab_test_needs_variant_b. KEIN Unique auf events.event_id —
--            die geteilte browser/server-eventID IST der Verlustraten-Join.
--            SEIT 0021 zusaetzlich die Constraints von project_secrets: der CHECK
--            project_secrets_target_valid (target = 'meta'), der ZUSAMMENGESETZTE
--            Primaerschluessel (project_id, target) und der Fremdschluessel auf
--            projects(id) ON DELETE CASCADE. Deren Namen vergibt Postgres selbst; sie
--            stehen hier bewusst NICHT ausgeschrieben, damit diese Datei keinen Namen
--            behauptet, den niemand gemessen hat. Die Abfrage ist SCHEMA-weit, also
--            tauchen sie hier auf — ohne diesen Zusatz saehen sie wie ein Fund aus.
select rel.relname as tabelle, con.conname,
       pg_get_constraintdef(con.oid) as definition
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
order by rel.relname, con.conname;

-- PROBE 4 — Tabellen, RLS-Status, Policy-Anzahl
-- ERWARTUNG: SIEBEN Tabellen (projects, domains, project_tokens, events, audit_logs,
--            schema_migrations, project_secrets), ALLE mit rls_aktiv = true.
--            Policy-Zahlen: projects 4, domains 3, project_tokens 2, events 1,
--            audit_logs 0, schema_migrations 0, project_secrets 0. Summe ZEHN — die
--            neue Tabelle traegt KEINE Policy und aendert die Summe deshalb nicht.
--            Die Null-Werte sind Absicht, kein Versaeumnis (s. "APPEND-ONLY-TABELLEN
--            BLEIBEN POLICY-FREI" — die Regel nennt project_secrets bewusst nicht in
--            ihrer Aufzaehlung, s. den Satz am Ende jener Regel).
--            BEI project_secrets IST DIE NULL DIE TRAGENDE KONTROLLE: unter aktiver
--            RLS ohne JEDE Policy ist die Geheimnis-Tabelle fuer anon und
--            authenticated vollstaendig verschlossen. Steht hier je eine Zahl > 0,
--            ist das KEIN Fortschritt, sondern ein Befund.
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
--            SIEBEN Tabellen, inkl. project_tokens, schema_migrations UND
--            project_secrets. Das ist der Supabase-Default und wird NICHT als
--            Schutzschicht gelesen: Isolation und write-only-Gate tragen
--            ausschliesslich ueber RLS. Bei project_secrets ist der Kontrast am
--            schaerfsten — volle Grants, und trotzdem verschlossen, weil keine
--            einzige Policy existiert.
select table_name, grantee,
       string_agg(privilege_type, ', ' order by privilege_type) as rechte
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee in ('anon', 'authenticated', 'service_role')
group by table_name, grantee
order by table_name, grantee;

-- PROBE 7 — Indizes auf events, projects, domains, project_secrets
-- ERWARTUNG: events_pkey, events_project_id_idx, events_project_event_idx — KEIN
--            Index auf variant (0017 legte bewusst keinen an). projects_pkey,
--            projects_tracking_key_key (partial unique), projects_blocked_idx
--            (partial, traegt den Kill-Switch-Lookup) — KEIN Index auf
--            ab_test_started_at (0020: ein Zeilen-Lookup pro Auswertung ueber den
--            PK, nie gefiltert/sortiert). domains_pkey auf LABEL (nicht id),
--            domains_custom_host_key (partial unique), domains_project_id_idx.
--            project_secrets: GENAU EIN Eintrag — der Index, den der ZUSAMMENGESETZTE
--            Primaerschluessel (project_id, target) mitbringt. Seinen Namen vergibt
--            Postgres selbst; er steht hier bewusst NICHT ausgeschrieben, damit diese
--            Datei keinen Namen behauptet, den niemand gemessen hat.
--            DASS SONST KEIN INDEX DASTEHT, IST EINE ENTSCHEIDUNG UND KEIN FEHLEN —
--            der Satz gehoert hierher, sonst liest jemand den einzelnen Eintrag als
--            Luecke und legt einen Index "nach": Der PK traegt genau den Zugriff des
--            Lesepfads, eine Gleichheit auf BEIDEN Spalten. Wer hier einen zweiten
--            Eintrag sieht, hat einen Befund — jemand hat einen Index angelegt, ohne
--            den Zugriff zu nennen, der ihn braucht.
select tablename, indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('events', 'projects', 'domains', 'project_secrets')
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
