-- Phase 9 Scheibe 9c-1 — Auswertung je Variante: Counts je event_type UND Variante.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Code-Deploy (fail-closed).
--
-- KEIN TABELLEN-DDL: kein add column, kein CHECK, kein Backfill, kein DEFAULT, KEIN Index.
-- Diese Migration legt AUSSCHLIESSLICH eine neue Lese-Funktion an. Damit ist sie ohne den
-- zugehoerigen Code ein No-op und gefahrlos frueh einspielbar.
--
-- EIGENE FUNKTION STATT ERWEITERUNG VON get_event_counts (0013/0014) — der Praezedenzfall
-- ist get_adblock_loss (0015), und der Grund ist hier zweifach belegt:
--  (a) SEMANTISCH: eine Varianten-Dimension in get_event_counts erzwaenge eine Gruppierung
--      je (event_type, variant) -> MEHRERE Zeilen je event_type. Die bestehende
--      Statistik-Liste rendert je event_type EINEN Eintrag und schluesselt darueber; sie
--      zeigte dann "Lead 3" und "Lead 5" statt "Lead 8". Kein Fehler — nur falsche Zahlen.
--  (b) MECHANISCH: "create or replace function" kann den RUECKGABETYP nicht aendern. Eine
--      zusaetzliche Spalte in RETURNS TABLE verlangt ein drop + create, also ein Fenster,
--      in dem die LIVE gelesene Funktion nicht existiert.
-- Die bestehenden RPCs bleiben damit byte-identisch.
--
-- SECURITY INVOKER (Default, BEWUSST KEIN security definer): die events_select_own-Policy
-- (0013) filtert die Aggregation VON INNEN -> ein Nicht-Owner bekommt 0 Zeilen, nie fremde
-- Zahlen. Als DEFINER liefe die Funktion mit Owner-Rechten und lieferte Zahlen ueber ALLE
-- Tenants. Das ist die Klausel, auf die bei diesem Diff zuerst geschaut wird.
-- stable (nur lesend). set search_path = public fixiert die Namensaufloesung (Advisor
-- "Function Search Path Mutable"); der Body ist zusaetzlich voll qualifiziert.
--
-- GENAU ZWEI VARIANTEN, ALS FESTE SPALTEN: die Ausgabe traegt je event_type EINE Zeile mit
-- count_a / count_b / count_none statt einer Zeile je (event_type, variant)-Kombination.
--    WARUM: eine Gruppierung liefert nur Kombinationen, DIE ES GIBT. Erscheint eine
--    Event-Art nur in Variante A, FEHLTE die B-Zeile ganz — und "fehlt" ist nicht "0". Der
--    Client muesste die Luecke fuellen und waere damit eine zweite Stelle, die beantwortet,
--    "welche Variante traegt was" (exakt die Konstellation, aus der der 9b-1-Befund kam).
--    Mit filter-Aggregaten ist die Luecke strukturell unmoeglich: count(*) filter (...)
--    liefert 0, nicht NULL.
--    Die Festlegung auf ZWEI Varianten spiegelt events_variant_valid (0017: variant is null
--    or variant in ('a','b')) und die Grundsatzentscheidung der Phase (keine
--    Multi-Varianten). BEI EINEM DRITTEN FALL wird dieses Modell ERSETZT, nicht erweitert —
--    dieselbe Haltung wie beim bewussten Varianten-Duplikat in 9a.
--
-- KEIN ZEITFILTER, KEIN LAUF-BEGINN: 9c-1 wertet ALLE Zeilen mit Variante aus. Die
-- Lauf-Abgrenzung ist ausdruecklich Scheibe 9c-2 und bringt ihre eigene Migration mit. Hier
-- wird dafuer NICHTS vorgebaut: ein Feld, das konstruktionsbedingt immer NULL waere, haette
-- keinen diskriminierenden Test.
--
-- KEIN __ps_-PRAEFIXFILTER (anders als get_adblock_loss): die PageView-Zeile IST der Nenner
-- dieser Auswertung und muss im Ergebnis bleiben. Der Aufrufer trennt Nenner und Zaehler
-- anhand des reservierten Tokens.
--
-- KEIN INDEX auf events.variant: niedrige Kardinalitaet (zwei Werte plus NULL), der
-- Projektfilter traegt ueber events_project_id_idx (0011). Falls es je langsam wird: MESSEN,
-- dann entscheiden — ein Index auf Verdacht ist Schreiblast auf dem Ingest-Pfad ohne
-- belegten Nutzen.
create or replace function public.get_variant_counts(p_project_id uuid)
  returns table (
    event_type text,
    count_a    bigint,
    count_b    bigint,
    count_none bigint
  )
  language sql
  stable
  set search_path = public
as $$
  select
    e.event_type,
    count(*) filter (where e.variant = 'a')::bigint    as count_a,
    count(*) filter (where e.variant = 'b')::bigint    as count_b,
    -- ZEILEN OHNE ZUORDNUNG werden MITGEZAEHLT, nicht weggefiltert: sie sind das einzige
    -- Signal ueber Messverluste, das der Owner ueberhaupt hat (cookie-verweigernder
    -- Browser, Export-Download auf fremder Domain, Seite vor der Aktivierung ausgeliefert).
    -- Sie wegzulassen hiesse, den Nenner stillschweigend zu beschoenigen. Das UI zeigt sie
    -- nur, wenn die Zahl nicht null ist.
    -- EHRLICHE GRENZE DIESER SCHEIBE: ohne Lauf-Abgrenzung (9c-2) enthaelt count_none AUCH
    -- alle Zeilen, die VOR dem ersten Test entstanden sind. Das ist korrekt fuer die Frage
    -- "welche Zeilen tragen keine Variante", aber nicht dasselbe wie "Messverlust waehrend
    -- des Tests".
    count(*) filter (where e.variant is null)::bigint  as count_none
  from public.events e
  where e.project_id = p_project_id
    -- WOERTLICH aus get_event_counts (0014) uebernommen. Identische Filtersemantik ist
    -- PFLICHT: driftet sie, zeigen zwei Sektionen DESSELBEN Dashboards unvereinbare Zahlen,
    -- und keiner von beiden ist anzusehen, wer recht hat. Ein Test prueft die Summe ueber
    -- alle Varianten gegen die projektweite Zahl derselben Event-Art.
    and e.source = 'server'
  group by e.event_type
$$;

-- Protokoll-Eintrag als LETZTE Anweisung (Pflicht ab 0018): entsteht nur bei erfolgreichem
-- Durchlauf. Bricht die Migration vorher ab, gibt es keine Zeile, die einen nie vollzogenen
-- Lauf behauptet.
insert into public.schema_migrations (version, filename, applied_at)
values ('0019', '0019_variant_counts.sql', now())
on conflict (version) do nothing;
