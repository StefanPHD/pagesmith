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

### Was sie baut

- **EIN TESTZUSTAND JE (PROJEKT, ZIEL), SERVER-AUTORITATIV.** Er trägt zwei Dinge: einen
  TESTCODE und einen ABLAUFZEITPUNKT. Aktiv heisst: der Ablaufzeitpunkt liegt in der
  Zukunft.
- **DIE FORM DER ABLAGE IST HIER AUSDRÜCKLICH OFFEN.** Ob eigene Tabelle, ob Spalten an
  einer bestehenden, ob etwas Drittes — das wird in Stufe 1 gegen docs/db-stand.md und
  docs/db-regeln.md beantwortet, **nicht hier gesetzt**. Beide Dateien sind vor dem Plan
  zu laden; das ist ein Pflicht-Stopp aus CLAUDE.md und keine Erfindung dieses
  Zuschnitts.
- **WARUM SERVER-AUTORITATIV, und der Grund gehört in den Zuschnitt, weil er sonst beim
  Bau als Bequemlichkeit weggewogen wird:** Der Einstellungs-Blob eines Projekts ist
  CLIENT-besessen — `saveProject` ersetzt ihn GANZHEITLICH. Läge die Frist dort, könnte
  ein alter Tab beim nächsten Speichern **eine bereits abgelaufene Frist wiederbeleben**.
  Damit wäre genau die Eigenschaft zerstört, um derentwillen die Frist überhaupt gewählt
  wurde: dass sie von allein endet. Die Regel dahinter steht dauerhaft in
  docs/immer-beachten.md, "SERVER-EIGENE IDENTITÄT NIE IN EINEN CLIENT-BESESSENEN BLOB".
- **DER INGEST LIEST AUS DERSELBEN QUELLE, AUS DER DER FORWARD-PFAD SPEIST.** Nicht aus
  einer zweiten Ablage, die dasselbe behauptet. Der heutige Lesepfad der
  Ziel-Konfiguration ist `getCapiConfigByTrackingKey` (`src/lib/capi/token.ts`); der
  Oberflächen-Pfad `listConfiguredTargets` (`src/app/projects/actions.ts`) liest bewusst
  dieselbe Quelle, und sein Kommentarkopf begründet genau das. **Zwei Wahrheiten, die
  auseinanderlaufen können, werden hier nicht angelegt.**
- **IST DER ZUSTAND AKTIV, GESCHIEHT ZWEIERLEI:**
  - **(i) KEIN PERSIST IN `events`** — weder im Server-Zweig NOCH im Confirm-Zweig.
  - **(ii) DER ADAPTER HÄNGT DEN CODE AN DIE NUTZLAST** (für meta und tiktok je nach ihrer
    eigenen Form).

### Die Invariante, die den Riegel trägt

**DER CONFIRM-ZWEIG PERSISTIERT ÜBER EINEN EIGENEN FRÜHEN AUSGANG.** Im Ingest steht
`isBrowserConfirm` als eigener Zweig, der `schedulePersist` mit der Beobachtung "browser"
ruft und danach **zurückkehrt** — er läuft nie in den Server-Zweig hinein (GEMESSEN am
Repo, CC, 2026-09-08, `src/lib/capi/ingest.ts`).

**FOLGE, UND SIE IST DER PRÜFSTEIN DIESER SCHEIBE: Wer nur den Server-Zweig ausnimmt, baut
einen stillen Datenfehler.** Es entstünde eine `browser`-Zeile ohne `server`-Gegenstück.
Die Adblocker-Verlustrate rechnet genau diese Differenz — sie würde den Testlauf als
VERLUST zählen und **RÜCKWIRKEND und STILL** eine falsche Rate anzeigen. Kein Fehler,
keine leere Seite, nur eine Zahl, die niemand mehr nachrechnen kann.

**BEIDE ZWEIGE ODER KEINER.** Wer diese Scheibe baut, ohne dass der Confirm-Zweig eigens
ausgenommen ist, hat nicht diese Scheibe gebaut.

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

