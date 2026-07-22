-- Phase 8 Scheibe 2b-0 — server-autoritative Tracking-Identitaet pro Projekt.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed:
-- erst die Spalte + Backfill, dann der neue Resolver, der sie liest — sonst laese der
-- deployte Resolver eine leere Spalte und die CAPI-Aufloesung braeche still).
--
-- WARUM SPALTE STATT settings.capi.trackingKey (Live-Lektion): projects.settings ist
-- CLIENT-autoritativ — saveProject ersetzt es GANZHEITLICH mit dem Client-settings
-- (kein Read-Merge), sodass ein server-eigenes Feld darin beim naechsten Save still
-- verschwindet. Eine eigene Top-Level-Spalte liegt AUSSERHALB dieses client-besessenen
-- Blobs: saveProject listet sie nicht im Update-Payload -> sie ueberlebt.
--
-- Additiv, nicht-destruktiv: neue Spalte, Backfill nur wo leer, settings UNBERUEHRT.

-- 1) Additive nullable Spalte. Unveroeffentlichte / Meta-lose Projekte ohne Key
--    bleiben NULL (die Identitaet entsteht lazy bei Publish/setCapiToken).
alter table public.projects
  add column if not exists tracking_key text;

-- 2) EINMALIGER Backfill: bestehende trackingKeys 1:1 in die neue Spalte kopieren.
--    settings BLEIBT unberuehrt (nicht transformiert) -> die heutige Client-Einbettung
--    ueber settings.capi.trackingKey laeuft byte-gleich weiter. Nur wo die Spalte noch
--    leer ist und ein settings-Key existiert.
update public.projects
set tracking_key = settings->'capi'->>'trackingKey'
where tracking_key is null
  and settings->'capi'->>'trackingKey' is not null;

-- 3) Partial-unique (Dupe-Check ergab 0): "loest zu genau EINEM Projekt auf" — die
--    App-Erwartung (Resolver .maybeSingle) wird zur DB-Garantie. Partial (NUR wo nicht
--    NULL), damit mehrere key-lose Projekte (mehrfach NULL) nicht kollidieren.
create unique index if not exists projects_tracking_key_key
  on public.projects (tracking_key)
  where tracking_key is not null;
