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

ES GIBT KEINE FIRMA, KEINE KUNDEN UND KEINEN FREMDEN TRAFFIC (OWNER-ANGABE, 2026-08-20;
KEINE Messung). Die Gründung steht aus. Es gibt keine Einnahmen. Der Owner baut und testet
mit EIGENEN Konten; das Produkt hat noch nie jemand ausser ihm benutzt.
WARUM DAS ALS VERNEINUNG DASTEHT und nicht aus "Passion-Projekt" erschlossen wird: Vier
live sendende Adapter, ein Sicherheits-Manifest und eine Roadmap über achtzehn Phasen lesen
sich wie ein laufender Betrieb. MEHRERE INSTANZEN HABEN DARAUS BEREITS GESCHLOSSEN, es gebe
Kunden oder eine Firma. Beides trifft nicht zu.
DREI TRIGGER, EINZELN ZU PRÜFEN — sie treten NICHT gleichzeitig ein, und dieser Absatz ist
bei jedem einzeln neu zu bewerten:
· die Gründung ist vollzogen
· das erste FREMDE Nutzerkonto legt ein Projekt an
· der erste echte Ad-Traffic läuft auf eine gehostete Seite
WAS AN DIESEM ZUSTAND HÄNGT — und das ist der eigentliche Grund für diesen Absatz: Mehrere
Einträge im Repo ruhen darauf, OHNE IHN ZU BENENNEN. Sie kippen ALLE, wenn er kippt. Jede
der folgenden ist am Text geprüft (2026-08-20):
· "JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN" ("## Offene
  Punkte") — dort steht ausdrücklich, ein Ausfall koste derzeit NULL, weil das Produkt
  noch kein Kunde sieht.
· "Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic)" — sie bleibt an ihrer Stelle, weil
  "echter Ad-Traffic ist noch nicht terminiert, kein Grund zum Vorziehen".
· "Phase 15 — Public-Launch-Restarbeit (Tier 0)" — "Kein Termin — App bleibt im privaten
  Test-/Beta-Betrieb."
· "HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung)" — die geteilte Decke beisst erst bei
  fremden Kunden.
· "Phase 11.5 — Einwilligungs-Dialog" — terminiert "NACH Phase 11 und VOR einem
  Beta-Launch mit fremden Nutzern".
· Sicherheits-Manifest Tier 1: "SAFE-BROWSING" (BINDET-AN: Fremd-Content live) und
  "SHARED-REPUTATION publayer.net" (BINDET-AN: Multi-Tenant-Serving live).
· Sicherheits-Manifest Tier 2: "BACKUPS + Restore-Drill" — "erster Drill vor echten
  Kundendaten".
AUSDRÜCKLICH NICHT AUFGEFÜHRT, obwohl es danach aussieht: "DATA-RETENTION" (Tier 2) ruht
NICHT hierauf, sondern darauf, dass heute KEINE IP/UA persistiert werden; und der
"KOSTEN-CIRCUIT-BREAKER" ruht auf dem Vercel-HOBBY-Plan, nicht auf der Kundenzahl. Wer sie
mitzählt, hängt sie an den falschen Trigger.
EINE FOLGE, DIE HINEINGEHÖRT: Die KOMMERZIELLE Stufe hängt bei JEDEM Fan-Out-Ziel an der
Rechtsform, nicht nur bei Google. Pinterest verlangt für die höhere Zugriffsstufe eine
Vertragsannahme und ein Prüfverfahren; Google für die gewählte Gestalt ein
Partnerverfahren. BAUEN UND MIT EIGENEN KONTEN MESSEN GEHT OHNE; FREMDE KUNDENKONTEN
ANBINDEN NICHT. BELEG: docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", die
Antworten zu I1, I2 und I3; und Abschnitt "Google (Google Ads Conversions · GA4)",
Teil (d).

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
EIN [~] IM STUB IST ZULÄSSIG, WENN DER EINTRAG IN docs/roadmap.md BEIDE TEILE
AUSDRÜCKLICH BENENNT — die Auflage gilt dem Eintrag dort, nicht dieser Zeile.

**DER VOLLTEXT JEDER PHASE STEHT IN docs/roadmap.md** — Begründungen,
Provenienz, Auflagen, Richtigstellungen. Hier steht je Phase EINE Zeile mit
ihrem Marker. EIN VERWEIS DER FORM "Roadmap-Zeile 11.1" — in dieser Datei, in
docs/ und in den Historien — MEINT DIE PHASE MIT DIESER NUMMER: ihren Zustand
hier, ihren Volltext dort. Solche Verweise sind beim Umzug bewusst NICHT
angefasst worden; dieser Satz löst sie auf.

- [x] Phase 1 — Lokales Grundgerüst
- [x] Phase 2 — Click & Connect
- [x] Phase 3 — Persistenz & Auth (Supabase)
- [x] Mapping-/Action-Zuweisung + Weg-C-Netz
- [x] Phase 4 — Code-Generierung + HTML-Export
- [x] Phase 4.5 — Editor-Politur (Datei-Upload/Drag-Drop + Zen-Modus)
- [x] Phase 5 — In-Place Copywriting
- [x] Phase 6 — Server-Side Tracking (CAPI)
- [x] Phase 7 — Hosting & Go-Live (war Phase 6)
- [x] Phase 8 — Analytics & ROI-Ökosystem (war A/B-Testing)
- [x] Phase 9 — A/B-Testing
- [x] Phase 10 — Workspace-Reorganisation
- [x] Phase 10.5 — Umzug middleware -> proxy (Next-Konvention)
- [x] Phase 11 — Multi-Tracking (Server-Side Fan-Out)
- [x] Phase 11.1 — LinkedIn als viertes Fan-Out-Ziel
- [ ] Phase 11.2 — Google
- [ ] Phase 11.3 — Tracking-Testmodus-Modul (test_event_code)
- [ ] Phase 11.4 — Der Testknopf
- [ ] Phase 11.6 — Custom-Pixel
- [ ] Phase 11.5 — Einwilligungs-Dialog (eigener Dialog UND fremdes CMP)
- [ ] Phase 11.7 — Anbieter-Befunde nachziehen
- [ ] Phase 12 — Rich-Text / verschachtelte Textknoten
- [ ] Phase 13 — E-Mail-/ESP-Webhooks
- [ ] Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic)
- [ ] Phase 15 — Public-Launch-Restarbeit (Tier 0)
- [ ] Phase 16 — Analytics-Vertiefung (Uniques, Traffic-Health-Metriken)
- [ ] Phase 17 — Multi-Page-Funnels
- [ ] Phase 18 — MCP-Server

