-- ZWECK:       Traegt public.domains heute schon einen custom_host, der nach isReservedHost
--              (src/lib/hosting/host.ts; Phase 13.7, Scheibe K2a, Zuschnitt P13.7-31) reserviert
--              ist? Eine solche Zeile wuerde weiter ausgeliefert (Vorrat P13.7-32), ist in der
--              App aber weder entfernbar noch pruefbar. Dazu (Q4) die zweite Haelfte der
--              Bedingung E3: eine Domain am Vercel-Projekt, die das Praedikat NICHT erfasst, ist
--              durch genau eine domains-Zeile gedeckt.
-- SPERRE:      publayer.net, *.publayer.net und pagesmith-delta.vercel.app werden NIE bei
--              Vercel entfernt. Zeigt eine Probe einen dieser Namen als ungedeckt oder
--              verwaist, ist die PROBE defekt, nicht die Domain.
-- ERWARTUNG:   Q0 >= 1, wenn heute eine Custom-Domain besteht (sonst sagen Q1/Q2 nichts).
--              Q1 = 0 Zeilen, Q2 = 0 Zeilen, und Q1 und Q2 liefern DIESELBEN Zeilen.
--              Q3a und Q3b: genau 'meinpublayer.net' und 'kunde.de' tragen false, alle
--              uebrigen true, in BEIDEN Wegen gleich.
--              Q4: je Domain des festen Blocks, die das Praedikat nicht erfasst, treffer = 1
--              (Stand 2026-10-02: genau eine Zeile, thr-ty.com).
--              SELBSTTEST in Q1, Q2 und Q4: Erfasst die Liste r(s) einen der drei gesperrten
--              Namen nicht, liefert der Block GENAU EINE Zeile 'PROBE DEFEKT …' und keine
--              Datenzeile — weder ein falsches "keine reservierte Zeile" noch ein falsches
--              "ungedeckt".
-- WANN:        Vor dem Deploy der Scheibe K2a (Bedingung E3), und nach jedem manuellen Eingriff
--              an domains.custom_host. Jeden Block EINZELN markieren und ausfuehren.
-- PLATZHALTER: keine. Ein Name, der bei Vercel steht und im festen Block von Q4 fehlt, geht
--              durch verwaiste-domains.sql, V3.
-- SERVING-DOMAIN: 'publayer.net' steht FEST in jeder Liste, ohne Platzhalter. Anlass
--              (2026-10-02): Ein Lauf mit dem unersetzten Platzhalter fuer die Serving-Domain
--              meldete Plattform-Domains als VERWAIST. Der Wert MUSS mit
--              NEXT_PUBLIC_HOSTING_DOMAIN in Production uebereinstimmen; dort ist er als
--              "Sensitive" nicht ablesbar. Eingegrenzt ist er ueber die Live-Beobachtungen N1,
--              N2 und N4 der Scheibe K2a (Vermerk P13.7-33, Punkt (4), der Phase 13.7) —
--              ABGELEITET, nicht abgelesen. Aendert sich die Variable, wird JEDE Liste dieser
--              Datei und von verwaiste-domains.sql nachgezogen.
-- FALLE:       (1) Die Liste r(s) ist die Menge des Praedikats von HEUTE: Serving-Domain,
--              lvh.me (Fallback in servingSuffixes), die APP_HOSTS (pagesmith.app,
--              www.pagesmith.app, localhost, 127.0.0.1) und vercel.app. www.pagesmith.app liegt
--              im Teilbaum von pagesmith.app und steht deshalb nicht eigens da. Aendert sich
--              APP_HOSTS oder PLATFORM_SUFFIXES, ist die Liste hier nachzuziehen; kein Test
--              wird davon rot. Der Selbsttest faengt nur das Fehlen der drei gesperrten Namen.
--              (2) Bewusst KEIN LIKE: '_' ist dort ein Platzhalter (CLAUDE.md, "LIKE-
--              WILDCARD-FALLE"). Abgleich an der LABEL-GRENZE: Gleichheit oder Endung auf
--              '.' || Eintrag: 'meinpublayer.net' ist KEIN Treffer.
--              (3) Grossschreibung und Punkte am Ende werden wie im Praedikat entfernt (lower,
--              rtrim). Eine Zeile aus Hand-SQL ist sonst unsichtbar.
--              (4) Q1 und Q2 sind zwei strukturell verschiedene Wege (Zeichenfolge gegen
--              Label-Array). Weichen sie voneinander ab, ist das ein Befund ueber die Probe,
--              nicht ueber die Daten.
-- VERIFIZIERT: Die Fassung MIT Platzhaltern: am 2026-10-02 eine Bestandsprobe Q0 bis Q4
--              (Owner, Scheibe K2a, N6) — ob die Datei selbst oder eine Zusammenfassung lief,
--              ist nicht angegeben (Vermerk P13.7-33, Punkt (4)). DIESE Fassung noch nie gegen
--              echte Daten; Selbsttest und Mutation nur in PGlite (Postgres 18.3) gegen
--              Attrappen-Tabellen (CC, 2026-10-02).

-- Q0 POSITIVKONTROLLE: Gesamtzahl der custom_host-Zeilen.
select count(*) as custom_host_gesamt
from public.domains
where custom_host is not null;

-- Q1 WEG A: Zeichenfolge an der Label-Grenze.
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
d as (
  select label, project_id, rtrim(lower(custom_host), '.') as h
  from public.domains
  where custom_host is not null
)
select d.label, d.project_id, d.h, r.s as reserviert_durch
from d
join r on d.h = r.s or right(d.h, length(r.s) + 1) = '.' || r.s
cross join st
where st.ok
union all
select null, null,
       'PROBE DEFEKT: die Liste r(s) erfasst einen gesperrten Namen nicht', null
from st
where not st.ok
order by h;

-- Q2 WEG B: die letzten k Labels als Array, gegen die k Labels des Eintrags.
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
           where cardinality(string_to_array(rtrim(lower(p.name), '.'), '.'))
                   >= cardinality(string_to_array(r.s, '.'))
             and (string_to_array(rtrim(lower(p.name), '.'), '.'))[
                   cardinality(string_to_array(rtrim(lower(p.name), '.'), '.'))
                     - cardinality(string_to_array(r.s, '.')) + 1
                   : cardinality(string_to_array(rtrim(lower(p.name), '.'), '.'))]
                 = string_to_array(r.s, '.')
         )), false) as ok
  from p
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
cross join st
where st.ok
union all
select null, null,
       'PROBE DEFEKT: die Liste r(s) erfasst einen gesperrten Namen nicht', null
