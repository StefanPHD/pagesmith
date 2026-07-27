-- ZWECK:       Findet Projekte mit MEHR ALS EINER Label-Zeile (custom_host IS NULL).
--              Die DB erlaubt das: der partial-unique-Index domains_custom_host_key
--              (Migration 0007) deckt nur custom_host ab, und seine Begruendung dort
--              bezieht sich auf die NULL-Semantik von UNIQUE — sie ist KEINE
--              Entscheidung dafuer, dass ein Projekt mehrere Label-Zeilen haben darf.
-- ERWARTUNG:   0 Zeilen.
-- WANN:        Vor jeder Aenderung an der Label-Vergabe; und zwingend, BEVOR jemals ein
--              partial unique index auf (project_id) WHERE custom_host IS NULL erwogen
--              wird — er wuerde sonst an Bestandsdaten scheitern.
-- PLATZHALTER: keine.
-- FALLE:       keine bekannte.
-- VERIFIZIERT: 2026-07-27 (0 Zeilen — der Zustand ist heute nirgends real)

select
  project_id,
  count(*)                                as label_zeilen,
  array_agg(label order by created_at)    as labels,
  min(created_at)                         as aelteste
from public.domains
where custom_host is null
group by project_id
having count(*) > 1
order by label_zeilen desc, project_id;
