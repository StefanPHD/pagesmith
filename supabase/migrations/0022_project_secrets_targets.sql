-- Phase 11 Scheibe 6 (Haelfte A) — der CHECK der Geheimnis-Tabelle laesst das ZWEITE
-- Ziel zu. Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy
-- (fail-closed: erst das Ziel, dann der Schreiber).
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Solange keine Server-Action ein anderes Ziel als
-- 'meta' schreibt, aendert diese Datei KEIN Verhalten — sie erweitert nur die Menge
-- erlaubter Werte. Sie ist deshalb gefahrlos frueh einspielbar. Umgekehrt waere die
-- Reihenfolge gefaehrlich: Code zuerst hiesse, ein Betreiber traefe beim Speichern
-- auf eine CHECK-Verletzung.
--
-- DER SICHTBARE MOMENT IST BEABSICHTIGT. 0021 hat ihn vorab benannt: "JEDES weitere
-- Ziel bringt seine EIGENE Constraint-Erweiterung mit … der sichtbare Moment, in dem
-- ein Ziel real wird." Diese Datei IST dieser Moment fuer Pinterest. Wer die
-- Erweiterung spaeter einsparen will, indem er den CHECK ersatzlos entfernt, kauft
-- Bequemlichkeit mit genau der Fehlerklasse, gegen die 0021 ihn gesetzt hat: Ein
-- Geheimnis unter 'pintrest' liesse sich dann speichern, ohne dass etwas meckert —
-- der Adapter suchte 'pinterest', faende nichts, das Ziel bliebe STILL inaktiv.
--
-- 0021 WIRD NICHT UMGESCHRIEBEN. Eine angewandte Migration dokumentiert, was
-- TATSAECHLICH gelaufen ist; sie im Nachhinein zu aendern entkoppelt die Datei von
-- dem, was die DB traegt. Deshalb eine NEUE Datei, die den Constraint ERSETZT.
--
-- BESTEHENDE ZEILEN BLEIBEN UNBERUEHRT — und das ist geprueft, nicht gehofft: Beim
-- ADD CONSTRAINT validiert Postgres alle vorhandenen Zeilen. Sie tragen saemtlich
-- 'meta', und 'meta' ist im neuen Satz enthalten -> alle bestehen, keine Zeile wird
-- geschrieben, kein Wert wandert. Die Meta-Geheimnisse bleiben, wo sie sind.
--
-- WIEDERHOLBAR, FOLGENLOS: Ein zweiter Lauf droppt denselben Constraint und legt
-- denselben wieder an. Er ruehrt keine Zeile an.
-- WARUM DROP+ADD HIER KEIN FENSTER OEFFNET, anders als beim Trigger-Muster in 0021:
-- Beide Anweisungen stehen in EINEM DO-Block und laufen damit in EINER Transaktion.
-- Zwischen dem Drop und dem Add kann kein anderer Schreibvorgang die Tabelle sehen.
-- Ein CHECK laesst sich ausserdem nicht in place aendern — Drop und Add sind der
-- einzige Weg, den Postgres anbietet.
--
-- PRUEFUNG NACH DEM EINSPIELEN: supabase/checks/project-secrets-targets.sql ist
-- BEWUSST NICHT angelegt worden — die zwei Proben (Constraint-Definition, Zeilenzahl
-- vorher/nachher) stehen in der Live-Anleitung dieser Scheibe. Wer sie versioniert
-- haben will, legt sie in einer eigenen Runde an.

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
    check (target in ('meta', 'pinterest'));
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die
-- einen nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0022', '0022_project_secrets_targets.sql', now())
on conflict (version) do nothing;
