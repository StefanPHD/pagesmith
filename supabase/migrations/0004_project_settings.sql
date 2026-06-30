-- Phase 6 Scheibe 1b — Projekt-Einstellungen (settings jsonb).
-- Manuell im Supabase-SQL-Editor ausfuehren. service_role kommt NIRGENDS vor;
-- der Zugriff laeuft ausschliesslich ueber anon-Key + RLS + Server-Session.
-- Additiv, nicht-destruktiv: kein DROP, kein Daten-Touch.

-- Projektweite Einstellungen (jsonb), plattform-genestet:
--   settings.pixels.meta.pixelId  (Meta-Pixel-ID, OEFFENTLICH -> kein Secret).
-- Default '{}' -> bestehende Zeilen sind sofort gueltig (leere Einstellungen).
alter table public.projects
  add column settings jsonb not null default '{}';

-- KEINE neue RLS-Policy noetig: die vier Policies aus 0001
-- (projects_select_own / _insert_own / _update_own / _delete_own) gaten die ZEILE
-- ueber auth.uid() = user_id und sind spalten-agnostisch. Eine neue Spalte auf der
-- bereits geschuetzten Zeile ist automatisch abgedeckt. Der updated_at-Trigger
-- (projects_set_updated_at, 0001) feuert weiter bei jedem UPDATE.
