-- Phase 9 Scheibe 9b-1 — A/B-Split: Aktivierungs-Flag + Varianten-Dimension.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
-- BEIDE Spalten in EINER Migration, damit 9b-2 keine zweite braucht. events.variant
-- wird in 9b-1 NOCH NICHT geschrieben — die Spalte kommt nur mit.
-- Additiv, nicht-destruktiv: zwei Spalten + zwei CHECKs, KEIN Backfill, KEIN Index,
-- KEINE Policy-Aenderung, KEIN Daten-Touch.

-- 1) Aktivierungs-Flag. EIGENE SPALTE, NICHT in settings: settings ist CLIENT-
--    autoritativ und wird von saveProject GANZHEITLICH ersetzt (2b-0-Lektion) — ein
--    server-relevanter Schalter dort stuerbe beim naechsten Client-Save.
--    NOT NULL + DEFAULT false: es gibt keinen "unbekannten" Testzustand, und der
--    Default ist der fail-safe (kein Split). Postgres 11+ fuellt einen Default ohne
--    Table-Rewrite -> kein Lock-Risiko auf der Bestandstabelle.
alter table public.projects
  add column if not exists ab_test_active boolean not null default false;

-- 2) "Der Test kann nur aktiv sein, wenn B existiert." STRUKTURELL statt per
--    Konvention: vergisst ein Schreiber (heute removeVariantB) das Flag, schlaegt die
--    DB LAUT fehl, statt still einen Test laufen zu lassen, dessen Variante es nicht
--    mehr gibt. Gleiche Denkfigur wie projects_variant_b_pair (0016).
--    BESTANDSDATEN: alle Zeilen tragen ab_test_active = false -> "not false" = true
--    -> trivial erfuellt, die Validierung kann nicht fehlschlagen. (Gegenprobe vor dem
--    Lauf, muss 0 liefern:
--      select count(*) from public.projects
--      where ab_test_active and html_b is null;)
--    "add constraint" kennt KEIN "if not exists" -> Katalog-Guard (Muster 0016).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.projects'::regclass
      and conname = 'projects_ab_test_needs_variant_b'
  ) then
    alter table public.projects
      add constraint projects_ab_test_needs_variant_b
      check (not ab_test_active or html_b is not null);
  end if;
end $$;

-- 3) Varianten-Dimension auf events. EIGENE additive Spalte — NIEMALS in source
--    (source = Beobachtungs-ORT, s. "## Immer beachten"). NULLABLE, weil sie fuer
--    Bestandszeilen und fuer Events ohne Cookie (Export-Download auf fremder Domain)
--    korrekt leer bleibt. KEIN Backfill (es gibt keine rueckwirkende Wahrheit),
--    KEIN Index (nirgends gematcht; 9c aggregiert ueber project_id, wofuer
--    events_project_id_idx bereits traegt).
--    WIRD IN 9b-1 NICHT GESCHRIEBEN.
alter table public.events
  add column if not exists variant text;

-- 4) Wertebereich hart begrenzt: die Werte sind PERMANENT (sie werden nie
--    nachtraeglich transformiert) -> sie muessen ab Zeile 1 stimmen. Gleiche Haltung
--    wie bei source. BESTANDSDATEN: alle Zeilen haben variant IS NULL -> erste
--    Disjunktion wahr -> trivial erfuellt.
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.events'::regclass
      and conname = 'events_variant_valid'
  ) then
    alter table public.events
      add constraint events_variant_valid
      check (variant is null or variant in ('a','b'));
  end if;
end $$;
