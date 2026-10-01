-- Phase 13.6, Scheibe "Spaltenrechte" — DIE ANGEMELDETE ROLLE SCHREIBT KEINE SERVER-EIGENE
-- SPALTE MEHR, IN KEINER TABELLE.
-- Manuell im Supabase-SQL-Editor ausfuehren — ERST NACH dem Code-Deploy, nicht davor.
--
-- DIE REIHENFOLGE IST DIE UMGEKEHRTE DES NORMALFALLS (docs/db-regeln.md, "MIGRATION IMMER VOR
-- CODE-DEPLOY", Absatz "DIE ANDERE RICHTUNG"; Owner-Entscheidung P13.6-120 der Phase 13.6):
--   Code deployen -> pruefen (alles geht noch) -> DIESE Migration -> erneut pruefen.
-- Diese Migration ENTZIEHT Rechte. Vor dem neuen Code braeche sie den laufenden: der alte Code
-- schreibt published_content, tracking_key, ab_test_active und das domains-Label noch ueber
-- die Nutzer-Sitzung. Der neue Code kommt mit beiden Zustaenden aus.
--
-- GRANTOR-VORBEDINGUNG, PFLICHT VOR DEM EINSPIELEN: supabase/checks/spaltenrechte.sql, Block
-- "VOR DER MIGRATION" (Eigentuemer, Grantor, FORCE ROW LEVEL SECURITY, PUBLIC,
-- Mitgliedschaften). GRUND (docs/plattform-befunde.md, Supabase, Teil (be), Falle 1): "A user
-- can only revoke privileges that were granted directly by that user." Ein revoke eines
-- Nicht-Grantors entzieht nichts, und das ist die gefaehrlichste Form des Scheiterns, weil sie
-- still ist (Setzung P13.6-125 der Phase 13.6). Der Block am Ende dieser Datei bricht deshalb
-- ab, wenn die WIRKSAMEN Rechte danach nicht stimmen.
--
-- WAS SIE TUT (Setzungen P13.6-117 und P13.6-125 der Phase 13.6; hier nur benannt):
-- - projects: INSERT fuer anon und authenticated ganz entzogen, Policy projects_insert_own
--   geloescht. UPDATE fuer beide entzogen und fuer authenticated AUF GENAU SIEBEN SPALTEN neu
--   gewaehrt: name, html, mappings, settings, html_b, mappings_b, updated_at — die
--   client-eigenen (Vermerk P13.6-116, Punkt (1)) plus updated_at, das der Code in jedem
--   Update-Rumpf auf projects mitsendet (docs/plattform-befunde.md, Supabase, Teil (bf)).
--   DELETE und SELECT unveraendert.
-- - domains und project_tokens: INSERT, UPDATE, DELETE fuer anon und authenticated entzogen,
--   ihre Schreib-Policies geloescht (domains_insert_own, domains_update_own,
--   project_tokens_insert_own, project_tokens_update_own). SELECT unveraendert; die
--   Lesepolicy domains_select_own bleibt.
-- - KEIN Entzug von SELECT, nirgends. KEINE Aenderung an service_role — ueber sie schreibt der
--   Server (Admin-Client nach dem Eigentums-Gate).
-- - Das UPDATE-Recht auf Spalten geht allein an authenticated, nicht an anon: anon hat keine
--   Sitzung, und die Policy projects_update_own (auth.uid() = user_id) liess anon nie eine
--   Zeile schreiben.
--
-- DIE GELESENE DOKU (docs/db-regeln.md, vierte Regel):
-- - DATUM 2026-10-01: docs/plattform-befunde.md, Supabase, LAUF 5, Teile (bd) bis (bk) —
--   Tabellen-revoke VOR Spalten-grant, weil ein Tabellen-revoke die Spaltenrechte mitnimmt
--   und ein Spalten-revoke bei stehendem Tabellenrecht nichts bewirkt (be); der Grantor (be);
--   eine spaeter angelegte Spalte beginnt fuer anon/authenticated ohne Schreibrecht
--   (FOLGERUNG, be); postgres umgeht RLS und ist vom Entzug unberuehrt (bg); die Vorgabe vom
--   30.10.2026 beruehrt bestehende Tabellen nicht (bj).
-- - DATUM 2026-10-01, GELESEN (CC) in der Bau-Runde:
--   postgresql.org/docs/17/functions-info.html, Abschnitt 9.27.2 — has_column_privilege und
--   has_any_column_privilege "succeed[] either if the privilege is held for the whole table,
--   or if there is a column-level grant"; zu has_table_privilege sagt die Seite nur "Does user
--   have privilege for table?". · postgresql.org/docs/17/sql-droppolicy.html — "IF EXISTS: Do
--   not throw an error if the policy does not exist." · postgresql.org/docs/17/
--   protocol-flow.html, "Multiple Statements in a Simple Query" — ein BEGIN in einer
--   Nachricht beginnt einen Block, der nur mit COMMIT oder ROLLBACK endet; ein Fehler
--   davor laesst ihn als fehlgeschlagenen Block stehen, es wird NICHTS festgeschrieben.
-- FOLGE FUER DEN BAU: die Reihenfolge revoke -> grant unten; die Pruefung am Ende fragt die
-- Spalten- und "any column"-Fassung (deren Semantik gelesen ist) und has_table_privilege nur
-- fuer DELETE und SELECT, die es auf Spalten nicht gibt bzw. die nur als Tabellenrecht
-- bestanden; die Klammer begin/commit (s. unten).
--
-- DIE KLAMMER begin/commit — EINE ABWEICHUNG VON 0029/0030, UND SIE IST GEWOLLT: Dort fehlt
-- sie, weil nicht gemessen ist, ob der SQL-Editor das Skript in eine Transaktion klammert.
-- Hier haengt die Sicherheit an der Pruefung am Ende: Schlaegt sie fehl, darf KEIN Teil der
-- Rechte-Aenderung stehen bleiben. Mit ausdruecklichem begin gilt das nach der gelesenen
-- Protokoll-Seite gleich, wie der Editor sendet. NACH EINEM ABBRUCH IM EDITOR: "rollback;"
-- ausfuehren, falls die Sitzung im fehlgeschlagenen Block steht.
--
-- IDEMPOTENZ: revoke und grant sind wiederholbar, drop policy traegt "if exists", der
-- Protokoll-Eintrag "on conflict do nothing". Ein zweiter Lauf besteht dieselbe Pruefung.
--
-- lock_timeout: revoke/grant und drop policy nehmen Sperren auf Tabellen, die auf dem Pfad
-- jeder Auslieferung liegen. Ist eine Sperre nicht sofort zu bekommen, bricht die Migration ab,
-- statt eine Warteschlange zu bauen (Bauform aus 0025/0029/0030, hier als "set local" in der
-- Klammer).
--
-- PRUEFUNG NACH DEM EINSPIELEN: supabase/checks/spaltenrechte.sql, Block "NACH DER MIGRATION"
-- (nur lesend). Den PostgREST-Weg mit echter Sitzung prueft erst der Live-Test (Vermerk
-- P13.6-116, Punkt (5), der Phase 13.6) — eine Probe im SQL-Editor misst Postgres.

begin;

set local lock_timeout = '3s';

-- ===== projects ============================================================================
-- Erst das Tabellenrecht entziehen, DANN die Spalten gewaehren (Teil (be)).
revoke insert, update on table public.projects from anon, authenticated;
grant update (name, html, mappings, settings, html_b, mappings_b, updated_at)
  on table public.projects to authenticated;

drop policy if exists "projects_insert_own" on public.projects;

-- ===== domains =============================================================================
revoke insert, update, delete on table public.domains from anon, authenticated;

drop policy if exists "domains_insert_own" on public.domains;
drop policy if exists "domains_update_own" on public.domains;

-- ===== project_tokens ======================================================================
revoke insert, update, delete on table public.project_tokens from anon, authenticated;

drop policy if exists "project_tokens_insert_own" on public.project_tokens;
drop policy if exists "project_tokens_update_own" on public.project_tokens;

-- ===== DIE PRUEFUNG DER WIRKSAMEN RECHTE — SCHEITERT SIE, BLEIBT NICHTS STEHEN ==============
-- Sie fragt, was die Rolle HAT (auch ueber Mitgliedschaft oder PUBLIC), nicht, was diese Datei
-- getan hat. Ein revoke ohne Wirkung (falscher Grantor) laesst sie scheitern.
do $$
declare
  r text;
  t text;
  col record;
  client_cols constant text[] :=
    array['name', 'html', 'mappings', 'settings', 'html_b', 'mappings_b', 'updated_at'];
begin
  foreach r in array array['anon', 'authenticated'] loop
    -- projects: kein INSERT auf irgendeiner Spalte.
    if has_any_column_privilege(r, 'public.projects', 'INSERT') then
      raise exception '0031: % hat weiterhin INSERT auf public.projects', r;
    end if;
    -- projects: kein UPDATE auf einer server-eigenen Spalte.
    for col in
      select a.attname
      from pg_catalog.pg_attribute a
      where a.attrelid = 'public.projects'::regclass
        and a.attnum > 0
        and not a.attisdropped
        and not (a.attname::text = any (client_cols))
    loop
      if has_column_privilege(r, 'public.projects', col.attname::text, 'UPDATE') then
        raise exception '0031: % hat weiterhin UPDATE auf public.projects.%', r, col.attname;
      end if;
    end loop;
    -- domains und project_tokens: kein INSERT, kein UPDATE, kein DELETE.
    foreach t in array array['public.domains', 'public.project_tokens'] loop
      if has_any_column_privilege(r, t, 'INSERT')
         or has_any_column_privilege(r, t, 'UPDATE')
         or has_table_privilege(r, t, 'DELETE') then
        raise exception '0031: % hat weiterhin ein Schreibrecht auf %', r, t;
      end if;
    end loop;
    -- SELECT ist auf keiner der drei Tabellen entzogen (POSITIVKONTROLLE).
    foreach t in array array['public.projects', 'public.domains', 'public.project_tokens'] loop
      if not has_table_privilege(r, t, 'SELECT') then
        raise exception '0031: % hat kein SELECT mehr auf %', r, t;
      end if;
    end loop;
  end loop;

  -- anon bekommt kein UPDATE auf projects, auch nicht auf client-eigenen Spalten.
  if has_any_column_privilege('anon', 'public.projects', 'UPDATE') then
    raise exception '0031: anon hat weiterhin UPDATE auf public.projects';
  end if;

  -- POSITIVKONTROLLE: authenticated behaelt UPDATE auf genau den sieben Spalten und DELETE.
  foreach t in array client_cols loop
    if not has_column_privilege('authenticated', 'public.projects', t, 'UPDATE') then
      raise exception '0031: authenticated fehlt UPDATE auf public.projects.%', t;
    end if;
  end loop;
  if not has_table_privilege('authenticated', 'public.projects', 'DELETE') then
    raise exception '0031: authenticated fehlt DELETE auf public.projects';
  end if;

  -- POSITIVKONTROLLE: Der Server-Weg (service_role) schreibt weiter.
  foreach t in array array['public.projects', 'public.domains', 'public.project_tokens'] loop
    if not (has_table_privilege('service_role', t, 'INSERT')
            and has_table_privilege('service_role', t, 'UPDATE')
            and has_table_privilege('service_role', t, 'DELETE')) then
      raise exception '0031: service_role fehlt ein Schreibrecht auf %', t;
    end if;
  end loop;

  -- Die fuenf Schreib-Policies sind weg; die bleibenden stehen.
  if exists (
    select 1 from pg_catalog.pg_policies
    where schemaname = 'public'
      and policyname in ('projects_insert_own', 'domains_insert_own', 'domains_update_own',
                         'project_tokens_insert_own', 'project_tokens_update_own')
  ) then
    raise exception '0031: eine zu loeschende Schreib-Policy steht noch';
  end if;
  if (select count(*) from pg_catalog.pg_policies
      where schemaname = 'public'
        and policyname in ('projects_select_own', 'projects_update_own',
                           'projects_delete_own', 'domains_select_own')) <> 4 then
    raise exception '0031: eine bleibende Policy fehlt';
  end if;
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung vor dem commit (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf.
insert into public.schema_migrations (version, filename, applied_at)
values ('0031', '0031_spaltenrechte.sql', now())
on conflict (version) do nothing;

commit;