**RICHTIGGESTELLT AM 2026-09-08, NICHT GESTEMPELT — DER ALTE SATZ WAR ZU BREIT UND HÄTTE
DEN MANDANTENFEHLER ZURÜCKGEHOLT, DEN DIESE PHASE BESEITIGT.** Hier stand: "SIND BEIDE WEGE
GESETZT, GEWINNT DER PROJEKT-ZUSTAND. Der spezifischere Wert schlägt den deployment-weiten."
Das liest sich als Aussage über den GANZEN Testmodus, also auch über den Riegel — und
daraus folgte, dass eine in Produktion gesetzte Env-Variable ALLE Projekte still in den
Testmodus schaltet und ihre Analytics gemeinsam verstummen lässt. **Genau die
deployment-weite Reichweite, die der Gegenstand dieser Phase als den Mangel benennt.** Der
Satz war als Aussage über den Nutzlast-Wert richtig gemeint und als Aussage über den Riegel
falsch; er ist deshalb ersetzt und nicht gestempelt.

### Ausdrücklich NICHT mit, je mit Grund

- **DIE DEV-DUMMY-IP BLEIBT ALLEIN AN `META_TEST_EVENT_CODE` HÄNGEN.** Der Projekt-Zustand
  löst sie NICHT aus. GRUND: Sie ist ein Entwicklungs-Behelf für einen fehlenden
  Client-IP-Wert, kein Bestandteil des Testmodus — sie hängt nur historisch an derselben
  Variablen. Wer sie mitzieht, setzt in einem Kundenprojekt eine erfundene IP als
  Identitäts-Merkmal an einen Anbieter.
- **KEINE OBERFLÄCHE.** Kein Schalter, kein Banner, keine Anzeige der Restlaufzeit. Der
  Zustand wird zum Live-Test **per SQL** gesetzt. Schalter und Banner sind Scheibe 11.3b.
  GRUND FÜR DEN SCHNITT: Der Riegel im Ingest ist die Stelle, an der ein Fehler still
  wird; er wird zuerst gebaut und einzeln bewiesen, bevor eine Oberfläche ihn bequem
  auslösbar macht.
- **KEIN TESTKNOPF, KEIN RÜCKKANAL, KEIN LESEPFAD.** Das ist 11.4 (s. die Abgrenzung unter
  "Gegenstand der Phase").
- **KEINE ENTSCHEIDUNG ÜBER PINTEREST, GOOGLE ODER LINKEDIN.** Ihre Gründe stehen unter
  "Gegenstand der Phase"; sie sind nicht in dieser Scheibe zu revidieren.

### Der Live-Nachweis der Scheibe — zwei Läufe auf EINER Achse

Beide Läufe mit **demselben** Projekt, **demselben** Ereignis und **demselben** Ziel; das
Einzige, was sich zwischen ihnen ändert, ist der Testzustand.

- **LAUF 1, ohne Testzustand:** Das Ereignis erscheint beim Anbieter normal und erzeugt
  eine `events`-Zeile.
- **LAUF 2, mit aktivem Testzustand:** Das Ereignis erscheint in der **Test-Ansicht** des
  Anbieters und erzeugt **KEINE** `events`-Zeile — **auch keine `browser`-Zeile.**

**DIE ZWEITE HÄLFTE VON LAUF 2 IST DER EIGENTLICHE NACHWEIS.** Dass keine `server`-Zeile
entsteht, würde auch ein halber Riegel liefern; dass auch keine `browser`-Zeile entsteht,
liefert nur der vollständige. Wer diesen Teil aus der Anleitung streicht, prüft die
Invariante dieser Scheibe nicht.

**AUFLAGE AN LAUF 2, OHNE DIE DER LAUF EIN KORREKTES VERHALTEN ALS FEHLSCHLAG
PROTOKOLLIERT:** Das Ereignis erscheint beim Anbieter **ZUSÄTZLICH in den normalen Zahlen**
— in der Berichterstattung und in der Optimierung, nicht nur in der Test-Ansicht. **DAS IST
ERWARTETES VERHALTEN UND DARF NICHT ALS FEHLSCHLAG DES RIEGELS VERBUCHT WERDEN.** Der
Riegel dieser Phase wirkt auf `events`, also auf UNSERE Ablage; er hat auf die Zählung des
Anbieters keinen Zugriff und soll keinen haben. Wer das nicht vorher weiss, sieht den
Testklick in den Kampagnenzahlen auftauchen und sucht einen Fehler, den es nicht gibt.
GRUNDLAGE: docs/ziel-befunde.md, Abschnitt "Meta (Conversions API)", Teil (a) — GELESEN
2026-09-08, KEINE Messung. **Für tiktok ist dieselbe Frage ungelesen und ungemessen** (s.
den Vorrat); dort ist das Erscheinen in den normalen Zahlen weder zu erwarten noch
auszuschliessen, und ein Lauf gegen tiktok beurteilt diesen Punkt deshalb gar nicht.

