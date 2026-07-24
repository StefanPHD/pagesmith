# Phase 8 — Analytics & CAPI-Härtung (ausgelagerte Historie)

Volle Herleitung, Entscheidungen, Tests und Live-Verifikation der GEBAUTEN Phase-8-Arbeit,
aus der Root-CLAUDE.md ausgelagert. Umfang (chronologisch): Scheibe 1 (Persistenz-Fundament) +
CAPI-Härtung, dann die Scheiben 2a, 2b-0, 2b-1 (PageView-Tracking), 3 (Read-Pfad/Dashboard-Counts),
A + B (Adblocker-Verlustrate) — alle ABGESCHLOSSEN und live bewiesen (zuletzt Scheibe B, 2026-07-23).
Die Scheiben 2a–B wurden am 2026-07-24 hierher ausgelagert (s. eigene Zwischenüberschrift weiter unten).

Der aktive Ist-Stand (Migrationsstand, events-Schema, Policies, RPCs, Indizes, aufgeschobene
Optimierungen) steht WEITERHIN in der Root unter "## Aktueller DB-/Analytics-Stand"; die dauerhaft
geltenden Regeln (source = Beobachtungs-ORT, Ingest-204-Containment, Kill-Switch als expliziter
Zweig, isForwardable, BEACON-keepalive, "NUR server-seitig erfasst", kein Server-HTML-Parsing, …)
unter "## Immer beachten" bzw. "## Code-Qualität …". Diese Datei trägt die BEGRÜNDUNG dazu, nicht
den aktuellen Zustand.

Noch NICHT gebaut (Phase-8-Erweiterungen, s. Roadmap-Zeile in der Root): Uniques, Charts/Zeiträume,
CAPI-Einbettung server-vereinheitlichen, Launch-Härtung. ROI/Attribution + weitere Vision:
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
    [NACHTRAG 2026-07-24: beides eingelöst durch Scheibe B — die query-zeitliche Dedup läuft in der
    RPC get_adblock_loss (mengenbasiert über die geteilte event_id), der Index kam als
    events_project_event_idx (project_id, event_id). Migration 0015, live bewiesen 2026-07-23, fc46172.]
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

## Phase 8 Scheiben 2a–B — Bau- und Verifikations-Doku (aus CLAUDE.md ausgelagert 2026-07-24)
Die folgenden sechs Abschnitte (2a, 2b-0, 2b-1, 3, A, B) standen bis 2026-07-24 als "## Aktiver
Stand — Phase 8 …"-Sektionen in der Root-CLAUDE.md und wurden nach Abschluss von Phase 8 (Scheibe B
live bewiesen) hierher ausgelagert. Sie tragen die zeitgenössische Begründung/Verifikation; der
aktuelle Ist-Zustand steht in der Root ("## Aktueller DB-/Analytics-Stand"), die dauerhaft
geltenden Regeln unter "## Immer beachten" bzw. "## Code-Qualität …". Jeder Abschnitt trägt einen
STATUS-NACHTRAG mit Datum + Commit-Hash.

## Aktiver Stand — Phase 8 Scheibe 2a (Handler-Umbau für PageView, ABGESCHLOSSEN)
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-20), deployt 4153fac. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Erste Hälfte von Scheibe 2 (PageView). ABGESCHLOSSEN — live bewiesen (2026-07-20). 2a war der
sicherheitskritische Handler-Umbau, ISOLIERT und gegen UNVERÄNDERTE Conversions verifiziert.
Der Client-PageView-Emitter + Session-Dedup kommen in 2b (s. DANACH -> 2b am Ende dieses Abschnitts). Volle
Vision: docs/claude-history/future-roadmap.md.

- ZWECK: Löst den Scheibe-2-Vorgriff aus "## Offene Punkte" ein. Heute (Couple-minimal) hängt
  der Persist IM if(capiConfig)-Zweig -> der Kill-Switch greift AUTOMATISCH (gesperrt ->
  Resolver liefert null -> kein Persist). Sobald PageView (2b) AUSSERHALB dieses Zweigs
  persistiert, verschwindet dieser automatische Schutz. 2a baut den EXPLIZITEN Ersatz, BEVOR
  2b-Traffic von ihm abhängt.
- SCOPE (EINE Verantwortung): reiner Handler-Umbau in ingest.ts + Resolver-Erweiterung in
  token.ts. KEINE Migration, KEIN Client-Code, KEIN session_key (alles 2b).
- RESOLVER (token.ts, ADDITIV): getCapiConfigByTrackingKey liefert wieder
  { projectId, blocked, capiConfig }. Das blocked-Feld wurde in Couple-minimal bewusst
  weggelassen; blocked_at wird im Lookup ohnehin schon selektiert -> KEINE zweite Query.
- HANDLER-KONTROLLFLUSS (ingest.ts) nach 2a, in dieser Reihenfolge:
  1. resolve(trackingKey) -> { projectId, blocked, capiConfig }
  2. if (!projectId) return 204 — unbekannter Key, wie heute (Key-Gültigkeit unbeobachtbar).
  3. if (blocked) return 204 — EXPLIZITER Kill-Switch als eigener SICHTBARER Zweig, VOR
     Persist UND Forward. Nicht länger ein Nebeneffekt der Config-Kopplung; fail-closed.
  4. STRUKTUR-GUARD — BEREITS ERFÜLLT, KEIN eigener Bauschritt in 2a (Korrektur am Code
     verifiziert): der Pflichtfeld-Check {trackingKey,eventID,event} sitzt in ingest.ts
     SCHON VOR der Resolution und antwortet mit 400, ohne jeden DB-Zugriff — also FRÜHER
     und STRENGER als hier ursprünglich geplant (204 nach dem Kill-Switch). Er bleibt
     unverändert. Das 400 ist KEIN Widerspruch zum 204-Containment: ein strukturell
     kaputter Beacon ist ein CLIENT-Fehler, während das Containment vor einem Zustands-LEAK
     bei GÜLTIGER Struktur, aber ungültigem/gesperrtem Key schützt — zwei verschiedene
     Achsen. Bewusst MINIMAL: nur STRUKTURELLE Gültigkeit, KEIN Bot-Anspruch (ein Bot-Filter
     bräuchte IP/UA -> eigene Scheibe mit eigener Retention-Pflicht). Die
     session_key-Verschärfung folgt in 2b.
  5. ENTKOPPELTER PERSIST: after(persist(projectId, event_type, event_id, source='server'))
     — unabhängig von capiConfig. In 2a fließen faktisch weiter NUR Conversions durch (der
     PageView-Emitter existiert erst in 2b); die Entkopplung ist hier die vorbereitete, in 2b
     scharf werdende Struktur. Sie ist aber gegen Conversions LIVE prüfbar: der Persist
     passiert jetzt auch dann, wenn er vorher im capiConfig-Zweig hing — mit identischem
     Ergebnis für Meta-Projekte.
  6. FORWARD NUR FÜR CONVERSIONS: if (capiConfig && isForwardable(event_type)) -> forward(...)
     BYTE-IDENTISCH inkl. 3s-Timeout. isForwardable ist NEU und schließt PageView (2b) vom
     Forward aus (ein PageView gehört in unsere Analytics, nicht als Conversion zu Meta).
     RESERVIERTER TOKEN (am Code belegt, NICHT "PageView"): isForwardable schließt AUSSCHLIESSLICH
     den namespaced Token '__ps_pageview' aus, den NUR unser eigener 2b-Emitter erzeugt.
     BEGRÜNDUNG: TrackConfig.event ist ein FREIER Nutzer-String (src/lib/mappings.ts), und über
     trackCustom ist JEDER Name erlaubt — die Menge der Conversion-Namen ist UNBESCHRÄNKT.
     Daraus folgt zweierlei: (a) eine Positiv-Allowlist ist ausgeschlossen, sie schnitte
     Custom-Events STILL vom Forward ab (Invariante i); (b) auch ein naiver Negativ-Ausschluss
     event !== "PageView" ist unsicher — ein Marketer kann "PageView" heute schon als legitimes
     Custom-Event angelegt haben, dessen Forward dann lautlos stirbe. Der reservierte Token ist
     praktisch nicht versehentlich eintippbar und löst beides.
     ENTSCHEIDUNG GEGEN eine separate Wire-Achse (eigenes Forward-Flag im Beacon-Blob): kein
     Vorbau. Der Ausschluss betrifft in 2a exakt EINEN Wert aus unserem eigenen Emitter. Eine
     eigene Achse entsteht erst, falls je MEHRERE analytics-only-Event-Typen existieren — dann
     additiv und mit realem Konsumenten, genau wie source es vorgemacht hat.
     FOLGE-VERMERK (Anzeige-Detail, KEIN Bug): event_type in events trägt damit '__ps_pageview'.
     Das spätere Dashboard braucht ein Anzeige-Mapping ('__ps_pageview' -> "PageView"); das
     gehört in die Dashboard-Scheibe, nicht hierher.
  7. return 204 — immer leer, 204-Containment unverändert.
