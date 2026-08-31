# AKTIVER STAND — PHASE 11.2 (GOOGLE)

**WAS DIESE DATEI IST:** Der steuernde Stand der LAUFENDEN Phase 11.2. Sie ist
angelegt am 2026-08-24. Existiert sie, läuft eine Phase; wird sie am Phasenende
gehoben und archiviert, verschwindet sie wieder. Verfahren: docs/arbeitsweise.md.

> **VERMERK 2026-08-27 — LIES IHN, BEVOR DU WEITERLIEST. DER KOPFSATZ DARÜBER BLEIBT
> WÖRTLICH STEHEN UND BESCHREIBT EINE PAUSIERTE PHASE.**
>
> **PHASE 11.2 PAUSIERTE VOM 2026-08-25 BIS ZUM 2026-08-28.** Sie ist NICHT abgeschlossen
> und NICHT archiviert. Ihr Stand in dieser Datei ist GÜLTIG — hier ist nichts überholt.
>
> **ERSETZT AM 2026-08-28.** Hier stand "PAUSIERT SEIT DEM 2026-08-25 … es ruht nur". Das
> ist überholt, und der Grund ist benennbar: **Die Pause hing an der Sperre "TRÄGER DES
> ZUGANGSDATUMS", und die ist mit VERMERK 3 gefallen** (GEMESSEN 2026-08-28, OWNER; Befund
> in docs/ziel-befunde.md, Teile (bj) bis (bm)). **VERMERK 4 vom selben Tag** hat mit
> Messung B1 die Nutzlast-Achse nachgezogen (ebenda, Teile (bn) bis (bu)).
> **WAS DAS NICHT HEISST, und ohne diesen Satz liest jemand "Pause vorbei" als "baubar":**
> Die Vorbedingungen der TRANSPORT-Scheibe sind damit NICHT alle erfüllt. Welche stehen und
> welche fallen, steht in VERMERK 3 und VERMERK 4 — nicht hier, zweimal geschrieben liefe es
> auseinander.
> **PROVENIENZ:** Das Fallen der Sperre ist eine FOLGE aus Messung A; die Datierung der Pause
> auf den 2026-08-28 ist eine FOLGE daraus. KEINE eigene Messung.
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
· Die Erneuerung des Zugangsdatums — Scheibe 1a des Schnitts der Phase 11.2
· Google als reguläres Ziel in der Oberfläche — Scheibe 3 des Schnitts der Phase 11.2
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

ERSETZT AM 2026-08-28 — DER ABSATZ DARÜBER IST EIN ZEITDOKUMENT UND BESCHREIBT DEN
ZUSTAND VOM 2026-08-25. ER BLEIBT STEHEN, WEIL ER DIE ENTSCHEIDUNG TRÄGT, DIE DIESER
UNTERABSCHNITT BEGRÜNDET: Gebaut WURDE trotz ungemessener Wire-Form, und der Einwand
gegen diesen Bau war berechtigt. Als Aussage über den HEUTIGEN Stand ist er FALSCH:
· "Sämtliche Feldnamen, Verschachtelungen und Formatvorgaben … GELESEN und NIE
  GEMESSEN" — überholt auf der NAMENS-, SCHREIBWEISEN- und ZEITSTEMPEL-Achse.
  GEMESSEN 2026-08-28 (OWNER), Messung B1: docs/ziel-befunde.md, Teile (bq) und (bs).
· "Vier Widersprüche … unaufgelöst" — es sind DREI. Widerspruch 2 ist aufgelöst
  (Teil (bq)); 1, 3 und 4 stehen unverändert.
· "camelCase gegen snake_case … AN DER DOKU NICHT ENTSCHEIDBAR" — an der DOKU
  weiterhin nicht entscheidbar, und genau so steht es dort auch heute noch. Als
  offene Frage ist es erledigt: BEIDE Schreibweisen sind gleichwertig zulässig,
  gemessen, nicht gelesen.
· "Ein Bau auf dieser Grundlage kann in Gänze am ersten echten Aufruf scheitern" —
  der erste echte Aufruf ist gefahren. Er ist NICHT an der Gestalt gescheitert.
WAS AUF DER WERTE-ACHSE STEHEN BLEIBT und den Einwand teilweise am Leben hält:
welcher eventSource-Wert gilt, welches Format productDestinationId und die
Klick-Kennungen verlangen — nichts davon ist gemessen (Teil (bu)).

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

ERSETZT AM 2026-08-28 — DIE FELDNAMEN SIND EIN BELEGTER STAND. Der Absatz darüber
bleibt als Zeitdokument stehen und ist als Aussage über heute FALSCH: Wer die Namen
zitiert, zitiert seit dem 2026-08-28 eine MESSUNG (OWNER, Messung B1;
docs/ziel-befunde.md, Teil (bq)) und keine Doku-Lesung.
DER GEPINNTE SCHLÜSSELNAMEN-TEST BLEIBT UNVERÄNDERT NÖTIG, und sein Zweck hat sich
nur verschoben: Er bewachte einen UNBELEGTEN Stand gegen eine stille Korrektur; er
bewacht jetzt einen BELEGTEN gegen eine stille Abweichung. Beides ist derselbe
Mechanismus — eine Änderung wird ein sichtbarer Diff. Der Test wird NICHT angefasst.

## Die Erneuerung des Zugangsdatums — Scheibe 1a des Schnitts der Phase 11.2

**DIE KURZFORM WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** "1a" meint
DIESE Scheibe — die erste des Schnitts, in den die Phase 11.2 am 2026-08-28 zerlegt
worden ist (bindende Entscheidung (6)). **SIE IST NICHT DIE SCHEIBE 11.2a.** Jene ist
abgeschlossen, hat zwei reine Funktionen gebaut und trägt ihren eigenen Abschnitt
weiter oben. Die beiden Bezeichner sehen einander ähnlich und meinen verschiedene
Arbeiten; deshalb steht hier der INHALT im Titel und die Kurzform dahinter.

**PROVENIENZ DES GANZEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
ARCHITEKT, 2026-08-28. Keine Messung.**

### Was sie ist

Eine BIBLIOTHEKSFUNKTION in der Bauform von `createAdminClient`
(src/lib/supabase/admin.ts): **sie prüft KEIN Eigentum.** Ihr Kommentarkopf verlangt
das ausdrücklich vom AUFRUFER — dieselbe Arbeitsteilung, aus der der Bestand seinen
Nutzen zieht, und derselbe Preis: Wer sie ohne Eigentums-Gate ruft, hat kein
Eigentums-Gate, und nichts wird davon rot.

Der Rahmen ist ANBIETER-NEUTRAL mit EINEM Google-Zweig. **LinkedIn erbt ihn** — diese
Scheibe fasst LinkedIn NICHT an; sie baut den Rahmen nur so, dass ein zweiter Zweig
später keine Umstellung verlangt.

### Vollzogen — was hier stand und wohin es gegangen ist

VERDICHTET AM 2026-08-29, nach dem Bau-Commit ca6b4c1 und dem bestätigten Live-Test.
Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen.
ZWEI Unterabschnitte sind entfallen:

- **"Warum sie zuerst kommt — und dieser Grund bindet"** trug den dreifach stummen
  Fehlzustand (die vier Adapter loggen nur `errorName` · das Ergebnis des `allSettled`
  wird am Aufrufort nicht gelesen · der Ingest antwortet immer mit leerer 204) und den
  Satz, ein Transport ohne Erneuerung sende EINE STUNDE und schweige danach.
  **ER IST EIN ZUSCHNITT-ARGUMENT und hat seinen Gegenstand mit dem Vollzug verloren** —
  die Reihenfolge ist entschieden und gebaut.
  **WAS DAVON WEITERLEBT, UND ZWAR AN ZWEI ORTEN, WEIL ES SONST STERBEN WÜRDE:** Der
  Fehlzustand steht vollständig im Kommentarkopf von `src/lib/oauth/token-refresh.ts`
  (dort mit derselben Provenienz, GEMESSEN am Repo, CC, 2026-08-29), und seine zweite
  Ebene steht unabhängig davon als Vorrats-Eintrag 3, Ebene 2, in DIESER Datei.
  **Die 3599 Sekunden** stehen in VERMERK 5 und in docs/ziel-befunde.md, Teil (bw).
- **"Scope — und wo er zum STOPP wird"** nannte, was diese Scheibe nicht anfassen darf.
  Der Scope einer gebauten Scheibe ist mit ihrem Vollzug abgelaufen; was tatsächlich
  angefasst wurde, steht im Vermerk, und der Schutz der genannten Dateien ist
  ausserdem am Code verankert (der Ingest-Wächter in `token-refresh.test.ts`).

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen (Stopp-Bedingung dieser Runde):**
- **"Was sie ist"** bleibt: Der Satz "LinkedIn erbt ihn" bindet die Scheibe, die den
  zweiten Anbieter-Zweig baut, und "sie prüft KEIN Eigentum" ist eine dauerhafte
  Eigenschaft der gebauten Funktion, nicht eine Anweisung an ihren Bau.
- **Die Festlegungen 1 und 2** bleiben, obwohl die Auflage nur 3, 4 und 5 nennt: Beide
  sind GRÜNDE und keine Anweisungen — Festlegung 2 hält fest, dass `client_secret` auf
  dem GEMESSENEN Weg mitgeht und ein Verzicht ungemessen wäre; Festlegung 1 hält fest,
  warum es keine Drift-Behandlung gibt. Wer sie streicht, nimmt der nächsten Runde die
  Begründung und lässt nur den Code stehen.

**WAS HIER NIE STAND und deshalb auch nicht gestrichen werden konnte:** die
Pipeline-Gates und die Pflicht-Mutationen. Sie waren Auflagen der Bau-Prompts, nie Text
dieses Zuschnitts; ihre Ergebnisse stehen im Vermerk.

### Fünf Festlegungen

**1. DER VORLAUF IST EINE BENANNTE KONSTANTE, FÜNF MINUTEN.** Erneuert wird, wenn
`accessTokenExpiresAt` INNERHALB des Vorlaufs liegt — nicht erst bei Ablauf.
**KEINE DRIFT-BEHANDLUNG, und das ist kein Versäumnis:** Der Wert entsteht aus UNSERER
eigenen Uhr; wir vergleichen unsere gegen unsere. Ein Ausgleich gegen die Uhr des
Anbieters hätte hier keinen Gegenstand.

**2. `client_secret` WIRD MITGESENDET** — so ist es gemessen (Messung C; s. VERMERK 5
und docs/ziel-befunde.md, Teile (bv) und (by)). **AUSDRÜCKLICH NICHT GEDEUTET:** Der
Anbieter führt das Feld als "Optional"; ob es entbehrlich WÄRE, ist nicht gemessen und
wird hier nicht behauptet.

**3. KEIN NEBENLÄUFIGKEITS-RIEGEL.** Google rotiert das Erneuerungs-Token nicht
(GEMESSEN 2026-08-28, OWNER, Teil (bv)); zwei gleichzeitige Läufe lösen dasselbe Token
doppelt ein, und der Schaden ist ein überflüssiger Netzaufruf.
**GEMELDET, NICHT GEBAUT** — Vorrats-Eintrag 9.

**4. DER CHIFFRIER-SCHLÜSSEL ROTIERT NEBENBEI MIT.** Wird eine Zeile neu geschrieben,
nimmt `encryptSecret` (src/lib/secrets/cipher.ts) immer die AKTIVE Kennung — eine
erneuerte Zeile trägt danach den heute aktiven Schlüssel, auch wenn sie unter einem
älteren angelegt wurde. **DAS IST ERWÜNSCHT UND GEHÖRT IN DEN KOMMENTARKOPF DER
GEBAUTEN FUNKTION**, damit niemand es für einen Fehler hält und einen Riegel dagegen
baut.

**5. IST `refreshTokenExpiresAt` ÜBERSCHRITTEN, IST DER ZUGANG TOT — OHNE NETZAUFRUF.**
Der Ausgang ist `dead`, und er wird VOR jedem Aufruf gestellt.
**DER GRUND IST DIE ZWEI-UHREN-LAGE SELBST:** `OAuthPayload`
(src/lib/secrets/oauth-payload.ts) trägt zwei Ablauf-Felder, damit "abgelaufen, aber
erneuerbar" von "endgültig weg" zu trennen ist. Wer die zweite Uhr nicht abfragt, hat
sie gebaut und nicht benutzt.
**DER ZUSTAND `{kind:"unknown"}` GILT NIE ALS ÜBERSCHRITTEN — DER NETZAUFRUF WIRD
GEMACHT.** ENTSCHEIDUNG: ARCHITEKT, 2026-08-29.
GRUND: **dieselbe Asymmetrie wie beim Ergebnistyp.** Ein Aufruf, der sich als
überflüssig erweist, kostet einen Netzaufruf; ein zu Unrecht für tot erklärter Zugang
kostet einen Kunden-Autorisierungsfluss, den niemand gebraucht hätte. Von zwei
unbelegten Möglichkeiten wird die gewählt, deren Fehlgriff der billigere ist.
GRENZE: **Sie gilt NUR der zweiten Uhr, nicht `accessTokenExpiresAt`.** Dort ist der
Ablauf ein Zeitpunkt und kein benannter Zustand; der Vorlauf aus Festlegung 1 bleibt
davon unberührt.
Der Satz "'unbekannt' ist kein Überschreiten" bleibt damit wörtlich richtig — er ist
jetzt entschieden statt offen.

### Der Ergebnistyp — vier Zustände, nach REAKTION sortiert

**DIE SORTIER-ACHSE IST DER GANZE PUNKT:** Die Zustände sind danach geschnitten, WAS
DER AUFRUFER TUN SOLL — nicht danach, was schiefging. Eine Sortierung nach
Fehlerursache zwänge jeden Aufrufer, die Zuordnung selbst zu treffen, und zwar jeder
für sich und jeder anders.

· **`ok`** — erneuert, ODER das alte Zugangsdatum reichte noch. **Die zwei Fälle
  werden im Ergebnis NICHT getrennt**, weil der Aufrufer in beiden dasselbe tut.
