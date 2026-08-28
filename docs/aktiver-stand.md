# AKTIVER STAND — PHASE 11.2 (GOOGLE)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.2. Sie ist
angelegt am 2026-08-24. Existiert sie, läuft eine Phase; wird sie am Phasenende
gehoben und archiviert, verschwindet sie wieder. Verfahren: docs/arbeitsweise.md.

> **VERMERK 2026-08-27 — LIES IHN, BEVOR DU WEITERLIEST. DER KOPFSATZ DARÜBER BLEIBT
> WÖRTLICH STEHEN UND BESCHREIBT EINE PAUSIERTE PHASE.**
>
> **PHASE 11.2 PAUSIERT SEIT DEM 2026-08-25.** Sie ist NICHT abgeschlossen und NICHT
> archiviert. Ihr Stand in dieser Datei bleibt GÜLTIG und wird bei der Rückkehr
> weitergeführt — hier ist nichts überholt, es ruht nur.
>
> **PHASE 11.8 (Autorisierungsschicht) IST SEIT DEM 2026-08-27 ABGESCHLOSSEN UND
> ARCHIVIERT.** Ihr Stand liegt weiterhin in `docs/aktiver-stand-11.8.md` — **die Datei
> ist NICHT nach `docs/claude-history/` verschoben worden**, weil sechs Quelldateien ihren
> Pfad im Kommentarkopf zitieren. Der Grund und die Bedingung, unter der sie doch wandert,
> stehen in ihrem eigenen Kopf.
>
> **EINE MEHRDEUTIGKEIT BLEIBT, und sie verschwindet mit dem Phasenende NICHT:** Ein
> Verweis der Form "Vorrat, Eintrag 3" trifft ZWEI Standdateien — beide führen einen
> Vorrat, und beide liegen weiterhin unter `docs/`. **Wer zeigt, nennt den DATEINAMEN
> mit.** Nachgezogen worden ist nichts.
>
> **AUSDRÜCKLICH NICHT ENTSCHIEDEN: der allgemeine Fall zweier paralleler Phasen.** Dieser
> Vermerk beschreibt einen EINZELFALL, KEINE REGEL — wer aus ihm ein Verfahren ableitet,
> leitet aus einem Einzelfall ab. **Es ist die einzige Stelle im Repo, an der das steht.**
>
> **WAS MIT DEM 2026-08-27 ABGELAUFEN IST** — damit die Kürzung erkennbar bleibt und nicht
> als Versehen: die WEITERLEITUNG selbst ("wer an 11.8 arbeitet, liest jene Datei"), die
> Begründung, warum DIESE Datei ihren Namen behält, und der Rückbau-Absatz. Seine
> Bedingung ("existiert `docs/aktiver-stand-11.8.md` nicht mehr") ist durch die
> Archivierungs-Entscheidung gegenstandslos geworden; abgelöst hat ihn dieser Vermerk.
>
> **PROVENIENZ:** OWNER-/ARCHITEKTEN-ENTSCHEIDUNG 2026-08-25 (die Pause) und 2026-08-27
> (der Abschluss von 11.8, die Nicht-Verschiebung, diese Ersetzung). Keine Messung ausser
> der Zahl der Zeiger, die am Repo erhoben ist (CC, 2026-08-27).

## Verzeichnis der Abschnitte

Die Einträge dieses Verzeichnisses tragen bewusst KEINE `##`-Marke, damit eine
Suche nach einer Überschrift nicht zuerst hier landet — s. die Regel "EIN ANKER,
DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" in
docs/immer-beachten.md.

· Pflicht-Gate — diese Datei zuerst
· Gegenstand der Phase
· Was den Zuschnitt bindet
· Fortschreibungs-Regeln
· Scheibe 11.2a — Klick-Kennungen lösen und die Nutzlast bauen
· Abgeschlossene Scheiben-Vermerke
· Entscheidungen, die über ihre Scheibe hinaus binden
· Vorrat (gemeldet, nicht gebaut)
· Hebungs-Kandidaten

## Pflicht-Gate — diese Datei zuerst

AB JETZT IST DIESE DATEI DAS PFLICHT-GATE JEDES BAU- UND AUFKLÄRUNGS-PROMPTS
DIESER PHASE ("Auftrag 0"): Sie wird ZUERST gelesen — vor dem Plan, nicht während
des Baus. Wer ohne sie arbeitet, arbeitet gegen einen Stand, den er nicht kennt,
und die Abweichung fällt erst auf, wenn ein Zuschnitt darauf bauen will und ins
Leere greift.

Sie ERSETZT KEINE der unbedingt geladenen Dateien (CLAUDE.md,
docs/immer-beachten.md) und keinen der auslöser-geladenen Pflicht-Stopps
(docs/db-stand.md und docs/db-regeln.md bei Schema/Policies/RPC/Analytics-Lesepfad,
docs/ziel-befunde.md und docs/ziel-fragenkatalog.md bei Arbeit an einem
Fan-Out-Ziel). Sie tritt DANEBEN.

## Gegenstand der Phase

**HIER STAND EIN WÖRTLICHES ZITAT DES ROADMAP-KOPFES. ES IST AM 2026-08-24
ERSATZLOS ENTFALLEN**, und der Grund gehört in diese Datei, weil sonst jemand es
als Verbesserung wieder einsetzt: Der zitierte Kopftext ist genau der Text, den
der Richtigstellungs-Block DESSELBEN Roadmap-Eintrags als zu grob bzw. als
richtig-aber-ohne-Grund einstuft. Die Korrektur bleibt am Ursprung zurück — ein
Zitat reisst die Aussage mit und die Einstufung nicht. Eine Datei, die in JEDEM
Prompt ZUERST gelesen wird, darf nicht die überholte Hälfte zuerst ausliefern.

### (1) Der Gegenstand

Die Anbieter-Dokumentation zur Google Data Manager API wird ABSCHNITTSWEISE
gelesen, die Befunde werden verortet, und daraus wird die erste Google-Scheibe
ZUGESCHNITTEN. DER ZUSCHNITT IST DAS ZIEL DIESER PHASE, NICHT DER BAU.

PROVENIENZ: ARCHITEKTEN-FESTLEGUNG 2026-08-24. Keine Messung.

STAND DER DREI ARBEITEN (2026-08-24) — der Satz darüber beschreibt die GANZE
Phase und bleibt wörtlich; hier steht, wie weit sie ist:
- **ERLEDIGT — die abschnittsweise Lesung.** Zwei Läufe, 33 Seiten: LAUF 1
  (Leitfaden und Betrieb, 17 Seiten) und LAUF 2 (die Referenz, 16 Seiten).
- **ERLEDIGT — die Verortung der Befunde.** docs/ziel-befunde.md, Google-
  Abschnitt, Teile (g) bis (z); committet als a324f67 und eeeef6f.
- **OFFEN — der Zuschnitt.** Er ist die einzige der drei Arbeiten, die aussteht.

OB NACH DEM CRAWL EINE BAUBARE SCHEIBE ÜBRIGBLEIBT, IST NICHT ENTSCHIEDEN und
wird in dieser Datei auch nicht nebenbei entschieden. KEINE EMPFEHLUNG.

DIESER SATZ GILT WEITER, SEINE BEGRÜNDUNG IST EINE ANDERE GEWORDEN — und das
gehört dazu, weil ein unveränderter Satz sonst mit einem überholten Grund
gelesen wird: Er ruhte auf der Frage nach dem Allowlist-Gate. Die ist mit der
Entscheidung vom 2026-08-24 beantwortet (der Offline-Weg trägt keines). Was ihn
jetzt trägt, sind VIER unaufgelöste Widersprüche und SECHS offene Fragen aus
docs/ziel-befunde.md, Google-Abschnitt, Teil (z) — darunter der TRÄGER DES
ZUGANGSDATUMS, den zwei Läufe über den vollständigen Doku-Baum nicht gefunden
haben.

WORAUF DER ZUSCHNITT WARTET, UND ES IST EINE EINZIGE SACHE: EINE MESSUNG — ob
die Klick-Kennung bis zum Conversion-Beacon ÜBERLEBT. BIS SIE VORLIEGT, WIRD
NICHT ZUGESCHNITTEN. Das ist der nächste Schritt dieser Phase, und er ist kein
Bau.

ENTSCHIEDEN AM 2026-08-25 (OWNER) — DIE ZUSCHNITT-SPERRE IST FÜR SCHEIBE 11.2a
ERFÜLLT, UND DER SATZ DARÜBER BLEIBT WÖRTLICH STEHEN. Was sich ändert, ist nicht
sein Wortlaut, sondern sein GELTUNGSBEREICH: Er verlangte eine Messung, BEVOR
zugeschnitten wird. Vermerk 1 hat sie erbracht, soweit diese Scheibe sie braucht —
sie baut ZWEI REINE FUNKTIONEN UND KEINEN TRANSPORT, und eine reine Funktion misst
nichts, was die offene Restlücke berührt.
DIE RESTLÜCKE IST NICHT GESCHLOSSEN, SIE IST VERSCHOBEN — und sie ist unten zur
BAUVORGABE geworden: Vermerk 1 zeigt NICHT, dass eine ECHTE gclid denselben Weg
nimmt, und er misst einen EIN-SEITEN-FALL. Beide Lücken treffen den TRANSPORT, nicht
die Extraktion. WER DEN TRANSPORT ZUSCHNEIDET, NIMMT SIE DORT WIEDER AUF; sie sind
mit dieser Scheibe NICHT erledigt.
DIE FOLGE FÜR DEN SATZ "OB NACH DEM CRAWL EINE BAUBARE SCHEIBE ÜBRIGBLEIBT, IST NICHT
ENTSCHIEDEN": Er ist mit dieser Entscheidung BEANTWORTET — ja, eine bleibt übrig, und
es ist die unten zugeschnittene. Er bleibt als Zeitdokument stehen; wer ihn heute
liest, liest ihn mit dieser Antwort.
UND DIE FOLGE FÜR DEN SATZ "DER ZUSCHNITT IST DAS ZIEL DIESER PHASE, NICHT DER BAU":
Er bleibt ebenfalls WÖRTLICH stehen und beschrieb den Zustand, SOLANGE DER ZUSCHNITT
AUSSTAND — er grenzte eine Konzept-Phase gegen einen Bau ohne Zuschnitt ab, nicht den
Bau gegen die Phase. Mit dem Zuschnitt unten ist diese Abgrenzung eingelöst: DER BAU
DER ZUGESCHNITTENEN SCHEIBE IST GEDECKT. Ohne diesen Absatz hält die Bau-Runde erneut
an, und zwar an einem Satz, der seinen Gegenstand verloren hat.
DIE VERORTUNG, DAMIT NIEMAND ZWEIMAL SUCHT: Die Sperre steht HIER, in "### (1) Der
Gegenstand" — NICHT im Abschnitt "Was den Zuschnitt bindet". Wer sie dort sucht,
findet sie nicht und hält sie für erledigt.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25. KEINE Messung, KEINE Ableitung.

