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
      funktionieren, nicht nur lokal. Details in der Phase-7c-Sektion unten +
      docs/claude-history/phase-7-hosting.md. (war Phase 6)
- [ ] Phase 8 — Analytics & ROI-Ökosystem (Vision): First-Party-Server-Side-Analytics
      (Traffic-Gesundheit, ROI/Attribution, Betreiber-Metriken) + Adblocker-Verlustrate
      über geteilte-eventID-Vergleich ECHTER Events. Detail-Sektion unten. (war A/B-Testing) — Scheibe 1 (Persistenz-Fundament) im Konzept festgezurrt, s. Aktiver-Stand-Sektion.
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

### 7c-2b — Add-Domain-Mutation: Konzept & Entscheidungen
- SCOPE DIESER SCHEIBE: NUR die Add-Domain-Mutation selbst (Vercel-Call + Persistenz +
  Ownership-Gate + Per-User-Cap + Rate-Limit + Audit-Log). Verify/Status-Polling + die
  dazugehörige UX (DNS-Anweisungen anzeigen, verified/misconfigured-Status) bleibt bewusst
  7c-2c — gleiche Schnittführung wie ursprünglich geplant, nicht aufgeweicht. Grund: eine
  Scheibe bleibt demobar und prüfbar, wenn sie EINE Verantwortung trägt; Mutation und
  Status-Polling sind zwei getrennte Zustandsmaschinen und werden nicht vermischt.
- SELBST-KORREKTUR (Ehrlichkeit vor Bequemlichkeit): Die frühere Aussage "Vercel-Tokens
  sind team-scoped, kein per-Endpoint-Scope" (oben im 7c-2-Entscheidungsblock unter
  TOKEN-EHRLICHKEIT) war eine UNVERIFIZIERTE Annahme aus der ersten 7c-2-Konzeptphase — bei
  Nachprüfung zeigt Vercels aktuelle CLI-Doku, dass projekt-gebundene Tokens inzwischen
  existieren (vercel tokens create kann einen Token erzeugen, der nur auf EIN Projekt wirkt,
  reduziert Blast-Radius bei Leak). ENTSCHEIDUNG: projekt-gebundener Token wird verwendet
  (Least-Privilege, Security-Manifest-konform). Exakte CLI-Syntax beim Bau gegen die AKTUELLE
  Vercel-Doku prüfen, NICHT aus dieser Doku-Zeile übernehmen (Config-Fakten veralten).
- ZWEI-ZUSTAND-MODELL EMPIRISCH BESTÄTIGT (nicht nur theoretisch): Ein Vercel-Community-
  Bericht zeigt, dass die POST-Antwort beim Domain-Hinzufügen `verified: true` liefern kann,
  OBWOHL die DNS-Konfiguration noch nicht steht. Das `verified`-Feld aus der Add-Response ist
  damit NICHT vertrauenswürdig für den echten Status — nur der separate GET-Config-Check
  (misconfigured-Feld, Teil von 7c-2c) ist die verlässliche Quelle. Rechtfertigt rückwirkend
  das von Anfang an geplante Zwei-Zustand-Modell (Verification vs. Configuration).