**Bewusst nicht phasiert (Trigger fehlt):** fünf Einträge ohne Marker — Volltext
in docs/roadmap.md.


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
  ENTSCHIEDEN AM 2026-08-15 (OWNER) — DREI DER VIER FRAGEN SIND BEANTWORTET. DER TEXT
  DARÜBER BLEIBT UNVERÄNDERT STEHEN und wird von diesem Block NICHT ersetzt: Er nennt
  Trigger und Bindungen, die weiter gelten — die 30-Tage-Retentionspflicht, die
  Zwei-Ebenen-Trennung und das entschiedene Nein zum Fingerprinting.
  PROVENIENZ: OWNER-ENTSCHEIDUNG (2026-08-15). KEINE Messung, KEINE Ableitung — eine
  FESTLEGUNG.
  DIE FESTLEGUNG: Es werden KEINE fremden Nutzer-Identitäten in der eigenen Datenbank
  gespeichert — auch nicht als Pseudonym und auch nicht als Hash. Ein
  Identitäts-Merkmal wird ausschliesslich DURCHGELEITET: im Arbeitsspeicher
  entgegengenommen, an das Ziel weitergereicht, danach nicht behalten. events bleibt
  damit identitätsfrei.
  WAS DAMIT BEANTWORTET IST — die drei Fragen dieses Eintrags, je einzeln:
  · WAS erfasst wird: ein Identitäts-Merkmal, flüchtig, ohne Ablage.
  · WIE LANGE: gar nicht.
  · WELCHER LÖSCHPFAD: keiner nötig, weil nichts abgelegt wird.
  WAS OFFEN BLEIBT — DIE VIERTE FRAGE, DIE RECHTSGRUNDLAGE: Sie liegt beim KUNDEN als
  Verantwortlichem, nicht bei diesem Produkt. ENTSCHIEDEN (Owner, 2026-08-15) und
  konsistent mit der Haltung an der Roadmap-Zeile 11.5 ("Wir weisen hin, wir erzwingen
  nicht"): Das System prüft NICHT nach, ob der Kunde eine Einwilligung eingeholt hat —
  es verarbeitet das Signal, wie der Kunde es sendet. Die Pflicht wird VERTRAGLICH
  zugewiesen und bindet damit an den bestehenden Tier-0-Blocker "SUBPROZESSOR-DPAs +
  Kunden-DPA". AUSDRÜCKLICH KEIN BAU-AUFTRAG: die vertragliche Seite ist ein
  juristisches Dokument und kein Code. HIER STEHT KEIN ZEITPUNKT.
  DIE AUFLAGE, DIE DIE FESTLEGUNG TRÄGT — OHNE SIE GILT SIE NICHT: Das
  Identitäts-Merkmal wird IM BROWSER gebildet. Eine KLARTEXT-Angabe darf den eigenen
  Server NIE erreichen. GRUND, und er ist der eigentliche Punkt: Der Leck-Pfad ist
  NICHT die Datenbank, sondern das LOG. Erreicht ein Klartextwert den Ingest, steht er
  im Rumpf jedes Beacons, in jedem Fehlerpfad und in jedem weitergereichten
  Fehler-Objekt — DIESELBE KLASSE, die im Sicherheits-Manifest bereits ZWEIMAL geführt
  ist (das CAPI-Zugangsdatum als Server-Action-Argument, Tier 2; der zurückgespiegelte
  Anbieter-Fehlertext, Tier 1). "Wir speichern nichts" wäre dann unwahr, obwohl keine
  Zeile in die Datenbank geschrieben würde.
  WAS DIESE ENTSCHEIDUNG NICHT IST: Sie sagt NICHT, dass keine Verarbeitung
  personenbezogener Daten stattfindet. NICHT-SPEICHERN IST NICHT NICHT-VERARBEITEN. Wer
  daraus "kein Datenschutz-Thema" liest, liest sie falsch.
  WANN SIE NEU ZU BEWERTEN IST: wenn ein Ziel oder der Markt ein Persistierungs-Modell
  verlangt. Dann ist SIE der Gegenstand einer NEUEN Owner-Entscheidung — der Eintrag
  darüber geht dadurch NICHT wieder auf.
  DIE AUFLAGE, DIE DIE FESTLEGUNG TRÄGT, IST AM 2026-08-19 PRÄZISIERT WORDEN — OWNER-
  ENTSCHEIDUNG, KEINE MESSUNG UND KEINE ABLEITUNG. Der Text darüber bleibt unverändert;
  was er verlangte („das Identitäts-Merkmal wird IM BROWSER gebildet, eine KLARTEXT-Angabe
  darf den eigenen Server NIE erreichen"), traf einen Fall, den er vor Augen hatte, und
  liess einen zweiten ungeregelt. DIE ACHSE IST AB JETZT: NUTZER-EINGABEN gegen
  INFRASTRUKTUR-DATEN.
  · NUTZER-EINGABEN — AUSDRÜCKLICH E-MAIL UND TELEFON: im Browser gehasht (SHA-256), der
    eigene Server sieht KEINEN Klartext. Das ist die Auflage von oben, unverändert, und
    für diese beiden Merkmale gilt sie wörtlich weiter.
    DIE GRENZE DIESER AUFLAGE GEHÖRT DAZU, sonst wird sie zur Generalerlaubnis: Für ANDERE
    Nutzer-Eingaben ist sie NICHT getroffen. Bei einem Merkmal, das ein Ziel im KLARTEXT
    zur Zuordnung erwartet — etwa ein Name —, wäre die Konsequenz nicht „hashen", sondern
    „gar nicht erst erheben". Das ist eine ANDERE Entscheidung und hier NICHT getroffen.
  · INFRASTRUKTUR-DATEN — IP-ADRESSE UND USER-AGENT: Der Server DARF sie als TRANSIT-Wert
    in eine CAPI-Nutzlast durchreichen, um die Zuordnungsrate zu sichern.
    EINSCHRÄNKUNG, UND SIE IST DER TRAGENDE TEIL: Die IP wird vom eigenen Server NIEMALS
    in der Datenbank gespeichert, persistiert oder in ein Log geschrieben.
  ZWEI BELEGE, BEIDE AM REPO GEPRÜFT (2026-08-19):
  (a) DIE LOG-EINSCHRÄNKUNG IST GELEBTER STAND, keine Absichtserklärung. GEMESSEN am Code:
      Die drei Riegel-Zeilen des LinkedIn-Adapters (`src/lib/capi/linkedin-forward.ts`)
      schreiben FESTE Zeichenketten und nennen den GRUND, nicht die Adresse — „missing
      identity", „identity is not IPv4", „no conversion rule for event". Und eine formale
      Suche über `src/` (ohne Testdateien) findet KEINE Logzeile, die eine IP oder einen
      User-Agent ausgibt. DIE REICHWEITE DIESES NICHT-TREFFERS GEHÖRT DAZU: Abgesucht ist
      die Achse „console.* mit ip/user-agent im Argument"; das ist ein Nicht-Treffer auf
      DIESER Achse und kein Beweis für alle Pfade. Die dauerhafte Regel dahinter steht in
      docs/immer-beachten.md unter „SCHWÄRZUNG — VIER TEILE, DIE NUR ZUSAMMEN TRAGEN".
  (b) DIE DURCHLEITUNG IST NICHT NEU — DIE AUFLAGE ÄNDERT NICHTS, SIE BENENNT, WAS LÄUFT.
      GEMESSEN an der Versionsgeschichte (2026-08-19): Die Client-IP wird seit dem
      2026-07-03 an ein Ziel weitergereicht (`bf87545`, die erste CAPI-Route), seit dem
      2026-08-19 an alle VIER (`a4e680c`, der LinkedIn-Adapter). Wer diesen Absatz für eine
      NEUE Erlaubnis hält, liest ihn falsch.
  WAS DIE AUFLAGE NICHT TUT: Sie beantwortet NICHT, ob eine IP personenbezogen ist — sie
  IST es. Sie regelt, wie mit ihr umgegangen wird. Der Satz „NICHT-SPEICHERN IST NICHT
  NICHT-VERARBEITEN" oben gilt für sie unverändert mit.
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
  ERGÄNZT AM 2026-08-19 (Hebung Phase 11.1) — PUNKT (2) IST SEIT 11.1f NICHT MEHR NUR
  THEORETISCH BERÜHRT, und der Text darüber bleibt unverändert: Das VIERTE Ziel sendet seit
  dem 2026-08-19. Die Zusage oben ist über die HERKUNFT der Ereignisse formuliert („gilt für
  Ereignisse AUS DIESEM BUILDER") und NICHT über das Ziel — für dieses Ziel wäre sie dem
  Wortlaut nach ANWENDBAR und trotzdem UNBELEGT.
  WAS GEMESSEN IST (docs/ziel-befunde.md, Teil (p), 2026-08-19): Das Feld für eine
  mitgegebene Ereignis-Kennung EXISTIERT und wird angenommen — belegt durch eine
  Positivkontrolle im selben Lauf, in der ein ERFUNDENES Feld mit 422 abgewiesen wurde.
  WAS NICHT GEMESSEN IST UND MIT DEN HEUTIGEN INSTRUMENTEN AUCH NICHT MESSBAR IST (Teile (q)
  und (h)): dass der Anbieter damit DEDUPLIZIERT. Die Anzeige-Zahlen reagieren auf Testdaten
  überhaupt nicht — ein Kontroll-Lauf mit einer NEUEN Kennung bewegte sie so wenig wie ein
  wiederholter —, und eine Zuordnung zu einer echten Person tritt bei Testdaten prinzipiell
  nicht ein.
  FOLGE FÜR DIE DOKUMENTATION, und sie ist der Grund dieser Ergänzung: Der Adapter KANN die
  Kennung mitschicken und tut es; eine ZUSAGE an den Kunden wird daraus nicht. Die beiden
  Sätze sind nicht dasselbe, und nur der erste ist gedeckt.
  TRIGGER FÜR DIE KLÄRUNG: sobald echter Traffic eine Zuordnung zu einer echten Person
  erzeugt. HIER WIRD NICHT ENTSCHIEDEN, ob und wie die Formulierung oben nachgezogen wird.
  ERGÄNZT AM 2026-08-20 — PUNKT (2) IST FÜR DIESES ZIEL NICHT MEHR NUR UNBELEGT, SONDERN
  AN EINE VORAUSSETZUNG GEBUNDEN, DIE WIR NICHT ERFÜLLEN. Der Text darüber bleibt
  unverändert; die Ergänzung vom 2026-08-19 sagt "dem Wortlaut nach ANWENDBAR und trotzdem
  UNBELEGT" — DAS IST ZU SCHWACH GEWORDEN.
  WAS GELESEN IST (2026-08-20): Die Deduplizierung dieses Anbieters verlangt eine
  BROWSER-SEITIGE Conversion-Regel und eine Ereignis-Kennung, die AUS DEM BROWSER stammt
  und mit dem Server-Ereignis mitreist. Pagesmith liefert für dieses Ziel KEIN
  Browser-Tag aus und kann die Kennung an keine Browser-Regel übergeben. DIE MECHANIK WIRD
  HIER NICHT WIEDERHOLT — sie steht in docs/ziel-befunde.md, Abschnitt "LinkedIn
  (Conversions API)", Teil (y); zwei Fassungen liefen auseinander.
  DIE ZWEITE HÄLFTE GEHÖRT DAZU UND IST DIE TEURERE: Hat ein Kunde ein EIGENES Insight Tag
  mit eigener Conversion-Regel, zählt der Anbieter ohne gemeinsame Kennung BEIDE
  Ereignisse — dieselbe Conversion erscheint DOPPELT. Das ist nicht "keine Deduplizierung",
  sondern eine FALSCHE ZAHL beim Kunden, und sie fällt ihm auf, bevor sie uns auffällt.
  WAS DAS NICHT BERÜHRT: die eigene Adblocker-Verlustrate. Sie rechnet aus der eigenen
  events-Tabelle und hat mit der Zählung des Anbieters nichts zu tun.
  WAS HIER NICHT ENTSCHIEDEN WIRD: wie die Zusage an den Kunden künftig lautet und ob
  Pagesmith je ein Insight Tag ausliefert. KEINE EMPFEHLUNG.
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
- DIE ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST (Trigger: Phase 11.5
  — mit einem Einwilligungs-Dialog wird der Defekt real; HEUTE FÄLLT ER NICHT AUF, weil
  ohne Dialog nie etwas abgelehnt wird): GEMESSEN am 2026-08-12, read-only am Code.
  DER MECHANISMUS: Wird EIN Ziel abgelehnt und ein anderes erlaubt, geht der Beacon hinaus
  und die Server-Zeile entsteht, die Browser-Bestätigung bleibt aus — der Nenner der
  Adblocker-Kachel wächst ohne den Zähler. Die Zahl steigt, obwohl nichts geblockt wurde:
  Sie liest sich als Adblocker-Verlust und ist in Wahrheit eine Einwilligungs-Entscheidung.
  Im Ein-Ziel-Pfad war das unmöglich — dort unterblieb ohne Einwilligung der ganze Beacon.
  WAS DIE BEHEBUNG BRAUCHT: zu wissen, ob das betreffende Ziel JE EREIGNIS eingewilligt
  war. Die events-Tabelle trägt keine Ziel-Spalte — genau die EIGENE ADDITIVE SPALTE, die
  für Ziele ohnehin vorgesehen ist (s. "TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL" in
  docs/immer-beachten.md). Deshalb ist das eine ANALYTICS-Arbeit und keine Consent-Arbeit.
  WARUM ER AM 2026-08-14 HIERHER GEWANDERT IST: Er stand in der Phase-8-Roadmap-Zeile
  zwischen fünf IDEEN OHNE TERMIN UND OHNE ZUSAGE und wurde deshalb wie eine gelesen. Er
  ist keine Idee, sondern ein GEMESSENER Fehler mit benanntem Trigger.
  Was still kaputtgeht: Sobald ein Einwilligungs-Dialog steht, meldet die Kachel
  Adblocker-Verluste, die keine sind — und das ist die Marquee-Metrik des Produkts, an
  der man der Zahl nichts ansieht.
  Herleitung: docs/claude-history/phase-11-multi-tracking-aktiver-stand.md, "## 7.
  Beschlossen und verortet — NICHT in dieser Phase gebaut".
- NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST (Trigger: BEREITS
  EINGETRETEN — drei Ziele laufen live, und jedes kann nachträglich konfiguriert werden;
  hier steht bewusst KEIN Zeitpunkt, ein erfundener liesse den Posten als terminiert
  aussehen): GEMESSEN am Code (2026-08-18).
  DER SACHVERHALT, vier Achsen:
  · loadProject (src/app/projects/actions.ts) projiziert published_content NICHT — der
    Client hält den veröffentlichten Stand gar nicht. Der Grund steht als Kommentar an
    getVariantBPublished: der Blob bleibt BEWUSST ausserhalb des Ladepfades.
  · Das Einzige, was aus dem publizierten Stand zurückkommt, ist ein BOOLEAN
    (getVariantBPublished -> deliverableVariantB): trägt er eine lieferfähige Variante B?
    KEIN Inhaltsvergleich, KEIN Zeitstempel, KEIN Hash.
  · Der einzige Zustand, den der Editor kennt, ist dirty — Editor gegen GESPEICHERT, nie
    gegen VERÖFFENTLICHT.
  · Es gibt KEINEN Hinweis, KEINE Anzeige und KEINEN Riegel auf ein nötiges
    Neu-Veröffentlichen — für KEINEN Anlass. ZWEI Fundstellen sehen so aus und sind es
    nicht: die Knopfbeschriftung "Erneut veröffentlichen" (PublishView.tsx) sagt, dass
    schon einmal publiziert wurde, und die Meldung über den veralteten Tab
    (publishProject in actions.ts) betrifft Variante B beim Publish-VORGANG selbst.
  WARUM ER BEISST — der Ablauf gehört hierher, sonst liest ihn jemand als Aufräumarbeit:
  Ein Kunde fügt ein zweites Ziel hinzu und trägt Kennung und Zugangsdaten ein. Die Karte
  meldet "Zugangsdaten hinterlegt". Veröffentlicht er NICHT neu, trägt die ausgelieferte
  Seite den Einwilligungs-Schlüssel dieses Ziels nicht — am Ingest greift fail-closed, es
  geht KEIN Forward hinaus. Keine Meldung, kein Fehler, nichts wird rot. Der Draht ist
  eine EINBAHNSTRASSE: Der Schlüsselsatz entsteht zur ERZEUGUNGSZEIT, und ein
  Code-Deploy erreicht einen publizierten Text nicht.
  DIE ZWEI LESARTEN, UND SIE SIND DER KERN DIESES EINTRAGS: Derselbe Sachverhalt steht in
  docs/immer-beachten.md bereits — aber als BELEG einer Regel über LIVE-TEST-ANLEITUNGEN
  ("EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS"), im Wortlaut: "Ein
  ausgelieferter Consent-Schlüssel entsteht zur ERZEUGUNGSZEIT; wer nach dem Eintragen
  einer Kennung nicht neu veröffentlicht, misst ein fail-closed-Verhalten und schreibt es
  dem Adapter zu." Als TESTDISZIPLIN gelesen ist das eine Fussnote; als PRODUKTAUSSAGE
  gelesen ist es ein stiller Conversion-Verlust bei JEDEM Kunden, der ein Ziel hinzufügt.
  JENE REGEL WIRD NICHT GEÄNDERT — sie ist als Testdisziplin richtig; dieser Eintrag
  tritt DANEBEN und nennt die zweite Lesart.
  Was still kaputtgeht: Conversion-Verluste SICHTBAR zu machen ist das Verkaufsargument
  dieses Produkts — hier verliert der Kunde sie, ohne dass die Oberfläche etwas anderes
  sagt als "konfiguriert".
  WAS HIER NICHT ENTSCHIEDEN WIRD, ausdrücklich: ob die Lösung ein Hinweis, eine Anzeige
  oder ein Riegel ist, und wo sie sitzt. Dieser Eintrag nennt den BEFUND, nicht den Bau.
  ERGÄNZT AM 2026-08-19 (Hebung Phase 11.1) — EINE DRITTE EBENE, UND SIE TRITT NEBEN DEN
  TEXT DARÜBER, ohne ihn zu ändern: Der Eintrag oben behandelt EDITOR gegen VERÖFFENTLICHT
  — dort ist der publizierte Text wirklich alt. DANEBEN steht VERÖFFENTLICHT gegen
  AUSGELIEFERT: der publizierte Text ist KORREKT, und nur seine Auslieferung ist veraltet.
  GEMESSEN am lebenden System (2026-08-18, beim Live-Test der Scheibe 11.1d): Die Live-Seite
  zeigte nach dem Publish den ALTEN Text, mit einer Pixel-Kennung, die der Editor-Stand
  nicht mehr trug. Ein Neuladen mit F5 half NICHT; erst ein Aufruf mit einem zusätzlichen
  URL-Parameter zeigte den korrekten Stand. DIE GEGENPROBE IST DER GRUND, WARUM DAS HIER
  STEHT und nicht als Defekt jener Scheibe: In der Datenbank (SQL, 2026-08-18) trug
  `published_content` den neuen Schlüssel und NICHT mehr die alte Kennung, `updated_at` lag
  nach dem Publish. Der Publish hatte vollständig gegriffen — es war der BROWSER-CACHE.
  Ohne diese zweite Prüfung wäre es als Fehlschlag protokolliert worden.
  WAS NICHT GEMESSEN IST und offen bleibt: OB und WELCHE Cache-Header die Serve-Route setzt
  und mit welcher Lebensdauer. Die Route war in jener Phase durchgehend geschützt und ist
  NICHT gelesen worden.
  DIE BEIDEN EBENEN WERDEN NICHT ZUSAMMENGEZOGEN — verschiedene Ursachen, verschiedene
  Lösungen: oben liegt die Lösung im Produkt (Hinweis, Anzeige oder Riegel), hier in den
  Auslieferungs-Kopfzeilen. Wer sie zusammenzieht, sucht die eine an der Stelle der anderen.
  DIESELBE MESSUNG BEANTWORTET EINE DRITTE FRAGE, und deshalb steht der Zeiger hier: Was der
  Cache heute tut, entscheidet auch, ob ein Datenbankausfall die Kundenseiten überhaupt
  erreicht — s. den Eintrag „JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER
  KUNDENSEITEN" weiter unten. EINE Aufklärung, drei Antworten.
  Was still kaputtgeht: Ein Kunde, der nach dem Publish auf seiner Seite nachsieht, macht
  dieselbe Erfahrung — und schliesst, das Publish habe nicht gegriffen.
- JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN (Trigger: der erste
  echte Kunden-Traffic. HEUTE IST NICHTS ZU TUN, und der Grund gehört in den Eintrag: Bis
  der Owner das Produkt selbst vollständig geprüft hat, sieht es kein Kunde; ein Ausfall
  kostet derzeit NULL. Alles davor wäre gebaute Vorsorge gegen ein Risiko, das nicht
  existiert — "Erst der nutzbare Kern, dann Infrastruktur"): Solange jeder Aufruf einer
  veröffentlichten Kundenseite ZUR LAUFZEIT durch die Datenbank läuft, trifft jede Störung
  dort — geplant wie ungeplant — nicht nur den Editor, sondern die Landing-Pages FREMDER
  Kunden mitten in laufenden Kampagnen. Ein Postgres-Upgrade, ein Wartungsfenster oder ein
  Ausfall beim Anbieter genügt.
  DREI EBENEN, SEHR UNGLEICH SCHWER — sie bleiben GETRENNT. Wer sie zusammenzieht, hält den
  Editor-Fall für lösbar oder den Kundenseiten-Fall für Infrastruktur:
  · KUNDENSEITEN — die schwerste. Das veröffentlichte HTML ist ein FERTIGER Text, der sich
    zwischen zwei Veröffentlichungen NICHT ändert; er müsste nicht bei jedem Aufruf neu
    geholt werden. Das ist die Ebene, auf der ein Ausfall unbemerkt bleiben KÖNNTE.
  · INGEST — teilweise lösbar. Ein Conversion-Ereignis lässt sich nicht aus einem
    Zwischenspeicher beantworten, es muss irgendwo hin. Puffern statt verwerfen ginge,
    braucht aber eine Hintergrundausführung.
  · EDITOR — nicht lösbar und soll es nicht sein. Er schreibt in die Datenbank; steht sie,
    kann er nicht schreiben. Die ehrliche Lösung ist eine SICHTBARE Meldung, kein stiller
    Fehlschlag.
  WAS DEN AUSFALL BESONDERS TEUER MACHT: Der Ingest antwortet in JEDEM Pfad mit einer
  leeren 204 — das ist Absicht und richtig, sonst verriete er den Gültigkeitszustand eines
  Tracking-Keys (s. "INGEST-204-CONTAINMENT" in docs/immer-beachten.md). Die Folge im
  Störungsfall ist aber, dass der Browser des Besuchers eine KORREKTE Antwort bekommt und
  NIEMAND erfährt, dass die Conversion nirgends angekommen ist.
  WAS GEMESSEN IST UND WAS NICHT:
  · GEMESSEN (Caching-Gate, Phase 9; 2026-07-27, curl gegen eine veröffentlichte Seite):
    Die Serve-Route läuft bei JEDEM Besucher-Request, das CDN fängt nichts ab —
    X-Vercel-Cache: MISS bei allen Aufrufen. Herleitung:
    docs/claude-history/phase-9-ab-testing.md, "CACHING-GATE".
  · GEMESSEN (2026-08-14, drei Achsen): keine geplante Hintergrundausführung im Repo —
    keine vercel.json, kein schedule/cron in .github/workflows/ci.yml, kein pg_cron-Aufruf
    unter supabase/. Eine solche wäre eine Infrastruktur-ERSTANLAGE. DREI NICHT-TREFFER,
    KEIN Beweis der Abwesenheit; die Reichweite ist die der drei Achsen.
  · NICHT GEMESSEN: was auf PLATTFORM-Ebene an Zwischenspeicherung greift — im Vercel Data
    Cache oder beim Datenbank-Anbieter —, und wie sich der Serve-Pfad bei einer echten
    Störung tatsächlich verhält.
  DIE DRITTE ANGABE STAND IM AUFTRAG WEITER GEFASST ("ob die Serve-Route dabei jedes Mal
  die Datenbank anfasst"), UND DIESE HÄLFTE IST AM CODE ENTSCHEIDBAR — GEMESSEN 2026-08-19:
  Sie tut es, mit ZWEI Abfragen je Aufruf (resolvePublished in src/lib/hosting/resolve.ts
  liest erst domains, dann projects über createAdminClient), und im gesamten Serve-Pfad
  liegt KEIN Cache-Wrapper (kein unstable_cache, kein cache()). Die Angabe steht deshalb
  oben nur noch für den Teil, der wirklich offen ist. WER SIE IN DER WEITEREN FASSUNG
  ZITIERT, plant eine Aufklärung für etwas, das schon dasteht.
  DER ERSTE SCHRITT IST EINE AUFKLÄRUNG, KEIN BAU — das steht hier ausdrücklich, damit
  niemand diesen Eintrag als Bauauftrag liest.
  DER QUERVERWEIS, und er ist der Grund, warum der Eintrag mehr ist als eine Ablage: Die
  offene Frage ist DIESELBE, die am Publish-Drift-Eintrag weiter oben als dritte Ebene
  steht (VERÖFFENTLICHT gegen AUSGELIEFERT; F5 half nicht, ein zusätzlicher URL-Parameter
  schon, die Datenbank war korrekt). EINE Aufklärung beantwortet BEIDE: Was der Cache heute tut,
  entscheidet DORT, ob der Betreiber einen veralteten Stand sieht — und HIER, ob ein
  Datenbankausfall die Kundenseiten überhaupt erreicht.
  DIE BEIDEN WERDEN NICHT ZUSAMMENGEZOGEN: verschiedene Folgen, dieselbe Messung. Der eine
  ist ein Betreiber-Ärgernis, der andere ein Ausfall fremder Kampagnen.
  WAS HIER NICHT ENTSCHIEDEN WIRD: ob und wie zwischengespeichert wird, ob der Ingest
  puffert, und welche der drei Ebenen zuerst angefasst wird.
  Was still kaputtgeht: Der Betreiber erfährt von einem Ausfall zuerst durch seine Kunden —
  und der Conversion-Verlust währenddessen ist auf KEINEM Kanal sichtbar, weil die leere
  204 nach aussen wie ein Erfolg aussieht.
- EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN, DIE GETRENNT
  BLEIBEN (gehoben am 2026-08-19 aus dem Vorrat der Phase 11.1): Die Karte meldet
  „Zugangsdaten hinterlegt", der Betreiber hält das Ziel für eingerichtet, und es geht
  nichts hinaus. DREI VERSCHIEDENE URSACHEN führen dorthin, und sie werden hier ausdrücklich
  NICHT zusammengezogen — der Grund steht in (1): die eine betrifft einen FALSCHEN Wert, die
  andere einen FEHLENDEN. Wer sie zusammenlegt, baut eine Anzeige, die zwei verschiedene
  Ursachen gleich benennt.
  (1) DIE REGEL-KENNUNG BRAUCHT IHR PRÄFIX, UND DER KUNDE HAT ES NICHT. TRIGGER:
      EINGETRETEN — jeder Betreiber, der dieses Ziel konfiguriert, läuft hinein. GEMESSEN
      live (2026-08-19): Der Adapter reicht den eingetragenen Wert unverändert durch und
      baut das Präfix NICHT; die Oberfläche des Anbieters zeigt NUR die Ziffernfolge. Wer
      sie kopiert, trägt einen Wert ein, der syntaktisch nicht trägt, und bekommt 422 mit
      „Invalid Urn format. Invalid prefix." DER RIEGEL GREIFT NICHT, weil eine Kennung DA
      ist — es ist der einzige Fehlerweg, bei dem tatsächlich eine Anfrage hinausgeht.
      ZWEI RICHTUNGEN, KEINE GEWÄHLT, je mit ihrer Grenze: Das Präfix serverseitig
      ERGÄNZEN — GRENZE: das trifft eine Entscheidung über die Form eines FREMDEN Werts,
      und diese Form ist nur GELESEN; gemessen ist allein, dass ein falsches Präfix mit 422
      fällt. Oder die Form PRÜFEN und mit eigenem Grund ABWEISEN — GRENZE: das macht aus
      dem heute LAUTEN Fehler (422 im Log) einen STILLEN (kein Forward), also eine
      Verschiebung und keine Behebung, solange der Betreiber weder das eine noch das andere
      sieht.
  (2) EIN UNVOLLSTÄNDIG KONFIGURIERTES ZIEL FÄLLT STILL AUS. TRIGGER: die UI-Warnung
      (Owner-Absicht, 2026-08-18), spätestens vor echtem Ad-Traffic. GEMESSEN am Code
      (2026-08-18): Liegt nur die Kennung oder nur das Zugangsdatum vor, entsteht kein
      Empfänger und es geht nichts hinaus — die Paarungsschleife in
      `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`) überspringt mit
      `if (!token) continue;`, die Gegenrichtung fällt schon vorher aus dem `in`-Filter der
      Geheimnis-Abfrage. DAS TRIFFT ALLE VIER ZIELE — ein Zustand des BESTANDS, den keine
      Scheibe erzeugt hat. Die Karte meldet „Zugangsdaten hinterlegt", sobald eine
      Geheimnis-Zeile existiert (`listConfiguredTargets`, `src/app/projects/actions.ts` —
      sie liest den Wert nie); über die KENNUNG sagt sie an dieser Stelle nichts.
  (3) EINE SICHTBARE WARNUNG FEHLT. TRIGGER: eine Frontend-Runde, ODER ein Support-Fall, in
      dem ein Betreiber meldet, dass nichts ankommt. Seit 11.1f loggt der Adapter den Grund
      unterscheidbar (`missing identity` · `identity is not IPv4` · `no conversion rule for
      event`) — ABER EINE LOGZEILE ERREICHT DEN BETREIBER NICHT.
      DIE GRENZE, DIE MITMUSS und die Bauform nicht freilässt: Ein server-seitiger
      Ziel-Fehlschlag ist laut docs/immer-beachten.md („WELCHE REGEL WANN GREIFT") KEINE
      Meldung, sondern eine GRÖSSE — wer ihn als Fehlermeldung baut, hängt eine Anzeige an
      ein Ereignis, das PRO BESUCHER eintreten kann. Eine Anzeige braucht zudem einen Weg
      vom SERVER-Ereignis in die Oberfläche, den es heute nicht gibt.
  (4) DER ZUGANG BRICHT OHNE ZUTUN DES KUNDEN — ABLAUF ODER WIDERRUF. TRIGGER: mit dem
      ersten Ziel, dessen Zugangsdatum ablaufen kann; für LinkedIn ist er EINGETRETEN,
      seit das Ziel am 2026-08-19 sendet. Die bestehenden Ziele tragen ein STATISCHES
      Geheimnis; läuft ein Zugang still ab oder widerruft der Betreiber ihn beim
      Anbieter, hört das Weiterleiten auf, ohne dass es jemand bemerkt.
      WAS SIE VON DEN DREI ANDEREN UNTERSCHEIDET, und das ist der Grund, warum sie eigens
      dasteht: Die drei oben entstehen durch etwas, das der Betreiber TUT oder UNTERLÄSST
      — einen falschen Wert eintragen, eine Hälfte der Konfiguration weglassen, eine
      Logzeile nie sehen. DIESE entsteht, WÄHREND ER NICHTS TUT. Ein Zustand, der ohne
      Handlung kippt, wird von keiner Prüfliste gefunden.
      DER ZUSTAND HAT SICH GEÄNDERT, und deshalb steht sie jetzt hier: Der Befund stand
      an der Roadmap-Zeile 11.1 als Vorbehalt für ein Ziel, das NOCH NICHT sendete —
      dort war er folgenlos. Seit dem 2026-08-19 sendet es.
      WAS DER ADAPTER HEUTE TUT (GEMESSEN am Code, 2026-08-19): Er deutet die
      401-Antwort als eigene Fehlerklasse („reason=invalid-token") und schreibt sie ins
      Laufzeit-Log. Das ist alles — es erreicht den Betreiber nicht, s. Ursache (3).
      KEINE EMPFEHLUNG, wie man es bemerkbar macht.
      DIE ZAHL „DREI" AN DREI STELLEN DIESES EINTRAGS WIRD NICHT ÜBERSCHRIEBEN — im
      Titel, im Absatz darüber und im Satz darunter. Sie ist als Aussage über den Stand
      vom 2026-08-19 (Hebung Runde 2) richtig; mit dieser vierten sind es VIER. Wer eine
      dieser Zahlen als heutige Liste liest, zählt falsch. Dieselbe Bauform wie an der
      Phase-8-Roadmap-Zeile: eine Zahl, die einen Tag beschreibt, wird nicht rückwirkend
      angepasst.
  WAS HIER NICHT ENTSCHIEDEN WIRD: welche der drei zuerst angefasst wird, ob das Präfix
  ergänzt oder geprüft wird, und wie eine Warnung aussieht.
  Was still kaputtgeht: Conversion-Verluste SICHTBAR zu machen ist das Verkaufsargument
  dieses Produkts — hier verliert der Kunde sie, während die Oberfläche „konfiguriert"
  sagt.
- DER PAGEVIEW-TOKEN IST ALS CUSTOM-EVENT EINTIPPBAR (Trigger: vor echtem Ad-Traffic;
  gehoben am 2026-08-19 aus dem Vorrat der Phase 11.1): GEMESSEN am Code (2026-08-18), auf
  VIER Achsen ohne Schranke — das Eingabefeld des Custom-Zweigs (`TrackForm` in
  `src/components/ActionPanel.tsx`) trägt weder `pattern` noch Blockliste; die einzige
  Schranke ist `valid` (`event.trim() !== ""`); `upsertMapping` (`src/lib/mappings.ts`)
  prüft nichts; `saveProject`/`saveVariantB` (`src/app/projects/actions.ts`) schreiben das
  Literal ohne Prüfung.
  WOHIN SO EIN MAPPING LÄUFT: Es wird AUSGELIEFERT (der Erzeuger filtert Ereignisnamen
  nicht), am Ingest von `isForwardable` vom CAPI-Forward ausgeschlossen — und landet in
  `events` als `event_type` des Analytics-Tokens, von einem echten PageView NICHT
  unterscheidbar.
  BEFUND ÜBER DEN BESTAND: Der Zustand ist älter als Phase 11.1; keine Scheibe erzeugt ihn
  und keine behebt ihn. KEINE BEWERTUNG DER WAHRSCHEINLICHKEIT — der Kommentar an
  `PAGEVIEW_EVENT` (`src/lib/analytics/events.ts`) nennt den Token „praktisch nicht
  versehentlich eintippbar"; das ist eine Aussage über Wahrscheinlichkeit und keine
  Schranke, und sie wird hier weder bestätigt noch bestritten.
  Was still kaputtgeht: Es verfälscht den NENNER der Adblocker-Verlustrate — und die ist
  die Marquee-Metrik dieses Produkts, an der man der Zahl nichts ansieht.
- EIN OAUTH-ZUGANG PASST NICHT IN DIE SKALAR-SPALTE DER GEHEIMNIS-TABELLE (Trigger: die
  erste AUTORISIERUNGSSCHICHT — Phase 11.2 oder ein späteres Ziel, dessen Zugang nicht als
  Skalar abzulegen ist; kopiert am 2026-08-19 aus der Roadmap-Zeile 11.1, deren Wortlaut
  bis zu ihrem Kollaps unverändert stehen bleibt):
  DIE RICHTIGSTELLUNG VOM 2026-08-14, in ihren zwei Hälften:
  · DAS ZUGANGS-TOKEN LÄUFT NACH 60 TAGEN AB. PROVENIENZ: GELESEN an der EIGENEN
    App-Oberfläche im Entwicklerportal des Anbieters (2026-08-14) — NICHT gemessen, es ist
    KEIN Aufruf gegen die Schnittstelle gefahren worden.
  · ES PASST NICHT IN DIE GEHEIMNIS-TABELLE. `project_secrets` hält einen SKALAR je Zeile
    — die Spalte ist `secret text not null`, der Schlüssel ist `(project_id, target)`
    (0021_project_secrets.sql) —, während ein OAuth-Zugang MEHRERE Werte nebeneinander
    braucht: Token, Erneuerungs-Token, Ablaufzeitpunkt.
  DER VORBEHALT VOM 2026-08-15, und er engt den Geltungsbereich ein: Beide Hälften ruhen
  auf dem Zugangsdatum einer ENTWICKLER-ANWENDUNG (Portal-Lesung 2026-08-14). ES GIBT
  EINEN ZWEITEN WEG ZU EINEM ZUGANGSDATUM — GELESEN an der Werbe-Oberfläche des Anbieters
  (2026-08-15), NICHT gemessen: Der Betreiber erzeugt es dort SELBST, gebunden an sein
  Werbekonto, erneuerbar per Klick, als EIN Wert. FÜR DIESEN WEG IST DIE RICHTIGSTELLUNG
  UNGEPRÜFT UND MÖGLICHERWEISE FALSCH: Ein EINZELNER Wert passt in eine Spalte, die einen
  Skalar je Zeile hält.
  DIE GRENZE, DIE MITMUSS — EINE ABWESENHEITS-BEOBACHTUNG OHNE POSITIVKONTROLLE: In jener
  Oberfläche war KEIN Ablaufdatum ausgewiesen. UNGEPRÜFT ist, wie sie einen Ablauf
  überhaupt anzeigen würde. DARAUS FOLGT NICHT, dass dieses Zugangsdatum unbegrenzt gilt —
  das bleibt eine OFFENE FRAGE, keine Entwarnung.
  DIE OFFENE VORFRAGE, UND SIE ENTSCHEIDET DEN PREIS: Ob die Schnittstelle auch ein
  APP-EIGENES Token annimmt (Anmeldung mit Anwendungs-Zugangsdaten, ohne Nutzer-Fluss).
  Betrachtet wurde bislang NUR ein dreibeiniger OAuth-Fluss; der zweibeinige Weg ist NICHT
  geprüft. Die Antwort entscheidet zwischen einer Autorisierungsschicht MIT Nutzer-Fluss
  und einer reinen SERVER-SEITIGEN Erneuerung — also den PREIS der Schicht, NICHT die
  Eignung der Skalar-Spalte für den gedeckten Zweig. Für den DREIBEINIGEN Fluss ist die
  Mehrwertigkeit GEDECKT (Portal-Lesung 2026-08-14); für den ZWEIBEINIGEN ist sie eine
  ABLEITUNG OHNE QUELLE — ungeprüft ist dort nicht nur, OB der Weg offensteht, sondern
  auch, WELCHE Wertform er verlangt.
  DER ADRESSATEN-WECHSEL IST DER GRUND FÜR DIESEN EINTRAG, und ohne ihn läse sich der
  Block wie ein erledigter Vorbehalt: Der GEBAUTE Weg arbeitet mit einem SKALAR aus
  `project_secrets` — GEMESSEN am Code (2026-08-19): `LinkedinConfig.token`
  (`src/lib/capi/linkedin-forward.ts`) nimmt genau einen Wert, den der Resolver aus der
  Geheimnis-Tabelle liest. FÜR IHN ist die Richtigstellung damit widerlegt. FÜR EINE
  AUTORISIERUNGSSCHICHT IST SIE ES NICHT. Der Befund bindet ab jetzt Phase 11.2 und jede
  künftige Schicht — nicht mehr 11.1.
  DIE AUTORISIERUNGSSCHICHT GEHÖRT KEINER ZEILE ALLEIN: Sie ist gemeinsames Fundament von
  11.1 und 11.2; nur für ein Ziel gebaut wäre sie überangepasst und ein zweites Mal fällig.
  Was still kaputtgeht: Wer eine Autorisierungsschicht zuschneidet, ohne die Vorfrage zu
  klären, entscheidet ihren Umfang unbemerkt mit — ein Nutzer-Fluss und eine
  server-seitige Erneuerung sind zwei verschiedene Vorhaben, und die Wahl zwischen ihnen
  fiele dann nicht durch eine Entscheidung, sondern durch eine Annahme.
  ERGÄNZT AM 2026-08-20 — DIE OFFENE VORFRAGE IST BEANTWORTET, UND ZWAR NEGATIV. Der Text
  darüber bleibt unverändert; er wird NICHT gekürzt und NICHT umformuliert, weil er den
  Weg zu dieser Antwort trägt und weil seine Grenzen weitergelten. Dieser Block tritt
  DANEBEN.
  · DER ZWEIBEINIGE WEG STEHT FÜR DIESES ZIEL NICHT OFFEN. Die Anmeldung mit
    Anwendungs-Zugangsdaten ist für die MARKETING-APIs des Anbieters ausgeschlossen, und
    die Conversions API ist eine davon; die Seite des Anbieters zum
    Client-Credentials-Fluss trägt diesen Ausschluss ausdrücklich. PROVENIENZ: GELESEN an
    learn.microsoft.com/en-us/linkedin/shared/authentication/client-credentials-flow
    (2026-08-20). NICHT GEMESSEN — es ist KEIN Aufruf gegen den Token-Endpunkt gefahren
    worden.
  · DIE VERKNÜPFUNG BEKOMMT IHREN EIGENEN BELEG, WEIL DER BEFUND AN IHR HÄNGT: Der
    Ausschluss gilt den MARKETING-APIs — gehörte die Conversions API nicht dazu, trüge
    nichts davon. DIE ZUORDNUNG IST GELESEN an der Anbieter-Dokumentation (2026-08-20):
    Die Conversions API wird dort unter dem MARKETING-Zweig geführt
    (learn.microsoft.com/en-us/linkedin/marketing/conversions/...).
    DIE GRENZE GEHÖRT DAZU, sonst liest sich der Beleg stärker, als er ist: Das ist eine
    Zuordnung nach dem ABLAGEORT der Dokumentation — NICHT nach einer Aussage des
    Anbieters, die die Conversions API ausdrücklich als Marketing-API benennt. KIPPT SIE,
    IST DER BEFUND NEU ZU TREFFEN.
  · AUF ANDERER ACHSE, UND SIE ENTWERTET DEN ZWEIBEINIGEN WEG AUCH DORT, WO ER OFFENSTÜNDE:
    Ein solches Anwendungs-Token lebt DREISSIG MINUTEN. Ein Wert mit dieser Lebensdauer ist
    kein Spalteneintrag, sondern eine ERNEUERUNGS-MECHANIK — die Frage der Wertform stellt
    sich für ihn gar nicht mehr. PROVENIENZ: dieselbe Quelle, dasselbe Datum, GELESEN.
  WAS AM VORBEHALT VOM 2026-08-15 STEHEN BLEIBT UND WAS NICHT — beide Hälften einzeln,
  damit nicht die eine die andere mitreisst:
  · SEINE WERTFORM-HÄLFTE BLEIBT RICHTIG: Der zweite Beschaffungsweg liefert EINEN Wert,
    und der passt in eine Spalte, die einen Skalar je Zeile hält.
  · WIDERLEGT IST ALLEIN DIE MÖGLICHE LESART, DIESER WERT SEI ABLAUFFREI: Der Anbieter gibt
    keine Mitglieds-Token mit mehr als SECHZIG TAGEN Lebensdauer aus; eine programmatische
    Erneuerung ist auf zugelassene Partner beschränkt, das Erneuerungs-Token gilt EIN JAHR,
    danach muss das Mitglied erneut autorisieren. PROVENIENZ: GELESEN an
    developer.linkedin.com/support/faq und
    learn.microsoft.com/en-us/linkedin/shared/authentication/programmatic-refresh-tokens
    (2026-08-20). NICHT GEMESSEN.
  DIE ABWESENHEITS-BEOBACHTUNG IST DAMIT NICHT ENTWARNT, SONDERN GEGENLÄUFIG BELEGT: Der
  Eintrag führt oben, dass in der Werbe-Oberfläche KEIN Ablaufdatum ausgewiesen war, und
  nennt das ausdrücklich keine Entwarnung. Die Lesung vom 2026-08-20 bestätigt diese
  Vorsicht — sie war richtig, nicht übervorsichtig.
  DIE FOLGE, UND SIE IST DER GRUND DIESER ERGÄNZUNG: Für DIESES Ziel steht der PREIS der
  Autorisierungsschicht fest — NUTZER-FLUSS, nicht reine server-seitige Erneuerung.
  DIE GRENZE, OHNE DIE DIESER BEFUND SCHADET — drei Teile, und der dritte hält ihn offen:
  (a) ÜBER GOOGLE SAGT ER NICHTS. Anderer Anbieter, andere Schnittstelle. Wer ihn auf
      Phase 11.2 überträgt, überträgt eine Lesung über ein fremdes System auf ein ZWEITES
      fremdes System.
  (b) DIE SCHICHT BLEIBT GEMEINSAMES FUNDAMENT von 11.1 und 11.2 und wird NICHT auf dieser
      einen Hälfte zugeschnitten. Der Satz darüber („gehört keiner Zeile allein") gilt
      unverändert weiter — eine beantwortete Vorfrage an EINEM Ziel schneidet die Schicht
      nicht zu.
  (c) ZWEI DINGE BLEIBEN OFFEN, und sie werden hier als offen benannt: die MESSUNG selbst
      (ein Aufruf mit Anwendungs-Zugangsdaten, der die Ablehnung zeigt) und das KONKRETE
      ABLAUFDATUM des heute live verwendeten Zugangsdatums.
  DIE ZEILE „Was still kaputtgeht" DARÜBER BLEIBT STEHEN UND GILT WEITER: Sie ist für 11.2
  und jedes weitere Ziel unverändert wahr. Beantwortet ist die Vorfrage NUR für dieses eine
  Ziel; wer daraus liest, die Schicht sei jetzt zuschneidbar, macht genau den Fehler, den
  jene Zeile beschreibt.
  ENTSCHIEDEN AM 2026-08-20 (OWNER) — DIE AUTORISIERUNGSSCHICHT BLEIBT GEMEINSAMES
  FUNDAMENT VON 11.1 UND 11.2. Der Absatz "DIE AUTORISIERUNGSSCHICHT GEHÖRT KEINER ZEILE
  ALLEIN" darüber bleibt wörtlich stehen; er war bisher eine FOLGERUNG aus dem
  Schema-Risiko — jetzt ist es zusätzlich eine ENTSCHEIDUNG, und das ist der Unterschied:
  eine Folgerung kippt mit ihrer Prämisse, eine Entscheidung wird zurückgenommen.
  PROVENIENZ: OWNER-ENTSCHEIDUNG (2026-08-20). KEINE Messung.
  BEGRÜNDUNG DES OWNERS: Ein zentrales Dienstkonto, das Kunden in ihre Werbekonten
  einladen, ist als VIELMANDANTEN-Bauform nicht tragfähig — bei hunderten Konten ist mit
  einer Einstufung als missbräuchlich zu rechnen. Ein legitimes Drittanbieter-Werkzeug
  tritt über einen NUTZER-FLUSS auf.
  DIE GRENZE, DIE DAZUGEHÖRT und ohne die die Begründung stärker aussieht als sie ist:
  Das ist eine EINSCHÄTZUNG — keine Anbieter-Aussage und keine Messung. Sie deckt sich
  damit, dass Google für genau diese Gestalt den Data-Partner-Weg vorsieht (GELESEN
  2026-08-20; Befund in docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions ·
  GA4)", Teil (d)). DIESER WEG IST EIN INDIZ, KEIN BEWEIS der Einschätzung.
  WAS DAMIT ZUSAMMENFÄLLT UND WAS NICHT: Der PREIS der Schicht steht für BEIDE Zeilen auf
  Nutzer-Fluss — für 11.1 aus der Lesung vom 2026-08-20 (Block darüber), für 11.2 aus
  dieser Entscheidung. Das macht die Schicht NICHT zuschneidbar: die offenen Punkte des
  Google-Wegs (Freischaltung, Entwickler-Token, Nutzlast-Felder, Advertiser gegen Data
  Partner) stehen unverändert offen und stehen in docs/ziel-befunde.md.
  DIE VORFRAGE ZUM UMFANG DER SCHICHT (Owner, 2026-08-20) — OFFEN, UND SIE WIRD HIER NICHT
  BEANTWORTET: Erzeugen die KUNDEN ihr Zugangsdatum selbst in ihrem eigenen Werbekonto —
  oder tut der Betreiber es für sie? PROVENIENZ: OWNER-VORFRAGE (2026-08-20),
  unbeantwortet. KEINE Messung.
  WARUM SIE VOR DEN GOOGLE-FRAGEN STEHT, und das ist ihr ganzer Punkt: Jene klären, ob
  Google ANSPRUCHSBERECHTIGTER der Schicht ist. DIESE klärt, ob im Negativfall überhaupt
  noch einer übrig bleibt. Google BRAUCHT die Schicht — ohne sie geht dort nichts.
  LinkedIn dagegen SENDET BEREITS; dort löste sie nur die ERNEUERUNG eines Zugangsdatums,
  das nach rund sechzig Tagen abläuft.
  DIE ZWEI ZWEIGE, je mit ihrer Folge:
  · BETREIBER, EIN KONTO: Eine Erneuerung alle zwei Monate wäre eine Kalendererinnerung,
    kein Bau.
  · KUNDEN MIT EIGENEN KONTEN: Eine Kalendererinnerung JE KUNDE ist unzumutbar — dann
    trägt LinkedIn die Schicht mit.
  EINE UNGEPRÜFTE ABLEITUNG, AUSDRÜCKLICH KEIN BEFUND — sie ist der eigentliche Grund
  dieses Eintrags: Der Zweig "Betreiber, ein Konto" könnte gar keine Wahl sein. Ein
  Zugangsdatum autorisiert den Zugriff auf ein BESTIMMTES Werbekonto, und die
  Conversion-Regel gehört dem Konto des KUNDEN. Trifft das zu, hiesse "Betreiber, ein
  Konto" nicht "ein Zugangsdatum für alles", sondern: die Betreiber-Identität sitzt als
  NUTZER in JEDEM Kundenkonto — strukturell DIESELBE Vielmandanten-Gestalt, die die
  Owner-Entscheidung vom 2026-08-20 (Block darüber) für den Google-Weg ausdrücklich
  verworfen hat.
  FOLGE, WENN ES ZUTRIFFT: Der Zweig trägt nur, solange der Betreiber der einzige
  Werbetreibende ist — also heute. Mit dem ersten echten Kunden fällt er weg, und LinkedIn
  trägt die Schicht mit, UNABHÄNGIG davon, wie die Google-Frage ausgeht.
  DIE PRÜFUNG STEHT AUS — GEPRÜFT AM VORHANDENEN MATERIAL AM 2026-08-20, MIT NEGATIVEM
  ERGEBNIS: docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)", trägt KEINE
  Angabe darüber, ob die Conversion-Regel-Kennung an ein Werbekonto gebunden ist und ob
  das Zugangsdatum je Werbekonto gilt. Am nächsten kommt der Achse der Teil (c)
  DESSELBEN Abschnitts: eine nicht auflösbare Regel-Kennung ergibt 403 mit dem Rumpf
  {"message":"No ad accounts found","status":403}, und die Folgerung dort nennt die
  Meldung MEHRDEUTIG, "weil derselbe Status auch bei nicht vergebenen Berechtigungen
  auftritt". DAS BERÜHRT DIE ACHSE UND ENTSCHEIDET SIE NICHT: Die Ableitung ist damit
  WEDER BELEGT NOCH WIDERLEGT. Wer (c) als Stütze zitiert, macht aus einer Mehrdeutigkeit
  einen Befund.
  DER ZUSATZ ZUM ZWEIG "BETREIBER, EIN KONTO", falls er doch trägt: Eine
  Kalendererinnerung ist nur so gut, wie ihr AUSBLEIBEN auffällt. Läuft das Zugangsdatum
  ab, hört das Weiterleiten auf, ohne dass etwas rot wird — s. Ursache (4) am Eintrag "EIN
  ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN". "KEIN BAU" HEISST NICHT
  "FOLGENLOS".
  WAS HIER NICHT ENTSCHIEDEN WIRD: welcher Zweig gilt, ob die Schicht gebaut wird und in
  welchem Umfang. KEINE EMPFEHLUNG.
  RICHTIGGESTELLT AM 2026-08-20 — DIE VORFRAGE UND DIE ABLEITUNG DARÜBER STEHEN UNTER
  EINER ANNAHME, DIE SICH VERSCHOBEN HAT. Der Text darüber bleibt wörtlich stehen; er ist
  als Frage weiterhin offen, aber sein Gegenstand ist ein anderer als angenommen.
  DER BEFUND: Das LIVE VERWENDETE Zugangsdatum stammt aus einem ANDEREN Beschaffungsweg
  als dem der eigenen Anwendung — BEOBACHTET 2026-08-20 (Owner, Token-Inspector-Werkzeug
  des Anbieters, mit Positivkontrolle im selben Lauf). Es ist KEIN OAuth-Zugangsdatum
  dieser Anwendung. Der Befund samt Grenze steht in docs/ziel-befunde.md, Abschnitt
  "LinkedIn (Conversions API)", Teil (v); die Frist- und Erneuerungs-Angaben zum App-Weg
  in Teil (w). BEIDES WIRD HIER NICHT WIEDERHOLT.
  DIE FOLGE, UND SIE IST DER GRUND DIESER RICHTIGSTELLUNG: Ein Zugangsdatum, das unser
  EIGENES Werkzeug nicht auslesen kann, kann Pagesmith auch nicht auf seinen Ablauf
  überwachen. EINE ABLAUF-ÜBERWACHUNG FÜR ZUGANGSDATEN DIESER ART IST DAMIT STRUKTURELL
  NICHT MÖGLICH — unabhängig davon, ob sie wünschenswert wäre. Das ist keine fehlende
  Arbeit, sondern eine fehlende Handhabe.
  WAS UNBERÜHRT BLEIBT, ausdrücklich: die OWNER-ENTSCHEIDUNG VOM 2026-08-20 zur gemeinsamen
  Autorisierungsschicht (Block darüber). Sie ruht auf der VIELMANDANTEN-Begründung, nicht
  auf der Ablauf-Frage. Sie wird von dieser Richtigstellung NICHT angetastet.
  RICHTIGGESTELLT AM 2026-08-20 (zweite Runde) — VIER STELLEN DIESES EINTRAGS, NAMENTLICH.
  Der Text darüber bleibt WÖRTLICH stehen; nichts wird gestrichen oder umformuliert.
  WARUM NAMENTLICH UND NICHT GENERISCH, und das ist der Grund für diesen Block: Die
  Richtigstellung darüber markiert den Vorfrage-Teil nur ALS GANZES ("sein Gegenstand ist
  ein anderer als angenommen"). Wer bis dorthin liest und dann aufhört, nimmt die alte
  Angabe MIT. Eine generische Markierung wirkt nicht; deshalb steht hier je Stelle der Satz,
  den sie qualifiziert.
  (1) "gebunden an sein Werbekonto" (Block "DER VORBEHALT VOM 2026-08-15") — WIDERLEGT.
      BEOBACHTET 2026-08-20 (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions API)",
      Teil (s)): Das Zugangsdatum aus der Werbe-Oberfläche "kann für mehrere Anzeigenkonten
      unter einer Nutzer-ID verwendet werden".
      WAS NICHT FÄLLT: die WERTFORM. Es bleibt EIN Wert — und damit bleibt auch die
      Wertform-Hälfte des Vorbehalts richtig, die weiter unten eigens bestätigt ist.
  (2) "Ein Zugangsdatum autorisiert den Zugriff auf ein BESTIMMTES Werbekonto" (Block "EINE
      UNGEPRÜFTE ABLEITUNG") — DIE BEGRÜNDUNG IST WIDERLEGT, DER SCHLUSS NICHT.
      Fundstelle wie (1): derselbe Teil (s), BEOBACHTET 2026-08-20.
      DIE PRÄZISIERUNG GEHÖRT DAZU, sonst kippt zu viel: "mehrere Anzeigenkonten unter EINER
      Nutzer-ID" heisst weiterhin, dass die BETREIBER-IDENTITÄT in JEDEM Kundenkonto Nutzer
      sein muss. Der Schluss der Ableitung — dass der Zweig "Betreiber, ein Konto" mit dem
      ersten echten Kunden wegfällt — BLEIBT MÖGLICH. Widerlegt ist allein die im Text
      stehende Begründung dafür.
      UND EINE FOLGE FÜR DEN BLOCK DARUNTER: Der Satz "DIE ABLEITUNG IST DAMIT WEDER BELEGT
      NOCH WIDERLEGT" in "DIE PRÜFUNG STEHT AUS" ist damit ZU SCHWACH — es gibt seit dem
      2026-08-20 einen BEOBACHTETEN Befund auf genau dieser Achse. DER ALTE SATZ WIRD NICHT
      GEÄNDERT: er beschreibt richtig, was das damals vorhandene Material hergab.
  (3) "das nach rund sechzig Tagen abläuft" (Block "WARUM SIE VOR DEN GOOGLE-FRAGEN STEHT")
      — NUR NOCH TEILWEISE GÜLTIG.
      WAHR für das Zugangsdatum der ANWENDUNG: BEOBACHTET 2026-08-20 (ebenda, Teil (w)) —
      "Access token: 2 months (5184000 seconds)".
      FALSCH als Aussage über das LIVE VERWENDETE: Das stammt aus einem anderen
      Beschaffungsweg (ebenda, Teil (v), BEOBACHTET 2026-08-20), und ob es abläuft, ist ein
      NICHT-TREFFER auf dreizehn Seiten und an der Oberfläche (ebenda, Teil (r)).
  (4) EINE SPANNUNG, DIE HIER BENANNT UND NICHT AUFGELÖST WIRD: "Der Anbieter gibt keine
      Mitglieds-Token mit mehr als SECHZIG TAGEN Lebensdauer aus" (Block "WAS AM VORBEHALT
      VOM 2026-08-15 STEHEN BLEIBT UND WAS NICHT", GELESEN 2026-08-20) steht gegen die
      Angabe, die dort erzeugten Zugangsdaten liefen NICHT ab (ebenda, Teil (v), GELESEN
      2026-08-20, Anbieter-Doku zum Campaign-Manager-Weg).
      KEIN WIDERSPRUCH, WENN das Campaign-Manager-Zugangsdatum kein Mitglieds-Token ist —
      UND GENAU DAS IST UNGEKLÄRT: "EIN TAUGLICHER TEST IST NICHT BEKANNT" (ebenda,
      Teil (r)). AM TEXT NICHT ENTSCHEIDBAR. Wer die eine Angabe gegen die andere ausspielt,
      entscheidet eine Frage, die niemand beantwortet hat.
  WAS VON KEINER DER VIER BERÜHRT WIRD, ausdrücklich und zum zweiten Mal: die
  OWNER-ENTSCHEIDUNG VOM 2026-08-20 zur gemeinsamen Autorisierungsschicht. Sie ruht auf der
  VIELMANDANTEN-Begründung, nicht auf der Ablauf-Frage und nicht auf der Werbekonto-Bindung.
  KEINE der vier Richtigstellungen rührt an sie.

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

## Anbieter-Befunde der Fan-Out-Ziele — AUSGELAGERT nach docs/ziel-befunde.md
Was über die Schnittstellen der Fan-Out-Ziele GEMESSEN und GELESEN ist (verlangte Felder,
Statuscodes, Rumpfformen, stille Fehlzustände, taugliche Live-Test-Instrumente), steht je
Ziel in docs/ziel-befunde.md. Diese Datei wird NICHT automatisch geladen.
PFLICHT-STOPP, KEINE EMPFEHLUNG: Wer ein Fan-Out-Ziel zuschneidet, einen Adapter baut, beim
Anbieter recherchiert oder eine Live-Test-Anleitung dafür schreibt, LÄDT
docs/ziel-befunde.md ZUERST — vor dem Plan, nicht während des Baus. Ohne sie plant man
gegen eine überholte Fassung: die LinkedIn-Befunde standen bis zum 2026-08-15 als GELESEN
in der Roadmap-Zeile 11.1, und die Messung dieses Tages hat eine ihrer Angaben widerlegt.
UND AUCH DANN IST SIE KEINE QUELLE: Ein Dokument beschreibt ein fremdes System, es belegt
es nicht. Was gilt, steht am ENDPUNKT DES ANBIETERS — gemessen wird mit einem Aufruf gegen
die Schnittstelle, nicht abgelesen. Ein Anbieter kann sein Verhalten zudem ändern, ohne
dass hier irgendetwas rot wird.
DER EINTRAG UNTER "## Aktive Dokumente" BLEIBT DANEBEN STEHEN und wird von diesem Abschnitt
nicht ersetzt: dort steht, WAS die Datei ist, hier, WANN sie Pflicht wird — dieselbe
Aufteilung wie bei docs/db-stand.md.

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
- docs/ziel-befunde.md — die GEMESSENEN und GELESENEN Befunde über die
  Schnittstellen der Fan-Out-Ziele (Felder, Statuscodes, Rumpfformen, stille
  Fehlzustände, taugliche Live-Test-Instrumente), je Ziel ein Abschnitt, mit
  Provenienz an jeder Angabe. Angelegt 2026-08-15. Sie trägt KEINE Regeln und
  KEINE Entscheidungen — die stehen in docs/immer-beachten.md bzw. an der
  Roadmap-Zeile. Sie wird NICHT automatisch geladen. AUSLÖSER: Wer an einem
  Fan-Out-Ziel arbeitet — Zuschnitt, Adapter, Anbieter-Recherche oder
  Live-Test-Anleitung —, lädt sie ZUERST. Sie gehört keiner Phase und wird NICHT
  archiviert.
- docs/ziel-fragenkatalog.md — die FRAGEN, die an JEDEM Fan-Out-Ziel zu beantworten
  sind (41 in 9 Gruppen, abgeleitet aus dem, was die vier gebauten Ziele gebraucht
  haben), und ein DATIERTER Befund darüber, welche Frage je Ziel beantwortet ist,
  welche gestellt und unbeantwortet blieb und welche NIE GESTELLT wurde. Angelegt
  2026-08-20. Sie trägt KEINE Antworten auf Anbieter-Fragen und KEINE
  Entscheidungen. Sie wird NICHT automatisch geladen. AUSLÖSER: derselbe wie bei
  docs/ziel-befunde.md — wer ein Fan-Out-Ziel zuschneidet, einen Adapter baut oder
  beim Anbieter recherchiert, liest BEIDE zuerst.
  DIE ABGRENZUNG ZU docs/ziel-befunde.md IST DER GRUND FÜR ZWEI DATEIEN: Jene trägt
  die ANTWORTEN, je Ziel und mit Provenienz. Diese trägt die FRAGEN und den STAND
  ihrer Beantwortung. Wer eine Antwort hierher schreibt, baut eine zweite Wahrheit,
  die neben dem Befund altert.
  IHRE ZWEI TEILE HABEN VERSCHIEDENE HALTBARKEIT, und das steht in ihrem Kopf
  ausführlich: Der KATALOG ist dauerhaft — eine Frage altert nicht. Die MATRIX ist
  eine MOMENTAUFNAHME vom 2026-08-20 und wird nicht stillschweigend
  fortgeschrieben; wer sie fortschreibt, DATIERT die Fortschreibung.
- docs/roadmap.md — der VOLLTEXT der Roadmap-Phasen: Begründungen, Provenienz,
  Auflagen, Richtigstellungen. Am 2026-08-21 WÖRTLICH aus dieser Datei ausgelagert;
  hier steht seither je Phase EINE Zeile mit ihrem Marker (s. "## Roadmap &
  aktueller Stand"). Sie wird NICHT automatisch geladen. AUSLÖSER: Wer eine Phase
  zuschneidet, abhakt oder ihren Stand ändert, lädt sie ZUERST.
  DER MARKER STEHT HIER, DER VOLLTEXT DORT — das ist keine Doppelung, sondern eine
  Arbeitsteilung: Wer einen MARKER ändert, ändert ihn HIER; wer eine BEGRÜNDUNG
  ändert, ändert sie DORT. Wer beides an einer Stelle nachzieht, hat die andere
  übersehen, und keine der beiden wird davon rot.
  Sie gehört KEINER Phase und wird NICHT archiviert — anders als die
  Phasen-Historien im Detail-Archiv trägt sie auch die noch OFFENEN Phasen und
  bleibt damit ein aktives Dokument, solange es eine Roadmap gibt.

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
- docs/claude-history/phase-11.1-linkedin.md — GESAMTE gebaute Phase 11.1 (LinkedIn als
  VIERTES Fan-Out-Ziel, 2026-08-17 bis 2026-08-19): sechs Scheiben-Zuschnitte (11.1a bis
  11.1f) mit ihren Invarianten und Ausschlüssen, sechs Vermerke mit Bau-Commit und
  Live-Nachweis, der verbliebene Vorrat und die Entscheidungen. Sie ist ZUGLEICH der
  steuernde Stand und die Historie — anders als bei Phase 11 gibt es keine zweite,
  kuratierte Fassung daneben; sie hiess bis zum Phasenende docs/aktiver-stand.md.
  HIER NACHSEHEN, WER AN EINEM FÜNFTEN ZIEL ARBEITET: Der Abschnitt "## Entscheidungen,
  die über ihre Scheibe hinaus binden" trägt NEUN Stück, die am Phasenende NICHT gehoben
  worden sind — darunter die Form der Kennungs-Ablage, die IPv6-Annahme und die
  Klartext-IP als Kennung. Die Anbieter-Befunde selbst stehen NICHT hier, sondern in
  docs/ziel-befunde.md.
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