### (2) Die Herkunft — als Zeiger, nicht als Kopie

docs/roadmap.md, Eintrag 11.2 ("Google"), Marker `[ ]`. Dort steht der Volltext
mit Auflagen, Richtigstellungen, einem Vorbehalt und einer Owner-Entscheidung.

DIE AUFLAGE, UND SIE IST DER ZWECK DIESES ZEIGERS: Wer den Eintrag liest, liest
den KOPF NIE OHNE den Richtigstellungs-Block darunter. Der Kopf trägt zwei
Angaben, die dort ausdrücklich als überholt bzw. als unvollständig begründet
eingestuft sind.

DIE AUFLAGE ZIELT SEIT DEM 2026-08-25 AUF ZWEI STELLEN, NICHT MEHR AUF EINE. Der
Satz darüber bleibt WÖRTLICH stehen, und die Zahl "zwei" darin wird AUSDRÜCKLICH
NICHT angetastet: Sie zählt, was im RICHTIGSTELLUNGS-BLOCK steht, und das sind
weiterhin genau zwei.
WAS HINZUGEKOMMEN IST: Der Eintrag 11.2 trägt seit dem 2026-08-25 eine DRITTE
überholte Kopf-Angabe — "EINE KONZEPT-RUNDE, KEINE SCHEIBE", gestempelt. SIE STEHT
NICHT IM RICHTIGSTELLUNGS-BLOCK, sondern im STEMPEL-BLOCK AM ENDE DES EINTRAGS, und
zwar mit Grund: Jener Block führt SACHKORREKTUREN, dieser einen MECHANISMUSWECHSEL
mit einer Bedingung seiner Rückkehr. Die Trennung ist Absicht und wird dort erklärt.
FOLGE FÜR DIESE AUFLAGE: Wer den Kopf prüft, liest den Richtigstellungs-Block UND
den Stempel-Block am Ende. WER NUR DEN ERSTEN LIEST, HAT DEN KOPF NICHT VOLLSTÄNDIG
GEPRÜFT — und merkt es nicht, weil der Block, den er gelesen hat, in sich vollständig
ist.
WARUM HIER NICHT "DREI" STEHT, obwohl es naheliegt und obwohl genau das der erste
Reflex war: Der bestehende Satz sagt "zwei Angaben, die DORT ... eingestuft sind".
Das "dort" bindet die Zahl an den Block. Sie auf "drei" zu heben machte den Satz ERST
falsch — dort stehen nur zwei. Nicht die ZAHL war unvollständig, sondern der ZEIGER;
deshalb bekommt er eine zweite Adresse und die Zahl bleibt.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25, gestützt auf eine Prüfung am Dateitext
(CC, 2026-08-25).

### (3) Der Vorbehalt der Owner-Entscheidung zur Gestalt, und was die Gestalt mitbringt

WORAUF SICH "DIE GEWÄHLTE GESTALT" UNTEN BEZIEHT: Für Google Ads ist die gewählte
Gestalt der OFFLINE CONVERSION IMPORT auf Basis der KLICK-KENNUNGEN (gclid,
gbraid, wbraid); die Conversion-Action im Kundenkonto ist vom Typ UPLOAD_CLICKS.
NICHT gewählt ist die zusätzliche Datenquelle zur Tag-Conversion (Multi-Source).
AUSDRÜCKLICH AUSGESCHLOSSEN IST AUCH "ENHANCED CONVERSIONS FOR LEADS" — der
Anbieter führt sie auf derselben Seite und über denselben Weg; sie ist der
PII-Zweig und bleibt ausgeschlossen, solange die DATENKLASSEN-GRENZE steht. KEINE
gehashten Nutzerdaten, KEIN von Pagesmith ausgeliefertes Google-Tag.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-24; keine Messung, keine Ableitung, eine
Festlegung. IHRE VOLLE BEGRÜNDUNG STEHT HIER NICHT, sondern in docs/roadmap.md,
Eintrag 11.2 — knapp: Multi-Source verlangt transactionId als PFLICHT und setzt
ein Google-Tag voraus, das denselben Wert gesetzt hat (GELESEN 2026-08-24,
/reference/rest/v1/events/ingest), und Pagesmith liefert keines aus; der
Offline-Weg trägt zudem als einzige der vier Google-Zeilen KEINEN
Allowlist-Vorbehalt (GELESEN 2026-08-24, /devguides/events).

Zeiger mit je einem Satz, was sie sperren bzw. was sie bedeuten — KEIN Volltext,
KEINE Wiedergabe der Begründungen.

- **VORBEHALT DER UPLOAD_CLICKS-ACTION:** Im Kundenkonto muss eine
  Conversion-Action vom Typ UPLOAD_CLICKS existieren; ohne sie gibt es keine
  productDestinationId, an die geliefert werden könnte. Der Vorbehalt ist nicht
  verschwunden, er hat den TYP gewechselt — vorausgesetzt wird nicht mehr eine
  WEBPAGE-Action aus einem Browser-Tag.
- **KEINE KLICK-KENNUNG, KEINE CONVERSION — EIGENSCHAFT, KEIN FEHLER:**
  Organischer Traffic, Direktaufrufe und Traffic anderer Kanäle erzeugen bei
  diesem Ziel NICHTS. Wer die Zahlen gegen die eigene Auswertung hält, findet
  eine Lücke und sucht einen Defekt, den es nicht gibt.
- **ZWEI RANG-WECHSEL GEGENÜBER DER NICHT GEWÄHLTEN GESTALT:** eventSource ist
  hier PFLICHT (bei Multi-Source optional), transactionId dagegen OPTIONAL (dort
  Pflicht). Wer den einen Zuschnitt aus dem anderen ableitet, erbt genau die
  falsche Hälfte.

ORT ALLER DREI IM VOLLTEXT: docs/roadmap.md, Eintrag 11.2, und
docs/ziel-befunde.md, Abschnitt "Google (Google Ads Conversions · GA4)".

## Was den Zuschnitt bindet

Zeiger mit je einem Satz Wirkung. KEINE Volltexte, KEINE Zitate — die Einzelheiten
stehen an den genannten Orten und werden hier bewusst nicht verdoppelt.

- **AM ROADMAP-EINTRAG 11.2 HÄNGEN KOPPLUNGEN** (GEMESSEN am Repo,
  2026-08-24, in der Aufklärungsrunde dieser Phase). Wer die Zeile anfasst, bricht
  sie STILL — es gibt keinen Wächter, weder einen Test noch ein Gate.
  ZWEI WÖRTLICHE ZITATE ZEIGEN AUF EINTRAG 11.5, nicht auf 11.1. Eintrag 11.1
  hängt anders daran: über ein SELBSTZITAT — den Halbsatz-Anker "Richtigstellung
  an jener Zeile", der von 11.1 UND vom Kopf der Roadmap-Datei zurückzitiert wird
  — und über einen VERWEIS, der bei 11.1 nicht endet, sondern nach
  docs/immer-beachten.md weiterläuft. Dazu kommen zwei Selbstzitate INNERHALB des
  Eintrags.
  DIE EINZELSTELLEN MIT ZEILENANGABEN WERDEN HIER NICHT WIEDERHOLT.
- **BEREITS BEANTWORTET UND NICHT ERNEUT ZU ERHEBEN:** docs/ziel-befunde.md trägt
  einen Google-Abschnitt mit den Teilen (a) bis (f) und einem Block "WAS
  AUSDRÜCKLICH OFFEN BLEIBT" — dessen Kopf nennt vier Punkte, es sind fünf; die
  Abweichung ist dort ausdrücklich vermerkt und wird NICHT korrigiert.
  docs/ziel-fragenkatalog.md trägt für Google KEINEN Abschnitt und KEINE
  Fragenliste — Google ist kein Matrix-Ziel. FOLGE: Der Crawl beginnt am KATALOG,
  nicht an einer bestehenden Google-Spalte.
- **DAS VERFAHREN FÜR DEN CRAWL** steht in docs/ziel-fragenkatalog.md, Abschnitt
  "Befunde am Verfahren (2026-08-20)". Es wird hier NICHT wiederholt.

VERMERK ZUR KOPPLUNGS-ZAHL (2026-08-25) — DER TEXT DES ERSTEN PUNKTES BLEIBT
WÖRTLICH STEHEN, UND DIE ZAHL "zwei" DARIN WIRD NICHT ANGETASTET. Was danebentritt,
ist ein Befund über ihren PRÜFUMFANG.
DER BEFUND — GEMESSEN am Repo (CC, 2026-08-25, Achse: docs/roadmap.md vollständig
plus eine formale Suche über *.md, *.ts, *.tsx und *.sql nach den wörtlichen
Bestandteilen des Kopfsatzes): Der Punkt oben nennt "zwei Selbstzitate INNERHALB des
Eintrags". Es sind MINDESTENS VIER — "ENTSPRECHUNG ZUM META-MODELL", "bestehende
Tag-Conversion" und die ZWEI KOPF-ZITATE IM RICHTIGSTELLUNGS-BLOCK ("Es sind ZWEI
Ziele, nicht eins" und "der Nachfolger ist für den relevanten Fall allowlist-only
und verlangt einen OAuth-Fluss mit Verifizierung").
WELCHE ZWEI GEMEINT WAREN, IST AM TEXT NICHT ENTSCHEIDBAR, und der Grund steht im
Punkt selbst: "DIE EINZELSTELLEN MIT ZEILENANGABEN WERDEN HIER NICHT WIEDERHOLT."
Ohne die Einzelstellen lässt sich eine Zahl nicht auf ihre Mitglieder zurückführen.
KEINE NEUE ZAHL WIRD EINGESETZT. "Mindestens vier" ist selbst KEINE abgeschlossene
Liste — die Suche lief über benannte Begriffe, nicht über alle denkbaren. Eine zweite
unbelegte Zahl an die Stelle einer ersten zu setzen wäre keine Verbesserung, sondern
dieselbe Bauform mit einem anderen Wert.
WAS DIESER VERMERK LEISTET, UND ES IST DAS EINZIGE, WAS ER LEISTET: Wer die
Kopplungen prüft, prüft ALLE wörtlichen internen Selbstzitate des Eintrags — nicht
zwei. DIE ZAHL IST KEIN PRÜFUMFANG.

## Fortschreibungs-Regeln

- VERMERK-NUMMERN SIND STABIL und werden NIE neu vergeben. Ein neuer Vermerk
  tritt HINTEN an. Nichts wird umsortiert, nichts nachnummeriert.
