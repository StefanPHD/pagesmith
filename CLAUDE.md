# Pagesmith — Projektgedächtnis (KERN)

Diese Datei trägt je Sache ihren verbindlichen Inhalt: was gilt, was zu tun ist, wann es
greift. Sie lädt jede Sitzung, wie bisher.
Belege, Herkunft, Messungen, Stempel, Provenienz, Richtigstellungen und verworfene
Alternativen stehen NICHT hier, sondern in docs/claude-md-herleitung.md — dort steht der
Stand dieser Datei vom 2026-09-22 zeichengleich. Jene Datei lädt NICHT automatisch.
PFLICHT, NICHT KÜR: Wer eine Aussage dieser Datei ÄNDERT, LOCKERT ODER AUSWEITET — und wer
das WARUM einer Aussage braucht —, lädt docs/claude-md-herleitung.md ZUERST. Für die
tägliche Arbeit genügt der Kern; er ist nicht die Kurzfassung, sondern die verbindliche.
Die Titel sind wörtlich die der Herleitung: bestehende Verweise zitieren den Titel.

## Vision (Was wir bauen)
Eine schlanke Hosting- & Integrations-Plattform für High-Level Performance-Marketer
(DACH-Raum & international). KI-Tools (Claude, v0, Bolt) erzeugen hübsches, aber "stummes"
HTML/CSS/JS. Pagesmith macht diesen Code funktional: Buttons/Forms werden per
"Click & Connect" mit echten Aktionen verdrahtet (Stripe, PayPal, Form-Webhook,
Meta/Google-Events), serverseitig getrackt (CAPI, adblocker-resistent) und mit 1 Klick auf
eigener Domain live geschaltet. Kernversprechen: ultraschnelles reines HTML statt
WordPress-Ballast, Server-Side-Tracking, federleichtes A/B-Testing.
Zielnutzer: Media Buyer, die wöchentlich neue Domains für Rapid Testing kaufen.

## Modus
Solo-Entwickler, "Build in Public" auf GitHub. Passion-Projekt in freien Stunden. Lean MVP:
kleinste nutzbare Schritte, Infrastruktur so spät wie möglich. Jeder Schritt soll demobar /
screenshot-tauglich sein.

ES GIBT KEINE FIRMA, KEINE KUNDEN UND KEINEN FREMDEN TRAFFIC (OWNER-ANGABE, 2026-08-20;
KEINE Messung). Die Gründung steht aus. Es gibt keine Einnahmen. Der Owner baut und testet
mit EIGENEN Konten; das Produkt hat noch nie jemand ausser ihm benutzt.
WARUM DAS ALS VERNEINUNG DASTEHT: Vier live sendende Adapter, ein Sicherheits-Manifest und
eine Roadmap über achtzehn Phasen lesen sich wie ein laufender Betrieb. MEHRERE INSTANZEN
HABEN DARAUS BEREITS GESCHLOSSEN, es gebe Kunden oder eine Firma. Beides trifft nicht zu.
DREI TRIGGER, EINZELN ZU PRÜFEN — sie treten NICHT gleichzeitig ein, und dieser Absatz ist
bei jedem einzeln neu zu bewerten:
· die Gründung ist vollzogen
· das erste FREMDE Nutzerkonto legt ein Projekt an
· der erste echte Ad-Traffic läuft auf eine gehostete Seite
WAS AN DIESEM ZUSTAND HÄNGT, OHNE IHN ZU BENENNEN — sie kippen ALLE, wenn er kippt (jede am
Text geprüft, 2026-08-20):
· "JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN" ("## Offene Punkte")
· "Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic)"
· "Phase 15 — Public-Launch-Restarbeit (Tier 0)"
· "HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung)"
· Sicherheits-Manifest Tier 1: "SAFE-BROWSING" · "SHARED-REPUTATION publayer.net"
· Sicherheits-Manifest Tier 2: "BACKUPS + Restore-Drill"
AUSDRÜCKLICH NICHT AUFGEFÜHRT, obwohl es danach aussieht: "DATA-RETENTION" (Tier 2) ruht
darauf, dass heute KEINE IP/UA persistiert werden; der "KOSTEN-CIRCUIT-BREAKER" ruht auf dem
Vercel-HOBBY-Plan, nicht auf der Kundenzahl. Wer sie mitzählt, hängt sie an den falschen
Trigger.

EINE FOLGE, DIE HINEINGEHÖRT — VIER AUSSAGEN; Herleitung, Provenienz und Belegstellen
stehen in docs/claude-md-herleitung.md:
· Die KOMMERZIELLE Stufe hängt bei JEDEM Fan-Out-Ziel an der Rechtsform, nicht nur bei
  Google.
· DAS ZUGANGSMODELL IST ADVERTISER MIT KUNDENEIGENEM OAUTH (OWNER-ENTSCHEIDUNG
  2026-08-25) — je Kunde ein eigenes langlebiges Zugangsdatum für sein EIGENES Werbekonto.
  DATA PARTNER IST VERTAGT UND NICHT AUSGESCHLOSSEN.
· FÜR DEN HEUTIGEN EIGENBETRIEB IST KEINE VERIFIZIERUNG NÖTIG; MIT DEM ERSTEN FREMDEN
  KUNDEN WIRD SIE PFLICHT.
· DIE AUFLAGEN AUS DIESER WAHL STEHEN NICHT HIER, sondern an der Roadmap-Zeile 11.8
  (docs/roadmap.md).

## Tech-Stack
- Next.js (App Router) + TypeScript + Turbopack. Lokal: Node v24.16.0.
- Tailwind CSS
- Erkennung im Browser: nativer DOMParser (keine Dependency)
- Code-Transformation: clientseitig via DOMParser. Server-seitige HTML-Injektion
  (Serving-Schicht, Phase 7/8) ist eine REINE STRING-OP, KEIN Parser — Cheerio wurde nie
  eingeführt (keine Dependency). S. docs/immer-beachten.md, "KEIN SERVER-SEITIGES
  HTML-PARSING".
- Persistenz & Auth: Supabase (Postgres, RLS) — ab Phase 3, seit 2026-07-29 auf PRO
- Hosting/Deploy-Orchestrierung: Vercel-API (Domains) — seit Phase 7 live. Vercel-Plan:
  HOBBY. Netlify stand hier als Alternative und wurde NIE eingesetzt.

## Roadmap & aktueller Stand
DIE MARKER: [x] abgeschlossen · [ ] offen · [~] TEILS ERLEDIGT · [-] VERWORFEN.
[~] ist nur zulässig, wenn der Eintrag in docs/roadmap.md BEIDE Teile ausdrücklich benennt —
den stehenden und den ausstehenden; ohne diese Benennung hiesse er nur "irgendwie halb".
[-] (zugelassen am 2026-09-11, OWNER, erstmals an Phase 11.4) ist nur zulässig, wenn der
Eintrag dort GRUND und PROVENIENZ der Entscheidung trägt; die Phase wird nicht gebaut, ihre
Zeile BLEIBT stehen, weil sie trägt, was erwogen und gemessen wurde. [-] ist weder [x] noch
[ ]: nichts ist gebaut, und nichts steht aus.
WANN [x] GESETZT WIRD — DAS KRITERIUM (OWNER-ENTSCHEIDUNG 2026-09-08): EINE PHASE GEHT AUF
[x], WENN KEIN CODE MEHR ZU SCHREIBEN IST. EXTERNE ABHÄNGIGKEITEN HALTEN SIE NICHT OFFEN —
Messungen, Arbeit an einem Fremdkonto, Owner-Entscheidungen werden GEHOBEN, nicht
abgewartet. Eine Phase, die auf ihr letztes TODO wartet, tritt nie ein.
DIE AUFLAGE, OHNE DIE [x] UNZULÄSSIG IST: Ist zum Zeitpunkt des [x] etwas PRODUKTRELEVANTES
unbewiesen ODER ALS MANGELHAFT BEKANNT, SAGT DIE ROADMAP-ZEILE ES AUSDRÜCKLICH — dieselbe
Bauform wie beim [~] und aus demselben Grund keine Formsache: [x] LIEST SICH ALS
"FUNKTIONIERT".
DIE LEGENDE STEHT HIER UND NICHT IN docs/arbeitsweise.md und wird dort NICHT verdoppelt.

**DER VOLLTEXT JEDER PHASE STEHT IN docs/roadmap.md** — Begründungen, Provenienz, Auflagen,
Richtigstellungen. Hier steht je Phase EINE Zeile mit ihrem Marker. EIN VERWEIS DER FORM
"Roadmap-Zeile 11.1" — in dieser Datei, in docs/ und in den Historien — MEINT DIE PHASE MIT
DIESER NUMMER: ihren Zustand hier, ihren Volltext dort. Solche Verweise sind beim Umzug
bewusst NICHT angefasst worden; dieser Satz löst sie auf.

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
- [x] Phase 11.2 — Google Ads
- [x] Phase 11.8 — Autorisierungsschicht
- [x] Phase 11.3 — Tracking-Testmodus-Modul (test_event_code)
- [-] Phase 11.4 — Der Testknopf
- [x] Phase 11.6 — Custom-Pixel
- [x] Phase 11.5 — Einwilligungs-Dialog (eigener Dialog UND fremdes CMP)
- [x] Phase 11.7 — Anbieter-Befunde nachziehen
- [ ] Phase 11.9 — GA4 als SECHSTES Fan-Out-Ziel
- [x] Phase 11.10 — Next-Sprung über 16.2.12 hinaus
- [x] Phase 11.11 — Import-Bereinigung
- [x] Phase 11.12 — Vorschau-Blocker: Aufklärung und Reparatur
- [x] Phase 11.13 — Betreiber-Anpassung des Einwilligungs-Dialogs
- [ ] Phase 12 — Rich-Text / verschachtelte Textknoten
- [ ] Phase 13 — E-Mail-/ESP-Webhooks
- [ ] Phase 14 — Tier-1-Härtung (vor echtem Ad-Traffic)
- [ ] Phase 15 — Public-Launch-Restarbeit (Tier 0)
- [ ] Phase 16 — Analytics-Vertiefung (Uniques, Traffic-Health-Metriken)
- [ ] Phase 17 — Multi-Page-Funnels
- [ ] Phase 18 — MCP-Server

**Bewusst nicht phasiert (Trigger fehlt):** fünf Einträge ohne Marker — Volltext in
docs/roadmap.md.

