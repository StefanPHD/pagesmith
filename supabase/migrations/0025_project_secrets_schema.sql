-- Phase 11.8b — Das Schema der Geheimnis-Tabelle, in EINEM Zug: FUENF Achsen an
-- public.project_secrets. Manuell im Supabase-SQL-Editor ausfuehren.
--
-- DIE FUENF ACHSEN, in der Reihenfolge, in der sie unten stehen:
--   (S1) eine NULLBARE Spalte secret_enc fuer die verschluesselte Nutzlast
--   (S2) die NOT-NULL-Bedingung von secret loesen
--   (S3) ein CHECK auf GENAU EINES der beiden Geheimnis-Felder
--   (S4) die EINDEUTIGKEIT auf (project_id, target) als EIGENER Constraint,
--        als UNIQUE NULLS NOT DISTINCT
--   (S5) den zusammengesetzten Primaerschluessel droppen
--   (S6) project_id nullbar machen  (+ S6b: der Spaltenkommentar zum Loeschpfad)
--   (S7) die kuenstliche Schluesselspalte id anlegen
--   (S8) den Primaerschluessel auf id legen
--
-- ============================================================================
-- DER NO-OP-SATZ AUS 0021 UND 0024 GILT HIER NICHT — und das ist der wichtigste
-- Satz dieses Kopfes. Wer ihn abschreibt, baut den gefaehrlichsten Kommentar
-- dieser Phase.
--
-- 0021 legte eine Tabelle an, die NIEMAND las; 0024 erweiterte eine Wertemenge um
-- ein Ziel, das es im Code noch nicht gab. Beide durften deshalb woertlich sagen,
-- sie seien "ein NO-OP ohne den zugehoerigen Code und gefahrlos frueh
-- einspielbar".
--
-- DIESE DATEI IST DAS GEGENTEIL. Sie stellt den SCHLUESSEL einer Tabelle um, in
-- die der DEPLOYTE Code in derselben Sekunde schreibt und aus der er bei JEDEM
-- Beacon JEDER gehosteten Seite liest:
--   . setCapiToken schreibt mit upsert und onConflict "project_id,target"
--     (src/app/projects/actions.ts, Schritt 2a)
--   . getCapiConfigByTrackingKey liest mit eq(project_id) + in(target)
--     (src/lib/capi/token.ts, Schritt 2)
--   . removeCapiToken loescht mit eq(project_id) + eq(target)
--   . listConfiguredTargets liest mit eq(project_id)
-- Es gibt zu dieser Migration KEINEN zugehoerigen Code — die Regel "MIGRATION
-- IMMER VOR CODE-DEPLOY" (docs/db-regeln.md) hat hier also keinen Gegenstand.
-- Das macht sie NICHT harmlos: sie ist eine Aenderung unter LAUFENDEM BETRIEB.
--
-- DARAUS FOLGT DER BEWEIS DIESER SCHEIBE, und er ist eine REGRESSION und keine
-- Neuerung: dass ein Geheimnis nach dem Lauf weiterhin gespeichert wird (zweimal
-- fuer dasselbe Paar, AM BESTAND abgelesen) und dass ein bestehendes Ziel
-- weiterhin sendet. Die Anleitung dazu steht unter PRUEFUNG weiter unten.
--
-- ============================================================================
-- DIE TRAGENDE INVARIANTE: DIE EINDEUTIGKEIT AUF (project_id, target) DARF DIESE
-- MIGRATION NICHT VERLIEREN — ZU KEINEM ZEITPUNKT.
--
-- setCapiToken schreibt mit onConflict: "project_id,target". Das ist ein
-- STRING-LITERAL. Es bindet NICHTS im Code ans Schema: kein Typ, kein Test, kein
-- Kommentar wird rot, wenn der Arbiter unter ihm wegfaellt. Ein Bruch fiele erst
-- beim Speichern eines echten Geheimnisses auf — also beim Betreiber, nicht in
-- einem Gate.
--
-- Z6 IST DER GRUND FUER DIE REIHENFOLGE VON S4 UND S5, und er gehoert benannt,
-- sonst dreht ihn die naechste Runde als "logischer" um: Die neue Eindeutigkeit
-- entsteht VOR dem Drop des Primaerschluessels. Fuer die Dauer eines Schrittes
-- ist das Paar damit DOPPELT gesichert — der Preis dafuer ist null. Der
-- umgekehrte Weg (erst droppen, dann anlegen) haette ein Fenster OHNE jeden
-- Arbiter fuer genau dieses Paar; in diesem Fenster faende der upsert des
-- laufenden Codes nichts, worauf er sich berufen kann.
--
-- ============================================================================
-- DIE SECHS ZWAENGE DER REIHENFOLGE, je mit ihrer Richtung. VIER sind HART
-- (die Anweisung bricht sonst ab), ZWEI sind weich und tragen trotzdem.
--
-- Z1  S2 -> S3, WEICH, aber der Grund haelt: Der CHECK VOR dem Loesen der
--     NOT-NULL-Bedingung waere NICHT unerfuellbar — er waere WIRKUNGSLOS.
--     Solange secret NOT NULL traegt, ist "secret is null" immer falsch, der
--     CHECK verlangt also "secret_enc is null": er liesse sich anlegen (alle
--     Bestandszeilen erfuellen ihn) und verboete ab diesem Moment JEDES Chiffrat.
--     WARUM DAS HIER STEHT: Eine Reihenfolge, die mit "sonst bricht es ab"
--     begruendet ist, faellt bei der naechsten Aufraeumrunde, sobald jemand
--     ausprobiert, dass es nicht abbricht.
-- Z2  S1 -> S3, HART: ein CHECK kann keine Spalte nennen, die es nicht gibt.
-- Z6  S4 -> S5, WEICH, tragend: s. DIE TRAGENDE INVARIANTE oben.
-- Z3  S5 -> S8, HART: eine Tabelle traegt genau EINEN Primaerschluessel.
-- Z4  S5 -> S6, HART: eine Spalte im Primaerschluessel ist implizit NOT NULL;
--     solange project_id zum Schluessel gehoert, laesst sich ihre
--     NOT-NULL-Bedingung nicht loesen.
-- Z5  S7 -> S8, HART: der Schluessel braucht seine Spalte.
--
-- WEITERE ZWAENGE GIBT ES NICHT — ausdruecklich geprueft und NICHT einschlaegig:
-- der Fremdschluessel auf projects, project_secrets_target_valid, der Trigger
-- project_secrets_set_updated_at und die Reihenfolge zwischen S1 und S7.
--
-- WARUM S7 SO SPAET STEHT, obwohl ihn nur Z5 bindet: Er ist der EINZIGE Schritt,
-- der die Tabelle UMSCHREIBT — ein Default aus einer volatilen Funktion fuellt
-- jede bestehende Zeile mit einem eigenen Wert. Das ist Arbeit an DATEN, alles
-- davor ist Arbeit am KATALOG. Er steht deshalb hinter allem, was billig
-- scheitern kann.
--
-- ============================================================================
-- WARUM DIE EINDEUTIGKEIT ALS CONSTRAINT UND NICHT ALS INDEX:
-- GELESEN am 2026-08-25 (PostgREST 14, "Schema Cache", Abschnitt Finer-Grained
-- Event Trigger): die Befehlsmarken-Liste des Event-Triggers, der den
-- PostgREST-Schema-Cache nachlaedt, enthaelt 'ALTER TABLE' und enthaelt
-- 'CREATE INDEX' NICHT. Ein als Index angelegter Constraint loeste nach diesem
-- Text KEIN Nachladen aus.
-- DIE GRENZE DIESER BEGRUENDUNG GEHOERT DAZU: Ob die Trigger DIESER Datenbank
-- jene Liste tragen, ist NICHT gemessen — gemessen sind nur ihre NAMEN
-- (pgrst_ddl_watch, pgrst_drop_watch; docs/db-stand.md, 2026-08-05).
--
-- DIE SYNTAX "unique nulls not distinct" IST NICHT ANGENOMMEN, SONDERN GEFAHREN:
-- supabase/checks/upsert-arbiter-probe.sql hat sie am 2026-08-25 in derselben
-- Form gegen diese Datenbank abgesetzt (Messung M-B, GEMESSEN vom Owner). Sie
-- steht ab PostgreSQL 15 zur Verfuegung; die laufende Datenbank traegt 17.6
-- (GEMESSEN vom Owner am 2026-08-25 per select version()).
--
-- ============================================================================
-- WIEDERHOLBAR, FOLGENLOS, OHNE ZU UEBERSCHREIBEN — je Achse ihr eigenes Mittel:
--   S1  add column if not exists            (nativ)
--   S2  keiner noetig                       (ein zweiter Lauf ist folgenlos)
--   S3  Katalog-Guard                       (add constraint kennt kein if not exists)
--   S4  Katalog-Guard                       (dito)
--   S5  Katalog-Guard, und zwar auf die SACHE, nicht auf den Namen (s. dort)
--   S6  keiner noetig
--   S6b comment on column                   (ueberschreibt sich selbst identisch)
--   S7  add column if not exists            (nativ, und hier TRAGEND: ohne ihn
--                                            bekaemen die Zeilen beim zweiten Lauf
--                                            neue Schluesselwerte)
--   S8  Katalog-Guard
--   Protokoll  on conflict (version) do nothing
-- Ein zweiter Lauf bricht NICHT ab und aendert KEINE bestehende Zeile.
--
-- ============================================================================
-- WAS EIN ABBRUCH HINTERLAESST — die Frage, die den Plan traegt, weil der Code
-- waehrend der Migration weiterlaeuft:
--
-- S1 bis S8 stehen in EINEM do-Block. Ein do-Block ist EINE Anweisung und damit
-- EINE Transaktion (dieselbe Bauform und dieselbe Begruendung wie in 0022, 0023
-- und 0024). FOLGE: Bricht irgendein Schritt ab, ist KEINE der fuenf Achsen
-- gesetzt; die Tabelle steht exakt wie vorher, und der laufende Code schreibt und
-- liest unveraendert weiter. Ein halb umgestellter Schluessel kann nicht
-- entstehen.
--
-- DIE EINZIGE NAHT LIEGT ZWISCHEN DEM do-BLOCK UND DEM PROTOKOLL-INSERT, und sie
-- ist unvermeidbar, weil das Protokoll als LETZTE Anweisung stehen muss: Block
-- durch, Protokoll nicht. DIESER ZUSTAND IST FUER DEN LAUFENDEN CODE VOLLSTAENDIG
-- TRAGBAR — das Schema ist fertig, kein Datum fehlt. Was fehlt, ist die Zeile in
-- schema_migrations, und der Preis ist eine FEHLDEUTUNG, keine Stoerung:
-- supabase/checks/project-secrets-umstellung.sql liest einen fehlenden
-- Protokoll-Eintrag ausdruecklich als "die Migration ist mittendrin abgebrochen".
-- Deshalb die Auflage an die Nachpruefung unten (N5).
--
-- ============================================================================
-- DAS lock_timeout — es steht VOR dem Block und ist eine ENTSCHEIDUNG (Owner,
-- 2026-08-26), keine Vorsichtsgeste:
-- Jeder Schritt unten nimmt eine ACCESS-EXCLUSIVE-Sperre auf project_secrets, und
-- diese Tabelle liegt auf dem HEISSESTEN Pfad der Plattform — sie wird bei jedem
-- Beacon jeder gehosteten Seite gelesen. Ist die Sperre nicht sofort zu bekommen,
-- soll die Migration ABBRECHEN, statt eine Warteschlange auf dem Ingest-Pfad
-- aufzubauen. Ein Abbruch ist hier billig (s. oben: nichts ist dann gesetzt), ein
-- blockierter Ingest ist es nicht.
-- WARUM "set" UND NICHT "set local": Ob der SQL-Editor das Skript in EINE
-- Transaktion klammert oder Anweisung fuer Anweisung faehrt, ist NICHT gemessen.
-- Das schlichte "set" wirkt unter BEIDEN Annahmen; "set local" nur unter der
-- ersten. Der Wert gilt fuer die Editor-Sitzung und endet mit ihr — es steht
-- bewusst KEINE Ruecksetz-Zeile hinter dem Protokoll-Insert, weil dieser die
-- LETZTE Anweisung sein muss.
--
-- ============================================================================
-- DER LOESCHPFAD — die offene Frage dieser Scheibe, hier NUR als Zeiger.
-- 0021 haelt fest, dass project_secrets keine eigene user_id-Spalte braucht, weil
-- die Kette auth.users -> projects -> project_secrets ueber "on delete cascade"
-- traegt. Eine Zeile OHNE Projekt haengt an dieser Kette NICHT mehr. Das ist die
-- Kehrseite der offengehaltenen Eigentums-Achse und kein Versehen.
-- DER VOLLTEXT steht in docs/offene-punkte.md, Eintrag "EINE ZEILE OHNE PROJEKT
-- LIEGT AUSSERHALB JEDER KASKADE"; der Trigger steht im Stub in CLAUDE.md. Die
-- KURZE Fassung steht als Spaltenkommentar in der Datenbank selbst (S6b) — dort,
-- wo sie auch nach einem Rebuild noch jemand findet, der diese Datei nicht liest.
--
-- DER TITEL DES EINTRAGS TRAEGT ABSICHTLICH KEINEN UMLAUT, und das ist keine
-- Nachlaessigkeit: Migrationen dieses Repos sind frei von Umlauten (ae/oe/ue/ss),
-- die Doku ist es nicht. Ein Titel mit Umlaut stuende hier zwangslaeufig
-- transliteriert und damit ANDERS als an seiner Fundstelle — eine Suche nach dem
-- Text aus dem Datenbank-Kommentar fuende ihn dann nicht. So ist er in allen DREI
-- Ablagen (Migration, docs/offene-punkte.md, CLAUDE.md) zeichengleich.
--
-- ============================================================================
-- PRUEFUNG — SIE IST NICHT OPTIONAL, weil am Repo NICHT entscheidbar ist, ob
-- diese Datei gelaufen ist.
--
-- WARUM DIE ABFRAGEN HIER IM KOPF STEHEN UND NICHT IN supabase/checks/: In dieser
-- Runde darf GENAU EINE neue Datei entstehen (Owner-Vorgabe, 2026-08-26). Eine
-- eigene Probendatei bleibt ein KANDIDAT und ist hier NICHT entschieden. Was
-- nicht ginge: die Abfragen nur im Gespraech zu haben — was nur dort steht,
-- existiert fuer die naechste Sitzung nicht.
--
-- VORHER, PFLICHT-STOPP. V1 und V2 sind nach dem Lauf NICHT MEHR HERSTELLBAR:
--
--   V0  select version, filename, applied_at from public.schema_migrations
--        where version in ('0024','0025') order by version;
--       ZU LESEN: 0024 MUSS da sein, 0025 darf es NICHT.
--
--   V1  select count(*) as zeilen,
--              count(*) filter (where secret is null) as ohne_secret,
--              md5(string_agg(project_id::text || '|' || target || '|' ||
--                             md5(secret), ',' order by project_id::text, target))
--                as fingerabdruck
--       from public.project_secrets;
--       dazu: select target, count(*) from public.project_secrets group by target;
--       ZU LESEN: zeilen = 7, ohne_secret = 0; linkedin 2, meta 4, tiktok 1,
--       pinterest gar nicht. DEN FINGERABDRUCK WOERTLICH NOTIEREN.
--       ES GEHT KEIN GEHEIMNISWERT HINAUS: die Einzelwerte gehen in EINEN
--       Aggregat-Hash, aus dem sich keine Zeile mehr lesen laesst.
--       EHRLICHE EINORDNUNG: ohne_secret KANN heute nicht anders als 0 sein
--       (secret traegt NOT NULL). Die Frage nach der Erfuellbarkeit des neuen
--       CHECKs ist damit TRIVIAL WAHR und keine Pruefung. Der Wert von V1 ist die
--       Positivkontrolle auf den Bestand und der Vorher-Wert fuer N4.
--
--   V2  select column_name, data_type, is_nullable, column_default
--       from information_schema.columns
--       where table_schema='public' and table_name='project_secrets'
--       order by ordinal_position;
--       dazu die Constraint-Definitionen im WORTLAUT:
--       select con.conname, pg_get_constraintdef(con.oid)
--       from pg_constraint con
--       join pg_class rel on rel.oid=con.conrelid
--       join pg_namespace nsp on nsp.oid=rel.relnamespace
--       where nsp.nspname='public' and rel.relname='project_secrets'
--       order by con.conname;
--       ZU LESEN: fuenf Spalten, secret is_nullable=NO, KEINE Spalte id, KEINE
--       Spalte secret_enc; ein PRIMARY KEY (project_id, target); der
--       project_secrets_target_valid mit VIER Zielwerten; der Fremdschluessel.
--       Weicht der Ausgangsstand ab: ANHALTEN, nicht anpassen.
--
--   V3  select version();
--       ZU LESEN: 15 oder hoeher (GEMESSEN 2026-08-25: 17.6). Darunter sind S4
--       und damit die fuenfte Achse nicht baubar.
--
-- NACHHER — die fuenf Achsen, je EINZELN ablesbar:
--
--   N1  die Spalten-Abfrage aus V2.
--       ZU LESEN: secret_enc text YES (Achse 1) . secret text YES (Achse 2) .
--       project_id uuid YES (Achse 4b) . id uuid NO mit gen_random_uuid() im
--       column_default (Achse 4a).
--
--   N2  die Constraint-Abfrage aus V2, zusaetzlich mit con.contype.
--       ZU LESEN: project_secrets_secret_genau_eines als CHECK (Achse 3) .
--       project_secrets_pkey als PRIMARY KEY (id), und GENAU EIN Constraint mit
--       contype='p' (Achse 4a) . project_secrets_project_id_target_key, dessen
--       Definition den WORTLAUT "NULLS NOT DISTINCT" TRAGEN MUSS (Achse 5).
--       FALLE, ausdruecklich: fehlt dieser Wortlaut, ist die Migration nicht halb
--       gelungen — dann ist die Eigentums-Achse NICHT offen, sondern nur nullbar,
--       und zwei Zeilen mit project_id IS NULL und demselben Ziel waeren beide
--       erlaubt.
--       UNVERAENDERT mitzulesen: project_secrets_target_valid (vier Werte) und
--       der Fremdschluessel auf projects mit ON DELETE CASCADE.
--
--   N3  select indexname, indexdef from pg_indexes
--       where schemaname='public' and tablename='project_secrets'
--       order by indexname;
--       ZU LESEN: GENAU ZWEI Indizes — project_secrets_pkey auf (id) und
--       project_secrets_project_id_target_key auf (project_id, target). Das ist
--       keine Doppelung von N2: es zeigt, dass der alte PK-Index WEG ist und
--       nicht als Waise stehenblieb.
--
--   N4  DIE GEGENPROBE, DIE DEN SIEBEN ZEILEN GILT:
--       select count(*) as zeilen,
--              count(*) filter (where secret is null)        as ohne_secret,
--              count(*) filter (where secret_enc is not null) as mit_chiffrat,
--              count(*) filter (where project_id is null)     as ohne_projekt,
--              count(distinct id)                             as verschiedene_ids,
--              md5(string_agg(project_id::text || '|' || target || '|' ||
--                             md5(secret), ',' order by project_id::text, target))
--                as fingerabdruck
--       from public.project_secrets;
--       ZU LESEN: zeilen=7 . ohne_secret=0 . mit_chiffrat=0 . ohne_projekt=0 .
--       verschiedene_ids=7 . fingerabdruck IDENTISCH zum notierten Wert aus V1.
--       WARUM ohne_secret NEBEN dem Fingerabdruck steht, obwohl es in V1 trivial
--       war: es ist es JETZT NICHT MEHR (secret darf seit S2 null sein). Und es
--       faengt die stille Form des Datenverlusts — verloere eine Zeile ihr
--       secret, entfiele md5(NULL) LAUTLOS aus dem string_agg; der Fingerabdruck
--       aenderte sich, waehrend zeilen weiterhin 7 zeigte. Erst beide Zahlen
--       nebeneinander unterscheiden "ein Wert hat sich geaendert" von "ein Wert
--       ist verschwunden".
--       verschiedene_ids=7 ist die Nachmessung der einzigen Postgres-Annahme
--       dieser Migration: dass ein "add column ... not null default
--       gen_random_uuid()" die Bestandszeilen mit VERSCHIEDENEN Werten fuellt.
--       Sie ist NICHT gemessen und NICHT gelesen — sie wird hier geprueft.
--
--   N5  select version, filename, applied_at from public.schema_migrations
--       where version = '0025';
--       ZU LESEN: genau eine Zeile.
--       DIE DEUTUNGSAUFLAGE, ohne die diese Probe falsch gelesen wird: Faellt
--       ALLEIN N5 aus, waehrend N1 bis N4 ihre Erwartung treffen, ist das die
--       NAHT zwischen Block und Protokoll — eine Protokoll-Luecke, KEIN
--       abgebrochenes Schema. Ein zweiter Lauf heilt sie folgenlos. Faellt N5 aus
--       UND eine der anderen: ANHALTEN und untersuchen, NICHT erneut laufen
--       lassen.
--
-- DER BEWEIS AM LAUFENDEN CODE steht nicht hier, sondern in der
-- Live-Test-Anleitung dieser Scheibe: ein Geheimnis ZWEIMAL fuer dasselbe Paar
-- speichern und AM BESTAND ablesen, dass EINE Zeile entsteht, der ZWEITE Wert
-- drinsteht und die id sich NICHT geaendert hat. Nicht am Statuscode, nicht an
-- der Oberflaeche.
-- ============================================================================

