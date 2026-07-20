# Phase 8 — Analytics & CAPI-Härtung (ausgelagerte Historie)

Volle Herleitung, Entscheidungen, Tests und Live-Verifikation der bereits GEBAUTEN
Phase-8-Arbeit. Aus der Root-CLAUDE.md ausgelagert, nachdem beide Scheiben live in
Produktion bewiesen waren.

Der aktive Ist-Stand (letzte Migration, events-Schema, RLS-Transienz, aufgeschobene
Optimierungen) steht WEITERHIN in der Root unter "## Aktueller DB-/Analytics-Stand"; die
dauerhaft geltenden Regeln daraus (source = Beobachtungs-ORT, Ingest-204-Containment) unter
"## Immer beachten"; die Pflicht-Arbeit für Scheibe 2 (expliziter Kill-Switch-Zweig beim
Entkoppeln) unter "## Offene Punkte". Diese Datei traegt die BEGRUENDUNG dazu, nicht den
aktuellen Zustand.

Die NICHT-gebaute Phase-8-Vision (Dashboard, Verlustrate, ROI/Attribution):
docs/claude-history/future-roadmap.md.

## Phase 8 Scheibe 1 — Analytics-Persistenz-Fundament (ABGESCHLOSSEN, live verifiziert)
Erste Scheibe von Phase 8. ABGESCHLOSSEN — live in Produktion bewiesen (2026-07-20). Vollvision:
docs/claude-history/future-roadmap.md. Die Detail-Entscheidungen unten bleiben als REFERENZ stehen
(sie tragen das WARUM für Scheibe 2+), sind aber keine offene Planung mehr.

- VERIFIZIERT (live, nachgelagerte Wirkung — nicht über HTTP-Status):
  - HAPPY PATH: gemappte Conversion auf einer echten publayer.net-Seite -> GENAU EINE Zeile in
    public.events mit source='server'. Beweist zugleich, dass after() in Vercels echter
    Serverless-Runtime NACH der Response noch ausgeführt wird (die Function wird nicht vorher
    eingefroren) und dass die Insert-Spaltennamen wirklich zur Tabelle passen — beides kann kein
    Unit-Test zeigen (der Test vergleicht nur gegen eine handgeschriebene Kopie derselben Namen).
  - CAPI BYTE-IDENTISCH: dieselbe eventID erscheint im Meta Events Manager UND in der DB-Zeile ->
    der Forward läuft unverändert weiter, der Persist hängt nur daneben.
    KORREKTUR (2026-07-20): Dieser Haken belegte Browser-eventID <-> DB-eventID (die matchen
    strukturell IMMER, weil beide aus derselben Client-eventID stammen) — NICHT den echten
    Server->Meta-Durchgang. Letzterer war zu diesem Zeitpunkt faktisch gebrochen (Token/ID-
    Mismatch, s. "Immer beachten") und wurde erst am 2026-07-20 erstmals live als
    dedupliziertes "Empfangen von: Server"-Event bei Meta bewiesen. LEHRE: "Forward läuft"
    wird über ein SERVER-Event im Events Manager verifiziert, nicht über eventID-Gleichheit
    Browser<->DB.
  - KILL-SWITCH GEGENPROBE: gesperrtes Projekt (blocked_at) -> KEINE Zeile. Fail-closed greift
    automatisch über den Resolver (null -> kein capiConfig -> kein Persist), ohne eigenen Zweig.
- MIGRATION 0011 gelaufen und in der DB verifiziert: PK, FK ON DELETE CASCADE, CHECK
  events_event_type_max_len (<= 64), alle Spalten NOT NULL, Defaults korrekt.
