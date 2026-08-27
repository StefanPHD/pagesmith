-- Phase 11.8f, FUENFTES Fan-Out-Ziel — der CHECK der Geheimnis-Tabelle laesst 'google' zu.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed: erst das
-- Ziel, dann der Schreiber).
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Solange 'google' kein TrackingTarget ist, schreibt
-- keine Server-Action diesen Wert — diese Datei erweitert nur die Menge erlaubter Werte
-- und aendert KEIN Verhalten. Sie ist deshalb gefahrlos frueh einspielbar. Umgekehrt waere
-- die Reihenfolge FAIL-OPEN: Code zuerst hiesse, der Schreibpfad der Scheibe 11.8e liefe
-- gegen eine Datenbank, die den Wert nicht kennt, und scheiterte im laufenden Betrieb
-- statt im Editor.
--
-- DER SICHTBARE MOMENT IST BEABSICHTIGT, ZUM VIERTEN MAL. 0021 hat ihn vorab benannt
-- ("JEDES weitere Ziel bringt seine EIGENE Constraint-Erweiterung mit … der sichtbare
-- Moment, in dem ein Ziel real wird"), 0022 war er fuer das zweite Ziel, 0023 fuer das
-- dritte, 0024 fuer das vierte, diese Datei ist er fuer das fuenfte. Wer die Erweiterung
-- spaeter einsparen will, indem er den CHECK ersatzlos entfernt, kauft Bequemlichkeit mit
-- genau der Fehlerklasse, gegen die 0021 ihn gesetzt hat: Ein Geheimnis unter 'googel'
-- liesse sich dann speichern, ohne dass etwas meckert — der Adapter suchte 'google',
-- faende nichts, das Ziel bliebe STILL inaktiv.
--
-- 0021 BIS 0025 WERDEN NICHT UMGESCHRIEBEN. Eine angewandte Migration dokumentiert, was
-- TATSAECHLICH in der DB gelaufen ist; sie im Nachhinein zu aendern entkoppelt die Datei
-- von dem, was die DB traegt. Deshalb eine NEUE Datei, die den Constraint ERSETZT.
--
-- BESTEHENDE ZEILEN BLEIBEN UNBERUEHRT — geprueft, nicht gehofft: Beim ADD CONSTRAINT
-- validiert Postgres alle vorhandenen Zeilen. Sie tragen 'meta', 'pinterest', 'tiktok'
-- oder 'linkedin', und alle VIER sind im neuen Satz enthalten -> alle bestehen, keine
-- Zeile wird geschrieben, kein Wert wandert.
--
-- WIEDERHOLBAR, FOLGENLOS: Ein zweiter Lauf droppt denselben Constraint und legt denselben
-- wieder an. Er ruehrt keine Zeile an. WARUM DROP+ADD HIER KEIN FENSTER OEFFNET: Beide
-- Anweisungen stehen in EINEM DO-Block und laufen damit in EINER Transaktion — zwischen
-- Drop und Add kann kein anderer Schreibvorgang die Tabelle sehen. Ein CHECK laesst sich
-- ausserdem nicht in place aendern; Drop und Add sind der einzige Weg, den Postgres
-- anbietet.
--
-- DER AUSGANGSZUSTAND WIRD ABGELESEN, NICHT ANGENOMMEN — und bei DIESER Datei liegt der
-- Fall ANDERS als bei 0024, was eigens benannt gehoert: Dort fuehrte docs/db-stand.md ZWEI
-- Werte, waehrend im Repo bereits 0023 lag — Repo und Doku lagen AUSEINANDER, und die
-- Datei musste unabhaengig vom Ausgangszustand konvergieren. HIER STIMMEN BEIDE UEBEREIN:
-- 0024_project_secrets_linkedin.sql traegt VIER Werte, und docs/db-stand.md fuehrt
-- dieselben VIER, LIVE ABGELESEN am 2026-08-17 (SQL-Editor, Owner). Kein Drift.
-- DAS ENTBINDET NICHT VOM ABLESEN: Ob eine Migration in der LAUFENDEN DB angewandt ist,
-- ist am Repo NICHT entscheidbar. Der Wortlaut VOR dem Lauf gehoert ins Protokoll — er ist
-- die einzige Gelegenheit, ihn zu erfahren. Diese Datei setzt trotzdem den VOLLSTAENDIGEN
-- Satz und konvergiert damit unabhaengig vom Ausgangszustand.
--
-- WAS DER KATALOG-GUARD UNTEN NICHT LEISTET — NEU IN DIESER DATEI, und keine der vier
-- Vorgaenger-Dateien sagt es:
--   Der Guard prueft conname UND conrelid. Waere der Constraint-NAME ein anderer als
--   'project_secrets_target_valid', griffe er NICHT: Es wuerde NICHT gedroppt, und das
--   ADD legte einen ZWEITEN Constraint an. Danach pruefen BEIDE — der alte mit vier
--   Werten weist 'google' weiterhin ab, waehrend der neue es zuliesse.
--   UND DER LAUF MELDET TROTZDEM ERFOLG: kein Fehler, der Protokoll-Eintrag entsteht,
--   nichts wird rot. Der Fehler zeigte sich erst am Schreibpfad der Scheibe 11.8e — also
--   eine Scheibe spaeter, an einer Stelle, die ihn nicht verursacht hat.
--   DAS IST DER GRUND, WARUM RICHTUNG (b) DER GEGENPROBE NICHT VERHANDELBAR IST: Ein
--   Blick in den Katalog zeigt den neuen Constraint und sieht wie ein Erfolg aus. Erst
--   der Schreibversuch mit einem UNBEKANNTEN Wert zeigt, ob der Schutz wirkt — und erst
--   die Zeilenzahl von Probe 1 (GENAU EINE) schliesst den Doppel-Constraint aus.
--   DER NAME IST VOR DIESEM LAUF GEPRUEFT (CC, 2026-08-27): Migrationsdatei und
--   docs/db-stand.md nennen beide 'project_secrets_target_valid', repo-weit gibt es keine
--   abweichende Schreibweise. Das macht den Fall unwahrscheinlich, nicht unmoeglich —
--   entscheidbar ist er nur an der laufenden DB.
--
-- PRUEFUNG NACH DEM EINSPIELEN — sie ist NICHT optional, weil am Repo NICHT entscheidbar
-- ist, ob diese Datei gelaufen ist:
--   (1) Die Constraint-Definition im WORTLAUT aus pg_constraint ablesen und die FUENF
--       Zielwerte sehen — und dabei auf die ZEILENZAHL achten: GENAU EINE. Zwei Zeilen
--       sind der Doppel-Constraint-Fall oben. Probe:
--       supabase/checks/project-secrets-target-check.sql.
--   (2) DIE VERHALTENS-POSITIVKONTROLLE, in der TRANSAKTIONS-FORM: zwei getrennte
--       begin/rollback-Bloecke, erst der Fehlschlag mit einem unbekannten Wert
--       (ERWARTUNG 23514, check_violation), dann der Erfolg mit 'google'. Die Annahme
--       allein saehe bei einem Constraint, der alles durchlaesst, identisch aus — erst
--       die Abweisung zeigt, dass der Schutz noch da ist.
--       SIE STEHT ALS ANLEITUNG IM KOPF JENER PROBE UND NICHT ALS AUSFUEHRBARE ANWEISUNG
--       DARIN: supabase/checks/ laesst einen Schreibvorgang nur an einem WEGWERF-OBJEKT
--       zu, das die Datei selbst wieder entfernt (harte Regel im README), und
--       project_secrets ist eine bestehende Tabelle, also keines.
--       WARUM TRANSAKTION UND NICHT insert/insert/delete WIE BEI 0022 BIS 0024: Ein
--       rollback ist keine zweite Handlung, die man vergessen kann, und es gibt keine
--       where-Klausel, die zu weit sein koennte. Die Begruendung steht im Kopf der Probe.

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
    check (target in ('meta', 'pinterest', 'tiktok', 'linkedin', 'google'));
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die
-- einen nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0026', '0026_project_secrets_google.sql', now())
on conflict (version) do nothing;
