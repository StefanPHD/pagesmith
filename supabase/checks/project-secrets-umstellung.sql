-- ZWECK:       Prueft die Umstellung der Geheimnis-Tabelle (Migration
--              0021_project_secrets.sql) in FUENF Proben: Ausgangszahl VOR dem Lauf,
--              RLS aktiv, Policy-Liste leer, Uebernahme vollstaendig (Zahl UND Werte),
--              Protokoll-Eintrag vorhanden. Sie steht zwischen Migration und
--              Code-Deploy: ERST wenn alle Proben ihre Erwartung treffen, darf der
--              zugehoerige Code (Bau B) ausgerollt werden — gemessen am NACHHOL-LAUF,
--              nicht am ersten Lauf (s. WANN).
-- ERWARTUNG:   Je Probe unten als eigener Kommentar. Weicht eine ab, ist das ein echter
--              Fund — kein Code-Deploy, Ursache klaeren. Nichts wird stillschweigend
--              angeglichen.
-- WANN:        DREI Zeitpunkte, und der dritte traegt die Freigabe.
--              (a) Probe 0 VOR dem Einspielen von 0021 — die Zahl notieren.
--              (b) Proben 1-4 unmittelbar NACH dem Einspielen.
--              (c) NACHHOL-LAUF: die Migration ein ZWEITES Mal fahren, unmittelbar VOR
--                  dem Bau-B-Deploy — nicht irgendwann danach. Er hat ZWEI Funktionen,
--                  und beide zaehlen: er WEIST DIE WIEDERHOLBARKEIT NACH (zweiter Lauf
--                  bricht nicht ab, ueberschreibt nichts), UND er HOLT JEDE ZEILE NACH,
--                  die seit dem ersten Lauf im Fenster entstanden ist. Danach 3a und 3b
--                  erneut.
--              DAS FREIGABE-GATE FUER DEN CODE-DEPLOY SIND 3a UND 3b NACH (c). Die
--              Messung nach (b) ist es ausdruecklich NICHT — sie war im Moment ihrer
--              Erhebung korrekt und kann durch das Fenster ueberholt worden sein.
-- PLATZHALTER: keine.
-- FALLE:       (1) REIHENFOLGE: Probe 0 ist eine POSITIVKONTROLLE und nur VOR dem Lauf
--                  aussagekraeftig. Ohne die vorher notierte Zahl sehen "null
--                  uebernommen, weil die Quelle leer war" und "null uebernommen, weil
--                  der Lesezugriff nicht griff" am Ergebnis identisch aus — und der
--                  zweite Fall faellt sonst erst auf, wenn der neue Lesepfad live ist.
--                  Dort ist der Ausfall LAUTLOS: der Ingest antwortet unveraendert, die
--                  Browser-Seite laeuft weiter, nur der Server-Forward stirbt.
--              (2) schema_migrations existiert DREIMAL im Cluster (public / auth /
--                  realtime). Jede Katalog-Abfrage hier filtert deshalb auf das Schema
--                  public — ohne den Filter liefert sie mehrere Zeilen und sieht wie ein
--                  Befund aus.
--              (3) PROBE 4 IST DIE VORBEDINGUNG DER ANDEREN: fehlt der Protokoll-Eintrag,
--                  ist die Migration mittendrin abgebrochen. Dann sind 1-3 nicht zu
--                  interpretieren, sondern der Lauf ist zu untersuchen.
--              (4) Probe 3b gibt eine ZAHL aus, NIE einen Geheimniswert. Wer sie
--                  erweitert, haelt das ein — das Geheimnis verlaesst den Server nicht,
--                  auch nicht in ein Pruefergebnis.
--              (5) EINE ABWEICHUNG IN 3a IST ZWEI VERSCHIEDENE BEFUNDE, je nachdem,
--                  WANN sie auftritt — nicht derselbe zweimal. Nach dem ERSTEN Lauf ist
--                  sie ein Fehler der Migration. Nach dem NACHHOL-Lauf ist etwas anderes
--                  im Spiel: dann STOPP und untersuchen, NICHT ein drittes Mal laufen
--                  lassen. Ein Lauf, der eine Zahl geradezieht, die man nicht erklaeren
--                  kann, verdeckt die Ursache, statt sie zu beseitigen.
-- VERIFIZIERT: 2026-08-05 — echter Lauf im SQL-Editor durch Stefan, unmittelbar nach dem
--              Einspielen von 0021. ALLE FUENF Proben trafen ihre ERWARTUNG, KEINE
--              Abweichung; die Messwerte stehen in docs/aktiver-stand.md beim Zuschnitt
--              der ersten Scheibe.
--              WAS DIESES DATUM NICHT DECKT: den NACHHOL-LAUF (s. WANN, Punkt c). Es
--              belegt die Zeitpunkte (a) und (b) — NICHT das Freigabe-Gate fuer den
--              Code-Deploy, das steht weiterhin aus.

-- DAS FENSTER — kurz, weil es der Grund fuer den Nachhol-Lauf ist: Zwischen dem
-- Einspielen von 0021 und dem Bau-B-Deploy schreibt der laufende Code weiterhin
-- AUSSCHLIESSLICH in project_tokens. Das ist kein Fehler, sondern der bewusste
-- No-op-Zustand dieser Scheibe. Ein in diesem Fenster gesetzter Token steht danach aber
-- nur in der Alt-Tabelle, und der neue Lesepfad faende fuer dieses Projekt NICHTS.

