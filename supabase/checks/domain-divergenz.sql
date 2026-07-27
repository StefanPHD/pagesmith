-- ZWECK:       Zeigt je Projekt, ob settings.hosting.label (client-besessener Spiegel)
--              und die domains-Label-Zeile (server-autoritative Wahrheit, steuert die
--              Auslieferung) uebereinstimmen. Deckt beide Divergenzrichtungen ab:
--              settings ohne Zeile (Live-URL 404t, UI sagt "veroeffentlicht") und
--              Zeile ohne settings (Waise, servt weiter alten Inhalt).
-- ERWARTUNG:   Jede Zeile traegt befund = 'ok'. Jeder andere Wert ist ein echter Fund.
-- WANN:        Nach jedem Publish-nahen Bau, nach jedem manuellen Eingriff an domains
--              oder projects.settings, und im Live-Test jeder Hosting-Scheibe.
-- PLATZHALTER: keine — laeuft ueber alle Projekte.
-- FALLE:       Das "and d.custom_host is null" im JOIN ist NICHT optional. Ohne den
--              Filter zieht der JOIN auch die CUSTOM-HOST-Zeilen mit; ein Projekt mit
--              Custom-Domain erscheint dann faelschlich als DIVERGENZ_C, obwohl seine
--              Subdomain einwandfrei liefert. Genau dieser Fehlalarm ist am 2026-07-27
--              real passiert und hat eine Fehlersuche ausgeloest, die keine war.
--              Die LABEL-Zeile ist die mit custom_host IS NULL.
-- VERIFIZIERT: 2026-07-27 (gegen Produktivdaten; fand den realen Divergenzfall)

select
  p.id,
  p.name,
  p.settings->'hosting'->>'label'   as settings_label,
  d.label                           as domains_label,
  (p.published_content is not null) as hat_content,
  case
    when p.settings->'hosting'->>'label' is not null and d.label is null
      then 'DIVERGENZ_A: settings ohne domains-Zeile (Live-URL 404t)'
    when d.label is not null and p.settings->'hosting'->>'label' is null
      then 'DIVERGENZ_B: domains-Waise ohne settings'
    when d.label is not null
         and d.label <> (p.settings->'hosting'->>'label')
      then 'DIVERGENZ_C: Labels weichen ab'
    else 'ok'
  end as befund
from public.projects p
left join public.domains d
       on d.project_id = p.id
      and d.custom_host is null          -- <== DIE FALLE, siehe Kopf
where p.settings->'hosting'->>'label' is not null
   or d.label is not null
order by befund, p.name;
