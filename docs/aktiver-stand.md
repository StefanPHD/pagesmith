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
- ## Scheibe 11.3b — Die drei Gesten und das Banner in der Oberfläche

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

**DER PREIS STEHT DANEBEN UND WIRD NICHT WEGGESCHRIEBEN — UND ER IST ZIEL-ABHÄNGIG.** Bei
**meta** zählt der Testklick beim Anbieter als echte Conversion und fliesst in dessen
Berichterstattung und in dessen Optimierung. Bei **pinterest** ist das für die
BERICHTERSTATTUNG widerlegt: ein markiertes Ereignis erscheint dort NICHT in der
Eventübersicht. Bei **tiktok** behauptet die Oberfläche dasselbe, ohne dass es gemessen
wäre; für **linkedin** und **google** ist kein Testmodus bekannt.
**WER DIESE PHASE ALS "TESTEN OHNE NEBENWIRKUNG" VERKAUFT, VERKAUFT ETWAS, DAS NICHT JEDES
ZIEL LIEFERT** — und ein Versprechen, das bei einem Ziel eingelöst wird und beim nächsten
nicht, ist keines.

**RICHTIGGESTELLT AM 2026-09-10, NICHT GESTEMPELT — DIE VERALLGEMEINERUNG AUF ALLE ANBIETER
IST WIDERLEGT, DIE AUSSAGE ÜBER META NICHT.** Hier stand: "DER TESTKLICK ZÄHLT BEIM
ANBIETER ALS ECHTE CONVERSION. Er fliesst in dessen Berichterstattung und in dessen
Optimierung. Wer diese Phase als 'Testen ohne Nebenwirkung' verkauft, verkauft etwas, das
kein Anbieter dieses Rahmens liefert." Geändert ist die REICHWEITE, kein Wort über meta.
**DIE ZWEITE ACHSE WIRD NICHT MITGESTRICHEN:** Für pinterest ist allein die
BERICHTERSTATTUNG gemessen. **Die OPTIMIERUNG ist UNGEMESSEN** — Pinterests Doku behauptet
auch dort Isolation, belegt ist sie nicht. PROVENIENZ: GEMESSEN LIVE, 2026-09-10, Stefan;
Volltext und die drei Grenzen in VERMERK 3.

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

**RICHTIGGESTELLT AM 2026-09-09, NICHT GESTEMPELT — DIE ÜBERSCHRIFT BESCHREIBT DIE
REICHWEITE DER GEBAUTEN SCHEIBEN, NICHT DEN GEGENSTAND DER PHASE.**

**DIE PHASE 11.3 UMFASST ALLE FÜNF FAN-OUT-ZIELE** (OWNER-ENTSCHEIDUNG 2026-09-09).
Gebaut sind zwei davon; drei stehen aus. **DIE PHASE IST DAMIT NICHT FERTIG**, und der
Marker in CLAUDE.md bleibt aus genau diesem Grund auf `[ ]`.

**WAS HIER STAND UND WORAN ES SICH AUFGEHÄNGT HAT:** Die Liste unten trennte "MIT DABEI"
von "NICHT DABEI" und schloss mit dem Satz, ein späterer Anlauf bei pinterest oder google
sei "eine EIGENE Runde". **Dieser Halbsatz ist zweideutig** — er liest sich als "eine
weitere Scheibe DIESER Phase" und als "eine ANDERE Phase". Gemeint ist das Erste. Wer ihn
als das Zweite liest, hält die Phase nach 11.3b für abgearbeitet, obwohl drei Fünftel
ihres Gegenstands offen sind.

**DIE LISTE UNTEN BLEIBT WÖRTLICH STEHEN UND WIRD NICHT UMGESCHRIEBEN**, denn sie ist als
Aussage über den ZUSCHNITT DER SCHEIBEN 11.3a und 11.3b unverändert richtig, und ihre drei
Gründe sind der heutige Kenntnisstand. **Was sich ändert, ist ihre Überschrift-Ebene:**
"NICHT DABEI" heisst **nicht in den gebauten Scheiben**, nicht "nicht in der Phase".

**AUCH DIE ÜBERSCHRIFT BLEIBT WÖRTLICH, obwohl ihr Wortlaut jetzt zu eng ist** — und das
ist keine Bequemlichkeit: Sie wird von aussen ZITIERT. GEMESSEN am Repo (CC, 2026-09-09):
zweimal — in der verworfenen Alternative an Entscheidung (1) und **im Kopf von
`src/lib/tracking/credential-state.ts`**, also in einer Datei, die eine Doku-Runde nicht
anfasst. Eine Umbenennung machte beide Zeiger tot, und ein toter Zeiger fällt an keinem
Gate auf.

**WAS JEDES DER DREI OFFENEN ZIELE ALS NÄCHSTES BRAUCHT — DREI VERSCHIEDENE SCHRITTE, UND
HIER WIRD KEINER DAVON VOLLZOGEN:**
- **pinterest — DIE MESSUNG IST GEFAHREN, ES IST BAUBAR.** NACHGEZOGEN AM 2026-09-10; hier
  stand: "EINE MESSUNG. Es ist bekannt, WO der Träger sitzt; unbekannt ist, welcher der
  zwei Namen greift. Ein Lauf gegen die Schnittstelle entscheidet es. Danach ist es
  baubar." **Der Lauf ist am 2026-09-10 gefahren** (GEMESSEN LIVE, Stefan; VERMERK 3):
  `test=true` wirkt. **Was pinterest jetzt noch fehlt, ist kein Befund, sondern ein
  Zuschnitt** — namentlich der Paar-CHECK, der Code UND Frist verlangt, während pinterests
  Testmodus keinen Code kennt (Vorrat (8)), und die Kollision aus deployment-weitem
  Schalter und projekt-eigener Frist (Vorrat (26)).
- **google — EIN ANDERER WEG.** Hier fehlt keine Messung, sondern ein Träger, der die
  Beobachtung nicht abschneidet. Ob es ihn gibt, ist offen; solange nicht, kann diese Phase
  für google nichts liefern, was ihr eigenes Versprechen einlöst.
- **linkedin — EINE LESUNG, UND MÖGLICHERWEISE EIN BEGRÜNDETES NEIN.** Der Stand ist ein
  NICHT-TREFFER, kein Beweis der Abwesenheit. Hat der Anbieter keinen Testmodus, endet
  dieses Fünftel der Phase **nicht mit Code, sondern mit einer festgehaltenen Feststellung**
  — und das ist ein gültiger Abschluss, kein Ausfall.

**WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST:** die Reihenfolge der drei, ihr Zuschnitt in
Scheiben, und ob linkedin am Ende gebaut oder abgeschlossen wird. **Der Zustand je
(Projekt, Ziel) aus 11.3a hat für alle drei bereits die Form**; was ihnen fehlt, steht oben
je Ziel.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09 (die Phase umfasst fünf Ziele). Die drei
Befunde darunter sind unverändert die GELESENEN vom 2026-08-11, 2026-08-20 und 2026-08-24;
diese Runde hat **nichts neu gemessen und nichts neu gelesen**.

**MIT DABEI — GEBAUT IN DEN SCHEIBEN 11.3a UND 11.3b:**
- **meta** — Träger ist ein Feld in der NUTZLAST (`test_event_code`). GEMESSEN am Repo
  (CC, 2026-09-08); der Weg selbst ist in Phase 6 live bewiesen.
- **tiktok** — Träger ist ebenfalls ein Feld in der Nutzlast (`test_event_code`), aber aus
  einer EIGENEN Variablen. GEMESSEN am Repo (CC, 2026-09-08).

**NICHT DABEI — GEMEINT IST: NICHT IN DEN GEBAUTEN SCHEIBEN.** Sie gehören zur Phase
(s. die Richtigstellung oben). Je mit dem Grund — und die Gründe sind DREI VERSCHIEDENE,
keine Sammelbegründung:
- **pinterest — ANDERER TRÄGER, UND SEIN NAME IST UNEINHEITLICH.** Der Testmodus ist dort
  kein Nutzlast-Feld, sondern ein QUERY-PARAMETER an der Endpunkt-URL. Dazu trägt er in
  der Anbieter-Doku ZWEI Namen: die Conversions-Seite sagt `test=true`, die
  Rate-Limit-Seite für DENSELBEN Endpunkt sagt `is_test=TRUE` (GELESEN 2026-08-20,
  docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (p)(1)).
  **NACHGEZOGEN AM 2026-09-10: `test=true` IST ALS WIRKSAM GEMESSEN.** Hier stand "NIE
  GEMESSEN — kein Lauf gegen die Schnittstelle hat entschieden, welcher der beiden
  greift."; ein Lauf hat es am 2026-09-10 entschieden (GEMESSEN LIVE, Stefan; VERMERK 3
  und docs/ziel-befunde.md, Teil (u)). **`is_test` BLEIBT UNGEPRÜFT UND IST NICHT
  AUSGESCHLOSSEN** — es ist für den Bau nur entbehrlich geworden; gemessen ist, dass der
  EINE Name wirkt, nicht, dass der andere es nicht tut.
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

**ZU "EINE EIGENE RUNDE" — DER SATZ BLEIBT, SEINE LESART IST FESTGELEGT (2026-09-09):**
gemeint ist eine eigene Runde INNERHALB dieser Phase, nicht eine andere Phase. Der Satz
war an dieser Stelle richtig gemeint und ist zweideutig geschrieben; die Auflösung steht
in der Richtigstellung am Kopf dieses Abschnitts und wird hier nicht verdoppelt.

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

**DER GRUND: ISOLATION IST ZIEL-ABHÄNGIG.** Meta erklärt ausdrücklich, dass markierte
Ereignisse in Targeting und Messung fliessen — dort gibt es sie nicht. Bei **pinterest**
ist sie für die BERICHTERSTATTUNG als vorhanden GEMESSEN (2026-09-10); der Träger ist
damit gemessen, und `is_test` bleibt ungeprüft — **nicht ausgeschlossen, nur für den Bau
entbehrlich**. Bei **tiktok** behauptet die Oberfläche Isolation, ohne dass sie gemessen
wäre. Bei **google** schneidet der einzige Träger die Beobachtung ab, die den Nachweis
erst tragen würde; bei **linkedin** gibt es keinen.
**EIN PRODUKT KANN NICHT VERSPRECHEN, WAS JE ANBIETER VERSCHIEDEN AUSFÄLLT** — und ein
Kunde, der bei einem Ziel Isolation erlebt und beim nächsten nicht, hält das Produkt für
kaputt. Ein Produktversprechen, das der Anbieter nicht deckt, fällt dem Kunden auf die
Füsse, nicht uns.