- DOMAIN-NORMALISIERUNG (vor JEDEM weiteren Schritt: Ownership-Gate, Cap, Vercel-Call):
  Trim, lowercase, Protokoll (http://, https://) und trailing slash strippen. HARTE GRENZEN
  (Normalisieren ≠ Umdeuten): KEIN automatisches Strippen von "www." — www.kunde.de und
  kunde.de sind zwei verschiedene DNS-Einträge mit unterschiedlichen Anweisungen (CNAME vs.
  A-Record), die Nutzer-Eingabe muss unverändert durchgereicht werden. Führende
  "*."-Wildcard-Präfixe werden HART ABGELEHNT (das ist ein legitimer Use-Case für UNSERE
  Serving-Domain, kein Use-Case für eine einzelne Kunden-Landingpage). Lokale Regex ist nur
  ein billiger Vorfilter gegen offensichtlichen Unsinn/Injection (Leerzeichen, Sonderzeichen,
  ".."), NICHT der Wahrheits-Anker für Domain-Gültigkeit — die eigentliche Autorität bleibt
  Vercels eigene 400-Antwort. IDN/Umlaut-Domains sind eine bekannte, bewusst nicht behandelte
  Lücke (nicht jetzt lösen, nur vermerkt).
- FEHLER-MAPPING — EMPIRISCH KORRIGIERT (ursprünglicher Plan sagte "400 = existiert bereits
  auf diesem Projekt -> Heilung"; das war eine unverifizierte Doku-Lesart, durch echten
  Doppel-Add-Call widerlegt): Der Owner-Retry (Domain existiert bereits auf UNSEREM Projekt)
  liefert real HTTP 409 mit error.code "domain_already_in_use", NICHT 400. Diskriminator:
  409 + error.code === "domain_already_in_use" + die im Body mitgelieferte projectId ===
  unsere VERCEL_PROJECT_ID -> HEILEN. Jedes andere 409 (fremdes Konto) -> Konflikt zeigen,
  NICHT heilen. Der dokumentierte 400 bleibt als generischer "Domain ungültig"-Fehler, ist
  aber NICHT mehr der Heilungsauslöser. 403 = kein Zugriff auf die Domain -> Fehler an Nutzer.
- VERIFIED:TRUE EMPIRISCH BESTÄTIGT WERTLOS: Live reproduziert — eine nie besessene, DNS-lose
  Domain lieferte beim Add sofort verified:true, keine Challenge. Bestätigt den
  Community-Befund aus der Konzeptphase als eigenes Beobachtungsergebnis, nicht nur zitierte
  Fremdquelle. Persistenz bleibt entsprechend: immer status:'pending'.
- IDEMPOTENZ & HEILUNG (eng begrenzt, KEINE allgemeine Sync-Engine): Wenn Vercel den oben
  korrigierten 409 (error.code "domain_already_in_use" + eigene projectId) meldet, weil die
  Domain bereits auf UNSEREM Projekt existiert (z.B. nach einer fehlgeschlagenen
  DB-Transaktion beim vorigen Versuch), holt derselbe Mutations-Aufruf den aktuellen
  Vercel-Zustand nach und schreibt/heilt die eigene DB-Zeile damit -> ein erneuter
  Add-Versuch des rechtmäßigen Owners wird NICHT blockiert. Das ist ein einziger, eng
  begrenzter Zweig INNERHALB der Mutation, kein Hintergrund-Job/Cron. Das tatsächliche
  Vercel-Verhalten ist inzwischen EMPIRISCH BESTÄTIGT (echter Doppel-Add gegen dieselbe
  Domain: Add #1 -> 200, Add #2 -> 409 "domain_already_in_use" mit eigener projectId im
  Body) — die Verzweigung wird auf diesen realen Diskriminator verdrahtet, nicht auf die
  ursprünglich vermutete 400-Lesart. Doku war Ausgangspunkt, Instrument war Beweis.
  RENNBEDINGUNG: zwei parallele Add-Versuche desselben Users werden vom bestehenden
  Partial-Unique-Index auf domains.custom_host (aus 7c-1) auf DB-Ebene gefangen; der Code
  behandelt diese Constraint-Verletzung als "parallel bereits geschrieben, aktuellen Stand
  neu lesen", NICHT als harten Absturz.
- RATE-LIMITING (erstes Rate-Limiting im gesamten Projekt, ehrlich als Netto-neue Arbeit
  behandelt — im Security-Manifest bisher nur für /api/e|/api/capi als "geplant" vermerkt,
  hier zuerst für die Domain-Mutation gebaut): KEINE zweite Zähl-Infrastruktur — nutzt das
  ohnehin verpflichtende Audit-Log (Actor + Zeitpunkt jeder Mutation) direkt als Datenquelle
  ("zähle Einträge dieses Users der letzten Stunde"). Kein Redis/Queue auf Verdacht
  (Skalierungs-Manifest-Prinzip). Zählt ALLE Versuche (auch abgelehnte: ungültige Domain,
  Cap erreicht, 409-Konflikt), nicht nur erfolgreiche — jeder Versuch kostet
  Aufmerksamkeit/API-Kontingent. Richtwert: max. 5 Registrierungsversuche/Stunde/User.
- VOLLSTÄNDIGE MUTATIONS-REIHENFOLGE (billig -> teuer sortiert):
  1. Ownership-Gate (gehört project_id dem userId?)
  2. Normalisierung + Formvalidierung (inkl. Wildcard-Ablehnung)
  3. Lokaler DB-Kollisionscheck (fremder Owner -> Fehler; eigener Owner bereits vorhanden ->
     Heilungspfad)
  4. Rate-Limit-Check (Audit-Log-Query)
  5. Per-User-Hard-Cap-Check (schützt Vercels/Hobby-Kontingent, wie in der 7c-2-
     Grundentscheidung verankert)
  6. Vercel-API-Call MIT striktem Timeout (Skalierungs-Manifest: jeder externe Call braucht
     ein Timeout)
  7. Fehler-Mapping (400-eigenes-Projekt -> heilen; 409 -> Konflikt zeigen; sonst ->
     generischer Fehler)
  8. Persistenz (custom_host + roher verification-Block aus Vercels Antwort, Status erstmal
     "pending" — NICHT aus dem unzuverlässigen verified-Flag abgeleitet) + Audit-Log-Eintrag
     (Actor + Zeit + Domain).
- 7c-2b ABGESCHLOSSEN — Add-Domain-Mutation gebaut UND live gegen echtes Vercel + echtes
  Supabase (publayer.net-Projekt) verifiziert. Pipeline grün (326 Tests, tsc, eslint,
  next build). Dateien: Migration 0009 (domains.{verification_status(+CHECK),verification,
  vercel_synced_at} + audit_logs, RLS OHNE jede Policy -> append-only, nur service_role);
  src/lib/domains/{normalize,audit,register}.ts; src/lib/vercel/client.ts;
  src/app/projects/domain-actions.ts (dünne "use server"-Session-Schicht); HOSTNAME_RE aus
  hosting/host.ts wiederverwendet.
- STRUKTUR (wie beschlossen): die reine (userId, params)-Mutation lebt in
  src/lib/domains/register.ts MIT `import "server-only"` und OHNE "use server" — sonst wäre
  der userId-Parameter eine client-wählbare Server-Action (Bypass). Die "use server"-Schicht
  (domain-actions) reicht nur die Session-userId herein; MCP (Phase 10) hängt sich mit
  EIGENER Autorisierung an denselben Eingang. Ownership-Gate = expliziter
  user_id-Vergleich via Admin-Client (session-unabhängig), KEIN privilegierter Write davor.
- LIVE-BEWEIS (drei Pfade, echte Infrastruktur): (1) neue Domain -> success, DB-Zeile
  verification_status='pending' (NICHT aus verified:true abgeleitet), verification=null
  (Vercel gab keine Challenge — deckt sich mit dem "verified:true wertlos"-Befund);
  (2) gleiche Domain erneut -> lokale Idempotenz already_registered_self (KEIN Vercel-Call,
  healed:false); (3) "lost transaction" simuliert (DB-Zeile gelöscht, Vercel behält Domain)
  -> 409 domain_already_in_use + eigene projectId -> HEILUNG healed:true, DB-Zeile
  nachgeholt. Audit-Verlauf exakt success -> already_registered_self -> healed, JE genau ein
  Eintrag pro Aufruf. Cleanup rückstandsfrei (Vercel 404, DB leer, Wegwerf-Route + temporäre
  Middleware-Test-Ausnahme rückgängig).
- OFFENE PUNKTE (bewusst, kein Blocker): vercel_synced_at wird beim Insert NOCH NICHT
  gesetzt (bleibt null) -> das schreibt der Config-Poll in 7c-2c. Der echte
  Verify/Configuration-Status (misconfigured) + die DNS-Anweisungs-UX bleiben 7c-2c
  (Scope gehalten). Der VERCEL_API_TOKEN ist projekt-gebunden (Least-Privilege, empirisch
  bestätigt: teamId für Lese-/Schreib-Calls nicht nötig -> wird nicht gesendet).
- NÄCHSTER SCHRITT: 7c-2c (Config-Status-Polling verified/misconfigured + DNS-Anweisungs-UX,
  setzt vercel_synced_at). Security-Manifest Tier 1: VERCEL-TOKEN-Scope + Domain-Mutations-
  Audit-Log ist mit dieser Scheibe erfüllt (Audit-Log gebaut, Token projekt-scoped).

### 7c-2c — DNS-Anweisungs-UX: Konzept & Entscheidungen
- ZIELGRUPPEN-CHARAKTER (prägt jede Entscheidung dieser Scheibe): Erste Scheibe im gesamten
  Projekt, deren primärer Nutzer NICHT der Betreiber, sondern der technisch unbedarfte
  Marketer ist — er muss bei seinem Registrar (IONOS, GoDaddy, Namecheap…) ohne Hilfe die
  richtigen DNS-Zeilen eintragen. Erfolg misst sich daran, ob das OHNE Support-Rückfrage
  gelingt, nicht nur daran, dass der Code funktioniert.
- SCOPE DIESER SCHEIBE: DNS-Records anzeigen (dynamisch aus Vercel, nie hardcoded) +
  Status-Check/Refresh + verständliche, abgeleitete Fehlerzustände. AUSSERHALB des Scopes:
  die POST-.../verify-TXT-Challenge für den Fall "Domain liegt auf fremdem Vercel-Account"
  (Randfall, eigene Scheibe falls je gebraucht); jegliche automatische Serving-Umschaltung
  (bereits durch 7c-1-Middleware-Inversion + 7c-2a-Custom-Host-Lookup abgedeckt — sobald
  misconfigured:false, ist die Domain ohne weiteren Code live-fähig).
- DATENQUELLE — GET .../domains/{domain}/config (empirisch aus aktueller Vercel-Doku,
  Response-Shape bestätigt): liefert configuredBy (CNAME|A|http|dns-01|null), misconfigured
  (bool), recommendedCNAME (Array {rank,value:string}, rank=1 bevorzugt), recommendedIPv4
  (Array {rank,value:string[]} — value ist SELBST ein Array, bei rank=1 können MEHRERE IPs
  zurückkommen, ALLE müssen als A-Records angezeigt werden, nicht nur die erste). NICHTS wird
  hardcoded — die DNS-Werte sind projektspezifisch und dynamisch (Community-Beleg: z.B.
  xyz.vercel-dns-016.com statt eines generischen Werts). Exakte Endpunkt-/Feldnamen beim Bau
  nochmal gegen die dann aktuelle Vercel-Doku pinnen (Config-Fakten veralten).
- APEX VS. SUBDOMAIN — VOLLAUTOMATISCH, KEIN MANUELLER SCHALTER: Die UI erkennt anhand der
  gespeicherten Domain selbst (Label-Struktur, kein "." vor der Registrable-Domain = Apex),
  ob sie den A-Record-Block (recommendedIPv4) oder den CNAME-Block (recommendedCNAME)
  prominent zeigt. Der Nutzer wählt nicht selbst, welche Anleitung für ihn gilt — das wäre
  eine unnötige Fehlerquelle.
- FEINAUFLÖSUNG DER ZUSTÄNDE (aus configuredBy+misconfigured ABGELEITET, da Vercels API kein
  explizites "Konflikt"-Feld liefert — die Granularität entsteht aus der Kombination, nicht
  aus einem direkt gelieferten Wert):
  1. configuredBy:null + misconfigured:true -> "Wir sehen noch gar nichts" (Nutzer hat
     vermutlich noch nichts eingetragen, ODER Propagation läuft noch) -> "warte auf dich /
     warte aufs Internet"-Botschaft.
  2. configuredBy:"CNAME" ODER "A" + misconfigured:true -> "Wir sehen etwas, aber es ist
     falsch" (ein Record existiert, passt aber nicht zu unserem Projekt, z.B. veralteter
     Eintrag) -> Nutzer muss AKTIV etwas löschen/korrigieren, nicht nur warten. Das ist der
     Fall, der sonst zum stillen Support-Albtraum wird (Nutzer wartet ewig auf einen Zustand,
     der von allein nie grün wird).
  3. configuredBy:"http" -> eigener, benennbarer Zustand: Domain läuft vermutlich über einen
     Proxy/CDN (z.B. Cloudflare) davor -> spezifisch benennen statt generisch "falsch
     konfiguriert".
  Grund für diese Aufschlüsselung: Support-Prävention. Ein pauschales "warte" bei Fall 2
  lässt den Nutzer auf etwas warten, das nie von selbst eintritt.
