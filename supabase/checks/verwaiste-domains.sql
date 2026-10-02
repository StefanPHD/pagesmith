-- ZWECK:       Findet verwaiste Custom-Domains: Domains, die am Vercel-Projekt haengen, ohne
--              dass eine domains-Zeile sie deckt. Seit der Scheibe K2b (Phase 13.7, Zuschnitt
--              P13.7-36, (2)) legt registerCustomDomain bei einem 409 mit eigener projectId
--              KEINE Zeile mehr an; eine verwaiste Domain raeumt der Owner von Hand auf. Diese
--              Probe sagt ihm, wo.
--              (a) V1: die abgelehnten Versuche der letzten 30 Tage (Audit-Ausgang
--                  rejected_already_on_project) — wer ist auf eine verwaiste Domain gestossen?
--              (b) V2: Deckung je Domain der Vercel-Domainliste, wie sie am 2026-10-02
--                  abgelesen ist — ein FESTER Block ohne Einsetzstelle: erfasst durch das
--                  Praedikat isReservedHost (src/lib/hosting/host.ts) ODER genau eine
--                  domains-Zeile.
--              (c) V3: dieselbe Pruefung fuer EINEN Namen, der bei Vercel steht und in V2
--                  fehlt — die einzige Einsetzstelle der Datei.
-- SPERRE:      publayer.net, *.publayer.net und pagesmith-delta.vercel.app werden NIE bei
--              Vercel entfernt. Zeigt eine Probe einen dieser Namen als VERWAIST, ist die PROBE
--              defekt, nicht die Domain.
-- ERWARTUNG:   V0 >= 0 (Positivkontrolle: die Abfrage auf audit_logs laeuft und zaehlt).
--              V1: 0 Zeilen. Jede Zeile ist ein Fund — target ist die Domain, die bei Vercel
--              haengt, ohne dass eine Zeile sie deckt (oder deckte, als der Versuch lief).
--              V2: genau vier Zeilen, befund 'erfasst' oder 'gedeckt' in JEDER Zeile (Stand
--              2026-10-02: drei 'erfasst', thr-ty.com 'gedeckt'). 'VERWAIST' ist ein Fund zum
--              Aufraeumen; 'MEHRFACH' kann es wegen domains_custom_host_key nicht geben und
--              waere ein Befund ueber die Probe.
--              V3: genau eine Zeile, befund wie in V2. 'PLATZHALTER NICHT ERSETZT': der Name
--              ist nicht eingesetzt, die Zeile sagt nichts.
--              SELBSTTEST in V2 und V3: Erfasst die Liste r(s) einen der drei gesperrten Namen
--              nicht, liefert der Block GENAU EINE Zeile mit befund 'PROBE DEFEKT …' und KEINE
--              Domain-Zeile — nie ein VERWAIST aus einer kaputten Liste.
-- WANN:        Nach jedem abgelehnten Hinzufuegen, das ein Betreiber meldet; vor jedem Deploy,
--              der das Praedikat oder die Domainliste beruehrt (Bedingung E3 des Zuschnitts
--              P13.7-31); nach jedem manuellen Eingriff an domains.custom_host oder an der
--              Domainliste des Vercel-Projekts. Jeden Block EINZELN markieren und ausfuehren.
-- PLATZHALTER: genau einer, nur in V3: <NEUER_VERCEL_NAME> = ein Name aus der Domainliste
--              des Vercel-Projekts, der in V2 nicht steht. Ein Name je Lauf. Sonst wird an
--              dieser Datei NICHTS geaendert.
-- SERVING-DOMAIN: 'publayer.net' steht FEST in jeder Liste r(s), ohne Platzhalter. Anlass
--              (2026-10-02): Ein Lauf mit dem unersetzten Platzhalter fuer die Serving-Domain
--              meldete publayer.net und *.publayer.net als VERWAIST. Der Wert MUSS mit
--              NEXT_PUBLIC_HOSTING_DOMAIN in Production uebereinstimmen; dort ist er als
--              "Sensitive" nicht ablesbar. Eingegrenzt ist er ueber die Live-Beobachtungen N1,
--              N2 und N4 der Scheibe K2a (Vermerk P13.7-33, Punkt (4), der Phase 13.7) —
--              ABGELEITET, nicht abgelesen. Aendert sich die Variable, wird JEDE Liste r(s) und
--              JEDE Liste p(name) dieser Datei und von reservierte-hosts.sql nachgezogen.
-- FALLE:       (1) V2 ist nur so vollstaendig wie ihr fester Block. Steht bei Vercel ein Name,
--              der dort fehlt, erscheint er nicht, und das sieht aus wie "alles gedeckt". Vor
--              dem Fahren die ANZAHL bei Vercel gegen die vier Zeilen von V2 halten; jeder
--              weitere Name geht einzeln durch V3 und danach per Commit in den Block von V2.
--              (2) Die Liste r(s) ist die Menge des Praedikats von HEUTE (dieselbe wie in
--              reservierte-hosts.sql). Aendert sich APP_HOSTS oder PLATFORM_SUFFIXES, ist sie
--              hier nachzuziehen; kein Test wird davon rot. Der Selbsttest faengt nur das
--              Fehlen der drei gesperrten Namen, nicht jede Abweichung.
--              (3) Bewusst KEIN LIKE ('_' ist dort ein Platzhalter). Abgleich an der
--              LABEL-GRENZE; Grossschreibung und Punkte am Ende wie im Praedikat entfernt.
--              (4) EINE KONTO-LOESCHUNG IM SUPABASE-DASHBOARD UMGEHT DEN RIEGEL: auth.users ->
--              projects (0001) -> domains (0006) kaskadieren in der Datenbank, deleteProject
--              wird dabei nicht gerufen, und die Domain bleibt bei Vercel. VOR dem Loeschen
--              eines Kontos dessen Custom-Domains in der App ENTFERNEN; danach V2 fahren.
--              Dasselbe gilt fuer Hand-SQL auf projects oder domains.
--              (5) V1 zeigt nur Versuche seit K2b; aeltere 409-Faelle stehen als 'healed' im
--              Log und sind hier nicht erfasst.
-- VERIFIZIERT: Die Fassung MIT Platzhaltern lief am 2026-10-02 gegen echte Daten (Owner,
--              Scheibe K2b: V0, V1, V2 mit fuenf Namen). DIESE Fassung noch nie gegen echte
--              Daten; Selbsttest und Mutation nur in PGlite (Postgres 18.3) gegen
--              Attrappen-Tabellen (CC, 2026-10-02).

