-- ZWECK:       Erhebt den KOMPLETTEN Ist-Zustand des public-Schemas — durchnummeriert
--              von PROBE 1 bis PROBE 10, mit PROBE 1b als Zusatz zu PROBE 1. HIER STEHT
--              BEWUSST KEINE ANZAHL: sie faellt mit jeder neuen Probe, und wegen der 1b
--              stimmt sie ohnehin nie mit der hoechsten Nummer ueberein. Gemessen
--              werden: Migrations-Protokoll (inkl. Luecklosigkeit), Spalten,
--              Constraints, RLS/Policies, Grants, Indizes, Funktionen, Event-Trigger
--              UND Row-Trigger. Das ist die
--              Quelle fuer die Sektion "## Aktueller DB-/Analytics-Stand" in
--              docs/db-stand.md. Ohne diese Datei wurde die Sektion aus dem Gedaechtnis und
--              aus den Migrations-DATEIEN geschrieben — und hing dadurch drei
--              Migrationen zurueck und behauptete "ALLE Spalten NOT NULL" bei
--              events, obwohl variant seit 0017 NULLABLE ist.
-- ERWARTUNG:   Je Probe unten als eigener Kommentar. Weicht ein Wert ab, ist das ein
--              echter Fund — entweder ist eine Migration nicht gelaufen, oder die
--              Doku-Sektion ist veraltet. Beides ist berichtenswert, keines wird
--              stillschweigend angeglichen.
-- WANN:        Vor jedem Schreiben der DB-Stand-Sektion, und nach JEDER Migration,
--              die Spalten, Constraints oder Policies beruehrt.
-- PLATZHALTER: keine.
-- FALLE:       schema_migrations existiert DREIMAL im Cluster (public / auth /
--              realtime). Jede Katalog-Abfrage MUSS das Schema filtern — sonst
--              liefert sie drei Zeilen mit unterschiedlichen RLS-Werten und sieht
--              wie ein Befund aus. Probe 9 ist die BEWUSSTE Ausnahme: Event-Trigger
--              sind cluster-weit und haben kein Schema.
-- VERIFIZIERT: ZULETZT GEFAHREN 2026-08-05, nach Migration 0021; die Ergebnisse dieses
--              Laufs stehen in docs/db-stand.md "## Aktueller DB-/Analytics-Stand". Mit
--              DIESEM Lauf sind die ERWARTUNGEN unten auf den Stand nach 0021 gezogen
--              (Proben 1, 1b, 3, 4, 6).
--              KEINE TREFFERBILANZ FUER DEN 2026-08-05-LAUF: gemeldet wurden WERTE,
--              nicht "alle Proben trafen ihre Erwartung". Hier steht deshalb keine —
--              eine erfundene Bilanz waere schlimmer als gar keine.
--              FRUEHERER LAUF, historisch: 2026-07-30 — ALLE ZEHN Proben trafen ihre
--              ERWARTUNG exakt, KEINE Abweichung. Diese Bilanz gilt fuer JENEN Lauf
--              und jene Erwartungen, nicht fuer die heutigen.
--              PROBE 2 UND PROBE 7 SIND SEITHER AUF project_secrets ERWEITERT (die
--              Tabellenliste ihrer Abfrage trug sie vorher nicht, die neue Tabelle war
--              damit von KEINER Probe auf Spalten und Indizes erfasst). Ihre
--              ERWARTUNGEN sind gegen den Lauf vom 2026-08-05 formuliert, aber IN
--              DIESER FORM NOCH NICHT GEFAHREN — fuer die erweiterten Proben gibt es
--              also KEIN Verifiziert-Datum. Wer sie das erste Mal faehrt, traegt es
--              hier nach.
-- NACHTRAG:    DERSELBE TAG TRAEGT ZWEI VERSCHIEDENE EREIGNISSE, die nicht
--              ineinanderfallen duerfen: VORMITTAGS wurde nur der Query-TEXT dieser
--              Datei auf 0019/0020 nachgezogen (Probe 1 ERWARTUNG, neue Probe 1b,
--              Probe 2/7/8 ERWARTUNG) — OHNE DB-Verbindung, da diese Umgebung keine
--              Postgres-Direktverbindung hat (keine DATABASE_URL, keine verlinkte CLI,
--              keine generische SQL-Ausfuehrungs-RPC; s. Aufklärungsbericht). ERST
--              DANACH, am selben Tag, hat Stefan die so aktualisierten Proben ECHT im
--              SQL-Editor gefahren — das ist der Lauf, den VERIFIZIERT oben datiert.
-- NACHTRAG 2026-08-26 — DAS INSTRUMENT IST REPARIERT WORDEN, BEVOR ES GEFAHREN WIRD.
--              Der Anlass: Migration 0025 ist am 2026-08-26 gelaufen, und mehrere
--              ERWARTUNGEN dieser Datei waren danach falsch. EINE ERWARTUNG MIT
--              FALSCHEM WERT MISST NICHT — sie bestaetigt eine ueberholte Annahme oder
--              meldet einen Fehlalarm; PROBE 7 haette einen zweiten Index ausdruecklich
--              als "Befund" gemeldet, obwohl 0025 ihn absichtlich angelegt hat.
--              GEAENDERT WURDEN AUSSCHLIESSLICH ERWARTUNG-FELDER (Proben 1, 1b, 2, 3,
--              7) — KEINE einzige Abfrage ist angefasst worden. NEU ist PROBE 10.
--              DIE URSACHEN STEHEN JE STELLE DABEI und sind bewusst nicht
--              zusammengezogen: Proben 2, 3 (Primaerschluessel) und 7 sind durch 0025
--              ueberholt; Proben 1, 1b und der target-CHECK in Probe 3 waren schon
--              vorher falsch — seit 0022 (2026-08-07). Wer alles als Folge von 0025
--              verbucht, schreibt sich eine Ursache auf, die nicht stimmt.
--              KEIN VERIFIZIERT-DATUM FUER DIESE FASSUNG: Die geaenderten Erwartungen
--              sind gegen den Lauf vom 2026-08-26 formuliert (die Werte stehen in
--              docs/aktiver-stand-11.8.md, Vermerk 2), IN DIESER FORM aber noch nicht
--              gefahren. Wer sie das erste Mal faehrt, traegt es oben nach.

