# Pagesmith — Projektgedächtnis

## Vision (Was wir bauen)
Eine schlanke Hosting- & Integrations-Plattform, maßgeschneidert für High-Level
Performance-Marketer (DACH-Raum & international).
KI-Tools (Claude, v0, Bolt) erzeugen hübsches, aber "stummes" HTML/CSS/JS.
Pagesmith macht diesen Code funktional: Buttons/Forms werden per "Click & Connect"
mit echten Aktionen (Stripe, PayPal, Form-Webhook, Meta/Google-Events) verdrahtet,
serverseitig getrackt (CAPI, adblocker-resistent) und mit 1 Klick auf eigener Domain
live geschaltet. Kernversprechen: ultraschnelles reines HTML statt WordPress-Ballast,
Server-Side-Tracking, federleichtes A/B-Testing.

Zielnutzer: Media Buyer, die wöchentlich neue Domains für Rapid Testing kaufen.

## Modus
Solo-Entwickler, "Build in Public" auf GitHub. Passion-Projekt in freien Stunden.
Lean MVP: kleinste nutzbare Schritte, Infrastruktur so spät wie möglich.
Jeder Schritt soll demobar / screenshot-tauglich sein.

## Tech-Stack
- Next.js (App Router) + TypeScript + Turbopack. Lokal: Node v24.16.0.
- Tailwind CSS
- Erkennung im Browser: nativer DOMParser (keine Dependency)
- Code-Transformation: clientseitig via DOMParser (wie Detection); Cheerio erst in
  der Serving-Schicht beim Hosting (Phase 7), nicht früher
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3
- Hosting/Deploy-Orchestrierung: Vercel/Netlify API — ab Phase 7

## Roadmap & aktueller Stand
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: Drei-Zonen-Workspace, postMessage-Klick-Brücke,
      bidirektionales Highlighting. Siehe Detail-Block unten.
- [x] Phase 3 — Persistenz & Auth (Supabase): stabile Element-IDs, E-Mail/Passwort-
      Auth, Code-Persistenz, Multi-Projekt-Verwaltung. Fundament steht. Siehe
      Detail-Block unten. Advanced Features (Consent-Gate, DTR) folgen danach.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: die "Click & Connect"-Wertschöpfung —
      Aktionen zuweisen/konfigurieren/speichern (Redirect) und verwaiste Mappings
      sichtbar machen/löschen/neu-verknüpfen. Siehe Detail-Blöcke unten.
- [x] Phase 4 — Code-Generierung + HTML-Export: generateFunctional bäckt die
      Mappings in funktionales HTML (reine Engine + funktionale Vorschau), Ausgabe
      per Download/Copy. Client-seitig via DOMParser; Cheerio erst in der
      Serving-Schicht (Phase 7), nicht hier. Siehe Detail-Blöcke unten.
- [x] Phase 4.5 — Editor-Politur: (A) Datei-Upload/Drag-Drop als zweiter
      Import-Weg neben Copy-Paste und (B) Zen-Modus — der Collapse versteckt NUR
      die Code-EINGABE (Textarea + Upload), die Elementliste bleibt IMMER sichtbar.
      Reiner lokaler UI-View-State, KEIN Daten-/Mapping-Zustand, berührt
      dirty-Tracking nicht. ABGESCHLOSSEN (live getestet, inkl. Politur). Siehe
      Detail-Block unten.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN (live). Textdetektion +
      Override in Preview, Edit UND Export (Scheibe 1 + 1b + 2) sowie Text-Live-Patch
      im Edit-Modus ohne Reload-Sprung (Scheibe 3). Type-diskriminiertes
      Mapping-Modell ein zweites Mal bestätigt.
- [x] Phase 6 — Server-Side Tracking (CAPI): KOMPLETT (Mechanik). Type-diskriminiertes
      Mapping -> Mehr-Aktion -> echtes Meta-Pixel (consent-sauber) -> Secret-Storage
      (service_role + heiligstes Gate) -> CAPI-Route -> Dedup-Beacon. Offener
      End-to-End-Dedup-Sichtbarkeitstest auf verknüpfter Domain -> Phase 7.