- GESCHÜTZTE INVARIANTEN:
  (i) CAPI-FORWARD BYTE-IDENTISCH für bestehende Conversions: isForwardable MUSS für ALLE
      heutigen Conversion-Event-Namen weiterhin true liefern. Ein zu breiter Ausschluss bricht
      STILL das gerade erst reparierte CAPI-Tracking (s. Token/ID-Lektion in "Immer beachten")
      — kein Fehler, nur verschwundene Conversions. -> diskriminierender Test MIT Gegenprobe.
  (ii) 204-CONTAINMENT unverändert: jeder Pfad endet in einer leeren 204; auch das
      Fehler-Gerüst wirft nie nach außen.
  (iii) /api/capi-Alias + Parity unberührt (beide Routen re-exportieren denselben Handler).
  (iv) Kill-Switch bleibt fail-closed — jetzt als EXPLIZITER Zweig statt als Nebeneffekt.
- TEST-INVERSIONS-AUFLAGE (zwei Bestandstests ändern sich BEWUSST): Beide waren Schutzzäune um
  die ALTE Kopplung und werden INVERTIERT, NICHT gelöscht:
  - token.test.ts "gesperrtes Projekt liefert NULL, nicht nur capiConfig null" -> künftig
    "gesperrt -> { projectId, blocked:true, capiConfig:null }". Der FRÜHE Return bleibt: die
    project_tokens-Query läuft bei gesperrtem Projekt weiterhin NICHT (bestehender Test dazu
    bleibt unverändert grün), nur der Rückgabewert ändert sich.
  - ingest.persist.test.ts (c) "capiConfig null -> WEDER Forward NOCH Persist" -> künftig
    "capiConfig null UND nicht blocked -> Persist JA, Forward NEIN" (beweist die Entkopplung).
  AUFLAGE: Jeder der beiden Umschriebe wird beim Bau EINZELN begründet — nämlich damit, dass
  der Schutz an eine SICHTBARERE Stelle wandert (expliziter blocked-Zweig im Handler). Ohne
  diese Begründung wäre es Testanpassung-bis-grün statt dokumentierter Architekturwechsel, und
  genau das ist bei einem Kill-Switch die gefährlichste Form von Regression.
- DEMOBAR / LIVE-TEST (2a, gegen UNVERÄNDERTE Conversions): (a) Meta-Projekt: eine Conversion
  erscheint weiter im Events Manager als SERVER-Event UND erzeugt weiter eine
  source='server'-Zeile -> Forward und entkoppelter Persist beide intakt; (b) gesperrtes
  Projekt (blocked_at gesetzt): KEINE Zeile, KEIN Forward -> der explizite Kill-Switch greift.
  PageView selbst ist in 2a NOCH NICHT testbar (es gibt keinen Emitter) — das ist gewollt und
  der Grund für den 2a/2b-Schnitt.
- VERIFIZIERT (live, 2026-07-20): Die "erledigt"-Schwelle war hier bewusst ein NICHT-EREIGNIS
  — für Conversions durfte sich NICHTS ändern. Genau das wurde geprüft:
  - CONVERSIONS UNVERÄNDERT (Events Manager, geteilte eventID): ein Kauf erschien weiter als
    Browser- UND dedupliziertes Server-Event -> isForwardable lässt Bestands-Conversion-Namen
    durch, der Forward ist byte-identisch. Zusätzlich entstand weiter eine
    source='server'-Zeile -> der entkoppelte Persist ist intakt.
  - KILL-SWITCH BEIDSEITIG SCHARF (gesperrtes Projekt): Server-Forward gestoppt (kein
    Server-Event mehr im Events Manager) UND kein Persist (keine neue events-Zeile per SQL) —
    und zwar bei WEITERLAUFENDEM Browser-Pixel-Event: der Browser-Pixel ist client-seitig und
    vom Kill-Switch bewusst unberührt. Das ist exakt die Stelle, an der ein fail-open säße,
    wenn der Persist beim Entkoppeln OHNE expliziten blocked-Zweig herausgezogen worden wäre.
  - RUHE: /api/e durchweg 204, keine AbortError-/rejected-Zeilen im Normalbetrieb.
  - HINWEIS für spätere Verifikationen: events.created_at ist UTC, Events-Manager- und
    Vercel-Zeiten sind lokal -> beim Abgleich den Versatz mitrechnen (hier 2h). Ein
    scheinbar "fehlendes" Event ist oft nur ein Zeitzonen-Artefakt.
- DANACH -> 2b (eingelöst): 2b ist neu geschnitten in 2b-0 (trackingKey-Identität pro Projekt in
  server-autoritativer Spalte, Meta-entkoppelt — Vor-Scheibe; s. Abschnitt "Scheibe 2b-0" in
  dieser Datei) + 2b-1 (server-autoritative Einbettung aus projects.tracking_key +
  build-zeit-UNgegateter PageView-Emitter; in-memory
  ephemere Session-ID (KEIN sessionStorage — Artefakt-Storage-Regel); Migration 0012 (additive
  NULLABLE Spalte session_key, client-untrusted, längenbegrenzt); Verschärfung des
  Struktur-Guards um session_key; PageView-Persist-Live-Test).

## Aktiver Stand — Phase 8 Scheibe 2b-0 (trackingKey pro Projekt in server-autoritativer Spalte, Meta-entkoppelt, ABGESCHLOSSEN — live bewiesen (2026-07-22))
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-22), deployt 8d92f2a. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Vor-Scheibe zu 2b-1 (PageView-Emitter). ABGESCHLOSSEN — deployt (8d92f2a), Migration 0012 gelaufen
(Backfill: 5 CAPI-Projekte), live bewiesen. Grund (Stufe-1-Befund): der Emitter braucht einen einbettbaren
trackingKey, aber der ist heute DOPPELT Meta-gegatet — er entsteht nur in setCapiToken (actions.ts:230)
und wird nur bei hasPixel ins HTML gebacken (generate.ts:69,74). Ein Meta-loses Projekt hätte nichts zu
senden. 2b-0 entkoppelt die IDENTITÄT von Meta — und macht sie server-autoritativ PERSISTENT.

