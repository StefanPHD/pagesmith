-- Phase 8 Scheibe B — Adblocker-Verlustrate: Aggregation ueber das Bestaetigungs-Signal.
-- Manuell im Supabase-SQL-Editor ausfuehren, VOR dem Scheibe-B-Code-Deploy.
--
-- Scheibe A liefert das SIGNAL (source='browser'-Bestaetigung, live bewiesen), B macht
-- daraus die Zahl. EIGENE Funktion statt Erweiterung von get_event_counts (0013/0014):
-- andere Filter (Praefix-Ausschluss, Stichtag), andere Rueckgabeform — und die gerade erst
-- live bewiesene Counts-Kachel bleibt unberuehrt, laeuft also weiter, selbst wenn diese
-- Query zickt.
--
-- SECURITY INVOKER (Default, KEIN definer): die events_select_own-Policy (0013) filtert die
-- Aggregation von innen -> ein Nicht-Owner bekommt (0,0,NULL), nie fremde Zahlen. stable
-- (nur lesend). set search_path = public fixiert die Namensaufloesung (Advisor "Function
-- Search Path Mutable"); der Body ist zusaetzlich voll qualifiziert.

-- (1) Index fuer die korrelierten exists-Suchen unten. Scheibe 1 hat den event_id-Index
--     WOERTLICH auf diese Scheibe vertagt ("Index folgt mit der Verlustraten-Join-Scheibe")
--     — hier ist sie. Ohne ihn traegt nur events_project_id_idx: alle Zeilen des Projekts
--     holen und pro Server-Zeile erneut auf event_id filtern (O(N^2)-artig innerhalb eines
--     Projekts). Additiv: events_project_id_idx bleibt unangetastet und weiter noetig (er
--     traegt den aeusseren Scan und die Policy).
create index if not exists events_project_event_idx
  on public.events (project_id, event_id);

-- (2) Die Verlustrate als ROHZAHLEN. Prozent + "N von M"-Text formatiert das UI -> die
--     Zahl bleibt gegen SQL nachrechenbar (ein serverseitig gerundeter Prozentwert waere
--     das nicht). first_confirm_at IS NULL ist der eindeutige NEUTRAL-Status ("Warte auf
--     erste Bestaetigung") und damit von einer echten 0 unterscheidbar — das UI muss nicht
--     raten.
create or replace function public.get_adblock_loss(p_project_id uuid)
  returns table (
    total_server_conversions bigint,
    confirmed_conversions    bigint,
    first_confirm_at         timestamptz
  )
  language sql
  stable
  set search_path = public
as $$
  -- STICHTAG (selbstheilend, KEIN hardcodiertes Datum): die erste VERANKERTE Bestaetigung
  -- dieses Projekts — eine browser-Zeile, zu deren event_id auch eine server-Zeile
  -- existiert.
  --
  -- Der exists-ANKER ist sicherheitsrelevant, nicht kosmetisch: /api/e ist ein ANONYMER
  -- Endpunkt, der trackingKey steht oeffentlich im ausgelieferten HTML. Ohne den Anker
  -- koennte ein EINZELNER geschmiedeter Confirm (browser-Zeile ohne server-Zeile) als
  -- fruehste browser-Zeile den Stichtag setzen, ein Neutral-Status-Projekt in den
  -- Zahlen-Modus kippen und — weil dann Bestandsdaten ohne jede Bestaetigung ins Fenster
  -- fielen — eine hohe FALSCHE Verlustrate erzeugen. Die selbstheilende Regel waere anonym
  -- aushebelbar. Mit dem Anker sind Verwaiste UEBERALL inert: Zaehler, Nenner, Stichtag,
  -- Neutral-Status.
  --
  -- EHRLICHE GRENZE: der Anker erschwert das Faelschen, er verhindert es nicht. Wer ZWEI
  -- Beacons mit derselben frei erfundenen eventID schickt (einer ohne, einer mit Marker),
  -- erzeugt eine verankerte Bestaetigung. Die Wurzel ist der anonyme Ingest selbst ->
  -- Per-Tenant-Rate-Limiting (Security-Manifest Tier 1), NICHT Scope dieser Scheibe.
  --
  -- Der Praefix-Filter steht auch HIER (nicht nur im Hauptfilter): TrackConfig.event ist
  -- ein freier Nutzer-String, ein Marketer darf ein Custom-Event "__ps_pageview" nennen.
  -- Dessen Bestaetigung duerfte den Stichtag nicht verfruehen.
  with first_confirm as (
    select min(b.created_at) as at
    from public.events b
    where b.project_id = p_project_id
      and b.source     = 'browser'
      and left(b.event_type, 5) <> '__ps_'
      and exists (
        select 1
        from public.events s2
        where s2.project_id = b.project_id
          and s2.event_id   = b.event_id
          and s2.source     = 'server'
      )
  )
  select
    -- NENNER auf den SERVER-Zeilen: der Server sieht JEDE Conversion (first-party /api/e)
    -- -> das ist die vollstaendige Grundgesamtheit. Vom Confirm aus zu aggregieren wuerde
    -- Artefakte (Retry, geschmiedeter Beacon, Race) zum Nenner machen.
    count(*)::bigint,
    -- ZAEHLER: existiert zur selben event_id eine browser-Zeile DESSELBEN Projekts?
    -- REIN MENGENBASIERT — die Bedingung enthaelt KEINEN Zeitvergleich zwischen den beiden
    -- Zeilen. Das ist Pflicht, nicht Stilfrage: live gemessen traf die browser-Zeile 25 ms
    -- bis 850 ms VOR der server-Zeile ein (der Conversion-Beacon wartet im Handler auf den
    -- Meta-Forward, der Confirm nimmt den fruehen return). Die Gegenrichtung ist ebenso
    -- moeglich (gepufferter Confirm bei langsamem Pixel-Load). Jede "server zuerst"-Annahme
    -- braeche also regelmaessig.
    count(*) filter (
      where exists (
        select 1
        from public.events c
        where c.project_id = s.project_id
          and c.event_id   = s.event_id
          and c.source     = 'browser'
      )
    )::bigint,
    (select at from first_confirm)
  from public.events s
  where s.project_id = p_project_id
    and s.source     = 'server'
    -- CONVERSION-FILTER: analytics-only Events raus, sonst dominieren PageViews den Nenner
    -- (~95%+ Falsch-Verlust). PRAEFIX-basiert statt namentlich -> deckt kuenftige
    -- __ps_-Tokens automatisch ab. BEWUSST left(...) und NICHT "not like '__ps_%'":
    -- '_' ist eine LIKE-Wildcard, das Muster traefe auch fremde Namen.
    and left(s.event_type, 5) <> '__ps_'
    -- Ist der Stichtag NULL (keine verankerte Bestaetigung), ist der Vergleich NULL ->
    -- keine Zeile passiert -> Ergebnis (0, 0, NULL). Aggregate ohne group by liefern
    -- IMMER genau eine Zeile, auch bei leerer Eingabemenge -> das UI muss nie "0 rows"
    -- von "0 Events" unterscheiden.
    and s.created_at >= (select at from first_confirm)
$$;
