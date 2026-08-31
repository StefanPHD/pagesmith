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
· Die Rückkehr in das gestartete Projekt — eine mitgereiste Fix-Scheibe
· Die Konto-Kennungen bekommen ihre Eingabe — Scheibe 2 des Schnitts der Phase 11.2
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

**EIN WEG HINEIN OHNE WEG HINAUS IST EINE SACKGASSE IM EIGENEN PROJEKT.** Dieser Satz
stand als Begründung der Reihenfolge im Zuschnitt und ist mit dem Vollzug NICHT abgelaufen
— er ist kein Zuschnitt-Argument, sondern ein MUSTER: **Ein Ziel, das man verbinden, aber
nicht trennen kann, ist schlechter als eines, das es gar nicht gibt.** Wer verbunden hat,
kommt ohne den SQL-Editor nicht mehr heraus, und die Anwendung zeigt ihm den Zustand nicht
einmal an.
**ER TRIFFT JEDES KÜNFTIGE ZIEL MIT EINEM AUTORISIERUNGS-FLUSS**, nicht nur Google: Sobald
ein Weg hinein gebaut wird, gehört der Weg hinaus in DIESELBE Scheibe. **SCHEIBE 2 BAUT
DARAN WEITER** — sie gibt den Kennungen eine Eingabe, und für die gilt dasselbe.

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

### Vollzogen — was im Zuschnitt der Scheibe 3 stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH VON DEM DER SCHEIBEN 11.2a UND 1a AB** (dort jeweils
"### Vollzogen — was hier stand und wohin es gegangen ist"): Jener Titel steht in dieser
Datei bereits ZWEIMAL und ist als Hausform über Standdateien hinweg als
Hebungs-Kandidat 5 verortet. Ein DRITTES gleichlautendes Vorkommen vertiefte eine
Anker-Kollision, die diese Datei gerade festgehalten hat.

VERDICHTET AM 2026-08-31, nach dem Bau-Commit `659d672`, dem Fix `7771019` und dem
bestätigten Live-Test. Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem
Vollzug abgelaufen. DREI Unterabschnitte und ZWEI Absätze sind entfallen:

- **"Warum jetzt"** trug die Begründung der Reihenfolge — die Sackgasse (verbinden ja,
  trennen nein) und die Unsichtbarkeit der bestehenden Zeile. **WAS ENTFALLEN IST, WAR DER
  VERGLEICH MIT EINEM ZUSTAND, DEN ES NICHT MEHR GIBT:** Der Abschnitt begründete, warum
  diese Scheibe VOR Scheibe 2 kommt, indem er den Zustand VOR ihr beschrieb. Beide
  Hälften jenes Zustands sind mit dem Vollzug behoben; der Text verglich ab da mit nichts.
  **DIE ZWEI FORTWIRKENDEN AUSSAGEN SIND NICHT VERSCHWUNDEN, sondern stehen im KOPF dieses
  Abschnitts:** dass die Halbordnung 3 vor 2 erlaubt, und der Satz über die Sackgasse —
  jener als MUSTER für jedes künftige Ziel mit einem Autorisierungs-Fluss, nicht als
  Begründung dieser Reihenfolge.
- **"Der Scope — und wo er zum STOPP wird"** nannte, was diese Scheibe nicht anfassen
  darf. Der Scope einer gebauten Scheibe ist mit ihrem Vollzug abgelaufen; was tatsächlich
  angefasst wurde, steht im Vermerk. **SEINE EINE FORTWIRKENDE ZEILE IST NICHT
  VERSCHWUNDEN:** "die Schuld der Scheibe 11.2a wandert weiter" — der nachgeschuldete
  Live-Nachweis für `buildGoogleEvent` und `extractGoogleClickIds` — steht jetzt in
  VERMERK 7 unter "Was der Live-Test NICHT zeigt", und zwar dort, wo die nächste Runde ihn
  liest.
- **"Zwei Auflagen an Stufe 1"** verlangte je Tor einen Test, der sein Tor benennt, und
  einen Wächter über die Geheimnis-Felder der vier bestehenden Ziele. **BEIDE SIND
  EINGELÖST** (VERMERK 7 nennt die Fundstellen). Ihre Begründungen leben AM CODE weiter:
  in den Kommentarköpfen der vier Tor-Tests und in `tracking/target-cards.test.ts`.
- **Das offene Gate an Festlegung (4)** (darf eine `"use server"`-Datei aus einer
  `"use client"`-Datei importieren?) ist durch die Entscheidung E1 gegenstandslos
  geworden: Die Konfiguration ist in ein reines lib-Modul gewandert, das unter BEIDEN
  Ausgängen der Frage trägt. Der Ersatz steht als ein Satz an Ort und Stelle.
- **Das offene Gate an Entscheidung (C)** (kann `GOOGLE_TARGET` als `TrackingTarget`
  getypt werden?) ist BEANTWORTET und durch sein Ergebnis ersetzt, ebenfalls an Ort und
  Stelle.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** die sechs Festlegungen, die drei Entscheidungen, der Abschnitt
"Was die Aufnahme erzwingt" und die Beweis-Achse. Sie sind GRÜNDE und BEFUNDE, keine
Anweisungen; jede von ihnen bindet eine spätere Scheibe. Die Begründung je Stück steht an
ihr selbst.

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
GRUND: Google braucht ZWEI Kennungen auf ZWEI VERSCHIEDENEN ACHSEN — eine je PROJEKT (die
Google-Ads-Kundennummer, `operatingAccount.accountId`) und eine je EREIGNISTYP
(`productDestinationId`, weil sie je Conversion-Action gilt) — die Kennungen sind
Scheibe 2, und ein Eingabefeld hier entschiede ihre Ablage im client-besessenen
Einstellungs-Blob durch die Hintertür.
**GRENZE, UND SIE GEHÖRT ZWINGEND IN DIESEN ZUSCHNITT:** Mit Scheibe 2 fällt Tor A
**ABSICHTLICH**. Danach tragen **TOR B UND TOR D** — Tor B ist eine Aussage über eine
DATENBANK-SPALTE, nicht über die Oberfläche: Der Resolver liest die Klartext-Spalte
`secret`, und die Google-Zeile trägt dort NULL (der Callback schreibt `secret: null` und
`secret_enc`, der CHECK `project_secrets_secret_genau_eines` erzwingt genau eines von
beiden). **TOR D HÄLT UNABHÄNGIG DAVON UND IST FÜR SICH HINREICHEND:** `'google'` steht
nicht in `TARGETS_WITH_ADAPTER`, und `dispatchForward` kehrt für ein Ziel ohne Adapter mit
`Promise.resolve()` zurück — auch wenn Tor B fiele, entstünde kein Netzaufruf.
**WER SCHEIBE 2 ZUSCHNEIDET, PRÜFT TOR B DORT NEU.** Ohne diesen Satz liest jene
Runde die vier geschlossenen Tore als dauerhaft, und sie sind es nicht.

