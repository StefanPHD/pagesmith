-- ZWECK:       Verifiziert nach einem tatsaechlichen Supabase-Restore, ob der
--              Event-Trigger ensure_rls (-> Funktion rls_auto_enable, SECURITY
--              DEFINER) den Restore ueberlebt hat, oder ob
--              supabase/manual/rls_auto_enable.sql danach MANUELL nachgezogen
--              werden muss. Beantwortet den Offenen Punkt "rls_auto_enable-CREATE
--              FEHLT IN DEN MIGRATIONEN" (CLAUDE.md "## Offene Punkte") und die
--              TRAGENDE KONTROLLE aus dem Security-Manifest-Item "BACKUPS +
--              Restore-Drill" (docs/claude-history/security-manifest-full.md).
-- ERWARTUNG:   TEIL A (vor dem Restore, Original) und TEIL B (nach dem Restore,
--              restauriertes Projekt) liefern fuer alle DREI Abfragen IDENTISCHE
--              Ergebnisse — Zeile fuer Zeile vergleichen, jede Abweichung ist ein
--              echter Fund. TEIL C liefert rls_automatisch_aktiviert = true, WENN
--              ensure_rls ueberlebt hat; false, wenn der Trigger verloren ist —
--              dann supabase/manual/rls_auto_enable.sql manuell ausfuehren und
--              TEIL C zur Bestaetigung wiederholen.
-- WANN:        NUR bei einem TATSAECHLICHEN Restore-Drill — anders als die
--              uebrigen Dateien in diesem Ordner laeuft diese Probe NICHT
--              routinemaessig, sondern einmalig je Drill, in DREI zeitlich
--              getrennten Schritten: TEIL A VOR dem Restore am ORIGINAL-Projekt,
--              TEIL B und TEIL C NACH dem Restore am RESTAURIERTEN (neuen,
--              temporaeren) Projekt. Welches Projekt gemeint ist, entscheidet
--              ausschliesslich, gegen welches Projekt der SQL-Editor gerade
--              verbunden ist — keine Abfrage hier nimmt einen Projekt-Parameter.
-- PLATZHALTER: keine.
-- FALLE:       (1) TEIL C ist NICHT rein lesend — die einzige Ausnahme im
--              gesamten supabase/checks/-Ordner (eine Wegwerf-Tabelle wird
--              angelegt und im selben Skript wieder gedroppt). Nur auf dem
--              RESTAURIERTEN/TEMPORAEREN Projekt ausfuehren, NIEMALS auf der
--              echten Produktions-DB.
--              (2) TEIL B ALLEIN GENUEGT NICHT: pg_event_trigger zeigt nur, OB
--              ein Trigger-Eintrag existiert und ALS aktiviert markiert ist
--              (evtenabled). Ein Trigger, dessen Funktionskoerper aus einem
--              anderen Grund fehlschlaegt (z.B. weil rls_auto_enable() nach dem
--              Restore einem anderen Owner-Kontext gehoert oder die
--              EXECUTE-Rechte anders liegen), sieht im Katalog IDENTISCH aus wie
--              ein funktionierender. Nur die ECHTE CREATE TABLE in TEIL C prueft
--              die tatsaechliche WIRKUNG statt der blossen Anwesenheit.
-- VERIFIZIERT: NOCH NIE — der Restore-Drill wurde bisher nicht gefahren (s.
--              CLAUDE.md "## Offene Punkte" und das Security-Manifest-Item
--              "BACKUPS + Restore-Drill", TEILWEISE ERLEDIGT). Diese Datei
--              bereitet den Drill vor, sie ersetzt ihn nicht.

-- ============================================================================
-- TEIL A — VOR DEM RESTORE, am ORIGINAL-Projekt ausfuehren.
-- Haelt die Referenzwerte fest, gegen die TEIL B nach dem Restore verglichen
-- wird. Alle drei Abfragen sind WOERTLICH aus supabase/checks/db-stand.sql
-- uebernommen (Probe 1 / 8 / 9) — kein zweiter Text fuer dieselbe Abfrage,
-- sonst waere ein spaeterer Textunterschied zwischen den Dateien nicht von
-- einer echten Restore-Abweichung zu unterscheiden.
-- ============================================================================

-- TEIL A.1 — Migrationsstand (= Probe 1 aus db-stand.sql)
select version, filename, applied_at
from public.schema_migrations
order by version;

-- TEIL A.2 — Event-Trigger, cluster-weit (= Probe 9 aus db-stand.sql)
select et.evtname, et.evtevent, et.evtenabled,
       p.proname as funktion,
       pg_get_userbyid(et.evtowner) as owner