**WEN SIE BINDET:** jede spätere Scheibe dieser Phase, jede Oberfläche, die den Testmodus
beschriftet, und jeden Text, der ihn dem Kunden erklärt. **Der Preis wird mitgenannt, nicht
weggeschrieben — und er ist ziel-abhängig:** bei meta zählt der Testklick beim Anbieter als
echte Conversion, bei pinterest erscheint er nicht in der Eventübersicht (GEMESSEN
2026-09-10), bei tiktok ist es behauptet und ungemessen.

**RICHTIGGESTELLT AM 2026-09-10, NICHT GESTEMPELT — DIESE ENTSCHEIDUNG BLEIBT IM WORTLAUT
GÜLTIG UND BINDET UNVERÄNDERT, AUCH FÜR PHASE 11.4.** Geändert ist ausschliesslich ihr
GRUND, und er ist SCHÄRFER geworden, nicht schwächer: aus "Isolation gibt es nicht" wird
"Isolation ist ziel-abhängig, und genau deshalb ist sie nicht versprechbar". **WER DIE
SCHÄRFUNG ALS AUFWEICHUNG LIEST, HAT SIE UMGEDREHT** — die Ziel-Abhängigkeit ist ein
STÄRKERER Grund gegen das Versprechen als die pauschale Abwesenheit, weil sie den Fall
einschliesst, in dem ein Kunde Isolation bei einem Ziel tatsächlich erlebt.
**HIER STAND, an den drei Stellen oben und in dieser Zeile:** "Isolation ist bei den Zielen
dieses Rahmens nicht zu haben." · "bei pinterest ist der Träger nie gemessen und trägt zwei
Namen" · "Eine Phase, die Isolation verspricht, verspricht etwas, das kein Anbieter
liefert" · "der Testklick zählt beim Anbieter als echte Conversion."
**DIE ZWEITE ACHSE BLEIBT UNGEMESSEN UND WIRD NICHT MITGESTRICHEN:** Für pinterest ist die
BERICHTERSTATTUNG gemessen, die OPTIMIERUNG nicht.
PROVENIENZ: GEMESSEN LIVE, 2026-09-10, Stefan (VERMERK 3); die Einordnung als
Grund-Schärfung ist ARCHITEKT/OWNER-ENTSCHEIDUNG 2026-09-10.

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

### (8) DER LESER GIBT DAS URTEIL HERAUS, NIE DEN TESTCODE

**DIE ENTSCHEIDUNG:** `listTestModeStates` liest `test_event_code`, WEIL das Prädikat ihn
braucht — und gibt ihn NICHT heraus. Über die Client-Grenze geht ausschliesslich das
Urteil ("aus" / "läuft bis" / "abgelaufen am") samt einem Zeitpunkt in Epochensekunden.
Der Rückgabetyp trägt **strukturell keinen freien String**.

**DER GRUND IST NICHT SPARSAMKEIT, SONDERN DIE DRIFT:** Bekäme der Client nur die Frist
und entschiede selbst, ob der Testmodus läuft, liesse er die **Nicht-Leer-Hälfte** des
Prädikats weg — und zeigte "aktiv", WÄHREND DER RIEGEL NICHT FEUERT. Das ist genau der
Widerspruch, den Entscheidung (4) verbietet, und er entsteht hier gar nicht erst: **Es
urteilt nur eine Seite, also kann nichts auseinanderlaufen.**

**LIVE BESTÄTIGT (GEMESSEN LIVE, 2026-09-09, Stefan):** Der Testcode stand nicht im Feld,
als die Karte geöffnet wurde — die Oberfläche kennt ihn nicht.

**IHRE GRENZE:** Sie ist eine Aussage über den LESER, nicht über die Datenbank. Der Code
liegt weiterhin im Klartext in `project_secrets`; er ist eine Kennung aus dem
Events-Manager und kein Zugangsdatum, aber er ist auch nicht geschützt.

**WEN SIE BINDET:** jede spätere Runde, die den Testzustand anzeigt oder eine zweite
Anzeige daneben baut.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09 (Zuschnitt), gebaut und live bestätigt am
2026-09-09.

### (9) EIN EIGENER LESER MIT EIGENEM OWNERSHIP-GATE

**DIE ENTSCHEIDUNG:** Der Testzustand kommt aus einer EIGENEN Server-Action, nicht aus
einer der beiden bestehenden.

**DIE ZWEI VERWORFENEN, je mit Ausscheidungsgrund:**
- **`listConfiguredTargets` ERWEITERN.** Sie trägt die ausdrückliche Zusage, dass
  **ausschliesslich die `target`-Spalte** selektiert wird, und ein Wächter nagelt ihre
  Spaltenliste auf `["target"]` fest. Eine Erweiterung bräche eine belegte Zusage und
  einen Wächter — für einen Konsumenten, der die Daten gar nicht braucht.
- **IN `listTargetCredentialStates` EINFALTEN.** Verlockend, weil es EIN Gate und EINE
  Runde spart. Aber ihr Gegenstand ist **Uhr 2** (das Erneuerungs-Token), und ihr Kopf
  legt sich darauf ausdrücklich fest. Der Testzustand ist eine **dritte** Uhr.

**IHRE GRENZE, UND SIE WIRD NICHT WEGGESCHRIEBEN:** ein DRITTER Ort, an dem das
Ownership-Gate richtig sein muss — und einen geteilten Helfer dafür gibt es nicht
(GEMESSEN am Repo, CC, 2026-09-09: keine Fundstelle für ein `assertProjectOwnership` oder
Verwandtes). Die Absicherung ist der eigene IDOR-Wächter je Aktion; die Lücke, die
bleibt, steht als Vorrat (15).

**PROVENIENZ:** Entscheidung der Stufe 1 am Code (CC, 2026-09-09), vom Owner freigegeben.

### (10) DAS BANNER NENNT DAS VERURSACHENDE ZIEL

**DIE ENTSCHEIDUNG:** Der Banner-Text führt JEDES Ziel, das gerade im Testmodus steht,
mit Namen und Endzeitpunkt. Stehen mehrere, nennt er alle — in der Reihenfolge von
`TRACKING_TARGETS`, damit zwei Läufe denselben Text ergeben.

**DER GRUND FOLGT AUS EINER ACHSEN-KOLLISION, die man sonst erst im Support-Fall
bemerkt:** Der Riegel hängt an **MINDESTENS EINEM** Ziel (Entscheidung (3)) — steht
`meta` im Testmodus, ruht die Zählung des **GANZEN** Projekts, auch für `tiktok`, dessen
Karte "kein Testmodus" zeigt. Ohne den Namen wüsste der Kunde, **DASS** seine Zählung
ruht, aber nicht, **WO** er sie wieder anschaltet — und suchte sie an der falschen Karte.

**IHRE GRENZE:** Der Text nennt das Ziel, nicht die Ursache der Wirkung. Warum ein
einzelnes Ziel die ganze Zählung anhält, erklärt er nicht; das ist Sache der
Betreiber-Dokumentation (Vorrat (3)).

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-09 (Schärfung des Bau-Auftrags); live
bestätigt am selben Tag.

### (11) DAS BANNER IST NUR SICHER, WEIL DER ZUSTAND IM LADE-EFFEKT GEHOLT WIRD

**DIE ENTSCHEIDUNG:** Der Testzustand kommt aus einem Lade-Effekt und ist im ersten
Render `null`. Das Banner liegt damit **garantiert nicht im Server-Baum**.

**WARUM DAS EINE ENTSCHEIDUNG IST UND KEIN NEBENEFFEKT:** Das Banner ist die **ERSTE
Zeitanzeige ausserhalb des Einstellungs-Drawers**. Alle drei bestehenden Formatierungen
im Repo sind heute nur deshalb kollisionsfrei, weil sie hinter `isSettingsOpen` bzw. dem
geschlossenen Projektmenü liegen — der Kommentar an jenem Gate sagt es wörtlich und nennt
seine zwei Konsumenten. Läge das Banner im ersten Render im Baum, formatierten Server und
Client denselben Zeitpunkt in VERSCHIEDENEN Zeitzonen: ein Hydration-Mismatch.

**WAS SIE BINDET:** Wer diesen Teilbaum serverseitig rendert, den Zustand vorlädt oder ihn
aus einer Server-Komponente hereinreicht, **muss die Formatierung vorher hydrations-sicher
machen**. Die Abhängigkeit steht als Kommentar an der Fundstelle — ohne ihn kippt sie
still.

**IHRE GRENZE:** Sie deckt das Banner und die Karte, nicht jede künftige Zeitanzeige.
`formatEpochSeconds` ist seit dieser Scheibe exportiert; jede neue Aufrufstelle prüft
ihre eigene Lage im ersten Render.

**PROVENIENZ:** Entscheidung der Stufe 1 (CC, 2026-09-09) auf der Grundlage der drei am
Repo GEMESSENEN Formatierstellen; der Banner-Ort ist OWNER-ENTSCHEIDUNG 2026-09-09.

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

**(6) — GESTRICHEN AM 2026-09-09, GESCHLOSSEN DURCH DEN BAU. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "DIE UHREN-ASYMMETRIE: GESCHRIEBEN WIRD GEGEN DIE DATENBANK-UHR, GELESEN
GEGEN DIE DER LAUFZEIT. Der Resolver vergleicht `test_mode_expires_at` gegen
`Date.now()`; die Frist entsteht (beim Live-Test und künftig in 11.3b) aus
`now() + interval` in Postgres. Weichen beide Uhren ab, verschiebt sich die effektive
Dauer um genau diese Differenz, in beide Richtungen und still."
TRIGGER war: die Entscheidung über die LÄNGE der Frist (11.3b).

**DER BELEG — GEMESSEN am Repo (CC, 2026-09-09), mit benannter Achse:** Eine Suche über
`src/` nach `now() + interval` und nach jeder Schreibstelle auf `test_mode_expires_at`
findet im Produktivcode **KEINEN** Postgres-seitigen Zeitwert. Der einzige Schreiber ist
`startTestMode` (app/projects/actions.ts) mit `new Date(endetMs).toISOString()`, wobei
`endetMs` aus `Date.now()` entsteht — **derselben Uhrenfamilie, gegen die
`activeTestCodeFromRow` liest**. Ein Lauf nagelt beides fest (die Frist wird mit
angehaltener Uhr gegen den erwarteten ISO-Wert geprüft).

**WAS DIE STREICHUNG NICHT BEHAUPTET, und der Satz gehört dazu:** Dass zwei
LAUFZEIT-Instanzen exakt gleich gehen, ist **NICHT gemessen**. Der Rest ist kleiner als
die Differenz Datenbank-gegen-Laufzeit, aber er ist nicht null. Und ein von Hand im
SQL-Editor gesetzter Testzustand — der Weg des Live-Tests der Scheibe 11.3a — trägt die
alte Asymmetrie weiterhin; sie ist aus dem CODE verschwunden, nicht aus der Welt.