· **`retry`** — Netz, Timeout, 5xx.
· **`dead`** — `invalid_grant`, kein Erneuerungs-Token, unbrauchbare Nutzlast. Der
  Kunde muss neu autorisieren.
  **ZUM DRITTEN FALL "kein Erneuerungs-Token" (ARCHITEKT, 2026-08-29):** Er ist IN DIESER
  SCHEIBE GEGENSTANDSLOS und bekommt deshalb keinen Ausgang. Die Erneuerungs-Funktion
  SETZT ein Erneuerungs-Token VORAUS — sie liest es aus der abgelegten Nutzlast —, und
  der Deuter des Anbieter-Zweigs kennt absichtlich KEIN `no_refresh_token`
  (s. die Entscheidungen vom 2026-08-29, V-3). **DER FALL WIRD NICHT GESTRICHEN:** Er
  beschreibt den CODE-TAUSCH (`toOAuthPayload` in src/lib/oauth/google-token.ts), wo ein
  fehlendes Erneuerungs-Token einen toten Zugang bedeutet und einen eigenen Ausgang hat.
  Ohne diesen Absatz liest die Transport-Scheibe die Zeile als dreiteilig und sucht einen
  Ausgang, den es hier nicht gibt. Der nächstliegende ist `no_row` — "nichts abgelegt" —,
  und das ist eine ANDERE Aussage.
· **`misconfigured`** — Chiffrier-Schlüssel weg, Env fehlt, `unknown_key`. **Ein
  BETREIBER-Problem, kein Kunden-Problem**, und genau deshalb ein eigener Zustand: Wer
  ihn in `dead` einebnet, schickt den Kunden durch einen Autorisierungs-Fluss, der
  nichts heilt.

**JEDER FEHLZUSTAND TRÄGT EINEN BENANNTEN `reason`. KEIN FREMDTEXT NACH AUSSEN** —
weder eine Anbieter-Meldung noch ein Fehler-`message`.

**DIE SECHS ZUSTÄNDE VON `decryptSecret` DÜRFEN NICHT AUF "ging nicht" EINGEEBNET
WERDEN.** `DecryptResult` (src/lib/secrets/cipher.ts) trägt sechs `kind`-Werte, davon
FÜNF Fehlzustände (GEMESSEN am Repo, CC, 2026-08-29). Diese Scheibe legt ZWEI
Zuordnungen fest:
· `unknown_key` -> **`misconfigured`**. Der Kopf nennt eine Kennung, die DIESER
  Umgebung nicht bekannt ist — das ist "andere Umgebung", nicht "Zugang tot".
· `auth_failed` -> **`dead`**.
**FÜR DIE ÜBRIGEN IST DIE ZUORDNUNG HIER NICHT ENTSCHIEDEN**, und wer sie hier sucht,
findet sie nicht.

**EIN UNERWARTETER ANBIETER-CODE LANDET IN `retry`, NICHT IN `dead`.** Der Grund ist
asymmetrisch und deshalb entscheidbar: Weiterversuchen ist harmlos, vorzeitiges
Aufgeben nicht — es kostet einen Kunden-Autorisierungsfluss, den niemand gebraucht
hätte.

### Die Beweis-Route bleibt stehen — als Produkt-Baustein

**SIE WIRD NACH DEM LIVE-TEST NICHT ZURÜCKGEBAUT.** Zwei Gründe, und beide sind
benannt:
· Der offene Punkt "EIN ZIEL KANN KONFIGURIERT SEIN UND TROTZDEM NICHT SENDEN"
  (CLAUDE.md, "## Offene Punkte") führt als TRIGGER (4) genau diesen Fall — ein Ziel,
  dessen Zugangsdatum ablaufen kann — und **er ist EINGETRETEN** (dort
  wörtlich: "für LinkedIn ist er EINGETRETEN, seit das Ziel am 2026-08-19 sendet").
  **SACHKORREKTUR 2026-08-29, ERSETZT UND NICHT GESTEMPELT:** Hier stand "als Ursache
  (4)". Der Eintrag führt DREI URSACHEN und VIER TRIGGER; eine Ursache (4) gibt es
  nicht. Wer sie sucht, sucht in der falschen Liste und findet den Beleg für diesen
  Absatz nicht.
· **Die beiden Ablauf-Zeitpunkte liegen in `project_secrets.secret_enc` und sind damit
  unlesbar** — nicht nur für die Oberfläche, sondern für jeden ausser dem
  Dechiffrier-Pfad.

**BAUFORM — das Muster der zwei bestehenden OAuth-Routen** (GEMESSEN am Repo, CC,
2026-08-29): `runtime = "nodejs"`, `dynamic = "force-dynamic"`, `getUser()`, **dann**
das Eigentums-Gate. Kein neues Muster.

**SIE GIBT KEINE TOKEN ZURÜCK.** Nur den Zustand und die zwei Ablaufzeitpunkte.

### Die Entscheidungen vom 2026-08-29 — ACHT, und sie binden über diese Scheibe hinaus

**WARUM SIE HIER STEHEN UND NICHT NUR IM CODE:** Sie sind während des Baus gefallen, in
Prompt und Antwort. "WAS NUR IM GESPRÄCH GESAGT WIRD, EXISTIERT FÜR DIE NÄCHSTE SITZUNG
NICHT" (docs/immer-beachten.md). Jede von ihnen steht ZUSÄTZLICH begründet am Code; hier
steht, WAS entschieden wurde und WER es entschieden hat — die volle Begründung wird
NICHT verdoppelt.

**PROVENIENZ ALLER ACHT: ARCHITEKT, 2026-08-29. Keine Messung**, ausser wo an der
einzelnen Entscheidung etwas anderes steht.

· **P1 — `no_key`, `bad_key` UND `bad_format` bilden auf `misconfigured` ab.** Damit
  sind alle sechs `DecryptResult`-Zustände zugeordnet; die zwei übrigen kommen aus dem
  Zuschnitt oben. **DER GRUND FÜR `bad_format` IST DIE REVERSIBILITÄT, NICHT DIE
  KOSTEN-ASYMMETRIE:** `misconfigured` holt einen Betreiber an die Zeile, und der kann
  danach immer noch zur Neu-Autorisierung schicken; umgekehrt geht es nicht. Dazu deckt
  `bad_format` den Fall einer KÜNFTIGEN FASSUNG unter altem Code-Stand.
· **P2 — Uhr 2 wird bei einer brauchbaren Antwort NEU GESETZT, sonst bleibt der
  ABGELEGTE Wert stehen.** Nie zurück auf `{kind:"unknown"}` — das wäre der einzige Weg,
  der Information VERLIERT, und Festlegung 5 hängt an dieser Information.
  **SCHLÄGT EIN ABGELEGTES `{kind:"unknown"}` DURCH EINE BRAUCHBARE ANTWORT IN EIN
  `{kind:"at"}` UM, IST DAS ERWÜNSCHT:** Der Zugang verlässt damit dauerhaft die
  Asymmetrie der Festlegung 5.
· **P3 — die Beweis-Route ist POST, nicht GET.** Ein GET würde von jedem
  Vorablade-Mechanismus mit der Sitzung des Betreibers ausgelöst, und diese Route
  SCHREIBT eine Zeile und ruft einen fremden Endpunkt. **DER PREIS IST BENANNT:** Der
  Live-Test braucht einen `fetch` aus der eingeloggten Anwendung statt einer URL-Eingabe.
· **A-3 — "KEINE ZEILE" und "ZEILE OHNE CHIFFRAT" werden GETRENNT.** Keine Zeile →
  `dead`/`no_row`; Zeile mit leerem `secret_enc` → `misconfigured`/`no_secret_enc`.
  **DER GRUND IST DER ZWEITE ANBIETER, NICHT DIESER:** LinkedIn-Zeilen tragen heute
  KLARTEXT im Feld `secret`. Erbt LinkedIn den Rahmen, meldete eine eingeebnete Fassung
  "der Kunde muss neu autorisieren" für eine INTAKTE Zeile in Alt-Form.
· **A-4 — Uhr 2 wird VOR Uhr 1 geprüft.** Der Fall, den der Zuschnitt nicht regelte:
  Uhr 2 überschritten, Uhr 1 reicht noch → das Ergebnis ist `dead`.
  **DIE GRENZE, UND SIE IST DER TEIL, DER SCHEIBE 4 BINDET:** Für die Beweis-Route ist
  das die ehrliche Auskunft. **FÜR EINEN AUFRUFER AUF DEM TRANSPORTWEG WÄRE SIE ES
  NICHT** — dort könnte noch gesendet werden, solange Uhr 1 läuft. Wer den Transport
  baut, prüft diese Zuordnung neu; ein eigener Test hält die Lage fest.
· **B-1 — ein LESEFEHLER ist `retry`, ein SCHREIBFEHLER bleibt `misconfigured`.**
  Beim Lesen ist nichts verbraucht und kein Nebeneffekt eingetreten, ein zweiter Versuch
  ist folgenlos. Beim Schreiben ist die Erneuerung bereits VERBRAUCHT, und **unter
  Scheibe 1b wird das schärfer:** ein automatischer Wiederholer liefe an einer
  CHECK-Verletzung ENDLOS, der Ausgang muss ihn ANHALTEN.
  **"Netz, Timeout, 5xx" IM ERGEBNISTYP OBEN BESCHREIBT DEN ANBIETER-FALL UND IST KEINE
  ABSCHLIESSENDE LISTE** — sonst liest die nächste Runde `read` als Verstoss gegen den
  Zuschnitt.
· **B-2 — eine unbrauchbare 2xx-ANTWORT ist `retry`, nicht `dead`.** Sie ist
  unerwartetes ANBIETER-Verhalten, und eine Neu-Autorisierung heilt daran nichts; es
  gilt dieselbe Zeile wie beim unerwarteten Code. **DIE LESART, DIE SONST WIEDER
  AUFGEMACHT WIRD:** "dead — … unbrauchbare Nutzlast" meint die ABGELEGTE Nutzlast
  (die `parse_*`-Ausgänge), NICHT die Anbieter-Antwort.
· **B-3 — ab Status 500 gewinnt `retry`/"server" gegen `invalid_grant`.** Verboten war,
  einen Statuscode als VORBEDINGUNG für `invalid_grant` zu verlangen (Teil (bd) nennt
  für diesen Code keinen); unterhalb 500 gilt er deshalb bei JEDEM Status. **Verboten
  war NICHT, den Status überhaupt zu betrachten.** Eine 5xx-Antwort, die `invalid_grant`
  nennt, ist UNGEMESSEN — im unbelegten Fall entscheidet die Asymmetrie.

**EINE NEUNTE ÄNDERUNG DERSELBEN RUNDE, DIE KEINE ZUORDNUNGS-ENTSCHEIDUNG IST UND
DESHALB HIER UNTEN STEHT — B-4:** Der Deckel des Netzrufs umschliesst seit dem
2026-08-29 AUCH das Lesen des Antwort-Rumpfes. `fetch` kehrt zurück, sobald die
Kopfzeilen da sind; der Rumpf ist ein ZWEITER Netzvorgang und lief bis dahin ohne
Zeitgrenze. **DIE GRENZE:** Heute löst ein Betreiber den Ruf von Hand aus, der Fall ist
klein. **Mit Scheibe 1b sieht niemand mehr in diese Datei.**
**DIESELBE LÜCKE STEHT UNBEHOBEN IN ZWEI BESTANDS-DATEIEN** — sie ist als eigener
offener Punkt verortet ("DER DECKEL ENDET VOR DEM LESEN DES RUMPFES — ZWEI DATEIEN",
CLAUDE.md, "## Offene Punkte") und NICHT hier.

## Google als reguläres Ziel in der Oberfläche — Scheibe 3 des Schnitts der Phase 11.2

**DIE KURZFORM WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** "Scheibe 3"
meint die dritte Scheibe des Schnitts, in den die Phase 11.2 am 2026-08-28 zerlegt worden
ist (bindende Entscheidung (6)). **SIE IST NICHT DIE SCHEIBE 11.2a** — jene ist
abgeschlossen und hat zwei reine Funktionen gebaut. Wie bei Scheibe 1a steht deshalb der
INHALT im Titel und die Kurzform dahinter.

**DIE REIHENFOLGE IST ERLAUBT UND SIEHT NUR FALSCH AUS:** Diese Scheibe kommt VOR
Scheibe 2 (der Ablage der Konto-Kennungen), obwohl die Nummer höher ist. Die GRENZE der
bindenden Entscheidung (6) sagt es ausdrücklich: "Zwingend ist NUR 4 nach 1a, 2 und 3" —
der Schnitt ist eine HALBORDNUNG, keine Kette. Wer die Nummern als Kette liest, hält
diesen Zuschnitt für einen Verstoss.

**PROVENIENZ DES GANZEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
ARCHITEKT, 2026-08-29. Keine Messung.** Jede mit GEMESSEN gekennzeichnete Angabe stammt
aus der Aufklärungsrunde vom 2026-08-29 (CC, am Repo, mit Positivkontrolle je Achse).

### Was Scheibe 3 ist

**DER TITEL WEICHT ABSICHTLICH VON DEM DER SCHEIBE 1a AB** ("### Was sie ist"): Zwei
zeichengleiche `###`-Überschriften in DERSELBEN Datei machen jeden Such-Anker mehrdeutig,
und der erste Treffer wäre systematisch der falsche — die Regel "EIN ANKER, DER EINDEUTIG
AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT" (docs/immer-beachten.md) beschreibt
genau diesen Schaden.

`'google'` wird ein REGULÄRES Fan-Out-Ziel: sichtbar in der Oberfläche, über die
Anwendung verbindbar und trennbar — statt über eine abgetippte URL.

**DER EIGENTLICHE GEGENSTAND IST NICHT DER LISTENEINTRAG.** Er ist, dass der
Autorisierungs-Fluss heute NEBEN der Anwendung liegt. **GEMESSEN am Repo (CC,
2026-08-29):** Eine formale Suche über `src/components` und `src/app` auf `*.tsx`,
case-insensitiv und mehrzeilig, nach "google" liefert GENAU EINEN Treffer, und der ist
`src/app/layout.tsx` — `import { Geist } from "next/font/google"`, also die Schriftart.
**Positivkontrolle:** dieselbe Suche nach "linkedin" trifft in `TargetCard.tsx` und
`CodeImporter.tsx`. **Negativkontrolle:** ein Phantom-Muster trifft nichts.
**FOLGE:** Es gibt heute keinen Knopf, keinen Link, keine Karte und keinen Text zu
Google. `/api/oauth/google/start` ist ausschliesslich durch händisches Aufrufen der URL
erreichbar, und `/api/oauth/google/refresh` ebenso.

