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
Vertragsannahme und ein Prüfverfahren; bei Google trägt die Stufe seit dem 2026-08-24 ein
ANDERER GRUND. Die gewählte Gestalt — der OFFLINE CONVERSION IMPORT — trägt KEINEN
Allowlist-Vorbehalt (GELESEN 2026-08-24, /devguides/events). Was dort stattdessen steht und
die Aussage weiterhin trägt: ein GOOGLE-CLOUD-PROJEKT MIT AKTIVIERTER API, ein als SENSIBEL
eingestufter Zugriffsbereich, und für NUTZER-Zugangsdaten eine OAUTH-VERIFIZIERUNG — bei
DIENSTKONTEN ausdrücklich nicht. EIN FREIGABEVERFAHREN GIBT ES BEI GOOGLE WEITERHIN, ABER
AM ZUGANGSMODELL STATT AN DER GESTALT — der gestrichene Satz hat beide Achsen
zusammengezogen. ENTSCHIEDEN AM 2026-08-25 (OWNER) — DAS ZUGANGSMODELL IST ADVERTISER MIT
KUNDENEIGENEM OAUTH: Jeder Kunde autorisiert die Pagesmith-Anwendung für sein EIGENES
Werbekonto, je Kunde ein eigenes langlebiges Zugangsdatum, und UNSERE IDENTITÄT STEHT NICHT
IN DER NUTZERLISTE DES KUNDEN. DATA PARTNER IST VERTAGT UND NICHT AUSGESCHLOSSEN.
FÜR DEN HEUTIGEN EIGENBETRIEB IST KEINE VERIFIZIERUNG NÖTIG — MIT DREI NEBENBEDINGUNGEN,
ohne die der Satz stärker ist als seine Quelle: (i) die Freistellung ruht auf einer
BENANNTEN Ausnahme ("Personal use" bzw. "Development, Testing, or Staging"), nicht auf
einer allgemeinen Regel; (ii) sie zieht eine NUTZER-OBERGRENZE nach sich, die der Anbieter
NICHT beziffert — WER HIER EINE ZAHL EINSETZT, ERFINDET SIE, und die naheliegende 100 zählt
ERNEUERUNGS-TOKEN je Konto je Client-ID, NICHT Nutzer; (iii) im Testing-Zustand lebt ein
Erneuerungs-Token SIEBEN TAGE. MIT DEM ERSTEN FREMDEN KUNDEN GREIFT DIE
VERIFIZIERUNGSPFLICHT — dort sind es NUTZER-Zugangsdaten, und für die verlangt der Anbieter
sie ausdrücklich. DIE AUFLAGEN AUS DIESER WAHL STEHEN NICHT HIER, sondern an der
Roadmap-Zeile 11.8 (docs/roadmap.md) — zweimal geschrieben liefen sie auseinander.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25 auf GELESENER Grundlage (docs/ziel-befunde.md,
Google-Abschnitt, Teile (ab), (ac), (af) und (an)); dass im Repo KEINE Zahl zur
Nutzer-Obergrenze steht, ist GEMESSEN (CC, 2026-08-25). KEINE Messung an einer
Google-Schnittstelle.
BAUEN UND MIT EIGENEN KONTEN MESSEN GEHT OHNE; FREMDE
KUNDENKONTEN ANBINDEN NICHT — BEI GOOGLE ALSO AUS EINEM ANDEREN GRUND ALS BEI PINTEREST.
BELEG: docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", die
Antworten zu I1, I2 und I3; und Abschnitt "Google (Google Ads Conversions · GA4)",
Teil (d) sowie Teil (q), Katalog-Frage I1 — dort stehen Cloud-Projekt,
Dienstkonto-Ausnahme und der fehlende Allowlist-Vorbehalt.

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
- [x] Phase 11.8 — Autorisierungsschicht
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

**DER VOLLTEXT JEDES PUNKTES STEHT IN docs/offene-punkte.md** — Befunde,
Provenienz, Messungen, Richtigstellungen. Hier steht je Punkt sein TITEL und
sein TRIGGER, beides wörtlich. EIN VERWEIS AUF "## Offene Punkte" ODER AUF
EINEN EINTRAGSTITEL — in dieser Datei, in docs/ und in den Historien — MEINT
DEN PUNKT MIT DIESEM TITEL: seinen Trigger hier, seinen Volltext dort.
Solche Verweise sind beim Umzug bewusst NICHT angefasst worden; dieser Satz
löst sie auf. ER LÖST AUCH DIE VERWEISE AUF, DIE UNTERHALB DER TITELEBENE
ZIELEN — auf eine Auflage oder eine Ursache im Rumpf; sie landen hier und
gehen von hier eine Station weiter.

