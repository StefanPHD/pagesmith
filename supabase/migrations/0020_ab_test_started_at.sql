-- Phase 9 Scheibe 9c-2 — Lauf-Abgrenzung: Zeitstempel beim Teststart + Zeitfilter.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
--
-- REIHENFOLGE IN DIESER DATEI IST ZWINGEND: erst die SPALTE, dann die FUNKTION. Der
-- Funktionskoerper referenziert projects.ab_test_started_at; stuende er zuerst, schluege
-- "create or replace function" fehl (Spalte unbekannt), die Migration braeche mittendrin ab
-- — und der Protokoll-Eintrag am Ende entstuende korrekterweise NICHT.
--
-- FAIL-SAFE-FENSTER (K8): zwischen dieser Migration und dem Code-Deploy ist die Spalte
-- UEBERALL NULL. Der Filter unten degradiert dann auf "alle Zeilen mit Variante", die
-- Funktion verhaelt sich also exakt wie ihre 9c-1-Fassung. Das Fenster ist nicht nur kurz,
-- es ist wirkungslos.
--
-- ZWEI UHREN — BENANNT, NICHT WEGGEBAUT: ab_test_started_at entsteht auf dem APP-Server
-- (ISO-String der Aktivierungs-Action), events.created_at per DB-now() auf der DB. Der
-- Filter vergleicht also ueber MASCHINENGRENZEN.
--   EINORDNUNG: Zwischen Aktivierungs-Write und erstem PageView liegen eine Netzwerkrunde
--   plus eine menschliche Handlung, also SEKUNDEN; ein Millisekunden-Versatz verschwindet
--   darin. Geht die App-Uhr nach, rutscht hoechstens ein Grenzereignis der Vorperiode
--   herein; geht sie vor, fehlt ein Ereignis der ersten Millisekunden. Dieselbe Klasse wie
--   der inklusive Rand unten — und dort bereits zugunsten "lieber eins zu viel" entschieden.
--   BEWUSST KEIN UMBAU: kein DB-seitiges now() in der Action, kein RPC-Umweg fuer den
--   Schreibpfad. Die Kopplung waere teurer als das Risiko.

-- (1) LAUF-BEGINN. Nullable, additiv, KEIN CHECK, KEIN Backfill, KEIN DEFAULT, KEIN Index.
--
--     KEIN CHECK "aktiv impliziert Zeitstempel gesetzt", obwohl das die etablierte Denkfigur
--     der Phase waere (projects_variant_b_pair, projects_ab_test_needs_variant_b): er zwaenge
--     einen BACKFILL fuer die bereits aktive Zeile, und ein gerateter Zeitwert in einer
--     PERMANENTEN Spalte ist genau das, was 9b-2 beim Backfill abgelehnt hat. NULL degradiert
--     stattdessen sauber auf "alle Zeilen mit Variante".
--
--     KEIN Index: die Spalte wird pro Auswertung EINMAL gelesen (ein Zeilen-Lookup ueber den
--     Primaerschluessel), nie gefiltert oder sortiert. Falls es je langsam wird: MESSEN.
alter table public.projects
  add column if not exists ab_test_started_at timestamptz;

-- (2) DIE 9c-1-FUNKTION, ERSETZT — Signatur, RETURNS TABLE, language, volatility und
--     search_path BYTE-GLEICH. Neu ist ausschliesslich der Zeitfilter.
--
--     "create or replace" ist hier zulaessig, WEIL der Rueckgabetyp unveraendert bleibt.
--     Waere er es nicht, verlangte Postgres ein drop + create — also ein Fenster, in dem die
--     LIVE gelesene Funktion nicht existiert. Genau daran haengt die 9c-1-Entscheidung
--     "neue RPC statt Erweiterung"; hier faellt der Grund nicht an.
--
--     EINPARAMETRIG (K10): der Zeitstempel wird DB-seitig im Koerper gelesen, NIE vom Client
--     gereicht. Ein zweiter Parameter waere der stille Uebergang zu "der Aufrufer bestimmt
--     das Fenster" — und damit eine Stelle, an der ein manipulierter Client sich sein eigenes
--     Fenster aussuchen koennte.
--
--     SECURITY INVOKER (Default, BEWUSST KEIN security definer): der Koerper liest jetzt
--     ZWEI Tabellen, und fuer BEIDE gilt die RLS des Aufrufers — events ueber
--     events_select_own (0013), projects ueber projects_select_own (0001). Ein Nicht-Owner
--     sieht die Projektzeile nicht -> "at" ist NULL -> der Zeitfilter degradiert; die Zeilen
--     filtert events_select_own ohnehin weg. Kein Leak, unabhaengig vom Filter. Als DEFINER
--     liefe beides mit Owner-Rechten und lieferte Zahlen ueber ALLE Tenants.
create or replace function public.get_variant_counts(p_project_id uuid)
  returns table (
    event_type text,
    count_a    bigint,
    count_b    bigint,
    count_none bigint
  )
  language sql
  stable
  set search_path = public
as $$
  -- LAUF-BEGINN als CTE (Muster aus 0015): EIN Lookup, im Filter zweimal referenziert.
  with run as (
    select p.ab_test_started_at as at
    from public.projects p
    where p.id = p_project_id
  )
  select
    e.event_type,
    count(*) filter (where e.variant = 'a')::bigint    as count_a,
    count(*) filter (where e.variant = 'b')::bigint    as count_b,
    -- Zeilen OHNE Zuordnung bleiben mitgezaehlt (9c-1). NEU IN 9c-2: durch den Zeitfilter
    -- fallen die Altzeilen aus der Zeit VOR dem Lauf heraus — erst dadurch wird diese Zahl
    -- zu einem brauchbaren Messverlust-Signal statt zu einem Bestandsdaten-Zaehler.
    count(*) filter (where e.variant is null)::bigint  as count_none
  from public.events e
  where e.project_id = p_project_id
    -- WOERTLICH aus get_event_counts (0014) uebernommen, unveraendert gegenueber 9c-1.
    and e.source = 'server'
    -- ZEITFILTER. Zwei Eigenschaften, beide bewusst:
    --  (a) "at is null" ZUERST: ohne diesen Zweig waere der Vergleich gegen NULL selbst NULL,
    --      es passierte KEINE Zeile, und ein Projekt ohne protokollierten Start zeigte
    --      ploetzlich nichts mehr. Das ist der Legacy-Fall (Lauf vor 9c-2) und der Zustand
    --      zwischen Migration und Deploy — beide muessen auf "alle Zeilen" degradieren (K3).
    --  (b) RAND EINGESCHLOSSEN (>=): der Zeitstempel entsteht im Moment des
    --      Aktivierungs-Writes; die erste ausgelieferte Antwort und ihr PageView folgen
    --      strikt danach. Ein exklusiver Vergleich verloere ein Ereignis, das in derselben
    --      Millisekunde geschrieben wird — und das ERSTE Ereignis eines Laufs ist der
    --      teuerste Verlust. Inklusiv riskiert hoechstens EIN Grenzereignis der Vorperiode.
    and ((select at from run) is null or e.created_at >= (select at from run))
  group by e.event_type
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei erfolgreichem
-- Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die einen nie vollzogenen
-- Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0020', '0020_ab_test_started_at.sql', now())
on conflict (version) do nothing;