- [x] Phase 7 — Hosting & Go-Live: ABGESCHLOSSEN.
      Alle Scheiben (7a Serving, 7b First-Party-Ingest, 7c-1 Middleware-Inversion +
      Custom-Domain-Serving, 7c-2a Wildcard-Infra (publayer.net), 7c-2b Add-Domain-
      Mutation, 7c-2c DNS-Anweisungs-UX + Domain entfernen) LIVE VERIFIZIERT — zuletzt
      bestätigt durch einen echten Produktions-Smoke: test.thrty.store wurde über
      die deployte Produktions-URL (pagesmith-delta.vercel.app, NICHT localhost)
      hinzugefügt und ist dort als "Live" bestätigt — beweist, dass
      VERCEL_API_TOKEN/VERCEL_PROJECT_ID auch in Vercels eigener Serverless-Runtime
      funktionieren, nicht nur lokal. Vollständiges Detail (inkl. 7c-2-Familie):
      docs/claude-history/phase-7-hosting.md. (war Phase 6)
- [ ] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
      (Traffic-Gesundheit, ROI/Attribution, Betreiber-Metriken) + Adblocker-Verlustrate
      über geteilte-eventID-Vergleich ECHTER Events. Detail-Sektion unten. (war A/B-Testing) — Scheibe 1 (Persistenz-Fundament) LIVE in Produktion bewiesen (events via after() neben CAPI-Forward, source='server', eventID-Match Events Manager/DB, Kill-Switch-Gegenprobe), s. Aktiver-Stand-Sektion.
- [ ] Phase 9 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 8)
- [ ] Phase 10 — AI-Native: Pagesmith MCP-Server. (Detail unter Zukunfts-Vision, war Phase 9)


## Aktiver Stand — Phase 8 Scheibe 1 (Analytics-Persistenz-Fundament, ABGESCHLOSSEN)
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

## Aktiver Stand — CAPI-Härtung (Timeout + errorName, Konzept festgezurrt, Bau als Nächstes)
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

## Offene Punkte (aktive TODOs mit Trigger — nicht in ein Abschluss-Archiv)
Kurz gehaltene Sammelstelle für Dinge, die HEUTE noch nicht beißen, aber zu einem
benennbaren Zeitpunkt zwingend erledigt sein müssen. Kein Backlog-Ersatz (aufgeschobene
Aufräumarbeiten: docs/claude-history/backlog-polish.md) — hier steht nur, was sonst STILL
kaputtgeht.

- isAppHost-PLATZHALTER (Trigger: Brand-Domain-Kauf): isAppHost trägt pagesmith.app als
  PLATZHALTER. Sobald eine echte Brand-Domain feststeht, MUSS sie in EINEM überlegten Schritt
  in die isAppHost-Allowlist (+ NEXT_PUBLIC_APP_URL + Doku) — sonst landet die eigene App auf
  ihrer eigenen Domain im SERVING-Zweig und 404t. In Prod heute harmlos (nur *.vercel.app ist
  relevant), aber vor dem Brand-Domain-Livegang nicht vergessen.
- HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung): Vercel Hobby deckelt bei 50 Custom-
  Domains PRO PROJEKT — geteilt über ALLE Kunden, also eine Multi-Tenant-Decke, nicht ein
  Per-Kunde-Limit. Der Per-User-Cap (Richtwert 3/User) schützt sie doppelt (Abuse + geteilte
  Decke). Pro-Upgrade VOR echter Skalierung einplanen.

## Code-Qualität, Performance & SaaS-Skalierung
Zwei bewusst GETRENNTE Blöcke. A gilt ab sofort und ist prüfbar — jede neue Query,
Policy und jeder externe Call wird daran gemessen. B sind Skalierungs-Leitplanken für
Features, die es HEUTE NICHT GIBT; sie sind NICHT bindend und der Code wird NICHT auf
sie hin vorgebaut (kein Ballast, kein spekulativer Infrastruktur-Aufbau). Jede B-Regel
trägt eine explizite TRIGGER-Bedingung — erst wenn die eintritt, wird die Regel scharf
und wandert (dann als geprüfte Entscheidung) nach A. So bleibt das Manifest ehrlich:
keine Statusänderung für etwas, das noch nicht existiert.

### A) Heute verbindlich (prüfbar, gilt ab sofort)
- DATENZUGRIFF: Ausschließlich über den Supabase-JS-Client (PostgREST/HTTP). Keine
  direkte PostgreSQL-Verbindung, kein ORM (Prisma/Drizzle etc.) ohne explizite
  Rücksprache — der Stack läuft heute bewusst rein über den HTTP-Layer.
- KEIN SELECT *: nur die für die Business-Logik nötigen Spalten abrufen (bereits
  gelebte Disziplin, siehe resolve.ts-Resolver-Muster — hier bestätigt, nicht neu).