- ES DARF IMMER NUR EINE LÜCKE GEBEN: genau ein Vermerk ohne Commit-Nummer — der
  jüngste, noch nicht committete. Eine zweite Lücke heißt, dass ein Commit
  fehlt oder ein Vermerk nie einen bekommen hat; beides wird aufgelöst, bevor
  ein weiterer Vermerk entsteht.
- JEDE ANGABE TRÄGT PROVENIENZ, und zwar als eines von beiden: GEMESSEN (mit
  Datum) oder GELESEN (mit Quelle). Eine Angabe ohne Provenienz gilt als
  ungeprüft und trägt keinen Plan.
- ALS ORT STEHT DER SYMBOLNAME, NIE EINE ZEILENNUMMER. Namen überleben ein
  Refactoring, Zeilennummern nicht — und eine falsche Zeilennummer ist teurer als
  keine, weil sie auf eine andere Stelle zeigt statt zum Suchen zu zwingen.

## Scheibe 11.2a — Klick-Kennungen lösen und die Nutzlast bauen

Die erste Scheibe der Phase baut ZWEI REINE FUNKTIONEN und verdrahtet nichts. Sie
ist bewusst so geschnitten, dass am heissesten Pfad der Plattform NICHTS geschieht —
kein Empfänger, kein Netzaufruf, keine Abfrage, keine Änderung an der garantierten
leeren 204.

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-25, nach dem Bau-Commit 6653f37. Hier standen die ANWEISUNGEN
FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen. DREI Unterabschnitte sind
entfallen, und was sie trugen, steht in VERMERK 2 — nur weil es dort steht, durfte es
hier weg:
- **"Der Gegenstand — zwei reine Dateien, keine Verdrahtung"** nannte die zwei zu
  bauenden Dateien samt ihrem Zuschnitt. Gebaut sind sie; der Code sagt es jetzt
  selbst. Ihr einziger fortwirkender Satz — die Nutzlast-Form ist GELESEN und nie
  gemessen — steht unverändert unten in "Die Grenze dieses Zuschnitts".
- **"Sie ist NICHT live demobar, und das ist der Zuschnitt, kein Mangel"** trug den
  Beweis-Grund und die Schuld der nächsten Scheibe. BEIDES STEHT JETZT IN VERMERK 2,
  und zwar vollständig; zweimal geschrieben liefe es auseinander.
- **"Warum der Schnitt nichts verbaut"** beantwortete einen Einwand gegen den
  SCHNITT. Der Einwand ist mit dem Vollzug erledigt; die eine fortwirkende Aussage
  daraus — ein weiteres Identitätsmerkmal ist ein FELD und kein Umbau — ist eine
  Tatsache über den gebauten Typ und steht am Typ GoogleEventInput.

WAS BEWUSST NICHT VERDICHTET WORDEN IST, je mit seinem Grund — im Zweifel
stehengelassen:
- **"Die Ablage-Entscheidung"** und **"Die Auflage aus der Messlücke"** bleiben
  ZEICHENGLEICH: Beide Quelldateien zitieren sie wörtlich UND nennen ihren Fundort mit
  Unterabschnitts-Titel. Eine Verdichtung machte vier Kommentarköpfe zu toten Zeigern,
  und heilen liesse sich das nur mit einer Quelldatei-Änderung — also einem
  feat-Commit für einen Doku-Vorgang.
- **"Die Grenze dieses Zuschnitts"** bleibt aus DEMSELBEN Grund, und der ist GEMESSEN
  am Repo (CC, 2026-08-25): google-payload.ts zitiert ihren Titel wörtlich mit
  ###-Marke. DAS GEHÖRT AUSDRÜCKLICH FESTGEHALTEN, weil die Auflage der Bau-Runde nur
  ZWEI zitierte Unterabschnitte kannte — es sind DREI. Wer die Liste für abschliessend
  hält, streicht einen Zeiger weg.
- **"Was ausdrücklich NICHT drin war"** und **"Die tragende Invariante"** bleiben als
  weitergeltende Ausschlüsse bzw. als Prüfstein — dieselbe Entscheidung wie bei der
  Verdichtung der Phase 11.1 (docs/claude-history/phase-11.1-linkedin.md). Auf die
  Invariante zeigt zusätzlich der Kopf von google-click-ids.ts bei Namen.

### Die Ablage-Entscheidung — sie steht als Kopfsatz in BEIDEN Dateien

WÖRTLICH ZU VERMERKEN UND WÖRTLICH IN BEIDE DATEIEN ZU ÜBERNEHMEN:

  Beide Dateien sind REIN — KEIN import "server-only". Grund: der spätere
  google-forward.ts ist server-only und muss sie importieren; die Richtung
  server-only -> rein gilt und nicht umgekehrt. Sie sind die ersten reinen Dateien in
  src/lib/capi/. Das ist Absicht und kein zu heilender Ausreisser. Ohne diesen
  Kopfsatz fügt die nächste Aufräumrunde server-only hinzu und sperrt sie zu.