- OFFEN MITGENOMMEN (NICHT verlieren, je eigene Scheibe):
  (a) CAPI-HÄRTUNGS-SCHEIBE — der Meta-fetch in ingest.ts hat weiterhin KEIN Timeout (Verstoß gegen
      die A-Regel "defensive Timeouts", vorbestehend, nicht durch Scheibe 1 verursacht); dazu die
      errorName()-Konsistenz im ingest.ts-Catch (dort noch `err instanceof Error`, während
      analytics/persist.ts den robusteren Helper nutzt — DOMException/AbortError liefe sonst als
      "unknown" ins Log). SINNVOLLERWEISE VOR Scheibe 2 (PageView bringt den Volumensprung).
      -> JETZT IN UMSETZUNG, s. Sektion "Aktiver Stand — CAPI-Härtung".
  (b) META-ENTKOPPLUNG -> Scheibe 2 (PageView): erst dort entsteht Meta-unabhängiger Client-Traffic.
      Mit ihr werden der EXPLIZITE Kill-Switch-Zweig und das blocked-Feld im Resolver PFLICHT — der
      heutige automatische Schutz hängt daran, dass der Persist im capiConfig-Zweig sitzt; wer
      entkoppelt, ohne den expliziten Zweig zu bauen, macht den Kill-Switch still fail-open.

- SCOPE (EINE Verantwortung): Events, die OHNEHIN durch /api/e fließen (gemappte Conversions), werden
  in eine neue additive `events`-Tabelle persistiert (das Consent-Gate bleibt unverändert
  client-seitig in __psMetaFire, s.u.). Heute ist /api/e ein reiner
  Forwarder (Event -> CAPI, nichts gespeichert) -> diese Scheibe legt den Schreib-/Persistenz-Pfad,
  auf dem alles Weitere (Uniques, Verlustrate, Dashboard) additiv aufsetzt.
- BEWUSST NICHT in Scheibe 1 (je eigene spätere Scheiben): PageView (neuer Event-Typ + Hotspot-
  Volumensprung -> Scheibe 2); Read/Dashboard; Adblocker-Verlustrate (braucht ein ZWEITES Client-Signal,
  die Browser-Pixel-Bestätigung an /api/e — heute geht das Pixel direkt an Meta); ROI/Attribution
  (nur Schema-Prep bis echte Ad-Spend-API); client-erfasste Metriken (Scrolltiefe/Vitals/Video).
- LEAN / PII-FREI (Entscheidung): KEIN IP/UA in Scheibe 1 -> die 30-Tage-Retention-Pflicht (CLAUDE.md
  Tier 2, bindet ab Phase 8 sobald Rohdaten liegen) wird NICHT ausgelöst. Bot-Filter/Uniques kommen
  additiv in der Scheibe, die IP/UA wirklich braucht, und bringen ihre Retention-Pflicht DORT mit.