## Offene Punkte (aktive TODOs mit Trigger — nicht in ein Abschluss-Archiv)
Kurz gehaltene Sammelstelle für Dinge, die HEUTE noch nicht beißen, aber zu einem
benennbaren Zeitpunkt zwingend erledigt sein müssen. Kein Backlog-Ersatz (aufgeschobene
Aufräumarbeiten: docs/claude-history/backlog-polish.md) — hier steht nur, was sonst STILL
kaputtgeht.

**DER VOLLTEXT JEDES PUNKTES STEHT IN docs/offene-punkte.md** — Befunde, Provenienz,
Messungen, Richtigstellungen. Hier steht je Punkt sein TITEL und sein TRIGGER, beides
wörtlich. EIN VERWEIS AUF "## Offene Punkte" ODER AUF EINEN EINTRAGSTITEL — in dieser Datei,
in docs/ und in den Historien — MEINT DEN PUNKT MIT DIESEM TITEL: seinen Trigger hier,
seinen Volltext dort. Das gilt auch für Verweise, die UNTERHALB DER TITELEBENE zielen — auf
eine Auflage oder eine Ursache im Rumpf; sie landen hier und gehen von hier eine Station
weiter.
DAS KRITERIUM FÜR EINE HEBUNG HIERHER IST ZWEITEILIG: benennbarer Trigger UND "geht sonst
still kaputt". Was nur einen Trigger trägt, geht ins Backlog. Die URSPRUNGS-NUMMERN der aus
einem Phasenende gehobenen Posten stehen am Eintrag in docs/offene-punkte.md, NICHT hier;
die Messungen je Phasenende (wie viele Vorrats-Einträge das Kriterium getrennt hat) stehen
in docs/claude-md-herleitung.md.

- isAppHost-PLATZHALTER (Trigger: Brand-Domain-Kauf)
- HOBBY-50-DOMAIN-DECKE (Trigger: echte Skalierung)
- rls_auto_enable-CREATE FEHLT IN DEN MIGRATIONEN (Trigger: DB-Neuaufbau / Staging
  REIN AUS DEN MIGRATIONSDATEIEN — der Restore-Drill-Fall ist GEMESSEN geklärt,
  das ist aber KEIN Freibrief für diese beiden anderen Fälle)
- DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE (Trigger: die erste Scheibe, die
  personenbezogene Merkmale erfasst — Click-IDs, IP/UA, gehashte Kontaktdaten,
  Fingerprint-artige Merkmale; spätestens VOR dem ersten echten Ad-Traffic)
- COOKIE-DOKU-SCHNIPSEL FÜR DIE KUNDEN-DATENSCHUTZERKLÄRUNG FEHLT NOCH
  (Trigger: vor dem öffentlichen Launch; Phase 9)
- LABEL-VERGABE IST UNPROTOKOLLIERT (Trigger: vor öffentlichem Traffic bzw. mit
  dem Abuse-/Audit-Ausbau)
- DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT (ZWEI TRIGGER, je
  einzeln hinreichend: (i) die erste Scheibe, die MEHRERE EMPFÄNGER DESSELBEN TYPS JE
  PROJEKT baut — insbesondere die Phase 13, falls sie kundeneigene Endpunkte vorsieht;
  (ii) es zeigt sich, dass die KENNUNG NICHT IN DEN EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG
  AUS WELCHEM GRUND (Beispiele, KEINE abschliessende Liste: je Kennung ein eigenes
  Zugangsdatum · die Kennung selbst ein Geheimnis · server-autoritativ vergeben).)
- DREI WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE — RANG OFFEN,
  UNGEMESSEN (Trigger: die Messung selbst — ein Lauf, der prüft, ob ein Wurf auf dem
  Ingest-Pfad die garantierte leere 204 bricht)
- BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE (ZWEI TRIGGER: (1) vor dem öffentlichen
  Launch — wie der COOKIE-DOKU-SCHNIPSEL darüber eine PRODUKTPFLICHT, kein Nice-to-have;
  (2) TRIGGER FÜR DIE KLÄRUNG: sobald echter Traffic eine Zuordnung zu einer echten Person
  erzeugt. Der Eintrag trägt seit dem 2026-09-19 einen PUNKT (4) aus der Phase 11.6 und seit
  dem 2026-09-24 einen PUNKT (5), Warnungen in den Oberflächen der Netzwerke)
- DIE ADBLOCKER-KACHEL ZÄHLT EINE ABGELEHNTE EINWILLIGUNG ALS VERLUST (Trigger: Phase 11.5
  — mit einem Einwilligungs-Dialog wird der Defekt real — EINGETRETEN mit dem Abschluss der
  Phase 11.5 am 2026-09-16, nachgezogen am 2026-09-25)
- NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST (Trigger: BEREITS
  EINGETRETEN — vier Ziele laufen live (GEMESSEN am Code, 2026-08-21: meta · pinterest ·
  tiktok · linkedin), und jedes kann nachträglich konfiguriert werden; hier steht bewusst
  KEIN Zeitpunkt, ein erfundener liesse den Posten als terminiert aussehen)
- JEDE STÖRUNG DER DATENBANK IST EIN TOTALAUSFALL ALLER KUNDENSEITEN (Trigger: der erste
  echte Kunden-Traffic. HEUTE IST NICHTS ZU TUN: Bis der Owner das Produkt selbst
  vollständig geprüft hat, sieht es kein Kunde; ein Ausfall kostet derzeit NULL)
- EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN — DREI URSACHEN, DIE GETRENNT
  BLEIBEN — FÜNF TRIGGER, je an einer Ursache:
  (1) TRIGGER: EINGETRETEN — jeder Betreiber, der dieses Ziel konfiguriert, läuft hinein.
  (2) TRIGGER: die UI-Warnung (Owner-Absicht, 2026-08-18), spätestens vor echtem
      Ad-Traffic.
  (3) TRIGGER: eine Frontend-Runde, ODER ein Support-Fall, in dem ein Betreiber meldet,
      dass nichts ankommt, ODER — spätestens — vor echtem Ad-Traffic (erweitert am
      2026-09-25: K4, die Ablage des Ergebnisses je Ziel, gehört zu dieser Ursache).
  (4) TRIGGER: mit dem ersten Ziel, dessen Zugangsdatum ablaufen kann; für LinkedIn ist er
      EINGETRETEN, seit das Ziel am 2026-08-19 sendet.
  (5) TRIGGER: ein Schreibweg auf `project_secrets`, der die Nicht-Leer-Prüfung nicht trägt.
- DER PAGEVIEW-TOKEN IST ALS CUSTOM-EVENT EINTIPPBAR (Trigger: vor echtem Ad-Traffic)
- DAS FENSTER ZWISCHEN MIGRATION UND DEPLOY IST UNGEREGELT (Trigger: die erste
  nicht-additive Migration)
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
  Frage wird spätestens fällig, wenn ein fremder Nutzer den Fluss startet)
- DIE PROJEKTWAHL ÜBERLEBT KEIN NEULADEN (Trigger: der erste fremde Nutzer mit mehr als
  einem Projekt — spätestens vor einem Beta-Launch)
- WAS GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT, IST UNGELESEN UND UNGEMESSEN (Trigger: der
  BESTÄTIGTE LIVE-NACHWEIS DER SCHEIBE 4 der Phase 11.2 — nachgezogen am 2026-09-01;
  EINGETRETEN am 2026-09-01, die Frage ist unbeantwortet)
- OB DAS LIVE VERWENDETE LINKEDIN-ZUGANGSDATUM ABLÄUFT, IST ERST AB MITTE OKTOBER 2026
  ENTSCHEIDBAR (Trigger: Mitte Oktober 2026 — abzulesen an der Direct-API-Seite im
  Campaign Manager, Anzeigen "Status" und "Data last received")
- DIE VERLUSTRATEN-AGGREGATION IST ZIEL-BLIND — "GEMESSEN ALLEIN AM META-PIXEL" IST EINE
  BESCHRIFTUNG, KEIN FILTER (Trigger: das erste weitere Ziel, das ein Browser-Tag mit
  Bestätigungs-Kanal ausliefert)

