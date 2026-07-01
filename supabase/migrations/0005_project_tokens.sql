-- Phase 6 Scheibe 2a — Secret-Plumbing: geheimer CAPI-Token pro Projekt.
-- Manuell im Supabase-SQL-Editor ausfuehren. Additiv, nicht-destruktiv: kein DROP,
-- kein Daten-Touch, bestehende projects-Policies unangetastet.
--
-- Charakterwechsel ggue. allem bisher: der CAPI-Token ist GEHEIM (anders als die
-- oeffentliche Meta-Pixel-ID). Er lebt server-only und erreicht den Client NIE.
-- Tragende Kontrolle = ISOLATION: eigene Tabelle + RLS-SELECT-SPERRE (kein SELECT
-- fuer anon/authenticated). Der privilegierte Read laeuft ausschliesslich ueber
-- service_role (bypassed RLS by default) im server-only Read-Pfad (Scheibe 2b).

create table if not exists public.project_tokens (
  -- project_id ist zugleich PK -> genau EIN Token-Row pro Projekt (Upsert on
  -- conflict project_id). on delete cascade: Projekt-Delete loescht die Token-Zeile.
  project_id uuid primary key references public.projects (id) on delete cascade,
  -- user_id fuer die RLS-WITH-CHECK-Ownership (auth.uid() = user_id) beim Schreiben.
  user_id uuid not null references auth.users (id) on delete cascade,
  -- HAERTUNGS-NOTIZ: vorerst PLAINTEXT. Die tragende Kontrolle ist die ISOLATION
  -- (separate Tabelle + RLS-SELECT-Sperre), NICHT Verschluesselung. Verschluesselung
  -- at rest (pgcrypto / KMS-Envelope) ist ein spaeterer Haertungsschritt.
  meta_capi_token text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- RLS wird mit der Tabelle ZUSAMMEN aktiviert, nie "spaeter".
alter table public.project_tokens enable row level security;

-- KRITISCH: KEINE SELECT-Policy fuer anon/authenticated. Ohne SELECT-Policy ist die
-- Tabelle unter RLS fuer diese Rollen NICHT lesbar -> der Token ist per Session/Anon
-- nie abfragbar (auch nicht vom Owner selbst). service_role bypassed RLS und ist der
-- einzige Read-Pfad (Scheibe 2b). Write-only ist Absicht, kein Versehen.

-- INSERT + UPDATE mit WITH CHECK (auth.uid() = user_id) -> der Owner schreibt nur die
-- eigene Zeile (Upsert trifft insert UND update, darum BEIDE Policies noetig).
-- ACHTUNG: WITH CHECK prueft NUR user_id, NICHT dass project_id dem User gehoert.
-- Die Ownership des Projekts wird zusaetzlich in der Server-Action explizit geprueft
-- (IDOR-Schutz gegen "fremde project_id mit eigener user_id").
create policy "project_tokens_insert_own" on public.project_tokens
  for insert with check (auth.uid() = user_id);

create policy "project_tokens_update_own" on public.project_tokens
  for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- Kein DELETE-Policy noetig: Cleanup laeuft ueber on delete cascade (Projekt-Delete).

-- updated_at bei jedem UPDATE aktuell halten. Wiederverwendung von set_updated_at()
-- (aus 0001, in 0003 gegen search-path-Hijacking gehaertet).
create trigger project_tokens_set_updated_at
  before update on public.project_tokens
  for each row
  execute function public.set_updated_at();
