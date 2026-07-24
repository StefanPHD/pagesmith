-- ============================================================================
-- rls_auto_enable — Event-Trigger-Funktion + Event-Trigger ensure_rls
-- Ops-Artefakt, KEINE Migration.
-- ============================================================================
-- HERKUNFT: Die Funktion existierte bereits VOR Migration 0003. 0003 hat dort
--   NUR die EXECUTE-Grants entzogen (revoke on function public.rls_auto_enable()
--   from public/anon/authenticated), die Funktion selbst aber NIE erzeugt. In
--   KEINER Migration (0001-0015) steht ein CREATE dafuer — weder fuer die
--   Funktion noch fuer den Event-Trigger.
-- ZWECK: aktiviert per Event-Trigger AUTOMATISCH Row Level Security auf jeder
--   neu erzeugten Tabelle im public-Schema (Schutznetz gegen versehentlich
--   RLS-lose Tabellen; der anon-Key steckt im Client-Bundle jeder Seite -> eine
--   RLS-lose public-Tabelle waere sofort fuer anon offen).
-- STATUS: existiert in der laufenden DB. Der Event-Trigger ensure_rls gehoert
--   der postgres-Rolle (gemessen 2026-07-24) — eine Nachbildung als Migration
--   ist damit PLAUSIBEL, aber NICHT bewiesen: Eigentuemerschaft belegt nicht das
--   Recht, einen Event-Trigger zu erzeugen (das Objekt koennte von
--   supabase_admin angelegt und uebereignet worden sein). Der Beweis waere ein
--   echter Ausfuehrungsversuch -> eigene Scheibe, s. CLAUDE.md "## Offene Punkte".
-- NICHT Teil der Migrationssequenz — wird beim Rebuild MANUELL ausgefuehrt.
-- Nach dem Ausfuehren: Byte-Abgleich gegen pg_get_functiondef (0014-Lektion:
--   create or replace ersetzt die Definition VOLLSTAENDIG; ein
--   Transkriptionsfehler degradiert still den RLS-Schutz).
-- IDEMPOTENZ: Die CREATE-OR-REPLACE-Funktion ist wiederholbar, das CREATE EVENT
--   TRIGGER NICHT (kein 'if not exists'). Gegen eine DB, in der ensure_rls schon
--   existiert, schlaegt die LETZTE Anweisung fehl — die Funktion wurde dann
--   bereits ersetzt (halb angewendeter Lauf, errort aber laut, nicht still). Auf
--   einer frisch aufgebauten DB laeuft die Datei durch.
-- ============================================================================

CREATE OR REPLACE FUNCTION public.rls_auto_enable()
 RETURNS event_trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'pg_catalog'
AS $function$
DECLARE
  cmd record;
BEGIN
  FOR cmd IN
    SELECT *
    FROM pg_event_trigger_ddl_commands()
    WHERE command_tag IN ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO')
      AND object_type IN ('table','partitioned table')
  LOOP
     IF cmd.schema_name IS NOT NULL AND cmd.schema_name IN ('public') AND cmd.schema_name NOT IN ('pg_catalog','information_schema') AND cmd.schema_name NOT LIKE 'pg_toast%' AND cmd.schema_name NOT LIKE 'pg_temp%' THEN
      BEGIN
        EXECUTE format('alter table if exists %s enable row level security', cmd.object_identity);
        RAISE LOG 'rls_auto_enable: enabled RLS on %', cmd.object_identity;
      EXCEPTION
        WHEN OTHERS THEN
          RAISE LOG 'rls_auto_enable: failed to enable RLS on %', cmd.object_identity;
      END;
     ELSE
        RAISE LOG 'rls_auto_enable: skip % (either system schema or not in enforced list: %.)', cmd.object_identity, cmd.schema_name;
     END IF;
  END LOOP;
END;
$function$;

create event trigger ensure_rls on ddl_command_end when tag in ('CREATE TABLE', 'CREATE TABLE AS', 'SELECT INTO') execute function public.rls_auto_enable();
