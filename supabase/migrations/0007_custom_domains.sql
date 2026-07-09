-- Phase 7 Scheibe 7c-1 — Custom-Domains: eine gehostete Seite unter der EIGENEN
-- Domain des Marketers servieren (zusaetzlich zu label.pgsm.site). Manuell im
-- Supabase-SQL-Editor ausfuehren. Additiv, nicht-destruktiv: kein DROP, kein
-- Daten-Touch bestehender Zeilen, RLS/Policies aus 0006 unangetastet.
--
-- MODELL: die Kunden-Domain wird (in 7c-2) per Vercel-API dem Projekt zugeordnet;
-- der eingehende Host wird serverseitig zum Projekt aufgeloest. Hier NUR das
-- additive Schema — KEINE Status-/DNS-Spalten, KEINE Vercel-Anbindung (das ist 7c-2).

-- custom_host: die exakte Kunden-Domain (z.B. "landing.kunde.de"). NULL fuer die
-- bestehenden label.pgsm.site-Zeilen. Der Serve-Lookup matcht Custom-Hosts EXAKT
-- gegen diese Spalte (Hosts, die kein pgsm/lvh-Label tragen).
alter table public.domains
  add column if not exists custom_host text;

-- PARTIAL UNIQUE: ein custom_host darf global nur EINMAL existieren (Cross-User-
-- Hijack-Riegel auf DB-Ebene) — aber mehrere pgsm.site-Zeilen mit custom_host IS
-- NULL bleiben erlaubt (ein gewoehnlicher UNIQUE liesse nur EINE NULL-Zeile zu).
create unique index if not exists domains_custom_host_key
  on public.domains (custom_host)
  where custom_host is not null;

-- KEINE neue RLS-Policy noetig: custom_host liegt auf der bereits owner-scoped
-- domains-Zeile (0006). Der Owner setzt/aendert custom_host (7c-2) unter der
-- bestehenden domains_update_own-Policy; der anonyme Serving-Read laeuft weiter
-- ausschliesslich ueber service_role (bypassed RLS).
