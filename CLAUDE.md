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
- Code-Transformation: clientseitig via DOMParser (wie Detection). Server-seitige
  HTML-Injektion (Serving-Schicht, Phase 7/8) ist eine REINE STRING-OP, KEIN Parser —
  Cheerio wurde nie eingeführt (keine Dependency). S. docs/immer-beachten.md,
  "KEIN SERVER-SEITIGES HTML-PARSING".
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3, seit 2026-07-29 auf PRO
- Hosting/Deploy-Orchestrierung: Vercel-API (Domains) — seit Phase 7 live. Vercel-Plan:
  HOBBY. Netlify stand hier als Alternative und wurde NIE eingesetzt — entfernt, damit
  niemand einen zweiten Provider vermutet, den es nicht gibt.

## Roadmap & aktueller Stand
DIE MARKER: [x] abgeschlossen · [ ] offen · [~] TEILS ERLEDIGT — ein benannter Teil
steht und ist bewiesen, ein benannter Teil steht aus. Der dritte Marker ist NEU und
wird nur dort gesetzt, wo beide Teile im Text der Zeile ausdrücklich stehen; ohne diese
Benennung ist er unzulässig, weil er sonst nur "irgendwie halb" hiesse.
- [x] Phase 1 — Lokales Grundgerüst: Import, Sandbox-iframe-Preview, Erkennung
      von Buttons/Forms/Links. Alles in React-State, kein Server. Scanner steht
      in src/components/CodeImporter.tsx.
- [x] Phase 2 — Click & Connect: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Phase 3 — Persistenz & Auth (Supabase): ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-2-3-foundation.md.
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4 — Code-Generierung + HTML-Export: ABGESCHLOSSEN. Volle Herleitung:
      docs/claude-history/phase-4-mapping-codegen-export.md.
- [x] Phase 4.5 — Editor-Politur (Datei-Upload/Drag-Drop + Zen-Modus):
      ABGESCHLOSSEN & live getestet. Volle Herleitung:
      docs/claude-history/phase-4.5-editor-politur.md.
- [x] Phase 5 — In-Place Copywriting: ABGESCHLOSSEN & live bewiesen. Volle
      Herleitung: docs/claude-history/phase-5-copywriting.md.
- [x] Phase 6 — Server-Side Tracking (CAPI): ABGESCHLOSSEN & live bewiesen — der
      End-to-End-Dedup-Sichtbarkeitstest wurde in Phase 7 bestätigt (Owner, Meta
      Events Manager). Volle Herleitung: docs/claude-history/phase-6-capi.md.
- [x] Phase 7 — Hosting & Go-Live (war Phase 6): ABGESCHLOSSEN & live bewiesen
      (Produktions-Smoke über die deployte Produktions-URL, NICHT localhost).
      Volle Herleitung: docs/claude-history/phase-7-hosting.md.
