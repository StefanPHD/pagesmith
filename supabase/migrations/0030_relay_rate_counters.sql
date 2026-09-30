-- Phase 13.6, Scheibe 13.6-5 — DER ZAEHLER DER RATENBEGRENZUNG AM FORMULAR-RELAY.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (docs/db-regeln.md,
-- "MIGRATION IMMER VOR CODE-DEPLOY").
--
-- WAS SIE TUT: eine Tabelle relay_rate_counters (EINE Zeile je Projekt) und eine RPC
-- relay_rate_hit, die den Zaehler des Projekts atomar erhoeht und den neuen Stand
-- zurueckgibt. Sonst NICHTS. Die Grenze (120 je 60 s) und das Urteil stehen im Code
-- (src/lib/relay/rate-limit.ts), nicht hier.
--
-- DIE ENTSCHEIDUNGEN, AUF DENEN SIE RUHT (Standdatei der Phase 13.6, Abschnitt "Zuschnitt
-- Scheibe 13.6-5"; hier nur benannt, nicht verdoppelt):
-- - Setzung P13.6-75, E1: eine Zeile je Projekt, atomar per insert ... on conflict do
--   update ... returning. AUFLAGE: Das Fenster laeuft nur VORWAERTS.
-- - Setzung P13.6-75, E12: die Tabelle ist relay-eigen.
-- - Setzung P13.6-77: SECURITY INVOKER, kein Zusatz-Index, kein Aufraeumen.
-- - Owner-Entscheidung P13.6-76: set search_path = '' und ein voll qualifizierter Rumpf
--   (docs/db-regeln.md, "DB-FUNKTIONEN + SEARCH_PATH").
-- - Setzung P13.6-74, I3: KEINE IP, KEIN User-Agent, KEIN Host, KEIN Formularinhalt — die
--   Tabelle traegt genau drei Spalten.
--
-- DIE GELESENE DOKU (docs/db-regeln.md, vierte Regel) — DATUM 2026-09-30:
-- - docs/plattform-befunde.md, Supabase, Teile (ax) bis (bb): eine neue Funktion in public
--   ist per Vorgabe fuer PUBLIC, anon, authenticated ausfuehrbar, der Entzug traegt nur je
--   Funktion (ax) · ab dem 30.10.2026 braucht auch service_role ein ausdrueckliches GRANT
--   auf neue Tabellen (ay) · on conflict do update verlangt INSERT, UPDATE und SELECT (ba)
--   · now() ist der Beginn der Transaktion (bb).
-- - postgresql.org/docs/17/runtime-config-client.html, search_path: pg_catalog wird immer
--   durchsucht, vor den Eintraegen des Pfads, wenn er dort nicht steht.
-- - postgresql.org/docs/17/functions-datetime.html: date_bin(interval, timestamp,
--   timestamp) "come in two variants", auch mit Zeitzone; make_interval(..., secs double
--   precision).
-- FOLGE FUER DEN BAU: die ausdruecklichen revoke/grant unten; jeder Name ausserhalb von
-- pg_catalog ist mit public. qualifiziert, die Funktionen aus pg_catalog zusaetzlich mit
-- pg_catalog. — ohne Pfad gibt es keine zweite Aufloesung.
--
-- ---------------------------------------------------------------------------
-- DAS FENSTER LAEUFT NIE RUECKWAERTS (E1) — die drei Faelle der Erhoehung:
--   gleiches Fenster  -> hits + 1
--   NEUERES Fenster   -> neu bei 1, window_start = das neue Fenster
--   AELTERES Fenster  -> hits + 1 auf den LAUFENDEN Zaehler, window_start bleibt
-- Der dritte Fall ist die spaete Transaktion: now() ist ihr Beginn (Teil (bb)). Schreibt
-- eine Anfrage aus Fenster T nach einer aus Fenster T+1 fest, setzte ein blosses
-- "window_start = excluded.window_start" den Fensterbeginn zurueck. Beides entscheidet
-- derselbe Vergleich "excluded.window_start > c.window_start".
-- NEBENLAEUFIGKEIT: Zwei gleichzeitige Aufrufe ergeben je eine Einfuegung oder eine
-- Aktualisierung; der zweite arbeitet auf der festgeschriebenen Fassung des ersten
-- (Teil (ba), GELESEN, nicht gemessen).
--
-- DER URSPRUNG DES FENSTERS: 2001-01-01 00:00:00+00, das Beispiel der Postgres-Doku.
-- Fenster von 60 s beginnen damit auf der vollen Minute (UTC). Die Laenge kommt als
-- Argument vom Code (RELAY_RATE_WINDOW_SECONDS); eine Laenge von null oder kleiner als
-- eins laesst die Anweisung scheitern — der Code wertet das als Ausfall des Zaehlers.
--
-- ---------------------------------------------------------------------------
-- RECHTE:
-- - Tabelle: RLS aktiv, KEINE Policy (Dauerregel "GRANTS SCHUETZEN NICHTS — RLS IST DIE
--   EINZIGE TRAGENDE SCHICHT"). anon und authenticated verlieren jedes Recht; service_role
--   bekommt select, insert, update ausdruecklich. Die uebrigen Vorgabe-Rechte von
--   service_role werden NICHT entzogen — die Entscheidung nennt nur das GRANT.
-- - Funktion: EXECUTE entzogen fuer public, anon, authenticated (je Funktion, Teil (ax)),
--   gewaehrt fuer service_role. Einziger Aufrufer ist der Admin-Client.
-- - SECURITY INVOKER: service_role traegt bypassrls (Teil (n)). Stuende EXECUTE doch
--   einmal einer anderen Rolle offen, hielte die RLS ohne Policy die Schreibung auf.
--
-- KEIN INDEX ausser dem Primaerschluessel: er traegt den Konflikt-Arbiter und jeden
-- Zugriff (Setzung P13.6-77). KEIN AUFRAEUMEN: eine Zeile je Projekt, geloescht per
-- Kaskade mit dem Projekt.
--
-- IDEMPOTENZ: create table if not exists, create or replace function, revoke/grant sind
-- wiederholbar. Der Guard auf den Tabellennamen prueft den NAMEN, nicht die FORM — die
-- Probe supabase/checks/relay-rate-counters.sql liest deshalb die Spalten ab.
-- KEINE KLAMMER begin/commit: Ob der SQL-Editor das Skript in eine Transaktion klammert, ist
-- NICHT gemessen (Kopf von 0029). Zwischen create function und revoke waere die Funktion
-- kurz fuer anon ausfuehrbar; unter RLS ohne Policy scheiterte jede Schreibung dort
-- (INVOKER).
--
-- lock_timeout: Der Fremdschluessel nimmt eine Sperre auf public.projects, und die liegt
-- auf dem Pfad jeder Auslieferung. Ist sie nicht sofort zu bekommen, bricht die Migration
-- ab, statt eine Warteschlange zu bauen (Bauform aus 0025/0029).
--
-- PRUEFUNG NACH DEM EINSPIELEN: supabase/checks/relay-rate-counters.sql (nur lesend).
-- Die WIRKUNG der Fenster-Logik zeigt erst der Live-Test; sie schreibt in eine bestehende
-- Tabelle und passt in keine der zwei Bauformen aus supabase/checks/README.md.

set lock_timeout = '3s';

create table if not exists public.relay_rate_counters (
  project_id   uuid        primary key references public.projects (id) on delete cascade,
  window_start timestamptz not null,
  hits         integer     not null,
  constraint relay_rate_counters_hits_positive check (hits >= 1)
);

alter table public.relay_rate_counters enable row level security;

revoke all on table public.relay_rate_counters from anon, authenticated;
grant select, insert, update on table public.relay_rate_counters to service_role;

create or replace function public.relay_rate_hit(p_project_id uuid, p_window_seconds integer)
  returns integer
  language sql
  volatile
  security invoker
  set search_path = ''
as $$
  insert into public.relay_rate_counters as c (project_id, window_start, hits)
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

revoke execute on function public.relay_rate_hit(uuid, integer) from public, anon, authenticated;
grant execute on function public.relay_rate_hit(uuid, integer) to service_role;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei erfolgreichem
-- Durchlauf.
insert into public.schema_migrations (version, filename, applied_at)
values ('0030', '0030_relay_rate_counters.sql', now())
on conflict (version) do nothing;
