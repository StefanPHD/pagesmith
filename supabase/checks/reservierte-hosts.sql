-- ZWECK:       Traegt public.domains heute schon einen custom_host, der nach isReservedHost
--              (src/lib/hosting/host.ts; Phase 13.7, Scheibe K2a, Zuschnitt P13.7-31) reserviert
--              ist? Eine solche Zeile wuerde weiter ausgeliefert (Vorrat P13.7-32), ist in der
--              App aber weder entfernbar noch pruefbar. Dazu (Q4) die zweite Haelfte der
--              Bedingung E3: eine Domain am Vercel-Projekt, die das Praedikat NICHT erfasst, ist
--              durch genau eine domains-Zeile gedeckt.
-- ERWARTUNG:   Q0 >= 1, wenn heute eine Custom-Domain besteht (sonst sagen Q1/Q2 nichts).
--              Q1 = 0 Zeilen, Q2 = 0 Zeilen, und Q1 und Q2 liefern DIESELBEN Zeilen.
--              Q3a und Q3b: genau 'mein<SERVING_DOMAIN>' und 'kunde.de' tragen false, alle
--              uebrigen true, in BEIDEN Wegen gleich.
--              Q4: je eingesetzter Domain treffer = 1.
-- WANN:        Vor dem Deploy der Scheibe K2a (Bedingung E3), und nach jedem manuellen Eingriff
--              an domains.custom_host.
-- PLATZHALTER: <SERVING_DOMAIN> = der in Vercel ABGELESENE Wert von NEXT_PUBLIC_HOSTING_DOMAIN
--              (ohne Punkt vorn, ohne Port), nicht der aus der Doku. Liegt der Host von
--              NEXT_PUBLIC_APP_URL weder unter vercel.app noch in der Liste, kommt er als weitere
--              Zeile in JEDE Liste r(s) dazu.
--              <VERCEL_DOMAIN> (Q4) = jede Domain der Domainliste des Vercel-Projekts, die das
--              Praedikat NICHT erfasst (Ablesung 2026-10-02: thr-ty.com).
-- FALLE:       (1) Die Liste r(s) ist die Menge des Praedikats von HEUTE: Serving-Domain,
--              lvh.me (Fallback in servingSuffixes), die APP_HOSTS (pagesmith.app,
--              www.pagesmith.app, localhost, 127.0.0.1) und vercel.app. www.pagesmith.app liegt
--              im Teilbaum von pagesmith.app und steht deshalb nicht eigens da. Aendert sich
--              APP_HOSTS oder PLATFORM_SUFFIXES, ist die Liste hier nachzuziehen; kein Test
--              wird davon rot.
--              (2) Bewusst KEIN LIKE: '_' ist dort ein Platzhalter (CLAUDE.md, "LIKE-
--              WILDCARD-FALLE"). Abgleich an der LABEL-GRENZE: Gleichheit oder Endung auf
--              '.' || Eintrag: 'mein<SERVING_DOMAIN>' ist KEIN Treffer.
--              (3) Grossschreibung und Punkte am Ende werden wie im Praedikat entfernt (lower,
--              rtrim). Eine Zeile aus Hand-SQL ist sonst unsichtbar.
--              (4) Q1 und Q2 sind zwei strukturell verschiedene Wege (Zeichenfolge gegen
--              Label-Array). Weichen sie voneinander ab, ist das ein Befund ueber die Probe,
--              nicht ueber die Daten.
-- VERIFIZIERT: noch nie gegen echte Daten gefahren (angelegt 2026-10-02).

-- Q0 POSITIVKONTROLLE: Gesamtzahl der custom_host-Zeilen.
select count(*) as custom_host_gesamt
from public.domains
where custom_host is not null;

-- Q1 WEG A: Zeichenfolge an der Label-Grenze.
with r(s) as (
  values ('<SERVING_DOMAIN>'), ('lvh.me'), ('pagesmith.app'), ('localhost'), ('127.0.0.1'),
         ('vercel.app')
),
d as (
  select label, project_id, rtrim(lower(custom_host), '.') as h
  from public.domains
  where custom_host is not null
)
select d.label, d.project_id, d.h, r.s as reserviert_durch
from d
join r on d.h = r.s or right(d.h, length(r.s) + 1) = '.' || r.s
order by d.h;

-- Q2 WEG B: die letzten k Labels als Array, gegen die k Labels des Eintrags.
with r(s) as (
  values ('<SERVING_DOMAIN>'), ('lvh.me'), ('pagesmith.app'), ('localhost'), ('127.0.0.1'),
         ('vercel.app')
),
d as (
  select label, project_id, string_to_array(rtrim(lower(custom_host), '.'), '.') as a
  from public.domains
  where custom_host is not null
)
select d.label, d.project_id, array_to_string(d.a, '.') as h, r.s as reserviert_durch
from d
join r
  on cardinality(d.a) >= cardinality(string_to_array(r.s, '.'))
 and d.a[cardinality(d.a) - cardinality(string_to_array(r.s, '.')) + 1 : cardinality(d.a)]
     = string_to_array(r.s, '.')
order by h;

-- Q3a SELBSTTEST WEG A (nur Literale, fasst keine Daten an).
with r(s) as (values ('<SERVING_DOMAIN>'), ('vercel.app')),
d(h) as (
  values ('<SERVING_DOMAIN>'), ('x.<SERVING_DOMAIN>'), ('a.b.<SERVING_DOMAIN>'),
         ('mein<SERVING_DOMAIN>'), ('kunde.de'), ('preview.vercel.app')
)
select d.h,
       bool_or(d.h = r.s or right(d.h, length(r.s) + 1) = '.' || r.s) as reserviert
from d cross join r
group by d.h
order by d.h;

-- Q3b SELBSTTEST WEG B (nur Literale, fasst keine Daten an).
with r(s) as (values ('<SERVING_DOMAIN>'), ('vercel.app')),
d(h) as (
  values ('<SERVING_DOMAIN>'), ('x.<SERVING_DOMAIN>'), ('a.b.<SERVING_DOMAIN>'),
         ('mein<SERVING_DOMAIN>'), ('kunde.de'), ('preview.vercel.app')
)
select d.h,
       bool_or(
         cardinality(string_to_array(d.h, '.')) >= cardinality(string_to_array(r.s, '.'))
         and (string_to_array(d.h, '.'))[
               cardinality(string_to_array(d.h, '.')) - cardinality(string_to_array(r.s, '.')) + 1
               : cardinality(string_to_array(d.h, '.'))]
             = string_to_array(r.s, '.')
       ) as reserviert
from d cross join r
group by d.h
order by d.h;

-- Q4 DECKUNG (Bedingung E3): je Domain am Vercel-Projekt, die das Praedikat NICHT erfasst,
-- die Zahl der domains-Zeilen mit genau diesem custom_host. Soll: 1.
with v(name) as (values ('<VERCEL_DOMAIN>'))
select v.name,
       count(d.label) as treffer
from v
left join public.domains d on rtrim(lower(d.custom_host), '.') = lower(v.name)
group by v.name
order by v.name;