from pg_event_trigger et
join pg_proc p on p.oid = et.evtfoid
order by et.evtname;

-- TEIL A.3 — Funktionen in public mit Sicherheitstyp (= Probe 8 aus db-stand.sql)
-- BESONDERES AUGENMERK: rls_auto_enable muss sicherheit = 'DEFINER' und
-- set_klauseln = {search_path=pg_catalog} tragen (nicht public — s. CLAUDE.md
-- "## Immer beachten", "DB-FUNKTIONEN + SEARCH_PATH").
select p.proname,
       case p.prosecdef when true then 'DEFINER' else 'INVOKER' end as sicherheit,
       p.provolatile as volatilitaet,
       p.proconfig as set_klauseln
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
order by p.proname;

-- ============================================================================
-- TEIL B — NACH DEM RESTORE, am RESTAURIERTEN (neuen, temporaeren) Projekt
-- ausfuehren. Dieselben drei Abfragen wie TEIL A, zum Abgleich gegen die
-- Referenzwerte von oben.
-- ============================================================================

-- TEIL B.1 — Migrationsstand (identisch zu TEIL A.1)
select version, filename, applied_at
from public.schema_migrations
order by version;

-- TEIL B.2 — Event-Trigger, cluster-weit (identisch zu TEIL A.2)
-- ERWARTUNG BEI VERLORENEM TRIGGER: die Zeile fuer 'ensure_rls' FEHLT ganz —
-- das waere der erste sichtbare Hinweis, aber s. FALLE (2): ihre ANWESENHEIT
-- allein beweist noch keine funktionierende Wirkung, das leistet erst TEIL C.
select et.evtname, et.evtevent, et.evtenabled,
       p.proname as funktion,
       pg_get_userbyid(et.evtowner) as owner
from pg_event_trigger et
join pg_proc p on p.oid = et.evtfoid
order by et.evtname;

-- TEIL B.3 — Funktionen in public mit Sicherheitstyp (identisch zu TEIL A.3)
-- ERWARTUNG BEI VERLORENER FUNKTION: die Zeile fuer 'rls_auto_enable' FEHLT
-- ganz (Funktionsdefinitionen sind Teil des Schema-Dumps und ueberleben in der
-- Regel; der Event-Trigger selbst haengt dagegen am CLUSTER, s. FALLE oben).
select p.proname,
       case p.prosecdef when true then 'DEFINER' else 'INVOKER' end as sicherheit,
       p.provolatile as volatilitaet,
       p.proconfig as set_klauseln
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
order by p.proname;

-- ============================================================================
-- TEIL C — DIE POSITIVKONTROLLE. PFLICHT, nicht optional. NUR am RESTAURIERTEN
-- (temporaeren) Projekt, NIEMALS an der echten Produktions-DB.
--
-- WARUM TEIL B ALLEIN NICHT GENUEGT: pg_event_trigger zeigt nur, OB ein
-- Trigger-Eintrag existiert und ALS aktiviert markiert ist (evtenabled='O').
-- Ein Trigger, dessen Funktionskoerper beim tatsaechlichen Feuern aus einem
-- anderen Grund scheitert (z.B. veraenderter Owner-Kontext nach dem Restore,
-- andere EXECUTE-Rechte, ein stiller Fehler im EXCEPTION-Block der Funktion
-- selbst — die Funktion schluckt ihr eigenes Scheitern per RAISE LOG statt
-- RAISE EXCEPTION, s. supabase/manual/rls_auto_enable.sql), sieht im Katalog
-- IDENTISCH aus wie ein voll funktionsfaehiger. Nur eine ECHTE CREATE TABLE
-- beweist die tatsaechliche WIRKUNG statt der blossen Anwesenheit.
-- ============================================================================

-- ACHTUNG: Diese Anweisung ist NICHT lesend — die einzige Ausnahme im gesamten
-- supabase/checks/-Ordner. NUR auf dem RESTAURIERTEN/TEMPORAEREN Projekt.
create table public._restore_drill_probe (id int);

-- ERWARTUNG: true = ensure_rls hat den Restore ueberlebt, KEIN manueller
-- Nachzug noetig. false = Trigger verloren -> supabase/manual/rls_auto_enable.sql
-- manuell ausfuehren, danach DIESEN Block (Create + Check + Drop) wiederholen.
select rel.relrowsecurity as rls_automatisch_aktiviert
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_restore_drill_probe';

-- AUFRAEUMZEILE — PFLICHT, direkt im Anschluss: die Wegwerf-Tabelle darf im
-- restaurierten Projekt nicht liegen bleiben.
drop table public._restore_drill_probe;