- KEIN N+1: keine Schleifen mit Einzel-Query pro Element; Joins/gebündelte Queries
  nutzen.
- PROAKTIVE INDIZES: bei jeder neuen Tabelle/Spalte, die in WHERE/ORDER BY/Matching
  verwendet wird, direkt einen passenden Index vorschlagen (Präzedenzfall: partial
  unique index auf domains.custom_host).
- RLS-PRÄZISION (korrigierte Regel, NICHT "O(1) Policies" — das ist keine sinnvolle
  Metrik): auth.uid() in Policies IMMER als (select auth.uid()) wrappen, damit Postgres
  es einmal statt pro Zeile auswertet. Keine tiefen Joins/Subqueries in Policies.
  security definer NUR mit expliziter Einzelfall-Begründung vorschlagen (umgeht RLS,
  ist bei Fehlgebrauch selbst ein Sicherheitsloch) — NIEMALS als Standardempfehlung.
- DEFENSIVE TIMEOUTS: JEDER externe API-Call (Meta CAPI heute, Vercel-Domains-API in
  7c-2b) braucht ein striktes Timeout, damit ein hängender Drittanbieter die
  Serverless-Funktion nicht blockiert.
- /API/E-SCHLANKHEIT (der reale Hotspot, NICHT CSV/Bulk): /api/e wird von JEDEM
  Besucher JEDER Kundenseite getroffen — jeder zusätzliche synchrone Call dort
  multipliziert sich mit dem Traffic ALLER Kunden zusammen. PRÄZISE Regel (bewusst
  KEIN pauschales "Drittanbieter nie synchron", das würde die Dedup-Garantie
  gefährden): die Beacon-Antwort an den Client darf NICHT auf den Meta-Call warten,
  aber der CAPI-Call selbst muss zuverlässig zugestellt werden.
- RATE-LIMITING: siehe Security Manifest Tier 1 (Per-Tenant-Limiting /api/e+/api/capi)
  — hier nur Cross-Link, keine Duplikation.
- AUDIT-LOGS: siehe Security Manifest (Vercel-Domain-Mutations-Log) — hier nur
  Cross-Link, keine Duplikation.

### B) Skalierungs-Leitplanken für SPÄTER (NICHT bindend, kein Code heute danach ausrichten)
- BULK-/CSV-STREAMING (Presigned Uploads, zeilenweise Verarbeitung, keine Volllast in
  RAM): Pagesmith hat heute KEINEN Bulk-Import/Export-Pfad. TRIGGER: sobald das
  Lead-Enrichment-Modul (Zukunfts-Roadmap) real umgesetzt wird.
- QUEUE-TOOLS / ASYNC-INFRASTRUKTUR (Inngest, Upstash, Database-Webhooks, Edge
  Functions für Hintergrundarbeit): heute existiert EIN async-Kandidat (CAPI), der
  bewusst so gebaut ist, wie er ist. TRIGGER: sobald ein ZWEITER unabhängiger
  Async-Anwendungsfall entsteht — keine Infrastruktur auf Verdacht bauen.
- REALTIME/WEBSOCKET-DISZIPLIN (RLS-gefilterte Subscriptions, aggregierte statt
  Event-per-Row-Pushes): Pagesmith hat heute KEIN Live-Dashboard-Feature. TRIGGER:
  sobald ein Realtime-/Live-Dashboard-Feature geplant wird.

## Security Manifest & Launch Blocker (Tier-Übersicht)
EINE Wahrheitsquelle für Launch-Blocker; sequenziert nach dem Moment, in dem das Risiko
real BEISST (nicht alles ist P0). Kompakt: pro Item Tragende Kontrolle + BINDET-AN.
Voll (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item):
docs/claude-history/security-manifest-full.md.

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH (höchste Prio): GEBAUT, LIVE VERIFIZIERT. Projektbasierte Sperre
  (projects.blocked_at; domains.blocked_at additiv vorbereitet + im Serve-Check schon
  mitgeprüft, operativ noch nicht gesetzt), FAIL-CLOSED, 451 + statische Erklärseite im
  Serve-Pfad, Ingest-Stop in /api/e (früher Verwurf VOR Token-Lookup, spart die
  Token-Query). Migration 0008, Serve-Resolver auf ServeResult-Union (ok/blocked/notfound).
  LIVE-SMOKE VOLLSTÄNDIG BESTANDEN (4/4): (1) 451-Anzeige bei Sperre, kein Content;
  (2) Isolation — paralleles ungesperrtes Projekt blieb durchgehend 200; (3) Ingest-Stop
  ECHT bewiesen: identischer Request/Format gegen gesperrtes vs. entsperrtes Projekt ergab
  in BEIDEN Fällen HTTP 204 (bewusst gleich, kein Leak), aber nur im entsperrten Fall
  erschien das Event im Meta Events Manager (eventID-Abgleich bestätigt), im gesperrten
  Fall NICHTS; (4) Reversibilität nach Entsperren bestätigt. BINDET-AN: Serving existiert
  (7a/7c-1) -> erledigt, vor erstem Fremd-Traffic.