-- PROBE 0 — AUSGANGSZAHL, VOR DEM LAUF (Positivkontrolle)
-- ERWARTUNG: GROESSER ALS NULL. Die Zahl notieren, bevor 0021 laeuft — sie ist der
--            Bezugswert fuer 3a.
--            IST SIE NULL, WIRD 0021 NICHT EINGESPIELT. Dann zuerst ueber die
--            Oberflaeche auf einem Testprojekt einen CAPI-Token setzen — ueber den
--            heutigen, unveraenderten Schreibpfad —, Probe 0 wiederholen, und erst
--            danach der Lauf.
--            GRUND: Bei null Bestandszeilen pruefen 3a und 3b NICHTS. Sie treffen ihre
--            Erwartung dann, weil nichts da war, nicht weil etwas funktioniert hat — und
--            ausgerechnet die Uebernahme, der einzige Teil der Migration, der ueberhaupt
--            etwas TUT, bliebe ungeprueft.
select count(*) as ausgangszahl_project_tokens
from public.project_tokens;

-- PROBE 1 — RLS aktiv auf project_secrets
-- ERWARTUNG: GENAU EINE Zeile, rls_aktiv = true.
--            KEINE Zeile = die Tabelle existiert nicht -> 0021 ist nicht gelaufen.
--            rls_aktiv = false = die Tabelle ist ueber die Rollen-Grants fuer anon offen,
--            und der anon-Schluessel steckt im Client-Bundle jeder ausgelieferten Seite.
--            Sofort-Stopp, kein Code-Deploy.
select
  c.relname            as tabelle,
  c.relrowsecurity     as rls_aktiv
from pg_class c
join pg_namespace n on n.oid = c.relnamespace
where n.nspname = 'public'
  and c.relname = 'project_secrets';

-- PROBE 2 — Policy-Liste leer
-- ERWARTUNG: NULL Zeilen. Geprueft wird NICHT "keine SELECT-Policy", sondern die LEERE
--            Liste: unter aktiver RLS ohne JEDE Policy ist die Tabelle fuer anon und
--            authenticated vollstaendig verschlossen, nur service_role kommt durch.
--            Erscheint eine Zeile, existiert eine Policy, die niemand geplant hat —
--            Herkunft klaeren, bevor irgendetwas darauf zugreift.
select policyname, cmd, roles, qual, with_check
from pg_policies
where schemaname = 'public'
  and tablename = 'project_secrets';

-- PROBE 3a — UEBERNAHME, ZAHL
-- ERWARTUNG: quelle = ziel_meta = gleich, und BEIDE gleich der in Probe 0 notierten
--            Ausgangszahl. Die dritte Bedingung ist nicht redundant: quelle wird HIER
--            frisch gelesen — griffe der Lesezugriff auf project_tokens nicht, stuende
--            hier 0 = 0 und die Probe ginge faelschlich auf.
--            ziel_meta KLEINER = die Uebernahme hat nicht alles erfasst; fuer die
--            fehlenden Projekte findet der neue Lesepfad spaeter nichts und der Forward
--            stirbt lautlos. ziel_meta GROESSER = etwas anderes schreibt in die Tabelle.
--            Beides: Stopp, kein Code-Deploy.
select
  (select count(*) from public.project_tokens)                              as quelle,
  (select count(*) from public.project_secrets where target = 'meta')       as ziel_meta,
  (select count(*) from public.project_tokens)
    = (select count(*) from public.project_secrets where target = 'meta')   as gleich;

-- PROBE 3b — UEBERNAHME, WERTGLEICHHEIT (strukturell anderer Weg als 3a)
-- ERWARTUNG: abweichungen = 0.
--            WARUM ZUSAETZLICH ZU 3a: Eine reine Zaehlung ginge auch dann auf, wenn die
--            Uebernahme die RICHTIGE ANZAHL Zeilen mit FALSCHER ZUORDNUNG erzeugt haette
--            — etwa Geheimnis A unter Projekt B. 3a zaehlt, 3b vergleicht paarweise;
--            derselbe Fehler kann nicht beide passieren lassen.
--            Der LEFT JOIN faengt beide Schadensbilder in einer Zahl: fehlende Zeile
--            (s.project_id is null) UND abweichender Wert. "is distinct from" statt "<>",
--            damit ein NULL auf einer Seite nicht still als "kein Unterschied" durchgeht.
--            AUSGABE IST EINE ZAHL, NIE EIN GEHEIMNISWERT.
select count(*) as abweichungen
from public.project_tokens t
left join public.project_secrets s
  on s.project_id = t.project_id
 and s.target = 'meta'
where s.project_id is null
   or s.secret is distinct from t.meta_capi_token;

-- PROBE 4 — Protokoll-Eintrag 0021 (VORBEDINGUNG der Proben 1-3, s. FALLE)
-- ERWARTUNG: GENAU EINE Zeile, filename = '0021_project_secrets.sql', applied_at
--            gefuellt. Keine Zeile = die Migration ist vor ihrer letzten Anweisung
--            abgebrochen; dann beweisen 1-3 nichts ueber einen vollzogenen Lauf.
select version, filename, applied_at
from public.schema_migrations
where version = '0021';
