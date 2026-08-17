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
--                  IST NICHT TEIL DIESER DATEI. Sie ist ein SCHREIBVORGANG, und dieser
--                  Ordner darf ausschliesslich lesen (harte Regel im README). Von Hand,
--                  einzeln, auf einem TESTPROJEKT — nie auf einem Kundenprojekt:
--                    insert into public.project_secrets (project_id, target, secret)
--                    values ('<PROJEKT_UUID>', '<ZIELWERT>', '__probe__');
--                      -> ERWARTUNG: ANGENOMMEN.
--                    insert into public.project_secrets (project_id, target, secret)
--                    values ('<PROJEKT_UUID>', '<ZIELWERT_MIT_TIPPFEHLER>', '__probe__');
--                      -> ERWARTUNG: ABGEWIESEN mit 23514 (check_violation).
--                    delete from public.project_secrets
--                    where project_id = '<PROJEKT_UUID>' and secret = '__probe__';
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
-- VERIFIZIERT: NOCH NIE gegen echte Daten gelaufen (angelegt 2026-08-17, Scheibe 11.1a).
--              Wer sie zuerst faehrt, zieht dieses Datum nach — eine ungefahrene Probe
--              ist eine Vermutung ueber ihr eigenes Ergebnis.

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
