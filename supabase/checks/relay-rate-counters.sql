-- ZWECK: Ist die Migration 0030 (Phase 13.6, Scheibe 13.6-5) so in der laufenden Datenbank,
--   wie sie entschieden ist? Tabelle public.relay_rate_counters (drei Spalten, RLS aktiv,
--   keine Policy, Rechte je Rolle) und Funktion public.relay_rate_hit (SECURITY INVOKER,
--   search_path '', EXECUTE nur fuer service_role). Dazu die Postgres-Fassung.
--   Die Entscheidungen: Standdatei der Phase 13.6, Setzung P13.6-75 (E1, E11, E12),
--   Owner-Entscheidung P13.6-76, Setzung P13.6-77.
--
-- ERWARTUNG (je Abfrage unten wiederholt):
--   (1) eine Zeile mit der Fassung — KEIN Soll, abgelesen (die Owner-Angabe lautet 17.6.1.166,
--       docs/plattform-befunde.md, Supabase, Teil (at)).
--   (2) GENAU EINE Zeile: version '0030', filename '0030_relay_rate_counters.sql', applied_at
--       gefuellt.
--   (3) GENAU DREI Zeilen, in dieser Reihenfolge: project_id uuid NO · window_start
--       timestamp with time zone NO · hits integer NO; keine hat einen Default.
--   (4) GENAU DREI Constraints: der Primaerschluessel auf (project_id), der Fremdschluessel
--       auf projects(id) mit ON DELETE CASCADE, der CHECK (hits >= 1).
--   (5) relrowsecurity = true.
--   (6) 0.
--   (7) anon und authenticated: in JEDER Spalte false. service_role: select, insert, update
--       true. service_role delete: abgelesen, nicht bewertet — die Migration entzieht die
--       uebrigen Vorgabe-Rechte nicht (Kopf der Migration).
--   (8) anon false · authenticated false · service_role true · public_hat_execute false.
--   (9) security_definer false · provolatile 'v' · proconfig traegt GENAU EINEN Eintrag
--       search_path=… ohne ein Schema. DIE DARSTELLUNG IST GEMESSEN (Lauf 2026-09-30, s.
--       VERIFIZIERT): Der leere Pfad erscheint als search_path="". Mitlaeufer derselben
--       Abfrage: get_event_counts traegt search_path=public (docs/db-stand.md, FUNKTIONEN;
--       im selben Lauf gemessen).
--   (10) GENAU EIN Index: relay_rate_counters_pkey auf (project_id).
--
-- WANN: nach dem Einspielen der Migration 0030 und vor dem Push des Codes (Reihenfolge der
--   Live-Anleitung der Scheibe 13.6-5); danach bei jeder Arbeit an Tabelle oder Funktion.
--
-- PLATZHALTER: keine.
--
-- FALLE:
--   - schema_migrations existiert DREIMAL (public / auth / realtime); (2) filtert deshalb
--     ausdruecklich auf public (docs/db-stand.md, Kopf).
--   - has_table_privilege und has_function_privilege beantworten, ob die Rolle das Recht
--     HAT — auch geerbt. (8) liest das Recht fuer PUBLIC deshalb getrennt aus der ACL
--     (aclexplode, grantee 0 = PUBLIC).
--   - DIE WIRKUNG DER FENSTER-LOGIK STEHT NICHT IN DIESER DATEI. Ein Aufruf von
--     relay_rate_hit schreibt in eine BESTEHENDE Tabelle und braucht ein bestehendes Projekt
--     (Fremdschluessel); das passt in keine der zwei Bauformen aus README.md. Sie gehoert an
--     den Live-Test der Scheibe.
--   - Diese Datei ist AUSSCHLIESSLICH LESEND (Bauform 1 aus README.md).
--
-- VERIFIZIERT: 2026-09-30 (Owner, SQL-Editor), nach dem Einspielen der Migration 0030
--   (applied_at 10:23:41 UTC). (1)–(10) wie erwartet. Gemessen: (1) PostgreSQL 17.6 ·
--   (7) service_role delete = true · (9) relay_rate_hit proconfig = search_path="",
--   Mitlaeufer get_event_counts = search_path=public.

-- (1) Postgres-Fassung.
select version() as version, current_setting('server_version') as server_version;

-- (2) Protokoll-Eintrag der Migration. Erwartet: GENAU EINE Zeile, applied_at gefuellt.
select version, filename, applied_at
from public.schema_migrations
where version = '0030';

-- (3) Spalten. Erwartet: GENAU DREI, project_id / window_start / hits, alle NOT NULL, kein
--     Default.
select ordinal_position, column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'relay_rate_counters'
order by ordinal_position;

-- (4) Constraints im Wortlaut. Erwartet: GENAU DREI (p, f mit ON DELETE CASCADE, c).
select con.conname, con.contype, pg_get_constraintdef(con.oid) as definition
from pg_constraint con
where con.conrelid = 'public.relay_rate_counters'::regclass
order by con.contype, con.conname;

-- (5) RLS. Erwartet: true.
select c.relname, c.relrowsecurity
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'relay_rate_counters';

-- (6) Policies. Erwartet: 0.
select count(*) as policies
from pg_policies
where schemaname = 'public' and tablename = 'relay_rate_counters';

-- (7) Tabellenrechte je Rolle.
select r.rolname,
       has_table_privilege(r.rolname, 'public.relay_rate_counters', 'SELECT') as sel,
       has_table_privilege(r.rolname, 'public.relay_rate_counters', 'INSERT') as ins,
       has_table_privilege(r.rolname, 'public.relay_rate_counters', 'UPDATE') as upd,
       has_table_privilege(r.rolname, 'public.relay_rate_counters', 'DELETE') as del
from pg_roles r
where r.rolname in ('anon', 'authenticated', 'service_role')
order by r.rolname;

-- (8) EXECUTE je Rolle, und ob PUBLIC selbst ein EXECUTE traegt.
--     Erwartet: false / false / true / false.
select
  has_function_privilege('anon', 'public.relay_rate_hit(uuid, integer)', 'EXECUTE')          as anon,
  has_function_privilege('authenticated', 'public.relay_rate_hit(uuid, integer)', 'EXECUTE') as authenticated,
  has_function_privilege('service_role', 'public.relay_rate_hit(uuid, integer)', 'EXECUTE')  as service_role,
  exists (
    select 1
    from pg_proc p, aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
    where p.oid = 'public.relay_rate_hit(uuid, integer)'::regprocedure
      and a.grantee = 0
      and a.privilege_type = 'EXECUTE'
  ) as public_hat_execute;

-- (9) Sicherheitsmodus, Volatilitaet und gesetzter search_path — dazu der Mitlaeufer
--     get_event_counts (erwartet dort: search_path=public).
select p.proname, p.prosecdef as security_definer, p.provolatile, p.proconfig
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname in ('relay_rate_hit', 'get_event_counts')
order by p.proname;

-- (10) Indizes. Erwartet: GENAU EINER, relay_rate_counters_pkey.
select indexname, indexdef
from pg_indexes
where schemaname = 'public' and tablename = 'relay_rate_counters'
order by indexname;