from st
where not st.ok
order by h;

-- Q3a SELBSTTEST WEG A (nur Literale, fasst keine Daten an).
with r(s) as (values ('publayer.net'), ('vercel.app')),
d(h) as (
  values ('publayer.net'), ('x.publayer.net'), ('a.b.publayer.net'),
         ('meinpublayer.net'), ('kunde.de'), ('preview.vercel.app')
)
select d.h,
       bool_or(d.h = r.s or right(d.h, length(r.s) + 1) = '.' || r.s) as reserviert
from d cross join r
group by d.h
order by d.h;

-- Q3b SELBSTTEST WEG B (nur Literale, fasst keine Daten an).
with r(s) as (values ('publayer.net'), ('vercel.app')),
d(h) as (
  values ('publayer.net'), ('x.publayer.net'), ('a.b.publayer.net'),
         ('meinpublayer.net'), ('kunde.de'), ('preview.vercel.app')
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

-- Q4 DECKUNG (Bedingung E3): je Domain der Vercel-Domainliste (fester Block, Ablesung
-- 2026-10-02), die das Praedikat NICHT erfasst, die Zahl der domains-Zeilen mit genau diesem
-- custom_host. Soll: 1.
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
  select v.name, rtrim(lower(v.name), '.') as h
  from v
  where not exists (
    select 1 from r
    where rtrim(lower(v.name), '.') = r.s
       or right(rtrim(lower(v.name), '.'), length(r.s) + 1) = '.' || r.s
  )
)
select n.name, count(d.label) as treffer
from n
cross join st
left join public.domains d on rtrim(lower(d.custom_host), '.') = n.h
where st.ok
group by n.name
union all
select 'PROBE DEFEKT: die Liste r(s) erfasst einen gesperrten Namen nicht', null
from st
where not st.ok
order by name;
