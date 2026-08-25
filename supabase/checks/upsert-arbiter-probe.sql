-- ZWECK:       Misst an einer WEGWERF-TABELLE in der ZIELFORM von project_secrets zwei
--              Fragen, die die Anbieter-Lesung vom 2026-08-25 AUSDRUECKLICH OFFEN
--              GELASSEN hat und die die Bauform der geplanten Migration entscheiden:
--                (1) Genuegt PostgREST fuer ein upsert ein UNIQUE-Constraint, oder
--                    verlangt es den PRIMAERSCHLUESSEL im Rumpf? ZWEI Anbieter-Seiten
--                    sagen Verschiedenes:
--                    SEITE A (PostgREST 14, "Tables and Views", Abschnitt On Conflict):
--                      "By specifying the on_conflict query parameter, you can make
--                       upsert work on a column(s) that has a UNIQUE constraint."
--                    SEITE B (Supabase-JS-Referenz, Abschnitt upsert(values, options)):
--                      "Primary keys must be included in values to use upsert."
--                    Seite B schraenkt NICHT auf den Fall ohne on_conflict ein. Welche
--                    der beiden fuer unseren Aufruf gilt, ist am gelesenen Text NICHT
--                    entscheidbar.
--                (2) Wie verhaelt sich ein upsert, wenn eine KONFLIKT-SPALTE NULL
--                    traegt? Dazu sagt KEINE der beiden Seiten etwas — Nicht-Treffer
--                    mit benannter Reichweite (Volltext beider Seiten plus die
--                    Volltextsuche des v14-Doku-Satzes).
--              WARUM DAS ZAEHLT: setCapiToken schreibt heute mit
--              onConflict: "project_id,target" — einem STRING-LITERAL, das NICHTS im
--              Code ans Schema bindet. Verliert die geplante Migration diese
--              Eindeutigkeit oder wird sie fuer PostgREST unadressierbar, bricht das
--              Speichern eines Geheimnisses, und zwar ERST IN DER LAUFENDEN DATENBANK.
--
-- ERWARTUNG:   KEINE. Diese Probe hat bewusst KEIN erwartetes Ergebnis — sie
--              ENTSCHEIDET eine offene Frage, statt einen bekannten Zustand zu
--              bestaetigen. Das unterscheidet sie von jeder anderen Datei in diesem
--              Ordner. Je Messung stehen unten ZWEI Ausgaenge mit ihrer jeweiligen
--              Bedeutung; welcher eintritt, ist der Befund. Ein Ausgang ist NICHT
--              "richtig" und der andere "falsch" — beide sind brauchbar, sie fuehren
--              nur zu verschiedenen Migrationen.
--
-- WANN:        EINMALIG, VOR dem Zuschnitt der Schema-Scheibe von Phase 11.8. Sie ist
--              KEINE Routine-Probe. Sie laeuft in ZWEI Umgebungen: TEIL 1 und TEIL 4
--              im SQL-Editor, TEIL 2 und TEIL 3 gegen den REST-Endpunkt (curl o. ae.).
--              DIE TRENNUNG IST TRAGEND UND KEIN UMSTAND: Die offene Frage ist eine
--              POSTGREST-Frage. Wer sie im SQL-Editor misst, misst Postgres — und
--              Postgres beantwortet eine ANDERE Frage als die, die hier offen ist.
--
-- PLATZHALTER: <PROJEKT-REST-URL>  — der Wert von NEXT_PUBLIC_SUPABASE_URL, gefolgt
--                                    von /rest/v1 (Beispiel:
--                                    https://<ref>.supabase.co/rest/v1).
--              $SUPABASE_SERVICE_ROLE_KEY — der service_role-Schluessel, AUSSCHLIESSLICH
--                                    als Umgebungsvariable, s. TEIL 2, Vorbereitung.
--              KEINE echte Projekt-Kennung und KEIN echtes Geheimnis. Alle Werte unten
--              sind ERFUNDEN und am Namen erkennbar ("ERFUNDEN-...").
--
-- FALLE:       (1) DIESE DATEI IST NICHT REIN LESEND. Sie legt eine Tabelle an,
--                  aendert sie und droppt sie wieder. Sie gehoert damit zur ZWEITEN
--                  der zwei Bauformen, die der README dieses Ordners zulaesst:
--                  schreibend AUSSCHLIESSLICH an einem WEGWERF-OBJEKT, das die Datei
--                  SELBST wieder entfernt.
--                  DIE DREI AUFLAGEN JENER BAUFORM SIND HIER ERFUELLT: die Tabelle
--                  heisst _upsert_arbiter_probe, traegt damit einen erkennbaren
--                  eigenen Namen und beruehrt KEINE bestehende Tabelle · das
--                  Aufraeumen ist ein ausgewiesener Pflicht-Teil (TEIL 4), nicht
--                  auskommentiert und nicht "spaeter" · und dahinter steht eine
--                  GEGENPROBE, die zeigt, dass es weg ist.
--                  WER DIESE DATEI OEFFNET UND "NUR LESEND" ANNIMMT, IRRT. Genau
--                  dafuer verlangt der README diesen Hinweis im KOPF jeder Datei
--                  dieser Bauform — hier wird die Auflage eingeloest.
--              (2) NUR AUF EINER UMGEBUNG FAHREN, DEREN VERLUST EGAL IST. Die Tabelle
--                  heisst _upsert_arbiter_probe und liegt in public. Sie traegt keine
--                  echten Daten, aber sie liegt im selben Schema wie die echten.
--              (3) DER SCHEMA-CACHE. Zwischen TEIL 1 (SQL-Editor) und TEIL 2 (REST)
--                  liegt eine DDL-Aenderung. Antwortet der Endpunkt so, als kenne er
--                  die Tabelle nicht, ist das NICHT der Befund, sondern ein
--                  Vorbereitungsfehler — s. TEIL 2, Vorbereitung, Schritt 3.
--              (4) TEIL 4 IST PFLICHT, NICHT OPTIONAL. Eine Wegwerf-Tabelle, die stehen
--                  bleibt, ist eine Tabelle in public, die nach zwei Wochen niemand mehr
--                  einordnen kann — und sie traegt RLS ohne Policy, sieht also fuer
--                  jeden Advisor-Lauf aus wie ein vergessener Geheimnis-Speicher.
--
-- VERIFIZIERT: 2026-08-25, EINMAL GEFAHREN (Owner). Ab hier ist diese Datei das
--              PROTOKOLL eines Laufs und nicht mehr nur eine Anleitung; die Messungen
--              unten stehen woertlich wie vor dem Lauf.
--              VORBEDINGUNG (1e) ERFUELLT: rls_aktiv = true, anzahl_policies = 0, und
--              die Constraint-Definition trug woertlich
--              "UNIQUE NULLS NOT DISTINCT (project_id, target)". M-B hat damit
--              PostgREST gemessen und nicht die Abwesenheit der Variante.
--              CACHE-BELEG (TEIL 2, Vorbereitung 3): das leere Lesen lieferte SOFORT
--              [] — KEIN manuelles Nachladen noetig. Der Nebenbefund faellt damit aus:
--              es gab nichts zu protokollieren.
--              M-A: SEITE A ist eingetreten. EINE Zeile, secret_enc traegt den ZWEITEN
--                   Wert — der zweite Aufruf hat AKTUALISIERT, OHNE den kuenstlichen
--                   Schluessel im Rumpf. NICHT BERICHTET ist, ob die id zwischen den
--                   beiden Aufrufen gleich geblieben ist; jene Teilangabe des Ausgangs
--                   bleibt damit offen.
--              M-B: DIE NULL-ZEILEN KOLLIDIEREN. EINE Zeile, project_id null,
--                   secret_enc traegt den ZWEITEN Wert.
--              M-C: KEINER der drei aufgefuehrten Ausgaenge ist so eingetreten, wie er
--                   formuliert war — und das ist selbst ein Befund, kein Schoenheits-
--                   fehler. GEMESSENER ZUSTAND: EINE Zeile, secret_enc traegt den
--                   ERSTEN Wert; der zweite Aufruf hat NICHT GESCHRIEBEN. Das
--                   Bestandsbild deckt sich mit AUSGANG 2 (der Constraint greift, ohne
--                   dass ein Arbiter benannt war), ABER: OB der zweite Aufruf mit einem
--                   FEHLER endete, ist NICHT BERICHTET. Ausgang 2 gilt deshalb NICHT
--                   als bestaetigt. Hier steht der ZUSTAND, nicht die Deutung.
--              TEIL 3 (unabhaengige Sicht ohne PostgREST): drei Zeilen, deckungsgleich
--                   mit dem, was ueber den REST-Endpunkt zu lesen war.
--              TEIL 4: der drop ist gelaufen, tabelle_noch_da = 0.
--              PROVENIENZ: GEMESSEN vom Owner am 2026-08-25. KEINE Angabe hier ist aus
--              einem Statuscode abgeleitet; berichtet ist der Bestand.
--
-- HERKUNFT DER SQL-BAUFORM: restore-drill.sql (Wegwerf-Tabelle, Kopf-Felder,
--              abgesetzte TEIL-Baender, Pflicht-Aufraeumzeile) und
--              0021_project_secrets.sql (die Zielform, die hier nachgestellt wird,
--              samt der RLS-Begruendung).

-- ============================================================================
-- TEIL 1 — DIE WEGWERF-TABELLE IN DER ZIELFORM. Im SQL-EDITOR ausfuehren.
--
-- SIE IST KEINE MIGRATION. Sie traegt KEINE Nummer, sie steht NICHT in
-- supabase/migrations/, und sie schreibt KEINEN Eintrag in schema_migrations.
-- Der Unterschied ist nicht formal: eine Migration behauptet einen dauerhaften
-- Schema-Schritt, diese Tabelle existiert fuer die Dauer einer Messung. Wer sie
-- protokollierte, truege einen Vollzug ein, den es nicht gibt.
--
-- WAS SIE VON project_secrets UEBERNIMMT: die geplante ZIELFORM — kuenstlicher
-- Primaerschluessel, nullbare project_id, target, ZWEI nullbare Geheimnis-Spalten
-- mit einem CHECK auf genau eine davon, und die Eindeutigkeit auf
-- (project_id, target).
-- WAS SIE BEWUSST NICHT UEBERNIMMT: den FREMDSCHLUESSEL auf projects. Ohne ihn
-- braucht die Probe keine echte Projektzeile und kann mit erfundenen Kennungen
-- arbeiten. Das ist der einzige gewollte Unterschied zur Zielform.
-- ============================================================================

-- (1a) DIE TABELLE.
create table public._upsert_arbiter_probe (
  -- DER KUENSTLICHE SCHLUESSEL. Er hat einen DEFAULT — und genau darum geht es in
  -- Messung M-A: Der Schreibpfad kennt ihn nicht und sendet ihn nicht mit.
  id uuid not null default gen_random_uuid(),
  -- NULLBAR und OHNE Fremdschluessel (s. Kopf des TEILS). In der Zielform waere
  -- die Nullbarkeit der Preis dafuer, die Eigentums-Achse offenzuhalten.
  project_id uuid,
  target text not null,
  -- DER KLARTEXT-SKALAR, jetzt NULLBAR — heute ist er "secret text not null".
  secret text,
  -- DIE VERSCHLUESSELTE NUTZLAST, nullbar. Form wie in src/lib/secrets/cipher.ts:
  -- eine Zeichenkette aus [A-Za-z0-9_-.].
  secret_enc text,
  created_at timestamptz not null default now(),
  constraint _upsert_arbiter_probe_pkey primary key (id),
  -- GENAU EINES VON BEIDEN. Bauform woertlich nach projects_variant_b_pair
  -- (0016): eine Aussage ueber die Null-Zustaende zweier Spalten, nicht zwei
  -- getrennte Bedingungen. "<>" auf zwei Wahrheitswerten ist wahr, wenn sie sich
  -- unterscheiden — also genau dann, wenn EINE der beiden Spalten gesetzt ist.
  constraint _upsert_arbiter_probe_genau_eines
    check ((secret is null) <> (secret_enc is null))
);

-- (1b) RLS IM SELBEN ZUG — und ausdruecklich hier, nicht "gleich danach".
--      GRUND, unveraendert aus 0021_project_secrets.sql uebernommen: Eine neue
--      Tabelle in public OHNE "enable row level security" ist SOFORT fuer anon
--      offen, und der anon-Key steckt im Client-Bundle jeder ausgelieferten Seite
--      (s. docs/immer-beachten.md, "GRANTS SCHUETZEN NICHTS"). Das gilt auch fuer
--      eine Tabelle, die zehn Minuten existiert: das Zeitfenster ist kein
--      Schutz, es ist nur ein kleineres Ziel.
--      NICHT auf den Event-Trigger rls_auto_enable verlassen — er existiert nur
--      in der laufenden DB und ist kein Ersatz fuer die ausdrueckliche Anweisung.
alter table public._upsert_arbiter_probe enable row level security;

-- (1c) KEINE POLICY. Dieselbe Bauform wie project_secrets: unter aktiver RLS ohne
--      JEDE Policy ist die Tabelle fuer anon und authenticated vollstaendig
--      verschlossen; nur service_role kommt durch. Der Zugriff der Messungen in
--      TEIL 2 und TEIL 3 laeuft ueber genau diesen Weg — es gibt keinen anderen.
--      Hier steht deshalb bewusst kein "create policy".

-- (1d) DIE EINDEUTIGKEIT — ALS CONSTRAINT, NICHT ALS INDEX.
--      DER NAME DER VARIANTE IST "UNIQUE NULLS NOT DISTINCT". Sie steht ab
--      PostgreSQL 15 zur Verfuegung; die laufende Datenbank traegt 17.6
--      (GEMESSEN vom Owner am 2026-08-25 per select version()). Ohne sie behandelt
--      Postgres NULL-Werte als voneinander VERSCHIEDEN — zwei Zeilen mit
--      project_id IS NULL und demselben target waeren dann BEIDE erlaubt, und
--      genau das soll die Zielform nicht zulassen.
--      WARUM "alter table ... add constraint" UND NICHT "create unique index":
--      GELESEN am 2026-08-25 (PostgREST 14, "Schema Cache", Abschnitt
--      Finer-Grained Event Trigger): die Befehlsmarken-Liste des Event-Triggers,
--      der den PostgREST-Schema-Cache nachlaedt, enthaelt 'ALTER TABLE' und
--      enthaelt 'CREATE INDEX' NICHT. Ein als INDEX angelegter Constraint loeste
--      nach diesem Text KEIN Nachladen aus. Die Probe geht deshalb denselben Weg,
--      den die spaetere Migration gehen wuerde — sonst misst sie eine andere Sache.
--      GRENZE DIESER BEGRUENDUNG: Ob die Trigger DIESER Datenbank jene Liste
--      tragen, ist NICHT gemessen — gemessen sind nur ihre NAMEN
--      (pgrst_ddl_watch, pgrst_drop_watch; docs/db-stand.md, 2026-08-05).
alter table public._upsert_arbiter_probe
  add constraint _upsert_arbiter_probe_project_target_key
  unique nulls not distinct (project_id, target);

-- (1e) GEGENPROBE VOR DER MESSUNG — PFLICHT. Sie beantwortet zwei Fragen, die man
--      sonst erst am Messergebnis raet: Ist RLS wirklich aktiv und die
--      Policy-Liste leer, und ist der Constraint wirklich als NULLS NOT DISTINCT
--      gelandet? Ein Constraint, der still als NULLS DISTINCT angelegt wurde,
--      liefert in M-B ein Ergebnis, das wie ein PostgREST-Befund aussieht und
--      keiner ist.
select rel.relrowsecurity            as rls_aktiv,
       (select count(*) from pg_policy pol where pol.polrelid = rel.oid)
                                     as anzahl_policies
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_upsert_arbiter_probe';
-- ZU LESEN: rls_aktiv = true UND anzahl_policies = 0. Alles andere: anhalten.

select con.conname,
       pg_get_constraintdef(con.oid) as definition
from pg_constraint con
join pg_class rel on rel.oid = con.conrelid
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_upsert_arbiter_probe'
order by con.conname;
-- ZU LESEN: Die Definition des Constraints _upsert_arbiter_probe_project_target_key
-- MUSS den Wortlaut "NULLS NOT DISTINCT" tragen. Fehlt er, ist M-B gegenstandslos.

-- ============================================================================
-- TEIL 2 — DIE DREI MESSUNGEN. GEGEN DEN REST-ENDPUNKT, NICHT IM SQL-EDITOR.
--
-- Dieser TEIL ist eine ANLEITUNG in Kommentarform, kein ausfuehrbares SQL. Er
-- steht hier und nicht in einer zweiten Datei, damit Zielform und Messung nicht
-- auseinanderlaufen koennen.
--
-- VORBEREITUNG — DREI SCHRITTE, alle vor der ersten Messung:
--
-- (1) DER SCHLUESSEL GEHT IN EINE UMGEBUNGSVARIABLE, NICHT IN DIE KOMMANDOZEILE.
--     Und "export KEY=..." genuegt dafuer NICHT: auch diese Zeile landet in der
--     Shell-Historie. Stattdessen ohne Anzeige einlesen:
--
--       read -rs SUPABASE_SERVICE_ROLE_KEY && export SUPABASE_SERVICE_ROLE_KEY
--
--     (Schluessel einfuegen, Eingabetaste. Er erscheint weder auf dem Schirm noch
--     in der Historie.) Nach der Messung: unset SUPABASE_SERVICE_ROLE_KEY.
--     WARUM service_role UND NICHT der anon-Key: TEIL 1 (1c) laesst die Tabelle
--     policy-frei. Mit dem anon-Key antwortet der Endpunkt auf JEDE dieser
--     Messungen leer oder ablehnend — und das saehe aus wie ein Befund.
--
-- (2) DIE BASIS-URL ist der Wert von NEXT_PUBLIC_SUPABASE_URL aus .env.local,
--     gefolgt von /rest/v1. Sie steht unten als <PROJEKT-REST-URL>.
--
-- (3) DER SCHEMA-CACHE MUSS DIE NEUE TABELLE KENNEN.
--     WAS DER ANBIETER DAZU SAGT (GELESEN 2026-08-25, PostgREST 14, "Schema
--     Cache", Note): "Requests will wait until the schema cache reload is done.
--     This to prevent client errors due to an stale schema cache." — Nach diesem
--     Text WARTET eine Anfrage, statt zu scheitern.
--     WORAN DER OWNER ES ERKENNT: Ein einfaches Lesen muss die (leere) Tabelle
--     finden, nicht die Tabelle vermissen:
--
--       curl -sS "<PROJEKT-REST-URL>/_upsert_arbiter_probe?select=id" \
--         -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--         -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
--
--     ERWARTUNG: [] — eine leere Liste. Das ist der Beleg, dass der Server die
--     Tabelle kennt.
--     WENN DIE ANTWORT STATTDESSEN BEHAUPTET, DIE TABELLE SEI UNBEKANNT (eine
--     Meldung in Richtung "could not find the table ... in the schema cache"):
--     DAS IST DANN SELBST EIN BEFUND, denn es widerspricht dem gelesenen Satz
--     oben. In diesem Fall im SQL-Editor das Nachladen anstossen —
--
--       notify pgrst, 'reload schema';
--
--     — das Lesen wiederholen, UND BEIDES PROTOKOLLIEREN: dass es noetig war und
--     wie lange es gedauert hat. Es ist die einzige Stelle dieser Probe, an der
--     ein Nebenbefund ueber die Plattform abfaellt.
--     GRENZE: Der genaue FEHLERCODE fuer eine unbekannte Tabelle ist NICHT
--     gelesen worden und wird hier bewusst nicht behauptet.
--
-- ---------------------------------------------------------------------------
-- M-A · DIE KERNMESSUNG: upsert OHNE den kuenstlichen Schluessel im Rumpf,
--       mit on_conflict auf die ZWEI Spalten. Zweimal dasselbe Paar,
--       VERSCHIEDENER Nutzlast-Wert.
--
--   AUFRUF 1:
--     curl -sS -X POST \
--       "<PROJEKT-REST-URL>/_upsert_arbiter_probe?on_conflict=project_id,target" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -H "Prefer: resolution=merge-duplicates, return=representation" \
--       -d '{"project_id":"00000000-0000-4000-8000-000000000001",
--            "target":"ERFUNDEN-ziel-a",
--            "secret_enc":"ERFUNDEN-chiffrat-EINS"}'
--
--   AUFRUF 2 — identisch, NUR der Nutzlast-Wert wechselt auf
--     "ERFUNDEN-chiffrat-ZWEI".
--
--   WENN SEITE A RECHT HAT (ein UNIQUE-Constraint genuegt): Aufruf 2 fuehrt ein
--     UPDATE aus. Danach existiert GENAU EINE Zeile fuer dieses Paar, und ihr
--     secret_enc traegt "ERFUNDEN-chiffrat-ZWEI". Die id bleibt dieselbe wie
--     nach Aufruf 1.
--   WENN SEITE B RECHT HAT (der Primaerschluessel muss im Rumpf stehen):
--     Aufruf 2 endet in einem FEHLER, ODER er legt eine ZWEITE Zeile an (neue
--     id, dasselbe Paar) — was am Constraint scheitern muesste und dann
--     ebenfalls als Fehler sichtbar wird. BEIDE Auspraegungen sind "Seite B";
--     WELCHE eintritt, ist selbst ein Befund und gehoert notiert.
--   WORAN DER OWNER ES ABLIEST — nicht am Statuscode allein, sondern am Bestand:
--
--     curl -sS "<PROJEKT-REST-URL>/_upsert_arbiter_probe?select=id,project_id,target,secret_enc" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
--
--     ZU NOTIEREN: Zahl der Zeilen fuer dieses Paar (eine oder zwei), der Wert in
--     secret_enc (EINS oder ZWEI), und ob die id zwischen den beiden Aufrufen
--     gleich geblieben ist.
--
-- ---------------------------------------------------------------------------
-- M-B · DASSELBE MIT project_id AUF NULL. Zweimal dasselbe target.
--
--   AUFRUF 1 und 2 wie bei M-A, aber mit
--     "project_id": null  und  "target": "ERFUNDEN-ziel-b",
--   Nutzlast beim zweiten Aufruf wieder verschieden.
--
--   WENN DIE NULL-ZEILEN KOLLIDIEREN (die Eindeutigkeit greift ueber NULL
--     hinweg, und PostgREST leitet den Arbiter darauf ab): GENAU EINE Zeile,
--     secret_enc traegt den zweiten Wert. Das ist die Voraussetzung dafuer, dass
--     ein betreiberweites Zugangsdatum je Ziel ueberhaupt eindeutig bleibt.
--   WENN SIE NICHT KOLLIDIEREN: ZWEI Zeilen mit project_id = null und demselben
--     target — ODER ein Fehler beim zweiten Aufruf. Dann traegt die Zielform die
--     Eindeutigkeit fuer den projektlosen Fall NICHT, und das entscheidet die
--     Migration.
--   WORAN DER OWNER ES ABLIEST: dieselbe Lese-Abfrage wie bei M-A, gefiltert auf
--     das erfundene Ziel:  ?select=id,project_id,target,secret_enc&target=eq.ERFUNDEN-ziel-b
--   ACHTUNG, DIE VORAUSSETZUNG STEHT IN TEIL 1 (1e): Ist der Constraint nicht als
--     NULLS NOT DISTINCT gelandet, misst M-B nichts ueber PostgREST, sondern nur
--     die Abwesenheit der Variante.
--
-- ---------------------------------------------------------------------------
-- M-C · DER KONTROLLFALL: upsert OHNE on_conflict, ohne kuenstlichen Schluessel
--       im Rumpf. Er zeigt, was der STANDARDWEG tut — ohne ihn stuende M-A als
--       moeglicher Zufall da.
--
--     curl -sS -X POST "<PROJEKT-REST-URL>/_upsert_arbiter_probe" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -H "Prefer: resolution=merge-duplicates, return=representation" \
--       -d '{"project_id":"00000000-0000-4000-8000-000000000003",
--            "target":"ERFUNDEN-ziel-c",
--            "secret_enc":"ERFUNDEN-chiffrat-EINS"}'
--
--   ebenfalls ZWEIMAL, mit verschiedenem Nutzlast-Wert.
--
--   WAS DER GELESENE TEXT ERWARTEN LAESST (PostgREST 14, "Tables and Views",
--     Abschnitt Upsert): "By default, upsert operates based on the primary key
--     columns, so you must specify all of them." Der Rumpf enthaelt id NICHT ->
--     der Standardweg hat keinen Arbiter, den er treffen koennte.
--   AUSGANG 1: ZWEI Zeilen mit verschiedenen id-Werten — der Standardweg fuegt
--     jedes Mal ein. Dann ist M-A's Ergebnis DEM on_conflict zuzuschreiben und
--     nicht dem Zufall.
--   AUSGANG 2: ein Fehler beim zweiten Aufruf (die Eindeutigkeit greift, ohne
--     dass ein Arbiter benannt war). Auch das ist verwertbar — es zeigt, dass der
--     Constraint wirkt, aber nicht angesteuert wird.
--   AUSGANG 3: EINE Zeile, aktualisiert. Das waere UNERWARTET nach dem gelesenen
--     Text und der interessanteste der drei Ausgaenge — dann bitte anhalten und
--     den Befund festhalten, statt ihn einzuordnen.

