-- Schritt 3.3 — Multi-Projekt-Support.
-- Manuell im Supabase-SQL-Editor ausfuehren. service_role kommt NIRGENDS vor;
-- der Zugriff laeuft ausschliesslich ueber anon-Key + RLS + Server-Session.

-- user_id-Unique entfaellt -> mehrere Projekte pro User (3.3); Save-Logik
-- wechselt von Upsert auf id-basiertes update/insert.
-- drop constraint ist nicht-destruktiv/umkehrbar (keine Datenaenderung). Der
-- updated_at-Trigger (set_updated_at / projects_set_updated_at) existiert bereits
-- aus 0001 und wird hier NICHT erneut angelegt.
alter table public.projects drop constraint projects_user_id_key;
