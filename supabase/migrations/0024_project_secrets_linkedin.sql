-- Phase 11.1a, VIERTES Fan-Out-Ziel — der CHECK der Geheimnis-Tabelle laesst 'linkedin' zu.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed: erst das
-- Ziel, dann der Schreiber).
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Solange 'linkedin' kein TrackingTarget ist, schreibt
-- keine Server-Action diesen Wert — diese Datei erweitert nur die Menge erlaubter Werte
-- und aendert KEIN Verhalten. Sie ist deshalb gefahrlos frueh einspielbar. Umgekehrt waere
-- die Reihenfolge gefaehrlich: Code zuerst hiesse, ein Betreiber traefe beim Speichern der
-- Zugangsdaten auf eine CHECK-Verletzung.
--
-- DER SICHTBARE MOMENT IST BEABSICHTIGT, ZUM DRITTEN MAL. 0021 hat ihn vorab benannt
-- ("JEDES weitere Ziel bringt seine EIGENE Constraint-Erweiterung mit … der sichtbare
-- Moment, in dem ein Ziel real wird"), 0022 war er fuer das zweite Ziel, 0023 fuer das
-- dritte, diese Datei ist er fuer das vierte. Wer die Erweiterung spaeter einsparen will,
-- indem er den CHECK ersatzlos entfernt, kauft Bequemlichkeit mit genau der Fehlerklasse,
-- gegen die 0021 ihn gesetzt hat: Ein Geheimnis unter 'linkedn' liesse sich dann
-- speichern, ohne dass etwas meckert — der Adapter suchte 'linkedin', faende nichts, das
-- Ziel bliebe STILL inaktiv.
--
-- 0021, 0022 UND 0023 WERDEN NICHT UMGESCHRIEBEN. Eine angewandte Migration dokumentiert,
-- was TATSAECHLICH in der DB gelaufen ist; sie im Nachhinein zu aendern entkoppelt die
-- Datei von dem, was die DB traegt. Deshalb eine NEUE Datei, die den Constraint ERSETZT.
--
-- BESTEHENDE ZEILEN BLEIBEN UNBERUEHRT — geprueft, nicht gehofft: Beim ADD CONSTRAINT
-- validiert Postgres alle vorhandenen Zeilen. Sie tragen 'meta', 'pinterest' oder
-- 'tiktok', und alle drei sind im neuen Satz enthalten -> alle bestehen, keine Zeile wird
-- geschrieben, kein Wert wandert.
--
-- WIEDERHOLBAR, FOLGENLOS: Ein zweiter Lauf droppt denselben Constraint und legt denselben
-- wieder an. Er ruehrt keine Zeile an. WARUM DROP+ADD HIER KEIN FENSTER OEFFNET: Beide
-- Anweisungen stehen in EINEM DO-Block und laufen damit in EINER Transaktion — zwischen
-- Drop und Add kann kein anderer Schreibvorgang die Tabelle sehen. Ein CHECK laesst sich
-- ausserdem nicht in place aendern; Drop und Add sind der einzige Weg, den Postgres
-- anbietet.
--
-- DER AUSGANGSZUSTAND WIRD ABGELESEN, NICHT ANGENOMMEN — und das ist bei DIESER Datei
-- nicht dieselbe Formsache wie bei 0023: docs/db-stand.md fuehrt den Constraint mit ZWEI
-- Werten ('meta', 'pinterest', LIVE ABGELESEN am 2026-08-07) und den Migrationsstand mit
-- 0022, waehrend im Repo 0023 liegt. Ob 0023 in der laufenden DB angewandt ist, ist AM
-- REPO NICHT ENTSCHEIDBAR. Diese Datei setzt den VOLLSTAENDIGEN Satz und konvergiert
-- deshalb unabhaengig vom Ausgangszustand — der abgelesene Ist-Wert gehoert trotzdem ins
-- Protokoll des Laufs, weil er die einzige Gelegenheit ist, die Luecke in db-stand.md zu
-- schliessen.
--
-- PRUEFUNG NACH DEM EINSPIELEN — sie ist NICHT optional, weil am Repo NICHT entscheidbar
-- ist, ob diese Datei gelaufen ist:
--   (1) Die Constraint-Definition im WORTLAUT aus pg_constraint ablesen und die VIER
--       Zielwerte sehen. Probe: supabase/checks/project-secrets-target-check.sql.
--   (2) DIE VERHALTENS-POSITIVKONTROLLE, wie sie 0022 und 0023 gefahren haben: ein
--       Wegwerf-Insert mit 'linkedin' wird ANGENOMMEN, einer mit 'linkedn' mit 23514
--       ABGEWIESEN. Die Annahme allein saehe bei einem Constraint, der alles durchlaesst,
--       identisch aus — erst die Abweisung zeigt, dass der Schutz noch da ist.
--       SIE STEHT ALS ANLEITUNG IM KOPF JENER PROBE UND NICHT ALS AUSFUEHRBARE ANWEISUNG
--       DARIN: supabase/checks/ darf ausschliesslich lesen (harte Regel im README des
--       Ordners), und ein Wegwerf-Insert ist ein Schreibvorgang.

-- (1) DEN CONSTRAINT ERSETZEN. Katalog-Guard, weil "add constraint" kein
--     "if not exists" kennt und ein blindes "drop constraint" beim zweiten Lauf
--     bereits abgebrochen waere. conrelid gegen die konkrete Tabelle, damit der Guard
--     nicht auf einen gleichnamigen Constraint einer anderen Tabelle trifft.
do $$
begin
  if exists (
    select 1
    from pg_constraint
    where conname  = 'project_secrets_target_valid'
      and conrelid = 'public.project_secrets'::regclass
  ) then
    alter table public.project_secrets
      drop constraint project_secrets_target_valid;
  end if;

  alter table public.project_secrets
    add constraint project_secrets_target_valid
    check (target in ('meta', 'pinterest', 'tiktok', 'linkedin'));
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die
-- einen nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0024', '0024_project_secrets_linkedin.sql', now())
on conflict (version) do nothing;
