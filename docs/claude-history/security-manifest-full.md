## SECURITY MANIFEST & LAUNCH BLOCKERS
Diese Datei trägt die vollständige BEGRÜNDUNG je Item. Die Root — CLAUDE.md,
"## Security Manifest & Launch Blocker" — trägt die Tier-Übersicht und zusätzlich die
OPERATIVEN ARTEFAKTE für den Ernstfall (SQL-Runbook, Verifikations-Lektionen, offene
Betriebs-Punkte); die liegen dort, weil CLAUDE.md jede Session geladen ist und diese Datei
nicht.
DER STATUS JE ITEM STEHT IN BEIDEN FASSUNGEN UND MUSS DECKUNGSGLEICH SEIN — er ist NICHT
das Unterscheidungsmerkmal. Wer ein Item hier umstuft, stuft es in der Root mit um und
umgekehrt: beide Fassungen werden IMMER im selben Commit geändert, und genau das ist der
Mechanismus, der die Deckungsgleichheit sichert.
NICHT ALS ALLEINIGE WAHRHEITSQUELLE LESEN: die frühere Selbstbeschreibung ("die EINE
Wahrheitsquelle für Launch-Blocker") war beim KILL-SWITCH nachweislich falsch — er stand
hier als offener Blocker, während er längst gebaut und live verifiziert war. Genau deshalb
ist der Status hier zu pflegen UND gegen die Root zu prüfen, nicht der Root zu überlassen.
ABLAGEORT SAGT NICHTS ÜBER DEN STATUS: Diese Datei liegt in docs/claude-history/, ist aber
ein AKTIVES Dokument. Items werden hier UMGESTUFT, nicht annotiert — anders als die
Phasen-Historien im selben Ordner, die als Zeitdokument stehenbleiben. Die History-Regel
also NICHT mechanisch nach Pfad anwenden.
Die verstreuten Härtungs-Einträge in der Polish-Liste werden hierher REFERENZIERT, nicht
mehr dupliziert. Prinzip explizit: NICHT alles ist P0. Sequenziert nach dem Moment, in dem
das Risiko real BEISST — sonst ist nichts ein Blocker (eine Liste, auf der alles
"kritisch" ist, priorisiert nichts). Jedes Item trägt vier Felder: RISIKO (was
schiefgeht) / TRAGENDE KONTROLLE (was es abfängt) / EHRLICHE EINORDNUNG (Grenze,
Trade-off, Selbsttäuschung) / BINDET-AN (Phase/Gate, ab dem es real wird).

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH — ERLEDIGT (gebaut 2026-07-14, live verifiziert): HÖCHSTE Priorität der
  Liste. Sperrt ein Projekt SOFORT im Serving-Zweig. Das Datum belegt den BAU (Commit auf
  Migration 0008); wann der Live-Smoke lief, ist nicht erhoben — er ist bestanden (4/4,
  Details in der Root), aber ohne belegtes Datum.
  RISIKO: eine gehostete Phishing-/Malware-Seite bleibt live, während man manuell
  in der DB gräbt — Minuten zählen (Shared-Reputation, Tier 1).
  TRAGENDE KONTROLLE (Ist-Zustand): Die Sperre ist PROJEKTBASIERT — projects.blocked_at,
  gesetzt per SQL-Runbook (Migration 0008). Die Serve-Route prüft VOR dem Ausliefern und
  antwortet mit 451 plus statischer Erklärseite; der Ingest (/api/e) verwirft früh, VOR dem
  Token-Lookup. Fail-closed: jeder unklare Zustand fällt auf notfound, published_content
  verlässt den Server nur bei eindeutigem "ok".
  Die Spalte domains.blocked_at existiert ebenfalls (0008) und wird im Serve-Pfad
  MITGEPRÜFT — als eigener früher Ausgang VOR der Projekt-Query, damit die Domain-Ebene
  später ohne Umbau scharf ist. Sie wird heute von KEINEM Code-Pfad geschrieben; operativ
  ist sie nicht in Gebrauch. (Am Code erhoben 2026-07-28: src/lib/hosting/resolve.ts, die
  beiden Zweige "if (domain.blocked_at) return BLOCKED" und "if (project.blocked_at) return
  BLOCKED"; Spalten in supabase/migrations/0008_kill_switch.sql.)
  EHRLICHE EINORDNUNG: billig gewesen, weil es direkt in die bestehende Serving-Architektur
  hakte (kein neuer Pfad, nur ein Flag + ein Guard) — die Einschätzung hat sich bestätigt.
  Die OPERATIVEN Artefakte liegen bewusst NICHT hier, sondern in der Root (CLAUDE.md,
  "## Security Manifest & Launch Blocker"): das SQL-Runbook zum Sperren/Entsperren/
  Auflisten, die Verifikations-Lektion zum Ingest-Pfad ("KILL-SWITCH — LEKTION") und der
  offene Betriebs-Punkt zur noch leeren NEXT_PUBLIC_ABUSE_CONTACT. Hier nur Cross-Link,
  keine Duplikation — zwei Kopien derselben Lektion laufen auseinander. Grund für die
  Aufteilung: CLAUDE.md ist im Ernstfall ohnehin geladen, diese Datei nicht. WER DEN
  KILL-SWITCH VERIFIZIERT, LIEST DIE LEKTION DORT ZUERST: der naheliegende Weg über den
  HTTP-Statuscode beweist nichts.
  BINDET-AN: erledigt vor erstem echten Fremd-Traffic. Serving existierte (7a/7c-1), die
  Sperre kam mit 0008.
- E-MAIL-BESTÄTIGUNG wieder aktiv:
  RISIKO: fürs MVP deaktiviert (sofort eingeloggt) -> offene Registrierung =
  Spam-Accounts, Ressourcen-/Kosten-Missbrauch, Wegwerf-Identitäten.
  TRAGENDE KONTROLLE: Double-Opt-in-Confirmation in Supabase Auth wieder anschalten.
  EHRLICHE EINORDNUNG: reiner Dashboard-Toggle, kein Code; bewusste MVP-Abkürzung
  (3.1), die vor Öffentlichkeit zurückgenommen werden MUSS.
  BINDET-AN: öffentlicher Launch. (Ersetzt den Polish-Listen-Eintrag.)
- KOSTEN-CIRCUIT-BREAKER (SUPABASE ERLEDIGT 2026-07-29 / VERCEL strukturell gedeckelt):
  RISIKO: Runaway-Loop/Abuse (KI-Agent in Schleife, Ad-getriebener Traffic-Spike)
  erzeugt eine katastrophale Vercel-/Supabase-Rechnung — Financial-DoS.
  TRAGENDE KONTROLLE: harter Spend-Cap + Alarm auf beiden Plattformen (Plattform-
  Budget-Limits, nicht App-Logik).
  EHRLICHE EINORDNUNG: das ist der grobe Pre-Launch-FLOOR; das feingranulare
  Per-Tenant-Rate-Limiting (Tier 1) ist die präzise Ebene darüber. Beides nötig,
  aber der Cap fängt die Katastrophe ab, bevor Rate-Limits kalibriert sind.
  STAND 2026-07-29 — GETRENNT NACH PLATTFORM, weil der Trigger nur auf EINER eingetreten ist:
  SUPABASE: Pro gebucht -> der abrechenbare Eskalationsweg existiert jetzt -> Spend Cap $25
  HART gesetzt, Alarm bei 80 %. Damit ist die tragende Kontrolle dort vollzogen.
  VERCEL: bleibt HOBBY. Die strukturelle Deckelung gilt unverändert — kein Überverbrauch,
  kein abrechenbarer Eskalationsweg, der Schaden wäre ein harter Stopp statt einer Rechnung.
  Ein Cap ist dort heute nicht setzbar und wäre auch wirkungslos.
  KEIN pauschales "erledigt" über beide Plattformen: die Begründung des Items war immer
  plan-abhängig, und genau diese Abhängigkeit macht die Trennung nötig.
  BINDET-AN: für Vercel weiterhin PRO-UPGRADE — geht Vercel je auf Pro, wird der Cap dort
  SOFORT fällig, weil dann die strukturelle Deckelung entfällt, die ihn heute ersetzt.
  Kopplung zum Backup-Bedarf (Tier 2) ist mit dem Supabase-Wechsel eingelöst.
- ABUSE-KANAL + security.txt auf publayer.net UND Haupt-App:
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
  RISIKO: gehostete Seiten leiten auf Malware-/Phishing-Ziele; publayer.net wird von
  Google Safe Browsing geflaggt.
  TRAGENDE KONTROLLE: Redirect-ZIEL-URLs aus den Mappings gegen Safe Browsing prüfen
  + überwachen, ob publayer.net selbst geflaggt wird.
  EHRLICHE EINORDNUNG: KEIN HTML-Content-Scan — das ist ein Kategoriefehler. Die
  Safe-Browsing-API prüft URLs, nicht rohes HTML. Wer HTML durch sie jagt, misst
  nichts.
  BINDET-AN: Fremd-Content live (Hosting).
- SHARED-REPUTATION publayer.net:
  RISIKO: die *.publayer.net-Wildcard teilt die Registrable Domain -> EINE geflaggte
  Kundenseite kann ALLE publayer.net-Seiten mit einem Browser-Interstitial treffen
  (Kollektivhaftung).
  TRAGENDE KONTROLLE: Kill-Switch (Tier 0) zur schnellen Isolierung + riskante/neue
  Nutzer bevorzugt auf Custom-Domains schieben (eigener eTLD+1 -> Blast-Radius auf
  die eine Domain eingedämmt).
  EHRLICHE EINORDNUNG: verschärft die Kill-Switch-Dringlichkeit und ist ein
  konkretes Produkt-Argument für die 7c-Custom-Domain-Arbeit (Durchstich, nicht nur
  Feature).
  BINDET-AN: Multi-Tenant-Serving live; mildernd über 7c.
- LEAKED-PASSWORD-PROTECTION (ERLEDIGT 2026-07-29):
  RISIKO: Nutzer wählen bekannt-kompromittierte Passwörter.
  TRAGENDE KONTROLLE: Supabase-HaveIBeenPwned-Abgleich (Auth-Setting) — AKTIV seit dem
  Pro-Wechsel 2026-07-29.
  EHRLICHE EINORDNUNG: war Supabase-Pro-gated (Free Tier kann es nicht); der Trigger
  "Pro-Tier" ist eingetreten und wurde im selben Zug abgearbeitet. Reiner Dashboard-Toggle,
  kein Code — die Kontrolle wirkt ab sofort auf jede Registrierung und Passwortänderung,
  BESTEHENDE Passwörter prüft sie NICHT rückwirkend.
  BINDET-AN: erledigt; keine offene Bindung mehr. (Ersetzt den Polish-Listen-Eintrag.)
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
  TEILERFÜLLT (Stand 2026-07-28): 7c-2 ist abgeschlossen, und die CUSTOM-DOMAIN-Mutationen
  schreiben ihr Audit-Log (lib/domains/register.ts und remove.ts, je aus dem finally). Die
  LABEL-Vergabe dagegen nicht: assignDomainLabel und die Label-Wiederherstellung schreiben
  KEINEN Eintrag — ausgerechnet die Vorgänge, deren Historie man bei einer Divergenz
  bräuchte. Der Grund ist bekannt und nicht nebenbei zu beheben: writeAuditLog verlangt
  einen service_role-Client, den publishProject bewusst NICHT instanziiert. Kein neuer
  offener Punkt — der Eintrag existiert bereits in der Root, CLAUDE.md "## Offene Punkte",
  "LABEL-VERGABE IST UNPROTOKOLLIERT".
  BINDET-AN: 7c-2 (Vercel-Domains-API) — abgeschlossen; der Rest bindet an den
  Abuse-/Audit-Ausbau bzw. an öffentlichen Traffic.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- LOGGING-LEAK (herabgestuft von Tier 0, gemessen 2026-07-24):
  RISIKO: Next.js loggt Server-Action-Argumente im Klartext; der CAPI-Token tauchte
  in 2a nachweislich im Dev-Terminal auf -> Secret in Prod-Logs = Leak an jeden mit
  Log-Zugriff, irreversibel sobald exportiert/indexiert.
  TRAGENDE KONTROLLE: STRUKTURELLER Fix — minimieren, wo der Token überhaupt
  hinreist (alternativer Ingestion-Pfad statt Server-Action-Argument), nicht nur
  Maskierung. Bleibt Defense-in-Depth.
  EHRLICHE EINORDNUNG (GEMESSEN 2026-07-24, Differenztest in Vercel-Prod-Logs): Auf dem
  erfolgreichen setCapiToken-Pfad wird das Server-Action-Argument in PRODUKTION NICHT
  geloggt. Positivkontrolle bestanden (POST-Zeilen zum Aufrufzeitpunkt vorhanden, Aufruf
  lief durch), die Token-Sonde taucht in KEINER Zeile auf (Messages-Spalte leer). Log-Drains
  sind Pro-gated und keine konfiguriert -> Logs verlassen Vercel nicht. Die 2a-Beobachtung war
  das Dev-Terminal (next dev), nicht Prod. KEINE Token-Rotation nötig. Restrisiken: der
  FEHLERpfad ist ungetestet, und das lokale Dev-Terminal loggt weiter -> der strukturelle Fix
  bleibt sinnvoll als Defense-in-Depth, ist aber kein harter Launch-Blocker mehr. WIEDERVORLAGE:
  der Befund gilt fuer den HEUTIGEN Code — setCapiToken ist die EINZIGE Server Action mit
  Secret-Parameter (erhoben 2026-07-24). Bei JEDER neuen Server Action mit Secret-Parameter neu
  bewerten.
  BINDET-AN: laufend (Defense-in-Depth). Nicht mehr Launch-Gate (gemessen 2026-07-24, in
  Produktion nicht materialisiert). (Ersetzt den gleichlautenden Polish-Listen-Eintrag.)
- DEPENDABOT — ERLEDIGT (2026-07-24):
  RISIKO: bekannte CVEs in Dependencies bleiben unbemerkt.
  TRAGENDE KONTROLLE: Dependabot aktiviert — Alerts, Security Updates, Dependency Graph, 1 Regel.
  EHRLICHE EINORDNUNG: Dauerhygiene, kein Launch-Gate; erledigt am 2026-07-24.
  BINDET-AN: laufend (aktiv).
- BACKUPS + Restore-Drill (TEILWEISE ERLEDIGT — Backup-Tier bestätigt 2026-07-29, DRILL
  GEFAHREN UND BESTANDEN 2026-07-30; PITR und die migrations-only Rebuild-Lücke bleiben
  OFFEN):
  RISIKO: Datenverlust ohne getesteten Wiederherstellungsweg (ein ungetestetes Backup
  ist kein Backup).
  TRAGENDE KONTROLLE: Supabase-Backup-Tier bestätigen (erledigt) + EINEN echten
  Restore-Drill fahren (kompletten Core-Tabellen-Drop durchspielen) — GEFAHREN UND
  BESTANDEN am 2026-07-30, s. Punkt (1) unten; danach reguläre Drills.
  STAND 2026-07-29 — DAS BACKUP-TIER IST BESTÄTIGT: Supabase auf PRO -> TÄGLICHE Backups mit
  7 Tagen Retention. Die Messung vom 2026-07-24 ("FREE hat GAR KEINE Backups, kein Scheduled,
  kein PITR") ist damit ÜBERHOLT — sie bleibt hier nur als Herkunft der Entscheidung stehen,
  nicht als Ist-Zustand.
  WAS AUF DEM SPIEL STEHT (die Aufzählung gehört zum Item, nicht zum Plan-Zustand): die
  laufende DB trägt unersetzliche Daten — Projekte, CAPI-Tokens, published_content und die
  Event-Historie mit den Phase-8-Live-Beweisen. Genau deshalb ist der ungefahrene Drill kein
  Formalismus.
  DER STAND JE PUNKT (einer davon jetzt GEMESSEN geklärt, zwei bleiben offen — das ist
  der Grund, warum die TRAGENDE KONTROLLE weiterhin nur TEILWEISE vollzogen ist):
  (1) DER DRILL WURDE GEFAHREN UND BESTANDEN — 2026-07-30, Methode "Restore to new
      project" (ein neues, temporäres Supabase-Projekt aus einem Backup-Snapshot erzeugt,
      gegen das die Proben liefen, danach wieder gelöscht) — nicht exakt die oben
      skizzierte Methode ("kompletten Core-Tabellen-Drop durchspielen"), aber dieselbe
      Frage beantwortend: kann aus einem Backup tatsächlich wiederhergestellt werden.
      GEMESSEN (supabase/checks/restore-drill.sql, Teil A/B/C): Migrationsstand,
      Event-Trigger-Liste und Funktionsliste (inkl. Sicherheitstyp) waren im
      restaurierten Projekt ZEILENIDENTISCH zum Original; die Positivkontrolle
      (Wegwerf-Tabelle ohne explizites "enable row level security") ergab
      rls_automatisch_aktiviert = true — ensure_rls übersteht den Restore.
      WAS DIESER DRILL NICHT GEPRÜFT HAT: ob Tabellen/Policies/Daten selbst vollständig
      und unverändert im restaurierten Projekt ankamen. Teil A/B beschränken sich auf
      schema_migrations, Event-Trigger und Funktionsliste; eine vollständige
      Daten-/Tabellen-Restore-Verifikation ist NICHT Teil dieser Messung und bleibt
      ausständig.
      GRENZE: Der Beweis gilt für DIESEN Drill mit DIESER Backup-Generation, KEIN Beweis
      für alle Zeit — ändert Supabase die Restore-Mechanik, wäre der Drill zu
      wiederholen.
  (2) PITR IST NICHT GEBUCHT -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem letzten
      täglichen Snapshot). Bewusste Entscheidung, kein Versehen — aber sie MUSS sichtbar
      bleiben: ein Text, der nur "Backups vorhanden" sagt, wäre eine stille Abschwächung
      dieses Items.
  (3) DIE ensure_rls-REBUILD-LÜCKE BESTEHT WEITER — ABER NUR NOCH FÜR DEN
      MIGRATIONS-ONLY-PFAD. Für den SUPABASE-RESTORE-Pfad ist die Frage durch (1) jetzt
      gemessen beantwortet (der Trigger übersteht ihn). Unverändert offen bleibt ein
      Aufbau REIN AUS DEN MIGRATIONSDATEIEN (z.B. lokales `supabase db reset`, CI,
      Self-Hosting): dort fehlt ensure_rls weiterhin, weil kein CREATE in einer
      Migration steht (s. CLAUDE.md "## Offene Punkte"). Der Event-Trigger hängt am
      CLUSTER, nicht am Schema, und kann in keinem Schema-Dump/keiner Migrationsdatei
      enthalten sein — automatische Backups UND dieser Drill ändern daran für den
      Migrations-Pfad NICHTS.
  ZWISCHENLÖSUNG — HISTORISCH, MIT DEM PRO-WECHSEL NICHT MEHR TRAGEND: Ein manueller pg_dump WURDE
  gezogen — Umfang public-Schema + auth.users, AES256 verschlüsselt, extern abgelegt (nicht im
  Repo) und per "pg_restore --list" verifiziert; das Listing zeigte 5 Tabellen plus Funktionen
  inklusive rls_auto_enable.
  DASS IM REPO KEIN BELEG LIEGT, IST KORREKT UND KEIN MANGEL: ein DB-Dump gehört nicht ins Git,
  auch verschlüsselt nicht. Wer hier nach einem Artefakt sucht, findet zu Recht keines und darf
  daraus NICHT "nicht erledigt" schließen. PROVENIENZ dieser Angabe: aus der Chat-Zusammenfassung
  der Hygiene-Runde, NICHT am Repo verifizierbar.
  DER EVENT-TRIGGER FEHLTE ERWARTUNGSGEMÄSS, ebenfalls kein Mangel: ensure_rls hängt am CLUSTER,
  nicht am Schema, und kann in einem Schema-Dump gar nicht enthalten sein. Genau deshalb liegt
  sein DDL separat unter supabase/manual/rls_auto_enable.sql und muss bei JEDEM Restore MANUELL
  mitgezogen werden (Hintergrund: Offener Punkt "rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN"
  in der Root).
  DER EIGENTLICHE BEFUND — DER DUMP IST HEUTE NICHT MEHR WIEDERHERSTELLUNGSTAUGLICH: Er entstand
  VOR Phase 9. Die Migrationen 0016 (html_b/mappings_b), 0017 (ab_test_active, events.variant)
  und 0018 (schema_migrations) kamen alle DANACH. Ein Restore aus diesem Dump stellte ein Schema
  her, das der DEPLOYTE Code nicht bedienen kann -> PostgREST 42703, derselbe Fehlermodus wie
  eine vergessene Migration, nur im Notfall statt beim Deploy. Die Zwischenlösung war EINMALIG,
  nicht laufend.
  ABGEDECKTER STAND ALS MIGRATIONSSTAND, NICHT ALS DATUM (ein Backup ohne dokumentierten Stand
  ist ein Backup, dessen Wert man nicht kennt): Stand VOR 0018 — unabhängig belegt, weil das
  pg_restore-Listing 5 Tabellen zeigte und public heute 6 trägt (schema_migrations kam mit 0018;
  gemessen 2026-07-28). Dass er zusätzlich vor 0016 liegt, stammt aus der Chat-Zusammenfassung
  und ist KEINE Messung. Ein exaktes Datum ist nicht erhebbar: die Hygiene-Runde lag im Zeitraum
  24.-27.07.2026, und der Dump trägt keinen eigenen Zeitstempel.
  WIEDERVORLAGE-GRUNDSATZ (NEU GEFASST 2026-07-29, nicht gestrichen): Die Pflicht zum
  MANUELLEN Dump nach jeder Migration entfällt — Pro zieht täglich automatisch. Die
  WIRKRICHTUNG der Regel bleibt und war immer ihr Kern: gefährlich wird ein Backup nicht durch
  ALTER, sondern durch ein SCHEMA, das seither weitergezogen ist. Automatische Backups nehmen
  das nicht weg, sie verschieben es nur — das jüngste Backup ist jetzt höchstens 24 h alt und
  kann trotzdem VOR einer seither gelaufenen Migration liegen. Daraus die heutige Fassung: nach
  jeder ausgeführten Migration gilt das automatische Backup als nicht mehr code-kompatibel, bis
  der nächste Snapshot durch ist; wer in diesem Fenster riskant operiert, zieht vorher EINEN
  manuellen Dump. Seit 0018 trägt jeder Dump schema_migrations IN SICH: der abgedeckte Stand
  ist im Backup selbst dokumentiert statt in einer Notiz daneben, die verlorengeht — genau
  deshalb ist diese Lücke überhaupt erkennbar. Regeltext: CLAUDE.md "## Immer beachten".
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
- DATA-RETENTION:
  RISIKO: Analytics-Rohdaten (IP/UA) horten sich unbegrenzt an -> DSGVO-Speicher-
  begrenzung verletzt.
  TRAGENDE KONTROLLE: Rohdaten (IP/UA) nach max. 30 Tagen löschen/anonymisieren.
  EHRLICHE EINORDNUNG (Ist-Zustand): Die Persistenz-Ebene EXISTIERT — Phase 8 ist gebaut
  (events). Die 30-Tage-Pflicht ist dadurch aber NICHT ausgelöst: events trägt KEIN IP/UA
  und keine Personen-Identität. Sie bindet erst an die Scheibe, die IP/UA einführt
  (Bot-Filter/Uniques). Heute daher nur sicherstellen, dass Server-Logs keine IPs horten.
  WECHSELWIRKUNG fürs spätere events-Pruning (der Grund, warum Retention hier kein reines
  Löschthema ist): Löscht ein Retention-/Aggregations-Pruning die ERSTE verankerte
  source='browser'-Bestätigung eines Projekts, springt der selbstheilende Stichtag der
  Adblocker-Verlustrate nach vorn — die angezeigte Rate ändert sich RÜCKWIRKEND und STILL,
  ohne Fehler und ohne Hinweis. Ein Pruning muss die Verlustraten-Verankerung
  berücksichtigen.
  BINDET-AN: nicht mehr "Phase 8" (die ist gebaut), sondern die erste Scheibe, die IP/UA
  oder personenbezogene Merkmale persistiert. Siehe auch die Datenklassen-Grenze in der
  Root, CLAUDE.md "## Offene Punkte".
- MCP-SICHERHEIT:
  RISIKO: langlebiger MCP-Key mit voller Owner-Autorität in der KI-Umgebung eines
  Dritten -> geleakter Key = Vollzugriff inkl. Token-Write.
  TRAGENDE KONTROLLE: scoped Tokens (z.B. action:read_only), NIE globale Master-
  Rechte; lückenloses Audit-Logging aller KI-induzierten Mutationen.
  EHRLICHE EINORDNUNG: EXPLIZIT kein Launch-Gate (das Feature existiert vor Phase 10
  nicht); deckt sich mit dem bestehenden "Session-unabhängige Mutationen / MCP-ready"-
  Baustil.
  BINDET-AN: Phase 10.