-- PROBE 1 — Migrations-Protokoll
-- ERWARTUNG: SO VIELE ZEILEN, WIE MIGRATIONEN ANGEWANDT SIND — die Zahl steht hier
--            BEWUSST NICHT. Sie faellt mit jeder Migration, und eine gefallene Zahl in
--            einer ERWARTUNG ist schlimmer als keine: sie ist das Abbruchkriterium
--            dessen, der die Probe faehrt.
--            WAS DAUERHAFT GILT und deshalb hier steht: '0001' ist die niedrigste
--            Nummer. applied_at traegt bei '0001' bis '0017' NULL — sie sind ein
--            BACKFILL aus 0018, KEIN Vollzugsnachweis. AB '0018' ist applied_at
--            gefuellt (Protokoll-Pflicht ab 0018; jede spaetere Migration traegt den
--            Insert selbst mit). Eine Luecke in dieser Regel ist ein Befund: eine Zeile
--            ab 0018 OHNE applied_at heisst, dass jemand den Protokoll-Insert
--            weggelassen hat.
--            ERSETZT AM 2026-08-26. VORHER stand hier "EINUNDZWANZIG Zeilen ('0001' bis
--            '0021'). applied_at ist bei VIER Zeilen gefuellt". URSACHE: NICHT 0025 —
--            die Angabe war schon seit 0022 (2026-08-07) falsch und ist durch 0023,
--            0024 und 0025 weiter gewandert. Wer sie als Folge von 0025 verbucht,
--            schreibt sich eine Ursache auf, die nicht stimmt.
select version, filename, applied_at
from public.schema_migrations
order by version;

