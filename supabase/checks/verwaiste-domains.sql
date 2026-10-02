-- ZWECK:       Findet verwaiste Custom-Domains: Domains, die am Vercel-Projekt haengen, ohne
--              dass eine domains-Zeile sie deckt. Seit der Scheibe K2b (Phase 13.7, Zuschnitt
--              P13.7-36, (2)) legt registerCustomDomain bei einem 409 mit eigener projectId
--              KEINE Zeile mehr an; eine verwaiste Domain raeumt der Owner von Hand auf. Diese
--              Probe sagt ihm, wo.
--              (a) V1: die abgelehnten Versuche der letzten 30 Tage (Audit-Ausgang
--                  rejected_already_on_project) — wer ist auf eine verwaiste Domain gestossen?
--              (b) V2: Deckung je Domain der VOLLSTAENDIGEN, abgelesenen Vercel-Domainliste:
--                  erfasst durch das Praedikat isReservedHost (src/lib/hosting/host.ts) ODER
--                  genau eine domains-Zeile.
-- ERWARTUNG:   V0 >= 0 (Positivkontrolle: die Abfrage auf audit_logs laeuft und zaehlt).
--              V1: 0 Zeilen. Jede Zeile ist ein Fund — target ist die Domain, die bei Vercel
--              haengt, ohne dass eine Zeile sie deckt (oder deckte, als der Versuch lief).
--              V2: befund = 'erfasst' oder 'gedeckt' in JEDER Zeile. 'VERWAIST' (0 Zeilen,
--              nicht erfasst) ist ein Fund zum Aufraeumen; 'MEHRFACH' kann es wegen
--              domains_custom_host_key nicht geben und waere ein Befund ueber die Probe.
-- WANN:        Nach jedem abgelehnten Hinzufuegen, das ein Betreiber meldet; vor jedem Deploy,
--              der das Praedikat oder die Domainliste beruehrt (Bedingung E3 des Zuschnitts
--              P13.7-31); nach jedem manuellen Eingriff an domains.custom_host oder an der
--              Domainliste des Vercel-Projekts.
-- PLATZHALTER: <SERVING_DOMAIN> = der in Vercel ABGELESENE Wert von NEXT_PUBLIC_HOSTING_DOMAIN
--              (ohne Punkt vorn, ohne Port). Liegt der Host von NEXT_PUBLIC_APP_URL weder unter
--              vercel.app noch in der Liste r(s), kommt er als weitere Zeile dazu.
--              <VERCEL_DOMAIN_1>, <VERCEL_DOMAIN_2>, … (V2) = JEDE Domain der Domainliste des
--              Vercel-Projekts, eine Zeile je Domain — auch die, die das Praedikat erfasst.
-- FALLE:       (1) V2 ist nur so vollstaendig wie die eingesetzte Liste. Eine vergessene Domain
--              erscheint nicht, und das sieht aus wie "alles gedeckt". Vor dem Fahren die
--              ANZAHL der eingesetzten Zeilen gegen die Anzahl in Vercel halten.
--              (2) Die Liste r(s) ist die Menge des Praedikats von HEUTE (dieselbe wie in
--              reservierte-hosts.sql). Aendert sich APP_HOSTS oder PLATFORM_SUFFIXES, ist sie
--              hier nachzuziehen; kein Test wird davon rot.
--              (3) Bewusst KEIN LIKE ('_' ist dort ein Platzhalter). Abgleich an der
--              LABEL-GRENZE; Grossschreibung und Punkte am Ende wie im Praedikat entfernt.
--              (4) EINE KONTO-LOESCHUNG IM SUPABASE-DASHBOARD UMGEHT DEN RIEGEL: auth.users ->
--              projects (0001) -> domains (0006) kaskadieren in der Datenbank, deleteProject
--              wird dabei nicht gerufen, und die Domain bleibt bei Vercel. VOR dem Loeschen
--              eines Kontos dessen Custom-Domains in der App ENTFERNEN; danach V2 fahren.
--              Dasselbe gilt fuer Hand-SQL auf projects oder domains.
--              (5) V1 zeigt nur Versuche seit K2b; aeltere 409-Faelle stehen als 'healed' im
--              Log und sind hier nicht erfasst.
-- VERIFIZIERT: noch nie gegen echte Daten gefahren (angelegt 2026-10-02).

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

-- V2 (b) DECKUNG JE DOMAIN DER VOLLSTAENDIGEN VERCEL-DOMAINLISTE.
with r(s) as (
  values ('<SERVING_DOMAIN>'), ('lvh.me'), ('pagesmith.app'), ('localhost'), ('127.0.0.1'),
         ('vercel.app')
),
v(name) as (
  values ('<VERCEL_DOMAIN_1>'), ('<VERCEL_DOMAIN_2>')
),
n as (
  select v.name, rtrim(lower(v.name), '.') as h from v
)
select n.name,
       exists (
         select 1 from r where n.h = r.s or right(n.h, length(r.s) + 1) = '.' || r.s
       ) as erfasst_durch_praedikat,
       (select count(*) from public.domains d
         where rtrim(lower(d.custom_host), '.') = n.h) as zeilen,
       case
         when exists (
           select 1 from r where n.h = r.s or right(n.h, length(r.s) + 1) = '.' || r.s
         ) then 'erfasst'
         when (select count(*) from public.domains d
                where rtrim(lower(d.custom_host), '.') = n.h) = 1 then 'gedeckt'
         when (select count(*) from public.domains d
                where rtrim(lower(d.custom_host), '.') = n.h) = 0 then 'VERWAIST'
         else 'MEHRFACH'
       end as befund
from n
order by befund, n.name;
