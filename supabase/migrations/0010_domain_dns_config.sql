-- Phase 7 Scheibe 7c-2c — DNS-Anweisungs-UX: den Vercel-Config-Snapshot pro Custom-
-- Domain persistieren (Cache-Quelle + Rohdaten fuer die abgeleiteten Fein-Zustaende)
-- und Vercels autoritativen apexName festhalten (Apex-Erkennung ohne PSL/Dependency).
-- Manuell im Supabase-SQL-Editor ausfuehren. Additiv, nicht-destruktiv: kein DROP,
-- kein Daten-Touch bestehender Zeilen.
--
-- ENTSCHEIDUNG (7c-2c-Konzept, Option 2): dns_config ist eine EIGENE additive Spalte
-- neben der bestehenden verification-Spalte (0009) — NICHT deren Zweckerweiterung.
-- Trennung der beiden Vercel-Payloads: verification = roher Add-Response-Challenge-
-- Block (Besitznachweis); dns_config = roher GET /v6/domains/{d}/config-Snapshot
-- (configuredBy/misconfigured/recommendedCNAME/recommendedIPv4/…). Zwei verschiedene
-- Antworten, zwei verschiedene Zwecke -> zwei Spalten. Kein CHECK (rohes jsonb).
--
-- Die abgeleiteten Fein-Zustaende (waiting_dns/wrong_record/proxy_detected/live) werden
-- NICHT persistiert: sie werden bei JEDEM Request aus dns_config berechnet (Ableiten
-- statt Speichern). Nur die GROBE verification_status-Spalte (0009,
-- pending|verified|misconfigured) wird beim Config-Poll gepflegt.

alter table public.domains
  -- Roher Config-Snapshot aus Vercels GET .../config. Cache-Quelle (zusammen mit dem
  -- bestehenden vercel_synced_at) + Rohdaten fuer die UI-Ableitung. Nullbar (vor dem
  -- ersten Poll leer; die label.publayer.net-Alt-Zeilen bleiben NULL).
  add column if not exists dns_config jsonb,
  -- Vercels autoritativer apexName aus der Add-Response (7c-2b). host === apex_name
  -- => Apex (A-Records), sonst Subdomain (CNAME). Ersetzt eine fehleranfaellige
  -- lokale Heuristik (die bei mehrteiligen eTLDs wie .co.uk falsch laege). Nullbar
  -- (Alt-Zeilen + defensiver Fallback).
  add column if not exists apex_name text;