- [x] Phase 8 — Analytics & ROI-Ökosystem (war A/B-Testing): ABGESCHLOSSEN & live
      bewiesen (2026-07-23). Ist-Stand: docs/db-stand.md; volle
      Herleitung: docs/claude-history/phase-8-analytics.md.
      ABGEHAKT 2026-07-29: der ZUGESAGTE Umfang ist fertig und live bewiesen. Die vier
      Weiterentwicklungen (Uniques, Charts/Zeiträume, CAPI-Einbettung server-vereinheitlichen,
      Launch-Härtung) sind IDEEN OHNE TERMIN und OHNE Zusage — sie hingen bisher als offener
      Haken an dieser Zeile und liessen die Phase unfertig aussehen, obwohl sie es nicht ist.
      Wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis; sie
      öffnet diese Checkbox nicht wieder.
      ZWEI WEITERE KOMMEN DAZU (2026-08-12), in DERSELBEN Bauform und mit derselben
      Ausdrücklichkeit — IDEEN OHNE TERMIN UND OHNE ZUSAGE:
      · eine AUFSCHLÜSSELUNG DER NUR SERVER-SEITIG ERFASSTEN CONVERSIONS JE ZIEL.
        (Wortwahl bewusst: "gerettet" ist an dieser Kachel verboten — s. "WORTWAHL
        DASHBOARD" in docs/immer-beachten.md.)
      · die BEHEBUNG EINES DEFEKTS, den Phase 11 erzeugt hat (GEMESSEN 2026-08-12,
        read-only am Code): Wird EIN Ziel abgelehnt und ein anderes erlaubt, entsteht
        die Server-Zeile, die Browser-Bestätigung bleibt aus — der Nenner der
        Adblocker-Kachel wächst ohne den Zähler, die Zahl steigt, obwohl nichts
        geblockt wurde. HEUTE FÄLLT ES NICHT AUF, weil ohne Einwilligungs-Dialog nie
        etwas abgelehnt wird; mit Phase 11.5 WIRD ES REAL.
      BEIDE BRAUCHEN DIESELBE FEHLENDE DIMENSION und stehen NUR deshalb hier statt in
      Phase 11.5: die events-Tabelle trägt keine Ziel-Spalte — genau die EIGENE
      ADDITIVE SPALTE, die für Ziele ohnehin vorgesehen ist (s. "TRACKING-source =
      BEOBACHTUNGS-ORT, NIE ZIEL" in docs/immer-beachten.md).
      DIE ZAHL "VIER" OBEN IST DER STAND VOM 2026-07-29 und wird NICHT überschrieben —
      sie ist als Aussage über JENEN Tag richtig; mit diesen beiden sind es SECHS. Wer
      sie heute als vollständige Liste liest, zählt zu niedrig.
      DER SATZ, DASS DIE CHECKBOX NICHT WIEDER AUFGEHT, GILT FÜR SIE WÖRTLICH MIT:
      wird eine davon gebaut, bekommt sie eine EIGENE Scheibe mit eigenem Nachweis.
      Befunde, Owner-Entscheidungen und Verortung: docs/aktiver-stand.md, "## 7.
      Beschlossen und verortet — NICHT in dieser Phase gebaut".
- [x] Phase 9 — A/B-Testing: ABGESCHLOSSEN & live bewiesen (2026-07-27 bis
      2026-07-29). Volle Herleitung: docs/claude-history/phase-9-ab-testing.md.
- [x] Phase 10 — Workspace-Reorganisation: ABGESCHLOSSEN & live bewiesen
      (2026-07-31 bis 2026-08-01). Die Einstellungsbereiche liegen jetzt als
      Drawer mit zwei Reitern (Messen / Live) außerhalb des Dokumentflusses —
      Voraussetzung für Phase 11. Volle Herleitung:
      docs/claude-history/phase-10-workspace.md.
- [x] Phase 10.5 — Umzug middleware -> proxy (Next-Konvention): ABGESCHLOSSEN
      & live bewiesen (2026-08-03). Volle Herleitung:
      docs/claude-history/backlog-polish.md, Eintrag "src/middleware.ts ->
      proxy.ts umbenennen".
- [x] Phase 11 — Multi-Tracking (Server-Side Fan-Out): ABGESCHLOSSEN & live
      bewiesen (2026-08-03 bis 2026-08-13). Gebaut und belegt: server-seitiger
      Fan-Out an DREI Ziele, Auflösung über mehrere Ziele, Einwilligung JE ZIEL,
      Oberfläche je Plattform, nebenläufiger Fan-Out mit EIGENEM Deckel je
      Empfänger. Herleitung: docs/claude-history/phase-11-multi-tracking.md; der aktive
      Stand der Phase: docs/claude-history/phase-11-multi-tracking-aktiver-stand.md.
      DER HAKEN GILT DEM GEBAUTEN TEIL. Was NICHT gebaut wurde, steht als eigene
      Zeile darunter (11.1–11.4 und 11.6) — NICHT als Sammelposten, weil die
      offenen Ziele KEINE Klasse sind.
- [ ] Phase 11.1 — LinkedIn als Fan-Out-Ziel: KEINE Adapter-Wiederholung, sondern
      eine PRODUKTÄNDERUNG. Die Kennung ist eine Conversion-Regel-URN und gilt JE
      EREIGNISTYP, nicht je Projekt; OWNER-ENTSCHEIDUNG (2026-08-11): Zuordnung
      Ereignisname -> URN (Option B), damit Kunden auf Conversion-Typen optimieren
      können. Das berührt, WIE EIN EREIGNIS BESCHRIEBEN WIRD.
      WEITERE ABWEICHUNGEN: Zeit in MILLISEKUNDEN (Meta: Sekunden) · Betrag als
      Zeichenkette · Erfolg ist 201 · DREI Fehlerwege mit ZWEI Rumpfformen · ein
      Versions-Header, dessen Wert ein Datum ist und der abgeschaltet wird · als
      Identität nur die IP, NUR IPv4, kein User-Agent · kein Testmodus gefunden —
      ein NICHT-TREFFER, KEIN Beweis der Abwesenheit. Immerhin: das Zugangsdatum
      ist ein nicht ablaufendes Token und passt in die Geheimnis-Tabelle.
      PROVENIENZ: GELESEN an FREMDER Anbieter-Doku (2026-08-11) — NICHT gemessen,
      NICHT live bestätigt. Dass TikTok als drittes Ziel live bewiesen ist, WERTET
      DAS NICHT AUF; wer das verwechselt, plant einen Bau auf einer Doku-Lesung.
      ZWEI AUFLAGEN FÜR JEDES WEITERE ZIEL: "ein drittes Ziel erzwingt eine
      Entscheidung, keine Kopie" — und jedes Ziel bringt seine EIGENE
      Constraint-Erweiterung auf project_secrets mit (docs/db-stand.md, CHECK
      project_secrets_target_valid). DAZU EIN PREIS, DER GRÖSSER IST ALS DIESES
      ZIEL: Ein nicht abbildbares Ereignis hat keinen Rückkanal, und ein solcher
      berührt ALLE DREI Adapter (backlog-polish.md, "EIN ADAPTER KANN HEUTE KEIN
      EREIGNIS ABLEHNEN").
- [ ] Phase 11.2 — Google: EINE KONZEPT-RUNDE, KEINE SCHEIBE. Es sind ZWEI Ziele,
      nicht eins, und keines zugeschnitten: Google Ads Conversions und GA4 sind
      verschiedene Produkte mit verschiedenen Schnittstellen und Semantiken. Der
      bisherige Weg für Offline-Conversions ist für NEUE Zugänge seit Mitte Juni
      2026 geschlossen; der Nachfolger ist für den relevanten Fall allowlist-only
      und verlangt einen OAuth-Fluss mit Verifizierung — also eine
      AUTORISIERUNGSSCHICHT, keinen Tabelleneintrag. Der GA4-Weg verlangt eine
      Besucher-Kennung aus einem Cookie, das dieses Produkt nicht setzt, und
      liefert ohnehin keine Ads-Conversion; er berührt damit zusätzlich die
      DATENKLASSEN-GRENZE (s. "## Offene Punkte").
      SCHEMA-RISIKO (benannt 2026-08-03): mehrwertige Anmeldungen passen nicht auf
      ein Geheimnis pro Zeile; im Ernstfall eine ZWEITE Migration auf der
      Geheimnis-Tabelle.
      PROVENIENZ: GELESEN an FREMDER Anbieter-Doku (2026-08-11) — NICHT gemessen,
      NICHT live bestätigt; der Live-Beweis des dritten Ziels wertet sie NICHT auf.
      DIE ZWEI AUFLAGEN AUS 11.1 GELTEN HIER WÖRTLICH MIT.
- [ ] Phase 11.3 — Tracking-Testmodus-Modul (test_event_code): klein und
      eigenständig, damit ein Kunde seine Einrichtung prüfen kann, ohne echte
      Conversions zu erzeugen. Kontext: docs/claude-history/future-roadmap.md,
      "Tracking-Testmodus für Kunden".
      PROVENIENZ: bislang nur als NAME geführt — kein Zuschnitt, keine Recherche,
      keine Entscheidung. Gemessen ist allein, dass der zweite Adapter einen
      Testmodus-Parameter kennt (testModeQuery) und beim ersten der Test-Code in
      die NUTZLAST wandert; für LinkedIn steht ein Nicht-Treffer.
- [ ] Phase 11.4 — Der Testknopf: KEINE SCHEIBE, sondern mehrere einzeln
      beweisbare Teile plus eine UNENTSCHIEDENE VORFRAGE — was beim Druck auf den
      Knopf überhaupt aufgerufen wird. OHNE DEREN ANTWORT HAT KEIN ZUSCHNITT EINEN
      GEGENSTAND. Auflagen und Messbefunde: phase-11-multi-tracking.md, "## Die
      dreizehnte Scheibe". WAS IHM IN WAHRHEIT FEHLT, gemessen: ein Lesepfad, ein
      Rückkanal und eine Maskierung — NICHT die Adapter. Die frühere Bindung "es
      braucht die Adapter, die es hier nicht gibt" ist mit dem zweiten und dritten
      Ziel eingelöst worden, ohne dass der Testknopf näher gerückt wäre.
- [ ] Phase 11.6 — Custom-Pixel: KEINE Wiederholung, sondern eine EIGENE
      ARCHITEKTUR-SCHEIBE — und ihre VORFRAGE ist offen: was es überhaupt ist.
      (a) ein CLIENT-seitiges Snippet — dann gar kein Fan-Out-Ziel, sondern
      derselbe Fall wie das ausgenommene Hotjar. (b) ein SERVER-seitiger
      Empfänger mit KUNDENEIGENEM Endpunkt — dann hängen drei Fragen daran, die
      KEIN anderes Ziel stellt: SSRF-Schutz bei einem betreiber-konfigurierten
      ausgehenden Aufruf, die Aufhebung des Primärschlüssels (project_id, target)
      bei mehreren Endpunkten pro Projekt, und ein dynamisches Nutzlast-Mapping
      ohne bekanntes Zielschema. DER ZUSCHNITT ENTSTEHT ERST NACH DIESER KLÄRUNG.
      Lesart (b) ist der EINZIGE bekannte Konsument der Instanz-Achse und damit
      Trigger (i) der Primärschlüssel-Entscheidung (s. "## Offene Punkte").
      DIE NUMMER TRÄGT KEINE REIHENFOLGE: 11.6 steht hinter 11.5, weil davor nur
      vier Nummern frei waren — nicht, weil dieses Vorhaben später käme.
- [ ] Phase 11.5 — Einwilligungs-Dialog (eigener Dialog UND fremdes CMP):
      NACH Phase 11 und VOR einem Beta-Launch mit fremden Nutzern.
      DIE NUMMER IST GEWÄHLT, WEIL SIE FREI IST (Präzedenz: 4.5, 10.5): die Phase
      gehört zwischen 11 und 12, und KEINE bestehende Nummer wird verschoben.
      GRUND, GEMESSEN am 2026-08-12 (read-only am Code): Pagesmith liefert KEINEN
      Einwilligungs-Dialog — der Hook wird an zwei Stellen GELESEN und nirgends
      GESETZT, er ist fremder Betreiber-Code. Ohne gesetzten Hook gelten ALLE Ziele
      als erlaubt; der Auslieferungs-Zustand einer publizierten Seite ist damit:
      alle konfigurierten Ziele werden beliefert, ohne dass je jemand gefragt wurde.
      FOLGE FÜRS PRODUKT, und sie ist der Grund für die eigene Phase: "konform
      out-of-the-box" trifft heute NICHT zu — die Konformität hängt allein am CMP
      des Betreibers. ENTSCHIEDEN (Owner 2026-08-12): ein eigener Dialog wird
      gebaut, ein fremder bleibt einbindbar.
      IHRE BINDUNGEN — sie sind das, was diese Zeile trägt; das Detail steht in
      der Standdatei, nicht hier:
      · ZWEI PRODUZENTEN, EIN VERTRAG: der eigene Dialog UND ein fremdes CMP
        bedienen DENSELBEN Hook. Er ist produzentenneutral, und der Konsument
        steht seit Phase 11 — er wird nicht angefasst.
      · DER VORHER-ZUSTAND IST DIE EIGENTLICHE ARBEIT. Ein Dialog, der erst NACH
        der Entscheidung setzt, ändert nichts: bis dahin gilt "nicht gesetzt", und
        der erste Seitenaufruf ist durch. Der eigene Dialog setzt VOR jedem Beacon
        einen Wert, der Ablehnung bedeutet, und überschreibt ihn nach der
        Zustimmung.
        DAS KEHRT DIE HEUTIGE VORGABE UM UND NUR FÜR DEN DIALOG-FALL: Die Regel
        für den Fremd-CMP-Fall ("nichts gesetzt" heisst, der Betreiber hat nie
        entschieden) bleibt UNANGETASTET. Die Fail-Closed-Regel ist von beidem
        nicht berührt — sie gilt dem URTEIL, nicht dessen Abwesenheit.
      · DIE ZIEL-SCHLÜSSEL SIND EINE EINBAHNSTRASSE: Der Dialog bezieht sie aus
        DERSELBEN Quelle wie der Erzeuger, NIE aus einer zweiten Liste. Eine
        Divergenz wäre lautlos — ein unbekannter Schlüssel heisst fail-closed
        "nicht erlaubt", ohne dass irgendwo etwas rot wird.
      · DAS RISIKO IST VON ANDERER KLASSE ALS BEI EINEM ADAPTER: Ein fehlerhafter
        Adapter macht EIN Projekt kaputt, ein fehlerhafter Dialog JEDE Kundenseite
        gleichzeitig. Ein Betreiber mit eigenem CMP darf NIE von unserem abhängen.
      · SIE IST EINE PHASE, KEINE SCHEIBE: Granularität, Ablehnen so einfach wie
        Zustimmen, Widerruf, Speicherung der Entscheidung, Darstellung auf fremden
        Seiten, Sprache.
      KEINE BEVORMUNDUNG, ABER EIN HINWEIS (Owner 2026-08-12): Der Betreiber
      entscheidet eigenverantwortlich über seinen Einwilligungs-Dialog. Wir weisen
      hin, wir erzwingen nicht.
      AUSDRÜCKLICH NICHT IN DIESER PHASE (Owner 2026-08-12): Der Hybrid-Schalter je
      Kanal bleibt VISION und wird NICHT vorgezogen; die Architektur bleibt für den
      Launch unverändert — EIN Ziel als Hybrid aus Browser-Tag und Server-Forward,
      die übrigen als reiner Server-Fan-Out.
      Befunde mit ihrem Rang, die vier Owner-Entscheidungen und die Verortung:
      docs/aktiver-stand.md, "## 7. Beschlossen und verortet — NICHT in dieser
      Phase gebaut".
- [ ] Phase 12 — Rich-Text / verschachtelte Textknoten: der Editor erkennt
      heute nur reine Textknoten, kein <strong>/<em> innerhalb eines <p>.
      Offene Designfragen seit Phase 5: Umgang mit Kind-Markup, Vorschau- vs.
      Export-Strategie — Klärung im Bau-Slice.
      KONZEPT-KANDIDAT, NICHT garantierter Umfang: Dynamic Text Replacement
      (Überschriften-Austausch per URL-Parameter) berührt dieselbe
      Text-Element-Infrastruktur, löst aber ein ANDERES Problem
      (Parameter-Substitution statt Markup-Erhalt) — im Konzept-Gespräch zu
      Phase 12 prüfen, ob es mitgebaut wird oder eigenständig bleibt, NICHT
      automatisch bündeln.
- [ ] Phase 13 — E-Mail-/ESP-Webhooks: Pagesmith wird KEIN Versender
      (Owner-Entscheidung) — stattdessen Webhooks auf Performance-Events, der
      Kunde behält seinen bestehenden ESP.
- [ ] Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic): Per-Tenant-
      Rate-Limiting auf /api/e + /api/capi, Safe-Browsing-Check der
      Redirect-Ziele, Login-Brute-Force (zuerst Supabase-Auth-Built-in
      prüfen). Security-Manifest-Tier-1 (s. "## Security Manifest & Launch
      Blocker"), kein Produkt-Feature. Bleibt an dieser Stelle: echter
      Ad-Traffic ist noch nicht terminiert, kein Grund zum Vorziehen.
- [ ] Phase 15 — Public-Launch-Restarbeit (Tier 0): E-Mail-Bestätigung
      (Dashboard-Toggle), Abuse-Kanal + security.txt (s. "## Security
      Manifest & Launch Blocker", Tier 0). Subprozessor-/Kunden-DPA ist KEIN
      Bau-Auftrag, sondern ein juristisches Dokument, das Stefan separat
      aufsetzt. Kein Termin — App bleibt im privaten Test-/Beta-Betrieb.
- [ ] Phase 16 — Analytics-Vertiefung (Uniques, Traffic-Health-Metriken):
      braucht als ERSTEN Schritt die Datenklassen-Grenze-Entscheidung (s.
      "## Offene Punkte") — eine gehashte Besucher-Kennung ist
      personenbezogen und löst die 30-Tage-Retentionspflicht aus. Eigenes
      Konzept-Gespräch VOR jedem Bau dieser Phase.
- [ ] Phase 17 — Multi-Page-Funnels (s. future-roadmap.md, "Zukunftsrichtung:
      Funnel-Architektur"): additive pages-Tabelle, funnel_step als neuer
      Aktionstyp im bestehenden, type-diskriminierten Mapping-Modell — kein
      Modellumbau. Setzt Phase 16 voraus.
- [ ] Phase 18 — MCP-Server (verschoben von der ursprünglichen
      Phase-10-Position; umgedrehtes Sicherheitsmodell, Bedrohungsmodell und
      Scope: future-roadmap.md, "Phase 18 — AI-Native: Pagesmith MCP-Server"):
      Eigene Autorisierungsschicht, KEIN angehängter Endpunkt. Bewusst ans Ende
      gestellt.

**Bewusst nicht phasiert (Trigger fehlt):**
- ROI/Attribution (s. future-roadmap.md, "Strategischer Nordstern:
  Performance-CRM & CAPI-Attribution-Engine"): externe Ad-Spend-API noch
  nicht vorhanden.
- Click-ID-Erfassung/Dynamic-Audience-Engine: Datenklassen-Grenze, größere
  Reichweite als Uniques.
- GEO/llms.txt (s. future-roadmap.md, "Strategischer Nordstern: GEO"):
  PRÄZISE fassen — nur die manuelle JSON-LD-Injektion (Säule 1,
  Zwischenschritt 1c) trägt einen EXPLIZITEN Trigger ("wird erst gebaut, wenn
  ein Kunde es fordert"). Die automatische llms.txt-Erzeugung (1a) ist
  grundsätzlich baubar, aber schlicht noch nicht eingeplant — nicht denselben
  harten Trigger unterstellen. KI-Crawler-Erfassung (Säule 3) braucht einen
  eigenen, entkoppelten Schreibpfad auf der Serve-Route, KEINE reine
  Konfigurationsdatei — das bei etwaiger Einplanung nicht unterschätzen.
- Spur B (native JSON-Generierung) / Business-Website-Projekttyp (s.
  future-roadmap.md, "Strategischer Ausblick: Projekttyp 'Business-Website'"):
  eigene zweite Produktspur, deren natürlicher Zeitpunkt bei/nach Phase 18
  (MCP) liegt — dort liegt laut future-roadmap.md ihr
  Flaggschiff-Anwendungsfall.
- Betreiber-Metriken/SaaS-Tarifgrenzen (Rate-Limiting nach Tarif,
  In-App-Upgrade-Meldungen): kein Preismodell heute — kein Termin, reine
  Notiz.


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
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging
  REIN AUS DEN MIGRATIONSDATEIEN — der Restore-Drill-Fall ist unten GEMESSEN geklärt,
  das ist aber KEIN Freibrief für diese beiden anderen Fälle): Die Event-Trigger-FUNKTION
  rls_auto_enable (aktiviert automatisch RLS auf neuen public-Tabellen, SECURITY DEFINER),
  gebunden über den Event-Trigger ensure_rls (ddl_command_end), existiert NUR in der
  laufenden DB — Zweck + Grant-Entzug sind in 0003 dokumentiert, aber ein CREATE steht
  in KEINER Migration. Bei einem Rebuild REIN AUS DEN MIGRATIONSDATEIEN (z.B. lokales
  `supabase db reset`, CI, Self-Hosting) fehlt sie weiterhin -> neue Tabellen bekämen
  dort NICHT automatisch RLS (stiller Verlust einer Schutzschicht). DDL verbatim
  archiviert unter supabase/manual/rls_auto_enable.sql (bei einem Migrations-only-Rebuild
  manuell mitziehen). evtowner = postgres (gemessen 2026-07-24) -> eine Migration unter
  der NÄCHSTEN FREIEN Nummer (ableiten aus supabase/migrations/, NIE hardcoden — eine
  feste Nummer hier veraltet mit der nächsten Migration und überschriebe dann eine
  bestehende Datei) bleibt ein realistischer Kandidat für GENAU DIESEN
  Migrations-only-Fall, aber KEINE Nebenbei-Zeile: (a) create event trigger kennt KEIN
  "if not exists" -> Katalog-Guard nötig (DO-Block gegen pg_event_trigger); (b) "create or
  replace function" auf einer SICHERHEITSFUNKTION ersetzt die Definition VOLLSTÄNDIG
  (0014-Lektion) — jeder Transkriptionsfehler degradiert still den RLS-Schutz, daher
  nach dem Lauf Byte-Abgleich gegen pg_get_functiondef PFLICHT; (c) die Migration muss
  gegen die BESTEHENDE DB ein No-op sein.
  GEMESSEN (2026-07-30, Restore-Drill "Restore to new project",
  supabase/checks/restore-drill.sql): Für den SUPABASE-RESTORE-Pfad ist die Frage jetzt
  beantwortet — ensure_rls übersteht einen Restore aus einem Pro-Backup automatisch.
  Teil A/B (Migrationsstand, Event-Trigger, Funktionsliste) waren zeilenidentisch
  zwischen Original und restauriertem Projekt; die Positivkontrolle (Teil C,
  Wegwerf-Tabelle ohne explizites RLS-Enable) ergab rls_automatisch_aktiviert = true.
  Für den Restore-Fall ist damit KEIN manuelles Nachziehen von
  supabase/manual/rls_auto_enable.sql mehr nötig.
  GRENZE: Der Beweis gilt für DIESEN Drill mit DIESER Backup-Generation, KEIN Beweis für
  alle Zeit — ändert Supabase die Restore-Mechanik, wäre der Drill zu wiederholen.
  UNVERÄNDERT OFFEN bleiben die beiden anderen Trigger (DB-Neuaufbau / Staging rein aus
  den Migrationsdateien): dort fehlt ensure_rls weiterhin, s. oben.
- DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE (Trigger: die erste Scheibe, die
  personenbezogene Merkmale erfasst — Click-IDs, IP/UA, gehashte Kontaktdaten,
  Fingerprint-artige Merkmale; spätestens VOR dem ersten echten Ad-Traffic): Heute
  trägt events KEINE Personen-Identität, deshalb braucht es keinen Löschpfad und keine
  Auskunftsfähigkeit. Die Performance-CRM-Vision (docs/claude-history/future-roadmap.md)
  würde genau das ändern. Die Grenze — WAS erfasst wird, auf welcher Rechtsgrundlage,
  wie lange, mit welchem Löschpfad — MUSS entschieden sein, BEVOR die erste solche
  Scheibe gebaut wird. Grund: einmal unter falscher Grundlage erhobene Daten lassen
  sich nicht rückwirkend heilen, und die DSGVO-Sauberkeit IST das Verkaufsargument.
  Bindet die bestehende 30-Tage-Retentionspflicht (Manifest Tier 2) und die
  Zwei-Ebenen-Trennung Kunden- vs. Betreiber-Ebene aus der future-roadmap mit ein.
  Browser-Fingerprinting ist bereits ENTSCHIEDEN: wird nicht gebaut. EBENSO ERFASST
  (Phase 9): eine „anonyme" Zufalls-ID in einem First-Party-Cookie zur
  Besucher-Identifikation wäre ein fingerprint-artiges Merkmal und löst dieselbe Grenze
  aus — auch das keine Option ohne eine vorherige Entscheidung hier.
- COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH
  (Trigger: vor dem öffentlichen Launch; Phase 9): Für das A/B-Test-Cookie
  (__Host-ps_v) stellt Pagesmith dem Kunden heute KEINEN fertigen
  Doku-Schnipsel bereit, den er in seine eigene Datenschutzerklärung
  übernehmen könnte (Cookie-Name, Zweck, Lebensdauer) — das ist eine
  PRODUKTPFLICHT, kein Nice-to-have, weil der Kunde sonst mangels dieser
  Angabe rechtlich blank dasteht. Zusätzlich MUSS vor dem Launch anwaltlich
  geklärt werden, ob ein reines Varianten-Cookie tatsächlich ohne
  Einwilligung auskommt oder ob ein A/B-Test als Betreiber-Optimierung
  gilt, die eine Einwilligung verlangt — Letzteres würde den Split brechen
  (er muss vor dem ersten Rendern feststehen).
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- LABEL-VERGABE IST UNPROTOKOLLIERT (Trigger: vor öffentlichem Traffic bzw. mit
  dem Abuse-/Audit-Ausbau): assignDomainLabel und die Wiederherstellung
  schreiben KEINEN audit_logs-Eintrag, Custom-Domain-Mutationen dagegen schon
  (register.ts, remove.ts, je im finally). Das Tier-1-Item
  "Domain-Mutations-Audit-Log" ist damit nur teilweise erfüllt — und genau die
  Label-Vorgänge sind die, deren Historie man bei einer Divergenz bräuchte.
  Bewusst nicht in der Fix-Scheibe mitgebaut: writeAuditLog verlangt einen
  service_role-Client, den publishProject bewusst NICHT instanziiert
  (dokumentierte Entscheidung) — das umzustossen gehört in eine eigene Runde.
- DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT — ENTSCHIEDEN
  (Owner, 2026-08-12), Herleitung: Phase-11-Historie. ZWEI TRIGGER, je einzeln
  hinreichend: (i) die Custom-Pixel-Vorfrage fällt zugunsten eines SERVER-Empfängers mit
  kundeneigenem Endpunkt; (ii) es zeigt sich, dass die KENNUNG NICHT IN DEN
  EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG AUS WELCHEM GRUND (Beispiele, KEINE
  abschliessende Liste: je Kennung ein eigenes Zugangsdatum · die Kennung selbst ein
  Geheimnis · server-autoritativ vergeben). (ii) nennt bewusst den GEGENSTAND und nicht
  den Anlass: eine engere Fassung fängt den wahrscheinlichsten Kipp-Fall nicht, und ein
  Trigger, der das nicht tut, schlägt nie an. GRENZE, die die Entscheidung trägt: dass die
  LinkedIn-URN eine KENNUNG ist und kein ZUGANGSDATUM, ist GELESEN (Anbieter-Doku,
  2026-08-11) und NICHT gemessen. KIPPT DIESE LESART, FALLEN BEIDE ACHSEN ZUSAMMEN, und
  die Entscheidung ist NEU zu treffen. Was still kaputtgeht: mehrere Zeilen mit demselben
  target im selben Projekt — der Schlüssel bricht, ohne dass der Trigger anschlägt.
- DREI WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE — RANG OFFEN,
  UNGEMESSEN (Trigger: die Messung selbst — ein Lauf, der prüft, ob ein Wurf auf dem
  Ingest-Pfad die garantierte leere 204 bricht): (1) die zwei deckungsgleichen
  Normalisierungen vor dem geteilten Schwärz-Primitiv (asLogString in capi/meta-forward.ts,
  normalizeProviderValue in capi/tiktok-forward.ts) — fiele an einer der Riegel weg,
  erreichte ein Nicht-String redactOpaque, und das wirft; (2) ein Nicht-String als
  Zugangsdatum, der den Resolver passiert (CapiConfig.token in capi/token.ts); (3)
  getPixelId (lib/settings.ts) wirft bei einer Nicht-Zeichenketten-Kennung — die
  Optional-Verkettung schützt gegen null, nicht gegen eine Zahl. DER RANG WIRD HIER WEDER
  BEHAUPTET NOCH AUSGESCHLOSSEN: Bricht die 204, ist es ein Containment-Bruch und gehört
  ins Sicherheits-Manifest; wird der Wert nur gecastet, ist es eine Notiz. Ohne die Messung
  ist beides gleich plausibel. Was still kaputtgeht: das Containment ist als
  Sicherheitsregel geführt (Enumeration-Schutz) — bleibt die Messung aus, bleibt offen, ob
  eine Sicherheitszusage hält.
- BETREIBER-DOKUMENTATION FEHLT — ZWEI PUNKTE (Trigger: vor dem öffentlichen Launch; wie
  der COOKIE-DOKU-SCHNIPSEL darüber eine PRODUKTPFLICHT, kein Nice-to-have): (1) dass
  Pagesmith KEINEN Einwilligungs-Dialog mitliefert und ohne einen ALLE Ziele als erlaubt
  gelten — daraus folgt, dass "konform out-of-the-box" heute nicht zutrifft; (2) die GRENZE
  DER DEDUPLIZIERUNG in der belastbaren, NICHT-absoluten Fassung: unsere Deduplizierung
  führt Browser und Server über eine GETEILTE Ereignis-Kennung zusammen, und diese Zusage
  gilt für Ereignisse AUS DIESEM BUILDER; ein zusätzlich über Tag-Manager oder Shop-System
  eingebundenes Tag erzeugt FREMDE Kennungen, die keine Deduplizierung zusammenführen kann.
  AUSDRÜCKLICH NICHT "zu 100 % Konfigurationsfehler" — eine Absolutheits-Aussage wird vom
  ersten Gegenbeispiel widerlegt, und dann fällt die ganze Argumentation. Was still
  kaputtgeht: der Betreiber erfährt beides erst, wenn es ihn trifft.
- DIE VOLLSTÄNDIGKEITS-ACHSE IST NICHT GEBAUT ("Kennungen für ALLE Ereignisse vorhanden") —
  Grund: kein realer Konsument, kein Ziel trägt heute eine Kennung je Ereignistyp. TRIGGER,
  wörtlich und ausdrücklich nicht "falls es je nötig wird": sobald ein Ziel eine Kennung JE
  EREIGNISTYP trägt. Was still kaputtgeht: Ein Nenner, der nur Variante A kennt, meldet
  vollständig, während beim halben Traffic nichts ankommt. Die drei Messbefunde, die dann
  sofort gelten und nicht neu erhoben werden müssen, stehen in
  docs/claude-history/backlog-polish.md, "VOLLSTÄNDIGKEITS-ACHSE — WAS DANN SOFORT GILT".
- CLAUDE.md NÄHERT SICH DEM LADELIMIT (Trigger: vor der nächsten Hebung an einem
  Phasenende): GEMESSEN am 2026-08-13 — die Datei steht bei rund 149 KB gegenüber dem
  dokumentierten 150k-Ladelimit, "## Immer beachten" trägt 1 012 Zeilen und 80 Regeln,
  und allein die Hebung dieser Phase hat 10 293 Bytes gekostet. Jede Phase fügt mehrere
  Regeln hinzu; die Datei wurde zuletzt schon einmal von 147 auf 138 KB gebracht. Was still
  kaputtgeht: Ohne Entscheidung endet die nächste Hebung entweder ÜBER dem Ladelimit oder
  damit, dass gefilterte Regeln stillschweigend nicht gehoben werden — und eine nicht
  gehobene Regel wird nicht mehr gelesen. HIER STEHT AUSDRÜCKLICH KEIN VORSCHLAG, WAS
  AUSGELAGERT WIRD: das gehört in eine Arbeitsweise-Runde am Phasenübergang.
  ZWEI ZAHLEN NACHGEZOGEN (GEMESSEN am Repo, 2026-08-14): Hier stand "rund 1 200 Zeilen"
  und "rund 11 KB"; gemessen sind 1 012 Zeilen (Abschnitt von der Überschrift bis zur
  letzten Inhaltszeile) und 10 293 Bytes (Grösse von CLAUDE.md vor und nach dem
  Hebungs-Commit 92c1a3b). Die beiden übrigen Zahlen des Eintrags halten der Messung
  stand: 149 970 Bytes und 80 Regeln. HERKUNFT der beiden falschen: ein Diktat, das beim
  Eintragen bereits als zu niedrig gemeldet und damals nicht nachgezogen wurde.

## Aktueller DB-/Analytics-Stand — AUSGELAGERT nach docs/db-stand.md
Der gemessene Ist-Zustand (Migrationsstand, Tabellen, Policies, Rollen-Grants, Spalten,
Constraints, Indizes, Funktionen, Event-Trigger, Backups) steht in docs/db-stand.md.
Diese Datei wird NICHT automatisch geladen.
PFLICHT-STOPP, KEINE EMPFEHLUNG: Wer eine Migration schreibt oder am Schema, an Policies,
an einem RPC oder am Analytics-Lesepfad arbeitet, LÄDT docs/db-stand.md ZUERST — vor dem
Plan, nicht während des Baus. Ohne sie plant man gegen ein Schema, das man nicht kennt,
und es fällt erst in der laufenden DB auf.
UND AUCH DANN IST SIE KEINE QUELLE: Ein Dokument beschreibt einen Codezustand, es belegt
ihn nicht. Was gilt, steht im Repo bzw. in der laufenden DB — gemessen wird am Code oder
im SQL-Editor (Probe: supabase/checks/db-stand.sql), nicht abgelesen.
ERGÄNZT 2026-08-13 — ES SIND ZWEI DATEIEN, UND BEI DENSELBEN TÄTIGKEITEN WERDEN BEIDE
GELADEN: docs/db-stand.md trägt den gemessenen ZUSTAND, docs/db-regeln.md die dauerhaften
REGELN. Der Pflicht-Stopp oben gilt für beide unverändert; der Satz darüber ist NICHT
umformuliert, sondern erweitert.
DREI REGELN SIND AM 2026-08-13 AUS "## Immer beachten" NACH docs/db-regeln.md GEZOGEN und
stehen dort ZEICHENGLEICH: "BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN, NICHT AM KALENDER" ·
"MIGRATION IMMER VOR CODE-DEPLOY" · "DB-FUNKTIONEN + SEARCH_PATH".
DIE TITEL STEHEN HIER, WEIL ZEIGER AUSSERHALB DES DAMALIGEN SCOPES AUF SIE VERWEISEN.
NACHGEZOGEN AM 2026-08-14 (GEMESSEN am Repo) — die Zahl DREI war schon am 2026-08-13 zu
hoch: Den Pfad "CLAUDE.md, ## Immer beachten" trugen nur ZWEI (docs/db-stand.md und
supabase/checks/restore-drill.sql). Der dritte, supabase/checks/db-stand.sql, trägt allein
den REGELTITEL — ohne Pfad, ohne Dateinamen, er zeigte also nie hierher.
BEIDE PFAD-ZEIGER SIND AM 2026-08-14 AUF docs/db-regeln.md NACHGEZOGEN: Sie zeigten seit
dem 2026-08-13 an der Regel vorbei, weil die Regel dorthin umgezogen war, und mit der
Auslagerung von "## Immer beachten" wären sie ein zweites Mal falsch geworden.
WAS DAMIT OFFEN IST UND HIER NICHT ENTSCHIEDEN WIRD: Der Titel-Zeiger in db-stand.sql
braucht die Titel weiterhin an einem auffindbaren Ort; ein Pfad-Zeiger auf diese Datei
existiert nicht mehr.

## Aktiver Stand — Verfahren ab Phase 10

Ab Phase 10 wird der aktive Stand einer laufenden Phase NICHT mehr hier
geführt, sondern in einer eigenen, nicht automatisch geladenen Datei:
docs/aktiver-stand.md. Existiert diese Datei nicht, läuft aktuell keine
Phase — dann gibt es hier nichts zu lesen und auch sonst nichts zu tun.

Diese Datei muss JEDE Session, die an einer laufenden Phase arbeitet,
ZUERST gelesen werden — das ist kein Vorschlag, sondern ein Pflicht-Gate
("Auftrag 0") in jedem Bau- und Aufklärungs-Prompt. Details zum Ablauf
(Anlegen zu Phasenbeginn, Fortschreiben während der Phase, Hebung +
Archivierung am Phasenende): docs/arbeitsweise.md.

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
  Eine neue Policy spiegelt die Ownership-ACHSE der bestehenden Tabellen-Policy (nie neu
  erfinden — Divergenz zwischen "wer darf das Projekt" und "wer darf die Events" WÄRE das
  Leak); korrelierter Semi-Join via EXISTS statt IN (kurzschließend, nutzt den Index).
  security definer NUR mit expliziter Einzelfall-Begründung vorschlagen (umgeht RLS,
  ist bei Fehlgebrauch selbst ein Sicherheitsloch) — NIEMALS als Standardempfehlung. BELEGTE
  AUSNAHME: die Event-Trigger-FUNKTION rls_auto_enable (gebunden über den Event-Trigger ensure_rls;
  existiert in der DB, NICHT aus einer Migration — 0003 entzog nur die Grants; DDL archiviert unter
  supabase/manual/rls_auto_enable.sql) IST SECURITY DEFINER — korrekt, weil Event-Trigger als Owner
  laufen; die DEFINER-Warnung des Advisors ist dort erwartet.
- LIKE-WILDCARD-FALLE bei Präfix-Filtern: '_' ist ein LIKE-Wildcard -> "not like '__ps_%'"
  matcht mehr als gedacht. Präfix-Ausschlüsse über left(spalte,5) <> '__ps_' formulieren
  (deckt künftige __ps_-Tokens automatisch, ohne Escaping-Falle).
- DEFENSIVE TIMEOUTS: JEDER externe API-Call (Meta CAPI heute, Vercel-Domains-API in
  7c-2b) braucht ein striktes Timeout, damit ein hängender Drittanbieter die
  Serverless-Funktion nicht blockiert.
- /API/E-SCHLANKHEIT (der reale Hotspot, NICHT CSV/Bulk): /api/e wird von JEDEM
  Besucher JEDER Kundenseite getroffen — jeder zusätzliche synchrone Call dort
  multipliziert sich mit dem Traffic ALLER Kunden zusammen. PRÄZISE Regel (bewusst
  KEIN pauschales "Drittanbieter nie synchron", das würde die Dedup-Garantie
  gefährden): die Beacon-Antwort an den Client darf NICHT auf den Meta-Call warten,
  aber der CAPI-Call selbst muss zuverlässig zugestellt werden.
  ACHTUNG, DIE BEIDEN HÄLFTEN DIESES SATZES HABEN SEIT DEM 2026-08-10 VERSCHIEDENEN
  RANG: die ERSTE ist BEDINGT (sie wird mit einem benannten Trigger scharf), die ZWEITE
  gilt UNBEDINGT. Wer nur diesen Satz liest, liest die erste Hälfte zu streng — die
  Begründung steht im Stempel unter "SOLL" weiter unten.
  SOLL UND IST FALLEN HIER AUSEINANDER — getrennt aufgeschrieben am 2026-08-05, weil der
  Satz darüber sonst als Beschreibung des heutigen Codes gelesen wird und er ist es nicht:
  - IST, GEMESSEN am 2026-08-05, am 2026-08-08 erneut am Code erhoben: Der Meta-Forward
    wird mit await IM REQUEST erwartet, gedeckelt per AbortController auf
    META_FORWARD_TIMEOUT_MS; das abschliessende status(204) steht DAHINTER. Die
    Beacon-Antwort wartet also auf Meta — bis zum Deckel. Der Hintergrund-Mechanismus
    (after aus next/server) existiert im selben Handler, trägt aber NUR den Analytics-
    Persist über schedulePersist, nicht den Forward.
    WO DAS HEUTE LIEGT — ORTSANGABE RICHTIGGESTELLT (Phase 11 Scheibe 4): Die Messung vom
    2026-08-05 fand all das in handleIngest (src/lib/capi/ingest.ts), und so stand es hier.
    Seither liegen Nutzlast-Bau, AbortController, Timer und Fehlerdeutung in
    src/lib/capi/meta-forward.ts (forwardToMeta); in handleIngest stehen nur noch das await
    und die 204 dahinter.
    DER SACHVERHALT SELBST IST UNVERÄNDERT — verschoben hat sich der ORT, nicht das
    Verhalten. Genau deshalb RICHTIGGESTELLT und NICHT gestempelt: Wäre das Verhalten
    anders geworden, wäre die alte Messung ein Zeitdokument. So ist sie ein MASSSTAB mit
    einem toten Verweis — und dieser Block ist der Maßstab, gegen den die nächste Änderung
    an diesem Pfad misst. Wer den Deckel in ingest.ts sucht und nicht findet, hält ihn für
    abgeschafft und baut den nächsten Empfänger ohne ihn.
  - SOLL: der Satz oben. Er ist als ABSICHT richtig und wird NICHT gestrichen — er ist nur
    NOCH NICHT EINGELÖST.
    STEMPEL 2026-08-10 — DIE SOLL-HÄLFTE IST BEDINGT GEWORDEN, NICHT GESTRICHEN. Was sie
    FORDERT, bleibt wörtlich stehen; was sich ändert, ist ihr RANG: Sie ist keine Auflage
    an den heutigen Code mehr, sondern wird erst mit dem unten benannten TRIGGER scharf.
    DER BEFUND, DER DAS ENTSCHEIDET, und er ist NEU — er stand in keiner der beiden
    bisherigen Fassungen: DER MECHANISMUS DIENT DEM PREIS NICHT, DEN DIESE REGEL SELBST
    NENNT. Der Preis ist seit der Präzisierung ganz unten der SLOT, nicht die Rechenzeit.
    Eine Hintergrund-Zustellung über after() verkürzt die Invocation aber NICHT — sie
    lässt nur die Antwort früher hinausgehen, die Belegung des Slots bliebe identisch.
    FOLGE: Die SOLL-Hälfte und die einzige noch tragende Preis-Begründung dieser Regel
    hängen NICHT zusammen; ihre Umsetzung brächte an genau der Stelle, die den Preis
    trägt, exakt nichts. Das ist ein schärferer Grund als "kein messbarer Gewinn" — er
    sagt, dass Forderung und Begründung auseinanderlaufen, nicht bloss dass der Gewinn
    klein ist.
    GEMESSEN AM 2026-08-11 (formale Suche über src/, case-INSENSITIV, MEHRZEILIG und mit
    Testdateien; alle drei Anforderungen sind nötig — ein Vorkommen zitiert den Namen in
    GROSSSCHREIBUNG, zwei stehen über einen Zeilenumbruch getrennt und entgehen einer
    zeilenweisen Suche, und eines liegt in einer Testdatei):
    ACHT Stellen berufen sich auf diese Regel — alle auf ihren KOPF (keine zusätzliche
    Arbeit je Beacon, keine zweite Abfrage), in capi/ingest.ts (drei), capi/token.ts
    (drei), capi/token.test.ts (eine) und tracking/consent-wire.ts (eine). AUF DIE
    SOLL-HÄLFTE BERUFT SICH KEINE EINZIGE. Sie hat im Produktivcode keinen Konsumenten
    und hatte nie einen.
    WAS UNBERÜHRT BLEIBT: Die ZWEITE Hälfte ("der CAPI-Call muss zuverlässig zugestellt
    werden") gilt UNBEDINGT weiter. Die Recherche berührt sie nicht — im Gegenteil, sie
    ist der Grund, warum die Umstellung TEUER wäre (waitUntil sichert ABSCHLUSS zu, nicht
    ERFOLG).
    DIE ALTE BEGRÜNDUNG BLEIBT LESBAR UND WIRD NICHT GESTRICHEN: Sie war unter dem
    damaligen Kostenmodell richtig — jeder zusätzliche synchrone Call multipliziert sich
    mit dem Traffic aller Kunden — und sie ist die Herleitung, unter der mehrere Scheiben
    dieser Phase entschieden wurden. Überholt hat sie eine Doku-Lesung, kein Sinneswandel.
    DIE LÜCKE, DIE ZWINGEND DAZUGEHÖRT: Der Trigger unten hat ZWEI Hälften, und nur eine
    hat einen Beobachter. "Wegfall von Fluid Compute" ist im Dashboard ablesbar. "Eine
    GEMESSENE Grenze unter echtem Traffic" hat heute NIEMANDEN, der sie misst — es gibt
    kein Monitoring auf Concurrency-Slots. Wer diese Hälfte scharf haben will, braucht
    zuerst die Messung; ohne sie schlägt sie nie an und ist genau das "falls es je ein
    Problem wird", das der Trigger ausdrücklich nicht sein soll.
    PROVENIENZ DIESES STEMPELS: die Anbieter-Doku vom 2026-08-06 (KEINE Messung am
    eigenen Ingest-Pfad, s. die GRENZE weiter unten) plus die formale Code-Suche vom
    2026-08-10.
  - WARUM ES EINE UMSTELLUNG BRAUCHT UND KEINE STREICHUNG: Beide Hälften gelten
    gleichzeitig — die Antwort soll sich von Metas Latenz lösen, UND der Forward muss
    trotzdem zuverlässig zugestellt werden. Wer nur die erste Hälfte umsetzt, verliert
    Conversions; wer nur die zweite liest, sieht keinen Änderungsbedarf.
  - NICHT GEPLANT — und zwar, weil die BEGRÜNDUNG weggefallen ist, nicht weil die Absicht
    vertagt wäre. Die Umstellung ("CAPI-Forward auf Hintergrund-Zustellung, die 204 löst
    sich von Metas Latenz") war als eigene Scheibe zugeschnitten und ist am 2026-08-06
    GESTRICHEN worden. Der noch frühere Trigger "falls Beacon-Latenz je ein echtes Problem
    wird" bleibt ebenfalls ERSETZT und darf nicht zurückkommen.
    WARUM SIE NICHTS BRINGT — PROVENIENZ: VERCEL-/NEXT-DOKU, gelesen am 2026-08-06. KEINE
    Messung am eigenen Ingest-Pfad:
    · after() setzt auf waitUntil auf und verlängert die Lebensdauer DERSELBEN Invocation,
      bis deren Promises abgeschlossen sind. Die Invocation wird also NICHT kürzer — nur
      die Antwort geht früher raus.
    · Unter Fluid Compute pausiert die Active-CPU-Abrechnung, solange die Funktion auf I/O
      wartet. Das Warten auf Meta IST I/O.
    · waitUntil sichert ABSCHLUSS zu, nicht ERFOLG: kein Wiederholungsweg, und beim
      Herunterskalieren bleiben nach SIGTERM nur noch bis zu 500 ms.
    GEMESSEN AM EIGENEN PROJEKT (Vercel-Dashboard, 2026-08-06) — und NUR diese zwei Werte
    sind gemessen, alles andere oben ist Anbieter-Doku: Fluid Compute ist AKTIV, die
    Default Max Duration steht auf 300 Sekunden.
    FOLGE: Die Umstellung brächte keinen messbaren Gewinn und kostete die Zusicherung, dass
    der Forward vor der Antwort abgeschlossen ODER am Deckel gescheitert ist. Ein
    Conversion-Forward ist kritische Arbeit — diese Zusicherung für nichts aufzugeben wäre
    ein schlechter Tausch.
    TRIGGER, präzise und ausdrücklich NICHT "falls es je ein Problem wird": eine GEMESSENE
    Grenze unter echtem Traffic (Concurrency-Slots bzw. Skalierungsverhalten auf dem
    Ingest-Pfad), ODER ein Wegfall von Fluid Compute.
    GRENZE DIESER ENTSCHEIDUNG, die mitmuss: Sie stützt sich auf ANBIETER-DOKU plus die zwei
    Dashboard-Werte, NICHT auf eine Messung am eigenen Ingest-Pfad. Ändert der Anbieter sein
    Ausführungsmodell, ist sie NEU ZU PRÜFEN. Herleitung des ursprünglichen Aufschubs:
    docs/claude-history/phase-8-analytics.md.
  - JEDER WEITERE EMPFÄNGER VERSCHÄRFT DIESE REGEL, UND NEBENLÄUFIGKEIT LÖST DAS NICHT:
    Wird neben Meta ein weiteres Ziel im Request erwartet, wächst die Funktionslaufzeit.
    Wer nebenläufig statt seriell wartet, wartet auf das MAXIMUM statt auf die SUMME — das
    ist eine Dämpfung, keine Aufhebung: es genügt EIN langsamer Empfänger, und das Maximum
    wandert mit jedem zusätzlichen Empfänger nach oben, auch im Normalfall und nicht nur im
    seltenen Ausreisser.
    WO DER PREIS LIEGT — der Satz gehört zwingend dazu, sonst wird die Regel beim nächsten
    Refactor wegoptimiert, weil sie an der falschen Stelle gesucht wird: NICHT in der
    Wartezeit des BESUCHERS (ein keepalive-Beacon blockiert weder Rendering noch
    Interaktion, und ein Tracking-Verlust entsteht beim ABSENDEN, nicht beim Antworten),
    sondern in der BELEGUNG VON CONCURRENCY-SLOTS auf dem meistgetroffenen Pfad der
    Plattform, multipliziert über ALLE Kunden: eine länger offene Invocation belegt ihren
    Platz länger, und unter Last wird früher auf weitere Instanzen skaliert. Wer den Preis
    beim Besucher sucht, findet keinen und streicht die Regel.
    PRÄZISIERT AM 2026-08-06: Hier stand "FUNKTIONSLAUFZEIT und NEBENLÄUFIGKEIT", und das
    ist zu grob — unter Fluid Compute pausiert die Active-CPU-Abrechnung, solange die
    Funktion auf I/O wartet. Was bleibt, ist der SLOT, nicht die Rechenzeit. PROVENIENZ
    dieser Präzisierung: Anbieter-Doku vom 2026-08-06, KEINE eigene Messung.
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
Launch-Blocker, sequenziert nach dem Moment, in dem das Risiko real BEISST (nicht alles ist
P0). Diese Datei trägt die Tier-Übersicht: pro Item Tragende Kontrolle + BINDET-AN.
VOLLFASSUNG (die vier Begründungsfelder je Item — RISIKO / TRAGENDE KONTROLLE / EHRLICHE
EINORDNUNG / BINDET-AN): docs/claude-history/security-manifest-full.md.
DER STATUS JE ITEM STEHT IN BEIDEN FASSUNGEN UND MUSS DECKUNGSGLEICH SEIN. Er ist NICHT
das Unterscheidungsmerkmal — die Regel "beide Fassungen IMMER im selben Commit ändern" ist
genau der Mechanismus, der die Deckungsgleichheit sichert, keine Formsache. Sie ist einmal
verletzt worden: der KILL-SWITCH stand in der Vollfassung als offener Blocker, während er
längst gebaut und live verifiziert war.
WAS DIE FASSUNGEN UNTERSCHEIDET — die Aufteilung ist NICHT "kompakt vs. voll": DIESE Datei
trägt zusätzlich die OPERATIVEN ARTEFAKTE für den Ernstfall (das SQL-Runbook zum Sperren/
Entsperren/Auflisten, die Verifikations-Lektionen, die offenen Betriebs-Punkte), weil
CLAUDE.md jede Session geladen ist und im Ernstfall ohne Suchen auffindbar sein muss. Die
VOLLFASSUNG trägt die vier Begründungsfelder je Item.

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
  ZWEI ACHSEN, ZWEI PRÜFUNGEN (ergänzt 2026-07-29): SERVE antwortet 451 mit Erklärseite,
  INGEST antwortet leer mit 204 — beides ist korrekt und beides ist DERSELBE Kill-Switch.
  In Live-Test-Anleitungen gehören sie als ZWEI getrennte Prüfungen aufgeführt, sonst liest
  sich das erwartete 204 wie ein fehlendes 451. Anlass: die zusammengezogene Formulierung
  hat jetzt in ZWEI Phasen den Verdacht eines Bugs erzeugt, obwohl das Verhalten korrekt
  ist. Der Sachverhalt selbst steht oben — neu ist nur die Auflage an die Anleitung.
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
- E-MAIL-BESTÄTIGUNG wieder aktiv: Double-Opt-in in Supabase Auth (Dashboard-Toggle).
  BINDET-AN: öffentlicher Launch.
- KOSTEN-CIRCUIT-BREAKER: SUPABASE ERLEDIGT (2026-07-29, mit dem Pro-Wechsel: Spend Cap $25
  HART, Alarm bei 80 %). VERCEL bleibt HOBBY und deckelt damit weiterhin STRUKTURELL — kein
  Überverbrauch, kein abrechenbarer Eskalationsweg, der Schaden wäre ein harter Stopp statt
  einer Rechnung. KEIN pauschales "erledigt" über beide Plattformen: der Trigger ist genau
  dort eingetreten, wo der Plan gewechselt hat. WIEDERVORLAGE: sobald Vercel auf Pro geht,
  wird der Cap dort SOFORT fällig — dann kippt die strukturelle Deckelung, die ihn heute
  ersetzt.
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
- SAFE-BROWSING: Redirect-ZIEL-URLs gegen Safe Browsing prüfen + publayer.net-Flag
  überwachen (KEIN HTML-Content-Scan, Kategoriefehler). BINDET-AN: Fremd-Content live.
- SHARED-REPUTATION publayer.net: Kill-Switch zur Isolierung + riskante Nutzer auf
  Custom-Domains (eigener eTLD+1) schieben. BINDET-AN: Multi-Tenant-Serving live;
  mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION: ERLEDIGT (2026-07-29, mit dem Pro-Wechsel aktiviert —
  Supabase-HaveIBeenPwned-Abgleich läuft). War Pro-gated; der Trigger "Pro-Tier" ist
  eingetreten und wurde im selben Zug abgearbeitet.
- ENCRYPTION-AT-REST CAPI-Token: tragend bleibt Isolation + RLS-SELECT-Sperre +
  service_role-only (Token physisch write-only); Verschlüsselung nur Defense-in-Depth
  (In-DB-Key = Theater, echtes Envelope braucht KMS). BINDET-AN: Härtung nach Launch.
- VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG: Token minimal scopen + jede
  Domain-Mutation mit Actor + Zeit protokollieren. BINDET-AN: 7c-2.
- META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK (eingestuft 2026-08-10, zuvor ohne Stufe;
  OFFEN): describeMetaError (src/lib/capi/meta-forward.ts) loggt Fremdtext aus der
  Anbieter-Antwort — darin kann das gesendete Zugangsdatum zurückgespiegelt sein.
  BINDET-AN: das erste Projekt mit hinterlegtem Zugangsdatum.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- LOGGING-LEAK (herabgestuft von Tier 0, gemessen 2026-07-24): In PRODUKTION wird das
  setCapiToken-Server-Action-Argument NICHT geloggt — Differenztest in Vercel-Prod-Logs mit
  Positivkontrolle (POST-Zeilen zum Aufrufzeitpunkt vorhanden, Aufruf lief durch), die Token-Sonde
  taucht in KEINER Zeile auf; Log-Drains sind Pro-gated und keine konfiguriert -> Logs verlassen
  Vercel nicht. Die 2a-Beobachtung war das Dev-Terminal (next dev). KEINE Token-Rotation nötig. Der
  strukturelle Fix (Token nicht als Action-Argument) bleibt Defense-in-Depth. Restrisiken:
  Fehlerpfad ungetestet, lokales Dev-Terminal. BINDET-AN: laufend (Defense-in-Depth), nicht mehr
  Launch-Gate. WIEDERVORLAGE: Der Befund gilt für den HEUTIGEN Code — setCapiToken ist die EINZIGE
  Server Action mit Secret-Parameter (erhoben 2026-07-24). Bei JEDER neuen Server Action mit
  Secret-Parameter neu bewerten.
- DEPENDABOT: ERLEDIGT (2026-07-24: Alerts, Security Updates, Dependency Graph aktiv, 1 Regel).
- DEPENDABOT-MELDUNGEN OFFEN, NICHT GESICHTET (2026-08-13): Auf dem Default-Branch stehen
  ZEHN Verwundbarkeits-Meldungen, davon ACHT hoch und zwei mittel. HERKUNFT: die
  Push-Ausgabe von GitHub, dreimal am 2026-08-13 identisch. AUSDRÜCKLICH: Die Meldungen
  sind NICHT bewertet — weder auf Erreichbarkeit noch auf Ausnutzbarkeit noch darauf, ob
  eine davon Produktivcode betrifft. WARUM ALS EIGENER EINTRAG NEBEN DEM OBEN: Jener ist
  als Aussage über die AKTIVIERUNG richtig und bleibt es; ein Leser schliesst aus
  "ERLEDIGT" aber auf "nichts offen", und genau das trifft nicht zu.
  BINDET-AN: zu bestimmen, sobald die Meldungen gesichtet sind — die Einstufung verlangt
  eine Bewertung, die niemand vorgenommen hat, und ein erfundener Zeitpunkt wäre schlimmer
  als keiner.
- BACKUPS + Restore-Drill (TEILWEISE ERLEDIGT — Backup-Tier steht, DRILL WEITERHIN OFFEN):
  BACKUP-TIER BESTÄTIGT (2026-07-29): Supabase auf PRO -> TÄGLICHE Backups, 7 Tage Retention.
  Die frühere Einordnung "Free hat GAR KEINE Backups" ist überholt und wurde ersetzt, nicht
  nur ergänzt.
  DREI DINGE BLEIBEN OFFEN — sie sind der Grund, warum der Punkt nicht abgehakt wird:
  (1) DER DRILL IST NICHT GEFAHREN. Ein ungetestetes Backup ist kein Backup; ein Backup-Tier
      zu BUCHEN und einen Restore zu KÖNNEN sind zwei verschiedene Aussagen.
  (2) PITR IST NICHT GEBUCHT -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem letzten
      täglichen Snapshot). Bewusste Entscheidung; sie muss aber SICHTBAR bleiben, sonst liest
      sich "tägliche Backups" wie Lückenlosigkeit.
  (3) DIE ensure_rls-REBUILD-LÜCKE BESTEHT UNVERÄNDERT: der Event-Trigger hängt am CLUSTER und
      steckt in keinem Schema-Dump — das Upgrade ändert daran nichts (s. "## Offene Punkte").
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
  ÜBERHOLT, HISTORISCH: der manuelle pg_dump war die ZWISCHENLÖSUNG für den Free-Zustand
  (Stand VOR 0018, damit nicht wiederherstellungstauglich). Er ist mit dem Pro-Wechsel kein
  tragender Bestandteil mehr — Details, Provenienz und der Wiedervorlage-Grundsatz stehen in
  der Vollfassung.
- DATA-RETENTION: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren; heute nur
  sicherstellen, dass Server-Logs keine IPs horten. BINDET-AN: Phase 8. — Präzisierung:
  Phase 8 Scheibe 1 löst die 30-Tage-Pflicht NICHT aus (es wird KEIN IP/UA persistiert); sie
  bindet erst an die Scheibe, die IP/UA einführt (Bot-Filter/Uniques). Heute NICHT fällig.
  WECHSELWIRKUNG fürs spätere events-Pruning: löscht ein Retention-/Aggregations-Pruning die
  ERSTE verankerte source='browser'-Bestätigung eines Projekts, springt der selbstheilende
  Stichtag der Adblocker-Verlustrate nach vorn -> die angezeigte Rate ändert sich RÜCKWIRKEND
  und STILL. Pruning muss die Verlustraten-Verankerung berücksichtigen.
- MCP-SICHERHEIT: scoped Tokens (nie globale Master-Rechte) + lückenloses Audit-Logging
  aller KI-induzierten Mutationen. BINDET-AN: Phase 18.

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

## Immer beachten — AUSGELAGERT nach docs/immer-beachten.md
Die rund achtzig dauerhaften Regeln dieses Projekts stehen seit dem 2026-08-14 in
docs/immer-beachten.md — ZEICHENGLEICH übernommen und per Prüfsumme belegt (der Nachweis
steht im Kopf jener Datei). Der Abschnitt ist NICHT gekürzt, NICHT verdichtet und NICHT
umsortiert worden; er ist umgezogen, weil diese Datei bei 149 970 von 150 000 Bytes stand
und die nächste Hebung nicht mehr hineingepasst hätte.
PFLICHT, KEINE EMPFEHLUNG — UND AUSDRÜCKLICH KEIN AUSLÖSER: docs/immer-beachten.md WIRD
IN JEDER SITZUNG GELADEN, unbedingt, genau wie diese Datei hier. Wer ohne sie arbeitet,
arbeitet ohne rund achtzig Regeln — und merkt es nicht, weil nichts fehlt, wonach man
suchen würde.
DAS GATE, und ohne es ist der Satz darüber ein Ehrenwort: Jene Datei trägt in ihrer
ERSTEN Zeile die Marke IB-GELADEN. Die Instanz nennt in ihrer Umfangs-Ansage DIESE MARKE
UND DIE ÜBERSCHRIFT DER LETZTEN REGEL der Datei. Fehlt eines von beidem, ist die Datei
nicht geladen — sichtbar statt erschlossen.
WARUM DIE ZWEITE HÄLFTE UND WARUM SIE HIER NICHT STEHT: Die Marke selbst steht in diesem
Stub und liesse sich von hier abschreiben, ohne die Datei je zu öffnen — das Gate wäre
trivial wahr. DIESER STUB NENNT DIE LETZTE REGELÜBERSCHRIFT DESHALB NICHT. Sie steht
ausschliesslich am ENDE jener Datei, sie ändert sich mit jeder angefügten Regel, und sie
ist nur zu beantworten, wenn man dort war.
ABGRENZUNG ZU DEN AUSLÖSER-GELADENEN DATEIEN, damit niemand die Klassen zusammenzieht:
docs/db-stand.md und docs/db-regeln.md laden bei einer Migration oder einem Eingriff in
Schema, Policies, RPCs oder den Analytics-Lesepfad; docs/claude-history/security-manifest-full.md
bei Manifest-Arbeit; die Phasen-Historien für das WARUM einer Regel. Sie werden
aufgeschlagen, WENN ihr Fall eintritt. docs/immer-beachten.md lädt OHNE Auslöser. Wer
beides gleich behandelt, macht aus einer unbedingten Pflicht eine bedingte — und dann
fehlen achtzig Regeln genau dann, wenn niemand einen Auslöser erkannt hat.

## Aktive Dokumente (nicht geladen, nicht Teil des CC-Kontexts)
Aktiv und konstant gepflegt — im Unterschied zum Detail-Archiv darunter, das
ABGESCHLOSSENE Historie trägt. Hier steht, was fortlaufend gilt, aber bewusst
nicht in jede Session geladen wird.
- docs/arbeitsweise.md — Arbeits- und Prompt-Disziplin (Kadenz, Stufen,
  Nachweisführung, Phasenende-Ablauf). VOM ARCHITEKTEN GEPFLEGT und NICHT Teil
  des CC-Kontexts: CC bekommt sie nicht automatisch und soll sie nicht lesen; sie
  beschreibt, WIE Aufträge entstehen, nicht was gebaut wird. Die CLAUDE.md
  verweist an einer Stelle auf sie ("## Aktiver Stand — Verfahren ab Phase 10").
- docs/db-stand.md — der gemessene Ist-Zustand von DB und Analytics-Lesepfad
  (Migrationsstand, Tabellen, Policies, Grants, Spalten, Constraints, Indizes,
  Funktionen, Event-Trigger, Backups). Am 2026-08-11 aus dieser Datei ausgelagert,
  zeichengleich. PFLICHTLEKTÜRE VOR jeder Migration und vor jedem Eingriff in Schema,
  Policies, RPCs oder den Analytics-Lesepfad — die Auflage steht oben unter
  "## Aktueller DB-/Analytics-Stand — AUSGELAGERT nach docs/db-stand.md".
  Fortgeschrieben wird sie ausschliesslich aus einer Messung (Probe:
  supabase/checks/db-stand.sql), nie aus den Migrationsdateien.

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
- docs/claude-history/phase-6-capi.md — Server-Side Tracking / Meta-CAPI
  (Secret-Storage, Dedup-Beacon, alle Debug-Lektionen).
- docs/claude-history/phase-7-hosting.md — Hosting/Go-Live inkl. XFH-Gate-Vollbeweis
  und der kompletten 7c-2-Familie (Wildcard-Infra, Add-Domain-Mutation,
  DNS-Anweisungs-UX, Entfernen). DORT stehen auch die Hosting-Ops-Details, die
  bewusst NICHT in der Root liegen: Registrierungs-Rate-Limit (5/Stunde/User),
  Support-Playbooks für CAA-Records und Metas Traffic-Permissions-Allow-List, die
  Vercel-Fehler-Mappings (409 domain_already_in_use -> Heilung) und das
  Verification-vs-Configuration-Statusmodell. Bei Domain-/DNS-Support-Fragen zuerst hier
  nachsehen.
- docs/claude-history/phase-8-analytics.md — GESAMTE gebaute Phase 8 (Analytics-
  Persistenz, CAPI-Härtung, Kill-Switch im Ingest, tracking_key-Spalte, PageView-Emitter,
  Read-Pfad/owner-SELECT-RLS, Adblocker-Verlustrate): volle Herleitung, Entscheidungen,
  Tests, Live-Verifikation je Scheibe. Der aktive Ist-Stand steht in
  docs/db-stand.md, nicht hier.
- docs/claude-history/phase-9-ab-testing.md — GESAMTE gebaute Phase 9
  (A/B-Testing: Varianten-Authoring, Split in der Serve-Route + Cookie,
  variant in Ingest und Persist, Auswertung je Variante, Lauf-Abgrenzung);
  dazu die zwei mitgereisten Nicht-A/B-Scheiben Fix-Scheibe safeAction
  (Client-Fehlerbehandlung) und Leere-Variante-Riegel (Publish verweigert
  leeren Inhalt). Der aktive Ist-Stand steht in docs/db-stand.md bzw. in
  "## Offene Punkte", nicht hier.
- docs/claude-history/phase-10-workspace.md — GESAMTE gebaute Phase 10
  (Workspace-Reorganisation: Bereiche MESSEN und VERÖFFENTLICHEN extrahiert,
  Einstellungen als Drawer mit Bereichs-Reitern, Projektwechsel als Mount-Grenze,
  Zustandssignal an der Reiterzeile, Statuskanal des Drawers). Trägt zusätzlich
  die verworfenen Alternativen (eigene Routen, Accordion, Modal) und die
  Invarianten der Phase. Die 17 dauerhaften Regeln daraus stehen in
  docs/immer-beachten.md und werden dort NICHT wiederholt; die Datei nennt im
  Kopf, welche das sind.
- docs/claude-history/phase-11-multi-tracking.md — GESAMTE gebaute Phase 11
  (Multi-Tracking / Server-Side Fan-Out). Trägt den Einstiegs-Block für die nächste
  Sitzung (was erreicht ist, was offen bleibt, die sechs weitergeltenden Auflagen),
  das beschlossene Consent-Modell, die Anbieter-Befunde zum zweiten Ziel, den
  Arbeitsvorrat am ersten Adapter und die verschobene dreizehnte Scheibe.
  DIES IST DIE FASSUNG, DIE GELESEN WIRD.
- docs/claude-history/phase-11-multi-tracking-aktiver-stand.md — der STEUERNDE Stand
  derselben Phase (bis zum Phasenende docs/aktiver-stand.md), archiviert: zwölf
  Scheiben-Protokolle, die über ihre Scheibe hinaus bindenden Entscheidungen, der Vorrat
  und das Protokoll der Hebung.
- docs/claude-history/phase-11-multi-tracking-rohfassung.md — die ROHFASSUNG derselben
  Phase: der ungekürzte Arbeitsstand, wie er WÄHREND des Baus geführt wurde,
  zeichengleich verschoben. NICHT der Einstieg — der ist die kuratierte Datei darüber.
  AUFSCHLAGEN, WENN MAN DORT ETWAS VERMISST: die Kuration war eine Auswahl, und diese
  Datei ist der Rückfall für den Fall, dass dabei etwas übersehen wurde. Wird NICHT
  gepflegt; ihre Zeiger sind tot oder werden es.
  WAS BEI DER KURATION VERLORENGING — ZWEIMAL IN FOLGE GENAU DIE TRAGENDE AUSSAGE: der
  LinkedIn-Befund (g)/(h) und der namentliche Einspruch gegen die Roadmap-Formulierung
  "additive Fan-Out-Ziele", der ACHT TAGE unbeachtet blieb. Beide standen NUR hier. Das
  ist ein Befund über das KURATIONS-KRITERIUM, nicht über diese Datei — wer eine Phase
  kuriert, prüft, ob das Weggelassene irgendwo eine Entscheidung getragen hätte.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 18 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
- supabase/checks/ — versionierte, NUR LESENDE Messproben für Live-Tests und Gegenproben.
  KEIN Migrationsverzeichnis, wird nie automatisch angewandt. VOR jeder handgetippten
  Prüf-Query dort nachsehen (dort steht auch, welche Fallen eine Probe hat — z.B. der
  custom_host-Filter bei der Domain-Divergenz). Details: README im Ordner.