**WAS DAMIT EINGELÖST WIRD, und es steht bereits als Schuld im Code:** Der Kommentarkopf
von `src/app/api/oauth/google/callback/route.ts` nennt unter "DREI FOLGEN, benannte
Kosten und keine Versehen" genau die zwei Zustände, die diese Scheibe beendet — (1) die
Oberfläche sieht die Zeile nicht, (2) `removeCapiToken` weist `'google'` ab, die Zeile ist
über die Anwendung nicht entfernbar. Der dritte Punkt dort ist die UMFANGS-Aussage, dass
die Aufnahme eine eigene Scheibe sei; **das ist diese.**

### Warum jetzt

**DER ZUSTAND IST HEUTE SCHLECHTER ALS EIN FEHLENDES FEATURE, und das ist der Grund für
die Reihenfolge:** Ein Betreiber kann sein Google-Konto über die abgetippte Start-URL
VERBINDEN — die Zeile entsteht, chiffriert und korrekt. Er kann sie danach **nicht mehr
loswerden**. `removeCapiToken` weist `'google'` vor jedem DB-Zugriff ab; die einzige
Entfernung läuft über den SQL-Editor. **Ein Weg hinein ohne Weg hinaus ist eine Sackgasse
im eigenen Projekt.**

**DIE ZWEITE HÄLFTE DES GRUNDES IST DIE UNSICHTBARKEIT.** `listConfiguredTargets`
(src/app/projects/actions.ts) liest ALLE Zeilen des Projekts und filtert das Ergebnis mit
`isTrackingTarget` — **GEMESSEN am Code (CC, 2026-08-29):** eine bestehende
`'google'`-Zeile wird gelesen und danach verworfen. Der Betreiber hat also einen abgelegten
Zugang, den nichts anzeigt. Der Zustand ist nicht falsch dargestellt, er ist GAR NICHT
dargestellt — und das ist die Klasse von Fehlzustand, die dieses Projekt an mehreren
Stellen als die teuerste führt.

**WARUM NICHT ERST SCHEIBE 2:** Die Kennungen brauchen einen Ort und eine Eingabe; das ist
ein eigener Gegenstand. Die Sackgasse oben braucht keinen davon — sie braucht einen
Verbinden- und einen Trennen-Weg. Die beiden Arbeiten hängen nicht aneinander, und die
Halbordnung erlaubt beide Reihenfolgen.

### Sechs Festlegungen

**(1) ALLE VIER TORE BLEIBEN GESCHLOSSEN. NACH DIESER SCHEIBE IST GOOGLE SICHTBAR UND
VERWALTBAR UND SENDET NACHWEISLICH NICHT.**
Die vier Tore stehen in bindender Entscheidung (6) und sind am 2026-08-29 erneut am Code
erhoben (CC): `withPixel` (die Ableitung aus TRACKING_TARGETS in
`src/lib/capi/token.ts`) · die Geheimnis-Schleife ebenda (sie selektiert `("target,
secret")` und verwirft bei `hasSecret === false`) · das Consent-Gate (`allowedTargets` in
`src/lib/capi/ingest.ts` über `consentAllows`) · `hasAdapter` (`dispatchForward` ebenda,
Quelle `src/lib/tracking/target-adapters.ts`).
**TOR A WIRD ZUGEHALTEN, NICHT ABGEWARTET:** Die Karte bekommt KEINE `public*`-Felder.
GRUND: Google braucht ZWEI Skalare, wo `pixelId` einen trägt (Kundennummer und
Ziel-Kennung) — die Kennungen sind Scheibe 2, und ein Eingabefeld hier entschiede ihre
Ablage im client-besessenen Einstellungs-Blob durch die Hintertür.
**GRENZE, UND SIE GEHÖRT ZWINGEND IN DIESEN ZUSCHNITT:** Mit Scheibe 2 fällt Tor A
**ABSICHTLICH**. Danach trägt Tor B allein — und Tor B ist eine Aussage über eine
DATENBANK-SPALTE, nicht über die Oberfläche: Der Resolver liest die Klartext-Spalte
`secret`, und die Google-Zeile trägt dort NULL (der Callback schreibt `secret: null` und
`secret_enc`, der CHECK `project_secrets_secret_genau_eines` erzwingt genau eines von
beiden). **WER SCHEIBE 2 ZUSCHNEIDET, PRÜFT TOR B DORT NEU.** Ohne diesen Satz liest jene
Runde die vier geschlossenen Tore als dauerhaft, und sie sind es nicht.

**(2) DIE KARTE HAT KEIN GEHEIMNIS-FELD — DIE ABWESENHEIT IST DER SCHALTER.**
Dieselbe Bauform wie heute bei `publicLabel`: Die drei `secret*`-Felder von
`TargetCardConfig` (src/components/TargetCard.tsx) werden OPTIONAL, und ihre Abwesenheit
schaltet das Eingabefeld ab. Ein optionaler VERBINDEN-Weg tritt daneben.
**KEIN Flag, KEINE zweite Kartenkomponente, KEINE Fallunterscheidung über Zielnamen in
der Komponente.**
GRUND — **GEMESSEN am Code (CC, 2026-08-29):** Die Komponente `TargetCard` enthält heute
KEINEN einzigen Zielnamen-Vergleich; die Zielwerte stehen ausschliesslich im
Konfigurations-Literal `TARGET_CARDS` und in Kommentaren (Achse: `target ===` sowie die
fünf Zielwerte als Literal, case-insensitiv, mehrzeilig; Positivkontrolle: dieselbe Suche
findet in `src/app/projects/actions.ts` vier `target ===`). **Genau diese Eigenschaft
macht die Komponente tragbar** — ein Flag NEBEN den Feldern wäre eine zweite Wahrheit über
dieselbe Sache, und ein Zielnamen-Zweig wäre der erste im Haus.

**(3) VERBINDEN UND TRENNEN KOMMEN ZUSAMMEN.**
Ein Trennen ohne Verbinden sperrt den Betreiber aus seinem eigenen Projekt aus und wäre
schlechter als der heutige Zustand: Er könnte die Zeile entfernen und danach keine neue
anlegen, ohne wieder eine URL abzutippen.
**DER LÖSCHPFAD TUT BEREITS DAS RICHTIGE — GEMESSEN am Code (CC, 2026-08-29):**
`removeCapiToken` löscht auf `(project_id, target)` gefiltert; der `project_tokens`-Zweig
liegt hinter `if (target === META_TARGET)` und rührt Metas Rollback-Reserve für ein anderes
Ziel nicht an; der `settings`-Merge lässt `tokenSet` unverändert. **DER FEHLENDE TEIL IST
ALLEIN DER VERBINDEN-WEG.**
GRENZE: Das gilt für eine Zeile, die NUR in `project_secrets` steht — und genau so entsteht
sie im Google-Weg. Für ein Ziel, das je in beiden Tabellen läge, ist hier nichts gesagt.

**(4) EIN ZIEL OHNE GEHEIMNIS-FELD NIMMT KEIN KLARTEXT-GEHEIMNIS AN.**
`setCapiToken` bekommt einen EIGENEN, BENANNTEN Ausgang — **VOR jedem DB-Zugriff**, in
derselben Anordnung wie das bestehende `isTrackingTarget`-Gate, also vor `createClient()`,
vor dem Ownership-Gate und insbesondere vor `createAdminClient()`.
**GRUND, UND ER IST DER SICHERHEITSRELEVANTE TEIL DIESER SCHEIBE:** Ohne diesen Ausgang
schriebe die Action einen eingefügten Text als **KLARTEXT** nach `project_secrets.secret`
— in eine Zeile, deren Geheimnis chiffriert gehört. Bei bereits bestehender Zeile bräche
zusätzlich der CHECK `project_secrets_secret_genau_eines` mit 23514, weil dann beide
Spalten gefüllt wären. Der erste Fall ist der schlimmere: er ist STILL.
**DAS URTEIL WIRD AUS DERSELBEN QUELLE ABGELEITET WIE DIE KARTE.** Kein zweites Register,
keine Zielnamen-Liste in der Action, KEIN DRITTES URTEIL. Zwei Instanzen, die dieselbe
Frage beantworten, laufen auseinander — dieselbe Figur wie `domains` gegen
`settings.hosting.label`.
**OFFEN UND ALS GATE FÜR STUFE 1 ZU FÜHREN, HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN:** ob eine
`"use server"`-Datei aus der heutigen Quelle der Kartenkonfiguration importieren darf, und
ob die Konfiguration dafür in eine REINE Datei muss. **DIE LAGE IST GEMESSEN (CC,
2026-08-29):** `src/components/TargetCard.tsx` trägt in Zeile 1 `"use client"`,
`src/app/projects/actions.ts` trägt `"use server"`. Ob die Ableitung damit einen Umzug der
Konfiguration verlangt, ist eine Frage an den Bau-Plan und nicht an diesen Zuschnitt.

**(5) DIE ZWEI FEST VERDRAHTETEN ZAHLEN WERDEN ERSETZT, NICHT NACHGEZOGEN.**
**GEMESSEN am Repo (CC, 2026-08-29):** `src/lib/settings.targets.test.ts` nennt ZWEIMAL
`expect(TRACKING_TARGETS.length).toBe(4)` — je einmal im Lauf über `hasTargetPixelId` und
im Lauf über `isTargetDeliverable`. Beide sind im Kommentar als POSITIVKONTROLLE
deklariert, und diese ABSICHT bleibt: Sie verhindern, dass die `for`-Schleife darüber bei
leerer Liste trivial grün ist.
**IHR AUSDRUCK WIRD MITWACHSEND.** GRUND: Eine Zahl neben einer Liste wird bei jedem
Zuwachs neu falsch, ohne dass an der geprüften Eigenschaft etwas kaputt wäre — die Zahl
nachzuziehen hiesse, dieselbe Bauform mit einem neuen Wert zu bauen und beim sechsten Ziel
erneut. Es ist dieselbe Bauform, die in DIESER Datei dreimal protokolliert kaputtgegangen
ist (die Stückzahlen in den Köpfen von "Entscheidungen" und "Vorrat").
GRENZE: Die Festlegung sagt, dass der Ausdruck mitwächst — sie sagt NICHT, WIE. Das ist
Sache des Bau-Plans.

**(6) `TARGETS_WITH_ADAPTER` WIRD NICHT ANGEFASST.**
**GEMESSEN am Repo (CC, 2026-08-29):** Kein Compiler erzwingt dort einen Eintrag —
`FORWARDER_BY_TARGET` (src/lib/capi/ingest.ts) ist über `TargetWithAdapter` geschlüsselt
und nicht über `TrackingTarget`. **ES IST DER EINZIGE ORT, AN DEM DIESE SCHEIBE STILL ZUR
TRANSPORT-SCHEIBE WÜRDE**, und deshalb braucht er eine Festlegung, während die drei
erzwungenen Stellen darunter keine brauchen.
GRENZE: Die Festlegung verbietet den Eintrag für DIESE Scheibe. Sie sagt nichts darüber,
ob er später kommt — bindende Entscheidung (8) sagt, dass er über `FORWARDER_BY_TARGET`
laufen SOLL, und Scheibe 4 zahlt ihn.

### Drei Entscheidungen, die nach den sechs Festlegungen gefallen sind — sie binden gleich

**WARUM SIE GETRENNT STEHEN UND NICHT ALS (7) BIS (9) IN DER LISTE DARÜBER:** Die sechs
Festlegungen sind als Block gefallen, diese drei danach — sie beantworten die Fragen, die
dieser Zuschnitt zunächst als OFFEN ausgewiesen hatte. Ein Abschnitt "Was ausdrücklich
NICHT entschieden ist" stand hier und ist mit ihnen ERSATZLOS ENTFALLEN; es blieb nichts
darin übrig. **SIE BINDEN GENAU SO WIE DIE SECHS.** Getrennt stehen sie, damit die
Nummern der sechs unangetastet bleiben und die spätere Entscheidung als spätere lesbar
ist.
**PROVENIENZ ALLER DREI: ARCHITEKT/OWNER-ENTSCHEIDUNG 2026-08-29.** Keine Messung, ausser
wo an der einzelnen Angabe etwas anderes steht.