**ZWEI VORAUSSETZUNGEN, DIE IN DIE ANLEITUNG GEHÖREN und ohne die ein Lauf ein Ergebnis
liefert, das keines ist:**
- **DER A/B-BETRIEB IST VORHER FESTZUSTELLEN.** Ist er aktiv, wird entweder abgeschaltet
  oder die AUSGELIEFERTE Variante bestimmt, bevor irgendetwas beurteilt wird — die
  Varianten tragen getrennte Mapping-Sätze (docs/immer-beachten.md, "BEVOR EIN ERGEBNIS
  BEURTEILT WIRD, IST SICHERZUSTELLEN, DASS DAS RICHTIGE GEMESSEN WIRD", Teil (e)).
- **DIE REIHENFOLGE DARF DIE VORAUSSETZUNG DES NÄCHSTEN SCHRITTS NICHT ZERSTÖREN.** Läuft
  ein Regressionsschritt nach Lauf 2, muss der Testzustand vorher wieder abgelaufen oder
  entfernt sein — sonst misst er den Riegel und nicht die Regression
  (docs/immer-beachten.md, "EIN REGRESSIONSSCHRITT DARF DIE VORAUSSETZUNG DES SCHRITTS
  DANACH NICHT ZERSTÖREN").

### Was die Scheibe offen lässt

- **DIE FORM DER ABLAGE** (s. oben) — Stufe 1, gegen docs/db-stand.md und
  docs/db-regeln.md.
- **DIE LÄNGE DER FRIST** und wer sie bestimmt (fester Wert, Auswahl, freie Eingabe) —
  hier NICHT gesetzt, weil ohne Oberfläche niemand sie wählt.
- **OB DER TESTCODE JE ZIEL ODER JE PROJEKT GILT.** Für meta ist er ein vom Kunden
  kopierter Wert; für tiktok ist "wechselt pro Sitzung" ungeprüft (s. die Lücke unter
  "Ausgangslage"). Die Ablage je (Projekt, Ziel) hält beide Fälle offen, entscheidet aber
  keinen.

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

**(4) OB DER TESTCODE DAUERHAFT ABLEGBAR IST ODER JE TESTLAUF NEU BESCHAFFT WERDEN MUSS.**
Hängt an "wechselt pro Sitzung". Für meta schweigt die Doku dazu (Achse `session`,
`expire`, `rotate`, `valid` über fünf Seiten); für tiktok schweigt sie ebenfalls, und der
Repo-Befund führt genau diese Eigenschaft als GEMESSEN (2026-08-11), ohne dass die Doku ihn
stützt oder widerlegt. **Eine Ablage, die einen pro Sitzung wechselnden Wert wie einen
dauerhaften behandelt, ist ab dem zweiten Testlauf falsch, ohne dass etwas rot wird.**
Fundstellen: docs/ziel-befunde.md, Abschnitte "Meta (Conversions API)" Teil (c) und "TikTok
(Events API 2.0)" Teile (e) und (f).
TRIGGER: die Entscheidung über die Form der Ablage (Stufe 1 der Scheibe 11.3a) — sie kann
nicht getroffen werden, ohne diese Frage wenigstens als Risiko zu benennen. PROVENIENZ:
GELESEN 2026-09-08 (Doku-Schweigen) plus der GEMESSENE Repo-Befund vom 2026-08-11.

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

## Scheiben-Vermerke

Noch keiner. Ein Vermerk entsteht erst, wenn eine Scheibe gebaut UND live geprüft ist —
nicht bei grünen Gates allein.