-- PROBE 1b — Luecklosigkeit der Migrationsnummern
-- ERWARTUNG: eine Zeile, luecke = false, niedrigste = '0001'. Zusammen mit
--            anzahl_zeilen = erwartete_anzahl beweist das die Luecklosigkeit rein
--            arithmetisch (Zeilenzahl = Spannweite+1), OHNE die Werte einzeln
--            abzutippen. Die zweite Abfrage listet im Fehlerfall die FEHLENDEN Nummern
--            explizit, statt nur "luecke = true" zu melden.
--            DIE HOECHSTE NUMMER STEHT HIER BEWUSST NICHT: sie ist die der juengsten
--            angewandten Migration und faellt mit der naechsten. Fuer die
--            Luecklosigkeit ist sie nicht tragend — die Rechnung braucht sie, der
--            Leser nicht. Was der Leser mit ihr tut: gegen das Repo halten
--            (supabase/migrations/) und eine Abweichung als Befund behandeln — sie
--            hiesse, dass eine geschriebene Migration nicht gelaufen ist.
--            ERSETZT AM 2026-08-26. VORHER stand hier "hoechste = '0021'". URSACHE:
--            NICHT 0025 — schon seit 0022 (2026-08-07) falsch, durch 0025 weiter.
select
  min(version)                                  as niedrigste,
  max(version)                                  as hoechste,
  count(*)                                       as anzahl_zeilen,
  (max(version::int) - min(version::int) + 1)    as erwartete_anzahl_bei_luecklos,
  count(*) <> (max(version::int) - min(version::int) + 1) as luecke
from public.schema_migrations;

-- Nur bei Bedarf (luecke = true oben): zeigt die fehlenden Nummern konkret.
select gs.nr
from generate_series(
       (select min(version::int) from public.schema_migrations),
       (select max(version::int) from public.schema_migrations)
     ) as gs(nr)
where not exists (
  select 1 from public.schema_migrations sm where sm.version::int = gs.nr
)
order by gs.nr;

-- PROBE 2 — Spalten von projects + events + project_secrets
-- ERWARTUNG: events traegt SIEBEN Spalten — id, project_id, event_type, event_id,
--            source, created_at (alle NOT NULL) plus variant (NULLABLE, 0017).
--            projects traegt u.a. tracking_key, html_b, mappings_b (alle NULLABLE),
--            ab_test_active (NOT NULL, default false), ab_test_started_at
--            (NULLABLE, KEIN Default, 0020), settings (NOT NULL, '{}').
--            project_secrets (0021, umgebaut durch 0025) traegt diese Spalten — die
--            ZAHL steht hier bewusst nicht, sie faellt mit jeder additiven Spalte.
--            DIE REIHENFOLGE IST DIE GEMESSENE, nicht die logische, und das ist
--            Absicht: Die Abfrage sortiert nach ordinal_position: wer Zeile fuer Zeile
--            vergleicht, soll nicht stolpern.
--              1 project_id  uuid,        NULLBAR   (seit 0025)
--              2 target      text,        NOT NULL
--              3 secret      text,        NULLBAR   (seit 0025)
--              4 created_at  timestamptz, NOT NULL, Default now()
--              5 updated_at  timestamptz, NOT NULL, Default now()
--              6 secret_enc  text,        NULLBAR   (0025)
--              7 id          uuid,        NOT NULL, Default gen_random_uuid()  (0025)
--            WARUM DER SCHLUESSEL HINTEN STEHT und nicht vorn, wo man ihn suchte:
--            "alter table ... add column" haengt HINTEN an. secret_enc und id sind die
--            beiden Spalten, die 0025 angefuegt hat, in genau der Reihenfolge, in der
--            die Migration sie anlegt. EINE SPALTENREIHENFOLGE IST KEIN ENTWURF,
--            SONDERN EIN ABLAGERUNGSPROFIL — sie erzaehlt die Geschichte der Tabelle,
--            nicht ihre Ordnung. Wer sie "aufraeumt", braucht dafuer eine neue Tabelle.
--            DIE DREI NULLBAREN SIND KEINE AUFWEICHUNG, sondern je eine Entscheidung:
--            secret und secret_enc tragen zusammen GENAU EINEN Wert (der CHECK dazu
--            steht in Probe 3), project_id haelt die Eigentums-Achse offen.
--            KEINE user_id-Spalte: die Alt-Tabelle project_tokens fuehrt sie nur, um
--            ihre WITH-CHECK-Policies zu bedienen; ohne Policies haette sie hier
--            keinen Zweck (s. den Kommentarkopf von 0021). DER SATZ BLEIBT WAHR, SEINE
--            BEGRUENDUNG IST SEIT 0025 BEDINGT: Der Loeschpfad ruhte darauf, dass die
--            Kette auth.users -> projects -> project_secrets ueber project_id traegt;
--            eine Zeile OHNE Projekt haengt daran nicht mehr. Volltext:
--            docs/offene-punkte.md, "EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER
--            KASKADE".
--            WAS DIE PROBE ZEIGEN SOLL, statt es zu behaupten: Ob die DB die Form oben
--            wirklich traegt, ist genau die Frage dieser Probe — deshalb steht sie hier
--            als Soll, nicht als Befund.
--            ERSETZT AM 2026-08-26. VORHER stand hier "traegt FUENF Spalten — project_id
--            (uuid), target (text), secret (text), created_at, updated_at" und
--            "Migration 0021 legt alle fuenf Spalten NOT NULL an". URSACHE: 0025
--            (2026-08-26).
select table_name, ordinal_position, column_name, data_type,
       is_nullable, column_default