**(A) DER VERBINDEN-WEG IST NICHT VORABLADE-FÄHIG.** Kein `<Link>`, kein `<a href>` auf
die Start-Route. **DIE FORM WÄHLT DER BAU-PLAN** — verboten ist nur, dass sie ohne Klick
feuern kann.
**DIE EHRLICHE HÄLFTE GEHÖRT DAZU, sonst ruht die Entscheidung auf einem zu starken
Grund: DAS P3-ARGUMENT TRÄGT HIER NUR ZUR HÄLFTE.** P3 (s. "Die Entscheidungen vom
2026-08-29") legte die Beweis-Route auf POST, weil sie eine Zeile SCHREIBT und einen
FREMDEN Endpunkt ruft. **Die Start-Route tut beides nicht.** Der Schaden eines
Vorablade-Treffers wäre ein überschriebenes State-Cookie — **klein und UNGEMESSEN**.
**DER TRAGENDE GRUND IST EIN ANDERER, und er ist kein Sicherheits-, sondern ein
Produkt-Argument:** Ein Verbinden ist ein BEWUSSTER AKT DES BETREIBERS. Ein Element, das
ohne Klick feuert, ist keiner — es autorisiert in seinem Namen, ohne dass er es getan hat.
**DAZU DIE EMPFINDLICHKEIT DER STATE-ACHSE**, und sie ist belegt statt vermutet: Der
Live-Test der Scheibe 1a hat `?google=no_state` erzeugt (VERMERK 6, Schritt 1), **die
Ursache ist bis heute NICHT GEMESSEN**. Eine Achse, deren Fehlzustand man einmal gesehen
und nie erklärt hat, bekommt keinen zusätzlichen unbeabsichtigten Auslöser.

**(B) DIE ERGEBNISCODES GEHÖREN IN DIESE SCHEIBE — ALS DREI FÄLLE, NICHT ALS DREIZEHN
TEXTE.**
· **`ok`** → die Karte kippt. **KEIN Text.** Der Erfolgsfall trägt sich selbst.
· **`denied`** → **KEIN FEHLER, sondern eine WAHL DES NUTZERS.** Neutral, keine
  Fehlersprache, keine Farbe, die nach Defekt aussieht.
· **alles Übrige** → **EIN Text**, und der rohe Code daneben SICHTBAR für den Support.
**GRUND:** Der Erfolgsfall trägt sich selbst, die zwölf anderen nicht. **Eine Karte, die
nach einem gescheiterten Verbinden unverändert "Nicht konfiguriert" sagt, IST die stille
Fehlklasse, die diese Scheibe beseitigen soll** — der Betreiber hätte gehandelt, nichts
wäre geschehen, und nichts sagte es ihm.
**DER TEXT BEHAUPTET WEDER URSACHE NOCH ERGEBNIS — UND ER MUSS ES NICHT:** Die Karte
liest ihren Zustand aus der DATENBANK und ist die Autorität darüber, ob die Verbindung
besteht. Der Text sagt nur, dass der Vorgang nicht durchlief; ob etwas hinterlegt ist,
sagt die Karte. **DER WORTLAUT WIRD HIER NICHT FORMULIERT** — das ist Sache des Bau-Plans.
**GRENZE: DREIZEHN EIGENE TEXTE SIND AUSDRÜCKLICH NICHT GEGENSTAND.** Wer sie später
will, schneidet dafür eine eigene Arbeit zu. **DER ROHE CODE IST GENAU DER ERSATZ DAFÜR**:
Er kostet keine dreizehn Formulierungen und macht einen Support-Fall trotzdem
adressierbar.
**GEMESSEN am Code (CC, 2026-08-29):** Der Callback kehrt auf `/?google=<code>` zurück
und kennt DREIZEHN Codes (`ok`, `denied`, `no_state`, `state_mismatch`, `no_code`,
`not_found`, `config`, `exchange`, `bad_response`, `no_refresh`, `bad_payload`, `encrypt`,
`write`); NICHTS in der Oberfläche liest den Parameter heute. Der Kommentarkopf jener
Route weist die Abbildung ausdrücklich "der Oberflaechen-Scheibe" zu — **diese
Entscheidung nimmt sie an.**

**(C) `GOOGLE_TARGET` BLEIBT ROUTEN-LOKAL.**
**GRUND:** Die Konstante beantwortet eine ANDERE Frage als TRACKING_TARGETS — "unter
welchem Schlüssel legt DIESER OAuth-Fluss ab" gegen "welche Ziele bietet die OBERFLÄCHE
an". Zusammengezogen koppelte sie die Existenz eines Erneuerungs-Zweiges an die
Oberflächen-Liste, **und genau diese Unabhängigkeit ist der Punkt von Festlegung (6)**:
Ein Ziel darf einen Autorisierungs- und Erneuerungs-Weg haben, ohne deshalb ein Empfänger
zu sein.
**OFFEN ALS GATE FÜR STUFE 1, HIER NICHT ENTSCHIEDEN:** ob die Konstante als
`TrackingTarget` GETYPT werden kann, ohne diese Kopplung zu erzeugen. Der Typ ist eine
schwächere Bindung als der Import einer Liste — ob schwach genug, ist eine Frage an den
Bau-Plan.

### Was die Aufnahme erzwingt — BEFUND, keine Auflage

**GEMESSEN am Repo (CC, 2026-08-29).** Drei `Record<TrackingTarget, …>` verlangen bei einer
Erweiterung von TRACKING_TARGETS je einen Eintrag, sonst bricht der Build:
- `TARGET_CARDS` (src/components/TargetCard.tsx) — die Beschriftungen der Karte.
- `CONSENT_KEY_BY_TARGET` (src/lib/tracking/consent-targets.ts) — der Consent-Schlüssel.
- `LEGACY_CONSENT_ROLE` (ebenda) — **dort zwingend `false`.** Nicht der Compiler verlangt
  das, sondern ein Test: `consent-targets.test.ts` prüft, dass es GENAU EINEN Träger gibt,
  und ein zweiter Lauf nagelt ihn auf `meta`. Ein `true` verschenkte die Altbestands-
  Ausnahme an ein Ziel, über das nie jemand gefragt wurde.

**`TARGETS_WITH_ADAPTER` UND `FORWARDER_BY_TARGET` VERLANGEN NICHTS.**

**DER UNTERSCHIED IST DER GRUND FÜR DIE FESTLEGUNG (6) — und dafür, dass die drei darüber
KEINE brauchen:** Was der Compiler erzwingt, kann niemand vergessen; es fällt beim Bauen
auf. Was er nicht erzwingt, fällt nur auf, wenn jemand daran denkt. Eine Festlegung ist
dort nötig, wo das Vergessen NICHT wehtut — und beim Adapter-Eintrag täte das Gegenteil
weh: ein versehentlicher Eintrag machte aus dieser Scheibe stillschweigend die
Transport-Scheibe.

### Der Scope — und wo er zum STOPP wird

**NICHT ZU DIESER SCHEIBE:**
- die Konto-Kennungen und ihre Ablage (Scheibe 2),
- der Transport (Scheibe 4),
- `ensureTrackingKey` im OAuth-Weg — **Vorrats-Eintrag 13, zweiter Spiegelstrich, TRIGGER
  EINGETRETEN, GEMESSEN am Code (CC, 2026-08-29) und ausdrücklich NICHT behoben**: Der
  Callback ruft es nicht, und sein Kommentar sagt das ausdrücklich,
- jede Änderung am Resolver (`getCapiConfigByTrackingKey`), am Ingest-Pfad oder an einem
  Adapter,
- jede Migration.

**KEINE SCHEMA-ÄNDERUNG, UND SIE IST AUCH NICHT NÖTIG:** Der CHECK
`project_secrets_target_valid` nimmt `'google'` bereits an. **DIE PROVENIENZ GEHÖRT DAZU
UND IST NICHT VON HEUTE:** LIVE ABGELESEN am 2026-08-27 (Owner, SQL-Editor; Wortlaut,
Zeilenzahl und zwei Wegwerf-Inserts in docs/db-stand.md). Am Repo lesbar ist nur, dass
Migration 0026 sie schreibt — **ob sie in der laufenden Datenbank gilt, ist am Repo nicht
entscheidbar.**
**DARAUS FOLGT EIN STOPP:** Verlangt der Bau-Plan eine Schema-Aussage, ist das ein STOPP
dieser Scheibe. Sie ist eine Oberflächen- und Autorisierungs-Scheibe; sie hat an der
Datenbank nichts zu suchen.

**DIE SCHULD DER SCHEIBE 11.2a WANDERT WEITER.** `buildGoogleEvent` und
`extractGoogleClickIds` bekommen auch hier KEINEN Aufrufer im Produktivcode — diese Scheibe
berührt sie mit keiner Zeile. Der nachgeschuldete Live-Nachweis aus VERMERK 2 steht
unverändert und geht an die Transport-Scheibe.

### Die Beweis-Achse

**SIE HAT ZWEI HÄLFTEN, UND DIE ZWEITE IST DIE, DIE MAN VERGISST:** Dass die Scheibe
STEHT, zeigt eine sichtbare und bedienbare Karte. Dass sie NICHT MEHR TUT als das, zeigt
nur eine Aussage über die GESCHLOSSENEN TORE. Eine Anleitung, die nur die erste Hälfte
prüft, meldet Erfolg für eine Scheibe, die den Transport mitgebaut haben könnte.

**LIVE — JEDER SCHRITT MISST GENAU EINE ACHSE:**
1. **Sichtbarkeit an einer BESTEHENDEN Zeile.** Ein Projekt, für das bereits eine
   `'google'`-Zeile existiert, zeigt die Karte mit dem Status "Zugangsdaten hinterlegt".
   Das ist der Nachweis, dass der Filter in `listConfiguredTargets` sie nicht mehr wirft —
   und NUR das.
2. **Verbinden.** Der Weg führt durch den Zustimmungs-Bildschirm und kehrt zurück; die
   Karte steht danach auf "Zugangsdaten hinterlegt".
3. **Trennen.** Die Karte steht danach auf "Nicht konfiguriert", und ein erneutes Laden
   bestätigt es. Erst dieser Schritt beweist, dass die Sackgasse zu ist.
4. **Kein Geheimnis-Feld.** Auf der Google-Karte gibt es kein Eingabefeld für ein
   Zugangsdatum. **PFLICHT-STOPP VOR SCHRITT 2 UND 3:** Wer 2 und 3 in EINEM Durchlauf
   fährt, misst das Trennen an einer Zeile, die er selbst gerade angelegt hat — das ist
   zulässig, aber es ist NICHT der Fall aus Schritt 1. Beide Fälle gehören einzeln
   gefahren, oder der nicht gefahrene wird als nicht gefahren protokolliert.
5. **Der Hinweis "Auslieferung folgt — dieses Ziel sendet noch nicht"** steht auf der
   Karte. Er ist eine AUSSAGE DER OBERFLÄCHE über `hasAdapter`, **kein Beweis des
   Nicht-Sendens**.

**WAS LIVE NICHT ZU BEWEISEN IST, und dieser Absatz ist der wichtigere Teil der
Beweis-Achse:** Dass Google nicht sendet, kann ein Live-Test nicht auf EIN Tor
zurückführen. Tor B (kein Klartext in `secret`) und Tor D (kein Adapter) sind **je für
sich hinreichend**; ein ausbleibendes Ereignis sieht unter beiden identisch aus, und Tor A
und C schweigen dabei ebenfalls. Ein Ergebnis, das aus vier Gründen so aussehen kann wie
beobachtet, ist keine Messung, sondern eine Frage
(docs/immer-beachten.md, "BEVOR EIN ERGEBNIS BEURTEILT WIRD …", Teil (a)).
**DIE TRENNUNG LEISTEN NUR TESTS**, je Tor einer, und jeder benennt SEIN Tor. Ein Test,
der bloss "es geht nichts hinaus" behauptet, ist eine Abwesenheits-Behauptung mit vier
möglichen Ursachen und deckt keine davon.

**AM ENDE STEHT DIE FRAGE, DIE DER VERMERK BEANTWORTEN MUSS:** Welches Tor hält, wenn man
die anderen drei gedanklich wegnimmt? Wer sie nicht beantworten kann, hat die Tore nicht
geprüft, sondern ihr gemeinsames Schweigen.

### Zwei Auflagen an Stufe 1

**SIE SIND GATES, KEINE HINWEISE**, und beide folgen aus der Beweis-Achse darüber bzw.
aus Festlegung (2) — sie stehen hier, weil ein Bau-Plan, der sie übersieht, GRÜN
durchläuft und trotzdem eine Zusage dieser Scheibe verliert.

**(a) JE TOR EIN TEST, DER SEIN TOR BENENNT.** Die Feststellung der Beweis-Achse, dass
ein Live-Test das Nicht-Senden NICHT auf ein einzelnes Tor zurückführen kann, wird damit
zur Auflage: Es braucht VIER Tests, je einen für `withPixel`, die Geheimnis-Schleife, das
Consent-Gate und `hasAdapter`, und jeder benennt in seinem Kommentar, WELCHES Tor er
deckt. **EIN TEST, DER BLOSS "es geht nichts hinaus" BEHAUPTET, DECKT KEINES DER VIER** —
er ist eine Abwesenheits-Behauptung mit vier möglichen Ursachen, und er bliebe grün, wenn
drei der vier Tore fielen.

**(b) DIE VIER BESTEHENDEN ZIELE BEHALTEN IHRE `secret*`-FELDER, MIT EINEM TEST.**
Festlegung (2) macht die drei Felder von `TargetCardConfig` OPTIONAL. **DAMIT KANN EIN
SPÄTERER EINGRIFF SIE BEI `meta`, `pinterest`, `tiktok` ODER `linkedin` STILL WEGLASSEN,
UND DER COMPILER SCHWIEGE** — die Karte verlöre ihr Eingabefeld für das Zugangsdatum, ohne
dass irgendwo etwas rot wird. **WAS HEUTE EIN PFLICHTFELD ERZWINGT, MUSS DANACH EIN
WÄCHTER ERZWINGEN.** Es ist dieselbe Figur wie bei `LEGACY_CONSENT_ROLE`, wo ebenfalls
kein Typ, sondern ein Test die tragende Eigenschaft hält.
**DIE KOSTEN DER FESTLEGUNG (2) SIND DAMIT BENANNT UND NICHT WEGGEREDET:** Sie tauscht
eine Compiler-Zusage gegen eine Test-Zusage. Das ist der Preis der Bauform "Abwesenheit
ist der Schalter", und er wird hier bezahlt statt später entdeckt.

**ZWEI WEITERE GATES STEHEN NICHT HIER, SONDERN AN IHRER ENTSCHEIDUNG** — die
Import-Frage an Festlegung (4) und die Typ-Frage an Entscheidung (C). Zweimal aufgezählt
liefen sie auseinander.

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
Unterabschnitte sind oben im Abschnitt "### Vollzogen" DER SCHEIBE 11.2a einzeln
benannt; ihr Inhalt
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

### VERMERK 4 (Commit abcff79) — DIE NUTZLAST IST GEMESSEN, DIE WIRE-FORM IST KEINE DOKU-LESUNG MEHR

**WAS GESCHEHEN IST:** MESSUNG B1 gegen `events:ingest` — SIEBEN Aufrufe, GEMESSEN
2026-08-28 (OWNER, live). Anders als Messung A hat sie **die Nutzlast gesendet, die
buildIngestEventsRequest und buildGoogleEvent erzeugen**, statt eines erfundenen
Sondierungsrumpfes.

**DER BEFUND STEHT NICHT HIER, SONDERN IN docs/ziel-befunde.md**, Google-Abschnitt, Teile
(bn) bis (bu) — der Lauf mit Aufrufgestalt und Schreib-Ausschluss in (bn), die zwei
Fehlerklassen in (bo), das Sammel-Verhalten des Parsers in (bp), die Schreibweisen-Auflösung
in (bq), eventSource in (br), eventTimestamp in (bs), accountId in (bt), die Grenzen in (bu).
**ZWEIMAL GESCHRIEBEN LIEFE ES AUSEINANDER**, deshalb hier nur der Zeiger.

**DAS ERGEBNIS IN EINEM SATZ:** Sämtliche dreizehn Schlüsselnamen unserer Nutzlast sind
angenommen — in BEIDEN Schreibweisen —, die Gestalt des Zeitstempels ist angenommen,
eventSource ist ein Enum, und `operatingAccount.accountId` muss numerisch sein.

**WAS DER LAUF AUSDRÜCKLICH NICHT GETAN HAT, und das gehört an den Anfang und nicht in eine
Fussnote:** Der Rumpf trug KEIN auflösbares Ziel und KEINE echte Klick-Kennung. **Ein
erfolgreicher Ingest war strukturell unmöglich, und die DATENKLASSEN-GRENZE ist nicht berührt
worden.**

---

**WELCHE VORBEDINGUNGEN DER TRANSPORT-SCHEIBE DAVON NICHT BERÜHRT SIND — VIER, UND DIESE
AUFZÄHLUNG IST DER TEIL DIESES VERMERKS, DER ÜBER DIE RUNDE HINAUS BINDET.** Ohne sie liest
jemand "die Nutzlast ist gemessen" als "sendebereit", und genau das folgt daraus nicht:

- **DIE DREI VORBEDINGUNGEN AUS VERMERK 3 STEHEN UNVERÄNDERT.** Die Datenklassen-Grenze für
  ANDERE Merkmale als die Klick-Kennung, die Sieben-Tage-Frist im Publishing-Status
  "Testing", und der nachgeschuldete Live-Nachweis der Scheibe 11.2a. **MESSUNG B1 IST DIESER
  NACHWEIS EBENSO WENIG WIE MESSUNG A:** Sie hat keine Zeile Produktivcode ausgeführt und
  keinen Aufrufer hergestellt — die Nutzlast ist von Hand nachgebaut, nicht von
  buildGoogleEvent erzeugt. Die Schuld steht unverändert.
- **DIE WERTE-ACHSE IST OFFEN, UND SIE IST DIE EIGENTLICHE RESTLÜCKE.** Gemessen sind NAMEN
  und FORMEN. NICHT gemessen sind: welcher `eventSource`-Wert für den Offline-Klick-Import
  gilt (die Mitgliedermenge des Enums ist nicht einmal erhoben), welches Format
  `productDestinationId` verlangt, und welches Format die Klick-Kennungen verlangen.
  **DIE BINDENDE ENTSCHEIDUNG (2) GILT DESHALB WEITER** — s. dort, sie ist im selben Zug
  nachgezogen worden.
- **`x-goog-user-project` BLEIBT UNGEMESSEN.** Die Kopfzeile fehlte in allen sieben Aufrufen
  und die semantische Prüfung wurde erreicht — **das ist KEIN Schluss auf Entbehrlichkeit**,
  weil eine Projekt- oder Kontingentprüfung hinter dem ersten Feldverstoss liegen kann.
- **ES GIBT WEITERHIN KEINEN LESEPFAD FÜR DAS ZUGANGSDATUM UND KEINEN ORT FÜR DIE
  KONTO-KENNUNGEN.** B1 hat beide von Hand gesetzt. Was der Transport dafür braucht, ist von
  dieser Messung unberührt.

**DER VORRATS-EINTRAG 4 IST UNBERÜHRT** — "DIE SCHREIBUNG DER URL-PARAMETERNAMEN STÜTZT SICH
AUF NICHTS GELESENES", im Abschnitt "Vorrat (gemeldet, nicht gebaut)" DIESER Datei.
**B1 hat keinen Query-String benutzt**, genau wie A. Der dort festgehaltene Satz "DIE ERSTE
MESSUNG NIMMT SIE MIT" ist weiterhin NICHT eingelöst.

**EINE FOLGE, DIE NICHT DEN TRANSPORT BETRIFFT, SONDERN DIE AUSWERTUNG:** Der Anbieter
sammelt auf der Parse-Ebene mehrere Verstösse in EINER Antwort (Teil (bp)). Wer später einen
Rückkanal baut und nur den ersten `fieldViolation` liest, verliert Diagnostik, die geliefert
wurde. Als Vorrats-Eintrag unten festgehalten.

**PROVENIENZ, JE TEIL:** Messung B1 GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt;
drei Angaben zum Rumpf-Zuschnitt stammen aus erster Hand vom OWNER und sind in Teil (bn) als
solche ausgewiesen. Die Aussage, dass B1 den Live-Nachweis nicht einlöst, ist eine FOLGE aus
ihrem Zuschnitt. Die Zuordnung, welche Vorbedingung berührt ist und welche nicht, ist GEMESSEN
am Dateitext (CC, 2026-08-28).

### VERMERK 5 (Commit 4aba869) — DIE ERNEUERUNG IST GEMESSEN, DAS ERNEUERUNGS-TOKEN ROTIERT NICHT

**DIE COMMIT-NUMMER IST AM 2026-08-29 NACHGETRAGEN WORDEN.** Hier stand "noch ohne
Commit-Nummer" samt dem Satz, dies sei die eine erlaubte Lücke. Beides ist eingelöst;
die Lücke steht jetzt an VERMERK 6. **DER HASH IST AM REPO ERMITTELT** (CC, 2026-08-29),
nicht aus einem Prompt übernommen: drei unabhängige `-S`-Suchen über
docs/aktiver-stand.md — nach dem Titeltext dieses Vermerks, nach der Überschrift des
Zuschnitts der Scheibe 1a und nach dem Titel des Vorrats-Eintrags 6 — treffen ALLE
denselben Commit, und es ist der einzige Treffer je Suche.

**WAS GESCHEHEN IST:** MESSUNG C gegen `oauth2.googleapis.com/token` — GEMESSEN
2026-08-28 (OWNER, live). Sie löst ein Erneuerungs-Token ein, statt wie A und B1 gegen
`events:ingest` zu senden; sie misst damit erstmals den ANDEREN der beiden
Google-Endpunkte, an denen diese Phase hängt.

**DER BEFUND STEHT NICHT HIER, SONDERN IN docs/ziel-befunde.md**, Google-Abschnitt,
Teile (bv) bis (bz) — der Lauf und die Nicht-Rotation in (bv), die zwei Uhren in (bw),
die widerlegte Annahme in (bx), `client_secret` in (by), die Grenzen in (bz).
**ZWEIMAL GESCHRIEBEN LIEFE ES AUSEINANDER**, deshalb hier nur der Zeiger.

**DAS ERGEBNIS IN EINEM SATZ:** Google gibt dasselbe Erneuerungs-Token zweimal
zurückgetauscht wieder her, ohne es zu rotieren; das Zugangsdatum lebt 3599 Sekunden,
und die Uhr des Erneuerungs-Tokens läuft bei der Einlösung WEITER, statt sich zu
verlängern.

**WAS DARAUS FÜR DEN ZUSCHNITT FOLGT UND SCHON EINGETRAGEN IST:** Die Scheibe 1a (s.
den Abschnitt "Die Erneuerung des Zugangsdatums") stützt zwei ihrer fünf Festlegungen
auf diesen Vermerk — das Mitsenden von `client_secret` und den Verzicht auf einen
Nebenläufigkeits-Riegel. **Der Verzicht ist als Vorrats-Eintrag 9 festgehalten, NICHT
gebaut.**

**EINE FOLGE, DIE NICHT DEN ZUSCHNITT BETRIFFT, SONDERN EINE CODE-DATEI:** Messung C
widerlegt eine GELESENE Annahme am Typ `RefreshTokenExpiry`
(src/lib/secrets/oauth-payload.ts). **DIE DATEI IST IN DIESER RUNDE NICHT ANGEFASST
WORDEN** (Invariante des Auftrags: kein Produktivcode) — dieselbe Handhabung wie beim
Lauf 6, der dort schon einmal eine Richtigstellung gemeldet und nicht angeglichen hat.
Der Sachverhalt steht in Teil (bx); ob und wie die Datei nachzieht, ist eine eigene
Entscheidung und hier KEINE.

**PROVENIENZ:** Messung C GEMESSEN 2026-08-28 (OWNER), live gegen den Endpunkt. Die
Zuordnung, welche Festlegung der Scheibe 1a auf welchem Teil ruht, ist GEMESSEN am
Dateitext (CC, 2026-08-29).

### VERMERK 6 (Commit a351858) — DIE SCHEIBE 1a IST GEBAUT UND LIVE BEWIESEN

**DIE COMMIT-NUMMER IST AM 2026-08-29 NACHGETRAGEN WORDEN.** Hier stand "(noch ohne
Commit-Nummer)" samt dem Absatz, dies sei die eine erlaubte Lücke; beides ist eingelöst
und ERSETZT. **NACH DIESER RUNDE HAT DIE DATEI KEINE LÜCKE.**
**DIE FORTSCHREIBUNGS-REGEL OBEN IST EINE OBERGRENZE UND KEIN SOLL** — null Lücken sind
der Normalzustand, sobald der jüngste Vermerk committet ist. Wer aus ihr ein Soll liest,
lässt eine Lücke stehen, die längst füllbar ist, und begründet sie mit einer Regel, die
das Gegenteil sagt.
**DER HASH IST AM REPO ERMITTELT** (CC, 2026-08-29), nicht aus einem Prompt übernommen —
nach demselben Verfahren wie bei VERMERK 5: drei unabhängige `-S`-Suchen über
docs/aktiver-stand.md, nach dem Titeltext dieses Vermerks, nach "DREI ABLEITUNGEN AUS
DIESEN WERTEN" und nach "DIE ZWEITE UHR IST NEU GESETZT WORDEN". Alle drei treffen
denselben Commit, und es ist je genau EIN Treffer.
**NICHT ZU VERWECHSELN MIT DEM BAU-COMMIT:** `a351858` trägt DIESEN VERMERK, `ca6b4c1`
trägt den BAU. Beide Nummern stehen in diesem Abschnitt und meinen verschiedene Arbeiten.