- POLLING-STRATEGIE (zwei Ebenen, Client UND Server — Client-Schutz ist UX, Server-Schutz
  ist die eigentliche Absicherung, gleiche Lehre wie bei 7c-2b):
  - CLIENT: manueller "Status prüfen"-Button + sparsames Auto-Intervall (60s), gestoppt via
    Page Visibility API sobald der Tab inaktiv ist. Button nach Klick für 10s gesperrt
    (visueller Cooldown) gegen ungeduldiges Wiederholt-Klicken.
  - SERVER (die tragende Kontrolle, NICHT nur die Client-Geste): der bestehende
    vercel_synced_at-Zeitstempel (aus 7c-2b, bisher ungenutzt) wird zur Bremse: ist die
    letzte Prüfung jünger als 15-20s, liefert der Endpunkt den zwischengespeicherten DB-Stand
    statt erneut gegen Vercel zu fragen — UNABHÄNGIG davon, welcher Tab/Client/Skript fragt.
    Schützt gegen (a) direkten Skript-Missbrauch, der den Client-Cooldown umgeht, UND (b) das
    harmlose, aber reale Mehrfach-Tab-Problem (mehrere offene Tabs derselben Domain-Seite =
    Vielfaches an Poll-Traffic ohne böse Absicht). Keine neue Infrastruktur — nutzt eine
    bereits existierende, bisher ungenutzte Spalte.
