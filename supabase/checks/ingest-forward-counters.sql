-- ZWECK: Ist die Migration 0032 (Phase 13.7, Scheibe K1b) so in der laufenden Datenbank, wie
--   sie entschieden ist? Tabelle public.ingest_forward_counters (drei Spalten, RLS aktiv, keine
--   Policy, Rechte je Rolle) und Funktion public.ingest_forward_hit (SECURITY INVOKER,
--   search_path '', EXECUTE nur fuer service_role). Dazu der Zaehlerstand: alle Zeilen (12) und
--   die Zeile EINES Projekts (11).
--   Die Entscheidungen: Standdatei der Phase 13.7, Zuschnitt P13.7-60, und die Entscheidungen
--   D3 bis D5 zum Plan (ARCHITEKT 2026-10-03). Muster: relay-rate-counters.sql.
--
-- ERWARTUNG (je Abfrage unten wiederholt):
--   (1) eine Zeile mit der Fassung — KEIN Soll, abgelesen.
--   (2) GENAU EINE Zeile: version '0032', filename '0032_ingest_forward_counters.sql',
--       applied_at gefuellt.
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
--   (9) ingest_forward_hit: security_definer false · provolatile 'v' · proconfig GENAU
--       {search_path=""}. Mitlaeufer get_event_counts: search_path=public (docs/db-stand.md,
--       FUNKTIONEN).
--   (10) GENAU EIN Index: ingest_forward_counters_pkey auf (project_id).
--   (11) GENAU EINE Zeile. befund 'PLATZHALTER NICHT ERSETZT': die Kennung ist nicht
--       eingesetzt, die Zeile sagt nichts. befund 'keine Zeile': fuer dieses Projekt ist seit
--       0032 kein weiterleitbares Ereignis gezaehlt worden. befund 'Zeile': window_start, hits
--       und die zwei Lesehilfen sind abgelesen.
--   (12) KEINE ERWARTUNG — eine Messung: je Projekt mit Zaehler eine Zeile, neueste zuerst.
--
-- WANN: nach dem Einspielen der Migration 0032 und vor dem Push des Codes ((1) bis (10));
--   (11) und (12) im Live-Test der Scheibe K1b und wenn ein Betreiber meldet, dass Conversions
--   nicht ankommen; danach bei jeder Arbeit an Tabelle oder Funktion.
--
-- PLATZHALTER: genau einer, nur in (11): <PROJEKT_UUID> = die Kennung (projects.id) EINES
--   Projekts, zwischen die vorhandenen Anfuehrungszeichen einzusetzen. Sonst wird an dieser Datei NICHTS
--   geaendert. SELBSTTEST: Ist er nicht ersetzt oder keine Kennung der Form einer UUID, liefert
--   (11) GENAU EINE Zeile 'PLATZHALTER NICHT ERSETZT' und keine Zaehlerwerte — der Vergleich
--   laeuft auf Text, ein unersetzter Platzhalter bricht also nicht mit einem Fehler ab.
--
-- FALLE:
--   - schema_migrations existiert DREIMAL (public / auth / realtime); (2) filtert deshalb
--     ausdruecklich auf public (docs/db-stand.md, Kopf).
--   - has_table_privilege und has_function_privilege beantworten, ob die Rolle das Recht HAT
--     — auch geerbt. (8) liest das Recht fuer PUBLIC deshalb getrennt aus der ACL (aclexplode,
--     grantee 0 = PUBLIC).
--   - DIE GRENZE 600 STEHT IN (11) UND (12) NUR ALS LESEHILFE. Die Grenze, die gilt, steht im
--     Code (INGEST_FORWARD_LIMIT in src/lib/capi/forward-limit.ts). Den Gleichlauf haelt der
--     Test W-PROBE-LIMIT in src/lib/capi/forward-limit.test.ts; wer die Grenze aendert, aendert
--     beide Stellen.
--   - DER UEBERLAUF IST NUR IM LAUFENDEN FENSTER ABLESBAR: Die Zeile traegt allein das
--     juengste Fenster; mit dem naechsten gezaehlten Ereignis eines neueren Fensters faellt
--     hits auf 1 (Entscheidung D4: keine Ueberlauf-Spalten). laufendes_fenster = false heisst:
--     die Zahl gehoert einem vergangenen Fenster.
--   - DIE WIRKUNG DER FENSTER-LOGIK STEHT NICHT IN DIESER DATEI. Ein Aufruf von
--     ingest_forward_hit schreibt in eine BESTEHENDE Tabelle und braucht ein bestehendes
--     Projekt (Fremdschluessel); das passt in keine der zwei Bauformen aus README.md. Sie
--     gehoert an den Live-Test der Scheibe.
--   - Diese Datei ist AUSSCHLIESSLICH LESEND (Bauform 1 aus README.md).
--
-- VERIFIZIERT: noch nie gegen echte Daten gefahren.

-- (1) Postgres-Fassung.
select version() as version, current_setting('server_version') as server_version;