from information_schema.columns
where table_schema = 'public'
  and table_name in ('projects', 'events', 'project_secrets')
order by table_name, ordinal_position;

-- PROBE 3 — Constraints (Schema-gefiltert)
-- ERWARTUNG: events_event_type_max_len, events_variant_valid (variant IS NULL OR
--            variant IN ('a','b')), projects_variant_b_pair,
--            projects_ab_test_needs_variant_b. KEIN Unique auf events.event_id —
--            die geteilte browser/server-eventID IST der Verlustraten-Join.
--            DAZU die Constraints von project_secrets (0021, umgebaut durch 0025). Die
--            Abfrage ist SCHEMA-weit, also tauchen sie hier auf — ohne diesen Zusatz
--            saehen sie wie ein Fund aus:
--            · project_secrets_pkey — PRIMARY KEY auf der EINSPALTIGEN id. Es darf
--              GENAU EINEN Constraint mit contype 'p' geben.
--            · project_secrets_project_id_target_key — UNIQUE auf (project_id, target).
--              SEINE DEFINITION MUSS DEN WORTLAUT "NULLS NOT DISTINCT" TRAGEN. Fehlt
--              er, ist das kein Schoenheitsfehler: dann waeren zwei Zeilen mit
--              project_id IS NULL und demselben Ziel BEIDE erlaubt.
--            · project_secrets_secret_genau_eines — CHECK ueber die Null-Zustaende von
--              secret und secret_enc.
--            · project_secrets_target_valid — CHECK, der die erlaubten Ziele
--              AUFZAEHLT. WELCHE es sind, sagt der Lauf und nicht diese Zeile: die
--              Liste waechst mit jedem Fan-Out-Ziel, und jedes bringt seine eigene
--              Constraint-Erweiterung mit (s. docs/immer-beachten.md, "JEDES WEITERE
--              FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT"). Wer hier
--              eine feste Liste hinschreibt, schreibt sie beim naechsten Ziel neu.
--            · der Fremdschluessel auf projects(id) ON DELETE CASCADE. Seinen Namen
--              vergibt Postgres selbst; er lautet project_secrets_project_id_fkey —
--              GEMESSEN am 2026-08-26 und deshalb nennbar. Die drei Namen darueber
--              vergibt 0025 ausdruecklich.
--            ERSETZT AM 2026-08-26, mit ZWEI VERSCHIEDENEN URSACHEN, die nicht
--            ineinanderfallen duerfen: Dass der Primaerschluessel als
--            "ZUSAMMENGESETZT (project_id, target)" dastand, ist durch 0025
--            (2026-08-26) ueberholt. Dass der target-CHECK als "target = 'meta'"
--            dastand, war schon vorher falsch — seit 0022 (2026-08-07), weiter durch
--            0023 und 0024. Und der Satz "Deren Namen vergibt Postgres selbst" stimmte
--            fuer alle drei nur bis 0025; heute trifft er nur noch den Fremdschluessel.
select rel.relname as tabelle, con.conname,
       pg_get_constraintdef(con.oid) as definition
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
order by rel.relname, con.conname;

-- PROBE 4 — Tabellen, RLS-Status, Policy-Anzahl
-- ERWARTUNG: SIEBEN Tabellen (projects, domains, project_tokens, events, audit_logs,
--            schema_migrations, project_secrets), ALLE mit rls_aktiv = true.
--            Policy-Zahlen: projects 4, domains 3, project_tokens 2, events 1,
--            audit_logs 0, schema_migrations 0, project_secrets 0. Summe ZEHN — die
--            neue Tabelle traegt KEINE Policy und aendert die Summe deshalb nicht.
--            Die Null-Werte sind Absicht, kein Versaeumnis (s. "APPEND-ONLY-TABELLEN
--            BLEIBEN POLICY-FREI" — die Regel nennt project_secrets bewusst nicht in
--            ihrer Aufzaehlung, s. den Satz am Ende jener Regel).
--            BEI project_secrets IST DIE NULL DIE TRAGENDE KONTROLLE: unter aktiver
--            RLS ohne JEDE Policy ist die Geheimnis-Tabelle fuer anon und
--            authenticated vollstaendig verschlossen. Steht hier je eine Zahl > 0,
--            ist das KEIN Fortschritt, sondern ein Befund.
select rel.relname as tabelle,
       rel.relrowsecurity as rls_aktiv,
       count(pol.polname) as policies
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
left join pg_policy pol on pol.polrelid = rel.oid
where nsp.nspname = 'public'
  and rel.relkind = 'r'
group by rel.relname, rel.relrowsecurity
order by rel.relname;

-- PROBE 5 — Policies im Wortlaut
-- ERWARTUNG: project_tokens traegt KEINE SELECT-Policy (write-only-Gate auf den
--            CAPI-Token), domains KEINE DELETE-Policy. NUR events_select_own kapselt
--            (select auth.uid()); projects/domains/project_tokens tragen blankes
--            auth.uid() — bekannte Abweichung, reiner Performance-Punkt, KEIN Leak.
select tablename, policyname, cmd, qual, with_check
from pg_policies
where schemaname = 'public'
order by tablename, policyname;

-- PROBE 6 — Rollen-Grants
-- ERWARTUNG: anon, authenticated UND service_role haben volle DML-Rechte auf ALLE
--            SIEBEN Tabellen, inkl. project_tokens, schema_migrations UND
--            project_secrets. Das ist der Supabase-Default und wird NICHT als
--            Schutzschicht gelesen: Isolation und write-only-Gate tragen
--            ausschliesslich ueber RLS. Bei project_secrets ist der Kontrast am
--            schaerfsten — volle Grants, und trotzdem verschlossen, weil keine
--            einzige Policy existiert.
select table_name, grantee,
       string_agg(privilege_type, ', ' order by privilege_type) as rechte
from information_schema.role_table_grants
where table_schema = 'public'
  and grantee in ('anon', 'authenticated', 'service_role')
group by table_name, grantee
order by table_name, grantee;

-- PROBE 7 — Indizes auf events, projects, domains, project_secrets
-- ERWARTUNG: events_pkey, events_project_id_idx, events_project_event_idx — KEIN
--            Index auf variant (0017 legte bewusst keinen an). projects_pkey,
--            projects_tracking_key_key (partial unique), projects_blocked_idx
--            (partial, traegt den Kill-Switch-Lookup) — KEIN Index auf
--            ab_test_started_at (0020: ein Zeilen-Lookup pro Auswertung ueber den
--            PK, nie gefiltert/sortiert). domains_pkey auf LABEL (nicht id),
--            domains_custom_host_key (partial unique), domains_project_id_idx.
--            project_secrets: ZWEI Eintraege, beide von 0025 benannt —
--            project_secrets_pkey auf der einspaltigen id, und
--            project_secrets_project_id_target_key auf (project_id, target), dessen
--            indexdef den Wortlaut "NULLS NOT DISTINCT" tragen muss.
--            DIE AUFLAGE GILT UNVERAENDERT WEITER, und sie ist der eigentliche Inhalt
--            dieser Erwartung: WER HIER EINEN INDEX ERGAENZT, SOLLTE VORHER EINEN
--            ZUGRIFF NENNEN KOENNEN, DER IHN BRAUCHT.
--            WAS SICH GEAENDERT HAT, IST IHR TRAEGER, NICHT SIE SELBST: Bis 0025 trug
--            der PRIMAERSCHLUESSEL den Zugriff des Lesepfads — eine Gleichheit auf
--            BEIDEN Spalten. Seit 0025 liegt der PK auf id und traegt ihn NICHT mehr;
--            getragen wird er jetzt vom UNIQUE-Constraint.
--            DER ZWEITE EINTRAG ERFUELLT DIE AUFLAGE BEREITS — der Satz gehoert
--            hierher, sonst liest der naechste Leser ihn als genau den Verstoss, vor
--            dem die Auflage warnt: Sein Zugriff ist nennbar, und zwar zweifach — der
--            Arbiter des upsert (on_conflict auf beide Spalten, GEMESSEN 2026-08-25,
--            im Live-Test am 2026-08-26 bestaetigt) und die Gleichheit auf beiden
--            Spalten im Lesepfad (getCapiConfigByTrackingKey).
--            WER EINEN DRITTEN EINTRAG SIEHT, hat deshalb keinen automatischen Befund,
--            sondern eine FRAGE: Laesst sich sein Zugriff nennen? Wenn nein, ist es
--            einer.
--            ERSETZT AM 2026-08-26. VORHER stand hier "GENAU EIN Eintrag" und, als
--            Begruendung, "Der PK traegt genau den Zugriff des Lesepfads". URSACHE:
--            0025 (2026-08-26). BEIDES war ueberholt, und das zweite ist das teurere:
--            eine ERWARTUNG mit falscher Zahl meldet einen Fehlalarm, eine mit
--            gekippter BEGRUENDUNG laesst den naechsten Leser die falsche Sache
--            reparieren.
select tablename, indexname, indexdef
from pg_indexes
where schemaname = 'public'
  and tablename in ('events', 'projects', 'domains', 'project_secrets')
order by tablename, indexname;

-- PROBE 8 — Funktionen in public
-- ERWARTUNG: FUENF. get_event_counts + get_adblock_loss + get_variant_counts
--            (0019, ERSETZT durch 0020 — Signatur/Rueckgabetyp byte-gleich, nur der
--            Zeitfilter ist neu) + set_updated_at sind INVOKER mit
--            search_path=public. rls_auto_enable ist die EINZIGE SECURITY DEFINER
--            und traegt search_path=pg_catalog — das ist KORREKT und darf nicht auf
--            public "korrigiert" werden (s. "DB-FUNKTIONEN + SEARCH_PATH").
select p.proname,
       case p.prosecdef when true then 'DEFINER' else 'INVOKER' end as sicherheit,
       p.provolatile as volatilitaet,
       p.proconfig as set_klauseln
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
order by p.proname;

-- PROBE 9 — Event-Trigger (cluster-weit, bewusst KEIN Schema-Filter)
-- ERWARTUNG: SIEBEN. ensure_rls (ddl_command_end -> rls_auto_enable, owner postgres,
--            aktiviert) plus SECHS Supabase-Plattform-Trigger (owner supabase_admin).
--            Fehlt ensure_rls, ist das Schutznetz gegen RLS-lose neue Tabellen weg.
select et.evtname, et.evtevent, et.evtenabled,
       p.proname as funktion,
       pg_get_userbyid(et.evtowner) as owner
from pg_event_trigger et
join pg_proc p on p.oid = et.evtfoid
order by et.evtname;

-- PROBE 10 — ROW-Trigger in public (nicht zu verwechseln mit Probe 9)
-- ZWECK DIESER PROBE, und sie schliesst eine Luecke, die AELTER IST ALS 0025:
--            docs/db-stand.md behauptet seit dem 2026-08-05, dass project_secrets,
--            projects und project_tokens an DIESELBE Funktion set_updated_at gebunden
--            sind und dass es KEINE zweite Implementierung gibt. GEMESSEN wurde diese
--            Behauptung nie: Probe 8 misst die FUNKTION, Probe 9 misst EVENT-Trigger
--            (pg_event_trigger, cluster-weit) — die BINDUNG einer Funktion an eine
--            Tabelle misst keine von beiden. Die Aussage stand damit ungemessen in
--            einer Datei, die sich ausschliesslich aus Messungen fortschreibt.
--            DIE LUECKE IST NICHT DURCH 0025 ENTSTANDEN. 0025 hat sie nur sichtbar
--            gemacht, weil das Nachziehen jener Datei den Block anfasst, in dem die
--            Trigger-Zeile steht. Wer sie als Folge von 0025 verbucht, datiert sie
--            zwanzig Tage zu spaet.
-- ERWARTUNG: KEINE — und das ist der benannte Fall aus dem README ("eine Probe, die
--            eine OFFENE FRAGE ENTSCHEIDET, hat keine Erwartung"). WELCHE Row-Trigger
--            es gibt, sagt der Lauf; hier stuende sonst aus dem Gedaechtnis, was zu
--            messen ist.
--            WAS ABZULESEN IST, je Zeile: tabelle + tgname (welcher Trigger wo),
--            funktion (an WAS er gebunden ist — hier entscheidet sich die Behauptung
--            "KEINE zweite Implementierung": stehen mehrere Zeilen mit VERSCHIEDENEN
--            Funktionsnamen fuer denselben Zweck da, ist die Behauptung falsch),
--            aktiviert (siehe FALLE) und definition (Zeitpunkt und Ereignis stehen
--            darin).
--            WARUM ZEITPUNKT UND EREIGNIS NICHT ALS EIGENE SPALTEN: Sie stecken in der
--            Bitmaske tgtype, und die selbst zu dekodieren waere SQL aus dem
--            Gedaechtnis. pg_get_triggerdef gibt beides im Wortlaut — dieselbe Wahl wie
--            pg_get_constraintdef in Probe 3 und indexdef in Probe 7.
-- FALLE:     aktiviert ist 'O' fuer einen normal aktiven Trigger, NICHT 'true'. Ein
--            'D' heisst DISABLED: der Trigger STEHT DA und FEUERT NICHT. Genau das ist
--            der stille Fehlzustand, den diese Probe fangen soll — wer nur auf die
--            Anwesenheit der Zeile schaut, sieht ihn nicht.
--            "not t.tgisinternal" schliesst die vom System erzeugten Constraint-Trigger
--            aus (jeder Fremdschluessel bringt welche mit). OHNE diesen Filter stuenden
--            hier Dutzende Zeilen, und die drei gesuchten gingen darin unter.
--            KEIN Filter auf relkind: Stuende ein Row-Trigger an einem anderen Objekt
--            als einer Tabelle, waere das selbst ein Befund und soll sichtbar sein.
-- HERKUNFT DER ABFRAGE: die drei Joins und der tgisinternal-Filter sind WOERTLICH aus
--            supabase/migrations/0021_project_secrets.sql uebernommen, wo sie als
--            Katalog-Guard stehen und gegen DIESE Datenbank gelaufen sind. Sie sind
--            damit nicht aus dem Gedaechtnis gebaut. Neu sind allein die ausgegebenen
--            Spalten und der Wegfall der beiden Namensfilter.
-- VERIFIZIERT: NIE GEFAHREN. Diese Probe ist am 2026-08-26 angelegt worden und hat noch
--            kein Ergebnis. Wer sie das erste Mal faehrt, traegt das Datum hier nach.
select c.relname                  as tabelle,
       t.tgname,
       p.proname                  as funktion,
       t.tgenabled                as aktiviert,
       pg_get_triggerdef(t.oid)   as definition
from pg_trigger t
join pg_class c on c.oid = t.tgrelid
join pg_namespace n on n.oid = c.relnamespace
join pg_proc p on p.oid = t.tgfoid
where n.nspname = 'public'
  and not t.tgisinternal
order by c.relname, t.tgname;
