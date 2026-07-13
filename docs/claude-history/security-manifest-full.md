## SECURITY MANIFEST & LAUNCH BLOCKERS
Dies ist die EINE Wahrheitsquelle für Launch-Blocker. Die verstreuten Härtungs-
Einträge in der Polish-Liste werden hierher REFERENZIERT, nicht mehr dupliziert.
Prinzip explizit: NICHT alles ist P0. Sequenziert nach dem Moment, in dem das
Risiko real BEISST — sonst ist nichts ein Blocker (eine Liste, auf der alles
"kritisch" ist, priorisiert nichts). Jedes Item trägt vier Felder: RISIKO (was
schiefgeht) / TRAGENDE KONTROLLE (was es abfängt) / EHRLICHE EINORDNUNG (Grenze,
Trade-off, Selbsttäuschung) / BINDET-AN (Phase/Gate, ab dem es real wird).

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH (HÖCHSTE Priorität der Liste): Admin-CLI/Interface, das eine
  project_id/Domain SOFORT im Serving-Zweig sperrt.
  RISIKO: eine gehostete Phishing-/Malware-Seite bleibt live, während man manuell
  in der DB gräbt — Minuten zählen (Shared-Reputation, Tier 1).
  TRAGENDE KONTROLLE: blocked-Flag auf der domains-Zeile, das die (in 7c-1 gebaute)
  Serve-Route VOR dem Ausliefern prüft -> 451/410 statt Content.
  EHRLICHE EINORDNUNG: billig, hakt direkt in die bestehende Serving-Architektur
  (kein neuer Pfad, nur ein Flag + ein Guard). Kein Grund, das zu vertagen.
  BINDET-AN: Serving existiert (7a/7c-1) -> baubar ab sofort, Blocker vor erstem
  echten Fremd-Traffic.
- LOGGING-LEAK schließen:
  RISIKO: Next.js loggt Server-Action-Argumente im Klartext; der CAPI-Token tauchte
  in 2a nachweislich im Dev-Terminal auf -> Secret in Prod-Logs = Leak an jeden mit
  Log-Zugriff, irreversibel sobald exportiert/indexiert.
  TRAGENDE KONTROLLE: STRUKTURELLER Fix — minimieren, wo der Token überhaupt
  hinreist (alternativer Ingestion-Pfad statt Server-Action-Argument), nicht nur
  Maskierung (Maskierung ist umgehbar/vergesslich).
  EHRLICHE EINORDNUNG: Verifikation MUSS instrument-basiert sein (Logs nach einem
  echten Token-Set-Flow auf einem Preview greppen) — nicht aus dem Code "sieht sauber
  aus" schließen (Instrument schlägt Code-Re-Read, 2a-Lektion).
  BINDET-AN: existiert seit 2a; Blocker vor Prod-Logging mit echten Tokens.
  (Ersetzt den gleichlautenden Polish-Listen-Eintrag.)
- E-MAIL-BESTÄTIGUNG wieder aktiv:
  RISIKO: fürs MVP deaktiviert (sofort eingeloggt) -> offene Registrierung =
  Spam-Accounts, Ressourcen-/Kosten-Missbrauch, Wegwerf-Identitäten.
  TRAGENDE KONTROLLE: Double-Opt-in-Confirmation in Supabase Auth wieder anschalten.
  EHRLICHE EINORDNUNG: reiner Dashboard-Toggle, kein Code; bewusste MVP-Abkürzung
  (3.1), die vor Öffentlichkeit zurückgenommen werden MUSS.
  BINDET-AN: öffentlicher Launch. (Ersetzt den Polish-Listen-Eintrag.)
- KOSTEN-CIRCUIT-BREAKER:
  RISIKO: Runaway-Loop/Abuse (KI-Agent in Schleife, Ad-getriebener Traffic-Spike)
  erzeugt eine katastrophale Vercel-/Supabase-Rechnung — Financial-DoS.
  TRAGENDE KONTROLLE: harter Spend-Cap + Alarm auf beiden Plattformen (Plattform-
  Budget-Limits, nicht App-Logik).
  EHRLICHE EINORDNUNG: das ist der grobe Pre-Launch-FLOOR; das feingranulare
  Per-Tenant-Rate-Limiting (Tier 1) ist die präzise Ebene darüber. Beides nötig,
  aber der Cap fängt die Katastrophe ab, bevor Rate-Limits kalibriert sind.
  BINDET-AN: bevor irgendeine Domain öffentlich Traffic zieht.
