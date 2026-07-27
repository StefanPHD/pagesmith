-- Phase 9 Scheibe 9a — Varianten-Authoring: zweiter Inhalts-Slot je Projekt.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
-- Ohne den zugehoerigen Code ist diese Migration ein No-op: kein Leser, kein
-- Schreiber, kein Default -> gefahrlos vorab.
--
-- BEWUSSTES DUPLIKAT statt verfrühter Abstraktion: echte Varianten brauchen zwei
-- (html, mappings)-PAARE, weil Mappings an den data-pagesmith-id-Ankern des
-- JEWEILIGEN HTML haengen. Die saubere Loesung waere die pages-Tabelle
-- ("Projekt = N Seiten"), die strikt NACH Spur B kommt. Bei EXAKT ZWEI Faellen ist
-- ein benanntes Duplikat billiger und ehrlicher als eine Abstraktion auf Verdacht.
-- BEI EINEM DRITTEN FALL wird dieses Modell durch die pages-Tabelle ERSETZT,
-- nicht erweitert.
--
-- Additiv, nicht-destruktiv: zwei neue Spalten + ein CHECK, KEIN Backfill, KEIN
-- Default, KEIN Index, KEINE Policy-Aenderung, KEIN Daten-Touch.

-- 1) Die beiden Slots. NULLABLE und OHNE Default — bewusst abweichend von
--    html/mappings (die sind NOT NULL mit Default '' bzw. '[]', Migration 0001):
--    NULL ist hier das SIGNAL "dieses Projekt hat keine Variante B". Ein Default
--    ''/'[]' wuerde JEDEM Bestandsprojekt eine leere Variante B andichten und die
--    Existenzpruefung unbrauchbar machen.
alter table public.projects
  add column if not exists html_b text;

alter table public.projects
  add column if not exists mappings_b jsonb;

-- 2) GLEICHLAUF STRUKTURELL, nicht per Konvention. "B existiert" wird im gesamten
--    Code ueber GENAU EINE Bedingung entschieden: html_b IS NOT NULL. Ein halber
--    Zustand (html_b gesetzt, mappings_b NULL — oder umgekehrt) wuerde diese
--    einzige Wahrheitsquelle unbrauchbar machen: der Serve-/Publish-Pfad haelte B
--    fuer vorhanden, waehrend die Mappings fehlen (eine "tote" Variante ohne
--    Verdrahtung), oder das UI verstecke eine Variante, deren Mappings noch in der
--    Zeile liegen. Heute halten drei Actions (createVariantB / saveVariantB /
--    removeVariantB) den Gleichlauf per Konvention ein — der CHECK macht daraus
--    eine DB-Garantie, die auch ein spaeterer vierter Schreiber nicht umgehen kann.
--
--    BESTANDSDATEN: beide Spalten wurden gerade erst angelegt und sind in JEDER
--    bestehenden Zeile NULL -> (null is null) = (null is null) -> true. Der CHECK
--    ist fuer alle Bestandszeilen trivial erfuellt, die Validierung kann nicht
--    fehlschlagen. (Gegenprobe vor dem Lauf, muss 0 liefern:
--      select count(*) from public.projects
--      where (html_b is null) <> (mappings_b is null);)
--
--    "add constraint" kennt KEIN "if not exists" -> Katalog-Guard, damit die
--    Migration wiederholbar bleibt (gleiche Vorsicht wie beim Event-Trigger).
do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conrelid = 'public.projects'::regclass
      and conname = 'projects_variant_b_pair'
  ) then
    alter table public.projects
      add constraint projects_variant_b_pair
      check ((html_b is null) = (mappings_b is null));
  end if;
end $$;

-- 3) KEIN Index: html_b/mappings_b werden NIRGENDS in WHERE/ORDER BY/Matching
--    verwendet — sie werden ausschliesslich ueber den bestehenden projects-PK
--    gelesen und geschrieben. Ein Index waere reiner Schreib-Overhead.
--
--    KEINE Policy-Aenderung: die vier projects-Policies (Migration 0001) sind
--    ROW-level (using/with check auf auth.uid() = user_id) und tragen KEINE
--    Spaltenliste -> sie decken neue Spalten automatisch ab. Am Migrationsfile
--    verifiziert, nicht angenommen.
--
--    KEIN Backfill: NULL ist der korrekte Zustand fuer alle Bestandsprojekte.