-- (2) Protokoll-Eintrag der Migration. Erwartet: GENAU EINE Zeile, applied_at gefuellt.
select version, filename, applied_at
from public.schema_migrations
where version = '0032';

-- (3) Spalten. Erwartet: GENAU DREI, project_id / window_start / hits, alle NOT NULL, kein
--     Default.
select ordinal_position, column_name, data_type, is_nullable, column_default
from information_schema.columns
where table_schema = 'public' and table_name = 'ingest_forward_counters'
order by ordinal_position;

-- (4) Constraints im Wortlaut. Erwartet: GENAU DREI (p, f mit ON DELETE CASCADE, c).
--     Gefiltert auf p/f/c: Ab PostgreSQL 18 stehen NOT-NULL-Bedingungen als eigene Zeilen
--     (contype 'n') im Katalog — gemessen an PGlite 0.5.8 (Postgres 18.3) am 2026-10-03; das
--     Projekt faehrt 17.6. NOT NULL prueft (3).
select con.conname, con.contype, pg_get_constraintdef(con.oid) as definition
from pg_constraint con
where con.conrelid = 'public.ingest_forward_counters'::regclass
  and con.contype in ('p', 'f', 'c')
order by con.contype, con.conname;

-- (5) RLS. Erwartet: true.
select c.relname, c.relrowsecurity
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public' and c.relname = 'ingest_forward_counters';

-- (6) Policies. Erwartet: 0.
select count(*) as policies
from pg_policies
where schemaname = 'public' and tablename = 'ingest_forward_counters';

-- (7) Tabellenrechte je Rolle.
select r.rolname,
       has_table_privilege(r.rolname, 'public.ingest_forward_counters', 'SELECT') as sel,
       has_table_privilege(r.rolname, 'public.ingest_forward_counters', 'INSERT') as ins,
       has_table_privilege(r.rolname, 'public.ingest_forward_counters', 'UPDATE') as upd,
       has_table_privilege(r.rolname, 'public.ingest_forward_counters', 'DELETE') as del
from pg_roles r
where r.rolname in ('anon', 'authenticated', 'service_role')
order by r.rolname;

-- (8) EXECUTE je Rolle, und ob PUBLIC selbst ein EXECUTE traegt.
--     Erwartet: false / false / true / false.
select
  has_function_privilege('anon', 'public.ingest_forward_hit(uuid, integer)', 'EXECUTE')          as anon,
  has_function_privilege('authenticated', 'public.ingest_forward_hit(uuid, integer)', 'EXECUTE') as authenticated,
  has_function_privilege('service_role', 'public.ingest_forward_hit(uuid, integer)', 'EXECUTE')  as service_role,
  exists (
    select 1
    from pg_proc p, aclexplode(coalesce(p.proacl, acldefault('f', p.proowner))) a
    where p.oid = 'public.ingest_forward_hit(uuid, integer)'::regprocedure
      and a.grantee = 0
      and a.privilege_type = 'EXECUTE'
  ) as public_hat_execute;

-- (9) Sicherheitsmodus, Volatilitaet und gesetzter search_path — dazu der Mitlaeufer
--     get_event_counts (erwartet dort: search_path=public).
select p.proname, p.prosecdef as security_definer, p.provolatile, p.proconfig
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public' and p.proname in ('ingest_forward_hit', 'get_event_counts')
order by p.proname;

-- (10) Indizes. Erwartet: GENAU EINER, ingest_forward_counters_pkey.
select indexname, indexdef
from pg_indexes
where schemaname = 'public' and tablename = 'ingest_forward_counters'
order by indexname;

-- (11) Zaehlerstand EINES Projekts. Die EINZIGE Einsetzstelle dieser Datei steht in der
--      naechsten Zeile. Erwartet: GENAU EINE Zeile (s. Kopf, ERWARTUNG (11)).
with p(id) as (select '<PROJEKT_UUID>'::text),
     z as (
       select c.window_start, c.hits
       from public.ingest_forward_counters c, p
       where c.project_id::text = lower(p.id)
     )
select
  case
    when p.id !~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
      then 'PLATZHALTER NICHT ERSETZT'
    when not exists (select 1 from z) then 'keine Zeile'
    else 'Zeile'
  end as befund,
  case when p.id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       then (select window_start from z) end as window_start,
  case when p.id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       then (select hits from z) end as hits,
  case when p.id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       then (select hits > 600 from z) end as ueber_grenze_600,
  case when p.id ~* '^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$'
       then (select window_start = date_bin(interval '60 seconds', now(),
                                            timestamptz '2001-01-01 00:00:00+00') from z)
  end as laufendes_fenster
from p;

-- (12) Alle Zaehler, neueste zuerst. KEINE ERWARTUNG — eine Messung.
select c.project_id, c.window_start, c.hits,
       c.hits > 600 as ueber_grenze_600,
       c.window_start = date_bin(interval '60 seconds', now(),
                                 timestamptz '2001-01-01 00:00:00+00') as laufendes_fenster
from public.ingest_forward_counters c
order by c.window_start desc;