- ABUSE-KANAL + security.txt auf pgsm.site UND Haupt-App:
  RISIKO: kein Melde-Weg für Security-Forscher/Abuse-Meldungen -> Schwachstellen/
  Missbrauch werden gar nicht oder öffentlich gemeldet; eine Hosting-Plattform ohne
  Meldeweg zu betreiben ist blank fahrlässig.
  TRAGENDE KONTROLLE: /.well-known/security.txt (RFC 9116) mit Kontakt auf BEIDEN
  Origins + überwachtes Abuse-Postfach.
  EHRLICHE EINORDNUNG: trivialer Aufwand, disproportional wichtig, sobald fremde
  Seiten unter unserer Infrastruktur laufen.
  BINDET-AN: Go-Live der Hosting-Schicht.
- SUBPROZESSOR-DPAs + Kunden-DPA:
  RISIKO: ohne signierte Auftragsverarbeitungs-Verträge (Vercel/Supabase als
  Subprozessoren) und ohne signierbaren Kunden-DPA ist der DACH-Betrieb rechtlich
  nicht sauber aufsetzbar (DSGVO Art. 28).
  TRAGENDE KONTROLLE: Vercel/Supabase-DPAs signiert einholen + eigenen Kunden-DPA
  als signierbares DOKUMENT bereitstellen.
  EHRLICHE EINORDNUNG: der automatische AVV-GENERATOR ist ein Post-Launch-
  PRODUKTFEATURE, KEIN Blocker — nur das signierbare Dokument + die Subprozessor-
  Kette müssen zum Launch stehen.
  BINDET-AN: öffentlicher Launch mit echten Kunden(-Daten).

### Tier 1 — Vor echtem Ad-Traffic / Spend (nicht vor dem ersten Login)
- PER-TENANT-RATE-LIMITING /api/e + /api/capi:
  RISIKO: ungebremster Ingest -> Kosten-/Ressourcen-Missbrauch, Verzerrung fremder
  Tenant-Daten.
  TRAGENDE KONTROLLE: Rate-Limit pro Tenant (trackingKey/Projekt) auf beiden Ingest-
  Routen.
  EHRLICHE EINORDNUNG (WICHTIG): /api/e ist GEBAUT, um von echten Besuchern OFT
  getroffen zu werden -> das Limit auf ABUSE kalibrieren, nicht auf Erfolg. Zu
  aggressiv = echte Conversions fallen weg = der Produktwert (First-Party-Resilienz)
  wird selbst zerstört.
  BINDET-AN: bevor echter Ad-Traffic auf gehostete Seiten trifft.
- LOGIN-BRUTE-FORCE:
  RISIKO: unbegrenzte Login-Versuche -> Credential-Stuffing/Brute-Force auf Owner-
  Accounts.
  TRAGENDE KONTROLLE: hartes Rate-Limit auf IP + E-Mail.
  EHRLICHE EINORDNUNG: ZUERST Supabase-Auth-Built-in prüfen (nicht doppelt bauen),
  dann nur die Lücke ergänzen.
  BINDET-AN: sobald es echte Accounts mit echten Assets (Tokens/Domains) gibt.
- SAFE-BROWSING korrekt eingesetzt:
  RISIKO: gehostete Seiten leiten auf Malware-/Phishing-Ziele; pgsm.site wird von
  Google Safe Browsing geflaggt.
  TRAGENDE KONTROLLE: Redirect-ZIEL-URLs aus den Mappings gegen Safe Browsing prüfen
  + überwachen, ob pgsm.site selbst geflaggt wird.
  EHRLICHE EINORDNUNG: KEIN HTML-Content-Scan — das ist ein Kategoriefehler. Die
  Safe-Browsing-API prüft URLs, nicht rohes HTML. Wer HTML durch sie jagt, misst
  nichts.
  BINDET-AN: Fremd-Content live (Hosting).