**AUS DEM PHASENENDE 11.2 GEHOBEN (2026-09-08) — NEUNZEHN PUNKTE.** Einer ist am 2026-09-23
geschlossen und hier entfernt ("DIE PRÄMISSE VON PUNKT (a) DES DATENKLASSEN-BLOCKS IST TOT").
Fünf weitere sind am 2026-09-25 bei der Sichtung am Phasenende 11.7 herausgenommen — drei
ERLEDIGT und gestrichen ("eventSourceUrl IST AN DER FAN-OUT-STELLE VERFÜGBAR …", "retry HAT
KEINE OBERGRENZE …", "ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8 …"), zwei ins Backlog
verschoben ("saveProject SCHREIBT settings UNVALIDIERT …", "DER RESOLVER SCHREIBT BEI TOTEM
ZUGANGSDATUM …"); je Titel steht in docs/offene-punkte.md der Beleg bzw. der Grund. Ein Titel
ist ERSETZT ("CONVERSIONS AUF FOLGESEITEN …").
- DIE SIEBEN-TAGE-FRIST UND DER STATUSWECHSEL AUF "IN PRODUKTION" (Trigger: EINGETRETEN,
  und er trägt einen TERMIN, der mit jeder Neu-Autorisierung wandert — im Status "Testing"
  stirbt das Erneuerungs-Token sieben Tage danach; abzulesen an der Ziel-Karte. Ein
  Neu-Verbinden VERSCHIEBT ihn und löst ihn NICHT; dauerhaft löst ihn nur der
  Statuswechsel, und der ist Arbeit am ANBIETER-KONTO, keine Code-Arbeit)
- DER eventSource-WERT IST NICHT GEMESSEN — GEBAUT IST "WEB" ALS ENTSCHEIDUNG (Trigger: das
  erste Instrument, das FACHLICHE Falschheit von syntaktischer Gültigkeit trennt —
  validateOnly=true leistet das ausdrücklich NICHT)
- DIE KOPFZEILE x-goog-user-project WIRD NICHT GESENDET — OB SIE PFLICHT IST, IST IN BEIDE
  RICHTUNGEN UNGEMESSEN (Trigger: die erste Anfrage, die OHNE sie scheitert oder MIT ihr
  anders ausfällt als ohne)
- DIE WIRKUNG AUF DIE GEBOTE IST UNGEMESSEN (Trigger: der erste Lauf mit genug verbuchten
  Conversions, dass eine Gebotsstrategie sie verwerten kann — spätestens der erste echte
  Ad-Traffic. DIESER PUNKT TRÄGT DIE AUFLAGE AM [x] DER PHASE 11.2)
- DER UPLOAD_CLICKS-VORBEHALT IM KUNDENKONTO — EINE VORAUSSETZUNG JE KUNDE, KEINE EINMALIGE
  ARBEIT (Trigger: der erste FREMDE Kunde, der Google verbindet)
- DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES (Trigger: die
  erste Messung des Auto-Taggings — "DIE ERSTE MESSUNG NIMMT SIE MIT")
- DREI FELDER DER NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER (Trigger:
  DREI Trigger, je Feld einer; der Eintrag entfällt ERST, wenn alle drei eingetreten UND
  abgearbeitet sind)
- EINE AUSWERTUNG DER ANBIETER-FEHLER DARF NICHT NUR DEN ERSTEN fieldViolation LESEN
  (Trigger: der erste Rückkanal für abgelehnte Ereignisse)
- KEIN NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG (Trigger: eine gemessene Rotation bei
  irgendeinem Anbieter dieses Rahmens, ODER ein Auslöser, der die Funktion nachweislich
  nebenläufig ruft — an BEIDEN Hälften NICHT eingetreten)
- PROJECT_PARAM STEHT ZWEIMAL, UND DIE DIVERGENZ IST EINSEITIG STUMM (Trigger: eine
  Änderung an einem der beiden Parameternamen)
- CONVERSIONS AUF FOLGESEITEN TRAGEN BEI KEINEM ZIEL EINE KLICK-KENNUNG — UND JEDE ABHILFE
  VERLANGT EINE AUFBEWAHRUNG, DIE DIESES PRODUKT NICHT HAT (Trigger: der Zuschnitt der
  Phase 17, ODER eine erneute Owner-Befassung mit der dritten Datenklasse, ODER der
  Zuschnitt eines Cookie-Wegs zu einer Klick-Kennung, gleich welchen Ziels. TITEL UND
  TRIGGER SIND AM 2026-09-25 ERSETZT, nicht gestempelt)
- STIRBT DAS ERNEUERUNGS-TOKEN, IST DER AUSFALL FÜR NIEMANDEN SICHTBAR (Trigger: die
  nächste Arbeit an der Ziel-Karte, ODER der Statuswechsel auf "In Produktion", ODER der
  erste Kunde mit einer Google-Verbindung)
- DER OAUTH-CALLBACK ZIEHT DEN VERSIONS-ZÄHLER NICHT MIT (Trigger: die nächste Arbeit
  am Schreibpfad der Callback-Route)

**AUS DEM PHASENENDE 11.3 GEHOBEN (2026-09-11) — VIER PUNKTE.** Vorrat (21) steht nicht
hier, sondern als Ursache (5) unter "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT
SENDEN".
- NACH DEM ENDE EINES TESTMODUS ERKLÄRT NICHTS DIE LÜCKE IN DER EIGENEN KURVE (Trigger: der
  erste fremde Nutzer, der den Testmodus einschaltet)
- DER CODE TRÄGT EINEN DEPLOYMENT-WEITEN TESTMODUS-HEBEL, DEN IN VERCEL HEUTE NIEMAND SETZT
  UND DEN NIEMAND BEOBACHTET (Trigger: das Setzen von `META_TEST_EVENT_CODE` oder
  `TIKTOK_TEST_EVENT_CODE` in einer Vercel-Umgebung — spätestens der erste fremde Kunde)
- DIE IDOR-WÄCHTER SIND NAMENTLICH — EINE NEUE SERVER-ACTION IST UNGESCHÜTZT BY DEFAULT, UND
  NICHTS WIRD DAVON ROT (Trigger: die nächste Runde, die eine Server-Action anlegt)
- ZEIGER AUF docs/aktiver-stand.md MEINEN EINE FRÜHERE STANDDATEI — DIE UMBENENNUNG AM
  PHASENENDE MACHT SIE TOT, DIE NÄCHSTE STANDDATEI WIEDER FALSCH (Trigger: das Anlegen der
  nächsten Standdatei unter demselben Pfad — sobald ihre Nummern die eines solchen Zeigers
  erreichen, trifft er wieder einen existierenden, aber falschen Eintrag — seit 2026-09-17
  nur noch für Zeiger auf einen ABSCHNITTSTITEL)

**NACH DEM PHASENENDE 11.3 AUFGENOMMEN (2026-09-14).**
- DER TESTZUSTAND WIRD NACH DEM SPEICHERN NICHT NEU GEHOLT — UND ER ÜBERLEBT DEN
  PROJEKTWECHSEL (ZWEI TRIGGER, je einzeln hinreichend, beide spätestens vor einem
  Beta-Launch: (1) für die drei Speicherpfade aus (b) — der erste fremde Nutzer, der
  Zugangsdaten oder eine Kennung speichert, auch mit nur EINEM Projekt; (2) für das Fenster
  aus (c) — der erste fremde Nutzer mit mehr als einem Projekt)

**AUS DEM PHASENENDE 11.5 GEHOBEN (2026-09-16) — SIEBEN POSTEN.** Einer ist am 2026-09-25
entfernt ("KEIN TEST LÄSST EINEN WURF BIS IN EINEN KNOPF-HANDLER …", seit dem 2026-09-17
erledigt; der Beleg steht am Posten in docs/offene-punkte.md).
- UNSER EINWILLIGUNGS-DIALOG KANN EIN FREMDES CMP ÜBERFAHREN — ZWEI WEGE, DIE GETRENNT
  BLEIBEN (ZWEI TRIGGER, je einzeln hinreichend, beide spätestens vor einem Beta-Launch mit
  fremden Nutzern: (1) der erste Betreiber, der ein asynchron setzendes CMP mitbringt UND
  unseren Schalter einschaltet; (2) der erste Betreiber, der ein eigenes CMP mitbringt UND
  unseren Dialog einschaltet — dort genügt schon ein Besucher-Klick)
- DER EINWILLIGUNGS-HOOK IST AN KEINER FÜR EINEN BETREIBER ERREICHBAREN STELLE BESCHRIEBEN
  (Trigger: der erste fremde Betreiber, der ein eigenes Consent-Management anbinden will —
  spätestens vor einem Beta-Launch mit fremden Nutzern)
- DER EXPORT-PFAD IST VOM EINWILLIGUNGS-SCHALTER NICHT ERFASST — UND ES GEHT UM CONVERSIONS,
  NICHT NUR UM SEITENAUFRUFE (Trigger: die erste exportierte, fremd gehostete Seite eines
  Projekts mit Tracking-Schlüssel und eingeschaltetem Dialog — spätestens vor einem
  Beta-Launch mit fremden Nutzern)
- settingsEqual IST EINE ALLOWLIST — JEDES NEUE MITGLIED DES EINSTELLUNGS-BLOBS IST FÜR dirty
  UNSICHTBAR BY DEFAULT, AUCH INNERHALB EINES UNTEROBJEKTS, UND NICHTS WIRD DAVON ROT
  (Trigger: die nächste Runde, die dem Einstellungs-Blob ein Mitglied hinzufügt — auf
  OBERSTER EBENE oder INNERHALB eines Unterobjekts wie settings.consent. TITEL UND TRIGGER
  SIND AM 2026-09-18 ERSETZT, nicht gestempelt)
- EIN EINGESCHALTETER EINWILLIGUNGS-DIALOG OHNE ZUSTIMMUNG SIEHT AUS WIE KAPUTTES TRACKING —
  UND ZWAR AN DREI STELLEN GLEICHZEITIG (Trigger: der erste fremde Nutzer, der den Dialog
  einschaltet — für den Owner BEREITS EINGETRETEN)
- DER CONSENT-GATE-BLOCK HAT ZWEI ERZEUGER — UND SIE LAUFEN BEREITS AUSEINANDER (Trigger: die
  nächste Änderung am INHALT des Gate-Blocks an einem der beiden Erzeuger — die reine
  Hüllen-Divergenz von heute ist harmlos und ist NICHT der Trigger)

**AUS DEM PHASENENDE 11.12 GEHOBEN (2026-09-17) — ZWEI POSTEN.**
- NETZANFRAGEN MIT URSPRUNG `null` SIND IN DER VORSCHAU NICHT LÖSBAR (Trigger: die erste
  importierte Seite, deren INHALT von einer fremden Schnittstelle kommt — für
  NEBENANFRAGEN ist er bereits belegt)
- `indexedDB` WIRFT IM VORSCHAU-RAHMEN WEITER (Trigger: die erste reale Seite, die in der
  Vorschau NACHWEISLICH an `indexedDB` stirbt)

**AUS DEM PHASENENDE 11.13 GEHOBEN (2026-09-18) — ZWEI POSTEN.** Ein dritter Posten hat
KEINE eigene Zeile: Vorrat P11.13-1 ist in den bestehenden Posten "settingsEqual IST EINE
ALLOWLIST" eingegangen, dessen Titel und Trigger dabei ERSETZT worden sind.
- EIN EIGENER SACHTEXT ÜBERLEBT DEN SPRACHWECHSEL — ZEHN TEXTE WECHSELN, EINER BLEIBT, UND
  NICHTS ZEIGT ES AN (Trigger: der erste Betreiber, der die Sprache umstellt und einen
  eigenen Sachtext gespeichert hat — spätestens vor einem Beta-Launch mit fremden Nutzern)
- EIN SCROLLBALKEN BRICHT DAS GLEICHRANGIGKEITS-KRITERIUM DES EINWILLIGUNGS-DIALOGS BEI
  360 px — UND ZWAR IM BESTAND (Trigger: die nächste Runde, die an Knopfbreite, Innenbreite
  oder Umbruch der eingeklappten Gestalt arbeitet — spätestens vor einem Beta-Launch mit
  fremden Nutzern)

**AUS DEM PHASENENDE 11.6 GEHOBEN (2026-09-19) — EIN POSTEN.** Er ist eine OWNER-VORGABE und
bündelt DREI Sachen; SEIN DRITTER TEIL STEHT NICHT DORT, SONDERN ALS PUNKT (4) AM POSTEN
"BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE".
- CUSTOM-PIXEL: QA UND BETREIBER-HINWEISE VOR DEM LAUNCH (Trigger: vor dem öffentlichen
  Launch)

**AUS DEM PHASENENDE 11.7 GEHOBEN (2026-09-25) — EIN POSTEN.** Drei weitere Ergebnisse
stehen als Ergänzung an bestehenden Posten und haben keine eigene Zeile: K4 an Ursache (3)
von "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN", die Cookie-Wege am Posten
"CONVERSIONS AUF FOLGESEITEN …" (Titel und Trigger ersetzt), die Containment-Messung an "DREI
WEGE, AUF DENEN EIN WURF DAS 204-CONTAINMENT BRECHEN KÖNNTE".
- KEINE KLICK-KENNUNG IST AN EINEM ECHTEN ANZEIGENKLICK GEPRÜFT — WEDER IHRE FORM NOCH DER
  ABGLEICH (Trigger: der erste echte Anzeigenklick je Ziel — spätestens vor echtem
  Ad-Traffic)

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

## Anbieter-Befunde der Fan-Out-Ziele — AUSGELAGERT nach docs/ziel-befunde/
Was über die Schnittstellen der Fan-Out-Ziele GEMESSEN und GELESEN ist (verlangte Felder,
Statuscodes, Rumpfformen, stille Fehlzustände, taugliche Live-Test-Instrumente), steht JE
ZIEL IN EINER EIGENEN DATEI unter docs/ziel-befunde/. docs/ziel-befunde.md ist seit dem
2026-09-22 VERZEICHNIS UND KONVENTIONS-KOPF und trägt KEINEN Befund mehr. Nichts davon
lädt automatisch.
PFLICHT-STOPP, KEINE EMPFEHLUNG: Wer ein Fan-Out-Ziel zuschneidet, einen Adapter baut, beim
Anbieter recherchiert oder eine Live-Test-Anleitung dafür schreibt, LÄDT ZUERST — vor dem
Plan, nicht während des Baus. Ohne das plant man gegen eine überholte Fassung: die
LinkedIn-Befunde standen bis zum 2026-08-15 als GELESEN in der Roadmap-Zeile 11.1, und die
Messung dieses Tages hat eine ihrer Angaben widerlegt. DIE FORM IST ZWEIGETEILT:
· ZUSCHNITT, ADAPTER UND LIVE-TEST-ANLEITUNG — VOLLLADUNG DER DATEI DES ZIELS, dazu der
  KOPF von docs/ziel-befunde.md (Konventionen, Provenienz-Pflicht, Verweis-Regel). Eine
  Scheibe, die MEHRERE Ziele berührt, lädt die Dateien ALLER berührten Ziele; trägt eine
  Sitzung das nicht, WIRD DIE SCHEIBE JE ZIEL GESCHNITTEN — nicht die Ladung verkürzt.
  Er gilt dem Zuschnitt und verlegt die Grenze dort vom Ladeumfang in den Schnitt der
  Scheibe. Die Teilung in zwei Sitzungen bei einer Recherche (unten) bleibt davon
  unberührt.
· RECHERCHE, DEREN FREIER KONTEXT DIE VOLLLADUNG NICHT TRÄGT — es genügt eine GEZIELTE
  SUCHE über die Datei des Ziels, mit BENANNTER ACHSE und POSITIVKONTROLLE, jeder Treffer
  im Wortlaut gelesen. WER SO VERFÄHRT, WEIST ES IM ERSTEN SATZ SEINES BERICHTS AUS. Ohne
  diese Ansage ist von aussen nicht zu unterscheiden, ob voll geladen oder gesucht wurde —
  und ein "steht dort nicht" hätte keine Reichweite.
DAS VERZEICHNIS ALLEIN ERFÜLLT DEN PFLICHT-STOPP NICHT: Es trägt keinen Befund. Wer nur es
lädt, hat die Pflicht dem ANSCHEIN nach erfüllt und nichts gelesen.
NEUE BEFUNDE GEHEN IN DIE DATEI DES ZIELS, hinten, unter eine eigene DATIERTE
Unterüberschrift; die Buchstaben laufen je Ziel fort. Das Verzeichnis bekommt nur bei einem
NEUEN Ziel eine Zeile — dann zusammen mit der neuen Datei, im selben Zug.
BESTEHENDE ZEIGER BLEIBEN GÜLTIG, und dafür ist die alte Datei stehengeblieben: Ein Verweis
der Form "docs/ziel-befunde.md, Abschnitt X, Teil (y)" MEINT DIE DATEI DES ZIELS X. Die
bestehenden sind bewusst NICHT nachgezogen; sie landen im Verzeichnis und werden dort
aufgelöst.
DER GRUND IST EIN MESSWERT UND KEIN UNBEHAGEN: Die Datei war 549 237 Bytes / 7 749 Zeilen
(GEMESSEN, CC, 2026-09-21) und ist danach weiter gewachsen, der freie Kontext einer Sitzung
lag zu Rundenbeginn bei 196k Token (ABGELESEN; die Umrechnung ist eine SCHÄTZUNG). EINE
SITZUNG, DIE VOLL LÄDT UND DANACH CRAWLT, GIBT ES NICHT — in der Phase 11.11 zweimal
aufgetreten. DIE DATIERTE ANGABE BLEIBT STEHEN: sie trägt die Begründung der gezielten
Form, und die gilt weiter.
DIE GRENZE, OHNE DIE DAS EINE LOCKERUNG DURCH DIE HINTERTÜR WÄRE: Die gezielte Form trägt
nur, WENN IHR ERGEBNIS DÜNN IST, und das ist ein ERGEBNIS und keine Voraussetzung — im
Fall, der sie ausgelöst hat, ergab die Suche fünf Treffer in zwei Zusammenhängen.
IST DAS ERGEBNIS DICHT, WIRD DIE ARBEIT GETEILT UND NICHT DOCH NOCH IN EINE SITZUNG
GEZWUNGEN: Eine Sitzung lädt die Datei des Ziels VOLLSTÄNDIG und hält fest, was sie
über das Ziel trägt; der Crawl läuft in einer ZWEITEN.
DIE ZWEITE GRENZE, UND SIE IST DIE WICHTIGERE: Die Google-Datei trug am 2026-09-24
408 302 Bytes (GEMESSEN, CC) und bleibt die mit Abstand grösste. OB EINE SITZUNG SIE VOLL
LÄDT UND DANACH NOCH ARBEIT TRÄGT, IST AM 2026-09-24 GEMESSEN (OWNER, /context): Volladung
samt Standdatei, Kopf und vollständiger Aufklärung belegte 587,4k von 1M Token (59 %), frei
379,6k — AUF EINEM MODELL MIT 1M KONTEXT. Für ein Fenster von rund 200k trägt es nicht
(ABLEITUNG aus den Zahlen). Nachweis: VERMERK P11.7-23 der Phase 11.7.
UND AUCH DANN IST SIE KEINE QUELLE: Ein Dokument beschreibt ein fremdes System, es belegt
es nicht. Was gilt, steht am ENDPUNKT DES ANBIETERS — gemessen wird mit einem Aufruf gegen
die Schnittstelle, nicht abgelesen. Ein Anbieter kann sein Verhalten zudem ändern, ohne
dass hier irgendetwas rot wird.
DER EINTRAG UNTER "## Aktive Dokumente" BLEIBT DANEBEN STEHEN und wird von diesem Abschnitt
nicht ersetzt: dort steht, WAS die Dateien sind, hier, WANN sie Pflicht werden — dieselbe
Aufteilung wie bei docs/db-stand.md.

## Aktiver Stand — Verfahren ab Phase 10
Ab Phase 10 wird der aktive Stand einer laufenden Phase NICHT hier geführt, sondern in einer
eigenen, nicht automatisch geladenen Datei: docs/aktiver-stand.md. Existiert sie nicht,
läuft keine Phase — oder die Phase steht in ihrer ersten Aufklärung; das sagt dann der
Prompt.
Diese Datei muss JEDE Session, die an einer laufenden Phase arbeitet, ZUERST gelesen werden
— ein Pflicht-Gate ("Auftrag 0") in jedem Bau- und Aufklärungs-Prompt. Ablauf (Anlegen,
Fortschreiben, Hebung + Archivierung am Phasenende): docs/arbeitsweise.md.
EINE STANDDATEI KANN GETEILT WERDEN, wenn eine Phase so gross wird, dass ihre vollständige
Lesung nicht mehr zu leisten ist — EIN PFLICHT-GATE, DAS NIEMAND VOLLSTÄNDIG LIEST, IST
KEINES. Die Steuerdatei behält dann ihren Namen und bleibt das Gate; Archiv und Vorrat
wandern in eigene Dateien und werden NICHT geladen, sondern über REGISTER in der Steuerdatei
gezielt aufgeschlagen. DIE TEILUNG IST KEIN PFLICHTTEIL EINER PHASE — eine kleine Phase
bleibt bei EINER Datei. Verfahren, Zuschnitt und Nachweisführung: docs/arbeitsweise.md,
"Die Standdatei". Bisher einzige geteilte Phase: 11.2 (2026-09-08), am selben Tag
abgeschlossen.

## Code-Qualität, Performance & SaaS-Skalierung
Zwei bewusst GETRENNTE Blöcke. A gilt ab sofort und ist prüfbar — jede neue Query, Policy
und jeder externe Call wird daran gemessen. B sind Skalierungs-Leitplanken für Features, die
es HEUTE NICHT GIBT; sie sind NICHT bindend und der Code wird NICHT auf sie hin vorgebaut.
Jede B-Regel trägt eine explizite TRIGGER-Bedingung — erst wenn die eintritt, wird die Regel
scharf und wandert (dann als geprüfte Entscheidung) nach A.

### A) Heute verbindlich (prüfbar, gilt ab sofort)
- DATENZUGRIFF: Ausschließlich über den Supabase-JS-Client (PostgREST/HTTP). Keine direkte
  PostgreSQL-Verbindung, kein ORM (Prisma/Drizzle etc.) ohne explizite Rücksprache.
- KEIN SELECT *: nur die für die Business-Logik nötigen Spalten abrufen (Muster:
  resolve.ts-Resolver).
- KEIN N+1: keine Schleifen mit Einzel-Query pro Element; Joins/gebündelte Queries nutzen.
- PROAKTIVE INDIZES: bei jeder neuen Tabelle/Spalte, die in WHERE/ORDER BY/Matching
  verwendet wird, direkt einen passenden Index vorschlagen (Präzedenzfall: partial unique
  index auf domains.custom_host).
- RLS-PRÄZISION (NICHT "O(1) Policies" — das ist keine sinnvolle Metrik): auth.uid() in
  Policies IMMER als (select auth.uid()) wrappen. Keine tiefen Joins/Subqueries in Policies.
  Eine neue Policy spiegelt die Ownership-ACHSE der bestehenden Tabellen-Policy (nie neu
  erfinden — Divergenz zwischen "wer darf das Projekt" und "wer darf die Events" WÄRE das
  Leak); korrelierter Semi-Join via EXISTS statt IN.
  security definer NUR mit expliziter Einzelfall-Begründung vorschlagen (umgeht RLS, ist bei
  Fehlgebrauch selbst ein Sicherheitsloch) — NIEMALS als Standardempfehlung. BELEGTE
  AUSNAHME: die Event-Trigger-FUNKTION rls_auto_enable (gebunden über den Event-Trigger
  ensure_rls; existiert in der DB, NICHT aus einer Migration — DDL archiviert unter
  supabase/manual/rls_auto_enable.sql) IST SECURITY DEFINER — korrekt, weil Event-Trigger als
  Owner laufen; die DEFINER-Warnung des Advisors ist dort erwartet.
- LIKE-WILDCARD-FALLE bei Präfix-Filtern: '_' ist ein LIKE-Wildcard -> "not like '__ps_%'"
  matcht mehr als gedacht. Präfix-Ausschlüsse über left(spalte,5) <> '__ps_' formulieren.
- DEFENSIVE TIMEOUTS: JEDER externe API-Call braucht ein striktes Timeout, damit ein
  hängender Drittanbieter die Serverless-Funktion nicht blockiert.
- /API/E-SCHLANKHEIT (der reale Hotspot, NICHT CSV/Bulk): /api/e wird von JEDEM Besucher
  JEDER Kundenseite getroffen — jeder zusätzliche synchrone Call dort multipliziert sich mit
  dem Traffic ALLER Kunden zusammen.
  DIE REGEL HAT ZWEI HÄLFTEN MIT VERSCHIEDENEM RANG (seit 2026-08-10):
  (1) "Die Beacon-Antwort an den Client darf NICHT auf den Meta-Call warten" — BEDINGT. Sie
      ist als ABSICHT richtig, NOCH NICHT EINGELÖST und wird erst mit ihrem TRIGGER scharf:
      eine GEMESSENE Grenze unter echtem Traffic (Concurrency-Slots bzw. Skalierungsverhalten
      auf dem Ingest-Pfad), ODER ein Wegfall von Fluid Compute. Ausdrücklich NICHT "falls es
      je ein Problem wird". KEIN Umbau auf Hintergrund-Zustellung ohne diesen Trigger.
  (2) "Der CAPI-Call selbst muss zuverlässig zugestellt werden" — UNBEDINGT.
  IST-ZUSTAND (gemessen 2026-08-05, erneut 2026-08-08): Der Meta-Forward wird mit await IM
  REQUEST erwartet, gedeckelt per AbortController auf META_FORWARD_TIMEOUT_MS; das
  abschliessende status(204) steht DAHINTER. Nutzlast-Bau, AbortController, Timer und
  Fehlerdeutung liegen in forwardToMeta (src/lib/capi/meta-forward.ts); in handleIngest
  stehen nur noch das await und die 204 dahinter. Der Hintergrund-Mechanismus (after aus
  next/server) trägt NUR den Analytics-Persist über schedulePersist, nicht den Forward.
  JEDER WEITERE EMPFÄNGER VERSCHÄRFT DIESE REGEL, UND NEBENLÄUFIGKEIT LÖST DAS NICHT: wer
  nebenläufig statt seriell wartet, wartet auf das MAXIMUM statt auf die SUMME — eine
  Dämpfung, keine Aufhebung.
  WO DER PREIS LIEGT: NICHT in der Wartezeit des BESUCHERS und NICHT in der Rechenzeit
  (unter Fluid Compute pausiert die Active-CPU-Abrechnung während I/O), sondern in der
  BELEGUNG VON CONCURRENCY-SLOTS auf dem meistgetroffenen Pfad, multipliziert über ALLE
  Kunden. Wer den Preis beim Besucher sucht, findet keinen und streicht die Regel.
  Herleitung, Provenienz und die gestrichene Umbau-Scheibe: docs/claude-md-herleitung.md.
- RATE-LIMITING: siehe Security Manifest Tier 1 — nur Cross-Link, keine Duplikation.
- AUDIT-LOGS: siehe Security Manifest — nur Cross-Link, keine Duplikation.

### B) Skalierungs-Leitplanken für SPÄTER (NICHT bindend, kein Code heute danach ausrichten)
- BULK-/CSV-STREAMING (Presigned Uploads, zeilenweise Verarbeitung, keine Volllast in RAM).
  TRIGGER: sobald das Lead-Enrichment-Modul real umgesetzt wird.
- QUEUE-TOOLS / ASYNC-INFRASTRUKTUR (Inngest, Upstash, Database-Webhooks, Edge Functions).
  TRIGGER: sobald ein ZWEITER unabhängiger Async-Anwendungsfall entsteht — keine
  Infrastruktur auf Verdacht bauen.
- REALTIME/WEBSOCKET-DISZIPLIN (RLS-gefilterte Subscriptions, aggregierte statt
  Event-per-Row-Pushes). TRIGGER: sobald ein Realtime-/Live-Dashboard-Feature geplant wird.

## Security Manifest & Launch Blocker (Tier-Übersicht)
Launch-Blocker, sequenziert nach dem Moment, in dem das Risiko real BEISST (nicht alles ist
P0). Diese Datei trägt je Item Status + TRAGENDE KONTROLLE + BINDET-AN, dazu die OPERATIVEN
ARTEFAKTE für den Ernstfall (SQL-Runbook, Verifikations-Lektionen) — weil CLAUDE.md jede
Session geladen ist und im Ernstfall ohne Suchen auffindbar sein muss.
VOLLFASSUNG (die vier Begründungsfelder je Item — RISIKO / TRAGENDE KONTROLLE / EHRLICHE
EINORDNUNG / BINDET-AN): docs/claude-history/security-manifest-full.md.
DER STATUS JE ITEM STEHT IN BEIDEN FASSUNGEN UND MUSS DECKUNGSGLEICH SEIN. Beide Fassungen
IMMER im selben Commit ändern — das ist der Mechanismus, der die Deckungsgleichheit sichert,
keine Formsache. Er ist einmal verletzt worden.
ELF ITEMS TRAGEN IN KEINER DER BEIDEN FASSUNGEN EINEN AUSDRÜCKLICHEN STATUS (GEMESSEN, CC,
2026-09-22). Hier wird keiner erfunden: Ihr Stand ist aus ihrem BINDET-AN zu lesen, und wer
einen setzen will, setzt ihn in BEIDEN Fassungen im selben Commit.

### Tier 0 — Harte Launch-Blocker (katastrophal beim ersten bösen Nutzer / irreversibel)
- KILL-SWITCH (höchste Prio): GEBAUT, LIVE VERIFIZIERT. LIVE-SMOKE VOLLSTÄNDIG BESTANDEN
  (4/4). Projektbasierte Sperre (projects.blocked_at; domains.blocked_at additiv
  vorbereitet + im Serve-Check schon mitgeprüft, operativ noch nicht gesetzt),
  FAIL-CLOSED, 451 + statische Erklärseite im Serve-Pfad, Ingest-Stop in /api/e (früher
  Verwurf VOR Token-Lookup, spart die Token-Query). Migration 0008, Serve-Resolver auf
  ServeResult-Union (ok/blocked/notfound). BINDET-AN: Serving existiert (7a/7c-1) ->
  erledigt, vor erstem Fremd-Traffic.
- KILL-SWITCH — LEKTION (Manifest, nicht nur Chat): identischer HTTP-Status bei /api/e ist
  HIER bewusstes Sicherheitsdesign (Sperre von "unbekannter Key" nicht unterscheidbar),
  KEIN Testfehler. Verifikation dieses Pfades MUSS über die NACHGELAGERTE Wirkung laufen
  (Meta Events Manager: kommt etwas an oder nicht), NICHT über den Statuscode allein. Ein
  400 an /api/e beweist ebenfalls nichts über die Sperre — die Pflichtfeld-Validierung
  {trackingKey,eventID,event} greift VOR dem blocked_at-Check.
  ZWEI ACHSEN, ZWEI PRÜFUNGEN: SERVE antwortet 451 mit Erklärseite, INGEST antwortet leer
  mit 204 — beides ist korrekt und beides ist DERSELBE Kill-Switch. In
  Live-Test-Anleitungen gehören sie als ZWEI getrennte Prüfungen aufgeführt, sonst liest
  sich das erwartete 204 wie ein fehlendes 451 (hat in ZWEI Phasen den Verdacht eines Bugs
  erzeugt).
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
  einer Rechnung. KEIN pauschales "erledigt" über beide Plattformen. WIEDERVORLAGE: sobald
  Vercel auf Pro geht, wird der Cap dort SOFORT fällig — dann kippt die strukturelle
  Deckelung, die ihn heute ersetzt.
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
  Supabase-HaveIBeenPwned-Abgleich läuft).
- ENCRYPTION-AT-REST CAPI-Token: tragend bleibt Isolation + RLS-SELECT-Sperre +
  service_role-only (Token physisch write-only); Verschlüsselung nur Defense-in-Depth
  (In-DB-Key = Theater, echtes Envelope braucht KMS). BINDET-AN: Härtung nach Launch.
  ZUSATZ 2026-08-25 — DER SATZ DARÜBER BLEIBT WÖRTLICH, DER STATUS BLEIBT OFFEN, BINDET-AN
  BLEIBT UNVERÄNDERT. Eine Anbieter-Lesung prüft seine zwei Hälften und trennt sie:
  "In-DB-Key = Theater" ist WÖRTLICH BESTÄTIGT (zwei unabhängige Quellen, dasselbe Bild);
  "echtes Envelope braucht KMS" ist SCHWEIGEN MIT BENANNTER ACHSE — weder bestätigt noch
  widerlegt. DIE FOLGE, DIE MAN SONST ÜBERSIEHT: Der Wurzelschlüssel des Anbieters liegt
  NICHT in unserem Postgres; der Satz trifft damit eine Ablage MIT Schlüssel IN der
  Datenbank, nicht jedes Verfahren, das der Anbieter anbietet. Dass der Anbieter ohnehin at
  rest verschlüsselt, zählt NICHT als Antwort auf die Google-Auflage.
  Fundstellen: docs/plattform-befunde.md, "Supabase (Postgres · Auth · RLS · Vault ·
  Backups)", Teile (q) und (r) — und in der VOLLFASSUNG dieses Manifests.