- COPY-BUTTONS: jeder kopierte Wert wird vor dem Schreiben ins Clipboard strikt getrimmt
  (keine führenden/folgenden Leerzeichen) — ein kopiertes Leerzeichen vor einem CNAME-Wert
  ist eine reale, schwer auffindbare Fehlerquelle für einen Nicht-Techniker.
- REGISTRAR-TERMINOLOGIE-TABELLE: einfache Übersetzungshilfe für die gängigsten Anbieter
  (z.B. "Name" bei GoDaddy = "Host" bei IONOS = "@" für Apex bei anderen) — registrar-
  AGNOSTISCH bleiben (keine providerspezifischen Screenshots/Flows pflegen), aber die
  häufigste Verwirrungsquelle (unterschiedliche Feldnamen für dasselbe Konzept) direkt
  adressieren.
- BEKANNTE, BEWUSST NICHT BEHANDELTE GRENZE (CAA-Randfall): Falls ein Registrar bereits
  andere CAA-Records trägt, braucht Let's Encrypt einen zusätzlichen expliziten CAA-Eintrag
  für "letsencrypt.org" — sonst schlägt die Zertifikatsausstellung fehl, OHNE dass
  getDomainConfig das zwingend als klar benannte Ursache zeigt (bräuchte eine separate
  DNS-Abfrage außerhalb von Vercels Config-Endpunkt). Als SUPPORT-HINWEIS dokumentieren
  ("sieht alles richtig aus, klappt aber trotzdem nicht -> CAA-Records prüfen"), NICHT extra
  dafür bauen — seltener Randfall, eigene Abfrage-Infrastruktur nicht gerechtfertigt.