-- V0 POSITIVKONTROLLE: Add-Versuche der letzten 30 Tage, gleich welcher Ausgang.
select count(*) as add_versuche_30_tage
from public.audit_logs
where action = 'domain_add_attempt'
  and created_at >= now() - interval '30 days';

-- V1 (a) ABGELEHNTE VERSUCHE AUF EINE DOMAIN AM EIGENEN VERCEL-PROJEKT, letzte 30 Tage.
select created_at, user_id, target
from public.audit_logs
where action = 'domain_add_attempt'
  and outcome = 'rejected_already_on_project'
  and created_at >= now() - interval '30 days'
order by created_at desc;

-- V2 (b) DECKUNG JE DOMAIN DER VERCEL-DOMAINLISTE — fester Block, Ablesung 2026-10-02.
with r(s) as (
  values ('publayer.net'), ('lvh.me'), ('pagesmith.app'), ('localhost'), ('127.0.0.1'),
         ('vercel.app')
),
p(name) as (
  values ('publayer.net'), ('*.publayer.net'), ('pagesmith-delta.vercel.app')
),
st as (
  select coalesce(bool_and(exists (
           select 1 from r
           where rtrim(lower(p.name), '.') = r.s
              or right(rtrim(lower(p.name), '.'), length(r.s) + 1) = '.' || r.s
         )), false) as ok
  from p
),
v(name) as (
  values ('publayer.net'), ('*.publayer.net'), ('pagesmith-delta.vercel.app'), ('thr-ty.com')
),
n as (
  select v.name, rtrim(lower(v.name), '.') as h from v
),
b as (
  select n.name,
         exists (
           select 1 from r where n.h = r.s or right(n.h, length(r.s) + 1) = '.' || r.s
         ) as erfasst_durch_praedikat,
         (select count(*) from public.domains d
           where rtrim(lower(d.custom_host), '.') = n.h) as zeilen
  from n
)
select b.name, b.erfasst_durch_praedikat, b.zeilen,
       case
         when b.erfasst_durch_praedikat then 'erfasst'
         when b.zeilen = 1 then 'gedeckt'
         when b.zeilen = 0 then 'VERWAIST'
         else 'MEHRFACH'
       end as befund
from b cross join st
where st.ok
union all
select null, null, null,
       'PROBE DEFEKT: die Liste r(s) erfasst einen gesperrten Namen nicht - nichts entfernen'
from st
where not st.ok
order by befund, name;

-- V3 (c) EIN WEITERER NAME. Einzige Einsetzstelle der Datei: die Zeile v(name) unten.
with r(s) as (
  values ('publayer.net'), ('lvh.me'), ('pagesmith.app'), ('localhost'), ('127.0.0.1'),
         ('vercel.app')
),
p(name) as (
  values ('publayer.net'), ('*.publayer.net'), ('pagesmith-delta.vercel.app')
),
st as (
  select coalesce(bool_and(exists (
           select 1 from r
           where rtrim(lower(p.name), '.') = r.s
              or right(rtrim(lower(p.name), '.'), length(r.s) + 1) = '.' || r.s
         )), false) as ok
  from p
),
v(name) as (
  values ('<NEUER_VERCEL_NAME>')  -- EINSETZEN: genau ein Name, sonst nichts aendern
),
n as (
  select v.name, rtrim(lower(v.name), '.') as h from v
),
b as (
  select n.name,
         exists (
           select 1 from r where n.h = r.s or right(n.h, length(r.s) + 1) = '.' || r.s
         ) as erfasst_durch_praedikat,
         (select count(*) from public.domains d
           where rtrim(lower(d.custom_host), '.') = n.h) as zeilen
  from n
)
select b.name, b.erfasst_durch_praedikat, b.zeilen,
       case
         when strpos(b.name, '<') > 0 or strpos(b.name, '>') > 0
           then 'PLATZHALTER NICHT ERSETZT'
         when b.erfasst_durch_praedikat then 'erfasst'
         when b.zeilen = 1 then 'gedeckt'
         when b.zeilen = 0 then 'VERWAIST'
         else 'MEHRFACH'
       end as befund
from b cross join st
where st.ok
union all
select null, null, null,
       'PROBE DEFEKT: die Liste r(s) erfasst einen gesperrten Namen nicht - nichts entfernen'
from st
where not st.ok
order by befund, name;