**PROVENIENZ DER STREICHUNG:** GEMESSEN am Repo (CC, 2026-09-09).

**(7) — GESTRICHEN AM 2026-09-09, GESCHLOSSEN DURCH DEN BAU. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "DER RIEGEL ERREICHT NUR ZIELE, DIE DEN KENNUNGS-FILTER PASSIEREN. Die
zweite Abfrage des Resolvers fragt nur nach Zielen mit Kennung oder Zuordnung; bei
`withPixel.length === 0` kehrt er VOR ihr zurück. Ein Testzustand an einem Ziel ohne
Kennung ist damit unsichtbar, und der Testklick würde persistiert."
TRIGGER war: der Schalter in 11.3b — er darf nur an konfigurierten Zielen erscheinen.

**DER BELEG — GEMESSEN am Repo (CC, 2026-09-09):** `listTestModeStates` gibt einen
Eintrag nur für Ziele heraus, die `hasTargetPixelId(getPixelId(settings, target), target)
|| hasConversionRules(getConversionRules(settings, target))` erfüllen — **dieselben zwei
Prädikate, aus derselben reinen Datei, die auch der `withPixel`-Filter in
`getCapiConfigByTrackingKey` benutzt**. Nicht nachgebaut, sondern dieselbe Sprache. Die
Karte zeigt den Schalter genau dort, wo ein Eintrag ankommt; ein Lauf hält fest, dass ein
Ziel ohne Kennung KEINEN Eintrag bekommt.

**WARUM DAS URTEIL AUF DEM SERVER FÄLLT UND NICHT IN DER KARTE:** Fiele es zweimal, wäre
es zweimal zu pflegen — und die Oberfläche zeigte irgendwann einen Schalter an einem
Ziel, das der Riegel gar nicht sieht.

**PROVENIENZ DER STREICHUNG:** GEMESSEN am Repo (CC, 2026-09-09).

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

**NACHGEZOGEN AM 2026-09-09 NACH DEM TIKTOK-LAUF — DER EINTRAG BLEIBT OFFEN, SEINE
AUSSAGE IST ABER ENGER GEWORDEN.** Der Wortlaut oben bleibt stehen und ist für den
META-Lauf unverändert richtig.
**WAS DER TIKTOK-LAUF ZUSÄTZLICH ZEIGT (GEMESSEN LIVE, 2026-09-09, Stefan):** Dort ist
`TIKTOK_TEST_EVENT_CODE` in Vercel **NICHT gesetzt**, und der Code `TEST46650` kam
trotzdem beim Anbieter an. **DER PROJEKT-EIGENE CODE TRÄGT ALSO ALLEIN** — das ist keine
Ableitung mehr, sondern erzwungen, weil es keine zweite Quelle gab.
**WAS DAMIT AUSDRÜCKLICH NICHT BEANTWORTET IST:** welche Quelle gewinnt, wenn **BEIDE**
gesetzt sind und **VERSCHIEDENE** Werte tragen. Das ist eine Aussage über den VORRANG, und
der Trigger oben steht unverändert. **Wer die zwei Sätze zusammenzieht, hält "der Projekt-
Code funktioniert" für "der Projekt-Code gewinnt" — zwei verschiedene Aussagen.**

**(11) EIN ZIEL MIT TESTZUSTAND, ABER UNBRAUCHBAREM GEHEIMNIS, VERLIERT DAS EREIGNIS AUF
BEIDEN SEITEN.** Der Riegel feuert (der Testzustand ist gültig), das Ereignis verschwindet
aus `events` — **und der Anbieter bekommt nichts, weil gar nicht gesendet wird.** Das ist
derselbe Schaden, den der CHECK für "Frist ohne Code" ausschliesst, nur durch eine andere
Tür: Riegel ohne Gegenwert. Der Fall ist im Test festgehalten (TM4e) und im Code bewusst so
angeordnet — der Testzustand wird VOR dem Ausstieg für unbrauchbare Zeilen eingesammelt.
TRIGGER: der Schalter in 11.3b — er darf nur an Zielen erscheinen, die tatsächlich senden
können. PROVENIENZ: GEMESSEN am gebauten Code (CC, 2026-09-09, Lauf TM4e).

**NICHT GESTRICHEN — UND DAS IST EIN BEFUND, KEINE FORMALIE (GEGENGEPRÜFT AM BESTAND,
CC, 2026-09-09).** Der Trigger ist abgearbeitet, SOWEIT ER ABARBEITBAR WAR: Der Schalter
erscheint nur an Zielen mit Testmodus, mit Kennung und mit Geheimnis-Zeile. **DER
EINTRAG SELBST BLEIBT TROTZDEM WAHR, weil "senden können" für ein Klartext-Ziel GAR NICHT
BEOBACHTBAR IST.** Der Leser sieht, DASS eine Zeile da ist — ob das Zugangsdatum beim
Anbieter noch gilt, weiss allein der Anbieter.

**DER REALE FALL, an dem das beisst:** ein widerrufenes Meta-Zugangsdatum. Die Karte
zeigt "Zugangsdaten hinterlegt", der Schalter steht da, der Kunde startet den Testmodus —
**der Riegel feuert, die `events`-Zeile entfällt, und der Forward stirbt bei Meta mit
`Bad signature`.** Das Ereignis ist auf BEIDEN Seiten weg, also genau der Schaden, den
dieser Eintrag beschreibt. Der Fehlzustand ist im Projekt schon einmal live aufgetreten
und blieb damals lautlos (s. die Regel "CAPI-TOKEN UND PIXEL-/DATASET-ID SIND EIN PAAR").

**WAS DAS FÜR DIE STREICHUNG HEISST:** Sie wäre nur zu haben, wenn die Oberfläche eine
Aussage über die GÜLTIGKEIT eines Klartext-Geheimnisses treffen könnte. Das kann sie
nicht, und ein Ratewert wäre schlimmer als keiner.
NEUER TRIGGER: ein Rückkanal, der einen abgelehnten Forward sichtbar macht — dasselbe
Stück, das der Phase 11.4 fehlt. **VERWANDT, ABER ENGER: Eintrag (21)**, der allein den
code-nahen Sonderfall des leeren Klartext-Geheimnisses führt.

**(12) — GESTRICHEN AM 2026-09-09, GESCHLOSSEN DURCH DEN BAU. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "DER CHECK LÄSST `test_event_code = ''` ZU. Beide Spalten sind gesetzt, der
CHECK ist zufrieden — und der Code fällt im Resolver beim Trimmen weg, der Riegel feuert
nicht. Der Kunde glaubt, der Testmodus laufe, und er läuft nicht."
TRIGGER war: 11.3b prüft beim Schreiben auf nicht-leer.

**DER BELEG — ZWEIFACH, und die zweite Hälfte ist die tragende:**
- `startTestMode` weist einen nach dem Trimmen leeren Code **VOR jedem Client** ab
  (`empty_code`). **Die Pflicht-Mutation hat es belegt:** Wird die Prüfung entfernt, wird
  genau ein Lauf rot — und der behauptet BEIDES, die Abweisung UND dass nichts
  geschrieben wurde.
- **Die ANZEIGE deckt den Fall zusätzlich ab, falls eine Zeile ihn doch trägt:**
  `testModeStateFrom` bildet "Frist in der Zukunft, aber leerer Code" auf **"aus"** ab und
  NICHT auf "abgelaufen am <Zukunft>". Ein Lauf hält genau das fest. Der Kunde sieht dann
  also, dass nichts läuft — was der Wahrheit entspricht.

**WAS OFFEN BLEIBT UND SEINE EIGENE NUMMER BEKOMMEN HAT:** Der CHECK selbst lässt `''`
weiterhin zu; geschlossen ist der SCHREIBWEG dieser Scheibe, nicht die Spalte. Ein
künftiger Schreibpfad ohne diese Prüfung risse den Fall wieder auf — Eintrag (21).

**PROVENIENZ DER STREICHUNG:** GEMESSEN am Repo und an den beiden Läufen (CC,
2026-09-09).

**(13) — GESTRICHEN AM 2026-09-09, GESCHLOSSEN DURCH DEN BAU. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "METAS TESTCODE WECHSELT ALLE PAAR TAGE — 11.3b MUSS DEN KUNDEN ZUM
NACHTRAGEN FÜHREN, NICHT EINMALIG ABFRAGEN. Eine Oberfläche, die den Code wie eine
Einstellung behandelt, erzeugt ab dem zweiten Testlauf einen Zustand, der aussieht wie
eingerichtet und keiner ist."
TRIGGER war: der Schalter in 11.3b.

**DER BELEG — GEMESSEN am Repo (CC, 2026-09-09):** Die Oberfläche behandelt den Code an
KEINER Stelle wie eine Einstellung. Das Eingabefeld steht auch im laufenden Zustand da,
der Knopf heisst dann `Meta-Test verlängern` und ist gesperrt, solange nichts eingegeben
ist (`disabled={testBusy || !testInput.trim()}`); nach einem geglückten Start wird das
Feld **geleert**, damit kein Wert stehenbleibt, den jemand ungeprüft wiederverwendet.
Läufe halten die Beschriftung im laufenden Zustand und die Sperre ohne Eingabe fest.

**DIE GESTALT LÖST DEN PUNKT UND VERSCHIEBT IHN NICHT:** Das Verlangen des Codes fällt
genau dorthin, wo er ohnehin frisch geholt werden muss. Es gibt keinen Weg, den Testmodus
mit einem alten Code zu verlängern.

**PROVENIENZ DER STREICHUNG:** GEMESSEN am Repo (CC, 2026-09-09); die zugrunde liegende
Angabe über Metas Wechselintervall bleibt OWNER-ANGABE 2026-09-09, **keine Messung**.

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

**(15) DIE IDOR-WÄCHTER SIND NAMENTLICH — EINE NEUE SERVER-ACTION IST UNGESCHÜTZT BY
DEFAULT, UND NICHTS WIRD DAVON ROT.** Jeder bestehende Wächter nennt die Aktion, die er
prüft; er weiss von einer neuen nichts. **GEMESSEN in dieser Scheibe:** Die
Pflicht-Mutation "Ownership-Gate entfernen" wäre GRÜN geblieben, hätte diese Runde nicht
drei eigene Wächter mitgebaut — die bestehenden decken `setCapiToken`, `removeCapiToken`
und die zwei Leser der Scheibe 11.2b. **Einen geteilten Ownership-Helfer gibt es nicht**
(GEMESSEN am Repo, CC, 2026-09-09: keine Fundstelle für `assertProjectOwnership`,
`assertOwnership`, `requireOwner`, `ownProject`, `ensureOwner`); das Gate ist in jeder
Aktion von Hand wiederholt.
TRIGGER: die nächste Scheibe, die eine Server-Action anlegt. PROVENIENZ: GEMESSEN am Repo
und an der Mutationsprobe (CC, 2026-09-09).