- ZWECK: unverändert (2b-1-Emitter braucht einen einbettbaren, Meta-unabhängigen trackingKey) — PLUS:
  die Identität muss server-autoritativ PERSISTENT sein, nicht nur einmal geschrieben.
- WARUM SPALTE STATT settings (LEKTION, nicht verlieren): Die erste 2b-0-Variante legte den Key in
  settings.capi.trackingKey. LIVE WIDERLEGT: projects.settings ist CLIENT-autoritativ — saveProject
  überschreibt es wortlos (actions.ts:131). publishProject schreibt settings zwar korrekt, gibt den Key
  aber NICHT zurück (actions.ts:435) -> der Client spiegelt ihn nicht (CodeImporter.tsx:688-693) -> der
  nächste saveProject kippt projects.settings->capi->>trackingKey zurück auf NULL. Ursache: eine
  server-eigene Identität in einem client-besessenen Blob. Deshalb: eigene server-autoritative Spalte.
- SCOPE (2b-0 = AUFLÖSUNGS-Seite): Migration 0012 — Spalte projects.tracking_key (nullable) + EINMALIGER
  BACKFILL aus settings.capi.trackingKey; Resolver token.ts liest künftig die Spalte. NUR die Auflösung;
  die server-autoritative EINBETTUNG ist 2b-1.
- BACKFILL: additiv, kopiert bestehende Keys 1:1 in die neue Spalte, settings BLEIBT unberührt (nicht
  transformiert). UPDATE ... SET tracking_key = settings->'capi'->>'trackingKey' WHERE tracking_key IS
  NULL AND settings->'capi'->>'trackingKey' IS NOT NULL. Der Resolver liest danach NUR die Spalte (kein
  Dual-Read).
- ERZEUGUNG: ensureTrackingKey (idempotent, ||) schreibt in die SPALTE. publishProject stellt die Spalte
  lazy sicher (rein bei Publish). setCapiToken schreibt BEIDES: die Spalte (Auflösungs-Autorität) UND
  weiter settings.capi.trackingKey (heutige Client-Einbettung, UNVERÄNDERT).
- UNIQUE: partial-unique auf tracking_key (WHERE tracking_key IS NOT NULL) erwägen — erzwingt "löst zu
  genau EINEM Projekt auf". Stufe 1 prüft, dass KEIN Bestand-Duplikat existiert (sonst schlägt die
  Migration laut fehl = gewünscht).
- CAPI-INVARIANTE (schärfste, nicht brechen): backfillter Spaltenwert == settings-Wert -> die
  CAPI-Auflösung über die Spalte liefert IDENTISCH; der setCapiToken-settings-Schreibpfad bleibt
  unverändert -> die CAPI-Client-Einbettung ist byte-gleich. Der reparierte CAPI-Pfad bleibt grün
  (Conversion löst auf + forwardet).
- WEITERE INVARIANTEN: (i) bestehende Keys NIE neu gewürfelt/verändert; (ii) settings.capi.trackingKey
  bleibt für die heutige Client-Einbettung (bis 2b-1 sie server-seitig ablöst); (iii) generate.ts/
  meta.ts/HTML-Output unverändert in 2b-0.
- RESOLVER-ÄNDERUNG (bewusst, NICHT byte-identisch): token.ts .eq("settings->capi->>trackingKey", key)
  -> .eq("tracking_key", key). Ergebnis für Bestand identisch (Backfill).
- DEMOBAR / LIVE-TEST (2b-0): (a) BUG-BEWEIS: Meta-loses Projekt publishen -> tracking_key-Spalte
  gesetzt; DANACH einen saveProject auslösen -> Spalte BLEIBT gesetzt (vorher: NULL nach Save). (b)
  CAPI-Projekt: Conversion löst weiter auf + erscheint als Server-Event im Events Manager; tracking_key
  == settings-Wert.
- VERIFIZIERT (live, 2026-07-22):
  - DURABILITY (der Bug, GEMESSEN): dasselbe Projekt — tracking_key VOR Publish NULL, NACH Publish eine
    UUID; nach anschließender Projekt-Änderung + saveProject bleibt tracking_key UNVERÄNDERT gesetzt. Die
    settings-Variante wäre hier auf NULL gekippt (server-Key im client-besessenen Blob) — die eigene
    Spalte überlebt den ganzheitlichen settings-Replace von saveProject.
  - BACKFILL GEGRIFFEN: count(*) where tracking_key is not null == 5 (= Zahl der CAPI-Projekte);
    Meta-lose Projekte bleiben NULL; settings blieb unangetastet.
  - CAPI-NICHTBRUCH: Projekt mit echtem Meta-Token — Pixel-Load + Purchase-Requests (200) + /e-Beacon
    (204) laufen weiter (DevTools-Network verifiziert); der Resolver findet über die Spalte, backfillter
    Wert == settings-Wert. Reparierter CAPI-Pfad grün.
  - METHODEN-VERMERK: Der Durability-Beweis ist GEMESSEN (publish -> save -> Spalte bleibt), NICHT aus
    dem Code abgeleitet — das schließt die Ehrlichkeitslücke, dass die verworfene settings-Variante nie
    live brach (sie war strukturell widerlegt, aber die neue Variante ist jetzt am realen publish->save
    positiv bewiesen).
- DANACH -> 2b-1 (eingelöst): server-autoritative Einbettung (der Server injiziert tracking_key aus der Spalte beim
  Publish; die client-seitige settings-Einbettung wird abgelöst) + build-zeit-ungegateter
  PageView-Emitter + stabile per-Load-eventID (in-memory) + sende '__ps_pageview'. -> umgesetzt als
  Scheibe 2b-1, s. Abschnitt "Scheibe 2b-1" in dieser Datei.

## Aktiver Stand — Phase 8 Scheibe 2b-1 (PageView-Emitter server-injiziert, ABGESCHLOSSEN — live bewiesen (2026-07-22). Scheibe 2 komplett.)
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-22), deployt 7f551e3. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Finale von Scheibe 2 — ABGESCHLOSSEN, deployt (7f551e3), live bewiesen. 2b-0 machte die trackingKey-
Identität server-autoritativ + save-fest (Auflösungs-Seite); 2b-1 bettet sie ein und setzt den Emitter
drauf -> PageView wird ERSTMALS sichtbar, und der explizite Kill-Switch aus 2a wird erstmals von
Meta-unabhängigem Traffic ausgeübt (wofür er gebaut wurde). Damit ist Scheibe 2 (PageView-Tracking) komplett.

- UMFANG (Entscheidung: MINIMAL): NUR der PageView-Emitter wird server-injiziert. Die CAPI-Beacon-
  Einbettung BLEIBT client-seitig aus settings (funktioniert, reparierter Pfad; für CAPI-Projekte ist
  settings==Spalte via 2b-0-Dual-Write, kein Divergenz-Risiko). CAPI-Einbettung server-seitig zu
  vereinheitlichen ist eine spätere eigene Scheibe.
- HERZ — SERVER-INJEKTION beim Publish: publishProject stellt tracking_key sicher (2b-0) und injiziert
  DANACH, bevor published_content gespeichert wird, ein <script id="__ps_pve"> mit dem Emitter ins HTML.
  Der trackingKey kommt aus der SPALTE (server-autoritativ), nicht aus settings. Das löst zugleich den
  früher von CC geflaggten Ordering-Bug (Client generierte HTML, bevor der Server den Key vergab) — die
  Injektion passiert NACH der Key-Sicherung, im HTML, das gleich gespeichert wird. Und es funktioniert
  für Meta-lose Projekte (Client hätte den Key in settings gar nicht).
