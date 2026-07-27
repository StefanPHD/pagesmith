-- ZWECK:       Zeigt je Projekt mit Varianten-Entwurf den Zusammenhang aus
--              ab_test_active, html_b und der VEROEFFENTLICHTEN Variante B. Der
--              gefaehrliche Zustand ist "Test laeuft, aber es gibt nichts
--              Auslieferbares": das UI sagt "Test laeuft", die Live-URL liefert ALLEN
--              Besuchern A, und niemand merkt es ("gruen aber wirkungslos").
-- ERWARTUNG:   Jede Zeile traegt befund = 'ok'. TEST_OHNE_AUSLIEFERBARES_B ist ein
--              echter Fund. FLAG_OHNE_ENTWURF darf gar nicht auftreten — das verbietet
--              der CHECK projects_ab_test_needs_variant_b (Migration 0017); erscheint
--              es doch, ist der Constraint weg.
-- WANN:        Nach jedem Bau an setAbTestActive/removeVariantB/publishProject und im
--              Live-Test jeder A/B-Scheibe.
-- PLATZHALTER: keine.
-- FALLE:       Die Nicht-Leer-Pruefung unten SPIEGELT deliverableVariantB
--              (src/lib/hosting/variant.ts) — sie ist eine DIAGNOSE, KEINE zweite
--              Autoritaet. Ueber die Auslieferung entscheidet allein der Code
--              (resolve.ts) und ueber die Aktivierung allein setAbTestActive; beide
--              nutzen dasselbe geteilte Praedikat. Aendert sich diese Regel je, MUSS
--              diese Datei mitgezogen werden, sonst meldet sie falsch. Das ist der
--              bewusst in Kauf genommene Preis dafuer, den Zustand ueberhaupt von
--              aussen pruefen zu koennen.
-- VERIFIZIERT: 2026-07-27

select
  p.id,
  p.name,
  p.ab_test_active,
  (p.html_b is not null)                                   as hat_b_entwurf,
  (p.published_content ? 'variantB')                       as hat_b_key,
  length(coalesce(trim(p.published_content->'variantB'->>'html'), '')) as b_html_laenge,
  case
    when p.ab_test_active and p.html_b is null
      then 'FLAG_OHNE_ENTWURF: der CHECK aus 0017 fehlt oder wurde umgangen'
    when p.ab_test_active
         and coalesce(trim(p.published_content->'variantB'->>'html'), '') = ''
      then 'TEST_OHNE_AUSLIEFERBARES_B: UI sagt "Test laeuft", alle sehen A'
    else 'ok'
  end as befund
from public.projects p
where p.html_b is not null
   or p.ab_test_active
order by befund, p.name;