- TABELLE `events` (additiv, neue Migration — nächste freie Nummer aus supabase/migrations/ nehmen,
  vermutlich 0011, VERIFIZIEREN):
  - id          uuid primary key default gen_random_uuid(). Surrogat-PK, analog audit_logs (0009).
    event_id ist BEWUSST NICHT der PK (nicht unique — s.u.); eine Tabelle ohne PK wäre zudem nicht
    zeilenweise referenzierbar (eigene Lektion: Identität nie über ein angenommenes Feld).
  - project_id  uuid, FK auf projects ON DELETE CASCADE. INDEX jetzt (proaktiv, A-Regel: der Per-Projekt-
    Read nutzt WHERE project_id).
  - event_type  text (CAPI-Event-Name, z.B. Purchase/Lead).
  - event_id    text (die geteilte eventID). KEIN Unique-Constraint: Browser + Server teilen später
    dieselbe eventID = genau der Verlustraten-Join; zudem kann sendBeacon-Retry schon in Scheibe 1
    doppeln. Dedup ist Query-Zeit-Sache einer späteren Zähl-Scheibe, kein DB-Constraint. KEIN Index
    jetzt (in Scheibe 1 nirgends gematcht; Index folgt mit der Verlustraten-Join-Scheibe).
  - source      text NOT NULL, KEIN column-DEFAULT. Der Ingest-Pfad schreibt EXPLIZIT 'server'.
    Begründung: additiv-für-immer-Tabelle braucht den Diskriminator ab Zeile 1 (spätere Client-
    Bestätigung schreibt 'browser') — nachträglich hinzufügen hieße Alt-Zeilen backfillen
    (verbotene Daten-Transformation) oder NULL-als-server deuten (stille Semantik-Schuld). NOT-NULL-
    OHNE-DEFAULT ZWINGT jeden künftigen Schreibpfad, die Herkunft bewusst zu setzen (kein stiller
    Fallback auf 'server'). ACHSEN-HYGIENE: source = Beobachtungs-ORT (server vs. browser),
    NICHT Werbe-Netzwerk-ZIEL. Ein späteres Multi-Tracking-Ziel (Meta/GA4/TikTok) bekommt eine EIGENE
    additive Spalte; source NIE zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Join.
    TOKEN-KORREKTUR: der Wert heißt 'server', OHNE jedes Ziel-Suffix. Ein '_capi'-Suffix wäre ein
    Netzwerk-ZIEL im Beobachtungs-ORT-Feld und bräche genau die Achsen-Hygiene-Regel eine Zeile
    weiter oben — der Gegenwert ist 'browser' (derselbe Event, anderer Beobachtungsort), NICHT ein
    anderes Zielnetzwerk. Dass Scheibe 1 faktisch nur neben einem CAPI-Forward schreibt (s.
    KOPPLUNG unten), ändert daran nichts: der Ort bleibt der Server. Da Werte NIE nachträglich
    transformiert werden, ist der Token permanent -> er muss ab Zeile 1 stimmen.
  - created_at  timestamptz DEFAULT now() (Server-Timestamp). Zeitraum-Index (BRIN) erst mit der
    Dashboard-Scheibe (Zeitraum-Queries), nicht jetzt.
  - KEIN IP/UA (Lean/PII-frei, s.o.) — gilt unverändert auch für jede spätere Schreib-Quelle, die
    additiv dazukommt.
- INPUT-HÄRTUNG (event_type): event_type ist UNGEFILTERTER Client-Input aus dem Beacon-Blob (der
  Ingest trimmt ihn heute nur). Für den Meta-Forward ist das unkritisch (Meta validiert selbst), als
  DB-Wert landet damit aber beliebiger Client-String in unserer Tabelle. Deshalb beim Insert HART auf
  max. 64 Zeichen TRUNCATEN, bevor der Wert in die DB geht -> Schutz vor DB-Bloat/Missbrauch.
  AUSDRÜCKLICH KEINE Whitelist erlaubter Event-Namen: das bräche Custom-Events (freier event_name ist
  bei der Graph-CAPI ein legitimer Fall, s. isCustom im Ingest).
- CONSENT-SPALTE BEWUSST GESTRICHEN (Korrektur der ursprünglichen Fassung): psConsent() ist heute
  permissiv-default (true, wenn window.pagesmithConsent fehlt) und das Beacon-Blob trägt gar kein
  consent-Feld -> die Spalte wäre in JEDER Zeile konstant true = null Information (tote Spalte,
  reiner Vorbau). Anders als source (Join-Diskriminator, MUSS ab Zeile 1 stehen) ist consent ein
  reines Audit-Attribut und später OHNE Backfill-Problem additiv nachrüstbar, sobald ein echter
  Consent-Modus existiert. Das tragende Gate bleibt unverändert client-seitig in __psMetaFire
  (kein Beacon ohne psConsent()) — gestrichen wird die Spalte, NICHT das Gate.
- RLS: aktiviert, KEINE Policy in Scheibe 1 -> Writes laufen nur über service_role (Ingest-Pfad,
  session-los, umgeht RLS). WICHTIG im Migrations-Kommentar dokumentieren: das ist TRANSIENT — die
  owner-SELECT-Policy folgt in der Dashboard-Read-Scheibe. NICHT dauerhaft policy-los wie audit_logs
  (dort echtes Append-Only). Linter-"RLS Enabled No Policy" ist HIER ein vorübergehender erwarteter
  Hinweis, kein Dauerzustand.
