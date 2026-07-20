-- Phase 8 Scheibe 1 — Analytics-Persistenz-Fundament: Events, die OHNEHIN durch /api/e
-- fliessen (gemappte Conversions), werden persistiert. Manuell im Supabase-SQL-Editor
-- ausfuehren, VOR dem Code-Deploy (fail-closed-Regel: erst das Ziel, dann der Schreiber).
--
-- Additiv, nicht-destruktiv: neue Tabelle, kein DROP, kein Touch bestehender Zeilen.
-- Bis hierher war /api/e ein reiner Forwarder (Event -> Meta-CAPI, nichts gespeichert);
-- diese Tabelle ist der Schreib-/Persistenz-Pfad, auf dem alles Weitere (Uniques,
-- Adblocker-Verlustrate, Dashboard) ADDITIV aufsetzt.

create table if not exists public.events (
  -- Surrogat-PK, analog audit_logs (0009). event_id ist BEWUSST NICHT der PK: er ist
  -- nicht unique (s.u.), und eine Tabelle ohne PK waere nicht zeilenweise referenzierbar.
  id uuid primary key default gen_random_uuid(),

  -- on delete cascade: Loeschen des Projekts raeumt seine Events mit ab.
  project_id uuid not null references public.projects (id) on delete cascade,

  -- CAPI-Event-Name (z.B. Purchase/Lead). Wird beim Insert hart auf 64 Zeichen
  -- gekuerzt (ungefilterter Client-Input aus dem Beacon-Blob).
  -- BACKSTOP: der Server-Pfad truncatet bereits auf 64; dieser CHECK verankert die
  -- Grenze in der DB, damit KEIN kuenftiger Schreibpfad (z.B. source='browser',
  -- Scheibe 2) sie still umgehen kann. Auf leerer Tabelle gratis; nachtraeglich auf
  -- gefuellter Tabelle teuer.
  event_type text not null constraint events_event_type_max_len check (length(event_type) <= 64),

  -- Die geteilte eventID. KEIN Unique-Constraint: Browser + Server teilen spaeter
  -- dieselbe eventID = genau der Verlustraten-Join; zudem kann ein sendBeacon-Retry
  -- schon heute doppeln. Dedup ist Query-Zeit-Sache einer spaeteren Zaehl-Scheibe,
  -- kein DB-Constraint. KEIN Index jetzt (in Scheibe 1 nirgends gematcht) — der folgt
  -- mit der Verlustraten-Join-Scheibe, die ihn wirklich braucht.
  event_id text not null,

  -- Beobachtungs-ORT, NICHT Werbe-Netzwerk-ZIEL: 'server' (hier) vs. spaeter 'browser'
  -- (Pixel-Bestaetigung). NOT NULL OHNE DEFAULT ist Absicht — es ZWINGT jeden kuenftigen
  -- Schreibpfad, die Herkunft bewusst zu setzen, statt still auf 'server' zu fallen.
  -- Ein spaeteres Multi-Tracking-ZIEL (Meta/GA4/TikTok) bekommt eine EIGENE additive
  -- Spalte; source nie zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Join.
  source text not null,

  created_at timestamptz not null default now()
);

-- Proaktiver Index (A-Regel): der Per-Projekt-Read der Dashboard-Scheibe filtert auf
-- project_id. Zeitraum-Index (BRIN auf created_at) erst dann, wenn Zeitraum-Queries
-- wirklich existieren.
create index if not exists events_project_id_idx on public.events (project_id);

-- RLS aktiviert, KEINE Policy: Writes laufen ausschliesslich ueber service_role
-- (Ingest-Pfad, session-los, umgeht RLS).
--
-- TRANSIENT — das ist ausdruecklich KEIN Dauerzustand: die owner-SELECT-Policy folgt in
-- der Dashboard-Read-Scheibe. Anders als audit_logs (0009), das bewusst DAUERHAFT
-- policy-los bleibt (echtes Append-Only), soll events spaeter vom Projekt-Owner lesbar
-- sein. Der Supabase-Linter-Hinweis "RLS Enabled No Policy" ist hier erwartet und
-- voruebergehend.
alter table public.events enable row level security;
