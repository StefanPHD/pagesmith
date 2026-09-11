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
- ## Scheibe 11.3c — Der Paar-CHECK wird ersetzt
- ## Was beim Zuschnitt von 11.3d vorliegen muss — gesammelt, nicht zugeschnitten
- ## Scheibe 11.3d — Der Auflösungs-Pfad lernt Ziele ohne Code
- ## Scheibe 11.3e — Pinterest in der Oberfläche
- ## Scheibe 11.3f — Zwei Kundentexte

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
**Gebaut sind DREI davon — `meta`, `tiktok` und seit dem 2026-09-10 `pinterest`; ZWEI sind
OHNE CODE ABGESCHLOSSEN — `linkedin` (Entscheidung (17)) und `google` (Entscheidung (18)),
beide seit dem 2026-09-11. KEINES STEHT MEHR AUS.** **DER MARKER IN CLAUDE.md BLEIBT
TROTZDEM AUF `[ ]`** — nicht mehr, weil ein Ziel aussteht, sondern weil das Phasenende ein
eigener Vorgang ist und hier nicht vollzogen wird.

**NACHGEZOGEN AM 2026-09-11, ZWEITER NACHZUG DESSELBEN TAGES, NICHT GESTEMPELT — HIER STAND:
"Gebaut sind DREI davon — `meta`, `tiktok` und seit dem 2026-09-10 `pinterest`; `linkedin`
ist seit dem 2026-09-11 OHNE CODE ABGESCHLOSSEN (Entscheidung (17)); EINES steht aus:
`google`. DIE PHASE IST DAMIT NICHT FERTIG, und der Marker in CLAUDE.md bleibt aus genau
diesem Grund auf `[ ]`."** Das war bis zur Owner-Entscheidung über `google` richtig.
**DERSELBE GRUND WIE AN DEN ZWEI NACHZÜGEN DARUNTER:** Die Aussage ist eine STANDAUSSAGE, und
der nächste Zuschnitt liest sie als Ausgangslage — wer ihr folgt, sucht für `google` einen
Zuschnitt, den es nicht mehr gibt. **AUCH `google` IST NICHT GEBAUT, SONDERN
ABGESCHLOSSEN**; die beiden Wörter werden hier aus demselben Grund nicht zusammengezogen wie
bei `linkedin`. **OB DIE PHASE DAMIT AUF `[x]` GEHT, IST HIER NICHT ENTSCHIEDEN** — das
entscheidet das Phasenende. **IM SELBEN ZUG NACHGEZOGEN** sind die Überschrift der Liste
"was jedes Ziel als nächstes braucht", der `google`-Punkt darin und der Halbsatz unter "WAS
HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST" — vier Stellen, die den Stand der Ziele behaupten;
wer nur eine anfasst, macht die anderen zur Falle.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-11 (Entscheidung (18)), auf der Grundlage der
Abschnitts-Lesung desselben Tages (docs/ziel-befunde.md, Abschnitt "Google (Google Ads
Conversions · GA4)", Teile (ch) bis (cr)). Dass es genau diese vier Stellen sind, ist GEMESSEN
am Dateitext (CC, 2026-09-11; Achse aus dem Gegenstand: jede Zeile, die `google` nennt, dazu
"steht aus", "stehen aus", "verblieben", "offen ist nur", "allein noch", "NUR NOCH EINES",
"noch offen", "Fünftel", "nicht fertig", "ausstehend", ohne Rücksicht auf Gross- und
Kleinschreibung; jeder Treffer einzeln gelesen).

**NACHGEZOGEN AM 2026-09-10, NICHT GESTEMPELT — HIER STAND "Gebaut sind zwei davon; drei
stehen aus."** Das war bis zum Bau der Scheibe 11.3e richtig (Commit `9422920`, VERMERK 6).
**WARUM DIESE ZAHL NACHGEZOGEN WIRD UND NICHT ALS ZEITDOKUMENT STEHENBLEIBT:** Sie ist
**keine datierte Messung**, sondern eine **STANDAUSSAGE im Gegenstand der Phase** — der
nächste Zuschnitt liest sie als **AUSGANGSLAGE**. Wer ihr folgt, plant für drei
ausstehende Ziele statt für zwei und sucht einen Zuschnitt für eines, das steht.
**DIE ZWEI VERBLIEBENEN SIND DESHALB BEIM NAMEN GENANNT:** Eine blosse Zahl liesse offen,
WELCHE, und die drei Ziele brauchen ausdrücklich **verschiedene** Dinge — was jedem von
ihnen fehlt, steht unverändert in der Liste weiter unten.
PROVENIENZ: der Bau von `pinterest` ist GEMESSEN am Repo (CC, 2026-09-10, Commit `9422920`,
gepusht) und live belegt (VERMERK 6); dass `google` und `linkedin` die zwei verbliebenen
sind, ist am Bestand dieser Liste ABLESBAR.