- INJEKTION = REINE STRING-OP, KEIN PARSING (kein Cheerio — CLAUDE.md-Regel): letztes </body>
  (case-insensitiv) per String-Suche, Script davor einfügen; fehlt </body>, ans HTML-Ende anhängen.
- IDEMPOTENZ AUS DEM DATENFLUSS, NICHT AUS BEREINIGUNG: published_content.html entsteht bei JEDEM Publish
  FRISCH aus dem Client-functionalHtml (der den Emitter nie enthält — er ist server-only). Also kein
  __ps_pve im Eingangs-HTML -> nichts zu bereinigen, kein Doppel-Inject. Das id="__ps_pve" ist nur
  Diagnose-Marker, KEIN Bereinigungs-Anker. (STUFE-1-VERIFIKATION: am Code bestätigen, dass
  published_content.html pro Publish frisch aus dem Client-HTML gebaut wird und NICHT das vorige
  published_content fortschreibt — sonst käme die Doppel-Inject-Falle und wir lösen anders.)
- EMITTER (Client-JS, ins HTML gebacken):
  - window.__ps_pv HÄLT die eventID (ID = Guard): ist sie gesetzt, wurde schon gefeuert -> ein Beacon
    pro Load; echter Reload = frische ID = separat gezählt; Doppel-Include zählt einmal.
  - Die eventID wird EINMAL oben erzeugt, BEVOR sendBeacon/fetch entschieden wird (fetch-Fallback trägt
    dieselbe ID).
  - Zustellung: navigator.sendBeacon('/api/e', body); Fallback fetch('/api/e', {method:'POST',
    keepalive:true, body}) — keepalive PFLICHT (sonst Abbruch beim Verlassen der Seite).
  - RELATIVER Pfad /api/e (first-party auf der Serving-Domain, adblocker-resistent — 7b). STUFE-1-
    VERIFIKATION: bestätigen, dass der Conversion-Beacon denselben relativen /api/e nutzt (nicht absolut).
  - event = '__ps_pageview' AUS der geteilten events.ts-Konstante (kein handgetipptes Literal -> kein
    Drift zu isForwardable). Bare: {trackingKey, eventID, event}. KEIN Pfad/Referrer (Pagesmith ist
    Ein-Seiten-Tool -> Pfad redundant; Referrer/UTM = Scope-2, aufgeschoben). source='server' setzt der
    Handler.
- NICHT ANGEFASST: ingest.ts (2a persistiert '__ps_pageview' schon + schließt es vom Forward aus), die
  CAPI-Client-Einbettung, KEINE Migration. Editor-Preview unberührt (Injektion nur in published_content).
- INVARIANTEN: (i) CAPI-Pfad byte-gleich grün (nicht angefasst); (ii) kein Server-HTML-Parsing (String-
  Op); (iii) published_content bleibt gültiges HTML (Injektion bricht die Struktur nicht).
- DEMOBAR / LIVE-TEST (2b-1 — hier wird PageView ERSTMALS sichtbar):
  (a) META-LOSES Projekt neu veröffentlichen, Seite laden -> events-Zeile event='__ps_pageview',
      source='server' entsteht (der Meta-unabhängige Chain-Beweis, den 2a's Handler ermöglichte).
  (b) Reload -> zweite Zeile mit ANDERER eventID (Reload = separater View).
  (c) KRON-TEST Kill-Switch: gesperrtes Projekt (blocked_at) veröffentlichen/laden -> KEINE PageView-
      Zeile (erstes Mal, dass der explizite 2a-Kill-Switch von Meta-unabhängigem Traffic ausgeübt wird).
  (d) PageView erscheint NICHT im Meta Events Manager (analytics-only, isForwardable).
  (e) CAPI-Projekt: Conversions laufen weiter (CAPI-Einbettung unberührt) UND seine PageViews landen.
- VERIFIZIERT (live, 2026-07-22):
  - HAPPY PATH (Meta-los, GEMESSEN): Projekt ohne CAPI neu veröffentlicht -> nach Load eine events-Zeile
    event_type='__ps_pageview', source='server'; Reload -> zweite Zeile mit ANDERER event_id (per-Load-
    eventID greift). Beweist die volle Meta-unabhängige Kette: Emitter -> first-party /api/e -> 2a-Handler
    -> Persist.
  - KRON-TEST Kill-Switch (GEMESSEN): gesperrtes Projekt (Serve-Route liefert "Seite deaktiviert") ->
    nach Load KEINE neue PageView-Zeile. ERSTES Mal, dass der explizite 2a-Kill-Switch von Meta-
    unabhängigem Traffic ausgeübt wird -> hält. Bestätigt 2a's Sicherheitsarbeit unter echtem Traffic.
  - FIRST-PARTY (DevTools): /e-Ping Status 204 auf der Serving-Domain, Initiator der injizierte Emitter.
  - CAPI DANEBEN, NICHT STATT (GEMESSEN): Projekt mit Pixel/Token -> events trägt BEIDES als
    source='server': __ps_pageview UND Lead-Conversion. CAPI-Einbettung unberührt (Conversion läuft),
    PageViews landen zusätzlich.
  - PageView erscheint NICHT im Meta Events Manager (analytics-only, isForwardable).
- Nach 2b-1: Scheibe 2 komplett. Danach Kandidaten (eigene Scheiben): CAPI-Einbettung server-
  vereinheitlichen; Read-/Dashboard-Scheibe; Uniques; Aggregation/Retention/Rate-Limiting (Trigger:
  Ad-Traffic/Launch, s. Offene Punkte).

## Aktiver Stand — Phase 8 Scheibe 3 (Read-Pfad-Fundament, ABGESCHLOSSEN — live bewiesen (2026-07-22). Phase 8 (Schreiben + Lesen) als Feature funktionsfähig.)
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-22), deployt beb672b. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Erste Lese-Scheibe — ABGESCHLOSSEN, deployt (beb672b), Migration 0013 gelaufen, live bewiesen. Phase 8
baute bisher nur den Schreibpfad (events landen) — Scheibe 3 macht die Daten dem Owner sichtbar. Bewusst
MINIMAL: Counts, keine Charts. Das Herz war die RLS-Policy (erste Policy auf events überhaupt) — ein
Fehler hätte Cross-Tenant-Analytics geleakt; die tenant-isolierte Anzeige ist gegengeprobt. Damit ist
Phase 8 als rundes Feature (Erfassen -> tenant-isolierte Anzeige) funktionsfähig.

- SCOPE (MINIMAL): (a) owner-SELECT-RLS-Policy auf events; (b) server-seitige Read-Query, die pro
  Projekt Counts je event_type liefert; (c) schlichte Statistik-Sektion im bestehenden Projekt-UI.
  KEINE Charts, KEINE Zeiträume, KEINE Adblocker-Rate, KEINE Uniques (je eigene spätere Kacheln).
- RLS-POLICY (das Herz):
  - NUR FOR SELECT für den Owner. INSERT/UPDATE/DELETE bleiben ausschließlich service_role (Ingest
    unberührt). Der Owner liest, schreibt nie.
  - EXISTS statt IN: EXISTS (select 1 from projects p where p.id = events.project_id and <OWNERSHIP>).
    Korrelierter Semi-Join gegen den project_id-Index (Scheibe 1), kurzschließend.
  - (select auth.uid()) GEKAPSELT (sonst pro Zeile ausgewertet).
  - OWNERSHIP-ACHSE wird NICHT angenommen (STUFE-1-GATE, s.u.): der <OWNERSHIP>-Ausdruck spiegelt EXAKT
    die bestehende projects-Owner-RLS-Policy. Divergenz zwischen „wer darf das Projekt" und „wer darf
    die Events" WÄRE das Leak.
  - Löst die „events RLS an, KEINE Policy (transient)"-Notiz aus Scheibe 1/DB-Stand auf.