- isAppHost-PLATZHALTER (Trigger: Brand-Domain-Kauf)
- HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung)
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging
  REIN AUS DEN MIGRATIONSDATEIEN — der Restore-Drill-Fall ist unten GEMESSEN geklärt,
  das ist aber KEIN Freibrief für diese beiden anderen Fälle)
- DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE (Trigger: die erste Scheibe, die
  personenbezogene Merkmale erfasst — Click-IDs, IP/UA, gehashte Kontaktdaten,
  Fingerprint-artige Merkmale; spätestens VOR dem ersten echten Ad-Traffic)
- COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH
  (Trigger: vor dem öffentlichen Launch; Phase 9)
- LABEL-VERGABE IST UNPROTOKOLLIERT (Trigger: vor öffentlichem Traffic bzw. mit
  dem Abuse-/Audit-Ausbau)
- DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT (ZWEI TRIGGER, je einzeln
  hinreichend: (i) die Custom-Pixel-Vorfrage fällt zugunsten eines SERVER-Empfängers mit
  kundeneigenem Endpunkt; (ii) es zeigt sich, dass die KENNUNG NICHT IN DEN
  EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG AUS WELCHEM GRUND (Beispiele, KEINE
  abschliessende Liste: je Kennung ein eigenes Zugangsdatum · die Kennung selbst ein
  Geheimnis · server-autoritativ vergeben).)
- DREI WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE — RANG OFFEN,
  UNGEMESSEN (Trigger: die Messung selbst — ein Lauf, der prüft, ob ein Wurf auf dem
  Ingest-Pfad die garantierte leere 204 bricht)
- BETREIBER-DOKUMENTATION FEHLT — ZWEI PUNKTE (Trigger: vor dem öffentlichen Launch; wie
  der COOKIE-DOKU-SCHNIPSEL darüber eine PRODUKTPFLICHT, kein Nice-to-have)
  ZWEI TRIGGER — der erste steht oben in der Klammer, der zweite im Rumpf:
  (2) TRIGGER FÜR DIE KLÄRUNG: sobald echter Traffic eine Zuordnung zu einer echten
      Person erzeugt.
- DIE VOLLSTÄNDIGKEITS-ACHSE IST NICHT GEBAUT ("Kennungen für ALLE Ereignisse vorhanden") (TRIGGER,
  wörtlich und ausdrücklich nicht "falls es je nötig wird": sobald ein Ziel eine Kennung JE
  EREIGNISTYP trägt.)
- CLAUDE.md NÄHERT SICH DEM LADELIMIT (Trigger: vor der nächsten Hebung an einem
  Phasenende)
- DIE ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST (Trigger: Phase 11.5
  — mit einem Einwilligungs-Dialog wird der Defekt real; HEUTE FÄLLT ER NICHT AUF, weil
  ohne Dialog nie etwas abgelehnt wird)
- NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST (Trigger: BEREITS
  EINGETRETEN — vier Ziele laufen live (GEMESSEN am Code, 2026-08-21: meta · pinterest ·
  tiktok · linkedin), und jedes kann nachträglich konfiguriert werden;
  hier steht bewusst KEIN Zeitpunkt, ein erfundener liesse den Posten als terminiert
  aussehen)
- JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN (Trigger: der erste
  echte Kunden-Traffic. HEUTE IST NICHTS ZU TUN, und der Grund gehört in den Eintrag: Bis
  der Owner das Produkt selbst vollständig geprüft hat, sieht es kein Kunde; ein Ausfall
  kostet derzeit NULL. Alles davor wäre gebaute Vorsorge gegen ein Risiko, das nicht
  existiert — "Erst der nutzbare Kern, dann Infrastruktur")
- EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN, DIE GETRENNT
  BLEIBEN — VIER TRIGGER, je an einer Ursache:
  (1) TRIGGER: EINGETRETEN — jeder Betreiber, der dieses Ziel konfiguriert, läuft hinein.
  (2) TRIGGER: die UI-Warnung (Owner-Absicht, 2026-08-18), spätestens vor echtem
      Ad-Traffic.
  (3) TRIGGER: eine Frontend-Runde, ODER ein Support-Fall, in dem ein Betreiber meldet,
      dass nichts ankommt.
  (4) TRIGGER: mit dem ersten Ziel, dessen Zugangsdatum ablaufen kann; für LinkedIn ist er
      EINGETRETEN, seit das Ziel am 2026-08-19 sendet.
- DER PAGEVIEW-TOKEN IST ALS CUSTOM-EVENT EINTIPPBAR (Trigger: vor echtem Ad-Traffic;
  gehoben am 2026-08-19 aus dem Vorrat der Phase 11.1)
- DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT (Trigger: die erste
  nicht-additive Migration)
- DAS POSTGRES-UPGRADE IST HEUTE GRATIS UND SPÄTER NICHT (Trigger: EINGETRETEN —
  Supabase bietet es an; das Fenster schliesst sich mit dem ersten echten
  Kunden-Traffic)
- DIE SOLL-HÄLFTE VON "/API/E-SCHLANKHEIT" IST ZU VERDICHTEN (Trigger: die nächste Arbeit
  an CLAUDE.md, die diesen Abschnitt ohnehin berührt)
- EIN INDIKATOR FÜR ABSCHNITT 2b FEHLT (Trigger: die nächste Änderung an
  docs/arbeitsweise.md — dann geht er beiläufig hinein und kostet keinen zweiten Vollzug in
  der Projektanweisung)
- DREI EINTRÄGE DIESER LISTE HABEN EINEN EINGETRETENEN TRIGGER UND SIND NICHT GESICHTET
  (Trigger: die nächste Runde, die docs/offene-punkte.md ohnehin öffnet)
- DER TITEL-ZEIGER IN supabase/checks/db-stand.sql IST UNGEPRÜFT (Trigger: die nächste
  Arbeit an db-stand.sql oder am DB-Doku-Stand)
- DIE GRANT-VORGABE DER PLATTFORM KIPPT AM 30.10.2026 (Trigger: das Anlegen einer NEUEN
  Tabelle in public ab dem 30.10.2026 — insbesondere der Geheimnis-Speicher der
  Autorisierungsschicht, falls er danach entsteht)
- DIE search_path-EMPFEHLUNG DES ANBIETERS WEICHT VON DER PROJEKTREGEL AB (Trigger: die
  nächste neue DB-Funktion oder RPC)
- DIE VERWAHRUNG DES CHIFFRIER-SCHLÜSSELS IST UNGEREGELT (Trigger: bevor der erste FREMDE
  Kunde ein Zugangsdatum ablegt)
- EINE ZEILE OHNE PROJEKT LIEGT AUSSERHALB JEDER KASKADE (Trigger: die erste Zeile mit
  project_id IS NULL — also der erste Schreibpfad, der die Eigentums-Achse BENUTZT, statt
  sie offenzuhalten)
- DIE ZWEI REGISTRIERTEN WEITERLEITUNGS-ADRESSEN LIEGEN AUSSERHALB DES REPOS (Trigger: eine
  DRITTE Umgebung, ein Wechsel der Vercel-Adresse oder die Brand-Domain)
- DER PRÄFIX GOOGLE_OAUTH_ HÖRT AUF ZU PASSEN, SOBALD EIN ZWEITES VORHABEN EIN EIGENES
  CLOUD-PROJEKT BEKOMMT (Trigger: genau das — ein zweites Vorhaben mit eigenem
  Google-Cloud-Projekt)
- DER DECKEL ENDET VOR DEM LESEN DES RUMPFES — ZWEI DATEIEN (Trigger: die nächste Arbeit
  an einer dieser beiden Dateien, spätestens mit dem ersten automatischen Aufrufer)
- DIE MIDDLEWARE LEITET API-ROUTEN AUF EINE HTML-SEITE UM (Trigger: der erste
  programmatische Aufrufer einer API-Route, spätestens Scheibe 1b)