### 7c-2 — Familie abgeschlossen (2a/2b/2c/Entfernen)
Die Custom-Domain-Familie ist Ende-zu-Ende in Produktion bewiesen: Add (7c-2b),
DNS-Anzeige + Status-Polling (7c-2c) und Entfernen. Zwei Lektionen aus dem Bauprozess,
festgehalten damit sie nicht nur im Chat-Verlauf stecken:
- LEKTION "Domain-Identität nie über ein angenommenes Feld annehmen": ein Bug entstand,
  weil Code eine Spalte "id" auf domains selektierte, obwohl der echte Primärschlüssel
  "label" ist (0006). PostgREST lehnte mit 42703 ab, der Code destrukturierte aber nur
  {data} statt {data, error} -> der Fehler wurde verschluckt, die UI zeigte still eine
  leere Liste statt eines Fehlers. REGEL: bei JEDER neuen Query den echten PK der
  Zieltabelle nachsehen, nie aus dem Feldnamen "id" annehmen; PostgREST-Queries IMMER
  {data, error} destrukturieren, nie nur {data}.
- LEKTION "Ein identischer Statuscode kann bewusst uninformativ sein" (aus 7c-2b, hier
  bestätigt wiederverwendet): Verifikation von Vercel-Mutationen (Add/Remove) muss über
  die NACHGELAGERTE Wirkung erfolgen (Vercel-Dashboard/echter Config-Abruf), nicht über
  den HTTP-Status allein, wo die API bewusst keine Rückschlüsse zulassen will (z.B. 204
  bei Kill-Switch, verified:true trotz fehlender DNS bei Vercel-Add).
