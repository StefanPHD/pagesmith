-- ZWECK:       Zeigt je veroeffentlichtem Projekt das KEY-SET von published_content.
--              Der Blob ist server-geschrieben und wird bei jedem Publish GANZHEITLICH
--              ersetzt — ein zusaetzlicher oder fehlender Key faellt sonst nirgends auf.
-- ERWARTUNG:   Projekte OHNE Variante B: exakt {html, mappings, publishedAt, settings}.
--              Projekte MIT veroeffentlichter Variante B: zusaetzlich variantB.
--              Jedes andere Key-Set ist Schema-Drift und ein echter Fund.
-- WANN:        Nach jeder Aenderung an publishProject, nach jeder Varianten-Scheibe,
--              und als Regressionsprobe fuer Bestandsprojekte ("aendert sich fuer
--              Projekte ohne B wirklich nichts?").
-- PLATZHALTER: keine — laeuft ueber alle veroeffentlichten Projekte.
-- FALLE:       keine bekannte. Hinweis: die Sortierung der Keys ist nicht garantiert,
--              deshalb array_agg(... order by k) — sonst sehen gleiche Key-Sets
--              unterschiedlich aus.
-- VERIFIZIERT: 2026-07-27

select
  p.id,
  p.name,
  (p.html_b is not null)                          as hat_variante_b_entwurf,
  array_agg(k order by k)                         as published_content_keys
from public.projects p,
     lateral jsonb_object_keys(p.published_content) k
where p.published_content is not null
group by p.id, p.name, p.html_b
order by p.name;
