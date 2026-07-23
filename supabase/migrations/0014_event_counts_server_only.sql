-- Phase 8 Scheibe A — get_event_counts zaehlt NUR server-beobachtete Events.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Scheibe-A-Code-Deploy.
--
-- WARUM (Spec-Korrektur aus Stufe 1): Scheibe A laesst den Client eine BESTAETIGUNG
-- schicken, dass Metas Browser-Pixel wirklich lud. Die landet als ZWEITE events-Zeile mit
-- DERSELBEN event_id und DEMSELBEN event_type, nur source='browser'. get_event_counts
-- (0013) gruppiert source-UNABHAENGIG -> die live gegangene Scheibe-3-Statistik zeigte ab
-- der ersten Bestaetigung fuer EINE Conversion "Lead: 2". Sichtbare Regression bestehender
-- UI, nicht erst ein Scheibe-B-Thema.
--
-- Der Filter ist semantisch ohnehin richtig: die Sektion zaehlt server-seitig erfasste
-- Events. Eine Bestaetigung ist ein MESS-ARTEFAKT (Beobachtung ueber den Zustand des
-- Browser-Pixels), kein zweites Event. Die Verlustrate (Scheibe B) liest die
-- source='browser'-Zeilen separat — sie sind nicht verloren, nur nicht gezaehlt.
--
-- DEPLOY-REIHENFOLGE: vor Confirms existiert keine source='browser'-Zeile -> der Filter
-- ist bis dahin ein No-op und damit gefahrlos frueh einspielbar. Danach verhindert er die
-- Doppelzaehlung ab der ERSTEN Confirm-Zeile.
--
-- ACHTUNG (der eigentliche Fallstrick): create or replace ersetzt die KOMPLETTE Definition
-- inklusive aller SET-Klauseln. "set search_path = public" (gestern gehaertet, Advisor
-- "Function Search Path Mutable") MUSS deshalb mitgeschrieben werden, sonst kommt der
-- Befund still zurueck. Ebenso unveraendert mitgefuehrt: language sql, stable, KEIN
-- security definer (SECURITY INVOKER -> die events_select_own-Policy filtert die
-- Aggregation weiterhin von innen) und der identische Rueckgabetyp.
--
-- Kein Schema-Change, keine Policy-Aenderung, kein Backfill.
create or replace function public.get_event_counts(p_project_id uuid)
  returns table (event_type text, count bigint)
  language sql
  stable
  set search_path = public
as $$
  select e.event_type, count(*)::bigint as count
  from public.events e
  where e.project_id = p_project_id
    and e.source = 'server'
  group by e.event_type
$$;