- READ-QUERY: server-seitig über den authenticated-SSR-Client (Defense-in-Depth: explizit auf Owner-
  Projekte gefiltert UND RLS als zweite Linie). Supabase-JS-Client (PostgREST), {data,error}
  destrukturiert, KEIN SELECT *, project_id-Index. Liefert {event_type, count} gruppiert.
- UI: Statistik-Sektion im bestehenden Projekt-UI, zieht Counts beim Laden. Frontend fügt sich in das
  bestehende Datenlade-Muster des Projekt-UI ein (Server Component / client-fetch — am Code ablesen,
  kein neues Muster erfinden).
- STUFE-1-GATES (VOR jeder Policy-/Query-Formulierung am echten Code zu klären):
  (1) OWNERSHIP-ACHSE: Wie prüft die bestehende projects-RLS-Policy Ownership (user_id? owner_id?
      Membership-Tabelle?)? Die events-Policy MUSS denselben Ausdruck spiegeln.
  (2) SSR-CLIENT-IDENTITÄT: Läuft der authenticated-SSR-Client (wie in publishProject/setCapiToken)
      als der eingeloggte NUTZER (JWT -> RLS greift aktiv) ODER als service_role/admin (umgeht RLS,
      manueller user_id-Filter)? Entscheidet, ob die RLS-Policy im Normalpfad AKTIV oder nur LATENT
      ist. Beides verteidigbar — aber wir müssen wissen, welches, damit „Defense-in-Depth" stimmt.
- INVARIANTEN: (i) Schreibpfad unberührt (service_role-INSERT, kein Owner-Write); (ii) kein SELECT *,
  project_id-Index genutzt; (iii) RLS-Policy präzise ((select auth.uid()) gekapselt, Ownership gespiegelt).
- DEMOBAR / LIVE-TEST (Kern = die VERWEIGERUNG, nicht nur die Erlaubnis):
  (a) Owner sieht die Counts SEINER Projekte (PageViews + Conversions) im UI.
  (b) CROSS-TENANT-GEGENPROBE (der eigentliche Beweis): Owner A darf die Events von Owner B NICHT
      sehen — zwei Projekte zweier Owner, jeder sieht nur seine Zahlen. Das ist der Test, der bei zu
      weiter Policy rot wird.
- VERIFIZIERT (live, 2026-07-22):
  - OWNER-ERLAUBNIS (UI == DB, GEMESSEN): Projekt mit Events -> Statistik-Sektion zeigt "PageViews: 1,
    Lead: 1"; die direkte SQL-Kontrolle (count(*) group by event_type) liefert identisch. Das
    Anzeige-Mapping __ps_pageview -> "PageViews" greift.
  - CROSS-TENANT-VERWEIGERUNG, ZWEIFACH GEMESSEN: (a) SQL-Editor mit fremdem JWT (sub = Nicht-Owner) ->
    get_event_counts(fremdes Projekt) = 0 rows; (b) LIVE-ZWEI-KONTEN: ein zweiter Nutzer (echtes Konto)
    sieht in seinem Projekt "Noch keine Events", nie die Zahlen des ersten Kontos. Die Policy wirkt
    unter echtem Browser-JWT, nicht nur im SQL-Editor.
  - POLICY PRÄZISE (formuliert UND wirksam): der cat des Migrations-SQL bestätigte FOR SELECT, EXISTS,
    p.user_id = (select auth.uid()) gespiegelt, SECURITY INVOKER (kein DEFINER). Migration 0013 gelaufen.
  - METHODEN-VERMERK: "formuliert" (cat des SQL) und "wirksam" (0-rows-Gegenprobe + Live-Zwei-Konten)
    sind GETRENNT bewiesen — bei einer Tenant-Isolations-Policy ist beides Pflicht; ein cat allein
    beweist nur den Wortlaut, nicht die Wirkung.
- Nach Scheibe 3: Phase 8 ist als rundes Feature (Schreiben + Lesen) funktionsfähig. Danach Kacheln
  auf diesem Fundament (Adblocker-Rate, Uniques, Charts/Zeiträume) + Launch-Härtung — eigene Scheiben.

## Aktiver Stand — Phase 8 Scheibe A (Adblocker-Bestätigungs-Signal, ABGESCHLOSSEN — live bewiesen (2026-07-23))
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-23), deployt 0280217. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Erste Hälfte der Adblocker-Verlustrate — DER Marquee-Metrik (beweist das Produktversprechen in einer
Zahl). ABGESCHLOSSEN, deployt (0280217), Migration 0014 gelaufen, live bewiesen. Scheibe A liefert nur
das SIGNAL; Rate + UI-Kachel sind Scheibe B. Löst endlich den in Scheibe 1 reservierten, nie genutzten
source='browser'-Token ein.

- MESSPRINZIP: Der Server sieht jede Conversion IMMER (first-party /api/e, adblock-resistent). Metas
  Browser-Pixel feuert nur, wenn fbevents.js NICHT geblockt wurde. Der Client bestätigt über DENSELBEN
  adblock-resistenten Kanal, ob der Pixel wirklich lief. Keine Bestätigung = dieses Event hätte Meta
  nie erreicht. Der Messkanal ist damit selbst immun — das ist der Grund, warum die Messung überhaupt
  geht.
- LEKTION / FALLE (window.fbq ist WERTLOS als Check): Metas Standard-Snippet legt SYNCHRON einen STUB
  an (fbq mit queue, loaded=true, version), BEVOR fbevents.js nachgeladen wird. Blockt der Adblocker
  das Script, bleibt der Stub stehen -> `if (window.fbq)` ist IMMER wahr -> die Verlustrate wäre
  permanent 0% -> eine Kachel, die schön aussieht und NICHTS misst ("grün aber falsch"). Ebenso
  wertlos: Meta-interne Properties (können sich ändern).
- ERKENNUNG (DOM-Ebene, versionsfest): load/error-Event des SCRIPT-ELEMENTS von fbevents.js. Das ist
  Browser-Standard, unabhängig von Metas Interna. STUFE-1-GATE: am echten buildMetaRuntime/generate.ts
  verifizieren, ob wir die Script-Erzeugung kontrolliert genug injizieren, um Handler anzuhängen
  (Metas Standard-Snippet erzeugt das Element selbst via createElement/insertBefore -> anhängbar).
  Falls das ohne Umbau der Meta-Runtime NICHT geht -> STOPP und vorlegen (Umbau des CAPI-nahen
  Meta-Runtime ist invasiv auf dem gerade reparierten Pfad).