**WAS GEBAUT WURDE — Bau-Commit `ca6b4c1`:** SECHS neue Dateien, KEINE bestehende
angefasst. Drei Quelldateien — `refreshAccessToken` (src/lib/oauth/token-refresh.ts, der
anbieter-neutrale Rahmen), `exchangeRefreshToken` plus `toRefreshedPayload`
(src/lib/oauth/google-refresh.ts, der Google-Zweig) und die Beweis-Route
(src/app/api/oauth/google/refresh/route.ts) — und drei Testdateien daneben, zusammen 59
Tests. Die Suite steht damit bei 68 Dateien und 1376 Tests; **kein Bestandstest ist
gefallen**, und die zwei geänderten Tests dieser Scheibe sind ihre eigenen. Alle vier
Gates waren vor dem Commit grün (tsc, eslint, vitest, next build).

**DER EINZIGE AUFRUFER IST DIE BEWEIS-ROUTE.** Kein Automatismus, kein Aufrufer auf dem
Ingest-Pfad; ein Quelltext-Wächter in token-refresh.test.ts hält das fest und trägt
seine eigene Grenze (er sieht Zeichen, keinen Import-Graphen).

---

**DER LIVE-TEST — GEMESSEN 2026-08-29 vom OWNER, an der ausgelieferten Anwendung.**
Deployment vorher als "Ready" bestätigt.

- **Schritt 1, die Regression:** Der erste Aufruf per direkter URL-Eingabe endete in
  `?google=no_state`. Nach vollständigem Durchlauf des Zustimmungs-Bildschirms:
  `/?google=ok`.
  **DIE URSACHE DES `no_state` IST NICHT GEMESSEN.** Sie wird hier auch nicht vermutet.
  **DER BEFUND SELBST IST WERTVOLL UND DESHALB PROTOKOLLIERT: es ist der erste
  LIVE-BELEG, dass dieser fail-closed-Zweig überhaupt feuert.** Bis dahin war er nur
  durch Tests gedeckt.
- **Schritt 2 (11:49 CEST):**
  `{"state":"ok","accessTokenExpiresAt":1788000301,`
  `"refreshTokenExpiresAt":{"kind":"at","epochSeconds":1788601501}}`
- **Schritt 3 (12:42 CEST):** `accessTokenExpiresAt` 1788003743,
  `refreshTokenExpiresAt` 1788601500.
- **Schritt 3b (unmittelbar danach):** `accessTokenExpiresAt` identisch, 1788003743.
- **Schritt 4a:** HTTP 404, `{"error":"not_found"}`.
- **Schritt 4b:** aus der Sitzung von Konto A, mit einer EXISTIERENDEN Kennung eines
  Projekts von Konto B → HTTP 404, `{"error":"not_found"}`. **Die UUID selbst ist
  bewusst nicht aufgeschrieben.** Das ist der echte Gegenversuch zur Eigentums-Achse;
  4a prüft nur den Id-Filter.
- **Schritt 5:** kein Handler-Ergebnis. Die Middleware leitet auf `/login` um, dort
  antwortet Next mit 405. **Die Route ist NICHT erreicht worden.**

**DREI ABLEITUNGEN AUS DIESEN WERTEN — GERECHNET, NICHT GEMESSEN.** Sie stehen getrennt,
damit niemand sie später als Beobachtung zitiert:

1. **DIE ZWEITE UHR IST NEU GESETZT WORDEN, NICHT STEHENGEBLIEBEN.** 1788601501 →
   1788601500. Wäre `refresh_token_expires_in` in der Erneuerungs-Antwort NICHT gekommen,
   hätte der Code den abgelegten Wert byte-gleich durchgereicht (so ist der Zweig
   gebaut). Er hat sich bewegt, **also lief der Neu-Setzen-Zweig**.
   **ZWEI FOLGEN, und beide sind neu AM EIGENEN PRODUKTIVPFAD statt an einem Handaufruf:**
   Das Feld kommt AUCH BEI DER ERNEUERUNG — Teil (bx) hatte genau das offen —, und der
   absolute Zeitpunkt bleibt auf die Sekunde stabil, **die zweite Uhr wird bei der
   Einlösung NICHT verlängert**. Das ist die Grundlage der Festlegungen 3 und 5, jetzt an
   unserem Code bestätigt.
   **DIE EINE SEKUNDE IST DIE `floor()`-RUNDUNG, KEIN BEFUND.**