- EIN AUTORISIERUNGS-FLUSS, DER AUF EINER ANDEREN ADRESSE STARTET ALS DER REGISTRIERTEN
  WEITERLEITUNG, ENDET GARANTIERT IN no_state (Trigger: EINGETRETEN — jeder Start über
  eine Vorschau-Adresse läuft hinein. OB UND WAS GEBAUT WIRD, IST NICHT ENTSCHIEDEN; die
  Frage wird spätestens fällig, wenn ein fremder Nutzer den Fluss startet — er kann den
  Grund nicht erraten, und für ihn sieht das Produkt kaputt aus)

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
  ZUSATZ 2026-08-25 — DER SATZ DARÜBER BLEIBT WÖRTLICH, DER STATUS BLEIBT OFFEN, BINDET-AN
  BLEIBT UNVERÄNDERT. Eine Anbieter-Lesung prüft seine zwei Hälften und trennt sie:
  · ERSTE HÄLFTE ("In-DB-Key = Theater") — WÖRTLICH BESTÄTIGT. Der Anbieter formuliert
    dieselbe Aussage mit demselben Bild ("like locking your front door but leaving the key
    in the lock"). Zwei unabhängige Quellen, dieselbe Aussage.
  · ZWEITE HÄLFTE ("echtes Envelope braucht KMS") — SCHWEIGEN MIT BENANNTER ACHSE. Die
    Begriffe KMS, envelope und key management service kommen auf beiden im VOLLTEXT
    gelesenen Seiten NICHT vor. Weder bestätigt noch widerlegt.
  · DIE FOLGE, DIE MAN SONST ÜBERSIEHT: Der Wurzelschlüssel des Anbieters liegt NICHT in
    unserem Postgres. Der Satz trifft damit eine Ablage MIT Schlüssel IN der Datenbank —
    er trifft NICHT jedes Verfahren, das der Anbieter anbietet.
  · Dass der Anbieter Projekte ohnehin at rest verschlüsselt und das "likely" für
    Compliance-Bedarf genügen lässt, ist ABGELEGT und zählt NICHT als Antwort auf die
    Google-Auflage.
  FUNDSTELLEN UND VOLLE BEGRÜNDUNG STEHEN NICHT HIER: docs/plattform-befunde.md, Abschnitt
  "Supabase (Postgres · Auth · RLS · Vault · Backups)", Teile (q) und (r) — und in der
  VOLLFASSUNG dieses Manifests, die im selben Zug geändert worden ist.
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
DIE FOLGENDE ZEILE IST EIN LADEBEFEHL, KEIN VERWEIS — WIRD SIE ENTFERNT, LADEN DIE RUND
ACHTZIG REGELN NICHT MEHR, UND NICHTS MELDET DAS: Sie lädt docs/immer-beachten.md beim
Sitzungsstart, vollständig. Ohne sie hängt die Ladung wieder allein an der Aufmerksamkeit
dessen, der den Prompt schreibt.
SIE IST AUSDRÜCKLICH KEIN VERSTOSS GEGEN "Reine Pfad-Verweise, KEIN @-Import" unter
"## Detail-Archiv": jener Grundsatz gilt dem ARCHIV, wo gerade NICHT geladen werden soll.
HIER IST LADEN DER ZWECK. DAS SCHILD STEHT HIER, WEIL EIN EINZELNER IMPORT IN EINER DATEI,
DIE ANDERSWO DAS GEGENTEIL ALS GRUNDSATZ FÜHRT, SONST EIN KANDIDAT FÜR DIE NÄCHSTE
AUFRÄUMRUNDE IST.

@docs/immer-beachten.md

DAS GATE, und ohne es ist der Satz darüber ein Ehrenwort: Jene Datei trägt in ihrer
ERSTEN Zeile die Marke IB-GELADEN. Die Instanz nennt in ihrer Umfangs-Ansage DIESE MARKE
UND DIE ÜBERSCHRIFT DER LETZTEN REGEL der Datei. Fehlt eines von beidem, ist die Datei
nicht geladen — sichtbar statt erschlossen.
WARUM DIE ZWEITE HÄLFTE UND WARUM SIE HIER NICHT STEHT: Die Marke selbst steht in diesem
Stub und liesse sich von hier abschreiben, ohne die Datei je zu öffnen — das Gate wäre
trivial wahr. DIESER STUB NENNT DIE LETZTE REGELÜBERSCHRIFT DESHALB NICHT. Sie steht
ausschliesslich am ENDE jener Datei, sie ändert sich mit jeder angefügten Regel, und sie
ist nur zu beantworten, wenn man dort war.
GESTEMPELT AM 2026-08-21 — DER GATE-APPARAT DARÜBER BLEIBT WÖRTLICH STEHEN UND RUHT. Er
wird NICHT gestrichen; er tritt nur ausser Betrieb, solange der Ladebefehl trägt:
· SEIT DEM 2026-08-21 IST DIE LADUNG MECHANISCH GARANTIERT — der @-Import weiter oben lädt
  die Datei beim Sitzungsstart vollständig. Das Gate im Prompt entfällt damit: es
  simulierte eine Garantie, die es jetzt gibt.
· WAS AN DIE STELLE DER PRÜFUNG TRITT: /context zeigt, was tatsächlich geladen ist. Das ist
  ein NUTZER-Befehl; CC kann ihn NICHT ausführen — die Prüfung wandert damit von der
  Instanz zum Owner und ist von der Instanz aus nicht mehr zu erbringen.
· DAS VERFALLSDATUM, und ohne es ist in einem Jahr nicht entscheidbar, ob dieser Apparat
  historisch oder schlafend ist: ER GILT WIEDER, sobald der @-Import entfernt wird oder
  nicht mehr trägt. Bis dahin ruht er.
· PROVENIENZ: GEMESSEN 2026-08-21 per /context in Wegwerf-Sitzungen, mit Negativkontrolle.
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

WOHIN EIN NEUER SATZ GEHÖRT — IM ZWEIFEL RAUS, NICHT IN DIESE DATEI. Acht Wege,
die erste passende Antwort gewinnt: (1) dauerhaft und projektweit ->
docs/immer-beachten.md, HINTEN anfügen · (2) laufender Phasenschnitt ->
docs/aktiver-stand.md · (3) Zustand, der später kippt (TODO mit Trigger) ->
docs/offene-punkte.md, Titel + Trigger als Stub-Zeile hier · (4) Phasenplanung
oder -stand -> docs/roadmap.md, Marker im Stub hier · (5) Befund über ein
FAN-OUT-ZIEL -> docs/ziel-befunde.md, offene FRAGE dazu ->
docs/ziel-fragenkatalog.md; Befund über einen PLATTFORM-ANBIETER ->
docs/plattform-befunde.md · (6) Schema,
Policies, Analytics-Lesepfad -> docs/db-stand.md (Zustand) bzw. docs/db-regeln.md
(Regeln) · (7) Regel über die ARBEITSWEISE selbst -> docs/arbeitsweise.md, als
ÄNDERUNGSANTRAG · (8) keins davon -> NACHFRAGEN. KEINE NEUE DATEI OHNE
OWNER-ENTSCHEIDUNG — VERBOT, keine Empfehlung; genau eine Ausnahme ist die
Standdatei, die nach Verfahren entsteht. Weg 1 führt aus DIESER Datei heraus,
NICHT aus dem Startkontext: docs/immer-beachten.md lädt unbedingt mit.
- docs/arbeitsweise.md — Arbeits- und Prompt-Disziplin (Kadenz, Stufen,
  Nachweisführung, Phasenende-Ablauf). VOM ARCHITEKTEN GEPFLEGT und NICHT Teil
  des CC-Kontexts — und das meint das LADEN, nicht das Bearbeiten: Sie lädt nicht
  mechanisch, und CC zieht sie nicht als Arbeitsgrundlage heran. Sie beschreibt,
  WIE Aufträge ENTSTEHEN — die Arbeitsweise der Chat-Instanz, nicht die
  Bauanleitung.
  EDITIEREN AUF ANWEISUNG IST DAVON NICHT BERÜHRT: Ist ein Änderungsantrag
  angenommen, pflegt CC die Datei redaktionell — dann stimmen Formatierung und
  Bauform. WEG 7 BLEIBT UNBERÜHRT: Der INHALT wird als ÄNDERUNGSANTRAG
  entschieden, nicht von CC. Geklärt ist der VOLLZUG, nicht die Entscheidung.
  Die CLAUDE.md verweist an MEHREREN Stellen auf sie — unter anderem
  "## Aktiver Stand — Verfahren ab Phase 10" und Weg 7 in diesem Abschnitt. Hier
  steht bewusst KEINE Zahl: Querverweise wachsen, und eine Zahl verrottete erneut.
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
- docs/plattform-befunde.md — die GEMESSENEN und GELESENEN Befunde über die
  PLATTFORM-Anbieter, auf denen Pagesmith läuft (Persistenz, Auth, Hosting,
  Ausspielung, Deploy), je Anbieter ein Abschnitt, mit Provenienz an jeder
  Angabe. Angelegt 2026-08-25 per OWNER-ENTSCHEIDUNG — die benannte Ausnahme von
  "KEINE NEUE DATEI OHNE OWNER-ENTSCHEIDUNG" oben. Sie trägt KEINE Regeln, KEINE
  Entscheidungen und KEINEN Zustand unserer Datenbank. Sie wird NICHT automatisch
  geladen. AUSLÖSER: Wer an Schema, Policies, Migrationen, dem Geheimnis-Speicher,
  an Backup/Restore oder am Deploy-Weg arbeitet, lädt sie ZUERST — wo es um die
  Datenbank geht, ZUSAMMEN mit docs/db-regeln.md und docs/db-stand.md.
  DIE ABGRENZUNG ZU docs/ziel-befunde.md IST DER GRUND FÜR ZWEI DATEIEN: Jene
  trägt Befunde über die FAN-OUT-ZIELE (Empfänger von Conversion-Ereignissen),
  diese über die Anbieter der INFRASTRUKTUR. Die Auslöser zeigen in verschiedene
  Richtungen; in EINER Datei lüde jeder beides und fände seins nicht.
  SEIT DEM 2026-08-25 FÜHREN ZWEI BEFUND-DATEIEN BUCHSTABEN: Ein Verweis der Form
  "Teil (a)" ist ab da mehrdeutig und nennt DATEI, ABSCHNITT und Buchstaben. Die
  bestehenden Verweise sind NICHT nachgezogen worden; die, die docs/ziel-befunde.md
  ausdrücklich nennen, bleiben eindeutig.
  Sie gehört KEINER Phase und wird NICHT archiviert.

## Detail-Archiv (bei Bedarf lesen — NICHT automatisch geladen)
Abgeschlossene Phasen-Historie + Vollbegründungen sind ausgelagert, damit CLAUDE.md unter
dem 150k-Ladelimit bleibt (jede Session lädt nur diese Root-Datei). Reine Pfad-Verweise,
KEIN @-Import. Bei Arbeit an einem Thema die passende Datei gezielt lesen:
ZUSATZ 2026-08-21 — DER SATZ DARÜBER BLEIBT WÖRTLICH STEHEN, DIE LISTE DARUNTER IST
UNVERÄNDERT: Der Grundsatz "KEIN @-Import" gilt DIESEM Abschnitt — das ARCHIV soll gerade
NICHT geladen werden. Seit dem 2026-08-21 gibt es GENAU EINEN @-Import im Repo, unter
"## Immer beachten — AUSGELAGERT nach docs/immer-beachten.md", und der ist ABSICHT: dort
ist Laden der Zweck. GRUND FÜR DIESEN ZUSATZ: Ohne ihn liest jemand den Satz darüber beim
nächsten Refactor als gebrochene Regel und entfernt den Import — und dann laden die rund
achtzig Regeln nicht mehr, ohne dass etwas rot wird.
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
- docs/aktiver-stand-11.8.md — GESAMTE gebaute Phase 11.8 (Autorisierungsschicht,
  2026-08-25 bis 2026-08-27): sechs Scheiben-Zuschnitte (11.8a bis 11.8f) mit ihren
  Invarianten und Ausschlüssen, sechs Vermerke mit Bau-Commit und Live-Nachweis, die
  Entscheidungen, der Vorrat und die Hebungs-Kandidaten.
  ACHTUNG, SIE LIEGT ALS EINZIGE ARCHIVIERTE PHASE NICHT IN docs/claude-history/ — das ist
  eine ENTSCHEIDUNG (ARCHITEKT, 2026-08-27) mit gemessenem Grund: SECHS Quelldateien
  zitieren den Pfad docs/aktiver-stand-11.8.md in ihrem Kommentarkopf, und ein Umbenennen
  machte alle sechs tot. Dieselbe Lage und dieselbe Antwort wie bei docs/aktiver-stand.md.
  Sie wandert nach docs/claude-history/, sobald KEIN Produktivcode den Pfad mehr zitiert;
  der Volltext dieser Bedingung steht in ihrem Kopf.
  HIER NACHSEHEN, WER AN EINEM OAUTH-FLUSS, AM GEHEIMNIS-SPEICHER ODER AN DER CHIFFRIERUNG
  ARBEITET: Der Abschnitt "## Entscheidungen, die über ihre Scheibe hinaus binden" ist am
  Phasenende NICHT gehoben worden, ebenso wenig der Vorrat (sieben Einträge) und zwei
  Hebungs-Kandidaten, die keine formulierbare Bedingung des Entfallens haben. Die
  Anbieter-Befunde selbst stehen NICHT hier, sondern in docs/ziel-befunde.md.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung
  (RISIKO / TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item).
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Phase 8 (Analytics),
  Phase 18 (MCP), Funnel-Architektur, Owned-Traffic-Module, Smart-Tracking, Advanced
  Features.
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten.
  GEMESSEN 2026-08-21: 123 Einträge, 163 KB, sieben Abschnitte — "Merksätze und
  Nicht-Vorhaben" (3) · "Polish-Liste" (72) · "Aus Phase 11 gehoben (2026-08-13)"
  (27) · "Nachtrag 2026-08-14 — KANDIDATEN für docs/immer-beachten.md" (5) ·
  "Nachtrag 2026-08-15 — KANDIDAT aus der LinkedIn-Messung" (1) · "Nachtrag
  2026-08-15, ZWEITER DES TAGES — KANDIDATEN aus der Datenklassen-Entscheidung"
  (2) · "Aus Phase 11.1 gehoben (2026-08-19)" (13).
  DIESER STUB SAGT, WAS EXISTIERT, NICHT WAS OFFEN IST. Der Status je Eintrag ist
  NICHT erhoben; GEMESSEN 2026-08-21 ist er bei rund der Hälfte am Material jener
  Datei nicht entscheidbar — bei einigen steht er im Sicherheits-Manifest. Wer
  einen einzelnen Punkt braucht, liest die Datei; wer wissen will, ob er noch
  aussteht, prüft es dort, wo sein Status geführt wird.
  AUSLÖSER: Wer eine Aufräumarbeit plant, eine Phase abschliesst oder einen
  Vorrats-Punkt sucht, lädt sie.
  IHRE FORTSCHREIBUNGSREGEL: neue Einträge ans DATEIENDE, unter eine EIGENE
  datierte Überschrift — sonst rutscht ein Eintrag unter eine fremde Herkunft;
  das erklärt die vier Nachtrags-Abschnitte. Wer einen fünften anlegt, zieht
  diesen Stub im SELBEN Zug nach.
  NACHGEZOGEN 2026-08-31 — DER FÜNFTE NACHTRAGS-ABSCHNITT: "Nachtrag 2026-08-31 —
  BEOBACHTUNG AUS DEM LIVE-TEST DER SCHEIBE 3 (kosmetisch)" (1). DER MESSBLOCK
  DARÜBER IST UNANGETASTET UND BLEIBT ES: seine Zahlen (123 Einträge, 163 KB,
  sieben Abschnitte) und seine Aufzählung sind die vom 2026-08-21, NICHT die von
  heute — sie sind datiert und damit alt, nicht falsch. Wer sie überschreibt,
  nimmt eine Messung mit; wer sie als aktuell liest, liest ein Datum nicht mit.
  HIER STEHT AUS DEMSELBEN GRUND KEINE NEUE ZAHL: Eine wäre eine zweite Wahrheit
  neben einer datierten Messung. Wer die heutigen Werte braucht, misst sie.
- supabase/checks/ — versionierte Messproben für Live-Tests und Gegenproben. KEINE Probe
  fasst ECHTE Daten an; welche Bauformen das zulässt und was eine Datei dann in ihrem Kopf
  sagen muss, steht im README des Ordners — hier der Zeiger, dort die Regel.
  KEIN Migrationsverzeichnis, wird nie automatisch angewandt. VOR jeder handgetippten
  Prüf-Query dort nachsehen (dort steht auch, welche Fallen eine Probe hat — z.B. der
  custom_host-Filter bei der Domain-Divergenz). Details: README im Ordner.