- RENNEN LOAD-vs-CONVERSION (Genauigkeits-Frage, Stufe 1 MUSS sie lösen): Der Ladestatus ist eine
  PRO-SEITE-Tatsache, die Bestätigung aber PRO CONVERSION. Klickt jemand, BEVOR load/error aufgelöst
  ist, ist der Status 'pending'. "Im Zweifel nicht bestätigen" würde die Verlustrate NACH OBEN
  verfälschen (Über-Meldung). Plan muss die Auflösung benennen (z.B. Zustand pending|ok|blocked +
  Nachreichen der Bestätigung sobald aufgelöst) und die gewählte Ungenauigkeit ehrlich beziffern.
  BEFUND (Stufe 1, am echten Code): __psMetaInit lädt fbevents LAZY beim ersten consented Fire
  (bewusste DSGVO-Entscheidung aus Phase 6, wird NICHT angefasst). Die ERSTE Conversion einer Seite
  läuft daher fast immer im Zustand 'pending'. "Im Zweifel nicht bestätigen" ist damit NICHT der
  Randfall, sondern der NORMALFALL -> die Rate zeigte dauerhaft ~100% Verlust. Die Queue mit
  Nachreichen (pending->ok flush, pending->blocked verwerfen) ist PFLICHT, nicht Kür — sie ist der
  Kern der Scheibe.
  VERBLEIBENDE UNGENAUIGKEIT (ehrlich, alle nach OBEN verfälschend): (1) Redirect-Rennen — bei
  Conversion mit Redirect kann der gepufferte Confirm im Teardown verloren gehen (Größenordnung nur
  live messbar, gehört als Messpunkt in den Live-Test); (2) track-only ohne Redirect: genau;
  (3) zweite und folgende Conversions: exakt (Zustand aufgelöst).
- ZUSTELLUNG: navigator.sendBeacon bzw. fetch(keepalive:true) — PFLICHT. Conversions gehen oft mit
  Form-Submit/Redirect einher; ohne keepalive bricht der Browser den Request beim Seitenwechsel ab
  und die Bestätigung geht verloren -> falsch als "Verlust" gezählt.
- SERVER-MAPPING (source bleibt server-gesetzt, NIE client-frei): Der Client sendet einen ENG
  BEGRENZTEN Marker (analog zum reservierten '__ps_pageview'-Token), NICHT einen freien source-String
  — sonst könnte er die Analytics beliebig färben. Der SERVER mappt den Marker auf source='browser'.
  Achsen-Hygiene: der Client meldet eine Beobachtung, die Interpretation macht der Server. Die
  Bestätigung trägt DIESELBE eventID wie die Conversion und denselben event_type.
- SCHÄRFSTE INVARIANTE — BESTÄTIGUNGEN NIEMALS AN META FORWARDEN: Ein Confirm trägt dieselbe eventID
  wie die echte Conversion; würde er geforwardet, entstünde ein DUPLIKAT bei Meta. Der Confirm-Pfad
  persistiert und returnt, ohne je in den Forward-Block zu laufen. Liegt direkt auf dem gerade
  reparierten CAPI-Pfad -> mit Gegenprobe testen.
- SCHEMA: KEIN Schema-Change. Zwei Zeilen mit derselben event_id (eine source='server', eine
  source='browser') sind exakt das erwartete Muster — events.event_id hat BEWUSST keinen
  Unique-Constraint (Scheibe 1: "Dedup ist Query-Zeit-Sache einer späteren Zähl-Scheibe"). Das ist
  diese Scheibe; die Schema-Entscheidung von damals zahlt sich hier aus.
- MIGRATION 0014 (Spec-Korrektur aus Stufe 1 — die ursprüngliche Fassung sagte "KEINE Migration";
  die Wechselwirkung war bei Abfassung nicht bekannt): get_event_counts (0013) gruppiert
  source-UNABHÄNGIG. Sobald ein Confirm landet, zeigt die live gegangene Scheibe-3-Statistik für EINE
  Conversion "Lead: 2" — eine sichtbare Regression bestehender UI. Fix: create or replace function
  public.get_event_counts mit zusätzlichem "and e.source = 'server'" im where. Semantisch ohnehin
  richtig: die Sektion trägt das Label "Server-seitig erfasste Events" — der Filter passt exakt zur
  Beschriftung; ein Confirm ist ein Mess-Artefakt, kein zweites Event.
  ACHTUNG (sonst stille Regression): create or replace ersetzt die KOMPLETTE Definition inkl. aller
  SET-Klauseln. Die 0014 MUSS "set search_path = public" MITSCHREIBEN (gestern gehärtet, sonst kommt
  der Advisor-Befund "Function Search Path Mutable" zurück), ebenso "stable", KEIN security definer,
  gleicher Rückgabetyp. Kein Schema-Change, keine Policy-Änderung, kein Backfill.
  DEPLOY-REIHENFOLGE: 0014 im SQL-Editor VOR dem Scheibe-A-Code-Deploy (vor Confirms ist der Filter
  ein No-op -> gefahrlos; danach verhindert er die Doppelzählung ab der ersten Confirm-Zeile).
- VOLUMEN: Conversions senden künftig zwei Beacons statt einem. Conversions sind niedrigvolumig (nicht
  der PageView-Hotspot) -> akzeptabel, vermerkt.
- BLINDE FLECKEN (Stufe-1-Befunde, Scheibe B muss sie tragen):
  - FREMD-PIXEL (meta.ts:81 `if (f.fbq) return;`): Trägt das importierte Kunden-HTML bereits ein
    eigenes Meta-Snippet, bricht unser Bootstrap ab -> kein eigenes script-Element -> unsere Handler
    hängen nirgends -> Zustand bleibt ewig 'pending'. Scheibe A: Zustand 'foreign' setzen, Confirms
    unterdrücken, console.warn (diagnostizierbar statt still falsch). "Blind bestätigen" ist VERWORFEN
    — auch das Fremd-Snippet legt synchron einen Stub an, `if (f.fbq)` greift mit UND ohne Blocker;
    blind bestätigen würde einen echten Blocker verstecken. ENTWARNUNG: die selbstheilende Regel
    (Rate erst ab der ERSTEN Bestätigung dieses Projekts) fängt den schädlichen Ausgang bereits ab —
    ein Fremd-Pixel-Projekt bekommt nie eine erste Bestätigung, das UI bleibt auf "Warte auf erste
    Bestätigung" und zeigt NIE 100% Verlust. Uninformativ, aber niemals irreführend.
  - SURROGAT-BLOCKER: manche Blocker liefern statt fbevents.js ein Noop-Skript -> onload feuert,
    Confirm geht raus, Pixel ist real tot -> UNTER-Meldung. Am DOM nicht erkennbar. Folge fürs
    Scheibe-B-Labeling: die Zahl kann in BEIDE Richtungen irren, nicht nur nach oben.
  - EXPORT-DOWNLOAD: dort ist der Beacon-Kanal absolut (fremde Domain) und selbst blockbar ->
    Messung schwächer. Bestandszustand des CAPI-Beacons, kein neuer Bruch. Nur vermerkt.
- INVARIANTEN: (i) Confirm wird NIE geforwardet; (ii) source bleibt server-gesetzt (kein client-freier
  Wert); (iii) CAPI-Forward für echte Conversions byte-gleich; (iv) Kill-Switch/204-Containment
  unverändert; (v) nur Migration 0014 (Funktions-Replace, kein Schema-Change).
- DEMOBAR / LIVE-TEST (nur live führbar — ein Unit-Test kann das strukturell NICHT zeigen, dieselbe
  Lektion wie bei RLS): dieselbe Conversion zweimal auslösen:
  (a) ADBLOCKER AUS -> ZWEI events-Zeilen mit derselben event_id: source='server' UND source='browser'.
  (b) ADBLOCKER AN -> nur EINE Zeile (source='server'), keine Bestätigung.
  (c) GEGENPROBE Nie-Forwarden: im Events Manager erscheint die Conversion weiterhin GENAU EINMAL als
      Server-Event (kein Duplikat durch den Confirm).
