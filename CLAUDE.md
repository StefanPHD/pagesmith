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
      über geteilte-eventID-Vergleich ECHTER Events. (war A/B-Testing) — Scheibe 1
      (Persistenz-Fundament) LIVE in Produktion bewiesen (events via after() neben
      CAPI-Forward, source='server'), ebenso die nachgelagerte CAPI-Härtung (3s-Timeout +
      errorName-Util). Scheibe 2 (PageView-Tracking) KOMPLETT & live bewiesen (2b-0 server-
      autoritative trackingKey-Spalte + 2b-1 server-injizierter PageView-Emitter). Scheibe 3
      (Read-Pfad-Fundament) KOMPLETT & live bewiesen (owner-SELECT-RLS + get_event_counts +
      Statistik-Sektion; tenant-isolierte Anzeige gegengeprobt). Das FUNDAMENT steht: Erfassen ->
      tenant-isolierte Anzeige ist als rundes Feature funktionsfähig. Ist-Stand:
      "## Aktueller DB-/Analytics-Stand"; volle Herleitung: docs/claude-history/phase-8-analytics.md.
      Phase 8 bleibt OFFEN für Erweiterungen (eigene Scheiben): Adblocker-Verlustrate, Uniques,
      Charts/Zeiträume, CAPI-Einbettung server-vereinheitlichen + Launch-Härtung.
- [ ] Phase 9 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 8)
- [ ] Phase 10 — AI-Native: Pagesmith MCP-Server. (Detail unter Zukunfts-Vision, war Phase 9)


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
- SCHEIBE 2 (PageView) — KILL-SWITCH WIRD DORT PFLICHT-ARBEIT (Trigger: Meta-Entkopplung):
  Die Meta-Entkopplung, der EXPLIZITE Kill-Switch-Zweig (projectId && !blocked) und das
  blocked-Feld im Resolver werden in Scheibe 2 PFLICHT. Grund: heute (Couple-minimal) hängt
  der Persist IM if(capiConfig)-Zweig, wodurch der Kill-Switch AUTOMATISCH greift (gesperrt
  -> Resolver liefert null -> kein capiConfig -> kein Persist). Wer in Scheibe 2 entkoppelt,
  OHNE den expliziten blocked-Zweig zu bauen, macht den Kill-Switch STILL fail-open — der
  Schutz verschwindet lautlos, weil er heute ein Nebeneffekt der Kopplung ist und keine
  eigene Verzweigung. AUSGANGSPUNKT für Scheibe 2 ist damit: Persist im capiConfig-Zweig,
  source='server', KEIN blocked-Feld im Resolver.
  -> 2a ABGESCHLOSSEN (expliziter Kill-Switch live bewiesen); die Entkopplung wird mit dem
  PageView-Emitter in 2b scharf. S. "Aktiver Stand — Phase 8 Scheibe 2a".

## Aktueller DB-/Analytics-Stand (Ist-Zustand, kein Konzept)
Was der nächste Migrations-/Analytics-Schritt als Ausgangslage in der Root findet. Nur
Ist-Zustand — Herleitung und Entscheidungen: docs/claude-history/phase-8-analytics.md.

- LETZTE MIGRATION: 0011. Tabelle public.events existiert und ist in der DB verifiziert:
  id uuid PK (default gen_random_uuid), project_id uuid FK -> projects ON DELETE CASCADE
  (+ Index events_project_id_idx), event_type text, event_id text (KEIN unique, KEIN Index),
  source text NOT NULL (KEIN Default), created_at timestamptz default now();
  CHECK events_event_type_max_len (length(event_type) <= 64); alle Spalten NOT NULL.
- RLS auf events: aktiviert, KEINE Policy — das ist TRANSIENT (nur service_role schreibt,
  über den Ingest-Pfad). Die owner-SELECT-Policy folgt in der Dashboard-Read-Scheibe. NICHT
  dauerhaft policy-los wie audit_logs (dort echtes Append-Only). Der Supabase-Linter-Hinweis
  "RLS Enabled No Policy" ist hier erwartet und vorübergehend. -> wird in Scheibe 3 (Read-Pfad)
  mit der owner-SELECT-Policy aufgelöst.
- AUFGESCHOBEN (konditionale Optimierung, kein Footgun): CAPI-Forward auf Hintergrund-
  Zustellung umstellen (die 204 löst sich von Metas Latenz) — Trigger: falls Beacon-Latenz je
  ein echtes Problem wird. Detail: docs/claude-history/phase-8-analytics.md.

## Aktiver Stand — Phase 8 Scheibe 2a (Handler-Umbau für PageView, ABGESCHLOSSEN)
Erste Hälfte von Scheibe 2 (PageView). ABGESCHLOSSEN — live bewiesen (2026-07-20). 2a war der
sicherheitskritische Handler-Umbau, ISOLIERT und gegen UNVERÄNDERTE Conversions verifiziert.
Der Client-PageView-Emitter + Session-Dedup kommen in 2b (s. OFFEN -> 2b am Ende). Volle
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
- OFFEN -> 2b: 2b ist neu geschnitten in 2b-0 (trackingKey-Identität pro Projekt in
  server-autoritativer Spalte, Meta-entkoppelt — Vor-Scheibe; s. "## Aktiver Stand — Phase 8
  Scheibe 2b-0") + 2b-1 (server-autoritative Einbettung aus projects.tracking_key +
  build-zeit-UNgegateter PageView-Emitter; in-memory
  ephemere Session-ID (KEIN sessionStorage — Artefakt-Storage-Regel); Migration 0012 (additive
  NULLABLE Spalte session_key, client-untrusted, längenbegrenzt); Verschärfung des
  Struktur-Guards um session_key; PageView-Persist-Live-Test).