- KILL-SWITCH — LEKTION (Manifest, nicht nur Chat): identischer HTTP-Status bei /api/e ist
  HIER bewusstes Sicherheitsdesign (Sperre von "unbekannter Key" nicht unterscheidbar),
  KEIN Testfehler. Verifikation dieses Pfades MUSS über die NACHGELAGERTE Wirkung laufen
  (Meta Events Manager: kommt etwas an oder nicht), NICHT über den Statuscode allein — ein
  curl-Status-Vergleich beweist hier nichts. (Zusatz: ein 400 an /api/e beweist ebenfalls
  nichts über die Sperre — die Pflichtfeld-Validierung {trackingKey,eventID,event} greift
  VOR dem blocked_at-Check; falsche Feldnamen ergeben immer 400, sperr-unabhängig.)
- KILL-SWITCH — SQL-RUNBOOK (im Ernstfall auffindbar; bewusst hier in der Root-Doku statt
  in separater Datei, da CLAUDE.md jede Session geladen wird). Sperren:
  ```sql
  -- per project_id
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = '<PROJECT_UUID>' and blocked_at is null;
  -- per Label (publayer.net-Subdomain)
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = (select project_id from public.domains where label = '<LABEL>') and blocked_at is null;
  -- per Custom-Host
  update public.projects set blocked_at = now(), blocked_reason = 'abuse report: <ref>'
  where id = (select project_id from public.domains where custom_host = '<HOST>') and blocked_at is null;
  ```
  Entsperren:
  ```sql
  update public.projects set blocked_at = null, blocked_reason = null where id = '<PROJECT_UUID>';
  ```
  Alle gesperrten Projekte auflisten:
  ```sql
  select p.id, p.name, p.blocked_at, p.blocked_reason,
         array_agg(d.label)       filter (where d.label is not null)       as labels,
         array_agg(d.custom_host) filter (where d.custom_host is not null) as custom_hosts
  from public.projects p left join public.domains d on d.project_id = p.id
  where p.blocked_at is not null group by p.id order by p.blocked_at desc;
  ```
- KILL-SWITCH — OFFENER PUNKT (unverändert aktuell): ABUSE-KONTAKTADRESSE
  (NEXT_PUBLIC_ABUSE_CONTACT) bleibt bewusst LEER, bis publayer.net MX-Records hat -> die
  Kontaktzeile der 451-Seite entfällt bis dahin (getrimmt). Beim Live-Gang befüllen (bindet
  an den ABUSE-KANAL-Blocker unten).
- LOGGING-LEAK: struktureller Fix — Token gar nicht erst als Server-Action-Argument
  loggen (nicht nur maskieren). BINDET-AN: seit 2a; vor Prod-Logging mit echten Tokens.
- E-MAIL-BESTÄTIGUNG wieder aktiv: Double-Opt-in in Supabase Auth (Dashboard-Toggle).
  BINDET-AN: öffentlicher Launch.
- KOSTEN-CIRCUIT-BREAKER: harter Spend-Cap + Alarm auf Vercel & Supabase (Plattform-
  Budget, nicht App-Logik). BINDET-AN: bevor eine Domain öffentlich Traffic zieht.
- ABUSE-KANAL + security.txt: /.well-known/security.txt (RFC 9116) auf beiden Origins +
  überwachtes Abuse-Postfach. BINDET-AN: Go-Live der Hosting-Schicht.
- SUBPROZESSOR-DPAs + Kunden-DPA: Vercel/Supabase-DPAs signiert + signierbarer Kunden-DPA
  (AVV-Generator ist Post-Launch-Feature, kein Blocker). BINDET-AN: öffentlicher Launch
  mit echten Kundendaten.

