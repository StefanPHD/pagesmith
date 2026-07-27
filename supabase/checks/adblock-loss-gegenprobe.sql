-- ZWECK:       UNABHAENGIGE Kontrollrechnung zur Adblocker-Verlustrate. Liefert
--              dieselben drei Rohzahlen wie die RPC get_adblock_loss(p_project_id),
--              aber auf einem ANDEREN Weg: LEFT JOIN + GROUP BY statt der korrelierten
--              EXISTS-Suchen. Eine Kopie des Funktionsrumpfs waere eine Tautologie —
--              sie wuerde jeden Denkfehler der RPC mitmachen und nichts beweisen.
-- ERWARTUNG:   Die drei Werte stimmen mit dem RPC-Ergebnis UEBERSTIMMEND ueberein:
--                select * from public.get_adblock_loss('<PROJEKT_UUID>');
--              Jede Abweichung ist ein echter Fund — dann rechnet mindestens einer der
--              beiden Wege falsch, und die im UI angezeigte Marquee-Zahl ist unbelegt.
-- WANN:        Nach jeder Aenderung an der Verlustraten-Logik, am Ingest oder am
--              Bestaetigungs-Beacon; und immer, wenn die Kachel eine Zahl zeigt, die
--              ueberrascht.
-- PLATZHALTER: <PROJEKT_UUID> — dreimal unten einzusetzen.
-- FALLE:       count(distinct s.id) ist PFLICHT, nicht Kosmetik: existieren zu einer
--              event_id MEHRERE browser-Zeilen (Retry, Doppel-Beacon), vervielfacht der
--              LEFT JOIN die Server-Zeile, und ein blosses count(*) zaehlte sie mehrfach.
--              Die RPC nutzt EXISTS und zaehlt sie einmal — ohne distinct verglichen man
--              also zwei verschiedene Fragen und faende eine "Abweichung", die keine ist.
--              Zweite Falle: der Praefix-Ausschluss steht BEWUSST als
--              left(event_type, 5) <> '__ps_' da und NICHT als "not like '__ps_%'" —
--              '_' ist eine LIKE-Wildcard und das Muster traefe auch fremde Namen.
-- VERIFIZIERT: 2026-07-27 (Logik gegen den RPC-Rumpf aus Migration 0015 abgeglichen;
--              der Zahlenvergleich gegen echte Daten steht beim naechsten Live-Test an)

with first_confirm as (
  -- STICHTAG, VERANKERT: die frueheste browser-Bestaetigung, zu der es auch eine
  -- server-Zeile gibt. Hier per JOIN statt per EXISTS — der unabhaengige Weg. Der
  -- Anker ist sicherheitsrelevant: /api/e ist anonym, ein geschmiedeter Confirm ohne
  -- server-Gegenstueck duerfte den Stichtag nicht setzen.
  select min(b.created_at) as at
  from public.events b
  join public.events s2
    on s2.project_id = b.project_id
   and s2.event_id   = b.event_id
   and s2.source     = 'server'
  where b.project_id = '<PROJEKT_UUID>'
    and b.source     = 'browser'
    and left(b.event_type, 5) <> '__ps_'
),
server_conversions as (
  -- NENNER: alle server-beobachteten Conversions ab dem Stichtag. Analytics-Events
  -- (__ps_-Praefix) raus, sonst dominieren PageViews den Nenner.
  select s.id, s.project_id, s.event_id
  from public.events s
  where s.project_id = '<PROJEKT_UUID>'
    and s.source     = 'server'
    and left(s.event_type, 5) <> '__ps_'
    and s.created_at >= (select at from first_confirm)
)
select
  count(distinct sc.id)                                    as total_server_conversions,
  count(distinct sc.id) filter (where c.id is not null)    as confirmed_conversions,
  (select at from first_confirm)                           as first_confirm_at
from server_conversions sc
left join public.events c
       on c.project_id = sc.project_id
      and c.event_id   = sc.event_id
      and c.source     = 'browser';