- VERCEL-TOKEN scoped + Domain-Mutations-AUDIT-LOG: Token minimal scopen + jede
  Domain-Mutation mit Actor + Zeit protokollieren. BINDET-AN: 7c-2.
- META-FEHLERLOG SPIEGELT DAS ZUGANGSDATUM ZURÜCK (eingestuft 2026-08-10, zuvor ohne Stufe;
  OFFEN): describeMetaError (src/lib/capi/meta-forward.ts) loggt Fremdtext aus der
  Anbieter-Antwort — darin kann das gesendete Zugangsdatum zurückgespiegelt sein.
  BINDET-AN: das erste Projekt mit hinterlegtem Zugangsdatum.

### Tier 2 — Laufende Hygiene / verankerte Prinzipien (KEIN Gate)
- LOGGING-LEAK (herabgestuft von Tier 0, gemessen 2026-07-24): In PRODUKTION wird das
  setCapiToken-Server-Action-Argument NICHT geloggt — Differenztest in Vercel-Prod-Logs mit
  Positivkontrolle, die Token-Sonde taucht in KEINER Zeile auf; Log-Drains sind Pro-gated
  und keine konfiguriert -> Logs verlassen Vercel nicht. Die 2a-Beobachtung war das
  Dev-Terminal (next dev). KEINE Token-Rotation nötig. Der strukturelle Fix (Token nicht als
  Action-Argument) bleibt Defense-in-Depth. Restrisiken: Fehlerpfad ungetestet, lokales
  Dev-Terminal. BINDET-AN: laufend (Defense-in-Depth), nicht mehr Launch-Gate.
  WIEDERVORLAGE: Der Befund gilt für den HEUTIGEN Code — setCapiToken ist die EINZIGE
  Server Action mit Secret-Parameter (erhoben 2026-07-24). Bei JEDER neuen Server Action mit
  Secret-Parameter neu bewerten.