- VERIFIZIERT (live, 2026-07-23):
  - HAPPY PATH (GEMESSEN): Conversion mit Adblocker AUS -> ZWEI events-Zeilen mit IDENTISCHER event_id
    (Lead: source='server' + source='browser'). Die Join-Achse für Scheibe B ist intakt.
  - KERNBEWEIS — ERKENNUNG UNTER ECHTEM BLOCKER (GEMESSEN): DevTools zeigt fbevents.js mit Status
    "(blocked:other)", 0.0 kB -> in der DB entsteht NUR die source='server'-Zeile, keine Bestätigung.
    Damit ist bewiesen, was strukturell KEIN Unit-Test zeigen konnte: das onerror des Script-Elements
    feuert unter einem realen Adblocker. Das war die eigentliche Erkennungsleistung der Scheibe.
  - NIE-FORWARDEN (GEMESSEN, Gegenprobe): Events Manager zeigt für die eventID GENAU EIN Server-Event
    (neben dem normalen Browser-Pixel-Event derselben ID). Kein Duplikat -> der frühe return im
    Confirm-Zweig hält unter echtem Traffic.
  - REIHENFOLGE-BEFUND (WICHTIG FÜR SCHEIBE B, GEMESSEN): die browser-Zeile traf ~25 ms VOR der
    server-Zeile ein (.375764 vs .400161; bei Meta 11:29:27 vs 11:29:29). Die Reihenfolge-Unabhängigkeit
    ist damit KEIN theoretischer Vorbehalt, sondern der REALFALL — der Confirm überholt den
    Server-Persist regelmäßig. Scheibe B MUSS rein mengenbasiert über die gemeinsame event_id
    aggregieren; eine "server zuerst"-Annahme würde an genau diesen Zeilen brechen.
  - MIGRATION 0014 (verifiziert via pg_get_functiondef): "and e.source = 'server'" im where UND
    "SET search_path TO 'public'" UND "STABLE" UND KEIN security definer — alle Klauseln haben den
    create-or-replace überlebt. Die Doppelzählung in der Scheibe-3-Statistik ist damit abgefangen.
  - EHRLICHE NOTIZ ZU TEST D (Redirect-Rennen): der Confirm kam in der Beobachtung auch bei
    Redirect-Conversions an. Das ist EINE Beobachtung, KEINE Quote. Das Rennen ist probabilistisch
    (Script-Load-Latenz vs. Navigations-Teardown) und trifft nur die enge Konstellation "erste Conversion
    einer Seite (Zustand pending) + sofortiger Redirect". "Hat nicht zugeschlagen" ist nicht "existiert
    nicht" -> die MINDESTWERT-Klausel für das Scheibe-B-Labeling bleibt bestehen.
- DANACH -> SCHEIBE B (eingelöst): Rate + Kachel, s. Abschnitt "Scheibe B" in dieser Datei.

## Aktiver Stand — Phase 8 Scheibe B (Adblocker-Verlustrate: RPC + Kachel, ABGESCHLOSSEN — live bewiesen (2026-07-23). Phase 8 komplett: Erfassen -> Anzeigen -> Marquee-Metrik.)
STATUS-NACHTRAG (2026-07-24, aus der Root-CLAUDE.md ausgelagert): ABGESCHLOSSEN & live bewiesen
(2026-07-23), deployt fc46172. Der Text unten ist die zeitgenössische Bau-/Verifikations-Doku;
Futur- und "OFFEN ->"-Aussagen sind zum Auslagerungszeitpunkt EINGELÖST, Querverweise zeigen auf
Abschnitte DIESER Datei.
Zweite Hälfte der Marquee-Metrik. ABGESCHLOSSEN, deployt, Migration 0015 gelaufen (Funktion + Index
events_project_event_idx), live bewiesen. Scheibe A liefert das Signal (source='browser'-Bestätigung,
live bewiesen); B macht daraus die Zahl, die das Produktversprechen beweist. Bewusst MINIMAL: eine
Kennzahl im bestehenden Statistik-Bereich, keine Charts, keine Zeiträume.

- AGGREGATION (EIGENE RPC, Entscheidung): eine NEUE Funktion (z.B. get_adblock_loss(p_project_id)),
  get_event_counts bleibt UNBERÜHRT. Grund: andere Filter (Präfix-Ausschluss, Stichtag) und andere
  Rückgabeform; eine Verheiratung macht beide unschärfer. Zudem ist get_event_counts gerade erst live
  bewiesen — ohne Zwang nicht anfassen. Getrennt heißt auch: die Counts-Kachel läuft weiter, selbst
  wenn die Raten-Query zickt. Pflichtklauseln wie 0013/0014: language sql, stable,
  set search_path = public, KEIN security definer (RLS des Aufrufers filtert von innen).
- NENNER AUF DEN SERVER-ZEILEN: Nenner = server-beobachtete Conversions; dazu per event_id prüfen, ob
  eine browser-Zeile existiert. NICHT andersherum — ein verwaister Confirm würde die Rate verfälschen.
- REIHENFOLGE: rein MENGENBASIERT über die gemeinsame event_id, KEINE Annahme über die
  Eintreff-Reihenfolge. MECHANIK (erklärt, nicht nur beobachtet): der Conversion-Beacon hängt im
  Handler hinter dem AWAITED Meta-Forward (bis 3s Timeout), der Persist läuft erst im after() danach;
  der Confirm nimmt den frühen return — kein Forward, kein Warten, after() schreibt sofort. Bei
  CAPI-Projekten landet 'browser' daher SYSTEMATISCH vor 'server', der Abstand ist Metas Latenz (live
  gemessen: 25 ms / 470 ms / 850 ms). Eine server-first-Logik würde also regelmäßig danebengreifen.
- CONVERSION-FILTER PFLICHT: analytics-only Events müssen raus, sonst dominieren PageViews die Rate
  (~95%+ Falsch-Verlust). PRÄFIX-basiert statt namentlich: left(event_type,5) <> '__ps_' (deckt
  künftige __ps_-Tokens automatisch ab; NICHT unescapt "not like '__ps_%'" — '_' ist LIKE-Wildcard).
- BESTANDSDATEN-SKEW (selbstheilend): nur Events zählen, die JÜNGER sind als die ERSTE Bestätigung
  DIESES Projekts (kein hardcodiertes Datum). Solange keine existiert: neutraler UI-Status
  ("Warte auf erste Bestätigung"), KEINE 0%/100%-Zahl.
- STICHTAG VERANKERT (Stufe-1-Delta, gegen das gebaut wurde): min(created_at) NUR über browser-Zeilen
  MIT server-Gegenstück (exists-Anker in der CTE), nicht über alle. GRUND: /api/e ist ein ANONYMER
  Endpunkt, der trackingKey steht öffentlich im ausgelieferten HTML. Ohne Anker setzte EIN
  geschmiedeter Confirm als früheste browser-Zeile den Stichtag, kippte ein Neutral-Status-Projekt in
  den Zahlen-Modus und ließe Bestandsdaten ohne jede Bestätigung ins Fenster -> hohe FALSCHE
  Verlustrate. Die selbstheilende Regel wäre anonym aushebelbar gewesen. Mit dem Anker sind Verwaiste
  ÜBERALL inert: Zähler, Nenner, Stichtag, Neutral-Status. Derselbe Präfix-Filter gilt auch IN der
  CTE (ein Marketer darf ein Custom-Event "__ps_pageview" nennen; dessen Bestätigung darf den
  Stichtag nicht verfrühen).
