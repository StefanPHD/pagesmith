-- Migrations-Protokoll: welche Migration wurde angewandt?
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
-- Hier gibt es KEINEN zugehoerigen Code -> diese Migration ist fuer die Anwendung
-- ein No-op und damit gefahrlos.
--
-- ZWECK: Heute ist "welche Migration ist gelaufen?" NICHT direkt messbar — messbar
-- sind nur die WIRKUNGEN (Spalte da? Constraint da? Funktion da?). Jede Pruefung der
-- Deploy-Reihenfolge ist damit Handarbeit, und die Regel "MIGRATION IMMER VOR
-- CODE-DEPLOY" haengt allein an Disziplin. Bei 0016/0017 waere die falsche Reihenfolge
-- ein PostgREST-42703 gewesen — gebrochenes Projektladen fuer ALLE Projekte.
--
-- Additiv, nicht-destruktiv: EINE neue Tabelle. Kein Eingriff in bestehende Tabellen,
-- kein Daten-Backfill ausserhalb dieser Tabelle, KEINE Policy-Aenderung anderswo.
--
-- KEIN STEUERUNGSMECHANISMUS: Diese Tabelle ist ein PROTOKOLL. Es gibt keinen
-- Migrations-Runner, der daraus liest, und es soll keinen geben. Wer sie als
-- "hat schon gelaufen"-Gate missversteht, baut eine Automatik, die wir bewusst
-- nicht haben — die Migrationen laufen weiterhin manuell im SQL-Editor.
--
-- GEGENPROBE NACH DEM LAUF (Owner, im SQL-Editor):
--   select version, filename, applied_at from public.schema_migrations order by version;
-- ERWARTUNG: GENAU 18 Zeilen ('0001' bis '0018'), und applied_at ist bei GENAU EINER
-- Zeile gefuellt — bei '0018'. Alle Bestandszeilen 0001-0017 tragen applied_at = NULL
-- (Begruendung unten). Ein zweiter Lauf dieser Datei aendert daran NICHTS.

-- 1) Die Tabelle. Drei Spalten, mehr braucht ein Protokoll nicht.
create table if not exists public.schema_migrations (
  -- Die Nummer als TEXT, nicht als integer: die Dateinamen sind vierstellig
  -- nullgepolstert ('0001'), und die Sortierung 'order by version' soll exakt der
  -- Dateisortierung entsprechen. Als integer waere '0001' -> 1 und die fuehrenden
  -- Nullen — die Identitaet der Migration — waeren weg.
  version text primary key,
  -- Der Dateiname, damit die Zuordnung Zeile <-> Datei eindeutig ist. Zwei Dateien
  -- mit derselben Nummer faengt bereits der PK ab; der Name macht beim Lesen
  -- sofort klar, WELCHE Migration gemeint ist, ohne ins Repo zu schauen.
  filename text not null,
  -- NULLABLE, bewusst. Siehe Backfill-Begruendung in Abschnitt 3.
  applied_at timestamptz
);

-- 2) RLS mit der Tabelle ZUSAMMEN aktivieren, nie "spaeter" (Muster 0005).
--    DOPPELT ABGESICHERT: Der Event-Trigger ensure_rls -> public.rls_auto_enable()
--    aktiviert RLS zwar automatisch auf jeder neuen public-Tabelle (belegt am
--    archivierten DDL, supabase/manual/rls_auto_enable.sql: ddl_command_end, tags
--    CREATE TABLE/CREATE TABLE AS/SELECT INTO, schema_name in ('public')), ABER auf
--    ihn ist bewusst kein Verlass:
--      (a) Er existiert NUR in der laufenden DB und in KEINER Migration — auf einer
--          aus den Migrationsdateien wiederhergestellten DB (Restore-/Staging-Fall)
--          fehlt er, und diese Tabelle waere dort RLS-los.
--      (b) Er schluckt sein eigenes Scheitern: das EXECUTE steht in einem
--          EXCEPTION WHEN OTHERS-Block, der nur RAISE LOG macht. Ein Fehlschlag ist
--          damit STILL — man saehe eine erfolgreich erzeugte Tabelle ohne RLS.
--      (c) Bei einem zweiten Lauf greift "create table if not exists" nicht mehr als
--          DDL-Kommando -> der Trigger feuert gar nicht.
--    "alter table ... enable row level security" ist idempotent -> wiederholbar.
alter table public.schema_migrations enable row level security;

