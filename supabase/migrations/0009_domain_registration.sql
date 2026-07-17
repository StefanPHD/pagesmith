-- Phase 7 Scheibe 7c-2b — Add-Domain-Mutation: Custom-Domain bei Vercel registrieren
-- und den Zustand persistieren. Manuell im Supabase-SQL-Editor ausfuehren. Additiv,
-- nicht-destruktiv: kein DROP, kein Daten-Touch bestehender Zeilen.
--
-- ZWEI Teile: (A) additive Status-/Verification-Spalten auf domains fuer die
-- registrierte Custom-Domain, (B) NEUE Tabelle audit_logs (unveraenderliches
-- Mutations-Audit + zugleich Datenquelle des Rate-Limits — keine zweite Zaehl-
-- Infrastruktur).
--
-- ATOMARITAETS-NOTIZ (bewusst, kein Bug): der domains-Schreibvorgang (Teil A) und der
-- audit_logs-Insert (Teil B) laufen als ZWEI getrennte PostgREST-Calls, NICHT in einer
-- gemeinsamen Transaktion/RPC. Bekanntes, akzeptiertes Restrisiko bei hartem
-- Prozessabbruch zwischen beiden Writes. Der Heilungspfad der Mutation faengt dieses
-- Szenario beim Folge-Versuch desselben Users indirekt ab (Vercel meldet die Domain als
-- "domain_already_in_use" auf unserem Projekt -> die DB-Zeile wird sauber nachgeholt).

-- === Teil A: domains — Status- + Verification-Spalten (additiv) =====================
-- verification_status: der EIGENE, aus dem separaten Config-Check (7c-2c) gepflegte
-- Status. Beim Add IMMER 'pending' — NIE aus Vercels verified-Flag der Add-Antwort
-- abgeleitet (das lieferte im Live-Test verified:true trotz fehlendem DNS -> wertlos).
-- NULL fuer die bestehenden label.publayer.net-Zeilen (kein Custom-Domain-Status).
-- CHECK haertet gegen Tippfehler; NULL bleibt zulaessig (Alt-Zeilen unangetastet).
alter table public.domains
  add column if not exists verification_status text
    check (verification_status is null
           or verification_status in ('pending', 'verified', 'misconfigured')),
  -- verification: der ROHE verification-Block aus Vercels Antwort (jsonb, nullbar).
  -- Rohdaten fuer die DNS-Anweisungen in 7c-2c — hier NICHT interpretiert.
  add column if not exists verification jsonb,
  -- Zeitpunkt des letzten Vercel-Abgleichs (Add / spaeter Config-Poll).
  add column if not exists vercel_synced_at timestamptz;

-- === Teil B: audit_logs — unveraenderliches Mutations-Audit ==========================
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  -- on delete cascade: Loeschen des Users raeumt seine Audit-Zeilen mit ab.
  user_id uuid not null references auth.users (id) on delete cascade,
  -- z.B. 'domain_add_attempt'. Ein Eintrag pro Mutations-AUFRUF (auch abgelehnte).
  action text not null,
  -- die normalisierte Domain (oder Rohwert bei frueher Ablehnung); nullbar.
  target text,
  -- feiner Ausgang: 'success' | 'healed' | 'rejected_*' | 'vercel_*' | 'internal_error'.
  outcome text not null,
  -- optionaler Kontext (z.B. Vercel-Statuscode/Fehlermeldung) als jsonb.
  detail jsonb,
  created_at timestamptz not null default now()
);

-- Datenquelle des Rate-Limits: "zaehle Eintraege dieses Users der letzten Stunde" ->
-- (user_id, created_at) ist der passende Index (proaktiv, Manifest A).
create index if not exists audit_logs_user_created_idx
  on public.audit_logs (user_id, created_at desc);

-- RLS wird mit der Tabelle ZUSAMMEN aktiviert, nie "spaeter".
alter table public.audit_logs enable row level security;

-- UNVERAENDERLICH per RLS, nicht per Konvention: BEWUSST KEINE Policy fuer irgendeine
-- Operation (kein SELECT/INSERT/UPDATE/DELETE fuer anon/authenticated). Ohne Policy ist
-- unter RLS JEDE dieser Operationen fuer diese Rollen STRUKTURELL verboten -> der Actor
-- kann seine eigenen Audit-Eintraege weder faelschen (INSERT) noch nachtraeglich
-- aendern/loeschen (UPDATE/DELETE). Der EINZIGE Schreib-/Lese-Pfad ist service_role
-- (bypassed RLS) im server-only Mutations-/Rate-Limit-Code. Append-only ist damit die
-- tragende, DB-erzwungene Eigenschaft — ein Audit-Log, das sein Subjekt aendern kann,
-- waere wertlos.
--
-- LINTER-HINWEIS — ERWARTET, BITTE IGNORIEREN: Supabases Security Advisor meldet fuer
-- public.audit_logs "RLS Enabled No Policy". Das ist KEIN Befund, sondern exakt der
-- oben beschriebene Entwurf: die FEHLENDE Policy IST der Append-Only-Mechanismus. Der
-- Linter kennt die Absicht nicht und wertet "RLS an, keine Policy" pauschal als
-- vermutlich vergessene Konfiguration.
--
-- NICHT "beheben", indem eine Policy ergaenzt wird. JEDE Policy fuer anon/authenticated
-- — auch eine scheinbar harmlose SELECT-Policy "nur eigene Zeilen" — oeffnet dieser
-- Tabelle eine Tuer, die sie bewusst nicht hat, und bricht die Unveraenderlichkeits-
-- Garantie bzw. macht das Rate-Limit (Manifest, 7c-2b) fuer den Actor einsehbar.
-- service_role braucht KEINE Policy (bypassed RLS) — es gibt also keinen legitimen
-- Konsumenten, dem eine Policy fehlen wuerde.
--
-- Falls je echte Lesbarkeit fuer Betreiber/Support noetig wird: NICHT ueber eine Policy
-- auf dieser Tabelle, sondern ueber einen server-only Pfad mit service_role (gleiches
-- Muster wie der Mutations-Code) — die Tabelle selbst bleibt policy-frei.
