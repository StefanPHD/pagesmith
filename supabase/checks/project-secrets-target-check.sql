-- ZWECK:       Beantwortet, WELCHE Zielwerte die Geheimnis-Tabelle heute zulaesst — die
--              Definition von project_secrets_target_valid im WORTLAUT aus dem Katalog,
--              plus der Protokoll-Eintrag der Migration, die sie zuletzt gesetzt hat.
--              Wiederverwendbar fuer JEDES weitere Ziel: der gepruefte Wert steht als
--              PLATZHALTER im Kopf, nicht fest verdrahtet.
-- ERWARTUNG:   Je Probe unten als eigener Kommentar. Weicht eine ab, ist das ein echter
--              Fund — kein Code-Deploy, Ursache klaeren. Nichts wird stillschweigend
--              angeglichen.
-- WANN:        ZWEIMAL, und der erste Lauf ist der wichtigere:
--              (a) VOR dem Einspielen der Ziel-Migration — der abgelesene Wortlaut ist
--                  der Ausgangszustand und gehoert ins Protokoll des Laufs. Er ist die
--                  einzige Gelegenheit, ihn zu erfahren: OB eine Migration angewandt
--                  ist, ist am Repo NICHT entscheidbar.
--              (b) NACH dem Einspielen — der neue Wert muss im Wortlaut dastehen.
-- PLATZHALTER: <ZIELWERT> im Kopf der FALLE (2) unten — der Wert, um den die Migration
--              den Constraint erweitert hat (z.B. 'linkedin'). In den Abfragen selbst
--              kommt er NICHT vor; sie lesen den Wortlaut und niemand muss ihn kennen.
-- FALLE:       (1) DIESE DATEI ALLEIN IST EINE TAUTOLOGIE. Sie liest den Katalog-Text
--                  zurueck, den die Migration gerade geschrieben hat — sie kann nicht
--                  zeigen, dass der Constraint WIRKT. Ein Constraint, der alles
--                  durchlaesst, saehe hier identisch aus.
--              (2) DIE VERHALTENS-POSITIVKONTROLLE STEHT DESHALB HIER ALS ANLEITUNG UND
--                  IST NICHT TEIL DIESER DATEI. Sie ist ein SCHREIBVORGANG AN EINER
--                  ECHTEN TABELLE. Der Ordner laesst einen Schreibvorgang nur an einem
--                  WEGWERF-OBJEKT zu, das die Datei selbst wieder entfernt (harte Regel
--                  im README) — eine echte Tabelle ist keines. Der Zweck der Regel
--                  trifft diesen Fall damit unveraendert: die praezisierte Fassung macht
--                  den Verzicht hier NICHT hinfaellig. Von Hand,
--                  auf einem TESTPROJEKT — nie auf einem Kundenprojekt.
--
--                  ZWEI GETRENNTE TRANSAKTIONEN, JE begin … rollback. ERST DER
--                  FEHLSCHLAG, DANN DER ERFOLG:
--
--                    -- (b) DIE ABWEISUNG — der wertvollere der beiden Belege.
--                    begin;
--                    insert into public.project_secrets (project_id, target, secret)
--                    values ('<PROJEKT_UUID>', '<ZIELWERT_MIT_TIPPFEHLER>', '__probe__');
--                    rollback;
--                      -> ERWARTUNG: ABGEWIESEN mit SQLSTATE 23514 (check_violation).
--
--                    -- (a) DIE ANNAHME.
--                    begin;
--                    insert into public.project_secrets (project_id, target, secret)
--                    values ('<PROJEKT_UUID>', '<ZIELWERT>', '__probe__');
--                    rollback;
--                      -> ERWARTUNG: ANGENOMMEN (1 Zeile), danach durch das rollback WEG.
--
--                  DER SQL-EDITOR ZEIGT DEN CONSTRAINT-NAMEN IN DER FEHLERMELDUNG —
--                  GEMESSEN (Owner, 2026-08-27, im Lauf der Scheibe 11.8f): die Meldung
--                  nannte project_secrets_target_valid.
--                  DIESE ZEILE SAGTE BIS ZUM 2026-08-27 DAS GEGENTEIL ("ist nicht
--                  gemessen"). Sie ist ERSETZT und nicht gestempelt: Eine Erwartung, die
--                  eine Angabe als ungemessen fuehrt, obwohl sie gemessen ist, laesst
--                  einen Pruefer weniger verlangen als er koennte.
--                  DIE GRENZE GEHOERT DAZU: Gemessen ist es im SUPABASE-SQL-EDITOR, nicht
--                  ueber andere Zugaenge hinweg — ueber psql, den JS-Client oder ein
--                  anderes Werkzeug sagt der Befund NICHTS.
--                  DIE ERWARTUNG BLEIBT TROTZDEM AUF DIE ZAHL 23514 GESTUETZT, und das
--                  ist Absicht: Sie soll auch dann pruefbar sein, wenn jemand die Probe
--                  ueber einen anderen Zugang faehrt. Der Name ist ab jetzt ein
--                  ERWARTETER Zugewinn im Editor — keine Bedingung des Bestehens.
--
--                  WARUM TRANSAKTION UND NICHT insert/insert/delete — die Form bis
--                  2026-08-27 und bei 0022 bis 0024 gefahren:
--                    · DIE ZEILE ENTSTEHT GAR NICHT. Ein rollback ist keine ZWEITE
--                      Handlung, die man vergessen kann; schliesst jemand das Fenster,
--                      rollt die Sitzung ohnehin zurueck. Beim alten Weg blieb die Zeile
--                      stehen, wenn der delete ausfiel — in der GEHEIMNIS-Tabelle.
--                    · KEIN delete AUF project_secrets MEHR. Damit gibt es keine
--                      where-Klausel, die zu weit sein koennte. Der gefaehrlichste Teil
--                      der alten Anleitung entfaellt ganz.
--                    · ZWEI TRANSAKTIONEN UND NICHT EINE MIT savepoint: Ein
--                      fehlschlagender Insert bricht in Postgres die GANZE Transaktion
--                      ab — danach nimmt sie bis zum rollback nichts mehr an. Getrennt
--                      ist jede Richtung eine eigene, klar ablesbare Beobachtung.
--                  DIE FORM IST GEMESSEN, NICHT ANGENOMMEN: begin … rollback laeuft im
--                  Supabase-SQL-Editor in EINEM Ausfuehrungsblock (GEMESSEN, Owner,
--                  2026-08-27). Der Nachweis lief nicht ueber select 1 allein, sondern
--                  ueber eine temporaere Tabelle, die nach dem rollback nicht mehr
--                  existierte (to_regclass lieferte NULL).
--
--                  DIE ABWEISUNG IST DER WERTVOLLERE DER BEIDEN BELEGE: Die Annahme
--                  allein saehe bei einem Constraint, der alles durchlaesst, identisch
--                  aus. Erst die Abweisung zeigt, dass der Schutz noch da ist.
--                  KEIN "limit 1" UND KEINE SUCHE NACH EINEM PROJEKT: Die Projekt-ID wird
--                  ausdruecklich eingesetzt. Eine Probe, die sich selbst ein Projekt
--                  sucht, koennte ein Kundenprojekt treffen — und sie schriebe dort eine
--                  Zeile in eine Tabelle, deren Inhalt niemand zurueckliest.
--              (3) KEIN GEHEIMNISWERT VERLAESST DEN SERVER: Diese Datei selektiert die
--                  secret-Spalte NICHT, und die Anleitung oben setzt einen erfundenen
--                  Wert ein. Wer die Datei erweitert, haelt das ein.
--              (4) schema_migrations existiert DREIMAL im Cluster (public / auth /
--                  realtime). Probe 2 filtert deshalb auf das Schema public — ohne den
--                  Filter liefert sie mehrere Zeilen und sieht wie ein Befund aus.
-- VERIFIZIERT: UNGEKLAERT, und das steht hier so, statt rekonstruiert zu werden.
--              ZWEI STELLEN WIDERSPRECHEN SICH (aufgefallen CC, 2026-08-27):
--                · DIESER KOPF sagte bis heute "NOCH NIE gegen echte Daten gelaufen
--                  (angelegt 2026-08-17, Scheibe 11.1a)".
--                · docs/db-stand.md sagt, sie SEI gelaufen — "LIVE ABGELESEN am
--                  2026-08-17 (SQL-Editor, Owner, im Live-Test der Scheibe 11.1a; Probe:
--                  supabase/checks/project-secrets-target-check.sql)".
--              AM REPO IST NICHT ENTSCHEIDBAR, welche Stelle recht hat. Die naheliegende
--              Erklaerung — sie lief, und die Nachzieh-Auflage in diesem Kopf wurde nicht
--              befolgt — ist eine VERMUTUNG und wird hier nicht als Befund eingetragen.
--              NICHTS WIRD ANGEGLICHEN: Eine stille Entscheidung fuer eine der beiden
--              Stellen loeschte den Widerspruch, ohne ihn aufzuloesen.
--              GEFAHREN AM 2026-08-27 (Owner, Supabase-SQL-Editor, im Lauf der Scheibe
--              11.8f, Migration 0026): alle drei Proben, ZWEIMAL — Probe 1 vor dem Lauf
--              (VIER Werte) und nach dem Lauf (FUENF Werte, je GENAU EINE Zeile), dazu
--              Probe 2 (0026 protokolliert) und Probe 3 (keine bleibende 'google'-Zeile).
--              Die Verhaltens-Positivkontrolle aus FALLE (2) lief in der
--              Transaktions-Form und bestand in BEIDEN Richtungen.
--              DER WIDERSPRUCH OBEN IST DAMIT NICHT GEKLAERT, und das gehoert
--              ausdruecklich hierher: Ein neuer Lauf sagt nichts darueber, was am
--              2026-08-17 geschah. Er schliesst die Luecke nach VORN — die Datei sagt
--              wieder, wann sie zuletzt gegen echte Daten lief — und laesst die Frage
--              nach dem alten Lauf offen, wo sie steht.

-- PROBE 1 — DIE CONSTRAINT-DEFINITION IM WORTLAUT
-- ERWARTUNG: GENAU EINE Zeile. Die Definition nennt ALLE erlaubten Zielwerte.
--            KEINE Zeile = der Constraint existiert nicht -> die Tabelle nimmt JEDEN
--            Zielwert an, und ein Tippfehler beim Speichern bliebe unbemerkt (das Ziel
--            waere danach STILL inaktiv). Sofort-Stopp, kein Code-Deploy.
--            conrelid gegen die konkrete Tabelle, damit ein gleichnamiger Constraint
--            einer anderen Tabelle nicht mitgelesen wird.
select
  c.conname                      as constraint_name,
  pg_get_constraintdef(c.oid)    as definition
from pg_constraint c
where c.conname  = 'project_secrets_target_valid'
  and c.conrelid = 'public.project_secrets'::regclass;

-- PROBE 2 — WELCHE ZIEL-MIGRATIONEN PROTOKOLLIERT SIND
-- ERWARTUNG: Je Ziel-Migration EINE Zeile mit gefuelltem applied_at, aufsteigend.
--            Fehlt die juengste, ist sie vor ihrer letzten Anweisung abgebrochen — dann
--            beweist Probe 1 nichts ueber einen VOLLZOGENEN Lauf, und der Wortlaut dort
--            kann von einem frueheren Lauf stammen.
--            Der Filter faengt die Ziel-Migrationen ueber den Dateinamen; er ist bewusst
--            weit, damit eine kuenftige Ziel-Migration ohne Aenderung dieser Datei
--            mitkommt.
select version, filename, applied_at
from public.schema_migrations
where filename like '%project_secrets%'
order by version;

-- PROBE 3 — WELCHE ZIELWERTE IN DER TABELLE TATSAECHLICH VORKOMMEN
-- ERWARTUNG: NUR Werte, die Probe 1 in der Definition auffuehrt. Ein Wert, der dort
--            NICHT steht, ist aelter als der heutige Constraint (er wurde geschrieben,
--            als er noch erlaubt war) — dann ist zu klaeren, welcher Code ihn liest.
--            EINE ZAHL, KEIN GEHEIMNIS: gezaehlt wird je Ziel, die secret-Spalte kommt
--            nicht vor.
--            NULL Zeilen sind KEIN Fehler: dann hat noch niemand Zugangsdaten
--            hinterlegt. Diese Probe hat bewusst keine Positivkontrolle — sie
--            beschreibt den Bestand, sie prueft ihn nicht.
select target, count(*) as zeilen
from public.project_secrets
group by target
order by target;