**NACHGEZOGEN AM 2026-09-11, NICHT GESTEMPELT — HIER STAND: "Gebaut sind DREI davon —
`meta`, `tiktok` und seit dem 2026-09-10 `pinterest`; ZWEI stehen aus: `google` und
`linkedin`."** Das war bis zur Owner-Entscheidung vom 2026-09-11 richtig. **DERSELBE GRUND
WIE AM NACHZUG DARÜBER:** Die Zahl ist eine STANDAUSSAGE, und der nächste Zuschnitt liest sie
als Ausgangslage — wer ihr folgt, sucht für `linkedin` einen Zuschnitt, den es nicht mehr
gibt. **`linkedin` IST NICHT GEBAUT, SONDERN ABGESCHLOSSEN** — die beiden Wörter werden hier
nicht zusammengezogen, weil ein abgeschlossenes Ziel keinen Testmodus hat. **IM SELBEN ZUG
NACHGEZOGEN** ist der `linkedin`-Punkt in der Liste darunter; wer nur eine der beiden Stellen
anfasst, macht die andere zur Falle. Die Sätze des Nachzugs darüber ("DIE ZWEI VERBLIEBENEN
…") bleiben als Aussage über den 2026-09-10 stehen.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-11 (Entscheidung (17)), auf der Grundlage der
Abschnitts-Lesung desselben Tages (docs/ziel-befunde.md, Abschnitt "LinkedIn (Conversions
API)", Teile (aa) bis (al)).

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

**WAS JEDES ZIEL DIESER LISTE ALS NÄCHSTES BRAUCHT — OFFEN IST KEINES MEHR: `pinterest` IST
GEBAUT, `linkedin` UND `google` SIND OHNE CODE ABGESCHLOSSEN:**
**NACHGEZOGEN AM 2026-09-11, ZWEITER NACHZUG DESSELBEN TAGES, ERSETZT UND NICHT GESTEMPELT —
hier stand: "WAS JEDES ZIEL DIESER LISTE ALS NÄCHSTES BRAUCHT — OFFEN IST NUR NOCH EINES,
`google`; `pinterest` IST GEBAUT, `linkedin` IST OHNE CODE ABGESCHLOSSEN:"** Seit dem
2026-09-11 ist auch `google` ohne Code abgeschlossen (Entscheidung (18)). **DER GRUND IST
DERSELBE WIE AM NACHZUG DARUNTER: DIE ÜBERSCHRIFT BINDET EINE HANDLUNG** — wer ihr folgt,
sucht für `google` einen nächsten Schritt, den es nicht mehr gibt.
**VON AUSSEN ZITIERT WIRD SIE NICHT** (GEMESSEN am Repo, CC, 2026-09-11; Achse "OFFEN IST NUR
NOCH EINES", ohne Rücksicht auf Gross- und Kleinschreibung, ganzes Repo ohne `node_modules`,
`.git`, `.next`, `.playwright-mcp`: einziger Treffer die Überschrift selbst; Negativkontrolle
0). "ALS NÄCHSTES BRAUCHT" trifft ausserhalb dieser Datei allein docs/roadmap.md, dessen
Roadmap-Zeile 11.3 eine EIGENE Fassung derselben Liste trägt — ein Namensvetter und kein
Zeiger, wie der Nachzug darunter es schon festhält.
**NACHGEZOGEN AM 2026-09-11, ERSETZT UND NICHT GESTEMPELT — hier stand: "WAS JEDES DER DREI
OFFENEN ZIELE ALS NÄCHSTES BRAUCHT — DREI VERSCHIEDENE SCHRITTE, UND HIER WIRD KEINER DAVON
VOLLZOGEN:"** Die Zahl ist in ZWEI Schritten zu hoch geworden: Seit dem 2026-09-10 ist
`pinterest` gebaut (Commit `9422920`, VERMERK 6), seit dem 2026-09-11 ist `linkedin` ohne
Code abgeschlossen (Entscheidung (17)). Und "HIER WIRD KEINER DAVON VOLLZOGEN" gilt ebenso
nicht mehr — zwei der drei Schritte sind vollzogen, in anderen Abschnitten dieser Datei.
**DER GRUND IST DERSELBE WIE AN DEN PUNKTEN DARUNTER UND AN DER STAND-AUSSAGE: DIE
ÜBERSCHRIFT BINDET EINE HANDLUNG.** Wer ihr folgt, sucht drei offene Ziele, findet zwei
abgeschlossene — oder hält die Liste für unvollständig und sucht ein drittes.
**VON AUSSEN ZITIERT WIRD SIE NICHT** (GEMESSEN am Repo, CC, 2026-09-11; Achse "OFFENEN
ZIELE ALS N" und "DREI OFFENEN", ohne Rücksicht auf Gross- und Kleinschreibung, ganzes Repo
ohne `node_modules`, `.git`, `.next`, `.playwright-mcp`: einziger Treffer die Überschrift
selbst). docs/roadmap.md trägt an der Roadmap-Zeile 11.3 den verwandten Satz "WAS JEDES DER
DREI ALS NÄCHSTES BRAUCHT" — eine EIGENE Fassung derselben Liste, ein Namensvetter und kein
Zeiger. Er stirbt mit dieser Änderung nicht, veraltet aber mit; jene Zeile wird am
Phasenende angefasst.
PROVENIENZ: `pinterest` gebaut GEMESSEN am Repo und live (Commit `9422920`, VERMERK 6);
`linkedin` abgeschlossen durch OWNER-ENTSCHEIDUNG 2026-09-11 (Entscheidung (17)).
- **pinterest — GEBAUT UND LIVE BEWIESEN (Scheibe 11.3e, Commit `9422920`, VERMERK 6);
  OFFEN IST ALLEIN EINE MESSUNG — DIE OPTIMIERUNGS-HÄLFTE DER SANDBOX-ZUSAGE.**
  NACHGEZOGEN AM 2026-09-10; hier
  stand: "EINE MESSUNG. Es ist bekannt, WO der Träger sitzt; unbekannt ist, welcher der
  zwei Namen greift. Ein Lauf gegen die Schnittstelle entscheidet es. Danach ist es
  baubar." **Der Lauf ist am 2026-09-10 gefahren** (GEMESSEN LIVE, Stefan; VERMERK 3):
  `test=true` wirkt.
  **NACHGEZOGEN AM 2026-09-10, ZWEITER NACHTRAG DESSELBEN TAGES — DAS SCHEMA STEHT
  INZWISCHEN AUCH.** Hier stand: "Was pinterest jetzt noch fehlt, ist kein Befund, sondern
  ein Zuschnitt — namentlich der Paar-CHECK, der Code UND Frist verlangt, während
  pinterests Testmodus keinen Code kennt (Vorrat (8)), und die Kollision aus
  deployment-weitem Schalter und projekt-eigener Frist (Vorrat (26))."
  **DER PAAR-CHECK IST ERSETZT** (Migration 0029, Commit `1fb9b90`, VERMERK 4); `pinterest`
  kann eine **Frist ohne Code** tragen, und Vorrat (8) ist mit Beleg gestrichen. **WAS
  PINTEREST JETZT NOCH FEHLT, IST DIE AUFNAHME IN `TARGETS_WITH_TEST_MODE` UND DER
  SCHALTER — Scheibe 11.3e.**
  **NACHGEZOGEN AM 2026-09-10, VIERTER NACHTRAG DESSELBEN TAGES — PINTEREST FEHLT NICHTS
  MEHR.** Der Satz darüber bleibt wörtlich stehen und war bis zum Bau richtig. **BEIDES IST
  GEBAUT UND LIVE BEWIESEN** (Commit `9422920`, gepusht; VERMERK 6): `pinterest` steht in
  `TARGETS_WITH_TEST_MODE`, der Schalter steht an der Karte — **ohne Code-Feld**, mit einem
  Startknopf, der ohne Eingabe klickbar ist —, und der Testmodus ist am Anbieter gemessen
  angekommen.
  **ERSETZT UND NICHT GESTEMPELT, AUS DEMSELBEN GRUND WIE DER ABSATZ DARUNTER: DER SATZ
  BINDET EINE HANDLUNG.** Er sagt, was `pinterest` noch fehlt; wer ihm folgt, baut etwas
  ein zweites Mal, das steht. **WAS FÜR `pinterest` JETZT NOCH OFFEN IST, IST KEINE
  BAUARBEIT, SONDERN EINE MESSUNG:** die OPTIMIERUNGS-Hälfte der Sandbox-Zusage — belegt ist
  die BERICHTERSTATTUNG (VERMERK 6, dritte Grenze).
  **RICHTIGGESTELLT AM 2026-09-10, DRITTER NACHTRAG DESSELBEN TAGES — DIE KOLLISION IST
  ENTFALLEN, NICHT BEANTWORTET.** Hier stand: "Die Kollision aus deployment-weitem
  Schalter und projekt-eigener Frist (Vorrat (26)) steht unverändert offen."
  **MIT DEM WEGFALL DES DEPLOYMENT-WEITEN SCHALTERS GIBT ES NUR NOCH EINE ART VON
  ZUSTAND** — die projekt-eigene Frist —, und eine Kollision zwischen zwei Quellen kann
  nicht entstehen, wo es nur eine gibt. Beleg an der Streichung von Vorrat (26); der
  Wegfall selbst ist Scheibe 11.3d, Commit `3d42501` (VERMERK 5).
  **ERSETZT UND NICHT GESTEMPELT, weil der Satz eine HANDLUNG bindet:** Er sagt, was
  `pinterest` noch fehlt. Wer ihm folgt, sucht eine Entscheidung, die keinen Gegenstand
  mehr hat.
  **DIE GRENZE MUSS MIT, sonst wird aus einer Streichung eine zu weite Entwarnung:** Für
  `meta` und `tiktok` besteht die Vorrang-Frage **FORT** (Vorrat (10)) — `META_TEST_EVENT_CODE`
  und `TIKTOK_TEST_EVENT_CODE` bestehen, und welcher Wert in die Nutzlast wandert, wenn
  Umgebungsvariable und Projektzeile VERSCHIEDENE tragen, ist unverändert ungemessen.
  **Wer die Streichung als Erledigung der ganzen Achse liest, hält eine Frage über drei
  Ziele für beantwortet, die nur für eines entfallen ist.**
  **NACHGEZOGEN AM 2026-09-10 (zweite Teilung desselben Tages):** Hier stand "Scheibe
  11.3d". Die Pinterest-Runde ist an diesem Tag in **11.3d** (Auflösungs-Pfad) und
  **11.3e** (Oberfläche) geteilt worden; **Zielmenge und Schalter sind 11.3e.** Der Zeiger
  ist nachgezogen, **weil er eine Handlung bindet** — wer ihm folgt, sucht die Oberfläche
  in einem Abschnitt, der sie ausschliesst.
  **NACHGEZOGEN AM 2026-09-11, ERSETZT UND NICHT GESTEMPELT — DER KOPF DIESES PUNKTS; hier
  stand: "pinterest — DIE MESSUNG IST GEFAHREN, ES IST BAUBAR."** "Baubar" behauptete eine
  ausstehende Bauhandlung, und die ist seit Commit `9422920` vollzogen (Scheibe 11.3e,
  VERMERK 6). **DERSELBE GRUND WIE AN DER ÜBERSCHRIFT ÜBER DIESER LISTE UND AM
  `linkedin`-PUNKT: DER KOPF BINDET EINE HANDLUNG** — wer ihm folgt, sucht eine Bauarbeit,
  die es nicht mehr gibt.
  **DIE NACHTRÄGE DARÜBER BLEIBEN WÖRTLICH STEHEN**, auch der vierte ("PINTEREST FEHLT
  NICHTS MEHR"): Er ist der datierte Beleg, auf den der neue Kopf sich stützt.
  **VON AUSSEN ZITIERT WIRD DER KOPF NICHT** (GEMESSEN am Repo, CC, 2026-09-11; Achsen
  `baubar`, "MESSUNG IST GEFAHREN" und "pinterest — DIE MESSUNG", ohne Rücksicht auf Gross-
  und Kleinschreibung, ganzes Repo ohne `node_modules`, `.git`, `.next`, `.playwright-mcp`;
  Negativkontrolle 0). Ausserhalb dieser Datei trägt allein docs/roadmap.md an der
  Roadmap-Zeile 11.3 den Satz "es ist damit baubar" — eine EIGENE Fassung derselben Liste,
  ein Namensvetter und kein Zeiger; jene Zeile wird am Phasenende angefasst.
  PROVENIENZ: der Bau GEMESSEN am Repo und live (Commit `9422920`, VERMERK 6); dass allein
  die Optimierungs-Hälfte offen ist, steht im vierten Nachtrag dieses Punkts und in
  VERMERK 6, dritte Grenze.
- **google — OHNE CODE ABGESCHLOSSEN (2026-09-11). DIE LESUNG IST GEFAHREN, IHR ERGEBNIS IST
  NEGATIV, UND DIESEM ZIEL FEHLT NICHTS MEHR.** Die Dokumentation zur gewählten Gestalt ist am
  2026-09-11 abschnittsweise gelesen worden. Im gelesenen Umfang gibt es keinen Träger, der ein
  Ereignis beim Anbieter sichtbar ankommen lässt, ohne dessen Zahlen zu berühren; der einzige
  Mechanismus, der eine Achse ausdrücklich entlastet — die sekundäre Conversion-Aktion —, und
  die vierzehntägige Probezeit sind verworfen. Befund und Reichweite: docs/ziel-befunde.md,
  Abschnitt "Google (Google Ads Conversions · GA4)", Teile (ch) bis (cr) und der Block "Der
  gelesene Umfang (2026-09-11) — Google". Die bindende Entscheidung steht als (18). **Dieses
  Fünftel der Phase endet damit wie das von `linkedin` mit einer festgehaltenen Feststellung
  und nicht mit Code.**
  **NACHGEZOGEN AM 2026-09-11, ERSETZT UND NICHT GESTEMPELT; hier stand:** "google — EIN
  ANDERER WEG. Hier fehlt keine Messung, sondern ein Träger, der die Beobachtung nicht
  abschneidet. Ob es ihn gibt, ist offen; solange nicht, kann diese Phase für google nichts
  liefern, was ihr eigenes Versprechen einlöst."
  **DER GRUND, DERSELBE WIE AN DEN NACHBARPUNKTEN UND AN DER ÜBERSCHRIFT: DER SATZ BINDET EINE
  HANDLUNG.** Er führt die Frage nach dem Träger als offen — wer ihm folgt, sucht ihn ein
  zweites Mal.
  **WAS DIE LESUNG NICHT IST:** ein Beweis der Abwesenheit. Sie bleibt ein NICHT-TREFFER, jetzt
  mit benannter Reichweite; die Grenze steht an Entscheidung (18). **IM SELBEN ZUG
  NACHGEZOGEN** sind die Stand-Aussage am Kopf dieses Abschnitts, die Überschrift dieser Liste
  und der Halbsatz unter "WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST".
  **VON AUSSEN ZITIERT WIRD DER PUNKT NICHT** (GEMESSEN am Repo, CC, 2026-09-11; Achsen "EIN
  ANDERER WEG", "Träger, der die" und "Beobachtung nicht abschneidet", ohne Rücksicht auf Gross-
  und Kleinschreibung, ganzes Repo ohne `node_modules`, `.git`, `.next`, `.playwright-mcp`;
  Negativkontrolle 0). Die Treffer ausserhalb dieser Datei sind keine Zeiger: "ein anderer Weg
  zum selben Wert" in docs/claude-history/phase-9-ab-testing.md und in
  `src/app/projects/variant-counts.test.ts` hat einen anderen Gegenstand, und docs/roadmap.md
  trägt an der Roadmap-Zeile 11.3 den Satz "Google fehlt keine Messung, sondern ein Träger, der
  die Beobachtung nicht abschneidet" — eine EIGENE Fassung derselben Liste, ein Namensvetter;
  jene Zeile wird am Phasenende angefasst.
  PROVENIENZ: die Lesung GELESEN 2026-09-11 (CC); der Abschluss ohne Code ist
  OWNER-ENTSCHEIDUNG 2026-09-11.
- **linkedin — OHNE CODE ABGESCHLOSSEN (2026-09-11). DIE LESUNG IST GEFAHREN, IHR ERGEBNIS
  IST NEGATIV, UND DIESEM ZIEL FEHLT NICHTS MEHR.** Die Conversions-API-Dokumentation ist am
  2026-09-11 abschnittsweise gelesen worden. Im gelesenen Umfang gibt es keinen Weg, ein
  Ereignis beim Anbieter sichtbar ankommen zu lassen, ohne seine Zahlen zu berühren; die zwei
  Konfigurations-Kandidaten sind verworfen. Befund und Reichweite: docs/ziel-befunde.md,
  Abschnitt "LinkedIn (Conversions API)", Teile (aa) bis (al) und der Block "Der gelesene
  Umfang (2026-09-11) — LinkedIn". Die bindende Entscheidung steht als (17). **Dieses
  Fünftel der Phase endet damit, wie vorgesehen, mit einer festgehaltenen Feststellung und
  nicht mit Code.**
  **NACHGEZOGEN AM 2026-09-11, ERSETZT UND NICHT GESTEMPELT; hier stand:** "linkedin — EINE
  LESUNG, UND MÖGLICHERWEISE EIN BEGRÜNDETES NEIN. Der Stand ist ein NICHT-TREFFER, kein
  Beweis der Abwesenheit. Hat der Anbieter keinen Testmodus, endet dieses Fünftel der Phase
  nicht mit Code, sondern mit einer festgehaltenen Feststellung — und das ist ein gültiger
  Abschluss, kein Ausfall."
  **DER GRUND, DERSELBE WIE AN DEN NACHBARPUNKTEN: DER SATZ BINDET EINE HANDLUNG.** Er sagt,
  was `linkedin` als nächstes braucht — wer ihm folgt, fährt die Lesung ein zweites Mal.
  **WAS DIE LESUNG NICHT IST:** ein Beweis der Abwesenheit. Sie bleibt ein NICHT-TREFFER,
  jetzt mit benannter Reichweite; die Grenze steht an Entscheidung (17). **IM SELBEN ZUG
  NACHGEZOGEN** ist die Stand-Aussage am Kopf dieses Abschnitts.
  PROVENIENZ: die Lesung GELESEN 2026-09-11 (CC, Browser-Werkzeug); der Abschluss ohne Code
  ist OWNER-ENTSCHEIDUNG 2026-09-11.

**WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST:** die Reihenfolge der drei, ihr Zuschnitt in
Scheiben, und ob linkedin am Ende gebaut oder abgeschlossen wird. **Der Zustand je
(Projekt, Ziel) aus 11.3a hat für alle drei bereits die Form**; was ihnen fehlt, steht oben
je Ziel.
**NACHGEZOGEN AM 2026-09-11 — DER LETZTE HALBSATZ IST ENTSCHIEDEN:** `linkedin` wird ohne
Code abgeschlossen (Entscheidung (17)). Der Satz bleibt als Aussage über den 2026-09-09
stehen; von ihm ist heute nichts mehr offen — auch `google` ist ohne Code abgeschlossen
(Entscheidung (18)).
**NACHGEZOGEN AM 2026-09-11, ZWEITER NACHZUG DESSELBEN TAGES, ERSETZT UND NICHT GESTEMPELT —
hier stand am Ende: "offen ist von ihm heute allein noch `google`."** Derselbe Grund wie an der
Stand-Aussage: Der Halbsatz führte ein Ziel als offen, und wer ihm folgt, sucht dafür einen
Zuschnitt. Er ist die VIERTE Stelle dieses Abschnitts, die den Stand der Ziele behauptet, und
wird im selben Zug nachgezogen wie die drei anderen.

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
nichts zu tun** — er ist der Grund, warum Testdateien die Konstante in einer je Datei
duplizierten `vi.mock`-Factory für das Modul `@/lib/capi/config` auf leer setzen. **DREI
ZAHLEN, JE NACH LESART** (GEMESSEN am Repo, CC, 2026-09-11, Achse: der wörtliche Eintrag
bzw. der Modul-Mock über `src/`, Testdateien eingeschlossen, Negativkontrolle 0):
- **NEUN** Handler-Testdateien setzen sie wörtlich auf `""`: `fan-out.test.ts` und die
  acht `ingest.confirm`, `ingest.consent`, `ingest.consent-targets`, `ingest.forwardable`,
  `ingest.persist`, `ingest.refresh`, `ingest.timeout`, `ingest.variant` (je `.test.ts`).
- **ZEHN** Testdateien tragen wörtlich `META_TEST_EVENT_CODE: ""` — die neun plus
  `meta-forward.test.ts`.
- **ZWÖLF** mocken das Modul überhaupt — die zehn plus `src/app/api/capi/route.test.ts` und
  `src/lib/capi/ingest.test-mode.test.ts`; beide über einen veränderlichen Zugriff mit dem
  Startwert `""`, weil sie die Konstante je Lauf umschalten.

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

- **ZWEI DER DREI VARIABLEN LIEST DER CODE WEITERHIN, DIE DRITTE NICHT MEHR.**
  `META_TEST_EVENT_CODE` liest `src/lib/capi/config.ts` (Konstante gleichen Namens, beim
  Laden des Moduls; Konsumenten `forwardToMeta` und `resolveClientIp`),
  `TIKTOK_TEST_EVENT_CODE` liest `testEventCode` in `src/lib/capi/tiktok-forward.ts` (bei
  jedem Aufruf). Ist eine gesetzt, hängt ihr Adapter den Wert als `test_event_code` an
  jede Nutzlast ohne Projekt-Code — deployment-weit; unbesetzt geht kein Feld hinaus.
  `PINTEREST_TEST_MODE` liest der Code seit Commit `3d42501` nicht mehr. GEMESSEN am Repo
  (CC, 2026-09-11).
- **IN VERCEL IST KEINE DER DREI GESETZT:** `PINTEREST_TEST_MODE` GEMESSEN LIVE (Stefan,
  2026-09-10, alle drei Umgebungen); `META_TEST_EVENT_CODE` und `TIKTOK_TEST_EVENT_CODE`
  am 2026-09-11 gelöscht (OWNER-ANGABE, keine Messung). Die lokale `.env.local` setzt
  `META_TEST_EVENT_CODE` (GEMESSEN am Repo, CC, 2026-09-11). Der Hebel, den der Code
  damit weiter trägt, steht als offener Punkt in docs/offene-punkte.md.
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
`project_secrets.test_mode_expires_at` (timestamptz), beide nullbar, zusammengehalten von
einem CHECK. Die Spalten stammen aus Migration 0028; der CHECK heisst seit dem 2026-09-10
`project_secrets_test_mode_je_ziel` (Migration 0029) und urteilt JE ZIEL verschieden.

**RICHTIGGESTELLT AM 2026-09-10, NICHT GESTEMPELT — DIE ENTSCHEIDUNG SELBST IST UNBERÜHRT
UND GILT IM WORTLAUT WEITER.** Zwei additive Spalten auf `project_secrets` bleiben die
Ablage; geändert hat sich ausschliesslich der NAME und die FORM der Bedingung, die sie
zusammenhält. **HIER STAND:** "zusammengehalten vom CHECK `project_secrets_test_mode_paar`
(beide gesetzt oder beide leer). Migration 0028." **Jener Constraint existiert nicht mehr**
— er ist von 0029 gedroppt und ersetzt worden (GEMESSEN LIVE, 2026-09-10, Stefan: NULL
Zeilen unter dem alten Namen; VERMERK 4). **ERSETZT UND NICHT GESTEMPELT, weil diese
Entscheidung ein MASSSTAB ist:** Wer ihr folgt und den genannten Namen nachschlägt, findet
nichts und hält die Ablage für falsch beschrieben. Die Ziel-Abhängigkeit selbst steht als
Entscheidung (12) und wird hier NICHT verdoppelt.

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

**DIE ENTSCHEIDUNG:** `listTestModeStates` liest `test_event_code` — und gibt ihn NICHT
heraus. Über die Client-Grenze geht ausschliesslich das Urteil ("aus" / "läuft bis" /
"abgelaufen am") samt einem Zeitpunkt in Epochensekunden. Der Rückgabetyp trägt
**strukturell keinen freien String**.

**RICHTIGGESTELLT AM 2026-09-10, NICHT GESTEMPELT — DIE ENTSCHEIDUNG SELBST IST UNBERÜHRT
UND WIRD WICHTIGER, NICHT SCHWÄCHER.** Geändert ist ein BEGRÜNDUNGSHALBSATZ, nicht die
Zusage. **HIER STAND:** "`listTestModeStates` liest `test_event_code`, **WEIL das Prädikat
ihn braucht**".
**WAS DARAN NICHT MEHR TRÄGT:** Unter Entscheidung (14) urteilt das Prädikat über die
FRIST; der Code ist BEIGABE. Er ist damit nicht mehr der TRÄGER des Urteils, und für ein
Ziel OHNE Code-Pflicht (`pinterest`) braucht das Prädikat ihn überhaupt nicht.
**WAS UNVERÄNDERT ZUTRIFFT, und deshalb ist der Satz richtigzustellen und nicht zu
streichen:** Die Spalte wird weiterhin GELESEN und wird weiterhin GEBRAUCHT — bei `meta`
und `tiktok` entscheidet ihre Anwesenheit mit, ob der Testmodus aktiv ist (fail-closed bei
fehlendem Code). Der Leser liest also nicht auf Vorrat.
**WARUM ERSETZT UND NICHT GESTEMPELT:** Diese Entscheidung ist ein MASSSTAB. Wer dem alten
Halbsatz folgt und daraus schliesst, das Prädikat hänge am Code, baut die Fassung, gegen
die (14) geschrieben ist.
**DIE ZUSAGE WIEGT SEIT (14) SCHWERER:** Der Code ist jetzt eine Angabe, die für das
Urteil ENTBEHRLICH sein kann — und genau deshalb wäre es umso billiger, ihn beiläufig
mitzugeben. Er geht trotzdem nicht über die Client-Grenze.
PROVENIENZ: der Rumpf des Prädikats und der `select` von `listTestModeStates` sind
GEMESSEN am Repo (CC, 2026-09-10) nach Commit `3d42501`; die Einordnung als
Begründungs-Richtigstellung ist OWNER-ENTSCHEIDUNG 2026-09-10.

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

### (12) DER TESTZUSTAND WIRD ZIEL-ABHÄNGIG GEPRÜFT, NICHT GENERISCH

**DIE ENTSCHEIDUNG:** Die Datenbank-Bedingung über `test_event_code` und
`test_mode_expires_at` zählt die Ziele AUF und urteilt je Ziel verschieden. Sie formuliert
KEINE ziel-blinde Regel, die für alle gleich gilt.

**DER GRUND, IN EINEM SATZ: DIESELBE SPALTENKOMBINATION IST BEI MANCHEN ZIELEN EIN SCHADEN
UND BEI ANDEREN DER NORMALFALL.** "Frist gesetzt, Code leer" ist bei `meta` und `tiktok`
reiner Datenverlust — der Riegel feuerte, das Ereignis verschwände aus `events`, und der
Anbieter bekäme keine Test-Markierung. Bei `pinterest` ist genau dieser Zustand der
einzige, den sein Testmodus überhaupt annehmen kann: er ist ein QUERY-PARAMETER ohne Code.
**Eine Bedingung, die beides gleich behandelt, muss eines von beidem falsch entscheiden.**

**WEN SIE BINDET:** jede spätere Scheibe dieser Phase, die ein weiteres Ziel in den
Testmodus aufnimmt — sie fügt der Aufzählung eine Klausel hinzu und erbt keine generische
Regel, die für ihr Ziel nie geprüft wurde. Und jede Runde, die den CHECK erneut anfasst.

**IHRE GRENZE, UND SIE GEHÖRT HIN, WEIL SIE SICH UMDREHEN KANN:** Bleiben `meta` und
`tiktok` die einzigen Ziele MIT Code und werden alle künftigen wie `pinterest` gebaut —
Testmodus ohne Code —, dann wird die Aufzählung zur Liste von AUSNAHMEN und die generische
Bauform zur Regel. **Heute ist das nicht absehbar:** `linkedin` und `google` haben nach dem
Kenntnisstand dieser Phase gar keinen brauchbaren Testmodus, tragen also weder Code noch
Frist. **WER DAS UMDREHT, ENTSCHEIDET NEU UND LIEST DIESEN ABSATZ ZUERST** — er beginnt
nicht bei null, und die verworfene Bauform steht mit ihrem Ausscheidungsgrund im Abschnitt
"Scheibe 11.3c — Der Paar-CHECK wird ersetzt".

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-10, auf der Grundlage der Messung vom selben Tag
(VERMERK 3). Die Form des CHECK `project_secrets_test_mode_paar` und die Bauform seines
Katalog-Guards sind am 2026-09-10 GEMESSEN am Migrationstext 0028 (CC) — **0028 war zu
diesem Zeitpunkt der geltende Stand**, und die Angabe datiert sich damit selbst. Dass
`testModeQuery` (`src/lib/capi/pinterest-forward.ts`) ohne jeden Code auskommt, ist
GEMESSEN am Repo (CC, 2026-09-10).
**NACHGEZOGEN AM 2026-09-10:** Hier stand "die Form des **heutigen** CHECK". Jener CHECK
ist am selben Tag von Migration 0029 ersetzt worden; das Wort "heutigen" war ab da falsch,
**die Provenienz-Aussage selbst ist es nie gewesen** — gemessen wurde, was an jenem
Zeitpunkt galt. Geändert ist die Zeitform, nicht die Herkunft. **Die Entscheidung (12)
oben ist unangetastet.**

### (13) `PINTEREST_TEST_MODE` ENTFÄLLT — DIE FRIST STEUERT ALLEIN

**DIE ENTSCHEIDUNG:** Die Umgebungsvariable `PINTEREST_TEST_MODE` entfällt VOLLSTÄNDIG.
Der Testmodus für `pinterest` hängt danach allein an der projekt-eigenen Frist
`test_mode_expires_at`. **Es gibt dann genau EINE Quelle für "ist dieses Ziel dieses
Projekts im Testmodus".**

**DER TRAGENDE GRUND, UND ER IST NICHT AUFRÄUMEN:** Nach der Aufnahme von `pinterest` in
`TARGETS_WITH_TEST_MODE` entstünde sonst genau der Zustand, den 0028 als **"reiner
Datenverlust ohne Gegenwert"** benennt — die Frist ist gesetzt, der Riegel feuert, das
Ereignis verschwindet aus `events`, **UND der Anbieter bekommt keine Test-Markierung, weil
die Variable nicht gesetzt ist. Er verbucht eine ECHTE Conversion.**

**DAS IST DER NORMALFALL, NICHT DER SONDERFALL:** Die Variable ist heute nirgends gesetzt.
Genau diesen Zustand hat der Paar-CHECK für `meta` und `tiktok` verboten; für `pinterest`
ist er in 11.3c aufgehoben worden, **weil er dort den falschen Fall traf**. Wer die
Variable stehen lässt, **baut den Schaden ein, den 11.3c freigeräumt hat.**

**DIE ZWEI WEITEREN GRÜNDE, kürzer, aber sie gehören dazu:**
- **STILLE MANDANTEN-KOPPLUNG.** Ein Wert in Vercel markiert die Pinterest-Ereignisse
  ALLER Kunden als Test. Dieselbe Klasse wie ein Cookie mit Domain-Attribut auf einer
  Wildcard.
- **VORRAT (25).** Jeder nicht-leere Wert schaltet ein, `"false"` und `"0"` eingeschlossen;
  ausgeschaltet wird nur durch Entfernen. **Diese Falle besteht nur, solange die Variable
  besteht.**

**DIE AUFLAGE AN DIE REIHENFOLGE — SIE IST TEIL DER ENTSCHEIDUNG UND KEINE ANMERKUNG:** Das
Entfernen ist eine **VERHALTENSÄNDERUNG AUF DEM SERVE-PFAD** (`testModeQuery` wird bei
JEDEM Pinterest-Forward gelesen, GEMESSEN am Repo, CC, 2026-09-10). Es geschieht im SELBEN
Zug wie das, was es ersetzt: **erst treibt die Frist den Parameter, dann fällt die
Variable.** Umgekehrt entstünde ein Fenster, in dem `pinterest` gar keinen Testmodus hat.

**DIE ZWEITE AUFLAGE, ebenfalls bindend: RIEGEL UND PARAMETER LESEN DIESELBE FUNKTION.**
Der Riegel nimmt das Ereignis aus `events` (Entscheidung (3)), der Parameter markiert es
beim Anbieter — **beide beantworten dieselbe Frage.** Zwei Instanzen, die dasselbe
beurteilen, laufen auseinander; **kein drittes Urteil.**
**OB ES FÜR `meta` UND `tiktok` BEREITS EIN SOLCHES GETEILTES PRÄDIKAT GIBT, IST
UNGEMESSEN** und ausdrücklich NICHT hier entschieden — das ist die erste Frage der
Aufklärung zu 11.3d.

**IHRE GRENZE:** Die Entscheidung nimmt **den einzigen Hebel, der heute unabhängig von der
Oberfläche wirkt**. Nach 11.3e ist die Oberfläche dieser Hebel — vorher nicht. **Wer die
Reihenfolge dreht, steht ohne beides da.**
**NACHGEZOGEN AM 2026-09-10:** Hier stand "Nach 11.3d". Die Pinterest-Runde ist an diesem
Tag geteilt worden, **die Oberfläche ist 11.3e**. Der Zeiger ist nachgezogen, **weil er
eine BEDINGUNG nennt** — er sagt, ab wann ein Hebel wieder da ist, und das ist eine
Aussage, nach der gebaut wird. **Der Satz selbst ist unverändert**, geändert ist die
Scheibennummer.

**WAS SIE NICHT ENTSCHEIDET:** wie die Frist den Parameter erreicht — ob der Adapter den
Testzustand aus der Konfiguration liest, in welcher Gestalt, und ob der Resolver ihn heute
überhaupt bis dorthin durchreicht. **Das ist Bausache und ungemessen.**

**DER LESESTAND DER DREI VARIABLEN** steht im Abschnitt "Die Env-Variablen bleiben — und der
Riegel hängt NICHT an ihnen" (unter "Scheibe 11.3a"): `META_TEST_EVENT_CODE` und
`TIKTOK_TEST_EVENT_CODE` liest der Code weiterhin, `PINTEREST_TEST_MODE` nicht mehr. Der
Riegel hängt unverändert allein am Projekt-Zustand.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-10. Dass `testModeQuery`
(`src/lib/capi/pinterest-forward.ts`) bei jedem Aufruf gelesen wird, dass sie die
**EINZIGE** Lesestelle im Produktivcode ist und dass jeder nicht-leere Wert einschaltet,
ist GEMESSEN am Repo (CC, 2026-09-10) — Achse: der Variablenname, case-insensitiv, ganzes
Repo ohne `node_modules`, `.git`, `.next`; SIEBEN Vorkommen, davon EINE Lesestelle
(`process.env`), eine Stub-Stelle in `pinterest-forward.test.ts`, vier in dieser Datei und
eine in einer archivierten Rohfassung. Negativkontrolle 0.
**DASS DIE VARIABLE NIRGENDS GESETZT IST, IST ZWEIGETEILT UND WIRD NICHT ZUSAMMENGEZOGEN:**
Für **Vercel** ist es **OWNER-ANGABE (2026-09-10), KEINE Messung** — die Vercel-Umgebung
liegt nicht im Repo und ist von hier aus nicht messbar. Für **`.env.local`** ist es
**GEMESSEN am Repo (CC, 2026-09-10)**: die Datei existiert, ist von derselben Suche erfasst
und trägt den Namen NICHT.

**ZUSATZ 2026-09-10 — EINE LÜCKE DIESER ENTSCHEIDUNG IST GESCHLOSSEN, DER TEXT DARÜBER
BLEIBT WÖRTLICH STEHEN.** Die zweite Auflage verlangt, dass Riegel und Markierung
DIESELBE Funktion lesen. **Sie sagt nicht, WAS diese Funktion für ein Ziel OHNE Code
liefern soll** — und genau das ist bei `pinterest` seit 0029 der Regelfall. Die Lücke ist
in der Aufklärungsrunde desselben Tages gemeldet und mit **Entscheidung (14)** geschlossen
worden: Das Prädikat urteilt über die FRIST, der Code wird zur Beigabe.
**AN (13) ÄNDERT DAS NICHTS** — die Auflage "kein drittes Urteil" gilt unverändert und
wird von (14) ausdrücklich eingehalten. Ergänzt ist, was sie offenliess.

### (14) DAS PRÄDIKAT URTEILT ÜBER DIE FRIST, NICHT ÜBER DEN CODE

**DIE ENTSCHEIDUNG:** Das Prädikat urteilt künftig über die **FRIST**; der Code wird zur
**BEIGABE**. Zusätzlich weiss der TypeScript-Code **ZIEL-ABHÄNGIG**, welche Ziele einen
Code VERLANGEN — für ein Ziel mit Code-Pflicht bleibt "Frist ohne Code" **fail-closed**,
für `pinterest` ist es der **Normalfall**.
**ES BLEIBT BEI EINEM URTEIL.** Kein zweites Prädikat, kein Boolean daneben.

**DER BEFUND, DER SIE AUSLÖST — GEMESSEN am Repo (CC, 2026-09-10, Aufklärungsrunde 2):**
`activeTestCodeFromRow` (`src/lib/tracking/credential-state.ts`) hat den Rückgabetyp
`string | null` und verwirft in ihrer ERSTEN Prüfung jede Zeile ohne Code. Für ein Ziel,
das seit 0029 per CHECK NIE einen Code trägt, ist sie damit **konstant `null`**: kein
Eintrag in `resolution.testMode` (`getCapiConfigByTrackingKey`, `src/lib/capi/token.ts`),
`testModusAktiv` bleibt falsch (`handleIngest`, `src/lib/capi/ingest.ts`), der Nachschlag
an der Fan-Out-Stelle findet nichts, und die Ziel-Karte zeigt **"aus"**, obwohl eine Frist
in der Zukunft steht (`testModeStateFrom`, dieselbe Datei).

**IN EINEM SATZ, UND ER IST DER KERN: DAS SCHEMA KANN SEIT 0029 EINEN ZUSTAND ABLEGEN, DEN
DER AUFLÖSUNGS-PFAD NICHT ALS TESTMODUS ERKENNT.** Beide Schichten sehen für sich richtig
aus, und **nichts wird davon rot**.

**WAS AM HEUTIGEN KOMMENTARKOPF RICHTIG BLEIBT UND WAS NICHT** — die Unterscheidung gehört
hinein, sonst liest die nächste Runde die Entscheidung als Widerruf: Das **ZIEL** jener
Bauform ist unverändert richtig — wörtlich dort: "ein Boolean daneben waere ein zweites
Urteil ueber denselben Zustand, und die beiden koennten auseinanderlaufen". Was **nicht
trägt, ist die FORM** — dass der CODE der Träger des Urteils ist. Die Begründung war aus
ZWEI Zielen gebildet, die beide einen Code haben, und auf alle künftigen ausgedehnt.
**Das ist die Figur aus docs/immer-beachten.md, "EINE REGEL KANN RICHTIG SEIN UND NICHT
SKALIEREN — DER BRUCH ZEIGT SICH AN IHRER BEGRÜNDUNG, NICHT AN IHREM WORTLAUT".**

**DIE KONKRETE ZUSAGE, DIE DABEI ZU FASSEN IST, im Wortlaut** (GEMESSEN am Kommentarkopf,
CC, 2026-09-10): "FAIL-CLOSED IN JEDEM ZWEIFELSFALL … Ein fehlender Code, ein Code aus
reinem Leerraum, ein fehlender oder unlesbarer Zeitstempel — alles ergibt null."
**IHR ERSTES GLIED IST ES, DAS SICH ÄNDERT, UND NUR FÜR ZIELE OHNE CODE-PFLICHT.** Der
zweite Halbsatz derselben Zusage bleibt wahr, und zwar unverändert wörtlich: "die
Abwesenheit einer Angabe schaltet ihn nie ein" — eingeschaltet wird der Testmodus weiterhin
durch die ANWESENHEIT der Frist, nie durch eine Abwesenheit.

**DIE VERWORFENEN KANDIDATEN, je mit Ausscheidungsgrund** — sie stehen hier, damit keiner
als Einfall wiederkommt:
- **PLATZHALTER-CODE FÜR PINTEREST.** Scheitert am CHECK aus 0029, der `test_event_code`
  bei `pinterest` verbietet. Wäre ausserdem **tote Daten**: ein Wert, den der Adapter nie
  sendet und eine Oberfläche anzeigen könnte.
- **EIN ZWEITES, ZIEL-ABHÄNGIGES PRÄDIKAT DANEBEN.** Bricht die zweite Auflage von (13)
  und die Begründung des heutigen Kommentarkopfs. Zwei Urteile über denselben Zustand
  laufen auseinander.
- **NUR DER CHECK WEISS ES** — das Prädikat urteilt allein über die Frist, ohne
  Ziel-Wissen. **DAS IST DIE ERNSTHAFTE ALTERNATIVE, und der Grund für ihr Ausscheiden ist
  der eigentliche Inhalt dieser Entscheidung: DER CODE KANN NICHT WISSEN, OB DER CHECK IN
  DER LAUFENDEN DATENBANK STEHT** (docs/immer-beachten.md, "OB EINE MIGRATION IN DER
  LAUFENDEN DB ANGEWANDT IST, IST AM REPO NICHT ENTSCHEIDBAR"). **Der Fehlerfall wäre
  STILL:** Eine `meta`-Zeile mit Frist ohne Code gälte als aktiv, der Riegel nähme das
  Ereignis aus `events`, und der Anbieter bekäme keine Markierung — **er verbuchte eine
  ECHTE Conversion.** Genau der Zustand, den 0028 "reiner Datenverlust ohne Gegenwert"
  nennt. Unter dieser Entscheidung wäre dieselbe Zeile schlicht **nicht aktiv**, und das
  Ereignis bliebe erhalten.
  **IHR VORTEIL WIRD MITGENANNT:** die Ziel-Aufzählung stünde genau einmal im System, im
  CHECK. **Er wiegt den stillen Fehlerfall nicht auf.**

**DIE GRENZE DES EINWANDS GEGEN DIESE ENTSCHEIDUNG, ehrlich benannt:** Sie führt eine
Ziel-Auskunft in den TypeScript-Code ein, die es dort so noch nicht gibt. Sie ist aber
**KEIN dritter Ort** — `TARGETS_WITH_TEST_MODE` zählt bereits Ziele auf, wächst mit 11.3e
ohnehin um `pinterest`, und ein Wächter macht jede Erweiterung rot.
**NACHGEZOGEN AM 2026-09-10:** Hier stand "wächst mit 11.3d". Die Zielmenge wächst seit
der Teilung desselben Tages in **11.3e**; **11.3d rührt sie ausdrücklich NICHT an.** Der
Zeiger ist nachgezogen, **weil er eine Handlung bindet** — wer 11.3d baut und diesem Satz
folgt, nimmt `pinterest` in die Menge auf und macht die Scheibe scharf, die im Betrieb
wirkungslos bleiben soll.
**DER WÄCHTER IST NACHGEMESSEN UND NICHT ÜBERNOMMEN (GEMESSEN am Repo, CC, 2026-09-10):**
`describe("TM13 — die Menge der Ziele mit Testmodus")` mit `it("GENAU meta und tiktok")` in
`src/lib/tracking/credential-state.test.ts`, Zusicherung
`expect([...TARGETS_WITH_TEST_MODE]).toEqual(["meta", "tiktok"])`. **Es gibt einen ZWEITEN
Konsumenten der Menge im Testbestand**, der in der Vorgabe nicht genannt war: eine
Schleife über `TARGETS_WITH_TEST_MODE` in `src/app/projects/actions.testmode.test.ts` —
sie deckt mit `pinterest` automatisch ein Ziel mehr ab, und das ist beim Zuschnitt zu
prüfen, nicht zu unterstellen.
**WELCHE GESTALT die Auskunft bekommt, ist hier AUSDRÜCKLICH NICHT entschieden** — zweites
Feld, eigene Konstante oder Funktion ist Bausache und gehört in den Stufe-1-Plan.

**WAS UNBERÜHRT BLEIBT UND IM ZUSCHNITT ZU HALTEN IST:**
- **Entscheidung (4)** — `expires === now` gilt als abgelaufen; ein Urteil, zwei Lesungen.
- **Entscheidung (3)** — der Riegel hängt an mindestens einem Ziel.
- **Die Fail-closed-Haltung des Prädikats:** ein unlesbarer oder fehlender Zeitstempel
  ergibt weiterhin "nicht aktiv". Geändert wird, was ein fehlender CODE bedeutet — und
  zwar NUR für Ziele ohne Code-Pflicht.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-10. Der Rumpf des Prädikats, die drei
Folgestellen und der Typ `TestModeTarget` sind GEMESSEN am Repo (CC, 2026-09-10,
Aufklärungsrunde 2). Dass der Fehlerfall der verworfenen Alternative still wäre, ist eine
ABLEITUNG aus 0028 und dem gemessenen Ingest-Pfad, **keine Messung**.

### (15) DAS TESTMODUS-SIGNAL ERREICHT DIE ADAPTER ÜBER DIE LAMBDAS, NICHT ÜBER GEÄNDERTE ADAPTER-SIGNATUREN

**DIE ENTSCHEIDUNG:** Der siebte Wert des Typs `Forwarder` (`src/lib/capi/ingest.ts`) wird
**`TestModeTarget | undefined`**. Die Dispatch-Stelle übergibt den **EINTRAG** statt seines
Codes (das `?.code` fällt weg); die Lambdas in `FORWARDER_BY_TARGET` entnehmen ihm, was
ihr Adapter braucht — `meta` und `tiktok` geben `testMode?.code` weiter, `pinterest` gibt
`testMode !== undefined` weiter. **Alle drei Adapter bleiben byte-gleich.**

**DER GRUND:** Was fehlt, ist die **ANWESENHEIT** des Eintrags, nicht sein Wert — und die
steht seit 11.3d in `resolution.testMode` bereits da. **Sie wurde an der Dispatch-Stelle
weggeworfen** (`?.code`). Ein `pinterest`-Eintrag trägt nie einen Code; der siebte Wert war
für dieses Ziel konstant `undefined`.

**WARUM DAS KEIN ZWEITES URTEIL IST** (Entscheidung (13), zweite Auflage): Das Urteil fällt
**EINMAL**, in `resolution.testMode`. **Die Lambdas urteilen nicht, sie LESEN** — `?.code`
liest den Wert, `!== undefined` die Anwesenheit. **Ein Urteil, zwei Lesungen**, dieselbe
Bauform wie Entscheidung (4).

**WARUM ES KEIN VERZWEIGEN NACH ZIELNAME IST:** `FORWARDER_BY_TARGET` **ist** die
Ziel-Zuordnung und eine Compiler-Bindung über `Record<TargetWithAdapter, Forwarder>`.
Innerhalb eines Lambdas steht **kein `if` auf den Zielnamen**; dort steht, was jener
Adapter braucht — wie heute schon, wo das `pinterest`-Lambda `{ adAccountId, token }`
bildet. **DIE ASYMMETRIE WOHNT IN DEN DATEN, NICHT IM KONTROLLFLUSS**; der Kommentarkopf
jener Zuordnung sagt das seit Scheibe C2 wörtlich.

**DER VERWORFENE KANDIDAT — er stand kurz vor der Freigabe und käme sonst wieder:** Der
siebte Parameter der **ADAPTER** trägt den ganzen Eintrag, jeder Adapter liest daraus.
**SEIN AUSSCHEIDUNGSGRUND, in drei Punkten:**
- **DREI ADAPTER-SIGNATUREN** ändern sich statt einer Typzeile.
- **DER ERST IN 11.3d GEBAUTE BOOLEAN-PARAMETER** von `forwardToPinterest` (`testMode?:
  boolean`) wäre nach EINER Scheibe wieder falsch.
- **T17a2 UND T17b** (`pinterest-forward.test.ts`, in 11.3d gebaut) müssten umgeschrieben
  werden. GEMESSEN am Repo (CC, 2026-09-10): es sind die **einzigen zwei** Aufrufe im
  Testbestand, die einem Adapter ein siebtes Argument übergeben — `meta-forward.test.ts`
  hat **null** von acht, `tiktok-forward.test.ts` **einen** von neunzehn.

**EIN VIERTER GRUND IST IN DER VORGABE GENANNT WORDEN UND HÄLT DER MESSUNG NICHT STAND —
er steht hier berichtigt, nicht weggelassen:** Es hiess, der Kandidat ziehe "eine neue
Kopplung vom Adapter zur Auflösung, heute importiert kein Adapter aus `capi/token.ts`".
**GEMESSEN am Repo (CC, 2026-09-10), Achse: der Modulpfad über alle fünf Adapter:**
`meta-forward.ts` und `tiktok-forward.ts` tragen beide bereits
`import type { CapiConfig } from "@/lib/capi/token"`. **Neu wäre die Kopplung allein für
`pinterest-forward.ts`** — für zwei von drei betroffenen Adaptern besteht sie längst.
**DER PUNKT WIEGT DAMIT EIN DRITTEL SEINES ANGENOMMENEN GEWICHTS; die drei Gründe darüber
tragen die Entscheidung allein.**

**EIN ZWEITER VERWORFENER KANDIDAT:** ein **ACHTER** Parameter, der die Anwesenheit als
Boolean trägt, während der siebte den Code behält. **Ausgeschieden nicht am Aufwand,
sondern an derselben Begründung wie K3 in Entscheidung (3):** zwei Träger für dieselbe
Frage, die bei einem späteren Umbau auseinanderlaufen.

**WEN SIE BINDET:** die Scheibe 11.3e und jede spätere Runde, die ein weiteres Ziel
verdrahtet oder den `Forwarder`-Typ anfasst.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-10. Der Ausgangszustand — der `Forwarder`-Typ,
die Dispatch-Zeile, die drei Adapter-Signaturen und der `pinterest`-Eintrag, der sechs
Parameter nimmt und sechs weiterreicht — ist GEMESSEN am Repo (CC, 2026-09-10). Die
Aufruf-Zahlen der drei Adapter-Testdateien ebenso.

### (16) EIN NICHT-LEERER CODE FÜR EIN ZIEL OHNE CODE-PFLICHT WIRD ABGEWIESEN

**DIE ENTSCHEIDUNG:** `startTestMode` weist ihn ab, mit einem **NEUEN** Grund.
`TestModeWriteError` bekommt das Mitglied **`code_not_allowed`**, `testModeErrorText`
einen Satz dazu.

**DER GRUND:** Die Oberfläche kann den Fall nach der Gestalt-Entscheidung (A) **nicht
erzeugen** — es gibt kein Feld. **Aber eine Server-Action nimmt entgegen, was über die
Leitung kommt** (dieselbe Erwägung, die `isTrackingTarget` überhaupt begründet), und der
CHECK aus 0029 wäre sonst die einzige Stelle, die es je bemerkt — **NACH dem Instanziieren
des privilegierten Clients, und mit einem rohen Datenbank-Fehler als Auskunft.**

**DIE ZWEI VERWORFENEN, je mit Grund:**
- **IGNORIEREN** (Code verwerfen, Frist setzen): Der Aufrufer bekäme `ok: true` für einen
  Vorgang, bei dem etwas Verlangtes verworfen wurde — **eine schweigende Annahme.**
- **ABWEISEN ALS `unknown_target`:** schlicht **unwahr**. Das Ziel ist bekannt und hat
  einen Testmodus, nur keinen Code. **Ein Fehlergrund, der etwas Falsches sagt, schickt
  den nächsten Sucher an die falsche Stelle.**

**DAS AUSSCHLAGGEBENDE ARGUMENT BETRIFFT DEN ZWEITEN KONSUMENTEN DER ZIELMENGE:** Der Lauf
"die Ziel-Pruefung liest die ECHTE Menge, nicht eine Kopie"
(`src/app/projects/actions.testmode.test.ts`) ruft `startTestMode` mit einem Code für
JEDES Ziel und behauptet `ok === true`. **Bei IGNORIEREN bliebe er GRÜN** — grün aus dem
falschen Grund, während sein **gemockter** Schreibweg die Datenbank nie befragt. **Bei
ABWEISEN wird er ROT**, und die ohnehin nötige Änderung wird **ERZWUNGEN statt erhofft**.
**EIN FEHLERWEG, DER EINEN BESTEHENDEN LAUF ROT MACHT, IST BESSER ALS EINER, DER IHN
STILL RICHTIG AUSSEHEN LÄSST.**

**ZWEI AUFLAGEN AN DIE UMSETZUNG:**
- **Der Grund kommt aus `requiresTestCode`**, nicht aus einer eigenen Prüfung — **kein
  zweites Urteil über die Code-Pflicht.**
- **Der Text in `testModeErrorText` behauptet WEDER URSACHE NOCH ERGEBNIS:** Er sagt, dass
  dieses Ziel keinen Testcode annimmt — nicht, warum der Aufruf zustande kam. Dieselbe
  Disziplin wie bei den Meldungstexten von `safeAction` (docs/immer-beachten.md).

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-10. Die Gate-Reihenfolge in `startTestMode` und
der gemockte Schreibweg des zweiten Konsumenten sind GEMESSEN am Repo (CC, 2026-09-10).

### (17) LINKEDIN WIRD OHNE CODE ABGESCHLOSSEN — FÜR DIESES ZIEL ENTSTEHT KEIN TESTMODUS

**DIE ENTSCHEIDUNG:** Für `linkedin` baut die Phase 11.3 keinen Testmodus. Dieses Fünftel
der Phase endet mit der festgehaltenen Feststellung vom 2026-09-11, nicht mit Code: kein
Eintrag in `TARGETS_WITH_TEST_MODE`, keine eigene Klausel im CHECK
`project_secrets_test_mode_je_ziel` (dessen `else`-Zweig bleibt für `linkedin` zuständig),
kein Schalter an der Ziel-Karte.

**DER GRUND, IN ZWEI TEILEN:**
- **DER ANBIETER BIETET KEINEN TRÄGER.** Im gelesenen Umfang gibt es keinen Weg, ein
  Ereignis sichtbar ankommen zu lassen, ohne seine Zahlen zu berühren, und für zwei Wege
  sagt der Anbieter ausdrücklich das Gegenteil: Der Aufruf aus dem Payload Builder
  "gets created in the production environment", und "all API Calls at all access levels are
  made on production data". Befund und Reichweite: docs/ziel-befunde.md, Abschnitt
  "LinkedIn (Conversions API)", Teile (aa) und (ab), und der Block "Der gelesene Umfang
  (2026-09-11) — LinkedIn".
- **DIE ZWEI KONFIGURATIONS-KANDIDATEN SIND VERWORFEN** — eine eigene Conversion-Regel ohne
  zugeordnete Kampagnen und ein Test-Werbekonto (dort Teile (ac) und (ad)). **Beide prüfen
  gegen eine ANDERE Regel-Kennung als die produktive, und genau die ist der
  wahrscheinlichste Fehler einer Kundeneinrichtung.** Der eigene Bestand misst für eine
  formgültige, aber nicht auflösbare Kennung die irreführende 403 "No ad accounts found"
  (dort Teil (c)) und für ein falsches Präfix eine 422 (Teil (l)). **Ein Testmodus, der die
  produktive Kennung nicht prüft, belegt nicht die Einrichtung, die der Kunde prüfen will**
  — und ANKUNFT der eigenen Einrichtung ist das Versprechen dieser Phase (Entscheidung (1)).
  Dass bei beiden Kandidaten zusätzlich die Beobachtung am Dokument nicht entscheidbar ist,
  ist ein NEBENGRUND und trägt die Verwerfung nicht.

**WEN SIE BINDET:** jede spätere Scheibe dieser Phase, die `TARGETS_WITH_TEST_MODE`, den
CHECK oder die Ziel-Karte anfasst · jeden Kundentext, der den Testmodus erklärt — für
`linkedin` gibt es keinen, und kein Text darf einen andeuten · jede Runde, die für
`linkedin` einen der zwei Kandidaten neu vorschlägt: **sie trägt gegen den Grund oben vor
und beginnt nicht bei null.**
**DER PREIS AUS ENTSCHEIDUNG (3) BLEIBT FÜR `linkedin` DAUERHAFT:** Steht ein anderes Ziel
im Testmodus, bekommt `linkedin` den Testklick als ECHTE Conversion. Das ist keine neue
Verschlechterung, sondern jene Entscheidung an einem Ziel, das keinen eigenen Testmodus
bekommt.

**IHRE GRENZE — WAS SIE NICHT SAGT:** Sie sagt NICHT, dass `linkedin` nie einen Testmodus
bekommt. Sie beschreibt den Kenntnisstand vom 2026-09-11 — eine DOKU-LESUNG, keine Messung
—, und der Anbieter kann ihn ändern, ohne dass hier etwas rot wird. Derselbe Anbieter führt
bei anderen Produkten Test-Kennzeichen (dort Teil (aa)). Der Befund ist ein NICHT-TREFFER mit
benannter Reichweite, **KEIN Beweis der Abwesenheit.**
**WANN SIE KIPPT:** wenn der Anbieter einen Träger dokumentiert oder eine Messung einen
zeigt, der die PRODUKTIVE Regel-Kennung prüft und die Beobachtung nicht abschneidet. Dann ist
neu zu entscheiden. Der Zustand je (Projekt, Ziel) aus 11.3a hat für `linkedin` bereits die
Form; der CHECK bräuchte nach Entscheidung (12) eine eigene Klausel.

**ES IST KEIN VERMERK ENTSTANDEN, UND DAS IST KEIN VERSÄUMNIS:** Ein Vermerk behauptet eine
gebaute Scheibe mit Bau-Commit und Live-Nachweis — hier gibt es weder das eine noch das
andere.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-11, auf der Grundlage der Abschnitts-Lesung vom
2026-09-11 (GELESEN, CC, Browser-Werkzeug; docs/ziel-befunde.md wie oben). Die 403 und die
422 sind GEMESSEN (Owner, 2026-08-15 bzw. 2026-08-17; dort Teile (c) und (l)). Dass der
`else`-Zweig des CHECK `linkedin` heute schon abdeckt, ist GEMESSEN LIVE (VERMERK 4, Wortlaut
der abgelesenen Definition).

### (18) GOOGLE WIRD OHNE CODE ABGESCHLOSSEN — FÜR DIESES ZIEL ENTSTEHT KEIN TESTMODUS

**DIE ENTSCHEIDUNG:** Für `google` baut die Phase 11.3 keinen Testmodus. Dieses Fünftel der
Phase endet mit der festgehaltenen Feststellung vom 2026-09-11, nicht mit Code: kein Eintrag
in `TARGETS_WITH_TEST_MODE`, keine eigene Klausel im CHECK `project_secrets_test_mode_je_ziel`
(dessen `else`-Zweig bleibt für `google` zuständig), kein Schalter an der Ziel-Karte. **Damit
endet das letzte offene Fünftel der Phase.**

**DER GRUND, IN ZWEI TEILEN — UND DER ZWEITE WIEGT SCHWERER:**
- **DER EINZIGE MECHANISMUS DES ANBIETERS IST VON UNSEREM ZUGANG AUS NICHT SCHALTBAR.** Im
  gelesenen Umfang gibt es keinen Träger, der ein Ereignis sichtbar ankommen lässt, ohne die
  Zahlen des Anbieters zu berühren (docs/ziel-befunde.md, Abschnitt "Google (Google Ads
  Conversions · GA4)", Teil (ch)). Der einzige Mechanismus, der eine Achse ausdrücklich
  entlastet, ist die sekundäre Conversion-Aktion (`primary_for_goal = false`, dort Teil
  (ck)): kein Gebot, nicht in "Conversions". **ER SITZT AN EINER ANDEREN SCHNITTSTELLE MIT
  EIGENEM ZUGANGSMODELL** — an der Google Ads API bzw. in der Oberfläche des Kunden. Die Data
  Manager API, über die wir senden, führt keine Methode, die Conversion-Aktionen verwaltet
  (dort Teile (ci) und (ck)); die Google Ads API vergibt ihren Zugriff über eigene
  Zugriffsstufen je Cloud-Projekt (dort Teil (cm)); und unser Zugang fordert allein den
  Bereich `https://www.googleapis.com/auth/datamanager` an — `DATA_MANAGER_SCOPE` in
  `src/lib/oauth/google-authorize.ts` (GEMESSEN am Repo, CC, 2026-09-11) —, während der
  Leitfaden der Data Manager API `https://www.googleapis.com/auth/adwords` in seinem Beispiel
  als EIGENEN Bereich daneben führt (dort Umfang-Block, D16).
- **SEIN ZUSTAND LÄGE IM KUNDENKONTO — AUSSERHALB DER REICHWEITE DER FRIST, AUF DER DER
  GESAMTE SICHERHEITSENTWURF DIESER PHASE RUHT.** Der Testmodus dieser Phase ist eine FRIST,
  weil eine Frist von allein abläuft (Abschnitt "Der Träger des Zustands ist eine FRIST, kein
  Boolean"). Die Einstellung einer Conversion-Aktion läuft nicht ab, und unsere Frist kann sie
  nicht zurückstellen. **VERGISST DER KUNDE DAS ZURÜCKSTELLEN, LAUFEN SEINE ECHTEN CONVERSIONS
  DAUERHAFT AN DER GEBOTSSTEUERUNG VORBEI** — die Einstellung gilt nach dem Wortlaut der
  AKTION, nicht dem einzelnen Ereignis (dort Teil (ck)). Das ist dieselbe Art Schaden, den die
  Frist deckelt — ein vergessener Zustand, der still und ohne Ende wirkt —, nur ausserhalb
  ihrer Reichweite.
  **DAZU ZWEI FOLGEN AUS DEM WORTLAUT:** Die Testereignisse blieben in der Gesamtspalte "All
  conv." stehen (dort Teil (ck)); und der einzige Rücknahmeweg — `RETRACTION` über
  `ConversionAdjustmentUploadService` — liegt an derselben Google Ads API, die unser Zugang
  nicht anfordert (dort Teil (ci)). Die Data Manager API hat keinen.

**DIE VERWORFENE ZWEITE GESTALT — DIE VIERZEHNTÄGIGE PROBEZEIT, MIT IHREM EIGENEN GRUND:** Sie
ist nicht schaltbar — Eintritt und Ende geschehen nach dem Wortlaut von selbst —, sie beginnt
mit dem ERSTEN Offline-Upload je Conversion-Aktion und ist damit je Aktion einmalig (das
Zweite ist eine ABLEITUNG aus dieser Bindung), und **für die gewählte Gestalt ist sie nicht
ausgesagt**: Alle Fundstellen sprechen von einer zusätzlichen Datenquelle an einer
gebotsfähigen Aktion (dort Teil (cl)). Selbst wo sie gilt, entlastet sie die Gebote vierzehn
Tage lang und die Berichterstattung nie.

**AUSDRÜCKLICH MITVERWORFEN: EIN BLOSSER BEDIENHINWEIS**, der den Kunden auffordert, seine
Aktion vor dem Test auf "sekundär" zu stellen und danach zurück. **Er wäre kein Testmodus,
sondern eine Aufforderung, die eigene Gebotssteuerung anzuhalten** — mit einem Schaden, den wir
veranlasst und nicht gedeckelt hätten.

**WEN SIE BINDET:** jede spätere Scheibe dieser Phase, die `TARGETS_WITH_TEST_MODE`, den CHECK
oder die Ziel-Karte anfasst · jeden Kundentext, der den Testmodus erklärt — für `google` gibt
es keinen, und kein Text darf einen andeuten, auch keinen Hinweis auf die sekundäre Aktion ·
jede Runde, die für `google` die sekundäre Aktion, die Probezeit oder einen Bedienhinweis neu
vorschlägt: **sie trägt gegen den Grund oben vor und beginnt nicht bei null.**
**DER PREIS AUS ENTSCHEIDUNG (3) BLEIBT FÜR `google` DAUERHAFT:** Steht ein anderes Ziel im
Testmodus, bekommt `google` den Testklick als ECHTE Conversion. Das ist keine neue
Verschlechterung, sondern jene Entscheidung an einem zweiten Ziel, das keinen eigenen
Testmodus bekommt.

**IHRE GRENZE — WAS SIE NICHT SAGT:** Sie sagt NICHT, dass `google` nie einen Testmodus
bekommt. Sie beschreibt eine DOKU-LESUNG vom 2026-09-11 — keine Messung —, und der Anbieter
kann seinen Stand ändern, ohne dass hier etwas rot wird. Der Befund ist ein NICHT-TREFFER mit
benannter Reichweite, **KEIN Beweis der Abwesenheit**; das gelesene Nachbarprodukt trägt
ebenfalls kein Test-Kennzeichen, und der Kontrast reicht über EIN Produkt (dort Teil (ch)).
**WANN SIE KIPPT:** wenn ein Träger erreichbar wird, den UNSER Zugang schaltet und dessen
Zustand UNSERE Frist beenden kann. Dann ist neu zu entscheiden. Der Zustand je (Projekt, Ziel)
aus 11.3a hat für `google` bereits die Form; der CHECK bräuchte nach Entscheidung (12) eine
eigene Klausel.

**ES IST KEIN VERMERK ENTSTANDEN, UND DAS IST KEIN VERSÄUMNIS:** Ein Vermerk behauptet eine
gebaute Scheibe mit Bau-Commit und Live-Nachweis — hier gibt es weder das eine noch das
andere.

**PROVENIENZ:** OWNER-ENTSCHEIDUNG 2026-09-11, auf der Grundlage der Abschnitts-Lesung vom
2026-09-11 (GELESEN, CC; docs/ziel-befunde.md wie oben, Teile (ch) bis (cr)). Der angeforderte
Bereich ist GEMESSEN am Repo (CC, 2026-09-11). Dass der `else`-Zweig des CHECK `google` heute
schon abdeckt, ist GEMESSEN LIVE (VERMERK 4, Wortlaut der abgelesenen Definition). Dass die
Einstellung beim Vergessen dauerhaft wirkt und die Frist sie nicht erreicht, ist eine
ABLEITUNG aus ihrem Ort und ihrem Wortlaut, **keine Messung an einem Kundenkonto**.

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
DOKUMENTATION FEHLT — DREI PUNKTE" (CLAUDE.md). PROVENIENZ: FOLGERUNG aus dem Zuschnitt
der Scheibe 11.3a, keine Messung.

**VERMERKT AM 2026-09-10 NACH DER SCHEIBE 11.3f — NICHT GESTRICHEN. DER EINTRAG BLEIBT
OFFEN, UND DIE ENTSCHEIDUNG IST AM TEXT DES EINTRAGS FESTGEMACHT, NICHT AM GEFÜHL, er sei
"im Wesentlichen erledigt":** Der Eintrag zählt DREI Orte auf, an denen die Erklärung fehlt
— "keine Anzeige, keinen Hinweistext, keine Betreiber-Dokumentation". **Zwei davon sind
gebaut, der dritte steht wörtlich im Eintrag und fehlt weiterhin.** Wer bei zwei von drei
streicht, streicht den Teil mit, der noch aussteht.

**WAS DIE SCHEIBEN 11.3b BIS 11.3f DAVON EINGELÖST HABEN:** Der Banner nennt seit 11.3b
Ziel und Frist und sagt den Satz, der genau diesen Eintrag adressiert — "Solange zählt die
eigene Auswertung dieses Projekts keine Ereignisse". Seit 11.3f sagt er zusätzlich JE ZIEL,
was beim Anbieter geschieht — für `pinterest` GEMESSEN LIVE, für `meta` GELESEN, für
`tiktok` ausdrücklich als ungeprüft. **Damit ist das Auseinanderlaufen der zwei Zählungen
benannt, statt dass der Kunde es als Defekt deuten muss.** Der TRIGGER des Eintrags ("die
Oberflächen-Scheibe 11.3b") ist also EINGETRETEN und ABGEARBEITET — der Eintrag ist
trotzdem nicht leer.

**DIE ZWEI RESTLÜCKEN, EINZELN UND JE MIT IHRER ACHSE:**
· **(a) DIE BETREIBER-DOKUMENTATION FEHLT WEITERHIN.** Sie steht im Eintrag ausdrücklich
  als dritter Ort, und der Eintrag verweist selbst auf den offenen Punkt
  "BETREIBER-DOKUMENTATION FEHLT — DREI PUNKTE" (CLAUDE.md). Eine Anzeige IM Produkt
  ersetzt keine Dokumentation ÜBER das Produkt: Wer nachliest, warum seine Zahlen
  auseinanderliefen, hat die Anzeige längst nicht mehr vor sich.
· **(b) DER BANNER ERKLÄRT NUR WÄHREND DES LAUFENDEN TESTMODUS — DIE LÜCKE IN DER KURVE
  ÜBERLEBT IHN.** Das ist die schärfere der beiden, weil sie erst nach dem Beenden beisst:
  Mit dem Ablauf der Frist ist der Banner sofort weg, die fehlenden Ereignisse des
  Zeitraums bleiben in der Auswertung fehlend, und **nichts sagt mehr, warum**. Der Eintrag
  beschreibt genau diesen Fall ("Sein Dashboard steht still") — er beschreibt ihn nur für
  die Zeit WÄHREND, und die Zeit DANACH ist von 11.3b bis 11.3f nicht berührt worden.
  **AUSDRÜCKLICH KEINE EMPFEHLUNG**, was dagegen zu bauen wäre; hier steht der Befund, nicht
  seine Auflösung.

**DER TRIGGER DES EINTRAGS BLEIBT WÖRTLICH STEHEN UND WIRD NICHT ERSETZT**, obwohl seine
erste Hälfte eingetreten ist: Seine zweite Hälfte — "spätestens der erste fremde Nutzer, der
den Testmodus einschaltet" — trägt die zwei Restlücken weiter und ist NICHT eingetreten.
PROVENIENZ DIESES VERMERKS: der gebaute Banner-Stand GEMESSEN am Repo (CC, 2026-09-10,
Commit `8fcd4e0`); dass die Betreiber-Dokumentation fehlt, ist GEMESSEN am Repo (CC,
2026-09-10) und steht zugleich als offener Punkt in CLAUDE.md; dass der Banner nach dem
Beenden verschwindet, ist eine ABLEITUNG aus seiner Bedingung (`testModeState.kind ===
"laeuft"`), **keine Messung an einer laufenden Oberfläche**.

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

**(8) — GESTRICHEN AM 2026-09-10, GEGENSTAND VERLOREN. DIE NUMMER BLEIBT STEHEN** und wird
nicht nachvergeben; ein Verweis nennt die Nummer, nicht das Datum, und er wird nicht rot,
wenn sie weiterwandert.

HIER STAND: "DER PAAR-CHECK BINDET AN DIE FORM VON META UND TIKTOK" — der CHECK
`project_secrets_test_mode_paar` verlangte Code UND Frist gemeinsam, und der Eintrag
kündigte an, dass er für pinterest in einer EIGENEN Migration ERSETZT werden muss.
TRIGGER war: die Scheibe, die pinterest in den Testmodus aufnimmt.
**DER ALTE VOLLTEXT WIRD NICHT MITGEFÜHRT** — er beschrieb einen Constraint, den es nicht
mehr gibt.

**DER BELEG DER ERLEDIGUNG:** Migration `0029_project_secrets_test_mode_je_ziel.sql`,
Commit `1fb9b90`, am 2026-09-10 eingespielt und geprüft. `project_secrets_test_mode_paar`
existiert nicht mehr (NULL Zeilen im Katalog); an seiner Stelle steht
`project_secrets_test_mode_je_ziel`, und "Frist ohne Code" ist bei `pinterest` erlaubt.
**Volltext des Nachweises in VERMERK 4.**

**WAS DIE STREICHUNG NICHT BEHAUPTET:** dass pinterest damit im Testmodus wäre. Der CHECK
erlaubt den Zustand; erzeugen kann ihn noch niemand (`TARGETS_WITH_TEST_MODE`), und das ist
11.3d. PROVENIENZ DER STREICHUNG: GEMESSEN LIVE, 2026-09-10, Stefan (Katalog und
Wirkungs-Probe); der Commit ist GEMESSEN am Repo (CC, 2026-09-10).

**(9) — GESTRICHEN AM 2026-09-11, ERLEDIGT. DIE NUMMER BLEIBT STEHEN.**
TITEL: "EIN TESTZUSTAND KANN NUR DORT LIEGEN, WO BEREITS ZUGANGSDATEN HINTERLEGT SIND."
GEGENSTAND: Die Oberfläche sollte die Folge des CHECK `project_secrets_secret_genau_eines`
kennen — ohne Geheimnis-Zeile gibt es keinen Ort für einen Testzustand.
**BELEG:** Der handlungsbindende Teil ist erledigt — der Schalter erscheint nur an Zielen
mit Testmodus, mit Kennung und mit Geheimnis-Zeile (gegengeprüft am Bestand, CC,
2026-09-09; Vorrat (11), Absatz "NICHT GESTRICHEN"). Die Festlegung selbst steht dauerhaft
in Entscheidung (2), Absatz "IHRE GRENZE".

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

**(14) — GESTRICHEN AM 2026-09-11, GEGENSTAND ENTFALLEN. DIE NUMMER BLEIBT STEHEN.**
TITEL: "OB TIKTOKS TESTCODE DAUERHAFT ABLEGBAR IST, BLEIBT OFFEN."
GEGENSTAND: ob eine Ablage den TikTok-Testcode wie einen dauerhaften Wert behandeln darf.
**BELEG:** Keine Ablage behandelt ihn so — die Oberfläche verlangt den Code bei jedem Start
und jeder Verlängerung (`TargetCard.tsx`: Sperre `brauchtTestCode && !testInput.trim()`,
das Feld wird nach dem Start geleert; GEMESSEN am Repo, CC, 2026-09-11). Die Anbieter-Frage
selbst ist in docs/ziel-befunde.md verortet, Abschnitt "TikTok (Events API 2.0)", Teile (e)
und (f).

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

**(22) — GESTRICHEN AM 2026-09-10, GESCHLOSSEN DURCH DEN BAU. DIE NUMMER BLEIBT STEHEN**
und wird nicht nachvergeben; ein Verweis nennt die Nummer, nicht das Datum, und er wird
nicht rot, wenn sie weiterwandert.

HIER STAND: "DER BANNER-SATZ 'beim Anbieter kommen sie weiterhin an' IST NICHT FALSCH, ABER
ZIEL-ABHÄNGIG ZU LESEN" — der Satz sprach von ANKUNFT, der Leser las ihn als ZÄHLUNG, und
der Eintrag hielt fest, dass ein ziel-abhängiger Text auf einer einmal gelesenen
Oberflächen-Zeile zu dünn ruhte.
TRIGGER war: die Messung, ob TikTok test-markierte Ereignisse in den echten Daten führt.
**DER ALTE VOLLTEXT WIRD NICHT MITGEFÜHRT** — er beschrieb einen Satz, den es so nicht
mehr gibt.

**DER BELEG DER ERLEDIGUNG:** Commit `8fcd4e0` (Scheibe 11.3f, VERMERK 7), gepusht. Der
Banner-Satz ist **ziel-abhängig** geworden: `meta` "beim Anbieter zählen sie weiter",
`pinterest` "beim Anbieter kommen sie an, gezählt werden sie nicht", `tiktok` "was der
Anbieter mit ihnen tut, ist nicht geprüft". **Der Live-Blick hat ihn gesehen** — einzeilig
bei einem Ziel, bei zwei Zielen beide Halbsätze je direkt beim Namen und ein Absatz
(GEMESSEN LIVE, Stefan, 2026-09-10).

**DER EINWAND DIESES EINTRAGS IST NICHT ENTKRÄFTET, SONDERN ÜBERWOGEN, und das ist der
Unterschied:** Er warnte davor, Genauigkeit zu behaupten, die niemand gemessen hat. **Die
gebaute Fassung behauptet für `tiktok` gerade KEINE** — sie ist die Stelle, an der das
Nichtwissen steht. **Der Ausschlag gab: Ein Kundentext, der für ein Ziel irreführt, sollte
nicht auf eine Messung warten, die niemand terminiert hat.** OWNER-ENTSCHEIDUNG 2026-09-10.

**DER ZEIGER, DER GERETTET WERDEN MUSS — UND ER IST DER GRUND, WARUM DIESE STREICHUNG NICHT
KÜRZER AUSFÄLLT: DIE TIKTOK-MESSUNG STEHT WEITER OFFEN, UND ZWAR IN VORRAT (1).** Jener
führt "OB TIKTOK TEST-MARKIERTE EREIGNISSE MITZÄHLT WIE META — UNGELESEN UND UNGEMESSEN"
mit eigenem Trigger. **Dieser Eintrag hier trug die FOLGE FÜR DEN PRODUKTTEXT, (1) trägt
die MESSUNG selbst** (GEMESSEN am Dateitext, CC, 2026-09-10).
**WER DIESE STREICHUNG ALS ERLEDIGUNG DER GANZEN ACHSE LIEST, HÄLT EINE FRAGE FÜR
BEANTWORTET, DIE NUR IHRE TEXTFORM BETRIFFT.** Gestrichen ist, dass der Text für zwei von
drei Zielen falsch lag — nicht, dass wir wüssten, was TikTok tut.

**EINE NAMENSVETTER-PRÜFUNG, damit die Streichung keinen fremden Zeiger tötet (GEMESSEN am
Repo, CC, 2026-09-10):** Ausserhalb dieser Datei nennen **zwei** Stellen einen
"Vorrats-Eintrag 22" — docs/claude-history/backlog-polish.md und
docs/claude-history/phase-11.2-google.md. **Beide meinen den Vorrat der PHASE 11.2**
(CR-Zeilen-Instrument bzw. Hebungs-Kandidat 6 jener Phase), **nicht diesen Eintrag**. Es
sind NAMENSVETTERN und keine Zeiger; **kein Zeiger stirbt mit dieser Streichung.**

PROVENIENZ DER STREICHUNG: der Bau ist GEMESSEN am Repo (CC, 2026-09-10, Commit `8fcd4e0`,
gepusht); der gesehene Banner ist GEMESSEN LIVE (Stefan, 2026-09-10); die Zuordnung der
TikTok-Messung zu Vorrat (1) und die Namensvetter-Prüfung sind GEMESSEN am Dateitext bzw.
am Repo (CC, 2026-09-10).

**ZUSATZ 2026-09-10 — DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN.**
**RICHTIGGESTELLT AM 2026-09-11, NICHT GESTEMPELT — DIESER ZUSATZ IST ÄLTER ALS DIE
STREICHUNG ÜBER IHM, UND SEINE ZUSTANDSAUSSAGE IST DAMIT ÜBERHOLT.** Hier stand am Ende der
Kopfzeile: ", UND DER EINTRAG BLEIBT OFFEN." und danach: "Sein Trigger ist die
TikTok-Messung, und die steht aus; die Ergänzung betrifft ein DRITTES Ziel und löst ihn
nicht ab." Der Zusatz ist mit Commit `494d929` entstanden (2026-09-10, vormittags), also
VOR dem Bau der Scheibe 11.3f (`8fcd4e0`, abends); der Streichungs-Kopf darüber stammt aus
`ac0803b`, danach. **DER EINTRAG IST GESTRICHEN.** Die TikTok-Messung lebt unverändert in
Vorrat (1) weiter, wie es der Streichungs-Kopf bereits sagt. Weil die Streichung ÜBER dem
älteren Zusatz eingefügt wurde, las sich der Eintrag als Widerspruch — gestrichen oben,
offen unten. **RICHTIGGESTELLT UND NICHT GESTEMPELT, weil es eine ZUSTANDSAUSSAGE ist und
keine Herleitung.** Der Block darunter stammt aus demselben Commit und bleibt wörtlich
stehen: Er trägt die drei Lagen als Grenze und ist von dieser Korrektur nicht berührt.
PROVENIENZ: die Reihenfolge ist GEMESSEN am Repo (CC, 2026-09-11) — `git log -S` auf eine
eindeutige Zeile je Block und `git merge-base --is-ancestor` für
`494d929` → `8fcd4e0` → `ac0803b`.
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

**(25) — GESTRICHEN AM 2026-09-10, GEGENSTAND VERLOREN. DIE NUMMER BLEIBT STEHEN** und
wird nicht nachvergeben.

HIER STAND: "`PINTEREST_TEST_MODE` IST EIN ANWESENHEITS-TEST, KEIN WAHRHEITS-TEST" — jeder
nicht-leere Wert schaltete den Testmodus EIN, `"false"` und `"0"` eingeschlossen, und
ausgeschaltet wurde nur durch Entfernen der Variable.
TRIGGER war: die erste Ops-Runde oder der erste Betreiber, der den Schalter setzt.
**DER ALTE VOLLTEXT WIRD NICHT MITGEFÜHRT** — er beschrieb eine Umgebungsvariable, die es
nicht mehr gibt.

**DER BELEG DER ERLEDIGUNG — DREIFACH, und die dritte Hälfte ist die tragende:**
- **DIE VARIABLE IST AUS DEM PRODUKTIVCODE ENTFERNT.** Commit `3d42501` (Scheibe 11.3d,
  VERMERK 5); `testModeQuery` (`src/lib/capi/pinterest-forward.ts`) ist eine reine Funktion
  über einen Parameter und liest überhaupt keine Umgebungsvariable mehr.
- **SIE IST IN KEINER UMGEBUNG GESETZT.** Für `.env.local` GEMESSEN am Repo (CC,
  2026-09-10); für **Vercel GEMESSEN LIVE (Stefan, 2026-09-10)** — Production, Preview und
  Development einzeln nachgesehen. Damit ist auch die zweite Hälfte der Provenienz von
  Entscheidung (13), die dort als OWNER-ANGABE geführt war, eine Messung geworden.
- **DIE FALLE SELBST IST NICHT VERSCHWUNDEN, SIE IST GEWANDERT — UND SIE HAT JETZT EINEN
  WÄCHTER.** Ein Schalter, der auf ANWESENHEIT statt auf den WERT prüft, wird durch
  `"false"` eingeschaltet; am Parameter von `forwardToPinterest` wäre das dieselbe Klasse.
  Der Lauf **T17a2** (`src/lib/capi/pinterest-forward.test.ts`) übergibt ausdrücklich
  `false` und verlangt einen leeren Anhang; die Mutationsprobe **M5** hat ihn an genau
  diesem Umbau rot gemacht. **Der Kommentar jenes Laufs sagt die Verwechslung SELBST** und
  zeigt nicht mehr auf diesen Eintrag — ein Zeiger aus Testcode in diese Datei stürbe am
  Phasenende ohnehin (s. Hebungs-Kandidat (6)).

PROVENIENZ DER STREICHUNG: der Wegfall im Code ist GEMESSEN am Repo (CC, 2026-09-10); die
Vercel-Ablesung ist GEMESSEN LIVE (Stefan, 2026-09-10); der Wächter und sein Rot-Werden
sind GEMESSEN am eigenen Lauf (CC, 2026-09-10).

**(26) — GESTRICHEN AM 2026-09-10, GEGENSTAND VERLOREN. DIE NUMMER BLEIBT STEHEN** und
wird nicht nachvergeben.

HIER STAND: "DER SCHALTER WIRKT DEPLOYMENT-WEIT, DIE GEPLANTE FRIST PROJEKT-EIGEN" — bei
`pinterest` kollidierten ein deployment-weiter SCHALTER und eine projekt-eigene FRIST, also
zwei verschiedene ARTEN von Zustand, und wer die Scheibe zuschnitt, musste sagen, was gilt,
wenn beide etwas sagen.
TRIGGER war: der Zuschnitt der Pinterest-Scheibe.
**DER ALTE VOLLTEXT WIRD NICHT MITGEFÜHRT** — er beschrieb eine Kollision, die es nicht
mehr gibt.

**DER BELEG DER ERLEDIGUNG — AN DER WURZEL, NICHT AN DER FRAGE:** Mit Commit `3d42501`
(Scheibe 11.3d, VERMERK 5) fällt der deployment-weite Schalter. Es gibt seither nur noch
EINE Art von Zustand — die projekt-eigene Frist —, und **eine Kollision zwischen zwei
Quellen kann nicht entstehen, wo es nur eine gibt.** Die Frage hat damit keinen
Gegenstand mehr; sie ist nicht beantwortet worden, sondern entfallen.

**WAS DIE STREICHUNG AUSDRÜCKLICH NICHT MITNIMMT — DER ZEIGER AUF (10):** Jener Eintrag
führt die Vorrang-Frage für die zwei **CODES** bei `meta` und `tiktok` — welcher Wert in
die Nutzlast wandert, wenn Umgebungsvariable und Projektzeile VERSCHIEDENE tragen. **Er
bleibt unverändert OFFEN**, mit seinem eigenen Trigger. `META_TEST_EVENT_CODE` und
`TIKTOK_TEST_EVENT_CODE` bestehen fort; nur `PINTEREST_TEST_MODE` ist entfallen. **Wer die
beiden Streichungen als Erledigung der ganzen Vorrang-Achse liest, hält eine Frage über
drei Ziele für beantwortet, die nur für eines entfallen ist.**

PROVENIENZ DER STREICHUNG: GEMESSEN am Repo (CC, 2026-09-10) — der Wegfall der Variablen im
Produktivcode; dass damit die Kollision entfällt, ist eine ABLEITUNG aus dem Wegfall der
zweiten Quelle, **keine Messung**.

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

**(29) SECHS KOMMENTARE UNTER `src/` NENNEN EINEN CONSTRAINT, DEN ES NICHT MEHR GIBT —
IHRE AUSSAGE GILT, IHR NAME IST TOT.** Migration 0029 hat
`project_secrets_test_mode_paar` durch `project_secrets_test_mode_je_ziel` ersetzt
(VERMERK 4). Sechs Kommentarstellen in VIER Dateien führen den alten Namen weiter:
`startTestMode` und `stopTestMode` (`src/app/projects/actions.ts`, je eine Stelle im
Funktionskopf), zwei Läufe in `src/app/projects/actions.testmode.test.ts`, ein Lauf in
`src/components/TargetCard.test.tsx` und der Erklärtext an der Ziel-Karte
(`src/components/TargetCard.tsx`).
**WAS SIE SAGEN, BLEIBT FÜR `meta` UND `tiktok` RICHTIG:** "beide oder keine" gilt dort
unverändert — der neue CHECK urteilt für diese zwei Ziele wortgleich wie der alte. **NUR
DER NAME ZEIGT INS LEERE.** Wer ihn im Katalog nachschlägt, findet nichts und hält den
Kommentar für überholt, obwohl seine Aussage trägt.
**WARUM DAS NICHT SCHLIMMER IST, ALS ES KLINGT, UND WARUM ES TROTZDEM HIERHER GEHÖRT:** Es
sind Kommentare, kein Verhalten; nichts wird davon rot, und nichts läuft falsch. **Teuer
wird es erst an der Ziel-Karte** (`TargetCard.tsx`), wo der Text dem Betreiber erklärt,
warum es keinen An/Aus-Schalter gibt — und die Erklärung ab 11.3e für `pinterest` eine
ANDERE ist, weil dort gerade kein Code abgelegt werden darf.
TRIGGER: die nächste Runde, die eine dieser Dateien ohnehin öffnet — praktisch Scheibe
11.3e, die `TARGETS_WITH_TEST_MODE` und die Ziel-Karte anfasst.
**NACHGEZOGEN AM 2026-09-10:** An beiden Stellen stand "11.3d". **EIN TRIGGER IST DIE
HANDLUNGS-BINDUNG SCHLECHTHIN** — er sagt, WANN der Eintrag fällig wird, und ein Trigger
auf die falsche Scheibe feuert zu früh und ins Leere. Zielmenge und Ziel-Karte sind seit
der Teilung vom 2026-09-10 **11.3e**.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10), Achse: der alte Constraint-Name,
case-insensitiv, Suchraum `src/`, alle Dateitypen, Testdateien eingeschlossen — sechs
Treffer in vier Dateien, mit Negativkontrolle (0) und Gegenprobe (der NEUE Name kommt
unter `src/` NICHT vor).

**ZUSATZ 2026-09-10 — DIE SECHS ZERFALLEN IN ZWEI KLASSEN, UND NUR VIER GEHÖREN NOCH
HIERHER.** Der Text darüber bleibt wörtlich stehen; der Eintrag wird NICHT gestrichen.
**VIER STELLEN TRAGEN NUR EINEN TOTEN NAMEN** — ihre Aussage gilt für `meta` und `tiktok`
unverändert: `endTestMode` (`src/app/projects/actions.ts`), zwei Läufe in
`src/app/projects/actions.testmode.test.ts` und einer in
`src/components/TargetCard.test.tsx`. **Sie bleiben der Gegenstand dieses Eintrags.**
**ZWEI STELLEN TRAGEN EINE AUSSAGE, DIE AB 11.3e SACHLICH FALSCH WIRD**, und sie sind
damit **SCHEIBENARBEIT und keine Aufräumarbeit**: der Kopf von `startTestMode`
(`src/app/projects/actions.ts`) und der sichtbare Erklärtext an der Ziel-Karte
(`src/components/TargetCard.tsx`). Beide sagen, ein Zustand ohne Code sei unmöglich — für
`pinterest` ist genau das ab 11.3e der Normalfall. **Sie stehen unter "Was beim Zuschnitt
von 11.3d vorliegen muss", Teil (a), und gehören in die Scheibe 11.3e, nicht in eine
Aufräumrunde.**
**NACHGEZOGEN AM 2026-09-10:** Hier stand zweimal "ab 11.3d" und "gehören in die Scheibe".
Beides ist **handlungsbindend** — es sagt, welche Scheibe die zwei Stellen mitnimmt. Seit
der Teilung desselben Tages ist das **11.3e**. **Der Titel des Abschnitts bleibt wörtlich
zitiert**, weil er nicht umbenannt worden ist; **verschoben ist die SCHEIBE, nicht der
ABLAGEORT.**
PROVENIENZ: die Einteilung ist eine ABLEITUNG aus Entscheidung (14) und den am 2026-09-10
gemessenen Fundstellen; die Fundstellen selbst sind GEMESSEN am Repo (CC, 2026-09-10).

**ZUSATZ 2026-09-10 — ZWEI ANGABEN DIESES EINTRAGS SIND ÜBERHOLT, DER EINTRAG BLEIBT.** Der
Text darüber bleibt wörtlich stehen und wird nicht gestrichen; was folgt, tritt daneben.
**DIE ZWEI STELLEN:** "**Teuer wird es erst an der Ziel-Karte**, wo der Text **dem
Betreiber erklärt**, warum es keinen An/Aus-Schalter gibt" (im Text oben) und "der
**sichtbare** Erklärtext an der Ziel-Karte" (im Zusatz darüber). **Beide unterstellen, der
Erklärtext werde AUSGELIEFERT.**
**GEMESSEN am Repo (CC, 2026-09-10), Achse `schalter|an/aus`, case-insensitiv, über
`src/components/TargetCard.tsx`:** FÜNF Treffer, **KEINER im gerenderten JSX**. Der Text
steht in einem **JSX-KOMMENTAR** und wird nicht ausgeliefert. Gegenprobe: kein Lauf in
`TargetCard.test.tsx` erwartet ihn im gerenderten Text.
**ES SIND ZWEI KOMMENTARE, KEIN KUNDENTEXT** — und damit fällt auch die Einstufung "die
teuerste der sechs Stellen".
**WAS DAVON UNBERÜHRT BLEIBT UND DER GRUND IST, WARUM DER EINTRAG NICHT SCHRUMPFT:** Die
Einteilung in VIER Aufräum-Stellen und ZWEI Scheibenarbeit-Stellen **stimmt unverändert**
— nur ihre Begründung wechselt. **Nicht die Sichtbarkeit trennt sie, sondern die AUSSAGE:**
Die vier tragen einen toten NAMEN, diese zwei eine falsche AUSSAGE ("ein Zustand ohne Code
ist unmöglich"), und die wird mit 11.3e für `pinterest` zum Normalfall.
**WARUM DIESER SATZ HIER STEHT:** Dieselbe Richtigstellung ist am 2026-09-10 bereits an
**zwei** anderen Stellen vollzogen worden — im Abschnitt 11.3e und in "Was beim Zuschnitt
von 11.3d vorliegen muss", Teil (a). **Dieser Eintrag war die dritte und letzte.** Wer ihn
öffnet, ohne die zwei anderen zu lesen, hielte den Erklärtext weiterhin für Kundentext.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10), mit Gegenprobe.

**ZUSATZ 2026-09-10 — DIE ZWEI SCHEIBENARBEIT-STELLEN SIND ERLEDIGT, DER EINTRAG BLEIBT
OFFEN. Der Text darüber bleibt wörtlich stehen.**
**DER BELEG:** Commit `9422920` (Scheibe 11.3e, VERMERK 6). Beide Stellen — der Kopf von
`startTestMode` (`src/app/projects/actions.ts`) und der JSX-Kommentar am Testmodus-Block
(`src/components/TargetCard.tsx`) — tragen seither einen NACHGEZOGEN-Block, der (1) den
neuen Namen `project_secrets_test_mode_je_ziel` nennt und (2) die falsche Aussage
richtigstellt: "ein Zustand ohne Code ist unmöglich" gilt **nur noch für Ziele MIT
Code-Pflicht**, und für `meta` und `tiktok` bleibt "beide oder keine" **wortgleich**
bestehen. **DIE ALTEN ABSÄTZE SIND NICHT GESTRICHEN, SONDERN RICHTIGGESTELLT** — Hausform
dieses Projekts.
**DER EINTRAG WIRD NICHT GESTRICHEN, UND SEIN TRIGGER GILT UNVERÄNDERT DEN VIER ÜBRIGEN
STELLEN:** `endTestMode` (`src/app/projects/actions.ts`), zwei Läufe in
`src/app/projects/actions.testmode.test.ts` und einer in
`src/components/TargetCard.test.tsx`. Sie tragen weiterhin **nur einen toten NAMEN** und
keine falsche Aussage; sie bleiben **Aufräumarbeit**.

**DIE AUFTEILUNG STIMMT WEITER — DIE ZAHL SECHS NICHT MEHR, UND SIE WIRD NICHT
ANGEGLICHEN.** GEMESSEN am Repo (CC, 2026-09-10, nach `9422920`; Achse: der alte
Constraint-Name, case-insensitiv, Suchraum `src/`, alle Dateitypen, Testdateien
eingeschlossen): **SIEBEN Fundstellen in VIER Dateien**, nicht sechs. **DIE SIEBTE IST DIE
RICHTIGSTELLUNG SELBST** — der Nachzug im Kopf von `startTestMode` muss den toten Namen
NENNEN, um sagen zu können, dass er tot ist.
**DAS IST KEIN RÜCKSCHRITT, SONDERN DIE BAUFORM:** Eine Richtigstellung, die ihren
Gegenstand nicht benennt, ist keine. Gegenprobe: der NEUE Name steht seit `9422920` in
**zwei** Dateien unter `src/` (`actions.ts`, `TargetCard.tsx`) — vorher in keiner.
**WER KÜNFTIG NACH DEM TOTEN NAMEN SUCHT, ZIEHT DIE ZWEI RICHTIGSTELLUNGS-STELLEN AB** und
findet die vier, die der Trigger meint. **DIE ZAHL IM TITEL DES EINTRAGS BLEIBT WÖRTLICH
STEHEN** — sie ist als Messung vom 2026-09-10 datiert und damit alt, nicht falsch; eine
zweite Zahl daneben wäre genau die Bauform, die diese Datei mehrfach als kaputtgegangen
führt.
PROVENIENZ DIESES ZUSATZES: die sieben Fundstellen, ihre Verteilung und die Gegenprobe sind
GEMESSEN am Repo (CC, 2026-09-10) nach dem Bau-Commit; dass die siebte von der
Richtigstellung selbst stammt, ist am Dateitext ABLESBAR und keine Ableitung.

**(30) — GESTRICHEN AM 2026-09-10, VERORTET. DIE NUMMER BLEIBT STEHEN.**

HIER STAND: "DER NAME VON PINTERESTS TEST-ANSICHT IST GEMESSEN UND NIRGENDS ABGELEGT — UND
ER IST SPRACHABHÄNGIG." Sein Gegenstand ist damit erledigt: Der Befund liegt jetzt dort, wo
jeder greift, der an diesem Ziel arbeitet, statt mit dieser Standdatei am Phasenende aus dem
Blickfeld zu geraten.
TRIGGER war: eine eigene Doku-Runde an `docs/ziel-befunde.md`.

**DER BELEG:** `docs/ziel-befunde.md` trägt im Abschnitt "Pinterest (Conversions API)" den
**Teil (aa)**, samt eigener Zeile im Verzeichnis jener Datei — beide Labels im Wortlaut, die
Provenienz (GELESEN an der Oberfläche, Owner, 2026-09-10), die Grenze (deutsche Oberfläche,
an keinem englischen Konto gemessen, die Sprachabhängigkeit als ABLEITUNG) und die Folge für
den Kundentext. Geschrieben im Commit dieser Runde, Betreff "docs(claude): der Name von
Pinterests Test-Ansicht ist sprachabhaengig".

**WARUM HIER KEIN COMMIT-HASH STEHT UND BEI (23) EINER:** Dort entstand der Teil in einem
FRÜHEREN Commit, dessen Hash beim Streichen vorlag. Hier liegen Befund und Streichung in
EINEM Commit — der Hash existiert erst, nachdem dieser Satz geschrieben ist. Wer ihn
nachtragen will, trägt ihn gegen genau diesen Grund vor.

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

**GESTRICHEN AM 2026-09-11, VOLLZOGEN.** Gegenstand war der Satz im Abschnitt
"Ausgangslage — was am 2026-09-08 gemessen und gelesen ist", der die Zahl der
Testdateien mit geleerter Konstante nur unter einer Lesart richtig nannte und die
`vi.mock`-Factory als "Config-Fabrik" bezeichnete.
**BELEG:** Jener Satz trägt seit dem 2026-09-11 alle drei Zahlen mit ihrer Lesart und je
der Liste der Dateien, und er nennt die Factory so, wie sie dasteht.

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

### (4) EINE ZAHL IN EINER WÖRTLICHEN PROMPT-VORGABE WIRD NICHT GEPRÜFT, WEIL SIE VORGABE IST

**DER BELEG — GEMESSEN am eigenen Lauf (CC, 2026-09-10):** Der Commit-Body zu `ce7b49e`
war wörtlich vorgegeben und nannte "fuenf Kommentare unter src/". **Dieselbe Runde hat
SECHS Vorkommen in VIER Dateien gemessen**, mit Negativkontrolle und Gegenprobe. Der Body
ist unverändert übernommen worden, **weil er Vorgabe war** — der Widerspruch fiel erst nach
dem Commit auf und ist per `--amend` vor dem Push behoben worden (`3bbd486`).

**DIE URSACHE IST DIE BAUFORM, NICHT DIE SORGFALT:** Ein Commit-Body kommt aus dem
**PROMPT**, die Messung aus der **RUNDE**. **Niemand hält beide gegeneinander, weil sie aus
verschiedenen Quellen stammen und je für sich richtig aussehen.** Die Vorgabe wird als
Vorgabe gelesen und nicht als Behauptung, die zu prüfen wäre.

**DIE HERKUNFT DER FALSCHEN ZAHL GEHÖRT DAZU:** Sie stammte aus einem früheren Bericht, der
"fünf Dateien" schrieb und **VIER Namen aufzählte** — der Widerspruch stand offen im selben
Satz. **Die Regel "Liste schlägt Zahl" hätte ihn gefangen**; sie ist beim Schreiben des
Prompts nicht angewandt worden.

**DIE GEGENFORM, DIE BILLIGER IST ALS DIE PRÜFUNG: ZAHLEN GEHÖREN NICHT IN EINE WÖRTLICHE
BODY-VORGABE** — entweder ohne Zahl formulieren lassen, oder ausdrücklich dazuschreiben,
dass die Zahl gegen die Messung DIESER Runde zu prüfen ist.

**ABGRENZUNG ZU "Liste schlägt Zahl"** (docs/immer-beachten.md, Review-Kalibrierung): Jene
betrifft das **LESEN** eines Berichts — zwei Angaben stehen nebeneinander, die Liste gilt.
Diese betrifft das **SCHREIBEN** einer Vorgabe: die falsche Zahl wandert in ein Artefakt,
**das danach unveränderlich ist**.

**NICHT ENTSCHIEDEN:** ob eigene Regel oder Absatz. **KEINE EMPFEHLUNG.**
GEMELDET 2026-09-10, NICHT GEBAUT.

**PROVENIENZ:** GEMESSEN am eigenen Lauf (CC, 2026-09-10); dass die Bauform die Ursache
ist, ist eine **ABLEITUNG**.

### (5) EINE SCHEIBE ZU TEILEN MACHT JEDEN ZEIGER AUF SIE HALB FALSCH — UND ER BLEIBT AUFFINDBAR, ALSO FÄLLT ES NICHT AUF

**DER BELEG — GEMESSEN am Dateitext (CC, 2026-09-10):** **SIEBZEHN** Stellen dieser Datei
nannten "11.3d", **KEINE** nannte "11.3e"; **alle waren geschrieben worden, als "11.3d" die
ganze Pinterest-Runde meinte.** Nach der Teilung landet der Leser in einem Abschnitt, der
die gesuchte Hälfte **ausdrücklich AUSSCHLIESST**.

**WARUM ES NICHT AUFFÄLLT, und das ist der ganze Punkt: DER ZEIGER IST NICHT TOT.** Er
löst sich auf, er trifft, und was er trifft, sieht aus wie ein gültiger Abschnitt. **Es
gibt keinen Moment, in dem jemand suchen muss** — und nur das Suchen brächte den Fehler
ans Licht.

**ABGRENZUNG ZU VORRAT (28):** Dort kippt ein Zeiger von **TOT auf FALSCH**, weil eine
Nummer neu vergeben wird. Hier bleibt er **GÜLTIG und wird HALB falsch**, weil sein ZIEL
sich teilt. **Verwandte Achse, anderer Mechanismus** — jener entsteht durch Nachvergabe,
dieser durch Teilung.

**DIE GEGENFORM, die hier gewählt wurde:** ein **AUFLÖSUNGS-SATZ AM LANDEPLATZ** plus
Nachziehen **allein dort, wo der Zeiger eine HANDLUNG bindet**. Das Kriterium hat die
siebzehn in **elf handlungsbindende** und **sechs beschreibende** geteilt.
**WARUM NICHT ALLE SIEBZEHN:** Ein beschreibender Zeiger ist als Aussage über seinen
Zeitpunkt richtig; ihn nachzuziehen machte aus einem Zeitdokument eine Behauptung über
heute. **WARUM NICHT NUR DER SATZ:** Ein Trigger, eine Bedingung und eine Aufgabenliste
werden AUSGEFÜHRT, nicht gelesen — sie erreicht kein Satz an einem anderen Ort.

**NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz. **KEINE
EMPFEHLUNG.**
GEMELDET 2026-09-10, NICHT GEBAUT.

**PROVENIENZ:** Die Zählung und die Fundstellen sind GEMESSEN am Dateitext (CC,
2026-09-10). Die Einteilung in elf und sechs ist eine **ABLEITUNG** aus dem Kriterium, an
jeder Stelle einzeln vollzogen. Dass ein auffindbarer Zeiger seltener geprüft wird als ein
toter, ist eine **ABLEITUNG**, keine Messung.

### (6) EIN ZEIGER AUS PRODUKTIV- ODER TESTCODE IN DIE STANDDATEI STIRBT AM PHASENENDE, UND ZWAR UNABHÄNGIG VOM GEGENSTAND, AUF DEN ER ZEIGT

**DER BELEG — GEMESSEN am Repo (CC, 2026-09-10):** Der Kommentar des Laufs **T17a2** in
`src/lib/capi/pinterest-forward.test.ts` zeigte auf **Vorrat (25)** dieser Datei. Zwei
Runden später ist der Eintrag gestrichen — **und die Standdatei wird am Phasenende
archiviert, der Zeiger stürbe also auch ohne die Streichung.** Die Streichung hat den
Befund nur früher sichtbar gemacht; sie ist nicht seine Ursache.

**DIE HERKUNFT GEHÖRT DAZU, sonst liest sich der Kandidat als Ermahnung zur Sorgfalt:**
Der Zeiger stand **nicht in der Vorgabe des Bau-Prompts**; er ist beim Schreiben des
Kommentars hinzugekommen. **Das ist dieselbe Figur wie Hebungs-Kandidat (4)** — dort
wandert eine ungeprüfte Zahl aus einem Prompt in einen unveränderlichen Commit-Body, hier
ein selbst erzeugter Zeiger in einen Kommentar. **Beide entstehen beim SCHREIBEN und
werden nicht geprüft, weil sie niemandem als Behauptung erscheinen.**

**ABGRENZUNG ZU VORRAT (28):** Dort zeigt die **DOKU** auf eine gelöschte Standdatei — vier
Dateien nennen "docs/aktiver-stand.md, VERMERK <n>" und meinen die Standdatei der Phase
11.2. Hier zeigt der **CODE** darauf. **Gegenrichtung, gleiche Ursache** — eine Ablage mit
Halbwertszeit wird zitiert, als hätte sie keine.
**DER UNTERSCHIED, DER DAZUGEHÖRT:** Ein Doku-Zeiger lässt sich in derselben Runde
nachziehen, in der jemand die Doku ohnehin öffnet. Ein Zeiger aus `src/` verlangt einen
**Code-Commit** — und der fällt unter einen anderen Scope, andere Gates und eine andere
Freigabe. **Er ist damit teurer zu heilen als der, gegen den (28) geschrieben ist.**

**DIE GEGENFORM, die hier gewählt wurde:** Ein Kommentar am **ORT DER HANDLUNG** sagt die
Sache selbst. Der Kommentar an T17a2 beschreibt die Verwechslung jetzt vollständig — ein
Schalter, der auf ANWESENHEIT statt auf den WERT prüft, wird durch `"false"` eingeschaltet,
und der Fehlzustand ist still. **Ein Verweis auf eine Ablage, die eine Halbwertszeit hat,
ersetzt das nicht.** Der historische Fall (`PINTEREST_TEST_MODE` war so gebaut) darf
danebenstehen, weil er ohne jedes Dokument verständlich ist.

**NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz an einer
bestehenden · und ob Zeiger aus `src/` in die Standdatei künftig **ganz unterbleiben**
sollen. **KEINE EMPFEHLUNG.**
GEMELDET 2026-09-10, NICHT GEBAUT.

**PROVENIENZ:** Die Fundstelle, ihr Wortlaut und ihre Auflösung sind GEMESSEN am Repo (CC,
2026-09-10), mit Positiv- und Negativkontrolle auf der Suchachse. Dass der Zeiger **nicht**
in der Prompt-Vorgabe stand, ist am Prompt jener Runde ABLESBAR und keine Messung am Repo.
Dass **jeder** solche Zeiger am Phasenende stirbt, ist eine **ABLEITUNG** aus dem
Archivierungs-Verfahren (CLAUDE.md, "## Aktiver Stand — Verfahren ab Phase 10"), **keine
Messung** — es ist kein Phasenende beobachtet worden, bei dem ein Code-Zeiger betroffen
gewesen wäre.

### (7) DIE COMMIT-LÜCKE EINES VERMERKS ENTSTEHT STRUKTURELL UND FÄLLT ERST DER NÄCHSTEN RUNDE AUF

**DER BELEG — GEMESSEN am Dateitext (CC, 2026-09-10):** **VIER von FÜNF** Vermerken dieser
Datei tragen denselben Nachtrag, wörtlich "hier stand die LÜCKE" — VERMERK 1, 2, 3 und 5.
**KEINER von ihnen hat seine Lücke in der Runde geschlossen, die den Vermerk geschrieben
hat.**

**DIE URSACHE IST DIE REIHENFOLGE VON SCHREIBEN UND COMMITTEN, NICHT DIE NACHLÄSSIGKEIT:**
Der Hash existiert im Moment des Schreibens **nicht**. Die Lücke ist also **die Bauform**,
und sie lässt sich in derselben Runde gar nicht vermeiden — nur in der nächsten schliessen.
**GENAU DAS MACHT SIE STILL:** Sie sieht in jeder Runde aus wie der regelkonforme Zustand,
den die Lücken-Regel ausdrücklich erlaubt.

**WAS SIE DIESMAL GEFANGEN HAT, UND ES IST KEIN MECHANISMUS:** eine **STOPP-BEDINGUNG IM
PROMPT**, die ausdrücklich danach fragte ("bereits eine offene Lücke da: STOPP"). **DAS IST
EIN ZUFALL DER VORGABE.** Die Fortschreibungsregel VERLANGT den Nachtrag — VERMERK 1 sagt
sogar, er habe VOR dem Anlegen des nächsten Vermerks zu geschehen —, aber **nichts
ERZWINGT ihn**: kein Test, kein Lint, kein Build liest diese Datei.

**WARUM DAS MEHR IST ALS EINE FORMALIE:** Die Lücken-Regel trägt eine DIAGNOSE — "steht
eine zweite da, ist entweder ein Commit nicht nachgetragen worden oder ein Vermerk
beschreibt etwas, das nie eingecheckt wurde". **Diese Diagnose funktioniert nur, solange es
höchstens EINE Lücke gibt.** Bei zwei sagt sie nicht mehr, welche die offene ist — und die
zweite entsteht **automatisch** beim nächsten Vermerk, wenn niemand die erste geschlossen
hat.

**DIE SCHÄRFUNG, UND SIE IST DER EIGENTLICHE INHALT DIESES KANDIDATEN: DAMIT SETZT DIE
REGEL SICH SELBST AUSSER KRAFT, STATT BLOSS UNGENAU ZU WERDEN.** Eine ungenaue Regel liefert
ein schlechteres Urteil; diese liefert **gar keines mehr** — ihre Diagnose fragt nach der
EINEN offenen Lücke, und bei zwei gibt es die Frage nicht mehr, auf die sie antwortet.
**DER AUSFALL IST DABEI NICHT DIE FOLGE EINES FEHLERS, SONDERN DES NORMALEN GEBRAUCHS:**
Die zweite Lücke entsteht **ohne Zutun** beim nächsten Vermerk. Die Regel hält also genau
so lange, wie jemand sie von Hand am Leben erhält — und niemand ist dafür zuständig.
**DAS IST EINE ABLEITUNG AUS DEM WORTLAUT DER REGEL UND DER BAUFORM DES NACHTRAGS, KEINE
MESSUNG:** Der Zustand "zwei offene Lücken" ist in dieser Datei **nie eingetreten** — er
ist viermal knapp vermieden worden, dreimal davon, weil eine spätere Runde ihn beiläufig
bemerkte.

**ABGRENZUNG ZU HEBUNGS-KANDIDAT (6):** Dort stirbt ein Zeiger AUS dem Code IN diese Datei,
weil die Ablage eine Halbwertszeit hat. Hier fehlt eine Angabe INNERHALB der Datei, weil sie
zum Schreibzeitpunkt noch nicht existiert. **Verwandte Figur — eine Angabe, die im falschen
Moment verlangt wird —, anderer Gegenstand.**

**NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz an den
Fortschreibungsregeln · und ob eine AUFLAGE folgt (etwa: jede Runde prüft zuerst die
Lücken, oder der Vermerk-Commit trägt den Nachtrag im selben Zug per `--amend`).
**KEINE EMPFEHLUNG.**
GEMELDET 2026-09-10, NICHT GEBAUT.

**PROVENIENZ:** Die vier Nachträge und ihre Fundstellen sind **GEMESSEN am Dateitext (CC,
2026-09-10)**; die Zuordnung des Commits `619e392` zu VERMERK 5 ist **GEMESSEN am Repo (CC,
2026-09-10, zwei Achsen)**. Dass die Ursache **strukturell** ist, ist eine **ABLEITUNG** aus
der Reihenfolge von Schreiben und Committen, keine Messung. Dass kein Gate diese Datei
liest, ist ein **NICHT-TREFFER mit benannter Achse** — die vier Gates dieses Projekts.

### (8) EINE AUSSAGE KANN IN EINEM TEIL DER SEITE STEHEN, DEN DIE GELESENE FASSUNG NICHT TRÄGT — UND DER UMFANGS-BERICHT FÜHRT DIE SEITE TROTZDEM ALS GELESEN

**DER BELEG — GEMESSEN an den gespeicherten Kopien der Google-Lesung (CC, 2026-09-11):** Der
tragende Allowlist-Satz der Übersichtsseite `/data-manager/api/devguides/events` — "Sending
conversion events via the API as an additional data source for Google Ads tag conversions is
an allowlist-only feature that can improve ad interaction signals and performance." — steht im
Server-HTML im Element `devsite-key-takeaways-panel`. **DIE MARKDOWN-FASSUNG DERSELBEN SEITE,
DIE DER LAUF ALS LESETEXT BENUTZT HAT, TRÄGT IHN NICHT** (null Treffer auf "allowlist-only").
Der Umfangs-Bericht führte die Seite als gelesen; gefunden wurde der Satz erst beim Abgleich mit
dem Bestand (docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)", Teil
(aq), der ihn am 2026-08-25 als "Seitenzusammenfassung" zitiert). Ohne diesen Abgleich hätte
der Lauf eine Seite als vollständig gelesen geführt, deren tragende Aussage er nie gesehen hat.

**EINE RICHTIGSTELLUNG AM EIGENEN BERICHT GEHÖRT DAZU, sonst wandert eine falsche Ortsangabe
in die Hebung:** Der Crawl-Bericht vom 2026-09-11 nannte das Feld "ausserhalb des
Artikelrumpfs". **Am gespeicherten Server-HTML liegt es INNERHALB von
`div.devsite-article-body`.** Was den Satz nicht trägt, ist die TEXTFASSUNG der Seite, nicht
der Rumpf. Wie der Browser das Feld anordnet und ob eine `textContent`-Lesung des gerenderten
Artikels ihn erfasst hätte, ist an keiner gespeicherten Kopie erhoben.

**DER KANDIDAT NENNT SEINE REIHE:** Er ist das DRITTE Mitglied derselben Achse — ein Werkzeug
oder ein Ausschnitt erzeugt eine Abwesenheit, die der Gegenstand nicht hergibt:
· zuerst `innerText` gegen `textContent` — docs/immer-beachten.md, "EINE ABWESENHEIT KANN VOM
  WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND";
· dann der nicht vorausgewählte Reiter — der Zusatz vom 2026-08-25 an docs/immer-beachten.md,
  "DIE LISTE 'GESEHEN, NICHT GEÖFFNET' IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT";
· jetzt eine FASSUNG der Seite, die einen ihrer Teile nicht mitführt.
**WAS DEN DRITTEN FALL VON DEN ZWEI ERSTEN TRENNT:** Dort war das Werkzeug an der richtigen
Quelle und hat einen Teil nicht erfasst; hier war die QUELLE eine andere Darstellung derselben
Seite, und ihr fehlt der Teil von vornherein. Kein Reiterklick und kein Werkzeugwechsel
innerhalb dieser Fassung hätte ihn zutage gefördert.

**NICHT ENTSCHIEDEN:** ob daraus eine eigene Regel wird oder ein Absatz an der bestehenden
Regel "EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND" — und ob eine
Auflage folgt (etwa: je Seite zusätzlich das Server-HTML nach Feldern ausserhalb der
Textfassung durchsuchen). **KEINE EMPFEHLUNG.** Entschieden wird am Phasenende.
GEMELDET 2026-09-11, NICHT GEBAUT.

**PROVENIENZ:** Die Lage des Satzes und sein Fehlen in der Markdown-Fassung sind GEMESSEN an
den gespeicherten Kopien (CC, 2026-09-11; `grep` auf "allowlist-only" über beide Fassungen,
dazu die Positionen von `devsite-key-takeaways-panel` und `div.devsite-article-body` im
Server-HTML). Dass der Lauf den Satz ohne den Abgleich nicht gesehen hätte, ist eine ABLEITUNG
aus dem Ablauf der Lesung, keine Messung.

### (9) DIE RICHTIGSTELLUNG "ZU GROB" AN DER ROADMAP-ZEILE 11.2 IST ÄLTER ALS DER GESTALTWECHSEL

Die Roadmap-Zeile 11.2 (docs/roadmap.md) trägt eine Richtigstellung vom 2026-08-20, die den
Satz "der Nachfolger ist für den relevanten Fall allowlist-only …" als "ZU GROB" führt und dazu
"Beides trifft zu" sagt — also aus der Zeit VOR dem Gestaltwechsel vom 2026-08-24, der an I3(b)
in docs/ziel-fragenkatalog.md und an Teil (g) des Google-Abschnitts von docs/ziel-befunde.md
zwei gleichartige Angaben überholt hat; ob sie davon berührt ist, ist am 2026-09-11 NICHT
geklärt und docs/roadmap.md nicht angefasst worden — KEINE EMPFEHLUNG.

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

### VERMERK 4 — Scheibe 11.3c, eingespielt und wirksam belegt

**CODE-COMMIT: `1fb9b90`** (`feat(db): Migration 0029 — Paar-CHECK wird ziel-abhaengig
ersetzt`, 1 Datei, 224 Einfügungen). GEMESSEN am Repo (CC, 2026-09-10): **GENAU EIN**
Commit legt `supabase/migrations/0029_project_secrets_test_mode_je_ziel.sql` an.
**COMMIT DIESES VERMERKS: `277ccd0`** (`docs(claude): Vermerk 4 — Scheibe 11.3c
eingespielt und wirksam belegt`).
**NACHGETRAGEN AM 2026-09-10** — hier stand die LÜCKE. **DAMIT KENNT JEDER VERMERK DIESER
DATEI SEINEN COMMIT, und es gibt KEINE offene Lücke mehr.**

**MIGRATION:** `0029_project_secrets_test_mode_je_ziel.sql`, eingespielt am **2026-09-10**.
**DIE UHRZEIT IST NICHT ERHOBEN** und wird nicht erfunden. Bei 0028 steht sie (13:40:36
UTC), weil sie aus `schema_migrations` abgelesen wurde; wer sie für 0029 braucht, liest
`applied_at` nach.

**ERHEBUNG VOR DEM LAUF — GEMESSEN LIVE, 2026-09-10, Stefan (SQL-Editor).** FÜNF
Zielwerte, **18 Bestandszeilen, alle mit BEIDEN Testspalten leer**:
`google` 9 · `linkedin` 2 · `meta` 5 · `pinterest` 1 · `tiktok` 1.
`ohne_projekt` **0 bei JEDEM Ziel** · `gemischt_darf_es_nicht_geben` **0** ·
`verletzt_neu_code` **0** · `verletzt_neu_frist` **0**.
**KEINE VERLETZENDE BESTANDSZEILE.** Der Pflicht-Stopp ist gefahren und nicht unterstellt
— `add constraint` validiert den Bestand, und eine verletzende Zeile hätte die Migration
mitten im Lauf abbrechen lassen.

**DER NEBENERTRAG GEHÖRT DAZU, ER IST EINE INSTRUMENTEN-AUSSAGE UND KEIN BEIFANG:**
`ohne_projekt` = 0 bei jedem Ziel **schliesst aus, dass ein Fall der Wirkungs-Probe am
UNIQUE `(project_id, target)` statt am gemeinten CHECK scheitert** — die Probezeilen
tragen `project_id = null`, und `NULLS NOT DISTINCT` liesse nur EINE projektlose Zeile je
Ziel zu. **Die Fehlerquelle war VORAB benannt und ist GEMESSEN entfallen**, nicht
weggehofft. Ebenso ist `gemischt_darf_es_nicht_geben` = 0 die **Positivkontrolle der
Erhebung**: ein Wert darüber hiesse, dass der alte CHECK nicht wirkt wie gemessen — ein
grösserer Befund als alles, was diese Scheibe baut.

**KATALOG-PRÜFUNG — GEMESSEN LIVE, 2026-09-10, Stefan:**
- **(1)** `project_secrets_test_mode_paar` — **NULL Zeilen.** Der alte CHECK ist weg.
- **(2)** `project_secrets_test_mode_je_ziel` — **GENAU EINE Zeile**, mit **allen VIER
  Zweigen** in der Definition und **ohne `NOT VALID`**. Die Zeilenzahl ist mitgemessen und
  kein Beifang: ZWEI wären der Doppel-Constraint-Fall. **AUS DER ABWESENHEIT VON
  `NOT VALID` FOLGT, DASS DER BESTAND BEIM `add constraint` VALIDIERT WORDEN IST** — ein
  `NOT VALID` stünde in der Definition und prüfte nur künftige Zeilen.
- **(3)** Policies auf `project_secrets` — **NULL.** Die Gegenkontrolle zur Migration:
  sie legt keine an, und eine, die es doch täte, würde an keinem Gate rot.

**DER WORTLAUT DER ABGELESENEN DEFINITION, NACHGETRAGEN AM 2026-09-10** — GEMESSEN LIVE,
2026-09-10, Stefan (SQL-Editor, `pg_get_constraintdef`); von der Chat-Instanz in den
Prompt gereicht, **NICHT am Repo erhoben und NICHT aus der Migrationsdatei
zurückgerechnet**. Zeile für Zeile wie abgelesen, nicht umformatiert:

```
CHECK (
CASE target
    WHEN 'meta'::text THEN ((test_event_code IS NULL) = (test_mode_expires_at IS NULL))
    WHEN 'tiktok'::text THEN ((test_event_code IS NULL) = (test_mode_expires_at IS NULL))
    WHEN 'pinterest'::text THEN (test_event_code IS NULL)
    ELSE ((test_event_code IS NULL) AND (test_mode_expires_at IS NULL))
END)
```

**KEIN `NOT VALID` IM TEXT — und das ist die tragende Aussage dieser Ablesung, nicht ein
Nebenbefund:** Der Bestand ist beim `add constraint` VALIDIERT worden. Ein `NOT VALID`
stünde in der Definition und prüfte nur künftige Zeilen; die 18 Bestandszeilen wären dann
ungeprüft durchgelaufen.

**WARUM DER WORTLAUT UND NICHT DIE ANWESENHEIT:** Postgres normalisiert die Schreibung
(Klammerung, `::text`-Kasten). Eine aus der Migrationsdatei zurückgerechnete Definition
wäre eine ABLEITUNG im Gewand einer Messung und sähe aus wie abgelesen — sie hätte in der
vorigen Runde, als die Ausgabe nicht vorlag, hier gestanden, ohne dass jemand es hätte
sehen können. **Der Text oben ist der abgelesene, und die vier Zweige sind an ihm
nachzählbar statt behauptet.**

**WIRKUNGS-PROBE — GEMESSEN LIVE, 2026-09-10, Stefan.** Vollständige Wahrheitstabelle,
**18 Fälle**: `zeilen` **18**, `abweichungen` **0**, überlebende Probezeilen **0**,
`to_regclass` auf die temporäre Tabelle **NULL**. Ein Scheitern zählte **ausschliesslich**
bei SQLSTATE `23514` UND Constraint-Name `project_secrets_test_mode_je_ziel`; jeder andere
Fehlschlag wäre als ABWEICHUNG gezählt worden, auch wenn die Zeile abgewiesen wurde.
**BEIDE ZAHLEN GEHÖREN ZUSAMMEN:** "0 Abweichungen" ist trivial wahr, wenn nichts gelaufen
ist — erst die 18 Zeilen daneben machen daraus eine Aussage.

**WAS DIE PROBE ENTSCHIEDEN HAT UND WAS NICHT — die drei Klassen getrennt:**
- **FALL 10** (`pinterest`, Frist ohne Code, GELINGT) **ist der EINZIGE der 18, dessen
  Ergebnis den ALTEN Zustand AUSSCHLIESST.** Unter dem alten CHECK war dieser Zustand
  unmöglich. **Er allein trägt den Nachweis, dass die neue Bedingung in Kraft ist.**
- **DIE FÄLLE 12, 16 UND 18** trennen in die **STRENGERE** Richtung: sie zeigen ein
  Scheitern, das der alte CHECK ERLAUBT hätte. **Sie tragen nur zusammen mit dem
  Constraint-Namen im Urteil** — ohne ihn wäre ein Scheitern am UNIQUE, am
  `secret_genau_eines` oder am `target_valid` nicht davon zu unterscheiden.
- **DIE ÜBRIGEN VIERZEHN sind mit BEIDEN Fassungen verträglich.** Die Fälle 1 bis 8 sind
  **Regressionsnachweise für `meta` und `tiktok`** — die Scheibe sagt zu, dass sich dort
  nichts ändert, und genau das prüfen sie.

**ZWEI GRENZEN, HIER WIRD NICHT GEKÜRZT:**
- **DER `else`-ZWEIG IST AN `google` UND `linkedin` GEMESSEN, NICHT AN EINEM UNBEKANNTEN
  ZIELWERT.** Die Zusage "ein sechstes Ziel läuft fail-closed an" folgt aus der Semantik
  von `case`/`else` und ist **NICHT GEMESSEN** — sie ist heute auch **nicht messbar**,
  weil eine Zeile mit unbekanntem Ziel vorher an `project_secrets_target_valid` scheitert.
  Wer sie messen will, braucht zuerst ein sechstes Ziel im Zielwert-CHECK.
- **DIE PROBE MISST DEN CHECK, NICHT DEN SCHREIBPFAD.** Dass heute kein Code einen
  Testzustand an `pinterest` ablegen kann, ist eine Aussage über `TARGETS_WITH_TEST_MODE`
  und gehört zu 11.3d, nicht hierher. **Der CHECK erlaubt den Zustand jetzt; erzeugen kann
  ihn noch niemand.**

**GATES (aus der Bau-Runde, GEMESSEN am eigenen Lauf, CC, 2026-09-10):** `tsc --noEmit`
grün · `eslint` 0 Fehler (die eine Warnung steht in `src/lib/tracking/consent.test.ts`,
ausserhalb des Diffs und vorbestehend) · `vitest` **76 Dateien / 1599 Tests grün, vorher
identisch 76 / 1599** — es ist kein Test hinzugekommen · `next build` grün.
**SIE BEWEISEN ÜBER DEN INHALT DER MIGRATION NICHTS.** Keines der vier Werkzeuge liest
SQL; sie belegen allein, dass die neue Datei nichts kaputtmacht. Der Nachweis der Wirkung
ist die Probe oben.

### VERMERK 5 — Scheibe 11.3d, gebaut und gepusht

**CODE-COMMIT: `3d42501`** (`feat(tracking): Testmodus erkennt Ziele ohne Code — 11.3d`,
**acht Dateien**, 545 Einfügungen, 39 Löschungen). **GEPUSHT** — GEMESSEN am Repo (CC,
2026-09-10): `origin/main` steht auf demselben Hash.
**DASS ES GENAU EIN BAU-COMMIT IST, IST GEMESSEN und nicht angenommen** (CC, 2026-09-10,
zwei Achsen): `git log` über die drei berührten Produktivdateien nennt als jüngsten Commit
nur diesen, und eine Suche über die Scheibennummer findet drei Commits, davon **einen**
`feat` — die zwei anderen sind die `docs(claude)`-Runden des Zuschnitts und des
Zeiger-Nachzugs.
**COMMIT DIESES VERMERKS: `619e392`** (`docs(claude): Vermerk zur Scheibe 11.3d — Ziele
ohne Code sind lesbar`).
**NACHGETRAGEN AM 2026-09-10, VOR DEM ANLEGEN VON VERMERK 6** — hier stand die LÜCKE, und
sie war beim Schreiben jenes Commits nicht geschlossen worden. **DER NACHTRAG IST KEINE
FORMSACHE UND HAT DIESELBE BEGRÜNDUNG WIE BEI VERMERK 1:** Die Lücken-Regel erlaubt GENAU
EINE offene Lücke, und die gehört dem JÜNGSTEN Vermerk. Wäre VERMERK 6 vor diesem Nachtrag
entstanden, stünden zwei da — und dann sagt die Regel nicht mehr, welche der beiden der
noch nicht committete Vermerk ist.
**DIE ZUORDNUNG IST GEMESSEN UND NICHT AUS DER BETREFFZEILE ERSCHLOSSEN** (CC, 2026-09-10,
zwei Achsen): `git show 619e392 -- docs/aktiver-stand.md` legt die Überschrift
"VERMERK 5 — Scheibe 11.3d, gebaut und gepusht" AN (eine `+`-Zeile, keine `-`-Zeile), und
KEINER der vier späteren docs-Commits an dieser Datei (`419c32a`, `7f7b7a6`, `c79d225`,
`1aac637`) hat den Vermerk angefasst. Jener Commit hat zusätzlich
`src/lib/capi/pinterest-forward.test.ts` berührt — das ist der dort beschriebene Nachzug am
Kommentar von T17a2 und kein zweiter Bau.
**VIER VON FÜNF VERMERKEN DIESER DATEI TRAGEN DENSELBEN NACHTRAG**, und das ist inzwischen
ein Befund über das VERFAHREN und nicht über den einzelnen Fall: Die Lücke wird beim
Schreiben des Vermerks geöffnet und beim Commit desselben Vermerks nicht geschlossen, weil
der Hash im Moment des Schreibens noch nicht existiert. **SIE FÄLLT ERST DER NÄCHSTEN RUNDE
AUF** — hier fiel sie einer Stopp-Bedingung auf, die genau danach fragt.

**ES GIBT KEINEN LIVE-NACHWEIS, UND DAS IST KEIN MANGEL** — s. die vierte Grenze unten.
Der Nachweis dieser Scheibe sind ihre Läufe und ihre fünf Mutationsproben.

**GATES (GEMESSEN am eigenen Lauf, CC, 2026-09-10, alle vier VOR dem Diff):**
`tsc --noEmit` grün · `eslint` **0 Fehler** (die eine Warnung steht in
`src/lib/tracking/consent.test.ts`, ausserhalb des Diffs und vorbestehend) ·
`vitest` **76 Dateien / 1608 Tests grün, vorher 76 / 1599** (+9) · `next build` grün.

**WAS GEBAUT IST — VIER SÄTZE:**
- Das **Prädikat urteilt über die FRIST**; der Rückgabetyp trennt Urteil und Code
  (`{ aktiv: true; code?: string } | { aktiv: false }`).
- Welche Ziele einen Code VERLANGEN, sagt ein **erschöpfender `switch` über
  `TrackingTarget`** ohne `default`-Rückfall, mit `never` im Schlusszweig — beim sechsten
  Ziel bricht `tsc`.
- **Das Ziel kommt aus der ZEILE**, nicht aus einem zweiten Parameter.
- **`PINTEREST_TEST_MODE` ist aus dem Produktivcode entfernt**; der Query-Anhang kommt aus
  dem Parameter und lautet unverändert `"?test=true"`.

**DIE MESSUNG, DIE DIE No-op-ZUSAGE TRÄGT — GEMESSEN LIVE (Stefan, 2026-09-10, Vercel):**
`PINTEREST_TEST_MODE` ist in **KEINER der drei Umgebungen gesetzt** — Production, Preview
und Development **einzeln nachgesehen**. Die bisherige OWNER-ANGABE aus Entscheidung (13)
ist damit eine **MESSUNG**.
**WARUM DAS IM VERMERK STEHT UND NICHT IM BAU-BERICHT:** Wäre sie gesetzt gewesen, hätte
dieser Deploy dem Betrieb **still die Isolation genommen** — Pinterest-Ereignisse liefen ab
dem Deploy nicht mehr in die Sandbox, der Anbieter verbuchte echte Conversions, und nichts
wäre rot geworden. **Die Zusage "11.3d ist ein No-op" ruht auf dieser Ablesung**, nicht auf
einer Erinnerung.

**DIE FÜNF MUTATIONSPROBEN, je mit der VOR dem Lauf aktualisierten Vorhersage und dem
Ergebnis (GEMESSEN am eigenen Lauf, CC, 2026-09-10):**
- **M1** — das Prädikat urteilt wieder über den Code: **3 vorhergesagt, 3 gefallen.**
- **M2** — die Ziel-Auskunft behauptet für `meta` "verlangt keinen Code": **4 vorhergesagt,
  4 gefallen.**
  **DER BEFUND IST NICHT DIE ZAHL:** Der Wächter gegen den stillen Fehlerfall aus
  Entscheidung (14) **EXISTIERT, und er ist VIERFACH.** Eine `meta`-Zeile mit Frist ohne
  Code kann nicht unbemerkt als aktiv gelten. Die drei Zusatztreffer melden **DIESELBE
  Fehlerklasse** — **Deckung, keine Kaskade**, und das ist am Ergebnis geprüft und nicht
  unterstellt.
- **M3** — der Anhang wird unabhängig vom Parameter angehängt: **3 vorhergesagt, 3
  gefallen**, T17b grün — **genau eine Achse bewegt.**
- **M4** — der Riegel auf die Code-Achse umgebaut (`.some((t) => t.code)` statt
  `.length > 0`): **1 vorhergesagt, 1 gefallen.**
  **TM15 IST AN DIESER MUTATION EIN EINZELSTÜCK** — kein anderer Lauf im Repo fängt sie,
  weil die Einträge von TM1 und TM2 einen Code tragen. **GEMESSEN, nicht behauptet**; der
  Grund steht im Kommentar des Laufs, damit ihn niemand als Doppelung von TM1/TM2 streicht.
- **M5** — Anwesenheit statt Wert am Parameter: **1 vorhergesagt, 1 gefallen.**

**DREIMAL WAR DIE VORHERSAGE DES PROMPTS ZU ENG** und ist vor dem Lauf gegen den aktuellen
Bestand korrigiert worden — bei **M2, M3 und M5**. **Ohne diese Auflage wären drei
Überschüsse als Kaskade oder als Fehler gelesen worden.**

**BEIDE RÜCKNAHME-RUNDEN BELEGT:** Suche nach den Mutations-Markern über `src/` ohne
Treffer, `git diff --numstat` ohne leeren Diff, CR und NUL je 0 auf allen berührten
Dateien.

**VIER GRENZEN, HIER WIRD NICHT GEKÜRZT:**
- **DER PARAMETER IST GEBAUT, ABER NICHTS SPEIST IHN.** Der `pinterest`-Eintrag in
  `FORWARDER_BY_TARGET` (`src/lib/capi/ingest.ts`) reicht den siebten Wert nicht weiter.
  **Wer nach diesem Deploy eine Pinterest-Markierung beim Anbieter sucht, misst etwas, das
  hier nicht gebaut ist.** Die Verdrahtung ist 11.3e.
- **DER NAME `activeTestCodeFromRow` LÜGT SEIT DIESER SCHEIBE.** Sie liefert ein URTEIL,
  keinen Code. **Umbenennen ginge nicht ohne TM9** — den Umzugs-Wächter in
  `capi/token.test.ts`, der den Aufruf-String festnagelt —, und an einem Wächter
  nachzuziehen ist die Bewegung in die falsche Richtung. Der Name bleibt; die Umbenennung
  wäre eine **EIGENE Entscheidung**.
- **`requiresTestCode` IST MODUL-PRIVAT und muss in 11.3e wandern:** Dort braucht die
  Vorprüfung im Schreibpfad dieselbe Auskunft, sonst weist `startTestMode` `pinterest` mit
  `empty_code` ab **und der Schalter ist unbedienbar**.
- **KEIN LIVE-NACHWEIS.** Gegen den Anbieter ist in dieser Scheibe **nichts gemessen**
  worden. Der Nachweis sind die Läufe und die fünf Mutationen.

**WAS DIE DOKU-RUNDE ZUSÄTZLICH VOLLZOGEN HAT** (Commit dieses Vermerks): Vorrat (25) und
(26) sind mit Beleg gestrichen, Entscheidung (8) ist in ihrem Begründungshalbsatz
richtiggestellt, der Zuschnitt der Scheibe ist verdichtet, und der Kommentar an **T17a2**
ist **vom Zeiger auf Vorrat (25) gelöst** — er sagt die Verwechslung jetzt selbst. Der Fall
steht als **Hebungs-Kandidat (6)**.

### VERMERK 6 — Scheibe 11.3e, gebaut und live bewiesen

**CODE-COMMIT: `9422920`** (`feat(tracking): Pinterest im Testmodus scharf — 11.3e`, **acht
Dateien**, 704 Einfügungen, 54 Löschungen). **GEPUSHT** — GEMESSEN am Repo (CC,
2026-09-10): `origin/main` steht auf demselben Hash.
**DASS ES GENAU EIN BAU-COMMIT IST, IST GEMESSEN und nicht angenommen** (CC, 2026-09-10,
zwei Achsen): `git log` über die vier berührten Produktivdateien nennt als jüngsten Commit
nur diesen, und eine Suche über die Scheibennummer findet SIEBEN Commits, davon **einen**,
dessen BETREFF die Scheibe 11.3e trägt. **DIE ZWEITE ACHSE ALLEIN ENTSCHEIDET NICHT**, und
das gehört dazu: Sie liefert auch `3d42501` (Scheibe 11.3d), weil dessen Rumpf die Nummer
11.3e nennt. Erst der Betreff trennt die beiden.
**COMMIT DIESES VERMERKS: `dedb7d6`** (`docs(claude): Vermerk zur Scheibe 11.3e —
Pinterest ist live bewiesen`).
**NACHGETRAGEN AM 2026-09-10, IN DER RUNDE UNMITTELBAR DANACH** — hier stand die LÜCKE.
**DAMIT KENNT JEDER VERMERK DIESER DATEI SEINEN COMMIT, und es gibt KEINE offene Lücke
mehr.** Das ist regelkonform: Die Lücken-Regel sagt, es dürfe immer nur EINE geben — nicht,
dass eine da sein müsse.
**DER NACHTRAG IST DIESMAL NICHT ERST DER ÜBERNÄCHSTEN RUNDE AUFGEFALLEN**, und genau das
ist der Unterschied zu VERMERK 1, 2, 3 und 5: Er ist als offener Posten aus der
Vermerk-Runde heraus GEMELDET und in der nächsten geschlossen worden. **DASS ES DAFÜR EINE
MELDUNG BRAUCHTE UND KEINEN MECHANISMUS, STEHT ALS HEBUNGS-KANDIDAT (7).**

**GATES (GEMESSEN am eigenen Lauf, CC, 2026-09-10, alle vier VOR dem Diff):**
`tsc --noEmit` grün · `eslint` **0 Fehler** (die eine Warnung steht in
`src/lib/tracking/consent.test.ts`, ausserhalb des Diffs und vorbestehend) ·
`vitest` **1617 grün**, vorher **1608** (**+9**) · `next build` grün.

#### DIE VIER PFLICHT-MUTATIONEN — ALLE EXAKT WIE DIE AKTUALISIERTE VORHERSAGE

**M1** (die Vorprüfung verlangt wieder für JEDES Ziel einen Code): **vier gefallen** ·
**M2** (die Verdrahtung reicht das Signal nicht weiter): **einer** ·
**M3** (sie reicht es für JEDES Ziel weiter): **einer** ·
**M4** (die Karte zeigt das Code-Feld auch für pinterest): **zwei**.

**ZWEIMAL WAR DIE VORHERSAGE DES PROMPTS ZU ENG — M1 UND M4 —, und beide Überschüsse sind
AN DER FEHLERKLASSE ALS DECKUNG GEPRÜFT, NICHT UNTERSTELLT.** Bei M1 fällt der
Schreibweg-Lauf mit, weil `empty_code` VOR dem Schreibweg greift; bei M4 der Lauf über den
LAUFENDEN Zustand, weil der Feld-Wegfall in BEIDEN Zuständen gilt. **DIE STREUUNG WAR BEIDE
MALE DIESELBE RICHTUNG — zu eng —, wie dreimal in 11.3d.** Ohne die Auflage, die Vorhersage
vor dem Lauf gegen den aktuellen Bestand zu aktualisieren, wären beide als Kaskade oder als
Fehler gelesen worden.

**M2 UND M3 TRAGEN DEN EIGENTLICHEN BEFUND DIESER SCHEIBE:** Ohne die zwei neuen Läufe wird
bei **beiden** Mutationen **KEIN EINZIGER** Lauf rot — die bestehenden URL-Zusicherungen
rufen den Adapter DIREKT und gehen am Lambda in `FORWARDER_BY_TARGET` vorbei. **SIE SIND
DER EINZIGE WÄCHTER ÜBER DIE VERDRAHTUNG**, und den gab es vorher nicht.

#### DER LIVE-NACHWEIS — GEMESSEN LIVE, 2026-09-10, Stefan

**VIER KENNUNGEN, JE MIT IHRER ROLLE:**
- **PINTEREST-TESTLAUF:** `event_id` `2b259f79-d3f2-4e3c-b3ed-09594cd06758`, Eventtyp
  `lead`, in Pinterests Test-Ansicht **angekommen**, mit den **zwei ERWARTETEN Warnungen**
  (`external_id is missing`, `click_id is missing`). Vercel: **HTTP 204**.
- **REGRESSION:** `event_id` `a66e833a-060d-4cc2-8eb1-e58385912a4a`, nach dem Beenden;
  `events` trägt **ZWEI Zeilen** (`browser` und `server`), der Anbieter-Zähler steigt.
- **META-REGRESSION:** `event_id` `f4ce1824-74fe-4da8-8cdc-1e0bee4197ff`,
  Server-Zustellung mit **Deduplizierung** gegen das Browser-Ereignis. Feld vorhanden,
  Knopf ohne Eingabe gesperrt.
- **V4 — DER META-FORWARD WÄHREND DES PINTEREST-TESTLAUFS:** Vercel-Aufruf **18:46:24
  GMT+2** (= **16:46:24 UTC**) mit `POST` auf `graph.facebook.com/v21.0/1446…` **im selben
  Aufruf** wie die Pinterest-Warnung; Metas Übersicht für den 10.09. meldet "zuletzt
  erhalten" rund **18:47 Ortszeit**.

**DIE DREI ISOLATIONS-ACHSEN — UND IHRE UNABHÄNGIGKEIT IST DER PUNKT, NICHT DIE EINZELNE
ACHSE:**
1. **ANKUNFT BEIM ANBIETER.** Sie schliesst die Alternativursache "leer, weil abgelehnt"
   aus, **ohne dass der Log sie allein tragen müsste**.
2. **DER ZÄHLER BLIEB BEI 2.** Abgelesen **08:15 UTC** (Wert **2**) und **16:55 UTC**
   (Wert **3**, nach der Regression). **Über achteinhalb Stunden keine Bewegung**, obwohl
   in dieser Zeit ein test-markiertes Ereignis angekommen ist.
3. **NULL `events`-ZEILEN** zur Prüf-Kennung. **Positivkontrolle ist (1)** und zusätzlich
   der Meta-Forward aus V4.

**DIE OBERFLÄCHE, GEMESSEN:** Knopf **ohne Eingabe klickbar** · **kein Code-Feld** ·
Endzeitpunkt genannt · Banner **"Testmodus: Pinterest (bis 10.9.2026, 19:43:51)"**. **DIE
GESTALT-ENTSCHEIDUNG (A) UND DIE ENTSCHEIDUNG (10) TRAGEN DAMIT FÜR EIN ZIEL OHNE CODE** —
bis hierher waren beide nur an Zielen MIT Code belegt. Nach dem Beenden: Banner sofort weg,
Karte auf "aus".

**DER PREIS AUS ENTSCHEIDUNG (3) IST ZUM ERSTEN MAL LIVE EINGETRETEN UND GEMESSEN:** Während
`pinterest` im Testmodus lief, hat `meta` eine **ECHTE Conversion** verbucht — ohne
Testcode, weil `meta` selbst nicht im Testmodus stand. **Vorhergesagt, dokumentiert, jetzt
KEINE ABLEITUNG MEHR.**
**DER RIEGEL HAT NUR DIE `events`-ZEILE GENOMMEN, KEINEN FORWARD:** Derselbe Aufruf zeigt
den **vollständigen Fan-Out** — `pinterest`, `tiktok`, `linkedin` und `meta` nebeneinander.

#### FÜNF GRENZEN, HIER WIRD NICHT GEKÜRZT

- **V4 BELEGT DAS SENDEN UND DAS EMPFANGEN, NICHT DIE ZUORDNUNG ZU EINER KENNUNG.** Metas
  Übersicht zeigt **keine Ereigniskennung**; die Zuordnung zum Pinterest-Testlauf ruht auf
  einem **ZEITSTEMPEL-PAAR aus zwei Systemen** (Vercel 18:46:24, Meta "zuletzt erhalten"
  ~18:47) **plus** der Pinterest-Warnung im SELBEN Aufruf. Sie trennt an dieser Stelle auch
  **nicht zwischen Browser-Pixel und Server-Forward** — dass beide gingen, steht im Log
  UNSERES Servers.
- **DIE ZEITEN DES TESTMODUS-FENSTERS SIND ABGELEITET, NICHT ABGELESEN.** Die Karte nannte
  ein Ende in Ortszeit; der Start ist über die feste 60-Minuten-Frist ZURÜCKGERECHNET. **Die
  Zeitzone GMT+2 ist dabei GEMESSEN** (Vercel-Anzeige), nicht erschlossen.
- **DIE OPTIMIERUNGS-HÄLFTE DER SANDBOX-ZUSAGE BLEIBT UNGEMESSEN.** Belegt ist die
  BERICHTERSTATTUNG. Pinterests Doku nennt beides; **dieselbe Achse wie der offene Punkt zur
  Wirkung auf die Gebote** (CLAUDE.md, "## Offene Punkte").
- **DAS PROTOKOLL DES LAUFS WAR MIT "11.3d" ÜBERSCHRIEBEN.** Gemessen wurde **11.3e**;
  **11.3d war die Scheibe OHNE Live-Nachweis** (VERMERK 5, vierte Grenze). Richtiggestellt.
- **KEIN LAUF GEGEN EIN ZIEL OHNE TESTMODUS.** `google` und `linkedin` sind nicht
  Gegenstand dieser Scheibe.

#### ZWEI NEBENBEFUNDE AUS DEMSELBEN AUFRUF — FESTGEHALTEN, KEINE AUFGABE

Sie gehören **NICHT zu dieser Scheibe**, sind aber live aufgetreten und je einem BEKANNTEN
offenen Punkt zuzuordnen. **HIER ENTSTEHT KEIN NEUER POSTEN** und keine Aufgabe.
- **DAS ERNEUERUNGS-TOKEN FÜR GOOGLE HAT IM LAUFENDEN BETRIEB GETRAGEN:** `secret unusable
  / access_token_expired`, gefolgt von `[oauth/token-refresh] ok`. **DER ERSTE LIVE-BELEG,
  DASS DER REFRESH-PFAD DIE SIEBEN-TAGE-FRIST AUFFÄNGT** — bisher stand nur, dass neu
  verbunden werden muss. Zeiger auf den offenen Punkt "DIE SIEBEN-TAGE-FRIST UND DER
  STATUSWECHSEL AUF 'IN PRODUKTION'" (CLAUDE.md).
- **`Google forward skipped: no destination for event`** — der **UPLOAD_CLICKS-Vorbehalt**,
  erstmals live sichtbar. Zeiger auf docs/offene-punkte.md, Posten (6).

**PROVENIENZ DIESES VERMERKS, DREIFACH GETEILT:** Die vier Kennungen, die Ablesungen an
Pinterests Ansichten, der Zählerstand, die Vercel-Zeilen und die Oberflächen-Beobachtungen
sind **GEMESSEN LIVE, 2026-09-10, Stefan** — **CC hat davon nichts gemessen**. Bau-Commit,
Push-Zustand, Gates, Testzahlen und die vier Mutationsergebnisse sind **GEMESSEN am eigenen
Lauf bzw. am Repo (CC, 2026-09-10)**. Die Zuordnung von V4 zum Pinterest-Testlauf ist eine
**ABLEITUNG** aus dem Zeitstempel-Paar und dem gemeinsamen Aufruf, **keine Messung an einer
Ereigniskennung** — s. die erste Grenze.

### VERMERK 7 — Scheibe 11.3f, gebaut und live gesehen

**CODE-COMMIT: `8fcd4e0`** (`feat(ui): zwei Kundentexte fuer den Testmodus — 11.3f`, **drei
Dateien**, 327 Einfügungen, **6 Löschungen**). **GEPUSHT** — GEMESSEN am Repo (CC,
2026-09-10): `origin/main` steht auf demselben Hash.
**DASS ES GENAU EIN BAU-COMMIT IST, IST GEMESSEN** (CC, 2026-09-10, zwei Achsen): `git log`
über die zwei berührten Produktivdateien nennt als jüngsten Commit nur diesen, und eine
Suche über die Scheibennummer findet DREI Commits, davon **einen `feat`** — die zwei
anderen sind die `docs(claude)`-Runden des Zuschnitts und der Schärfung von (A).
**COMMIT DIESES VERMERKS: `ac0803b`** (`docs(claude): Vermerk zur Scheibe 11.3f — zwei
Kundentexte, live gesehen`).
**NACHGETRAGEN AM 2026-09-11** — hier stand die LÜCKE ("— offen. Er ist der jüngste; die
Lücken-Regel erlaubt genau eine, und dies ist sie."). **DAMIT KENNT JEDER VERMERK DIESER
DATEI SEINEN COMMIT, und es gibt KEINE offene Lücke mehr.** Das ist regelkonform: Die
Lücken-Regel sagt, es dürfe immer nur EINE geben — nicht, dass eine da sein müsse.
**DIE ZUORDNUNG IST GEMESSEN UND NICHT AUS DER BETREFFZEILE ERSCHLOSSEN** (CC, 2026-09-11,
zwei Achsen): `git log -S` auf die Überschrift "VERMERK 7 — Scheibe 11.3f, gebaut und live
gesehen" über diese Datei nennt GENAU EINEN Commit, `ac0803b`; `git show ac0803b` legt die
Überschrift an (eine `+`-Zeile, keine `-`-Zeile), und der einzige spätere Commit an dieser
Datei (`1771ec0`) berührt keine Zeile, die VERMERK 7 nennt. Der Commit liegt auf
`origin/main`.

**ES ÄNDERT SICH KEINE LOGIK, UND DAS IST AN DEN SECHS LÖSCHUNGEN ABLESBAR:** vier Zeilen
sind das entfallene JSX-Literal im Container, zwei die ersetzte Rückgabezeile. Alles andere
ist additiv.

**GATES (GEMESSEN am eigenen Lauf, CC, 2026-09-10, alle vier VOR dem Diff):**
`tsc --noEmit` grün · `eslint` **0 Fehler** (die eine Warnung steht in
`src/lib/tracking/consent.test.ts`, ausserhalb des Diffs und vorbestehend) ·
`vitest` **1625 grün**, vorher **1617** (**+8**) · `next build` grün.

#### DIE FÜNF MUTATIONEN — ALLE EXAKT WIE DIE AKTUALISIERTE VORHERSAGE

**M1** (die Angabe erscheint ziel-blind): **einer** · **M2** (`kind === "laeuft"` entfernt):
**einer** · **M3** (Banner fällt auf den einheitlichen Satz zurück): **vier** ·
**M4** (Reihenfolge aus den Objektschlüsseln): **einer** · **M5** (der Halbsatz wandert in
einen Sammelsatz): **einer**.

**M5 IST DER EINZIGE WÄCHTER ÜBER DIE AUFLAGE AUS ENTSCHEIDUNG 1**, und er hat TM32 rot
gemacht. **TM32 PRÜFT DIE POSITION DER HALBSÄTZE STATT IHRER BLOSSEN ANWESENHEIT** — ein
`toContain` wäre bei einem Sammelsatz am Ende GRÜN geblieben, weil beide Halbsätze dann
immer noch im Text stehen. Die drei Reihenfolge-Zusicherungen (`Name < Halbsatz <
nächster Name`) sind das, was den Sammelsatz überhaupt von der Reihung trennt.

**EINE MUTATIONSFORM IST VOR DEM LAUF VERWORFEN WORDEN, und der Grund gehört in den
Vermerk:** Die naheliegende Fassung von M1 — die Auskunfts-Bedingung **einfach streichen** —
hätte `{undefined}` gerendert; React zeigt dafür nichts, und **TM27 wäre GRÜN geblieben.
NICHT weil der Wächter schwach ist, sondern weil die Mutation den Fehler gar nicht
herstellt.** Gefahren ist stattdessen die faithful Form: der Hinweis wird für JEDES Ziel aus
`pinterest` gelesen. *(docs/immer-beachten.md: "wer eine Mutation ansagt, liest zuerst, was
ZWISCHEN der mutierten Funktion und dem Prüfling liegt".)*

**DIE RICHTUNG DER ABWEICHUNGEN — RICHTIGGESTELLT GEGEN DIE VORGABE DIESER RUNDE, WEIL DIE
MESSUNG ANDERS AUSFÄLLT.** Die Vorgabe nannte **M2 UND M3** als "zu weit". **GEMESSEN am
eigenen Lauf (CC, 2026-09-10) ist nur M2 zu weit, M3 war zu ENG:**
- **M2** — der Plan sagte "L2 **und L4** fallen" (zwei), gefallen ist **nur TM26** (einer).
  **ZU WEIT — und das ist tatsächlich das erste Mal in dieser Phase in diese Richtung.**
  Der Grund ist benennbar: Nach der Mutation bleibt die Auskunfts-Bedingung stehen, und
  `meta` trägt gar keinen Hinweis; TM28 kann deshalb nicht fallen.
- **M3** — der Plan sagte "L5, L6, L7" (drei), gefallen sind **vier** (TM29–TM32).
  **ZU ENG**, und damit die **SECHSTE** Abweichung dieser Richtung in der Phase (11.3d:
  M2, M3, M5 — 11.3e: M1, M4). **An der Fehlerklasse als DECKUNG geprüft:** TM32 fällt aus
  demselben Grund wie die drei anderen — der ziel-abhängige Halbsatz fehlt.
**WARUM DIE RICHTIGSTELLUNG ZÄHLT UND NICHT PEDANTERIE IST:** Die EINSEITIGE STREUUNG ist
die eigentliche Aussage der Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN
FALSCH SEIN" (docs/immer-beachten.md) — Zufall träfe mal nach oben, mal nach unten. Wer M3
als "zu weit" verbucht, macht aus **fünf zu eng und eins zu weit** ein **ausgeglichenes
Bild** und löscht damit genau den Befund. Ein Überschuss war zudem zu PRÜFEN (Deckung oder
Kaskade); bei einer zu weiten Vorhersage gibt es nichts zu prüfen — die Vorgabe widerspricht
sich an dieser Stelle selbst.

**KEIN BESTANDSLAUF IST GEBROCHEN**, und das ist keine Entwarnung, sondern die Bestätigung
eines Befunds: Der Banner-Satz war **von keinem Lauf gedeckt**. Über alle
`src/**/*.test.ts(x)` gesucht (Achse: "beim Anbieter", "kommen sie weiterhin an", "Solange
zählt", "Beenden in den Einstellungen", "Testmodus:") — **kein Treffer in einer Testdatei**;
und `CodeImporter.test.tsx` rendert den Banner in **keinem** Lauf, weil sein Leser-Mock
dauerhaft ein leeres `states`-Objekt liefert. **Seit dieser Scheibe ist der Text ohne
Container-Render prüfbar** (GEMESSEN am Repo, CC, 2026-09-10).

#### DER LIVE-BLICK — GEMESSEN LIVE, 2026-09-10, Stefan

**FÜNF PUNKTE, ALLE BESTÄTIGT:**
1. Der Hinweis steht an der Pinterest-Karte **an der richtigen Stelle und lesbar**.
2. Der Banner ist bei **EINEM** laufenden Ziel **einzeilig**.
3. Bei **ZWEI** laufenden Zielen stehen **beide Halbsätze je direkt beim Namen**, und der
   Banner bleibt **ein Absatz**.
4. An der **Meta-Karte** steht **keine** Reihenfolge-Angabe; Code-Feld und Sperre sind
   unverändert.
5. Nach dem Beenden ist der Banner **sofort weg**.

**EINE UNGEPLANTE GEGENPROBE AUS DEMSELBEN LAUF, UND SIE GEHÖRT HINEIN:** Die Meta-Karte
stand auf **"Testmodus abgelaufen"** — und der Banner nannte **NUR `pinterest`**. **DAS
BELEGT LIVE, DASS DIE BANNER-BEDINGUNG `kind === "laeuft"` LIEST UND NICHT BLOSS "HAT EINE
FRIST".** Ein abgelaufener Testmodus taucht nicht auf.
**WARUM DAS MEHR IST ALS EIN NEBENBEFUND:** Diese Achse war bisher **nur im Unit-Test**
gedeckt (der Lauf "KEIN Banner ohne laufendes Ziel — auch nicht bei abgelaufen"). Sie ist
**nicht geplant gewesen** und im Betrieb entstanden — die wertvollste Art von Gegenprobe,
weil niemand sie herbeigeführt hat.

**WAS DER BLICK AUSDRÜCKLICH NICHT IST: ein Nachweis über die Wirkung beim Anbieter.** Die
ist in VERMERK 6 belegt; **diese Scheibe fügt ihr nichts hinzu und misst sie nicht erneut.**

#### DIE DREI PROVENIENZEN — SIE WERDEN NICHT ANGEGLICHEN

- **`meta`** — "beim Anbieter zählen sie weiter". **GELESEN** (Anbieter-Doku, 2026-09-08).
- **`pinterest`** — "kommen an, gezählt werden sie nicht". **GEMESSEN LIVE** (2026-09-10).
- **`tiktok`** — "was der Anbieter mit ihnen tut, ist nicht geprüft". **GELESEN, EINMAL,
  UNGEMESSEN.**

**EINE KORREKTUR, DIE IN DEN VERMERK GEHÖRT UND NICHT IN EINE FUSSNOTE:** Die
Zusammenfassung des Live-Blicks führte **`meta` als "gemessen"**. **DAS IST FALSCH —
`meta` ist GELESEN.** **DER CODE HAT ES RICHTIG** (der Kommentarkopf von
`testModeAnbieterAuskunft` nennt für jedes der drei Ziele die Provenienz einzeln); falsch
war allein die Zusammenfassung.
**WARUM DAS FESTGEHALTEN WIRD:** Genau auf diesem Weg wird aus einer Lesung eine Messung,
die es nie gab — eine Zusammenfassung ist bequemer zu zitieren als der Kommentarkopf, und
sie trägt keine Provenienz an sich. **Die Meta-Aussage ruht unverändert auf einer
DOKU-LESUNG vom 2026-09-08 und auf keinem einzigen Aufruf.**

#### DREI GRENZEN, HIER WIRD NICHT GEKÜRZT

- **DIE GEWÄHLTE BAUFORM IST VON DER VERWORFENEN NICHT DURCH EINEN LAUF ZU TRENNEN.**
  "`reihenfolgeHinweis` vorhanden" und "`!requiresTestCode`" liefern für **alle fünf**
  heutigen Ziele **dasselbe**. **Kein Lauf kann die richtige von der falschen Bauform
  unterscheiden**; die Fehlerklasse entsteht erst beim sechsten Ziel. **Was schützt, ist
  `tsc` — und ein Kommentar ist kein Wächter.** Das ist die Figur "EINE VORBEDINGUNG, DIE
  AUCH DER ALTE ZUSTAND ERFÜLLT" (docs/immer-beachten.md), und sie steht als Absatz am
  `switch` selbst.
- **DER ANSICHTS-NAME IST BESCHREIBEND, NICHT ABGELESEN.** Das Label ist **sprachabhängig**
  — in der deutschen Oberfläche heisst der Navigationspunkt "Events testen", die Karte darin
  "Conversions API-Events testen" (GELESEN an der Oberfläche, Owner, 2026-09-10). **Ein
  Kunde mit englischem Konto liest dort etwas anderes**; ein hartkodiertes Label wäre für
  ihn schlicht falsch. Der Text sagt deshalb "Test-Ansicht im Werbekonto".
- **TIKTOKS FASSUNG RUHT AUF EINER EINMAL GELESENEN OBERFLÄCHEN-ZEILE.** Sie ist **kein
  Anspruch, sondern das Eingeständnis** — und sie **ersetzt die TikTok-Messung NICHT**. Die
  steht unverändert als **Vorrat (1)** offen.

**PROVENIENZ DIESES VERMERKS, DREIFACH GETEILT:** Die fünf Punkte des Live-Blicks und die
ungeplante Gegenprobe sind **GEMESSEN LIVE, 2026-09-10, Stefan** — **CC hat davon nichts
gemessen**. Bau-Commit, Push-Zustand, Gates, Testzahlen, die fünf Mutationsergebnisse, die
Richtungs-Richtigstellung und der Befund über die ungedeckten Bestandsläufe sind **GEMESSEN
am eigenen Lauf bzw. am Repo (CC, 2026-09-10)**. Der Ansichts-Name ist **GELESEN an der
Anbieter-Oberfläche (Owner, 2026-09-10)**. Dass die gewählte Bauform heute nicht von der
verworfenen zu trennen ist, ist eine **ABLEITUNG** aus der Deckungsgleichheit beider
Auskünfte über die fünf Ziele, **keine Messung**.

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

## Scheibe 11.3c — Der Paar-CHECK wird ersetzt

Die dritte Scheibe macht am SCHEMA Platz für Pinterest. Sie ersetzt den Paar-CHECK aus
0028 durch eine ziel-abhängige Bedingung — und sonst nichts. Sie nimmt pinterest NICHT in
den Testmodus auf; sie räumt nur die Bedingung weg, die es verhindert.

**GEBAUT UND LIVE BEWIESEN AM 2026-09-10.** Der Nachweis steht in VERMERK 4 unter
"Scheiben-Vermerke"; die Entscheidung, die über diese Scheibe hinaus bindet, steht als (12)
unter "Entscheidungen, die über ihre Scheibe hinaus binden" und wird hier NICHT verdoppelt.

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-10.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist entweder unten stehengeblieben oder unter die
Entscheidungen gezogen. **Die Titel werden ohne Markierungszeichen zitiert** — sonst
kollidierte das Zitat dauerhaft mit jeder gleichlautenden Überschrift.

- "Was sie baut" — abgelaufen, weil GEBAUT. Die Migration heisst
  `0029_project_secrets_test_mode_je_ziel.sql`, Commit `1fb9b90`. **Die Auflage, 0028 nicht
  anzufassen, ist EINGEHALTEN und am Diff jenes Commits ablesbar:** er legt EINE Datei an
  und ändert keine (GEMESSEN am Repo, CC, 2026-09-10).
- "Die vier Zweige, je mit ihrem Grund" — abgelaufen, weil sie in der Datenbank stehen.
  Die Zweige samt Begründung je Ziel tragen jetzt der Kommentarkopf der Migration und die
  Entscheidung (12); der abgelesene Katalog-Befund steht in VERMERK 4.
- "Die Anforderung in einem Satz" — abgelaufen, weil eingelöst: "Frist ohne Code" ist bei
  `pinterest` erlaubt (Fall 10 der Probe), "Code ohne Frist" bei keinem Ziel (Fälle 3, 7,
  11, 15). Beides ist GEMESSEN, nicht mehr gefordert.
- "Auflage an den Namen — SICHERHEIT, KEINE KOSMETIK" — abgelaufen. Der Name ist
  `project_secrets_test_mode_je_ziel`; die Begründung steht dauerhaft im Kommentarkopf der
  Migration und als Regel in docs/immer-beachten.md ("EIN GUARD AUF EINEN NAMEN, DEN ES
  NACH DEM LAUF WIEDER GIBT, TRENNT VORHER NICHT VON NACHHER"). **Was dabei ENTSCHIEDEN
  wurde und nicht bloss ausgeführt: das `add` trägt bewusst KEINEN `if not exists`** —
  OWNER-ENTSCHEIDUNG 2026-09-10, Grund im Kommentarkopf.
- "Der Nachweis ist eine WEGWERF-PROBE IM SQL-EDITOR, kein Live-Test" — abgelaufen, weil
  gefahren. Was sie verlangte und was herauskam, steht in VERMERK 4. **Ihr Text liegt in
  KEINER Datei** und ist damit nicht wiederholbar: sie schreibt in eine BESTEHENDE Tabelle
  und passt in keine der zwei Bauformen, die supabase/checks/README.md zulässt.
- "PFLICHT-STOPP VOR DEM LAUF — der heutige Datenbestand wird ERHOBEN, nicht angenommen" —
  abgelaufen, weil erhoben. Ergebnis und der Nebenertrag stehen in VERMERK 4; die vier
  Kandidaten für den Fall einer verletzenden Zeile sind mit `verletzt_neu_code` = 0 und
  `verletzt_neu_frist` = 0 gegenstandslos geworden.
- "Was diese Scheibe an anderer Stelle fällig macht — GEMELDET, hier nicht vollzogen" —
  abgelaufen, weil VOLLZOGEN: Entscheidung (2) ist am 2026-09-10 richtiggestellt, Vorrat
  (8) am selben Tag mit Beleg gestrichen.

### Die verworfene Alternative — BAUFORM B, generisch und ohne Ziel-Aufzählung

**SIE STEHT HIER UND NICHT IM COMMIT-BODY, UND DAS IST ABSICHT:** Ein Commit-Body lädt
nicht (s. Hebungs-Kandidat (1) dieser Datei). Eine Alternative, die ausschliesslich dort
abgelegt ist, wird beim nächsten Mal als Einfall neu vorgeschlagen, und die Abwägung läuft
ein zweites Mal, ohne dass jemand von der ersten weiss.

**WAS SIE GEWESEN WÄRE:** eine Bedingung ohne jede Ziel-Aufzählung — "ein Code ohne Frist
ist verboten, sonst alles erlaubt". **DAS MODELL DAHINTER:** die Frist ist die AUTORITÄT,
der Code eine NUTZLAST, die nur manche Ziele brauchen.

**IHR VORTEIL WIRD MITGENANNT UND NICHT KLEINGEREDET:** kein zweiter Ort im Schema, der
Ziele aufzählt. Der CHECK `project_secrets_target_valid` zählt sie bereits auf; eine zweite
Aufzählung daneben ist eine zweite Stelle, die bei jedem neuen Ziel mitgeführt werden muss.

**WARUM SIE TROTZDEM AUSSCHEIDET — DER TRAGENDE SATZ: SIE GIBT DIE ZUSICHERUNG FÜR `meta`
UND `tiktok` AUF.** "Frist ohne Code" wäre dort ein zulässiger Datenbank-Zustand, also
genau der Fall, den 0028 als reinen Datenverlust benennt. **Er hinge dann allein an der
ABWESENHEIT eines Schreibwegs, der ihn erzeugt** — und das ist dieselbe Bauform wie der
bereits geführte offene Punkt "saveProject SCHREIBT settings UNVALIDIERT — TOR A HÄLT DURCH
EINE ABWESENHEIT" (CLAUDE.md, "## Offene Punkte"). Ein Schutz, der aus einer Abwesenheit
besteht, verschwindet still, sobald jemand einen zweiten Schreibweg baut.

**WARUM DER EINWAND GEGEN A NICHT TRÄGT:** Jedes neue Ziel bringt nach
docs/immer-beachten.md ohnehin eine EIGENE Migration mit ("JEDES WEITERE FAN-OUT-ZIEL
BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT" — und jene Regel gilt seit ihrer
Erweiterung vom 2026-08-27 ausdrücklich für JEDEN neuen Zielwert, auch ohne Adapter). **A
fügt dieser Migration eine Klausel hinzu, statt eine eigene Runde zu erzeugen.** Der Preis
der Aufzählung ist damit nicht eine zusätzliche Migration, sondern eine zusätzliche Zeile
in einer, die es ohnehin gibt.

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DAS SCHEMA ERLAUBT PINTEREST JETZT, DER CODE ERZEUGT ES NOCH NICHT.** Die zwei Achsen
  werden leicht zusammengezogen, und dann hält jemand die Scheibe für 11.3d: Der CHECK
  lässt "Frist ohne Code" bei `pinterest` zu (GEMESSEN, Fall 10 in VERMERK 4);
  `TARGETS_WITH_TEST_MODE` steht weiterhin auf `["meta", "tiktok"]`, und ein Wächter nagelt
  die Liste fest (GEMESSEN am Repo, CC, 2026-09-10). **Kein Schreibpfad kann den erlaubten
  Zustand heute herstellen.**
  **NACHGEZOGEN AM 2026-09-10 — DIE ZWEITE HÄLFTE IST EINGELÖST, DER SATZ DARÜBER BLEIBT
  WÖRTLICH.** **DER CODE ERZEUGT ES SEIT COMMIT `9422920` SEHR WOHL** (Scheibe 11.3e,
  VERMERK 6): `TARGETS_WITH_TEST_MODE` trägt `["meta", "tiktok", "pinterest"]`, TM13 ist
  darauf nachgezogen, und `startTestMode` legt für dieses Ziel eine **Frist ohne Code** an.
  **WARUM DIESE STELLE NACHGEZOGEN WIRD UND DIE VERMERKE NICHT:** Sie steht im Teil "Was
  über die Scheibe hinaus gilt", also im BINDENDEN Rest der Scheibe 11.3c — nicht in ihrem
  abgelaufenen Zuschnitt und nicht in einem Vermerk. **DIE ERSTE HÄLFTE DES SATZES BLEIBT
  UNVERÄNDERT RICHTIG**, und die Warnung davor ebenso: Wer Schema und Code zusammenzieht,
  hält weiterhin zwei Achsen für eine.
- **WAS 11.3e ZU TUN HAT UND WAS DIESE SCHEIBE IHM NICHT ABGENOMMEN HAT:** `pinterest` in
  `TARGETS_WITH_TEST_MODE` samt Wächter, der Schalter an der Pinterest-Karte, der
  Banner-Text.
  **NACHGEZOGEN AM 2026-09-10 — ALLE DREI POSTEN SIND ERLEDIGT** (Commit `9422920`,
  VERMERK 6). Der Banner-Text brauchte dabei **KEINE Zeile**: `testModeBannerText` liest
  `kind` und `endetAt` und macht keine Annahme über den Code — `pinterest` erscheint von
  selbst, und ein Lauf hält es fest.
  **DIESE LISTE IST DER TEUERSTE DER NACHZÜGE, UND DAS IST DER GRUND FÜR DEN ABSATZ: EINE
  AUFGABENLISTE WIRD AUSGEFÜHRT, NICHT GELESEN.** Ein Trigger, eine Bedingung und eine
  Aufgabenliste erreicht kein Satz an einem anderen Ort — deshalb steht die Erledigung
  HIER und nicht nur im Vermerk.
  **DER VIERTE POSTEN IST AM 2026-09-10 ENTFALLEN UND WIRD HIER EIGENS VERMERKT, WEIL
  "GESTRICHEN" SONST VON "VERGESSEN" NICHT ZU UNTERSCHEIDEN IST.** Er lautete: "und die
  Vorrang-Frage aus Vorrat (26), deployment-weiter Env-Schalter gegen projekt-eigene
  Frist. Jene ist eine EIGENE Entscheidung und ist hier NICHT getroffen; sie entsteht
  erst, wenn pinterest den projekt-eigenen Zustand tatsächlich BENUTZT."
  **WODURCH:** Scheibe 11.3d (Commit `3d42501`, VERMERK 5) hat den deployment-weiten
  Schalter entfernt. Der Posten hat damit keinen Gegenstand mehr — **11.3e hat DREI
  Aufgaben, nicht vier.** Beleg an der Streichung von Vorrat (26).
  **DIE GRENZE:** Für `meta` und `tiktok` besteht die Vorrang-Frage FORT (Vorrat (10)) —
  ihre zwei Umgebungsvariablen bestehen. Sie ist nur für `pinterest` entfallen und
  bindet 11.3e nicht.
  **NACHGEZOGEN AM 2026-09-10:** Hier stand "WAS 11.3d ZU TUN HAT". **Es ist eine
  Aufgabenliste, also handlungsbindend**; sämtliche vier Posten sind seit der Teilung
  desselben Tages **11.3e**. Der Vorrang-Posten (26) bindet ebenfalls 11.3e, weil er erst
  entsteht, wenn der Zustand BENUTZT wird.
  **DIE ZAHL VIER IN DIESEM ABSATZ BLEIBT WÖRTLICH UND IST NICHT NACHGEZOGEN** — sie
  beschreibt die TEILUNG vom 2026-09-10 und datiert sich über ihre eigene Überschrift.
  **WAS HEUTE GILT, STEHT IN DER LISTE, NICHT IN DER ZAHL:** drei Posten. Der letzte Satz
  jenes Nachtrags ist mit dem Entfall des vierten Postens gegenstandslos geworden und
  bindet nichts mehr.
- **DIE GESTE, DIE 11.3e BRAUCHT, IST EINE ANDERE ALS BEI META UND TIKTOK.** Dort verlangt
  die Oberfläche einen Code; bei `pinterest` gibt es keinen, den man verlangen könnte — der
  CHECK verbietet ihn sogar. **Wer die Karte kopiert, baut ein Eingabefeld für einen Wert,
  den die Datenbank zurückweist.** HIER WIRD NICHTS ENTSCHIEDEN; die Feststellung steht,
  damit der Zuschnitt sie nicht übersieht.
  **NACHGEZOGEN AM 2026-09-10:** Hier stand "DIE GESTE, DIE 11.3d BRAUCHT". **Die Geste
  ist Oberfläche, also 11.3e.** Der Zeiger ist nachgezogen, weil er eine Bauanweisung
  trägt ("wer die Karte kopiert, baut ein Eingabefeld …") — sie gälte sonst der Scheibe,
  die die Karte nicht anfasst.
  **ZWEITER NACHTRAG DESSELBEN TAGES — DIE GESTE IST GEBAUT, DER TEXT DARÜBER BLEIBT
  WÖRTLICH.** Die Karte zeigt für `pinterest` **kein Code-Feld**; der Startknopf trägt nur
  noch die Doppelklick-Sperre und ist ohne Eingabe klickbar (Gestalt-Entscheidung (A),
  Commit `9422920`, VERMERK 6). **DIE WARNUNG BLEIBT GÜLTIG UND WIRD NICHT GESTRICHEN** —
  "wer die Karte kopiert, baut ein Eingabefeld für einen Wert, den die Datenbank
  zurückweist" gilt unverändert für **JEDES künftige Ziel ohne Code-Pflicht**. Sie war eine
  Bauanweisung an 11.3e und ist ab jetzt eine an dessen Nachfolger.
  **WAS DER BAU DER FESTSTELLUNG HINZUGEFÜGT HAT:** Die Auskunft, welches Ziel einen Code
  verlangt, steht seit dieser Scheibe an **EINER** Stelle (`requiresTestCode`) und wird von
  Karte UND Schreibpfad **GEFRAGT, nicht nachgebildet**.

**PROVENIENZ DES ZUSCHNITTS:** OWNER-ENTSCHEIDUNG 2026-09-10 (die vier Zweige, die
Ausscheidung der Bauform B, die Auflage an den Namen, der Umfang und die Ausschlüsse), auf
der Grundlage der Messung vom selben Tag (VERMERK 3). Die Form des damals geltenden CHECK
`project_secrets_test_mode_paar` und die Bauform seines Katalog-Guards waren GEMESSEN am
Migrationstext 0028 (CC, 2026-09-10) — **jener CHECK existiert seit dem Lauf desselben
Tages nicht mehr**, die Angabe bleibt als Provenienz des ZUSCHNITTS stehen und ist keine
Aussage über den heutigen Zustand. `testModeQuery` und `TARGETS_WITH_TEST_MODE` sind
GEMESSEN am Repo (CC, 2026-09-10). **Der Datenbestand war zum Zeitpunkt des Zuschnitts
ausdrücklich NICHT gemessen; erhoben ist er am 2026-09-10 vor dem Lauf** (VERMERK 4).

## Was beim Zuschnitt von 11.3d vorliegen muss — gesammelt, nicht zugeschnitten

**DIES IST KEIN ZUSCHNITT.** Der Abschnitt sammelt, was beim Zuschneiden auf dem Tisch
liegen muss; er entscheidet nichts und schneidet nichts. Angelegt 2026-09-10.

**WOHIN SEINE ZWEI TEILE GEHÖREN, nachgetragen am 2026-09-10 nach der Teilung der Runde:
TEIL (a) GEHÖRT ZU 11.3e** (Erklärtext und Kundentext an der Oberfläche), **TEIL (b) ZU
11.3d** (die zwei Pinterest-Läufe, die mit der Umgebungsvariablen ihren Gegenstand
verlieren).
**DIE ÜBERSCHRIFT WIRD NICHT UMBENANNT, obwohl sie nach der Teilung zu eng klingt** — sie
wird an DREI Stellen dieser Datei zitiert (GEMESSEN am Dateitext, CC, 2026-09-10,
MEHRZEILIG gesucht: Verzeichnis, Vorrat (29) und der Kollisions-Absatz in 11.3e; eine
ZEILENWEISE Suche findet nur zwei, weil das Zitat in Vorrat (29) über einen Zeilenumbruch
läuft). Eine Umbenennung machte drei Zeiger tot; **der Satz oben leistet dasselbe und
kostet keinen.**

### (a) Der Erklärtext an der Ziel-Karte ist KUNDENTEXT, keine Aufräumarbeit

`src/components/TargetCard.tsx` sagt dem Betreiber im **sichtbaren** Text, ein Schalter
ohne Code sei unmöglich — wörtlich: "EIN SCHALTER HAETTE EINEN ZUSTAND OHNE CODE ZUR
FOLGE, und den laesst der CHECK … nicht einmal zu." **Ab 11.3e ist genau das der Normalfall
für `pinterest`.** Der Satz steht **vor den Augen des Betreibers**, nicht in einem
Kommentar; **er gehört in die Scheibe 11.3e.**
**NACHGEZOGEN AM 2026-09-10:** Hier stand "Ab 11.3d". Der Normalfall entsteht erst, wenn
`pinterest` in der Zielmenge steht — **das ist 11.3e.**

**RICHTIGGESTELLT AM 2026-09-10, NICHT GESTEMPELT — DIE SICHTBARKEIT IST GEMESSEN FALSCH,
DIE ZUORDNUNG NICHT.** **HIER STAND:** "sagt dem Betreiber im **sichtbaren** Text" und "Der
Satz steht **vor den Augen des Betreibers**, nicht in einem Kommentar".
**DER BEFUND — GEMESSEN am Repo (CC, 2026-09-10), Achse `schalter|an/aus`, case-insensitiv,
über die ganze Datei:** FÜNF Treffer, **KEINER im gerenderten JSX**. Der Satz steht in einem
**JSX-KOMMENTAR** (`{/* DER TESTMODUS — DREI GESTEN, KEIN AN/AUS-SCHALTER (Scheibe 11.3b).
… */}`) und wird **nicht ausgeliefert**. Gegenprobe: kein Lauf in `TargetCard.test.tsx`
erwartet ihn im gerenderten Text.
**ES SIND ALSO ZWEI KOMMENTARE, KEIN KUNDENTEXT.** Damit trägt auch die zweite Hälfte des
Absatzes darunter nicht mehr: "dieselbe Klasse, aber Kommentar statt Oberfläche. Er gehört
mit, **wiegt aber weniger**" — **beide wiegen gleich**, es ist zweimal dieselbe Klasse.
**WAS UNBERÜHRT BLEIBT UND DER GRUND IST, WARUM DIESER TEIL NICHT ENTFÄLLT:** Die
**ZUORDNUNG zu 11.3e** ist handlungsbindend und **stimmt**. Beide Stellen bleiben
Scheibenarbeit — **nicht wegen ihrer Sichtbarkeit, sondern weil sie eine falsche AUSSAGE
tragen** ("ein Zustand ohne Code ist unmöglich"), während die vier übrigen Stellen aus
Vorrat (29) nur einen toten NAMEN tragen. Die Abgrenzung im Absatz "FOLGE FÜR VORRAT (29)"
gilt unverändert.
**DIE ÜBERSCHRIFT DIESES TEILS BLEIBT WÖRTLICH STEHEN, obwohl ihr Wort "KUNDENTEXT" nach
dieser Messung zu weit ist** — ihre andere Hälfte ("keine Aufräumarbeit") ist der tragende
Teil und unverändert richtig. Sie wird nirgends zitiert (GEMESSEN am Repo, CC, 2026-09-10:
genau ein Vorkommen im ganzen Repo, die Überschrift selbst); umbenannt wird sie trotzdem
nicht, weil dieser Absatz sie auflöst und eine Umbenennung nichts hinzufügte.
**WAS DIE RICHTIGSTELLUNG KOSTET:** Die Dringlichkeit sinkt — ein Kommentar steht nicht vor
den Augen des Betreibers. **Die Einstufung als die teuerste Stelle fällt weg**; sie
stehenzulassen hiesse, gegen einen Schaden zu planen, den es nicht gibt.
PROVENIENZ: die Kommentar-Eigenschaft, die Achse und die Gegenprobe sind GEMESSEN am Repo
(CC, 2026-09-10). **Dieselbe Richtigstellung steht im Abschnitt 11.3e** an der dortigen
Fassung derselben zwei Stellen; sie ist hier NICHT verdoppelt, sondern an beiden Orten
vollzogen, weil beide je für sich gelesen werden.

**Der Kopf von `startTestMode`** (`src/app/projects/actions.ts`) trägt dieselbe Aussage —
**dieselbe Klasse, aber Kommentar statt Oberfläche.** Er gehört mit, wiegt aber weniger.

**FOLGE FÜR VORRAT (29), dort vermerkt und nicht gestrichen:** Jener Eintrag behält die
VIER Stellen, die nur einen toten Constraint-Namen tragen. **Diese ZWEI sind
Scheibenarbeit.** Wer sie als Aufräumposten mitnimmt, ändert einen Namen und lässt die
falsche Aussage stehen.
PROVENIENZ: GEMESSEN am Repo (CC, 2026-09-10); die Einordnung als Scheibenarbeit ist eine
ABLEITUNG aus Entscheidung (14).

### (b) Zwei Pinterest-Läufe verlieren ihren Gegenstand, nicht nur einer

`src/lib/capi/pinterest-forward.test.ts` trägt **drei** Läufe an der Umgebungsvariablen
(GEMESSEN am Repo, CC, 2026-09-10):
- **T17** "der Testmodus ist standardmaessig AUS" — er hängt an der **ABWESENHEIT** der
  Variablen. **Nach ihrem Entfernen ist er TRIVIAL WAHR und meldet weiter Erfolg.**
- **T17b** "gesetzte Umgebungsvariable -> test=true im Query-String" — sein Gegenstand
  verschwindet vollständig.
- **T17c** "METAS Umgebungsvariable schaltet hier NICHTS" — prüft eine **Nicht-Kopplung**,
  die sinnvoll bleibt; **ihre Achse wechselt** von "Metas Env" auf "Metas Projekt-Zustand".

**T17 UND T17b WERDEN ERSETZT, NICHT GESTRICHEN:** dieselbe Frage, andere Quelle. **Wer
nur T17b anfasst, lässt einen Wächter stehen, der nichts mehr prüft und grün meldet** —
das ist die Figur "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL"
(docs/immer-beachten.md), **Fall (1): ihr Gegenstand wird entfernt.**
PROVENIENZ: die drei Läufe und ihre Zusicherungen sind GEMESSEN am Repo (CC, 2026-09-10);
dass T17 danach trivial wahr wäre, ist eine ABLEITUNG aus seinem Rumpf, **keine Messung an
einem Lauf ohne die Variable**.

## Scheibe 11.3d — Der Auflösungs-Pfad lernt Ziele ohne Code

**EIN VERWEIS DER FORM "Scheibe 11.3d", DER VOR DEM 2026-09-10 GESCHRIEBEN WURDE, MEINT
DIE GANZE PINTEREST-ARBEIT — also 11.3d UND 11.3e.** Die Runde ist am 2026-09-10 geteilt
worden; **die Oberfläche ist seither 11.3e.** Wer über einen solchen Verweis hier landet
und die Oberfläche sucht, ist im falschen Abschnitt — dieser hier schliesst sie
ausdrücklich aus.
**DIESER SATZ STEHT AM KOPF UND NICHT AN DEN SIEBZEHN EINZELSTELLEN, und das ist die
Entscheidung dieser Auflösung:** Der Zeiger ist **nicht tot**, er landet in der falschen
Hälfte — also erreicht ein Satz am LANDEPLATZ jeden Leser, während siebzehn
Einzelkorrekturen nur die erreichen, die jemand gefunden hat. Nachgezogen ist deshalb
allein dort, wo ein Zeiger eine HANDLUNG bindet; der Rest ist Zeitdokument und von diesem
Satz gedeckt. Die Bauform ist dem Präzedenzfall in CLAUDE.md nachgebildet ("EIN VERWEIS
DER FORM 'Roadmap-Zeile 11.1' … MEINT DIE PHASE MIT DIESER NUMMER … dieser Satz löst sie
auf").

Die vierte Scheibe macht den Testmodus für ein Ziel OHNE Code überhaupt lesbar. Sie baut
keine Oberfläche und nimmt `pinterest` NICHT in die Zielmenge auf.

**GEBAUT UND GEPUSHT AM 2026-09-10.** Der Nachweis steht in VERMERK 5 unter
"Scheiben-Vermerke". **SIE HAT KEINEN LIVE-NACHWEIS**, und das ist kein Mangel, sondern der
Schnitt: Sie ist vollständig am Unit-Test beweisbar, und genau daran verlief die Grenze zu
11.3e.

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-10.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist entweder unten stehengeblieben oder in VERMERK 5
aufgegangen. **Die Titel werden ohne Markierungszeichen zitiert** — sonst kollidierte das
Zitat dauerhaft mit jeder gleichlautenden Überschrift.
**DER AUFLÖSUNGS-SATZ AM KOPF DIESES ABSCHNITTS IST NICHT MIT VERDICHTET WORDEN** und steht
wörtlich: Er ist der Landeplatz jedes Zeigers aus der Zeit vor der Teilung und läuft mit
der Scheibe gerade NICHT ab.

- "Die Schnitt-Entscheidung — eine NACHWEIS-Grenze, keine Größen-Grenze" — abgelaufen,
  weil die Scheibe gebaut ist und der Schnitt gehalten hat: 11.3d ist ohne einen einzigen
  Aufruf gegen den Anbieter bewiesen worden. **Ihre zweite Bedingung ist EINGELÖST und aus
  einer OWNER-ANGABE eine MESSUNG geworden** — `PINTEREST_TEST_MODE` ist in keiner der drei
  Vercel-Umgebungen gesetzt (VERMERK 5). **Die No-op-Grenze selbst bleibt unten stehen**,
  weil sie 11.3e bindet.
- "Der Gegenstand — vier Teile, die zusammengehören" — abgelaufen, weil GEBAUT. Was daraus
  geworden ist, steht in VERMERK 5 in vier Sätzen. **Teil 3 stand als ausdrücklich NICHT
  entschieden da und ist entschieden:** die Ziel-Auskunft ist ein erschöpfender `switch`
  über `TrackingTarget`, modul-privat, mit `never` im Schlusszweig — festgehalten als
  Entscheidung (14) und an der Mutationsprobe M2 belegt.
- "Was zu halten ist — je mit dem Grund" — abgelaufen, weil GEHALTEN und nicht bloss
  behauptet: Die zweite Auflage von (13) (EIN Urteil) steht unverändert, (4) und (3) sind
  unberührt, die Fail-closed-Haltung am Zeitstempel gilt für jedes Ziel, und der
  Kommentarkopf von `activeTestCodeFromRow` ist NACHGEZOGEN statt gestrichen. **Die Belege
  sind die fünf Mutationsproben in VERMERK 5**, nicht dieser Satz.
- "Die drei T17-Läufe — zwei verlieren ihren Gegenstand, nicht einer" — abgelaufen, weil
  vollzogen. T17 und T17b sind ERSETZT (dieselbe Frage, andere Quelle), **T17c ist
  ENTFALLEN mit einem Zeiger auf TM7** in `capi/ingest.test-mode.test.ts` — die
  Nicht-Kopplung steht dort, wo je Ziel nachgeschlagen wird, und eine Doppelung wäre
  schlechter als eine Streichung. **Dazu ist T17a2 neu entstanden**, der Wächter gegen den
  Anwesenheits-Schalter.
- "Der zweite Konsument der Zielmenge — er wächst mit, statt rot zu werden" — abgelaufen
  als BEFUND, eingelöst als KOMMENTAR am Ort der Handlung. Der Lauf selbst ist unberührt
  geblieben; **seine zwei Fallen sind an der Schleife benannt** und werden mit 11.3e
  scharf, wenn `pinterest` in die Menge kommt.
- "Ausdrücklich NICHT in dieser Scheibe" — abgelaufen. **Alle vier Ausschlüsse sind
  eingehalten und am Diff des Commits `3d42501` ablesbar:** `TARGETS_WITH_TEST_MODE` steht
  unverändert auf `["meta", "tiktok"]` und TM13 ist grün, `TargetCard.tsx` und der
  Erklärtext sind nicht im Diff, und Vorrat (10) ist nicht berührt.
- "Zwei Zeiger, die mit dem Abschluss dieser Scheibe fällig werden" — abgelaufen, weil
  VOLLZOGEN: Entscheidung (8) ist in ihrem Begründungshalbsatz richtiggestellt, Vorrat (25)
  und (26) sind mit Beleg gestrichen.

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DIE No-op-ZUSAGE GILT DEM SCHREIBPFAD DES PRODUKTS, NICHT EINER VON HAND GESETZTEN
  ZEILE** — und das ist ein PFLICHT-STOPP für 11.3e und keine Fussnote. Solange
  `pinterest` nicht in `TARGETS_WITH_TEST_MODE` steht, weist `startTestMode` es mit
  `unknown_target` ab; **kein Schreibpfad des Produkts kann für dieses Ziel einen
  Testzustand ablegen.** Eine im SQL-Editor gesetzte Zeile ist seit 11.3d dagegen
  **WIRKSAM**: das Prädikat erkennt sie. **Das ist kein Mangel, sondern der Weg, auf dem
  11.3e geprüft wird** — derselbe Weg wie beim Live-Test der Scheibe 11.3a.
  **WAS DABEI HEUTE NOCH FEHLT, und ohne diesen Satz misst 11.3e am falschen Ende:** Der
  Adapter bekommt den Parameter **nicht** — der `pinterest`-Eintrag in
  `FORWARDER_BY_TARGET` reicht den siebten Wert nicht weiter. Wer eine solche Zeile setzt,
  sieht den Riegel feuern und beim Anbieter **nichts**.

  **NACHGEZOGEN AM 2026-09-10 — DER PFLICHT-STOPP IST ABGELAUFEN, DIE DENKFIGUR NICHT.**
  Der Absatz darüber bleibt wörtlich stehen und war bis zum Bau richtig. **BEIDE
  ZUSTANDSAUSSAGEN SIND MIT COMMIT `9422920` FALSCH GEWORDEN** (Scheibe 11.3e, VERMERK 6),
  und sie werden hier einzeln zitiert, damit niemand raten muss, welche gemeint sind:
  **HIER STAND** "Solange `pinterest` nicht in `TARGETS_WITH_TEST_MODE` steht, weist
  `startTestMode` es mit `unknown_target` ab; **kein Schreibpfad des Produkts kann für
  dieses Ziel einen Testzustand ablegen**." — `pinterest` **steht** seither in der Menge,
  und `startTestMode` legt für dieses Ziel eine **Frist ohne Code** an.
  **UND HIER STAND** "Der Adapter bekommt den Parameter **nicht**." — Das
  `pinterest`-Lambda in `FORWARDER_BY_TARGET` **reicht den siebten Wert seither weiter**;
  es liest die **ANWESENHEIT** des Eintrags (`testMode !== undefined`), und die Läufe TM19
  und TM20 sind die einzigen Wächter darüber.
  **DER PFLICHT-STOPP SELBST IST DAMIT ERLEDIGT:** Er galt der Scheibe 11.3e, und die ist
  gebaut und live bewiesen.

  **WAS BLEIBT, UND ZWAR VERALLGEMEINERT — DIE DENKFIGUR TRÄGT ÜBER DIESE SCHEIBE HINAUS:**
  **EINE No-op-ZUSAGE IST EINE AUSSAGE ÜBER DEN SCHREIBPFAD DES PRODUKTS, NIE ÜBER DIE
  DATENBANK.** Macht eine Scheibe einen Zustand LESBAR, bevor ein Schreibpfad ihn ERZEUGEN
  kann, dann gilt "das ist ein No-op" nur so weit, wie das Produkt reicht — **eine von Hand
  im SQL-Editor gesetzte Zeile ist ab diesem Moment WIRKSAM**, und das Prädikat erkennt sie.
  **DAS IST KEIN MANGEL, SONDERN DER PRÜFWEG:** Genau eine solche Zeile ist das Mittel, mit
  dem sich der Lesepfad prüfen lässt, bevor es eine Oberfläche gibt — so ist die Scheibe
  11.3a live geprüft worden.
  **WEN SIE BINDET:** jede künftige Scheibe dieser Bauform — namentlich, falls für `google`
  oder `linkedin` je ein Auflösungs-Pfad VOR seiner Oberfläche entsteht. **Wer dort "No-op"
  zusagt, sagt es dem Schreibpfad zu und nicht dem Schema.**

  **EINE BEOBACHTUNG, DIE DER NACHZUG MITNIMMT, WEIL SIE EINE VORHERSAGE WIDERLEGT:** Der
  Absatz sagte, 11.3e werde auf **demselben Weg** geprüft wie 11.3a — über eine von Hand
  gesetzte Zeile. **DAS IST NICHT EINGETRETEN.** Der Live-Nachweis der Scheibe 11.3e lief
  **über die Oberfläche** (Testmodus über die Karte gestartet, VERMERK 6) — und zwar
  zwangsläufig, weil genau jene Scheibe den Schreibpfad mitbrachte. **DIE VORHERSAGE WAR
  FÜR IHREN ZEITPUNKT RICHTIG UND IST DURCH IHREN EIGENEN GEGENSTAND ÜBERHOLT WORDEN;** die
  Denkfigur oben ist davon unberührt, weil sie den Fall beschreibt, in dem es die
  Oberfläche NOCH NICHT gibt.
  PROVENIENZ DIESES NACHZUGS: die zwei falsch gewordenen Zustandsaussagen sind GEMESSEN am
  Repo (CC, 2026-09-10) nach Commit `9422920`; dass der Live-Nachweis über die Oberfläche
  lief, ist GEMESSEN LIVE (Stefan, 2026-09-10, VERMERK 6). Dass die Denkfigur über die
  Scheibe hinaus trägt, ist eine ABLEITUNG, keine Messung.
- **DIE VIER GRENZEN DER SCHEIBE STEHEN IN VERMERK 5 UND WERDEN HIER NICHT VERDOPPELT** —
  der ungespeiste Parameter, der irreführend gewordene Name `activeTestCodeFromRow`, die
  nötige Wanderung von `requiresTestCode` nach 11.3e und das Fehlen eines Live-Nachweises.
  **Zwei Fassungen derselben Grenze liefen auseinander**; die Fassung, die gilt, steht beim
  Nachweis.

**PROVENIENZ DES ZUSCHNITTS:** OWNER-ENTSCHEIDUNG 2026-09-10 (die Schnitt-Grenze, die vier
Teile, die Ausschlüsse). Der Rumpf des Prädikats, der Typ `TestModeTarget`, die Vorprüfung
in `startTestMode`, die drei T17-Läufe, TM13 und der zweite Konsument der Zielmenge sind
GEMESSEN am Repo (CC, 2026-09-10). Dass T17 nach dem Entfernen trivial wahr wäre und dass
der zweite Konsument für `pinterest` grün aus dem falschen Grund würde, sind ABLEITUNGEN
aus ihren Rümpfen — **keine Läufe ohne die Variable und keine Läufe mit `pinterest` in der
Menge.**

## Scheibe 11.3e — Pinterest in der Oberfläche

Die fünfte Scheibe schaltet scharf: `pinterest` kommt in die Zielmenge, und die Oberfläche
bekommt ihre Gesten. **Sie ist der Teil, der einen LIVE-LAUF braucht** — die Schnitt-
Entscheidung steht im Abschnitt "Scheibe 11.3d — Der Auflösungs-Pfad lernt Ziele ohne
Code" und wird hier nicht verdoppelt.

**GEBAUT UND LIVE BEWIESEN AM 2026-09-10.** Der Nachweis steht in VERMERK 6 unter
"Scheiben-Vermerke". Diese Scheibe hat **KEINE** Entscheidung erzeugt, die über sie hinaus
bindet — sie hat die Entscheidungen (13), (14), (15), (16) und die Gestalt-Entscheidung (A)
VOLLZOGEN, und die stehen unverändert unter "Entscheidungen, die über ihre Scheibe hinaus
binden".

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-10.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist unten stehengeblieben. **Die Titel werden ohne
Markierungszeichen zitiert** — sonst kollidierte das Zitat dauerhaft mit jeder
gleichlautenden Überschrift.

- "Der Gegenstand" samt der vier Ergänzungen — abgelaufen, weil GEBAUT. `pinterest` steht
  in `TARGETS_WITH_TEST_MODE`, `requiresTestCode` ist gewandert (Punkt 1), die drei
  Konsumenten der Zielmenge sind nachgezogen (Punkte 2 und 3), und die Verdrahtung im
  Fan-Out steht (Punkt 4). **WAS DAVON EIN BEFUND WAR UND KEIN AUFTRAG, IST IN VERMERK 6
  AUFGEGANGEN:** dass die Verdrahtung ein SIGNAL und kein Argument braucht, ist an M2 und
  M3 belegt.
- "Die drei Gesten verlangen heute zwingend einen Code" — abgelaufen, weil die Vorprüfung
  ziel-abhängig geworden ist. Was DABEI entschieden wurde, ist Entscheidung (16); der
  Gate-Tausch und seine gemessene Folge stehen unten.
- "Die zwei Kundentext-Stellen gehören hierher, nicht in eine Aufräumrunde" — abgelaufen,
  weil VOLLZOGEN. Beide Kommentare sind berichtigt; der Beleg steht am Vorrat (29), der
  die vier verbliebenen Stellen weiterführt.
- "Zwei Auflagen an den Bau, und eine Bau-Entscheidung, die NICHT getroffen wird" —
  abgelaufen. Auflage (a) ist gefahren und hat ein anderes Ergebnis geliefert als der
  Zuschnitt (s. unten). Auflage (a2) ist eingetreten wie angesagt. Auflage (b) ist
  eingetreten und in VERMERK 6 gemessen. Die Bedingung aus (c) bleibt unten stehen, weil
  sie künftige Runden bindet.
- "Der Nachweis — ein Live-Lauf mit einem PFLICHT-STOPP" samt den drei Auflagen und der
  vierten Achse — abgelaufen, weil GEFAHREN. Was herauskam, steht in VERMERK 6,
  einschliesslich der fünf Grenzen.
- "Ein Zeiger, der mit dem Abschluss dieser Scheibe fällig wird" — abgelaufen, weil
  vollzogen: s. unten.
- "Ausdrücklich NICHT in dieser Scheibe" — abgelaufen. **Alle vier Ausschlüsse sind
  eingehalten und am Diff des Commits `9422920` ablesbar:** Vorrat (10) ist nicht berührt,
  die vier verbliebenen Stellen aus Vorrat (29) tragen den toten Namen unverändert,
  `google` und `linkedin` sind nicht angefasst, und `activeTestCodeFromRow` heisst
  weiterhin so.
- "Zwei offene Fragen, die hier NICHT entschieden werden" — abgelaufen. **BEIDE waren
  bereits vor dem Bau entschieden** ((A) als Gestalt-Entscheidung, (B) als Entscheidung
  (15)); der Abschnitt trug das selbst und war schon damals in seiner Überschrift überholt.
- "EINE NAMENSKOLLISION, DIE DIESE TEILUNG ERZEUGT" — abgelaufen. Sie ist am 2026-09-10
  aufgelöst worden (elf Zeiger nachgezogen, sechs als Zeitdokument stehengelassen); der
  Landeplatz ist der Auflösungs-Satz am Kopf des Abschnitts "Scheibe 11.3d — Der
  Auflösungs-Pfad lernt Ziele ohne Code".

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DIE MESSUNG ZU AUFLAGE (a) HAT EIN ANDERES ERGEBNIS GELIEFERT ALS DER ZUSCHNITT, UND
  DIE ZAHL WIRD NICHT ANGEGLICHEN.** Der Zuschnitt nannte am 2026-09-10 **DREI** Fundstellen
  auf der Achse `empty_code` über `src/`. **ES SIND SECHS** (GEMESSEN am Repo, CC,
  2026-09-10, mit Negativkontrolle 0): die drei genannten plus der `switch`-Zweig in
  `testModeErrorText` und zwei Stellen in `TargetCard.test.tsx`.
  **DIE AUSSAGE DER AUFLAGE IST DAVON UNBERÜHRT UND BESTÄTIGT:** Der eine Lauf, der
  `empty_code` BEHAUPTET, ruft `startTestMode` mit einem **BEKANNTEN** Ziel. **Kein
  Bestandslauf behauptet `empty_code` für ein unbekanntes Ziel; der Gate-Tausch hat keinen
  gebrochen.** Die drei zusätzlichen Fundstellen liegen in der Oberfläche und tragen keine
  Aussage über die Gate-Reihenfolge.
  **DIE UMKEHRUNG IST REAL UND WIRD NICHT WEGGESCHRIEBEN:** Für eine Eingabe mit
  unbekanntem Ziel UND leerem Code dreht sich der Ablehnungsgrund von `empty_code` auf
  `unknown_target`. **Beide Gates liegen weiterhin VOR Sitzung und Admin-Client** — an der
  Sicherheitsachse ändert der Tausch nichts.
- **DIE BEDINGUNG AUS AUFLAGE (c) BLEIBT STEHEN, WEIL SIE KÜNFTIGE RUNDEN BINDET:** Ein
  direkter Lauf auf `requiresTestCode` wird gebaut, **sobald ein Konsument hinzukommt,
  dessen WIRKUNG kein Lauf misst**. Nach 11.3e hat jeder der drei Leser
  (`activeTestCodeFromRow`, `startTestMode`, die Karte) seinen Wirkungs-Lauf. **Der Grund
  gegen ihn ist unverändert:** Er prüfte den erschöpfenden `switch` gegen eine Kopie seiner
  selbst und machte die Pflicht-Mutation M1 unschärfer.
- **VORRAT (12), GESTRICHEN — DER ZEIGER IST FÄLLIG GEWORDEN UND HIER VOLLZOGEN.** Sein
  BELEG der Erledigung führt an, `testModeStateFrom` bilde "Frist in der Zukunft, leerer
  Code" auf **"aus"** ab. **FÜR `meta` UND `tiktok` GILT DAS WEITER; FÜR `pinterest` IST
  DIESE ABBILDUNG SEIT DIESER SCHEIBE FALSCH** — dort ist genau dieser Zustand "läuft".
  **DER BELEG WIRD NICHT GESTRICHEN**, denn er war für seinen Tag richtig; er trägt ab hier
  diesen Zeiger. **EIN BELEG DER ERLEDIGUNG, DER SPÄTER UNWAHR WIRD, IST VON EINEM GÜLTIGEN
  NICHT ZU UNTERSCHEIDEN** — er trägt kein Datum am Beleg, sondern nur am Eintrag.
  **DIE MECHANIK IST DABEI UNVERÄNDERT UND WAR NIE FALSCH:** `testModeStateFrom` fragt das
  Prädikat und bildet nur den NICHT-aktiven Fall ein; geändert hat sich seit 11.3d, worüber
  das Prädikat urteilt. Der Kommentarkopf jener Funktion sagt es selbst.
- **DER BETREIBER BEKOMMT KEINE SICHTBARE AUSKUNFT DARÜBER, WARUM `pinterest` SICH ANDERS
  VERHÄLT.** Kein Feld, ein Knopf, der ohne Eingabe klickbar ist — und die bestehende
  Erklärung steht in einem JSX-KOMMENTAR und wird nicht ausgeliefert (GEMESSEN am Repo, CC,
  2026-09-10). **Das ist die Gestalt-Entscheidung (A) und keine Auslassung**; wer es ändern
  will, ändert es im Redesign.

### (A) IST ENTSCHIEDEN — KEIN CODE-FELD, EIN KNOPF, KEIN ERKLÄRTEXT

**PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-09-10**, auf der Grundlage der darunter stehenden
Messung am Repo (CC, 2026-09-10). **Die Frage (B) bleibt offen** und wird davon nicht
berührt.

**NACHGEZOGEN AM 2026-09-10 MIT DER VERDICHTUNG — DER SATZ DARÜBER BLEIBT WÖRTLICH UND IST
ALS AUSSAGE SEINES ZEITPUNKTS RICHTIG. `(B)` IST NICHT MEHR OFFEN**: Sie ist am selben Tag
als **Entscheidung (15)** entschieden worden ("DAS TESTMODUS-SIGNAL ERREICHT DIE ADAPTER
ÜBER DIE LAMBDAS, NICHT ÜBER GEÄNDERTE ADAPTER-SIGNATUREN") und mit Commit `9422920`
gebaut. **IHR EIGENER UNTERABSCHNITT IST MIT DER VERDICHTUNG ENTFALLEN**, weil er den
Volltext ausdrücklich NICHT trug, sondern auf jene Entscheidung zeigte — zwei Fassungen
liefen sonst auseinander. **WER (B) SUCHT, FINDET SIE DORT.**
**DIESER ABSCHNITT (A) IST DAGEGEN GEBLIEBEN, und das ist kein Versehen:** Er ist der
EINZIGE Ort der Gestalt-Entscheidung — sie steht in keiner Entscheidungs-Nummer, und sie
bindet über diese Scheibe hinaus, weil sie für JEDES künftige Ziel OHNE Code-Pflicht gilt.

**DIE ENTSCHEIDUNG, in fünf Teilen:**
- **KEIN CODE-FELD für `pinterest`.** Der CHECK aus 0029 verbietet dort einen Testcode; ein
  Feld böte eine Eingabe an, die die Datenbank zurückweist.
- **EIN KNOPF, dessen Beschriftung weiter zwischen "Test starten" und "Test verlängern"
  wechselt** — wie bei `meta` und `tiktok`.
- **DER SPERR-GRUND `!testInput.trim()` FÄLLT WEG, `testBusy` BLEIBT.** Ohne Feld gibt es
  nichts, worauf jene Sperre sich beziehen könnte; der Schutz gegen den Doppelklick bleibt.
- **DER BEENDEN-KNOPF UNVERÄNDERT** — er erscheint nur im laufenden Zustand und verlangt
  ohnehin keinen Code.
- **KEIN ZUSÄTZLICHER ERKLÄRTEXT AUF DER KARTE.**

**DER GRUND FÜR DIE WECHSELNDE BESCHRIFTUNG, OBWOHL BEIDE GESTEN DASSELBE TUN — er gehört
hierher, sonst zieht die nächste Runde sie zu einem festen Text zusammen: SIE BESCHREIBT,
WAS DER NUTZER ERREICHT, NICHT WAS DER CODE TUT.** Läuft ein Test und der Nutzer drückt,
wird die Frist VERLÄNGERT; "starten" wäre dort schlicht falsch. **Dass bei `meta` und
`tiktok` zusätzlich ein Code neu verlangt wird, ist der Unterschied im MECHANISMUS, nicht
im ERGEBNIS** — und eine Beschriftung, die den Mechanismus beschreibt statt das Ergebnis,
wäre für den Nutzer die schlechtere.

**DER GRUND GEGEN DEN ERKLÄRTEXT — GESCHÄRFT AM 2026-09-10, NICHT ERGÄNZT. DER BULLET
DARÜBER BLEIBT WÖRTLICH UND UNANGETASTET.**

**HIER STAND:** "Das UI wird später **komplett neu gestaltet**. **Eine Textzeile überlebt
das nicht, die Struktur schon** — der Aufwand ginge in etwas, das mit dem Redesign ohnehin
verschwindet."

**WARUM ER NICHT MEHR TRÄGT:** Er trennt nach der FORM — "ist es eine Textzeile?" — und
trifft damit **jede** Textzeile an dieser Karte, auch eine, die das Redesign sehr wohl
mitnehmen müsste. **DIE ENTSCHEIDUNG WAR AUS EINEM EINZIGEN FALL GEBILDET**, in dem ein
Text ERKLÄRT, warum es kein Feld gibt — und auf JEDEN Text ausgedehnt. **Das ist die Figur
aus docs/immer-beachten.md, "EINE REGEL KANN RICHTIG SEIN UND NICHT SKALIEREN — DER BRUCH
ZEIGT SICH AN IHRER BEGRÜNDUNG, NICHT AN IHREM WORTLAUT".** Am Wortlaut des Bullets war
nichts zu sehen; er ist unqualifiziert und war es immer.

**DER GRUND, DER STATTDESSEN GILT — ER TRENNT NACH DER HALBWERTSZEIT, NICHT NACH DER
FORM:**
- **EIN TEXT, DER EINE EIGENSCHAFT UNSERES UI ERKLÄRT, STIRBT MIT DEM UI.** Das Redesign
  wirft ihn weg; die Struktur bleibt. Der Aufwand ginge in etwas, das ohnehin verschwindet
  — das ist der alte Grund, und für DIESE Klasse ist er unverändert richtig.
- **EIN TEXT, DER SAGT, IN WELCHER REIHENFOLGE EIN FREMDES SYSTEM ZU BEDIENEN IST, STIRBT
  MIT JENEM SYSTEM.** Ein Redesign erreicht ihn nicht — es müsste ihn MITNEHMEN, weil die
  Eigenschaft, die er beschreibt, unser UI gar nicht kennt.

**DAS IST EINE ANDERE HALBWERTSZEIT, UND SIE ENTSCHEIDET — nicht die Frage, ob es eine
Textzeile ist.**

**DIE PRÜFFRAGE AN JEDEN KÜNFTIGEN TEXT AN DIESER KARTE, IN EINEM SATZ: WORAN HÄNGT DIE
EIGENSCHAFT, DIE ER BESCHREIBT — AN UNSEREM UI ODER AN EINEM FREMDEN SYSTEM?**

**WARUM DER BULLET KEINE AUSNAHME BEKOMMT UND STATTDESSEN DER GRUND GESCHÄRFT WIRD:** Eine
benannte Ausnahme neben einem unqualifizierten Bullet lässt die nächste Runde **raten**, ob
ihr Fall auch eine ist. **AUSNAHMEN SAMMELN SICH; EIN GRUND, DER DIE TRENNLINIE SELBST
TRÄGT, SAMMELT NICHTS.**

**WAS DIE SCHÄRFUNG NICHT BERÜHRT, und das ist GEMESSEN und nicht angenommen (CC,
2026-09-10):** Dieser Grund trägt **AUSSCHLIESSLICH DEN FÜNFTEN BULLET**. Die vier anderen
Teile der Entscheidung tragen ihre Begründung **je an sich selbst** — das Code-Feld am
CHECK aus 0029, die wechselnde Beschriftung am Absatz darunter, der Sperr-Grund an der
Abwesenheit des Feldes, der Beenden-Knopf daran, dass er ohnehin keinen Code verlangt.
**ER HAT SIE NIE GEDECKT, ALSO KANN ER SIE AUCH NICHT UNGEDECKT LASSEN.**

**PROVENIENZ DER SCHÄRFUNG:** OWNER-ENTSCHEIDUNG 2026-09-10, auf einen Befund hin, der
**GEMESSEN am Dateitext** ist (CC, 2026-09-10): der Bullet ist unqualifiziert, und der alte
Grund ist generisch. Dass die zwei Textklassen verschiedene Halbwertszeiten haben, ist eine
**ABLEITUNG** aus der Herkunft der jeweils beschriebenen Eigenschaft, **keine Messung**.

**DIE GRENZE, UND SIE MUSS MIT:** Nach dieser Scheibe verhält sich `pinterest` an der Karte
**ANDERS als `meta` und `tiktok`** — kein Feld, ein Knopf, der ohne Eingabe klickbar ist —,
**und der Betreiber bekommt dafür KEINE sichtbare Auskunft.** Die bestehende Erklärung
steht in einem JSX-Kommentar und wird nicht ausgeliefert (GEMESSEN am Repo, CC,
2026-09-10). **Das ist bewusst so entschieden und keine Auslassung;** wer es später ändern
will, ändert es im Redesign.

**WAS DIESE ENTSCHEIDUNG AM GEGENSTAND DER SCHEIBE KLARSTELLT, damit der Bullet oben nicht
falsch gelesen wird:** Die Zeile "**Der Erklärtext.**" unter "Der Gegenstand" meint das
BERICHTIGEN der bestehenden Aussage — sie sagt heute, ein Schalter ohne Code sei unmöglich,
und nennt den Constraint unter seinem alten Namen. **Sie meint NICHT, einen neuen,
sichtbaren Erklärtext zu bauen.** Der Bullet bleibt wörtlich stehen; dieser Satz löst ihn
auf.

**DIE GRUNDLAGE DER ENTSCHEIDUNG — GEMESSEN am Repo (CC, 2026-09-10), und sie ist
ausdrücklich NICHT die Entscheidung:**
- **EIN KONFIGURIERTES ZIEL OHNE TESTMODUS ZEIGT HEUTE GAR NICHTS.** Der ganze Block hängt
  an **`projectId && testModeState !== null`**; der Leser gibt einen Eintrag nur für Ziele
  heraus, die einen Testmodus tragen. Kein Feld, kein Knopf, keine Zeile — und **die Karte
  entscheidet das nicht selbst**, sie zeigt den Schalter dort, wo ein Eintrag ankommt.
- **DIE DREI GESTEN HABEN HEUTE DIESE GESTALT:** ein Textfeld (`placeholder="Testcode"`,
  `aria-label={`Testcode für ${config.name}`}`) · **EIN** Knopf, dessen Beschriftung
  zwischen `${config.name}-Test starten` und `${config.name}-Test verlängern` wechselt
  (`testModeState.kind === "laeuft"`) · ein **zweiter** Knopf
  `${config.name}-Test jetzt beenden`, der **nur im laufenden Zustand** erscheint. Darüber
  die Zustandszeile aus `describeTestModeState` — bei `kind: "aus"` liefert sie **`null`**,
  dann steht dort nichts.
- **DIE SPERRE, DIE DEN AUSSCHLAG GIBT:** Der Start-Knopf trägt
  `disabled={testBusy || !testInput.trim()}` — **er ist gesperrt, solange nichts eingegeben
  ist.** Fällt das Feld für `pinterest` weg, fällt diese Sperre mit, und der Knopf braucht
  eine andere Freigabe-Bedingung.
- **UND EINE ZWEITE FOLGE, DIE MAN LEICHT ÜBERSIEHT:** Ohne Feld tun "starten" und
  "verlängern" **dasselbe** — beide rufen `startTestMode` und setzen die Frist neu. Bei
  `meta` und `tiktok` unterscheidet sie der frisch verlangte Code; bei `pinterest` gibt es
  nichts zu unterscheiden. **Ob die Beschriftung trotzdem wechselt, ist Teil dieser Frage.**

**PROVENIENZ DES ZUSCHNITTS:** OWNER-ENTSCHEIDUNG 2026-09-10. Die Vorprüfung der drei
Gesten, TM13 und die zwei Kundentext-Stellen sind GEMESSEN am Repo (CC, 2026-09-10); der
Pflicht-Stopp am Live-Lauf ist GEMESSEN LIVE (Stefan, 2026-09-10, VERMERK 3).
**ERGÄNZT AM 2026-09-10 NACH DEM BAU VON 11.3d** (OWNER-ENTSCHEIDUNG desselben Tages): die
vier Punkte am Gegenstand, die Richtigstellung an den zwei Kundentext-Stellen, die zwei
weiteren Auflagen und die vierte Achse am Nachweis, die Ausschlüsse und die zwei offenen
Fragen. **Alle Code-Angaben dieser Ergänzung sind GEMESSEN am Repo (CC, 2026-09-10)** —
namentlich der `pinterest`-Eintrag in `FORWARDER_BY_TARGET`, der siebte Wert der
Dispatch-Stelle, die Signatur von `forwardToPinterest`, die Sichtbarkeitsbedingung des
Testmodus-Blocks in `TargetCard.tsx` und die Kommentar-Eigenschaft des Erklärtextes. **Die
zwei Auflagen am Live-Lauf sind GEMESSEN LIVE** (Stefan, 2026-09-10 bzw. 2026-09-09;
VERMERK 3 und VERMERK 2). **Dass die Verdrahtung ein SIGNAL und kein Argument braucht, ist
eine ABLEITUNG** aus den drei gemessenen Befunden, keine eigene Messung.

### Die aufgelöste Namenskollision — VERDICHTET, der Befund lebt weiter

**VERDICHTET AM 2026-09-10.** Hier stand "EINE NAMENSKOLLISION, DIE DIESE TEILUNG ERZEUGT —
GEMELDET, NICHT AUFGELÖST": siebzehn Stellen dieser Datei nannten "11.3d", keine "11.3e",
und mehrere zeigten nach der Teilung auf die falsche Hälfte. **SIE IST AUFGELÖST** — elf
handlungsbindende Zeiger sind nachgezogen, sechs beschreibende als Zeitdokument
stehengeblieben, und der **Auflösungs-Satz am Kopf des Abschnitts "Scheibe 11.3d — Der
Auflösungs-Pfad lernt Ziele ohne Code"** ist der Landeplatz jedes alten Zeigers.

**DER BEFUND SELBST WIRD NICHT MITGESTRICHEN, ER STEHT NUR NICHT MEHR HIER:** Die Zählung,
das Kriterium und die Aussage, warum ein HALB falscher Zeiger schlimmer ist als ein toter,
tragen der **Hebungs-Kandidat (5)** dieser Datei und die Regel "EIN ZEIGER AUF EINE
NUMMERIERTE ABLAGE KANN AUS PLAUSIBILITÄT ENTSTEHEN STATT AUS NACHSEHEN"
(docs/immer-beachten.md). **ZWEI FASSUNGEN NEBENEINANDER WÄREN DIE ZWEITE WAHRHEIT**, vor
der dieselbe Datei an mehreren Stellen warnt — und der Kandidat ist die, die das Phasenende
überlebt.

## Scheibe 11.3f — Zwei Kundentexte

Die sechste Scheibe ändert **zwei Texte in der Oberfläche** und sonst nichts. Sie baut
keinen Zustand, keine Geste, keinen Adapter und keine Migration.

**GEBAUT UND LIVE GESEHEN AM 2026-09-10.** Der Nachweis steht in VERMERK 7 unter
"Scheiben-Vermerke". Diese Scheibe hat **KEINE** Entscheidung erzeugt, die über sie hinaus
bindet — sie hat die Gestalt-Entscheidung (A) in ihrem geschärften Grund und die
Entscheidung (10) VOLLZOGEN, und beide stehen unverändert an ihrem Ort.

### Vollzogen — was hier stand und wohin es gegangen ist

**VERDICHTET AM 2026-09-10.** Was mit der Scheibe ABGELAUFEN ist, steht nicht mehr hier;
was über sie hinaus bindet, ist unten stehengeblieben. **Die Titel werden ohne
Markierungszeichen zitiert** — sonst kollidierte das Zitat dauerhaft mit jeder
gleichlautenden Überschrift.

- "(1) Die Reihenfolge-Angabe an der Pinterest-Karte" — abgelaufen, weil GEBAUT. Sie steht
  als zweite Zeile unter der Zustandszeile, **nur im laufenden Zustand und nur, wo die
  Auskunft je Ziel einen Hinweis trägt**. Der Wortlaut lautet "Test-Ansicht im Werbekonto
  zuerst öffnen, dann auslösen." **Der Befund, auf dem sie ruht, läuft NICHT ab** und steht
  unverändert in VERMERK 3, SCHLUSS 4.
- "KEIN WIDERSPRUCH ZUR GESTALT-ENTSCHEIDUNG (A)" samt dem Nachtrag — abgelaufen, weil die
  Spannung **aufgelöst** ist: (A) hat am 2026-09-10 einen **geschärften Grund** bekommen,
  der nach der HALBWERTSZEIT trennt statt nach der Form. Der Volltext steht dort; hier
  stand nur der Zeiger, und der ist mit dem Vollzug abgelaufen.
- "(2) Der Banner-Satz wird ziel-abhängig" — abgelaufen, weil GEBAUT. Der ganze Text kommt
  jetzt aus `testModeBannerText`; das freie JSX-Literal im Container ist entfallen. **Die
  drei Fassungen und ihre ungleiche Provenienz stehen im Kommentarkopf von
  `testModeAnbieterAuskunft` und in VERMERK 7** — nicht mehr hier.
- "Zwei Angaben für den Stufe-1-Plan" — abgelaufen, weil der Plan gebaut ist. **Beide
  Angaben haben getragen:** Der Erklärsatz lag tatsächlich im Container (Teil (2) hat die
  Datei berührt), und die Karte hatte tatsächlich keine Anhängestelle (die Angabe ist das
  erste Fliesstext-Element dieser Art geworden).
- "Der Nachweis — am Unit-Test, KEIN Live-Lauf" — abgelaufen, weil gefahren. Was herauskam,
  steht in VERMERK 7, einschliesslich des Live-BLICKS und seiner ungeplanten Gegenprobe.
- "Eine offene Frage, die hier NICHT entschieden wird" — abgelaufen, weil ENTSCHIEDEN
  (OWNER, 2026-09-10): zweite Zeile unter der Zustandszeile, vor der Bedien-Reihe.
- "Ausdrücklich NICHT in dieser Scheibe" — abgelaufen. **Alle sechs Ausschlüsse sind
  eingehalten und am Diff des Commits `8fcd4e0` ablesbar:** Vorrat (20) und (10) sind nicht
  berührt, die vier Stellen aus Vorrat (29) tragen den toten Namen unverändert, `google`
  und `linkedin` sind nicht angefasst, `activeTestCodeFromRow` heisst weiterhin so, und es
  ist **kein** Erklärtext entstanden, der sagt, warum `pinterest` kein Feld hat.

### Was über die Scheibe hinaus gilt und deshalb hier bleibt

- **DIE AUSKUNFTSSTELLE IST EINE, NICHT ZWEI — UND IHRE ACHSE IST NICHT DIE DER
  CODE-PFLICHT.** `testModeAnbieterAuskunft` (`src/components/TargetCard.tsx`) liefert je
  Ziel den **Banner-Halbsatz** und, wo nötig, den **Reihenfolge-Hinweis**. **Der Hinweis
  hängt daran, ob die Test-Ansicht des Anbieters RÜCKSCHAU hat — nicht daran, ob er einen
  Code verlangt.** Dass heute genau das Ziel ohne Code-Pflicht auch das ohne Rückschau ist,
  ist **Zufall und muss nicht so bleiben**.
  **WEN DAS BINDET:** jede Runde, die ein weiteres Ziel aufnimmt oder die Bedingung der
  Angabe anfasst. **Der ganze Absatz steht am `switch` selbst** und wird hier nicht
  verdoppelt.
- **DIE PRÜFFRAGE AN JEDEN KÜNFTIGEN TEXT AN DIESER KARTE** steht an der
  Gestalt-Entscheidung (A) und lautet: **woran hängt die Eigenschaft, die er beschreibt —
  an unserem UI oder an einem fremden System?** Sie ist mit dieser Scheibe zum ersten Mal
  angewandt worden und hat sie getragen.
- **DER BANNER-TEXT LIEGT JETZT GANZ IN EINER FUNKTION, UND DAS IST EINE ZUSAGE AN DIE
  NÄCHSTE RUNDE:** Wer ihn ändert, ändert `testModeBannerText` — nicht den Container. **Ein
  zweites Textstück im JSX wäre der Rückfall in genau den Zustand, den diese Scheibe
  aufgelöst hat**, und er war dort von keinem Lauf gedeckt.
- **JEDES ZIEL TRÄGT SEINEN HALBSATZ DIREKT BEI SICH — KEIN SAMMELSATZ AM ENDE.** Ein
  Sammelsatz zwänge den Text, die STÄNDE ZU VERGLEICHEN, und die drei sind ungleich
  belegt; dabei ginge die vorsichtige Fassung für `tiktok` verloren. **Der Wächter dagegen
  ist TM32, und er ist der einzige** — er prüft die POSITION der Halbsätze, nicht ihre
  Anwesenheit.

### Warum das keine Kosmetik ist — die Entscheidung, die sie nötig macht

**DER TESTMODUS IST FÜR KUNDEN GEBAUT, NICHT NUR FÜR DEN BETREIBER** (OWNER-ENTSCHEIDUNG
2026-09-10). **DAMIT WIRD AUS ZWEI SCHÖNHEITSFEHLERN PRODUKTPFLICHT.**

**DIE BEGRÜNDUNG STEHT HIER UND NICHT IM COMMIT-BODY, sonst wird die Scheibe beim nächsten
Aufräumen als Kosmetik gestrichen** (s. Hebungs-Kandidat (1) dieser Datei — ein Commit-Body
lädt nicht): **Wer im Ads Manager arbeitet, MISSTRAUT Datenverbindungen — zu Recht, weil er
sie nicht sehen kann.** Ein Testmodus ist das Werkzeug, das dieses Misstrauen auflösen soll.
**ZEIGT ER BEI KORREKTEM VERHALTEN EINE LEERE FLÄCHE, BESTÄTIGT ER ES** — und tut damit
das Gegenteil dessen, wofür er gebaut ist.

**WAS DIESE ENTSCHEIDUNG NICHT ÄNDERT, und der Satz gehört dazu, weil er sonst als Trigger
missverstanden wird:** "Für Kunden gebaut" heisst **NICHT** "ein Kunde sieht es". CLAUDE.md
führt unverändert **keine Kunden und keinen fremden Traffic**; kein Trigger, der daran
hängt, tritt mit dieser Entscheidung ein.

**PROVENIENZ DES ZUSCHNITTS:** OWNER-ENTSCHEIDUNG 2026-09-10 (dass der Testmodus für Kunden
gebaut ist, die zwei Teile, die Auflösung von Vorrat (22) gegen dessen eigenen Einwand, der
Umfang und die Ausschlüsse). Der Live-Strom ohne Rückschau ist **GEMESSEN LIVE** (Stefan,
2026-09-10; VERMERK 3). Die drei Stände je Ziel tragen ihre Provenienz einzeln oben. Der
heutige Banner-Wortlaut, sein Ort, die drei Elemente der Karte im laufenden Zustand, der
Text der Gestalt-Entscheidung (A) und die Zuordnung der TikTok-Messung zu Vorrat (1) sind
**GEMESSEN am Repo bzw. am Dateitext (CC, 2026-09-10)**. Dass die Bedienanweisung ein
Redesign überlebt, ist eine **ABLEITUNG** aus der Herkunft der Eigenschaft (Anbieter statt
UI), **keine Messung**.