- SHARED-REPUTATION pgsm.site:
  RISIKO: die *.pgsm.site-Wildcard teilt die Registrable Domain -> EINE geflaggte
  Kundenseite kann ALLE pgsm.site-Seiten mit einem Browser-Interstitial treffen
  (Kollektivhaftung).
  TRAGENDE KONTROLLE: Kill-Switch (Tier 0) zur schnellen Isolierung + riskante/neue
  Nutzer bevorzugt auf Custom-Domains schieben (eigener eTLD+1 -> Blast-Radius auf
  die eine Domain eingedämmt).
  EHRLICHE EINORDNUNG: verschärft die Kill-Switch-Dringlichkeit und ist ein
  konkretes Produkt-Argument für die 7c-Custom-Domain-Arbeit (Durchstich, nicht nur
  Feature).
  BINDET-AN: Multi-Tenant-Serving live; mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION:
  RISIKO: Nutzer wählen bekannt-kompromittierte Passwörter.
  TRAGENDE KONTROLLE: Supabase-HaveIBeenPwned-Abgleich (Auth-Setting).
  EHRLICHE EINORDNUNG: Supabase-Pro-gated (Free Tier kann nicht) -> beim Pro-Wechsel
  aktivieren.
  BINDET-AN: öffentlicher Launch / Pro-Tier. (Ersetzt den Polish-Listen-Eintrag.)
- ENCRYPTION-AT-REST CAPI-Token:
  RISIKO: DB-Dump/Backup-Leak legt die project_tokens im Klartext offen.
  TRAGENDE KONTROLLE: bleibt PRIMÄR Isolation + RLS-SELECT-Sperre + service_role-only
  (die Token sind physisch write-only, auch für den Owner nicht lesbar). Verschlüsselung
  ist DEFENSE-IN-DEPTH obendrauf, NICHT die tragende Kontrolle.
  EHRLICHE EINORDNUNG: pgcrypto mit dem Key NEBEN dem Ciphertext (in derselben DB) ist
  Theater — ein DB-Leak nimmt beides mit. Echtes Envelope braucht den KEK AUSSERHALB
  der DB (KMS). Bis dahin nicht so tun, als schütze ein In-DB-Key.
  BINDET-AN: Härtung nach Launch; kein harter Blocker, solange Isolation steht.
  (Ersetzt den Polish-Listen-Eintrag.)
- VERCEL-TOKEN maximal scoped + Domain-Mutations-AUDIT-LOG:
  RISIKO: der server-only Vercel-API-Token kann Domains am Projekt hinzufügen/löschen;
  Missbrauch/Leak ohne Spur.
  TRAGENDE KONTROLLE: Token auf das Minimum scopen + jede Domain-Mutation mit
  Actor + Zeit protokollieren.
  EHRLICHE EINORDNUNG: Real-time-Anomalie-Alarme sind ein Scale-Thema, nicht MVP —
  das nachvollziehbare Audit-Log reicht für den Start.
  BINDET-AN: 7c-2 (Vercel-Domains-API).

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- DEPENDABOT:
  RISIKO: bekannte CVEs in Dependencies bleiben unbemerkt.
  TRAGENDE KONTROLLE: Dependabot (gratis) JETZT anschalten; optional Snyk.
  EHRLICHE EINORDNUNG: Dauerhygiene, kein Launch-Gate.
  BINDET-AN: laufend.
- BACKUPS + Restore-Drill:
  RISIKO: Datenverlust ohne getesteten Wiederherstellungsweg (ein ungetestetes Backup
  ist kein Backup).
  TRAGENDE KONTROLLE: Supabase-Backup-Tier bestätigen + EINEN echten Restore-Drill
  fahren (kompletten Core-Tabellen-Drop durchspielen), danach reguläre Drills.
  EHRLICHE EINORDNUNG: der erste Drill gehört vor ernsthafte Kundendaten; die
  Wiederholung ist laufende Hygiene.
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
- DATA-RETENTION:
  RISIKO: Analytics-Rohdaten (IP/UA) horten sich unbegrenzt an -> DSGVO-Speicher-
  begrenzung verletzt.
  TRAGENDE KONTROLLE: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren.
  EHRLICHE EINORDNUNG: die Persistenz-Ebene entsteht erst in Phase 8 -> HEUTE nur
  sicherstellen, dass Server-Logs keine IPs horten.
  BINDET-AN: Phase 8 (Ingestion-Persistenz).
- MCP-SICHERHEIT:
  RISIKO: langlebiger MCP-Key mit voller Owner-Autorität in der KI-Umgebung eines
  Dritten -> geleakter Key = Vollzugriff inkl. Token-Write.
  TRAGENDE KONTROLLE: scoped Tokens (z.B. action:read_only), NIE globale Master-
  Rechte; lückenloses Audit-Logging aller KI-induzierten Mutationen.
  EHRLICHE EINORDNUNG: EXPLIZIT kein Launch-Gate (das Feature existiert vor Phase 10
  nicht); deckt sich mit dem bestehenden "Session-unabhängige Mutationen / MCP-ready"-
  Baustil.
  BINDET-AN: Phase 10.

