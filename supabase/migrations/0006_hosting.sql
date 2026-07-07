-- Phase 7 Scheibe 7a — Hosting: publizierte Projekte unter *.pgsm.site servieren.
-- Manuell im Supabase-SQL-Editor ausfuehren. Additiv, nicht-destruktiv: kein DROP,
-- kein Daten-Touch, bestehende projects-Policies unangetastet.
--
-- Charakterwechsel: Pagesmith wird HOST — eine gehostete Seite ist unter einer
-- eigenen Subdomain (label.pgsm.site) als echte funktionale Seite erreichbar. Die
-- Serve-Route loest label -> project_id -> published_content anonym via service_role
-- auf (Serving hat keine Owner-Session).

-- domains: label ist zugleich PK (global eindeutig) UND der Lookup-Key beim Serving.
create table if not exists public.domains (
  label text primary key,
  -- on delete cascade: Projekt-Delete raeumt die domains-Zeile mit ab.
  project_id uuid not null references public.projects (id) on delete cascade,
  created_at timestamptz not null default now()
);

-- Reverse-Lookup / Cascade-Effizienz.
create index if not exists domains_project_id_idx on public.domains (project_id);

-- RLS wird mit der Tabelle ZUSAMMEN aktiviert, nie "spaeter".
alter table public.domains enable row level security;

-- OWNER-SCOPED (bewusst NICHT total gesperrt wie project_tokens): Labels sind
-- OEFFENTLICHE URLs, kein Secret. Ownership laeuft ueber das Projekt (Subquery auf
-- projects). KEINE anon-Policy -> anon kann NICHT enumerieren; der anonyme
-- Serving-Read laeuft ausschliesslich ueber service_role (bypassed RLS).
--
-- Unterschied zu project_tokens (2a): weil der Owner ein legitimes SELECT hat, gibt
-- es KEINE write-only-SELECT-Sperre und damit NICHT die 2a-"RETURNING-Read-back
-- scheitert"-Falle -> der Publish-Write laeuft ueber den authenticated-Client
-- (service_role nur beim Serving-Read). Mehr DB-Defense, kein App-only-Gate.
create policy "domains_select_own" on public.domains
  for select using (
    exists (
      select 1 from public.projects p
      where p.id = domains.project_id and p.user_id = auth.uid()
    )
  );

create policy "domains_insert_own" on public.domains
  for insert with check (
    exists (
      select 1 from public.projects p
      where p.id = domains.project_id and p.user_id = auth.uid()
    )
  );

create policy "domains_update_own" on public.domains
  for update using (
    exists (
      select 1 from public.projects p
      where p.id = domains.project_id and p.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from public.projects p
      where p.id = domains.project_id and p.user_id = auth.uid()
    )
  );

-- Kein DELETE-Policy noetig: Cleanup laeuft ueber on delete cascade (Projekt-Delete).

-- published_content: das beim Publish CLIENT-generierte funktionale HTML + Snapshot
-- ({ html, mappings, settings, publishedAt }). null = noch nie publiziert.
-- Auf der bereits RLS-geschuetzten projects-Zeile -> bestehende Policies decken sie,
-- keine neue Policy noetig.
alter table public.projects
  add column if not exists published_content jsonb default null;