2. **DER VORLAUF HAT GEGRIFFEN, BEVOR DER ZUGANG ABLIEF.** Die Differenz der beiden
   `accessTokenExpiresAt` beträgt 3442 s; das ist zugleich die verstrichene Zeit zwischen
   Rückkehr und Schritt 3. Zum Zeitpunkt von Schritt 3 lief das alte Zugangsdatum noch
   rund **157 Sekunden**.
   **DIE 157 RUHEN AUF DER GEMESSENEN ANNAHME `expires_in` = 3599** (Teil (bw)); eine
   Abweichung um 1 s verschiebt sie um 1 s. Ohne diese Grenze gehört die Zahl nicht ins
   Protokoll.
3. **DER ABSTAND DER BEIDEN UHREN BETRÄGT EXAKT 601 200 SEKUNDEN — sieben Tage minus
   eine Stunde.** Reine Arithmetik auf zwei gemessenen Werten, ohne Annahme. Das ist die
   Sieben-Tage-Frist aus VERMERK 3, sichtbar in unseren eigenen Daten.
   **FOLGE: Der Zugang stirbt bei `epochSeconds` 1788601500.** Ob die Rohwerte
   3599/604799 oder 3600/604800 lauten, ist **NICHT auflösbar** — die Antwort wird nicht
   geloggt, und das bleibt so.

---

**WAS DER LIVE-TEST NICHT ZEIGT — und das gehört an dieselbe Stelle wie das, was er
zeigt:**

- **DIE PUNKTE 2, 3 UND 6 DER NACHWEIS-TABELLE BLEIBEN OFFEN:** der echte Fehlercode für
  ein totes Erneuerungs-Token, Statuscode und Rumpfform des Fehlerfalls am
  Token-Endpunkt, und der Schlüsselwechsel aus Festlegung 4. Der erste und der zweite
  bräuchten einen widerrufenen Zugang, der dritte zwei Kennungen in `SECRET_ENC_KEYS`.
  **`invalid_grant → dead` ruht damit weiterhin auf einer ERWARTUNG** (Teil (bz)).
