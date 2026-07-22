-- Phase 8 Scheibe 3 — Read-Pfad-Fundament: der Owner sieht seine Analytics.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed: erst die
-- Policy + Funktion, dann der Leser, der sie nutzt).
--
-- Additiv, nicht-destruktiv: eine SELECT-Policy + eine STABLE-Read-Funktion. KEIN Touch
-- am Schreibpfad (INSERT bleibt ohne Policy -> ausschliesslich service_role, Ingest
-- unberuehrt).

-- (1) Owner-SELECT-Policy — die ERSTE Policy auf events. Loest die "RLS an, keine Policy
--     (transient)"-Notiz aus Scheibe 1 auf. NUR FOR SELECT; es gibt bewusst KEINE
--     INSERT/UPDATE/DELETE-Policy, damit Schreiben ausschliesslich ueber service_role
--     (Ingest) laeuft und der Owner NIE schreibt.
--
--     Ownership 1:1 aus projects_select_own (0001) gespiegelt: projects.user_id =
--     auth.uid(). events traegt selbst kein user_id -> die Ownership kann strukturell nur
--     ueber projects laufen. EXISTS statt IN: korrelierter Semi-Join gegen den
--     events_project_id_idx (Scheibe 1), kurzschliessend. (select auth.uid()) gekapselt
--     -> Postgres wertet es EINMAL statt pro Zeile aus.
create policy "events_select_own" on public.events
  for select
  using (
    exists (
      select 1
      from public.projects p
      where p.id = events.project_id
        and p.user_id = (select auth.uid())
    )
  );

-- (2) Gruppierte Counts je event_type fuer EIN Projekt. SECURITY INVOKER (Default,
--     BEWUSST NICHT security definer): die RLS des Aufrufers auf events greift IM
--     Funktionskoerper -> ein Nicht-Owner bekommt NICHTS (die events_select_own-Policy
--     filtert die Aggregation von innen). stable (nur lesend). GROUP BY nutzt den
--     project_id-Index. project_id-Filter im Body = expliziter Scope (WELCHES Projekt);
--     die Ownership (WESSEN Events) kommt aus der aktiven RLS-Policy.
create or replace function public.get_event_counts(p_project_id uuid)
  returns table (event_type text, count bigint)
  language sql
  stable
as $$
  select e.event_type, count(*)::bigint as count
  from public.events e
  where e.project_id = p_project_id
  group by e.event_type
$$;