**(16) DIE OWNERSHIP-ACHSE IST LIVE NICHT PRÜFBAR — ES FEHLT EIN WERKZEUGSTAND, NICHT EIN
BAUTEIL.** Die Oberfläche BIETET DEN ANGRIFF GAR NICHT AN: Ein zweites Konto sieht das
fremde Projekt nicht, es gibt kein Feld für eine fremde Projekt-Kennung und keinen Weg,
per Klick eine Aktion mit fremdem Ziel auszulösen. Der Angriff, gegen den das Gate
schützt, ist eine **gebastelte Anfrage**, kein Klick. **Die Achse trägt heute allein der
Unit-Wächter IDOR 2** — er belegt, dass der Riegel im CODE greift, nicht dass er im
BETRIEB greift.
TRIGGER: der erste Werkzeugstand, der eine gebastelte Anfrage gegen eine Server-Action
erlaubt. PROVENIENZ: FESTGESTELLT beim Live-Test (Stefan/CC, 2026-09-09); s. VERMERK 2,
Abschnitt zur nicht gefahrenen Achse.

**(17) `credential-state.ts` BESCHREIBT EINE ARBEITSTEILUNG, DIE FÜR DEN TESTZUSTAND NICHT
GILT.** Ihr Kopf sagt: "die Aktion klassifiziert die Zeile, diese Datei deutet die Uhr".
Das umgezogene Prädikat `activeTestCodeFromRow` nimmt eine **ROHE Zeile** entgegen und ist
dort der erste Leser dieser Art. **Bewusst so belassen, weil der Umzug byte-identisch sein
musste** — ein umgeschriebener Ausdruck wäre ein Eingriff in einen live bewiesenen
Resolver gewesen. Der Kopf trägt einen NACHGEZOGEN-Absatz, der es benennt.
TRIGGER: die nächste Runde, die diese Datei um eine Ableitung erweitert. PROVENIENZ:
GEMESSEN am Repo (CC, 2026-09-09).

**(18) — GESTRICHEN AM 2026-09-09, ERLEDIGT. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "`docs/db-stand.md` KENNT MIGRATION 0028 NICHT — DORT STEHEN ACHT SPALTEN, ES
SIND ZEHN. Die zwei Testspalten fehlen, obwohl VERMERK 1 die Migration als eingespielt und
dreifach geprüft führt. Jene Datei wird ausschliesslich aus einer MESSUNG fortgeschrieben,
nie aus einer Migrationsdatei — es braucht also eine Ablesung im SQL-Editor, keine
Übernahme von hier."
TRIGGER war: die nächste Migration, die gegen den Schemastand geplant wird.

**DER BELEG — GEMESSEN am 2026-09-09 (SQL-Editor, Stefan) und in Commit `696a6d5`
niedergeschrieben:** `docs/db-stand.md` führt `project_secrets` jetzt mit ZEHN Spalten;
`test_event_code` und `test_mode_expires_at` stehen dort im WORTLAUT (Typ, Nullbarkeit,
kein Default), dazu `project_secrets_test_mode_paar` im Wortlaut mit der Zeilenzahl, die
Wegwerf-Probe als Wirkungs-Beleg, die dritte Policy-Gegenkontrolle und der Migrationsstand
0001-0028.
**DIE AUFLAGE IST EINGEHALTEN:** fortgeschrieben wurde aus der ABLESUNG, nicht aus den
Migrationsdateien — die Abfragen und ihre Ergebnisse sind der Beleg, nicht dieser Eintrag.

**ZWEI DINGE SIND DABEI AUS EINER ABLEITUNG EINE MESSUNG GEWORDEN, und sie sind der
eigentliche Ertrag über das Nachziehen hinaus:** die `ordinal_position` von
`secret_version` (dort bis dahin ausdrücklich als NICHT gemessen geführt), und
**"MIGRATION VOR CODE-DEPLOY"** — 0028 lief um 13:40:36 UTC, der erste Live-Lauf der
Scheibe 11.3a war gegen den Anker 13:57:52Z gefahren. Die Regel ruhte bis dahin auf
Disziplin; an diesem Tag ist sie an zwei Zeitstempeln nachvollziehbar.

**MITERLEDIGT, obwohl es nicht im Eintrag stand:** Die ERWARTUNG-Felder von PROBE 2 und 3
in `supabase/checks/db-stand.sql` kannten weder 0027 noch 0028 und sind im selben Commit
nachgezogen — **ausschliesslich die ERWARTUNG, keine einzige Abfrage**. Ein Instrument mit
falscher Erwartung misst nicht, es meldet einen Fehlalarm.

**PROVENIENZ DER STREICHUNG:** GEMESSEN am 2026-09-09 (SQL-Editor, Stefan); der Vollzug
GESCHRIEBEN am selben Tag (CC), Commit `696a6d5`.

**(19) DREI LESER, DREI OWNERSHIP-GATES, DREI RUNDEN IM SELBEN LADE-EFFEKT.**
`listConfiguredTargets`, `listTargetCredentialStates` und `listTestModeStates` laufen
gebündelt und prüfen jeder für sich dasselbe. **Das folgt heute der Hausform** und ist
kein Versehen: Die erste trägt einen Wächter auf ihrer Spaltenliste, die zweite ist auf
Uhr 2 zugeschnitten. Ein geteiltes Gate wäre ein eigener Zuschnitt — und (15) sagt, warum
es keinen gibt.
TRIGGER: der vierte Leser. PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-09).

**(20) DER PLATZHALTER DES TESTCODE-FELDES IST GRAU AUF GRAU UND KAUM ZU LESEN.** Für den
Betreiber tragbar, **für einen Kunden nicht**. Es ist eine Darstellungs-Achse und keine
Logik-Achse: Die Testumgebung wertet kein CSS aus, kein Lauf kann das fangen.
TRIGGER: das UI-Redesign — und früher, wenn ein Kunde die Karte sieht. PROVENIENZ:
GEMELDET von Stefan an der Live-Oberfläche, 2026-09-09.

**(21) EIN KLARTEXT-GEHEIMNIS `''` BLIEBE FÜR DIE OBERFLÄCHE UNSICHTBAR UND FÜR DEN
RESOLVER UNBRAUCHBAR.** `hasSecret` trimmt NICHT; unbrauchbar ist damit genau der Wert
`''`. Der Leser des Testzustands liest das Geheimnis bewusst nicht und kann den Fall
deshalb nicht sehen — der Schalter stünde da, der Riegel feuerte, und gesendet würde
nichts. **Über die Oberfläche ist er nicht erreichbar, weil `setCapiToken` einen leeren
Token vorher abweist.**
**ER IST DIE ENGERE HÄLFTE VON (11) und ersetzt jenen nicht:** Dieser hier trifft den
code-nahen Sonderfall, jener den allgemeinen — ein Zugangsdatum, das der Anbieter nicht
mehr annimmt.
TRIGGER: ein Schreibweg auf `project_secrets`, der die Nicht-Leer-Prüfung nicht trägt.
PROVENIENZ: ABLEITUNG aus `hasSecret` und dem gebauten Lesepfad (CC, 2026-09-09), **keine
Messung** — der Fall ist nicht herbeigeführt worden.

**(22) DER BANNER-SATZ "beim Anbieter kommen sie weiterhin an" IST NICHT FALSCH, ABER
ZIEL-ABHÄNGIG ZU LESEN.** Er spricht von **ANKUNFT**; der Leser wird ihn als **ZÄHLUNG**
lesen. **Für Meta trifft beides zu** (die Doku sagt ausdrücklich, markierte Ereignisse
flössen in Targeting und Messung); **für TikTok womöglich nur das Erste** — dessen
Oberfläche sagt "Test events will not be included in actual data".
**NICHT GEÄNDERT, UND DER GRUND IST DIE PROVENIENZ:** Ein ziel-abhängiger Text ruhte dann
auf einer EINMAL GELESENEN Oberflächen-Zeile. Das ist zu wenig für eine
Produktaussage — und ein falsch differenzierter Text wäre schlechter als ein zu
allgemeiner, weil er Genauigkeit behauptet, die niemand gemessen hat.
TRIGGER: die Messung, ob TikTok test-markierte Ereignisse in den echten Daten führt.
PROVENIENZ: GELESEN an TikToks Oberfläche (Stefan, 2026-09-09) gegen die Meta-Doku-Lesung
vom 2026-09-08; die Folge für den Text ist eine ABLEITUNG, **keine Messung**.

**ZUSATZ 2026-09-10 — DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN, UND DER EINTRAG BLEIBT
OFFEN.** Sein Trigger ist die TikTok-Messung, und die steht aus; die Ergänzung betrifft ein
DRITTES Ziel und löst ihn nicht ab.
**FÜR PINTEREST IST DIE LAGE SEIT DEM 2026-09-10 GEMESSEN STATT GELESEN — UND SIE IST EINE
DRITTE:** Ein test-markiertes Ereignis erscheint dort **NICHT in der Eventübersicht**
(VERMERK 3, SCHLUSS 3). Damit stehen jetzt **drei verschiedene Lagen** nebeneinander, und
keine trägt für die anderen:
- **meta** — fliesst in Targeting und Messung (GELESEN 2026-09-08 an der Anbieter-Doku).
- **tiktok** — Oberflächen-Aussage "Test events will not be included in actual data"
  (GELESEN an der Oberfläche, Stefan, 2026-09-09), **die WIRKUNG ungemessen**.
- **pinterest** — die Abwesenheit in der Eventübersicht ist **GEMESSEN LIVE, 2026-09-10,
  Stefan**; die Wirkung auf die OPTIMIERUNG bleibt auch hier ungemessen (VERMERK 3, zweite
  Grenze).
**WAS DAS FÜR DEN BANNER-SATZ HEISST — UND ES IST KEINE ÄNDERUNG AN IHM:** Der Grund, ihn
nicht ziel-abhängig zu machen, war die dünne Provenienz einer einmal gelesenen
Oberflächen-Zeile. **Für pinterest ist dieser Grund weggefallen, für tiktok nicht.** Ein
Text, der zwei von drei Zielen belegt unterscheidet und das dritte rät, wäre genau die
falsche Genauigkeit, vor der der Absatz oben warnt. **HIER WIRD NICHTS ENTSCHIEDEN.**
PROVENIENZ DIESES ZUSATZES: GEMESSEN LIVE, 2026-09-10, Stefan (die Läufe); die Einordnung
als dritte Lage ist eine ABLEITUNG, **keine Messung**.