--    KEINE POLICY, bewusst — gleiche Haltung wie project_tokens und audit_logs
--    ("APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI"). Diese Tabelle ist eine
--    OPS-Tabelle: nur postgres (SQL-Editor) und service_role brauchen sie, KEIN
--    Endnutzer und kein Anwendungscode. Ohne SELECT-Policy ist sie unter RLS fuer
--    anon/authenticated nicht lesbar; service_role und der Tabellen-Owner bypassen
--    RLS ohnehin.
--    OHNE RLS waere sie SOFORT fuer anon lesbar — die Rollen-Grants schuetzen hier
--    NICHTS (anon/authenticated/service_role haben per Supabase-Default volle
--    DML-Rechte auf ALLE public-Tabellen, gemessen 2026-07-24). RLS ist die einzige
--    tragende Schicht. Ein Leak waere zwar nur der Migrationsstand und kein Secret,
--    aber er verraet die Schema-Historie — und die Regel gilt ausnahmslos.

-- 3) BACKFILL 0001-0017 mit applied_at = NULL.
--    DER ZEITPUNKT DER BESTANDSMIGRATIONEN IST NICHT BEKANNT. Sie liefen manuell im
--    SQL-Editor, es gibt kein Protokoll darueber — genau deshalb entsteht diese
--    Tabelle ueberhaupt. Ein hier eingesetzter Zeitstempel (now(), created_at
--    irgendeiner Zeile, ein aus dem Git-Log geschaetztes Datum) waere eine
--    BEHAUPTUNG, keine Messung: er saehe wie ein Messwert aus und waere keiner.
--    NULL sagt hier ehrlich: "vor Einfuehrung dieser Tabelle angewandt, Zeitpunkt
--    unbekannt". Genau dafuer ist die Spalte NULLABLE.
--
--    "on conflict (version) do nothing" ueberall: ein zweiter Lauf dieser Datei ist
--    folgenlos — er ueberschreibt insbesondere NICHT den echten Zeitstempel von 0018
--    mit einem neuen (do nothing, kein do update).
insert into public.schema_migrations (version, filename, applied_at) values
  ('0001', '0001_projects.sql',                 null),
  ('0002', '0002_multi_project.sql',            null),
  ('0003', '0003_security_hardening.sql',       null),
  ('0004', '0004_project_settings.sql',         null),
  ('0005', '0005_project_tokens.sql',           null),
  ('0006', '0006_hosting.sql',                  null),
  ('0007', '0007_custom_domains.sql',           null),
  ('0008', '0008_kill_switch.sql',              null),
  ('0009', '0009_domain_registration.sql',      null),
  ('0010', '0010_domain_dns_config.sql',        null),
  ('0011', '0011_events.sql',                   null),
  ('0012', '0012_project_tracking_key.sql',     null),
  ('0013', '0013_events_read.sql',              null),
  ('0014', '0014_event_counts_server_only.sql', null),
  ('0015', '0015_adblock_loss.sql',             null),
  ('0016', '0016_variant_b.sql',                null),
  ('0017', '0017_ab_test.sql',                  null)
on conflict (version) do nothing;

-- 4) Diese Migration traegt sich SELBST ein — als LETZTE Anweisung der Datei, damit
--    der Eintrag nur bei erfolgreichem Durchlauf entsteht. Ab hier gilt das fuer
--    JEDE kuenftige Migration (verankert in CLAUDE.md, "## Immer beachten").
--    now() ist hier ein echter Messwert: dieser Lauf findet JETZT statt.
insert into public.schema_migrations (version, filename, applied_at)
values ('0018', '0018_schema_migrations.sql', now())
on conflict (version) do nothing;
