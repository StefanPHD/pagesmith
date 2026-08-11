-- Phase 11, DRITTES Fan-Out-Ziel — der CHECK der Geheimnis-Tabelle laesst 'tiktok' zu.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed: erst
-- das Ziel, dann der Schreiber).
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Solange keine Server-Action 'tiktok' schreibt,
-- aendert diese Datei KEIN Verhalten — sie erweitert nur die Menge erlaubter Werte.
-- Sie ist deshalb gefahrlos frueh einspielbar. Umgekehrt waere die Reihenfolge
-- gefaehrlich: Code zuerst hiesse, ein Betreiber traefe beim Speichern der
-- Zugangsdaten auf eine CHECK-Verletzung.
--
-- DER SICHTBARE MOMENT IST BEABSICHTIGT, ZUM ZWEITEN MAL. 0021 hat ihn vorab benannt
-- ("JEDES weitere Ziel bringt seine EIGENE Constraint-Erweiterung mit … der sichtbare
-- Moment, in dem ein Ziel real wird"), 0022 war er fuer das zweite Ziel, diese Datei
-- ist er fuer das dritte. Wer die Erweiterung spaeter einsparen will, indem er den
-- CHECK ersatzlos entfernt, kauft Bequemlichkeit mit genau der Fehlerklasse, gegen die
-- 0021 ihn gesetzt hat: Ein Geheimnis unter 'tiktokk' liesse sich dann speichern, ohne
-- dass etwas meckert — der Adapter suchte 'tiktok', faende nichts, das Ziel bliebe
-- STILL inaktiv.
--
-- 0021 UND 0022 WERDEN NICHT UMGESCHRIEBEN. Eine angewandte Migration dokumentiert,
-- was TATSAECHLICH gelaufen ist; sie im Nachhinein zu aendern entkoppelt die Datei von
-- dem, was die DB traegt. Deshalb eine NEUE Datei, die den Constraint ERSETZT.
--
-- BESTEHENDE ZEILEN BLEIBEN UNBERUEHRT — geprueft, nicht gehofft: Beim ADD CONSTRAINT
-- validiert Postgres alle vorhandenen Zeilen. Sie tragen 'meta' oder 'pinterest', und
-- beide sind im neuen Satz enthalten -> alle bestehen, keine Zeile wird geschrieben,
-- kein Wert wandert.
--
-- WIEDERHOLBAR, FOLGENLOS: Ein zweiter Lauf droppt denselben Constraint und legt
-- denselben wieder an. Er ruehrt keine Zeile an. WARUM DROP+ADD HIER KEIN FENSTER
-- OEFFNET: Beide Anweisungen stehen in EINEM DO-Block und laufen damit in EINER
-- Transaktion — zwischen Drop und Add kann kein anderer Schreibvorgang die Tabelle
-- sehen. Ein CHECK laesst sich ausserdem nicht in place aendern; Drop und Add sind der
-- einzige Weg, den Postgres anbietet.
--
-- PRUEFUNG NACH DEM EINSPIELEN — sie ist NICHT optional, weil am Repo NICHT
-- entscheidbar ist, ob diese Datei gelaufen ist:
--   (1) Die Constraint-Definition im WORTLAUT aus pg_constraint ablesen und die drei
--       Zielwerte sehen.
--   (2) DIE POSITIVKONTROLLE, wie sie 0022 gefahren hat: ein Wegwerf-Insert mit
--       'tiktok' wird ANGENOMMEN, einer mit 'tiktokk' mit 23514 ABGEWIESEN. Die
--       Annahme allein saehe bei einem Constraint, der alles durchlaesst, identisch
--       aus — erst die Abweisung zeigt, dass der Schutz noch da ist.

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
    check (target in ('meta', 'pinterest', 'tiktok'));
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die
-- einen nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0023', '0023_project_secrets_tiktok.sql', now())
on conflict (version) do nothing;
