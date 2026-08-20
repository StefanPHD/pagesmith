IB-GELADEN

# IMMER BEACHTEN — die dauerhaften Regeln des Projekts

**WAS DIESE DATEI IST UND WOHER SIE STAMMT:** Der vollständige Abschnitt
"## Immer beachten" aus CLAUDE.md, am 2026-08-14 hierher übernommen —
ZEICHENGLEICH. Kein Wort umformuliert, keine Regel gekürzt, keine umsortiert,
kein Kommentar ergänzt; die Reihenfolge ist die des Ursprungs. Belegt per
Prüfsumme über den übernommenen Abschnitt:
sha256 = a63e7cb3273c6d6f92cd78f9fa97d1ecc75d7089d8fce59b91da06c9e3df1a03
(80 Regeln, 1 012 Zeilen, 81 013 Bytes; erhoben vor dem Eingriff).
GRUND DES UMZUGS, gemessen am 2026-08-14: CLAUDE.md stand bei 149 970 von
150 000 Bytes — 30 Bytes unter dem Ladelimit. Die nächste Hebung hätte nicht
mehr hineingepasst, und eine nicht gehobene Regel wird nicht mehr gelesen.
WER HIER ETWAS ÄNDERT, ÄNDERT EINE REGEL, DIE JEDE SESSION GELESEN WIRD — das
ist kein Redaktionsvorgang.

**DIESE DATEI WIRD IMMER GELADEN — UNBEDINGT, WIE CLAUDE.md SELBST.** Sie ist
kein Nachschlagewerk und kein Anhang. Ohne sie arbeitet eine Sitzung ohne rund
achtzig Regeln, und zwar ohne es zu merken.
DIE ABGRENZUNG, DIE SONST SPÄTER JEMAND "HARMONISIERT" — es sind ZWEI
verschiedene Klassen, und wer sie zusammenzieht, macht aus einer unbedingten
Pflicht eine bedingte:
- AUSLÖSER-GELADEN: docs/db-stand.md und docs/db-regeln.md (Auslöser: eine
  Migration, ein Eingriff in Schema, Policies, RPCs oder den
  Analytics-Lesepfad) · docs/claude-history/security-manifest-full.md
  (Auslöser: Manifest-Arbeit) · die Phasen-Historien (Auslöser: das WARUM einer
  Regel). Sie werden aufgeschlagen, wenn ihr Fall eintritt.
- UNBEDINGT GELADEN: CLAUDE.md und DIESE Datei. Kein Auslöser, keine Ausnahme.
  Der Unterschied ist nicht die Wichtigkeit, sondern der Zeitpunkt: Eine
  auslöser-geladene Datei fehlt nur dort, wo jemand den Auslöser übersehen hat;
  diese hier fehlte überall.

**DIE GRENZE — WAS HIER NICHT STEHT:** Diese Datei trägt REGELN. Der GEMESSENE
ZUSTAND steht in docs/db-stand.md und wird ausschliesslich aus einer Messung
fortgeschrieben. Das WARUM abgeschlossener Phasen steht in
docs/claude-history/. Wer hier einen Messwert sucht, sucht am falschen Ort —
und wer hier einen einträgt, macht aus einer Regel eine Zustandsbeschreibung,
die still veraltet.

## Verzeichnis — 86 Regeln in Dateireihenfolge

Jeder Eintrag ist der WÖRTLICHE Anfang seiner Regel, auf feste Breite
geschnitten und mit "..." gekappt — KEINE Beschreibung. GRUND: Eine
Beschreibung wäre eine zweite Wahrheit, die neben der Regel altert und
irgendwann etwas anderes sagt als sie; ein wörtliches Zitat lässt sich per
Suche gegen die Regel prüfen und kann nicht auseinanderlaufen.
FORTSCHREIBUNG: Eine neue Regel wird HINTEN angefügt — in der Datei wie im
Verzeichnis, je eine Zeile. Nichts wird umsortiert, nichts neu nummeriert, und
niemand muss die Datei dafür neu ordnen. Es gibt bewusst keine Nummern: Eine
Nummer am Verzeichnis-Eintrag müsste an der Regel wiederholt werden, und das
wäre die zweite Wahrheit, die dieses Verzeichnis gerade vermeidet.

- DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER "IST DIESES PROJEKT ...
- APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI (gehoben aus der abgeschafften
- AUDIT-LOG-DISZIPLIN: GENAU EIN Eintrag pro Mutations-AUFRUF, auch bei ...
- TEST-DISZIPLIN: DISKRIMINIEREND STATT BREIT GEMOCKT (gehoben aus der ...
- MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE — NEUN LEKTIONEN (Phase 9, ...
- EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, UND KEINE DAVON ...
- COMMIT-KONVENTIONEN: Conventional-Commit-Format type(scope): message ...
- TESTDATEN UND TEST-SEQUENZ MÜSSEN DEN PRODUKTIVEN PFAD TREFFEN (Phase 9, ...
- CLIENT-SEITIGE SERVER-ACTION-AUFRUFE: KEIN WURF BLEIBT UNBEHANDELT — ...
- DIFF-VORLAGE = GEZIELTE VERIFIKATION, NICHT VOLLTEXT-PFLICHT ...
- WAS NUR IM GESPRÄCH GESAGT WIRD, EXISTIERT FÜR DIE NÄCHSTE SITZUNG NICHT: ...
- EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN: ...
- EINE REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN — DER BRUCH ZEIGT SICH ...
- EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD — UND DAS ...
- EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE ...
- EIN GRÜNER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRÜNHEIT DERSELBE ...
- EINE ZÄHLUNG ENTLANG EINER ACHSE IST BEI EINEM UMBAU SYSTEMATISCH ZU ...
- EINE BEDINGUNG, DIE EINE ARBEIT AN EINE ANDERE HÄNGT, MUSS BENENNEN, WAS ...
- WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE: Eine
- EINE ANLEITUNG, DIE EINE VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ...
- EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS: Vor dem ...
- EINE BILLIGE MESSUNG WIRD NICHT DURCH EINE HERLEITUNG ERSETZT: Eine ...
- Erst der nutzbare Kern, dann Infrastruktur.
- Importierter User-Code läuft NUR im sandboxed iframe ...
- HISTORIE-CHECK VOR EINGRIFF IN KERN-DATEIEN (Regressions-Schutz, gilt bei ...
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits ...
- GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT (gemessen ...
- HOST-ONLY-COOKIES AUF GETEILTEN WILDCARD-DOMAINS (Phase 9): Auf einer
- SET-COOKIE UND EINE ALS ÖFFENTLICH/CACHEBAR MARKIERTE ANTWORT VERTRAGEN
- EIN SERVERSEITIG GELESENER COOKIE-WERT BLEIBT CLIENT-KONTROLLIERTE
- INGEST-204-CONTAINMENT (Sicherheitsregel, nicht bloß Defensive): /api/e ...
- TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL: der source-Wert in events ...
- KILL-SWITCH ALS EXPLIZITER, FAIL-CLOSED ZWEIG, nicht als ...
- isForwardable = NEGATIV-AUSSCHLUSS EINES RESERVIERTEN TOKENS, NIE ...
- BESTÄTIGUNGEN/CONFIRMS NIE AN META FORWARDEN (Phase 8, auf dem ...
- BEACON-keepalive PFLICHT (Conversion-/PageView-nahe Beacons): ...
- DRITTANBIETER-SCRIPT-LADEPRÜFUNG am load/error-Event des SCRIPT-ELEMENTS, ...
- WORTWAHL DASHBOARD "NUR server-seitig erfasst", NIEMALS "gerettet" (Phase ...
- DARSTELLUNGS-EHRLICHKEIT BEI VERGLEICHSZAHLEN OHNE SIGNIFIKANZRECHNUNG
- SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB (Phase 8, ...
- KEIN SERVER-SEITIGES HTML-PARSING — server-seitige ...
- CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR (real aufgetreten, ...
- KLICK-WIRING vs. Maustasten (Lektion, Phase-4-Bugfix): 'click' deckt NUR ...
- "USE SERVER"-DATEIEN (Lektion, Phase-7c-2c-Bug): Next.js erlaubt in ...
- POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL (Lektion, 7c-2-Bug): JEDE ...
- OB EINE MIGRATION IN DER LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT
- ANLEGEN UND BEFÜLLEN EINER ADDITIVEN SPALTE NICHT VERSCHMELZEN (Phase 9):
- ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN ...
- NEXT_PUBLIC_-REDEPLOY-PFLICHT (Ops-Regel, real aufgetreten): ...
- DAS ETIKETT IM NEXT-BUILD-OUTPUT BENENNT DIE KONVENTION, NICHT DIE ...
- DIE NEXT-KONVENTIONSDATEI IST src/proxy.ts UND LÄUFT IN DER NODE-RUNTIME ...
- HOST-QUELLE FÜR APP-vs-SERVING-BRANCHING (Sicherheit): x-forwarded-host ...
- Vor neuer Phase: kurz bestätigen, dass die vorige demobar lief.
- Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung ...
- Session-unabhängige Mutationen (MCP-Vorbereitung, kostenlos ab jetzt): ...
- ABLEITEN STATT HARDCODEN (Werte mit einer Quelle): Was aus ...
- ABLEITEN STATT LÖSCHEN (projekt-spezifischer View-State): Jeder ...
- DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER (Phase 10, ...
- EIN WIEDERKEHRENDER AUFRUF GEGEN EINEN EXTERNEN DIENST HÄNGT AN DER ...
- EINE KOMPONENTE MIT EIGENEM ZUSTAND DARF NICHT HINTER EINEM UMSCHALTER ...
- KEIN ZEIT- ODER LOCALE-ABHÄNGIGER WERT IN EINEM TEILBAUM, DER BEIM ERSTEN ...
- VERSTECKEN PER CSS-KLASSE — WEDER DAS HTML-ATTRIBUT hidden NOCH ...
- WER EIN ELEMENT AUS DEM DOKUMENTFLUSS NIMMT (fixed/absolute), PRÜFT, OB ...
- ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
- DIE TESTUMGEBUNG WERTET KEIN CSS AUS (gemessen, dauerhafte Eigenschaft des
- SERVER-ACTIONS SIND IM NETZWERK-TAB NICHT AN IHREM NAMEN ERKENNBAR ...
- EIN SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN (Phase 10,
- AUFRÄUMEN AM ANFANG EINER SITZUNG, NICHT AN IHREM ENDE (Phase 10): Soll ...
- WELCHE REGEL WANN GREIFT: BEKOMMT DIESER FEHLER EIN BLEIBENDES SIGNAL? ...
- WAS DIE HÜLLE VOM INHALT TRENNT, GEHÖRT DER HÜLLE — NICHT DEM INHALT ...
- NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST ...
- BEIM EXTRAHIEREN EINER ANSICHT WANDERT EINE ABLEITUNG NUR MIT, WENN SIE
- WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR (Phase 10, ...
- NAHT-HYGIENE (7c-2, aktiv): 7c-2 koppelt Domain-/Routing-Logik NICHT an ...
- SCHWÄRZUNG — VIER TEILE, DIE NUR ZUSAMMEN TRAGEN (Phase 11): (a) EINE ...
- EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER VERMEHRT ...
- MENGEN — ZWEI REGELN, DIE ZUSAMMENGEHÖREN (Phase 11): (a) EINE ...
- BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE ...
- MEHRERE KENNUNGEN JE ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT — ...
- WER EINE STREICHUNG PLANT, ZÄHLT NICHT NUR DIE IMPORTE, SONDERN AUCH DIE ...
- EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS ...
- EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY (Phase 11.1, als ...
- EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT, SONST IST DER NACHWEIS ...
- JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG ...
- ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN, NICHT SEITENWEISE ...
- EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ...

## Immer beachten
- DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER "IST DIESES PROJEKT LIVE?"
  (Phase 9, live gefundener Fehler 2026-07-27): settings.hosting.label ist ein
  SPIEGEL, keine Quelle. Grund: settings ist CLIENT-besessen (saveProject
  ersetzt es GANZHEITLICH), die Auslieferung hängt aber allein an der
  domains-Zeile (resolve.ts matcht sie). Wer den Publish-Status aus settings
  ABLEITET, baut zwei ungekoppelte Wahrheiten — real passiert: das UI zeigte
  "veröffentlicht ✓" mit klickbarer URL, während die Zeile fehlte und die Seite
  dauerhaft 404te. publishProject liest das Label deshalb aus der Zeile
  (project_id + custom_host IS NULL, ORDER BY created_at) und stellt sie bei
  Bedarf mit DEM ALTEN Label wieder her — abgeleitet, nicht erfunden, damit die
  URL stabil bleibt. Gehört einem FREMDEN Projekt dieses Label (23505 auf dem
  PK), wird fail-closed abgebrochen: NIE stillschweigend eine neue Adresse
  vergeben, laufende Ads zeigten sonst weiter auf die tote alte.
  MESSFALLE bei jeder Divergenz-Prüfung: ein JOIN auf domains OHNE
  "and custom_host is null" zieht auch Custom-Host-Zeilen mit und meldet
  Projekte mit Custom-Domain fälschlich als divergent (real passiert). Die
  Label-Zeile ist die mit custom_host IS NULL.
  Volle Herleitung: docs/claude-history/phase-7-hosting.md.
- APPEND-ONLY-TABELLEN BLEIBEN POLICY-FREI (gehoben aus der abgeschafften
  Reviewer-Checkliste): project_tokens UND audit_logs tragen bewusst KEINE
  SELECT/UPDATE/DELETE-Policy — Zugriff ausschliesslich ueber service_role. Eine neue
  Policy auf einer dieser Tabellen ist KEINE Kleinigkeit, sondern bricht eine tragende
  Garantie: bei project_tokens das write-only-Gate auf den CAPI-Token (s. "GRANTS
  SCHUETZEN NICHTS"), bei audit_logs die Unveraenderlichkeit UND das Rate-Limit, das
  seine Zaehlgrundlage aus genau diesem Log zieht (lib/domains/audit.ts). Wer dort eine
  Policy ergaenzt, macht das Audit faelschbar und das Limit umgehbar.
  DIESE AUFZAEHLUNG IST NICHT DIE VOLLSTAENDIGE LISTE DER POLICY-FREIEN TABELLEN: Policy-
  Freiheit kommt im System aus ZWEI verschiedenen Gruenden vor — append-only (diese Regel)
  UND ausschliesslicher service_role-Zugriff bei service-seitig geschriebenen Tabellen
  (project_secrets, events). Wer die Liste oben als vollstaendig liest, haelt eine
  policy-freie Tabelle ausserhalb davon fuer einen Fehler und "repariert" sie.
- AUDIT-LOG-DISZIPLIN: GENAU EIN Eintrag pro Mutations-AUFRUF, auch bei frueher
  Ablehnung — geschrieben aus einem finally, damit kein Ausgang ihn verliert (Muster:
  register.ts / remove.ts). Nie Doppel-Feuern (verfaelscht das Rate-Limit), nie
  Verschlucken (der Vorgang wird unsichtbar). writeAuditLog wirft bewusst nicht weiter:
  ein Log-Fehler darf den eigentlichen Mutations-Ausgang nicht kippen.
- TEST-DISZIPLIN: DISKRIMINIEREND STATT BREIT GEMOCKT (gehoben aus der abgeschafften
  Reviewer-Checkliste): Jeder Test muss bei einer echten Regression WIRKLICH rot werden —
  im Zweifel per Mutationsprobe belegen, nicht annehmen. ZU BREITES MOCKEN ist die
  haeufigste Ursache hohler Tests: wer die Funktion wegmockt, die den Bug traegt, prueft
  nur noch den Mock (real aufgetreten: im Dispatch-Test MUSS die echte extractLabel
  laufen, sonst faengt er den 7c-2a-Rueckfall nicht). Verwandt und schaerfer:
  "TESTDATEN UND TEST-SEQUENZ MUESSEN DEN PRODUKTIVEN PFAD TREFFEN" unten.
- MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE — NEUN LEKTIONEN (Phase 9, mehrfach
  live aufgetreten; (e) und (f) aus Phase 10, (g) bis (i) aus Phase 11): Ergänzt TEST-DISZIPLIN oben um
  konkrete Fallstricke, die erst eine scharfe Mutationsprobe bzw. ein genau
  gelesener Live-Test sichtbar macht.
  (a) DREIWERTIGE LOGIK MACHT EINE TS-PORTIERUNG BLIND: Hängt eine
      Entscheidung an SQL-NULL-Semantik (ein Vergleich gegen NULL verwirft
      die Zeile), verhält sich eine reine TypeScript-Nachbildung anders — ein
      Vergleich gegen null liefert dort schlicht wahr oder falsch, die Zeile
      bleibt bestehen, wo SQL sie aussortiert hätte. Eine solche Mutation
      lässt sich über einen Unit-Test auf der Portierung NICHT fangen; der
      Beweis muss über einen Wächter auf dem echten SQL-Text plus den
      Live-Test laufen.
  (b) EINE MUTATION, DIE GRÜN BLEIBT, HAT ZWEI MÖGLICHE URSACHEN, DIE NICHT
      VERWECHSELT WERDEN DÜRFEN: entweder prüft der Test schlicht nichts
      Relevantes — oder die Mutation selbst ist ein SCHLECHTES MODELL des
      Fehlers, den sie erzeugen sollte (Fall (a) ist ein Beispiel dafür).
      Beides verlangt Anhalten und Nachdenken, nicht dieselbe Reparatur. Bei
      einem hohlen Wächter (ein zu weit gefasster Text-Ausschnitt trifft eine
      andere Stelle als die gemeinte) wird die WURZEL behoben — der
      Ausschnitt selbst —, nicht die Assertion enger geschrieben.
      DRITTE URSACHE, ergaenzt 2026-08-13: DIE MUTIERTE STELLE IST DURCH EINE
      KOMPOSITION VERDECKT. Wer eine Mutation ansagt, liest zuerst, was ZWISCHEN
      der mutierten Funktion und dem Pruefling liegt — sonst misst die Probe
      nichts. BELEG: hasPixelId ohne Trim blieb an jedem Aufrufer unsichtbar, weil
      getPixelId vorher trimmt; die Ansage "diese Tests muessen fallen" stand
      zweimal im Auftrag und war beide Male unerfuellbar.
  (c) EIN GROBES LIVE-TEST-INSTRUMENT (Offline schalten, eine Sperre setzen,
      einen Netzabbruch simulieren) REISST OFT DIE VORAUSSETZUNG DESSEN MIT,
      WAS ES EIGENTLICH PRÜFEN SOLL: ein anderer Kanal meldet sich zuerst,
      und der eigentlich gemeinte Prüfschritt gilt fälschlich als bestanden,
      obwohl er nie erreicht wurde. Bei jedem Live-Test-Schritt fragen:
      welche Voraussetzung reisst das gewählte Instrument mit, und prüft der
      Schritt wirklich nur die eine Achse, die er zu prüfen behauptet?
  (d) EIN WÄCHTER, DER ÜBERWIEGEND ABWESENHEIT PRÜFT (kein security definer,
      kein Tabellen-DDL, kein neuer Index), BRAUCHT EINE EIGENE
      POSITIVKONTROLLE: ohne sie sind ein echter Nicht-Treffer und ein
      kaputt gewordener Wächter am Ergebnis nicht zu unterscheiden — gerade
      bei sicherheitsrelevanten Klauseln ist ein stiller Durchlass teuer.
  (e) EIN BESTANDSTEST SCHÜTZT NUR DIE ZUSTÄNDE, DIE SEINE FIXTURE HERSTELLT.
      Eine neue Bedingung erzeugt NEUE Zustände, und darin sind die alten Tests
      blind — auch wenn sie genau die Stelle adressieren, die man ändert. Ein
      neues Element wird deshalb IN DEM ZUSTAND geprüft, DEN ES HERSTELLT, nicht
      nur im Ruhezustand. BELEG (Phase 10): Die Annahme, ein Signaltext IM
      Reiter-Button breche die fünf verankerten Reiter-Abfragen, war falsch —
      in deren Fixtures leuchtet das Signal nie, der zugängliche Name bleibt
      unverändert. Der Fehlgriff wäre im gesamten Bestand unsichtbar geblieben.
  (f) WIRD EINE FEHLERKLASSE VON GENAU EINEM TEST GEFANGEN, GEHÖRT DAS IN SEINEN
      KOMMENTAR. Sonst entfernt ihn jemand später als vermeintlich redundant und
      nimmt damit die einzige Abdeckung mit. Nach jeder Mutationsrunde zählen,
      welcher Test gefallen ist — bleibt es bei EINEM, ist der Test ein
      Einzelstück und wird als solches benannt. BELEG (Phase 10, zweimal): der
      Struktur-Test der Reiter trägt allein zwei Fehlerklassen; der Wächter für
      den zugänglichen Namen der Reiter ist der einzige Test, der das Signal
      überhaupt zum Leuchten bringt.
  (g) TRIFFT EINE MUTATION MEHR ALS VORHERGESAGT, IST VOR JEDER REPARATUR ZU PRÜFEN,
      OB DIE ZUSATZTREFFER DIESELBE FEHLERKLASSE MELDEN. Tun sie es nicht, ist der
      Überschuss KEINE Abdeckung, sondern eine KASKADE — und wer ihn als Abdeckung
      verbucht, schreibt sich eine Sicherheit auf, die es nicht gibt. BELEG: Eine
      Mutation traf fünf statt drei Tests; die drei erwarteten meldeten "Found
      multiple elements", die zwei zusätzlichen "Unable to find an element". Zwei
      Fehlerklassen haben keine gemeinsame Ursache. Die Gegenprobe entscheidet es:
      derselbe Block ISOLIERT unter derselben Mutation — grün. Ursache war ein
      unverbrauchter Once-Wert aus einem früher abgebrochenen Test (clearAllMocks
      leert die AUFRUFE, nicht die Warteschlange), also Folgeschaden statt Deckung.
  (h) EINE MUTATION, DIE ZWEI ACHSEN GLEICHZEITIG BEWEGT, IST KEINE MUTATION, SONDERN
      EIN UMBAU. Ihr Ergebnis sagt nicht, WELCHE Achse gedeckt ist. Aufgelöst wird das
      durch TEILEN und eine Vorab-Ansage je Teilprobe, nicht durch Nachbessern am
      Code. BELEG: Eine Serialisierung des Fan-Outs änderte Gleichzeitigkeit UND
      Containment in einem Schritt; drei Tests fielen, und welcher zu welcher Achse
      gehörte, war am Ergebnis nicht zu sehen.
  (i) EINE VORHERSAGE, DIE IHRE EIGENE UNSCHÄRFE BENENNT, IST AUCH DANN BRAUCHBAR,
      WENN SIE DANEBENLIEGT — entscheidend ist, ob die Abweichung INNERHALB der vorab
      benannten Klasse liegt. Der Preis der Unschärfe ist eine Zeile ("ich nenne die
      Klasse, nicht die Zahl"); der Preis der falschen Bestimmtheit ist, dass niemand
      unterscheiden kann, ob ein Überlauf ein Zufall oder ein Befund war.
  Herleitung mit den konkreten Fundstellen: docs/claude-history/phase-9-ab-testing.md
  bzw. docs/claude-history/phase-10-workspace.md.
- EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL, UND KEINE DAVON MACHT SIE ROT
  (Ergänzung zu Lektion (d) darüber, die den vierten Fall führt — einen Wächter ohne
  Positivkontrolle):
  (1) IHR GEGENSTAND WIRD ENTFERNT. Nimmt ein Umbau die Sache weg, deren Abwesenheit
      behauptet wird, geht die Behauptung ab da IMMER auf. Der Wächter meldet weiter
      Erfolg und schützt nichts. BELEG: Ein Test behauptete, ein Pfad greife nicht auf
      eine Alt-Tabelle zu — nach der Umstellung kannte der Pfad diese Tabelle gar nicht
      mehr. FOLGE: Bei jedem Umbau, der eine Quelle oder ein Ziel AUSTAUSCHT, werden die
      Abwesenheits-Behauptungen eigens durchgegangen; sie sind die einzige Testart, die
      durch das Verschwinden ihres Gegenstands STÄRKER aussieht statt schwächer.
  (2) SIE IST TRIVIAL WAHR. "Nichts passiert" gilt auch dann, wenn die geprüfte Wirkung
      aus einem ganz anderen Grund gar nicht eintreten KANN — etwa weil eine
      Vorbedingung tiefer im Pfad vorher zurückkehrt. Der Test ist grün, bevor es die
      geprüfte Sache überhaupt gibt.
  (3) "BLOCKIERT" UND "ABGESTÜRZT" SEHEN AN IHR IDENTISCH AUS. Ein Test, der nur prüft,
      dass etwas NICHT passiert, unterscheidet ein wirksames Gate nicht von einem
      abgebrochenen Handler. Es braucht zusätzlich einen Test, der prüft, dass der
      Handler ZU ENDE läuft.
  DAZU GEHÖRT EINE VIERTE, DIE KEIN TEST-, SONDERN EIN KOMMENTAR-FEHLER IST: EIN
  TESTKOMMENTAR KANN EINE GARANTIE BEHAUPTEN, DIE SEIN TEST NICHT DECKT. Der Test ist
  dann nicht falsch — seine SELBSTBESCHREIBUNG ist zu weit, und sie lädt dazu ein, eine
  Achse für gedeckt zu halten und keinen Test dafür zu schreiben. BELEG: Ein Kommentar
  behauptete "beide Aufrufe stehen, bevor einer antwortet"; bei serieller Abarbeitung
  blieb der Test grün, weil das erste Bein sofort antwortet. Wird das entdeckt, wird
  BEIDES getan — den Kommentar berichtigen UND den fehlenden Test ergänzen.
  UND EINE WEITERE WEISE, ergänzt 2026-08-13: DIE FIXTURE TRÄGT DEN GEGENSTAND
  GAR NICHT. Enthält sie nichts, was durchsickern könnte, ist die Behauptung
  trivial wahr — anders als bei (2), wo eine Vorbedingung TIEFER IM PFAD greift.
  BELEG: keine Meta-Fixture liess die Anbieter-Antwort das Zugangsdatum
  zurückspiegeln; die "kein Token im Log"-Zusicherungen konnten den Echo-Fall
  nicht fangen.
- COMMIT-KONVENTIONEN: Conventional-Commit-Format type(scope): message (feat, fix, docs,
  chore, refactor). docs(claude)-Commits bleiben GETRENNT von feat/fix-Commits — der
  Verlauf wird gelesen, und eine Doku-Aenderung im Feature-Commit ist spaeter nicht mehr
  auffindbar. Vor JEDEM Push git status/git diff auf versehentliche Secrets/.env-Inhalte
  pruefen. Taucht eine Migration im Diff auf, gilt zusaetzlich die
  Migration-VOR-Code-Deploy-Reihenfolge (eigene Regel: docs/db-regeln.md, "MIGRATION IMMER
  VOR CODE-DEPLOY").
- TESTDATEN UND TEST-SEQUENZ MÜSSEN DEN PRODUKTIVEN PFAD TREFFEN (Phase 9, zwei live
  gefundene Fehlschläge): (1) DATENLAGE: der 9a-Umschalt-Test gab A und B bewusst
  UNTERSCHIEDLICHES HTML, um die Ableitungskette maximal sichtbar zu machen — und sparte
  damit ausgerechnet den Normalfall aus, den das Produkt selbst erzeugt (createVariantB
  kopiert byte-genau; eine reine Text-Änderung lässt den Code unangetastet). Der Bug lebte
  exakt dort. (2) SEQUENZ (die schärfere Ebene): der erste Fix-Versuch bekam einen Test, der
  die divergenten Zustände als PROPS beim Mount seedete — die Divergenz existierte damit
  schon beim ersten Umschalten, und der Test lief durch den funktionierenden Pfad. Der echte
  Ablauf erzeugt sie erst DANACH (umschalten -> editieren -> speichern -> zurückschalten).
  Der Fix wäre grün gewesen und hätte den Bug INTERMITTENT gemacht — die unangenehmste
  Bug-Klasse. REGEL: Bei jedem Test gegen einen Zustandswechsel zuerst fragen, welche
  Datenlage der produktive Pfad erzeugt UND durch welche SCHRITTFOLGE sie entsteht — maximal
  unterscheidbare Fixtures und vorgeseedete Endzustände sind bequem und verfehlen die reale
  Konstellation systematisch. Herleitung: docs/claude-history/phase-9-ab-testing.md,
  Abschnitt zur Scheibe 9a (NACHTRAG-Block zum live gefundenen Bug).
- CLIENT-SEITIGE SERVER-ACTION-AUFRUFE: KEIN WURF BLEIBT UNBEHANDELT — safeAction IST
  PFLICHT, WO UI-ZUSTAND DARAN HÄNGT (Fix-Scheibe 2026-07-27, Bestand gemessen 2026-07-28).
  GRUND (ohne ihn wird die Regel als überflüssig wegoptimiert): result.ok unterscheidet nur
  {ok:true} von {ok:false} — beides sind RÜCKGABEWERTE. Ein Netzwerk- oder Serverfehler
  liefert eine EXCEPTION: sie verlässt den Handler, jede Zeile ab der if-Prüfung entfällt,
  der Busy-State wird nie zurückgesetzt. Ergebnis: keine Meldung UND der Button blockiert
  den ZWEITEN Versuch. Der einzige Ausweg wäre ein Reload — und genau der vernichtet die
  Arbeit.
  UNTERGRENZE (gilt ausnahmslos): Kein client-seitiger Server-Action-Aufruf lässt einen Wurf
  unbehandelt. Nie.
  PFLICHT-FALL: Hängt am Aufruf ein UI-ZUSTAND — ein Busy-/Lade-Flag, das freigegeben werden
  muss, oder ein Fehlerkanal, der gefüllt werden muss —, läuft er über safeAction(run,
  onThrow) aus src/lib/safe-action.ts. Ein handgeschriebenes .catch() genügt dort NICHT: ihm
  fehlt der unstable_rethrow-Riegel, und eine Action mit Weiterleitung würde still
  verschluckt. Den Ersatzwert stellt der AUFRUFER, weil die Domain-Actions zusätzlich ein
  reason-Feld verlangen; TypeScript prüft ihn gegen den echten Rückgabetyp — ein vergessener
  Ersatzwert bricht den BUILD statt die Laufzeit.
  ERLAUBTER MINIMALFALL: Hängt KEIN UI-Zustand daran und ist der Leer-Wert bereits das
  richtige Verhalten (reine Lade-Effekte wie getEventCounts, getAdblockLoss,
  getVariantBPublished), genügt .catch() auf den Leer-Wert ([] bzw. null). safeAction ist
  dort EBENFALLS ZULÄSSIG — stärkeres Werkzeug als nötig, kein Verstoß. Die Erlaubnis gilt
  NUR in diese Richtung.
  DIE ACHSE IST NICHT "LESEN VS. SCHREIBEN" UND NICHT "HANDLER VS. EFFEKT" (beides am
  Bestand widerlegt, deshalb ausdrücklich benannt): Der LESER listProjectDomains läuft über
  den Wrapper, weil ein Fehlerkanal daran hängt — in DomainManager.tsx sowohl aus dem
  Handler-Kontext (loadList nach Hinzufügen/Entfernen) als auch aus einem LADE-EFFEKT beim
  Projektwechsel, der bewusst "Laden fehlgeschlagen" anzeigt, weil "leer" und "kaputt" nicht
  gleich aussehen dürfen. Nicht wer den Aufruf auslöst entscheidet, sondern ob ein Zustand
  zurückzusetzen oder eine Meldung zu zeigen ist.
  DREI NEBENBEDINGUNGEN, ohne die der Wrapper Schaden anrichtet:
  (i)   PRIMÄRERFOLG WIRD IMMER ZUERST QUITTIERT, dann der Folge-Refresh. Wirft listProjects
        nach einem erfolgreichen Save, darf das den Erfolg nicht in einen Fehler umkehren —
        "Fehler trotz Erfolg" ist schlimmer als vorher.
  (ii)  KONTROLLFLUSS-WÜRFE WERDEN DURCHGELASSEN (unstable_rethrow aus next/navigation).
        redirect()/notFound() sind Signale, kein Fehler.
  (iii) DER WRAPPER LOGGT NICHTS. Er ist generisch und weiß nie, was im Closure liegt — am
        CAPI-Pfad ist es der Klartext-Token. Das reale Risiko ist nicht das Argument (er
        sieht nur einen Thunk), sondern ein weitergereichtes Error-OBJEKT, das den Token
        bereits trägt. Logging am Aufrufer AUSSCHLIESSLICH über errorName(err) aus
        src/lib/errors.ts.
  MELDUNGSTEXTE behaupten WEDER URSACHE NOCH ERGEBNIS: "keine Verbindung" wäre eine Ursache,
  die wir nicht kennen; "wurde nicht ausgeführt" ein Ergebnis, das wir nicht kennen (bricht
  die Verbindung auf dem RÜCKWEG, ist der Write passiert). Die Entwarnung "deine Änderungen
  sind noch da" gilt NUR auf Speicherpfaden — beim Löschen wäre sie eine falsche Beruhigung.
  Herleitung + Live-Nachweis: docs/claude-history/phase-9-ab-testing.md, Abschnitt
  "Fix-Scheibe safeAction".
- DIFF-VORLAGE = GEZIELTE VERIFIKATION, NICHT VOLLTEXT-PFLICHT (Review-Kalibrierung, 2026-07-23):
  Nach jedem Bau wird die Vorlage für das Review dreistufig geliefert — Grundsatz: nichts wird
  stillschweigend durchgewunken, aber nicht alles muss im Wortlaut fließen (Volltext-Diffs fressen
  das Chat-Kontingent und erzwingen Umzüge).
  (1) IMMER IM VOLLTEXT: jedes Migrations-SQL Zeile für Zeile (EINE Klausel entscheidet über
      Tenant-Isolation — security definer, fehlendes set search_path, zu weite using-Klausel;
      Selbstauskunft wie "ist INVOKER" reicht NIE); jeder HUNK, an dem eine benannte Invariante
      hängt (der Hunk, nicht die Datei); neue sicherheitsnahe Logik (Ingest-Kontrollfluss, RLS, Auth).
  (2) ALS NACHWEIS: git status --short / git diff --stat als Scope-Beweis (welche Dateien — und
      explizit welche NICHT, z.B. "ingest.ts/meta.ts/generate.ts nicht dabei"); git diff -w für
      Byte-Identität bei reinen Umschließungen; gezielter Grep ("Datei X nicht im Diff", "Wort Y
      kommt nicht vor"); Testausgabe + Mutationsproben-Ergebnis.
  (3) AUF BERICHT: rein additive Tests und UI-Trivialitäten — unter der PFLICHT, jede Abweichung
      vom freigegebenen Plan unaufgefordert zu deklarieren.
  Der Reviewer benennt im GO ausdrücklich, was er NICHT im Wortlaut gelesen hat. Der Hebel liegt im
  PLAN-Review (Stufe 1 wird immer vollständig gelesen — der Scheibe-B-Stichtags-Fehler stand im
  Plan, nicht im Diff); das Diff-Review verifiziert danach nur noch Gebautes == Freigegebenes.
  Lange Vorlagen als Text direkt in die Antwort, als EIN Block — NICHT stückeln: wer stückelt,
  entscheidet selbst über die Schnittkanten, und ein verlorener Teil fällt niemandem auf. Der
  Bericht beginnt mit einer UMFANGS-ANSAGE ("deckt Aufträge X-Y ab"), damit ein fehlender
  Abschnitt beim LESEN auffällt statt beim Nachzählen. Nie als Datei-Anhang (kommt leer an).
  EIN VERWEIS AUF DEN EIGENEN, NOCH NICHT FERTIGEN BERICHT ("steht oben", "s. Abschnitt X")
  IST EINE BEHAUPTUNG ÜBER EIN ARTEFAKT, DAS ES NOCH NICHT GIBT — die einzige
  Behauptungsklasse, die strukturell ungeprüft bleibt. Die Umfangs-Ansage wird deshalb
  gegen den FERTIGEN Text geprüft, nicht gegen den Auftrag. BELEG: ein Bericht verwies auf
  einen Volltext-Diff, der im Antworttext nie stand.
- WAS NUR IM GESPRÄCH GESAGT WIRD, EXISTIERT FÜR DIE NÄCHSTE SITZUNG NICHT: Jede
  Entscheidung, jede gemessene Angabe und jede Zusage, die künftige Arbeit BINDET, wird
  noch in derselben Runde in eine Datei geschrieben — nicht in eine Antwort, nicht in
  den Verlauf. BELEG: dreimal in EINER Phase; zweimal fiel es erst auf, als ein
  Zuschnitt darauf bauen wollte und ins Leere griff, beim dritten Mal betraf es diese
  Regel selbst, die bis zu ihrer Aufnahme nirgends stand. ABGRENZUNG zur
  Protokollpflicht am Rundenende: die greift, WENN eine Runde endet — diese greift,
  SOBALD etwas entschieden ist. Wer auf das Rundenende wartet, hat den Kontextwechsel
  schon verloren.
- EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN: Unerwartetes ROT ist
  genauso ein Befund wie unerwartetes Grün — es fällt nur seltener auf, weil Rot nach
  Erfolg aussieht. Beide Abweichungen werden VOR jeder Reparatur untersucht, nicht
  weggebucht. BELEG: sechsmal in einer Phase, davon FÜNFMAL in dieselbe Richtung (zu
  eng gezählt). Dass die Streuung einseitig ist, ist die eigentliche Aussage — Zufall
  träfe mal nach oben, mal nach unten; eine systematische Ursache trifft immer dieselbe
  Seite. Was bei einem Überschuss zu prüfen ist, steht als Lektion (g) an
  "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE".
- EINE REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN — DER BRUCH ZEIGT SICH AN IHRER
  BEGRÜNDUNG, NICHT AN IHREM WORTLAUT: Wer prüfen will, ob eine Regel den NÄCHSTEN Fall
  noch trägt, liest ihre Begründung, nicht ihren Text. BELEG: "abwesendes Feld heisst
  erlaubt", begründet mit "die Seite ist älter als das Feld". Bei EINEM Ziel deckten
  sich Regel und Grund vollständig; beim zweiten heisst "abwesend" für das eine "alte
  Seite" und für das andere "über dieses Ziel wurde nie gefragt" — und ein Ja daraus
  wäre ein Forward ohne Einwilligung gewesen. Am WORTLAUT war bis zuletzt nichts zu
  sehen; er war korrekt formuliert.
- EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD — UND DAS FÄLLT
  NIEMANDEM AUF, WEIL DIE REGEL WEITER STIMMT: Ein Beleg ist eine TATSACHENBEHAUPTUNG
  ÜBER DEN CODE und altert mit ihm; die Regel darüber altert nicht mit. Wer eine Regel
  als Maßstab benutzt, prüft ihren Beleg am HEUTIGEN Code, bevor er ihm folgt. Ist er
  überholt, wird er RICHTIGGESTELLT und nicht gestempelt — ein Maßstab mit falschen
  Angaben taugt nicht als Maßstab, auch wenn sein Satz stimmt. BELEG: Die Figur ist
  VIERMAL angewandt worden ("RICHTIGGESTELLT, NICHT GESTEMPELT"), ohne je
  als Regel formuliert zu sein — DREIMAL in dieser Datei, das vierte Mal in CLAUDE.md,
  "## Code-Qualität, Performance & SaaS-Skalierung". (Die Aufteilung ist am 2026-08-14
  nachgezogen worden, als dieser Abschnitt aus CLAUDE.md ausgelagert wurde; die Zahl
  VIER ist unverändert.) Eine Regel, die viermal gebraucht wurde, ohne zu
  existieren, ist reif. ABGRENZUNG zur Regel darüber: dort trägt die BEGRÜNDUNG nicht
  mehr, hier ist die TATSACHENANGABE veraltet — die Regel bleibt in beiden Fällen wahr.
- EINE VORBEDINGUNG, DIE AUCH DER ALTE ZUSTAND ERFÜLLT, IST KEINE VORBEDINGUNG: Sie
  trennt VORHER nicht von NACHHER, und ein Test darauf ist grün AUS DEM FALSCHEN GRUND.
  BELEG: Ein Wächter verlangte "beide Karten stehen auf nicht konfiguriert" — das war
  schon durch den stehengebliebenen Wert des VORIGEN Projekts erfüllt. Der Test war
  grün, weil eine Wettlaufsituation ihn rettete, nicht weil der Riegel hielt. AUFGELÖST
  DURCH EINE VERANKERUNG, NICHT DURCH EINE SCHÄRFERE ASSERTION: Der Zustand bekam ein
  Merkmal, das NUR er haben kann. ABGRENZUNG zu Lektion (c) an "MUTATIONSPROBEN": jene
  spricht vom INSTRUMENT, das die Voraussetzung mitreisst — diese vom ANKER, der die
  beiden Zustände nicht unterscheidet. Ein Instrument kann tadellos sein und der Anker
  trotzdem untauglich.
- EIN GRÜNER TEST IST KEIN BELEG, DASS DER GRUND SEINER GRÜNHEIT DERSELBE GEBLIEBEN
  IST: Wer einen Zustand von einem Ort an einen anderen verlegt, prüft die Tests, die
  ihn BETREFFEN — nicht nur die, die dabei brechen. BELEG: Eine Zusage ("der Fehler ist
  nach dem erneuten Öffnen weg") hielt vorher, weil ein Reset-Aufruf ihn leerte, und
  hält nachher, weil die haltende Komponente ABGEBAUT wird. Zusage gleich, Mechanismus
  anders, Test durchgehend grün — niemand hätte es gemerkt, weil ein roter Test zum
  Hinsehen zwingt und ein grüner nicht. ABGRENZUNG zu "NUR EIN TEST IST EIN WÄCHTER":
  dort geht es um einen Schutz OHNE Test, hier um einen Test, der seinen Gegenstand
  unbemerkt gewechselt hat.
- EINE ZÄHLUNG ENTLANG EINER ACHSE IST BEI EINEM UMBAU SYSTEMATISCH ZU NIEDRIG, NICHT
  ZUFÄLLIG: Vor jeder Umfangs-Zahl werden die Achsen einzeln benannt, an denen eine
  Änderung brechen kann — und die Zahl gilt je Achse, nicht insgesamt. BELEG: Dieselbe
  Änderung brach Bestandstests auf DREI Achsen (Beschriftung, Quelle des Zustands,
  Synchronität), und die Achsen überlagerten sich zeilenweise. Die erste Zählung sah nur
  die erste, die zweite fand die zweite, und die dritte war aus dem Code überhaupt nicht
  ablesbar — sie fand erst eine Probe. Wer EINE Achse zählt, zählt zu niedrig, und zwar
  immer nach unten.
- EINE BEDINGUNG, DIE EINE ARBEIT AN EINE ANDERE HÄNGT, MUSS BENENNEN, WAS DER
  GEGENSTAND BRAUCHT — NICHT, WAS ZUR SELBEN ZEIT GERADE SONST NOCH AUSSTEHT: Sonst gilt
  sie als erfüllt, sobald das Zufällige erledigt ist, und die Arbeit sieht baubar aus,
  ohne es zu sein. BELEG: Ein Vorhaben war an "es braucht die Adapter, die es hier nicht
  gibt" gebunden. Beide Adapter entstanden — und es war KEINEN Schritt näher, weil ihm
  in Wahrheit ein Lesepfad, ein Rückkanal und eine Maskierung fehlten. Die Bedingung war
  formuliert worden, als GAR KEIN Adapter existierte; sie beschrieb, was zufällig auch
  fehlte.
- WER EINE HÄLFTE EINER AUSSAGE KORRIGIERT, MACHT DIE ANDERE ZUR FALLE: Eine
  Teilkorrektur an einem Satz, der zwei zusammengehörige Angaben trägt, ist gefährlicher
  als gar keine — danach stimmt die eine Hälfte, und genau deshalb liest niemand die
  andere nach. Vor jeder punktuellen Korrektur wird der GANZE Satz gelesen. BELEG:
  Angeordnet war, in einem Kommentar nur eine Nummer nachzuziehen; danach war die Nummer
  richtig und die BEDINGUNG davor falsch, und der Satz sah korrigiert aus.
- EINE ANLEITUNG, DIE EINE VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE ENTWARNUNG:
  Wer eine Prüfanleitung schreibt, nennt die Zustände, die vorliegen MÜSSEN, damit der
  Schritt überhaupt etwas messen kann — der Ausführende kann nicht wissen, dass eine
  fehlt, und meldet dann "geprüft, in Ordnung" für einen Schritt, der nie stattgefunden
  hat. ABGRENZUNG zu Lektion (c) an "MUTATIONSPROBEN": dort reisst das INSTRUMENT die
  Voraussetzung mit — hier nennt die ANLEITUNG sie nicht, und das Instrument ist in
  Ordnung. Zwei verschiedene Achsen, dieselbe falsche Entwarnung als Ergebnis.
- EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS: Vor dem Schritt wird
  geprüft, ob im ausgelieferten Artefakt etwas steht, das die geprüfte Wirkung SCHON VOR
  der geprüften Stelle abfängt. Fehlt der vorausgesetzte Zustand, misst der Schritt
  einen Fehlschlag, der keiner ist — und die Suche beginnt am falschen Ende. Ein solcher
  Schritt gehört als PFLICHT-STOPP in die Anleitung, nicht als Hinweis: was er
  abfängt, ist korrektes Verhalten und darf nicht als Befund protokolliert werden.
  BELEG: Ein ausgelieferter Consent-Schlüssel entsteht zur ERZEUGUNGSZEIT; wer nach dem
  Eintragen einer Kennung nicht neu veröffentlicht, misst ein fail-closed-Verhalten und
  schreibt es dem Adapter zu.
- EINE BILLIGE MESSUNG WIRD NICHT DURCH EINE HERLEITUNG ERSETZT: Eine schlüssige
  Ableitung aus dem Code oder dem Diff sagt nichts über die deployte Laufzeit. Ist die
  Messung billig, wird gemessen — und wo nicht gemessen wurde, steht das dabei.
  ABGRENZUNG zur Provenienz-Disziplin, die in CLAUDE.md schon gelebt wird: jene
  verlangt, die HERKUNFT einer Angabe zu nennen; diese verlangt, die Messung nicht
  wegzulassen, nur weil eine Herleitung überzeugend klingt. Eine korrekt als
  "hergeleitet" gekennzeichnete Angabe ist ehrlich und trotzdem die schlechtere.
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
  Verweis auf die Archiv-Landkarte: die Zuordnung Thema -> History-Datei steht in
  CLAUDE.md, "## Detail-Archiv".
- PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b): bereits in freier
  Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL fest eingebacken
  und beaconen weiter dorthin. Neue Exporte/gehostete Seiten nutzen /api/e (geteilter
  Handler, lib/capi/ingest.ts). Entfernen der capi-Route bricht STILL das Tracking aller
  schon ausgelieferten Kundenseiten (kein Fehler, nur verschwundene Conversions).
- GRANTS SCHÜTZEN NICHTS — RLS IST DIE EINZIGE TRAGENDE SCHICHT (gemessen 2026-07-24): anon,
  authenticated UND service_role haben per Supabase-Default volle DML-Rechte auf ALLE public-
  Tabellen, auch auf project_tokens. Das "heiligste Gate" (CAPI-Token write-only, auch für den
  Owner) hält ALLEIN dadurch, dass project_tokens RLS aktiv hat und KEINE SELECT-Policy trägt. Eine
  neue Tabelle ohne "enable row level security" ist damit SOFORT für anon offen — und der anon-Key
  steckt im Client-Bundle jeder Seite. Das Sicherheitsnetz dagegen ist der Event-Trigger ensure_rls,
  der beim Rebuild aus den Migrationen NICHT entsteht (s. CLAUDE.md, "## Offene Punkte"). Bei JEDER neuen
  Tabelle: RLS explizit aktivieren und Policies bewusst setzen, NIE auf den Trigger verlassen.
  ERGÄNZT 2026-08-05 — DAS SCHÄRFERE BEISPIEL, ohne dass am Obenstehenden etwas zurückgenommen
  wird: project_secrets (0021, die Geheimnis-Tabelle der Phase 11) trägt RLS aktiv und KEINE
  EINZIGE Policy. Der Unterschied zu project_tokens ist genau der Punkt: project_tokens trägt
  ZWEI Policies (insert/update), project_secrets trägt KEINE — sie ist damit das REINSTE
  Beispiel dieser Regel im System. Für anon und authenticated ist sie vollständig
  verschlossen, obwohl beide per Grant volle DML-Rechte auf ihr haben; die einzige
  Schreib-Autorisierung liegt im Ownership-Gate der Server-Actions. Wer dort eine Policy
  ergänzt, gewinnt keinen Schutz, sondern nur dessen Anschein.
- HOST-ONLY-COOKIES AUF GETEILTEN WILDCARD-DOMAINS (Phase 9): Auf einer
  Serving-Domain, die als Wildcard mehrere Kundenprojekte gleichzeitig
  trägt, bekommt JEDES Cookie NIE ein explizites Domain-Attribut. Ein
  gesetztes Domain-Attribut (z.B. auf der geteilten Registrable Domain) gilt
  für ALLE Subdomains der Wildcard gemeinsam — ein Besucher, der bei Projekt
  X einen Wert erhält, trüge ihn stillschweigend zu Projekt Y mit. Auf einer
  Wildcard ist das der NORMALFALL, nicht ein Rand-Sonderfall, weil jedes
  Kundenprojekt dieselbe Registrable Domain teilt. Host-only (kein
  Domain-Attribut) bindet jedes Cookie an genau den Host, auf dem es gesetzt
  wurde, und verhindert diese stille Cross-Tenant-Kopplung der Messung.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- SET-COOKIE UND EINE ALS ÖFFENTLICH/CACHEBAR MARKIERTE ANTWORT VERTRAGEN
  SICH NICHT (Phase 9): Setzt eine Antwort ein besucherunterscheidendes
  Cookie, während sie gleichzeitig als public/cachebar ausgewiesen ist,
  entsteht die klassische Konstellation, in der ein geteilter Zwischen-Cache
  (CDN, Proxy) Antwort UND Cookie gemeinsam speichert und JEDEM
  nachfolgenden Besucher denselben gespeicherten Wert ausliefert — ein
  einzelner Erst-Besucher entscheidet dann stellvertretend für viele. Jede
  Antwort, die ein solches Cookie TATSÄCHLICH setzt, braucht private,
  no-store — und zwar NUR in dem Zweig, der wirklich setzt, damit Antworten
  ohne Cookie-Setzung ihr bisheriges Cache-Verhalten unverändert behalten.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- EIN SERVERSEITIG GELESENER COOKIE-WERT BLEIBT CLIENT-KONTROLLIERTE
  EINGABE (Phase 9): HttpOnly verhindert nur den Zugriff durch JavaScript im
  Browser — es verhindert NICHT, dass ein Aufrufer selbst einen beliebigen
  Cookie-Header setzt. Jeder serverseitig gelesene Cookie-Wert braucht
  deshalb Validierung VOR jeder Verwendung, genau wie jede andere
  Nutzereingabe. Das gilt VERSCHÄRFT vor einem Schreibpfad in
  Hintergrundcode (z.B. in after()), wo ein Bruch an einem
  DB-CHECK-Constraint NICHT als Fehler sichtbar wird, sondern die
  betroffene Zeile lautlos verschluckt — ein ungeprüfter Wert erzeugt dort
  einen stillen Datenverlust statt einer lauten Ablehnung.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- INGEST-204-CONTAINMENT (Sicherheitsregel, nicht bloß Defensive): /api/e bzw. handleIngest
  antwortet dem Client IMMER mit einer LEEREN 204 — nie ein Body, nie ein 500 — in JEDEM
  Pfad, auch bei Timeout/Abort/Body-Read-Fehler. GRUND (ohne ihn wird die Regel als
  "unnötig defensiv" wegoptimiert): ein 500 oder ein Body würde den Gültigkeitszustand des
  trackingKeys LEAKEN; 204-für-alles macht die Key-Existenz für einen anonymen Aufrufer
  unbeobachtbar (Enumeration-Schutz). Jede neue Fehlerbehandlung im Forward-/Ingest-Pfad
  MUSS innerhalb dieses Containments bleiben — auch das Fehler-Gerüst selbst (Timeout-
  Scaffolding, Body-Reads) darf nie nach außen werfen. AUSNAHME AUF ANDERER ACHSE (kein
  Widerspruch zum "IMMER 204"): ein strukturell kaputter Beacon (fehlende Pflichtfelder
  {trackingKey,eventID,event}) wird bewusst mit 400 VOR jedem DB-Zugriff abgewiesen — das
  ist ein CLIENT-Fehler, kein Zustands-Leak. Das 204-Containment schützt vor dem
  Key-Existenz-Leak bei GÜLTIGER Struktur; der 400-Guard ist die andere Achse. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- TRACKING-source = BEOBACHTUNGS-ORT, NIE ZIEL: der source-Wert in events beschreibt, WO ein
  Event beobachtet wurde (server vs. browser), NICHT an welches Werbe-Netzwerk es ging.
  'server' heißt server-beobachtet — egal ob der Forward zu Meta/CAPI oder später zu
  GA4/TikTok läuft. Ein späteres Tracking-ZIEL bekommt eine EIGENE additive Spalte; source
  NIE zum Ziel-Sammelfeld umdeuten, sonst bricht der browser-vs-server-Verlustraten-Join.
  Die Werte sind PERMANENT (sie werden nie nachträglich transformiert) -> sie müssen ab
  Zeile 1 stimmen. MARKER-HYGIENE (Phase 8): der Client sendet NIE einen freien
  source-String, sondern nur einen ENG BEGRENZTEN Marker; den source-Wert (server/browser)
  setzt der SERVER — sonst könnte der Client die Analytics beliebig färben.
- KILL-SWITCH ALS EXPLIZITER, FAIL-CLOSED ZWEIG, nicht als Kopplungs-Nebeneffekt (Phase 8):
  Im Ingest wird ein gesperrtes Projekt (blocked) in einem EIGENEN sichtbaren Zweig VOR
  Persist UND Forward mit leerer 204 abgewiesen. Früher griff der Schutz nur als Nebeneffekt
  davon, dass der Persist im if(capiConfig)-Zweig hing — wer diese Kopplung löst
  (Meta-unabhängiger Traffic ab PageView), OHNE den expliziten blocked-Zweig, macht den
  Kill-Switch STILL fail-open. Bei jedem Umbau des Ingest-Kontrollflusses den expliziten Zweig
  erhalten. Herleitung: docs/claude-history/phase-8-analytics.md.
- isForwardable = NEGATIV-AUSSCHLUSS EINES RESERVIERTEN TOKENS, NIE Allowlist (Phase 8):
  TrackConfig.event ist ein FREIER Nutzer-String (jeder Custom-Event-Name via trackCustom ist
  erlaubt) -> eine Positiv-Allowlist der Forward-fähigen Events schnitte Custom-Conversions
  STILL vom CAPI-Forward ab. isForwardable schließt darum AUSSCHLIESSLICH den namespaced Token
  '__ps_pageview' aus (analytics-only, gehört nicht zu Meta), den nur unser eigener Emitter
  erzeugt. Ein zu breiter Ausschluss bricht STILL bestehende Conversions. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- BESTÄTIGUNGEN/CONFIRMS NIE AN META FORWARDEN (Phase 8, auf dem CAPI-Pfad): Das
  Adblock-Bestätigungs-Beacon (source='browser') trägt DIESELBE eventID wie die echte
  Conversion — würde es geforwardet, entstünde ein Duplikat bei Meta. Der Confirm-Pfad
  persistiert und returnt über einen FRÜHEN return, ohne je in den Forward-Block zu laufen
  (eigener Ausgang, kein Term in einem Guard). Bei Änderungen am Ingest-Forward mit Gegenprobe
  testen. Herleitung: docs/claude-history/phase-8-analytics.md.
- BEACON-keepalive PFLICHT (Conversion-/PageView-nahe Beacons): navigator.sendBeacon bzw.
  fetch({keepalive:true}) — solche Beacons gehen oft mit Form-Submit/Redirect/Seitenwechsel
  einher; ohne keepalive bricht der Browser den Request im Teardown ab und das Event bzw. die
  Bestätigung geht STILL verloren (fälschlich als Verlust gezählt). Detail:
  docs/claude-history/phase-8-analytics.md.
- DRITTANBIETER-SCRIPT-LADEPRÜFUNG am load/error-Event des SCRIPT-ELEMENTS, NIE am globalen
  Stub (Phase 8): Tracking-Snippets (Meta/GA4/TikTok) legen SYNCHRON ein globales Objekt +
  Queue + "loaded"-Flag an, BEVOR das echte Script nachlädt. Blockt ein Adblocker das Script,
  bleibt der Stub stehen -> `if (window.<lib>)` ist IMMER wahr -> eine Ladeprüfung darüber
  misst NICHTS ("grün aber falsch"). Verlässlich ist nur load/error am injizierten
  Script-Element. Volle Herleitung (fbevents, Fremd-Pixel, Surrogat-Blocker):
  docs/claude-history/phase-8-analytics.md.
- WORTWAHL DASHBOARD "NUR server-seitig erfasst", NIEMALS "gerettet" (Phase 8,
  Produkt-Ehrlichkeit): events protokolliert, was der SERVER BEOBACHTET hat — NICHT ob der
  CAPI-Forward bei Meta ankam (der 'Bad signature'-Bug hat gezeigt, dass Forwards still
  scheitern, während die Zeilen sauber weiterlaufen). "Gerettet" behauptet Empfang und lügt,
  wenn CAPI kaputt ist. Analytics-Zahlen als "mindestens X%" ausweisen (sie können in BEIDE
  Richtungen irren). Herleitung: docs/claude-history/phase-8-analytics.md.
- DARSTELLUNGS-EHRLICHKEIT BEI VERGLEICHSZAHLEN OHNE SIGNIFIKANZRECHNUNG
  (Phase 9): Werden zwei oder mehr Werte nebeneinander gezeigt, für die KEINE
  Signifikanz gerechnet wird, stehen ABSOLUTWERTE PRIMÄR und eine
  Rate/Prozentzahl höchstens SEKUNDÄR daneben — eine Prozentzahl allein
  verdeckt die Bezugsgrösse und wirkt bei einer kleinen wie bei einer grossen
  Stichprobe gleich überzeugend, obwohl die Aussagekraft radikal
  unterschiedlich ist. KEINE Sieger-Auszeichnung, KEINE Ampelfarben und keine
  Formulierung, die einer Option einen Vorsprung zuschreibt, wo keine
  Signifikanz vorliegt: das erzeugt Vertrauen, das die Zahlen nicht decken,
  und die Zielgruppe trifft mit genau solchen Zahlen echte
  Budget-Entscheidungen. Ebenso KEINE verdeckte Anzeige-Schwelle ("erst ab N
  Fällen anzeigen") als Ersatz für eine echte Signifikanzrechnung — das wäre
  ein verstecktes statistisches Urteil mit einer willkürlichen Konstante,
  ohne die Rechnung offenzulegen, die man damit eigentlich vermeiden wollte.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB (Phase 8, live widerlegt):
  projects.settings ist CLIENT-autoritativ — saveProject ersetzt es GANZHEITLICH. Eine
  server-vergebene Identität (z.B. der trackingKey), dort abgelegt, wird beim nächsten
  saveProject wortlos auf NULL zurückgekippt. Server-autoritative Werte gehören in eine EIGENE
  Spalte (projects.tracking_key), nicht in einen client-replaced Blob. Herleitung:
  docs/claude-history/phase-8-analytics.md.
- KEIN SERVER-SEITIGES HTML-PARSING — server-seitige HTML-Injektion/Transformation ist eine
  REINE STRING-OP (Phase 7/8): Der Server injiziert z.B. den PageView-Emitter beim Publish per
  String-Suche (letztes </body>, case-insensitiv), NICHT über einen Parser. Cheerio ist
  bewusst NIE eingeführt worden (keine Dependency); die Client-Transformation läuft über
  DOMParser (Detection/Generate). Herleitung: docs/claude-history/phase-8-analytics.md.
- CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR (real aufgetreten, 2026-07-20): Ein
  CAPI-Zugriffstoken ist an eine bestimmte Meta-Dataset/Pixel-ID gebunden. Wird die ID
  gewechselt, MUSS ein zur neuen ID passendes Token neu generiert und gesetzt werden — das
  alte Token wird gegen die neue ID nicht mehr korrekt signiert. Symptom eines Mismatch:
  der Server-Forward scheitert mit code=190 / OAuthException / "Bad signature", WÄHREND die
  Browser-Pixel-Events unbeeinträchtigt weiterlaufen (der Browser-Pixel braucht kein Token).
  Das ist ein STILLER Fehlzustand: nichts schlägt sichtbar Alarm, weil Browser-Events
  durchkommen. VERIFIKATION daher IMMER über "Empfangen von: Server" im Events Manager
  (idealerweise als dedupliziertes Server-Event unter geteilter eventID), NIE über die bloße
  Anwesenheit von Browser-Events. Das describeMetaError-Ops-Logging im Forward-Fehlerpfad
  (src/lib/capi/meta-forward.ts) macht solche Ablehnungen sofort lesbar
  (code/subcode/type/fbtrace/msg): Fremdtext aus der Anbieter-Antwort wird nach FORM
  geschwärzt — zusammenhängende token-artige Folgen ab zwanzig Zeichen — und danach
  gekappt; der Trace-Bezeichner ist die eigens benannte AUSNAHME und bleibt vollständig
  lesbar, weil er das einzige ist, womit man den Anbieter-Support ansprechen kann.
  Hinweis: Das Token liegt in der DB (setCapiToken-Flow), nicht in einer
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
  Ebenso verboten: "export * from" in einer "use server"-Datei — der Stern kann einen Typ
  unbemerkt als Wert mitexportieren und erzeugt denselben Fehler, nur ohne sichtbare
  Fundstelle.
- POSTGREST-QUERIES + ECHTE PRIMÄRSCHLÜSSEL (Lektion, 7c-2-Bug): JEDE Supabase/PostgREST-
  Query IMMER { data, error } destrukturieren, NIE nur { data } — sonst wird ein Fehler
  still verschluckt und die UI zeigt eine leere Liste statt einer Fehlermeldung. Und: vor
  der Nutzung eines Feldnamens den ECHTEN Primärschlüssel der Zieltabelle in der Migration
  nachsehen, nie aus dem Feldnamen "id" annehmen — der PK der domains-Tabelle ist label,
  NICHT id. Beides zusammen erzeugte den Bug: eine nicht-existente Spalte -> PostgREST-42703
  -> verschluckt -> still leere Liste.
- OB EINE MIGRATION IN DER LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT
  ENTSCHEIDBAR: Eine Datei in supabase/migrations/ beweist, dass sie
  GESCHRIEBEN wurde — nicht, dass sie gelaufen ist. Es gibt keinen
  Migrations-Runner und soll keinen geben (s. "MIGRATION IMMER VOR
  CODE-DEPLOY"), also macht kein Automatismus aus einer Datei einen Vollzug.
  FOLGE: Eine Aussage über den angewandten Stand wird NIE aus dem Verzeichnis
  fortgeschrieben, sondern ausschliesslich aus einer Messung im SQL-Editor
  oder aus einem Live-Test — und der Beleg dafür gehört dazu. Wer aus der
  Anwesenheit einer Datei auf den Zustand der Datenbank schliesst, plant gegen
  ein Schema, das es so nicht geben muss. Der gemessene Ist-Stand steht in
  docs/db-stand.md (NICHT automatisch geladen).
- ANLEGEN UND BEFÜLLEN EINER ADDITIVEN SPALTE NICHT VERSCHMELZEN (Phase 9):
  Eine neue additive Spalte wird in einer Scheibe ANGELEGT (Migration plus
  CHECK, falls nötig) und in einer separaten, FOLGENDEN Scheibe tatsächlich
  BEFÜLLT — nicht beides in einem Schritt verschmolzen. GRUND: die
  Schreiblogik lässt sich isoliert bauen und testen, bevor sie den
  heissesten Pfad der Anwendung berührt, und ein Backfill sofort beim
  Anlegen wäre ein GERATENER Wert in einer Spalte, die zu diesem Zeitpunkt
  noch niemand liest und deren korrekter historischer Wert oft gar nicht
  mehr rekonstruierbar ist.
  Herleitung: docs/claude-history/phase-9-ab-testing.md.
- ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH UMGESCHRIEBEN (Entscheidung der
  Doku-Aufräumrunde 2026-07-28): Eine Migrationsdatei dokumentiert, was TATSÄCHLICH in der DB
  gelaufen ist. Sie im Nachhinein zu ändern — auch nur einen Kommentar — entkoppelt die Datei
  von dem, was die DB trägt, und macht sie als Rekonstruktionsquelle wertlos. BELEGTER ANLASS:
  Die Kopfkommentare von 0006/0007 nennen die alte Serving-Domain pgsm.site. Sie BLEIBEN,
  obwohl der Name überall sonst auf publayer.net korrigiert wurde — sie sind Zeitdokument,
  haben KEINE funktionale Wirkung (reiner Kommentar), und niemand leitet aus einem
  Migrations-Kopfkommentar eine operative Aufgabe ab. Korrekturen gehören in eine NEUE
  Migration oder in aktive Handlungsdokumente, NIE in eine gelaufene Datei. VERWANDT: die
  Phasen-Historien in docs/claude-history/ bleiben aus demselben Grund stehen; das
  Security-Manifest ist die benannte AUSNAHME, weil es ein aktives Dokument ist (dort wird
  umgestuft, nicht annotiert — s. den Kopf der Vollfassung).
- NEXT_PUBLIC_-REDEPLOY-PFLICHT (Ops-Regel, real aufgetreten): NEXT_PUBLIC_-Env-Vars werden
  zur BUILD-ZEIT ins Client-Bundle inlined -> die Variable in Vercel zu ändern reicht NICHT,
  nach JEDER Änderung ist ein REDEPLOY PFLICHT. Sonst trägt das laufende Bundle still den
  alten Wert, OHNE Fehlermeldung. Server-only Env-Vars vor der ersten Prod-Nutzung im
  Vercel-Dashboard setzen (sie sind nicht build-zeit-gebunden, fehlen aber sonst zur Laufzeit).
- DAS ETIKETT IM NEXT-BUILD-OUTPUT BENENNT DIE KONVENTION, NICHT DIE LAUFZEIT (Phase 10.5,
  gemessen 2026-08-03): Die Zeile "ƒ Proxy (Middleware)" stand VOR und NACH dem Umzug
  middleware -> proxy WÖRTLICH UNVERÄNDERT da — während die Laufzeit im selben Schritt von
  der Edge auf Node wechselte. Das Etikett ist damit ein KONSTANTER Text und trägt KEINE
  Information über die Laufzeit. Wer eine Runtime daraus abliest, liegt falsch, und zwar
  ohne es zu merken: Der Text sieht in beiden Zuständen aus wie eine Bestätigung.
  IN DIESEM PROJEKT BEREITS ZWEIMAL PASSIERT — beide Male in die falsche Richtung:
  (1) in der Aufklärung, wo das Etikett als einer von vier Belegen dafür geführt wurde,
  dass Next die neue Konvention schon zieht; (2) im Bau-Plan, wo "Etikett zeigt ƒ Proxy
  OHNE die Klammer" zunächst als LADEBEWEIS-Kriterium vorgesehen war — hätte es als
  Kriterium gegolten, wäre eine gelungene Umstellung als gescheitert gemeldet worden.
  WO DIE LAUFZEIT WIRKLICH STEHT (beides am eigenen Build gemessen, nicht aus Doku):
  - EDGE: Eintrag in .next/server/middleware-manifest.json; files und entrypoint liegen
    unter server/edge/, gebaut über ein edge-wrapper-Template.
  - NODE: Eintrag in .next/server/functions-config-manifest.json mit "runtime": "nodejs",
    dazu .next/server/middleware.js im CommonJS-Format (require/module.exports) plus ein
    .nft.json (Node File Trace) — beide gibt es im Edge-Fall nicht.
  GRENZE: Gilt für Next 16.2.12 und den Turbopack-Build dieses Projekts. Ändert Next die
  Ausgabe oder das Manifest-Schema, ist die Zuordnung neu zu messen — die REGEL bleibt.
  FOLGE, und sie ist der eigentliche Punkt: Jede künftige Runtime-Frage wird AM MANIFEST
  beantwortet. Nie am Etikett, nie an einem Doku-Zitat. Ein Zitat sagt, was gelten SOLL;
  das Manifest sagt, was der Build TATSÄCHLICH erzeugt hat.
- DIE NEXT-KONVENTIONSDATEI IST src/proxy.ts UND LÄUFT IN DER NODE-RUNTIME (Fakt über den
  heutigen Code, Stand Phase 10.5): Sie exportiert die Funktion proxy. Die Laufzeit ist
  dort NICHT konfigurierbar — Edge steht für die proxy-Konvention nicht zur Verfügung
  (Herkunft dieser Aussage: Next-Doku im installierten Paket, NICHT eigene Messung; eigene
  Messung ist der Node-Befund oben). Wer also eine Edge-Laufzeit für diese Datei braucht,
  hat kein Konfigurationsproblem, sondern muss die Konvention wechseln.
  IHR MATCHER SCHLIESST NUR VIER DINGE AUS: _next/static, _next/image, favicon.ico und die
  aufgezählten Bilddateien. Daraus folgt, was leicht übersehen wird: /api/e UND /api/capi
  laufen DURCH diese Datei hindurch — bei jedem Beacon jedes Besuchers jeder Kundenseite.
  Der Passthrough im Rumpf reicht sie nur durch. Ein Ausschluss im Matcher wäre der
  kürzere Weg, ist aber eine Verhaltensänderung auf dem heissesten Pfad und deshalb
  bewusst NICHT mitgebaut: docs/claude-history/backlog-polish.md, Eintrag "MATCHER DER
  KONVENTIONSDATEI SCHLIESST DIE INGEST-PFADE NICHT AUS".
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
  es bereits fast tut). So kann die spätere MCP-Schicht (Phase 18) dieselbe geprüfte Logik
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
  an"-Zustand (z.B. bereits publiziertes Projekt) fälschlich als aus. Beim Publish-Leak
  zusätzlich sicherheitsrelevant: falscher "veröffentlicht"-Zustand könnte Ad-Budget auf
  die falsche URL lenken.
  AUS WELCHER QUELLE — die zweite Hälfte der Regel, und ohne sie führt die erste in die
  Irre: Ein abgeleiteter Zustand ist nur so gut wie seine Quelle. Behaupten ZWEI Quellen
  dasselbe, wird die genommen, aus der auch die WIRKUNG gespeist wird — dieselbe Tabelle,
  dieselbe Zeile, die der ausführende Pfad liest. Ein CLIENT-besessener Blob-Wert ist die
  SCHWÄCHERE: er überlebt nur, solange der Client ihn zurückspiegelt, und ein alter Tab
  kann ihn jederzeit überschreiben. BEISPIEL, an dem beide Seiten sichtbar sind: "sind
  Zugangsdaten für dieses Ziel hinterlegt?" wird aus der Geheimnis-Tabelle abgeleitet
  (listConfiguredTargets), weil GENAU DIESE Tabelle auch der Forward-Pfad liest
  (getCapiConfigByTrackingKey) — zwei Wahrheiten werden damit zu einer.
  RICHTIGGESTELLT (Phase 11 Scheibe 6), Wortlaut vorher: "Ableiten aus der Wahrheitsquelle
  (settings.hosting / settings.capi.tokenSet / ...) ist korrekt für beide Fälle." DER
  ZWEITE WERT IST KEINE WAHRHEITSQUELLE MEHR. Am Code gemessen (2026-08-08): getCapiTokenSet
  hat im Produktivcode KEINEN Aufrufer; settings.capi.tokenSet wird von Server und Client
  weiterhin GESCHRIEBEN, aber nur noch gelesen, um sich selbst fortzuschreiben. Wer dem
  alten Beispiel folgte, baute das Gegenteil dessen, was jene Scheibe entschieden hat.
  RICHTIGGESTELLT und NICHT gestempelt, weil diese Regel eine VORGABE ist: ein Maßstab mit
  falschen Angaben taugt nicht als Maßstab.
  settings.hosting BLEIBT als Beispiel richtig — für den CLIENT-seitigen View-State. Es
  ersetzt NICHT die Regel weiter oben in dieser Sektion, dass die domains-ZEILE die
  alleinige Wahrheit über "ist dieses Projekt live?" ist; settings.hosting ist deren
  Spiegel, und der Publish-Pfad leitet aus der Zeile ab, nicht aus dem Spiegel.
  Die Aufzählung im ersten Satz und das "Dreimal aufgetreten" bleiben unangetastet: sie
  benennen VIEW-States und eine Historie, nicht Quellen.
- DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER (Phase 10, an der
  eigenen Doku widerlegt): Wer in Doku, Kommentar oder Backlog auf Code verweist,
  nennt den SYMBOLNAMEN (applyZenForLoadedCode, settingsEqual, statusBadge). Namen
  überleben Refactorings, Zeilennummern nicht — und eine falsche Zeilennummer ist
  teurer als keine, weil sie auf eine ANDERE Stelle zeigt statt zum Suchen zu
  zwingen. BELEG: Ein 16-zeiliger Kommentar verschob in Phase 10 sämtliche Angaben
  einer Datei um +16; ein Dokument, das zwei Runden zuvor als "gemessen" galt, war
  damit falsch. Zeilennummern in einem MESSBERICHT bleiben erlaubt (sie datieren
  sich selbst); in dauerhaften Dokumenten nicht.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EIN WIEDERKEHRENDER AUFRUF GEGEN EINEN EXTERNEN DIENST HÄNGT AN DER SICHTBARKEIT
  DES BEREICHS, DER IHN BRAUCHT — NICHT AN DER DES TABS (Phase 10): Die
  document.hidden-Pause greift NICHT, wenn der Nutzer im selben Tab anderswo
  arbeitet; ein Poll läuft dann weiter, obwohl niemand hinsieht, und multipliziert
  sich über alle Nutzer. BELEG: das 60-Sekunden-Poll-Intervall der Domain-Liste
  gegen Vercel — es rechtfertigt allein, dass die Einstellungs-Fläche beim
  Schliessen ABGEBAUT wird, statt dauerhaft gemountet zu bleiben.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EINE KOMPONENTE MIT EIGENEM ZUSTAND DARF NICHT HINTER EINEM UMSCHALTER LIEGEN,
  DER SIE AUSHÄNGT (Phase 10): Entweder sie wird VERSTECKT statt ausgehängt, oder
  ihr Zustand wird hochgezogen. Sonst entscheidet ein reiner Ansichtswechsel
  darüber, ob Arbeit verlorengeht. Umgekehrt gilt dieselbe Regel als WERKZEUG: Wo
  der Zustand dort liegt, wo seine Lebensdauer endet, löst sich das Aufräumen ohne
  eine Zeile Code. BELEG: Die Bestätigung einer Domain-Zeile stirbt mit dem Unmount
  ihrer Komponente; die gleichartige Bestätigung im Container überlebt das
  Schliessen der Fläche und steht Stunden später scharf da.
  Verwandt: "ABLEITEN STATT LÖSCHEN" oben. Herleitung:
  docs/claude-history/phase-10-workspace.md.
- KEIN ZEIT- ODER LOCALE-ABHÄNGIGER WERT IN EINEM TEILBAUM, DER BEIM ERSTEN RENDER
  SICHTBAR IST (Hydration-Regel, Phase 10): toLocale*, Intl.*, Date.now() und
  Verwandte formatieren auf Server und Client verschieden (Zeitzone, Locale) und
  erzeugen einen Hydration-Mismatch. Solche Ausgaben gehören hinter ein Gate, das
  im ersten Render GARANTIERT geschlossen ist — und diese Abhängigkeit gehört an
  die Fundstelle kommentiert, weil sie sonst beim nächsten Umbau unbemerkt kippt.
  BELEG: Die lokalisierte Datumsausgabe der Varianten-Auswertung und formatRelative
  im Projekt-Menü sind NUR deshalb kollisionsfrei, weil ihr jeweiliges Gate
  deterministisch geschlossen startet. VERWORFEN wurden dort Mount-Flag,
  suppressHydrationWarning und ein fester timeZone-Parameter: der erste baut
  Mechanik gegen ein Problem, das es nicht gibt, der zweite unterdrückt die Meldung
  statt der Abweichung, der dritte nimmt dem Nutzer seine lokale Zeit.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- VERSTECKEN PER CSS-KLASSE — WEDER DAS HTML-ATTRIBUT hidden NOCH aria-hidden
  (Phase 10): Beide nehmen den Teilbaum aus dem Accessibility-Tree, und getByRole
  filtert per Default danach — jede Bestandsabfrage auf den inaktiven Teilbaum geht
  dann rot, ohne erkennbare Ursache. Wer einen gemounteten Teilbaum unsichtbar
  machen will, nutzt echtes display:none per Klasse. GEGENPROBE beim Testen: Die
  Klasse belegt STRUKTUR, nicht Sichtbarkeit — s. die jsdom-Regel unten.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WER EIN ELEMENT AUS DEM DOKUMENTFLUSS NIMMT (fixed/absolute), PRÜFT, OB DER
  BEDIENWEG DORTHIN MITSCROLLT (Phase 10): Das fixierte Element bleibt stehen, sein
  Auslöser nicht — bei gescrollter Seite kann der einzige Zugang (oder der einzige
  Schliessweg) aus dem Sichtfeld wandern. BELEG: Der Einstellungs-Drawer ist fixed,
  sein Toolbar-Schalter nicht; ohne das Schliesskreuz IM Drawer wäre er bei
  gescrollter Seite nicht mehr schliessbar gewesen. Die Ausgleichsmassnahme gehört
  in dieselbe Scheibe, die das Problem erzeugt.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- ZWEI BEDIENELEMENTE MIT GLEICHEM NAMEN UND VERSCHIEDENER WIRKUNG SIND EIN
  OBERFLÄCHEN-PROBLEM, KEIN TESTPROBLEM (Phase 10): Wird eine Testabfrage
  mehrdeutig, ist ZUERST die Oberfläche zu prüfen — nicht die Abfrage eindeutig zu
  machen. aria-label oder role reparieren die Abfrage und lassen die
  Doppeldeutigkeit auf dem Bildschirm stehen; das justiert das Instrument statt der
  Sache. BELEG: Ein Reiter "Veröffentlichen" neben dem gleichnamigen Publish-Knopf
  hätte acht Abfragen mehrdeutig gemacht — bei bereits veröffentlichtem Projekt
  hätte eine davon still den falschen Knopf getroffen; gewählt wurde ein anderer
  NAME.
  PFLICHT-PRÜFSCHRITT VOR DEM BAU, nicht danach: Ein neues Bedienelement oder ein
  neuer Text kann bestehende Abfragen auf ZWEI Weisen brechen — es macht sie
  MEHRDEUTIG, ODER es kippt eine Behauptung über die ABWESENHEIT eines Textes
  (not.toContain, queryBy… toBeNull und Verwandte). Beide Achsen einzeln durchgehen.
  DRITTE ACHSE UND WEITERER GELTUNGSBEREICH, ergänzt 2026-08-13: Auch ein DATEN-Element
  kann Abfragen mehrdeutig machen — ein neuer Listeneintrag rendert ein weiteres Element
  wie ein neuer Knopf (BELEG: eine Abfrage setzte "genau eine unkonfigurierte Karte"
  voraus und fiel mit "Found multiple elements"). Und wer eine MENGE erweitert, sucht
  zusätzlich nach dem NEUEN WERT als Gegenbeispiel: eine Strukturprüfung findet, wer über
  die Menge ITERIERT, nicht wer ein künftiges Mitglied als "unbekannt" VERWENDET.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- DIE TESTUMGEBUNG WERTET KEIN CSS AUS (gemessen, dauerhafte Eigenschaft des
  Setups): vitest.config.ts lädt kein Stylesheet, display einer .hidden-Klasse ist
  in jsdom "block" wie ohne Klasse, checkVisibility fehlt. FOLGE: KEIN Test darf
  behaupten, etwas sei sichtbar oder unsichtbar. Prüfbar sind DOM-Präsenz,
  Attribute und Textinhalt; Sichtbarkeit, Position, Farbe und Verdrängung sind
  ausschliesslich Live-Test-Achsen. Ein Test, der eine Klasse prüft, benennt sich
  selbst als STRUKTUR-Zusicherung.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- SERVER-ACTIONS SIND IM NETZWERK-TAB NICHT AN IHREM NAMEN ERKENNBAR (gemessen am
  gebauten Bundle, Phase 10): Sie erscheinen als POST auf die SEITEN-URL; der
  Klartextname steht nur als Sourcemap-Argument im Bundle
  (createServerReference(<opake id>, callServer, …, "name")), gesendet wird die
  opake ID im next-action-Header. Alle Actions einer Seite sehen in der
  Namensspalte identisch aus. FOLGE FÜR JEDE LIVE-ANLEITUNG: "im Netzwerk-Tab nach
  <Action> suchen" ist eine UNTAUGLICHE Sonde und erzeugt FALSCHE ENTWARNUNG.
  Tauglich sind: POSTs auf die Seiten-URL zählen, der next-action-Header — oder,
  schärfer, die Nachstellung im Test. BELEG: Ein Live-Schritt meldete "kein
  Aufruf", während der Aufruf nachweislich stattfand.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- EIN SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN (Phase 10,
  Produkt-Regel für Statusanzeigen): NICHT qualifiziert sind wartende Vorgänge, bei
  denen niemand handeln kann (DNS-Propagierung), und normale Anfangszustände (nichts
  gespeichert, keine Daten, nichts gestartet). Grund: Eine Anzeige, die stundenlang
  leuchtet, ohne dass jemand handeln kann, erzeugt SIGNAL-ERMÜDUNG — dann ist sie
  wertlos, auch für den Fall, der wirklich zählt. ZWEITE BEDINGUNG: Das Signal muss
  dieselbe Sichtbarkeits-Bedingung tragen wie die Meldung, auf die es zeigt — sonst
  führt es in einen Bereich, in dem nichts steht. DRITTE BEDINGUNG, DER TEXT: der
  SICHTBARE Text trägt den BEFUND (was nicht stimmt, und wo), das title-Attribut die
  HANDLUNG (was zu tun ist). Beides in den sichtbaren Text zu packen sprengt jede
  Leiste; nur die Handlung zu zeigen zwingt zum Raten, was überhaupt kaputt ist. Der
  Befund muss ausserdem den BEREICH erkennen lassen, sonst weiss der Nutzer nicht,
  wohin er klicken soll.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- AUFRÄUMEN AM ANFANG EINER SITZUNG, NICHT AN IHREM ENDE (Phase 10): Soll ein
  Kontext "sauber starten", wird er beim BETRETEN zurückgesetzt, nicht beim
  Verlassen. Grund: Laufende Handler enden nicht mit der Ansicht — ein Fehlschlag
  kann NACH dem Verlassen eintreffen und stünde beim nächsten Betreten wieder da.
  Nebeneffekt: Es gibt meist nur EINEN Eintrittspunkt, aber mehrere Ausgänge.
  BELEG: Der Statuskanal des Einstellungs-Drawers wird beim Öffnen geleert; ein
  Reset beim Schliessen hätte genau den nachträglich eintreffenden Fehler
  stehenlassen, den die Massnahme abschaffen sollte.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WELCHE REGEL WANN GREIFT: BEKOMMT DIESER FEHLER EIN BLEIBENDES SIGNAL? (Phase 10;
  das KRITERIUM neu gefasst 2026-08-03 — der Rahmen über den drei Regeln in dieser
  Nachbarschaft: "EIN SIGNAL LEUCHTET NUR …", "AUFRÄUMEN AM ANFANG …" und dieser
  hier; sie werden NICHT wiederholt, sondern eingeordnet).
  DAS KRITERIUM, EIN EINZIGER SATZ: Ein Fehler bekommt genau dann ein bleibendes
  Signal, wenn SEINE BEDINGUNG NOCH WAHR IST, wenn der Nutzer das nächste Mal
  hinsieht. Ist sie das nicht, erscheint er in dessen Sichtfeld und wird beim
  BETRETEN des Kontexts zurückgesetzt (Mechanik: s. "AUFRÄUMEN AM ANFANG EINER
  SITZUNG"). Das Signal selbst steht zusätzlich unter den Bedingungen der Regel
  "EIN SIGNAL LEUCHTET NUR, WENN DER NUTZER JETZT ETWAS TUN KANN".
  WAS DIESES KRITERIUM ABLÖST — UND WARUM ES NICHT ZURÜCKGEDREHT WERDEN DARF: Bis
  2026-08-03 stand hier eine Einteilung in "KLASSE A — interaktive Aktion" gegen
  "KLASSE B — Hintergrund-Ereignis". Beide waren NÄHERUNGEN für genau die eine Frage
  oben, und sie nähern FALSCH. Dass der Nutzer geklickt hat, sagt nichts darüber,
  wie lange die Bedingung wahr bleibt: EIN INTERAKTIVER FEHLER KANN EIN DAUERHAFTER
  ZUSTAND SEIN.
  BELEG, DER DIE ALTE FASSUNG WIDERLEGT HAT (erster realer Fall, 2026-08-03): Eine
  Track-Aktion in einem Projekt OHNE hinterlegte Pixel-ID/Token ist nach dem alten
  Muster Klasse A — der Nutzer klickt, der Fehler steht in seinem Sichtfeld, also
  kein Signal. Das ist FALSCH. Der Zustand bleibt wahr, bis jemand einen Pixel
  hinterlegt; er überlebt jeden Kontextwechsel und ist genau das, wofür ein Signal
  existiert. Die alte Regel wurde in diesem Fall in die falsche Richtung angewandt —
  sie war nicht bloss unscharf, sie hat aktiv fehlgeleitet.
  DER GEMESSENE BESTAND, jetzt richtig erklärt (Symbole am Code erhoben):
  publishStatus/publishError beschreiben einen ABGESCHLOSSENEN VERSUCH — beim
  nächsten Hinsehen ist ihre Aussage veraltet. Deshalb kein Signal, und deshalb
  leert resetDrawerStatusChannel genau diese ZWEI Werte beim Öffnen.
  BELEG RICHTIGGESTELLT (Phase 11 Scheibe 6; am Code gemessen 2026-08-08): Hier
  standen VIER Werte, weil capiTokenStatus/capiTokenError mitgezählt waren. Beide
  gibt es im Container nicht mehr — der Statuskanal der Zugangsdaten liegt in der
  Karte je Ziel und heisst dort status/error. DIE REGEL IST UNBERÜHRT und steht
  wörtlich wie zuvor; überholt war allein ihr Beleg, also eine TATSACHENBEHAUPTUNG
  ÜBER DEN CODE.
  DER NEUE BELEG TRITT DANEBEN, weil er die STÄRKERE Illustration derselben Regel
  ist: Jener Zustand liegt jetzt dort, wo seine Lebensdauer endet, und stirbt mit
  dem ABBAU seiner Komponente — beim Projektwechsel über den key, beim Schliessen
  der Fläche über den Abbau des Drawers. Er braucht gar keinen Reset mehr. Ein
  Zustand, der von selbst endet, ist die bessere Bauform als einer, den ein Aufruf
  leeren muss; der Reset bleibt für den Publish-Kanal, weil dieser im Container
  lebt und dort leben muss. Der Ladefehler der Varianten-Auswertung
  dagegen ist beim nächsten Hinsehen NOCH DA, weil niemand erneut geladen hat —
  deshalb trägt measureSignal ihn (liest variantCounts?.ok === false plus den
  Sichtbarkeits-Term und enthält KEIN drawerArea). DAS NEUE KRITERIUM ERKLÄRT BEIDE
  FÄLLE; das alte traf sie nur zufällig richtig.
  WO DAS SIGNAL SITZT — CONTEXT FIRST: in den Bereich, in dem das Problem
  HANDHABBAR ist (am Reiter/Abschnitt), NICHT global am Haupt-Bedienelement. Ein
  Signal am globalen Icon liest sich als Störung der ganzen Anwendung; ein Fehler in
  den Einstellungen gehört dorthin, wo er behebbar ist. AUSNAHME: echte
  systemkritische Blocker, die den ganzen Editor betreffen — die dürfen global sein.
  ZUSTANDSBASIERT, NICHT FLACKERND: Die Signalbedingung liest AUSSCHLIESSLICH den
  Fehlerzustand, NIE die gerade aktive Ansicht. Ein Signal, das beim Anklicken des
  Reiters verschwindet, verschwindet beim Hinschauen statt beim Lösen — es
  beschreibt dann die Navigation, nicht den Zustand. Es geht aus, wenn das Problem
  weg ist, und sonst nie.
  DIE FRÜHER HIER OFFEN GEFÜHRTE FRAGE IST BEANTWORTET (Fan-Out, Phase 11): Sie
  lautete, ob die Klasse am AUSLÖSER hängt oder am ZEITPUNKT. Die Antwort ist: an
  KEINEM von beiden — die Frage war falsch gestellt. Beim Multi-Tracking-Fan-Out
  sind es ZWEI VERSCHIEDENE EREIGNISSE, nicht dasselbe zu zwei Zeitpunkten:
  - Eine abgewiesene ZIELKONFIGURATION ist ein ZUSTAND des Projekts: einmal wahr,
    bleibend, behebbar. Ihre Bedingung ist beim nächsten Hinsehen noch wahr — sie
    bekommt ein Signal.
  - Ein gescheiterter FORWARD beim Besucher-Traffic ist ein VORKOMMNIS im
    Ingest-Pfad: unbegrenzt oft, ohne Zustandsänderung.
  FOLGE, die dazugehört: Der server-seitige Ziel-Fehlschlag gehört NICHT ins
  Fehlersystem. Er ist keine Meldung, sondern eine GRÖSSE — dieselbe Denkfigur wie
  die Adblocker-Verlustrate. Wer ihn als Fehlermeldung baut, hängt eine Anzeige an
  ein Ereignis, das pro Besucher eintreten kann. S. "WORTWAHL DASHBOARD 'NUR
  server-seitig erfasst', NIEMALS 'gerettet'".
  Herleitung: docs/claude-history/phase-10-workspace.md — dort steht die
  A/B-Beobachtung von damals unverändert. Sie war korrekt BEOBACHTET; untauglich war
  sie als KRITERIUM, nicht als Beschreibung.
- WAS DIE HÜLLE VOM INHALT TRENNT, GEHÖRT DER HÜLLE — NICHT DEM INHALT (Phase 10):
  Trennlinien, Abstände und Rahmen, die eine Navigation von ihrem Inhalt abgrenzen,
  sind Eigenschaft des CONTAINERS. Trägt der erste Abschnitt eines austauschbaren
  Bereichs sie selbst, weiss dieser Bereich etwas über seine POSITION — und bei
  einem dritten Bereich oder einer Umsortierung ist es sofort wieder falsch;
  ausserdem sieht jeder Bereich anders aus, je nachdem, ob er die Klassen trägt.
  Eine Stelle statt zwei.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- NUR EIN TEST IST EIN WÄCHTER — EIN KOMMENTAR ODER EIN NEBENEFFEKT IST KEINER
  (Phase 10, zwei Ausprägungen): (1) Wird eine Entscheidung bewusst an ZWEI Stellen
  getroffen (ein deklariertes Duplikat), sichern Querverweis-Kommentare sie NICHT —
  sie werden beim Ändern nicht gelesen. Der Wächter ist ein Test, der rot wird, wenn
  nur eine Seite geändert wird; der Kommentar sagt, WELCHER. (2) Ein Schutz, der nur
  NEBENEFFEKT einer anderen Logik ist (eine Mount-Grenze, eine disabled-Bedingung),
  verschwindet STILL, sobald diese Logik sich ändert — kein Typfehler, kein roter
  Build. Wer sich auf so einen Schutz verlässt, schreibt den Test dazu, der ihn
  benennt. BELEG: Der Schutz vor einer destruktiven Aktion auf veralteten Daten
  ruht auf einer Mount-Grenze; und der Schutz des CAPI-Klartext-Tokens ruhte allein
  auf einer disabled-Bedingung, ohne dass ein Test ihn behauptete.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- BEIM EXTRAHIEREN EINER ANSICHT WANDERT EINE ABLEITUNG NUR MIT, WENN SIE
  AUSSCHLIESSLICH VON DIESER ANSICHT GELESEN WIRD **UND** IHRE EINGÄNGE EBENFALLS
  MITWANDERN ODER OHNEHIN PROPS SIND (Phase 10, nachgeschärft nach der ersten,
  unzureichenden Fassung): Sonst zieht die Ableitung eine Kette von Werten aus dem
  Container mit sich, die dort gebraucht werden — oder sie muss neu berechnet
  werden, und dann gibt es zwei Rechenwege für dieselbe Frage. BELEG: Bei der ersten
  Extraktion wanderten vier Ableitungen mit, bei der zweiten KEINE einzige, weil
  deren Eingänge im Container gelesen werden.
  Herleitung: docs/claude-history/phase-10-workspace.md.
- WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR (Phase 10, real
  aufgetreten): Eine mit sed geschriebene ODER ZURÜCKGENOMMENE Datei kann danach als
  geändert gelten, obwohl ihr Inhalts-Diff LEER ist — und wandert unbemerkt in den
  Commit. Für Datei-Änderungen das Edit-Werkzeug nutzen, nicht sed. DER
  MUTATIONSZYKLUS IST EBENSO GEFÄHRDET WIE DER BAU: setzen, messen, zurücknehmen —
  nach der Rücknahme IMMER git status prüfen und leere Diffs (Datei gelistet, aber
  numstat leer) ausdrücklich ausschliessen. BELEG: Ohne die Datei-ZÄHLUNG im
  Scope-Wächter ("genau drei Einträge") wäre eine vierte Datei in den Commit
  gewandert. Ergänzt "COMMIT-KONVENTIONEN" oben um eine zweite Prüfung neben der
  Secret-Prüfung.
  DIE REICHWEITE DIESER REGEL IST DIE WIRKUNG, NICHT DAS KOMMANDO IN IHREM TITEL:
  JEDES Werkzeug, das eine Datei GANZ NEU SCHREIBT, statt sie zu BEARBEITEN, kann
  Zeichen verändern, die niemand angefasst hat. Betroffen sind ZEILENENDEN und
  KODIERUNG, einzeln oder beides zugleich — eine zurückgeschriebene Datei kann ihre
  Umlaute und Gedankenstriche doppelt kodiert wiederbekommen, obwohl an ihrem Inhalt
  nichts geändert wurde.
  WARUM DAS STILL IST UND DESHALB TEUER: Kein Werkzeug meldet etwas, der Bau läuft
  weiter, die Tests bleiben grün. Sichtbar wird es ausschliesslich im DIFF — wer nur
  auf "grün" schaut, sieht es nie.
  DIE KOMMANDOS SIND BEISPIELE, NICHT DIE LISTE: die in-place-Schreiber (sed -i,
  perl -i), die Ganz-Datei-Schreiber der PowerShell (Set-Content, Add-Content,
  Out-File) und die Umlenkungen > und >> in beiden Welten, tee, jedes Skript mit
  einem writeFileSync-Äquivalent, ein Formatierer-Durchlauf über eine ganze Datei —
  und das Write-Werkzeug, wo es eine BESTEHENDE Datei ersetzt statt sie zu
  bearbeiten. WER SEIN WERKZEUG HIER NICHT FINDET, IST NICHT AUSGENOMMEN: Die Frage
  lautet nie "steht es in der Aufzählung?", sondern "schreibt es die ganze Datei?".
  DIE VORSCHRIFT OBEN — für Datei-Änderungen das Editier-Werkzeug nutzen — GILT
  DAMIT FÜR ALLE DIESE WERKZEUGE, nicht nur für das eine im Titel genannte. Ebenso
  die Prüfung: nach jedem Schreiben UND nach jeder Rücknahme git status, leere Diffs
  ausschliessen. BEI KODIERUNGS-VERDACHT KOMMT EINE ZWEITE PRÜFUNG DAZU, und sie ist
  nicht dieselbe: Ein doppelt kodierter Text zählt als INHALT, der Diff ist also
  gerade NICHT leer, sondern gross — geprüft wird per Suche nach zerstörten Zeichen
  im Diff, nicht per Zeilenzahl.
  IST ES PASSIERT: aus der Versionsverwaltung wiederherstellen und die Änderung mit
  dem Editier-Werkzeug neu eintragen. Eine Reparatur mit demselben Werkzeugtyp kann
  denselben Fehler ein zweites Mal erzeugen.
  DIE GEGENRICHTUNG GEHÖRT DAZU, ergänzt 2026-08-13: EIN WERKZEUG KANN AUCH EINEN BEFUND
  ERZEUGEN, DEN DER GEGENSTAND NICHT HERGIBT — es verändert dann das ERGEBNIS, ohne den
  Gegenstand anzufassen. WO EIN MESSERGEBNIS EINE ABWESENHEIT IST, WIRD DAS WERKZEUG
  GEWECHSELT, bevor die Abwesenheit als Befund gilt. BELEGE: ein HTTP-Leser, der den
  Antwortstrom vorher selbst verbraucht, liefert leere Rümpfe (roh gemessen: 117/137/142
  Bytes); und grep meldet für eine Datei mit einem NUL-Byte "Binary file … matches" STATT
  der Trefferzeilen (src/lib/mappings.ts, gemessen 2026-08-13).
  Herleitung: docs/claude-history/phase-10-workspace.md.
- NAHT-HYGIENE (7c-2, aktiv): 7c-2 koppelt Domain-/Routing-Logik NICHT an Tracking-/
  Lead-Logik. Die Andock-Punkte für spätere Module existieren BEREITS (neutraler
  /api/e-Trichter, projekt-scoped Settings); "nahtloses Andocken" folgt aus sauberen
  Nähten + additiver Disziplin, NICHT aus spekulativem Vorbau. KEINE Webhook-Interfaces/
  Schema-Erweiterungen ohne realen Konsumenten + Spec. Kontext:
  docs/claude-history/future-roadmap.md.
- SCHWÄRZUNG — VIER TEILE, DIE NUR ZUSAMMEN TRAGEN (Phase 11): (a) EINE KAPPUNG IST KEINE
  MASKIERUNG — sie behält den ANFANG und begrenzt die LÄNGE; ein Geheimnis am Anfang
  überlebt sie vollständig. (b) ERST SCHWÄRZEN, DANN KAPPEN — umgekehrt bleibt von einer
  Folge auf der Kappungsgrenze ein Rest unter der Mindestlänge stehen und geht als
  TEIL-Leak hinaus, in einer Zeile, die bereinigt AUSSIEHT. (c) EINE SCHWÄRZUNG NACH FORM
  TRIFFT AUCH DAS, WAS FORMGLEICH UND GEWOLLT IST — die Ausnahme braucht einen EIGENEN
  NAMEN (kein Schalter-Argument) und einen EIGENEN TEST. (d) EIN LEAK-TEST WIRD NIE MIT
  EINEM ECHTEN GEHEIMNIS GEFAHREN: ein formbasierter Schutz sieht echt und erfunden als
  DIESELBE Eingabe, der echte Wert misst denselben Pfad nur mit Schadenspotenzial.
  BELEG: beide Kappungen auf dem Meta-Fehlerpfad standen jahrelang da und schützten nie;
  der live gemessene Trace-Bezeichner (23 Zeichen) wäre von derselben Regel gefressen
  worden, die das Geheimnis fängt.
- EIN KOMMENTAR IST EINE BEHAUPTUNG, KEINE EIGENSCHAFT — UND ER VERMEHRT SICH (Phase 11):
  Wer über FREMDES Verhalten Unbedenklichkeit behauptet, hält damit eine Schutzmassnahme
  auf; und ein bereits falscher Beleg wird beim Nachbareintrag ABGESCHRIEBEN statt geprüft
  — die zweite Kopie ist ab dem ersten Tag falsch. ABGRENZUNG zu "EINE REGEL KANN GÜLTIG
  BLEIBEN, WÄHREND IHR BELEG FALSCH WIRD": dort ALTERT eine Angabe, hier VERBREITET sie
  sich. BELEG: "Metas message ist Beschreibungstext (kein Secret)" stand über dem Feld,
  das den Leak trug; die falsche Consent-Schlüssel-Begründung wurde beim dritten Ziel
  unverändert weitergereicht.
- MENGEN — ZWEI REGELN, DIE ZUSAMMENGEHÖREN (Phase 11): (a) EINE MENGEN-AUSSAGE WIRD NICHT
  DADURCH RICHTIG, DASS MAN EIN FALSCHES MITGLIED ENTFERNT — wer korrigiert, prüft die
  VERBLEIBENDEN, sonst wird sie präziser statt wahr. (b) EINE TEST-ZUSICHERUNG, DIE VON
  EINER MENGE ABHÄNGT, BRICHT BEIM NÄCHSTEN MITGLIED WIEDER: die Reparatur ENTFERNT die
  Abhängigkeit, sie zieht sie nicht nach. BELEG: eine Mitglieder-Korrektur zog sieben
  Fundstellen nach, ohne die drei übrigen zu prüfen; eine Zählung "genau zwei
  unkonfigurierte" hätte bei drei Zielen gegriffen und beim vierten erneut gebrochen.
- BEVOR EIN ERGEBNIS BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE GEMESSEN WIRD
  — VIER TEILE (Phase 11):
  (a) DER MITLÄUFER: Ein Messergebnis zählt erst, wenn im SELBEN Lauf gegen dasselbe fremde
  System ein Aufruf mitläuft, dessen Soll-Ausgang VORHER feststeht. Ein Ergebnis, das aus
  ZWEI Gründen so aussehen kann wie beobachtet, ist keines, sondern eine Frage. Der
  Soll-Ausgang muss vorher feststehen, weil man ihn bei einem fremden System nicht
  herstellen kann. BELEG: fünf Fehldeutungen an EINEM Anbieter an EINEM Tag, in vier von
  fünf Fällen zeigte erst die Kontrolle den Fehler.
  (b) EINE NICHTERWÄHNUNG IST KEINE ENTWARNUNG: Hatte eine Prüfung EINEN Gegenstand, sagt
  sie über die übrigen nichts — auch nicht implizit. BELEG: aus "nur LinkedIn bricht die
  Hülle" wurde geschlossen, TikTok passe; über TikTok stand dort nie ein Hüllen-Befund.
  (c) EINE ERFOLGSQUITTUNG KANN BLIND SEIN FÜR DAS, WAS MAN MISST: Antwortet ein fremdes
  System mit und ohne den gemessenen Bestandteil IDENTISCH, belegt seine Quittung darüber
  nichts — es braucht eine Gegenprobe, die ihn weglässt. BELEG: die Antwort des Anbieters
  war mit und ohne Nutzer-Objekt identisch.
  (d) EIN VERDACHT, DER EINEN FEHLERORT NENNT, BEVOR EINE MESSUNG IHN EINGEGRENZT HAT,
  KOSTET DIE HOPS, DIE ER ÜBERSPRINGT: Bei einer Kette aus mehreren Übergängen wird nicht
  am vermuteten Ende begonnen, sondern HALBIERT — zwei Beobachtungen, die je die halbe
  Kette entlasten, schlagen jede Begehung. BELEG: eine Kette aus fünf Hops, vier davon
  durch ZWEI Beobachtungen entlastet (ausgelieferter Quelltext, Datenbank-Zeile).
  (e) PFLICHT-VORBEDINGUNG, KEINE EMPFEHLUNG — VOR JEDER LIVE-KONTROLLE WIRD DER
  A/B-BETRIEB FESTGESTELLT: Ist er aktiv, wird ENTWEDER abgeschaltet ODER die
  AUSGELIEFERTE Variante bestimmt, BEVOR irgendein Ergebnis beurteilt wird. Sie ist kein
  Teil (a) und keine Fussnote dazu: (a) verlangt einen zweiten Aufruf, (e) verlangt einen
  bekannten ZUSTAND DES PRÜFLINGS. GRUND: Die Varianten tragen GETRENNTE Mapping-Sätze und
  können verschiedene Ereignisnamen und Beträge führen; wer das nicht prüft, misst eine
  unbekannte Konfiguration, und jedes Ergebnis ist von einem echten Befund nicht zu
  unterscheiden. BELEG: eine Änderung an der EINEN Variante, ausgeliefert wurde die ANDERE
  — aufgelöst hat es EINE Abfrage über BEIDE Mapping-Spalten.
- MEHRERE KENNUNGEN JE ZIEL BRECHEN EINEN SCHLÜSSEL (PROJEKT, ZIEL) NICHT — MEHRERE
  EMPFÄNGER DESSELBEN TYPS JE PROJEKT BRECHEN IHN (Phase 11): Zwei Achsen, die beim Lesen
  wie eine aussehen — die eine vervielfacht die KENNUNG, die andere die EMPFÄNGER-INSTANZ.
  Wer sie zusammenzieht, hält einen Schlüssel für gebrochen, sobald irgendein Ziel mehr als
  eine Kennung braucht, und baut ein Schema um, dem nichts fehlt. BELEG: Kennung im
  Einstellungs-Blob (ProjectSettings.pixels), Zugangsdatum in der Geheimnis-Tabelle mit
  einer Zeile je Ziel — die Trennung lag im Code, bevor sie jemand als Prinzip benannte.
- WER EINE STREICHUNG PLANT, ZÄHLT NICHT NUR DIE IMPORTE, SONDERN AUCH DIE SÄTZE, DIE DEN
  GELÖSCHTEN NAMEN TRAGEN (Phase 11): tsc und build fangen die Importe — und nur die. Ein
  Kommentar, der ein totes Symbol verbietet, kompiliert einwandfrei und sieht wie eine
  geltende Regel aus. BELEG: nach vier grünen Gates trugen drei Kommentare den Namen einer
  gestrichenen Zusammensetzung weiter; die Streichung war da noch nicht fertig.
- EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT — DER
  ERSTE TREFFER IST SYSTEMATISCH DER FALSCHE (Phase 11.1): Wer in einer Datei mit
  Abschnitts-Verzeichnis auf eine ÜBERSCHRIFT ankert, trifft den gleichnamigen Eintrag im
  VERZEICHNIS, nicht die Überschrift selbst — das Verzeichnis steht vorn.
  DIE URSACHE IST STRUKTURELL UND KEIN FEHLGRIFF, und genau das trägt diese Regel: Seit
  Standdateien ein Verzeichnis im Kopf tragen, steht JEDE Überschrift MINDESTENS ZWEIMAL in
  der Datei. Wer die erste Fundstelle nimmt, nimmt damit systematisch die falsche — bei
  jeder Überschrift und in jeder solchen Datei.
  DER SCHADEN IST STILL UND GROSS: Kehren sich dadurch zwei Schnittgrenzen um, steht die
  halbe Datei zweimal da; kein Werkzeug meldet etwas, sichtbar wird es ausschliesslich im
  DIFF.
  BELEG (GEMESSEN am 2026-08-17, beim Verdichten von docs/aktiver-stand.md; protokolliert
  als Hebungs-Kandidat ebendort): Eine Suche nach dem Text einer `##`-Überschrift traf den
  Verzeichnis-Eintrag statt der Überschrift, die beiden Splice-Grenzen kehrten sich um, und
  die halbe Datei stand zweimal da. Wiederhergestellt wurde aus der Versionsverwaltung, die
  Änderung danach mit dem Editier-Werkzeug neu eingetragen.
  DIE REICHWEITE (GEMESSEN am Repo, 2026-08-19): DREI Dateien tragen heute ein
  Abschnitts-Verzeichnis — docs/aktiver-stand.md, docs/immer-beachten.md und
  docs/ziel-befunde.md. Das Verzeichnis ist eine VORGABE für jede künftige Standdatei, keine
  Eigenart einer einzelnen: Die Regel, die das Verzeichnis fordert, erzeugt diese Falle
  selbst.
  WAS AUSDRÜCKLICH NICHT DAZUGEHÖRT: eine Vorschrift, WIE stattdessen anzukern ist. Ob das
  Verzeichnis eine unterscheidbare Form bekommt, ob nach der LETZTEN statt der ersten
  Fundstelle gesucht wird oder ob es schlicht bei der Pflicht zum Editier-Werkzeug bleibt,
  ist eine EIGENE Entscheidung und hier NICHT getroffen.
  ABGRENZUNG ZU "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR": Dort
  verfälscht das WERKZEUG den Gegenstand oder den Befund; hier arbeitet das Werkzeug
  tadellos, und der ANKER trifft eine andere Stelle als die gemeinte. Der SCHADEN ist
  derselbe (stille Ganz-Datei-Verfälschung, nur im Diff sichtbar), der GEGENSTAND ist ein
  anderer — deshalb steht sie eigenständig und nicht als Absatz dort.
  ABGRENZUNG ZU "DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER": Jene
  Regel betrifft den VERWEIS-Anker in Doku, Kommentar und Backlog — worauf man ZEIGT. Diese
  hier betrifft den SUCH-Anker beim Bearbeiten — was man TRIFFT. Zwei verschiedene Achsen,
  dasselbe Wort.
- EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY (Phase 11.1, als Prinzip
  formuliert; die Ausprägungen sind älter): Was ein Erzeuger EINMAL geschrieben hat, trägt
  den Stand SEINER Erzeugungszeit — dauerhaft. Ein Code-Deploy erreicht es nicht. Wer an
  einem erzeugten Artefakt etwas ändert, FRAGT deshalb bei jeder Änderung, was mit den
  BEREITS ausgelieferten geschieht; und wo die Änderung ein Neu-Erzeugen verlangt, gehört
  dieser Schritt als PFLICHT-SCHRITT in die Live-Anleitung und nicht in den Support-Fall.
  DIE BEGRÜNDUNG, ohne die die Frage beim nächsten Umbau entfällt: Der Bruch ist IMMER
  still. Ein Alt-Artefakt wirft keinen Fehler — es sendet weiter an eine Adresse, die es
  nicht mehr gibt, oder es trägt einen Schlüssel nicht, den der Leser fail-closed als
  "nicht erlaubt" deutet. Niemand sieht etwas; es verschwinden nur Conversions.
  DIE GRENZE, DIE MITMUSS: Diese Regel sagt NICHT, dass Abwärtskompatibilität immer zu
  wahren ist. Sie sagt, dass die FRAGE zu stellen ist — die Antwort kann auch "wir brechen
  es bewusst, und hier ist der Weg zurück" lauten.
  BELEG 1, DIE SCHÄRFERE AUSPRÄGUNG MIT KONKRETEM VERBOT — sie steht als eigene Regel oben
  und bleibt unverändert: "PERMANENTER Alias /api/capi darf NIE entfernt werden (Phase 7b):
  bereits in freier Wildbahn ausgelieferte Alt-Exporte tragen die absolute /api/capi-URL
  fest eingebacken und beaconen weiter dorthin." Jene Regel ist auf EINE Route formuliert;
  diese hier ist das Prinzip darüber und ERSETZT sie nicht.
  BELEG 2, DER CONSENT-DRAHT (Phase 11, Scheiben 11.1c/11.1d): Ein publizierter Text trägt
  den Schlüsselstand seines letzten Publish. Wächst die Schlüsselmenge, weil ein Ziel eine
  Kennung bekommt, tragen bereits publizierte Seiten den neuen Schlüssel NICHT und müssen
  NEU VERÖFFENTLICHT werden — ein Code-Deploy erreicht sie nicht.
  BELEG 3, DIE DRITTE AUSPRÄGUNG, und sie zeigt zugleich die Trennlinie: "NEXT_PUBLIC_-
  REDEPLOY-PFLICHT" (eigene Regel oben) beschreibt dasselbe Einfrieren zur BUILD-ZEIT —
  dort genügt aber EIN Redeploy, weil es EIN Bundle gibt. Beim veröffentlichten Kundentext
  genügt er NICHT: Jede Seite trägt ihren eigenen Stand, und das Neu-Erzeugen geschieht JE
  PROJEKT durch den Betreiber. Wer die beiden zusammenzieht, hält einen Deploy für die
  Reparatur.
  DIE VERBREITUNG IST GEMESSEN, DIE REGEL WAR ES NICHT (GEMESSEN am Repo, 2026-08-19, Suche
  über "bereits ausgeliefert", "in freier Wildbahn", "ERZEUGUNGSZEIT", "neu veröffentlichen",
  "Code-Deploy erreicht", "EINBAHNSTRASSE"): Der Mechanismus ist in SIEBEN Produktiv- und
  Doku-Dateien beschrieben und zusätzlich in DREI Testdateien — und war bis zu dieser
  Hebung nirgends als Regel formuliert. Genau das ist der Grund für sie: Ein Mechanismus,
  den zehn Stellen einzeln erklären, ist ein Prinzip, das keine davon benennt.
- EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT, SONST IST DER NACHWEIS NICHT MEHR
  HERSTELLBAR (Phase 11.1): Verlangt ein Nachweis einen Zustand VOR einer Änderung — einen
  Ausgangswert, eine Kopie des ausgelieferten Textes, einen Constraint-Stand —, gehört
  seine Sicherung als PFLICHT-STOPP in die Anleitung, nicht als Hinweis. Nach dem Deploy
  ist er nicht mehr zu beschaffen.
  DIE BEGRÜNDUNG, und sie ist der Unterschied zu einem bloss unbequemen Ablauf: Ein
  Schritt, dessen Voraussetzung nicht mehr herstellbar ist, FÄLLT NICHT AUF. Er wird
  hinterher als "geprüft" protokolliert, ohne stattgefunden zu haben — und der Nachweis,
  den er tragen sollte, fehlt still. Ein Vermerk liest sich dann wie ein Vorher/Nachher-
  Beleg und ist keiner.
  DIE GRENZE: Sie gilt für NACHWEISE, nicht für jeden Live-Schritt. Wo sich der Nachweis
  auch nachträglich führen lässt, greift sie nicht.
  BELEG, DREIMAL IN FOLGE AN DERSELBEN PHASE (GEMESSEN, Vermerke 1 bis 3 in der Standdatei
  der Phase 11.1): In 11.1a (2026-08-17) fiel der Constraint-Ausgangswert aus, in 11.1b
  (2026-08-18) der Vergleich des ausgelieferten Textes — beide, weil das Deployment zum
  Testzeitpunkt schon lief. In 11.1c (2026-08-18) hat ein PFLICHT-STOPP in der Anleitung
  ("ohne gesicherte Vorher-Kopie kein Deploy") den Schritt hergestellt, und dort war der
  Byte-Vergleich der EINZIGE Nachweis der tragenden Invariante.
  ABGRENZUNG ZU "EIN LIVE-TEST-SCHRITT SETZT EINEN ZUSTAND DES PRÜFLINGS VORAUS": Jene
  Regel greift INHALTLICH — sie fragt, ob im ausgelieferten Artefakt etwas die geprüfte
  Wirkung schon vorher abfängt. Diese hier greift ZEITLICH: der Wert existiert nur bis zum
  Deploy. Ein Prüfling kann in tadellosem Zustand sein und der Vorher-Wert trotzdem weg.
  ABGRENZUNG ZU "EINE ANLEITUNG, DIE EINE VORAUSSETZUNG NICHT NENNT, ERZEUGT EINE FALSCHE
  ENTWARNUNG": Jene greift auf der ANLEITUNGS-Achse — die Voraussetzung wird nicht genannt,
  wäre aber herstellbar. Diese hier greift auf der HERSTELLBARKEITS-Achse: genannt oder
  nicht, nach dem Deploy geht sie nicht mehr. Drei Achsen, dieselbe falsche Entwarnung als
  Ergebnis.
- JEDES WEITERE FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT — UND EIN
  DRITTES ZIEL ERZWINGT EINE ENTSCHEIDUNG, KEINE KOPIE (Phase 11.1, als Auflage für jedes
  weitere Ziel): Wer ein Fan-Out-Ziel hinzufügt, plant von Anfang an eine EIGENE Migration
  auf `project_secrets` ein — der CHECK `project_secrets_target_valid` zählt die erlaubten
  Ziele auf, und ein Ziel, das dort fehlt, kann kein Zugangsdatum ablegen.
  DIE ERSTE HÄLFTE IST EINE MECHANIK, DIE ZWEITE EINE HALTUNG, und beide gehören
  zusammen: Ein neues Ziel ist NICHT die Kopie des vorigen Adapters mit anderen
  Feldnamen. Jedes bringt eine eigene Kennungsform, eine eigene Nutzlast und eine eigene
  Fehlersprache mit; wer kopiert, erbt Annahmen, die für das neue Ziel nie geprüft
  wurden.
  DER PREIS, DER GRÖSSER IST ALS DAS EINZELNE ZIEL: Ein nicht abbildbares Ereignis hat
  heute keinen Rückkanal — und einen zu bauen berührt ALLE VIER Adapter, nicht nur den
  neuen. Der Kandidat dazu steht in docs/claude-history/backlog-polish.md, "EIN ADAPTER
  KANN HEUTE KEIN EREIGNIS ABLEHNEN".
  NACHGEZOGEN BEI DER HEBUNG (2026-08-19): Die Vorlage dieser Regel sprach von DREI
  Adaptern. Es sind seit Scheibe 11.1f VIER — meta, pinterest, tiktok, linkedin.
  DER BELEG (GEMESSEN am Repo, 2026-08-19): Vier Ziele, vier Migrationen — 0021 legt
  `project_secrets` an mit `check (target in ('meta'))`, 0022 erweitert auf
  `('meta', 'pinterest')`, 0023 auf `('meta', 'pinterest', 'tiktok')`, 0024 auf
  `('meta', 'pinterest', 'tiktok', 'linkedin')`. KEIN Ziel ist ohne eigene Migration
  hinzugekommen; die Regel beschreibt damit einen vierfach gelebten Ablauf und keine
  Absicht.
  WARUM SIE EINE REGEL IST UND KEIN OFFENER PUNKT: Sie sagt, was ZU TUN ist, wenn ein
  Ziel dazukommt — nicht, was heute fehlt. Ein offener Punkt wartet auf einen Trigger;
  diese hier wartet auf eine Arbeit.
  ABGRENZUNG ZU "OB EINE MIGRATION IN DER LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT
  ENTSCHEIDBAR": Jene Regel betrifft den ZUSTAND der Datenbank — eine geschriebene
  Migration ist kein Vollzug. Diese hier betrifft den ZUSCHNITT — sie sagt, dass die
  Migration überhaupt eingeplant werden muss. Beide zusammen: einplanen, schreiben, und
  den Vollzug eigens messen.
- ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN, NICHT SEITENWEISE AUSGEWÄHLT — UND
  DER GELESENE UMFANG WIRD FESTGEHALTEN (Phase 11.1-Nachlauf, an einem realen Fall
  erhoben): Wer beim Anbieter recherchiert, liest den VOLLSTÄNDIGEN Abschnitt zum
  betroffenen Produkt — nicht die Seiten, die zur eigenen Frage zu passen scheinen.
  DIE BEGRÜNDUNG, ohne die die Regel beim nächsten Mal als Fleissarbeit gestrichen wird:
  Wer Seiten nach der eigenen Frage AUSWÄHLT, findet nur Antworten auf Fragen, die er
  schon richtig gestellt hat. DIE TEUERSTEN BEFUNDE WIDERLEGEN DIE FRAGE, NICHT DIE
  ANTWORT — und sie stehen auf genau den Seiten, die man nicht ausgewählt hätte.
  BELEG (OWNER-BEFUND, 2026-08-20, an DIESEM Fall erhoben): An EINEM Tag haben vom Owner
  nach Gefühl herausgesuchte Seiten DESSELBEN Anbieter-Abschnitts FÜNF Befunde geliefert,
  die keine gezielte Suche gebracht hatte — ein Oberflächen-Werkzeug, das eine zuvor
  gescheiterte Messung ersetzte; eine Statuscode-Tabelle, die ein Fehlbild erklärte; ein
  Refresh-Token, das eine bereits getroffene Architektur-Annahme widerlegte; eine
  Deduplizierungs-Voraussetzung, die eine Produktzusage berührt; und eine abgekündigte
  Versionsangabe. Fundstellen: docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions
  API)", Teile (v) bis (z).
  DIE ZWEITE HÄLFTE, UND SIE IST DER OPERATIVE TEIL: DER GELESENE UMFANG WIRD
  FESTGEHALTEN — welche Seiten, welcher Abschnitt, welches Datum. Ohne diese Angabe hat
  jede spätere Aussage "das steht dort nicht" KEINE REICHWEITE, und ein Nicht-Treffer ist
  von "an der falschen Stelle gesucht" nicht zu unterscheiden. Es ist dieselbe Disziplin
  wie die benannte ACHSE bei einer formalen Code-Suche, nur am fremden Dokument.
  DIE GRENZE, DIE DIE REGEL BEFOLGBAR HÄLT: "Alles lesen" ist bei einem Anbieter-Baum
  keine Anweisung und wäre eine, die niemand einhält. Gemeint ist der VOLLSTÄNDIGE
  Abschnitt zum betroffenen Produkt — nicht der ganze Baum.
  ABGRENZUNG ZUM PFLICHT-STOPP FÜR docs/ziel-befunde.md (CLAUDE.md): Jener sagt, WANN die
  eigene Befund-Datei zu laden ist — vor Zuschnitt, Adapter, Recherche oder
  Live-Test-Anleitung. DIESE Regel sagt, WIE beim ANBIETER gelesen wird. Zwei
  verschiedene Gegenstände: die eigene Ablage gegen die fremde Quelle. Sie greifen
  ineinander — was hier gelesen wird, wird dort abgelegt —, aber keine ersetzt die andere.
  ABGRENZUNG ZU "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL": Jene betrifft
  TESTS — einen Wächter, dessen Gegenstand verschwindet, der trivial wahr ist oder der
  Blockade nicht von Absturz trennt. DIESE betrifft die RECHERCHE an einem fremden
  Dokument. Gemeinsam ist beiden nur die Denkfigur, dass eine Abwesenheit ohne benannte
  Reichweite nichts belegt; der Gegenstand ist ein anderer.
- EIN NEUER ANBIETER WIRD ERST ANGEBUNDEN, NACHDEM SEINE DOKUMENTATION ABSCHNITTSWEISE
  GELESEN UND DIE BEFUNDE VERORTET SIND — UND DAS GILT FÜR JEDE ANBIETER-KLASSE, NICHT NUR
  FÜR FAN-OUT-ZIELE (2026-08-20, nach dem ersten Lauf dieser Art):
  DIE UNTERSCHEIDUNG, OHNE DIE DIE REGEL FALSCH ANGEWANDT WIRD — sie ist der eigentliche
  Inhalt und nicht ein Zusatz:
  · DIE METHODE IST ÜBERTRAGBAR. Den VOLLSTÄNDIGEN Abschnitt zum betroffenen Produkt lesen,
    statt Seiten nach der eigenen Frage auszuwählen · die Fragen VORHER festlegen ·
    Provenienz an jede Antwort, mit Quelle und Datum · einen Nicht-Treffer nur mit BENANNTER
    REICHWEITE · eine Doku-Aussage ABLEGEN, aber NIE als Messung zählen.
    DAS WIE STEHT NICHT HIER, sondern in der Regel darüber ("ANBIETER-DOKUMENTATION WIRD
    ABSCHNITTSWEISE GELESEN, NICHT SEITENWEISE AUSGEWÄHLT — UND DER GELESENE UMFANG WIRD
    FESTGEHALTEN"). Zwei Fassungen desselben Verfahrens liefen auseinander.
  · DER FRAGENKATALOG IST NICHT ÜBERTRAGBAR. docs/ziel-fragenkatalog.md ist aus VIER
    Fan-Out-Adaptern abgeleitet und fragt nach Nutzlast, Ziel-Kennung und
    Conversion-Ereignissen. Auf einen Zahlungsanbieter, einen Versanddienst oder eine andere
    Anbindung angewandt liefert er überwiegend "nicht anwendbar" — UND EIN KATALOG, DER
    NICHTS TRIFFT, WIRD ZU RECHT IGNORIERT. Das ist der Grund, warum diese Regel die beiden
    Hälften trennt: Wer die Methode mitnimmt und den Katalog stehen lässt, gewinnt; wer
    beides mitnimmt, verliert auch die Methode.
  · FOLGE: Eine neue Anbieter-KLASSE bekommt einen EIGENEN Katalog, abgeleitet auf DEMSELBEN
    Weg wie dieser — aus dem, was eine bereits gebaute Anbindung DERSELBEN Klasse
    tatsächlich gebraucht hat. Gibt es keine, wird er aus dem ZUSCHNITT abgeleitet und als
    VORLÄUFIG gekennzeichnet.
  ES LÄUFT NICHTS AUTOMATISCH, und das gehört ausdrücklich hinein: Es gibt KEINEN Zeitplan
  und KEINEN Hintergrundlauf. Die Regel ist eine PFLICHT, die die INSTANZ auslöst, die die
  Anbindung zuschneidet. WER AUF EINE AUTOMATIK WARTET, WARTET VERGEBENS.
  BELEG (2026-08-20): Der erste Lauf nach dieser Methode hat an EINEM Anbieter NEUN offene
  Fragen beantwortet und ZWEI Angaben im eigenen Bestand als ZU ENG erwiesen. Fundstelle:
  docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)".
  ABGRENZUNG ZUR REGEL DARÜBER, und sie ist scharf: Jene sagt, WIE gelesen wird — den
  Abschnitt statt ausgewählter Seiten, und den Umfang festhalten. DIESE sagt, WANN das
  Pflicht ist (vor der Anbindung, nicht während) und WAS davon übertragbar ist (die Methode,
  nicht der Katalog). Kein Widerspruch: die eine ist das Verfahren, die andere sein
  Geltungsbereich.