## Aktiver Stand — Phase 8 Scheibe 2b-0 (trackingKey pro Projekt in server-autoritativer Spalte, Meta-entkoppelt, ABGESCHLOSSEN — live bewiesen (2026-07-22))
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
- OFFEN -> 2b-1: server-autoritative Einbettung (der Server injiziert tracking_key aus der Spalte beim
  Publish; die client-seitige settings-Einbettung wird abgelöst) + build-zeit-ungegateter
  PageView-Emitter + stabile per-Load-eventID (in-memory) + sende '__ps_pageview'. -> IN UMSETZUNG als
  Scheibe 2b-1, s. "Aktiver Stand — Phase 8 Scheibe 2b-1".

## Aktiver Stand — Phase 8 Scheibe 2b-1 (PageView-Emitter server-injiziert, ABGESCHLOSSEN — live bewiesen (2026-07-22). Scheibe 2 komplett.)
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

## Aktiver Stand — Phase 8 Scheibe A (Adblocker-Bestätigungs-Signal, Konzept festgezurrt, Bau als Nächstes)
Erste Hälfte der Adblocker-Verlustrate — DER Marquee-Metrik (beweist das Produktversprechen in einer
Zahl). Scheibe A liefert nur das SIGNAL; Rate + UI-Kachel sind Scheibe B. Löst endlich den in
Scheibe 1 reservierten, nie genutzten source='browser'-Token ein.

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
- OFFEN -> SCHEIBE B (Rate + Kachel): RPC-Aggregation, VERANKERT AUF DEN SERVER-ZEILEN (Nenner =
  Server-Events, dazu per event_id prüfen ob eine Browser-Zeile existiert; NICHT andersherum — ein
  verwaister Confirm würde die Rate sonst verfälschen). CONVERSION-FILTER PFLICHT: analytics-only
  Events müssen raus, sonst dominieren PageViews die Rate (~95%+ Falsch-Verlust). PRÄFIX-basiert statt
  namentlich: left(event_type,5) <> '__ps_' (deckt künftige __ps_-Tokens automatisch ab; NICHT
  unescapt "not like '__ps_%'" — '_' ist LIKE-Wildcard). BESTANDSDATEN-SKEW: selbstheilend — nur
  Events zählen, die JÜNGER sind als die erste Bestätigung DIESES Projekts (kein hardcodiertes Datum);
  solange keine existiert, zeigt das UI einen neutralen Status ("Warte auf erste Bestätigung"), keine
  0%/100%-Zahl. LABELING: die Zahl ist ein MINDESTWERT ("mindestens X% wären verloren gegangen") — JS-
  Fehler/schneller Bounce zählen auch als Verlust; ein Dashboard darf nicht mehr behaupten als es misst.
  NEBENEIGENSCHAFT (gewollt): blockt ein aggressiver Blocker auch unseren /api/e, entsteht WEDER
  Server-Zeile NOCH Confirm -> das Event fällt aus Zähler UND Nenner, verfälscht die Rate also nicht.
  Die Rate gilt "über die Events, die wir überhaupt gesehen haben".

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
  sicherstellen, dass Server-Logs keine IPs horten. BINDET-AN: Phase 8. — Präzisierung:
  Phase 8 Scheibe 1 löst die 30-Tage-Pflicht NICHT aus (es wird KEIN IP/UA persistiert); sie
  bindet erst an die Scheibe, die IP/UA einführt (Bot-Filter/Uniques). Heute NICHT fällig.
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
- INGEST-204-CONTAINMENT (Sicherheitsregel, nicht bloß Defensive): /api/e bzw. handleIngest
  antwortet dem Client IMMER mit einer LEEREN 204 — nie ein Body, nie ein 500 — in JEDEM
  Pfad, auch bei Timeout/Abort/Body-Read-Fehler. GRUND (ohne ihn wird die Regel als
  "unnötig defensiv" wegoptimiert): ein 500 oder ein Body würde den Gültigkeitszustand des
  trackingKeys LEAKEN; 204-für-alles macht die Key-Existenz für einen anonymen Aufrufer
  unbeobachtbar (Enumeration-Schutz). Jede neue Fehlerbehandlung im Forward-/Ingest-Pfad
  MUSS innerhalb dieses Containments bleiben — auch das Fehler-Gerüst selbst (Timeout-
  Scaffolding, Body-Reads) darf nie nach außen werfen.
- TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL: der source-Wert in events beschreibt, WO ein
  Event beobachtet wurde (server vs. browser), NICHT an welches Werbe-Netzwerk es ging.
  'server' heißt server-beobachtet — egal ob der Forward zu Meta/CAPI oder später zu
  GA4/TikTok läuft. Ein späteres Tracking-ZIEL bekommt eine EIGENE additive Spalte; source
  NIE zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Verlustraten-Join.
  Die Werte sind PERMANENT (sie werden nie nachträglich transformiert) -> sie müssen ab
  Zeile 1 stimmen.
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
- DB-FUNKTIONEN + SEARCH_PATH (Advisor-Regel): Neue DB-Funktionen bekommen
  `set search_path = public` (fixiert die Namensauflösung; Supabase-Advisor "Function Search
  Path Mutable" flaggt sie sonst). Body zusätzlich voll qualifizieren (public.tabelle). Gilt
  für SECURITY INVOKER wie DEFINER.
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
- docs/claude-history/phase-8-analytics.md — Phase 8 Scheibe 1 (Analytics-Persistenz-
  Fundament) + CAPI-Härtung (3s-Timeout + errorName-Util): volle Herleitung, Entscheidungen,
  Tests, Live-Verifikation. Der aktive Ist-Stand steht in der Root
  ("## Aktueller DB-/Analytics-Stand"), nicht hier.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 10 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