- DEPENDABOT: ERLEDIGT (2026-07-24: Alerts, Security Updates, Dependency Graph aktiv, 1 Regel).
- DEPENDABOT-MELDUNGEN GESICHTET (2026-09-12) — ERLEDIGT (2026-09-14): NULL OFFEN NACH DEM
  NEXT-SPRUNG. RUHENDER POSTEN — er sagt, WIE gesichtet wird, und ist kein offener.
  DER ZUSTAND: Dependabot führt NULL offene Meldungen — OWNER-ANGABE 2026-09-14, nach dem
  Sprung auf next 16.3.5. NICHT von CC gemessen: gh ist auf dieser Maschine nicht
  installiert, und die Liste liegt nicht im Repo. DANEBEN GEMESSEN (CC, 2026-09-14):
  `npm audit` meldet "found 0 vulnerabilities" bei installiertem und gepinntem next 16.3.5.
  BINDET-AN: DIE NÄCHSTE MELDUNG (ARCHITEKT-VORSCHLAG 2026-09-14). Sie wird wie am
  2026-09-12 gesichtet — JE MELDUNG AUF ERREICHBARKEIT eines Produktivpfades statt auf die
  blosse Meldung, und die DEPENDABOT-ZAHL WIRD NEBEN `npm audit` GELESEN, NICHT STATT
  DESSEN: npm gruppiert je PAKET, Dependabot zählt je ADVISORY je MANIFEST — BEIDE ZAHLEN
  SIND RICHTIG, wer sie gleichsetzt, hält eine für einen Fehler. Eine Null allein sagt
  nicht, ob eine Meldung geschlossen wurde oder verschwunden ist: bis zur Sichtung am
  2026-09-12 waren zwei Meldungen ohne erhobene Erklärung aus der Liste verschwunden, und
  die Erklärung ist bis heute unerhoben.
  Die Sichtung vom 2026-09-12 mit ihrer Begründung je Paket (postcss · sharp · next/image ·
  Dev-Pakete), die Windows-RCE-Einordnung und die beiden auseinandergehenden Zählungen
  stehen DATIERT in docs/claude-md-herleitung.md; wer sie streicht, weil "null offen"
  dasteht, wirft die Begründung weg und misst beim nächsten Mal von vorn.
  TIER 2 BLEIBT, KEIN GATE.