- Custom-Domain-Registrierung (Add/DNS-Anzeige/Status/Entfernen) ist damit als Feature
  vollständig, Ende-zu-Ende, in Produktion bewiesen.

## Aktiver Stand — Phase 8 Scheibe 1 (Analytics-Persistenz-Fundament, Konzept festgezurrt, Bau als Nächstes)
Erste Scheibe von Phase 8. Konzept final ausdiskutiert; Bau als Nächstes. Vollvision: docs/claude-history/future-roadmap.md.

- SCOPE (EINE Verantwortung): Events, die OHNEHIN durch /api/e fließen (gemappte Conversions), werden
  consent-gegatet in eine neue additive `events`-Tabelle persistiert. Heute ist /api/e ein reiner
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
  - project_id  uuid, FK auf projects ON DELETE CASCADE. INDEX jetzt (proaktiv, A-Regel: der Per-Projekt-
    Read nutzt WHERE project_id).
  - event_type  text (CAPI-Event-Name, z.B. Purchase/Lead).
  - event_id    text (die geteilte eventID). KEIN Unique-Constraint: Browser + Server teilen später
    dieselbe eventID = genau der Verlustraten-Join; zudem kann sendBeacon-Retry schon in Scheibe 1
    doppeln. Dedup ist Query-Zeit-Sache einer späteren Zähl-Scheibe, kein DB-Constraint. KEIN Index
    jetzt (in Scheibe 1 nirgends gematcht; Index folgt mit der Verlustraten-Join-Scheibe).
  - source      text NOT NULL, KEIN column-DEFAULT. Der Ingest-Pfad schreibt EXPLIZIT 'server_capi'.
    Begründung: additiv-für-immer-Tabelle braucht den Diskriminator ab Zeile 1 (spätere Client-
    Bestätigung schreibt 'client_browser') — nachträglich hinzufügen hieße Alt-Zeilen backfillen
    (verbotene Daten-Transformation) oder NULL-als-server deuten (stille Semantik-Schuld). NOT-NULL-
    OHNE-DEFAULT ZWINGT jeden künftigen Schreibpfad, die Herkunft bewusst zu setzen (kein stiller
    Fallback auf 'server_capi'). ACHSEN-HYGIENE: source = Beobachtungs-ORT (server vs. browser),
    NICHT Werbe-Netzwerk-ZIEL. Ein späteres Multi-Tracking-Ziel (Meta/GA4/TikTok) bekommt eine EIGENE
    additive Spalte; source NIE zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Join.
  - consent     boolean. Belt-and-suspenders: gegatet wird an der QUELLE (kein Beacon ohne psConsent()),
    das Flag ist die auditierbare Bestätigung, NICHT das Gate.
  - created_at  timestamptz DEFAULT now() (Server-Timestamp). Zeitraum-Index (BRIN) erst mit der
    Dashboard-Scheibe (Zeitraum-Queries), nicht jetzt.
