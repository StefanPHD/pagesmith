-- Phase 11.3, Scheibe 11.3a — DER PROJEKT-EIGENE TESTZUSTAND.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed): der
-- umgekehrte Weg liesse den Resolver zwei Spalten lesen, die es nicht gibt — und zwar
-- auf dem Ingest-Pfad, wo es niemand sieht.
--
-- WAS SIE TUT: ZWEI additive Spalten auf public.project_secrets —
-- test_event_code text und test_mode_expires_at timestamptz, beide nullbar und ohne
-- Default — plus EINEN Paar-CHECK darueber. Sonst NICHTS.
--
-- NO-OP OHNE DEN ZUGEHOERIGEN CODE: Solange kein Lesepfad die Spalten selektiert,
-- aendert diese Datei KEIN Verhalten. Sie ist deshalb gefahrlos frueh einspielbar.
-- Dieselbe Lage wie bei 0026 und 0027.
--
-- WOZU DIE SPALTEN DA SIND, in einem Satz (der Volltext steht in
-- docs/aktiver-stand.md, Abschnitt "Scheibe 11.3a — Der Testzustand und der Riegel im
-- Ingest", und wird hier NICHT verdoppelt): Der Testmodus der Anbieter haengt heute an
-- drei UMGEBUNGSVARIABLEN und gilt damit fuer das ganze Deployment — fuer alle Projekte
-- gleichzeitig oder fuer keines. Diese Spalten geben ihm die Reichweite je
-- (Projekt, Ziel).
--
-- WARUM SPALTEN AUF DIESER TABELLE UND KEINE EIGENE (Owner-Entscheidung, 2026-09-09,
-- Stufe 1 der Scheibe) — der Grund gehoert hierher, sonst wird die Wahl beim naechsten
-- Aufraeumen als Bequemlichkeit gelesen: Der Resolver (getCapiConfigByTrackingKey in
-- src/lib/capi/token.ts) liest project_secrets bereits in seiner ZWEITEN Abfrage. Zwei
-- Spalten mehr sind eine SPALTE, KEINE RUNDE — dieselbe Bauform, in der blocked_at,
-- ab_test_active und secret_enc hinzugekommen sind. Eine eigene Tabelle kostete eine
-- DRITTE Datenbank-Runde JE BEACON, auf dem Pfad, den jeder Besucher jeder Kundenseite
-- trifft (CLAUDE.md, /API/E-SCHLANKHEIT).
--
-- WARUM timestamptz UND KEIN BOOLEAN: Aktiv heisst "der Ablaufzeitpunkt liegt in der
-- Zukunft", nicht "ein Schalter steht auf wahr". Eine Frist laeuft von allein ab; ein
-- Boolean bleibt haengen. Der Riegel dieser Scheibe nimmt ein Ereignis im Testmodus aus
-- events heraus — bleibt der Testmodus haengen, hoert die Analytics des Kunden STILL auf
-- zu zaehlen, waehrend der Anbieter weiterzaehlt. Die Frist deckelt genau dieses blinde
-- Fenster.
--
-- WELCHE UHR ES AUSWERTET, und das ist eine ENTSCHEIDUNG und keine Nebenwirkung: NICHT
-- diese Datenbank. Der Resolver vergleicht den Wert gegen die Uhr der Laufzeit, weil er
-- fuer Uhr 1 (Zugangsdatum) und Uhr 2 (Erneuerungs-Token) ohnehin GENAU EINMAL
-- Date.now() liest und alle drei Fristen denselben Bezugspunkt haben muessen. Ein
-- SQL-Filter "> now()" in der zweiten Abfrage schiede ausserdem die ZEILE aus und nicht
-- nur ihren Testmodus — der Empfaenger fiele mit weg.
-- DIE FOLGE, BENANNT: Weichen DB-Uhr und Laufzeit-Uhr voneinander ab, verschiebt sich
-- die effektive Dauer um genau diese Differenz, in beide Richtungen und still. Bei einer
-- Frist von Stunden ist das folgenlos. ES WAERE NICHT FOLGENLOS bei einer Frist im
-- Sekunden- oder Minutenbereich; wer die LAENGE der Frist festlegt (Scheibe 11.3b),
-- liest diesen Absatz zuerst.
--
-- KEINE POLICY: project_secrets behaelt RLS aktiv und NULL Policies. Das ist die
-- TRAGENDE Kontrolle dieser Tabelle und keine Luecke — unter aktiver RLS ohne jede
-- Policy ist sie fuer anon und authenticated vollstaendig verschlossen, nur service_role
-- kommt durch. Wer hier eine Policy ergaenzt, gewinnt keinen Schutz, sondern dessen
-- Anschein.
-- GELESEN 2026-09-09, supabase.com/docs/guides/database/postgres/row-level-security,
-- Abschnitte "What a policy does" und "Bypassing Row Level Security", woertlich: "Once
-- RLS is enabled, no data is accessible through the API when using a publishable key,
-- until you create policies" und "service_role: Full access. It bypasses RLS, so keep it
-- server-side". FOLGE FUER DEN BAU: bestaetigt die bestehende Lage, aendert nichts.
--
-- KEIN BACKFILL: Beide Spalten sind nullbar und ohne Default. Es steht kein
-- "update ... set" in dieser Datei, und keine bestehende Zeile wird angefasst. NULL in
-- beiden Spalten heisst "kein Testzustand" und ist damit die Anlage.
--
-- KEIN INDEX. Die Auflage aus docs/db-stand.md gilt woertlich ("Wer hier spaeter einen
-- Index ergaenzt, sollte vorher einen Zugriff nennen koennen, der ihn braucht"): Der
-- Lesepfad trifft die Zeile bereits ueber project_secrets_project_id_target_key
-- (Gleichheit auf project_id und target); der Ablaufzeitpunkt ist ein RESTPRAEDIKAT auf
-- einer schon eindeutig getroffenen Zeile und wird ausserdem gar nicht in SQL
-- ausgewertet, sondern in der Laufzeit. Es liess sich also kein Zugriff nennen.
--
-- KEIN updated_at IN DIESER DATEI: Der Row-Trigger project_secrets_set_updated_at fuehrt
-- es nach. Er ist an dieselbe Funktion set_updated_at gebunden wie projects und
-- project_tokens und traegt tgenabled = 'O', also aktiv (GEMESSEN 2026-08-26,
-- SQL-Editor, Owner — docs/db-stand.md).
--
-- 0021 BIS 0027 WERDEN NICHT UMGESCHRIEBEN. Eine angewandte Migration dokumentiert, was
-- TATSAECHLICH in der DB gelaufen ist; sie im Nachhinein zu aendern entkoppelt die Datei
-- von dem, was die DB traegt.
--
-- ---------------------------------------------------------------------------
-- EINE KOPPLUNG, DIE HIER BENANNT WIRD, WEIL SIE SONST SPAETER ALS FEHLER GESUCHT WIRD:
-- Der bestehende CHECK project_secrets_secret_genau_eines verlangt, dass JEDE Zeile
-- GENAU EIN Geheimnis traegt. EIN TESTZUSTAND KANN DAMIT NUR DORT LIEGEN, WO BEREITS
-- ZUGANGSDATEN HINTERLEGT SIND. Das ist gewollt — ein Testmodus ohne Zugangsdaten
-- sendet nichts, es gaebe nichts zu pruefen —, aber es ist eine Festlegung: Die
-- Oberflaeche der Scheibe 11.3b darf den Schalter nur an KONFIGURIERTEN Zielen
-- anbieten.
--
-- ---------------------------------------------------------------------------
-- WAS DIE GUARDS LEISTEN UND WAS NICHT:
--
--   (S1)/(S2) SPALTEN — "if not exists" prueft die SACHE: genau diese Spalte auf genau
--   dieser Tabelle. Kein Constraint-Name kommt darin vor.
--   WARUM DIESER ANKER VORHER VON NACHHER TRENNT: Vor dem Lauf gibt es KEINE Spalte
--   dieses Namens auf dieser Tabelle, nach dem Lauf GENAU EINE, und sie ist die, die der
--   Lauf angelegt hat. Ein zweites Objekt desselben Namens mit ANDERER Bedeutung kann
--   nicht entstehen — Name und Tabelle bestimmen eine Spalte eindeutig. Das ist der
--   Unterschied zu 0025, wo nach dem Lauf wieder ein Constraint namens
--   project_secrets_pkey existierte, nur auf einer anderen Spalte: dort haette ein
--   Namens-Guard beim zweiten Lauf den NEUEN Schluessel gedroppt.
--
--   (S3) DER CHECK — Katalog-Guard auf conname UND conrelid, Bauform woertlich nach
--   0025 (S3). "add constraint" kennt kein "if not exists", deshalb der Guard.
--   AUCH ER TRENNT VORHER VON NACHHER, und aus demselben Grund wie oben: Diesen Namen
--   traegt vor dem Lauf nichts, nach dem Lauf genau dieser CHECK, und ein anderes Objekt
--   kann ihn auf DIESER Tabelle nicht belegen. Der zweite Lauf ist damit ein echtes
--   No-op und kein stiller Rueckbau.
--
--   WAS SIE NICHT LEISTEN, UND DAS IST DER TEIL, DEN MAN SPAETER VERGISST: SIE PRUEFEN
--   DEN NAMEN, NICHT DEN TYP UND NICHT DIE BEDINGUNG. Existierte bereits eine Spalte
--   test_event_code mit anderem Typ, griffe "if not exists" — die Migration meldete
--   ERFOLG, und die abweichende Spalte bliebe stehen. Der Fehler zeigte sich erst am
--   Lesepfad, also eine Runde spaeter, an einer Stelle, die ihn nicht verursacht hat.
--   DAS IST DER GRUND, WARUM DIE PRUEFUNG UNTEN DEN WORTLAUT ABLIEST UND NICHT DIE
--   ANWESENHEIT.
--
-- ---------------------------------------------------------------------------
-- PRUEFUNG NACH DEM EINSPIELEN — sie ist NICHT optional, weil am Repo NICHT entscheidbar
-- ist, ob diese Datei gelaufen ist (docs/immer-beachten.md, "OB EINE MIGRATION IN DER
-- LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT ENTSCHEIDBAR"):
--
--   (1) TYP UND NULLBARKEIT IM WORTLAUT ABLESEN — nicht die Anwesenheit.
--       Erwartet: test_event_code -> data_type "text", is_nullable "YES",
--       column_default leer; test_mode_expires_at -> data_type
--       "timestamp with time zone", is_nullable "YES", column_default leer.
--       DIE ZEILENZAHL GEHOERT ZUR PRUEFUNG: GENAU ZWEI.
--
--       select column_name, data_type, is_nullable, column_default
--       from information_schema.columns
--       where table_schema = 'public'
--         and table_name   = 'project_secrets'
--         and column_name in ('test_event_code', 'test_mode_expires_at')
--       order by column_name;
--
--   (2) DER CHECK IM WORTLAUT, UND GENAU EINMAL. Zwei Zeilen waeren der
--       Doppel-Constraint-Fall: der Guard haette bei einem falschen Namen nicht
--       gegriffen, das add legte einen ZWEITEN an, WAEHREND DER LAUF ERFOLG MELDET.
--
--       select con.conname, pg_get_constraintdef(con.oid)
--       from pg_constraint con
--       where con.conrelid = 'public.project_secrets'::regclass
--         and con.conname  = 'project_secrets_test_mode_paar';
--
--   (3) KEINE POLICY IST ENTSTANDEN: die Zahl der Policies auf project_secrets bleibt
--       NULL. Diese Datei legt keine an; die Probe ist die Gegenkontrolle dazu.
--
--       select count(*) from pg_policies
--       where schemaname = 'public' and tablename = 'project_secrets';

set lock_timeout = '3s';

do $$
begin
  -- (S1) DER TESTCODE. Nullbar, ohne Default. Er ist der Wert, den der Kunde in der
  --      Oberflaeche seines Anbieters abliest und der in die NUTZLAST des Aufrufs
  --      wandert (meta und tiktok: das Feld test_event_code, top-level neben data).
  --      KEIN CHECK AUF DIE FORM: Der Anbieter vergibt ihn, wir kennen seine Grammatik
  --      nicht, und ein geratener CHECK wiese eines Tages einen gueltigen Code ab.
  alter table public.project_secrets
    add column if not exists test_event_code text;

  -- (S2) DER ABLAUFZEITPUNKT. Nullbar, ohne Default. NULL heisst "kein Testzustand";
  --      ein Wert in der VERGANGENHEIT heisst dasselbe, nur ist er von allein dorthin
  --      gelangt. Genau das ist der Zweck der Frist.
  alter table public.project_secrets
    add column if not exists test_mode_expires_at timestamptz;

  -- (S3) BEIDE ODER KEINES. Bauform woertlich nach projects_variant_b_pair (0016):
  --      EINE Aussage ueber die Null-Zustaende zweier Spalten, nicht zwei getrennte
  --      Bedingungen. "=" auf zwei Wahrheitswerten ist wahr, wenn sie uebereinstimmen.
  --      WAS ER VERHINDERT, und beide Haelften sind echte Schaeden:
  --       - Code ohne Frist waere ein Zustand, der nie aktiv wird — ein Kunde traegt
  --         seinen Code ein und wundert sich, dass nichts geschieht.
  --       - Frist ohne Code waere der teurere Fall: der Riegel feuerte, das Ereignis
  --         verschwaende aus events, UND der Anbieter bekaeme keine Test-Markierung.
  --         Reiner Datenverlust ohne Gegenwert.
  --      DER ZUKUENFTIGE PREIS IST BENANNT: Pinterests Testmodus ist ein
  --      QUERY-PARAMETER ohne Code. Nimmt eine spaetere Scheibe pinterest auf, muss
  --      "Frist ohne Code" erlaubt werden — dann wird dieser CHECK ERSETZT, in einer
  --      eigenen Migration, nicht hier nachtraeglich geaendert.
  --      Katalog-Guard mit conrelid gegen die konkrete Tabelle, damit er nicht auf
  --      einen gleichnamigen Constraint einer anderen Tabelle trifft.
  if not exists (
    select 1
    from pg_constraint
    where conname  = 'project_secrets_test_mode_paar'
      and conrelid = 'public.project_secrets'::regclass
  ) then
    alter table public.project_secrets
      add constraint project_secrets_test_mode_paar
      check ((test_event_code is null) = (test_mode_expires_at is null));
  end if;
end $$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018, docs/db-regeln.md): entsteht
-- nur bei erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile,
-- die einen nie vollzogenen Lauf behauptet.
-- PROTOKOLL, KEIN STEUERUNGSMECHANISMUS: Es gibt keinen Migrations-Runner, der aus
-- schema_migrations liest, und es soll keinen geben.
insert into public.schema_migrations (version, filename, applied_at)
values ('0028', '0028_project_secrets_test_mode.sql', now())
on conflict (version) do nothing;