DAS MUSTER IST NICHT NEU, NUR DER ORT: Dieselbe Richtung ist an drei Stellen im Repo
bereits begründet — der Kopf von redact.ts ("server-only-Dateien duerfen DIESE hier
importieren, NIE umgekehrt"), der Kopf von tracking/event-names.ts ("Die Richtung
bleibt server-only -> rein, nie umgekehrt") und der Kopf von tracking/consent-wire.ts.
GEMESSEN am Repo (2026-08-25): In src/lib/capi/ trägt heute JEDE Produktivdatei
ausser ingest.ts und proxy.ts "import server-only" in Zeile 1. Der Kopfsatz ist genau
deshalb Pflicht — in DIESEM Verzeichnis sieht eine reine Datei wie ein Versehen aus.

### Die Auflage aus der Messlücke — die wichtigste des Zuschnitts

DIE EXTRAKTION PRÜFT DIE ANWESENHEIT EINES WERTS, NIE SEINE FORM. Keine
Längenprüfung, keine Zeichensatzprüfung, kein Präfixmuster, keine Plausibilität.

DER GRUND, und ohne ihn wird die Auflage bei der nächsten Politur als
Nachlässigkeit "repariert": GEMESSEN ist ein SELBSTGESETZTER Testwert (Vermerk 1);
eine echte gclid ist eine undurchsichtige Zeichenkette, über deren Form NICHTS
gelesen und NICHTS gemessen ist. Jede Formprüfung wäre am Testwert grün und im
Echtfall ein RIEGEL — und der Riegel wäre still: kein Fehler, keine Logzeile, nur
eine Conversion, die nicht ankommt.

DIE PROBE, DIE DIESE AUFLAGE TRÄGT: Ein Test setzt einen Wert ein, der einer echten
Kennung UNÄHNLICH ist, und verlangt, dass er unverändert herauskommt.

### Was ausdrücklich NICHT drin war, je mit seinem Grund — GILT WEITER, IST ABER KEIN ZUSCHNITT MEHR

Die Ausschlüsse sind mit dem Vollzug NICHT erledigt; erledigt ist nur ihre Rolle als
Zuschnitt DIESER Scheibe. Sie binden ab jetzt die TRANSPORT-Scheibe — wer sie nicht
liest, baut die Autorisierungsschicht überangepasst oder legt ein Ziel an, für das es
keinen Ort gibt.

- **KEIN EINGRIFF IN ingest.ts, FORWARDER_BY_TARGET, TRACKING_TARGETS,
  CONSENT_KEY_BY_TARGET ODER target-adapters.ts.** Diese Scheibe fügt kein Ziel
  hinzu. Solange 'google' nicht in TRACKING_TARGETS steht, gibt es keinen Empfänger,
  keinen Consent-Schlüssel und keinen Eintrag im Fan-Out — und die zwei Dateien haben
  im Produktivcode keinen Aufrufer.
- **KEINE MIGRATION, KEINE ZUGANGSDATEN-ABLAGE.** Und der Grund ist kein
  Zuschnitt-Geschmack, sondern ein benanntes Risiko: Die Zugangsdaten haben noch
  KEINEN Ort. Das SCHEMA-RISIKO steht an docs/roadmap.md, Zeile 11.2 ("mehrwertige
  Anmeldungen passen nicht auf ein Geheimnis pro Zeile") und gilt seit dem 2026-08-14
  ausdrücklich auch für Zeile 11.1; die AUTORISIERUNGSSCHICHT ist beiden Zeilen
  gemeinsames Fundament und gehört keiner allein. Wer sie in dieser Scheibe
  mitnähme, baute sie überangepasst und ein zweites Mal.
- **KEIN UI, KEIN NETZAUFRUF, KEIN TRANSPORT.** Die Nutzlast wird GEBAUT, nicht
  gesendet. Damit berührt die Scheibe die Restlücke aus Vermerk 1 (echte gclid,
  Mehr-Seiten-Fall) nicht.
- **KEIN userData, KEIN HASHEN, KEIN GOOGLE-TAG.** Übernommen aus der
  Gestalt-Entscheidung (Abschnitt "### (3)" und docs/roadmap.md, Zeile 11.2), nicht
  hier neu entschieden.

### Die tragende Invariante

**Nach dieser Scheibe verhält sich die Anwendung EXAKT wie vorher — an jedem Pfad,
für jedes Projekt.** Die zwei Dateien haben im Produktivcode KEINEN Aufrufer; nur
ihre Tests rufen sie. Sie ist der Prüfstein jeder Änderung dieser Scheibe: Wer einen
Aufrufer hinzufügt, hat nicht mehr diese Scheibe gebaut.

### Die Grenze dieses Zuschnitts — warum trotz ungemessener Wire-Form gebaut wird

DER EINWAND ZUERST, UND ER IST BERECHTIGT: Sämtliche Feldnamen, Verschachtelungen
und Formatvorgaben dieser Scheibe sind GELESEN und NIE GEMESSEN. Vier Widersprüche
der Anbieter-Doku sind unaufgelöst (docs/ziel-befunde.md, Teil (y)), und EINER davon
betrifft nicht ein Feld, sondern JEDEN SCHLÜSSEL DER ERZEUGTEN NUTZLAST: camelCase
gegen snake_case, in Teil (u), Frage 4, ausdrücklich als "AN DER DOKU NICHT
ENTSCHEIDBAR" geführt. Ein Bau auf dieser Grundlage kann in Gänze am ersten echten
Aufruf scheitern.

ERWOGEN UND VERWORFEN: den Nutzlast-Bau bis zur ersten Messung ZURÜCKZUSTELLEN und
in dieser Scheibe nur die Extraktion zu bauen.

GRUND DER FREIGABE — ER LIEGT IN DER STRUKTUR, NICHT IN DEN NAMEN: Was diese Scheibe
festlegt, ist von den Feldnamen UNABHÄNGIG und trägt unabhängig davon, wie die
Messung ausgeht — die Trennung in zwei Ebenen (Event gegen Anfrage), die MENGE von
Identitätsmerkmalen statt einer einzelnen Kennung, und die Verwerfung statt einer
halben Nutzlast. Diese drei sind die eigentliche Arbeit. Widerlegt die Messung die
Schreibweise oder einen Namen, ist der Rework ein SUCHEN-ERSETZEN IN EINEM
OBJEKTLITERAL — und weil die Datei keinen Aufrufer hat, endet er dort.

WAS DARAUS FOLGT, UND ES IST DER TEIL, DEN MAN SPÄTER VERGISST: DIE FELDNAMEN SIND
KEIN BELEGTER STAND. Wer sie später zitiert — in einer Anleitung, in einem Kommentar,
in einem Zuschnitt —, zitiert eine DOKU-LESUNG und keine Messung. Der gepinnte
Schlüsselnamen-Test ist genau dafür da: Er macht eine spätere Korrektur zu einem
sichtbaren Diff statt zu einer stillen Änderung.

## Abgeschlossene Scheiben-Vermerke

### VERMERK 1 (Commit 2d0b59e) — DIE GESTALT-ENTSCHEIDUNG UND DIE MESSUNG DER KLICK-KENNUNG

**WAS ENTSCHIEDEN WURDE:** Die Gestalt für Google Ads ist der OFFLINE CONVERSION
IMPORT auf Basis der Klick-Kennungen, nicht die zusätzliche Datenquelle zur
Tag-Conversion (Multi-Source). Vollzogen an DREI Orten — docs/roadmap.md
(Eintrag 11.2), diese Datei (Abschnitt "### (3)") und CLAUDE.md (Abschnitt
"## Modus"). PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-24.
DIE BEGRÜNDUNG WIRD HIER NICHT WIEDERHOLT — sie steht im Commit 2d0b59e und im
Roadmap-Eintrag. Zweimal geschrieben liefe sie auseinander.

**DER MESSWERT — GEMESSEN 2026-08-24 vom OWNER, LIVE an einer veröffentlichten
Seite:** Aufruf der Seite mit `?gclid=<Testwert>`, Conversion ausgelöst, die
Nutzlast des POST auf /api/e gelesen. **eventSourceUrl trug die VOLLSTÄNDIGE URL
einschliesslich des Testwerts.** Die Adresszeile hat sich zwischen Aufruf und
Conversion nicht verändert.
**FOLGE:** Die Klick-Kennung erreicht den Server HEUTE SCHON — ohne Änderung am
Emitter, an der Serve-Route oder an einer Cookie-Architektur.

**WAS DIE MESSUNG NICHT ZEIGT, und dieser Teil gehört zwingend dazu:**
- Dass eine ECHTE gclid von Google denselben Weg nimmt. NICHT GEPRÜFT — sie reist
  im selben Query-String, aber das ist eine Ableitung und kein Messwert.
- Ob die Kennung auf einer Seite mit MEHREREN SCHRITTEN überlebt. GEMESSEN ist
  ein EIN-SEITEN-FALL.

**DIE GRENZE DES TRANSPORTS — GEMESSEN am Code, 2026-08-24:** eventSourceUrl wird
NICHT PERSISTIERT. persistEvent (src/lib/analytics/persist.ts) schreibt fünf
Werte, und keiner davon stammt aus den optionalen Rumpf-Feldern; die URL wird
ausschliesslich an die Adapter weitergereicht. **Die Kennung existiert für die
Dauer EINES Forwards.**

### VERMERK 2 (Commit 6653f37) — SCHEIBE 11.2a IST GEBAUT

**WAS GEBAUT WURDE — GEMESSEN am Repo (CC, 2026-08-25):** VIER neue Dateien, keine
bestehende angefasst. Zwei reine Quelldateien — extractGoogleClickIds
(src/lib/capi/google-click-ids.ts) und buildGoogleEvent plus
buildIngestEventsRequest (src/lib/capi/google-payload.ts) — und zwei Testdateien
daneben, zusammen 21 Tests. Die Suite steht damit bei 60 Dateien und 1158 Tests, kein
Bestandstest ist gefallen oder verändert worden.
**KEIN AUFRUFER IM PRODUKTIVCODE**, und das ist der Zuschnitt und kein Versehen: nur
die Tests rufen die beiden. Der Bau-Commit ist 6653f37; alle vier Gates waren vor ihm
grün (tsc, eslint, vitest, next build).

**DER BEWEIS UND SEINE GRENZE, und beides gehört zusammen:** Der Beweis dieser Scheibe
sind TESTS. **EINEN LIVE-TEST GIBT ES NICHT**, weil nichts gesendet wird — und
gesendet wird nichts, weil die Zugangsdaten keinen Ort haben (s. den Ausschluss "KEINE
MIGRATION, KEINE ZUGANGSDATEN-ABLAGE" im Zuschnitt).
DAS IST EINE AUSNAHME VON EINER DAUERHAFTEN REGEL UND WIRD DESHALB HIER BENANNT:
"Jede Bau-Freigabe an CC endet mit einer expliziten Live-Test-Anweisung"
(docs/immer-beachten.md). SIE GILT UNVERÄNDERT WEITER und hat an dieser Scheibe nur
keinen Gegenstand. **DIE NÄCHSTE SCHEIBE SCHULDET IHN NACH — für diese hier UND für
die eigene.** Wer das übersieht, hat eine Scheibe ohne Live-Nachweis im Rücken und
merkt es nicht, weil an ihr nichts rot ist.

**DIE DREI MUTATIONSPROBEN — GEMESSEN am 2026-08-25, je mit Vorhersage VOR dem Lauf,
danach zurückgenommen; keine ist im Bau-Commit:**
- **Zeitstempel auf Epochen-Millisekunden.** Vorhergesagt: die Klasse "Zusicherungen
  über die Gestalt des Zeitstempels". Gefallen ist GENAU der gepinnte
  Zeitstempel-Test. Kein Überschuss.
- **Ein Schlüsselname auf snake_case (conversionValue).** Vorhergesagt: die Klasse
  "ein Schlüssel steht nicht unter dem erwarteten Namen". Gefallen sind ZWEI Tests —
  **UND DER ÜBERSCHUSS IST GEPRÜFT WORDEN, NICHT VERBUCHT:** Beide melden DIESELBE
  Fehlerklasse, einmal als Mengenbruch der Schlüsselliste, einmal als fehlender Wert
  am erwarteten Namen. Das ist eine ZWEITE BEOBACHTUNG DESSELBEN BRUCHS und damit
  Deckung — KEINE Kaskade. Die Unterscheidung ist die Auflage aus Lektion (g) an
  "MUTATIONSPROBEN UND LIVE-TEST-INSTRUMENTE" (docs/immer-beachten.md), und sie ist
  hier ausdrücklich vollzogen worden.
- **Der Verwerfungs-Zweig entfernt.** Vorhergesagt: die Klasse "es entsteht eine
  Nutzlast, wo keine entstehen darf". Gefallen sind ZWEI Tests, beide mit derselben
  Meldung und derselben Ursache.
KEINE Mutation blieb grün; die Unterscheidung "hohler Test gegen schlechtes
Mutationsmodell" war deshalb nicht zu treffen.

**EIN NACHTRÄGLICH GESCHLOSSENER WÄCHTER, weil er sonst als gebaut gilt:** Die
schreibungssensitive Wahl der Parameternamen stand nach dem ersten Bau OHNE Test da —
gemeldet, nicht stillschweigend hingenommen. Der Test ist vor dem Commit ergänzt
worden und trägt seine Gegenprobe im selben Lauf; er bewacht NICHT, dass die Wahl
richtig ist (sie ruht auf nichts Gelesenem), sondern dass ihre Änderung SICHTBAR wird.

**WAS DIESER VERMERK AUS DEM VERDICHTETEN ZUSCHNITT AUFNIMMT** — die drei entfallenen
Unterabschnitte sind oben im Abschnitt "### Vollzogen" einzeln benannt; ihr Inhalt
steht hier: der Gegenstand (zwei Dateien, ihre Symbolnamen, kein Aufrufer) im ersten
Absatz, der Beweis-Grund samt der Schuld der nächsten Scheibe im zweiten. Die eine
fortwirkende Aussage aus "Warum der Schnitt nichts verbaut" ist NICHT hierher gewandert,
sondern an den Typ GoogleEventInput — sie ist eine Tatsache über den gebauten Code und
gehört an den Code.

**PROVENIENZ:** Umfang, Testzahl und Gate-Ergebnisse GEMESSEN am Repo bzw. an den
Läufen vom 2026-08-25. Die Mutationsergebnisse GEMESSEN am selben Tag. Der Satz über
den fehlenden Live-Test ist eine FOLGE aus dem Zuschnitt, keine Messung.

### VERMERK 3 (Commit 18d0ff5) — DER TRÄGER DES ZUGANGSDATUMS IST GEMESSEN, DIE SPERRE IST GEFALLEN

**WAS GESCHEHEN IST — ZWEI ARBEITEN AN EINEM TAG, MIT VERSCHIEDENER PROVENIENZ:** Ein
zugespitzter Doku-Lauf über SIEBEN Seiten (GELESEN 2026-08-28, CC) und MESSUNG A gegen
`events:ingest` (GEMESSEN 2026-08-28, OWNER, live). **DER DOKU-LAUF HAT DIE FRAGE NICHT
BEANTWORTET, DIE MESSUNG HAT SIE BEANTWORTET.**

**DER BEFUND STEHT NICHT HIER, SONDERN IN docs/ziel-befunde.md**, Google-Abschnitt, Teile
(bh) bis (bm) — der Doku-Lauf mit seinem Umfang und seinen Reitern in (bh), der
Strukturbefund über beide Referenzseiten in (bi), die drei Aufrufe in (bj), der Schluss in
(bk), die Auflösung des Widerspruchs aus (j)/B4 in (bl), die vier Grenzen in (bm).
**ZWEIMAL GESCHRIEBEN LIEFE ES AUSEINANDER**, deshalb hier nur der Zeiger.

**DAS EINE ERGEBNIS IN EINEM SATZ:** Der Träger ist die Kopfzeile `Authorization` mit dem
Wert `Bearer ` + Token — GEMESSEN, nicht gelesen.

**DIE SPERRE "TRÄGER DES ZUGANGSDATUMS" IST DAMIT GEFALLEN.** Sie war der erste der zwei
Blocker, die docs/roadmap.md, Eintrag 11.2 und Eintrag 11.8 vor einem Zuschnitt führen.

---

**WELCHE VORBEDINGUNGEN DER TRANSPORT-SCHEIBE DAVON NICHT BERÜHRT SIND — DREI, UND DIESE
AUFZÄHLUNG IST DER TEIL DIESES VERMERKS, DER ÜBER DIE RUNDE HINAUS BINDET.** Ohne sie liest
jemand "Sperre gefallen" als "baubar", und genau das folgt daraus nicht:

- **DIE DATENKLASSEN-GRENZE IST NICHT ENTSCHIEDEN.** Sie ist eine OWNER-Entscheidung und
  steht aus. Volltext: die bindende Entscheidung (5) in DIESER Datei
  (docs/aktiver-stand.md), Abschnitt "Entscheidungen, die über ihre Scheibe hinaus binden" —
  dort ausdrücklich als VORBEDINGUNG der Transport-Scheibe geführt, mit dem Satz "DIE
  ENTSCHEIDUNG FÄLLT DER OWNER, UND ZWAR VOR DER TRANSPORT-SCHEIBE". **Messung A berührt sie
  nicht:** Sie sagt, WIE ein Zugangsdatum reist, nicht, WELCHE Merkmale verarbeitet werden
  dürfen.
- **DIE SIEBEN-TAGE-FRIST IM PUBLISHING-STATUS "TESTING".** Ein Erneuerungs-Token lebt dort
  sieben Tage (GELESEN 2026-08-25, docs/ziel-befunde.md, Google-Abschnitt, Teil (af)). Sie
  gehört als PFLICHT-HINWEIS in jede Live-Test-Anleitung dieser Phase — sonst wird ein
  abgelaufenes Zugangsdatum als Defekt gejagt. Dieselbe Auflage steht in
  docs/aktiver-stand-11.8.md und in docs/roadmap.md, Eintrag 11.8; sie wird hier NICHT
  verdoppelt, sondern genannt, weil sie den Bau dieser Phase trifft.
- **DER NACHGESCHULDETE LIVE-NACHWEIS DER SCHEIBE 11.2a.** Vermerk 2 in DIESER Datei hält
  fest: "EINEN LIVE-TEST GIBT ES NICHT" und "DIE NÄCHSTE SCHEIBE SCHULDET IHN NACH — für
  diese hier UND für die eigene". **MESSUNG A IST DIESER NACHWEIS NICHT** und darf nicht als
  solcher verbucht werden: Sie hat keine Zeile Produktivcode ausgeführt, keinen Aufrufer
  hergestellt und keine Funktion dieser Scheibe berührt. Sie ist ein Aufruf gegen ein FREMDES
  System mit einem erfundenen Sondierungsrumpf. Die Schuld steht unverändert.

**DER VORRATS-EINTRAG 4 IST UNBERÜHRT** — "DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH
AUF NICHTS GELESENES", im Abschnitt "Vorrat (gemeldet, nicht gebaut)" DIESER Datei
(docs/aktiver-stand.md). **Messung A hat keinen Query-String angefasst:** Sie hat eine
Kopfzeile und einen Rumpf gesetzt, keine Ziel-URL mit Parametern aufgerufen. Der dort
festgehaltene Satz "DIE ERSTE MESSUNG NIMMT SIE MIT" ist also NICHT eingelöst; wer Messung A
dafür hält, streicht einen offenen Punkt, der offen ist.

**PROVENIENZ, JE TEIL:** Der Doku-Lauf GELESEN 2026-08-28 (CC), sieben Seiten mit
ausgewiesenem Umfang; Messung A GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt. Der
Satz über das Fallen der Sperre ist eine FOLGE aus Messung A. Die drei Vorbedingungen sind
GEMESSEN am Dateitext (CC, 2026-08-28) — sie stehen an den genannten Orten und sind dort
nachgelesen, nicht erinnert.

## Entscheidungen, die über ihre Scheibe hinaus binden

Fünf Stück, alle am 2026-08-25 mit dem Zuschnitt der Scheibe 11.2a getroffen. Je
Eintrag: die ENTSCHEIDUNG, ihr GRUND und ihre GRENZE. Die Befunde selbst werden NICHT
verdoppelt — sie stehen in docs/ziel-befunde.md bzw. an der Roadmap-Zeile 11.2, und
zwei Fassungen liefen auseinander.

**(1) ABLAGE UND LADEKLASSE DER GOOGLE-DATEIEN.**
ENTSCHEIDUNG: Beide Dateien liegen in src/lib/capi/ und sind REIN — kein
import "server-only", kein "use client". Der Kopfsatz aus dem Zuschnitt steht wörtlich
in beiden.
GRUND: Der spätere google-forward.ts ist server-only und muss sie importieren; die
Richtung server-only -> rein gilt und nicht umgekehrt (dasselbe Muster wie bei
redact.ts und tracking/event-names.ts).
GRENZE: Sie sagt NICHTS darüber, ob ein späterer Konsument im BROWSER entsteht. Wird
einer gebraucht, ist das eine eigene Frage — die Reinheit erlaubt ihn, sie verlangt
ihn nicht.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25.

**(2) eventSource WIRD VOM AUFRUFER GELIEFERT, NIE IN DER FUNKTION GEWÄHLT.**
ENTSCHEIDUNG: Der Nutzlast-Bau nimmt eventSource als Parameter entgegen und setzt
keinen Vorgabewert.
GRUND: Beim Offline Conversion Import ist das Feld PFLICHT — GELESEN, docs/ziel-befunde.md,
Teil (l)/D5, und bestätigt an der Roadmap-Zeile 11.2 ("ZWEI RANG-WECHSEL"). WELCHER
Wert der richtige ist, sagt dieselbe Quelle NICHT: sie verlangt "ein Wert des
EventSource-Enums" und nennt in Teil (w)/F3 fünf mögliche (WEB, APP, IN_STORE, PHONE,
MESSAGE), ohne einen davon dieser Gestalt zuzuordnen. Eine Wahl IN der Funktion wäre
eine unbelegte Festlegung an der schlechtestmöglichen Stelle — unsichtbar für jeden
Aufrufer.
GRENZE, UND SIE IST ZWEITEILIG:
· Die Entscheidung entfällt, sobald der Wert GEMESSEN ist. Das Instrument dafür ist
  validateOnly=true gegen den echten Endpunkt (GELESEN, Teil (p)/H4: "Set validateOnly
  to true to validate the request without applying the changes").
· DER PREIS DES INSTRUMENTS GEHÖRT DAZU: Mit validateOnly=true ist laut derselben
  Quelle GAR KEINE Diagnostik abrufbar (Teil (p)). Das Instrument beantwortet also
  "wird die Anfrage angenommen", nicht "ist der Wert der fachlich richtige".
EIN BEFUND ZUR BEGRÜNDUNG SELBST, damit er nicht stärker gelesen wird als er ist:
docs/ziel-befunde.md führt für die Frage "welcher EventSource-Wert gilt beim
Offline-Import" KEINEN NICHT-TREFFER MIT BENANNTER REICHWEITE. Es ist also nicht
belegt, dass danach gesucht wurde — belegt ist nur, dass keine gelesene Stelle den
Wert nennt. Der Unterschied ist der zwischen "abgesucht und nicht gefunden" und
"nicht gefunden"; die Regel "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN HOHL"
verlangt hier die schwächere Formulierung.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25 auf GELESENER Grundlage. KEINE Messung.

ZUSATZ 2026-08-25 — DER ABSATZ DARÜBER BLEIBT WÖRTLICH STEHEN, UND SEINE AUSSAGE IST
ÜBERHOLT. Er sagt, für die Frage "welcher EventSource-Wert gilt beim Offline-Import"
liege KEIN Nicht-Treffer mit benannter Reichweite vor. Das war am 2026-08-25 richtig
und ist es seit dem Doku-Lauf desselben Tages nicht mehr.
DER BEFUND — GELESEN 2026-08-25 an der Anbieter-Doku, docs/ziel-befunde.md,
Google-Abschnitt, Teil (aj) und Teil (ap) (Quelle: /devguides/events/send-events,
Doku-Stand 2026-08-18): Die Anforderungstabelle jener Seite führt ZWEI Zeilen
nebeneinander. Für die MULTI-SOURCE-Gestalt nennt sie einen konkreten Wert —
eventSource "Optional. If set, must be WEB." Für die OFFLINE-Gestalt, also unsere,
nennt sie KEINEN — dort steht nur "Required. Set to one of the enum values for
EventSource."
WAS SICH DAMIT ÄNDERT, UND ES IST NUR DIES: Die Abwesenheit ist jetzt BELEGT statt
bloss unbemerkt. Es ist an einer benannten Stelle nachgewiesen, dass der Anbieter für
die Nachbarzeile einen Wert nennt und für unsere nicht — das ist ein NICHT-TREFFER MIT
BENANNTER REICHWEITE, und die Regel "EINE ABWESENHEITS-BEHAUPTUNG WIRD AUF DREI WEISEN
HOHL" verlangt die schwächere Formulierung hier nicht mehr.
WAS SICH NICHT ÄNDERT: **DER WERT SELBST IST WEITERHIN NICHT BENANNT.** Die bindende
Entscheidung (2) gilt UNVERÄNDERT — eventSource wird vom Aufrufer geliefert und nie in
der Funktion gewählt. Auch ihre zweiteilige GRENZE bleibt: Die Entscheidung entfällt,
sobald der Wert GEMESSEN ist, und validateOnly=true beantwortet "wird die Anfrage
angenommen", nicht "ist der Wert der fachlich richtige".
PROVENIENZ: GELESEN 2026-08-25 an /devguides/events/send-events (Doku-Stand 2026-08-18).
KEINE Messung.

**(3) KEINE NUTZLAST OHNE KLICK-KENNUNG.**
ENTSCHEIDUNG: Kann keine Klick-Kennung gebildet werden, entsteht KEINE Nutzlast —
buildGoogleEvent gibt einen Verwerfungsgrund zurück. DIE ENTSCHEIDUNG IST EINE
AUSSAGE ÜBER DIESE FUNKTION UND BINDET DEN TRANSPORT NICHT.
GRUND: Damit ist die STRENGERE der beiden widersprüchlichen Lesarten erfüllt. Der
Leitfaden verlangt mindestens eine Kennung aus einer Fünfer-Liste
(docs/ziel-befunde.md, Teil (l)/D5), die Referenz kennt gar keine Pflicht und markiert
jedes Identitätsfeld als Optional (Teil (w)/D5 und Teil (u), Frage 3). Wer die
schwächere Lesart baut, hat im Fehlerfall FAST-FAIL gegen sich: ein einziger
Pflichtfeld-Fehler verwirft die GANZE Anfrage, nicht den einen Datensatz (Teil (l)/D5).
GRENZE, ERSTER TEIL: DER WIDERSPRUCH IST DAMIT UMGANGEN, NICHT AUFGELÖST. Er steht
unverändert in docs/ziel-befunde.md, Teil (y), als Widerspruch 1 ("VERSCHÄRFT, NICHT
AUFGELÖST" — vier Stellen, drei Aussagen). Wer ihn später auflöst, prüft diese
Entscheidung neu; sie könnte dann zu streng sein und Conversions verwerfen, die der
Anbieter angenommen hätte.
GRENZE, ZWEITER TEIL — UND ER IST DER GRUND FÜR DIE UMFORMULIERUNG: Sie sagt NICHTS
darüber, OB und UNTER WELCHER BEDINGUNG eine Klick-Kennung tatsächlich an Google
hinausgeht. Das ist eine Frage der TRANSPORT-Scheibe. Eine frühere Fassung dieser
Entscheidung hiess "WIR SENDEN IMMER MINDESTENS EINE KLICK-KENNUNG" und band damit
den Transport mit — sie ist am 2026-08-25 ersetzt worden, bevor sie je galt.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-25 auf GELESENER Grundlage. KEINE Messung.

**(4) DER EINWILLIGUNGS-RIEGEL IST FAIL-CLOSED UND ERREICHT BESTEHENDE SEITEN NICHT.**
ENTSCHEIDUNG: Der Zustand wird als bindende Tatsache festgehalten und NICHT geheilt.
GRUND — GEMESSEN AM CODE (CC, 2026-08-25), consentAllows in
src/lib/tracking/consent-wire.ts, die drei Zweige:
· Das Feld cns GANZ ABWESEND -> ERLAUBT. Begründet an Ort und Stelle: eine Seite, die
  älter ist als das Feld, verlöre sonst still ihren Forward.
· Das Feld VORHANDEN, der Ziel-Schlüssel darin FEHLT -> der Zweig mit dem Vergleich
  auf === true liest undefined und gibt false zurück: VERWEIGERT.
· Jede heute veröffentlichte Seite trägt ein cns-Objekt OHNE google.
FOLGE: Nach dem Verdrahten sendet KEINE bestehende Seite an Google, bis sie NEU
VERÖFFENTLICHT ist. EIN CODE-DEPLOY ERREICHT DAS NICHT — der Schlüssel geht zur
VERÖFFENTLICHUNGSZEIT in den ausgelieferten Text.
DAS IST DERSELBE MECHANISMUS WIE IN DER REGEL "EIN AUSGELIEFERTES ARTEFAKT ALTERT
NICHT MIT DEM DEPLOY" (docs/immer-beachten.md), dort BELEG 2 — und es ist derselbe
Consent-Draht, an dem jene Regel ihn beschreibt. Diese Entscheidung erfindet nichts,
sie stellt fest, dass der bekannte Fall beim fünften Ziel WIEDER eintritt.
GRENZE: Sie sagt NICHT, wie das Neu-Veröffentlichen ausgelöst oder angezeigt wird.
Der offene Punkt "NICHTS ZEIGT AN, DASS DER VERÖFFENTLICHTE STAND NACHZUZIEHEN IST"
(CLAUDE.md, "## Offene Punkte") trägt genau diese Frage und ist mit EINGETRETENEM
Trigger geführt. Hier wird sie NICHT entschieden.
PROVENIENZ: GEMESSEN am Code, 2026-08-25 (der Zweig); die Folge für bestehende Seiten
ist eine ABLEITUNG aus diesem Zweig und der Erzeugungszeit des Schlüssels, KEINE
Messung an einer veröffentlichten Seite.

**(5) DIE DATENKLASSEN-GRENZE IST VORBEDINGUNG DER TRANSPORT-SCHEIBE — UND SIE IST
HIER NICHT ENTSCHIEDEN.**
Dieser Eintrag steht unter den BINDENDEN ENTSCHEIDUNGEN und nicht im Vorrat, obwohl
er nichts entscheidet. Der Grund ist sein Ort: Er muss beim Zuschneiden der
Transport-Scheibe unübersehbar sein, und der Vorrat wird beim Zuschneiden nicht
zwingend gelesen.
DER BEFUND — GEMESSEN am Dateitext (CC, 2026-08-25): Der offene Punkt
"DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE" (docs/offene-punkte.md) nennt in
seinem Trigger an ERSTER Stelle "Click-IDs". Die Präzisierung vom 2026-08-19 zieht
die Achse NUTZER-EINGABEN gegen INFRASTRUKTUR-DATEN — und eine Klick-Kennung fällt
unter keine von beiden: Der Besucher tippt sie nicht, und sie ist keine Angabe des
Transports. Derselbe Eintrag sagt für die erste Kategorie ausdrücklich: "Für ANDERE
Nutzer-Eingaben ist sie NICHT getroffen."
DIESE SCHEIBE LÖST DIE VORBEDINGUNG NICHT AUS, und das ist eine Feststellung, keine
Beruhigung: Eine reine Funktion ohne Aufrufer ERFASST NICHTS. Der Trigger des offenen
Punktes lautet "die erste Scheibe, die personenbezogene Merkmale ERFASST" — Scheibe
11.2a tut es nicht.
ALS KANDIDAT, AUSDRÜCKLICH NICHT ALS ENTSCHEIDUNG (ARCHITEKT, 2026-08-25): Eine
gclid ist strukturell näher an IP/UA als an einer E-Mail — der Besucher tippt sie
nicht, wir bilden sie nicht, wir können sie nicht auflösen, und sie wird an ihren
URHEBER zurückgereicht. Die Klartext-Auflage zielt erkennbar auf NUTZER-EINGABEN,
wo Hashen möglich und vom Anbieter verlangt ist; eine gclid ist NICHT HASHBAR, weil
Google sie im Klartext erwartet. Das spricht für eine DRITTE KLASSE —
"fremdvergebene, für uns undurchsichtige Kennung" —, NICHT für eine Ausnahme von
einer der beiden bestehenden.
DIE GRENZE, UND SIE IST DER TRAGENDE TEIL DIESES EINTRAGS: Das ist eine TECHNISCHE
Einordnung, KEINE RECHTLICHE. Sie sagt, wo das Merkmal in die bestehende Systematik
passt, nicht ob es verarbeitet werden darf. DIE ENTSCHEIDUNG FÄLLT DER OWNER, UND
ZWAR VOR DER TRANSPORT-SCHEIBE. Der Satz "NICHT-SPEICHERN IST NICHT NICHT-VERARBEITEN"
aus jenem offenen Punkt gilt unverändert mit.
WAS HEUTE SCHON GILT UND NICHT ERST ENTSCHIEDEN WERDEN MUSS: Die allgemeine
Festlegung vom 2026-08-15 ("ein Identitäts-Merkmal wird ausschliesslich
DURCHGELEITET … events bleibt identitätsfrei") ist für die Klick-Kennung erfüllt —
GEMESSEN am Code, 2026-08-24 (Vermerk 1): persistEvent schreibt eventSourceUrl
nicht.
PROVENIENZ, JE TEIL: der Befund GEMESSEN am Dateitext (CC, 2026-08-25); die
Nicht-Auslösung GEMESSEN am Zuschnitt dieser Scheibe; der Kandidat eine
ARCHITEKTEN-EINORDNUNG (2026-08-25), keine Messung und keine Ableitung; die
Erfüllung der Festlegung GEMESSEN am Code (2026-08-24, Vermerk 1).

VORBEHALT 2026-08-28 — DER KANDIDAT IST EINE OWNER-ENTSCHEIDUNG GEWORDEN. Der Text
darüber bleibt ZEICHEN FÜR ZEICHEN stehen; dieser Vorbehalt tritt DANEBEN und sagt,
was an ihm heute noch trägt.
· ÜBERHOLT IST GENAU EINE ANGABE: die Einleitung "ALS KANDIDAT, AUSDRÜCKLICH NICHT ALS
  ENTSCHEIDUNG (ARCHITEKT, 2026-08-25)". Sie IST seit dem 2026-08-28 eine Entscheidung.
· DIE ENTSCHEIDUNG, IN EINEM SATZ: Die Datenklassen-Achse bekommt eine DRITTE Klasse —
  FREMDVERGEBENE, FÜR UNS UNDURCHSICHTIGE KENNUNG (gclid, gbraid, wbraid und künftige
  Klick-Kennungen anderer Anbieter), mit der Auflage TRANSIT-ONLY: niemals in die
  Datenbank, niemals in ein Log, kein Hashen. IHR ORT IST docs/offene-punkte.md, Eintrag
  "DATENKLASSEN-GRENZE VOR DER ERSTEN PII-SCHEIBE", Block vom 2026-08-28. Dort steht sie
  vollständig mit ihren zwei Begründungen, ihrer Reichweite und dem gemessenen Stand;
  hier NICHT wiederholt, zweimal geschrieben liefe es auseinander.
· WÖRTLICH RICHTIG BLEIBT DIE GANZE TECHNISCHE EINORDNUNG DARÜBER — und das ist mehr als
  eine Höflichkeit: Der Absatz hat die dritte Klasse mit exakt den Gründen vorgeschlagen,
  die die Entscheidung dann getragen haben (der Besucher tippt sie nicht, wir bilden sie
  nicht, wir können sie nicht auflösen, sie geht an ihren Urheber zurück, und sie ist
  NICHT HASHBAR). Er ist die Herleitung der Entscheidung und wird deshalb nicht gekürzt.
· DIE GRENZE GILT UNVERÄNDERT: "Das ist eine TECHNISCHE Einordnung, KEINE RECHTLICHE."
  Auch die Owner-Entscheidung sagt NICHT, ob eine Klick-Kennung personenbezogen ist; der
  Satz "NICHT-SPEICHERN IST NICHT NICHT-VERARBEITEN" gilt für sie weiter mit, und die
  vierte Frage — die Rechtsgrundlage — liegt unverändert beim Kunden.
· WAS DAMIT NICHT ERLEDIGT IST, UND DIESER PUNKT IST DER GRUND FÜR DIESEN VORBEHALT:
  DIE DATENKLASSEN-GRENZE BLEIBT VORBEDINGUNG DER TRANSPORT-SCHEIBE. Geklärt ist sie für
  die KLICK-KENNUNG. Für ANDERE Merkmale ist sie es nicht — der offene Punkt schliesst
  sich nicht. Wer aus diesem Vorbehalt "die Vorbedingung ist weg" liest, liest ihn
  falsch; die Überschrift des Eintrags oben bleibt wörtlich stehen und meint weiterhin,
  was sie sagt.
PROVENIENZ: OWNER-ENTSCHEIDUNG 2026-08-28 — keine Messung, keine Ableitung. Der
gemessene Stand, auf den sie sich stützt, steht an ihrem Ort in docs/offene-punkte.md
(GEMESSEN am Repo, CC, 2026-08-28).

## Vorrat (gemeldet, nicht gebaut)

FÜNF Befunde. Die ersten drei GEMELDET am 2026-08-24, die zwei letzten am
2026-08-25 hinzugekommen. Alle NICHT gebaut und NICHT entschieden.
NACHGEZOGEN AM 2026-08-25 — die ersten drei sind ERSETZT, nicht ergänzt: zwei
Angaben waren am Code falsch bzw. zu eng, die dritte war unvollständig. DIE ZÄHLUNG
"DREI" IST DAMIT ÜBERHOLT UND DURCH "FÜNF" ABGELÖST; sie stand hier bis zum
2026-08-25 und war für ihren Tag richtig. KEINE EMPFEHLUNG zu keinem von ihnen.

1. **DER EINWILLIGUNGS-DRAHT FÜHRT KEINEN GOOGLE-SCHLÜSSEL.** GEMESSEN AM CODE (CC,
   2026-08-25): Der Befund folgt aus TRACKING_TARGETS (src/lib/settings.ts) — die
   Liste kennt meta, pinterest, tiktok, linkedin und kein google; CONSENT_KEY_BY_TARGET
   (src/lib/tracking/consent-targets.ts) ist über dieselbe Menge erschöpfend
   geschlüsselt und trägt entsprechend keinen Google-Eintrag.
   RICHTIGGESTELLT — HIER STAND, DER BEACON-BAU "SETZT GENAU DIESE DREI SCHLÜSSEL",
   UND DAS IST AM CODE FALSCH: Der Bau des cns-Objekts in tracking/meta.ts bildet die
   Schlüssel DYNAMISCH aus seinem Parameter consentTargets, mit einem Rückfall auf den
   Meta-Schlüssel allein, wenn die Liste leer ist. Die am 2026-08-24 an der
   Live-Nutzlast beobachteten DREI sind damit ein PROJEKTABHÄNGIGER ZUSTAND (die Liste
   wird nach gesetzter Kennung gefiltert — hasPixelId in
   tracking/target-readiness.ts), KEINE Konstante im Bau.
   WARUM DAS FESTGEHALTEN WIRD, OBWOHL DER BEFUND UNVERÄNDERT GILT: Wer den alten Satz
   glaubt, sucht die Schlüsselmenge an der falschen Stelle — im Emitter statt in der
   Ziel-Liste — und hält eine dynamische Ableitung für ein Literal.
   WAS consentAllows FÜR EIN ZIEL OHNE SCHLÜSSEL TUT, IST JETZT GEPRÜFT: s. die
   bindende Entscheidung (4).
2. **GENAU EINE STELLE IM REPO ZERLEGT EINEN QUERY-STRING, UND ES IST DIE EIGENE.**
   DIE FRÜHERE FASSUNG DIESES EINTRAGS BEHAUPTETE, ES ZERLEGE KEINE — DAS IST SEIT DEM
   COMMIT 6653f37 FALSCH UND WIRD NICHT GERETTET. Der Eintrag ist ERSETZT.
   WAS VON IHM BLEIBT, IST EIN BEFUND ÜBER DEN BESTAND VORHER, und der ist als
   ZEITANGABE weiterhin richtig: Bis zum 6653f37 zerlegte KEINE Stelle im Repo einen
   Query-String — GEMESSEN am 2026-08-24 und am 2026-08-25 erneut, auf der breiteren
   Achse unten. Aufgehoben hat ihn genau dieser Commit.
   DER STAND HEUTE — GEMESSEN am Repo (CC, 2026-08-25). ACHSE: src/** über *.ts und
   *.tsx, EINSCHLIESSLICH Testdateien, binärsicher gelesen, Begriffe URLSearchParams ·
   location.search · searchParams · "new URL(" · decodeURIComponent · split("&"):
   · ZERLEGT WIRD AN GENAU EINER STELLE: extractGoogleClickIds
     (src/lib/capi/google-click-ids.ts) über URL.searchParams.
   · ZWEI URL-KONSTRUKTOREN IM PRODUKTIVCODE, und der Unterschied zwischen ihnen ist
     der Punkt: isValidRedirectUrl (src/lib/mappings.ts) baut zwar eine URL, liest
     aber AUSSCHLIESSLICH das Protokoll und rührt searchParams nicht an. Einen
     Konstruktor zu zählen ist deshalb etwas anderes, als eine Zerlegung zu zählen.
   · Alle übrigen Treffer liegen in Testdateien (proxy.test.ts,
     supabase/middleware.test.ts) und dienen dem BAUEN einer Anfrage bzw. dem Lesen
     von pathname. Auf decodeURIComponent und split("&") gibt es ausserhalb eines
     Testkommentars KEINEN Treffer.
   DIE BINÄRSICHERHEIT IST KEINE FORMALIE, UND SIE IST JETZT GEMESSEN: src/lib/mappings.ts
   trägt GENAU EIN NUL-Byte. Eine gewöhnliche Suche meldet dort "Binary file … matches"
   STATT der Trefferzeile, und ein Datei-Suchwerkzeug übergeht sie stillschweigend —
   die Datei fällt still aus jeder Achse heraus, und wer ohne diese Vorkehrung sucht,
   ÜBERSIEHT AUSGERECHNET DEN ZWEITEN KONSTRUKTOR.
3. **EIN ADAPTER HAT KEINEN RÜCKKANAL — AUF ZWEI EBENEN, NICHT AUF EINER.** GEMESSEN
   am Code (CC, 2026-08-25):
   · EBENE 1, DAS MELDEN: Der Typ Forwarder (src/lib/capi/ingest.ts) gibt
     Promise<void> zurück. Ein Adapter, der ein Ereignis verwirft, kann das nicht
     mitteilen. Dasselbe gilt für den Verteiler dispatchForward, der für ein Ziel ohne
     Adapter Promise.resolve() liefert — ein ÜBERSPRUNGENES und ein ZUGESTELLTES Ziel
     sind am Rückgabewert nicht zu unterscheiden.
   · EBENE 2, DAS SEHEN: Am Aufrufort wird das Ergebnis-Array von Promise.allSettled
     WEDER GEBUNDEN NOCH GELESEN NOCH GELOGGT; unmittelbar danach steht die 204. Ein
     abgewiesener Empfänger ist dort strukturell unbeobachtbar.
   DAS allSettled SELBST IST ABSICHT UND WIRD NICHT ANGETASTET: Es trägt das
   204-Containment — "allSettled rejectet NIE, also kann kein Empfaenger einen Wurf aus
   diesem Handler heraustragen" (Kommentar an der Fan-Out-Stelle in ingest.ts; die
   Regel dahinter ist INGEST-204-CONTAINMENT in docs/immer-beachten.md). Wer Ebene 2
   "repariert", indem er allSettled ersetzt, bricht eine Sicherheitsgarantie.
   FÜR EIN ZIEL, DAS OHNE KLICK-KENNUNG NICHTS SENDEN KANN, WÄRE DIE VERWERFUNG AUF
   BEIDEN EBENEN STUMM. Der Kandidat dazu steht in docs/claude-history/backlog-polish.md,
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN"; die Regel "JEDES WEITERE
   FAN-OUT-ZIEL BRINGT SEINE EIGENE CONSTRAINT-ERWEITERUNG MIT" hält fest, dass ein
   solcher Kanal ALLE VIER bestehenden Adapter berührt.
4. **DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH AUF NICHTS GELESENES.**
   GEBAUT WIRD schreibungssensitiv und exakt kleingeschrieben: nur gclid, gbraid und
   wbraid treffen; GCLID oder Gclid treffen nicht.
   DER GRUND FÜR DIE ENGERE WAHL: Ein exakter Vergleich kann nur VERFEHLEN, und das
   ist als fehlende Conversion sichtbar. Ein schreibungsunempfindlicher Vergleich
   könnte einen FREMDEN, zufällig gleichnamigen Parameter aufgreifen — und ein
   falscher Wert als Kennung wird vom Anbieter NICHT als Fehler gemeldet. Von zwei
   unbelegten Möglichkeiten ist die gewählt, deren Fehlschlag sichtbar ist.
   DIE LÜCKE GEHÖRT DAZU UND IST DER EIGENTLICHE INHALT DIESES EINTRAGS: Das stützt
   sich auf NICHTS GELESENES. GEMESSEN am Dateitext (2026-08-25, Achse: docs/ziel-befunde.md
   vollständig, Begriff gclid): sechs Treffer, ALLE betreffen den Feldnamen in der
   API-Nutzlast (adIdentifiers.gclid), KEINER den Namen des Parameters, den Google an
   die Ziel-URL hängt. Das ist kein Versäumnis, sondern der Zuschnitt beider
   Crawl-Läufe: ihr Gegenstand war die EINLIEFERUNGS-Schnittstelle, nicht das
   Auto-Tagging. Es gibt zu dieser Frage WEDER einen Befund NOCH einen Nicht-Treffer
   mit benannter Reichweite.
   DIE ERSTE MESSUNG NIMMT SIE MIT. KEINE bindende Entscheidung — sie steht hier und
   nicht unter den Entscheidungen, weil sie auf keiner Grundlage ruht, die eine
   Bindung tragen könnte.
5. **DREI FELDER DER NUTZLAST SIND FRAGEN DER TRANSPORT-SCHEIBE, NICHT DIESER.** Sie
   stehen hier, weil sie sonst zwischen die Scheiben fielen: Diese Scheibe baut sie
   nicht, und die Transport-Scheibe hätte keinen Anlass, nach ihnen zu suchen.
   · KEIN consent-OBJEKT IN DER ANFRAGE. Die Hülle kennt ein optionales consent, auf
     Anfrage- UND auf Ereignis-Ebene (GELESEN, docs/ziel-befunde.md, Teil (l)/D1).
     Wir bauen keines. Grund: Das Einwilligungs-URTEIL wird im Browser gefällt
     (buildConsentRuntime), und tracking/consent-wire.ts hält ausdrücklich fest "HIER
     STEHT KEIN ZWEITES URTEIL" — ein Google-eigenes Consent-Feld wäre ein DRITTES.
     OB es gefüllt werden muss, ist NICHT entschieden.
   · KEIN reference / destinationReferences. Bei genau EINEM Empfänger unnötig: "OHNE
     destinationReferences GEHT EIN EREIGNIS AN ALLE DESTINATIONS DER ANFRAGE — das
     ist die Vorgabe, kein Fehler" (GELESEN, Teil (k)/C3). Beim zweiten Empfänger wird
     es fällig und ist dann erzwungen eindeutig (Teil (v)/C3, DUPLICATE_DESTINATION_REFERENCE).
   · KEIN eventName. Für Google Ads optional, Pflicht nur für GA4 (GELESEN, Teil (w)/F1).

## Hebungs-Kandidaten

1. **DER EINWILLIGUNGS-RIEGEL BEIM FÜNFTEN ZIEL** — die bindende Entscheidung (4).
   WARUM KANDIDAT: Sie beschreibt keinen Google-Sonderfall, sondern eine Eigenschaft,
   die bei JEDEM weiteren Fan-Out-Ziel eintritt und beim vierten schon eingetreten
   ist. Die dauerhafte Regel "EIN AUSGELIEFERTES ARTEFAKT ALTERT NICHT MIT DEM DEPLOY"
   führt den Consent-Draht bereits als BELEG 2 — was fehlt, ist die FOLGE für den
   Betrieb: dass ein neues Ziel bei bestehenden Seiten fail-closed anläuft und ein
   Deploy das nicht heilt.
   NICHT ENTSCHIEDEN: ob das eine eigene Regel wird oder ein Absatz an der
   bestehenden. KEINE EMPFEHLUNG.

2. **DIE LISTE "GESEHEN, NICHT GEÖFFNET" IST DER ORT, AN DEM SICH EIN BEFUND VERSTECKT**
   (angetreten 2026-08-25, nach den Doku-Läufen 3 und 4).
   DER BEFUND — GEMESSEN am eigenen Verfahren (CC, 2026-08-25): ZWEIMAL ist eine Seite in
   der Liste "GESEHEN, NICHT GEÖFFNET" mit einem plausiblen Grund ausgeschlossen worden,
   und sie trug die Antwort auf eine Frage, die derselbe Bestand als OFFEN führte.
   /data-manager/api/devguides/quickstart/install-library stand in LAUF 1 und in LAUF 2
   unter diesem Punkt ("vom Auftrag ausgeschlossen") und trägt das REST-Beispiel mit der
   Kopfzeile `Authorization: Bearer …` — also genau den TRÄGER DES ZUGANGSDATUMS, den die
   Roadmap-Zeile 11.8 als Blocker führt und für dessen Suche sie ausdrücklich AUS dem
   Doku-Baum HERAUS verweist.
   **DIE SEITE WAR NICHT ÜBERSEHEN, SIE WAR AUSGESCHLOSSEN WORDEN.** Das ist der Punkt:
   Ein Übersehen fällt bei der nächsten Durchsicht auf, ein begründeter Ausschluss nicht —
   er sieht bei jeder Wiederholung genauso richtig aus wie beim ersten Mal.
   WARUM KANDIDAT: Das ist KEIN Google-Sonderfall, sondern eine Eigenschaft des
   CRAWL-VERFAHRENS. Es steht neben dem bereits festgehaltenen Befund, dass ein
   Navigationsbaum nicht alle Seiten eines Abschnitts führt (LAUF 1: drei Seiten fehlten,
   sichtbar nur über Fliesstext-Verweise) — beide beschreiben, wie eine Seite aus dem
   Blickfeld gerät, und beide betreffen jede künftige Anbieter-Recherche.
   DIE ABGRENZUNG, DIE MITMUSS: Die Liste selbst ist RICHTIG und wird von diesem Kandidaten
   nicht in Frage gestellt — ohne sie hätte ein "steht dort nicht" keine Reichweite (Regel
   "ANBIETER-DOKUMENTATION WIRD ABSCHNITTSWEISE GELESEN …", docs/immer-beachten.md). Der
   Kandidat sagt nicht, dass weniger ausgeschlossen werden soll, sondern dass der
   AUSSCHLUSS eine eigene Fehlerquelle ist.
   NICHT ENTSCHIEDEN: ob das eine eigene Regel wird oder ein Absatz an der bestehenden, und
   ob daraus eine Auflage folgt (etwa: die Ausschluss-Liste gegen die offenen Fragen
   halten, bevor ein Lauf beginnt). KEINE EMPFEHLUNG.

   ZUSATZ 2026-08-25 — DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN. Zwei Beobachtungen aus
   dem Supabase-Doku-Lauf desselben Tages treten daneben; die erste bestätigt den
   Kandidaten, die zweite zeigt ihn in einer Gestalt, die er bisher nicht kannte.
   · **DER KANDIDAT HAT SICH BEIM ERSTEN GEBRAUCH BEWÄHRT — und das ist selbst ein
     Befund, kein Selbstlob:** Die Seite
     supabase.com/docs/guides/platform/migrating-within-supabase/backup-restore stand
     zunächst auf der Liste "GESEHEN, NICHT GEÖFFNET", mit einem plausiblen Grund
     ("verlinkt von der Backup-Seite, betrifft die CLI-Migration"). Sie trägt die
     EINZIGE verbindliche Aussage der ganzen Lesung zu Backup und Restore verschlüsselter
     Werte. Geöffnet worden ist sie AUSSCHLIESSLICH deshalb, weil dieser Kandidat hier
     stand — ohne ihn wäre der Ausschluss zum dritten Mal so richtig ausgesehen wie beim
     ersten Mal.
   · **EINE ZWEITE GESTALT DERSELBEN SACHE, NEU: DER NICHT VORAUSGEWÄHLTE REITER.** Auf
     jener Seite trägt Schritt 5 eine Reiter-Gruppe aus zwei Reitern. Der vorausgewählte
     zeigt den Normalfall; der zweite trägt VIER Sätze, die in keinem anderen der
     achtzehn gelesenen Dokumente stehen. Im Fliesstext der Seite war davon NICHTS zu
     sehen — der Reiter musste angeklickt werden.
     DAS IST DIE REITER-VARIANTE DER SYMBOL-TABELLE: eine Aussage, die im Text nicht
     steht und trotzdem nicht als leer behandelt werden darf. Die bestehende Auflage
     ("Triffst du auf eine Tabelle, deren Aussage in SYMBOLEN steht: melden, nicht als
     leer behandeln") deckt sie NICHT, weil kein Symbol beteiligt ist.
     WARUM DAS SCHLIMMER IST ALS EIN AUSSCHLUSS: Ein Ausschluss steht wenigstens auf
     einer Liste und ist damit nachprüfbar. Ein nicht ausgewählter Reiter erzeugt
     überhaupt keinen Eintrag — die Seite gilt als GEÖFFNET und VOLLSTÄNDIG GELESEN,
     und der Umfangs-Bericht sagt das auch. Es gibt keine Stelle, an der die Lücke
     sichtbar würde.
   BEIDE BEOBACHTUNGEN BETREFFEN DAS CRAWL-VERFAHREN, NICHT SUPABASE. Sie stehen deshalb
   hier beim Kandidaten und nicht bei den Anbieter-Befunden; der Anbieter ist der Anlass,
   nicht der Gegenstand. Der Befund über Backup und Restore selbst ist hier AUSDRÜCKLICH
   NICHT wiedergegeben — sein Ort ist am 2026-08-25 offen und liegt beim Owner.
   NICHT ENTSCHIEDEN, ob daraus eine Regel wird, ob der Kandidat um die Reiter-Gestalt
   erweitert wird oder ob beides ein Absatz an einer bestehenden Regel bleibt. KEINE
   EMPFEHLUNG.
   PROVENIENZ: GEMESSEN am eigenen Lauf (CC, 2026-08-25) — der Ausschluss, das Öffnen und
   der verdeckte Reiter sind Beobachtungen an der eigenen Arbeit, nicht an einem fremden
   System. Der Inhalt der vier Sätze ist GELESEN an der genannten Seite, ebenfalls
   2026-08-25.

3. **EIN TITEL-ZEIGER AUS UMLAUTFREIEM QUELLTEXT IST INHALTLICH EINDEUTIG UND ALS
   SUCHANKER UNBRAUCHBAR** (angetreten 2026-08-28, beim Nachziehen des Kommentarkopfes
   der Callback-Route).
   DER BEFUND — GEMESSEN am Repo (CC, 2026-08-28): Der Kommentarkopf von
   src/app/api/oauth/google/callback/route.ts zitiert eine Überschrift aus
   docs/aktiver-stand-11.8.md UMLAUTFREI TRANSLITERIERT — "unberuehrt laesst" gegen
   "unberührt lässt" in der Zieldatei. Eine wörtliche Suche nach dem zitierten String
   FINDET DIE ÜBERSCHRIFT NICHT. Der Abschnitt existiert, ist eindeutig und ist am
   2026-08-28 aufgelöst worden; unbrauchbar ist nicht der Zeiger, sondern seine
   MASCHINELLE Auffindbarkeit.
   WARUM KANDIDAT — ES IST KEIN EINZELFALL, SONDERN EINE STRUKTURELLE KOLLISION ZWEIER
   GELTENDER AUFLAGEN: "KEINE UMLAUTE IM QUELLTEXT" (Auflage am Kopf derselben Datei und
   am Kopf von src/lib/oauth/google-authorize.ts) verlangt die Transliteration; die
   Zeiger-Disziplin verlangt, dass ein zitierter Titel WÖRTLICH stehen bleibt, weil er
   sonst nicht mehr auffindbar ist. BEIDE GELTEN, UND SIE SCHLIESSEN EINANDER AUS, sobald
   eine deutsche Überschrift aus Quelltext heraus zitiert wird. Das trifft JEDEN künftigen
   Titel-Zeiger dieser Art, nicht nur diesen.
   DIE ABGRENZUNG ZU "EIN ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT
   VERZEICHNIS NICHT" (docs/immer-beachten.md): Dort trifft eine Suche eine ANDERE
   Fundstelle als die gemeinte — der Schaden ist ein falscher Treffer. Hier trifft sie GAR
   KEINE. Verwandte Achse, entgegengesetzter Ausgang, und der zweite Fall ist der
   harmlosere: Ein Nicht-Treffer zwingt zum Suchen, ein falscher Treffer nicht.
   DIE ABGRENZUNG ZU "DER HALTBARE ANKER IST DER SYMBOLNAME, NICHT DIE ZEILENNUMMER"
   (docs/immer-beachten.md): Jene Regel empfiehlt den Titel GERADE ALS haltbaren Anker und
   stellt ihn der Zeilennummer gegenüber. Dieser Befund zeigt die Bedingung, unter der das
   nicht trägt — nicht weil der Titel altert, sondern weil die zitierende Datei ihn nicht
   schreiben darf, wie er dasteht.
   DIE BESTEHENDE FUNDSTELLE WIRD NICHT GEHEILT. Dieser Kandidat stellt sie fest; das
   Beheben wäre eine eigene Entscheidung und ist keine.
   NICHT ENTSCHIEDEN: ob künftige Titel umlautfrei GEWÄHLT werden, ob der Quelltext an
   Zeiger-Stellen eine Ausnahme von der Umlaut-Auflage bekommt, ob eine andere Zeigerform
   an die Stelle des Titels tritt, oder ob es bei der blossen Feststellung bleibt. KEINE
   EMPFEHLUNG.
   PROVENIENZ: GEMESSEN am Repo (CC, 2026-08-28) — die Transliteration, der Nicht-Treffer
   der wörtlichen Suche und das Vorhandensein der Zielüberschrift sind am Dateitext
   erhoben. Dass die Kollision JEDEN künftigen Zeiger dieser Art trifft, ist eine
   ABLEITUNG aus den zwei Auflagen, keine Messung.
