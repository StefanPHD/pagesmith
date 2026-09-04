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
  ZUSATZ 2026-08-25 — KEINE UMSTUFUNG. Die vier Felder darüber bleiben WÖRTLICH, der Status
  bleibt OFFEN, BINDET-AN bleibt unverändert. Was hier dazutritt, ist eine PRÜFUNG des
  Feldes EHRLICHE EINORDNUNG an der Anbieter-Doku — und sie fällt für die zwei Hälften
  jenes Satzes verschieden aus:
  ZUR ERSTEN HÄLFTE ("pgcrypto mit dem Key NEBEN dem Ciphertext ist Theater"): WÖRTLICH
  BESTÄTIGT. Der Anbieter schreibt zum selben Sachverhalt: "there is little value in
  storing the encryption key in the database itself as this would be like locking your
  front door but leaving the key in the lock! Storing the key outside the database fixes
  this issue." Zwei unabhängig entstandene Quellen, dieselbe Aussage, dasselbe Bild.
  ZUR ZWEITEN HÄLFTE ("Echtes Envelope braucht den KEK AUSSERHALB der DB (KMS)"): SCHWEIGEN
  MIT BENANNTER ACHSE. Die Begriffe KMS, envelope und key management service kommen auf den
  beiden im VOLLTEXT gelesenen Anbieter-Seiten NICHT vor; der Anbieter beschreibt "our
  secured backend systems" plus einen Abruf über die Management-API und benennt das
  Verfahren nicht. WEDER BESTÄTIGT NOCH WIDERLEGT — und ausdrücklich NICHT als Bestätigung
  gebucht, weil ein passendes Verfahren und ein benanntes Verfahren zweierlei sind.
  DIE FOLGE FÜR DIE REICHWEITE DES SATZES, und sie ist der eigentliche Zugewinn dieses
  Zusatzes: Der Wurzelschlüssel des Anbieters liegt NICHT in unserem Postgres. Der Satz
  trifft damit eine Ablage MIT Schlüssel IN der Datenbank — er trifft NICHT jedes
  Verfahren, das der Anbieter anbietet. Wer ihn als pauschales Urteil über
  Anbieter-Verfahren liest, liest ihn zu weit.
  WAS ABGELEGT UND NICHT VERRECHNET WIRD: Der Anbieter hält fest, Projekte seien ohnehin at
  rest verschlüsselt und das genüge "likely" für Compliance-Bedarf (SOC2, HIPAA). Das ist
  GELESEN und zählt NICHT als Antwort auf die Verschlüsselungs-Auflage des Google-Ziels —
  jene ist eine Auslegungsfrage und wird an anderer Stelle entschieden.
  WARUM DREI STELLEN, DIE DENSELBEN SATZ ZITIEREN, UNBERÜHRT BLEIBEN — der Absatz steht
  hier, damit die nächste Runde es nicht als Versäumnis liest:
  · supabase/migrations/0021_project_secrets.sql und 0005_project_tokens.sql tragen den
    Gedanken als Kommentar. ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN,
    auch kein Kommentar (docs/immer-beachten.md). Und sie brauchen es nicht: Beide
    beschreiben genau den Fall, den der Satz trifft — eine Ablage MIT Schlüssel in der
    Datenbank. Ihre Aussage ist unverändert richtig.
  · docs/claude-history/future-roadmap.md zitiert ihn und nennt ihn "heute korrekt". Was
    unter docs/claude-history/ liegt, ist ein Zeitdokument und wird nicht rückwirkend
    korrigiert.
  · DIESE DATEI IST DIE BENANNTE AUSNAHME, aus zwei Gründen: Sie ist laut eigenem Kopf ein
    AKTIVES Dokument ("ABLAGEORT SAGT NICHTS ÜBER DEN STATUS"), und CLAUDE.md verlangt
    ausdrücklich, beide Manifest-Fassungen IMMER im selben Commit zu ändern. Die
    Kurzfassung trägt denselben Zusatz in ihrer Bauform — knapper, ohne die vier Felder.
  PROVENIENZ: GELESEN am 2026-08-25 an supabase.com/docs/guides/database/vault (Abschnitt
  "Encryption key location") und supabase.com/docs/guides/database/extensions/pgsodium,
  beide im Volltext; die Abwesenheit der drei Begriffe ist GEMESSEN am Seitentext (CC,
  2026-08-25). KEINE Messung an dieser Datenbank. Volle Fundstellen und der gelesene
  Umfang: docs/plattform-befunde.md, Abschnitt "Supabase (Postgres · Auth · RLS · Vault ·
  Backups)", Teile (q) und (r).
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
- META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK (EINGESTUFT 2026-08-10 als TIER 1 —
  OWNER-ENTSCHEIDUNG; HERKUNFT: die Sektion "OHNE STUFE — Einstufung steht aus", die mit
  diesem Zug leer wurde und deshalb entfernt ist. Befund erhoben 2026-08-10):
  ZUR FORM DIESES ZUGES, und sie gehört hierher, weil die Warteraum-Regel mit der Sektion
  verschwunden ist: Die eine zuvor vollzogene Umstufung dieser Datei (LOGGING-LEAK,
  Tier 0 -> Tier 2) trägt RICHTUNG und HERKUNFT im Titel. Eine RICHTUNG gibt es hier
  NICHT — ein Warteraum ist keine Stufe, von der aus etwas auf- oder absteigt; der Titel
  nennt deshalb ZUG und HERKUNFT. Alles Übrige folgt dem Präzedenzfall: das Item ist
  physisch gezogen, am alten Ort bleibt KEIN Platzhalter, die alte Lage ist allein über
  diesen Titel lesbar.
  RISIKO: describeMetaError in src/lib/capi/meta-forward.ts trägt Fremdtext aus der
  Antwort des Anbieters in unser Server-Log. Stuft der Anbieter das übergebene
  Zugangsdatum als MALFORMED ein, spiegelt er die gesendete Zeichenkette in seiner
  Meldung zurück — und diese Meldung wird geloggt. Ein Log-Eintrag ist irreversibel,
  sobald er exportiert oder indexiert ist (dieselbe Eigenschaft, die der LOGGING-LEAK-
  Eintrag in Tier 2 für seinen eigenen, ANDEREN Mechanismus benennt).
  DER PFAD IM EINZELNEN — AM CODE ERHOBEN am 2026-08-10, KEINE Handmessung: Die Funktion
  hat VIER Ausgänge, nicht zwei. Zwei sind sauber (ein Marker bei unlesbarem Rumpf, ein
  Marker bei fehlendem Fehler-Umschlag). ZWEI tragen Fremdtext:
  · DER JSON-PFAD loggt fünf benannte Felder des Anbieter-Umschlags, darunter dessen
    freien Meldungstext (msg=), je über asLogValue auf META_ERROR_MSG_MAX gekappt.
  · DER NICHT-JSON-RÜCKFALL loggt den ROHEN Antwort-Rumpf, ungeprüft, auf dieselbe
    Länge gekappt. DAS IST DIE BREITERE DER BEIDEN ÖFFNUNGEN: der JSON-Pfad greift
    wenigstens ein benanntes Feld heraus, dieser Pfad gibt heraus, was kommt.
  BEIDE KAPPUNGEN SCHNEIDEN VOM ANFANG (slice(0, MAX)). Sie begrenzen die LÄNGE, nicht
  den INHALT — ein Geheimnis am Anfang der Zeichenkette überlebt die Kappung vollständig.
  DAS GEHT ÜBER DIE VORLAGE HINAUS UND VERSCHÄRFT DEN BEFUND — AM CODE ERHOBEN,
  2026-08-10: Das Zugangsdatum reist bei diesem Anbieter im QUERY-STRING der Forward-URL
  (…/events?access_token=…), nicht in einem Header. DIE DATEI WEISS DAS: der Kopf von
  describeMetaError schreibt ausdrücklich "NIE die Forward-URL (sie traegt den
  access_token im Query-String)". Dieselbe Zeichenkette, deren Transportweg dort als
  geheimnistragend erkannt und ausgeschlossen wird, kommt über die Antwort des Anbieters
  zurück und wird geloggt. Die Vorsichtsmassnahme ist vorhanden und wirkt auf dem HINWEG;
  der RÜCKWEG ist ungedeckt.
  DIE MESSUNG — PROVENIENZ: HANDMESSUNG von Stefan am 2026-08-07 per curl. KEINE
  Anbieter-Doku, KEINE Code-Messung. Zwei Aufrufe:
  (1) Ein Zugangsdatum, das der Anbieter als MALFORMED erkennt: Er spiegelt die
      übergebene Zeichenkette VOLLSTÄNDIG in der Meldung zurück. Gesendet wurde eine
      Dummy-Zeichenkette; sie stand komplett in der Antwort.
  (2) Ein Zugangsdatum in unparsbarer Form: generische Meldung, KEINE Rückspiegelung.
  DIE WEITE DES BEFUNDS IST SCHMALER, ALS SIE ZUERST AUSSAH — und das gehört an den
  Anfang, nicht ans Ende: GEMESSEN ist die Rückspiegelung NUR für den Fall, in dem der
  Anbieter das Zugangsdatum als MALFORMED einstuft. NICHT GEMESSEN ist, was ein ECHTES,
  WOHLGEFORMTES, aber WIDERRUFENES oder ABGELAUFENES Zugangsdatum auslöst — der Anbieter
  antwortet dort mit einer anderen Meldungsart, und ob sie das Zugangsdatum nennt, weiss
  niemand.
  DIE ENTLASTENDE FOLGE, weil sie die Einstufung berührt: GESPIEGELT WIRD AUSGERECHNET
  DANN, WENN DAS ZUGANGSDATUM KEIN FUNKTIONIERENDES ZUGANGSDATUM IST. Ein Tippfehler beim
  Einfügen landet im Log — aber ein Tippfehler öffnet nichts.
  OFFENER PUNKT — EIN MECHANISMUS, DER DIE OBERGRENZE DES BEFUNDS HEBT (ÜBERLEGUNG des
  Architekten, 2026-08-10; NICHT GEMESSEN — keine Anbieter-Doku, keine Handmessung, keine
  Code-Messung):
  Eine Gateway- oder Fehlerseite spiegelt häufig die ANGEFRAGTE URL zurück. Bei diesem
  Anbieter steht das Zugangsdatum IN dieser URL, im Query-String. FOLGE: Auf dem
  NICHT-JSON-Pfad könnte damit ein GÜLTIGES Zugangsdatum ins Log geraten — und das ist der
  einzige Weg, auf dem das strukturell möglich ist; auf den übrigen Wegen kommt zurück,
  was der Anbieter selbst in seine Meldung schreibt.
  DIE GRENZE, und sie ist der halbe Punkt: NICHT GEMESSEN. Weder ist belegt, dass dieser
  Anbieter je eine Nicht-JSON-Antwort liefert, noch dass eine solche die URL enthielte. Es
  ist eine Überlegung über eine verbreitete Bauart FREMDER Systeme, nicht über dieses.
  WARUM ER TROTZDEM IM EINTRAG STEHT: Er hebt die OBERGRENZE. Ohne ihn lautet die
  schärfste denkbare Auswirkung "ein abgelehntes Zugangsdatum im Log", mit ihm "ein
  funktionierendes". Eine Einstufung, die ihn nicht kennt, stuft eine andere Sache ein.
  WAS DIE CODE-SEITE HERGIBT — am Code erhoben 2026-08-10. Sie STÜTZT den Mechanismus in
  drei Punkten und ENTKRÄFTET ihn in keinem:
  · ERREICHBAR: Der Nicht-JSON-Rückfall hat keinen Guard. Er wird betreten, sobald eine
    Antwort mit !res.ok ankommt, deren Rumpf nicht als JSON parst — kein toter Code.
    Timeout und Abort erreichen ihn NICHT: die münden im äusseren catch, das allein
    errorName loggt.
  · DIE DATEI RECHNET SELBST MIT DIESER ANTWORTART: Der Kommentar über dem Rückfall nennt
    wörtlich "HTML-Fehlerseite, leerer Body, Gateway-Antwort". Das ist die ERWARTUNG des
    Autors, keine Messung — aber es ist genau die Bauart, die der Mechanismus voraussetzt.
  · DAS ZUGANGSDATUM STEHT UNKODIERT IN DER URL (String-Interpolation, kein
    encodeURIComponent). Eine Rückspiegelung träfe es wortgleich, sofern das spiegelnde
    System es nicht selbst umschreibt.
  WAS DIE CODE-SEITE EINSCHRÄNKT, OHNE ZU ENTKRÄFTEN: Gekappt wird vom ANFANG auf 200
  Zeichen eines zuvor GETRIMMTEN Rumpfes. Steht die URL erst hinter Zeichen 200 einer
  HTML-Fehlerseite, erreicht sie das Log nicht. Das ist eine Schranke — aber eine, die an
  einer Eigenschaft der FREMDEN Seite hängt, die niemand hier kontrolliert.
  WAS ICH NICHT KANN, ausdrücklich: Ob dieser Anbieter je eine Nicht-JSON-Antwort liefert,
  wie sie aufgebaut wäre und ob sie die URL trägt, ist am Repo NICHT entscheidbar. Dafür
  braucht es eine Messung gegen den Anbieter oder einen Fund in den Laufzeit-Protokollen.
  EINE VERSCHÄRFUNG, DIE BEIM PRÜFEN AUFFIEL (am Code entscheidbar, erhoben 2026-08-10):
  Der Nicht-JSON-Rückfall läuft bei JEDER abgelehnten Antwort, unabhängig vom GRUND der
  Ablehnung — er ist NICHT an eine Ablehnung des Zugangsdatums gebunden. Auf DIESEM Pfad
  trägt E1 deshalb nicht: die Anfrage kann an etwas ganz anderem scheitern (Berechtigung,
  Nutzlast-Feld, ein Zwischensystem), WÄHREND das Zugangsdatum gültig ist. Belegt ist
  damit die VORAUSSETZUNG des Mechanismus — ein gültiges Zugangsdatum in einer
  scheiternden Anfrage ist der Normalfall dieses Pfades, kein Sonderfall —, NICHT die
  Rückspiegelung selbst.
  EINE PRÄMISSE WAR ZUNÄCHST UMGEKEHRT BESCHRIEBEN, und das gehört festgehalten, weil sie
  in eine Einstufung gewandert wäre: Der Architekt hatte den Fall zuerst als "wohlgeformt,
  aber ungültig — der häufigste Realfall" geführt, also als den Fall mit einem BRAUCHBAREN
  Zugangsdatum, und dies vor dieser Runde selbst richtiggestellt. Wäre die Stufe auf der
  ersten Fassung gesetzt worden, hätte sie eine Wirkung unterstellt, die die Messung nicht
  hergibt.
  TRAGENDE KONTROLLE: HEUTE KEINE. Der Pfad ist ungedeckt; was ihn im Moment ruhig hält,
  ist Erreichbarkeit (s. unten), nicht eine Kontrolle. Die Form einer künftigen Kontrolle
  ist NICHT vorentschieden — sowohl das Schwärzen der Ausgabe als auch das Weglassen des
  Fremdtexts kämen in Frage, und beides berührt die Diagnosefähigkeit, für die die
  Felder überhaupt eingeführt wurden.
  WARUM ER UNENTDECKT BLIEB — EIN FALSCHER BELEG HAT IHN VERDECKT, an ZWEI Stellen:
  · Über der Kappungs-Konstanten steht "Metas message ist Beschreibungstext (kein
    Secret), aber unbegrenzt lang -> kappen." Der Klammerzusatz ist die Behauptung, die
    die Handmessung widerlegt hat.
  · Der Kopf von describeMetaError sagt "geloggt werden AUSSCHLIESSLICH Metas eigene
    strukturierte Fehlerfelder … NIE der Token".
  DIE ZWEITE STELLE WIDERSPRICHT SICH SELBST, UNABHÄNGIG VON JEDER MESSUNG: Ein ROHER
  Antwort-Rumpf ist kein "strukturiertes Fehlerfeld". Der Nicht-JSON-Rückfall verletzt
  die Zusage seines eigenen Kopfkommentars, und DAS war am Code allein entscheidbar,
  immer — es brauchte dafür weder die Handmessung noch den Anbieter.
  ER WAR SCHON EINMAL AKTENKUNDIG: Am 2026-08-08 wurde die Kollision zwischen diesem
  Kommentar und einer Maskierungs-Auflage gemeldet, mit dem Satz, sie sei am Code nicht
  entscheidbar. Für die JSON-Hälfte stimmt das, und entscheidbar war sie seit der
  Handmessung vom 2026-08-07. Für die Nicht-JSON-Hälfte stimmt es NICHT: die war am Code
  entscheidbar, und zwar früher.
  DIE ERREICHBARKEIT — MELDUNG von Stefan am 2026-08-10, weder Code-Messung noch
  Handmessung: ZUR ZEIT TRÄGT KEIN PROJEKT EIN ZUGANGSDATUM DIESES ANBIETERS. Ohne
  Zugangsdatum kein Forward, ohne Forward kein Fehler, ohne Fehler keine Logzeile. DER
  PFAD IST HEUTE NICHT ERREICHBAR.
  DIE CODE-SEITE DIESER AUSSAGE, und nur sie ist von mir erhoben (2026-08-10): Der
  Aufrufer ruft forwardToMeta ausschliesslich aus einem Zweig, der eine vorhandene
  Konfiguration voraussetzt. Ist keine da, wird die Funktion nie betreten. Die
  Code-Seite stützt die Meldung; sie ersetzt sie nicht — ob eine Konfiguration in der
  Datenbank steht, ist am Repo nicht entscheidbar.
  GRENZE, UND SIE IST DER WICHTIGERE TEIL: Das ist eine Aussage über HEUTE, nicht über
  die Vergangenheit. Während dieser Phase liefen Forwards; ob dabei je eine
  Fehlerantwort mit Rückspiegelung entstand, ist NICHT geprüft.
  WONACH IN DEN LAUFZEIT-PROTOKOLLEN ZU SUCHEN WÄRE — die Marker sind Literale im Code
  und deshalb exakt suchbar (am Code erhoben 2026-08-10):
  · "[capi] Meta forward rejected: non-JSON body=" — der BREITE Pfad. Jeder Treffer ist
    ein roher Fremd-Rumpf im Log und zuerst zu lesen.
  · "[capi] Meta forward rejected: code=" — der JSON-Pfad. Betroffen ist das Feld hinter
    " msg=" am ZEILENENDE; die vier Felder davor sind Kennungen und Typnamen.
  · "[capi] Meta forward failed: HTTP " — trägt NUR den Status und ist unbedenklich,
    steht aber unmittelbar VOR jeder der beiden obigen Zeilen und ist deshalb der
    zuverlässigere ANKER, wenn man die Vorkommen zählen statt lesen will.
  DIE SUCHE SELBST IST NICHT HARMLOS: Wer sie fährt, liest möglicherweise genau das
  Geheimnis, dessen Anwesenheit er prüfen will — und ein Kopieren des Ergebnisses in
  einen Chat, ein Ticket oder eine Doku trägt es weiter. Die Prüfung sagt "getroffen
  oder nicht", nicht "hier ist die Zeile".
  OFFEN, AM REPO NICHT ENTSCHEIDBAR — zwei Punkte, beide Angaben über den BETRIEB:
  (1) WER die Laufzeit-Protokolle lesen kann. Der bestehende LOGGING-LEAK-Eintrag hält
      für 2026-07-24 fest, dass Log-Drains Pro-gated und keine konfiguriert sind — also
      dass die Protokolle die Plattform nicht verlassen. OB DAS HEUTE NOCH GILT, IST
      NICHT ERHOBEN, und der Personenkreis mit Zugriff ist es ebenso wenig. Es ist die
      Angabe, die aus "ein Geheimnis steht im Log" erst eine Reichweite macht.
  (2) OB DER FALL JE EINGETRETEN IST.
  EHRLICHE EINORDNUNG: Der Befund ist SCHMAL GEMESSEN und BREIT GEBAUT. Gemessen ist ein
  Fall, in dem das gespiegelte Zugangsdatum nichts öffnet; gebaut ist ein Pfad, der
  herausgibt, was kommt, ohne zu wissen, was es ist. Diese beiden Sätze zeigen in
  verschiedene Richtungen, und es wäre eine Selbsttäuschung, den bequemeren zu nehmen:
  weder trägt die eine Messung eine Aussage über alle Fehlerarten des Anbieters, noch
  entlastet die heutige Unerreichbarkeit den Code — sie ist ein Zustand der Datenbank,
  kein Merkmal der Funktion, und sie endet mit der ersten hinterlegten Konfiguration.
  BINDET-AN: das erste Projekt, das ein Zugangsdatum dieses Anbieters trägt — nach dem
  ersten Login, vor echtem Ad-Traffic. Dort endet die Erreichbarkeit, dort beisst der
  Befund, und es ist derselbe Moment, den die Stufe benennt. (Hier stand "OFFEN,
  gemeinsam mit der Stufe"; beides ist am 2026-08-10 entschieden.)
  DIE GRUNDLAGE DER EINSTUFUNG steht im Block darunter: die Prüfung gegen alle drei
  Stufen, unverändert wie vor der Entscheidung, und an ihrem Ende die Entscheidung selbst.

  GRUNDLAGE DER EINSTUFUNG (nach den Kriterien dieser Datei) — die Prüfung stand VOR der
  Entscheidung und bleibt stehen; die getroffene Stufe steht am Ende. EINE AUSNAHME, und
  sie ist unten markiert: eine Tatsachenbehauptung im Tier-0-Abschnitt wurde am Code
  WIDERLEGT und ist richtiggestellt, nicht gestempelt — eine Prüfung, die auf einer
  falschen Tatsache ruht, taugt nicht als Grundlage.
  DIE PRIMÄRE ACHSE DIESER DATEI IST DER MOMENT, IN DEM DAS RISIKO BEISST (Kopf: "NICHT
  alles ist P0. Sequenziert nach dem Moment …"), NICHT die Schwere. Schwere kommt nur bei
  Tier 0 als Zusatzmerkmal vor. Wer nach Schwere einstuft, benutzt ein Kriterium, das die
  Datei nicht führt.
  VIER TATSACHEN GEHEN IN JEDE DER DREI PRÜFUNGEN EIN — zwei entlastende, zwei belastende.
  DAZU EIN MECHANISMUS, DER AUSDRÜCKLICH KEINE TATSACHE IST (B3): Er zählt in KEINER der
  drei Prüfungen als BELEG für eine Wirkung — wohl aber als OFFENE FRAGE, und als solche
  wirkt er an zwei Stellen: in der Wiedervorlage und gegen die Ruhe, die Tier 2 behauptet:
  E1 Das gespiegelte Zugangsdatum ist gemessen KEIN funktionierendes Zugangsdatum.
  E2 Der Pfad ist heute nicht erreichbar (Meldung, kein Merkmal des Codes).
  B1 Es sind ZWEI Pfade, und der zweite gibt alles heraus, was kommt.
  B2 Der Widerrufs-/Ablauf-Fall ist NICHT gemessen und damit offen.
  B3 (KEINE MESSUNG, ÜBERLEGUNG des Architekten): Spiegelte eine Gateway-/Fehlerseite die
     angefragte URL zurück, geriete auf dem Nicht-JSON-Pfad ein GÜLTIGES Zugangsdatum ins
     Log. Das hebt die OBERGRENZE des Befunds — belegt ist davon nichts.

  TIER 0 — "Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)"
  ERFÜLLT: die IRREVERSIBILITÄT. Ein geschriebener Log-Eintrag ist nicht zurückholbar,
    sobald er exportiert oder indexiert ist — der bestehende Tier-2-Eintrag nennt genau
    diese Eigenschaft als seine eigene. B1 verstärkt sie: der breite Pfad gibt heraus,
    was kommt, also auch das, was B2 offenlässt.
  NICHT ERFÜLLT: "beim ersten bösen Nutzer" — aber aus einem ANDEREN Grund als dem, der
    hier zuerst stand. RICHTIGGESTELLT AM CODE (2026-08-10), NICHT GESTEMPELT: Der Satz
    "ein Fremder kann ihn nicht auslösen" stammte vom Architekten und ist WIDERLEGT. Der
    Pfad braucht keinen Angreifer, um SCHARF zu werden — er braucht einen eigenen
    Konfigurationsfehler des Betreibers. AUSLÖSEN kann ein Fremder ihn sehr wohl: ein
    Besucher-Beacon erreicht den Forward (src/lib/capi/ingest.ts, der Zweig
    "targets.length > 0 && isForwardable(event)"; value/currency/eventSourceUrl/_fbp und
    der Event-Name kommen aus dem Client-Body, ein abgelehnter Aufruf ist also von aussen
    provozierbar). Nur trägt eine so provozierte Ablehnung nach dem GEMESSENEN Stand kein
    Geheimnis.
    GENAU GENOMMEN — die Bedingungen gehören dazu, sonst ist auch die Richtigstellung zu
    weit: Der Fremde erreicht den Forward NUR bei einem Projekt mit hinterlegten
    Zugangsdaten, NUR mit einem forwardbaren Event (PageView und Confirm erreichen die
    Zeile nie) und NUR hinter dem Einwilligungs-Gate. Er verschiebt die Erreichbarkeit
    also NICHT nach vorn: E2 gilt unverändert.
    WARUM DER SATZ NICHT STILL ÜBERSCHRIEBEN WIRD: Er hätte ZWEIMAL in einer
    Sicherheits-Einstufung gestanden — als Tatsache, auf der eine Stufe ruht.
    "katastrophal" trägt E1 weiterhin nicht: gespiegelt wird gemessen das, was nichts
    öffnet.
  OFFEN: ob B2 die Nicht-Erfüllung kippt. Spiegelte der Anbieter auch ein WIDERRUFENES
    oder ABGELAUFENES Zugangsdatum, wäre E1 nur noch eine Teil-Entlastung — und ein
    solches Zugangsdatum war einmal gültig. Dasselbe gilt für B3: träfe er zu, wäre ein
    GÜLTIGES Zugangsdatum betroffen, und "katastrophal" stünde neu zur Debatte.

  TIER 1 — "Vor echtem Ad-Traffic / Spend (nicht vor dem ersten Login)"
  ERFÜLLT: der MOMENT passt. Der Pfad wird erreichbar, sobald echte Projekte
    Zugangsdaten tragen — also mit dem Betrieb, nicht mit dem ersten Login. E2 ist damit
    kein Gegenargument gegen diese Stufe, sondern ihre Beschreibung.
  NICHT ERFÜLLT: die Bindung an TRAFFIC bzw. SPEND im Wortsinn. Der Auslöser ist eine
    fehlerhafte Eingabe von Zugangsdaten, kein Traffic-Volumen. EIN einzelner Betreiber
    mit EINEM Tippfehler genügt, ganz ohne Ad-Spend — die Stufe würde den Moment
    richtig, den GRUND aber falsch benennen.

  TIER 2 — "Laufende Hygiene / verankerte Prinzipien (KEIN Gate)"
  ERFÜLLT: die NACHBARSCHAFT und E2. Der Vorgänger-Eintrag zur selben Sache (Geheimnis
    im Log) steht hier; seine TRAGENDE KONTROLLE ("minimieren, wo der Token überhaupt
    hinreist") beschreibt auch für diesen Befund die naheliegende Richtung. Ein heute
    unerreichbarer Pfad braucht kein Gate.
  NICHT ERFÜLLT: "verankertes Prinzip". Dies ist ein KONKRETER, gemessener, offener
    Defekt an einer benannten Stelle — kein Grundsatz und keine Dauerhygiene. Und die
    Sektion trägt "KEIN Gate" in der Überschrift: ein Eintrag mit offener Weite (B2)
    behauptete dort mehr Ruhe, als gemessen ist.

  WAS DIE WIEDERVORLAGE-KLAUSEL DES BESTEHENDEN EINTRAGS WÖRTLICH HERGIBT — der Wortlaut,
  nicht seine Auslegung: "WIEDERVORLAGE: der Befund gilt fuer den HEUTIGEN Code —
  setCapiToken ist die EINZIGE Server Action mit Secret-Parameter (erhoben 2026-07-24).
  Bei JEDER neuen Server Action mit Secret-Parameter neu bewerten."
  SIE NENNT ALS ANLASS EINE NEUE SERVER-AKTION MIT GEHEIMNIS-PARAMETER. DER HIESIGE
  ANLASS IST EIN ANDERER: keine Server-Aktion, sondern dieselbe Sache — ein Geheimnis im
  Log — in einer anderen Naht, nämlich einer von uns selbst geschriebenen Logzeile auf
  einem Fehlerpfad. Nach dem BUCHSTABEN greift die Klausel nicht. Ob ihr ZWECK damit
  erfüllt ist, ist eine Owner-Entscheidung und wird hier nicht getroffen.

  WAS DIESER EINTRAG NICHT TUT: Er ändert am bestehenden LOGGING-LEAK-Eintrag NICHTS. Der
  bleibt Wort für Wort stehen, samt seiner Herabstufung — er war richtig für den
  Gegenstand, den er beurteilt hat (ein Framework-Verhalten auf einem Server-Action-
  Argument), und dieser Gegenstand ist ein anderer. Er hat den hiesigen Fehlerpfad sogar
  ausdrücklich offengelassen: "der FEHLERpfad ist ungetestet".

  DIE ENTSCHEIDUNG — TIER 1 (Owner-Entscheidung, 2026-08-10)
  BEGRÜNDUNG ENTLANG DER PRIMÄREN ACHSE DIESER DATEI, dem MOMENT und nicht der Schwere:
  Der Pfad wird erreichbar, sobald ein echtes Projekt ein Zugangsdatum trägt. Das ist NACH
  dem ersten Login und VOR echtem Ad-Traffic — genau das Fenster, das Tier 1 beschreibt.
  Vorher ist er unerreichbar (E2), nachher ist er dauerhaft offen.
  WAS AN DIESER STUFE NICHT PASST, und es steht hier und nicht in einer Fussnote: Der
  Titel der Sektion bindet an TRAFFIC bzw. SPEND. Der Auslöser hier ist kein Volumen,
  sondern EINE fehlerhafte Eingabe eines einzelnen Betreibers. DIE STUFE BENENNT DEN
  MOMENT RICHTIG UND DEN GRUND FALSCH. Das ist der Preis, und er wird gezahlt, weil diese
  Datei nach dem MOMENT sequenziert.
  WARUM NICHT TIER 0 — DIESE BEGRÜNDUNG IST NEU. Die erste ruhte auf der Behauptung, ein
  Fremder könne den Pfad nicht auslösen; die ist am Code widerlegt (s. Grundlage-Block,
  TIER 0 / NICHT ERFÜLLT) und die Begründung fällt mit ihr. DIE STUFE BLEIBT, ihr Grund
  ist ein anderer — und der neue ist ehrlicher als der alte:
  Die Sektion verlangt "katastrophal beim ersten bösen Nutzer". Der erste böse Nutzer KANN
  den Pfad betreten — das ist am Code erhoben. Was er nach dem GEMESSENEN Stand vorfindet,
  ist eine Logzeile OHNE Geheimnis.
  DER WEG VON "AUSGELÖST" ZU "EIN FUNKTIONIERENDES GEHEIMNIS IM LOG" LÄUFT ÜBER DREI
  UNGEMESSENE GLIEDER: (a) dass der Anbieter überhaupt eine Nicht-JSON-Antwort liefert;
  (b) dass sie die angefragte URL trägt; (c) dass die URL innerhalb der gekappten Länge
  steht. KEINES davon ist belegt.
  DIE KETTE BESCHREIBT DEN NICHT-JSON-PFAD (B3) — der andere Weg gehört danebengestellt,
  sonst liest sich "drei Glieder" wie eine Aussage über den ganzen Befund: Über den
  JSON-Pfad hängt alles an EINEM ungemessenen Glied (B2), aber selbst wenn es trägt, ist
  ein WIDERRUFENES oder ABGELAUFENES Zugangsdatum eines, das nichts mehr öffnet. Zu
  "katastrophal" führt nur die dreigliedrige Kette.
  "KATASTROPHAL" STÜNDE DAMIT AUF DREI UNGEMESSENEN GLIEDERN, NICHT AUF EINER MESSUNG.
  Tier 0 auf eine solche Kette zu setzen hiesse, die primäre Achse dieser Datei durch eine
  Vermutung zu ersetzen — und der Kopf warnt ausdrücklich davor, dass eine Liste, auf der
  alles "kritisch" ist, nichts priorisiert.
  DIE IRREVERSIBILITÄT ALLEIN TRÄGT DIE STUFE NICHT; sie ist Zusatzmerkmal, nicht Achse.
  WAS DIE STUFE KIPPT, steht in der Wiedervorlage (2): Wird EIN Glied der Kette gemessen
  und trägt es, ist Tier 0 neu zu prüfen.
  WARUM NICHT TIER 2: Die Sektion trägt "KEIN Gate" in der Überschrift und sammelt
  Grundsätze und Dauerhygiene. Dies ist ein konkreter, gemessener, OFFENER Defekt an einer
  benannten Stelle — und mit einem offenen Punkt (B2) und einem ungeklärten Mechanismus
  (B3) behauptete "kein Gate" mehr Ruhe, als gemessen ist.
  WIEDERVORLAGE — drei Anlässe, bei denen die Stufe NEU zu prüfen ist:
  (1) Ergibt eine Messung, dass auch ein WIDERRUFENES oder ABGELAUFENES Zugangsdatum
      gespiegelt wird (B2), ist die entlastende Tatsache E1 nur noch eine halbe.
  (2) Ergibt sich, dass der Nicht-JSON-Pfad die URL zurückträgt (B3), wäre ein GÜLTIGES
      Zugangsdatum betroffen — dann ist TIER 0 neu zu prüfen. Gemeint ist jedes der drei
      Glieder (a) Nicht-JSON-Antwort, (b) URL darin, (c) innerhalb der Kappung: jedes
      gemessene und tragende Glied verkürzt die Kette, die die Stufe heute hält.
  (3) Wird ein Log-Abfluss eingerichtet, verlassen die Zeilen den bisherigen
      Zugriffsbereich. Der bestehende LOGGING-LEAK-Eintrag nennt genau das als seine
      eigene Bedingung ("Log-Drains sind Pro-gated und keine konfiguriert").
  PROVENIENZEN GETRENNT, weil in diesem Eintrag drei verschiedene zusammenlaufen: die
  STUFE ist eine OWNER-ENTSCHEIDUNG (2026-08-10), der Mechanismus B3 eine ÜBERLEGUNG des
  Architekten (2026-08-10, nicht gemessen), die Rückspiegelung eine HANDMESSUNG
  (2026-08-07, Stefan, per curl).

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
- DEPENDABOT-MELDUNGEN OFFEN, NICHT GESICHTET (2026-08-13):
  RISIKO: Auf dem Default-Branch stehen SIEBEN Verwundbarkeits-Meldungen, davon FÜNF hoch
  und zwei mittel. Solange sie nicht gesichtet sind, ist unbekannt, ob eine davon
  Produktivcode betrifft, erreichbar oder ausnutzbar ist.
  HERKUNFT: die Push-Ausgabe von GitHub, fünfmal am 2026-09-04 identisch. KEINE andere
  Quelle, KEINE eigene Prüfung im Dashboard.
  DIE ZAHL IST AM 2026-09-04 RICHTIGGESTELLT, NICHT GESTEMPELT — sie ist ein ZUSTAND und
  keine Herleitung; ein Stempel liesse zwei Zahlen nebeneinander stehen, und wer die
  falsche nähme, hielte einen Bestand für aktuell, den es nicht mehr gibt. HIER STAND ZEHN,
  DAVON ACHT HOCH UND ZWEI MITTEL, GEMESSEN dreimal identisch am 2026-08-13 — FÜR IHREN TAG
  WAR SIE RICHTIG.
  WAS DIE DIFFERENZ VERURSACHT HAT, IST NICHT ERHOBEN. Der Owner nennt als Ursache eine
  Runde mit Pull Requests vor mehreren Sitzungen; DAS IST EINE PLAUSIBLE URSACHE UND KEINE
  MESSUNG. Die Push-Zeile nennt nur SUMMEN — WELCHE Meldungen weggefallen sind, ist an
  keiner Stelle erhoben, und ob überhaupt welche weggefallen sind statt ersetzt worden zu
  sein, ebenso wenig.
  DIE AUSSAGE DES EINTRAGS IST VON DER ZAHL UNBERÜHRT: Die Meldungen sind NICHT GESICHTET.
  WENIGER MELDUNGEN HEISST NICHT ANGESEHENE MELDUNGEN.
  TRAGENDE KONTROLLE: heute KEINE über die blosse Meldung hinaus. Der Eintrag darüber
  ("DEPENDABOT — ERLEDIGT") trägt die AKTIVIERUNG und ist als solche Aussage unverändert
  richtig; er sagt nichts über offene Meldungen, und ein Leser schliesst aus "ERLEDIGT"
  auf "nichts offen".
  EHRLICHE EINORDNUNG: Die Meldungen sind AUSDRÜCKLICH NICHT BEWERTET. Ob dies Tier 2
  bleibt oder höher gehört, ist damit offen — die Ablage hier ist vorläufig und folgt dem
  Nachbar-Eintrag, nicht einer Einschätzung des Risikos.
  BINDET-AN: zu bestimmen, sobald die Meldungen gesichtet sind. Die Einstufung verlangt
  eine Bewertung, die niemand vorgenommen hat; ein erfundener Zeitpunkt wäre schlimmer als
  keiner, weil er den Posten als terminiert aussehen liesse.
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
  deshalb ist diese Lücke überhaupt erkennbar. Regeltext: docs/db-regeln.md,
  "BACKUP-WIEDERVORLAGE HÄNGT AN MIGRATIONEN, NICHT AM KALENDER".
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
  EHRLICHE EINORDNUNG: EXPLIZIT kein Launch-Gate (das Feature entsteht erst mit
  Phase 18); deckt sich mit dem bestehenden "Session-unabhängige Mutationen / MCP-ready"-
  Baustil.
  BINDET-AN: Phase 18.
