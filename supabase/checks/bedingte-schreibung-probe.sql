-- ZWECK:       Misst an einer WEGWERF-TABELLE, was PostgREST bei einer BEDINGTEN
--              SCHREIBUNG zurueckmeldet. Vier Fragen, die die Anbieter-Lesung vom
--              2026-09-04 AUSDRUECKLICH OFFEN GELASSEN hat (docs/plattform-befunde.md,
--              Abschnitt "Supabase", LAUF 3, Teil (ar)) und die den Zuschnitt des
--              Nebenlaeufigkeits-Riegels der Scheibe 1b-2b entscheiden:
--                (a) Was meldet ein update mit Zustandsfilter zurueck, das NULL Zeilen
--                    trifft — ein Fehler, eine leere Menge, oder etwas Drittes?
--                (b) Liefert count bei einer SCHREIBUNG eine verlaessliche Zahl? ZWEI
--                    ANBIETEREIGENE QUELLEN SAGEN VERSCHIEDENES:
--                    SEITE A (Supabase-JS-Referenz, update(values, options)):
--                      "Count algorithm to use to count UPDATED rows."
--                    SEITE B (PostgREST 16, "Pagination and Count", Abschnitt Counting):
--                      "In order to obtain the total size of the TABLE ... you can
--                       specify a Prefer: count=<value> header." — alle Beispiele sind
--                       GET/HEAD, zu PATCH/POST/DELETE steht dort nichts.
--                    Welche der beiden fuer unseren Aufruf gilt, ist am gelesenen Text
--                    NICHT entscheidbar (LAUF 3, Teil (ak)).
--                (c) Entsteht PGRST116/406 auch bei einem PATCH mit SINGULAR-Anforderung
--                    und null Treffern? Der Mechanismus ist dokumentiert, aber
--                    AUSSCHLIESSLICH an einem GET illustriert (LAUF 3, Teil (al)).
--                (d) Trifft ein update, das GENAU EINE Zeile trifft, erkennbar anders?
--                    DAS IST DIE POSITIVKONTROLLE UND KEINE ZUSATZFRAGE: Ohne sie ist (a)
--                    nicht auswertbar. "Nichts gemeldet" und "Treffer gemeldet" muessen
--                    unterscheidbar sein, sonst misst (a) die Blindheit des Instruments
--                    und nicht das Verhalten des Servers.
--              WARUM DAS ZAEHLT: Ein Riegel gegen nebenlaeufige Erneuerung braucht eine
--              Auskunft darueber, OB er gegriffen hat. Bekommt der Verlierer eines
--              Wettlaufs dieselbe Antwort wie der Gewinner, ist der Riegel gebaut und
--              wirkungslos — und zwar STILL, denn nichts wird rot.
--
-- ERWARTUNG:   KEINE. Diese Probe hat bewusst KEIN erwartetes Ergebnis — sie MISST eine
--              offene Frage, statt einen bekannten Zustand zu bestaetigen (README dieses
--              Ordners: "EINE PROBE MIT ERWARTUNG PRUEFT; EINE OHNE MISST"). Je Messung
--              stehen unten die moeglichen AUSGAENGE MIT IHRER BEDEUTUNG. Kein Ausgang
--              ist "richtig" und kein anderer "falsch" — sie fuehren zu verschiedenen
--              Bauformen des Riegels.
--
-- WANN:        EINMALIG, VOR dem Zuschnitt der Scheibe 1b-2b. KEINE Routine-Probe.
--              Sie laeuft in ZWEI Umgebungen: TEIL 1, TEIL 4 und TEIL 5 im SQL-EDITOR,
--              TEIL 2 und TEIL 3 gegen den REST-ENDPUNKT (curl o. ae.).
--              DIE TRENNUNG IST TRAGEND UND KEIN UMSTAND: Die offene Frage ist eine
--              POSTGREST-Frage. Das README dieses Ordners erlaubt den REST-Teil
--              ausdruecklich, "wenn die gemessene Frage eine PostgREST-Frage ist", und
--              nennt den Grund: "Wer eine PostgREST-Frage im SQL-Editor misst,
--              beantwortet eine andere." Ein "update ... where zustand = 'FREI'" im
--              SQL-Editor liefert eine Zeilenzahl, die Postgres meldet — die Frage ist
--              aber, was der HTTP-Weg daraus macht. Es sind zwei Systeme.
--
-- PLATZHALTER: <PROJEKT-REST-URL>  — der Wert von NEXT_PUBLIC_SUPABASE_URL, gefolgt von
--                                    /rest/v1 (Beispiel:
--                                    https://<ref>.supabase.co/rest/v1).
--              $SUPABASE_SERVICE_ROLE_KEY — der service_role-Schluessel, AUSSCHLIESSLICH
--                                    als Umgebungsvariable, s. TEIL 2, Vorbereitung (1).
--              KEINE echte Projekt-Kennung, KEIN echtes Geheimnis, KEINE echte URL steht
--              in dieser Datei. Alle Werte unten sind ERFUNDEN und am Namen erkennbar
--              ("ERFUNDEN-...").
--
-- FALLE:       (1) DIESE DATEI IST NICHT REIN LESEND. Sie legt eine Tabelle an, befuellt
--                  sie, aendert sie und droppt sie wieder. Sie gehoert damit zur ZWEITEN
--                  der zwei Bauformen, die der README zulaesst: schreibend AUSSCHLIESSLICH
--                  an einem WEGWERF-OBJEKT, das die Datei SELBST wieder entfernt.
--                  DIE DREI AUFLAGEN JENER BAUFORM SIND HIER ERFUELLT: die Tabelle heisst
--                  _bedingte_schreibung_probe, traegt damit einen erkennbaren eigenen
--                  Namen und beruehrt KEINE bestehende Tabelle · das Aufraeumen ist ein
--                  ausgewiesener Pflicht-Teil (TEIL 5), nicht auskommentiert und nicht
--                  "spaeter" · und dahinter steht eine GEGENPROBE, die zeigt, dass es weg
--                  ist.
--                  WER DIESE DATEI OEFFNET UND "NUR LESEND" ANNIMMT, IRRT.
--              (2) DIE ZENTRALE FALLE DIESER PROBE — SIE KANN SICH SELBST TAEUSCHEN.
--                  UNTER RLS IST "KEINE ZEILE SICHTBAR" VON "KEINE ZEILE PASST" AM
--                  ERGEBNIS NICHT ZU TRENNEN (docs/plattform-befunde.md, LAUF 3,
--                  Grenze 2). Beide erzeugen dieselbe Beobachtung. Eine Probe, die das
--                  nicht ausschliesst, misst ihre eigene Blindheit und meldet sie als
--                  Serververhalten.
--                  WIE DIESE PROBE ES AUSSCHLIESST — ZWEI DINGE, und das zweite ist das
--                  tragende:
--                    ERSTENS, DER GRUND ZUR ERWARTUNG: Alle Messungen laufen ueber
--                    service_role. Diese Rolle traegt bypassrls — "Full access. It
--                    bypasses RLS" (GELESEN 2026-09-04, Supabase-Doku, Row Level
--                    Security, Abschnitt Grants and policies). RLS kann auf diesem Weg
--                    also nichts verdecken.
--                    ZWEITENS, DER BELEG: TEIL 2 liest ALLE ACHT Saatzeilen ueber DENSELBEN
--                    REST-Weg mit DEMSELBEN Schluessel, BEVOR die erste Schreibung laeuft.
--                    Kommen sie zurueck, ist ihre Sichtbarkeit gemessen und nicht
--                    unterstellt — ein spaeteres "null Zeilen" kann dann nur der
--                    Zustandsfilter sein.
--                  DIE ERSTE HAELFTE ALLEIN GENUEGT NICHT: Sie ist eine Doku-Aussage. Wer
--                  auf den Lesebeleg verzichtet, weil "service_role umgeht RLS ja",
--                  ersetzt eine Messung durch eine Lesung — genau der Tausch, den diese
--                  Probe ueberhaupt erst noetig macht.
--              (3) JEDE MESSUNG HAT IHR EIGENES ZEILENPAAR. a1/d1 fuer M-1, a2/d2 fuer
--                  M-2, a3/d3 fuer M-3, a4/d4 fuer M-4. NICHT WIEDERVERWENDEN.
--                  GRUND: Eine Schreibung, die TRIFFT, setzt zustand von 'FREI' auf
--                  'BESETZT'. Ein zweiter Aufruf gegen dieselbe d-Zeile traefe danach
--                  NICHTS mehr — und maesse den Null-Treffer-Fall, waehrend er den
--                  Ein-Treffer-Fall zu messen glaubt. Das ist derselbe Fehler wie (2),
--                  nur selbst verursacht.
--              (4) DIE PROBE IST NICHT WIEDERHOLBAR, OHNE NEU ZU SAEEN. Nach einem
--                  vollstaendigen Durchlauf stehen alle vier d-Zeilen auf 'BESETZT'. Ein
--                  zweiter Durchlauf misst dann VIERMAL den Null-Treffer-Fall und liefert
--                  ein in sich stimmiges, vollstaendig falsches Bild. Wer wiederholen
--                  will: TEIL 5 fahren und bei TEIL 1 neu beginnen.
--              (5) DER SCHEMA-CACHE. Zwischen TEIL 1 (SQL-Editor) und TEIL 2 (REST) liegt
--                  eine DDL-Aenderung. Antwortet der Endpunkt so, als kenne er die Tabelle
--                  nicht, ist das NICHT der Befund, sondern ein Vorbereitungsfehler —
--                  s. TEIL 2, Vorbereitung (3).
--              (6) NUR AUF EINER UMGEBUNG FAHREN, DEREN VERLUST EGAL IST. Die Tabelle
--                  liegt in public, traegt keine echten Daten, aber sie liegt im selben
--                  Schema wie die echten.
--              (7) TEIL 5 IST PFLICHT, NICHT OPTIONAL. Eine Wegwerf-Tabelle, die stehen
--                  bleibt, ist eine Tabelle in public, die nach zwei Wochen niemand mehr
--                  einordnet — und sie traegt RLS ohne Policy, sieht also fuer jeden
--                  Advisor-Lauf aus wie ein vergessener Geheimnis-Speicher.
--
-- VERIFIZIERT: 2026-09-04, EINMAL GEFAHREN (Owner), ACHT Aufrufe gegen den echten
--              Endpunkt. Ab hier ist diese Datei das PROTOKOLL eines Laufs und nicht
--              mehr nur eine Anleitung; die Messungen unten stehen woertlich wie vor
--              dem Lauf.
--              GESCHRIEBEN am 2026-09-04 (CC) auf der Anbieter-Lesung desselben Tages;
--              die zwei im ZWECK zitierten Anbieter-Saetze sind GELESEN und in LAUF 3
--              mit Fundstelle verortet — sie sind durch diesen Lauf NICHT gemessen
--              worden, gemessen ist das VERHALTEN.
--
--              SICHTBARKEITS-BELEG (TEIL 2, Vorbereitung 4) ERBRACHT: HTTP 200, ACHT
--              Kennungen, Content-Range 0-7/*. Damit ist die Saat vollstaendig UND die
--              Sichtbarkeit der a-Zeilen ueber DENSELBEN Weg mit DEMSELBEN Schluessel
--              GEMESSEN, vor der ersten Schreibung. DIE FALLE (2) IST DAMIT
--              AUSGESCHLOSSEN und nicht bloss bedacht: Ein spaeteres "null Zeilen" kann
--              nicht an fehlender Sichtbarkeit liegen.
--              VORBEDINGUNG (1e) — NICHT BERICHTET. Die zwei SQL-Gegenproben aus TEIL 1
--              (rls_aktiv / anzahl_policies und frei=4 / besetzt=4 / gesamt=8) stehen in
--              der Rueckmeldung dieses Laufs NICHT. Die Saat-Zahl ist ueber den
--              Sichtbarkeits-Beleg mittelbar belegt (acht Kennungen), die RLS-Lage NICHT.
--              WER SIE BRAUCHT, FINDET SIE HIER NICHT — das steht hier, damit niemand
--              aus dem Schweigen auf ein Ergebnis schliesst.
--              CACHE-BELEG (TEIL 2, Vorbereitung 3): das Lesen lieferte SOFORT 200 —
--              KEIN manuelles Nachladen noetig. FALLE (5) ist nicht eingetreten; es gab
--              nichts zu protokollieren.
--
--              M-1: KEINER DER DREI AUFGEFUEHRTEN AUSGAENGE IST SO EINGETRETEN, WIE ER
--                   FORMULIERT WAR. ES IST AUSGANG 3 — "etwas anderes" — UND DAS IST
--                   SELBST DER BEFUND, KEIN SCHOENHEITSFEHLER.
--                   GEMESSENER ZUSTAND: Null-Treffer -> 204 No Content, Content-Range
--                   */*. Ein Treffer -> 204 No Content, Content-Range 0-0/*. KEIN
--                   Prefer-Kopf in beiden Aufrufen.
--                   WARUM WEDER AUSGANG 1 NOCH 2: Ausgang 2 verlangt verschiedene
--                   STATUSCODES — beide sind 204. Ausgang 1 verlangt, dass beide
--                   Aufrufe GLEICH antworten — sie tun es nicht, die Kopfzeile
--                   unterscheidet sie.
--                   WAS DIE PROBE UEBERSEHEN HATTE, und es ist die Lehre dieses Laufs:
--                   Sie hat die Unterscheidung am STATUSCODE gesucht und nicht damit
--                   gerechnet, dass sie im VORGABEFALL — ohne jeden Prefer-Kopf — in
--                   einer KOPFZEILE steht. Sie hat die Kopfzeilen sehr wohl ERHOBEN
--                   ("ZU NOTIEREN, je Aufruf: der STATUSCODE, ALLE Kopfzeilen"); zu eng
--                   war nicht die Erhebung, sondern das AUSWERTUNGSRASTER.
--                   WER DIE DREI AUSGAENGE SPAETER ABGLEICHT UND NUR AUF DEN STATUS
--                   SIEHT, LANDET AUF AUSGANG 1 — also auf dem GEGENTEIL des Befundes:
--                   Der Vorgabefall unterscheidet die zwei Lagen sehr wohl.
--                   Hier steht der ZUSTAND, nicht die Deutung.
--              M-2: AUSGANG 2 IST EINGETRETEN. Null-Treffer -> 204, Content-Range */0.
--                   Ein Treffer -> 204, Content-Range 0-0/1. Beide Antworten tragen
--                   zusaetzlich "preference-applied: count=exact" — der Server bestaetigt
--                   die Praeferenz ausdruecklich; das war nicht erfragt und ist ein
--                   Zusatzbefund.
--                   DASS ES AUSGANG 2 IST, HAENGT AN EINEM HALBSATZ: Der Wortlaut nennt
--                   "*/1" beim Ein-Treffer, gekommen ist "0-0/1". Die Klammer "(oder
--                   eine gleichwertige Form, die 0 gegen 1 stellt)" faengt das auf.
--                   OHNE SIE WAERE AUCH M-2 IN AUSGANG 3 GELANDET.
--                   AUSGANG 3 — dieselbe Zahl in beiden Antworten, der gefaehrlichste —
--                   IST AUSGESCHLOSSEN.
--              M-3: AUSGANG 1 IST EINGETRETEN, ohne Abweichung. Null-Treffer -> 406 mit
--                   dem Rumpf {"code":"PGRST116","details":"The result contains 0 rows",
--                   "hint":null,"message":"Cannot coerce the result to a single JSON
--                   object"}. Ein Treffer -> 200, Content-Type
--                   application/vnd.pgrst.object+json, Content-Range 0-0/*, ein
--                   EINZELNES Objekt.
--                   DIE VORBEDINGUNG IST DAMIT ERFUELLT: Der Ein-Treffer liefert ein
--                   Objekt und keine Liste — die 406 ist also aussagekraeftig und nicht
--                   der Beleg eines nicht vorhandenen Weges.
--                   ZUSATZBEFUND, nicht erfragt: die Fehlerantwort traegt
--                   "Proxy-Status: PostgREST; error=PGRST116".
--              M-4: AUSGANG 1 IST EINGETRETEN, ohne Abweichung. Null-Treffer -> 200,
--                   Content-Length 2, Rumpf []. Ein Treffer -> 200, Rumpf mit einer
--                   Liste aus EINEM Objekt.
--
--              TEIL 4 (unabhaengige Sicht ohne PostgREST): VIER a-Zeilen unveraendert
--                   (BESETZT, ERFUNDEN-saat, wurde_geschrieben false), VIER d-Zeilen
--                   geschrieben (BESETZT, ERFUNDEN-geschrieben, true) — genau das Bild,
--                   das TEIL 4 als Bedingung nennt.
--                   DAMIT IST FALLE (3) BESTAETIGT ALS WIRKSAM: Die Paarung hat
--                   getragen, keine Messung hat einer anderen ihre Zeile weggenommen.
--              TEIL 5: der drop ist gelaufen, tabelle_noch_da = 0.
--
--              WAS DIESER LAUF NICHT GEMESSEN HAT — DREI DINGE, und sie gehoeren hier
--              und nicht in eine Fussnote:
--                (1) DIE VARIANTE OHNE return=representation unter Singular-Anforderung.
--                    Sie steht als GRENZE an M-3 und bleibt offen.
--                (2) DIE NEBENLAEUFIGKEIT. Zwei gleichzeitige bedingte Schreibungen sind
--                    nicht gefahren worden. "ATOMAR HEISST NICHT SICHER"
--                    (docs/plattform-befunde.md, LAUF 3, Grenze 3) ist von diesem Lauf
--                    WEDER BESTAETIGT NOCH WIDERLEGT.
--                (3) DIE FASSUNG. Gemessen ist DIESE Instanz an DIESEM Tag, nicht
--                    "PostgREST 16" (LAUF 3, Grenze 1). Welche Fassung antwortete, ist
--                    nicht erhoben.
--              FALLE (4) — die Nicht-Wiederholbarkeit ohne neue Saat — IST NICHT
--              GEPRUEFT: es gab nur EINEN Durchlauf.
--
--              PROVENIENZ: GEMESSEN vom Owner am 2026-09-04, acht Aufrufe gegen den
--              echten Endpunkt plus Sichtbarkeits-Beleg, Gegenlesung und Aufraeum-
--              Gegenprobe. Berichtet ist der BESTAND (Statuscodes, Kopfzeilen, Ruempfe,
--              Tabelleninhalt); die Zuordnung zu den Ausgaengen ist eine ABLEITUNG
--              daraus (CC, 2026-09-04) und keine zweite Beobachtung.
--
-- HERKUNFT DER BAUFORM: upsert-arbiter-probe.sql (Kopf-Felder, Wegwerf-Tabelle, RLS im
--              selben Zug ohne Policy, abgesetzte TEIL-Baender, Anleitung in
--              Kommentarform fuer den REST-Teil, unabhaengige Gegenlesung im SQL-Editor,
--              Pflicht-Aufraeumen mit Gegenprobe) und deren eigener Herkunft
--              restore-drill.sql.

-- ============================================================================
-- TEIL 1 — DIE WEGWERF-TABELLE UND IHRE SAAT. Im SQL-EDITOR ausfuehren.
--
-- SIE IST KEINE MIGRATION. Sie traegt KEINE Nummer, sie steht NICHT in
-- supabase/migrations/, und sie schreibt KEINEN Eintrag in schema_migrations.
-- Der Unterschied ist nicht formal: eine Migration behauptet einen dauerhaften
-- Schema-Schritt, diese Tabelle existiert fuer die Dauer einer Messung.
--
-- DIE FORM BILDET DEN GEMESSENEN FALL NACH UND NICHT project_secrets: Was der
-- Riegel braucht, ist eine Zeile mit einem ZUSTAND, auf den eine Schreibung
-- bedingt. Die Tabelle traegt deshalb genau das und sonst nichts.
-- SIE ENTSCHEIDET NICHTS UEBER DIE BAUFORM DES RIEGELS. Hier steht die Gestalt
-- der MESSUNG, nicht die des Bauwerks.
-- ============================================================================

-- (1a) DIE TABELLE.
create table public._bedingte_schreibung_probe (
  id uuid not null default gen_random_uuid(),
  -- DER STABILE GRIFF. Ueber ihn adressiert jede Messung ihre eigene Zeile;
  -- er wechselt nie und ist nicht Teil der Bedingung.
  kennung text not null,
  -- DER ZUSTAND, AUF DEN BEDINGT WIRD. Genau zwei Werte kommen vor: 'FREI'
  -- (die Schreibung trifft) und 'BESETZT' (sie trifft nicht).
  zustand text not null,
  -- DIE NUTZLAST. Sie zeigt im Bestand, OB geschrieben wurde — unabhaengig
  -- davon, was die HTTP-Antwort sagt. Das ist die zweite, vom Antwortweg
  -- unabhaengige Sicht (TEIL 4).
  nutzlast text,
  aktualisiert_at timestamptz,
  created_at timestamptz not null default now(),
  constraint _bedingte_schreibung_probe_pkey primary key (id),
  constraint _bedingte_schreibung_probe_kennung_key unique (kennung),
  constraint _bedingte_schreibung_probe_zustand_check
    check (zustand in ('FREI', 'BESETZT'))
);

-- (1b) RLS IM SELBEN ZUG — und ausdruecklich hier, nicht "gleich danach".
--      GRUND, uebernommen aus 0021_project_secrets.sql und aus
--      upsert-arbiter-probe.sql: Eine neue Tabelle in public OHNE "enable row
--      level security" ist SOFORT fuer anon offen, und der anon-Key steckt im
--      Client-Bundle jeder ausgelieferten Seite (docs/immer-beachten.md,
--      "GRANTS SCHUETZEN NICHTS"). Das gilt auch fuer eine Tabelle, die zehn
--      Minuten existiert: das Zeitfenster ist kein Schutz, es ist nur ein
--      kleineres Ziel.
--      NICHT auf den Event-Trigger rls_auto_enable verlassen — er existiert nur
--      in der laufenden DB und ist kein Ersatz fuer die ausdrueckliche Anweisung.
alter table public._bedingte_schreibung_probe enable row level security;

-- (1c) KEINE POLICY — UND HIER IST DAS EINE MESS-ENTSCHEIDUNG, NICHT NUR EINE
--      SICHERHEITS-ENTSCHEIDUNG.
--      Dieselbe Bauform wie project_secrets: unter aktiver RLS ohne JEDE Policy
--      ist die Tabelle fuer anon und authenticated vollstaendig verschlossen; nur
--      service_role kommt durch, und zwar ueber bypassrls.
--      WARUM DAS DIE MESSUNG SAUBER HAELT: Gaebe es eine Policy, liefe jede
--      Messung durch einen Sichtbarkeits-Filter, und ein "null Zeilen" haette ZWEI
--      moegliche Ursachen. Ohne Policy und mit service_role hat es nur EINE — den
--      Zustandsfilter. Das ist die Aufloesung der Falle (2) im Kopf.
--      Hier steht deshalb bewusst kein "create policy".

-- (1d) DIE SAAT — ACHT ZEILEN, VIER PAARE.
--      JE MESSUNG EIN PAAR: eine a-Zeile auf 'BESETZT' (die Schreibung trifft
--      NICHTS) und eine d-Zeile auf 'FREI' (sie trifft GENAU EINE).
--      BEIDE ZEILEN EINES PAARES EXISTIEREN UND SIND LESBAR. Das ist der Punkt:
--      Der Null-Treffer-Fall ist NICHT "die Zeile gibt es nicht", sondern "die
--      Zeile gibt es, und die Bedingung passt nicht". Nur so misst die Probe den
--      Fall, den der Riegel erzeugt.
insert into public._bedingte_schreibung_probe (kennung, zustand, nutzlast) values
  ('ERFUNDEN-a1', 'BESETZT', 'ERFUNDEN-saat'),
  ('ERFUNDEN-d1', 'FREI',    'ERFUNDEN-saat'),
  ('ERFUNDEN-a2', 'BESETZT', 'ERFUNDEN-saat'),
  ('ERFUNDEN-d2', 'FREI',    'ERFUNDEN-saat'),
  ('ERFUNDEN-a3', 'BESETZT', 'ERFUNDEN-saat'),
  ('ERFUNDEN-d3', 'FREI',    'ERFUNDEN-saat'),
  ('ERFUNDEN-a4', 'BESETZT', 'ERFUNDEN-saat'),
  ('ERFUNDEN-d4', 'FREI',    'ERFUNDEN-saat');

-- (1e) GEGENPROBE VOR DER MESSUNG — PFLICHT. Sie beantwortet drei Fragen, die man
--      sonst erst am Messergebnis raet.
select rel.relrowsecurity            as rls_aktiv,
       (select count(*) from pg_policy pol where pol.polrelid = rel.oid)
                                     as anzahl_policies
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_bedingte_schreibung_probe';
-- ZU LESEN: rls_aktiv = true UND anzahl_policies = 0. Alles andere: ANHALTEN.

select count(*) filter (where zustand = 'FREI')    as frei,
       count(*) filter (where zustand = 'BESETZT') as besetzt,
       count(*)                                    as gesamt
from public._bedingte_schreibung_probe;
-- ZU LESEN: frei = 4, besetzt = 4, gesamt = 8. Alles andere: ANHALTEN — dann
-- ist die Saat nicht vollstaendig, und die Paare stehen nicht, wie die Messungen
-- sie voraussetzen.

-- ============================================================================
-- TEIL 2 — VORBEREITUNG UND DER SICHTBARKEITS-BELEG. GEGEN DEN REST-ENDPUNKT.
--
-- Dieser TEIL ist eine ANLEITUNG in Kommentarform, kein ausfuehrbares SQL. Er
-- steht hier und nicht in einer zweiten Datei, damit Tabellenform und Messung
-- nicht auseinanderlaufen koennen.
-- ============================================================================
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
--     Ein einfaches Lesen muss die Tabelle FINDEN, nicht vermissen:
--
--       curl -sS -i "<PROJEKT-REST-URL>/_bedingte_schreibung_probe?select=kennung" \
--         -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--         -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY"
--
--     ERWARTUNG: HTTP 200 und acht Kennungen. Behauptet die Antwort stattdessen,
--     die Tabelle sei unbekannt, im SQL-Editor das Nachladen anstossen —
--
--       notify pgrst, 'reload schema';
--
--     — das Lesen wiederholen UND BEIDES PROTOKOLLIEREN: dass es noetig war und
--     wie lange es gedauert hat.
--
-- (4) DER SICHTBARKEITS-BELEG — PFLICHT, UND ER LOEST DIE FALLE (2) DES KOPFES AUF.
--     Das Lesen aus (3) ist zugleich dieser Beleg, WENN es alle acht Zeilen
--     zurueckgibt. Er zeigt: die a-Zeilen EXISTIEREN und sind ueber DIESEN Weg mit
--     DIESEM Schluessel SICHTBAR.
--     WAS ER TRAEGT: Meldet eine spaetere Schreibung fuer eine a-Zeile "null
--     Zeilen", kann das NICHT an fehlender Sichtbarkeit liegen — sie ist hier
--     gemessen. Es bleibt nur der Zustandsfilter.
--     OHNE DIESEN SCHRITT IST DIE GANZE PROBE WERTLOS, und zwar unauffaellig: Jede
--     Messung liefe durch, jede Antwort saehe brauchbar aus, und die Deutung waere
--     nicht zu halten.
--     ZU NOTIEREN: dass acht Zeilen kamen, und welche vier auf 'FREI' standen.
--
-- (5) ALLE MESSUNGEN LAUFEN MIT "-i". Nicht aus Bequemlichkeit: Fuer M-2 ist die
--     Antwort ein KOPFZEILEN-Wert (Content-Range), fuer M-1 ist sie ein
--     STATUSCODE ohne Rumpf. Wer nur den Rumpf liest, sieht bei beiden nichts und
--     haelt das fuer das Ergebnis.

-- ============================================================================
-- TEIL 3 — DIE VIER MESSUNGEN. GEGEN DEN REST-ENDPUNKT, NICHT IM SQL-EDITOR.
--
-- ALLE VIER HABEN DIESELBE GESTALT und unterscheiden sich in genau einem Stueck:
--   PATCH auf ?kennung=eq.<ZEILE>&zustand=eq.FREI
--   Rumpf:  {"zustand":"BESETZT","nutzlast":"ERFUNDEN-geschrieben","aktualisiert_at":"2026-09-04T12:00:00Z"}
-- Der Filter traegt BEIDE Bedingungen: die Kennung adressiert die Zeile, der
-- Zustand ist die BEDINGUNG. Bei einer a-Zeile ('BESETZT') passt sie nicht, bei
-- einer d-Zeile ('FREI') passt sie genau einmal.
-- DIE FORM BILDET DEN GEMESSENEN FALL NACH UND IST KEINE EMPFEHLUNG fuer die
-- Bauform des Riegels.
--
-- JE MESSUNG ZWEI AUFRUFE: zuerst gegen die a-Zeile (NULL Treffer), dann gegen
-- die d-Zeile (EIN Treffer). DIE REIHENFOLGE IST GLEICHGUELTIG, DIE PAARUNG NICHT
-- — s. FALLE (3) im Kopf.
-- ============================================================================
--
-- ---------------------------------------------------------------------------
-- M-1 · DER VORGABEFALL. Kein Prefer, kein besonderes Accept. Antwortet auf
--       Frage (a) und (d) in der Gestalt, die ein Aufrufer ohne Zusatzangaben
--       bekommt.
--
--   NULL-TREFFER (a1):
--     curl -sS -i -X PATCH \
--       "<PROJEKT-REST-URL>/_bedingte_schreibung_probe?kennung=eq.ERFUNDEN-a1&zustand=eq.FREI" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -d '{"zustand":"BESETZT","nutzlast":"ERFUNDEN-geschrieben","aktualisiert_at":"2026-09-04T12:00:00Z"}'
--
--   EIN TREFFER (d1): identisch, nur "ERFUNDEN-a1" -> "ERFUNDEN-d1".
--
--   ZU NOTIEREN, je Aufruf: der STATUSCODE, ALLE Kopfzeilen, und der Rumpf
--   (auch wenn er leer ist — "leer" ist hier ein Befund und kein Nichts).
--
--   AUSGANG 1: BEIDE Aufrufe antworten gleich (etwa 204 ohne Rumpf). Dann
--     UNTERSCHEIDET DER VORGABEFALL DIE ZWEI LAGEN NICHT. Ein Riegel, der auf
--     dieser Antwort aufbaut, kann Gewinner und Verlierer nicht trennen.
--   AUSGANG 2: Die Statuscodes unterscheiden sich. Dann traegt schon der
--     Vorgabefall die Auskunft — welcher Code zu welcher Lage gehoert, gehoert
--     woertlich notiert.
--   AUSGANG 3: Etwas anderes. ANHALTEN und den Bestand notieren, statt ihn
--     einzuordnen.
--
-- ---------------------------------------------------------------------------
-- M-2 · DER ZAEHLER. Dasselbe mit "Prefer: count=exact". Antwortet auf Frage (b).
--       DIES IST DIE MESSUNG, DIE DEN WIDERSPRUCH DER ZWEI ANBIETERSEITEN
--       ENTSCHEIDET (s. ZWECK, Frage (b)).
--
--   NULL-TREFFER (a2):
--     curl -sS -i -X PATCH \
--       "<PROJEKT-REST-URL>/_bedingte_schreibung_probe?kennung=eq.ERFUNDEN-a2&zustand=eq.FREI" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -H "Prefer: count=exact" \
--       -d '{"zustand":"BESETZT","nutzlast":"ERFUNDEN-geschrieben","aktualisiert_at":"2026-09-04T12:00:00Z"}'
--
--   EIN TREFFER (d2): identisch, nur "ERFUNDEN-a2" -> "ERFUNDEN-d2".
--
--   ZU NOTIEREN: die Kopfzeile "Content-Range" IM WORTLAUT, je Aufruf — und
--   wenn sie fehlt, dass sie fehlt.
--
--   AUSGANG 1: KEIN Content-Range in beiden Antworten. Dann wirkt count bei einer
--     Schreibung nicht; SEITE A traegt fuer den HTTP-Weg NICHT, und die
--     Client-Doku beschreibt etwas, das der Endpunkt so nicht liefert.
--   AUSGANG 2: Content-Range mit "*/0" beim Null-Treffer und "*/1" beim
--     Ein-Treffer (oder eine gleichwertige Form, die 0 gegen 1 stellt). Dann
--     ZAEHLT count DIE BETROFFENEN ZEILEN, SEITE A traegt, und der Riegel hat
--     seine Auskunft.
--   AUSGANG 3: Content-Range mit derselben Zahl in beiden Antworten — etwa "*/8",
--     der Tabellenbestand. Dann zaehlt count die TABELLE und nicht die Treffer;
--     SEITE B traegt, und die Zahl ist fuer einen Riegel UNBRAUCHBAR. Das waere
--     der gefaehrlichste Ausgang: eine Zahl, die dasteht und das Falsche zaehlt.
--   AUSGANG 4: Etwas anderes. ANHALTEN und den Wortlaut notieren.
--
-- ---------------------------------------------------------------------------
-- M-3 · DIE SINGULAR-ANFORDERUNG. Antwortet auf Frage (c).
--       "Accept: application/vnd.pgrst.object+json" ZUSAMMEN mit
--       "Prefer: return=representation".
--
--   WARUM BEIDES ZUSAMMEN: Ohne return=representation gibt es keinen Rumpf, auf
--   den die Singular-Form angewandt werden koennte — die Frage haette dann keinen
--   Gegenstand.
--
--   NULL-TREFFER (a3):
--     curl -sS -i -X PATCH \
--       "<PROJEKT-REST-URL>/_bedingte_schreibung_probe?kennung=eq.ERFUNDEN-a3&zustand=eq.FREI" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -H "Accept: application/vnd.pgrst.object+json" \
--       -H "Prefer: return=representation" \
--       -d '{"zustand":"BESETZT","nutzlast":"ERFUNDEN-geschrieben","aktualisiert_at":"2026-09-04T12:00:00Z"}'
--
--   EIN TREFFER (d3): identisch, nur "ERFUNDEN-a3" -> "ERFUNDEN-d3".
--
--   DER EIN-TREFFER-AUFRUF IST HIER NICHT NUR POSITIVKONTROLLE, SONDERN
--   VORBEDINGUNG: Liefert er KEIN einzelnes Objekt, dann traegt die Singular-Form
--   auf einem PATCH ueberhaupt nicht — und der Null-Treffer-Aufruf sagt dann
--   nichts ueber PGRST116, sondern nur, dass der Weg nicht existiert.
--
--   AUSGANG 1: Null-Treffer -> HTTP 406 mit "code":"PGRST116" und
--     "details":"The result contains 0 rows"; Ein-Treffer -> HTTP 200 mit einem
--     EINZELNEN Objekt (keine Liste). Dann traegt der Mechanismus auch auf einem
--     PATCH, und der Riegel hat eine Auskunft mit eigenem Fehlercode.
--   AUSGANG 2: Null-Treffer -> KEIN 406, sondern 200/204 mit null, {} oder leer.
--     Dann traegt der an einem GET illustrierte Mechanismus auf einem PATCH NICHT.
--   AUSGANG 3: Ein-Treffer liefert eine LISTE statt eines Objekts. Dann greift die
--     Singular-Anforderung auf diesem Weg gar nicht — beide Aufrufe sind
--     gegenstandslos, und das ist selbst der Befund.
--   AUSGANG 4: Etwas anderes. ANHALTEN.
--
--   GRENZE DIESER MESSUNG, AUSDRUECKLICH: Die Variante OHNE return=representation
--   ist NICHT gemessen. Sie entspricht einem supabase-js ".update(...).single()"
--   ohne ".select()". Ob dort dieselbe 406 entsteht, bleibt nach dieser Probe
--   OFFEN — hier steht, dass es offen bleibt, nicht eine Vermutung darueber.
--
-- ---------------------------------------------------------------------------
-- M-4 · DIE MENGEN-RUECKGABE. "Prefer: return=representation", ohne
--       Singular-Accept. Antwortet auf Frage (a) in der Gestalt, die ein Aufrufer
--       am ehesten benutzt.
--
--   NULL-TREFFER (a4):
--     curl -sS -i -X PATCH \
--       "<PROJEKT-REST-URL>/_bedingte_schreibung_probe?kennung=eq.ERFUNDEN-a4&zustand=eq.FREI" \
--       -H "apikey: $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Authorization: Bearer $SUPABASE_SERVICE_ROLE_KEY" \
--       -H "Content-Type: application/json" \
--       -H "Prefer: return=representation" \
--       -d '{"zustand":"BESETZT","nutzlast":"ERFUNDEN-geschrieben","aktualisiert_at":"2026-09-04T12:00:00Z"}'
--
--   EIN TREFFER (d4): identisch, nur "ERFUNDEN-a4" -> "ERFUNDEN-d4".
--
--   AUSGANG 1: Null-Treffer -> "[]", Ein-Treffer -> eine Liste mit EINEM Objekt.
--     Dann ist die Laenge der zurueckgegebenen Liste die Auskunft, und sie ist am
--     Rumpf ablesbar, ohne Kopfzeilen und ohne Fehlercode.
--   AUSGANG 2: Null-Treffer -> kein Rumpf trotz return=representation. Dann traegt
--     auch dieser Weg die Unterscheidung nicht.
--   AUSGANG 3: Etwas anderes. ANHALTEN.

-- ============================================================================
-- TEIL 4 — DER BESTAND, IM SQL-EDITOR GEGENGELESEN.
--
-- WARUM NOCH EINMAL, obwohl TEIL 3 schon antwortet: Die Antworten dort kommen
-- ueber DENSELBEN Weg wie die Messung. Antwortet PostgREST aus einem Grund
-- verzerrt, verzerrt es beide Richtungen gleich. Diese Abfrage sieht den Bestand
-- OHNE PostgREST — sie ist die unabhaengige zweite Sicht.
--
-- SIE BEANTWORTET EINE FRAGE, DIE KEINE HTTP-ANTWORT BEANTWORTEN KANN: ob
-- tatsaechlich geschrieben wurde. Eine Antwort kann "nichts getroffen" melden und
-- trotzdem geschrieben haben, oder umgekehrt — hier steht, was in der Tabelle
-- gelandet ist.
-- ============================================================================

select kennung,
       zustand,
       nutzlast,
       aktualisiert_at is not null as wurde_geschrieben
from public._bedingte_schreibung_probe
order by kennung;
-- ZU LESEN, und es ist die Probe auf die ganze Messung:
--   Die VIER a-Zeilen MUESSEN unveraendert sein: zustand 'BESETZT',
--   nutzlast 'ERFUNDEN-saat', wurde_geschrieben = false.
--   Die VIER d-Zeilen MUESSEN geschrieben sein: zustand 'BESETZT',
--   nutzlast 'ERFUNDEN-geschrieben', wurde_geschrieben = true.
-- WEICHT DAS AB, IST DIE DEUTUNG DER HTTP-ANTWORTEN HINFAELLIG — dann hat eine
-- Schreibung etwas anderes getan als angenommen, und die Ausgaenge in TEIL 3
-- beschreiben einen anderen Vorgang als den gemeinten. In dem Fall: den Bestand
-- notieren und ANHALTEN.

-- ============================================================================
-- TEIL 5 — AUFRAEUMEN. PFLICHT, NICHT OPTIONAL. Im SQL-EDITOR.
--
-- Diese Anweisung ist NICHT auskommentiert und soll es nicht sein: eine
-- Wegwerf-Tabelle, die stehen bleibt, ist eine Tabelle in public, die niemand
-- mehr einordnet — und sie traegt RLS ohne Policy, sieht in jedem Advisor-Lauf
-- also aus wie ein vergessener Geheimnis-Speicher.
-- Der drop nimmt Constraints und Zeilen mit; es bleibt nichts zurueck.
-- ============================================================================

drop table public._bedingte_schreibung_probe;

-- GEGENPROBE NACH DEM AUFRAEUMEN — sie kostet nichts und beantwortet die Frage,
-- die man sonst erst in vier Wochen stellt.
select count(*) as tabelle_noch_da
from pg_class rel
join pg_namespace nsp on nsp.oid = rel.relnamespace
where nsp.nspname = 'public'
  and rel.relname = '_bedingte_schreibung_probe';
-- ZU LESEN: 0. Alles andere heisst, der drop ist nicht gelaufen.