- WRITE-POSTURE — CODE-BEFUND (verifiziert am echten Code im Stufe-1-Plan, ERSETZT die frühere
  Annahme): Es gibt HEUTE KEIN waitUntil/after im Ingest-Pfad. Der Meta-CAPI-Forward wird BLOCKIEREND
  awaited (ingest.ts, Forward-Block; grep über src/ = NULL Treffer für waitUntil/after;
  phase-6-capi.md dokumentiert den await als bewusste Phase-6-Entscheidung). Die frühere Formulierung
  "der Persist hängt sich in DENSELBEN bestehenden Hintergrund-Mechanismus" war damit schlicht FALSCH
  und ist verworfen — es gibt keinen solchen Mechanismus, an den man sich hängen könnte.
- WRITE-POSTURE — GEWÄHLTES MODELL "B" (Persist allein im Hintergrund, CAPI unangetastet):
  Der CAPI-await bleibt BYTE-IDENTISCH bestehen -> die 204-Antwortzeit ändert sich nicht (Invariante
  "Beacon-204 nicht verschlechtern" gehalten, und der Forward behält seine bewiesene Zuverlässigkeit).
  NUR der Persist läuft als Hintergrund-Task NACH der Response, über das RUNTIME-KORREKTE Primitiv
  (Node-Runtime: after() aus next/server; Edge: waitUntil). WELCHES davon gilt, wird beim Bau an der
  ECHTEN /api/e-Runtime ABGELESEN, nicht geraten (Instrument schlägt Vermutung). Ausdrücklich NICHT:
  den bestehenden CAPI-Forward in ein neues Zustell-Modell zwingen.
- WRITE-POSTURE — ISOLATION: Der Persist-Callback trägt einen EIGENEN try/catch (Fehler geloggt,
  fliegt NIE in den Response-Pfad) UND einen internen strikten Insert-Timeout (AbortController).
  So kann ein hängender oder fehlschlagender Insert weder die Response noch den CAPI-Forward
  berühren noch die Function bis zum Plattform-Limit offenhalten (Tier-0-Circuit-Breaker-Gedanke,
  schützt Vercel-Execution-Time/Kosten).
- BESTANDSBEFUND, NICHT TEIL DIESER SCHEIBE: der heutige Meta-fetch hat KEIN Timeout (ein hängendes
  Meta blockiert die Function bis zum Plattform-Limit) — verstößt gegen die A-Regel "DEFENSIVE
  TIMEOUTS". Bewusst VERSCHOBEN in eine eigene spätere CAPI-Härtungs-Scheibe (Hintergrund-Zustellung
  des Forwards + Timeout), sinnvollerweise VOR Scheibe 2 (PageView-Volumensprung). Begründung der
  Trennung: "Zustell-Umbau am bewiesenen CAPI-Pfad" wird NICHT mit "neue Tabelle" in einer Scheibe
  vermischt.
- KOPPLUNG (Scheibe 1 = COUPLE-MINIMAL, bewusste Entscheidung — ersetzt die zwischenzeitlich
  geplante Meta-Entkopplung): Der Persist hängt via after() INNERHALB des bestehenden
  `if (capiConfig)`-Zweigs. Grund (Stufe-1-Befund am echten Code): Meta-lose Projekte senden HEUTE
  gar keinen Beacon — __psMetaFire ist BUILD-ZEIT-gegatet über metaTrackStatement(hasPixel), ohne
  Pixel-ID entsteht nur ein console.warn, kein Fire (zusätzlich liefert buildCapiBeaconStatement ohne
  trackingKey ""). An /api/e kommt also ausschließlich Traffic von Meta-konfigurierten Projekten an.
  Eine Entkopplung wäre in Scheibe 1 folglich WIRKUNGSLOS/dormant und mangels Client-Traffic NICHT
  live-verifizierbar. Deshalb koppeln (kleiner, additiv, live-beweisbar) statt eine riskante
  Umstrukturierung des Ingest-Kontrollflusses ohne Live-Beweis zu verbauen.