**ZWEI SACHKORREKTUREN AN DIESER FESTLEGUNG, VOLLZOGEN AM 2026-08-31 — ERSETZT UND NICHT
GESTEMPELT.** Beide betreffen TATSACHENBEHAUPTUNGEN, nicht die Festlegung selbst: Die
Festlegung "TOR A WIRD ZUGEHALTEN" gilt unverändert, und die Scheibe 3 ist von beiden
Korrekturen in ihrem Vollzug NICHT berührt. Gestempelt wird hier nicht, weil dieser
Abschnitt ein MASSSTAB ist — wer die nächste Ablage-Frage an ihm misst, misst sonst an
einer falschen Angabe (docs/immer-beachten.md, "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR
BELEG FALSCH WIRD").
· **ERSTE KORREKTUR — HIER STAND "Google braucht ZWEI Skalare, wo `pixelId` einen trägt
  (Kundennummer und Ziel-Kennung)".** Das ist am Befund falsch: `productDestinationId` ist
  **kein projektweiter Skalar**. Sie gilt JE CONVERSION-ACTION "und damit faktisch je
  Ereignistyp, nicht je Projekt" — docs/ziel-befunde.md, Google-Abschnitt, Teil (k),
  Katalog-Frage C3. **DER UNTERSCHIED IST NICHT KOSMETISCH:** Aus "zwei Skalare" folgt "wir
  brauchen einen zweiten Skalar-Slot"; aus der richtigen Fassung folgt, dass die zweite
  Kennung auf die Achse gehört, die der Blob bereits führt. Die alte Fassung hätte den
  Zuschnitt der Scheibe 2 in die falsche Richtung gelenkt.
· **ZWEITE KORREKTUR — HIER STAND "Danach trägt Tor B allein".** Das ist ZU ENG. GEMESSEN
  am Repo (CC, 2026-08-31, Aufklärungsrunde zur Scheibe 2, mit Positivkontrolle je Achse):
  Tor D hält unabhängig von Tor B und ist für sich hinreichend; Tor C bleibt ebenfalls
  geschlossen, ist aber **hinter Tor B unerreichbar** — `allowedTargets` bekommt bereits
  gepaarte `ResolvedTarget[]`, und `'google'` ist dort nie enthalten. "Allein" hätte gelesen
  werden können als "nur noch ein Riegel steht"; es stehen zwei.
· **WAS UNBERÜHRT BLEIBT UND WARUM:** Der Satz "WER SCHEIBE 2 ZUSCHNEIDET, PRÜFT TOR B DORT
  NEU" bleibt WÖRTLICH. Er ist durch die zweite Korrektur nicht falsch geworden, sondern nur
  enger als der Satz darüber — und er ist mit dem Zuschnitt der Scheibe 2 eingelöst (dort
  sind Tor B UND Tor D geprüft). Eine Ausweitung hätte die Korrektur über die zwei
  benannten Sätze hinaus getragen, ohne dass ein Satz falsch gewesen wäre.
· **EINE ZWILLINGSSTELLE BLEIBT UNKORRIGIERT, UND DAS IST DER SCOPE DIESER RUNDE UND KEIN
  URTEIL:** Der Kommentarkopf zum fünften Ziel in `src/lib/tracking/target-cards.ts` trägt
  die erste Aussage WÖRTLICH ("Google braucht ZWEI Skalare, wo pixelId einen traegt
  (Kundennummer und Ziel-Kennung)") — GEMESSEN am Repo (CC, 2026-08-31; Achse: formale Suche
  über `*.md`, `*.ts`, `*.tsx` nach "ZWEI Skalare", vier Treffer, davon zwei zu einem
  ANDEREN Gegenstand — GA4 in docs/ziel-befunde.md und die Ziel-Zahl in docs/roadmap.md).
  Diese Doku-Runde fasst keine Produktivdatei an. **DIE STELLE WIRD IM SELBEN ZUG WIE DIE
  KARTE KORRIGIERT — sie liegt in der Datei, die Scheibe 2 ohnehin öffnet.** Ohne diesen
  Absatz stünden nach dieser Runde zwei Fassungen derselben Aussage nebeneinander, und die
  falsche stünde im Code.
**PROVENIENZ:** Die erste Korrektur ist GELESEN (docs/ziel-befunde.md, Teil (k)/C3 — dort
selbst als Doku-Lesung ausgewiesen, NICHT gemessen). Die zweite ist GEMESSEN am Repo (CC,
2026-08-31). Die Zwillingsstelle ist GEMESSEN am Repo (CC, 2026-08-31).

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
**DAS GATE DAZU IST BEANTWORTET, UND ZWAR OHNE DIE FRAGE ZU ENTSCHEIDEN (E1, ARCHITEKT,
2026-08-29):** Ob eine `"use server"`-Datei aus einer `"use client"`-Datei importieren
darf, ist **am Code nicht entscheidbar** und **bleibt es**. Die Konfiguration ist deshalb
VOLLSTÄNDIG in ein reines lib-Modul gewandert (`src/lib/tracking/target-cards.ts`) — der
einzige Weg über diese Grenze, den der Bestand vorlebt, und richtig **unter beiden
Ausgängen** der offenen Frage. **KEIN Re-Export aus der Karten-Datei**, sonst gäbe es zwei
Adressen für eine Sache. Die volle Begründung steht im Kopf jenes Moduls.

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
**DAS GATE DAZU IST BEANTWORTET (Gate 3 der Stufe 1, GEMESSEN am Code, CC, 2026-08-29):**
Ein `import type` erzeugt **keine Laufzeit-Abhängigkeit** — er wird beim Bauen gelöscht,
und die Konstante bräuchte die Liste als WERT nicht. **ER ERZEUGT ABER EINE
BAU-ZEIT-KOPPLUNG:** `GOOGLE_TARGET` liesse sich erst typen, NACHDEM `'google'` in der
Liste steht, und `callback/route.ts` sowie `token-refresh.ts` brächen, sobald jemand es
wieder herausnähme. **Das ist genau die Richtung, die diese Entscheidung vermeidet** — der
Erneuerungs-Zweig darf nicht an der Oberflächen-Liste hängen. **DIE KONSTANTE BLEIBT
ROUTEN-LOKAL UND UNGETYPT.**

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

## Die Rückkehr in das gestartete Projekt — eine mitgereiste Fix-Scheibe

**SIE IST KEINE SCHEIBE DES SCHNITTS, UND DAS IST DER ERSTE SATZ, WEIL ER SONST FALSCH
ERSCHLOSSEN WIRD.** Der Schnitt der Phase 11.2 (bindende Entscheidung (6)) hat **1a, 1b,
2, 3 und 4** — mehr nicht. Diese hier ist eine **FIX-SCHEIBE, DIE MITREIST**.
**DIE HAUSFORM DAFÜR GIBT ES:** Phase 9 trug zwei mitgereiste Nicht-A/B-Scheiben — die
Fix-Scheibe safeAction und den Leere-Variante-Riegel (CLAUDE.md, "## Detail-Archiv",
Eintrag zu docs/claude-history/phase-9-ab-testing.md). Wer sie in den Schnitt einordnet,
hält sie für eine vergessene Nummer und sucht nach einer Lücke, die es nicht gibt.

**DER DEFEKT IST ÄLTER ALS SEINE SICHTBARKEIT.** Er liegt in Code aus **Phase 11.8** —
`loadProject()` ohne Argument und eine Callback-Route, die ihre Weiterleitung ohne
Projekt-Kennung baut. **SCHÄDLICH WURDE ER ERST DURCH SCHEIBE 3**, weil vorher NIEMAND den
Ergebniscode las: Der Kommentarkopf jener Route hielt ausdrücklich fest, es gebe "KEIN
MELDUNGSTEXT IN DIESER SCHEIBE … Text, den nichts rendert, ist toter Text". Solange nichts
rendert, ist es gleichgültig, in welchem Projekt man landet.
**DASSELBE MUSTER WIE BEI `no_state`:** ein Zustand aus 11.8, den erst die Oberfläche der
Scheibe 3 sichtbar gemacht hat. **Das ist kein Zufall, sondern die Eigenschaft einer
Scheibe, die eine stumme Mechanik erstmals anzeigt** — sie deckt auf, was vorher niemand
sehen konnte.

**PROVENIENZ DES GANZEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
ARCHITEKT, 2026-08-31. Keine Messung.** Jede mit GEMESSEN gekennzeichnete Angabe stammt
aus der Aufklärungsrunde vom 2026-08-31 (CC, am Repo, mit Positivkontrolle je Achse).

### Was diese Fix-Scheibe ist

**Der Nutzer kehrt aus dem Autorisierungs-Fluss in DAS PROJEKT zurück, in dem er gestartet
ist.**

**DER MECHANISMUS — GEMESSEN am Code (CC, 2026-08-31):** `src/app/page.tsx` ruft
`loadProject()` **ohne Argument**; `loadProject` (src/app/projects/actions.ts) fällt dann
auf `.order("updated_at", { ascending: false }).limit(1)` zurück — **das Projekt mit dem
jüngsten Zeitstempel**, nicht das zuletzt angesehene. **Die Callback-Route schreibt NICHT
auf `projects`** (ihr einziger Zugriff dort ist ein `.select("id")` für das
Eigentums-Gate), und **der Projektwechsel hält nichts fest** — er lebt ausschliesslich im
React-State des Containers, ohne Cookie, ohne `localStorage`, ohne Spalte. In Projekt B zu
wechseln ändert Bs Zeitstempel also nicht, und die Rückkehr auf `/` lädt weiterhin A.

**DER SCHADEN IST NICHT DER SPRUNG, SONDERN WAS ER MITBRINGT — und ohne diesen Absatz
liest die nächste Runde die Scheibe als Bequemlichkeits-Politur:** Der Ergebniscode
erscheint an der Google-Karte eines **FREMDEN** Projekts. Bei einem Fehlercode steht damit
eine **rote Meldung an einer Karte, die damit nichts zu tun hat**. Und wechselt der
Betreiber danach zum richtigen Projekt, läuft `handleSwitch` durch
`applyZenForLoadedCode`, wo seit dem Fix `7771019` der Reset auf `connectOutcome` steht —
**die Meldung ist dann weg.**
**IN EINEM SATZ: DIE AUSKUNFT ERSCHEINT AM FALSCHEN PROJEKT UND VERSCHWINDET AM
RICHTIGEN.**

### Vollzogen — was im Zuschnitt der Fix-Scheibe stand und wohin es gegangen ist

**DER TITEL WEICHT ABSICHTLICH AB, aus demselben Grund wie bei Scheibe 3:**
"### Vollzogen — was hier stand und wohin es gegangen ist" steht in dieser Datei bereits
zweimal und ist als Hausform über Standdateien hinweg Hebungs-Kandidat 5. Ein weiteres
gleichlautendes Vorkommen vertiefte eine Anker-Kollision, die diese Datei selbst
festhält.

VERDICHTET AM 2026-08-31, nach dem Bau-Commit `2b735aa` und dem bestätigten Live-Test.
Hier standen die ANWEISUNGEN FÜR die Scheibe; sie sind mit dem Vollzug abgelaufen. DREI
Unterabschnitte und EIN Absatz sind entfallen:

- **"Warum jetzt — und warum sie keine Scheibe des Schnitts ist"** begründete die
  Reihenfolge und grenzte die Scheibe vom Schnitt ab. **WAS ENTFALLEN IST, WAR DER
  VERGLEICH MIT EINEM ZUSTAND, DEN ES NICHT MEHR GIBT:** Der Abschnitt begründete das
  JETZT, indem er den Zustand VOR der Scheibe beschrieb — den Sprung nach A und die
  falsch verortete Auskunft. Beides ist mit dem Vollzug behoben; der Text verglich ab da
  mit nichts.
  **DREI FORTWIRKENDE AUSSAGEN SIND NICHT VERSCHWUNDEN:** Dass sie keine Scheibe des
  Schnitts ist, steht als erster Satz im KOPF dieses Abschnitts — **und dazu gehört, was
  dort noch nicht stand: SIE HAT KEINE NUMMER IM SCHNITT UND BEKOMMT KEINE.** Dass die
  **Auto-Load-Regel "zuletzt bearbeitet" unverändert bleibt und nur einen Vorrang davor
  bekommt**, lebt AM CODE weiter, im Kommentar an der Verdrahtung in `src/app/page.tsx`.
  Der Ausschluss des **Deep-Linkings** steht unverändert als Festlegung (3).
- **"Der Scope dieser Fix-Scheibe — und wo er zum STOPP wird"** nannte, was nicht
  angefasst werden darf. Der Scope einer gebauten Scheibe ist mit ihrem Vollzug
  abgelaufen; was tatsächlich angefasst wurde, steht in VERMERK 8.
  **SEINE ZWEI FORTWIRKENDEN AUSSAGEN SIND GERETTET:** Der GEMESSENE Befund, dass die
  **Refresh-Route nicht betroffen ist**, steht jetzt in VERMERK 8 — dort, wo die nächste
  Runde ihn liest. Und seine Zeile zu `no_state` ("eigener offener Punkt, **nicht
  diagnostiziert**") ist am 2026-08-31 überholt worden: Die Ursache ist gemessen, der
  Punkt in docs/offene-punkte.md umgeschrieben.
- **"Die Beweis-Achse dieser Fix-Scheibe — mit ihrer Falle"** war die Anleitung für den
  Live-Test, einschliesslich des Pflicht-Stopps auf den Vorher-Wert. Sie ist gefahren;
  ihre Ergebnisse stehen in VERMERK 8. **DIE FALLE SELBST IST KEINE ANWEISUNG UND BLEIBT
  ERHALTEN:** dass `setCapiToken` und `removeCapiToken` `projects.updated_at` setzen und
  ein Live-Test ohne festgehaltene Reihenfolge deshalb ZUFÄLLIG besteht, steht jetzt in
  VERMERK 8 **und** — in seiner produktwirksamen Gestalt — im neuen offenen Punkt "DIE
  PROJEKTWAHL ÜBERLEBT KEIN NEULADEN" (docs/offene-punkte.md).
- **Der Absatz "AUFLAGE AN STUFE 1, ALS TESTFALL UND NICHT ALS KOMMENTAR"** in Festlegung
  (2) verlangte zwei getrennte Läufe — Unterdrückung bei unauflösbarer Kennung,
  Erscheinen ohne Kennung. **BEIDE SIND EINGELÖST** (T4 und T1 in
  `src/lib/oauth/connect-return.test.ts`); ihre Begründungen leben in den Kommentarköpfen
  jener Läufe weiter. Die Festlegung selbst bleibt unangetastet.

**WAS AUSDRÜCKLICH NICHT VERDICHTET WORDEN IST, obwohl es nach Anweisung aussieht — im
Zweifel stehengelassen:** der Kopf des Abschnitts, "Was diese Fix-Scheibe ist" und die
fünf Festlegungen. Sie sind GRÜNDE und BEFUNDE, keine Anweisungen.
**EINE ÜBERSCHNEIDUNG WIRD GEMELDET STATT AUFGELÖST:** Der Mechanismus unter "Was diese
Fix-Scheibe ist" — `loadProject()` ohne Argument, die Callback-Route schreibt nicht auf
`projects`, der Projektwechsel hält nichts fest — steht ab dem 2026-08-31 **auch** im
neuen offenen Punkt. Er ist dort der GEGENSTAND, hier die HERLEITUNG der Scheibe. Wer
eine der beiden Fassungen ändert, prüft die andere.

### Die fünf Festlegungen dieser Fix-Scheibe

**(1) SERVER-SEITIG, NICHT CLIENT-SEITIG.** `page.tsx` liest die Kennung und reicht sie
als `initialProjectId` weiter; **`loadProject(id)` trägt sie bereits** — die Signatur
nimmt sie entgegen, nur ruft niemand sie so.
**DER GRUND IST KEIN GESCHMACK, SONDERN EIN GEMESSENER BEFUND (CC, 2026-08-31):** Ein
client-seitiges Umschalten nach dem Laden liefe durch `handleSwitch` und damit durch
`applyZenForLoadedCode` — **und dort steht seit dem Fix `7771019` der Reset auf
`connectOutcome`. Die Meldung stürbe, bevor sie jemand sieht.** Der server-seitige Weg
feuert ihn nicht: **alle fünf Aufrufer von `applyZenForLoadedCode` sind
Ereignis-Handler** (`resetToEmpty`, `switchVariant`, `handleRemoveVariantB`,
`handleSwitch`, `handleDelete`), **keiner läuft beim Mount**.
**DIESER UNTERSCHIED STEHT AN KEINER STELLE IM CODE**, und deshalb gehört er in den
Zuschnitt: Die beiden naheliegenden Bauformen verhalten sich hier **entgegengesetzt**, und
die naheliegendere ist die falsche.
GRENZE: Die Festlegung sagt, WO gewählt wird, nicht WIE die Kennung an `page.tsx` kommt —
das ist Festlegung (2).

**(2) DIE ADRESSE TRÄGT DIE KENNUNG — ALS HINWEIS, NICHT ALS AUTORITÄT.**
Sie wählt nur unter Projekten, die dem Nutzer **ohnehin gehören**. **DAS GATE BLEIBT
UNVERÄNDERT:** `loadProject` filtert `.eq("user_id", user.id)` **und** steht unter RLS auf
`projects`. **Die Kennung erweitert keinen Zugriff** — sie wählt innerhalb dessen, was das
Gate schon erlaubt.
**DREI AUFLAGEN, je mit ihrem Grund:**
· **FORMPRÜFUNG VOR DER ABFRAGE.** `isProjectIdShape` existiert
  (src/lib/oauth/google-authorize.ts), und die Start-Route macht es genauso vor: Eine
  formwidrige Kennung erzeugte in der Datenbank einen Typfehler, **und der wäre von einem
  echten Fehler nicht zu unterscheiden**.
· **BEI `null` KEIN LEERER EDITOR**, sondern der heutige Rückfall auf "zuletzt
  bearbeitet". **Der reale Fall ist ein Projekt, das während des Flusses gelöscht wurde**;
  ein leerer Editor mit einem roten Fehlercode daneben wäre die schlechteste aller
  Auskünfte — er sähe aus, als hätte der Nutzer gar kein Projekt.
· **KEIN EIGENER TEXT für "gehört dir nicht"** — dieselbe Begründung wie in der
  Start-Route, die drei Fälle bewusst auf einen Ausgang legt: **er verriete die Existenz
  einer fremden Kennung.**
· **LÖST DIE KENNUNG SICH NICHT AUF, WIRD DER ERGEBNISCODE NICHT ANGEZEIGT. Das PROJEKT
  fällt zurück, die MELDUNG nicht.**
  **OHNE DIESEN ZUSATZ REPRODUZIERT DER RÜCKFALL GENAU DEN FEHLER, DEN DIESE SCHEIBE
  BESEITIGT:** Der Betreiber stünde in A und sähe dort den Ergebniscode eines Vorgangs aus
  B — dieselbe falsch verortete Auskunft, nur auf einem anderen Weg dorthin.
  **DER GRUND IST DER GRUNDSATZ DIESER SCHEIBE SELBST:** Die Auskunft gehört zu EINEM
  Projekt. Löst sich die Kennung nicht auf, **gibt es kein Projekt, an dem sie richtig
  stünde** — und dann ist "gar nicht" die einzige verbleibende richtige Anzeige.
  **DER PREIS GEHÖRT DAZU UND IST KLEIN:** Im seltenen Fall — ein während des Flusses
  gelöschtes Projekt — verliert der Betreiber eine Auskunft. **Die Alternative ist eine
  FALSCH VERORTETE**, und die ist nach dem eigenen Satz dieses Zuschnitts schlechter als
  gar keine, weil er ihr glaubt.
  **GRENZE — sie ist scharf und wird beim Bauen leicht zu weit gezogen:** Die Auflage gilt
  NUR, wenn eine Kennung **DA WAR und nicht auflöste**. **Kommt gar keine** (`denied`,
  `no_state`), bleibt es bei Festlegung (5): Die Meldung **wird gezeigt**, am Projekt, das
  ohnehin geladen wird. "Keine Kennung" und "unauflösbare Kennung" sind zwei verschiedene
  Zustände, und wer sie zusammenzieht, unterdrückt die Meldung in genau dem Fall, der
  heute als einziger eintritt.
GRENZE: Die Bewertung "es leckt nichts" ruht auf der Messung des HEUTIGEN Gates (CC,
2026-08-31): `maybeSingle()` liefert bei fremder Kennung `null` — kein Name, keine
Existenz, kein Inhalt. **Wer das Gate ändert, prüft diesen Satz neu.**

**(3) DER PARAMETER IST GENAUSO FLÜCHTIG WIE DER ERGEBNISCODE.** Er wählt bei **DIESEM
EINEN** Laden aus und verschwindet mit der Suchzeichenkette.
**AUSDRÜCKLICH KEIN DEEP-LINKING, und das ist eine Abgrenzung, keine Bequemlichkeit:**
Eine Projektwahl, die ein Neuladen übersteht, ist ein **eigenes Produktmerkmal** — sie
betrifft jeden Projektwechsel, die Adresszeile und den Zurück-Knopf. **Ein halb gebautes
Deep-Linking wäre schlechter als keines**, weil die Adresse dann manchmal gilt und
manchmal nicht.
GRENZE: Sie verbietet Deep-Linking nicht für immer; sie sagt, dass es hier nicht
mitentschieden wird.

**(4) BEIDE PARAMETER WERDEN ZUSAMMEN KONSUMIERT UND ZUSAMMEN ENTFERNT.**
**GEMESSEN am Code (CC, 2026-08-31):** Der Mount-Effekt in
`src/components/CodeImporter.tsx` kehrt heute **früh zurück**, wenn kein Ergebniscode da
ist (`if (initialConnectOutcome === null) return;`), und schreibt sonst den **PFAD**
zurück (`window.history.replaceState(null, "", window.location.pathname)`) — **die ganze
Suchzeichenkette fällt weg**, nicht ein einzelner Parameter.
**FOLGE OHNE DIESE FESTLEGUNG:** Ein Projekt-Parameter **ohne** Ergebniscode bliebe stehen
und wählte bei **jedem** Neuladen erneut — genau das halbe Deep-Linking, das (3)
ausschliesst.
GRENZE: Die Festlegung verlangt, dass beide zusammen behandelt werden. **WIE** die Stelle
das tut — ob sie weiterhin den Pfad zurückschreibt oder Parameter einzeln entfernt —, ist
Sache des Bau-Plans.

**(5) `no_state` TRÄGT DIE KENNUNG NICHT — DAS WIRD AUFGESCHRIEBEN, NICHT WEGGEBAUT.
`denied` TRÄGT SIE, SEIT DAS GATE BEANTWORTET IST.**
**DER TITEL IST AM 2026-08-31 ERSETZT WORDEN, NICHT GESTEMPELT**, und der Grund gehört
dazu: Er nannte beide Ausgänge in einem Atemzug. Nach der Antwort auf das Gate wäre seine
eine Hälfte falsch — **und eine halb korrigierte Aussage ist gefährlicher als eine ganz
falsche, weil danach niemand mehr die andere Hälfte nachliest.**
**GEMESSEN am Code (CC, 2026-08-31):** Ab Schritt (2) der Callback-Route steht
`parsed.projectId` im Gültigkeitsbereich und **wird bereits benutzt** (Eigentums-Gate,
Erfolgs-Log). **Zwei Ausgänge liegen davor:** `denied` (Schritt 1, **bewusst** vor der
State-Prüfung) und `no_state` (die Kennung liegt **im fehlenden Cookie**).
**BEI `no_state` IST NICHTS ZU MACHEN. UND DAS IST DIE BITTERE POINTE, DIE IN DEN
ZUSCHNITT GEHÖRT: DER EINZIGE FEHLERCODE, DEN EIN BETREIBER BISHER JE GESEHEN HAT, IST
`no_state` — und genau der landet weiterhin am falschen Projekt.** Diese Scheibe
verbessert also ausgerechnet den Fall nicht, der heute eintritt. Wer das nicht
aufschreibt, hält den Fix nach dem Live-Test für wirkungslos.
**BEI `denied` IST DAS GATE BEANTWORTET (Bau-Runde 2026-08-31, Commit `2b735aa`) — HIER
STAND DIE FRAGE, JETZT STEHT DIE ANTWORT:** Die Kennung lässt sich mitgeben, **ohne die
bewusste Anordnung der Route zu ändern.**
**DIE UNTERSCHEIDUNG, DIE ES TRÄGT: DAS COOKIE ZU LESEN IST ETWAS ANDERES, ALS DEN STATE
ZU VERIFIZIEREN.** Die Anordnung schützt den Verweigerungsfall davor, an der
STATE-PRÜFUNG zu scheitern; `statesMatch` bleibt unangetastet an seiner Stelle weiter
unten. Im `denied`-Zweig wird ausschliesslich `projectId` entnommen.
**EIN FEHLSCHLAG DER LESUNG IST FOLGENLOS:** kein Ausgang, kein Log, kein Verdacht — dann
eben kein Parameter, und die Empfängerseite fällt zurück. **Eine normale Ablehnung kommt
weiterhin als `denied` heraus und NIE als Sitzungsfehler**; drei Läufe halten das fest
(T9a mit lesbarem Cookie, T9b ohne Cookie, T9c mit kaputtem Cookie).
**WAS UNBERÜHRT BLEIBT:** Ob Google bei einer Verweigerung den `state` mitschickt, ist
weiterhin UNGEMESSEN (docs/ziel-befunde.md, Teil (be)) — **und für diese Antwort
gleichgültig**, weil die Kennung in UNSEREM Cookie reist und nicht im `state`-Parameter
des Anbieters.

## Die Konto-Kennungen bekommen ihre Eingabe — Scheibe 2 des Schnitts der Phase 11.2

**DIE KURZFORM WIRD HIER EINMAL AUFGELÖST UND DANACH NICHT WIEDERHOLT:** "Scheibe 2" meint
die zweite Scheibe des Schnitts, in den die Phase 11.2 am 2026-08-28 zerlegt worden ist
(bindende Entscheidung (6)) — die Ablage der Google-Konto-Kennungen. **SIE IST NICHT DIE
SCHEIBE 11.2a.** Jene ist abgeschlossen und hat zwei reine Funktionen gebaut. Wie bei
Scheibe 1a und Scheibe 3 steht deshalb der INHALT im Titel und die Kurzform dahinter.

**DIE REIHENFOLGE IST EINGELÖST, NICHT ÜBERSPRUNGEN:** Scheibe 3 kam vor Scheibe 2, und das
war erlaubt — die GRENZE der bindenden Entscheidung (6) sagt "Zwingend ist NUR 4 nach 1a, 2
und 3", der Schnitt ist eine HALBORDNUNG. **NACH DIESER SCHEIBE IST DIE VORBEDINGUNGS-SEITE
DES TRANSPORTS VOLLSTÄNDIG:** 1a, 2 und 3 stehen dann; 1b darf davor oder danach kommen und
ist für Scheibe 4 nicht zwingend.

**SIE ZAHLT DIE ZWEITE DER ZWEI FEHLSTELLEN AUS DER BINDENDEN ENTSCHEIDUNG (6).** Dort
stehen neben den vier Toren zwei Dinge, die "GANZ FEHLEN": ein Lesepfad für das
Zugangsdatum und **ein Ort für die Konto-Kennungen**. Den ersten hat Scheibe 1a gebaut, den
zweiten baut diese hier. Wer das nicht mitliest, hält Scheibe 2 für eine Oberflächen-Politur
neben Scheibe 3; sie ist die andere Hälfte einer benannten Fehlstelle.

**PROVENIENZ DES GANZEN ABSCHNITTS, wo an der einzelnen Angabe nichts anderes steht:
ARCHITEKT, 2026-08-31. Keine Messung.** Jede mit GEMESSEN gekennzeichnete Angabe stammt aus
der Aufklärungsrunde vom 2026-08-31 (CC, am Repo, mit Positivkontrolle je Achse); jede mit
GELESEN gekennzeichnete steht mit ihrer Fundstelle in docs/ziel-befunde.md und wird hier
**nicht verdoppelt** — zweimal geschrieben liefe sie auseinander.

### Woraus Scheibe 2 besteht

**Die zwei Google-Konto-Kennungen bekommen eine Eingabe, eine Ablage und eine Anzeige — und
sonst nichts.** Kein Transport, keine Nutzlast, kein Netzaufruf.

**DER EIGENTLICHE GEGENSTAND IST NICHT DAS EINGABEFELD.** Er ist, dass `settings.pixels.google`
heute über die Oberfläche **gar nicht entstehen kann**. GEMESSEN am Repo (CC, 2026-08-31):
`TARGET_CARDS.google` (src/lib/tracking/target-cards.ts) trägt ausschliesslich `name:
"Google"` — weder `publicLabel` noch `secretLabel`; die Karte schaltet ihre beiden Feldgruppen
über die ABWESENHEIT dieser Beschriftungen. **Positivkontrolle:** dieselbe Ablesung findet
für `linkedin` die drei `secret*`-Felder und für `meta` alle sechs. **FOLGE:** Ein
Betreiber, der Google verbunden hat, kann heute keine einzige Kennung hinterlegen — die
Karte steht auf "Zugangsdaten hinterlegt" und das Ziel bleibt ohne jede Kennung.

**WAS DAMIT EINGELÖST WIRD, UND ES STEHT BEREITS ALS SCHULD IM ZUSCHNITT DER SCHEIBE 3:**
Deren Festlegung (1) hält fest, Tor A werde "ZUGEHALTEN, NICHT ABGEWARTET", und ihre GRENZE
sagt: "Mit Scheibe 2 fällt Tor A **ABSICHTLICH**." **Das ist diese.**

**ZWEI BEFUNDE, DIE DIESE SCHEIBE ERZWINGT — BEFUND, KEINE AUFLAGE** (GEMESSEN am Repo, CC,
2026-08-31). Sie stehen hier, weil ein Bau-Plan sonst auf sie stösst und sie für eine
Scope-Ausweitung hält:
- **DIE EREIGNIS-ACHSE IST HEUTE AUF EIN ZIEL VERDRAHTET.** `RULES_TARGET` ist eine
  Konstante mit dem Wert `"linkedin"` (src/components/CodeImporter.tsx), und
  `src/components/MeasureView.tsx` rendert GENAU EINEN Block mit der Überschrift
  "Conversion-Regeln ({TARGET_CARDS[rulesTarget].name})". Ein zweites Ziel auf derselben
  Achse verlangt, dass aus der Konstante eine MENGE wird. **Der Kommentar an jener Konstante
  hat den Fall vorgesehen** ("der Container weiss, WELCHES Ziel, die Ansicht nur, DASS eines
  gemeint ist") — die Ansicht trägt selbst keinen Zielwert und muss deshalb nicht umgebaut,
  sondern nur mehrfach beliefert werden.
- **DIE KARTE HAT KEINEN ZIELNAMEN-ZWEIG, UND DAS BLEIBT SO.** Festlegung (2) der Scheibe 3
  hat es gemessen und begründet: `TargetCard` enthält keinen einzigen Zielnamen-Vergleich,
  die Zielwerte stehen ausschliesslich im Konfigurations-Literal. Scheibe 2 fügt Google
  seine `public*`-Beschriftungen in DIESEM Literal hinzu und nirgendwo sonst. **Ein
  Zielnamen-Zweig in der Komponente wäre der erste im Haus.**

### Fünf Festlegungen des Zuschnitts der Scheibe 2

**(1) EIN SKALAR PLUS DIE VORHANDENE EREIGNIS-ACHSE — KEIN NEUES FELD.**
`operatingAccount.accountId` (die Google-Ads-Kundennummer) geht in den Slot, den `pixelId`
trägt: **ein Wert je Projekt**. `productDestinationId` geht in `conversionRules`: **ein Wert
je Ereignistyp**.
**GRUND — GOOGLE IST DIE VEREINIGUNG VON META UND LINKEDIN, UND BEIDE NUTZEN HEUTE JE EINE
HÄLFTE DESSELBEN BLOB-EINTRAGS:** Meta füllt `pixels.<ziel>.pixelId` und lässt
`conversionRules` leer, LinkedIn füllt `conversionRules` und lässt `pixelId` leer (GEMESSEN
am Repo, CC, 2026-08-31; der leere Skalar ist am Typ `CapiConfig` in src/lib/capi/token.ts
seit 11.1e eigens vermerkt). Google braucht **beide Hälften gleichzeitig** — und beide
existieren bereits, samt Lesern, Schreibern und Prädikaten.
**DER ZWEITE GRUND IST EINE GEMESSENE FALLE, DIE DAMIT GAR NICHT ERST ENTSTEHT:** Ein
DRITTES Feld unter `pixels[target]` würde von `settingsEqual` (src/lib/settings.ts) **nicht
gesehen** — die Funktion vergleicht je Ziel ausschliesslich `getPixelId` und
`conversionRulesEqual(getConversionRules(…))`. GEMESSEN am Code (CC, 2026-08-31) ist der
vollständige Verlustweg: `dirty` bliebe `false`, damit erschiene weder der Text
"Ungespeicherte Änderungen", noch feuerte der `beforeunload`-Wächter (er kehrt bei `!dirty`
sofort zurück), noch der `confirm`-Riegel in `handleSwitch` — **der getippte Wert
verschwände beim nächsten Projektwechsel, ohne dass irgendetwas es meldet.**
**MIT DEN ZWEI VORHANDENEN SLOTS BRAUCHT `settingsEqual` KEINE ÄNDERUNG.** Das ist der
eigentliche Gewinn dieser Festlegung: nicht ein gesparter Vergleich, sondern eine
Fehlerklasse, die keinen Ort hat.
**`loginAccount` FÄLLT WEG.** Es ist optional mit der Vorgabe "gleich `operatingAccount`"
(GELESEN, docs/ziel-befunde.md, Google-Abschnitt, Teil (j)), und das gewählte Zugangsmodell
ist ADVERTISER mit kundeneigenem OAuth (CLAUDE.md, "## Modus", Owner-Entscheidung
2026-08-25). `linkedAccount` ist ohnehin auf den Data-Partner-Fall beschränkt und damit
gegenstandslos. **KEINE EINGABE FÜR EINEN WERT, DER SEINEN EIGENEN VORGABEWERT HAT.**
**GRENZE 1 — SIE RUHT AUF EINER LESUNG UND NICHT AUF EINER MESSUNG:** Dass
`productDestinationId` je Conversion-Action und "damit faktisch je Ereignistyp" gilt, ist
GELESEN (docs/ziel-befunde.md, Teil (k)/C3); Teil (bu) führt ihr FORMAT ausdrücklich als
NICHT GEMESSEN. **KIPPT C3, KIPPT DIESE FESTLEGUNG** — dann wäre die zweite Kennung ein
projektweiter Skalar, und die Ablage müsste neu entschieden werden. Wer diesen Satz
streicht, macht aus einer Doku-Lesung einen Befund.
**GRENZE 2 — DER FELDNAME, UND ER IST HIER NICHT ENTSCHIEDEN:** `pixelId` hiesse für Google
"Kundennummer". Er ist schon heute eine Verallgemeinerung — er trägt Metas Pixel-ID,
Pinterests Anzeigenkonto-Kennung und TikToks Pixel-ID (GEMESSEN am Repo, CC, 2026-08-31, an
den `publicLabel`-Werten in TARGET_CARDS). **OB ER BEI EINER KONTONUMMER KIPPT, IST EIN GATE
FÜR STUFE 1** — zusammen mit der Frage, was ein Umbenennen an allen vier bestehenden Zielen
kostete (Typ, Setzer, Leser, Prädikate, Fixtures). **HIER WIRD ES NICHT ENTSCHIEDEN, UND ES
IST AUCH KEINE EMPFEHLUNG ENTHALTEN.**

**(2) TRIGGER (ii) DES PRIMÄRSCHLÜSSEL-PUNKTES IST GEPRÜFT UND VERNEINT — ENTSCHIEDEN,
NICHT ÜBERSEHEN.**
**DIESER ABSATZ IST DER GRUND, WARUM DIE SCHEIBE ÜBERHAUPT SCHREIBEN DARF.** Der offene
Punkt "DER PRIMÄRSCHLÜSSEL (project_id, target) AUF project_secrets BLEIBT"
(docs/offene-punkte.md) trägt einen Trigger, der genau diese Scheibe treffen könnte:
"(ii) es zeigt sich, dass die KENNUNG NICHT IN DEN EINSTELLUNGS-BLOB GEHÖRT — GLEICHGÜLTIG
AUS WELCHEM GRUND", mit den drei Beispielgründen "je Kennung ein eigenes Zugangsdatum · die
Kennung selbst ein Geheimnis · server-autoritativ vergeben".
**DER STAND, DEN ER ZU PRÜFEN VERLANGT:** Ob eine der beiden Kennungen ein Geheimnis ist,
ist **NICHT BELEGT UND NICHT WIDERLEGT**. docs/ziel-befunde.md, Teil (k)/C4 ist ein
NICHT-TREFFER MIT BENANNTER REICHWEITE — siebzehn Seiten, Achse `secret` · `confidential` ·
`sensitive` · `private` · `public`, und weder eine Einstufung als vertraulich noch eine als
unbedenklich. Der Befund schliesst dort wörtlich mit **"DAS IST KEINE ENTWARNUNG."**
**DIE ENTSCHEIDUNG (ARCHITEKT, 2026-08-31): DER TRIGGER SCHLÄGT NICHT AN.** Eine Kennung,
die der Betreiber **SEHEN und ÄNDERN** können muss, ist kein Geheimnis im Sinne der
Geheimnis-Tabelle. `project_secrets` trägt RLS aktiv und **keine einzige Policy** (GEMESSEN,
docs/db-stand.md) — sie ist **bewusst unlesbar**, und eine Kennung dort abzulegen hiesse,
sie dem Betreiber wegzunehmen.
**DER PRÄZEDENZFALL IST NICHT ERFUNDEN, ER STEHT SEIT 11.1d AM TYP** (src/lib/settings.ts,
am Feld `conversionRules`): "WARUM NICHT IN DIE GEHEIMNIS-TABELLE: Die Kennung ist KEIN
Zugangsdatum — sie steht in der NUTZLAST des Aufrufs, der Betreiber muss sie SEHEN und
AENDERN koennen. project_secrets traegt RLS aktiv und keine einzige Policy; sie ist bewusst
unlesbar." **Dieselbe Frage ist beim vierten Ziel schon einmal beantwortet worden, und
diese Scheibe beantwortet sie nicht neu, sondern gleich.**
**DIE GRENZE, OHNE DIE DIE ENTSCHEIDUNG ZU STARK IST — SIE RUHT AUF EINEM NICHT-TREFFER UND
NICHT AUF EINEM BELEG.** Der Anbieter hat die Frage NICHT beantwortet; er hat sie nicht
gestellt bekommen. **Stuft er eine der beiden Kennungen je als vertraulich ein, IST TRIGGER
(ii) EINGETRETEN, und die Owner-Entscheidung vom 2026-08-12 ist NEU ZU TREFFEN — das ist
keine Redaktion.**
**WARUM DIESER ABSATZ SO AUSFÜHRLICH DASTEHT:** Ein geprüfter und verneinter Trigger sieht
in einem Repo genauso aus wie ein übersehener — nämlich wie nichts. **Die nächste Runde soll
hier lesen, dass geprüft wurde, wer entschieden hat und worauf die Entscheidung ruht**, statt
den Punkt ein zweites Mal zu prüfen oder, schlimmer, für vergessen zu halten.
**TRIGGER (i) IST UNBERÜHRT:** Er hängt an der Custom-Pixel-Vorfrage (Roadmap-Zeile 11.6)
und wird von dieser Scheibe nicht bewegt.

**(3) SCHEIBE 2 IST NICHT CONSENT-NEUTRAL — UND DAS WIRD BENANNT, NICHT GEBAUT.**
**GEMESSEN am Repo (CC, 2026-08-31):** Das Memo `consentTargets`
(src/components/CodeImporter.tsx) filtert über `isTargetDeliverable` (src/lib/settings.ts),
und dieses Prädikat ist wahr, sobald **eine der beiden** Kennungsformen belegt ist. **Mit
einer Google-Kennung wird es wahr**, und der Schlüssel `"google"` aus
`CONSENT_KEY_BY_TARGET` (src/lib/tracking/consent-targets.ts) geht ab dann in **jeden neu
veröffentlichten Text**. Ohne gesetzten Betreiber-Hook füllt `__psConsentAll`
(src/lib/tracking/consent.ts, `v === undefined` -> alle erlaubt) den Draht **mit allen
Schlüsseln auf `true`**.
**ES IST KEIN LECK, UND DER SATZ STEHT ZUERST:** Tor B und Tor D halten (s. die
Beweis-Achse). Es geht nichts hinaus.
**ABER DIE BINDENDE ENTSCHEIDUNG (4) SAGT ÜBER DIESEN FALL NICHTS.** Sie beschreibt den
fail-closed-Zustand für Seiten, die **VORHER** veröffentlicht wurden — "Nach dem Verdrahten
sendet KEINE bestehende Seite an Google, bis sie NEU VERÖFFENTLICHT ist." Über Seiten, die
**DANACH** veröffentlicht werden, steht dort kein Wort, und ein ausgeliefertes Artefakt
altert nicht mit dem Deploy (docs/immer-beachten.md, "EIN AUSGELIEFERTES ARTEFAKT ALTERT
NICHT MIT DEM DEPLOY", dort BELEG 2 — derselbe Consent-Draht).
**ZWEI FOLGEN, BEIDE NUR BENANNT UND KEINE GEBAUT:**
· **FÜR SCHEIBE 4 IST ES EIN VORTEIL.** Seiten, die zwischen Scheibe 2 und Scheibe 4
  veröffentlicht werden, tragen den Schlüssel bereits — der Transport findet eine
  zustimmende Seite vor, statt eine, die erst neu veröffentlicht werden muss.
· **FÜR PHASE 11.5 IST ES EINE AUFLAGE.** Der Schlüssel `"google"` ist im
  Einwilligungs-Dialog zu führen, **bevor jemand ihn dort vermisst**. Er ist ab Scheibe 2 im
  Draht; ein Dialog, der ihn nicht kennt, entscheidet über ein Ziel, das er nicht anzeigt.
**GRENZE:** Diese Festlegung sagt NICHT, ob der Schlüssel wünschenswert ist, und sie ändert
NICHTS am Consent-Draht. Sie hält fest, dass Scheibe 2 ihn verändert — und dass das bisher
nirgends stand.

**(4) DIE FREMDKONTO-FRAGE BINDET SCHEIBE 4, NICHT DIESE.**
**DER BEFUND ZUERST, UND ER IST EIN NICHT-BEFUND:** Was Google tut, wenn eine Anfrage eine
Kundennummer nennt, für die das Zugangsdatum nicht autorisiert ist, **steht im Repo
nirgends** — weder GELESEN noch GEMESSEN. GEMESSEN am Dateitext (CC, 2026-08-31; Achse:
docs/ziel-befunde.md und docs/ziel-fragenkatalog.md im Volltext, Begriffe
`PERMISSION_DENIED` · `NOT_ALLOWLISTED` · `UNAUTHORIZED` · `401` · `403` ·
`x-goog-user-project` · `loginAccount` · `operatingAccount` · `manager` · `role` ·
`access level`). **Positivkontrolle:** dieselbe Achse fördert die Statuscode-Zuordnung, den
Schreibzugriffs-Satz aus Teil (x)/I4 und den `x-goog-user-project`-Befund aus Teil (am)
zutage — sie erreicht den Abschnitt. **KEINE VERMUTUNG ÜBER DAS ANBIETER-VERHALTEN.**
**GRUND FÜR DIE ZUORDNUNG ZU SCHEIBE 4:** **Eine abgelegte Kennung ist INERT.** Solange Tor
B und Tor D halten, verlässt kein Byte den Server; ein falscher oder fremder Wert im Blob
richtet nichts an. **Das Risiko entsteht beim SENDEN** — und die Messung, die es beantwortet,
braucht den Transportpfad ohnehin, weil sie einen echten Aufruf gegen `events:ingest`
verlangt.
**EIN KANDIDAT, DER DIE GANZE KLASSE AUFLÖSEN WÜRDE — NICHT TIPPEN, SONDERN WÄHLEN:** Kann
die Schnittstelle die Konten AUFZÄHLEN, die das Zugangsdatum erreicht, gibt es **kein
Eingabefeld mehr**; der Betreiber kann dann nur greifen, was der Token ohnehin trägt, und
eine fremde Kundennummer ist gar nicht erst eintippbar. **OB ES EINEN SOLCHEN ENDPUNKT GIBT,
IST UNGELESEN UND UNGEMESSEN.** Als Kandidat benannt — **KEINE EMPFEHLUNG, KEIN AUFTRAG**,
und ausdrücklich keine Aussage darüber, ob er die Ablage-Entscheidung aus Festlegung (1)
berührte.
**DER POSTEN GEHT ALS EIGENER OFFENER PUNKT NACH docs/offene-punkte.md**, mit Stub in
CLAUDE.md, Trigger "der Zuschnitt der Scheibe 4". **NICHT IN DEN VORRAT DIESER DATEI, UND
DER GRUND IST GEMESSEN:** Der Vorrat wird mit der Standdatei ARCHIVIERT — Vorrats-Eintrag 13
hält fest, was dort mit eingetretenen Triggern geschieht.

**(5) DIE BEIDEN KENNUNGEN WERDEN NICHT AUF FORM GEPRÜFT — UND DER GRUND STEHT DABEI.**
**WAS GEMESSEN IST, IST NUR DIE EINE HÄLFTE:** Für `operatingAccount.accountId` ist die
numerische Form GEMESSEN (2026-08-28, OWNER, Messung B1 — docs/ziel-befunde.md, Teil (bt):
"String is not a valid number.", `INVALID_NUMBER_FORMAT`), **und die dortige Grenze gehört
zwingend mit:** dass die BINDESTRICHE der Grund der Abweisung waren, ist **nicht isoliert
gemessen** — der abgewiesene Wert trug Bindestriche UND bezeichnete kein echtes Konto.
**FÜR `productDestinationId` NENNT KEINE GELESENE SEITE ZEICHENVORRAT ODER LÄNGE** (Teil
(k)/C1 sagt es ausdrücklich; Teil (bu) führt ihr Format unter NICHT GEMESSEN).
**FOLGE: EINE PRÜFUNG WÄRE AUF BEIDEN ACHSEN ERFUNDEN.** Bei der einen kennen wir die
Ursache der einzigen Abweisung nicht, bei der anderen die Form überhaupt nicht. **DER
ANBIETER PRÜFT, WIR NICHT.**
**DAS IST DIESELBE LINIE WIE IN DER SCHEIBE 11.2a**, und sie ist dort ausgeschrieben ("Die
Auflage aus der Messlücke"): Die Klick-Extraktion prüft die Anwesenheit eines Werts, **nie
seine Form** — weil jede Formprüfung am Testwert grün und im Echtfall ein **stiller Riegel**
wäre. Der Fall hier ist derselbe, nur eine Kennungsart weiter.
**GRENZE:** Diese Festlegung sagt **nichts** über einen TRIM und nichts über "leer heisst
nicht gesetzt". Beides ist Bestandsverhalten der zwei Slots (`setPixelId` trimmt,
`setConversionRule` löscht bei leerem Wert den Schlüssel) und Sache des Bau-Plans, nicht
dieses Zuschnitts.

### Was Scheibe 2 ausdrücklich NICHT entscheidet

Vier Dinge, je mit dem Ort, an dem sie entschieden werden. **Sie stehen hier, damit die
Bau-Runde sie nicht für vergessen hält und nebenbei mitentscheidet:**
- **DER FELDNAME `pixelId`.** GATE für Stufe 1 des Bau-Plans, s. Festlegung (1), Grenze 2.
- **OB ES EINEN AUFZÄHLUNGS-ENDPUNKT FÜR DIE ERREICHBAREN KONTEN GIBT.** Offener Punkt in
  docs/offene-punkte.md, Trigger "der Zuschnitt der Scheibe 4", s. Festlegung (4).
- **TRIM UND LEER-BEHANDLUNG DER ZWEI KENNUNGEN.** Bau-Plan, s. Festlegung (5).
- **WIE DER AUSDRUCK VON `settingsEqual` AUSSIEHT.** Er braucht keinen — Festlegung (1) ist
  gerade so gewählt, dass die Funktion unverändert trägt. **Fasst der Bau-Plan sie dennoch
  an, ist das begründungspflichtig**, weil damit die tragende Begründung der Festlegung (1)
  ihren Gegenstand verlöre.

**EIN GATE FÜR STUFE 1 — DIE KARTE TRÜGE ZWEI AUSSAGEN ÜBER NICHT-AUSLIEFERUNG, UND EINE
NENNTE DEN FALSCHEN GRUND.**
**GOOGLE WÄRE DIE ERSTE KARTE MIT `publicLabel` UND OHNE ADAPTER.** Bei Scheibe 3 stand die
UMGEKEHRTE Kombination zur Prüfung — kein Label, kein Adapter (Gate (α) jener Bau-Stufe;
ARCHITEKTEN-ANGABE 2026-08-31, der Gate-Text selbst ist mit dem Vollzug jener Scheibe
verdichtet). **Scheibe 2 erzeugt die andere Hälfte derselben Kombinatorik.**
**DER BEFUND, GEMESSEN am Code (CC, 2026-08-31):** `src/components/TargetCard.tsx` rendert
ZWEI voneinander unabhängige Zeilen über die Nicht-Auslieferung. Die eine hängt am Adapter
(`{!hasAdapter && …}`, fester Satz "Auslieferung folgt — dieses Ziel sendet noch nicht"),
die andere an der Anwesenheit des Labels (`config.publicLabel !== undefined && configured
=== true && !hasTargetPixelId(savedPixelId, target)` -> `noDeliveryText(config.publicLabel)`).
**Ihre Bedingungen schliessen einander NICHT aus.** Für ein Google-Projekt mit bestehender
Geheimnis-Zeile und noch leerer Kundennummer wären ab Scheibe 2 **BEIDE wahr**.
**WARUM DAS NICHT NUR DOPPELT, SONDERN IRREFÜHREND IST:** Die label-gebundene Zeile nennt als
Grund eine **fehlende Kennung**. Der wirkliche Grund, dass nichts hinausgeht, ist der
**fehlende Empfänger** — und den nennt die andere Zeile. Der Betreiber trüge die Kennung ein,
die eine Zeile verschwände, und es ginge weiterhin nichts hinaus. **Genau diese Fehldiagnose
ist der Grund, aus dem 11.1a die label-gebundene Zeile auf Karten ohne öffentliches Feld
unterdrückt hat** — der Kommentar an jener Bedingung sagt es wörtlich; die Unterdrückung
greift aber über die Abwesenheit des Labels, und die fällt mit Scheibe 2 weg.
**HIER WIRD NICHTS ENTSCHIEDEN.** Es ist ein **GATE FÜR STUFE 1**: am Code prüfen, was die
Karte in dieser Kombination tatsächlich rendert, und **den Bau-Plan sagen lassen, was daraus
folgt** — Unterdrückung, Umformulierung, eine gemeinsame Zeile oder gar nichts. **KEINE
EMPFEHLUNG**, und ausdrücklich keine Vorwegnahme: Ein Zielnamen-Zweig in der Komponente wäre
in jedem Fall ausgeschlossen (s. "Woraus Scheibe 2 besteht", zweiter Befund).

### Die Beweis-Achse der Scheibe 2

**SIE HAT ZWEI HÄLFTEN, UND DIE ZWEITE IST DIE, DIE MAN VERGISST:** Dass die Scheibe STEHT,
zeigen die Kennungen, die man eingibt und wiederfindet. Dass sie **NICHT MEHR TUT** als das,
zeigt nur eine Aussage über die Tore, die nach dem Fall von Tor A noch halten. Eine
Anleitung, die nur die erste Hälfte prüft, meldet Erfolg für eine Scheibe, die den Transport
mitgebaut haben könnte.

**LIVE — JEDER SCHRITT MISST GENAU EINE ACHSE:**
1. **Die Felder erscheinen.** Die Google-Karte trägt ein Feld für die Kundennummer; der
   Bereich mit den Conversion-Regeln führt Google neben LinkedIn.
2. **Ablegen und Überleben.** Beide Kennungen eintragen, speichern, Projekt wechseln,
   zurückwechseln — beide Werte stehen unverändert da. **Das ist zugleich die Gegenprobe zur
   Dirty-Falle aus Festlegung (1):** Vor dem Speichern muss "Ungespeicherte Änderungen"
   erscheinen, und ein Wechsel ohne Speichern muss nachfragen. **Erscheint der Text nicht,
   ist die Festlegung verfehlt, auch wenn der Wert danach zufällig noch da ist.**
3. **Isolation.** Ein zweites Projekt ohne Google-Kennungen bleibt unverändert; die
   Bestandskarten (Meta, Pinterest, TikTok, LinkedIn) sind unangetastet — Beschriftung,
   Platzhalter, Statuszeile, Geheimnis-Feld.
4. **Kein Geheimnis-Feld.** Auf der Google-Karte gibt es weiterhin **kein** Eingabefeld für
   ein Zugangsdatum. Die Karte gewinnt ein öffentliches Feld, nicht zwei.
5. **Der Hinweis "Auslieferung folgt — dieses Ziel sendet noch nicht" steht weiterhin auf
   der Karte.** Er ist eine AUSSAGE DER OBERFLÄCHE über `hasAdapter`, **kein Beweis des
   Nicht-Sendens**.

**WAS LIVE NICHT ZU BEWEISEN IST, und dieser Absatz ist der wichtigere Teil:** Dass Google
nach dem Fall von Tor A immer noch nicht sendet, kann ein Live-Test **auf kein einzelnes Tor
zurückführen**. Tor B (kein Klartext in `secret`) und Tor D (kein Adapter) sind **je für sich
hinreichend**; ein ausbleibendes Ereignis sieht unter beiden identisch aus. **Zwei Ursachen
erzeugen dieselbe Beobachtung — das ist keine Messung, sondern eine Frage**
(docs/immer-beachten.md, "BEVOR EIN ERGEBNIS BEURTEILT WIRD …", Teil (a)).
**DIE TRENNUNG LEISTEN NUR TESTS, JE EINER, UND JEDER BENENNT SEIN TOR:**
· **EIN TEST FÜR TOR B:** Ein Projekt mit gesetzten Google-Kennungen **und** einer
  `project_secrets`-Zeile, deren `secret` NULL ist, ergibt im Resolver **keinen** Empfänger
  `'google'` — beobachtet an der Paarungsschleife, nicht am Ergebnis eines Netzaufrufs.
  **MIT POSITIVKONTROLLE IM SELBEN LAUF:** dasselbe Projekt mit gefülltem `secret` ergäbe
  einen — sonst ist der Test eine Abwesenheits-Behauptung ohne Reichweite.
· **EIN TEST FÜR TOR D:** `'google'` ist nicht in `TARGETS_WITH_ADAPTER`, und der Verteiler
  überspringt es — auch dann, wenn ein Empfänger `'google'` künstlich hergestellt wird.
  **Genau diese Konstruktion ist der Punkt:** Sie nimmt Tor B gedanklich weg und zeigt, dass
  Tor D allein trägt.
**AM ENDE STEHT DIE FRAGE, DIE DER VERMERK BEANTWORTEN MUSS:** Welches Tor hält, wenn man
das andere gedanklich wegnimmt? Wer sie nicht beantworten kann, hat die Tore nicht geprüft,
sondern ihr gemeinsames Schweigen.

**DER VORHER-WERT — ER IST NÖTIG, UND ZWAR AN EINER ANDEREN STELLE, ALS DIE REGEL ES
NAHELEGT.** Geprüft (ARCHITEKT, 2026-08-31):
· **FÜR DIE SCHRITTE 1 BIS 5 IST KEINER NÖTIG.** Sie prüfen einen NEUEN Zustand, nicht einen
  Unterschied; ihre Voraussetzungen sind nach dem Deploy jederzeit wieder herstellbar.
· **FÜR FESTLEGUNG (3) IST EINER NÖTIG — UND SEINE FRIST IST NICHT DER DEPLOY, SONDERN DAS
  NÄCHSTE VERÖFFENTLICHEN.** Wer zeigen will, dass eine **bereits veröffentlichte** Seite den
  Schlüssel `"google"` NICHT trägt und eine **danach veröffentlichte** ihn trägt, braucht die
  ausgelieferte Fassung der alten Seite. **SIE ÜBERLEBT DEN DEPLOY** (ein Code-Deploy
  erreicht ein ausgeliefertes Artefakt nicht) — **sie stirbt mit dem ersten Publish in
  demselben Projekt.** **PFLICHT-STOPP: Ohne gesicherte Vorher-Kopie des ausgelieferten
  Textes kein erneutes Veröffentlichen in dem Projekt, an dem der Vergleich geführt wird.**
  Die Regel dahinter ist "EIN VORHER-WERT WIRD VOR DEM DEPLOY GESICHERT, SONST IST DER
  NACHWEIS NICHT MEHR HERSTELLBAR" (docs/immer-beachten.md); **ihr Wortlaut nennt den
  Deploy, und genau hier trifft er nicht — die Frist ist eine andere Handlung.** Wer der
  Formulierung folgt statt der Sache, sichert zum falschen Zeitpunkt und hat den Wert
  trotzdem verloren.
· **DASS DER VERGLEICH ÜBERHAUPT GEFÜHRT WIRD, IST NICHT ZWINGEND.** Festlegung (3) ist als
  BEFUND geführt und nicht als Bau-Gegenstand; wird er nicht gefahren, gehört das als **nicht
  gefahren protokolliert** und nicht als bestanden.

### Der Scope der Scheibe 2 — und wo er zum STOPP wird

**NICHT ZU DIESER SCHEIBE**, je mit dem Ort, an dem es hingehört:
- **DER TRANSPORT.** Scheibe 4. Keine Nutzlast, kein Netzaufruf, kein Aufrufer für
  `buildGoogleEvent` oder `extractGoogleClickIds`. **Die Schuld aus VERMERK 2 wandert
  unverändert weiter** — sie wird von dieser Scheibe nicht eingelöst.
- **`TARGETS_WITH_ADAPTER` UND `FORWARDER_BY_TARGET`.** Unangetastet. **Es ist der einzige
  Ort, an dem diese Scheibe still zur Transport-Scheibe würde** — dieselbe Lage und derselbe
  Grund wie in Festlegung (6) der Scheibe 3.
- **JEDE ÄNDERUNG AM RESOLVER-VERHALTEN FÜR DIE VIER BESTEHENDEN ZIELE.**
  `getCapiConfigByTrackingKey` (src/lib/capi/token.ts) liegt auf dem meistgetroffenen Pfad
  der Plattform; die Zahl der Datenbank-Runden bleibt unverändert.
- **DIE FREMDKONTO-MESSUNG.** Scheibe 4, s. Festlegung (4).
- **DER CONSENT-DIALOG.** Phase 11.5, s. Festlegung (3).

**KEINE SCHEMA-ÄNDERUNG. VERLANGT DER BAU-PLAN EINE, IST DAS EIN STOPP** — keine Migration,
keine neue Spalte, keine Policy, keine Constraint-Erweiterung. **UND ES IST ZUGLEICH DER
HINWEIS, DASS TRIGGER (ii) DOCH ANGESCHLAGEN HAT:** Wer für die Kennungen einen Ort in der
Datenbank braucht, hat gerade festgestellt, dass sie nicht in den Einstellungs-Blob gehören —
und dann ist Festlegung (2) widerlegt und die Owner-Entscheidung vom 2026-08-12 neu zu
treffen. **Der STOPP ist deshalb kein Formalismus, sondern der Detektor für genau diesen
Fall.**

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

### VERMERK 7 (Commits 659d672, 7771019, aa17f11) — DIE SCHEIBE 3 IST GEBAUT UND LIVE BEWIESEN

**DREI COMMITS, UND SIE SIND GETRENNT, WEIL SIE VERSCHIEDENE DINGE SIND** — alle drei am
Repo ermittelt (CC, 2026-08-31; je eine Suche über die Commit-Botschaft und eine
unabhängige `-S`-Gegenprobe auf eine Zeile des jeweiligen Diffs, je genau ein Treffer):
- **`659d672`** — der Bau (`feat(tracking)`): 16 Dateien, zwei davon neu.
- **`7771019`** — der Fix (`fix(ui)`): die Meldung überlebte ihren Gegenstand, s. unten.
- **`aa17f11`** — der gemeldete Befund (`docs(claude)`): Vorrats-Eintrag 16.

**WAS GEBAUT WURDE:** `'google'` steht in `TRACKING_TARGETS`; die Konfiguration der Karten
ist ZEICHENGLEICH in ein reines lib-Modul gewandert (`src/lib/tracking/target-cards.ts`,
sha256 vorher/nachher identisch, 126 Zeilen); die Karte trägt weder ein öffentliches noch
ein Geheimnis-Feld, dafür einen Verbinden- und den bestehenden Trennen-Weg; `setCapiToken`
weist ein Ziel ohne Geheimnis-Feld ab, VOR jedem DB-Zugriff und aus DERSELBEN Quelle, aus
der die Karte ihr Feld schaltet; der Ergebniscode des Flusses erreicht die Karte als Prop
aus `page.tsx`. **Suite: 69 Dateien, 1403 Tests** (vorher 68/1376). Alle vier Gates waren
vor jedem der drei Commits grün.

**DIE VIER TOR-TESTS, je mit ihrem Tor im Kommentar** — Auflage (a) des Zuschnitts,
eingelöst: `capi/token.test.ts` (Tor 1 `withPixel`, beobachtet den `in`-Filter statt des
Ergebnisses; Tor 2 die Geheimnis-Schleife, mit Positivkontrolle) ·
`capi/ingest.consent-targets.test.ts` (Tor 3, beide Hälften plus Positivkontrolle) ·
`capi/fan-out.test.ts`, Lauf `W-google` (Tor 4). **Auflage (b) eingelöst:**
`tracking/target-cards.test.ts` nagelt die Menge der Ziele ohne Geheimnis-Feld auf
`{google}` fest.

---

**DER LIVE-TEST — GEMESSEN 2026-08-31 vom OWNER, an der ausgelieferten Anwendung.**
Deployment vorher als "Ready" bestätigt.

- **Schritt 0, die Regression:** Die Bestandskarten (Meta, Pinterest) unverändert —
  Geheimnis-Feld, Platzhalter, Statuszeile. Keine Seiteneffekte.
- **Schritt 1, Sichtbarkeit an einer BESTEHENDEN google-Zeile:** "Zugangsdaten
  hinterlegt", der Hinweis "Auslieferung folgt", beide Knöpfe an ihrem Platz.
- **Schritt 2, Verbinden:** lief durch, Karte auf "Zugangsdaten hinterlegt".
- **Schritt 3, Trennen:** "Nicht konfiguriert", nach einem Neuladen unverändert.
- **Schritt 4, Abbruch im Zustimmungs-Bildschirm:** der neutrale Satz, keine Fehlerfarbe,
  kein Code.
- **Schritt 5, die Adresse:** der Parameter verschwindet; nach einem Neuladen keine
  Meldung mehr.
- **Danach DREIMAL hintereinander über ZWEI Projekte verbunden und getrennt, kein
  Fehlschlag.**

---

**WAS DER LIVE-TEST NICHT ZEIGT — und das steht an derselben Stelle wie das, was er
zeigt:**

- **WELCHES TOR HÄLT.** Vier Ursachen erzeugen dieselbe Beobachtung, und drei schweigen
  dabei. Das leisten **allein die vier Tor-Tests**; ein "ich habe nichts ankommen sehen"
  ist hier **keine Messung**.
- **DASS DIE TORE IN DER DEPLOYTEN LAUFZEIT HALTEN.** Jeder Tor-Test läuft gegen
  Attrappen.
- **EIN ECHTER FEHLERCODE.** Er ist **nicht herstellbar** — die zwölf Codes hängen an
  Zuständen, die man von aussen nicht steuert. Angezeigt wurde einer nur deshalb, weil
  `no_state` von selbst auftrat (s. den offenen Punkt dazu).
- **VERMERK 2 IST NICHT GETILGT.** Der nachgeschuldete Live-Nachweis der Scheibe 11.2a
  steht unverändert: `buildGoogleEvent` und `extractGoogleClickIds` haben weiterhin KEINEN
  Aufrufer im Produktivcode, und diese Scheibe hat sie mit keiner Zeile berührt. **Die
  Schuld wandert an die Transport-Scheibe.**

---

**DER BEFUND WÄHREND DES BAUS, UND ER HAT DIE SCHEIBE GERETTET:** Entfernen-Knopf,
zweistufige Bestätigung und Statuskanal lagen **INNERHALB** des `label`, das an
`secretLabel` hängt. **Festlegung (2) hätte sie mitgenommen** — verbinden ja, trennen
nein, und **KEIN Test wäre davon rot geworden**. Gefunden hat ihn das Gate (β) der
Bau-Stufe, VOR dem Bau; der Trennen-Weg steht seither ausserhalb beider Bedingungen, mit
einem eigenen Wächter.

**DER FIX `7771019` — DIE MELDUNG ÜBERLEBTE IHREN GEGENSTAND.** GEMESSEN LIVE (OWNER,
2026-08-31): Nach einem fehlgeschlagenen Versuch und anschliessendem Entfernen stand die
Karte auf "Nicht konfiguriert" UND darunter der rote Fehlercode — zwei Aussagen über
denselben Zustand in derselben Kachel. Ursache: `connectOutcome` hatte keinen Setzer.
**DIE MOUNT-GRENZE DER KARTE LÖST DAS NICHT** (der Zustand liegt im Container und kommt
als Prop). Zurückgesetzt wird jetzt an drei Stellen — den zwei Rückrufen, die
`configuredTargets` fortschreiben, und am Projekt-Kontext-Wechsel.

**DIE MUTATIONSPROBEN — FÜNF, je mit Vorhersage VOR dem Lauf, danach zurückgenommen:**
- **`public*`-Felder der Google-Karte ergänzt.** Vorhergesagt: nur T-A2. **Gefallen: DREI**
  — alle mit DERSELBEN Fehlerklasse ("die Google-Karte trägt ein öffentliches Feld"), also
  Deckung; die vorab benannte Überschuss-KLASSE war aber eine andere. **Als Befund
  festgehalten**, s. Vorrats-Eintrag 20.
- **Den Ausgang aus Festlegung (4) entfernt.** Vorhergesagt und gefallen: **genau T-E.**
- **`'google'` in `TARGETS_WITH_ADAPTER` aufgenommen.** Vorhergesagt und gefallen: **genau
  `W-google`.**
- **Den Rücksetz-Weg aus den zwei Zugangsdaten-Rückrufen entfernt.** Vorhergesagt und
  gefallen: **genau der Entfernen-Lauf**, 1 von 1403.
- **Den Rücksetz-Weg aus `applyZenForLoadedCode` entfernt.** Vorhergesagt und gefallen:
  **genau der Projektwechsel-Lauf**, 1 von 1403. **Die zwei Rücksetz-Orte sind damit
  einzeln bewacht** — keiner ist grün aus dem Grund des anderen.

**EIN WERKZEUG-ZWISCHENFALL DIESER SCHEIBE** ist als Vorrats-Eintrag 17 verortet und hier
nur genannt: `src/app/projects/actions.ts` kippte während des Baus vollständig auf CRLF,
bei vier grünen Gates.

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, die drei Commit-Nummern und
die sha256-Gleichheit des Umzugs GEMESSEN am Repo bzw. an den Läufen vom 2026-08-29 und
2026-08-31 (CC). Die Live-Werte GEMESSEN 2026-08-31 (OWNER) an der ausgelieferten
Anwendung. Die Mutationsergebnisse GEMESSEN an denselben Läufen. Der Satz über den nicht
getilgten Live-Nachweis der Scheibe 11.2a ist eine FOLGE aus dem Zuschnitt dieser Scheibe.

### VERMERK 8 (Commit 2b735aa) — DIE FIX-SCHEIBE IST GEBAUT UND LIVE BEWIESEN

**DER COMMIT** ist am Repo ermittelt (CC, 2026-08-31): eine Suche über die
Commit-Botschaft **und** zwei unabhängige `-S`-Gegenproben auf Zeichenfolgen, die dieser
Diff erst eingeführt hat (`resolveConnectReturn`, `zielMitProjekt`) — **je genau ein
Treffer, `2b735aa`.** Die Botschafts-Suche allein trifft zwei Commits (der Zuschnitt
`0c984c8` trägt dieselben Worte im Titel); die `-S`-Proben trennen sie.

**WAS GEBAUT WURDE:** Die Callback-Route hängt die Projekt-Kennung an ihr Rückkehr-Ziel
(`outcomeUrl` zweiargumentig, `zielMitProjekt` NACH dem `no_state`-Guard, damit ein Aufruf
oberhalb ein Bau-Fehler statt eines stillen `undefined` ist). Die Entscheidung, WELCHES
Projekt geladen wird und OB der Ergebniscode gezeigt werden darf, liegt in einer reinen
Funktion (`src/lib/oauth/connect-return.ts`, vier Fälle, Lader hereingereicht);
`src/app/page.tsx` verdrahtet sie. Der Mount-Effekt räumt die Adresse jetzt an der
SUCHZEICHENKETTE statt am Ergebniscode. **Suite: 70 Dateien, 1421 Tests** (vorher
69/1403). Alle vier Gates waren vor dem Commit grün.

**DIE LIVE-WERTE — GEMESSEN 2026-08-31 (OWNER) an der ausgelieferten Anwendung**, jeder
Durchlauf vom Host aus `GOOGLE_OAUTH_REDIRECT_URI` gestartet:
- **0a/0b — DER VORHER-ZUSTAND IST REPRODUZIERT UND DOKUMENTIERT.** Auf der RICHTIGEN
  Domain, mit der absichtlich hergestellten Divergenz (zuletzt in A geschrieben, dann nach
  B gewechselt ohne dort zu schreiben): Der Fluss in B kehrte nach **A** zurück.
- **1 — der Fluss in B führt nach B zurück**, die Zugangsdaten sind hinterlegt.
- **2 — nach F5 ist die Kennung aus der Adresse entfernt.**
- **3 — Abbruch in B führt nach B zurück**, mit dem neutralen Satz.
- **4 — `?project=kaputt` fällt sauber zurück**, keine Meldung, Adresse bereinigt.
- **5 — `?project=<B>` ohne Ergebniscode lädt B**, Adresse danach bereinigt.

**DIE FALLE DER BEWEIS-ACHSE, und ohne sie sind die Werte oben wertlos** — GEMESSEN am
Repo (CC, 2026-08-31): **`setCapiToken` und `removeCapiToken` setzen `projects.updated_at`**
(wie Speichern, Publish und die Varianten-Aktionen — neun Stellen insgesamt, alle in
`actions.ts`). **Wer in B ein Zugangsdatum speichert und dann in B den Fluss startet,
landet auch OHNE den Fix in B.** **EIN LIVE-TEST, DER DIE REIHENFOLGE NICHT FESTHÄLT,
BESTEHT ZUFÄLLIG** — deshalb steht sie oben bei 0a/0b und nicht als Fussnote.

**WAS DER LIVE-TEST NICHT ZEIGT:**
- **(b) UND (c) SIND LIVE NICHT ZU TRENNEN.** Eine formwidrige Kennung und eine
  formgültige, die nicht auflöst, sehen für den Nutzer **identisch** aus: Rückfall-Projekt,
  keine Meldung. **Das leisten allein T2 und T4** — und sie leisten es über die
  BEOBACHTUNG DES LADER-AUFRUFS, nicht über das Ergebnis, weil das Ergebnis eben gleich
  ist.
- **DER `no_state`-FALL LANDET WEITERHIN AM FALSCHEN PROJEKT.** Das ist die **benannte
  Grenze** aus Festlegung (5), **kein Fehlschlag** — die Kennung liegt im fehlenden
  Cookie. Wer das nicht mitliest, hält den Fix für wirkungslos.
- **DASS DAS EIGENTUMS-GATE HÄLT.** Eine fremde Kennung ist live nicht sinnvoll zu
  erzeugen; das trägt der Test.

**DIE REFRESH-ROUTE IST NICHT BETROFFEN — GERETTET AUS DEM VERDICHTETEN SCOPE, damit
niemand sie später vorsorglich mitnimmt.** GEMESSEN am Code (CC, 2026-08-31):
`src/app/api/oauth/google/refresh/route.ts` ist ein `POST`, der ausschliesslich **JSON**
zurückgibt — kein `Location`, keine Weiterleitung, keine Rückkehr in die Oberfläche. **Das
Problem kann sie nicht treffen, solange sie nicht weiterleitet.**

**DAS GATE AUS FESTLEGUNG (5) IST BEANTWORTET** — der `denied`-Zweig trägt die Kennung,
die Anordnung der Route ist unangetastet. Die Antwort steht an Festlegung (5) selbst,
nicht hier; zweimal geschrieben liefe sie auseinander.

**DIE MUTATIONSPROBEN — VIER, je mit Vorhersage VOR dem Lauf, danach zurückgenommen:**
- **Die Formprüfung entfernt.** Vorhergesagt in Stufe 1: nur T2. **VOR dem Lauf
  korrigiert**, weil T2b denselben Zweig durchläuft und ebenfalls den Lader-Aufruf
  beobachtet; angesagte KLASSE: die Fall-(b)-Läufe, deren Wert die FORM verletzt.
  **Gefallen: T2 und T2b — genau die angesagte Klasse, kein Überlauf.**
- **Die Unterdrückung im nicht-auflösenden Fall entfernt.** Vorhergesagt und gefallen:
  **genau T4.**
- **Den Projekt-Parameter im Callback weggelassen (`zielMitProjekt`).** Vorhergesagt und
  gefallen: **genau T6.**
- **Dasselbe eine Ebene tiefer (das Anhängen in `outcomeUrl` selbst).** Diese Probe war
  NICHT vorgegeben; sie ist gefahren worden, weil die Anweisung zwei Lesarten zuliess und
  die zweite einen Deckungsrand MISST statt ihn herzuleiten. Vorhergesagt und gefallen:
  **T6 und T9a.** **DER BEFUND: Der `denied`-Zweig ist EIGENS gedeckt**, nicht als Beifang
  des Helfers.

**EIN MESSWERKZEUG DIESER RUNDE HAT SICH ALS KAPUTT ERWIESEN** und ist als
**Hebungs-Kandidat 6** verortet, mit der Korrektur an Eintrag 17 als Vorrats-Eintrag 22;
hier nur genannt: `grep -c $'\r'` zählt in dieser Umgebung nicht CR-Zeilen, sondern ALLE
Zeilen.
**DER OBJEKT-NACHWEIS DIESES COMMITS IST MIT DEM NEUEN INSTRUMENT GEFÜHRT** (`tr -dc '\r'
| wc -c` gegen `git show HEAD:<pfad>`): **CR 0, NUL 0 für alle sieben Dateien.**

**PROVENIENZ, JE TEIL:** Umfang, Testzahl, Gate-Ergebnisse, die Commit-Nummer, der
Objekt-Nachweis und die `updated_at`-Falle GEMESSEN am Repo bzw. an den Läufen vom
2026-08-31 (CC). Die Live-Werte GEMESSEN 2026-08-31 (OWNER) an der ausgelieferten
Anwendung. Die Mutationsergebnisse GEMESSEN an denselben Läufen. Dass (b) und (c) live
ununterscheidbar sind, ist eine FOLGE aus den vier Fällen der reinen Funktion, keine
Messung.

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

   **VERMERK 2026-08-31 — TRIGGER EINGETRETEN, UND DIESER EINTRAG GILT. ENTSCHIEDEN
   (OWNER, 2026-08-31).**
   Die Ablage-Scheibe ist zugeschnitten (s. den Abschnitt "Die Konto-Kennungen bekommen ihre
   Eingabe"), damit ist der Trigger dieses Eintrags erfüllt — **und anders als bei einem
   blossen Trigger-Vermerk ist die Frage dahinter jetzt beantwortet.**
   · **WAS DER ZUSCHNITT EINLÖST:** Den Ort, den dieser Eintrag vermisst hat — "die Stelle,
     an der der Betreiber die Nummer eingibt; die gibt es heute nicht" — **gibt es mit
     Scheibe 2.** Und der zweite Halbsatz des Titels ist unberührt: Der reine Bauer
     `buildIngestEventsRequest` wird von dieser Scheibe nicht angefasst.
   · **DIE ENTSCHEIDUNG, IN EINEM SATZ: ES WIRD AN DER EINGABE NORMALISIERT — DIESER EINTRAG
     GILT WÖRTLICH, MIT TITEL UND RUMPF.** Damit ist er **kein Vorrats-Posten mehr im Sinne
     des Kopfes dieses Abschnitts** ("NICHT gebaut und NICHT entschieden"): **nicht gebaut,
     aber entschieden.**
   · **EINE GEGENREDE IST ERWOGEN UND VERWORFEN WORDEN, und sie gehört festgehalten, damit
     niemand sie für ungeprüft hält und neu vorbringt:** Der Zuschnitt der Scheibe 2 hat eine
     SECHSTE Festlegung erwogen, die das Gegenteil gesagt hätte — keine Normalisierung im
     Code, die Form nur im Platzhalter und im Hinweistext der Karte. **Ihre Begründung war
     eine Asymmetrie:** Eine fehlende Normalisierung kostet einen zweiten Versuch, sobald es
     Rückmeldung gibt; eine FALSCHE Normalisierung schreibt einen veränderten Wert in die
     Datenbank, und niemand sieht mehr, was der Betreiber getippt hat. **SIE IST NICHT
     GESCHRIEBEN WORDEN UND ENTFÄLLT DAUERHAFT** (OWNER, 2026-08-31).
     **DIE NUMMER IST BEWUSST NICHT GENANNT:** Sie hätte im Entwurf die sechste getragen, und
     eine künftige sechste Festlegung würde denselben Zeiger tragen — s. die Regel "EIN
     ANKER, DER EINDEUTIG AUSSIEHT, IST ES IN EINER DATEI MIT VERZEICHNIS NICHT"
     (docs/immer-beachten.md). **Der Zuschnitt führt weiterhin FÜNF Festlegungen; die sechste
     hat es nie gegeben.**
   · **WAS DIE ENTSCHEIDUNG NICHT BERÜHRT — FESTLEGUNG (5) DES ZUSCHNITTS BLEIBT WÖRTLICH
     STEHEN.** Sie sagt, dass die beiden Kennungen **nicht auf FORM GEPRÜFT** werden, weil
     eine Prüfung auf beiden Achsen erfunden wäre. **PRÜFEN UND NORMALISIEREN SIND ZWEI
     VERSCHIEDENE DINGE:** Das eine WEIST AB, das andere VERÄNDERT. Wer die Entscheidung als
     Aufhebung von Festlegung (5) liest, baut eine Formprüfung, die niemand entschieden hat.
   · **DIE GRENZE DIESES EINTRAGS GILT UNVERÄNDERT MIT, UND SIE IST JETZT DIE GRENZE DER
     ENTSCHEIDUNG:** Dass die BINDESTRICHE der Grund der Abweisung waren, ist NICHT isoliert
     gemessen (Teil (bt)). Die Normalisierung ruht damit auf einer **Lesung plus einer
     Messung, die zwei Ursachen nicht trennt** — nicht auf einem Beleg, dass Bindestriche
     abgewiesen werden. **Zeigt Scheibe 4 an einer echten Antwort etwas anderes, ist sie neu
     zu bewerten.**
   · **WAS HIER AUSDRÜCKLICH NICHT ENTSCHIEDEN IST:** WIE normalisiert wird — welche Zeichen
     fallen, ob beim Schreiben oder beim Lesen, und was mit einem Wert geschieht, der danach
     leer wäre. Das ist Sache des Bau-Plans, wie der TRIM aus Festlegung (5).
   PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
   Existenz des Zuschnitts (CC, 2026-08-31). **Die Entscheidung ist eine OWNER-ENTSCHEIDUNG
   vom 2026-08-31 — keine Messung und keine Ableitung.** Der gemessene Stand, auf dem sie
   ruht, steht unverändert im Rumpf dieses Eintrags.
   **ERSETZT AM 2026-08-31:** Hier stand ein Vermerk, der die Frage als OFFEN und beim Owner
   liegend führte. Er beschrieb einen Vorgangs-Zustand, der mit der Entscheidung vorbei ist;
   ihn stehenzulassen hiesse, neben einer getroffenen Entscheidung zu behaupten, sie stehe
   aus. **Was er festhielt — dass eine Gegenrede erwogen wurde —, ist oben aufgenommen und
   nicht verloren.**
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

    **ERLEDIGT AM 2026-08-29 — DER EINTRAG BLEIBT STEHEN, UND ZWAR WEGEN DER MESSUNG.**
    Gate (1) der Stufe 1 hat es beantwortet (GEMESSEN am Repo, CC, 2026-08-29): **Alle
    ACHT Läufe D-T1 bis D-T8 zählen ihr `pixels`-Objekt VOLLSTÄNDIG auf, und KEINER trägt
    einen `google`-Eintrag.** Das Memo `consentTargets` filtert über
    `isTargetDeliverable`; ein Ziel ohne Kennung erscheint in keiner der geprüften
    Mengen. **Sie brechen nicht** — und der volle Lauf nach der Aufnahme hat es bestätigt:
    von den 1376 Bestandstests fielen genau die ZWEI fest verdrahteten Längen-Zahlen,
    keine Fixture-Liste.
    **MITGEPRÜFT UND HIER FESTGEHALTEN, weil der Eintrag es nicht nannte:**
    `TargetCard.test.tsx` enthält EINE kartenzählende Zusicherung
    (`getAllByText(STATUS_CONFIGURED)).toHaveLength(1)`). Auch sie bricht nicht — die
    Liste der konfigurierten Ziele ist dort gemockt.
    **WARUM DER EINTRAG NICHT GELÖSCHT WIRD:** Ein gelöschter Eintrag nähme die MESSUNG
    mit. Die Frage "brechen die Fixture-Listen beim nächsten Ziel?" stellt sich beim
    sechsten wieder, und dann ist der Unterschied zwischen "geprüft und tragfähig" und
    "nie geprüft" die ganze Auskunft.
    **DIES IST DIE ERSTE ERLEDIGT-KENNZEICHNUNG IN DIESEM VORRAT.** Es gab bisher keine
    Bauform dafür; diese hier ist gewählt und nicht vorgefunden — sie steht als eigener
    Absatz UNTER dem unveränderten Eintrag, mit Datum, Grund und der Messung.

16. **`saveProject` SCHREIBT `settings` UNVALIDIERT — TOR A HÄLT DURCH EINE
    UI-ABWESENHEIT UND NICHT DURCH EINEN RIEGEL.**
    **GEMESSEN am Code (CC, 2026-08-29):** `saveProject` (src/app/projects/actions.ts)
    reicht den Einstellungs-Blob unverändert in die `projects`-Spalte durch — kein
    Schema-Check, keine Feldprüfung, keine Ziel-Prüfung. Der einzige Weg, der heute
    `settings.pixels.<ziel>.pixelId` setzt, ist das öffentliche Eingabefeld der Karte
    (`setPixelId` hat im Produktivcode GENAU EINEN Aufrufer, components/CodeImporter.tsx).
    **WAS DARAUS FOLGT UND WARUM ES HIERHER GEHÖRT:** Das erste der vier Tore der
    Scheibe 3 (`withPixel` in src/lib/capi/token.ts) hält, WEIL die Google-Karte kein
    solches Feld anbietet. Ein selbstgebauter Aufruf könnte `pixels.google` trotzdem in
    den Blob legen. **DIE TRAGENDE SCHICHT IST DESHALB TOR B** — die Klartext-Spalte
    `secret` der google-Zeile bleibt NULL, und der Resolver liest ausschliesslich sie.
    **ES IST KEINE NEUE LÜCKE, UND DIESER SATZ GEHÖRT DAZU, damit der Eintrag nicht
    grösser gelesen wird als er ist:** Der Blob ist seit jeher CLIENT-besessen
    (`saveProject` ersetzt ihn ganzheitlich — die Regel "SERVER-EIGENE IDENTITÄT NIE IN
    EINEN CLIENT-BESESSENEN BLOB" beschreibt genau das). Die Scheibe 3 ändert daran
    nichts; sie macht nur sichtbar, dass ein TOR daran hängt.
    **GEMELDET, NICHT BEHOBEN. KEINE EMPFEHLUNG** — weder eine Validierung in
    `saveProject` noch eine Allowlist im Blob ist hier vorgeschlagen.
    TRIGGER: **der Zuschnitt der Scheibe 2.** Dort fällt Tor A ABSICHTLICH (die Kennungen
    bekommen ihre Eingabe), und ab da zählt, dass der Blob beliebige Ziel-Schlüssel
    aufnimmt — die Frage ist dann nicht mehr, ob ein Feld existiert, sondern was in der
    Spalte stehen darf.
    GEMELDET 2026-08-29.

    **VERMERK 2026-08-31 — TRIGGER EINGETRETEN. DER EINTRAG WIRD NICHT GESTRICHEN.**
    Der Zuschnitt der Scheibe 2 steht (s. den Abschnitt "Die Konto-Kennungen bekommen ihre
    Eingabe"). Dieser Vermerk sagt, WAS er von diesem Eintrag beantwortet und was er nur
    VERORTET — die Trennung ist der ganze Zweck, weil ein Eintrag mit eingetretenem Trigger
    sonst entweder als erledigt gilt oder als übersehen liegenbleibt.
    · **BEANTWORTET IST DER KERN:** Tor A fällt ABSICHTLICH. Was danach hält, steht an zwei
      Orten und nicht hier — in der Sachkorrektur an Festlegung (1) der Scheibe 3 (Tor B UND
      Tor D, Tor D unabhängig und für sich hinreichend) und in der Beweis-Achse der
      Scheibe 2, die für jedes der beiden einen eigenen Test verlangt, der SEIN Tor benennt.
      **Der Satz dieses Eintrags "DIE TRAGENDE SCHICHT IST DESHALB TOR B" war damit zu eng**
      — er nannte eines von zweien; als Aussage über den 2026-08-29 bleibt er richtig und
      wird NICHT überschrieben.
    · **NICHT BEANTWORTET, SONDERN VERORTET:** Dass ein Betreiber über das neue Feld eine
      FREMDE Kundennummer eintragen kann, ist eine Frage an das Verhalten des Anbieters. Sie
      steht seit dem 2026-08-31 als eigener offener Punkt in docs/offene-punkte.md ("WAS
      GOOGLE BEI EINER FREMDEN KUNDENNUMMER TUT, IST UNGELESEN UND UNGEMESSEN"), Trigger
      "der Zuschnitt der Scheibe 4". **Sie ist hier ausdrücklich NICHT entschieden.**
    · **WARUM DER EINTRAG BLEIBT:** Seine MESSUNG — `saveProject` schreibt den
      Einstellungs-Blob unvalidiert durch, kein Schema-Check, keine Feldprüfung, keine
      Ziel-Prüfung — ist der MASSSTAB für jede spätere Blob-Frage. Ein gelöschter Eintrag
      nähme sie mit. Dieselbe Bauform wie bei Eintrag 15, wo die Erledigt-Kennzeichnung
      ebenfalls UNTER dem unveränderten Eintrag steht.
    PROVENIENZ: Dass der Trigger eingetreten ist, ist eine FOLGE aus seinem Wortlaut und der
    Existenz des Zuschnitts (CC, 2026-08-31). Die zwei Tore sind GEMESSEN am Repo (CC,
    2026-08-31).

17. **DIE GIT-WARNUNG WAR DER AUSLÖSER, NICHT DIE KONTROLLE.**
    **DER VORFALL (CC, 2026-08-29):** `src/app/projects/actions.ts` kippte während der
    Bau-Runde auf CRLF. **ALLE VIER GATES WAREN GRÜN**, und der Inhalts-Diff war sauber
    (34 Einfügungen, 0 Löschungen), weil git beim Stagen normalisiert. **Sichtbar wurde es
    allein an der Zeile "CRLF will be replaced by LF"** aus `git diff --numstat`.
    **DIE ZAHL IST AM 2026-08-31 ERSETZT WORDEN, NICHT GESTEMPELT.** Hier stand
    "**1504 CR-Bytes, HEAD 0**" und das Wort **VOLLSTÄNDIG**. Beides ruhte auf
    `grep -c $'\r'`, und diese Sonde zählt in dieser Umgebung ALLE Zeilen statt der
    CR-Zeilen (Herleitung mit Positiv- und Negativkontrolle: Vorrats-Eintrag 22). **Die
    Datei hat exakt 1504 Zeilen** — die Zahl war die Zeilenzahl, nicht der Umfang des
    Schadens. **ERSETZT statt gestempelt, weil dieser Eintrag ein MASSSTAB ist:** Wer die
    nächste CRLF-Frage an ihm misst, misst sonst an einer Zahl, die nichts gezählt hat.
    **DER BEFUND SELBST BLEIBT, UND ZWAR AUS EINEM GEMESSENEN GRUND:** "CR = Zeilenzahl"
    ist **auch das erwartete Bild einer echt gekippten Datei** — das Merkmal trennt die
    beiden Fälle nicht. **Was sie trennt, ist die Git-Warnung**, und die kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt; sie stammt nicht aus der
    Sonde. **Der Titel dieses Eintrags wird dadurch schärfer:** Die Warnung war nicht nur
    der Auslöser — sie war das einzige Instrument jener Runde, das nicht gelogen hat.
    **WELCHES WERKZEUG ES WAR, IST NICHT GEMESSEN.** Die Gegenprobe spricht gegen die
    naheliegende Antwort: Nach `git checkout` wurden DIESELBEN zwei Änderungen mit
    DEMSELBEN Editier-Werkzeug erneut eingetragen und nach jeder einzelnen nachgemessen —
    **CR = 0**. Die zwölf anderen Dateien derselben Runde, gleiches Werkzeug, blieben
    ebenfalls sauber.
    **DIE HYPOTHESE IST ALS HYPOTHESE ZU LESEN UND NICHT ALS BEFUND:** Was diese Datei von
    den anderen unterschied, war ein MUTATIONS-ZYKLUS (setzen, messen, zurücknehmen). Ob
    er die Ursache war, ist **nicht geprüft**.
    **DIE KONTROLLE WAR NICHT NACHLÄSSIG, und das gehört dazu, sonst liest sich der
    Eintrag als Vorwurf:** Sie folgte der Regel "EIN NACHWEIS AN EINER NEUEN DATEI IST
    BLIND" und traf damit genau die Dateien, bei denen das Problem NICHT lag — die neu
    geschriebenen. Die bearbeiteten Bestands-Dateien waren zu diesem Zeitpunkt nicht
    geprüft.
    **WAS OHNE DEN VERURSACHER HANDHABBAR FOLGT — zwei Dinge:** Die Byte-Kontrolle gehört
    nach **JEDEM** Mutations-Zyklus über die mutierte Datei, nicht nur ans Rundenende —
    **die RÜCKNAHME ist der Schreibvorgang**, der hier still etwas verändert hat. Und sie
    vergleicht **gegen HEAD**, nicht nur absolut: "CR = 0" allein sagt nichts, wenn die
    Datei schon vorher CR trug.
    **GEGENRICHTUNG ZUR BESTEHENDEN REGEL:** "WERKZEUG-REGEL: sed -i STRIPPT IN DIESER
    UMGEBUNG STILL DAS CR" (docs/immer-beachten.md) beschreibt ein still GESTRIPPTES CR —
    hier ist eines still HINZUGEFÜGT worden. Dieselbe Achse, entgegengesetzte Richtung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Runde mit einem Mutations-Zyklus.

18. **`connectOutcome` HÄNGT AM ZWEIG "KEIN GEHEIMNIS-FELD", NICHT AM ZIEL.**
    Die Karte liest den Ergebniscode ausschliesslich im Verbinden-Zweig, und den gibt es
    nur, wo `secretLabel` fehlt. **HEUTE IST DAS DECKUNGSGLEICH**, weil
    `tracking/target-cards.test.ts` die Menge der Ziele ohne Geheimnis-Feld auf `{google}`
    festnagelt.
    **KOMMT EIN ZWEITES ZIEL OHNE GEHEIMNIS-FELD, WIRD JENER TEST ROT — UND DAS IST DER
    GANZE MECHANISMUS: DER TEST ERZWINGT EINEN BLICK, NICHT EINE LÖSUNG.** Wer ihn nur
    nachzieht, zeigt dem neuen Ziel Googles Ergebniscode.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG — weder eine Ziel-Bindung des
    Codes noch ein zweiter Zustand ist hier vorgeschlagen.
    TRIGGER: das zweite Ziel ohne Geheimnis-Feld.

19. **DER RESET LEERT DIE MELDUNG AUCH BEI EINEM ANDEREN ZIEL.**
    Ein Google-Fehlercode verschwindet, sobald der Betreiber sein Meta-Token speichert —
    die erste der drei Rücksetz-Stellen hängt an `handleCredentialsSaved`, also am
    VORGANG und nicht am ZIEL.
    **DAS IST DIE GEWOLLTE RICHTUNG, und sie gehört so begründet, sonst liest die nächste
    Runde es als Fehler:** Zu früh geleert kostet eine Information, die **ein Klick
    wiederherstellt** — der Betreiber versucht es erneut. Zu spät geleert erzeugt genau
    den Widerspruch in der Kachel, den der Fix `7771019` beseitigt hat. Von zwei
    Ungenauigkeiten ist die gewählt, deren Fehlgriff billiger ist.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Runde, die die Rücksetz-Bedingung ziel-genau machen will — dann ist
    dieser Absatz die Gegenrede, die sie zu widerlegen hat.

20. **DIE MUTATIONS-VORHERSAGE 1 WAR ZU ENG — DER SECHSTE PROTOKOLLIERTE FALL, DER FÜNFTE
    IN DERSELBEN RICHTUNG.**
    Vorhergesagt war: nur T-A2 fällt. **Gefallen sind DREI** — T-A2 (Oberfläche), der neue
    Daten-Lauf in `tracking/target-cards.test.ts` und der bestehende Lauf "JEDES Ziel:
    Daten-Seite und Oberfläche sagen dasselbe über die Auslieferung".
    **ALLE DREI MELDEN DIESELBE FEHLERKLASSE** ("die Google-Karte trägt ein öffentliches
    Feld"), zweimal als Daten-Aussage, einmal als DOM-Aussage — nach Lektion (g) also
    **Deckung, keine Kaskade**.
    **TROTZDEM IST ES EIN BEFUND UND KEIN TREFFER:** Die vorab benannte
    Überschuss-KLASSE lautete "Abfragen werden MEHRDEUTIG". Die zwei Zusatztreffer liegen
    **ausserhalb** dieser Klasse. Damit ist es der **sechste** protokollierte Fall der
    Regel "EINE MUTATIONS-VORHERSAGE KANN IN BEIDE RICHTUNGEN FALSCH SEIN"
    (docs/immer-beachten.md) und der **fünfte in derselben Richtung: zu eng gezählt**.
    **DIE REGEL SAGT ES SELBST — die einseitige Streuung ist die eigentliche Aussage:**
    Zufall träfe mal nach oben, mal nach unten; eine systematische Ursache trifft immer
    dieselbe Seite.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie eine Vorhersage künftig
    breiter zu fassen wäre.
    TRIGGER: die nächste Hebung an docs/immer-beachten.md, die jene Regel ohnehin
    berührt — dort ist die Zahl der Fälle zu führen, nicht hier.

21. **VORRATS-EINTRAG 19 WIRD DURCH DIE FIX-SCHEIBE SCHÄRFER, NICHT GEGENSTANDSLOS.**
    **DER BEFUND (GEMESSEN am Code bzw. ABGELEITET daraus, CC, 2026-08-31):** Heute steht
    die Meldung des Autorisierungs-Flusses ohnehin am FALSCHEN Projekt — ihr Verlust durch
    ein fremdes Speichern fällt deshalb kaum auf. **Landet der Nutzer nach der Fix-Scheibe
    im richtigen Projekt, steht sie an der RICHTIGEN Karte** — und dann ist das Leeren
    durch ein Meta-Speichern ein **sichtbarer Verlust einer Information, die gerade jemand
    liest**.
    **DIE BEGRÜNDUNG IN EINTRAG 19 BLEIBT GÜLTIG** (zu früh geleert kostet eine
    Information, die ein Klick wiederherstellt; zu spät geleert erzeugt den Widerspruch in
    der Kachel) — **IHR PREIS STEIGT.** Der Text dort wird hier NICHT verdoppelt; wer
    entscheiden will, liest ihn und diesen Absatz zusammen.
    **WAS DAS NICHT HEISST:** Es ist keine Aufforderung, den Reset ziel-genau zu machen.
    Die Gegenrede dazu steht unverändert in Eintrag 19.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: der Live-Test der Fix-Scheibe — ab da ist der Fall beobachtbar, und erst
    dann ist er zu bewerten.

22. **KORREKTUR AN VORRATS-EINTRAG 17 — DIE ZAHL, NICHT DER BEFUND.**
    **DIE MESSUNG (CC, 2026-08-31):** `grep -c $'\r'` zählt in dieser Umgebung nicht
    CR-Zeilen, sondern **ALLE** Zeilen. Belegt mit Positiv- und Negativkontrolle in EINEM
    Lauf: eine reine LF-Datei mit drei Zeilen ergab `grep=3` und `tr=0`; eine echte
    CRLF-Datei mit zwei Zeilen ergab `grep=2` und `tr=2`.
    **DIE FOLGE FÜR EINTRAG 17:** Die dort protokollierte Zahl **"1504 CR-Bytes"** ist
    nicht mehr belegbar — `src/app/projects/actions.ts` hat **exakt 1504 Zeilen**.
    **ABER DER BEFUND STEHT, UND DAS IST DIE FASSUNG, DIE GILT:** "CR = Zeilenzahl" ist
    **AUCH das erwartete Bild einer echt auf CRLF gekippten Datei** — dort trägt jede
    Zeile ein CR. **DAS MERKMAL TRENNT DIE BEIDEN FÄLLE NICHT.**
    **WAS SIE TRENNT, IST DIE GIT-WARNUNG:** `"CRLF will be replaced by LF"` kann git nur
    ausgeben, wenn die Datei im Arbeitsbaum tatsächlich CR trägt. **Sie stammt nicht aus
    der Sonde und kann von ihr nicht erzeugt worden sein.**
    **DASS HEUTE NIRGENDS `i/crlf` STEHT, WIDERSPRICHT DEM NICHT** (GEMESSEN, CC,
    2026-08-31: `git ls-files --eol` über alle verfolgten Dateien — 227× `i/lf`, 5×
    `i/none`, 2× `i/-text`): Das ist die Normalisierung beim Commit; **der Index sollte
    den Zustand nie gesehen haben.**
    **DER TITEL VON EINTRAG 17 WIRD DADURCH SCHÄRFER, NICHT HINFÄLLIG:** Die Git-Warnung
    war nicht nur der Auslöser — **sie war in jener Runde das einzige Instrument, das
    nicht gelogen hat.**
    KORRIGIERT AM EINTRAG 17 SELBST (2026-08-31), nicht daneben: dort ist die Zahl
    ERSETZT. Dieser Eintrag trägt die Herleitung.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: keiner — die Korrektur ist vollzogen; der Eintrag steht als Beleg.

23. **— DIE NUMMER IST FREI UND BLEIBT ES.** Hier stand am 2026-08-31 kurzzeitig "DIE
    INSTRUMENTEN-REGEL FÜR DIE BYTE-KONTROLLE"; sie ist noch am selben Tag als
    **Hebungs-Kandidat 6** umgebucht worden (ARCHITEKT).
    **DER GRUND DER UMBUCHUNG:** Der Vorrat heisst "gemeldet, nicht gebaut" und sammelt
    BAUWÜRDIGES. Eine dauerhafte, projektweite WERKZEUG-Regel ist kein Bauvorhaben,
    sondern ein Kandidat für docs/immer-beachten.md. **DER UNTERSCHIED ENTSCHEIDET ÜBER
    IHR ÜBERLEBEN:** Der Vorrat wird mit dieser Standdatei ARCHIVIERT, die
    Kandidatenliste wird am Phasenende DURCHGESEHEN.
    **HIER STEHT ABSICHTLICH KEIN ZEIGER AUF DEN INHALT.** Die Regel steht danach an
    GENAU EINEM Ort; ein zweiter wäre eine Fassung, die neben ihr altert. Diese Zeile
    hält nur die LÜCKE fest.
    **DIE LÜCKE WIRD BENANNT STATT GESCHLOSSEN, und die übrigen Nummern bleiben:** Ein
    Umnummerieren machte jeden bestehenden Verweis auf einen Vorrats-Eintrag still falsch
    — und still ist hier das Problem, nicht die Lücke.

24. **`PROJECT_PARAM` STEHT ZWEIMAL, UND DIE DIVERGENZ IST EINSEITIG STUMM.**
    **DER BEFUND (GEMESSEN am Repo, CC, 2026-08-31):**
    `src/app/api/oauth/google/callback/route.ts` definiert die Konstante lokal (mit
    Begründung im Kommentar: die Route ist die SENDENDE Seite des URL-Vertrags);
    `src/lib/oauth/connect-return.ts` exportiert eine zweite Konstante desselben Namens
    für die empfangende Seite.
    **DIE ASYMMETRIE IST DER GANZE PUNKT:** Ändert jemand den Wert **im Callback**, wird
    **T6 rot**. Ändert er ihn **in `connect-return.ts`**, wird **NICHTS rot** — die Läufe
    dort reichen `rawProject` direkt hinein und gehen nie über den Parameternamen. **DIE
    FOLGE WÄRE EIN STILLER RÜCKFALL AUF "ZULETZT BEARBEITET"** — also genau der Defekt,
    den die Fix-Scheibe behebt.
    **NICHT GEBAUT, UND DER GRUND GEHÖRT DAZU:** Der Bau ERWEITERT ein bestehendes
    Muster — `RESULT_PARAM = "google"` steht seit Phase 11.8 genauso doppelt. **Es jetzt
    einseitig zu heilen, machte aus einem konsistenten Muster ein halbes.** **BEIDE PAARE
    GEHÖREN ZUSAMMEN**, falls es je angefasst wird.
    **DIE KONVENTIONSZEILE "Konstanten leben in geteilten Dateien, nie als handgetippte
    Literale" IST HIER ZWEIMAL NICHT EINGEHALTEN** — das steht hier, damit niemand die
    Doppelung für die Konvention hält.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: eine Änderung an einem der beiden Parameternamen.

25. **`loadProject` EBNET DREI FÄLLE AUF `null` EIN.**
    **GEMESSEN am Code (CC, 2026-08-31):** "nicht gefunden", "gehört einem anderen Nutzer"
    und "DB-Fehler" sind an der Rückgabe **nicht zu trennen** — alle drei liefern `null`.
    **FÜR DIE FIX-SCHEIBE IST DAS FOLGENLOS:** Alle drei bekommen dieselbe Behandlung
    (Rückfall auf "zuletzt bearbeitet", Meldung unterdrückt), und für zwei von ihnen ist
    genau das gewollt — ein eigener Text für "gehört dir nicht" verriete die Existenz
    einer fremden Kennung.
    **ABER: EIN DB-FEHLER FÜHRT DAMIT ZU RÜCKFALL UND UNTERDRÜCKTER MELDUNG — DER
    BETREIBER SÄHE NICHTS.** Er hat gerade einen Autorisierungs-Fluss durchlaufen, steht
    danach im falschen Projekt, und nichts sagt ihm, dass etwas schiefging.
    **EIN FIX LÄGE IN `loadProject` UND DAMIT AUSSERHALB JEDES BISHERIGEN SCOPES** — die
    Fix-Scheibe hat das Eigentums-Gate ausdrücklich nicht angefasst.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `loadProject` oder an der Fehlerbehandlung des
    Projekt-Ladepfads.

26. **EINE BESTANDS-LINT-WARNUNG IN `src/lib/tracking/consent.test.ts`.**
    **GEMESSEN (CC, 2026-08-31):** `consent.test.ts:33 — Unused eslint-disable directive
    (no problems were reported from 'no-new-func')`. `eslint` meldet 0 Fehler und genau
    diese eine Warnung.
    **SIE STAMMT NICHT AUS DIESER SCHEIBE:** Die Datei steht in keinem Diff der Runde
    (`git status` führt sie nicht), und die Lint-Konfiguration ist ebenfalls unberührt.
    **GEMELDET, NICHT BEHOBEN** — sie ausserhalb ihres Scopes anzufassen wäre ein
    Scope-Bruch, und eine unbenutzte Direktive ist kein Defekt, sondern eine Altlast.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG.
    TRIGGER: die nächste Arbeit an `consent.test.ts` oder eine Aufräumrunde am Lint-Stand.

27. **DER BELEG AN `settingsEqual` TRÄGT NICHT MEHR — DIE REGEL BLEIBT WAHR.**
    **DER KOMMENTAR** über `settingsEqual` (src/lib/settings.ts) begründet die Schleife über
    alle Ziele so: "Der Nutzer ändert die Pixel-ID des zweiten Ziels, der Vergleich meldet
    'nicht dirty', **der Speichern-Knopf bleibt inaktiv** — und die Eingabe ist beim nächsten
    Projektwechsel weg."
    **GEMESSEN am Code (CC, 2026-08-31):** Der Knopf trägt
    `disabled={saveStatus === "saving" || code.trim() === ""}`. **`dirty` steht dort nicht.**
    Wer trotz fehlender Markierung auf Speichern drückt, rettet den Wert.
    **DIE REGEL BLEIBT WAHR, IHR BELEG IST ZU STARK:** Der Wert geht beim Projektwechsel
    still verloren — aber nicht, weil der Knopf gesperrt wäre, sondern weil **alle drei
    Warnungen ausbleiben**: der Text "Ungespeicherte Änderungen", der `beforeunload`-Wächter
    (er kehrt bei `!dirty` sofort zurück) und der `confirm`-Riegel in `handleSwitch`. Eine
    mildere Lesart von "inaktiv" — neutral gefärbt, ohne Punkt im Label — trüge ebenfalls;
    sie steht dort aber nicht.
    **WARUM NICHT JETZT KORRIGIERT:** Diese Runde ist eine Doku-Runde und fasst keine
    Produktivdatei an. Es ist der Fall der Regel "EINE REGEL KANN GÜLTIG BLEIBEN, WÄHREND IHR
    BELEG FALSCH WIRD" (docs/immer-beachten.md) — dort mit der Auflage, den Beleg zu
    RICHTIGSTELLEN und nicht zu stempeln, sobald jemand die Stelle ohnehin öffnet.
    TRIGGER: Scheibe 2 fasst `settingsEqual` ohnehin an — dort wird der Beleg im selben Zug
    korrigiert.
    **DIE GRENZE DIESES TRIGGERS, UND SIE GEHÖRT DAZU, SONST LIEGT DER EINTRAG STILL:**
    **Er ist nicht sicher.** Festlegung (1) des Zuschnitts der Scheibe 2 ist gerade so
    gewählt, dass `settingsEqual` **KEINE Änderung braucht** — beide Slots existieren und
    werden bereits verglichen. Ob der Bau-Plan die Datei dennoch öffnet (etwa für den
    Kommentar am Typ, der die zweite Kennungsform heute allein LinkedIn zuschreibt), ist am
    Zuschnitt **nicht entscheidbar**.
    **ZWEITER TRIGGER, damit der Eintrag nicht an einer unsicheren Bedingung hängt:** die
    nächste Runde, die `src/lib/settings.ts` oder den Dirty-Pfad ohnehin öffnet.
    GEMELDET 2026-08-31, NICHT GEBAUT. KEINE EMPFEHLUNG dazu, wie der Beleg zu lauten hat.

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

6. **DIE BYTE-KONTROLLE BRAUCHT EIN BENANNTES INSTRUMENT: `tr -dc '\r' | wc -c` BZW.
   `git ls-files --eol`, NIE `grep -c $'\r'`** (angetreten 2026-08-31, aus dem Vorrat
   umgebucht — dessen Nummer 23 bleibt als benannte Lücke stehen).
   **DER BEFUND — GEMESSEN (CC, 2026-08-31), mit Positiv- und Negativkontrolle in EINEM
   Lauf:** `grep -c $'\r'` zählt in dieser Umgebung nicht CR-Zeilen, sondern **ALLE**
   Zeilen. Eine reine LF-Datei mit drei Zeilen ergab `grep=3` und `tr=0`; eine echte
   CRLF-Datei mit zwei Zeilen ergab `grep=2` und `tr=2`.
   **WARUM DAS TEUER IST UND NICHT BLOSS UNGENAU: EIN INSTRUMENT, DAS MAL RICHTIG UND MAL
   DIE ZEILENZAHL LIEFERT, IST AN SEINER AUSGABE NICHT ALS KAPUTT ZU ERKENNEN.** Vier
   frühere Runden haben mit ihm "CR=0" gemeldet — das Ergebnis war richtig, **der Weg
   dorthin nicht überprüfbar.** Der einzige Verräter ist "CR == Zeilenzahl, exakt", und
   genau der ist am 2026-08-31 als Bestätigung gelesen worden statt als Warnsignal.
   **DIE ZWEITE HÄLFTE IST ALLGEMEINER UND WIEGT SCHWERER: PRÜFLING UND KONTROLLE MIT
   DERSELBEN WAAGE ZU WIEGEN RETTET NICHTS.** Die Gegenprobe der Bau-Runde lief mit
   demselben kaputten Instrument und hat den Fehler deshalb BESTÄTIGT statt gefangen.
   **DIE FOLGEN SIND BEREITS EINGETRETEN, das ist kein hypothetischer Schaden:** ein
   falscher STOPP im Objekt-Nachweis (CR≠0 gemeldet, tatsächlich 0), eine falsche Aussage
   über den Arbeitsbaum des ganzen Repos ("trägt überall CRLF"), und eine Zahl in
   Vorrats-Eintrag 17, die ersetzt werden musste.

   **DIE NACHBARSCHAFT IN docs/immer-beachten.md — DIE FRAGE, NICHT IHRE ANTWORT.** Beide
   benannten Regeln sind im Volltext gelesen (CC, 2026-08-31); es sind in Wahrheit DREI,
   und die dritte liegt am nächsten:
   · **"WERKZEUG-REGEL: sed -i STRIPPT IN DIESER UMGEBUNG STILL DAS CR"** — sie handelt
     davon, dass ein Werkzeug den GEGENSTAND verändert (CR, Kodierung), und ihre Prüfung
     ist `git status` plus der Ausschluss leerer Diffs.
   · Ihr Absatz **"EIN WERKZEUG KANN AUCH EINEN BEFUND ERZEUGEN, DEN DER GEGENSTAND NICHT
     HERGIBT"** — die Gegenrichtung, das ERGEBNIS statt des Gegenstands.
   · **"EINE ABWESENHEIT KANN VOM WERKZEUG ERZEUGT SEIN, NICHT VOM GEGENSTAND"** (Phase
     11.8) — bereits eine EIGENE Regel neben jenem Absatz, für den Nicht-Treffer.
   **WAS FÜR EINEN ABSATZ SPRICHT:** Der Gegenrichtungs-Absatz sagt wörtlich, ein Werkzeug
   verändere "das ERGEBNIS, ohne den Gegenstand anzufassen" — genau das ist hier
   geschehen. Eine dritte eigenständige Regel auf derselben Achse macht es
   unwahrscheinlicher, dass beim nächsten Fall die richtige greift.
   **WAS FÜR EINE EIGENE SPRICHT:** Jener Absatz und die 11.8er-Regel sind beide auf die
   ABWESENHEIT zugeschnitten — ihre operative Anweisung lautet "WO EIN MESSERGEBNIS EINE
   ABWESENHEIT IST, WIRD DAS WERKZEUG GEWECHSELT", und beide Belege sind Nicht-Treffer.
   **HIER IST DAS ERGEBNIS EINE ANWESENHEIT** (eine Zahl, wo null stehen müsste); die
   Anweisung feuert also nicht. Und die zweite Hälfte — dass eine Kontrolle mit derselben
   Waage nichts rettet — steht in keiner der drei.
   **NICHT ENTSCHIEDEN, und ohne diesen Satz stellt die Hebung eine dritte Regel neben
   zwei bestehende, und dann greift keine mehr richtig:** ob das ein ABSATZ an der
   bestehenden Werkzeug-Regel wird oder eine EIGENE. KEINE EMPFEHLUNG.
   **GILT UNABHÄNGIG VON DIESER ENTSCHEIDUNG UND AB SOFORT:** Die Byte-Kontrolle läuft
   über `tr` bzw. `git ls-files --eol`. Die Ablage-Frage betrifft, WO die Regel steht,
   nicht OB sie befolgt wird.
   **EIN VERWANDTER KANDIDAT LIEGT IN EINER ANDEREN DATEI:** Hebungs-Kandidat 1 in
   docs/aktiver-stand-11.8.md ("EIN NEU GESCHRIEBENES ARTEFAKT KANN EIN NUL-BYTE TRAGEN,
   UND KEIN GATE MELDET ES") lässt unter "NICHT ENTSCHIEDEN" ausdrücklich offen, "ob die
   Byte-Kontrolle eine Auflage an jede neue Datei wird · welchen Umfang sie hätte".
   **DORT WIRD NICHT ERGÄNZT:** Jene Datei ist eine ARCHIVIERTE Phase, und ein
   rückwirkender Eingriff in sie steht in dieser Datei bereits einmal ausdrücklich AUS
   (s. den Vermerk zum Vorrat der Phase 11.8). **WER EINEN VON BEIDEN HEBT, LIEST DEN
   ANDEREN MIT** — jener fragt, WANN gemessen wird, dieser, WOMIT.
   GEMELDET 2026-08-31, NICHT GEBAUT.
   PROVENIENZ: Der Instrumenten-Befund GEMESSEN am eigenen Lauf (CC, 2026-08-31), mit
   Positiv- und Negativkontrolle. Der Volltext der drei Nachbarregeln GELESEN in
   docs/immer-beachten.md (CC, 2026-08-31). Dass eine dritte Regel auf derselben Achse die
   Trefferwahrscheinlichkeit senkt, ist eine ABLEITUNG, keine Messung.