- **DER `!user`-ZWEIG DER ROUTE HAT KEINEN LIVE-NACHWEIS.** Schritt 5 hat die Route nicht
  erreicht — die Sperre trägt eine Ebene höher. **DER ZWEIG WIRD NICHT ENTFERNT:** Er
  trägt, sobald jemand den Matcher der Middleware ändert. Die Lage darüber ist als
  eigener offener Punkt verortet ("DIE MIDDLEWARE LEITET API-ROUTEN AUF EINE HTML-SEITE
  UM").
- **VERMERK 2 IST NICHT GETILGT.** Der nachgeschuldete Live-Nachweis der Scheibe 11.2a
  steht unverändert: `buildGoogleEvent` und `extractGoogleClickIds` haben weiterhin
  KEINEN Aufrufer im Produktivcode, und diese Scheibe hat sie mit keiner Zeile berührt.
  **Die Schuld wandert an die Transport-Scheibe.**

---

**WAS DIESER VERMERK AUS DEM VERDICHTETEN ZUSCHNITT AUFNIMMT:** die zwei entfallenen
Unterabschnitte sind oben in "### Vollzogen" DER SCHEIBE 1a einzeln benannt, mit dem
Ort, an dem ihr
fortwirkender Teil weiterlebt. **Die acht Entscheidungen vom 2026-08-29 sind NICHT hier
aufgenommen worden, sondern als eigener Unterabschnitt IM ZUSCHNITT verankert** — sie
binden über diese Scheibe hinaus und gehören deshalb nicht in ein Protokoll, das eine
abgeschlossene Arbeit beschreibt.

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse und der Bau-Commit GEMESSEN
am Repo bzw. an den Läufen vom 2026-08-29 (CC). Die Live-Werte GEMESSEN 2026-08-29
(OWNER), an der ausgelieferten Anwendung. Die drei Ableitungen sind GERECHNET auf diesen
Werten und ausdrücklich KEINE zweite Beobachtung. Der Satz über den nicht getilgten
Live-Nachweis der Scheibe 11.2a ist eine FOLGE aus dem Zuschnitt dieser Scheibe.

## Entscheidungen, die über ihre Scheibe hinaus binden

Je Eintrag: die ENTSCHEIDUNG, ihr GRUND und ihre GRENZE. Die Befunde selbst werden
NICHT verdoppelt — sie stehen in docs/ziel-befunde.md bzw. an der Roadmap-Zeile 11.2,
und zwei Fassungen liefen auseinander.
KEINE STÜCKZAHL IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK: Die Einträge sind
nummeriert, die Liste zählt sich damit selbst, und eine Zahl daneben ist eine zweite
Wahrheit, die bei jedem Zuwachs neu falsch wird — in dieser Datei dreimal
protokolliert kaputtgegangen.
UND KEINE SAMMEL-HERKUNFT: Jeder Eintrag trägt seine eigene Provenienz. Eine
gemeinsame Angabe im Kopf war mit dem ersten Eintrag aus einem anderen Anlass falsch,
und zwar für alle auf einmal.

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

NACHGEZOGEN 2026-08-28 — DIE ENTSCHEIDUNG (2) GILT UNVERÄNDERT, IHRE GRUNDLAGE IST AUF EINER
ACHSE GEMESSEN. Der Text darüber bleibt WÖRTLICH stehen; dieser Absatz sagt, was sich
verschoben hat und was nicht.
· **GEMESSEN IST DER TYP, NICHT DER WERT.** `eventSource` ist ein Enum
  (`google.ads.datamanager.v1.EventSource`) und kein freier String; `"WEB"` ist ein gültiges
  Mitglied, `"ERFUNDEN_B1"` nicht. GEMESSEN 2026-08-28 (OWNER), Messung B1 —
  docs/ziel-befunde.md, Teil (br).
· **WAS DAMIT ÜBERHOLT IST — GENAU EINE ANNAHME:** dass die Funktion einen beliebigen String
  weiterreichen dürfte, ohne dass die Schnittstelle etwas dagegen hätte. Sie hat etwas
  dagegen. Der SATZ oben behauptet das nicht; überholt ist die stillschweigende Erwartung,
  nicht der Wortlaut.
· **WAS UNVERÄNDERT GILT UND DIE ENTSCHEIDUNG TRÄGT:** **WELCHER Wert für den
  Offline-Klick-Import der richtige ist, ist NICHT gemessen** — die MENGE der Enum-Mitglieder
  ist nicht einmal erhoben. Eine Wahl IN der Funktion wäre weiterhin eine unbelegte
  Festlegung an der schlechtestmöglichen Stelle. **DIE SPERRE IST KLEINER GEWORDEN, NICHT
  GEFALLEN.**
· **DIE GRENZE DER GRENZE, damit niemand sie zu weit liest:** Auch das Instrument aus dem
  Absatz oben (`validateOnly=true`) beantwortet weiterhin "wird die Anfrage angenommen", nicht
  "ist der Wert der fachlich richtige". Ein syntaktisch gültiges Enum-Mitglied kann fachlich
  falsch sein, und die Schnittstelle meldet das nicht.
PROVENIENZ: GEMESSEN 2026-08-28 (OWNER), Messung B1. Die Folge für die Entscheidung ist eine
ABLEITUNG aus dieser Messung.

NACHGEZOGEN 2026-08-28, ZWEITER TEIL — DIE FELDNAMEN UND DIE SCHREIBWEISE SIND KEINE
DOKU-LESUNG MEHR. Dieser Absatz steht hier und nicht bei (2), weil er ALLE bindenden
Entscheidungen dieses Zuschnitts betrifft und weil (2) die Stelle ist, an der die
Provenienz-Frage am schärfsten gestellt wurde.
· **GEMESSEN 2026-08-28 (OWNER), Messung B1:** Sämtliche DREIZEHN Schlüsselnamen unserer
  Nutzlast sind angenommen, in BEIDEN Schreibweisen (docs/ziel-befunde.md, Teil (bq)), und die
  Gestalt des Zeitstempels aus `toISOString()` ebenfalls (Teil (bs)).
· **KEINE FOLGE FÜR DEN CODE:** Gebaut wird camelCase, und camelCase ist angenommen. Es wird
  KEINE Zeile umbenannt.
· **WAS NICHT GEMESSEN IST — die WERTE-Achse, und sie ist die verbliebene Lücke:** das Format
  von `productDestinationId`, das Format der Klick-Kennungen, und ob `eventSource` ein
  Pflichtfeld ist. Die Begründung, warum diese drei ungemessen blieben, ist in Teil (bu)
  ausdrücklich als ABLEITUNG gekennzeichnet und läuft der einzigen harten Beobachtung zum
  Sammelverhalten entgegen — wer sie zitiert, zitiert eine Vermutung.

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

**(6) DER SCHEIBEN-SCHNITT DER PHASE 11.2.**
ENTSCHEIDUNG: Die Phase wird geschnitten in — **1a** die Erneuerungs-Funktion OHNE
Auslöser · **1b** den automatischen Auslöser · **2** die Ablage der
Google-Konto-Kennungen · **3** 'google' in TRACKING_TARGETS · **4** den Transport.
DIE AUFZÄHLUNG OBEN TRÄGT VIER NUMMERN UND FÜNF STÜCKE, und der Satz steht hier, damit
niemand beim Nachzählen einen Fehler vermutet: Nummer 1 zerfällt in 1a und 1b. Die
GRENZE unten ist die Probe darauf; sie behandelt 1a und 1b ausdrücklich verschieden.
GRUND: **Der Transport erzeugt allein KEINEN sendenden Pfad.** Vier unabhängige Tore
halten ihn auf — `withPixel` (die Ableitung aus TRACKING_TARGETS in
src/lib/capi/token.ts), `hasSecret` (src/lib/tracking/target-readiness.ts), das
Consent-Gate (`allowedTargets` in src/lib/capi/ingest.ts über `consentAllows`) und
`hasAdapter` (src/lib/tracking/target-adapters.ts). GEMESSEN am Repo (CC, 2026-08-29).
**UND ZWEI DINGE FEHLEN GANZ:** ein Lesepfad für das Zugangsdatum und ein Ort für die
Konto-Kennungen. Wer den Transport zuerst baut, baut gegen vier geschlossene Tore und
zwei nicht vorhandene Voraussetzungen.
GRENZE: **Zwingend ist NUR 4 nach 1a, 2 und 3.** 1b darf dazwischen stehen. Die
Reihenfolge ist damit KEINE Kette, sondern eine Halbordnung — wer sie als Kette liest,
hält eine erlaubte Umstellung für einen Verstoss.
PROVENIENZ: ARCHITEKT/OWNER-ENTSCHEIDUNG 2026-08-28. Die vier Tore und die zwei
Fehlstellen sind GEMESSEN am Repo (CC, 2026-08-29); der Schnitt selbst ist eine
Festlegung, keine Messung.

**(7) 1a WIRD VOM AUSLÖSER GETRENNT.**
ENTSCHEIDUNG: Die Erneuerungs-Funktion (1a) und der automatische Auslöser (1b) sind
ZWEI Scheiben und nicht eine.
GRUND: **Die Funktion ist in allen drei denkbaren Auslöser-Varianten IDENTISCH.**
Verschieden ist nur, WER sie ruft und WIE dieser Ruf autorisiert wird. Dazu kommt ein
Beweis-Grund, und er ist der schärfere: **1a ist mit dem VORHANDENEN Muster beweisbar**
— der Bauform der zwei bestehenden OAuth-Routen —, **1b braucht ein NEUES.** Ein
Zuschnitt, der beides zusammenlegt, koppelt eine beweisbare Arbeit an eine, deren
Beweisform erst noch zu bestimmen ist.
GRENZE, UND SIE IST DER TRAGENDE TEIL DIESES EINTRAGS: **1b löst das eigentliche
Problem. 1a ALLEIN HÄLT KEINEN ZUGANG AM LEBEN** — eine Funktion, die niemand ruft,
erneuert nichts. Wer 1a abschliesst und 1b vertagt, hat den Fehlzustand aus dem
Abschnitt "Warum sie zuerst kommt" NICHT beseitigt, sondern nur das Werkzeug dagegen
gebaut.
PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-08-28. Keine Messung.

**(8) 'google' DARF ÜBER FORWARDER_BY_TARGET LAUFEN.**
ENTSCHEIDUNG: Der Google-Transport bekommt KEINEN eigenen, parallelen Weg; er läuft
über `FORWARDER_BY_TARGET` (src/lib/capi/ingest.ts) wie die vier bestehenden Ziele.
GRUND: **Die drei Punkte im Kommentarkopf von
src/app/api/oauth/google/callback/route.ts sind KEINE Gegenposition** — sie stehen
dort ausdrücklich als "DREI FOLGEN, benannte Kosten und keine Versehen" (GELESEN am
Code, CC, 2026-08-29). (1) und (2) benennen KOSTEN DER HEUTIGEN LAGE — die Oberfläche
sieht die Zeile nicht, und `removeCapiToken` weist 'google' ab. (3) ist eine
UMFANGS-Aussage: die Aufnahme in TRACKING_TARGETS sei "eine eigene Scheibe". Keiner
der drei sagt, der Weg sei falsch; sie sagen, er sei noch nicht bezahlt.
**EIN PARALLELER PFAD WÄRE EIN ZWEITES URTEIL DARÜBER, WELCHE ZIELE LIVE SIND** —
dieselbe Figur wie `domains` gegen `settings.hosting.label` (docs/immer-beachten.md,
"DIE domains-ZEILE IST DIE ALLEINIGE WAHRHEIT ÜBER 'IST DIESES PROJEKT LIVE?'"). Dort
hat sie eine Seite dauerhaft 404en lassen, während das UI "veröffentlicht" zeigte.
GRENZE: **Der Preis ist Scheibe 3, und sie kommt VOR dem Transport.** Diese
Entscheidung macht die Aufnahme in TRACKING_TARGETS nicht billiger — sie sagt nur,
dass der Preis zu zahlen und nicht zu umgehen ist. Was die Aufnahme nach sich zieht,
steht in jenem Kommentarkopf unter (3) und wird hier NICHT wiederholt.
PROVENIENZ: ARCHITEKTEN-ENTSCHEIDUNG 2026-08-28, gestützt auf eine Lesung am Code (CC,
2026-08-29).

## Vorrat (gemeldet, nicht gebaut)

Alle Einträge sind NICHT gebaut und NICHT entschieden. KEINE EMPFEHLUNG zu keinem von
ihnen. JEDER EINTRAG TRÄGT SEIN EIGENES DATUM.
KEINE SAMMEL-DATIERUNG IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK: Hier stand "Einträge
1 bis 3 GEMELDET am 2026-08-24, Einträge 4 und 5 am 2026-08-25". Sie ist am 2026-08-29
ERSATZLOS ENTFALLEN — sie deckte die Einträge 6 bis 13 nicht und wurde mit jedem
Zuwachs neu falsch. Es ist dieselbe Bauform wie die Stückzahl darunter, nur mit einem
Datum statt einer Zahl.
KEINE STÜCKZAHL IN DIESEM KOPF, UND ES KOMMT KEINE ZURÜCK: Die Einträge sind
nummeriert, die Liste zählt sich damit selbst, und eine Zahl daneben ist eine zweite
Wahrheit, die bei jedem Zuwachs neu falsch wird — in dieser Datei dreimal
protokolliert kaputtgegangen. Aus demselben Grund steht hier keine Ordnungsangabe der
Form "die zwei letzten": sie wandert mit jedem Zuwachs weiter, ohne dass jemand sie
anfasst.
NACHGEZOGEN AM 2026-08-25 — die Einträge 1 bis 3 sind ERSETZT, nicht ergänzt: zwei
Angaben waren am Code falsch bzw. zu eng, die dritte war unvollständig.

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
   GEMELDET 2026-08-25, NICHT GEBAUT. KEINE EMPFEHLUNG.
   DAS DATUM IST AM 2026-08-29 AUS DEM KOPF DES VORRATS HIERHER GEWANDERT, nicht neu
   erhoben: Dieser Eintrag war der EINZIGE der dreizehn ohne eigene Datumsangabe
   (GEMESSEN am Dateitext, CC, 2026-08-29), und mit dem Wegfall der Sammel-Datierung
   hätte er seine einzige verloren.

6. **eventSourceUrl IST AN DER FAN-OUT-STELLE VERFÜGBAR — GEMESSEN. DIE RESTLÜCKE
   LIEGT NICHT MEHR AM TRANSPORTWEG, SONDERN AM INHALT DER URL.**
   GEMESSEN am Repo (CC, 2026-08-29). INSTRUMENT: formale Suche über src/ nach
   `eventSourceUrl` ohne Testdateien, dazu die Lesung der getroffenen Symbole.
   **WAS DAMIT ENTSCHIEDEN IST — DREI ANGABEN:**
   · **DER TRANSPORTWEG STEHT.** `eventSourceUrl` ist ein Feld des Typs
     `CapiRequestBody` (src/lib/capi/ingest.ts). `handleIngest` reicht `body`
     unverändert an `dispatchForward` und von dort an `FORWARDER_BY_TARGET[target]`
     weiter — jeder Adapter bekommt es, ohne dass jemand etwas hinzufügen müsste.
   · **DREI DER VIER ADAPTER LESEN SIE HEUTE SCHON**, je über `asString(body.eventSourceUrl)`:
     `forwardToMeta` (src/lib/capi/meta-forward.ts) und die Adapter in
     src/lib/capi/pinterest-forward.ts und src/lib/capi/tiktok-forward.ts.
     **LinkedIn liest sie NICHT** — der Kommentarkopf von src/lib/capi/linkedin-forward.ts
     sagt es ausdrücklich. Ein Google-Zweig wäre damit der VIERTE Leser und kein
     Sonderfall.
   · **`extractGoogleClickIds` BEKÄME VON DORT EINEN EINGABEWERT.** Die Funktion
     (src/lib/capi/google-click-ids.ts) nimmt `unknown` entgegen und ist in ihrem
     eigenen Kopf genau auf diese Quelle zugeschnitten. Gesetzt wird der Wert im
     Beacon-Rumpf von `buildCapiBeaconStatement` (src/lib/tracking/meta.ts) als
     `location.href` — absolut, wie die Funktion es verlangt.
   **EIN NAHELIEGENDER EINWAND IST GEPRÜFT UND TRÄGT NICHT:** Der Bestätigungs-Beacon
   `buildPixelConfirmStatement` (ebenda) trägt `eventSourceUrl` ausdrücklich NICHT
   ("BARE Payload"). **Das trifft den Fan-Out nicht:** Der Bestätigungs-Zweig
   (`isBrowserConfirm` in `handleIngest`) kehrt mit seiner 204 zurück, BEVOR der
   Forward-Block erreicht wird. Ein Confirm kommt an der Fan-Out-Stelle nie an.
   **WAS OFFEN BLEIBT UND DER GRUND IST, WARUM DIESER EINTRAG NICHT ENTFÄLLT:** Gemessen
   ist, dass die URL ANKOMMT — nicht, dass sie eine Klick-Kennung TRÄGT. Beide Lücken
   aus Vermerk 1 stehen unverändert: dass eine ECHTE gclid von Google denselben Weg
   nimmt, ist NICHT GEPRÜFT, und gemessen ist ein EIN-SEITEN-FALL. Auf einer Seite mit
   mehreren Schritten ist `location.href` zur Conversion-Zeit eine andere URL als beim
   Einstieg.
   **ERSETZT AM 2026-08-29** — hier stand, die Verfügbarkeit an der Fan-Out-Stelle sei
   NICHT GEMESSEN, samt der Auflage an den Transport-Zuschnitt, sie zu prüfen. Die
   Prüfung ist gefahren, die Auflage ist damit eingelöst; der Wortlaut war bis zu diesem
   Tag richtig.
   TRIGGER: die Transport-Scheibe — jetzt für die verbliebene Frage nach dem INHALT der
   URL, nicht mehr für ihre Verfügbarkeit.
7. **DIE NORMALISIERUNG DER KUNDENNUMMER GEHÖRT AN DIE EINGABE, NICHT IN DEN REINEN
   BAUER.** GEMESSEN 2026-08-28 (OWNER), Messung B1: `operatingAccount.accountId` muss
   numerisch sein — "000-ERFUNDEN-000" wird mit `INVALID_NUMBER_FORMAT` abgewiesen
   (docs/ziel-befunde.md, Teil (bt)).
   DER PREIS, UND ER IST DER GRUND FÜR DIESEN EINTRAG: **Google Ads zeigt Kundennummern
   MIT Bindestrichen an.** Ein Betreiber schreibt ab, was er sieht. Ohne Normalisierung
   an der EINGABE entsteht ein STILLER Fehlschlag — die Anfrage wird abgewiesen, niemand
   sieht etwas, und die Conversion fehlt.
   **buildIngestEventsRequest NORMALISIERT AUSDRÜCKLICH NICHT UND SOLL DAS NICHT ÄNDERN**
   — der reine Bauer reicht beide Kennungen unverändert durch, und diese Entscheidung
   steht im Zuschnitt dieser Scheibe. Der Ort für die Normalisierung ist die Stelle, an
   der der Betreiber die Nummer eingibt; die gibt es heute nicht.
   GRENZE: Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
   gemessen (s. Teil (bt)).
   TRIGGER: die Ablage-Scheibe für die Konto-Kennungen.
8. **EINE AUSWERTUNG DER ANBIETER-FEHLER DARF NICHT NUR DEN ERSTEN fieldViolation
   LESEN — DER PARSER SAMMELT.** GEMESSEN 2026-08-28 (OWNER), Messung B1, Aufruf 7: zwei
   unbekannte Namen ergeben ZWEI fieldViolations in EINER Antwort
   (docs/ziel-befunde.md, Teil (bp)).
   WER NUR DEN ERSTEN LIEST, VERLIERT DIAGNOSTIK, DIE DER ANBIETER GELIEFERT HAT — und
   merkt es nicht, weil eine Antwort mit einem gelesenen Verstoss genauso aussieht wie
   eine mit einem einzigen.
   GRENZE: GEMESSEN ist das Sammeln auf der PARSE-Ebene. **Ob die SEMANTISCHE Ebene
   ebenfalls sammelt, ist NICHT gemessen** — Teil (bu) führt dazu eine ausdrücklich als
   ABLEITUNG gekennzeichnete Gegenannahme.
   TRIGGER: der erste Rückkanal für abgelehnte Ereignisse. Er berührt alle vier
   bestehenden Adapter — s. den Kandidaten
   "EIN ADAPTER KANN HEUTE KEIN EREIGNIS ABLEHNEN" in
   docs/claude-history/backlog-polish.md und Vorrats-Eintrag 3 oben.

9. **KEIN NEBENLÄUFIGKEITS-RIEGEL BEI DER ERNEUERUNG — ZWEI GLEICHZEITIGE LÄUFE LÖSEN
   DASSELBE ERNEUERUNGS-TOKEN DOPPELT EIN.** Die Scheibe 1a
   (s. den Abschnitt "Die Erneuerung des Zugangsdatums", Festlegung 3) baut
   ausdrücklich KEINEN Riegel — keine Sperre auf der Zeile, keine Vereinzelung, kein
   Warten.
   **WARUM DER SCHADEN KLEIN IST, und das ist der Grund für "melden statt bauen":**
   Google rotiert das Erneuerungs-Token NICHT (GEMESSEN 2026-08-28, OWNER, Messung C;
   docs/ziel-befunde.md, Google-Abschnitt, Teil (bv)). Der zweite Lauf bekommt ein
   gültiges Zugangsdatum wie der erste; was entsteht, ist ein ÜBERFLÜSSIGER NETZAUFRUF
   und eine zweite Schreibung derselben Zeile — kein verlorener Zugang.
   **DIE GRENZE, UND SIE HÄNGT AN EINER FREMDEN EIGENSCHAFT:** Diese Einschätzung ruht
   VOLLSTÄNDIG darauf, dass der Anbieter nicht rotiert. **Rotierte er, wäre derselbe
   Fall ein VERLORENER ZUGANG** — der zweite Lauf entwertete das Token des ersten, und
   der Schaden wäre nicht ein Netzaufruf, sondern eine Neu-Autorisierung durch den
   Kunden. Ein Anbieter kann das ändern, ohne dass hier etwas rot wird.
   **AUSDRÜCKLICH NICHT ÜBERTRAGBAR:** Für LinkedIn ist die Nicht-Rotation NICHT
   gemessen. Wer den Rahmen um einen zweiten Anbieter-Zweig erweitert, prüft sie dort
   eigens — s. Teil (bz).

   **ERGÄNZT AM 2026-08-29 — EINE ZWEITE ACHSE, DIE DIESER EINTRAG BIS DAHIN NICHT
   FÜHRTE. DER TEXT DARÜBER BLEIBT WÖRTLICH STEHEN.** Er beschreibt die ROTATIONS-Achse
   vollständig und richtig; was fehlte, ist eine davon UNABHÄNGIGE.

   **DIE ACHSE: AUSSTELLUNGS- UND SCHREIBREIHENFOLGE KÖNNEN DIVERGIEREN.** Lauf A stellt
   aus, Lauf B stellt aus, B schreibt, A schreibt — danach steht das **ÄLTERE** Token in
   der Zeile. Das ist kein Rotations-Problem: es tritt auch dann ein, wenn der Anbieter
   NICHT rotiert, weil es an unserer Schreibreihenfolge hängt und nicht an seiner
   Token-Vergabe.

   **WARUM DAS ZÄHLT, UND ERST DIESER SATZ MACHT ES ZU EINEM POSTEN:** Invalidierte der
   Anbieter das vorige ZUGANGSDATUM bei Ausstellung eines neuen, stünde in der Zeile ein
   **TOTES Token mit einem Ablaufzeitpunkt in der ZUKUNFT** — und der Vorlauf aus
   Festlegung 1 erneuerte es NICHT, weil die Uhr sagt, es reiche noch. Der Fehlzustand
   wäre damit genau der stumme, gegen den die Scheibe 1a überhaupt gebaut wird.

   **PROVENIENZ: UNGEMESSEN.** Ob der Anbieter ein vorheriges Zugangsdatum bei der
   Ausstellung eines neuen entwertet, ist an keiner Schnittstelle erhoben. Messung C
   belegt ZWEI ERFOLGREICHE EINLÖSUNGEN — sie belegt **NICHT** die gleichzeitige
   Gültigkeit zweier ausgestellter Zugangsdaten. **WER DAS AUS (bv) ABLEITET, LEITET
   MEHR AB, ALS DORT STEHT.**

   **DERSELBE SACHVERHALT STEHT IM KOMMENTARKOPF VON src/lib/oauth/token-refresh.ts**,
   dort als ACHSE 2 neben der Rotation. Zwei Orte, weil der eine beim Zuschneiden und
   der andere beim Bauen gelesen wird; die Angabe ist an beiden dieselbe und trägt an
   beiden ihre Provenienz.

   GEMELDET, NICHT GEBAUT. KEINE EMPFEHLUNG.
   TRIGGER: eine gemessene Rotation bei irgendeinem Anbieter dieses Rahmens, ODER ein
   Auslöser (Scheibe 1b), der die Funktion nachweislich nebenläufig ruft.

10. **`retry` HAT KEINE OBERGRENZE, UND SCHEIBE 1b MUSS EINE LIEFERN.** DREI Ausgänge
    der Erneuerungs-Funktion können DAUERHAFT sein und trotzdem `retry` melden:
    `unexpected` (ein Anbieter-Code, den wir nicht abbilden), `read` (die Datenbank
    antwortet nicht), und seit der Entscheidung B-2 der unbrauchbare 2xx-Rumpf.
    **UNTER EINEM MENSCHEN-AUSLÖSER IST DAS HARMLOS** — jemand klickt, bekommt `retry`,
    und hört irgendwann auf. **UNTER EINEM AUTOMATISMUS IST ES EINE SCHLEIFE, DIE JE
    DURCHLAUF EINEN ECHTEN ERNEUERUNGSRUF VERBRAUCHT.**
    **DIESELBE FIGUR WIE DIE BEGRÜNDUNG AN `write_failed`, EINE EBENE HÖHER:** Dort hält
    der ZUSTAND den Wiederholer an (`misconfigured` statt `retry`), weil eine
    CHECK-Verletzung sich durch Wiederholen nie auflöst. Hier gibt es niemanden, der ihn
    anhält — `retry` sagt "nochmal", und die Funktion kennt keine Zählung, keine
    Verzögerung und keine Obergrenze. **Sie soll sie auch nicht kennen: eine
    Bibliotheksfunktion ohne Aufrufer kann nicht wissen, wie oft sie schon lief.**
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG, wo die Grenze liegt oder wie
    sie aussieht.
    TRIGGER: der Zuschnitt der Scheibe 1b.

11. **G18/G19 MESSEN UNSERE VERZWEIGUNG, NICHT DIE FEHLERFORM DER LAUFZEIT.** Die zwei
    Tests, die den verschobenen Deckel bewachen (Entscheidung B-4), arbeiten mit einer
    Attrappe, die **den Namen `AbortError` SELBST WÄHLT**. Sie beweisen, dass unsere
    Verzweigung diesen Namen richtig behandelt.
    **WAS SIE NICHT BEWEISEN: ob die Laufzeit bei einem Abbruch WÄHREND DES RUMPF-LESENS
    denselben Namen wirft.** Das ist UNGEMESSEN — für `fetch` selbst ist das Verhalten im
    Bestand mehrfach beobachtet, für den Rumpf-Strom nicht.
    **DER SCHADEN WÄRE BEGRENZT, und der Satz gehört dazu, damit der Posten nicht grösser
    gelesen wird als er ist:** Beide Wege enden in `retry` — nur die Diagnose wäre
    `network` statt `timeout`. **OHNE DIESEN EINTRAG GILT DIE ACHSE BEIM NÄCHSTEN LESEN
    ALS GEPRÜFT**, weil zwei grüne Tests danebenstehen.
    GILT FÜR G18 UND G19 GLEICHERMASSEN.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die erste Runde, die einen echten Abbruch am Rumpf-Strom beobachten kann.

12. **TEIL (bv) IST MEHRDEUTIG UND BLEIBT ES.** "Kein neues Erneuerungs-Token an die
    Stelle des alten" trennt **"das Feld fehlt"** nicht von **"das Feld trägt denselben
    Wert"**.
    **DER BAU IST UNTER BEIDEN AUSLEGUNGEN RICHTIG** — `toRefreshedPayload`
    (src/lib/oauth/google-refresh.ts) übernimmt einen vorhandenen, nicht-leeren Wert und
    lässt sonst den abgelegten stehen; er bliebe auch dann richtig, wenn der Anbieter
    eines Tages doch rotierte. **DER POSTEN IST NICHT DER CODE, SONDERN DIE FUNDSTELLE:**
    Solange der Satz dort steht, leitet die nächste Runde die Mehrdeutigkeit neu ab.
    NICHT IN DIESER RUNDE: docs/ziel-befunde.md bleibt unberührt.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die docs/ziel-befunde.md ohnehin öffnet — dann wird es
    dort nachgezogen.

13. **ZWEI EINTRÄGE AUS DEM VORRAT DER PHASE 11.8, HIERHER ÜBERNOMMEN.**
    **HERKUNFTSDATEI: docs/aktiver-stand-11.8.md**, Abschnitt "Vorrat (gemeldet, nicht
    gebaut)", Einträge 5 und 6. **DER GRUND FÜR DIE ÜBERNAHME IST IHR ORT, NICHT IHR
    INHALT:** Jene Datei ist archiviert und wird nicht mehr geladen; beide Trigger sind
    inzwischen EINGETRETEN, und ein eingetretener Trigger in einer ungelesenen Datei ist
    ein Posten, der still stirbt.
    **NUR ÜBERNOMMEN — NICHT NEU GEMESSEN, NICHT BEHOBEN, NICHT UMFORMULIERT.** Die
    Befunde und ihre Provenienz stehen am Ursprung und werden hier NICHT verdoppelt.
    · **`'google'` FEHLT IN `TRACKING_TARGETS`** — die Zeile ist für die Oberfläche
      unsichtbar und über die Anwendung nicht löschbar. **TRIGGER EINGETRETEN:** Die
      Aufnahme ist Scheibe 3 des Schnitts (bindende Entscheidung (6)), und sie kommt VOR
      dem Transport (bindende Entscheidung (8)).
    · **`ensureTrackingKey` LÄUFT IM GOOGLE-OAUTH-WEG NICHT** — anders als in
      `setCapiToken`. Ein Projekt, das ausschliesslich über diesen Weg konfiguriert wird,
      hat womöglich keinen Tracking-Schlüssel. **TRIGGER EINGETRETEN:** Der Ursprung
      führt ihn als "VORBEDINGUNG der Transport-Scheibe"; die Scheibe 1a hat ihn
      gemessen bestätigt und ausdrücklich NICHT behoben.
    ÜBERNOMMEN 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.