-- ============================================================================
-- TEIL 3 — DER BESTAND, IM SQL-EDITOR GEGENGELESEN.
--
-- WARUM NOCH EINMAL, obwohl TEIL 2 schon liest: Die Lese-Abfragen dort laufen
-- ueber DENSELBEN Weg wie die Messung. Antwortet PostgREST aus einem Grund
-- verzerrt, verzerrt es beide Richtungen gleich. Diese Abfrage sieht den
-- Bestand ohne PostgREST — sie ist die unabhaengige zweite Sicht.
-- ============================================================================

select id, project_id, target, secret, secret_enc, created_at
from public._upsert_arbiter_probe
order by target, created_at;
-- ZU NOTIEREN, je erfundenem Ziel: Zahl der Zeilen, der Wert in secret_enc, und
-- ob die id-Werte zwischen den Aufruf-Paaren gleich geblieben sind.

-- ============================================================================
-- TEIL 4 — AUFRAEUMEN. PFLICHT, NICHT OPTIONAL. Im SQL-EDITOR.
--
-- Diese Anweisung ist NICHT auskommentiert und soll es nicht sein: eine
-- Wegwerf-Tabelle, die stehen bleibt, ist eine Tabelle in public, die niemand
-- mehr einordnet — und sie traegt RLS ohne Policy, sieht in jedem Advisor-Lauf
-- also aus wie ein vergessener Geheimnis-Speicher.
-- Der drop nimmt Constraints und Zeilen mit; es bleibt nichts zurueck.
-- ============================================================================

drop table public._upsert_arbiter_probe;

-- GEGENPROBE NACH DEM AUFRAEUMEN — sie kostet nichts und beantwortet die Frage,
-- die man sonst erst in vier Wochen stellt.
select count(*) as tabelle_noch_da
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_upsert_arbiter_probe';
-- ZU LESEN: 0. Alles andere heisst, der drop ist nicht gelaufen.