- RLS: aktiviert, KEINE Policy in Scheibe 1 -> Writes laufen nur über service_role (Ingest-Pfad,
  session-los, umgeht RLS). WICHTIG im Migrations-Kommentar dokumentieren: das ist TRANSIENT — die
  owner-SELECT-Policy folgt in der Dashboard-Read-Scheibe. NICHT dauerhaft policy-los wie audit_logs
  (dort echtes Append-Only). Linter-"RLS Enabled No Policy" ist HIER ein vorübergehender erwarteter
  Hinweis, kein Dauerzustand.
- WRITE-POSTURE (Vercel-Serverless-sicher — korrigiert eine frühere "await mit Timeout"-Formulierung):
  einfaches Weglassen von await KILLT den Task auf Vercel nach dem 204 (Function wird eingefroren) ->
  der Insert liefe unzuverlässig. Der Persist reiht sich in DENSELBEN waitUntil-/after()-Mechanismus
  ein, mit dem der CAPI-Forward heute schon "204 nicht blockieren, aber zuverlässig zustellen" löst.
  BEIM BAU: das tatsächlich verwendete Primitiv aus dem echten ingest.ts ABLESEN, nicht raten
  (Instrument schlägt Vermutung). Beide Hintergrund-Tasks als Promise.allSettled([capiForward, persist])
  in EIN waitUntil (ein Fehler räumt den anderen nicht ab). Dediziertes Error-Logging INNERHALB jedes
  Tasks (sonst geht der Fehler stumm in allSettled unter). Interner strikter Timeout auf den Insert
  bleibt PFLICHT (schützt Vercel-Execution-Time/Kosten — Tier-0-Circuit-Breaker-Gedanke); Insert-Fehler
  wird geschluckt/geloggt, fliegt NIE in den Response-Pfad.
- KILL-SWITCH-KONSISTENZ: gesperrtes Projekt -> früher Verwurf VOR dem Persist (fail-closed, kein
  Persist gesperrter Projekte), konsistent mit dem bestehenden Ingest-Stop.
- DEPLOY-REIHENFOLGE (beim späteren Bau): Migration im Supabase-Editor VOR dem Code-Deploy
  (fail-closed-Regel). Am echten ingest.ts vor dem Bau verifizieren: (a) welches waitUntil/after-Primitiv
  läuft dort schon, (b) wie CAPI heute zugestellt wird — der Persist hängt sich DANEBEN.
- DEMOBAR / LIVE-TEST (definiert die "erledigt"-Schwelle): gemappte Conversion auf einer Live-
  publayer.net-Seite feuern -> innerhalb des Timeouts landet EINE consent-gegatete Zeile mit
  source='server_capi' und der eventID -> per SQL verifiziert (nachgelagerte Wirkung, wie beim
  Kill-Switch), NICHT über den HTTP-Status.

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