**(23) — GESTRICHEN AM 2026-09-09, ERLEDIGT. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "TIKTOKS ANBIETER-BEFUND GEHÖRT NACH `docs/ziel-befunde.md` UND STEHT DORT
NOCH NICHT. Die Oberflächen-Aussage aus dem TikTok-Lauf ist ein Befund über ein
FAN-OUT-ZIEL; ihr Ort ist Abschnitt 'TikTok (Events API 2.0)' jener Datei, die keiner
Phase gehört und nicht archiviert wird." Dazu der Grund, warum es eilt, ohne dringend zu
sein: Solange der Befund nur in einer Standdatei steht, verschwindet er mit deren
Archivierung am Phasenende aus dem Blickfeld jeder Runde, die ein Fan-Out-Ziel
zuschneidet — und genau die soll ihn lesen.
TRIGGER war: die nächste Runde, die `docs/ziel-befunde.md` ohnehin öffnet.

**DER BELEG — Commit `863c62c`:** `docs/ziel-befunde.md` trägt seither im Abschnitt
"TikTok (Events API 2.0)" den **Teil (h)**, samt eigener Zeile im Verzeichnis jener Datei.
Er führt die Oberflächen-Aussage im Wortlaut, mit ihrer Herkunft (GELESEN an der
Oberfläche, Stefan, 2026-09-09 — nicht an der Doku, nicht gemessen), mit der Abgrenzung
zu Teil (d) (jener spricht über die DOKUMENTATION und bleibt richtig), mit dem
Gegensatz zu Metas Teil (a) und mit der ausdrücklich NICHT gemessenen Frage, ob dasselbe
Ereignis auch in TikToks normaler Berichtsansicht erscheint.

**DIE ARBEITSTEILUNG STEHT UND IST NICHT VERDOPPELT:** Der BEFUND liegt jetzt dort, die
FOLGE FÜR DEN PRODUKTTEXT bleibt hier als Vorrat (22). Beide zeigen aufeinander, keiner
wiederholt den anderen.

**PROVENIENZ DER STREICHUNG:** GESCHRIEBEN am 2026-09-09 (CC), Commit `863c62c`; die
zugrunde liegende Lesung ist unverändert Stefans Beobachtung an der Anbieter-Oberfläche
vom selben Tag.

**(24) TIKTOKS TESTCODE HÄLT NACH OWNER-ANGABE MINDESTENS EINEN TAG.** Das **entlastet die
60-Minuten-Frist für TikTok**: Die Frist ist dann deutlich kürzer als das
Wechselintervall und kann keinen brauchbaren Zustand abschneiden — dieselbe Ungleichung,
die die Frist für Meta trägt.
**WAS ES NICHT TUT:** Es beantwortet Vorrat (14) nicht. Dort steht die Frage, ob TikToks
Code DAUERHAFT ablegbar ist; "mindestens einen Tag" ist eine Untergrenze und keine
Aussage über Beständigkeit. **Und es widerspricht dem Repo-Befund "wechselt pro Sitzung"
nicht, sondern lässt ihn offen** — eine Sitzung kann länger als einen Tag dauern.
TRIGGER: die Scheibe, die den tiktok-Zweig zuschneidet — dieselbe wie bei (14), und beide
werden zusammen gelesen. PROVENIENZ: GEMELDET von Stefan, 2026-09-09, **keine Messung**.

**(25) `PINTEREST_TEST_MODE` IST EIN ANWESENHEITS-TEST, KEIN WAHRHEITS-TEST.**
`testModeQuery` (`src/lib/capi/pinterest-forward.ts`) schaltet den Testmodus bei **JEDEM
nicht-leeren Wert** ein — also auch bei `"false"`, `"0"`, `"nein"` und `"aus"`.
Ausgeschaltet wird ausschliesslich durch **Entfernen** der Variable (oder durch einen Wert,
der nach dem Trimmen leer ist).
**DER FEHLZUSTAND IST STILL, und das ist der ganze Grund für diesen Eintrag:** Wer die
Variable auf `"false"` setzt, um den Testmodus AUSZUSCHALTEN, schaltet ihn EIN — und dann
liefe **jede echte Conversion in Pinterests Sandbox** und verschwände aus den Zahlen des
Werbekontos, **ohne dass irgendwo etwas rot wird**. Seit dem 2026-09-10 ist das keine
Befürchtung mehr, sondern die gemessene Wirkung des Parameters (VERMERK 3, SCHLUSS 3).
**WAS DER EINTRAG NICHT SAGT:** dass die Bauform falsch ist. Sie spiegelt `META_TEST_EVENT_CODE`
und `TIKTOK_TEST_EVENT_CODE`, wo ein WERT gebraucht wird und die Anwesenheit deshalb
zwangsläufig der Schalter ist. Bei einem BOOLEAN-artigen Schalter fällt dieselbe Bauform
anders aus.
TRIGGER: die erste Ops-Runde oder der erste Betreiber, der den Schalter setzt.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10) an `testModeQuery`; die Wirkung des gesetzten
Parameters ist GEMESSEN LIVE (Stefan, 2026-09-10, VERMERK 3). Dass jemand `"false"`
einträgt, ist eine ABLEITUNG über einen plausiblen Fehlgriff, **keine Beobachtung**.

**(26) DER SCHALTER WIRKT DEPLOYMENT-WEIT, DIE GEPLANTE FRIST PROJEKT-EIGEN.**
Vorrat (10) führt die Vorrang-Frage für zwei **CODES** (meta/tiktok): welcher Wert in die
Nutzlast wandert, wenn Umgebungsvariable und Projektzeile verschiedene tragen. **Bei
pinterest kollidiert etwas anderes** — ein deployment-weiter **SCHALTER** mit einer
projekt-eigenen **FRIST**. Das sind nicht zwei Werte derselben Art, sondern zwei
verschiedene Arten von Zustand.
**OB DAS DIESELBE FRAGE IST, IST NICHT ENTSCHIEDEN; DASS SIE ENTSTEHT, SCHON.** Wer
pinterest zuschneidet, muss sagen, was gilt, wenn `PINTEREST_TEST_MODE` gesetzt ist und
ein Projekt KEINE Frist trägt — und umgekehrt.
**ZEIGER AUF (10), KEINE VERDOPPLUNG:** Die Vorrang-Frage der Codes steht dort und wird
hier nicht zweitens geführt.
TRIGGER: der Zuschnitt der Pinterest-Scheibe.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10) — dass `testModeQuery` die Variable je Aufruf
liest und keinen Projekt-Zustand kennt; die Abgrenzung gegen (10) ist eine ABLEITUNG,
**keine Messung**.

