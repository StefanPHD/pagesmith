-- Schritt 3.2 — Datenmodell + Projekt speichern/laden.
-- Manuell im Supabase-SQL-Editor ausfuehren. service_role kommt NIRGENDS vor;
-- der Zugriff laeuft ausschliesslich ueber anon-Key + RLS + Server-Session.

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  name text not null default 'Mein Projekt',
  html text not null default '',
  -- mappings JETZT schon mappings-faehig designt, in 3.2 aber leer (befuellt
  -- wird erst, sobald die Action-Zuweisungs-UI existiert).
  mappings jsonb not null default '[]',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  -- BEWUSSTE 3.2-Vereinfachung: ein Projekt pro User. Macht Speichern zum
  -- Upsert (on conflict user_id). 3.3 entfernt diese Constraint wieder
  -- (dann mehrere Projekte pro User). Kein Versehen.
  constraint projects_user_id_key unique (user_id)
);

-- RLS wird mit der Tabelle ZUSAMMEN aktiviert, nie "spaeter".
alter table public.projects enable row level security;

-- Vier Policies, alle auf auth.uid() = user_id. WITH CHECK bei INSERT UND UPDATE
-- ist Pflicht (Upsert trifft beide), sonst koennte ein User eine fremde user_id
-- reinschreiben.
create policy "projects_select_own" on public.projects
  for select using (auth.uid() = user_id);

create policy "projects_insert_own" on public.projects
  for insert with check (auth.uid() = user_id);

create policy "projects_update_own" on public.projects
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "projects_delete_own" on public.projects
  for delete using (auth.uid() = user_id);

-- Haelt updated_at bei jedem UPDATE aktuell, ohne dass der Client es mitsenden muss.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger projects_set_updated_at
  before update on public.projects
  for each row
  execute function public.set_updated_at();
