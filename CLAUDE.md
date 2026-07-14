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
- [~] Phase 7 — Hosting & Go-Live: IN ARBEIT.
      [x] Scheibe 7a — Serving auf *.pgsm.site, Label-Lookup, isolierte Origin —
          ABGESCHLOSSEN (live).
      [x] Scheibe 7b — First-Party-Ingest /api/e, chirurgischer Passthrough —
          ABGESCHLOSSEN (live). /api/e ist der neutrale Trichter, in den sich Phase 8
          additiv einhängt. KEIN Cheerio (Revision, siehe 7b-Block unten).
      [~] Scheibe 7c — Custom-Domains + Auto-SSL via Vercel Domains API. Vier Sub-Scheiben:
          [x] 7c-1 Serving-Kern — VOLLSTÄNDIG (Middleware-Inversion "ist
              APP-Host?" + custom_host-Modell + Custom-Host-Serving + /api/e-
              Passthrough am Serving-Zweig; byLabel + byCustomHost servieren
              published_content, App unberührt, Port-Strip + sauberer 404
              verifiziert). XFH-Trust-Boundary in Prod BEWIESEN (Vercel-Preview,
              Gate GO): Vercels Edge überschreibt client-gefälschten
              x-forwarded-host mit dem echten Host.
          [~] 7c-2 Custom-Domains via Vercel-Domains-API:
              [x] 7c-2a Serving-Domain publayer.net live: Nameserver-Delegation an Vercel,
                  Wildcard-Cert aktiv, NEXT_PUBLIC_HOSTING_DOMAIN env-gekoppelt (buildLiveUrl +
                  servingSuffixes, eine Quelle der Wahrheit), Prod-Serving-Zweig end-to-end
                  LIVE VERIFIZIERT (https://<label>.publayer.net servt published_content).
              [ ] 7c-2b Custom-Domain-API-Mutation (server-only Vercel-Token, Add-Domain als
                  reine Fn mit Ownership-Gate + Per-User-Cap, dynamische DNS-Anweisungen,
                  Mutations-Audit-Log) — geplant. VORHER: Kill-Switch (Manifest Tier 0).
              [ ] 7c-2c Verify/Status-Polling (verified/misconfigured) + UX — geplant.
              [x] 7c-4 Phase-6-Dedup-Sichtbarkeit auf echter Domain (Kirsche) — BEWIESEN
                  auf publayer.net: Browser-Event UND Server-Event mit IDENTISCHER eventID,
                  beide "Verarbeitet", ~3 Sekunden auseinander. Auf lvh.me strukturell nie
                  möglich (nie eine echt verknüpfte Domain) — jetzt live bestätigt.
      Details in der Phase-7c-Sektion unten. ACHTUNG: härtester Brocken (Multi-Tenant
      Custom Domains + Auto-SSL); schaltet zugleich die Funnel-Vision frei. (war Phase 6)
- [ ] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
      (Traffic-Gesundheit, ROI/Attribution, Betreiber-Metriken) + Adblocker-Verlustrate
      über geteilte-eventID-Vergleich ECHTER Events. Detail-Sektion unten. (war A/B-Testing)
- [ ] Phase 9 — A/B-Testing: 50/50-Split über Edge-Logik. (war Phase 8)
- [ ] Phase 10 — AI-Native: Pagesmith MCP-Server. (Detail unter Zukunfts-Vision, war Phase 9)


## Aktiver Stand — Phase 7c-2 (Custom-Domains, in Arbeit)
Nur der offene/aktive Teil. Vollständige 7a/7b/7c-1-Historie, 7c-Konzept mit allen
Entscheidungen und der XFH-Gate-Vollbeweis: docs/claude-history/phase-7-hosting.md.

- GATE ERLEDIGT (GO): Die x-forwarded-host-Trust-Boundary ist auf einem echten
  Vercel-Preview BEWIESEN — Vercels Edge überschreibt einen client-gefälschten
  x-forwarded-host mit dem echten Host (die Vercel-Doku schwieg dazu -> getestet, nicht
  angenommen). resolveEffectiveHost (Präzedenz x-forwarded-host zuerst) steht damit in
  Prod sicher; kein Host-Spoof-Auth-Bypass. Der Wegwerf-Probe wurde wieder entfernt.
- 7c-1 (Serving-Kern) LOKAL vollständig, Pipeline grün (269 Tests): Middleware-Inversion
  "ist APP-Host?" (Allowlist inkl. *.vercel.app; alles andere -> Serving-Zweig), additive
  Migration 0007 (domains.custom_host nullbar + partial-unique), byLabel UND byCustomHost
  servieren published_content, /api/e|/api/capi-Passthrough greift auch für Custom-Domains.
- NÄCHSTER SCHRITT — 7c-2 Vercel-Anbindung: Add-Domain-Mutation als reine
  (userId, params)-Funktion (Ownership-Gate DAVOR, heiligstes-Gate-Muster), server-only
  Vercel-API-Token (import "server-only", nur .env.local, nie committet), DNS-Anweisungen
  fallweise (Apex -> A-Record / Subdomain -> CNAME; exakte Werte gegen die AKTUELLE
  Vercel-Doku pinnen, nicht aus dem Gedächtnis), Per-User-Hard-Cap VOR dem Vercel-Call.
  Danach 7c-3 (Verify- vs Configuration-Status-Polling + UX), 7c-4 (Phase-6-Dedup-
  Sichtbarkeit auf echter verknüpfter Domain).
- OPS-STAND (Team-Gedächtnis): 7b + 7c-1 (+ Gate-Cleanup) liegen auf Branch
  gate/7c-2-xfh; main ist DAHINTER (kennt weder 7b noch 7c-1). Ein überlegtes Release
  nach main steht als eigene Entscheidung an (KEIN Gate-Nebeneffekt, bewusst nicht
  mit-gemerged) — vor 7c-2-Bau bzw. Prod-Nutzung klären.

### 7c-2 — Entscheidungen (Vercel-Domains-API)
- ZWEI GETRENNTE FLOWS (nicht verwechseln): (a) *.pgsm.site = UNSERE
  Wildcard-Serving-Domain -> MUSS per Nameserver-Delegation an Vercel (das
  Wildcard-Cert braucht DNS-Kontrolle bei Vercel); (b) Kunden-Custom-Domains =
  Apex (A-Record) / Subdomain (CNAME, PROJEKTSPEZIFISCHER Wert) bzw.
  TXT-Besitznachweis, falls die Domain schon auf einem anderen Vercel-Account liegt.
- PLAN: Hobby fürs MVP. Hobby deckelt bei 50 Custom-Domains PRO PROJEKT, geteilt über
  ALLE Kunden -> der Per-User-Cap hat DOPPELrolle (Abuse-Schutz + Schutz der geteilten
  Decke); MVP-Richtwert 3/User. Pro-Upgrade VOR echter Skalierung.
- DNS-WERTE dynamisch aus Vercels Antwort/Config PRO DOMAIN lesen, NIE hardcoden
  (CNAME-Ziel ist projektspezifisch; auch die Wildcard-Nameserver EXAKT aus dem
  Vercel-Dashboard nehmen, nicht generische ns1/ns2 annehmen).
- TOKEN-EHRLICHKEIT: Vercel-Tokens sind team-scoped, KEIN per-Endpoint-Scope auf unserem
  Tier. "Maximal scoped" = dedizierter Team-Token, server-only wie service_role, PLUS
  eigenes Mutations-Audit-Log als tragende Kontrolle (Defense-in-Depth-Ehrlichkeit).
- VERIFICATION vs CONFIGURATION bestätigt: die API liefert `verified` (Besitz) +
  `misconfigured` (DNS/Cert) getrennt -> das Zwei-Zustand-Statusmodell war richtig.
- 7c-2a KONKRET (nächster Schritt): pgsm.site-Nameserver auf die von Vercel angezeigten
  umstellen; pgsm.site (Apex) + *.pgsm.site (Wildcard) im Projekt anlegen. Reversibel;
  pgsm.site hat aktuell keine Records -> saubere Delegation. Live-URL-Bau muss
  env-abhängig sein (Dev <label>.lvh.me:3000 / Prod <label>.pgsm.site). pagesmith.app
  bleibt UNBERÜHRT.
- SERVING-DOMAIN FINAL (gekauft): publayer.net (Apex + Wildcard *.publayer.net).
  ERSETZT den bisherigen Arbeitsnamen "pgsm.site" in diesem Block/der Roadmap — überall,
  wo oben pgsm.site steht, gilt jetzt publayer.net. Bewusst GETRENNT von der Brand-/App-
  Domain -> Shared-Reputation-Blast-Radius eingedämmt (Security-Manifest): wird eine
  Kundenseite geflaggt, bleibt die App-/Marken-Domain unberührt.
- Wildcard *.publayer.net erzwingt NAMESERVER-DELEGATION an Vercel (das Wildcard-Cert
  braucht DNS-Kontrolle bei Vercel). Die Nameserver EXAKT aus dem Vercel-Dashboard
  nehmen, nie generisch (ns1/ns2) annehmen.
- FALLSTRICK (build-zeit-inlined): NEXT_PUBLIC_HOSTING_DOMAIN wird zur BUILD-ZEIT ins
  Client-Bundle inlined -> die env in Vercel zu setzen reicht NICHT, es braucht einen
  REDEPLOY. Sonst trägt das Bundle still den alten Wert (Live-Link fehlt, OHNE
  Fehlermeldung).
- BRAND-/APP-DOMAIN weiterhin OFFEN -> isAppHost trägt pagesmith.app als PLATZHALTER.
  Beim Brand-Domain-Kauf in EINEM überlegten Schritt umstellen (isAppHost-Allowlist +
  NEXT_PUBLIC_APP_URL + Doku). OFFENER PUNKT — nicht vergessen.
- SHARED-REPUTATION wird mit 7c-2a live -> Kill-Switch (Manifest Tier 0) vor 7c-2b
  einplanen.
- 7c-2a ABGESCHLOSSEN — publayer.net LIVE, Prod-Serving bewiesen:
- SERVING-DOMAIN final: publayer.net (Apex + Wildcard), gekauft UND live. Getrennt von
  der weiterhin offenen Brand-/App-Domain (Platzhalter pagesmith.app in isAppHost bleibt
  vorerst bestehen -> offener Punkt für später).
- BEWIESEN in Prod: der komplette Serving-Zweig (Middleware-Inversion -> Rewrite ->
  Serve-Route -> servingSuffixes -> published_content) läuft über die echte HTTPS-Domain,
  nicht nur lokal simuliert. Schließt die letzte aus 7c-1 offen gebliebene
  Verifikationslücke (Serving war in Prod vorher nicht erreichbar, da keine echte
  Serving-Domain existierte).
- STOLPERSTEIN (Lektion, bleibt stehen): NEXT_PUBLIC_-Variablen sind BUILD-ZEIT-inlined.
  Env in Vercel setzen OHNE Redeploy ändert das laufende Bundle NICHT -> nach jeder
  Änderung an NEXT_PUBLIC_HOSTING_DOMAIN ist ein REDEPLOY PFLICHT.
- CODE-FIX unterwegs entdeckt & behoben: SERVING_SUFFIXES war hardcoded
  (.pgsm.site/.lvh.me), NICHT env-gekoppelt -> hätte auf publayer.net STILL 404 erzeugt
  (extractLabel=null -> falscher Dispatch auf byCustomHost). Auf EINE Quelle vereinheitlicht
  (servingSuffixes() aus NEXT_PUBLIC_HOSTING_DOMAIN), .lvh.me bleibt hart codierter
  env-unabhängiger Dev-Fallback; Härtung gegen Tippfehler (führende Punkte/trailing
  slash/Whitespace); Dispatch-Guard-Test gegen Rückfall.
- NEBENFUND (separater offener Punkt, KEIN 7c-2a-Blocker): beim Live-Test feuerte der
  CLIENT-seitige fbq-Pixel-Call für Purchase-Events NICHT (kein Netzwerk-Request im
  Browser), während der SERVER-CAPI-Pfad einwandfrei läuft (Meta Events Manager zeigt
  "Kauf"-Events, Quelle "Server", korrekt verarbeitet, mehrfach bestätigt). Dedup
  (Browser+Server, gleiche eventID) daher NOCH NICHT bewiesen -> aktuell nichts zu
  deduplizieren, da nur eine Quelle ankommt. Eigene kleine Untersuchung, nicht Teil von
  7c-2a.
- NEBENFUND AUFGELÖST: Der Client-Pixel feuerte nicht, weil META SELBST das Event ablehnte
  (Browser-Konsole: "is unavailable on this website due to it's traffic permission
  settings"), NICHT wegen Adblocker oder Code-Bug. fbevents.js lud sauber (Status 200) und
  der generierte fbq('track','Purchase',…)-Call war korrekt verdrahtet (Selector-Match,
  value als Zahl, MODE=export). Ursache: Metas "Traffic Permissions"-Allow-List auf dem
  Pixel-Konto enthielt publayer.net nicht -> Meta verwarf das Browser-Event lautlos. KEIN
  Code-Fix nötig — die Ursache lag vollständig im Meta-Business-Konto. CAPI (server-seitig,
  per Access-Token authentifiziert) unterliegt dieser Traffic-Permission NICHT, deshalb
  liefen die Server-Events durchgehend korrekt. NACH Eintragen von publayer.net in die
  Allow-List: Client-Pixel feuert (tr/-Request, Status 200), Dedup funktioniert (siehe 7c-4).
- SUPPORT-/TROUBLESHOOTING-HINWEIS (Zukunft): Kunden mit einer aktiven Meta-Traffic-
  Permissions-Allow-List MÜSSEN ihre Pagesmith-Serving-Domain (publayer.net bzw. ihre
  Custom-Domain) dort eintragen, sonst bleiben Browser-Events lautlos aus, während CAPI
  weiterläuft — exakt dieses Symptom (Server-Events OK, Browser-Pixel stumm, Konsole meldet
  "traffic permission settings") ist ein KONTO-Setup-Punkt, KEIN Pagesmith-Bug.
- 7c-2a UND 7c-4 VOLLSTÄNDIG ABGESCHLOSSEN und live verifiziert auf publayer.net: alle fünf
  Bausteine bewiesen auf echter Domain — Serving, /api/e-Passthrough, Client-Pixel,
  Server-CAPI und Dedup (identische eventID, beide "Verarbeitet").
- NÄCHSTER SCHRITT: Kill-Switch (Security-Manifest Tier 0) VOR 7c-2b — ab jetzt servieren
  echte Domains öffentlich, das Shared-Reputation-Risiko ist REAL (nicht mehr theoretisch).

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
- KILL-SWITCH (höchste Prio): blocked-Flag auf domains-Zeile, das die Serve-Route VOR dem
  Ausliefern prüft (451/410). BINDET-AN: Serving existiert (7a/7c-1) -> ab sofort baubar,
  vor erstem Fremd-Traffic.
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
- Erst der nutzbare Kern, dann Infrastruktur.
- Importierter User-Code läuft NUR im sandboxed iframe (sandbox="allow-scripts",
  niemals allow-same-origin), nie ungesandboxt.
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits in freier
  Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL fest eingebacken
  und beaconen weiter dorthin. Neue Exporte/gehostete Seiten nutzen /api/e (geteilter
  Handler, lib/capi/ingest.ts). Entfernen der capi-Route bricht STILL das Tracking aller
  schon ausgelieferten Kundenseiten (kein Fehler, nur verschwundene Conversions).
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
  + XFH-Gate-Vollbeweis (die aktive 7c-2-Kurzfassung steht oben im Root).
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 10 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten (Polish-Liste).