**(27) DAS TESTANFRAGEN-LIMIT BINDET PHASE 11.4, NICHT DIESE.**
Pinterest deckelt Testanfragen eigens (docs/ziel-befunde.md, Abschnitt "Pinterest
(Conversions API)", Teil (e): "Test requests have a rate limit of 10 per app per second")
und rät in der Oberfläche von hohen Testmengen ab.
**FÜR HANDLÄUFE IST DAS UNERHEBLICH** — ein Mensch, der einen Testklick auslöst, kommt
diesem Deckel nicht nahe. **EIN TESTKNOPF, DER JE KUNDE FEUERT, LÄUFT DAGEGEN GEGEN EIN
APP-WEITES LIMIT**: Der Deckel gilt **je App**, nicht je Werbekonto und nicht je Kunde —
die Kunden teilen ihn sich also, und ein einzelner kann ihn für alle ausschöpfen.
**DER EINTRAG STEHT HIER UND NICHT BEI 11.4**, weil er in dieser Phase gemessen worden ist;
sein Trigger zeigt aber dorthin.
TRIGGER: der Zuschnitt der Phase 11.4.
PROVENIENZ: GELESEN 2026-08-20 (das Limit, Teil (e) der Befund-Datei); die Oberflächen-
Empfehlung ist GELESEN an der Anbieter-Oberfläche (Stefan, 2026-09-10). Die Folge für einen
Testknopf ist eine ABLEITUNG, **keine Messung** — es ist kein Lauf gegen den Deckel
gefahren worden.

**(28) JEDER NEUE VERMERK DIESER PHASE KIPPT EINEN FREMDEN ZEIGER VON TOT AUF FALSCH.**
Vier Dateien nennen "docs/aktiver-stand.md, VERMERK <n>" und meinen die **Standdatei der
Phase 11.2**, die am 2026-09-08 gelöscht und nach
docs/claude-history/phase-11.2-google.md archiviert worden ist — GEMESSEN am Repo (CC,
2026-09-10): Zeiger auf **VERMERK 6, 10, 14 und 16** in docs/offene-punkte.md,
docs/db-stand.md, docs/ziel-befunde.md und den Archiven. **Bis zum 2026-09-10 liefen sie
ins LEERE**; mit VERMERK 3 dieser Phase trifft der erste einen **EXISTIERENDEN, aber
FALSCHEN** Eintrag.
**DER KERN, ohne den der Eintrag als Aufräumposten gelesen wird: EIN TOTER ZEIGER ZWINGT
ZUM SUCHEN, EIN FALSCHER NICHT.** Und es ist **kein Einzelfall, sondern eine BAUFORM** —
mit jedem weiteren Vermerk dieser Phase kippt ein weiterer.
**WAS AUSDRÜCKLICH NICHT FOLGT: eine andere Nummerierung.** Die 3 ist die nächste freie;
ein Sprung bräche die Fortschreibungsregel und träfe die Zeiger auf 4 ff. genauso.
**EIN BESTEHENDER BACKLOG-EINTRAG IST FÜR DIESE TEILMENGE ÜBERHOLT — ALS ZEIGER VERMERKT,
JENE DATEI NICHT ANGEFASST:** Eintrag 67 in docs/claude-history/backlog-polish.md ("146
tote Doku-Zeiger … der Schaden ist ein Suchweg, kein Verlust") beschreibt genau den
Schaden, der hier **nicht mehr** zutrifft. Für die vier Zeiger oben ist der Suchweg
weggefallen und an seine Stelle ein falsches Ziel getreten.
TRIGGER: jeder weitere Vermerk dieser Phase — **EINGETRETEN und WIEDERKEHREND**.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10); dass es mit jedem Vermerk erneut eintritt,
ist eine ABLEITUNG. Die Einordnung als Vorrat statt offener Punkt ist
ARCHITEKT/OWNER-ENTSCHEIDUNG 2026-09-10 — der Punkt gehört dieser Phase und geht am
Phasenende über die Hebung weiter.

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

### (3) EINE SUCH-ACHSE, DIE AUS DEN ERWARTETEN FORMULIERUNGEN GEBILDET IST, BESTÄTIGT DIE ERWARTUNG STATT SIE ZU PRÜFEN

**DER BELEG — GEMESSEN am eigenen Lauf (CC, 2026-09-10):** Um zu prüfen, welche Stellen
eine Messung widerlegt hat, ist zuerst die Achse
`kein anbieter|dieses rahmens|nicht zu haben|nie gemessen` gefahren worden. Sie ergab
**GENAU DREI Treffer — exakt die drei Stellen, die der Auftrag wörtlich zitierte.**
**DAS SAH WIE EINE BESTÄTIGUNG AUS.** Eine VIERTE Stelle im selben Block trägt **KEINES
dieser Wörter** ("der Testklick zählt beim Anbieter als echte Conversion") und wurde erst
über eine zweite, breitere Achse sichtbar; eine FÜNFTE kam im selben Zug dazu, im selben
Absatz wie eine der drei.

**DER STRUKTURELLE AUSLÖSER GEHÖRT DAZU, sonst liest sich der Kandidat als Ermahnung zur
Sorgfalt:** Der Prompt zitierte die drei Stellen WÖRTLICH und gab damit die Achse vor.
**WER DIE GESUCHTEN FORMULIERUNGEN KENNT, SUCHT NACH IHNEN STATT NACH DER SACHE** — und
findet dann zuverlässig genau das, was er schon wusste.

**DIE GEGENFORM, in zwei Teilen:** Die Achse aus dem **GEGENSTAND** bilden, nicht aus den
bekannten Fundstellen. Und **die Zahl der Treffer NICHT als Bestätigung lesen, wenn sie
der Zahl der erwarteten Stellen entspricht** — genau diese Übereinstimmung ist das
Warnsignal, nicht der Beweis.

**DIE ABGRENZUNGEN, beide im Volltext gelesen (CC, 2026-09-10):**
· **"EINE ZÄHLUNG ENTLANG EINER ACHSE IST BEI EINEM UMBAU SYSTEMATISCH ZU NIEDRIG, NICHT
  ZUFÄLLIG"** (docs/immer-beachten.md) — der nächste Nachbar. Dort sind es MEHRERE
  Bruch-Achsen, die man einzeln benennen muss; hier ist es EINE Achse, die aus der
  ERWARTUNG gebildet ist. Jene Regel zählt zu wenig Achsen, diese zieht die eine falsch.
· **"EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND"**
  (docs/immer-beachten.md) — dort erzeugt das WERKZEUG den Nicht-Treffer; hier arbeitet
  das Werkzeug tadellos, und die ACHSE ist zu eng. Verwandte Figur, anderer Verursacher.

**NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz an einer der
beiden Nachbarregeln. **KEINE EMPFEHLUNG.**
GEMELDET 2026-09-10, NICHT GEBAUT.

**PROVENIENZ:** Der Fall ist GEMESSEN am eigenen Lauf (CC, 2026-09-10) — die drei Treffer
der engen Achse und die zwei zusätzlichen der breiten sind beide protokolliert. Dass der
Prompt der Auslöser war, ist eine **ABLEITUNG** und am Prompt jener Runde ablesbar, nicht
am Repo.

## Scheiben-Vermerke

Ein Vermerk entsteht erst, wenn eine Scheibe gebaut UND live geprüft ist — nicht bei
grünen Gates allein.

### VERMERK 1 — Scheibe 11.3a, gebaut und live bewiesen

**CODE-COMMIT: `54259a4`** (`feat(capi): projekt-eigener Testmodus fuer meta und tiktok`,
17 Dateien, 1093 Einfügungen, 14 Löschungen).
**COMMIT DIESES VERMERKS: `089cbd6`** (`docs(claude): Vermerk 1 — Scheibe 11.3a live
bewiesen`).
**NACHGETRAGEN AM 2026-09-09, VOR DEM ANLEGEN VON VERMERK 2** — hier stand die LÜCKE.
Der Nachtrag ist keine Formsache: Die Lücken-Regel erlaubt GENAU EINE offene Lücke, und
die gehört dem JÜNGSTEN Vermerk. Wäre Vermerk 2 vor diesem Nachtrag entstanden, stünden
zwei da — und dann sagt die Regel nicht mehr, welche der beiden der noch nicht committete
Vermerk ist.

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

### VERMERK 2 — Scheibe 11.3b, gebaut und live bewiesen

**CODE-COMMIT: `e9544c6`** (`feat(projects): Testmodus-Schalter und Banner in der
Oberflaeche`, 11 Dateien, 2034 Einfügungen, 68 Löschungen).
**COMMIT DIESES VERMERKS: `daf139e`** (`docs(claude): Vermerk 2 — Scheibe 11.3b live
bewiesen, zwei Ziele`).
**NACHGETRAGEN AM 2026-09-09** — hier stand die LÜCKE, die beim Anlegen dieses Vermerks
entstand; die von VERMERK 1 war im selben Zug geschlossen worden.
**ES GIBT DAMIT DERZEIT KEINE OFFENE LÜCKE, und das ist regelkonform:** Die Lücken-Regel
sagt, es dürfe immer nur EINE geben — nicht, dass eine da sein müsse. Keine Lücke heisst,
dass jeder Vermerk dieser Datei seinen Commit kennt.

**VORAUSSETZUNGEN — GEMESSEN LIVE, 2026-09-09, Stefan.** Das Deployment stand auf
**Ready**, bevor geprüft wurde; der **A/B-Betrieb war AUS**. Beides ist festgestellt und
nicht unterstellt.

**ES SIND ZWEI ZIELSYSTEME GEFAHREN WORDEN, UND SIE WERDEN GETRENNT GEFÜHRT.** Das ist
keine Ordnungsliebe: Die beiden Läufe zeigen NICHT dasselbe, und der zweite zeigt mehr.
Wer sie zusammenzieht, verliert genau den Unterschied.

#### META-LAUF

**DAS BANNER.** Über dem Editor stand wörtlich **"Testmodus: Meta (bis 9.9.2026,
19:03:00)"** — es **nennt das verursachende Ziel**, trägt einen **festen Endzeitpunkt**,
weist auf die ruhende eigene Zählung UND auf die weiterlaufende Annahme beim Anbieter hin
und nennt den Weg zum Beenden. Die Karte zeigte **denselben** Zeitpunkt, dazu
"verlängern" und "jetzt beenden". Damit ist die Schärfung des Zuschnitts eingelöst und
nicht nur behauptet.

**DER RIEGEL, ÜBER DIE OBERFLÄCHE GESCHALTET.** Das Ereignis
`548e2d5c-9801-4e08-b1e3-37debcb0f699` ist im Events Manager um **18:09:50 und 18:09:51
als Browser und Server** angekommen, dedupliziert — und steht in **KEINER `events`-Zeile**
(gezielte Abfrage auf genau diese `event_id`: null Zeilen). Beide Beobachtungsorte fehlen,
wie verlangt.

**DIE POSITIVKONTROLLE HAT BEIM ERSTEN EINSATZ ZUGESCHLAGEN, UND DAS IST DER WERTVOLLSTE
TEIL DIESES VERMERKS.** Der erste Klick kam bei Meta **NICHT AN**. Ohne den
Pflicht-Schritt wäre der leere Rücklauf aus `events` als bestandener Riegel gebucht
worden — obwohl **nichts gemessen war**: "der Riegel hat gegriffen" und "es hat überhaupt
nichts gefeuert" sehen in der Abfrage identisch aus. Erst nach einer **erneuten
Veröffentlichung der Seite** feuerte das Ereignis. **DIE AUFLAGE HAT SICH ALSO NICHT
THEORETISCH BEWÄHRT, SONDERN AN IHREM ERSTEN GEBRAUCH.**

**BEENDEN.** Nach "jetzt beenden" war das Banner **sofort weg**.

**REGRESSION.** Hinter dem Anker `16:15:08Z` wieder **`server` UND `browser`** zur
`event_id` `78654146-f287-486e-9239-a2a819614dd8`.

#### TIKTOK-LAUF — UND ER IST DER SAUBERERE DER BEIDEN

**DAS BANNER** nannte **TikTok** und den Endzeitpunkt **20:03:08**. Damit ist die
Schärfung (10) an einem ZWEITEN Ziel belegt und nicht nur an dem, für das sie geschrieben
wurde.

**DER RIEGEL, BEIDE HÄLFTEN IM SELBEN FENSTER.** Anker `17:02:24Z`. Das Ereignis
`d6cabd08-8f8f-4e33-8eda-28f1bdab37ed` erschien in TikToks Test-Events-Ansicht um
**17:04:37 UTC**, Verbindungsart **Server** — und hinter dem Anker steht in `events`
**KEINE Zeile**. **OHNE DIE LÜCKE DES META-LAUFS:** Dort brauchte es einen zweiten Anlauf,
hier fallen Ankunft beim Anbieter und Abwesenheit bei uns in dasselbe Zeitfenster.

**DER GRUND, WARUM DIESER LAUF MEHR ZEIGT ALS DER ERSTE — UND ER IST DER EIGENTLICHE
ERTRAG DES TAGES: `TIKTOK_TEST_EVENT_CODE` IST IN VERCEL NICHT GESETZT.** Der beim
Anbieter angekommene Code `TEST46650` kann damit **nur aus der PROJEKTZEILE** stammen; es
gibt keine zweite Quelle, aus der er hätte kommen können.

**DAS IST DER ERSTE BELEG DER PHASE, DASS DER PROJEKT-EIGENE CODE BIS IN DIE NUTZLAST
DURCHREICHT UND BEIM ANBIETER ANKOMMT.** Beim Meta-Lauf war das **prinzipiell nicht
trennbar**: Dort trugen Umgebungsvariable und Projektzeile DENSELBEN Wert (`TEST13317`,
s. Vorrat (10)), und kein Instrument jenes Laufs konnte zeigen, welche der beiden Quellen
die Nutzlast gefüllt hat. Hier gibt es nur eine Quelle, also ist die Zuordnung erzwungen
und nicht erschlossen.

**BEENDEN:** Banner sofort weg. **REGRESSION** hinter dem Anker `17:08:00Z`: **zwei**
Ereignisse, je `server` UND `browser` (`a7e378dc`, `28c7b5e1`).