-- LOCK_TIMEOUT VOR DEM BLOCK (s. Kopf). Lieber abbrechen als auf dem Ingest-Pfad
-- warten.
set lock_timeout = '3s';

do $$
declare
  -- DER NAME DES ALTEN PRIMAERSCHLUESSELS WIRD ABGELESEN, NICHT ANGENOMMEN:
  -- 0021 deklariert ihn INLINE ("primary key (project_id, target)") und gibt ihm
  -- damit keinen ausgeschriebenen Namen; docs/db-stand.md fuehrt ihn ebenfalls
  -- ohne Namen. Dass Postgres ihn "project_secrets_pkey" genannt hat, ist eine
  -- Konvention und am Repo NICHT entscheidbar. Der Guard sucht deshalb nach der
  -- SACHE und droppt unter dem Namen, den er dabei findet.
  v_bisheriger_pk text;
begin
  -- (S1) DIE NEUE SPALTE. Nullbar, ohne Default, ohne Aufrufer — sie bleibt nach
  --      dieser Migration in JEDER Zeile leer. Die Wanderung der vier
  --      bestehenden Ziele ist NICHT Teil dieser Scheibe.
  --      Form der spaeteren Nutzlast: eine Zeichenkette aus [A-Za-z0-9_-.],
  --      erzeugt von src/lib/secrets/cipher.ts (Scheibe 11.8a, Commit 4b2ec09).
  --      DER NAME traegt dasselbe Kuerzel wie die Umgebungsvariablen jener Datei
  --      (SECRET_ENC_KEYS, SECRET_ENC_ACTIVE_KEY_ID) — er ist damit aufloesbar
  --      und nicht geraten.
  alter table public.project_secrets
    add column if not exists secret_enc text;

  -- (S2) DIE NOT-NULL-BEDINGUNG VON secret LOESEN. Wiederholbar ohne Guard.
  --      Z1: DAVOR waere der CHECK aus S3 nicht unerfuellbar, sondern
  --      WIRKUNGSLOS — er verboete jedes Chiffrat (s. Kopf).
  alter table public.project_secrets
    alter column secret drop not null;

  -- (S3) GENAU EINES VON BEIDEN. Bauform woertlich nach projects_variant_b_pair
  --      (0016): EINE Aussage ueber die Null-Zustaende zweier Spalten, nicht zwei
  --      getrennte Bedingungen. "<>" auf zwei Wahrheitswerten ist wahr, wenn sie
  --      sich unterscheiden — also genau dann, wenn EINE der beiden gesetzt ist.
  --      DIESER SCHRITT IST DER EINZIGE, DER DEN BESTAND VALIDIERT (Postgres
  --      prueft beim add constraint alle vorhandenen Zeilen). Er steht deshalb
  --      VOR jeder Schluessel-Operation: scheitert er, soll er scheitern, bevor
  --      am Schluessel etwas bewegt wurde.
  --      Katalog-Guard mit conrelid gegen die konkrete Tabelle, damit er nicht
  --      auf einen gleichnamigen Constraint einer anderen Tabelle trifft.
  if not exists (
    select 1
    from pg_constraint
    where conname  = 'project_secrets_secret_genau_eines'
      and conrelid = 'public.project_secrets'::regclass
  ) then
    alter table public.project_secrets
      add constraint project_secrets_secret_genau_eines
      check ((secret is null) <> (secret_enc is null));
  end if;

  -- (S4) DIE EINDEUTIGKEIT ALS EIGENER CONSTRAINT — VOR dem Drop des
  --      Primaerschluessels (Z6, s. DIE TRAGENDE INVARIANTE im Kopf). Fuer die
  --      Dauer eines Schrittes ist das Paar doppelt gesichert; ein Fenster ohne
  --      Arbiter entsteht nie.
  --      NULLS NOT DISTINCT: ohne diesen Zusatz behandelt Postgres NULL-Werte als
  --      voneinander VERSCHIEDEN — zwei Zeilen mit project_id IS NULL und
  --      demselben target waeren dann BEIDE erlaubt, und genau das soll die
  --      Zielform nicht zulassen.
  --      ALS CONSTRAINT, NICHT ALS INDEX — Grund und Grenze stehen im Kopf.
  if not exists (
    select 1
    from pg_constraint
    where conname  = 'project_secrets_project_id_target_key'
      and conrelid = 'public.project_secrets'::regclass
  ) then
    alter table public.project_secrets
      add constraint project_secrets_project_id_target_key
      unique nulls not distinct (project_id, target);
  end if;

  -- (S5) DEN ALTEN PRIMAERSCHLUESSEL DROPPEN.
  --      DER GUARD PRUEFT DIE SACHE, NICHT DEN NAMEN, und das ist hier tragend:
  --      Nach dieser Migration existiert wieder ein Constraint namens
  --      project_secrets_pkey — nur eben auf id. Ein Guard auf den NAMEN wuerde
  --      beim zweiten Lauf den NEUEN Schluessel droppen und die Tabelle ohne
  --      Primaerschluessel zuruecklassen. Gesucht wird deshalb ein
  --      Primaerschluessel, der die Spalte project_id ENTHAELT; den gibt es genau
  --      solange, wie der ALTE steht.
  select c.conname
    into v_bisheriger_pk
  from pg_constraint c
  join pg_attribute a
    on a.attrelid = c.conrelid
   and a.attnum   = any (c.conkey)
  where c.conrelid = 'public.project_secrets'::regclass
    and c.contype  = 'p'
    and a.attname  = 'project_id';

  if v_bisheriger_pk is not null then
    execute format(
      'alter table public.project_secrets drop constraint %I', v_bisheriger_pk
    );
  end if;

  -- (S6) project_id NULLBAR. Erst jetzt moeglich (Z4): eine Spalte im
  --      Primaerschluessel ist implizit NOT NULL.
  --      DER FREMDSCHLUESSEL BLEIBT UNBERUEHRT und wirkt weiter — "on delete
  --      cascade" greift fuer jeden NICHT-leeren Wert wie bisher. Was ein LEERER
  --      Wert bedeutet, steht in S6b.
  alter table public.project_secrets
    alter column project_id drop not null;

  -- (S6b) DER LOESCHPFAD ALS SPALTENKOMMENTAR — er steht in der DATENBANK und
  --       nicht nur in dieser Datei. Das ist der Unterschied, auf den es
  --       ankommt: ein "--"-Kommentar lebt im Repo, ein comment on column lebt im
  --       Katalog und reist mit jedem Schema-Dump mit.
  --       ERSTMALIGE BAUFORM IN DIESEM REPO (GEMESSEN 2026-08-26: "comment on"
  --       kommt in supabase/ bisher NICHT vor) — bewusst gewaehlt, weil ein
  --       Repo-Kommentar den Rebuild nicht ueberlebt, um den es hier geht.
  --       Wiederholbar: ein zweiter Lauf schreibt denselben Text.
  comment on column public.project_secrets.project_id is
    'Nullbar seit 0025 — die Eigentums-Achse ist offengehalten, aber NICHT gebaut. '
    'EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE: weder eine Projekt- '
    'noch eine Nutzerloeschung erfasst sie (die Kette auth.users -> projects -> '
    'project_secrets laeuft ueber genau diese Spalte), und KEIN Pfad der Anwendung '
    'kann sie lesen, auflisten oder loeschen — alle vier filtern auf project_id. '
    'Heute entsteht sie durch keinen Codepfad; sie kaeme nur von Hand. AUSLOESER: '
    'die erste Zeile mit project_id IS NULL. Volltext: docs/offene-punkte.md, '
    'Eintrag "EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE".';

  -- (S7) DIE KUENSTLICHE SCHLUESSELSPALTE. Bauform nach events.id (0011):
  --      uuid, not null, default gen_random_uuid().
  --      DER EINZIGE SCHRITT, DER DIE TABELLE UMSCHREIBT — er steht deshalb so
  --      spaet wie moeglich (s. Kopf).
  --      "if not exists" IST HIER TRAGEND UND KEIN ZIERRAT: ohne ihn braeche ein
  --      zweiter Lauf ab; mit ihm bleiben die beim ersten Lauf vergebenen
  --      Schluesselwerte unangetastet. Ein Neuvergeben waere stiller Datenverlust
  --      an einer Identitaet, auf die spaeter etwas zeigen kann.
  --      DER SCHREIBPFAD KENNT DIESE SPALTE NICHT und sendet sie nicht mit — dass
  --      ein upsert mit on_conflict auf zwei Spalten trotzdem AKTUALISIERT, ist
  --      am 2026-08-25 gegen diese Datenbank GEMESSEN worden (Messung M-A,
  --      supabase/checks/upsert-arbiter-probe.sql). Was dort NICHT gemessen ist:
  --      ob supabase-js genau diese Parameter erzeugt — das schliesst der
  --      Live-Test, nicht eine zweite Probe.
  alter table public.project_secrets
    add column if not exists id uuid not null default gen_random_uuid();

  -- (S8) DER NEUE PRIMAERSCHLUESSEL. Der Name ist der der Konvention
  --      (events_pkey, projects_pkey, domains_pkey) und damit derselbe, den der
  --      alte trug — bewusst: eine Tabelle, deren Primaerschluessel anders heisst
  --      als alle anderen, ist eine Footgun mehr.
  --      Guard auf das VORHANDENSEIN irgendeines Primaerschluessels: nach S5 gibt
  --      es keinen, beim zweiten Lauf gibt es den auf id.
  if not exists (
    select 1
    from pg_constraint
    where conrelid = 'public.project_secrets'::regclass
      and contype  = 'p'
  ) then
    alter table public.project_secrets
      add constraint project_secrets_pkey primary key (id);
  end if;
end
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei
-- erfolgreichem Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile,
-- die einen nie vollzogenen Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0025', '0025_project_secrets_schema.sql', now())
on conflict (version) do nothing;
