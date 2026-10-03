-- Phase 13.7, Scheibe K1b — DER ZAEHLER DER WEITERLEITUNGEN JE PROJEKT IM INGEST.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (docs/db-regeln.md,
-- "MIGRATION IMMER VOR CODE-DEPLOY"; additiv — ohne den Code wirkungslos).
--
-- WAS SIE TUT: eine Tabelle ingest_forward_counters (EINE Zeile je Projekt) und eine RPC
-- ingest_forward_hit, die den Zaehler des Projekts atomar erhoeht und den neuen Stand
-- zurueckgibt. Sonst NICHTS. Die Grenze (600 je 60 s), das Urteil und die Logzeile stehen im
-- Code (src/lib/capi/forward-limit.ts, src/lib/capi/ingest.ts), nicht hier.
--
-- DIE ENTSCHEIDUNGEN, AUF DENEN SIE RUHT (Standdatei der Phase 13.7, Zuschnitt P13.7-60, und
-- die Entscheidungen zum Plan, ARCHITEKT 2026-10-03; hier nur benannt):
-- - Zuschnitt (c): eine EIGENE Tabelle nach dem Muster der Migration 0030, nicht
--   relay_rate_counters.
-- - D5: Variante K-ue1 — genau drei Spalten wie 0030; KEINE Ueberlauf-Spalten.
-- - Muster 0030: eine Zeile je Projekt, atomar per insert ... on conflict do update ...
--   returning; das Fenster laeuft nur VORWAERTS; SECURITY INVOKER; set search_path = '' und ein
--   voll qualifizierter Rumpf (docs/db-regeln.md, "DB-FUNKTIONEN + SEARCH_PATH").
-- - KEINE IP, KEIN User-Agent, KEINE Seitenadresse, KEIN Ereignisname — die Tabelle traegt
--   genau drei Spalten.
--
-- DIE GELESENE DOKU (docs/db-regeln.md, vierte Regel) — DATUM 2026-10-03:
-- - supabase.com/docs/guides/database/functions, "Security definer vs invoker" und "Function
--   privileges": "By default, any role can run a database function"; der Entzug "from both
--   public and the role you're restricting".
-- - supabase.com/changelog/45329 (Breaking Change: Tables not exposed ...): ab dem 30.10.2026
--   braucht eine NEUE Tabelle in public ein ausdrueckliches Grant, auch fuer service_role;
--   "Existing tables are not affected".
-- - Unveraendert gelesen 2026-09-30 (docs/plattform-befunde.md, Supabase, Teile (ax) bis
--   (bb)): on conflict do update verlangt INSERT, UPDATE und SELECT; now() ist der Beginn der
--   Transaktion; date_bin ab PostgreSQL 14.
-- FOLGE FUER DEN BAU: keine Abweichung von 0030 — die ausdruecklichen revoke/grant unten;
-- jeder Name ausserhalb von pg_catalog ist mit public. qualifiziert, die Funktionen aus
-- pg_catalog zusaetzlich mit pg_catalog.
--
-- ---------------------------------------------------------------------------
-- DAS FENSTER LAEUFT NIE RUECKWAERTS — die drei Faelle der Erhoehung (wie 0030):
--   gleiches Fenster  -> hits + 1
--   NEUERES Fenster   -> neu bei 1, window_start = das neue Fenster
--   AELTERES Fenster  -> hits + 1 auf den LAUFENDEN Zaehler, window_start bleibt
-- NEBENLAEUFIGKEIT: Zwei gleichzeitige Aufrufe ergeben je eine Einfuegung oder eine
-- Aktualisierung; der zweite arbeitet auf der festgeschriebenen Fassung des ersten
-- (docs/plattform-befunde.md, Supabase, Teil (ba), GELESEN, nicht gemessen). Daraus folgt, dass
-- jeder Wert von hits je Fenster hoechstens EINMAL zurueckgegeben wird — darauf ruht die eine
-- Logzeile beim Wert GRENZE + 1 im Code (ABGELEITET).
--
-- DER URSPRUNG DES FENSTERS: 2001-01-01 00:00:00+00 (wie 0030). Fenster von 60 s beginnen auf
-- der vollen Minute (UTC). Die Laenge kommt als Argument vom Code
-- (INGEST_FORWARD_WINDOW_SECONDS).
--
-- ---------------------------------------------------------------------------
-- RECHTE:
-- - Tabelle: RLS aktiv, KEINE Policy (Dauerregel "GRANTS SCHUETZEN NICHTS — RLS IST DIE
--   EINZIGE TRAGENDE SCHICHT"). anon und authenticated verlieren jedes Recht; service_role
--   bekommt select, insert, update ausdruecklich — vor dem 30.10.2026 schadet es nicht, danach
--   ist es das einzige Grant. Die uebrigen Vorgabe-Rechte von service_role werden wie in 0030
--   NICHT entzogen.
-- - Funktion: EXECUTE entzogen fuer public, anon, authenticated (je Funktion), gewaehrt fuer
--   service_role. Einziger Aufrufer ist der Admin-Client (countForwardHit).
-- - SECURITY INVOKER: service_role traegt bypassrls (Teil (n)). Stuende EXECUTE doch einmal
--   einer anderen Rolle offen, hielte die RLS ohne Policy die Schreibung auf.
--
-- KEIN INDEX ausser dem Primaerschluessel: er traegt den Konflikt-Arbiter und jeden Zugriff.
-- KEIN AUFRAEUMEN: eine Zeile je Projekt, geloescht per Kaskade mit dem Projekt.
--
-- IDEMPOTENZ: create table if not exists, create or replace function, revoke/grant sind
-- wiederholbar. Der Guard auf den Tabellennamen prueft den NAMEN, nicht die FORM — die Probe
-- supabase/checks/ingest-forward-counters.sql liest deshalb die Spalten ab.
-- KEINE KLAMMER begin/commit (wie 0030): Zwischen create function und revoke waere die Funktion
-- kurz fuer anon ausfuehrbar; unter RLS ohne Policy scheiterte jede Schreibung dort (INVOKER).
--
-- lock_timeout: Der Fremdschluessel nimmt eine Sperre auf public.projects, und die liegt auf
-- dem Pfad jeder Auslieferung. Ist sie nicht sofort zu bekommen, bricht die Migration ab.
--
-- PRUEFUNG NACH DEM EINSPIELEN: supabase/checks/ingest-forward-counters.sql (ausschliesslich
-- lesend).

set lock_timeout = '3s';

create table if not exists public.ingest_forward_counters (
  project_id   uuid        primary key references public.projects (id) on delete cascade,
  window_start timestamptz not null,
  hits         integer     not null,
  constraint ingest_forward_counters_hits_positive check (hits >= 1)
);

alter table public.ingest_forward_counters enable row level security;

revoke all on table public.ingest_forward_counters from anon, authenticated;
grant select, insert, update on table public.ingest_forward_counters to service_role;

create or replace function public.ingest_forward_hit(p_project_id uuid, p_window_seconds integer)
  returns integer
  language sql
  volatile
  security invoker
  set search_path = ''
as $$
  insert into public.ingest_forward_counters as c (project_id, window_start, hits)
  values (
    p_project_id,
    pg_catalog.date_bin(
      pg_catalog.make_interval(secs => p_window_seconds),
      pg_catalog.now(),
      timestamptz '2001-01-01 00:00:00+00'
    ),
    1
  )
  on conflict (project_id) do update
    set window_start = case
          when excluded.window_start > c.window_start then excluded.window_start
          else c.window_start
        end,
        hits = case
          when excluded.window_start > c.window_start then 1
          else c.hits + 1
        end
  returning hits
$$;

revoke execute on function public.ingest_forward_hit(uuid, integer) from public, anon, authenticated;
grant execute on function public.ingest_forward_hit(uuid, integer) to service_role;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei erfolgreichem
-- Durchlauf.
insert into public.schema_migrations (version, filename, applied_at)
values ('0032', '0032_ingest_forward_counters.sql', now())
on conflict (version) do nothing;