**EIN ANBIETER-BEFUND AUS DIESEM LAUF, DER NICHT IN DIESE DATEI GEHÖRT — HIER NUR DER
ZEIGER:** TikToks Test-Events-Ansicht sagt an der Oberfläche wörtlich *"Test events will
not be included in actual data"* (GELESEN an der Oberfläche, Stefan, 2026-09-09).
**DAS IST DAS GEGENTEIL VON METAS DOKU-AUSSAGE** (*"not dropped … used for targeting and
ads measurement purposes"*), auf der die Rahmung dieser Phase ruht — s. "Die Phase liefert
SICHTBARKEIT, nicht ISOLATION".
**DER VOLLTEXT GEHÖRT NACH docs/ziel-befunde.md**, Abschnitt "TikTok (Events API 2.0)";
jene Datei gehört keiner Phase und wird nicht archiviert. **Er wird hier NICHT
ausgeschrieben und dort in dieser Runde NICHT eingetragen** — das ist eine eigene Runde
(Vorrat (23)).
**NICHT GEMESSEN, und der Satz gehört dazu:** ob das Ereignis AUCH in TikToks normaler
Ereignis-Ansicht erscheint. Der Lauf hat das nicht geprüft. Die Oberflächen-Aussage ist
damit GELESEN und die Wirkung UNGEMESSEN — genau die Trennung, an der die Meta-Rahmung
schon einmal gekippt ist.

**BEIDE PFLICHT-MUTATIONEN GEFAHREN, VORHERSAGEN VOR DEM LAUF ABGELEITET UND EXAKT
GETROFFEN:**
- **Mutation 1** (das Ownership-Gate aus `startTestMode` entfernt, direkt mit dem
  Admin-Client geschrieben) färbte **genau IDOR 2** rot. Fehlerklasse wörtlich:
  `expected { ok: true, state: { …(2) } } to deeply equal { ok: false, reason:
  'not_found' }`.
- **Mutation 2** (die Nicht-Leer-Prüfung entfernt) färbte **genau einen** Lauf rot. Sie
  ist im **breiteren Suchraum** gefahren worden (`src/app/projects` UND `src/components`),
  damit ein Überschuss aufgefallen wäre — es gab keinen.
- Beide Rücknahmen belegt: kein leerer Diff, die Marker nicht mehr auffindbar, CR und NUL
  je 0. **EIN ZWISCHENBEFUND IST AUSDRÜCKLICH KEINER GEWESEN:** Eine Suche nach
  "MUTATIONSPROBE" ergab 23 Treffer — alle 23 stehen unverändert in `HEAD` (Kommentare in
  Bestands-Testdateien), keiner in einer der zehn berührten Dateien. Der Suchbegriff war
  zu weit, nicht der Bestand verunreinigt.

**DER UMZUG IST MASCHINELL ALS UMZUG BELEGT, NICHT ALS UMBAU:** 677 Bytes gegen 677,
**leerer Diff**, identischer SHA-256
(`acd0657b94ae3bc02e05c9e96c835394ff16f77104d122cfe298d85329e1c358`) — geprüft am
Arbeitsbaum UND am **committeten Objekt**. Einziger Unterschied ist das Schlüsselwort
`export`, ohne das es kein Umzug wäre.

**GATES:** `tsc --noEmit` grün · `eslint` 0 Fehler (die eine Warnung steht in
`src/lib/tracking/consent.test.ts`, also ausserhalb des Diffs, und ist vorbestehend) ·
`vitest` **76 Dateien / 1599 Tests grün, vorher 75 / 1551** · `next build` grün. Alle vier
VOR dem Diff.

#### ACHSE 2 (OWNERSHIP) IST NICHT GEFAHREN WORDEN — NICHT BESTANDEN

**DER UNTERSCHIED IST KEIN WORTSPIEL:** "Nicht bestanden" hiesse, der Schutz hätte
versagt. "Nicht gefahren" heisst, der Schritt hat nie stattgefunden — und genau so wird
er protokolliert.

**DER GRUND KORRIGIERT DIE ANLEITUNG UND NICHT DEN BAU: DIE OBERFLÄCHE BIETET DEN ANGRIFF
GAR NICHT AN.** Ein zweites Konto sieht das fremde Projekt nicht, es gibt kein Feld für
eine fremde Projekt-Kennung, und es gibt keinen Weg, per Klick eine Aktion mit einem
fremden Ziel auszulösen. **Der Angriff, gegen den das Gate schützt, ist eine GEBASTELTE
ANFRAGE, kein Klick.** Der Architekt hat einen Unit-Nachweis in einen Live-Schritt
übersetzt, den es so nicht gibt.

**DIE ACHSE TRÄGT HEUTE ALLEIN IDOR 2** — und der ist an diesem Tag rot geworden, als das
Gate entfernt wurde. Das ist ein Nachweis, aber ein anderer als ein Live-Nachweis: Er
belegt, dass der Riegel im CODE greift, nicht dass er im BETRIEB greift.

**EIN LIVE-NACHWEIS BRÄUCHTE EINEN WERKZEUGSTAND, DEN DIESES PROJEKT NICHT HAT** — etwas,
womit sich eine Server-Action-Anfrage von Hand zusammenstellen und mit fremder
Projekt-Kennung absenden liesse. Das ist als Vorrats-Eintrag **(16)** mit Trigger geführt
und ausdrücklich **KEIN Mängel-Vermerk an dieser Scheibe**: Der Bau ist vollständig, es
fehlt ein Messmittel.

### VERMERK 3 — MESS-RUNDE gegen Pinterest (2026-09-10), KEINE SCHEIBE

**DIES IST EIN MESS-VERMERK UND KEIN SCHEIBEN-VERMERK.** Er hält eine Runde fest, die
**keine Zeile Code geändert hat**: kein Zuschnitt, kein Bau, kein Test, keine Migration.
Er nimmt die nächste freie Nummer und tritt hinten an, wie die Fortschreibungsregeln es
verlangen.

**ES GIBT DESHALB KEINEN CODE-COMMIT, UND DAS IST KEIN VERSÄUMNIS.** Der Satz steht hier,
weil eine fehlende Commit-Nummer sonst als vergessen gelesen wird und jemand sie sucht.
**COMMIT DIESES VERMERKS: `494d929`** (`docs(claude): Pinterest-Testmodus gemessen —
test=true wirksam, Isolation belegt`).
**NACHGETRAGEN AM 2026-09-10** — hier stand die LÜCKE. **DAMIT KENNT JEDER VERMERK DIESER
DATEI SEINEN COMMIT, und es gibt KEINE offene Lücke mehr.** Das ist regelkonform: Die
Lücken-Regel sagt, es dürfe immer nur EINE geben — nicht, dass eine da sein müsse.

**PROVENIENZ DER GANZEN RUNDE, und sie ist DREIFACH — CC HAT NICHTS DAVON GEMESSEN:** Die
vier Läufe und die Ablesungen an der Anbieter-Oberfläche sind **GEMESSEN LIVE, 2026-09-10,
Stefan**. Die Aussage über den Vercel-Log ist ebenfalls **GEMESSEN LIVE, 2026-09-10,
Stefan**. Die Doku-Lesung, auf die Teil (v) der Befund-Datei zurückgeht, ist **GELESEN
2026-09-10 durch die CHAT-INSTANZ**. Wo unten ABLEITUNG steht, ist es eine Ableitung aus
diesen Angaben und keine weitere Messung.

**DER GEGENSTAND, IN EINEM SATZ:** Die Runde entscheidet die offene Namensfrage aus dem
Zuschnitt (`test=true` gegen `is_test=TRUE`) und misst zusätzlich eine Eigenschaft der
Anbieter-Oberfläche, die den späteren Bau bindet.

#### DIE VIER LÄUFE — GEMESSEN LIVE, 2026-09-10, Stefan

**LAUF A — ohne Testmodus, Variable nicht gesetzt.**
07:53:29 UTC · `event_id` `450ea2c8-a676-4aa6-bb0c-51e625bd941f`.
In Pinterests Eventübersicht **ERSCHIENEN** (Ablesung 07:53 UTC).

**LAUF B — mit `?test=true`, Test-Ansicht GESCHLOSSEN.**
08:03:06 UTC · `event_id` `8f494d43-af2a-4ddf-9d07-5536732bd8cd`.
08:04:59 UTC · `event_id` `8e99d49a-42db-4a7b-aabd-012d7c2cd32a`.
In der Eventübersicht **NICHT erschienen**. In der Test-Ansicht **NICHT erschienen**.

**LAUF C — ohne Testmodus, nach Löschen der Variable und Redeploy.**
08:15:00 UTC · In der Eventübersicht **ERSCHIENEN, Zähler auf 2**.

**LAUF D — mit `?test=true`, Test-Ansicht GEÖFFNET.**
08:33:18 UTC · `event_id` `3fa58d04-284a-4886-9b4a-c661ba5c3e1a`.
In der Test-Ansicht **ERSCHIENEN**: Eventtyp `lead` · Plattform Web · Eventquelle API ·
URL `https://meta-test-5nlm3e.publayer.net/` · Nutzerdaten User Agent und IP-Adresse ·
Warnungen (2): "external_id is missing", "click_id is missing".

**VERCEL-LOG, Fenster 08:00–08:10 UTC.** Pinterest-Forward-Warnung
"external_id is missing…", **KEINE Fehler**, 200 OK bestätigt.

#### DIE VIER SCHLÜSSE, je mit ihrem Beleg

**SCHLUSS 1 — `test=true` IST DER WIRKSAME PARAMETERNAME. ABLEITUNG aus den vier Läufen.**
BELEG: Vier Conversions gefeuert, der Zähler der Eventübersicht steht auf **2** — genau
die zwei ohne Parameter (A und C). Ein ignorierter Parameter ergäbe **4**. Die Ableitung
ruht damit auf einer Zahl, nicht auf einem Eindruck.

**SCHLUSS 2 — DER ANBIETER HAT DIE B-LÄUFE ANGENOMMEN UND VERARBEITET, NICHT ABGELEHNT.
ABLEITUNG aus dem Vercel-Log.** BELEG: **200 OK** plus eine **INHALTLICHE Warnung über die
Nutzlast** ("external_id is missing"). Eine Ablehnung erzeugt so etwas nicht — sie erzeugt
einen Fehlerstatus und keine Feld-Warnung. **DAMIT IST DIE ALTERNATIVURSACHE „leer, weil
abgelehnt" AUSGESCHLOSSEN**, und genau diese Alternative ist es, an der ein solcher
Nachweis sonst scheitert.

**SCHLUSS 3 — DIE ISOLATION IST GEMESSEN: test-markierte Ereignisse erscheinen NICHT in der
Eventübersicht. ABLEITUNG aus SCHLUSS 1 zusammen mit SCHLUSS 2.** Erst beide zusammen
tragen: der erste zeigt die Abwesenheit, der zweite schliesst aus, dass sie von einer
Ablehnung kommt. Ohne den zweiten
wäre der leere Rücklauf kein Befund — dieselbe Figur wie die Positivkontrolle in VERMERK 1
und VERMERK 2.

**SCHLUSS 4 — DIE TEST-ANSICHT IST EIN LIVE-STROM OHNE RÜCKSCHAU. ABLEITUNG aus einem
Positiv-/Negativ-Paar an DERSELBEN Ansicht.** BELEG: **B** (Ansicht geschlossen) ist nie
erschienen, **D** (Ansicht geöffnet) sofort. **ZUSÄTZLICH SCHLIESST DIE REIHENFOLGE BLOSSE
VERZÖGERUNG AUS:** C (08:15) erschien, während das ÄLTERE B (08:03/08:04) nie erschien —
eine Ansicht, die bloss nachhinkt, hätte das ältere zuerst gezeigt.

#### DREI GRENZEN, DIE MITMÜSSEN

**· DER ZÄHLERSTAND DER EVENTÜBERSICHT NACH LAUF D IST UNGEMESSEN.** Die Ablesung "2"
stammt von **08:15**, Lauf D lief um **08:33**. **DER ISOLATIONS-BELEG RUHT AUF DEN
B-LÄUFEN, NICHT AUF D.** Wer D mitzählt, hält eine nicht gefahrene Ablesung für einen
Befund.

**· GEMESSEN IST DIE BERICHTERSTATTUNG, NICHT DIE OPTIMIERUNG.** Pinterests Doku spricht
von einer Sandbox ohne Verarbeitung für Reporting **UND** Optimierung
(docs/ziel-befunde.md, Abschnitt "Pinterest (Conversions API)", Teil (m), GELESEN
2026-08-20); **belegt ist heute nur die erste Hälfte.** Die zweite ist dieselbe Achse, die
CLAUDE.md unter "## Offene Punkte" als "DIE WIRKUNG AUF DIE GEBOTE IST UNGEMESSEN" führt —
dort für Google, hier für Pinterest, und in beiden Fällen ungemessen.

**· DIE MESSUNG SAGT NICHTS ÜBER `is_test`.** Sie schliesst den zweiten Namen **NICHT
AUS**; sie macht ihn für den Bau **entbehrlich**. "Die Zwei-Namen-Frage ist entschieden"
wäre zu stark: gemessen ist, dass der EINE Name wirkt, nicht, dass der andere es nicht
tut.

#### EINE NAMENSKOLLISION, DIE DIESER VERMERK ERZEUGT — GEMELDET, NICHT BEHOBEN

**MIT DIESEM VERMERK TRÄGT `docs/aktiver-stand.md` WIEDER EINEN "VERMERK 3" — UND MEHRERE
ZEIGER MEINEN EINEN ANDEREN.** GEMESSEN am Repo (CC, 2026-09-10): `docs/roadmap.md` nennt
"docs/aktiver-stand.md, VERMERK 3"; daneben stehen Zeiger auf VERMERK 6, 10, 14 und 16
derselben Datei in docs/offene-punkte.md, docs/db-stand.md, docs/ziel-befunde.md und den
Archiven. **SIE ALLE MEINEN DIE STANDDATEI DER PHASE 11.2**, die am 2026-09-08 gelöscht und
nach docs/claude-history/phase-11.2-google.md archiviert worden ist.

**WARUM DAS SCHLIMMER IST ALS VORHER:** Bis heute liefen diese Zeiger **ins Leere** — die
Nummer gab es in der aktuellen Datei nicht. Ab jetzt trifft mindestens einer von ihnen
einen **existierenden, aber falschen** Eintrag, und ein falscher Zeiger zwingt nicht zum
Suchen (docs/immer-beachten.md, "EIN ZEIGER AUF EINE NUMMERIERTE ABLAGE KANN AUS
PLAUSIBILITÄT ENTSTEHEN STATT AUS NACHSEHEN").

**WAS HIER NICHT GETAN WIRD, UND WARUM:** Die Nummer wird **nicht** übersprungen — 3 ist
die nächste freie, und ein Sprung bräche die Fortschreibungsregel und träfe die Zeiger auf
VERMERK 4 ff. genauso. Die Zeiger werden **nicht** nachgezogen: drei der betroffenen
Dateien liegen ausserhalb des Scopes dieser Runde. **GEMELDET, NICHT BEHOBEN** — die
Entscheidung darüber ist eine eigene.

## Scheibe 11.3b — Die drei Gesten und das Banner in der Oberfläche

Die zweite Scheibe gibt dem Testzustand seinen Weg in die Oberfläche: drei Gesten je Ziel
und ein Banner im Projekt. Sie baut keinen Testknopf und keinen Rückkanal.

**GEBAUT UND LIVE BEWIESEN AM 2026-09-09.** Der Nachweis steht in VERMERK 2 unter
"Scheiben-Vermerke"; die Entscheidungen, die über diese Scheibe hinaus binden, stehen als
(8) bis (11) unter "Entscheidungen, die über ihre Scheibe hinaus binden".

**DIESER ABSCHNITT STEHT HINTEN UND NICHT BEI 11.3a**, weil die Fortschreibungsregeln
dieser Datei es so verlangen. Die Reihenfolge in der Datei ist die des EINTRAGENS, nicht
die des Bauens; wer die Scheiben in ihrer Abfolge lesen will, liest das Verzeichnis.

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-09.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist entweder unten stehengeblieben oder unter die
Entscheidungen gezogen. **Die Titel werden ohne Markierungszeichen zitiert** — sonst
kollidierte das Zitat dauerhaft mit jeder gleichlautenden Überschrift.

- "Die Gestalt — kein An/Aus-Schalter, sondern DREI GESTEN" — abgelaufen, weil GEBAUT.
  Die drei Gesten stehen im Code und in ihren Läufen; der Grund (ein Schalter hätte einen
  Zustand ohne Code zur Folge, den der CHECK nicht zulässt) ist in die Streichung von
  Vorrat (13) eingegangen, wo er den Beleg trägt.
- "Das Ownership-Gate ist die SICHERHEITSACHSE dieser Scheibe, nicht ihr Formalismus" —
  abgelaufen als ZUSCHNITT, eingelöst als Bau: Sitzung, Ownership über den
  authentifizierten Client, erst danach der Admin-Client, in allen drei Aktionen. Was
  BLEIBT, steht unten; die Lücke, die der Bau NICHT schliesst, ist Vorrat (15).
- "Die Frist: FEST 60 MINUTEN" — abgelaufen. Die Zahl steht als benannte Konstante mit
  ihrer Begründung im Code, und ein Lauf nagelt sie fest. Sie bleibt unten als Wert
  stehen, weil sie künftige Runden bindet.
- "Der Schreibweg" — abgelaufen. Die drei Auflagen (nur die zwei Testspalten, Frist gegen
  die Laufzeit-Uhr, Nicht-Leer-Prüfung) sind gebaut und in den Streichungen der
  Vorrats-Einträge (6) und (12) belegt.
- "Wo der Schalter erscheint — und wo nicht" — abgelaufen. Die Bedingung fällt seit dem
  Bau auf dem SERVER; der Beleg steht an der Streichung von Vorrat (7), die verbliebene
  Lücke an (11) und (21).
- "Der Lesepfad" — abgelaufen, weil ENTSCHIEDEN: Der Ort des Lesers ist eine eigene
  Aktion, und das ist als Entscheidung (9) festgehalten. Die Randregel gehört unverändert
  zu Entscheidung (4).
- "Das Banner" — abgelaufen. Was daran über die Scheibe hinaus bindet, steht als
  Entscheidung (10) — es nennt das verursachende Ziel — und als (11), das Hydrations-Gate.
- "safeAction ist PFLICHT" — abgelaufen, weil eingelöst: beide Gesten laufen darüber, ein
  Lauf hält fest, dass der Knopf nach einem Wurf bedienbar bleibt. Die Regel selbst steht
  dauerhaft in docs/immer-beachten.md und gehört nicht hierher.
- "Ausdrücklich NICHT dabei, je mit Grund" — abgelaufen. Die vier Ausschlüsse sind
  eingehalten: kein Testknopf, kein pinterest/google/linkedin, keine Selbstaktualisierung,
  kein Eingriff in ingest.ts, token.ts oder einen Adapter. Ihre Gründe stehen unter
  "Gegenstand der Phase" und in der Abgrenzung zu Phase 11.4.
- "Der Live-Nachweis der Scheibe — ZWEI ACHSEN" — abgelaufen, weil gefahren. Was
  herauskam, steht in VERMERK 2 — einschliesslich der Achse, die NICHT gefahren werden
  konnte, und des Grundes dafür.
- "Was die Scheibe offen lässt" — abgelaufen. Alle drei Fragen sind entschieden: der Ort
  des Lesers als (9), die Sichtbarkeit des Codes als (8), und die abgelaufene Frist bleibt
  stehen — eingelöst in testModeStateFrom, das sie als eigene Lage führt.

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DIE FRIST IST FEST UND BETRÄGT EINE STUNDE.** Keine Auswahl, keine freie Eingabe. Sie
  ist ein DECKEL gegen einen vergessenen Testmodus, keine Präferenz — und sie ist kürzer
  als das Wechselintervall des Codes, kann also nie einen brauchbaren Zustand
  abschneiden. **Wer sie ändert, ändert eine benannte Konstante und macht damit einen
  sichtbaren Diff**; ein Lauf hält den Wert fest.
- **DIE BAUFORM DES GATES BINDET JEDE WEITERE AKTION DIESER PHASE:** Sitzungsprüfung,
  Ownership über den AUTHENTIFIZIERTEN Client mit greifender RLS, ERST DANACH
  createAdminClient(). Kein Abkürzen über eine project_id aus dem Request. **Und je
  Aktion ein eigener IDOR-Wächter mit ZWEI Assertions** — "Admin-Client nie entstanden"
  und "nichts geschrieben bzw. gelesen" sind zwei verschiedene Aussagen, und ein Gate
  kann die erste erfüllen und die zweite verfehlen.
- **DIE ANZEIGE IST DIE ZWEITE INSTANZ, NIE DIE AUTORITÄT.** Sie aktualisiert sich nicht
  von selbst; läuft die Frist ab, während die Seite offen ist, steht der alte Stand bis
  zum nächsten Laden. **Der Riegel ist davon unberührt — er liest je Beacon.** Wer das
  später "verbessert", baut eine Selbstaktualisierung und braucht dafür einen eigenen
  Zuschnitt.

**PROVENIENZ DES ZUSCHNITTS:** OWNER-ENTSCHEIDUNG 2026-09-09 (Gestalt, Bauform des
Ownership-Gates, Frist von 60 Minuten, Umfang und Ausschlüsse); die Schärfung des Banners
— es nennt das verursachende Ziel — ebenfalls OWNER, 2026-09-09.
