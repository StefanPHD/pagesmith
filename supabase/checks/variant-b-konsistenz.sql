-- ZWECK:       Stellt die TEXT-Overrides von Variante A und B je Element-Anker
--              nebeneinander. Beantwortet die Frage, die nach jedem Varianten-Bau
--              zaehlt: liegt der Inhalt im RICHTIGEN Slot? Ein Save auf B, der in die
--              A-Spalten schreibt, ist der stille Totalverlust — er meldet keinen
--              Fehler und ist im UI nicht zu sehen.
-- ERWARTUNG:   Fuer jeden Anker stehen A- und B-Text so da, wie sie im Editor
--              eingegeben wurden. Identische Texte in beiden Spalten sind KEIN Fehler
--              (B startet als Kopie von A) — verdaechtig ist der umgekehrte Fall:
--              der Text, den man fuer B eingegeben hat, steht in der A-Spalte.
-- WANN:        Nach jedem Bau an saveProject/saveVariantB/createVariantB und im
--              Live-Test jeder Varianten-Scheibe.
-- PLATZHALTER: <PROJEKT_UUID> — die id des zu pruefenden Projekts.
-- FALLE:       keine bekannte. Hinweis: mappings_b ist NULLABLE (kein B) ->
--              coalesce auf '[]', sonst liefert die Query fuer Projekte ohne B nichts
--              statt der A-Seite.
-- VERIFIZIERT: 2026-07-27

with a as (
  select
    m->>'elementId'          as element_id,
    m->'config'->>'content'  as text_a
  from public.projects p,
       lateral jsonb_array_elements(p.mappings) m
  where p.id = '<PROJEKT_UUID>'
    and m->>'type' = 'text'
),
b as (
  select
    m->>'elementId'          as element_id,
    m->'config'->>'content'  as text_b
  from public.projects p,
       lateral jsonb_array_elements(coalesce(p.mappings_b, '[]'::jsonb)) m
  where p.id = '<PROJEKT_UUID>'
    and m->>'type' = 'text'
)
select
  coalesce(a.element_id, b.element_id) as element_anker,
  a.text_a,
  b.text_b,
  case
    when a.text_a is not null and b.text_b is null then 'nur A'
    when a.text_a is null and b.text_b is not null then 'nur B'
    when a.text_a = b.text_b                       then 'identisch (B war Kopie)'
    else 'unterschiedlich'
  end as befund
from a
full outer join b on b.element_id = a.element_id
order by element_anker;
