-- ZWECK: Wer darf in public.projects, public.domains und public.project_tokens was schreiben —
--   und WER hat das Recht erteilt? Zwei Laeufe zur Migration 0031 (Phase 13.6, Scheibe
--   "Spaltenrechte"): VOR dem Einspielen die Vorbedingung (Eigentuemer, Grantor, FORCE ROW
--   LEVEL SECURITY, PUBLIC, Mitgliedschaften), DANACH die wirksamen Rechte je Rolle und Spalte.
--   Die Entscheidungen: Standdatei der Phase 13.6, Setzungen P13.6-117 und P13.6-125,
--   Owner-Entscheidung P13.6-120.
--
-- ERWARTUNG — ZWEI BLOECKE. Beide gelten denselben Abfragen (1) bis (10) unten.
--
--   BLOCK "VOR DER MIGRATION" (nach dem Code-Deploy, vor 0031). Er PRUEFT nicht nur, er
--   ENTSCHEIDET, ob 0031 eingespielt werden darf:
--   (1) KEIN Soll, abgelesen: current_user und session_user (Vermerk P13.6-118: postgres).
--   (2) KEIN Soll, abgelesen: Eigentuemer der drei Tabellen; rolsuper und rolbypassrls des
--       Eigentuemers und von current_user. relrowsecurity = true bei allen drei. Erwartet
--       relforcerowsecurity = false (NICHT gemessen; abgelesen, nicht bewertet).
--   (3) Tabellen-ACL: anon, authenticated, service_role tragen Rechte auf allen drei Tabellen
--       (docs/db-stand.md, ROLLEN-GRANTS, GEMESSEN 2026-08-05). STOPP-BEDINGUNGEN fuer 0031:
--       · ein Recht von anon oder authenticated, dessen grantor WEDER current_user (1) NOCH
--         — falls current_user rolsuper traegt — der Eigentuemer (2) ist. Dann entzieht
--         0031 nichts (docs/plattform-befunde.md, Supabase, Teil (be), Falle 1). Die
--         Pruefung am Ende von 0031 braeche zwar ab; der Befund gehoert aber VOR den Lauf.
--       · eine Zeile mit grantee PUBLIC (Teil (be), Falle 3).
--   (4) Spalten-ACL: 0 Zeilen (keine Migration traegt ein Spaltenrecht).
--   (5), (6): Gegenlesung ueber information_schema — s. FALLE; sie ersetzt (3) und (4) nicht.
--   (7) Mitgliedschaften: STOPP, wenn anon oder authenticated Mitglied einer Rolle sind, die
--       selbst ein Schreibrecht auf einer der drei Tabellen traegt (Teil (be), Falle 3).
--       Ob es solche Zeilen gibt, ist NICHT gemessen; die Zeilen werden abgelesen und gegen
--       (3) gehalten.
--   (8) Matrix: anon, authenticated und service_role je true fuer SELECT, INSERT, UPDATE auf
--       JEDER Spalte; DELETE je true (Vermerk P13.6-112, Punkt (1), dort fuer drei Spalten von
--       projects gemessen).
--   (9) Policies: projects 4 (select, insert, update, delete je _own) · domains 3 (select,
--       insert, update je _own) · project_tokens 2 (insert, update je _own) — docs/db-stand.md,
--       POLICIES.
--   (10) 0 Zeilen.
--
--   BLOCK "NACH DER MIGRATION" (nach dem Einspielen von 0031):
--   (1), (2): unveraendert gegen VOR.
--   (3) anon und authenticated: KEIN INSERT und KEIN UPDATE auf projects; KEIN INSERT, UPDATE,
--       DELETE auf domains und project_tokens. Alles uebrige wie VOR — ausdruecklich SELECT
--       auf allen drei und DELETE auf projects. service_role unveraendert.
--   (4) GENAU SIEBEN Zeilen: authenticated, UPDATE, auf projects.name, html, mappings,
--       settings, html_b, mappings_b, updated_at. Keine fuer anon.
--   (8) anon: INSERT und UPDATE false auf JEDER Spalte aller drei Tabellen; SELECT true;
--       DELETE true allein auf projects. authenticated: INSERT false ueberall; UPDATE true
--       GENAU auf den sieben Spalten von projects, sonst false; SELECT true ueberall; DELETE
--       true allein auf projects. service_role: alles true wie VOR.
--   (9) projects 3 (select, update, delete je _own) · domains 1 (domains_select_own) ·
--       project_tokens 0.
--   (10) GENAU EINE Zeile: version '0031', filename '0031_spaltenrechte.sql', applied_at
--       gefuellt.
--
-- WANN: VOR dem Einspielen von 0031 (Pflicht-Stopp, Setzung P13.6-125) und unmittelbar
--   danach; danach bei jeder Migration, die ein Recht an einer der drei Tabellen beruehrt.
--
-- PLATZHALTER: keine.
--
-- FALLE:
--   - DIE information_schema-SICHTEN ZEIGEN NICHT ALLES. role_table_grants "identifies all
--     privileges granted on tables or views where the grantor or grantee is a currently
--     enabled role"; column_privileges ebenso "to a currently enabled role or by a currently
--     enabled role" (postgresql.org/docs/17, infoschema-role-table-grants.html und
--     infoschema-column-privileges.html, GELESEN 2026-10-01). Ob anon und authenticated fuer
--     current_user "enabled" sind, ist nicht gemessen. Massgeblich sind (3) und (4) aus dem
--     Katalog (aclexplode); (5) und (6) sind Gegenlesung.
--   - column_privileges zeigt ein TABELLENRECHT als Zeile je Spalte ("If a privilege has been
--     granted on an entire table, it will show up in this view as a grant for each column",
--     ebenda). (6) trennt Tabellen- und Spaltenrecht deshalb NICHT — das tut allein (4).
--   - has_column_privilege "succeeds either if the privilege is held for the whole table, or
--     if there is a column-level grant" (functions-info.html, GELESEN 2026-10-01; Vermerk
--     P13.6-112, Punkt (1)). (8) zeigt deshalb das WIRKSAME Recht, nicht seinen Ort.
--   - EINE PROBE IM SQL-EDITOR MISST POSTGRES, NICHT POSTGREST (Dauerregel "EINE PROBE GEGEN
--     DIESELBE SCHICHT KANN EINE FRAGE UEBER EINE ANDERE SCHICHT NICHT SCHLIESSEN"). Ob ein
--     PATCH mit echter Sitzung abgewiesen wird, zeigt allein der Live-Test (Vermerk
--     P13.6-116, Punkt (5), der Phase 13.6).
--   - Ein NULL in relacl hiesse "Vorgabe-Rechte" (ddl-priv.html, GELESEN 2026-10-01); dann
--     liefert (3) fuer die Tabelle keine Zeile. (3) gibt relacl deshalb auch roh aus.
--   - schema_migrations existiert DREIMAL (public / auth / realtime); (10) filtert auf public
--     (docs/db-stand.md, Kopf).
--   - Diese Datei ist AUSSCHLIESSLICH LESEND (Bauform 1 aus README.md).
--   - UEBER DEN AUFTRAG HINAUS, NUR LESEND: (3) und (8) zeigen auch TRUNCATE, REFERENCES und
--     TRIGGER. 0031 aendert sie nicht; abgelesen, nicht bewertet.
--
-- VERIFIZIERT: noch nie gefahren (angelegt 2026-10-01, Phase 13.6, Scheibe "Spaltenrechte").

-- (1) Wer fuehrt aus?
select current_user, session_user;

-- (2) Eigentuemer, RLS, FORCE; Attribute von Eigentuemer und current_user.
select c.relname,
       o.rolname       as eigentuemer,
       o.rolsuper      as eigentuemer_super,
       o.rolbypassrls  as eigentuemer_bypassrls,
       c.relrowsecurity,
       c.relforcerowsecurity,
       (select rolsuper from pg_catalog.pg_roles where rolname = current_user)     as ausfuehrender_super,
       (select rolbypassrls from pg_catalog.pg_roles where rolname = current_user) as ausfuehrender_bypassrls
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
join pg_catalog.pg_roles o on o.oid = c.relowner
where n.nspname = 'public' and c.relname in ('projects', 'domains', 'project_tokens')
order by c.relname;

-- (3) Tabellen-ACL aus dem Katalog: je Recht eine Zeile, mit GRANTOR. grantee 0 = PUBLIC.
--     Dazu relacl roh (NULL = Vorgabe-Rechte, s. FALLE).
select c.relname,
       case when a.grantee = 0 then 'PUBLIC' else ge.rolname end as grantee,
       gr.rolname as grantor,
       a.privilege_type,
       a.is_grantable,
       c.relacl::text as relacl_roh
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
left join lateral pg_catalog.aclexplode(c.relacl) a on true
left join pg_catalog.pg_roles ge on ge.oid = a.grantee
left join pg_catalog.pg_roles gr on gr.oid = a.grantor
where n.nspname = 'public' and c.relname in ('projects', 'domains', 'project_tokens')
order by c.relname, grantee, a.privilege_type;

-- (4) Spalten-ACL aus dem Katalog: nur Spalten mit eigenem Recht (attacl nicht NULL).
select c.relname,
       att.attname,
       case when a.grantee = 0 then 'PUBLIC' else ge.rolname end as grantee,
       gr.rolname as grantor,
       a.privilege_type
from pg_catalog.pg_attribute att
join pg_catalog.pg_class c on c.oid = att.attrelid
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
cross join lateral pg_catalog.aclexplode(att.attacl) a
left join pg_catalog.pg_roles ge on ge.oid = a.grantee
left join pg_catalog.pg_roles gr on gr.oid = a.grantor
where n.nspname = 'public'
  and c.relname in ('projects', 'domains', 'project_tokens')
  and att.attnum > 0
  and not att.attisdropped
  and att.attacl is not null
order by c.relname, att.attnum, grantee, a.privilege_type;

-- (5) Gegenlesung: information_schema.role_table_grants (s. FALLE).
select table_name, grantee, grantor, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('projects', 'domains', 'project_tokens')
  and grantee in ('anon', 'authenticated', 'service_role', 'PUBLIC')
order by table_name, grantee, privilege_type;

-- (6) Gegenlesung: information_schema.column_privileges, nur INSERT und UPDATE (s. FALLE).
select table_name, column_name, grantee, grantor, privilege_type
from information_schema.column_privileges
where table_schema = 'public'
  and table_name in ('projects', 'domains', 'project_tokens')
  and grantee in ('anon', 'authenticated', 'service_role', 'PUBLIC')
  and privilege_type in ('INSERT', 'UPDATE')
order by table_name, column_name, grantee, privilege_type;

-- (7) Mitgliedschaften von anon und authenticated: in welchen Rollen sind sie Mitglied?
select m.rolname as mitglied, r.rolname as rolle, am.inherit_option, am.set_option
from pg_catalog.pg_auth_members am
join pg_catalog.pg_roles m on m.oid = am.member
join pg_catalog.pg_roles r on r.oid = am.roleid
where m.rolname in ('anon', 'authenticated')
order by m.rolname, r.rolname;

-- (8) Die Matrix der WIRKSAMEN Rechte: je Rolle x Spalte SELECT/INSERT/UPDATE/REFERENCES,
--     dazu je Rolle x Tabelle DELETE, TRUNCATE, TRIGGER (Tabellenrechte, ohne Spaltenform).
select c.relname,
       att.attnum,
       att.attname,
       rl.rolname,
       has_column_privilege(rl.rolname, c.oid, att.attnum, 'SELECT')     as sel,
       has_column_privilege(rl.rolname, c.oid, att.attnum, 'INSERT')     as ins,
       has_column_privilege(rl.rolname, c.oid, att.attnum, 'UPDATE')     as upd,
       has_column_privilege(rl.rolname, c.oid, att.attnum, 'REFERENCES') as refs
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
join pg_catalog.pg_attribute att on att.attrelid = c.oid and att.attnum > 0 and not att.attisdropped
cross join (values ('anon'), ('authenticated'), ('service_role')) as rl(rolname)
where n.nspname = 'public' and c.relname in ('projects', 'domains', 'project_tokens')
order by c.relname, rl.rolname, att.attnum;

select c.relname,
       rl.rolname,
       has_table_privilege(rl.rolname, c.oid, 'DELETE')   as del,
       has_table_privilege(rl.rolname, c.oid, 'TRUNCATE') as trunc,
       has_table_privilege(rl.rolname, c.oid, 'TRIGGER')  as trig
from pg_catalog.pg_class c
join pg_catalog.pg_namespace n on n.oid = c.relnamespace
cross join (values ('anon'), ('authenticated'), ('service_role')) as rl(rolname)
where n.nspname = 'public' and c.relname in ('projects', 'domains', 'project_tokens')
order by c.relname, rl.rolname;

-- (9) Policies der drei Tabellen im Wortlaut.
select tablename, policyname, cmd, roles, qual, with_check
from pg_catalog.pg_policies
where schemaname = 'public' and tablename in ('projects', 'domains', 'project_tokens')
order by tablename, policyname;

-- (10) Protokoll-Eintrag der Migration 0031.
select version, filename, applied_at
from public.schema_migrations
where version = '0031';