- RESOLVER (token.ts, ADDITIVER Eingriff in eine zweite Kern-Datei, kompakte Fassung):
  getCapiConfigByTrackingKey liefert künftig { projectId, capiConfig } statt nur { pixelId, token }
  (capiConfig weiterhin { pixelId, token } | null). Die project.id wird im Lookup HEUTE SCHON
  aufgelöst und danach verworfen -> KEINE zweite Query im Hotspot (/api/e-Schlankheits-Regel
  gewahrt). KEIN blocked-Feld in Scheibe 1 (gehört zur Entkopplung, s.u.). Der CAPI-Zweig liest
  weiter capiConfig und verhält sich BYTE-IDENTISCH, wenn eine Config vorhanden ist.
- KILL-SWITCH (Scheibe 1 = AUTOMATISCH, nicht explizit): Weil der Persist im `if (capiConfig)`-Zweig
  hängt, greift der bestehende Schutz von selbst — ein gesperrtes Projekt liefert im Lookup null
  (blocked_at-Check in token.ts:58, VOR der Pixel-/Token-Auflösung) -> kein capiConfig -> kein
  Persist. Fail-closed wie heute, ohne neue Verzweigung. Der EXPLIZITE Kill-Switch-Zweig (projectId
  vorhanden UND nicht gesperrt) samt blocked-Feld gehört zur Entkopplung und wandert MIT IHR nach
  Scheibe 2 — er wird dort PFLICHT, weil dann der automatische Schutz durch die Config-Kopplung
  entfällt.
- LATENZ DES ANSPRUCHS (ehrlich benannt): Der Anspruch "First-Party-Analytics erfasst allen Traffic,
  auch bei Kunden ohne Meta-Setup" bleibt gültig, ist in Scheibe 1 aber PLANMÄSSIG LATENT — faktisch
  persistieren wir hier nur Meta-Traffic, weil nur der überhaupt einen Beacon erzeugt. Aktiv wird der
  Anspruch erst mit der Meta-unabhängigen Client-Infrastruktur in Scheibe 2 (PageView), und zwar rein
  ADDITIV: bis dahin existieren keine Meta-losen Zeilen, es gibt also nichts, dessen Verhalten sich
  ändern könnte.
- DEPLOY-REIHENFOLGE (beim späteren Bau): Migration im Supabase-Editor VOR dem Code-Deploy
  (fail-closed-Regel). Am echten Code vor dem Bau verifizieren: (a) welche RUNTIME /api/e fährt
  (Node -> after() aus next/server, Edge -> waitUntil) — es läuft dort NOCH KEIN Hintergrund-Primitiv,
  das Modell-B einführt es für den Persist; (b) dass der CAPI-await unverändert bleibt.
- DEMOBAR / LIVE-TEST (definiert die "erledigt"-Schwelle): gemappte Conversion auf einer Live-
  publayer.net-Seite feuern -> innerhalb des Timeouts landet EINE Zeile mit
  source='server' und der eventID -> per SQL verifiziert (nachgelagerte Wirkung, wie beim
  Kill-Switch), NICHT über den HTTP-Status.

