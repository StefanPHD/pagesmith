# AKTIVER STAND — Phase 11.3 (Tracking-Testmodus-Modul)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.3. Sie trägt den
Gegenstand der Phase, die Ausgangslage, den Zuschnitt der Scheiben, die Entscheidungen,
die über ihre Scheibe hinaus binden, den gemeldeten Vorrat und — sobald etwas gebaut UND
live geprüft ist — die Scheiben-Vermerke. Angelegt am 2026-09-08, VOR der ersten Scheibe:
erst das Gedächtnis, dann der Code.

**SIE IST DAS PFLICHT-GATE JEDES BAU- UND AUFKLÄRUNGS-PROMPTS DIESER PHASE** ("Auftrag
0"), zusammen mit CLAUDE.md und docs/immer-beachten.md. Wer an der Phase arbeitet, liest
sie ZUERST — vor dem Plan, nicht während des Baus. Wo sie einer anderen Fassung
widerspricht, gilt sie. Das Verfahren dahinter steht in CLAUDE.md, "## Aktiver Stand —
Verfahren ab Phase 10"; das Detail zu Anlegen, Fortschreiben und der Hebung am Phasenende
in docs/arbeitsweise.md. Existiert diese Datei nicht, läuft keine Phase — sie existiert
also genau so lange, wie 11.3 offen ist, und wandert am Phasenende ins Archiv.

**SIE WIRD NICHT GETEILT.** Eine Datei, kein Archiv- und kein Vorrats-Ableger. Die Teilung
ist kein Pflichtteil einer Phase (CLAUDE.md, "## Aktiver Stand — Verfahren ab Phase 10");
sie ist das Mittel gegen eine Standdatei, deren vollständige Lesung nicht mehr zu leisten
ist. Diese Phase ist klein geschnitten. WER SIE TEILT, ENTSCHEIDET DAS NEU und schreibt
den Grund hierher.

**WAS SIE NICHT IST:** Sie beschreibt einen ZUSCHNITT, keinen Bestand. Der gemessene
Zustand der Datenbank steht in docs/db-stand.md, die dauerhaften Regeln in
docs/immer-beachten.md, die Anbieter-Befunde in docs/ziel-befunde.md. Wer hier eine Regel
einträgt, macht aus einem Zuschnitt eine Vorgabe, die keine Phase überlebt.

## Verzeichnis der Abschnitte

Der Zweck dieses Verzeichnisses ist eine BELEGBARE Umfangs-Ansage: "lies Abschnitt X plus
das Verzeichnis" ist damit eine prüfbare Aussage und keine Hoffnung.

WER DARIN SUCHT, BEACHTE DIE REGEL, DIE AUS EINER STANDDATEI GEHOBEN WURDE: jede
Überschrift steht in einer Datei mit Verzeichnis MINDESTENS ZWEIMAL, und die erste
Fundstelle ist das Verzeichnis (docs/immer-beachten.md, "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT").

- ## Verzeichnis der Abschnitte
- ## Fortschreibungsregeln
- ## Gegenstand der Phase
- ## Ausgangslage — was am 2026-09-08 gemessen und gelesen ist
- ## Scheibe 11.3a — Der Testzustand und der Riegel im Ingest
- ## Entscheidungen, die über ihre Scheibe hinaus binden
- ## Vorrat — gemeldet, nicht gebaut
- ## Hebungs-Kandidaten
- ## Scheiben-Vermerke

## Fortschreibungsregeln

Wörtlich als REGEL, nicht als Hinweis:

- **DIE VERMERK-NUMMERN SIND STABIL UND WERDEN NIE NEU VERGEBEN.** Ein neuer Vermerk
  tritt HINTEN an, auch wenn er der jüngste ist und auch wenn die Reihenfolge dadurch
  nicht chronologisch aussieht. GRUND: Eine Nachnummerierung hat in Phase 11 lebende
  Verweise getötet — ein Verweis nennt die Nummer, nicht das Datum, und er wird nicht
  rot, wenn die Nummer weiterwandert.
- **DIE LÜCKEN-REGEL:** Ein Vermerk OHNE Commit-Nummer ist der jüngste, noch nicht
  committete. Es darf immer nur EINE solche Lücke geben. Steht eine zweite da, ist
  entweder ein Commit nicht nachgetragen worden oder ein Vermerk beschreibt etwas, das
  nie eingecheckt wurde — beides ist zu klären, bevor weitergebaut wird.
- **PROVENIENZ AN JEDER ANGABE:** GEMESSEN (am Repo oder live, mit Datum) oder GELESEN
  (mit Quelle und Datum). Eine Angabe ohne Provenienz ist hier nicht schreibbar. Eine
  Aussage über bestehenden Code steht entweder als FRAGE oder trägt GEMESSEN mit Datum —
  nie als beiläufige Behauptung.
- **DER ORT IST DER SYMBOLNAME, NIE EINE ZEILENNUMMER.** Namen überleben Refactorings;
  eine falsche Zeilennummer ist teurer als keine, weil sie auf eine ANDERE Stelle zeigt,
  statt zum Suchen zu zwingen.
- **TITEL-ZITATE OHNE MARKIERUNGSZEICHEN.** Wird eine Überschrift zitiert, steht sie ohne
  die Rautenfolge, die eine Überschrift ausmacht — sonst kollidiert das Zitat dauerhaft
  mit jeder gleichlautenden Überschrift, und eine Suche trifft systematisch das Zitat
  statt der Sache.
- **NICHTS WIRD UMSORTIERT.** Neue Abschnitte treten hinten an und bekommen eine Zeile im
  Verzeichnis.

## Gegenstand der Phase

**DER TESTMODUS EXISTIERT SCHON — ER GEHÖRT NUR NIEMANDEM.** Für meta, pinterest und
tiktok trägt der Code je einen Testmodus, und alle drei hängen an einer
UMGEBUNGSVARIABLEN (GEMESSEN am Repo, CC, 2026-09-08; Fundstellen unter "Ausgangslage").
Eine Umgebungsvariable gilt für das DEPLOYMENT — für alle Projekte gleichzeitig oder für
keines. Ein Kunde kann sie nicht setzen, ein Betreiber kann sie nicht für ein einzelnes
Projekt setzen, und ein zweites Projekt kann sie nicht anders setzen als das erste. **DAS
IST DER GANZE MANGEL: nicht, dass es keinen Testmodus gibt, sondern dass seine Reichweite
die falsche ist.**

**PHASE 11.3 BRINGT IHN AUF PROJEKT-REICHWEITE, JE (PROJEKT, ZIEL).** Danach kann ein
Kunde die Einrichtung seines eigenen Projekts prüfen, ohne die EIGENEN Analytics-Zahlen zu
berühren und ohne dass irgendein anderes Projekt davon etwas merkt.

### Die Phase liefert SICHTBARKEIT, nicht ISOLATION

**WAS DER KUNDE BEKOMMT:** Er sieht sein Ereignis in der Test-Ansicht des Anbieters
ANKOMMEN. Der Beweis, dass die Einrichtung trägt, kommt damit vom ANBIETER — von der
einzigen Stelle, die ihn führen kann. Unsere eigene Analytics bleibt unberührt, weil der
Riegel dieser Phase das Ereignis aus `events` heraushält.

**DER PREIS STEHT DANEBEN UND WIRD NICHT WEGGESCHRIEBEN: DER TESTKLICK ZÄHLT BEIM ANBIETER
ALS ECHTE CONVERSION.** Er fliesst in dessen Berichterstattung und in dessen Optimierung.
Wer diese Phase als "Testen ohne Nebenwirkung" verkauft, verkauft etwas, das kein Anbieter
dieses Rahmens liefert.

**RICHTIGGESTELLT AM 2026-09-08, NICHT GESTEMPELT — DIE ANNAHME, DIE DIESE PHASE TRUG, IST
WIDERLEGT.** Hier stand als Gegenstand, der Kunde könne prüfen, "ohne die echten Zahlen zu
berühren". Das ist für die Zahlen des ANBIETERS falsch: Meta sagt ausdrücklich, ein so
markiertes Ereignis werde nicht verworfen und fliesse in Targeting und Messung. Ersetzt
und nicht gestempelt, weil dieser Abschnitt der Massstab ist, gegen den zugeschnitten
wird. PROVENIENZ: GELESEN 2026-09-08; Volltext in docs/ziel-befunde.md, Abschnitt "Meta
(Conversions API)", Teil (a). **KEINE MESSUNG.**

### Der Träger des Zustands ist eine FRIST, kein Boolean

**Aktiv heisst: der Ablaufzeitpunkt liegt in der Zukunft.** Nicht: ein Schalter steht auf
wahr. **DIE ENTSCHEIDUNG BLEIBT — IHRE BEGRÜNDUNG IST EINE ANDERE GEWORDEN.**

**DER NEUE GRUND IST UNSERER UND NICHT METAS, und genau deshalb trägt er:** Der Riegel
dieser Phase nimmt ein Ereignis im Testmodus aus `events` heraus. Bleibt der Testmodus
hängen, hört die Analytics des Kunden STILL auf zu zählen, während der Anbieter
weiterzählt. Er sieht dann eine Kurve, die gegen null läuft, und keinen Grund dafür —
kein Fehler, keine leere Seite, keine rote Zahl. **EINE FRIST DECKELT GENAU DIESEN
SCHADEN**, weil sie die Dauer des blinden Fensters begrenzt.

**EINE FRIST LÄUFT VON ALLEIN AB. EIN BOOLEAN BLEIBT HÄNGEN.** Ein Boolean braucht eine
zweite Handlung desselben Menschen, der die erste vergessen hat — und die einzige
Erinnerung daran wäre eine Anzeige, die er ebenfalls nicht ansieht. Die Frist braucht
niemanden.

**RICHTIGGESTELLT AM 2026-09-08, NICHT GESTEMPELT.** Hier stand als Grund: "Ein vergessener
Testmodus markiert ECHTE Käufe als Test. Sie verschwinden lautlos aus der Optimierung des
Anbieters, während das Werbebudget weiterläuft." **DAS IST WIDERLEGT** — die markierten
Ereignisse verschwinden bei Meta gerade NICHT aus der Optimierung (docs/ziel-befunde.md,
Abschnitt "Meta (Conversions API)", Teil (a); GELESEN 2026-09-08, KEINE Messung). Der
gestrichene Grund zeigte in die falsche Richtung: Er befürchtete zu WENIG Zählung beim
Anbieter, tatsächlich droht zu wenig Zählung bei UNS.

**DIE WIDERLEGTE BEGRÜNDUNG STEHT IM ARCHIV WEITER, UND DIESER SATZ IST DER EINZIGE
SCHUTZ DAGEGEN:** In docs/claude-history/future-roadmap.md, Abschnitt "Tracking-Testmodus
für Kunden", steht sie unverändert — dort als "ECHTES RISIKO" bezeichnet, mit demselben
Bild vom weiterlaufenden Budget. **Jene Datei ist ein ARCHIV und wird nicht rückwirkend
geändert** (docs/immer-beachten.md, "ANGEWANDTE MIGRATIONEN WERDEN NICHT NACHTRÄGLICH
UMGESCHRIEBEN", dieselbe Denkfigur für Historien). Wer dort liest und diesen Absatz nicht
kennt, übernimmt den falschen Grund ein zweites Mal.

**WAS AUS JENER STELLE UNBERÜHRT GILT:** die FORM-Anforderung "kein stiller Dauer-Toggle —
Auto-Ablauf nach X Stunden und/oder unübersehbarer Dashboard-Banner". Sie ist von der
Widerlegung nicht betroffen, weil sie eine Bauform fordert und keine Wirkung behauptet.
Diese Phase löst ihre erste Hälfte ein; die zweite (der Banner) ist Sache der
Oberflächen-Scheibe.

### Reichweite: meta und tiktok — und ausdrücklich sonst keines

**MIT DABEI:**
- **meta** — Träger ist ein Feld in der NUTZLAST (`test_event_code`). GEMESSEN am Repo
  (CC, 2026-09-08); der Weg selbst ist in Phase 6 live bewiesen.
- **tiktok** — Träger ist ebenfalls ein Feld in der Nutzlast (`test_event_code`), aber aus
  einer EIGENEN Variablen. GEMESSEN am Repo (CC, 2026-09-08).

**NICHT DABEI, je mit dem Grund — und die Gründe sind DREI VERSCHIEDENE, keine
Sammelbegründung:**
- **pinterest — ANDERER TRÄGER, UND SEIN NAME IST UNEINHEITLICH.** Der Testmodus ist dort
  kein Nutzlast-Feld, sondern ein QUERY-PARAMETER an der Endpunkt-URL. Dazu trägt er in
  der Anbieter-Doku ZWEI Namen: die Conversions-Seite sagt `test=true`, die
  Rate-Limit-Seite für DENSELBEN Endpunkt sagt `is_test=TRUE` (GELESEN 2026-08-20,
  docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (p)(1)). **NIE
  GEMESSEN** — kein Lauf gegen die Schnittstelle hat entschieden, welcher der beiden
  greift.
- **google — DER TESTMODUS SCHNEIDET DEN KANAL AB, DER VERARBEITUNG BELEGT.** Der einzige
  benannte Träger ist `validateOnly`, ein Boolean auf der Wurzelebene der Anfrage; mit
  `validateOnly=true` ist KEINE Diagnostik abrufbar (GELESEN 2026-08-24,
  docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)",
  Katalog-Antwort H1). Ein Testmodus, dessen Einschalten die Beobachtung ausschaltet,
  leistet das Produktversprechen dieser Phase nicht.
- **linkedin — NICHT-TREFFER.** "kein Testmodus gefunden — ein NICHT-TREFFER, KEIN Beweis
  der Abwesenheit" (GELESEN 2026-08-11, docs/ziel-befunde.md, Abschnitt "LinkedIn
  (Conversions API)"). Es gibt nichts anzusteuern.

**DIE AUSSCHLÜSSE SIND KEINE ENDGÜLTIGEN URTEILE ÜBER DIE ZIELE**, sondern über den
heutigen Kenntnisstand. Fällt bei pinterest eine Messung, oder findet sich bei google ein
Weg, der die Diagnostik nicht kappt, ist das eine EIGENE Runde — und der Zustand je
(Projekt, Ziel), den 11.3a baut, hat für sie bereits die Form.

### Abgrenzung zu Phase 11.4 — 11.3 baut die MARKIERUNG, 11.4 den AUSLÖSER

**11.3 macht ein Ereignis als Test ERKENNBAR**, wenn es ohnehin durch den Ingest läuft. Es
entsteht dadurch kein einziges Ereignis, das es ohne die Phase nicht gäbe.

**11.4 wäre das Gegenteil: ein Knopf, der ein Ereignis ERZEUGT** und dem Nutzer sagt, was
daraus geworden ist. Diese Phase baut davon NICHTS — keinen Testknopf, keinen Rückkanal
vom Anbieter, keinen Lesepfad, der ein Ergebnis anzeigt.

**WARUM DIE TRENNUNG TRÄGT UND KEINE FORMSACHE IST:** An der Roadmap-Zeile 11.4 steht
GEMESSEN, was dem Testknopf in Wahrheit fehlt — "ein Lesepfad, ein Rückkanal und eine
Maskierung — NICHT die Adapter" (docs/roadmap.md). Keines der drei entsteht hier, und
keines wird hier gebraucht. Wer sie in diese Phase zieht, baut 11.4 unter der Nummer 11.3,
und deren unentschiedene Vorfrage — was beim Druck auf den Knopf überhaupt aufgerufen wird
— steht dann mitten in einer Scheibe, die sie nicht beantworten kann.

## Ausgangslage — was am 2026-09-08 gemessen und gelesen ist

Erhoben in der Aufklärungs-Runde vom 2026-09-08. **Die Orte sind Symbolnamen, keine
Zeilennummern.**

### Die Achse der Code-Suche, damit die Nicht-Treffer eine Reichweite haben

Begriffe: `test_event_code` · `testmodus` · `test.?mode` · `testEventCode` · `test_event`
· `testknopf` · `TEST_MODE` · `validateOnly` · `sandbox`. **Case-INSENSITIV. ZEILENWEISE,
NICHT mehrzeilig** — eine über einen Zeilenumbruch getrennte Schreibung entginge dieser
Suche, und das ist eine benannte Lücke. **Testdateien EINGESCHLOSSEN.** Suchraum: `src/`,
`supabase/`, `docs/`, Repo-Wurzel; Dateitypen `*.ts *.tsx *.sql *.md *.json`;
ausgeschlossen `.git/`, `node_modules/`, `.next/`, `.playwright-mcp/`.

**POSITIVKONTROLLE:** Dieselben Flags und derselbe Suchraum mit Begriffen, die in allen
drei Bäumen vorkommen, trafen 95 Dateien (`src/` 63, `supabase/` 13, `docs/` 19).
**NEGATIVKONTROLLE:** ein erfundener Begriff traf 0. Der Apparat erreicht also alle Bäume
und meldet nicht pauschal Erfolg.

### Die drei vorhandenen Träger (GEMESSEN am Repo, CC, 2026-09-08)

- **meta:** `META_TEST_EVENT_CODE` in `src/lib/capi/config.ts` (aus der gleichnamigen
  Umgebungsvariablen, getrimmt, sonst leer). Verwendet in `forwardToMeta`
  (`src/lib/capi/meta-forward.ts`): setzt `payload.test_event_code` nur bei gesetztem
  Wert. Der Kommentar dort sagt wörtlich "dev-only" und "NIE hartcodiert / in Prod".
- **pinterest:** `testModeQuery` in `src/lib/capi/pinterest-forward.ts` — liefert bei
  gesetztem `PINTEREST_TEST_MODE` den Query-Anhang `?test=true`, sonst nichts. **Gelesen
  bei JEDEM Aufruf, nicht beim Laden des Moduls.**
- **tiktok:** `testEventCode` in `src/lib/capi/tiktok-forward.ts` — liest
  `TIKTOK_TEST_EVENT_CODE` und setzt `payload.test_event_code`. Der Kommentar dort hält
  ausdrücklich fest, dass diese Datei Metas Variable NIRGENDS liest; ein Test (T18)
  sichert es.

**EINE VIERTE, LEICHT ZU ÜBERSEHENDE WIRKUNG DERSELBEN VARIABLEN:** `META_TEST_EVENT_CODE`
steuert im Ingest zusätzlich eine Dev-Dummy-IP. Fehlt eine Client-IP UND ist die Variable
gesetzt, wird eine feste öffentliche Dummy-IP eingesetzt (`src/lib/capi/ingest.ts`). **Das
ist ein ZWEITER Nebeneffekt derselben Variablen und hat mit dem Testmodus des Anbieters
nichts zu tun** — er ist der Grund, warum neun Handler-Testdateien die Variable in ihrer
Config-Fabrik auf leer setzen.

### Die Nicht-Treffer im Code (GEMESSEN am Repo, CC, 2026-09-08, Achse oben)

- `src/lib/capi/linkedin-forward.ts` — kein Testmodus-Symbol, kein Nutzlast-Feld, keine
  eigene Umgebungsvariable.
- `src/lib/capi/google-forward.ts` — kein Testmodus-Symbol. In
  `src/lib/capi/google-payload.ts` steht `validateOnly` ausschliesslich als KOMMENTAR,
  wörtlich: "ein Instrument der MESSUNG, nicht der Nutzlast". **KEIN Code setzt es.**
- `supabase/` — **0 Treffer auf der gesamten Achse.** Es gibt heute keine Spalte, keinen
  CHECK und keine Migration zum Thema Testmodus. Die Positivkontrolle traf diesen Baum
  13-mal, er wurde also erreicht.

### Die Anbieter-Befunde (GELESEN, je mit Datum)

- **linkedin:** "kein Testmodus gefunden — ein NICHT-TREFFER, KEIN Beweis der Abwesenheit"
  (GELESEN 2026-08-11 an fremder Anbieter-Doku; docs/ziel-befunde.md, Abschnitt "LinkedIn
  (Conversions API)"). Die Datei kennzeichnet diese Lesung ausdrücklich als "NICHT
  gemessen, NICHT live bestätigt".
- **google:** `validateOnly`, ein Boolean auf der Wurzelebene (GELESEN 2026-08-24;
  Katalog-Antwort H1). **DER PREIS STEHT IM BEFUND SELBST:** mit `validateOnly=true` ist
  keine Diagnostik abrufbar — der Testmodus schneidet genau den Kanal ab, der die
  Verarbeitung belegt. Dazu Teil (d) (GELESEN 2026-09-02): **kein Testkonto, keine
  Sandbox**, als Nicht-Treffer mit ausgewiesener Achse und Zeichenzahlen, und mit dem
  eigenen Vorbehalt "KEINE ENTWARNUNG — drei Seiten sind nicht der ganze Baum". Was
  `validateOnly` tatsächlich prüft, ist dort ausdrücklich "AN DER DOKU NICHT
  ENTSCHEIDBAR".
- **pinterest:** die Namens-Spannung `test=true` gegen `is_test=TRUE` für denselben
  Endpunkt (GELESEN 2026-08-20, Teil (p)(1)). Dazu Teil (m): drei Kandidaten für ein
  Live-Test-Instrument, **"keiner geprüft"**, darunter die Test-Ereignis-Ansicht im
  Werbekonto, für die die Doku eine Sandbox nennt ("test data is not processed for
  reporting or optimization").

### Die Design-Anforderung aus der Vorplanung (GELESEN 2026-09-08 an der Datei)

`docs/claude-history/future-roadmap.md`, Abschnitt "Tracking-Testmodus für Kunden", führt
das Vorhaben mit drei Teilen: der Idee, einer als "recherchiert, nicht angenommen"
gekennzeichneten technischen Korrektur (`test_event_code` sei ausschliesslich ein
CAPI-/Server-Feld; der Client-Pixel brauche keine Änderung) und einem als "ECHTES RISIKO"
bezeichneten Punkt — dem vergessenen Testmodus, der echte Käufe lautlos aus der
Optimierung nimmt. Daraus die Anforderung "kein stiller Dauer-Toggle".

**DIE AUFLAGE AUS DERSELBEN STELLE IST AM 2026-09-08 AUF DER DOKU-ACHSE EINGELÖST — UND
IHR ERGEBNIS IST EINE WIDERLEGUNG.** Die Datei verlangt selbst, "Metas eigene Doku zur
Ausschluss-Regel von test_event_code aus der Optimierung nochmal [zu] verifizieren, nicht
nur aus dieser Einschätzung [zu] übernehmen". Das ist geschehen: **Es gibt keine
Ausschluss-Regel.** Meta sagt das Gegenteil — ein markiertes Ereignis wird nicht verworfen
und fliesst in Targeting und Messung.

**DER VOLLTEXT DES BEFUNDS STEHT NICHT HIER, SONDERN IN docs/ziel-befunde.md**, Abschnitt
"Meta (Conversions API)", Teil (a) — mit Zitat, URL und Datum. Hier steht ein ZEIGER und
ausdrücklich keine zweite Fassung: zweimal geschrieben liefen sie auseinander, und die
Befund-Datei ist der Ort, an dem Anbieter-Befunde geführt werden.

**WAS DAMIT WEITERHIN OFFEN IST, und der Satz gehört dazu, sonst liest sich die Auflage als
erledigt:** Beantwortet ist die DOKU-Achse. **EINE MESSUNG GEGEN DIE SCHNITTSTELLE STEHT
AUS** — es ist kein Aufruf gefahren worden, und eine Doku-Aussage ersetzt keine Messung.
Wer die Auflage als abgehakt führt, hebt eine Lesung auf den Rang einer Messung.

**RICHTIGGESTELLT AM 2026-09-08, NICHT GESTEMPELT.** Hier stand, die Auflage sei "BIS HEUTE
OFFEN" und ob ein markiertes Ereignis aus der Optimierung falle, sei "nirgends GEMESSEN und
nirgends mit Datum GELESEN". Der zweite Halbsatz ist mit dem Crawl desselben Tages überholt;
der erste war es damit auch.

### Die Lücke, die beim Zuschnitt der TikTok-Hälfte gebraucht wird — VERORTET, NICHT GESCHLOSSEN

**docs/ziel-befunde.md TRÄGT SEIT COMMIT cbdd1c9 EINEN META- UND EINEN TIKTOK-ABSCHNITT**,
und der TikTok-Befund hat seinen Ort: Abschnitt "TikTok (Events API 2.0)", Teil (f). Wer
"wechselt pro Sitzung" nachschlagen will, schlägt dort nach.

**DIE URSPRÜNGLICHE MESSUNG WAR FÜR IHREN ZEITPUNKT RICHTIG UND WIRD NICHT ALS FEHLER
DARGESTELLT.** Hier stand, die Datei habe weder einen Meta- noch einen TikTok-Abschnitt und
der Befund habe dort keinen Ort — GEMESSEN am Dateitext (CC, 2026-09-08, Vormittag), als
die Datei genau drei Ziel-Abschnitte trug. **WAS ABLÄUFT, IST NICHT DIE ZAHL, SONDERN DER
AUFTRAG, DEN SIE TRUG:** Die Messung sollte eine fehlende Ablage anzeigen; die Ablage
existiert seither, und damit hat die Anzeige ihren Gegenstand verloren. Sie ist deshalb
ersetzt und nicht gestempelt — eine Standdatei ist ein Massstab, und ein Massstab, der auf
eine nicht existente Leerstelle zeigt, schickt den nächsten Leser ins Leere.

**WAS INHALTLICH UNVERÄNDERT OFFEN BLEIBT — und das ist der Grund, warum dieser
Unterabschnitt nicht entfällt:** Die H1-Matrix in docs/ziel-fragenkatalog.md führt TikToks
Testmodus als **GEMESSEN** — wörtlich: "`test_event_code` in der Nutzlast, wechselt pro
Sitzung, gem". **DIESE ANGABE IST WEITERHIN ALLEIN DURCH DIE MESSUNG VOM 2026-08-11
GETRAGEN, UND DEREN PROTOKOLL LIEGT IM REPO NICHT VOR** — was beobachtet wurde und mit
welcher Gegenkontrolle, steht nirgends. Das Einzige, was im Code dazu steht, ist ein
Kommentar in `src/lib/capi/tiktok-forward.ts`, der eine Messung "2026-08-11, im Testmodus
eines eigenen Werbekontos" nennt. **DIE DOKU STÜTZT DIE ANGABE NICHT UND WIDERLEGT SIE
NICHT** (docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teile (e) und (f)).

**DIE LÜCKE IST DAMIT VERORTET, NICHT GESCHLOSSEN.** Verortet heisst: man weiss jetzt, wo
der Befund steht und worauf er ruht. Geschlossen wäre er erst, wenn ein Protokoll vorläge
oder eine neue Messung ihn trüge. **WER DIE VERORTUNG FÜR DIE SCHLIESSUNG HÄLT, HÄLT EINE
ABLAGE FÜR EINEN BELEG.**

**WARUM DAS DEN ZUSCHNITT BERÜHRT:** "wechselt pro Sitzung" ist die Aussage, an der hängt,
ob ein Testcode ein DAUERHAFT abgelegter Wert sein kann oder bei jedem Testlauf neu
beschafft werden muss. Für meta ist der Code ein Wert, den der Kunde aus dem
Events-Manager kopiert. **Für tiktok ist genau das UNGEPRÜFT** — und eine Ablage, die
einen pro Sitzung wechselnden Wert wie einen dauerhaften behandelt, ist ab dem zweiten
Testlauf falsch, ohne dass etwas rot wird. **HIER WIRD NICHTS ENTSCHIEDEN**; die Lücke
steht, damit die TikTok-Hälfte sie nicht übersieht.

## Scheibe 11.3a — Der Testzustand und der Riegel im Ingest

Die erste Scheibe legt einen projekt-eigenen Testzustand ab und lässt den Ingest ihn
lesen. Sie baut keine Oberfläche.

**GEBAUT UND LIVE BEWIESEN AM 2026-09-09.** Der Nachweis steht in VERMERK 1 unter
"Scheiben-Vermerke"; die Entscheidungen, die über diese Scheibe hinaus binden, stehen als
(2) bis (7) unter "Entscheidungen, die über ihre Scheibe hinaus binden".

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-09.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist entweder unten stehengeblieben oder unter die
Entscheidungen gezogen. **Die Titel werden ohne Markierungszeichen zitiert** — sonst
kollidierte das Zitat dauerhaft mit jeder gleichlautenden Überschrift.

- "Was sie baut" — abgelaufen. Die FORM DER ABLAGE, die dort ausdrücklich offen stand,
  ist entschieden und steht als (2). Der Grund für SERVER-AUTORITATIV und die Auflage,
  aus derselben Quelle zu lesen wie der Forward-Pfad, sind darin aufgegangen.
- "Die Invariante, die den Riegel trägt" — abgelaufen, weil sie EINGELÖST ist: Der
  Confirm-Zweig ist eigens ausgenommen, der Wächter dagegen heisst TM2, und
  Pflicht-Mutation 1 hat ihn geprüft (VERMERK 1). Die Regel selbst steht als (3).
- "Ausdrücklich NICHT mit, je mit Grund" — abgelaufen bis auf die Dev-Dummy-IP, die
  unten stehenbleibt. Oberfläche, Testknopf und die drei nicht behandelten Ziele sind
  Gegenstand anderer Scheiben und stehen unter "Gegenstand der Phase".
- "Der Live-Nachweis der Scheibe — zwei Läufe auf EINER Achse" — abgelaufen, weil
  gefahren. Was er verlangte und was herauskam, steht in VERMERK 1. Die AUFLAGE, dass
  der Testklick beim Anbieter zusätzlich in den normalen Zahlen erscheint, bleibt als
  Teil der Entscheidung (1) bestehen.
- "Was die Scheibe offen lässt" — abgelaufen. Die Ablage ist entschieden (2); die LÄNGE
  der Frist bleibt unten stehen, weil sie 11.3b bindet; ob der Testcode dauerhaft
  ablegbar ist, ist für meta beantwortet (Vorrat (4), gestrichen) und für tiktok als
  Vorrat (14) neu eingetragen.

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DIE DEV-DUMMY-IP BLEIBT ALLEIN AN `META_TEST_EVENT_CODE` HÄNGEN.** Der Projekt-Zustand
  löst sie NICHT aus. GRUND: Sie ist ein Entwicklungs-Behelf für einen fehlenden
  Client-IP-Wert, kein Bestandteil des Testmodus — sie hängt nur historisch an derselben
  Variablen. Wer sie mitzieht, setzt in einem Kundenprojekt eine erfundene IP als
  Identitäts-Merkmal an einen Anbieter. Der Wächter dagegen ist TM8, und er trägt eine
  eigene Positivkontrolle: ohne sie wäre die Abwesenheits-Behauptung auch dann grün, wenn
  es die Dummy-IP gar nicht mehr gäbe.
- **DIE LÄNGE DER FRIST** und wer sie bestimmt (fester Wert, Auswahl, freie Eingabe) ist
  **hier NICHT gesetzt** — ohne Oberfläche wählt sie niemand. Sie bindet 11.3b.
  NACHGETRAGEN 2026-09-09: Die GRÖSSENORDNUNG ist seit der Owner-Angabe zu Metas
  wechselndem Testcode nicht mehr auf Verdacht gewählt (s. Vorrat (4), gestrichen).

### Die Env-Variablen bleiben — und der Riegel hängt NICHT an ihnen

- **`META_TEST_EVENT_CODE`, `TIKTOK_TEST_EVENT_CODE` und `PINTEREST_TEST_MODE` bleiben
  unverändert bestehen.** Sie tragen den Eigenbetrieb des Owners und werden von dieser
  Phase nicht abgeschafft. **Ihr heutiges Verhalten ändert sich nicht** — sie hängen
  weiterhin ihren Wert an die Nutzlast, deployment-weit, wie bisher.
- **DER PERSIST-RIEGEL HÄNGT ALLEIN AM PROJEKT-ZUSTAND.** Eine gesetzte Env-Variable
  nimmt KEIN Ereignis aus `events` heraus — bei keinem Projekt, unter keinen Umständen.
- **DER VORRANG DES PROJEKT-ZUSTANDS GILT NUR DEM NUTZLAST-FELD.** Tragen beide Wege einen
  Code, gewinnt der des Projekts; das ist eine Aussage darüber, WELCHER Code gesendet wird,
  und über nichts sonst.

**NACHGETRAGEN AM 2026-09-09 — DIE ERSTE HÄLFTE IST SEIT DIESEM TAG LIVE GEMESSEN, DIE
ZWEITE AUSDRÜCKLICH NICHT:**
- **"DER PERSIST-RIEGEL HÄNGT ALLEIN AM PROJEKT-ZUSTAND" IST GEMESSEN, nicht mehr nur im
  Unit-Test behauptet.** Beim Live-Test stand `META_TEST_EVENT_CODE` in Vercel GESETZT —
  und LAUF 1 hat trotzdem persistiert. Eine gesetzte Umgebungsvariable nimmt also
  tatsächlich kein Ereignis aus `events` heraus. GEMESSEN LIVE, 2026-09-09, Stefan;
  Volltext in VERMERK 1.
- **DER VORRANG SELBST IST UNGEMESSEN GEBLIEBEN.** Beide Quellen trugen an jenem Tag
  DENSELBEN Wert; kein Instrument des Laufs kann zeigen, welche gewonnen hat. Das ist
  ein offener Punkt (Vorrat (10)) und **keine bestandene Probe**. Im Unit-Test deckt ihn
  TM6, in beide Richtungen.

**RICHTIGGESTELLT AM 2026-09-08, NICHT GESTEMPELT — DER ALTE SATZ WAR ZU BREIT UND HÄTTE
DEN MANDANTENFEHLER ZURÜCKGEHOLT, DEN DIESE PHASE BESEITIGT.** Hier stand: "SIND BEIDE WEGE
GESETZT, GEWINNT DER PROJEKT-ZUSTAND. Der spezifischere Wert schlägt den deployment-weiten."
Das liest sich als Aussage über den GANZEN Testmodus, also auch über den Riegel — und
daraus folgte, dass eine in Produktion gesetzte Env-Variable ALLE Projekte still in den
Testmodus schaltet und ihre Analytics gemeinsam verstummen lässt. **Genau die
deployment-weite Reichweite, die der Gegenstand dieser Phase als den Mangel benennt.** Der
Satz war als Aussage über den Nutzlast-Wert richtig gemeint und als Aussage über den Riegel
falsch; er ist deshalb ersetzt und nicht gestempelt.

## Entscheidungen, die über ihre Scheibe hinaus binden

### (1) SICHTBARKEIT STATT ISOLATION

**DIE ENTSCHEIDUNG:** Die Phase liefert dem Kunden den Nachweis, dass sein Ereignis beim
Anbieter ANKOMMT. Sie liefert ihm NICHT die Zusicherung, dass dieses Ereignis die Zahlen
des Anbieters unberührt lässt. Was gebaut wird, ist eine MARKIERUNG mit einem Riegel auf
unsere eigene Ablage — keine Isolation beim Empfänger.

**DER GRUND:** Isolation ist bei den Zielen dieses Rahmens nicht zu haben. Meta erklärt
ausdrücklich, dass markierte Ereignisse in Targeting und Messung fliessen; bei google
schneidet der einzige Träger die Beobachtung ab, die den Nachweis erst tragen würde; bei
pinterest ist der Träger nie gemessen und trägt zwei Namen; bei linkedin gibt es keinen.
**Eine Phase, die Isolation verspricht, verspricht etwas, das kein Anbieter liefert** —
und ein Produktversprechen, das der Anbieter nicht deckt, fällt dem Kunden auf die Füsse,
nicht uns.

**WEN SIE BINDET:** jede spätere Scheibe dieser Phase, jede Oberfläche, die den Testmodus
beschriftet, und jeden Text, der ihn dem Kunden erklärt. **Der Preis wird mitgenannt, nicht
weggeschrieben:** der Testklick zählt beim Anbieter als echte Conversion.

**IHRE GRENZE — WORAUF SIE RUHT:** auf einer DOKU-LESUNG vom 2026-09-08 (Meta), **NICHT
auf einer Messung**. Es ist kein Aufruf gegen eine Schnittstelle gefahren worden. Für
tiktok ruht sie nicht einmal darauf: dort ist die Frage ungelesen UND ungemessen (s.
Vorrat), und die Entscheidung überträgt sich auf tiktok als VORSICHT, nicht als Befund.

**WANN SIE KIPPT:** wenn eine MESSUNG zeigt, dass ein markiertes Ereignis beim Anbieter
doch aus Berichterstattung oder Optimierung fällt — oder wenn ein Anbieter sein Verhalten
ändert, ohne dass hier etwas rot wird. Dann ist die Rahmung neu zu fassen; die Bauform (ein
Zustand je (Projekt, Ziel), getragen von einer Frist) überlebt beides.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-08, auf GELESENER Grundlage
(docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)", Teil (a)).

**DIE VERWORFENE ALTERNATIVE — ISOLATION OHNE ANBIETER.** Sie gehört zu dieser
Entscheidung und ist kein zweiter Beschluss: eine Entscheidung ohne ihr Gegengewicht liest
sich wie die einzige Möglichkeit, und dann wird die Alternative beim nächsten Mal als
Einfall präsentiert statt als erwogene und verworfene Option.

**WAS SIE GEWESEN WÄRE:** gar nicht senden — und dem Kunden zeigen, was gesendet worden
WÄRE. Ein Trockenlauf also, der die Nutzlast baut, sie darstellt und den Aufruf unterlässt.
**IHRE ZWEI ECHTEN VORZÜGE, und sie werden hier nicht kleingeredet:** Sie vermeidet die
echte Conversion vollständig — der Preis, den die getroffene Entscheidung ausdrücklich
mitträgt, entfiele. Und sie trägt **alle fünf Ziele gleich**, weil sie von keinem Anbieter
etwas verlangt: kein Träger, kein Parameter, keine Test-Ansicht, keine Messung. Die drei
Ausschlüsse unter "Reichweite: meta und tiktok — und ausdrücklich sonst keines" wären
hinfällig.

**WARUM SIE TROTZDEM FÄLLT — DER TRAGENDE SATZ: IHR BEWEIS KÄME VON DEM CODE, DER GEPRÜFT
WERDEN SOLL.** Ein Trockenlauf zeigt, was unser eigener Adapter zusammengesetzt hat. Er
kann prinzipiell nicht zeigen, dass es beim Anbieter ANKOMMT — und genau das ist die Frage,
die der Kunde stellt, wenn er die Einrichtung prüft. Ein Zugangsdatum kann widerrufen sein,
eine Kennung falsch, ein Feld abgelehnt, ein Ereignisname unbekannt: **all das sieht ein
Trockenlauf nicht, weil er nie fragt.** Was er anzeigt, sähe in jedem dieser Fälle
tadellos aus. **ANKUNFT IST DAS KERNVERSPRECHEN DIESES PRODUKTS** — ein Prüfwerkzeug, das
sie nicht belegen kann, prüft die eine Sache nicht, für die es da ist.

**DER ZWEITE GRUND, und er ist der zuschnitts-technische:** Sie braucht einen LESEPFAD und
eine MASKIERUNG — also genau das, was docs/roadmap.md als der Phase 11.4 fehlend führt
("ein Lesepfad, ein Rückkanal und eine Maskierung — NICHT die Adapter"). **SIE WÄRE 11.4
UNTER DER NUMMER 11.3**, und deren unentschiedene Vorfrage stünde damit mitten in dieser
Scheibe. S. den Abschnitt "Abgrenzung zu Phase 11.4 — 11.3 baut die MARKIERUNG, 11.4 den
AUSLÖSER".

**WEN DIESER ABSATZ BINDET, UND DAS IST SEIN ZWECK:** jede spätere Runde, die eine ANZEIGE
DES GESENDETEN vorschlägt — namentlich die Oberflächen-Scheibe 11.3b und die Phase 11.4.
**DIE ALTERNATIVE IST NICHT VERBOTEN.** Sie ist erwogen und mit Grund verworfen. Wer sie
neu vorschlägt, trägt gegen DIESEN Grund vor — er beginnt nicht bei null, und er muss
nicht so tun, als sei sie nie bedacht worden. **Was er nicht darf, ist sie als neuen
Einfall einbringen**, denn dann wird die Abwägung ein zweites Mal geführt, ohne dass
jemand weiss, dass es eine erste gab.

**PROVENIENZ DER VERWERFUNG:** ARCHITEKT/OWNER-ENTSCHEIDUNG 2026-09-08. Derselbe Grund
steht im Commit-Body des vorangehenden docs(claude)-Commits; **er steht hier, weil ein
Commit-Body nicht lädt** (s. den Hebungs-Kandidaten unten).

### (2) DIE ABLAGE — ZWEI ADDITIVE SPALTEN AUF project_secrets

**DIE ENTSCHEIDUNG:** Der Testzustand liegt in `project_secrets.test_event_code` (text) und
`project_secrets.test_mode_expires_at` (timestamptz), beide nullbar, zusammengehalten vom
CHECK `project_secrets_test_mode_paar` (beide gesetzt oder beide leer). Migration 0028.

**DER TRAGENDE GRUND:** Der Resolver `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`)
liest diese Tabelle in seiner ZWEITEN Abfrage ohnehin. Zwei Spalten mehr sind **eine
SPALTE, keine RUNDE** — dieselbe Bauform, in der `blocked_at`, `ab_test_active` und
`secret_enc` hinzugekommen sind, und die Zusage "GENAU ZWEI Abfragen" im Kopf jener
Funktion gilt unverändert.

**DIE DREI VERWORFENEN ALTERNATIVEN, je mit ihrem Ausscheidungsgrund** — sie stehen hier,
damit keine davon beim nächsten Mal als Einfall wiederkommt:
- **EINE EIGENE TABELLE.** Kostet eine DRITTE Datenbank-Runde JE BEACON (oder einen Join,
  der die zweite Abfrage umbaut) — auf dem Pfad, den jeder Besucher jeder Kundenseite
  trifft (CLAUDE.md, /API/E-SCHLANKHEIT). Dazu eine neue RLS-Entscheidung. **Sie kauft
  nichts, was die Spalten nicht auch liefern.**
- **SPALTEN AUF `projects`.** Die Zeile wird in Abfrage 1 ohnehin gelesen, die Achse wäre
  also billig — aber `projects` trägt EINE Zeile je Projekt. Ein Zustand je
  (Projekt, Ziel) ginge dort nur als JSON-Blob, also als zweite Blob-Wahrheit neben
  `settings`.
- **`projects.settings`.** CLIENT-besessen; `saveProject` ersetzt den Blob GANZHEITLICH.
  Ein alter Tab könnte eine bereits ABGELAUFENE Frist wiederbeleben und damit genau die
  Eigenschaft zerstören, um derentwillen die Frist gewählt wurde: dass sie von allein
  endet (docs/immer-beachten.md, "SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN
  BLOB").

**IHRE GRENZE:** Der bestehende CHECK `project_secrets_secret_genau_eines` verlangt, dass
jede Zeile GENAU EIN Geheimnis trägt. **Ein Testzustand kann damit nur dort liegen, wo
bereits Zugangsdaten hinterlegt sind.** Das ist vertretbar — ohne Zugangsdaten wird nichts
gesendet, es gäbe nichts zu prüfen —, aber es ist eine Festlegung und keine Nebenwirkung.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09 auf der Grundlage von Stufe 1, gegen
docs/db-stand.md und docs/db-regeln.md geplant; die Supabase-Lesung dazu (RLS ohne Policy,
service_role) ist im Kopf der Migration 0028 mit Datum und Fundstelle vermerkt.

### (3) DER RIEGEL HÄNGT AN MINDESTENS EINEM ZIEL, NICHT AN ALLEN

**DIE ENTSCHEIDUNG:** Steht **mindestens ein** Ziel eines Projekts im Testzustand, wird das
Ereignis nicht persistiert — **in BEIDEN Zweigen**, im Server-Zweig wie im Confirm-Zweig.

**DIE BEGRÜNDUNG, WÖRTLICH: DER ZUSTAND BESCHREIBT DIE HERKUNFT DES KLICKS, NICHT SEIN
ZIEL.** Eine `events`-Zeile ist NICHT je Ziel — sie trägt `project_id`, `event_type`,
`event_id`, `source` und `variant`, aber keine Ziel-Spalte. Sie ist eine BEOBACHTUNG, und
wer gerade seine eigene Einrichtung prüft, erzeugt keinen Kauf, gleichgültig welches Ziel
er dabei ansieht.

**DIE ZWEI VERWORFENEN KANDIDATEN:**
- **K2 — ALLE konfigurierten Ziele müssen aktiv sein.** Hätte den HALB PERSISTIERTEN
  TESTLAUF zum **REGELFALL** gemacht: Ein Kunde prüft meta, tiktok läuft weiter, die
  `events`-Zeile entsteht trotzdem und zählt als echte Conversion — während bei meta
  dasselbe Ereignis als Test markiert ankommt. Verfehlt zusätzlich den Zweck der Phase.
- **K3 — ein Riegel-Zustand je PROJEKT neben dem Code je Ziel.** Semantisch am ehrlichsten,
  aber zwei Ablagen für denselben Zustand, also zwei Wahrheiten, die auseinanderlaufen
  können. K1 erreicht dasselbe Verhalten, ABGELEITET aus den Ziel-Zeilen statt zweitens
  geführt.

**DER PREIS WIRD MITGENANNT UND NICHT WEGGESCHRIEBEN:** Die Ziele OHNE Testmodus
(pinterest, google, linkedin) bekommen den Testklick als ECHTE Conversion. Das ist keine
neue Verschlechterung, sondern die Entscheidung (1) an einer weiteren Stelle.

**IHRE GRENZE:** Sie reicht nur so weit wie die zweite Abfrage des Resolvers. Gefragt wird
nur nach Zielen, die den Kennungs-Filter passiert haben; ein Testzustand an einem Ziel OHNE
Kennung ist unsichtbar, und der Riegel feuert dann nicht.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09. Dass `events` keine Ziel-Spalte trägt, ist
GEMESSEN am Schema (CC, 2026-09-09, docs/db-stand.md).

### (4) KEIN REINES PRÄDIKAT IN DIESER SCHEIBE — EIN URTEIL, ZWEI LESUNGEN

**DIE ENTSCHEIDUNG:** Die Frage "ist dieses Projekt im Testmodus?" wird GENAU EINMAL
ausgewertet (`testModusAktiv` in `handleIngest`) und an den zwei Stellen gelesen, an denen
persistiert wird. Es entsteht **keine reine Datei** und kein geteiltes Prädikat — ein
Prädikat mit EINEM Aufrufer in ein geteiltes Haus zu legen wäre Infrastruktur auf Verdacht
(dieselbe Figur, mit der `targetReadiness` im Projekt schon einmal gestrichen wurde).

**DIE RANDREGEL IST TEIL DIESER ENTSCHEIDUNG UND NICHT IHRE FOLGE:**
**`expires === now` gilt als ABGELAUFEN. Der Vergleich lautet `>`, nicht `>=`.** Dieselbe
Wahl wie bei Uhr 1 (`hasUsableAccessToken`) und Uhr 2 (`hasLiveRefreshToken`) — die
Sekunde, in der eine Frist abläuft, gehört nicht mehr ihr. Der Wächter ist TM4c.

**SIE BINDET SCHEIBE 11.3b, und das ist ihr eigentlicher Zweck:** Jene braucht dasselbe
Prädikat für die Anzeige der Restlaufzeit. **Sie EXTRAHIERT es aus `activeTestCodeFromRow`
(`src/lib/capi/token.ts`), statt es nachzubauen.** Baut sie eine zweite Fassung und driftet
diese auf `>=`, **zeigt die Oberfläche "aktiv", während der Riegel NICHT feuert** — ein
Widerspruch, den niemand sieht, weil beide Seiten für sich plausibel aussehen.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09.

### (5) BEI EINEM LESEFEHLER FEUERT DER RIEGEL NICHT

**DIE ENTSCHEIDUNG:** Kann der Testzustand nicht gelesen werden — Datenbank-Fehler,
fehlende Zeile, unlesbarer Zeitstempel —, feuert der Riegel **nicht**, und das Ereignis
wird persistiert. Alle Früh-Ausgänge des Resolvers setzen `testMode: []`.

**DER GRUND:** Die Gegenrichtung ("im Zweifel nicht persistieren") liesse die Analytics des
Kunden bei **jedem Datenbank-Schluckauf still verstummen** — genau der Schaden, gegen den
die Frist überhaupt gewählt wurde, nur ohne Deckel und ohne Ende. Der Riegel fällt im
Zweifel auf das HEUTIGE Verhalten zurück.

**IHRE GRENZE:** Sie ist eine Aussage über den PERSIST, nicht über den Forward. Ein Ziel,
dessen Zugangsdatum unbrauchbar ist, sendet ohnehin nicht — behält aber seinen Testzustand
(TM4e), und daraus folgt ein eigener offener Punkt (Vorrat (11)).

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09.

### (6) 11.3b SCHREIBT AUSSCHLIESSLICH DIE ZWEI TESTSPALTEN, NIE DIE GANZE ZEILE

**DIE ENTSCHEIDUNG:** Der Schreibpfad der Oberflächen-Scheibe setzt `test_event_code` und
`test_mode_expires_at` — und sonst keine Spalte von `project_secrets`.

**DER GRUND:** Ein Lesen-Ändern-Schreiben über die ganze Zeile brächte **die Zugangsdaten
in einen Schreibvorgang, der sie nicht meint.** Ein Geheimnis, das nur mitreist, weil es
zufällig in derselben Zeile steht, ist genau die Bauform, aus der später ein überschriebenes
oder ein in ein Log geratenes Zugangsdatum wird.

**DIE MESSUNG, DIE DIESE REGEL STÜTZT UND SIE NICHT ERSETZT:** Die vier bestehenden
Schreibpfade machen es heute richtig — sie schreiben spaltenweise. Für den `upsert` von
`setCapiToken` ist das seit dem 2026-09-09 **GEMESSEN** (VERMERK 1, Schritt 8): Nach
erneutem Speichern des Meta-Tokens über die Oberfläche standen beide Testspalten
unverändert. **Die Regel hält fest, was heute zutrifft** — eine Messung am Bestand ist
keine Zusage für einen künftigen Pfad.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09; die stützende Messung GEMESSEN LIVE am
2026-09-09 durch Stefan.

### (7) EIN WÄCHTER ÜBER DIE SPALTENLISTE BEKOMMT SEINE ERWARTUNG NIE AUS DEM CODE

**DIE ENTSCHEIDUNG:** Die erwartete Spaltenliste des Tippfehler-Wächters in
`token.test.ts` wird **aus der ENTSCHEIDUNG und dem MIGRATIONSTEXT** geschrieben — nie aus
dem Ist-Wert des Codes, auch nicht ausschnittsweise aus einem Fehlertext.

**DER GRUND: EINE ERWARTUNG AUS DEM CODE MACHT DEN WÄCHTER ZUM SPIEGEL.** Er bestätigte
dann jeden Tippfehler, statt ihn zu fangen — und der Ausfall, gegen den er gebaut ist,
bliebe genau der, den sein eigener Kommentar beschreibt: keine Zeile, `capiConfig` null,
weiter leere 204, Server-Forward tot. Ein Wächter, der sich an seinem Prüfling ausrichtet,
prüft nichts.

**WIE ES IN DIESER SCHEIBE GEMACHT WURDE, als Muster für die nächste:** Die fünf
Spaltennamen wurden aus der Entscheidung einzeln niedergeschrieben, danach MASCHINELL
Zeichen für Zeichen gegen die `add column`-Anweisungen der Migration 0028 verglichen
(`diff` leer), und erst zuletzt wurde der Code gegen diese Liste gehalten — in dieser
Richtung, damit bei einer Abweichung der CODE korrigiert worden wäre und nicht die
Erwartung.

**IHRE REICHWEITE:** jeder Wächter über einen Wortlaut, nicht nur dieser eine — eine
Spaltenliste, eine Endpunkt-Adresse, ein Feldname in einer Nutzlast.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09; der Vollzug GEMESSEN am eigenen Lauf (CC,
2026-09-09).

## Vorrat — gemeldet, nicht gebaut

**(1) OB TIKTOK TEST-MARKIERTE EREIGNISSE MITZÄHLT WIE META — UNGELESEN UND UNGEMESSEN.**
Die Doku der Events API 2.0 sagt zu Berichterstattung und Optimierung markierter Ereignisse
NICHTS. Das ist ein Schweigen mit benannter Achse und keine Auslassung: gesucht wurde
`optimi`, `report`, `discard`, `exclud`, `drop` über den gerenderten Rumpf von sechs Seiten
(Fundstellen in docs/ziel-befunde.md, Abschnitt "TikTok (Events API 2.0)", Teil (d)).
**WEDER BESTÄTIGT NOCH WIDERLEGT** — Metas Aussage auf tiktok zu übertragen wäre eine
Annahme über ein fremdes System.
TRIGGER: die Scheibe, die den tiktok-Zweig des Riegels zuschneidet — spätestens der erste
Live-Nachweis gegen tiktok. PROVENIENZ: GELESEN 2026-09-08.

**(2) WAS METAS AUFLAGE "REMOVE IT IN PRODUCTION" BEWIRKT, WENN SIE MISSACHTET WIRD — DIE
DOKU NENNT KEINE FOLGE.** Meta verlangt, das Feld vor dem Produktiv-Rumpf zu entfernen, und
sagt im selben Abschnitt, die Ereignisse würden ohnehin nicht verworfen und flössen in
Targeting und Messung. **Was das Entfernen dann bewirkt, steht nirgends.** Solange das
offen ist, lässt sich nicht sagen, ob ein hängengebliebener Testmodus beim Anbieter
irgendeinen Schaden anrichtet — die Frist dieser Phase ist mit unserem eigenen Grund
begründet und nicht mit diesem.
TRIGGER: die erste Messung gegen die Meta-Schnittstelle, die mit und ohne das Feld
vergleicht. PROVENIENZ: GELESEN 2026-09-08.

**(3) IM TESTMODUS LAUFEN UNSERE ZAHLEN UND DIE DES ANBIETERS BEWUSST AUSEINANDER — DEM
KUNDEN ERKLÄRT DAS HEUTE NICHTS.** Wir zählen nicht, der Anbieter zählt. Das ist gewollt und
die unmittelbare Folge des Riegels. Für den Kunden sieht es aus wie ein Defekt: Sein
Dashboard steht still, während im Werbekonto Conversions auflaufen. **Es gibt heute keinen
Ort, an dem das erklärt wird** — keine Anzeige, keinen Hinweistext, keine
Betreiber-Dokumentation.
TRIGGER: die Oberflächen-Scheibe 11.3b (dort ist der Ort), spätestens der erste fremde
Nutzer, der den Testmodus einschaltet. VERWANDT mit dem offenen Punkt "BETREIBER-
DOKUMENTATION FEHLT — ZWEI PUNKTE" (CLAUDE.md). PROVENIENZ: FOLGERUNG aus dem Zuschnitt
der Scheibe 11.3a, keine Messung.

**(4) — GESTRICHEN AM 2026-09-09, FÜR META BEANTWORTET. DIE NUMMER BLEIBT STEHEN** und wird
nicht nachvergeben; ein Verweis nennt die Nummer, nicht das Datum, und er wird nicht rot,
wenn sie weiterwandert.

HIER STAND: "OB DER TESTCODE DAUERHAFT ABLEGBAR IST ODER JE TESTLAUF NEU BESCHAFFT WERDEN
MUSS. Hängt an 'wechselt pro Sitzung'. Für meta schweigt die Doku dazu (Achse `session`,
`expire`, `rotate`, `valid` über fünf Seiten); für tiktok schweigt sie ebenfalls, und der
Repo-Befund führt genau diese Eigenschaft als GEMESSEN (2026-08-11), ohne dass die Doku ihn
stützt oder widerlegt. Eine Ablage, die einen pro Sitzung wechselnden Wert wie einen
dauerhaften behandelt, ist ab dem zweiten Testlauf falsch, ohne dass etwas rot wird."
TRIGGER war: die Entscheidung über die Form der Ablage.

**DER BELEG DER ERLEDIGUNG — OWNER-ANGABE, 2026-09-09: Metas Testcode WECHSELT alle paar
Tage.** Damit ist die Frage für meta beantwortet, und zwar mit **nein**: Der Code ist kein
dauerhaft ablegbarer Wert.

**DIE FOLGE, und sie ist der eigentliche Zugewinn:** **Eine Frist von STUNDEN ist damit
gemessen richtig dimensioniert und nicht mehr auf Verdacht gesetzt.** Ein Code, der alle
paar Tage wechselt, ist nach Tagen ohnehin wertlos — eine Frist, die kürzer ist als sein
Wechselintervall, kann keinen brauchbaren Zustand vorzeitig abschneiden. Die Wahl der
Frist-Grössenordnung ruht ab jetzt auf einer Angabe über den Anbieter statt auf einer
Abwägung ohne Anhalt.

**WAS AUSDRÜCKLICH NICHT MITBEANTWORTET IST:** die Lage bei **tiktok**. Sie ist als
eigener Eintrag (14) neu eingetragen, mit ihrem eigenen Trigger — sie mit meta zusammen
abzuhaken wäre eine Annahme über ein fremdes System.

**PROVENIENZ DER STREICHUNG:** OWNER-ANGABE 2026-09-09. **KEINE Messung gegen die
Meta-Schnittstelle** — der Owner berichtet aus dem Gebrauch seines eigenen Werbekontos.

**(5) LÄUFT DIE FRIST ZWISCHEN DEM SERVER-BEACON UND DEM BESTÄTIGUNGS-BEACON AB, ENTSTEHT
EINE `browser`-ZEILE OHNE `server`-GEGENSTÜCK.** Das ist derselbe Schaden, den Invariante
I1 benennt — nur zeitlich statt strukturell verursacht: Es sind ZWEI Anfragen mit zwei
Auflösungen, und der Riegel urteilt in jeder neu. Das Fenster ist Sekunden breit, die
Frist Stunden; die Adblocker-Verlustrate würde den Lauf dann als Verlust zählen.
TRIGGER: die erste Runde, die Zustand über zwei Anfragen hinweg führt. PROVENIENZ:
ABLEITUNG aus dem gebauten Kontrollfluss (CC, 2026-09-09), **keine Messung** — der Fall
ist nicht herbeigeführt worden.

**(6) DIE UHREN-ASYMMETRIE: GESCHRIEBEN WIRD GEGEN DIE DATENBANK-UHR, GELESEN GEGEN DIE
DER LAUFZEIT.** Der Resolver vergleicht `test_mode_expires_at` gegen `Date.now()`; die
Frist entsteht (beim Live-Test und künftig in 11.3b) aus `now() + interval` in Postgres.
Weichen beide Uhren ab, verschiebt sich die effektive Dauer um genau diese Differenz, in
beide Richtungen und still. **Bei einer Frist von Stunden folgenlos — NICHT folgenlos bei
einer Frist im Sekunden- oder Minutenbereich.**
TRIGGER: die Entscheidung über die LÄNGE der Frist (11.3b). PROVENIENZ: ABLEITUNG aus dem
gebauten Lesepfad (CC, 2026-09-09); die Abweichung selbst ist **ungemessen**.

**(7) DER RIEGEL ERREICHT NUR ZIELE, DIE DEN KENNUNGS-FILTER PASSIEREN.** Die zweite
Abfrage des Resolvers fragt nur nach Zielen mit Kennung oder Zuordnung; bei
`withPixel.length === 0` kehrt er VOR ihr zurück. Ein Testzustand an einem Ziel ohne
Kennung ist damit unsichtbar, und der Testklick würde persistiert.
TRIGGER: der Schalter in 11.3b — er darf nur an konfigurierten Zielen erscheinen.
PROVENIENZ: GEMESSEN am gebauten Code (CC, 2026-09-09), `getCapiConfigByTrackingKey`.

**(8) DER PAAR-CHECK BINDET AN DIE FORM VON META UND TIKTOK.**
`project_secrets_test_mode_paar` verlangt Code UND Frist gemeinsam. **Pinterests Testmodus
ist ein QUERY-PARAMETER OHNE Code** — nimmt eine spätere Scheibe pinterest auf, muss
"Frist ohne Code" erlaubt werden, und dann wird dieser CHECK in einer EIGENEN Migration
ERSETZT, nicht nachträglich geändert.
TRIGGER: die Scheibe, die pinterest in den Testmodus aufnimmt. PROVENIENZ: ABLEITUNG aus
dem Migrationstext 0028 und dem Pinterest-Befund (GELESEN 2026-08-20).

**(9) EIN TESTZUSTAND KANN NUR DORT LIEGEN, WO BEREITS ZUGANGSDATEN HINTERLEGT SIND.**
Folge des bestehenden CHECK `project_secrets_secret_genau_eines`: jede Zeile trägt genau
ein Geheimnis, also gibt es ohne Zugangsdaten keine Zeile, an der ein Testzustand hängen
könnte. Bewusst so — aber eine Festlegung, die die Oberfläche kennen muss.
TRIGGER: der Schalter in 11.3b. PROVENIENZ: GEMESSEN am Schema (docs/db-stand.md).

**(10) WELCHE QUELLE DEN VORRANG HAT, IST UNENTSCHEIDBAR GEBLIEBEN.** Beim Live-Test vom
2026-09-09 stand `META_TEST_EVENT_CODE` in Vercel gesetzt — **mit DEMSELBEN Wert wie die
Projektzeile (TEST13317)**. Kein Instrument jenes Laufs kann zeigen, welche der beiden
Quellen gewonnen hat; die Nutzlast sähe in beiden Fällen identisch aus. **Das ist ein
offener Punkt und KEINE bestandene Probe.** Im Unit-Test deckt ihn TM6, in beide
Richtungen.
TRIGGER: ein Lauf mit **VERSCHIEDENEN** Codes in Umgebungsvariable und Projektzeile.
PROVENIENZ: GEMESSEN LIVE, 2026-09-09, Stefan (der gesetzte Env-Wert); die
Unentscheidbarkeit ist eine ABLEITUNG daraus.

**(11) EIN ZIEL MIT TESTZUSTAND, ABER UNBRAUCHBAREM GEHEIMNIS, VERLIERT DAS EREIGNIS AUF
BEIDEN SEITEN.** Der Riegel feuert (der Testzustand ist gültig), das Ereignis verschwindet
aus `events` — **und der Anbieter bekommt nichts, weil gar nicht gesendet wird.** Das ist
derselbe Schaden, den der CHECK für "Frist ohne Code" ausschliesst, nur durch eine andere
Tür: Riegel ohne Gegenwert. Der Fall ist im Test festgehalten (TM4e) und im Code bewusst so
angeordnet — der Testzustand wird VOR dem Ausstieg für unbrauchbare Zeilen eingesammelt.
TRIGGER: der Schalter in 11.3b — er darf nur an Zielen erscheinen, die tatsächlich senden
können. PROVENIENZ: GEMESSEN am gebauten Code (CC, 2026-09-09, Lauf TM4e).

**(12) DER CHECK LÄSST `test_event_code = ''` ZU.** Beide Spalten sind gesetzt, der CHECK
ist zufrieden — und der Code fällt im Resolver beim Trimmen weg, der Riegel feuert nicht.
**Der Kunde glaubt, der Testmodus laufe, und er läuft nicht.** Der CHECK prüft die
NULL-Zustände, nicht den Inhalt; ein Inhalts-CHECK stand nicht im Zuschnitt.
TRIGGER: 11.3b prüft beim Schreiben auf nicht-leer. PROVENIENZ: ABLEITUNG aus
Migrationstext 0028 und `activeTestCodeFromRow` (CC, 2026-09-09).

**(13) METAS TESTCODE WECHSELT ALLE PAAR TAGE — 11.3b MUSS DEN KUNDEN ZUM NACHTRAGEN
FÜHREN, NICHT EINMALIG ABFRAGEN.** Eine Oberfläche, die den Code wie eine Einstellung
behandelt, erzeugt ab dem zweiten Testlauf einen Zustand, der aussieht wie eingerichtet
und keiner ist. Verwandt mit (12): beide Male hält der Kunde einen toten Testmodus für
einen laufenden.
TRIGGER: der Schalter in 11.3b. PROVENIENZ: OWNER-ANGABE 2026-09-09, **keine Messung**.

**(14) OB TIKTOKS TESTCODE DAUERHAFT ABLEGBAR IST, BLEIBT OFFEN.** Die zweite Hälfte des
gestrichenen Eintrags (4): Für meta ist die Frage mit "nein" beantwortet, für tiktok
NICHT. Der Repo-Befund führt "wechselt pro Sitzung" als GEMESSEN (2026-08-11), ohne dass
ein Protokoll dazu im Repo vorliegt; die Doku stützt es weder noch widerlegt sie es.
**Metas Antwort auf tiktok zu übertragen wäre eine Annahme über ein fremdes System** —
zumal "pro Sitzung" und "alle paar Tage" nicht dasselbe sind.
TRIGGER: die Scheibe, die den tiktok-Zweig zuschneidet — spätestens der erste
Live-Nachweis gegen tiktok. PROVENIENZ: GELESEN 2026-09-08 (Doku-Schweigen) plus der
GEMESSENE Repo-Befund vom 2026-08-11; die Abgrenzung gegen meta ist OWNER-ANGABE
2026-09-09.

## Hebungs-Kandidaten

Hierher gehört, was am Phasenende in docs/immer-beachten.md, in CLAUDE.md oder ins Backlog
gehoben werden könnte — als KANDIDAT, ohne Auswahl.

### (1) EINE VERWORFENE ALTERNATIVE, DIE NUR IM COMMIT-BODY STEHT, IST FÜR KÜNFTIGE RUNDEN VERLOREN

**DIE BEOBACHTUNG:** docs/arbeitsweise.md weist der verworfenen Alternative den COMMIT-BODY
als Ort zu. **EIN COMMIT-BODY LÄDT NICHT.** Eine spätere Instanz liest Dateien — die
Standdatei als Pflicht-Gate, CLAUDE.md und docs/immer-beachten.md unbedingt, die
auslöser-geladenen bei ihrem Auslöser. Sie liest **nicht** `git log`, und nichts in ihrem
Startkontext verweist sie dorthin.

**DIE FOLGE:** Eine Alternative, die ausschliesslich im Body abgelegt ist, existiert für
künftige Runden faktisch nicht. Sie wird nicht als überholt erkannt und nicht als erwogen —
sie wird beim nächsten Mal neu vorgeschlagen, und die Abwägung läuft ein zweites Mal, ohne
dass jemand von der ersten weiss.

**DIE VERSCHÄRFUNG, die diesen Kandidaten von einer blossen Unbequemlichkeit trennt:** Der
Body ist unveränderlich. Wird der Verlust bemerkt, lässt sich der Text nur an einem ANDEREN
Ort nachtragen — und dann steht dieselbe Aussage zweimal, in einem unveränderlichen und
einem gepflegten Exemplar. Genau die Bauform, die dieses Repo an mehreren Stellen als
Fehlerquelle führt.

**GEMESSEN AN DIESER PHASE (CC, 2026-09-08):** ZWEI verworfene Alternativen, **beide nur im
Body**.
· Die eine — "Isolation ohne Anbieter" — ist am 2026-09-08 nachträglich in diese Datei
  geholt worden, an die Entscheidung (1).
· Die andere — "nur meta in der ersten Scheibe" — ist bewusst NICHT geholt worden, weil sie
  mit ihrer Scheibe abläuft: Ist 11.3a gebaut, gibt es keine erste Scheibe mehr, in der man
  meta allein hätte bauen können.
**DIESE ZWEITE HÄLFTE IST DER GRUND, WARUM HIER NICHTS ENTSCHIEDEN WIRD.** Sie zeigt, dass
der Verlust NICHT immer einer ist — manche Alternativen sollen ablaufen, und für die ist
der Commit-Body genau der richtige Ort. Eine Regel, die alle Alternativen in eine Datei
zwänge, produzierte Altlast; eine, die keine hineinliesse, verlöre die dauerhaften. **WO
DIE GRENZE LIEGT, IST NICHT ERHOBEN.**

**NICHT ENTSCHIEDEN:** ob daraus eine Regel wird · ob docs/arbeitsweise.md einen
ÄNDERUNGSANTRAG braucht (Weg 7 in CLAUDE.md, "## Aktive Dokumente" — der INHALT jener Datei
wird nicht von CC entschieden) · oder ob es beim Einzelfall dieser Phase bleibt.
**KEINE EMPFEHLUNG.**

**PROVENIENZ:** Dass ein Commit-Body nicht lädt, ist eine Eigenschaft des Startkontexts und
hier NICHT eigens gemessen — es ist am Ladeverhalten dieser Sitzung ABGELESEN. Die Zählung
der zwei Alternativen dieser Phase ist GEMESSEN am Repo und an den Commit-Bodies (CC,
2026-09-08).

**DASS docs/arbeitsweise.md DEN COMMIT-BODY ALS ORT FÜHRT, IST BESTÄTIGT — ARCHITEKT, am
WORTLAUT jener Datei, 2026-09-08.** Sie nennt als Inhalt des Bodys ausdrücklich "eine
verworfene Alternative, eine Messung, die die Entscheidung getragen hat". Die Prämisse
dieses Kandidaten steht damit nicht auf einer Behauptung, sondern auf einer gelesenen
Stelle.
**DIE ZWEITE HÄLFTE BLEIBT DANEBEN STEHEN UND IST KEIN VORBEHALT MEHR, SONDERN EINE ANGABE
ÜBER DEN ZUGANG: CC KANN DAS NICHT SELBST PRÜFEN.** docs/arbeitsweise.md ist CC nicht als
Arbeitsgrundlage zugänglich (CLAUDE.md, "## Aktive Dokumente"). Wer diesen Kandidaten
später fortschreibt, weiss damit, welche Instanz die Stelle gelesen hat — und dass eine
erneute Prüfung wieder über den Architekten laufen muss, nicht über eine Suche im Repo.

### (2) DIE ZAHL "NEUN HANDLER-TESTDATEIEN" STIMMT NUR UNTER EINER ENGEN LESART

**KANDIDAT FÜR EINE RICHTIGSTELLUNG, NICHT FÜR EINEN STEMPEL — und hier wird sie
ausdrücklich NICHT vollzogen:** Der Satz steht im Abschnitt "Ausgangslage — was am
2026-09-08 gemessen und gelesen ist", den diese Runde nicht anfasst. Wer ihn richtigstellt,
tut es in einer Runde, die jenen Abschnitt ohnehin öffnet.

**DER SATZ:** Die Ausgangslage sagt, `META_TEST_EVENT_CODE` sei "der Grund, warum neun
Handler-Testdateien die Variable in ihrer Config-Fabrik auf leer setzen".

**DER BEFUND — GEMESSEN am Repo (CC, 2026-09-09), drei Zahlen für drei Lesarten:**
- **ZEHN** Dateien tragen wörtlich `META_TEST_EVENT_CODE: ""` — die acht `ingest.*.test.ts`,
  `fan-out.test.ts` und `meta-forward.test.ts`.
- **ELF** mocken das Modul `@/lib/capi/config` überhaupt; die elfte
  (`src/app/api/capi/route.test.ts`) über einen mutierbaren Zugriff mit Startwert `""`.
- **NEUN** trifft zu, wenn man ausschliesslich die HANDLER-Tests zählt (acht `ingest.*`
  plus `fan-out`). **Unter dieser Lesart ist der Satz richtig**, unter der Lesart "alle
  Testdateien" um zwei zu niedrig.

**EIN ZWEITER, KLEINERER PUNKT AM SELBEN SATZ:** Der Ausdruck "Config-Fabrik" ist
irreführend. Es gibt kein Config-Objekt und keine geteilte Fabrik, sondern in jeder Datei
eine **wörtlich duplizierte `vi.mock`-Factory für das MODUL**. Ein geteilter Helfer ist
technisch ausgeschlossen — gehobene Factories dürfen keine datei-externen Bindungen lesen.

**WARUM DAS EIN KANDIDAT IST UND KEIN FEHLER:** Die Zahl trägt im Bestand keine
Entscheidung; sie erklärt einen Nebeneffekt. **Teuer wird sie erst, wenn jemand sie als
Umfangs-Angabe benutzt** — etwa um zu prüfen, ob ein Eingriff alle betroffenen Dateien
erfasst hat. Dann zählt er zwei zu wenig, und zwar ohne es zu merken.

**NICHT ENTSCHIEDEN:** ob die Richtigstellung alle drei Zahlen nennt oder nur die enge
Lesart benennt · ob "Config-Fabrik" mitkorrigiert wird. **KEINE EMPFEHLUNG.**

**PROVENIENZ:** GEMESSEN am Repo (CC, 2026-09-09) im Zuge der Scheibe 11.3a; die
Einordnung als Kandidat statt als Richtigstellung ist eine Auflage dieser Runde.

## Scheiben-Vermerke

Ein Vermerk entsteht erst, wenn eine Scheibe gebaut UND live geprüft ist — nicht bei
grünen Gates allein.

### VERMERK 1 — Scheibe 11.3a, gebaut und live bewiesen

**CODE-COMMIT: `54259a4`** (`feat(capi): projekt-eigener Testmodus fuer meta und tiktok`,
17 Dateien, 1093 Einfügungen, 14 Löschungen).
**COMMIT DIESES VERMERKS: — (LÜCKE, Stefan trägt sie nach).** Nach der Lücken-Regel oben
darf es immer nur EINE solche Lücke geben; dies ist sie.

**MIGRATION UND VORAUSSETZUNGEN — GEMESSEN LIVE, 2026-09-09, Stefan.**
Migration 0028 wurde im SQL-Editor eingespielt, VOR dem Code-Deploy. Die drei Proben aus
dem Kopf der Migration sind bestanden: **beide Spalten nullbar ohne Default**, der CHECK
`project_secrets_test_mode_paar` **genau einmal** vorhanden, die **Policy-Zahl auf
`project_secrets` weiterhin NULL**. Der A/B-Betrieb war **AUS** (`ab_test_active` false) —
**die Voraussetzung des Laufs ist damit festgestellt und nicht unterstellt.**

**LAUF 1 — ohne Testzustand.** `events` trägt **`server` UND `browser`** zur `event_id`
`88553b7f-99e8-4405-a313-1e24714e1505`; im Events Manager erschienen beide, **dedupliziert**.

**LAUF 2 — mit aktivem Testzustand** (Code `TEST13317`, Frist `15:56:50Z`). Hinter dem
Anker `13:57:52Z` **KEINE Zeile in `events`, weder `server` noch `browser`.**

**DIE POSITIVKONTROLLE ZU LAUF 2, UND SIE IST DER TEIL, DER DEN LAUF ERST ZU EINEM BEFUND
MACHT:** Das Ereignis `83a4fcad-3b23-48ee-84ce-38fbabb9ce1b` ist im Events Manager um
**15:58:17 und 15:58:21 als Browser und Server** erschienen, dedupliziert. **OHNE SIE WÄRE
DER LEERE RÜCKLAUF KEIN BEFUND** — "der Riegel hat gegriffen" und "es hat überhaupt nichts
gefeuert" sehen in der `events`-Abfrage identisch aus.

**LAUF 3 — Regression nach Entfernen des Zustands.** Hinter dem Anker `14:06:54Z` wieder
**`server` und `browser`** zur `event_id` `dab74281-7045-4c97-98ad-fa556f0e94df`.

**SCHRITT 8 — UND ER IST EIGENS ZU NENNEN, WEIL ER EINE ABLEITUNG IN EINE MESSUNG
VERWANDELT.** Nach erneutem Speichern des Meta-Tokens über die Oberfläche standen
`test_event_code` und `test_mode_expires_at` **UNVERÄNDERT**. Damit ist der H1-Befund für
den `upsert` von `setCapiToken` keine ABLEITUNG aus der PostgREST-Semantik mehr, sondern
eine **MESSUNG: der Upsert schreibt spaltenweise, und ein aktiver Testzustand überlebt das
Token-Speichern.** GEMESSEN LIVE, 2026-09-09, Stefan.

**DER H1-BEFUND IM GANZEN, mit seiner Grenze:** Vier Schreibpfade berühren eine Zeile in
`project_secrets` — der OAuth-Callback und `setCapiToken` (je `upsert`), der Entfernen-Pfad
(`delete`) und `refreshAccessToken` (`update`). **Keiner setzt die Testspalten.** Pfad 3
nimmt den Zustand **mit der ganzen Zeile** mit, und das ist richtig: ohne Zugangsdaten gibt
es nichts zu testen, und der CHECK `project_secrets_secret_genau_eines` verlangt ohnehin ein
Geheimnis je Zeile. Für `refreshAccessToken` ist die Spaltenweise-Wirkung SQL-Semantik. Für
die **zwei Upserts** war sie eine ABLEITUNG — für `setCapiToken` ist sie seit Schritt 8
gemessen; **für den OAuth-Callback bleibt sie eine ABLEITUNG**, denn dieser Pfad ist nicht
gefahren worden.

**EIN UNBESTELLTER BEFUND AUS DEMSELBEN LAUF — GEMESSEN LIVE, 2026-09-09:** In Vercel war
`META_TEST_EVENT_CODE` **gesetzt**, und zwar mit **demselben Wert `TEST13317`**. Zwei
Folgen, getrennt zu führen:
- **(a) LAUF 1 HAT MIT GESETZTER UMGEBUNGSVARIABLE PERSISTIERT.** Damit ist Invariante I2
  nicht nur im Unit-Test, sondern **LIVE gemessen**: die Umgebungsvariable schaltet den
  Riegel NICHT. **Dazu gehört, dass Lauf 1 beim Anbieter NICHT unmarkiert war** — bei Meta
  waren **beide** Läufe test-markiert. **Die zwei Läufe unterscheiden sich sauber auf der
  `events`-Achse und NICHT auf der Anbieter-Achse**; wer den Nachweis auf letzterer sucht,
  findet keinen Unterschied und hält den Lauf für misslungen.
- **(b) DER VORRANG BLEIBT UNENTSCHEIDBAR.** Beide Quellen trugen denselben Wert. Als
  offener Punkt geführt (Vorrat (10)), **nicht als bestandene Probe.**

**BEIDE PFLICHT-MUTATIONEN GEFAHREN, VORHERSAGEN VOR DEM LAUF NEU ABGELEITET UND EXAKT
GETROFFEN:**
- **Mutation 1** (die Ausnahme im Confirm-Zweig entfernt) färbte **genau TM2** rot —
  Fehlerklasse "persistEvent wurde gerufen, obwohl nicht erwartet". Kein anderer Lauf im
  Repo betritt diesen Zweig mit aktivem Testzustand; **TM2 ist ein Einzelstück** und im
  Testkommentar als solches benannt. Damit ist I1 geprüft.
- **Mutation 2** (der Ablaufzeitpunkt ignoriert) färbte **genau TM4b und TM4c** rot —
  Fehlerklasse "`testMode` trägt einen Eintrag, wo `[]` erwartet ist". **TM4d blieb
  vorhergesagt GRÜN**, weil ein Code aus Leerraum schon vor der Fristprüfung ausscheidet;
  die Handler-Suiten blieben unberührt, weil dort der Resolver gemockt ist.
- Beide Rücknahmen sind belegt: kein leerer Diff, Mutations-Marker nicht mehr auffindbar,
  CR und NUL je 0.

**GATES:** `tsc --noEmit` grün · `eslint` 0 Fehler (die eine Warnung steht in einer Datei
ausserhalb des Diffs) · `vitest` **75 Dateien / 1551 Tests grün, vorher 74 / 1536** ·
`next build` grün. Alle vier VOR dem Diff.

**WAS DIESER VERMERK MISST, seit der Zuschnitt verdichtet ist:** Der Live-Nachweis
verlangte zwei Läufe auf EINER Achse, davon Lauf 2 mit BEIDEN Abwesenheiten — keine
`server`- und keine `browser`-Zeile. Genau das ist eingetreten. Die Auflage, dass der
Testklick beim Anbieter zusätzlich in den normalen Zahlen erscheint, ist durch (a) oben
bestätigt und war kein Fehlschlag.