14. **DER KOMMENTARKOPF VON `createAdminClient` IST ZU WEIT.** Er sagt: "GESCHRIEBEN wird
    in BEIDE — project_secrets UND project_tokens (Doppelschreib in
    setCapiToken/removeCapiToken; die Alt-Tabelle ist die Rollback-Reserve)".
    **GEMESSEN am Code (CC, 2026-08-29):** Der `project_tokens`-Zweig in `setCapiToken`
    liegt hinter `if (target === META_TARGET)`, ebenso der in `removeCapiToken`. Für die
    drei anderen Ziele beschreibt der privilegierte Client **nur EINE** Tabelle.
    **ALS AUSSAGE ÜBER META RICHTIG, ALS AUSSAGE ÜBER DEN CLIENT ZU WEIT** — und der Satz
    steht dort, um zu erklären, WOFÜR es diesen Client gibt; mit einer Tabelle zu viel
    erklärt er einen Doppelschreib, den es für drei von vier Zielen nicht gibt.
    FUNDSTELLE: `src/lib/supabase/admin.ts`, Kommentarkopf von `createAdminClient`.
    **AUSDRÜCKLICH NICHT MITGEZÄHLT:** `setCapiToken` schreibt zusätzlich `projects`
    (settings und tracking_key) — aber über den SSR-Client, nicht über diesen. Der
    Kommentar ist an dieser Stelle also nicht unvollständig, sondern nur zu weit.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde, die `src/lib/supabase/admin.ts` ohnehin anfasst.

15. **DIE FIXTURE-LISTEN IN `CodeImporter.test.tsx` SIND UNGEPRÜFT.** Mehrere Läufe dort
    schreiben Consent-Schlüsselmengen als Literal ab (`toEqual(["meta", "pinterest",
    "tiktok"])` und Verwandte) und prüfen damit den ausgelieferten Text eines konkreten
    Fixtures, nicht die Konstante.
    **OB SIE BEI EINEM FÜNFTEN ZIEL BRECHEN, HÄNGT AM FIXTURE UND IST NICHT ERHOBEN.**
    Der Unterschied zu den zwei Zahlen aus Festlegung (5) ist genau dieser: jene sind
    GEMESSEN und brechen sicher, diese sind UNGEMESSEN und brechen vielleicht.
    Beides ungeprüft in einen Bau-Plan zu schreiben wäre dieselbe Sicherheit für zwei
    verschiedene Wissensstände.
    GEMELDET 2026-08-29, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: Stufe 1 der Scheibe 3 — dort ist es ein GATE, kein Hinweis.

**EIN VERMERK ZUM VORRAT DER PHASE 11.8, KEIN EINTRAG** (2026-08-29): Der dortige
Eintrag 7 — "`decryptSecret` HAT WEITERHIN KEINEN AUFRUFER IM PRODUKTIVCODE" — **IST MIT
DIESER SCHEIBE GEGENSTANDSLOS.** `refreshAccessToken` liest, dechiffriert und zerlegt
eine echte Zeile aus `project_secrets.secret_enc`; der Live-Test hat den Pfad gefahren.
**docs/aktiver-stand-11.8.md WIRD DAFÜR NICHT ANGEFASST.** Der Sonderfall jener Datei —
archiviert, aber nicht verschoben — ist im Verfahren ungeregelt, und ein rückwirkender
Eingriff in eine abgeschlossene Phase wäre eine EIGENE Entscheidung. Sie steht hier
ausdrücklich AUS. Dieser Vermerk ist der einzige Ort, an dem der Sachverhalt festgehalten
ist; wer jene Datei liest, findet dort einen Eintrag, der nicht mehr zutrifft, und
NICHTS, das darauf hinweist.

**EIN ZWEITER VERMERK, KEIN EINTRAG — DIE AUSLEGUNG DES SKILL-KONFLIKTS** (2026-08-29):
Der projekteigene Skill `supabase-doku` verlangt eine Anbieter-Lesung, sobald ein Schema,
eine Policy oder ein Constraint berührt **oder auch nur erfragt** wird. Eine
READ-ONLY-Runde kann sie nicht erbringen: Der Anbieter-Crawl legt gemessenermassen
Dateien an (je Navigation eine `page-*.yml`; GEMESSEN 2026-08-25, festgehalten in
docs/immer-beachten.md).
**DIE AUSLEGUNG (ARCHITEKT, 2026-08-29):** Der Auslöser greift NICHT, wenn die Frage
UNSEREN Constraint betrifft und keine Anbieter-Eigenschaft — es gäbe keine
Anbieter-Angabe, die die Antwort trüge; die Antwort steht im SQL-Editor.
**DASS DIES EINE AUSLEGUNG IST UND KEINE REGELÄNDERUNG, IST DER GANZE ZWECK DIESES
VERMERKS.** Der Wortlaut des Skills ist unberührt, und diese Datei ist nicht der Ort, an
dem er geändert würde (Weg 7: docs/arbeitsweise.md, als Änderungsantrag). **ER STEHT HIER,
DAMIT DIE NÄCHSTE KOLLISION NICHT NEU VERHANDELT WIRD** — sie ist eingetreten, sie wird
wieder eintreten, und ohne eine festgehaltene Auslegung entscheidet sie jede Runde neu und
möglicherweise anders.
**DIE GRENZE:** Sie deckt AUSSCHLIESSLICH den Fall "unser eigener Constraint, keine
Anbieter-Eigenschaft, READ-ONLY-Runde". Sie sagt NICHTS über eine Runde, die baut, und
nichts über eine Frage nach dem VERHALTEN des Anbieters — dort greift der Auslöser
unverändert.
PROVENIENZ: die Kollision GEMESSEN am eigenen Lauf (CC, 2026-08-29); die Auslegung eine
ARCHITEKTEN-FESTLEGUNG desselben Tages, keine Messung.

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

4. **DIE LIVE-BESTÄTIGUNG AUS VERMERK 6, ABLEITUNG 1, GEHÖRT SACHLICH NACH
   docs/ziel-befunde.md, TEIL (bx) — DORT IST SIE NOCH NICHT VERORTET** (angetreten
   2026-08-31). Teil (bx) hält fest, dass `refresh_token_expires_in` beim CODE-TAUSCH kam,
   und lässt die Erneuerung offen; VERMERK 6, Ableitung 1 schliesst genau diese Lücke am
   eigenen Produktivpfad. Solange sie nur in dieser Standdatei steht, verschwindet sie mit
   der Archivierung der Phase aus dem Befund-Bestand. NICHT IN DIESER RUNDE VOLLZOGEN:
   docs/ziel-befunde.md bleibt unberührt. TRIGGER: die nächste Runde, die
   docs/ziel-befunde.md ohnehin öffnet — dieselbe Runde wie Vorrats-Eintrag 12 dieser
   Datei, und beides gehört zusammen erledigt. KEINE EMPFEHLUNG. PROVENIENZ: FOLGE aus
   dem Vergleich der beiden Fundstellen (CC, 2026-08-31), keine Messung.

5. **"### Vollzogen — was hier stand und wohin es gegangen ist" IST EINE HAUSFORM ÜBER
   STANDDATEIEN HINWEG, KEINE LOKALE DUBLETTE** (angetreten 2026-08-29).
   DER BEFUND — GEMESSEN am Repo (CC, 2026-08-29; Achse: der Titel-Kern ohne
   Gedankenstrich, case-insensitiv, mehrzeilig, Testdateien eingeschlossen, mit
   Positiv- und Negativkontrolle): SECHSMAL in docs/claude-history/phase-11.1-linkedin.md,
   ZWEIMAL in docs/aktiver-stand.md — **in beiden Dateien als deren EIGENE Überschriften,
   NICHT als Zeiger auf eine fremde.** Jede künftige Phase erzeugt ihn erneut, weil die
   Verdichtungs-Bauform ihn verlangt.
   **DIE ENTSCHEIDUNG IST NICHT, OB MAN HIER UMBENENNT.** Sie lautet, ob die Hausform in
   ALLEN Standdateien einen unterscheidenden Zusatz bekommt. Eine Umbenennung nur an
   einer Stelle machte diese Datei intern eindeutig und die Hausform inkonsistent — der
   nächste Leser fände denselben Titel dann in zwei Bauformen und wüsste nicht, welche
   gilt.
   VERWANDT MIT KANDIDAT 3: Dort steht die ACHSE (ein Titel als Suchanker), hier der
   FALL. Die Begründung wird NICHT verdoppelt.
   **DER BEFUND ÜBER DAS PRÜFVERFAHREN, und er ist der brauchbarere Teil dieses
   Kandidaten:** Eine Titelsuche findet ZEIGER und NAMENSVETTERN gleichermassen, und nur
   die Zeiger zählen — **ein Namensvetter in einer fremden Datei stirbt bei einer
   Umbenennung nicht.** Wer beides zusammenzieht, hält jeden mehrfach vergebenen Titel für
   unantastbar und benennt nie wieder etwas um. Die Trennung leistet der Kontext des
   Treffers: eine Überschrift ist ein Namensvetter, ein Zitat im Fliesstext ist ein
   Zeiger.
   NICHT ENTSCHIEDEN: ob die Hausform einen Zusatz bekommt, welcher, und ob die
   bestehenden Vorkommen nachgezogen werden. KEINE EMPFEHLUNG.
   GEMELDET 2026-08-29, NICHT GEBAUT.
   PROVENIENZ: die Zählung GEMESSEN am Repo (CC, 2026-08-29); dass jede künftige Phase
   den Titel erneut erzeugt, ist eine ABLEITUNG aus der Verdichtungs-Bauform, keine
   Messung.