## CAPI-Härtung — 3s-Timeout + errorName-Util (ABGESCHLOSSEN, live)
STATUS-NACHTRAG (beim Auslagern ergänzt): Der Root-Titel trug bis zuletzt "Konzept
festgezurrt, Bau als Nächstes" — das war nicht mehr zutreffend. Die Scheibe ist GEBAUT und
DEPLOYT (refactor 007dd3e "errorName in shared util", feat d769ff4 "3s-Timeout auf
Meta-Forward + errorName in beiden Catches"; Vercel-Production-Build READY). Live-Stand:
das Timeout greift, der Forward läuft nach dem Token/ID-Fix wieder durch, im Normalbetrieb
erscheinen KEINE AbortError-Logs. Der unten beschriebene Plan ist damit umgesetzt, nicht
mehr offen. Das errorName-Util liegt in src/lib/errors.ts (flache lib-Datei nach dem
settings.ts-Vorbild — es gibt in diesem Repo bewusst kein utils/-Verzeichnis).

Kleine Härtungs-Scheibe VOR Phase 8 Scheibe 2. Löst den offenen Folgepunkt (a) aus Scheibe 1.
Bewusst eng: NUR Timeout + errorName. NICHT enthalten: der Zustell-Umbau "CAPI-Forward auf
Hintergrund" (204 löst sich von Metas Latenz) — aufgeschoben, bis Beacon-Latenz ein echtes Problem
ist.

- SCOPE: (1) AbortController-Timeout auf den Meta-fetch in ingest.ts, Dauer 3000ms — kappt echte
  Hänger (heute blockiert ein hängendes Meta bis zum Plattform-Limit, Verstoß gegen die A-Regel
  "defensive Timeouts"), bricht aber legitime Latenzspitzen (1-2s) nicht ab. (2) errorName-Fix im
  ingest.ts-Catch (heute `err instanceof Error` -> ein AbortError/DOMException liefe als "unknown"
  ins Log; genau der Fehlerfall, den das neue Timeout überhaupt erst erzeugt).
- ERRORNAME ALS SHARED-UTIL (gegen Drift): den robusten errorName-Helper aus
  src/lib/analytics/persist.ts in ein gemeinsames Util extrahieren; persist.ts darauf umverdrahten
  (verhaltensgleich, die Bestandstests decken das); ingest.ts importiert dasselbe Util statt der
  schwachen instanceof-Prüfung. EINE Wahrheitsquelle. Der Util-PFAD wird gegen die bestehende
  Verzeichnis-Konvention GEPRÜFT (util vs. utils vs. woanders), NICHT geraten.
- INVARIANTEN (nicht brechen):
  (i) Das Timeout darf den Analytics-Persist NICHT verhindern. after(persist) wird registriert,
      BEVOR der getimeoutete Forward awaited wird -> ein Abort-Throw kann die Persist-Registrierung
      nie überspringen. Auch bei Meta-Abbruch landet die source='server'-Zeile (Analytics beobachtet
      das Event unabhängig davon, ob Meta es empfängt).
  (ii) 204-CONTAINMENT (die schärfere Invariante): Der Forward bleibt fire-and-log — ein Abbruch
      inkl. Timeout wird sanitized geloggt, der Client bekommt IMMER eine leere 204, nie einen Body
      oder 500. WICHTIG: das AbortController-MUSTER wird aus src/lib/vercel/client.ts gespiegelt
      (Mechanik, try/finally-Clear), aber die UMSCHLIESSUNG wird an den Ingest-Vertrag ANGEPASST,
      NICHT wörtlich übernommen. Der Vercel-Client DARF einen Setup-Fehler propagieren; der Ingest
      darf das NIE. Die gesamte Timeout-Scaffolding muss so sitzen, dass KEIN neuer Fehlerpfad (auch
      nicht das Timeout-Gerüst selbst) das fire-and-log-Containment verlässt und die garantierte 204
      in eine 500 kippt.
  (iii) /api/capi-Alias + Parity unangetastet — beide Routen re-exportieren denselben handleIngest,
      die Härtung wirkt auf beide; der Parity-Test bleibt grün.
- DISKRIMINIERENDER TEST: hängender fetch (gemockt) -> Forward bricht bei 3s ab, wird mit einem
  ECHTEN Fehlernamen geloggt (nicht "unknown"), der Persist läuft TROTZDEM, der Client bekommt
  TROTZDEM 204. Wird an jeder der vier Achsen bei Regression rot.
- COMMIT-TRENNUNG (empfohlen, zwei Commits): erst refactor (errorName-Util extrahieren, persist.ts
  umverdrahtet, isoliert grün verifizierbar), dann feat (3s-Timeout auf den Meta-Forward + ingest.ts
  nutzt das Util). "Ein Commit erzählt eine Sache".
