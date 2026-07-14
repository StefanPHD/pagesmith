-- Security-Manifest Tier 0 — Kill-Switch: ein gesperrtes Projekt wird SOFORT nicht mehr
-- ausgeliefert (Serve-Route 451) und seine Tracking-Events werden verworfen (Ingest-Stop)
-- — per einzelnem SQL-Update, ohne Deploy. Der Wert liegt in der Reaktionszeit
-- (Abuse-Meldung -> Seite in Sekunden dunkel). Manuell im Supabase-SQL-Editor ausfuehren.
-- Additiv, nicht-destruktiv: kein DROP, kein Daten-Touch bestehender Zeilen, RLS/Policies
-- aus 0001/0006/0007 unangetastet (nullable Spalten auf bereits RLS-geschuetzten Tabellen).
--
-- SPERR-SEMANTIK: PRIMAER wird das PROJEKT gesperrt (projects.blocked_at), nicht die
-- Domain. Ein Projekt kann MEHRERE Auslieferungswege haben (label.publayer.net UND ab
-- 7c-2b eine Custom-Domain) -> nur die Domain zu sperren, ueber die die Beschwerde kam,
-- liesse den schaedlichen Content ueber den anderen Weg weiterlaufen. Der schaedliche
-- Content IST das Projekt. Der Serve-Check prueft dennoch BEIDE Ebenen in einer
-- Bedingung (domain.blocked_at ODER project.blocked_at), damit die Domain-Ebene spaeter
-- ohne Umbau scharf ist, falls eine Custom-Domain SELBST das Problem ist.

-- projects.blocked_at: NULL = aktiv, gesetzt (Zeitpunkt der Sperre) = gesperrt. Reitet
-- in der bestehenden Serve-/Ingest-Projektion mit -> KEIN zusaetzlicher DB-Roundtrip.
alter table public.projects
  add column if not exists blocked_at timestamptz default null;

-- projects.blocked_reason: interne Notiz (z.B. "abuse report: <ref>"). Rein operativ,
-- verlaesst den Server nie.
alter table public.projects
  add column if not exists blocked_reason text default null;

-- domains.blocked_at: DIESELBE Spalte auf Domain-Ebene. In dieser Scheibe im Schema
-- angelegt und vom Serve-Check bereits mitgeprueft, aber operativ NICHT gesetzt
-- (Vorbereitung fuer den Fall, dass eine Custom-Domain selbst das Problem ist).
alter table public.domains
  add column if not exists blocked_at timestamptz default null;

-- Partial-Index fuer die Ops-Liste "alle aktuell gesperrten Projekte" (WHERE blocked_at
-- IS NOT NULL). blocked_at ist KEIN Hot-Path-Filter (beim Serving wird es projiziert,
-- nicht gefiltert) -> der Index ist bewusst klein/optional, deckt aber exakt die seltene
-- Runbook-Query. Additiv, if not exists.
create index if not exists projects_blocked_idx
  on public.projects (blocked_at)
  where blocked_at is not null;
