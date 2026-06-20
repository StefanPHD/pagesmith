-- Schritt Sicherheits-Härtung — Supabase Security-Advisor-Warnungen abräumen.
-- Manuell im Supabase-SQL-Editor ausfuehren. service_role kommt NIRGENDS vor;
-- der Zugriff laeuft ausschliesslich ueber anon-Key + RLS + Server-Session.
-- Reine Sicherheits-Migration: kein DROP, kein Schema-Eingriff, kein Daten-Touch.

-- 1) set_updated_at (unser Trigger aus 0001) gegen search-path-Hijacking härten:
--    Ohne festen search_path könnte ein Angreifer über ein manipuliertes
--    search_path-Setting Funktionen/Operatoren aus einem fremden Schema
--    unterschieben. Fixer search_path = public schließt das.
alter function public.set_updated_at() set search_path = public;

-- 2) rls_auto_enable() absichern. Befund der Inspektion:
--    Event-Trigger-Funktion (aktiviert RLS auf neuen public-Tabellen, schützend),
--    from_extension = NULL (gehört KEINER Extension -> Anfassen ist sicher),
--    SECURITY DEFINER, direkt ausführbar von PUBLIC, anon und authenticated.
--    Event-Trigger läuft als Owner -> Entzug des direkten EXECUTE stoppt sie NICHT.
--    Entzug von allen drei Grants, weil anon/authenticated EIGENE Grants haben
--    (ein bloßes FROM PUBLIC würde die beiden Warnungen NICHT löschen):
revoke execute on function public.rls_auto_enable() from public;
revoke execute on function public.rls_auto_enable() from anon;
revoke execute on function public.rls_auto_enable() from authenticated;