- EHRLICHE GRENZE: der Anker erschwert das Fälschen, er verhindert es nicht. Wer ZWEI Beacons mit
  derselben frei erfundenen eventID schickt (einer ohne, einer mit Bestätigungs-Marker), erzeugt eine
  VERANKERTE Bestätigung und kann Stichtag und Rate bewegen. Die Wurzel ist der anonyme Ingest selbst,
  nicht die Aggregation -> Per-Tenant-Rate-Limiting (Security-Manifest Tier 1), NICHT Scope von B.
- GRENZFALL total=0 BEI GESETZTEM STICHTAG (real erreichbar, nicht nur defensiv): der Confirm wird
  gepuffert, solange fbevents lädt; ist Metas Forward schneller als der Pixel-Load, schreibt die
  server-Zeile VOR ihrer eigenen Bestätigung. Bei genau EINER Conversion fällt sie damit aus dem
  Fenster -> Stichtag gesetzt, total=0. Das UI zeigt dann den Neutral-Status und dividiert NICHT
  (kein NaN). Zeigt zugleich, dass die Reihenfolge in BEIDE Richtungen läuft — daher die strikt
  mengenbasierte Aggregation.
- INDEX-ENTSCHEIDUNG: events_project_event_idx (project_id, event_id) additiv in 0015. Löst die
  WÖRTLICHE Scheibe-1-Vertagung ein ("Index folgt mit der Verlustraten-Join-Scheibe") — ohne ihn
  liefe die korrelierte exists-Suche pro Server-Zeile erneut über alle Zeilen des Projekts.
  events_project_id_idx bleibt unangetastet (trägt den äußeren Scan und die Policy).
- ANZEIGE (Entscheidung): Prozent PLUS Absolutwerte. WORTWAHL-REGEL (nicht verhandelbar): "N von M
  Conversions wurden NUR server-seitig erfasst" — NICHT "gerettet". "Gerettet" behauptet, Meta habe
  die Events EMPFANGEN; das steht NICHT in unseren Daten. events protokolliert, was der SERVER
  BEOBACHTET hat, nicht ob der Forward ankam — der CAPI-'Bad signature'-Bug hat live gezeigt, dass
  Forwards still scheitern können, während die Zeilen sauber weiterlaufen. Ein Dashboard, das
  "gerettet" sagt, während CAPI kaputt ist, lügt den Kunden an.
- MINDESTWERT-LABELING: die Prozentzahl als "mindestens X%" ausweisen. Sie kann in BEIDE Richtungen
  irren: nach OBEN durch das Redirect-Rennen (unbestätigte Conversion wird als Verlust gezählt) sowie
  durch JS-Fehler/schnellen Bounce (zählen ebenfalls als Verlust), nach UNTEN durch Surrogat-Blocker
  (Noop-Skript -> onload feuert -> Confirm geht raus, Pixel ist tot). Leitsatz: ein Dashboard darf
  nicht mehr behaupten, als es misst.
- BLINDE FLECKEN (aus Scheibe A, gelten weiter): Fremd-Pixel-Projekte bekommen nie eine erste
  Bestätigung -> UI bleibt dauerhaft auf "Warte auf erste Bestätigung" (uninformativ, aber NIE
  irreführend — die selbstheilende Regel fängt das ab). Export-Download-Seiten messen schwächer
  (absoluter, selbst blockbarer Kanal). NEBENEIGENSCHAFT (gewollt): blockt ein aggressiver Blocker
  auch unseren /api/e, entsteht WEDER Server-Zeile NOCH Confirm -> das Event fällt aus Zähler UND
  Nenner und verfälscht die Rate nicht. Die Rate gilt "über die Events, die wir überhaupt gesehen
  haben".
- UI: die Kennzahl in die BESTEHENDE Statistik-Sektion (CodeImporter), gleiches Lade-Muster wie
  getEventCounts. Kein neues Layout.
- INVARIANTEN: (i) get_event_counts unberührt; (ii) Schreibpfad unberührt; (iii) RLS greift auch für
  die neue RPC (SECURITY INVOKER); (iv) kein SELECT *, project_id-Index nutzen.
- DEMOBAR / LIVE-TEST: (a) Projekt mit bestätigten Conversions -> Kachel zeigt Prozent + "N von M";
  (b) GEGENPROBE gegen direktes SQL (dieselbe Rate von Hand nachgerechnet); (c) Projekt ohne
  Bestätigung -> neutraler Status, keine Zahl; (d) PageViews beeinflussen die Rate NICHT
  (Präfix-Filter greift).
- VERIFIZIERT (live, 2026-07-23):
  - KACHEL == DEPLOYTE RPC (GEMESSEN, §7.1a): select * from get_adblock_loss lieferte als Owner
    (total 3, confirmed 3, first_confirm_at 2026-07-23 09:29:29.496304+00) — identisch zur
    UI-Kachel ("mindestens 0 % — 0 von 3 Conversions wurden NUR server-seitig erfasst").
  - GROUND-TRUTH AUF STRUKTURELL ANDEREM WEG (GEMESSEN, §7.1b): unabhängige Kontroll-Query mit
    LEFT JOIN + GROUP BY statt korreliertem EXISTS (bewusst ZWEITER Rechenweg — ein Abschreiben des
    Funktionskörpers wäre eine Tautologie gewesen) lieferte identisch total 3 / confirmed 3 /
    verloren 0 / pct 0 / gleicher Stichtag. Arithmetik unabhängig bestätigt.
  - STICHTAG-KREUZPROBE ZU SCHEIBE A: first_confirm_at 09:29:29 UTC IST die live gemessene
    Scheibe-A-Bestätigung (11:29:29 lokal, 2h-Versatz) — die selbstheilende Stichtags-Regel hängt am
    echten Scheibe-A-Signal, nicht an einem Artefakt.
  - CROSS-TENANT ZWEIFACH GEMESSEN: (a) SQL-Editor mit ECHTEM Zweitkonto-JWT (sub = 4b1d1257-...) ->
    get_adblock_loss(fremdes Projekt) = (0, 0, NULL) — genau EINE Zeile, nicht "0 rows"
    (Aggregat-Semantik; die RLS leert die Eingabemenge). (b) LIVE-ZWEI-KONTEN im Browser: das
    Zweitkonto sieht nur eigene Projekte / Neutral-Status, nie die Zahlen des Hauptkontos.
    METHODEN-VERMERK: ein erster Lauf nutzte versehentlich eine Tippfehler-UUID (nicht existenter
    User) — Ergebnis ebenfalls (0,0,NULL) und als "beliebiger Nicht-Owner"-Beweis gültig, aber der
    Vermerk hier protokolliert den wiederholten Lauf mit dem ECHTEN Konto.
  - PRÄFIX-FILTER LIVE (GEMESSEN): mehrfaches Laden der veröffentlichten Seite (neue
    __ps_pageview-Zeilen) -> Kachel und Kontroll-Query unverändert (3/3/0). PageViews beeinflussen
    die Rate nicht.
  - NEUTRAL-STATUS (GEMESSEN): Projekt ohne Bestätigung zeigt "Warte auf erste Bestätigung.", keine
    Prozentzahl; RPC liefert (0, 0, NULL).
  - VERLUST-ZÄHLUNG UNTER ECHTEM BLOCKER (GEMESSEN, der Marquee-Beweis): eine Conversion mit aktivem
    Adblocker -> total 3->4, confirmed konstant 3, verloren 0->1, pct 25. Die Kennzahl misst den
    Blocker-Fall korrekt als Verlust — das Produktversprechen ist erstmals als Zahl live belegt.