### Tier 1 — Vor echtem Ad-Traffic / Spend (nicht vor dem ersten Login)
- PER-TENANT-RATE-LIMITING /api/e + /api/capi: Limit pro trackingKey/Projekt, auf ABUSE
  kalibriert (nicht auf Erfolg — sonst fallen echte Conversions weg). BINDET-AN: vor
  echtem Ad-Traffic auf gehostete Seiten.
- LOGIN-BRUTE-FORCE: Rate-Limit auf IP + E-Mail (zuerst Supabase-Built-in prüfen).
  BINDET-AN: sobald Accounts echte Assets (Tokens/Domains) haben.
- SAFE-BROWSING: Redirect-ZIEL-URLs gegen Safe Browsing prüfen + pgsm.site-Flag
  überwachen (KEIN HTML-Content-Scan, Kategoriefehler). BINDET-AN: Fremd-Content live.
- SHARED-REPUTATION pgsm.site: Kill-Switch zur Isolierung + riskante Nutzer auf
  Custom-Domains (eigener eTLD+1) schieben. BINDET-AN: Multi-Tenant-Serving live;
  mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION: Supabase-HaveIBeenPwned-Abgleich (Pro-gated). BINDET-AN:
  öffentlicher Launch / Pro-Tier.
- ENCRYPTION-AT-REST CAPI-Token: tragend bleibt Isolation + RLS-SELECT-Sperre +
  service_role-only (Token physisch write-only); Verschlüsselung nur Defense-in-Depth
  (In-DB-Key = Theater, echtes Envelope braucht KMS). BINDET-AN: Härtung nach Launch.
- VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG: Token minimal scopen + jede
  Domain-Mutation mit Actor + Zeit protokollieren. BINDET-AN: 7c-2.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- DEPENDABOT: jetzt anschalten (gratis; optional Snyk). BINDET-AN: laufend.
- BACKUPS + Restore-Drill: Backup-Tier bestätigen + EINEN echten Restore-Drill fahren.
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
- DATA-RETENTION: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren; heute nur
  sicherstellen, dass Server-Logs keine IPs horten. BINDET-AN: Phase 8.
- MCP-SICHERHEIT: scoped Tokens (nie globale Master-Rechte) + lückenloses Audit-Logging
  aller KI-induzierten Mutationen. BINDET-AN: Phase 10.

## Projektstruktur
- src/app/         Next.js App Router (Pages, API-Routes)
- src/components/   React-Komponenten
- src/lib/         Logik ohne UI (Detection, später Transformation, Clients)

## Code-Konventionen
- TypeScript strikt, keine `any` ohne guten Grund.
- Reine Logik (Detection, Mapping-Transformation) gehört in src/lib/ und ist
  unit-testbar, getrennt von den React-Komponenten.
- Client-Komponenten nur wo nötig ("use client"), sonst Server-Komponenten.
- Aussagekräftige, kleine Commits — Build-in-Public, der Verlauf wird gelesen.

## UX- & Design-Prinzipien (gelten bei JEDER Iteration)
- Dünnes, aber echtes Design-Fundament: Design-Tokens (kleine Palette, ein
  Font-Pairing, eine Spacing-Skala) statt Default-Tailwind-Look.
- Wiederverwendbare Primitive (Button, Panel, Badge) statt copy-paste-Styles.
- Konsistenz vor Verzierung. Keine vorzeitige Politur (Animationen, Onboarding,
  Dark-Mode) bevor der Kern-Loop steht.
- UX-Aufwand fließt ins HERZ des Produkts: "Click & Connect" muss sich direkt,
  sichtbar und fehlertolerant anfühlen.
- Marketer-Mindset: Geschwindigkeit und "1 Klick" über Konfig-Tiefe.

## Immer beachten
- CODE-REVIEWER-SUBAGENT: .claude/agents/code-reviewer.md — rein lesend/prüfend
  (Read/Grep/Glob + scoped Bash für tsc/lint/test/build, KEIN Schreiben/Committen),
  proaktiv nach Änderungen an Server-Actions, Supabase-Migrationen, Domain-/Hosting-
  Code (src/lib/hosting, src/lib/domains, src/lib/vercel) oder Tracking-Code
  (src/lib/capi) einsetzbar. Trägt unsere real aufgetretenen Fehlerklassen als feste
  Checkliste (Ownership-Gates, "use server"-Typ-Exporte, {data,error}-Destrukturierung,
  echte PKs statt angenommenem "id", DNS-Werte nie hardcoden, isAppHost-Änderungen,
  Klick-Wiring/auxclick, Status-vs-Wirkung-Tests). SYNCHRONISIERT SICH SELBST: liest
  bei jedem Review zuerst diese "Immer beachten"-Sektion und flaggt eigenständig
  ([SUGGESTION] Synchronisations-Hinweis), falls eine neue Lektion hier fehlt, die
  noch nicht in seiner Checkliste steht — KEIN manuelles Nachziehen bei jeder neuen
  Zeile hier nötig, außer bei einer echten gemeldeten Lücke.