- BACKUPS + Restore-Drill (TEILWEISE ERLEDIGT — Backup-Tier steht, DRILL WEITERHIN OFFEN):
  BACKUP-TIER BESTÄTIGT (2026-07-29): Supabase auf PRO -> TÄGLICHE Backups, 7 Tage
  Retention. Die frühere Einordnung "Free hat GAR KEINE Backups" ist überholt und wurde
  ersetzt, nicht nur ergänzt.
  DREI DINGE BLEIBEN OFFEN — sie sind der Grund, warum der Punkt nicht abgehakt wird:
  (1) DER DRILL IST NICHT GEFAHREN. Ein ungetestetes Backup ist kein Backup; ein
      Backup-Tier zu BUCHEN und einen Restore zu KÖNNEN sind zwei verschiedene Aussagen.
  (2) PITR IST NICHT GEBUCHT -> im Ernstfall bis zu 24 h Datenverlust (alles seit dem
      letzten täglichen Snapshot). Bewusste Entscheidung; sie muss aber SICHTBAR bleiben,
      sonst liest sich "tägliche Backups" wie Lückenlosigkeit.
  (3) DIE ensure_rls-REBUILD-LÜCKE BESTEHT UNVERÄNDERT: der Event-Trigger hängt am CLUSTER
      und steckt in keinem Schema-Dump — das Upgrade ändert daran nichts (s. "## Offene
      Punkte").
  BINDET-AN: laufend; erster Drill vor echten Kundendaten.
  ÜBERHOLT, HISTORISCH: der manuelle pg_dump war die ZWISCHENLÖSUNG für den Free-Zustand
  und ist mit dem Pro-Wechsel kein tragender Bestandteil mehr — Details und Provenienz in
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
- src/components/  React-Komponenten
- src/lib/         Logik ohne UI (Detection, Transformation, Clients)

## Code-Konventionen
- TypeScript strikt, keine `any` ohne guten Grund.
- Reine Logik (Detection, Mapping-Transformation) gehört in src/lib/ und ist unit-testbar,
  getrennt von den React-Komponenten.
- Client-Komponenten nur wo nötig ("use client"), sonst Server-Komponenten.
- Aussagekräftige, kleine Commits — Build-in-Public, der Verlauf wird gelesen.

## UX- & Design-Prinzipien (gelten bei JEDER Iteration)
- Dünnes, aber echtes Design-Fundament: Design-Tokens (kleine Palette, ein Font-Pairing,
  eine Spacing-Skala) statt Default-Tailwind-Look.
- Wiederverwendbare Primitive (Button, Panel, Badge) statt copy-paste-Styles.
- Konsistenz vor Verzierung. Keine vorzeitige Politur (Animationen, Onboarding, Dark-Mode)
  bevor der Kern-Loop steht.
- UX-Aufwand fließt ins HERZ des Produkts: "Click & Connect" muss sich direkt, sichtbar und
  fehlertolerant anfühlen.
- Marketer-Mindset: Geschwindigkeit und "1 Klick" über Konfig-Tiefe.

## Immer beachten — AUSGELAGERT nach docs/immer-beachten.md
Die dauerhaften Regeln dieses Projekts stehen in ZWEI Dateien: docs/immer-beachten.md ist
der KERN — je Regel der wörtliche Titel und der verbindliche Inhalt.
docs/immer-beachten-herleitung.md trägt den VOLLTEXT (Belege, Herkunft, Abgrenzungen,
Stempel, Provenienz).
DIE HERLEITUNG IST AUSLÖSER-GELADEN, DER KERN NICHT: Wer eine Regel ÄNDERT, LOCKERT ODER
AUSWEITET — und wer das WARUM einer Regel braucht —, lädt docs/immer-beachten-herleitung.md
ZUERST. Für die tägliche Arbeit genügt der Kern; er ist nicht die Kurzfassung, sondern die
verbindliche.
PFLICHT, KEINE EMPFEHLUNG — UND AUSDRÜCKLICH KEIN AUSLÖSER: docs/immer-beachten.md WIRD IN
JEDER SITZUNG GELADEN, unbedingt, genau wie diese Datei hier. Wer ohne sie arbeitet,
arbeitet ohne den grössten Teil der Projektregeln — und merkt es nicht, weil nichts fehlt,
wonach man suchen würde.
DIE FOLGENDE ZEILE IST EIN LADEBEFEHL, KEIN VERWEIS — WIRD SIE ENTFERNT, LADEN DIE REGELN
NICHT MEHR, UND NICHTS MELDET DAS:

@docs/immer-beachten.md

SIE IST AUSDRÜCKLICH KEIN VERSTOSS GEGEN "Reine Pfad-Verweise, KEIN @-Import" unter
"## Detail-Archiv": jener Grundsatz gilt dem ARCHIV, wo gerade NICHT geladen werden soll.
HIER IST LADEN DER ZWECK. Das Schild steht hier, weil ein einzelner Import in einer Datei,
die anderswo das Gegenteil als Grundsatz führt, sonst ein Kandidat für die nächste
Aufräumrunde ist.
DER FRÜHERE GATE-APPARAT (Marke IB-GELADEN in der ersten Zeile jener Datei; Nennung von
Marke UND letzter Regelüberschrift in der Umfangs-Ansage) RUHT seit dem 2026-08-21, weil
der Ladebefehl die Ladung mechanisch garantiert. ER GILT WIEDER, sobald der Ladebefehl
entfernt wird oder nicht mehr trägt. An die Stelle der Prüfung tritt /context — ein
NUTZER-Befehl, den CC nicht ausführen kann; die Prüfung liegt damit beim Owner. Volltext:
docs/claude-md-herleitung.md.
ABGRENZUNG ZU DEN AUSLÖSER-GELADENEN DATEIEN: docs/db-stand.md und docs/db-regeln.md laden
bei einer Migration oder einem Eingriff in Schema, Policies, RPCs oder den
Analytics-Lesepfad; docs/claude-history/security-manifest-full.md bei Manifest-Arbeit; die
Phasen-Historien für das WARUM einer Regel. Sie werden aufgeschlagen, WENN ihr Fall
eintritt. docs/immer-beachten.md lädt OHNE Auslöser. Wer beides gleich behandelt, macht aus
einer unbedingten Pflicht eine bedingte.

## Aktive Dokumente (nicht geladen, nicht Teil des CC-Kontexts)
Aktiv und konstant gepflegt — im Unterschied zum Detail-Archiv darunter, das ABGESCHLOSSENE
Historie trägt.

WOHIN EIN NEUER SATZ GEHÖRT — IM ZWEIFEL RAUS, NICHT IN DIESE DATEI. Acht Wege, die erste
passende Antwort gewinnt: (1) dauerhaft und projektweit -> docs/immer-beachten.md (KERN),
HINTEN anfügen; die Begründung in docs/immer-beachten-herleitung.md · (2) laufender
Phasenschnitt -> docs/aktiver-stand.md · (3) Zustand, der später kippt (TODO mit Trigger) ->
docs/offene-punkte.md, Titel + Trigger als Stub-Zeile hier · (4) Phasenplanung oder -stand ->
docs/roadmap.md, Marker im Stub hier · (5) Befund über ein FAN-OUT-ZIEL -> die Datei des
Ziels unter docs/ziel-befunde/ (Verzeichnis und Konventionen: docs/ziel-befunde.md), offene
FRAGE dazu -> docs/ziel-fragenkatalog.md; Befund über einen PLATTFORM-ANBIETER ->
docs/plattform-befunde.md · (6) Schema, Policies, Analytics-Lesepfad -> docs/db-stand.md
(Zustand) bzw. docs/db-regeln.md (Regeln) · (7) Regel über die ARBEITSWEISE selbst ->
docs/arbeitsweise.md, als ÄNDERUNGSANTRAG · (8) keins davon -> NACHFRAGEN.
KEINE NEUE DATEI OHNE OWNER-ENTSCHEIDUNG — VERBOT, keine Empfehlung; genau eine Ausnahme ist
die Standdatei, die nach Verfahren entsteht. Weg 1 führt aus DIESER Datei heraus, NICHT aus
dem Startkontext: docs/immer-beachten.md lädt unbedingt mit.

- docs/claude-md-herleitung.md — der VOLLTEXT dieser Datei: Belege, Herkunft, Messungen,
  Stempel, Provenienz, Richtigstellungen, verworfene Alternativen; darin zeichengleich der
  Stand vom 2026-09-22. AUSLÖSER: Wer eine Aussage dieser Datei ändert, lockert oder
  ausweitet — und wer das WARUM einer Aussage braucht. Sie gehört keiner Phase und wird
  NICHT archiviert.
- docs/arbeitsweise.md — Arbeits- und Prompt-Disziplin (Kadenz, Stufen, Nachweisführung,
  Phasenende-Ablauf). VOM ARCHITEKTEN GEPFLEGT und NICHT Teil des CC-Kontexts — das meint
  das LADEN, nicht das Bearbeiten: CC pflegt sie redaktionell auf Anweisung, der INHALT wird
  über Weg 7 als ÄNDERUNGSANTRAG entschieden. Sie beschreibt, WIE Aufträge ENTSTEHEN, nicht
  die Bauanleitung.
- docs/db-stand.md — der gemessene Ist-Zustand von DB und Analytics-Lesepfad. PFLICHTLEKTÜRE
  vor jeder Migration und vor jedem Eingriff in Schema, Policies, RPCs oder den
  Analytics-Lesepfad. Fortgeschrieben ausschliesslich aus einer Messung (Probe:
  supabase/checks/db-stand.sql), nie aus den Migrationsdateien.
- docs/db-regeln.md — die dauerhaften DB-REGELN. Derselbe Pflicht-Stopp wie db-stand.md.
- docs/ziel-befunde/ — die GEMESSENEN und GELESENEN Befunde über die Schnittstellen der
  Fan-Out-Ziele, JE ZIEL EINE EIGENE DATEI, mit Provenienz an jeder Angabe. Sie tragen KEINE
  Regeln und KEINE Entscheidungen. AUSLÖSER: Zuschnitt, Adapter, Anbieter-Recherche oder
  Live-Test-Anleitung eines Ziels — dann die Datei DES ZIELS zuerst. Keiner Phase zugehörig,
  wird NICHT archiviert.
- docs/ziel-befunde.md — seit dem 2026-09-22 das VERZEICHNIS der Ziel-Dateien und der Ort
  ihrer KONVENTIONEN (Buchstaben-Fortlauf, Doppelbuchstaben nach (z), Provenienz-Pflicht,
  Verweis-Regel). SIE TRÄGT KEINEN BEFUND MEHR und erfüllt den Pflicht-Stopp allein NICHT.
  Sie löst die bestehenden Zeiger der Form "Abschnitt X" auf die Datei des Ziels X auf.
- docs/ziel-fragenkatalog.md — die FRAGEN, die an JEDEM Fan-Out-Ziel zu beantworten sind
  (41 in 9 Gruppen), und ein DATIERTER Befund darüber, welche Frage je Ziel beantwortet ist.
  Trägt KEINE Antworten. AUSLÖSER: derselbe wie bei den Ziel-Dateien — beide zuerst lesen.
  Der KATALOG ist dauerhaft; die MATRIX ist eine MOMENTAUFNAHME vom 2026-08-20 und wird
  nicht stillschweigend fortgeschrieben — wer sie fortschreibt, DATIERT es.
- docs/roadmap.md — der VOLLTEXT der Roadmap-Phasen: Begründungen, Provenienz, Auflagen,
  Richtigstellungen. AUSLÖSER: Wer eine Phase zuschneidet, abhakt oder ihren Stand ändert.
  DER MARKER STEHT HIER, DER VOLLTEXT DORT — wer einen MARKER ändert, ändert ihn HIER; wer
  eine BEGRÜNDUNG ändert, ändert sie DORT, und keine der beiden wird davon rot. Sie gehört
  KEINER Phase und wird NICHT archiviert.
- docs/offene-punkte.md — der VOLLTEXT jedes offenen Punktes: Befunde, Provenienz,
  Messungen, Richtigstellungen, Ursprungs-Nummern. Hier steht je Punkt nur Titel + Trigger.
- docs/plattform-befunde.md — die GEMESSENEN und GELESENEN Befunde über die
  PLATTFORM-Anbieter (Persistenz, Auth, Hosting, Ausspielung, Deploy), je Anbieter ein
  Abschnitt, mit Provenienz. Trägt KEINE Regeln, KEINE Entscheidungen und KEINEN Zustand
  unserer Datenbank. AUSLÖSER: Wer an Schema, Policies, Migrationen, dem Geheimnis-Speicher,
  an Backup/Restore oder am Deploy-Weg arbeitet — wo es um die Datenbank geht, ZUSAMMEN mit
  docs/db-regeln.md und docs/db-stand.md. Keiner Phase zugehörig, wird NICHT archiviert.
  SEIT DEM 2026-08-25 FÜHREN ZWEI BEFUND-DATEIEN BUCHSTABEN: Ein Verweis der Form "Teil (a)"
  ist ab da mehrdeutig und nennt DATEI, ABSCHNITT und Buchstaben.

## Detail-Archiv (bei Bedarf lesen — NICHT automatisch geladen)
Abgeschlossene Phasen-Historie + Vollbegründungen, ausgelagert, damit CLAUDE.md unter dem
Ladelimit bleibt. Reine Pfad-Verweise, KEIN @-Import — der Grundsatz gilt DIESEM Abschnitt,
das Archiv soll gerade NICHT geladen werden. Der EINE @-Import des Repos steht unter
"## Immer beachten" und ist ABSICHT.
- docs/claude-history/phase-2-3-foundation.md — Phase 2 (Click & Connect) + Phase 3
  (Persistenz/Auth, stabile ps-IDs, Multi-Projekt, DB-Härtung 0003).
- docs/claude-history/phase-4-mapping-codegen-export.md — Mapping-/Action-Zuweisung +
  Weg-C-Netz + Code-Gen-Engine + HTML-Export.
- docs/claude-history/phase-4.5-editor-politur.md — Datei-Upload/Drag-Drop + Zen-Modus +
  A11y-Politur.
- docs/claude-history/phase-5-copywriting.md — In-Place Copywriting (Text-Mapping,
  PS_SET_TEXT, direkt-in-DOM-Export, revert-Lektion).
- docs/claude-history/phase-6-capi.md — Server-Side Tracking / Meta-CAPI (Secret-Storage,
  Dedup-Beacon, Debug-Lektionen).
- docs/claude-history/phase-7-hosting.md — Hosting/Go-Live inkl. XFH-Gate-Vollbeweis und der
  7c-2-Familie. AUFSCHLAGEN BEI DOMAIN-/DNS-SUPPORT-FRAGEN: dort stehen
  Registrierungs-Rate-Limit (5/Stunde/User), Support-Playbooks für CAA-Records und Metas
  Traffic-Permissions-Allow-List, die Vercel-Fehler-Mappings (409 domain_already_in_use) und
  das Verification-vs-Configuration-Statusmodell.
- docs/claude-history/phase-8-analytics.md — gesamte Phase 8 (Analytics-Persistenz,
  CAPI-Härtung, Kill-Switch im Ingest, tracking_key-Spalte, PageView-Emitter, Read-Pfad,
  Adblocker-Verlustrate). Der aktive Ist-Stand steht in docs/db-stand.md.
- docs/claude-history/phase-9-ab-testing.md — gesamte Phase 9 (A/B-Testing) plus die zwei
  mitgereisten Scheiben safeAction und Leere-Variante-Riegel.
- docs/claude-history/phase-10-workspace.md — gesamte Phase 10 (Workspace-Reorganisation),
  mit den verworfenen Alternativen und den Invarianten. Die 17 dauerhaften Regeln daraus
  stehen in docs/immer-beachten.md und werden dort NICHT wiederholt.
- docs/claude-history/phase-11-multi-tracking.md — gesamte Phase 11 (Fan-Out), kuratiert.
  DIES IST DIE FASSUNG, DIE GELESEN WIRD.
- docs/claude-history/phase-11-multi-tracking-aktiver-stand.md — der STEUERNDE Stand
  derselben Phase, archiviert: zwölf Scheiben-Protokolle, bindende Entscheidungen, Vorrat,
  Protokoll der Hebung.
- docs/claude-history/phase-11-multi-tracking-rohfassung.md — die ROHFASSUNG derselben
  Phase, ungekürzt. AUFSCHLAGEN, WENN MAN IN DER KURIERTEN FASSUNG ETWAS VERMISST: zweimal
  ging bei der Kuration genau die tragende Aussage verloren (LinkedIn-Befund (g)/(h); der
  Einspruch gegen "additive Fan-Out-Ziele"). Wird NICHT gepflegt; ihre Zeiger sind tot.
- docs/claude-history/phase-11.1-linkedin.md — gesamte Phase 11.1 (LinkedIn als VIERTES
  Ziel). HIER NACHSEHEN, WER AN EINEM WEITEREN ZIEL ARBEITET: "## Entscheidungen, die über
  ihre Scheibe hinaus binden" trägt NEUN nicht gehobene Stück — u. a. die Form der
  Kennungs-Ablage, die IPv6-Annahme, die Klartext-IP als Kennung.
- docs/claude-history/phase-11.8-autorisierungsschicht.md — gesamte Phase 11.8
  (Autorisierungsschicht). HIER NACHSEHEN, WER AN EINEM OAUTH-FLUSS, AM GEHEIMNIS-SPEICHER
  ODER AN DER CHIFFRIERUNG ARBEITET. Die Phase ist am 2026-09-08 VOLLSTÄNDIG GEHOBEN; ihre
  Dauerregeln stehen in docs/immer-beachten.md, das Protokoll im Kopf der Datei. Sie hiess
  bis zum 2026-09-08 docs/aktiver-stand-11.8.md.
- docs/claude-history/phase-11.2-google.md — das ARCHIV der Phase 11.2 (elf Scheiben,
  sechzehn bindende Entscheidungen, zwei Hebungs-Kandidaten). IHR KOPF TRÄGT DEN
  ABSCHLUSS-BLOCK mit dem Protokoll der Hebung und dem COMMIT-HASH, unter dem die zwei am
  2026-09-08 gelöschten Dateien (docs/aktiver-stand.md, docs/aktiver-stand-vorrat.md)
  vollständig nachzulesen sind. WIRD NICHT AM STÜCK GELESEN; die Register sind mit der
  Steuerdatei gelöscht. WARNUNG: Der Titel "Vollzogen — was hier stand und wohin es gegangen
  ist" steht ZWEIMAL zeichengleich — wer darauf ankert, trifft das falsche Vorkommen.
- docs/claude-history/phase-11.3-testmodus.md — gesamte Phase 11.3 (Tracking-Testmodus).
  HIER NACHSEHEN, WER AM TESTMODUS ODER AN EINEM WEITEREN ZIEL ARBEITET: sechzehn nicht
  gehobene Entscheidungen plus die Gestalt-Entscheidung (A) stehen NUR hier — Ablage, Riegel
  an mindestens einem Ziel, Urteil über die Frist, die Abschlüsse ohne Code für linkedin und
  google.
- docs/claude-history/phase-11.5-einwilligung.md — gesamte Phase 11.5 (Einwilligungs-Dialog,
  sieben Scheiben, 25 bindende Entscheidungen). HIER NACHSEHEN, WER AM EINWILLIGUNGS-DIALOG,
  AM WIDERRUF ODER AN DER DARSTELLUNG AUF FREMDEN SEITEN ARBEITET: 21 nicht gehobene
  Entscheidungen stehen NUR hier — Ablage des Schalters im Einstellungs-Blob, localStorage,
  Reihenfolge Gate/Wiederherstellung/Oberfläche/Widerruf/Setzer, Vorrang eines fremden CMP,
  Gruppierung "Messung"/"Werbung", Widerruf als Betreiber-Funktion; dazu die Invarianten der
  Scheiben 11.5d-2/11.5e-1/11.5e-2 und die fünf Gestalt-Entscheidungen (A)–(E).
- docs/claude-history/phase-11.12-vorschau-blocker.md — gesamte Phase 11.12
  (Vorschau-Blocker, eine Scheibe). HIER NACHSEHEN, WER AM VORSCHAU-RAHMEN, AM RIEGEL ODER AN
  DER TRENNUNG ZWISCHEN VORSCHAU UND AUSLIEFERUNG ARBEITET. Die zwei bindenden Entscheidungen
  sind AUSDRÜCKLICH NICHT GEHOBEN — sie stehen hier UND am Ort der Handlung (Kopfkommentar
  src/lib/preview-storage-shim.ts, Wächter T1 in src/components/CodeImporter.test.tsx). Aus
  dieser Phase steht deshalb KEINE Dauerregel in docs/immer-beachten.md.
- docs/claude-history/phase-11.13-dialog-anpassung.md — gesamte Phase 11.13
  (Betreiber-Anpassung des Dialogs, fünf Scheiben, 37 bindende Entscheidungen). HIER
  NACHSEHEN, WER AM EINWILLIGUNGS-DIALOG, AN SEINER DARSTELLUNG ODER AN EINEM BETREIBER-WERT
  IM AUSGELIEFERTEN TEXT ARBEITET: 33 nicht gehobene Entscheidungen stehen NUR hier — flache
  Ablage der sechs Felder unter settings.consent, die Eigenschafts-Liste (jede Farbregel auf
  EINE Eigenschaft), die Ableitung von color-scheme ohne Schwellen-Konstante, die HÜLLE aus
  Darstellung/Sachtext/Sprache, und die verworfenen Gestalten. Sie tragen einen
  SAMMELVERMERK, keine 33 Einzelzeiger. VIER Entscheidungen sind Dauerregeln geworden
  (P11.13-3, -17, -25, -36), ebenso beide Hebungs-Kandidaten.
- docs/claude-history/phase-11.6-custom-pixel.md — gesamte Phase 11.6 (Custom-Pixel, eine
  Scheibe). HIER NACHSEHEN, WER AM CUSTOM-PIXEL, AM LADER ODER AM BETREIBER-CODE IM
  AUSGELIEFERTEN TEXT ARBEITET: ALLE SECHS Entscheidungen stehen NUR hier, KEINE ist als
  Dauerregel gehoben — Entscheidung der VORFRAGE für Lesart (a) und Verweisung von (b) an
  Phase 13, EIN Snippet-Feld je PROJEKT (Ereigniszeilen je VARIANTE), der eigene
  Einwilligungs-Schlüssel `custom` (er gelangt NIE ins cns-Feld), das Urteil des Laders erst
  bei `DOMContentLoaded`, die Ausführung innerhalb des eigenen Klick-Codes. ZWEI Destillate
  stehen in docs/immer-beachten.md.
- docs/claude-history/phase-11.11-import-bereinigung.md — gesamte Phase 11.11
  (Import-Bereinigung, fünf Scheiben, 32 bindende Entscheidungen). DIE BUCHSTABEN TRAGEN
  KEINE REIHENFOLGE — 11.11d ist vor 11.11b gebaut worden. HIER NACHSEHEN, WER AN DER
  ERKENNUNG, AM ENTFERNEN ODER AN DER FUNDLISTE ARBEITET: 30 nicht gehobene Entscheidungen
  stehen NUR hier — die fünf Klassen (eigen · Pixel · CMP · Container · unbekannt), die drei
  belegten Parkformen und die drei Adress-Orte, EIGEN VOR FREMD mit derselben Knotenauswahl
  wie das Entfernen, das EINE Urteil ohne Parser für die eigenen Bausteine, die Regel, dass
  ein Inline-Script nur mit einer LADE-Adresse im Rumpf entfernbar ist, die vier
  Freigabe-Blöcke je Plan. ZWEI Entscheidungen sind als datierte ERGÄNZUNG an bestehende
  Dauerregeln gegangen (P11.11-9, P11.11-24).
- docs/claude-history/phase-11.7-anbieter-befunde.md — gesamte Phase 11.7 (Anbieter-Befunde
  nachziehen, zehn Scheiben S1 bis S10, 34 Vermerke). HIER NACHSEHEN, WER AN EINEM WEITEREN
  ZIEL, AN EINER KLICK-KENNUNG, AN EINEM MATCH-FELD ODER AN DER ERFOLGSZEILE ARBEITET: 45
  Einträge sind NICHT gehoben und bleiben hier, unter einem SAMMELVERMERK im Abschnitt
  "Vollzogen"; einige stehen zugleich an ihrem Ort, etwa (E2) bis (E4) im Posten zur
  Datenklassen-Grenze. Darunter die Zuschnitte S1 bis S9 samt `CLICK_ID_TABLE` und ihren
  Grenzen (D1 bis D10), die Paar-Riegel bei tiktok und pinterest (P11.7-6, -7), E-c (welche
  Match-Felder bewusst NICHT zum fünften Punkt gehören, je mit Grund) und die Crawl-Fragen F1
  bis F8. ZWEI Dauerregeln sind daraus entstanden (die Erfolgszeile, die
  MSYS-Pfadumwandlung), dazu eine Ergänzung an "COMMIT-KONVENTIONEN". Ihr Kopf trägt das
  Protokoll der Hebung samt Gegenprobe und den Messwert nach Abschnitt 2b.
- docs/claude-history/security-manifest-full.md — volle Tier-0/1/2-Begründung (RISIKO /
  TRAGENDE KONTROLLE / EHRLICHE EINORDNUNG / BINDET-AN je Item). AUSLÖSER: Manifest-Arbeit;
  immer im SELBEN Commit wie die Tier-Übersicht hier.
- docs/claude-history/future-roadmap.md — nicht-gebaute Vision: Funnel-Architektur,
  Owned-Traffic-Module, Smart-Tracking, Advanced Features. ACHTUNG: Der Satz "echtes Risiko"
  im Abschnitt "Tracking-Testmodus für Kunden" ist für meta WIDERLEGT und wird dort NICHT
  korrigiert (s. docs/immer-beachten.md).
- docs/claude-history/backlog-polish.md — aufgeschobene Aufräumarbeiten. AUSLÖSER: Wer eine
  Aufräumarbeit plant, eine Phase abschliesst oder einen Vorrats-Punkt sucht.
  DIESE ZEILE SAGT, WAS EXISTIERT, NICHT WAS OFFEN IST — der Status je Eintrag ist NICHT
  erhoben und bei rund der Hälfte am Material jener Datei nicht entscheidbar; wer wissen
  will, ob ein Punkt noch aussteht, prüft es dort, wo sein Status geführt wird.
  FORTSCHREIBUNGSREGEL: neue Einträge ans DATEIENDE, unter eine EIGENE datierte Überschrift
  — sonst rutscht ein Eintrag unter eine fremde Herkunft. Die Abschnitte tragen die
  Ursprungs-Nummern ihrer Phase; ab Phase 11.12 mit dem Präfix `P<Phase>-n`, davor ohne, und
  das wird NICHT nachgezogen. HIER STEHT KEINE STÜCKZAHL UND KEINE ABSCHNITTSZAHL: Beide
  altern durch jede Ergänzung. Die datierte Messung vom 2026-08-21 (123 Einträge, 163 KB,
  sieben Abschnitte) und die Chronik der Nachzüge stehen in docs/claude-md-herleitung.md.
- supabase/checks/ — versionierte Messproben für Live-Tests und Gegenproben. KEINE Probe
  fasst ECHTE Daten an; welche Bauformen das zulässt und was eine Datei dann in ihrem Kopf
  sagen muss, steht im README des Ordners. KEIN Migrationsverzeichnis, wird nie automatisch
  angewandt. VOR jeder handgetippten Prüf-Query dort nachsehen (dort steht auch, welche
  Fallen eine Probe hat — z. B. der custom_host-Filter bei der Domain-Divergenz).