- Erst der nutzbare Kern, dann Infrastruktur.
- Importierter User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts",
  niemals allow-same-origin), nie ungesandboxt.
- HISTORIE-CHECK VOR EINGRIFF IN KERN-DATEIEN (Regressions-Schutz, gilt bei JEDEM Plan): CLAUDE.md ist
  bewusst gekürzt; das WARUM abgeschlossener Phasen liegt in docs/claude-history/*. Wenn ein Plan eine
  BESTEHENDE Kern-/geteilte Datei modifiziert oder erweitert (z.B. ingest.ts, resolve.ts, host.ts,
  app-serve/route.ts, generate.ts, domain-actions.ts, die Middleware/Proxy-Schicht), gilt VOR dem
  Bauen:
  (1) CODE-FIRST, HISTORY-FOR-WHY: Wahrheitsanker ist immer der AKTUELLE echte Code der berührten
      Datei (History kann veralten) — zuerst den echten Code lesen. Die passende History-Datei wird
      NUR zusätzlich gelesen, um das WARUM zu klären (die Invariante, die der Code allein nicht
      verrät). GEZIELT die thematisch passende Datei, NICHT die ganze Historie (das würde das Kürzen
      der CLAUDE.md ad absurdum führen).
  (2) INVARIANTE NENNEN, NICHT ZUSAMMENFASSEN: Der Plan benennt die konkrete geschützte Regel
      explizit (z.B. "/api/capi-Alias bleibt bestehen, Persist hängt nur daneben"), statt die Doku
      allgemein zu referieren — nur so ist der Check sichtbar und prüfbar.
  (3) ADDITIV-VS-INVASIV-DEKLARATION: Der Plan erklärt PRO berührter Kern-Datei ausdrücklich, ob der
      Eingriff rein additiv ist oder bestehende Pfade angreift. Bei invasivem Eingriff: Begründung,
      warum das etablierte, getestete Verhalten erhalten bleibt.
  (4) SCOPE DER REGEL: greift NUR bei Eingriff in bestehende Kern-/geteilte Dateien, nicht bei jeder
      trivialen neuen Datei. Erste Verteidigungslinie bleibt diese "Immer beachten"-Sektion (immer
      geladen); die History ist die zweite, tiefere Linie fürs WARUM.
  Verweis auf die Archiv-Landkarte: die Zuordnung Thema -> History-Datei steht unter
  "## Detail-Archiv".
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits in freier
  Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL fest eingebacken
  und beaconen weiter dorthin. Neue Exporte/gehostete Seiten nutzen /api/e (geteilter
  Handler, lib/capi/ingest.ts). Entfernen der capi-Route bricht STILL das Tracking aller
  schon ausgelieferten Kundenseiten (kein Fehler, nur verschwundene Conversions).
- CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR (real aufgetreten, 2026-07-20): Ein
  CAPI-Zugriffstoken ist an eine bestimmte Meta-Dataset/Pixel-ID gebunden. Wird die ID
  gewechselt, MUSS ein zur neuen ID passendes Token neu generiert und gesetzt werden — das
  alte Token wird gegen die neue ID nicht mehr korrekt signiert. Symptom eines Mismatch:
  der Server-Forward scheitert mit code=190 / OAuthException / "Bad signature", WÄHREND die
  Browser-Pixel-Events unbeeinträchtigt weiterlaufen (der Browser-Pixel braucht kein Token).
  Das ist ein STILLER Fehlzustand: nichts schlägt sichtbar Alarm, weil Browser-Events
  durchkommen. VERIFIKATION daher IMMER über "Empfangen von: Server" im Events Manager
  (idealerweise als dedupliziertes Server-Event unter geteilter eventID), NIE über die bloße
  Anwesenheit von Browser-Events. Das describeMetaError-Ops-Logging im ingest.ts-Forward-
  Fehlerpfad macht solche Ablehnungen sofort lesbar (code/subcode/type/fbtrace/msg,
  sanitized). Hinweis: Das Token liegt in der DB (setCapiToken-Flow), nicht in einer
  Env-Var -> Token-Wechsel wirkt sofort, ohne Redeploy.
- KLICK-WIRING vs. Maustasten (Lektion, Phase-4-Bugfix): 'click' deckt NUR die linke
  Maustaste ab. Mittelklick feuert 'auxclick' (eigenes, separates Event), Rechtsklick
  ebenso -> bei JEDEM neuen Click-Wiring-Feature explizit prüfen, ob Mittelklick/Touch-
  Äquivalente mitbehandelt werden müssen (und bei auxclick event.button===1 gegen Rechtsklick-
  Ghost-Conversions guarden). Details: docs/claude-history/phase-4-mapping-codegen-export.md.
- "USE SERVER"-DATEIEN (Lektion, Phase-7c-2c-Bug): Next.js erlaubt in Dateien mit
  "use server" AUSSCHLIESSLICH async-Function-Exporte — kein Typ, kein Interface, keine
  Konstante darf ungeschützt mitexportiert werden. Jeder Typ-Import/-Export in einer
  solchen Datei MUSS import type/export type sein, sonst versucht der Server-Actions-
  Compiler, einen zur Laufzeit gelöschten Typnamen als Wert aufzulösen -> ReferenceError
  "X is not defined" beim Serverstart. Bei JEDER neuen Server-Action-Datei explizit prüfen.
- POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL (Lektion, 7c-2-Bug): JEDE Supabase/PostgREST-
  Query IMMER { data, error } destrukturieren, NIE nur { data } — sonst wird ein Fehler
  still verschluckt und die UI zeigt eine leere Liste statt einer Fehlermeldung. Und: vor
  der Nutzung eines Feldnamens den ECHTEN Primärschlüssel der Zieltabelle in der Migration
  nachsehen, nie aus dem Feldnamen "id" annehmen — der PK der domains-Tabelle ist label,
  NICHT id. Beides zusammen erzeugte den Bug: eine nicht-existente Spalte -> PostgREST-42703
  -> verschluckt -> still leere Liste.
- NEXT_PUBLIC_-REDEPLOY-PFLICHT (Ops-Regel, real aufgetreten): NEXT_PUBLIC_-Env-Vars werden
  zur BUILD-ZEIT ins Client-Bundle inlined -> die Variable in Vercel zu ändern reicht NICHT,
  nach JEDER Änderung ist ein REDEPLOY PFLICHT. Sonst trägt das laufende Bundle still den
  alten Wert, OHNE Fehlermeldung. Server-only Env-Vars vor der ersten Prod-Nutzung im
  Vercel-Dashboard setzen (sie sind nicht build-zeit-gebunden, fehlen aber sonst zur Laufzeit).
- HOST-QUELLE FÜR APP-vs-SERVING-BRANCHING (Sicherheit): x-forwarded-host ist die Quelle,
  empirisch auf einem echten Vercel-Preview als vertrauenswürdig BEWIESEN (Vercels Edge
  überschreibt einen client-gefälschten x-forwarded-host mit dem echten Host — die Doku
  schwieg dazu, also getestet statt angenommen). Daraus folgt die allgemeine Regel: NIEMALS
  einen client-kontrollierten Host ungeprüft für Auth- oder Host-Branching nutzen.
  Vollbeweis: docs/claude-history/phase-7-hosting.md.
- Vor neuer Phase: kurz bestätigen, dass die vorige demobar lief.
- Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung (was
  genau im Browser zu prüfen ist) — nicht nur Pipeline-grün. Die Pipeline beweist
  die Logik; den Produktanspruch beweist nur der Live-Blick. Ein CLAUDE.md-
  'erledigt'-Eintrag wird erst nach bestätigtem Live-Test geschrieben.
- Session-unabhängige Mutationen (MCP-Vorbereitung, kostenlos ab jetzt): Jede neue
  Server-Mutation als REINE Funktion (userId, params) bauen — Autorisierung
  (Ownership-Prüfung) DAVOR, Geschäftslogik DAHINTER, sauber getrennt (wie setCapiToken
  es bereits fast tut). So kann die spätere MCP-Schicht (Phase 10) dieselbe geprüfte Logik
  wiederverwenden, mit MCP-Autorisierung als ANDEREM Eingang zur GLEICHEN Funktion. Kein
  jetziger Bau, nur Baustil — verbessert den Code ohnehin (Testbarkeit, Trennung von
  Auth und Logik).
- ABLEITEN STATT HARDCODEN (Werte mit einer Quelle): Was aus Env/Config/API-Antwort
  ableitbar ist, wird NIE hardcodiert — hardcodierte Werte brechen STILL bei
  Umgebungswechsel. Real aufgetreten: der hardcodierte Serving-Suffix erzeugte auf der neuen
  Serving-Domain lautlose 404er (extractLabel=null -> falscher Dispatch). Beispiele:
  Serving-Suffixe aus NEXT_PUBLIC_HOSTING_DOMAIN ableiten, DNS-Werte (CNAME/A) aus der
  Vercel-Config-Antwort pro Domain lesen (sie sind projektspezifisch), Endpunkt-/Feldnamen
  gegen die AKTUELLE Anbieter-Doku prüfen statt aus dem Gedächtnis zu setzen.
- ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State): Jeder View-State, der ein
  Projekt-Attribut spiegelt (uploadError, capiTokenSet, Publish-Status/Live-URL, ...),
  muss beim Projektladen am kanonischen Chokepoint aus dem GELADENEN Projekt ABGELEITET
  werden — nicht nur bei Bedarf gelöscht. Dreimal aufgetreten (uploadError -> capiTokenSet
  -> Publish-State). "Löschen" ist die schwächere Regel: sie zeigt einen "war schon mal
  an"-Zustand (z.B. bereits publiziertes Projekt) fälschlich als aus. Ableiten aus der
  Wahrheitsquelle (settings.hosting / settings.capi.tokenSet / ...) ist korrekt für beide
  Fälle. Beim Publish-Leak zusätzlich sicherheitsrelevant: falscher "veröffentlicht"-
  Zustand könnte Ad-Budget auf die falsche URL lenken.
- NAHT-HYGIENE (7c-2, aktiv): 7c-2 koppelt Domain-/Routing-Logik NICHT an Tracking-/
  Lead-Logik. Die Andock-Punkte für spätere Module existieren BEREITS (neutraler
  /api/e-Trichter, projekt-scoped Settings); "nahtloses Andocken" folgt aus sauberen
  Nähten + additiver Disziplin, NICHT aus spekulativem Vorbau. KEINE Webhook-Interfaces/
  Schema-Erweiterungen ohne realen Konsumenten + Spec. Kontext:
  docs/claude-history/future-roadmap.md.

## Detail-Archiv (bei Bedarf lesen — NICHT automatisch geladen)
Abgeschlossene Phasen-Historie + Vollbegründungen sind ausgelagert, damit CLAUDE.md unter
dem 150k-Ladelimit bleibt (jede Session lädt nur diese Root-Datei). Reine Pfad-Verweise,
KEIN @-Import. Bei Arbeit an einem Thema die passende Datei gezielt lesen:
- docs/claude-history/phase-2-3-foundation.md — Phase 2 (Click & Connect) + Phase 3
  (Persistenz/Auth, stabile ps-IDs, Multi-Projekt, DB-Härtung 0003).
- docs/claude-history/phase-4-mapping-codegen-export.md — Mapping-/Action-Zuweisung +
  Weg-C-Netz (Orphans anzeigen/löschen/Re-Link) + Code-Gen-Engine + HTML-Export.
- docs/claude-history/phase-4.5-editor-politur.md — Datei-Upload/Drag-Drop + Zen-Modus
  + A11y-Politur.
- docs/claude-history/phase-5-copywriting.md — In-Place Copywriting (Text-Mapping,
  Live-Patch PS_SET_TEXT, direkt-in-DOM-Export, revert-Lektion).
- docs/claude-history/phase-6-capi.md — Server-Side Tracking / Meta-CAPI (Scheiben
  0–2b-ii, Secret-Storage, Dedup-Beacon, alle Debug-Lektionen).
- docs/claude-history/phase-7-hosting.md — Hosting/Go-Live: 7a/7b + 7c-Konzept + 7c-1
  + XFH-Gate-Vollbeweis + die KOMPLETTE 7c-2-Familie (2a Wildcard-Infra, 2b Add-Domain-
  Mutation, 2c DNS-Anweisungs-UX, Entfernen). DORT stehen auch die Hosting-Ops-Details, die
  bewusst NICHT in der Root liegen: Registrierungs-Rate-Limit (5/Stunde/User),
  Support-Playbooks für CAA-Records und Metas Traffic-Permissions-Allow-List, die
  Vercel-Fehler-Mappings (409 domain_already_in_use -> Heilung) und das
  Verification-vs-Configuration-Statusmodell. Bei Domain-/DNS-Support-Fragen zuerst hier
  nachsehen.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 10 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
